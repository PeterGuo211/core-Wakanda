/**

* @author ouissam.gouni@4d.com

*/
var _testCase = {
    
    name: "Test directory SSJS API when a loging listener is set",
    
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
     * DRSSLS-1 Check that loginByPassword method exists
     */
    testLoginByPasswordMethodExists: function() {
        Y.Assert.isNotUndefined(application.loginByPassword);
        Y.Assert.areSame("function", typeof application.loginByPassword);
    },
    
    /**
     * DRSSLS-2 Check that loginByPassword method returns true and opens a new session if authentication is accepted.
     */
    testLoginByPasswordMethodReturnsTrueAndOpensNewSessionIfAuthenticationIsAccepted: function() {
        this._assertIsDefaultUser();
        var userName = "accepted-by-ls";
        var loggedin = application.loginByPassword(userName,"password");
        Y.Assert.isTrue(loggedin, "Method is expected to return true");       
        var expected = {
            name: userName,
            ID: "F4588AA9C176A54F87BDA781C59524F6",
            fullName: ""
        };
        var cs = application.currentSession();
        var actual = cs.user;
        Y.ObjectAssert.areEqual(expected, actual, "Wrong current user");
    },
    
    /**
     * DRSSLS-3 Check that loginByPassword method returns true and opens a new session if authentication succeeds using the directory.
     */
    testLoginByPasswordMethodReturnsTrueAndOpensNewSessionIfAuthenticationSucceedsUsingDirectory: function() {
        this._assertIsDefaultUser();
        var userName = "in-directory";
        var loggedin = application.loginByPassword(userName, "password");
        Y.Assert.isTrue(loggedin, "Method is expected to return true");       
        var expected = {
            name: userName,
            ID: "34D3CDEFF8E09E44B238C5EB90DAA63D",
            fullName: ""
        };
        var cs = application.currentSession();
        var actual = cs.user;
        Y.ObjectAssert.areEqual(expected, actual, "Wrong current user");
    },
    
    /**
     * DRSSLS-4 Check that loginByPassword method returns false and keeps the current session unchanged if authentication is rejected.
     */
    testLoginByPasswordMethodReturnsFalseAndKeepsCurrentSessionIfAuthenticationIsRejected: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByPassword("rejected-by-ls", "whatever");
        Y.Assert.isFalse(loggedin, "Method is expected to return false");       
        this._assertIsDefaultUser();
    },
    
    /**
     * DRSSLS-5 Check that loginByPassword method returns false and keeps the current session unchanged if authentication is rejected using the directory.
     */
    testLoginByPasswordMethodReturnsFalseIfAuthenticationIsRejectedUsingDirectory: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByPassword("not-in-directory","whatever");
        Y.Assert.isFalse(loggedin, "Method is expected to return false");       
        this._assertIsDefaultUser();
    },

    /**
     * DRSSLS-6 Check that loginByKey method exists
     */
    testLoginByKeyMethodExists: function() {
        Y.Assert.isNotUndefined(application.loginByKey);
        Y.Assert.areSame("function", typeof application.loginByKey);         
    },
    
    /**
     * DRSSLS-7 Check that loginByKey method returns true and opens a new user session on the server if authentication is accepted.
     */
    testLoginByKeyMethodReturnsTrueAndOpensNewSessionIfAuthenticationIsAccepted: function() {
        this._assertIsDefaultUser();
        var userName = "accepted-by-ls";
        var key = "fa0bf6c9de759b63b8ad70837ec47b9c";
        var loggedin = application.loginByKey(userName, key);
        Y.Assert.isTrue(loggedin, "Method is expected to return true");       
        var expected = {
            name: userName,
            ID: "F4588AA9C176A54F87BDA781C59524F6",
            fullName: ""
        };
        var cs = application.currentSession();
        var actual = cs.user;
        Y.ObjectAssert.areEqual(expected, actual, "Wrong current user");
    },
    
    /**
     * DRSSLS-8 Check that loginByKey method returns true and opens a new user session if authentication succeeds using the directory.
     */
    testLoginByKeyMethodReturnsTrueAndOpensNewSessionIfAuthenticationSucceedsUsingDirectory: function() {
        this._assertIsDefaultUser();
        var userName = "in-directory";
        var key = "8bed26d8c2c8276108baf189e5743364";
        var loggedin = application.loginByKey(userName, key);
        Y.Assert.isTrue(loggedin, "Method is expected to return true");       
        var expected = {
            name: userName,
            ID: "34D3CDEFF8E09E44B238C5EB90DAA63D",
            fullName: ""
        };
        var cs = application.currentSession();
        var actual = cs.user;
        Y.ObjectAssert.areEqual(expected, actual, "Wrong current user");
    },
    
    /**
     * DRSSLS-9 Check that loginByKey method returns false and keeps the current session unchanged if authentication is rejected.
     */
    testLoginByKeyMethodReturnsFalseAndKeepsCurrentSessionIfAuthenticationIsRejected: function() {
        this._assertIsDefaultUser();
        var key = "3d4e9e2e7fb7f1b0daf1aaf73649c05f";
        var loggedin = application.loginByKey("rejected-by-ls", key);
        Y.Assert.isFalse(loggedin, "Method is expected to return false");       
        this._assertIsDefaultUser();
    },
    
    /**
     * DRSSLS-10 Check that loginByKey method returns false and keeps the current session unchanged if authentication is rejected using the directory.
     */
    testLoginByKeydMethodReturnsFalseAndKeepsCurrentSessionIfAuthenticationIsRejectedUsingDirectory: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByKey("not-in-directory","whatever");
        Y.Assert.isFalse(loggedin, "Method is expected to return false");       
        this._assertIsDefaultUser();
    },
    
    /**
     * DRSSLS-11 Check that logout method exists
     */
    testLogoutMethodExists: function() {
        Y.Assert.isNotUndefined(application.logout);
        Y.Assert.areSame("function", typeof application.logout);         
    },
    
    /**
     * DRSSLS-12 Check that logout method returns true and invalidates the session.
     */
    testLogoutMethodInvalidatesSessionAndReturnsTrue: function() {
        this._assertIsDefaultUser();
        var loggedin = application.loginByPassword("accepted-by-ls", "password");
        Y.Assert.isTrue(loggedin);   
        var loggedout= application.logout();       
        Y.Assert.isTrue(loggedout, "logout method is expected to return true");
        this._assertIsDefaultUser();
    },
    
    /**
     * DRSSLS-13 Check that logout method returns true and invalidates the session when the user is authenticated using the directory.
     */
    testLogoutMethodInvalidatesSessionAndReturnsTrueWhenAuthenticatedUsingDirectory: function () {
        this._assertIsDefaultUser();
        var loggedin = application.loginByPassword("in-directory", "password");
        Y.Assert.isTrue(loggedin);   
        var loggedout= application.logout();       
        Y.Assert.isTrue(loggedout, "logout method is expected to return true");
        this._assertIsDefaultUser();

    },
    
    /**
     * DRSSLS-14 Check that currentUser method exists
     */
    testCurrentUserMethodExists: function() {
        Y.Assert.isNotUndefined(application.currentUser);
        Y.Assert.areSame("function", typeof application.currentUser);         
    },
    
    
    /**
     * DRSSLS-15 Check that currentUser method returns the default user when session is invalid.
     */
    testCurrentUserMethodReturnsDefaultUserIfSessionIsInvalid: function() {
        this._assertIsDefaultUser();
    },
        
    /**
     * DRSSLS-16 Check that currentUser method returns the correct user when session is valid.
     */
    testCurrentUserMethodReturnsCorrectUserIfSessionIsValid: function() {
        this._assertIsDefaultUser();
        var userName = "accepted-by-ls";
        var loggedin = application.loginByPassword(userName,"password");
        Y.Assert.isTrue(loggedin);   
        var expected = {
            ID: "F4588AA9C176A54F87BDA781C59524F6",
            name: userName,
            fullName: ""
        };
        var actual = application.currentUser();
        Y.ObjectAssert.areEqual(expected, actual, "Wrong current user");
    },
    
    /**
     * DRSSLS-17 Check that currentUser method returns the correct user when user is supposed to be authenticated from the directory.
     */
    testCurrentUserMethodReturnsCorrectUserIfSessionIsValidAndUserIsAuthenticatedUsingDirectory: function() {
        this._assertIsDefaultUser();
        var userName = "in-directory";
        var loggedin = application.loginByPassword(userName,"password");
        Y.Assert.isTrue(loggedin);   
        var expected = {
            ID: "34D3CDEFF8E09E44B238C5EB90DAA63D",
            name: userName,
            fullName: ""
        };
        var actual = application.currentUser();
        Y.ObjectAssert.areEqual(expected, actual, "Wrong current user");
    },
    
    /**
     * DRSSLS-18 Check that currentSession method exists
     */
    testCurrentSessionMethodExists: function() {
        Y.Assert.isNotUndefined(application.currentSession);
        Y.Assert.areSame("function", typeof application.currentSession);         
    },
    
    /**
     * DRSSLS-19 Check that currentSession returns the session of the default user if session is invalid.
     */
    testCurrentSessionMethodReturnsDefaultUserSessionIfSessionIsInvalid: function() {
        var session = application.currentSession();
        Y.Assert.isNotNull(session, "Current session should not be null");
        var actual = session.user;
        Y.ObjectAssert.areEqual(this._defaultUser, actual, "Default user is expected");  
    },
    
    /**
     * DRSSLS-20 Check that currentSession returns a valid session object when the session is valid.
     */
    testCurrentSessionMethodReturnsValidSessionObjectIfSessionIsValid: function() {
        this._assertIsDefaultUser();
        var userName = "accepted-by-ls";
        var loggedin = application.loginByPassword(userName,"password");
        Y.Assert.isTrue(loggedin);
        var cs = application.currentSession();
        Y.Assert.isObject(cs);
        Y.Assert.isNotNull(cs);
        var actual = cs.user;
        var expected = {
            ID: "F4588AA9C176A54F87BDA781C59524F6",
            name: userName,
            fullName: ""
        };
        Y.ObjectAssert.areEqual(expected, actual, "Wrong user session");
    },
    
    /**
     * DRSSLS-21 Check that currentSession returns a valid session object when user is authenticated using the directory.
     */
    testCurrentSessionMethodReturnsValidSessionObjectIfSessionIsValidAndUserIsAuthenticatedUsingDirectory: function() {
        this._assertIsDefaultUser();
        var userName = "in-directory";
        var loggedin = application.loginByPassword(userName,"password");
        Y.Assert.isTrue(loggedin);   
        var expected = {
            ID: "34D3CDEFF8E09E44B238C5EB90DAA63D",
            name: userName,
            fullName: ""
        };
        var actual = application.currentUser();
        Y.ObjectAssert.areEqual(expected, actual, "Wrong current user");
    },

}

var testCase = _testCase;
var ignoreAll = false;
testCase._should = {
    ignore:function(){
        var ignored = {};
        for(var x in testCase){
            if(x.match(/^test/)){
                ignored[x]=ignoreAll;
            }
        }     
        return ignored;
    }.call()
}