var testCase = {
    name: "Bridge Wakanda-4D TU_Triggers",
    
    _should: {
		error: {
			
		},
		ignore: {
			
		}
    },
    
    setUp : function () {
    	/*
        if (os.isWindows) {
    	}
    	if (os.isLinux) {
    	}
    	*/
    },
	testOnSavingNewRecord:function(){
		var oldLength = ds.Flags1.length;
		var newEntity =  new ds.OnSaveNoValidation();
		newEntity.nom = "test on save a new record";
		newEntity.save();
		
		var onSaveLength = ds.OnSaveNoValidation.length;
		var newLength = ds.Flags1.length;
		if(ds.OnSaveNoValidation.all()[onSaveLength-1].ID != newEntity.ID) 
			Y.Assert.fail("'On saving a new record' test fail");
		if(oldLength != newLength-1) 
			Y.Assert.fail("'On saving a new record' test fail");
		if(ds.Flags1.all()[newLength-1].event != "On saving a new record") 
			Y.Assert.fail("'On saving a new record' test fail");
	},
	testOnSavingAnExistingRecord:function(){
		var oldLength = ds.Flags1.length;
		var onSaveLength = ds.OnSaveNoValidation.length;
		var existingEntity =  ds.OnSaveNoValidation.all()[onSaveLength-1];
		existingEntity.nom = "test on save an existing record";
		existingEntity.save();

		var newLength = ds.Flags1.length;
		if(existingEntity.nom != "test on save an existing record")
			Y.Assert.fail("'On saving an existing record' test fail");
		if(oldLength != newLength-1)
			Y.Assert.fail("'On saving an existing record' test fail");
		if(ds.Flags1.all()[newLength-1].event != "On saving an existing record")
			Y.Assert.fail("'On saving an existing record' test fail");
	},
	testOnSavingAnExistingRecord_WithoutModif:function(){
		var oldLength = ds.Flags1.length;
		var onSaveLength = ds.OnSaveNoValidation.length;
		var existingEntity =  ds.OnSaveNoValidation.all()[onSaveLength-1];
		existingEntity.save();

		var newLength = ds.Flags1.length;
		if(oldLength != newLength)
			Y.Assert.fail("'On saving an existing record' test fail");
	},
	testOnSavingAnExistingRecord_TrickedModif:function(){
		var oldLength = ds.Flags1.length;
		var onSaveLength = ds.OnSaveNoValidation.length;
		var existingEntity =  ds.OnSaveNoValidation.all()[onSaveLength-1];
		var sameValue = existingEntity.nom;
		existingEntity.nom = sameValue;
		existingEntity.save();

		var newLength = ds.Flags1.length;
		if(oldLength != newLength)
			Y.Assert.fail("'On saving an existing record' test fail");
	},
	testOnDeleteRecord:function(){
		var oldLength = ds.Flags1.length;
		var onSaveLength = ds.OnSaveNoValidation.length;
		var existingEntity =  ds.OnSaveNoValidation.all()[onSaveLength-1];
		existingEntity.remove();

		var newLength = ds.Flags1.length;
		if(ds.OnSaveNoValidation.length != onSaveLength-1)
			Y.Assert.fail("'On delete a record' test fail");
		if(oldLength != newLength-1)
			Y.Assert.fail("'On delete a record' test fail");
		if(ds.Flags1.all()[newLength-1].event != "On deleting a record")
			Y.Assert.fail("'On delete a record' test fail");
	}
}