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
 * Selectors API Level 1
 * 
 * @module Selectors
 * @requires DOMCore
 *
 * @see http://www.w3.org/TR/selectors-api/
 */


    var
    NodeSelector;
    
/**
 * See <a href="http://www.w3.org/TR/css3-selectors/#w3cselgrammar">http://www.w3.org/TR/css3-selectors/#w3cselgrammar</a>
 *
 * @class NodeSelector
 * @extends Document
 */
function NodeSelector() {}

/**
 * The querySelector()  method on the NodeSelector interface must,
 * when invoked, return the first matching Element node within the
 * node's subtrees. If there is no such node, the method must
 * return null.
 * 
 * @method querySelector
 * @param {String} selectors
 * @return {Element|Null}
 */
NodeSelector.prototype.querySelector = function querySelector(selectors) {
    return new Element();
};

/**
 * The querySelectorAll()  method on the NodeSelector  interface must,
 * when invoked, return a NodeList  containing all of the matching
 * Element nodes within the node's subtrees, in document order.
 * If there are no such nodes, the method must return an empty NodeList.
 *
 * @method querySelectorAll
 * @param {String} selectors
 * @return {NodeList|Null}
 */
NodeSelector.prototype.querySelectorAll = function querySelectorAll(selectors) {
    return new NodeList();
};


// NOTE:
// this interface could be implemented using another method like this one:
// [Document, DocumentFragment, Element].forEach(function (construct) {
//     for (var prop in NodeSelector) {
//         construct.prototype[prop] = NodeSelector[prop];
//     }
// });
// But I thought it could be harder to understand for the code editor

// interface implemented for Document
Document.prototype.querySelector = NodeSelector.prototype.querySelector;
Document.prototype.querySelectorAll = NodeSelector.prototype.querySelectorAll;

// interface implemented for DocumentFragment
DocumentFragment.prototype.querySelector = NodeSelector.prototype.querySelector;
DocumentFragment.prototype.querySelectorAll = NodeSelector.prototype.querySelectorAll;

// interface implemented for Element
Element.prototype.querySelector = NodeSelector.prototype.querySelector;
Element.prototype.querySelectorAll = NodeSelector.prototype.querySelectorAll;


