/**
 *
 * 
 *
 * @class BLOB
 * @extends Object
 *
 */
Blob = function Blob() {
    
    
    /**
     * 
     *
     * @property type
     * @attributes 
     * @type String
     */
    this.type =  ''; 
    
    /**
     * returns the size of the Blob expressed in bytes
     *
     * @property size
     * @attributes ReadOnly
     * @type Number
     */
    this.size =  0; 
    
    
    /**
     * returns a Buffer object containing a copy of the Blob bytes
     *
     * @method toBuffer
     * @return {Buffer}
     */
    this.toBuffer = function toBuffer() {        return new Buffer( );     };
    
    /**
     * creates a new Blob object by referencing the contents of the bytes of the Blob to which it is applied, from start to end
     *
     * @method slice
     * @param {Number} start
     * @param {Number} end
     * @param {String} mimeType
     * @return {Blob}
     */
    this.slice = function slice(start, end, mimeType) {        return new Blob( );     };
    
    /**
     * get a string representation of the Blob contents
     *
     * @method toString
     * @param {String} stringFormat
     * @return {String}
     */
    this.toString = function toString(stringFormat) {        return '';     };
    
    /**
     * copies the Blob referenced in the BLOB object (the source object) into the specified destination file
     *
     * @method copyTo
     * @param {File | String} destination
     * @param {Boolean | String} overwrite
     */
    this.copyTo = function copyTo(destination, overwrite) {             };
    

};

