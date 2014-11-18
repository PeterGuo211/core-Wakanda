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
 * @module DOMValidation
 * @requires DOMCore
 * 
 * @see http://www.w3.org/TR/DOM-Level-3-Val/
 */

/**
 * ExceptionVAL
 *
 * @class ExceptionVAL
 * @extends Error
 */
function ExceptionVAL () {

    /**
     * code
     *
     * @property code
     * @type Number
     */
    this.code = 0;
}

/**
 * NO_SCHEMA_AVAILABLE_ERR
 *
 * @static
 * @property NO_SCHEMA_AVAILABLE_ERR
 * @type Number
 * @default 71
 */
ExceptionVAL.NO_SCHEMA_AVAILABLE_ERR = 71;




/**
 * DocumentEditVAL
 *
 * @class DocumentEditVAL
 * @extends NodeEditVAL
 */
function DocumentEditVAL () {

    /**
     * continuousValidityChecking
     *
     * @property continuousValidityChecking
     * @type Boolean
     */
    this.continuousValidityChecking = true;

    /**
     * domConfig
     *
     * @property domConfig
     * @type DOMConfiguration
     */
    this.domConfig = new DOMConfiguration();
}

/**
 * prototype
 *
 * @static
 * @property prototype
 * @type NodeEditVAL
 */
DocumentEditVAL.prototype = new NodeEditVAL();

/**
 * constructor
 *
 * @property constructor
 * @type Function
 * @default DocumentEditVAL
 */
DocumentEditVAL.prototype.constructor = DocumentEditVAL;

/**
 * getDefinedElements
 *
 * @method getDefinedElements
 * @param {String} namespaceURI
 * @return {NameList}
 */
DocumentEditVAL.prototype.getDefinedElements = function getDefinedElements(namespaceURI) {
    return new NameList();
};

/**
 * validateDocument
 *
 * @method validateDocument
 * @return {Number}
 */
DocumentEditVAL.prototype.validateDocument = function validateDocument() {
    return 0;
};


/**
 * NodeEditVAL
 *
 * @class NodeEditVAL
 * @extends Object
 */
function NodeEditVAL () {

    /**
     * defaultValue
     *
     * @property defaultValue
     * @type Number
     */
    this.defaultValue = "";

    /**
     * enumeratedValues
     *
     * @property enumeratedValues
     * @type DOMStringList
     */
    this.enumeratedValues = new DOMStringList();
}

/**
 * VAL_WF
 *
 * @static
 * @property VAL_WF
 * @type Number
 * @default 1
 */
NodeEditVAL.VAL_WF = 1;

/**
 * VAL_NS_WF
 *
 * @static
 * @property VAL_NS_WF
 * @type Number
 * @default 2
 */
NodeEditVAL.VAL_NS_WF = 2;

/**
 * VAL_INCOMPLETE
 *
 * @static
 * @property VAL_INCOMPLETE
 * @type Number
 * @default 3
 */
NodeEditVAL.VAL_INCOMPLETE = 3;

/**
 * VAL_SCHEMA
 *
 * @static
 * @property VAL_SCHEMA
 * @type Number
 * @default 4
 */
NodeEditVAL.VAL_SCHEMA = 4;

/**
 * VAL_TRUE
 *
 * @static
 * @property VAL_TRUE
 * @type Number
 * @default 5
 */
NodeEditVAL.VAL_TRUE = 5;

/**
 * VAL_FALSE
 *
 * @static
 * @property VAL_FALSE
 * @type Number
 * @default 6
 */
NodeEditVAL.VAL_FALSE = 6;

/**
 * VAL_UNKNOWN
 *
 * @static
 * @property VAL_UNKNOWN
 * @type Number
 * @default 7
 */
NodeEditVAL.VAL_UNKNOWN = 7;

/**
 * canInsertBefore
 *
 * @method canInsertBefore
 * @param {Node} newChild
 * @param {Node} refChild
 * @return {Number}
 */
NodeEditVAL.prototype.canInsertBefore = function canInsertBefore(newChild, refChild) {
    return 0;
};

/**
 * canRemoveChild
 *
 * @method canRemoveChild
 * @param {Node} oldChild
 * @return {Number}
 */
