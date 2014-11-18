/**
 *
 * 
 *
 * @class WebSocket Client
 * @extends Object
 *
 */
WebSocket = function WebSocket() {
    
    
    /**
     * 
     *
     * @property binaryType
     * @attributes 
     * @type String
     */
    this.binaryType =  ''; 
    
    /**
     * 
     *
     * @property protocol
     * @attributes 
     * @type String
     */
    this.protocol =  ''; 
    
    /**
     * 
     *
     * @property extensions
     * @attributes 
     * @type String
     */
    this.extensions =  ''; 
    
    /**
     * 
     *
     * @property bufferedAmount
     * @attributes ReadOnly
     * @type Number
     */
    this.bufferedAmount =  0; 
    
    /**
     * 
     *
     * @property readyState
     * @attributes 
     * @type Number
     */
    this.readyState =  0; 
    
    /**
     * 
     *
     * @property url
     * @attributes 
     * @type String
     */
    this.url =  ''; 
    
    /**
     * 
     *
     * @property onclose
     * @attributes 
     * @type Function
     */
    this.onclose =  new Function( ); 
    
    /**
     * 
     *
     * @property onerror
     * @attributes 
     * @type Function
     */
    this.onerror =  new Function( ); 
    
    /**
     * 
     *
     * @property onmessage
     * @attributes 
     * @type Function
     */
    this.onmessage =  new Function( ); 
    
    /**
     * 
     *
     * @property onopen
     * @attributes 
     * @type Function
     */
    this.onopen =  new Function( ); 
    
    
    /**
     * allows the removal of event listeners from the WebSocket instance
     *
     * @method removeEventListener
     * @param {String} type
     * @param {Function} listener
     */
    this.removeEventListener = function removeEventListener(type, listener) {             };
    
    /**
     * allows the registration of an event listener in the WebSocket instance
     *
     * @method addEventListener
     * @param {String} type
     * @param {Function} listener
     */
    this.addEventListener = function addEventListener(type, listener) {             };
    
    /**
     * closes the WebSocket connection or connection attempt, if any
     *
     * @method close
     * @param {Number} code
     * @param {String} reason
     */
    this.close = function close(code, reason) {             };
    
    /**
     * sends text data using the WebSocket connection
     *
     * @method send
     * @param {String | Buffer} data
     * @return {Boolean}
     */
    this.send = function send(data) {        return true;     };
    

};


Application = function Application() {
    
    
    
    /**
     * constructor of the client WebSocket type class objects
     *
     * @method WebSocket
     * @param {String} url
     * @param {String | Array} protocols
     */
    this.WebSocket = function WebSocket(url, protocols) {             };
    

};

