


/**
 * Unit tests for ds.backup()
 */
 
var baseFolderPath = application.getFolder("path");
var backupFolderPath = baseFolderPath + "Backups/";
var backupRegistryPath = baseFolderPath + "Backups/";


var compareConfig = function(config1,config2){
	var props = ["destination","backupRegistryFolder","useUniqueNames","maxRetainedBackups"];
	var ok = true;
	for(var i = 0;i < props.length && ok;i++){
		if (config1.hasOwnProperty(props[i]) && !config2.hasOwnProperty(props[i])){
			return -1;
		}else if (!config1.hasOwnProperty(props[i]) && config2.hasOwnProperty(props[i])){
			return 1;
		}
	}
	var ok = true;
	ok = ok && (config1.destination.path === config2.destination.path);
	ok = ok && (config1.backupRegistryFolder.path === config2.backupRegistryFolder.path);
	ok = ok && (config1.useUniqueNames === config2.useUniqueNames);
	ok = ok && (config1.maxRetainedBackups === config2.maxRetainedBackups);
	
	if(ok){
		return 0;
	}else{
		return 1;
	}
}

//Set of complete backup configurations with some properties being incorrectly typed.
//They should cause ds.backup() to throw an exception and not perform backup
//The exceptionText property contains the expected exception message to automate testing
var backupConfigsWithInvalidPropertyTypes= [
	//Those configurations have all required properties but they don't have a proper type
	{
		exceptionText:"Invalid type for backup configuration property 'destination', Folder expected",
		destination:backupFolderPath, //should be a folder
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'destination', Folder expected",
		destination:"", //should be a folder
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'destination', Folder expected",
		destination:true, //should be a folder
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'destination', Folder expected",
		destination:12, //should be a folder
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'destination', Folder expected",
		destination:null, //should be a folder
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'destination', Folder expected",
		destination:{foo:"bar"}, //should be a folder
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'backupRegistryFolder', Folder expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:"",
		useUniqueNames: true,
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'backupRegistryFolder', Folder expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:backupRegistryPath,
		useUniqueNames: true,
		maxRetainedBackups:"all"
	},
	{
		exceptionText:"Invalid type for backup configuration property 'backupRegistryFolder', Folder expected",
		destination:Folder(backupFolderPath),
		backupRegistryFolder:null,
		useUniqueNames: true,
		maxRetainedBackups:"all"
	},
	{
		exceptionText:"Invalid type for backup configuration property 'backupRegistryFolder', Folder expected",
		destination:Folder(backupFolderPath),
		backupRegistryFolder:42,
		useUniqueNames: true,
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'backupRegistryFolder', Folder expected",
		destination:Folder(backupFolderPath),
		backupRegistryFolder:true,
		useUniqueNames: true,
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'backupRegistryFolder', Folder expected",
		destination:Folder(backupFolderPath),
		backupRegistryFolder:'',
		useUniqueNames: true,
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'backupRegistryFolder', Folder expected",
		destination:Folder(backupFolderPath),
		backupRegistryFolder:{foo:"barr"},
		useUniqueNames: true,
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'useUniqueNames', bool expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: "true",
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'useUniqueNames', bool expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: "false",
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'useUniqueNames', bool expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: {foo:true},
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'useUniqueNames', bool expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: null,
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'useUniqueNames', bool expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: 42,
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid type for backup configuration property 'useUniqueNames', bool expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: 0,
		maxRetainedBackups:20
	},
	{
		exceptionText:"Invalid value for backup configuration property 'maxRetainedBackups'",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:"20"
	},
	{
		exceptionText:"Invalid value for backup configuration property 'maxRetainedBackups'",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:""
	},
	{
		exceptionText:"Invalid value for backup configuration property 'maxRetainedBackups'",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:0
	},
	{
		exceptionText:"Invalid value for backup configuration property 'maxRetainedBackups'",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:-12
	},
	{
		exceptionText:"Invalid value for backup configuration property 'maxRetainedBackups'",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:"{foo: true}"
	},
	{
		exceptionText:"Invalid type for backup configuration property 'maxRetainedBackups', number or string expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:null
	},
	{
		exceptionText:"Invalid type for backup configuration property 'maxRetainedBackups', number or string expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:{foo: true}
	},
	{
		exceptionText:"Invalid type for backup configuration property 'maxRetainedBackups', number or string expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:null
	},
	{
		exceptionText:"Invalid type for backup configuration property 'maxRetainedBackups', number or string expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:true
	},
	{
		exceptionText:"Invalid type for backup configuration property 'maxRetainedBackups', number or string expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true,
		maxRetainedBackups:null
	}
];