NodeEditVAL.prototype.canRemoveChild = function canRemoveChild(oldChild) {
    return 0;
};

/**
 * canAppendChild
 *
 * @method canAppendChild
 * @param {Node} newChild
 * @return {Number}
 */
NodeEditVAL.prototype.canAppendChild = function canAppendChild(newChild) {
    return 0;
};

/**
 * nodeValidity
 *
 * @method nodeValidity
 * @param {Number} valType
 * @return {Number}
 */
NodeEditVAL.prototype.nodeValidity = function nodeValidity(valType) {
    return 0;
};



/**
 * ElementEditVAL
 *
 * @class ElementEditVAL
 * @extends NodeEditVAL
 */ 
function ElementEditVAL () {

    /**
     * allowedChildren
     *
     * @property allowedChildren
     * @type NameList
     */
    this.allowedChildren = new NameList();

    /**
     * allowedFirstChildren
     *
     * @property allowedFirstChildren
     * @type NameList
     */
    this.allowedFirstChildren = new NameList();

    /**
     * allowedParents
     *
     * @property allowedParents
     * @type NameList
     */
    this.allowedParents = new NameList();

    /**
     * allowedNextSiblings
     *
     * @property allowedNextSiblings
     * @type NameList
     */
    this.allowedNextSiblings = new NameList();

    /**
     * allowedPreviousSiblings
     *
     * @property allowedPreviousSiblings
     * @type NameList
     */
    this.allowedPreviousSiblings = new NameList();

    /**
     * allowedAttributes
     *
     * @property allowedAttributes
     * @type NameList
     */
    this.allowedAttributes = new NameList();

    /**
     * requiredAttributes
     * 
     * @property requiredAttributes
     * @type NameList
     */
    this.requiredAttributes = new NameList();

    /**
     * contentType
     *
     * @property contentType
     * @type Number
     */
    this.contentType = 0;
}

/**
 * prototype
 *
 * @static
 * @property prototype
 * @type NodeEditVAL
 */
ElementEditVAL.prototype = new NodeEditVAL();

/**
 * constructor
 *
 * @property constructor
 * @type Function
 * @default ElementEditVAL
 */
ElementEditVAL.prototype.constructor = ElementEditVAL;

/**
 * VAL_EMPTY_CONTENTTYPE
 *
 * @static
 * @property VAL_EMPTY_CONTENTTYPE
 * @type Number
 * @default 1
 */
ElementEditVAL.VAL_EMPTY_CONTENTTYPE = 1;

/**
 * VAL_ANY_CONTENTTYPE
 *
 * @static
 * @property VAL_ANY_CONTENTTYPE
 * @type Number
 * @default 2
 */
ElementEditVAL.VAL_ANY_CONTENTTYPE = 2;

/**
 * VAL_MIXED_CONTENTTYPE
 *
 * @static
 * @property VAL_MIXED_CONTENTTYPE
 * @type Number
 * @default 3
 */
ElementEditVAL.VAL_MIXED_CONTENTTYPE = 3;

/**
 * VAL_ELEMENTS_CONTENTTYPE
 *
 * @static
 * @property VAL_ELEMENTS_CONTENTTYPE
 * @type Number
 * @default 4
 */
ElementEditVAL.VAL_ELEMENTS_CONTENTTYPE = 4;

/**
 * VAL_SIMPLE_CONTENTTYPE
 *
 * @static
 * @property VAL_SIMPLE_CONTENTTYPE
 * @type Number
 * @default 5
 */
ElementEditVAL.VAL_SIMPLE_CONTENTTYPE = 5;

/**
 * canSetTextContent
 *
 * @method canSetTextContent
 * @param {String} possibleTextContent
 * @return {Number}
 */
ElementEditVAL.prototype.canSetTextContent = function canSetTextContent(possibleTextContent) {
    return 0;
};

/**
 * canSetAttribute
 *
 * @method canSetAttribute
 * @param {String} attrname
 * @param {String} attrval
 * @return {Number}
 */
ElementEditVAL.prototype.canSetAttribute = function canSetAttribute(attrname, attrval) {
    return 0;
};

