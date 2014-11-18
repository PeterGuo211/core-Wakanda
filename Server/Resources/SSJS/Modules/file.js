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
 * <p>The File module provides interface with the File system</p>
 * 
 * <p>The File object is nearly compatible with the W3C File Object (still miss
 * the <code>urn</code> and <code>type</code> properties)</p>
 * 
 * <p>TODO: <ul>
 *   <li>W3C File API compliance:<ul>
 *     <li><code>FileList</code> should be implemented (and a
 *     <code>FolderList</code> created).</li>
 *     <li><code>FileError</code> and <code>FileException</code> could be easily
 *     implemented</li>
 *     <li><code>FileReaderSync</code> could be easily implemented</li>
 *     <li><code>FileReader</code> may also be implemented with simulated events (as
 *     done with XMLHttpRequest)</li>
 *   </ul></li>
 *   <li>W3C File System API recommendations<ul>
 *     <li>MUST enable appending to a file</li>
 *     <li>SHOULD enable copying directories</li>
 *     <li>SHOULD enable moving directories</li>
 *     <li>MUST handle text encoding conversion when reading and writing to file 
 *     (at least UTF-8 and UTF-16 LE/BE).</li> 
 *     <li>MAY support reading and writing in Base64 (or using data: URLs)</li>
 *     <li>should support events for detecting the mounting/unmounting of a file 
 *     system (e.g. to detect a memory card being plugged in)</li>
 *     <li>must support listing the available file systems</li>
 *     <li>should provide access to a temporary storage location (a form of /tmp directory)</li>
 *     <li>must support listing the available file systems</li>
 *   </ul></li>
 * </ul></p>
 *
 * <p>Example:</p>
 *
 * <pre name="code" class="js">
 * var list = [];
 * var myFolder = Folder('c:/myFolder/');
 * myFolder.forEachFolder(
 * &nbsp;   function (subFolder) {
 * &nbsp;       if ((subFolder.modificationDate + this.ms) > +(new Date())) {
 * &nbsp;           list.push(subFolder);
 * &nbsp;       }
 * &nbsp;   },
 * &nbsp;   {ms: 42}
 * );
 * </pre>
 *
 *
 * @module File
 * @see http://www.w3.org/TR/FileAPI/
 * @see http://www.w3.org/TR/file-upload/
 * @see http://www.w3.org/TR/dap-api-reqs/#file-system
 * @see http://wiki.4d.fr/techdoc/?q=node/212
 */

/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true */

// "use strict";

var Folder, File, TextStream, BinaryString


