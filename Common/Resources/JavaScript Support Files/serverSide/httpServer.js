/**
 *
 * 
 *
 * @class HTTP Server
 * @extends Object
 *
 */
HttpServer = function HttpServer() {
    
    
    /**
     * 
     *
     * @property started
     * @attributes ReadOnly
     * @type Boolean
     */
    this.started =  true; 
    
    /**
     * 
     *
     * @property ssl
     * @attributes ReadOnly
     * @type HttpServerSSL
     */
    this.ssl =  new HttpServerSSL( ); 
    
    /**
     * 
     *
     * @property port
     * @attributes ReadOnly
     * @type Number
     */
    this.port =  0; 
    
    /**
     * 
     *
     * @property ipAddress
     * @attributes ReadOnly
     * @type String
     */
    this.ipAddress =  ''; 
    
    /**
     * 
     *
     * @property hostName
     * @attributes ReadOnly
     * @type String
     */
    this.hostName =  ''; 
    
    /**
     * 
     *
     * @property defaultCharSet
     * @attributes ReadOnly
     * @type String
     */
    this.defaultCharSet =  ''; 
    
    /**
     * 
     *
     * @property cache
     * @attributes 
     * @type HttpServerCache
     */
    this.cache =  new HttpServerCache( ); 
    
    
    /**
     * stops the Wakanda HTTP server
     *
     * @method stop
     */
    this.stop = function stop() {             };
    
    /**
     * starts the Wakanda HTTP server
     *
     * @method start
     */
    this.start = function start() {             };
    
    /**
     * removes the WebSocket handler socketID from the server
     *
     * @method removeWebSocketHandler
     * @param {String} socketID
     */
    this.removeWebSocketHandler = function removeWebSocketHandler(socketID) {             };
    
    /**
     * installs a WebSocket handler script on the server
     *
     * @method addWebSocketHandler
     * @param {String} pattern
     * @param {String} filePath
     * @param {String} socketID
     * @param {Boolean} shared
     */
    this.addWebSocketHandler = function addWebSocketHandler(pattern, filePath, socketID, shared) {             };
    

};


HttpServerSSL = function HttpServerSSL() {
    
    
    /**
     * 
     *
     * @property enabled
     * @attributes 
     * @type Boolean
     */
    this.enabled =  true; 
    
    /**
     * 
     *
     * @property port
     * @attributes ReadOnly
     * @type Number
     */
    this.port =  0; 
    
    
    /**
     * returns the full path to the SSL certificates folder used by the server (if any)
     *
     * @method getCertificatePath
     */
    this.getCertificatePath = function getCertificatePath() {             };
    
    /**
     * returns a Folder object describing the current SSL certificates folder used by the server
     *
     * @method getCertificateFolder
     * @return {Folder}
     */
    this.getCertificateFolder = function getCertificateFolder() {        return new Folder( );     };
    

};


HttpServerCache = function HttpServerCache() {
    
    
    /**
     * 
     *
     * @property enabled
     * @attributes 
     * @type Boolean
     */
    this.enabled =  true; 
    
    /**
     * 
     *
     * @property memorySize
     * @attributes ReadOnly
     * @type Number
     */
    this.memorySize =  0; 
    
    

};

