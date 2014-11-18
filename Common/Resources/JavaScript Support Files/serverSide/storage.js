/**
 *
 * 
 *
 * @class Storage
 * @extends Object
 *
 */
Storage = function Storage() {
    
    
    /**
     * returns the number of key/value pairs (or items) currently available in the Storage object
     *
     * @property length
     * @attributes ReadOnly
     * @type Number
     */
    this.length =  0; 
    
    
    /**
     * removes a lock that was previously put on the Storage object
     *
     * @method unlock
     */
    this.unlock = function unlock() {             };
    
    /**
     * locks the Storage object to which it is applied, so that only the thread that placed it can read or modify it
     *
     * @method lock
     */
    this.lock = function lock() {             };
    
    /**
     * tries to lock the Storage object to which it is applied; it returns true in case of success and false otherwise
     *
     * @method tryLock
     * @return {Boolean}
     */
    this.tryLock = function tryLock() {        return true;     };
    
    /**
     * removes all key/value pairs from the Storage object
     *
     * @method clear
     */
    this.clear = function clear() {             };
    
    /**
     * allows you to remove an item from the Storage object
     *
     * @method removeItem
     * @param {String} key
     */
    this.removeItem = function removeItem(key) {             };
    
    /**
     * allows you to create or update an item in the Storage object
     *
     * @method setItem
     * @param {String} key
     * @param {Mixed} value
     */
    this.setItem = function setItem(key, value) {             };
    
    /**
     * returns the name of the key stored at the keyIndex position in the Storage object
     *
     * @method key
     * @param {Number} keyIndex
     * @return {String}
     */
    this.key = function key(keyIndex) {        return '';     };
    
    /**
     * returns a copy of the value stored with the given key in the Storage object
     *
     * @method getItem
     * @param {String} key
     * @return {Mixed}
     */
    this.getItem = function getItem(key) {        return 0 || '' || true || {} || null;     };
    

};

