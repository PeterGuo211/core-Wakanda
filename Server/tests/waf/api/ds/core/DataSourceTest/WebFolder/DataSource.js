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
/*
 *
 * author ouissam.gouni@4d.com
 */
 
 
var testCase = {
		name: "DataSource API All tests",

		//  1. test of source object
		testSourceObjectExists: function () {
			Y.Assert.areNotSame("undefined", typeof source);  
			Y.Assert.areSame("object", typeof source);
		},

		//  2. test of DataSource Class
		testDataSourceClassExists: function () {
			Y.Assert.areNotSame("undefined", typeof WAF.DataSource);  
			Y.Assert.areSame("function", typeof WAF.DataSource);
		},

		//  3. test of Server DataSource Class
		testServerDataSourceClassExists: function () {
			Y.Assert.areNotSame("undefined", typeof WAF.DataSourceEm);  
			Y.Assert.areSame("function", typeof WAF.DataSourceEm);
		},

		//  4. test of Local DataSource Class
		testDataSourceVarClassExists: function () {
			Y.Assert.areNotSame("undefined", typeof WAF.DataSourceVar);  
			Y.Assert.areSame("function", typeof WAF.DataSourceVar);
		},

		//  5. test of DataSource Object
		testDataSourceObjectExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS, "source.CitiesDS shouldn't be undefined");  
			Y.Assert.areSame("object", typeof source.CitiesDS, "source.CitiesDS should be an object");
			Y.Assert.areSame(true, source.CitiesDS instanceof WAF.DataSourceEm, "source.CitiesDS should be an instance of WAF.DataSourceEm" );

			Y.Assert.areNotSame("undefined", typeof source.CompaniesDS, "source.CompaniesDS shouldn't be undefined");  
			Y.Assert.areSame("object", typeof source.CompaniesDS, "source.CompaniesDS should be an object");
			Y.Assert.areSame(true, source.CompaniesDS instanceof WAF.DataSourceEm, "source.CompaniesDS should be an instance of WAF.DataSourceEm" );

			Y.Assert.areNotSame("undefined", typeof source.EmpsDS, "source.EmpsDS shouldn't be undefined");  
			Y.Assert.areSame("object", typeof source.EmpsDS, "source.EmpsDS should be an object");
			Y.Assert.areSame(true, source.EmpsDS instanceof WAF.DataSourceEm, "source.EmpsDS should be an instance of WAF.DataSourceEm" );

			Y.Assert.areNotSame("undefined", typeof source.CitiesDS_, "source.CitiesDS_ shouldn't be undefined");  
			Y.Assert.areSame("object", typeof source.CitiesDS_, "source.CitiesDS_ should be an object");
			Y.Assert.areSame(true, source.CitiesDS_ instanceof WAF.DataSourceEm, "source.CitiesDS_ should be an instance of WAF.DataSourceEm" );

			Y.Assert.areNotSame("undefined", typeof source.CompsByCityDS, "source.CompsByCityDS shouldn't be undefined");  
			Y.Assert.areSame("object", typeof source.CompsByCityDS, "source.CompsByCityDS should be an object");
			Y.Assert.areSame(true, source.CompsByCityDS instanceof WAF.DataSourceEm, "source.CompsByCityDS should be an instance of WAF.DataSourceEm" );

			Y.Assert.areNotSame("undefined", typeof source.EmpsByCompDS, "source.EmpsByCompDS shouldn't be undefined");  
			Y.Assert.areSame("object", typeof source.EmpsByCompDS, "source.EmpsByCompDS should be an object");
			Y.Assert.areSame(true, source.EmpsByCompDS instanceof WAF.DataSourceEm, "source.EmpsByCompDS should be an instance of WAF.DataSourceEm" );

			Y.Assert.areNotSame("undefined", typeof source.ArrayDS, "source.ArrayDS shouldn't be undefined");  
			Y.Assert.areSame("object", typeof source.ArrayDS, "source.ArrayDS should be an object");
			Y.Assert.areSame(true, source.ArrayDS instanceof WAF.DataSourceVar, "source.ArrayDS should be an instance of WAF.DataSourceVar" );

			Y.Assert.areNotSame("undefined", typeof source.VariableDS, "source.VariableDS shouldn't be undefined");  
			Y.Assert.areSame("object", typeof source.VariableDS, "source.VariableDS should be an object");
			Y.Assert.areSame(true, source.VariableDS instanceof WAF.DataSourceVar, "source.VariableDS should be an instance of WAF.DataSourceVar" );

		},

		// 6. test of DataSource getAttribute exists
		testSourceGetAttributeExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getAttribute, "source.CitiesDS.getAttribute shouldn't be undefined");
			Y.Assert.areSame("function", typeof source.CitiesDS.getAttribute, "source.CitiesDS.getAttribute should be a function");
		},

		// 7.  test of method getAttribute logic
		testSourceGetAttributeLogic: function () {
			// existance
			var simpleAtt= source.CitiesDS.getAttribute("name") ;
			Y.Assert.areNotSame("undefined", typeof simpleAtt, "simpleAtt shouldn't be undefined");
			Y.Assert.areSame("object", typeof simpleAtt, "simpleAtt should be an object");
			Y.Assert.areSame(true, simpleAtt instanceof WAF.DataSourceEmSimpleAttribute, "simpleAtt should be an instance of WAF.DataSourceEmSimpleAttribute" );

			var relatedAtt = source.CompaniesDS.getAttribute("location") ;
			Y.Assert.areNotSame("undefined", typeof relatedAtt, "relatedAtt shouldn't be undefined");
			Y.Assert.areSame("object", typeof relatedAtt, "relatedAtt should be an object");
			Y.Assert.areSame(true, relatedAtt instanceof WAF.DataSourceEmRelatedAttribute, "relatedAtt should be an instance of WAF.DataSourceEmRelatedAttribute" );

			//content
			Y.Assert.areSame(true, simpleAtt.isFirstLevel);	
			Y.Assert.areSame(false, simpleAtt.isVarAtt);
			Y.Assert.areSame(true, simpleAtt.simple);
			Y.Assert.areSame("string", simpleAtt.type);
			Y.Assert.areSame("storage", simpleAtt.kind);	
			//dataClassAtt attribute
			Y.Assert.areNotSame("undefined", typeof simpleAtt.dataClassAtt);
			Y.Assert.areSame("object", typeof simpleAtt.dataClassAtt);
		},

		// 8.  test of DataSource attribute getValue exists
		testSourceAttributeGetValueExists: function () {
			var attribute = source.CitiesDS.getAttribute("name") ;
			Y.Assert.areNotSame("undefined", typeof attribute.getValue);
			Y.Assert.areSame("function", typeof attribute.getValue);
		},

		// 9.  test of DataSource attribute getValue logic 
		testSourceAttributeGetValueLogic: function () {
			Y.Assert.areSame("Paris", source.CitiesDS.getAttribute("name").getValue());
			Y.Assert.areSame(2000000, source.CitiesDS.getAttribute("pop").getValue());
		},

		// 10.  test of DataSource attribute setValue exists
		testSourceAttributeSetValueExists: function () {
			var attribute = source.CitiesDS.getAttribute("name");
			Y.Assert.areNotSame("undefined", typeof attribute.setValue);
			Y.Assert.areSame("function", typeof attribute.setValue);
		},

		// 11.  test of DataSource attribute setValue logic 
		testSourceAttributeSetValueLogic: function () {
			var attribute = source.CitiesDS.getAttribute("pop") ;
			attribute.setValue(3000000);
			Y.Assert.areSame(3000000, attribute.getValue());
		},


		// 12.  test of DataSource attribute getValueForInput exists 
		testSourceAttributeGetValueForInputExists: function () {
			var attribute = source.EmpsDS.getAttribute("name") ;
			Y.Assert.areNotSame("undefined", typeof attribute.getValueForInput);
			Y.Assert.areSame("function", typeof attribute.getValueForInput);
		},

		// 13.  test of DataSource attribute getValueForInput logic 
		testSourceAttributeGetValueForInputLogic: function () {
			var valueForInput = source.EmpsDS.getAttribute("integration").getValueForInput();
			Y.Assert.areNotSame("undefined", valueForInput );
			Y.Assert.areSame("string", typeof valueForInput);
			Y.Assert.areSame("12/09/2011", valueForInput);

			valueForInput = source.EmpsDS.getAttribute("salary").getValueForInput();
			Y.Assert.areNotSame("undefined", valueForInput );
			Y.Assert.areSame("string", typeof valueForInput);
			Y.Assert.areSame("70000", valueForInput);
		},

		// 14.  test of DataSource attribute normalize exists 
		testSourceAttributeNormalizeExists: function () {
			var attribute = source.EmpsDS.getAttribute("name") ;
			Y.Assert.areNotSame("undefined", typeof attribute.normalize);
			Y.Assert.areSame("function", typeof attribute.normalize);
		},

		// 15.  test of DataSource attribute normalize logic 
		testSourceAttributeNormalizeLogic: function () {
			var result = source.EmpsDS.getAttribute("integration").normalize("03/25/2008");
			Y.Assert.areNotSame("undefined", typeof result);
			Y.Assert.areSame("object", typeof result);
			Y.Assert.areSame(true, result instanceof Date );

			result = source.EmpsDS.getAttribute("salary").normalize("15000");
			Y.Assert.areNotSame("undefined", typeof result);
			Y.Assert.areSame("number", typeof result);
			Y.Assert.areSame(result, 15000);
		},

		// 16.  test of DataSource attribute load exists 
		testSourceAttributeLoadExists: function () {
			var attribute = source.CompaniesDS.location ;
			Y.Assert.areNotSame("undefined", typeof attribute.load);
			Y.Assert.areSame("function", typeof attribute.load);
		},

		// 17.  test of DataSource attribute load logic 
		testSourceAttributeLoadLogic: function () {
			var testRunner = this ;
			source.CompaniesDS.select(0);
			var result = source.CompaniesDS.location.load({
				onSuccess: function(event) {
					testRunner.resume(function(){ 
						var cityEntity = event.entity ;
						Y.Assert.areNotSame(null, cityEntity);
						Y.Assert.areSame("Paris", cityEntity.name.getValue());
					});					
				}
			});
			testRunner.wait();
		},

		// 18.  test of DataSource attribute set exists 
		testSourceAttributeSetExists: function () {
			var attribute = source.CompaniesDS.location ;
			Y.Assert.areNotSame("undefined", typeof attribute.set);
			Y.Assert.areSame("function", typeof attribute.set);
		},

		// 19.  test of DataSource attribute set logic using entity
		testSourceAttributeSetLogicUsingEntity: function () {
			var testRunner = this ;		
			var city = ds.City.getEntity(4,
					{
				'onSuccess': function(event){
					testRunner.resume(function(){ 
						console.log("GetEntity onSuccess");
						city = event.entity ;
						Y.Assert.areNotSame(null, city, "Retrieved Entity is null !");	
						Y.Assert.areSame(4, city.ID.getValue(), "Retrieved Entity doesn't match the query !");	
						source.CompaniesDS.select(0);
						source.CompaniesDS.location.set(city);		
					});					
				},
				'onError': function(error){
					testRunner.resume(function(){ 
						console.log("GetEntity onFail");
						Y.Assert.fail("Get Entity failed !");
					});							
				}
					}							
			);
			testRunner.wait();

		},

		// 20.  test of DataSource attribute set logic using datasource
		testSourceAttributeSetLogicUsingDataSource: function () {
			var testRunner = this ;

			// Point the second city
			source.CitiesDS.select(1);
			Y.Assert.areSame(2, source.CitiesDS.ID);
			Y.Assert.areSame("Cupertino", source.CitiesDS.name);

			// Point the sixth company
			source.CompaniesDS.select(5);
			Y.Assert.areSame(6, source.CompaniesDS.ID);
			Y.Assert.areSame("Google", source.CompaniesDS.name);

			// Set its location with the choosen city	
			source.CompaniesDS.location.set(source.CitiesDS);

			// load its location to check out the result	
			var result = source.CompaniesDS.location.load({
				'onSuccess': function(event) {
					testRunner.resume(function(){ 
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
			testRunner.wait();
		},

		// 21.  test of DataSource attribute getOldValue exists
		testSourceAttributeGetOldValueExists: function () {
			var attribute = source.CitiesDS.getAttribute("name");
			Y.Assert.areNotSame("undefined", typeof attribute.getOldValue);
			Y.Assert.areSame("function", typeof attribute.getOldValue);
		},

		// 22.  test of DataSource attribute getOldValue logic 
		testSourceAttributeGetOldValueLogic: function () {
			var attribute =  source.CompaniesDS.getAttribute("ca");
			var oldValue = attribute.getOldValue();
			//Y.Assert.areSame(15000000, oldValue);
			attribute.setValue(oldValue + 1);
			Y.Assert.areSame(oldValue, attribute.getOldValue(), "Should return the old value");
		},

		// 23.  test of DataSource select exists 
		testSourceSelectExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.EmpsDS.select);
			Y.Assert.areSame("function", typeof source.EmpsDS.select);
		},

		// 24.  test of DataSource selectNext exists 
		testSourceSelectNextExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.EmpsDS.selectNext);
			Y.Assert.areSame("function", typeof source.EmpsDS.selectNext);
		},
		// 25.  test of DataSource selectPrevious exists 
		testSourceSelectPreviousExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.EmpsDS.selectPrevious);
			Y.Assert.areSame("function", typeof source.EmpsDS.selectPrevious);
		},

		// 26.  test of DataSource getCurrentElement exists 
		testSourceGetCurrentElementExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.EmpsDS.getCurrentElement);
			Y.Assert.areSame("function", typeof source.EmpsDS.getCurrentElement);
		},

		// 27.  test of DataSource CurrentElement logic using getCurrentElement 
		testSourceCurrentElementLogicUsingGet: function () {
			source.EmpsDS.select(0) ;
			var currentEntity = source.EmpsDS.getCurrentElement();
			Y.Assert.areSame(1, currentEntity.ID.getValue());
			Y.Assert.areSame("Jean Durand", currentEntity.name.getValue());
			Y.Assert.areSame(70000, currentEntity.salary.getValue());

			source.EmpsDS.selectNext();
			currentEntity = source.EmpsDS.getCurrentElement();
			Y.Assert.areSame(2, currentEntity.ID.getValue(), " Nooooooooooooo");
			Y.Assert.areSame("Isabelle Dubois", currentEntity.name.getValue());
			Y.Assert.areSame(80000, currentEntity.salary.getValue());

			source.EmpsDS.selectPrevious();
			currentEntity = source.EmpsDS.getCurrentElement();
			Y.Assert.areSame(1, currentEntity.ID.getValue());
			Y.Assert.areSame("Jean Durand", currentEntity.name.getValue());
			Y.Assert.areSame(70000, currentEntity.salary.getValue());

			source.EmpsDS.select(5);
			currentEntity = source.EmpsDS.getCurrentElement();
			Y.Assert.areSame(6, currentEntity.ID.getValue());
			Y.Assert.areSame("Steve Jobs", currentEntity.name.getValue());
			Y.Assert.areSame(1000000, currentEntity.salary.getValue());
		},

		// 28.  test of DataSource CurrentElement logic using direct property access 
		testSourceCurrentElementLogicUsingPropertyAccess: function () {
			source.EmpsDS.select(0) ;
			Y.Assert.areSame(1, source.EmpsDS.ID);
			Y.Assert.areSame("Jean Durand", source.EmpsDS.name);
			Y.Assert.areSame(70000, source.EmpsDS.salary);

			// Test of position
			Y.Assert.areSame(0, source.EmpsDS.getPosition());

			source.EmpsDS.selectNext();
			Y.Assert.areSame(2, source.EmpsDS.ID);
			Y.Assert.areSame("Isabelle Dubois", source.EmpsDS.name);
			Y.Assert.areSame(80000, source.EmpsDS.salary);

			// Test of position
			Y.Assert.areSame(1, source.EmpsDS.getPosition());

			source.EmpsDS.selectPrevious();
			Y.Assert.areSame(1, source.EmpsDS.ID);
			Y.Assert.areSame("Jean Durand", source.EmpsDS.name);
			Y.Assert.areSame(70000, source.EmpsDS.salary);

			// Test of position
			Y.Assert.areSame(0, source.EmpsDS.getPosition());

			source.EmpsDS.select(5);
			Y.Assert.areSame(6, source.EmpsDS.ID);
			Y.Assert.areSame("Steve Jobs", source.EmpsDS.name);
			Y.Assert.areSame(1000000, source.EmpsDS.salary);

			// Test of position
			Y.Assert.areSame(5, source.EmpsDS.getPosition());
		},

		// 29.  test of DataSource getElement exists
		testSourceGetElementExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getElement);
			Y.Assert.areSame("function", typeof source.CitiesDS.getElement);
		},

		// 30.  test of DataSource getElement logic Sync
		testSourceGetElementLogicSync: function () {
			var element = source.CitiesDS.getElement(3);
			Y.Assert.areSame("Palo Alto", element.name.getValue());
			Y.Assert.areSame(140000, element.pop.getValue());
		},

		// 31.  test of DataSource getElement logic Async
		testSourceGetElementLogicAsync: function () {
			var testRunner = this ;
			var result = source.CitiesDS.getElement(3,{
				'onSuccess': function(event) {
					testRunner.resume(function(){ 
						console.log(event);
						result = event.element ;
						Y.Assert.areNotSame(null, result);
						Y.Assert.areSame(3, event.position);
						Y.Assert.areSame(4, result.getAttributeValue("ID"));
						Y.Assert.areSame("Palo Alto", result.getAttributeValue("name"));
						Y.Assert.areSame(140000, result.getAttributeValue("pop"));
					});					
				},

				'onError': function(event) {
					testRunner.resume(function(){ 
						Y.Assert.fail("Error on Get Element !");
					});					
				}
			});
			testRunner.wait();
		},

		// 32.  test of DataSource getElement logic Async passing wrong position
		testSourceGetElementLogicAsyncWrongPosition: function () {
			var testRunner = this ;
			var result = source.CitiesDS.getElement(100,{
				'onSuccess': function(event) {
					testRunner.resume(function(){ 
						result = event.element ;
						Y.Assert.areSame(null, result);
					});					
				},

				'onError': function(event) {
					testRunner.resume(function(){ 
						Y.Assert.fail("Error on Get Element !");
					});					
				}
			});
			testRunner.wait();
		},

		// 33.  test of DataSource getID exists
		testSourceGetIDExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getID);
			Y.Assert.areSame("function", typeof source.CitiesDS.getID);
		},

		// 34.  test of DataSource getID logic 
		testSourceGetIDLogic: function () {
			Y.Assert.areSame("CitiesDS", source.CitiesDS.getID());
			Y.Assert.areSame("EmpsDS", source.EmpsDS.getID());
			Y.Assert.areSame("ArrayDS", source.ArrayDS.getID());
		},

		// 35.  test of DataSource getPosition exists
		testSourceGetPositionExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getID);
			Y.Assert.areSame("function", typeof source.CitiesDS.getID);
		},

		// 36.  test of DataSource getPosition logic
		testSourceGetPositionLogic: function () {
			source.EmpsDS.select(0) ;
			Y.Assert.areSame(0, source.EmpsDS.getPosition());

			source.EmpsDS.select(2) ;
			Y.Assert.areSame(2, source.EmpsDS.getPosition());

			source.EmpsDS.selectNext();
			Y.Assert.areSame(3, source.EmpsDS.getPosition());

			source.EmpsDS.selectPrevious();
			Y.Assert.areSame(2, source.EmpsDS.getPosition());

			// Test of empty dataSource
			Y.Assert.areSame(-1, source.EmptyDS.getPosition());

		},

		// 37.  test of Server DataSource addListener exists
		testSourceAddListenerExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.addListener);
			Y.Assert.areSame("function", typeof source.CitiesDS.addListener);
		},

		// 38.  test of Server DataSource addListener general logic
		testSourceAddListenerGeneralLogic: function () {

			// test of all event
			var allFlag = false ;
			function allHandler(event){
				console.log ("All Event Handler : ") ;
				console.log(event);
				allFlag = true ;
			}
			source.CitiesDS.addListener("all", allHandler);
			source.CitiesDS.selectNext();
			Y.Assert.areSame(true, allFlag, "all event did not occur !");

			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			function onCollectionChangeHandler(event){
				console.log ("onCollectionChange Event Handler : ");
				console.log(event);
				onCollectionChangeFlag = true ;
			}
			source.CitiesDS.addListener("onCollectionChange", onCollectionChangeHandler);
			source.CitiesDS.addNewElement();
			Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

			// test of onCurrentElementChange event
			var onCurrentElementChangeFlag = false ;
			function onCurrentElementChangeHandler(event){
				console.log ("onCurrentElementChange Event Handler : ") ;
				console.log(event);
				onCurrentElementChangeFlag = true ;
			}
			source.CitiesDS.addListener("onCurrentElementChange", onCurrentElementChangeHandler);
			source.CitiesDS.select(2);
			Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event did not occur !");		

			// test of attributeChange event
			var onAttributeChangeFlag = false ;
			function onAttributeChangeHandler(event){
				console.log ("onAttributeChange Event Handler : ") ;
				console.log(event);
				onAttributeChangeFlag = true ;
			}
			source.CitiesDS.addListener("onAttributeChange", onAttributeChangeHandler, {attributeName: "pop"});
			var pop = source.CitiesDS.pop ;
			//edit the pop attribute of the current entity
			source.CitiesDS.getAttribute("pop").setValue(pop + 1) ;
			//attribute change event should occur
			Y.Assert.areSame(true, onAttributeChangeFlag, "onAttributeChange event did not occur !");

			// test of cancelEntity event
			var onBeforeCurrentElementChangeFlag = false ;
			function onBeforeCurrentElementChangeHandler(event){
				console.log ("onBeforeCurrentElementChange Event Handler : ") ;
				console.log(event);
				onBeforeCurrentElementChangeFlag = true ;
			}
			source.CitiesDS.addListener("onBeforeCurrentElementChange", onBeforeCurrentElementChangeHandler);
			//move to next entity while the current was edited
			source.CitiesDS.selectNext();
			//cancel entity event should occur
			Y.Assert.areSame(true, onBeforeCurrentElementChangeFlag, "onBeforeCurrentElementChange event did not occur !");
		},

		// 39.  test of Server DataSource orderBy exists
		testSourceOrderByExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.orderBy);
			Y.Assert.areSame("function", typeof source.CitiesDS.orderBy);
		},

		// 40.  test of Server DataSource orderBy logic 
		testSourceOrderByLogic: function () {
			var testRunner = this ;

			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			function onCollectionChangeHandler(event){
				console.log ("onCollectionChange Event Handler : " + event);
				onCollectionChangeFlag = true ;
			}
			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//method call
			source.EmpsDS.orderBy(
					"salary desc", 
					{
						'onSuccess': function(event){
							testRunner.resume(function(){ 
								console.log("Async call to OrderBy succeed : ");
								console.log(event);

								//onCollectionChange event should occur
								Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

								//entities should be sorted
								var arr = [];
								var newEntityCollection = source.EmpsDS.getEntityCollection();
								newEntityCollection.forEach({ 
									'onSuccess': function(event){
										var salary = event.entity.salary.getValue();
										console.log(salary);
										arr.push(salary);
									}
								});

								for (var i = 0; i < arr.length - 1; i += 1) {
									if (arr[i + 1] > arr[i]) {
										console.log("OrderBy logic fails !");
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
			testRunner.wait();		
		},

		// 41.  test of Server DataSource query exists
		testSourceQueryExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.orderBy);
			Y.Assert.areSame("function", typeof source.CitiesDS.orderBy);
		},

		// 42.  test of Server DataSource query logic 
		testSourceQueryLogic: function () {
			var testRunner = this ;

			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			function onCollectionChangeHandler(event){
				console.log ("onCollectionChange Event Handler : " + event);
				onCollectionChangeFlag = true ;
			}

			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//method call
			source.EmpsDS.query("salary > 80000",
					{
				'onSuccess': function(event){
					testRunner.resume(function(){ 
						console.log("Async call to query succeed : ");
						console.log(event);

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
			testRunner.wait();		
		},

		// 43.  test of Server DataSource query logic parameterized
		testSourceQueryLogicParameterized: function () {
			var testRunner = this ;

			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			function onCollectionChangeHandler(event){
				console.log ("onCollectionChange Event Handler : " + event);
				onCollectionChangeFlag = true ;
			}

			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//method call
			source.EmpsDS.query("salary > :1 and salary < :2",
					{
				'params' : [70000, 100000],
				'onSuccess': function(event){
					testRunner.resume(function(){ 
						console.log("Async call to query succeed : ");
						console.log(event);

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
			testRunner.wait();		
		},

		// 44.  test of Server DataSource query logic not found
		testSourceQueryLogicNotFound: function () {
			var testRunner = this ;

			// add onCollectionChange event handler
			var onCollectionChangeFlag = false ;
			function onCollectionChangeHandler(event){
				console.log ("onCollectionChange Event Handler : " + event);
				onCollectionChangeFlag = true ;
			}

			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//method call
			source.EmpsDS.query("salary < 0",
					{
				'onSuccess': function(event){
					testRunner.resume(function(){ 
						console.log("Async call to query succeed : ");
						console.log(event);

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
			testRunner.wait();		
		},

		// 45.  test of Server DataSource isNewElement exists
		testSourceIsNewElementExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.isNewElement);
			Y.Assert.areSame("function", typeof source.CitiesDS.isNewElement);
		},

		// 46.  test of Server DataSource addNewElement logic
		testSourceIsNewElementLogic: function () {
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

		// 47.  test of Server DataSource addNewElement exists
		testSourceAddNewElementExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.addNewElement);
			Y.Assert.areSame("function", typeof source.CitiesDS.addNewElement);
		},

		// 48.  test of Server DataSource addNewElement logic
		testSourceAddNewElementLogic: function () {
			//Get the datasource length before method call
			var oldLength = source.CitiesDS.length ;

			// add onCurrentElementChange event handler
			var onCurrentElementChangeFlag = false ;
			function onCurrentElementChangeHandler(event){
				console.log ("onCurrentElementChange Event Handler : ") ;
				console.log(event);
				onCurrentElementChangeFlag = true ;
			}
			source.CitiesDS.addListener("onCurrentElementChange", onCurrentElementChangeHandler);

			// add onCollectionChange event handler
			var onCollectionChangeFlag = false ;
			function onCollectionChangeHandler(event){
				console.log ("onCollectionChange Event Handler : ");
				console.log(event);
				onCollectionChangeFlag = true ;
			}
			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//call the method
			source.CitiesDS.addNewElement();

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

		},



		// 49.  test of Server DataSource allEntities exists
		testAllEntitiesExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.allEntities);
			Y.Assert.areSame("function", typeof source.CitiesDS.allEntities);
		},


		// 50.  test of Server DataSource allEntities logic
		testAllEntitiesLogic: function () {
			var testRunner = this ;
			//Get the datasource length before method call
			var oldLength = source.CitiesDS.length ;

			// add onCurrentElementChange event handler
			var onCurrentElementChangeFlag = false ;
			function onCurrentElementChangeHandler(event){
				console.log ("onCurrentElementChange Event Handler : ") ;
				console.log(event);
				onCurrentElementChangeFlag = true ;
			}
			source.CitiesDS.addListener("onCurrentElementChange", onCurrentElementChangeHandler);

			// add onCollectionChange event handler
			var onCollectionChangeFlag = false ;
			function onCollectionChangeHandler(event){
				console.log ("onCollectionChange Event Handler : " + event);
				onCollectionChangeFlag = true ;
			}

			source.CitiesDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//call the method
			source.CitiesDS.allEntities(
					{
						'onSuccess': function(event){
							testRunner.resume(function(){ 
								console.log("Async call to allEntities succeed : ");
								console.log(event);

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
								Y.Assert.areSame(source.CitiesDS.ID, 1, "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.name, "Paris", "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.pop, 2000000, "entity value should be the same as stored in the datastore");

								source.CitiesDS.selectNext();
								//values should all be the same as stored in the datastore
								Y.Assert.areSame(source.CitiesDS.ID, 2, "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.name, "Cupertino", "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.pop, 250000, "entity value should be the same as stored in the datastore");

								source.CitiesDS.selectNext();
								//values should all be the same as stored in the datastore
								Y.Assert.areSame(source.CitiesDS.ID, 3, "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.name, "New York", "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.pop, 4000000, "entity value should be the same as stored in the datastore");

								source.CitiesDS.selectNext();
								//values should all be the same as stored in the datastore
								Y.Assert.areSame(source.CitiesDS.ID, 4, "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.name, "Palo Alto", "entity value should be the same as stored in the datastore");
								Y.Assert.areSame(source.CitiesDS.pop, 140000, "entity value should be the same as stored in the datastore");
							});
						},
						'onError': function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async Call to allEntities fails !");
							});	
						}
					}
			);
			testRunner.wait();		


		},

		// 51.
		testSourceToArrayExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.toArray);
		},

		// 52.
		testSourceToArrayLogicOneAttribute : function(){
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
			source.CitiesDS.toArray( "name",
					{
				'onSuccess': function(event){
					testRunner.resume(function(){
						console.log("Async call to toArray succeeds !");
						console.log(event);
						//existance of result
						Y.Assert.areNotSame("undefined", event.result);
						Y.Assert.isArray(event.result, "result should be an array");
						//content of result
						console.log(event.result);
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
			testRunner.wait();

		},

		// 53.
		testSourceToArrayLogicTwoAttribute : function(){
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
			source.CitiesDS.toArray( "name, pop",
					{
				'onSuccess': function(event){
					testRunner.resume(function(){
						console.log("Async call to toArray succeeds !");
						console.log(event);
						//existance of result
						Y.Assert.areNotSame("undefined", event.result);
						Y.Assert.isArray(event.result, "result should be an array");
						//content of result
						console.log(event.result);
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
						Y.ArrayAssert.itemsAreSame([2000000, 250000, 4000000, 140000], pops);
					});
				},
				'onError': function(event){
					testRunner.resume(function(){
						Y.Assert.fail("Async call to toArray failed !");
					});
				}
					}

			);
			testRunner.wait();

		},

		// 54.  test of Server DataSource serverRefresh exists
		testSourceServerRefreshExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.serverRefresh);
			Y.Assert.areSame("function", typeof source.CitiesDS.serverRefresh);
		},

		// 55.  test of Server DataSource serverRefresh logic
		testSourceServerRefreshLogic: function () {
			//add new element
			source.CitiesDS.addNewElement();

			var testRunner = this ;
			source.CitiesDS.serverRefresh(
					{
						onSuccess: function(event){
							testRunner.resume(function(){ 
								//Server logic should be called
								Y.Assert.areSame(5, source.CitiesDS.ID, "Server logic should be called");

								//nothing should be saved in the server
								source.CitiesDS.query("id=5",
										{
									'onSuccess': function(event){
										testRunner.resume(function(){ 
											console.log("Async call to query succeed : ");	
											//No entity should be returned
											Y.Assert.areSame(0, source.CitiesDS.length, "No entity should be returned");
										});
									},
									'onError': function(error){
										testRunner.resume(function(){ 
											Y.Assert.fail("Async Call to query fails !");
										});	
									}
										}
								);
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
			testRunner.wait();

		},

		// 56.  test of Server DataSource save exists
		testSourceServerSaveExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.save);
			Y.Assert.areSame("function", typeof source.CitiesDS.save);
		},


		// 57.  test of Server DataSource save logic update
		testSourceServerSaveLogicUpdate: function () {
			// get the test runner
			var testRunner = this ;

			//get all entities
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
								source.CitiesDS.save(
										{
											'onSuccess': function(event){
												testRunner.resume(function(){ 
													console.log("Async call to save succeed "); 
													console.log(event);
													Y.Assert.areSame("Casablanca", event.dataSource.name);
													Y.Assert.areSame(3200000, event.dataSource.pop);
													ds.City.find("id = :1",
															{
														'params': [id],
														'onSuccess': function(event){
															testRunner.resume(function(){ 
																console.log("Async call to find succeed : ");  
																//Saved entity should be returned
																Y.Assert.areNotSame(null, event.entity, "Saved entity should be returned");
																Y.Assert.areSame("Casablanca", event.entity.name.getValue(), "Saved values should be the same as entered");
																Y.Assert.areSame(3200000, event.entity.pop.getValue(), "Saved values should be the same as entered");
															});
														},
														'onError': function(error){
															testRunner.resume(function(){ 
																Y.Assert.fail("Async Call to find fails !");
															}); 
														}
															}
													);
													testRunner.wait();     
												});
											},
											'onError': function(error){
												testRunner.resume(function(){ 
													Y.Assert.fail("Async Call to save fails");
												}); 
											}
										}
								);
								testRunner.wait();    
							});
						},
						'onError': function(event){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async Call to allEntities fails !");
							});
						}

					});
			testRunner.wait();    

		},

		// 58.  test of Server DataSource save logic add new
		testSourceServerSaveLogicAddNew: function () {
			//add new element
			source.CitiesDS.addNewElement();

			var testRunner = this ;
			//call serverRefresh to get the new ID
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
								source.CitiesDS.save(
										{
											'onSuccess': function(event){
												testRunner.resume(function(){ 
													console.log("Async call to save succeed "); 
													console.log(event);
													Y.Assert.areSame("Rabat", event.dataSource.name);
													Y.Assert.areSame(2000000, event.dataSource.pop);
													//Y.Assert.isFalse(event.dataSource.isNewElement(), "Saved entity shouldn't be new anymore");
													ds.City.find("id = :1 and name = :2 and pop = :3",
															{
														'params': [id+1, "Rabat", 2000000],
														'onSuccess': function(event){
															testRunner.resume(function(){ 
																console.log("Async call to find succeed : ");  
																//Saved entity should be returned
																Y.Assert.areNotSame(null, event.entity, "Saved entity should be returned");
																Y.Assert.areSame("Rabat", event.entity.name.getValue(), "Saved values should be the same as entered");
																Y.Assert.areSame(2000000, event.entity.pop.getValue(), "Saved values should be the same as entered");
															});
														},
														'onError': function(error){
															testRunner.resume(function(){ 
																Y.Assert.fail("Async Call to find fails !");
															}); 
														}
															}
													);
													testRunner.wait();     
												});
											},
											'onError': function(error){
												testRunner.resume(function(){ 
													Y.Assert.fail("Async Call to save fails");
												}); 
											}
										}
								);
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
			testRunner.wait();

		},

		// 59.  test of Server DataSource dropCurrent exists
		testSourceDropCurrentExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.dropCurrent);
			Y.Assert.areSame("function", typeof source.CitiesDS.dropCurrent);
		},


		// 60.  test of Server DataSource dropCurrent logic new element
		testSourceDropCurrentLogicNew: function () {	
			//get the test runner
			var testRunner = this ;

			//get the current id
			var id = source.CitiesDS.ID;
			console.log("id to delete :" + id);

			//call dropCurrent on current element
			source.CitiesDS.dropCurrent(
					{
						'onSuccess': function(event){
							testRunner.resume(function(){ 
								console.log("Async call to dropCurrent succeed : ");
								console.log(event);
								ds.City.find("id = :1",
										{
									'params': [id],
									'onSuccess': function(event){
										testRunner.resume(function(){ 
											console.log("Async call to find succeed : ");  
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
			testRunner.wait();

		},

		// 61.  test of Server DataSource dropCurrent logic select
		testSourceDropCurrentLogicSelect: function () {	
			//get the test runner
			var testRunner = this ;
			//point the second element
			source.CitiesDS.select(1);
			//get the current id
			var id = source.CitiesDS.ID;

			//call dropCurrent on current element
			source.CitiesDS.dropCurrent(
					{
						'onSuccess': function(event){
							testRunner.resume(function(){ 
								console.log("Async call to dropCurrent succeed : ");
								console.log(event);
								ds.City.find("id = :1",
										{
									'params': [id],
									'onSuccess': function(event){
										testRunner.resume(function(){ 
											console.log("Async call to find succeed : ");  
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
			testRunner.wait();

		},

		// 62.
		testSourceAddEntityExistsDS : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.addEntity);
			Y.Assert.areSame("function", typeof source.CitiesDS.addEntity);
		},

		// 63.
		testSourceAddEntityExistsRelatedDS : function(){
			Y.Assert.areSame("undefined", typeof source.EmpsByCompDS.addEntity,"addEntity() should not be available for a related ds");
		},

		// 64.
		testSourceAddEntityLogic : function(){
			//get the test runner
			var testRunner = this;

			//create a new entity
			var newEmp = new WAF.Entity(ds.Emp);
			newEmp.ID.setValue(20);
			newEmp.name.setValue("Eric Golbert");
			newEmp.salary.setValue(25000);
			newEmp.company.setValue(source.CitiesDS.getCurrentElement());

			console.log(newEmp);

			//get the length before calling the method
			var oldLength = source.EmpsDS.length;

			//add onCurrentElementChange event listener
			var onCurrentElementChangeFlag = false;
			source.CitiesDS.addListener("onCurrentElementChange", function(event){
				onCurrentElementChangeFlag = true;
			});

			// call the method
			source.EmpsDS.addEntity(newEmp);

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
			ds.Emp.find("id = 20", 
					{
				'onSuccess': function(event){
					testRunner.resume(function(){
						//Entity should not be stored
						Y.Assert.areSame(null, event.entity, "Entity should not be stored !");
					});
				},
				'onError': function(event){
					testRunner.resume(function(){
						Y.Assert.fail("Async call to find failed !");
					});
				}
					}

			);
			testRunner.wait();

		},

		// 65.
		testSourceNewEntityExistsDS : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.newEntity);
			Y.Assert.areSame("function", typeof source.CitiesDS.newEntity);
		},

		// 66.
		testSourceNewEntityExistsRelatedDS : function(){
			// accroding to the doc, this method shouldn't be available for related datasources
			Y.Assert.areSame("undefined", typeof source.EmpsByCompDS.newEntity ,"newEntity() should not be available for a related ds");
		},

		// 67.
		testSourceNewEntityLogic : function(){
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
			testRunner.wait();

		},

		// 68.
		testSourceGetEntityCollectionExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getEntityCollection);
			Y.Assert.areSame("function", typeof source.CitiesDS.getEntityCollection);
		},

		// 69.
		testSourceGetEntityCollectionLogic : function(){		
			//method call
			var entityCollection = source.CitiesDS_.getEntityCollection();

			//entityCollection should be available
			Y.Assert.areNotSame("undefined", typeof entityCollection);
			Y.Assert.areSame("object", typeof entityCollection);
			Y.Assert.areSame(true, entityCollection instanceof WAF.EntityCollection, "entityCollection should be an instance of  WAF.EntityCollection");

			//entityCollection should contain 4 elements
			Y.Assert.areSame(4, entityCollection.length, "entityCollection should contain 4 elements");

		},

		// 70.
		testSourceGetDataModelExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getDataClass);
			Y.Assert.areSame("function", typeof source.CitiesDS.getDataClass);
		},

		// 71.
		testSourceGetDataClassLogic : function(){		
			//method call
			var dataClass = source.CitiesDS.getDataClass();

			//dataClass object should be well defined
			Y.Assert.areNotSame("undefined", typeof dataClass);
			Y.Assert.areSame("object", typeof dataClass);

			//dataClass name should be Cities
			Y.Assert.areSame("City", dataClass.getName());

		},

		// 72.
		testSourceGetClassTitleExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getClassTitle);
			Y.Assert.areSame("function", typeof source.CitiesDS.getClassTitle);
		},

		// 73.
		testSourceGetClassTitleLogic : function(){
			Y.Assert.areSame("City", source.CitiesDS.getClassTitle());		
		},

		// 74.
		testSourceGetAttributeNamesExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getAttributeNames);
			Y.Assert.areSame("function", typeof source.CitiesDS.getAttributeNames);
		},

		// 75.
		testSourceGetAttributeNamesLogic : function(){
			var attArray = source.CitiesDS.getAttributeNames()
			Y.Assert.areNotSame("undefined", typeof attArray);
			Y.Assert.isArray(attArray);
			Y.ArrayAssert.itemsAreSame(["ID", "name", "pop", "companies"], attArray);		
		},

		// 76.
		testSourceGetClassAttributeByNameExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getClassAttributeByName);
			Y.Assert.areSame("function", typeof source.CitiesDS.getClassAttributeByName);
		},

		// 77.
		testSourceGetClassAttributeByNameLogic : function(){
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


		// 78.
		testSourceFilterQueryExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.EmpsDS.filterQuery);
		},

		// 79.
		testSourceFilterQueryLogic : function(){
			//get the test runner
			var testRunner = this ;

			//call query method
			source.EmpsDS.query("salary > 60000 and salary < 120000",
					{
				'onSuccess': function(event){
					testRunner.resume(function(){ 
						console.log("Async call to query succeed : ");
						console.log(event);

						//Returned entityCollection should match the query conditions
						Y.Assert.areSame(6, source.EmpsDS.length, "Returned entityCollection should match the query conditions");

						// add onCurrentElementChange event handler
						var onCurrentElementChangeFlag = false ;
						function onCurrentElementChangeHandler(event){
							console.log ("onCurrentElementChange Event Handler : ") ;
							console.log(event);
							onCurrentElementChangeFlag = true ;
						}
						source.EmpsDS.addListener("onCurrentElementChange", onCurrentElementChangeHandler);

						// add onCollectionChange event handler
						var onCollectionChangeFlag = false ;
						function onCollectionChangeHandler(event){
							console.log ("onCollectionChange Event Handler : " + event);
							onCollectionChangeFlag = true ;
						}

						source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);

						//call filterQuery method
						source.EmpsDS.filterQuery("age = 25",
								{
							'onSuccess': function(event){
								testRunner.resume(function(){ 
									console.log("Async call to filterQuery succeed : ");
									console.log(event);

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
			testRunner.wait();		


		},

		// 80.
		testSourceSetEntityCollectionExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.EmpsDS.setEntityCollection);
		},

		// 81.
		testSourceSetEntityCollectionLogic : function(){
			//get the test runner
			var testRunner = this ;

			//call query method
			source.EmpsDS.query("salary > 60000 and salary < 120000",
					{
				'onSuccess': function(event){
					testRunner.resume(function(){ 
						console.log("Async call to query succeed : ");
						console.log(event);

						//Returned entityCollection should match the query conditions
						Y.Assert.areSame(6, source.EmpsDS.length, "Returned entityCollection should match the query conditions");

						// add onCurrentElementChange event handler
						var onCurrentElementChangeFlag = false ;
						function onCurrentElementChangeHandler(event){
							console.log ("onCurrentElementChange Event Handler : ") ;
							console.log(event);
							onCurrentElementChangeFlag = true ;
						}
						source.EmpsDS_.addListener("onCurrentElementChange", onCurrentElementChangeHandler);

						// add onCollectionChange event handler
						var onCollectionChangeFlag = false ;
						function onCollectionChangeHandler(event){
							console.log ("onCollectionChange Event Handler : " + event);
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
			testRunner.wait();				

		},

		// 82.
		testLocalSourceGetDataClassExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.ArrayDS.getDataClass);
			Y.Assert.areSame("function", typeof source.ArrayDS.getDataClass);

			Y.Assert.areNotSame("undefined", typeof source.VariableDS.getDataClass);
			Y.Assert.areSame("function", typeof source.VariableDS.getDataClass);
		},

		// 83.
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

		// 84.
		testLocalSourceGetClassTitleExists : function(){
			//array
			Y.Assert.areNotSame("undefined", typeof source.VariableDS.getClassTitle);
			Y.Assert.areSame("function", typeof source.VariableDS.getClassTitle);

			//variable
			Y.Assert.areNotSame("undefined", typeof source.VariableDS.getClassTitle);
			Y.Assert.areSame("function", typeof source.VariableDS.getClassTitle);
		},

		// 85.
		testLocalSourceGetClassTitleLogic : function(){
			//array
			Y.Assert.areSame("arrayDS", source.ArrayDS.getClassTitle(), "Should return the name of the bound array");	

			//variable
			Y.Assert.areSame("variable", source.VariableDS.getClassTitle(), "Should return the name of the bound variable");	
		},

		// 86.
		testLocalSourceGetAttributeNamesExists : function(){
			//array
			Y.Assert.areNotSame("undefined", typeof source.ArrayDS.getAttributeNames);
			Y.Assert.areSame("function", typeof source.ArrayDS.getAttributeNames);

			//variable
			Y.Assert.areNotSame("undefined", typeof source.VariableDS.getAttributeNames);
			Y.Assert.areSame("function", typeof source.VariableDS.getAttributeNames);
		},

		// 87.
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

		// 88.
		testLocalSourceGetClassAttributeByNameExists : function(){
			//array
			Y.Assert.areNotSame("undefined", typeof source.ArrayDS.getClassAttributeByName);
			Y.Assert.areSame("function", typeof source.ArrayDS.getClassAttributeByName);

			//variable
			Y.Assert.areNotSame("undefined", typeof source.VariableDS.getClassAttributeByName);
			Y.Assert.areSame("function", typeof source.VariableDS.getClassAttributeByName);
		},

		// 89.
		testLocalSourceGetClassAttributeByNameLogic : function(){

			var attribute = source.ArrayDS.getClassAttributeByName("name");

			//existance
			Y.Assert.areNotSame("undefined", typeof attribute);
			Y.Assert.areSame("object", typeof attribute);

			//content
			console.log(attribute);
			Y.Assert.areSame("name", attribute.name);	
			Y.Assert.areSame("string", attribute.type);
			Y.Assert.areSame("storage", attribute.kind);	
		},

		// 90.
		testLocalSourceAddNewElementExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.ArrayDS.addNewElement);
			Y.Assert.areSame("function", typeof source.ArrayDS.addNewElement);
		},

		// 91.
		testLocalSourceAddNewElementLogic: function () {
			//Get the datasource length before method call
			var oldLength = source.ArrayDS.length ;

			// add onCurrentElementChange event handler
			var onCurrentElementChangeFlag = false ;
			function onCurrentElementChangeHandler(event){
				console.log ("onCurrentElementChange Event Handler : ") ;
				console.log(event);
				onCurrentElementChangeFlag = true ;
			}
			source.CitiesDS.addListener("onCurrentElementChange", onCurrentElementChangeHandler);

			// add onCollectionChange event handler
			var onCollectionChangeFlag = false ;
			function onCollectionChangeHandler(event){
				console.log ("onCollectionChange Event Handler : " + event);
				onCollectionChangeFlag = true ;
			}
			source.EmpsDS.addListener("onCollectionChange", onCollectionChangeHandler);

			//call the method
			source.ArrayDS.addNewElement();

			//length should be incremented
			var newLength = source.ArrayDS.length ;
			Y.Assert.areSame(newLength, oldLength + 1);

			//New flag should be set to true
			Y.Assert.areSame(true, source.ArrayDS.isNewElement(), "New flag should be set to true");

			//onCollectionChange event should occur
			Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");
			//onCurrentElementChange event should occur
			Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event did not occur !");	

		},

		// 92.
		testLocalSourceSaveExists: function () {
			//array
			Y.Assert.areNotSame("undefined", typeof source.ArrayDS.save);
			Y.Assert.areSame("function", typeof source.ArrayDS.save);

			//variable
			Y.Assert.areNotSame("undefined", typeof source.VariableDS.save);
			Y.Assert.areSame("function", typeof source.VariableDS.save);
		},


		// 93.
		testLocalSourceSaveLogicUpdateUsingPropertyAccess: function () {
			/*
			// get the test runner
			var testRunner = this ;

			//position of the element to update
			var pos = 1;

			//Point the second element
			source.ArrayDS.select(pos);

			//Edit the current element
			source.ArrayDS.name = "Casablanca";
			source.ArrayDS.pop = 3200000;

			//call save method
			source.ArrayDS.save(
					{
						'onSuccess': function(event){
							testRunner.resume(function(){ 
								console.log("Async call to save succeeds"); 
								console.log(event);
								//source array should be updated
								Y.Assert.areSame("Casablanca", window["arrayDS"][pos].name, "source array should be updated");
								Y.Assert.areSame(3200000, window["arrayDS"][pos].pop, "source array should be updated");
							});
						},
						'onError': function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async call to save fails");
							}); 
						}
					}
			);
			testRunner.wait();         
			 */
		},

		// 94.
		testLocalSourceSaveLogicUpdateUsingAttributeObject: function () {
			/*
			// get the test runner
			var testRunner = this ;

			//position of the element to update
			var pos = 1;

			//Point the second element
			source.ArrayDS.select(pos);

			//Edit the current element
			source.ArrayDS.getAttribute("name").setValue("Casablanca");
			source.ArrayDS.getAttribute("pop").setValue(3200000);

			//call save method
			source.ArrayDS.save(
					{
						'onSuccess': function(event){
							testRunner.resume(function(){ 
								console.log("Async call to save succeeds"); 
								console.log(event);
								//source array should be updated
								Y.Assert.areSame("Casablanca", window["arrayDS"][pos].name, "source array should be updated");
								Y.Assert.areSame(3200000, window["arrayDS"][pos].pop, "source array should be updated");
							});
						},
						'onError': function(error){
							testRunner.resume(function(){ 
								Y.Assert.fail("Async call to save fails");
							}); 
						}
					}
			);
			testRunner.wait();   
			*/

		},

		// 95.
		testLocalSourceSyncExists: function () {
			//array
			Y.Assert.areNotSame("undefined", typeof source.ArrayDS.sync);
			Y.Assert.areSame("function", typeof source.ArrayDS.sync);

			//variable
			Y.Assert.areNotSame("undefined", typeof source.VariableDS.sync);
			Y.Assert.areSame("function", typeof source.VariableDS.sync);
		},  

		// 96.
		testArrayLocalSourceSyncLogic: function () {
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

			//the corresponding element in the source data should be updated
			Y.Assert.areSame("Tokyo", source.ArrayDS.name,"the corresponding element in the source data should be updated");
			Y.Assert.areSame(37730064, source.ArrayDS.pop,"the corresponding element in the source data should be updated");

		},

		// 97.
		testVariableLocalSourceSyncLogic: function () {
			//get the variable value
			var value = window["variable"];

			//edit the variable
			window["variable"] = value + 1;

			//the datasource value should remain intact
			Y.Assert.areSame(value, source.VariableDS.variable, "the datasource value should remain intact");

			//call sync method
			source.VariableDS.sync();

			//the datasource value should be updated
			Y.Assert.areSame(value + 1, source.VariableDS.variable, "the datasource value should be updated");

		},

		// 98.

		testServerSourceCallMethodExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.callMethod);
			Y.Assert.areSame("function", typeof source.CitiesDS.callMethod);
		},  

		// 99.
		testServerSourceCallMethodLogicDataClass: function () {
			var testRunner = this ;
			//call the distant DataClass method 
			source.CitiesDS.callMethod({
				'method' :"methodDataClass",
				'onSuccess' : function(event){
					testRunner.resume(function(){ 
						console.log("Async call to callMethod succeeds !");
						Y.Assert.areSame("DataClass", event.result);
					});
				},
				'onError' : function(error){
					testRunner.resume(function(){ 
						Y.Assert.fail("Async call to callMethod fails !");
					});
				}		
			});
			testRunner.wait(2000);
		},

		// 100.
		testServerSourceCallMethodLogicEntityCollection: function () {
			var testRunner = this ;
			//call the distant EntityCollection method 
			source.CitiesDS.callMethod({
				'method' :"methodEntityCollection",
				'onSuccess' : function(event){
					testRunner.resume(function(){ 
						console.log("Async call to callMethod succeeds !");
						Y.Assert.areSame("EntityCollection", event.result);
					});
				},
				'onError' : function(error){
					testRunner.resume(function(){ 
						Y.Assert.fail("Async call to callMethod fails !");
					});
				}		
			});
			testRunner.wait(2000);
		},

		// 101.
		testServerSourceCallMethodLogicEntity: function () {
			var testRunner = this ;
			//call the distant entity method 
			source.CitiesDS.callMethod({
				'method' :"methodEntity",
				'onSuccess' : function(event){
					testRunner.resume(function(){ 
						console.log("Async call to callMethod succeeds !");
						Y.Assert.areSame("Entity", event.result);
					});
				},
				'onError' : function(error){
					testRunner.resume(function(){ 
						Y.Assert.fail("Async call to callMethod fails !");
					});
				}		
			});
			testRunner.wait(2000);
		},

		// 102.
		testSourceDispatchExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.dispatch);
			Y.Assert.areSame("function", typeof source.CitiesDS.dispatch);
		},

		// 103.
		testSourceDispatchLogic: function () {
			// test of all event
			var allFlag = false ;
			function allHandler(event){
				console.log ("All Event Handler : ") ;
				console.log(event);
				allFlag = true ;
			}
			source.CitiesDS.addListener("all", allHandler);
			//dispatch
			source.CitiesDS.dispatch("all");
			//all event should occur
			Y.Assert.areSame(true, allFlag, "all event did not occur !");

			// test of onCollectionChange event
			var onCollectionChangeFlag = false ;
			function onCollectionChangeHandler(event){
				console.log ("onCollectionChange Event Handler : ");
				console.log(event);
				onCollectionChangeFlag = true ;
			}
			source.CitiesDS.addListener("onCollectionChange", onCollectionChangeHandler);
			//dispatch
			source.CitiesDS.dispatch("onCollectionChange");
			//onCollectionChange event should occur
			Y.Assert.areSame(true, onCollectionChangeFlag, "onCollectionChange event did not occur !");

			// test of onCurrentElementChange event
			var onCurrentElementChangeFlag = false ;
			function onCurrentElementChangeHandler(event){
				console.log ("onCurrentElementChange Event Handler : ") ;
				console.log(event);
				onCurrentElementChangeFlag = true ;
			}
			source.CitiesDS.addListener("onCurrentElementChange", onCurrentElementChangeHandler);
			//dispatch
			source.CitiesDS.dispatch("onCurrentElementChange");
			//onCurrentElementChange event should occur
			Y.Assert.areSame(true, onCurrentElementChangeFlag, "onCurrentElementChange event did not occur !");		

			// test of attributeChange event
			var onAttributeChangeFlag = false ;
			function onAttributeChangeHandler(event){
				console.log ("onAttributeChange Event Handler : ") ;
				console.log(event);
				onAttributeChangeFlag = true ;
			}
			source.CitiesDS.addListener("onAttributeChange", onAttributeChangeHandler, {attributeName: "pop"});
			var pop = source.CitiesDS.pop ;
			//dispatch
			source.CitiesDS.dispatch("onAttributeChange");
			//onAttributeChange event should occur
			Y.Assert.areSame(true, onAttributeChangeFlag, "onAttributeChange event did not occur !");

			// test of cancelEntity event
			var onBeforeCurrentElementChangeFlag = false ;
			function onBeforeCurrentElementChangeHandler(event){
				console.log ("onBeforeCurrentElementChange Event Handler : ") ;
				console.log(event);
				onBeforeCurrentElementChangeFlag = true ;
			}
			source.CitiesDS.addListener("onBeforeCurrentElementChange", onBeforeCurrentElementChangeHandler);
			//dispatch
			source.CitiesDS.dispatch("onBeforeCurrentElementChange");
			//onBeforeCurrentElementChange event should occur
			Y.Assert.areSame(true, onBeforeCurrentElementChangeFlag, "onBeforeCurrentElementChange event did not occur !");
		},

		// 104.
		testSourceAutoDispatchExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.autoDispatch);
			Y.Assert.areSame("function", typeof source.CitiesDS.autoDispatch);
		},

		// 105.
		testSourceAutoDispatchLogic: function () {		
			//point the third element    	
			source.CompaniesDS.select(2);

			//get an attribute value
			var value = source.CompaniesDS.ca;

			// add attributeChange listener
			var onAttributeChangeFlag = false ;
			function onAttributeChangeHandler(event){
				console.log ("onAttributeChange Event Handler : ") ;
				console.log(event);
				onAttributeChangeFlag = true ;
			}
			source.CompaniesDS.addListener("onAttributeChange", onAttributeChangeHandler, {attributeName: "ca"});

			//edit datasource values
			source.CompaniesDS.ca = value +1 ;

			//get real value in the current element
			Y.Assert.areSame(value, source.CompaniesDS.getCurrentElement().ca.getValue());

			//event should not be triggered
			Y.Assert.areSame(false, onAttributeChangeFlag, "onAttributeChange event should not occur !");

			//call autoDispatch
			source.CompaniesDS.autoDispatch();

			//datasource values should be updated
			Y.Assert.areSame(value + 1, source.CompaniesDS.ca);

			//event should be triggered
			Y.Assert.areSame(true, onAttributeChangeFlag, "onAttributeChange event should occur !");

		}



};