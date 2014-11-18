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
 * DOMCore
 *
 * @module DOMCore
 *
 * @see http://www.w3.org/TR/DOM-Level-2-Core/
 * @see http://www.w3.org/TR/DOM-Level-3-Core/
 */

/**
 * DOMException
 *
 * @dom 1
 *
 * @class DOMException
 * @extends Object
 */
function DOMException() {

    /**
     * code
     *
     * @dom 2
     *
     * @property code
     * @type Number
     */
    this.code = 0
}

/**
 * INDEX_SIZE_ERR
 *
 * @dom 2
 *
 * @static
 * @property INDEX_SIZE_ERR
 * @type Number
 * @default 1
 */
DOMException.INDEX_SIZE_ERR = 1;

/**
 * DOMSTRING_SIZE_ERR
 *
 * @dom 2
 *
 * @static
 * @property DOMSTRING_SIZE_ERR
 * @type Number
 * @default 2
 */
DOMException.DOMSTRING_SIZE_ERR = 2;

/**
 * HIERARCHY_REQUEST_ERR
 *
 * @dom 2
 *
 * @static
 * @property HIERARCHY_REQUEST_ERR
 * @type Number
 * @default 3
 */
DOMException.HIERARCHY_REQUEST_ERR =3;

/**
 * WRONG_DOCUMENT_ERR
 *
 * @dom 2
 *
 * @static
 * @property WRONG_DOCUMENT_ERR
 * @type Number
 * @default 4
 */
DOMException.WRONG_DOCUMENT_ERR = 4;

/**
 * INVALID_CHARACTER_ERR
 *
 * @dom 2
 *
 * @static
 * @property INVALID_CHARACTER_ERR
 * @type Number
 * @default 5
 */
DOMException.INVALID_CHARACTER_ERR = 5;

/**
 * NO_DATA_ALLOWED_ERR
 *
 * @dom 2
 *
 * @static
 * @property NO_DATA_ALLOWED_ERR
 * @type Number
 * @default 6
 */
DOMException.NO_DATA_ALLOWED_ERR = 6;

/**
 * NO_MODIFICATION_ALLOWED_ERR
 *
 * @dom 2
 *
 * @static
 * @property NO_MODIFICATION_ALLOWED_ERR
 * @type Number
 * @default 7
 */
DOMException.NO_MODIFICATION_ALLOWED_ERR = 7;

/**
 * NOT_FOUND_ERR
 *
 * @dom 2
 *
 * @static
 * @property NOT_FOUND_ERR
 * @type Number
 * @default 8
 */
DOMException.NOT_FOUND_ERR = 8;

/**
 * NOT_SUPPORTED_ERR
 *
 * @dom 2
 *
 * @static
 * @property NOT_SUPPORTED_ERR
 * @type Number
 * @default 9
 */
DOMException.NOT_SUPPORTED_ERR = 9;

/**
 * INUSE_ATTRIBUTE_ERR
 *
 * @dom 2
 *
 * @static
 * @property INUSE_ATTRIBUTE_ERR
 * @type Number
 * @default 10
 */
DOMException.INUSE_ATTRIBUTE_ERR = 10;

/**
 * INVALID_STATE_ERR
 *
 * @dom 2
 *
 * @static
 * @property INVALID_STATE_ERR
 * @type Number
 * @default 11
 */
DOMException.INVALID_STATE_ERR = 11;

/**
 * SYNTAX_ERR
 *
 * @dom 2
 *
 * @static
 * @property SYNTAX_ERR
 * @type Number
 * @default 12
 */
DOMException.SYNTAX_ERR = 12;

/**
 * INVALID_MODIFICATION_ERR
 *
 * @dom 2
 *
 * @static
 * @property INVALID_MODIFICATION_ERR
 * @type Number
 * @default 13
 */
DOMException.INVALID_MODIFICATION_ERR = 13;

/**
 * NAMESPACE_ERR
 *
 * @dom 2
 * 
 * @static
 * @property NAMESPACE_ERR
 * @type Number
 * @default 14
 */
DOMException.NAMESPACE_ERR = 14;

/**
 * INVALID_ACCESS_ERR
 *
 * @dom 2
 *
 * @static
 * @property INVALID_ACCESS_ERR
 * @type Number
 * @default 15
 */
