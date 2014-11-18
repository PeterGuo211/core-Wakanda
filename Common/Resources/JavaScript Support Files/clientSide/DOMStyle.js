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
 * DOM Style
 * CSS
 *
 * @module DOMStyle
 * @requires DOMCore, DOMViews, JavaScriptCore
 *
 * @see http://www.w3.org/TR/DOM-Level-2-Style/
 */


/**
 * StyleSheet
 *
 * @class StyleSheet
 * @extends Object
 **/
function StyleSheet () {
    
    /**
     * type
     * 
     * @property type
     * @type String
     */
    this.type = "";
    
    /**
     * disabled
     *
     * @property disabled
     * @type Boolean
     */
    this.disabled = false;
    
    /**
     * ownerNode
     *
     * @property ownerNode
     * @type Node
     */
    this.ownerNode = new Node();
    
    /**
     * parentStyleSheet
     *
     * @property parentStyleSheet
     * @type StyleSheet
     */
    this.parentStyleSheet = new StyleSheet();
    
    /**
     * href
     *
     * @property href
     * @type String
     */
    this.href = "";
    
    /**
     * title
     *
     * @property title
     * @type String
     */
    this.title = "";
    
    /**
     * media
     *
     * @property media
     * @type MediaList
     */
    this.media = new MediaList();
}



/**
 * StyleSheetList
 *
 * @class StyleSheetList
 * @extends Object
 **/
function StyleSheetList () {
    var
    index;
    index = 0;
    
    /**
     * [index]
     *
     * @property [index]
     * @type StyleSheet
     */
    this[index] = new StyleSheet();
    
    /**
     * length
     *
     * @property length
     * @type Number
     */
    this.length = 0;
}

/**
 * item
 *
 * @method item
 * @param {Number} index
 * @return {StyleSheet} 
 */
StyleSheetList.prototype.item = function item(index) {
    return new StyleSheet();
};



/**
 * MediaList
 *
 * @class MediaList
 * @extends Object
 **/
function MediaList () {
    var
    index;
    index = 0;
    
    /**
     * [index]
     *
     * @property [index]
     * @type String
     */
    this[index] = "";
    
    /**
     * mediaText
     *
     * @property mediaText
     * @type String
     */
    this.mediaText = "";
    
    /**
     * length
     *
     * @property length
     * @type Number
     */
    this.length = 0;
}

/**
 * item
 *
 * @method item
 * @param {Number} index
 * @return String
 */
MediaList.prototype.item = function item(index) {
    return "";
};

/**
 * deleteMedium
 *
 * @method deleteMedium
 * @throw DOMException
 * @param {String} oldMedium
 */
MediaList.prototype.deleteMedium = function deleteMedium(oldMedium) {
    throw new DOMException();
};

/**
 * appendMedium
 *
 * @method appendMedium
 * @throw DOMException
 * @param {String} newMedium
 */
MediaList.prototype.appendMedium = function appendMedium(newMedium) {
    throw new DOMException();
};



/**
 * CSSStyleSheet
 *
 * @class CSSStyleSheet
 * @extends StyleSheet
 **/
function CSSStyleSheet () {
    
    /**
     * ownerRule
     *
     * @property ownerRule
     * @type CSSRule
     */
    this.ownerRule = new CSSRule();
    
    /**
     * cssRules
     *
     * @property cssRules
     * @type CSSRuleList
     */
    this.cssRules = new CSSRuleList();
}
CSSStyleSheet.prototype = new StyleSheet();
CSSStyleSheet.prototype.constructor = CSSStyleSheet;

/**
 * insertRule
 *
 * @method insertRule
 * @throw DOMException
 * @param {String} rule
 * @param {Number} index
 */
CSSStyleSheet.prototype.insertRule = function insertRule(rule, index) {
    throw new DOMException();
    return 0;
};

/**
 * deleteRule
 *
 * @method deleteRule
 * @throw DOMException
 * @param {Number} index
 */
CSSStyleSheet.prototype.deleteRule = function deleteRule(index) {
    throw new DOMException();
};


/**
 * CSSRuleList
 *
 * @class CSSRuleList
 * @extends Object
 **/
function CSSRuleList () {
    var
    index;
    index = 0;
    
    /**
     * [index]
     *
     * @property [index]
     * @type CSSRule
     */
    this[index] = new CSSRule();
    
    /**
     * length
     *
     * @property length
     * @type Number
     */
    this.length = 0;
}

/**
 * item
 *
 * @method item
 * @param {Number} index
 * @return {CSSRule}
 */
CSSRuleList.prototype.item = function (index) {
    return new CSSRule();
};



/**
 * CSSRule
 *
 * @class CSSRule
 * @extends Object
 **/
