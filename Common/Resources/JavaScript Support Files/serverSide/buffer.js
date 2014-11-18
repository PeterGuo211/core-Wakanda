/**
 *
 * Buffer objects allow you to read and write binary data directly in JavaScript.
 *
 * @class Buffers
 * @extends Object
 *
 */
Buffer = function Buffer() {
    
    
    /**
     * returns the size in bytes of the buffer
     *
     * @property length
     * @attributes ReadOnly
     * @type Number
     */
    this.length =  0; 
    
    
    /**
     * constructor method    can be used with the Buffer( ) constructor to check if the given obj is a buffer
     *
     * @method isBuffer
     * @param {Object} obj
     * @return {Boolean}
     */
    this.isBuffer = function isBuffer(obj) {        return true;     };
    
    /**
     * constructor method    can be used with the Buffer( ) constructor to return the size in bytes of the given string when encoded using a specific encoding
     *
     * @method byteLength
     * @param {String} string
     * @param {String} encoding
     * @return {Number}
     */
    this.byteLength = function byteLength(string, encoding) {        return 0;     };
    
    /**
     * returns a Blob object containing a copy of the Buffer bytes
     *
     * @method toBlob
     * @param {String} mimeType
     * @return {Blob}
     */
    this.toBlob = function toBlob(mimeType) {        return new Blob( );     };
    
    /**
     * writes the 64-bit double value to the Buffer with the Big Endian format
     *
     * @method writeDoubleBE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {             };
    
    /**
     * returns a 64 bit double value read from the Buffer with the Big Endian format
     *
     * @method readDoubleBE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readDoubleBE = function readDoubleBE(offset, noAssert) {        return 0;     };
    
    /**
     * writes the 32-bit float value to the Buffer with the Big Endian format
     *
     * @method writeFloatBE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeFloatBE = function writeFloatBE(value, offset, noAssert) {             };
    
    /**
     * returns a 32-bit float value read from the Buffer with the Big Endian format
     *
     * @method readFloatBE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readFloatBE = function readFloatBE(offset, noAssert) {        return 0;     };
    
    /**
     * writes the 32-bit signed integer value to the Buffer with the Big Endian format
     *
     * @method writeInt32BE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeInt32BE = function writeInt32BE(value, offset, noAssert) {             };
    
    /**
     * writes the 32-bit unsigned integer value to the Buffer with the Big Endian format
     *
     * @method writeUInt32BE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {             };
    
    /**
     * returns a signed 32-bit integer value read from the Buffer with the Big Endian format
     *
     * @method readInt32BE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readInt32BE = function readInt32BE(offset, noAssert) {        return 0;     };
    
    /**
     * returns an unsigned 32-bit integer value read from the Buffer with the Big Endian format
     *
     * @method readUInt32BE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readUInt32BE = function readUInt32BE(offset, noAssert) {        return 0;     };
    
    /**
     * writes the 24-bit signed integer value to the Buffer with the Big Endian format
     *
     * @method writeInt24BE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeInt24BE = function writeInt24BE(value, offset, noAssert) {             };
    
    /**
     * writes the 24-bit signed integer value to the Buffer with the Little Endian format
     *
     * @method writeInt24LE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeInt24LE = function writeInt24LE(value, offset, noAssert) {             };
    
    /**
     * writes the 24-bit unsigned integer value to the Buffer with the Big Endian format
     *
     * @method writeUInt24BE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeUInt24BE = function writeUInt24BE(value, offset, noAssert) {             };
    
    /**
     * writes the 24-bit unsigned integer value to the Buffer with the Little Endian format
     *
     * @method writeUInt24LE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeUInt24LE = function writeUInt24LE(value, offset, noAssert) {             };
    
    /**
     * returns a signed 24-bit integer value read from the Buffer with the Big Endian format
     *
     * @method readInt24BE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readInt24BE = function readInt24BE(offset, noAssert) {        return 0;     };
    
    /**
     * returns a signed 24-bit integer value read from the Buffer with the Little Endian format
     *
     * @method readInt24LE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readInt24LE = function readInt24LE(offset, noAssert) {        return 0;     };
    
    /**
     * returns an unsigned 24-bit integer value read from the Buffer with the Big Endian format
     *
     * @method readUInt24BE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readUInt24BE = function readUInt24BE(offset, noAssert) {        return 0;     };
    
    /**
     * returns an unsigned 24-bit integer value read from the Buffer with the Little Endian format
     *
     * @method readUInt24LE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readUInt24LE = function readUInt24LE(offset, noAssert) {        return 0;     };
    
    /**
     * writes the 16-bit signed integer value to the Buffer with the Big Endian format
     *
     * @method writeInt16BE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeInt16BE = function writeInt16BE(value, offset, noAssert) {             };
    
    /**
     * writes the 16-bit unsigned integer value to the Buffer with the Big Endian format
     *
     * @method writeUInt16BE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {             };
    
    /**
     * writes the string parameter to the Buffer at the offset position and returns the number of bytes written
     *
     * @method write
     * @param {String} string
     * @param {Number} offset
     * @param {String} encoding
     * @return {Number}
     */
    this.write = function write(string, offset, encoding) {        return 0;     };
    
    /**
     * converts the buffer contents into a string
     *
     * @method toString
     * @param {String} encoding
     * @param {Number} start
     * @param {Number} end
     * @return {String}
     */
    this.toString = function toString(encoding, start, end) {        return '';     };
    
    /**
     * copies into targetBuffer the Buffer to which it is applied
     *
     * @method copy
     * @param {Buffer} targetBuffer
     * @param {Number} targetOffset
     * @param {Number} sourceOffset
     * @param {Number} sourceEnd
     */
    this.copy = function copy(targetBuffer, targetOffset, sourceOffset, sourceEnd) {             };
    
    /**
     * fills the Buffer to which it is applied with the character you passed in value
     *
     * @method fill
     * @param {String} value
     * @param {Number} offset
     * @param {Number} length
     */
    this.fill = function fill(value, offset, length) {             };
    
    /**
     * writes the 64-bit double value to the Buffer with the Little Endian format
     *
     * @method writeDoubleLE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {             };
    
    /**
     * writes the 32-bit float value to the Buffer with the Little Endian format
     *
     * @method writeFloatLE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeFloatLE = function writeFloatLE(value, offset, noAssert) {             };
    
    /**
     * writes the 32-bit signed integer value to the Buffer with the Little Endian format
     *
     * @method writeInt32LE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeInt32LE = function writeInt32LE(value, offset, noAssert) {             };
    
    /**
     * writes the 16-bit signed integer value to the Buffer with the Little Endian format
     *
     * @method writeInt16LE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeInt16LE = function writeInt16LE(value, offset, noAssert) {             };
    
    /**
     * writes the 8-bit signed integer value to the Buffer to which it is applied
     *
     * @method writeInt8
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeInt8 = function writeInt8(value, offset, noAssert) {             };
    
    /**
     * writes the 32-bit unsigned integer value to the Buffer with the Little Endian format
     *
     * @method writeUInt32LE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {             };
    
    /**
     * writes the 16-bit unsigned integer value to the Buffer with the Little Endian format
     *
     * @method writeUInt16LE
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {             };
    
    /**
     * writes the 8-bit unsigned integer value to the Buffer to which it is applied
     *
     * @method writeUInt8
     * @param {Number} value
     * @param {Number} offset
     * @param {Boolean} noAssert
     */
    this.writeUInt8 = function writeUInt8(value, offset, noAssert) {             };
    
    /**
     * returns a 64 bit double value read from the Buffer with the Little Endian format
     *
     * @method readDoubleLE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readDoubleLE = function readDoubleLE(offset, noAssert) {        return 0;     };
    
    /**
     * returns a 32-bit float value read from the Buffer with the Little Endian format
     *
     * @method readFloatLE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readFloatLE = function readFloatLE(offset, noAssert) {        return 0;     };
    
    /**
     * returns a signed 16-bit integer value read from the Buffer with the Little Endian format
     *
     * @method readInt16LE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readInt16LE = function readInt16LE(offset, noAssert) {        return 0;     };
    
    /**
     * returns a signed 8-bit integer value read from the Buffer to which it is applied
     *
     * @method readInt8
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readInt8 = function readInt8(offset, noAssert) {        return 0;     };
    
    /**
     * returns an unsigned 32-bit integer value read from the Buffer with the Little Endian format
     *
     * @method readUInt32LE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readUInt32LE = function readUInt32LE(offset, noAssert) {        return 0;     };
    
    /**
     * returns an unsigned 16-bit integer value read from the Buffer with the Little Endian format
     *
     * @method readUInt16LE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readUInt16LE = function readUInt16LE(offset, noAssert) {        return 0;     };
    
    /**
     * returns an unsigned 8-bit integer value read from the Buffer to which it is applied
     *
     * @method readUInt8
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readUInt8 = function readUInt8(offset, noAssert) {        return 0;     };
    
    /**
     * creates a new Buffer object by referencing the contents of the bytes array of the Buffer to which it is applied, from start to end
     *
     * @method slice
     * @param {Number} start
     * @param {Number} end
     * @return {Buffer}
     */
    this.slice = function slice(start, end) {        return new Buffer( );     };
    
    /**
     * returns a signed 32-bit integer value read from the Buffer with the Little Endian format
     *
     * @method readInt32LE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readInt32LE = function readInt32LE(offset, noAssert) {        return 0;     };
    
    /**
     * returns an unsigned 16-bit integer value read from the Buffer with the Big Endian format
     *
     * @method readInt16BE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readInt16BE = function readInt16BE(offset, noAssert) {        return 0;     };
    
    /**
     * returns an unsigned 16-bit integer value read from the Buffer with the Big Endian format
     *
     * @method readUInt16BE
     * @param {Number} offset
     * @param {Boolean} noAssert
     * @return {Number}
     */
    this.readUInt16BE = function readUInt16BE(offset, noAssert) {        return 0;     };
    

};

