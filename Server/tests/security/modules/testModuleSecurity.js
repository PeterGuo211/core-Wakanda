var notSecureModule = require('NotSecureModule');
var secureModule = require('SecureModule');

// Admin ID : 01000000000000000000000000000000
// YWRtaW46YWRtaW4= equivalent to btoa("admin","admin")
// dXNlcjp1c2Vy equivalent to btoa("user","user")
// ZGVmYXVsdDpkZWZhdWx0 equivalent btoa("default,"default")

var testCase = {
    name: "Test RPC Module Security",

    testAccessToFunctionWithoutPermissionInModuleWithDefaultPermissions: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8081/rpc/");
        var obj = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1325689971288,
            "module": "NotSecureModule",
            "method": "defaultAccess",
            "params": ["A", "B"]
        });
        xhr.send(obj);


    },

    testAccessToFunctionWithoutPermissionInModuleRestrictedToGroupAdminWhenNotAuthenticated: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8081/rpc/");
        var obj = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1325689971288,
            "module": "SecureModule",
            "method": "defaultAccess",
            "params": ["A", "B"]
        });
        xhr.send(obj);

        Y.Assert.areSame(xhr.status, 401);


    },

    testAccessToFunctionWithoutPermissionInModuleRestrictedToGroupAdminWhenAuthenticatedAsAdmin: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8081/rpc/", false);
        xhr.setRequestHeader("Authorization", "Basic " + "YWRtaW46YWRtaW4=");
        var obj = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1325689971288,
            "module": "SecureModule",
            "method": "defaultAccess",
            "params": ["A", "B"]
        });
        xhr.send(obj);
        Y.Assert.areSame(xhr.status, 200);
    },

  

    testAccessToFunctionWithoutPermissionInModuleRestrictedToGroupAdminWhenAuthenticatedAsAnotherUser: function() {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8081/rpc/", false);
        xhr.setRequestHeader("Authorization", "Basic " + "dXNlcjp1c2Vy");
        var obj = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1325689971288,
            "module": "SecureModule",
            "method": "defaultAccess",
            "params": ["A", "B"]
        });
        xhr.send(obj);
        Y.Assert.areSame(xhr.status, 401);
    },

    testAccessToFunctionRestritedToGroupAdminInModuleWithNoPermissionsWhenNotAuthenticated: function() {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8081/rpc/", false);
       
        var obj = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1325689971288,
            "module": "NotSecureModule",
            "method": "defaultAccessSecured",
            "params": ["A", "B"]
        });
        xhr.send(obj);
        Y.Assert.areSame( 401,xhr.status);
    },
    testAccessToFunctionRestritedToGroupAdminInModuleWithNoPermissionsWhenAuthenticatedAsAdmin: function() {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8081/rpc/", false);
        xhr.setRequestHeader("Authorization", "Basic " + "YWRtaW46YWRtaW4=");
        var obj = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1325689971288,
            "module": "NotSecureModule",
            "method": "defaultAccessSecured",
            "params": ["A", "B"]
        });
        xhr.send(obj);
        Y.Assert.areSame( 200,xhr.status);
    },
    
    testAccessToFunctionRestritedToGroupAdminInModuleWithNoPermissionsWhenAuthenticatedAsAnotherUser: function() {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8081/rpc/", false);
        xhr.setRequestHeader("Authorization", "Basic " + "dXNlcjp1c2Vy");
        var obj = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1325689971288,
            "module": "NotSecureModule",
            "method": "defaultAccessSecured",
            "params": ["A", "B"]
        });
        xhr.send(obj);
        Y.Assert.areSame( 401,xhr.status);
    },
    
    testAccessToFunctionRestritedToGroupAdminInModuleWithDefaultPermissionsWhenNotAuthenticated: function() {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8081/rpc/", false);
       
        var obj = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1325689971288,
            "module": "ModuleWithDefaultPermissions",
            "method": "defaultAccessSecured",
            "params": ["A", "B"]
        });
        xhr.send(obj);
        Y.Assert.areSame( 200,xhr.status);
    },
    testAccessToFunctionRestritedToGroupAdminInModuleWithDefaultPermissionsWhenAuthenticatedAsAdmin: function() {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8081/rpc/", false);
        xhr.setRequestHeader("Authorization", "Basic " + "YWRtaW46YWRtaW4=");
        var obj = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1325689971288,
            "module": "ModuleWithDefaultPermissions",
            "method": "defaultAccessSecured",
            "params": ["A", "B"]
        });
        xhr.send(obj);
        Y.Assert.areSame( 200,xhr.status);
    },
    
    testAccessToFunctionRestritedToGroupAdminInModuleWithDefaultPermissionsWhenAuthenticatedAsAnotherUser: function() {
		
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8081/rpc/", false);
        xhr.setRequestHeader("Authorization", "Basic " + "dXNlcjp1c2Vy");
        var obj = JSON.stringify({
            "jsonrpc": "2.0",
            "id": 1325689971288,
            "module": "ModuleWithDefaultPermissions",
            "method": "defaultAccessSecured",
            "params": ["A", "B"]
        });
        xhr.send(obj);
        Y.Assert.areSame( 200,xhr.status);
    }
    
    


};

// require('unitTest').run(testCase).getReport()