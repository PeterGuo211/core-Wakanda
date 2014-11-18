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
// isObject() is used instead of isFunction().
// Native (C++) functions are unsupported by isFunction().
var testCase = {
	name: "Web Workers Test",
	_should: {
		ignore: {
			// May cause a hang of the Server:
			testSharedWorkerContructor: true,
			testSharedWorkerProxyObject: true,
			testSharedWorkerMessaging: true,

			// Disabled by developer:
			testDedicatedWorkerErrorPropagation: true,
			testDedicatedWorkerErrorCatching: true
		}
	},

	// Check if Worker() constructor is available.
	testIsDedicatedWorkerAvailable: function() {
		Y.Assert.isObject(Worker);
	},
	// Check WorkerGlobalScope attributes and function.
	testWorkerGlobalScope: function() {
		Y.Assert.isObject(self);
		Y.Assert.isObject(location);

		// onerror is a user defined attribute.
		Y.Assert.isObject(close);
	},
	// Check dedicated worker constructor.
	testDedicatedWorkerContructor: function() {
		var myDedicatedWorker = new Worker('doNothingWorker.js');
		Y.Assert.isObject(myDedicatedWorker);

	},
	// Check dedicated worker proxy object.
	testDedicatedWorkerProxyObject: function() {
		var myDedicatedWorker = new Worker('doNothingWorker.js');
		// onerror and onmessage are user defined attributes.
		Y.Assert.isObject(myDedicatedWorker.terminate);
		Y.Assert.isObject(myDedicatedWorker.postMessage);
	},
	// Check message exchange between a parent and a child dedicated worker.

	testDedicatedWorkerMessaging: function() {
		var myDedicatedWorker = new Worker('pingPongDedicatedWorker.js');
		var test = this;
		myDedicatedWorker.onmessage = function(event) {
			test.resume(function() {
				Y.Assert.areEqual("test", event.data);

			});
		}
		myDedicatedWorker.postMessage("test");
		this.wait(1000);
	},
	// Check DedicatedWorkerGlobalScope attributes and function.

	testDedicatedWorkerGlobalScope: function() {
		var myDedicatedWorker = new Worker('globalScopeDedicatedWorker.js');
		var test = this;
		myDedicatedWorker.onmessage = function(event) {
			test.resume(function() {
				Y.Assert.isTrue(event.data.self);
				Y.Assert.isTrue(event.data.location);
				Y.Assert.isTrue(event.data.close);
				Y.Assert.isTrue(event.data.postMessage);
			});
		}
		this.wait(1000);
	},
	// Check error reporting from dedicated worker.
	testDedicatedWorkerErrorReporting: function() {
		var hasException;

		// Try to run a non existing script.

		hasException = false;
		try {

			new Worker('noSuchFile.js');

		} catch (exception) {

			hasException = true;

		}
		Y.Assert.isTrue(hasException);

		// Try to run a script with syntax error.

		hasException = false;
		try {

			new Worker('syntaxError.js');

		} catch (exception) {

			hasException = true;

		}
		Y.Assert.isTrue(hasException);

	},
	// Check that it is possible to create dedicated workers recursively.
	testRecursiveDedicatedWorkers: function() {
		var myDedicatedWorker = new Worker('recursiveDedicatedWorker.js');
		var test = this;
		myDedicatedWorker.onerror = function(event) {

			Y.Assert.isObject(event);
			Y.Assert.isString(event.message);
			Y.Assert.isString(event.filename);
			Y.Assert.isNumber(event.lineno);
			Y.Assert.isObject(event.initErrorEvent);

			// Thrown exception, not possible to create dedicated workers recursively.
			webWorkersTest._should.ignore.testDedicatedWorkerErrorPropagation = true;
			webWorkersTest._should.ignore.testDedicatedWorkerErrorCatching = true;
			test.resume(function() {
				Y.Assert.isTrue(false);
			});
		}
		myDedicatedWorker.onmessage = function(event) {
			// Ok, worker has been created.        
			test.resume(function() {
				Y.Assert.areEqual(event.data, "Ok.");
			});
		}
		this.wait(4000);

	},

	// Check that error are propagated: Create a dedicated worker which will also invoke an erroneous dedicated worker.
	// Because the "direct" child doesn't define an error handler, the error will be propagated to its parent.
	testDedicatedWorkerErrorPropagation: function() {
		var myDedicatedWorker = new Worker('errorPropagatorDedicatedWorker.js');
		var test = this;
		myDedicatedWorker.onerror = function(event) {
			// Error has been propagated.
			test.resume(function() {});
		}
		this.wait(1000);

	},

	// If a "child" dedicated worker handles an error, it is not to be propagated to its "parent".
	// ** Specification is quite unclear, need more thinking and checking. **
	testDedicatedWorkerErrorCatching: function() {
		var myDedicatedWorker = new Worker('errorCatcherDedicatedWorker.js');
		var test = this;
		var hasPropagated = false;
		myDedicatedWorker.onerror = function(event) {
			// Error has been propagated.

			hasPropagated = true;

		}
		this.wait(function() {
			Y.Assert.isTrue(!hasPropagated);

		}, 1000);
	},

	// Check if SharedWorker() constructor is available.
	testIsSharedWorkerAvailable: function() {
		Y.Assert.isObject(SharedWorker);

	},
	// Check shared worker constructor.
	testSharedWorkerContructor: function() {

		var mySharedWorker = new SharedWorker("doNothingWorker.js");

		Y.Assert.isObject(mySharedWorker);

	},
	// Check shared worker proxy object.
	testSharedWorkerProxyObject: function() {

		var mySharedWorker = new SharedWorker("doNothingWorker.js");
		// onerror and port.onmessage are user defined attributes.

		Y.Assert.isObject(mySharedWorker.port.postMessage);
	},
	// Check message exchange between with a shared worker.
	testSharedWorkerMessaging: function() {
		var mySharedWorker = new SharedWorker("pingPongSharedWorker.js");
		var test = this;
		mySharedWorker.port.onmessage = function(event) {

			test.resume(function() {
				Y.Assert.areEqual("test", event.data);
			});
		}
		mySharedWorker.port.postMessage("test");
		this.wait(1000);

	}

};