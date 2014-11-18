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
 
 //Add tests with value posix or system value or encoded or notEncoded
 //	format 		Boolean, String		True or "posix" or "encoded" (default); False or "system" or "notEncoded"
 
 /*
  *
	Global Variable
  *
  */

var encodedChars = {
				" " : "%20", 
				"<" : "%3C",
				">" : "%3E",
				"#" : "%23",
				"%" : "%25",
				"{" : "%7B",
				"}" : "%7D",
				"|" : "%7C",
				"\\" : "%5C",
				"^" : "%5E",
				"~" : "%7E",
				"[" : "%5B",
				"]" : "%5D",
				"`" : "%60",
				";" : "%3B",
				"/" : "%2F",
				"?" : "%3F",
			 	":" : "%3A",
			 	"@"	: "%40",
			 	"=" : "%3D",
			 	"&" : "%26"		
};

function posixOrNotCheck(value) {
	if(value.match(/\\/g)) {
	return "system";
	//system, not posix
	} else {
	return "posix";
	//posix, posix
	}; 
}; 

function encodedOrNotCheck(value) {
	var attrName = null; 
	var attrValue = null;
   	var rgxp;
   	var t = 0; 
   	var resultR = [];
	var obj = encodedChars;
    for(var key in obj){
        attrName = key;
        attrValue = obj[key];
        rgxp = new RegExp(attrValue, "g");
	    if (value.match(rgxp)) {
	       	resultR.push(true);
	    } else {
	        resultR.push(false);
	    }
    }
	for (var key in resultR) {
		if(resultR[key] === true)
			++t;		 
	}
	if (t > 0) {
		return true;
		//encoded URI
	} else {
		return false;
		//NotEncoded URI	
	}
};
 
