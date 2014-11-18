model.Employee2.nom.events.onInit = function (attributeName) {
		new ds.Flags({event:"onInit_Attribute_Only"}).save();
	};


model.Employee2.nom.events.onLoad = function (attributeName) {
		new ds.Flags({event:"onLoad_Attribute_Only"}).save();
	};


model.Employee2.nom.events.onSet = function (attributeName) {
		new ds.Flags({event:"onSet_Attribute_Only"}).save();
	};


model.Employee2.nom.events.onValidate = function (attributeName) {
	if(this.nom.length == 0)
		return { error: 100, errorMessage:"the name should not be empty." };
	else
		new ds.Flags({event:"onValidate_Attribute_Only"}).save();
	};


model.Employee2.nom.events.onSave = function (attributeName) {
	if(this.nom.length == 1)
		return { error: 100, errorMessage:"The name should not contain just one letter." };
	else
		new ds.Flags({event:"onSave_Attribute_Only"}).save();
	};


model.Employee2.nom.events.onRemove = function (attributeName) {
	if(this.nom == "OnlyOneToRefuse")
		return { error: 100, errorMessage:"I Refuse to remove this entity." };
	new ds.Flags({event:"onRemove_Attribute_Only"}).save();
	};


