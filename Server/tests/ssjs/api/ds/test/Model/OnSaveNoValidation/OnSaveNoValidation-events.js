model.OnSaveNoValidation.events.onRemove = function () {
				if(ds.OnSaveNoValidation.length == 1)
					return { error: 100, errorMessage:"no message" };
				new ds.Flags({event:"onRemove_Refuse"}).save();
			};


model.OnSaveNoValidation.events.onSave = function () {
				if(ds.OnSaveNoValidation.length >= 1)
					return { error: 100, errorMessage:"no message" };
				new ds.Flags({event:"onSave_withoutOnValidation"}).save();
			};


