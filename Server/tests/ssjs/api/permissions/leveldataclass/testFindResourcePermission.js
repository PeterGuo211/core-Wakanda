

// Admin ID : 01000000000000000000000000000000
// YWRtaW46YWRtaW4= equivalent to btoa("admin","admin")
// dXNlcjp1c2Vy equivalent to btoa("user","user")
// ZGVmYXVsdDpkZWZhdWx0 equivalent btoa("default,"default")


var testCase = {
    name: "Test FindResourcePermission() function on Model Level",

    /**
     * SSJS-PERM-1 
     */

    testForReadPermissionOnDataClass: function() {
		
		var a = application.permissions.findResourcePermission('dataClass','Model.DataClass','read');
		Y.Assert.areSame("read",a.action);
		Y.Assert.areSame("DataClassGroup",a.groupName);	
		Y.Assert.areSame("E1DDA5343AF8184883CAD9C8E0DB4836",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("dataClass",a.type);		
		
    },
     testForCreatePermissionOnDataClass: function() {
		
		var a = application.permissions.findResourcePermission('dataClass','Model.DataClass','create');
		Y.Assert.areSame("create",a.action);
		Y.Assert.areSame("DataClassGroup",a.groupName);	
		Y.Assert.areSame("E1DDA5343AF8184883CAD9C8E0DB4836",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("dataClass",a.type);		
		
    },
     testForUpdatePermissionOnDataClass: function() {
		
		var a = application.permissions.findResourcePermission('dataClass','Model.DataClass','update');		
		Y.Assert.areSame("update",a.action);
		Y.Assert.areSame("DataClassGroup",a.groupName);	
		Y.Assert.areSame("E1DDA5343AF8184883CAD9C8E0DB4836",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("dataClass",a.type);		
		
		
     },
     
     testForRemovePermissionOnDataClass: function() {
		
		var a = application.permissions.findResourcePermission('dataClass','Model.DataClass','remove');		
		Y.Assert.areSame("remove",a.action);
		Y.Assert.areSame("DataClassGroup",a.groupName);	
		Y.Assert.areSame("E1DDA5343AF8184883CAD9C8E0DB4836",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("dataClass",a.type);		
		
		
     },
     
     testForExecutePermissionOnDataClass: function() {
		
		var a = application.permissions.findResourcePermission('dataClass','Model.DataClass','execute');		
		Y.Assert.areSame("execute",a.action);
		Y.Assert.areSame("DataClassGroup",a.groupName);	
		Y.Assert.areSame("E1DDA5343AF8184883CAD9C8E0DB4836",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("dataClass",a.type);		
		
		
     },
     
       testForDescribePermissionOnDataClass: function() {
		
		var a = application.permissions.findResourcePermission('dataClass','Model.DataClass','describe');		
		Y.Assert.areSame("describe",a.action);
		Y.Assert.areSame("DataClassGroup",a.groupName);	
		Y.Assert.areSame("E1DDA5343AF8184883CAD9C8E0DB4836",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("dataClass",a.type);		
		
		
     },
     
	testForPromotePermissionOnModel: function() {
		
		var a = application.permissions.findResourcePermission('dataClass','Model.DataClass','promote');	
		Y.Assert.areSame("promote",a.action);
		Y.Assert.areSame("DataClassGroup",a.groupName);	
		Y.Assert.areSame("E1DDA5343AF8184883CAD9C8E0DB4836",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("dataClass",a.type);			
		
		
     },
     
     
     // testForReadPermissionOnDataClassWhenPermissionInheritedFromDataClass: function() {
		
		// var a = application.permissions.findResourcePermission('attribute','Model.DataClass.attribute_with_perm','read');
		// Y.Assert.areSame("read",a.action);
		// Y.Assert.areSame("DataClassGroup",a.groupName);	
		// Y.Assert.areSame("E1DDA5343AF8184883CAD9C8E0DB4836",a.groupID);	
		// Y.Assert.areSame("false",a.temporaryForcePermissions);	
		// Y.Assert.areSame("dataClass",a.type);	
		
		
     // },
     
     // testForExecutePermissionOnDataClassWhenPermissionInheritedFromDataClass: function() {
		
		// var a = application.permissions.findResourcePermission('method','Model.DataClass.method_with_perm','execute');
		// Y.Assert.areSame("execute",a.action);
		// Y.Assert.areSame("DataClassGroup",a.groupName);	
		// Y.Assert.areSame("E1DDA5343AF8184883CAD9C8E0DB4836",a.groupID);	
		// Y.Assert.areSame("false",a.temporaryForcePermissions);	
		// Y.Assert.areSame("dataClass",a.type);		
		
		
     // },
     
      testForReadPermissionOnModelIsUndefined: function() {
		
		var a = application.permissions.findResourcePermission('model','Model','read');
		Y.Assert.areSame(undefined,a);
     }

};

//require('unitTest').run(testCase).getReport()