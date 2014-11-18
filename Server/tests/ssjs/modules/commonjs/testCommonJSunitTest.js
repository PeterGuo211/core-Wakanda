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
var exports = exports || {};
var module = module || (require.main = {});
var myTestResult = [];
var assert = require('assert');

function makeBlock(f) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        return f.apply(this, args);
    }
}

//*****************************//
// UnitTest with CommonJS Start
//*****************************//
//*****************************//
exports['test AssertionError instanceof Error'] = function() {
    assert.ok(new assert.AssertionError({}) instanceof Error);
};

exports['test ok false'] = function() {
    assert['throws'](makeBlock(assert.ok, false), assert.AssertionError);
};

exports['test ok(true)'] = makeBlock(assert.ok, true);
exports['test ok("test")'] = makeBlock(assert.ok, "test");
exports['test equal true false'] = function() {
    assert['throws'](makeBlock(assert.equal, true, false), assert.AssertionError, 'equal');
};

exports['test equal null null'] = makeBlock(assert.equal, null, null);
exports['test equal undefined undefined'] = makeBlock(assert.equal, undefined, undefined);
exports['test equal null undefined'] = makeBlock(assert.equal, null, undefined);
exports['test equal 2 "2"'] = makeBlock(assert.equal, 2, "2");
exports['test equal "2" 2'] = makeBlock(assert.equal, "2", 2);
exports['test equal true true'] = makeBlock(assert.equal, true, true);
exports['test notEqual true false'] = makeBlock(assert.notEqual, true, false);
exports['test notEqual true true'] = function() {
    assert['throws'](makeBlock(assert.notEqual, true, true), assert.AssertionError, 'notEqual');
};
exports['test strictEqual 2 "2"'] = function() {
    assert['throws'](makeBlock(assert.strictEqual, 2, "2"), assert.AssertionError, 'strictEqual');
};
exports['test strictEqual null undefined'] = function() {
    assert['throws'](makeBlock(assert.strictEqual, null, undefined), assert.AssertionError, 'strictEqual');
};
exports['test notStrictEqual 2 "2"'] = makeBlock(assert.notStrictEqual, 2, "2");

//deepEquals
//7.2
exports['test 7.2 deepEqual date'] = makeBlock(assert.deepEqual, new Date(2000, 3, 14), new Date(2000, 3, 14));
exports['test 7.2 deepEqual date negative'] = function() {
    assert['throws'](makeBlock(assert.deepEqual, new Date(), new Date(2000, 3, 14)), assert.AssertionError, 'deepEqual date');
};

//7.3
exports['test 7.3 deepEqual 4 "4"'] = makeBlock(assert.deepEqual, 4, "4");
exports['test 7.3 deepEqual "4" 4'] = makeBlock(assert.deepEqual, "4", 4);
exports['test 7.3 deepEqual true 1'] = makeBlock(assert.deepEqual, true, 1);
exports['test 7.3 deepEqual 4 "5"'] = function() {
    assert['throws'](makeBlock(assert.deepEqual, 4, "5"));
};

//7.4
// having the same number of owned properties && the same set of keys
exports['test 7.4 deepEqual {a:4} {a:4}'] = makeBlock(assert.deepEqual, {
    a: 4
}, {
    a: 4
});
exports['test 7.4 deepEqual {a:4,b:"2"} {a:4,b:"2"}'] = makeBlock(assert.deepEqual, {
    a: 4,
    b: "2"
}, {
    a: 4,
    b: "2"
});
exports['test 7.4 deepEqual [4] ["4"]'] = makeBlock(assert.deepEqual, [4], ["4"]);
exports['test 7.4 deepEqual {a:4} {a:4,b:true}'] = function() {
    assert['throws'](makeBlock(assert.deepEqual, {
        a: 4
    }, {
        a: 4,
        b: true
    }), assert.AssertionError);
};

exports['test deepEqual ["a"], {0:"a"}'] = makeBlock(assert.deepEqual, ["a"], {
    0: "a"
});
//(although not necessarily the same order),
exports['test deepEqual {a:4,b:"1"} {b:"1",a:4}'] = makeBlock(assert.deepEqual, {
    a: 4,
    b: "1"
}, {
    b: "1",
    a: 4
});

