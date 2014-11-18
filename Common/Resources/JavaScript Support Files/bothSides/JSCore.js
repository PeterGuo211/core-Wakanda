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
/**
 * The Squirrelfish Extreme provided interface
 *
 * @module JavaScriptCore
 * @see http://www.ecma-international.org/publications/standards/Ecma-262.htm
 * @see http://labs.trolltech.com/blogs/2010/01/15/ecmascript-5-and-webkitjavascriptcore/
 */

/**
 * The main Object class
 *
 * @ecmascript 1, 2, 3, 5
 * @javascript 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.8.1, 1.8.2, 1.9
 * @jscript 1.0, 2.0, 3.0, 4.0, 5.0, 5.1, 5.5, 5.6, 5.7, 5.8, 7.0, 7.1, 8.0
 *
 * @netscape 2.0, 3.0, 4.0, 4.05, 4.06, 4.07, 6.0
 * @ie 3.0, 4.0, 5.5, 6, 7, 8
 * @firefox 1.0, 1.5, 2.0, 3.0, 3.5, 3.6, 4
 * @opera 6.0, 7.0, 8.0, 9.0, 10.0
 * @safari 3.0, 3.1, 3.2. 4.0
 * @chrome 1.0, 2.0
 *
 * @class Object
 * @constructor
 * @param {Object} value
 */
function Object( value ) {}

/**
 * The prototype of the Object constructor
 *
 * @ecma 1, 2, 3, 5
 * @javascript 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.8.1, 1.8.2, 1.9
 * @jscript 2.0, 3.0, 4.0, 5.0, 5.1, 5.5, 5.6, 5.7, 5.8, 7.0, 7.1, 8.0
 *
 * @netscape 3.0, 4.0, 4.05, 4.06, 4.07, 6.0
 * @ie 4.0, 5.5, 6, 7, 8
 * @firefox 1.0, 1.5, 2.0, 3.0, 3.5, 3.6, 4
 * @opera 6.0, 7.0, 8.0, 9.0, 10.0
 * @safari 3.0, 3.1, 3.2. 4.0
 * @chrome 1.0, 2.0
 *
 * @property prototype
 * @static
 * @type Object
 */
Object.prototype = {};

/**
 * The constructor of the Object class
 *
 * @ecma 1, 2, 3, 5
 * @javascript 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.8.1, 1.8.2, 1.9
 * @jscript 2.0, 3.0, 4.0, 5.0, 5.1, 5.5, 5.6, 5.7, 5.8, 7.0, 7.1, 8.0
 *
 * @netscape 3.0, 4.0, 4.05, 4.06, 4.07, 6.0
 * @ie 4.0, 5.5, 6, 7, 8
 * @firefox 1.0, 1.5, 2.0, 3.0, 3.5, 3.6, 4
 * @opera 6.0, 7.0, 8.0, 9.0, 10.0
 * @safari 3.0, 3.1, 3.2. 4.0
 * @chrome 1.0, 2.0
 *
 * @property constructor
 * @type Function
 * @default Object
 */
Object.prototype.constructor = Object;

/**
 * Return the String value that is the result of concatenating the three
 * Strings "[object ", class, and "]".
 *
 * <pre><code>
 * var o = new Object();
 * o.toString();           // returns [object Object]
 * </code></pre>
 *
 * @ecma 1, 2, 3, 5
 * @javascript 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.8.1, 1.8.2, 1.9
 * @jscript 1.0, 2.0, 3.0, 4.0, 5.0, 5.1, 5.5, 5.6, 5.7, 5.8, 7.0, 7.1, 8.0
 *
 * @netscape 2.0, 3.0, 4.0, 4.05, 4.06, 4.07, 6.0
 * @ie 4.0, 5.5, 6, 7, 8
 * @firefox 1.0, 1.5, 2.0, 3.0, 3.5, 3.6, 4
 * @opera 6.0, 7.0, 8.0, 9.0, 10.0
 * @safari 3.0, 3.1, 3.2. 4.0
 * @chrome 1.0, 2.0
 *
 * @method toString
 * @return {String}
 */
Object.prototype.toString = function () {};

/**
 * Return either this or another value such as the host object originally
 * passed to the constructor.<br>
 * The specific result that is returned is implementation-defined.
 *
 * @ecma 1, 2, 3, 5
 * @javascript 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.8.1, 1.8.2, 1.9
 * @jscript 2.0, 3.0, 4.0, 5.0, 5.1, 5.5, 5.6, 5.7, 5.8, 7.0, 7.1, 8.0
 *
 * @netscape 3.0, 4.0, 4.05, 4.06, 4.07, 6.0
 * @ie 4.0, 5.5, 6, 7, 8
 * @firefox 1.0, 1.5, 2.0, 3.0, 3.5, 3.6, 4
 * @opera 6.0, 7.0, 8.0, 9.0, 10.0
 * @safari 3.0, 3.1, 3.2. 4.0
 * @chrome 1.0, 2.0
 *
 * @method valueOf
 * @return {String}
 */
Object.prototype.valueOf = function () {};

/**
 * <p>This function returns the result of calling <code>toString()</code>.</p>
 *
 * <p><em>NOTE 1<br>
 * This function is provided to give all Objects a generic
 * <code>toLocaleString</code> interface, even though not all may use it.
 * Currently, <code>Array</code>, <code>Number</code>, and <code>Date</code>
 * provide their own locale-sensitive <code>toLocaleString</code> methods.</em>
 * </p>
 *
 * <p><em>NOTE 2<br>
 * The first parameter to this function is likely to be used in a future version
 * of this standard; it is recommended that implementations do not use this
 * parameter position for anything else.</em></p>
 *
 * @ecma 3, 5
 *
 * @method toLocaleString
 * @return {String}
 */
Object.prototype.toLocaleString = function () {};

/**
 * <p>Returns a boolean indicating whether the object has the specified
 * property.</p>
 *
 * <p>Every object descended from Object inherits the hasOwnProperty method.
 * This method can be used to determine whether an object has the specified
 * property as a direct property of that object; unlike the in  operator,
 * this method does not check down the object's prototype chain.</p>
 *
 * @ecma 3, 5
 *
 * @method hasOwnProperty
 * @param {String} propertyName Required. The name of the property to test.
 */
Object.prototype.hasOwnProperty = function( propertyName ) {};

/**
 * <p>Tests for an object in another object's prototype chain.</p>
 *
 * <p>isPrototypeOf allows you to check whether or not an object exists
 * within another object's prototype chain.</p>
 *
 * @ecma 3, 5
 *
 * @method isPrototypeOf
 * @param {Object} object Required. The object whose prototype chain will
 * be searched
 */
Object.prototype.isPrototypeOf = function( object ) {};

/**
 * <p>Returns a boolean indicating whether the specified property is
 * enumerable.</p>
 *
 * <p>Every object has a propertyIsEnumerable method. This method can
 * determine whether the specified property in an object can be enumerated
 * by a for...in  loop, with the exception of properties inherited through
 * the prototype chain. If the object does not have the specified property,
 * this method returns false.</p>
 *
 * <p><em>NOTE<br>
 * This method does not consider objects in the prototype chain.</em></p>
 *
 * @ecma 3, 5
 *
 * @method propertyIsEnumerable
 * @param {String} prop Required. The name of the property to test.
 * be searched
 * @return {Boolean}
 */
Object.prototype.propertyIsEnumerable = function( prop ) {};


/**
 * <p>The <code>create</code> function creates a new object with a specified
 * prototype.</p>
 *
 * <pre name="code" class="js">
 * function  User(){}
 * User.prototype.name = "Anonymous";
 * User.prototype.url = "http://google.com/";
 * &nbsp;
 * var john = Object.create(new User(), {
 * &nbsp;    name: { value: "John", writable: false },
 * &nbsp;    url: { value: "http://google.com/" }
 * });
 * &nbsp;
 * print( john.name );
 * // John
 * &nbsp;
 * john.name = "Ted"; // Exception if in strict mode
 * </pre>
 *
 * @ecma 5
 *
 * @static
 * @method create
 * @throws {TypeError} If type of <var>object</va> is not Object or Null
 * @param {Object|Null} proto Required. The prototype of the object.
 * @param {Object} [props] The properties description
 * @return {Object} The created <var>object</var>
 */
Object.create = function (proto, props) {};

/**
 * Return the value of the [[Prototype]] internal property of <code>obj</code>
 *
 * @ecma 5
 *
 * @static
 * @method getPrototypeOf
 * @param {Object} obj Required. The object we wants the prototype.
 * @throws {TypeError} If object is not an Object
 * @return {Object} The prototype of obj
 */
Object.getPrototypeOf = function (obj) {};

/**
 * <p>The <code>defineProperty</code> function is used to add an own property
 * and/or update the attributes of an existing own property of an object.</p>
 *
 * <pre name="code" class="js">
 * var obj = {};
 * &nbsp;
 * Object.defineProperty( obj, "value", {
 * &nbsp;   value: true,
 * &nbsp;   writable: false,
 * &nbsp;   enumerable: true,
 * &nbsp;   configurable: true
 * });
 * &nbsp;
 * (function(){
 * &nbsp;   var name = "John";
 *
 * &nbsp;   Object.defineProperty( obj, "name", {
 * &nbsp;       get: function(){ return name; },
 * &nbsp;       set: function(value){ name = value; }
 * &nbsp;   });
 * })();
 * &nbsp;
 * print( obj.value )
 * // true
 * &nbsp;
 * print( obj.name );
 * // John
 * &nbsp;
 * obj.name = "Ted";
 * print( obj.name );
 * // Ted
 * &nbsp;
 * for ( var prop in obj ) {
 * &nbsp;   print( prop );
 * }
 * // value
 * // name
 * &nbsp;
 * obj.value = false; // Exception if in strict mode
 * &nbsp;
 * Object.defineProperty( obj, "value", {
 * &nbsp;   writable: true,
 * &nbsp;   configurable: false
 * });
 * &nbsp;
 * obj.value = false;
 * print( obj.value );
 * // false
 * &nbsp;
 * delete obj.value; // Exception
 * </pre>
 *
 * @ecma 5
 *
 * @static
 * @method defineProperty
 * @param {Object} object Required. The object .
 * @param {String} property Required. The property name we want to add or update.
 * @param {Object} attributes Required. The new attributes of the property.
 * @return {Object} The updated <var>object</var>
 */
Object.defineProperty = function (object, property, attributes) {};

/**
 * <p>The <code>defineProperty</code> function is used to add an own property
 * and/or update the attributes of an existing own property of an object.</p>
 *
 * <pre name="code" class="js">
 * var obj = {};
 * &nbsp;
 * Object.defineProperties(obj, {
 * &nbsp;   "value": {
 * &nbsp;       value: true,
 * &nbsp;       writable: false
 * &nbsp;   },
 * &nbsp;   "name": {
 * &nbsp;       value: "John",
 * &nbsp;       writable: false
 * &nbsp;   }
 * });
 * </pre>
 *
 * @ecma 5
 *
 * @static
 * @method defineProperties
 * @param {Object} object Required. The object .
 * @param {Object} properties Required. The properties description
 * @return {Object} The updated <var>object</var>
 */
Object.defineProperties = function (object, properties) {};

/**
 * Return the description of an object property
 *
 * <pre name="code" class="js">
 * var obj = { foo: "test" };
 * print(JSON.stringify(
 * &nbsp;   Object.getOwnPropertyDescriptor( obj, "foo" )
 * ));
 * // {"value": "test", "writable": true,
 * //  "enumerable": true, "configurable": true}
 * </pre>
 *
 * @ecma 5
 *
 * @method getOwnPropertyDescriptor
 * @static
 * @param {Object} obj Required. The object property we want property description.
 * @param {String} prop Required. The property we want the description.
 * @throws {TypeError} If object is not an Object
 * @return {Object} The description of prop
 */
Object.getOwnPropertyDescriptor = function ( obj, prop ) {};

/**
 * Return the description of an object property
 *
 * @ecma 5
 *
 * @method getOwnPropertyNames
 * @static
 * @param {Object} obj Required. The object property we want property description.
 * @throws {TypeError} If object is not an Object
 * @return {Array} The prototype of obj
 */
Object.getOwnPropertyNames = function ( obj ) {};

/**
 * <p>Return an array whose elements are strings corresponding to the enumerable
 * properties found directly upon obj. The ordering of the properties is the
 * same as that given by looping over the properties of the object manually.</p>
 *
 * <pre name="code" class="js">
 * var obj = { name: "John", url: "http://ejohn.org/"  };
 * print( Object.keys(obj).join(", ") );
 * // name, url
 * </pre>
 *
 * @ecma 5
 *
 * @method keys
 * @static
 * @param {Object} obj Required. The object property we want property list.
 * @return {Array} 
 */
Object.keys = function ( obj ) {};




(function () {
    var
    arguments;


    /**<p>When control enters an execution context for function code, an
     * <code>arguments</code> object is created unless the identifier
     * <var>arguments</var> occurs as a local variable or a parameter.</p>
     *
     * @ecma 1, 2, 3, 4, 5
     *
     *
     * @class Arguments
     * @extends Object
     */
    function Arguments () {
	    var
	    index;
	    index = 0;
    
	    /**
	     * For each non-negative integer, arg, less than the value of the length
	     * property, a property is created with name ToString(arg) and property
	     * attributes {DontEnum}. The initial value of this property is the value of
	     * the corresponding actual parameter supplied by the caller. The first
	     * actual parameter value corresponds to arg=0, the second to arg=1, and
	     * so on. In the case when arg is less than the number of formal parameters
	     * for the Function object, this property shares its value with the
	     * corresponding property of the activation object. This means that changing
	     * this property changes the corresponding property of the activation object
	     * and vice versa.
	     *
	     * @ecma 1, 2, 3, 4, 5
	     *
	     * @static
	     * @property [index]
	     * @type Object|Null|Undefined
	     */
        this[index] = {};
    
	    /**
	     * Provides the number of arguments actually passed to a function. By
	     * contrast, the Function.length property indicates how many arguments
	     * a function expects.
	     *
	     * @ecma 1, 2, 3, 4, 5
	     *
	     * @static
	     * @property length
	     * @type Number
	     */
        this.length = 0;

	    /**
	     * The initial value of this property is the Function object being executed.
	     * This allows anonymous functions to be recursive.
	     *
	     * @ecma 1, 2, 3, 4, 5
	     *
	     * @static
	     * @property callee
	     * @type Function
	     */
        this.callee = function () {};

	    /**
	     * Specifies the function that invoked the currently executing function.
	     *
	     * <pre name="code" class="js">
	     * function myFunc() {
	     * &nbsp;   if (arguments.caller == null) {
	     * &nbsp;       return ("The function was called from the top!");
	     * &nbsp;   } else {
	     * &nbsp;      return ("This function's caller was " + arguments.caller);
	     * &nbsp;   }
	     * }
	     * </pre>
	     *
	     * @ecma 5
	     *
	     * @static
	     * @property caller
	     * @type Function|Null
	     */
        this.caller = function () {};
    }


    /**
     * <p>When a non-internal Function object is invoked, its arguments property
     * is "dynamically bound" to a newly created object that contains the
     * arguments on which it was invoked</p>
     *
     * @ecma 1, 2, 3, 5
     *
     * @private
     * @class arguments
     * @extends Arguments
     */
    arguments = new Arguments();

}());


