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
 * <p>Web applications should have the ability to manipulate as wide as possible
 * a range of user input, including files that a user may wish to upload to a
 * remote server or manipulate inside a rich web application. The File API
 * specification defines the basic representations for files, lists of files,
 * errors raised by access to files, and programmatic ways to read files.
 * The interfaces and API defined in this specification can be used with other
 * interfaces and APIs exposed to the web platform.</p>
 *
 * <p>File reads should happen asynchronously on the main thread, with an
 * optional synchronous API used within threaded web applications. An
 * asynchronous API for reading files prevents blocking and UI "freezing" on a
 * user agent's main thread. This specification defines an asynchronous API
 * based on an <em>event model</em> to read and access a file's data. Moreover,
 * this specification defines separate interfaces for <em>files</em> and the
 * objects used to <em>read</em> a file's data. While a <code>File</code> object
 * provides a reference to a single file that a user has selected from a file
 * picker (typically spawned by the HTML input element), a
 * <code>FileReader</code> object provides asynchronous read methods to access
 * that file's data through event handler attributes and the firing of events.
 * The use of events and event handlers allows separate code blocks the ability
 * to monitor the <em>progress of the read</em> (which is useful for remote
 * drives that appear to be local, but behave slower than local drives), error
 * conditions that may arise, and successful reading of a file. An example will
 * be illustrative.</p>
 *
 * <pre name="code" class="js">
 * function startRead() {
 * &nbsp;   // obtain input element through DOM
 * &nbsp;
 * &nbsp;   var file = document.getElementById('file').files[0];
 * &nbsp;   if(file){
 * &nbsp;       getAsText(file);
 * &nbsp;   }
 * }
 * &nbsp;
 * function getAsText(readFile) {
 * &nbsp;
 * &nbsp;   var reader = new FileReader();
 * &nbsp;
 * &nbsp;   // Read file into memory as UTF-16
 * &nbsp;   reader.readAsText(readFile, "UTF-16");
 * &nbsp;
 * &nbsp;   // Handle progress, success, and errors
 * &nbsp;   reader.onprogress = updateProgress;
 * &nbsp;   reader.onload = loaded;
 * &nbsp;   reader.onerror = errorHandler;
 * }
 * &nbsp;
 * function updateProgress(evt) {
 * &nbsp;   if (evt.lengthComputable) {
 * &nbsp;       // evt.loaded and evt.total are ProgressEvent properties
 * &nbsp;       var loaded = (evt.loaded / evt.total);
 * &nbsp;       if (loaded &lt; 1) {
 * &nbsp;           // Increase the prog bar length
 * &nbsp;           // style.width = (loaded * 200) + "px";
 * &nbsp;       }
 * &nbsp;   }
 * }
 * &nbsp;
 * function loaded(evt) {
 * &nbsp;   // Obtain the read file data
 * &nbsp;   var fileString = evt.target.result;
 * &nbsp;   // Handle UTF-16 file dump
 * &nbsp;   if(utils.regexp.isChinese(fileString)) {
 * &nbsp;       //Chinese Characters + Name validation
 * &nbsp;   }
 * &nbsp;   else {
 * &nbsp;       // run other charset test
 * &nbsp;   }
 * &nbsp;   // xhr.send(fileString)
 * }
 * &nbsp;
 * function errorHandler(evt) {
 * &nbsp;   if(evt.target.error.code == evt.target.error.NOT_READABLE_ERR) {
 * &nbsp;       // The file could not be read
 * &nbsp;   }
 * }
 * </pre>
 *
 * @module File
 * @see http://www.w3.org/TR/FileAPI/
 */

"use strict";

/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true */

/**
 * The File class
 *
 * @class File
 * @extends Blob
 */
function File() {

    /**
     * The name of the file, without path information.
     * 
     * @property name
     * @type String
     */
    this.name = '';

    /**
     * The media type of the file. If it cannot be determined, it returns an
     * empty string
     *
     * @property type
     * @type String
     * @default ""
     */
    this.type = '';

    /**
     * The URN (URL) representing the File object.
     *
     * @property urn
     * @type String
     */
    this.urn = '';
}


/**
 * The prototype of the File Object is a Blob
 *
 * @static 
 * @property prototype
 * @type Blob
 */
File.prototype = new Blob();


/**
 * The File constructor
 *
 * @property constructor
 * @type Object
 * @default File
 */
File.prototype.constructor = File;  






/**
 * <p>Asynchronously return strings</p>
 *
 * <p>All its three methods raise FileException</p>
 *
 * @class FileReader
 * @extends Object
 * 
 * @constructor
 * @param {File | String} file
 * @return {String}
 */
