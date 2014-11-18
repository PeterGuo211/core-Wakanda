/**
 *
 * 
 *
 * @class XMLHttpRequest
 * @extends Object
 *
 */
XMLHttpRequest = function XMLHttpRequest() {
    
    
    /**
     * 
     *
     * @property responseText
     * @attributes 
     * @type String
     */
    this.responseText =  ''; 
    
    /**
     * returns the HTTP status text of the XMLHttpRequest
     *
     * @property statusText
     * @attributes 
     * @type String
     */
    this.statusText =  ''; 
    
    /**
     * returns the HTTP status code of the XMLHttpRequest
     *
     * @property status
     * @attributes 
     * @type Number
     */
    this.status =  0; 
    
    /**
     * 
     *
     * @property readyState
     * @attributes ReadOnly
     * @type Number
     */
    this.readyState =  0; 
    
    /**
     * defines the event listener function that will handle the various states of the XMLHttpRequest
     *
     * @property onreadystatechange
     * @attributes 
     * @type Function
     */
    this.onreadystatechange =  new Function( ); 
    
    /**
     * 
     *
     * @property response
     * @attributes 
     * @type String
     */
    this.response =  ''; 
    
    /**
     * 
     *
     * @property responseType
     * @attributes 
     * @type String
     */
    this.responseType =  ''; 
    
    
    /**
     * returns all HTTP headers from the response of the XMLHttprequest
     *
     * @method getAllResponseHeaders
     * @return {String}
     */
    this.getAllResponseHeaders = function getAllResponseHeaders() {        return '';     };
    
    /**
     * sends the request defined in the XMLHttpRequest
     *
     * @method send
     * @param {String | File} data
     */
    this.send = function send(data) {             };
    
    /**
     * declares the HTTP method and the URL of the XMLHttpRequest
     *
     * @method open
     * @param {String} method
     * @param {String} url
     * @param {Boolean} async
     */
    this.open = function open(method, url, async) {             };
    
    /**
     * returns the value of a specific header field in the response of the XMLHttpRequest
     *
     * @method getResponseHeader
     * @param {String} header
     * @return {String | Null}
     */
    this.getResponseHeader = function getResponseHeader(header) {        return '' || new Null( );     };
    
    /**
     * set the value of a specific header field of the XMLHttpRequest
     *
     * @method setRequestHeader
     * @param {String} header
     * @param {String} value
     */
    this.setRequestHeader = function setRequestHeader(header, value) {             };
    
    /**
     * allows the request to be authenticated on the remote server with a client certificate, when necessary
     *
     * @method setClientCertificate
     * @param {String} keyPath
     * @param {String} certificatePath
     */
    this.setClientCertificate = function setClientCertificate(keyPath, certificatePath) {             };
    

};

