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
 *
 * @module DOMLoadAndSave
 * @requires DOMCore
 *
 *
 * @see http://www.w3.org/TR/2004/REC-DOM-Level-3-LS/
 */


/**
 * LSException
 *
 * @class LSException
 */
function LSException () {

    /**
     * code
     *
     * @property code
     * @type Number
     **/
    this.code = 0;
}

/**
 * PARSE_ERR
 *
 * @static
 * @property PARSE_ERR
 * @type Number
 * @default 8
 **/
LSException.PARSE_ERR = 8;

/**
 * SERIALIZE_ERR
 *
 * @static
 * @property SERIALIZE_ERR
 * @type Number
 * @default 82
 **/
LSException.SERIALIZE_ERR = 82;



/**
 * DOMImplementationLS
 *
 * @class DOMImplementationLS
 */
function DOMImplementationLS () {}

/**
 * MODE_SYNCHRONOUS
 *
 * @static
 * @property MODE_SYNCHRONOUS
 * @type Number
 * @default 1
 **/
DOMImplementationLS.MODE_SYNCHRONOUS = 1;

/**
 * MODE_ASYNCHRONOUS
 *
 * @static
 * @property MODE_ASYNCHRONOUS
 * @type Number
 * @default 2
 **/
DOMImplementationLS.MODE_ASYNCHRONOUS = 2;

/**
 * createLSParser
 *
 * @method createLSParser
 * @throw {DOMException}
 * @param {Number} mode
 * @param {String} schemaType
 * @return {LSParse}
 */
DOMImplementationLS.prototype.createLSParser = function (mode, schemaType) {
    throw new DOMException();
    return new LSParse();
};

/**
 * createLSSerializer
 *
 * @method createLSSerializer
 * @return {LSSerializer}
 */
DOMImplementationLS.prototype.createLSSerializer = function () {
    return new LSSerializer();
};

/**
 * createLSInput
 *
 * @method createLSInput
 * @return {LSInput}
 */
DOMImplementationLS.prototype.createLSInput = function () {
    return new LSInput();
};

/**
 * createLSOutput
 *
 * @method createLSOutput
 * @return {LSOutput}
 */
DOMImplementationLS.prototype.createLSOutput = function () {
    return new LSOutput();
};



/**
 * LSParser
 *
 * @class LSParser
 */
function LSParser () {

    /**
     * domConfig
     *
     * @property domConfig
     * @type DOMConfiguration
     **/
    this.domConfig = new DOMConfiguration();

    /**
     * filter
     *
     * @property filter
     * @type LSParserFilter
     **/
    this.filter = new LSParserFilter();

    /**
     * async
     *
     * @property async
     * @type Boolean
     **/
    this.async = true;

    /**
     * busy
     *
     * @property busy
     * @type Boolean
     **/
    this.busy = true;
}

/**
 * ACTION_APPEND_AS_CHILDREN
 *
 * @static
 * @property ACTION_APPEND_AS_CHILDREN
 * @type Number
 * @default 1
 **/
LSParser.ACTION_APPEND_AS_CHILDREN = 1;

/**
 * ACTION_REPLACE_CHILDREN
 *
 * @static
 * @property ACTION_REPLACE_CHILDREN
 * @type Number
 * @default 2
 **/
LSParser.ACTION_REPLACE_CHILDREN = 2;

/**
 * ACTION_INSERT_BEFORE
 *
 * @static
 * @property ACTION_INSERT_BEFORE
 * @type Number
 * @default 3
 **/
LSParser.ACTION_INSERT_BEFORE = 3;

/**
 * ACTION_INSERT_AFTER
 *
 * @static
 * @property ACTION_INSERT_AFTER
 * @type Number
 * @default 4
 **/
LSParser.ACTION_INSERT_AFTER = 4;

/**
 * ACTION_REPLACE
 *
 * @static
 * @property ACTION_REPLACE
 * @type Number
 * @default 5
 **/
LSParser.ACTION_REPLACE = 5;

/**
 * parse
 *
 * @method parse
 * @throw {DOMException}
 * @param {LSInput} input
 * @return {Document}
 */
LSParser.prototype.parse = function (input) {
    throw new DOMException();
    return new Document();
};

/**
 * parseURI
 *
 * @method parseURI
 * @throw {DOMException}
 * @param {String} uri
 * @return {Document}
 */
LSParser.prototype.parseURI = function (uri) {
    throw new DOMException();
    return new Document();
};

/**
 * parseWithContext
 *
 * @method parseWithContext
 * @throw {DOMException}
 * @param {LSInput} input
 * @param {Node} contextArg
 * @param {Number} action
 * @return {Node}
 */
LSParser.prototype.parseWithContext = function (input, contextArg, action) {
    throw new DOMException();
    return new Node();
};

/**
 * abort
 *
 * @method abort
 */
LSParser.prototype.abort = function () {};







/**
 * LSInput
 *
 * @class LSInput
 */
function LSInput () {

    /**
     * byteStream
     *
     * @property byteStream
     * @type Object
     **/
    this.byteStream = {};

    /**
     * stringData
     *
     * @property stringData
     * @type String
     **/
    this.stringData = "";

    /**
     * systemId
     *
     * @property systemId
     * @type String
     **/
    this.systemId = "";

    /**
     * publicId
     *
     * @property publicId
     * @type String
     **/
    this.publicId = "";

    /**
     * baseURI
     *
     * @property baseURI
     * @type String
     **/
    this.baseURI = "";

    /**
     * encoding
     *
     * @property encoding
     * @type String
     **/
    this.encoding = "";

    /**
     * async
     *
     * @property async
     * @type Boolean
     **/
    this.certifiedText = true;
}





