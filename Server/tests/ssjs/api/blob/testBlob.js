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
//Function read File content : 
function readFile(file) {
	var readFileContent = new TextStream(file, "Read", 0);
	var data = "";
	do {
		data = data + readFileContent.read(1);
	}
	while (readFileContent.end() == false)
	readFileContent.close();
	return data;
}
var testCase = {
	name: "test API BLOB",
	_should: {
		error: {
			testBlob_CopyToABlobWithoutOverwrite_6: true
		},
		ignore: {}
	},
	/*
	 * Sets up data that is needed by each test.
	 */
	setUp: function() {
		if (os.isWindows) {
			//Win Stuff 
		} else if (os.isLinux) {
			//Linux Stuff   
		} else {
			//MAC Stuff
		}
	},
	/*
	 * Cleans up everything that was created by setUp().
	 */
	tearDown: function() {},
	/*
	 *
	 * Test methods for API SSJS BLOB
	 *
	 */
	// 0 --**-- Object Blob exist
	testBlob_ObjectBlobExist_0: function() {
		var BlobExist = new Blob(20, 88, "application/octet-stream");
		Y.Assert.isObject(BlobExist);
	},
	// 1 --**-- Size property exist
	testBlob_SizePropertyExist_1: function() {
		var myBlob = new Blob(20, 88, "application/octet-stream");
		var myBlobPropSize = myBlob.size;
		Y.Assert.isNumber(myBlobPropSize);
	},
	// 2 --**-- Default value for a Blob without args
	testBlob_DefaultValueBlob_2: function() {
		var myBlob = new Blob(); 
		var result = myBlob.size;
		Y.Assert.isNumber(result);
    	Y.Assert.areEqual(0, result);
	},
	// 3 --**-- Type property exist
	testBlob_TypePropertyExist_3: function() {
		var myBlob = new Blob(20, 88, "application/octet-stream");
		var myBlobPropType = myBlob.type;
		Y.Assert.areEqual("application/octet-stream", myBlobPropType);
		Y.Assert.isString(myBlobPropType);
	},
	// 4 --**-- Default value (empty string) for Type property
	testBlob_DefaultValueTypeProperty_4: function() {
		var myBlob = new Blob(20, 88);
		var myBlobPropType = myBlob.type;
		Y.Assert.areEqual("", myBlobPropType);
		Y.Assert.isString(myBlobPropType);
	},
	//Add tests with MimeType
	// 5 --**-- Create a new instance of Object Blob with a default filler : 0, which should be a "null terminated" string
	testBlob_BlobWithDefaultFiller_5: function() {
		var myBlob = new Blob(1, "application/octet-stream");
		var result = myBlob.toString();
		Y.Assert.isString(result);
		Y.Assert.areEqual("\0", result);
	},
	// 6 --**-- Create a Blob with an empty mimeType : Default one should be : "" (empty string)
	testBlob_BlobWithDefaultMimeType_6: function() {
		var myBlob = new Blob(1, 65);
		var myBlobMimeType = myBlob.type;
		Y.Assert.areEqual("", myBlobMimeType);
		Y.Assert.isString(myBlobMimeType);
	},
	// 7 --**-- CopyTo a Blob into a file 
	testBlob_CopyToABlob_7: function() {
		var myBlob = new Blob(20, 88, "application/octet-stream"),
			thepath = getFolder("path");
		myBlob.copyTo(thepath + "test.txt", "OverWrite");
		var myBlob0 = File(thepath + "test.txt");
		Y.Assert.isString(readFile(myBlob0));
		Y.Assert.areEqual(myBlob, readFile(myBlob0));
	},
	// 8 --**-- CopyTo a Blob without Overwrite, should generate an error 
	testBlob_CopyToABlobWithoutOverwrite_8: function() {
		var myBlob = new Blob(20, 88, "application/octet-stream"),
			thepath = getFolder("path"),
			e, 
			exceptions = 0;
		try {
			myBlob.copyTo(thepath + "test.txt");
		} catch (e) {
			exceptions++;
			console.log("we caught : " + e);
		};
		Y.Assert.areEqual(1, exceptions);	
	},
	// 9 --**-- Slice a Blob
	testBlob_CopyToABlobInAWrongFile_9: function() {
		var myBlob = new Blob(5, 65, "application/octet-stream");
		var myString = myBlob.toString();
		var myb = myBlob.slice(3, 5, "application/octet-stream");
		var result = myb.toString();
		Y.Assert.isString(result);
		Y.Assert.areEqual("AA", result);
	},
	// 10 --**-- Slice a Blob with a start/end value omitted
	testBlob_SliceABlobWithoutStartedEndedValue_10: function() {
		var myBlob = new Blob(5, 65, "application/octet-stream");
		var myString = myBlob.toString();
		var myb = myBlob.slice(5, "application/octet-stream");
		var result = myb.toString();
		Y.Assert.isString(result);
		Y.Assert.areEqual("", result);
	},
	// 11 --**-- Slice a Blob with a start/end negative value
	testBlob_SliceABlobWithNegativeStartedEndedValue_11: function() {
		var myBlob = new Blob(5, 65, "application/octet-stream");
		var myString = myBlob.toString();
		var myb = myBlob.slice(-1, "application/octet-stream");
		var result = myb.toString();
		Y.Assert.isString(result);
		Y.Assert.areEqual("", result);
	},
	// 12 --**-- Slice a Blob without mimeType will be empty by default 
	testBlob_SliceABlobWithNegativeStartedEndedValue_12: function() {
		var myBlob = new Blob(5, 65, "application/octet-stream");
		var myString = myBlob.toString();
		var myb = myBlob.slice(-1, "application/octet-stream");
		var result = myb.toString();
		Y.Assert.isString(result);
		Y.Assert.areEqual("", result);
	},
	// 13 --**-- Create a buffer containing a blob
	testBlob_BufferContainingABlob_13: function() {
		var myBlob = new Blob( 20 , 88, "application/octet-stream");
		var myString = myBlob.toString(); 
		var tempBuf = myBlob.toBuffer(); 
    	var nbbytes = tempBuf.write("Hello World!",4);
		myBlob = tempBuf.toBlob(); 
		result = myBlob.toString();
    	Y.Assert.isString(result);
    	Y.Assert.areEqual("XXXXHello World!XXXX", result);
	},
	// 14 --**-- Get a string representation of the blob content
	testBlob_BlobTostring_14: function() {
		var myBlob = new Blob( 20 , 88, "application/octet-stream"); 
		var result = myBlob.toString();
		Y.Assert.isString(result);
    	Y.Assert.areEqual("XXXXXXXXXXXXXXXXXXXX", result);     
	}

	//Add new tests for those property : body (request, response), asBlob, sendChunkedData, toBlob(), Storage Attribute Type 
};
/*
    //create the console
    (new Y.Test.Console({
        newestOnTop : false,
        filters: {
            pass: true,
            fail: true
        }
    })).render('#testLogger');

    Y.Test.Runner.add(Y.example.test.ExampleSuite);

    //run the tests
    Y.Test.Runner.run();
    */
if (typeof dontRequireUnitTest === 'undefined') {
	require("unitTest").run(testCase).getReport();
}