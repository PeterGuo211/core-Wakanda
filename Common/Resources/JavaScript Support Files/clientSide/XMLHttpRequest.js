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
 * <p>The XMLHttpRequest object implements an interface exposed by a scripting engine 
 * that allows scripts to perform HTTP client functionality, such as submitting form 
 * data or loading data from a server. It is the ECMAScript HTTP API.</p>
 *
 * <p>The name of the object is XMLHttpRequest for compatibility with the Web, though 
 * each component of this name is potentially misleading. First, the object supports 
 * any text based format, including XML. Second, it can be used to make requests over 
 * both HTTP and HTTPS (some implementations support protocols in addition to HTTP and 
 * HTTPS, but that functionality is not covered by this specification). Finally, it 
 * supports "requests" in a broad sense of the term as it pertains to HTTP; namely all 
 * activity involved with HTTP requests or responses for the defined HTTP methods.</p>
 *
 * @module XMLHttpRequest
 * @requires DOMCore, DOM2Events, ProgressEvents, FileAPI
 * @see http://www.w3.org/TR/XMLHttpRequest2/
 */


/**
 * XMLHttpRequestEventTarget
 *
 * @class XMLHttpRequestEventTarget
 * @extends EventTarget
 */
function XMLHttpRequestEventTarget () {

    /**
     * When the request has been aborted. For instance, by invoking the abort() method.
     *
     * @event onabort
     * @param {ProgressEvent} event
     **/
    this.onabort = function (event) {};

    /**
     * When the request has failed.
     *
     * @event onerror
     * @param {ProgressEvent} event
     **/
    this.onerror = function (event) {};

    /**
     * When the request has successfully completed.
     *
     * @event onload
     * @param {ProgressEvent} event
     **/
    this.onload = function (event) {};

    /**
     * When the request starts.
     *
     * @event onloadstart
     * @param {ProgressEvent} event
     **/
    this.onloadstart = function (event) {};

    /**
     * While loading and sending data.
     *
     * @event onprogress
     * @param {ProgressEvent} event
     **/
    this.onprogress = function (event) {};

    /**
     * When the author specified timeout has passed before the request could complete.
     *
     * @event ontimeout
     * @param {ProgressEvent} event
     **/
    this.ontimeout = function (event) {};

    /**
     * When the request has completed (either in success or failure).
     *
     * @event onloadend
     * @param {ProgressEvent} event
     **/
    this.onloadend = function (event) {};
}

/**
 * prototype
 *
 * @static
 * @property prototype
 * @type EventTarget
 */
XMLHttpRequestEventTarget.prototype = new EventTarget();

/**
 * constructor
 *
 * @property constructor
 * @type Function
 * @default XMLHttpRequestEventTarget
 */
XMLHttpRequestEventTarget.prototype.constructor = XMLHttpRequestEventTarget;



/**
 * XMLHttpRequestUpload
 *
 * @class XMLHttpRequestUpload
 * @extends XMLHttpRequestEventTarget
 */
function XMLHttpRequestUpload () {}

/**
 * prototype
 *
 * @static
 * @property prototype
 * @type XMLHttpRequestEventTarget
 */
XMLHttpRequestUpload.prototype = new XMLHttpRequestEventTarget();

/**
 * constructor
 *
 * @property constructor
 * @type Function
 * @default XMLHttpRequestUpload
 */
XMLHttpRequestUpload.prototype.constructor = XMLHttpRequestUpload;






/**
 * <p>The XMLHttpRequest object implements an interface exposed by a scripting engine 
 * that allows scripts to perform HTTP client functionality, such as submitting form 
 * data or loading data from a server. It is the ECMAScript HTTP API.</p>
 *
 * <p>The name of the object is XMLHttpRequest for compatibility with the Web, though 
 * each component of this name is potentially misleading. First, the object supports 
 * any text based format, including XML. Second, it can be used to make requests over 
 * both HTTP and HTTPS (some implementations support protocols in addition to HTTP and 
 * HTTPS, but that functionality is not covered by this specification). Finally, it 
 * supports "requests" in a broad sense of the term as it pertains to HTTP; namely all 
 * activity involved with HTTP requests or responses for the defined HTTP methods.</p>
 *
 * @class XMLHttpRequest
 * @extends XMLHttpRequestEventTarget
 *
 * @constructor
 */
