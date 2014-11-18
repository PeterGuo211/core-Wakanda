
/**
 * Unit tests for ds.backup()
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
 
var baseFolderPath = application.getFolder("path");
var backupFolderPath = baseFolderPath + "Backups/";
var backupRegistryPath = baseFolderPath + "Backups/";

var tempBackupFolderPath = baseFolderPath+"TempBackups/";
var tempBackupRegistryPath = baseFolderPath+"TempBackupRegistry/";

var filesInDataFolder = {};

function MySleep(delayInMs){
	var doSleep = function(){
		exitWait();
	}
    setTimeout(doSleep,1000);
    wait();
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
	//var files = ["data.Match","data.waData","data.waIndx","data.WakTDef"];
	Y.Assert.areEqual(dataFolder.files.length,filesInDataFolder.length,"Incorrect number of files in backup folder: "+dataFolder.path);
	for(var i=0;i<filesInDataFolder.length;++i){
		var name = filesInDataFolder[i].name;
		var path = dataFolder.path+name;
		Y.Assert.isTrue(File(path).exists,"File not found: "+path);
	}
	return true;
};

var checkBackupManifest = function(inManifestObjectOrRegistryEntry){
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

/*
 * Generic backup removal test. This test's goal is to ensure backup removal works correctly.
 * \param config: a backup configuration object, augmented with an additional test object.
 * {
 *	//classic backup config
 *	destination: Folder,
 *	maxRetainedBackups: Numeric,
 *	useUniqueNames: bool,
 *	backupRegistryFolder:Folder
 *	
 *	//test specific params
 *	test:{
 *		//how many more backups to perform in phase 2
 *		additionalBackups: Numeric
 *		}
 *	}
 *
 * The test has two phases:
 * 1) create up to config.maxRetainedBackups backups with unique names.
 * during this phase the backup manifest files are stored.
 * In this phase we checked that no backups are removed because we don't exceed config.maxRetainedBackups
 * We also check that backup manifest file path are stored in the registry, in the order the manifest were created.
 * 
 * 2) phase2: create up to config.test.additionalBackups more backups. These exceeds config.maxRetainedBackups and so
 * the backup removal code gets triggered. For each phase we check that the backup registry has config.maxRetainedBackups entries only.
 * Again each backup manifest path is accumulated so that we have them all.
 * After this second phase, we check that only the last config.maxRetainedBackups must remain in the registry and the file system.
 * Then we check that all manifests created before those last ones are actually deleted along with their backup folder
 */
 var genericBackupRemovalTest= function (config) {
	
	//Then perform 10 more backups and ensure each backup older is removed from the registry and the file system.
	//And the backup registry size does not exceeds maxRetainedBackups.
	
	var result =null;
	var manifestObj = null;
	var exceptions = 0;
	var settings = null;
	
	//Initially cleanup folders content
	if (config.destination.exists){
		config.destination.removeContent(true);
	}
	if (config.backupRegistryFolder.exists){
		config.backupRegistryFolder.removeContent(true);
	}
	
	var manifestObjs=[];
	var manifestFiles=[];
	
	
	//Phase 1
	for(var i =0; i < config.maxRetainedBackups; i++){
		result = null;
		manifestObj = null;
		
		try{
			result = ds.backup(config);
			manifestFiles.push(result);
			manifestObj = createManifestObject(result);
			manifestObjs.push(manifestObj);
			MySleep(1200);
		}
		catch(e){
		exceptions++;
		}
		finally{
		}

		//First backup shall succeed, with a manifest and a proper backup folder content
		Y.Assert.isNotNull(manifestFiles[i],"No manifest file returned at round "+i);
		Y.Assert.isNotNull(manifestObjs[i],"No manifest object returned at round "+i);
		
		Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry at round "+i);
		Y.Assert.isNotNull(getLastBackups(),"Null backup registry with getLastBackups() at round "+i);
		Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object at round "+i);
		
		Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent),"Invalid backup folder content at round "+i);
		Y.Assert.isTrue(config.maxRetainedBackups >= getLastBackups().length, "Mismatch between maxRetainedBackups and getLastBackups().length at round "+i);
		Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
	}
	Y.Assert.areEqual(config.maxRetainedBackups,manifestFiles.length,"Not enough collected manifest files");
	Y.Assert.areEqual(config.maxRetainedBackups,manifestObjs.length,"Not enough collected manifest objects");
	Y.Assert.areEqual(config.maxRetainedBackups,getLastBackups().length,"Not enough entries from getLastBackups()");
	Y.Assert.areEqual(config.maxRetainedBackups,getBackupRegistry(config.backupRegistryFolder).length,"Not enough entries from getBackupRegistry()");

	//Validate collected manifest files are stored in the same order as the backup registry
	var lastBackups = getLastBackups();
	for(var i =0; i < config.maxRetainedBackups; i++){
		
		Y.Assert.areEqual(lastBackups[i].path,manifestFiles[i].path,"Not the expected manifest path in backup registry entry "+i);
		Y.Assert.isTrue(manifestFiles[i].exists,"Manifest file does not exist in backup registry entry "+i);
		Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object for entry "+i);
		Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent,"Invalid backup folder content for entry "+i));
	}
	
	//Phase 2: perform additional backups
	for(var i =0; i < config.test.additionalBackups; i++){
		result = null;
		manifestObj = null;
		
		try{
			result = ds.backup(config);
			manifestFiles.push(result);
			manifestObj = createManifestObject(result);
			manifestObjs.push(manifestObj);
			MySleep(1200);
		}
		catch(e){
		exceptions++;
		}
		finally{
		}

		//First backup shall succeed, with a manifest and a proper backup folder content
		Y.Assert.isNotNull(result,"No manifest file returned at round 2."+i);
		Y.Assert.isNotNull(manifestObj,"No manifest object returned at round 2."+i);
		
		Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry at round 2."+i);
		Y.Assert.isNotNull(getLastBackups(),"Null backup registry with getLastBackups() at round 2."+i);
		Y.Assert.isTrue(checkBackupManifest(manifestObj),"Invalid manifest object at round 2."+i);
		Y.Assert.isTrue(validateBackupFolderContent(result.parent),"Invalid backup folder content at round 2."+i);
		Y.Assert.isTrue(config.maxRetainedBackups === getLastBackups().length, "Mismatch between maxRetainedBackups and getLastBackups().length at round 2."+i);
		Y.Assert.isTrue(config.maxRetainedBackups === getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round 2."+i);
	}
	//manifestFiles collects all the manifests generated so far.
	//We have generated more than maxRetainedBackups. Only the last 'maxRetainedBackups' entries should be live and correct
	//Check that all entries in before the last 'maxRetainedBackups' have been deleted
	lastBackups = getLastBackups();
	for(var i =0; i < manifestFiles.length - config.maxRetainedBackups; i++){
		
		Y.Assert.isFalse(manifestFiles[i].parent.exists,"Outdated backup folder still exist in backup registry entry "+i);
		Y.Assert.isFalse(manifestFiles[i].exists,"Outdated manifest file "+manifestFiles[i].path+" still exists at entry "+i);
		
		for(var j = 0;j <lastBackups.length;j++){
			Y.Assert.isFalse(lastBackups[j].path===manifestFiles[i].path,"old manifest entry "+i+" still present in backup registry");
		}
	}
	
	//Then ensure the last 'maxRetainedBackups' entries in manifestFiles are stored in the backup registry
	for(var i = manifestFiles.length - 1,j =  lastBackups.length-1; j>=0; i--,j--){
		Y.Assert.areEqual(lastBackups[j].path,manifestFiles[i].path,"Not the expected manifest path in backup registry entry "+j);
		Y.Assert.isTrue(manifestFiles[i].exists,"Manifest file does not exist in backup registry entry "+i);
		Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object for entry "+i);
		Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent,"Invalid backup folder content for entry "+i));
	}
};

