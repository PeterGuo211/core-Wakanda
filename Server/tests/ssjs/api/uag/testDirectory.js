
 
var _testCase = {
    name: "Test UAG SSJS API - Directory class",
  
    /**
     * UAG-SSJS-DR-1 Check that directory object exists
     */
    testDirectoryObjectExists: function() {
        Y.Assert.isNotUndefined(directory);
        Y.Assert.areSame("object", typeof directory);
        Y.Assert.isClassOf("Directory", directory);
    },
    
    /**
     * UAG-SSJS-DR-3 Check that internalStore attribute exists
     */
    testInternalStoreAttributeExists: function() {
        Y.Assert.isNotUndefined(directory.internalStore);
        Y.Assert.areSame("object", typeof directory.internalStore);
        Y.Assert.isClassOf("Datastore", directory.internalStore);
    },
    
    /**
     * UAG-SSJS-DR-4 Check that addGroup method exists
     */
    testAddGroupMethodExists: function() {
        Y.Assert.isNotUndefined(directory.addGroup);
        Y.Assert.isClassOf("Function", directory.addGroup);
    },
    
    /**
     * UAG-SSJS-DR-4 Check that addGroup method creates a new group in the solution's Directory and returns it as a Group object.
     */
    testAddGroupMethodCreatesNewGroupAndReturnsGroupObject: function() {
        var grpName = "newGroup";
        var grpObj = directory.addGroup(grpName);
        Y.Assert.isClassOf("Group", grpObj);
        grpObj = directory.group(grpName);
        try{
            Y.Assert.isClassOf("Group", grpObj);
            Y.Assert.areSame(grpName, grpObj.name);
        }finally{
            //clean
            grpObj.remove();
        }
    },
    
    /**
     * UAG-SSJS-DR-4 Check that addGroup method generate an error if the group name already exists in the datastore.
     */
    testAddGroupMethodGeneratesAnErrorIfGroupNameAlreadyExists: function() {
        var grpName = "newGroup";
        //first call
        directory.addGroup(grpName);
        //second call
        try{
            directory.addGroup(grpName);
            Y.Assert.fail("Should raise an exception");  
        }catch(e){
            
        }finally{
            //clean
            var toClean = directory.group(grpName);
            toClean.remove();
        }
    },
    
    /**
     * UAG-SSJS-DR-5 Check that addUser method exists
     */
    testAddUserMethodExists: function() {
        Y.Assert.isNotUndefined(directory.addUser);
        Y.Assert.isClassOf("Function", directory.addUser);
    },
    
    
    /**
     * UAG-SSJS-DR-5 Check that addUser method creates a new user in the solution's Directory and returns it as a User object.
     */
    testAddUserMethodCreatesNewUserAndReturnsUserObject: function() {
        var usrName = "newUser";
        var usrPwd = "whatever";
        var usrObj = directory.addUser(usrName, usrPwd);
        Y.Assert.isClassOf("User", usrObj);
        usrObj = directory.user(usrName);
        try{
            Y.Assert.isClassOf("User", usrObj);
            Y.Assert.areSame(usrName, usrObj.name);
        }finally{
            //clean
            usrObj.remove();
        }
    },
    
    /**
     * UAG-SSJS-DR-5 Check that addUser method generate an error if the user name already exists in the datastore.
     */
    testAddUserMethodGeneratesAnErrorIfUserNameAlreadyExists: function() {
        var usrName = "newUser";
        var usrPwd = "whatever";
        //first call
        directory.addUser(usrName, usrPwd);
        //second call
        try{
            directory.addUser(usrName);
            Y.Assert.fail("Should raise an exception");  
        }catch(e){
            
        }finally{
            //clean
            var toClean = directory.user(usrName);
            toClean.remove();
        }
    },
    
    /**
     * UAG-SSJS-DR-6 Check that computeHA1 method exists
     */
    testComputeHA1MethodExists: function() {
        Y.Assert.isNotUndefined(directory.computeHA1);
        Y.Assert.isClassOf("Function", directory.computeHA1);
    },
    
    /**
     * UAG-SSJS-DR-6 Check that computeHA1 method returns the correct HA1 key resulting from the combination of userName, password and realm parameters 
     */
    testComputeHA1MethodReturnsCorrectHA1Key: function() {
        var userName = "userName";
        var password = "password";
        var realm = "realm";
        var actual = directory.computeHA1(userName, password, realm);
        var expected = require("md5").MD5(userName + ":" + realm + ":" + password);
        Y.Assert.areSame(expected, actual);
    },
    
    /**
     * UAG-SSJS-DR-6 Check that computeHA1 method returns the correct HA1 key resulting from the combination of userName, password and default realm parameters when realm is not given 
     */
    testComputeHA1MethodReturnsCorrectHA1KeyWhenRealmIsNotGiven: function() {
        var userName = "userName";
        var password = "password";
        var defaultRealm = "Wakanda";
        var actual = directory.computeHA1(userName, password);
        var expected = require("md5").MD5(userName + ":" + defaultRealm + ":" + password);
        Y.Assert.areSame(expected, actual);
    },
    
    /**
     * UAG-SSJS-DR-7 Check that filterGroups method exists
     */
    testFilterGroupsMethodExists: function() {
        Y.Assert.isNotUndefined(directory.filterGroups);
        Y.Assert.isClassOf("Function", directory.filterGroups);
    },
    
    /**
     * UAG-SSJS-DR-7 Check that filterGroups method returns all groups whose name starts with filterString in the Directory.
     */
    testFilterGroupsMethodLogic: function() {
        var fstring = "*pFilter";
        var actual = directory.filterGroups(fstring);
        var expected = [
            
        {
            ID:"AFC2648008ACD34A8D14ED8A419E7BD5", 
            name:"GroupFilter2", 
            fullName:"GroupFilter2"
        },
        
        {
            ID:"83D9074C9AC41948B4265A8B52FD9EE6", 
            name:"GroupFilter1",  
            fullName:"GroupFilter1"
        },

        {
            ID:"1C7501B13C28594D9ADF3DEF14C2569E", 
            name:"GroupFilter3", 
            fullName:"GroupFilter3"
        }
        ];
        
        Y.Assert.areSame(expected.length, actual.length);
        
        // Sort arrays
        require("utils").sortBy(expected, "ID");
        require("utils").sortBy(actual, "ID");
        
        for(var i=0; i<actual.length; i++){        
            Y.ObjectAssert.areEqual(expected[i], actual[i]);
        }
    },
    
    /**
     * UAG-SSJS-DR-8 Check that filterUsers method exists
     */
    testFilterUsersMethodExists: function() {
        Y.Assert.isNotUndefined(directory.filterUsers);
        Y.Assert.isClassOf("Function", directory.filterUsers);
    },
    
    /**
     * UAG-SSJS-DR-8 Check that filterUsers method returns all users whose name starts with filterString in the Directory.
     */
    testFilterUsersMethodLogic: function() {
        var fstring = "*rFilter";
        var actual = directory.filterUsers(fstring);
        var expected = [
            
        {
            ID:"D77BB7A86C990A4AB0B3A7730801485C", 
            name:"userFilter2", 
            fullName:""
        },
        {
            ID:"1092D76D04DED84BBF761BD2312BE140", 
            name:"userFilter1",  
            fullName:""
        },
        {
            ID:"24B20582DF76D74E9BAC2E3406165280", 
            name:"userFilter3", 
            fullName:""
        }
        ];
        
        Y.Assert.areSame(expected.length, actual.length);
        
        // Sort arrays
        require("utils").sortBy(expected, "ID");
        require("utils").sortBy(actual, "ID");
        
        for(var i=0; i<actual.length; i++){        
            Y.ObjectAssert.areEqual(expected[i], actual[i]);
        }
    },
    
    /**
     * UAG-SSJS-DR-9 Check that getLoginListener method exists
     */
    testGetLoginListenerMethodExists: function() {
        Y.Assert.isNotUndefined(directory.getLoginListener);
        Y.Assert.isClassOf("Function", directory.getLoginListener);
        
    },
    
    /**
     * UAG-SSJS-DR-9 Check that getLoginListener method returns the name of the loginListener function set by setLoginListener( ) for the solution
     */
    testGetLoginListenerMethodReturnsNameOfLoginListenerFunctionWhenSetForSolution: function() {
        var ls = directory.getLoginListener();
        // When no login listener is set, it should return an empty string
        Y.Assert.areSame("", ls);
        
        // Set a login listener for the solution
        var expected = "mySolutionLogin";
        directory.setLoginListener(expected);
        
        // Check it out
        ls = directory.getLoginListener();
        Y.Assert.areSame(expected, ls);
        
        // Remove the login listener
        directory.setLoginListener("");
    },
    
    /**
     * UAG-SSJS-DR-9 Check that getLoginListener method returns the name of the loginListener function set by setLoginListener( ) for the project
     */
    testGetLoginListenerMethodReturnsNameOfLoginListenerFunctionWhenSetForProject: function() {
        try{
            var ls = directory.getLoginListener();
            // When no login listener is set, it should return an empty string
            Y.Assert.areSame("", ls);
        
            // Set a login listener for the project
            var expected = "myProjectLogin";
            directory.setLoginListener(expected);
        
            // Check it out
            ls = directory.getLoginListener();
            Y.Assert.areSame(expected, ls);
        }
        finally{
            // Remove the login listener
            directory.setLoginListener("");
        }
    },
    
    /**
     * UAG-SSJS-DR-10 Check that group method exists
     */
    testGroupMethodExists: function() {
        Y.Assert.isNotUndefined(directory.group);
        Y.Assert.isClassOf("Function", directory.group);
    },
    
    /**
     * UAG-SSJS-DR-10 Check that group method returns a Group object containing the group corresponding to the name passed in the name parameter. 
     */
    testGroupMethodReturnsCorrectGroupObjectWhenParameterIsName: function() {
        var expected = {
            ID: "FD208032751A944D9A36D8BF1DCD7134",
            name: "Default",
            fullName: "Default"
        };
        var grpObj = directory.group(expected.name);
        Y.Assert.isObject(grpObj);
        Y.Assert.isClassOf("Group", grpObj);
       
        Y.ObjectAssert.areEqual(expected, grpObj);
        
    },
        
    /**
     * UAG-SSJS-DR-10 Check that group method returns a Group object containing the group corresponding to the ID passed in the name parameter. 
     */
    testGroupMethodReturnsCorrectGroupObjectWhenParameterIsID: function() {
        var expected = {
            ID: "FD208032751A944D9A36D8BF1DCD7134",
            name: "Default",
            fullName: "Default"
        };
        var grpObj = directory.group(expected.ID);
        Y.Assert.isObject(grpObj);
        Y.Assert.isClassOf("Group", grpObj);

        Y.ObjectAssert.areEqual(expected, grpObj);
    },
    
    /**
     * UAG-SSJS-DR-10 Check that group method returns null if there is no Group with the given name or ID in the directory. 
     */
    testGroupMethodReturnsNullIfGroupDoesNotExists: function() {
        var grpName = "whatever";
        var grpObj = directory.group(grpName);
        Y.Assert.isNull(grpObj);
    },
    
    /**
     * UAG-SSJS-DR-11 Check that save method exists
     */
    testSaveExists: function() {
        Y.Assert.isNotUndefined(directory.save);
        Y.Assert.isClassOf("Function", directory.save);
    },
    
    
    /**
     * UAG-SSJS-DR-11 Check that save method saves all changes made to the open solution directory in the solution's directory file and returns true.
     */
    testSaveLogic: function() {
        // add a user
        var usrName = "toCkeckSaveMethod";
        directory.addUser(usrName);
        try{
            // save
            var res = directory.save();
            // should return true
            Y.Assert.isTrue(res);
            var dirContent = loadText(application.getFolder("path") + "../test.waDirectory");
            require("xpath/package");
            var ctx = new ExprContext(xmlParse(dirContent));
            var expr = xpathParse("count(//user[@name='" + usrName + "'])");
            var count = expr.evaluate(ctx).numberValue();
            Y.Assert.areSame(1, count);
        }finally{
            var usrObj = directory.user(usrName);
            usrObj.remove();
        }
    },
    
    /**
     * UAG-SSJS-DR-12 Check that setLoginListener method exists
     */
    testSetLoginListenerExists: function() {
        Y.Assert.isNotUndefined(directory.setLoginListener);
        Y.Assert.isClassOf("Function", directory.setLoginListener);
    },
    
    /**
     * UAG-SSJS-DR-12 Check that setLoginListener method logic when set for the solution
     */
    testSetLoginListenerLogicSolutionLevel: function() {
        try{
            // No login listener should be set
            var ls = directory.getLoginListener();
            Y.Assert.areSame("", ls);
        
            var validUser = {
                name: "accepted-by-ls-1", 
                password: "password"
            };
        
            // Login should fail
            var loggedin = application.loginByPassword(validUser.name, validUser.password);
            Y.Assert.isFalse(loggedin);
        
            // Set the login listener for the solution
            directory.setLoginListener("mySolutionLogin");
        
            // Login should pass
            loggedin = application.loginByPassword(validUser.name, validUser.password);
            Y.Assert.isTrue(loggedin);
        }finally{
            // Remove the login listener
            directory.setLoginListener("");
        }
    },
    
    /**
     * UAG-SSJS-DR-12 Check that setLoginListener method logic when set for the project
     */
    testSetLoginListenerLogicProjectLevel: function() {
        try{
            // No login listener should be set
            var ls = directory.getLoginListener();
            Y.Assert.areSame("", ls);
        
            var validUser = {
                name: "accepted-by-ls-2", 
                password: "password"
            };
        
            // Login should fail
            var loggedin = application.loginByPassword(validUser.name, validUser.password);
            Y.Assert.isFalse(loggedin);
        
            // Set the login listener for the solution
            directory.setLoginListener("myProjectLogin");
        
            // Login should pass
            loggedin = application.loginByPassword(validUser.name, validUser.password);
            Y.Assert.isTrue(loggedin);
        }finally{
            // Remove the login listener
            directory.setLoginListener("");
        }
    },
    
    /**
     * UAG-SSJS-DR-13 Check that user method exists
     */
    testUserExists: function() {
        Y.Assert.isNotUndefined(directory.user);
        Y.Assert.isClassOf("Function", directory.user);
    },
    
    /**
     * UAG-SSJS-DR-13 Check that user method returns a User object containing the user corresponding to the name passed in the name parameter. 
     */
    testUserReturnsCorrectGroupObjectWhenParameterIsName: function() {
        var expected = {
            ID: "918F70E95AF9EC42A4A6E08A76F37113",
            name: "default",
            fullName: "Default user"
        };
        var usrObj = directory.user(expected.name);
        Y.Assert.isObject(usrObj);
        Y.Assert.isClassOf("User", usrObj);
        Y.ObjectAssert.areEqual(expected, usrObj);
    },
    
    
    /**
     * UAG-SSJS-DR-13 Check that user method returns a User object containing the user corresponding to the ID passed in the name parameter. 
     */
    testUserReturnsCorrectGroupObjectWhenParameterIsID: function() {
        var expected = {
            ID: "918F70E95AF9EC42A4A6E08A76F37113",
            name: "default",
            fullName: "Default user"
        };
        var usrObj = directory.user(expected.ID);
        Y.Assert.isObject(usrObj);
        Y.Assert.isClassOf("User", usrObj);
        Y.ObjectAssert.areEqual(expected, usrObj);
    },
    
    /**
     * UAG-SSJS-DR-10 Check that user method returns null if there is no user with the given name or ID in the directory. 
     */
    testUserMethodReturnsNullIfUserDoesNotExists: function() {
        var usrName = "whatever";
        var usrObj = directory.user(usrName);
        Y.Assert.isNull(usrObj);
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
                
            }
        }   
        return ignored;
    }.call()
}

