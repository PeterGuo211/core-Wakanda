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
// Buffer object compatible with NodeJS.
// http://nodejs.org/docs/v0.5.1/api/buffers.html

var testCase = {

    name: 'Buffer Test',

    _should: {

        ignore: {

        }

    },

    // Check if Buffer() object exists.

    testIsBufferAvailable: function() {

        Y.Assert.isObject(Buffer);

    },

    // Check Buffer object attributes (isBuffer() and byteLength() functions).

    testBufferObjectAttributes: function() {

        Y.Assert.isObject(Buffer.isBuffer);
        Y.Assert.isObject(Buffer.byteLength);

    },

    // Check Buffer constructors, instance attribute "length", along with isBuffer() and byteLength().
    // Note that the size of the allocated buffer may be bigger than asked/needed (byteLength() but not smaller.
    // Also check the toString() function to check for proper encoding/decoding.

    testBufferConstructor: function() {

        var buffer;

        // new Buffer(integerSize);

        buffer = new Buffer(100);
        Y.Assert.isTrue(Buffer.isBuffer(buffer));

        Y.Assert.isNumber(buffer.length);

        Y.Assert.isTrue(buffer.length >= 100);

        // new Buffer(arrayObject);

        var array = new Array();

        array[0] = 1;
        array[1] = 2;
        array[2] = 3;

        buffer = new Buffer(array);
        Y.Assert.isTrue(Buffer.isBuffer(buffer));
        Y.Assert.isTrue(buffer.length >= 3);
        Y.Assert.isTrue(buffer[0] == 1);
        Y.Assert.isTrue(buffer[1] == 2);
        Y.Assert.isTrue(buffer[2] == 3);

        // new Buffer(string, encoding);

        var testString = 'abcd1234';

        buffer = new Buffer(testString);        // If no encoding, defaults to "utf8".        
        Y.Assert.isTrue(Buffer.isBuffer(buffer));
        Y.Assert.isTrue(buffer.length >= Buffer.byteLength(testString));
        Y.Assert.isTrue(buffer.toString() == testString);

        var defaultUTF8Buffer = buffer;

        buffer = new Buffer(testString, 'utf8');
        Y.Assert.isTrue(Buffer.isBuffer(buffer));
        Y.Assert.isTrue(buffer.length >= Buffer.byteLength(testString, 'utf8'));
        Y.Assert.isTrue(buffer.toString('utf8') == testString);

        Y.Assert.isTrue(defaultUTF8Buffer.length == buffer.length);  // Check size match.        

        buffer = new Buffer(testString, 'ascii');
        Y.Assert.isTrue(Buffer.isBuffer(buffer));
        Y.Assert.isTrue(buffer.length >= Buffer.byteLength(testString, 'ascii'));
        Y.Assert.isTrue(buffer.toString('ascii') == testString);

        buffer = new Buffer(testString, 'ucs2');
        Y.Assert.isTrue(Buffer.isBuffer(buffer));
        Y.Assert.isTrue(buffer.length >= Buffer.byteLength(testString, 'ucs2'));
        Y.Assert.isTrue(buffer.toString('ucs2') == testString);

        buffer = new Buffer(testString, 'base64');
        Y.Assert.isTrue(Buffer.isBuffer(buffer));
        Y.Assert.isTrue(buffer.length >= Buffer.byteLength(testString, 'base64'));
        Y.Assert.isTrue(buffer.toString('base64') == testString);

        buffer = new Buffer(testString, 'binary');
        Y.Assert.isTrue(Buffer.isBuffer(buffer));
        Y.Assert.isTrue(buffer.length >= Buffer.byteLength(testString, 'binary'));
        Y.Assert.isTrue(buffer.toString('binary') == testString);

        buffer = new Buffer(testString, 'hex');
        Y.Assert.isTrue(Buffer.isBuffer(buffer));
        Y.Assert.isTrue(buffer.length >= Buffer.byteLength(testString, 'hex'));
        Y.Assert.isTrue(buffer.toString('hex') == testString);

    },

    // Check created Buffer for existence of instance functions.

    testBufferInstanceAttributes: function() {

        var buffer = new Buffer(1);

        Y.Assert.isObject(buffer.write);
        Y.Assert.isObject(buffer.toString);
        Y.Assert.isObject(buffer.toBlob);
        Y.Assert.isObject(buffer.copy);
        Y.Assert.isObject(buffer.slice);

        Y.Assert.isObject(buffer.readUInt8);
        Y.Assert.isObject(buffer.readUInt16LE);
        Y.Assert.isObject(buffer.readUInt16BE);
        Y.Assert.isObject(buffer.readUInt32LE);
        Y.Assert.isObject(buffer.readUInt32BE);
        Y.Assert.isObject(buffer.readInt8);
        Y.Assert.isObject(buffer.readInt16LE);
        Y.Assert.isObject(buffer.readInt16BE);
        Y.Assert.isObject(buffer.readInt32LE);
        Y.Assert.isObject(buffer.readInt32BE);
        Y.Assert.isObject(buffer.readFloatLE);
        Y.Assert.isObject(buffer.readFloatBE);
        Y.Assert.isObject(buffer.readDoubleLE);
        Y.Assert.isObject(buffer.readDoubleBE);

        Y.Assert.isObject(buffer.writeUInt8);
        Y.Assert.isObject(buffer.writeUInt16LE);
        Y.Assert.isObject(buffer.writeUInt16BE);
        Y.Assert.isObject(buffer.writeUInt32LE);
        Y.Assert.isObject(buffer.writeUInt32BE);
        Y.Assert.isObject(buffer.writeInt8);
        Y.Assert.isObject(buffer.writeInt16LE);
        Y.Assert.isObject(buffer.writeInt16BE);
        Y.Assert.isObject(buffer.writeInt32LE);
        Y.Assert.isObject(buffer.writeInt32BE);
        Y.Assert.isObject(buffer.writeFloatLE);
        Y.Assert.isObject(buffer.writeFloatBE);
        Y.Assert.isObject(buffer.writeDoubleLE);
        Y.Assert.isObject(buffer.writeDoubleBE);

        Y.Assert.isObject(buffer.fill);

    },

    // Test some read/write functions, along with indexing.

    testReadWrite: function() {

        // Write 0.33333333 as a double and read it back.
        var buffer = new Buffer(20);
        var startOffset = 3;

        buffer[startOffset + 0] = 0x55;
        buffer.writeUInt8(0x55, startOffset + 1);
        buffer.fill(0x55, startOffset + 2, 4);
        buffer.writeUInt16BE(0xd53f, startOffset + 6);

        var v = buffer[startOffset + 3];
        Y.Assert.isTrue(v == 0x55, "startOffset + 3 should be 0x55 but is " + v);

        var value;

        value = buffer.readDoubleLE(startOffset);
        Y.Assert.isTrue(value > 0.33332 && value < 0.33334, "value should be between 0.33332 and 0.33334 but is " + value);

        // Test all read/write.

        buffer.writeUInt8(0x34, 1);
        v = buffer.readUInt8(1);
        Y.Assert.isTrue(v == 0x34, "readUInt8(1) should be 0x34 but is " + v);

        buffer.writeUInt16LE(0x34af, 2);
        v = buffer.readUInt16LE(2);
        Y.Assert.isTrue(v == 0x34af, "readUInt16LE(2) should be 0x34af but is " + v);
        buffer.writeUInt16BE(0x34af, 2);
        v = buffer.readUInt16BE(2);
        Y.Assert.isTrue(v == 0x34af, "readUInt16BE(2) should be 0x34af but is " + v);

        buffer.writeUInt32LE(0xcafebabe, 4);
        v = buffer.readUInt32LE(4);
        Y.Assert.isTrue(v == 0xcafebabe, "readUInt32LE(4) should be 0xcafebabe but is " + v);
        buffer.writeUInt32BE(0xcafebabe, 4);
        v = buffer.readUInt32BE(4);
        Y.Assert.isTrue(v == 0xcafebabe, "readUInt32BE(4) should be 0xcafebabe but is " + v);

        buffer.writeFloatLE(1.0, 5);
        v = buffer.readFloatLE(5);
        Y.Assert.isTrue(v == 1.0, "readFloatLE(5) should be 1.0 but is " + v);
        buffer.writeFloatBE(1.0, 5);
        v = buffer.readFloatBE(5);
        Y.Assert.isTrue(v == 1.0, "readFloatBE(5) should be 1.0 but is " + v);

        buffer.writeDoubleLE(-1.0, 5);
        v = buffer.readDoubleLE(5);
        Y.Assert.isTrue(v == -1.0, "readDoubleLE(5) should be -1.0 but is " + v);
        buffer.writeDoubleBE(-1.0, 5);
        v = buffer.readDoubleBE(5);
        Y.Assert.isTrue(v == -1.0, "readDoubleBE(5) should be -1.0 but is " + v);

        buffer.writeInt8(-1, 1);
        v = buffer.readInt8(1);
        Y.Assert.isTrue(v == -1, "readInt8(1) should be -1 but is " + v);
        
        buffer.writeInt16LE(-511, 2);
        v = buffer.readInt16LE(2);
        Y.Assert.isTrue(v == -511, "readInt16LE(2) should be -511 but is " + v);
        buffer.writeInt16BE(-511, 2);
        v = buffer.readInt16BE(2);
        Y.Assert.isTrue(v == -511, "readInt16BE(2) should be -511 but is " + v)

        buffer.writeInt32LE(-511, 2);
        v = buffer.readInt32LE(2);
        Y.Assert.isTrue(v == -511, "readInt32LE(2) should be -511 but is " + v);
        buffer.writeInt32BE(-511, 2);
        v = buffer.readInt32BE(2);
        Y.Assert.isTrue(v == -511, "readInt32BE(2) should be -511 but is " + v);
        
        // Check indexing.
        
        buffer = new Buffer(123);
        
        buffer[11] = 123;
        Y.Assert.isTrue(buffer[11] == 123, "buffer[11] should be 123 but is " + buffer[11]);
        
        // If a string is used, take value of first character.
        // This allows expressions like buffer[index] = 'a'.
               
        buffer[11] = '0';   // == 0x30.
        Y.Assert.isTrue(buffer[11] == 0x30, "buffer[11] should be 0x30 but is " + buffer[11]);
        buffer[45] = '0123';
        Y.Assert.isTrue(buffer[45] == 0x30, "buffer[45] should be 0x30 but is " + buffer[45]);   
    },
    
    // Check copy(), write(), and fill(), along with toString() with offsets.

    testCopyModification: function() {
    
        var sourceBuffer = new Buffer(5);

        sourceBuffer[0] = '1';
        sourceBuffer[1] = '2';
        sourceBuffer[2] = '3';
        sourceBuffer[3] = '4';
        sourceBuffer[4] = '5';
        
        var destinationBuffer = new Buffer(10);
        
        destinationBuffer.fill('x', 3, 5);
        sourceBuffer.copy(destinationBuffer, 5, 1);
        destinationBuffer.write("3030", 1, 'hex');
        Y.Assert.isTrue(destinationBuffer.toString('ascii', 1, 8) == '00xx234');

    },

    // Check that slice() and "reference" to other Buffer objects.

    testSlice: function() {
    
        var buffer  = new Buffer('abxxefg');
        
        var slice   = buffer.slice(2, 4);
        
        Y.Assert.isTrue(slice.toString() == 'xx');
        
        // slice is actually a reference to part of buffer.           
        
        slice[0] = 'c';
        slice[1] = 'd';
        Y.Assert.isTrue(buffer.toString() == 'abcdefg');
        
        // Check the other way around.
        
        buffer.fill('y', 2, 4);
        Y.Assert.isTrue(slice.toString() == 'yy');

    },

    // Check toBlob()
    testBufferToBlob: function() {

        // test empty buffer
        var zeroBuffer = new Buffer(0);
        Y.Assert.areSame(0, zeroBuffer.length, 'Buffer.length should be 0');

        var zeroBlob = zeroBuffer.toBlob();
        Y.Assert.areSame(0, zeroBlob.size, 'Buffer.toBlob().size should be 0');
        Y.Assert.areSame('', zeroBlob.toString(), 'Buffer.toBlob().toString() should be ""');
        
        // If type cannot be determined, set type as an empty string (section 6.3 of W3C File API).
        
        Y.Assert.areSame('', zeroBlob.type, 'Buffer.toBlob().type should be ""');               
        
        // test string buffer to Blob conversion
        var buffer = new Buffer( 'abcdef');
        Y.Assert.areSame(6, buffer.length, 'Buffer.length should be 6');

        var blob = buffer.toBlob( 'text/plain');
        Y.Assert.areSame(6, blob.size, 'Buffer.toBlob().size should be 6');
        Y.Assert.areSame('abcdef', blob.toString());
        Y.Assert.areSame('text/plain', blob.type, 'Buffer.toBlob().type should be "text/plain"');

        // test buffer slice to Blob conversion
        blob = buffer.slice(1,2).toBlob( 'text/plain');
        Y.Assert.areSame(1, blob.size, 'Buffer.slice().toBlob().size should be 1');
        Y.Assert.areSame('b', blob.toString());
        Y.Assert.areSame('text/plain', blob.type, 'Buffer.slice().toBlob().type should be "text/plain"');
        
        // test binary blob to Buffer conversion
        blob = new Blob( 4, 42);
        buffer = blob.toBuffer();
        Y.Assert.areSame(4, buffer.length);
        Y.Assert.areSame(42, buffer.readInt8(0), 'Blob.toBuffer().readInt8(0) should be 42');
        Y.Assert.areSame(42, buffer.readInt8(1), 'Blob.toBuffer().readInt8(1) should be 42');
        Y.Assert.areSame(42, buffer.readInt8(2), 'Blob.toBuffer().readInt8(2) should be 42');
        Y.Assert.areSame(42, buffer.readInt8(3), 'Blob.toBuffer().readInt8(3) should be 42');

        // test blob slice to buffer conversion
        buffer = blob.slice(1,2).toBuffer();
        Y.Assert.areSame(1, buffer.length);
        Y.Assert.areSame(42, buffer.readInt8(0));
    },
    
    testBase64: function() {
    
        // base64Encoded is s as a UTF-8 string encoded using base64.
    
        var s = "coucou patin couffin et v'lan passe moi l'\u00e9ponge";
        var base64Encoded = "Y291Y291IHBhdGluIGNvdWZmaW4gZXQgdidsYW4gcGFzc2UgbW9pIGwnw6lwb25nZQ==";
        
        var size = Buffer.byteLength(base64Encoded,"base64");
        Y.Assert.isTrue(size == 49, "utf8('coucou patin couffin et v'lan passe moi l'\u00e9ponge') should be 49 but is " + size);

        var b = new Buffer(size);
        b.write(base64Encoded, 0, "base64");        
        var decoded = b.toString("utf8");        
        Y.Assert.isTrue(decoded === s, "DecodeBase64('coucou patin couffin et v'lan passe moi l'\u00e9ponge') is wrong");
                          
        var s2 = base64Encoded;
        var size2 = Buffer.byteLength(s2,"utf8");
        Y.Assert.isTrue(size2 == 68, "byteLengthUTF8('Y291Y291IHBhdGluIGNvdWZmaW4gZXQgdidsYW4gcGFzc2UgbW9pIGwnw6lwb25nZQ==') should be 68 but is " + size2);
                
        var encoded = b.toString("base64");
        Y.Assert.isTrue(encoded === base64Encoded, "EncodeBase64('coucou patin couffin et v'lan passe moi l'\u00e9ponge') is wrong");
                
        // same thing but with some white spaces
        var s3 = "   Y29 \t 1Y291 \n\r IHBhdGluIGNvdWZmaW4gZXQgdidsYW4gcGFzc2UgbW9pIGwnw6lwb25nZQ==   ";
        var size3 = Buffer.byteLength(s3,"base64");
        Y.Assert.isTrue(size3 == 49, "utf8('   Y29 \t 1Y291 \n\r IHBhdGluIGNvdWZmaW4gZXQgdidsYW4gcGFzc2UgbW9pIGwnw6lwb25nZQ==   ') should be 49 but is " + size3);

        var b3 = new Buffer(size3);
        b3.write(s3, 0, "base64");
        var decoded3 = b3.toString("utf8");
        Y.Assert.isTrue(decoded3 === s, "DecodeBase64('coucou patin couffin et v'lan passe moi l'\u00e9ponge') is wrong");        
    },

};

//require("unitTest").run(testCase).getReport();