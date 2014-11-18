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
 * The ElementTraversal interface, allows script navigation of the elements of a DOM tree, excluding all other
 * nodes in the DOM, such as text nodes. It also provides an attribute to expose the number of child elements
 * of an element. It is intended to provide a more convenient alternative to existing DOM navigation interfaces,
 * with a low implementation footprint.</p>
 *
 * @module ElementTraversal
 * @requires DOMCore, JavaScriptCore
 *
 * @see http://www.w3.org/TR/ElementTraversal/
 */


/**
 * The ElementTraversal interface, allows script navigation of the elements of a DOM tree, excluding all other
 * nodes in the DOM, such as text nodes. It also provides an attribute to expose the number of child elements
 * of an element. It is intended to provide a more convenient alternative to existing DOM navigation interfaces,
 * with a low implementation footprint.</p>
 *
 * @class ElementTraversal
 * @extends Element
 */
function ElementTraversal () {

    /**
     * <p>Accessing this attribute of an element must return a reference to the first child node of that element
     * which is of nodeType 1, as an Element object. If the element on which this attribute is accessed does
     * not have any child nodes, or if none of those child nodes are element nodes, then this attribute must
     * return null.</p>
     *
     * @property firstElementChild
     * @type Element
     **/
    this.firstElementChild = new Element();

    /**
     * <p>Accessing this attribute of an element must return a reference to the last child node of that element
     * which is of nodeType 1, as an Element object. If the element on which this attribute is accessed does
     * not have any child nodes, or if none of those child nodes are element nodes, then this attribute must
     * return null.</p>
     *
     * @property lastElementChild
     * @type Element
     **/
    this.lastElementChild = new Element();

    /**
     * <p>Accessing this attribute of an element must return a reference to the sibling node of that element
     * which most immediately precedes that element in document order, and which is of nodeType 1, as an
     * Element object. If the element on which this attribute is accessed does not have any preceding sibling
     * nodes, or if none of those preceding sibling nodes are element nodes, then this attribute must return
     * null.</p>
     *
     * @property previousElementSibling
     * @type Element
     **/
    this.previousElementSibling = new Element();

    /**
     * <p>Accessing this attribute of an element must return a reference to the sibling node of that element
     * which most immediately follows that element in document order, and which is of nodeType 1, as an
     * Element object. If the element on which this attribute is accessed does not have any following sibling
     * nodes, or if none of those following sibling nodes are element nodes, then this attribute must return
     * null.</p>
     *
     * @property nextElementSibling
     * @type Element
     **/
    this.nextElementSibling = new Element();

    /**
     * <p>Accessing this attribute of an element must return the current number of child nodes of that element
     * which are of nodeType 1. An implementation may store this number, or it may calculate it upon accessing
     * this attribute, but the number must always represent the number of child element nodes at the time the
     * attribute is accessed. Only immediate child nodes must be counted, e.g. elements which are child nodes
     * of one of the child nodes of the element on which the attribute is accessed are not included in this
     * count. If the element on which this attribute is accessed does not have any child nodes, or if none of
     * those child nodes are element nodes, then this attribute must return 0.</p>
     *
     * @property childElementCount
     * @type Element
     **/
    this.childElementCount =  new Element();
    
}

/**
 * The ElementTraversal prototype
 *
 * @static
 * @property prototype
 * @type Element
 **/
ElementTraversal.prototype = new Element();

/**
 * The ElementTraversal constructor
 *
 * @property constructor
 * @type Function
 * @default ElementTraversal
 **/
ElementTraversal.prototype.constructor = ElementTraversal;