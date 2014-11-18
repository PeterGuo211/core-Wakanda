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
 * <p>The Document Object Model Level 2 Views is a platform- and language-neutral interface
 * that allows programs and scripts to dynamically access and update the content of a
 * representation of a document. The Document Object Model Level 2 Views builds on the
 * Document Object Model Level 2 Core [DOM Level 2 Core].</p>
 *
 * @module DOMViews
 * @requires DOMCore
 *
 * @see http://www.w3.org/TR/DOM-Level-2-Views/
 */

/**
 * <p>A base interface that all views shall derive from.</p>
 *
 * @class AbstractView
 * @extends Object
 */
function AbstractView () {

    /**
     * The source DocumentView of which this is an AbstractView.
     *
     * @property document
     * @type DocumentView|null
     */
    this.document = new DocumentView();
}



/**
 * <p>The DocumentView interface is implemented by Document objects in DOM implementations
 * supporting DOM Views. It provides an attribute to retrieve the default view of a document.</p>
 *
 * @class DocumentView
 * @extends Object
 */
function DocumentView () {

    /**
     * The default AbstractView for this Document, or null if none available.
     *
     * @property defaultView
     * @type AbstractView|null
     */
    this.defaultView = new AbstactView();
}
