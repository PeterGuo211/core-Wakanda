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
		name: "Server DataSource and Events management",
		
		_should: {
            ignore: {
            }
        },
		
		/**
 		 * SDME-1.1 addListener method exists
 		 */
		testAddListenerExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.addListener);
			Y.Assert.areSame("function", typeof source.CitiesDS.addListener);
		},

		/**
 		 * SDME-1.2 addListener method logic
 		 */
		testAddListenerGeneralLogic1: function () {
			var testRunner = this;
			
			// test of all event
			var allFlag = false ;
			function allHandler(event){
				allFlag = true ;
			}
			source.CitiesDS.addListener("all", allHandler);
			source.CitiesDS.selectNext();
			window.setTimeout(function () {
				testRunner.resume(function(){
					Y.Assert.areSame(true, allFlag, "all event did not occur !");
				});
			}, 500);
			testRunner.wait();
			
		},
		
		testAddListenerGeneralLogic2: function () {
			var testRunner = this;
			
			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			function onCollectionChangeHandler(event){
				onCollectionChangeFlag = true ;
			}
			source.CitiesDS.addListener("onCollectionChange", onCollectionChangeHandler);
			source.CitiesDS.addNewElement();
			window.setTimeout(function () {
				testRunner.resume(function(){
					Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");
				});
			}, 500);
			testRunner.wait();
		},
		
		testAddListenerGeneralLogic3: function () {
			var testRunner = this;
			
			// test of onCurrentElementChange event
			var onCurrentElementChangeFlag = false ;
			function onCurrentElementChangeHandler(event){
				onCurrentElementChangeFlag = true ;
			}
			source.CitiesDS.addListener("onCurrentElementChange", onCurrentElementChangeHandler);
			source.CitiesDS.select(2);
			window.setTimeout(function () {
				testRunner.resume(function(){
					Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event did not occur !");	
				});
			}, 500);
			testRunner.wait();
		},
		
		testAddListenerGeneralLogic4: function () {
			var testRunner = this;
			
			// test of attributeChange event
			var onAttributeChangeFlag = false ;
			function onAttributeChangeHandler(event){
				onAttributeChangeFlag = true ;
			}
			source.CitiesDS.addListener("onAttributeChange", onAttributeChangeHandler, {attributeName: "pop"});
			var pop = source.CitiesDS.pop ;
			//edit the pop attribute of the current entity
			source.CitiesDS.getAttribute("pop").setValue(pop + 1) ;
			//attribute change event should occur
			window.setTimeout(function () {
				testRunner.resume(function(){
					Y.Assert.areSame(true, onAttributeChangeFlag, "onAttributeChange event did not occur !");	
				});
			}, 500);
			testRunner.wait();
		},
		
		testAddListenerGeneralLogic5: function () {
			var testRunner = this;
			
			// test of cancelEntity event
			var onBeforeCurrentElementChangeFlag = false ;
			function onBeforeCurrentElementChangeHandler(event){
				onBeforeCurrentElementChangeFlag = true ;
			}
			source.CitiesDS.addListener("onBeforeCurrentElementChange", onBeforeCurrentElementChangeHandler);
			//move to next entity while the current was edited
			source.CitiesDS.selectNext();
			//cancel entity event should occur
			window.setTimeout(function () {
				testRunner.resume(function(){
					Y.Assert.areSame(true, onBeforeCurrentElementChangeFlag, "onBeforeCurrentElementChange event did not occur !");	
				});
			}, 500);
			testRunner.wait();
		},
				
		/**
 		 * SDME-2.1 dispatch method exists
 		 */
		testSourceDispatchExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.dispatch);
			Y.Assert.areSame("function", typeof source.CitiesDS.dispatch);
		},

		/**
 		 * SDME-2.2 dispatch method business logic
 		 */ 		 
 		testSourceDispatchLogic1: function () {
			var testRunner = this;
			
			// test of all event
			var allFlag = false ;
			function allHandler(event){
				allFlag = true ;
			}
			source.CitiesDS.addListener("all", allHandler);
			//dispatch
			source.CitiesDS.dispatch("all");
			//all event should occur
			window.setTimeout(function () {
				testRunner.resume(function(){
					Y.Assert.areSame(true, allFlag, "all event did not occur !");	
				});
			}, 500);
			testRunner.wait();
		},

		testSourceDispatchLogic2: function () {
			var testRunner = this;
			
			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			function onCollectionChangeHandler(event){
				onCollectionChangeFlag = true ;
			}
			source.CitiesDS.addListener("onCollectionChange", onCollectionChangeHandler);
			//dispatch
			source.CitiesDS.dispatch("onCollectionChange");
			//onCollectionChange event should occur
			window.setTimeout(function () {
				testRunner.resume(function(){
					Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");
				});
			}, 500);
			testRunner.wait();
		},
		
		testSourceDispatchLogic3: function () {
			var testRunner = this;
			
			// test of onCurrentElementChange event
			var onCurrentElementChangeFlag = false ;
			function onCurrentElementChangeHandler(event){
				onCurrentElementChangeFlag = true ;
			}
			source.CitiesDS.addListener("onCurrentElementChange", onCurrentElementChangeHandler);
			//dispatch
			source.CitiesDS.dispatch("onCurrentElementChange");
			//onCurrentElementChange event should occur
			window.setTimeout(function () {
				testRunner.resume(function(){
					Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event did not occur !");
				});
			}, 500);
			testRunner.wait();
		},
		
		testSourceDispatchLogic4: function () {
			var testRunner = this;
			
			// test of attributeChange event
			var onAttributeChangeFlag = false ;
			function onAttributeChangeHandler(event){
				onAttributeChangeFlag = true ;
			}
			source.CitiesDS.addListener("onAttributeChange", onAttributeChangeHandler, {attributeName: "pop"});
			var pop = source.CitiesDS.pop ;
			//dispatch
			source.CitiesDS.dispatch("onAttributeChange", {attributeName: "pop"});
			//onAttributeChange event should occur
			window.setTimeout(function () {
				testRunner.resume(function(){
					Y.Assert.areSame(true, onAttributeChangeFlag, "onAttributeChange event did not occur !");
				});
			}, 500);
			testRunner.wait();
		},
		
		testSourceDispatchLogic5: function () {
			var testRunner = this;
			
			// test of cancelEntity event
			var onBeforeCurrentElementChangeFlag = false ;
			function onBeforeCurrentElementChangeHandler(event){
				onBeforeCurrentElementChangeFlag = true ;
			}
			source.CitiesDS.addListener("onBeforeCurrentElementChange", onBeforeCurrentElementChangeHandler);
			//dispatch
			source.CitiesDS.dispatch("onBeforeCurrentElementChange");
			//onBeforeCurrentElementChange event should occur
			window.setTimeout(function () {
				testRunner.resume(function(){
					Y.Assert.areSame(true, onBeforeCurrentElementChangeFlag, "onBeforeCurrentElementChange event did not occur !");
				});
			}, 500);
			testRunner.wait();
		},

		/**
 		 * SDME-3.1 autoDispatch method exists
 		 */
		testSourceAutoDispatchExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.autoDispatch);
			Y.Assert.areSame("function", typeof source.CitiesDS.autoDispatch);
		},

		/**
 		 * SDME-3.2 autoDispatch method business logic
 		 */
		testSourceAutoDispatchLogic: function () {		
			var testRunner = this;
			
			//point the third element    	
			source.CompaniesDS.select(2);

			//get an attribute value
			var value = source.CompaniesDS.ca;

			// add attributeChange listener
			var onAttributeChangeFlag = false ;
			var onAttributeChangeHandler = function onAttributeChangeHandler(event){
				onAttributeChangeFlag = true ;
			}
			source.CompaniesDS.addListener("onAttributeChange", onAttributeChangeHandler, {attributeName: "ca"});
			
			//edit datasource values
			source.CompaniesDS.ca = value +1 ;
			
			window.setTimeout(function () {
				testRunner.resume(function(){
					//get real value in the current element
					Y.Assert.areSame(value, source.CompaniesDS.getCurrentElement().ca.getValue());
		
					//event should not be triggered
					Y.Assert.areSame(false, onAttributeChangeFlag, "onAttributeChange event should not occur !");
		
					//call autoDispatch
					source.CompaniesDS.autoDispatch();
					
					window.setTimeout(function () {
						testRunner.resume(function(){
							//datasource values should be updated
							Y.Assert.areSame(value + 1, source.CompaniesDS.ca);
			
							//event should be triggered
							Y.Assert.areSame(true, onAttributeChangeFlag, "onAttributeChange event should occur !");
						});
					}, 500);
					testRunner.wait();
				});
			}, 500);
			testRunner.wait();
		},
    
        /** 
            SDME-1.2.5
            Added by Ismail Bougnouch 
            test Addlistnerlogic with OnSelectionChange
		**/
		testAddListenerOnSelectionChangeLogic: function () {
			var testRunner = this;
			
			// test of selectionChange event
			var onSelectionChangeFlag = false ;
			function onSelectionChangeHandler(event){
				onSelectionChangeFlag = true ;
			}
                        
			source.CitiesDS.addListener("onSelectionChange", onSelectionChangeHandler);
            
            var sel = new WAF.Selection("multiple");
            sel.setSelectedRows([1, 2]);
            
            
			//set the selection of the entity with the new selection
			sources.CitiesDS.setSelection(sel); 
			//selectionChange event should occur
            
			window.setTimeout(function () {
				testRunner.resume(function(){
					Y.Assert.areSame(true, onSelectionChangeFlag, "onSelectionChange event did not occur !");	
				});
			}, 500);
			testRunner.wait();
		}
};