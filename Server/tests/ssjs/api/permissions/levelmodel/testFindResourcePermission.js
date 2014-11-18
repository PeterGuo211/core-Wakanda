

// Admin ID : 01000000000000000000000000000000
// YWRtaW46YWRtaW4= equivalent to btoa("admin","admin")
// dXNlcjp1c2Vy equivalent to btoa("user","user")
// ZGVmYXVsdDpkZWZhdWx0 equivalent btoa("default,"default")


var testCase = {
    name: "Test FindResourcePermission() function on Model Level",

    /**
     * SSJS-PERM-1 
     */

    testForReadPermissionOnModel: function() {
		
		var a = application.permissions.findResourcePermission('model','Model','read');
		Y.Assert.areSame("read",a.action);
		Y.Assert.areSame("ModelGroup",a.groupName);	
		Y.Assert.areSame("CF1A9BA069C6664FB08B3CCC22226FD5",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("model",a.type);		
		
    },
     testForCreatePermissionOnModel: function() {
		
		var a = application.permissions.findResourcePermission('model','Model','create');
		Y.Assert.areSame("create",a.action);	
		Y.Assert.areSame("ModelGroup",a.groupName);	
		Y.Assert.areSame("CF1A9BA069C6664FB08B3CCC22226FD5",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("model",a.type);		
		
    },
     testForUpdatePermissionOnModel: function() {
		
		var a = application.permissions.findResourcePermission('model','Model','update');
		Y.Assert.areSame("update",a.action);	
		Y.Assert.areSame("ModelGroup",a.groupName);	
		Y.Assert.areSame("CF1A9BA069C6664FB08B3CCC22226FD5",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("model",a.type);		
		
		
     },
     
     testForRemovePermissionOnModel: function() {
		
		var a = application.permissions.findResourcePermission('model','Model','remove');
		Y.Assert.areSame("remove",a.action);	
		Y.Assert.areSame("ModelGroup",a.groupName);	
		Y.Assert.areSame("CF1A9BA069C6664FB08B3CCC22226FD5",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("model",a.type);		
		
		
     },
     
     testForExecutePermissionOnModel: function() {
		
		var a = application.permissions.findResourcePermission('model','Model','execute');
		Y.Assert.areSame("execute",a.action);	
		Y.Assert.areSame("ModelGroup",a.groupName);	
		Y.Assert.areSame("CF1A9BA069C6664FB08B3CCC22226FD5",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("model",a.type);		
		
		
     },
     
       testForDescribePermissionOnModel: function() {
		
		var a = application.permissions.findResourcePermission('model','Model','describe');
		Y.Assert.areSame("describe",a.action);	
		Y.Assert.areSame("ModelGroup",a.groupName);	
		Y.Assert.areSame("CF1A9BA069C6664FB08B3CCC22226FD5",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("model",a.type);		
		
		
     },
     
	testForPromotePermissionOnModel: function() {
		
		var a = application.permissions.findResourcePermission('model','Model','promote');
		Y.Assert.areSame("promote",a.action);	
		Y.Assert.areSame("ModelGroup",a.groupName);	
		Y.Assert.areSame("CF1A9BA069C6664FB08B3CCC22226FD5",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("model",a.type);		
		
		
     }
     
     // testForReadPermissionOnDataClassWhenPermissionInheritedFromModel: function() {
		
		// var a = application.permissions.findResourcePermission('dataClass','Model.DataClass','read');
		// Y.Assert.areSame("read",a.action);	
		// Y.Assert.areSame("ModelGroup",a.groupName);	
		// Y.Assert.areSame("CF1A9BA069C6664FB08B3CCC22226FD5",a.groupID);	
		// Y.Assert.areSame("false",a.temporaryForcePermissions);	
		// Y.Assert.areSame("model",a.type);		
		
		
     // },
     
     // testForReadPermissionOnAttributeWhenPermissionInheritedFromModel: function() {
		
		// var a = application.permissions.findResourcePermission('attribute','Model.DataClass.attribute_with_perm','read');
		// Y.Assert.areSame("read",a.action);	
		// Y.Assert.areSame("ModelGroup",a.groupName);	
		// Y.Assert.areSame("CF1A9BA069C6664FB08B3CCC22226FD5",a.groupID);	
		// Y.Assert.areSame("false",a.temporaryForcePermissions);	
		// Y.Assert.areSame("model",a.type);		
		
		
     // },
     
     // testForExecutePermissionOnMethodeWhenPermissionInheritedFromModel: function() {
		
		// var a = application.permissions.findResourcePermission('method','Model.DataClass.method_with_perm','execute');
		// Y.Assert.areSame("execute",a.action);	
		// Y.Assert.areSame("ModelGroup",a.groupName);	
		// Y.Assert.areSame("CF1A9BA069C6664FB08B3CCC22226FD5",a.groupID);	
		// Y.Assert.areSame("false",a.temporaryForcePermissions);	
		// Y.Assert.areSame("model",a.type);		
		
		
     // }



};

//require('unitTest').run(testCase).getReport()