/**
 *
 * Console module provides an interface to log JavaScript actions.
 *
 * @class Console
 * @extends Object
 *
 */
Console = function Console() {
    
    
    /**
     * 
     *
     * @property content
     * @attributes ReadOnlyPrivate
     * @type Array
     */
    this.content =  []; 
    
    
    /**
     *  is identical to log( )
     *
     * @method info
     * @param {Object} message
     * @param {Object} subst
     */
    this.info = function info(message, subst) {             };
    
    /**
     * writes message to the log file and the active debugger&#39;s console with the visual &quot;WARNING&quot; label
     *
     * @method warn
     * @param {Object} message
     * @param {Object} subst
     */
    this.warn = function warn(message, subst) {             };
    
    /**
     * writes message to the log file and to the current debugger&#39;s console
     *
     * @method log
     * @param {Object} message
     * @param {Object} subst
     */
    this.log = function log(message, subst) {             };
    
    /**
     * writes message to the log file and the active debugger&#39;s console with the visual &quot;ERROR&quot; label
     *
     * @method error
     * @param {Object} message
     * @param {Object} subst
     */
    this.error = function error(message, subst) {             };
    
    /**
     * 
     *
     * @method debug
     * @param {Object} message
     */
    this.debug = function debug(message) {             };
    

};