DOMException.INVALID_ACCESS_ERR = 15;

/**
 * VALIDATION_ERR
 *
 * @dom 3
 *
 * @static
 * @property VALIDATION_ERR
 * @type Number
 * @default 16
 */
DOMException.VALIDATION_ERR = 16;

/**
 * TYPE_MISMATCH_ERR
 *
 * @dom 3
 *
 * @static
 * @property TYPE_MISMATCH_ERR
 * @type Number
 * @default 17
 */
DOMException.TYPE_MISMATCH_ERR = 17;





/**
 * ExceptionCode
 *
 * @dom 1, 2
 *
 * @class ExceptionCode
 * @extends Object
 */
function ExceptionCode () {
    
    /**
     * code
     *
     * @dom 2
     *
     * @property code
     * @type Number
     */
    this.code = 0
}





/**
 * DOMImplementation
 *
 * @dom 1
 *
 * @class DOMImplementation
 * @extends Object
 */
function DOMImplementation() {}

/**
 * hasFeature
 *
 * @dom 1
 *
 * @method hasFeature
 * @param {String} feature
 * @param {String} version
 * @return {Boolean}
 */
DOMImplementation.prototype.hasFeature = function ( feature, version ) {};

/**
 * createDocumentType
 *
 * @dom 1
 *
 * @method createDocumentType
 * @param {String} qualifiedName
 * @param {String} publicId
 * @param {String} systemId
 */
DOMImplementation.prototype.createDocumentType = function (qualifiedName, publicId, systemId){};

/**
 * createDocument
 *
 * @dom 1
 *
 * @method createDocument
 * @param {String} namespaceURI
 * @param {String} qualifiedName
 * @param {String} doctype
 */
DOMImplementation.prototype.createDocument = function (namespaceURI, qualifiedName, doctype) {};

/**
 * getFeature
 *
 * @dom 1
 *
 * @method getFeature
 * @param {DOMString} feature
 * @param {DOMString} version
 */
DOMImplementation.prototype.getFeature = function (feature, version) {};



/**
 * Node
 * 
 * @dom 1
 *
 * @class Node
 * @extends Object
 */
function Node() {
    
    /**
     * nodeName
     *
     * @dom 2
     *
     * @property nodeName
     * @type String
     */
    this.nodeName = "";
    
    /**
     * nodeValue
     *
     * @dom 2
     *
     * @property nodeValue
     * @type String
     */
    this.nodeValue = "";
    
    /**
     * nodeType
     *
     * @dom 2
     *
     * @property nodeType
     * @type Number
     */
    this.nodeType = 0;
    
    /**
     * parentNode
     *
     * @dom 2
     *
     * @property parentNode
     * @type Node
     */
    this.parentNode = new Node();
    
    /**
     * childNodes
     *
     * @dom 2
     *
     * @property childNodes
     * @type NodeList
     */
    this.childNodes = new NodeList();
    
    /**
     * firstChild
     *
     * @dom 2
     *
     * @property firstChild
     * @type Node
     */
    this.firstChild = new Node();
    
    /**
     * lastChild
     *
     * @dom 2
     *
     * @property lastChild
     * @type Node
     */
    this.lastChild = new Node();
    
    /**
     * previousSibling
     *
     * @dom 2
     *
     * @property previousSibling
     * @type Node
     */
    this.previousSibling = new Node();
    
    /**
     * nextSibling
     *
     * @dom 2
     *
     * @property nextSibling
     * @type Node
     */
    this.nextSibling = new Node();
    
    /**
     * attributes
     *
     * @dom 2
     *
     * @property attributes
     * @type NamedNodeMap
     */
    this.attributes = new NamedNodeMap();
    
    /**
     * ownerDocument
     *
     * @dom 2
     *
     * @property ownerDocument
     * @type Document
     */
    this.ownerDocument = new Document();
}

/**
 * ELEMENT_NODE
 *
 * @dom 2
 *
 * @static
 * @property ELEMENT_NODE
 * @type Number
 * @default 1
 */
Node.ELEMENT_NODE = 1;

/**
 * ATTRIBUTE_NODE
 *
 * @dom 2
 *
 * @static
 * @property ATTRIBUTE_NODE
 * @type Number
 * @default 2
 */
Node.ATTRIBUTE_NODE = 2;