/**
 * <p>When Function is called as part of a new expression, it is a constructor:
 * it initializes the newly created object.</p>
 *
 * <p>The last argument specifies the body (executable code) of a function;
 * any preceding arguments specify formal parameters.</p>
 *
 * <p>The Function constructor is called with some arguments:
 * p1, p2, . . . , pn, body (where n might be 0, that is, there are no "p"
 * arguments, and where body might also not be provided)</p>
 *
 * <p>Note that it is permissible but not necessary to have one argument for
 * each formal parameter to be specified. <br>
 * For example, all three of the following expressions produce the same result:
 * </p>
 * 
 * <pre name="code" class="js">
 * new Function("a", "b", "c", "return a+b+c")
 * new Function("a, b, c", "return a+b+c")
 * new Function("a,b", "c", "return a+b+c")
 * </pre>
 *
 * <p>A prototype property is automatically created for every function, against
 * the possibility that the function will be used as a constructor.</p>
 *
 * @ecma 1, 2, 3, 5
 * @javasscript 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.8.1, 1.8.2, 1.9
 * @jscript 2.0, 3.0, 4.0, 5.0, 5.1, 5.5, 5.6, 5.7, 5.8, 7.0, 7.1, 8.0
 *
 * @netscape 2.0, 3.0, 4.0, 4.05, 4.06, 4.07, 6.0
 * @ie 4.0, 5.5, 6, 7, 8
 * @firefox 1.0, 1.5, 2.0, 3.0, 3.5, 3.6, 4
 * @opera 6.0, 7.0, 8.0, 9.0, 10.0
 * @safari 3.0, 3.1, 3.2. 4.0
 * @chrome 1.0, 2.0
 * 
 * @class Function
 * @extends Object
 * @constructor
 * @param {String}* [param0]
 * @param {String} [body]
 */
function Function ( param0, body ) {

    /**
     * The value of the length property is usually an integer that indicates
     * the "typical" number of arguments expected by the function.
     *
     * However, the language permits the function to be invoked with some other
     * number of arguments. The behavior of a function when invoked on a number
     * of arguments other than the number specified by its length property
     * depends on the function.
     *
     * @ecma 1, 2, 3, 5
     *
     * @property length
     * @type Number
     */
    this.length = arguments.length - 1;

    /**
     * <p>The value of the prototype property is used to initialize the internal
     * [[Prototype]] property of a newly created object before the Function
     * object is invoked as a constructor for that newly created object.</p>
     *
     * @ecma 1, 2, 3, 5
     *
     * @property prototype
     * @type Object
     */
    this.prototype = {};

    /**
     * <p>The value of the arguments property is normally null if there is no
     * outstanding invocation of the function in progress (that is, the function
     * has been called but has not yet returned).</p>
     *
     * <p>When a non-internal Function object is invoked, its arguments property
     * is "dynamically bound" to a newly created object that contains the
     * arguments on which it was invoked</p>
     *
     * @ecma 1, 2, 3, 5
     *
     * @property arguments
     * @type Arguments
     *
     * @deprecated <p>The use of this property is discouraged; it is provided
     * principally for compatibility with existing old code.</p>
     * <p>The local <code>arguments</code> object should be used instead in
     * Function instances scope</p>
     */
    this.arguments = new Arguments();
}

/*
 * This is a data property with a value of 1.
 *
 * ecma 1, 2, 3, 5
 *
 * YUI DOC DON'T SUPPORT WELL STATIC
 *
 * property length
 * static
 * type Number
 * default 1
 */
//Function.length = 1;


/**
 * The Function prototype object is itself a Function object (its [[Class]] is
 * "Function") that, when invoked, accepts any arguments and returns undefined.
 * The value of the internal [[Prototype]] property of the Function prototype
 * object is the Object prototype object
 *
 * @ecma 1, 2, 3, 5
 *
 * @method prototype
 * @static
 * @return {undefined}
 */
Function.prototype = new Object();

/**
 * The initial value of Function.prototype.constructor is the built-in Function
 * constructor.
 *
 * @ecma 1, 2, 3, 5
 *
 * @property constructor
 * @type Function
 * @default Function
 */
Function.prototype.constructor = Function;

/**
 * <p>An implementation-dependent representation of the function is returned.
 * This representation has the syntax of a FunctionDeclaration.</p>
 *
 * <p>Note in particular that the use and placement of white space,
 * line terminators, and semicolons within the representation String is
 * implementation-dependent.</p>
 *
 * <p>This toString function is not generic; it generates a runtime error if its
 * <var>this</var> value is not a Function object.
 * Therefore it cannot be transferred to other kinds of objects for use as a
 * method.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method toString
 * @return {String}
 */
Function.prototype.toString = function () {};


/**
 * <p>The <code>apply</code> method calls the object as a method of a specific
 * object (the global object by default)</p>
 *
 * <p>If <var>thisArg</var> is <code>null</code> or <code>undefined</code>, the
 * called function is passed the global object as the <var>this</var> value.
 * Otherwise, the called function is passed <var>thisArg</var> as the
 * <var>this</var> value.</p>
 *
 * <p>If <var>argArray</var> is <code>null</code> or <code>undefined</code>, the
 * called function is passed no arguments. Otherwise, if <var>argArray</var> is
 * neither an array nor an arguments object, a <code>TypeError</code> exception
 * is thrown. If <var>argArray</var> is either an array or an arguments object,
 * the function is passed its items as arguments</p>
 *
 * <p>The <code>length</code> property of the <code>apply</code> method is 2.
 * </p>
 *
 * @ecma 3, 5
 *
 * @method apply
 * @throws {TypeError} If the object instance is not a function, or if
 * <var>argArray</var> is neither an array or an arguments object.
 * @param {Object} [thisArg] The object used as <var>this</var> (the global
 * object by default)
 * @param {Array} [argArray]
 * @return {Object|undefined}
 */
Function.prototype.apply = function (thisArg, argArray) {};


/**
 * <p>The <code>call</code> method calls the object as a method of a specific
 * object (the global object by default)</p>
 *
 * <p>If <var>thisArg</var> is <code>null</code> or <code>undefined</code>, the
 * called function is passed the global object as the <var>this</var> value.
 * Otherwise, the called function is passed <var>thisArg</var> as the
 * <var>this</var> value.</p>
 *
 * <p>All <var>argN</var> arguments are sent as arguments to the called
 * function</p>
 *
 * <p>The <code>length</code> property of the <code>call</code> method is 2.
 * </p>
 *
 * @ecma 3, 5
 *
 * @method call
 * @throws {TypeError} If the object is not callable as a function
 * @param {Object} [thisArg] The object used as <var>this</var> (the global
 * object by default)
 * @param {Array} [argN] As many arguments to pass to the function as required
 * @return {Object|undefined}
 */
Function.prototype.call = function (thisArg, argN) {};






/**
 * <p>Array objects give special treatment to a certain class of property names.
 * </p>
 *
 * <pre name="code" class="js">new Array(item0, item1, . . .)</pre>
 * <p>If and only if the Array constructor is given two or more arguments.
 * The [[Prototype]] property of the newly constructed object is set to the
 * original Array prototype object, the one that is the initial value of
 * Array.prototype<br>
 * The [[Class]] property of the newly constructed object is set to "Array".
 * The length property of the newly constructed object is set to the number of
 * arguments.<br>
 * The 0 property of the newly constructed object is set to item0; the 1
 * property of the newly constructed object is set to item1; and, in general,
 * for as many arguments as there are, the k property of the newly constructed
 * object is set to argument k, where the first argument is considered to be
 * argument number 0.</p>
 *
 * <pre name="code" class="js">new Array(len)</pre>
 * <p>The [[Prototype]] property of the newly constructed object is set to the
 * original Array prototype object, the one that is the initial value of
 * Array.prototype (0).<br>
 * The [[Class]] property of the newly constructed object is set to "Array".
 * If the argument len is a number, then the length property of the newly
 * constructed object is set to len.<br>
 * If the argument len is not a number, then the length property of the newly
 * constructed object is set to 1 and the 0 property of the newly constructed
 * object is set to len.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @class Array
 * @extends Object
 * @constructor
 * @param {Number|Object} [lenOrItem0] This parameter is used as :
 * <ul>
 *   <li>The length of the Array if there is no additionnal arguments and this
 *   value is a number,</li>
 *   <li>the first item of the array otherwise</li>
 * </ul>
 * @param {Object|null|undefined} [itemN] Any number of items to insert in
 * the Array
 */
function Array ( lenOrItem0, itemN ) {
    var
    index;

    /**
     * <p>A property name <var>P</var> (in the form of a string value) is an
     * <em>array index</em> if and only if its value would be the same than
     * <code>Number(P).toString()</code></p>
     *
     * <p>Specifically, whenever a property is added whose name is an array
     * index, the length property is changed, if necessary, to be one more than
     * the numeric value of that array index; and whenever the length property
     * is changed, every property whose name is an array index whose value is
     * not smaller than the new length is automatically deleted. This constraint
     * applies only to properties of the Array object itself and is unaffected
     * by length or array index properties that may be inherited from its
     * prototype.</p>
     *
     * @ecma 1, 2, 3, 5
     *
     * @property [index]
     * @type Object
     */
    this[index] = new Object();

    /**
     * The length property of this Array object is always numerically greater
     * than the name of every property whose name is an array index.
     *
     * @ecma 1, 2, 3, 5
     *
     * @property length
     * @type Number
     * @default 0
     */
    this.length = 0;
}


/**
 * <p>Note that the Array prototype object is itself an array; it has a length
 * property (whose initial value is +0) and the special internal [[Put]] method.
 * </p>
 *
 * <p>In following descriptions of functions that are properties of the Array
 * prototype object, the phrase "this object" refers to the object that is the
 * this value for the invocation of the function.<br>
 * It is permitted for this to refer to an object for which the value of the
 * internal [[Class]] property is not "Array".</p>
 *
 * <p>The Array prototype object does not have a valueOf property of its own;
 * however, it inherits the valueOf property from the Object prototype Object.
 * </p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @attributes DontEnum, DontDelete, ReadOnly
 *
 * @property prototype
 * @static
 * @type Object
 * @return {undefined}
 */
Array.prototype = new Object();

/*
 * The length property is 1. (Of course, the Array constructor accepts more
 * than one argument, because it accepts a variable number of arguments.)
 *
 * ecma 1, 2, 3, 5
 *
 * YUI DOC DON'T SUPPORT WELL STATIC
 *
 * property length
 * static
 * default 1
 */
//Array.length = 1;

/**
 * The initial value of <code>Array.prototype.constructor</code> is the built-in
 * <code>Array</code> constructor.
 *
 * @ecma 1, 2, 3, 5
 *
 * @property constructor
 * @type Function
 */
Array.prototype.constructor = Array;

/**
 * <p>The result of calling this function is the same as if the built-in
 * <code>join</code> method were invoked for this object with no argument.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method toString
 * @return {String}
 */
Array.prototype.toString = function () {
    return this.join();
};

/**
 * <p>The elements of the array are converted to strings, and these strings are
 * then concatenated, separated by occurrences of the separator.<br>
 * If no separator is provided, a single comma is used as the separator.</p>
 *
 * <p>Note that the join function is intentionally generic; it does not require
 * that its this value be an Array object.
 * Therefore it can be transferred to other kinds of objects for use as a
 * method.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method join
 * @param {String} [separator] Default: ",".
 * @return {String}
 */
Array.prototype.join = function (separator) {};


/**
 * <p>The elements of this object are converted to strings using their
 * <code>toLocaleString</code> method, and these strings are then concatenated,
 * separated by occurences of a separator string that as been derived in
 * implementation-defined locale-specific way. The result of calling this
 * function is intended to be locale-specific</p>
 *
 * <p><em>The first parameter to this function is likely to be used in a future
 * version of this standard; it is recommended that implementations do not use
 * this parameter position for anything else.</em></p>
 *
 * @ecma 3, 5
 *
 * @method toLocaleString
 * @return {String}
 */
Array.prototype.toLocaleString = function () {};

/**
 * <p>When the <code>concat</code> method is called with zero or more arguments
 * item1, item2, etc., it returns an array containing the array elements of the
 * object followed by the array elements of each argument in order.</p>
 *
 * @ecma 3, 5
 *
 * @method concat
 * @param {Array} item1
 * @param {Array} [item2]
 * @return {Array}
 */
Array.prototype.concat = function (item1, item2) {};

/**
 * <p>The last element of the array is removed from the array and returned.</p>
 *
 * @ecma 3, 5
 *
 * @method pop
 * @return {Object} The last element of the array
 */
Array.prototype.pop = function () {};

/**
 * <p>The arguments are appended to the end of the array, in the order in which
 * they appear. The new length of the array is returned as the result of the
 * call</p>
 *
 * @ecma 3, 5
 *
 * @method push
 * @param {Object} item1
 * @param {Object} [item2]
 * @return {Number} The new length of the array
 */
Array.prototype.push = function (item1, item2) {};

/**
 * <p>The elements of the array are rearranged so as to reverse their order.
 * This object is returned as the result of the call.</p>
 *
 * <p>Note that the reverse function is intentionally generic; it does not
 * require that its this value be an Array object.<br>
 * Therefore it can be transferred to other kinds of objects for use as a
 * method.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method reverse
 * @return {Array}
 */
Array.prototype.reverse = function () {};

/**
 * <p>The first element of the array is removed from the array and returned.</p>
 *
 * @ecma 3, 5
 *
 * @method shift
 * @return {Object} The first element of the array
 */
Array.prototype.shift = function (item1, item2) {};

/**
 * <p>The arguments are prepended to the start of the array, such that their
 * order within the array is the same as the order in which they appear in the
 * argument list.</p>
 *
 * @ecma 3, 5
 *
 * @method unshift
 * @param {Object} item1
 * @param {Object} [item2]
 * @return {Number} The new length of the array
 */
Array.prototype.unshift = function (item1, item2) {};

/**
 * <p>The elements of this array are sorted. The sort is not necessarily stable.
 * If <var>comparefn</var> is provided, it should be a function that accepts two
 * arguments <var>x</var> and <var>y</var> and returns a negative value if
 * <code>x &lt; y</code>, zero if <code>x = y</code>, or a positive value if
 * <code>x &gt; y</code>.</p>
 *
 * <p>Note that, because undefined always compared greater than any other value,
 * undefined and nonexistent property values always sort to the end of the
 * result.</p>
 *
 * <p>Note that the sort function is intentionally generic; it does not require
 * that its this value be an Array object.<br>
 * Therefore it can be transferred to other kinds of objects for use as a
 * method.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method sort
 * @param {Function} [comparefn]
 * @return {Array}
 */
Array.prototype.sort = function (comparefn) {};

/**
 * <p>The <code>slice</code> method takes two arguments, <var>start</var> and
 * <var>end</var>, and returns an array containing the elements of the array
 * from element <var>start</var> up to, but not including, element
 * <var>end</var> (or through the end of the array if end is undefined). If
 * <var>start</var> is negative, it is treated as <code>length+start</code>
 * where <var>length</var> is the length of the array. If <var>end</var> is
 * negative, it is treated as <code>length+end</code> where <var>length</var>
 * is the length of the array.</p>
 *
 * @ecma 3, 5
 *
 * @method slice
 * @param {Number} start
 * @param {Number} [end]
 * @return {Array}
 */
