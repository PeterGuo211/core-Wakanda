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
	name: "test API HTTPServer HTTPServerCache",
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
	 * Test methods for API SSJS HTTPServer HTTPServercache
	 *
	 */
	// 0 --**-- Enabled is available on the property
	testHTTPServerCache_enabledPropertyIsAvailable_0: function() {
		var result = httpServer.cache;
		Y.Assert.isBoolean(result.enabled);
	},
	// 1 --**-- Default value for the enabled cache property
	testHTTPServerCache_DefaultEnabledPropertyValue_1: function() {
		var result = httpServer.cache.enabled;
		Y.Assert.areEqual(false,result);
	},
	// 2 --**-- MemorySize Property exist
	testHTTPServerCache_MemorySizePropertyExist_2: function() {
		Y.Assert.isNumber(httpServer.cache.memorySize);
	},
	// 3 --**-- Default MemorySize
	testHTTPServerCache_DefaultMemorySize_3: function() {
		var result = httpServer.cache.memorySize;
		Y.Assert.areEqual(5242880,result);
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
