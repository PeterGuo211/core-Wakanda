

model.Emp.events.validateremove = function(event) {
	// Add your code here;
	var eventFlag;
	eventFlag = new ds.EventsFlag({
		name : "validateremove on Emp "+this.name
	});
	eventFlag.save();
};


model.Emp.events.clientrefresh = function(event) {
	// Add your code here;
	var eventFlag;
	eventFlag = new ds.EventsFlag({
		name : "clientrefresh on Emp "+this.name
	});
	eventFlag.save();
};