Array.prototype.slice = function (start, end) {};

/**
 * <p>When the <code>splice</code> method is called with two or more arguments
 * <var>start</var>, <var>deleteCount</var> and (optionally) <var>item1</var>,
 * <var>item2</var>, etc., the <var>deleteCount</var> elements of the array
 * starting at array index <var>start</var> are replaced by the arguments
 * <var>item1</var>, <var>item2</var>, etc. An Array object containing the
 * deleted elements (if any) is returned.</p>
 *
 * @ecma 3, 5
 *
 * @method splice
 * @param {Number} start
 * @param {Number} deleteCount
 * @param {Object} [item1]
 * @param {Object} [item2]
 * @return {Array} The deleted elements
 */
Array.prototype.splice = function (start, deleteCount, item1, item2) {};

/**
 * <p><code>indexOf</code> compares <var>searchElement</var> to the elements of
 * the array, in ascending order, using the internal Strict Equality Comparison
 * Algorithm, and if found at one or more positions, returns the index of the
 * first such position; otherwise, -1 is returned.</p>
 *
 * <p>The optional second argument <var>fromIndex</var> defaults to 0 (i.e. the
 * whole array is searched). If it is greater than or equal to the length of the
 * array, -1 is returned, i.e. the array will not be searched. If it is
 * negative, it is used as the offset from the end of the array to compute
 * <var>fromIndex</var>. If the computed index is less than 0, the whole array
 * will be searched</p>
 *
 * @ecma 5
 *
 * @method indexOf
 * @param {Number} searchElement
 * @param {Number} [fromIndex]
 * @return {Number} The index of the first position of <var>searchElement</var>
 * or -1 if not found
 */
Array.prototype.indexOf = function (searchElement, fromIndex) {};

/**
 * <p><code>lastIndexOf</code> compares <var>searchElement</var> to the elements
 * of the array, in descending order, using the internal Strict Equality
 * Comparison Algorithm, and if found at one or more positions, returns the
 * index of the last such position; otherwise, -1 is returned.</p>
 *
 * <p>The optional second argument <var>fromIndex</var> defaults to the array's
 * length (i.e. the whole array is searched). If it is greater than or equal to
 * the length of the array, , the whole array will be searched. If it is
 * negative, it is used as the offset from the end of the array to compute
 * <var>fromIndex</var>. If the computed index is less than 0, -1 is returned.
 * </p>
 *
 * @ecma 5
 *
 * @method lastIndexOf
 * @param {Number} searchElement
 * @param {Number} [fromIndex]
 * @return {Number} The index of the last position of <var>searchElement</var>
 * or -1 if not found
 */
Array.prototype.lastIndexOf = function (searchElement, fromIndex) {};

/**
 * <p><var>callbackfn</var> should be a function that accepts three arguments
 * and returns a value that is coercible to the Boolean value true or false.
 * <code>every</code> calls <var>callbackfn</var> once for each element
 * present in the array, in ascending order, until it find one where
 * <var>callbackfn</var> returned false. If such an element is found,
 * <code>every</code> immediately returns false. Otherwise, if
 * <var>callbackfn</var> returned true for all elements, <code>every</code> will
 * return true. <var>callbackfn</var> is called only for elements of the array
 * which actually exist; it is not called for missing elements of the array.</p>
 *
 * <p>If a <var>thisArg</var> parameter is provided, it will be used as the
 * <code>this</code> value for each invocation of <var>callbackfn</var>. If it
 * is not provided, <code>undefined</code> is used instead.</p>
 *
 * <p><var>callbackfn</var> is called with three arguments: the value of the
 * element, the index of the element, and the object being traversed.</p>
 *
 * <p><code>every</code> does not directly mutate the object on which it is
 * called but the object may be mutated by the calls to <var>callbackfn</var>.
 * </p>
 *
 * @ecma 5
 *
 * @method every
 * @param {Function} callbackfn
 * @param {Object} [thisArg]
 * @return {Boolean} True if <var>callbackfn</var> returned true on every
 * elements
 */
Array.prototype.every = function (callbackfn, thisArg) {};

/**
 * <p><var>callbackfn</var> should be a function that accepts three arguments
 * and returns a value that is coercible to the Boolean value true or false.
 * <code>some</code> calls <var>callbackfn</var> once for each element
 * present in the array, in ascending order, until it find one where
 * <var>callbackfn</var> returned true. If such an element is found,
 * <code>some</code> immediately returns true. Otherwise, if
 * <var>callbackfn</var> returned false for all elements, <code>some</code> will
 * return false. <var>callbackfn</var> is called only for elements of the array
 * which actually exist; it is not called for missing elements of the array.</p>
 *
 * <p>If a <var>thisArg</var> parameter is provided, it will be used as the
 * <code>this</code> value for each invocation of <var>callbackfn</var>. If it
 * is not provided, <code>undefined</code> is used instead.</p>
 *
 * <p><var>callbackfn</var> is called with three arguments: the value of the
 * element, the index of the element, and the object being traversed.</p>
 *
 * <p><code>some</code> does not directly mutate the object on which it is
 * called but the object may be mutated by the calls to <var>callbackfn</var>.
 * </p>
 *
 * @ecma 5
 *
 * @method some
 * @param {Function} callbackfn
 * @param {Object} [thisArg]
 * @return {Boolean} True if <var>callbackfn</var> returned true for at least
 * one element
 */
Array.prototype.some = function (callbackfn, thisArg) {};

/**
 * <p><var>callbackfn</var> should be a function that accepts three arguments
 * and returns a value that is coercible to the Boolean value true or false.
 * <code>filter</code> calls <var>callbackfn</var> once for each element
 * present in the array, in ascending order, and constructs a new array of all
 * the values for which <var>callbackfn</var> returns true.
 * <var>callbackfn</var> is called only for elements of the array which actually
 * exist; it is not called for missing elements of the array.</p>
 *
 * <p>If a <var>thisArg</var> parameter is provided, it will be used as the
 * <code>this</code> value for each invocation of <var>callbackfn</var>. If it
 * is not provided, <code>undefined</code> is used instead.</p>
 *
 * <p><var>callbackfn</var> is called with three arguments: the value of the
 * element, the index of the element, and the object being traversed.</p>
 *
 * <p><code>filter</code> does not directly mutate the object on which it is
 * called but the object may be mutated by the calls to <var>callbackfn</var>.
 * </p>
 *
 * @ecma 5
 *
 * @method filter
 * @param {Function} callbackfn
 * @param {Object} [thisArg]
 * @return {Boolean} True if <var>callbackfn</var> returned true for at least
 * one element
 */
Array.prototype.filter = function (callbackfn, thisArg) {};

/**
 * <p><code>callbackfn</code> should be a function that accepts three arguments.
 * <code>forEach</code> calls <code>callbackfn</code> once for each element
 * present in the array, in ascending order. <code>callbackfn</code> is called
 * only for elements of the array which actually exist; it is not called for
 * missing elements of the array.</p>
 *
 * <p>If a <code>thisArg</code> parameter is provided, it will be used as the
 * <code>this</code> value for each invocation of <code>callbackfn</code>. If it
 * is not provided, <code>undefined</code> is used instead.</p>
 *
 * <p><code>callbackfn</code> is called with three arguments: the value of the
 * element, the index of the element, and the object being traversed.</p>
 *
 * <p><code>forEach</code> does not directly mutate the object on which it is
 * called but the object may be mutated by the calls to <code>callbackfn</code>.
 * </p>
 *
 * <p>The range of elements processed by <code>forEach</code> is set before the 
 * first call to <code>callbackfn</code>. Elements which are appended to the 
 * array after the call to <code>forEach</code> begins will not be visited by 
 * <code>callbackfn</code>. If existing elements of the array are changed, their
 * value as passed to callback will be the value at the time
 * <code>forEach</code> visits them; elements that are deleted after the call to
 * <code>forEach</code> begins and before being visited are not visited.</p>
 *
 * <p>The <code>length</code> property of the <code>forEach</code> method is 1.</p>
 *
 * <p><em>The <code>forEach</code> function is intentionally generic; it does
 * not require that its this value be an Array object. Therefore it can be
 * transferred to other kinds of objects for use as a method. Whether the
 * <code>forEach</code> function can be applied successfully to a host object is
 * implementation-dependent.</em></p>
 *
 * @ecma 5
 *
 * @method forEach
 * @param {Function} callbackfn Required. 
 * @param {Object} [thisArg] 
 */
Array.prototype.forEach = function (callbackfn, thisArg) {};

/**
 * <p><code>callbackfn</code> should be a function that accepts three arguments.
 * <code>map</code> calls <code>callbackfn</code> once for each element
 * present in the array, in ascending order, and constructs a new Array from the
 * results. <code>callbackfn</code> is called only for elements of the array
 * which actually exist; it is not called for missing elements of the array.</p>
 *
 * <p>If a <code>thisArg</code> parameter is provided, it will be used as the
 * <code>this</code> value for each invocation of <code>callbackfn</code>. If it
 * is not provided, <code>undefined</code> is used instead.</p>
 *
 * <p><code>callbackfn</code> is called with three arguments: the value of the
 * element, the index of the element, and the object being traversed.</p>
 *
 * <p><code>map</code> does not directly mutate the object on which it is called
 * but the object may be mutated by the calls to <code>callbackfn</code>.</p>
 *
 * <p>The range of elements processed by <code>map</code> is set before the
 * first call to <code>callbackfn</code>. Elements which are appended to the
 * array after the call to <code>map</code> begins will not be visited by
 * <code>callbackfn</code>. If existing elements of the array are changed, their
 * value as passed to callback will be the value at the time
 * <code>map</code> visits them; elements that are deleted after the call to
 * <code>map</code> begins and before being visited are not visited.</p>
 *
 * <p>The <code>length</code> property of the <code>map</code> method is 1.</p>
 *
 * <p><em>The <code>map</code> function is intentionally generic; it does
 * not require that its this value be an Array object. Therefore it can be
 * transferred to other kinds of objects for use as a method. Whether the
 * <code>map</code> function can be applied successfully to a host object is
 * implementation-dependent.</em></p>
 *
 * @ecma 5
 *
 * @method map
 * @param {Function} callbackfn Required.
 * @param {Object} [thisArg]
 */
Array.prototype.map = function (callbackfn, thisArg) {};

/**
 * <p><var>callbackfn</var> should be a function that accepts four arguments.
 * <code>reduce</code> calls <var>callbackfn</var> once for each element
 * present in the array, in ascending order.</p>
 *
 * <p>The first time that callback is called, the <var>previousValue</var> and
 * <var>currentValue</var> can be one of two values. If an
 * <var>initialValue</var> was provided in the call to <code>reduce</code>, then
 * <var>previousValue</var> will be equal to <var>initialValue</var> and
 * <var>currentValue</var> will be equal to the first value in the array. If no
 * <var>initialValue</var> was provided, then <var>previousValue</var> will be
 * equal to the first value in the array and <var>currentValue</var> will be
 * equal to the second.</p>
 *
 * <p>Some example run-throughs of the function would look like this:</p>
 *
 * <pre name="code" class="js">
 * [0,1,2,3,4].reduce(function(previousValue, currentValue, index, array){
 * &nbsp;   return previousValue + currentValue;
 * });
 * &nbsp;
 * // First call
 * previousValue = 0, currentValue = 1, index = 1
 * &nbsp;
 * // Second call
 * previousValue = 1, currentValue = 2, index = 2
 * &nbsp;
 * // Third call
 * previousValue = 3, currentValue = 3, index = 3
 * &nbsp;
 * // Fourth call
 * previousValue = 6, currentValue = 4, index = 4
 * &nbsp;
 * // array is always the object [0,1,2,3,4] upon which reduce was called
 * &nbsp;
 * // Return Value: 10
 * </pre>
 *
 * <p>And if you were to provide an <var>initialValue</var>, the result would
 * look like this:</p>
 *
 * <pre name="code" class="js">
 * [0,1,2,3,4].reduce(function(previousValue, currentValue, index, array){
 * &nbsp;   return previousValue + currentValue;
 * }, 10);
 * &nbsp;
 * // First call
 * previousValue = 10, currentValue = 0, index = 0
 * &nbsp;
 * // Second call
 * previousValue = 10, currentValue = 1, index = 1
 * &nbsp;
 * // Third call
 * previousValue = 11, currentValue = 2, index = 2
 * &nbsp;
 * // Fourth call
 * previousValue = 13, currentValue = 3, index = 3
 * &nbsp;
 * // Fifth call
 * previousValue = 16, currentValue = 4, index = 4
 * &nbsp;
 * // array is always the object [0,1,2,3,4] upon which reduce was called
 * &nbsp;
 * // Return Value: 20
 * </pre>
 *
 * @ecma 5
 *
 * @method reduce
 * @throws {TypeError}
 * @param {Function} callbackfn
 * @param {Object} [initialValue]
 * @return {Object}
 */
Array.prototype.reduce = function (callbackfn, initialValue) {};


/**
 * <p><var>callbackfn</var> should be a function that accepts four arguments.
 * <code>reduce</code> calls <var>callbackfn</var> once for each element
 * present in the array, in ascending order.</p>
 *
 * <p>The first time that callback is called, the <var>previousValue</var> and
 * <var>currentValue</var> can be one of two values. If an
 * <var>initialValue</var> was provided in the call to <code>reduce</code>, then
 * <var>previousValue</var> will be equal to <var>initialValue</var> and
 * <var>currentValue</var> will be equal to the last value in the array. If no
 * <var>initialValue</var> was provided, then <var>previousValue</var> will be
 * equal to the last value in the array and <var>currentValue</var> will be
 * equal to the second-to-last value.</p>
 *
 * <p>Some example run-throughs of the function would look like this:</p>
 *
 * <pre name="code" class="js">
 * [0,1,2,3,4].reduce(function(previousValue, currentValue, index, array){
 * &nbsp;   return previousValue + currentValue;
 * });
 * &nbsp;
 * // First call
 * previousValue = 4, currentValue = 3, index = 3
 * &nbsp;
 * // Second call
 * previousValue = 7, currentValue = 2, index = 2
 * &nbsp;
 * // Third call
 * previousValue = 9, currentValue = 1, index = 1
 * &nbsp;
 * // Fourth call
 * previousValue = 10, currentValue = 0, index = 0
 * &nbsp;
 * // array is always the object [0,1,2,3,4] upon which reduce was called
 * &nbsp;
 * // Return Value: 10
 * </pre>
 *
 * <p>And if you were to provide an <var>initialValue</var>, the result would
 * look like this:</p>
 *
 * <pre name="code" class="js">
 * [0,1,2,3,4].reduce(function(previousValue, currentValue, index, array){
 * &nbsp;   return previousValue + currentValue;
 * }, 10);
 * &nbsp;
 * // First call
 * previousValue = 10, currentValue = 4, index = 4
 * &nbsp;
 * // Second call
 * previousValue = 14, currentValue = 3, index = 3
 * &nbsp;
 * // Third call
 * previousValue = 17, currentValue = 2, index = 2
 * &nbsp;
 * // Fourth call
 * previousValue = 19, currentValue = 1, index = 1
 * &nbsp;
 * // Fifth call
 * previousValue = 20, currentValue = 0, index = 0
 * &nbsp;
 * // array is always the object [0,1,2,3,4] upon which reduce was called
 * &nbsp;
 * // Return Value: 20
 * </pre>
 *
 * @ecma 5
 *
 * @method reduceRight
 * @throws {TypeError}
 * @param {Function} callbackfn
 * @param {Object} [initialValue]
 * @return {Object}
 */
