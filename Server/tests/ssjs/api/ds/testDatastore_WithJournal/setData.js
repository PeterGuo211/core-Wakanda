



var dateTab = ["05/02/2013","03/03/1986",""];
for (var i=1; i<4; i++) {
	var entity = new ds.MyClass();
	entity.name = "entity"+i;
	entity.isTrue = i%2==0?true:false;
	if(dateTab[i-1]!="")
		entity.theDate = new Date(dateTab[i-1]);
	else
		entity.theDate = new Date();
	entity.save();
};


ds.MyClass.all();







