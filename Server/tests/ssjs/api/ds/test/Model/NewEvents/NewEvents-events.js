
//Dataclass events

model.NewEvents.events.init = function(event) {
	new ds.Flags({event:"init_DataClass_New"}).save();
	new ds.Flags_eventParameters({
		eventKind:"init_DataClass_"+event.eventKind,
		attributeName:"init_DataClass_"+event.attributeName,
		dataClassName:"init_DataClass_"+event.dataClassName
		}).save();
};


model.NewEvents.events.load = function(event) {
	new ds.Flags({event:"load_DataClass_New"}).save();
	new ds.Flags_eventParameters({
		eventKind:"load_DataClass_"+event.eventKind,
		attributeName:"load_DataClass_"+event.attributeName,
		dataClassName:"load_DataClass_"+event.dataClassName
		}).save();
};


model.NewEvents.events.validate = function(event) {
	new ds.Flags({event:"validate_DataClass_New"}).save();
	new ds.Flags_eventParameters({
		eventKind:"validate_DataClass_"+event.eventKind,
		attributeName:"validate_DataClass_"+event.attributeName,
		dataClassName:"validate_DataClass_"+event.dataClassName
		}).save();
};


model.NewEvents.events.save = function(event) {
	new ds.Flags({event:"save_DataClass_New"}).save();
	new ds.Flags_eventParameters({
		eventKind:"save_DataClass_"+event.eventKind,
		attributeName:"save_DataClass_"+event.attributeName,
		dataClassName:"save_DataClass_"+event.dataClassName
		}).save();
};


model.NewEvents.events.remove = function(event) {
	new ds.Flags({event:"remove_DataClass_New"}).save();
	new ds.Flags_eventParameters({
		eventKind:"remove_DataClass_"+event.eventKind,
		attributeName:"remove_DataClass_"+event.attributeName,
		dataClassName:"remove_DataClass_"+event.dataClassName
		}).save();
};


model.NewEvents.events.restrict = function(event) {
	new ds.Flags({event:"restrict_DataClass_New"}).save();
	new ds.Flags_eventParameters({
		eventKind:"restrict_DataClass_"+event.eventKind,
		attributeName:"restrict_DataClass_"+event.attributeName,
		dataClassName:"restrict_DataClass_"+event.dataClassName
		}).save();
	return ds.NewEvents.query("ID > 0");
};


model.NewEvents.events.validateremove = function(event) {
	new ds.Flags({event:"validateremove_DataClass_New"}).save();
	new ds.Flags_eventParameters({
		eventKind:"validateremove_DataClass_"+event.eventKind,
		attributeName:"validateremove_DataClass_"+event.attributeName,
		dataClassName:"validateremove_DataClass_"+event.dataClassName
		}).save();
};


model.NewEvents.events.clientrefresh = function(event) {
	new ds.Flags({event:"clientrefresh_DataClass_New"}).save();
	new ds.Flags_eventParameters({
		eventKind:"clientrefresh_DataClass_"+event.eventKind,
		attributeName:"clientrefresh_DataClass_"+event.attributeName,
		dataClassName:"clientrefresh_DataClass_"+event.dataClassName
		}).save();
};

//Attributes events

model.NewEvents.cstring.events.init = function(event) {
	new ds.Flags({event:"init_Attribute_New"}).save();
	new ds.Flags_eventParameters({
		eventKind:"init_Attribute_"+event.eventKind,
		attributeName:"init_Attribute_"+event.attributeName,
		dataClassName:"init_Attribute_"+event.dataClassName
		}).save();
};


model.NewEvents.cstring.events.load = function(event) {
	new ds.Flags({event:"load_Attribute_New"}).save();
	new ds.Flags_eventParameters({
		eventKind:"load_Attribute_"+event.eventKind,
		attributeName:"load_Attribute_"+event.attributeName,
		dataClassName:"load_Attribute_"+event.dataClassName
		}).save();
};


model.NewEvents.cstring.events.set = function(event) {
	new ds.Flags({event:"set_Attribute_New"}).save();
	new ds.Flags_eventParameters({
		eventKind:"set_Attribute_"+event.eventKind,
		attributeName:"set_Attribute_"+event.attributeName,
		dataClassName:"set_Attribute_"+event.dataClassName
		}).save();
};


model.NewEvents.cstring.events.validate = function(event) {
	new ds.Flags({event:"validate_Attribute_New"}).save();
	new ds.Flags_eventParameters({
		eventKind:"validate_Attribute_"+event.eventKind,
		attributeName:"validate_Attribute_"+event.attributeName,
		dataClassName:"validate_Attribute_"+event.dataClassName
		}).save();
};


model.NewEvents.cstring.events.save = function(event) {
	new ds.Flags({event:"save_Attribute_New"}).save();
	new ds.Flags_eventParameters({
		eventKind:"save_Attribute_"+event.eventKind,
		attributeName:"save_Attribute_"+event.attributeName,
		dataClassName:"save_Attribute_"+event.dataClassName
		}).save();
};


model.NewEvents.cstring.events.remove = function(event) {
	new ds.Flags({event:"remove_Attribute_New"}).save();
	new ds.Flags_eventParameters({
		eventKind:"remove_Attribute_"+event.eventKind,
		attributeName:"remove_Attribute_"+event.attributeName,
		dataClassName:"remove_Attribute_"+event.dataClassName
		}).save();
};
