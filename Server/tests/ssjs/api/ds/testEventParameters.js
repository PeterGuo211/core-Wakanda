var testCase = {
    name: "Datastore test(Part2)",
    
        _should: {
        ignore: {
        }
    },
    //***********************************************************
    //*********************** dataclass event ******************
    //***********************************************************
	testEvents_onInit_Dataclass: function() {
		var isGood = false;
    	var n = ds.Flags.length;
    	var n1 = ds.Flags_eventParameters.length;
    	var myEntity = new ds.NewEvents();
    	var m = ds.Flags.length;
    	var m1 = ds.Flags_eventParameters.length;
		var shouldBeOne = 0;
		for(var i = n; i < m; i++)
		{
			var e = ds.Flags.all()[i];
			if(e.event == "init_DataClass_New")
				{
					isGood = true;
					shouldBeOne++;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"init event has not been launched.");
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more times.");
		isGood = false;
		for(var i = n1; i < m1; i++)
		{
			var e = ds.Flags_eventParameters.all()[i];
			if(e.eventKind == "init_DataClass_init" && e.attributeName ==  "init_DataClass_undefined" && e.dataClassName == "init_DataClass_NewEvents")
				{
					isGood = true;
					break;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"init event dont have the right parameters.");
    },
    // percision
    testEvents_onLoad_Dataclass: function() {
		var isGood = false;
    	//we create the entity to load.
		var newEntity = new ds.NewEvents();
		newEntity.cstring = "toLoad";
		newEntity.save();
		var n = ds.Flags.length;
    	var n1 = ds.Flags_eventParameters.length;
    	var myEntity = ds.NewEvents.first();
    	var m = ds.Flags.length;
    	var m1 = ds.Flags_eventParameters.length;
		var shouldBeOne = 0;
		for(var i = n; i < m; i++)
		{
			var e = ds.Flags.all()[i];
			if(e.event == "load_DataClass_New")
				{
					isGood = true;
					shouldBeOne++;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"load event has not been launched.");
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more times.");
		isGood = false;
		for(var i = n1; i < m1; i++)
		{
			var e = ds.Flags_eventParameters.all()[i];
			if(e.eventKind == "load_DataClass_load" && e.attributeName ==  "load_DataClass_undefined" && e.dataClassName == "load_DataClass_NewEvents")
				{
					isGood = true;
					break;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"load event dont have the right parameters.");
    },
    testEvents_onValidate_Dataclass: function() {
		var isGood = false;
    	var n = ds.Flags.length;
    	var n1 = ds.Flags_eventParameters.length;
    	var myEntity = new ds.NewEvents();
    	myEntity.save();
    	var m = ds.Flags.length;
    	var m1 = ds.Flags_eventParameters.length;
		var shouldBeOne = 0;
		for(var i = n; i < m; i++)
		{
			var e = ds.Flags.all()[i];
			if(e.event == "validate_DataClass_New")
				{
					isGood = true;
					shouldBeOne++;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"load event has not been launched.");
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more times.");
		isGood = false;
		for(var i = n1; i < m1; i++)
		{
			var e = ds.Flags_eventParameters.all()[i];
			if(e.eventKind == "validate_DataClass_validate" && e.attributeName ==  "validate_DataClass_undefined" && e.dataClassName == "validate_DataClass_NewEvents")
				{
					isGood = true;
					break;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"load event dont have the right parameters.");
	},
	testEvents_onSave_Dataclass: function() {
		var isGood = false;
    	var n = ds.Flags.length;
    	var n1 = ds.Flags_eventParameters.length;
    	var myEntity = new ds.NewEvents();
    	myEntity.save();
    	var m = ds.Flags.length;
    	var m1 = ds.Flags_eventParameters.length;
		var shouldBeOne = 0;
		for(var i = n; i < m; i++)
		{
			var e = ds.Flags.all()[i];
			if(e.event == "save_DataClass_New")
				{
					isGood = true;
					shouldBeOne++;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"save event has not been launched.");
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more times.");
		isGood = false;
		for(var i = n1; i < m1; i++)
		{
			var e = ds.Flags_eventParameters.all()[i];
			if(e.eventKind == "save_DataClass_save" && e.attributeName ==  "save_DataClass_undefined" && e.dataClassName == "save_DataClass_NewEvents")
				{
					isGood = true;
					break;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"save event dont have the right parameters.");
    },
    testEvents_onRestrictingQuery_allMethod_Dataclass: function() {
		var isGood = false;
    	var n = ds.Flags.length;
    	var n1 = ds.Flags_eventParameters.length;
    	ds.NewEvents.all();
    	var m = ds.Flags.length;
    	var m1 = ds.Flags_eventParameters.length;
		var shouldBeOne = 0;
		for(var i = n; i < m; i++)
		{
			var e = ds.Flags.all()[i];
			if(e.event == "restrict_DataClass_New")
				{
					isGood = true;
					shouldBeOne++;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"restrict event has not been launched.");
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more times.");
		isGood = false;
		for(var i = n1; i < m1; i++)
		{
			var e = ds.Flags_eventParameters.all()[i];
			if(e.eventKind == "restrict_DataClass_restrict" && e.attributeName ==  "restrict_DataClass_undefined" && e.dataClassName == "restrict_DataClass_NewEvents")
				{
					isGood = true;
					break;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"restrict event dont have the right parameters.");
    },
    testEvents_onRemove_Dataclass: function() {
		var isGood = false;
		//we create the entity to remove.
		var newEntity = new ds.NewEvents();
		newEntity.cstring = "toRemove";
		newEntity.save();
    	var n = ds.Flags.length;
    	var n1 = ds.Flags_eventParameters.length;
    	var k = ds.NewEvents.length;
    	ds.NewEvents.remove();
    	var m = ds.Flags.length;
    	var m1 = ds.Flags_eventParameters.length;
		var shouldBeOne = 0;
		for(var i = n; i < m; i++)
		{
			var e = ds.Flags.all()[i];
			if(e.event == "remove_DataClass_New")
				{
					isGood = true;
					shouldBeOne++;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"load event has not been launched.");
		if(shouldBeOne > k)
			Y.Assert.fail("Event has been launched more times."+shouldBeOne);
		isGood = false;
		for(var i = n1; i < m1; i++)
		{
			var e = ds.Flags_eventParameters.all()[i];
			if(e.eventKind == "remove_DataClass_remove" && e.attributeName ==  "remove_DataClass_undefined" && e.dataClassName == "remove_DataClass_NewEvents")
				{
					isGood = true;
					break;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"load event dont have the right parameters.");
    },
    testEvents_validateremove_Dataclass: function() {
		var isGood = false;
		//we create the entity to remove.
		var newEntity = new ds.NewEvents();
		newEntity.cstring = "toRemove";
		newEntity.save();
    	var n = ds.Flags.length;
    	var n1 = ds.Flags_eventParameters.length;
    	var k = ds.NewEvents.length;
    	ds.NewEvents.remove();
    	var m = ds.Flags.length;
    	var m1 = ds.Flags_eventParameters.length;
		var shouldBeOne = 0;
		for(var i = n; i < m; i++)
		{
			var e = ds.Flags.all()[i];
			if(e.event == "validateremove_DataClass_New")
				{
					isGood = true;
					shouldBeOne++;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"validateremove event has not been launched.");
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more times."+shouldBeOne);
		isGood = false;
		for(var i = n1; i < m1; i++)
		{
			var e = ds.Flags_eventParameters.all()[i];
			if(e.eventKind == "validateremove_DataClass_validateremove" && e.attributeName ==  "validateremove_DataClass_undefined" && e.dataClassName == "validateremove_DataClass_NewEvents")
				{
					isGood = true;
					break;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"validateremove event dont have the right parameters.");
    },
    //***********************************************************
    //*********************** attributes event ******************
    //***********************************************************
    testEvents_init_Attribute: function() {
		var isGood = false;
    	var n = ds.Flags.length;
    	var n1 = ds.Flags_eventParameters.length;
    	var myEntity = new ds.NewEvents();
    	var m = ds.Flags.length;
    	var m1 = ds.Flags_eventParameters.length;
		var shouldBeOne = 0;
		for(var i = n; i < m; i++)
		{
			var e = ds.Flags.all()[i];
			if(e.event == "init_Attribute_New")
				{
					isGood = true;
					shouldBeOne++;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"init event has not been launched.");
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more times.");
		isGood = false;
		for(var i = n1; i < m1; i++)
		{
			var e = ds.Flags_eventParameters.all()[i];
			if(e.eventKind == "init_Attribute_init" && e.attributeName ==  "init_Attribute_cstring" && e.dataClassName == "init_Attribute_NewEvents")
				{
					isGood = true;
					break;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"init event dont have the right parameters.");
    },
    // percision
    testEvents_load_Attribute: function() {
		var isGood = false;
    	//we create the entity to load.
		var newEntity = new ds.NewEvents();
		newEntity.cstring = "toLoad";
		newEntity.save();
		var n = ds.Flags.length;
    	var n1 = ds.Flags_eventParameters.length;
    	var myEntity = ds.NewEvents.first();
    	myEntity.cstring;
    	var m = ds.Flags.length;
    	var m1 = ds.Flags_eventParameters.length;
		var shouldBeOne = 0;
		for(var i = n; i < m; i++)
		{
			var e = ds.Flags.all()[i];
			if(e.event == "load_Attribute_New")
				{
					isGood = true;
					shouldBeOne++;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"load event has not been launched.");
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more times.");
		isGood = false;
		for(var i = n1; i < m1; i++)
		{
			var e = ds.Flags_eventParameters.all()[i];
			if(e.eventKind == "load_Attribute_load" && e.attributeName ==  "load_Attribute_cstring" && e.dataClassName == "load_Attribute_NewEvents")
				{
					isGood = true;
					break;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"load event dont have the right parameters.");
    },
    testEvents_set_Attribute: function() {
		var isGood = false;
		var newEntity = new ds.NewEvents();
		var n = ds.Flags.length;
    	var n1 = ds.Flags_eventParameters.length;
		newEntity.cstring = "setted";
    	var m = ds.Flags.length;
    	var m1 = ds.Flags_eventParameters.length;
		var shouldBeOne = 0;
		for(var i = n; i < m; i++)
		{
			var e = ds.Flags.all()[i];
			if(e.event == "set_Attribute_New")
				{
					isGood = true;
					shouldBeOne++;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"load event has not been launched.");
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more times.");
		isGood = false;
		for(var i = n1; i < m1; i++)
		{
			var e = ds.Flags_eventParameters.all()[i];
			if(e.eventKind == "set_Attribute_set" && e.attributeName ==  "set_Attribute_cstring" && e.dataClassName == "set_Attribute_NewEvents")
				{
					isGood = true;
					break;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"load event dont have the right parameters.");
    },
    testEvents_validate_Attribute: function() {
		var isGood = false;
		var newEntity = new ds.NewEvents();
		newEntity.cstring = "tovalidate";
		var n = ds.Flags.length;
    	var n1 = ds.Flags_eventParameters.length;
		newEntity.save();
    	var m = ds.Flags.length;
    	var m1 = ds.Flags_eventParameters.length;
		var shouldBeOne = 0;
		for(var i = n; i < m; i++)
		{
			var e = ds.Flags.all()[i];
			if(e.event == "validate_Attribute_New")
				{
					isGood = true;
					shouldBeOne++;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"validate event has not been launched.");
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more times.");
		isGood = false;
		for(var i = n1; i < m1; i++)
		{
			var e = ds.Flags_eventParameters.all()[i];
			if(e.eventKind == "validate_Attribute_validate" && e.attributeName ==  "validate_Attribute_cstring" && e.dataClassName == "validate_Attribute_NewEvents")
				{
					isGood = true;
					break;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"validate event dont have the right parameters.");
    },
    testEvents_save_Attribute: function() {
		var isGood = false;
		var newEntity = new ds.NewEvents();
		newEntity.cstring = "tosave";
		var n = ds.Flags.length;
    	var n1 = ds.Flags_eventParameters.length;
		newEntity.save();
    	var m = ds.Flags.length;
    	var m1 = ds.Flags_eventParameters.length;
		var shouldBeOne = 0;
		for(var i = n; i < m; i++)
		{
			var e = ds.Flags.all()[i];
			if(e.event == "save_Attribute_New")
				{
					isGood = true;
					shouldBeOne++;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"save event has not been launched.");
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more times.");
		isGood = false;
		for(var i = n1; i < m1; i++)
		{
			var e = ds.Flags_eventParameters.all()[i];
			if(e.eventKind == "save_Attribute_save" && e.attributeName ==  "save_Attribute_cstring" && e.dataClassName == "save_Attribute_NewEvents")
				{
					isGood = true;
					break;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"save event dont have the right parameters.");
    },
    testEvents_remove_Attribute: function() {
		var isGood = false;
		//we create the entity to remove.
		var newEntity = new ds.NewEvents();
		newEntity.cstring = "toRemove";
		newEntity.save();
    	var n = ds.Flags.length;
    	var n1 = ds.Flags_eventParameters.length;
    	var k = ds.NewEvents.length;
    	ds.NewEvents.remove();
    	var m = ds.Flags.length;
    	var m1 = ds.Flags_eventParameters.length;
		var shouldBeOne = 0;
		for(var i = n; i < m; i++)
		{
			var e = ds.Flags.all()[i];
			if(e.event == "remove_Attribute_New")
				{
					isGood = true;
					shouldBeOne++;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"load event has not been launched.");
		if(shouldBeOne > k)
			Y.Assert.fail("Event has been launched more times."+shouldBeOne);
		isGood = false;
		for(var i = n1; i < m1; i++)
		{
			var e = ds.Flags_eventParameters.all()[i];
			if(e.eventKind == "remove_Attribute_remove" && e.attributeName ==  "remove_Attribute_cstring" && e.dataClassName == "remove_Attribute_NewEvents")
				{
					isGood = true;
					break;
				}
		}
		if(!isGood)
			Y.Assert.isTrue(isGood,"load event dont have the right parameters.");
    }
}