var testCase = {
     name: "Coverage tests for ds.backup() parameters validation",
     
    _should: {
		error: {
			
		},
		ignore: {
			testGetBackupSettingsDefaultValues:false,
			testBackupRejectsConfigWithInvalidPropertyTypes:false,
			testBackupConfigCompletion:false
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

		var properties = ["destination","backupRegistryFolder","useUniqueNames","maxRetainedBackups"];
		for(var i = 0;i < properties.length;i++){
			Y.Assert.isTrue(settings.hasOwnProperty(properties[i]),"Property '"+properties[i]+"' not found");
		}
		
		var folder = getFolder();
		var folderPath = folder.path+"Backups/"
		
		//Defined in this project's settings as 5
		Y.Assert.areEqual(5,settings.maxRetainedBackups);
		
		//Defined by server to be true
		Y.Assert.isTrue(settings.useUniqueNames);
		
		//Default defined by server to be the project's root folder
		Y.Assert.areEqual(folderPath,settings.destination.path,"Invalid value for backup folder");
		Y.Assert.areEqual(folderPath,settings.backupRegistryFolder.path,"Invalid value for backup registry folder");
    },
    
    testBackupRejectsConfigWithInvalidPropertyTypes: function () {
    	//Attempt to perform a backup with various
    	for(var i =0;i < backupConfigsWithInvalidPropertyTypes.length;i++){
    		var result =null;
			var exceptions = 0;
			var exceptionText = "";
			var config = backupConfigsWithInvalidPropertyTypes[i];
			try{
				result = ds.backup(config);
			}
			
			catch(e){
				exceptions++;
				exceptionText = e.message;
			}
			finally{
			}
			//No manifest should be generated
			Y.Assert.isNull(result,"Unexpected manifest file for config "+i);
			//No exception should have occured
			Y.Assert.areEqual(exceptions,1,"No exception thrown for config "+i);
			Y.Assert.areEqual(config.exceptionText,exceptionText,"Exception mismatch for config "+i);  		
    	}
    },
    testBackupConfigCompletion: function () {
    	//calls ds.backup() for dry run and inspect which final configuration would be used
    	var backupConfigsForCompletion = [
			{
				config:{dryRan:true},
				answer:"defaultConfig"
			},
			{
				config:{useUniqueNames: true},
				answer:"defaultConfig"
			},
			{
				config:{destination:Folder(backupFolderPath)},
				answer:"defaultConfig"
			},
			{
				config:{backupRegistryFolder:Folder(backupFolderPath)},
				answer:"defaultConfig"
			},
			{
				config:{maxRetainedBackups:5},
				answer:"defaultConfig"
			},
			{
				config:{maxRetainedBackups:10},
				answer:{useUniqueNames: true,destination:Folder(backupFolderPath),backupRegistryFolder:Folder(backupFolderPath),maxRetainedBackups:10}
			},
			{
				config:{useUniqueNames:false},
				answer:{useUniqueNames: false,destination:Folder(backupFolderPath),backupRegistryFolder:Folder(backupFolderPath),maxRetainedBackups:5}
			},
			{
				config:{destination:getFolder()},
				answer:{useUniqueNames: true,destination:getFolder(),backupRegistryFolder:Folder(backupFolderPath),maxRetainedBackups:5}
			},
			{
				config:{destination:Folder(backupFolderPath+"temp/"),maxRetainedBackups:"all"},
				answer:{useUniqueNames: true,destination:Folder(backupFolderPath+"temp/"),backupRegistryFolder:Folder(backupFolderPath),maxRetainedBackups:"all"}
			},
			{
				config:{destination:getFolder(),backupRegistryFolder:Folder(backupFolderPath+"tempRegistry/")},
				answer:{useUniqueNames: true,destination:getFolder(),backupRegistryFolder:Folder(backupFolderPath+"tempRegistry/")
					,maxRetainedBackups:5}
			},
			{
				config:{destination:Folder(backupFolderPath+"temp/"),backupRegistryFolder:Folder(backupFolderPath+"tempRegistry/")},
				answer:{useUniqueNames: true,destination:Folder(backupFolderPath+"temp/"),backupRegistryFolder:Folder(backupFolderPath+"tempRegistry/")
					,maxRetainedBackups:5}
			},
			{
				config:{destination:Folder(backupFolderPath+"temp/"),backupRegistryFolder:Folder(backupFolderPath+"tempRegistry/"),maxRetainedBackups:12},
				answer:{useUniqueNames: true,destination:Folder(backupFolderPath+"temp/"),backupRegistryFolder:Folder(backupFolderPath+"tempRegistry/")
					,maxRetainedBackups:12}
			},
			{
				config:{useUniqueNames:false,destination:Folder(backupFolderPath+"temp/"),backupRegistryFolder:Folder(backupFolderPath+"tempRegistry/"),maxRetainedBackups:12},
				answer:{useUniqueNames: false,destination:Folder(backupFolderPath+"temp/"),backupRegistryFolder:Folder(backupFolderPath+"tempRegistry/")
					,maxRetainedBackups:12}
			}
		];
    	for(var i =0;i < backupConfigsForCompletion.length;i++){
    		var result = null;
			var exceptions = 0;
			var exceptionText = "";
			var config = backupConfigsForCompletion[i].config;
			try{
				config["dryRunUnitTest"]=true;
				result = ds.backup(config);
			}
			
			catch(e){
				exceptions++;
				exceptionText = e.message;
			}
			finally{
			}
			//for dryRun, the returned result is an object which list the actual backup config
			//that would be used 
			Y.Assert.areEqual(0,exceptions,"Exception thrown for config "+i);  		
			Y.Assert.isNotNull(result,"Null result for config "+i);
			Y.Assert.isObject(result,"Not an object for config "+i);
			
			if(backupConfigsForCompletion[i].answer ==="defaultConfig"){
				Y.Assert.areEqual(0,compareConfig(result,getBackupSettings()),"backup config "+i+" differs from project config");
			}
			else{
				Y.Assert.areEqual(0,compareConfig(result,backupConfigsForCompletion[i].answer),"backup config "+i+"differs from expected result");
			}
    	}
    }
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}