function CSSRule () {
    
    /**
     * type
     *
     * @property type
     * @type Number
     */
    this.type = 0;
    
    /**
     * cssText
     *
     * @property cssText
     * @type String
     */
    this.cssText = "";
    
    /**
     * parentStyleSheet
     *
     * @property parentStyleSheet
     * @type CSSStyleSheet
     */
    this.parentStyleSheet = new CSSStyleSheet();
    
    /**
     * parentRule
     *
     * @property parentRule
     * @type CSSRule
     */
    this.parentRule = new CSSRule();
}
CSSRule.UNKNOWN_RULE = 0;
CSSRule.STYLE_RULE = 1;
CSSRule.CHARSET_RULE = 2;
CSSRule.IMPORT_RULE = 3;
CSSRule.MEDIA_RULE = 4;
CSSRule.FONT_FACE_RULE = 5;
CSSRule.PAGE_RULE = 6;





/**
 * @class CSSStyleRule
 **/
function CSSStyleRule () {
    this.selectorText = "";
    this.style = new CSSStyleDeclaration();
}
CSSStyleRule.prototype = new CSSRule();
CSSStyleRule.prototype.constructor = CSSStyleRule;





/**
 * @class CSSMediaRule
 **/
function CSSMediaRule () {
    this.media = new MediaList();
    this.cssRules = new CSSRuleList();
}
CSSMediaRule.prototype = new CSSRule();
CSSMediaRule.prototype.constructor = CSSMediaRule;
/**
 * @param {String} rule
 * @param {Number} index
 */
CSSMediaRule.prototype.deleteMedium = function (rule, index) {
    throw new DOMException();
    return 0;
};
/**
 * @param {Number} index
 */
CSSMediaRule.prototype.appendMedium = function (index) {
    throw new DOMException();
};






/**
 * @class CSSFontFaceRule
 **/
function CSSFontFaceRule () {
    this.style = new CSSStyleDeclaration();
}
CSSFontFaceRule.prototype = new CSSRule();
CSSFontFaceRule.prototype.constructor = CSSFontFaceRule;





/**
 * @class CSSPageRule
 **/
function CSSPageRule () {
    this.selectorText = "";
    this.style = new CSSStyleDeclaration();
}
CSSPageRule.prototype = new CSSRule();
CSSPageRule.prototype.constructor = CSSPageRule;





/**
 * @class CSSImportRule
 **/
function CSSImportRule () {
    this.href = "";
    this.media = new MediaList();
    this.styleSheet = new CSSStyleRule();
}
CSSImportRule.prototype = new CSSRule();
CSSImportRule.prototype.constructor = CSSImportRule;





/**
 * @class CSSCharsetRule
 **/
function CSSCharsetRule () {
    this.encoding = "";
}
CSSCharsetRule.prototype = new CSSRule();
CSSCharsetRule.prototype.constructor = CSSCharsetRule;





/**
 * @class CSSUnknownRule
 **/
function CSSUnknownRule () {}
CSSUnknownRule.prototype = new CSSRule();
CSSUnknownRule.prototype.constructor = CSSUnknownRule;




/**
 * @class CSSStyleDeclaration
 **/
function CSSStyleDeclaration () {
    var
    index;
    index = 0;
    /**
     * @property [index]
     * @type String
     */
    this[index] = "";
    this.cssText = "";
    this.length = 0;
    this.parentRule = new CSSRule();
}
CSSStyleDeclaration.prototype = new CSSRule();
CSSStyleDeclaration.prototype.constructor = CSSStyleDeclaration;

/**
 * getPropertyValue
 *
 * @method getPropertyValue
 * @param {String} propertyName
 * @return {String}
 */
CSSStyleDeclaration.prototype.getPropertyValue = function (propertyName) {
    return "";
};

/**
 * getPropertyCSSValue
 *
 * @method getPropertyCSSValue
 * @param {String} propertyName
 * @return {CSSValue}
 */
CSSStyleDeclaration.prototype.getPropertyCSSValue = function (propertyName) {
    return new CSSValue();
};

/**
 * removeProperty
 *
 * @method removeProperty
 * @throw {DOMException}
 * @param {String} propertyName
 * @return {String}
 */
CSSStyleDeclaration.prototype.removeProperty = function (propertyName) {
    throw new DOMException();
    return "";
};

/**
 * getPropertyPriority
 *
 * @method getPropertyPriority
 * @param {String} propertyName
 * @return {String}
 */
CSSStyleDeclaration.prototype.getPropertyPriority = function (propertyName) {
    return "";
};

/**
 * setProperty
 *
 * @method setProperty
 * @throw {DOMException}
 * @param {String} propertyName
 * @param {String} value
 * @param {String} priority
 */