/**
 * canSetAttributeNode
 *
 * @method canSetAttributeNode
 * @param {Attr} attrNode
 * @return {Number}
 */
ElementEditVAL.prototype.canSetAttributeNode = function canSetAttributeNode(attrNode) {
    return 0;
};

/**
 * canSetAttributeNS
 *
 * @method canSetAttributeNS
 * @param {String} namespaceURI
 * @param {String} qualifiedName
 * @param {String} value
 * @return {Number}
 */
ElementEditVAL.prototype.canSetAttributeNS = function (namespaceURI, qualifiedName, value) {
    return 0;
};

/**
 * canRemoveAttribute
 *
 * @method canRemoveAttribute
 * @param {String} attrname
 * @return {Number}
 */
ElementEditVAL.prototype.canRemoveAttribute = function canRemoveAttribute(attrname) {
    return 0;
};

/**
 * canRemoveAttributeNS
 *
 * @method canRemoveAttributeNS
 * @param {String} namespaceURI
 * @param {String} localName
 * @return {Number}
 */
ElementEditVAL.prototype.canRemoveAttributeNS = function canRemoveAttributeNS(namespaceURI, localName) {
    return 0;
};

/**
 * canRemoveAttributeNode
 *
 * @method canRemoveAttributeNode
 * @param {Attr} attrNode
 * @return {Number}
 */
ElementEditVAL.prototype.canRemoveAttributeNode = function canRemoveAttributeNode(attrNode) {
    return 0;
};

/**
 * isElementDefined
 *
 * @method isElementDefined
 * @param {String} name
 * @return {Number}
 */
ElementEditVAL.prototype.isElementDefined = function isElementDefined(name) {
    return 0;
};

/**
 * isElementDefinedNS
 *
 * @method isElementDefinedNS
 * @param {String} namespaceURI
 * @param {String} name
 * @return {Number}
 */
ElementEditVAL.prototype.isElementDefinedNS = function isElementDefinedNS(namespaceURI, name) {
    return 0;
};






/**
 * CharacterDataEditVAL
 *
 * @class CharacterDataEditVAL
 * @extends NodeEditVAL
 */ 
function CharacterDataEditVAL () {

}

/**
 * prototype
 *
 * @static
 * @property prototype
 * @type NodeEditVAL
 */
CharacterDataEditVAL.prototype = new NodeEditVAL();

/**
 * constructor
 *
 * @property constructor
 * @type Function
 * @default CharacterDataEditVAL
 */
CharacterDataEditVAL.prototype.constructor = CharacterDataEditVAL;

/**
 * isWhitespaceOnly
 *
 * @method isWhitespaceOnly
 * @return {Number}
 */
ElementEditVAL.prototype.isWhitespaceOnly = function isWhitespaceOnly() {
    return 0;
};

/**
 * canSetData 
 *
 * @method canSetData
 * @param {String} arg
 * @return {Number}
 */
ElementEditVAL.prototype.canSetData = function canSetData(arg) {
    return 0;
};

/**
 * canAppendData
 *
 * @method canAppendData
 * @param {String} arg
 * @return {Number}
 */
ElementEditVAL.prototype.canAppendData = function canAppendData(arg) {
    return 0;
};

/**
 * canReplaceData
 *
 * @method canReplaceData
 * @throw DOMException
 * @param {Number} offset
 * @param {Number} count
 * @param {String} arg
 * @return {Number}
 */
ElementEditVAL.prototype.canReplaceData = function canReplaceData(offset, count, arg) {
    throw new DOMException();
    return 0;
};

/**
 * canInsertData
 *
 * @method canInsertData
 * @throw DOMException
 * @param {Number} offset
 * @param {String} arg
 * @return {Number}
 */
ElementEditVAL.prototype.canInsertData = function canInsertData(offset, arg) {
    throw new DOMException();
    return 0;
};

/**
 * canDeleteData
 *
 * @method canDeleteData
 * @throw DOMException
 * @param {Number} offset
 * @param {Number} count
 * @return {Number}
 */
ElementEditVAL.prototype.canDeleteData = function canDeleteData(offset, count) {
    throw new DOMException();
    return 0;
};


