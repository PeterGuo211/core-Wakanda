(function (exportObject)
{
    var debug = false;
    // default timeout is 5 seconds, test can override if needed
    var settings = {
      output:true,
      timeout:5000,
      test_timeout:2000
    };

    /*
     * API functions
     */

    function test(func, name, properties)
    {
        var test_name = name ? name : "Noname Sync Test";
        properties = properties ? properties : {};
        var test_obj = new Test(test_name, properties);
        test_obj.step(func);
        if (test_obj.status === test_obj.NOTRUN) {
            test_obj.done();
        }
    }

    function async_test(func, name, properties)
    {
        if (typeof func !== "function") {
            properties = name;
            name = func;
            func = null;
        }
        var test_name = name ? name : "Noname Async Test";
        properties = properties ? properties : {};
        var test_obj = new Test(test_name, properties);
        if (func) {
            test_obj.step(func, test_obj, test_obj);
        }
        return test_obj;
    }

    function setup(func_or_properties, maybe_properties)
    {
        var func = null;
        var properties = {};
        if (arguments.length === 2) {
            func = func_or_properties;
            properties = maybe_properties;
        } else if (func_or_properties instanceof Function){
            func = func_or_properties;
        } else {
            properties = func_or_properties;
        }
        tests.setup(func, properties);
        output.setup(properties);
    }

    function done() {
		tests.all_loaded = true;
		tests.end_wait();
    }

    function generate_tests(func, args, properties) {
        forEach(args, function(x, i)
                {
                    var name = x[0];
                    test(function()
                         {
                             func.apply(this, x.slice(1));
                         },
                         name,
                         Array.isArray(properties) ? properties[i] : properties);
                });
    }

    expose(test, 'test');
    expose(async_test, 'async_test');
    expose(generate_tests, 'generate_tests');
    expose(setup, 'setup');
    expose(done, 'done');

    /*
     * Return a string truncated to the given length, with ... added at the end
     * if it was longer.
     */
    function truncate(s, len)
    {
        if (s.length > len) {
            return s.substring(0, len - 3) + "...";
        }
        return s;
    }

    /*
     * Convert a value to a nice, human-readable string
     */
    function format_value(val, seen)
    {
	if (!seen) {
	    seen = [];
        }
        if (typeof val === "object" && val !== null)
        {
            if (seen.indexOf(val) >= 0)
            {
                return "[...]";
            }
	    seen.push(val);
        }
        if (Array.isArray(val))
        {
            return "[" + val.map(function(x) {return format_value(x, seen)}).join(", ") + "]";
        }

        switch (typeof val)
        {
        case "string":
            val = val.replace("\\", "\\\\");
            for (var i = 0; i < 32; i++)
            {
                var replace = "\\";
                switch (i) {
                case 0: replace += "0"; break;
                case 1: replace += "x01"; break;
                case 2: replace += "x02"; break;
                case 3: replace += "x03"; break;
                case 4: replace += "x04"; break;
                case 5: replace += "x05"; break;
                case 6: replace += "x06"; break;
                case 7: replace += "x07"; break;
                case 8: replace += "b"; break;
                case 9: replace += "t"; break;
                case 10: replace += "n"; break;
                case 11: replace += "v"; break;
                case 12: replace += "f"; break;
                case 13: replace += "r"; break;
                case 14: replace += "x0e"; break;
                case 15: replace += "x0f"; break;
                case 16: replace += "x10"; break;
                case 17: replace += "x11"; break;
                case 18: replace += "x12"; break;
                case 19: replace += "x13"; break;
                case 20: replace += "x14"; break;
                case 21: replace += "x15"; break;
                case 22: replace += "x16"; break;
                case 23: replace += "x17"; break;
                case 24: replace += "x18"; break;
                case 25: replace += "x19"; break;
                case 26: replace += "x1a"; break;
                case 27: replace += "x1b"; break;
                case 28: replace += "x1c"; break;
                case 29: replace += "x1d"; break;
                case 30: replace += "x1e"; break;
                case 31: replace += "x1f"; break;
                }
                val = val.replace(RegExp(String.fromCharCode(i), "g"), replace);
            }
            return '"' + val.replace(/"/g, '\\"') + '"';
        case "boolean":
        case "undefined":
            return String(val);
        case "number":
            // In JavaScript, -0 === 0 and String(-0) == "0", so we have to
            // special-case.
            if (val === -0 && 1/val === -Infinity)
            {
                return "-0";
            }
            return String(val);
        case "object":
            if (val === null)
            {
                return "null";
            }

            // Fall through to default
        default:
            return typeof val + ' "' + truncate(String(val), 60) + '"';
        }
    }
    expose(format_value, "format_value");

    /*
     * Assertions
     */

    function assert_true(actual, description)
    {
        assert(actual === true, "assert_true", description,
                                "expected true got ${actual}", {actual:actual});
    };
    expose(assert_true, "assert_true");

    function assert_false(actual, description)
    {
        assert(actual === false, "assert_false", description,
                                 "expected false got ${actual}", {actual:actual});
    };
    expose(assert_false, "assert_false");

    function same_value(x, y) {
        if (y !== y)
        {
            //NaN case
            return x !== x;
        }
        else if (x === 0 && y === 0) {
            //Distinguish +0 and -0
            return 1/x === 1/y;
        }
        else
        {
            //typical case
            return x === y;
        }
    }

    function assert_equals(actual, expected, description)
    {
         /*
          * Test if two primitives are equal or two objects
          * are the same object
          */
        if (typeof actual != typeof expected)
        {
            assert(false, "assert_equals", description,
                          "expected (" + typeof expected + ") ${expected} but got (" + typeof actual + ") ${actual}",
                          {expected:expected, actual:actual});
            return;
        }
        assert(same_value(actual, expected), "assert_equals", description,
                                             "expected ${expected} but got ${actual}",
                                             {expected:expected, actual:actual});
    };
    expose(assert_equals, "assert_equals");

    function assert_not_equals(actual, expected, description)
    {
         /*
          * Test if two primitives are unequal or two objects
          * are different objects
          */
        assert(!same_value(actual, expected), "assert_not_equals", description,
                                              "got disallowed value ${actual}",
                                              {actual:actual});
    };
    expose(assert_not_equals, "assert_not_equals");

    function assert_in_array(actual, expected, description)
    {
        assert(expected.indexOf(actual) != -1, "assert_in_array", description,
                                               "value ${actual} not in array ${expected}",
                                               {actual:actual, expected:expected});
    }
    expose(assert_in_array, "assert_in_array");

    function assert_object_equals(actual, expected, description)
    {
         //This needs to be improved a great deal
         function check_equal(actual, expected, stack)
         {
             stack.push(actual);

             var p;
             for (p in actual)
             {
                 assert(expected.hasOwnProperty(p), "assert_object_equals", description,
                                                    "unexpected property ${p}", {p:p});

                 if (typeof actual[p] === "object" && actual[p] !== null)
                 {
                     if (stack.indexOf(actual[p]) === -1)
                     {
                         check_equal(actual[p], expected[p], stack);
                     }
                 }
                 else
                 {
                     assert(same_value(actual[p], expected[p]), "assert_object_equals", description,
                                                       "property ${p} expected ${expected} got ${actual}",
                                                       {p:p, expected:expected, actual:actual});
                 }
             }
             for (p in expected)
             {
                 assert(actual.hasOwnProperty(p),
                        "assert_object_equals", description,
                        "expected property ${p} missing", {p:p});
             }
             stack.pop();
         }
         check_equal(actual, expected, []);
    };
    expose(assert_object_equals, "assert_object_equals");

    function assert_array_equals(actual, expected, description)
    {
        assert(actual.length === expected.length,
               "assert_array_equals", description,
               "lengths differ, expected ${expected} got ${actual}",
               {expected:expected.length, actual:actual.length});

        for (var i=0; i < actual.length; i++)
        {
            assert(actual.hasOwnProperty(i) === expected.hasOwnProperty(i),
                   "assert_array_equals", description,
                   "property ${i}, property expected to be $expected but was $actual",
                   {i:i, expected:expected.hasOwnProperty(i) ? "present" : "missing",
                   actual:actual.hasOwnProperty(i) ? "present" : "missing"});
            assert(same_value(expected[i], actual[i]),
                   "assert_array_equals", description,
                   "property ${i}, expected ${expected} but got ${actual}",
                   {i:i, expected:expected[i], actual:actual[i]});
        }
    }
    expose(assert_array_equals, "assert_array_equals");

    function assert_approx_equals(actual, expected, epsilon, description)
    {
        /*
         * Test if two primitive numbers are equal withing +/- epsilon
         */
        assert(typeof actual === "number",
               "assert_approx_equals", description,
               "expected a number but got a ${type_actual}",
               {type_actual:typeof actual});

        assert(Math.abs(actual - expected) <= epsilon,
               "assert_approx_equals", description,
               "expected ${expected} +/- ${epsilon} but got ${actual}",
               {expected:expected, actual:actual, epsilon:epsilon});
    };
    expose(assert_approx_equals, "assert_approx_equals");

    function assert_less_than(actual, expected, description)
    {
        /*
         * Test if a primitive number is less than another
         */
        assert(typeof actual === "number",
               "assert_less_than", description,
               "expected a number but got a ${type_actual}",
               {type_actual:typeof actual});

        assert(actual < expected,
               "assert_less_than", description,
               "expected a number less than ${expected} but got ${actual}",
               {expected:expected, actual:actual});
    };
    expose(assert_less_than, "assert_less_than");

    function assert_greater_than(actual, expected, description)
    {
        /*
         * Test if a primitive number is greater than another
         */
        assert(typeof actual === "number",
               "assert_greater_than", description,
               "expected a number but got a ${type_actual}",
               {type_actual:typeof actual});

        assert(actual > expected,
               "assert_greater_than", description,
               "expected a number greater than ${expected} but got ${actual}",
               {expected:expected, actual:actual});
    };
    expose(assert_greater_than, "assert_greater_than");

    function assert_less_than_equal(actual, expected, description)
    {
        /*
         * Test if a primitive number is less than or equal to another
         */
        assert(typeof actual === "number",
               "assert_less_than_equal", description,
               "expected a number but got a ${type_actual}",
               {type_actual:typeof actual});

        assert(actual <= expected,
               "assert_less_than", description,
               "expected a number less than or equal to ${expected} but got ${actual}",
               {expected:expected, actual:actual});
    };
    expose(assert_less_than_equal, "assert_less_than_equal");

    function assert_greater_than_equal(actual, expected, description)
    {
        /*
         * Test if a primitive number is greater than or equal to another
         */
        assert(typeof actual === "number",
               "assert_greater_than_equal", description,
               "expected a number but got a ${type_actual}",
               {type_actual:typeof actual});

        assert(actual >= expected,
               "assert_greater_than_equal", description,
               "expected a number greater than or equal to ${expected} but got ${actual}",
               {expected:expected, actual:actual});
    };
    expose(assert_greater_than_equal, "assert_greater_than_equal");

    function assert_regexp_match(actual, expected, description) {
        /*
         * Test if a string (actual) matches a regexp (expected)
         */
        assert(expected.test(actual),
               "assert_regexp_match", description,
               "expected ${expected} but got ${actual}",
               {expected:expected, actual:actual});
    }
    expose(assert_regexp_match, "assert_regexp_match");

    function assert_class_string(object, class_string, description) {
        assert_equals({}.toString.call(object), "[object " + class_string + "]",
                      description);
    }
    expose(assert_class_string, "assert_class_string");


    function _assert_own_property(name) {
        return function(object, property_name, description)
        {
            assert(object.hasOwnProperty(property_name),
                   name, description,
                   "expected property ${p} missing", {p:property_name});
        };
    }
    expose(_assert_own_property("assert_exists"), "assert_exists");
    expose(_assert_own_property("assert_own_property"), "assert_own_property");

    function assert_not_exists(object, property_name, description)
    {
        assert(!object.hasOwnProperty(property_name),
               "assert_not_exists", description,
               "unexpected property ${p} found", {p:property_name});
    };
    expose(assert_not_exists, "assert_not_exists");

    function _assert_inherits(name) {
        return function (object, property_name, description)
        {
            assert(typeof object === "object",
                   name, description,
                   "provided value is not an object");

            assert("hasOwnProperty" in object,
                   name, description,
                   "provided value is an object but has no hasOwnProperty method");

            assert(!object.hasOwnProperty(property_name),
                   name, description,
                   "property ${p} found on object expected in prototype chain",
                   {p:property_name});

            assert(property_name in object,
                   name, description,
                   "property ${p} not found in prototype chain",
                   {p:property_name});
        };
    }
    expose(_assert_inherits("assert_inherits"), "assert_inherits");
    expose(_assert_inherits("assert_idl_attribute"), "assert_idl_attribute");

    function assert_readonly(object, property_name, description)
    {
         var initial_value = object[property_name];
         try {
             //Note that this can have side effects in the case where
             //the property has PutForwards
             object[property_name] = initial_value + "a"; //XXX use some other value here?
             assert(same_value(object[property_name], initial_value),
                    "assert_readonly", description,
                    "changing property ${p} succeeded",
                    {p:property_name});
         }
         finally
         {
             object[property_name] = initial_value;
         }
    };
    expose(assert_readonly, "assert_readonly");

    function assert_throws(code, func, description)
    {
        try
        {
            func.call(this);
            assert(false, "assert_throws", description,
                   "${func} did not throw", {func:func});
        }
        catch(e)
        {
            if (e instanceof AssertionError) {
                throw(e);
            }
            if (code === null)
            {
                return;
            }
            if (typeof code === "object")
            {
                assert(typeof e == "object" && "name" in e && e.name == code.name,
                       "assert_throws", description,
                       "${func} threw ${actual} (${actual_name}) expected ${expected} (${expected_name})",
                                    {func:func, actual:e, actual_name:e.name,
                                     expected:code,
                                     expected_name:code.name});
                return;
            }

            var code_name_map = {
                INDEX_SIZE_ERR: 'IndexSizeError',
                HIERARCHY_REQUEST_ERR: 'HierarchyRequestError',
                WRONG_DOCUMENT_ERR: 'WrongDocumentError',
                INVALID_CHARACTER_ERR: 'InvalidCharacterError',
                NO_MODIFICATION_ALLOWED_ERR: 'NoModificationAllowedError',
                NOT_FOUND_ERR: 'NotFoundError',
                NOT_SUPPORTED_ERR: 'NotSupportedError',
                INVALID_STATE_ERR: 'InvalidStateError',
                SYNTAX_ERR: 'SyntaxError',
                INVALID_MODIFICATION_ERR: 'InvalidModificationError',
                NAMESPACE_ERR: 'NamespaceError',
                INVALID_ACCESS_ERR: 'InvalidAccessError',
                TYPE_MISMATCH_ERR: 'TypeMismatchError',
                SECURITY_ERR: 'SecurityError',
                NETWORK_ERR: 'NetworkError',
                ABORT_ERR: 'AbortError',
                URL_MISMATCH_ERR: 'URLMismatchError',
                QUOTA_EXCEEDED_ERR: 'QuotaExceededError',
                TIMEOUT_ERR: 'TimeoutError',
                INVALID_NODE_TYPE_ERR: 'InvalidNodeTypeError',
                DATA_CLONE_ERR: 'DataCloneError'
            };

            var name = code in code_name_map ? code_name_map[code] : code;

            var name_code_map = {
                IndexSizeError: 1,
                HierarchyRequestError: 3,
                WrongDocumentError: 4,
                InvalidCharacterError: 5,
                NoModificationAllowedError: 7,
                NotFoundError: 8,
                NotSupportedError: 9,
                InvalidStateError: 11,
                SyntaxError: 12,
                InvalidModificationError: 13,
                NamespaceError: 14,
                InvalidAccessError: 15,
                TypeMismatchError: 17,
                SecurityError: 18,
                NetworkError: 19,
                AbortError: 20,
                URLMismatchError: 21,
                QuotaExceededError: 22,
                TimeoutError: 23,
                InvalidNodeTypeError: 24,
                DataCloneError: 25,

                UnknownError: 0,
                ConstraintError: 0,
                DataError: 0,
                TransactionInactiveError: 0,
                ReadOnlyError: 0,
                VersionError: 0
            };

            if (!(name in name_code_map))
            {
                throw new AssertionError('Test bug: unrecognized DOMException code "' + code + '" passed to assert_throws()');
            }

            var required_props = { code: name_code_map[name] };

            if (required_props.code === 0
            || ("name" in e && e.name !== e.name.toUpperCase() && e.name !== "DOMException"))
            {
                // New style exception: also test the name property.
                required_props.name = name;
            }

            //We'd like to test that e instanceof the appropriate interface,
            //but we can't, because we don't know what window it was created
            //in.  It might be an instanceof the appropriate interface on some
            //unknown other window.  TODO: Work around this somehow?

            assert(typeof e == "object",
                   "assert_throws", description,
                   "${func} threw ${e} with type ${type}, not an object",
                   {func:func, e:e, type:typeof e});

            for (var prop in required_props)
            {
                assert(typeof e == "object" && prop in e && e[prop] == required_props[prop],
                       "assert_throws", description,
                       "${func} threw ${e} that is not a DOMException " + code + ": property ${prop} is equal to ${actual}, expected ${expected}",
                       {func:func, e:e, prop:prop, actual:e[prop], expected:required_props[prop]});
            }
        }
    }
    expose(assert_throws, "assert_throws");

    function assert_unreached(description) {
         assert(false, "assert_unreached", description,
                "Reached unreachable code");
    }
    expose(assert_unreached, "assert_unreached");

    function assert_any(assert_func, actual, expected_array)
    {
        var args = [].slice.call(arguments, 3)
        var errors = []
        var passed = false;
        forEach(expected_array,
                function(expected)
                {
                    try {
                        assert_func.apply(this, [actual, expected].concat(args))
                        passed = true;
                    } catch(e) {
                        errors.push(e.message);
                    }
                });
        if (!passed) {
            throw new AssertionError(errors.join("\n\n"));
        }
    }
    expose(assert_any, "assert_any");

    function Test(name, properties)
    {
        this.name = name;
        this.status = this.NOTRUN;
        this.timeout_id = null;
        this.is_done = false;

        this.properties = properties;
        this.timeout_length = properties.timeout ? properties.timeout : settings.test_timeout;

        this.message = null;

        var this_obj = this;
        this.steps = [];

        tests.push(this);
    }

    Test.statuses = {
        PASS:0,
        FAIL:1,
        TIMEOUT:2,
        NOTRUN:3
    };

    Test.prototype = merge({}, Test.statuses);

    Test.prototype.structured_clone = function()
    {
        if(!this._structured_clone)
        {
            var msg = this.message;
            msg = msg ? String(msg) : msg;
            this._structured_clone = merge({
                name:String(this.name),
                status:this.status,
                message:msg
            }, Test.statuses);
        }
        return this._structured_clone;
    };

    Test.prototype.step = function(func, this_obj)
    {
        //In case the test has already failed
        if (this.status !== this.NOTRUN)
        {
          return;
        }

        tests.started = true;

        if (this.timeout_id === null) {
            this.set_timeout();
        }

        this.steps.push(func);

        if (arguments.length === 1)
        {
            this_obj = this;
        }

        try
        {
            return func.apply(this_obj, Array.prototype.slice.call(arguments, 2));
        }
        catch(e)
        {
            //This can happen if something called synchronously invoked another
            //step
            if (this.status !== this.NOTRUN)
            {
                return;
            }
            this.status = this.FAIL;
            this.message = (typeof e === "object" && e !== null) ? e.message : e;
            if (typeof e.stack != "undefined" && typeof e.message == "string") {
                //Try to make it more informative for some exceptions, at least
                //in Gecko and WebKit.  This results in a stack dump instead of
                //just errors like "Cannot read property 'parentNode' of null"
                //or "root is null".  Makes it a lot longer, of course.
                this.message += "(stack: " + e.stack + ")";
            }
            this.done();
            if (debug && e.constructor !== AssertionError) {
                throw e;
            }
        }
    };

    Test.prototype.step_func = function(func, this_obj)
    {
        var test_this = this;

        if (arguments.length === 1)
        {
            this_obj = test_this;
        }

        return function()
        {
            test_this.step.apply(test_this, [func, this_obj].concat(
                Array.prototype.slice.call(arguments)));
        };
    };

    Test.prototype.step_func_done = function(func, this_obj)
    {
        var test_this = this;

        if (arguments.length === 1)
        {
            this_obj = test_this;
        }

        return function()
        {
            test_this.step.apply(test_this, [func, this_obj].concat(
                Array.prototype.slice.call(arguments)));
            test_this.done();
        };
    };

    Test.prototype.set_timeout = function()
    {
        var this_obj = this;
        this.timeout_id = setTimeout(function()
                                     {
                                         this_obj.timeout();
                                     }, this.timeout_length);
    };

    Test.prototype.timeout = function()
    {
        this.status = this.TIMEOUT;
        this.timeout_id = null;
        this.message = "Test timed out";
        this.done();
    };

    Test.prototype.done = function()
    {
        if (this.is_done) {
            return;
        }
        clearTimeout(this.timeout_id);
        if (this.status === this.NOTRUN)
        {
            this.status = this.PASS;
        }
        this.is_done = true;
        tests.result(this);
    };


    /*
     * Harness
     */

    function TestsStatus()
    {
        this.status = null;
        this.message = null;
    }

    TestsStatus.statuses = {
        OK:0,
        ERROR:1,
        TIMEOUT:2
    };

    TestsStatus.prototype = merge({}, TestsStatus.statuses);

    TestsStatus.prototype.structured_clone = function()
    {
        if(!this._structured_clone)
        {
            var msg = this.message;
            msg = msg ? String(msg) : msg;
            this._structured_clone = merge({
                status:this.status,
                message:msg
            }, TestsStatus.statuses);
        }
        return this._structured_clone;
    };

    function Tests()
    {
        this.tests = [];
        this.num_pending = 0;

        this.phases = {
            INITIAL:0,
            SETUP:1,
            HAVE_TESTS:2,
            HAVE_RESULTS:3,
            COMPLETE:4
        };
        this.phase = this.phases.INITIAL;

        this.properties = {};

        //All tests can't be done until the load event fires		
        this.all_loaded = false;
        this.wait_for_finish = false;
        this.processing_callbacks = false;

        this.allow_uncaught_exception = false;

        this.timeout_length = settings.timeout;
        this.timeout_id = null;

        this.start_callbacks = [];
        this.test_done_callbacks = [];
        this.all_done_callbacks = [];

        this.status = new TestsStatus();

        this.set_timeout();
    }

    Tests.prototype.setup = function(func, properties)
    {
        if (this.phase >= this.phases.HAVE_RESULTS)
        {
            return;
        }
        if (this.phase < this.phases.SETUP)
        {
            this.phase = this.phases.SETUP;
        }

        this.properties = properties;

        for (var p in properties)
        {
            if (properties.hasOwnProperty(p))
            {
                var value = properties[p]
                if (p == "timeout")
                {
                    this.timeout_length = value;
                }
                else if (p == "allow_uncaught_exception") {
                    this.allow_uncaught_exception = value;
                }
                else if (p == "explicit_done" && value)
                {
                    this.wait_for_finish = true;
                }
                else if (p == "explicit_timeout" && value) {
                    this.timeout_length = null;
                }
            }
        }

        if (func)
        {
            try
            {
                func();
            } catch(e)
            {
                this.status.status = this.status.ERROR;
                this.status.message = e;
            };
        }
        this.set_timeout();
    };

    Tests.prototype.set_timeout = function()
    {
        var this_obj = this;
        clearTimeout(this.timeout_id);
        if (this.timeout_length !== null)
        {
            this.timeout_id = setTimeout(function() {
                                             this_obj.timeout();
                                         }, this.timeout_length);
        }
    };

    Tests.prototype.timeout = function() {
        this.status.status = this.status.TIMEOUT;
        this.complete();
    };

    Tests.prototype.end_wait = function()
    {
        this.wait_for_finish = false;
        if (this.all_done()) {
            this.complete();
        }
    };

    Tests.prototype.push = function(test)
    {
        if (this.phase < this.phases.HAVE_TESTS) {
            this.start();
        }
        this.num_pending++;
        this.tests.push(test);
    };

    Tests.prototype.all_done = function() {
        return (this.all_loaded && this.num_pending === 0 &&
                !this.wait_for_finish && !this.processing_callbacks);
    };

    Tests.prototype.start = function() {
        this.phase = this.phases.HAVE_TESTS;
        this.notify_start();
    };

    Tests.prototype.notify_start = function() {
	    var this_obj = this;
        forEach (this.start_callbacks,
                 function(callback)
                 {
                     callback(this_obj.properties);
                 });
    };

    Tests.prototype.result = function(test)
    {
        if (this.phase > this.phases.HAVE_RESULTS)
        {
            return;
        }
        this.phase = this.phases.HAVE_RESULTS;
        this.num_pending--;
        this.notify_result(test);
    };

    Tests.prototype.notify_result = function(test) {
        var this_obj = this;
        this.processing_callbacks = true;
        forEach(this.test_done_callbacks,
                function(callback)
                {
                    callback(test, this_obj);
                });
        this.processing_callbacks = false;
        if (this_obj.all_done())
        {
            this_obj.complete();
        }		
    };

    Tests.prototype.complete = function() {
        if (this.phase === this.phases.COMPLETE) {
            return;
        }
        this.phase = this.phases.COMPLETE;
        var this_obj = this;
        this.tests.forEach(
            function(x)
            {
                if(x.status === x.NOTRUN)
                {
                    this_obj.notify_result(x);
                }
            }
        );
        this.notify_complete();
    };

    Tests.prototype.notify_complete = function()
    {
        clearTimeout(this.timeout_id);
        var this_obj = this;
        var tests = map(this_obj.tests,
                        function(test)
                        {
                            return test.structured_clone();
                        });
        if (this.status.status === null)
        {
            this.status.status = this.status.OK;
        }

        forEach (this.all_done_callbacks,
                 function(callback)
                 {
                     callback(this_obj.tests, this_obj.status);
                 });
    };

    var tests = new Tests();

    function timeout() {
        if (tests.timeout_length === null)
        {
            tests.timeout();
        }
    }
    expose(timeout, 'timeout');

    function add_start_callback(callback) {
        tests.start_callbacks.push(callback);
    }

    function add_result_callback(callback)
    {
        tests.test_done_callbacks.push(callback);
    }

    function add_completion_callback(callback)
    {
       tests.all_done_callbacks.push(callback);
    }

    expose(add_start_callback, 'add_start_callback');
    expose(add_result_callback, 'add_result_callback');
    expose(add_completion_callback, 'add_completion_callback');
	
	var status_text = {};
	
    status_text[Test.prototype.PASS] = "Pass";
    status_text[Test.prototype.FAIL] = "Fail";
    status_text[Test.prototype.TIMEOUT] = "Timeout";
    status_text[Test.prototype.NOTRUN] = "Not Run";
	
	expose(status_text, 'status_text');

    /*
     * Template code
     *
     * A template is just a javascript structure. An element is represented as:
     *
     * [tag_name, {attr_name:attr_value}, child1, child2]
     *
     * the children can either be strings (which act like text nodes), other templates or
     * functions (see below)
     *
     * A text node is represented as
     *
     * ["{text}", value]
     *
     * String values have a simple substitution syntax; ${foo} represents a variable foo.
     *
     * It is possible to embed logic in templates by using a function in a place where a
     * node would usually go. The function must either return part of a template or null.
     *
     * In cases where a set of nodes are required as output rather than a single node
     * with children it is possible to just use a list
     * [node1, node2, node3]
     *
     * Usage:
     *
     * render(template, substitutions) - take a template and an object mapping
     * variable names to parameters and return either a DOM node or a list of DOM nodes
     *
     * substitute(template, substitutions) - take a template and variable mapping object,
     * make the variable substitutions and return the substituted template
     *
     */

    function is_single_node(template)
    {
        return typeof template[0] === "string";
    }

    function substitute(template, substitutions)
    {
        if (typeof template === "function") {
            var replacement = template(substitutions);
            if (replacement)
            {
                var rv = substitute(replacement, substitutions);
                return rv;
            }
            else
            {
                return null;
            }
        }
        else if (is_single_node(template))
        {
            return substitute_single(template, substitutions);
        }
        else
        {
            return filter(map(template, function(x) {
                                  return substitute(x, substitutions);
                              }), function(x) {return x !== null;});
        }
    }

    function substitute_single(template, substitutions)
    {
        var substitution_re = /\${([^ }]*)}/g;

        function do_substitution(input) {
            var components = input.split(substitution_re);
            var rv = [];
            for (var i=0; i<components.length; i+=2)
            {
                rv.push(components[i]);
                if (components[i+1])
                {
                    rv.push(String(substitutions[components[i+1]]));
                }
            }
            return rv;
        }

        var rv = [];
        rv.push(do_substitution(String(template[0])).join(""));

        if (template[0] === "{text}") {
            substitute_children(template.slice(1), rv);
        } else {
            substitute_attrs(template[1], rv);
            substitute_children(template.slice(2), rv);
        }

        function substitute_attrs(attrs, rv)
        {
            rv[1] = {};
            for (var name in template[1])
            {
                if (attrs.hasOwnProperty(name))
                {
                    var new_name = do_substitution(name).join("");
                    var new_value = do_substitution(attrs[name]).join("");
                    rv[1][new_name] = new_value;
                };
            }
        }

        function substitute_children(children, rv)
        {
            for (var i=0; i<children.length; i++)
            {
                if (children[i] instanceof Object) {
                    var replacement = substitute(children[i], substitutions);
                    if (replacement !== null)
                    {
                        if (is_single_node(replacement))
                        {
                            rv.push(replacement);
                        }
                        else
                        {
                            extend(rv, replacement);
                        }
                    }
                }
                else
                {
                    extend(rv, do_substitution(String(children[i])));
                }
            }
            return rv;
        }

        return rv;
    }

    /*
     * Utility funcions
     */
	 
    function assert(expected_true, function_name, description, error, substitutions)
    {
        if (expected_true !== true)
        {
            throw new AssertionError(make_message(function_name, description,
                                                  error, substitutions));
        }
    }

    function AssertionError(message)
    {
        this.message = message;
    }

    function make_message(function_name, description, error, substitutions)
    {
        for (var p in substitutions) {
            if (substitutions.hasOwnProperty(p)) {
                substitutions[p] = format_value(substitutions[p]);
            }
        }
        var node_form = substitute(["{text}", "${function_name}: ${description}" + error],
                                   merge({function_name:function_name,
                                          description:(description?description + " ":"")},
                                          substitutions));
        return node_form.slice(1).join("");
    }

    function filter(array, callable, thisObj) {
        var rv = [];
        for (var i=0; i<array.length; i++)
        {
            if (array.hasOwnProperty(i))
            {
                var pass = callable.call(thisObj, array[i], i, array);
                if (pass) {
                    rv.push(array[i]);
                }
            }
        }
        return rv;
    }

    function map(array, callable, thisObj)
    {
        var rv = [];
        rv.length = array.length;
        for (var i=0; i<array.length; i++)
        {
            if (array.hasOwnProperty(i))
            {
                rv[i] = callable.call(thisObj, array[i], i, array);
            }
        }
        return rv;
    }

    function extend(array, items)
    {
        Array.prototype.push.apply(array, items);
    }

    function forEach (array, callback, thisObj)
    {
        for (var i=0; i<array.length; i++)
        {
            if (array.hasOwnProperty(i))
            {
                callback.call(thisObj, array[i], i, array);
            }
        }
    }

    function merge(a,b)
    {
        var rv = {};
        var p;
        for (p in a)
        {
            rv[p] = a[p];
        }
        for (p in b) {
            rv[p] = b[p];
        }
        return rv;
    }
	
    function expose(object, name)
    {
        var components = name.split(".");
        var target = exportObject;
        for (var i=0; i<components.length - 1; i++)
        {
            if (!(components[i] in target))
            {
                target[components[i]] = {};
            }
            target = target[components[i]];
        }
        target[components[components.length - 1]] = object;
    }
    
})(global);