(function () {



/**
 * <p>The Folder function return a Folder instance. It is not yet callable as a
 * constructor.</p>
 *
 * <p><em>BUG: The Folder function doesn't return valid folder instance at for
 * Volume root folders (ex: "c:/")</em></p>
 *
 * @class Folder
 *
 * @constructor
 * @param {String} path Required.
 */
Folder = function (path) {

    /**
     * The name of the folder, without path information.
     *
     * @property name
     * @attributes Writable
     * @type String
     */
    this.name = '';

    /**
     * <p>The URN (URL) representing the Folder object.</p>
     *
     * <p>TODO: create this property from the <code>getURL()</code> method</p>
     *
     * @property urn
     * @attributes ReadOnly
     * @type String
     *
     * @todo create this property from the <code>getURL()</code> method
     */
    this.urn = '';

    /**
     * The read only property of the folder
     *
     * @property readOnly
     * @attributes Writable
     * @type Boolean
     */
    this.readOnly = false;

    /**
     * The visibility property of the folder
     * 
     * @property visible
     * @attributes Writable
     * @type Boolean
     */
    this.visible = true;

    /**
     * True if the File exists at the defined path
     *
     * @property exists
     * @attributes ReadOnly
     * @type Boolean
     */
    this.exists = true;
    
    /**
     * The date of the last modification of the folder.
     * This value can be modified
     *
     * @property modificationDate
     * @attributes Writable
     * @type Date
     */
    this.modificationDate = new Date();

    /**
     * The date of the creation of the folder.
     * This value can be modified
     *
     * @property creationDate
     * @attributes Writable
     * @type Date
     */
    this.creationDate = new Date();

    /**
     * The folder in which is stored the current folder
     *
     * @property parent
     * @attributes ReadOnly
     * @type Folder
     */
    this.parent = '';

    /**
     * The files in which are stored in the current folder
     *
     * @property files
     * @type FileList
     *
     * @deprecated Not yet implemented
     */
    this.files = '';

    /**
     * The sub-folders of the current folder
     *
     * @property folders
     * @type FolderList
     *
     * @deprecated Not yet implemented
     */
    this.folders = '';

    /**
     * The path where is stored the folder
     *
     * @property path
     * @attributes ReadOnly
     * @type String
     */
    this.path = '';
}

/**
 * <p>Copy the current Folder into another Folder</p>
 *
 * <p>TODO: NOT IMPLEMENTED. It should also return the current Folder instance</p>
 *
 * @method copyTo
 * @param {Folder|String} dest Required. The destination Folder, URL, or Path
 * @param {Boolean|String} [overwrite]
 *
 * @todo NOT IMPLEMENTED
 */
Folder.prototype.copyTo = function (dest, overwrite) {};

/**
 * <p>Move the current File into another File</p>
 *
 * <p>TODO: NOT IMPLEMENTED. It should also return the current Folder instance</p>
 *
 * @method moveTo
 * @param {String} path Required.
 *
 * @todo NOT IMPLEMENTED
 */
Folder.prototype.moveTo = function (path) {};

/**
 * <p>Create a Folder at the path specified via the constructor</p>
 *
 * <p>TODO: It should also return the current Folder instance</p>
 *
 * @method create
 */
Folder.prototype.create = function () {};

/**
 * Remove the folder and all its contents
 *
 * @method remove
 */
Folder.prototype.remove = function () {};

/**
 * Remove the folder and all its contents
 *
 * @method drop
 *
 * @deprecated Use the <code>remove</code> method instead
 */
Folder.prototype.drop = function () {};

/**
 * <p>Remove the content of the folder</p>
 *
 * <p>TODO: It should also return the current Folder instance</p>
 *
 * @method removeContent
 */
Folder.prototype.removeContent = function () {};

/**
 * Remove the content of the folder
 *
 * @method dropContent
 *
 * @deprecated Should be renamed <code>removeContent</code>
 */
Folder.prototype.dropContent = function () {};

/**
 * True if the Folder exists on the volume
 *
 * @method exists
 * @return {Boolean}
 *
 * @deprecated Should use the <code>exists</code> property instead
 */
Folder.prototype.exists = function () {
    return true;
};

/**
 * Return the first file found is the folder
 *
 * @method firstFile
 * @return {File}
 *
 * @todo should be replaced by <code>Folder.files.first()</code> where the
 * <code>files</code> property would be a FileList instance
 */
Folder.prototype.firstFile = function () {
    return File();
};

/**
 * Return the first sub-folder found is the folder
 *
 * @method firstFolder
 * @return {Folder}
 *
 * @todo should be replaced by <code>Folder.folders.first()</code> where
 * the <code>files</code> property would be a FileList instance
 */
Folder.prototype.firstFolder = function () {
    return Folder();
};

/**
 * <p><code>callbackfn</code> should be a function that accepts three arguments.
 * <code>forEach</code> calls <code>callbackfn</code> once for each file
 * present in the folder, in ascending order. <code>callbackfn</code> is
 * called only for  files of the folder which actually exist; it is not
 * called for missing (removed) files of the folder.</p>
 *
 * <p>If a <code>thisArg</code> parameter is provided, it will be used as the
 * <code>this</code> value for each invocation of <code>callbackfn</code>. If it
 * is not provided, <code>undefined</code> is used instead.</p>
 *
 * <p><code>callbackfn</code> is called with three arguments: the file, the
 * index of the file, and the folder being traversed.</p>
 *
 * <p><code>forEach</code> does not directly mutate the object on which it is
 * called but the object may be mutated by the calls to <code>callbackfn</code>.
 * </p>
 *
 * <p>If existing files of the folder are changed, their value as passed to
 * callback will be the value at the time <code>forEach</code> visits them;
 * files that are deleted after the call to <code>forEach</code> begins and
 * before being visited are not visited.</p>
 *
 * <pre name="code" class="js">
 * var list = [];
 * var myFolder = Folder('c:/myFolder/');
 * myFolder.forEachFile(
 * &nbsp;   function (file) {
 * &nbsp;       if ((file.lastModifiedDate + this.ms) > +(new Date())) {
 * &nbsp;           list.push(file);
 * &nbsp;       }
 * &nbsp;   },
 * &nbsp;   {ms: 42}
 * );
 * </pre>
 *
 * @method forEachFile
 * @param {Function} callbackfn Required. The handler can have 3 parameters: the
 * current file, the index of the current file in the folder, and the folder
 * @param {Object} [thisArg] The token object which will be binded to
 * <code>this</code> in the handler
 *
 * @todo should be replaced by <code>Folder.files.forEach()</code> with
 * the <code>forEach</code> as defined for <code>Array.prototype</code>
 */
Folder.prototype.forEachFile = function (callbackfn, thisArg) {};

/**
 * <p><code>callbackfn</code> should be a function that accepts three arguments.
 * <code>forEach</code> calls <code>callbackfn</code> once for each sub-folder 
 * present in the folder, in ascending order. <code>callbackfn</code> is 
 * called only for  sub-folders of the folder which actually exist; it is not 
 * called for missing (removed) sub-folder of the folder.</p>
 *
 * <p>If a <code>thisArg</code> parameter is provided, it will be used as the
 * <code>this</code> value for each invocation of <code>callbackfn</code>. If it
 * is not provided, <code>undefined</code> is used instead.</p>
 *
 * <p><code>callbackfn</code> is called with three arguments: the sub-folder,
 * the index of the sub-folder, and the folder being traversed.</p>
 *
 * <p><code>forEach</code> does not directly mutate the object on which it is
 * called but the object may be mutated by the calls to <code>callbackfn</code>.
 * </p>
 *
 * <p>If existing sub-folders of the folder are changed, their value as passed
 * to callback will be the value at the time <code>forEach</code> visits them;
 * sub-folders that are deleted after the call to <code>forEach</code> begins
 * and before being visited are not visited.</p>
 *
 * <pre name="code" class="js">
 * var list = [];
 * var myFolder = Folder('c:/myFolder/');
 * myFolder.forEachFolder(
 * &nbsp;   function (subFolder) {
 * &nbsp;       if ((subFolder.modificationDate + this.ms) > +(new Date())) {
 * &nbsp;           list.push(subFolder);
 * &nbsp;       }
 * &nbsp;   },
 * &nbsp;   {ms: 42}
 * );
 * </pre>
 *
 * @method forEachFolder
 * @param {Function} callbackfn Required. The handler can have 3 parameters: the
 * current sub-folder, the index of the current sub-folder in the folder, and
 * the folder
 * @param {Object} [thisArg] The token object which will be binded to
 * <code>this</code> in the handler
 *
 * @todo should be replaced by <code>Folder.folders.forEach()</code> with
 * the <code>forEach</code> as defined for <code>Array.prototype</code>
 */
Folder.prototype.forEachFolder = function (callbackfn, thisArg) {};


/**
 * <p>Execute the handler for each files and sub-folder included in the folder and
 * its subfolder recursively</p>
 *
 * <p><code>callbackfn</code> should be a function that accepts three arguments.
 * <code>parse</code> calls <code>callbackfn</code> once for each sub-folder
 * present in the folder, in ascending order. <code>callbackfn</code> is
 * called only for  sub-folders of the folder which actually exist; it is not
 * called for missing (removed) sub-folder of the folder.</p>
 *
 * <p>If a <code>thisArg</code> parameter is provided, it will be used as the
 * <code>this</code> value for each invocation of <code>callbackfn</code>. If it
 * is not provided, <code>undefined</code> is used instead.</p>
 *
 * <p><code>callbackfn</code> is called with three arguments: the sub-folder,
 * the index of the sub-folder, and the folder being traversed.</p>
 *
 * <p><code>parse</code> does not directly mutate the object on which it is
 * called but the object may be mutated by the calls to <code>callbackfn</code>.
 * </p>
 *
 * <p>If existing sub-folders or files of the folder are changed, their value as
 * passed to callback will be the value at the time <code>parse</code> visits them;
 * sub-folders and files that are deleted after the call to <code>parse</code> begins
 * and before being visited are not visited.</p>
 *
 * <pre name="code" class="js">
 * var list = [];
 * var myFolder = Folder('c:/myFolder/');
 * myFolder.parse(
 * &nbsp;   function (item) {
 * &nbsp;       if ((item.modificationDate + this.ms) > +(new Date())) {
 * &nbsp;           list.push(item);
 * &nbsp;       }
 * &nbsp;   },
 * &nbsp;   {ms: 42}
 * );
 * </pre>
 *
 * @method parse
 * @param {Function} callbackfn Required. The handler can have 3 parameters: the
 * current sub-folder, the index of the current sub-folder in the folder, and
 * the folder
 * @param {Object} [thisArg] The token object which will be binded to
 * <code>this</code> in the handler
 */
Folder.prototype.parse = function (callbackfn, thisArg) {};

/**
 * Return the size of the free space available on the volume where the folder
 * is stored
 *
 * @method getFreeSpace
 * @param {Boolean} [withQuota] If true the size is the the one available from
 * the allowed quota (default: <value>false</value>)
 * @return {Number}
 */
Folder.prototype.getFreeSpace = function (withQuota) {
    return 0;
};

/**
 * getName
 *
 * @method getName
 * @param {Boolean|String} [withExtension]
 * @return {String}
 *
 * @deprecated use the <code>name</code> or  <code>nameNoExt</code> property instead
 */
Folder.prototype.getName = function (withExtension) {
    return '';
};

/**
 * getParent
 *
 * @method getParent
 * @return {Folder}
 *
 * @deprecated use the <code>parent</code> property instead
 */
Folder.prototype.getParent = function () {
    return Folder();
};

/**
 * getPath
 *
 * @method getPath
 * @return {String}
 *
 * @deprecated use the <code>path</code> property instead
 */
Folder.prototype.getPath = function () {
    return '';
};

/**
 * getSize
 *
 * @method getSize
 * @return {Number}
 *
 * @deprecated use the <code>size</code> property instead
 */
Folder.prototype.getSize = function () {
    return 0;
};

/**
 * <p>getURL</p>
 *
 * <p>should be replaced by the <code>urn</code> property</p>
 *
 * @method getURL
 * @return {String}
 *
 * @todo should be replaced by the <code>urn</code> property
 */
Folder.prototype.getURL = function () {
    return '';
};

/**
 * Return the size of the volume where the folder is stored
 *
 * @method getVolumeSize
 * @return {Number}
 */
Folder.prototype.getVolumeSize = function () {
    return 0;
};

/**
 * isReadOnly
 *
 * @method isReadOnly
 * @return {Boolean}
 *
 * @deprecated use the <code>readOnly</code> property instead
 */
Folder.prototype.isReadOnly = function () {
    return true;
};

/**
 * isVisible
 *
 * @method isVisible
 * @return {Boolean}
 *
 * @deprecated use the <code>visible</code> property instead
 */
Folder.prototype.isVisible = function () {
    return true;
};


/**
 * @method next
 * @return {Boolean}
 */
Folder.prototype.next = function () {
    return true;
};

/**
 * setName
 *
 * @method setName
 * @param {String} name Required.
 *
 * @deprecated use the <code>name</code> or  <code>nameNoExt</code> property instead
 */
Folder.prototype.setName = function (name) {};

/**
 * setReadOnly
 *
 * @method setReadOnly
 * @param {Boolean|String} readonly
 *
 * @deprecated use the <code>readOnly</code> property instead
 */
Folder.prototype.setReadOnly = function (readonly) {};

/**
 * setVisible
 *
 * @method setVisible
 * @param {Boolean|String} visible
 *
 * @deprecated use the <code>visible</code> property instead
 */
Folder.prototype.setVisible = function (visible) {};

/**
 * @method valid
 * @return {Boolean}
 */
Folder.prototype.valid = function () {
    return true;
};



/**
 * Description of File objects
 *
 * Creates a File object
 *
 * @class File
 *
 * @constructor
 * @param {String} path Required. The path or the URN of the file
 */
File = function (path) {

    /**
     * The name of the file, without path information.
     *
     * @property name
     * @attributes Writable
     * @type String
     */
    this.name = '';

    /**
     * The name of the file, without path information and without the main extension
     *
     * @property nameNoExt
     * @attributes Writable
     * @type String
     */
    this.nameNoExt = '';

    /**
     * The extension of the file name
     *
     * @property extension
     * @attributes Writable
     * @type String
     */
    this.extension = '';

    /**
     * The parent folder of the file.
     *
     * @property parent
     * @attributes ReadOnly
     * @type Folder
     */
    this.parent = '';

    /**
     * The readOnly property of the file
     *
     * @property readOnly
     * @attributes Writable
     * @type Boolean
     */
    this.readOnly = false;

    /**
     * The visibility property of the file
     *
     * @property visible
     * @attributes Writable
     * @type Boolean
     */
    this.visible = true;

    /**
     * The date of the last modification of the file
     * This value can be modified
     *
     * @property lastModifiedDate
     * @attributes Writable
     * @type Date
     */
    this.lastModifiedDate = new Date();

    /**
     * The date of the creation of the file
     * This value can be modified
     *
     * @property creationDate
     * @attributes ReadOnly
     * @type Date
     */
    this.creationDate = new Date();

    /**
     * True if the File exists at the defined path
     *
     * @property exists
     * @attributes ReadOnly
     * @type Boolean
     */
    this.exists = true;

    /**
     * Represents the size of the file in bytes.
     *
     * @property size
     * @attributes ReadOnly
     * @type Number
     */
    this.size = 0;

    /**
     * The media type of the file.
     * If it cannot be determined, it returns an empty string
     *
     * @property type
     * @attributes Writable
     * @type String
     * @default ""
     *
     * @todo To create. Useful to fix the Content-Type HTTP header when sending
     * a file. Better W3C API compliance.
     */
    this.type = '';

    /**
     * The URN (URL) representing the File object.
     *
     * @property urn
     * @attributes ReadOnly
     * @type String
     *
     * @todo create this property from the <code>getURL()</code> method
     */
    this.urn = '';

    /**
     * The full path of the File object.
     *
     * @property path
     * @attributes ReadOnly
     * @type String
     */
    this.path = '';
}

/**
 * <p>Copy the current File into another File</p>
 *
 * <p>TODO: It should return the current File instance.</p>
 *
 * @method copyTo
 * @param {File|String} dest
 * @param {Boolean|String} [overwrite]
 */
File.prototype.copyTo = function (dest, overwrite) {};

/**
 * <p>Move the current File into another File</p>
 *
 * <p>TODO: It should return the current File instance.</p>
 *
 * @method moveTo
 * @param {String} path Required.
 */
File.prototype.moveTo = function (path) {};

/**
 * <p>Create the File at the path specified to the constructor</p>
 *
 * <p>TODO: It should return the current File instance.</p>
 *
 * @method create
 */
File.prototype.create = function () {};

/**
 * Remove the file
 *
 * @method remove
 */
File.prototype.remove = function () {};

/**
 * Remove the file
 *
 * @method drop
 *
 * @deprecated Use the <code>remove</code> method instead.
 */
File.prototype.drop = function () {};

/**
 * exists
 *
 * @method exists
 * @type Boolean
 *
 * @deprecated use the <code>exits</code> property instead
 */
File.prototype.exists = function () {
    return true;
};

/**
 * getExtension
 *
 * @method getExtension
 * @return {String}
 *
 * @deprecated use the <code>extension</code> property instead
 */
File.prototype.getExtension = function () {
    return '';
};

/**
 * <p>Return the size of the free space available on the volume where the file
 * is stored</p>
 *
 * <p>TODO: It could be replaced by <code>volume.freeSpace</code> and
 * <code>freeQuota</code></p>
 *
 * @method getFreeSpace
 * @param {Boolean} [withQuota] If true the size is the the one available from
 * the allowed quota (default: <value>false</value>)
 * @return {Number}
 */
File.prototype.getFreeSpace = function (withQuota) {
    return 0;
};

/**
 * getName
 *
 * @method getName
 * @param {Boolean|String} [withExtension]
 * @return {String}
 *
 * @deprecated use the <code>name</code> or  <code>nameNoExt</code> property instead
 */
File.prototype.getName = function (withExtension) {
    return '';
};

/**
 * getParent
 *
 * @method getParent
 * @return {Folder}
 *
 * @deprecated use the <code>parent</code> property instead
 */
File.prototype.getParent = function () {
    return Folder();
};

/**
 * getPath
 *
 * @method getPath
 * @return {String}
 *
 * @deprecated use the <code>path</code> property instead
 */
File.prototype.getPath = function () {
    return '';
};

/**
 * getSize
 *
 * @method getSize
 * @return {Number}
 *
 * @deprecated use the <code>size</code> property instead
 */
File.prototype.getSize = function () {
    return 0;
};

/**
 * getURL
 *
 * @method getURL
 * @return {String}
 *
 * @todo should be replaced by the <code>urn</code> property
 */
File.prototype.getURL = function () {
    return '';
};

/**
 * <p>Return the size of the volume where the file is stored</p>
 *
 * <p>TODO: It could be replaced by <code>volume.size</code></p>
 *
 * @method getVolumeSize
 * @return {Number}
 */
File.prototype.getVolumeSize = function () {
    return 0;
};

/**
 * isReadOnly
 *
 * @method isReadOnly
 * @return {Boolean}
 *
 * @deprecated use the <code>readOnly</code> property instead
 */
File.prototype.isReadOnly = function () {
    return true;
};

/**
 * isVisible
 *
 * @method isVisible
 * @return {Boolean}
 *
 * @deprecated use the <code>visible</code> property instead
 */
File.prototype.isVisible = function () {
    return true;
};

/**
 * <p>Go to the next file in the current file parent folder (or FileList)</p>
 *
 * <p>TODO: It should return the new current File instance if valid or false
 * otherwise</p>
 *
 * @method next
 * @return {Boolean}
 */
File.prototype.next = function () {
    return true;
};

/**
 * setName
 *
 * @method setName
 * @param {String} name Required.
 *
 * @deprecated use the <code>name</code> or <code>nameNoExt</code> property
 * instead
 */
File.prototype.setName = function (name) {};

/**
 * setReadOnly
 *
 * @method setReadOnly
 * @param {Boolean|String} readonly The value can be "ReadOnly" (true), or
 * "ReadWrite" (false)
 *
 * @deprecated use the <code>readOnly</code> property instead
 */
File.prototype.setReadOnly = function (readonly) {};

/**
 * setVisible
 *
 * @method setVisible
 * @param {Boolean|String} visible
 *
 * @deprecated use the <code>visible</code> property instead
 */
File.prototype.setVisible = function (visible) {};

/**
 * <p>slice ??</p>
 *
 * <p>TODO: It should also return the current Folder instance</p>
 *
 * @method slice
 * @param {Number} start
 * @param {Number} length
 *
 * @todo NOT IMPLEMENTED
 */
File.prototype.slice = function (start, length) {};

/**
 * <p>Return false if the file object doesn't refer to a File. This happens when
 * using the <code>next()</code> on the last file of a folder</p>
 *
 * @method valid
 * @return {Boolean}
 */
File.prototype.valid = function () {
    return true;
};

/**
 * <p>Return the content of the file as text</p>
 *
 *
 * @method loadText
 * @return {String}
 */
File.prototype.loadText = function () {
    return "";
};

/**
 * <p>Save text into the file</p>
 *
 * @method saveText
 * @param {String} text
 */
File.prototype.saveText = function (text) {};





/**
 * Stream can be used to parse binary files
 *
 * @class BinaryStream
 * @extends FileStream
 *
 * @constructor
 * @param {File|String} file Required. The file is identified by a Path or an URL
 * @param {String} readMode Required. This value can be "Read" or "ReadWrite"
 */
BinaryStream = function (file, readMode) {};
BinaryStream.prototype = FileStream();
BinaryStream.prototype.constructor = Stream;

/**
 * @method changeByteOrder
 */
BinaryStream.prototype.changeByteOrder = function () {};

/**
 * @method getByte
 * @return {Number}
 */
BinaryStream.prototype.getByte = function () {
    return 0;
};

/**
 * @method getLong
 * @return {Number}
 */
BinaryStream.prototype.getLong = function () {
    return 0;
};

/**
 * @method getLong64
 * @type Number
 */
BinaryStream.prototype.getLong64 = function () {
    return 0;
};

/**
 * @method getReal
 * @return {Number}
 */
BinaryStream.prototype.getReal = function () {
    return 0;
};

/**
 * @method getString
 * @return {Number}
 */
BinaryStream.prototype.getString = function () {
    return '';
};

/**
 * @method getWord
 * @return {Number}
 */
BinaryStream.prototype.getWord = function () {
    return 0;
};

/**
 * @method isByteSwapping
 * @return {Boolean}
 */
BinaryStream.prototype.isByteSwapping = function () {
    return false;
};

/**
 * @method putByte
 * @param {Number} byteValue Required.
 */
BinaryStream.prototype.putByte = function (byteValue) {};

/**
 * @method putLong
 * @param {Number} longValue Required.
 */
BinaryStream.prototype.putLong = function (longValue) {};

/**
 * @method putLong64
 * @param {Number} long64Value Required.
 */
BinaryStream.prototype.putLong64 = function (long64Value) {};

/**
 * @method putReal
 * @param {Number} realValue Required.
 */
BinaryStream.prototype.putReal = function (realValue) {};

/**
 * @method putString
 * @param {Number} stringValue Required.
 */
BinaryStream.prototype.putString = function (stringValue) {};

/**
 * @method putWord
 * @param {Number} wordValue Required.
 */
BinaryStream.prototype.putWord = function (wordValue) {};




/**
 * TextStream can be used to parse binary files
 *
 * @class TextStream
 * @extends FileStream
 *
 * @constructor
 * @param {File|String} textFile Required. The file is identified by a Path or an URL
 * @param {String} readMode Required. This value can be "Read" or "ReadWrite"
 */
TextStream = function (textFile, readMode) {};
TextStream.prototype = FileStream();
TextStream.prototype.constructor = TextStream;

/**
 * <p>Read some characters in the file and return them in as a string value</p>
 *
 * <p>If the parameter is a Number equal to 0, all the contant of the file is
 * returned as text</p>
 *
 * <p>If the parameter is a Number greater than 0, this number of character will
 * be returned and the internal cursor position will be updated</p>
 *
 * <p>If the parameter is a String, it is used as delimiter. The method return
 * all the characters of the file from the current position untill it find the
 * delimiter string (which is  not returned). The internal cursor position is
 * then set after the found delimiter</p>
 *
 * @method read
 * @param {Number|String} nbCharsOrDelimiter
 * @return {String}
 */
TextStream.prototype.read = function (nbCharsOrDelimiter) {};

/**
 * Write some text in the file at the current position
 * 
 * @method write
 * @param {String} text Required.
 *
 * @todo should return the <code>TextStream</code> instance
 */
TextStream.prototype.write = function (text) {};




/**
 *
 * @private
 * @class FileStream
 */
var FileStream = function () {

    /**
     * The size of the file
     *
     * @property length
     * @type Number
     */
    this.length = 0;

}

/**
 * Close the reading Stream
 *
 * @method close
 */
FileStream.prototype.close = function () {};

/**
 * @method getPos
 * @return {Number}
 *
 * @todo may be replaced by a <code>position</code> property
 */
FileStream.prototype.getPos = function () {
    return 0;
};

/**
 * Return the current size of the file in memory which might be different of
 * the physical size while some data is still in the buffer
 *
 * @method getSize
 * @return {Number}
 *
 * @todo Use the <code>size</code> property instead
 */
FileStream.prototype.getSize = function () {
    return 0;
};

/**
 * @method setPos
 * @param {Number} offset Required.
 *
 * @todo may be replaced by a <code>position</code> property
 */
FileStream.prototype.setPos = function (offset) {};

/**
 * @method end
 * @result {Boolean}
 *
 * @todo may be replaced by a <code>end</code> property
 */
FileStream.prototype.end = function () {
    return true;
};





/**
 * <p>The FileList W3C API is an interface to a sequence parameterized type
 * which exposes a list of files</p>
 *
 * <p>NOT YET IMPLEMENTED</p>
 *
 * <pre name="code" class="js">
 * var file = Folder('c:/myFolder').files[0];
 * &nbsp;
 * if (file) {
 * &nbsp;   // Perform file ops
 * }
 * </pre>
 *
 * @class FileList
 *
 * @todo Not impremented
 */
function FileList() {
    var
    index;

    /**
     * A FileList is iterable in a for loop
     *
     * @property [index]
     * @type File
     */
    this[index] = new File();

    /**
     * The number of iterable selected files
     *
     * @property length
     * @type Number
     */
    this.length = 0;
}

/**
 * Return the first file found is the FileList
 *
 * @method first
 * @return {File}
 *
 * @todo Not impremented
 */
FileList.prototype.first = function () {
    return File();
};

/**
 * Return the first file found is the FileList
 *
 * @method next
 * @return {Boolean}
 *
 * @todo Not impremented
 */
FileList.prototype.next = function () {
    return false;
};

/**
 * Call a function for each file in the current folder
 *
 * <pre name="code" class="js">
 * var list = [];
 * var myFolder = Folder('c:/myFolder/');
 * myFolder.files.forEach(
 * &nbsp;   function (file) {
 * &nbsp;       if ((file.lastModifiedDate + this.ms) > +(new Date())) {
 * &nbsp;           list.push(file);
 * &nbsp;       }
 * &nbsp;   },
 * &nbsp;   {ms: 42}
 * );
 * </pre>
 *
 * @method forEach
 * @param {Function} func
 * @param {Object|Null|Undefined} [token]
 *
 * @todo Not impremented
 */
FileList.prototype.forEach = function (func, token) {};

}());