Array.prototype.reduceRight = function (callbackfn, initialValue) {};








/**
 * When String is called as part of a new expression, it is a constructor:
 * it initializes the newly created object.
 *
 * @ecma 1, 2, 3, 5
 *
 * @class String
 * @extends Object
 * @constructor
 * @param {Object} [value]
 */
function String( value ) {

    /**
     * <p>The number of characters in the String value represented by this
     * String object.</p>
     *
     * Once a String object is created, this property is unchanging.
     *
     * @ecma 1, 2, 3, 5
     *
     * @property length
     * @type Number
     */
    this.length = 0;
}


/**
 * The initial value of <var>String.prototype</var> is the built-in String
 * prototype object
 *
 * @ecma 1, 2, 3, 5
 *
 * @property prototype
 * @static
 * @type Object
 */
String.prototype = new Object();


/**
 * <p>Returns a string value containing as many characters as the number of
 * arguments. Each argument specifies one character of the resulting string,
 * with the first argument specifying the first character, and so on, from left
 * to right.</p>
 *
 * <p>If no arguments are supplied, the result is the empty string.</p>
 *
 * @ecma 1
 * @javascript 1.2, 1.3
 *
 * @method fromCharCode
 * @static
 * @param {Number}* char0
 * @return {String}
 */
String.fromCharCode = function (char0) {};

/**
 * The initial value of String.prototype.constructor is the built-in String
 * constructor.
 *
 * @ecma 1, 2, 3, 5
 *
 * @property constructor
 * @type Function
 * @default String
 *
 */
String.prototype.constructor = String;

/**
 * <p>Returns this string value. (Note that, for a String object, the toString
 * method happens to return the same thing as the valueOf method.)</p>
 *
 * <p>The toString function is not generic; it generates a runtime error if its
 * this value is not a String object.<br>
 * Therefore it cannot be transferred to other kinds of objects for use as a
 * method.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method toString
 * @return {String}
 */
String.prototype.toString = function () {};

/**
 * <p>Returns this string value.</p>
 *
 * <p>The valueOf function is not generic; it generates a runtime error if its
 * this value is not a String object.</p>
 *
 * <p>Therefore it cannot be transferred to other kinds of objects for use as a
 * method.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method valueOf
 * @return {String}
 */
String.prototype.valueOf = function () {};

/**
 * <p>Returns a string containing the character at position pos in this string.
 * If there is no character at that position, the result is the empty string.
 * The result is a string value, not a String object.</p>
 *
 * <p>If pos is a value of Number type that is an integer, then the result of
 * x.charAt(pos) is equal to the result of x.substring(pos, pos+1).</p>
 *
 * <p>Note that the charAt function is intentionally generic; it does not
 * require that its this value be a String object.<br>
 * Therefore it can be transferred to other kinds of objects for use as a
 * method.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method charAt
 * @param {Number} pos Required. The position of the character
 * @return {String}
 */
String.prototype.charAt = function ( pos ) {};

/**
 * <p>Returns a number (a nonnegative integer less than 216)
 * representing the Unicode encoding of the character at position pos in this
 * string.<br>
 * If there is no character at that position, the result is NaN.
 * </p>
 *
 * <p>Note that the charCodeAt function is intentionally generic; it does not
 * require that its this this be a String object.
 * Therefore it can be transferred to other kinds of objects for use as a method.
 * </p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method charCodeAt
 * @param {Number} pos Required. The position of the character
 * @return {Number}
 */
String.prototype.charCodeAt = function ( pos ) {};

/**
 * If the given searchString appears as a substring of the result of converting
 * this object to a string, at one or more positions that are at or to the right
 * of the specified position, then the index of the leftmost such position is
 * returned; otherwise -1 is returned. <br>
 * If position is undefined or not supplied, 0 is assumed, so as to search all
 * of the string.</p>
 *
 * <p>Note that the indexOf function is intentionally generic; it does not
 * require that its this value be a String object. Therefore it
 * can be transferred to other kinds of objects for use as a method.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method indexOf
 * @param {String} searchString Required. The searched string
 * @param {Number} [position] The position from which the search starts
 * @return {Number}
 */
String.prototype.indexOf = function indexOf(searchString, position) {};


/**
 * <p>If the given searchString appears as a substring of the result of
 * converting this object to a string, at one or more positions that are at or
 * to the left of the specified position, then the index of the rightmost such
 * position is returned; otherwise -1 is returned.<br>
 * If position is undefined or not supplied, the length of this string value is
 * assumed, so as to search all of the string.</p>
 *
 * <p><em>Note that the <code>lastIndexOf</code> function is intentionally generic;
 * it does not require that its this value be a String object. Therefore it can be 
 * transferred to other kinds of objects for use as a method.</em></p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method lastIndexOf
 * @param {String} searchString Required. The searched string
 * @param {Number} [position] The position from which the search starts
 * @return {Number}
 */
String.prototype.lastIndexOf = function lastIndexOf(searchString, position) {};

/**
 * <p>Returns an <code>Array</code> object into which substrings of the result 
 * of converting this object to a string have been stored. The substrings are 
 * determined by searching from left to right for occurrences of the given 
 * <code>separator</code>; these occurrences are not part of any substring in 
 * the returned array, but serve to divide up this string value.</p>
 *
 * <p>The separator may be a string of any length.</p>
 *
 * <p>As a special case, if the <code>separator</code> is the empty string, the 
 * string is split up into individual characters; the length of the result array 
 * equals the length of the string, and each substring contains one character. 
 * If the separator is not supplied, then the result array contains just one 
 * string, which is the string.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method split
 * @param {String} [separator]
 * @param {Number} [limit] 
 * @return {Array}
 */
String.prototype.split = function split(separator, limit) {};

/**
 * <p>The <code>substring</code> method takes two arguments, <var>start</var>
 * and <var>end</var>, and returns a substring of the result of converting this
 * object to a String, starting from character position <var>start</var> and
 * running to, but not including, character position <var>end</var> of the
 * String (or through the end of the String is <var>end</var> is undefined).
 * The result is a String value, not a String object.</p>
 * 
 * <p>If either argument is NaN or negative, it is replaced with zero; if either
 * argument is larger than the length of the string, it is replaced with the
 * length of the string.</p>
 *
 * <p>If start is larger than end, they are swapped.</p>
 *
 * <p><em>Note that the <code>substring</code> function is intentionally
 * generic; it does not require that its <var>this</var> value be a String
 * object. Therefore it can be transferred to other kinds of objects for use as
 * a method.</em></p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method substring
 * @param {Number} start Required.
 * @param {Number} [end]
 * @return {String} The result is a string value, not a String object.
 */
String.prototype.substring = function substring(start, end) {};

/**
 * <p>Return a copy of the string with both leading and trailing white space
 * removed. The definition of white space is the union of WhiteSpace and
 * LineTerminator.</p>
 *
 * <p><em>The <code>trim</code> function is intentionally generic; it does not
 * require that its this value be a String object. Therefore, it can be
 * transferred to other kinds of objects for use as a method.</em></p>
 *
 * @ecma 5
 *
 * @method trim
 * @return {String}
 */
String.prototype.trim = function trim() {};

/**
 * <p>Returns a string equal in length to the length of the result of converting
 * this object to a string. The result is a string value, not a String object.
 * </p>
 *
 * <p><em>Note that the <code>toLowerCase</code> function is intentionally
 * generic; it does not require that its this value be a String object.
 * Therefore it can be transferred to other kinds of objects for use as a
 * method.</em></p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method toLowerCase
 * @return {String}
 */
String.prototype.toLowerCase = function toLowerCase() {};

/**
 * <p>Returns a string equal in length to the length of the result of converting
 * this object to a string. The result is a string value, not a <code>String</code>
 * object.</p>
 *
 * <p><em>Note that the <code>toUpperCase</code> function is intentionally generic;
 * it does not require that its this value be a String object. Therefore it can
 * be transferred to other kinds of objects for use as a method.</em></p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method toUpperCase
 * @return {String}
 */
String.prototype.toUpperCase = function () {};

/**
 * <p>When the <code>concat</code> method is called with zero or more arguments
 * string1, string2, etc., it returns a String consisting of the characters of
 * this object (converted to a String) followed by the characters of each of
 * string1, string2, etc. (where each argument is converted to a String). The
 * result is a String value, not a String object.</p>
 *
 * <p>The <code>length</code> property of the <code>concat</code> method is 1.
 * </p>
 *
 * <p><em>The <code>concat</code> function is intentionally generic; it does not
 * require that its <var>this</var> value be a String object. Therefore it can
 * be transferred to other kinds of objects for use as a method. </em></p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method concat
 * @param {String} string1 Required. Any numer of string arguments that needs
 * to be concatened
 * @return {String}
 */
String.prototype.concat = function concat(string1) {};


/**
 * <p>When the <code>localeCompare</code> method is called with one argument
 * <var>that</var>, it returns a Number other than <code>NaN</code> that
 * represents the result of a locale-sensitive String comparison of the this
 * value (converted to a String) with <var>that</var> (converted to a String).
 * The two Strings are <var>this</var> and <var>That</var>. The two Strings are
 * compared in an implementation-defined fashion. The result is intended to
 * order String values in the sort order specified by the system default locale,
 * and will be negative, zero, or positive, depending on whether <var>this</var>
 * comes before <var>That</var> in the sort order, the Strings are equal, or
 * <var>this</var> comes after <code>That</code> in the sort order, respectively.
 * </p>
 *
 * <p>The <code>localeCompare</code> method, if considered as a function of two
 * arguments <var>this</var> and <var>that</var>, is a consistent comparison
 * function on the set of all Strings. Furthermore, <code>localeCompare</code>
 * returns 0 or -0 when comparing two Strings that are considered canonically
 * equivalent by the Unicode standard.</p>
 *
 * <p>The actual return values are implementation-defined to permit implementers
 * to encode additional information in the value, but the function is required
 * to define a total ordering on all Strings and to return 0 when comparing
 * Strings that are considered canonically equivalent by the Unicode standard.
 * </p>
 *
 * <p>If no language-sensitive comparison at all is available from the host
 * environment, this function may perform a bitwise comparison.</p>
 *
 * <p><em>The <code>localeCompare</code> method itself is not directly suitable
 * as an argument to <code>Array.prototype.sort</code> because the latter
 * requires a function of two arguments.</em></p>
 *
 * <p><em>The second parameter to this function is likely to be used in a future
 * version of this standard; it is recommended that implementations do not use
 * this parameter position for anything else.</em></p>
 *
 * <p><em>The <code>localeCompare</code> function is intentionally generic; it
 * does not require that its this value be a String object. Therefore, it can be
 * transferred to other kinds of objects for use as a method.</em></p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method localeCompare
 * @param {String} that Required. The searched string 
 * @return {Number}
 */
String.prototype.localeCompare = function localeCompare(that) {};

/**
 * <p>Works as <code>RegExp.prototype.exec</code></p>
 *
 * <p><em>The <code>match</code> function is intentionally generic; it does not
 * require that its this value be a String object. Therefore, it can be
 * transferred to other kinds of objects for use as a method.</em></p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method match
 * @param {String|RegExp} regexp Required. The pattern
 * @return {Array}
 */
String.prototype.match = function match(regexp) {};

/**
 * <p>replace</p>
 *
 * <p><em>The <code>replace</code> function is intentionally generic; it does
 * not require that its <code>this</code> value be a String object. Therefore,
 * it can be transferred to other kinds of objects for use as a method.</em></p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method replace
 * @param {String|RegExp} searchValue Required.
 * @param {String} replaceValue Required.
 * @return {String}
 */
String.prototype.replace = function replace(searchValue, replaceValue) {};

/**
 * <p>Executes the search for a match between a regular expression and this 
 * <code>String</code> object.</p>
 *
 * <p>If successful, search returns the index of the regular expression inside 
 * the string. Otherwise, it returns -1.</p>
 *
 * <p>When you want to know whether a pattern is found in a string use 
 * <code>search</code> (similar to the regular expression <code>test</code> method); 
 * for more information (but slower execution) use <code>match</code> (similar to 
 * the regular expression <code>exec</code> method).</p>
 *
 * <pre name="code" class="js">
 * function testinput(re, str) {
 * &nbsp;   if (str.search(re) !== -1) {
 * &nbsp;        midstring = " contains ";
 * &nbsp;   } else {
 * &nbsp;       midstring = " does not contain ";
 * &nbsp;   }
 * &nbsp;   document.write (str + midstring + re.source);
 * }
 * </code>
 *
 * <p><em>The <code>search</code> function is intentionally generic; it does
 * not require that its <code>this</code> value be a String object. Therefore,
 * it can be transferred to other kinds of objects for use as a method.</em></p>
 *
 * @ecma 3, 5
 *
 * @method search
 * @param {String|RegEx} regexp Required. A regular expression object. If a 
 * non-RegExp object obj is passed, it is implicitly converted to a 
 * <code>RegExp</code> by using <code>new RegExp(obj)</code>.
 * @return {Array|Number}
 */
String.prototype.search = function search(regexp) {};

/**
 * <p>The <code>slice</code> method takes two arguments, <var>start</var> and
 * <var>end</var>, and returns a substring of the result of converting this
 * object to a String, starting from character position <var>start</var> and
 * running to, but not including, character position <var>end</var> (or through
 * the end of the String if <var>end</var> is undefined). If <var>start</var>
 * is negative, it is treated as <code>sourceLength + start</code> where
 * <var>sourceLength</var> is the length of the String. If <var>end</var> is
 * negative, it is treated as <code>sourceLength + end</code> where
 * <var>sourceLength</var> is the length of the String. The result is a String
 * value, not a String object.</p>
 * 
 * <p>The length property of the slice method is 2.</p>
 *
 * <p><em>The <code>slice</code> function is intentionally generic; it does
 * not require that its <code>this</code> value be a String object. Therefore,
 * it can be transferred to other kinds of objects for use as a method.</em></p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method slice
 * @param {Number} start Required.
 * @param {Number} [end]
 * @return {String}
 */
String.prototype.slice = function slice(start, end) {};


/**
 * substr
 *
 * @ecma 1, 2, 3
 *
 * @method substr
 * @param {Number} start Required.
 * @param {Number} [end]
 * @return {String}
 *
 * @deprecated Not supported in ECMAScript level 5
 */
String.prototype.substr = function substr(start, end) {};

/**
 * toLocaleLowerCase
 *
 * @method toLocaleLowerCase
 * @return {String}
 */
String.prototype.toLocaleLowerCase = function () {};

/**
 * toLocaleUpperCase
 *
 * @method toLocaleUpperCase
 * @return {String}
 */
String.prototype.toLocaleUpperCase = function () {};







/**
 * The Boolean object is an object wrapper for a boolean value.
 *
 * @ecma 1, 2, 3, 5
 *
 * @class Boolean
 * @extends Object
 * @constructor
 * @param {Object} [value] If undefined the value will be false
 * @return {Boolean}
 */
