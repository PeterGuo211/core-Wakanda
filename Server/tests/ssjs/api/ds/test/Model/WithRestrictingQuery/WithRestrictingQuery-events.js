

model.WithRestrictingQuery.events.restrict = function(event) {
	var shouldNotBeNull = ds.WithRestrictingQuery.find("ID = 3");
	if(shouldNotBeNull == null){
		(new ds.Flags({event:"isNull"})).save();
	}
	else{
		(new ds.Flags({event:"isNotNull"})).save();
	}
	(new ds.Flags({event:"normalCase"})).save();
	return ds.WithRestrictingQuery.query("ID > 1");
};
