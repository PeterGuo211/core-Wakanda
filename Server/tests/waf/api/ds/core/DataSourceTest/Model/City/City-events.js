
model.City.events.validateremove = function(event) {
	// Add your code here;
	debugger;
	var eventFlag;
	eventFlag = new ds.EventsFlag({
		name : "validateremove on City "
	});
	eventFlag.save();
};


model.City.events.clientrefresh = function(event) {
	// Add your code here;
	var eventFlag;
	eventFlag = new ds.EventsFlag({
		name : "clientrefresh on City "
	});
	eventFlag.save();
	//debugger;
};