function Boolean( value ) {}

/**
 * The initial value of Boolean.prototype is the built-in Boolean prototype
 * object
 *
 * @ecma 1, 2, 3, 5
 *
 * @property prototype
 * @type Object
 * @static
 */
Boolean.prototype = new Object();

/**
 * The initial value of Boolean.prototype.constructor is the built-in Boolean
 * constructor.
 *
 * @ecma 1, 2, 3, 5
 *
 * @property constructor
 * @type Function
 */
Boolean.prototype.constructor = Boolean;

/**
 * <p>If this boolean value is true, then the string "true" is returned.
 * Otherwise, this boolean value must be false, and the string "false" is
 * returned.</p>
 *
 * <p>The <code>toString</code> function is not generic; it generates a runtime
 * error if its this value is not a Boolean object. Therefore it
 * cannot be transferred to other kinds of objects for use as a method.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method toString
 * @return {String}
 */
Boolean.prototype.toString = function () {};

/**
 * <p>The valueOf function is not generic; it generates a runtime error if its
 * this value is not a Boolean object. Therefore it cannot be transferred to
 * other kinds of objects for use as a method.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method valueOf
 * @return {Boolean} Returns this boolean value.
 */
Boolean.prototype.valueOf = function () {};






/**
 *  The Number object is an object wrapper for a number value.
 *
 * @class Number
 * @extends Object
 * @constructor
 * @param {Object} value
 * @return {Number}
 */
function Number( value ) {}
/**
 * The initial value of Number.prototype is the built-in Number prototype
 * object
 *
 * If value is undefined the internal value is set to +0
 *
 * @ecma 1, 2, 3, 5
 *
 * @static
 * @property prototype
 * @type Object
 */
Number.prototype = new Object();

/**
 * The value of Number.MIN_VALUE is the largest positive finite value of the
 * number type, which is approximately 1.7976931348623157e308.
 *
 * @ecma 1, 2, 3, 5
 *
 * @static
 * @property MAX_VALUE
 * @type Number
 * @default 1.7976931348623157e308
 */
Number.MAX_VALUE =  1.7976931348623157e308;

/**
 * The value of Number.MIN_VALUE is the smallest positive nonzero value of the
 * number type, which is approximately 5e-324.
 *
 * @ecma 1, 2, 3, 5
 *
 * @static
 * @property MIN_VALUE
 * @type Number
 * @default 5e-324
 */
Number.MIN_VALUE = 5e-324;

/**
 * The value of Number.NaN is NaN.
 *
 * @ecma 1, 2, 3, 5
 *
 * @static
 * @property NaN
 * @type Number
 * @default NaN
 */
Number.NaN = NaN;

/**
 * The value of Number.NEGATIVE_INFINITY is -&infin;.
 *
 * @ecma 1, 2, 3, 5
 *
 * @static
 * @property NEGATIVE_INFINITY
 * @type Number
 */
Number.NEGATIVE_INFINITY = -(Infinity);

/**
 * The value of Number.POSITIVE_INFINITY is +&infin;.
 *
 * @ecma 1, 2, 3, 5
 *
 * @static
 * @property POSITIVE_INFINITY
 * @type Number
 */
Number.POSITIVE_INFINITY = Infinity;

/**
 * The initial value of Number.prototype.constructor is the built-in Number
 * constructor.
 *
 * @ecma 1, 2, 3, 5
 *
 * @property constructor
 * @type Function
 */
Number.prototype.constructor = Number;

/**
 * <p>If the radix is the number 10 or not supplied, then this number value is
 * given as an argument to the ToString operator; the resulting string value
 * is returned.</p>
 *
 * <p>If the radix is supplied and is an integer from 2 to 36, but not 10, the 
 * result is a string, the choice of which is implementation dependent.</p>
 *
 * <p>The toString function is not generic; it generates a runtime error if its
 * this value is not a Number object. Therefore it cannot be transferred to
 * other kinds of objects for use as a method</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method toString
 * @param {Number} [radix]
 * @return {String}
 */
Number.prototype.toString = function (radix) {};

/**
 * <p>Produces a String value that represents this Number value formatted
 * according to the conventions of the host environment's current locale. This
 * function is implementation-dependent, and it is permissible, but not
 * encouraged, for it to return the same thing as <code>toString</code>.</p>
 *
 * <p><em>The first parameter to this function is likely to be used in a future
 * version of this standard; it is recommended that implementations do not use
 * this parameter position for anything else.</em></p>
 * 
 * @ecma 3, 5
 *
 * @method toLocaleString
 * @return {String}
 */
Number.prototype.toLocaleString = function () {};

/**
 * <p>Returns this number value.<p>
 *
 * <p>The valueOf function is not generic; it generates a runtime error if its
 * this value is not a Number object. Therefore it cannot be transferred to
 * other kinds of objects for use as a method.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method valueOf
 * @return {Number} Returns this number value.
 */
Number.prototype.valueOf = function () {};

/**
 * <p>Return a String containing this Number value represented in decimal
 * fixed-point notation with <var>fractionDigits</var> digits after the decimal
 * point. If <var>fractionDigits</var> is undefined, 0 is assumed.</p>
 *
 * @ecma 3, 5
 *
 * @method toFixed
 * @throws {RangeError} If <var>fractionDigits</var> greater than 20 or lesser
 * than 0
 * @param {Number} [fractionDigits] Default to 0
 * @return {String}
 */
Number.prototype.toFixed = function ( fractionDigits ) {};

/**
 * <p>Return a String containing this Number value represented in decimal
 * exponential notation with one digit before the significand's decimal point
 * and <var>fractionDigits</var> digits after the significand's decimal point.
 * If <var>fractionDigits</var> is undefined, include as many significand digits
 * as necessary to uniquely specify the Number (just like in
 * <code>toString</code> except that in this case the Number is always output in
 * exponential notation).</p>
 *
 * @ecma 3, 5
 *
 * @method toExponential
 * @param {Number} [fractionDigits]
 * @return {String}
 */
Number.prototype.toExponential = function ( fractionDigits ) {};

/**
 * <p>Return a String containing this Number value represented either in decimal
 * exponential notation with one digit before the significand's decimal point
 * and <code>precision-1</code> digits after the significand's decimal point or
 * in decimal fixed notation with <var>precision</var> significant digits. If
 * <var>precision</var> is undefined, call <code>toString</code> instead.</p>
 *
 * @ecma 3, 5
 *
 * @method toPrecision
 * @param {Number} [precision]
 * @return {String}
 */
Number.prototype.toPrecision = function ( precision ) {};







/**
 * <p>A Date object contains a number indicating a particular instant in time to
 * within a millisecond. The number may also be <code>NaN</code>, indicating
 * that the Date object does not represent a specific instant of time.</p>
 *
 * <p><strong>Time Values and Time Range </strong><p>
 *
 * <p>A Date object contains a Number indicating a particular instant in time
 * to within a millisecond. Such a Number is called a <em>time value</em>. A
 * time value may also be <code>NaN</code>, indicating that the Date object
 * does not represent a specific instant of time.</p>
 *
 * <p>Time is measured in ECMAScript in milliseconds since 01 January, 1970 UTC.
 * In time values leap seconds are ignored. It is assumed that there are exactly
 * 86,400,000 milliseconds per day. ECMAScript Number values can represent all
 * integers from -9,007,199,254,740,991 to 9,007,199,254,740,991; <em>this range
 * suffices to measure times to millisecond precision for any instant that is
 * within approximately <strong>285,616 years</strong>, either forward or
 * backward, from 01 January, 1970 UTC.</em></p>
 *
 * <p>The actual range of times supported by ECMAScript Date objects is
 * slightly smaller: exactly -100,000,000 days to 100,000,000 days measured
 * relative to midnight at the beginning of 01 January, 1970 UTC. This gives a
 * range of 8,640,000,000,000,000 milliseconds to either side of 01 January,
 * 1970 UTC.</p>
 *
 * <p>The exact moment of midnight at the beginning of 01 January, 1970 UTC is
 * represented by the value <strong>+0</strong>.</p>
 *
 * <p><strong>Date Time String Format (ES5)</strong></p>
 *
 * <p>ECMAScript defines a string interchange format for date-times based upon a
 * simplification of the ISO 8601 Extended Format. The format is as follows:
 * <samp>YYYY-MM-DDTHH:mm:ss.sssZ</samp>
 * Where the fields are as follows: </p>
 * <ul>
 *   <li><strong>YYYY</strong> is the decimal digits of the year in the
 *   Gregorian calendar.</li>
 *   <li><strong>-</strong>  "-" (hyphon) appears literally twice in the string.
 *   </li>
 *   <li><strong>MM</strong> is the month of the year from 01 (January) to 12
 *   (December).</li>
 *   <li><strong>DD</strong> is the day of the month from 01 to 31.</li>
 *   <li><strong>T</strong> "T" appears literally in the string, to indicate the
 *   beginning of the time element.</li>
 *   <li><strong>HH</strong> is the number of complete hours that have passed
 *   since midnight as two decimal digits.</li>
 *   <li><strong>:</strong> ":" (colon) appears literally twice in the string.
 *   </li>
 *   <li><strong>mm</strong> is the number of complete minutes since the start
 *   of the hour as two decimal digits.</li>
 *   <li><strong>ss</strong> is the number of complete seconds since the start
 *   of the minute as two decimal digits.</li>
 *   <li><strong>.</strong> "." (dot) appears literally in the string.</li>
 *   <li<strong>>sss</strong> is the number of complete milliseconds since the
 *   start of the second as three decimal digits. Both the "." and the
 *   milliseconds field may be omitted.</li>
 *   <li><strong>Z</strong> is the time zone offset specified as
 *   "<strong>Z</strong>" (for UTC) or either "+" or "-" followed by a time
 *   expression <samp>hh:mm</samp></li>
 * </ul>
 * 
 * <p>This format includes date-only forms:</p>
 * <ul>
 *   <li>YYYY</li>
 *   <li>YYYY-MM</li>
 *   <li>YYYY-MM-DD</li>
 * </ul>
 * 
 * <p>It also includes time-only forms with an optional time zone offset
 * appended:</p>
 * <ul>
 *   <li>THH:mm</li>
 *   <li>THH:mm:ss</li>
 *   <li>THH:mm:ss.sss</li>
 * </ul>
 * 
 * <p>Also included are "date-times" which may be any combination of the above.
 * All numbers must be base 10. Illegal values (out-of-bounds as well as syntax
 * errors) in a format string means that the format string is not a valid
 * instance of this format.</p>
 * 
 * <p><em>As every day both starts and ends with midnight, the two notations
 * <samp>00:00</samp> and <samp>24:00</samp> are available to distinguish the
 * two midnights that can be associated with one date. This means that the
 * following two notations refer to exactly the same point in time:
 * <samp>1995-02-04T24:00</samp> and <samp>1995-02-05T00:00</samp></em></p>
 * 
 * <p><em>There exists no international standard that specifies abbreviations
 * for civil time zones like CET, EST, etc. and sometimes the same abbreviation
 * is even used for two very different time zones. For this reason, ISO 8601
 * and this format specifies numeric representations of date and time.</em></p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @class Date
 * @extends Object
 *
 * @constructor test
 * @param {Number|String} [yearOrDateTimeString] If there is :
 * <ul>
 *   <li><strong>no argument</strong>: the value is set to the time value
 *   (UTC) identifying the current time.</li>
 *   <li><strong>1 argument</strong>: it will be parse as using
 *   <code>Date.parse(</code>)</li>
 *   <li><strong>2 to 7 arguments</strong>, this one is interpreted as the year
 *   of the date</li>
 * </ul>
 * @param {Number|String} [month]
 * @param {Number} [date] Default value: 1
 * @param {Number} [hour] Default value: 0 (midnight)
 * @param {Number} [minutes] Default value: 0
 * @param {Number} [seconds] Default value: 0
 * @param {Number} [ms] Default value: 0
 */
function Date( yearOrDateTimeString, month, date, hour, minutes, seconds, ms ) {}

/**
 * The initial value of Date.prototype is the built-in Date prototype object
 *
 * @ecma 1, 2, 3, 5
 *
 * @static
 * @property prototype
 * @type Object
 */
Date.prototype = new Object();

/**
 * <p>The <var>parse</var> function applies the ToString operator to its 
 * argument and interprets the resulting string as a date; it returns a number, 
 * the UTC time value corresponding to the date. The string may be interpreted 
 * as a local time, a UTC time, or a time in some other time zone, depending on 
 * the contents of the string.</p>
 *
 * <p>If <var>x</var> is any Date object whose milliseconds amount is zero
 * within a particular implementation of ECMAScript, then all of the following
 * expressions should produce the same numeric value in that implementation, if
 * all the properties referenced have their initial values: </p>
 *
 * <ul>
 *   <li><code>x.valueOf() </code></li>
 *   <li><code>Date.parse(x.toString()) </code></li>
 *   <li><code>Date.parse(x.toGMTString()) </code></li>
 * </ul>
 *
 * <p>However, the expression</p>
 * 
 * <ul>
 *   <li><code>Date.parse(x.toLocaleString()) </code></li>
 * </ul>
 *
 * <p>is not required to produce the same number value as the preceding three
 * expressions and, in general, the value produced by Date.parse is
 * implementation dependent when given any string value that could not be
 * produced in that implementation by the toString or toGMTString method. </p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @static
 * @method parse
 * @param {String} string Required.
 * @return {Date}
 */
Date.parse = function ( string ) {};

/**
 * The <code>now</code> function return a Number value that is the time value
 * designating the UTC date and time of the occurrence of the call to
 * <code>now</code>.
 *
 * @ecma 5
 *
 * @static
 * @method now
 * @return {Date}
 */
Date.now = function () {};

/**
 * <p>When the <code>UTC</code> function is called with fewer than two
 * arguments, the behaviour is implementation-dependent.<br>
 * When the <code>UTC</code> function is called with two to seven arguments, it
 * computes the date from <var>year</var>, <var>month</var> and (optionally)
 * <var>date</var>, <var>hours</var>, <var>minutes</var>, <var>seconds</var>
 * and <var>ms</var>.</p>

 * <p>The <code>UTC</code> function differs from the Date constructor in two
 * ways: it returns a time value as a number, rather than creating a Date
 * object, and it interprets the arguments in UTC rather than as local time.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @static
 * @method UTC
 * @param {Number} year Required.
 * @param {Number} month  Required.
 * @param {Number} [date]
 * @param {Number} [hours]
 * @param {Number} [minutes]
 * @param {Number} [seconds]
 * @param {Number} [ms]
 * @return {Date}
 */
Date.UTC = function ( year, month, date, hours, minutes, seconds, ms ) {};

/**
 * The initial value of <code>Date.prototype</code> is the built-in Date
 * prototype object.
 *
 * @ecma 1, 2, 3, 5
 *
 * @property constructor
 * @type Object
 */
Date.prototype.constructor = Date;

/**
 * <p>This function returns a string value. The contents of the string are
 * implementation dependent, but are intended to represent the Date in a
 * convenient, human-readable form in the current time zone. </p>
 *
 * <p>The <code>toString</code> function is not generic; it generates a runtime
 * error if its <code>this</code> value is not a Date object. Therefore it
 * cannot be transferred to other kinds of objects for use as a method.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method toString
 * @return {String}
 */
