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
 * Console API
 *
 * @module Console
 * 
 * @see http://getfirebug.com/wiki/index.php/Crossfire_Protocol_Reference
 */

/**
 * class Console
 *
 * @class Console
 * @extends EventTarget
 *
 * @constructor
 * @param {String} contextId
 */
function Console(contextId) {

    /**
     * Returns the Crossfire protocol version. 
     *
     * NOT IMPLEMENTED
     *
     * @static
     * @property crossfireVersion
     * @type String
     * @default "0.1a"
     */
    this.crossfireVersion = "0.1a";

    /**
     * onlog
     *
     * NOT IMPLEMENTED
     *
     * @event onlog
     * @param {Event} event
     */
    this.onlog = function (event) {};
    this.onlog.name = "Console_onlog";

    /**
     * ondebug
     *
     * NOT IMPLEMENTED
     *
     * @event ondebug
     * @param {Event} event
     */
    this.ondebug = function (event) {};
    this.ondebug.name = "Console_ondebug";

    /**
     * oninfo
     *
     * NOT IMPLEMENTED
     *
     * @event oninfo
     * @param {Event} event
     */
    this.oninfo = function (event) {};
    this.oninfo.name = "Console_oninfo";

    /**
     * onwarn
     *
     * NOT IMPLEMENTED
     *
     * @event onwarn
     * @param {Event} event
     */
    this.onwarn = function (event) {};
    this.onwarn.name = "Console_onwarn";

    /**
     * onerror
     *
     * NOT IMPLEMENTED
     *
     * @event onerror
     * @param {Event} event
     */
    this.onerror = function (event) {};
    this.onerror.name = "Console_onerror";

};
Console.name = "Debugger";

/**
 * <p>log</p>
 *
 * NOT IMPLEMENTED
 *
 * @method log
 * @param {String} message
 */
Console.prototype.log = function (message) {};
Console.prototype.log.name = [Console.name, "_", "log"].join("");

/**
 * <p>debug</p>
 *
 * NOT IMPLEMENTED
 *
 * @method debug
 * @param {String} message
 */
Console.prototype.debug = function (message) {};
Console.prototype.debug.name = [Console.name, "_", "debug"].join("");

/**
 * <p>info</p>
 *
 * NOT IMPLEMENTED
 *
 * @method info
 * @param {String} message
 */
Console.prototype.info = function (message) {};
Console.prototype.info.name = [Console.name, "_", "info"].join("");

/**
 * <p>warn</p>
 *
 * NOT IMPLEMENTED
 *
 * @method warn
 * @param {String} message
 */
Console.prototype.warn = function (message) {};
Console.prototype.warn.name = [Console.name, "_", "warn"].join("");

/**
 * <p>error</p>
 *
 * NOT IMPLEMENTED
 *
 * @method error
 * @param {String} message
 */
Console.prototype.error = function (message) {};
Console.prototype.error.name = [Console.name, "_", "error"].join("");