/**
 * TEXT_NODE
 *
 * @dom 2
 *
 * @static
 * @property TEXT_NODE
 * @type Number
 * @default 3
 */
Node.TEXT_NODE = 3;

/**
 * CDATA_SECTION_NODE
 *
 * @dom 2
 *
 * @static
 * @property CDATA_SECTION_NODE
 * @type Number
 * @default 4
 */
Node.CDATA_SECTION_NODE = 4;

/**
 * ENTITY_REFERENCE_NODE
 *
 * @dom 2
 *
 * @static
 * @property ENTITY_REFERENCE_NODE
 * @type Number
 * @default 5
 */
Node.ENTITY_REFERENCE_NODE = 5;

/**
 * ENTITY_NODE
 *
 * @dom 2
 *
 * @static
 * @property ENTITY_NODE
 * @type Number
 * @default 6
 */
Node.ENTITY_NODE = 6;

/**
 * PROCESSING_INSTRUCTION_NODE
 *
 * @dom 2
 *
 * @static
 * @property PROCESSING_INSTRUCTION_NODE
 * @type Number
 * @default 7
 */
Node.PROCESSING_INSTRUCTION_NODE = 7;

/**
 * COMMENT_NODE
 *
 * @dom 2
 *
 * @static
 * @property COMMENT_NODE
 * @type Number
 * @default 8
 */
Node.COMMENT_NODE = 8;

/**
 * DOCUMENT_NODE
 *
 * @dom 2
 *
 * @static
 * @property DOCUMENT_NODE
 * @type Number
 * @default 9
 */
Node.DOCUMENT_NODE = 9;

/**
 * DOCUMENT_TYPE_NODE
 *
 * @dom 2
 *
 * @static
 * @property DOCUMENT_TYPE_NODE
 * @type Number
 * @default 10
 */
Node.DOCUMENT_TYPE_NODE = 10;

/**
 * DOCUMENT_FRAGMENT_NODE
 *
 * @dom 2
 *
 * @static
 * @property DOCUMENT_FRAGMENT_NODE
 * @type Number
 * @default 11
 */
Node.DOCUMENT_FRAGMENT_NODE = 11;

/**
 * NOTATION_NODE
 *
 * @dom 2
 *
 * @static
 * @property NOTATION_NODE
 * @type Number
 * @default 12
 */
Node.NOTATION_NODE = 12;

/**
 * DOCUMENT_POSITION_DISCONNECTED
 *
 * @dom 2
 *
 * @static
 * @property DOCUMENT_POSITION_DISCONNECTED
 * @type Number
 * @default 0x01
 */
Node.DOCUMENT_POSITION_DISCONNECTED = 0x01;

/**
 * DOCUMENT_POSITION_PRECEDING
 *
 * @dom 2
 *
 * @static
 * @property DOCUMENT_POSITION_PRECEDING
 * @type Number
 * @default 0x02
 */
Node.DOCUMENT_POSITION_PRECEDING = 0x02;

/**
 * DOCUMENT_POSITION_FOLLOWING
 *
 * @dom 2
 *
 * @static
 * @property DOCUMENT_POSITION_FOLLOWING
 * @type Number
 * @default 0x04
 */
Node.DOCUMENT_POSITION_FOLLOWING = 0x04;

/**
 * DOCUMENT_POSITION_CONTAINS
 *
 * @dom 2
 *
 * @static
 * @property DOCUMENT_POSITION_CONTAINS
 * @type Number
 * @default 0x08
 */
Node.DOCUMENT_POSITION_CONTAINS = 0x08;

/**
 * DOCUMENT_POSITION_CONTAINED_BY
 *
 * @dom 2
 *
 * @static
 * @property DOCUMENT_POSITION_CONTAINED_BY
 * @type Number
 * @default 0x10
 */
Node.DOCUMENT_POSITION_CONTAINED_BY = 0x10;

/**
 * DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
 *
 * @dom 2
 *
 * @static
 * @property DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
 * @type Number
 * @default 0x20
 */
Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20;

/**
 * insertBefore
 *
 * @dom 1
 *
 * @method insertBefore
 * @param {Node} newChild
 * @param {Node} refChild
 */
Node.prototype.insertBefore = function( newChild, refChild ) {};

