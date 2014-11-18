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
	name: "test API Global Application Include",
	_should: {
		error: {},
		ignore: {
			testIncludeAutoString_9:true,
			testIncludeRelative_12:true
		}
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
	 * Test methods for API Global Application Include
	 *
	 */
	// 0 --**-- Include function exist
	testIncludeIsAFunction_0: function() {
		Y.Assert.isTypeOf("function", include);
		Y.Assert.isTypeOf("function", application.include, "include function doesn't exist");
	},
	// 1 --**-- Simple Include with relative path without application with a string as parameter
	testIncludeStringRelativePathNoApplication_1: function() {
		include('include/test.js');
		Y.Assert.isString(test1_1, "String not found in the included file");
		Y.Assert.isNumber(test3_1, "Number not found in the included file");
		Y.Assert.isArray(test0_1, "Array not found in the included file");
		Y.Assert.isObject(test_1, "Object not found in the included file");
		Y.Assert.isFunction(test4_1, "Function not found in the included file");
		Y.Assert.isBoolean(test2_1, "Boolean not found in the included file");
	},
	// 2 --**-- Simple Include with relative path with application with a string as parameter
	testIncludeStringRelativePathApplication_2: function() {
		application.include('include/test0.js');
		Y.Assert.isString(test1_2, "String not found in the included file");
		Y.Assert.isNumber(test3_2, "Number not found in the included file");
		Y.Assert.isArray(test0_2, "Array not found in the included file");
		Y.Assert.isObject(test_2, "Object not found in the included file");
		Y.Assert.isFunction(test4_2, "Function not found in the included file");
		Y.Assert.isBoolean(test2_2, "Boolean not found in the included file");
	},
	// 3 --**-- Simple Include with absolute path with application a string as parameter 
	testIncludeStringAbsolutePathApplication_3: function() {
		application.include(ds.getModelFolder().path + 'include/test1.js');
		Y.Assert.isString(test1_3, "String not found in the included file");
		Y.Assert.isNumber(test3_3, "Number not found in the included file");
		Y.Assert.isArray(test0_3, "Array not found in the included file");
		Y.Assert.isObject(test_3, "Object not found in the included file");
		Y.Assert.isFunction(test4_3, "Function not found in the included file");
		Y.Assert.isBoolean(test2_3, "Boolean not found in the included file");
	},
	// 4 --**-- Simple Include with absolute path without application a string as parameter 
	testIncludeStringAbsolutePathNoApplication_4: function() {
		include(ds.getModelFolder().path + 'include/test2.js');
		Y.Assert.isString(test1_4, "String not found in the included file");
		Y.Assert.isNumber(test3_4, "Number not found in the included file");
		Y.Assert.isArray(test0_4, "Array not found in the included file");
		Y.Assert.isObject(test_4, "Object not found in the included file");
		Y.Assert.isFunction(test4_4, "Function not found in the included file");
		Y.Assert.isBoolean(test2_4, "Boolean not found in the included file");
	},
	// 5 --**-- Simple Include with absolute path without application a File object as parameter 
	testIncludeFileAbsolutePathNoApplication_5: function() {
		var includedFile = File(ds.getModelFolder().path + 'include/test3.js');
		include(includedFile);
		Y.Assert.isString(test1_5, "String not found in the included file");
		Y.Assert.isNumber(test3_5, "Number not found in the included file");
		Y.Assert.isArray(test0_5, "Array not found in the included file");
		Y.Assert.isObject(test_5, "Object not found in the included file");
		Y.Assert.isFunction(test4_5, "Function not found in the included file");
		Y.Assert.isBoolean(test2_5, "Boolean not found in the included file");
	},
	// 6 --**-- Simple Include with absolute path with application a File object as parameter 
	testIncludeFileAbsolutePathApplication_6: function() {
		var includedFile = File(ds.getModelFolder().path + 'include/test4.js');
		application.include(includedFile);
		Y.Assert.isString(test1_6, "String not found in the included file");
		Y.Assert.isNumber(test3_6, "Number not found in the included file");
		Y.Assert.isArray(test0_6, "Array not found in the included file");
		Y.Assert.isObject(test_6, "Object not found in the included file");
		Y.Assert.isFunction(test4_6, "Function not found in the included file");
		Y.Assert.isBoolean(test2_6, "Boolean not found in the included file");
	},
	// 7 --**-- Simple include with a refresh with string as parameter
	testIncludeRefreshString_7: function() {
		var includedFile = File(ds.getModelFolder().path + 'include/test5.js');
		include(includedFile);
		Y.Assert.areEqual(0, test3_7, "Number value aren't the same");
		test3 = 2;
		include(includedFile, "refresh");
		Y.Assert.areEqual(0, test3_7, "x doesn't keep it's initial value");
	},
	// 8 --**-- Simple include with a refresh with boolean as parameter
	testIncludeRefreshBoolean_8: function() {
		var includedFile = File(ds.getModelFolder().path + 'include/test6.js');
		include(includedFile);
		Y.Assert.areEqual(0, test3_8, "Number value aren't the same");
		test3_8 = 2;
		include(includedFile, true);
		Y.Assert.areEqual(0, test3_8, "x doesn't keep it's initial value");
	},
	// 9 --**-- Simple include with a auto with string as parameter
	testIncludeAutoString_9: function() {
		var includedFile = File(ds.getModelFolder().path + 'include/test7.js');
		include(includedFile);
		Y.Assert.areEqual(0, test3_9, "Number value aren't the same");
		test3_9 = 2;
		include(includedFile, "auto");
		Y.Assert.areEqual(2, test3_9, "x doesn't keep it's initial value");
	},
	// 10 --**-- Simple include with a auto with boolean as parameter
	testIncludeAutoBoolean_10: function() {
		var includedFile = File(ds.getModelFolder().path + 'include/test8.js');
		include(includedFile, true);
		Y.Assert.areEqual(0, test3_10, "Number value aren't the same");
		test3_10 = 2;
		include(includedFile, false);
		Y.Assert.areEqual(2, test3_10, "x doesn't keep it's initial value");
	},
	// 11 --**-- Simple include with no parameters (default = auto for refresh)
	testIncludeAutoDefault_11: function() {
		var includedFile = File(ds.getModelFolder().path + 'include/test9.js');
		include(includedFile, true);
		Y.Assert.areEqual(0, test3_11, "Number value aren't the same");
		test3_11 = 2;
		include(includedFile);
		Y.Assert.areEqual(2, test3_11, "x doesn't keep it's initial value");
	},
	// 12 --**-- Include with a relative parameter
	testIncludeRelative_12: function() {
		include('./include/test10.js', 'relative');
		Y.Assert.isString(test1_12, "String not found in the included file");
		Y.Assert.isNumber(test3_12, "Number not found in the included file");
		Y.Assert.isArray(test0_12, "Array not found in the included file");
		Y.Assert.isObject(test_12, "Object not found in the included file");
		Y.Assert.isFunction(test4_12, "Function not found in the included file");
		Y.Assert.isBoolean(test2_12, "Boolean not found in the included file");
	},
	// 13 --**-- Include with a user parameter
	testIncludeUser_13: function() {
		include('./include/test11.js', 'user');
		Y.Assert.isString(test1_13, "String not found in the included file");
		Y.Assert.isNumber(test3_13, "Number not found in the included file");
		Y.Assert.isArray(test0_13, "Array not found in the included file");
		Y.Assert.isObject(test_13, "Object not found in the included file");
		Y.Assert.isFunction(test4_13, "Function not found in the included file");
		Y.Assert.isBoolean(test2_13, "Boolean not found in the included file");
	},
	// 14 --**-- Include with a system parameter
	testIncludeUser_14: function() {
		include('string-extension.js', 'system');
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