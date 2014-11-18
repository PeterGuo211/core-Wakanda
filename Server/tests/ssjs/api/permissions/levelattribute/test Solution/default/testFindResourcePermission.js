

// Admin ID : 01000000000000000000000000000000
// YWRtaW46YWRtaW4= equivalent to btoa("admin","admin")
// dXNlcjp1c2Vy equivalent to btoa("user","user")
// ZGVmYXVsdDpkZWZhdWx0 equivalent btoa("default,"default")


var testCase = {
    name: "Test FindResourcePermission() function on Model Level",

    /**
     * SSJS-PERM-1 
     */

    testForReadPermissionOnAttribute: function() {
		
		var a = application.permissions.findResourcePermission("attribute","Model.DataClass.attribute_with_perm",'read');
		Y.Assert.areSame("read",a.action);
		Y.Assert.areSame("AttributeGroup",a.groupName);	
		Y.Assert.areSame("C31B97ABA170E440BA3DCDDEB6914A0A",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("attribute",a.type);		
		
    },
     testForCreatePermissionOnAttribute: function() {
		
		var a = application.permissions.findResourcePermission("attribute","Model.DataClass.attribute_with_perm",'create');
		Y.Assert.areSame("create",a.action);	
		Y.Assert.areSame("AttributeGroup",a.groupName);	
		Y.Assert.areSame("C31B97ABA170E440BA3DCDDEB6914A0A",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("attribute",a.type);		
		
    },
     testForUpdatePermissionOnAttribute: function() {
		
		var a = application.permissions.findResourcePermission("attribute","Model.DataClass.attribute_with_perm",'update');
		Y.Assert.areSame("update",a.action);	
		Y.Assert.areSame("AttributeGroup",a.groupName);	
		Y.Assert.areSame("C31B97ABA170E440BA3DCDDEB6914A0A",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("attribute",a.type);		
		
		
     },
     
     
     testForExecutePermissionOnMethod: function() {
		
		var a = application.permissions.findResourcePermission("method","Model.DataClass.method_with_perm",'execute');
		Y.Assert.areSame("execute",a.action);	
		Y.Assert.areSame("AttributeGroup",a.groupName);	
		Y.Assert.areSame("C31B97ABA170E440BA3DCDDEB6914A0A",a.groupID);	
		Y.Assert.areSame("false",a.temporaryForcePermissions);	
		Y.Assert.areSame("method",a.type);		
		
		
     },
     
     
	testForPromotePermissionOnMethod: function() {
		
		var a = application.permissions.findResourcePermission("method","Model.DataClass.method_with_perm",'promote');
		Y.Assert.areSame("promote",a.action);
		Y.Assert.areSame("AttributeGroup",a.groupName);
		Y.Assert.areSame("C31B97ABA170E440BA3DCDDEB6914A0A",a.groupID);
		Y.Assert.areSame("false",a.temporaryForcePermissions);
		Y.Assert.areSame("method",a.type);
		
		
     }
     



};

//require('unitTest').run(testCase).getReport()