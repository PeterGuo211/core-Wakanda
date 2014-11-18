
 
var _testCase = {
    name: "Test UAG SSJS API - Session class",
  
    /**
     * UAG-SSJS-SES-1 Check that storage attribute exists
     */
    testStorageAtributeExists: function() {
        var session = application.currentSession();
        Y.Assert.isNotUndefined(session.storage);
        Y.Assert.areSame("object", typeof session.storage);
        Y.Assert.isClassOf("Storage", session.storage);
    },
    
    
    /**
     * UAG-SSJS-SES-2 Check that storage property returns the Storage object associated with the current user session
     */
    testStorageAtributeReturnsStorageObjectAssociatedWithCurrentUserSession: function() {
        directory.setLoginListener("mySolutionLogin");
        var loggedin = application.loginByPassword("check-storage");
        try{
            Y.Assert.isTrue(loggedin, "Should be logged in");
            var session = application.currentSession();
            var userStorage = session.storage;
            Y.Assert.isNotNull(userStorage, "storage should not be null");
            var expected = {
                prop1 : "value1",
                prop2 : "value2"
            };
            Y.ObjectAssert.areEqual(expected, userStorage);
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-3 Check that storage property gives a direct access to the sessionStorage application property for the session
     */
    testStorageAtributeGivesDirectAccessToSessionStorageApplicationPropertyForTheSession: function() {
        directory.setLoginListener("mySolutionLogin");
        var userName = "check-storage";
        var loggedin = application.loginByPassword(userName);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var userStorage = session.storage;
            Y.Assert.isNotNull(userStorage, "storage should not be null");
            Y.ObjectAssert.areEqual(application.sessionStorage, userStorage);
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-4 Check that user attribute exists
     */
    testUserAtributeExists: function() {
        var session = application.currentSession();
        Y.Assert.isNotUndefined(session.user);
        Y.Assert.areSame("object", typeof session.user);
        Y.Assert.isClassOf("User", session.user);
    },
    
    /**
     * UAG-SSJS-SES-5 Check that user attribute returns the User who runs the session on the server.
     */
    testUserAtributeReturnsUserWhoRunsSession: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var user = session.user;
            var expected = {
                name: "default",
                ID: "918F70E95AF9EC42A4A6E08A76F37113",
                fullName: "Default user"
            };
            Y.ObjectAssert.areEqual(expected, user, "User attribute value is wrong");
            //check storage
            Y.Assert.areSame(0, user.storage.length, "User storage should be empty");
        }finally{
            application.logout();
        }
        
    },
  
    /**
     * UAG-SSJS-SES-6 Check that user attribute returns default user if the session is run by a non-logged user
     */
    testUserAtributeReturnsDefaultUserIfNonLoggedUser: function() {
        try{
            var session = application.currentSession();
            var user = session.user;
            var expected = {
                name: "default guest",
                ID: "00000000000000000000000000000000",
                fullName: "default guest"
            };
            Y.ObjectAssert.areEqual(expected, user, "User attribute value is wrong");
            //check storage
            Y.Assert.areSame(0, user.storage.length, "User storage should be empty");
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-7 Check that belongsTo method exists
     */
    testBelongsToMethodExists: function() {
        var session = application.currentSession();
        Y.Assert.isNotUndefined(session.belongsTo);
        Y.Assert.isClassOf("Function", session.belongsTo);
    },
    
    /**
     * UAG-SSJS-SES-8 Check that belongsTo returns true if the current session belongs to the group when the group name is passed as argument
     */
    testBelongsToMethodReturnsTrueIfCurrentSessionBelongsToGroupWhenGroupNameIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = "Default";
            var res = session.belongsTo(group);
            Y.Assert.isTrue(res, "Should return true");
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-9 Check that belongsTo returns true if the current session belongs to the group when the group ID is passed as argument
     */
    testBelongsToMethodReturnsTrueIfCurrentSessionBelongsToGroupWhenGroupIDIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = "FD208032751A944D9A36D8BF1DCD7134";
            var res = session.belongsTo(group);
            Y.Assert.isTrue(res, "Should return true");
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-10 Check that belongsTo returns true if the current session belongs to the group when the group reference is passed as argument.
     */
    testBelongsToMethodReturnsTrueIfCurrentSessionBelongsToGroupWhenGroupReferenceIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = directory.group("Default");
            var res = session.belongsTo(group);
            Y.Assert.isTrue(res, "Should return true");
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-11 Check that belongsTo returns false if the current session does not belong to the group when the group name is passed as argument.
     */
    testBelongsToMethodReturnsFalseIfCurrentSessionDoesNotBelongToGroupWhenGroupNameIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = "Other";
            var res = session.belongsTo(group);
            Y.Assert.isFalse(res, "Should return false");
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-12 Check that belongsTo returns false if the current session does not belong to the group when the group ID is passed as argument.
     */
    testBelongsToMethodReturnsFalseIfCurrentSessionDoesNotBelongToGroupWhenGroupIDIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = "E885855BB9C2064298983EE268DF1132";
            var res = session.belongsTo(group);
            Y.Assert.isFalse(res, "Should return false");
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-13 Check that belongsTo returns false if the current session does not belong to the group when the group name is passed as argument.
     */
    testBelongsToMethodReturnsFalseIfCurrentSessionDoesNotBelongToGroupWhenGroupReferenceIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = directory.group("Other");
            var res = session.belongsTo(group);
            Y.Assert.isFalse(res, "Should return false");
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-14 Check that belongsTo returns false if the group does not exist.
     */
    testBelongsToMethodReturnsFalseIfGroupDoesNotExist: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = directory.group("Whatever");
            var res = session.belongsTo(group);
            Y.Assert.isFalse(res, "Should return false");
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-15 Check that "checkPermission" method exists
     */
    testCheckPermissionMethodExists: function() {
        var session = application.currentSession();
        Y.Assert.isNotUndefined(session.checkPermission);
        Y.Assert.isClassOf("Function", session.checkPermission);
    },
    
    /**
     * UAG-SSJS-SES-16 Check that "checkPermission" returns true if the current session belongs to the group when the group name is passed as argument
     */
    testCheckPermissionMethodReturnsTrueIfCurrentSessionBelongsToGroupWhenGroupNameIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = "Default";
            var res = session.checkPermission(group);
            Y.Assert.isTrue(res, "Should return true");
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-17 Check that "checkPermission" returns true if the current session belongs to the group when the group ID is passed as argument
     */
    testCheckPermissionMethodReturnsTrueIfCurrentSessionBelongsToGroupWhenGroupIDIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = "FD208032751A944D9A36D8BF1DCD7134";
            var res = session.checkPermission(group);
            Y.Assert.isTrue(res, "Should return true");
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-18 Check that "checkPermission" returns true if the current session belongs to the group when the group reference is passed as argument.
     */
    testCheckPermissionMethodReturnsTrueIfCurrentSessionBelongsToGroupWhenGroupReferenceIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = directory.group("Default");
            var res = session.checkPermission(group);
            Y.Assert.isTrue(res, "Should return true");
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-19 Check that "checkPermission" throws an exception if the current session does not belong to the group when the group name is passed as argument.
     */
    testCheckPermissionMethodThrowsExceptionIfCurrentSessionDoesNotBelongToGroupWhenGroupNameIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = "Other";
            try{
                session.checkPermission(group);
            }catch(e){
                Y.Assert.areSame("Current session failed permission for group Other", e.message);
            }
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-20 Check that "checkPermission" throws an exception if the current session does not belong to the group when the group ID is passed as argument.
     */
    testCheckPermissionMethodThrowsExceptionIfCurrentSessionDoesNotBelongToGroupWhenGroupIDIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = "E885855BB9C2064298983EE268DF1132";
            try{
                session.checkPermission(group);
            }catch(e){
                Y.Assert.areSame("Current session failed permission for group Other", e.message);
            }
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-21 Check that "checkPermission" throws an exception if the current session does not belong to the group when the group name is passed as argument.
     */
    testCheckPermissionMethodThrowsExceptionIfCurrentSessionDoesNotBelongToGroupWhenGroupReferenceIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = directory.group("Other");
            try{
                session.checkPermission(group);
            }catch(e){
                Y.Assert.areSame("Current session failed permission for group Other", e.message);
            }
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-22 Check that "promoteWith" method exists
     */
    testPromoteWithMethodExists: function() {
        var session = application.currentSession();
        Y.Assert.isNotUndefined(session.promoteWith);
        Y.Assert.isClassOf("Function", session.promoteWith);
    },
    
    /**
     * UAG-SSJS-SES-23 Check that "promoteWith" method promotes the current session into the group when the group name is passed as argument.
     */
    testPromoteWithMethodPromotesSessionIntoTheGroupWhenGroupNameIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = "PromoteWith-1";
            var belongsTo = session.belongsTo(group);
            Y.Assert.isFalse(belongsTo, "Session should not belongs to group \"" + group + "\"" );
            var token = session.promoteWith(group);
            Y.Assert.isTrue(token!=0, "Returned value should be different from 0");
            belongsTo = session.belongsTo(group);
            Y.Assert.isTrue(belongsTo, "Session should now belongs to group \"" + group + "\"" );
            
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-24 Check that "promoteWith" method promotes the current session into the group when the group ID is passed as argument.
     */
    testPromoteWithMethodPromotesSessionIntoTheGroupWhenGroupIDIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = "AF956ABEA978F4469F505EAC5928DA49";
            var belongsTo = session.belongsTo(group);
            Y.Assert.isFalse(belongsTo, "Session should not belongs to group \"" + group + "\"" );
            var token = session.promoteWith(group);
            Y.Assert.isTrue(token!=0, "Returned value should be different from 0");
            belongsTo = session.belongsTo(group);
            Y.Assert.isTrue(belongsTo, "Session should now belongs to group \"" + group + "\"" );
            
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-25 Check that "promoteWith" method promotes the current session into the group when the group reference is passed as argument.
     */
    testPromoteWithMethodPromotesSessionIntoTheGroupWhenGroupReferenceIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = directory.group("PromoteWith-3");
            var belongsTo = session.belongsTo(group);
            Y.Assert.isFalse(belongsTo, "Session should not belongs to group \"" + group + "\"" );
            var token = session.promoteWith(group);
            Y.Assert.isTrue(token!=0, "Returned value should be different from 0");
            belongsTo = session.belongsTo(group);
            Y.Assert.isTrue(belongsTo, "Session should now belongs to group \"" + group + "\"" );
            
        }finally{
            application.logout();
        }
    },
    
    
    /**
     * UAG-SSJS-SES-26 Check that "promoteWith" method returns 0 when the user already belongs to the group, and group name is passed as argument.
     */
    testPromoteWithMethodReturnsZeroWhenUserBelongsToGroupAndGroupNameIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = "Default";
            var belongsTo = session.belongsTo(group);
            Y.Assert.isTrue(belongsTo, "Session should belongs to group \"" + group + "\"" );
            var token = session.promoteWith(group);
            Y.Assert.areSame(0, token, "Returned token should equal 0");            
        }finally{
            application.logout();
        }
    },
    
    
    /**
     * UAG-SSJS-SES-27 Check that "promoteWith" method returns 0 when the user already belongs to the group, and group ID is passed as argument.
     */
    testPromoteWithMethodReturnsZeroWhenUserBelongsToGroupAndGroupIDIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = "FD208032751A944D9A36D8BF1DCD7134";
            var belongsTo = session.belongsTo(group);
            Y.Assert.isTrue(belongsTo, "Session should belongs to group \"" + group + "\"" );
            var token = session.promoteWith(group);
            Y.Assert.areSame(0, token, "Returned token should equal 0");
            
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-28 Check that "promoteWith" method returns 0 when the user already belongs to the group, and group reference is passed as argument.
     */
    testPromoteWithMethodReturnsZeroWhenUserBelongsToGroupAndGroupReferenceIsUsed: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = directory.group("Default");
            var belongsTo = session.belongsTo(group);
            Y.Assert.isTrue(belongsTo, "Session should belongs to group \"" + group + "\"" );
            var token = session.promoteWith(group);
            Y.Assert.areSame(0, token, "Returned token should equal 0");            
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-29 Check that "promoteWith" method returns 0 when user access rights are higher than those of the group, and group name is passed as argument.
     */
    testPromoteWithMethodReturnsZeroWhenUserAccessRightsAreHigherAndGroupNameIsUsed: function() {
        var userName = "promotewith-higher";
        var userPwd = "";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var groupName = "LowerAccessRight";
            //check that group exists to avoid false success
            var group = directory.group(groupName);
            Y.Assert.isNotNull(group, groupName + " must exist");
            //Promote
            var token = session.promoteWith(groupName);
            Y.Assert.areSame(0, token, "Returned token should equal 0");            
        }finally{
            application.logout();
        }
    },
    
    /**
     * UAG-SSJS-SES-30 Check that "promoteWith" method returns 0 when user access rights are higher than those of the group, and group reference is passed as argument.
     */
    testPromoteWithMethodReturnsZeroWhenUserAccessRightsAreHigherAndGroupIDIsUsed: function() {
        var userName = "promotewith-higher";
        var userPwd = "";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var groupID = "DCBC8CEA542C964F8D1AC63E610372B1";
            //check that group exists to avoid false success
            var group = directory.group(groupID);
            Y.Assert.isNotNull(group, groupID + " must exist");
            //Promote
            var token = session.promoteWith(group);
            Y.Assert.areSame(0, token, "Returned token should equal 0");            
        }finally{
            application.logout();
        }
    },
    
    
    /**
     * UAG-SSJS-SES-30 Check that "promoteWith" method returns 0 when user access rights are higher than those of the group, and group reference is passed as argument.
     */
    testPromoteWithMethodReturnsZeroWhenUserAccessRightsAreHigherAndGroupReferenceIsUsed: function() {
        var userName = "promotewith-higher";
        var userPwd = "";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var groupName = "LowerAccessRight";
            //check that group exists to avoid false success
            var group = directory.group(groupName);
            Y.Assert.isNotNull(group, groupName + " must exist");
            //Promote
            var token = session.promoteWith(group);
            Y.Assert.areSame(0, token, "Returned token should equal 0");            
        }finally{
            application.logout();
        }
    },
    
    /*
     * UAG-SSJS-SES-31 Check that "promoteWith" method exists
     */
    testUnPromoteMethodExists: function() {
        var session = application.currentSession();
        Y.Assert.isNotUndefined(session.unPromote);
        Y.Assert.isClassOf("Function", session.unPromote);
    },
        
    /*
     * UAG-SSJS-SES-31 Check that "unPromote" method stops the promotion set for the current session.
     */
    /* testUnPromoteMethodStopsPromotionSetForCurrentSession: function() {
        var userName = "default";
        var userPwd = "password";
        var loggedin = application.loginByPassword(userName, userPwd);
        try{
            Y.Assert.isTrue(loggedin, "User: " + userName + " should be logged in");
            var session = application.currentSession();
            var group = "PromoteWith-1";
            var belongsTo = session.belongsTo(group);
            Y.Assert.isFalse(belongsTo, "Session should not belongs to group \"" + group + "\"" );
            var token = session.promoteWith(group);
            Y.Assert.isTrue(token!=0, "Returned value should be different from 0");
            belongsTo = session.belongsTo(group);
            Y.Assert.isTrue(belongsTo, "Session should now belongs to group \"" + group + "\"" );
            session.unPromote(token);
            belongsTo = session.belongsTo(group);
            Y.Assert.isFalse(belongsTo, "Session should not belongs to group \"" + group + "\" anymore" );
        }finally{
            application.logout();
        }
    }, */
    
   
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

