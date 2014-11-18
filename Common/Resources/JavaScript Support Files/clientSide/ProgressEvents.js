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
 * ProgressEvents
 *
 * @module ProgressEvents
 * @requires DOM2Core, DOM2Views, DOM2Events
 * @see http://www.w3.org/TR/DOM-Level-2-Events/
 */



/**
 * The Event interface is used to provide contextual information about an event to the handler 
 * processing the event. An object which implements the Event interface is generally passed as 
 * the first parameter to an event handler. More specific context information is passed to event 
 * handlers by deriving additional interfaces from Event which contain information directly 
 * relating to the type of event they accompany. These derived interfaces are also implemented 
 * by the object passed to the event listener.
 *
 * @class ProgressEvent
 */
ProgressEvent = function ProgressEvent () {
    
    
    /**
     * Specifies whether the total size of the transfer is known.
     *
     * @property lengthComputable
     * @type Boolean
     */
    this.lengthComputable = true;
    
    /**
     * Specifies the number of bytes downloaded since the beginning of the download. 
     * This refers to the content, excluding headers and overhead from the transaction, and where
     * there is a content-encoding or transfer-encoding refers to the number of bytes to be transferred,
     * i.e. with the relevant encodings applied. 
     *
     * @property loaded
     * @type Number
     */
    this.loaded = 0;
    
    /**
     * Specifies the expected total number of bytes of the content transferred in the operation.
     * Where the size of the transfer is for some reason unknown, the value of this attribute must be zero.
     *
     * @property total
     * @type Number
     */
    this.total = 0;
};


/**
 * This method is used to initialize the value of a ProgressEvent object and has the same behavior as 
 * Event.initEventNS(), where the value of the namespace parameter is specified as null
 *
 * @method initProgressEvent
 * @param {String} eventTypeArg This must be one of loadstart, progress, error, abort, load. 
 * If it is not one of those values then this specification does not define the resulting event. 
 * @param {Boolean} canBubbleArg Specifies Event.bubbles.
 * This parameter overrides the intrinsic bubbling behavior of the event and determines whether
 * the event created will bubble
 * @param {Boolean} cancelableArg Specifies Event.cancelable. This parameter overrides the intrinsic
 * cancel behavior of the event and determines whether the event created is cancelable
 * @param {Boolean} lengthComputableArg If the user agent has reliable information about the value
 * of total, then this should be true. If the user agent does not have reliable information about
 * the value of total, this should be false
 * @param {Boolean} loadedArg This parameter specifies the total number of bytes already loaded.
 * If this value is not a non-negative number, the user agent must change it to zero.
 * @param {Boolean} totalArg This specifies the total number of bytes to be loaded. If lengthComputable
 * is false, this must be zero. If any other parameter is passed, and lengthComputable is false, the
 * user agent must override this and set the value to zero. If lengthComputable is true, and the value
 * of this parameter is not a non-negative number, the user agent must set lengthComputable to false and
 * the value of total to zero.
 */
Event.prototype.initProgressEvent = function (eventTypeArg, canBubbleArg, cancelableArg, lengthComputableArg, loadedArg, totalArg) {};

