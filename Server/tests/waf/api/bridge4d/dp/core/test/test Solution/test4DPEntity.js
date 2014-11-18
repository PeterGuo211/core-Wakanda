var testCase = {
		name: "Entity",

		/*
		 * 
		 * /** E-01. test of Entity Object exists asynch
		 */

		/*
		 * 
		 * testEntityExistsAsync: function () { var testRunner = this; var employee =
		 * ds.Emp.getEntity(1, { 'onSuccess': function(event){
		 * testRunner.resume(function(){ Y.Assert.areNotSame("undefined", typeof
		 * event.entity, "event.entity should be defined");
		 * Y.Assert.areSame("object", typeof event.entity , "event.entity should be
		 * an object"); Y.Assert.areSame(true, event.entity instanceof WAF.Entity,
		 * "event.entity should be an instance of Entity"); }); }, 'onError':
		 * function(error){ testRunner.resume(function(){ Y.Assert.fail("Entity not
		 * created"); }); } } ); testRunner.wait(); },
		 * 
		 */

		/**
		 * E-02. test of Entity Object exists synch
		 */
		/*
		 * Bug--->>>>// 7. test of Entity Object exists synch//
		 * testEntityExistsSync: function () { var employee = ds.Emp.getEntity(1);
		 * Y.Assert.areNotSame("undefined", typeof employee, "employee entity should
		 * be defined"); Y.Assert.areSame("object", typeof employee , "employee
		 * entity should be an object"); Y.Assert.areSame(true, employee instanceof
		 * WAF.Entity, "employee entity should be an instance of Entity"); },
		 */


		/**
		 * E-03. test of Entity Method Call Logic : using direct call
		 */

/* 		testEntityCallMethodDirectCall: function () {
		var testRunner = this;
		var entity = window.setTimeout(function () {
			ds.City.getEntity(1,
			{
				'onSuccess': function(event){
					 testRunner.resume(function(){ 
						 entity = event.entity;
						Y.Assert.areNotSame("undefined",typeof entity, "Undefined entity");
						Y.Assert.areNotSame("undefined",typeof entity.methodEntity, "Undefined Entity.methodEntity");
						Y.Assert.areSame("function",typeof entity.methodEntity, "Entity.methodEntity is not a function");
						entity.methodEntity({
							'onSuccess' : function(event){
							  testRunner.resume(function(){ 
							 		Y.Assert.areSame("Entity", event.result);
								});
							},
							'onError' : function(error){
							  	testRunner.resume(function(){ 
								  	Y.Assert.fail("Entity method call failed !");
								 });
							}		
						});
						testRunner.wait();
					});
				},
				'onError': function(error){
				  testRunner.resume(function(){ 
					 Y.Assert.fail("Get Entity fails !");
					});	
				}
			}
		); }, 1000);
		 
		testRunner.wait();
    } , */
      /*   testEntityCallMethodDirectCallSetTimeOutonEveryResume: function () {
		var testRunner = this;
		var entity = window.setTimeout(function () {
			ds.City.getEntity(1,
			{
				'onSuccess': function(event){
				 
					window.setTimeout(function () {
					testRunner.resume(function(){ 
					 
				 
						entity = event.entity;
						Y.Assert.areNotSame("undefined",typeof entity, "Undefined entity");
						Y.Assert.areNotSame("undefined",typeof entity.methodEntity, "Undefined Entity.methodEntity");
						Y.Assert.areSame("function",typeof entity.methodEntity, "Entity.methodEntity is not a function");
						entity.methodEntity({
							'onSuccess' : function(event){
								 
								testRunner.resume(function(){ 
									 
									
									Y.Assert.areSame("Entity", event.result);
								});
							},
							'onError' : function(error){
								 
								testRunner.resume(function(){ 
								 
								   
									Y.Assert.fail("Entity method call failed !");
									 
								});
							}		
						});
						testRunner.wait();
					});},1000);
			testRunner.wait();
			},
				'onError': function(error){
					 
					window.setTimeout(function () {
					testRunner.resume(function(){ 
					 	 
					 	
						Y.Assert.fail("Get Entity fails !");
					});	},1000);
			testRunner.wait();
			}
			}
		); }, 1000);
		 
		testRunner.wait();
    }, */

		/**
		 * E-04. test of Entity Method Call Logic : using callMethod
		 */

/* 		testEntityCallMethod: function () {
			var testRunner = this ;
			window.setTimeout(function () {
				var entity = ds.City.getEntity(1, {
					onSuccess: function(event){
						testRunner.resume(function(){ 
							entity = event.entity; 
							Y.Assert.areNotSame("undefined", typeof entity, "Undefined entity");
							Y.Assert.areNotSame("undefined", typeof entity.callMethod, "Undefined Entity.callMethod");
							Y.Assert.areSame("function", typeof entity.callMethod, "Entity.callMethod is not a function");
							entity.callMethod({
								'method' : "methodEntity",
								onSuccess : function(event){
									testRunner.resume(function(){ 
										Y.Assert.areSame("Entity", event.result);
									});
								},
								onError : function(error){
									testRunner.resume(function(){ 
										Y.Assert.fail("Entity method call failed !");
									});
								}		
							});
							testRunner.wait();
						});
					},
					onError: function(error){
						testRunner.resume(function(){ 
							Y.Assert.fail("Get Entity fails: " + JSON.stringify(error));
						});	
					}
				});
			}, 500);
			testRunner.wait();
		}, */


		/**
		 * E-05. test of getDataClass exists
		 */

		testEntityGetDataClassExists: function () {
			var entity = new WAF.Entity(ds.City); 
			Y.Assert.areNotSame("undefined", typeof entity.getDataClass,"entity.getDataClass is undefined");
			Y.Assert.areSame("function", typeof entity.getDataClass,"entity.getDataClass is not a function");

		},


		/**
		 * E-06. test of getDataClass Logic
		 */

		testEntityGetDataClassLogic: function () {
			var entity = new WAF.Entity(ds.City); 
			Y.Assert.areNotSame("undefined", typeof entity.getDataClass,"entity.getDataClass is undefined");
			Y.Assert.areSame("function", typeof entity.getDataClass,"entity.getDataClass failed to return an object");
			Y.Assert.areSame("City", entity.getDataClass().getName(),"entity.getDataClass().getName() dont return the apropriate value");
		},


		/**
		 * E-07. test of getKey Exists
		 */

		testEntityGetKeyExists: function () {
			var entity = new WAF.Entity(ds.City); 
			Y.Assert.areNotSame("undefined", typeof entity.getKey,"getKey is undefined ");
			Y.Assert.areSame("function", typeof entity.getKey,"getKey is not a function");

		},


		/**
		 * E-08. test of getKey Logic
		 */

/* 		testEntityGetKeyLogic: function () {
			var testRunner = this ;
			var entityCollection = ds.City.query('ID = 2',
					{
				'onSuccess': function(event){
					testRunner.resume(function(){ 
						var entity= event.entityCollection.getEntity(0,
								{
							onSuccess: function(event){

								var entity = event.entity ;
								Y.Assert.areSame("Cupertino", entity.name.getValue(), "Retrieved Entity doesn't match the query !");
								Y.Assert.areEqual(2, entity.getKey());	

							},
							onError: function(error){

								Y.Assert.fail("No Entity returned");	
							}
								}							
						);
					});
				},
				'onError': function(error){
					testRunner.resume(function(){ 
						Y.Assert.fail("No Entity Set returned");
					});	
				}
					}
			);	
			testRunner.wait();
		},
 */

		/**
		 * E-09. test of getStamp exists
		 */

		testEntityGetStampExists: function () {
			var entity = new WAF.Entity(ds.City); 
			Y.Assert.areNotSame("undefined", typeof entity.getStamp,"getStamp is undefined");
			Y.Assert.areSame("function", typeof entity.getStamp,"getStamp is not a function");
		},

		/**
		 * E-10. test of getStamp Logic default
		 */

/* 		testEntityGetStampLogicDefault: function () {
			var testRunner = this ;
			window.setTimeout(function () {
				var city = ds.City.getEntity(2, {
					onSuccess: function(event){
						testRunner.resume(function(){ 
							var city = event.entity ;
							Y.Assert.areSame(2, city.ID.getValue(), "Retrieved Entity doesn't match the query !");
							Y.Assert.areEqual(1, city.getStamp());	
						});					
					},
					onError: function(error){
						testRunner.resume(function(){ 
							Y.Assert.fail("No Entity returned: " + JSON.stringify(error));	
						});
					}
				});
			}, 500);
			testRunner.wait();
		}, */


		/**
		 * E-11. test of getStamp Logic : when save
		 */

		testEntityGetStampLogicSave: function () {
			var testRunner = this ;
			
			var lastElt = source.City.length - 1;
 		 	source.CitiesDS_.select(0);
 		 	var idQuired = source.CitiesDS_.ID + 2;
 		 	
			window.setTimeout(function () {
				var city = ds.City.getEntity(idQuired, {
					onSuccess: function(event){
						testRunner.resume(function(){ 
							var city = event.entity ;
							Y.Assert.areSame("New York", city.name.getValue(), "Retrieved Entity doesn't match the query !");
							var stamp = city.getStamp();
							city.pop.setValue(city.pop.getValue() + 1);					
							city.save({
								onSuccess: function(event){
									testRunner.resume(function(){ 
										Y.Assert.areSame(stamp + 1, city.getStamp(), "Stamp should be incremented after save !");
									});
								},
								onError: function(error){
									testRunner.resume(function(){ 
										Y.Assert.fail("Entity not saved: " + JSON.stringify(error));
									});
								}		
							});
							testRunner.wait();
						});
					},
					onError: function(error){
						testRunner.resume(function(){ 
							Y.Assert.fail("No Entity returned: " + JSON.stringify(error));
						});
					}
				});
			}, 500);
			testRunner.wait();
		},


		/**
		 * E-12. test of isNew exists
		 */

		testEntityIsNewExists: function () {
			var entity = new WAF.Entity(ds.City); 
			Y.Assert.areNotSame("undefined", typeof entity.isNew,"isNew is undefined");
			Y.Assert.areSame("function", typeof entity.isNew,"isNew is not a function");

		},



		/**
		 * E-13. test of isNew and save Logic
		 */
		testEntitySaveAndIsNewLogic: function () {
			var testRunner = this ;
			var city = new WAF.Entity(ds.City); 
			city.name.setValue("Madrid"); 
			city.pop.setValue(5000000);
			Y.Assert.isTrue(city.isNew(), 'Entity isNew() should return True');
			city.save({
				'onSuccess' : function(event){
					testRunner.resume(function(){ 
						;
						Y.Assert.areSame("Madrid", event.entity.name.getValue());
						Y.Assert.areSame(5000000, event.entity.pop.getValue());
						Y.Assert.isFalse(city.isNew(), 'Entity isNew() should returne False');
					});
				},
				'onError' : function(error){
					testRunner.resume(function(){ 

						Y.Assert.fail("Entity not saved !");
					});
				}		
			});
			testRunner.wait();
		},

		/**
		 * E-14. test of isTouched exists
		 */

		testEntityIsTouchedExists: function () {
			var entity = new WAF.Entity(ds.City); 
			Y.Assert.areNotSame("undefined", typeof entity.isTouched,"entity.isTouched is undefined");
			Y.Assert.areSame("function", typeof entity.isTouched,"entity.isTouched is not a function");

		},

		/**
		 * E-15. test of isTouched + touch Logic
		 */
		testEntityIsTouchedAndTouchLogic: function () {

			ds.City.query("id > 2 and id < 4", {  onSuccess:function(event)

				{
				var myset = event.entityCollection;   
				myset.getEntity(0, { onSuccess:function(event)   

					{
					var myEntity = event.entity;
					Y.Assert.areSame("New York",myEntity.name.getValue(),"the value of name of entity retrived not match the correct value New York");
					Y.Assert.areSame("false",myEntity.isTouched(),"the isTouched must be false but it is true");
					myEntity.touch() ;
					Y.Assert.areSame("true",myEntity.isTouched(),"the isTouched must be true but it is false");
					} });
				}});


		},


		/* * testEntityIsTouchedAndTouchLogic: function () { var testRunner = this ;
		 * var entitySet = ds.City.query("id = 2", { 'onSuccess':
		 * function(event){ testRunner.resume(function(){ var city=
		 * event.entityCollection.getEntity(0, { 'onSuccess': function(event){
		 * console.log("GetEntity onSuccess"); var city = event.entity ;
		 * Y.Assert.areSame("tanger", city.name.getValue(), "Retrieved Entity
		 * doesn't match the query !"); Y.Assert.areNotSame("undefined",
		 * city.isTouched()); Y.Assert.isFalse(city.isTouched()); var newpop =
		 * city.pop.getValue()+1; city.pop.setValue(newpop);
		 * Y.Assert.isTrue(city.isTouched()); city.save({ 'onSuccess' :
		 * function(event){ testRunner.resume(function(){ console.log("Entity
		 * saved !"); Y.Assert.areSame(2, city.ID.getValue());
		 * Y.Assert.areSame("tanger", city.name.getValue());
		 * Y.Assert.areSame(newpop, city.pop.getValue());
		 * Y.Assert.isFalse(city.isTouched(), 'Entity isTouched() should return
		 * False'); city.save({ 'onSuccess' : function(event){
		 * testRunner.resume(function(){ console.log("Entity saved !");
		 * Y.Assert.fail("Entity should not be saved when not touched!"); }); },
		 * 'onError' : function(error){ testRunner.resume(function(){
		 * console.log("Entity not saved : OK !"); }); } }); testRunner.wait();
		 * city.touch(); Y.Assert.isTrue(city.isTouched(), 'Entity isTouched()
		 * should return True'); }); }, 'onError' : function(error){
		 * testRunner.resume(function(){ console.log("Entity not saved !");
		 * Y.Assert.fail("Entity not saved !"); }); } }); testRunner.wait(); },
		 * 'onError': function(error){ console.log("GetEntity onFail");
		 * Y.Assert.fail("No Entity returned"); } } ); }); }, 'onError':
		 * function(error){ testRunner.resume(function(){ Y.Assert.fail("No
		 * Entity Set returned"); }); } } ); testRunner.wait(); },
		 */


		/**
		 * E-16. test of remove exists
		 */

		testEntityRemoveExists: function () {
			var city = new WAF.Entity(ds.City); 
			Y.Assert.areNotSame("undefined", typeof city.remove, "remove  is undefined") ;
			Y.Assert.areSame("function", typeof city.remove,"remove is not a function") ;
		}, 


		/**
		 * E-17. test of remove logic
		 */
/* 		testEntityRemoveLogic : function() {
			var testRunner = this;
			var entity = ds.City.getEntity(1,{
				onSuccess : function(event) {
					var entity = event.entity;
					var id = entity.ID.getValue();
					var name = entity.name.getValue();
					Y.Assert.areSame(1, id, "Retrieved Entity doesn't match the query (ID should be 1, not " + id + ")");
					Y.Assert.areSame("Paris", name, "Retrieved Entity doesn't match the query (name should be Paris, not " + name + ")");
					entity.remove({
						'onSuccess' : function(event) {
							testRunner.resume(function() {
								var employee = ds.City.getEntity(1,{	
									'onSuccess' : function(event) {
										testRunner.resume(function() {
											var entity = event.entity;
											var id = entity.ID.getValue()
											Y.Assert.fail("ds.City.getEntity should fail but returns the entity of ID " + id);
										});
									},
									'onError' : function(error) {
										testRunner.resume(function() {
											
										});
									}
								});
								testRunner.wait();
							});
						},
						'onError' : function(error) {
							testRunner.resume(function() {	
								Y.Assert.fail("Remove Entity fails: " + JSON.stringify(error));
							});
						}
					});
					testRunner.wait();
				},
				onError : function(error) {
					Y.Assert.fail("No Entity returned: " + JSON.stringify(error));
				}
			});
			testRunner.wait();
		}, */


		/**
		 * E-18. test of save exists
		 */

		testEntitySaveExists: function () {
			var entity = new WAF.Entity(ds.City); 
			Y.Assert.areNotSame("undefined", typeof entity.save,"save is undefined");
			Y.Assert.areSame("function", typeof entity.save,"save is not a function");

		},



		/**
		 * E-19. test of save Logic : Entity locking
		 */ 
		// testEntitySaveEntityLockLogic: function () {
			// var testRunner = this ;
			// var city;					
			// var city_ = ds.City.getEntity(3,
					// {
				// 'onSuccess': function(event){

					// city = event.entity ;
				// },
				// 'onError': function(error){

				// }
					// }							
			// );
			// var citybis;	
			// var citybis_ = ds.City.getEntity(3,
					// {
				// 'onSuccess': function(event){

					// citybis = event.entity ;					
				// },
				// 'onError': function(error){

				// }
					// }							
			// );
			// testRunner.wait(function(){
				// Y.Assert.areNotSame("undefined", typeof city);
				// Y.Assert.areNotSame("undefined", typeof citybis);

				// var stamp = city.getStamp();
				// var pop = city.pop.getValue() ;
				// city.pop.setValue(pop + 1);
				// citybis.pop.setValue(pop + 2);

				// Y.Assert.areNotSame(city.pop.getValue(), citybis.pop.getValue());
				// Y.Assert.areSame(city.getStamp(), citybis.getStamp());

				// city.save({
					// 'onSuccess' : function(event){
						// testRunner.resume(function(){

							// Y.Assert.areSame(stamp + 1, city.getStamp(), "Stamp should be incremented after this save !");
							// citybis.save({
								// 'onSuccess' : function(event){
									// testRunner.resume(function(){

										// Y.Assert.fail("Citybis Entity should not be saved !");
									// });
								// },
								// 'onError' : function(error){
									// testRunner.resume(function(){

										// Y.Assert.areSame(stamp, citybis.getStamp(), "Stamp should not be incremented after this save !");
									// });
								// }			
							// });

							// testRunner.wait();
						// });
					// },
					// 'onError' : function(error){
						// testRunner.resume(function(){

							// Y.Assert.fail("City Entity not saved !");
						// });
					// }		
				// });

				// testRunner.wait();

			// },
			// 10
			// );


		// },

		/**
		 * E-20. test of touch exists
		 */ 
		testEntityTouchExists: function () {
			var entity = new WAF.Entity(ds.City); 
			Y.Assert.areNotSame("undefined", typeof entity.touch,"touch is undefined");
			Y.Assert.areSame("function", typeof entity.touch,"touch is not a funtion");		
		} 

};