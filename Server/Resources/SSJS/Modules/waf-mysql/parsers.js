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
//	Length Coded Binary Constants 
var
    CONSTANTS;

CONSTANTS = {};

Object.defineProperties(CONSTANTS, {
    LENGTH_CODED_NULL: {// column value = NULL
        value: 251,
        writable: false
    },
    LENGTH_CODED_16BIT_WORD: {// value of following 16-bit word
        value: 252,
        writable: false
    },
    LENGTH_CODED_24BIT_WORD: {
        value: 253,
        writable: false
    },
    LENGTH_CODED_64BIT_WORD: {
        value: 254,
        writable: false
    }
});


// Null-Terminated String function used for some variable-length character strings. The value '\0' (sometimes written 0x00) denotes the end of the string.
exports.readString = function readString(position, buf, maxLen) {

    var
        i;

    i = position;

    while ((i < maxLen) && (buf.readUInt8(i) !== 0)) {
        i += 1;
    }

    return i;

};

//	Read a Length Coded Binary Number:  Compute the value of a Length Coded Binary by examining it's first Byte
exports.ReadLengthCodedBinary = function ReadLengthCodedBinary(index, buff) {

    var
        toReturn,
        c;

    toReturn = {};

    // Compute the value of its first byte.
    c = buff.readUInt8(index);

    //  Examine the value of its first byte. 

    //  The Value of this number is the value of following 2 Bytes
    switch (c) {
    case CONSTANTS.LENGTH_CODED_16BIT_WORD:

        index += 1;
        toReturn.value = buff.readUInt16LE(index);
        index += 2;
        toReturn.position = index;
        break;

    //  The Value of this number is the value of following 3 Bytes
    case CONSTANTS.LENGTH_CODED_24BIT_WORD:

        index += 1;
        toReturn.value = buff.readUInt16LE(index);
        index += 2;
        toReturn.value += buff.readUInt8(index) << 8;
        index += 1;
        toReturn.position = index;
        break;

    //  The Value of this number is the value of following 2 Bytes
    case CONSTANTS.LENGTH_CODED_64BIT_WORD:

        index += 1;
        toReturn.value = buff.readUInt32LE(index);
        index += 4;
        toReturn.value += buff.readUInt32LE(index) << 32;
        index += 4;
        toReturn.position = index;
        break;

    //  The Value of this number is null
    case CONSTANTS.LENGTH_CODED_NULL:

        index += 1;
        toReturn.value = null;
        toReturn.position = index;
        break;

    //  The Value of this number is exactly the value of it's first Byte.
    default:

        if (c < CONSTANTS.LENGTH_CODED_NULL) {
            index += 1;
            toReturn.value = c;
            toReturn.position = index;
        } else {
            // unexpected value.. 
            // should it be ignored?
            // should it log a warning? throw an exception?
        }
    }

    return toReturn;

};



