/**
 *
 * Client-side API to handle user login.
 *
 * @class Directory
 * @extends Object
 *
 */
WAF.directory = function WAF_directory() {
    
    
    
    /**
     * authenticates a user on the server by his/her name and key and, in case of success, opens a new user [#title id&#61;&quot;2567&quot;/] on the server
     *
     * @method loginByKey
     * @param {String} name
     * @param {String} key
     * @param {Object} options
     * @return {Boolean}
     */
    this.loginByKey = function loginByKey(name, key, options) {        return true;     };
    
    /**
     * authenticates a user on the server and when successful opens a new user [#title id&#61;&quot;2567&quot;/] on the  server
     *
     * @method loginByPassword
     * @param {String} name
     * @param {String} password
     * @param {Object} options
     * @return {Boolean}
     */
    this.loginByPassword = function loginByPassword(name, password, options) {        return true;     };
    
    /**
     * shortcut to the loginByPassword( ) method
     *
     * @method login
     * @param {String} name
     * @param {String} password
     * @param {Object} options
     * @return {Boolean}
     */
    this.login = function login(name, password, options) {        return true;     };
    
    /**
     * logs out the user from the server and closes the current user session on the server
     *
     * @method logout
     * @param {Object} options
     */
    this.logout = function logout(options) {             };
    
    /**
     * returns true if the current user belongs to group
     *
     * @method currentUserBelongsTo
     * @param {String} group
     * @param {Object} options
     * @return {Boolean}
     */
    this.currentUserBelongsTo = function currentUserBelongsTo(group, options) {        return true;     };
    
    /**
     * returns the user as identified by Wakanda Server
     *
     * @method currentUser
     * @return {User | Null}
     */
    this.currentUser = function currentUser() {        return new User( ) || new Null( );     };
    

};