/**
 * LSResourceResolver
 *
 * @class LSResourceResolver
 */
function LSResourceResolver(){}

/**
 * resolveResource
 *
 * @method resolveResource
 * @param {String} param1
 * @param {String} param2
 * @param {String} param3
 * @param {String} param4
 * @param {String} param5
 * @return {LSInput}
 */
LSResourceResolver.prototype.resolveResource = function (param1, param2, param3, param4, param5) {
    return new LSInput();
}





/**
 * @class LSParserFilter
 */
function LSParserFilter () {

    /**
     * whatToShow
     *
     * @property whatToShow
     * @type Number
     **/
    this.whatToShow = 0;
}

/**
 * FILTER_ACCEPT
 *
 * @static
 * @property FILTER_ACCEPT
 * @type Number
 * @default 1
 **/
LSParserFilter.FILTER_ACCEPT = 1;

/**
 * FILTER_REJECT
 *
 * @static
 * @property FILTER_REJECT
 * @type Number
 * @default 2
 **/
LSParserFilter.FILTER_REJECT = 2;

/**
 * FILTER_SKIP
 *
 * @static
 * @property FILTER_SKIP
 * @type Number
 * @default 3
 **/
LSParserFilter.FILTER_SKIP = 3;

/**
 * FILTER_INTERRUPT
 *
 * @static
 * @property FILTER_INTERRUPT
 * @type Number
 * @default 4
 **/
LSParserFilter.FILTER_INTERRUPT = 4;

/**
 * startElement
 *
 * @method startElement
 * @param {Element} elementArg
 * @return {Number}
 **/
LSParserFilter.prototype.startElement = function (elementArg) {
    return 0;
};

/**
 * acceptNode
 *
 * @method acceptNode
 * @param {Node} nodeArg
 * @return {Number}
 **/
LSParserFilter.prototype.acceptNode = function (nodeArg) {
    return 0;
};



/**
 * LSProgressEvent
 *
 * @class LSProgressEvent
 * @extends Event
 */
function LSProgressEvent () {

    /**
     * input
     *
     * @property input
     * @type LSInput
     **/
    this.input = new LSInput();

    /**
     * position
     *
     * @property position
     * @type Number
     **/
    this.position = 0;

    /**
     * totalSize
     *
     * @property totalSize
     * @type Number
     **/
    this.totalSize = 0;
}

/**
 * prototype
 *
 * @static 
 * @property prototype
 * @type Event
 **/
LSProgressEvent.prototype = new Event();

/**
 * constructor
 *
 * @property constructor
 * @type Function
 * @default LSProgressEvent
 **/
LSProgressEvent.prototype.constructor = LSProgressEvent;




/**
 * LSLoadEvent
 *
 * @class LSLoadEvent
 * @extends Event
 */
function LSLoadEvent () {

    /**
     * newDocument
     *
     * @property newDocument
     * @type Document
     **/
    this.newDocument = new Document();

    /**
     * input
     *
     * @property input
     * @type LSInput
     **/
    this.input = new LSInput();
}

/**
 * prototype
 *
 * @static 
 * @property prototype
 * @type Event
 **/
LSLoadEvent.prototype = new Event();

/**
 * constructor
 *
 * @property constructor
 * @type Function
 * @default LSLoadEvent
 **/
LSLoadEvent.prototype.constructor = LSLoadEvent;




/**
 * LSSerializer
 *
 * @class LSSerializer
 */
function LSSerializer () {

    /**
     * domConfig
     *
     * @property domConfig
     * @type DOMConfiguration
     **/
    this.domConfig = new DOMConfiguration();

    /**
     * newLine
     *
     * @property newLine
     * @type String
     **/
    this.newLine = "";

    /**
     * filter
     *
     * @property filter
     * @type LSSerializerFilter
     **/
    this.filter = new LSSerializerFilter();
}

/**
 * write
 *
 * @method write
 * @throw {DOMException}
 * @param {Node} nodeArg
 * @param {LSOutput} destination
 * @return {Boolean}
 */
LSSerializer.prototype.write = function (nodeArg, destination) {
    throw new DOMException();
    return true;
};

/**
 * writeToURI
 *
 * @method writeToURI
 * @throw {DOMException}
 * @param {Node} nodeArg
 * @param {String} uri
 * @return {Number}
 */
LSSerializer.prototype.writeToURI = function (nodeArg, uri) {
    throw new DOMException();
    return 0;
};

/**
 * writeToString
 *
 * @method writeToString
 * @throw {DOMException}
 * @param {Node} nodeArg
 * @return {String}
 */
LSSerializer.prototype.writeToString = function (nodeArg) {
    throw new DOMException();
    return "";
};





/**
 * LSOutput
 *
 * @class LSOutput
 **/
function LSOutput () {

    /**
     * byteStream
     *
     * @property byteStream
     * @type Object
     **/
    this.byteStream = {};

    /**
     * systemId
     *
     * @property systemId
     * @type String
     **/
    this.systemId = "";

    /**
     * encoding
     *
     * @property encoding
     * @type String
     **/
    this.encoding = "";
}




/**
 * LSSerializerFilter
 *
 * @class LSSerializerFilter
 * @extends NodeFilter
 **/
function LSSerializerFilter () {

    /**
     * whatToShow
     *
     * @property whatToShow
     * @type Number
     **/
    this.whatToShow = 0;
}

/**
 * prototype
 *
 * @static 
 * @property prototype
 * @type NodeFilter
 **/
LSSerializerFilter.prototype = new NodeFilter();

/**
 * constructor
 *
 * @property constructor
 * @type Function
 * @default LSSerializerFilter
 **/
LSSerializerFilter.prototype.constructor = LSSerializerFilter;

