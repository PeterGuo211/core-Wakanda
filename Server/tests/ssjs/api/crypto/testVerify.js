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


//Technique de Seb pour avoir le chemin des fichiers durant les TU
var env = require("unitTest").getenv();
if (typeof env.SCRIPTPATH === "undefined") {
   env.SCRIPTPATH = "/PROJECT";
}

var testCase = {
    
	name: "test API Crypto Verifier",
     
	_should: {
         ignore: {
        }
	},
   
	 /*
	 * Sets up data that is needed by each test.
	 */
	 setUp : function () {

		this.crypto = require( "crypto"); 
		if (os.isWindows) {
		//Win Stuff 
		}
		else if (os.isLinux) {
		//Linux Stuff   
		}
		else {
		//MAC Stuff
		}    
		
	},

	/*
	 * Cleans up everything that was created by setUp().
	 */
	tearDown : function () {
	},
	
	
	/*
	 *
	 * Test methods for API SSJS Crypto
	 *
	 */

	testVerify_01_createVerifyExists: function() {   
		
		Y.Assert.isObject(this.crypto);
		Y.Assert.isTypeOf("function", this.crypto.createVerify);
	  },
	
	
	testVerify_02_updateExists: function() {
		
		var verifier = this.crypto.createVerify("sha1");
		Y.Assert.isObject( verifier);
		Y.Assert.isTypeOf( "function", verifier.update);
	},
	
	
	testVerify_03_verifyExists: function() {
		
		var verifier = this.crypto.createVerify("sha1");
		Y.Assert.isObject( verifier);
		Y.Assert.isTypeOf( "function", verifier.verify);
	},
	
	testVerify_04_checkSha1Signature: function() {
		var myTextFile = File (env.SCRIPTPATH + "/words");
		var myText = myTextFile.toBuffer();

		var crypto = require("crypto");
		var myVerifier = crypto.createVerify("sha1");

		myVerifier.update(myText);

		var myCertFile = File (env.SCRIPTPATH + "/some_cert.pem");
		var myCert = myCertFile.toString();

		var mySignedDigestFile = File (env.SCRIPTPATH + "/words_sha1_sig");
		var mySignedDigest = mySignedDigestFile.toBuffer();

		res = myVerifier.verify(myCert, mySignedDigest);
		Y.Assert.isTrue(res);
	},

	testVerify_05_checkMd5Signature: function() {
		
		var myTextFile = File (env.SCRIPTPATH + "/words");
		var myText = myTextFile.toBuffer();

		var crypto = require("crypto");
		var myVerifier = crypto.createVerify("md5");

		myVerifier.update(myText);

		var myCertFile = File (env.SCRIPTPATH + "/some_cert.pem");
		var myCert = myCertFile.toString();

		var mySignedDigestFile = File (env.SCRIPTPATH + "/words_md5_sig");
		var mySignedDigest = mySignedDigestFile.toBuffer();

		res = myVerifier.verify(myCert, mySignedDigest);
		Y.Assert.isTrue(res);
	}
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
    
if(typeof dontRequireUnitTest === 'undefined'){
    require("unitTest").run(testCase).getReport();
}  
