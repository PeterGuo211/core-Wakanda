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

 function generateJson() 
{
	var jsonResult = 
	{
		"case" : caseU, 
		"ae" : 
		{
			//To Complete
		}
	};
};

var testCase = {
	name: "test Resources",
	_should: {
		error: {},
		ignore: 
		{
			testResourcesRedirectToGoogle_1:true,
			testResourcesRedirectToIndexPageUrlPath_3:true, 
			testResourcesPicturesProject_4:true, 
			testResourcesPicturesWebFolder_6:true, 
			testResourcesRedirectToIndexPageUrlRegex_8:true
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
	 * Test methods for Virtual Folder
	 *
	 */
	// 0 --**-- Simple redirect to google using "urlPath" & "location"
	testResourcesRedirectToGoogle_0: function() {
		var xhr, headers, headersArray, result, URL;
		var headersObj = {};
		URL = "http://" + httpServer.hostName + ":" + httpServer.port + "/redirectedToGoogle/";
		xhr = new XMLHttpRequest();
		xhr.open('GET', URL, false);
		xhr.send();
		result = xhr.status;
		headers = xhr.getAllResponseHeaders();
		headersArray = headers.split('\n');
		headersArray.shift();
		headersArray.pop();
		headersArray.forEach(function(header, index, headersArray) {
			var name, indexSeparator, value;
			indexSeparator = header.indexOf(':');
			name = header.substr(0, indexSeparator);
			value = header.substr(indexSeparator + 1).trim();
			headersObj[name] = value;
		});
		Y.Assert.areSame(200, result);
		//Check 301 redirect Status
		//Check url requested
	},
	// 1 --**-- Simple redirect to google using "urlPath" & "location" without / at the end of the url request
	testResourcesRedirectToGoogle_1: function() {
		var xhr, headers, headersArray, result, URL;
		var headersObj = {};
		URL = "http://" + httpServer.hostName + ":" + httpServer.port + "/redirectedToGoogle";
		xhr = new XMLHttpRequest();
		xhr.open('GET', URL, false);
		xhr.send();
		result = xhr.status;
		headers = xhr.getAllResponseHeaders();
		headersArray = headers.split('\n');
		headersArray.shift();
		headersArray.pop();
		headersArray.forEach(function(header, index, headersArray) {
			var name, indexSeparator, value;
			indexSeparator = header.indexOf(':');
			name = header.substr(0, indexSeparator);
			value = header.substr(indexSeparator + 1).trim();
			headersObj[name] = value;
		});
		Y.Assert.areSame(200, result);
		//Check 301 redirect Status
		//Check url requested
	}, 
	// 2 --**-- Simple redirect to index.html using "urlPath" & "location"
	testResourcesRedirectToIndexPageUrlPath_2: function() {
		var xhr, headers, headersArray, result, URL;
		var headersObj = {};
		URL = "http://" + httpServer.hostName + ":" + httpServer.port + "/redirectedToIndexPage/";
		xhr = new XMLHttpRequest();
		xhr.open('GET', URL, false);
		xhr.send();
		result = xhr.status;
		headers = xhr.getAllResponseHeaders();
		headersArray = headers.split('\n');
		headersArray.shift();
		headersArray.pop();
		headersArray.forEach(function(header, index, headersArray) {
			var name, indexSeparator, value;
			indexSeparator = header.indexOf(':');
			name = header.substr(0, indexSeparator);
			value = header.substr(indexSeparator + 1).trim();
			headersObj[name] = value;
		});
		Y.Assert.areSame(200, result);
		//Check 301 redirect Status
		//Check url requested
	}, 	
	// 3 --**-- Simple redirect to index.html using "urlPath" & "location" without / at the end of the url request
	testResourcesRedirectToIndexPageUrlPath_3: function() {
		var xhr, headers, headersArray, result, URL;
		var headersObj = {};
		URL = "http://" + httpServer.hostName + ":" + httpServer.port + "/redirectedToIndexPage";
		xhr = new XMLHttpRequest();
		xhr.open('GET', URL, false);
		xhr.send();
		result = xhr.status;
		headers = xhr.getAllResponseHeaders();
		headersArray = headers.split('\n');
		headersArray.shift();
		headersArray.pop();
		headersArray.forEach(function(header, index, headersArray) {
			var name, indexSeparator, value;
			indexSeparator = header.indexOf(':');
			name = header.substr(0, indexSeparator);
			value = header.substr(indexSeparator + 1).trim();
			headersObj[name] = value;
		});
		Y.Assert.areSame(200, result);
		//Check 301 redirect Status
		//Check url requested
	},
	
	// 4 --**-- Simple redirect to a picture in a folder (Project) using "urlPath" & "localPath" without / at the end of the url request
	testResourcesPicturesProject_4: function() {
		var xhr, headers, headersArray, result, URL;
		var headersObj = {};
		URL = "http://" + httpServer.hostName + ":" + httpServer.port + "/picturesProject";
		xhr = new XMLHttpRequest();
		xhr.open('GET', URL, false);
		xhr.send();
		result = xhr.status;
		headers = xhr.getAllResponseHeaders();
		headersArray = headers.split('\n');
		headersArray.shift();
		headersArray.pop();
		headersArray.forEach(function(header, index, headersArray) {
			var name, indexSeparator, value;
			indexSeparator = header.indexOf(':');
			name = header.substr(0, indexSeparator);
			value = header.substr(indexSeparator + 1).trim();
			headersObj[name] = value;
		});
		Y.Assert.areSame(200, result);
		//Check 301 redirect Status
		//Check url requested
	}, 
	
	// 5 --**-- Simple redirect to a picture in a folder (Project) using "urlPath" & "localPath" 
	testResourcesPicturesProject_5: function() {
		var xhr, headers, headersArray, result, URL;
		var headersObj = {};
		URL = "http://" + httpServer.hostName + ":" + httpServer.port + "/picturesProject/";
		xhr = new XMLHttpRequest();
		xhr.open('GET', URL, false);
		xhr.send();
		result = xhr.status;
		headers = xhr.getAllResponseHeaders();
		headersArray = headers.split('\n');
		headersArray.shift();
		headersArray.pop();
		headersArray.forEach(function(header, index, headersArray) {
			var name, indexSeparator, value;
			indexSeparator = header.indexOf(':');
			name = header.substr(0, indexSeparator);
			value = header.substr(indexSeparator + 1).trim();
			headersObj[name] = value;
		});
		Y.Assert.areSame(200, result);
		//Check 301 redirect Status
		//Check url requested
	},
	
	// 6 --**-- Simple redirect to a picture in a folder (WebFolder) using "urlPath" & "localPath" without / at the end of the url request
	testResourcesPicturesWebFolder_6: function() {
		var xhr, headers, headersArray, result, URL;
		var headersObj = {};
		URL = "http://" + httpServer.hostName + ":" + httpServer.port + "/picturesWebFolder";
		xhr = new XMLHttpRequest();
		xhr.open('GET', URL, false);
		xhr.send();
		result = xhr.status;
		headers = xhr.getAllResponseHeaders();
		headersArray = headers.split('\n');
		headersArray.shift();
		headersArray.pop();
		headersArray.forEach(function(header, index, headersArray) {
			var name, indexSeparator, value;
			indexSeparator = header.indexOf(':');
			name = header.substr(0, indexSeparator);
			value = header.substr(indexSeparator + 1).trim();
			headersObj[name] = value;
		});
		Y.Assert.areSame(200, result);
		//Check 301 redirect Status
		//Check url requested
	}, 
	
	// 7 --**-- Simple redirect to a picture in a folder (WebFolder) using "urlPath" & "localPath" 
	testResourcesPicturesWebFolder_7: function() {
		var xhr, headers, headersArray, result, URL;
		var headersObj = {};
		URL = "http://" + httpServer.hostName + ":" + httpServer.port + "/picturesWebFolder/";
		xhr = new XMLHttpRequest();
		xhr.open('GET', URL, false);
		xhr.send();
		result = xhr.status;
		headers = xhr.getAllResponseHeaders();
		headersArray = headers.split('\n');
		headersArray.shift();
		headersArray.pop();
		headersArray.forEach(function(header, index, headersArray) {
			var name, indexSeparator, value;
			indexSeparator = header.indexOf(':');
			name = header.substr(0, indexSeparator);
			value = header.substr(indexSeparator + 1).trim();
			headersObj[name] = value;
		});
		Y.Assert.areSame(200, result);
		//Check 301 redirect Status
		//Check url requested
	},
	// 8 --**-- Simple redirect to index.html using "urlRegex" & "localPath" 
	testResourcesRedirectToIndexPageUrlRegex_8: function() {
		var xhr, headers, headersArray, result, URL;
		var headersObj = {};
		URL = "http://" + httpServer.hostName + ":" + httpServer.port + "/css/test/";
		xhr = new XMLHttpRequest();
		xhr.open('GET', URL, false);
		xhr.send();
		result = xhr.status;
		headers = xhr.getAllResponseHeaders();
		headersArray = headers.split('\n');
		headersArray.shift();
		headersArray.pop();
		headersArray.forEach(function(header, index, headersArray) {
			var name, indexSeparator, value;
			indexSeparator = header.indexOf(':');
			name = header.substr(0, indexSeparator);
			value = header.substr(indexSeparator + 1).trim();
			headersObj[name] = value;
		});
		Y.Assert.areSame(200, result);
		//Check 301 redirect Status
		//Check url requested
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