exports['test deepEqual arrays with non-numeric properties'] = function() {
    var a1 = [1, 2, 3];
    var a2 = [1, 2, 3];
    a1.a = "test";
    a1.b = true;
    a2.b = true;
    a2.a = "test"
    assert['throws'](makeBlock(assert.deepEqual, Object.keys(a1), Object.keys(a2)), assert.AssertionError);
    makeBlock(assert.deepEqual, a1, a2);
};

exports['test deepEqual identical prototype'] = function() {
    // having an identical prototype property
    var nbRoot = {
        toString: function() {
            return this.first + ' ' + this.last;
        }
    }
    var nameBuilder = function(first, last) {
            this.first = first;
            this.last = last;
            return this;
        }
    nameBuilder.prototype = nbRoot;
    var nameBuilder2 = function(first, last) {
            this.first = first;
            this.last = last;
            return this;
        }
    nameBuilder2.prototype = nbRoot;
    var nb1 = new nameBuilder('Ryan', 'Dahl');
    var nb2 = new nameBuilder2('Ryan', 'Dahl');

    assert.deepEqual(nb1, nb2);

    nameBuilder2.prototype = Object;
    nb2 = new nameBuilder2('Ryan', 'Dahl');
    assert['throws'](makeBlock(assert.deepEqual, nb1, nb2), assert.AssertionError);

};

exports['test notDeepEqual "a" {}'] = function() {
    assert['throws'](makeBlock(assert.deepEqual, 'a', {}), assert.AssertionError);
};

exports['test deepEqual "" ""'] = function() {
    assert.deepEqual("", "");
};

//exports['test deepEqual "" [""]'] = function() {
//    assert['throws'](makeBlock(assert.deepEqual, '', ['']), assert.AssertionError);
//};

exports['test deepEqual [""] [""]'] = function() {
    assert.deepEqual([""], [""]);
};

exports['test throw AssertionError'] = function() {

    //Testing the throwing
    function thrower(errorConstructor) {
        throw new errorConstructor('test');
    }
    var aethrow = makeBlock(thrower, assert.AssertionError);
    var aethrow = makeBlock(thrower, assert.AssertionError);
    //the basic calls work
    assert['throws'](makeBlock(thrower, assert.AssertionError), assert.AssertionError, 'message');
    assert['throws'](makeBlock(thrower, assert.AssertionError), assert.AssertionError);
    assert['throws'](makeBlock(thrower, assert.AssertionError));
    //if not passing an error, catch all.
    assert['throws'](makeBlock(thrower, TypeError));
    //when passing a type, only catch errors of the appropriate type
    var threw = false;
    try {
        assert['throws'](makeBlock(thrower, TypeError), assert.AssertionError);
    }
    catch (e) {
        threw = true;
        assert.ok(e instanceof TypeError, 'type');
    }
    assert.ok(threw, 'assert.throws with an explicit error is eating extra errors', assert.AssertionError);
    threw = false;

};

exports.run = function run() {
    return {
        nbFails: require("test").run(exports),
        output: require("test").output
    };
};

if (module == require.main) {
    myTestResult = exports.run();
}

//*****************************//
// UnitTest with CommonJS End
//*****************************//
//*****************************//
var testCase = {

    name: "test of the commonJS Unit Testing/1.0 ",

    _should: {
        error: {


        },
        ignore: {

        }
    },

    /*
     * Sets up data that is needed by each test.
     */

    setUp: function() {
        exceptions = 0;

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

    tearDown: function() {

    }

    /*
     *
     * Test methods for the Modules SSJS CommonJS Unit Testing/1.0
     *
     */

};

for (var i = 0; i < (myTestResult.output.length - 1); i++) {
    testCase['testCommonJSunitTest_' + i] = function() {
        var myTestResultStr = myTestResult.output.pop();
        var myTestResultTest = myTestResultStr.substr(0, 4);

    	console.log("myTestResultTest : " + myTestResultTest);
    	console.log("myTestResultStr : " + myTestResultStr);

        Y.Assert.areEqual("PASS", myTestResultTest);
    };
}

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