/**
 *
 * Use System workers to call external processes on the server machine
 *
 * @class System Workers
 * @extends Object
 *
 */
SystemWorker = function SystemWorker() {
    
    
    /**
     * contains the function to call when the external process sent a termination message
     *
     * @property onterminated
     * @attributes ReadOnly
     * @type Function
     */
    this.onterminated =  new Function( ); 
    
    /**
     * contains the function to call when an error is received from the external process
     *
     * @property onerror
     * @attributes ReadOnly
     * @type Function
     */
    this.onerror =  new Function( ); 
    
    /**
     * contains the function to call when a message is received from the external process
     *
     * @property onmessage
     * @attributes ReadOnly
     * @type Function
     */
    this.onmessage =  new Function( ); 
    
    
    /**
     * returns an object containing information about the SystemWorker
     *
     * @method getInfos
     * @return {Object}
     */
    this.getInfos = function getInfos() {        return {};     };
    
    /**
     * returns the number of SystemWorker objects currently running on the server
     *
     * @method getNumberRunning
     * @return {Number}
     */
    this.getNumberRunning = function getNumberRunning() {        return 0;     };
    
    /**
     * allows you to set a waiting time for the SystemWorker to execute
     *
     * @method wait
     * @param {Number} timeout
     * @return {Boolean}
     */
    this.wait = function wait(timeout) {        return true;     };
    
    /**
     * closes the input stream (stdin) of the external process
     *
     * @method endOfInput
     */
    this.endOfInput = function endOfInput() {             };
    
    /**
     * write on the input stream (stdin) of the external process
     *
     * @method postMessage
     * @param {String | Buffer} stdin
     */
    this.postMessage = function postMessage(stdin) {             };
    
    /**
     * forces the external process to terminate its execution
     *
     * @method terminate
     * @param {Boolean} waitForTermination
     */
    this.terminate = function terminate(waitForTermination) {             };
    
    /**
     * set the type of data exchanged in the SystemWorker through the onmessage and onerror properties
     *
     * @method setBinary
     * @param {Boolean} binary
     */
    this.setBinary = function setBinary(binary) {             };
    
    /**
     * constructor method    can be used with the SystemWorker( ) constructor to launch an external process in synchronous mode
     *
     * @method exec
     * @param {String} commandLine
     * @param {Buffer | String} stdinContent
     * @param {String | Folder} executionPath
     * @return {Object | Null}
     */
    this.exec = function exec(commandLine, stdinContent, executionPath) {        return {} || new Null( );     };
    

};

