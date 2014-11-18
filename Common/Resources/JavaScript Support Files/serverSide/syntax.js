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
 * SyntaxAnalyser
 * 
 * @private
 * @module SyntaxAnalyser
 */


/**
 * <p>LanguageSyntaxTester</p>
 *
 * @private
 * @class LanguageSyntaxTester
 * @extends Object
 */
function LanguageSyntaxTester() {

    /**
     * <p>This method returns an object (a collection of Strings) that could be iterated the following way</p>
     *
     * <pre name="code" class="js">
     * var allCompletions, aCompletion, i, len;
     * &nbsp;
     * allCompletions = _syntaxTester.getCompletions(symbolTablePath, input, line, sourceFilePath);
     * &nbsp;
     * for (i = 0, len = allCompletions.getResultCount(); i < len; i++) {
     * &nbsp;   aCompletion = allCompletions.getResult(i);
     * &nbsp;   // use the result
     * }
     * </pre>
     *
     * @method getCompletions
     * @param {String} symbolTablePath Required. The full system path of the project's SymbolTable.waSym file 
     * @param {String} input Required. A sequence of characters meant to be entered by the user then auto-completed 
     * @param {Number} line Required. The line number (in the source file) where the input String is supposed to be inserted
     * @param {String} sourceFilePath Required. The full system path of the JavaScript source file used as a context for the auto-completion mechanism
     * @return {LanguageSyntaxTesterCompletionResults}
     */
    this.getCompletions = function getCompletions(symbolTablePath, input, line, sourceFilePath) {
        return new LanguageSyntaxTesterCompletionResults();
    };
    

    /**
     * <p>getSyntaxColoring</p>
     *
     * @method getSyntaxColoring
     * @param {String} type Required. The language which syntax is analyzed (ex: "js") 
     * @param {String} input Required. A string in the specified language 
     * @return {Array} Array of LanguageSyntaxTesterColorResults objects
     */
    this.getSyntaxColoring = function getSyntaxColoring(type, input) {
        return [new LanguageSyntaxTesterColorResults()];
    };
}



/**
 * <p>This object gives acces to a list of propositions for code autocompletion</p>
 *
 *
 * @private
 * @class LanguageSyntaxTesterCompletionResults
 * @extends Object
 */
function LanguageSyntaxTesterCompletionResults() {

    /**
     * The number of propositions for the autocompletion
     *
     * @method getResultCount
     * @return {Number}
     */
    this.getResultCount = function() {
        return 0;
    };

    /**
     * One of the propositions for the autocompletion 
     *
     * @method getResult
     * @param {Number} index
     * @return {String}
     */
    this.getResult = function(index) {
        return "";
    };
}

/**
 * <p>LanguageSyntaxTesterColorResults</p>
 *
 * @private
 * @class LanguageSyntaxTesterColorResults
 * @extends Object
 */
function LanguageSyntaxTesterColorResults() {

    /**
     * The position of the substring in the string
     *
     * @method getOffset
     * @return {Number}
     */
    this.getOffset = function() {
        return 0;
    };

    /**
     * The length of the substring
     *
     * @method getLength
     * @return {Number}
     */
    this.getLength = function() {
        return 0;
    };

    /**
     * The type code of the substring
     *
     * @method getStyle
     * @return {Number}
     */
    this.getStyle = function() {
        return 0;
    };
}