
var utils = require("utils");
var _testCase = {
    name: "Test UAG SSJS API - User class",
  
    /**
     * UAG-SSJS-USR-1 Check that "fullName" attribute exists and returns the right value
     */
    testFullNameAttributeExists: function() {
        var user = directory.user("default");
        Y.Assert.isNotUndefined(user.fullName);
        Y.Assert.areSame("string", typeof user.fullName);
    },
    
    /**
     * UAG-SSJS-USR-2 Check that "fullName" attribute returns the right value
     */
    testFullNameAttributeLogic: function() {
        var user = directory.user("default");
        Y.Assert.areSame("Default user", user.fullName);
    },
    
    /**
     * UAG-SSJS-USR-3 Check that "ID" attribute exists
     */
    testIDAttributeExists: function() {
        var user = directory.user("default");
        Y.Assert.isNotUndefined(user.ID);
        Y.Assert.areSame("string", typeof user.ID);
    },
    
    /**
     * UAG-SSJS-USR-4 Check that "ID" attribute returns the right value
     */
    testIDAttributeLogic: function() {
        var user = directory.user("default");
        Y.Assert.areSame("918F70E95AF9EC42A4A6E08A76F37113", user.ID);
    },
        
    /**
     * UAG-SSJS-USR-5 Check that "name" attribute exists
     */
    testNameAttributeExists: function() {
        var user = directory.user("default");
        Y.Assert.isNotUndefined(user.name);
        Y.Assert.areSame("string", typeof user.name);
    },
    
    /**
     * UAG-SSJS-USR-6 Check that "name" attribute  returns the right value
     */
    testNameAttributeLogic: function() {
        var user = directory.user("default");
        Y.Assert.areSame("default", user.name);
    },
    
    /**
     * UAG-SSJS-USR-7 Check that "storage" attribute exists
     */
    testStorageAttributeExists: function() {
        // Get storage attribute
        var user = directory.user("default");
        var storage = user.storage;
        
        //Check existance and type
        Y.Assert.isNotUndefined(storage);
        Y.Assert.areSame("object", typeof storage);
        Y.Assert.isClassOf("Storage", storage);
    },
    
    /**
     * UAG-SSJS-USR-8 Check that "storage" attribute returns the right value
     */
    /* testStorageAttributeLogic: function() {
        // From directory
        var user = directory.user("default");
        var storage = user.storage;
        Y.ObjectAssert.areEqual({}, storage);
        
        // From login listener
        try{
            // No login listener should be set
            var ls = directory.getLoginListener();
            Y.Assert.areSame("", ls);

            // Set the login listener for the solution
            directory.setLoginListener("mySolutionLogin");
        
            // Login should pass
            loggedin = application.loginByPassword("check-storage", "");
            Y.Assert.isTrue(loggedin);
            
            // Get the current user
            var currentUser = application.currentUser();
            var expectedUser = {
                ID: "AE0C207836088845B764C5A6BB3286A2",
                name: "check-storage",
                fullName:""
            }
            // Check the current user
            Y.ObjectAssert.areEqual(expectedUser, currentUser);
            
            // Check storage
            var expectedStorage = {
                prop1:"value1", 
                prop2:"value2"
            };
            var actualStorage = currentUser.storage;
            
            Y.Assert.isNotUndefined(actualStorage);
            Y.Assert.areSame("object", typeof actualStorage);
            Y.Assert.isClassOf("Storage", storage);
            
            Y.ObjectAssert.areEqual(expectedStorage, actualStorage, "User storage is empty or values are wrong");
        }finally{
            // Remove the login listener
            directory.setLoginListener("");
        }
        
    }, */
    
    /**
     * UAG-SSJS-USR-9 Check that "filterParents" method exists
     */
    testFilterParentsMethodExists: function() {
        var user = directory.user("default");
        Y.Assert.isNotUndefined(user.filterParents);
        Y.Assert.isClassOf("Function", user.filterParents);
    },
    
    /**
     * UAG-SSJS-USR-10 Check that "filterParents" method returns an array of the groups to which the User belongs, filtered using the filterString parameter
     */
    testFilterParentsMethodReturnsFiltredParentGroupsOfAllLevelsByDefaultIfFilterStringIsNotEmpty: function() {
        var user = directory.user("check-parents");
        var fstring = "*Filter";
        var actual = user.filterParents(fstring);
        var expected = [
        {
            name: "Level-Filter-1.2",
            ID: "52EF76B0B79D5D43A4C457D241466B7C",
            fullName: "Level-Filter-1.2"
        },

        {
            name: "Level-Filter-3.2", 
            ID: "78069F4EBF72F9458CC17108FE59D645",
            fullName: "Level-Filter-3.2"
        },

        {
            name: "Level-Filter-2.3",
            ID: "3488823CC1B2864FA4ED7A1C8B882AC9",
            fullName: "Level-Filter-2.3"
        },
        {
            name: "Level-Filter-1.4",
            ID: "1BE82203957F1D4CB70270F77710FF74",
            fullName: "Level-Filter-1.4"
        }
        ];
        
        Y.Assert.areSame(expected.length, actual.length);
        
        // Sort arrays
        utils.sortBy(expected, "ID");
        utils.sortBy(actual, "ID");
        
        for(var i=0; i<actual.length; i++){        
            Y.ObjectAssert.areEqual(expected[i], actual[i]);
        }
        
    },
    
    /**
     * UAG-SSJS-USR-11 Check that "filterParents" method returns all groups to which the User belongs if an empty string is passed.
     */
    testFilterParentsMethodReturnsAllParentGroupsOfAllLevelsIfFilterStringIsEmpty: function() {
        var user = directory.user("check-parents");
        var fstring = "";
        var actual = user.filterParents(fstring);
        var expected = [
        {          
            name: "Level-1.1",
            ID: "B240BEDD438196478C7C235B8D04132F",
            fullName: "Level-1.1"
        },
        {
            name: "Level-2.1",
            ID: "AEAC9CAEC81F634B973B2EEA69292C7C",
            fullName: "Level-2.1"  
        },
        {
            name: "Level-3.1",
            ID: "EB2F520B61BEBE44BF5B9589422DFA13",
            fullName: "Level-3.1"
        },
        
        {
            name: "Level-2.2",
            ID: "DE8488729CB851408777E241D33E3113",
            fullName: "Level-2.2"  
        },
        {
            name: "Level-1.3",
            ID: "B5B3FE898CA3A940B7F69C501A0D9D5B",
            fullName: "Level-1.3"

        },
        {
            name: "Level-Filter-1.2",
            ID: "52EF76B0B79D5D43A4C457D241466B7C",
            fullName: "Level-Filter-1.2"
        },

        {
            name: "Level-Filter-3.2", 
            ID: "78069F4EBF72F9458CC17108FE59D645",
            fullName: "Level-Filter-3.2"
        },

        {
            name: "Level-Filter-2.3",
            ID: "3488823CC1B2864FA4ED7A1C8B882AC9",
            fullName: "Level-Filter-2.3"
        },
        {
            name: "Level-Filter-1.4",
            ID: "1BE82203957F1D4CB70270F77710FF74",
            fullName: "Level-Filter-1.4"
        }
        ];
        
        Y.Assert.areSame(expected.length, actual.length);
        
        // Sort arrays
        utils.sortBy(expected, "ID");
        utils.sortBy(actual, "ID");
        
        for(var i=0; i<actual.length; i++){        
            Y.ObjectAssert.areEqual(expected[i], actual[i]);
        }
        
    },
    
    /**
     * UAG-SSJS-USR-12 Check that "filterParents" method returns only the groups to which the User is directly assigned, filtered using the filterString, if true is passed in the level parameter
     */
    testFilterParentsMethodReturnsOnlyFiltredFirstLevelParentsIf_True_IsPassedInLevelParam: function() {
        var user = directory.user("check-parents");
        var fstring = "*Filter";
        var actual = user.filterParents(fstring, true);
        var expected = [
        {
            name: "Level-Filter-1.2",
            ID: "52EF76B0B79D5D43A4C457D241466B7C",
            fullName: "Level-Filter-1.2"
        },
        {
            name: "Level-Filter-1.4",
            ID: "1BE82203957F1D4CB70270F77710FF74",
            fullName: "Level-Filter-1.4"
        }
        ];
        
        Y.Assert.areSame(expected.length, actual.length);
        
        // Sort arrays
        utils.sortBy(expected, "ID");
        utils.sortBy(actual, "ID");
        
        for(var i=0; i<actual.length; i++){        
            Y.ObjectAssert.areEqual(expected[i], actual[i]);
        }
        
    },
    
    /**
     * UAG-SSJS-USR-13 Check that "filterParents" method returns only the groups to which the User is directly assigned, filtered using the filterString, if "firstLevel" is passed in the level parameter
     */
    testFilterParentsMethodReturnsOnlyFiltredFirstLevelParentsIf_FirstLevel_IsPassedInLevelParam: function() {
        var user = directory.user("check-parents");
        var fstring = "*Filter";
        var actual = user.filterParents(fstring, "firstLevel");
        var expected = [
        {
            name: "Level-Filter-1.2",
            ID: "52EF76B0B79D5D43A4C457D241466B7C",
            fullName: "Level-Filter-1.2"
        },
        {
            name: "Level-Filter-1.4",
            ID: "1BE82203957F1D4CB70270F77710FF74",
            fullName: "Level-Filter-1.4"
        }
        ];
        
        Y.Assert.areSame(expected.length, actual.length);
        
        // Sort arrays
        utils.sortBy(expected, "ID");
        utils.sortBy(actual, "ID");
        
        for(var i=0; i<actual.length; i++){        
            Y.ObjectAssert.areEqual(expected[i], actual[i]);
        }
        
    },
    /**
     * UAG-SSJS-USR-14 Check that "filterParents" method returns all the parents groups of User, filtered using the filterString parameter, if "false" is passed in level parameter.
     */
    testFilterParentsMethodReturnsFiltredParentsOfAllLevelsIf_False_IsPassedInLevelParam: function() {
        var user = directory.user("check-parents");
        var fstring = "*Filter-*2";
        var actual = user.filterParents(fstring, false);
        var expected = [
        {
            name: "Level-Filter-1.2",
            ID: "52EF76B0B79D5D43A4C457D241466B7C",
            fullName: "Level-Filter-1.2"
        },
        {
            name: "Level-Filter-3.2", 
            ID: "78069F4EBF72F9458CC17108FE59D645",
            fullName: "Level-Filter-3.2"
        },
        {
            name: "Level-Filter-2.3",
            ID: "3488823CC1B2864FA4ED7A1C8B882AC9",
            fullName: "Level-Filter-2.3"
        }
        ];
        
        Y.Assert.areSame(expected.length, actual.length);
        
        // Sort arrays
        utils.sortBy(expected, "ID");
        utils.sortBy(actual, "ID");
        
        for(var i=0; i<actual.length; i++){        
            Y.ObjectAssert.areEqual(expected[i], actual[i]);
        }
        
    },
    
    /**
     * UAG-SSJS-USR-15 Check that "filterParents" method returns all the parents groups of User, filtered using the filterString parameter, if "allLevels" is passed in level parameter.
     */
    testFilterParentsMethodReturnsFiltredParentsOfAllLevelsIf_AllLevels_IsPassedInLevelParam: function() {
        var user = directory.user("check-parents");
        var fstring = "*Filter-*2";
        var actual = user.filterParents(fstring, "allLevels");
        var expected = [
        {
            name: "Level-Filter-1.2",
            ID: "52EF76B0B79D5D43A4C457D241466B7C",
            fullName: "Level-Filter-1.2"
        },
        {
            name: "Level-Filter-3.2", 
            ID: "78069F4EBF72F9458CC17108FE59D645",
            fullName: "Level-Filter-3.2"
        },
        {
            name: "Level-Filter-2.3",
            ID: "3488823CC1B2864FA4ED7A1C8B882AC9",
            fullName: "Level-Filter-2.3"
        }
        ];
        
        Y.Assert.areSame(expected.length, actual.length);
        
        // Sort arrays
        utils.sortBy(expected, "ID");
        utils.sortBy(actual, "ID");
        
        for(var i=0; i<actual.length; i++){        
            Y.ObjectAssert.areEqual(expected[i], actual[i]);
        }
        
    },
    
    /**
     * UAG-SSJS-USR-16 Check that "filterParents" method returns an empty array if no group whose name meets the filterString is found.
     */
    testFilterParentsMethodReturnsAnEmptyArrayIfNoParentGroupMatchesTheFilterString: function() {
        var user = directory.user("check-parents");
        var fstring = "not-found";
        var actual = user.filterParents(fstring);     
        Y.ArrayAssert.isEmpty(actual);
        
    },
    
    /**
     * UAG-SSJS-USR-18 Check that "getParents" method exists
     */
    testGetParentsMethodExists: function() {
        var user = directory.user("default");
        Y.Assert.isNotUndefined(user.getParents);
        Y.Assert.isClassOf("Function", user.getParents);
    },
    
    /**
     * UAG-SSJS-USR-19 Check that "getParents" method returns all groups to which the User belongs at all levels (default).
     */
    testGetParentsMethodReturnsAllParentGroupsOfAllLevelsByDefault: function() {
        var user = directory.user("check-parents");
        var actual = user.getParents();
        var expected = [
        {          
            name: "Level-1.1",
            ID: "B240BEDD438196478C7C235B8D04132F",
            fullName: "Level-1.1"
        },
        {
            name: "Level-2.1",
            ID: "AEAC9CAEC81F634B973B2EEA69292C7C",
            fullName: "Level-2.1"  
        },
        {
            name: "Level-3.1",
            ID: "EB2F520B61BEBE44BF5B9589422DFA13",
            fullName: "Level-3.1"
        },
        
        {
            name: "Level-2.2",
            ID: "DE8488729CB851408777E241D33E3113",
            fullName: "Level-2.2"  
        },
        {
            name: "Level-1.3",
            ID: "B5B3FE898CA3A940B7F69C501A0D9D5B",
            fullName: "Level-1.3"

        },
        {
            name: "Level-Filter-1.2",
            ID: "52EF76B0B79D5D43A4C457D241466B7C",
            fullName: "Level-Filter-1.2"
        },

        {
            name: "Level-Filter-3.2", 
            ID: "78069F4EBF72F9458CC17108FE59D645",
            fullName: "Level-Filter-3.2"
        },

        {
            name: "Level-Filter-2.3",
            ID: "3488823CC1B2864FA4ED7A1C8B882AC9",
            fullName: "Level-Filter-2.3"
        },
        {
            name: "Level-Filter-1.4",
            ID: "1BE82203957F1D4CB70270F77710FF74",
            fullName: "Level-Filter-1.4"
        }
        ];
        
        Y.Assert.areSame(expected.length, actual.length);
        
        // Sort arrays
        utils.sortBy(expected, "ID");
        utils.sortBy(actual, "ID");
        
        for(var i=0; i<actual.length; i++){        
            Y.ObjectAssert.areEqual(expected[i], actual[i]);
        }
        
    },
    
    /**
     * UAG-SSJS-USR-20 Check that "getParents" method returns all groups to which the User belongs at all levels if "false" is passed as parameter.
     */
    testGetParentsMethodReturnsAllParentGroupsOfAllLevelsIf_False_IsPassedAsParameter: function() {
        var user = directory.user("check-parents");
        var actual = user.getParents(false);
        var expected = [
        {          
            name: "Level-1.1",
            ID: "B240BEDD438196478C7C235B8D04132F",
            fullName: "Level-1.1"
        },
        {
            name: "Level-2.1",
            ID: "AEAC9CAEC81F634B973B2EEA69292C7C",
            fullName: "Level-2.1"  
        },
        {
            name: "Level-3.1",
            ID: "EB2F520B61BEBE44BF5B9589422DFA13",
            fullName: "Level-3.1"
        },
        
        {
            name: "Level-2.2",
            ID: "DE8488729CB851408777E241D33E3113",
            fullName: "Level-2.2"  
        },
        {
            name: "Level-1.3",
            ID: "B5B3FE898CA3A940B7F69C501A0D9D5B",
            fullName: "Level-1.3"

        },
        {
            name: "Level-Filter-1.2",
            ID: "52EF76B0B79D5D43A4C457D241466B7C",
            fullName: "Level-Filter-1.2"
        },

        {
            name: "Level-Filter-3.2", 
            ID: "78069F4EBF72F9458CC17108FE59D645",
            fullName: "Level-Filter-3.2"
        },

        {
            name: "Level-Filter-2.3",
            ID: "3488823CC1B2864FA4ED7A1C8B882AC9",
            fullName: "Level-Filter-2.3"
        },
        {
            name: "Level-Filter-1.4",
            ID: "1BE82203957F1D4CB70270F77710FF74",
            fullName: "Level-Filter-1.4"
        }
        ];
        
        Y.Assert.areSame(expected.length, actual.length);
        
        // Sort arrays
        utils.sortBy(expected, "ID");
        utils.sortBy(actual, "ID");
        
        for(var i=0; i<actual.length; i++){        
            Y.ObjectAssert.areEqual(expected[i], actual[i]);
        }
        
    },
    
    /**
     * UAG-SSJS-USR-21 Check that "getParents" method returns all groups to which the User belongs at all levels if "allLevels" is passed as parameter.
     */
    testGetParentsMethodReturnsAllParentGroupsOfAllLevelsIf_AllLevels_IsPassedAsParameter: function() {
        var user = directory.user("check-parents");
        var actual = user.getParents("allLevels");
        var expected = [
        {          
            name: "Level-1.1",
            ID: "B240BEDD438196478C7C235B8D04132F",
            fullName: "Level-1.1"
        },
        {
            name: "Level-2.1",
            ID: "AEAC9CAEC81F634B973B2EEA69292C7C",
            fullName: "Level-2.1"  
        },
        {
            name: "Level-3.1",
            ID: "EB2F520B61BEBE44BF5B9589422DFA13",
            fullName: "Level-3.1"
        },
        
        {
            name: "Level-2.2",
            ID: "DE8488729CB851408777E241D33E3113",
            fullName: "Level-2.2"  
        },
        {
            name: "Level-1.3",
            ID: "B5B3FE898CA3A940B7F69C501A0D9D5B",
            fullName: "Level-1.3"

        },
        {
            name: "Level-Filter-1.2",
            ID: "52EF76B0B79D5D43A4C457D241466B7C",
            fullName: "Level-Filter-1.2"
        },

        {
            name: "Level-Filter-3.2", 
            ID: "78069F4EBF72F9458CC17108FE59D645",
            fullName: "Level-Filter-3.2"
        },

        {
            name: "Level-Filter-2.3",
            ID: "3488823CC1B2864FA4ED7A1C8B882AC9",
            fullName: "Level-Filter-2.3"
        },
        {
            name: "Level-Filter-1.4",
            ID: "1BE82203957F1D4CB70270F77710FF74",
            fullName: "Level-Filter-1.4"
        }
        ];
        
        Y.Assert.areSame(expected.length, actual.length);
        
        // Sort arrays
        utils.sortBy(expected, "ID");
        utils.sortBy(actual, "ID");
        
        for(var i=0; i<actual.length; i++){        
            Y.ObjectAssert.areEqual(expected[i], actual[i]);
        }
        
    },
    
    /**
     * UAG-SSJS-USR-22 Check that "getParents" method returns only the groups to which the User is directly assigned if "true" is passed as parameter.
     */
    testGetParentsMethodReturnsOnlyParentGroupsOfFirstLevelsIf_True_IsPassedAsParameter: function() {
        var user = directory.user("check-parents");
        var actual = user.getParents(true);
        var expected = [
        {          
            name: "Level-1.1",
            ID: "B240BEDD438196478C7C235B8D04132F",
            fullName: "Level-1.1"
        },
        {
            name: "Level-1.3",
            ID: "B5B3FE898CA3A940B7F69C501A0D9D5B",
            fullName: "Level-1.3"

        },
        {
            name: "Level-Filter-1.2",
            ID: "52EF76B0B79D5D43A4C457D241466B7C",
            fullName: "Level-Filter-1.2"
        },
        
        {
            name: "Level-Filter-1.4",
            ID: "1BE82203957F1D4CB70270F77710FF74",
            fullName: "Level-Filter-1.4"
        }
        ];
        
        Y.Assert.areSame(expected.length, actual.length);
        
        // Sort arrays
        utils.sortBy(expected, "ID");
        utils.sortBy(actual, "ID");
        
        for(var i=0; i<actual.length; i++){        
            Y.ObjectAssert.areEqual(expected[i], actual[i]);
        }
        
    },
    
    /**
     * UAG-SSJS-USR-23 Check that "getParents" method returns only the groups to which the User is directly assigned if "firstLevel" is passed as parameter.
     */
    testGetParentsMethodReturnsOnlyParentGroupsOfFirstLevelsIf_FirstLevel_IsPassedAsParameter: function() {
        var user = directory.user("check-parents");
        var actual = user.getParents("firstLevel");
        var expected = [
        {          
            name: "Level-1.1",
            ID: "B240BEDD438196478C7C235B8D04132F",
            fullName: "Level-1.1"
        },
        {
            name: "Level-1.3",
            ID: "B5B3FE898CA3A940B7F69C501A0D9D5B",
            fullName: "Level-1.3"

        },
        {
            name: "Level-Filter-1.2",
            ID: "52EF76B0B79D5D43A4C457D241466B7C",
            fullName: "Level-Filter-1.2"
        },
        
        {
            name: "Level-Filter-1.4",
            ID: "1BE82203957F1D4CB70270F77710FF74",
            fullName: "Level-Filter-1.4"
        }
        ];
        
        Y.Assert.areSame(expected.length, actual.length);
        
        // Sort arrays
        utils.sortBy(expected, "ID");
        utils.sortBy(actual, "ID");
        
        for(var i=0; i<actual.length; i++){        
            Y.ObjectAssert.areEqual(expected[i], actual[i]);
        }
        
    },
    
    /**
     * UAG-SSJS-USR-24 Check that "putInto" method exists
     */
    testPutIntoMethodExists: function() {
        var user = directory.user("default");
        Y.Assert.isNotUndefined(user.putInto);
        Y.Assert.isClassOf("Function", user.putInto);
    },
    
    /**
     * UAG-SSJS-USR-25 Check that "putInto" method adds the User to the group passed in the groupList parameter using its name.
     */
    testPutIntoMethodAddsUserToGroupPassedInGroupListParamUsingGroupName: function() {
        var userName = "check-putinto-1";
        var user = directory.user(userName);
        var expected =
        {
            name: "Check-PutInto-1",
            ID: "5BEBF3BC6FDFC444892C349E88A5FC7B"
        };
        
        // Be sure that the group does not belongs to the group.
        var actual = user.getParents(true);
        var bLength = actual.length;
        // as we don't have an api to assert an array of objects
        if(utils.contains(actual, "ID", expected.ID))
            Y.Assert.fail("User: " + userName + " should not belong to the group: " + expected.name);
            
        try{
            var group = expected.name;
            user.putInto(group);
            // be sure that the user belongs now to the group.
            // it seems that we should reload the user for updates to be taken in count.
            user = directory.user(userName);
            actual = user.getParents(true);
            Y.Assert.areSame(bLength+1, actual.length, "User should be added to the group");
            if(!utils.contains(actual, "ID", expected.ID))
                Y.Assert.fail("User: " + userName + " must now belong to the group: " + expected.name);
        }finally{
            user.removeFrom(expected.name);
        }
    },
    
    /**
     * UAG-SSJS-USR-26 Check that "putInto" method adds the User to the group passed in the groupList parameter using its ID.
     */
    testPutIntoMethodAddsUserToGroupPassedInGroupListParamUsingGroupId: function() {
        var userName = "check-putinto-1";
        var user = directory.user(userName);
        var expected =
        {
            name: "Check-PutInto-2",
            ID: "17FDF7B3FA75654A93D040A1C6A0D6BC"
        };
        
        // Be sure that the group does not belongs to the group.
        var actual = user.getParents(true);
        var bLength = actual.length;
        // as we don't have an api to assert an array of objects
        if(utils.contains(actual, "ID", expected.ID))
            Y.Assert.fail("User: " + userName + " should not belong to the group: " + expected.name);
            
        try{
            var group = expected.ID;
            user.putInto(group);
            // be sure that the user belongs now to the group.
            // it seems that we should reload the user for updates to be taken in count.
            user = directory.user(userName);
            actual = user.getParents(true);
            Y.Assert.areSame(bLength+1, actual.length, "User should be added to the group");
            if(!utils.contains(actual, "ID", expected.ID))
                Y.Assert.fail("User: " + userName + " must now belong to the group: " + expected.name);
        }finally{
            user.removeFrom(expected.name);
        }
               
    },
    
    /**
     * UAG-SSJS-USR-27 Check that "putInto" method adds the User to the group passed in the groupList parameter using its reference.
     */
    testPutIntoMethodAddsUserToGroupPassedInGroupListParamUsingGroupReference: function() {
        var userName = "check-putinto-1";
        var user = directory.user(userName);
        var expected =
        {
            name: "Check-PutInto-3",
            ID: "CDCA8AE76DF53B4BA82CCEC5E89783BB"
        };
        
        // Be sure that the group does not belongs to the group.
        var actual = user.getParents(true);
        var bLength = actual.length;
        // as we don't have an api to assert an array of objects
        if(utils.contains(actual, "ID", expected.ID))
            Y.Assert.fail("User: " + userName + " should not belong to the group: " + expected.name);
            
        try{
            var group = directory.group(expected.name);
            user.putInto(group);
            // be sure that the user belongs now to the group.
            // it seems that we should reload the user for updates to be taken in count.
            user = directory.user(userName);
            actual = user.getParents(true);
            Y.Assert.areSame(bLength+1, actual.length, "User should be added to the group");
            if(!utils.contains(actual, "ID", expected.ID))
                Y.Assert.fail("User: " + userName + " must now belong to the group: " + expected.name);
        }finally{
            user.removeFrom(expected.name);
        }
               
    },
    
    /**
     * UAG-SSJS-USR-28 Check that "putInto" method adds the User to the groups passed in the groupList parameter as a mixed list of group names, IDs, and references.
     */
    testPutIntoMethodAddsUserToGroupsPassedInGroupListParamUsingMixedListOfGroupNameIdAndReference: function() {
        var user = directory.user("check-putinto-1");
        var grp1 = "Check-PutInto-4";
        var grp2 = "A7B819697FF53F41A490A53FD788BFA7";
        var grp3 = directory.group("Check-PutInto-6");
        try{
            user.putInto(grp1, grp2, grp3);
            var expected = [
            {
                name:"Check-PutInto-4",
                ID:"9C2FFD0327294642BB819DC204B02903",
                fullName:"Check-PutInto-4"
            },{
                name:"Check-PutInto-5",
                ID:"A7B819697FF53F41A490A53FD788BFA7",
                fullName:"Check-PutInto-5"
            },{
                name:"Check-PutInto-6",
                ID:"B463000BE4BBB34A84719223F1C42294",
                fullName:"Check-PutInto-6"
            }
            ];
            var actual = user.getParents();
            Y.Assert.areSame(expected.length, actual.length);
            // Sort arrays
            utils.sortBy(expected, "ID");
            utils.sortBy(actual, "ID");
        
            for(var i=0; i<actual.length; i++){        
                Y.ObjectAssert.areEqual(expected[i], actual[i]);
            }
        }finally{
            user.removeFrom(grp1, grp2, grp3);
        }
        
    },
    
    /**
     * UAG-SSJS-USR-30 Check that "putInto" method adds the User to the groups passed in the groupList parameter as an array of group names, IDs, and references.
     */
    testPutIntoMethodAddsUserToGroupsPassedInGroupListParamUsingAnArrayOfGroupNameIdAndReference: function() {
        var user = directory.user("check-putinto-2");
        var grp1 = "Check-PutInto-4";
        var grp2 = "A7B819697FF53F41A490A53FD788BFA7";
        var grp3 = directory.group("Check-PutInto-6");
        try{
            user.putInto([grp1, grp2, grp3]);
            var expected = [
            {
                name:"Check-PutInto-4",
                ID:"9C2FFD0327294642BB819DC204B02903",
                fullName:"Check-PutInto-4"
            },{
                name:"Check-PutInto-5",
                ID:"A7B819697FF53F41A490A53FD788BFA7",
                fullName:"Check-PutInto-5"
            },{
                name:"Check-PutInto-6",
                ID:"B463000BE4BBB34A84719223F1C42294",
                fullName:"Check-PutInto-6"
            }
            ];
            var actual = user.getParents();
            Y.Assert.areSame(expected.length, actual.length);
            // Sort arrays
            utils.sortBy(expected, "ID");
            utils.sortBy(actual, "ID");
        
            for(var i=0; i<actual.length; i++){        
                Y.ObjectAssert.areEqual(expected[i], actual[i]);
            }
        }finally{
            user.removeFrom(grp1, grp2, grp3);
        }
        
    },
    
    /**
     * UAG-SSJS-USR-31 Check that "remove" method exists
     */
    testRemoveMethodExists: function() {
        var user = directory.user("default");
        Y.Assert.isNotUndefined(user.remove);
        Y.Assert.isClassOf("Function", user.remove);
    },
    
    /**
     * UAG-SSJS-USR-32 Check that "remove" method removes the User from the solution's Directory
     */
    testRemoveMethodLogic: function() {
        var userName = "check-remove";
        var user = directory.user(userName);
        Y.Assert.isNotNull(user);
        user.remove();
        try{
            user = directory.user(userName);
            Y.Assert.isNull(user);
        }finally{
            directory.addUser(userName, "");
        }
    },
    
    /**
     * UAG-SSJS-USR-33 Check that "removeFrom" method exists
     */
    testRemoveFromMethodExists: function() {
        var user = directory.user("default");
        Y.Assert.isNotUndefined(user.removeFrom);
        Y.Assert.isClassOf("Function", user.removeFrom);
    },
    
    /**
     * UAG-SSJS-USR-34 Check that "removeFrom" removes the User from the group passed in the groupList parameter using its name.
     */
    testRemoveFromMethodRemovesUserFromGroupPassedInGroupListParameterUsingGroupName: function() {
        var userName = "check-removeFrom-1";
        var user = directory.user(userName);
        // Be sure that the user belongs to the group
        var actual = user.getParents();
        var bLength = actual.length;
        var target =
        {
            name: "Check-RemoveFrom-1",
            ID: "C82A92C517CA8948A59C11E245A6E17A"
        };
        // as we don't have an api to assert an array of objects
        if(!utils.contains(actual, "ID", target.ID))
            Y.Assert.fail("User: " + userName + " must belong to group: " + target.name);
        
        // Remove the user from the group
        try{
            var grp = target.name;
            user.removeFrom(grp);
            // Be sure that the user does not belong to the group.
            // as removeFrom seems to be async, reload the user
            user = directory.user(userName);
            actual = user.getParents();
            Y.Assert.areSame(bLength-1, actual.length, "Group should be deleted from user's parents list");
            if(utils.contains(actual, "ID", target.ID))
                Y.Assert.fail("User: " + userName + " must not belong to group: " + target.name + " anymore");
        }finally{
            // put the user back into the group
            user.putInto(target.name);
        }
       
    },
    
    /**
     * UAG-SSJS-USR-35 Check that "removeFrom" removes the User from the group passed in the groupList parameter using its ID.
     */
    testRemoveFromMethodRemovesUserFromGroupPassedInGroupListParameterUsingGroupId: function() {
        var userName = "check-removeFrom-1";
        var user = directory.user(userName);
        // Be sure that the user belongs to the group
        var actual = user.getParents();
        var bLength = actual.length;
        var target =
        {
            name: "Check-RemoveFrom-2",
            ID: "4D5B3648774F2946ABBBD2EC7861A796"
        };
        // as we don't have an api to assert an array of objects
        if(!utils.contains(actual, "ID", target.ID))
            Y.Assert.fail("User: " + userName + " must belong to group: " + target.name);
        
        // Remove the user from the group
        try{
            var grp = target.ID;
            user.removeFrom(grp);
            // Be sure that the user does not belong to the group.
            // as removeFrom seems to be async, reload the user
            user = directory.user(userName);
            actual = user.getParents();
            Y.Assert.areSame(bLength-1, actual.length, "Group should be deleted from user's parents list");
            if(utils.contains(actual, "ID", target.ID))
                Y.Assert.fail("User: " + userName + " must not belong to group: " + target.name + " anymore");
        }finally{
            // put the user back into the group
            user.putInto(target.name);
        }
    },
    
    /**
     * UAG-SSJS-USR-36 Check that "removeFrom" removes the User from the group passed in the groupList parameter using its reference.
     */
    testRemoveFromMethodRemovesUserFromGroupPassedInGroupListParameterUsingGroupReference: function() {
                var userName = "check-removeFrom-1";
        var user = directory.user(userName);
        // Be sure that the user belongs to the group
        var actual = user.getParents();
        var bLength = actual.length;
        var target =
        {
            name: "Check-RemoveFrom-3",
            ID: "776A731A38AE524AB43A04C0BCD0E57F"
        };
        // as we don't have an api to assert an array of objects
        if(!utils.contains(actual, "ID", target.ID))
            Y.Assert.fail("User: " + userName + " must belong to group: " + target.name);
        
        // Remove the user from the group
        try{
            var grp = directory.group(target.name);
            user.removeFrom(grp);
            // Be sure that the user does not belong to the group.
            // as removeFrom seems to be async, reload the user
            user = directory.user(userName);
            actual = user.getParents();
            Y.Assert.areSame(bLength-1, actual.length, "Group should be deleted from user's parents list");
            if(utils.contains(actual, "ID", target.ID))
                Y.Assert.fail("User: " + userName + " must not belong to group: " + target.name + " anymore");
        }finally{
            // put the user back into the group
            user.putInto(target.name);
        }
    },
    
    /**
     * UAG-SSJS-USR-37 Check that "removeFrom" method removes the User from the groups passed in the groupList parameter as a mixed list of group name, ID, and reference.
     */
    testRemoveFromMethodRemovesUserFromGroupPassedInGroupListParameterUsingMixedListOfGroupNameIdAndReference: function() {
        var userName = "check-removeFrom-2";
        var user = directory.user(userName);
        // Be sure that the user belongs to the groups
        var expected = [
        {
            name: "Check-RemoveFrom-1",
            ID: "C82A92C517CA8948A59C11E245A6E17A",
            fullName: "Check-RemoveFrom-1"
        },
        {
            name: "Check-RemoveFrom-2",
            ID: "4D5B3648774F2946ABBBD2EC7861A796",
            fullName: "Check-RemoveFrom-2"
        },
        {
            name: "Check-RemoveFrom-3",
            ID: "776A731A38AE524AB43A04C0BCD0E57F",
            fullName: "Check-RemoveFrom-3"
        },
        {
            name: "Check-RemoveFrom-4",
            ID: "67EE27A08EAB9842A1A16E1E4B0705E0",
            fullName: "Check-RemoveFrom-4"
        }
        ];
        var actual = user.getParents();
        for(var i=0; i<expected.length; i++){        
            if(!utils.contains(actual, "ID", expected[i].ID))
                Y.Assert.fail("User: " + userName + " must belong to the group: " + expected[i].name);
        }
        
        try{
            // Remove the user from a groups using a list of name, ID and reference
            var grp1 = expected[0].name;
            var grp2 = expected[1].ID;
            var grp3 = directory.group(expected[2].name);

            user.removeFrom(grp1, grp2, grp3);
            // as removeFrom seems to be async, reload the user
            user = directory.user(userName);
            // Be sure that the user does not belong to the group.
            actual = user.getParents();
            Y.Assert.areSame(1, actual.length);
            Y.ObjectAssert.areEqual(expected[3], actual[0]);
        }
        finally{
            // put the user back into the groups
            user.putInto(expected[0].name, expected[1].name, expected[2].name);
        }
    },
    
    /**
     * UAG-SSJS-USR-38 Check that "removeFrom" method removes the User from the groups passed in the groupList parameter as an array of group names, IDs, and references.
     */
    testRemoveFromMethodRemovesUserFromGroupPassedInGroupListParameterUsingAnArrayOfGroupNameIdAndReference: function() {
        var userName = "check-removeFrom-3";
        var user = directory.user(userName);
        // Be sure that the user belongs to the groups
        var expected = [
        {
            name: "Check-RemoveFrom-1",
            ID: "C82A92C517CA8948A59C11E245A6E17A",
            fullName: "Check-RemoveFrom-1"
        },
        {
            name: "Check-RemoveFrom-2",
            ID: "4D5B3648774F2946ABBBD2EC7861A796",
            fullName: "Check-RemoveFrom-2"
        },
        {
            name: "Check-RemoveFrom-3",
            ID: "776A731A38AE524AB43A04C0BCD0E57F",
            fullName: "Check-RemoveFrom-3"
        },
        {
            name: "Check-RemoveFrom-4",
            ID: "67EE27A08EAB9842A1A16E1E4B0705E0",
            fullName: "Check-RemoveFrom-4"
        }
        ];
        var actual = user.getParents();
        for(var i=0; i<expected.length; i++){        
            if(!utils.contains(actual, "ID", expected[i].ID))
                Y.Assert.fail("User: " + userName + " must belong to the group: " + expected[i].name);
        }
        
        try{
            // Remove the user from a groups using a list of name, ID and reference
            var grp1 = expected[0].name;
            var grp2 = expected[1].ID;
            var grp3 = directory.group(expected[2].name);

            user.removeFrom([grp1, grp2, grp3]);
            // as removeFrom seems to be async, reload the user
            user = directory.user(userName);
            // Be sure that the user does not belong to the group.
            actual = user.getParents();
            Y.Assert.areSame(1, actual.length);
            Y.ObjectAssert.areEqual(expected[3], actual[0]);
        }
        finally{
            // put the user back into the groups
            user.putInto(expected[0].name, expected[1].name, expected[2].name);
        }
    },
    
    /**
     * UAG-SSJS-USR-39 Check that "setPassword" method exists
     */
    testSetPasswordMethodExists: function() {
        var user = directory.user("default");
        Y.Assert.isNotUndefined(user.setPassword);
        Y.Assert.isClassOf("Function", user.setPassword);
    },

    /**
     * UAG-SSJS-USR-40 Check that "setPassword" method changes the password for the User.
     */
    testSetPasswordMethodLogic: function() {
        var userName = "change-password";
        var oldPwd = "old-password";
            
        // Should login using the actual password
        var loggedin = application.loginByPassword(userName, oldPwd);
        Y.Assert.isTrue(loggedin, "Should login using the actual password");
        
        var user = directory.user(userName);
        var newPwd = "new-password";
        user.setPassword(newPwd);
        
        // Should login using the new password
        loggedin = application.loginByPassword(userName, newPwd);
        Y.Assert.isTrue(loggedin, "Should login using the new password");
        
        // Should not login using the old password
        loggedin = application.loginByPassword(userName, oldPwd);
        Y.Assert.isFalse(loggedin, "Should not login using the old password");
        
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