var testCase = {
     name: "Coverage tests for ds.backup() normal operation and backup retention",
     
    _should: {
		error: {
			
		},
		ignore: {
			/*
			testOutdatedBackupRemovalWithIncreasedRetainedBackups2: false,
			testOutdatedBackupRemovalWithIncreasedRetainedBackups: true,
			testOutdatedBackupRemovalWithLoweredRetainedBackups: true,
			testOutdatedBackupRemovalWithOneRetainedBackup: true,
			testOutdatedBackupRemovalWithDefaultParameters : true,
			testBackupFailsWithUniqueNamesReuseInNonDefaultFolder : true,
			testBackupFailsWithUniqueNamesReuse: true,
			testBackupWithNonUniqueNamesAndExistingFolder: true
			*/
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
		var df = new Folder( application.getFolder("path")+"DataFolder/");
		
		filesInDataFolder = df.files;
    },
 
    tearDown : function () {
    },
    
    testBackupWithExistingBackupFolder: function () {
		//This test checks that ds.backup() will fail if use unique names is false
		//and the backup folder is not empty
		var result =null;
		var manifestObj = null;
		var exceptions = 0;
		var settings = null;
		var config = {useUniqueNames: false, destination:Folder(tempBackupFolderPath),backupRegistryFolder:Folder(tempBackupRegistryPath)};
		
		
		//Setup: clear the backup folders and backup registry folder
		//Initially cleanup folders content
		if (config.destination.exists){
			config.destination.removeContent(true);
		}
		if (config.backupRegistryFolder.exists){
			config.backupRegistryFolder.removeContent(true);
		}
		
		config.destination= new Folder(tempBackupFolderPath+"backup_"+Date.now()+"/");
		
		//Create an initial backup
		try{
			result = ds.backup(config);
			manifestObj = createManifestObject(result);
		}
		
		catch(e){
			exceptions++;
		}
		finally{
		}

		//First backup shall succeed, with a manifest and a proper backup folder content
		Y.Assert.isNotNull(result,"No manifest file returned");
		Y.Assert.isNotNull(manifestObj,"No manifest object returned");
		
		Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry");
		Y.Assert.isTrue(checkBackupManifest(manifestObj),"Invalid manifest object");
		
		//Phase2: now create more backups at the same location, since the backup folder already exists it should
		//fail
		var registryLengthBefore = getBackupRegistry(config.backupRegistryFolder).length;
		//Now attempt to perform several backups and ensure they all fail
		for(var i = 0; i <5;i++){
			result = null;
			manifestObj = null;
			try{
				result = ds.backup(config);
				manifestObj = createManifestObject(result);
			}
			
			catch(e){
				exceptions++;
			}
			finally{
			}
			Y.Assert.isNull(result,"Phase 2: Unexpected manifest file returned");
			Y.Assert.isNull(manifestObj,"Phase 2: Unexpected manifest object returned");
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Phase 2: Null backup registry");
			Y.Assert.isNotNull(registryLengthBefore,getBackupRegistry(config.backupRegistryFolder).length,"Phase 2: Backup registry length changed");			
		}
    },
    
    testBackupFailsWithUniqueNamesReuse: function () {
		//Performs a series of backups using the project's default config (i.e. unique names on)
		//After each backup, another backup is attempted, but using the actual backup folder (returned in the manifest) as destination
		//This second backup must fail because the specified backup folder is not empty
		var result =null;
		var manifestObj = null;
		var exceptions = 0;
		var settings = null;
		var projectBackupConfig = getBackupSettings();
		
		for(var i =0; i < 10; i++){
			//Backup with the default config, shall pass
			result = null;
			manifestObj = null;
			
			try{
				result = ds.backup();
				manifestObj = createManifestObject(result);
			}
			catch(e){
			exceptions++;
			}
			finally{
			}

			//First backup shall succeed, with a manifest and a proper backup folder content
			Y.Assert.isNotNull(result,"No manifest file returned");
			Y.Assert.isNotNull(manifestObj,"No manifest object returned");
			
			Y.Assert.isNotNull(getBackupRegistry(projectBackupConfig.backupRegistryFolder),"Null backup registry");
			Y.Assert.isTrue(checkBackupManifest(manifestObj),"Invalid manifest object");
			
			//Try to backup with a custom config that re-uses that last backup's folder and no unique names
			var registryLengthBefore = getBackupRegistry(projectBackupConfig.backupRegistryFolder).length;
			var result2 = null;
			var manifestObj2 = null;
			var config2 = {destination:manifestObj.destination,useUniqueNames: false};
			
			try{
				result2 = ds.backup(config2);
				manifestObj2 = createManifestObject(result);
			}
			catch(e){
			exceptions++;
			}
			finally{
			}
			Y.Assert.isNull(result2,"Phase 2: Unexpected manifest file returned");
			Y.Assert.isNull(manifestObj2,"Phase 2: Unexpected manifest object returned");
			Y.Assert.isNotNull(getBackupRegistry(projectBackupConfig.backupRegistryFolder),"Phase 2: Null backup registry");
			Y.Assert.isNotNull(registryLengthBefore,getBackupRegistry(projectBackupConfig.backupRegistryFolder).length,"Phase 2: Backup registry length changed");			
		}
    },
    testBackupFailsWithUniqueNamesReuseInNonDefaultFolder: function () {
		//Performs a series of backups in with unique names in a specific folder.
		//After each backup, another backup is attempted, but using the actual backup folder (returned in the manifest) as destination
		//This second backup must fail because the specified backup folder is not empty
		
		var result =null;
		var manifestObj = null;
		var exceptions = 0;
		var settings = null;
		
		var config = {useUniqueNames: true, destination:Folder(tempBackupFolderPath),backupRegistryFolder:Folder(tempBackupRegistryPath)};
		
		//Initially cleanup folders content
		if (config.destination.exists){
			config.destination.removeContent(true);
		}
		if (config.backupRegistryFolder.exists){
			config.backupRegistryFolder.removeContent(true);
		}
		
		for(var i =0; i < 10; i++){
			//Backup with the default config, shall pass
			result = null;
			manifestObj = null;
			
			try{
				result = ds.backup(config);
				manifestObj = createManifestObject(result);
			}
			catch(e){
			exceptions++;
			}
			finally{
			}

			//First backup shall succeed, with a manifest and a proper backup folder content
			Y.Assert.isNotNull(result,"No manifest file returned");
			Y.Assert.isNotNull(manifestObj,"No manifest object returned");
			
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry");
			Y.Assert.isTrue(checkBackupManifest(manifestObj),"Invalid manifest object");
			
			//Try to backup with a custom config that re-uses that last backup's folder and no unique names
			var registryLengthBefore = getBackupRegistry(config.backupRegistryFolder).length;
			var result2 = null;
			var manifestObj2 = null;
			var config2 = {destination:manifestObj.destination,useUniqueNames: false};
			
			try{
				result2 = ds.backup(config2);
				manifestObj2 = createManifestObject(result);
			}
			catch(e){
			exceptions++;
			}
			finally{
			}
			Y.Assert.isNull(result2,"Phase 2: Unexpected manifest file returned");
			Y.Assert.isNull(manifestObj2,"Phase 2: Unexpected manifest object returned");
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Phase 2: Null backup registry");
			Y.Assert.isNotNull(registryLengthBefore,getBackupRegistry(config.backupRegistryFolder).length,"Phase 2: Backup registry length changed");			
		}
    },
    testOutdatedBackupRemovalWithDefaultParameters: function () {
      	
      	var exceptions = 0;
		var settings = null;
		var exceptionMsg="";
		
		var testConfig = getBackupSettings();
		testConfig["test"] = {additionalBackups: testConfig.maxRetainedBackups * 2 };
      	try{
      		genericBackupRemovalTest(testConfig);
      	}
      	
      	catch(e){
      		exceptions++;
      		exceptionMsg = e.message;
      	}
      	
      	finally{
      	}
      	
      	Y.Assert.areEqual(0,exceptions,"Test failed with exception: "+exceptionMsg);
    },
    testOutdatedBackupRemovalWithOneRetainedBackup: function () {
      	
      	var exceptions = 0;
		var settings = null;
		var exceptionMsg="";
		
		var testConfig = getBackupSettings();
		testConfig.maxRetainedBackups = 1;
		testConfig["test"] = {additionalBackups: testConfig.maxRetainedBackups * 2 };
      	try{
      		genericBackupRemovalTest(testConfig);
      	}
      	
      	catch(e){
      		exceptions++;
      		exceptionMsg = e.message;
      	}
      	
      	finally{
      	}
      	
      	Y.Assert.areEqual(0,exceptions,"Test failed with exception: "+exceptionMsg);
    },
    testOutdatedBackupRemovalWithLoweredRetainedBackups: function () {
      	/*
      	 * In this test we initially create a backup registry with lots of entries
      	 * Then in a second phase we create additional backups but we decrease the retained backup count
      	 * this ensures that the backup removal works as inteded when the retained backup count is lowered
      	 */
	    var result =null;
		var manifestObj = null;
		var exceptions = 0;
		var settings = null;
		var manifestObjs=[];
		var manifestFiles=[];
		var config = getBackupSettings();
		
		//Initially cleanup folders content
		if (config.destination.exists){
			config.destination.removeContent(true);
		}
		if (config.backupRegistryFolder.exists){
			config.backupRegistryFolder.removeContent(true);
		}
		
		//Phase 1
		
		config.maxRetainedBackups = 10;
		
		for(var i =0; i < config.maxRetainedBackups; i++){
			result = null;
			manifestObj = null;
			
			try{
				result = ds.backup(config);
				manifestFiles.push(result);
				manifestObj = createManifestObject(result);
				manifestObjs.push(manifestObj);
				MySleep(1200);
			}
			catch(e){
			exceptions++;
			}
			finally{
			}

			//First backup shall succeed, with a manifest and a proper backup folder content
			Y.Assert.isNotNull(manifestFiles[i],"No manifest file returned at round "+i);
			Y.Assert.isNotNull(manifestObjs[i],"No manifest object returned at round "+i);
			
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry at round "+i);
			Y.Assert.isNotNull(getLastBackups(),"Null backup registry with getLastBackups() at round "+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object at round "+i);
			
			Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent),"Invalid backup folder content at round "+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getLastBackups().length, "Mismatch between maxRetainedBackups and getLastBackups().length at round "+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
		}
		Y.Assert.areEqual(config.maxRetainedBackups,manifestFiles.length,"Not enough collected manifest files");
		Y.Assert.areEqual(config.maxRetainedBackups,manifestObjs.length,"Not enough collected manifest objects");
		Y.Assert.areEqual(config.maxRetainedBackups,getLastBackups().length,"Not enough entries from getLastBackups()");
		Y.Assert.areEqual(config.maxRetainedBackups,getBackupRegistry(config.backupRegistryFolder).length,"Not enough entries from getBackupRegistry()");

		//Validate collected manifest files are stored in the same order as the backup registry
		var lastBackups = getLastBackups();
		for(var i =0; i < config.maxRetainedBackups; i++){
			
			Y.Assert.areEqual(lastBackups[i].path,manifestFiles[i].path,"Not the expected manifest path in backup registry entry "+i);
			Y.Assert.isTrue(manifestFiles[i].exists,"Manifest file does not exist in backup registry entry "+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object for entry "+i);
			Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent,"Invalid backup folder content for entry "+i));
		}
		
		//Phase 2: Lower the maxRetainedBackups
		config.maxRetainedBackups = 5;
		config.test = {additionalBackups:10};
		
		for(var i =0; i < config.test.additionalBackups; i++){
			result = null;
			manifestObj = null;
			
			try{
				result = ds.backup(config);
				manifestFiles.push(result);
				manifestObj = createManifestObject(result);
				manifestObjs.push(manifestObj);
				MySleep(1200);
			}
			catch(e){
			exceptions++;
			}
			finally{
			}

			//First backup shall succeed, with a manifest and a proper backup folder content
			Y.Assert.isNotNull(result,"No manifest file returned at round 2."+i);
			Y.Assert.isNotNull(manifestObj,"No manifest object returned at round 2."+i);
			
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry at round 2."+i);
			Y.Assert.isNotNull(getLastBackups(),"Null backup registry with getLastBackups() at round 2."+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObj),"Invalid manifest object at round 2."+i);
			Y.Assert.isTrue(validateBackupFolderContent(result.parent),"Invalid backup folder content at round 2."+i);
			Y.Assert.isTrue(config.maxRetainedBackups === getLastBackups().length, "Mismatch between maxRetainedBackups and getLastBackups().length at round 2."+i);
			Y.Assert.isTrue(config.maxRetainedBackups === getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round 2."+i);
		}
		//manifestFiles collects all the manifests generated so far.
		//We have generated more than maxRetainedBackups. Only the last 'maxRetainedBackups' entries should be live and correct
		//Check that all entries in before the last 'maxRetainedBackups' have been deleted
		lastBackups = getLastBackups();
		for(var i =0; i < manifestFiles.length - config.maxRetainedBackups; i++){
			
			Y.Assert.isFalse(manifestFiles[i].parent.exists,"Outdated backup folder still exist in backup registry entry "+i);
			Y.Assert.isFalse(manifestFiles[i].exists,"Outdated manifest file "+manifestFiles[i].path+" still exists at entry "+i);
			
			for(var j = 0;j <lastBackups.length;j++){
				Y.Assert.isFalse(lastBackups[j].path===manifestFiles[i].path,"old manifest entry "+i+" still present in backup registry");
			}
		}
		
		//Then ensure the last 'maxRetainedBackups' entries in manifestFiles are stored in the backup registry
		for(var i = manifestFiles.length - 1,j =  lastBackups.length-1; j>=0; i--,j--){
			Y.Assert.areEqual(lastBackups[j].path,manifestFiles[i].path,"Not the expected manifest path in backup registry entry "+j);
			Y.Assert.isTrue(manifestFiles[i].exists,"Manifest file does not exist in backup registry entry "+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object for entry "+i);
			Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent,"Invalid backup folder content for entry "+i));
		}
    },
    testOutdatedBackupRemovalWithIncreasedRetainedBackups: function () {
      	/*
      	 * In this test we initially create a backup registry with some entries we check that each backup is correct
      	 * stored in the expecte dlocation and the backup registry is also sane.
      	 * Then in a second phase, we increase the retained backup count and create additional backups (but equal than the current retained backup counts)
      	 * This ensures that the backup removal works as inteded when the retained backup count is increased between backups
      	 */
	    var result =null;
		var manifestObj = null;
		var exceptions = 0;
		var settings = null;
		var manifestObjs=[];
		var manifestFiles=[];
		var config = getBackupSettings();
		
		//Initially cleanup folders content
		if (config.destination.exists){
			config.destination.removeContent(true);
		}
		if (config.backupRegistryFolder.exists){
			config.backupRegistryFolder.removeContent(true);
		}

		//Phase 1
		config.maxRetainedBackups = 10;
		
		for(var i =0; i < config.maxRetainedBackups; i++){
			result = null;
			manifestObj = null;
			
			try{
				result = ds.backup(config);
				manifestFiles.push(result);
				manifestObj = createManifestObject(result);
				manifestObjs.push(manifestObj);
				MySleep(1200);
			}
			catch(e){
			exceptions++;
			}
			finally{
			}

			//First backup shall succeed, with a manifest and a proper backup folder content
			Y.Assert.isNotNull(manifestFiles[i],"No manifest file returned at round "+i);
			Y.Assert.isNotNull(manifestObjs[i],"No manifest object returned at round "+i);
			
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry at round "+i);
			Y.Assert.isNotNull(getLastBackups(),"Null backup registry with getLastBackups() at round "+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object at round "+i);
			
			Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent),"Invalid backup folder content at round "+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getLastBackups().length, "Mismatch between maxRetainedBackups and getLastBackups().length at round "+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
		}
		Y.Assert.areEqual(config.maxRetainedBackups,manifestFiles.length,"Not enough collected manifest files");
		Y.Assert.areEqual(config.maxRetainedBackups,manifestObjs.length,"Not enough collected manifest objects");
		Y.Assert.areEqual(config.maxRetainedBackups,getLastBackups().length,"Not enough entries from getLastBackups()");
		Y.Assert.areEqual(config.maxRetainedBackups,getBackupRegistry(config.backupRegistryFolder).length,"Not enough entries from getBackupRegistry()");

		//Validate collected manifest files are stored in the same order as the backup registry
		var lastBackups = getLastBackups();
		for(var i =0; i < config.maxRetainedBackups; i++){
			
			Y.Assert.areEqual(lastBackups[i].path,manifestFiles[i].path,"Not the expected manifest path in backup registry entry "+i);
			Y.Assert.isTrue(manifestFiles[i].exists,"Manifest file does not exist in backup registry entry "+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object for entry "+i);
			Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent,"Invalid backup folder content for entry "+i));
		}
		
		//Phase 2: Increase maxRetainedBackups and request to perform more backups w/o exceeding the new
		//maxRetainedBackups
		var newRetainedBackups = 15;
		config.test = {additionalBackups: newRetainedBackups - config.maxRetainedBackups};
		config.maxRetainedBackups = newRetainedBackups;
		
		for(var i =0; i < config.test.additionalBackups; i++){
			result = null;
			manifestObj = null;
			
			try{
				result = ds.backup(config);
				manifestFiles.push(result);
				manifestObj = createManifestObject(result);
				manifestObjs.push(manifestObj);
				MySleep(1200);
			}
			catch(e){
			exceptions++;
			}
			finally{
			}

			//First backup shall succeed, with a manifest and a proper backup folder content
			Y.Assert.isNotNull(result,"No manifest file returned at round 2."+i);
			Y.Assert.isNotNull(manifestObj,"No manifest object returned at round 2."+i);
			
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry at round 2."+i);
			Y.Assert.isNotNull(getLastBackups(),"Null backup registry with getLastBackups() at round 2."+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObj),"Invalid manifest object at round 2."+i);
			Y.Assert.isTrue(validateBackupFolderContent(result.parent),"Invalid backup folder content at round 2."+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getLastBackups().length, "Mismatch between maxRetainedBackups and getLastBackups().length at round 2."+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round 2."+i);
		}
		//This should be the same as in phase 1, no backups should be removed
		Y.Assert.areEqual(config.maxRetainedBackups,manifestFiles.length,"Not enough collected manifest files");
		Y.Assert.areEqual(config.maxRetainedBackups,manifestObjs.length,"Not enough collected manifest objects");
		Y.Assert.areEqual(config.maxRetainedBackups,getLastBackups().length,"Not enough entries from getLastBackups()");
		Y.Assert.areEqual(config.maxRetainedBackups,getBackupRegistry(config.backupRegistryFolder).length,"Not enough entries from getBackupRegistry()");

		//Validate collected manifest files are stored in the same order as the backup registry
		var lastBackups = getLastBackups();
		for(var i =0; i < config.maxRetainedBackups; i++){
			
			Y.Assert.areEqual(lastBackups[i].path,manifestFiles[i].path,"Not the expected manifest path in backup registry entry "+i);
			Y.Assert.isTrue(manifestFiles[i].exists,"Manifest file does not exist in backup registry entry "+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object for entry "+i);
			Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent,"Invalid backup folder content for entry "+i));
		}		
    },
    testOutdatedBackupRemovalWithIncreasedRetainedBackups2: function () {
      	/*
      	 * In this test we initially create a backup registry with some entries we check that each backup is correct
      	 * stored in the expecte dlocation and the backup registry is also sane.
      	 * Then in a second phase, we increase the retained backup count and create additional backups (more than current retained backup counts)
      	 * This ensures that the backup removal works as inteded when the retained backup count is increased between backups
      	 */
	    var result =null;
		var manifestObj = null;
		var exceptions = 0;
		var settings = null;
		var manifestObjs=[];
		var manifestFiles=[];
		var config = getBackupSettings();
		
		//Initially cleanup folders content
		if (config.destination.exists){
			config.destination.removeContent(true);
		}
		if (config.backupRegistryFolder.exists){
			config.backupRegistryFolder.removeContent(true);
		}
		
		//Phase 1
		
		config.maxRetainedBackups = 10;
		
		for(var i =0; i < config.maxRetainedBackups; i++){
			result = null;
			manifestObj = null;
			
			try{
				result = ds.backup(config);
				manifestFiles.push(result);
				manifestObj = createManifestObject(result);
				manifestObjs.push(manifestObj);
				MySleep(1200);
			}
			catch(e){
			exceptions++;
			}
			finally{
			}

			//First backup shall succeed, with a manifest and a proper backup folder content
			Y.Assert.isNotNull(manifestFiles[i],"No manifest file returned at round "+i);
			Y.Assert.isNotNull(manifestObjs[i],"No manifest object returned at round "+i);
			
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry at round "+i);
			Y.Assert.isNotNull(getLastBackups(),"Null backup registry with getLastBackups() at round "+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object at round "+i);
			
			Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent),"Invalid backup folder content at round "+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getLastBackups().length, "Mismatch between maxRetainedBackups and getLastBackups().length at round "+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
		}
		Y.Assert.areEqual(config.maxRetainedBackups,manifestFiles.length,"Not enough collected manifest files");
		Y.Assert.areEqual(config.maxRetainedBackups,manifestObjs.length,"Not enough collected manifest objects");
		Y.Assert.areEqual(config.maxRetainedBackups,getLastBackups().length,"Not enough entries from getLastBackups()");
		Y.Assert.areEqual(config.maxRetainedBackups,getBackupRegistry(config.backupRegistryFolder).length,"Not enough entries from getBackupRegistry()");

		//Validate collected manifest files are stored in the same order as the backup registry
		var lastBackups = getLastBackups();
		for(var i =0; i < config.maxRetainedBackups; i++){
			
			Y.Assert.areEqual(lastBackups[i].path,manifestFiles[i].path,"Not the expected manifest path in backup registry entry "+i);
			Y.Assert.isTrue(manifestFiles[i].exists,"Manifest file does not exist in backup registry entry "+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object for entry "+i);
			Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent,"Invalid backup folder content for entry "+i));
		}
		
		//Phase 2: increase maxRetainedBackups, and perform more backups this maxRetainedBackups
		var newRetainedBackups = config.maxRetainedBackups + 10;
		config.test = {additionalBackups: newRetainedBackups +7};
		config.maxRetainedBackups = newRetainedBackups;
		
		for(var i =0; i < config.test.additionalBackups; i++){
			result = null;
			manifestObj = null;
			
			try{
				result = ds.backup(config);
				manifestFiles.push(result);
				manifestObj = createManifestObject(result);
				manifestObjs.push(manifestObj);
				MySleep(1200);
			}
			catch(e){
			exceptions++;
			}
			finally{
			}

			//First backup shall succeed, with a manifest and a proper backup folder content
			Y.Assert.isNotNull(result,"No manifest file returned at round 2."+i);
			Y.Assert.isNotNull(manifestObj,"No manifest object returned at round 2."+i);
			
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry at round 2."+i);
			Y.Assert.isNotNull(getLastBackups(),"Null backup registry with getLastBackups() at round 2."+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObj),"Invalid manifest object at round 2."+i);
			Y.Assert.isTrue(validateBackupFolderContent(result.parent),"Invalid backup folder content at round 2."+i);
			Y.Assert.isTrue(getLastBackups().length <= config.maxRetainedBackups , "Mismatch between maxRetainedBackups and getLastBackups().length at round 2."+i);
			Y.Assert.isTrue(getBackupRegistry(config.backupRegistryFolder).length <= config.maxRetainedBackups ,"Mismatch between maxRetainedBackups and registry size at round 2."+i);
		}
		//manifestFiles collects all the manifests generated so far.
		//We have generated more than maxRetainedBackups. Only the last 'maxRetainedBackups' entries should be live and correct
		//Check that all entries in before the last 'maxRetainedBackups' have been deleted
		lastBackups = getLastBackups();
		for(var i =0; i < manifestFiles.length - config.maxRetainedBackups; i++){
			
			Y.Assert.isFalse(manifestFiles[i].parent.exists,"Outdated backup folder still exist in backup registry entry "+i);
			Y.Assert.isFalse(manifestFiles[i].exists,"Outdated manifest file "+manifestFiles[i].path+" still exists at entry "+i);
			
			for(var j = 0;j <lastBackups.length;j++){
				Y.Assert.isFalse(lastBackups[j].path===manifestFiles[i].path,"old manifest entry "+i+" still present in backup registry");
			}
		}
		
		//Then ensure the last 'maxRetainedBackups' entries in manifestFiles are stored in the backup registry
		for(var i = manifestFiles.length - 1,j =  lastBackups.length-1; j>=0; i--,j--){
			Y.Assert.areEqual(lastBackups[j].path,manifestFiles[i].path,"Not the expected manifest path in backup registry entry "+j);
			Y.Assert.isTrue(manifestFiles[i].exists,"Manifest file does not exist in backup registry entry "+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object for entry "+i);
			Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent,"Invalid backup folder content for entry "+i));
		}
    },
	testBackupWithMissingBackupManifest: function () {
      	/*
      	 * Tests behaviour of ds.backup() when cleaning the backup registry for non longer retained backup folders.
         * When the registry has a reference to a backup manifest that cannot be found, there should not be any exception
         * thrown.
      	 */
	    var result =null;
		var manifestObj = null;
		var exceptions = 0;
		var settings = null;
		var manifestObjs=[];
		var manifestFiles=[];
		var config = getBackupSettings();
		
		//Initially cleanup folders content
		if (config.destination.exists){
			config.destination.removeContent(true);
		}
		if (config.backupRegistryFolder.exists){
			config.backupRegistryFolder.removeContent(true);
		}
		
		//Phase 1: creates some backups
		config.maxRetainedBackups = 5;
		
		for(var i =0; i < config.maxRetainedBackups; i++){
			result = null;
			manifestObj = null;
			
			try{
				result = ds.backup(config);
				manifestFiles.push(result);
				manifestObj = createManifestObject(result);
				manifestObjs.push(manifestObj);
				MySleep(1200);
			}
			catch(e){
				exceptions++;
			}
			finally{
			}

			//First backup shall succeed, with a manifest and a proper backup folder content
			Y.Assert.isNotNull(manifestFiles[i],"No manifest file returned at round "+i);
			Y.Assert.isNotNull(manifestObjs[i],"No manifest object returned at round "+i);
			
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry at round "+i);
			Y.Assert.isNotNull(getLastBackups(),"Null backup registry with getLastBackups() at round "+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object at round "+i);
			
			Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent),"Invalid backup folder content at round "+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getLastBackups().length, "Mismatch between maxRetainedBackups and getLastBackups().length at round "+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
		}
		Y.Assert.areEqual(config.maxRetainedBackups,manifestFiles.length,"Not enough collected manifest files");
		Y.Assert.areEqual(config.maxRetainedBackups,manifestObjs.length,"Not enough collected manifest objects");
		Y.Assert.areEqual(config.maxRetainedBackups,getLastBackups().length,"Not enough entries from getLastBackups()");
		Y.Assert.areEqual(config.maxRetainedBackups,getBackupRegistry(config.backupRegistryFolder).length,"Not enough entries from getBackupRegistry()");

		//Validate collected manifest files are stored in the same order as the backup registry
		var lastBackups = getLastBackups();
		for(var i =0; i < config.maxRetainedBackups; i++){
			
			Y.Assert.areEqual(lastBackups[i].path,manifestFiles[i].path,"Not the expected manifest path in backup registry entry "+i);
			Y.Assert.isTrue(manifestFiles[i].exists,"Manifest file does not exist in backup registry entry "+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object for entry "+i);
			Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent,"Invalid backup folder content for entry "+i));
		}
		
		//Case 1: remove a manifest file from the FS
		var removedManifestFile = manifestFiles[0];
		
		removedManifestFile.remove();
		exceptions = 0;
		result = null;
		var backupReport = new BackupReport();
		try{
				result = ds.backup(config,backupReport);
				manifestFiles.push(result);
				manifestObj = createManifestObject(result);
				manifestObjs.push(manifestObj);
		}
		catch(e){
			exceptions++;
		}
		finally{
			
		}
		Y.Assert.areEqual(0,exceptions,"exception returned");
		Y.Assert.areEqual(0,backupReport.warnings.length,"Warning(s) reported");
		Y.Assert.areEqual(0,backupReport.errors.length,"Error(s) reported");
		Y.Assert.isNotNull(result,"No manifest file returned");
		Y.Assert.areEqual(config.maxRetainedBackups,getLastBackups().length , "maxRetainedBackups != getLastBackups().length");
    },
    testBackupWithMissingBackupFolder: function () {
      	/*
      	 * Tests behaviour of ds.backup() when handling cleaning backup folders that are no longer retained.
         * When one such backup folder cannot be deleted, a warning must be issued and no exception must be thrown
      	 */
	    var result =null;
		var manifestObj = null;
		var exceptions = 0;
		var settings = null;
		var manifestObjs=[];
		var manifestFiles=[];
		var config = getBackupSettings();
		
		//Initially cleanup folders content
		if (config.destination.exists){
			config.destination.removeContent(true);
		}
		if (config.backupRegistryFolder.exists){
			config.backupRegistryFolder.removeContent(true);
		}
		
		//Phase 1: creates some backups
		config.maxRetainedBackups = 5;
		
		for(var i =0; i < config.maxRetainedBackups; i++){
			result = null;
			manifestObj = null;
			
			try{
				result = ds.backup(config);
				manifestFiles.push(result);
				manifestObj = createManifestObject(result);
				manifestObjs.push(manifestObj);
				MySleep(1200);
			}
			catch(e){
				exceptions++;
			}
			finally{
			}

			//First backup shall succeed, with a manifest and a proper backup folder content
			Y.Assert.isNotNull(manifestFiles[i],"No manifest file returned at round "+i);
			Y.Assert.isNotNull(manifestObjs[i],"No manifest object returned at round "+i);
			
			Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder),"Null backup registry at round "+i);
			Y.Assert.isNotNull(getLastBackups(),"Null backup registry with getLastBackups() at round "+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object at round "+i);
			
			Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent),"Invalid backup folder content at round "+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getLastBackups().length, "Mismatch between maxRetainedBackups and getLastBackups().length at round "+i);
			Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
		}
		Y.Assert.areEqual(config.maxRetainedBackups,manifestFiles.length,"Not enough collected manifest files");
		Y.Assert.areEqual(config.maxRetainedBackups,manifestObjs.length,"Not enough collected manifest objects");
		Y.Assert.areEqual(config.maxRetainedBackups,getLastBackups().length,"Not enough entries from getLastBackups()");
		Y.Assert.areEqual(config.maxRetainedBackups,getBackupRegistry(config.backupRegistryFolder).length,"Not enough entries from getBackupRegistry()");

		//Validate collected manifest files are stored in the same order as the backup registry
		var lastBackups = getLastBackups();
		for(var i =0; i < config.maxRetainedBackups; i++){
			
			Y.Assert.areEqual(lastBackups[i].path,manifestFiles[i].path,"Not the expected manifest path in backup registry entry "+i);
			Y.Assert.isTrue(manifestFiles[i].exists,"Manifest file does not exist in backup registry entry "+i);
			Y.Assert.isTrue(checkBackupManifest(manifestObjs[i]),"Invalid manifest object for entry "+i);
			Y.Assert.isTrue(validateBackupFolderContent(manifestFiles[i].parent,"Invalid backup folder content for entry "+i));
		}
		
		//remove a manifest file from the FS
		//ds.backup() must issue one warning but not throw an exception
		var removedBackupFolder = manifestFiles[0].parent;
		
		removedBackupFolder.remove();
		exceptions = 0;
		result = null;
		var backupReport = new BackupReport();
		try{
				result = ds.backup(config,backupReport);
				manifestFiles.push(result);
				manifestObj = createManifestObject(result);
				manifestObjs.push(manifestObj);
		}
		catch(e){
			exceptions++;
		}
		finally{
		}
		
		Y.Assert.areEqual(0,exceptions,"exception returned");
		Y.Assert.areEqual(1,backupReport.warnings.length,"No warning(s) reported");
		Y.Assert.areEqual(0,backupReport.errors.length,"Error(s) reported");
		Y.Assert.isNotNull(result,"No manifest file returned");
		Y.Assert.areEqual(config.maxRetainedBackups,getLastBackups().length , "maxRetainedBackups != getLastBackups().length");
		
    }
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}