Date.prototype.toString = function () {};

/**
 * <p>The <code>valueOf</code> function returns a number, which is this time
 * value.</p>
 *
 * <p>The <code>valueOf</code> function is not generic; it generates a runtime
 * error if its <code>this</code> value is not a Date object. Therefore it
 * cannot be transferred to other kinds of objects for use as a method.</p>
 *
 * @ecma 1, 2, 3, 5
 *
 * @method valueOf
 * @return {Number}
 */
Date.prototype.valueOf = function () {};

/**
 * <p>Return this time value</p>
 *
 * @ecma 1, 2, 3
 *
 * @method getTime
 * @return {Number}
 */
Date.prototype.getTime = function () {};

/**
 * <p>Return the Year in 2 digits</p>
 *
 * <p>This function is specified here for backwards compatibility only. The
 * function getFullYear is much to be preferred for nearly all purposes, because
 * it avoids the "year 2000 problem."</p>
 *
 * @ecma 1, 2, 3
 *
 * @method getYear
 * @return {Number}
 *
 * @deprecated Use getFullYear instead
 */
Date.prototype.getYear = function () {};

/**
 * Return the Year in 4 digits
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getFullYear
 * @return {Number}
 */
Date.prototype.getFullYear = function () {};

/**
 * getUTCFullYear
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getUTCFullYear
 * @return {Number}
 */
Date.prototype.getUTCFullYear = function () {};

/**
 * Set this time value.
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setTime
 * @throws {Error} If the this value is not an object whose constructor is Date
 * @param {Number} time
 */
Date.prototype.setTime = function ( time ) {};

/**
 * getMonth
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getMonth
 * @return {Number}
 */
Date.prototype.getMonth = function () {};

/**
 * getUTCMonth
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getUTCMonth
 * @return {Number}
 */
Date.prototype.getUTCMonth = function () {};

/**
 * getDate
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getDate
 * @return {Number}
 */
Date.prototype.getDate = function () {};

/**
 * getUTCDate
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getUTCDate
 * @return {Number}
 */
Date.prototype.getUTCDate = function () {};

/**
 * getDay
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getDay
 * @return {Number}
 */
Date.prototype.getDay = function () {};

/**
 * getUTCDay
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getUTCDay
 * @return {Number}
 */
Date.prototype.getUTCDay = function () {};

/**
 * getHours
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getHours
 * @return {Number}
 */
Date.prototype.getHours = function () {};

/**
 * getUTCHours
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getUTCHours
 * @return {Number}
 */
Date.prototype.getUTCHours = function () {};

/**
 * getMinutes
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getMinutes
 * @return {Number}
 */
Date.prototype.getMinutes = function () {};

/**
 * getUTCMinutes
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getUTCMinutes
 * @return {Number}
 */
Date.prototype.getUTCMinutes = function () {};

/**
 * getSeconds
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getSeconds
 * @return {Number}
 */
Date.prototype.getSeconds = function () {};

/**
 * getUTCSeconds
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getUTCSeconds
 * @return {Number}
 */
Date.prototype.getUTCSeconds = function () {};

/**
 * getMilliseconds
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getMilliseconds
 * @return {Number}
 */
Date.prototype.getMilliseconds = function () {};

/**
 * getUTCMilliseconds
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getUTCMilliseconds
 * @return {Number}
 */
Date.prototype.getUTCMilliseconds = function () {};

/**
 * getTimezoneOffset
 *
 * @ecma 1, 2, 3, 5
 *
 * @method getTimezoneOffset
 * @return {Number}
 */
Date.prototype.getTimezoneOffset = function () {};

/**
 * setMilliseconds
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setMilliseconds
 * @param {Number} ms Required.
 */
Date.prototype.setMilliseconds = function ( ms ) {};

/**
 * setUTCMilliseconds
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setUTCMilliseconds
 * @param {Number} ms Required.
 */
Date.prototype.setUTCMilliseconds = function ( ms ) {};

/**
 * setSeconds
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setSeconds
 * @param {Number} sec Required.
 * @param {Number} [ms]
 */
Date.prototype.setSeconds = function ( sec, ms ) {};

/**
 * setUTCSeconds
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setUTCSeconds
 * @param {Number} sec Required.
 * @param {Number} [ms]
 */
Date.prototype.setUTCSeconds = function ( sec, ms ) {};

/**
 * setMinutes
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setMinutes
 * @param {Number} min Required.
 * @param {Number} [sec]
 * @param {Number} [ms]
 */
Date.prototype.setMinutes = function ( min, sec, ms ) {};

/**
 * setUTCMinutes
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setUTCMinutes
 * @param {Number} min Required.
 * @param {Number} [sec]
 * @param {Number} [ms]
 */
Date.prototype.setUTCMinutes = function ( min, sec, ms ) {}

/**
 * setHours
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setHours
 * @param {Number} hour Required.
 * @param {Number} [min]
 * @param {Number} [sec]
 * @param {Number} [ms]
 */
Date.prototype.setHours = function ( hour, min, sec, ms ) {};

/**
 * setUTCHours
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setUTCHours
 * @param {Number} hour Required.
 * @param {Number} [min]
 * @param {Number} [sec]
 * @param {Number} [ms]
 */
Date.prototype.setUTCHours = function ( hour, min, sec, ms ) {};

/**
 * setDate
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setDate
 * @param {Number} date Required.
 */
Date.prototype.setDate = function ( date ) {};

/**
 * setUTCDate
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setUTCDate
 * @param {Number} date Required.
 */
Date.prototype.setUTCDate = function ( date ) {};

/**
 * setMonth
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setMonth
 * @param {Number} month Required.
 * @param {Number} [date]
 */
Date.prototype.setMonth = function ( month, date ) {};

/**
 * setUTCMonth
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setUTCMonth
 * @param {Number} month Required.
 * @param {Number} [date]
 */
Date.prototype.setUTCMonth = function ( month, date ) {};

/**
 * setFullYear
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setFullYear
 * @param {Number} year Required.
 * @param {Number} [month]
 * @param {Number} [date]
 */
Date.prototype.setFullYear = function ( year, month, date ) {};

/**
 * setUTCFullYear
 *
 * @ecma 1, 2, 3, 5
 *
 * @method setUTCFullYear
 * @param {Number} year Required.
 * @param {Number} [month]
 * @param {Number} [date]
 */
Date.prototype.setUTCFullYear = function ( year, month, date ) {};

/**
 * This function is specified here for backwards compatibility only. The
 * function <code>setFullYear</code> is much to be preferred for nearly all
 * purposes, because it avoids the "year 2000 problem."
 *
 * @ecma 1, 2, 3
 *
 * @method setYear
 * @param {Number} year Required.
 * @param {Number} [month]
 * @param {Number} [date]
 *
 * @deprecated use <code>setFullYear()</code> instead
 */
Date.prototype.setYear = function ( year, month, date ) {};

/**
 * <p>This function returns a String value. The contents of the String are
 * implementation-dependent, but are intended to represent the Date in the
 * current time zone in a convenient, human-readable form that corresponds to
 * the conventions of the host environment's current locale.</p>
 *
 * <p><em>The first parameter to this function is likely to be used in a future
 * version of this standard; it is recommended that implementations do not use
 * this parameter position for anything else.</em></p>
 *
 * @ecma 1, 2, 3, 4, 5
 *
 * @method toLocaleString
 * @return {String}
 */
Date.prototype.toLocaleString = function () {};

/**
 * This function returns a string value. The contents of the string are
 * implementation dependent, but are intended to represent the Date in a
 * convenient, human-readable form in UTC.
 *
 * @ecma 1, 2, 3, 5
 *
 * @method toUTCString
 * @return {String}
 */
Date.prototype.toUTCString = function () {};

/**
 * <p>This function returns a String value represent the instance in time
 * represented by this Date object. The format of the String is the simplified 
 * ISO 8601 Date Time string format.</p>
 *
 * <p>All fields are present in the String. The time zone is always UTC,
 * denoted by the suffix Z.</p>
 *
 * @ecma 5
 *
 * @method toISOString
 * @throws {RangeError} If the time value of this object is not a finite Number
 * @return {String}
 */
Date.prototype.toISOString = function () {};

/**
 * <p>This function provides a String representation of a Date object for use by
 * <code>JSON.stringify</code>.</p>
 *
 * <p><em>The argument is ignored.</em></p>
 *
 * <p><em>The <code>toJSON</code> function is intentionally generic; it does not
 * require that its this value be a Date object. Therefore, it can be
 * transferred to other kinds of objects for use as a method. However, it does
 * require that any such object have a <code>toISOString</code> method. An
 * object is free to use the argument key to filter its stringification.</em>
 * </p>
 *
 * @ecma 5
 *
 * @method toJSON
 * @param {Object} [key] Not used
 * @return {String}
 */
Date.prototype.toJSON = function (key) {};

/**
 * The function object that is the initial value of
 * <code>Date.prototype.toGMTString</code> is the same function object that is
 * the initial value of <code>Date.prototype.toUTCString</code>. The
 * <code>toGMTString</code> property is provided principally for compatibility
 * with old code. It is recommended that the <code>toUTCString</code> property
 * be used in new ECMAScript code.
 *
 * @ecma 1, 2, 3
 *
 * @method toGMTString
 * @return {String}
 *
 * @deprecated use <code>toUTCString</code> instead
 */
Date.prototype.toGMTString = Date.prototype.toUTCString;

/**
 * <p>This function returns a String value. The contents of the String are
 * implementation-dependent, but are intended to represent the "date" portion of
 * the Date in the current time zone in a convenient, human-readable form.</p>
 *
 * @ecma 1, 2, 3, 4, 5
 *
 * @method toDateString
 * @return {String}
 */
Date.prototype.toDateString = function () {};

/**
 * <p>This function returns a String value. The contents of the String are
 * implementation-dependent, but are intended to represent the "time" portion
 * of the Date in the current time zone in a convenient, human-readable form.
 * </p>
 *
 * @ecma 1, 2, 3, 4, 5
 *
 * @method toTimeString
 * @return {String}
 */
Date.prototype.toTimeString = function () {};

/**
 * <p>This function returns a String value. The contents of the String are
 * implementation-dependent, but are intended to represent the "date" portion of 
 * the Date in the current time zone in a convenient, human-readable form that
 * corresponds to the conventions of the host environment's current locale.</p>
 *
 * <p><em>The first parameter to this function is likely to be used in a future
 * version of this standard; it is recommended that implementations do not use
 * this parameter position for anything else.</em></p>
 *
 * @ecma 1, 2, 3, 4, 5
 *
 * @method toLocaleDateString
 * @return {String}
 */
Date.prototype.toLocaleDateString = function () {};

/**
 *
 * <p>This function returns a String value. The contents of the String are
 * implementation-dependent, but are intended to represent the "time" portion of
 * the Date in the current time zone in a convenient, human-readable form that
 * corresponds to the conventions of the host environment's current locale.</p>
 *
 * <p><em>The first parameter to this function is likely to be used in a future
 * version of this standard; it is recommended that implementations do not use
 * this parameter position for anything else.</em></p>
 *
 * @ecma 1, 2, 3, 4, 5
 *
 * @method toLocaleTimeString
 * @return {String}
 */
Date.prototype.toLocaleTimeString = function () {};









/**
 * The RegExp class
 *
 * @class RegExp
 * @extends Object
 * @constructor
 * @param {String} pattern
 * @param {String} flags
 */
function RegExp( pattern, flags ) {

    /**
     * source
     *
     * @property source
     * @type String
     */
    this.source = "";

    /**
     * global
     *
     * @property global
     * @type Boolean
     */
    this.global = false;

    /**
     * ignoreCase
     *
     * @property ignoreCase
     * @type Boolean
     */
    this.ignoreCase = false;

    /**
     * multiline
     *
     * @property multiline
     * @type Boolean
     */
    this.multiline = false;

    /**
     * lastIndex
     *
     * @property lastIndex
     * @type Boolean
     */
    this.lastIndex = 0;
}
RegExp.prototype = new Object();
RegExp.prototype.constructor = RexExp;

/**
 * exec
 * 
 * @method exec
 * @param {String} string
 * @return {Boolean}
 */
RegExp.prototype.exec = function ( string ) {};

/**
 * test
 *
 * @method test
 * @param {String} string
 * @return {Boolean}
 */
RegExp.prototype.test = function ( string ) {};










/**
 * The Error class
 *
 * @ecma 3, 5
 *
 * @class Error
 * @extends Object
 */
function Error( message ) {}

/**
 * prototype
 *
 * @ecma 3, 5
 *
 * @static
 * @property prototype
 * @type Object
 */
Error.prototype = new Object();

/**
 * constructor
 *
 * @ecma 3, 5
 *
 * @property constructor
 * @type Function
 * @default Error
 */
Error.prototype.constructor = Error;

/**
 * name
 *
 * @ecma 3, 5
 *
 * @property name
 * @default 'Error'
 * @type String
 */
Error.prototype.name = 'Error';

/**
 * message
 *
 * @ecma 3, 5
 *
 * @property message
 * @default ''
 * @type String
 */
Error.prototype.message = '';


if (!'forEach' in Array.prototype) {
    Array
}



/**
 * The EvalError class
 *
 * @ecma 3, 5
 *
 * @class EvalError
 * @extends Error
 */
function EvalError () {}

/**
 * prototype
 *
 * @ecma 3, 5
 *
 * @static
 * @property prototype
 * @type Object
 */
EvalError.prototype = new Error();

/**
 * constructor
 *
 * @ecma 3, 5
 *
 * @property constructor
 * @type Function
 * @default EvalError
 */
EvalError.prototype.constructor = EvalError;

/**
 * name
 *
 * @ecma 3, 5
 *
 * @property name
 * @default 'EvalError'
 * @type String
 */
EvalError.prototype.name = 'EvalError';






/**
 * The RangeError class
 *
 * @ecma 3, 5
 *
 * @class RangeError
 * @extends Error
 */
function RangeError () {}

/**
 * prototype
 *
 * @ecma 3, 5
 *
 * @static
 * @property prototype
 * @type Object
 */
RangeError.prototype = new Error();

/**
 * constructor
 *
 * @ecma 3, 5
 *
 * @property constructor
 * @type Function
 * @default RangeError
 */
RangeError.prototype.constructor = RangeError;

/**
 * name
 *
 * @ecma 3, 5
 *
 * @property name
 * @default 'EvalError'
 * @type String
 */
RangeError.prototype.name = 'RangeError';






/**
 * The ReferenceError class
 *
 * @ecma 3, 5
 *
 * @class ReferenceError
 * @extends Error
 */
function ReferenceError () {}

/**
 * prototype
 *
 * @ecma 3, 5
 *
 * @static
 * @property prototype
 * @type Object
 */
ReferenceError.prototype = new Error();

/**
 * constructor
 *
 * @ecma 3, 5
 *
 * @property constructor
 * @type Function
 * @default ReferenceError
 */
ReferenceError.prototype.constructor = ReferenceError;

/**
 * name
 *
 * @ecma 3, 5
 *
 * @property name
 * @default 'ReferenceError'
 * @type String
 */
ReferenceError.prototype.name = 'ReferenceError';






/**
 * The SyntaxError class
 *
 * @ecma 3, 5
 *
 * @class SyntaxError
 * @extends Error
 */
