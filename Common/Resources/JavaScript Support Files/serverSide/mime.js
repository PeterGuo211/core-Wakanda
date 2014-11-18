/**
 *
 * 
 *
 * @class MIME
 * @extends Object
 *
 */
MIMEMessagePart = function MIMEMessagePart() {
    
    
    /**
     * 
     *
     * @property asBlob
     * @attributes ReadOnly
     * @type Blob
     */
    this.asBlob =  new Blob( ); 
    
    /**
     * 
     *
     * @property asPicture
     * @attributes ReadOnly
     * @type Image | Undefined
     */
    this.asPicture =  new Image( ) || new Undefined( ); 
    
    /**
     * 
     *
     * @property asText
     * @attributes ReadOnly
     * @type String | Undefined
     */
    this.asText =  '' || new Undefined( ); 
    
    /**
     * 
     *
     * @property size
     * @attributes ReadOnly
     * @type Number
     */
    this.size =  0; 
    
    /**
     * 
     *
     * @property mediaType
     * @attributes ReadOnly
     * @type String
     */
    this.mediaType =  ''; 
    
    /**
     * returns the name of the uploaded file
     *
     * @property fileName
     * @attributes ReadOnly
     * @type String
     */
    this.fileName =  ''; 
    
    /**
     * 
     *
     * @property name
     * @attributes ReadOnly
     * @type String
     */
    this.name =  ''; 
    
    
    /**
     * saves the body of the part in the file whose path is passed in filePath
     *
     * @method save
     * @param {String} filePath
     * @param {Boolean} overWrite
     */
    this.save = function save(filePath, overWrite) {             };
    

};


MIMEMessage = function MIMEMessage() {
    
    
    /**
     * 
     *
     * @property [n]
     * @attributes ReadOnly
     * @type MIMEMessagePart
     */
    this[n] =  new MIMEMessagePart( ); 
    
    /**
     * 
     *
     * @property encoding
     * @attributes ReadOnly
     * @type String
     */
    this.encoding =  ''; 
    
    /**
     * 
     *
     * @property count
     * @attributes ReadOnly
     * @type Number
     */
    this.count =  0; 
    
    /**
     * 
     *
     * @property boundary
     * @attributes ReadOnly
     * @type String
     */
    this.boundary =  ''; 
    
    /**
     * 
     *
     * @property length
     * @attributes 
     * @type Number
     */
    this.length =  0; 
    
    
    /**
     * returns the MIME message as a Buffer object
     *
     * @method toBuffer
     */
    this.toBuffer = function toBuffer() {             };
    
    /**
     * returns the MIME message as a Blob object
     *
     * @method toBlob
     * @param {String} mimeType
     * @return {Blob}
     */
    this.toBlob = function toBlob(mimeType) {        return new Blob( );     };
    

};


MIMEWriter = function MIMEWriter() {
    
    
    
    /**
     * adds a new part to the MIME message being written
     *
     * @method addPart
     * @param {String | Blob | Image} part
     * @param {String} name
     * @param {String} mimeType
     */
    this.addPart = function addPart(part, name, mimeType) {             };
    
    /**
     * converts the MIMEWriter current object to a valid [#title id&#61;&quot;3543&quot;/] object
     *
     * @method getMIMEMessage
     * @return {MIMEMessage}
     */
    this.getMIMEMessage = function getMIMEMessage() {        return new MIMEMessage( );     };
    
    /**
     * returns the boundary string used to delimit each MIME message part
     *
     * @method getMIMEBoundary
     * @return {String}
     */
    this.getMIMEBoundary = function getMIMEBoundary() {        return '';     };
    

};

