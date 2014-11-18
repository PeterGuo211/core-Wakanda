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
var 
    netNative,
    socket,
    Parser,
    SHA1,
    maxPacketSize,
    constants;
    
netNative = requireNative('net');
socket = new netNative.SocketSync();

Parser = require('waf-mysql/parsers');

constants = require('waf-mysql/constants');
 
//For SHA1 Encryption
SHA1 = require('waf-mysql/sha1Module');

maxPacketSize = 16777215;



/******Main function to connect to server*******/
exports.mySQLConnect = function mySQLConnect(connectionParams){

    /**
     *  connectionParams = {

        @host       :   the hostname to connect to (String)
        @port       :   the port number that the server is listening on(Integer) 
        @user       :   Database User name (String)
        @password   :   Password (String)
        @database   :   (Optional) Database Name  (String)
        @charSet    :   Charset (Number or String) ex: 12, UTF8_GENERAL_CI, 33...
        @ssl        :   (optional, default is false) SSL Enable (Boolean)	

        }

     */

    var
    	
        HEADER_LENGTH,
        handshake,
        errorPacket,
        connectionLevel,
        buf,
        bufToSend,
        resultConnection;
    
  	HEADER_LENGTH = 4;
    handshake = {};//Handshake Initialization Packet From server to client during initial handshake

    errorPacket = {
    
        isValid: false, //If an error is occurred during the connection with the sever isValid = true
        errno: 0, // The possible values are listed in the MySQL source code file /include/mysqld_error.h.
        message: '' // The error message
    
    };

    connectionLevel = 0;//In terms of this variable we ensure that we receive all packet
    //(First:	HandShake Packet, Second : Client Authentication Packet, Third (optional) : Use Database Packet Response)

    resultConnection = {

            //errorPacket : errorPacket,
            //mysqlConnection :mysqlConnection

    };


    try {

        // Construct a new socket object and opens a socket to the given location.
        socket.connect(connectionParams.port, connectionParams.host);
       
    }

    catch(er){
    
 		errorPacket.errno = 0;
        errorPacket.message = "ERROR_SERVER_CONNECTION" + er;
        errorPacket.isValid = true;
        resultConnection = {
            
            errorPacket : errorPacket
            
        };

        return resultConnection;

    }
  

    if (connectionParams.ssl) {
        //if the SSL is enabled 
        mysqlConnection.setSecure();
    }

	
    /**
     *            <------ getHandshakeInitPacket [handshake data packet] or  [error packet]
                  ------> sendClientAuthPacket  
                  <------ getClientAuthResponsePacket [Ok packet] or  [error packet]
                  ------> sendUseDbPacket
                  <------ getUseDbResponsePacket  [Ok packet] or  [error packet]

     **/ 



    /******Get Closure Functions*******/
    function getUseDbResponsePacket(data) {

        var 
            response;
        
        response = data[4];

        if (response === 0xff) {
        
            errorPacket = mysqlError(data);
            
        } else if (response === 0x00) {
           
           
        }
        
    }

    function getClientAuthResponsePacket(data) {

        var 
            response;
        
        response = data[4];

        if (response === 0xff) {
            
            errorPacket = mysqlError(data);
            
        } else if (response === 0x00) {
          	
          	connectionLevel = 2;
            
        }
        
     
    }

    function getHandshakeInitPacket(data) {

        var 
            response;
            
        response = data[4];

        if (response === 0xff) {
            
            errorPacket = mysqlError(data);
            
        } else { 
        
            handshake = readHandshake(data); //Examine the data with ReadHandShake function
			connectionLevel = 1;
        }

     
    }

    /******Send Closure Functions*******/
    function sendUseDbPacket(database) {

		var 
            useDBQuery,
            queryLength,
            packLength,
            sendUseDB,
            index;
            
        useDBQuery = "USE " + database;
        queryLength = useDBQuery.length;
        packLength = HEADER_LENGTH + queryLength+1;
        sendUseDB = new Buffer(packLength);
        index = 0;
		sendUseDB.writeUInt24LE(packLength - HEADER_LENGTH, index);
        index += 3;
        sendUseDB.writeUInt8(0, index);
        index += 1;
        sendUseDB.writeUInt8(constants.commands.COM_QUERY,index);
        index += 1;

        sendUseDB.write(useDBQuery, index, 'utf8');

        return sendUseDB;

    }

    function sendClientAuthPacket(user,pass,scramble,charSet){

        var
            packet,
            AUTH_411_OVERHEAD,
            userLength,
            theToken,
            theTokenLength,
            packLength,
            buf,
            index;
        
        packet = {};
        AUTH_411_OVERHEAD =  4 + 4 + 1 + 23; 
        userLength = user.length;

        theToken = null;
        theToken = token(pass,scramble); // the token to send when the database has a password [only for MySQL 4.1 and later].
        theTokenLength = (theToken.length != 1) ? theToken.length : 0;

        packLength = HEADER_LENGTH + AUTH_411_OVERHEAD + userLength+1 + theTokenLength + 1 + 0 + 1;  

        buf = new Buffer(packLength);
        index = 0;
		buf.writeUInt24LE(packLength-HEADER_LENGTH, index);
        index += 3;
        buf.writeUInt8(1, index);// Write the Sequence Number
        index += 1;
        buf.writeUInt32LE(defaultFlag, index);// Write the Client flag 
        index += 4;
        buf.writeUInt32LE(maxPacketSize, index);// Write the maximum Packet Size
        index += 4;

        // The CharSet maybe a Number or String value
        // If the case of String we determinate it's Numeric value
        if(!IsNumeric(charSet)){
			charSet = constants.charsetMap[charSet];
		}

        buf.writeUInt8(charSet, index);// Write the Client charSet number
        index += 1;
        buf.fill('0',index, 23);// Write 24 Zero
        index += 23;
        buf.write(user, index, 'utf-8');// Write the Null-Terminated String of the Database User name 
        index += userLength;
        buf.writeUInt8(0, index);// Write 0 to identify the End of the User name String
        index += 1;
        buf.writeUInt8(theTokenLength, index);//Writing the  Length Coded Binary of the token
        index+=1;

        if (theTokenLength !== 0) {

            theToken.copy(buf, index, 0,theTokenLength);
            index += theTokenLength;

        }

        buf.writeUInt8(0, index);
        return buf;
    }


    //Get Handshake Initialization Packet 
    getHandshakeInitPacket(socket.read());
	
    //Get Client Authentication Packet 
    if(connectionLevel >= 1){
   
   		bufToSend = sendClientAuthPacket(connectionParams.user, connectionParams.password, handshake.scrambleBuff, connectionParams.charSet);
   		socket.write(bufToSend);
    
		getClientAuthResponsePacket(socket.read());
	}
	
	if(connectionParams.database.length > 0  && connectionLevel >= 2 ) {

		// If the user want to use a Database as default

		var useDB = sendUseDbPacket(connectionParams.database);
		socket.write(useDB);
		getUseDbResponsePacket(socket.read());

	}


	resultConnection = {

			errorPacket 	: errorPacket,
			mysqlConnection : socket

	}

	return resultConnection;
};

