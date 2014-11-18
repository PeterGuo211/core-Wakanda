/**

 * @author admin

 */
var testCase = {
        name: "Test directory SSJS API",
    
    defaultID: "00000000000000000000000000000000",
    defaultUser: {
        name: "default guest",
        ID: "00000000000000000000000000000000",
        fullName: "default guest"
    },
    
    setUp: function() {
        // logout before each unit test.
        application.logout();
    },
    
    _assertIsDefaultUser: function(){
        var session = application.currentSession();
        Y.Assert.isObject(session, "Session object is expected");
        Y.Assert.isNotNull(session, "Non null session object is expected");
        var actual = session.user;
        Y.ObjectAssert.areEqual(this._defaultUser, actual, "Default user is expected");  
    },

    /**
     * DRSS-1 Check that loginByPassword method exists
     */
    testLoginByPasswordMethodExists: function() {
        Y.Assert.isNotUndefined(application.loginByPassword);
        Y.Assert.areSame("function", typeof application.loginByPassword);
    },
    
    /**
     * DRSS-1 Check that loginByPassword method returns true and opens a new user session on the server if the user is valid.
     */
    testLoginByPasswordMethodReturnsTrueAndOpensNewSessionIfUserIsValid: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByPassword("default", "password");
        Y.Assert.isTrue(loggedin, "Method is expected to return true");       
        var expected = {
            name: "default",
            ID: "F5C70CDEF682564B8FCD591BDB6052D6",
            fullName: ""
        };
        var cs = application.currentSession();
        var actual = cs.user;
        Y.ObjectAssert.areEqual(expected, actual, "Wrong current user");
    },
    
    /**
     * DRSS-1 Check that loginByPassword method returns true and opens a new user session on the server if the user is valid and got no password.
     */
    testLoginByPasswordMethodReturnsTrueAndOpensNewSessionIfUserIsValidAndGotNoPassword: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByPassword("empty-pwd");
        Y.Assert.isTrue(loggedin, "Method is expected to return true");       
        var expected = {
            name: "empty-pwd",
            ID: "21954660ACDAB8438768EEC010417362",
            fullName: ""
        };
        var cs = application.currentSession();
        var actual = cs.user;
        Y.ObjectAssert.areEqual(expected, actual, "Wrong current user");
    },
    
    /**
     * DRSS-1 Check that loginByPassword method returns false and keeps the current session unchanged if the user is invalid.
     */
    testLoginByPasswordMethodReturnsFalseAndKeepsCurrentSessionIfUserIsInvalid: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByPassword("whatever", "whatever");
        Y.Assert.isFalse(loggedin, "Method is expected to return false");       
        this._assertIsDefaultUser();
    },
    
    /**
     * DRSS-1 Check that loginByPassword method returns false and keeps the current session unchanged if the user name is valid but password is not.
     */
    testLoginByPasswordMethodReturnsFalseAndKeepsCurrentSessionIfUserNameIsValidButPasswordIsNot: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByPassword("default", "whatever");
        Y.Assert.isFalse(loggedin, "Method is expected to return false");       
        this._assertIsDefaultUser();
    },

    /**
     * DRSS-2 Check that loginByKey method exists
     */
    testLoginByKeyMethodExists: function() {
        Y.Assert.isNotUndefined(application.loginByKey);
        Y.Assert.areSame("function", typeof application.loginByKey);         
    },
    
    /**
     * DRSS-1 Check that loginByKey method returns true and opens a new user session on the server if the user is valid.
     */
    testLoginByKeyMethodReturnsTrueAndOpensNewSessionIfUserIsValid: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByKey("default", "ae88412831d12195b26dfabfe4b5572c");
        Y.Assert.isTrue(loggedin, "Method is expected to return true");       
        var expected = {
            name: "default",
            ID: "F5C70CDEF682564B8FCD591BDB6052D6",
            fullName: ""
        };
        var cs = application.currentSession();
        var actual = cs.user;
        Y.ObjectAssert.areEqual(expected, actual, "Wrong current user");
    },
    
    /**
     * DRSS-1 Check that loginByKey method returns true and opens a new user session on the server if the user is valid and got no password.
     */
    testLoginByKeyMethodReturnsTrueAndOpensNewSessionIfUserIsValidAndGotNoPassword: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByKey("empty-pwd");
        Y.Assert.isTrue(loggedin, "Method is expected to return true");       
        var expected = {
            name: "empty-pwd",
            ID: "21954660ACDAB8438768EEC010417362",
            fullName: ""
        };
        var cs = application.currentSession();
        var actual = cs.user;
        Y.ObjectAssert.areEqual(expected, actual, "Wrong current user");
    },
    
    /**
     * DRSS-1 Check that loginByKey method returns false and keeps the current session unchanged if the user is invalid.
     */
    testLoginByKeyMethodReturnsFalseAndKeepsCurrentSessionIfUserIsInvalid: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByKey("wrong-user", "wrong-key");
        Y.Assert.isFalse(loggedin, "Method is expected to return false");       
        this._assertIsDefaultUser();
    },
    
    /**
     * DRSS-1 Check that loginByKey method returns false and keeps the current session unchanged if the user name is valid but password is not.
     */
    testLoginByKeydMethodReturnsFalseAndKeepsCurrentSessionIfUserNameIsValidButPasswordIsNot: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByKey("default", "wrong-key");
        Y.Assert.isFalse(loggedin, "Method is expected to return false");       
        this._assertIsDefaultUser();
    },
    
    /**
     * DRSS-3 Check that logout method exists
     */
    testLogoutMethodExists: function() {
        Y.Assert.isNotUndefined(application.logout);
        Y.Assert.areSame("function", typeof application.logout);         
    },
    
    /**
     * DRSS-3 Check that logout method returns true and invalidates the session.
     */
    testLogoutMethodInvalidatesSessionAndReturnsTrue: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByPassword("default", "password");
        Y.Assert.isTrue(loggedin);   
        var loggedout= application.logout();       
        Y.Assert.isTrue(loggedout, "logout method is expected to return true");
        this._assertIsDefaultUser();
    },
    
    /**
     * DRSS-4 Check that currentUser method exists
     */
    testCurrentUserMethodExists: function() {
        Y.Assert.isNotUndefined(application.currentUser);
        Y.Assert.areSame("function", typeof application.currentUser);         
    },
    
    /**
     * DRSS-4 Check that currentUser method returns the default user when session is invalid.
     */
    testCurrentUserMethodReturnsDefaultUserWhenSessionIsInvalid: function() {
        this._assertIsDefaultUser();
    },
        
    /**
     * DRSS-4 Check that currentUser method returns the correct user when session is valid.
     */
    testCurrentUserMethodReturnsCorrectUserWhenValidSession: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByPassword("default", "password");
        Y.Assert.isTrue(loggedin);   
        var expected = {
            name: "default",
            ID: "F5C70CDEF682564B8FCD591BDB6052D6",
            fullName: ""
        };
        var actual = application.currentUser();
        Y.ObjectAssert.areEqual(expected, actual, "Wrong current user");
    },
    
    /**
     * DRSS-5 Check that currentSession method exists
     */
    testCurrentSessionMethodExists: function() {
        Y.Assert.isNotUndefined(application.currentSession);
        Y.Assert.areSame("function", typeof application.currentSession);         
    },
    
    /**
     * DRSS-5 Check that currentSession returns the session of the default user when session is invalid.
     */
    testCurrentSessionMethodReturnsDefaultUserSessionWhenSessionIsInvalid: function() {
        var session = application.currentSession();
        Y.Assert.isNotNull(session, "Current session should not be null");
        var actual = session.user;
        Y.ObjectAssert.areEqual(this._defaultUser, actual, "Default user is expected");  
    },
    
    /**
     * DRSS-5 Check that currentSession returns a valid session object when the session is valid.
     */
    testCurrentSessionMethodReturnsValidSessionObjectWhenSessionInvalid: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByPassword("default", "password");
        Y.Assert.isTrue(loggedin);
        var cs = application.currentSession();
        Y.Assert.isObject(cs);
        Y.Assert.isNotNull(cs);
        var actual = cs.user;
        var expected = {
            name: "default",
            ID: "F5C70CDEF682564B8FCD591BDB6052D6",
            fullName: ""
        };
        Y.ObjectAssert.areEqual(expected, actual, "Wrong user session");
    },
    
    _should: {
        ignore: {
            
//            testLoginByPasswordMethodExists: true,
//            testLoginByPasswordMethodReturnsTrueAndOpensNewSessionIfUserIsValid: true,
//            testLoginByPasswordMethodReturnsTrueAndOpensNewSessionIfUserIsValidAndGotNoPassword: true,
//            testLoginByPasswordMethodReturnsFalseAndKeepsCurrentSessionIfUserIsInvalid: true,
//            testLoginByPasswordMethodReturnsFalseAndKeepsCurrentSessionIfUserNameIsValidButPasswordIsNot: true,
//            testLoginByKeyMethodExists: true,
//            testLoginByKeyMethodReturnsTrueAndOpensNewSessionIfUserIsValid: true,
//            testLoginByKeyMethodReturnsTrueAndOpensNewSessionIfUserIsValidAndGotNoPassword: true,
//            testLoginByKeyMethodReturnsFalseAndKeepsCurrentSessionIfUserIsInvalid: true,
//            testLoginByKeydMethodReturnsFalseAndKeepsCurrentSessionIfUserNameIsValidButPasswordIsNot: true,
//            testLogoutMethodExists: true,
//            testLogoutMethodInvalidatesSessionAndReturnsTrue: true,
//            testCurrentUserMethodExists: true,
//            testCurrentUserMethodReturnsDefaultUserWhenSessionIsInvalid: true,
//            testCurrentUserMethodReturnsCorrectUserWhenValidSession: true,
//            testCurrentSessionMethodExists: true,
//            testCurrentSessionMethodReturnsDefaultUserSessionWhenSessionIsInvalid: true,
//            testCurrentSessionMethodReturnsValidSessionObjectWhenSessionInvalid: true
        }
    }

}