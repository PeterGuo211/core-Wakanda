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
		name: "Server DataSource and Browsing Data",
		
        _should: {
            ignore: {

            }
        },
        
        setUp : function () {
           
        },
        
		/**
 		 * SDBD-2.1 getCurrentElement method exists
 		 */
		testGetCurrentElementExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.EmpsDS.getCurrentElement);
			Y.Assert.areSame("function", typeof source.EmpsDS.getCurrentElement);
		},

		/**
 		 * SDBD-2.2 getCurrentElement method logic 
 		 */
		testCurrentElementLogicUsingGet: function () {
			source.EmpsDS.select(0) ;
			var currentEntity = source.EmpsDS.getCurrentElement();
			var currentID = source.EmpsDS.ID;
			Y.Assert.areSame(currentID, currentEntity.ID.getValue());
			Y.Assert.areSame("Jean Durand", currentEntity.name.getValue());
			Y.Assert.areSame(70000, currentEntity.salary.getValue());

			source.EmpsDS.selectNext();
			currentEntity = source.EmpsDS.getCurrentElement();
			currentID = source.EmpsDS.ID;
			Y.Assert.areSame(currentID, currentEntity.ID.getValue());
			Y.Assert.areSame("Isabelle Dubois", currentEntity.name.getValue());
			Y.Assert.areSame(80000, currentEntity.salary.getValue());

			source.EmpsDS.selectPrevious();
			currentEntity = source.EmpsDS.getCurrentElement();
			currentID = source.EmpsDS.ID;
			Y.Assert.areSame(currentID, currentEntity.ID.getValue());
			Y.Assert.areSame("Jean Durand", currentEntity.name.getValue());
			Y.Assert.areSame(70000, currentEntity.salary.getValue());

			source.EmpsDS.select(5);
			currentEntity = source.EmpsDS.getCurrentElement();
			currentID = source.EmpsDS.ID;
			Y.Assert.areSame(currentID, currentEntity.ID.getValue());
			Y.Assert.areSame("Steve Jobs", currentEntity.name.getValue());
			Y.Assert.areSame(1000000, currentEntity.salary.getValue());
		},

		/**
 		 * SDBD-2.3 Current Element logic using property access
 		 */
		testCurrentElementLogicUsingPropertyAccess: function () {
			source.EmpsDS.select(0) ;
			var currentEntity = source.EmpsDS.getCurrentElement();
			Y.Assert.areSame(currentEntity.ID.getValue(), source.EmpsDS.ID);
			Y.Assert.areSame("Jean Durand", source.EmpsDS.name);
			Y.Assert.areSame(70000, source.EmpsDS.salary);

			// Test of position
			Y.Assert.areSame(0, source.EmpsDS.getPosition());

			source.EmpsDS.selectNext();
			currentEntity = source.EmpsDS.getCurrentElement();
			Y.Assert.areSame(currentEntity.ID.getValue(), source.EmpsDS.ID);
			Y.Assert.areSame("Isabelle Dubois", source.EmpsDS.name);
			Y.Assert.areSame(80000, source.EmpsDS.salary);

			// Test of position
			Y.Assert.areSame(1, source.EmpsDS.getPosition());

			source.EmpsDS.selectPrevious();
			currentEntity = source.EmpsDS.getCurrentElement();
			Y.Assert.areSame(currentEntity.ID.getValue(), source.EmpsDS.ID);
			Y.Assert.areSame("Jean Durand", source.EmpsDS.name);
			Y.Assert.areSame(70000, source.EmpsDS.salary);

			// Test of position
			Y.Assert.areSame(0, source.EmpsDS.getPosition());

			source.EmpsDS.select(5);
			currentEntity = source.EmpsDS.getCurrentElement();
			Y.Assert.areSame(currentEntity.ID.getValue(), source.EmpsDS.ID);
			Y.Assert.areSame("Steve Jobs", source.EmpsDS.name);
			Y.Assert.areSame(1000000, source.EmpsDS.salary);

			// Test of position
			Y.Assert.areSame(5, source.EmpsDS.getPosition());
		},
		
		/**
 		 * SDBD-3.1 getElement method exists
 		 */
		testSourceGetElementExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getElement);
			Y.Assert.areSame("function", typeof source.CitiesDS.getElement);
		},

		/**
 		 * SDBD-3.3 getElement method logic async
 		 */
		testSourceGetElementLogicAsync: function () {
			var testRunner = this ;
			source.CitiesDS.select(3);
			var id = source.CitiesDS.ID;
			source.CitiesDS.select(4);
			window.setTimeout(function () {
				source.CitiesDS.getElement(3,{
					'onSuccess': function(event) {
						testRunner.resume(function(){ 
							result = event.element ;
							Y.Assert.areNotSame(null, result);
							Y.Assert.areSame(3, event.position," pos: "+event.position);
							Y.Assert.areSame(id, result.getAttributeValue("ID"),"id :"+id+", result: "+result.getAttributeValue("ID"));
							Y.Assert.areSame("Palo Alto", result.getAttributeValue("name")," result on name : "+result.getAttributeValue("name"));
							Y.Assert.areSame(4000000, result.getAttributeValue("pop")," result on pop : "+result.getAttributeValue("pop"));
						});					
					},
	
					'onError': function(event) {
						testRunner.resume(function(){ 
							Y.Assert.fail("Error on Get Element !");
						});					
					}
				});
			}, 50);
			testRunner.wait();
		},

		/**
 		 * SDBD-3.4 getElement method logic when passing wrong position
 		 */
		testSourceGetElementLogicAsyncWrongPosition: function () {
			var testRunner = this ;
			window.setTimeout(function () {
				source.CitiesDS.getElement(100,{
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
			}, 50);
			testRunner.wait();
		},
		
		/**
 		 * SDBD-4.1 getPosition method exists
 		 */
		testGetPositionExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getID);
			Y.Assert.areSame("function", typeof source.CitiesDS.getID);
		},

		/**
 		 * SDBD-4.2 getPosition method logic
 		 */
		testGetPositionLogic: function () {
			source.EmpsDS.select(0) ;
			Y.Assert.areSame(0, source.EmpsDS.getPosition());

			source.EmpsDS.select(2) ;
			Y.Assert.areSame(2, source.EmpsDS.getPosition());

			source.EmpsDS.selectNext();
			Y.Assert.areSame(3, source.EmpsDS.getPosition());

			source.EmpsDS.selectPrevious();
			Y.Assert.areSame(2, source.EmpsDS.getPosition());

			// test on an empty dataSource
			Y.Assert.areSame(-1, source.EmptyDS.getPosition());
		},
		
		/**
 		 * SDBD-5.1 select method exists
 		 */
		testSelectExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.EmpsDS.select);
			Y.Assert.areSame("function", typeof source.EmpsDS.select);
		},

		/**
 		 * SDBD-5.2 select method logic
 		 */
		testSelectLogic: function () {
			//select the second one
			source.EmpsDS.select(1) ;
			
			// test the position
			Y.Assert.areSame(1, source.EmpsDS.getPosition());
			
			// test the content
			//Y.Assert.areSame(2, source.EmpsDS.ID);
			Y.Assert.areSame("Isabelle Dubois", source.EmpsDS.name);
			Y.Assert.areSame(80000, source.EmpsDS.salary);

		},
		
		/**
 		 * SDBD-6.1 selectNext method exists
 		 */
		testSelectNextExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.EmpsDS.selectNext);
			Y.Assert.areSame("function", typeof source.EmpsDS.selectNext);
		},
		
		/**
 		 * SDBD-6.2 selectNext method logic
 		 */
		testSelectNextLogic: function () {
			//select the first one
			source.EmpsDS.select(0) ;
			
			// test the position
			Y.Assert.areSame(0, source.EmpsDS.getPosition());
			
			// test the content
			var idNow = source.EmpsDS.ID;
			//Y.Assert.areSame(1, source.EmpsDS.ID);
			Y.Assert.areSame("Jean Durand", source.EmpsDS.name);
			Y.Assert.areSame(70000, source.EmpsDS.salary);

			//select the next one
			source.EmpsDS.selectNext();
			
			// test the position
			Y.Assert.areSame(1, source.EmpsDS.getPosition());
			
			// test the content
			Y.Assert.areSame(idNow + 1, source.EmpsDS.ID);
			Y.Assert.areSame("Isabelle Dubois", source.EmpsDS.name);
			Y.Assert.areSame(80000, source.EmpsDS.salary);
		
		},
		
		/**
 		 * SDBD-7.1 selectPrevious method exists
 		 */
		testSelectPreviousExists: function () {
			Y.Assert.areNotSame("undefined", typeof source.EmpsDS.selectPrevious);
			Y.Assert.areSame("function", typeof source.EmpsDS.selectPrevious);
		},
		
		/**
 		 * SDBD-7.2 selectPrevious method  logic
 		 */
		testSelectPreviousLogic: function () {
			//select the third one
			source.EmpsDS.select(2) ;
			
			// test the position
			Y.Assert.areSame(2, source.EmpsDS.getPosition());
			
			// test the content
			//Y.Assert.areSame(3, source.EmpsDS.ID);
			var idNow = source.EmpsDS.ID;
			Y.Assert.areSame("Henri Martin", source.EmpsDS.name);
			Y.Assert.areSame(75000, source.EmpsDS.salary);

			//select the previous one
			source.EmpsDS.selectPrevious();
			
			// test the position
			Y.Assert.areSame(1, source.EmpsDS.getPosition());
			
			// test the content
			Y.Assert.areSame(idNow - 1, source.EmpsDS.ID);
			Y.Assert.areSame("Isabelle Dubois", source.EmpsDS.name);
			Y.Assert.areSame(80000, source.EmpsDS.salary);
		},
		
		/**
 		 * SDBD-8.1 getEntityCollection method exists
 		 */
		testGetEntityCollectionExists : function(){
			Y.Assert.areNotSame("undefined", typeof source.CitiesDS.getEntityCollection);
			Y.Assert.areSame("function", typeof source.CitiesDS.getEntityCollection);
		},

		/**
 		 * SDBD-8.2 getEntityCollection method logic
 		 */
		testGetEntityCollectionLogic : function(){		
			//method call
			var entityCollection = source.CitiesDS_.getEntityCollection();

			//entityCollection should be available
			Y.Assert.areNotSame("undefined", typeof entityCollection);
			Y.Assert.areSame("object", typeof entityCollection);
			Y.Assert.areSame(true, entityCollection instanceof WAF.EntityCollection, "entityCollection should be an instance of  WAF.EntityCollection");

			//entityCollection should contain 4 elements
			Y.Assert.areSame(4, entityCollection.length, "entityCollection should contain 4 elements");
		}
};