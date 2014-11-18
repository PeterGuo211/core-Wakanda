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


function getUid() {		
	var s = [];
	var hexDigits = "0123456789ABCDEF";
	for (var j = 0; j < 32; j++) {
	s[j] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[12] = "4";  
	s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  
	var uuid = s.join("");
	return uuid;
}

var testCase = {
	name: "test API DataStore Maintenance Methods Verify",
	_should: {
		error: {},
		ignore: {
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackSetProgressTitleExist_21: true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackSetProgressTitleReturn_22:true, 
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackSetProgressTitleParam_23:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemExist_24:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemReturn_25:true, 
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParam_26:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorText_27:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorNumber_28:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorType_29:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorLevel_30:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorLevel1_31:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorLevel1_32:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorLevel1_33:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorLevel1_35:true,
			testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_35:true,
			testDataStoreMaintenanceMethods_methodVerifyDsNoRegularError_36:true,
			testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_37:true,
			testDataStoreMaintenanceMethods_methodVerifyDsNoFatalError_38:true,
			testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_39:true,
			testDataStoreMaintenanceMethods_methodVerifyDsNoWarning_40:true,
			testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_41:true,
			testDataStoreMaintenanceMethods_methodVerifyDsNoWarning_42:true,
			testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_43:true,
			testDataStoreMaintenanceMethods_methodVerifyDsRegularError_44:true,
			testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_45:true,
			testDataStoreMaintenanceMethods_methodVerifyDsRegularError_46:true,
			testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_47:true,
			testDataStoreMaintenanceMethods_methodVerifyDsWarningError_48:true,
			testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_49:true,
			testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackSetProgressTitleReturn_65:true, 
			testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackSetProgressTitleExist_64:true
		}
	},
	/*
	 * Sets up data that is needed by each test.
	 */
	setUp: function() {
					
		//Add all Data for a generic Solution
		var
			string,
			word, 
			uuid, 
			//obj,
			number,
			long64,
			long,
			image,
			duration,
			byte,
			date,
			bool,
			blob,
			nEntity,
			newEntity;


		for (nEntity = 0; nEntity < 50; ++nEntity) {
			
			newEntity = ds.Element.createEntity();
			
			word = 65535; 
			newEntity.word = word;

			uuid = getUid();
			newEntity.uuid = uuid;

			/*
				obj = {
				    "Great Expectations": "John",
				    "Pride and Prejudice": "Alice",
				    "Wuthering Heights": "Alice"
				};
			*/
			
			number = nEntity; 
			newEntity.number = number;

			long64 = 9223372036854775807;
			newEntity.long64 = long64;

			long = 2147483647; 
			newEntity.long = long;

			//Add Image

			var currentTime = new Date();
		 		hours = currentTime.getHours();
		  		minutes = currentTime.getMinutes();
				secondes = currentTime.getSeconds(); 
				millisecondes = currentTime.getMilliseconds(); 
				duration = hours + ":" + minutes;
			newEntity.duration = duration; 

			byte = 255;
			newEntity.byte = byte; 

			date = new Date();
			newEntity.date = date; 

			bool = true;
			newEntity.bool = bool;

			blob = new Blob(20, 88, "application/octet-stream");
			newEntity.blob = blob; 

			string = "Morbi non libero nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam blandit tristique porta. Aenean nec tristique purus. Morbi felis nulla, blandit at eleifend in, venenatis ut mi. Sed urna ipsum, fringilla mollis laoreet vel, tempus eget odio. Curabitur in tempor neque. Suspendisse dapibus, sem imperdiet elementum vulputate, felis libero tempor purus, in pharetra nisl lacus quis nulla. Pellentesque molestie nunc lacus. Vestibulum in aliquet sem. Suspendisse at libero sem, in consequat purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ";
			newEntity.string = string;
			
			newEntity.save();

		}

		var modAdmin = require("admin"); 

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

		//Remove all data
		ds.Element.drop();

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
	 * Test methods for API SSJS DataStore Maintenance Methods Verify
	 *
	 */

					//	**-- ds.verify --**

	// 10 --**-- Method ds.verify works well in ds Object
	testDataStoreMaintenanceMethods_methodVerifyDsWorks_10: function() {
		var result; 

		result = null;

		result = ds.verify();
		Y.Assert.isBoolean(result, "Method ds.verify doesn't return a Boolean");
	},
	// 11 --**-- Method ds.verify : CallBackOpenProgress exist 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackOpenProgressExist_11: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({openProgress: function()
				{
					result = ++incrementalValue;
				}

			});

		Y.Assert.isNumber(result, "Method ds.verify : CallBack openProgress doesn't exist");
	},
	// 12 --**-- Method ds.verify : CallBackOpenProgress must return an exact number of segments 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackOpenProgressReturn_12: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({openProgress: function()
				{
					result = ++incrementalValue;
				}

			});

		//19 Segments, confirm with log return ? I see 18 segments
		Y.Assert.areSame(19,result, "Method ds.verify : CallBack openProgress doesn't return an exact number of segments" + ' '  + result);
	},
	// 13 --**-- Method ds.verify : CallBackOpenProgress param Title is a string, example of title : Check bit tables for segment X
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackOpenProgressTitleParam_13: function() {
		var incrementalValue = 0;
		var result = ds.verify({openProgress: function(title,maxElements)
				{return (typeof title === 'string')}});
		Y.Assert.isTrue(result, "Method ds.verify : CallBack openProgress Param title isn't a string");
	},
	// 14 --**-- Method ds.verify : CallBackOpenProgress param maxElements is a Number, example of maxElements : X segment(s) (only Number displayed)
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackOpenProgressMaxElementsParam_14: function() {
		var incrementalValue = 0;
		var result = ds.verify({openProgress: function(title,maxElements)
				{return (typeof maxElements === 'number')}});
		Y.Assert.isTrue(result, "Method ds.verify : CallBack openProgress Param maxElements isn't a number");
	},
	// 15 --**-- Method ds.verify : CallBackCloseProgress exist 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackCloseProgressExist_15: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({closeProgress: function()
				{
					result = ++incrementalValue;
				}

			});

		Y.Assert.isNumber(result, "Method ds.verify : CallBack closeProgress doesn't exist");
	},
	// 16 --**-- Method ds.verify : CallBackCloseProgress must return an exact number of segments
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackCloseProgressReturn_16: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({closeProgress: function()
				{
					result = ++incrementalValue;
				}

			});

		//19 Segments, confirm with log return ? i see 18 segments
		Y.Assert.areSame(19,result, "Method ds.verify : CallBack closeProgress doesn't return an exact number of segments" + ' '  + result);
	},
	// 17 --**-- Method ds.verify : CallBackProgress exist 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackProgressExist_17: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({progress: function()
				{
					result = ++incrementalValue;
				}

			});
		Y.Assert.isNumber(result, "Method ds.verify : CallBack progress doesn't exist");
	},
	// 18 --**-- Method ds.verify : CallBackOpenProgress must return an exact number
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackProgressReturn_18: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({progress: function()
				{
					result = ++incrementalValue;
				}

			});

		//2104 Progress? 
		Y.Assert.areSame(173,result, "Method ds.verify : CallBack progress doesn't return an exact number" + ' '  + result);
	},
	// 19 --**-- Method ds.verify : CallBackProgress param curElement is a Number, example of curElement : X (number)
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackProgressCurElementParam_19: function() {
		var incrementalValue = 0;
		var result = ds.verify({progress: function(curElement,maxElements)
				{return (typeof curElement === 'number')}});
		Y.Assert.isTrue(result, "Method ds.verify : CallBack progress Param curElement isn't a number");
	},
	// 20 --**-- Method ds.verify : CallBackProgress param maxElements is a Number, example of maxElements :  X (number)
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackProgressMaxElementsParam_20: function() {
		var incrementalValue = 0;
		var result = ds.verify({progress: function(curElement,maxElements)
				{return (typeof maxElements === 'number')}});
		Y.Assert.isTrue(result, "Method ds.verify : CallBack progress Param maxElements isn't a number");
	},
	// 21 --**-- Method ds.verify : CallBackSetProgressTitle exist 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackSetProgressTitleExist_21: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({setProgressTitle: function()
				{
					result = ++incrementalValue;
				}

			});
		Y.Assert.isNumber(result, "Method ds.verify : CallBack setProgressTitle doesn't exist");
	},	
	// 22 --**-- Method ds.verify : CallBackSetProgressTitle exist 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackSetProgressTitleReturn_22: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({setProgressTitle: function()
				{
					result = ++incrementalValue;
				}

			});
		//19 Segments, confirm with log return ? i see 18 segments	
		Y.Assert.areSame(19,result, "Method ds.verify : CallBack setProgressTitle doesn't return an exact number" + ' ' + result);
	},	
	// 23 --**-- Method ds.verify : CallBackSetProgressTitle param title is a string, example of title :  N/A
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackSetProgressTitleParam_23: function() {
		var incrementalValue = 0;
		var result = ds.verify({setProgressTitle: function(title)
				{return (typeof title === 'string')}});
		Y.Assert.isTrue(result, "Method ds.verify : CallBack setProgressTitle Param title isn't a string");
	},
	// 24 --**-- Method ds.verify : CallBackAddProblem exist 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemExist_24: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({addProblem: function()
				{
					result = ++incrementalValue;
				}

			});
		Y.Assert.isNumber(result, "Method ds.verify : CallBack AddProblem doesn't exist");
	},	
	// 25 --**-- Method ds.verify : CallBackAddProblem exist 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemReturn_25: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({addProblem: function()
				{
					result = ++incrementalValue;
				}

			});
		//19 Segments, confirm with log return ? i see 18 segments	
		Y.Assert.areSame(19,result, "Method ds.verify : CallBack AddProblem doesn't return an exact number" + ' ' + result);
	},
	// 26 --**-- Method ds.verify : CallBackAddProblem param problem is an object, example of object :  N/A
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParam_26: function() {
		var incrementalValue = 0;
		var result = ds.verify({addProblem: function(problem)
				{return (typeof problem === 'object')}});
		Y.Assert.isTrue(result, "Method ds.verify : CallBack AddProblem Param problem isn't an object");
	},
	// 27 --**-- Method ds.verify : CallBackAddProblem param problem.ErrorText is a string, example of string :  N/A
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorText_27: function() {
		var incrementalValue = 0;
		var result = ds.verify({addProblem: function(problem)
				{return (typeof problem.ErrorText === 'string')}});
		Y.Assert.isTrue(result, "Method ds.verify : CallBack AddProblem Param problem.ErrorText isn't a string");
	},
	// 28 --**-- Method ds.verify : CallBackAddProblem param problem.ErrorNumber is a number, example of number :  N/A
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorNumber_28: function() {
		var incrementalValue = 0;
		var result = ds.verify({addProblem: function(problem)
				{return (typeof problem.ErrorNumber === 'number')}});
		Y.Assert.isTrue(result, "Method ds.verify : CallBack AddProblem Param problem.ErrorNumber isn't a number");
	},
	// 29 --**-- Method ds.verify : CallBackAddProblem param problem.ErrorType is a number, example of number :  N/A
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorType_29: function() {
		var incrementalValue = 0;
		var result = ds.verify({addProblem: function(problem)
				{return (typeof problem.ErrorType === 'number')}});
		Y.Assert.isTrue(result, "Method ds.verify : CallBack AddProblem Param problem.ErrorType isn't a number");
	},
	// 30 --**-- Method ds.verify : CallBackAddProblem param problem.ErrorLevel is a number, example of number :  1:Fatal error, 2:regular error, 3:warning
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorLevel_30: function() {
		var incrementalValue = 0;
		var result = ds.verify({addProblem: function(problem)
				{return (typeof problem.ErrorLevel === 'number')}});
		Y.Assert.isTrue(result, "Method ds.verify : CallBack AddProblem Param problem.ErrorLevel isn't a number");
	},
	// 31 --**-- Method ds.verify : CallBackAddProblem param problem.ErrorLevel : Level 1
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorLevel1_31: function() {		
	},
	// 32 --**-- Method ds.verify : CallBackAddProblem param problem.ErrorLevel : Level 2
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorLevel2_32: function() {		
	},
	// 33 --**-- Method ds.verify : CallBackAddProblem param problem.ErrorLevel : Level 3
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorLevel3_33: function() {		
	},
	// 34 --**-- Method ds.verify from ds object must generate no error from a data
	testDataStoreMaintenanceMethods_methodVerifyDsNoError_34: function() {
		//Synchronus ? 
		var nbproblems, 
			problems, 
			result;

		nbproblems = 0;
		problems = [];
		result = null;

			ds.verify({ addProblem: function(problem)
			{
				++nbproblems;
				problems.push(problem);
				
			}});

			result ="";

			if (nbproblems == 0) {

				result = "ok";
								
			} else {

				result = "damaged";
			    problems;

			}

		Y.Assert.areSame("ok",result, "Method ds.verify : We got problems when it shouldn't");
	}, 
	// 35 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_35: function() {		
		var myEntityCollection,
			result; 

	 	myEntityCollection = ds.Element.all();
	 	result = myEntityCollection.length; 

	 	Y.Assert.areSame(nEntity,result, "Method ds.verify no error with a clean data : The number of Entities aren't the same");

	},
	// 36 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsNoRegularError_36: function() {		
	},
	// 37 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_37: function() {
		var myEntityCollection,
			result; 

	 	myEntityCollection = ds.Element.all();
	 	result = myEntityCollection.length; 

	 	Y.Assert.areSame(nEntity,result, "Method ds.verify no regular error with a clean data : The number of Entities aren't the same");		
	},
	// 38 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsNoFatalError_38: function() {		
	},
	// 39 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_39: function() {
		var myEntityCollection,
			result; 

	 	myEntityCollection = ds.Element.all();
	 	result = myEntityCollection.length; 

	 	Y.Assert.areSame(nEntity,result, "Method ds.verify no fatal error with a clean data : The number of Entities aren't the same");		
	},
	// 40 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsNoWarning_40: function() {		
	},
	// 41 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_41: function() {
		var myEntityCollection,
			result; 

	 	myEntityCollection = ds.Element.all();
	 	result = myEntityCollection.length; 

	 	Y.Assert.areSame(nEntity,result, "Method ds.verify no warning error with a clean data : The number of Entities aren't the same");		
	},
	// 42 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsError_42: function() {		
	},
	// 43 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_43: function() {	
		var myEntityCollection,
			result; 

	 	myEntityCollection = ds.Element.all();
	 	result = myEntityCollection.length; 

	 	Y.Assert.areSame(nEntity,result, "Method ds.verify error with a clean data : The number of Entities aren't the same");	
	},
	// 44 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsRegularError_44: function() {		
	},
	// 45 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_45: function() {	
		var myEntityCollection,
			result; 

	 	myEntityCollection = ds.Element.all();
	 	result = myEntityCollection.length; 

	 	Y.Assert.areSame(nEntity,result, "Method ds.verify regular error with a clean data : The number of Entities aren't the same");	
	},
	// 46 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsFatalError_46: function() {		
	},
	// 47 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_47:function() { 
		var myEntityCollection,
			result; 

	 	myEntityCollection = ds.Element.all();
	 	result = myEntityCollection.length; 

	 	Y.Assert.areSame(nEntity,result, "Method ds.verify fatal error with a clean data : The number of Entities aren't the same");			
	},
	// 48 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsWarningError_48: function() {		
	},
	// 49 --**-- Method ds.verify : 
	testDataStoreMaintenanceMethods_methodVerifyDsVerifyNCheckDataNumberForEachDBtest_49:function() { 	
		var myEntityCollection,
			result; 

	 	myEntityCollection = ds.Element.all();
	 	result = myEntityCollection.length; 

	 	Y.Assert.areSame(nEntity,result, "Method ds.verify warning with a clean data : The number of Entities aren't the same");	
	},

						//	**-- verifyDataStore --**

	// 50 --**-- Method verifyDataStore :
	testDataStoreMaintenanceMethods_methodVerifyDataStoreWorks_50:function() { 
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/data0/data.waData");
		var options = {};
		var	result = verifyDataStore(modelFile0,modelData0,options);
	Y.Assert.isBoolean(result, "Method verifyDataStore doesn't return a Boolean");

	},
	// 51 --**-- Method verifyDataStore :
	testDataStoreMaintenanceMethods_methodVerifyDataStoreParamModel_51:function() {	
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var options = {};
		var result = verifyDataStore(modelFile0,modelData0,options);
	Y.Assert.areSame(true,result, "Method verifyDataStore doesn't work");
	Y.Assert.isObject(modelFile0, "Method verifyDataStore : The Model file isn't an object");

	},
	// 52 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreParamData_52:function() {
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {};
		var result = verifyDataStore(modelFile0,modelData0,options);
	Y.Assert.areSame(true,result, "Method verifyDataStore doesn't work");
	Y.Assert.isObject(modelData0, "Method verifyDataStore : The Data file isn't an object");
	},
	// 53  --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreParamOptions_53:function() {	
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var options = {};
		var result = verifyDataStore(modelFile0,modelData0,options);
	Y.Assert.areSame(true,result, "Method verifyDataStore doesn't work");
	Y.Assert.isObject(options, "Method verifyDataStore : The option isn't an object");
	},
	// 54 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackOpenProgressExist_54:function() { 		
		var	incrementalValue = 0; 
		var	result = null;
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {openProgress: function(){result = ++incrementalValue}};
		verifyDataStore(modelFile0,modelData0,options);
	Y.Assert.isNumber(result, "Method verifyDataStore : CallBack openProgress doesn't exist");
	},
	// 55 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackOpenProgressReturn_55:function() { 
		var	incrementalValue = 0; 
		var	result = null;
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {openProgress: function(){result = ++incrementalValue}};
		verifyDataStore(modelFile0,modelData0,options);
	//19 Segments, confirm with log return ? I see 18 segments
	Y.Assert.areSame(13,result, "Method verifyDataStore : CallBack openProgress doesn't return an exact number of segments" + ' '  + result);
	},
	// 56 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackOpenProgressTitleParam_56:function() { 	
		var	incrementalValue = 0; 
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {openProgress: function(title,maxElements){return (typeof title === 'string')}};
		var result = verifyDataStore(modelFile0,modelData0,options);
	Y.Assert.isTrue(result, "Method verifyDataStore : CallBack openProgress Param title isn't a string");
	},
	// 57 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackOpenProgressMaxElementsParam_57:function() { 	
		var	incrementalValue = 0; 
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {openProgress: function(title,maxElements){return (typeof maxElements === 'string')}};
		var result = verifyDataStore(modelFile0,modelData0,options);
	Y.Assert.isTrue(result, "Method verifyDataStore : CallBack openProgress Param maxElements isn't a number");	
	},
	// 58 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackCloseProgressExist_58:function() { 
		var	incrementalValue = 0; 
		var	result = null;
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {closeProgress: function(){result = ++incrementalValue}};
		verifyDataStore(modelFile0,modelData0,options);
	Y.Assert.isNumber(result, "Method verifyDataStore : CallBack closeProgress doesn't exist");	
	},
	// 59 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackCloseProgressReturn_59:function() { 	
		var	incrementalValue = 0; 
		var	result = null;
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {closeProgress: function(){result = ++incrementalValue}};
		verifyDataStore(modelFile0,modelData0,options);
	//19 Segments, confirm with log return ? I see 18 segments
	Y.Assert.areSame(13,result, "Method verifyDataStore : CallBack closeProgress doesn't return an exact number of segments" + ' '  + result);	
	},
	// 60 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackProgressExist_60:function() { 	
		var	incrementalValue = 0; 
		var	result = null;
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {progress: function(){result = ++incrementalValue}};
		verifyDataStore(modelFile0,modelData0,options);
	Y.Assert.isNumber(result, "Method verifyDataStore : CallBack Progress doesn't exist");	
	},
	// 61 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackProgressReturn_61:function() { 	
		var	incrementalValue = 0; 
		var	result = null;
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {progress: function(){result = ++incrementalValue}};
		verifyDataStore(modelFile0,modelData0,options);
	//2104 Progress? 
	Y.Assert.areSame(105,result, "Method ds.verify : CallBack progress doesn't return an exact number" + ' '  + result);
	},
	// 62 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackProgressCurElementParam_62:function() { 		
		var	incrementalValue = 0; 
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {progress: function(curElement,maxElements){return (typeof curElement === 'string')}};
		var result = verifyDataStore(modelFile0,modelData0,options);
	Y.Assert.isTrue(result, "Method verifyDataStore : CallBack Progress Param curElement isn't a string");	
	},
	// 63 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackProgressMaxElementsParam_63:function() { 		
		var	incrementalValue = 0; 
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {progress: function(curElement,maxElements){return (typeof maxElements != 'number')}};
		var result = verifyDataStore(modelFile0,modelData0,options);
	Y.Assert.isTrue(result, "Method verifyDataStore : CallBack Progress Param maxElements isn't a number");	
	},
	// 64 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackSetProgressTitleExist_64:function() { 		
		var	incrementalValue = 0; 
		var	result = null;
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {setProgressTitle: function(){result = ++incrementalValue}};
		verifyDataStore(modelFile0,modelData0,options);
	Y.Assert.isNumber(result, "Method verifyDataStore : CallBack SetProgressTitle doesn't exist");	
	},
	// 65 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackSetProgressTitleReturn_65:function() { 
		var	incrementalValue = 0; 
		var	result = null;
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var options = {setProgressTitle: function(){result = ++incrementalValue}};
		verifyDataStore(modelFile0,modelData0,options);
	//19 Segments, confirm with log return ? I see 18 segments	
	Y.Assert.areSame(19,result, "Method verifyDataStore : CallBack setProgressTitle doesn't return an exact number" + ' ' + result);		
	},
	// 66 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackSetProgressTitleTitleParam_66:function() { 		
		var	incrementalValue = 0; 
		var	maintenanceTypeFolder = "verifyDataStore";
		//Create the folder dataUpdated 
		updatedDataFolder(maintenanceTypeFolder);
		var pathCopy = projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/";
		copyModelnData(pathModel,pathData,pathCopy);
		var	modelFile0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/Model.waModel");
		var	modelData0 = File(projectPath.path + maintenanceTypeFolder + "/dataUpdated/data0/data.waData");
		var	options = {progress: function(curElement,maxElements){return (typeof maxElements === 'number')}};
		var result = verifyDataStore(modelFile0,modelData0,options);
	Y.Assert.isTrue(result, "Method verifyDataStore : CallBack Progress Param maxElements isn't a number");	
	},
	// 67 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackAddProblemExist_67:function() { 		
	},
	// 68 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackAddProblemReturn_68:function() { 		
	},
	// 69 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackAddProblemParam_69:function() { 		
	},
	// 70 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackAddProblemParamObjectPropertiesErrorText_70:function() { 		
	},
	// 71 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackAddProblemParamObjectPropertiesErrorNumber_71:function() { 		
	},
	// 72 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackAddProblemParamObjectPropertiesErrorType_72:function() { 		
	},
	// 73 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackAddProblemParamObjectPropertiesErrorLevel_73:function() { 		
	},
	// 74 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackAddProblemParamObjectPropertiesErrorLevel1_74:function() { 		
	},
	// 75 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackAddProblemParamObjectPropertiesErrorLevel2_75:function() { 		
	},
	// 76 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreCallBackAddProblemParamObjectPropertiesErrorLevel3_76:function() { 		
	},
	// 77 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreNoError_77:function() { 		
	},
	// 78 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreVerifyNCheckDataNumberForEachDBtest_78:function() { 		
	},
	// 79 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreNoRegularError_79:function() { 		
	},
	// 80 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreVerifyNCheckDataNumberForEachDBtest_80:function() { 		
	},
	// 81 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreNoFatalError_81:function() { 		
	},
	// 82 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreVerifyNCheckDataNumberForEachDBtest_82:function() { 		
	},
	// 83 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreNoWarning_83:function() { 		
	},
	// 84 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreVerifyNCheckDataNumberForEachDBtest_84:function() { 		
	},
	// 85 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreError_85:function() { 		
	},
	// 86 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreVerifyNCheckDataNumberForEachDBtest_86:function() { 		
	},
	// 87 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreRegularError_87:function() { 		
	},
	// 88 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreVerifyNCheckDataNumberForEachDBtest_88:function() { 		
	},
	// 89 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreFatalError_89:function() { 		
	},
	// 90 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreVerifyNCheckDataNumberForEachDBtest_90:function() { 		
	},
	// 91 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreWarningError_91:function() { 		
	},
	// 92 --**-- Method verifyDataStore : 
	testDataStoreMaintenanceMethods_methodVerifyDataStoreVerifyNCheckDataNumberForEachDBtest_92:function() { 		
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
