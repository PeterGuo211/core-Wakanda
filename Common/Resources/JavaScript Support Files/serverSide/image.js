/**
 *
 * The Image API provides an interface to load, handle or create image objects from files and datastore attributes
 *
 * @class Images
 * @extends Object
 *
 */
Image = function Image() {
    
    
    /**
     * contains the height (in pixels) of the Image object
     *
     * @property height
     * @attributes 
     * @type Number
     */
    this.height =  0; 
    
    /**
     * returns the size (expressed in bytes) of the Image type object
     *
     * @property length
     * @attributes ReadOnly
     * @type Number
     */
    this.length =  0; 
    
    /**
     * returns the size (expressed in bytes) of the Image type object
     *
     * @property size
     * @attributes ReadOnly
     * @type Number
     */
    this.size =  0; 
    
    /**
     * returns the width (in pixels) of the Image object
     *
     * @property width
     * @attributes ReadOnly
     * @type Number
     */
    this.width =  0; 
    
    /**
     * returns an object made up of one or more sub-objects containing the metadata associated with the Image object
     *
     * @property meta
     * @attributes ReadOnly
     * @type Object
     */
    this.meta =  {}; 
    
    
    /**
     * stores locally the Image object in a file
     *
     * @method save
     * @param {String | File} file
     * @param {String} type
     */
    this.save = function save(file, type) {             };
    
    /**
     * modifies metadata found in the Image object
     *
     * @method saveMeta
     * @param {Object} meta
     */
    this.saveMeta = function saveMeta(meta) {             };
    
    /**
     * returns a thumbnail of the source image
     *
     * @method thumbnail
     * @param {Number} width
     * @param {Number} height
     * @param {Number} mode
     * @return {Image}
     */
    this.thumbnail = function thumbnail(width, height, mode) {        return new Image( );     };
    
    /**
     * associate a file path to an Image object
     *
     * @method setPath
     * @param {File | String} file
     */
    this.setPath = function setPath(file) {             };
    

};

