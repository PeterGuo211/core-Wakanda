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
 * <p>This module extends the DOM Level 2 Core API [DOM Level 2 Core] to
 * describe objects and methods specific to HTML  documents [HTML 4.01], and
 * XHTML documents [XHTML 1.0]. In general, the functionality needed to
 * manipulate hierarchical document structures, elements, and attributes will be
 * found in the core section; functionality that depends on the specific
 * elements defined in HTML will be found in this section.</p>
 *
 * <p>The goals of the HTML-specific DOM API are:</p>
 *
 * <ul>
 *   <li>to specialize and add functionality that relates specifically to HTML
 *   documents and elements.</li>
 *   <li>to address issues of backwards compatibility with the DOM Level 0.</li>
 *   <li>to provide convenience mechanisms, where appropriate, for common and
 *   frequent operations on HTML documents.</li>
 * </ul>
 *
 * <p>The key differences between the core DOM and the HTML application of DOM
 * is that the HTML Document Object Model exposes a number of convenience
 * methods and properties that are consistent with the existing models and are
 * more appropriate to script writers. In many cases, these enhancements are not
 * applicable to a general DOM because they rely on the presence of a predefined
 * DTD. The transitional or frameset DTD for HTML 4.01, or the XHTML 1.0 DTDs
 * are assumed. Interoperability between implementations is only guaranteed for
 * elements and attributes that are specified in the HTML 4.01 and
 * XHTML 1.0 DTDs.</p>
 * 
 * @module DOMHTML
 *
 * @see http://www.w3.org/TR/DOM-Level-2-HTML/
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-html.html
 */





/**
 * <p>An <code>HTMLCollection</code> is a list of nodes. An individual node may
 * be accessed by either ordinal index or the node's name or id attributes.</p>
 *
 * <p>Collections in the HTML DOM are assumed to be <strong>live</strong>
 * meaning that they are automatically updated when the underlying document is
 * changed.</p>
 *
 * @class HTMLCollection
 * @extends Object
 */
function HTMLCollection() {

    /**
     * This attribute specifies the length or size of the list.
     *
     * @property length
     * @throw {DOMException} NOT_SUPPORTED_ERR: if setting the length is not allowed by the implementation.
     * @attributes ReadOnly
     * @type Number
     */
    this.length = 0;
}

/**
 * <p>This method retrieves a node specified by ordinal index. Nodes are numbered
 * in tree order (depth-first traversal order).</p>
 *
 * <p><em>This object can also be dereferenced using square bracket notation
 * (e.g. obj[1]). Dereferencing with an integer <code>index</code> is equivalent
 * to invoking the <code>item</code> function with that index.</em></p>
 * 
 * @method item
 * @param {Number} index Required. The index of the node to be fetched. The 
 * index origin is 0.
 * @return {Node|Null} The Node at the corresponding position upon success. A 
 * value of null is returned if the index is out of range.
 */
HTMLCollection.prototype.item = function (index) {
    return new Node();
};

/**
 * <p>This method retrieves a <code>Node</code> using a name. With [HTML 4.01]
 * documents, it first searches for a <code>Node</code> with a matching
 * <code>id</code> attribute. If it doesn't find one, it then searches for a
 * <code>Node</code> with a matching name attribute, but only on those elements
 * that are allowed a <code>nqme</code> attribute. With [XHTML 1.0] documents,
 * this method only searches for <code>Nodes</code> with a matching
 * <code>id</code> attribute. This method is case insensitive in HTML documents
 * and case sensitive in XHTML documents.</p>
 *
 * <p><em>This object can also be dereferenced using square bracket notation
 * (e.g. obj[1]). Dereferencing using a string <code>name</code> is equivalent 
 * to invoking the <code>namedItem</code> function with that name.</em></p>
 *
 * @method namedItem
 * @param {DOMString} name Required. The name of the <code>Node</code> to be
 * fetched.
 * @return {Node|Null} The <code>Node</code> with a <code>name</code> or
 * <code>id</code> attribute whose value corresponds to the specified string.
 * Upon failure (e.g., no node with this name exists), returns null.
 */
HTMLCollection.prototype.namedItem = function (name) {
    return new Node();
};










/**
 * <p>An <code>HTMLOptionsCollection</code> is a list of nodes representing HTML
 * option element. An individual node may be accessed by either ordinal index or
 * the node's name or id attributes.</p>
 *
 * <p>Collections in the HTML DOM are assumed to be <strong>live</strong>
 * meaning that they are automatically updated when the underlying document is
 * changed.</p>
 *
 * @class HTMLOptionsCollection
 * @extends Object
 */
function HTMLOptionsCollection() {

    /**
     * This attribute specifies the length or size of the list.
     *
     * @property length
     * @throw {DOMException} NOT_SUPPORTED_ERR: if setting the length is not allowed by the implementation.
     * @attributes ReadOnly
     * @type Number
     */
    this.length = 0;
}


/**
 * <p>This method retrieves a node specified by ordinal index. Nodes are
 * numbered in tree order (depth-first traversal order).</p>
 *
 * <p><em>This object can also be dereferenced using square bracket notation
 * (e.g. obj[1]). Dereferencing with an integer <code>index</code> is equivalent
 * to invoking the <code>item</code> function with that index.</em></p>
 *
 * @method item
 * @param {Number} index Required. The index of the node to be fetched. The
 * index origin is 0.
 * @return {Node|Null} The Node at the corresponding position upon success. A
 * value of null is returned if the index is out of range.
 */
HTMLOptionsCollection.prototype.item = function (index) {
    return Node();
};

/**
 * <p>This method retrieves a <code>Node</code> using a name. With [HTML 4.01]
 * documents, it first searches for a <code>Node</code> with a matching
 * <code>id</code> attribute. If it doesn't find one, it then searches for a
 * <code>Node</code> with a matching name attribute, but only on those elements
 * that are allowed a <code>nqme</code> attribute. With [XHTML 1.0] documents,
 * this method only searches for <code>Nodes</code> with a matching
 * <code>id</code> attribute. This method is case insensitive in HTML documents
 * and case sensitive in XHTML documents.</p>
 *
 * <p><em>This object can also be dereferenced using square bracket notation
 * (e.g. obj[name]). Dereferencing using a string <code>name</code> is equivalent
 * to invoking the <code>namedItem</code> function with that name.</em></p>
 *
 * @method namedItem
 * @param {DOMString} name Required. The name of the <code>Node</code> to be
 * fetched.
 * @return {Node|Null} The <code>Node</code> with a <code>name</code> or
 * <code>id</code> attribute whose value corresponds to the specified string.
 * Upon failure (e.g., no node with this name exists), returns null.
 */
HTMLOptionsCollection.prototype.namedItem = function (name) {};








/**
 * <p>An <code>HTMLDocument</code> is the root of the HTML hierarchy and holds
 * the entire content. Besides providing access to the hierarchy, it also
 * provides some convenience methods for accessing certain sets of information
 * from the document.</p>
 *
 * <p>In DOM Level 2, the method getElementById is inherited from the Document
 * interface where it was moved to.</p>
 *
 * @class HTMLDocument
 * @extends Document
 */
function HTMLDocument() {

    /**
     * The absolute URI [IETF RFC 2396] of the document.
     *
     * @property URL
     * @attributes ReadOnly
     * @type String
     */
    this.URL = "";

    /**
     * <p>A collection of all the anchor (A) elements in a document with a value
     * for the name attribute.</p>
     *
     * <p><em>For reasons of backward compatibility, the returned set of anchors
     * only contains those anchors created with the name attribute, not those
     * created with the id attribute. Note that in [XHTML 1.0], the name
     * attribute (see section 4.10) has no semantics and is only present for
     * legacy user agents: the id attribute is used instead. Users should prefer
     * the iterator mechanisms provided by [DOM Level 2 Traversal] instead.</em>
     * </p>
     *
     * @property anchors
     * @attributes ReadOnly
     * @type HTMLCollection
     */
    this.anchors = new HTMLCollection();

    /**
     * <p>A collection of all the <code>OBJECT</code> elements that include 
     * applets and <code>APPLET</code> (deprecated) elements in a document.</p>
     *
     * @property applets
     * @attributes ReadOnly
     * @type HTMLCollection
     */
    this.applets = new HTMLCollection();

    /**
     * <p>The element that contains the content for the document. In documents
     * with <body>BODY</body> contents, returns the <body>BODY</body> element.
     * In frameset documents, this returns the outermost <code>FRAMESET</code>
     * element.</p>
     *
     * @property body
     * @type HTMLElement
     */
    this.body = new HTMLElement();

    /**
     * <p>This mutable string attribute denotes persistent state information 
     * that (1) is associated with the current frame or document and (2) is 
     * composed of information described by the <code>cookies</code> 
     * non-terminal of [IETF RFC 2965].<br>
     * If no persistent state information is available for the current frame or 
     * document document, then this property's value is an empty string.<br>
     * When this attribute is read, all cookies are returned as a single string,
     * with each cookie's name-value pair concatenated into a list of name-value
     * pairs, each list item being separated by a ';' (semicolon).<br>
     * When this attribute is set, the value it is set to should be a string 
     * that adheres to the cookie non-terminal of [IETF RFC 2965]; that is, it 
     * should be a single name-value pair followed by zero or more cookie 
     * attribute values. If no domain attribute is specified, then the domain 
     * attribute for the new value defaults to the host portion of an absolute 
     * URI [IETF RFC 2396] of the current frame or document. If no path 
     * attribute is specified, then the path attribute for the new value 
     * defaults to the absolute path portion of the URI [IETF RFC 2396] of the 
     * current frame or document. If no max-age attribute is specified, then the 
     * max-age attribute for the new value defaults to a user agent defined 
     * value. If a cookie with the specified name is already associated with the 
     * current frame or document, then the new value as well as the new 
     * attributes replace the old value and attributes. If a max-age attribute 
     * of 0 is specified for the new value, then any existing cookies of the 
     * specified name are removed from the cookie storage.</p>
     *
     * <p><em>See [IETF RFC 2965] for the semantics of persistent state item
     * attribute value pairs.</em></p>
     *
     * <p><em>See [IETF RFC 2965] for the semantics of persistent state item
     * attribute value pairs.</em></p>
     *
     * @property cookie
     * @throws {DOMException} SYNTAX_ERR If the new value does not adhere to the
     * cookie syntax specified by [IETF RFC 2965].
     * @type String
     */
    this.cookie = "";

    /**
     * <p>The domain name of the server that served the document, or
     * <code>null</null> if the server cannot be identified by a domain name.
     * </p>
     *
     * @property domain
     * @attributes ReadOnly
     * @type String|Null
     */
    this.domain = "";

    /**
     * <p>A collection of all the forms of a document.</p>
     *
     * @property forms
     * @attributes ReadOnly
     * @type HTMLCollection
     */
    this.forms = new HTMLCollection;

    /**
     * <p>A collection of all the <code>IMG</code> elements in a document. The 
     * behavior is limited to <code>IMG</code> elements for backwards 
     * compatibility.</p>
     * 
     * @property images
     * @attributes ReadOnly
     * @type HTMLCollection
     *
     * @deprecated As suggested by [HTML 4.01], to include images, authors may
     * use the <code>OBJECT</code> element or the <code>IMG</code> element.
     * Therefore, it is recommended not to use this attribute to find the images
     * in the document but <code>getElementsByTagName</code> with HTML 4.01 or
     * <code>getElementsByTagNameNS</code> with XHTML 1.0.
     */
    this.images = new HTMLCollection();

    /**
     * <p>A collection of all <code>AREA</code> elements and anchor (A) elements
     * in a document with a value for the <code>href</code> attribute.</p>
     *
     * @property links
     * @attributes ReadOnly
     * @type HTMLCollection
     */
    this.links = new HTMLCollection();

    /**
     * <p>Returns the URI [IETF RFC 2396] of the page that linked to this page.
     * The value is an empty string if the user navigated to the page directly
     * (not through a link, but, for example, via a bookmark).</p>
     *
     * @property referrer
     * @attributes ReadOnly
     * @type String
     */
    this.referrer = "";

    /**
     * <p>The title of a document as specified by the <code>TITLE</code> element
     * in the head of the document.</p>
     *
     * @property title
     * @type String
     */
    this.title = "";

    /**
     * alinkColor
     *
     * @property alinkColor
     * @type String
     *
     * @deprecated Use the corresponding one of the <code>BODY<code> element
     * instead
     */
    this.alinkColor = "";

    /**
     * background
     *
     * @property background
     * @type String
     *
     * @deprecated Use the corresponding one of the <code>BODY<code> element
     * instead
     */
    this.background = "";

    /**
     * bgColor
     *
     * @property bgColor
     * @type String
     *
     * @deprecated Use the corresponding one of the <code>BODY<code> element
     * instead
     */
    this.bgColor = "";

    /**
     * fgColor
     *
     * @property fgColor
     * @type String
     *
     * @deprecated Use the corresponding one of the <code>BODY<code> element
     * instead
     */
    this.fgColor = "";

    /**
     * linkColor
     *
     * @property linkColor
     * @type String
     *
     * @deprecated Use the corresponding one of the <code>BODY<code> element
     * instead
     */
    this.linkColor = "";

    /**
     * vlinkColor
     *
     * @property vlinkColor
     * @type String
     *
     * @deprecated Use the corresponding one of the <code>BODY<code> element
     * instead
     */
    this.vlinkColor = "";
}
HTMLDocument.prototype = new Document();
HTMLDocument.prototype.constructor = HTMLDocument;

