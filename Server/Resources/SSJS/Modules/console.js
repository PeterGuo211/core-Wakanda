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
 * <p>The console  module provides interface to Log JavaScript actions.<br>
 * Logs are generated in Log4J compliant TTCC format using the Firebug API</p>
 *
 * <p>Examples:</p>
 *
 * <pre name="code" class="js">
 * console.log("The %s jumped over %d tall buildings", animal, count);
 * </pre>
 *
 * <pre name="code" class="js">
 * console.log("The", animal, "jumped over", count, "tall buildings");
 * </pre>
 *
 * @module console
 * @see http://getfirebug.com/wiki/index.php/Console_API
 * @see http://www.docjar.org/docs/api/org/apache/log4j/TTCCLayout.html
 */
 
/*jslint white: true, es5: true, onevar: true, undef: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: true */

// "use strict";

/*global console*/

var timers, savedConsole;

timers = {};
savedConsole = console;

/**
 * The Firebug console interface
 * @class Console
 */
if (typeof Console === "undefined") {
    Console = function Console() {
        return exports;
    };
}

Console.toString = function console_toString() {
    return "function Console() {\n    [native code]\n}";
};

/**
 * <p>console has a Console constructor</p>
 *
 * @property constructor
 * @type Function
 */
Object.defineProperty(
    exports,
    "constructor",
    {
        value: Console,
        writable: false,
        configurable: false,
        enumerable: false
    }
);
    
    
/**
 * <p>logs a message to with visual "log" representation allowing user to 
 * distinguish form other message types. You may pass as many arguments as 
 * you'd like, and they will be joined together in a space-delimited line.</p>  
 *
 * <p>The first argument to log may be a string containing printf-like string
 * substitution patterns.</p>
 *
 * <pre name="code" class="js">
 * console.log("The %s jumped over %d tall buildings", animal, count);
 * </pre>
 *
 * <p>The example above can be re-written without string substitution to
 * achieve the same result:</p>
 *
 * <pre name="code" class="js">
 * console.log("The", animal, "jumped over", count, "tall buildings");
 * </pre>
 *
 * <p>These two techniques can be combined. If you use string substitution but
 * provide more arguments than there are substitution patterns, the remaining
 * arguments will be appended in a space-delimited line, like so:</p>
 *
 * <pre name="code" class="js">
 * console.log("I am %s and I have:", myName, thing1, thing2, thing3);
 * </pre>
 *
 * <p>If objects are logged, platform provider may write the as static text, or 
 * a representation of an object, some platforms might dump interactive 
 * hyperlinks that can be inspected.</p>
 *
 * <p>Here is the complete set of patterns that you may use for string
 * substitution:</p>
 * <table>
 *   <caption>String Substitution Patterns</cation>
 *   <tr width="60"><th>%s</th><td>String</td></tr>
 *   <tr width="60"><th>%d, %i</th><td>Integer </td></tr>
 *   <tr width="60"><th>%f</th><td>Floating point number</td></tr>
 *   <tr width="60"><th>%o</th><td>Object hyperlink</td></tr>
 * </table>
 *
 * @method log
 * @param {Object|Array|String|Date|Number|null|undefined} object* Required. The message or value to log
 */
 
exports.log = Console.prototype.log = function console_log() {
    savedConsole.log.apply(this, arguments);
};
 
 
 /**
 * <p>Logs a message, with a visual "debug" representation.</p>
 *
 * <p><pre>TODO: include an info of a caller (file, line where it was called from).</pre></p>
 *
 * @method debug
 * @param {Object|Array|String|Date|Number|null|undefined} object* Required. The message or value to log
 */
exports.debug = Console.prototype.debug = function console_debug() {
    savedConsole.debug.apply(this, arguments);
};

 
/**
 * <p>Logs a message, with a visual "info" representation.</p>
 *
 * <p><pre>TODO: include an info of a caller (file, line where it was called from).</pre></p>
 *
 * @method info
 * @param {Object|Array|String|Date|Number|null|undefined} object* Required. The message or value to log
 */
exports.info = Console.prototype.info = function console_info() {
    savedConsole.info.apply(this, arguments);
};


