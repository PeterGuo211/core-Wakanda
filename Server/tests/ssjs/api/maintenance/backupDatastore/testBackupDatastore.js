
/**
 * Unit tests for the backupDatastore method
 */
 function BackupReport(){
	this.warnings=[];
	this.errors=[];
};

BackupReport.prototype.addProblem = function(problem){
	if(problem.ErrorLevel == 3){
			this.warnings.push(problem);
		}else{
			this.errors.push(problem);
	}
};
 
var baseFolderPath = application.getFolder("path")+"NoJournal/";
var modelFolderPath = baseFolderPath+ "Models/";
var modelFilePath = modelFolderPath+ "Model.waModel"; 
var modelFile = new File(modelFilePath); 
var dataFolder = baseFolderPath + "DataFolder/";
var dataFilePath = baseFolderPath + "data.waData";
var dataFile = new File(dataFolder + "data.waData");
var backupFolderPath = baseFolderPath + "Backups/";
var backupRegistryPath = baseFolderPath + "Backups/";
var nonExistingModelFile = new File(modelFolderPath + "yzyzudifsqjdj.waModel"); 
var nonExistingDataFolder = new Folder(baseFolderPath + "BogusFolder/"); 
var nonExistingDataFile = new File(nonExistingDataFolder.path + "NotThere.waData");


function UniqueValuesInArray(inArray){
	for(var i = 0;i < inArray.length;i++){
		for (var j = i + 1,k = 0;k <inArray.length-1;k++,j++){
			if (j >= inArray.length){
				j = 0;
			}
			if (inArray[i].path === inArray[j].path)
			{
				return i;
			}
		}
	}
	return -1;
}

var createManifestObject = function(inManifestFile){ 
	var mystream = null;
	var data = "";
	var object = null;
	try{
		mystream =new TextStream(inManifestFile);
		do{	 
			data = data + mystream.read(1);
		}while(mystream.end()==false)
		mystream.close();
		object = JSON.parse(data);
	}
	catch(e){
		object = null;
	}
	return object;
};

var validateBackupFolderContent = function(backupFolder){
	var dataFolder = Folder(backupFolder.path+"DataFolder/");
	Y.Assert.isTrue(dataFolder.exists,"Folder not found: "+dataFolder.path);
	var files = ["data.Match","data.waData","data.waIndx","data.WakTDef"];
	Y.Assert.areEqual(dataFolder.files.length,files.length,"Incorrect number of files in backup folder: "+dataFolder.path);
	for(var i=0;i<files.length;++i){
		var path = dataFolder.path+files[i];
		Y.Assert.isTrue(File(path).exists,"File not found: "+path);
	}
	return true;
};

var validateManifestProperties = function(inManifestObjectOrRegistryEntry){
	Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("dataFolder"));
	Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("journal"));
	Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("date"));
	Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("version"));
	
	Y.Assert.isTrue(Folder(inManifestObjectOrRegistryEntry.dataFolder).exists);
	
	if(inManifestObjectOrRegistryEntry.journal != ""){
		Y.Assert.isTrue(File(inManifestObjectOrRegistryEntry.journal).exists);
	}
	
	return true;
};

function MySleep(delayInMs){
	var doSleep = function(){
		exitWait();
	}
    setTimeout(doSleep,1000);
    wait();
}



var countManifestInRegistry= function(manifestFile,backupRegistry){
	var occurences = 0;
	for(var i = 0; i < backupRegistry.length;i++){
		if ((backupRegistry[i]).path===manifestFile.path){
			occurences++;
		}
	}
	return occurences;
}

