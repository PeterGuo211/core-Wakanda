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
 * <p>This API defines the Window object, which provides the global namespace for 
 * web scripting languages, access to other documents in a compound document by 
 * reference, navigation to other locations, and timers. The Window object is a 
 * long-standing de facto standard for HTML user agents. However, it should not 
 * be assumed based on this or the name "Window" that it is limited to HTML or 
 * to visual user agents.</p>
 *
 * @module BOM
 * @requires DOMHTML, DOMViews
 *
 * @see http://www.w3.org/TR/Window/
 * @see http://www.w3.org/TR/HTML5/browsers.html
 * @see http://javascript.about.com/od/browserobjectmodel/a/bom01.htm
 */


(function () {

var

/**
 * <p>This object is unusual in that all operations that would be performed on
 * it must be performed on the Window  object of the browsing context's active
 * document instead. <br>
 * It is thus indistinguishable from that Window  object in every way until the
 * browsing context is navigated.A browsing context is an environment in which
 * Document  objects are presented to the user. <br>
 * A tab or window in a Web browser typically contains a browsing context, as
 * does an iframe or frames in a frameset. </p>
 *
 * <p>The WindowProxy  object allows scripts to act as if each browsing context
 * had a single Window  object, while still keeping separate Window  objects
 * for each Document.</p>
 *
 * <p>Each browsing context has a corresponding <code>WindowProxy</code> object.
 * Each Document  has a collection of one or more views.<br>
 * A view is a user agent interface tied to a particular media used for the
 * presentation of a particular Document object in some media.<br>
 * A view may be interactive.
 * Each view is represented by an AbstractView object.</p>
 *
 * @class WindowProxy
 */
WindowProxy;

/**
 * <p>This object defines the global object in a browsing context</p>
 *
 * @class Window
 * @extends AbstractView
 */
function Window () {
    var
    index;
    index = 0;

    /**
     * @property window
     * @type WindowProxy
     */
    this.window = this;

    /**
     * Returns the indicated child browsing context.
     *
     * @property [index]
     * @type WindowProxy
     */
    this[index] = new WindowProxy;

    /**
     * An attribute containing a reference to the topmost Window object in the
     * hierarchy that contains this object.
     *
     * @property top
     * @type WindowProxy
     */
    this.top = new Window();

    /**
     * An attribute containing a reference to Window object that contains this
     * object.
     *
     * @property parent
     * @type WindowProxy
     */
    this.parent = new Window();

    /**
     * @property self
     * @type WindowProxy
     */
    this.self = this;

    /**
     * @property opener
     * @type WindowProxy|null
     */
    this.opener = new Window();

    /**
     * Returns the Element for the browsing context container.
     * Returns null if there isn't one.
     * 
     * @property frameElement
     * @throws {SECURITY_ERR} in cross-origin situations.
     * @type HTMLFrameElement|null
     */
    this.frameElement = new HTMLFrameElement();

    /**
     * Returns true if the location bar is visible; otherwise, returns false.
     *
     * @property locationBar
     * @type BarProp
     */
    this.locationBar = new BarProp();

    /**
     * Returns true if the menu bar is visible; otherwise, returns false.
     *
     * @property menuBar
     * @type BarProp
     */
    this.menuBar = new BarProp();

    /**
     * Returns true if the personal bar is visible; otherwise, returns false.
     *
     * @property personalBar
     * @type BarProp
     */
    this.personalBar = new BarProp();

    /**
     * Returns true if the scroll bars are visible; otherwise, returns false.
     *
     * @property scrollbars
     * @type BarProp
     */
    this.scrollbars = new BarProp();

    /**
     * Returns true if the status bar is visible; otherwise, returns false.
     *
     * @property statusBar
     * @type BarProp
     */
    this.statusBar = new BarProp();

    /**
     * Returns true if the toolbar is visible; otherwise, returns false.
     *
     * @property toolbar
     * @type BarProp
     */
    this.toolbar = new BarProp();

    /**
     * An attribute containing a unique name used to refer to this Window object.
     * 
     * @property name
     * @type String
     */
    this.name = "";

    /**
     * @property navigator
     * @type Navigator
     */
    this.navigator = new Navigator();

    /**
     * @property frames
     * @type FrameList
     */
    this.frames = new FrameList();

    /**
     * @property location
     * @type Location
     */
    this.location = new Location();

    /**
     * @property history
     * @type History
     */
    this.history = new History();

    /**
     * @property document
     * @type Document
     */
    this.document = new Document();

    /**
     * @property screen
     * @type Screen
     */
    this.screen = new Screen();

    /**
     * @property undoManager
     * @type UndoManager
     */
    this.undoManager = new UndoManager();
}

/**
 * the prototype static property
 *
 * @static
 * @property prototype
 * @type AbstractView
 */
Window.prototype = new AbstractView();

/**
 * the constructor property
 *
 * @property constructor
 * @type Function
 * @default Window
 */
Window.prototype.constructor = Window;

/**
 * This method calls the function once after a specified number of milliseconds
 * elapses, until canceled by a call to clearTimeout.
 * The methods returns a timerID which may be used in a subsequent call to
 * clearTimeout to cancel the interval.
 *
 * @method setTimeOut
 * @param {Function|String} func
 * @param {Number}  milliseconds
 * @param {Object} [param0]
 * @return {Number} A reference to this timer
 */
Window.prototype.setTimeout = function (func,  milliseconds, param0) {
    return 0;
};

/**
 * Cancels a timeout that was set with the setTimeout method.
 *
 * @method clearTimeOut
 * @param {Object} timerID
 */
Window.prototype.clearTimeout = function (timerID) {};

/**
 * This method calls the function every time a specified number of milliseconds
 * elapses, until canceled by a call to clearInterval.
 * The methods returns an intervalID which may be used in a subsequent call to
 * clearInterval to cancel the interval.
 *
 * @method setInterval
 * @param {Function|String} func
 * @param {Number}  milliseconds
 * @param {Object} [param0]
 * @return {Number} A reference to this timer
 */
Window.prototype.setInterval = function (func,  milliseconds, param0) {
    return 0;
};

/**
 * Cancels an interval that was set with the setInterval method.
 * 
 * @method clearInterval
 * @param {Object} intervalID
 */
Window.prototype.clearInterval = function (intervalID) {};

/**
 * Displays a modal alert with the given message, and waits for the user to
 * dismiss it.
 * A call to the navigator.yieldForStorageUpdates() method is implied when this
 *  method is invoked.
 *
 * @method alert
 * @param {String} message
 */
Window.prototype.alert = function (message) {};

/**
 * Release the storage mutex and show the given message to the user, and ask the
 * user to respond with a positive or negative response.
 * The user agent must then pause as the method waits for the user's response.
 * If the user responds positively, the method must return true, and if the user
 * responds negatively, the method must return false.
 *
 * @method confirm
 * @param {String} message
 * @return {Boolean}
 */
Window.prototype.confirm = function (message) {
    return true;
};

/**
 * Release the storage mutex and show the given message to the user, and ask the
 * user to either respond with a string value or abort.
 * The user agent must then pause  as the method waits for the user's response.
 * The second argument is optional. If the second argument (default) is present,
 * then the response must be defaulted to the value given by default.
 * If the user aborts, then the method must return null; otherwise, the method
 * must return the string that the user responded with.
 *
 * @method prompt
 * @param {String} message
 * @param {String} value
 * @return {String}
 *
 */
Window.prototype.prompt = function (message, value) {
    return "";
};

/**
 * Prompts the user to print the page.
 *
 * @method print
 *
 */
Window.prototype.print = function () {};

/**
 * Opens a window to show url (defaults to about:blank), and returns it.
 * The target argument gives the name of the new window.
 * If a window exists with that name already, it is reused.
 * The replace attribute, if true, means that whatever page is currently open in
 * that window will be removed from the window's session history.
 * The features  argument is ignored.
 *
 * @method open
 * @param {String} [url] A valid URL for a page to load in the browsing context.
 * If no arguments are provided, or if it is the empty string, then the url
 * argument defaults to "about:blank".
 * @param {String} [target]
 * @param {String} [features]
 * @param {String} [replace]
 * @return {WindowProxy}
 */
Window.prototype.open = function (url, target, features, replace) {};




WindowProxy = Window;





/**
 * <p>To allow Web pages to integrate with Web browsers, certain Web browser
 * interface elements are exposed in a limited way to scripts in Web pages.</p>
 *
 * <p>Each interface element is represented by a BarProp  object.</p>
 *
 * @class BarProp
 *
 */
function BarProp () {

    /**
     * The visible  attribute, on getting, must return either true or a value
     * determined by the user agent to most accurately represent the visibility
     * state of the user interface element that the object represents.
     * On setting, the new value must be discarded.
     * 
     * @property visible
     * @type Boolean
     */
    this.visible = true;
}



/**
 * @class Navigator
 */
function Navigator () {

    /**
     * appCodeName
     * 
     * @property appCodeName
     * @type String
     */
    this.appCodeName = "";
    

    /**
     * Returns either the string "Netscape" or the full name of the browser, e.g. "Mellblom Browsernator"
     * appName     
     * @property appName
     * @type String
     */
    this.appName = "";

    /**
     * Returns either the string "4.0" or a string representing the version of the browser in detail, 
     * e.g. "1.0 (VMS; en-US) Mellblomenator/9000".
     * 
     * @property appVersion
     * @type String
     */
    this.appVersion = "";

    /**
     * The default language of the Usent-Agent. e.g. "en-us"
     * 
     * @property language
     * @type String
     */
    this.language = "";

    /**
     * Return the list of MIME types for which an handler is declared.
     * 
     * @property mimeTypes
     * @type Array
     */
    this.mimeTypes = [];

    /**
     * Return either the empty string or a string representing the platform on which the browser is executing, 
     * e.g. "MacIntel", "Win32", "FreeBSD i386", "WebTV OS".
     * 
     * @property platform
     * @type String
     */
    this.platform = "";

    /**
     * Return the list of installed pluggins.
     * 
     * @property plugins
     * @type PluginArray
     */
    this.plugins = new PluginArray();

    /**
     * Return the string used for the value of the "User-Agent" header in HTTP requests, or the empty string 
     * if no such header is ever sent.
     * 
     * @property userAgent
     * @type String
     */
    this.userAgent = "";
}

/**
 * Check if Java is enabled in the User-Agent
 *
 * @method javaEnabled
 * @return {Boolean}
 */
Navigator.prototype.javaEnabled = function () {
    return true;
};

/**
 * The registerProtocolHandler() method allows Web sites to register themselves as possible handlers 
 * for particular schemes. For example, an online telephone messaging service could register itself 
 * as a handler of the sms: scheme ([RFC5724]), so that if the user clicks on such a link, he is given 
 * the opportunity to use that Web site.
 *
 * @method registerProtocolHandler
 * @param {String} scheme A scheme, such as ftp or sms. The scheme must be compared 
 * in an ASCII case-insensitive manner by user agents for the purposes of comparing 
 * with the scheme part of URLs that they consider against the list of registered handlers.
 * The scheme value, if it contains a colon (as in "ftp:"), will never match anything, 
 * since schemes don't contain colons.
 * @param {String} url A string used to build the URL of the page that will handle the requests.
 * @param {String} title A descriptive title of the handler, which the UA might use to remind the 
 * user what the site in question is.
 */
Navigator.prototype.registerProtocolHandler = function (scheme, url, title) {};

/**
 * The registerContentHandler() method allows Web sites to register themselves as possible handlers 
 * for content in a particular MIME type. For example, the same online telephone messaging service 
 * could register itself as a handler for text/directory files ([RFC2425]), so that if the user has 
 * no native application capable of handling vCards ([RFC2426]), his Web browser can instead suggest 
 * he use that site to view contact information stored on vCards that he opens.
 *
 * @method registerContentHandler
 * @param {String} mimeType A MIME type, such as model/vnd.flatland.3dml or application/vnd.google-earth.kml+xml. 
 * The MIME type must be compared in an ASCII case-insensitive manner by user agents for the purposes of comparing 
 * with MIME types of documents that they consider against the list of registered handlers.
 * @param {String} url A string used to build the URL of the page that will handle the requests.
 * @param {String} title A descriptive title of the handler, which the UA might use to remind the 
 * user what the site in question is.
 */
Navigator.prototype.registerContentHandler = function (mimeType, url, title) {};


/**
 * @class PluginArray
 * @extends Array
 */
function PluginArray () {

    var
    index;
    index = 0;

    /**
     * @property [index]
     * @type Plugin
     */
    this[index] = new Plugin();

    /**
     * @property length
     * @type Number
     */
    this.length = 0;
}

/**
 * refresh
 *
 * @method refresh
 */
PluginArray.prototype.refresh = function () {};



/**
 * @class Plugin
 * @extends Object
 */
function Plugin () {
    var
    index;
    index = 0;

    /**
     * @property [index]
     * @type MimeTypeArray
     */
    this[index] = new MimeTypeArray();

    /**
     * The name of the plugin
     *
     * @property name
     * @type String
     */
    this.name = "";

    /**
     * The name of the plugin
     *
     * @property version
     * @type String
     */
    this.version = "";

    /**
     * The name of the plugin
     *
     * @property description
     * @type String
     */
    this.description = "";

    /**
     * The name of the plugin
     *
     * @property filename
     * @type String
     */
    this.filename = "";

    /**
     * The name of the plugin
     *
     * @property length
     * @type String
     */
    this.length = 0;
}



/**
 * @class MimeTypeArray
 */
function MimeTypeArray(){
    var
    index;
    index = 0;

    /**
     * @property [index]
     * @type MimeType
     */
    this[index] = new MimeType();

    /**
     * @property length
     * @type Number
     */
    this.length = 0;
}




/**
 * @class MimeType
 */
function MimeType () {

    /**
     * type
     *
     * @property type
     * @type String
     */
    this.type = "";

    /**
     * suffixes
     *
     * @property suffixes
     * @type String
     */
    this.suffixes = "";

    /**
     * description
     *
     * @property description
     * @type String
     */
    this.description = "";

    /**
     * enabledPlugin
     *
     * @property enabledPlugin
     * @type Plugin
     */
    this.enabledPlugin = new Plugin();
}




/**
 * @class FrameList
 */
function FrameList () {
    var
    index;
    index = 0;

    /**
     * @property [index]
     * @type Window
     */
    this[index] = new Window();

    /**
     * @property length
     * @type Number
     */
    this.length = 0;

}


/**
 * The Location class is a structure representation of a URL
 *
 * @class Location
 */
function Location () {

    /**
     * Equivalent to document.url
     *
     * @property href
     * @type String
     */
    this.href = "";

    /**
     * The scheme of the URL
     * Example: "http://" or "https://"
     *
     * @property protocol
     * @type String
     */
    this.protocol = "http://";

    /**
     * The port 
     * Example: 80 or 443
     *
     * @property port
     * @type Number
     */
    this.port = 80;

    /**
     * The domain of the URL as defined in the HTTP Host header of the request
     * (with a potential port number).
     * Example: "www.wakandasoftware.com:8080"
     *
     * @property host
     * @type String
     */
    this.host = "";

    /**
     * The domain of the URL.
     * Example: "www.wakandasoftware.com"
     *
     * @property hostname
     * @type String
     */
    this.hostname = "";

    /**
     * The URL-path portion
     * Example: "/images/logo.png"
     *
     *
     * @property pathname
     * @type String
     */
    this.pathname = "";

    /**
     * The querystring of the URL including the question mark "?"
     * Example: "?name=John&age=32"
     * HTTP(s) URLs only
     *
     * @property search
     * @type String
     */
    this.search = "";

    /**
     * The anchor name fragment including the hash mark "#"
     * Example: "#menu2"
     * HTTP(s) URLs only
     *
     * @property hash
     * @type String
     */
    this.hash = "";
}
Location.prototype.constructor = Location;

/**
 * The toString method return the value of the href property
 *
 * @method toString
 * @return {String}
 */
Location.prototype.toString = function () {
    return this.href;
};

/**
 * Reload the current page
 *
 * @method replace
 * @param {String} url
 */
Location.prototype.replace = function (url) {
    this.href = url;
};

/**
 * Reload the current page
 *
 * @method reload
 */
Location.prototype.reload = function () {
    this.href = this.href;
}





/**
 * @class History
 */
function History () {
    var
    index;
    index = 0;
    
    /**
     * @property [index]
     * @type String
     */
    this[index] = "";

    /**
     * @property current
     * @type String
     */
    this.current = "";

    /**
     * @property length
     * @type Number
     */
    this.length = 0;

    /**
     * @property next
     * @type String
     */
    this.next = "";

    /**
     * @property previous
     * @type String
     */
    this.previous = "";
}

/**
 * Load the previous page in the history
 *
 * @method back
 */
History.prototype.back = function back() {};

/**
 * Load the next page in the history
 *
 * @method forward
 */
History.prototype.forward = function forward() {};

/**
 * Load a specific page from the history
 *
 * @method go
 * @param {Number} index Required.
 */
History.prototype.go = function go(index) {};





/**
 * The screen object is a special object for inspecting properties of the screen
 * on which the current window is being rendered.
 *
 * @class screen
 */
function Screen () {

    /**
     * Specifies the y-coordinate of the first pixel that is not allocated to
     * permanent or semipermanent user interface features.
     *
     * @property availTop
     * @type Number
     */
    this.availTop = 0;

    /**
     * Returns the first available pixel available from the left side of the
     * screen.
     *
     * @property availLeft
     * @type Number
     */
    this.availLeft = 0;
    
    /**
     * Specifies the height of the screen, in pixels, minus permanent or 
     * semipermanent user interface features displayed by the operating system, 
     * such as the Taskbar on Windows.
     * 
     * @property availHeight
     * @type Number
     */
    this.availHeight = 0;
    
    /**
     * Returns the amount of horizontal space in pixels available to the window.
     * 
     * @property availWidth
     * @type Number
     */
    this.availWidth = 0;
    
    /**
     * Returns the color depth of the screen.
     * 
     * @property colorDepth
     * @type Number
     */
    this.colorDepth = 0;

    /**
     * Returns the height of the screen in pixels.
     *
     * @property height
     * @type Number
     */
    this.height = 0;

    /**
     * Returns the distance in pixels from the left side of the main screen to
     * the left side of the current screen.
     *
     * @property left
     * @type Number
     */
    this.left = 0;

    /**
     * Returns the distance in pixels from the top side of the current screen.
     *
     * @property pixelDepth
     * @type Number
     */
    this.pixelDepth = 0;

    /**
     * Gets/sets the distance from the top of the screen.
     *
     * @property top
     * @type Number
     */
    this.top = 0;

    /**
     * Returns the width of the screen.
     *
     * @property width
     * @type Number
     */
    this.width = 0;

}



/**
 * Selection
 *
 * @class Selection
 */
function Selection () {

    /**
     * anchorNode
     *
     * @property anchorNode
     * @type Node
     */
    this.anchorNode = new DOMNode();

    /**
     * anchorOffset
     *
     * @property anchorOffset
     * @type Number
     */
    this.anchorOffset = 0;

    /**
     * focusNode
     *
     * @property focusNode
     * @type Node
     */
    this.focusNode = new DOMNode();

    /**
     * focusOffset
     *
     * @property focusOffset
     * @type Number
     */
    this.focusOffset = 0;

    /**
     * isCollapsed
     *
     * @property isCollapsed
     * @type Boolean
     */
    this.isCollapsed = true;

    /**
     * rangeCount
     *
     * @property rangeCount
     * @type Number
     */
    this.rangeCount = 0;
}


/**
 * collapse
 *
 * @method collapse
 * @param {Node} parentNode
 * @param {Number} offset
 */
Selection.prototype.collapse = function (parentNode, offset) {};

/**
 * collapseToStart
 *
 * @method collapseToStart
 */
Selection.prototype.collapseToStart = function () {};

/**
 * collapseToEnd
 *
 * @method collapseToEnd
 */
Selection.prototype.collapseToEnd = function () {};

/**
 * selectAllChildren
 *
 * @method selectAllChildren
 * @param {Node} parentNode
 */
Selection.prototype.selectAllChildren = function (parentNode) {};

/**
 * deleteFromDocument
 *
 * @method deleteFromDocument
 */
Selection.prototype.deleteFromDocument = function () {};

/**
 * getRangeAt
 *
 * @method getRangeAt
 */
Selection.prototype.getRangeAt = function (index) {};

/**
 * addRange
 *
 * @method addRange
 * @param {Range} range
 */
Selection.prototype.addRange = function (range) {};

/**
 * removeRange
 *
 * @method removeRange
 * @param {Range} range
 */
Selection.prototype.removeRange = function (range) {};

/**
 * removeAllRanges
 *
 * @method removeAllRanges
 */
Selection.prototype.removeAllRanges = function () {};



/**
 * UndoManager
 *
 * @class UndoManager
 */
function UndoManager () {
    var
    index;
    index = 0;
    
    /**
     * Returns the entry with index index in the undo history.
     * Returns null if index is out of range.
     *
     * @property [index]
     * @type Object|null
     */
    this[index] = 0;

    /**
     * Returns the number of entries in the undo history.
     *
     * @property length
     * @type Number
     */
    this.length = 0;

    /**
     * Returns the number of the current entry in the undo history.
     * (Entries at and past this point are redo entries.)
     *
     * @property position
     * @type Number
     */
    this.position= 0;
}

/**
 * Returns the entry with index index in the undo history.
 * Returns null if index is out of range.
 *
 * @method item
 * @param {Number} index
 * @return {Object|null}
 */
UndoManager.prototype.item = function item(index) {
    return new Object;
};

/**
 * Adds the specified entry to the undo history.
 *
 * @method add
 * @param {Object} data
 * @param {String} title
 * @return {Object|null}
 */
UndoManager.prototype.add = function add(data, title) {
    return new Object;
};

/**
 * Removes the specified entry to the undo history.
 *
 * @method remove
 * @throws {DOMException} INDEX_SIZE_ERR if the given index is out of range.
 * @param {Number} index
 */
UndoManager.prototype.remove = function remove(index) {
    var
    error;
    error = new DOMException();
    error.code = DOMException.INDEX_SIZE_ERR;
    throw error;
};

/**
 * Removes all entries before the current position in the undo history.
 *
 * @method clearUndo
 */
UndoManager.prototype.clearUndo = function clearUndo() {};

/**
 * Removes all entries at and after the current position in the undo history.
 *
 * @method clearRedo
 */
UndoManager.prototype.clearRedo = function clearRedo() {};




window = new Window();


}());

top = window.top;
parent = window.parent;
self = window.self;
opener = window.opener;
navigator = window.navigator;
frames = window.frames;
location = window.location;
history = window.history;
document = window.document;
screen = screen.frames;
undoManager = window.undoManager;

setTimeout = window.setTimeout;
setInterval = window.setInterval;
clearTimeout = window.clearTimeout;
clearInterval = window.clearInterval;
alert = window.alert;
confirm = window.confirm;
prompt = window.prompt;
print = window.print;
open = window.open;