CSSStyleDeclaration.prototype.setProperty = function (propertyName, value, priority) {
    throw new DOMException();
};

/**
 * item
 *
 * @method item
 * @param {Number} index
 * @return {String} 
 */
CSSStyleDeclaration.prototype.item = function (index) {
    return "";
};





/**
 * @class CSSValue
 **/
function CSSValue () {
    this.cssText = "";
    this.cssValueType = 0;
}
CSSValue.CSS_INHERIT = 0;
CSSValue.CSS_PRIMITIVE_VALUE = 1;
CSSValue.CSS_VALUE_LIST = 2;
CSSValue.CSS_CUSTOM = 3;





/**
 * @class CSSPrimitiveValue
 **/
function CSSPrimitiveValue () {
    this.primitiveType = 0;
}
CSSStyleDeclaration.prototype = new CSSRule();
CSSStyleDeclaration.prototype.constructor = CSSPrimitiveValue;
CSSPrimitiveValue.CSS_UNKNOWN = 0;
CSSPrimitiveValue.CSS_NUMBER = 1;
CSSPrimitiveValue.CSS_PERCENTAGE = 2;
CSSPrimitiveValue.CSS_EMS = 3;
CSSPrimitiveValue.CSS_EXS =  4;
CSSPrimitiveValue.CSS_PX = 5;
CSSPrimitiveValue.CSS_CM = 6;
CSSPrimitiveValue.CSS_MM = 7;
CSSPrimitiveValue.CSS_IN = 8;
CSSPrimitiveValue.CSS_PT = 9;
CSSPrimitiveValue.CSS_PC = 10;
CSSPrimitiveValue.CSS_DEG = 11;
CSSPrimitiveValue.CSS_RAD = 12;
CSSPrimitiveValue.CSS_GRAD = 13;
CSSPrimitiveValue.CSS_MS = 14;
CSSPrimitiveValue.CSS_S = 15;
CSSPrimitiveValue.CSS_HZ = 16;
CSSPrimitiveValue.CSS_KHZ = 17;
CSSPrimitiveValue.CSS_DIMENSION = 18;
CSSPrimitiveValue.CSS_STRING = 19;
CSSPrimitiveValue.CSS_URI = 20;
CSSPrimitiveValue.CSS_INDENT = 21;
CSSPrimitiveValue.CSS_ATTR = 22;
CSSPrimitiveValue.CSS_COUNTER = 23;
CSSPrimitiveValue.CSS_RECT = 24;
CSSPrimitiveValue.CSS_RGBCOLOR = 25;
/**
 * @param {Number} unitType
 * @param {Float} floatValue
 */
CSSStyleDeclaration.prototype.setFloatValue = function (unitType, floatValue) {
    throw new DOMException();
};
/**
 * @param {Number} unitType
 */
CSSStyleDeclaration.prototype.getFloatValue = function (unitType) {
    throw new DOMException();
    return new Float();
};
/**
 * @param {Number} stringType
 * @param {String} stringValue
 */
CSSStyleDeclaration.prototype.setStringValue = function (stringType, stringValue) {
    throw new DOMException();
};
CSSStyleDeclaration.prototype.getStringValue = function () {
    throw new DOMException();
    return "";
};
CSSStyleDeclaration.prototype.getCounterValue = function () {
    throw new DOMException();
    return new Counter();
};
CSSStyleDeclaration.prototype.getRectValue = function () {
    throw new DOMException();
    return new Rect();
};
CSSStyleDeclaration.prototype.getRGBColorValue = function () {
    throw new DOMException();
    return new RGBColor();
};



/**
 * @class CSSValueList
 **/
function CSSValueList () {
    var
    index;
    index = 0;
    /**
     * @property [index]
     * @type StyleSheet
     */
    this[index] = new CSSValue();
    this.length = 0;
}
/**
 * @param {Number} index
 */
CSSValueList.prototype.item = function (index) {
    return new CSSValue();
};




/**
 * @class RGBColor
 **/
function RGBColor () {
    this.red = new CSSPrimitiveValue();
    this.green = new CSSPrimitiveValue();
    this.blue = new CSSPrimitiveValue();
}




/**
 * @class Rect
 **/
function Rect () {
    this.top = new CSSPrimitiveValue();
    this.right = new CSSPrimitiveValue();
    this.bottom = new CSSPrimitiveValue();
    this.left = new CSSPrimitiveValue();
}




/**
 * @class Counter
 **/
function Counter () {
    this.identifier = "";
    this.listStyle = "";
    this.separator = "";
}




/**
 * @class ViewCSS
 **/
function ViewCSS () {}
ViewCSS.prototype = new AbstractView();
ViewCSS.prototype.constructor = ViewCSS;
/**
 * @param {Element} elt
 * @param {String} pseudoElt
 */