function SyntaxError () {}

/**
 * prototype
 *
 * @ecma 3, 5
 *
 * @static
 * @property prototype
 * @type Object
 */
SyntaxError.prototype = new Error();

/**
 * constructor
 *
 * @ecma 3, 5
 *
 * @property constructor
 * @type Function
 * @default SyntaxError
 */
SyntaxError.prototype.constructor = SyntaxError;

/**
 * name
 *
 * @ecma 3, 5
 *
 * @property name
 * @default 'SyntaxError'
 * @type String
 */
SyntaxError.prototype.name = 'SyntaxError';









/**
 * The TypeError class
 *
 * @ecma 3, 5
 *
 * @class TypeError
 * @extends Error
 */
function TypeError () {}

/**
 * prototype
 *
 * @ecma 3, 5
 *
 * @static
 * @property prototype
 * @type Object
 */
TypeError.prototype = new Error();

/**
 * constructor
 *
 * @ecma 3, 5
 *
 * @property constructor
 * @type Function
 * @default TypeError
 */
TypeError.prototype.constructor = TypeError;

/**
 * name
 *
 * @ecma 3, 5
 *
 * @property name
 * @default 'TypeError'
 * @type String
 */
TypeError.prototype.name = 'TypeError';









/**
 * The URIError class
 *
 * @class URIError
 * @extends Error
 */
function URIError () {}

/**
 * prototype
 *
 * @static
 * @property prototype
 * @type Object
 */
URIError.prototype = new Error();

/**
 * constructor
 *
 * @property constructor
 * @type Function
 * @default URIError
 */
URIError.prototype.constructor = URIError;

/**
 * name
 *
 * @property name
 * @default 'URIError'
 * @type String
 */
URIError.prototype.name = 'URIError';





/**
 * <p>The void Operator</p>
 *
 * <code>void UnaryExpression</code>
 *
 * <p>Evaluate <em>UnaryExpression</em>, and return <strong>undefined</strong>
 * </p>
 *
 * @class void
 */


/**
 * The Null type has exactly one value, called <strong>null</strong>.
 *
 * @class Null
 */


/**
 * <p>The type whose sole value is the <strong>undefined</strong> value.</p>
 *
 * <p>Any variable that has not been assigned a value has the value
 * <strong>undefined</strong>.</p>
 *
 * @class Undefined
 */


    /**
     * The Math object is merely a single object that has some named properties,
     * some of which are functions.
     *
     * @ecma 1, 2, 3, 5
     *
     * @class Math
     * @extends Object
     * @type Object
     */
Math = {

            /**
             * The number value for &#x0065;, the base of the natural logarithms, which is
             * approximately 2.7182818284590452354.
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @property E
             * @type Number
             * @default 2.718281828459045
             */
            E : 2.718281828459045,

            /**
             * The number value for the natural logarithm of 10, which is approximately
             * 2.302585092994046.
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @property LN10
             * @type Number
             * @default 2.302585092994046
             */
            LN10 : 2.302585092994046,

            /**
             * The number value for the natural logarithm of 2, which is approximately
             * 0.6931471805599453.
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @property LN2
             * @type Number
             * @default 0.6931471805599453
             */
            LN2 : 0.6931471805599453,

            /**
             * The number value for the base-2 logarithm of e, the base of the natural
             * logarithms; this value is approximately 1.4426950408889634
             * (Note that the value of <code>Math.LOG2E</code> is approximately the
             * reciprocal of the value of <code>Math.LN2</code>)
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @property LOG2E
             * @type Number
             * @default 1.4426950408889634
             */
            LOG2E : 1.4426950408889634,

            /**
             * The number value for the base-10 logarithm of e, the base of the natural
             * logarithms; this value is approximately 0.4342944819032518
             * . (Note that the value of <code>Math.LOG10E</code> is approximately the
             * reciprocal of the value of <code>Math.LN10</code>.)
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @property LOG10E
             * @type Number
             * @default 0.4342944819032518
             */
            LOG10E : 0.4342944819032518,

            /**
             * The number value for &pi;, the ratio of the circumference of a circle to
             * its diameter, which is approximately
             * 3.14159265358979323846
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @property PI
             * @type Number
             * @default 3.14159265358979323846
             */
            PI : 3.14159265358979323846,

            /**
             * The number value for the square root of 1/2, which is approximately
             * 0.7071067811865476. (Note that the value of
             * <code>Math.SQRT1_2</code> is approximately the reciprocal of the value of
             *  <code>Math.SQRT2</code>.)
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @property SQRT1_2
             * @type {Number}
             */
            SQRT1_2 : 0.7071067811865476,

            /**
             * The number value for the square root of 2, which is approximately
             * 1.4142135623730951.
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @property SQRT2
             * @type Number
             * @default 1.4142135623730951
             */
            SQRT2 : 1.4142135623730951,

            /**
             * Returns the absolute value of its argument; in general, the result has
             * the same magnitude as the argument but has positive sign.
             *
             * <ul>
             *   <li>If the argument is NaN, the result is NaN.</li>
             *   <li>If the argument is -0, the result is +0.</li>
             *   <li>If the argument is -&infin;, the result is +&infin;.</li>
             * </ul>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method abs
             * @param {Number} x Required.
             * @return {Number}
             */
            abs : function( x ) {},

            /**
             * Returns an implementation-dependent approximation to the arc cosine of
             * the argument. The result is expressed in radians and ranges from
             * +0 to +&pi;.
             *
             * <ul>
             *   <li>If the argument is NaN, the result is NaN.</li>
             *   <li>If the argument is greater than 1, the result is NaN.</li>
             *   <li>If the argument is lesser than -1, the result is NaN.</li>
             *   <li>If the argument is exactly 1, the result is +0.</li>
             * </ul>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method acos
             * @param {Number} x Required.
             * @return {Number}
             */
            acos : function( x ) {},

            /**
             * Returns an implementation-dependent approximation to the arc sine of the
             * argument. The result is expressed in radians and ranges from
             * -&pi;/2 to +&pi;/2.
             *
             * <ul>
             *   <li>If the argument is NaN, the result is NaN.</li>
             *   <li>If the argument is greater than 1, the result is NaN.</li>
             *   <li>If the argument is lesser than -1, the result is NaN.</li>
             *   <li>If the argument is +0, the result is +0.</li>
             *   <li>If the argument is -0, the result is -0.</li>
             * </ul>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method asin
             * @param {Number} x Required.
             * @return {Number}
             */
            asin : function( x ) {},

            /**
             * Returns an implementation-dependent approximation to the arc tangent of
             * the argument. The result is expressed in radians and ranges from
             * -&pi;/2 to +&pi;/2.
             *
             * <ul>
             *   <li>If the argument is NaN, the result is NaN.</li>
             *   <li>If the argument is +0, the result is +0.</li>
             *   <li>If the argument is -0, the result is -0.</li>
             *   <li>If the argument is +&infin;, the result is an
             *   implementation-dependent approximation to +&pi;/2</li>
             *   <li>If the argument is -&infin;, the result is an
             *   implementation-dependent approximation to -&pi;/2</li>
             * </ul>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method atan
             * @param {Number} x Required.
             * @return {Number}
             */
            atan : function( x ) {},

            /**
             * Returns an implementation-dependent approximation to the arc tangent of
             * the quotient <code>y/x</code> of the arguments <code>y</code> and
             * <code>x</code>, where the signs of the arguments are used to determine
             * the quadrant of the result. Note that it is intentional and traditional
             * for the two-argument arc tangent function that the argument named
             * <code>y</code> be first and the argument named <code>x</code> be second.
             * The result is expressed in radians and ranges from -&pi;
             * to +&pi;.
             *
             * <ul>
             *   <li>If either argument is NaN, the result is NaN.</li>
             *
             *   <li>If <code>y&gt;0</code> and <var>x</var> is +0, the
             *   result is an implementation-dependent approximation to
             *   +&pi;/2.</li>
             *   <li>If <code>y&gt;0</code> and <code>x</code> is -0, the
             *   result is an implementation-dependent approximation to
             *   <code>+&pi;/2</code>.</li>
             *
             *   <li>If <var>y</var> is +0 and <code>x&gt;0</code>, the
             *   result is +0.</li>
             *   <li>If <var>y</var> is +0 and <var>x</var> is
             *   +0, the result is +0.</li>
             *   <li>If <var>y</var> is +0 and <var>x</var> is
             *   -0, the result is an implementation-dependent
             *   approximation to +&pi;.</li>
             *   <li>If <var>y</var> is +0 and <code>x&lt;0</code>,
             *   the result is an implementation-dependent approximation to
             *   +&pi;.</li>
             *
             *   <li>If <var>y</var> is -0 and <code>x&gt;0</code>, the
             *   result is -0.</li>
             *   <li>If <var>y</var> is -0 and <var>x</var> is
             *   +0, the result is -0.</li>
             *   <li>If <var>y</var> is -0 and <var>x</var> is
             *   -0, the result is an implementation-dependent
             *   approximation to -&pi;.</li>
             *   <li>If <var>y</var> is -0 and <code>x&lt;0</code>,
             *   the result is an implementation-dependent approximation to
             *   -&pi;.</li>
             *
             *   <li>If <code>y&lt;0</code> and <var>x</var> is +0, the
             *   result is an implementation-dependent approximation to
             *   -&pi;/2.</li>
             *   <li>If <code>y&lt;0</code> and <var>x</var> is -0, the
             *   result is an implementation-dependent approximation to
             *   -&pi;/2.</li>
             *
             *   <li>If <code>y&gt;0</code> and <var>y</var> is finite and
             *   <code>x</code> is +&infin;, the result is
             *   +0.</li>
             *   <li>If <code>y&gt;0</code> and <var>y</var> is finite and
             *   <var>x</var> is -&infin;, the result is an
             *   implementation-dependent approximation to +&pi;.</li>
             *
             *   <li>If <code>y&lt;0</code> and <var>y</var> is finite and
             *   <var>x</var> is +&infin;, the result is
             *   -0.</li>
             *   <li>If <code>y&lt;0</code> and <var>y</var> is finite and
             *   <var>x</var> is -&infin;, the result is an
             *   implementation-dependent approximation to -&pi;.</li>
             *
             *   <li>If <var>y</var> is +&infin; and
             *   <var>x</var> is finite, the result is an implementation-dependent
             *   approximation to +&pi;/2.</li>
             *   <li>If <var>y</var> is -&infin; and
             *   <var>x</var> is finite, the result is an implementation-dependent
             *   approximation to -&pi;/2.</li>
             *
             *   <li>If <var>y</var> is +&infin; and
             *   <var>x</var> is +&infin;, the result is an
             *   implementation-dependent approximation to +&pi;/4.</li>
             *   <li>If <var>y</var> is +&infin; and
             *   <var>x</var> is -&infin;, the result is an
             *   implementation-dependent approximation to +3&pi;/4.</li>
             *   <li>If <var>y</var> is -&infin; and
             *   <var>x</var> is +&infin;, the result is an
             *   implementation-dependent approximation to -&pi;/4.</li>
             *   <li>If <var>y</var> is -&infin; and
             *   <var>x</var> is -&infin;, the result is an
             *   implementation-dependent approximation to -3&pi;/4.</li>
             *
             * </ul>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method atan2
             * @param {Number} y Required.
             * @param {Number} x Required.
             * @return {Number}
             */
            atan2 : function( y, x ) {},

            /**
             * Returns the smallest (closest to -&infin;) number value that is not less
             * than the argument and is equal to a mathematical integer. If the argument
             * is already an integer, the result is the argument itself.
             *
             * <ul>
             *   <li>If the argument is NaN, the result is NaN.</li>
             *   <li>If the argument is +0, the result is +0.</li>
             *   <li>If the argument is -0, the result is -0.</li>
             *   <li>If the argument is +&infin;, the result is +&infin;</li>
             *   <li>If the argument is -&infin;, the result is -&infin;</li>
             * </ul>
             *
             * <p>The value of <code>Math.ceil(x)</code> is the same as the value of
             * <code>-Math.floor(-x)</code></p>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method ceil
             * @param {Number} x Required.
             * @return {Number}
             */
            ceil : function( x ) {},

            /**
             * Returns an implementation-dependent approximation to the cosine of the
             * argument. The argument is expressed in radians.
             *
             * <ul>
             *   <li>If the argument is NaN, the result is NaN.</li>
             *   <li>If the argument is +0, the result is 1.</li>
             *   <li>If the argument is -0, the result is 1.</li>
             *   <li>If the argument is +&infin;, the result is NaN</li>
             *   <li>If the argument is -&infin;, the result is NaN</li>
             * </ul>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method cos
             * @param {Number} x Required.
             * @return {Number}
             */
            cos : function( x ) {},

            /**
             * Returns an implementation-dependent approximation to the exponential
             * function of the argument (&#x0065; raised to the power of
             * the argument, where &#x0065; is the base of the natural
             * logarithms).
             *
             * <ul>
             *   <li>If the argument is NaN, the result is NaN.</li>
             *   <li>If the argument is +0, the result is 1.</li>
             *   <li>If the argument is -0, the result is 1.</li>
             *   <li>If the argument is +&infin;, the result is +&infin;</li>
             *   <li>If the argument is -&infin;, the result is +0</li>
             * </ul>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method exp
             * @param {Number} x Required.
             * @return {Number}
             */
            exp : function( x ) {},

            /**
             * Returns the greatest (closest to +&infin;) number value
             * that is not greater than the argument and is equal to a mathematical
             * integer. If the argument is already an integer, the result is the
             * argument itself.
             *
             * <ul>
             *   <li>If the argument is NaN, the result is
             *   NaN.</li>
             *   <li>If the argument is +0, the result is
             *   +0.</li>
             *   <li>If the argument is -0, the result is
             *   -0.</li>
             *   <li>If the argument is +&infin;, the result is
             *   +&infin;</li>
             *   <li>If the argument is -&infin;, the result is
             *   -&infin;</li>
             *   <li>If the argument is greater than 0 but less than
             *   1, the result is +0</li>
             * </ul>
             *
             * <p>The value of <code>Math.floor(x)</code> is the same as the value of
             * <code>-Math.ceil(-x)</code></p>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method floor
             * @param {Number} x Required.
             * @return {Number}
             */
            floor : function( x ) {},

            /**
             * Returns an implementation-dependent approximation to natural logarithm
             * of the argument.
             *
             * <ul>
             *   <li>If the argument is NaN, the result is
             *   NaN.</li>
             *   <li>If the argument is 0, the result is
             *   NaN.</li>
             *   <li>If the argument is +0 or  -0, the
             *   result is -&infin;.</li>
             *   <li>If the argument is 1, the result is
             *   +0</li>
             *   <li>If the argument is +&infin;, the result is
             *   +&infin;</li>
             * </ul>
             *
             * @ecma 1, 2, 3, 5

             * @static
             * @method log
             * @param {Number} x Required.
             * @return {Number}
             */
            log : function( x ) {},

            /**
             * Returns the larger of the two arguments.
             *
             * <ul>
             *   <li>If either argument is NaN, the result is
             *   NaN.</li>
             *   <li>If <code>x&gt;y</code>, the result is <code>x</code>.</li>
             *   <li>If <code>y&gt;x</code>, the result is <code>y</code>.</li>
             *   <li>If <code>x</code> is +0 and <code>y</code> is
             *   +0, the result is +0.</li>
             *   <li>If <code>x</code> is +0 and <code>y</code> is
             *   -0, the result is +0.</li>
             *   <li>If <code>x</code> is -0 and <code>y</code> is
             *   +0, the result is +0.</li>
             *   <li>If <code>x</code> is -0 and <code>y</code> is
             *   -0, the result is -0.</li>
             * </ul>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method max
             * @param {Number} x Required.
             * @param {Number} y Required.
             * @return {Number}
             */
            max : function( x, y ) {},

            /**
             * Returns the smaller of the two arguments
             *
             * <ul>
             *   <li>If either argument is NaN, the result is
             *   NaN.</li>
             *   <li>If <code>x&lt;y</code>, the result is x.</li>
             *   <li>If <code>y&lt;x</code>, the result is y.</li>
             *   <li>If <code>x</code> is +0 and <code>y</code> is
             *   +0, the result is +0.</li>
             *   <li>If <code>x</code> is +0 and <code>y</code> is
             *   -0, the result is -0.</li>
             *   <li>If <code>x</code> is -0 and <code>y</code> is
             *   +0, the result is -0.</li>
             *   <li>If <code>x</code> is -0 and <code>y</code> is
             *   -0, the result is -0.</li>
             * </ul>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method min
             * @param {Number} x Required.
             * @return {Number}
             */
            min : function( x ) {},

            /**
             * Returns an implementation-dependent approximation to the result of
             * raising <var>x</var> to the power <var>y</var>.
             *
             * <ul>
             *   <li>To complete ... </li>
             * </ul>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method pow
             * @param {Number} x Required.
             * @param {Number} y Required.
             * @return {Number}
             */
            pow : function( x, y ) {},

            /**
             * Returns a number value with positive sign, greater than or equal to 0 but
             * less than 1, chosen randomly or pseudorandomly with approximately uniform
             * distribution over that range, using an implementation-dependent algorithm
             * or strategy. This function takes no arguments.
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method random
             * @return {Number}
             */
            random : function() {},

            /**
             * Returns the number value that is closest to the argument and is equal to
             * a mathematical integer. If two integer number values are equally close to
             * the argument, then the result is the number value that is closer to
             * +&infin;.
             * If the argument is already an integer, the result is the argument itself.
             *
             * <ul>
             *   <li>To complete ... </li>
             * </ul>
             *
             * <p>Note that Math.round(3.5) returns 4, but Math.round(-3.5) returns -3.
             * </p>
             *
             * <p>The value of Math.round(x) is the same as the value of
             * Math.floor(x+0.5), except when x is -0 or is less than 0 but greater than
             * or equal to -0.5; for these cases Math.round(x) returns -0, but
             * Math.floor(x+0.5) returns +0.</p>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method round
             * @param {Number} x Required.
             * @return {Number}
             */
            round : function( x ) {},

            /**
             * <p>Returns an implementation-dependent approximation to the sine of the
             * argument. The argument is expressed in radians.</p>
             *
             * <ul>
             *   <li>To complete ... </li>
             * </ul>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method sin
             * @param {Number} x Required.
             * @return {Number}
             */
            sin : function( x ) {},

            /**
             * Returns an implementation-dependent approximation to the square root of
             * the argument.
             *
             * <ul>
             *   <li>To complete ... </li>
             * </ul>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method sqrt
             * @param {Number} x Required.
             * @return {Number}
             */
            sqrt : function( x ) {},

            /**
             * Returns an implementation-dependent approximation to the tangent of the
             * argument. The argument is expressed in radians.
             *
             * <ul>
             *   <li>To complete ... </li>
             * </ul>
             *
             * @ecma 1, 2, 3, 5
             *
             * @static
             * @method tan
             * @param {Number} x Required.
             * @return {Number}
             */
            tan : function( x ) {}
        };
    


    /**
     * <p>The <code>JSON</code> object is a single object that contains two
     * functions, <code>parse</code> and <code>stringify</code>, that are used
     * to parse and construct JSON texts. The JSON Data Interchange Format is
     * described in <a href="http://tools.ietf.org/html/rfc4627">RFC 4627</a>.
     * The JSON interchange format used in this specification is exactly that
     * described by RFC 4627 with two exceptions: </p>
     * <ul>
     *   <li>The top level <em>JSONText</em> production of the ECMAScript JSON
     *   grammar may consist of any <em>JSONValue</em> rather than being
     *   restricted to being  a <em>JSONObject</em> or a <em>JSONArray</em> as
     *   specified by RFC 4627.</li>
     *   <li>Conforming implementations of <code>JSON.parse</code> and
     *   <code>JSON.stringify</code> must support the exact interchange format
     *   described in this specification without any deletions or extensions to
     *   the format. This differs from RFC 4627 which permits a JSON parser to
     *   accept non-JSON forms and extensions.</li>
     * <ul>
     * 
     * @ecma 5
     *
     * @private
     * @class JSON
     * @extends Object
     */
