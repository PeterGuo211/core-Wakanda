var testCase = {
		name : "DataStore Class",
		
		_should: {
			ignore: {
				
			}
		},

		/**
		 * DS-11. test of getCollectionName exists
		 */

		testDSGetCollectionNameExists : function() {
			Y.Assert.areNotSame("undefined", typeof ds.Emp.getCollectionName,
			"getCollectionName is undefined");
			Y.Assert.areSame("function", typeof ds.Emp.getCollectionName,
			"getCollectionName is not a function");
		},

		/**
		 * DS-12. test of getCollectionName logic
		 */

		testDSGetCollectionNameLogic : function() {

			Y.Assert.areSame("EmpCollection", ds.Emp.getCollectionName(),
			"ds.Emp.getCollectionName not match Emps");
		},

		/**
		 * DS-15. test of getName exists
		 */
		testDSGetNameExists : function() {
			Y.Assert.areNotSame("undefined", typeof ds.Emp.getName,
			"getName  is undefined");
			Y.Assert.areSame("function", typeof ds.Emp.getName,
			"getName is not a function");
		},

		/**
		 * DS-16. test of getName logic
		 */
		testDSGetNameLogic : function() {
			Y.Assert.areSame("Emp", ds.Emp.getName(),
			"ds.Emp.getName not match Emp");
		},

		/**
		 * DS-17. test of MethodCall Logic : using direct call COMMENTED 04-06-2014
		 */

/* 		testDSMethodCallDirectCall : function() {
			var testRunner = this;
			ds.City.methodModel({
				'onSuccess' : function(event) {
					testRunner.resume(function() {

						Y.Assert.areSame("EntityModel", event.result,
						"error method call using direct call");
					});
				},
				'onError' : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("DS class method call failed !");

					});
				}
			});
			testRunner.wait();
		}, */

		/**
		 * DS-18. test of Method Call Logic : using callMethod COMMENTED 04-06-2014
		 */

/* 		testDSMethodCallUsingCallMethod : function() {
			var testRunner = this;
			Y.Assert.areNotSame("undefined", typeof ds.City.callMethod,
			"callMethod is undefined");
			Y.Assert.areSame("function", typeof ds.City.callMethod,
			"callMethod is not a function");
			ds.City.callMethod({
				'method' : "methodModel",
				'onSuccess' : function(event) {
					testRunner.resume(function() {

						Y.Assert.areSame("EntityModel", event.result,
						"error method call using callMethod");
					});
				},
				'onError' : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("DS method call failed !");

					});
				}
			});
			testRunner.wait();
		}, */

		/**
		 * DS-19. test of clearCache exists
		 */
		testDSClearCacheExists : function() {
			Y.Assert.areNotSame("undefined", typeof ds.Emp.clearCache,
			"clearCache is undefined");
			Y.Assert.areSame("function", typeof ds.Emp.clearCache,
			"clearCache is not a function");

		},

		/**
		 * DS-20. test of clearCache logic
		 */
		testDSClearCacheLogic : function() { 
			ds.City.clearCache({
				'onSuccess' : function(event) {
					testRunner.resume(function() {
						var i = false;
						for(var item in ds.City._private.cache.entitiesByKey){
							i = true;
							break;
						}

						Y.Assert.areSame(false,i,"failed to clear cache");

					});
				},
				'onError' : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("failed to clear cache");
					});
				}
			});
		},

		/**
		 * DS-21. test of distinctValues using two callback method
		 */

		testDSDistinctValuesLogicTwoCallBackMethods : function() {
			var testRunner = this;
			var entityCollection = ds.City.distinctValues("pop", {
				'onSuccess' : function(event) {
					testRunner.resume(function() {					 
						var myArray = event.distinctValues;  
						for (var i = 0; i < myArray.length; i++)   														 
						{                    
							for (var j = 0; j < myArray.length; j++){           
								if(myArray[j]== myArray[i] && i!=j ){              
									Y.Assert.fail("Duplicated value found");
								}
							}
						} 
						Y.ArrayAssert.itemsAreEqual([2000000,250000,4000000], event.distinctValues);
					});
				},
				'onError' : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("No Entity Set returned");
					});
				}
			});
			testRunner.wait();
		},

		/**
		 * DS-22. test of distinctValues using one callback method
		 */

		/*testDSDistinctValuesLogicOneCallBackMethod : function() {
		var testRunner = this;
		var entityCollection = ds.City.distinctValues("pop",  
			  function(event) {
				 testRunner.resume(function() {	

            var myArray = event.distinctValues;  
            for (var i = 0; i < myArray.length; i++)   														 
               {                    
                   for (var j = 0; j < myArray.length; j++){           
                        if(myArray[j]== myArray[i] && i!=j ){              
                          Y.Assert.fail("Duplicated value found");
                        }
                     }
              } 
            Y.ArrayAssert.itemsAreEqual([ "250000", "2000000",
							"4000000" ], event.distinctValues);

	        });

	     });
         testRunner.wait();
	},*/



		/*
		 * testDSDistinctValuesLogicOneCallBackMethod: function () { var testRunner =
		 * this ; var entityCollection =
		 * ds.City.distinctValues("name",function(event){
		 * testRunner.resume(function(){ Y.Assert.areSame("object", typeof
		 * event.result); Y.ArrayAssert.itemsAreEqual(["Cupertino","New York","Palo
		 * Alto","Paris"], event.result); }); } ); testRunner.wait(1000); },
		 */

		/**
		 * DS-23. test of find exists
		 */

		testDSFindExists : function() {
			Y.Assert.areNotSame("undefined", typeof ds.Emp.find,
			"DataClass.find() is undefined");
			Y.Assert.areSame("function", typeof ds.Emp.find,
			"find is not a function");
		},

		/**
		 * DS-24. test of find logic
		 */

		testDSFindLogic : function() {
			var testRunner = this;
			var entityCollection = ds.City.find("name = Cupertino", {
				'onSuccess' : function(event) {
					testRunner.resume(function() {
						var entity = event.entity;
						Y.Assert.areSame("Cupertino", entity.name.getValue());
					});
				},
				'onError' : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("find() call fails!" + JSON.stringify(error));
					});
				}
			});
			testRunner.wait();
		},

		/**
		 * DS-25. test of find logic when not found logic
		 */
		testDSFindLogicNotFound : function() {
			var testRunner = this;
			var entityCollection = ds.City.find("ID = 100", {
				'onSuccess' : function(event) {
					testRunner.resume(function() {
						var entity = event.entity;
						Y.Assert.areSame(null, entity);
					});
				},
				'onError' : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("find() call fails!" + JSON.stringify(error));
					});
				}
			});
			testRunner.wait();
		},

		/**
		 * DS-26. test of getAttributeByName exists and return an object
		 */

		testDSGetAttributeByNameExistsReturn : function() {

			Y.Assert.areNotSame("undefined", typeof ds.Emp.getAttributeByName,
			"ds.Emp.getAttributeByName is undefined");
			Y.Assert.areSame("function", typeof ds.Emp.getAttributeByName,
			"ds.Emp.getAttributeByName is not a function");

			var attribute = ds.Emp.getAttributeByName("name");
			Y.Assert.areNotSame("undefined", typeof attribute);
			Y.Assert.areSame("object", typeof attribute);
		},

		/**
		 * DS-27. test of getAttributeByName logic
		 */

		testDSGetAttributeByNameLogic : function() {
			var attribute = ds.Emp.getAttributeByName("ID");
			Y.Assert.areSame("ID", attribute.name);
			Y.Assert.areSame("long", attribute.type);
			Y.Assert.areSame("public", attribute.scope);
			Y.Assert.areSame(true, attribute.simple);
			Y.Assert.areSame(false, attribute.related);
			Y.Assert.areSame("storage", attribute.kind);
			//Y.Assert.areSame(true, attribute.indexed);

			attribute = ds.City.getAttributeByName("companies");
			Y.Assert.areSame("companies", attribute.name);
			Y.Assert.areSame("CompanyCollection", attribute.type);
			Y.Assert.areSame("public", attribute.scope);
			Y.Assert.areSame(false, attribute.simple);
			Y.Assert.areSame(true, attribute.related);
			Y.Assert.areSame("relatedEntities", attribute.kind);

		},

		/**
		 * DS-28. test of getAttribute exists
		 */

		testDSGetAttributeExists : function() {
			Y.Assert.areNotSame("undefined", typeof ds.Emp.getAttributes,
			"getAttribute is undefined");
			Y.Assert.areSame("function", typeof ds.Emp.getAttributes,
			"getAttribute is not a function");
		},

		/**
		 * DS-29. test of getAttribute logic
		 */

		testDSGetAttributes : function() {
			var attributes = ds.Emp.getAttributes();
			Y.Assert.areNotSame("undefined", typeof attributes);
			Y.Assert.areSame("object", typeof attributes);
			Y.Assert.areSame(7, attributes.length,
			"the number of attribut of ds.Emp is not 7");
		},

		/**
		 * DS-30. test of getCacheSize exists
		 */
		testDSGetCacheSizeExists : function() {

		},

		/**
		 * DS-31. test of getCacheSize logic
		 */
		testDSSetGetCacheSizeLogic : function() {
			ds.City.setCacheSize(500); 
			Y.Assert.areSame(500,ds.City.getCacheSize(),"getSizeCache is different to the value modified before");
		},

		/**
		 * DS-32. test of getDataStore exists
		 */
		testDSGetDataStoreExists : function() {
			Y.Assert.areNotSame("undefined", typeof ds.Emp.getDataStore,
			"ds.Emp.getDataStore is undefined");
			Y.Assert.areSame("function", typeof ds.Emp.getDataStore,
			"ds.Emp.getDataStore is not a function");
		},

		/**
		 * DS-33. test of getDataStore logic
		 */
		testDSGetDataStoreLogic : function() {

			var tab = [];
			for ( var clas in ds.City.getDataStore().getDataClasses()) {
				tab.push(clas);
			}

			for (i = 0; i < tab.length - 2; i++) {
				// console.log(tab[i]);

			}

			Y.ArrayAssert.containsItems([ "City", "Company", "Emp" ], tab);

		},

		/**
		 * DS-34. test of getEntity exists
		 */

		testDSGetEntityExists : function() {
			Y.Assert.areNotSame("undefined", typeof ds.Emp.getEntity,
			"DataClass.getEntity() is undefined");
			Y.Assert.areSame("function", typeof ds.Emp.getEntity,
			"getEntity is not a function");
		},

		/**
		 * DS-35. test of getEntity logic - COMMENTED 04-06-2014
		 */

		// testDSGetEntitylogic : function() {
			// var testRunner = this;
			// ds.City.getEntity(2, {
				// 'onSuccess' : function(event) {
					// testRunner
					// .resume(function() {
						// Y.Assert.areSame("Cupertino", event.entity.name
								// .getValue());
						// Y.Assert.areSame(250000, event.entity.pop
								// .getValue());
					// });
				// },
				// 'onError' : function(error) {
					// testRunner.resume(function() {

						// Y.Assert.fail("error when getEntity logic");
					// });
				// }
			// });
			// testRunner.wait();
		// },

		/**
		 * DS-36. test of NewEntity exists
		 */

		testDSNewEntityExists : function() {
			Y.Assert.areNotSame("undefined", typeof ds.Emp.newEntity,
			"newEntity is undefined");
			Y.Assert.areSame("function", typeof ds.Emp.newEntity,
			"newEntity is not a function");
		},

		/**
		 * DS-37. test of NewEntity logic
		 */

		testDSNewEntitylogic : function() {
			var testRunner = this;
			var city = ds.City.newEntity(); // creation of entity
			city.name.setValue("Paris");
			city.pop.setValue(2000000);
			Y.Assert.isTrue(city.isNew(), 'Entity isNew() should return True');
			city.save({
				'onSuccess' : function(event) {
					testRunner.resume(function() {

						Y.Assert.areSame("Paris", event.entity.name.getValue());
						Y.Assert.areSame(2000000, event.entity.pop.getValue());
					});
				},
				'onError' : function(error) {
					testRunner.resume(function() {

						Y.Assert.fail("Entity not saved !");
					});
				}
			});
			testRunner.wait();
		},

		/**
		 * DS-38. test of query existe
		 */
		testDSQueryExists : function() {
			Y.Assert.areNotSame("undefined", typeof ds.Emp.query,
			"query is undefined");
			Y.Assert.areSame("function", typeof ds.Emp.query,
			"query is not a function");

		},

		/**
		 * DS-39. test of query logic : empty string
		 */
		testDSQueryLogicEmptyString : function() {
			var testRunner = this;
			var entityCollection = ds.Emp.query("", {
				onSuccess : function(event) {
					testRunner.resume(function() {
						Y.Assert.areSame(10, event.entityCollection.length);
					});
				},
				onError : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("No EntityCollection returned");
					});
				}
			}, this);
			testRunner.wait();

		},

		/**
		 * DS-40. test of query logic : constraint
		 */
		testDSQueryLogicConstraint : function() {
			var testRunner = this;
			var entityCollection = ds.Emp.query("salary > 70000 AND salary < 100000", {
				onSuccess : function(event) {
					testRunner.resume(function() {
						Y.Assert.areSame(4, event.entityCollection.length);
					});
				},
				onError : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("No EntityCollection returned!" + JSON.stringify(error));
					});
				}
			});
			testRunner.wait();

		},

		/**
		 * DS-41. test of query logic : with parameters
		 */
		testDSQueryLogicWithParam : function() {
			var testRunner = this;
			var entityCollection = ds.Emp.query("salary>:1 and salary<:2", {
				'params' : [ 70000, 100000 ],
				'onSuccess' : function(event) {
					var runner = event.userData;
					if ((typeof runner == "undefined") || (typeof runner.resume == "undefined")) {
						testRunner.resume(function() {
							Y.Assert.fail("userData not transmitted");
						});
					}
					else {
						runner.resume(function() {
							Y.Assert.areSame(4, event.entityCollection.length);
						});
					}
				},
				'onError' : function(error) {
					var runner = error.userData;
					if ((typeof runner == "undefined") || (typeof runner.resume == "undefined")) {
						testRunner.resume(function() {
							Y.Assert.fail("userData not transmitted");
						});
					}
					else {
						runner.resume(function() {
							Y.Assert.fail("No EntityCollection returned!" + JSON.stringify(error));
						});
					}
				}
			}, testRunner);
			testRunner.wait();
		},

		/**
		 * DS-42. test of setCacheSize exists
		 */
		testDSSetCacheSizeExists : function() {
			Y.Assert.areNotSame("undefined", typeof ds.Emp.setCacheSize,
			"setCacheSize is undefined");
			Y.Assert.areSame("function", typeof ds.Emp.setCacheSize,
			"setCacheSize is not a function");
		},


};