var _testCase = {
    
    name: "Test WAF Directory API using a login listener",
    
    _sCookieKey: "WASID",
    _directory: null,
    
    _getSessionCookie:function(){
        var cs;
        var xhr= new XMLHttpRequest();
        xhr.onreadystatechange = function (){
            if (xhr.readyState === 4) {
                cs = xhr.responseText;                
            }
        } ;
        xhr.open('GET', '/getSessionCookie/', false);
        xhr.send(null); 
        console.log("Get session cookie: " + cs);
        return cs;
    },
    
    _invalidateCookie:function(){
        var setCookie;
        var xhr= new XMLHttpRequest();
        xhr.onreadystatechange = function (){
            if (xhr.readyState === 4) {
                setCookie = xhr.responseText;
            }
        } ;
        xhr.open('GET', '/invalidateSessionCookie/', false);
        xhr.send(null);
        console.log("Invalidate session using: " + setCookie);
    },
    
    setUp: function() {
		try{
			this._directory = WAF.directory;
			//this._getSessionCookie();
			// delete session cookie before each unit test.
			this._invalidateCookie();
		}
		catch(e){
			console.log('setUp error:', e);
		}
    },
    
    tearDown : function () {
        // logout after each unit test.
		try{
			this._directory.logout();
		}
		catch(e){
			console.log('Teardown error:', e);
		}
    },


    /**
     * DRLSWAF-01. Check that directory object exists
     */
    testDirectoryObjectExists: function() {
        Y.Assert.isNotUndefined(this._directory);
        Y.Assert.isObject(this._directory);
    },
    
    /**
     * DRLSWAF-02. Check that currentUser method exists
     */	
    testCurrentUserMethodExists: function () {
        Y.Assert.isNotUndefined(this._directory.currentUser);
        Y.Assert.isFunction(this._directory.currentUser);
    },
    
    /**
     * DRLSWAF-02. Check that currentUser method returns null when session is invalid.
     */	
    testCurrentUserMethodReturnsNullIfInvalidSession: function () {
        //session is invalidated in setUp function
        var user= this._directory.currentUser();
        Y.Assert.isNull(user);
    },
    
    /**
     * DRLSWAF-02. Check that currentUser method returns the correct user when session is valid.
     */	
    testCurrentUserMethodReturnsCorrectUserIfValidSession: function () {
        var loggedin = this._directory.login("accepted-by-ls","password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var user= this._directory.currentUser();
        var expected = {
            ID: "F4588AA9C176A54F87BDA781C59524F6",
            userName: "accepted-by-ls",
            fullName: ""
        };
        Y.ObjectAssert.areEqual(expected, user);
    },
    
    /**
     * DRLSWAF-02. Check that currentUser method returns the correct user when user is supposed to be authenticated from the directory.
     */	
    testCurrentUserMethodReturnsCorrectUserIfValidSessionWhenAuthenticatedUsingDirectory: function () {
        var loggedin = this._directory.login("in-directory","password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var user= this._directory.currentUser();
        var expected = {
            ID: "34D3CDEFF8E09E44B238C5EB90DAA63D",
            userName: "in-directory",
            fullName: ""
        };
        Y.ObjectAssert.areEqual(expected, user);
    },
    
    /**
     * DRLSWAF-03. Check that currentUserBelongsTo method exists
     */	
    testCurrentUserBelongsToMethodExists: function () {
        Y.Assert.isNotUndefined(this._directory.currentUserBelongsTo);
        Y.Assert.isFunction(this._directory.currentUserBelongsTo);
    },
    
    /**
     * DRLSWAF-03. Check that currentUserBelongsTo method returns true if the current user belongs to the group.
     */	
    testCurrentUserBelongsToMethodReturnsTrueIfCurrentUserBelongsToGroupUsingGroupID: function () {
        var loggedin = this._directory.login("accepted-by-ls", "password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var id = "2FAE34401E365044AF313E557E86F4C8";
        var actual = this._directory.currentUserBelongsTo(id);
        Y.Assert.isTrue(actual, "User should belong to group " + id);
        
    },
    
    /**
     * DRLSWAF-03. Check that currentUserBelongsTo method returns true if the current user - authenticated using the directory - belongs to the group.
     */	
    testCurrentUserBelongsToMethodReturnsTrueIfCurrentUserBelongsToGroupUsingGroupIDWhenAuthenticatedUsingDirectory: function () {
        var loggedin = this._directory.login("in-directory", "password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var id = "2FAE34401E365044AF313E557E86F4C8";
        var actual = this._directory.currentUserBelongsTo(id);
        Y.Assert.isTrue(actual, "User should belong to group " + id);
        
    },
    
    /**
     * DRLSWAF-03. Check that currentUserBelongsTo method returns true if the current user belongs to the group.
     */	
    testCurrentUserBelongsToMethodReturnsTrueIfCurrentUserBelongsToGroupUsingGroupName: function () {
        var loggedin = this._directory.login("accepted-by-ls", "password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var name = "Default";
        var actual = this._directory.currentUserBelongsTo(name);
        Y.Assert.isTrue(actual, "User should belong to group " + name);        
    },
    
   
    
    /**
     * DRLSWAF-03. Check that currentUserBelongsTo method returns true if the current user belongs to the group.
     */	
    testCurrentUserBelongsToMethodReturnsTrueIfCurrentUserBelongsToGroupUsingGroupNameWhenAuthenticatedUsingDirectory: function () {
        var loggedin = this._directory.login("in-directory", "password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var name = "Default";
        var actual = this._directory.currentUserBelongsTo(name);
        Y.Assert.isTrue(actual, "User should belong to group " + name);        
    },
        
    /**
     * DRLSWAF-03. Check that currentUserBelongsTo method if there is no current user defined in the session.
     */	
    testCurrentUserBelongsToMethodReturnsFalseIfSessionIsInvalid: function () {
        var user= this._directory.currentUser();
        Y.Assert.isNull(user);
        var actual = this._directory.currentUserBelongsTo("Default");
        Y.Assert.isFalse(actual, "Should return false because session is invalid");
    },
    
    /**
     * DRLSWAF-03. Check that currentUserBelongsTo method if the current user does not belong to the group.
     */	
    testCurrentUserBelongsToMethodReturnsFalseIfCurrentUserDoesNotBelongToGroupUsingGroupID: function () {
        var loggedin = this._directory.login("accepted-by-ls", "password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var id = "939352B8F3DAD24FA6981CC84AD63380";
        var actual = this._directory.currentUserBelongsTo(id);
        Y.Assert.isFalse(actual, "User should not belong to group " + id);
        
    },
    
    /**
     * DRLSWAF-03. Check that currentUserBelongsTo method if the current user does not belong to the group and authenticated via the directory.
     */	
    testCurrentUserBelongsToMethodReturnsFalseIfCurrentUserDoesNotBelongToGroupUsingGroupIDWhenAuthenticatedUsingDirectory: function () {
        var loggedin = this._directory.login("in-directory", "password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var id = "939352B8F3DAD24FA6981CC84AD63380";
        var actual = this._directory.currentUserBelongsTo(id);
        Y.Assert.isFalse(actual, "User should not belong to group " + id);
    },
    
    /**
     * DRLSWAF-03. Check that currentUserBelongsTo method if the current user does not belong to the group.
     */	
    testCurrentUserBelongsToMethodReturnsFalseIfCurrentUserDoesNotBelongToGroupUsingGroupName: function () {
        var loggedin = this._directory.login("accepted-by-ls", "password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var name = "Whatever";
        var actual = this._directory.currentUserBelongsTo(name);
        Y.Assert.isFalse(actual, "User should not belong to group " + name);
    },
      
    /**
     * DRLSWAF-03. Check that currentUserBelongsTo method if the current user does not belong to the group and authenticated via the directory.
     */	
    testCurrentUserBelongsToMethodReturnsFalseIfCurrentUserDoesNotBelongToGroupUsingGroupNameWhenAuthenticatedUsingDirectory: function () {
        var loggedin = this._directory.login("in-directory", "password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var name = "Whatever";
        var actual = this._directory.currentUserBelongsTo(name);
        Y.Assert.isFalse(actual, "User should not belong to group " + name);
    },
    
    /**
     * DRLSWAF-04. Check that login method exists
     */	
    testLoginMethodExists: function () {
        Y.Assert.isNotUndefined(this._directory.login);
        Y.Assert.isFunction(this._directory.login);
    },
    
    /**
     * DRLSWAF-05. Check that login method returns true and opens a new session when authentication is accepted.
     */	
    testLoginMethodReturnsTrueAndOpensNewSessionIfAuthenticationIsAcceptedSync: function () {
        var bSession = this._getSessionCookie();
        console.log("Old session: " + bSession);
        var res = this._directory.login("accepted-by-ls","password");
        Y.Assert.isTrue(res);
        var aSession = this._getSessionCookie();
        console.log("New session: " + aSession);
        Y.Assert.areNotSame(bSession, aSession, "New session expected");
    },
    
    /**
     * DRLSWAF-05. Check that login method returns true and opens a new session when authentication succeeds using the directory.
     */	
    testLoginMethodReturnsTrueAndOpensNewSessionIfAuthenticationSucceedsUsingDirectorySync: function () {
        var bSession = this._getSessionCookie();
        console.log("Old session: " + bSession);
        var res = this._directory.login("in-directory","password");
        Y.Assert.isTrue(res);
        var aSession = this._getSessionCookie();
        console.log("New session: " + aSession);
        Y.Assert.areNotSame(bSession, aSession, "New session expected");
    },
    
    /**
     * DRLSWAF-07. Check that login method returns false when authentication is rejected.
     */	
    // testLoginMethodReturnsFalseIfAuthenticationIsRejectedSync: function () {
        // var res = this._directory.login("rejected-by-ls","whatever");
        // Y.Assert.isFalse(res);
    // },
    
    /**
     * DRLSWAF-09. Check that login method returns false when authentication is rejected by the directory.
     */	
    // testLoginMethodReturnsFalseIfAuthenticationIsRejectedUsingDirectorySync: function () {
        // var res = this._directory.login("not-in-directory","whatever");
        // Y.Assert.isFalse(res);
    // },
    
    /**
     * DRLSWAF-09. Check that loginByKey method exists
     */	
    testLoginByKeyMethodExists: function () {
        Y.Assert.isNotUndefined(this._directory.loginByKey);
        Y.Assert.isFunction(this._directory.loginByKey);
    },
    
    /**
     * DRLSWAF-10. Check that loginByKey method returns true and opens a new session when authentication is accepted.
     */	
    testLoginByKeyMethodReturnsTrueAndOpensNewSessionWhenAuthenticationIsAcceptedSync: function () {
        var bSession = this._getSessionCookie();
        console.log("Old session: " + bSession);
        var key = "fa0bf6c9de759b63b8ad70837ec47b9c"; 
        var res = this._directory.loginByKey("accepted-by-ls",key);
        Y.Assert.isTrue(res);
        var aSession = this._getSessionCookie();
        console.log("New session: " + aSession);
        Y.Assert.areNotSame(bSession, aSession, "New session expected");
    },
    
    /**
     * DRLSWAF-10. Check that loginByKey method returns true and opens a new session when authentication succeeds using the directory.
     */	
    testLoginByKeyMethodReturnsTrueAndOpensNewSessionWhenAuthenticationSucceedsUsingDirectorySync: function () {
        var bSession = this._getSessionCookie();
        console.log("Old session: " + bSession);
        var key = "8bed26d8c2c8276108baf189e5743364"; 
        var res = this._directory.loginByKey("in-directory",key);
        Y.Assert.isTrue(res);
        var aSession = this._getSessionCookie();
        console.log("New session: " + aSession);
        Y.Assert.areNotSame(bSession, aSession, "New session expected");
    },
    
    /**
     * DRLSWAF-12. Check that loginByKey method returns false when authentication is rejected.
     */	
    // testLoginByKeyMethodReturnsFalseIfAuthenticationIsRejectedSync: function () {
        // var key = "3d4e9e2e7fb7f1b0daf1aaf73649c05f";
        // var res = this._directory.loginByKey("rejected-by-ls",key);
        // Y.Assert.isFalse(res);
    // },
    
    /**
     * DRLSWAF-12. Check that loginByKey method returns false when authentication is rejected using the directory.
     */	
    // testLoginByKeyMethodReturnsFalseWhenAuthenticationIsRejectedUsingDirectorySync: function () {
        // var res = this._directory.loginByKey("not-in-directory","whatever");
        // Y.Assert.isFalse(res);
    // },
    
    /**
     * DRLSWAF-14. Check that loginByPassword method exists
     */	
    testLoginByPasswordMethodExists: function () {
        Y.Assert.isNotUndefined(this._directory.loginByPassword);
        Y.Assert.isFunction(this._directory.loginByPassword);
    },
    
    /**
     * DRLSWAF-15. Check that loginByPassword method returns true and opens a new session when authentication is accepted.
     */	
    testLoginByPasswordMethodReturnsTrueAndOpensNewSessionWhenAuthenticationIsAcceptedSync: function () {
        var bSession = this._getSessionCookie();
        console.log("Old session: " + bSession);
        var res = this._directory.loginByPassword("accepted-by-ls","password");
        Y.Assert.isTrue(res);
        var aSession = this._getSessionCookie();
        console.log("New session: " + aSession);
        Y.Assert.areNotSame(bSession, aSession, "New session expected");
    },
    
    /**
     * DRLSWAF-16. Check that loginByPassword method returns true and opens a new session when authentication succeeds using the directory.
     */	
    testLoginByPasswordMethodReturnsTrueAndOpensNewSessionWhenAuthenticationSucceedsUsingDirectorySync: function () {
        var bSession = this._getSessionCookie();
        console.log("Old session: " + bSession);
        var res = this._directory.loginByPassword("in-directory", "password");
        Y.Assert.isTrue(res);
        var aSession = this._getSessionCookie();
        console.log("New session: " + aSession);
        Y.Assert.areNotSame(bSession, aSession, "New session expected");
    },
    
    /**
     * DRLSWAF-17. Check that loginByPassword method returns false when authentication is rejected.
     */	
    // testLoginByPasswordMethodReturnsFalseIfAuthenticationIsRejectedSync: function () {
        // var res = this._directory.loginByPassword("rejected-by-ls","whatever");
        // Y.Assert.isFalse(res);
    // },
    
    /**
     * DRLSWAF-18. Check that loginByPassword returns false when authentication is rejected using the directory.
     */	
    // testLoginByPasswordMethodReturnsFalseWhenAuthenticationIsRejectedUsingDirectorySync: function () {
        // var res = this._directory.loginByPassword("not-in-directory","whatever");
        // Y.Assert.isFalse(res);
    // },
    
    /**
     * DRLSWAF-19. Check that logout method exists.
     */	
    testLogoutMethodExists: function () {
        Y.Assert.isNotUndefined(this._directory.logout);
        Y.Assert.isFunction(this._directory.logout);
    }

    /**
     * DRLSWAF-20. Check that logout method returns true and invalidates the session.
     */	
    // testLogoutMethodInvalidatesSessionAndReturnsTrueSync: function () {
        // this._directory.login("accepted-by-ls", "password");
        // var bSession = this._getSessionCookie();
        // console.log("Old session: " + bSession);
        // var res = this._directory.logout();
        // Y.Assert.isTrue(res, "Should return true");
        // var aSession = this._getSessionCookie();
        // console.log("New session: " + aSession);
        // Y.Assert.areNotSame(bSession, aSession, "Cookie session should expire");
    // },
    
    /**
     * DRLSWAF-20. Check that logout method returns true and invalidates the session when the user is authenticated using the directory.
     */	
    // testLogoutMethodInvalidatesSessionAndReturnsTrueWhenAuthenticatedUsingDirectorySync: function () {
        // this._directory.login("in-directory", "password");
        // var bSession = this._getSessionCookie();
        // console.log("Old session: " + bSession);
        // var res = this._directory.logout();
        // Y.Assert.isTrue(res, "Should return true");
        // var aSession = this._getSessionCookie();
        // console.log("New session: " + aSession);
        // Y.Assert.areNotSame(bSession, aSession, "Cookie session should expire");
    // }
};

var testCase = _testCase;
var ignoreAll = false;
testCase._should = {
    ignore:function(){
        var ignored = {};
        for(var x in testCase){
            if(x.match(/^test/)){
                ignored[x]=ignoreAll;
                console.log(x);
            }
        }        
        return ignored;
    }.call()
}
