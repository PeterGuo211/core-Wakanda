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
 * Studio API
 *
 * @module Studio
 * 
 * @see http://getfirebug.com/wiki/index.php/Crossfire_Protocol_Reference
 */

/**
 * class Studio
 *
 * @class Studio
 */
function Studio(contextId) {};
Studio.name = "Studio";

/**
 * <p>Set status to true to manage the edit menu</p>
 *
 * @method editCommandHandling
 * @param {Boolean} status
 */
Studio.prototype.editCommandHandling = function (status) {};
Studio.prototype.editCommandHandling.name = [Studio.name, "_", "editCommandHandling"].join("");

/**
 * <p>Undo</p>
 *
 * @method doUndo
 */
Studio.prototype.doUndo = function () {};
Studio.prototype.doUndo.name = [Studio.name, "_", "doUndo"].join("");

/**
 * <p>Redo</p>
 *
 * @method doRedo
 */
Studio.prototype.doRedo = function () {};
Studio.prototype.doRedo.name = [Studio.name, "_", "doRedo"].join("");

/**
 * <p>Cut</p>
 *
 * @method doCut
 */
Studio.prototype.doCut = function () {};
Studio.prototype.doCut.name = [Studio.name, "_", "doCut"].join("");

/**
 * <p>Copy</p>
 *
 * @method doCopy
 */
Studio.prototype.doCopy = function () {};
Studio.prototype.doCopy.name = [Studio.name, "_", "doCopy"].join("");

/**
 * <p>Paste</p>
 *
 * @method doPaste
 * @param {String} clipboardContent
 */
Studio.prototype.doPaste = function (clipboardContent) {};
Studio.prototype.doPaste.name = [Studio.name, "_", "doPaste"].join("");

/**
 * <p>Clear</p>
 *
 * @method doClear
 */
Studio.prototype.doClear = function () {};
Studio.prototype.doClear.name = [Studio.name, "_", "doClear"].join("");

/**
 * <p>SelectAll</p>
 *
 * @method doSelectAll
 */
Studio.prototype.doSelectAll = function () {};
Studio.prototype.doSelectAll.name = [Studio.name, "_", "doSelectAll"].join("");

/**
 * <p>Set "true" or "false" as parameter to specify if there is data specific to the editor
 * in the clipboard.</p>
 *
 * <p>Return a string of characters "1" and "0" meaning the state of each actions of the edit menu
 * in this order: undo, redo, cut, copy, paste, clear, selectAll</p>
 *
 * <p>Example : If the editor return "0011100", it means that undo, redo, clear, and selectAll
 * are disabled in the menu, while cut, copy, and paste are enabled</p> 
 *
 * @method getEditMenuStatus
 * @param {Boolean} clipboardAvailable
 * @return {String}
 */
Studio.prototype.getEditMenuStatus = function (clipboardAvailable) {};
Studio.prototype.getEditMenuStatus.name = [Studio.name, "_", "getEditMenuStatus"].join("");

/**
 * <p>catalog</p>
 *
 * @method catalog
 */
Studio.prototype.catalog = function () {};
Studio.prototype.catalog.name = [Studio.name, "_", "catalog"].join("");

/**
 * <p>mainPage</p>
 *
 * @method mainPage
 */
Studio.prototype.mainPage = function () {};
Studio.prototype.mainPage.name = [Studio.name, "_", "mainPage"].join("");

/**
 * <p>runProject</p>
 *
 * @method runProject
 */
Studio.prototype.runProject = function () {};
Studio.prototype.runProject.name = [Studio.name, "_", "runProject"].join("");

/**
 * <p>debugProject</p>
 *
 * @method debugProject
 */
Studio.prototype.debugProject = function () {};
Studio.prototype.debugProject.name = [Studio.name, "_", "debugProject"].join("");


/**
 * <p>runFile</p>
 *
 * @method runFile
 */
Studio.prototype.runFile = function () {};
Studio.prototype.runFile.name = [Studio.name, "_", "runFile"].join("");


/**
 * <p>debugFile</p>
 *
 * @method debugFile
 */
Studio.prototype.debugFile = function () {};
Studio.prototype.debugFile.name = [Studio.name, "_", "debugFile"].join("");
