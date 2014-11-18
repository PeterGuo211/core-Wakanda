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
 *
 * <a href="http://www.w3.org/TR/webstorage/">W3C standard storage API</a>
 *
 * <pre name="code" class="js">
 * //save a value
 * sessionStorage.name = "Nicholas";
 *
 * //retrieve item
 * var name = sessionStorage.name;
 *
 * //remove the key
 * delete sessionStorage.name;
 * </pre>
 *
 * @module WebStorage
 * @see http://www.w3.org/TR/webstorage/
 */

/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true */


"use strict";


/**
 * The W3C / HTML5 session storage interface
 *
 * @class Storage
 * @extends Object
 */
function Storage () {
    var
    key;

    /**
     * Each stored item is available as a property of the sessionSrorage object
     *
     * @property [key]
     * @type Object
     */
    this[key] = {};

    /**
     * The number of stored items
     *
     * @property length
     * @type Number
     */
    this.length = [];
};

/**
 * Returns the name of the nth key in the list.<br>
 * The order of keys is consistent within an object so long as the number of
 * keys doesn't change.<br>
 * If n is greater than or equal to the number of key/value pairs in the
 * object, then this method returns null.
 *
 * @method key
 * @param {Number} n Require. The position of a stored object
 * @return {String|null} The name of the nth stored object
 */
Storage.prototype.key = function key(n) {};

/**
 * Returns a structured clone of the current value associated with the given
 *  key.<br>
 * If the given key  does not exist in the list associated with the object
 * then this method must return null.
 *
 * @method getItem
 * @param {String} key Required. The name of the stored object
 * @return {String|Object|null} The object referenced by the key name
 */
Storage.prototype.getItem = function getItem(key) {};

/**
 * Creates a structured clone of the given value.
 *
 * @method setItem
 * @throw {Error} An exception may be thrown while cloning the object
 * @param {String} key Required. The identifier of the stored item
 * @param {String} value Required. The cloned value of the stored item
 */
Storage.prototype.setItem = function setItem(key, value) {};

/**
 * Cause the key/value pair with the given key to be removed from the list
 * associated with the object, if it exists.
 *
 * @method removeItem
 * @param {String} key Required. The identifier of the stored object
 */
Storage.prototype.removeItem = function removeItem(key) {};

/**
 * Atomically cause the list associated with the object to be emptied of
 * all key/value pairs, if there are any.
 *
 * @method clear
 */
Storage.prototype.clear = function clear() {};


/**
 * <p>The storage event is fired when a storage area changes 
 * for session storage, and for local storage.</p>
 *
 * <p>If the event is being fired due to an invocation of the setItem() or 
 * removeItem() methods, the event must have its key attribute set to the name 
 * of the key in question, its oldValue attribute set to a structured clone of 
 * the old value of the key in question, or null if the key is newly added, and
 * its newValue attribute set to a structured clone of the new value of the key
 * in question, or null if the key was removed.</p>
 *
 * <p>Otherwise, if the event is being fired due to an invocation of the clear()
 * method, the event must have its key, oldValue, and newValue attributes set to
 * null.</p>
 *
 * @class StorageEvent
 * @extends Event
 */
function StorageEvent () {

    /**
     * key
     *
     * @property key
     * @type String
     */
    this.key = "";
    
    /**
     * oldValue
     *
     * @property oldValue
     * @type Mixed
     */
    this.oldValue = {};
    
    /**
     * newValue
     *
     * @property newValue
     * @type Mixed
     */
    this.newValue = {};
    
    /**
     * url
     *
     * @property url
     * @type String
     */
    this.url = "";
    
    /**
     * storageArea
     *
     * @property storageArea
     * @type Storage
     */
    this.storageArea = new Storage();
}

/**
 * The initStorageEvent()  method must initialize the event in a manner
 * analogous to the similarly-named method in the DOM Events interfaces.
 * 
 * @method initStorageEvent
 * @param {String} typeArg
 * @param {Boolean} canBubbleArg
 * @param {Boolean} cancelableArg
 * @param {String} keyArg
 * @param {String} keyArg
 * @param {Mixed} oldValueArg
 * @param {Mixed} newValueArg
 * @param {String} urlArg
 * @param {Storage} storageAreaArg
 */
StorageEvent.prototype.initStorageEvent = function initStorageEvent(typeArg, canBubbleArg, cancelableArg, keyArg, oldValueArg, newValueArg, urlArg, storageAreaArg) {};



sessionStorage = new Storage();
localStorage = new Storage();
globalStorage = new Storage();