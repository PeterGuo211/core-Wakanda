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
 * @author Ouissam
 */
 
var testCase = {
	
		name: "Local Datasource",
		
		_should: {
            ignore: {

            }
        },
		
		/**
 		 * SD-00 Local DataSource class exists
 		 */
   	 	testDataSourceVarClassExists: function () {
			Y.Assert.areNotSame("undefined", typeof WAF.DataSourceVar);  
			Y.Assert.areSame("function", typeof WAF.DataSourceVar);
    	},
	
		/**
 		 * SD-00 getDataClass method exists
 		 */
		testLocalSourceGetDataClassExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.ArrayDS.getDataClass);
			Y.Assert.areSame("function", typeof source.ArrayDS.getDataClass);
			Y.Assert.areNotSame("undefined", typeof source.VariableDS.getDataClass);
			Y.Assert.areSame("function", typeof source.VariableDS.getDataClass);
		},

		/**
 		 * SD-00 getDataClass method busniess logic
 		 */
		testLocalSourceGetDataClassLogic : function(){		
			//method call for a datasource of type array
			var arrayDataClass = source.ArrayDS.getDataClass();

			//returned object should be well defined
			Y.Assert.areNotSame("undefined", typeof arrayDataClass);
			Y.Assert.areSame("object", typeof arrayDataClass);
			Y.Assert.areNotSame(null, arrayDataClass,  "Returned DataClass should not be null");

			//dataClass should have the array structure			
			Y.Assert.areSame(true, (typeof arrayDataClass.name != "undefined")&&(typeof arrayDataClass.pop != "undefined"), "dataClass should have the array structure");

			//method call for a datasource of type variable
			var varDataClass = source.VariableDS.getDataClass();

			//returned object should be well defined
			Y.Assert.areNotSame("undefined", typeof varDataClass);
			Y.Assert.areSame("object", typeof varDataClass);
			Y.Assert.areNotSame(null, varDataClass,  "Returned DataClass should not be null");

			//dataClass should have the variable structure	
			Y.Assert.areSame(true, (typeof arrayDataClass.name != "undefined"), "dataClass should have the variable structure");
		},

		/**
 		 * SD-00 getDataClass method exists
 		 */
		testLocalSourceGetClassTitleExists : function(){
			//array
			Y.Assert.areNotSame("undefined", typeof source.VariableDS.getClassTitle);
			Y.Assert.areSame("function", typeof source.VariableDS.getClassTitle);

			//variable
			Y.Assert.areNotSame("undefined", typeof source.VariableDS.getClassTitle);
			Y.Assert.areSame("function", typeof source.VariableDS.getClassTitle);
		},

		/**
 		 * SD-00 getAttributeNames method busniess logic
 		 */
		testLocalSourceGetClassTitleLogic : function(){
			//array
			Y.Assert.areSame("arrayDS", source.ArrayDS.getClassTitle(), "Should return the name of the bound array");	

			//variable
			Y.Assert.areSame("window", source.VariableDS.getClassTitle(), "Should return 'window' as it is a global object");	
		},

		/**
 		 * SD-00 getAttributeNames method exists
 		 */
		testLocalSourceGetAttributeNamesExists : function(){
			//array
			Y.Assert.areNotSame("undefined", typeof source.ArrayDS.getAttributeNames);
			Y.Assert.areSame("function", typeof source.ArrayDS.getAttributeNames);

			//variable
			Y.Assert.areNotSame("undefined", typeof source.VariableDS.getAttributeNames);
			Y.Assert.areSame("function", typeof source.VariableDS.getAttributeNames);
		},

		/**
 		 * SD-00 getAttributeNames method busniess logic
 		 */
		testLocalSourceGetAttributeNamesLogic : function(){
			//array
			var att = source.ArrayDS.getAttributeNames()
			Y.Assert.areNotSame("undefined", typeof att);
			Y.Assert.isArray(att);
			Y.ArrayAssert.itemsAreSame(["name", "pop"], att);		

			//variable
			att = source.VariableDS.getAttributeNames()
			Y.Assert.areNotSame("undefined", typeof att);
			Y.Assert.isArray(att);
			Y.ArrayAssert.itemsAreSame(["variable"], att);	
		},

		/**
 		 * SD-00 getClassAttributeByName method exists
 		 */
		testLocalSourceGetClassAttributeByNameExists : function(){
			//array
			Y.Assert.areNotSame("undefined", typeof source.ArrayDS.getClassAttributeByName);
			Y.Assert.areSame("function", typeof source.ArrayDS.getClassAttributeByName);

			//variable
			Y.Assert.areNotSame("undefined", typeof source.VariableDS.getClassAttributeByName);
			Y.Assert.areSame("function", typeof source.VariableDS.getClassAttributeByName);
		},

		/**
 		 * SD-00 getClassAttributeByName method busniess logic
 		 */
		testLocalSourceGetClassAttributeByNameLogic : function(){
			var attribute = source.ArrayDS.getClassAttributeByName("name");

			//existance
			Y.Assert.areNotSame("undefined", typeof attribute);
			Y.Assert.areSame("object", typeof attribute);

			//content
			Y.Assert.areSame("name", attribute.name);	
			Y.Assert.areSame("string", attribute.type);
			Y.Assert.areSame("storage", attribute.kind);	
		},

		/**
 		 * SD-00 addNewElement method exists
 		 */
		testLocalSourceAddNewElementExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.ArrayDS.addNewElement);
			Y.Assert.areSame("function", typeof source.ArrayDS.addNewElement);
		},

		/**
 		 * SD-00 addNewElement method busniess logic
 		 */
		testLocalSourceAddNewElementLogic: function () {
			var testRunner = this;
			
			//Get the datasource length before method call
			var oldLength = source.ArrayDS.length ;

			// add onCurrentElementChange event handler
			var onCurrentElementChangeFlag = false ;
			var onCurrentElementChangeHandler = function onCurrentElementChangeHandler(event){
				onCurrentElementChangeFlag = true ;
			}
			source.ArrayDS.addListener("onCurrentElementChange", onCurrentElementChangeHandler);

			// add onCollectionChange event handler
			var onCollectionChangeFlag = false ;
			var onCollectionChangeHandler = function onCollectionChangeHandler(event){
				// console.log ("onCollectionChange Event Handler : " + event);
				onCollectionChangeFlag = true ;
			}
			source.ArrayDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//call the method
			source.ArrayDS.addNewElement();

			window.setTimeout(function () {
				testRunner.resume(function(){
					//length should be incremented
					var newLength = source.ArrayDS.length ;
					Y.Assert.areSame(newLength, oldLength + 1);
		
					//New flag should be set to true
					Y.Assert.areSame(true, source.ArrayDS.isNewElement(), "New flag should be set to true");
		
					//onCollectionChange event should occur
					Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");
					
					//onCurrentElementChange event should occur
					Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event did not occur !");
				});
			}, 500);
			testRunner.wait();
		},

		/**
 		 * SD-00 save method exists
 		 */
		testLocalSourceSaveExists: function () {
			//array
			Y.Assert.areNotSame("undefined", typeof source.ArrayDS.save);
			Y.Assert.areSame("function", typeof source.ArrayDS.save);

			//variable
			Y.Assert.areNotSame("undefined", typeof source.VariableDS.save);
			Y.Assert.areSame("function", typeof source.VariableDS.save);
		},


		/**
 		 * SD-00 save method busniess logic
 		 */
		/*testLocalSourceSaveLogicUpdateUsingPropertyAccess: function () {
			//
		},*/

		
		/**
 		 * SD-00 sync method exists
 		 */
		testLocalSourceSyncExists: function () {
			//array
			Y.Assert.areNotSame("undefined", typeof source.ArrayDS.sync);
			Y.Assert.areSame("function", typeof source.ArrayDS.sync);

			//variable
			Y.Assert.areNotSame("undefined", typeof source.VariableDS.sync);
			Y.Assert.areSame("function", typeof source.VariableDS.sync);
		},  

		/**
 		 * SD-00 sync method busniess logic (array)
 		 */
		testArrayLocalSourceSyncLogic: function () {
			var testRunner = this;
			
			//position of the element to update
			var pos = 2;

			//point the element in the datasource
			source.ArrayDS.select(pos);

			//Edit the choosen element from the source array
			window["arrayDS"][pos].name = "Tokyo";
			window["arrayDS"][pos].pop = 37730064 ;	    

			//the corresponding element in the source data must remain unchanged
			Y.Assert.areNotSame("Tokyo", source.ArrayDS.name,"the corresponding element in the source data must remain intact");
			Y.Assert.areNotSame(37730064, source.ArrayDS.pop,"the corresponding element in the source data must remain intact");

			//call sync method
			source.ArrayDS.sync();

			window.setTimeout(function () {
				testRunner.resume(function(){
					//the corresponding element in the source data should be updated
					Y.Assert.areSame("Tokyo", source.ArrayDS.name,"the corresponding element in the source data should be updated");
					Y.Assert.areSame(37730064, source.ArrayDS.pop,"the corresponding element in the source data should be updated");
				});
			}, 500);
			testRunner.wait();
		},

		/**
 		 * SD-00 sync method busniess logic (variable)
 		 */
		testVariableLocalSourceSyncLogic: function () {
			var testRunner = this;
			
			//get the variable value
			var value = window["variable"];

			//edit the variable
			window["variable"] = value + 1;

			//the datasource value should remain intact
			Y.Assert.areSame(value, source.VariableDS.variable, "the datasource value should remain intact");

			//call sync method
			source.VariableDS.sync();
			
			window.setTimeout(function () {
				testRunner.resume(function(){
					//the datasource value should be updated
					Y.Assert.areSame(value + 1, source.VariableDS.variable, "the datasource value should be updated");
				});
			}, 500);
			testRunner.wait();
		}
};