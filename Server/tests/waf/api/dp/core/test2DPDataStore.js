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
 * @author Najib
 */
var testCase = {
		name : "DataStore",

		/**
		 * DS-02. test of WAF.DataStore function exists
		 */
		testWAFDataStoreExists : function() {
			Y.Assert.areNotSame("undefined", typeof WAF.DataStore,"WAF.DataStore is undefined");
			Y.Assert.areSame("function", typeof WAF.DataStore,"WAF.DataStore is not a function");
		},

		/**
		 * DS-03. test of method getDataClass exists
		 */
		testDSGetDataClassExists : function() {
			Y.Assert.areNotSame("undefined", typeof ds.getDataClass,"ds.getDataClass is undefined");
			Y.Assert.areSame("function", typeof ds.getDataClass,"ds.getDataClass is not a function");
		},

		/**
		 * DS-04. test of method getDataClass logic
		 */
		testDSGetDataClassLogic : function() {
			Y.Assert.areSame("object", typeof ds.getDataClass("City"),"ds.getDataClass not return an object");
			Y.Assert.areSame("object", typeof ds.getDataClass("Company"),"ds.getDataClass not return an object");
			Y.Assert.areSame("object", typeof ds.getDataClass("Emp"),"ds.getDataClass not return an object");
		},

		/**
		 * DS-05. test of method getDataClasses exists
		 */
		testDSGetDataClassesExists : function() {
			Y.Assert.areNotSame("undefined", typeof ds.getDataClasses,"ds.getDataClasses is undefined");
			Y.Assert.areSame("function", typeof ds.getDataClasses,"ds.getDataClasses is not a function");
		},

		/**
		 * DS-06. test of method getDataClasses logic
		 */
		testDSGetDataClassesLogic : function() {
			var classes = ds.getDataClasses();
			Y.Assert.areNotSame("undefined", typeof classes,"getDataClasses is undefined logic");
			Y.Assert.areSame("object", typeof classes,"getDataClasses not return an object");
			var tab = [];
			for ( var clas in ds.getDataClasses()) {
				tab.push(clas);
			}
			Y.ArrayAssert.containsItems([ "City", "Company", "Emp" ], tab);
		},




		/**
		 * DS-07. test of method WAF.DataStore.getCatalog exist
		 */
		testWAFDataStoreGetCatalogExists : function() {
			Y.Assert.areNotSame("undefined", typeof WAF.DataStore.getCatalog,"WAF.DataStore.getCatalog is undefined");
			Y.Assert.areSame("function", typeof WAF.DataStore.getCatalog,"WAF.DataStore.getCatalog is not a function");

		},

		/**
		 * DS-08. test of method WAF.DataStore.getCatalog logic
		 */
		testWAFDataStoreGetCatalogLogic : function() {
			/*var testRunner = this;
			WAF.DataStore.getCatalog({ app:"127.0.0.1:8082", catalog:"Foo",
				'onSuccess' : function(event) {
					testRunner.resume(function() {
                      console.log(event);
					});
				},
				'onError' : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("failed to get catalog of DataproviderTest");
					});
				}
			});
			testRunner.wait();*/
		}

};