function FileReader(file) {

    /**
     * <p>The FileReader object can be in one of 3 states.
     * The readyState attribute, on getting, return the current state, which is
     * one of the following values:</p>
     *
     * <dl>
     *   <dt>EMPTY (numeric value 0)</dt>
     *   <dd>The object has been constructed, and there are no pending reads.</dd>
     *   <dt>LOADING (numeric value 1)</dt>
     *   <dd>A file is being read. One of the read methods is being processed.</dd>
     *   <dt>DONE (numeric value 2)</dt>
     *   <dd>The entire file has been read into memory, or a file error occurred
     *   during read, or the read was aborted using abort().
     *   The <code>FileReader</code> is no longer reading a file.</dd>
     * </ul>
     *
     * @property readyState
     * @type Number
     */
    this.readyState = 0;

    /**
     * <p>On getting, the <code>result</code> attribute returns a file's data in 
     * string format, or <code>null</code>, depending on the read method that has
     * been called  on the <code>FileReader</code> object, and any errors that 
     * may have occurred.</p>
     *
     * <p>It can also return <em>partial file data</em>.</p>
     *
     * <p>Partial file data is the part of the file that has been read into memory
     * currently during processing one of the two read methods, 
     * <code>readAsBinaryString</code> and <code>readAsText</code>.</p>
     *
     * <ul>
     *   <li>On getting, if the <code>readyState</code> is EMPTY (no read method 
     *   has been called) then the <code>result</code> attribute return 
     *   <code>null</code>.</li>
     *
     *   <li>On getting, if an error in reading the file has occurred (using any
     *   read method), then the <code>result</code> attribute return 
     *   <code>null</code>.</li>
     *
     *   <li>On getting, if the <code>readAsDataURL</code> read method is used, 
     *   the <code>result</code> attribute returns a Data URL encoding of the 
     *   file's data.</li>
     *   
     *   <li>On getting, if the <code>readAsBinaryString</code> read method is
     *   called (and no  error in  reading the file has occurred), then the 
     *   <code>result</code> attribute return a  string representing the file's
     *   data as a binary string, in which every byte is represented by an 
     *   integer in the range [0..255]. On getting, while processing the 
     *   <code>readAsBinaryString</code> read method, the <code>result</code
     *   attribute return <em>partial file data</em> in binary string format.</li>
     *
     *   <li>On getting, if the <code>readAsText</code> read method is called 
     *   (and no error in reading the file has occurred), then the 
     *   <code>result</code> attribute return a string representing the file's 
     *   data as a text string, and decode the string in memory in the format 
     *   specified by the encoding determination. On getting, while processing 
     *   the <code>readAsText</code> read method, this attibute return <em>partial
     *   file data</em> in the format specified by the encoding determination.</li>
     * </ul>
     *
     * @property result
     * @type BinaryString|String|Null
     */
    this.result = '';
}


/**
 * readAsBinaryString
 *
 * @method readAsBinaryString
 * @throws FileException
 * @param {File} fileBlob Required.
 */
FileReader.prototype.readAsBinaryString = function (fileBlob) {
    throw new FileException();
};

/**
 * readAsDataURL
 *
 * @method readAsDataURL
 * @throws FileException
 * @param {File} file Required.
 */
FileReader.prototype.readAsDataURL = function (file) {
    throw new FileException();
};

/**
 * readAsText
 *
 * @method readAsText
 * @throws FileException
 * @param {Blob} fileBlob Required.
 * @param {Boolean} [encoding]
 */
FileReader.prototype.readAsText = function (fileBlob, encoding) {
    throw new FileException();
};







/**
 * <p>Synchronously return strings</p>
 *
 * <p>All its three methods raise FileException</p>
 *
 * @class FileReaderSync
 * @extends Object
 *
 * @constructor
 * @param {File | String} file
 */
function FileReaderSync(file) {

}

/**
 * readAsBinaryString
 *
 * @method readAsBinaryString
 * @throws FileException
 * @param {File} fileBlob Required.
 */
FileReaderSync.prototype.readAsBinaryString = function (fileBlob) {
    throw new FileException();
};

/**
 * readAsDataURL
 *
 * @method readAsDataURL
 * @throws FileException
 * @param {File} file Required.
 */
FileReaderSync.prototype.readAsDataURL = function (file) {
    throw new FileException();
};

/**
 * readAsText
 *
 * @method readAsText
 * @throws FileException
 * @param {Blob} fileBlob Required.
 * @param {String} [encoding]
 */
FileReaderSync.prototype.readAsText = function (fileBlob, encoding) {
    throw new FileException();
};




/**
 *
 * @class FileList
 * @extends Object
 */
function FileList() {
    var index;
    this[index] = new File();
    this.length = 0;
}


/**
 * @class Blob
 * @extends Object
 *
 */
function Blob() {
    /**
     * @property size
     * @type Number
     */
    this.size = 0;
}

/**
 * slice
 *
 * @method slice
 * @param {Number} start
 * @param {Number} lengh
 */
Blob.prototype.slice = function(start, length) {};




/**
 *
 * @class FileError
 * @extends Error
 */
FileError = function FileError() {

    var code;

    /**
     * <p>The constants of the FileError error code which is the most appropriate
     * from those :
     * <dl>
     *   <dt>From DOMException</dt>
     *   <dd>
     *     <dl>
     *       <dt>NOT_FOUND_ERR</dt>
     *       <dd>8</dd>
     *       <dt>SECURITY_ERR</dt>
     *       <dd>18</dd>
     *       <dt>ABORT_ERR</dt>
     *       <dd>20</dd>
     *     </dl>
     *   </dd>
     *   <dt>Added by this specification</dt>
     *   <dd>
     *     <dl>
     *       <dt>NOT_READABLE_ERR</dt>
     *       <dd>24</dd>
     *       <dt>ENCODING_ERR</dt>
     *       <dd>26</dd>
     *     </dl>
     *   </dd>
     * </dl></p>
     *
     * <p><strong>ReadOnly</strong></p>
     *
     * @property code
     * @type Number
     */
    this.code = {
        valueOf: function () {
            return code;
        }
    };

}

/**
 *
 *
 * @class FileException
 * @extends FileError
 */
FileException = FileError;