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
    
	name: "test API Crypto Hash",
     
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

	// 0 --**-- Object Crypto exist
	testHash_ObjectCryptoExist_0: function() {   
		Y.Assert.isObject(this.crypto);   
		Y.Assert.isTypeOf( "function", this.crypto.createHash);
		Y.Assert.isTypeOf( "function", this.crypto.getHashes);
	  },
	
	testHash_getHashes_1: function() {
		var hashes = this.crypto.getHashes();
		Y.Assert.isArray( hashes);
		Y.Assert.areEqual( "md5,sha1", hashes.toString());
	},
	
	testHash_md5_createHash_2_0: function() {
		var hash = this.crypto.createHash("md5");
		Y.Assert.isObject( hash);
		Y.Assert.isTypeOf( "function", hash.update);
		Y.Assert.isTypeOf( "function", hash.digest);
	},
	
	testHash_sha1_createHash_2_1: function() {
		var hash = this.crypto.createHash("sha1");
		Y.Assert.isObject( hash);
		Y.Assert.isTypeOf( "function", hash.update);
		Y.Assert.isTypeOf( "function", hash.digest);
	},
	
	_createHash_emptyString_3: function( algo, digestHex, digestBase64) {
		var hash = this.crypto.createHash(algo);
		var digest = hash.digest();
		Y.Assert.isInstanceOf( Buffer, digest);
		Y.Assert.areEqual( digestHex, digest.toString( "hex"));
		Y.Assert.areEqual( digestHex, hash.digest( "hex"));
		Y.Assert.areEqual( digestBase64, hash.digest( "base64"));
		hash.update("");
		Y.Assert.areEqual( digestHex, digest.toString( "hex"));
		Y.Assert.areEqual( digestHex, hash.digest( "hex"));
		Y.Assert.areEqual( digestBase64, hash.digest( "base64"));
	},
	
	testHash_md5_createHash_emptyString_3_0: function() {
		this._createHash_emptyString_3( "md5", "d41d8cd98f00b204e9800998ecf8427e", "1B2M2Y8AsgTpgAmY7PhCfg==");
	},
	
	testHash_sha1_createHash_emptyString_3_1: function() {
		this._createHash_emptyString_3( "sha1", "da39a3ee5e6b4b0d3255bfef95601890afd80709", "2jmj7l5rSw0yVb/vlWAYkK/YBwk=");
	},
	
	_createHash_string_4: function( algo, digestHex, digestBase64) {
		var hash = this.crypto.createHash(algo);
		hash.update( "The quick brown fox jumps over the lazy dog", "utf8");
		var digest = hash.digest();
		Y.Assert.isInstanceOf( Buffer, digest);
		Y.Assert.areEqual( digestHex, digest.toString( "hex"));
		Y.Assert.areEqual( digestHex, hash.digest( "hex"));
		Y.Assert.areEqual( digestBase64, hash.digest( "base64"));
	},
	
	testHash_md5_createHash_string_4_0: function() {
		this._createHash_string_4("md5", "9e107d9d372bb6826bd81d3542a419d6", "nhB9nTcrtoJr2B01QqQZ1g==");
	},
	
	testHash_sha1_createHash_string_4_1: function() {
		this._createHash_string_4("sha1", "2fd4e1c67a2d28fced849ee1bb76e7391b93eb12", "L9ThxnotKPzthJ7hu3bnORuT6xI=");
	},
	
	_createHash_buffer_5: function( algo, digestHex, digestBase64) {
		var hash = this.crypto.createHash(algo);
		var buff = new Buffer( "The quick brown fox jumps over the lazy dog", 'utf8');
		hash.update( buff);
		var digest = hash.digest();
		Y.Assert.isInstanceOf( Buffer, digest);
		Y.Assert.areEqual( digestHex, digest.toString( "hex"));
		Y.Assert.areEqual( digestHex, hash.digest( "hex"));
		Y.Assert.areEqual( digestBase64, hash.digest( "base64"));
	},
	
	testHash_md5_createHash_buffer_5_0: function() {
		this._createHash_buffer_5("md5", "9e107d9d372bb6826bd81d3542a419d6", "nhB9nTcrtoJr2B01QqQZ1g==");
	},
	
	testHash_sha1_createHash_buffer_5_1: function() {
		this._createHash_buffer_5("sha1", "2fd4e1c67a2d28fced849ee1bb76e7391b93eb12", "L9ThxnotKPzthJ7hu3bnORuT6xI=");
	},
	
	_createHash_twoStrings_6: function( algo, digestHex, digestBase64) {
		var hash = this.crypto.createHash( algo);
		hash.update( "The quick brown fox", "utf8");
		hash.update( " jumps over the lazy dog", "utf8");
		var digest = hash.digest();
		Y.Assert.isInstanceOf( Buffer, digest);
		Y.Assert.areEqual( digestHex, digest.toString( "hex"));
		Y.Assert.areEqual( digestHex, hash.digest( "hex"));
		Y.Assert.areEqual( digestBase64, hash.digest( "base64"));
	},

	testHash_md5_createHash_twoStrings_6_0: function() {
		this._createHash_twoStrings_6("md5", "9e107d9d372bb6826bd81d3542a419d6", "nhB9nTcrtoJr2B01QqQZ1g==");
	},

	testHash_sha1_createHash_twoStrings_6_1: function() {
		this._createHash_twoStrings_6("sha1", "2fd4e1c67a2d28fced849ee1bb76e7391b93eb12", "L9ThxnotKPzthJ7hu3bnORuT6xI=");
	},
	
	_createHash_twoBuffers_7: function( algo, digestHex, digestBase64) {
		var hash = this.crypto.createHash( algo);
		var buff1 = new Buffer( "The quick brown fox", 'utf8');
		hash.update( buff1);
		var buff2 = new Buffer( " jumps over the lazy dog", 'utf8');
		hash.update( buff2);
		var digest = hash.digest();
		Y.Assert.isInstanceOf( Buffer, digest);
		Y.Assert.areEqual( digestHex, digest.toString( "hex"));
		Y.Assert.areEqual( digestHex, hash.digest( "hex"));
		Y.Assert.areEqual( digestBase64, hash.digest( "base64"));
	},

	testHash_md5_createHash_twoBuffers_7_0: function() {
		this._createHash_twoBuffers_7( "md5", "9e107d9d372bb6826bd81d3542a419d6", "nhB9nTcrtoJr2B01QqQZ1g==");
	},

	testHash_sha1_createHash_twoBuffers_7_1: function() {
		this._createHash_twoBuffers_7( "sha1", "2fd4e1c67a2d28fced849ee1bb76e7391b93eb12", "L9ThxnotKPzthJ7hu3bnORuT6xI=");
	},

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