/**
 * <p>Logs a message, with a visual "warn" representation.</p>
 *
 * <p><pre>TODO: include an info of a caller (file, line where it was called from).</pre></p>
 *
 * @method warn
 * @param {Object|Array|String|Date|Number|null|undefined} object* Required. The message or value to log
 */
exports.warn = Console.prototype.warn = function console_warn() {
    savedConsole.warn.apply(this, arguments);
};


/**
 * <p>Logs a message, with a visual "error" representation.</p>
 *
 * <p><pre>TODO: include an info of a caller (file, line where it was called from).</pre></p>
 *
 * @method error
 * @param {Object|Array|String|Date|Number|null|undefined} object* Required. The message or value to log
 */
exports.error = Console.prototype.error = function console_error() {
    savedConsole.error.apply(this, arguments);
};


/**
 * <p>Logs a message, with a visual "fatal" representation.</p>
 *
 * <p><strong>It will also throw a Error</strong></p>
 *
 * <p><pre>TODO: include an info of a caller (file, line where it was called from).</pre></p>
 *
 * @method fatal
 * @throws {Error} when called
 * @param {Object|Array|String|Date|Number|null|undefined} object* Required. The message or value to log
 */
exports.fatal = Console.prototype.fatal = function console_fatal() {
    savedConsole.fatal.apply(this, arguments);
};


/**
 * <p>Tests that an expression is true. If not, it will write a message to the console and <strong>throw an exception.</strong></p>
 *
 * @method assert
 * @throws {Error} If expression is false
 * @param {Boolean} expression Required. The expression to test
 * @param {Object|Array|String|Date|Number|null|undefined} object* Required. The message or value to log
 */
exports.assert = Console.prototype.assert = function () {
    savedConsole.fatal.assert(this, arguments);
};


/**
 * <p>Logs a message, with a visual "pass" representation.</p>
 *
 * <p><pre>TODO: include an info of a caller (file, line where it was called from).</pre></p>
 *
 * @method pass
 * @param {Object|Array|String|Date|Number|null|undefined} object* Required. The message to log as PASS
 */
exports.pass = Console.prototype.pass = function console_pass() {
    var args;
    args = [true];
    args.concat(arguments);
    savedConsole.assert.apply(this, args);
};


/**
 * <p>Logs a message, with a visual "fail" representation.</p>
 *
 * <p><pre>TODO: include an info of a caller (file, line where it was called from).</pre></p>
 *
 * @method fail
 * @param {Object|Array|String|Date|Number|null|undefined} object* Required. The message to log
 */
exports.fail = Console.prototype.fail = function console_fail() {
    var args;
    args = [false];
    args.concat(arguments);
    try {
        savedConsole.assert.apply(this, args);
    } catch (e) {
        // exception intercepted
    }
};


/**
 * <p>Logs a static / interactive listing of all properties of the object.</p>
 *
 * <p>Not implemented. actually behave as log()</p>
 *
 * @method dir
 * @param {Object} object Required. 
 */
exports.dir = Console.prototype.dir = function console_dir(object) {
    savedConsole.log(object);
};


/**
 * <p>Creates a new timer under the given name. Call require("console").timeEnd(name) 
 * with the same name to stop the timer and log the time elapsed.. </p>
 *
 * @method time
 * @param {String} name Required. The timer identifier
 */
exports.time = Console.prototype.time = function console_time(name) {
    timers[name] = Date.now();
};
 

/**
 * <p>Stops a timer created by a call to require("console").time(name) and logs the time elapsed.</p>
 *
 * @method timeEnd
 * @param {String} name Required. The timer identifier
 */
exports.timeEnd = Console.prototype.timeEnd = function console_timeEnd(name) {
    var result;
    result = (Date.now() - timers[name]);
    savedConsole.log(result);
    return result;
};
 

function console_contentGetter() {
    return savedConsole.content;
}

function console_contentSetter(value) {
}

/**
 * <p>The last logged messages in an Array of strings</p>
 *
 * <p><strong>The array is cleared at each access</strong></p> 
 *
 * @property content
 * @type Array
 */
exports.__defineGetter__(
    "content",
    console_contentGetter
);
Console.prototype.__defineGetter__(
    "content",
    console_contentGetter
);

exports.__defineSetter__(
    "content",
    console_contentSetter
);

Console.prototype.__defineSetter__(
    "content",
    console_contentSetter
);