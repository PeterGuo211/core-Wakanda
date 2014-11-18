function CreateData(count){
	for(var i = 0; i <count;++i){
		var e = new ds.DataClass1({attribute1:"Record "+i});
		e.save();
	}
}

CreateData(1000);