/************************Logical functions*********************/
/*************************************************************/
function token(password, scramble) {
	var	
		b,
	
		tok1,
		tok2,
		tok3;
	// Calculate the Scramble buffer of a password;
	// Ref: MySQL Source Code: libmysql/password.c.
	if (!password) {

		b=new Buffer(1);
		b.writeUInt8(0,0);

		return b;
	}

	tok1 = SHA1.rstr_sha1(password); 
	tok2 = SHA1.rstr_sha1(tok1);
	tok3 = SHA1.rstr_sha1(scramble.toString('binary')  + tok2);

	return xor(tok3, tok1);

}

function xor(a, b) {

	a = new Buffer(a, 'binary'); 
	b = new Buffer(b, 'binary');

	var result = new Buffer(a.length);

	for (var i = 0; i < a.length; i++) {

		result[i] = (a[i] ^ b[i]);

	}

	return result;
}

function readHandshake (buf) {

	var 
		handshake,
		offset,
		scrambleBuffer,
		scrambleBuff2,
		stringEnd,
		serverCapabilities2;
	
	handshake = {};
	offset = 0;
	
	handshake.packetLength = buf.readUInt24LE(offset); //Packet Length
	offset+=3;
	handshake.multiPacketSeq = buf.readUInt8(offset); //Packet Number
	offset+=1;
	handshake.protocolVersion = buf.readUInt8(offset);//protocol_version
	offset+=1;
	stringEnd = Parser.readString(offset,buf,handshake.packetLength);//Null-Terminated String  End index
	handshake.serverVersion = buf.toString('utf-8',offset,stringEnd);//server_version
	offset += (stringEnd-offset+1);
	handshake.threadId = buf.readUInt32LE(offset);//ID of the server thread for this connection
	offset += 4;

	scrambleBuffer = new Buffer(8);// the first part of the scramble buffer  
	buf.copy(scrambleBuffer, 0, offset, offset+8);
	offset += 8;
	offset += 1;
	handshake.serverCapabilities=buf.readUInt16LE(offset);//The possible flag values at time of writing
	offset += 2;
	handshake.serverCharsetIndex=constants.reverseCharsetMap[buf.readUInt8(offset)];// current server character set number
	offset += 1;
	handshake.serverStatus=buf.readUInt16LE(offset); // server status Flag
	offset += 2;
	serverCapabilities2=buf.readUInt16LE(offset);//server capabilities (two upper bytes)
	offset += 2;
	handshake.lengthOfTheScramble=buf.readUInt8(offset);//  length of the scramble
	offset += 1;
	offset += 10;
	// concatenate the two scramble buffers
	stringEnd = Parser.readString(offset,buf,handshake.packetLength);
	scrambleBuff2 = new Buffer(8+stringEnd-offset+3);
	scrambleBuffer.copy(scrambleBuff2, 0, 0,scrambleBuffer.length);
	buf.copy(scrambleBuff2, 8, offset, stringEnd+3);
	handshake.scrambleBuff = scrambleBuff2;
	offset += (stringEnd-offset+1);
	// from the server Capability number find the server allowed options
	//handshake.clientFlag = setFlags(handshake.serverCapabilities);

	return handshake;

}


