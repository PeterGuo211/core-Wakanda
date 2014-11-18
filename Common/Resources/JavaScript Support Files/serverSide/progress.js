/**
 *
 * 
 *
 * @class ProgressIndicator
 * @extends Object
 *
 */
ProgressIndicator = function ProgressIndicator() {
    
    
    
    /**
     * stops the current session of the ProgressIndicator object
     *
     * @method endSession
     */
    this.endSession = function endSession() {             };
    
    /**
     * creates and manages the display of a second ProgressIndicator object in the main ProgressIndicator session being executed
     *
     * @method subSession
     * @param {Number} numElements
     * @param {String} sessionName
     * @param {Boolean | String} stoppable
     */
    this.subSession = function subSession(numElements, sessionName, stoppable) {             };
    
    /**
     * sets a current element value for the ProgressIndicator object
     *
     * @method setValue
     * @param {Number} curValue
     * @return {Boolean}
     */
    this.setValue = function setValue(curValue) {        return true;     };
    
    /**
     * dynamically modifies the maximum number of elements whose processing must be shown by the ProgressIndicator object
     *
     * @method setMax
     * @param {Number} numElements
     */
    this.setMax = function setMax(numElements) {             };
    
    /**
     * automatically increments the value of the current element for the ProgressIndicator object
     *
     * @method incValue
     * @return {Boolean}
     */
    this.incValue = function incValue() {        return true;     };
    
    /**
     * dynamically modifies the name of the execution session for the ProgressIndicator object
     *
     * @method setMessage
     * @param {String} sessionName
     */
    this.setMessage = function setMessage(sessionName) {             };
    
    /**
     * interrupts the current execution session of the ProgressIndicator object
     *
     * @method stop
     */
    this.stop = function stop() {             };
    

};

