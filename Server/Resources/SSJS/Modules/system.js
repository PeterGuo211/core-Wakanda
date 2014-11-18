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
 * <p>The System module provides a system object compliant with the 
 * <a href="http://wiki.commonjs.org/wiki/System">System 1.0 CommonJS specification</a></p>
 * 
 * @module system
 * @requires console
 * 
 * @see http://commonjs.org/wiki/System
 * @see http://wiki.4d.fr/techdoc/?q=node/190
 */


/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true */

// "use strict";

/*global require,console,application,Folder,File,TextStream,include,exports*/

if (typeof System === "undefined") {

/**
 * <p>The System module provides a system object compliant with the 
 * <a href="http://wiki.commonjs.org/wiki/System">System 1.0 CommonJS specification</a></p>
 * 
 * @class System
 **/
    System = function System() {};

}

/**
 * The System constructor 
 *
 * @property constructor
 * @type Function
 * @default System
 */
exports.constructor = System;

/**
 * The standard input stream, an object with the same API as a file opened with the mode "r" with no encoding. 
 *
 * @property stdin
 * @type Object|FileReader
 */

exports.stdin = {};


/**
 * The standard output stream, an object with the same API as a file opened with the mode "w" with no encoding. 
 *
 * @property stdout
 * @type Object
 */
exports.stdout = {
    print: function print(message) {
        console.info(message);
    }
};



/**
 * The standard error stream, an object with the same API as a file opened with the mode "w" with no encoding. 
 *
 * @property stderr
 * @type Object
 */
exports.stderr = {
    print: function print(message) {
        console.error(message);
    }
};

/**
 * An Object containing posix-style or CGI environment variables. 
 *
 * @property env
 * @type Object
 */
exports.env = {};


/**
 * An Array containing the command line arguments for the invoking arguments, not including the interpreter/engine but including the path to the program as it was executed.
 *
 * @property args
 * @type Object
 */
exports.args = [];


/**
 * A function that forwards its thisp and arguments to "system.stdout.print" with lazy binding (meaning that, if system.stdout is replaced, print  forward to the new stdout).   
 *
 * @method print
 * @param {String} message
 */
exports.print = function (message) {
    exports.stdout.print(message);
};


/**
 * <p>A function that accepts a "message" and an optional "label" String.</p>
 *
 * <p>If the label is not supported, a warning message is sent with the name of the label
 * followed by the message itself sent with the default TRACE label</p>
 *
 * @method log
 * @param {String} message
 * @param {String} [label] The label is one of "TRACE" (default), "INFO", "WARNING", "ERROR".
 * @returns {Boolean} Returns true if the label is supported
 */
exports.log = function (message, label) {
    var action;
    
    if (label === undefined) {
        console.log(message);
        return true;
    }
    
    action = {
        TRACE: 'log',
        INFO: 'info',
        WARNING: 'warn',
        ERROR: 'error'
    };
    
    if (label in action) {
        console[action[label]](message);
        return true;
    }
    
    console.warn('Unknown label', label, 'for the following message');
    console.log(message);
    return false;
};


/**
 * A string with its vendor-specific platform name.
 *
 * @property platform
 * @attributes ReadOnly
 * @type String
 * @default "Wakanda"
 */
Object.defineProperty(
    exports,
    "platform",
    {
        value: "Wakanda",
        writable: false,
        configurable: false,
        enumerable: true
    }
);


/**
 * The "system" contain a reference to the global object.  
 *
 * @property global
 * @type Object
 */
exports.global = application;

/**
 * NodeJS compliant OS object  
 *
 * @property os
 * @type Object
 */
exports.os = os;


/**
 * True if the OS system is a MS Windows system
 *
 * @property isWindows
 * @type Boolean
 */
exports.isWindows = os.isWindows;

/**
 * True if the OS system is a Mas OS system
 *
 * @property isMac
 * @type Boolean
 */
exports.isMac = os.isMac;

/**
 * True if the OS system is a Linux system
 *
 * @property isLinux
 * @type Boolean
 */
exports.isLinux = os.isLinux;