/**
 * replaceChild
 *
 * @dom 1
 *
 * @method replaceChild
 * @param {Node} newChild
 * @param {Node} refChild
 */
Node.prototype.replaceChild = function( newChild, oldChild ) {};

/**
 * removeChild
 *
 * @dom 1
 *
 * @method removeChild
 * @param {Node} oldChild
 */
Node.prototype.removeChild = function( oldChild ) {};

/**
 * appendChild
 *
 * @dom 1
 *
 * @method appendChild
 * @param {Node} newChild
 */
Node.prototype.appendChild = function( newChild ) {};

/**
 * hadChildNodes
 *
 * @dom 1
 *
 * @method hadChildNodes
 * @param {String} data
 */
Node.prototype.hadChildNodes = function() {};

/**
 * cloneNode
 *
 * @dom 1
 *
 * @method cloneNode
 * @param {Number} deep
 */
Node.prototype.cloneNode = function( deep ) {};





/**
 * DocumentFragment
 *
 * @class DocumentFragment
 * @extends Node
 **/
function DocumentFragment() {}
DocumentFragment.prototype = new Node();
DocumentFragment.prototype.constructor = DocumentFragment



/**
 * Document
 *
 * @class Document
 * @extends Node
 **/
function Document() {
    
    /**
     * doctype
     *
     * @dom 2
     *
     * @property doctype
     * @type DocumentType
     */
    this.doctype = new DocumentType();
    
    /**
     * implementation
     *
     * @dom 2
     *
     * @property implementation
     * @type DOMImplementation
     */
    this.implementation = new DOMImplementation();
    
    /**
     * documentElement
     *
     * @dom 2
     *
     * @property documentElement
     * @type Element
     */
    this.documentElement = new Element();
}
Document.prototype = new Node();
Document.prototype.constructor = Document;

/**
 * createElement
 *
 * @dom 1
 *
 * @method createElement
 * @param {String} tagName
 */
Document.prototype.createElement = function( tagName ) {};

/**
 * createDocumentFragment
 *
 * @dom 1
 *
 * @method createDocumentFragment
 */
Document.prototype.createDocumentFragment = function() {};

/**
 * createTextNode
 *
 * @dom 1
 *
 * @method createTextNode
 * @param {String} data
 */
Document.prototype.createTextNode = function( data ) {};

/**
 * createComment
 *
 * @dom 1
 *
 * @method createComment
 * @param {String} data
 */
Document.prototype.createComment = function( data ) {};

/**
 * createCDATASection
 *
 * @dom 1
 *
 * @method createCDATASection
 * @param {String} data
 */
Document.prototype.createCDATASection = function( data ) {};

/**
 * createProcessingInstruction
 *
 * @dom 1
 *
 * @method createProcessingInstruction
 * @param {String} target
 * @param {String} data
 */
Document.prototype.createProcessingInstruction = function (target, data ) {};

/**
 * createAttribute
 *
 * @dom 1
 *
 * @method createAttribute
 * @param {String} name
 */
Document.prototype.createAttribute = function( name ) {};

/**
 * createEntityReference
 *
 * @dom 1
 *
 * @method createEntityReference
 * @param {String} name
 */
Document.prototype.createEntityReference = function( name ) {};

/**
 * getElementsByTagName
 *
 * @dom 1
 *
 * @method getElementsByTagName
 * @param {String} name
 */
Document.prototype.getElementsByTagName = function( tagname ) {};





/**
 * NodeList
 *
 * @class NodeList
 * @extends Object
 **/
function NodeList() {
    
    /**
     * length
     *
     * @dom 2
     *
     * @property length
     * @type Number
     */
    this.length = 0;
}
NodeList.prototype.item = function( index ) {};

/**
 * NamedNodeMap
 *
 * @class NamedNodeMap
 * @extends Object
 **/
function NamedNodeMap() {
    
    /**
     * length
     *
     * @dom 2
     *
     * @property length
     * @type Number
     */
    this.length = 0;
}

/**
 * getNamedItem
 *
 * @dom 1
 *
 * @method getNamedItem
 * @param {String} name
 */
NamedNodeMap.prototype.getNamedItem = function( name ) {};

/**
 * setNamedItem
 *
 * @dom 1
 *
 * @method setNamedItem
 * @param {String} arg
 */
