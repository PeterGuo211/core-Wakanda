/**

 * @author ouissam.gouni@4d.com

 */
var _testCase = {
    
    name: "Test WAF Directory API",
    
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
        this._directory = WAF.directory;
        this._getSessionCookie();
        // delete session cookie before each unit test.
        this._invalidateCookie();
    },
    
    tearDown : function () {
        // logout after each unit test.
        this._directory.logout();
    },


    /**
     * DRWAF-01. Check that directory object exists
     */
    testDirectoryObjectExists: function() {
        Y.Assert.isNotUndefined(this._directory);
        Y.Assert.isObject(this._directory);
    },
    
    /**
     * DRWAF-02. Check that currentUser method exists
     */	
    testCurrentUserMethodExists: function () {
        Y.Assert.isNotUndefined(this._directory.currentUser);
        Y.Assert.isFunction(this._directory.currentUser);
    },
    
    /**
     * DRWAF-02. Check that currentUser method returns null when session is invalid.
     */	
    testCurrentUserMethodReturnsNullIfInvalidSession: function () {
        //session is invalidated in setUp function
        var user= this._directory.currentUser();
        Y.Assert.isNull(user);
    },
    
    /**
     * DRWAF-02. Check that currentUser method returns the correct user when session is valid.
     */	
    testCurrentUserMethodReturnsCorrectUserIfValidSession: function () {
        var loggedin = this._directory.login("user","password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var user= this._directory.currentUser();
        var expected = {
            ID: "F4588AA9C176A54F87BDA781C59524F6",
            userName: "user",
            fullName: ""
        };
        Y.ObjectAssert.areEqual(expected, user);
    },
    
    /**
     * DRWAF-03. Check that currentUserBelongsTo method exists
     */	
    testCurrentUserBelongsToMethodExists: function () {
        Y.Assert.isNotUndefined(this._directory.currentUserBelongsTo);
        Y.Assert.isFunction(this._directory.currentUserBelongsTo);
    },
    
    /**
     * DRWAF-03. Check that currentUserBelongsTo method returns true if the current user belongs to the group.
     */	
    testCurrentUserBelongsToMethodReturnsTrueIfCurrentUserBelongsToGroupUsingGroupID: function () {
        var loggedin = this._directory.login("user", "password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var id = "65ED884D09E08C49ACCC181AB4B9E80D";
        var actual = this._directory.currentUserBelongsTo(id);
        Y.Assert.isTrue(actual, "User should belong to group " + id);
        
    },
    
    /**
     * DRWAF-03. Check that currentUserBelongsTo method returns true if the current user belongs to the group.
     */	
    testCurrentUserBelongsToMethodReturnsTrueIfCurrentUserBelongsToGroupUsingGroupName: function () {
        var loggedin = this._directory.login("user", "password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var name = "Group";
        var actual = this._directory.currentUserBelongsTo(name);
        Y.Assert.isTrue(actual, "User should belong to group " + name);        
    },
    
    /**
     * DRWAF-03. Check that currentUserBelongsTo method returns true if the current user belongs to the group and that last is second level.
     */	
    testCurrentUserBelongsToMethodReturnsTrueIfCurrentUserBelongsToGroupWhenGroupIsSecondLevelUsingGroupID: function () {
        var loggedin = this._directory.login("grandson", "");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var id = "0FA0CBC9C5BDF544A06D031FA981DC00";
        var actual = this._directory.currentUserBelongsTo(id);
        Y.Assert.isTrue(actual, "User should belong to group " + id);
        
    },
    
    /**
     * DRWAF-03. Check that currentUserBelongsTo method returns true if the current user belongs to the group and that last is second level.
     */	
    testCurrentUserBelongsToMethodReturnsTrueIfCurrentUserBelongsToGroupWhenGroupIsSecondLevelUsingGroupName: function () {
        var loggedin = this._directory.login("grandson", "");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var name = "Parent";
        var actual = this._directory.currentUserBelongsTo(name);
        Y.Assert.isTrue(actual, "User should belong to group " + name);        
    },
    
    /**
     * DRWAF-03. Check that currentUserBelongsTo method if there is no current user defined in the session.
     */	
    testCurrentUserBelongsToMethodReturnsFalseIfSessionIsInvalid: function () {
        var user= this._directory.currentUser();
        Y.Assert.isNull(user);
        var actual = this._directory.currentUserBelongsTo("Group");
        Y.Assert.isFalse(actual, "Should return false because session is invalid");
    },
    
    /**
     * DRWAF-03. Check that currentUserBelongsTo method if the current user does not belong to the group.
     */	
    testCurrentUserBelongsToMethodReturnsFalseIfCurrentUserDoesNotBelongToGroupUsingGroupID: function () {
        var loggedin = this._directory.login("user", "password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var id = "8D06688C1A61B7409A947A8E78729937";
        var actual = this._directory.currentUserBelongsTo(id);
        Y.Assert.isFalse(actual, "User should not belong to group " + id);
    },
    
    /**
     * DRWAF-03. Check that currentUserBelongsTo method if the current user does not belong to the group.
     */	
    testCurrentUserBelongsToMethodReturnsFalseIfCurrentUserDoesNotBelongToGroupUsingGroupName: function () {
        var loggedin = this._directory.login("user", "password");
        Y.Assert.isTrue(loggedin, "User should be logged in");
        var name = "Empty";
        var actual = this._directory.currentUserBelongsTo(name);
        Y.Assert.isFalse(actual, "User should not belong to group " + name);
    },
    
    /**
     * DRWAF-04. Check that login method exists
     */	
    testLoginMethodExists: function () {
        Y.Assert.isNotUndefined(this._directory.login);
        Y.Assert.isFunction(this._directory.login);
    },
    
    /**
     * DRWAF-05. Check that login method returns true when user exists.
     */	
    testLoginMethodReturnsTrueAndOpensNewSessionIfUserExistsSync: function () {
        var bSession = this._getSessionCookie();
        console.log("Old session: " + bSession);
        var res = this._directory.login("user","password");
        Y.Assert.isTrue(res);
        var aSession = this._getSessionCookie();
        console.log("New session: " + aSession);
        Y.Assert.areNotSame(bSession, aSession, "New session expected");
    },
    
    /**
     * DRWAF-06. Check that login method returns true when user exists with an empty password.
     */	
    testLoginMethodReturnsTrueAndOpensNewSessionIfUserExistsWithEmptyPasswordSync: function () {
        var bSession = this._getSessionCookie();
        var res = this._directory.login("empty-pwd","");
        Y.Assert.isTrue(res);
        var aSession = this._getSessionCookie();
        Y.Assert.areNotSame(bSession, aSession, "New session expected");
    },
    
    /**
     * DRWAF-07. Check that login method returns false when user does not exists.
     */	
    testLoginMethodReturnsFalseIfUserDoesNotExistSync: function () {
        var res = this._directory.login("wrong","whatever");
        Y.Assert.isFalse(res);
    },
    
    /**
     * DRWAF-09. Check that login method returns false when user does not exists.
     */	
    testLoginMethodReturnsFalseWhenRightUserNameButWrongPasswordSync: function () {
        var res = this._directory.login("user","whatever");
        Y.Assert.isFalse(res);
    },
    
    /**
     * DRWAF-09. Check that loginByKey method exists
     */	
    testLoginByKeyMethodExists: function () {
        Y.Assert.isNotUndefined(this._directory.loginByKey);
        Y.Assert.isFunction(this._directory.loginByKey);
    },
    
    /**
     * DRWAF-10. Check that loginByKey method returns true when user exists.
     */	
    testLoginByKeyMethodReturnsTrueAndOpensNewSessionIfUserExistsSync: function () {
        var bSession = this._getSessionCookie();
        console.log("Old session: " + bSession);
        var res = this._directory.loginByKey("user","0bc3f3f679892b29c99dd7c4fcc3c8bb");
        Y.Assert.isTrue(res);
        var aSession = this._getSessionCookie();
        console.log("New session: " + aSession);
        Y.Assert.areNotSame(bSession, aSession, "New session expected");
    },
    
    /**
     * DRWAF-11. Check that loginByKey method returns true when user exists with an empty password.
     */	
    testLoginByKeyMethodReturnsTrueAndOpensNewSessionIfUserExistsWithEmptyPasswordSync: function () {
        var bSession = this._getSessionCookie();
        console.log("Old session: " + bSession);
        var res = this._directory.loginByKey("empty-pwd", "");
        Y.Assert.isTrue(res);
        var aSession = this._getSessionCookie();
        console.log("New session: " + aSession);
        Y.Assert.areNotSame(bSession, aSession, "New session expected");
    },
    
    /**
     * DRWAF-12. Check that login method returns false when user does not exists.
     */	
    testLoginByKeyMethodReturnsFalseIfUserDoesNotExistSync: function () {
        var res = this._directory.loginByKey("whatever-user","whatever-key");
        Y.Assert.isFalse(res);
    },
    
    /**
     * DRWAF-13. Check that login method returns false when user does not exists.
     */	
    testLoginByKeyMethodReturnsFalseWhenRightUserNameButWrongKeySync: function () {
        var res = this._directory.loginByKey("user","whatever-key");
        Y.Assert.isFalse(res);
    },
    
    /**
     * DRWAF-14. Check that loginByPassword method exists
     */	
    testLoginByPasswordMethodExists: function () {
        Y.Assert.isNotUndefined(this._directory.loginByPassword);
        Y.Assert.isFunction(this._directory.loginByPassword);
    },
    
    /**
     * DRWAF-15. Check that loginByPassword method returns true when user exists.
     */	
    testLoginByPasswordMethodReturnsTrueAndOpensNewSessionIfUserExistsSync: function () {
        var bSession = this._getSessionCookie();
        console.log("Old session: " + bSession);
        var res = this._directory.loginByPassword("user","password");
        Y.Assert.isTrue(res);
        var aSession = this._getSessionCookie();
        console.log("New session: " + aSession);
        Y.Assert.areNotSame(bSession, aSession, "New session expected");
    },
    
    /**
     * DRWAF-16. Check that loginByPassword method returns true when user exists with an empty password.
     */	
    testLoginByPasswordMethodReturnsTrueAndOpensNewSessionIfUserExistsWithEmptyPasswordSync: function () {
        var bSession = this._getSessionCookie();
        console.log("Old session: " + bSession);
        Y.Assert.areNotSame(bSession, aSession, "New session expected");
        var res = this._directory.loginByPassword("empty-pwd", "");
        Y.Assert.isTrue(res);
        var aSession = this._getSessionCookie();
        console.log("New session: " + aSession);
        Y.Assert.areNotSame(bSession, aSession, "New session expected");
    },
    
    /**
     * DRWAF-17. Check that loginByPassword method returns false when user does not exists.
     */	
    testLoginByPasswordMethodReturnsFalseIfUserDoesNotExistSync: function () {
        var res = this._directory.loginByPassword("whatever","whatever");
        Y.Assert.isFalse(res);
    },
    
    /**
     * DRWAF-18. Check that loginByPassword method returns false when user does not exists.
     */	
    testLoginByPasswordMethodReturnsFalseWhenRightUserNameButWrongPasswordSync: function () {
        var res = this._directory.loginByPassword("user","whatever");
        Y.Assert.isFalse(res);
    },
    
    /**
     * DRWAF-19. Check that logout method exists.
     */	
    testLogoutMethodExists: function () {
        Y.Assert.isNotUndefined(this._directory.logout);
        Y.Assert.isFunction(this._directory.logout);
    },

    /**
     * DRWAF-20. Check that logout method returns true and invalidates the session.
     */	
    testLogoutMethodInvalidatesSessionAndReturnsTrueSync: function () {
        this._directory.login("user", "password");
        var bSession = this._getSessionCookie();
        console.log("Old session: " + bSession);
        var res = this._directory.logout();
        Y.Assert.isTrue(res, "Should return true");
        var aSession = this._getSessionCookie();
        console.log("New session: " + aSession);
        Y.Assert.areNotSame(bSession, aSession, "Cookie session should expire");
    },
    
    /**
     * DRWAF-20. Check that logout method returns true and invalidates the session.
     */	
    testLogoutMethodInvalidatesSessionAndReturnsTrueAsync: function () {
        var runner = this;
        this._directory.login("user", "password");
        var bSession = this._getSessionCookie();
        console.log("Old session: " + bSession);
        this._directory.logout(
        {
            'onSuccess': function(event){
                runner.resume(function(){ 
                    console.log(event);
                    Y.Assert.isTrue(event.result, "Should return true");
                    var aSession = this._getSessionCookie();
                    console.log("New session: " + aSession);
                    Y.Assert.areNotSame(bSession, aSession, "Cookie session should expire")
                });
            },
            'onError': function(error){
                runner.resume(function(){ 
                    Y.Assert.fail("Failure: " + error);
                });	
            }
        }
        );
            
        runner.wait();

    }

}

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