var testCase = {
		name : "Entity Collection",

		/**
		 * E-27. test of WAF.EntityCollection exists
		 */
		testECWAFEntityCollection : function() {
			Y.Assert.areNotSame("undefined", typeof WAF.EntityCollection,
			"WAF.EntityCollection is undefined");
			Y.Assert.areSame("function", typeof WAF.EntityCollection,
			"WAF.EntityCollection is not a function");
		},

		/**
		 * E-28. test of Length Existance and Logic
		 */
		testECLengthExistAndLogic : function() {
			var testRunner = this;
			var entityCollection = ds.City
			.query(
					"",
					{
						'onSuccess' : function(event) {
							testRunner
							.resume(function() {
								Y.Assert
								.areNotSame(
										"undefined",
										typeof event.entityCollection.length,
								"EntityCollection.length is undefined");
								Y.Assert
								.areSame(
										"number",
										typeof event.entityCollection.length,
								"EntityCollection.length should be an attribute");
								Y.Assert
								.areSame(
										4,
										event.entityCollection.length,
								"the value of EntityCollection.length "+event.entityCollection.length+" is not match to the value expected !");
							});
						},
						'onError' : function(error) {
							testRunner
							.resume(function() {
								Y.Assert
								.fail("No EntityCollection returned");
							});
						}
					});
			testRunner.wait();
		},

		/**
		 * E-29. test of add Exist
		 */

		testECAddExist : function() {
			var testRunner = this;
			var entityCollection = ds.City.query("", {
				'onSuccess' : function(event) {
					testRunner.resume(function() {
						Y.Assert.areNotSame("undefined",
								typeof event.entityCollection.add,
						"add should be defined");
						Y.Assert.areSame("function",
								typeof event.entityCollection.add,
						"add should be a function");
					});
				},
				'onError' : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("No EntityCollection returned");
					});
				}
			});
			testRunner.wait();
		},

		/**
		 * E-30. test of add logic
		 */

		testECAddLogic : function() {
			var testRunner = this;
			var entityCollection = ds.City.query( "",
					{
				'onSuccess' : function(event) {
					testRunner.resume(function() {
						var city = new WAF.Entity(ds.City);
						city.ID.setValue(entityCollection.length+1); 
						city.name.setValue("Rabat");
						city.pop.setValue(2000000);

						var oldLength=entityCollection.length;
						entityCollection.add(city);
						var newLength=entityCollection.length;

						Y.Assert.areSame(4, oldLength,"the oldLength not match 6"); 				 
						Y.Assert.areSame(5,newLength,"the newLength is different to 7 after adding an entity");
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
		 * E-31. test of Method Call logic : using direct call
		 */

		testECMethodCallDirectCall : function() {
			var testRunner = this;
			var entityCollection = ds.City;

								Y.Assert
								.areNotSame(
										"undefined",
										typeof entityCollection.methodEntitySet,
								"methodEntitySet is undefined");
								Y.Assert
								.areSame(
										"function",
										typeof entityCollection.methodEntitySet,
								"methodEntitySet is not a function");
								entityCollection
								.methodEntitySet({
									'onSuccess' : function(
											event) {
										testRunner
										.resume(function() {
											Y.Assert
											.areSame(
													"EntitySet",
													event.result);
										});
									},
									'onError' : function(
											error) {
										testRunner
										.resume(function() {
											Y.Assert
											.fail("EntitySet method call failed !");
										});
									}
								});
							
						
						
					
			
		},

		/**
		 * E-32. test of Method Call logic : using callMethod
		 */
/* 		testECMethodCall2 : function() {
			var testRunner = this;
			var entityCollection = ds.City
			.query(
					"",
					{
						'onSuccess' : function(event) {
							testRunner
							.resume(function() {

								Y.Assert
								.areNotSame(
										"undefined",
										typeof entityCollection.callMethod,
								"callMethod is undefined");
								Y.Assert
								.areSame(
										"function",
										typeof entityCollection.callMethod,
								"callMethod is not a function");
								entityCollection
								.callMethod({
									'method' : "methodEntitySet",
									'onSuccess' : function(
											event) {
										testRunner
										.resume(function() {
											Y.Assert
											.areSame(
													"EntitySet",
													event.result);
										});
									},
									'onError' : function(
											error) {
										testRunner
										.resume(function() {
											Y.Assert
											.fail("EntitySet method call failed !");
										});
									}
								});
								testRunner.wait();
							});
						},
						'onError' : function(error) {
							testRunner.resume(function() {

								Y.Assert.fail("Query fails ");
							});
						}
					});
			testRunner.wait();
		},
 */
		/**
		 * E-33. test of distinctValues exists
		 */
		testECDistinctValuesExists : function() {
			var testRunner = this;
			var entityCollection = ds.City.query("", {
				'onSuccess' : function(event) {
					testRunner.resume(function() {
						Y.Assert.areNotSame("undefined",
								typeof entityCollection.distinctValues,
						"distinctValues is undefined");
						Y.Assert.areSame("function",
								typeof entityCollection.distinctValues,
						"distinctValues is not a function");
					});
				},
				'onError' : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("No EntityCollection returned");
					});
				}
			});
			testRunner.wait();
		},

		/**
		 * E-34. test of distinctValues Logic two call back methods
		 */
		testECDistinctValuesLogicTwoCallBackMethod : function() {
			var testRunner = this;
			var entityCollection = ds.City.query("", {
				'onSuccess' : function(event) {
					testRunner.resume(function() {
						entityCollection.distinctValues("pop",{
							'onSuccess' : function(event) {
								testRunner.resume(function() {					 
									for (var i = 0; i < event.result.length; i++)   														 
									{                 
									for (var j = 0; j < event.result.length; j++){           
										if(event.result[j]== event.result[i] && i!=j ){              
											Y.Assert.fail("Duplicated value found");
										}
									}
									} 
										var buff = [];

									for(var m=0;m<   event.result.length;m++)
									{
										buff.push(event.result[m]);

									} 
									Y.ArrayAssert.itemsAreEqual([2000000,250000,4000000], buff,"the values in the distinctValues collection is incorrect");
                            });
							},
							'onError' : function(error) {
								testRunner.resume(function() {
									Y.Assert.fail("No Entity Set returned");
								});
							}
						});
					});
				},
				'onError' : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("No EntityCollection returned");
					});
				}
			});
			testRunner.wait();
		},


		/**
		 * E-35. test of ForEach existance
		 */
		testECForEachExist : function() {
			var testRunner = this;
			var entityCollection = ds.City.query("", {
				'onSuccess' : function(event) {
					testRunner.resume(function() {
						Y.Assert.areNotSame("undefined",
								typeof event.entityCollection.forEach,
						"forEach should be defined");
						Y.Assert.areSame("function",
								typeof event.entityCollection.forEach,
						"forEach should be a function");
					});
				},
				'onError' : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("No EntityCollection returned");
					});
				}
			});
			testRunner.wait();
		},

		/**
		 * E-36. test of ForEach Logic Three Call Back Methods
		 */
		testECForEachLogicThreeCallBackMethods : function() {
			var testRunner = this;
			var entityCollection = ds.Company.query("", {
				'onSuccess' : function(event) {
					testRunner.resume(function() {
						var i = 0;
						var keys = [];
						entityCollection.forEach({
							'onSuccess' : function(event) {
								i++;
								keys.push(event.entity.ID.getValue());
							},
							'onError' : function(error) {
								Y.Assert.fail("failed to achieve foreach");
							},
							'atTheEnd' : function(event) {

								Y.Assert.areSame(i, entityCollection.length);
								// Y.ArrayAssert.itemsAreEqual([ 1, 2, 3, 4, 5, 6, 7 ],
										// keys);
							}
						});
						// Y.Assert.areSame(7, i);
						// testRunner.wait( );

					});
				},
				'onError' : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("No EntityCollection returned");
					});
				}
			});
			testRunner.wait();
		}, 

		/**
		 * E-37. test of getDataClass exists
		 */
		testECGetDataClassExists : function() {
			var testRunner = this;
			var entityCollection = ds.City
			.query(
					"",
					{
						'onSuccess' : function(event) {
							testRunner
							.resume(function() {
								Y.Assert
								.areNotSame(
										"undefined",
										typeof event.entityCollection.getDataClass,
								"EntityCollection.getDataClass should be defined");
								Y.Assert
								.areSame(
										"function",
										typeof event.entityCollection.getDataClass,
								"EntityCollection.getDataClass should be a function");
							});
						},
						'onError' : function(error) {
							testRunner
							.resume(function() {
								Y.Assert
								.fail("No EntityCollection returned");
							});
						}
					});
			testRunner.wait();
		},

		/**
		 * E-38. test of getDataClass logic
		 */

		testECGetDataClassLogic : function() {
			var testRunner = this;
			var entityCollection = ds.City.query("", {
				'onSuccess' : function(event) {
					testRunner.resume(function() {
						var dataClass = event.entityCollection.getDataClass();
						Y.Assert.areNotSame("undefined", typeof dataClass,
						"model should be defined");
						Y.Assert.areSame("object", typeof dataClass,
						"modell should be an object");
						Y.Assert.areSame("City", dataClass.getName());
					});
				},
				'onError' : function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("No EntityCollection returned");
					});
				}
			});
			testRunner.wait();
		},

		/**
		 * E-39. test of getEntity exists and logic
		 */
	 testECGetEntityLogic : function() {
		var testRunner = this;
		window.setTimeout(function () {
			var entityCollection = ds.Emp.query("salary > 50000", {
				onSuccess: function(event) {
					testRunner.resume(function() {
						Y.Assert.areSame(9,event.entityCollection.length);
						Y.Assert.areNotSame("undefined",typeof event.entityCollection.query,"query should be defined");
						Y.Assert.areSame("function",typeof event.entityCollection.query,"query should be a function");
						window.setTimeout(function () {
							var entity = event.entityCollection.getEntity(1, {
								'onSuccess': function(event) {
									testRunner.resume(function() {
										var entity = event.entity;
										Y.Assert.areNotSame("undefined",typeof entity,"entity should be defined");
										Y.Assert.areSame("object",typeof entity,"entity should be an object");
										Y.Assert.areSame(true,entity instanceof WAF.Entity,"entity should be an instance of Entity Class");
										Y.Assert.isTrue(entity.salary.getValue() > 50000);
									});
								},
								'onError': function(error) {
									testRunner.resume(function() {
										Y.Assert.fail("No Entity returned: " + JSON.stringify(error));
									});
								}
							});
						}, 1000);
						testRunner.wait();
				   });
					 
				},
				onError: function(error) {
					testRunner.resume(function() {
						Y.Assert.fail("No Entity Set returned: " + JSON.stringify(error));
					});	 
				}
			});
		}, 1000);
		testRunner.wait();
	},
		

		/**
		 * E-40. test of orderBy exists
		 */

		testEntityCollectionOrderBy : function() {
			var testRunner = this;
			var entityCollection = ds.City
			.query(
					"",
					{
						'onSuccess' : function(event) {
							testRunner
							.resume(function() {
								Y.Assert
								.areNotSame(
										"undefined",
										typeof event.entityCollection.orderBy,
								"EntityCollection.orderBy should be defined");
								Y.Assert
								.areSame(
										"function",
										typeof event.entityCollection.orderBy,
								"EntityCollection.orderBy  should be an attribute");
							});
						},
						'onError' : function(error) {
							testRunner
							.resume(function() {
								Y.Assert
								.fail("No EntityCollection returned");
							});
						}
					});
			testRunner.wait();
		},

		/**
		 * E-41. test of orderBy logic
		 */
		testECOrderByLogic : function() {
			var testRunner = this;
			var entityCollection = ds.Emp.query( "",
					{
				'onSuccess' : function(event) {
					testRunner .resume(function() {
						entityCollection .orderBy("salary desc",
								{
							'onSuccess' : function( event) {
								testRunner .resume(function() {

									var arr = [];

									var sortedEntityCollection = event.entityCollection;
									sortedEntityCollection .forEach({
										'onSuccess' : function( event) {
											var salary = event.entity.salary .getValue();

											arr.push(salary);
										}
									});
									for ( var i = 0; i < arr.length - 1; i += 1) {
										if (arr[i + 1] > arr[i]) {
											Y.Assert  .fail("OrderBy logic fails !");
										}
									}

								});
							},
							'onError' : function( error) {
								testRunner 	.resume(function() {
									Y.Assert .fail("OrderBy Async Call fails !");
								});
							}
								});
						testRunner.wait();
						// Y.Assert.areSame("function",
						// entitySet.distinctValues);
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
		 * E-42. test of query logic
		 */

		testECObjectUsingQuery : function() {
			var testRunner = this;
			var entityCollection = ds.Emp
			.query(
					"",
					{
						onSuccess : function(event) {
							testRunner
							.resume(function() {
								entityCollection = event.entityCollection;
								Y.Assert
								.areNotSame(
										"undefined",
										typeof entityCollection,
								"entityCollection is undefined");
								Y.Assert
								.areSame(
										"object",
										typeof entityCollection,
								"entityCollection is not an object");
								Y.Assert
								.areSame(
										true,
										entityCollection instanceof WAF.EntityCollection,
										"entityCollection is not an instance of EntityCollection");
							});
						},
						onError : function(error) {
							testRunner
							.resume(function() {
								Y.Assert
								.fail("No EntityCollection returned");
							});
						}
					}, this);
			testRunner.wait();

		},

		/**
		 * E-43. test of toArray Exist
		 */

		testECToArrayExists : function() {
			var testRunner = this;
			var entityCollection = ds.City
			.query(
					"",
					{
						'onSuccess' : function(event) {
							testRunner
							.resume(function() {
								Y.Assert
								.areNotSame(
										"undefined",
										typeof event.entityCollection.toArray,
								"EntityCollection.toArray should be defined");
								Y.Assert
								.areSame(
										"function",
										typeof event.entityCollection.toArray,
								"EntityCollection.toArray  should be an attribute");
							});
						},
						'onError' : function(error) {
							testRunner
							.resume(function() {
								Y.Assert
								.fail("No EntityCollection returned");
							});
						}
					});
			testRunner.wait();
		},

		/**
		 * E-44. test of toArray Logic, empty string
		 */
		testECToArrayLogicEmptyString : function() {
			var testRunner = this;

			ds.City.query("", {
				'onSuccess' : function(event) {
					testRunner.resume(function(){
						//console.log(event.entityCollection.length);
						event.entityCollection.toArray("",{
							'onSuccess':function(event){
								testRunner.resume(function(){
									var keys = [];

									for(var i=0;i<   event.result.length;i++)
									{
										keys.push(event.result[i].name);

									}
									Y.ArrayAssert.itemsAreEqual([ "Paris", "Cupertino", "New York","Palo Alto"], keys,"error whene parsing related values"); 

								});
							},
							'onError':function(error){
								testRunner.resume(function() {
									Y.Assert .fail("cannot achiev toArray function");
								});
							}
						});
						testRunner.wait();
					});
				},
				'onError':function(error){
					testRunner.resume(function() {
						Y.Assert .fail("cannot achiev toArray function");
					});
				}
			});
			testRunner.wait();
		},

		/**
		 * E-45. test of toArray Logic, simple attribut
		 */
		testECToArrayLogicSimpleAttribut : function() {
			var testRunner = this;

			ds.City.query("", {
				'onSuccess' : function(event) {
					testRunner.resume(function(){
						//console.log(event.entityCollection.length);
						event.entityCollection.toArray("name",{
							'onSuccess':function(event){
								testRunner.resume(function(){
									var keys = [];

									for(var i=0;i<   event.result.length;i++)
									{
										keys.push(event.result[i].name);

									}
									Y.ArrayAssert.itemsAreEqual([ "Paris", "Cupertino", "New York","Palo Alto"], keys,"error whene parsing related values"); 

								});
							},
							'onError':function(error){
								testRunner.resume(function() {
									Y.Assert .fail("cannot achiev toArray function");
								});
							}
						});
						testRunner.wait();
					});
				},
				'onError':function(error){
					testRunner.resume(function() {
						Y.Assert .fail("cannot achiev toArray function");
					});
				}
			});
			testRunner.wait();
		},

		/**
		 * E-46. test of toArray Logic, related attribut and list of
		 * attributs
		 */
		testECToArrayLogicRelatedAttributAndListOfAttributs : function() { 
			var testRunner = this;

			ds.City.query("", {
				'onSuccess' : function(event) {
					testRunner.resume(function(){
						//console.log(event.entityCollection.length);
						event.entityCollection.toArray("name,companies:2",{
							'onSuccess':function(event){
								testRunner.resume(function(){

									var keys = [];
									for(var i=0;i< event.result.length;i++)
									{
										if(event.result[i].companies.length!=0)
										{
											for(var j=0;j<event.result[i].companies.length;j++)
											{

												keys.push(  event.result[i].companies[j].name);
											} 
										} 
									}

									Y.ArrayAssert.itemsAreEqual([ "4D", "EDF", "Apple","ACME","microsoft","Google"], keys,"error whene parsing related values"); 

								});
							},
							'onError':function(error){
								testRunner.resume(function() {
									Y.Assert .fail("cannot achiev toArray function");
								});
							}
						});
						testRunner.wait();
					});
				},
				'onError':function(error){
					testRunner.resume(function() {
						Y.Assert .fail("cannot achiev toArray function");
					});
				}
			});
			testRunner.wait();
		}



};