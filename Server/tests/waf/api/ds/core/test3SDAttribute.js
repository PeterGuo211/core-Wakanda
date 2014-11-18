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
 * author ouissam.gouni@4d.com
 */
var testCase = {
		name: "Server DataSource and Attribute",
		
        _should: {
            ignore: {

            }
        },
        
		setUp : function () {
			//
    	},

		/**
		 * SDA-1
 		 */  
		testDataSourceAttributeClassExists: function () {
			Y.Assert.areNotSame("undefined", typeof WAF.DataSourceEmSimpleAttribute);  
			Y.Assert.areSame("function", typeof WAF.DataSourceEmSimpleAttribute);
		},
		
		/**
		 * SDA-1.1 getValue exists
 		 */ 
		testSourceAttributeGetValueExists: function () {
			var attribute = source.CitiesDS.getAttribute("name") ;
			Y.Assert.areNotSame("undefined", typeof attribute.getValue);
			Y.Assert.areSame("function", typeof attribute.getValue);
		},

		/**
		 * SDA-1.2 getValue logic
 		 */ 
		testSourceAttributeGetValueLogic: function () {
			var testRunner = this ;
			window.setTimeout(function () {
				source.CitiesDS.select(0, { onSuccess: function () {
					testRunner.resume(function(){ 
						Y.Assert.areSame("Paris", source.CitiesDS.getAttribute("name").getValue());
						Y.Assert.areSame(2000000, source.CitiesDS.getAttribute("pop").getValue());
					});
				}});
			}, 2);
			testRunner.wait();
		},

		/**
		 * SDA-2.1 setValue exists
 		 */ 
		testSourceAttributeSetValueExists: function () {
			var attribute = source.CitiesDS.getAttribute("name");
			Y.Assert.areNotSame("undefined", typeof attribute.setValue);
			Y.Assert.areSame("function", typeof attribute.setValue);
		},

		/**
		 * SDA-2.2 setValue logic 
 		 */ 
		testSourceAttributeSetValueLogic: function () {
			var testRunner = this ;
			window.setTimeout(function () {
				source.CitiesDS.select(0, { onSuccess: function () {
					testRunner.resume(function(){ 
						var attribute = source.CitiesDS.getAttribute("pop") ;
						attribute.setValue(3000000);
						Y.Assert.areSame(3000000, attribute.getValue());
					});
				}});
			}, 2);
			testRunner.wait();
		},

		/**
		 * SDA-3.1 getOldValue exists 
 		 */ 
		testSourceAttributeGetOldValueExists: function () {
			var attribute = source.CitiesDS.getAttribute("name");
			Y.Assert.areNotSame("undefined", typeof attribute.getOldValue);
			Y.Assert.areSame("function", typeof attribute.getOldValue);
		},

		/**
		 * SDA-3.2 getOldValue logic 
 		 */ 
		testSourceAttributeGetOldValueLogic: function () {
			var testRunner = this ;
			window.setTimeout(function () {
				source.CompaniesDS.select(0, { onSuccess: function () {
					testRunner.resume(function(){ 
						var attribute =  source.CompaniesDS.getAttribute("ca");
						var oldValue = attribute.getValue();
						attribute.setValue(oldValue + 1);
						Y.Assert.areSame(oldValue, attribute.getOldValue(), "Should return the old value");
					});
				}});
			}, 2);
			testRunner.wait();
		},

		/**
		 * SDA-4.1 getValueForInput exists 
 		 */ 
		testSourceAttributeGetValueForInputExists: function () {
			var attribute = source.EmpsDS.getAttribute("name") ;
			Y.Assert.areNotSame("undefined", typeof attribute.getValueForInput);
			Y.Assert.areSame("function", typeof attribute.getValueForInput);
		},

		/**
		 * SDA-4.2 getValueForInput logic 
 		 */ 
		testSourceAttributeGetValueForInputLogic: function () {
			var testRunner = this ;
			window.setTimeout(function () {
				source.EmpsDS.select(0, { onSuccess: function () {
					testRunner.resume(function(){ 
						var valueForInput = source.EmpsDS.getAttribute("integration").getValueForInput();
						Y.Assert.areNotSame("undefined", valueForInput );
						Y.Assert.areSame("string", typeof valueForInput);
						if (/fr/i.test(navigator.language)) Y.Assert.areSame("09/12/2011", valueForInput);
						else Y.Assert.areSame("12/09/2011", valueForInput);
	
						valueForInput = source.EmpsDS.getAttribute("salary").getValueForInput();
						Y.Assert.areNotSame("undefined", valueForInput );
						Y.Assert.areSame("string", typeof valueForInput);
						Y.Assert.areSame("70000", valueForInput);
					});
				}});
			}, 2);
			testRunner.wait();
		},

		/**
		 * SDA-5.1 normalize exists 
 		 */ 
		testSourceAttributeNormalizeExists: function () {
			var attribute = source.EmpsDS.getAttribute("name") ;
			Y.Assert.areNotSame("undefined", typeof attribute.normalize);
			Y.Assert.areSame("function", typeof attribute.normalize);
		},

		/**
		 * SDA-5.2 normalize logic 
 		 */ 
		testSourceAttributeNormalizeLogic: function () {
			var testRunner = this ;
			window.setTimeout(function () {
				source.EmpsDS.select(0, { onSuccess: function () {
					testRunner.resume(function(){ 
						var result = source.EmpsDS.getAttribute("integration").normalize("03/25/2008");
						Y.Assert.areNotSame("undefined", typeof result);
						Y.Assert.areSame("object", typeof result);
						Y.Assert.areSame(true, result instanceof Date );
	
						result = source.EmpsDS.getAttribute("salary").normalize("15000");
						Y.Assert.areNotSame("undefined", typeof result);
						Y.Assert.areSame("number", typeof result);
						Y.Assert.areSame(result, 15000);
					});
				}});
			}, 2);
			testRunner.wait();
		},

		/**
		 * SDA-6.1 load exists 
 		 */ 
		testSourceAttributeLoadExists: function () {
			var attribute = source.CompaniesDS.location ;
			Y.Assert.areNotSame("undefined", typeof attribute.load);
			Y.Assert.areSame("function", typeof attribute.load);
		},

		/**
		 * SDA-6.2 load logic 
 		 */ 
		testSourceAttributeLoadLogic: function () {
			var testRunner = this ;
			window.setTimeout(function () {
				source.CompaniesDS.select(0, { onSuccess: function () {
					source.CompaniesDS.location.load({
						onSuccess: function(event) {
							testRunner.resume(function(){ 
								var cityEntity = event.entity ;
								Y.Assert.areNotSame(null, cityEntity);
								Y.Assert.areSame("Paris", cityEntity.name.getValue());
							});					
						}
					});
				}});
			}, 2);
			testRunner.wait();
		},

		/**
		 * SDA-7.1 set exists 
 		 */ 
		testSourceAttributeSetExists: function () {
			var attribute = source.CompaniesDS.location ;
			Y.Assert.areNotSame("undefined", typeof attribute.set);
			Y.Assert.areSame("function", typeof attribute.set);
		},

		/**
		 * SDA-7.2 set logic using entity
 		 */ 
		testSourceAttributeSetLogicUsingEntity: function () {
			var testRunner = this ;		
			window.setTimeout(function () {
				ds.City.getEntity(4, {
					'onSuccess': function(event){
						testRunner.resume(function(){ 
							city = event.entity ;
							Y.Assert.areNotSame(null, city, "Retrieved Entity is null !");	
							Y.Assert.areSame(4, city.ID.getValue(), "Retrieved Entity doesn't match the query !");	
							source.CompaniesDS.select(0);
							source.CompaniesDS.location.set(city);		
						});					
					},
					'onError': function(error){
						testRunner.resume(function(){ 
							Y.Assert.fail("Get Entity failed !");
						});							
					}
				});
			}, 2);
			testRunner.wait();
		},

		/**
		 * SDA-7.3 set logic using datasource 
 		 */ 
		testSourceAttributeSetLogicUsingDataSource: function () {
			var testRunner = this ;

			// Point the second city
			source.CitiesDS.select(1, { onSuccess: function () {
				var id1 = source.CitiesDS.ID;
				var name1 = source.CitiesDS.name;

				// Point the sixth company
				source.CompaniesDS.select(5, { onSuccess: function () {
					var id2 = source.CompaniesDS.ID;
					var name2 = source.CompaniesDS.name;					

					// Set its location with the choosen city	
					source.CompaniesDS.location.set(source.CitiesDS);

					// load its location to check out the result	
					window.setTimeout(function () {
						source.CompaniesDS.location.load({
							'onSuccess': function(event) {
								testRunner.resume(function(){ 
									Y.Assert.areSame(2, id1);
									Y.Assert.areSame("Cupertino", name1);
									Y.Assert.areSame(6, id2);
									Y.Assert.areSame("Google", name2);
									var cityEntity = event.entity ;
									Y.Assert.areNotSame(null, cityEntity);
									Y.Assert.areSame(2, cityEntity.ID.getValue());
									Y.Assert.areSame("Cupertino", cityEntity.name.getValue());
								});					
							},
			
							'onError': function(event) {
								testRunner.resume(function(){ 
									Y.Assert.fail("Error on load !");
								});					
							}
						});
					}, 2);
				}});
			}});
			testRunner.wait();
		}
};