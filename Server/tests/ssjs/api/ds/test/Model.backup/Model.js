
guidedModel =
{
	Employee4 :
	{
		methods :
		{
			getStaticToClass:function()
			{
				return "toClass";
			},
			getLargestSalary:function()
			{
				return this.max("salary");
			}
		},
		entityMethods :
		{
			getStaticToEntity:function()
			{
				return "toEntity";
			},
			getCoWorkers:function(excludingMyself)
			{
				if (this.manager == null)
					return ds.Employee4.createEntityCollection(); // returns an empty collection
				else
				{
					var coworkers = this.manager.directReports; // my coworkers have the same manager than me
					if (excludingMyself)
					{
						var myself = ds.Employee4.createEntityCollection();
						myself.add(this);
						coworkers = coworkers.minus(myself);
					}
					return coworkers;	
				}
			}
		},
		collectionMethods :
		{
			getStaticToColl:function()
			{
				return "toCollection";
			},
			getAgeAverage:function()
			{
				return this.average("age");
			}
		}
	},
	OnSaveNoValidation :
	{
		events :
		{
			onRemove:function()
			{
				if(ds.OnSaveNoValidation.length == 1)
					return { error: 100, errorMessage:"no message" };
				new ds.Flags({event:"onRemove_Refuse"}).save();
			},
			onSave:function()
			{
				if(ds.OnSaveNoValidation.length >= 1)
					return { error: 100, errorMessage:"no message" };
				new ds.Flags({event:"onSave_withoutOnValidation"}).save();
			}
		}
	},
	RefuseEvent :
	{
		events :
		{
			onSave:function()
			{
				if(ds.RefuseEvent.length == 0)
					return { error: 100, errorMessage:"no message" };
				new ds.Flags({event:"onSave_RefuseOnSave"}).save();
			},
			onValidate:function()
			{
				if(ds.RefuseEvent.length >= 1)
					return { error: 100, errorMessage:"no message" };
				new ds.Flags({event:"onValidate_RefuseOnValidate"}).save();
			}
		}
	},
	Employee3 :
	{
		nom :
		{
			events :
			{
				onInit:function(attributeName)
				{
					new ds.Flags({event:"onInit_Attribute_DataClass"}).save();
				},
				onLoad:function(attributeName)
				{
					new ds.Flags({event:"onLoad_Attribute_DataClass"}).save();
				},
				onSet:function(attributeName)
				{
					new ds.Flags({event:"onSet_Attribute_DataClass"}).save();
				},
				onValidate:function(attributeName)
				{
					new ds.Flags({event:"onValidate_Attribute_DataClass"}).save();
				},
				onSave:function(attributeName)
				{
					new ds.Flags({event:"onSave_Attribute_DataClass"}).save();
				},
				onRemove:function(attributeName)
				{
					new ds.Flags({event:"onRemove_Attribute_DataClass"}).save();
				}
			}
		},
		events :
		{
			onInit:function()
			{
				new ds.Flags({event:"onInit_DataClass_Attribute"}).save();
			},
			onLoad:function()
			{
				new ds.Flags({event:"onLoad_DataClass_Attribute"}).save();
			},
			onValidate:function()
			{
				new ds.Flags({event:"onValidate_DataClass_Attribute"}).save();
			},
			onSave:function()
			{
				new ds.Flags({event:"onSave_DataClass_Attribute"}).save();
			},
			onRemove:function()
			{
				new ds.Flags({event:"onRemove_DataClass_Attribute"}).save();
			},
			onRestrictingQuery:function()
			{
				return ds.Employee3.query("ID > 1");
			}
		}
	},
	Employee2 :
	{
		nom :
		{
			events :
			{
				onInit:function(attributeName)
				{
					new ds.Flags({event:"onInit_Attribute_Only"}).save();
				},
				onLoad:function(attributeName)
				{
					new ds.Flags({event:"onLoad_Attribute_Only"}).save();
				},
				onSet:function(attributeName)
				{
					new ds.Flags({event:"onSet_Attribute_Only"}).save();
				},
				onValidate:function(attributeName)
				{
					new ds.Flags({event:"onValidate_Attribute_Only"}).save();
				},
				onSave:function(attributeName)
				{
					new ds.Flags({event:"onSave_Attribute_Only"}).save();
				},
				onRemove:function(attributeName)
				{
					new ds.Flags({event:"onRemove_Attribute_Only"}).save();
				}
			}
		}
	},
	Employee1 :
	{
		events :
		{
			onInit:function()
			{
				new ds.Flags({event:"onInit_DataClass_Only"}).save();
			},
			onLoad:function()
			{
				var entityEmployee2 = ds.Employee2.find("ID = 3");
				entityEmployee2.nom = "onLoadOfEmployee1";
				new ds.Flags({event:"onLoad_DataClass_Only"}).save();
			},
			onValidate:function()
			{
				new ds.Flags({event:"onValidate_DataClass_Only"}).save();
			},
			onSave:function()
			{
				new ds.Flags({event:"onSave_DataClass_Only"}).save();
			},
			onRemove:function()
			{
				new ds.Flags({event:"onRemove_DataClass_Only"}).save();
			},
			onRestrictingQuery:function()
			{
				return ds.Employee1.query("ID > 1");
			}
		}
	}
};
