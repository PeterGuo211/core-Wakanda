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
var testCase = {
    name: "TextStream Test",

	_should: {
        ignore: {

        }
    },
    
    //1- Class TextStream exist
    testClassTextStreamExists: function () {
        var result = typeof TextStream;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
    },

    //2- object TextStream exist : textFile = string
    testObjectTextStreamExists1: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var result = typeof obj;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("object", result);
        obj.close();
    },

    //3- object TextStream exist : textFile = File
    testObjectTextStreamExists2: function () {
        var folderPath = application.getFolder("path") + 'Src/';
        var obj = TextStream(File(folderPath + 'file_text_read0.txt'), 'Read');
        var result = typeof obj;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("object", result);
        obj.close();
    },

    //4- object TextStream exist : textFile = String + charset 
    testObjectTextStreamExists3: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read', 9);
        var result = typeof obj;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("object", result);
        obj.close();
    },

    //5- object TextStream exist : textFile = File + charset 
    testObjectTextStreamExists4: function () {
        var folderPath = application.getFolder("path") + 'Src/';
        var obj = TextStream(File(folderPath + 'file_text_read0.txt'), 'Read', 9);
        var result = typeof obj;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("object", result);
        obj.close();
    },

    //7- method read exist
    testMethodReadExists: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var result = typeof obj.read;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
        obj.close();
    },

    //8- method read returned type
    testMethodReadReturnedType: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var result = typeof obj.read(5);
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("string", result);
        obj.close();
    },

    //9- method read logic
    testMethodReadLogic: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var content = obj.read(4);
        var result = content == "abcd";
        Y.Assert.isTrue(result);
        obj.close();
    },

    //10- method write exist
    testMethodWriteExits: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_write0.txt', 'Write');
        var type = typeof obj.write;
        obj.close();
        var result = type;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
    },

    //11- method write logic
    testMethodWriteLogic: function () {
        var appPath = application.getFolder("path");
        var file = File(appPath + 'Src/file_text_write0.txt');
        if (file.exists) {
            file.remove();
        }
        var obj1 = TextStream(file, 'Write');
        obj1.write("abcd");
        obj1.close();
        var obj2 = TextStream(file, 'Read');
        var content = obj2.read();
        obj2.close();
        var result = content;
        Y.Assert.areSame("abcd", result);
    },

    //12- method end exist
    testMethodEndExists: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var result = typeof obj.end;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
        obj.close();
    },

    //13- method end returned type
    testMethodEndReturnedType: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var result = typeof obj.end();
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("boolean", result);
        obj.close();
    },

    //12- method end returned type
    testMethodEndLogic: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var res0 = obj.end();
        obj.read(5);
        var res1 = obj.end();
        obj.read();
        var res2 = obj.end();
        var result = [res0, res1, res2];
        Y.ArrayAssert.itemsAreEqual([false, false, true], result);
        obj.close();
    },

    //13- method getPos exist
    testMethodGetPosExists: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var result = typeof obj.getPos;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
        obj.close();
    },

    //14- method getPos returned type
    testMethodGetPosReturnedType: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var result = typeof obj.getPos();
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("number", result);
        obj.close();
    },

    //15- method getPos logic 1
    testMethodGetPosLogic1: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var pos1 = obj.getPos();
        obj.read(5);
        var pos2 = obj.getPos();
        obj.read(10);
        var pos3 = obj.getPos();
        obj.read();
        var pos4 = obj.getPos();
        var result = [pos1, pos2, pos3, pos4];
        if (os.isWindows) {
        	Y.ArrayAssert.itemsAreEqual([0, 5, 15, 40], result);
        }
        else {
        	Y.ArrayAssert.itemsAreEqual([0, 5, 15, 38], result);
        }
        obj.close();
    },

    //16- method getPos logic 2
    testMethodGetPosLogic2: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var content = obj.read();
        var result = obj.getPos();
        if (os.isWindows) {
        	Y.Assert.areSame(40, result);
        }
        else {
        	Y.Assert.areSame(38, result);
        }
        obj.close();
    },

    //17- method getPos logic 3
    testMethodGetPosLogic3: function () {
        var appPath = application.getFolder("path");
        var file = File(appPath + 'Src/file_text_write0.txt');
        if (file.exists) {
            file.remove();
        }
        var obj = TextStream(file, 'Write');
        obj.write("abcd");
        var pos1 = obj.getPos();
        obj.write("xyz");
        var pos2 = obj.getPos();
        obj.close();
        var result = [pos1, pos2];
        Y.ArrayAssert.itemsAreEqual([4, 7], result);
    },

    //18- method getSize exist
    testMethodGetSizeExists: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var result = typeof obj.getSize;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
        obj.close();
    },

    //19- method getSize returned type
    testMethodGetSizeReturnedType: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var result = typeof obj.getSize()
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("number", result);
        obj.close();
    },

    //20- method getSize logic
    testMethodGetSizeLogic: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var result = obj.getSize();
        if (os.isWindows) {
        	Y.Assert.areSame(40, result);
        }
        else {
        	Y.Assert.areSame(38, result);
        }
        obj.close();
    },

    //21- method close exist
    testMethodCloseExists: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        var result = typeof obj.close
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
        obj.close();
    },

    //22- method close logic
    testMethodCloseLogic: function () {
        var appPath = application.getFolder("path");
        var obj = TextStream(appPath + 'Src/file_text_read0.txt', 'Read');
        obj.read();
        obj.close();
        var result = true
        Y.Assert.isTrue(result);
    },
    
    //23- TextStream fails with some text files:
    testClassTextStreamFailure: function () {
       	var appPath = application.getFolder("path");
       	var obj = TextStream(appPath + 'Src/file_text_read_failure0.txt', 'Read');
       	var failed = false;
       	try{
			var content = obj.read();
			obj.close();
 		} catch (e) {
			failed = true;
 		}
 		Y.Assert.isTrue(failed, "obj.read() should failed at position " + obj.getPos() + " with the '" + appPath + "Src/file_text_read_failure0.txt' file.");
     },

	//24- Check that when we write line breaks, we always use CRLF characters.
	testCRLFLineBreaks: function () {
        var appPath	= application.getFolder("path");
        var file 	= File(appPath + 'Src/file_text_write_crlf.txt');
		
        if (file.exists) 
		
            file.remove();
        
		var	writtenString	= "abcd\nabcd";
		var	readString;
		
		Y.Assert.isTrue(writtenString.length == 9);
		
        var obj1 = TextStream(file, 'Write');
        obj1.write(writtenString);
        obj1.close();
		
        var obj2 = TextStream(file, 'Read');
        readString = obj2.read();
        obj2.close();

		Y.Assert.isTrue(readString.length == 10);
		Y.Assert.isTrue(readString.charCodeAt(4) == 0x0d); 	// '\r' character.
		Y.Assert.isTrue(readString.charCodeAt(5) == 0x0a); 	// '\n' character.
	},		
};