function XMLHttpRequest () {

    /**
     * readyState
     *
     * @property readyState
     * @type Number
     **/
    this.readyState = 0;
    
    /**
     * responseBody
     *
     * @property responseBody
     * @type ByteArray
     **/
    this.responseBody = new ByteArray();
    
    /**
     * responseText
     *
     * @property responseText
     * @type String
     **/
    this.responseText = '';
    
    /**
     * responseXML
     *
     * @property responseXML
     * @type Document
     **/
    this.responseXML = new Document();
    
    /**
     * onreadystatechange
     *
     * @event onreadystatechange
     * @param {Event} event
     **/
    this.onreadystatechange = function (event) {};
    
    /**
     * onuploadprogress
     *
     * @event onuploadprogress
     * @param {Event} event
     **/
    this.onuploadprogress = function (event) {};
    
    /**
     * status
     *
     * @property status
     * @type Number
     **/
    this.status = 0;
    
    /**
     * statusText
     *
     * @property statusText
     * @type String
     **/
    this.statusText = '';
    
    /**
     * upload
     *
     * @property upload
     * @type XMLHttpRequestUpload
     **/
    this.upload = new XMLHttpRequestUpload();
    
    /**
     * withCredentials
     *
     * @property withCredentials
     * @type Boolean
     **/
    this.withCredentials = true;
}

/**
 * prototype
 *
 * @static
 * @property prototype
 * @type XMLHttpRequestEventTarget
 */
XMLHttpRequest.prototype = new XMLHttpRequestEventTarget();

/**
 * constructor
 *
 * @property constructor
 * @type Function
 * @default XMLHttpRequest
 */
XMLHttpRequest.prototype.constructor = XMLHttpRequest;


/**
 * abort
 *
 * @method abort
 */
XMLHttpRequest.prototype.abort = function () {};

/**
 * getAllResponseHeaders
 *
 * @method getAllResponseHeaders
 * @return {String}
 */
XMLHttpRequest.prototype.getAllResponseHeaders = function () {
    return '';
};

/**
 * getResponseHeader
 *
 * @method getResponseHeader
 * @param {String} header
 * @return {String}
 */
XMLHttpRequest.prototype.getResponseHeader = function (header) {
    return '';
};

/**
 * open
 *
 * @method open
 * @param {String} method
 * @param {String} url
 * @param {Boolean} [async]
 * @param {String} [user]
 * @param {String} [password]
 */
XMLHttpRequest.prototype.open = function (method, url, async, user, password) {};

/**
 * overrideMimeType
 *
 * @method overrideMimeType
 * @param {String} mime
 */
XMLHttpRequest.prototype.overrideMimeType = function (mime) {};

/**
 * send
 *
 * @method send
 * @param {ByteArray|Document|String} [data]
 */
XMLHttpRequest.prototype.send = function (data) {};

/**
 * setRequestHeader
 *
 * @method setRequestHeader
 * @param {String} header
 * @param {String} value
 */
XMLHttpRequest.prototype.setRequestHeader = function (header, value) {};




/**
 * <p>The FormData object represents an ordered collection of entries. 
 * Each entry has a name and value.</p>
 *
 * <pre name="code" class="js">
 * fd = FormData()
 * </pre>
 *
 * @class FormData
 * @extends Object
 *
 * @constructor
 **/
function FormData() {}

/**
 * When the append(name, value) method is invoked, the user agent must create a new entry with its 
 * name set to name and its value set to value and add it to the end of the collection the FormData
 * object represents.
 *
 * @method append
 * @param {String} name
 * @param {String|Blob} value
 */
FormData.prototype.append = function (name, value){};