NamedNodeMap.prototype.setNamedItem = function( arg ) {};

/**
 * removeNamedItem
 *
 * @dom 1
 *
 * @method removeNamedItem
 * @param {String} name
 */
NamedNodeMap.prototype.removeNamedItem = function( name ) {};

/**
 * item
 *
 * @dom 1
 *
 * @method item
 * @param {Number} index
 */
NamedNodeMap.prototype.item = function( index ) {};





/**
 * CharacterData
 *
 * @class CharacterData
 * @extends Node
 **/
function CharacterData() {
    
    /**
     * data
     *
     * @dom 2
     *
     * @property data
     * @type String
     */
    this.data = "";
    
    /**
     * length
     *
     * @dom 2
     *
     * @property length
     * @type Number
     */
    this.length = 0;
}
CharacterData.prototype = new Node();
CharacterData.prototype.constructor = CharacterData;

/**
 * substringData
 *
 * @dom 1
 *
 * @method substringData
 * @param {Number} offset
 * @param {Number} count
 */
CharacterData.prototype.substringData = function( offset, count ) {};

/**
 * appendData
 *
 * @dom 1
 *
 * @method appendData
 * @param {String} arg
 */
CharacterData.prototype.appendData = function( arg ) {};

/**
 * insertData
 *
 * @dom 1
 *
 * @method insertData
 * @param {Number} offset
 * @param {String} arg
 */
CharacterData.prototype.insertData = function( offset, arg ) {};

/**
 * deleteData
 *
 * @dom 1
 *
 * @method deleteData
 * @param {Number} offset
 * @param {Number} count
 */
CharacterData.prototype.deleteData = function( offset, count ) {};

/**
 * replaceData
 *
 * @dom 1
 *
 * @method replaceData
 * @param {Number} offset
 * @param {Number} count
 * @param {String} arg
 */
CharacterData.prototype.replaceData = function( offset, count, arg ) {};




/**
 * Attr
 *
 * @class Attr
 * @extends Node
 **/
function Attr() {
    
    /**
     * isId
     *
     * @dom 2
     *
     * @property isId
     * @type Boolean
     */
    this.isId = true;
    
    /**
     * name
     *
     * @dom 2
     *
     * @property name
     * @type String
     */
    this.name = "";
    
    /**
     * specified
     *
     * @dom 2
     *
     * @property specified
     * @type Boolean
     */
    this.specified = false;
    
    /**
     * value
     *
     * @dom 2
     *
     * @property value
     * @type Number
     */
    this.value = 0;
    
    /**
     * schemaTypeInfo
     *
     * @dom 2
     *
     * @property schemaTypeInfo
     * @type TypeInfo
     */
    this.schemaTypeInfo = new TypeInfo();
}
Attr.prototype = new Node();
Attr.prototype.constructor = Attr;




/**
 * Element
 *
 * @class Element
 * @extends Node
 **/
function Element() {	
    
    /**
     * tagName
     *
     * @dom 2
     *
     * @property tagName
     * @type String
     */
    this.tagName = "";
}
Element.prototype = new Node();
Element.prototype.constructor = Element;

/**
 * getAttribute
 *
 * @dom 1
 *
 * @method getAttribute
 * @param {String} name
 */
Element.prototype.getAttribute = function( name ) {};

/**
 * setAttribute
 *
 * @dom 1
 *
 * @method setAttribute
 * @param {String} name
 * @param {String} value
 */
Element.prototype.setAttribute = function( name, value ) {};

/**
 * removeAttribute
 *
 * @dom 1
 *
 * @method removeAttribute
 * @param {String} name
 */
Element.prototype.removeAttribute = function( name ) {};

/**
 * getAttributeNode
 *
 * @dom 1
 *
 * @method getAttributeNode
 * @param {String} name
 */
Element.prototype.getAttributeNode = function( name ) {};

/**
 * setAttributeNode
 *
 * @dom 1
 *
 * @method setAttributeNode
 * @param {String} newAttr
 */
Element.prototype.setAttributeNode = function( newAttr ) {};

/**
 * removeAttributeNode
 *
 * @dom 1
 *
 * @method removeAttributeNode
 * @param {String} oldAttr
 */
Element.prototype.removeAttributeNode = function( oldAttr ) {};

