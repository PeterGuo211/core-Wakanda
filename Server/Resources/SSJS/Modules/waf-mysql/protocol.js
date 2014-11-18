/*
 * This file is part of Wakanda software, licensed by 4D under
 *  (i) the GNU General Public License version 3 (GNU GPL v3), or
 *  (ii) the Affero General Public License version 3 (AGPL v3) or
 *  (iii) a commercial license.
 * This file remains the exclusive property of 4D and/or its licensors
 * and is protected by national and international legislations.
 * In any event, Licensee's compliance with the terms and conditions
 * of the applicable license constitutes a prerequisite to any use of this file.
 * Except as otherwise expressly stated in the applicable license,
 * such license does not include any other license or rights on this file,
 * 4D's and/or its licensors' trademarks and/or other proprietary rights.
 * Consequently, no title, copyright or other proprietary rights
 * other than those specified in the applicable license is granted.
 */
/*
    The aim of this class is to provide an interface to all database queries
    for MySQL.
    functions list includes:
            - connection with a MySQL database.
            - send data queries
            - receive data responses.

    for further information please refer to the mysql protocol
*/
//retreive all defined constants
var constants = require('waf-mysql/constants');

//retreive the sha1 module
var SHA1 = require('waf-mysql/sha1Module');

//retreive the net module
var net = require('net');

//retreive the utils module
var utils = require('waf-mysql/utils');

/*
    This function is the constructor for the Protocol class.
    It initializes the fields of the class with the default values.
*/
function Protocol() {
    this.packetNumber = 1;
    this.isConnected = false;
    //if the a database is used
    this.isInitDB = false;
    this.isError = false;
    //the connexion is colosed
    this.isClosed = false;
    this.charsetNumber = 192;
    this.lang = 'UTF8_UNICODE_CI';
    this.flags = constants.defaultFlag;
    this.maxPacketSize = 16777215;
    this.socket = null;
    //connect arguments
    this.params = null;
    //server options like lang flags maxsize...
    this.serverOptions = {};
    //the buffer
    this.data = null;
    this.error = {};
    //explained after
    this.metaData = [];
    // 0 of resultSet packet, 1 of ok packet , -1 of error packet
    this.typePacket = [];
    //record element is the response of ok Packet
    this.records = [];
    //the number of statement
    this.resultCount = 0;
    //the position of current statement
    this.fResult = -1;
    //has more statement
    this.hasNext = true;
}


/*
    This function establish a connection with the given paramameters(params)
    params contains the following datas:
            - hostname the server name or ip
            - port the port on the server
            - ssl if the connection is encrypted or not
            - database the default database on the server
*/

Protocol.prototype.connect = function(params) {
    this.params = params;
    try {
        //call for synchronous socket
        this.socket = new net.SocketSync();
    }
    catch (err) {
        throw new Error("Can't create a connected socket with Net module! " + err.message);
    }

    //verify the type of given as arguments

    if (typeof params.hostname === 'string') {
		if(typeof params.port === 'number'){
			try {
				this.socket.connect(params.port, params.hostname);
			}
			//If there is a connection problem due to incorrect server address or port
			catch (err) {
				this.error = {
					message: err,
					code: -1
				};
				this.isError = true;
				throw new Error(this.error.message);
			}
		}
		else{
			var errMsg = "invalid port type! expected a number.";
			throw new Error(errMsg);
		}
    }
    else {
        var errMsg = "invalid hostname type! expected a string.";
        throw new Error(errMsg);
    }

	//A check for parameters types
	if(typeof params.user !== 'string'){
        var errMsg = "invalid user type! expected a string.";
        throw new Error(errMsg);
	}

	if(typeof params.password !== 'string'){
        var errMsg = "invalid password type! expected a string.";
        throw new Error(errMsg);
	}

	if(typeof params.database !== 'string'){
        var errMsg = "invalid database type! expected a string.";
        throw new Error(errMsg);
	}

	if(typeof params.ssl !== 'boolean'){
        var errMsg = "invalid ssl type! expected a boolean.";
        throw new Error(errMsg);
	}

    //read data from server
    this.data = this.socket.read();

    //Handshake Init packet
    this._getHandshakeInitPacket();

    if (params.ssl) {
        this._sendTLSAuthPacket();
        this.socket.setSecure();
    }

    //if the handshake packet is correctly received send client packet
    if (!this.isError) {
        this._sendClientAuthPacket();
    }

    //read received data after executing client auth packet at the server
    this.data = this.socket.read();

    //the 5th byte in the buffer shows if there is an error or not
    var authResp = this.data[4];

    //if there is an error process it an exit
    if (authResp === 0xff) {
        this._readAuthErrorPacket();
    }
    else if (authResp === 0x00) {
        //if there is a default database
        if (params.database !== '') {
            //use it and if an error occured exit
            if (this.useDatabase(params.database)) {
                this.isConnected = true;
            }
            else {
                return;
            }
        }
        //if there is no default database the connection is considered successful
        this.isConnected = true;
    }
}