ViewCSS.prototype.getComputedStyle = function (elt, pseudoElt) {
    return new CSSStyleDeclaration();
};




/**
 * @class DocumentCSS
 **/
function DocumentCSS () {}
DocumentCSS.prototype = new DocumentStyle();
DocumentCSS.prototype.constructor = DocumentCSS;
/**
 * @param {Element} elt
 * @param {String} pseudoElt
 */
DocumentCSS.prototype.getOverrideStyle = function (elt, pseudoElt) {
    return new CSSStyleDeclaration();
};




/**
 * @class DOMImplementationCSS
 **/
function DOMImplementationCSS () {}
DOMImplementationCSS.prototype = new DOMImplementation();
DOMImplementationCSS.prototype.constructor = DOMImplementationCSS;
/**
 * @param {String} title
 * @param {String} media
 */
DOMImplementationCSS.prototype.createCSSStyleSheet = function (title, media) {
    throw new DOMException();
    return new CSSStyleSheet();
};






/**
 * @class ElementCSSInlineStyle
 **/
function ElementCSSInlineStyle () {
    this.style = new CSSStyleDeclaration();
}





/**
 * @class CSS2Properties
 **/
function CSS2Properties () {
    this.azimuth = "";
    this.background = "";
    this.backgroundAttachment = "";
    this.backgroundColor = "";
    this.backgroundImage = "";
    this.backgroundPosition = "";
    this.backgroundRepeat = "";
    this.border = "";
    this.borderCollapse = "";
    this.borderColor = "";
    this.borderSpacing = "";
    this.borderStyle = "";
    this.borderTop = "";
    this.borderRight = "";
    this.borderBottom = "";
    this.borderLeft = "";
    this.borderTopColor = "";
    this.borderRightColor = "";
    this.borderBottomColor = "";
    this.borderLeftColor = "";
    this.borderTopStyle = "";
    this.borderRightStyle = "";
    this.borderBottomStyle = "";
    this.borderLeftStyle = "";
    this.borderTopWidth = "";
    this.borderRightWidth = "";
    this.borderBottomWidth = "";
    this.borderLeftWidth = "";
    this.bottom = "";
    this.captionSide = "";
    this.clear = "";
    this.clip = "";
    this.color = "";
    this.content = "";
    this.counterIncrement = "";
    this.counterReset = "";
    this.cue = "";
    this.cueAfter = "";
    this.cueBefore = "";
    this.cursor = "";
    this.direction = "";
    this.display = "";
    this.elevation = "";
    this.emptyCells = "";
    this.cssFloat = "";
    this.font = "";
    this.fontFamily = "";
    this.fontSize = "";
    this.fontSizeAdjust = "";
    this.fontStretch = "";
    this.fontStyle = "";
    this.fontVariant = "";
    this.fontWeight = "";
    this.height = "";
    this.left = "";
    this.letterSpacing = "";
    this.lineHeight = "";
    this.listStyle = "";
    this.listStyleImage = "";
    this.listStylePosition = "";
    this.listStylePosition = "";
    this.listStyleType = "";
    this.margin = "";
    this.marginTop = "";
    this.marginRight = "";
    this.marginBottom = "";
    this.marginLeft = "";
    this.markerOffset = "";
    this.marks = "";
    this.maxHeight = "";
    this.maxWidth = "";
    this.orphans = "";
    this.outline = "";
    this.outlineColor = "";
    this.outlineStyle = "";
    this.outlineWidth = "";
    this.overflow = "";
    this.padding = "";
    this.paddingTop = "";
    this.paddingRight = "";
    this.paddingBottom = "";
    this.paddingLeft = "";
    this.page = "";
    this.pageBreakAfter = "";
    this.pageBreakBefore = "";
    this.pageBreakInside = "";
    this.pause = "";
    this.pauseAfter = "";
    this.pauseBefore = "";
    this.pitch = "";
    this.pitchRange = "";
    this.playDuring = "";
    this.position = "";
    this.quotes = "";
    this.richness = "";
    this.right = "";
    this.size = "";
    this.speak = "";
    this.speakHeader = "";
    this.speakNumeral = "";
    this.speakPunctuation = "";
    this.speechRate = "";
    this.stress = "";
    this.tableLayout = "";
    this.textAlign = "";
    this.textDecoration = "";
    this.textIndent = "";
    this.textShadow = "";
    this.textTransform = "";
    this.top = "";
    this.unicodeBidi = "";
    this.verticalAlign = "";
    this.visibility = "";
    this.voiceFamily = "";
    this.volume = "";
    this.whiteSpace = "";
    this.widows = "";
    this.width = "";
    this.wordSpacing = "";
    this.zIndex = "";
}