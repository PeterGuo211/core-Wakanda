


/**
 * Unit tests for getBackupSettings
 */

var testCase = {
     name: "Test getBackupSettings behaviour",
     
    _should: {
		error: {
			
		},
		ignore: {
		}
    },
	 setUp : function () {
		
    	if (os.isWindows) {
    	}
    	else if (os.isLinux) {
    	}
		else {
			//MAC
		}
    },
 
    tearDown : function () {
    },
    
    testGetBackupSettingsDefaultValues: function () {
		//This test is run in a project which defines particular value for
		//maxRetainedBackups. Other settings are initialized b the server.
		//This test's purpose is to ensure that those values are correct.
		var result =null;
		var exceptions = 0;
		var settings = null;
			
		try{
			 settings = getBackupSettings();
		}
		
		catch(e){
			exceptions++;
		}
		finally{
		}

		Y.Assert.isNotNull(settings,"No settings returned");
		Y.Assert.isObject(settings,"Settings not an object");

		var properties = ["destination","backupRegistryFolder","useUniqueNames"];
		for(var i = 0;i < properties.length;i++){
			Y.Assert.isTrue(settings.hasOwnProperty(properties[i]),"Property '"+properties[i]+"' not found");
		}
		
		var folder = getFolder();
		var folderPath = folder.path+"Backups/"
		
		//Defined in this project's settings as 5
		//Y.Assert.areEqual(5,settings.maxRetainedBackups);
		
		//Defined by server to be true
		Y.Assert.isTrue(settings.useUniqueNames);
		
		//Default defined by server to be the project's root folder
		Y.Assert.areEqual(folderPath,settings.destination.path,"Invalid value for backup folder");
		Y.Assert.areEqual(folderPath,settings.backupRegistryFolder.path,"Invalid value for backup registry folder");
    }
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}

