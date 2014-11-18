/*
 * This file is part of Wakanda software, licensed by 4D under
 *  (i) the GNU General Public License version 3 (GNU GPL v3), or
 *  (ii) the Affero General Public License version 3 (AGPL v3) or
 *  (iii) a commercial license.
 * This file remains the exclusive property of 4D and/or its licensors
 * and is protected by national and international legislations.
 * In any event, Licensee's compliance with the terms and conditions
 * of the applicable license constitutes a prerequisite to any use of this file.
 * Except as otherwise expressly stated in the applicable license,
 * such license does not include any other license or rights on this file,
 * 4D's and/or its licensors' trademarks and/or other proprietary rights.
 * Consequently, no title, copyright or other proprietary rights
 * other than those specified in the applicable license is granted.
 */

/**

var modAdmin = require('admin');

**/

var projectPath = Folder("/PROJECT/"); 
var pathModel = projectPath.path + "datas/data0/Model.waModel";
var pathData = projectPath.path + "datas/data0/data.waData";

function copyModelnData(pathModel,pathData,pathCopy) {
	var dataFile = new File(pathData);
	var modelFile = new File(pathModel); 
	dataFile.copyTo(pathCopy + "data.waData",true); 
	modelFile.copyTo(pathCopy + "Model.waModel",true);
};

function updatedDataFolder(maintenanceTypeFolder) {

	var projectFolder,
		updatedDataFolder, 
		dataN;

	projectFolder = Folder("/PROJECT/"); 

	if (projectFolder.exists) {
		
		updatedDataFolder = Folder(projectFolder.path + maintenanceTypeFolder + "/dataUpdated/");
		dataN =  Folder(projectFolder.path + maintenanceTypeFolder + "/dataUpdated/data0/");
		
		if (updatedDataFolder.exists) {
		
			console.log("Ok, the folder dataUpdated exist"); 
			dataN.create();
			
		} else {

			updatedDataFolder.create();
			dataN.create();
			
		}

	} else {
		//No project
	}

};


function CloseSolutionTest() {
//Create connection WebSocket
//modAdmin.closeSolution();
//onMessage : get the jobState, solution Name if good - ok

/**
var connection = new WebSocket("ws://" + httpServer.ipAddress + ":" + httpServer.port + "/remote_admin_ws/");

modAdmin.closeSolution();
	connection.onmessage = function (e) {	
		console.log(e.data);
	};
**/

}

function openSolutionTest(pathSolution) {
//modAdmin.openSolution(pathSolution,"none");

/**
var connection = new WebSocket("ws://" + httpServer.ipAddress + ":" + httpServer.port + "/remote_admin_ws/");

modAdmin.openolution(pathSolution,"none");
	connection.onmessage = function (e) {	
		console.log(e.data);
	};
**/

}

function count() {
	var counter = 0;
	for (var p in this) if (this.hasOwnProperty(p))++counter;
	return counter;
}

