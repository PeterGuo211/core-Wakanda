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
// EventEmitter interface implementation, compatible with NodeJS.
// http://nodejs.org/docs/v0.5.1/api/events.html

// For this test, net.Socket objects are used. They implement the EventEmitter interface.
// All other objects use the same C++ code, so testing this way should be accurate.

var testCase = {

    name: 'EventEmitter Test',

    _should: {

        ignore: {

        }

    },

    // Set everything up so we can have some net.Socket instances.

    setUp: function() {

        // TODO: Replace "requireNative()" with "require()" when possible.

        this.net = requireNative('net');    

    },

    getEventEmitter: function() {

        Y.Assert.isObject(this.net);

        var socket = new this.net.Socket();

        Y.Assert.isObject(socket);

        return socket;

    },

    // Check if we can get at least an EventEmitter object. 

    testIsPossibleToRunTest: function() {

        var eventEmitter = this.getEventEmitter()

        Y.Assert.isObject(eventEmitter);

    },

    // Check EventEmitter attributes.

    testAttributes: function() {

        var eventEmitter = this.getEventEmitter();

        Y.Assert.isObject(eventEmitter.addListener);
        Y.Assert.isObject(eventEmitter.on);
        Y.Assert.isObject(eventEmitter.once);
        Y.Assert.isObject(eventEmitter.removeListener);
        Y.Assert.isObject(eventEmitter.removeAllListeners);
        Y.Assert.isObject(eventEmitter.setMaxListeners);
        Y.Assert.isObject(eventEmitter.listeners);
        Y.Assert.isObject(eventEmitter.emit);

    },

    // Check basic functionnality, add two listeners then check they're called FIFO.
    // Also check only asked event is triggered.

    testCheckBasicFunctionality: function() {

        var eventEmitter = this.getEventEmitter();

        var eventName = 'testEvent';
        var x = 0;                        // For call ordering check.
        var val1 = 123;
        var val2 = "abc";

        eventEmitter.addListener(eventName, function(arg1, arg2) {

            Y.Assert.isTrue(arg1 == val1);
            Y.Assert.isTrue(arg2 == val2);

            Y.Assert.isTrue(x == 0);
            x = 1;

        });

        // on() is just an alias of addListener().

        eventEmitter.on(eventName, function(arg1, arg2) {

            Y.Assert.isTrue(arg1 == val1);
            Y.Assert.isTrue(arg2 == val2);

            Y.Assert.isTrue(x == 1);
            x = 2;

        });

        eventEmitter.addListener(eventName + 'is a different name', function() {

            // This callback should never be called.

            Y.Assert.isTrue(false);

        });

        eventEmitter.emit(eventName, val1, val2);

    },

    // A callback can be set-up to be called once only.

    testCheckOnce: function() {

        var eventEmitter = this.getEventEmitter();

        var eventName = 'testEvent';
        var x = 0;

        eventEmitter.once(eventName, function() {

            // Assert will fail if called more than once.

            Y.Assert.isTrue(x == 0);
            x = 1;

        });

        eventEmitter.emit(eventName);
        eventEmitter.emit(eventName);

    },

    // Check listener adding and removal.

    testCheckListenerRemoval: function() {

        var eventEmitter = this.getEventEmitter();

        var eventName = 'testEvent';
        var x = 0;

        var callOnce = function() {

            // Will fail if called more than once.

            Y.Assert.isTrue(x == 0);
            x = 1;

        };

        var neverToBeCalled = function() {

            Y.Assert.isTrue(false);

        };

        eventEmitter.addListener(eventName, callOnce);
        eventEmitter.addListener(eventName, neverToBeCalled);

        // It is possible to add a same function several times!

        eventEmitter.addListener(eventName, callOnce);

        eventEmitter.removeListener(eventName, neverToBeCalled);
        eventEmitter.removeListener(eventName, callOnce);

        // It is possible to remove an already removed function several times!

        eventEmitter.removeListener(eventName, neverToBeCalled);

        // Or even a function that has not been added.

        eventEmitter.removeListener(eventName, function() { });

        eventEmitter.emit(eventName);

        Y.Assert.isTrue(x == 1);   // Check callOnce() has been called.

    },

    // Check removeAllListeners() and listeners() function.

    testCheckRemoveAllAndList: function() {

        var eventEmitter = this.getEventEmitter();

        var eventName1 = 'testEvent1';
        var eventName2 = 'testEvent2';
        var eventName3 = 'testEvent3';
        var hasBeenCalled = false;

        var neverToBeCalled1 = function() {

            Y.Assert.isTrue(false);

        };

        var neverToBeCalled2 = function() {

            Y.Assert.isTrue(false);

        };

        var shouldBeCalled = function() {

            hasBeenCalled = true;

        };

        eventEmitter.addListener(eventName1, neverToBeCalled1);
        eventEmitter.addListener(eventName1, neverToBeCalled2);

        eventEmitter.addListener(eventName2, shouldBeCalled);

        eventEmitter.addListener(eventName3, neverToBeCalled1);
        eventEmitter.addListener(eventName3, neverToBeCalled2);

        // Check that returned array of listeners is complete.

        var listeners = eventEmitter.listeners(eventName1);
        var i, n;

        Y.Assert.isTrue(listeners.length == 2);
        for (i = 0, n = 0; i < listeners.length; i++)

            if (listeners[i] == neverToBeCalled1)

            n++;

        else if (listeners[i] == neverToBeCalled2)

            n++;

        Y.Assert.isTrue(n == 2);

        // Should not call any callback.

        eventEmitter.removeAllListeners(eventName1);
        eventEmitter.emit(eventName1);

        // Will call shouldBeCalled().

        eventEmitter.emit(eventName2);
        Y.Assert.isTrue(hasBeenCalled == true);

        // Without event name, removeAllListeners() remove all listeners for all events.

        eventEmitter.removeAllListeners();
        
        listeners = eventEmitter.listeners(eventName1);
        Y.Assert.isTrue(listeners.length == 0);
        listeners = eventEmitter.listeners(eventName2);
        Y.Assert.isTrue(listeners.length == 0);
        listeners = eventEmitter.listeners(eventName3);
        Y.Assert.isTrue(listeners.length == 0);    

        eventEmitter.emit(eventName1);

        hasBeenCalled = false;
        eventEmitter.emit(eventName2);
        Y.Assert.isFalse(hasBeenCalled);

        eventEmitter.emit(eventName3);

    },

    // No test for setMaxListeners(), current implementation does nothing with it. 
    // Nor does NodeJS check the set limit.

};

// require("unitTest").run(testCase).getReport();