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
		name: "Server DataSource and Metadata",
		
		setUp : function () {

    	},
		
		/**
 		 * SDMD-1 Server DataSource Class
 		 */
		testDataSourceClassExists: function () {
			Y.Assert.areNotSame("undefined", typeof WAF.DataSourceEm);  
			Y.Assert.areSame("function", typeof WAF.DataSourceEm);
		},

		/**
 		 * SDMD-2 Server DataSource Object
 		 */
		testDataSourceObjectExists: function () {
			var testRunner = this;
			window.setTimeout(function () {
				testRunner.resume(function(){
					Y.Assert.areNotSame("undefined", typeof source.CitiesDS, "dataSource should be defined");  
					Y.Assert.areSame("object", typeof source.CitiesDS, "dataSource should be an object");
					Y.Assert.areSame(true, source.CitiesDS instanceof WAF.DataSourceEm, "dataSource should be an instance of WAF.DataSourceEm" );
				});
			}, 1000);
			testRunner.wait(2000);
		},
		
		/**
 		 * SDMD-3.1 getAttribute method exists
 		 */
		testGetAttributeExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getAttribute, "getAttribute() should be defined");
			Y.Assert.areSame("function", typeof source.CitiesDS.getAttribute, "getAttribute() should be a function");
		},

		/**
 		 * SDMD-3.2 getAttribute method returns
 		 */
		testGetAttributeReturns: function () {
			var attribute= source.CitiesDS.getAttribute("name") ;
			Y.Assert.areNotSame("undefined", typeof attribute, "attribute should be defined");
			Y.Assert.areSame("object", typeof attribute, "attribute should be an object");

			var keys = [];
           	for (var key in attribute) {
                keys.push(key);
           	}
           	Y.ArrayAssert.containsItems(["isFirstLevel", "isVarAtt", "kind", 
           								"dataClassAtt", "simple", "type"], keys);
		},
		
		/**
 		 * SDMD-4.1 getAttributeNames method exists
 		 */
		testGetAttributeNamesExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getAttributeNames);
			Y.Assert.areSame("function", typeof source.CitiesDS.getAttributeNames);
		},

		/**
 		 * SDMD-4.2 getAttributeNames method business logic
 		 */
		testGetAttributeNamesLogic : function(){
			var attArray = source.CitiesDS.getAttributeNames()
			Y.Assert.areNotSame("undefined", typeof attArray);
			Y.Assert.isArray(attArray);
			Y.ArrayAssert.itemsAreSame(["ID", "name", "pop", "companies"], attArray);		
		},
		
				/**
 		 * SDMD-5.1 getClassAttributeByName method exists
 		 */
		testGetClassAttributeByNameExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getClassAttributeByName);
			Y.Assert.areSame("function", typeof source.CitiesDS.getClassAttributeByName);
		},

		/**
 		 * SDMD-5.2 getClassAttributeByName method business logic
 		 */
		testGetClassAttributeByNameLogic : function(){
			var attribute = source.CitiesDS.getClassAttributeByName("name");

			//existance
			Y.Assert.areNotSame("undefined", typeof attribute);
			Y.Assert.areSame("object", typeof attribute);
			//Y.Assert.areSame(true, attribute instanceof WAF.EntityAttributeSimple, "attribute should be an instance of WAF.EntityAttributeSimple");

			//content
			Y.Assert.areSame("name", attribute.name);	
			Y.Assert.areSame("string", attribute.type);
			Y.Assert.areSame("public", attribute.scope);
			Y.Assert.areSame(true, attribute.simple);
			Y.Assert.areSame(false, attribute.related);
			Y.Assert.areSame("storage", attribute.kind);	
		},
		
		/**
 		 * SDMD-6.1 getClassTitle method exists
 		 */
		testGetClassTitleExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getClassTitle);
			Y.Assert.areSame("function", typeof source.CitiesDS.getClassTitle);
		},

		/**
 		 * SDMD-6.2 getClassTitle method business logic
 		 */
		testGetClassTitleLogic : function(){
			Y.Assert.areSame("City", source.CitiesDS.getClassTitle());		
		},
		
		/**
 		 * SDMD-7.1 getDataClass method exists
 		 */
		testGetDataClassExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getDataClass);
			Y.Assert.areSame("function", typeof source.CitiesDS.getDataClass);
		},

		/**
 		 * SDMD-7.2 getDataClass method business logic
 		 */
		testGetDataClassLogic : function(){		
			//method call
			var dataClass = source.CitiesDS.getDataClass();

			//dataClass object should be well defined
			Y.Assert.areNotSame("undefined", typeof dataClass);
			Y.Assert.areSame("object", typeof dataClass);

			//dataClass name should be Cities
			Y.Assert.areSame("City", dataClass.getName());

		},
		
		/**
 		 * SDMD-8.1 getID method returns
 		 */
		testSourceGetIDExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getID);
			Y.Assert.areSame("function", typeof source.CitiesDS.getID);
		},

		/**
 		 * SDMD-8.2 getID method business logic
 		 */
		testSourceGetIDLogic: function () {
			Y.Assert.areSame("CitiesDS", source.CitiesDS.getID());
		}
};