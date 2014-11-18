

model.Employee21.nom.events.save = function() {
	if(this.nom.length == 1)
		return { error: 100, errorMessage:"The name should not contain just one letter." };
	else
		new ds.Flags({event:"onSave_Attribute_Only"}).save();
};
