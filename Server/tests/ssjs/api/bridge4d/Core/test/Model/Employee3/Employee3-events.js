model.Employee3.events.onInit = function () {
				new ds.Flags({event:"onInit_DataClass_Attribute"}).save();
			};


model.Employee3.events.onLoad = function () {
				new ds.Flags({event:"onLoad_DataClass_Attribute"}).save();
			};


model.Employee3.events.onValidate = function () {
				new ds.Flags({event:"onValidate_DataClass_Attribute"}).save();
			};


model.Employee3.events.onSave = function () {
				new ds.Flags({event:"onSave_DataClass_Attribute"}).save();
			};


model.Employee3.events.onRemove = function () {
				new ds.Flags({event:"onRemove_DataClass_Attribute"}).save();
			};


model.Employee3.events.onRestrictingQuery = function () {
				return ds.Employee3.query("ID > 1");
			};


model.Employee3.nom.events.onInit = function (attributeName) {
					new ds.Flags({event:"onInit_Attribute_DataClass"}).save();
				};


model.Employee3.nom.events.onLoad = function (attributeName) {
					new ds.Flags({event:"onLoad_Attribute_DataClass"}).save();
				};


model.Employee3.nom.events.onSet = function (attributeName) {
					new ds.Flags({event:"onSet_Attribute_DataClass"}).save();
				};


model.Employee3.nom.events.onValidate = function (attributeName) {
					new ds.Flags({event:"onValidate_Attribute_DataClass"}).save();
				};


model.Employee3.nom.events.onSave = function (attributeName) {
					new ds.Flags({event:"onSave_Attribute_DataClass"}).save();
				};


model.Employee3.nom.events.onRemove = function (attributeName) {
					new ds.Flags({event:"onRemove_Attribute_DataClass"}).save();
				};


