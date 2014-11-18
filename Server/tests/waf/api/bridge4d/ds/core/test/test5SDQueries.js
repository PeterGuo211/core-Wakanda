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
		name: "Server DataSource and Queries",
        
		_should: {
            ignore: {
                
            }
        },
        
		setUp : function () {
    	},
		
		/**
 		 * SDQ-2.1 allEntities method exists
 		 */
		testAllEntitiesExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.allEntities);
			Y.Assert.areSame("function", typeof source.CitiesDS.allEntities);
		},

		/**
 		 * SDQ-2.2 allEntities method busniess logic
 		 */
		testAllEntitiesLogic: function () {
			var testRunner = this ;
			//Get the datasource length before method call
			var oldLength = source.CitiesDS.length ;

			// add onCurrentElementChange event handler
			var onCurrentElementChangeFlag = false ;
			var onCurrentElementChangeHandler = function onCurrentElementChangeHandler(event){
				onCurrentElementChangeFlag = true ;
			}
			source.CitiesDS.addListener("onCurrentElementChange", onCurrentElementChangeHandler);

			// add onCollectionChange event handler
			var onCollectionChangeFlag = false ;
			var onCollectionChangeHandler = function onCollectionChangeHandler(event){
				onCollectionChangeFlag = true ;
			}

			source.CitiesDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//call the method
			window.setTimeout(function () {
				source.CitiesDS.allEntities({
						'onSuccess': function(event){
							testRunner.resume(function(){ 
								//onCollectionChange event should occur
								Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");
								//onCurrentElementChange event should occur
								Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event did not occur !");  

								//entityCollection shouldn't be null
								var entityCollection = source.CitiesDS.getEntityCollection();
								Y.Assert.areNotSame(null, entityCollection, "entityCollection shouldn't be null !");

								//Datasource length should equals zero
								Y.Assert.areSame(4, source.CitiesDS.length, "4 entities should be returned");

								//values should all be the same as stored in the datastore
								//Y.Assert.areSame(source.CitiesDS.ID, 1, "entity value should be the same as stored in the datastore");
								var idRef = source.CitiesDS.ID;
								Y.Assert.areSame(source.CitiesDS.name, "Paris", "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.pop, 2000000, "entity value should be the same as stored in the datastore");

								source.CitiesDS.selectNext();
								//values should all be the same as stored in the datastore
								Y.Assert.areSame(source.CitiesDS.ID, idRef + 1, "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.name, "Cupertino", "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.pop, 250000, "entity value should be the same as stored in the datastore");

								source.CitiesDS.selectNext();
								//values should all be the same as stored in the datastore
								Y.Assert.areSame(source.CitiesDS.ID, idRef + 2, "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.name, "New York", "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.pop, 4000000, "entity value should be the same as stored in the datastore");

								source.CitiesDS.selectNext();
								//values should all be the same as stored in the datastore
								Y.Assert.areSame(source.CitiesDS.ID, idRef + 3, "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.name, "Palo Alto", "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.pop, 4000000, "entity value should be the same as stored in the datastore");
							});
						},
						'onError': function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async Call to allEntities fails !");
							});	
						}
					}
				);
			}, 50);
			testRunner.wait();
		},

		
		/**
 		 * SDQ-3.1 query method exists
 		 */
		testQueryExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.orderBy);
			Y.Assert.areSame("function", typeof source.CitiesDS.orderBy);
		},

		/**
 		 * SDQ-3.2 query method basic
 		 */
		testQueryLogic: function () {
			var testRunner = this ;

			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			var onCollectionChangeHandler = function onCollectionChangeHandler(event){
				onCollectionChangeFlag = true ;
			}

			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//method call
			window.setTimeout(function () { 
				source.EmpsDS.query("salary > 80000",
					{
				'onSuccess': function(event){
					testRunner.resume(function(){ 
						//onCollectionChange event should occur
						Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

						//Entities values should match the query conditions
						Y.Assert.areSame(4, source.EmpsDS.length);

						var entityCollection = source.EmpsDS.getEntityCollection();
						entityCollection.forEach({ 
							'onSuccess': function(event){
								Y.Assert.areSame(true, event.entity.salary.getValue() > 80000, "Entities values should match the query conditions");
							}
						});
					});
				},
				'onError': function(error){
					testRunner.resume(function(){ 
						Y.Assert.fail("Async call to query fails !");
					});	
				}
					}
				);
			}, 50);
			testRunner.wait();		
		},

		/**
 		 * SDQ-3.3 query method with parameterized request
 		 */		
		testQueryLogicParameterized: function () {
			var testRunner = this ;

			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			var onCollectionChangeHandler = function onCollectionChangeHandler(event){
				onCollectionChangeFlag = true ;
			}

			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//method call
			window.setTimeout(function () {
				source.EmpsDS.query("salary > :1 and salary < :2",
					{
				'params' : [70000, 100000],
				'onSuccess': function(event){
					testRunner.resume(function(){ 
						//onCollectionChange event should occur
						Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange change event did not occur !");

						//Entities values should match the query conditions
						Y.Assert.areSame(4, source.EmpsDS.length, "Returned entities should match the query conditions");

						var entityCollection = source.EmpsDS.getEntityCollection();
						entityCollection.forEach({ 
							'onSuccess': function(event){
								var salary = event.entity.salary.getValue();
								Y.Assert.areSame(true, salary > 70000 || salary < 100000, "Returned entities values should match the query conditions");
							}
						});

					});
				},
				'onError': function(error){
					testRunner.resume(function(){ 
						Y.Assert.fail("Async Call to query fails !");
					});	
				}
					}
				);
			}, 50);
			testRunner.wait();		
		},
		
		/**
 		 * SDQ-3.4 query method when not found
 		 */
		testQueryLogicNotFound: function () {
			var testRunner = this ;

			// add onCollectionChange event handler
			var onCollectionChangeFlag = false ;
			var onCollectionChangeHandler = function onCollectionChangeHandler(event){
				onCollectionChangeFlag = true ;
			}

			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//method call
			window.setTimeout(function () {
				source.EmpsDS.query("salary < 0",
					{
				'onSuccess': function(event){
					testRunner.resume(function(){ 
						//onCollectionChange event should occur
						Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

						//entityCollection shouldn't be null
						var entityCollection = source.EmpsDS.getEntityCollection();
						Y.Assert.areNotSame(null, entityCollection, "entityCollection shouldn't be null !");

						//Datasource length should equals zero
						Y.Assert.areSame(0, source.EmpsDS.length, "No entities should be returned");

					});
				},
				'onError': function(error){
					testRunner.resume(function(){ 
						Y.Assert.fail("Async Call to query fails !");
					});	
				}
					}
				);
			}, 50);
			testRunner.wait();		
		},
		
		/**
 		 * SDQ-4.1 filterQuery method exists
 		 */
		testFilterQueryExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.EmpsDS.filterQuery);
		},

		/**
 		 * SDQ-4.2 filterQuery method business logic
 		 */
		testFilterQueryLogic : function(){
			//get the test runner
			var testRunner = this ;

			//call query method
			window.setTimeout(function () {
				source.EmpsDS.query("salary > 60000 and salary < 120000",
					{
				'onSuccess': function(event){
					testRunner.resume(function(){ 
						//Returned entityCollection should match the query conditions
						Y.Assert.areSame(6, source.EmpsDS.length, "Returned entityCollection should match the query conditions");

						// add onCurrentElementChange event handler
						var onCurrentElementChangeFlag = false ;
						var onCurrentElementChangeHandler = function onCurrentElementChangeHandler(event){
							onCurrentElementChangeFlag = true ;
						}
						source.EmpsDS.addListener("onCurrentElementChange", onCurrentElementChangeHandler);

						// add onCollectionChange event handler
						var onCollectionChangeFlag = false ;
						var onCollectionChangeHandler = function onCollectionChangeHandler(event){
							onCollectionChangeFlag = true ;
						}

						source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);

						//call filterQuery method
						window.setTimeout(function () {
								source.EmpsDS.filterQuery("age = 25",
								{
							'onSuccess': function(event){
								testRunner.resume(function(){ 
									//onCollectionChange change event should occur
									Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

									//onCurrentElementChange event should occur
									Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event did not occur !");

									//entityCollection should be filtered
									Y.Assert.areSame(3, source.EmpsDS.length, "entityCollection should be filtered");

									//Returned entities values should match the filter query conditions
									var entityCollection = source.EmpsDS.getEntityCollection();
									entityCollection.forEach({ 
										'onSuccess': function(event){
											var age = event.entity.age.getValue();
											Y.Assert.areSame(true, age == 25 , "Returned entities values should match the filter query conditions");
										}
									});

								});
							},
							'onError': function(error){
								testRunner.resume(function(){ 
									Y.Assert.fail("Async Call to filterQuery fails !");
								});	
							}
								}
							);
						}, 50);
						testRunner.wait();
					});
				},
				'onError': function(error){
					testRunner.resume(function(){ 
						Y.Assert.fail("Async Call to query fails !");
					});	
				}
					}
				);
			}, 50);
			testRunner.wait();	
		},
		
		/**
 		 * SDQ-5.1 orderBy method exists
 		 */
		testOrderByExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.orderBy);
			Y.Assert.areSame("function", typeof source.CitiesDS.orderBy);
		},

		/**
 		 * SDQ-5.2 orderBy method logic
 		 */
		testOrderByLogic: function () {
			var testRunner = this ;

			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			var onCollectionChangeHandler = function onCollectionChangeHandler(event){
				onCollectionChangeFlag = true ;
			}
			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//method call
			window.setTimeout(function () {
				source.EmpsDS.orderBy(
					"salary asc", 
					{
						'onSuccess': function(event){
							testRunner.resume(function(){ 
								//onCollectionChange event should occur
								Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

								//entities should be sorted
								var arr = [];
								var newEntityCollection = source.EmpsDS.getEntityCollection();
								newEntityCollection.forEach({ 
									'onSuccess': function(event){
										var salary = event.entity.salary.getValue();
										arr.push(salary);
									}
								});

								for (var i = 0; i < arr.length - 1; i += 1) {
									if (arr[i + 1] > arr[i]) {
										Y.Assert.fail("OrderBy logic fails !");
									}
								}

							});
						},
						'onError': function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("OrderBy async Call fails !");
							});	
						}
					}
				);
			}, 50);
			testRunner.wait();		
		},
		
		/**
 		 * SDQ-6.1 toArray method exists
 		 */
		testToArrayExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.toArray);
		},

		/**
 		 * SDQ-6.2 toArray method with one attribute
 		 */
		testToArrayLogicOneAttribute : function(){
			//get the test runner
			var testRunner = this;

			//get the length before method call
			var oldLength = source.CitiesDS.length;

			//add onCurrentElementChange event listener
			var onCurrentElementChangeFlag = false;
			source.CitiesDS.addListener("onCurrentElementChange", function(event){
				onCurrentElementChangeFlag = true;
			});

			//add onCollectionChange event listener
			var onCollectionChangeFlag = false;
			source.CitiesDS.addListener("onCollectionChange", function(event){
				onCollectionChangeFlag = true;
			});

			//method call
			window.setTimeout(function () {
				source.CitiesDS.toArray( "name",
					{
				'onSuccess': function(event){
					testRunner.resume(function(){
						//existance of result
						Y.Assert.areNotSame("undefined", event.result);
						Y.Assert.isArray(event.result, "result should be an array");
						//content of result
						Y.Assert.areSame(4, event.result.length);
						var cities = [];
						for(var i=0; i< event.result.length; i++){
							cities.push(event.result[i].name);
						}
						Y.ArrayAssert.itemsAreSame(["Paris", "Cupertino", "New York", "Palo Alto"], cities);
					});
				},
				'onError': function(event){
					testRunner.resume(function(){
						Y.Assert.fail("Async call to toArray failed !");
					});
				}
					}

				);
			}, 50);
			testRunner.wait();
		},
		
		/**
 		 * SDQ-6.3 toArray method with two attribute
 		 */
		testToArrayLogicTwoAttribute : function(){
			//get the test runner
			var testRunner = this;

			//get the length before method call
			var oldLength = source.CitiesDS.length;

			//add onCurrentElementChange event listener
			var onCurrentElementChangeFlag = false;
			source.CitiesDS.addListener("onCurrentElementChange", function(event){
				onCurrentElementChangeFlag = true;
			});

			//add onCollectionChange event listener
			var onCollectionChangeFlag = false;
			source.CitiesDS.addListener("onCollectionChange", function(event){
				onCollectionChangeFlag = true;
			});

			//method call
			window.setTimeout(function () {
				source.CitiesDS.toArray( "name, pop",
					{
				'onSuccess': function(event){
					testRunner.resume(function(){
						//existance of result
						Y.Assert.areNotSame("undefined", event.result);
						Y.Assert.isArray(event.result, "result should be an array");
						//content of result
						Y.Assert.areSame(4, event.result.length);
						var cities = [];
						for(var i=0; i< event.result.length; i++){
							cities.push(event.result[i].name);
						}
						Y.ArrayAssert.itemsAreSame(["Paris", "Cupertino", "New York", "Palo Alto"], cities);

						var pops = [];
						for(var i=0; i< event.result.length; i++){
							pops.push(event.result[i].pop);
						}
						Y.ArrayAssert.itemsAreSame([2000000, 250000, 4000000, 4000000], pops);
					});
				},
				'onError': function(event){
					testRunner.resume(function(){
						Y.Assert.fail("Async call to toArray failed !");
					});
				}
					}

				);
			}, 50);
			testRunner.wait();
		},	
		
		
		/**
 		 * SDQ-7.1 callMethod method exists
 		 */
		testCallMethodExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.callMethod);
			Y.Assert.areSame("function", typeof source.CitiesDS.callMethod);
		},  

		/**
 		 * SDQ-7.2 callMethod method logic on DataClass method
 		 */
		testCallMethodLogicDataClass: function () {
			var testRunner = this ;
			//call the distant DataClass method
			window.setTimeout(function () {
				source.CitiesDS.callMethod({
					'method' :"methodDataClass",
					'onSuccess' : function(event){
						testRunner.resume(function(){ 
							Y.Assert.areSame("EntityDataClass", event.result);
						});
					},
					'onError' : function(error){
						testRunner.resume(function(){ 
							Y.Assert.fail("Async call to callMethod fails !");
						});
					}		
				});
			}, 50);
			testRunner.wait();
		},

		/**
 		 * SDQ-7.3 callMethod method logic on EntityCollection method
 		 */
		testCallMethodLogicEntityCollection: function () {
			var testRunner = this ;
			//call the distant EntityCollection method
			window.setTimeout(function () { 
				source.CitiesDS.callMethod({
					'method' :"methodEntityCollection",
					'onSuccess' : function(event){
						testRunner.resume(function(){ 
							Y.Assert.areSame("EntityCollection", event.result);
						});
					},
					'onError' : function(error){
						testRunner.resume(function(){ 
							Y.Assert.fail("Async call to callMethod fails !");
						});
					}		
				});
			}, 50);
			testRunner.wait();
		},

		/**
 		 * SDQ-7.4 callMethod method business logic on Entity method
 		 */
		testCallMethodLogicEntity: function () {
			var testRunner = this ;
			//call the distant entity method
			window.setTimeout(function () { 
				source.CitiesDS.callMethod({
				'method' :"methodEntity",
				'onSuccess' : function(event){
					testRunner.resume(function(){ 
						Y.Assert.areSame("Entity", event.result);
					});
				},
				'onError' : function(error){
					testRunner.resume(function(){ 
						Y.Assert.fail("Async call to callMethod fails !");
					});
				}		
				});
			}, 50);
			testRunner.wait();
		},

		/**
 		 * SDQ-8.1 query method with orderBy
 		 */
		testQueryOrderByLogic: function () {
			var testRunner = this ;

			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			var onCollectionChangeHandler = function onCollectionChangeHandler(event){
				onCollectionChangeFlag = true ;
			}

			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//method call
			window.setTimeout(function () { 
				source.EmpsDS.query("salary > 45000",
					{
				orderBy : "age",
				'onSuccess': function(event){
					testRunner.resume(function(){ 
								//onCollectionChange event should occur
								Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

								//entities should be sorted
								var arr = [];
								var newEntityCollection = source.EmpsDS.getEntityCollection();
								/*console.log(newEntityCollection);
								for (var i = 0; i < newEntityCollection.length; i++) {
									source.EmpsDS.select(i);
									console.log(source.EmpsDS.age);
								};*/
								newEntityCollection.forEach({ 
									'onSuccess': function(event){
										var age = event.entity.age.getValue();
										arr.push(age);
									}
								});

								for (var i = 0; i < arr.length - 2; i += 1) {
									//console.log(arr[i]);
									if (arr[i + 1] < arr[i]) {
										//console.log(arr[i]+","+arr[i+1]);
										Y.Assert.fail("OrderBy logic fails !");
									}
								}

							});
						
				},
				'onError': function(error){
					testRunner.resume(function(){ 
						Y.Assert.fail("Async call to query fails !");
					});	
				}
					});
				}, 50);
			testRunner.wait();		
		},
		
		/**
 		 * SDQ-8.2 query method with orderBy
 		 */
		testQueryKeepOrderByLogic: function () {
			var testRunner = this ;

			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			var onCollectionChangeHandler = function onCollectionChangeHandler(event){
				onCollectionChangeFlag = true ;
			}

			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);
			//source.EmpsDS.query("salary > 45000",{orderBy : "age"});
			
			
			//method call
			window.setTimeout(function () 
			{
				source.EmpsDS.query("salary > 45000",
			{ 
				orderBy : 'age',
				'onSuccess' : function(event){
					
					
					
					var entityCollection = source.EmpsDS.getEntityCollection();
					
					source.EmpsDS.query("salary > 45000",
						{
							keepOrderBy : true,
							'onSuccess': function(event){
							testRunner.resume(function(){ 
									//onCollectionChange event should occur
							Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

							//entities should be sorted
							var arr = [];
							var newEntityCollection = source.EmpsDS.getEntityCollection();
								newEntityCollection.forEach({ 
										'onSuccess': function(event){
											var age = event.entity.age.getValue();
											arr.push(age);
										}
									});

									for (var i = 0; i < arr.length - 1; i += 1) {
										if (arr[i + 1] < arr[i]) {
											Y.Assert.fail("KeepOrderBy with asc logic fails !");
										}
									}

								});							
					},
					'onError': function(error){
						testRunner.resume(function(){ 
							Y.Assert.fail("Async call to query fails !");
						});	
						}
						});
					}
					});
				}, 50);
			testRunner.wait();		
		},
		
		/**
 		 * SDQ-8.3 query method with orderBy desc
 		 */
		testQueryKeepOrderByDescLogic: function () {
			var testRunner = this ;

			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			var onCollectionChangeHandler = function onCollectionChangeHandler(event){
				onCollectionChangeFlag = true ;
			}

			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);
			//source.EmpsDS.query("salary > 45000",{orderBy : "age"});
			
			
			//method call
			window.setTimeout(function () 
			{
				source.EmpsDS.query("salary > 45000",
			{ 
				orderBy : 'age desc',
				'onSuccess' : function(event){
					
					
					
					var entityCollection = source.EmpsDS.getEntityCollection();
					
					source.EmpsDS.query("salary > 45000",
						{
							keepOrderBy : true,
							'onSuccess': function(event){
							testRunner.resume(function(){ 
									//onCollectionChange event should occur
							Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

							//entities should be sorted
							var arr = [];
							var newEntityCollection = source.EmpsDS.getEntityCollection();
								newEntityCollection.forEach({ 
										'onSuccess': function(event){
											var age = event.entity.age.getValue();
											arr.push(age);
										}
									});

									for (var i = 0; i < arr.length - 1; i += 1) {
										if (arr[i + 1] > arr[i]) {
											Y.Assert.fail("KeepOrderBy with desc logic fails !");
										}
									}

								});							
					},
					'onError': function(error){
						testRunner.resume(function(){ 
							Y.Assert.fail("Async call to query fails !");
						});	
						}
						});
					},
					'onError' :
					function(error){
						testRunner.resume(function(){ 
							Y.Assert.fail("Async call to query fails !");
						});	
						}
					});
				}, 50);
			testRunner.wait();		
		},
		
		/**
 		 * SDQ-9.1 filterQuery method with orderBy desc
 		 */
		testFilterQueryKeepOrderByDescLogic: function () {
			var testRunner = this ;

			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			var onCollectionChangeHandler = function onCollectionChangeHandler(event){
				onCollectionChangeFlag = true ;
			}

			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);
			//source.EmpsDS.query("salary > 45000",{orderBy : "age"});
			
			
			//method call
			window.setTimeout(function () 
			{
				source.EmpsDS.query("salary > 45000",
			{ 
				orderBy : 'age desc',
				'onSuccess' : function(event){
					
					
					
					var entityCollection = source.EmpsDS.getEntityCollection();
					
					source.EmpsDS.filterQuery("salary > 45000",
						{
							keepOrderBy : true,
							'onSuccess': function(event){
							testRunner.resume(function(){ 
									//onCollectionChange event should occur
							Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

							//entities should be sorted
							var arr = [];
							var newEntityCollection = source.EmpsDS.getEntityCollection();
								newEntityCollection.forEach({ 
										'onSuccess': function(event){
											var age = event.entity.age.getValue();
											arr.push(age);
										}
									});

									for (var i = 0; i < arr.length - 1; i += 1) {
										if (arr[i + 1] > arr[i]) {
											Y.Assert.fail("KeepOrderBy with desc logic fails !");
										}
									}

								});							
					},
					'onError': function(error){
						testRunner.resume(function(){ 
							Y.Assert.fail("Async call to query fails !");
						});	
						}
						});
					},
					'onError' :
					function(error){
						testRunner.resume(function(){ 
							Y.Assert.fail("Async call to query fails !");
						});	
						}
					});
				}, 50);
			testRunner.wait();		
		},
		
		/**
 		 * SDQ-9.2 allEntities method with orderBy desc
 		 */
		testAllEntitieswithKeepOrderByDescLogic: function () {
			var testRunner = this ;

			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			var onCollectionChangeHandler = function onCollectionChangeHandler(event){
				onCollectionChangeFlag = true ;
			}

			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);
			//source.EmpsDS.query("salary > 45000",{orderBy : "age"});
			
			
			//method call
			window.setTimeout(function () 
			{
				source.EmpsDS.allEntities(
			{ 
				orderBy : 'age desc',
				'onSuccess' : function(event){
									
					source.EmpsDS.allEntities(
						{
							keepOrderBy : true,
							'onSuccess': function(event){
							testRunner.resume(function(){ 
									//onCollectionChange event should occur
							Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

							//entities should be sorted
							var arr = [];
							var newEntityCollection = source.EmpsDS.getEntityCollection();
								newEntityCollection.forEach({ 
										'onSuccess': function(event){
											var age = event.entity.age.getValue();
											arr.push(age);
										}
									});

									for (var i = 0; i < arr.length - 1; i += 1) {
										if (arr[i + 1] > arr[i]) {
											Y.Assert.fail("KeepOrderBy with desc logic fails !");
										}
									}

								});							
							},
							'onError': function(error){
								testRunner.resume(function(){ 
									Y.Assert.fail("Async call to query fails !");
								});	
								}
								});
					},
				'onError' :
					function(error){
						testRunner.resume(function(){ 
							Y.Assert.fail("Async call to query fails !");
						});	
						}
					});
				}, 50);
			testRunner.wait();		
		},
		
		/**
 		 * SDQ-9.3 allEntities method with orderBy asc
 		 */
		testAllEntitieswithKeepOrderByAscLogic: function () {
			var testRunner = this ;

			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			var onCollectionChangeHandler = function onCollectionChangeHandler(event){
				onCollectionChangeFlag = true ;
			}

			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);
			//source.EmpsDS.query("salary > 45000",{orderBy : "age"});
			
			
			//method call
			window.setTimeout(function () 
			{
				source.EmpsDS.allEntities(
			{ 
				orderBy : 'age asc',
				'onSuccess' : function(event){
									
					source.EmpsDS.allEntities(
						{
							keepOrderBy : true,
							'onSuccess': function(event){
							testRunner.resume(function(){ 
									//onCollectionChange event should occur
							Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

							//entities should be sorted
							var arr = [];
							var newEntityCollection = source.EmpsDS.getEntityCollection();
								newEntityCollection.forEach({ 
										'onSuccess': function(event){
											var age = event.entity.age.getValue();
											arr.push(age);
										}
									});

									for (var i = 0; i < arr.length - 1; i += 1) {
										if (arr[i + 1] < arr[i]) {
											Y.Assert.fail("KeepOrderBy with desc logic fails !");
										}
									}

								});							
							},
							'onError': function(error){
								testRunner.resume(function(){ 
									Y.Assert.fail("Async call to query fails !");
								});	
								}
								});
					},
				'onError' :
					function(error){
						testRunner.resume(function(){ 
							Y.Assert.fail("Async call to query fails !");
						});	
						}
					});
				}, 50);
			testRunner.wait();		
		},
        
        /**
 		 * SDQ-9.2 filterQuery method with fromInitialQuery option
 		 */	
 		 
 		 testFilterQueryFromInitialQuery : function(){
 		 	var testRunner = this;
 		 	
 		 	var initialEntityCollection = source.CompaniesDS.getEntityCollection();
 		 	var lastElt = source.CompaniesDS.length - 1;
 		 	source.CompaniesDS.select(lastElt);
 		 	var idQuired = source.CompaniesDS.ID + 1;
 		 	var initialIds = [];
 		 	var newEntityCollection = initialEntityCollection.query("ID <= :1",
 		 	{
 		 		params : [idQuired],
 		 		'onSuccess':function(event){ 		 			
					newEntityCollection.forEach({ 
					'onSuccess': function(event){
						var id = event.entity.ID.getValue();
						initialIds.push(id);
					}
					});
 		 	 	}
 		 	});
 		 					
 		 	//method call
			window.setTimeout(function () {
				source.CompaniesDS.filterQuery("ID >= "+idQuired - 1,
				{
					'onSuccess': function(event){
						source.CompaniesDS.filterQuery("ID <= :1",
						{
							fromInitialQuery : true,
							params : [idQuired],
							'onSuccess': function(event){
								testRunner.resume(function(){ 
								var entityCollection = source.CompaniesDS.getEntityCollection();
								var ids_array = [];
								entityCollection.forEach({ 
									'onSuccess': function(event){
										var id = event.entity.ID.getValue();
										ids_array.push(id);
									}
								});
													
								Y.ArrayAssert.itemsAreSame(initialIds,ids_array,"The values should be the same ! ");
							});
								
							},
							'onError': function(event){
								testRunner.resume(function(){ 
									Y.Assert.fail("Async call to query fails !");
								});	
							}
						});
					},
					'onError': function(event){
						testRunner.resume(function(){ 
							Y.Assert.fail("Async call to query fails !");
						});	
					}
				});
			}, 50);
			testRunner.wait();	
			
 		 }
};