/**
 * <p>Closes a document stream opened by <code>open()</code> and forces
 * rendering.</p>
 *
 * @method close
 */
HTMLDocument.prototype.close = function() {};

/**
 * <p>With [HTML 4.01] documents, this method returns the (possibly empty)
 * collection of elements whose <code>name</code> value is given by
 * <var>elementName</var>. In [XHTML 1.0] documents, this methods only return
 * the (possibly empty) collection of form controls with matching name. This
 * method is case sensitive. </p>
 *
 * @method getElementsByName
 * @param {DOMString} elementName Required. The <code>name</code> attribute
 * value for an element.
 * @return {NodeList} The matching elements.
 */
HTMLDocument.prototype.getElementsByName = function( elementName ) {};

/**
 * <p>Open a document stream for writing. If a document exists in the target,
 * this method clears it. </p>
 *
 * <p><em>This method and the ones following allow a user to add to or replace
 * the structure model of a document using strings of unparsed HTML. At the
 * time of writing alternate methods for providing similar functionality for
 * both HTML and XML documents were being considered (see
 * [DOM Level 3 Load and Save]).</em></p>
 *
 * @method open
 */
HTMLDocument.prototype.open = function() {};

/**
 * <p>Write a string of text to a document stream opened by <code>open()</code>.
 * Note that the function will produce a document which is not necessarily
 * driven by a DTD and therefore might be produce an invalid result in the
 * context of the document.</p>
 *
 * @method write
 * @param {DOMString} text Required. The string to be parsed into some structure
 * in the document structure model.
 * value for an element.
 */
HTMLDocument.prototype.write = function( text ) {};

/**
 * <p>Write a string of text followed by a newline character to a document 
 * stream opened by  <code>open()</code>. Note that the function will produce a
 * document which is not necessarily driven by a DTD and therefore might be
 * produce an invalid result in the context of the document.</p>
 *
 * @method writeln
 * @param {DOMString} text Required. The string to be parsed into some structure
 * in the document structure model.
 * value for an element.
 */
HTMLDocument.prototype.writeln = function( text ) {};

/**
 * <p>In DOM Level 2, the method <code>getElementById</code> is inherited from
 * the <code>Document</code> interface where it was moved to.</p>
 *
 * @method getElementById
 * @param {DOMString} elementId
 * @return {Node} The matching elements.
 *
 * @deprecated This prototype HTMLDocument method is not defined in DOM level 2
 * but inherited from Document
 */
HTMLDocument.prototype.getElementById = function( elementId ) {};





/**
 * <p>All HTML element interfaces derive from this class. Elements that only
 * expose the HTML core attributes are represented by the base
 * <code>HTMLElement</code> interface.</p>
 *
 * <p>The <code>style</code> attribute of an HTML element is accessible through
 * the <code>ElementCSSInlineStyle</code> interface which is defined in the CSS
 * module [DOM Level 2 Style Sheets and CSS].</p>
 *
 * @class HTMLElement
 * @extends DOMElement
 */
function HTMLElement() {

    /**
     * The class attribute of the element. This attribute has been renamed due
     * to conflicts with the "class" keyword exposed by many languages.
     * See the class attribute definition in HTML 4.01.
     *
     * @property className
     * @type String
     */
    this.className = "";

    /**
     * Specifies the base direction of directionally neutral text and the
     * directionality of tables.
     * See the dir attribute definition in HTML 4.01.
     *
     * @property dir
     * @type String
     */
    this.dir = "";

    /**
     * The element's identifier.
     * See the id attribute definition in HTML 4.01.
     *
     * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be 
     * followed by any number of letters, digits ([0-9]), hyphens ("-"), 
     * underscores ("_"), colons (":"), and periods (".").
     *
     * @property id
     * @type String
     */
    this.id = "";

    /**
     * Language code defined in RFC 1766.
     * See the lang attribute definition in HTML 4.01.
     *
     * @property lang
     * @type String
     */
    this.lang = "";

    /**
     * The element's advisory title.
     * See the title attribute definition in HTML 4.01.
     *
     * @property title
     * @type String
     */
    this.title = "";
}
HTMLElement.prototype = new DOMElement();
HTMLElement.prototype.constructor = HTMLElement;




/**
 * Root of an HTML document.
 * See the HTML element definition in HTML 4.01.
 *
 * @class HTMLHtmlElement
 * @extends HTMLElement
 */