/**
 * getElementsByTagName
 *
 * @dom 1
 *
 * @method getElementsByTagName
 * @param {String} name
 */
Element.prototype.getElementsByTagName = function( name ) {};

/**
 * normalize
 *
 * @dom 1
 *
 * @method normalize
 */
Element.prototype.normalize = function() {};




/**
 * Text
 *
 * @class Text
 * @extends CharacterData
 **/
function Text() {}
Text.prototype = new CharacterData();
Text.prototype.constructor = Text;

/**
 * splitText
 *
 * @dom 1
 *
 * @method splitText
 * @param {Number} offset
 */
Text.prototype.splitText = function( offset ) {};




/**
 * Comment
 *
 * @class Comment
 * @extends CharacterData
 **/
function Comment() {}
Comment.prototype = new CharacterData();
Comment.prototype.constructor = Comment;




/**
 * CDATASection
 *
 * @class CDATASection
 * @extends Text
 **/
function CDATASection() {}
CDATASection.prototype = new Text();
CDATASection.prototype.constructor = CDATASection;




/**
 * DocumentType
 *
 * @class DocumentType
 * @extends Node
 **/
function DocumentType() {
    
    /**
     * name
     *
     * @dom 2
     *
     * @property name
     * @type String
     */
    this.name = "";
    
    /**
     * entities
     *
     * @dom 2
     *
     * @property entities
     * @type NamedNodeMap
     */
    this.entities = new NamedNodeMap();
    
    /**
     * notations
     *
     * @dom 2
     *
     * @property notations
     * @type NamedNodeMap
     */
    this.notations = new NamedNodeMap();
    
    /**
     * publicId
     *
     * @dom 2
     *
     * @property publicId
     * @type String
     */
    this.publicId = "";
    
    /**
     * systemId
     *
     * @dom 2
     *
     * @property systemId
     * @type String
     */
    this.systemId = "";
    
    /**
     * internalSubset
     *
     * @dom 2
     *
     * @property internalSubset
     * @type String
     */
    this.internalSubset = "";
}
DocumentType.prototype = new Node();
DocumentType.prototype.constructor = DocumentType;

/**
 * Notation
 *
 * @class Notation
 * @extends Node
 **/
function Notation() {
    
    /**
     * publicId
     *
     * @dom 2
     *
     * @property publicId
     * @type String
     */
    this.publicId = "";
    
    /**
     * systemId
     *
     * @dom 2
     *
     * @property systemId
     * @type String
     */
    this.systemId = "";
}
Notation.prototype = new Node();
Notation.prototype.constructor = Notation;

/**
 * Entity
 *
 * @class Entity
 * @extends Node
 **/
function Entity() {
    
    /**
     * publicId
     *
     * @dom 2
     *
     * @property publicId
     * @type String
     */
    this.publicId = "";
    
    /**
     * systemId
     *
     * @dom 2
     *
     * @property systemId
     * @type String
     */
    this.systemId = "";
    
    /**
     * notationName
     *
     * @dom 2
     *
     * @property notationName
     * @type String
     */
    this.notationName = "";
    
    /**
     * inputEncoding
     *
     * @dom 2
     *
     * @property inputEncoding
     * @type String
     */
    this.inputEncoding = "";
    
    /**
     * xmlEncoding
     *
     * @dom 2
     *
     * @property xmlEncoding
     * @type String
     */
    this.xmlEncoding = "";
    
    /**
     * xmlVersion
     *
     * @dom 2
     *
     * @property xmlVersion
     * @type String
     */
    this.xmlVersion = "";
}
Entity.prototype = new Node();
Entity.prototype.constructor = Entity;

/**
 * EntityReference
 *
 * @class EntityReference
 * @extends Node
 **/
function EntityReference() {}
EntityReference.prototype = new Node();
EntityReference.prototype.constructor = EntityReference;

/**
 * ProcessingInstruction
 *
 * @class ProcessingInstruction
 * @extends Node
 **/
function ProcessingInstruction() {
    
    /**
     * target
     *
     * @dom 2
     *
     * @property target
     * @type String
     */
    this.target = "";
    
    /**
     * data
     *
     * @dom 2
     *
     * @property data
     * @type String
     */
    this.data = "";
}
ProcessingInstruction.prototype = new Node();
ProcessingInstruction.prototype.constructor = ProcessingInstruction;
