/* This is a regular JS file */


var baseFolder = application.getFolder("path");
var restoreFolder = baseFolder + "TestRestore/";
var backupRegistryPathNoJournal = baseFolder+ "TestBackups/NoJournal/";
var backupRegistryPathWithJournal = baseFolder+ "TestBackups/WithJournal/";

var noCleanOnTearDown = false;
var manifestRebased = false;


//Simply rewrites manifests in order to store the correct base path into the properties
//so that the test suites can be relocated
function rebaseBackupManifests(backupFolderPath){
	var baseFolder = new Folder(backupFolderPath);
	var subFolders = baseFolder.folders;
	var utf8 = 7;
	for(var i = 0;i<subFolders.length;i++){
		var file = new File(subFolders[i].path+'backupManifest.json');
		var data = file.toString();
		var manifObj = JSON.parse(data);
		manifObj["dataFolder"] = file.parent.path+"DataFolder/";
		if(manifObj["journal"] != ''){
			manifObj["journal"] = file.parent.path+"journal.waJournal";
		}
		data = JSON.stringify(manifObj);
		file.remove();
		
		var stream = TextStream(file, "write",utf8);
    	stream.write(data);
    	stream.close();
    }
}
 

var testCase = {
	name: "Test restoreDataStore",
	_should: {
		error: {
			
			
		},
		ignore: {

		}
    },
    setUp : function () {
    	var f = Folder(restoreFolder);
    	if(f.exists){
    		f.removeContent();
    	}
    	else{
    		f.create();
    	}
    	
    	//Need to manually patch the manifest files to make
    	//the test portables and cross platform...
    	if (!manifestRebased){
    		rebaseBackupManifests(backupRegistryPathNoJournal);
    		rebaseBackupManifests(backupRegistryPathWithJournal);
    		manifestRebased = true;
    	}
    	
    	},
    tearDown : function () {
    	var f = Folder(restoreFolder);
    	if(f.exists && !noCleanOnTearDown ){
    		f.removeContent();
    	}
    	noCleanOnTearDown  = false;
    	
    	},
    testRestoreDataStoreNoParams: function () {
    	var result =null;
		var exceptions = 0;
		try{
			 result = restoreDataStore();
		}
		catch(e){
			exceptions++;
		}
		finally{
			Y.Assert.isNull(result,"result should be defined");
			Y.assert(exceptions>0,"restoreDataStore should have thrown an exception");
		}
   	},
   	testRestoreDataStoreWithInvalidParameterNoFolder: function () {
    	var result =null;
		var exceptions = 0;
		var manifest = backupRegistryPathNoJournal + "backup_2012-10-23_19-54-51/backupManifest.json";
		try{
			 result = restoreDataStore(manifest);
		}
		catch(e){
			exceptions++;
		}
		finally{
			Y.Assert.isNull(result,"result should be defined");
			Y.assert(exceptions>0,"restoreDataStore should have thrown an exception");
		}
   	},
   	//Test that restore folder must be specified. Must fail
   	testRestoreDataStoreNoRestoreFolder: function () {
    	var result =null;
		var exceptions = 0;
		var manifest = new File(backupRegistryPathNoJournal + "backup_2012-10-23_19-54-51/backupManifest.json");
		try{
			 result = restoreDataStore(manifest);
		}
		catch(e){
			exceptions++;
		}
		finally{
			Y.Assert.isNull(result,"result should be defined");
			Y.assert(exceptions>0,"restoreDataStore should have thrown an exception");
		}
   	},
   	//Test that manifest path be specified only as File. Must fail
   	testRestoreDataStoreWithInvalidParameterNoFolder: function () {
    	var result =null;
		var exceptions = 0;
		var manifest = backupRegistryPathNoJournal + "backup_2012-10-23_19-54-51/backupManifest.json";
		try{
			 result = restoreDataStore(manifest,Folder(restoreFolder));
		}
		catch(e){
			exceptions++;
		}
		finally{
			Y.Assert.isNull(result,"result should be defined");
			Y.assert(exceptions>0,"restoreDataStore should have thrown an exception");
		}
   	},
   	testRestoreDataStoreWithUnreachableFolder: function () {
    	var result =null;
		var exceptions = 0;
		var manifest = backupRegistryPathNoJournal + "backup_2012-10-23_19-54-51/backupManifest.json";
		var destFolder;
		if (os.isWindows) {
			destFolder = new Folder("M:/ShouldNotBeThere/");
    	}
    	else if (os.isLinux) {
    		destFolder = new Folder("/dev/ShouldNotBeThere/");
    	}
		else {
			//MAC
			destFolder = new Folder("/Volumes/Network/ShouldNotBeThere/");
		}
		try{
			 result = restoreDataStore(manifest,destFolder);
		}
		catch(e){
			exceptions++;
		}
		finally{
			Y.Assert.isNull(result,"result should be defined");
			Y.assert(exceptions>0,"restoreDataStore should have thrown an exception");
		}
   	},
   	//Test that restore folder must be specified as a folder object. Must fail
   	testRestoreDataStoreInvalidTypeForRestoreFolder: function () {
    	var result =null;
		var exceptions = 0;
		var manifest = new File(backupRegistryPathNoJournal + "backup_2012-10-23_19-54-51/backupManifest.json");
		try{
			//restoreFolder is a string
			 result = restoreDataStore(manifest,restoreFolder);
		}
		catch(e){
			exceptions++;
		}
		finally{
			Y.Assert.isNull(result,"result should be defined");
			Y.assert(exceptions>0,"restoreDataStore should have thrown an exception");
		}
   	},
   	//Test restore with valid parameter, no journal in backup. Must pass
   	testRestoreDataStoreNoJournal: function () {
    	var result =null;
		var exceptions = 0;
		var manifest = new File(backupRegistryPathNoJournal + "backup_2012-10-23_19-54-51/backupManifest.json");
		try{
			//restoreFolder is a string
			 result = restoreDataStore(manifest,Folder(restoreFolder));
		}
		catch(e){
			exceptions++;
		}
		finally{
			Y.Assert.isNotNull(result,"result should be defined");
			Y.assert(exceptions == 0,"restoreDataStore should have thrown an exception");
			Y.Assert.isTrue(Folder(restoreFolder + "DataFolder").exists,"no restored data folder found");
			Y.Assert.isFalse(File(restoreFolder + "journal.waJournal").exists,"unexpected journal found");
		}
   	},
   	
   	//Test restore with valid parameter, with journal in backup. Must pass
   	testRestoreDataStoreWithJournal: function () {
    	var result =null;
		var exceptions = 0;
		var manifest = new File(backupRegistryPathWithJournal + "backup_2012-11-09_09-59-10/backupManifest.json");
		try{
			//restoreFolder is a string
			 result = restoreDataStore(manifest,Folder(restoreFolder));
		}
		catch(e){
			exceptions++;
		}
		finally{
			Y.Assert.isNotNull(result,"result should be defined");
			Y.Assert.isTrue(result.ok,"result.ok mismatch");
			Y.assert(exceptions == 0,"restoreDataStore should have thrown an exception");
			Y.Assert.isTrue(Folder(restoreFolder + "DataFolder").exists,"expected restored data folder not found");
			Y.Assert.isTrue(File(restoreFolder + "journal.waJournal").exists,"expected journal not found");
		}
   	},
   	
   	//Test combination of ds.backup() and restoreDataStore. Must pass
   	testRestoreDataStoreAfterDsDotBackup: function () {
    	var result =null;
		var exceptions = 0;
		var manifest = null;
		try{
			//restoreFolder is a string
			manifest = ds.backup();
			result = restoreDataStore(manifest,Folder(restoreFolder));
		}
		catch(e){
			exceptions++;
		}
		finally{
			//manifest must be a valid object
			Y.Assert.isNotNull(manifest,"manifest should be defined");
			Y.Assert.isObject(manifest,"manifest should be an object");
			
			//result should be {ok: true}
			Y.Assert.isNotNull(result,"result should be defined");
			Y.Assert.isTrue(result.ok,"result.ok mismatch");
			
			//no exception thrown, a DataFolder folder is found in the restore folder and no journal is there
			//since this database is not journaled
			Y.assert(exceptions == 0,"restoreDataStore should have thrown an exception");
			Y.Assert.isTrue(Folder(restoreFolder + "DataFolder").exists,"expected restored data folder not found");
			Y.Assert.isFalse(File(restoreFolder + "journal.waJournal").exists,"unexpected journal found");
		}
	}
};


if (typeof dontRequireUnitTestModule === 'undefined'){
	require("unitTest").run(testCase).getReport();
}

