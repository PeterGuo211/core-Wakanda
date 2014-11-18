
var utils = require("utils");
var _testCase = {
    name: "Test UAG SSJS API - Group class",
  
    /**
     * UAG-SSJS-GRP-1 Check that "fullName" attribute exists and returns the right value
     */
    testFullNameAttributeExists: function() {
        var group = directory.group("Default");
        Y.Assert.isNotUndefined(group.fullName);
        Y.Assert.areSame("string", typeof group.fullName);
    },
    
    /**
     * UAG-SSJS-GRP-2 Check that "fullName" attribute returns the right value
     */
    testFullNameAttributeLogic: function() {
        var group = directory.group("Default");
        Y.Assert.areSame("Default", group.fullName);
    },
    
    /**
     * UAG-SSJS-GRP-3 Check that "ID" attribute exists
     */
    testIDAttributeExists: function() {
        var group = directory.group("Default");
        Y.Assert.isNotUndefined(group.ID);
        Y.Assert.areSame("string", typeof group.ID);
    },
    
    /**
     * UAG-SSJS-GRP-4 Check that "ID" attribute returns the right value
     */
    testIDAttributeLogic: function() {
        var group = directory.group("Default");
        Y.Assert.areSame("FD208032751A944D9A36D8BF1DCD7134", group.ID);
    },
        
    /**
     * UAG-SSJS-GRP-5 Check that "name" attribute exists
     */
    testNameAttributeExists: function() {
        var group = directory.group("Default");
        Y.Assert.isNotUndefined(group.name);
        Y.Assert.areSame("string", typeof group.name);
    },
    
    /**
     * UAG-SSJS-GRP-6 Check that "name" attribute  returns the right value
     */
    testNameAttributeLogic: function() {
        var group = directory.group("Default");
        Y.Assert.areSame("Default", group.name);
    },
    
    /**
     * UAG-SSJS-GRP-7 Check that "filterChildren" method exists
     */
    testFilterChildrenMethodExists: function() {
        var group = directory.group("Default");
        Y.Assert.isNotUndefined(group.filterChildren);
        Y.Assert.isClassOf("Function", group.filterChildren);
    },
    
    /**
     * UAG-SSJS-GRP-8 Check that "filterChildren" method returns an array of the subgroups belonging to the Group, filtered using the filterString parameter.
     */
    testFilterChildrenMethodReturnsFiltredSubGroupsOfAllLevelsByDefaultIfFilterStringIsNotEmpty: function() {
        var group = directory.group("Parent");
        var fstring = "*Filter";
        var actual = group.filterChildren(fstring);
        var expected = [
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
        },
        {
            name: "Child-Filter-1.4",
            ID: "2AD386806AEA7D4184030E25DACF13FF",
            fullName: "Child-Filter-1.4"
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
        },
        {
            name: "Child-Filter-3.2",
            ID: "3B262165B0055546A81F086EB7F639BB",
            fullName: "Child-Filter-3.2"
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
     * UAG-SSJS-GRP-9 Check that "filterChildren" method returns an array of the subgroups belonging to the Group at all sublevels, filtered using the filterString parameter, if "false" is passed as parameter.
     */
    testFilterChildrenMethodReturnsFiltredSubGroupsOfAllLevelsIf_False_IsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var fstring = "*Filter";
        var actual = group.filterChildren(fstring, false);
        var expected = [
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
        },
        {
            name: "Child-Filter-1.4",
            ID: "2AD386806AEA7D4184030E25DACF13FF",
            fullName: "Child-Filter-1.4"
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
        },
        {
            name: "Child-Filter-3.2",
            ID: "3B262165B0055546A81F086EB7F639BB",
            fullName: "Child-Filter-3.2"
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
     * UAG-SSJS-GRP-10 Check that "filterChildren" method returns an array of the subgroups belonging to the Group at all sublevels, filtered using the filterString parameter, if "allLevels" is passed as parameter.
     */
    testFilterChildrenMethodReturnsFiltredSubGroupsOfAllLevelsIf_AllLevels_StringIsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var fstring = "*Filter";
        var actual = group.filterChildren(fstring, "allLevels");
        var expected = [
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
        },
        {
            name: "Child-Filter-1.4",
            ID: "2AD386806AEA7D4184030E25DACF13FF",
            fullName: "Child-Filter-1.4"
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
        },
        {
            name: "Child-Filter-3.2",
            ID: "3B262165B0055546A81F086EB7F639BB",
            fullName: "Child-Filter-3.2"
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
     * UAG-SSJS-GRP-11 Check that "filterChildren" method returns only the groups directly assigned to a group, filtered using the filterString parameter, if "true" is passed as parameter.
     */
    testFilterChildrenMethodReturnsFiltredSubGroupsOfOnlyFirstLevelIf_True_IsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var fstring = "*Filter";
        var actual = group.filterChildren(fstring, true);
        var expected = [
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
        },
        {
            name: "Child-Filter-1.4",
            ID: "2AD386806AEA7D4184030E25DACF13FF",
            fullName: "Child-Filter-1.4"
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
     * UAG-SSJS-GRP-12 Check that "filterChildren" method returns the subgroups belonging to the Group at all sublevels, filtered using the filterString parameter, if "firstLevel" is passed as parameter.
     */
    testFilterChildrenMethodReturnsFiltredSubGroupsOfOnlyFirstLevelIf_FirstLevel_StringIsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var fstring = "*Filter";
        var actual = group.filterChildren(fstring, "firstLevel");
        var expected = [
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
        },
        {
            name: "Child-Filter-1.4",
            ID: "2AD386806AEA7D4184030E25DACF13FF",
            fullName: "Child-Filter-1.4"
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
     * UAG-SSJS-GRP-13 Check that "filterChildren" method returns an empty array if no group whose name meets the filterString is found.
     */
    testFilterChildrenMethodReturnsAnEmptyArrayIfNoSubGroupMatchesTheFilterString: function() {
        var group = directory.group("Parent");
        var fstring = "not-found";
        var actual = group.filterChildren(fstring);     
        Y.ArrayAssert.isEmpty(actual);
        
    },
    
    /**
     * UAG-SSJS-GRP-14 Check that "filterChildren" method returns all the subgroups belonging to the Group if an empty string is passed in the fstring parameter.
     */
    testFilterChildrenMethodReturnsAllSubGroupsOfAllLevelsByDefaultIfFilterStringIsEmpty: function() {
        var group = directory.group("Parent");
        var fstring = "";
        var actual = group.filterChildren(fstring);
        var expected = [
        {
            name: "Child-1.1",
            ID: "DB0C9DE869075B4B9BC5B32D443A255E",
            fullName: "Child-1.1"
        },
        {
            name: "Child-1.2",
            ID: "2C6D91ACEAEE6541897E3EB1173858A3",
            fullName: "Child-1.2"
        },
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
        },
        {
            name: "Child-Filter-1.4",
            ID: "2AD386806AEA7D4184030E25DACF13FF",
            fullName: "Child-Filter-1.4"
        },
        {
            name: "Child-2.1",
            ID: "39B62A0E9780D1418FE3C114758395D2",
            fullName: "Child-2.1"
        },
        {
            name: "Child-2.2",
            ID: "5E5A8CAA3FD1DC4EA9B9AAB5BF523B6C",
            fullName: "Child-2.2"
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
        },
        {
            name: "Child-3.1",
            ID: "95C4CBE4B1BA5D4297906BE9B2A89738",
            fullName: "Child-3.1"
        },
        {
            name: "Child-Filter-3.2",
            ID: "3B262165B0055546A81F086EB7F639BB",
            fullName: "Child-Filter-3.2"
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
     * UAG-SSJS-GRP-15 Check that "filterParents" method exists
     */
    testFilterParentsMethodExists: function() {
        var group = directory.group("Default");
        Y.Assert.isNotUndefined(group.filterParents);
        Y.Assert.isClassOf("Function", group.filterParents);
    },
    
    /**
     * UAG-SSJS-GRP-16 Check that "filterParents" method returns an array of the groups to which the Group belongs, filtered using the filterString parameter.
     */
    testFilterParentsMethodReturnsFiltredParentGroupsOfAllLevelsByDefaultIfFilterStringIsNotEmpty: function() {
        var group = directory.group("Child-3.1");
        var fstring = "*Filter";
        var actual = group.filterParents(fstring);
        var expected = [
        {
            name: "Parent-Filter",
            ID: "7316BD842F1494408A9923583CC54930",
            fullName: "Parent-Filter"  
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
        },
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
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
     * UAG-SSJS-GRP-17 Check that "filterParents" method returns all the groups to which the Group belongs at all levels, filtered using the filterString parameter, if "false" is passed in the level parameter.
     */
    testFilterParentsMethodReturnsFiltredParentGroupsOfAllLevelsIf_False_IsPassedInLevelParam: function() {
        var group = directory.group("Child-3.1");
        var fstring = "*Filter";
        var actual = group.filterParents(fstring, false);
        var expected = [
        {
            name: "Parent-Filter",
            ID: "7316BD842F1494408A9923583CC54930",
            fullName: "Parent-Filter"  
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
        },
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
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
     * UAG-SSJS-GRP-18 Check that "filterParents" method returns all the groups to which the Group belongs at all levels, filtered using the filterString parameter, if "allLevels" is passed in the level parameter.
     */
    testFilterParentsMethodReturnsFiltredParentGroupsOfAllLevelsIf_AllLevels_StringIsPassedInLevelParam: function() {
        var group = directory.group("Child-3.1");
        var fstring = "*Filter";
        var actual = group.filterParents(fstring, "allLevels");
        var expected = [
        {
            name: "Parent-Filter",
            ID: "7316BD842F1494408A9923583CC54930",
            fullName: "Parent-Filter"  
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
        },
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
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
     * UAG-SSJS-GRP-19 Check that "filterParents" method returns only the groups to which the Group is directly assigned, filtered using the filterString parameter, if true is passed in the level parameter.
     */
    testFilterParentsMethodReturnsFiltredParentGroupsOfOnlyFirstLevelsIf_True_IsPassedInLevelParam: function() {
        var group = directory.group("Child-3.1");
        var fstring = "*Filter";
        var actual = group.filterParents(fstring, true);
        var expected = [
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
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
     * UAG-SSJS-GRP-20 Check that "filterParents" method returns only the groups to which the Group is directly assigned, filtered using the filterString parameter, if "firstLevel" is passed in the level parameter.
     */
    testFilterParentsMethodReturnsFiltredParentGroupsOfOnlyFirstLevelsIf_FirstLevel_StringIsPassedInLevelParam: function() {
        var group = directory.group("Child-3.1");
        var fstring = "*Filter";
        var actual = group.filterParents(fstring, "firstLevel");
        var expected = [
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
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
     * UAG-SSJS-GRP-21 Check that "filterParents" method returns an empty array if no group whose name meets the filterString is found.
     */
    testFilterParentsMethodReturnsEmptyArrayIfNoParentGroupMatchesTheFilterString: function() {
        var group = directory.group("Parent");
        var fstring = "not-found";
        var actual = group.filterParents(fstring);     
        Y.ArrayAssert.isEmpty(actual);
        
    },
    /**
     * UAG-SSJS-GRP-22 Check that "filterParents" method returns all parents groups of the Group if an empty string is passed in the fstring parameter.
     */
    testFilterParentsMethodReturnsAllParentGroupsOfAllLevelsByDefaultIfFilterStringIsEmpty: function() {
        var group = directory.group("Child-3.1");
        var fstring = "";
        var actual = group.filterParents(fstring); 
        var expected = [
        {
            name: "Parent",
            ID: "48FF6552E6F36044916F48ACBEDB1386",
            fullName: "Parent"
        },
        {
            name: "Parent-Filter",
            ID: "7316BD842F1494408A9923583CC54930",
            fullName: "Parent-Filter"  
        },
        {
            name: "Child-1.1",
            ID: "DB0C9DE869075B4B9BC5B32D443A255E",
            fullName: "Child-1.1"
        },
        {
            name: "Child-1.2",
            ID: "2C6D91ACEAEE6541897E3EB1173858A3",
            fullName: "Child-1.2"
        },
        {
            name: "Child-2.1",
            ID: "39B62A0E9780D1418FE3C114758395D2",
            fullName: "Child-2.1"
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
        },{
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
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
    
    /*
     * UAG-SSJS-GRP-23 Check that "filterUsers" method exists
     */
    testFilterUsersMethodExists: function() {
        var group = directory.group("Default");
        Y.Assert.isNotUndefined(group.filterUsers);
        Y.Assert.isClassOf("Function", group.filterUsers);
    },
    
    /**
     * UAG-SSJS-GRP-24 Check that "filterUsers" method returns, by default, the users that belong directly or indirectly to the Group, filtered using the filterString parameter.
     */
    testFilterUsersMethodReturnsFiltredGroupUsersOfAllLevelsByDefaultIfFilterStringIsNotEmpty: function() {
        var group = directory.group("Parent");
        var fstring = "*filter";
        var actual = group.filterUsers(fstring);
        var expected = [
        {
            name: "user-parent-2-filter*",
            ID: "B4058A1C8B1BD94DA9E71BECBC68F9A1"
        },
        {
            name: "user-child-1.1-2-filter*",
            ID: "F749E8EB996CEE498E73E9AF113F62F2"
        },
        {
            name: "user-child-2.2-1-filter*",
            ID: "9D4685AB798CB54CBA3A35808B609F3A"
        },
        {
            name: "user-child-3.1-2-filter*",
            ID:"6656EFDE23EAA240919607129F40C359"
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
     * UAG-SSJS-GRP-25 Check that "filterUsers" method returns, all the users that belong directly or indirectly to the Group, filtered using the filterString parameter, if "false" is passed in the level parameter.
     */
    testFilterUsersMethodReturnsFiltredGroupUsersOfAllLevelsByDefaultIf_False_IsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var fstring = "*filter";
        var actual = group.filterUsers(fstring, false);
        var expected = [
        {
            name: "user-parent-2-filter*",
            ID: "B4058A1C8B1BD94DA9E71BECBC68F9A1"
        },
        {
            name: "user-child-1.1-2-filter*",
            ID: "F749E8EB996CEE498E73E9AF113F62F2"
        },
        {
            name: "user-child-2.2-1-filter*",
            ID: "9D4685AB798CB54CBA3A35808B609F3A"
        },
        {
            name: "user-child-3.1-2-filter*",
            ID: "6656EFDE23EAA240919607129F40C359"
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
     * UAG-SSJS-GRP-26 Check that "filterUsers" method returns, all the users that belong directly or indirectly to the Group, filtered using the filterString parameter, if "allLevels" is passed in the level parameter.
     */
    testFilterUsersMethodReturnsFiltredGroupUsersOfAllLevelsByDefaultIf_AllLevels_StringIsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var fstring = "*filter";
        var actual = group.filterUsers(fstring, "allLevels");
        var expected = [
        {
            name: "user-parent-2-filter*",
            ID: "B4058A1C8B1BD94DA9E71BECBC68F9A1"
        },
        {
            name: "user-child-1.1-2-filter*",
            ID: "F749E8EB996CEE498E73E9AF113F62F2"
        },
        {
            name: "user-child-2.2-1-filter*",
            ID: "9D4685AB798CB54CBA3A35808B609F3A"
        },
        {
            name: "user-child-3.1-2-filter*",
            ID: "6656EFDE23EAA240919607129F40C359"
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
     * UAG-SSJS-GRP-27 Check that "filterUsers" method returns only the users directly assigned to the Group, filtered using the filterString parameter, if "true" is passed in the level parameter.
     */
    testFilterUsersMethodReturnsFiltredGroupUsersOfOnlyFirstLevelByDefaultIf_True_IsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var fstring = "*filter";
        var actual = group.filterUsers(fstring, true);
        var expected = [
        {
            name: "user-parent-2-filter*",
            ID: "B4058A1C8B1BD94DA9E71BECBC68F9A1"
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
     * UAG-SSJS-GRP-28 Check that "filterUsers" method returns only the users directly assigned to the Group, filtered using the filterString parameter, if "firstLevel" is passed in the level parameter.
     */
    testFilterUsersMethodReturnsFiltredGroupUsersOfOnlyFirstLevelByDefaultIf_FirstLevel_StringIsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var fstring = "*filter";
        var actual = group.filterUsers(fstring, "firstLevel");
        var expected = [
        {
            name: "user-parent-2-filter*",
            ID: "B4058A1C8B1BD94DA9E71BECBC68F9A1"
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
    
    /*
     * UAG-SSJS-GRP-29 Check that "filterChildren" method returns an empty array if no user whose name meets the filterString is found.
     */
    testFilterUsersMethodReturnsAnEmptyArrayIfNoUserMatchesTheFilterString: function() {
        var group = directory.group("Parent");
        var fstring = "not-found";
        var actual = group.filterUsers(fstring);     
        Y.ArrayAssert.isEmpty(actual);
        
    },
    
    /**
     * UAG-SSJS-GRP-30 Check that "filterUsers" method returns all the users that belong directly or indirectly to the Group if an empty string is passed in the fstring parameter.
     */
    testFilterChildrenMethodReturnsAllGroupUsersOfAllLevelsByDefaultIfFilterStringIsEmpty: function() {
        var group = directory.group("Parent");
        var fstring = "";
        var actual = group.filterUsers(fstring);
        var expected = [
        {
            name: "user-parent-1",
            ID: "18ACBC5D5E99714A9EBF5C9D8FDAAEDE",
        },
        {
            name: "user-parent-2-filter*",
            ID: "B4058A1C8B1BD94DA9E71BECBC68F9A1"
        },
        {
            name: "user-child-1.1-1",
            ID: "18DB6A506445C044B636DF3967941C37"
        },
        {
            name: "user-child-1.1-2-filter*",
            ID: "F749E8EB996CEE498E73E9AF113F62F2"
        },
        {
            name: "user-child-2.1-1",
            ID: "C429F8E327EF814999F6927E884A2103"
        },
        {
            name: "user-child-1.2-1",
            ID: "D4CCABFDC56594408348EBCFC8345564"
        },
        {
            name: "user-child-2.2-1-filter*",
            ID: "9D4685AB798CB54CBA3A35808B609F3A"
        },
        { 
            name: "user-child-3.1-1",
            ID: "BBFAFF7C34C5BB48B2C8C92AD082F696"
        },
        {
            name: "user-child-3.1-2-filter*",
            ID:"6656EFDE23EAA240919607129F40C359"
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
     * UAG-SSJS-GRP-31 Check that "getChildren" method exists
     */
    testGetChildrenMethodExists: function() {
        var group = directory.group("Default");
        Y.Assert.isNotUndefined(group.getChildren);
        Y.Assert.isClassOf("Function", group.getChildren);
    },
    
    /**
     * UAG-SSJS-GRP-32 Check that "getChildren" method returns an array of the subgroups belonging to the Group.
     */
    testGetChildrenMethodReturnsAllSubGroupsOfAllLevelsByDefault: function() {
        var group = directory.group("Parent");
        var actual = group.getChildren();
        var expected = [
        {
            name: "Child-1.1",
            ID: "DB0C9DE869075B4B9BC5B32D443A255E",
            fullName: "Child-1.1"
        },
        {
            name: "Child-1.2",
            ID: "2C6D91ACEAEE6541897E3EB1173858A3",
            fullName: "Child-1.2"
        },
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
        },
        {
            name: "Child-Filter-1.4",
            ID: "2AD386806AEA7D4184030E25DACF13FF",
            fullName: "Child-Filter-1.4"
        },
        {
            name: "Child-2.1",
            ID: "39B62A0E9780D1418FE3C114758395D2",
            fullName: "Child-2.1"
        },
        {
            name: "Child-2.2",
            ID: "5E5A8CAA3FD1DC4EA9B9AAB5BF523B6C",
            fullName: "Child-2.2"
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
        },
        {
            name: "Child-3.1",
            ID: "95C4CBE4B1BA5D4297906BE9B2A89738",
            fullName: "Child-3.1"
        },
        {
            name: "Child-Filter-3.2",
            ID: "3B262165B0055546A81F086EB7F639BB",
            fullName: "Child-Filter-3.2"
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
         * UAG-SSJS-USR-33 Check that "getChildren" method returns all the groups belonging to Group at all sublevels if "false" is passed as parameter.
         */
    testGetChildrenMethodReturnsAllSubGroupsOfAllLevelsIf_False_IsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var actual = group.getChildren(false);
        var expected = [
        {
            name: "Child-1.1",
            ID: "DB0C9DE869075B4B9BC5B32D443A255E",
            fullName: "Child-1.1"
        },
        {
            name: "Child-1.2",
            ID: "2C6D91ACEAEE6541897E3EB1173858A3",
            fullName: "Child-1.2"
        },
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
        },
        {
            name: "Child-Filter-1.4",
            ID: "2AD386806AEA7D4184030E25DACF13FF",
            fullName: "Child-Filter-1.4"
        },
        {
            name: "Child-2.1",
            ID: "39B62A0E9780D1418FE3C114758395D2",
            fullName: "Child-2.1"
        },
        {
            name: "Child-2.2",
            ID: "5E5A8CAA3FD1DC4EA9B9AAB5BF523B6C",
            fullName: "Child-2.2"
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
        },
        {
            name: "Child-3.1",
            ID: "95C4CBE4B1BA5D4297906BE9B2A89738",
            fullName: "Child-3.1"
        },
        {
            name: "Child-Filter-3.2",
            ID: "3B262165B0055546A81F086EB7F639BB",
            fullName: "Child-Filter-3.2"
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
         * UAG-SSJS-USR-34 Check that "getChildren" method returns all the groups belonging to Group at all sublevels if "allLevels" is passed as parameter.
         */
    testGetChildrenMethodReturnsAllSubGroupsOfAllLevelsIf_AllLevels_StringIsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var actual = group.getChildren("allLevels");
        var expected = [
        {
            name: "Child-1.1",
            ID: "DB0C9DE869075B4B9BC5B32D443A255E",
            fullName: "Child-1.1"
        },
        {
            name: "Child-1.2",
            ID: "2C6D91ACEAEE6541897E3EB1173858A3",
            fullName: "Child-1.2"
        },
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
        },
        {
            name: "Child-Filter-1.4",
            ID: "2AD386806AEA7D4184030E25DACF13FF",
            fullName: "Child-Filter-1.4"
        },
        {
            name: "Child-2.1",
            ID: "39B62A0E9780D1418FE3C114758395D2",
            fullName: "Child-2.1"
        },
        {
            name: "Child-2.2",
            ID: "5E5A8CAA3FD1DC4EA9B9AAB5BF523B6C",
            fullName: "Child-2.2"
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
        },
        {
            name: "Child-3.1",
            ID: "95C4CBE4B1BA5D4297906BE9B2A89738",
            fullName: "Child-3.1"
        },
        {
            name: "Child-Filter-3.2",
            ID: "3B262165B0055546A81F086EB7F639BB",
            fullName: "Child-Filter-3.2"
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
         * UAG-SSJS-USR-35 Check that "getChildren" method returns only the groups directly assigned to a group if "true" is passed as parameter.
         */
    testGetChildrenMethodReturnsOnlySubGroupsOfFirstLevelsIf_True_IsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var actual = group.getChildren(true);
        var expected = [
        {
            name: "Child-1.1",
            ID: "DB0C9DE869075B4B9BC5B32D443A255E",
            fullName: "Child-1.1"
        },
        {
            name: "Child-1.2",
            ID: "2C6D91ACEAEE6541897E3EB1173858A3",
            fullName: "Child-1.2"
        },
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
        },
        {
            name: "Child-Filter-1.4",
            ID: "2AD386806AEA7D4184030E25DACF13FF",
            fullName: "Child-Filter-1.4"
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
         * UAG-SSJS-USR-36 Check that "getChildren" method returns only the groups directly assigned to a group if "firstLevel" is passed as parameter.
         */
    testGetChildrenMethodReturnsOnlySubGroupsOfFirstLevelsIf_FirstLevel_StringIsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var actual = group.getChildren("firstLevel");
        var expected = [
        {
            name: "Child-1.1",
            ID: "DB0C9DE869075B4B9BC5B32D443A255E",
            fullName: "Child-1.1"
        },
        {
            name: "Child-1.2",
            ID: "2C6D91ACEAEE6541897E3EB1173858A3",
            fullName: "Child-1.2"
        },
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
        },
        {
            name: "Child-Filter-1.4",
            ID: "2AD386806AEA7D4184030E25DACF13FF",
            fullName: "Child-Filter-1.4"
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
         * UAG-SSJS-GRP-37 Check that "getParents" method exists
         */
    testGetParentsMethodExists: function() {
        var group = directory.group("Default");
        Y.Assert.isNotUndefined(group.getParents);
        Y.Assert.isClassOf("Function", group.getParents);
    },
    
    /**
         * UAG-SSJS-GRP-38 Check that "getParents" method returns, by default, all the parent groups of the Group at all levels.
         */
    testGetParentsMethodReturnsAllParentGroupsOfAllLevelsByDefault: function() {
        var group = directory.group("Child-3.1");
        var actual = group.getParents();
        var expected = [
        {
            name: "Parent",
            ID: "48FF6552E6F36044916F48ACBEDB1386",
            fullName: "Parent"
        },
        {
            name: "Parent-Filter",
            ID: "7316BD842F1494408A9923583CC54930",
            fullName: "Parent-Filter"  
        },
        {
            name: "Child-1.1",
            ID: "DB0C9DE869075B4B9BC5B32D443A255E",
            fullName: "Child-1.1"
        },
        {
            name: "Child-1.2",
            ID: "2C6D91ACEAEE6541897E3EB1173858A3",
            fullName: "Child-1.2"
        },
        {
            name: "Child-2.1",
            ID: "39B62A0E9780D1418FE3C114758395D2",
            fullName: "Child-2.1"
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
        },{
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
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
         * UAG-SSJS-GRP-39 Check that "getParents" method returns all the parent groups of the Group at all levels if "false" is passed in the level parameter.
         */
    testGetParentsMethodReturnsAllParentGroupsOfAllLevelsIf_False_IsPassedInLevelParam: function() {
        var group = directory.group("Child-3.1");
        var actual = group.getParents(false);
        var expected = [
        {
            name: "Parent",
            ID: "48FF6552E6F36044916F48ACBEDB1386",
            fullName: "Parent"
        },
        {
            name: "Parent-Filter",
            ID: "7316BD842F1494408A9923583CC54930",
            fullName: "Parent-Filter"  
        },
        {
            name: "Child-1.1",
            ID: "DB0C9DE869075B4B9BC5B32D443A255E",
            fullName: "Child-1.1"
        },
        {
            name: "Child-1.2",
            ID: "2C6D91ACEAEE6541897E3EB1173858A3",
            fullName: "Child-1.2"
        },
        {
            name: "Child-2.1",
            ID: "39B62A0E9780D1418FE3C114758395D2",
            fullName: "Child-2.1"
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
        },
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
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
         * UAG-SSJS-GRP-40 Check that "getParents" method returns all the parent groups of the Group at all levels if "allLevels" is passed in the level parameter.
         */
    testGetParentsMethodReturnsAllParentGroupsOfAllLevelsIf_AllLevels_StringIsPassedInLevelParam: function() {
        var group = directory.group("Child-3.1");
        var actual = group.getParents("allLevels");
        var expected = [
        {
            name: "Parent",
            ID: "48FF6552E6F36044916F48ACBEDB1386",
            fullName: "Parent"
        },
        {
            name: "Parent-Filter",
            ID: "7316BD842F1494408A9923583CC54930",
            fullName: "Parent-Filter"  
        },
        {
            name: "Child-1.1",
            ID: "DB0C9DE869075B4B9BC5B32D443A255E",
            fullName: "Child-1.1"
        },
        {
            name: "Child-1.2",
            ID: "2C6D91ACEAEE6541897E3EB1173858A3",
            fullName: "Child-1.2"
        },
        {
            name: "Child-2.1",
            ID: "39B62A0E9780D1418FE3C114758395D2",
            fullName: "Child-2.1"
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
        },
        {
            name: "Child-Filter-1.3",
            ID: "514117E8AF29EC4AA9680AFBC2971AC4",
            fullName: "Child-Filter-1.3"
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
         * UAG-SSJS-GRP-41 Check that "getParents" method returns only the parent groups to which the Group is directly assigned if "true" is passed in the level parameter.
         */
    testGetParentsMethodReturnsOnlyParentGroupsOfFirstLevelIf_True_IsPassedInLevelParam: function() {
        var group = directory.group("Child-3.1");
        var actual = group.getParents(true);
        var expected = [
        {
            name: "Child-2.1",
            ID: "39B62A0E9780D1418FE3C114758395D2",
            fullName: "Child-2.1"
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
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
         * UAG-SSJS-GRP-42 Check that "getParents" method returns only the parent groups to which the Group is directly assigned if "true" is passed in the level parameter.
         */
    testGetParentsMethodReturnsOnlyParentGroupsOfFirstLevelIf_FirstLevel_StringIsPassedInLevelParam: function() {
        var group = directory.group("Child-3.1");
        var actual = group.getParents("firstLevel");
        var expected = [
        {
            name: "Child-2.1",
            ID: "39B62A0E9780D1418FE3C114758395D2",
            fullName: "Child-2.1"
        },
        {
            name: "Child-Filter-2.3",
            ID: "66B636E8C4A42B4E807844461E8D9CFC",
            fullName: "Child-Filter-2.3"
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
         * UAG-SSJS-GRP-43 Check that "getUsers" method exists
         */
    testGetUsersMethodExists: function() {
        var group = directory.group("Default");
        Y.Assert.isNotUndefined(group.getUsers);
        Y.Assert.isClassOf("Function", group.getUsers);
    },
    
    /**
         * UAG-SSJS-GRP-44 Check that "getUsers" method returns, by default, all the users belonging to the group at all sublevels.
         */
    testGetUsersMethodReturnsAllUsersBelongingToGroupOfAllSubLevelsByDefault: function() {
        var group = directory.group("Parent");
        var actual = group.getUsers();
        var expected = [
        {
            name: "user-parent-1",
            ID: "18ACBC5D5E99714A9EBF5C9D8FDAAEDE",
        },
        {
            name: "user-parent-2-filter*",
            ID: "B4058A1C8B1BD94DA9E71BECBC68F9A1"
        },
        {
            name: "user-child-1.1-1",
            ID: "18DB6A506445C044B636DF3967941C37"
        },
        {
            name: "user-child-1.1-2-filter*",
            ID: "F749E8EB996CEE498E73E9AF113F62F2"
        },
        {
            name: "user-child-2.1-1",
            ID: "C429F8E327EF814999F6927E884A2103"
        },
        {
            name: "user-child-1.2-1",
            ID: "D4CCABFDC56594408348EBCFC8345564"
        },
        {
            name: "user-child-2.2-1-filter*",
            ID: "9D4685AB798CB54CBA3A35808B609F3A"
        },
        { 
            name: "user-child-3.1-1",
            ID: "BBFAFF7C34C5BB48B2C8C92AD082F696"
        },
        {
            name: "user-child-3.1-2-filter*",
            ID:"6656EFDE23EAA240919607129F40C359"
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
         * UAG-SSJS-GRP-45 Check that "getUsers" method returns all the users belonging to the group at all sublevels if "false" is passed in the level parameter.
         */
    testGetUsersMethodReturnsAllUsersBelongingToGroupOfAllSubLevelsIf_False_IsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var actual = group.getUsers(false);
        var expected = [
        {
            name: "user-parent-1",
            ID: "18ACBC5D5E99714A9EBF5C9D8FDAAEDE",
        },
        {
            name: "user-parent-2-filter*",
            ID: "B4058A1C8B1BD94DA9E71BECBC68F9A1"
        },
        {
            name: "user-child-1.1-1",
            ID: "18DB6A506445C044B636DF3967941C37"
        },
        {
            name: "user-child-1.1-2-filter*",
            ID: "F749E8EB996CEE498E73E9AF113F62F2"
        },
        {
            name: "user-child-2.1-1",
            ID: "C429F8E327EF814999F6927E884A2103"
        },
        {
            name: "user-child-1.2-1",
            ID: "D4CCABFDC56594408348EBCFC8345564"
        },
        {
            name: "user-child-2.2-1-filter*",
            ID: "9D4685AB798CB54CBA3A35808B609F3A"
        },
        { 
            name: "user-child-3.1-1",
            ID: "BBFAFF7C34C5BB48B2C8C92AD082F696"
        },
        {
            name: "user-child-3.1-2-filter*",
            ID:"6656EFDE23EAA240919607129F40C359"
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
         * UAG-SSJS-GRP-46 Check that "getUsers" method returns all the users belonging to the group at all sublevels if "allLevels" is passed in the level parameter.
         */
    testGetUsersMethodReturnsAllUsersBelongingToGroupOfAllSubLevelsIf_AllLevels_StringIsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var actual = group.getUsers("allLevels");
        var expected = [
        {
            name: "user-parent-1",
            ID: "18ACBC5D5E99714A9EBF5C9D8FDAAEDE",
        },
        {
            name: "user-parent-2-filter*",
            ID: "B4058A1C8B1BD94DA9E71BECBC68F9A1"
        },
        {
            name: "user-child-1.1-1",
            ID: "18DB6A506445C044B636DF3967941C37"
        },
        {
            name: "user-child-1.1-2-filter*",
            ID: "F749E8EB996CEE498E73E9AF113F62F2"
        },
        {
            name: "user-child-2.1-1",
            ID: "C429F8E327EF814999F6927E884A2103"
        },
        {
            name: "user-child-1.2-1",
            ID: "D4CCABFDC56594408348EBCFC8345564"
        },
        {
            name: "user-child-2.2-1-filter*",
            ID: "9D4685AB798CB54CBA3A35808B609F3A"
        },
        { 
            name: "user-child-3.1-1",
            ID: "BBFAFF7C34C5BB48B2C8C92AD082F696"
        },
        {
            name: "user-child-3.1-2-filter*",
            ID:"6656EFDE23EAA240919607129F40C359"
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
         * UAG-SSJS-GRP-47 Check that "getUsers" method returns only users who are directly assigned to the group if "true" is passed in the level parameter.
         */
    testGetUsersMethodReturnsAllUsersBelongingToGroupOfOnlyFirstLevelIf_True_IsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var actual = group.getUsers(true);
        var expected = [
        {
            name: "user-parent-1",
            ID: "18ACBC5D5E99714A9EBF5C9D8FDAAEDE",
        },
        {
            name: "user-parent-2-filter*",
            ID: "B4058A1C8B1BD94DA9E71BECBC68F9A1"
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
         * UAG-SSJS-GRP-48 Check that "getUsers" method returns only users who are directly assigned to the group if "firstLevel" is passed in the level parameter.
         */
    testGetUsersMethodReturnsAllUsersBelongingToGroupOfOnlyFirstLevelIf_FirstLevel_StringIsPassedInLevelParam: function() {
        var group = directory.group("Parent");
        var actual = group.getUsers("firstLevel");
        var expected = [
        {
            name: "user-parent-1",
            ID: "18ACBC5D5E99714A9EBF5C9D8FDAAEDE",
        },
        {
            name: "user-parent-2-filter*",
            ID: "B4058A1C8B1BD94DA9E71BECBC68F9A1"
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
     * UAG-SSJS-GRP-49 Check that "putInto" method exists
     */
    testPutIntoMethodExists: function() {
        var group = directory.group("default");
        Y.Assert.isNotUndefined(group.putInto);
        Y.Assert.isClassOf("Function", group.putInto);
    },
    
    /**
     * UAG-SSJS-GRP-50 Check that "putInto" method adds the Group to the group passed in the groupList parameter using its name.
     */
    testPutIntoMethodAddsTheGroupToGroupPassedInGroupListParamUsingGroupName: function() {
        var grpName = "ToPutInto-1";
        var group = directory.group(grpName);
        var expected =
        {
            name: "Check-PutInto-1",
            ID: "5BEBF3BC6FDFC444892C349E88A5FC7B"
        };
        
        // Be sure that the group does not belongs to the group.
        var actual = group.getParents(true);
        var length1 = actual.length;
        // as we don't have an api to assert an array of objects
        if(utils.contains(actual, "ID", expected.ID))
                Y.Assert.fail("Group: " + grpName + " should not belong to the group: " + expected.name);
        try{
            group.putInto(expected.name);
            // we should reload the group to work it out
            group = directory.group(grpName);
            // be sure that the group belongs now to the group.
            actual = group.getParents(true);
            Y.Assert.areSame(length1+1, actual.length, "Group should be added to parents list");
            if(!utils.contains(actual, "ID", expected.ID))
                Y.Assert.fail("Group: " + grpName + " must now belong to the group: " + expected.name);
        }finally{
            group.removeFrom(expected.name);
        }
    },
    
    /**
     * UAG-SSJS-GRP-51 Check that "putInto" method adds the Group to the group passed in the groupList parameter using its ID.
     */
    testPutIntoMethodAddsTheGroupToGroupPassedInGroupListParamUsingGroupId: function() {
        var grpName = "ToPutInto-1";
        var group = directory.group(grpName);
        var expected =
        {
            name: "Check-RemoveFrom-2",
            ID: "4D5B3648774F2946ABBBD2EC7861A796"
        };
        
        // Be sure that the group does not belongs to the group.
        var actual = group.getParents(true);
        var length1 = actual.length;
        // as we don't have an api to assert an array of objects
        if(utils.contains(actual, "ID", expected.ID))
                Y.Assert.fail("Group: " + grpName + " should not belong to the group: " + expected.name);
        try{
            group.putInto(expected.ID);
            // we should reload the group to work it out
            group = directory.group(grpName);
            // be sure that the group belongs now to the group.
            actual = group.getParents(true);
            Y.Assert.areSame(length1+1, actual.length, "Group should be added to parents list");
            if(!utils.contains(actual, "ID", expected.ID))
                Y.Assert.fail("Group: " + grpName + " must now belong to the group: " + expected.name);
        }finally{
            group.removeFrom(expected.name);
        }
    },
    
    /**
     * UAG-SSJS-GRP-52 Check that "putInto" method adds the Group to the group passed in the groupList parameter using its reference.
     */
    testPutIntoMethodAddsTheGroupToGroupPassedInGroupListParamUsingGroupReference: function() {
        var grpName = "ToPutInto-1";
        var group = directory.group(grpName);
        var expected =
        {
            name: "Check-RemoveFrom-3",
            ID: "776A731A38AE524AB43A04C0BCD0E57F"
        };
        
        // Be sure that the group does not belongs to the group.
        var actual = group.getParents(true);
        var length1 = actual.length;
        // as we don't have an api to assert an array of objects
        if(utils.contains(actual, "ID", expected.ID))
                Y.Assert.fail("Group: " + grpName + " should not belong to the group: " + expected.name);
        try{
            var toPutInto = directory.group(expected.name);
            group.putInto(toPutInto);
            // we should reload the group to work it out
            group = directory.group(grpName);
            // be sure that the group belongs now to the group.
            actual = group.getParents(true);
            Y.Assert.areSame(length1+1, actual.length, "Group should be added to parents list");
            if(!utils.contains(actual, "ID", expected.ID))
                Y.Assert.fail("Group: " + grpName + " must now belong to the group: " + expected.name);
        }finally{
            group.removeFrom(expected.name);
        }
    },
    
    /**
     * UAG-SSJS-GRP-53 Check that "putInto" method adds the Group to the groups passed in the groupList parameter as a mixed list of group names, IDs, and references.
     */
    testPutIntoMethodAddsTheGroupToGroupPassedInGroupListParamUsingMixedListOfGroupNameIdAndReference: function() {
        var grpName = "ToPutInto-2";
        var group = directory.group(grpName);

        try{
            var grp1 = "Check-PutInto-4";
            var grp2 = "A7B819697FF53F41A490A53FD788BFA7";
            var grp3 = directory.group("Check-PutInto-6");
            group.putInto(grp1, grp2, grp3);
            var expected = [
            {
                name:"Check-PutInto-4",
                ID:"9C2FFD0327294642BB819DC204B02903",
                fullName:"Check-PutInto-4"
            },
            {
                name:"Check-PutInto-5",
                ID:"A7B819697FF53F41A490A53FD788BFA7",
                fullName:"Check-PutInto-5"
            },
            {
                name:"Check-PutInto-6",
                ID:"B463000BE4BBB34A84719223F1C42294",
                fullName:"Check-PutInto-6"
            }
            ];
            var actual = group.getParents(true);
            Y.Assert.areSame(expected.length, actual.length);
            // Sort arrays
            utils.sortBy(expected, "ID");
            utils.sortBy(actual, "ID");
        
            for(var i=0; i<actual.length; i++){        
                Y.ObjectAssert.areEqual(expected[i], actual[i]);
            }
        }finally{
            group.removeFrom(grp1, grp2, grp3);
        }
        
    },
    
    /**
     * UAG-SSJS-GRP-54 Check that "putInto" method adds the Group to the groups passed in the groupList parameter as an array of group names, IDs, and references.
     */
    testPutIntoMethodAddsTheGroupToGroupPassedInGroupListParamUsingAnArrayOfGroupNameIdAndReference: function() {
        var grpName = "ToPutInto-2";
        var group = directory.group(grpName);

        try{
            var grp1 = "Check-PutInto-4";
            var grp2 = "A7B819697FF53F41A490A53FD788BFA7";
            var grp3 = directory.group("Check-PutInto-6");
            group.putInto([grp1, grp2, grp3]);
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
            var actual = group.getParents(true);
            Y.Assert.areSame(expected.length, actual.length);
            // Sort arrays
            utils.sortBy(expected, "ID");
            utils.sortBy(actual, "ID");
        
            for(var i=0; i<actual.length; i++){        
                Y.ObjectAssert.areEqual(expected[i], actual[i]);
            }
        }finally{
            group.removeFrom(grp1, grp2, grp3);
        }
        
    },
    
    /**
     * UAG-SSJS-GRP-55 Check that "remove" method exists
     */
    testRemoveMethodExists: function() {
        var group = directory.group("default");
        Y.Assert.isNotUndefined(group.remove);
        Y.Assert.isClassOf("Function", group.remove);
    },
    
    /**
     * UAG-SSJS-GRP-56 Check that "remove" method removes the Group from the solution's Directory.
     */
    testRemoveMethodLogic: function() {
        var grpName = "Check-Remove";
        var group = directory.group(grpName);
        Y.Assert.isNotNull(group);
        group.remove();
        try{
            group = directory.group(grpName);
            Y.Assert.isNull(group);
        }finally{
            directory.addGroup(grpName);
        }
    },
    
    /**
     * UAG-SSJS-GRP-57 Check that "removeFrom" method exists
     */
    testRemoveFromMethodExists: function() {
        var group = directory.group("Default");
        Y.Assert.isNotUndefined(group.removeFrom);
        Y.Assert.isClassOf("Function", group.removeFrom);
    },
    
    /**
     * UAG-SSJS-GRP-58 Check that "removeFrom" removes the Group from the group passed in the groupList parameter using the name.
     */
    testRemoveFromMethodRemovesTheGroupFromGroupPassedInGroupListParamUsingGroupName: function() {
        var grpName = "ToRemoveFrom-1";
        var group = directory.group(grpName);
        // Be sure that the group belongs to the group to remove from
        var actual = group.getParents();
        var length1 = actual.length;
        var target =
        {
            name: "Check-RemoveFrom-1",
            ID: "C82A92C517CA8948A59C11E245A6E17A"
        };
        // as we don't have an api to assert an array of objects
        if(!utils.contains(actual, "ID", target.ID))
            Y.Assert.fail("Group: " + grpName + " must belong to group: " + target.name);
        
        // Remove the user from the group
        var grp = target.name;
        try{
            group.removeFrom(grp);
            // Be sure that the group does not belong to the group anymore.
            // as removeFrom seems to be async, reload the user
            group = directory.group(grpName);
            actual = group.getParents();
            var length2 = actual.length;
            Y.Assert.areSame(length1-1, length2, "Group \"" + target.name + "\" should be deleted from \""+ grpName + "\" 's parents list");

            if(utils.contains(actual, "ID", target.ID))
                Y.Assert.fail("Group: " + grpName + " should not belong to group: " + target.name + " anymore");
        }finally{
            // put the group back into the removed groups
            group.putInto(target.name);
        }
       
    },
    
     /**
     * UAG-SSJS-GRP-59 Check that "removeFrom" removes the Group from the group passed in the groupList parameter using the ID.
     */
    testRemoveFromMethodRemovesTheGroupFromGroupPassedInGroupListParamUsingGroupId: function() {
        var grpName = "ToRemoveFrom-1";
        var group = directory.group(grpName);
        // Be sure that the group belongs to the group to remove from
        var actual = group.getParents();
        var length1 = actual.length;
        var target =
        {
            name: "Check-RemoveFrom-2",
            ID: "4D5B3648774F2946ABBBD2EC7861A796"
        };
        // as we don't have an api to assert an array of objects
        var found = false;
        if(!utils.contains(actual, "ID", target.ID))
            Y.Assert.fail("Group: " + grpName + " must belong to group: " + target.name);
        
        // Remove the user from the group
        var grp = target.ID;
        try{
            group.removeFrom(grp);
            // Be sure that the group does not belong to the group anymore.
            // as removeFrom seems to be async, reload the user
            group = directory.group(grpName);
            actual = group.getParents();
            var length2 = actual.length;
            Y.Assert.areSame(length1-1, length2, "Group \"" + target.name + "\" should be deleted from \""+ grpName + "\" 's parents list");
        
            if(utils.contains(actual, "ID", target.ID))
                Y.Assert.fail("Group: " + grpName + " should not belong to group: " + target.name + " anymore");
        }finally{
            // put the group back into the removed groups
            group.putInto(target.name);
        }
       
    },
    
    /**
     * UAG-SSJS-GRP-60 Check that "removeFrom" removes the Group from the group passed in the groupList parameter using the reference.
     */
    testRemoveFromMethodRemovesTheGroupFromGroupPassedInGroupListParamUsingGroupReference: function() {
        var grpName = "ToRemoveFrom-1";
        var group = directory.group(grpName);
        // Be sure that the group belongs to the group to remove from
        var actual = group.getParents();
        var length1 = actual.length;
        var target =
        {
            name: "Check-RemoveFrom-3",
            ID: "776A731A38AE524AB43A04C0BCD0E57F"
        };
        // as we don't have an api to assert an array of objects
        if(!utils.contains(actual, "ID", target.ID))
            Y.Assert.fail("Group: " + grpName + " must belong to group: " + target.name);
        
        // Remove the user from the group
        var grp = directory.group(target.name);
        try{
            group.removeFrom(grp);
            // Be sure that the group does not belong to the group anymore.
            // as removeFrom seems to be async, reload the group
            group = directory.group(grpName);
            actual = group.getParents();
            var length2 = actual.length;
            Y.Assert.areSame(length1-1, length2, "Group \"" + target.name + "\" should be deleted from \""+ grpName + "\" 's parents list");
        
            if(utils.contains(actual, "ID", target.ID))
                Y.Assert.fail("Group: " + grpName + " should not belong to group: " + target.name + " anymore");
        }finally{
            // put the group back into the removed groups
            group.putInto(target.name);
        }
    },
    
    /**
     * UAG-SSJS-GRP-61 Check that "removeFrom" method removes the Group from the groups passed in the groupList parameter as a mixed list of group name, ID, and reference.
     */
    testRemoveFromMethodRemovesTheGroupFromGroupPassedInGroupListParamUsingMixedListOfGroupNameIdAndReference: function() {
        var grpName = "ToRemoveFrom-2";
        var group = directory.group(grpName);
        // Be sure that the group belongs to the group to remove from
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
        var actual = group.getParents();
        for(var i=0; i<expected.length; i++){        
            if(!utils.contains(actual, "ID", expected[i].ID))
                Y.Assert.fail("Group: " + grpName + " must belong to the group: " + expected[i].name);
        }
        
        try{
            // Remove the group from it parents groups using a list of name, ID and reference
            var grp1 = expected[0].name;
            var grp2 = expected[1].ID;
            var grp3 = directory.group(expected[2].name);

            group.removeFrom(grp1, grp2, grp3);
            // as removeFrom seems to be async, reload the group
            group = directory.group(grpName);
            // Be sure that the group does not belong to that groups anymore.
            actual = group.getParents();
            Y.Assert.areSame(1, actual.length);
            Y.ObjectAssert.areEqual(expected[3], actual[0]);
        }
        finally{
            // put the group back into the removed groups
            group.putInto(expected[0].name, expected[1].name, expected[2].name);
        }
    },
    
     /**
     * UAG-SSJS-GRP-62 Check that "removeFrom" method removes the Group from the groups passed in the groupList parameter as an array of group name, ID, and reference.
     */
    testRemoveFromMethodRemovesTheGroupFromGroupPassedInGroupListParamUsingAnArrayOfGroupNameIdAndReference: function() {
        var grpName = "ToRemoveFrom-3";
        var group = directory.group(grpName);
        // Be sure that the group belongs to the group to remove from
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
        var actual = group.getParents();
        for(var i=0; i<expected.length; i++){        
            if(!utils.contains(actual, "ID", expected[i].ID))
                Y.Assert.fail("Group: " + grpName + " must belong to the group: " + expected[i].name);
        }
        
        try{
            // Remove the group from it parents groups using a list of name, ID and reference
            var grp1 = expected[0].name;
            var grp2 = expected[1].ID;
            var grp3 = directory.group(expected[2].name);

            group.removeFrom([grp1, grp2, grp3]);
            // as removeFrom seems to be async, reload the group
            group = directory.group(grpName);
            // Be sure that the group does not belong to that groups anymore.
            actual = group.getParents();
            Y.Assert.areSame(1, actual.length);
            Y.ObjectAssert.areEqual(expected[3], actual[0]);
        }
        finally{
            // put the group back into the removed groups
            group.putInto(expected[0].name, expected[1].name, expected[2].name);
        }
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

