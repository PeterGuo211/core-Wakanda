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
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 *
 * @module DOMTraversalRange
 * @require DOMCore
 * @see http://www.w3.org/TR/DOM-Level-2-Traversal-Range/
 */

/**
 * NodeIterator
 *
 * @class NodeIterator
 * @extends Object
 */
function NodeIterator () {
    this.root = new Node();
    this.whatToShow = 0;
    this.filter = new NodeFilter();
    this.expandEntityReferences = true;
}
NodeIterator.prototype.nextNode = function () {
    throw new DOMException();
    return new Node();
};
NodeIterator.prototype.previousNode = function () {
    throw new DOMException();
    return new Node();
};
NodeIterator.prototype.detach = function () {};


/**
 * NodeFilter
 *
 * @class NodeFilter
 * @extends Object
 *
 * @constructor NodeFilter
 * @param {Node} node
 */
function NodeFilter (node) {

}
NodeFilter.FILTER_ACCEPT = 1;
NodeFilter.FILTER_REJECT = 2;
NodeFilter.FILTER_SKIP = 3;
NodeFilter.SHOW_ALL = 0xFFFFFFFF;
NodeFilter.SHOW_ELEMENT = 0x00000001;
NodeFilter.SHOW_ATTRIBUTE = 0x00000002;
NodeFilter.SHOW_TEXT = 0x00000004;
NodeFilter.SHOW_CDATA_SECTION = 0x00000008;
NodeFilter.SHOW_ENTITY_REFERENCE = 0x00000010;
NodeFilter.SHOW_ENTITY = 0x00000020;
NodeFilter.SHOW_PROCESSING_INSTRUCTION = 0x00000040;
NodeFilter.SHOW_COMMENT = 0x00000080;
NodeFilter.SHOW_DOCUMENT = 0x00000100;
NodeFilter.SHOW_DOCUMENT_TYPE = 0x00000200;
NodeFilter.SHOW_DOCUMENT_FRAGMENT = 0x00000400;
NodeFilter.SHOW_NOTATION = 0x00000800;


/**
 * TreeWalker
 *
 * @class TreeWalker
 * @extends Object
 */
function TreeWalker () {
    this.root = new Node();
    this.whatToShow = 0;
    this.filter = NodeFilter;
    this.expandEntityReferences = true;
    this.currentNode = new Node();
}
TreeWalker.prototype.parentNode = function () {
    return new Node();
};
TreeWalker.prototype.firstChild = function () {
    return new Node();
};
TreeWalker.prototype.lastChild = function () {
    return new Node();
};
TreeWalker.prototype.previousSibling = function () {
    return new Node();
};
TreeWalker.prototype.nextSibling = function () {
    return new Node();
};
TreeWalker.prototype.previousNode = function () {
    return new Node();
};
TreeWalker.prototype.nextNode = function () {
    return new Node();
};



/**
 * DocumentTraversal
 *
 * @class DocumentTraversal
 * @extends Object
 */
function DocumentTraversal () {}

/**
 * createNodeIterator
 *
 * @method createNodeIterator
 * @throw {DOMException}
 * @param {Node} root
 * @param {Number} whatToShow
 * @param {NodeFilter} filter
 * @param {Boolean} entityReferenceExpansion
 * @result {NodeIterator}
 */
DocumentTraversal.prototype.createNodeIterator = function (root, whatToShow, filter, entityReferenceExpansion) {
    throw new DOMException();
    return new NodeIterator();
};




/**
 * Range
 *
 * @class Range
 * @extends Object
 */
function Range () {
    this.startContainer = new Node();
    this.startOffset = 0;
    this.endContainer = new Node();
    this.endOffset = 0;
    this.collapsed = true;
    this.commonAncestorContainer = new Node();
}

Range.START_TO_START = 0;
Range.START_TO_END = 1;
Range.END_TO_END = 2;
Range.END_TO_START = 3;

/**
 * setStart
 *
 * @method setStart
 * @throw {DOMException}
 * @param {Node} startNode
 * @param {Number} startOffset
 */
