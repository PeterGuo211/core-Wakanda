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

var testCase = {
    name: "Entity test",

    _should: {
        ignore: {
        }
    },

	setUp : function () {
		if (os.isWindows) {
		}
		if (os.isLinux) {
		}
    },
	//*******************************************************************
    //***************************getDataClass****************************
    //*******************************************************************
    testGetDataClass_existance: function() {
    	var myEntity = ds.MyClass1.find("ID = 1");
    	Y.Assert.isString(myEntity.getDataClass().getName(),"getDataClass existance does not work.");
    },
    testGetDataClass_find: function() {
    	var myEntity = ds.MyClass1.find("ID = 1");
        Y.Assert.areSame("MyClass1",myEntity.getDataClass().getName(),"getDataClass does not work.");
    },
    testGetDataClass_find2: function() {
    	var myEntity = ds.MyClass1(1);
        Y.Assert.areSame("MyClass1",myEntity.getDataClass().getName(),"getDataClass does not work.");
    },
    testGetDataClass_createEntity: function() {
    	var myEntity = ds.MyClass1.createEntity();
        Y.Assert.areSame("MyClass1",myEntity.getDataClass().getName(),"getDataClass does not work.");
    },
    testGetDataClass_new: function() {
    	var myEntity = new ds.MyClass1();
        Y.Assert.areSame("MyClass1",myEntity.getDataClass().getName(),"getDataClass does not work.");
    },
    testGetDataClass_related: function() {
    	var myEntity = ds.OneToN(1);
        Y.Assert.areSame("OneToN2",myEntity.oneToN.getDataClass().getName(),"getDataClass does not work with related attribute.");
    },
    testGetDataClass_Extended: function() {
    	var myEntity = ds.ExtendedFromHaveAlias(1);
        Y.Assert.areSame("ExtendedFromHaveAlias",myEntity.getDataClass().getName(),"getDataClass does not work with extended dataclass.");
    },
    //*******************************************************************
    //******************************getKey*******************************
    //*******************************************************************
    testGetKey_longInt: function() {
    	var myEntity = ds.IdLong.all()[0];
        Y.Assert.areSame(1,myEntity.getKey(),"getKey does not work with primaryKey of type long.");
    },
    testGetKey_long64: function() {
    	var myEntity = ds.Idlong64.all()[0];
        Y.Assert.areSame(1,myEntity.getKey(),"getDataClass does not work with primaryKey of type long64.");
    },
    testGetKey_number: function() {
    	var myEntity = ds.IdNumber.all()[0];
        Y.Assert.areSame(1,myEntity.getKey(),"getDataClass does not work with primaryKey of type number.");
    },
    testGetKey_string: function() {
    	var myEntity = ds.IdString.all()[0];
        Y.Assert.areSame("1",myEntity.getKey(),"getDataClass does not work with primaryKey of type string.");
    },
    testGetKey_UUID: function() {
    	var myEntity = ds.IdUUID.all()[0];
        Y.Assert.areSame("2E7B4F2E0357264EA15ED89C80A2C3DD",myEntity.getKey(),"getDataClass does not work with primaryKey of type UUID");
    },
    testGetKey_related: function() {
    	var myEntity = ds.OneToN.all()[0];
        Y.Assert.areSame(1,myEntity.oneToN.getKey(),"getDataClass does not work with related attribute.");
    },
    //*******************************************************************
    //************************getModifiedAttributes**********************
    //*******************************************************************
    testGetModifiedAttributes_existance: function() {
    	var myEnt = ds.GetModifiedAtt.all()[0];
    	var returnedArray = myEnt.getModifiedAttributes();
    	Y.Assert.isArray(returnedArray,"getModifiedAttributes existance does not work (isObject).");
    },
    testGetModifiedAttributes_number: function() {
    	var myEnt = ds.GetModifiedAtt.all()[0];
		myEnt.cnumber = 13;
		var returnedArray = myEnt.getModifiedAttributes();
		Y.Assert.areEqual(1,returnedArray.length,"getModifiedAttributes does not work (length).");
		Y.Assert.areEqual("cnumber",returnedArray[0],"getModifiedAttributes does not work.");
    },
    testGetModifiedAttributes_long: function() {
    	var myEnt = ds.GetModifiedAtt.all()[0];
    	myEnt.save();
		myEnt.clong = 13;
		var returnedArray = myEnt.getModifiedAttributes();
		Y.Assert.areEqual(1,returnedArray.length,"getModifiedAttributes does not work (length).");
		Y.Assert.areEqual("clong",returnedArray[0],"getModifiedAttributes does not work.");
    },
    testGetModifiedAttributes_long64: function() {
    	var myEnt = ds.GetModifiedAtt.all()[0];
    	myEnt.save();
		myEnt.clong64 = 13;
		var returnedArray = myEnt.getModifiedAttributes();
		Y.Assert.areEqual(1,returnedArray.length,"getModifiedAttributes does not work (length).");
		Y.Assert.areEqual("clong64",returnedArray[0],"getModifiedAttributes does not work.");
    },
    testGetModifiedAttributes_string: function() {
    	var myEnt = ds.GetModifiedAtt.all()[0];
    	myEnt.save();
		myEnt.cstring = "xy";
		var returnedArray = myEnt.getModifiedAttributes();
		Y.Assert.areEqual(1,returnedArray.length,"getModifiedAttributes does not work (length).");
		Y.Assert.areEqual("cstring",returnedArray[0],"getModifiedAttributes does not work.");
    },
    testGetModifiedAttributes_bool: function() {
    	var myEnt = ds.GetModifiedAtt.all()[0];
    	myEnt.save();
		myEnt.cbool = true;
		var returnedArray = myEnt.getModifiedAttributes();
		Y.Assert.areEqual(1,returnedArray.length,"getModifiedAttributes does not work (length).");
		Y.Assert.areEqual("cbool",returnedArray[0],"getModifiedAttributes does not work.");
    },
    testGetModifiedAttributes_date: function() {
    	var myEnt = ds.GetModifiedAtt.all()[0];
    	myEnt.save();
		myEnt.cdate = new Date();
		var returnedArray = myEnt.getModifiedAttributes();
		Y.Assert.areEqual(1,returnedArray.length,"getModifiedAttributes does not work (length).");
		Y.Assert.areEqual("cdate",returnedArray[0],"getModifiedAttributes does not work.");
    },
    testGetModifiedAttributes_duration: function() {
    	var myEnt = ds.GetModifiedAtt.all()[0];
    	myEnt.save();
		myEnt.cduration = new Date();
		var returnedArray = myEnt.getModifiedAttributes();
		Y.Assert.areEqual(1,returnedArray.length,"getModifiedAttributes does not work (length).");
		Y.Assert.areEqual("cduration",returnedArray[0],"getModifiedAttributes does not work.");
    },
    testGetModifiedAttributes_blob: function() {
    	var myEnt = ds.GetModifiedAtt.all()[0];
    	myEnt.save();
		myEnt.cblob = new Blob( 20 , 88, "application/octet-stream");
		var returnedArray = myEnt.getModifiedAttributes();
		Y.Assert.areEqual(1,returnedArray.length,"getModifiedAttributes does not work (length).");
		Y.Assert.areEqual("cblob",returnedArray[0],"getModifiedAttributes does not work.");
    },
    testGetModifiedAttributes_image: function() {
    	var myEnt = ds.GetModifiedAtt.all()[0];
    	myEnt.save();
		myEnt.cimage = loadImage(getFolder().path + "img/wak0.png");
		var returnedArray = myEnt.getModifiedAttributes();
		Y.Assert.areEqual(1,returnedArray.length,"getModifiedAttributes does not work (length).");
		Y.Assert.areEqual("cimage",returnedArray[0],"getModifiedAttributes does not work.");
    },
    testGetModifiedAttributes_related:function() {
    	var rel = new ds.RelatedModifiedAtt();
    	rel.save();
    	var myEnt = new ds.GetModifiedAtt();
    	myEnt.clink = rel;
    	var returnedArray = myEnt.getModifiedAttributes();
    	Y.Assert.areEqual(1,returnedArray.length,"getModifiedAttributes does not work (length).");
    	Y.Assert.areEqual("clink",returnedArray[0],"getModifiedAttributes does not work.");
    },
    //*******************************************************************
    //************************getStamp***********************************
    //*******************************************************************
    testGetStamp_newEntity:function() {
    	var newEntity = new ds.MyClass1();
    	Y.Assert.areEqual(0,newEntity.getStamp(),"getStamp does not work.");
    },
    testGetStamp_newEntity_afterModif:function() {
    	var newEntity = new ds.MyClass1();
    	newEntity.cdate = new Date();
    	Y.Assert.areEqual(0,newEntity.getStamp(),"getStamp does not work.");
    },
    testGetStamp_afterSave_withoutModif:function() {
    	var newEntity = new ds.MyClass1();
    	newEntity.save();
    	Y.Assert.areEqual(1,newEntity.getStamp(),"getStamp does not work.");
    },
    testGetStamp_afterSave_withModif:function() {
    	var newEntity = new ds.MyClass1();
    	newEntity.cdate = new Date();
    	newEntity.save();
    	Y.Assert.areEqual(1,newEntity.getStamp(),"getStamp does not work.");
    },
    testGetStamp_afterSave_withManyModif:function() {
    	var newEntity = new ds.MyClass1();
    	newEntity.cnum = 14;
    	newEntity.clong = 6589;
    	newEntity.cdate = new Date();
    	newEntity.save();
    	Y.Assert.areEqual(1,newEntity.getStamp(),"getStamp does not work.");
    },
    testGetStamp_manySave_withManyModif:function() {
    	var newEntity = new ds.MyClass1();
    	newEntity.cnum = 14;
    	newEntity.clong = 6589;
    	newEntity.cdate = new Date();
    	newEntity.save();
    	newEntity.cnum = 99;
    	newEntity.cbool = false;
    	newEntity.save();
    	Y.Assert.areEqual(2,newEntity.getStamp(),"getStamp does not work.");
    },
    testGetStamp_relateEntity:function() {
	    var rel = new ds.RelatedModifiedAtt();
		rel.save();
		var myEnt = new ds.GetModifiedAtt();
		myEnt.clink = rel;
		myEnt.save();
		ds.GetModifiedAtt.all();
		myEnt.cnumber = 7;
		myEnt.save();
		Y.Assert.areEqual(1,rel.getStamp(),"getStamp does not work.");
    },
    //*******************************************************************
    //************************getTimeStamp*******************************
    //*******************************************************************
    testGetTimeStamp_existance:function() {
    	var newEnt = new ds.MyClass1();
    	newEnt.save();
		Y.Assert.isObject(newEnt.getTimeStamp(),"getTimeStamp does not work.");
    },
    testGetTimeStamp_newEntity:function() {
    	var oldDate = new Date();
    	var newEnt = new ds.MyClass1();
    	newEnt.save();
    	var timeStamp = newEnt.getTimeStamp();
    	if(timeStamp.getTime() < oldDate.getTime())
			Y.Assert.fail("getTimeStamp does not work.");
    },
    testGetTimeStamp_oldEntity:function() {
    	var oldDate = new Date("2013/04/28");
    	var oldEnt = ds.MyClass1(1);
		var timeStamp = oldEnt.getTimeStamp();
    	if(timeStamp.getTime() < oldDate.getTime())
			Y.Assert.fail("getTimeStamp does not work.");
    }
};
