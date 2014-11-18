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
		name: "Server DataSource and Data Management",
		
        _should: {
            ignore: {
                
            }
        },
        
		/**
 		 * SD-00 isNewElement method exists
 		 */
		testIsNewElementExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.isNewElement);
			Y.Assert.areSame("function", typeof source.CitiesDS.isNewElement);
		},

		/**
 		 * SD-00 isNewElement method business logic
 		 */
		testIsNewElementLogic: function () {
			//Get the datasource length before method call
			var oldLength = source.CitiesDS.length ;

			//Move to the first element
			source.CitiesDS.select(0);

			//New flag should be set to false
			Y.Assert.areSame(false, source.CitiesDS.isNewElement(), "New flag should be set to false");

			//call the method
			source.CitiesDS.addNewElement();

			//length should be incremented
			var newLength = source.CitiesDS.length ;
			Y.Assert.areSame(newLength, oldLength + 1);

			//New flag should be set to true
			Y.Assert.areSame(true, source.CitiesDS.isNewElement(), "New flag should be set to true");

		},

		/**
 		 * SD-00 addNewElement method exists
 		 */
		testAddNewElementExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.addNewElement);
			Y.Assert.areSame("function", typeof source.CitiesDS.addNewElement);
		},

		/**
 		 * SD-00 addNewElement method business logic
 		 */
		testAddNewElementLogic: function () {
			var testRunner = this;

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
			source.CitiesDS.addNewElement();
				
			window.setTimeout(function () {
				testRunner.resume(function(){
					//length should be incremented
					var newLength = source.CitiesDS.length ;
					Y.Assert.areSame(newLength, oldLength + 1);
		
					//values should all be null
					Y.Assert.areSame(source.CitiesDS.ID, null, "entity value should be null");
					Y.Assert.areSame(source.CitiesDS.name, null, "entity value should be null");
					Y.Assert.areSame(source.CitiesDS.pop, null, "entity value should be null");
		
					//New flag should be set to true
					Y.Assert.areSame(true, source.CitiesDS.isNewElement(), "New flag should be set to true");
		
					//onCollectionChange event should occur
					Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");
					//onCurrentElementChange event should occur
					Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event did not occur !");
				});
			}, 500);
			testRunner.wait();	
		},

		/**
 		 * SD-00 serverRefresh method exists
 		 */
		testServerRefreshExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.serverRefresh);
			Y.Assert.areSame("function", typeof source.CitiesDS.serverRefresh);
		},

		/**
 		 * SD-00 serverRefresh method business logic
 		 */
		testServerRefreshLogic: function () {
			//add new element
			source.CitiesDS.addNewElement();

			var testRunner = this;
			window.setTimeout(function () {
				source.CitiesDS.serverRefresh(
					{
						onSuccess: function(event){
							testRunner.resume(function(){ 
								//Server logic should be called
								Y.Assert.areSame(5, source.CitiesDS.ID, "Server logic should be called");

								//nothing should be saved in the server
								window.setTimeout(function () {
									source.CitiesDS.query("ID=5",
											{
										'onSuccess': function(event){
											testRunner.resume(function(){ 
												//No entity should be returned
												Y.Assert.areSame(0, source.CitiesDS.length, "No entity should be returned");
											});
										},
										'onError': function(error){
											testRunner.resume(function(){ 
												Y.Assert.fail("Async Call to query fails !" + JSON.stringify(error.error));
											});	
										}
											}
									);
								}, 50);
								testRunner.wait();
							});
						},
						onError: function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async call to serverRefresh failed");
							});	
						}
					},
					this
				);
			}, 50);
			testRunner.wait();
		},
		
		testClientRefreshEventLogic1: function () {
			//add new element
			//source.citiesDS.addNewElement();
			var oldFlagsLength = sources.eventsFlag.length;
			var testRunner = this;
			window.setTimeout(function () {
				source.CitiesDS.serverRefresh(
					{
						onSuccess: function(event){
							testRunner.resume(function(){ 
								//Server logic should be called
								var newFlagsLength = sources.eventsFlag.length;
								Y.Assert.areNotSame(oldFlagsLength, newFlagsLength, "The clientrefresh event didn't triggered (Before any action)!");

							});
						},
						onError: function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async call to serverRefresh failed");
							});	
						}
					},
					this
				);
			}, 50);
			testRunner.wait();
		},

		testClientRefreshEventLogic2: function () {
			//add new element
			source.CitiesDS.addNewElement();
			var oldFlagsLength = sources.eventsFlag.length;
			var testRunner = this;
			window.setTimeout(function () {
				source.CitiesDS.serverRefresh(
					{
						onSuccess: function(event){
							testRunner.resume(function(){ 
								//Server logic should be called
								var newFlagsLength = sources.eventsFlag.length;
								Y.Assert.areNotSame(oldFlagsLength, newFlagsLength, "The clientrefresh event didn't triggered (After adding Element )!");

							});
						},
						onError: function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async call to serverRefresh failed");
							});	
						}
					},
					this
				);
			}, 50);
			testRunner.wait();
		},

		testClientRefreshEventLogic3: function () {
			//add new element
			source.CitiesDS.name = "New City";
			var oldFlagsLength = sources.eventsFlag.length;
			var testRunner = this;
			window.setTimeout(function () {
				source.CitiesDS.serverRefresh(
					{
						onSuccess: function(event){
							testRunner.resume(function(){ 
								//Server logic should be called
								var newFlagsLength = sources.eventsFlag.length;
								Y.Assert.areNotSame(oldFlagsLength, newFlagsLength, "The clientrefresh event didn't triggered (Changing Attribute of entity )!");

							});
						},
						onError: function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async call to serverRefresh failed");
							});	
						}
					},
					this
				);
			}, 50);
			testRunner.wait();
		},

		testClientRefreshEventLogic4: function () {
			//add new element
			source.CitiesDS.name = "New City";
			var oldFlagsLength = sources.eventsFlag.length;
			var testRunner = this;
			window.setTimeout(function () {
				source.CitiesDS.serverRefresh(
					{	
						forceReload: false,
						onSuccess: function(event){
							testRunner.resume(function(){ 
								//Server logic should be called
								var newFlagsLength = sources.eventsFlag.length;
								Y.Assert.areNotSame(oldFlagsLength, newFlagsLength, "The clientrefresh event didn't triggered (using forceReload on false) !");

							});
						},
						onError: function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async call to serverRefresh failed");
							});	
						}
					},
					this
				);
			}, 50);
			testRunner.wait();
		},

		testValidateRemoveEventLogic5: function () {
			//add new element
			//source.CitiesDS.name = "New City";
			var oldFlagsLength = sources.eventsFlag.length;
			var testRunner = this;
			window.setTimeout(function () {
				source.CitiesDS.remove(
					{	
					
						onSuccess: function(event){
							testRunner.resume(function(){ 
								//Server logic should be called
								var newFlagsLength = sources.eventsFlag.length;
								Y.Assert.areNotSame(oldFlagsLength, newFlagsLength, "The validateremove event didn't triggered !");

							});
						},
						onError: function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async call to remove failed");
							});	
						}
					},
					this
				);
			}, 50);
			testRunner.wait();
		},

		/**
 		 * SD-00 save method exists
 		 */
		testServerSaveExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.save);
			Y.Assert.areSame("function", typeof source.CitiesDS.save);
		},

		/**
 		 * SD-00 save method business logic when updating
 		 */
		testServerSaveLogicUpdate: function () {
			// get the test runner
			var testRunner = this;

			//get all entities
			window.setTimeout(function () {
					source.CitiesDS.allEntities(
					{
						'onSuccess': function(event){
							testRunner.resume(function(){ 
								//Point the second element
								source.CitiesDS.select(1);

								//Edit the current element
								var id = source.CitiesDS.ID;
								source.CitiesDS.name = "Casablanca";
								source.CitiesDS.pop = 3200000;

								//call save method
								window.setTimeout(function () {
										source.CitiesDS.save(
										{
											'onSuccess': function(event){
												testRunner.resume(function(){ 
													Y.Assert.areSame("Casablanca", event.dataSource.name);
													Y.Assert.areSame(3200000, event.dataSource.pop);
													ds.City.find("ID = :1",
															{
														'params': [id],
														'onSuccess': function(event){
															testRunner.resume(function(){ 
																//Saved entity should be returned
																Y.Assert.areNotSame(null, event.entity, "Saved entity should be returned");
																Y.Assert.areSame("Casablanca", event.entity.name.getValue(), "Saved values should be the same as entered");
																Y.Assert.areSame(3200000, event.entity.pop.getValue(), "Saved values should be the same as entered");
															});
														},
														'onError': function(error){
															testRunner.resume(function(){ 
																Y.Assert.fail("Async Call to find fails !" + JSON.stringify(error));
															}); 
														}
															}
													);
													testRunner.wait();     
												});
											},
											'onError': function(error){
												testRunner.resume(function(){ 
													Y.Assert.fail("Async Call to save fails!" + JSON.stringify(error));
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
								Y.Assert.fail("Async Call to allEntities fails !" + JSON.stringify(error));
							});
						}

					});
			}, 50);
			testRunner.wait();
		},

		/**
 		 * SD-00 save method business logic when adding
 		 */
		testServerSaveLogicAddNew: function () {
			//add new element
			source.CitiesDS.addNewElement();

			var testRunner = this;
			//call serverRefresh to get the new ID
			window.setTimeout(function () {
				source.CitiesDS.serverRefresh(
					{
						onSuccess: function(event){
							testRunner.resume(function(){ 
								//Server logic should be called : return the new ID
								var id = source.CitiesDS.ID ;
								//Y.Assert.areSame(5, id, "Server logic should be called");

								//Edit the new element
								source.CitiesDS.name = "Rabat";
								source.CitiesDS.pop = 2000000;

								//New flag should be set to true
								Y.Assert.areSame(true, source.CitiesDS.isNewElement(), "New flag should be set to true");    

								//call save method
								window.setTimeout(function () {
									source.CitiesDS.save(
										{
											'onSuccess': function(event){
												testRunner.resume(function(){ 
													Y.Assert.areSame("Rabat", event.dataSource.name);
													Y.Assert.areSame(2000000, event.dataSource.pop);
													//Y.Assert.isFalse(event.dataSource.isNewElement(), "Saved entity shouldn't be new anymore");
													ds.City.find("ID = :1 and name = :2 and pop = :3",
															{
														'params': [id+1, "Rabat", 2000000],
														'onSuccess': function(event){
															testRunner.resume(function(){ 
																//Saved entity should be returned
																Y.Assert.areNotSame(null, event.entity, "Saved entity should be returned");
																Y.Assert.areSame("Rabat", event.entity.name.getValue(), "Saved values should be the same as entered");
																Y.Assert.areSame(2000000, event.entity.pop.getValue(), "Saved values should be the same as entered");
															});
														},
														'onError': function(error){
															testRunner.resume(function(){ 
																Y.Assert.fail("Async Call to find fails !" + JSON.stringify(error));
															}); 
														}
															}
													);
													testRunner.wait();     
												});
											},
											'onError': function(error){
												testRunner.resume(function(){ 
													Y.Assert.fail("Async Call to save fails!" + JSON.stringify(error));
												}); 
											}
										}
									);
								}, 50);
								testRunner.wait();
							});
						},
						onError: function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async call to serverRefresh fails");
							}); 
						}
					},
					this
				);
			}, 50);  
			testRunner.wait();
		},

		/**
 		 * SD-00 dropCurrent method exists
 		 */
		/*testDropCurrentExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.dropCurrent);
			Y.Assert.areSame("function", typeof source.CitiesDS.dropCurrent);
		},*/

		/**
 		 * SD-00 dropCurrent method business logic on a new element (just added)
 		 */
		/*testDropCurrentLogicNew: function () {	
			//get the test runner
			var testRunner = this;

			//get the current id
			var id = source.CitiesDS.ID;

			//call dropCurrent on current element
			window.setTimeout(function () {
				source.CitiesDS.dropCurrent(
					{
						'onSuccess': function(event){
							testRunner.resume(function(){ 
								window.setTimeout(function () {
									ds.City.find("id = :1",
										{
									'params': [id],
									'onSuccess': function(event){
										testRunner.resume(function(){ 
											//deleted entity shouldn't be returned
											Y.Assert.areSame(null, event.entity, "deleted entity shouldn't be returned");
										});
									},
									'onError': function(error){
										testRunner.resume(function(){ 
											Y.Assert.fail("Async Call to find fails !");
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
								Y.Assert.fail("Async call to dropCurrent fails");
							}); 
						}
					},
					this
				);  
			}, 50);
			testRunner.wait();
		},*/

		/**
 		 * SD-00 dropCurrent method business logic on a non just added element
 		 */
		/*testDropCurrentLogicSelect: function () {	
			//get the test runner
			var testRunner = this;
			//point the second element
			source.CitiesDS.select(1);
			//get the current id
			var id = source.CitiesDS.ID;

			//call dropCurrent on current element
			window.setTimeout(function () {
				source.CitiesDS.dropCurrent(
					{
						'onSuccess': function(event){
							testRunner.resume(function(){ 
								window.setTimeout(function () {
									ds.City.find("id = :1",
										{
									'params': [id],
									'onSuccess': function(event){
										testRunner.resume(function(){ 
											//deleted entity shouldn't be returned
											Y.Assert.areSame(null, event.entity, "deleted entity shouldn't be returned");
										});
									},
									'onError': function(error){
										testRunner.resume(function(){ 
											Y.Assert.fail("Async Call to find fails !");
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
								Y.Assert.fail("Async call to dropCurrent fails");
							}); 
						}
					},
					this
				);  
			}, 50);
			testRunner.wait();
		},*/

		/**
 		 * SD-00 addEntity method exists
 		 */
		testAddEntityExistsDS : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.addEntity);
			Y.Assert.areSame("function", typeof source.CitiesDS.addEntity);
		},

		/**
 		 * SD-00 addEntity method exists on a related datasource
 		 */
		testAddEntityExistsRelatedDS : function(){
			Y.Assert.areSame("function", typeof source.EmpsByCompDS.addEntity,"addEntity() should be available for a related ds");
		},

		/**
 		 * SD-00 addEntity method business logic
 		 */
		testAddEntityLogic : function(){
			//get the test runner
			var testRunner = this;

			//create a new entity
			var newEmp = new WAF.Entity(ds.Emp);
			newEmp.ID.setValue(20);
			newEmp.name.setValue("Eric Golbert");
			newEmp.salary.setValue(25000);
			newEmp.company.setValue(source.CitiesDS.getCurrentElement());

			//get the length before calling the method
			var oldLength = source.EmpsDS.length;

			//add onCurrentElementChange event listener
			var onCurrentElementChangeFlag = false;
			source.EmpsDS.addListener("onCurrentElementChange", function(event){
				onCurrentElementChangeFlag = true;
			});

			// call the method
			source.EmpsDS.addEntity(newEmp);
			
			window.setTimeout(function () {
				testRunner.resume(function(){
					//datasource length should be inctremented
					var newLength = source.EmpsDS.length;		
					Y.Assert.areSame(oldLength + 1, newLength);
		
					//the new entity should be a part of the entityCollection : position should be different from -1
					Y.Assert.areSame(newLength - 1, source.EmpsDS.getPosition());
		
		
					//current entity values should be the same as entered
					Y.Assert.areSame(20, source.EmpsDS.ID);
					Y.Assert.areSame("Eric Golbert", source.EmpsDS.name);
		
					//onCurrentElementChange event should occur
					Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event should occur");	
		
					//new entity should not be stored
					window.setTimeout(function () {
						ds.Emp.find("ID = 20", 
							{
						'onSuccess': function(event){
							testRunner.resume(function(){
								//Entity should not be stored
								Y.Assert.areSame(null, event.entity, "Entity should not be stored !");
							});
						},
						'onError': function(error){
							testRunner.resume(function(){
								Y.Assert.fail("Async call to find failed !" + JSON.stringify(error));
							});
						}
							}
		
						);
					}, 50);
					testRunner.wait();
				});
			}, 50);
			testRunner.wait();
		},

		/**
 		 * SD-00 newEntity method exists on related datasource
 		 */
		testNewEntityExistsDS : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.newEntity);
			Y.Assert.areSame("function", typeof source.CitiesDS.newEntity);
		},

		/**
 		 * SD-00 newEntity method exists on related datasource
 		 */
		testNewEntityExistsRelatedDS : function(){
			// accroding to the doc, this method should NOW be available for related datasources (92746)
			Y.Assert.areSame("function", typeof source.EmpsByCompDS.newEntity ,"newEntity() should be available for a related ds");
		},

		/**
 		 * SD-00 newEntity method business logic
 		 */
		testNewEntityLogic : function(){
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
			source.CitiesDS.newEntity();

			//datasource length should remain the same
			var newLength = source.CitiesDS.length;
			Y.Assert.areSame(oldLength, newLength, "datasource length should remain the same");

			//the new entity shouldn't be a part of the entityCollection: position should equals -1
			Y.Assert.areSame(-1, source.CitiesDS.getPosition(), "The new entity shouldn't be a part of the entityCollection: position should equals -1");

			//onCurrentElementChange event should occur
			Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event should occur");		

			//onCollectionChange event shouldn't occur
			Y.Assert.areSame(false, onCollectionChangeFlag, "onCollectionChange event shouldn't occur");		

			//values should be null		
			Y.Assert.areSame(null, source.CitiesDS.ID);
			Y.Assert.areSame(null, source.CitiesDS.name);
			Y.Assert.areSame(null, source.CitiesDS.pop);

			//entity should not be stored in the server
			window.setTimeout(function () {
				source.CitiesDS.allEntities( 
					{
						'onSuccess': function(event){
							testRunner.resume(function(){
								Y.Assert.areSame(oldLength, source.CitiesDS.length, "Entity should not be stored in the server");
							});
						},
						'onError': function(event){
							testRunner.resume(function(){
								Y.Assert.fail("Async call failed !");
							});
						}
					}

				);
			}, 50);
			testRunner.wait();
		},
		
		/**
 		 * SD-00 setEntityCollection method exists
 		 */
		testSetEntityCollectionExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.EmpsDS.setEntityCollection);
		},

		/**
 		 * SD-00 setEntityCollection method business logic
 		 */
		testSetEntityCollectionLogic : function(){
			//get the test runner
			var testRunner = this;

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
						source.EmpsDS_.addListener("onCurrentElementChange", onCurrentElementChangeHandler);

						// add onCollectionChange event handler
						var onCollectionChangeFlag = false ;
						var onCollectionChangeHandler = function onCollectionChangeHandler(event){
							onCollectionChangeFlag = true ;
						}
						source.EmpsDS_.addListener("onCollectionChange", onCollectionChangeHandler);

						//call filterQuery method
						source.EmpsDS_.setEntityCollection(source.EmpsDS.getEntityCollection());

						//onCollectionChangeevent should occur
						Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

						//onCurrentElementChange event should occur
						Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event did not occur !");

						//entityCollection should be filtered
						Y.Assert.areSame(6, source.EmpsDS_.length, "entityCollection should be filtered");

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
 		 * SD-00 getSelection method business logic
 		 */
		testGetSelectionLogic : function(){
			//get the test runner
			var testRunner = this;

			sources.CompaniesDS.select(5);

			var selection = sources.CompaniesDS.getSelection();
			var arr = selection.getSelectedRows();

			Y.Assert.areSame(5, arr[0], "The value should be the same !");

		},

		/**
 		 * SD-00 setSelection method business logic
 		 */
		testSetSelectionLogic : function(){
			//get the test runner
			var testRunner = this;
			var selection = new WAF.Selection("multiple");
			var toSelect = [0,2,4];
			selection.setSelectedRows(toSelect);
			sources.CompaniesDS.setSelection(selection);
			
			var selection2 = sources.CompaniesDS.getSelection();
			var selected = selection2.getSelectedRows();

			Y.ArrayAssert.itemsAreSame(toSelect, selected, "The values in arrays should be the same !");

		},

		/**
		* SD-00 setCurrentEntity method Logic
		**/

		testSetCurrentEntityLogic : function(){
			//get the test runner
			var testRunner = this;
			var position;
			var entityCollection = sources.CompaniesDS.getEntityCollection();
			window.setTimeout(function () {
			entityCollection.getEntity(3,{
				'onSuccess' : function(event){
					sources.CompaniesDS.setCurrentEntity(event.entity);
					position = sources.CompaniesDS.getPosition();
					testRunner.resume(function(){
						Y.Assert.areSame(position, -1, "The position returned should be -1, instead of "+position+"!");
					});
				},
				'onError' : function(event)
				{
					testRunner.resume(function(){
						Y.fail("The asyn call for getEntity is failed !");
					});
				}
			});},50);
			testRunner.wait();		
		}, 
   
	     /**
		 * DSC-20. setCurrentEntity exists
		 */	
	    testSetCurrentEntityExists: function () {
	    	var dsource = sources.CompaniesDS;
			Y.Assert.areNotSame("undefined", typeof dsource.setCurrentEntity,"NotUndefined");
			Y.Assert.areSame("function", typeof dsource.setCurrentEntity,"NotFunction");
	    }, 
	   
	     /**
		 * DSC-20. selectByKey exists
		 */	
	    testSelectByKeyExists: function () {
	    	var dsource = sources.CompaniesDS;
			Y.Assert.areNotSame("undefined", typeof dsource.selectByKey);
			Y.Assert.areSame("function", typeof dsource.selectByKey);
	    },

	    /**
		 * DSC-20. buildFromSelection exists
		 */	
	    testBuildFromSelectionExists: function () {
	    	var dsource = sources.CompaniesDS;
			Y.Assert.areNotSame("undefined", typeof dsource.buildFromSelection);
			Y.Assert.areSame("function", typeof dsource.buildFromSelection);
	    },

	    /**
		 * DSC-20. buildFromSelection logic
		 */	
    	testBuildFromSelectionLogic: function () {
	    	var testRunner = this;

	    	var empsDS = sources.EmpsDS;
	    	var oldLength = empsDS.length;
			var selection = new WAF.Selection("multiple");

			selection.setSelectedRows([3,5,7]);
			var newLength;
			var entCollection;

			window.setTimeout(function () {

			entCollection = sources.EmpsDS.buildFromSelection(selection,
				{
					'onSuccess':function(event){
						newLength = empsDS.length;
						//newLength = entCollection.length;
					 	testRunner.resume(function(){
						Y.Assert.areNotSame(oldLength, newLength,"The values should be differents oldLength : "+oldLength+" newLength : "+newLength+"!");
						Y.Assert.areSame(3, newLength, "The values should be the same, newLength : "+newLength+"!");
						});
					},
					'onError':function(event){
						testRunner.resume(function(){
							Y.Assert.fail("The asyn call for the buildFromSelection is failed !");
						});
					}
				});

			 	
			},50);
			
			testRunner.wait();
	    },


	    /**
		 * DSC-20. getValues exists
		 */	
	    testGetValuesExists: function () {
	    	var dsource = sources.CompaniesDS;
			Y.Assert.areNotSame("undefined", typeof dsource.getValues);
			Y.Assert.areSame("function", typeof dsource.getValues);
	    },


	    /**
		 * DSC-20. getValues logic
		 */	
	    testGetValuesLogic: function () {
	    	var testRunner = this;
	    	var dsource = sources.CompaniesDS;
	    	var values;
	    	window.setTimeout(function () {

		    	sources.ArrayDS.getValues("name","",
		    		{
		    			'onSuccess':function(event){
		    				values = event.result;
		    				testRunner.resume(function(){
		    					var valuesLentgh = values.length;

		    					Y.Assert.areSame(4, valuesLentgh, "The values should be the same, the values length : "+valuesLentgh+" !");
								Y.Assert.areSame(values[0].name, "Paris", "The values should be the same, the value returned : "+values[0].name+"!");
							});
		    			},
		    			'onError':function(event){
		    				testRunner.resume(function(){
								Y.Assert.fail("The asyn call for the getValues is failed !");
							});
		    			}
		    		});
				
			},50);
			testRunner.wait();
	    },

	    /**
		 * DSC-20. getValues logic with parametrs
		 */	
	    testGetValuesWithOrderByLogic: function () {
	    	var testRunner = this;
	    	var dsource = sources.CompaniesDS;
	    	var values;
	    	window.setTimeout(function () {

		    	sources.ArrayDS.getValues("ID,name,pop","ID <= 5",
		    		{
		    			orderBy : "pop",
		    			'onSuccess':function(event){
		    				values = event.result;
		    				testRunner.resume(function(){
		    					var valuesLength = values.length;

		    					Y.Assert.areSame(4, valuesLength, "The values should be the same, the values length : "+valuesLength+" !");
								Y.Assert.areSame(values[0].name, "Paris", "The values should be the same, the value returned : "+values[0].name+"!");
								for (var i = 0; i < values.length - 1; i += 1) {
										if (values[i + 1].pop < values[i].pop) {
											Y.Assert.fail("getValues with orderBy option fails !");
										}
									}
							});
		    			},
		    			'onError':function(event){
		    				testRunner.resume(function(){
								Y.Assert.fail("The asyn call for the getValues is failed !");
							});
		    			}
		    		});

			},50);
			testRunner.wait();
	    },

	    /**
		 * DSC-20. getValues logic with parametrs (skip)
		 */	
	    testGetValuesWithSkipLogic: function () {
	    	var testRunner = this;
	    	var dsource = sources.CompaniesDS;
	    	var values;
	    	var toSkip = 3;
	    	window.setTimeout(function () {

		    	sources.CitiesDS.getValues("ID,name,pop","ID <= 5",
		    		{
		    			skip : toSkip,
		    			'onSuccess':function(event){
		    				values = event.result;
		    				testRunner.resume(function(){
		    					var valuesLength = values.length;

		    					Y.Assert.areSame(2, valuesLength, "The values should be the same, the values length : "+valuesLength+" !");
								Y.Assert.areSame(toSkip+1,values[0].ID, "The values should be the same, the value returned : "+values[0].ID+"!");
								
							});
		    			},
		    			'onError':function(event){
		    				testRunner.resume(function(){
								Y.Assert.fail("The asyn call for the getValues is failed !");
							});
		    			}
		    		});

			},50);
			testRunner.wait();
	    },

	    /**
		 * DSC-20. getValues logic with parametrs (top)
		 */	
	    testGetValuesWithTopLogic: function () {
	    	var testRunner = this;
	    	var dsource = sources.CompaniesDS;
	    	var values;
	    	var top = 3;
	    	window.setTimeout(function () {

		    	sources.CitiesDS.getValues("ID,name,pop","ID <= 5",
		    		{
		    			top : top,
		    			'onSuccess':function(event){
		    				values = event.result;
		    				testRunner.resume(function(){
		    					var valuesLength = values.length;

		    					Y.Assert.areSame(top, valuesLength, "The values should be the same, the values length : "+valuesLength+" !");
								Y.Assert.areSame(1,values[0].ID, "The values should be the same, the value returned : "+values[0].ID+"!");
								
							});
		    			},
		    			'onError':function(event){
		    				testRunner.resume(function(){
								Y.Assert.fail("The asyn call for the getValues is failed !");
							});
		    			}
		    		});

			},50);
			testRunner.wait();
	    },

	     /**
		 * DSC-20. getValues logic with parametrs (withinCollection)
		 */	
	  //   testGetValuesWithinCollectionLogic: function () {
	  //   	var testRunner = this;
	  //   	var dsource = sources.CompaniesDS;
	  //   	var values;
	  //   	var top = 3;
	  //   	window.setTimeout(function () {

		 //    	sources.EmpsDS.getValues("ID,name,salary","ID <= 8",
		 //    		{
		 //    			withinCollection : true,
		 //    			'onSuccess':function(event){
		 //    				values = event.result;
		 //    				testRunner.resume(function(){
		 //    					var valuesLength = values.length;

		 //    					Y.Assert.areSame(5, valuesLength, "The values should be the same, the values length : "+valuesLength+" !");
			// 					//Y.Assert.areSame(1,values[0].ID, "The values should be the same, the value returned : "+values[0].ID+"!");
								
			// 				});
		 //    			},
		 //    			'onError':function(event){
		 //    				testRunner.resume(function(){
			// 					Y.Assert.fail("The asyn call for the getValues is failed !");
			// 				});
		 //    			}
		 //    		});
				
			// },50);
			// testRunner.wait();
	  //   },

	    /**
		 * DSC-20. removeCurrentReference logic 
		 */	
	    testRemoveCurrentReferenceLogic: function () {
	    	var testRunner = this;
	    	var oldLength = sources.EmpsDS.length;
	    	var values;
	    	var top = 3;
	    	window.setTimeout(function () {

		    	sources.EmpsDS.removeCurrentReference(
		    		{
		    			
		    			'onSuccess':function(event){
		    				//values = event.result;
		    				var newLength = sources.EmpsDS.length;
		    				testRunner.resume(function(){
		    					

		    					Y.Assert.areSame(oldLength - 1, newLength, "The values should be the same, the values length : "+newLength+" !");
								//Y.Assert.areSame(1,values[0].ID, "The values should be the same, the value returned : "+values[0].ID+"!");								
							});

		    			},
		    			'onError':function(event){
		    				testRunner.resume(function(){
								Y.Assert.fail("The asyn call for the removeCurrentReference is failed !");
							});
		    			}
		    		});
		    	                        
		           //sources.employer.resolveSource(); // statement not present in the first button
    			

			},50);
			testRunner.wait();
	    },

	     /**
		 * DSC-20. resolveSource logic 
		 */	
	    testResolveSourceLogic: function () {
	    	var testRunner = this;
	    	var oldLength = sources.EmpsDS.length;
	    	
	    	window.setTimeout(function () {

		    	sources.EmpsDS.resolveSource(
		    		{
		    			
		    			'onSuccess':function(event){
		    				//values = event.result;
		    				
		    				var newLength = sources.EmpsDS.length;
		    				testRunner.resume(function(){
		    					
		    					Y.Assert.areNotSame(oldLength , newLength, "The values should not be the same. newlength : "+newLength+" , oldlength : "+oldLength+"!");
								
							});

		    			},
		    			'onError':function(event){
		    				testRunner.resume(function(){
								Y.Assert.fail("The asyn call for the removeCurrentReference is failed !");
							});
		    			}
		    		});
		    	                        
		           //sources.employer.resolveSource(); // statement not present in the first button
    			

			},50);
			testRunner.wait();
	    },

	    /**
		 * DSC-20. removeCurrent logic 
		 */	
	    testRemoveCurrentLogic: function () {
	    	var testRunner = this;
	    	
	    	sources.EmpsDS.allEntities();
	    	var beforeRemoveLength = sources.EmpsDS.length;

	    	window.setTimeout(function () {

		    	sources.EmpsDS.removeCurrent(
		    		{
		    			
		    			'onSuccess':function(event){
		    				//values = event.result;
		    				var afterRemoveLength = sources.EmpsDS.length;
		    				
		    				sources.EmpsDS.resolveSource(
				    		{
				    			
				    			'onSuccess':function(event){
				    				//values = event.result;
				    				var afterResolveLength = sources.EmpsDS.length;
				    				testRunner.resume(function(){

				    					Y.Assert.areSame(afterRemoveLength, afterResolveLength, "The values should be the same, the values length : "+afterRemoveLength+" !");
				    					Y.Assert.areSame(beforeRemoveLength -1, afterRemoveLength, "The values should be the same, the values length : "+beforeRemoveLength+" !");
										//Y.Assert.areSame(1,values[0].ID, "The values should be the same, the value returned : "+values[0].ID+"!");								
									});
									
				    			},
				    			'onError':function(event){
				    				testRunner.resume(function(){
										Y.Assert.fail("The asyn call for the resolveSource is failed !");
									});
				    			}
				    		});
							
		    			},
		    			'onError':function(event){
		    				testRunner.resume(function(){
								Y.Assert.fail("The asyn call for the removeCurrent is failed !");
							});
		    			}
		    		});
		    	                        
		           //sources.employer.resolveSource(); // statement not present in the first button
    			

			},50);
			testRunner.wait();
	    },

	    /**
		 * DSC-20. getOldAttributeValue exists
		 */	
	    testGetOldAttributeValueExists: function () {
	    	var dsource = sources.CompaniesDS;
			Y.Assert.areNotSame("undefined", typeof dsource.getOldAttributeValue);
			Y.Assert.areSame("function", typeof dsource.getOldAttributeValue);
	    },


	     /**
		 * DSC-20. getOldAttributeValue logic 
		 */	
	    testGetOldAttributeValueLogic: function () {
	    	var testRunner = this;
	    	var oldName = sources.EmpsDS.name;
	    	var onBeforeCurrentElementChangeFlag = false;
	    	var beforeNameChange;
	    	var nameChanged = "NameChanged";

	    	var onBeforeCurrentElementChangeHandler = function onBeforeCurrentElementChangeHandler(event){
				onBeforeCurrentElementChangeFlag = true ;
				beforeNameChange = event.dataSource.getOldAttributeValue('name');
			}
			source.EmpsDS.addListener("onBeforeCurrentElementChange", onBeforeCurrentElementChangeHandler);
			
			sources.EmpsDS.selectNext();

	    	
	    	window.setTimeout(function () {

				testRunner.resume(function(){
					Y.Assert.areSame(onBeforeCurrentElementChangeFlag, true," OnBeforeCurrentElementChange event didn't triggered !");
					Y.Assert.areSame(beforeNameChange, oldName," The values should be the same onBeforeChangeName : "+beforeNameChange+", oldName : "+oldName+"!");
					//Y.Assert.areSame(nameChanged, sources.EmpsDS.name ," The values should be the same nameChanged : "+nameChanged+", sources.EmpsDS.name : "+sources.EmpsDS.name+"!");
					//sources.EmpsDS.name = oldName;								
				});

			},50);
			testRunner.wait();
	    },

	    /**
		 * DSC-20. getElements exists
		 */	
	    testGetElementsExists: function () {
	    	var dsource = sources.CompaniesDS;
			Y.Assert.areNotSame("undefined", typeof dsource.getElements);
			Y.Assert.areSame("function", typeof dsource.getElements);
	    },

	    /**
		 * DSC-20. getElements logic
		 */	
	  

	    /**
		 * DSC-20. getAttributeValue exists
		 */	
	    testGetAttributeValueExists: function () {
	    	var dsource = sources.CompaniesDS;
			Y.Assert.areNotSame("undefined", typeof dsource.getAttributeValue);
			Y.Assert.areSame("function", typeof dsource.getAttributeValue);
	    },


	     /**
		 * DSC-20. getAttributeValue logic 
		 */	
	    testGetAttributeValueELogic: function () {
	    	var testRunner = this;
	    	var itemId = sources.CompaniesDS.ID;
	    	var itemName = sources.CompaniesDS.name;

		    var itemName_ =	sources.CompaniesDS.getAttributeValue('name');
	
			Y.Assert.areSame(itemName_ , itemName, "The values should not be the same. with getAttributeValue : "+itemName_+" , Direct access : "+itemName+"!");
			
	    },

	    /**
		 * DSC-20. distinctValues exists
		 */	
	    testDistinctValuesExists: function () {
	    	var dsource = sources.CompaniesDS;
			Y.Assert.areNotSame("undefined", typeof dsource.distinctValues);
			Y.Assert.areSame("function", typeof dsource.distinctValues);
	    },


	     /**
		 * DSC-20. distinctValues logic 
		 */	
	    testDistinctValuesLogic: function () {
	    	var testRunner = this;
	    	var oldLength = sources.CompaniesDS.length;
	    	
	    	window.setTimeout(function () {

		    	sources.CompaniesDS.distinctValues('ca',
		    		{
		    			
		    			'onSuccess':function(event){
		    				var values = event.result;
		    				
		    				testRunner.resume(function(){
		    					Y.Assert.areSame(true, values.length >=2," The length should be greater than 2 !");
		    					for(var i=0; i < values.length; i++)
		    						for(var j = i+1; j < values.length - 1; j++)
		    							if(values[i] == values[j])
		    								Y.Assert.fail("The Values should be distinct !");

								
							});

		    			},
		    			'onError':function(event){
		    				testRunner.resume(function(){
								Y.Assert.fail("The asyn call for the distinctValues is failed !");
							});
		    			}
		    		});
		    	                        
		           //sources.employer.resolveSource(); // statement not present in the first button
    			

			},50);
			testRunner.wait();
	    },

	    /**
		 * DSC-20. collectionRefresh exists
		 */	
	    testCollectionRefreshExists: function () {
	    	var dsource = sources.CompaniesDS;
			Y.Assert.areNotSame("undefined", typeof dsource.collectionRefresh);
			Y.Assert.areSame("function", typeof dsource.collectionRefresh);
	    },

	    /**
		 * DSC-20. resolveSource exists
		 */	
	    testResolveSourceExists: function () {
	    	var dsource = sources.CompaniesDS;
			Y.Assert.areNotSame("undefined", typeof dsource.resolveSource);
			Y.Assert.areSame("function", typeof dsource.resolveSource);
	    },

	    /**
		 * DSC-20. removeCurrentReference exists
		 */	
	    testRemoveCurrentReferenceExists: function () {
	    	var dsource = sources.CompaniesDS;
			Y.Assert.areNotSame("undefined", typeof dsource.removeCurrentReference);
			Y.Assert.areSame("function", typeof dsource.removeCurrentReference);
	    },

	    /**
		 * DSC-20. removeCurrent exists
		 */	
	    testRemoveCurrentExists: function () {
	    	var dsource = sources.CompaniesDS;
			Y.Assert.areNotSame("undefined", typeof dsource.removeCurrent);
			Y.Assert.areSame("function", typeof dsource.removeCurrent);
	    },

	    /**
		 * DSC-20. mustResolveOnFirstLevel exists
		 */	
	    testMustResolveOnFirstLevelExists: function () {
	    	var dsource = sources.CompaniesDS;
			Y.Assert.areNotSame("undefined", typeof dsource.mustResolveOnFirstLevel);
			Y.Assert.areSame("function", typeof dsource.mustResolveOnFirstLevel);
	    }			

};