/*
    This function sets the char set:
    charset can be a number or a string value
*/
Protocol.prototype.setLang = function(charSet) {
    var refLang;
    // The CharSet maybe a Number or String value
    // If the case of String we determinate it's Numeric value
    if (typeof charSet === 'string') {
        refLang = constants.charsetMap[charSet];
        if (refLang) {
            this.lang = charSet;
            this.charsetNumber = refLang;
            return true;
        }
        else {
            return false;
        }
    }
    else if (!isNaN(parseFloat(charSet)) && isFinite(charSet)) {
        refLang = constants.reverseCharsetMap[charSet];
        if (refLang) {
            this.lang = refLang;
            this.charsetNumber = charSet;
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}


/*
    This function read the error packet with pLength parameter
    where pLength determines the existence of the error message
*/
Protocol.prototype._readQueryErrorPacket = function(pLength) {
    //advance on byte
    this.data.advance(1);
    //Error Number: The possible values are listed in the MySQL source code file /include/mysqld_error.h
    this.error.code = this.data.readUInt16LE();
    //console.log(pLength);
    this.data.advance(6);
    if (pLength > 9) {
        //because of the message field is optionnel
        this.error.message = this.data.readString(pLength - 9);
    }

    throw new Error(this.error.message);
}

/*
    This function read the ith ok packet with packetLength parameter
    where packetLength determines the existence of a message to read or not
*/
Protocol.prototype._readOkPacket = function(packetLength, i) {
    //field_count: always = 0
    this.data.readUInt8();

    this.records[i] = {
        //affectedRows is the number of rows affected by INSERT/UPDATE/DELETE
        affectedRows: this.data.readLCBPlus(),
        //If the statement generated any AUTO_INCREMENT number,the number is returned here.
        //Otherwise this field contains 0
        insertId: this.data.readLCBPlus(),
        //if there are more informations to read from the server
        serverStatus: this.data.readUInt16LE(),
        //number of warnings inside this transaction
        warningCount: this.data.readUInt16LE()

    };

    //getOffsetRead a C++ function help us to know how many byte we have read of this Ok packet unitl now
    //the main goal is to know if there is a message field or not because it's optionnal
    var readed = 5 + this.data.getOffsetRead();

    if (packetLength > readed) {
        //this.records[i]['message'] =  this.data.readString(packetLength-readed);
        this.records[i]['message'] = this.data.readLCBString();
    }
}

/*
    This function reads the handshake init packet
*/
Protocol.prototype._getHandshakeInitPacket = function() {
	try{
		if (this.data[4] === 0xff) {
			//if there is an error read it and exit
			this._readAuthErrorPacket();
		}
		else {
			//read datas from the server
			var packetLength, svIndex, scrambleIndex, index, scramble,

			index = 0;
			packetLength = this.data.readUInt24LE(index);
			index += 4;

			this.serverOptions.protocolVersion = this.data.readUInt8(index);
			index++;
			svIndex = index;
			while ((index < packetLength) && (this.data[index] !== 0x00)) {
				index += 1;
			}
			this.serverOptions.serverVersion = this.data.toString('utf-8', svIndex, index);
			index += 1;
			this.serverOptions.threadId = this.data.readUInt32LE(index);
			//ID of the server thread for this connection
			index += 4;
			scrambleIndex = index;
			index += 9;
			this.serverOptions.capabilities = this.data.readUInt16LE(index);
			index += 2;
			this.serverOptions.charset = this.data.readUInt8(index);
			index += 1;
			this.serverOptions.language = constants.reverseCharsetMap[this.serverOptions.charset];
			this.serverOptions.status = this.data.readUInt16LE(index);
			index += 2;
			//skipping capabilities (two upper bytes)
			index += 2;
			var scrambleLength = this.data.readUInt8(index);
			
			//some times the server sends 0 that means a scramble length equal to 21 :)
			if(scrambleLength == 0) {
				scrambleLength = 21;
			}
			index += 11;
			//just scrambleLength-1 not scrambleLength as mysql spec says
			scramble = new Buffer(scrambleLength - 1);
			this.data.copy(scramble, 0, scrambleIndex, scrambleIndex + 8);
			this.data.copy(scramble, 8, index, index + scrambleLength - 8 - 1);
			this.serverOptions.scramble = scramble;
		}
	}
	catch(err){
		throw new Error("Can't connect to the mysql server. Invalid hostname address or port value!");
	}
}

/*
    This function sends the client's ssl packet
*/
Protocol.prototype._sendTLSAuthPacket = function() {
    var packLength, tlsPacket, index;
    packLength = 4 + 4;
    tlsPacket = new Buffer(packLength);
    index = 0;
    tlsPacket.writeUInt24LE(packLength - 4, index);
    index += 3;
    //Write the Sequence Number
    tlsPacket.writeUInt8(this.packetNumber, index);
    this.packetNumber += 1;
    index += 1;
    //Write the Client flag
    var newFlags = this.flags | constants.flags.CLIENT_SSL;
    tlsPacket.writeUInt32LE(newFlags, index);
    index += 4;
    this.socket.write(tlsPacket);
}

/*
    This function sends the client's auth packet
*/
Protocol.prototype._sendClientAuthPacket = function() {
    var theToken, theTokenLength, packLength, authPacket, index;
    //the token to send when the database has a password [only for MySQL 4.1 and later].
    theToken = SHA1.getToken(this.params.password, this.serverOptions.scramble);
    theTokenLength = (theToken.length != 1) ? theToken.length : 0;
    packLength = 4 + 4 + 4 + 1 + 23 + (this.params.user.length + 1) + (theTokenLength + 1) + 1;
    authPacket = new Buffer(packLength);
    index = 0;
    authPacket.writeUInt24LE(packLength - 4, index);
    index += 3;
    //Write the Sequence Number
    authPacket.writeUInt8(this.packetNumber, index);
    this.packetNumber += 1;
    index += 1;
    //Write the Client flag
    authPacket.writeUInt32LE(this.flags, index);
    index += 4;
    //Write the maximum Packet Size
    authPacket.writeUInt32LE(this.maxPacketSize, index);
    index += 4;
    //Write the Client charSet number
    authPacket.writeUInt8(this.charsetNumber, index);
    index += 1;
    //Write 24 Zero
    authPacket.fill(0, index, 23);
    index += 23;
    //Write the Null-Terminated String of the Database User name
    authPacket.write(this.params.user, index, 'utf-8');
    index += this.params.user.length;
    //Write 0 to identify the End of the User name String
    authPacket.writeUInt8(0, index);
    index += 1;
    //Writing the  Length Coded Binary of the token
    authPacket.writeUInt8(theTokenLength, index);
    index += 1;

    if (theTokenLength !== 0) {
        theToken.copy(authPacket, index, 0, theTokenLength);
        index += theTokenLength;
    }

    authPacket.writeUInt8(0, index);
    this.socket.write(authPacket);
}

/*
    This function let us use a default database denoted by the parameter:
    database
*/
Protocol.prototype.useDatabase = function(database) {
    if (typeof database !== 'string') {
        var errMsg = "invalid database parameter! database must be a string. database = " + database;
        throw new Error(errMsg);
    }

    if (!this.socket) {
        return false;
    }

    var useDBQuery, packLength, useDBPacket, authResp;

    this.params.database = database;

    useDBQuery = "USE `" + database + "`";
    packLength = 5 + useDBQuery.length;
    useDBPacket = new Buffer(packLength);

    useDBPacket.writeUInt24LE(packLength - 4, 0);
    useDBPacket.writeUInt8(0, 3);
    useDBPacket.writeUInt8(constants.commands.COM_QUERY, 4);
    useDBPacket.write(useDBQuery, 5, 'utf8');

    this.socket.write(useDBPacket);
    this.data = this.socket.read();
    //the type of received Data OK packet or Error Packet
    authResp = this.data[4];

    if (authResp === 0xff) {
        this._readAuthErrorPacket();
        return false;
    }
    else if (authResp === 0x00) {
        return true;
    }
    else {
        return false;
    }
}

/*
    This function let us send a query:
    with paremeters query and query type
*/
Protocol.prototype.sendQuery = function() {
    var
    //the query that we will send to mysql server
    query,
    //the query type:
    queryT;

    //as default queryT = 0;
    //
    //queryT = 0 -> here sendQuery is used in the  client::execute functions
    //queryT = 1 -> here sendQuery is used in the client::executeAndFetch  functions
    //queryT = 2 -> here sendQuery is used in the client::select function.
    //queryT = 3 -> here sendQuery is used in the client::update, client::delete, client::insert, functions.
    //
    //knowing queryT faciliting the buffer analyze
    //example 1: using queryT = 3, so the received data are for an ok packet and ok packet is always in one buffer,
    //so we know advancely that there is no need to wait for next buffers.
    //
    //example 2: using queryT = 2, so the received data are for a resultSet packet, so we have to analyse only the last 9 bytes of each received packet
    //when the 9 lastest bytes of a buffer stands for an eof packet then wen end the analyse.
    //
    //example 3: using queryT = 1, here we don't know the type of received data. but we know that we should stop analyzing buffers when we come to the
    //end of the first statement
    queryT = 0;
    if (arguments.length > 0) {
        query = arguments[0];
    }
    else {
        var errMsg = "You must enter at least the query parameter!\n";
        errMsg += "sendQuery syntax is sendQuery(query[,queryType])";
        throw new Error(errMsg);
    }
    //if we have 2 arguments, so we should take in consideration the type of query
    if (arguments.length == 2) {
        //the query type is the second arguments, like   Protocol::sendQuery(query, 1);
        queryT = arguments[1];
    }

    var queryPacket, simulatedPacket, packLength;

    //Look to mysql protocol documentation
    // to support Encoding in 4 Bytes
    simulatedPacket = new Buffer(query.length * 4);
    packLength = 5 + simulatedPacket.write(query, 0);
    queryPacket = new Buffer(packLength);
    queryPacket.writeUInt24LE(packLength - 4, 0);
    queryPacket.writeUInt8(0, 3);
    queryPacket[4] = constants.commands.COM_QUERY;
    queryPacket.write(query, 5, 'utf-8');

    // we have constructed the query packet to send to mysql server
    this.socket.write(queryPacket);
    this.data = new MysqlBuffer(); // MySQLBuffer new instance
    //console.log("queryT " + queryT);
    if (queryT != 0) { //if the type of query is not as default value
        while (this.data.addBuffer(this.socket.read(), queryT)) {
            //concatenate buffer one by one, so we analyse each buffer taking in consideration the query Type
            //addBuffer return false when we are at the end of received data (useful received data that we want)
            //this.socket.read() is the Ke-Fong Lee buffer
            //console.log(this.data.getSize());
        }
    }
    else {
        //if the query Type is zero then we should analyse each buffer untill the end, the thing that u are going to discover in C++ side
        while (this.data.addBuffer(this.socket.read())) {
            //console.log(this.data.getSize());
        }
    }
    //console.log("e+++");
    this.data.init(); // initialize some MySQLBuffer membres in c++
    //console.log("e+++");
}


/*
    This function returns the coded binary length
*/
Protocol.prototype._codedBinaryLength = function(lengthCoded) {
    if (typeof lengthCoded !== 'number') {
        var errMsg = "Expected a number for the _codedBinaryLength function\n";
        throw new Error(errMsg);
    }
    if (lengthCoded <= 251) {
        return 1;
    }
    else if (lengthCoded <= 65535) {
        return 3;
    }
    else if (lengthCoded < 16777215) {
        return 4;
    }
    else {
        return 9;
    }
}

/*
    This function reads the error packet
*/
Protocol.prototype._readAuthErrorPacket = function() {
    var packetLength, offset;
    offset = 0;
    packetLength = this.data.readUInt24LE(offset);
    offset += 4;
    //field count: always = 0xff
    this.data.readUInt8(offset);
    offset += 1;
    this.error.errno = this.data.readUInt16LE(offset);
    offset += 2;
    //Skip sqlstate marker and the sqlstate
    offset += 6;
    if (packetLength > 9) {
        //after an error packet there is always no more information to read from the server
        this.error.message = this.data.toString('utf-8', offset);
    }
    throw new Error(this.error.message);
}

/*
    This function prepare the results
*/
Protocol.prototype.prepare = function(i) {
    if (typeof i !== 'number') {
        var errMsg = "Expected a number for the prepare function\n";
        throw new Error(errMsg);
    }
    //read Protocol::prepareForFetch function first
    var typePacket, headerLength, m;

    this.hasNext = true;
    headerLength = this.data.readUInt24LE();
    //console.log("headerLength " + headerLength);
    this.data.advance(1);

    typePacket = this.data.readNextHex();

    if (typePacket == 0x00) {
        //not (error || result set)
        //console.log("OK? START");
        this.typePacket[i] = 1;
        this._readOkPacket(headerLength, i);

        //if(eof && (this.records[i]['serverStatus'] & constants.serverStatus.SERVER_MORE_RESULTS_EXISTS )!= 0)
        //  this.hasNext = false;
        this.hasNext = false;
        //console.log("OK? END");
    }
    else if (typePacket == 0xff) {
        //if error
        //console.log("ERROR? START");
        //console.log(headerLength);
        this.typePacket[i] = -1;
        this._readQueryErrorPacket(headerLength);
        this.hasNext = false;
        //console.log("ERROR? END");
    }
    else {
        //Result set response
        //console.log("ROWDATA? START");
        this.typePacket[i] = 0;
        this.metaData[i] = {};
        this.metaData[i]["fieldCount"] = this.data.readLCB();

        this.metaData[i]["fields"] = [this.metaData[i]["fieldCount"]];
        this.metaData[i]["titles"] = [this.metaData[i]["fieldCount"]];
        this.metaData[i]["types"] = [this.metaData[i]["fieldCount"]];
        this.metaData[i]["flags"] = [this.metaData[i]["fieldCount"]];

        for (m = 0; m < this.metaData[i]["fieldCount"]; m++) {
            //console.log("ROWDATA? START ::: " + m);
            this.data.advance(4);
            this.data.readLCBString();
            this.metaData[i]["fields"][m] = {
                //Database identifier, also known as schema name
                dbSchema: this.data.readLCBString(),
                //Table identifier, after AS clause (if any)
                table: this.data.readLCBString(),
                //Original table identifier, before AS clause (if any)
                org_table: this.data.readLCBString(),
                //Column identifier, after AS clause (if any)
                name: this.data.readLCBString(),
                //Column identifier, after AS clause (if any)
                org_name: this.data.readLCBString(),
                //always is 0x00
                filler: this.data.readUInt8(),
                //Character set number
                lang: this.data.readUInt16LE(),
                //Length of column
                fieldLength: this.data.readUInt32LE(),
                //The code for the column's data type for ex:   0x00  for  FIELD_TYPE_DECIMAL,  0x0d   for FIELD_TYPE_YEAR
                type: this.data.readUInt8(),
                //ex:  0001 NOT_NULL_FLAG, 0002 PRI_KEY_FLAG, 0004 UNIQUE_KEY_FLAG ...
                flags: this.data.readUInt16LE(),
                //the number of positions after the decimalpoint if the type is DECIMAL or NUMERIC
                decimals: this.data.readUInt8()
            };

            this.data.advance(2);
            this.metaData[i]["titles"][m] = this.metaData[i]["fields"][m]["name"];
            this.metaData[i]["types"][m] = this.metaData[i]["fields"][m]["type"];
            this.metaData[i]["flags"][m] = this.metaData[i]["fields"][m]["flags"];
        }

        this.data.advance(9);
        // save Rows mean to save the  position(the start and the end) of rowsData in C++ vector
        this.data.saveRowsPosition(this.metaData[i]["fieldCount"]);
        this.data.advance(7);
        this.hasNext = false;
        //if((this.data.readUInt16LE() & constants.serverStatus.SERVER_MORE_RESULTS_EXISTS )== 0){
        //    this.hasNext = false;
        //}
        //else{
        //    console.log("has more result" );
        //}
    }
}

/*
    This function prepares the results for fecth
*/
Protocol.prototype.prepareForFetch = function(i, eof) {
    if (typeof i != 'number') {
        var errMsg = "Expected a number for the prepareForFetch function\n";
        throw new Error(errMsg);
    }
    //first argument "i":  the current statement
    //sencond argument "eof" :
    //                        eof = true means there is one sql statement // means
    //                        eof = false means there multistatement
    //
    var typePacket,
    /*
    typePacket is an array of statement result type:
        ok packet  = 1
        ResultSet Packet = 0
        Error Packet = -1

    */
    headerLength,
    //the current columns
    m;

    //there is more sql statement result to receive from mysql server
    this.hasNext = true;
    //the header Length of the received packet  is in 3bytes
    headerLength = this.data.readUInt24LE();
    //console.log("headerLength " + headerLength);
    //just skip the next 1 byte
    this.data.advance(1);
    //read the hexadecimal value of the next byte without incrementing the position
    typePacket = this.data.readNextHex();

    //not (error || result set)
    if (typePacket == 0x00) {
        //console.log("OK? START");
        this.typePacket[i] = 1;
        //read Ok Packet and put it in records[i]
        this._readOkPacket(headerLength, i);

        //if there is no more statement result to read
        if (eof || (this.records[i]['serverStatus'] & constants.serverStatus.SERVER_MORE_RESULTS_EXISTS) == 0) {
            this.hasNext = false;
        }
        //console.log("OK? END");
    }
    else if (typePacket == 0xff) {
        //if error
        //console.log("ERROR? START");
        this.typePacket[i] = -1;
        this._readQueryErrorPacket(headerLength);
        this.hasNext = false;
        //console.log("ERROR? END");
    }
    else {
        //Result set response
        //console.log("ROWDATA? START");
        this.typePacket[i] = 0;
        this.metaData[i] = {};

        //metaData array of the "i" statement result, we have:
        //    Protocol::metaData[i]["fieldCount"]   <integer> the number of columns
        //    Protocol::metaData[i]["fields"]   <array> all columns information(array of objects)
        //    Protocol::metaData[i]["types"]   <array> all columns types(array of string)
        //    Protocol::metaData[i]["titles"]   <array> all columns titles(array of string)
        //Length Coded Binary value
        this.metaData[i]["fieldCount"] = this.data.readLCB();

        //allocate table of fieldCount value
        this.metaData[i]["fields"] = [this.metaData[i]["fieldCount"]];
        this.metaData[i]["titles"] = [this.metaData[i]["fieldCount"]];
        this.metaData[i]["types"] = [this.metaData[i]["fieldCount"]];
        this.metaData[i]["flags"] = [this.metaData[i]["fieldCount"]];

        //read the fields packet
        for (m = 0; m < this.metaData[i]["fieldCount"]; m++) {
            //console.log("ROWDATA? START ::: " + m);
            //skip 4 bytes (of the header of each Field Packet)
            this.data.advance(4);
            //is always Def
            this.data.readLCBString();

            //full meteData[i][fields] of each columns
            this.metaData[i]["fields"][m] = {
                //Database identifier, also known as schema name
                dbSchema: this.data.readLCBString(),
                //Table identifier, after AS clause (if any)
                table: this.data.readLCBString(),
                //Original table identifier, before AS clause (if any)
                org_table: this.data.readLCBString(),
                //Column identifier, after AS clause (if any)
                name: this.data.readLCBString(),
                //Column identifier, after AS clause (if any)
                org_name: this.data.readLCBString(),
                //always is 0x00
                filler: this.data.readUInt8(),
                //Character set number
                lang: this.data.readUInt16LE(),
                //Length of column
                fieldLength: this.data.readUInt32LE(),
                //The code for the column's data type for ex:   0x00  for  FIELD_TYPE_DECIMAL,  0x0d   for FIELD_TYPE_YEAR
                type: this.data.readUInt8(),
                //ex:  0001 NOT_NULL_FLAG, 0002 PRI_KEY_FLAG, 0004 UNIQUE_KEY_FLAG ...
                flags: this.data.readUInt16LE(),
                //the number of positions after the decimalpoint if the type is DECIMAL or NUMERIC
                decimals: this.data.readUInt8()
            };

            //filler always 00
            this.data.advance(2);
            this.metaData[i]["titles"][m] = this.metaData[i]["fields"][m]["name"];
            this.metaData[i]["types"][m] = this.metaData[i]["fields"][m]["type"];
            this.metaData[i]["flags"][m] = this.metaData[i]["fields"][m]["flags"]
        }

        //this means to position cursor to the end of RowsData in C++ MySQLBuffer
        this.data.skipRowsData();
        //skip 7 bytes of the EOF Packet
        this.data.advance(7);
        //if there is no more statement result
        if (eof || (this.data.readUInt16LE() & constants.serverStatus.SERVER_MORE_RESULTS_EXISTS) == 0) {
            this.hasNext = false;
        }
        else {
            //console.log("has more result" );
        }
    }
}

/*
 ** This function checks if there is more result set to return
 */
Protocol.prototype._hasMoreResult = function() {
    //console.log("++++ " + this.fResult < (this.resultCount - 1));
    return (this.fResult < (this.resultCount - 1));
}

/*
    This function move to the next result set
*/
Protocol.prototype.setNextFetch = function() {
    //if the statement is a ResultSet then position the cursor to the first rows of rowsData in C ++
    if (this.typePacket[this.fResult] == 0) {
        //C++ function
        this.data.prepareSelectFetch();
    }
}

Protocol.prototype.fetch = function(count) {
    var fieldCount = this.metaData[this.fResult]["fieldCount"];
    var titles = this.metaData[this.fResult]["titles"];
    var types = this.metaData[this.fResult]["types"];
    var buffer = this.data;
    var res = buffer.fetch(count, fieldCount, titles, types);
    return res;
}

Protocol.prototype.hasNextResultSet = function() {
    return this.data.hasNext();
}

Protocol.prototype.getRowsCount = function() {
    return this.data.getRowsCount();
}

Protocol.prototype.getColumnsCount = function() {
    return this.metaData[this.fResult]["fieldCount"];
}

Protocol.prototype.getColumnName = function(iCol) {
    return this.metaData[this.fResult]["titles"][iCol];
}

Protocol.prototype.getColumnFlags = function(iCol) {
    return this.metaData[this.fResult]["flags"][iCol];
}

Protocol.prototype.getColumnType = function(iCol) {
    return this.metaData[this.fResult]["types"][iCol];
}

Protocol.prototype.isSelect = function() {
    return (this.typePacket[this.fResult] == 0);
}

Protocol.prototype.isResultSetError = function() {
    return (this.typePacket[this.fResult] == -1);
}

Protocol.prototype.getAffectedRowCount = function() {
    var affectedRows = 0;
    if (this.records[this.fResult]) {
        affectedRows = this.records[this.fResult].affectedRows;
    }
    return affectedRows;
}

Protocol.prototype.skipRows = function(count) {
    this.data.advanceFetch(count);
}

Protocol.prototype.close = function() {
    this.socket.end();
}

exports.Protocol = Protocol;
