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

//** Info Env Variable
var unitTest = require('unitTest');
var env = unitTest.getenv();
console.log(env);
env;
var info = env.toString();
console.log("Info : " + " " + info);

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

var testCase = {
	name: "test API DataStore Maintenance Methods",
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
	 * Test methods for API SSJS DataStore Maintenance Methods 
	 *
	 */
	// 0 --**-- Method RepairDataStore Exist
	testDataStoreMaintenanceMethods_methodRepairDataStoreExist_0: function() {
		var result = repairDataStore;
		Y.Assert.isTypeOf("function", result, "RepairDataStore doesn't exist");
	},
	// 1 --**-- Method CompactDataStore Exist 
	testDataStoreMaintenanceMethods_methodCompactDataStoreExist_1: function() {
		var result = compactDataStore;
		Y.Assert.isTypeOf("function", result, "CompactDataStore doesn't exist");
	},
	// 2 --**-- Method VerifyDatastore Exist
	testDataStoreMaintenanceMethods_methodVerifyDataStoreExist_2: function() {
		var result = verifyDataStore;
		Y.Assert.isTypeOf("function", result, "VerifyDataStore doesn't exist");
	},
	// 3 --**-- Method RepairDataStore Exist in application object
	testDataStoreMaintenanceMethods_methodRepairDataStoreApplicationExist_3: function() {
		var result = application.repairDataStore;
		Y.Assert.isTypeOf("function", result, "RepairDataStore doesn't exist as a global object");
	},
	// 4 --**-- Method CompactDataStore Exist in application object
	testDataStoreMaintenanceMethods_methodCompactDataStoreApplicationExist_4: function() {
		var result = application.compactDataStore;
		Y.Assert.isTypeOf("function", result, "CompactDataStore doesn't exist as a global object");
	},
	// 5 --**-- Method VerifyDataStore Exist in application object
	testDataStoreMaintenanceMethods_methodVerifyDataStoreApplicationExist_5: function() {
		var result = application.verifyDataStore;
		Y.Assert.isTypeOf("function", result, "verifyDataStore doesn't exist as a global object");
	}, 
	// 6 --**-- Method RepairDataStore does not Exist in ds object
	testDataStoreMaintenanceMethods_methodRepairDataStoreDsExist_6: function() {
		var result = ds.repairDataStore;
		Y.Assert.isTypeOf("undefined", result, "RepairDataStore exist in the ds object");
	},
	// 7 --**-- Method CompactDataStore does not Exist in ds object
	testDataStoreMaintenanceMethods_methodCompactDataStoreDsExist_7: function() {
		var result = ds.compactDataStore;
		Y.Assert.isTypeOf("undefined", result, "CompactDataStore exist in the ds object");
	},
	// 8 --**-- Method VerifyDataStore does not Exist in ds object
	testDataStoreMaintenanceMethods_methodVerifyDataStoreDsExist_8: function() {
		var result = ds.verifyDataStore;
		Y.Assert.isTypeOf("undefined", result, "verifyDataStore exist in the ds object");
	},
	// 9 --**-- Method ds.verify Exist in ds object
	testDataStoreMaintenanceMethods_methodVerifyDsExist_9: function() {
		var result = ds.verify;
		Y.Assert.isTypeOf("function", result, "Method ds.verify doesn't exist in the ds object");
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