var testCase = {
	name: "test API Global Application Solution",
	_should: {
		error: {},
		ignore: {testSolution_closeSolution_32:true,testSolution_quitServer_82:true,testSolution_getSettingFileSolutionrelativePathFalseEncoding_55:true,testSolution_getSettingFileSolutionrelativePathFalseEncoding_56:true,testSolution_getWalibFolderRelativePathFalseEncoding_77:true}
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
	/*    // 1 --**-- Applications property exist

     * Cleans up everything that was created by setUp().
     */
	tearDown: function() {},
	/*
	 *
	 * Test methods for API SSJS Global Application Solution
	 *
	 */
	 
	 /*
	  * 
	  		RFC Updated : 3986 : http://www.ietf.org/rfc/rfc3986.txt : Uniform Resource Identifier (URI): Generic Syntax
	 		RFC 1738 : Url Encoding : http://www.ietf.org/rfc/rfc1738.txt : Uniform Resource Locators (URL)
	 		
		Url : <scheme>:<scheme-specific-part>
			 
		*Set of Characters which can be used :* 

		 The lower case letters "a"--"z", digits, and the characters plus ("+"), period
		 ("."), and hyphen ("-") are allowed.

		*Set of Characters which can be encoded :*
			 
		space, "<", ">", "#", "%", "{", "}", "|", "\" MS-DOS format, "^", "~","[", "]", and "`". 
		
		" " : "%20"
		"<" : "%3C"
		">" : "%3E"
		"#" : "%23"
		"%" : "%25"
		"{" : "%7B"
		"}" : "%7D"
		"|" : "%7C"
		"\\" : "%5C"
		"^" : "%5E"
		"~" : "%7E"
		"[" : "%5B"
		"]" : "%5D"
		"`" : "%60"
		
		Thus, only alphanumerics, the special characters "$-_.+!*'(),", and
		reserved characters used for their reserved purposes may be used
		unencoded within a URL.
		
		All unsafe characters must always be encoded within a URL.

		Reserved:

			Many URL schemes reserve certain characters for a special meaning:
		their appearance in the scheme-specific part of the URL has a
		designated semantics. If the character corresponding to an octet is
		reserved in a scheme, the octet must be encoded.  The characters ";",
		"/", "?", ":", "@", "=" and "&" are the characters which may be
		reserved for special meaning within a scheme. No other characters may
		be reserved within a scheme.
		
		";" : %3B
		"/" : %2F
		"?" : %3F 
	 	":" : %3A
	 	"@"	: %40
	 	"=" : %3D
	 	"&" : %26
	 	
	 *
	 */
	
	// 0 --**-- Object Solution exist
	testSolution_ObjectSolutionExist_0: function() {
		Y.Assert.isObject(solution,"Value returned isn't an object" + " " + solution);
	},
	// 1 --**-- Solution is available in Global Application
	testSolution_IsAvailableInApplication_1: function() {
		Y.Assert.isObject(application.solution,"Value returned isn't an object" + " " + application.solution);
	},
	// 2 --**-- Applications property exist
	testSolution_ApplicationsPropertyExist_2: function() {
		Y.Assert.isArray(solution.applications,"Value returned isn't an Array" + " " + solution.applications);
	},
	// 3 --**-- Name property exist
	testSolution_NamePropertyExist_3: function() {
		Y.Assert.isString(solution.name,"Value returned isn't a string" + " " + solution.name);
	}, 
	// 4 --**-- getApplicationByName medthod exist
	testSolution_getApplication_4: function() {
		var result = solution.getApplicationByName;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	}, 
	// 5 --**-- getApplicationByName medthod return an object
	testSolution_getApplicationByNameReturnObject_5: function() {
	 	var result = solution.getApplicationByName(application.name);	
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
	}, 
	// 6 --**-- getApplicationByName method exist since Application
	testSolution_getApplicationByNameApplicationExist_6: function() {
		var result = application.solution.getApplicationByName;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	}, 
	// 7 --**-- getApplicationByName medthod return an object since an application
	testSolution_getApplicationByNameReturnObjectApplication_7: function() {
		var result = application.solution.getApplicationByName(application.name);
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
	},
	// 8 --**-- getDebuggerPort method exist since 
	testSolution_getDebuggerPortExist_8: function() {
		var result = solution.getDebuggerPort;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	}, 
	// 9 --**-- getDebuggerPort method return a number
	testSolution_getDebuggerPortReturnNumber_9: function() {
		Y.Assert.isNumber(solution.getDebuggerPort(),"Value returned isn't a number" + " " + solution.getDebuggerPort());
	}, 
	// 10 --**-- getDebuggerPort method exist since application
	testSolution_getDebuggerPortApplicationExist_10: function() {
		var result = application.solution.getDebuggerPort;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	},
	// 11 --**-- getDebuggerPort method return a number since Application 
	testSolution_getDebuggerPortReturnNumberApplication_11: function() {
		Y.Assert.isNumber(application.solution.getDebuggerPort(),"Value returned isn't a number" + " " + application.solution.getDebuggerPort());
	},
	// 12 --**-- getFolder method exist  
	testSolution_getFolderExist_12: function() {
		var result = application.solution.getFolder;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	}, 
	// 13 --**-- getFolder return an object Folder  
	testSolution_getFodlerReturnString_13: function() {
		Y.Assert.isObject(solution.getFolder(),"Value returned isn't an object" + " " + solution.getFolder());
	},
	// 14 --**-- getFolder method exist since application
	testSolution_getFolderApplicationExist_14: function() {
		var result = application.solution.getFolder;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	}, 
	// 15 --**-- getFolder return an object Folder since Application 
	testSolution_getFodlerReturnStringApplication_15: function() {
		Y.Assert.isObject(application.solution.getFolder(),"Value returned isn't an object" + " " + application.solution.getFolder());
	},
	// 16 --**-- getItemsWithRole method exist  
	testSolution_getItemsWithRoleExist_16: function() {
		var result = application.solution.getItemsWithRole;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	}, 
	// 17 --**-- getItemsWithRole return a file object  
	testSolution_getItemsWithRoleReturnString_17: function() {
		var result = solution.getItemsWithRole("settings");
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
	},
	// 18 --**-- getItemsWithRole method exist since application
	testSolution_getItemsWithRoleApplicationExist_18: function() {
		var result = application.solution.getItemsWithRole;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	}, 
	// 19 --**-- getItemsWithRole return a file object since Application 
	testSolution_getItemsWithRoleReturnStringApplication_19: function() {
		var result = application.solution.getItemsWithRole("settings");
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
	}, 
	// 20 --**-- getWalibFolder() method exist  
	testSolution_getWalibFolderExist_20: function() {
		var result = application.solution.getWalibFolder;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	}, 
	// 21 --**-- getWalibFolder() return a string  
	testSolution_getWalibFolderReturnString_21: function() {
		Y.Assert.isObject(solution.getWalibFolder(),"Value returned isn't an object" + " " + application.solution.getWalibFolder());
	},
	// 22 --**-- getWalibFolder() method exist since application
	testSolution_getWalibFolderApplicationExist_22: function() {
		var result = application.solution.getWalibFolder;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	}, 
	// 23 --**-- getWalibFolder() return a string since application 
	testSolution_getWalibFolderReturnStringApplication_23: function() {
		Y.Assert.isObject(application.solution.getWalibFolder(),"Value returned isn't an object" + " " + application.solution.getWalibFolder());
	},
	// 24 --**-- close() method exist 
	testSolution_closeExist_24: function() {
		var result = solution.close;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	}, 
	// 25 --**-- close() method exist since application 
	testSolution_closeApplicationExist_25: function() {
		var result = application.solution.close;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	},
	// 26 --**-- getSettingFile() method exist   
	testSolution_getSettingFileExist_26: function() {
		var result = solution.getSettingFile;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	},
	// 27 --**-- getSettingFile() return an Object 
	testSolution_getSettingFileReturnObject_27: function() {
		var result = solution.getSettingFile("solution");
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
	},
	// 28 --**-- getSettingFile() method exist since application   
	testSolution_getSettingFileApplicationExist_28: function() {
		var result = application.solution.getSettingFile;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	},
	// 29 --**-- getSettingFile() return an Object since application
	testSolution_getSettingFileReturnObjectApplication_29: function() {
		var result = application.solution.getSettingFile("solution");
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
	},
	// 30 --**-- quitServer() method exist 
	testSolution_quiServerExist_30: function() {
		var result = solution.quitServer;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	}, 
	// 31 --**-- quitServer() method exist since application 
	testSolution_quitServerApplicationExist_31: function() {
		var result = application.solution.quitServer;
		Y.Assert.isTypeOf("function", result,"Value returned isn't a function" + " " + result);
	},
	// 32 --**-- Close() Close a solution
	testSolution_closeSolution_32: function() {
	//Must be checked with a distant solution
	},
	// 33 --**-- getDebuggerPort() get the default DebuggerPort
	testSolution_getDebuggerPortDefault_33: function(){
		var result = solution.getDebuggerPort();
		//Off -1, on Default 1919
		Y.Assert.areSame(-1,result,"The default debuggerPort is wrong :" + " " + result);
	},
	// 34 --**-- getFolder() with a kind parameter "folder" and a default encodeURl
	testSolution_getFolderKindFolderDefaultEncodeUrl_34: function() {
		var result = solution.getFolder("folder");
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result); 
		Y.Assert.isTrue(result.exists, "Object doesn't exist");
		Y.Assert.isFalse(encodedOrNotCheck(result.path),"Value returned is encoded" + " " + result.path);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Windows : Default value returned isn't in posix but system" + " " + result.path);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Linux : Default value returned isn't in posix but system" + " " + result.path);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","MacOS : Default value returned isn't in posix but system" + " " + result.path);
		}
	}, 
	// 35 --**-- getFolder() with a kind parameter "path" and a default encodeURl
	testSolution_getFolderKindPathDefaultEncodeUrl_35: function() {
		var result = solution.getFolder("path");
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 36 --**-- getFolder() with a kind parameter "url" and a default encodeURl
	testSolution_getFolderKindURlDefaultEncodeUrl_36: function() {
		var result = solution.getFolder("url"); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isTrue(encodedOrNotCheck(result),"Value returned isn't encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 37 --**-- getFolder() with a kind parameter "folder" and a false encodeURl
	testSolution_getFolderKindFolderFalseEncodeUrl_37: function() {
		var result = solution.getFolder("folder",false);
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result); 
		Y.Assert.isTrue(result.exists, "Object doesn't exist");
		Y.Assert.isFalse(encodedOrNotCheck(result.path),"Value returned is encoded" + " " + result.path);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Windows : Default value returned isn't in posix but system" + " " + result.path);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Linux : Default value returned isn't in posix but system" + " " + result.path);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","MacOS : Default value returned isn't in posix but system" + " " + result.path);
		}
	}, 
	// 38 --**-- getFolder() with a kind parameter "path" and a false encodeURl
	testSolution_getFolderKindPathFalseEncodeUrl_38: function() {
		var result = solution.getFolder("path",false);
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"system","Windows : Default value returned isn't in system but posix" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 39 --**-- getFolder() with a kind parameter "url" and a false encodeURl
	testSolution_getFolderKindURlFalseEncodeUrl_39: function() {
		var result = solution.getFolder("url",false); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 40 --**-- getFolder() with a kind parameter "folder" and a true encodeURl
	testSolution_getFolderKindFolderFalseEncodeUrl_40: function() {
		var result = solution.getFolder("folder",true);
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result); 
		Y.Assert.isTrue(result.exists, "Object doesn't exist");
		Y.Assert.isFalse(encodedOrNotCheck(result.path),"Value returned is encoded" + " " + result.path);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Windows : Default value returned isn't in posix but system" + " " + result.path);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Linux : Default value returned isn't in posix but system" + " " + result.path);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","MacOS : Default value returned isn't in posix but system" + " " + result.path);
		}
	}, 
	// 41  --**-- getFolder() with a kind parameter "path" and a true encodeURl
	testSolution_getFolderKindPathFalseEncodeUrl_41: function() {
		var result = solution.getFolder("path",true);
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 42 --**-- getFolder() with a kind parameter "url" and a true encodeURl
	testSolution_getFolderKindURlFalseEncodeUrl_42: function() {
		var result = solution.getFolder("url",true); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isTrue(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	}, 
	// 43 --**-- getItemWithRole() with a role parameter "settings" 
	testSolution_getItemWithRoleRoleSettings_43: function() {
		var result = solution.getItemsWithRole("settings");
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
		Y.Assert.isTrue(result.exists, "Object doesn't exist");		
	},
	// 44 --**-- getItemWithRole() with a role parameter "directory" 
	testSolution_getItemWithRoleRoleDirectory_44: function() {
		var result = solution.getItemsWithRole("directory");
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
		Y.Assert.isTrue(result.exists, "Object doesn't exist");		
	},
	// 45 --**-- getItemWithRole() with a role parameter "permissions" 
	testSolution_getItemWithRoleRolePermissions_45: function() {
		var result = solution.getItemsWithRole("permissions");
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);		
		Y.Assert.isTrue(result.exists, "Object doesn't exist");
	}, 
	// 46 --**-- getSettingFile() for solution without parameter
	testSolution_getSettingFileSolutionNoParam_46: function() {
		var result = solution.getSettingFile("solution"); 
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
		Y.Assert.isTrue(result.exists, "Object doesn't exist");
	},
	// 47 --**-- getSettingFile() for database without parameter
	testSolution_getSettingFileSolutionNoParam_47: function() {
		var result = solution.getSettingFile("database"); 
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
		Y.Assert.isTrue(result.exists, "Object doesn't exist");
	}, 
	// 48 --**-- getSettingFile() for solution with parameter file and default encoding
	testSolution_getSettingFileSolutionFileDefaultEncoding_48: function() {
		var result = solution.getSettingFile("solution","file"); 
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
		Y.Assert.isTrue(result.exists, "Object doesn't exist");
		Y.Assert.isFalse(encodedOrNotCheck(result.path),"Value returned is encoded" + " " + result.path);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Windows : Default value returned isn't in posix but system" + " " + result.path);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Linux : Default value returned isn't in posix but system" + " " + result.path);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","MacOS : Default value returned isn't in posix but system" + " " + result.path);
		}
	},
	// 49 --**-- getSettingFile() for solution with parameter file and false encoding
	testSolution_getSettingFileSolutionFileFalseEncoding_49: function() {
		var result = solution.getSettingFile("solution","file",false); 
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
		Y.Assert.isTrue(result.exists, "Object doesn't exist");
		Y.Assert.isFalse(encodedOrNotCheck(result.path),"Value returned is encoded" + " " + result.path);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Windows : Default value returned isn't in posix but system" + " " + result.path);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Linux : Default value returned isn't in posix but system" + " " + result.path);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","MacOS : Default value returned isn't in posix but system" + " " + result.path);
		}
	},
	// 50 --**-- getSettingFile() for solution with parameter file and true encoding
	testSolution_getSettingFileSolutionFileTrueEncoding_50: function() {
		var result = solution.getSettingFile("solution","file",true); 
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
		Y.Assert.isTrue(result.exists, "Object doesn't exist");
		Y.Assert.isFalse(encodedOrNotCheck(result.path),"Value returned is encoded" + " " + result.path);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Windows : Default value returned isn't in posix but system" + " " + result.path);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Linux : Default value returned isn't in posix but system" + " " + result.path);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","MacOS : Default value returned isn't in posix but system" + " " + result.path);
		}
	}, 
	// 51 --**-- getSettingFile() for solution with parameter path and default encoding
	testSolution_getSettingFileSolutionPathDefaultEncoding_51: function() {
		var result = solution.getSettingFile("solution","path"); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	}, 
	// 52 --**-- getSettingFile() for solution with parameter path and false encoding
	testSolution_getSettingFileSolutionPathFalseEncoding_52: function() {
		var result = solution.getSettingFile("solution","path",false); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"system","Windows : Default value returned isn't in system but posix" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	}, 
	// 53 --**-- getSettingFile() for solution with parameter path and true encoding
	testSolution_getSettingFileSolutionPathFalseEncoding_53: function() {
		var result = solution.getSettingFile("solution","path",true); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 54 --**-- getSettingFile() for solution with parameter relativePath and default encoding
	testSolution_getSettingFileSolutionrelativePathDefaultEncoding_54: function() {
		var result = solution.getSettingFile("solution","relativePath"); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	}, 
	// 55 --**-- getSettingFile() for solution with parameter relativePath and false encoding
	testSolution_getSettingFileSolutionrelativePathFalseEncoding_55: function() {
		var result = solution.getSettingFile("solution","relativePath",false); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"system","Windows : Default value returned isn't in system but posix" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	}, 
	// 56 --**-- getSettingFile() for solution with parameter relativePath and true encoding
	testSolution_getSettingFileSolutionrelativePathFalseEncoding_56: function() {
		var result = solution.getSettingFile("solution","relativePath",true); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 57 --**-- getSettingFile() for solution with parameter url and default encoding
	testSolution_getSettingFileSolutionUrlDefaultEncoding_57: function() {
		var result = solution.getSettingFile("solution","url"); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isTrue(encodedOrNotCheck(result),"Value returned isn't encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	}, 
	// 58 --**-- getSettingFile() for solution with parameter url and false encoding
	testSolution_getSettingFileSolutionUrlFalseEncoding_58: function() {
		var result = solution.getSettingFile("solution","url",false); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	}, 
	// 59 --**-- getSettingFile() for solution with parameter url and true encoding
	testSolution_getSettingFileSolutionUrlFalseEncoding_59: function() {
		var result = solution.getSettingFile("solution","url",true); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isTrue(encodedOrNotCheck(result),"Value returned isn't encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	
	// 60 --**-- getSettingFile() for database with parameter file and default encoding
	testSolution_getSettingFileDatabaseFileDefaultEncoding_60: function() {
		var result = solution.getSettingFile("database","file"); 
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
		Y.Assert.isTrue(result.exists, "Object doesn't exist");
		Y.Assert.isFalse(encodedOrNotCheck(result.path),"Value returned is encoded" + " " + result.path);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Windows : Default value returned isn't in posix but system" + " " + result.path);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Linux : Default value returned isn't in posix but system" + " " + result.path);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","MacOS : Default value returned isn't in posix but system" + " " + result.path);
		}
	},
	// 61 --**-- getSettingFile() for database with parameter file and false encoding
	testSolution_getSettingFileDatabaseFileFalseEncoding_61: function() {
		var result = solution.getSettingFile("database","file",false); 
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
		Y.Assert.isTrue(result.exists, "Object doesn't exist");
		Y.Assert.isFalse(encodedOrNotCheck(result.path),"Value returned is encoded" + " " + result.path);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Windows : Default value returned isn't in posix but system" + " " + result.path);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Linux : Default value returned isn't in posix but system" + " " + result.path);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","MacOS : Default value returned isn't in posix but system" + " " + result.path);
		}
	},
	// 62 --**-- getSettingFile() for database with parameter file and true encoding
	testSolution_getSettingFileDatabaseFileTrueEncoding_62: function() {
		var result = solution.getSettingFile("database","file",true); 
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
		Y.Assert.isTrue(result.exists, "Object doesn't exist");
		Y.Assert.isFalse(encodedOrNotCheck(result.path),"Value returned is encoded" + " " + result.path);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Windows : Default value returned isn't in posix but system" + " " + result.path);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","Linux : Default value returned isn't in posix but system" + " " + result.path);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result.path),"posix","MacOS : Default value returned isn't in posix but system" + " " + result.path);
		}
	}, 
	// 63 --**-- getSettingFile() for database with parameter path and default encoding
	testSolution_getSettingFileDatabasePathDefaultEncoding_63: function() {
		var result = solution.getSettingFile("database","path"); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	}, 
	// 64 --**-- getSettingFile() for database with parameter path and false encoding
	testSolution_getSettingFileDatabasePathFalseEncoding_64: function() {
		var result = solution.getSettingFile("database","path",false); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"system","Windows : Default value returned isn't in system but posix" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	}, 
	// 65 --**-- getSettingFile() for database with parameter path and true encoding
	testSolution_getSettingFileDatabasePathFalseEncoding_65: function() {
		var result = solution.getSettingFile("database","path",true); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 66 --**-- getSettingFile() for database with parameter relativePath and default encoding
	testSolution_getSettingFileDatabaseRelativePathDefaultEncoding_66: function() {
		var result = solution.getSettingFile("database","relativePath"); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	}, 
	// 67 --**-- getSettingFile() for database with parameter relativePath and false encoding
	testSolution_getSettingFileDatabaseRelativePathFalseEncoding_67: function() {
		var result = solution.getSettingFile("database","relativePath",false); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	}, 
	// 68 --**-- getSettingFile() for database with parameter relativePath and true encoding
	testSolution_getSettingFileDatabaseRelativePathFalseEncoding_68: function() {
		var result = solution.getSettingFile("database","relativePath",true); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 69 --**-- getSettingFile() for database with parameter url and default encoding
	testSolution_getSettingFileDatabaseUrlDefaultEncoding_69: function() {
		var result = solution.getSettingFile("database","url"); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isTrue(encodedOrNotCheck(result),"Value returned isn't encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	}, 
	// 70 --**-- getSettingFile() for database with parameter url and false encoding
	testSolution_getSettingFileDatabaseUrlFalseEncoding_70: function() {
		var result = solution.getSettingFile("database","url",false); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	}, 
	// 71 --**-- getSettingFile() for database with parameter url and true encoding
	testSolution_getSettingFiledDatabaseUrlFalseEncoding_71: function() {
		var result = solution.getSettingFile("database","url",true); 
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isTrue(encodedOrNotCheck(result),"Value returned isn't encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 72 --**-- getWalibFolder() without parameter and default encoding
	testSolution_getWalibFolderNoParamDefaultEncoding_72: function () {
		var result = solution.getWalibFolder();
		Y.Assert.isObject(result,"Value returned isn't an object" + " " + result);
		Y.Assert.isTrue(result.exists, "Object doesn't exist");
	},	 
	// 73 --**-- getWalibFolder() with parameter path and default encoding
	testSolution_getWalibFolderPathDefaultEncoding_73: function () {
		var result = solution.getWalibFolder("path");
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 74 --**-- getWalibFolder() with parameter path and false encoding
	testSolution_getWalibFolderPathFalseEncoding_74: function () {
		var result = solution.getWalibFolder("path",false);
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"system","Windows : Default value returned isn't in system but posix" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 75 --**-- getWalibFolder() with parameter path and true encoding
	testSolution_getWalibFolderPathTrueEncoding_75: function () {
		var result = solution.getWalibFolder("path",true);
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 76 --**-- getWalibFolder() with parameter relativePath and default encoding
	testSolution_getWalibFolderRelativePathDefaultEncoding_76: function () {
		var result = solution.getWalibFolder("relativePath");
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 77 --**-- getWalibFolder() with parameter relativePath and false encoding
	testSolution_getWalibFolderRelativePathFalseEncoding_77: function () {
		var result = solution.getWalibFolder("relativePath",false);
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"system","Windows : Default value returned isn't in system but posix" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 78 --**-- getWalibFolder() with parameter relativePath and true encoding
	testSolution_getWalibFolderRelativePathTrueEncoding_78: function () {
		var result = solution.getWalibFolder("relativePath",true);
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 79 --**-- getWalibFolder() with parameter url and default encoding
	testSolution_getWalibFolderUrlDefaultEncoding_79: function () {
		var result = solution.getWalibFolder("url");
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isTrue(encodedOrNotCheck(result),"Value returned isn't encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 80 --**-- getWalibFolder() with parameter url and false encoding
	testSolution_getWalibFolderUrlFalseEncoding_80: function () {
		var result = solution.getWalibFolder("url",false);
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isFalse(encodedOrNotCheck(result),"Value returned is encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 81 --**-- getWalibFolder() with parameter url and true encoding
	testSolution_getWalibFolderUrlTrueEncoding_81: function () {
		var result = solution.getWalibFolder("url",true);
		Y.Assert.isString(result,"Value returned isn't a string" + " " + result);
		Y.Assert.isTrue(encodedOrNotCheck(result),"Value returned isn't encoded" + " " + result);
		if (os.isWindows) {
			//Win Stuff 
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Windows : Default value returned isn't in posix but system" + " " + result);
		} else if (os.isLinux) {
			//Linux Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","Linux : Default value returned isn't in posix but system" + " " + result);   
		} else {
			//MAC Stuff
			Y.Assert.areSame(posixOrNotCheck(result),"posix","MacOS : Default value returned isn't in posix but system" + " " + result);
		}
	},
	// 82 --**--  quitServer() Quit the Server
	testSolution_quitServer_82: function() {
	//Must be checked with a distant solution
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