Range.prototype.setStart = function (startNode, startOffset) {
    throw new DOMException();
};

/**
 * setEnd
 *
 * @method setEnd
 * @throw {DOMException}
 * @param {Node} endNode
 * @param {Number} endOffset
 */
Range.prototype.setEnd = function (endNode, endOffset) {
    throw new DOMException();
};

/**
 * setStartBefore
 *
 * @method setStartBefore
 * @throw {DOMException}
 * @param {Node} referenceNode
 */
Range.prototype.setStartBefore = function (referenceNode) {
    throw new DOMException();
};

/**
 * setStartAfter
 *
 * @method setStartAfter
 * @throw {DOMException}
 * @param {Node} referenceNode
 */
Range.prototype.setStartAfter = function (referenceNode) {
    throw new DOMException();
};

/**
 * setEndBefore
 *
 * @method setEndBefore
 * @throw {DOMException}
 * @param {Node} referenceNode
 */
Range.prototype.setEndBefore = function (referenceNode) {
    throw new DOMException();
};

/**
 * setEndAfter
 *
 * @method setEndAfter
 * @throw {DOMException}
 * @param {Node} referenceNode
 */
Range.prototype.setEndAfter = function (referenceNode) {
    throw new DOMException();
};

/**
 * collapse
 *
 * @method collapse
 * @throw {DOMException}
 * @param {Boolean} toStart
 */
Range.prototype.collapse = function (toStart) {
    throw new DOMException();
};

/**
 * selectNode
 *
 * @method selectNode
 * @throw {DOMException}
 * @param {Node} referenceNode
 */
Range.prototype.selectNode = function (referenceNode) {
    throw new DOMException();
};

/**
 * selectNodeContents
 *
 * @method selectNodeContents
 * @throw {DOMException}
 * @param {Node} referenceNode
 */
Range.prototype.selectNodeContents = function (referenceNode) {
    throw new DOMException();
};

/**
 * compareBoundaryPoints
 *
 * @method compareBoundaryPoints
 * @throw {DOMException}
 * @param {Number} how
 * @param {Range} sourceRange
 */
Range.prototype.compareBoundaryPoints = function (how, sourceRange) {
    throw new DOMException();
    return 0;
};
Range.prototype.deleteContents = function () {
    throw new DOMException();
};
Range.prototype.extractContents = function () {
    throw new DOMException();
    return new DocumentFragment();
};
Range.prototype.cloneContents = function () {
    throw new DOMException();
    return new DocumentFragment();
};

/**
 * insertNode
 *
 * @method insertNode
 * @throw {DOMException}
 * @param {Node} newNode
 */
Range.prototype.insertNode = function (newNode) {
    throw new DOMException();
};

/**
 * surroundContents
 *
 * @method surroundContents
 * @throw {DOMException}
 * @param {Node} newNode
 */
Range.prototype.surroundContents = function (newNode) {
    throw new DOMException();
};

/**
 * cloneRange
 *
 * @method cloneRange
 * @throw {DOMException}
 * @return {Range} 
 */
Range.prototype.cloneRange = function () {
    throw new DOMException();
    return new Range();
};

/**
 * toString
 *
 * @method toString
 * @throw {DOMException}
 * @return {String} 
 */
Range.prototype.toString = function () {
    throw new DOMException();
    return "";
};

/**
 * detach
 *
 * @method detach
 * @throw {DOMException}
 */
Range.prototype.detach = function () {
    throw new DOMException();
};



/**
 * DocumentRange
 *
 * @class DocumentRange
 * @extends Object
 */
function DocumentRange () {}

/**
 * createRange
 *
 * @method createRange
 * @return {Range}
 */
DocumentRange.prototype.createRange = function () {
    return new Range();
};



/**
 * RangeException
 *
 * @class RangeException
 * @extends Object
 */
function RangeException () {
    this.code = 0;
}
RangeException.BAD_BOUNDARYPOINTS_ERR = 1;
RangeException.INVALID_NODE_TYPE_ERR = 2;

