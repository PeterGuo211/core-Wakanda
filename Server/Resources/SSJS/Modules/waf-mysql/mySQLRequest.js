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
    net,
    Parser,
    constants,
    charsetMap,
    typeMap,
    
    /*********Module level used constants*************/
    index,//the current position in the buffer
    buffer,// Here we receive all data from the server
    fullLength;//the length of received buffer

    
net = requireNative('net');
Parser = require('waf-mysql/parsers');
constants = require('waf-mysql/constants');
/************************Main function************************/
/*************************************************************/

exports.mySQLRequest = function (mysqlConnection, sqlQuery){
    
    var
    	
        limite,
        colomuns,
        rowData,
        col,
        resultSetHeaderLength,
        resultSetFieldCount,
        isFinished,
        resultDatas,// @todo data is plural... rename resultDataArray or List
        okPacket,
        errorPacket,
        
        HEADER_LENGTH,
        
        buf0,
        len,
        packLength,
        sendCommand,
        index2;


    limite = 0;
    colomuns = [];
    rowData = [];
    col = 0;
    isFinished = false;
    resultDatas = [];
    okPacket = {};
    errorPacket = {};
    
    index = 0;
    buffer = null;
    fullLength = 0;
    
    HEADER_LENGTH = 4;

function readData(){
		
        index = 0; //because we have a new buffer data we should initialize the position to 0
        buffer = mysqlConnection.read();
        fullLength = buffer.length;
        
}

function read(amount){
    var 
        position,
        stillToRead,
        canRead,
        result,
        lengthCoded;

    position = index;

    if (amount < 5) {//if the data to read is a number

        if (position + amount <= fullLength) {//if the amount of data to read is in this buffer

            switch (amount) {

            case 1:

                index += 1;
                result = buffer.readUInt8(position);

                break;

            case 2:

                index += 2;
                result = buffer.readUInt16LE(position);

                break;

            case 3:

                index += 3;
                result = buffer.readUInt8(position++) + (buffer.readUInt16LE(position)<<8);

                break;

            case 4:

                index += 4;
                result = buffer.readUInt32LE(position);

                break;

            case 8:

                index += 8;
                result = buffer.readDoubleLE(position);

                break;
                
            default:

                // unexpected case!
                // log warning? 
                // throw exception?
                result =  undefined;
            }
              
			return result;

        } else {//if the amount of data is in this buffer and the rest in the next buffer

            stillToRead = position + amount - fullLength;//to read from the next buffer
            canRead = amount - stillToRead;//to read from the current buffer

            result = 0;

            switch (canRead) {//read only the first part from this buffer

            case 1:

                index += 1;
                result = buffer.readUInt8(position);

                break;

            case 2:

                index += 2;
                result = buffer.readUInt16LE(position);

                break;

            case 3:

                index += 3;
                result = buffer.readUInt24LE(position);

                break;

            case 4:

                index +=4;
                result = buffer.readUInt32LE(position);

                break;

            case 5:

                index +=5;
                result = buffer.readUInt8(position++) + (buffer.readUInt32LE(position) << 8);

                break;

            case 6:

                index +=6;
                result = buffer.readUInt16LE(position++) + (buffer.readUInt32LE(position) << 16);

                break;

            case 7:

                index += 7;
                result = buffer.readUInt8(position++) + (buffer.readUInt16LE(position++) << 8) + (buffer.readUInt32LE(position) << 24);

                break;

            case 8:

                index += 8;
                result = buffer.readDoubleLE(position);

                break;

            default:

                // unexpected case
                // log warning?
                // throw exception?

            }

            //we've read the first part and we wait for the second part
            readData();

            //complete the data with the second part 
            switch (stillToRead) {

            case 1:

                position = index;
                index += 1;
                result = result  + (buffer.readUInt8(position) << (canRead * 8));// because numbers are in little Endian

                break;

            case 2:

                position = index;
                index += 2;
                result = result  + (buffer.readUInt16LE(position) <<  (canRead * 8));

                break;

            case 3:

                position = index;
                index += 3;
                result = result  + (buffer.readUInt24LE(position) <<  (canRead * 8));

                break;

            case 4:

                position = index;
                index += 4;
                result = result  + (buffer.readUInt32LE(position) <<  (canRead * 8));

                break;

            case 5:

                position = index;
                index += 5;
                result = result  + (( buffer.readUInt8(position++) + (buffer.readUInt32LE(position) << 8)) <<  (canRead * 8));

                break;

            case 6:

                position = index;
                index += 6;
                result = result  + (( buffer.readUInt16LE(position++)+(buffer.readUInt32LE(position) << 16)) <<  (canRead*8));

                break;

            case 7:

                position = index;
                index += 7;
                result = result  + (( buffer.readUInt8(position++) + 256*buffer.readUInt16LE(position++) + (buffer.readUInt32LE(position) << 24)) <<  (canRead*8));

                break;

            case 8:

                position = index;
                index += 4;
                result = result  + (buffer.readDoubleLE(position) <<  (canRead*8));

                break;

            default:

                // unexpected case
                // log warning?
                // throw exception?

            }
			
			
            return result;
        }

    } else {//if the data to read is a length coded binary or length coded string

        switch (amount) {

        case cRead.READ_LENGHT_CODED_INT:

            lengthCoded = lengthCodedBinary();
            return lengthCoded;
            //break; // break is useless after a return

        case cRead.READ_LENGHT_CODED_STRING:
			
			result = {
				data : "",
				readedBytesLength : 0
			};
           
            return lengthCodedString(result, 0);
            //break; // break is useless after a return

        default:
            // unexpected case
            // log warn?
            // throw exception
            return undefined;

        }

    }
    
}

function lengthCodedString(r,l) {

    var 
        len,
        result,
        lengthCoded,
        position;
	
	result = {};
    len = l;
	
	result.data = r.data;
	result.readedBytesLength = r.readedBytesLength;

    if (len == 0) {

        lengthCoded = lengthCodedBinary();

        len = lengthCoded.data;
        result.readedBytesLength = len + lengthCoded.readedBytesLength;

    }

    position = index;

    if (position + len <= fullLength) {

        index += len;
        result.data += buffer.toString('utf-8', position, position + len);

        return result;

    } else {

        len -= (fullLength - position);
        result.data += buffer.toString('utf-8', position, fullLength);

        readData();

        return lengthCodedString(result, len);
    }

}
	
function lengthCodedBinary() {

    var 
        result,
        firstByte;
    
    result = {};
    firstByte = read(cRead.READ_INT_8);

    switch (firstByte) {

    case lengthCoded.LENGTH_CODED_2BYTES:
		
		result = {
			data : read(cRead.READ_INT_16),
			readedBytesLength : 3
		};

        break;

    case lengthCoded.LENGTH_CODED_3BYTES:

        result = {
			data : read(cRead.READ_INT_24),
			readedBytesLength : 4
		};

        break;

    case lengthCoded.LENGTH_CODED_8BYTES:

        result = {
			data : read(cRead.READ_INT_32),
			readedBytesLength : 5
		};

        break;

    case lengthCoded.LENGTH_CODED_NULL:
		
		result = {
			data : null,
			readedBytesLength : 1
		};

        break;

    default:

        if (firstByte < lengthCoded.LENGTH_CODED_NULL) {
			
			result = {
				data : firstByte,
				readedBytesLength : 1
			};

        } else {

            // unexpected value
            // log? Exception?

        }

        break;

    }

    return result;

}

//EOF Packet is receieved at the end of a series of Field Packets, and at the end of a series of Data Packets. 
function eofPacket(){

    var
        EOFPacket;

    EOFPacket = {

        length:         read(3),// The length, in bytes, of the packet that follows the Packet Header
        number:         read(1),// Sequence number
        fieldCount:     read(1),// This value is always 0xfe (decimal 254).
        warningCount:   read(2),// Number of warnings. Sent after all data has been sentto the client.
        serverStatus:   read(2)//  Contains flags like serverFlags.SERVER_MORE_RESULTS_EXISTS to know if there is another packet coming.

    };

    return EOFPacket;

}

//in the case when the EOF Packet is between two received data from the server(the first part in the current buffer and the second part is to read from the next buffer)
function eofHalfPacket(){

    var
        EOFPacket;

    EOFPacket = {

        fieldCount:     read(1),
        warningCount:   read(2),
        serverStatus:   read(2)

    };

    return EOFPacket;

}

//get the next data and fill the buffer with.
function readNextBlock(){

   readData();
   
}
    /**         ------> sendQueryPacket
                <------ getQueryResultPacket
                    ------ [error packet] if there is an error
                    --or-- [Ok packet] in the case of Update/Delete/Drop/Insert
                    --or-- [field packets] + [EOF packets] + [rowData packets]
     **/

    /******send Closure Function*******/

    /******Get Closure Function*******/

    function getQueryResultPacket (data) {
     
		
		 var
            isMoreResult,
            isNextRow,
            isNewPacket,
            incompleteEOF,
            eof,

            hasRead,
            affectedRows,
            insertId,
            
            r,
            l,
            
            i,
            mysqlInfo,
            title,
            jsType,
            
            rowPacket,
            columnValue,
            
            z;
        
        isMoreResult = true;
        isNextRow = true;
        isNewPacket = true;
        incompleteEOF = false;
		
		readData();
		
        while(isMoreResult){

            if (((fullLength > index + 4) && buffer[index + 4] === 0xfe) || incompleteEOF ) { //if the end of the first statment, Verify if there is another

                eof = {};

                if (incompleteEOF) {// if the EOF Packet is incomplete then read the second part
                
                    eof = eofHalfPacket();
                    
                } else {
                
                    eof = eofPacket();// else read the whole packet
                    
                }
                
                var resultData = {
                    rowData     :   rowData, // if the command was a query which returned a result set.
                    colomuns    :   colomuns // if the command was a query which returned a result set we receive Column fields
                };
                
                resultDatas.push(resultData);
                rowData = [];
                col = 0;
                colomuns = [];

                if((eof.serverStatus & serverFlags.SERVER_MORE_RESULTS_EXISTS) == 0){ // if there is always data to read from the server

                    isMoreResult = false;
                    isNextRow = false;

                    return true;

                } 
                else {

                    isMoreResult = true;
                    isNewPacket = true;
                }

            } 
            else {

                isNextRow = true;

            }

            if (isMoreResult && isNewPacket) {//if there is more data to read for a new statemnt 
                                
                //we don't know yet the nature of this packet if Ok or error packet we read 4 bytes of those, else we read the 4 bytes of the resultSet Packet of Row Data '
                resultSetHeaderLength = read(3);
            	read(1);

            }

            if (isMoreResult && isNewPacket && buffer[index] === 0x00) { //if the packet to read is an OK Packet

                hasRead = 0; // if the information has been read less than the length of the packet so there is a message field
                okPacket = {};

                read(cRead.READ_INT_8); // field_count: always = 0
                hasRead += 1;

                affectedRows = read(cRead.READ_LENGHT_CODED_INT);// affected_rows:the number of rows affected by INSERT/UPDATE/DELETE
                okPacket.affectedRows = affectedRows.data;
                hasRead += affectedRows.readedBytesLength;

                insertId = read(cRead.READ_LENGHT_CODED_INT); //  If the statement generated any AUTO_INCREMENT number,the number is returned here. Otherwise this field contains 0
                okPacket.insertId = insertId.data;
                hasRead += insertId.readedBytesLength;

                okPacket.serverStatus = read(cRead.READ_INT_16); // if there are more informations to read from the server
                hasRead += 2;

                okPacket.warningCount = read(cRead.READ_INT_16); // number of warnings inside this transaction
                hasRead += 2;

                okPacket.message = "";

                if (resultSetHeaderLength>hasRead) { // if this packet has a message field

                    r = {
                    
                        data:               "",
                        readedBytesLength:  0
                    };

                    l = resultSetHeaderLength-hasRead;// the length of the message field
                    okPacket.message = lengthCodedString(r, l).data;

                }

                okPacket.isValid = true; //  if the command was no error and no result set

                resultData = {

                    rowData     :   rowData,
                    okPacket    :   okPacket,
                    errorPacket :   errorPacket,
                    colomuns    :   colomuns

                };

                resultDatas.push(resultData);
                resultData = {};

                isNewPacket = true;

                if ((okPacket.serverStatus & serverFlags.SERVER_MORE_RESULTS_EXISTS) == 0) { // if the server has more result to read

                    isMoreResult = false;
                    isNewPacket = false;

                    return true;

                }

                okPacket = {};

            }
            else if (isMoreResult  && isNewPacket &&  buffer[index] === 0xff ) { // if error

                hasRead = 0;
                errorPacket = {};

                read(cRead.READ_INT_8);// field count: always = 0xff
                hasRead += 1;

                errorPacket.errno = read(cRead.READ_INT_16);// Error code
                hasRead += 2;

                read(cRead.READ_INT_32);// sqlstate marker: this is always '#'
                hasRead += 4;

                read(cRead.READ_INT_32);// sqlstate: The server translates errno values to sqlstate values
                hasRead += 4;

                if (resultSetHeaderLength > hasRead) {// if there is an error message field

                    r = {
                        data:              "",
                        readedBytesLength:  0
                    };

                    l = resultSetHeaderLength - hasRead;
                    errorPacket.message = lengthCodedString(r, l).data;

                }

                errorPacket.isValid = true;
                okPacket = {};

                resultData = {

                    rowData		:     rowData,
                    okPacket	:    okPacket,
                    errorPacket	: errorPacket,
                    colomuns	:    colomuns

                };
                
                resultDatas.push(resultData);
                resultData = {};

                isMoreResult = false;
                isNewPacket = false;

                return true; // after an error packet there is always no more information to read from the server

            }
            else {// if the command was a query which returned a result set

                if (isMoreResult && isNewPacket) { // when this is a new statement

                    resultSetFieldCount = read(cRead.READ_LENGHT_CODED_INT).data // the number of columns

                    for (i = 0; i < resultSetFieldCount; i += 1){
                    
                        mysqlInfo = {}; // informations of this column
                        read(cRead.READ_INT_24); //  the length of this column
                        read(cRead.READ_INT_8); // the sequence number

                        mysqlInfo.catalog = read(cRead.READ_LENGHT_CODED_STRING).data; // Catalog For 4.1, 5.0 and 5.1 the value is "def"
                        mysqlInfo.db = read(cRead.READ_LENGHT_CODED_STRING).data; // Database identifier, also known as schema name
                        mysqlInfo.table = read(cRead.READ_LENGHT_CODED_STRING).data; //  Table identifier, after AS clause (if any)
                        mysqlInfo.org_table = read(cRead.READ_LENGHT_CODED_STRING).data; // Original table identifier, before AS clause (if any)

                        title = read(cRead.READ_LENGHT_CODED_STRING).data; // Column identifier, after AS clause (if any)
                        mysqlInfo.org_name = read(cRead.READ_LENGHT_CODED_STRING).data; //  Column identifier, before AS clause 
                        read(cRead.READ_INT_8); // always is 0x00
                        mysqlInfo.charsetNumber = constants.reverseCharsetMap[read(cRead.READ_INT_16)]; //  Character set number
                        mysqlInfo.fieldLength = read(cRead.READ_INT_32); // Length of column

                        jsType = typeMap[read(cRead.READ_INT_8)]; // The code for the column's data type for ex:   0x00  for  FIELD_TYPE_DECIMAL,  0x0d   for FIELD_TYPE_YEAR
                        mysqlInfo.flags = read(cRead.READ_INT_16); //  ex:  0001 NOT_NULL_FLAG, 0002 PRI_KEY_FLAG, 0004 UNIQUE_KEY_FLAG ...
                        mysqlInfo.decimals = read(cRead.READ_INT_8); // the number of positions after the decimalpoint if the type is DECIMAL or NUMERIC
                        read(cRead.READ_INT_16); // always 0x00

                        colomuns[i] = {
                            mysqlInfo   :   mysqlInfo,
                            title       :   title,
                            jsType      :   jsType
                        };

                    }
					 
                    eofPacket(buffer,index); // the END of the Field Packet 
                    isNewPacket = false;
                }

                
				var newrow = {};
                if (isNextRow) {// One packet for each row in the result set that contains all columns
					 
					
                    rowPacketlength = read(3);
                    number = read(1);
                    limite = rowPacketlength;// still to read
					
                    if (index < (fullLength - 1) && buffer[index] === 0xfe && rowPacketlength === 5) { // if the row is empty and the eof packet still not finished
                        
                        limite = -1;
                        incompleteEOF = true;

                    } else if (index == (fullLength - 1) && buffer[index] === 0xfe &&  rowPacketlength == 5) {// if the row is empty and the eof packet is finished
						
                        readData();

                        if (buffer[index] === 0xfe) {

                            limite = -1;
                            incompleteEOF = true;

                        }

                    }

                }
                                
                while (limite > 0 ) { // if this row has always informations to read

                    columnValue = read(cRead.READ_LENGHT_CODED_STRING);
                    limite -= columnValue.readedBytesLength;
                    newrow[colomuns[col].title] = columnValue.data;
                    col++;
                }

                if (limite == 0 ) { // there is no more informations to read in this row, go and read next row
                    
                    rowData.push(newrow);
                    col = 0;	

                } else if (limite == -1 ) { // there is no more informations to read in this row and this row is empty

                    rowData.push({});
                    col = 0;	

                }
            }

        }

    }
	
       /***********************************/
    //Create Query Packet
   
    buf0 = new Buffer(sqlQuery.length * 3);// to support Encoding in 3 Bytes
    len = buf0.write(sqlQuery, 0);
    packLength = HEADER_LENGTH + 1 + len;
    sendCommand = new Buffer(packLength);
    index2 = 0;
    sendCommand.writeUInt24LE(packLength - HEADER_LENGTH, index2);
    index2 += 3;
    sendCommand.writeUInt8(0, index2);
    index2 += 1;
    sendCommand [index2] = constants.commands.COM_QUERY;
    index2 += 1;
    sendCommand.write(sqlQuery, index2, 'utf-8');

    // Ready to receive Data from the server
   
    mysqlConnection.write(sendCommand);
    isFinished = false;// To be sure of receiving & finishing reading all Data
    
    isFinished = getQueryResultPacket(buffer);// examine received data and return true if it's finished.
    return resultDatas;
};

