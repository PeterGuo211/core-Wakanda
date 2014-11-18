

// Admin ID : 01000000000000000000000000000000
// YWRtaW46YWRtaW4= equivalent to btoa("admin","admin")
// dXNlcjp1c2Vy equivalent to btoa("user","user")
// ZGVmYXVsdDpkZWZhdWx0 equivalent btoa("default,"default")


var testCase = {
    name: "Test FindResourcePermission() function on Module Level",

    /**
     * SSJS-PERM-1 
     */

    testForPromotePermissionOnModule: function() {
		
		var a = application.permissions.findResourcePermission("module","modulewithperm",'promote');
		Y.Assert.areSame("promote",a.action);
		Y.Assert.areSame("E260E87BE59CD241AC33ECDD1C221EC2",a.groupID);	
		Y.Assert.areSame("toBeChecked",a.customProperty);	
		Y.Assert.areSame("module",a.type);	
		Y.Assert.areSame("modulewithperm",a.resource);	
		
    },
    testForExecuteFromClientPermissionOnModule: function() {
		
		var a = application.permissions.findResourcePermission("module","modulewithperm",'executeFromClient');
		Y.Assert.areSame("executeFromClient",a.action);
		Y.Assert.areSame("E260E87BE59CD241AC33ECDD1C221EC2",a.groupID);	
		Y.Assert.areSame("toBeChecked",a.customProperty);	
		Y.Assert.areSame("module",a.type);	
		Y.Assert.areSame("modulewithperm",a.resource);	
		
    },
    
    testThatUndefinedIsReturnedWhenNoPermOnModule: function() {
		
	
		var a = application.permissions.findResourcePermission("module","modulewithoutperm",'executeFromClient');
		Y.Assert.areSame(undefined,a);
    },
    
      testForPromotePermissionOnModuleFunction: function() {
		
		var a = application.permissions.findResourcePermission("function","modulewithoutperm/test2",'promote');
		Y.Assert.areSame("promote",a.action);
		Y.Assert.areSame("E260E87BE59CD241AC33ECDD1C221EC2",a.groupID);		
		Y.Assert.areSame("function",a.type);	
		Y.Assert.areSame("modulewithoutperm/test2",a.resource);	
		
    },
    testForExecuteFromClientPermissionOnModuleFunction: function() {
		
		var a = application.permissions.findResourcePermission("function","modulewithoutperm/test1",'executeFromClient');
		Y.Assert.areSame("executeFromClient",a.action);
		Y.Assert.areSame("E260E87BE59CD241AC33ECDD1C221EC2",a.groupID);	
		Y.Assert.areSame("function",a.type);	
		Y.Assert.areSame("modulewithoutperm/test1",a.resource);	
		
    },
     

    testThatUndefinedIsReturnedWhenNoPermOnModuleFunction: function() {
		
		var a = application.permissions.findResourcePermission("function","modulewithoutperm/test2",'executeFromClient');
		Y.Assert.areSame(undefined,a);
    }

};

//require('unitTest').run(testCase).getReport()