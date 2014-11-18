model.Employee1.events.onInit = function () {
				new ds.Flags({event:"onInit_DataClass_Only"}).save();
			};


model.Employee1.events.onLoad = function () {
				var entityEmployee2 = ds.Employee2.find("ID = 3");
				entityEmployee2.nom = "onLoadOfEmployee1";
				new ds.Flags({event:"onLoad_DataClass_Only"}).save();
			};


model.Employee1.events.onValidate = function () {
	if(this.nom.length == 0)
		return { error: 100, errorMessage:"The name should not be empty." };
	else
		new ds.Flags({event:"onValidate_DataClass_Only"}).save();
	};


model.Employee1.events.onSave = function () {
	if(this.nom.length == 1)
		return { error: 100, errorMessage:"The name should not contain just one letter." };
	else
		new ds.Flags({event:"onSave_DataClass_Only"}).save();
	};


model.Employee1.events.onRemove = function () {
	if(ds.Employee1.length <= 4)
		return { error: 100, errorMessage:"The remove of all data has been refused." };
	else
		new ds.Flags({event:"onRemove_DataClass_Only"}).save();
	};


model.Employee1.events.onRestrictingQuery = function () {
				return ds.Employee1.query("ID > 1");
			};