function HTMLHtmlElement() {

    /**
     * Version information about the document's DTD.
     * See the version attribute definition in HTML 4.01.
     *
     * @property version
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.version = "";
}
HTMLHtmlElement.prototype = new HTMLElement();
HTMLHtmlElement.prototype.constructor = HTMLHtmlElement;





/**
 * Document head information.
 * See the HEAD element definition in HTML 4.01.
 *
 * @class HTMLHeadElement
 * @extends HTMLElement
 */
function HTMLHeadElement() {

    /**
     * URI [IETF RFC 2396] designating a metadata profile.
     * See the profile attribute definition in HTML 4.01.
     *
     * @property profile
     * @type String
     */
    this.profile = "";
}
HTMLHeadElement.prototype = new HTMLElement();
HTMLHeadElement.prototype.constructor = HTMLHeadElement;




/**
 * The <code>LINK</code> element specifies a link to an external resource, and
 * defines this document's relationship to that resource (or vice versa).
 * See the <code>LINK</code> element definition in HTML 4.01
 * (see also the <code>LinkStyle</code> interface in the StyleSheet module
 * [DOM Level 2 Style Sheets and CSS]).
 *
 * @class HTMLLinkElement
 * @extends HTMLElement
 */
function HTMLLinkElement() {

    /**
     * The character encoding of the resource being linked to.
     * See the charset attribute definition in HTML 4.01.
     *
     * @property charset
     * @type String
     */
    this.charset = "";

    /**
     * Enables/disables the link. This is currently only used for style sheet
     * links, and may be used to activate or deactivate style sheets.
     *
     * @property disabled
     * @type Boolean
     */
    this.disabled = false;

    /**
     * The URI [IETF RFC 2396] of the linked resource.
     * See the href attribute definition in HTML 4.01.
     *
     * @property href
     * @type String
     */
    this.href = "";

    /**
     * Language code of the linked resource.
     * See the hreflang attribute definition in HTML 4.01.
     *
     * @property hreflang
     * @type String
     */
    this.hreflang = "";

    /**
     * Designed for use with one or more target media.
     * See the media attribute definition in HTML 4.01.
     *
     * @property media
     * @type String
     */
    this.media = "";

    /**
     * Forward link type.
     * See the rel attribute definition in HTML 4.01.
     *
     * @property rel
     * @type String
     */
    this.rel = "";

    /**
     * Reverse link type.
     * See the rev attribute definition in HTML 4.01.
     *
     * @property rev
     * @type String
     */
    this.rev = "";

    /**
     * Frame to render the resource in.
     * See the target attribute definition in HTML 4.01.
     *
     * @property target
     * @type String
     */
    this.target = "";

    /**
     * Advisory content type.
     * See the type attribute definition in HTML 4.01.
     *
     * @property type
     * @type String
     */
    this.type = "";
}
HTMLLinkElement.prototype = new HTMLElement();
HTMLLinkElement.prototype.constructor = HTMLLinkElement;





/**
 * The document title.
 * See the TITLE element definition in HTML 4.01.
 *
 * @class HTMLTitleElement
 * @extends HTMLElement
 */
function HTMLTitleElement() {

    /**
     * The specified title as a string.
     *
     * @property type
     * @type String
     */
    this.text = "";
}
HTMLTitleElement.prototype = new HTMLElement();
HTMLTitleElement.prototype.constructor = HTMLTitleElement;




/**
 * This contains generic meta-information about the document.
 * See the META element definition in HTML 4.01.
 *
 * @class HTMLMetaElement
 * @extends HTMLElement
 */
function HTMLMetaElement() {

    /**
     * Associated information.
     * See the content attribute definition in HTML 4.01.
     *
     * @property content
     * @type String
     */
    this.content = "";

    /**
     * HTTP response header name [IETF RFC 2616].
     * See the http-equiv attribute definition in HTML 4.01.
     *
     * @property httpEquiv
     * @type String
     */
    this.httpEquiv = "";

    /**
     * Meta information name.
     * See the name attribute definition in HTML 4.01.
     *
     * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be 
     * followed by any number of letters, digits ([0-9]), hyphens ("-"), 
     * underscores ("_"), colons (":"), and periods (".").
     *
     * @property name
     * @type String
     */
    this.name = "";

    /**
     * Select form of content.
     * See the scheme attribute definition in HTML 4.01.
     *
     * @property scheme
     * @type String
     */
    this.scheme = "";
}
HTMLMetaElement.prototype = new HTMLElement();
HTMLMetaElement.prototype.constructor = HTMLMetaElement;






/**
 * Document base URI [IETF RFC 2396].
 * See the BASE element definition in HTML 4.01.
 *
 * @class HTMLBaseElement
 * @extends HTMLElement
 */
function HTMLBaseElement() {

    /**
     * <p>The base URI [IETF RFC 2396].
     * See the href attribute definition in HTML 4.01.</p>
     *
     * @property href
     * @type String
     */
    this.href = "";

    /**
     * <p>The default target frame.
     * See the target attribute definition in HTML 4.01.</p>
     *
     * @property target
     * @type String
     */
    this.target = "";
}
HTMLBaseElement.prototype = new HTMLElement();
HTMLBaseElement.prototype.constructor = HTMLBaseElement;




/**
 * This element is used for single-line text input.
 * See the ISINDEX element definition in HTML 4.01.
 *
 * @class HTMLIsIndexElement
 * @extends HTMLElement
 *
 * @deprecated This element is deprecated in HTML 4.01.
 */
function HTMLIsIndexElement() {

    /**
     * <p>Returns the FORM element containing this control.
     * Returns <code>null</code> if this control is not within the context of a
     * form.</p>
     *
     * @property form
     * @attributes ReadOnly
     * @type HTMLFormElement|Null
     */
    this.form = new HTMLFormElement();

    /**
     * <p>The prompt message.
     * See the prompt attribute definition in HTML 4.01.</p>
     *
     * @property prompt
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.prompt = "";
}
HTMLIsIndexElement.prototype = new HTMLElement();
HTMLIsIndexElement.prototype.constructor = HTMLIsIndexElement;




/**
 * Style information.
 * See the STYLE element definition in HTML 4.01,
 * the CSS module [DOM Level 2 Style Sheets and CSS] and
 * the LinkStyle interface in the StyleSheets module [DOM Level 2 Style Sheets and CSS].
 *
 * @class HTMLStyleElement
 * @extends HTMLElement
 */
function HTMLStyleElement() {

    /**
     * <p>Enables/disables the style sheet.</p>
     *
     * @property disabled
     * @type Boolean
     */
    this.disabled = false;

    /**
     * <p>Designed for use with one or more target media.
     * See the media attribute definition in HTML 4.01.</p>
     *
     * @property media
     * @type String
     */
    this.media = "";

    /**
     * <p>The content type of the style sheet language.
     * See the type attribute definition in HTML 4.01.</p>
     *
     * @property type
     * @type String
     */
    this.type = "";
}
HTMLStyleElement.prototype = new HTMLElement();
HTMLStyleElement.prototype.constructor = HTMLStyleElement;




/**
 * The HTML document body. This element is always present in the DOM API, even
 * if the tags are not present in the source document.
 * See the BODY element definition in HTML 4.01.
 *
 * @class HTMLBodyElement
 * @extends HTMLElement
 */
function HTMLBodyElement() {

    /**
     * <p>Color of active links (after mouse-button down, but before
     * mouse-button up). See the alink attribute definition in HTML 4.01.</p>
     *
     * @property aLink
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.aLink = "";

    /**
     * <p>URI [IETF RFC 2396] of the background texture tile image.
     * See the background attribute definition in HTML 4.01.</p>
     *
     * @property background
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.background = "";

    /**
     * <p>Document background color.
     * See the bgcolor attribute definition in HTML 4.01.</p>
     *
     * @property bgColor
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.bgColor = "";

    /**
     * <p>Color of links that are not active and unvisited.
     * See the link attribute definition in HTML 4.01. </p>
     *
     * @property link
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.link = "";

    /**
     * <p>Document text color.
     * See the text attribute definition in HTML 4.01.</p>
     *
     * @property text
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.text = "";

    /**
     * <p>Color of links that have been visited by the user.
     * See the vlink attribute definition in HTML 4.01.</p>
     *
     * @property vLink
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.vLink = "";
}
HTMLBodyElement.prototype = new HTMLElement();
HTMLBodyElement.prototype.constructor = HTMLBodyElement;




/**
 * The FORM element encompasses behavior similar to a collection and an element.
 * It provides direct access to the contained form controls as well as the
 * attributes of the form element.
 * See the FORM element definition in HTML 4.01.
 *
 * @class HTMLFormElement
 * @extends HTMLElement
 */
function HTMLFormElement() {

    /**
     * <p>List of character sets supported by the server.
     * See the accept-charset attribute definition in HTML 4.01.</p>
     *
     * @property acceptCharset
     * @type String
     */
    this.acceptCharset = "";

    /**
     * <p>Server-side form handler.
     * See the action attribute definition in HTML 4.01.</p>
     *
     * @property action
     * @type String
     */
    this.action = "";

    /**
     * <p>Returns a collection of all form control elements in the form.</p>
     *
     * @property elements
     * @attributes ReadOnly
     * @type HTMLCollection
     */
    this.elements = new HTMLCollection();

    /**
     * <p>The content type of the submitted form, generally
     * "application/x-www-form-urlencoded".
     * See the enctype attribute definition in HTML 4.01. </p>
     *
     * @property enctype
     * @type String
     */
    this.enctype = "";

    /**
     * <p>The number of form controls in the form.</p>
     *
     * @property length
     * @attributes ReadOnly
     * @type Number
     */
    this.length = 0;

    /**
     * <p>HTTP method [IETF RFC 2616] used to submit form.
     * See the method attribute definition in HTML 4.01.</p>
     *
     * @property method
     * @type String
     */
    this.method = "";

    /**
     * <p>Names the form.</p>
     *
     * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be 
     * followed by any number of letters, digits ([0-9]), hyphens ("-"), 
     * underscores ("_"), colons (":"), and periods (".").
     *
     * @property name
     * @type String
     */
    this.name = "";

    /**
     * <p>Frame to render the resource in.
     * See the target attribute definition in HTML 4.01.</p>
     *
     * @property target
     * @type String
     */
    this.target = "";
}
HTMLFormElement.prototype = new HTMLElement();
HTMLFormElement.prototype.constructor = HTMLFormElement;

/**
 * Restores a form element's default values. It performs the same action as a 
 * reset button. 
 *
 * @method reset
 */
HTMLFormElement.prototype.reset = function() {};

/**
 * Submits the form. It performs the same action as a submit button.
 *
 * @method submit
 */
HTMLFormElement.prototype.submit = function() {};






/**
 * Group options together in logical subdivisions.
 * See the OPTGROUP element definition in HTML 4.01.
 *
 * @class HTMLSelectElement
 * @extends HTMLElement
 */
function HTMLSelectElement() {

    /**
     * <p>The control is unavailable in this context.
     * See the disabled attribute definition in HTML 4.01.</p>
     *
     * @property disabled
     * @type Boolean
     */
    this.disabled = false;

    /**
     * <p>Returns the FORM element containing this control.
     * Returns null if this control is not within the context of a form.</p>
     *
     * @property form
     * @attributes ReadOnly
     * @type HTMLFormElement|Null
     */
    this.form = new HTMLFormElement();

    /**
     * <p>The number of options in this SELECT.</p>
     *
     * @property length
     * @throws {DOMException} NOT_SUPPORTED_ERR: if setting the length is not
     * allowed by the implementation.
     * @type Number
     */
    this.length = 0;

    /**
     * <p>If true, multiple OPTION elements may be selected in this SELECT.
     * See the multiple attribute definition in HTML 4.01.</p>
     *
     * @property multiple
     * @type Boolean
     */
    this.multiple = false;

    /**
     * <p>Form control or object name when submitted with a form.
     * See the name attribute definition in HTML 4.01.</p>
     *
     * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be 
     * followed by any number of letters, digits ([0-9]), hyphens ("-"), 
     * underscores ("_"), colons (":"), and periods (".").
     *
     * @property name
     * @type String
     */
    this.name = "";

    /**
     * <p>The collection of OPTION elements contained by this element.</p>
     *
     * @property options
     * @type HTMLOptionsCollection
     */
    this.options = new HTMLOptionsCollection();

    /**
     * <p>The ordinal index of the selected option, starting from 0. The value
     * -1 is returned if no element is selected. If multiple options are
     * selected, the index of the first selected option is returned.</p>
     *
     * @property selectedIndex
     * @type Number
     */
    this.selectedIndex = 0;

    /**
     * <p>Number of visible rows.
     * See the size attribute definition in HTML 4.01.</p>
     *
     * @property size
     * @type Number
     */
    this.size = 0;

    /**
     * <p>Index that represents the element's position in the tabbing order.
     * See the tabindex attribute definition in HTML 4.01.</p>
     *
     * @property tabIndex
     * @type Number
     */
    this.tabIndex = 0;

    /**
     * <p>The type of this form control. This is the string "select-multiple"
     * when the multiple attribute is true and the string "select-one" when
     * false.</p>
     *
     * @property type
     * @attributes ReadOnly
     * @type String
     */
    this.type = "";

    /**
     * <p>The current form control value (i.e. the value of the currently
     * selected option), if multiple options are selected this is the value of
     * the first selected option.</p>
     *
     * @property value
     * @type String
     */
    this.value = "";
}
HTMLSelectElement.prototype = new HTMLElement();
HTMLSelectElement.prototype.constructor = HTMLSelectElement;

/**
 * Add a new element to the collection of OPTION elements for this SELECT. This
 * method is the equivalent of the appendChild method of the Node interface if
 * the before parameter is null. It is equivalent to the insertBefore method on
 * the parent of before in all other cases. This method may have no effect if
 * the new element is not an OPTION or an OPTGROUP.
 *
 * @method add
 * @throws {DOMException} NOT_FOUND_ERR: Raised if before is not a descendant
 * of the SELECT element.
 * @param {HTMLElement} element The element to add.
 * @param {HTMLElement} before The element to insert before, or null for the
 * tail of the list.
 */
HTMLSelectElement.prototype.add = function( element, before ) {
    throw new DOMException();
};

/**
 * Removes keyboard focus from this element.
 *
 * @method blur
 */
HTMLSelectElement.prototype.blur = function() {};

/**
 * Gives keyboard focus to this element.
 *
 * @method focus
 */
HTMLSelectElement.prototype.focus = function() {};

/**
 * Remove an element from the collection of OPTION elements for this SELECT.
 * Does nothing if no element has the given index.
 *
 * @method remove
 * @param {Number} index The index of the item to remove, starting from 0.
 */
HTMLSelectElement.prototype.remove = function( index ) {};








/**
 * Group options together in logical subdivisions.
 * See the OPTGROUP element definition in HTML 4.01.
 *
 * @class HTMLOptGroupElement
 * @extends HTMLElement
 */
function HTMLOptGroupElement() {

    /**
     * <p>The control is unavailable in this context.
     * See the disabled attribute definition in HTML 4.01.</p>
     *
     * @property disabled
     * @type Boolean
     */
    this.disabled = false;

    /**
     * <p>Assigns a label to this option group.
     * See the label attribute definition in HTML 4.01.</p>
     *
     * @property label
     * @type String
     */
    this.label = "";
}
HTMLOptGroupElement.prototype = new HTMLElement();
HTMLOptGroupElement.prototype.constructor = HTMLOptGroupElement;







/**
 * A selectable choice.
 * See the OPTION element definition in HTML 4.01.
 *
 * @class HTMLOptionElement
 * @extends HTMLElement
 */
function HTMLOptionElement() {

    /**
     * <p>Represents the value of the HTML selected attribute. The value of this
     * attribute does not change if the state of the corresponding form control,
     * in an interactive user agent, changes.
     * See the selected attribute definition in HTML 4.01.</p>
     *
     * @property defaultSelected
     * @type Boolean
     */
    this.defaultSelected = false;

    /**
     * <p>The control is unavailable in this context.
     * See the disabled attribute definition in HTML 4.01.</p>
     *
     * @property disabled
     * @type Boolean
     */
    this.disabled = false;

    /**
     * <p>Returns the FORM element containing this control.
     * Returns null if this control is not within the context of a form.</p>
     *
     * @property form
     * @attributes ReadOnly
     * @type HTMLFormElement|Null
     */
    this.form = new HTMLFormElement();

    /**
     * <p>The index of this OPTION in its parent SELECT, starting from 0.</p>
     *
     * @property index
     * @attributes ReadOnly
     * @type Number
     */
    this.index = 0;

    /**
     * <p>Option label for use in hierarchical menus.
     * See the label attribute definition in HTML 4.01.</p>
     *
     * @property label
     * @type String
     */
    this.label = "";

    /**
     * <p>Represents the current state of the corresponding form control, in an
     * interactive user agent. Changing this attribute changes the state of the
     * form control, but does not change the value of the HTML selected
     * attribute of the element.</p>
     *
     * @property selected
     * @type Boolean
     */
    this.selected = false;

    /**
     * <p>The text contained within the option element.</p>
     *
     * @property text
     * @attributes ReadOnly
     * @type String
     */
    this.text = "";

    /**
     * <p>The current form control value.
     * See the value attribute definition in HTML 4.01.</p>
     *
     * @property value
     * @type String
     */
    this.value = "";
}
HTMLOptionElement.prototype = new HTMLElement();
HTMLOptionElement.prototype.constructor = HTMLOptionElement;







/**
 * <p>Form control.</p>
 *
 * <p><em>Depending upon the environment in which the page is being viewed, the
 * value property may be read-only for the file upload input type. For the
 * "password" input type, the actual value returned may be masked to prevent
 * unauthorized use.
 * See the INPUT element definition in [HTML 4.01].</em></p>
 *
 * @class HTMLInputElement
 * @extends HTMLElement
 */
function HTMLInputElement() {

    /**
     * <p>A comma-separated list of content types that a server processing this 
     * form will handle correctly.
     * See the accept attribute definition in HTML 4.01.</p>
     *
     * @property accept
     * @type String
     */
    this.accept = "";

    /**
     * <p>A single character access key to give access to the form control.
     * See the accesskey attribute definition in HTML 4.01.</p>
     *
     * @property accessKey
     * @type String
     */
    this.accessKey = "";

    /**
     * <p>Aligns this object (vertically or horizontally) with respect to its
     * surrounding text.
     * See the align attribute definition in HTML 4.01. </p>
     *
     * @property align
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.align = "";

    /**
     * <p>Alternate text for user agents not rendering the normal content of
     * this element.
     * See the alt attribute definition in HTML 4.01.</p>
     *
     * @property alt
     * @type String
     */
    this.alt = "";

    /**
     * <p>When the type attribute of the element has the value "radio" or
     * "checkbox", this represents the current state of the form control, in an
     * interactive user agent. Changes to this attribute change the state of the
     * form control, but do not change the value of the HTML checked attribute
     * of the INPUT element. </p>
     *
     * <p><em>During the handling of a click event on an input element with a
     * type attribute that has the value "radio" or "checkbox", some
     * implementations may change the value of this property before the event is
     * being dispatched in the document. If the default action of the event is
     * canceled, the value of the property may be changed back to its original
     * value. This means that the value of this property during the handling of
     * click events is implementation dependent.</em></p>
     *
     * @property checked
     * @type Boolean
     */
    this.checked = false;

    /**
     * <p>When type has the value "radio" or "checkbox", this represents the
     * HTML checked attribute of the element. The value of this attribute does
     * not change if the state of the corresponding form control, in an
     * interactive user agent, changes.
     * See the checked attribute definition in HTML 4.01.</p>
     *
     * @property defaultChecked
     * @type Boolean
     */
    this.defaultChecked = false;

    /**
     * <p>When the type attribute of the element has the value "text", "file" or
     * "password", this represents the HTML value attribute of the element. The
     * value of this attribute does not change if the contents of the
     * corresponding form control, in an interactive user agent, changes.
     * See the value attribute definition in HTML 4.01.</p>
     *
     * @property defaultValue
     * @type String
     */
    this.defaultValue = "";

    /**
     * <p>The control is unavailable in this context.
     * See the disabled attribute definition in HTML 4.01.</p>
     *
     * @property disabled
     * @type Boolean
     */
    this.disabled = false;

    /**
     * <p>Returns the FORM element containing this control.
     * Returns null if this control is not within the context of a form.</p>
     *
     * @property form
     * @attributes ReadOnly
     * @type HTMLFormElement|Null
     */
    this.form = new HTMLFormElement();

    /**
     * <p>Maximum number of characters for text fields, when type has the value
     * "text" or "password".
     * See the maxlength attribute definition in HTML 4.01.</p>
     *
     * @property maxLength
     * @type Number
     */
    this.maxLength = 0;

    /**
     * <p>Form control or object name when submitted with a form.
     * See the name attribute definition in HTML 4.01.</p>
     *
     * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be 
     * followed by any number of letters, digits ([0-9]), hyphens ("-"), 
     * underscores ("_"), colons (":"), and periods (".").
     *
     * @property name
     * @type String
     */
    this.name = "";

    /**
     * <p>This control is read-only. Relevant only when type has the value
     * "text" or "password".
     * See the readonly attribute definition in HTML 4.01.</p>
     *
     * @property readOnly
     * @type Boolean
     */
    this.readOnly = false;

    /**
     * <p>Size information. The precise meaning is specific to each type of
     * field.
     * See the size attribute definition in HTML 4.01.</p>
     *
     * @property size
     * @type Number
     */
    this.size = 0;

    /**
     * <p>When the type attribute has the value "image", this attribute
     * specifies the location of the image to be used to decorate the graphical
     * submit button.
     * See the src attribute definition in HTML 4.01.</p>
     *
     * @property src
     * @type String
     */
    this.src = "";

    /**
     * <p>Index that represents the element's position in the tabbing order.
     * See the tabindex attribute definition in HTML 4.01.</p>
     *
     * @property tabIndex
     * @type Number
     */
    this.tabIndex = 0;

    /**
     * <p>Index that represents the element's position in the tabbing order.
     * See the tabindex attribute definition in HTML 4.01.</p>
     *
     * @property type
     * @type String
     */
    this.type = "";

    /**
     * <p>Use client-side image map.
     * See the usemap attribute definition in HTML 4.01.</p>
     *
     * @property useMap
     * @type String
     */
    this.useMap = "";

    /**
     * <p>When the type attribute of the element has the value "text", "file"
     * or "password", this represents the current contents of the corresponding
     * form control, in an interactive user agent. Changing this attribute
     * changes the contents of the form control, but does not change the value
     * of the HTML value attribute of the element. When the type attribute of
     * the element has the value "button", "hidden", "submit", "reset", "image",
     * "checkbox" or "radio", this represents the HTML value attribute of the
     * element. See the value attribute definition in HTML 4.01.</p>
     *
     * @property value
     * @type String
     */
    this.value = "";
}
HTMLInputElement.prototype = new HTMLElement();
HTMLInputElement.prototype.constructor = HTMLInputElement;

/**
 * <p>Removes keyboard focus from this element.</p>
 *
 * @method blur
 */
HTMLInputElement.prototype.blur = function() {};

/**
 * <p>Simulate a mouse-click. For INPUT elements whose type attribute has one
 * of the following values: "button", "checkbox", "radio", "reset", or "submit".
 * </p>
 *
 * @method click
 */
HTMLInputElement.prototype.click = function() {};

/**
 * <p>Gives keyboard focus to this element.</p>
 *
 * @method focus
 */
HTMLInputElement.prototype.focus = function() {};

/**
 * <p>Select the contents of the text area. For INPUT elements whose type
 * attribute has one of the following values: "text", "file", or "password".</p>
 *
 * @method select
 */
HTMLInputElement.prototype.select = function() {};







/**
 * Multi-line text field.
 * See the TEXTAREA element definition in HTML 4.01
 *
 * @class HTMLTextAreaElement
 * @extends HTMLElement
 */
function HTMLTextAreaElement() {

    /**
     * <p>A single character access key to give access to the form control.
     * See the accesskey attribute definition in HTML 4.01.</p>
     *
     * @property accessKey
     * @type String
     */
    this.accessKey = "";

    /**
     * <p>Width of control (in characters).
     * See the cols attribute definition in HTML 4.01.</p>
     *
     * @property cols
     * @type Number
     */
    this.cols = 0;

    /**
     * <p>Represents the contents of the element. The value of this attribute
     * does not change if the contents of the corresponding form control, in an
     * interactive user agent, changes.</p>
     *
     * @property defaultValue
     * @type String
     */
    this.defaultValue = "";

    /**
     * <p>The control is unavailable in this context.
     * See the disabled attribute definition in HTML 4.01.</p>
     *
     * @property disabled
     * @type Boolean
     */
    this.disabled = false;

    /**
     * <p>Returns the FORM element containing this control.
     * Returns null if this control is not within the context of a form.</p>
     *
     * @property form
     * @attributes ReadOnly
     * @type HTMLFormElement|Null
     */
    this.form = new HTMLFormElement();

    /**
     * <p>Form control or object name when submitted with a form.
     * See the name attribute definition in HTML 4.01.</p>
     *
     * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be 
     * followed by any number of letters, digits ([0-9]), hyphens ("-"), 
     * underscores ("_"), colons (":"), and periods (".").
     *
     * @property name
     * @type String
     */
    this.name = "";

    /**
     * <p>This control is read-only.
     * See the readonly attribute definition in HTML 4.01.</p>
     *
     * @property readOnly
     * @type Boolean
     */
    this.readOnly = false;

    /**
     * <p>Number of text rows.
     * See the rows attribute definition in HTML 4.01.</p>
     *
     * @property rows
     * @type Number
     */
    this.rows = 0;

    /**
     * <p>Index that represents the element's position in the tabbing order.
     * See the tabindex attribute definition in HTML 4.01.</p>
     *
     * @property tabIndex
     * @type Number
     */
    this.tabIndex = 0;

    /**
     * <p>The type of this form control. This is the string "textarea".</p>
     *
     * @property type
     * @attributes ReadOnly
     * @type String
     */
    this.type = "";

    /**
     * <p>Represents the current contents of the corresponding form control, in
     * an interactive user agent. Changing this attribute changes the contents
     * of the form control, but does not change the contents of the element. If
     * the entirety of the data can not fit into a single DOMString, the
     * implementation may truncate the data.</p>
     *
     * @property value
     * @type String
     */
    this.value = "";
}
HTMLTextAreaElement.prototype = new HTMLElement();
HTMLTextAreaElement.prototype.constructor = HTMLTextAreaElement;

/**
 * <p>Removes keyboard focus from this element.</p>
 *
 * @method blur
 */
HTMLTextAreaElement.prototype.blur = function() {};

/**
 * <p>Gives keyboard focus to this element.</p>
 *
 * @method focus
 */
HTMLTextAreaElement.prototype.focus = function() {};

/**
 * <p>Select the contents of the TEXTAREA.</p>
 *
 * @method select
 */
HTMLTextAreaElement.prototype.select = function() {};




/**
 * Push button. See the BUTTON element definition in HTML 4.01.
 *
 * @class HTMLButtonElement
 * @extends HTMLElement
 */
function HTMLButtonElement() {

    /**
     * <p>A single character access key to give access to the form control.
     * See the accesskey attribute definition in HTML 4.01.</p>
     *
     * @property accessKey
     * @type String
     */
    this.accessKey = "";

    /**
     * <p>The control is unavailable in this context.
     * See the disabled attribute definition in HTML 4.01.</p>
     *
     * @property disabled
     * @type Boolean
     */
    this.disabled = false;

    /**
     * <p>Returns the FORM element containing this control.
     * Returns null if this control is not within the context of a form.</p>
     *
     * @property form
     * @attributes ReadOnly
     * @type HTMLFormElement|Null
     */
    this.form = new HTMLFormElement();

    /**
     * <p>Form control or object name when submitted with a form.
     * See the name attribute definition in HTML 4.01.</p>
     *
     * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be 
     * followed by any number of letters, digits ([0-9]), hyphens ("-"), 
     * underscores ("_"), colons (":"), and periods (".").
     *
     * @property name
     * @type String
     */
    this.name = "";

    /**
     * <p>Index that represents the element's position in the tabbing order.
     * See the tabindex attribute definition in HTML 4.01.</p>
     *
     * @property tabIndex
     * @type Number
     */
    this.tabIndex = 0;

    /**
     * <p>The type of button (all lower case).
     * See the type attribute definition in HTML 4.01.</p>
     *
     * @property type
     * @attributes ReadOnly
     * @type String
     */
    this.type = "";

    /**
     * <p>Represents the current contents of the corresponding form control, in
     * an interactive user agent. Changing this attribute changes the contents
     * of the form control, but does not change the contents of the element. If
     * the entirety of the data can not fit into a single DOMString, the
     * implementation may truncate the data.</p>
     *
     * @property value
     * @type String
     */
    this.value = "";
}
HTMLButtonElement.prototype = new HTMLElement();
HTMLButtonElement.prototype.constructor = HTMLButtonElement;




/**
 * Form field label text.
 * See the LABEL element definition in HTML 4.01.
 *
 * @class HTMLLabelElement
 * @extends HTMLElement
 */
function HTMLLabelElement() {

    /**
     * <p>A single character access key to give access to the form control.
     * See the accesskey attribute definition in HTML 4.01.</p>
     *
     * @property accessKey
     * @type String
     */
    this.accessKey = "";

    /**
     * <p>Returns the FORM element containing this control.
     * Returns null if this control is not within the context of a form.</p>
     *
     * @property form
     * @attributes ReadOnly
     * @type HTMLFormElement|Null
     */
    this.form = new HTMLFormElement();

    /**
     * <p>This attribute links this label with another form control by id
     * attribute.
     * See the for attribute definition in HTML 4.01.</p>
     *
     * @property htmlFor
     * @type String
     */
    this.htmlFor = "";
}
HTMLLabelElement.prototype = new HTMLElement();
HTMLLabelElement.prototype.constructor = HTMLLabelElement;




/**
 * Organizes form controls into logical groups.
 * See the FIELDSET element definition in HTML 4.01.
 *
 * @class HTMLFieldSetElement
 * @extends HTMLElement
 */
function HTMLFieldSetElement() {

    /**
     * <p>Returns the FORM element containing this control.
     * Returns null if this control is not within the context of a form.</p>
     *
     * @property form
     * @attributes ReadOnly
     * @type HTMLFormElement|Null
     */
    this.form = new HTMLFormElement();
}
HTMLFieldSetElement.prototype = new HTMLElement();
HTMLFieldSetElement.prototype.constructor = HTMLFieldSetElement;




/**
 * Provides a caption for a FIELDSET grouping.
 * See the LEGEND element definition in HTML 4.01.
 *
 * @class HTMLLegendElement
 * @extends HTMLElement
 */
function HTMLLegendElement() {

    /**
     * <p>A single character access key to give access to the form control.
     * See the accesskey attribute definition in HTML 4.01.</p>
     *
     * @property accessKey
     * @type String
     */
    this.accessKey = "";

    /**
     * <p>Text alignment relative to FIELDSET.
     * See the align attribute definition in HTML 4.01.</p>
     *
     * @property align
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.align = "";

    /**
     * <p>Returns the FORM element containing this control.
     * Returns null if this control is not within the context of a form.</p>
     *
     * @property form
     * @attributes ReadOnly
     * @type HTMLFormElement|Null
     */
    this.form = new HTMLFormElement();
}
HTMLLegendElement.prototype = new HTMLElement();
HTMLLegendElement.prototype.constructor = HTMLLegendElement;




/**
 * Unordered list. See the UL element definition in HTML 4.01.
 *
 * @class HTMLLUListElement
 * @extends HTMLElement
 */
function HTMLLUListElement() {

    /**
     * <p>Reduce spacing between list items.
     * See the compact attribute definition in HTML 4.01.</p>
     *
     * @property compact
     * @type Boolean
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.compact = false;

    /**
     * <p>Bullet style.
     * See the type attribute definition in HTML 4.01.</p>
     *
     * @property type
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.type = "";
}
HTMLLUListElement.prototype = new HTMLElement();
HTMLLUListElement.prototype.constructor = HTMLLUListElement;




/**
 * Ordered list.
 * See the OL element definition in HTML 4.01.
 *
 * @class HTMLOListElement
 * @extends HTMLElement
 */
function HTMLOListElement() {

    /**
     * <p>Reduce spacing between list items.
     * See the compact attribute definition in HTML 4.01.</p>
     *
     * @property compact
     * @type Boolean
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.compact = false;

    /**
     * <p>Starting sequence number.
     * See the start attribute definition in HTML 4.01.</p>
     *
     * @property start
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.start = 0;

    /**
     * <p>Numbering style.
     * See the type attribute definition in HTML 4.01.</p>
     *
     * @property type
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.type = "";
}
HTMLOListElement.prototype = new HTMLElement();
HTMLOListElement.prototype.constructor = HTMLOListElement;




/**
 * Definition list.
 * See the DL element definition in HTML 4.01.
 *
 * @class HTMLDListElement
 * @extends HTMLElement
 */
function HTMLDListElement() {

    /**
     * <p>Reduce spacing between list items.
     * See the compact attribute definition in HTML 4.01.</p>
     *
     * @property compact
     * @type Boolean
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.compact = false;
}
HTMLDListElement.prototype = new HTMLElement();
HTMLDListElement.prototype.constructor = HTMLDListElement;




/**
 * Directory list.
 * See the DIR element definition in HTML 4.01.
 *
 * @class HTMLDirectoryElement
 * @extends HTMLElement
 *
 * @deprecated This element is deprecated in HTML 4.01.
 */
function HTMLDirectoryElement() {

    /**
     * <p>Reduce spacing between list items.
     * See the compact attribute definition in HTML 4.01.</p>
     *
     * @property compact
     * @type Boolean
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.compact = false;
}
HTMLDirectoryElement.prototype = new HTMLElement();
HTMLDirectoryElement.prototype.constructor = HTMLDirectoryElement;




/**
 * Menu list.
 * See the MENU element definition in HTML 4.01.
 *
 * @class HTMLMenuElement
 * @extends HTMLElement
 *
 * @deprecated This element is deprecated in HTML 4.01.
 */
function HTMLMenuElement() {

    /**
     * <p>Reduce spacing between list items.
     * See the compact attribute definition in HTML 4.01.</p>
     *
     * @property compact
     * @type Boolean
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.compact = false;
}
HTMLMenuElement.prototype = new HTMLMenuElement();
HTMLMenuElement.prototype.constructor = HTMLMenuElement;




/**
 * List item. See the LI element definition in HTML 4.01.
 *
 * @class HTMLLIEelement
 * @extends HTMLElement
 */
function HTMLLIEelement() {

    /**
     * <p>List item bullet style.
     * See the type attribute definition in HTML 4.01.</p>
     *
     * @property type
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.type = "";

    /**
     * <p>Reset sequence number when used in OL.
     * See the value attribute definition in HTML 4.01.</p>
     *
     * @property value
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.value = "";
}
HTMLLIEelement.prototype = new HTMLElement();
HTMLLIEelement.prototype.constructor = HTMLLIEelement;




/**
 * Generic block container.
 * See the DIV element definition in HTML 4.01.
 *
 * @class HTMLDivElement
 * @extends HTMLElement
 */
function HTMLDivElement() {

    /**
     * <p>Horizontal text alignment.
     * See the align attribute definition in HTML 4.01.</p>
     *
     * @property align
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.align = "";
}
HTMLDivElement.prototype = new HTMLElement();
HTMLDivElement.prototype.constructor = HTMLDivElement;




/**
 * Paragraphs. See the P element definition in HTML 4.01.
 *
 * @class HTMLParagraphElement
 * @extends HTMLElement
 */
function HTMLParagraphElement() {

    /**
     * <p>Horizontal text alignment.
     * See the align attribute definition in HTML 4.01.</p>
     *
     * @property align
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.align = "";
}
HTMLParagraphElement.prototype = new HTMLElement();
HTMLParagraphElement.prototype.constructor = HTMLParagraphElement;




/**
 * For the H1 to H6 elements.
 * See the H1 element definition in HTML 4.01.
 *
 * @class HTMLHeadingElement
 * @extends HTMLElement
 */
function HTMLHeadingElement() {

    /**
     * <p>Horizontal text alignment.
     * See the align attribute definition in HTML 4.01.</p>
     *
     * @property align
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.align = "";
}
HTMLHeadingElement.prototype = new HTMLElement();
HTMLHeadingElement.prototype.constructor = HTMLHeadingElement;




/**
 * For the Q and BLOCKQUOTE elements.
 * See the Q element definition in HTML 4.01.
 *
 * @class HTMLQuoteElement
 * @extends HTMLElement
 */
function HTMLQuoteElement() {

    /**
     * <p>A URI [IETF RFC 2396] designating a source document or message.
     * See the cite attribute definition in HTML 4.01.</p>
     *
     * @property cite
     * @type String
     */
    this.cite = "";
}
HTMLQuoteElement.prototype = new HTMLElement();
HTMLQuoteElement.prototype.constructor = HTMLQuoteElement;




/**
 * Preformatted text.
 * See the PRE element definition in HTML 4.01.
 *
 * @class HTMLPreElement
 * @extends HTMLElement
 */
function HTMLPreElement() {

    /**
     * <p>Fixed width for content.
     * See the width attribute definition in HTML 4.01.</p>
     *
     * @property width
     * @type Number
     */
    this.width = 0;
}
HTMLPreElement.prototype = new HTMLElement();
HTMLPreElement.prototype.constructor = HTMLPreElement;




/**
 * Force a line break.
 * See the BR element definition in HTML 4.01.
 *
 * @class HTMLBRElement
 * @extends HTMLElement
 */
function HTMLBRElement() {

    /**
     * <p>Control flow of text around floats.
     * See the clear attribute definition in HTML 4.01. </p>
     *
     * @property clear
     * @type String
     */
    this.clear = "";
}
HTMLBRElement.prototype = new HTMLElement();
HTMLBRElement.prototype.constructor = HTMLBRElement;




/**
 * Base font.
 * See the BASEFONT element definition in HTML 4.01.
 *
 * @class HTMLBaseFontElement
 * @extends HTMLElement
 *
 * @deprecated This element is deprecated in HTML 4.01.
 */
function HTMLBaseFontElement() {

    /**
     * <p>Font color.
     * See the color attribute definition in HTML 4.01.</p>
     *
     * @property color
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.color = "";

    /**
     * <p>Font face identifier.
     * See the face attribute definition in HTML 4.01.</p>
     *
     * @property face
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.face = "";

    /**
     * <p>Computed font size.
     * See the size attribute definition in HTML 4.01.
     * </p>
     *
     * @property size
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.size = "";
}
HTMLBaseFontElement.prototype = new HTMLElement();
HTMLBaseFontElement.prototype.constructor = HTMLBaseFontElement;




/**
 * Local change to font.
 * See the FONT element definition in HTML 4.01.
 *
 * @class HTMLFontElement
 * @extends HTMLElement
 *
 * @deprecated This element is deprecated in HTML 4.01.
 */
function HTMLFontElement() {

    /**
     * <p>Font color.
     * See the color attribute definition in HTML 4.01.</p>
     *
     * @property color
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.color = "";

    /**
     * <p>Font face identifier.
     * See the face attribute definition in HTML 4.01.</p>
     *
     * @property face
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.face = "";

    /**
     * <p>Computed font size.
     * See the size attribute definition in HTML 4.01.</p>
     *
     * @property size
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.size = "";
}
HTMLFontElement.prototype = new HTMLElement();
HTMLFontElement.prototype.constructor = HTMLFontElement;




/**
 * Create a horizontal rule.
 * See the HR element definition in HTML 4.01.
 *
 * @class HTMLHRElement
 * @extends HTMLElement
 */
function HTMLHRElement() {

    /**
     * <p>Align the rule on the page.
     * See the align attribute definition in HTML 4.01.</p>
     *
     * @property align
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.align = "";

    /**
     * <p>Indicates to the user agent that there should be no shading in the
     * rendering of this element.
     * See the noshade attribute definition in HTML 4.01.</p>
     *
     * @property noShade
     * @type Boolean
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.noShade = false;

    /**
     * <p>The height of the rule.
     * See the size attribute definition in HTML 4.01.</p>
     *
     * @property size
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.size = "";

    /**
     * <p>The width of the rule.
     * See the width attribute definition in HTML 4.01.</p>
     *
     * @property width
     * @type String
     *
     * @deprecated  This attribute is deprecated in HTML 4.01.
     */
    this.width = "";
}
HTMLHRElement.prototype = new HTMLElement();
HTMLHRElement.prototype.constructor = HTMLHRElement;




/**
 * Notice of modification to part of a document. See the INS and DEL element
 * definitions in HTML 4.01.
 *
 * @class HTMLModElement
 * @extends HTMLElement
 */
function HTMLModElement() {

    /**
     * <p>A URI [IETF RFC 2396] designating a document that describes the reason
     * for the change.
     * See the cite attribute definition in HTML 4.01.</p>
     *
     * @property cite
     * @type String
     */
    this.cite = "";

    /**
     * <p>The date and time of the change.
     * See the datetime attribute definition in HTML 4.01.</p>
     *
     * @property dateTime
     * @type Date
     */
    this.dateTime = new Date();
}
HTMLModElement.prototype = new HTMLElement();
HTMLModElement.prototype.constructor = HTMLModElement;




/**
 * The anchor element. See the A element definition in HTML 4.01.
 *
 * @class HTMLAnchorElement
 * @extends HTMLElement
 */
function HTMLAnchorElement() {

    /**
     * <p>A single character access key to give access to the form control.
     * See the accesskey attribute definition in HTML 4.01.</p>
     *
     * @property accessKey
     * @type String
     */
    this.accessKey = "";

    /**
     * <p>The character encoding of the linked resource.
     * See the charset attribute definition in HTML 4.01.</p>
     *
     * @property charset
     * @type String
     */
    this.charset = "";

    /**
     * <p>Comma-separated list of lengths, defining an active region geometry.
     * See also shape for the shape of the region.
     * See the coords attribute definition in HTML 4.01.</p>
     *
     * @property coords
     * @type String
     */
    this.coords = "";

    /**
     * <p>The absolute URI [IETF RFC 2396] of the linked resource.
     * See the href attribute definition in HTML 4.01.</p>
     *
     * @property href
     * @type String
     */
    this.href = "";

    /**
     * <p>Language code of the linked resource.
     * See the hreflang attribute definition in HTML 4.01.</p>
     *
     * @property hreflang
     * @type String
     */
    this.hreflang = "";

    /**
     * <p>Anchor name.
     * See the name attribute definition in HTML 4.01.</p>
     *
     * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be 
     * followed by any number of letters, digits ([0-9]), hyphens ("-"), 
     * underscores ("_"), colons (":"), and periods (".").
     *
     * @property name
     * @type String
     */
    this.name = "";

    /**
     * <p>Forward link type.
     * See the rel attribute definition in HTML 4.01.</p>
     *
     * @property rel
     * @type String
     */
    this.rel = "";

    /**
     * <p>Reverse link type.
     * See the rev attribute definition in HTML 4.01.</p>
     *
     * @property rev
     * @type String
     */
    this.rev = "";

    /**
     * <p>The shape of the active area. The coordinates are given by coords.
     * See the shape attribute definition in HTML 4.01.</p>
     *
     * @property shape
     * @type String
     */
    this.shape = "";

    /**
     * <p>Index that represents the element's position in the tabbing order.
     * See the tabindex attribute definition in HTML 4.01.</p>
     *
     * @property tabIndex
     * @type Number
     */
    this.tabIndex = 0;

    /**
     * <p>Frame to render the resource in.
     * See the target attribute definition in HTML 4.01.</p>
     *
     * @property target
     * @type String
     */
    this.target = "";

    /**
     * <p>Advisory content type.
     * See the type attribute definition in HTML 4.01.</p>
     *
     * @property type
     * @type String
     */
    this.type = "";
}
HTMLAnchorElement.prototype = new HTMLElement();
HTMLAnchorElement.prototype.constructor = HTMLAnchorElement;

/**
 * <p>Removes keyboard focus from this element.</p>
 *
 * @method blur
 */
HTMLAnchorElement.prototype.blur = function() {};

/**
 * <p>Gives keyboard focus to this element.</p>
 *
 * @method focus
 */
HTMLAnchorElement.prototype.focus = function() {};




/**
 * Embedded image. See the IMG element definition in HTML 4.01.
 *
 * @class HTMLImageElement
 * @extends HTMLElement
 */
function HTMLImageElement() {

    /**
     * <p>URI designating the source of this image, for low-resolution output.</p>
     *
     * @property lowSrc
     * @type String
     *
     * @deprecated Not in DOM level 2
     */
    this.lowSrc = "";

    /**
     * <p>Aligns this object (vertically or horizontally) with respect to its
     * surrounding text.
     * See the align attribute definition in HTML 4.01</p>
     *
     * @property align
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.align = "";

    /**
     * <p>Alternate text for user agents not rendering the normal content of
     * this element.
     * See the alt attribute definition in HTML 4.01.</p>
     *
     * @property alt
     * @type String
     */
    this.alt = "";

    /**
     * <p>Width of border around image. 
     * See the border attribute definition in HTML 4.01.</p>
     *
     * <p><em>Note that the type of this attribute was DOMString in
     * DOM Level 1 HTML [DOM Level 1].</em></p>
     *
     * @property border
     * @type String
     */
    this.border = "";

    /**
     * <p>Height of the image in pixels. 
     * See the height attribute definition in HTML 4.01.</p>
     *
     * <p><em>Note that the type of this attribute was DOMString in
     * DOM Level 1 HTML [DOM Level 1].</em></p>
     *
     * @property height
     * @type Number
     */
    this.height = 0;

    /**
     * <p>Horizontal space to the left and right of this image in pixels.
     * See the hspace attribute definition in HTML 4.01.</p>
     *
     * <p><em>Note that the type of this attribute was DOMString in
     * DOM Level 1 HTML [DOM Level 1].</em></p>
     *
     * @property hspace
     * @type Number
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.hspace = 0;

    /**
     * <p>Use server-side image map.
     * See the ismap attribute definition in HTML 4.01.</p>
     *
     * @property isMap
     * @type Boolean
     */
    this.isMap = false;

    /**
     * <p>URI [IETF RFC 2396] designating a long description of this image or
     * frame.
     * See the longdesc attribute definition in HTML 4.01.</p>
     *
     * @property longDesc
     * @type String
     */
    this.longDesc = "";

    /**
     * <p>The name of the element (for backwards compatibility).</p>
     *
     * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be 
     * followed by any number of letters, digits ([0-9]), hyphens ("-"), 
     * underscores ("_"), colons (":"), and periods (".").
     *
     * @property name
     * @type String
     */
    this.name = "";

    /**
     * <p>URI [IETF RFC 2396] designating the source of this image.
     * See the src attribute definition in HTML 4.01.</p>
     *
     * @property src
     * @type String
     */
    this.src = "";

    /**
     * <p>Use client-side image map.
     * See the usemap attribute definition in HTML 4.01.</p>
     *
     * @property useMap
     * @type String
     */
    this.useMap = "";

    /**
     * <p>Vertical space above and below this image in pixels. 
     * See the vspace attribute definition in HTML 4.01.</p>
     *
     * <p><em>Note that the type of this attribute was DOMString in
     * DOM Level 1 HTML [DOM Level 1].</em></p>
     *
     * @property vspace
     * @type Number
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.vspace = 0;

    /**
     * <p>The width of the image in pixels. 
     * See the width attribute definition in HTML 4.01.</p>
     *
     * <p><em>Note that the type of this attribute was DOMString in
     * DOM Level 1 HTML [DOM Level 1].</em></p>
     *
     * @property width
     * @type Number
     */
    this.width = 0;
}
HTMLImageElement.prototype = new HTMLElement();
HTMLImageElement.prototype.constructor = HTMLImageElement;









/**
 * <p>Generic embedded object.</p>
 *
 * <p><em>In principle, all properties on the object element are read-write but
 * in some environments some properties may be read-only once the underlying
 * object is instantiated.
 * See the OBJECT element definition in [HTML 4.01].</em></p>
 *
 * @class HTMLObjectElement
 * @extends HTMLElement
 */
function HTMLObjectElement() {

    /**
     * <p>Aligns this object (vertically or horizontally) with respect to its
     * surrounding text.
     * See the align attribute definition in HTML 4.01.</p>
     *
     * @property align
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.align = "";

    /**
     * <p>Space-separated list of archives.
     * See the archive attribute definition in HTML 4.01.</p>
     *
     * @property archive
     * @type String
     */
    this.archive = "";

    /**
     * <p>Width of border around the object.
     * See the border attribute definition in HTML 4.01.</p>
     *
     * @property border
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.border = "";

    /**
     * <p>Applet class file.
     * See the code attribute for HTMLAppletElement.</p>
     *
     * @property code
     * @type String
     */
    this.code = "";

    /**
     * <p>Base URI [IETF RFC 2396] for classid, data, and archive attributes.
     * See the codebase attribute definition in HTML 4.01.</p>
     *
     * @property codeBase
     * @type String
     */
    this.codeBase = "";

    /**
     * <p>Content type for data downloaded via classid attribute.
     * See the codetype attribute definition in HTML 4.01.</p>
     *
     * @property codeType
     * @type String
     */
    this.codeType = "";

    /**
     * <p>The document this object contains, if there is any and it is
     * available, or null otherwise.</p>
     *
     * @property contentDocument
     * @attributes ReadOnly
     * @type Document|Null
     */
    this.contentDocument = new Document();

    /**
     * <p>A URI [IETF RFC 2396] specifying the location of the object's data.
     * See the data attribute definition in HTML 4.01.</p>
     *
     * @property data
     * @type String
     */
    this.data = "";

    /**
     * <p>Declare (for future reference), but do not instantiate, this object.
     * See the declare attribute definition in HTML 4.01.</p>
     *
     * @property declare
     * @type Boolean
     */
    this.declare = false;

    /**
     * <p>Returns the FORM element containing this control.
     * Returns null if this control is not within the context of a form.</p>
     *
     * @property form
     * @attributes ReadOnly
     * @type HTMLFormElement|Null
     */
    this.form = new HTMLFormElement();

    /**
     * <p>Override height.
     * See the height attribute definition in HTML 4.01.</p>
     *
     * @property height
     * @type String
     */
    this.height = "";

    /**
     * <p>Horizontal space, in pixels, to the left and right of this image,
     * applet, or object.
     * See the hspace attribute definition in HTML 4.01.</p>
     *
     * @property hspace
     * @type Number
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.hspace = 0;

    /**
     * <p>Form control or object name when submitted with a form.
     * See the name attribute definition in HTML 4.01.</p>
     *
     * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be 
     * followed by any number of letters, digits ([0-9]), hyphens ("-"), 
     * underscores ("_"), colons (":"), and periods (".").
     *
     * @property name
     * @type String
     */
    this.name = "";

    /**
     * <p>Message to render while loading the object.
     * See the standby attribute definition in HTML 4.01.</p>
     *
     * @property standby
     * @type String
     */
    this.standby = "";

    /**
     * <p>Index that represents the element's position in the tabbing order.
     * See the tabindex attribute definition in HTML 4.01.</p>
     *
     * @property tabIndex
     * @type Number
     */
    this.tabIndex = 0;

    /**
     * <p>Content type for data downloaded via data attribute.
     * See the type attribute definition in HTML 4.01.</p>
     *
     * @property type
     * @type String
     */
    this.type = "";

    /**
     * <p>Use client-side image map.
     * See the usemap attribute definition in HTML 4.01.</p>
     *
     * @property useMap
     * @type String
     */
    this.useMap = "";

    /**
     * <p>Vertical space, in pixels, above and below this image, applet, or
     * object.
     * See the vspace attribute definition in HTML 4.01. </p>
     *
     * <p><em>Note that the type of this attribute was DOMString in
     * DOM Level 1 HTML [DOM Level 1].</em></p>
     *
     * @property vspace
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.vspace = "";

    /**
     * <p>Override width.
     * See the width attribute definition in HTML 4.01.</p>
     *
     * @property width
     * @type String
     */
    this.width = "";
}
HTMLObjectElement.prototype = new HTMLElement();
HTMLObjectElement.prototype.constructor = HTMLObjectElement;




/**
 * Parameters fed to the OBJECT element.
 * See the PARAM element definition in HTML 4.01.
 *
 * @class HTMLParamElement
 * @extends HTMLElement
 */
function HTMLParamElement() {

    /**
     * <p>The name of a run-time parameter.
     * See the name attribute definition in HTML 4.01.</p>
     *
     * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be 
     * followed by any number of letters, digits ([0-9]), hyphens ("-"), 
     * underscores ("_"), colons (":"), and periods (".").
     *
     * @property name
     * @type String
     */
    this.name = "";

    /**
     * <p>Content type for the value attribute when valuetype has the value
     * "ref".
     * See the type attribute definition in HTML 4.01.</p>
     *
     * @property type
     * @type String
     */
    this.type = "";

    /**
     * <p>The value of a run-time parameter.
     * See the value attribute definition in HTML 4.01.</p>
     *
     * @property value
     * @type String
     */
    this.value = "";

    /**
     * <p>Information about the meaning of the value attribute value.
     * See the valuetype attribute definition in HTML 4.01.</p>
     *
     * @property valueType
     * @type String
     */
    this.valueType = "";
}
HTMLParamElement.prototype = new HTMLElement();
HTMLParamElement.prototype.constructor = HTMLParamElement;




/**
 * An embedded Java applet.
 * See the APPLET element definition in HTML 4.01.
 *
 * @class HTMLAppletElement
 * @extends HTMLElement
 *
 * @deprecated This element is deprecated in HTML 4.01.
 */
function HTMLAppletElement() {

    /**
     * <p>Aligns this object (vertically or horizontally) with respect to its
     * surrounding text.
     * See the align attribute definition in HTML 4.01.</p>
     *
     * @property align
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.align = "";

    /**
     * <p>Alternate text for user agents not rendering the normal content of
     * this element.
     * See the alt attribute definition in HTML 4.01.</p>
     *
     * @property alt
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.alt = "";

    /**
     * <p>Comma-separated archive list.
     * See the archive attribute definition in HTML 4.01.</p>
     *
     * @property archive
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.archive = "";

    /**
     * <p>Applet class file.
     * See the code attribute definition in HTML 4.01.</p>
     *
     * @property code
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.code = "";

    /**
     * <p>Optional base URI [IETF RFC 2396] for applet.
     * See the codebase attribute definition in HTML 4.01. </p>
     *
     * @property codeBase
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.codeBase = "";

    /**
     * <p>Override height.
     * See the height attribute definition in HTML 4.01.</p>
     *
     * @property height
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.height = "";

    /**
     * <p>Horizontal space, in pixels, to the left and right of this image,
     * applet, or object.
     * See the hspace attribute definition in HTML 4.01.</p>
     *
     * @property hspace
     * @type Number
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.hspace = 0;

    /**
     * <p>The name of the applet.
     * See the name attribute definition in HTML 4.01.</p>
     *
     * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be 
     * followed by any number of letters, digits ([0-9]), hyphens ("-"), 
     * underscores ("_"), colons (":"), and periods (".").
     *
     * @property name
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.name = "";

    /**
     * <p>The value of the "object" attribute.
     * See the object attribute definition in HTML 4.01.</p>
     *
     * @property object
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.object = "";

    /**
     * <p>Vertical space, in pixels, above and below this image, applet, or
     * object.
     * See the vspace attribute definition in HTML 4.01.</p>
     *
     * @property vspace
     * @type Number
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.vspace = 0;

    /**
     * <p>Override width.
     * See the width attribute definition in HTML 4.01. </p>
     *
     * @property width
     * @type String
     *
     * @deprecated This attribute is deprecated in HTML 4.01.
     */
    this.width = "";
}
HTMLAppletElement.prototype = new HTMLElement();
HTMLAppletElement.prototype.constructor = HTMLAppletElement;



/**
 * Client-side image map.
 * See the MAP element definition in HTML 4.01.
 *
 * @class HTMLMapElement
 * @extends HTMLElement
 */
function HTMLMapElement() {

    /**
     * <p>The list of areas defined for the image map.</p>
     *
     * @property areas
     * @attributes ReadOnly
     * @type HTMLCollection
     */
    this.areas = new HTMLCollection();

    /**
     * <p>Names the map (for use with usemap).
     * See the name attribute definition in HTML 4.01.</p>
     *
     * ID and NAME tokens must begin with a letter ([A-Za-z]) and may be 
     * followed by any number of letters, digits ([0-9]), hyphens ("-"), 
     * underscores ("_"), colons (":"), and periods (".").
     *
     * @property name
     * @type String
     */
    this.name = "";
}
HTMLMapElement.prototype = new HTMLElement();
HTMLMapElement.prototype.constructor = HTMLMapElement;




/**
 * Client-side image map area definition.
 * See the AREA element definition in HTML 4.01.
 *
 * @class HTMLAreaElement
 * @extends HTMLElement
 */
function HTMLAreaElement() {

    /**
     * <p>A single character access key to give access to the form control.
     * See the accesskey attribute definition in HTML 4.01.</p>
     *
     * @property accessKey
     * @type String
     */
    this.accessKey = "";

    /**
     * <p>Alternate text for user agents not rendering the normal content of
     * this element.
     * See the alt attribute definition in HTML 4.01.</p>
     *
     * @property alt
     * @type String
     */
    this.alt = "";

    /**
     * <p>Comma-separated list of lengths, defining an active region geometry.
     * See also shape for the shape of the region.
     * See the coords attribute definition in HTML 4.01.</p>
     *
     * @property coords
     * @type String
     */
    this.coords = "";

    /**
     * <p>The URI [IETF RFC 2396] of the linked resource.
     * See the href attribute definition in HTML 4.01.</p>
     *
     * @property href
     * @type String
     */
    this.href = "";

    /**
     * <p>Specifies that this area is inactive, i.e., has no associated action.
     * See the nohref attribute definition in HTML 4.01.</p>
     *
     * @property noHref
     * @type Boolean
     */
    this.noHref = false;

    /**
     * <p>The shape of the active area. The coordinates are given by coords.
     * See the shape attribute definition in HTML 4.01.</p>
     *
     * @property shape
     * @type String
     */
    this.shape = "";

    /**
     * <p>Index that represents the element's position in the tabbing order.
     * See the tabindex attribute definition in HTML 4.01.</p>
     *
     * @property tabIndex
     * @type Number
     */
    this.tabIndex = 0;

    /**
     * <p>Frame to render the resource in.
     * See the target attribute definition in HTML 4.01.</p>
     *
     * @property target
     * @type String
     */
    this.target = "";
}
HTMLAreaElement.prototype = new HTMLElement();
HTMLAreaElement.prototype.constructor = HTMLAreaElement;




/**
 * Script statements.
 * See the SCRIPT element definition in HTML 4.01.
 *
 * @class HTMLScriptElement
 * @extends HTMLElement
 */
function HTMLScriptElement() {

    /**
     * <p>The character encoding of the linked resource. 
     * See the charset attribute definition in HTML 4.01.</p>
     *
     * @property charset
     * @type String
     */
    this.charset = "";

    /**
     * <p>Indicates that the user agent can defer processing of the script. 
     * See the defer attribute definition in HTML 4.01.</p>
     *
     * @property defer
     * @type Boolean
     */
    this.defer = false;

    /**
     * <p>Reserved for future use.</p>
     *
     * @property event
     * @type String
     */
    this.event = "";

    /**
     * <p>Reserved for future use.</p>
     *
     * @property htmlFor
     * @type String
     */
    this.htmlFor = "";

    /**
     * <p>URI [IETF RFC 2396] designating an external script.
     * See the src attribute definition in HTML 4.01.</p>
     *
     * @property src
     * @type String
     */
    this.src = "";
    
    /**
     * <p>The script content of the element.</p>
     *
     * @property text
     * @type String
     */
    this.text = "";

    /**
     * <p>The content type of the script language.
     * See the type attribute definition in HTML 4.01.</p>
     *
     * @property type
     * @type String
     */
    this.type = "";
}
HTMLScriptElement.prototype = new HTMLElement();
HTMLScriptElement.prototype.constructor = HTMLScriptElement;




/**
 * The create* and delete* methods on the table allow authors to construct and
 * modify tables. [HTML 4.01] specifies that only one of each of the CAPTION,
 * THEAD, and TFOOT elements may exist in a table. Therefore, if one exists,
 * and the createTHead() or createTFoot() method is called, the method returns
 * the existing THead or TFoot element.
 * See the TABLE element definition in HTML 4.01.
 *
 * @class HTMLTableElement
 * @extends HTMLElement
 */
function HTMLTableElement() {
    this.align = "";
    this.bgColor = "";
    this.border = "";
    this.caption = new HTMLTableCaptionElement();
    this.cellPadding = "";
    this.cellSpacing = "";
    this.frame = "";
    this.rows = new HTMLCollection();
    this.rules = "";
    this.summary = "";
    this.tHead = new HTMLTableSectionElement();
    this.tFoot = new HTMLTableSectionElement();
    this.tBodies = new HTMLCollection();
    this.width = "";
}
HTMLTableElement.prototype = new HTMLElement();
HTMLTableElement.prototype.constructor = HTMLTableElement;


HTMLTableElement.prototype.createTHead = function() {};
HTMLTableElement.prototype.deleteTHead = function() {};
HTMLTableElement.prototype.createTFoot = function() {};
HTMLTableElement.prototype.deleteTFoot = function() {};
HTMLTableElement.prototype.createCaption = function() {};
HTMLTableElement.prototype.deleteCaption = function() {};
HTMLTableElement.prototype.insertRow = function( index ) {};
HTMLTableElement.prototype.deleteRow = function( index ) {};



/**
 * Table caption See the CAPTION element definition in HTML 4.01.
 *
 * @class HTMLTableCaptionElement
 * @extends HTMLElement
 */
function HTMLTableCaptionElement() {
    this.align = "";
}
HTMLTableCaptionElement.prototype = new HTMLElement();
HTMLTableCaptionElement.prototype.constructor = HTMLTableCaptionElement;




/**
 * Regroups the COL and COLGROUP elements. See the COL element definition in
 * HTML 4.01.
 *
 * @class HTMLTableColElement
 * @extends HTMLElement
 */
function HTMLTableColElement() {
    this.align = "";
    this.ch = "";
    this.chOff = "";
    this.span = 0;
    this.vAlign = "";
    this.width = "";
}
HTMLTableColElement.prototype = new HTMLElement();
HTMLTableColElement.prototype.constructor = HTMLTableColElement;




/**
 * The THEAD, TFOOT, and TBODY elements.
 *
 * @class HTMLTableSectionElement
 * @extends HTMLElement
 */
function HTMLTableSectionElement() {
    this.align = "";
    this.ch = "";
    this.chOff = "";
    this.vAlign = "";
    this.rows = new HTMLCollection();
}
HTMLTableSectionElement.prototype = new HTMLElement();
HTMLTableSectionElement.prototype.constructor = HTMLTableSectionElement;


/**
 * Delete a row from this section.
 *
 * @method deleteRow
 * @throws {DOMException} INDEX_SIZE_ERR: Raised if the specified
 * <code>index<code> is greater than the number of cells or if the index is a
 * negative number other than -1.
 * @param {Number} index The index of the row to be deleted, or -1 to delete the
 * last row. This index starts from 0 and is relative only to the rows contained
 * inside this section, not all the rows in the table.
 */
HTMLTableSectionElement.prototype.deleteRow = function( index ) {
    throw new DOMException();
};

/**
 * Insert a row into this section. The new row is inserted immediately before
 * the current <code>index</code>th row in this section. If <code>index</code>
 * is -1 or equal to the number of rows in this section, the new row is
 * appended.
 *
 * @method insertRow
 * @throws {DOMException} INDEX_SIZE_ERR: Raised if the specified
 * <code>index<code> is greater than the number of cells or if the index is a
 * negative number other than -1.
 * @param {Number} index The row number where to insert a new row. This index
 * starts from 0 and is relative only to the rows contained inside this section,
 * not all the rows in the table.
 * @return {HTMLTableRowElement} The newly created row.
 */
HTMLTableSectionElement.prototype.insertRow = function( index ) {
    throw new DOMException();
    return new HTMLTableRowElement();
};



/**
 * A row in a table. See the TR element definition in HTML 4.01.
 *
 * @class HTMLTableRowElement
 * @extends HTMLElement
 */
function HTMLTableRowElement() {
    this.rowIndex = 0;
    this.sectionRowIndex = 0;
    this.cells = null;
    this.align = "";
    this.bgColor = "";
    this.ch = "";
    this.chOff = "";
    this.vAlign = "";
}
HTMLTableRowElement.prototype = new HTMLElement();
HTMLTableRowElement.prototype.constructor = HTMLTableRowElement;

/**
 * Delete a cell from the current row.
 *
 * @method deleteCell
 * @throws {DOMException} INDEX_SIZE_ERR: Raised if the specified
 * <code>index<code> is greater than the number of cells or if the index is a
 * negative number other than -1.
 * @param {Number} index The index of the cell to delete, starting from 0. If
 * the index is -1 the last cell in the row is deleted.
 */
HTMLTableRowElement.prototype.deleteCell = function( index ) {
    throw new DOMException();
};

/**
 * Insert an empty <code>TD</code> cell into this row. If <code>index</code> is
 * -1 or equal to the number of cells, the new cell is appended.
 *
 * @method insertCell
 * @throws {DOMException} INDEX_SIZE_ERR: Raised if the specified
 * <code>index<code> is greater than the number of cells or if the index is a
 * negative number other than -1.
 * @param {Number} index The place to insert the cell, starting from 0.
 * @return {HTMLTableCellElement} The newly created cell.
 */
HTMLTableRowElement.prototype.insertCell = function( index ) {
    throw new DOMException();
    return new HTMLTableCellElement();
};



/**
 * The object used to represent the TH and TD elements. See the TD element
 * definition in HTML 4.01.
 *
 * @class HTMLTableCellElement
 * @extends HTMLElement
 */
function HTMLTableCellElement() {
    this.cellIndex = 0;
    this.abbr = "";
    this.align = "";
    this.axis = "";
    this.bgColor = "";
    this.ch = "";
    this.chOff = "";
    this.colSpan = 0;
    this.headers = "";
    this.height = "";
    this.noWrap = false;
    this.rowSpan = 0;
    this.scope = "";
    this.vAlign = "";
    this.width = "";
}
HTMLTableCellElement.prototype = new HTMLElement();
HTMLTableCellElement.prototype.constructor = HTMLTableCellElement;




/**
 * Create a grid of frames. See the FRAMESET element definition in HTML 4.01.
 *
 * @class HTMLFrameSetElement
 * @extends HTMLElement
 */
function HTMLFrameSetElement() {
    this.cols = "";
    this.rows = "";
}
HTMLFrameSetElement.prototype = new HTMLElement();
HTMLFrameSetElement.prototype.constructor = HTMLFrameSetElement;




/**
 * Create a frame. See the FRAME element definition in HTML 4.01.
 *
 * @class HTMLFrameElement
 * @extends HTMLElement
 */
function HTMLFrameElement() {
    this.frameBorder = "";
    this.longDesc = "";
    this.marginHeight = "";
    this.marginWidth = "";
    this.name = "";
    this.noResize = false;
    this.src = "";
}
HTMLFrameElement.prototype = new HTMLElement();
HTMLFrameElement.prototype.constructor = HTMLFrameElement;




/**
 * Inline subwindows. See the IFRAME element definition in HTML 4.01.
 *
 * @class HTMLIFrameElement
 * @extends HTMLElement
 */
function HTMLIFrameElement() {
    this.align = "";
    this.frameBorder = "";
    this.height = "";
    this.longDesc = "";
    this.marginHeight = "";
    this.marginWidth = "";
    this.name = "";
    this.scrolling = "";
    this.src = "";
    this.width = "";
}
HTMLIFrameElement.prototype = new HTMLElement();
HTMLIFrameElement.prototype.constructor = HTMLIFrameElement;