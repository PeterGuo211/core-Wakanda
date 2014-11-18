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
		name : "Entity Attribute",

		/**
		 * E-21. test of getRelatedClass exists
		 */

		testEAGetRelatedClassExist : function() {
			var att = ds.Emp.getAttributeByName("company");
			Y.Assert.areNotSame("undefined", typeof att.getRelatedClass,
			"getRelatedClass is undefined");
			Y.Assert.areSame("function", typeof att.getRelatedClass,
			"getRelatedClass is not a function");
			Y.Assert.areSame("Company", att.getRelatedClass().getName(),
			"getRelatedClass.getName not match company");
		},

		/**
		 * E-22. test of getRelatedClass Logic
		 */
		testEAGetRelatedClassLogic : function() {
			var att = ds.Emp.getAttributeByName("company");
			Y.Assert.areSame("Company", att.getRelatedClass().getName(),
			"getRelatedClass.getName not match company");
		},

		/**
		 * E-23. test of get/setValue Exists and Logic
		 */
		testEASetValueLogic : function() {
			var entity = new WAF.Entity(ds.City);
			Y.Assert.areNotSame("undefined", typeof entity.name.setValue,
			"setValue is undefined");
			Y.Assert.areSame("function", typeof entity.name.setValue,
			"setValue is not a function");
			Y.Assert.areNotSame("undefined", typeof entity.name.getValue,
			"getValue is undefined");
			Y.Assert.areSame("function", typeof entity.name.getValue,
			"getValue is not a function");

			entity.name.setValue("Sidney");
			Y.Assert.areSame("Sidney", entity.name.getValue(),
			"getvalue dont return the apropriat value");
		},

		/**
		 * E-24. test of isTouched exists
		 */
		testEAIsTouchedExists : function() {
			var entity = new WAF.Entity(ds.City);
			Y.Assert.areNotSame("undefined", typeof entity.name.isTouched,
			"isTouched is undefined");
			Y.Assert.areSame("function", typeof entity.name.isTouched,
			"isTouched is not a function");

		},

		/**
		 * E-25. test of touch + isTouched logic
		 */
		testEATouchIsTouchedLogic : function() {
			ds.City.query("id > 2 and id < 4", {  onSuccess:function(event)

				{
				var myset = event.entityCollection;   
				myset.getEntity(0, { onSuccess:function(event)   

					{
					var myEntity = event.entity;
					Y.Assert.areSame("New York",myEntity.name.getValue(),"the value of name of entity retrived not match the correct value New York");
					Y.Assert.areSame("false",myEntity.name.isTouched(),"the isTouched must be false but it is true");
					myEntity.touch() ;
					Y.Assert.areSame("true",myEntity.name.isTouched(),"the isTouched must be true but it is false");
					} });
				}});
		},

		/**
		 * E-26. test of touch exists
		 */

		testEATouchExists : function() {
			var entity = new WAF.Entity(ds.City);
			Y.Assert.areNotSame("undefined", typeof entity.name.touch,
			"touched is undefined");
			Y.Assert.areSame("function", typeof entity.name.touch,
			"touched is not a function");
		}

};