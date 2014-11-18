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
	name: "test API HTTPServer HTTPServerSSL",
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
	 * Test methods for API SSJS HTTPServer HTTPServerSSL
	 *
	 */
	// 0 --**-- Enabled is available on the property "httpServer.ssl"
	testHTTPServerSSL_enabledPropertyIsAvailable_0: function() {
		Y.Assert.isBoolean(httpServer.ssl.enabled);
	},
	// 1 --**-- Enabled is available on the property "httpServer.ssl" since application Object
	testHTTPServerSSL_ApplicationEnabledPropertyIsAvailable_1: function() {
		Y.Assert.isBoolean(application.httpServer.ssl.enabled);
	},
	// 2 --**-- Default value for the enabled SSL property
	testHTTPServerSSL_DefaultEnabledPropertyValue_2: function() {
		var result = httpServer.ssl.enabled;
		Y.Assert.areEqual(false,result);
	},
	// 3 --**-- Port property exist
	testHTTPServerSSL_PortPropertyExist_3: function() {
		Y.Assert.isNumber(httpServer.ssl.port);
	},
	// 4 --**-- Port property exist since application Object
	testHTTPServerSSL_PortPropertyExist_4: function() {
		Y.Assert.isNumber(application.httpServer.ssl.port);
	},
	// 5 --**-- Default port for SSL port property
	testHTTPServerSSL_DefaultPortPropertyValue_5: function() {
		var result = httpServer.ssl.port;
		Y.Assert.areEqual(443,result);
	},
	// 6 --**-- GetCertificationPath() method exist
	testHTTPServerSSL_GetCertificationPathMethodExist_6: function() {
		Y.Assert.isString(httpServer.ssl.getCertificatePath());
	},
	// 7 --**-- Value returned by GetCertificationPath()
	testHTTPServerSSL_GetCertificationPathMethodValue_7: function() {
		var result = httpServer.ssl.getCertificateFolder().path;
		var solutionPath = solution.getFolder("path",true);
		//Y.Assert.areEqual(solutionPath + "Certificates/",result.replace(/\\/g,'/'));
		Y.Assert.areEqual(solutionPath + "Certificates/",result);
	},
	// 8 --**-- GetCertificationFolder() method exist
	testHTTPServerSSL_GetCertificationFolderMethodExist_8: function() {
		Y.Assert.isString(httpServer.ssl.getCertificateFolder().path);
		Y.Assert.isObject(httpServer.ssl.getCertificateFolder());
		Y.Assert.isTrue(httpServer.ssl.getCertificateFolder().exists);
	},
	// 9 --**-- Value returned by GetCertificationFolder()
	testHTTPServerSSL_GetCertificationFolderMethodValue_9: function() {
		var result = httpServer.ssl.getCertificateFolder().path;
		var solutionPath = solution.getFolder("path");
		//Y.Assert.areEqual(solutionPath + "Certificates/",result.replace(/\\/g,'/'));
		Y.Assert.areEqual(solutionPath + "Certificates/",result);
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
