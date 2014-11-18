
/**
 * Unit tests for the backupDatastore method
 */
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


function unitTestBackupDataStoreShallFail(testConfig){
	var result =null;
	var exceptions = 0;
	var exceptionText = "";
	
	var config = {
			exceptionText:"Folder "+backupFolderPath+" already exists.",
			destination:Folder(backupFolderPath), //should be a folder
			backupRegistryFolder:Folder(backupRegistryPath),
			useUniqueNames: false,
			maxRetainedBackups:20
		};
	try{
		result = backupDataStore(testConfig.modelFile, testConfig.dataFile,testConfig.backupConfig);
	}
		
	catch(e){
		exceptions++;
		exceptionText = e.message;
	}
	finally{
	}
	//No manifest should be generated
	Y.Assert.isNull(result,"Unexpected manifest file for config ");
	//No exception should have occured
	Y.Assert.areEqual(exceptions,1,"No exception thrown fro config "+i);
	Y.Assert.areEqual(config.exceptionText,exceptionText,"Exception mismatch for config "+i);  		
}

var testCase = {
     name: "backupDataStore: Parameters validation coverage",
     
    _should: {
		error: {
			
		},
		ignore: {
			testBackupDataStoreFailsWithNoParams: false,
			testBackupDataFailsWithIncorrectParameters: false,
			testBackupDataStoreRejectsConfigWithInvalidPropertyTypes: false,
			testBackupDataStoreFailsIfBackupFolderExists: false
			
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
    
    testBackupDataStoreWithNoParams: function () {
		//call backupDatastore with no params, must fail
		var result =null;
		var exceptions = 0;
		try{
			 result = backupDataStore();
		}
		
		catch(e){
			exceptions++;
		}
		finally{
		}
		//No manifest should be generated
		Y.Assert.isNull(result,"Unexpected manifest file");
		//No exception should have occured
		Y.Assert.areEqual(1,exceptions,"backupDataStore threw an exception");
    },

	testBackupDataFailsWithIncorrectParameters: function () {
		//Ensure backupDataStore fails if parameters nb is not correct or parameters are not of the expected type
		//Set of parameters that should cause backupDataStore to fail
		var incorrectParametersSets = [
			{
				modelFileParam:null,
				dataFileParam:null,
				configParam:null
			},
			{
				modelFileParam:"",
				dataFileParam:null,
				configParam:null
			},
			{
				modelFileParam:null,
				dataFileParam:"",
				configParam:null
			},
			{
				modelFileParam:modelFilePath,
				dataFileParam:"",
				configParam:null
			},
			{
				modelFileParam:"",
				dataFileParam:dataFilePath,
				configParam:null
			},
			{
				modelFileParam:"",
				dataFileParam:dataFilePath,
				configParam:{}
			},
			{
				modelFileParam:nonExistingModelFile,
				dataFileParam:null,
				configParam:{}
			},
			{
				modelFileParam:nonExistingModelFile,
				dataFileParam:"",
				configParam:{}
			},
			{
				modelFileParam:nonExistingModelFile,
				dataFileParam:nonExistingDataFile,
				configParam:{}
			}
		];
   	
    	var i=0;
    	var result =null;
		var exceptions = 0;
		var exceptionText = "";
    	for(i =0;i < incorrectParametersSets.length;i++){
    		result =null;
			exceptions = 0;
			exceptionText = "";
			var params = incorrectParametersSets[i];
			
			try{
				result = backupDataStore(params.modelFileParam, params.dataFileParam,params.configParam);
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
			Y.Assert.areEqual(exceptions,1,"No exception thrown fro config "+i);
    	}
    },
      
   //Test for validating backup config parameter
    testBackupDataStoreFailsForMissingProperty_useUniqueNames: function (){
    	
    	var exceptions = 0;
		var exceptionText = "";
		var result = null;
		var config = {
			exceptionText:"backup configuration property 'useUniqueNames' not found",
			destination: Folder(backupFolderPath),
			backupRegistryFolder:Folder(backupRegistryPath),
			maxRetainedBackups:20
		};
		
    	try{
			result = backupDataStore(modelFile, dataFile,config);
		}
			
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		
		finally{
		}
		
		//No manifest should be generated
		Y.Assert.isNull(result,"Unexpected manifest file for config ");
		//No exception should have occured
		Y.Assert.areEqual(exceptions,1,"No exception thrown for config ");
		Y.Assert.areEqual(config.exceptionText,exceptionText,"No the expected exception");
	},
	
	testBackupDataStoreFailsForMissingProperty_destination: function (){
    	
    	var exceptions = 0;
		var exceptionText = "";
		var result = null;
		var config = {
			exceptionText:"backup configuration property 'destination' not found",
			useUniqueNames: true,
			backupRegistryFolder:Folder(backupRegistryPath),
			maxRetainedBackups:20
		};
		
    	try{
			result = backupDataStore(modelFile, dataFile,config);
		}
			
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		
		finally{
		}
		
		//No manifest should be generated
		Y.Assert.isNull(result,"Unexpected manifest file for config ");
		//No exception should have occured
		Y.Assert.areEqual(exceptions,1,"No exception thrown for config ");
		Y.Assert.areEqual(config.exceptionText,exceptionText,"No the expected exception");
	},
	
	testBackupDataStoreFailsForMissingProperty_backupRegistryFolder: function (){
    	
    	var exceptions = 0;
		var exceptionText = "";
		var result = null;
		var config = {
			exceptionText:"backup configuration property 'backupRegistryFolder' not found",
			useUniqueNames: true,
			destination: Folder(backupFolderPath),
			maxRetainedBackups:20
		};
		
    	try{
			result = backupDataStore(modelFile, dataFile,config);
		}
			
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		
		finally{
		}
		
		//No manifest should be generated
		Y.Assert.isNull(result,"Unexpected manifest file for config ");
		//No exception should have occured
		Y.Assert.areEqual(exceptions,1,"No exception thrown for config ");
		Y.Assert.areEqual(config.exceptionText,exceptionText,"No the expected exception");
	},
	testBackupDataStoreFailsForMissingProperty_maxRetainedBackups: function (){
    	
    	var exceptions = 0;
		var exceptionText = "";
		var result = null;
		var config = {
			exceptionText:"backup configuration property 'maxRetainedBackups' not found",
			useUniqueNames: true,
			destination: Folder(backupFolderPath),
			backupRegistryFolder:Folder(backupRegistryPath)
		};
		
    	try{
			result = backupDataStore(modelFile, dataFile,config);
		}
			
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		
		finally{
		}
		
		//No manifest should be generated
		Y.Assert.isNull(result,"Unexpected manifest file for config ");
		//No exception should have occured
		Y.Assert.areEqual(exceptions,1,"No exception thrown for config ");
		Y.Assert.areEqual(config.exceptionText,exceptionText,"No the expected exception");
	},
	
	testBackupDataStoreFailsForInvalidType_maxRetainedBackups: function (){
    	
		var config = {
			exceptionText:"Invalid type for backup configuration property 'maxRetainedBackups', number or string expected",
			destination:Folder(backupFolderPath), //should be a folder
			backupRegistryFolder:Folder(backupRegistryPath),
			useUniqueNames: false,
			maxRetainedBackups: 20
		};
		var testValues = [null,{foo: true},{},true,false];
		
		for(var i = 0; i < testValues.length;i++){
			var exceptions = 0;
			var exceptionText = "";
			var result = null;
			
			config["maxRetainedBackups"] = testValues[i];
    		try{
				result = backupDataStore(modelFile, dataFile,config);
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
			Y.Assert.areEqual(config.exceptionText,exceptionText,"No the expected exception for value "+i);
		}
	},
	testBackupDataStoreFailsForInvalidValue_maxRetainedBackups: function (){
    	
		var config = {
			exceptionText:"Invalid value for backup configuration property 'maxRetainedBackups'",
			destination:Folder(backupFolderPath), //should be a folder
			backupRegistryFolder:Folder(backupRegistryPath),
			useUniqueNames: false,
			maxRetainedBackups: 20
		};
		var testValues = ["aaa",0,-1,-20,-2400,"LLA","true","false"];
		
		for(var i = 0; i < testValues.length;i++){
			var exceptions = 0;
			var exceptionText = "";
			var result = null;
			
			config["maxRetainedBackups"] = testValues[i];
    		try{
				result = backupDataStore(modelFile, dataFile,config);
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
			Y.Assert.areEqual(config.exceptionText,exceptionText,"No the expected exception for value "+i);
		}
	},
    	
    testBackupDataStoreFailsIfBackupFolderExists: function () {
    	var i=0;
	
		var result =null;
		var exceptions = 0;
		var exceptionText = "";
		var config = {
			exceptionText:"Folder "+backupFolderPath+" already exists.",
			destination:Folder(backupFolderPath), //should be a folder
			backupRegistryFolder:Folder(backupRegistryPath),
			useUniqueNames: false,
			maxRetainedBackups:20
		};
		
		if(!config.destination.exists){
			//Test bot may clear directory so for the purpose of this test, ensure the backup folder exists
			config.destination.create();
		}
		try{
			result = backupDataStore(modelFile, dataFile,config);
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
		Y.Assert.areEqual(exceptions,1,"No exception thrown fro config "+i);
		Y.Assert.areEqual(config.exceptionText,exceptionText,"Exception mismatch for config "+i);  		
	}
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}