var testCase = {
	name: "test API DataStore Maintenance Methods CompactDataStore",
	_should: {
		error: {},
		ignore: {
		}
	},
	/*
	 * Sets up data that is needed by each test.
	 */
	setUp: function() {
					
		//var modAdmin = require("admin"); 

		if (os.isWindows) {
			//Win Stuff 
		} else if (os.isLinux) {
			//Linux Stuff   
		} else {
			//MAC Stuff
		}
	},
	/*
	 * Cleans up everything that was created by setUp().
	 */
	tearDown: function()
	{
		
		//Remove all dataUpdated Folder
		var dataUpdated,
			projectFolder,
			iMaintenanceType,
			maintenanceType; 

		projectFolder = Folder("/PROJECT/");
		maintenanceType = ["compactDataStore","repairDataStore","verifyDataStore"];

		for (iMaintenanceType = 0; iMaintenanceType < maintenanceType.length; ++iMaintenanceType)
		{
			dataUpdated = Folder(projectFolder.path + maintenanceType[iMaintenanceType] + "/dataUpdated/"); 

			if (dataUpdated.exists)
				try {
					dataUpdated.remove();
				} catch (e) { 
					console.log(e.toString());
				}
			else
				console.log("Folder doesn't exist.");
		}
	},
	/*
	 *
	 * Test methods for API SSJS DataStore Maintenance Methods CompactDataStore
	 *
	 */

					//	**-- compactDataStore --**

	// 93 --**-- Method compactDataStore :
	testDataStoreMaintenanceMethods_methodCompactDataStoreWorks_93:function() { 	
		var maintenanceTypeFolder = "compactDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	dataUpdated = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/compactedData93.waData");
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {};
		var result = compactDataStore(modelFile0,modelData0,options,dataUpdated);
	Y.Assert.isBoolean(result, "Method compactDataStore doesn't return a Boolean");
	},
	// 94 --**-- Method compactDataStore :
	testDataStoreMaintenanceMethods_methodCompactDataStoreParamModel_94:function() {
		var	maintenanceTypeFolder = "compactDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);		
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	dataUpdated = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/compactedData94.wData");
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {};
			// empty object {} return false?
		var result = compactDataStore(modelFile0,modelData0,options,dataUpdated);
	Y.Assert.areSame(true,result, "Method compactDataStore doesn't work");
	Y.Assert.isObject(modelFile0, "Method compactDataStore : The Model file isn't an object");
	},
	// 95 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreParamData_95:function() {
		var maintenanceTypeFolder = "compactDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	dataUpdated = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/compactedData95.wData");
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {};
			// empty object {} return false?
		var result = compactDataStore(modelFile0,modelData0,options,dataUpdated);
	Y.Assert.areSame(true,result, "Method compactDataStore doesn't work");
	Y.Assert.isObject(modelData0, "Method compactDataStore : The Data file isn't an object");
	},
	// 96  --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreParamOptions_96:function() {	
		var	maintenanceTypeFolder = "compactDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	dataUpdated = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/compactedData96.wData");
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {};
			// empty object {} return false?

		var result = compactDataStore(modelFile0,modelData0,options,dataUpdated);
	Y.Assert.areSame(true,result, "Method compactDataStore doesn't work");
	Y.Assert.isObject(options, "Method compactDataStore : The option isn't an object");
	},
	// 97 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackOpenProgressExist_94:function() { 		
	},
	// 98 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackOpenProgressReturn_95:function() { 		
	},
	// 99 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackOpenProgressTitleParam_96:function() { 		
	},
	// 100 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackOpenProgressMaxElementsParam_97:function() { 		
	},	
	// 101 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackCloseProgressExist_98:function() { 		
	},
	// 102 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackCloseProgressReturn_99:function() { 		
	},
	// 103 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackProgressExist_100:function() { 		
	},
	// 104 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackProgressReturn_101:function() { 		
	},
	// 105 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackProgressCurElementParam_102:function() { 		
	},
	// 106 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackProgressMaxElementsParam_103:function() { 		
	},
	// 107 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackSetProgressTitleExist_104:function() { 		
	},
	// 108 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackSetProgressTitleReturn_105:function() { 		
	},
	// 109 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackSetProgressTitleTitleParam_106:function() { 		
	},
	// 110 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackAddProblemExist_107:function() { 		
	},
	// 111 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackAddProblemReturn_108:function() { 		
	},
	// 112 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackAddProblemParam_109:function() { 		
	},
	// 113 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackAddProblemParamObjectPropertiesErrorText_110:function() { 		
	},
	// 114 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackAddProblemParamObjectPropertiesErrorNumber_111:function() { 		
	},
	// 115 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackAddProblemParamObjectPropertiesErrorType_112:function() { 		
	},
	// 116 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackAddProblemParamObjectPropertiesErrorLevel_113:function() { 		
	},
	// 117 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackAddProblemParamObjectPropertiesErrorLevel1_114:function() { 		
	},
	// 118 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackAddProblemParamObjectPropertiesErrorLevel2_115:function() { 		
	},
	// 119 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreCallBackAddProblemParamObjectPropertiesErrorLevel3_116:function() { 		
	},
	// 120 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreNoError_117:function() { 		
	},
	// 121 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreVerifyNCheckDataNumberForEachDBtest_118:function() { 		
	},
	// 122 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreNoRegularError_119:function() { 		
	},
	// 123 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreVerifyNCheckDataNumberForEachDBtest_120:function() { 		
	},
	// 124 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreNoFatalError_121:function() { 		
	},
	// 125 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreVerifyNCheckDataNumberForEachDBtest_122:function() { 		
	},
	// 126 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreNoWarning_123:function() { 		
	},
	// 127 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreVerifyNCheckDataNumberForEachDBtest_124:function() { 		
	},
	// 128 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreError_125:function() { 		
	},
	// 129 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreVerifyNCheckDataNumberForEachDBtest_126:function() { 		
	},
	// 130 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreRegularError_127:function() { 		
	},
	// 131 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreVerifyNCheckDataNumberForEachDBtest_128:function() { 		
	},
	// 132 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreFatalError_129:function() { 		
	},
	// 133 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreVerifyNCheckDataNumberForEachDBtest_130:function() { 		
	},
	// 134 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreWarningError_131:function() { 		
	},
	// 135 --**-- Method compactDataStore : 
	testDataStoreMaintenanceMethods_methodCompactDataStoreVerifyNCheckDataNumberForEachDBtest_132:function() { 		
	}
	
};
/*
    //create the console
    (new Y.Test.Console({
        newestOnTop : false,
        filters: {
            pass: true,
            fail: true
        }
    })).render('#testLogger');

    Y.Test.Runner.add(Y.example.test.ExampleSuite);

    //run the tests
    Y.Test.Runner.run();
    */
if (typeof dontRequireUnitTest === 'undefined') {
	require("unitTest").run(testCase).getReport();
}