var testCase = {
     name: "backupDataStore: coverage for regular cases",
     
    _should: {
		error: {
			
		},
		ignore: {
			/*
			testBackupDataStoreWithUseUniqueNames: false,
			testBackupRetention: false,
			testBackupDataStoreWithNonUniqueNames: false
			*/
			
		}
    },
	 setUp : function () {
		exceptions = 0;
    	if (os.isWindows) {
    	}
    	else if (os.isLinux) {
    	}
		else {
			//MAC
		}
		 
		var d = new Folder(dataFolder);
		if(!d.exists){
			d.create();
		}
    },
 
    tearDown : function () {
    },
    
    testBackupDataStoreWithUseUniqueNames: function () {
		//Calls backupDataStore with a config that shall use unique names
		//In this configuration each backup (and manifest), should be stored in a particular folder
		//After several backups are created the various files should still be available.
		var manifestFile =null;
		var exceptions = 0;
		var config = {useUniqueNames:true,
			destination:Folder(backupFolderPath),
			backupRegistryFolder: Folder(backupRegistryPath),
			maxRetainedBackups: 5
		};
		
		if (config.destination.exists){
			config.destination.removeContent();
		}
		
		if (config.backupRegistryFolder.exists){
			config.backupRegistryFolder.removeContent();
		}
		
		var allManifFiles = [];
		var manifestFile = null;
		var manifestObject = null; 
		
		for (var i = 0; i < config.maxRetainedBackups;i++){
			manifestFile = null;
			manifestObject = null;
			try{
				 manifestFile = backupDataStore(modelFile,dataFile,config);
				 allManifFiles.push(manifestFile);
				 manifestObject = createManifestObject(manifestFile);
				 MySleep(1010);
			}
			catch(e){
			}
			finally{
				
			}
			Y.Assert.isNotNull(manifestFile,"No manifest file returned at round "+i);
			Y.Assert.isNotNull(manifestObject,"No manifest object returned at round "+i);
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry at round "+i);
			Y.Assert.isTrue(validateManifestProperties(manifestObject),"Invalid manifest object at round "+i);
			Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent),"Invalid backup folder content at round "+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
		}
		for(var i = 0;i < allManifFiles.length;i++){
			Y.Assert.isTrue(allManifFiles[i].exists,"Manifest file not found at round "+i);
			Y.Assert.isTrue(validateBackupFolderContent(allManifFiles[i].parent),"Invalid backup folder content at round "+i);
		}
	
		var duplicateIndex = UniqueValuesInArray(allManifFiles);
		Y.Assert.areEqual(-1,duplicateIndex,"Duplicate manifest file at index "+duplicateIndex);
    },

	testBackupRetention: function () {
		//Fills the backup registry with some backups
		//Checks all these backups
		//Then perform even more backups
		//Ensure outdated backups are correctly determined and properly removed from file system and registry
		//Ensure after backups are performed that newer backups are all there and correct
		var manifestFile =null;
		var exceptions = 0;
		var config = {useUniqueNames:true,
			destination:Folder(backupFolderPath),
			backupRegistryFolder: Folder(backupRegistryPath),
			maxRetainedBackups: 5
		};
		
		if (config.destination.exists){
			config.destination.removeContent();
		}
		
		if (config.backupRegistryFolder.exists){
			config.backupRegistryFolder.removeContent();
		}
		
		var allManifFiles = [];
		var manifestFile = null;
		var manifestObject = null; 
		
		for (var i = 0; i < config.maxRetainedBackups+10;i++){
			manifestFile = null;
			manifestObject = null;
			try{
				 manifestFile = backupDataStore(modelFile,dataFile,config);
				 allManifFiles.push(manifestFile);
				 manifestObject = createManifestObject(manifestFile);
				 MySleep(1010);
			}
			catch(e){
			}
			finally{
				
			}
			Y.Assert.isNotNull(manifestFile,"No manifest file returned at round "+i);
			Y.Assert.isNotNull(manifestObject,"No manifest object returned at round "+i);
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry at round "+i);
			Y.Assert.isTrue(validateManifestProperties(manifestObject),"Invalid manifest object at round "+i);
			Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent),"Invalid backup folder content at round "+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
		}
		var duplicateIndex = UniqueValuesInArray(allManifFiles);
		Y.Assert.areEqual(-1,duplicateIndex,"Duplicate manifest file at index "+duplicateIndex);
		
		//Outdated manifests have been removed
		var registry = getBackupRegistry(config.backupRegistryFolder);
		
		for(var i = 0;i < allManifFiles.length - config.maxRetainedBackups;i++){
			Y.Assert.isFalse(allManifFiles[i].exists,"Outdated Manifest file still exist round "+i);
			Y.Assert.isFalse(allManifFiles[i].parent.exists,"Outdated backup folder still exist round "+i);
			for(var j=0;j < registry.length;j++){
				Y.Assert.isFalse(registry[j].path===allManifFiles[i].path,"Outdated manifest "+i+" found inregistry ("+j+")");
			}
			
		}
		
		//Newer manifests are still there and in the same order as in the backup registry
		
		
		for(var j=0, i = allManifFiles.length - config.maxRetainedBackups;i < allManifFiles.length ;i++,j++){
			Y.Assert.isTrue(allManifFiles[i].exists,"Manifest file not found at round "+i);
			Y.Assert.isTrue(validateBackupFolderContent(allManifFiles[i].parent),"Invalid backup folder content at round "+i);
			Y.Assert.areEqual(registry[j].path,allManifFiles[i].path,"Wrong order in backup registry for entry "+j);
		}
    },    
    testBackupDataStoreWithNonUniqueNames: function () {
		//Calls backupDataStore with a config that mandates not using unique names, and 
		//always using  the same destination.
		//In this configuration the manifest file will overwrite the previous one, and in the 
		//the registry there shall only be one entry for that manifest file
		var manifestFile =null;
		var manifestObj = null;
		var exceptions = 0;
		var config = {useUniqueNames:false,
			destination:Folder(backupFolderPath+"MyBackup/"),
			backupRegistryFolder: Folder(backupRegistryPath),
			maxRetainedBackups: 20
		};
		
		//Setup: clear the backup folders and backup registry folder
		//Initially cleanup folders content
		if (config.destination.exists){
			config.destination.removeContent(true);
		}
		if (config.backupRegistryFolder.exists){
			config.backupRegistryFolder.removeContent(true);
		}
		
		//Create an initial backup
		try{
			manifestFile = backupDataStore(modelFile,dataFile,config);
			manifestObj = createManifestObject(manifestFile);
		}
		
		catch(e){
			exceptions++;
		}
		finally{
		}

		//First backup shall succeed, with a manifest and a proper backup folder content
		Y.Assert.isNotNull(manifestFile,"No manifest file returned");
		Y.Assert.isNotNull(manifestObj,"No manifest object returned");
		
		Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry");
		Y.Assert.isTrue(validateManifestProperties(manifestObj),"Invalid manifest object");
		
		//Subsequent backup will fail because the backup folder already exists
		var registryLengthBefore = getBackupRegistry(config.backupRegistryFolder).length;
		
		for(var i= 0; i <= config.maxRetainedBackups; i++){
			
			manifestObj = null;
			manifestFile = null;
			try{
				 manifestFile = backupDataStore(modelFile,dataFile,config);
				 manifestObj = createManifestObject(manifestFile);
				 backupRegistryEntriesAfter = (getBackupRegistry(config.backupRegistryFolder)).length;
			}
			
			catch(e){
				exceptions++;
			}
			finally{
			}

			Y.Assert.isNull(manifestFile,"Phase 2: Unexpected manifest file returned");
			Y.Assert.isNull(manifestObj,"Phase 2: Unexpected manifest object returned");
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Phase 2: Null backup registry");
			Y.Assert.isNotNull(registryLengthBefore,getBackupRegistry(config.backupRegistryFolder).length,"Phase 2: Backup registry length changed");		
		}
		
		//Postcheck, the backup registry shall have 20 etnries Max
		Y.Assert.areEqual(1,getBackupRegistry(config.backupRegistryFolder).length,"Entry count mismatch in in registry");
    },
    testBackupDataStoreWithUserDefinedUniqueNames: function () {
		//Fills the backup registry with some backups
		//Checks all these backups
		//Then perform even more backups
		//Ensure outdated backups are correctly determined and properly removed from file system and registry
		//Ensure after backups are performed that newer backups are all there and correct
		
		var defineUniqueBackupPath = function(inBaseFolderPath,inPrefix){
			var path = "";
			var elapsedSinceEpoch =  Date.now();
			path = inBaseFolderPath+ inPrefix+"_"+elapsedSinceEpoch+"/";
			var index = 1;
			while(Folder(path).exists){
				path = inBaseFolderPath+ inPrefix+"_"+elapsedSinceEpoch+"_"+index+"/";
				index++;
			}
			return path;
		};
		
		var manifestFile =null;
		var exceptions = 0;
		var config = {useUniqueNames:true,
			destination:Folder(backupFolderPath),
			backupRegistryFolder: Folder(backupRegistryPath),
			maxRetainedBackups: 5
		};
		
		
		
		if (config.destination.exists){
			config.destination.removeContent();
		}
		
		if (config.backupRegistryFolder.exists){
			config.backupRegistryFolder.removeContent();
		}
		
		var allManifFiles = [];
		var manifestFile = null;
		var manifestObject = null; 
		
		for (var i = 0; i < config.maxRetainedBackups+10;i++){
			manifestFile = null;
			manifestObject = null;
			try{
				 config.destination = new Folder(backupFolderPath+"MyBackup_"+i);
				 manifestFile = backupDataStore(modelFile,dataFile,config);
				 allManifFiles.push(manifestFile);
				 manifestObject = createManifestObject(manifestFile);
				 MySleep(1010);
			}
			catch(e){
			}
			finally{
				
			}
			Y.Assert.isNotNull(manifestFile,"No manifest file returned at round "+i);
			Y.Assert.isNotNull(manifestObject,"No manifest object returned at round "+i);
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry at round "+i);
			Y.Assert.isTrue(validateManifestProperties(manifestObject),"Invalid manifest object at round "+i);
			Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent),"Invalid backup folder content at round "+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
		}
		var duplicateIndex = UniqueValuesInArray(allManifFiles);
		Y.Assert.areEqual(-1,duplicateIndex,"Duplicate manifest file at index "+duplicateIndex);
		
		//Outdated manifests have been removed
		var registry = getBackupRegistry(config.backupRegistryFolder);
		
		for(var i = 0;i < allManifFiles.length - config.maxRetainedBackups;i++){
			Y.Assert.isFalse(allManifFiles[i].exists,"Outdated Manifest file still exist round "+i);
			Y.Assert.isFalse(allManifFiles[i].parent.exists,"Outdated backup folder still exist round "+i);
			for(var j=0;j < registry.length;j++){
				Y.Assert.isFalse(registry[j].path===allManifFiles[i].path,"Outdated manifest "+i+" found inregistry ("+j+")");
			}
			
		}
		
		//Newer manifests are still there and in the same order as in the backup registry
		
		
		for(var j=0, i = allManifFiles.length - config.maxRetainedBackups;i < allManifFiles.length ;i++,j++){
			Y.Assert.isTrue(allManifFiles[i].exists,"Manifest file not found at round "+i);
			Y.Assert.isTrue(validateBackupFolderContent(allManifFiles[i].parent),"Invalid backup folder content at round "+i);
			Y.Assert.areEqual(registry[j].path,allManifFiles[i].path,"Wrong order in backup registry for entry "+j);
		}
    },
    testBackupDataStoreWithNonExistingBackupManifest: function () {
		//Tests backupDataStore behaviour when backup registry references a manifest that cannot be found on the file system
		//As for ds.backup() no exception shall be raised
		var manifestFile =null;
		var exceptions = 0;
		var config = {useUniqueNames:true,
			destination:Folder(backupFolderPath),
			backupRegistryFolder: Folder(backupRegistryPath),
			maxRetainedBackups: 5
		};
		
		//Setup: clear the backup folders and backup registry folder
		//Initially cleanup folders content
		if (config.destination.exists){
			config.destination.removeContent(true);
		}
		if (config.backupRegistryFolder.exists){
			config.backupRegistryFolder.removeContent(true);
		}
		
		var manifests=[];
		var backupReport = new BackupReport();
		for(var i= 1; i <= config.maxRetainedBackups; i++){
			manifestFile = null;
			try{
				 manifestFile = backupDataStore(modelFile,dataFile,config,backupReport);
				 manifests.push(manifestFile);
			}

			catch(e){
				exceptions++;
			}
			finally{
			}

			Y.Assert.isNotNull(manifestFile);
			Y.Assert.areEqual(0,exceptions);
			Y.Assert.areEqual(0,backupReport.warnings.length);
			Y.Assert.areEqual(0,backupReport.errors.length);
		}
		
		//"Manually" remove a manifest from the registry and perform a backup
		//There must be no exception, no errors and no warnings
		manifests[0].remove();
		
		backupReport = new BackupReport();
		manifestFile = null;
		exceptions = 0;
		try{
			 manifestFile = backupDataStore(modelFile,dataFile,config,backupReport);
		}

		catch(e){
			exceptions++;
		}
		finally{
		}
		Y.Assert.isNotNull(manifestFile);
		Y.Assert.areEqual(0,exceptions);
		Y.Assert.areEqual(0,backupReport.warnings.length);
		Y.Assert.areEqual(0,backupReport.errors.length);
    },
	testBackupDataStoreWithNonExistingBackupFolder: function () {
		//Tests backupDataStore behaviour when backup registry references a manifest which backup folder cannot be accessed on the file system
		//As for ds.backup() no exception shall be raised but a warning shall be reported
		var manifestFile =null;
		var exceptions = 0;
		var config = {useUniqueNames:true,
			destination:Folder(backupFolderPath),
			backupRegistryFolder: Folder(backupRegistryPath),
			maxRetainedBackups: 5
		};
		
		//Setup: clear the backup folders and backup registry folder
		//Initially cleanup folders content
		if (config.destination.exists){
			config.destination.removeContent(true);
		}
		if (config.backupRegistryFolder.exists){
			config.backupRegistryFolder.removeContent(true);
		}
		
		var manifests=[];
		var backupReport = new BackupReport();
		for(var i= 1; i <= config.maxRetainedBackups; i++){
			manifestFile = null;
			try{
				 manifestFile = backupDataStore(modelFile,dataFile,config,backupReport);
				 manifests.push(manifestFile);
			}

			catch(e){
				exceptions++;
			}
			finally{
			}

			Y.Assert.isNotNull(manifestFile);
			Y.Assert.areEqual(0,exceptions);
			Y.Assert.areEqual(0,backupReport.warnings.length);
			Y.Assert.areEqual(0,backupReport.errors.length);
		}
		
		//"Manually" remove a manifest from the registry and perform a backup
		//There must be no exception, no errors and no warnings
		Y.Assert.isTrue(manifests[0].parent.exists);
		manifests[0].parent.remove(true);
		
		MySleep(1000);
		
		backupReport = new BackupReport();
		manifestFile = null;
		exceptions = 0;
		try{
			 manifestFile = backupDataStore(modelFile,dataFile,config,backupReport);
		}

		catch(e){
			exceptions++;
		}
		finally{
		}
		Y.Assert.isNotNull(manifestFile);
		Y.Assert.areEqual(0,exceptions);
		Y.Assert.areEqual(1,backupReport.warnings.length);
		Y.Assert.areEqual(0,backupReport.errors.length);
    }
    
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}




