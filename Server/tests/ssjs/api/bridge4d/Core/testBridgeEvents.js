include("../../../ds/testEvents.js");

testCase.name = "Datastore test with 4D bridge (testsOfEvents)";

//****** initiation function/attributs *******
	
//****** ignered tests *******
testCase._should.ignore.testEvents_onRemove_Dataclass = true;
testCase._should.ignore.testQuery_ArrayOfStings = true;
testCase._should.ignore.testEvents_RefusingOnValidate_OnSave = true;
testCase._should.ignore.testEvents_RefusingOnSave_WithoutOnValidate = true;
testCase._should.ignore.testEvents_RefusingOnSave_WithOnValidate = true;
testCase._should.ignore.testEvents_RefusingOnRemove = true;
testCase._should.ignore.testExtends_AddRelationAttribute = true;
testCase._should.ignore.testEvents_RefusingOnValidate = true;
testCase._should.ignore.testEvents_onRestrictingQueryANDRestrictingQuery_Dataclass_1 = true;
testCase._should.ignore.testEvents_onRestrictingQueryANDRestrictingQuery_Dataclass_2 = true;
testCase._should.ignore.testEvents_onRestrictingQuery_RestrictingQ_all = true;
testCase._should.ignore.testEvents_onRestrictingQuery_RestrictingQ_find = true;
testCase._should.ignore.testEvents_onRestrictingQuery_RestrictingQ_query = true;
/* var testCase = {
    name: "Datastore test(Part2)",
    
        _should: {
        ignore: {
			testExtends_AddRelationAttribute:true
        }
    },
		//------------------------------------
	//Events
	testEvents_onInit_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee1();
    	var j = ds.Flags.length;
    	var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_DataClass_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
    },
	testEvents_onInitWithParameter_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee1({
			nom:	"hello"
		});
    	var j = ds.Flags.length;
    	var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_DataClass_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
    },
	testEvents_onInitByMethod_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = ds.Employee1.createEntity();
    	var j = ds.Flags.length;
    	var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_DataClass_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
    },
    testEvents_onLoad_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employees = ds.Employee1.query("ID < 10");
    	var myEntity = employees[0];
    	var j = ds.Flags.length;
		var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onLoad_DataClass_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onLoad event has not been launched. "+s);
    },
	testEvents_onValidate_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee1({nom:"entity #"+(i+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_DataClass_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onValidate event has not been launched. "+s);
    },
	testEvents_onSave_Dataclass: function() {
    	var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee1({nom:"entity #"+(i+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_DataClass_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onSave event has not been launched. "+s);
    },
	testEvents_orderOfExecutionOfOnValidateANDonSave_Dataclass: function() {
    	var isGood = true;
		var i = ds.Flags.length;
    	var myEntity = new ds.Employee1({nom:"entity #"+(i+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var sav;
		var val;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_DataClass_Only" )
					sav = e.ID;
				else if(e.event == "onValidate_DataClass_Only" )
					val = e.ID;
			}
		if(val > sav)
			Y.Assert.fail("onSave event has been launched before onValidate");
    },
    testEvents_onRestrictingQuery_allMethod_Dataclass: function() {
		var myCollection = ds.Employee1.all();
		var nonExistentEntity = myCollection.find("ID = 1"); //onRestrinctingQuery of this class is: return ds.Employee1.query("ID > 1")
		if(nonExistentEntity != null)
			Y.Assert.fail("onRestrictingQuery event does not work with all() method.");
    },
    testEvents_onRestrictingQuery_findMethod_Dataclass: function() {
		var nonExistentEntity = ds.Employee1.find("ID = 1"); //onRestrinctingQuery of this class is: return ds.Employee1.query("ID > 1")
		if(nonExistentEntity != null)
			Y.Assert.fail("onRestrictingQuery event does not work with find() method.");
    },
	testEvents_onRestrictingQuery_queryMethod_Dataclass: function() {
		var nonExistentEntity = ds.Employee1.query("ID = 1"); //onRestrinctingQuery of this class is: return ds.Employee1.query("ID > 1")
		if(nonExistentEntity.length != 0)
			Y.Assert.fail("onRestrictingQuery event does not work with query() method.");
    },
	//Only attribute has events	
	testEvents_onInit_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee2();
    	var j = ds.Flags.length;
    	var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
    },
	testEvents_onInitWithParameter_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee2({
			nom:	"hello"
		});
    	var j = ds.Flags.length;
    	var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
    },
	testEvents_onInitByMethod_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = ds.Employee2.createEntity();
    	var j = ds.Flags.length;
    	var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
    },
	testEvents_onLoad_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employees = ds.Employee2.query("ID < 5");
    	var myName = employees[0].nom;
    	var j = ds.Flags.length;
		var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onLoad_Attribute_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onLoad event has not been launched. "+s);
    },
	testEvents_onSet_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employee = ds.Employee2.find("ID = 2");
		employee.nom = "entity #2 bis";
		employee.save();
    	var j = ds.Flags.length;
		var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSet_Attribute_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onLoad event has not been launched. "+s);
    },
	testEvents_onSetWithouSaving_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employee = ds.Employee2.find("ID = 2");
		employee.nom = "entity #2 bis bis";
    	var j = ds.Flags.length;
		var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSet_Attribute_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onLoad event has not been launched. "+s);
    },
	testEvents_onValidate_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
		var n = ds.Employee2.length;
    	var myEntity = new ds.Employee2({nom:"entity #"+(n+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_Attribute_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onValidate event has not been launched. "+s);
    },
	testEvents_onSave_Dataclass: function() {
    	var isGood = false;
    	var i = ds.Flags.length;
		var n = ds.Employee2.length;
    	var myEntity = new ds.Employee2({nom:"entity #"+(n+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_Attribute_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onSave event has not been launched. "+s);
    },
	testEvents_orderOfExecutionOfOnValidateANDonSave_Dataclass: function() {
    	var isGood = true;
		var i = ds.Flags.length;
		var n = ds.Employee2.length;
    	var myEntity = new ds.Employee2({nom:"entity #"+(n+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var sav;
		var val;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_Attribute_Only" )
					sav = e.ID;
				if(e.event == "onValidate_Attribute_Only" )
					val = e.ID;
			}
		if(val > sav)
			Y.Assert.fail("onSave event has been launched before onValidate");
    }, 
    testEvents_onInit_DataclassWithAttribute: function() {
		var isGood = true;
		var i = ds.Flags.length;
    	var myEntity = new ds.Employee3();
    	var j = ds.Flags.length;
		var att;
		var dc;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_DataClass" )
					att = e.ID;
				else if(e.event == "onInit_DataClass_Attribute" )
					dc = e.ID;
			}
		if(att < dc)
			Y.Assert.fail("Dataclass's onInit event has been launched before attribute's onInit event");
    },
	testEvents_onInitWithParameter_DataclassWithAttribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee3({
			nom:	"hello"
		});
    	var j = ds.Flags.length;
		var att;
		var dc;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_DataClass" )
					att = e.ID;
				else if(e.event == "onInit_DataClass_Attribute" )
					dc = e.ID;
			}
		if(att < dc)
			Y.Assert.fail("Dataclass's onInit event has been launched before attribute's onInit event");
    },
	testEvents_onInitByMethod_DataclassWithAttribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = ds.Employee3.createEntity();
    	var j = ds.Flags.length;
		var att;
		var dc;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_DataClass" )
					att = e.ID;
				else if(e.event == "onInit_DataClass_Attribute" )
					dc = e.ID;
			}
		if(att < dc)
			Y.Assert.fail("Dataclass's onInit event has been launched before attribute's onInit event");
    },
	testEvents_onLoad_DataclassWithAttribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employees = ds.Employee3.query("ID < 5");
    	var myString = employees[0].nom;
    	var j = ds.Flags.length;
		var att;
		var dc;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onLoad_Attribute_DataClass" )
					att = e.ID;
				else if(e.event == "onLoad_DataClass_Attribute" )
					dc = e.ID;
			}
		if(att < dc)
			Y.Assert.fail("Dataclass's onLoad event has been launched before attribute's onLoad event");
    },
	testEvents_onSet_SetFromAnOtherEvent: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employees = ds.Employee1.query("ID < 10");
    	var myEntity = employees[0];
    	var j = ds.Flags.length;
		var s = "";
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSet_Attribute_Only" )
					{
						isGood = true;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("external onSet event has not been launched. "+s);
    },
	testEvents_OderOFonSetANDonLoad: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employee= ds.Employee1.find("ID = 2");
    	var j = ds.Flags.length;
		var onset;
		var onload;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSet_Attribute_Only" )
					onset = e.ID;
				else if(e.event == "onLoad_Attribute_Only" )
					onload = e.ID;
			}
		if(onset < onload)
			Y.Assert.fail("Dataclass's onLoad event has been launched before attribute's onLoad event");
    }
}; */