function mysqlOk (data){

	var okPacket = {};
	var index = 0;

	var packetLenght = Parser.readUInt24(index,data);
	index = 5;

	var len = Parser.ReadLengthCodedBinary(index,data);
	okPacket.affectedRows = len.value; // The Number of rows affected by INSERT/UPDATE/DELETE
	index = len.position;
	len = Parser.ReadLengthCodedBinary(index,data);
	okPacket.insertId = len.value; // If the statement generated any AUTO_INCREMENT number,the number is returned here. Otherwise this field contains 0.
	index = len.position;
	okPacket.serverStatus = data.readUInt16LE(index); // The client can use this to check if there are more packets...
	index += 2;
	okPacket.warningCount = data.readUInt16LE(index); // The number of warnings
	index += 2 ;
	okPacket.message = "";c// The message field is optional. 

	if(packetLenght >= (index-4)) // Ensuring if the message field Exist or Not

		okPacket.message = data.toString('utf-8',index); // Read until the end of OK Packet

	okPacket.isValid = true; // There is a OK Packet neither Error Packet  nor RowDATA packet

	return okPacket;

}
function mysqlError (data){

	var error = {};
	var index = 5;

	error.errno = data.readUInt16LE(index);	//  Error Number: The possible values are listed in the MySQL source code file /include/mysqld_error.h
	index+= 8;
	error.message = data.toString('utf-8', index); // The Error message

	error.isValid = true; // There is an Error Packet neither OK Packet  nor RowDATA packet

	return error;
}


function IsNumeric(n) {

	return !isNaN(parseFloat(n)) && isFinite(n);

}

var
/************************Flags Constants**********************/
/*************************************************************/
	flags = {

		CLIENT_LONG_PASSWORD	: 1	,
		CLIENT_FOUND_ROWS	: 2	,
		CLIENT_LONG_FLAG	: 4	,
		CLIENT_CONNECT_WITH_DB	: 8	,
		CLIENT_NO_SCHEMA	: 16	,
		CLIENT_COMPRESS		: 32	,
		CLIENT_ODBC		: 64	,
		CLIENT_LOCAL_FILES	: 128	,
		CLIENT_IGNORE_SPACE	: 256	,
		CLIENT_PROTOCOL_41	: 512	,
		CLIENT_INTERACTIVE	: 1024	,
		CLIENT_SSL              : 2048	,
		CLIENT_IGNORE_SIGPIPE   : 4096    ,
		CLIENT_TRANSACTIONS	: 8192	,
		CLIENT_RESERVED         : 16384   ,
		CLIENT_SECURE_CONNECTION : 32768  ,
		CLIENT_MULTI_STATEMENTS : 65536   ,
		CLIENT_MULTI_RESULTS    : 131072  

},

	defaultFlag = 

		flags.CLIENT_LONG_PASSWORD
		| flags.CLIENT_FOUND_ROWS
		| flags.CLIENT_LONG_FLAG
		| flags.CLIENT_CONNECT_WITH_DB
		| flags.CLIENT_ODBC
		| flags.CLIENT_LOCAL_FILES
		| flags.CLIENT_IGNORE_SPACE
		| flags.CLIENT_PROTOCOL_41
		| flags.CLIENT_INTERACTIVE
		| flags.CLIENT_IGNORE_SIGPIPE
		| flags.CLIENT_TRANSACTIONS
		| flags.CLIENT_RESERVED
		| flags.CLIENT_SECURE_CONNECTION
		| flags.CLIENT_MULTI_STATEMENTS
		| flags.CLIENT_MULTI_RESULTS;
        
