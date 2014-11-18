var testCase = {
    name: "Datastore test(Part2)",
    
        _should: {
        ignore: {
        	testEvents_RefusingOnRemove_Dataclass: true,
        	testEvents_onRemove_Dataclass_1: true
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
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_DataClass_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onInitWithParameter_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee1({
			nom:	"hello"
		});
    	var j = ds.Flags.length;
    	var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_DataClass_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onInitByMethod_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = ds.Employee1.createEntity();
    	var j = ds.Flags.length;
    	var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_DataClass_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
    testEvents_onLoad_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employees = ds.Employee1.query("ID < 10");
    	var myEntity = employees[0];
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onLoad_DataClass_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onLoad event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onValidate_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee1({nom:"entity #"+(i+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_DataClass_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onValidate event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
    testEvents_RefusingOnValidate_Dataclass: function() {
		var haveCorrectError = false;
		var errorShouldBeOne = 0;
    	var i = ds.Flags.length;
    	var oldLenght = ds.Employee1.length;
    	var myEntity = new ds.Employee1({nom:""});
    	try{
    		myEntity.save();
    	}
    	catch(e)
    	{
    		for(var comptError = 0 ; comptError < e.messages.length ; comptError++)
    		{
    			if(e.messages[comptError] == "The name should not be empty.")
    			{
    				haveCorrectError = true;
    				errorShouldBeOne++;
    			}
    		}
    			
    	}
    	if(!haveCorrectError)
			Y.Assert.fail("onValidate event has not been Refused with the correct error message.");
		if(errorShouldBeOne > 1)
			Y.Assert.fail("The error message has been launched more than one time. ");
    	var j = ds.Flags.length;
    	var isGood = true;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_DataClass_Only" )
					{
						isGood = false;
						break;
					}
			}
		if(!isGood)
			Y.Assert.fail("onValidate event should not be launched. ");
		var newLenght = ds.Employee1.length;
		if(oldLenght != newLenght)
			Y.Assert.fail("The entity should not be saved.");
    },
	testEvents_onSave_Dataclass: function() {
    	var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee1({nom:"entity #"+(i+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_DataClass_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onSave event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
    testEvents_OnSaveRefusingOnValidate_Dataclass: function() {
		var haveCorrectError = false;
		var hasWrongError = false;
		var errorShouldBeOne = 0;
    	var i = ds.Flags.length;
    	var oldLenght = ds.Employee1.length;
    	var myEntity = new ds.Employee1({nom:""});
    	try{
    		myEntity.save();
    	}
    	catch(e)
    	{
    		for(var comptError = 0 ; comptError < e.messages.length ; comptError++)
    		{
    			if(e.messages[comptError] == "The name should not be empty.")
    			{
    				haveCorrectError = true;
    				errorShouldBeOne++;
    			}
    			if(e.messages[comptError] == "The name should not contain just one letter.")
    			{
    				hasWrongError = true;
    			}
    		}
    			
    	}
    	if(!haveCorrectError)
			Y.Assert.fail("onValidate event has not been Refused with the correct error message.");
		if(errorShouldBeOne > 1)
			Y.Assert.fail("The error message has been launched more than one time. ");
		if(hasWrongError)
			Y.Assert.fail("The error message of refusing onSave should not be returned.");
    	var j = ds.Flags.length;
    	var isGood = true;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_DataClass_Only" )
				{
					isGood = false;
					break;
				}
				if(e.event == "onSave_DataClass_Only" )
				{
					isGood = false;
					break;
				}
			}
		if(!isGood)
			Y.Assert.fail("onValidate/onSave event should not be launched. ");
		var newLenght = ds.Employee1.length;
		if(oldLenght != newLenght)
			Y.Assert.fail("The new entity should not be saved.");
    },
    testEvents_RefusingOnSave_Dataclass: function() {
		var haveCorrectError = false;
		var errorShouldBeOne = 0;
    	var i = ds.Flags.length;
    	var oldLenght = ds.Employee1.length;
    	var myEntity = new ds.Employee1({nom:"m"});
    	try{
    		myEntity.save();
    	}
    	catch(e)
    	{
    		for(var comptError = 0 ; comptError < e.messages.length ; comptError++)
    		{
    			if(e.messages[comptError] == "The name should not contain just one letter.")
    			{
    				haveCorrectError = true;
    				errorShouldBeOne++;
    			}
    		}	
    	}
    	if(!haveCorrectError)
			Y.Assert.fail("onSave event has not been Refused with the correct error message.");
		if(errorShouldBeOne > 1)
			Y.Assert.fail("The error message has been launched more than one time. ");
    	var j = ds.Flags.length;
    	var isGood = true;
		for(var u = i+1; u <= j; u++)
		{
			var e = ds.Flags.find("ID = "+u);
			if(e.event == "onSave_DataClass_Only" )
			{
				isGood = false;
				break;
			}
		}
		if(!isGood)
			Y.Assert.fail("onSave event should not be launched. ");
		var newLenght = ds.Employee1.length;
		if(oldLenght != newLenght)
			Y.Assert.fail("The new entity should not be saved.");
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
	testEvents_onRestrictingQueryANDRestrictingQuery_Dataclass_1: function() {
		var i = ds.Flags.length;
		var myEntity = ds.WithRestrictingQuery.find("ID = 4");
		if(myEntity != null)
		{
			Y.Assert.fail("onRestrictingQuery event does not work with RestrictingQuery. _1");
		}
		var j = ds.Flags.length;
		if(i!=(j-2))
		{
			Y.Assert.fail("onRestrictingQuery event does not work with RestrictingQuery. _2: "+i+"_"+j);
		}
		if(ds.Flags.all()[j-2].event != "isNotNull" || ds.Flags.all()[j-1].event != "normalCase" )
		{
			Y.Assert.fail("onRestrictingQuery event does not work with RestrictingQuery. _3");
		}
	},
	testEvents_onRestrictingQueryANDRestrictingQuery_Dataclass_2: function() {
		var i = ds.Flags.length;
		var myEntity = ds.WithRestrictingQuery.find("ID = 5");
		if(myEntity != null)
		{
			Y.Assert.fail("onRestrictingQuery event does not work with RestrictingQuery. _1");
		}
		var j = ds.Flags.length;
		if(i!=(j-2))
		{
			Y.Assert.fail("onRestrictingQuery event does not work with RestrictingQuery. _2: "+i+"_"+j);
		}
		if(ds.Flags.all()[j-2].event != "isNotNull" || ds.Flags.all()[j-1].event != "normalCase" )
		{
			Y.Assert.fail("onRestrictingQuery event does not work with RestrictingQuery. _3");
		}
	},
    testEvents_RefusingOnRemove_Dataclass: function() {
    	var haveCorrectError = false;
		var errorShouldBeOne = 0;
		var isGood = true;
		var shouldBeOne = 0;
		//we should be sure that the event will be refused
		if(ds.Employee1.length <= 4)
		{
			var oldLenght = ds.Employee1.length;
			var i = ds.Flags.length;
			try{
	    		ds.Employee1.remove();
	    	}
	    	catch(e){
	    		for(var comptError = 0 ; comptError < e.messages.length ; comptError++)
	    		{
	    			if(e.messages[comptError] == "The remove of all data has been refused.")
	    			{
	    				haveCorrectError = true;
	    				errorShouldBeOne++;
	    			}
	    		}	
	    	}
	    	if(!haveCorrectError)
				Y.Assert.fail("onRemove event has not been Refused with the correct error message.");
			Y.Assert.areEqual(4,errorShouldBeOne,"The error message has been launched many times.");
	    	var j = ds.Flags.length;
	    	var isGood = true;
			for(var u = i; u <= j-1; u++)
			{
				var e = ds.Flags.all()[u];
				if(e.event == "onRemove_DataClass_Only" )
				{
					isGood = false;
					break;
				}
			}
			if(!isGood)
				Y.Assert.fail("onRemove event should not be launched. ");
			var newLenght = ds.Employee1.length;
			if(oldLenght != newLenght)
				Y.Assert.fail("The data should not be removed.");
		}else
		{
			Y.Assert.fail("incorrect data: the remove cannot be tested well.");
		}
    },
    testEvents_onRemove_Dataclass_1: function() {
    	var isGood = true;
    	var shouldBeOne = 0;
		var i = ds.Flags.length;
		//we should be sure that the event will be lanched
		while(ds.Employee1.length <= 4)
		{
			var newEntity = new ds.Employee1();
			newEntity.nom = "toRemove";
			newEntity.save();
		}
		try{
	    	ds.Employee1.remove();
	    }catch(e){
	    	}
		
    	var j = ds.Flags.length;
		for(var u = i; u <= j-1; u++)
		{
			var e = ds.Flags.all()[u];
			if(e.event == "onRemove_DataClass_Only" )
				{
					isGood = true;
					shouldBeOne++;
				}
		}
		if(!isGood)
			Y.Assert.fail("onRemove event has not been launched. "+s);
			Y.Assert.areEqual(1,shouldBeOne,"Event has been launched more times. ");
		if(ds.Employee1.length != 4)
			Y.Assert.fail("The data are not removed.");
    },
	//Only attribute has events	
	testEvents_onInit_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee2();
    	var j = ds.Flags.length;
    	var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onInitWithParameter_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee2({
			nom:	"hello"
		});
    	var j = ds.Flags.length;
    	var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onInitByMethod_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = ds.Employee2.createEntity();
    	var j = ds.Flags.length;
    	var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onLoad_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employees = ds.Employee2.query("ID < 5");
    	var myName = employees[0].nom;
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onLoad_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onLoad event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
//    testEvents_OnRestrictBeforeOnLoad_Attribute_1: function() {
//		var isGood = false;
//    	var i = ds.Flags.length;
//    	var employees = ds.Employee2.all();
//    	var myName = employees[0].nom;
//    	var j = ds.Flags.length;
//		var s = "";
//		var shouldBeOne = 0;
//		s = "["+i+","+j+"]";
//		for(var u = i+1; u <= j; u++)
//			{
//				var e = ds.Flags.find("ID = "+u);
//				if(e.event == "onLoad_Attribute_Only" )
//					{
//						isGood = true;
//						shouldBeOne++;
//					}
//			}
//		if(!isGood)
//			Y.Assert.fail("onLoad event has not been launched. "+s);
//		if(shouldBeOne > 1)
//			Y.Assert.fail("Event has been launched more than one time. ");
//    },
	testEvents_onSet_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employee = ds.Employee2.find("ID = 2");
		employee.nom = "entity #2 bis";
		employee.save();
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSet_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onLoad event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onSetWithouSaving_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employee = ds.Employee2.find("ID = 2");
		employee.nom = "entity #2 bis bis";
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSet_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onLoad event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onValidate_Attribute_1: function() {
		var isGood = false;
    	var i = ds.Flags.length;
		var n = ds.Employee2.length;
    	var myEntity = new ds.Employee2({nom:"entity #"+(n+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onValidate event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time.");
    },
    testEvents_onValidate_Attribute_2: function() {
		var isGood = false;
    	var i = ds.Flags.length;
		var n = ds.Employee2.length;
    	var myEntity = new ds.Employee2({nom:"entity #"+(n+1)});
    	var shoudlBeTrue = false;
    	shoudlBeTrue = myEntity.validate();
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onValidate event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time.");
		if(!shoudlBeTrue)
			Y.Assert.fail("The validate function should return true.");
    },
    testEvents_RefuseOnValidate_Attribute_1: function() {
    	var haveCorrectError = false;
		var errorShouldBeOne = 0;
		var isGood = true;
    	var i = ds.Flags.length;
		var n = ds.Employee2.length;
    	var myEntity = new ds.Employee2({nom:""});
    	try{
    		myEntity.save();
    	}catch(e){
    		for(var comptError = 0 ; comptError < e.messages.length ; comptError++)
	    		{
	    			if(e.messages[comptError] == "the name should not be empty.")
	    			{
	    				haveCorrectError = true;
	    				errorShouldBeOne++;
	    			}
	    		}
    	}
    	if(!haveCorrectError)
			Y.Assert.fail("onValidate event has not been Refused with the correct error message.");
		Y.Assert.areEqual(1,errorShouldBeOne,"The error message has been launched many times.");
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_Attribute_Only" )
					{
						isGood = false;
					}
			}
		if(!isGood)
			Y.Assert.fail("onValidate event should not been launched.");
    },
    testEvents_RefuseOnValidate_Attribute_2: function() {
		var haveCorrectError = false;
		var errorShouldBeOne = 0;
		var isGood = true;
    	var i = ds.Flags.length;
		var n = ds.Employee2.length;
    	var myEntity = new ds.Employee2({nom:""});
    	try{
    		myEntity.validate();
    	}catch(e){
    		for(var comptError = 0 ; comptError < e.messages.length ; comptError++)
	    		{
	    			if(e.messages[comptError] == "the name should not be empty.")
	    			{
	    				haveCorrectError = true;
	    				errorShouldBeOne++;
	    			}
	    		}
    	}
    	if(!haveCorrectError)
			Y.Assert.fail("onValidate event has not been Refused with the correct error message.");
		Y.Assert.areEqual(1,errorShouldBeOne,"The error message has been launched many times.");
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_Attribute_Only" )
					{
						isGood = false;
					}
			}
		if(!isGood)
			Y.Assert.fail("onValidate event should not been launched.");
    },
	testEvents_onSave_Attrb: function() {
    	var isGood = false;
    	var i = ds.Flags.length;
		var n = ds.Employee2.length;
    	var myEntity = new ds.Employee2({nom:"entity #"+(n+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onSave event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time.");
    },
	testEvents_orderOfExecutionOfOnValidateANDonSave_Attrb: function() {
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
    testEvents_OnSaveRefOnValidate_Attrb: function() {
		var haveCorrectError = false;
		var errorShouldBeOne = 0;
		var isGood = true;
    	var i = ds.Flags.length;
		var n = ds.Employee2.length;
    	var myEntity = new ds.Employee2({nom:""});
    	try{
    		myEntity.validate();
    	}catch(e){
    		for(var comptError = 0 ; comptError < e.messages.length ; comptError++)
	    		{
	    			if(e.messages[comptError] == "the name should not be empty.")
	    			{
	    				haveCorrectError = true;
	    				errorShouldBeOne++;
	    			}
	    		}
    	}
    	if(!haveCorrectError)
			Y.Assert.fail("onValidate event has not been Refused with the correct error message.");
		Y.Assert.areEqual(1,errorShouldBeOne,"The error message has been launched many times.");
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_Attribute_Only" )
					{
						isGood = false;
					}
			}
		if(!isGood)
			Y.Assert.fail("onSave event should not been launched.");
    },
    testEvents_onSave_NoOnValidateAttrb: function() {
    	var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee21({nom:"onSaveNoValidation"});
    	myEntity.save();
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onSave event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time.");
    },
    testEvents_RefuseOnSave_Attribute: function() {
		var haveCorrectError = false;
		var errorShouldBeOne = 0;
		var isGood = true;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee2({nom:"L"});
    	try{
    		myEntity.save();
    	}catch(e){
    		for(var comptError = 0 ; comptError < e.messages.length ; comptError++)
	    		{
	    			if(e.messages[comptError] == "The name should not contain just one letter.")
	    			{
	    				haveCorrectError = true;
	    				errorShouldBeOne++;
	    			}
	    		}
    	}
    	if(!haveCorrectError)
			Y.Assert.fail("onSave event has not been Refused with the correct error message.");
		Y.Assert.areEqual(1,errorShouldBeOne,"The error message has been launched many times.");
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i; u <= j-1; u++)
			{
				var e = ds.Flags.all()[u];
				if(e.event == "onSave_Attribute_Only" )
					{
						isGood = false;
					}
			}
		if(!isGood)
			Y.Assert.fail("onValidate event should not been launched.");
    },
	testEvents_onRemove_Attrb_2: function() {
		var isGood = true;
		var i = ds.Flags.length;
		var shouldBeOne = 0;
		new ds.Employee2({nom:"entity6"}).save();
    	var myEntity = ds.Employee2.find("nom = entity6");
    	myEntity.remove();
    	var j = ds.Flags.length;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onRemove_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onRemove event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time.");
    },
    testEvents_RefonRemove_Attrb: function() {
		var haveCorrectError = false;
		var errorShouldBeOne = 0;
		var isGood = true;
    	var i = ds.Flags.length;
		var n = ds.Employee2.length;
    	var myEntity = new ds.Employee2({nom:"OnlyOneToRefuse"});
    	myEntity.save();
    	if(myEntity == null)
    		Y.Assert.fail("Refusing onRemove cannot be tested well.");
    	try{
    		myEntity.remove();
    	}catch(e){
    		for(var comptError = 0 ; comptError < e.messages.length ; comptError++)
	    		{
	    			if(e.messages[comptError] == "I Refuse to remove this entity.")
	    			{
	    				haveCorrectError = true;
	    				errorShouldBeOne++;
	    			}
	    		}
    	}
    	if(!haveCorrectError)
			Y.Assert.fail("onRemov event has not been Refused with the correct error message.");
		Y.Assert.areEqual(1,errorShouldBeOne,"The error message has been launched many times.");
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onRemove_Attribute_Only" )
					{
						isGood = false;
					}
			}
		if(!isGood)
			Y.Assert.fail("onRemove event should not been launched.");
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
    	var employees = ds.Employee1.find("ID = 2");
    	var myEntity = employees[0];
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSet_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("external onSet event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time.");
    },
	testEvents_OderOFonSetANDonLoad: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employee= ds.Employee3.find("ID = 2");
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
    },
	testEvents_RefusingOnValidate: function() {
		var isGood = true;
		var shouldBeOne = 0;
    	var i = ds.RefuseEvent.length;
    	var employee = new ds.RefuseEvent({nom:"Refusing_onValidate",cbool:true});
		try
		{
			employee.save();
		}
		catch(err)
		{
		}
    	var j = ds.RefuseEvent.length;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_RefuseOnValidate" )
					{
						isGood = false;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("Refusing validation does not work. "+i+" "+j);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time.");
	},
	testEvents_RefusingOnValidate_OnSave: function() {
		var isGood = true;
    	var i = ds.RefuseEvent.length;
    	var employee = new ds.RefuseEvent({nom:"Refusing_onValidate",cbool:true});
		try
		{
			employee.save();
		}
		catch(err)
		{
		}
    	var j = ds.RefuseEvent.length;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_RefuseOnValidate" )
					{
						isGood = false;
						break;
					}
			}
		if(isGood)
			for(var u = i+1; u <= j; u++)
				{
					var e = ds.Flags.find("ID = "+u);
					if(e.event == "onSave_RefuseOnSave" )
						{
							isGood = false;
							break;
						}
				}
		else
			Y.Assert.fail("OnSave event has been lunched while OnValidate has been refused. "+i+" "+j);
	},
	testEvents_RefusingOnSave_WithoutOnValidate: function() {
		var isGood = true;
		var shouldBeOne = 0;
		var n = ds.OnSaveNoValidation.length;
    	var i = ds.Flags.length;
    	var employee = new ds.OnSaveNoValidation({nom:"Refusing_onSave",cbool:true});
		try
		{
			employee.save();
		}
		catch(err)
		{
		}
    	var j = ds.Flags.length;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_withoutOnValidation" )
					{
						isGood = false;
						shouldBeOne++;
					}
			}
		if(!isGood || ds.OnSaveNoValidation.length > n)
			Y.Assert.fail("Refusing save does not work whene we don't have validation. "+i+" "+j);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time.");
	},
	testEvents_RefusingOnSave_WithOnValidate: function() {
		var isGood = true;
    	var i = ds.Flags.length;
		ds.RefuseEvent.remove();
    	var employee = new ds.RefuseEvent({nom:"Refusing_onSave",cbool:true});
		try
		{
			employee.save();
		}
		catch(err)
		{
		}
    	var j = ds.Flags.length;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_RefuseOnSave" )
					{
						isGood = false;
						break;
					}
			}
		if(!isGood || ds.RefuseEvent.length > 0)
			Y.Assert.fail("Refusing save does not work whene the validation passed. "+i+" "+j);
	},
	testEvents_RefusingOnRemove: function() {
		var isGood = true;
		try
		{
			ds.OnSaveNoValidation.remove();
		}
		catch(err)
		{
		}
		if(ds.OnSaveNoValidation.length == 0)
			Y.Assert.fail("Refusing save does not work whene we don't have validation. "+i+" "+j);
	},
	testEvents_onRestrictingQuery_RestrictingQ_all: function() {
		var isGood = false;
		ds.Flags.remove();
    	var myCollection = ds.WithRestrictingQuery.all();
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		for(var u = 0; u < j; u++)
			{
				var e = ds.Flags.all()[u];
				if(e.event == "normalCase" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onRestricting event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
		var nonExistentEntity_1 = myCollection.find("ID = 1");
		if(nonExistentEntity_1 != null)
			Y.Assert.fail("onRestrictingQuery event does not work with all() method.");
		var nonExistentEntity_2 = myCollection.find("ID = 4");
		if(nonExistentEntity_2 != null)
			Y.Assert.fail("onRestrictingQuery event does not work with all() method.");
    },
    testEvents_onRestrictingQuery_RestrictingQ_find: function() {
		var isGood = false;
		ds.Flags.remove();
    	var nonExistentEntity = ds.WithRestrictingQuery.find("ID = 1");
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		for(var u = 0; u < j; u++)
			{
				var e = ds.Flags.all()[u];
				if(e.event == "normalCase" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onRestricting event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
		if(nonExistentEntity != null)
			Y.Assert.fail("onRestrictingQuery event does not work with find() method.");
		var nonExistentEntity_2 = ds.WithRestrictingQuery.find("ID = 4");
		if(nonExistentEntity_2 != null)
			Y.Assert.fail("onRestrictingQuery event does not work with find() method.");
    },
	testEvents_onRestrictingQuery_RestrictingQ_query: function() {
		var isGood = false;
		ds.Flags.remove();
    	var nonExistentEntity = ds.WithRestrictingQuery.query("ID = 1");
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		for(var u = 0; u < j; u++)
			{
				var e = ds.Flags.all()[u];
				if(e.event == "normalCase" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onRestricting event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
		if(nonExistentEntity.find("ID = 1") != null)
			Y.Assert.fail("onRestrictingQuery event does not work with query() method _11.");
		var nonExistentEntity_2 = ds.WithRestrictingQuery.query("ID >= 4");
		if(nonExistentEntity_2.find("ID = 4") != null)
			Y.Assert.fail("onRestrictingQuery event does not work with query() method _2.");
    }
};