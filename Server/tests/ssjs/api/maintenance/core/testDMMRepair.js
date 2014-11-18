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
	name: "test API DataStore Maintenance Methods repairDataStore",
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
	 * Test methods for API SSJS DataStore Maintenance Methods Repair
	 *
	 */

					//	**-- repairDataStore --**

	// 136 --**-- Method repairDataStore :
	testDataStoreMaintenanceMethods_methodRepairDataStoreWorks_136:function() { 
		var	maintenanceTypeFolder = "repairDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	dataUpdated = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/repairedData136.waData");
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {};
			// empty object {} return false?
		var result = repairDataStore(modelFile0,modelData0,options,dataUpdated);
	Y.Assert.isBoolean(result, "Method repairDataStore doesn't return a Boolean");

	},
	// 137 --**-- Method repairDataStore :
	testDataStoreMaintenanceMethods_methodRepairDataStoreParamModel_137:function() {	
		var	maintenanceTypeFolder = "repairDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);	
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	dataUpdated = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/repairedData137.wData");
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {};
		var	result = repairDataStore(modelFile0,modelData0,options,dataUpdated);
	Y.Assert.areSame(true,result, "Method repairDataStore doesn't work");
	Y.Assert.isObject(modelFile0, "Method repairDataStore : The Model file isn't an object");
	},
	// 138 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreParamData_138:function() {
		var	maintenanceTypeFolder = "repairDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	dataUpdated = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/repairedData138.wData");
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {};
			// empty object {} return false?
		var result = repairDataStore(modelFile0,modelData0,options,dataUpdated);
	Y.Assert.areSame(true,result, "Method repairDataStore doesn't work");
	Y.Assert.isObject(modelData0, "Method repairDataStore : The Data file isn't an object");
	},
	// 139  --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreParamOptions_139:function() {	
		var	maintenanceTypeFolder = "repairDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	dataUpdated = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/repairedData139.wData");
		var	modelFile0 = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel";
		var	modelData0 = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData";
		var	options = {};
			// empty object {} return false?
		var result = repairDataStore(modelFile0,modelData0,options,dataUpdated);
	Y.Assert.areSame(true,result, "Method repairDataStore doesn't work");
	Y.Assert.isObject(options, "Method repairDataStore : The option isn't an object");
	},
	// 140 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackOpenProgressExist_134:function() { 		
	},
	// 141 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackOpenProgressReturn_135:function() { 		
	},
	// 142 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackOpenProgressTitleParam_136:function() { 		
	},
	// 143 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackOpenProgressMaxElementsParam_137:function() { 		
	},	
	// 144 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackCloseProgressExist_136:function() { 		
	},
	// 145 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackCloseProgressReturn_137:function() { 		
	},
	// 146 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackProgressExist_138:function() { 		
	},
	// 147 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackProgressReturn_139:function() { 		
	},
	// 148 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackProgressCurElementParam_140:function() { 		
	},
	// 149 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackProgressMaxElementsParam_141:function() { 		
	},
	// 150 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackSetProgressTitleExist_142:function() { 		
	},
	// 151 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackSetProgressTitleReturn_143:function() { 		
	},
	// 152 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackSetProgressTitleTitleParam_144:function() { 		
	},
	// 153 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackAddProblemExist_145:function() { 		
	},
	// 154 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackAddProblemReturn_146:function() { 		
	},
	// 155 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackAddProblemParam_147:function() { 		
	},
	// 156 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackAddProblemParamObjectPropertiesErrorText_148:function() { 		
	},
	// 157 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackAddProblemParamObjectPropertiesErrorNumber_149:function() { 		
	},
	// 158 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackAddProblemParamObjectPropertiesErrorType_150:function() { 		
	},
	// 159 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackAddProblemParamObjectPropertiesErrorLevel_151:function() { 		
	},
	// 160 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackAddProblemParamObjectPropertiesErrorLevel1_152:function() { 		
	},
	// 161 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackAddProblemParamObjectPropertiesErrorLevel2_153:function() { 		
	},
	// 162 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreCallBackAddProblemParamObjectPropertiesErrorLevel3_154:function() { 		
	},
	// 163 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreNoError_155:function() { 		
	},
	// 164 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreVerifyNCheckDataNumberForEachDBtest_156:function() { 		
	},
	// 165 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreNoRegularError_157:function() { 		
	},
	// 166 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreVerifyNCheckDataNumberForEachDBtest_158:function() { 		
	},
	// 167 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreNoFatalError_159:function() { 		
	},
	// 168 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreVerifyNCheckDataNumberForEachDBtest_160:function() { 		
	},
	// 169 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreNoWarning_161:function() { 		
	},
	// 170 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreVerifyNCheckDataNumberForEachDBtest_162:function() { 		
	},
	// 171 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreError_163:function() { 		
	},
	// 172 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreVerifyNCheckDataNumberForEachDBtest_164:function() { 		
	},
	// 173 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreRegularError_165:function() { 		
	},
	// 174 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreVerifyNCheckDataNumberForEachDBtest_85:function() { 		
	},
	// 175 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreFatalError_86:function() { 		
	},
	// 176 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreVerifyNCheckDataNumberForEachDBtest_87:function() { 		
	},
	// 177 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreWarningError_88:function() { 		
	},
	// 178 --**-- Method repairDataStore : 
	testDataStoreMaintenanceMethods_methodRepairDataStoreVerifyNCheckDataNumberForEachDBtest_89:function() { 		
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
