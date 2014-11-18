


/**
 * Unit tests for getLastBackups()
 */
 
var baseFolderPath = application.getFolder("path");
var backupFolderPath = baseFolderPath + "Backups/";
var backupRegistryPath = baseFolderPath + "Backups/";


var CONSTANTS={
	registryFilename : "lastBackups.json",
	preWak9RegistryFilename : "lastBackup.json"
}
	



var testCase = {
     name: "Coverage tests for getLastBackups() validation",
     
    _should: {
		error: {
			
		},
		ignore: {
			/*
			testGetLastBackupsWithNoBackupRegistry: true,
			testGetLastBackupsWithNoBackupRegistryFolderIsAvailable: true,
			testGetLastBackupsWithEmptyBackupRegistryFile: true,
			testGetLastBackupsWithDefaultBackupConfig: true,
			testGetLastBackupsWithNonUniqueNames: false
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
    },
 
    tearDown : function () {
    },
    
    testGetLastBackupsWithNoBackupRegistry: function () {
		//Tests that getLastBackups() returns an empty array when no backup registry is available.
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(mySettings.backupRegistryFolder.exists)
		{
			mySettings.backupRegistryFolder.removeContent(true);
		}
		if(mySettings.destination.exists)
		{
			mySettings.destination.removeContent(true);
		}
		
		var lastBackups = null;
		var exceptions = 0;
			
		try{
			lastBackups = getLastBackups();
			 
		}
		
		catch(e){
			exceptions++;
		}
		finally{
		}

		Y.Assert.isNotNull(lastBackups,"last backups NULL");
		Y.Assert.isArray(lastBackups,"getLastBackups did not return an array");
		Y.Assert.areEqual(0,lastBackups.length,"getLastBackups returned array not empty");
    },
    
    testGetLastBackupsWithNoBackupRegistryFolderIsAvailable: function () {
		//Tests that getLastBackups() returns an empty array when no backup registry folder exists.
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(mySettings.backupRegistryFolder.exists)
		{
			mySettings.backupRegistryFolder.removeContent(true);
			mySettings.backupRegistryFolder.remove();
		}
		
		var lastBackups = null;
		var exceptions = 0;
			
		try{
			lastBackups = getLastBackups();
			 
		}
		
		catch(e){
			exceptions++;
		}
		finally{
		}

		Y.Assert.isNotNull(lastBackups,"last backups NULL");
		Y.Assert.isArray(lastBackups,"getLastBackups did not return an array");
		Y.Assert.areEqual(0,lastBackups.length,"getLastBackups returned array not empty");
    },
    
    testGetLastBackupsWithEmptyBackupRegistryFile: function () {
		//Tests that getLastBackups() returns an empty array when the backup registry is empty.
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(!mySettings.backupRegistryFolder.exists)
		{
			
			mySettings.backupRegistryFolder.create();
		}
		else
		{
			mySettings.backupRegistryFolder.removeContent(true);
		}
		
		var lastBackups = null;
		var exceptions = 0;
			
		try{
			var backupRegFile = new File(mySettings.backupRegistryFolder.path + CONSTANTS.registryFilename);
			backupRegFile.create();
			lastBackups = getLastBackups();
		}
		
		catch(e){
			exceptions++;
		}
		finally{
		}

		Y.Assert.isNotNull(lastBackups,"last backups NULL");
		Y.Assert.isArray(lastBackups,"getLastBackups did not return an array");
		Y.Assert.areEqual(0,lastBackups.length,"getLastBackups returned array not empty");
    },
    
    testGetLastBackupsWithDefaultBackupConfig: function () {
		//Tests that getLastBackups() 
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(mySettings.backupRegistryFolder.exists)
		{
			mySettings.backupRegistryFolder.removeContent(true);
			mySettings.backupRegistryFolder.remove();
		}
		if(mySettings.destination.exists)
		{
			mySettings.destination.removeContent(true);
			mySettings.destination.remove();
		}
		
		var lastBackups = null;
		var exceptions = 0;
		for(var i = 0;i < 5; i++){
			var manif;
			try{
				manif = ds.backup();
				lastBackups = getLastBackups();
			}
			
			catch(e){
				exceptions++;
			}
			finally{
			}
			Y.Assert.isNotNull(lastBackups,"last backups NULL");
			Y.Assert.isNotNull(lastBackups,"last backups NULL");
			Y.Assert.isArray(lastBackups,"getLastBackups did not return an array");
			Y.Assert.areEqual(i+1,lastBackups.length,"getLastBackups returned array length mismatch");
		}
    },
    testGetLastBackupsWithNonUniqueNames: function () {
		//Tests that the manifest registry is filled with duplicates when using non-unique names
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(mySettings.backupRegistryFolder.exists)
		{
			mySettings.backupRegistryFolder.removeContent(true);
			mySettings.backupRegistryFolder.remove();
		}
		if(mySettings.destination.exists)
		{
			mySettings.destination.removeContent(true);
			mySettings.destination.remove();
		}
		
		var lastBackups = null;
		var exceptions = 0;
		mySettings.useUniqueNames = false;
		
		for(var i = 0;i < 5; i++){
			var manif;
			try{
				manif = ds.backup(mySettings);
				lastBackups = getLastBackups();
			}
			
			catch(e){
				exceptions++;
			}
			finally{
			}
			Y.Assert.isNotNull(lastBackups,"last backups NULL");
			Y.Assert.isNotNull(lastBackups,"last backups NULL");
			Y.Assert.isArray(lastBackups,"getLastBackups did not return an array");
			Y.Assert.areEqual(1,lastBackups.length,"getLastBackups returned array length mismatch");
		}
    },
	
	
	testGetLastBackupsWithMultipleDuplicatesInRegistry: function () {
		//This test is for bug WAK0084452, before WAK0084452  was fixed, a backup registry could
		//contain duplicate entries if some backups had been performed repeatedly with useUniqueNames == false.
		//This tests ensures that duplicates are actually removed from the registry when backing up with use unique names == true
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(mySettings.backupRegistryFolder.exists)
		{
			mySettings.backupRegistryFolder.removeContent(true);
			mySettings.backupRegistryFolder.remove();
		}
		if(mySettings.destination.exists)
		{
			mySettings.destination.removeContent(true);
			mySettings.destination.remove();
		}
		
		
		
		//Create 1 backup with no unique names and manually create a backup registry that has 3 entries
		var lastBackups = null;
		var exceptions = 0;
		var exceptionText = "";
		mySettings.useUniqueNames = false;
		var backupFolderPath = mySettings.destination.path+"Backup_"+Date.now()+"/";
		mySettings.destination = new Folder(backupFolderPath);
		
		var manif;
		try{
			manif = ds.backup(mySettings);
			lastBackups = getLastBackups();
			var f  = new File(mySettings.backupRegistryFolder.path+ CONSTANTS.registryFilename);
			var ts = new TextStream(f,"Overwrite");
			ts.write("[\""+manif.path+"\",\""+manif.path+"\",\""+manif.path+"\"]");
			ts.flush();
			ts.close();
		}
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}
		
		Y.Assert.areEqual(0,exceptions,exceptionText+" in test preparation");
		
		//Attempt to perform more backups
		//Must fail because backup folder already exists, and existing backup registry must not be modified
		for(var i = 0;i < 5; i++){
			exceptions = 0;
			try{
			manif = ds.backup(mySettings);
			}
			
			catch(e){
				exceptions++;
				exceptionText = e.message;
			}
			finally{
				lastBackups = getLastBackups();
			}
			Y.Assert.areEqual(1,exceptions,"Exception thrown: "+exceptionText);
			Y.Assert.areEqual("Folder "+backupFolderPath+" already exists.",exceptionText,"Exception mismatch");
			Y.Assert.isNotNull(lastBackups,"last backups NULL");
			Y.Assert.isArray(lastBackups,"getLastBackups did not return an array");
			Y.Assert.areEqual(3,lastBackups.length,"getLastBackups returned array length mismatch");
		}
		
		//Then again perform backups, but clean the the backup folder.
		//This time backups shall succeed and the registry should be purged from duplicates, i.e. only
		//One entry shall be found
		for(var i = 0;i < 5; i++){
			exceptions = 0;
			try{
				mySettings.destination.remove();
				manif = ds.backup(mySettings);
				lastBackups = getLastBackups();
			}
			
			catch(e){
				exceptions++;
				exceptionText = e.message;
			}
			finally{
			}
			Y.Assert.areEqual(0,exceptions,"Exception thrown: "+exceptionText);
			Y.Assert.isNotNull(lastBackups,"last backups NULL");
			Y.Assert.isNotNull(lastBackups,"last backups NULL");
			Y.Assert.isArray(lastBackups,"getLastBackups did not return an array");
			Y.Assert.areEqual(1,lastBackups.length,"getLastBackups returned array length mismatch");
		}
    },
    testGetLastBackupsWithMissingBackupFolders: function () {
	//Tests that getLastBackups() does not throw an exception if a backup folder in the backup registry is not found
	//on the file system
	//Addendum WAK0089332: if a manifest is not found, getLastBackups() shall not return an entry for that manifest
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(mySettings.backupRegistryFolder.exists)
		{
			mySettings.backupRegistryFolder.removeContent(true);
			mySettings.backupRegistryFolder.remove();
		}
		if(mySettings.destination.exists)
		{
			mySettings.destination.removeContent(true);
			mySettings.destination.remove();
		}
		
		//Create 4 backups
		var lastBackups = null;
		var exceptions = 0;
		var exceptionText = "";
		mySettings.useUniqueNames = true;
		mySettings.maxRetainedBackups = 4;
		var backupFolderPath = mySettings.destination.path+"Backup_"+Date.now()+"/";
		mySettings.destination = new Folder(backupFolderPath);
		
		var manif=[];
		try{
			for(var i=0; i < 4; i++){
				manif.push(ds.backup(settings));
			}
		}
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}
		Y.Assert.areEqual(0,exceptions,exceptionText+" in test preparation");
		Y.Assert.areEqual(4,manif.length,"Wrong coutn of backups in test preparation");
		
		//Now manually remove one backup folder
		//remove the first backup folder "manually"
		manif[2].parent.remove(true);
		manif.splice(2,1);
		
		//Retrieve the last backups:
		//* no exception should be thrown
		//* only 3 backups shall be returned
		var result =null;
		var exceptions = 0;
		var msg = '';
		try{
			 result = getLastBackups();
		}
		
		catch(e){
			exceptions++;
			msg = e.message;
		}
		finally{
		}
		//there should be 3 entries
		Y.Assert.isArray(result,"Not an array");
		Y.Assert.areEqual(result.length,3,"Wrong nb of entries");
		Y.Assert.areEqual(msg,'',"not the expected error message");
		Y.Assert.areEqual(exceptions,0,"getLastBackups() threw an exception");
		
		/* result must be
		[{path: manifest,dataFolder:xxx,journal:xxx,date:xxx,version:xxx},
		 ...,
		 {path: manifest,dataFolder:xxx,journal:xxx,date:xxx,version:xxx}
		 ]
		 */
		
		var complete = 0;
		for (var i =0;i < result.length;i++){
			Y.Assert.isTrue(result[i].hasOwnProperty('path'));
			Y.Assert.isTrue(result[i].hasOwnProperty('dataFolder'));
			Y.Assert.isTrue(result[i].hasOwnProperty('journal'));
			Y.Assert.isTrue(result[i].hasOwnProperty('date'));
			Y.Assert.isTrue(result[i].hasOwnProperty('version'));
			Y.Assert.isTrue(File(result[i].path).exists,"Manifest file not found");
			Y.Assert.isTrue(File(result[i].path).parent.exists,"Backup folder not found");
			Y.Assert.areSame(result[i].path,manif[i].path,"Backup manifests not returned in the expected order");
			complete++
		}
		
		Y.Assert.areEqual(complete,3,"complete backup manifest count not correct");
    },
	testGetLastBackupsWithMissingBackupManifest: function () {
	//Tests that getLastBackups() does not throw an exception if a backup manifest the backup registry is not found
	//on the file system
	//Addendum WAK0089332: if a manifest is not found, getLastBackups() shall not return an entry for that manifest
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(mySettings.backupRegistryFolder.exists)
		{
			mySettings.backupRegistryFolder.removeContent(true);
			mySettings.backupRegistryFolder.remove();
		}
		if(mySettings.destination.exists)
		{
			mySettings.destination.removeContent(true);
			mySettings.destination.remove();
		}
		
		//Setup: create a series of backups
		var lastBackups = null;
		var exceptions = 0;
		var exceptionText = "";
		mySettings.useUniqueNames = true;
		mySettings.maxRetainedBackups = 4;
		var backupFolderPath = mySettings.destination.path+"Backup_"+Date.now()+"/";
		mySettings.destination = new Folder(backupFolderPath);
		
		var manif;
		try{
			manif = ds.backup(mySettings);
			manif = ds.backup(mySettings);
			manif = ds.backup(mySettings);
			manif = ds.backup(mySettings);
		}
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}
		Y.Assert.areEqual(0,exceptions,exceptionText+" in test preparation");
		
		//Now manually remove one backup manifest
		var backups = getLastBackups();
		Y.Assert.areEqual(backups.length,4);
		
		var removedManifest = new File(backups[0].path);
		removedManifest.remove();
		
		//Retrieve the last backups, no exception should be thrown
		var result =null;
		var exceptions = 0;
		var msg = '';
		try{
			 result = getLastBackups();
		}
		
		catch(e){
			exceptions++;
			msg = e.message;
		}
		finally{
		}
		
		//We created 4 backups, maxRetainedBackups is 4 so there must be 3 entries in the result
		Y.Assert.isArray(result,"Not an array");
		Y.Assert.areEqual(result.length,3,"Wrong nb of entries");
		Y.Assert.areEqual(msg,'',"not the expected error message");
		Y.Assert.areEqual(exceptions,0,"getLastBackups() threw an exception");
		
		/* result must be
		[{path: manifest,dataFolder:xxx,journal:xxx,date:xxx,version:xxx},
		 ...,
		 {path: manifest,dataFolder:xxx,journal:xxx,date:xxx,version:xxx}
		 ]
		*/
		var incomplete = 0;
		var complete = 0;
		for (var i =0;i < result.length;i++){
			Y.Assert.isTrue(result[i].hasOwnProperty('path'));
				Y.Assert.isTrue(result[i].hasOwnProperty('dataFolder'));
				Y.Assert.isTrue(result[i].hasOwnProperty('journal'));
				Y.Assert.isTrue(result[i].hasOwnProperty('date'));
				Y.Assert.isTrue(result[i].hasOwnProperty('version'));
				Y.Assert.isTrue(File(result[i].path).exists,"Manifest file not found");
				Y.Assert.isTrue(File(result[i].path).parent.exists,"Backup folder not found");
				complete++;
		}
		Y.Assert.areEqual(complete,3,"complete backup manifest count not correct");
    },
	testGetLastBackupsRegistryNameFallbackSupport: function(){
		//This test is for regressing WAK0088009. Until WAK9 we used 'lastBackup.json' as the backup registry name.
		//From WAK9 onwards, it is 'lastBackups.json' (notice the s)
		//This test ensures that getLastBackups() will use the new name and if not found, use the older name
	
		var result = null;
		var exceptions = 0;
		var settings = getBackupSettings();
		
		//Clear the backup folder
		if(settings.backupRegistryFolder.exists)
		{
			settings.backupRegistryFolder.removeContent(true);
			settings.backupRegistryFolder.remove();
		}
		if(settings.destination.exists)
		{
			settings.destination.removeContent(true);
			settings.destination.remove();
		}
		
		//Setup: create a series of backups
		var lastBackups = null;
		var exceptions = 0;
		var exceptionText = "";
		settings.useUniqueNames = true;
		settings.maxRetainedBackups = 5;
		var backupFolderPath = settings.destination.path+"Backup_"+Date.now()+"/";
		settings.destination = new Folder(backupFolderPath);
		
		var manif=[];
		try{
			for(var i=0;i<settings.maxRetainedBackups-1;++i){
				manif.push(ds.backup(settings));
			}
		}
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}
		Y.Assert.areEqual(0,exceptions,exceptionText+" in test preparation");
	
		//Verify that only a registry with the new name is created. This does not technically belong here but does not hurt
		var oldBackupRegistryFile=new File(settings.backupRegistryFolder.path+CONSTANTS.preWak9RegistryFilename);
		var currentBackupBackupRegistryFile=new File(settings.backupRegistryFolder.path+CONSTANTS.registryFilename);
		Y.Assert.isTrue(currentBackupBackupRegistryFile.exists,"lastBackups.json not found");
		Y.Assert.isTrue(currentBackupBackupRegistryFile.exists,"unexpected lastBackup.json found");
		
		//Now verify the fallback, we copy 'lastBackups.json' to 'lastBackup.json'
		//and create a new backup, which manifest will be stored in lastBackups.json (totalling 5 backups)
		var result =null;
		var exceptions = 0;
		var msg = '';
		try{
			currentBackupBackupRegistryFile.copyTo(oldBackupRegistryFile);
			manif.push(ds.backup(settings));
			result = getLastBackups();
		}
		
		catch(e){
			exceptions++;
			msg = e.message;
		}
		finally{
		}
		
		//Check that so far we have 5 backups
		Y.Assert.isArray(result,"Not an array");
		Y.Assert.areEqual(5,result.length,"Wrong nb of backups in registry");
		Y.Assert.areEqual(exceptions,0,"Unexpected exception thrown");
		
		//then remove 'lastBackups.json' and call getLAstBackups(), it shall return 4 backups (those stored in 
		//the pre-wak9 registry 'lastBackup.json', indicating correct fallback
		result =null;
		exceptions = 0;
		msg = '';
		try{
			currentBackupBackupRegistryFile.remove();
			result = getLastBackups();
		}
		
		catch(e){
			exceptions++;
			msg = e.message;
		}
		finally{
		}
		//Check that so far we have 4 backups
		Y.Assert.isArray(result,"Not an array");
		Y.Assert.areEqual(4,result.length,"Wrong nb of backups returned from former registry");
		Y.Assert.areEqual(exceptions,0,"Unexpected exception thrown");
		
		//
	}
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}



