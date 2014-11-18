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
function count() {
	var counter = 0;
	for (var p in this) if (this.hasOwnProperty(p))++counter;
	return counter;
}
var testCase = {
	name: "test API HTTPServer HTTPServer",
	_should: {
		error: {},
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
	 * Test methods for API SSJS HTTPServer HTTPServer
	 *
	 */
	// 0 --**-- Object Solution exist
	testHTTPServer_ObjectHTTPServerExist_0: function() {
		Y.Assert.isObject(httpServer);
	},
	// 1 --**-- HttpServer is available in Global Application
	testHTTPServer_PropertyExist_1: function() {
		Y.Assert.isObject(application.httpServer);
	},
	// 2 --**-- Cache property exist
	testHTTPServer_CachePropertyExist_2: function() {
		Y.Assert.isObject(httpServer.cache);
	},
	// 3 --**-- Cache property exist since application
	testHTTPServer_CachePropertyExistApplication_3: function() {
		Y.Assert.isObject(application.httpServer.cache);
	},
	// 4 --**-- DefaultCharSet property exist
	testHTTPServer_DefaultCharSetPropertyExist_4: function() {
		Y.Assert.isString(httpServer.defaultCharSet);
	},
	// 5 --**-- DefaultCharSet property exist since application
	testHTTPServer_DefaultCharSetPropertyExistApplication_5: function() {
		Y.Assert.isString(application.httpServer.defaultCharSet);
	},
	// 6 --**-- hostname property exist
	testHTTPServer_HostnamePropertyExist_6: function() {
		Y.Assert.isString(httpServer.hostName);
	},
	// 7 --**-- hostname property exist since application
	testHTTPServer_HostnamePropertyExistApplication_7: function() {
		Y.Assert.isString(application.httpServer.hostName);
	},
	// 8 --**-- ipAddress property exist
	testHTTPServer_IpAddressPropertyExist_8: function() {
		Y.Assert.isString(httpServer.ipAddress);
	},
	// 9 --**-- ipAddress property exist since application
	testHTTPServer_IpAddressPropertyExistApplication_9: function() {
		Y.Assert.isString(application.httpServer.ipAddress);
	},
	// 10 --**-- port property exist
	testHTTPServer_PortPropertyExist_10: function() {
		Y.Assert.isNumber(httpServer.port);
	},
	// 11 --**-- port property exist since application
	testHTTPServer_PortPropertyExistApplication_11: function() {
		Y.Assert.isNumber(application.httpServer.port);
	},
	// 12 --**-- ssl property exist
	testHTTPServer_SSLPropertyExist_12: function() {
		Y.Assert.isObject(httpServer.ssl);
	},
	// 13 --**-- ssl property exist since application
	testHTTPServer_SSLPropertyExistApplication_13: function() {
		Y.Assert.isObject(application.httpServer.ssl);
	},
	// 14 --**-- Started property exist
	testHTTPServer_StartedPropertyExist_14: function() {
		Y.Assert.isBoolean(httpServer.started);
	},
	// 15 --**-- Started property exist since application
	testHTTPServer_StartedPropertyExistApplication_15: function() {
		Y.Assert.isBoolean(application.httpServer.started);
	},
	// 16 --**-- Start Method exist
	testHTTPServer_StartMethodExist_16: function() {
		var result = typeof httpServer.start;
		Y.Assert.areEqual("function", result);
	},
	// 17 --**-- Stop Method exist
	testHTTPServer_StopMethodExist_17: function() {
		var result = typeof httpServer.stop;
		Y.Assert.areEqual("function", result);
	},
	// 18 --**-- Get Cache Object Size
	testHTTPServer_GetCacheObjectSize_18: function() {
		var cache = httpServer.cache;
		Y.Assert.areEqual(2, count.call(cache));
	},
	// 19 --**-- DefaultCharSet value in a default Solution
	testHTTPServer_GetdefaultCharSetSize_19: function() {
		var defaultCharSet = httpServer.defaultCharSet;
		Y.Assert.areEqual("UTF-8", defaultCharSet);
	},
	// 20 --**-- HostName value in a default Solution
	testHTTPServer_GetHostname_20: function() {
		var hostname = httpServer.hostName;
		Y.Assert.areEqual("localhost", hostname);
	},
	// 21 --**-- IpAddress value in a default Solution
	testHTTPServer_GetIpAddress_21: function() {
		var ipAddress = httpServer.ipAddress;
		Y.Assert.areEqual("::", ipAddress);
		//Project settings has been setted for "any" address, rfc4291 : unspecified address, ::/128
		//Add projects to check private and loopback addresses : 127.0.0.1, localhost
	},
	// 22 --**-- Port value in a default Solution
	testHTTPServer_GetPort_22: function() {
		var port = httpServer.port;
		Y.Assert.areEqual(8081, port);
	},
	// 23 --**-- SSL value in a default Solution
	testHTTPServer_GetSSL_23: function() {
		var ssl = httpServer.ssl;
		Y.Assert.areEqual(2, count.call(ssl));
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
if (typeof dontRequireUnitTest === 'undefined') {
	require("unitTest").run(testCase).getReport();
}