/************************Logical functions*********************/
/*************************************************************/

//the equivalent of MySQL type in Wakanda
(function scopeCreateTypeMap() {

    var
        longV,
        numberV,
        nullV,
        durationV,
        long64V,
        dateV,
        stringV,
        boolV,
        enumV,
        setV,
        blobV,
        geometryV;

    longV = 'long';
    numberV = 'number';
    nullV = 'NULL';
    durationV = 'duration';
    long64V = 'long64';
    dateV = 'date';
    stringV = 'string';
    boolV = 'bool';
    enumV = 'ENUM';
    setV = 'SET';
    blobV = 'blob';
    geometryV = 'GEOMETRY'
    
    typeMap = [

        longV,//     0
        longV,//     1
        longV,//     2
        longV,//     3
        numberV,//   4
        numberV,//   5
        nullV,//     6
        durationV,// 7
        long64V,//   8
        numberV,//   9
        dateV,//    10
        dateV,//    11
        dateV,//    12
        dateV,//    13
        dateV,//    14
        stringV,//  15
        boolV//     16

    ];
    
    typeMap.length = 246;
    
    typeMap.push(

        long64V,//   246
        enumV,//     247
        setV,//      248
        blobV,//     249
        blobV,//     250
        blobV,//     251
        blobV,//     252
        stringV,//   253
        stringV,//   254
        geometryV//  255

    );


}());





var
/*********Server Status constants*************/

 
serverFlags = {
	SERVER_STATUS_IN_TRANS : 1,
	SERVER_STATUS_AUTOCOMMIT : 2, 
	SERVER_MORE_RESULTS_EXISTS : 8, 
	SERVER_QUERY_NO_GOOD_INDEX_USED : 16,
	SERVER_QUERY_NO_INDEX_USED : 32,
	SERVER_QUERY_WAS_SLOW : 2048,
	SERVER_STATUS_CURSOR_EXISTS : 64

},

/*********Reading type*************/
cRead = {
	READ_INT_8 : 1,
	READ_INT_16 : 2,
	READ_INT_24 : 3,
	READ_INT_32 : 4,
	READ_INT_64 : 8,
	READ_LENGHT_CODED_INT : 5,
	READ_LENGHT_CODED_STRING : 6

},

/*******Length Coded Constants*******/


lengthCoded = {
	LENGTH_CODED_NULL : 251,
	LENGTH_CODED_2BYTES : 252,
	LENGTH_CODED_3BYTES : 253,
	LENGTH_CODED_8BYTES : 254

};
