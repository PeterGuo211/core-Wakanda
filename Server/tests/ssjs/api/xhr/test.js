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
	name: "XHRBasicTest",

	_should: {
		ignore: {

		}
	},

	// INTERFACE

	testObjectExists: function() {
		Y.Assert.areSame("function", typeof XMLHttpRequest);
	},
	testBasicInstanciation: function() {
		var myXHR = new XMLHttpRequest();
		Y.Assert.areSame("object", typeof myXHR);
	},
	testInstanceHasGetResponseHeaderMethod: function() {
		var myXHR = new XMLHttpRequest();
		Y.Assert.areSame("function", typeof myXHR.getResponseHeader);
	},
	testInstanceHasGetAllResponseHeadersMethod: function() {
		var myXHR = new XMLHttpRequest();
		Y.Assert.areSame("function", typeof myXHR.getAllResponseHeaders);
	},
	testInstanceHasOpenMethod: function() {
		var myXHR = new XMLHttpRequest();
		Y.Assert.areSame("function", typeof myXHR.open);
	},
	testInstanceHasSendMethod: function() {
		var myXHR = new XMLHttpRequest();
		Y.Assert.areSame("function", typeof myXHR.send);
	},
	testInstanceHasSetRequestHeaderMethod: function() {
		var myXHR = new XMLHttpRequest();
		Y.Assert.areSame("function", typeof myXHR.setRequestHeader);
	},

	// GET
	testInstanceBasic200GETRequest: function() {
		var result = null;
		var myXHR = new XMLHttpRequest();
		myXHR.open("GET", "http://127.0.0.1:8081/testSimple", false);
		myXHR.send();
		result = myXHR.status;
		Y.Assert.areSame(200, result);
	},
	testInstanceBasic404GETRequest: function() {
		var result = null;
		var myXHR = new XMLHttpRequest();
		myXHR.open("GET", "http://127.0.0.1:8081/foobar", false);
		myXHR.send();
		result = myXHR.status;
		Y.Assert.areSame(404, result);
	},
	testInstanceBasicFailedGETRequest: function() {
		var invalid = false;
		var myXHR = new XMLHttpRequest();
		try {
			myXHR.open("GET", "http://foo.bar.baz/42", false);
			myXHR.send();
		} catch (e) {
			invalid = true;
		}
		//if we are behind a proxy, there is no exception but a proxy error status
		if (!invalid && myXHR.status == 502) {
			invalid = true;
		}

		Y.Assert.areSame(true, invalid);
	},
	testInstanceEchoedGETRequest: function() {
		var result = null;
		var myXHR = new XMLHttpRequest();
		myXHR.open("GET", "http://127.0.0.1:8081/testEcho/foo?bar=baz", false);
		myXHR.send();
		try {
			result = JSON.parse(myXHR.responseText);
		} catch (e) {
			Y.Assert.fail(e.message + ': ' + myXHR.responseText);
		}
		Y.Assert.areSame("object", typeof result);
		Y.ObjectAssert.hasKeys([
			"url",
			"rawURL",
			"urlPath",
			"urlQuery",
			"host",
			"method",
			"version",
			"user",
			"password",
			"requestLine",
			"headers",
			"body"
		], result);
		Y.ObjectAssert.hasKeys([
			"ACCEPT",
			"HOST"
		], result.headers);
		Y.Assert.areSame("/testEcho/foo?bar=baz", result.url);
		Y.Assert.areSame("/testEcho/foo?bar=baz", result.rawURL);
		Y.Assert.areSame("/testEcho/foo", result.urlPath);
		Y.Assert.areSame("bar=baz", result.urlQuery);
		Y.Assert.areSame("127.0.0.1:8081", result.host);
		Y.Assert.areSame("GET", result.method);
		Y.Assert.areSame("HTTP/1.1", result.version);
		Y.Assert.areSame("", result.user);
		Y.Assert.areSame("", result.password);
		Y.Assert.areSame("GET /testEcho/foo?bar=baz HTTP/1.1", result.requestLine);
		Y.Assert.areSame("*" + "/" + "*", result.headers.ACCEPT);
		Y.Assert.areSame("127.0.0.1:8081", result.headers.HOST);
		Y.Assert.isObject(result.body);
		Y.Assert.areSame(0, result.body.size);
		Y.Assert.areSame("application/octet-stream", result.body.type);
	},

	// POST

	testInstanceBasic405POSTRequest: function() {
		var result = null;
		var myXHR = new XMLHttpRequest();
		myXHR.open("POST", "http://127.0.0.1:8081", false);
		myXHR.send();
		result = myXHR.status;
		Y.Assert.areSame(405, result);
	},
	testInstanceBasicFailedPOSTRequest: function() {
		var invalid = false;
		var myXHR = new XMLHttpRequest();
		try {
			myXHR.open("POST", "http://foo.bar.baz/42", false);
			myXHR.send();
		} catch (e) {
			invalid = true;
		}
		//if we are behind a proxy, there is no exception but a proxy error status
		if (!invalid && myXHR.status == 502) {
			invalid = true;
		}

		Y.Assert.areSame(true, invalid);
	},
	testInstanceEchoedPOSTRequest: function() {
		var result = null;
		var myXHR = new XMLHttpRequest();
		myXHR.open("POST", "http://127.0.0.1:8081/testEcho/foo?bar=%20baz", false);
		myXHR.send("{\"foo\": 'bar baz',\n\t\"42\": 42}");
		try {
			result = JSON.parse(myXHR.responseText);
		} catch (e) {
			Y.Assert.fail(e.message + ': ' + myXHR.responseText);
		}
		Y.Assert.areSame("object", typeof result);
		Y.ObjectAssert.hasKeys([
			"url",
			"rawURL",
			"urlPath",
			"urlQuery",
			"host",
			"method",
			"version",
			"user",
			"password",
			"requestLine",
			"headers",
			"body"
		], result);
		Y.ObjectAssert.hasKeys([
			"ACCEPT",
			"HOST"
		], result.headers);
		Y.Assert.areSame("/testEcho/foo?bar= baz", result.url);
		Y.Assert.areSame("/testEcho/foo?bar=%20baz", result.rawURL);
		Y.Assert.areSame("/testEcho/foo", result.urlPath);
		Y.Assert.areSame("bar= baz", result.urlQuery);
		Y.Assert.areSame("127.0.0.1:8081", result.host);
		Y.Assert.areSame("POST", result.method);
		Y.Assert.areSame("HTTP/1.1", result.version);
		Y.Assert.areSame("", result.user);
		Y.Assert.areSame("", result.password);
		Y.Assert.areSame("POST /testEcho/foo?bar=%20baz HTTP/1.1", result.requestLine);
		Y.Assert.areSame("*" + "/" + "*", result.headers.ACCEPT);
		Y.Assert.areSame("127.0.0.1:8081", result.headers.HOST);
		Y.Assert.areSame("{\"foo\": 'bar baz',\n\t\"42\": 42}", result.body);
	},

	testHttps: function() {

		xhr = new XMLHttpRequest();
		xhr.open('GET', "https://www.google.fr/");
		xhr.send();
		var status = xhr.status;
		Y.Assert.areSame(200, status);
	},

	testOnreadystatechange: function() {
		var xhr = new XMLHttpRequest();
		var stateSequence = [0];
		xhr.onreadystatechange = function() {
			var state = this.readyState;
			stateSequence.push(state);
			if (state !== 4) {
				return;
			}
		};
		xhr.open('GET', 'http://127.0.0.1:8081/testSimple');
		xhr.send();
		Y.ArrayAssert.itemsAreSimilar([0, 1, 2, 3, 4], stateSequence);
	},

	testOnreadystatechangeBis: function() {
		var stateSequence = [0];
		var expected = [0, 1, 2, 3, 4];

		var stateHandler = function() {
			var state = this.readyState;
			stateSequence.push(state);
			if (state !== 4) {
				return;
			}
		};

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = stateHandler;

		try {
			xhr.open('GET', 'http://www.google.fr/');
			xhr.send();
		} catch (e) {
			expected = [0, 1, 2, 1, 2, 3, 4];
			xhr = new XMLHttpRequest({
				host: 'http://proxy.private.4d.fr',
				port: 80
			});
			xhr.onreadystatechange = stateHandler;
			xhr.open('GET', 'http://www.google.fr/');
			xhr.send();
		}

		Y.ArrayAssert.itemsAreSimilar(expected, stateSequence);
	},

	// response and responseType
	testInstanceHasResponseProperty: function() {
		var result = null;
		var myXHR = new XMLHttpRequest();
		myXHR.open("GET", "http://127.0.0.1:8081/testSimple", false);
		myXHR.send();
		Y.Assert.areNotSame("undefined", typeof myXHR.response);
	},

	testInstanceHasResponseTypeProperty: function() {
		var result = null;
		var myXHR = new XMLHttpRequest();
		Y.Assert.areNotSame("undefined", typeof myXHR.responseType);
	},

	testInstanceGetResponseOfTypeTextByDefault: function() {
		var result = null;
		var myXHR = new XMLHttpRequest();
		myXHR.open("GET", "http://127.0.0.1:8081/testSimple", false);
		myXHR.send();
		Y.Assert.areSame("string", typeof myXHR.response);
		Y.Assert.areSame("OK", myXHR.response);
	},

	testInstanceGetResponseOfTypeTextRequired: function() {
		var result = null;
		var myXHR = new XMLHttpRequest();
		myXHR.responseType = 'text';
		myXHR.open("GET", "http://127.0.0.1:8081/testSimple", false);
		myXHR.send();
		Y.Assert.areSame("string", typeof myXHR.response);
		Y.Assert.areSame("OK", myXHR.response);
	},

	testInstanceGetResponseOfTypeTextIfUnkown: function() {
		var failed = false;
		var myXHR = new XMLHttpRequest();
		try {
			myXHR.responseType = 'foobar';
			myXHR.open("GET", "http://127.0.0.1:8081/testSimple", false);
			myXHR.send();
		} catch (e) {
			failed = true;
		}
		Y.Assert.isTrue(failed, 'Should throw an exception.');
	},

	testInstanceGetResponseOfTypeBlobRequired: function() {
		var result = null;
		var myXHR = new XMLHttpRequest();
		myXHR.responseType = 'blob';
		myXHR.open("GET", "http://127.0.0.1:8081/testSimple", false);
		myXHR.send();
		Y.Assert.areSame("object", typeof myXHR.response);
		Y.Assert.areSame("function", typeof myXHR.response.toBuffer);
		Y.Assert.areSame("function", typeof myXHR.response.toString);
		Y.Assert.areSame("OK", myXHR.response.toString());
	},

	testDataIntegrity: function() {
		var result = null;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://127.0.0.1:8081/words");
		xhr.send();
		result = xhr.status;
		Y.Assert.areSame(200, result);
		crypto = require("crypto");
		var hash = crypto.createHash("sha1");
		xhr.responseType = "blob";
		hash.update(xhr.response.toBuffer());
		var digest = hash.digest().toString("hex");
		Y.Assert.areSame("a62edf8685920f7d5a95113020631cdebd18a185", digest);

	},

	testPathAndQueryEncoding: function() {
		var result = null;
		var myXHR = new XMLHttpRequest();
		myXHR.open("GET", "http://127.0.0.1:8081/testEcho/foo%20bar?foo=baz%20baz", false);
		myXHR.send();
		try {
			result = JSON.parse(myXHR.responseText);
		} catch (e) {
			Y.Assert.fail(e.message + ': ' + myXHR.responseText);
		}
		Y.Assert.areSame("object", typeof result);
		Y.ObjectAssert.hasKeys([
			"url",
			"rawURL",
			"urlPath",
			"urlQuery",
			"host",
			"method",
			"version",
			"user",
			"password",
			"requestLine",
			"headers",
			"body"
		], result);
		Y.ObjectAssert.hasKeys([
			"ACCEPT",
			"HOST"
		], result.headers);
		Y.Assert.areSame("/testEcho/foo bar?foo=baz baz", result.url, 'url property is wrong');
		Y.Assert.areSame("/testEcho/foo%20bar?foo=baz%20baz", result.rawURL, 'rawURL property is wrong');
		Y.Assert.areSame("/testEcho/foo bar", result.urlPath);
		Y.Assert.areSame("foo=baz baz", result.urlQuery);
		Y.Assert.areSame("127.0.0.1:8081", result.host);
		Y.Assert.areSame("GET", result.method);
		Y.Assert.areSame("HTTP/1.1", result.version);
		Y.Assert.areSame("", result.user);
		Y.Assert.areSame("", result.password);
		Y.Assert.areSame("GET /testEcho/foo%20bar?foo=baz%20baz HTTP/1.1", result.requestLine);
		Y.Assert.areSame("*" + "/" + "*", result.headers.ACCEPT);
		Y.Assert.areSame("127.0.0.1:8081", result.headers.HOST);
		Y.Assert.isObject(result.body);
		Y.Assert.areSame(0, result.body.size);
		Y.Assert.areSame("application/octet-stream", result.body.type);
	}
};

//require("unitTest").run(testCase).getReport();