JSON = {

            /**
             * <p>The <code>parse</code> function parses a JSON text
             * (a JSON-formatted String) and produces an ECMAScript value. The
             * JSON format is a restricted form of ECMAScript literal. JSON
             * objects are realized as ECMAScript objects. JSON arrays are
             * realized as ECMAScript arrays. JSON strings, numbers, booleans,
             * and null are realized as ECMAScript Strings, Numbers, Booleans,
             * and null. JSON uses a more limited set of white space characters
             * than WhiteSpace and allows Unicode code points U+2028 and U+2029
             * to directly appear in JSONString literals without using an escape
             * sequence.</p>
             *
             * <p>The optional reviver parameter is a function that takes two
             * parameters, (key and value). It can filter and transform the
             * results. It is called with each of the key/value pairs produced
             * by the parse, and its return value is used instead of the
             * original value. If it returns what it received, the structure is
             * not modified. If it returns <code>undefined</code> then the
             * property is deleted from the result.</p>
             *
             * @ecma 5
             *
             * @static
             * @method parse
             * @throws {SyntaxError} if text did not conform to the JSON grammar
             * @param {String} text Required. The JSON text to parse.
             * @param {String} [reviver] A value handler.
             * @return {Object}
             */
            parse: function (text, reviver) {},

            /**
             * <p>The <code>stringify</code> function returns a String in JSON
             * format representing an ECMAScript value. It can take three
             * parameters.</p>
             * <ul>
             *   <li>The first parameter is required. The <var>value</var>
             *   parameter is an ECMAScript value, which is usually an object or
             *   array, although it can also be a String, Boolean, Number or
             *   <code>null</code>.</li>
             *   <li>The optional <var>replacer</var> parameter is either a
             *   function that alters the way objects and arrays are
             *   stringified, or an array of Strings and Numbers that acts as a
             *   white list for selecting the object properties that will be
             *   stringified.</li>
             *   <li>The optional <var>space</var> parameter is a String or
             *   Number that allows the result to have white space injected into
             *   it to improve human readability.</li>
             * </ul>
             *
             * @ecma 5
             *
             * @static
             * @method stringify
             * @param {Object} value Required.
             * @param {Object} [replacer]
             * @param {Object} [space]
             * @return {String}
             */
            stringify: function (value, replacer, space) {}
        };


    /**
     * The class of the global object
     *
     * @ecma 1, 2, 3, 5
     *
     * @class Global
     * @extends Application
     */

    /**
     * The Math object is merely a single object that has some named properties,
     * some of which are functions.
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @property Math
     * @type Math
     */

    /**
     * The JSON object is a single object that contains two functions, parse and
     * stringify, that are used to parse and construct JSON texts.
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @property JSON
     * @type JSON
     */

    /**
     * <p>Number value that is a IEEE 754 "Not-a-Number" value.</p>
     * 
     * <p>The initial value of <var>NaN</var> is NaN.</p>
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @property NaN
     * @type Number
     */

    /**
     * The initial value of <var>Infinity</var> is +&infin;.
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @property Infinity
     * @type Number
     */

    /**
     * The primitive value used when a variable has not been assigned a value.
     *
     * @ecma 3, 5
     *
     * @static
     * @property undefined
     * @type undefined
     */

    /**
     * The primitive value that represents the intentional absence of any object
     * value.
     * 
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @property null
     * @type null
     */

    /**
     * The true Boolean value
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @property true
     * @type Boolean
     */

    /**
     * The false Boolean value
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @property false
     * @type Boolean
     */

    /**
     * Parse x as an ECMAScript Program.
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @method eval
     * @param {String} x Required.
     * @throws {Error}  If the parse fails.
     * @return Object|undefined
     */
	function eval(x) { }
	
    /**
     * The <code>parseInt</code> function produces an integer value dictated by
     * intepretation of the contents of the string argument according to the
     * specified radix.
     *
     * <p>Note that <code>parseInt</code> may interpret only a leading portion of
     * the string as an integer value; it ignores any characters that cannot be
     * interpreted as part of the notation of an integer, and no indication is given
     * that any such characters were ignored.</p>
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @method parseInt
     * @param {String} string Required.
     * @param {Number} [radix]
     * @return {Number}
     */
	function parseInt(string, radix) { }
	
    
	/**
     * The <code>parseFloat</code> function produces a number value dictated by
     * intepretation of the contents of the string argument as a decimal literal.
     *
     * <p>Note that <code>parseFloat</code> may interpret only a leading portion of
     * the string as a number value; it ignores any characters that cannot be
     * interpreted as part of the notation of an decimal literal, and no indication
     * is given that any such characters were ignored.</p>
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @method parseFloat
     * @param {String} string Required.
     * @return {Number}
     */
	function parseFloat(string) {}
	 
	 
    /**
     * The escape function computes a new version of a string value in which certain
     * characters have been replaced by a hexadecimal escape sequence.
     * The result thus contains no special characters that might have special
     * meaning within a URL.
     *
     * <p>For characters whose Unicode encoding is 0xFF or less, a two-digit escape
     * sequence of the form %xx is used in accordance with RFC1738.<br>
     * For characters whose Unicode encoding is greater than 0xFF, a four-digit
     * escape sequence of the form %uxxxx is used</p>
     *
     * @ecma 1, 2, 3
     *
     * @static
     * @method escape
     * @param {String} string Required.
     * @return {Boolean}
     *
     * @deprecated Use <code>encodeURI</code> or <code>encodeURIcomponent</code>
     * instead
     */
	function escape(string) {}
	 
	 
    /**
     * The unescape function computes a new version of a string value in which each
     * escape sequences of the sort that might be introduced by the escape function
     * is replaced with the character that it represents.
     *
     * @ecma 1, 2, 3
     *
     * @static
     * @method unescape
     * @param {String} string Required.
     * @return {Boolean}
     *
     * @deprecated Use <code>decodeURI</code> or <code>decodeURIcomponent</code>
     * instead
     */
	function unescape(string) {}
	 
	 
    /**
     * Return true if the number value is NaN
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @method isNaN
     * @param {Number} number Required.
     * @return {Boolean}
     */
	function isNaN(value) {}

	
    /**
     * Returns false if the result is NaN, +&infin;, or -&infin;, and otherwise
     * returns true.
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @method isFinite
     * @param {Number} number Required.
     * @return {Boolean}
     */
	function isFinite(value) { }


	 /**
     * The <code>decodeURI</code> function computes a new version of a URI in which
     * each escape sequence and UTF-8 encoding of the sort that might be introduced
     * by the <code>encodeURI</code> function is replaced with the character that
     * it represents.
     *
     * @ecma 3, 5
     *
     * @static
     * @method decodeURI
     * @param {String} encodedURI
     * @return {String}
     */
	function decodeURI(uri) {}
	
	
    /**
     * The <code>decodeURIComponent</code> function computes a new version of a URI
     * in which each escape sequence and UTF-8 encoding of the sort that might be
     * introduced by the <code>encodeURIComponent</code> function is replaced with
     * the character that it represents.
     *
     * @ecma 3, 5
     *
     * @static
     * @method decodeURIComponent
     * @param {String} encodedURIComponent Required.
     * @return {String}
     */
	function decodeURIComponent(uri) {}
		
	 
    /**
     * The <code>encodeURI</code> function computes a new version of a URI in which
     * each instance of certain characters is replaced by one, two or three escape
     * sequences representing the UTF-8 encoding of the character.
     *
     * @ecma 3, 5
     *
     * @static
     * @method encodeURI
     * @param {String} uri Required.
     * @return {String}
     */
	function encodeURI(uri) {}
	
	
    /**
     * The <code>encodeURIComponent</code> function computes a new version of a URI
     * in which each instance of certain characters is replaced by one, two or three
     * escape sequences representing the UTF-8 encoding of the character.
     *
     * @ecma 3, 5
     *
     * @static
     * @method encodeURIComponent
     * @param {String} uriComponent Required.
     * @return {String}
     */
	function encodeURIComponent(uri) {}
	
	
    /**
     * When <code>Object</code> is called as a function rather than as a
     * constructor, it performs a type conversion.
     *
     * <p>When the Object function is called with no argument or one argument with
     * null or undefined as value, it creates and return a newobject with no
     * properties.<br>
     * Otherwise, it convert the value into an object using the required
     * constructor.</p>
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @method Object
     * @param {Object} [value]
     * @return {Object}
     */

    /**
     * When Function is called as a function rather than as a constructor, it
     * creates and initializes a new function object.
     * Thus the function call Function(...) is equivalent to the object creation
     * expression new Function(...) with the same arguments.
     *
     * <p>When the Function function is called with some arguments :
     * p1, p2, . . . , pn, body (where n might be 0, that is, there are no "p"
     * arguments, and where body might also not be provided), Create and return a
     * new Function object exactly if the function constructor had been called with
     * the same arguments</p>
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @method Function
     * @param {String} [param0] Any number of parameters
     * @param {String} [body] The last argument contain the body of the function
     * @return {Function}
     */

    /**
     * When Array is called as a function rather than as a constructor, it creates
     * and initializes a new array object.
     *
     * <p>Thus the function call <code>Array (...)</code> is equivalent to the
     * object creation expression <code>new Array (...)</code> with the same
     * arguments.</p>
     *
     * <p><code>Array(item0, item1, . . .)</code><br>
     * An array is created and returned as if by the expression
     * <code>new Array(item0, item1, . . .)</code>.</p>
     *
     * <p>Array(len)<br>
     * An array is created and returned as if by the expression new Array (len).</p>
     *
     * <p>Array()<br>
     * <p>An array is created and returned as if by the expression new Array ().</p>
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @method Array
     * @param {Object}* [value]
     * @return {Array}
     */

    /**
     * When String is called as a function rather than as a constructor, it performs
     * a type conversion.
     *
     * <p>String(value)<br>
     * Returns a string value (not a String object) computed by ToString(value).</p>
     *
     * <p>String()<br>
     * Returns the empty string "".</p>
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @method String
     * @param {Object} [value]
     * @return {String}
     */

    /**
     * Convert any value into a Boolean
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @method Boolean
     * @param {Object} [value]
     * @return {Boolean}
     */

    /**
     * Convert any value into a Number
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @method Number
     * @param {Object} value
     * @return {Number}
     */

    /**
     * Create a Date string
     *
     * @ecma 1, 2, 3, 5
     *
     * @static
     * @method Date
     * @param {String|Number} [value]
     * @param {Number}* [elem]
     * @return {String}
     */



