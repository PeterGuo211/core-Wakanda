
var testCase = {
    name: "test Datastore class methods",
    
    _should: {
        ignore: {
        }
    },
 
    testEmptyMethod_toEntity:function(){
    	var myEntity = ds.Employee4.find("ID = 3");
		var result = myEntity.getStaticToEntity();
    	Y.Assert.areEqual("toEntity",result,"using an empty method (Entity) fail.");
    },
    testEmptyMethod_toClass:function(){
    	var result = ds.Employee4.getStaticToClass();
    	Y.Assert.areEqual("toClass",result,"using an empty method (Class) fail.");
    },
    testEmptyMethod_toCollection:function(){
    	var myColl = ds.Employee4.query("ID >= 1");
		var result = myColl.getStaticToColl();
    	Y.Assert.areEqual("toCollection",result,"using an empty method (Collection) fail.");
    },
    testMethod_toEntity:function(){
    	var myEntity = ds.Employee4.find("ID = 3");
		var result = myEntity.getCoWorkers(true);
    	Y.Assert.areEqual(2,result.length,"using a method (Entity) fail.");
    },
    testMethod_toClass:function(){
    	var result = ds.Employee4.getLargestSalary();
    	Y.Assert.areEqual(3000,result,"using a method (Class) fail.");
    },
    testMethod_toCollection:function(){
    	var myColl = ds.Employee4.query("ID >= 3");
		var result = myColl.getAgeAverage();
    	Y.Assert.areEqual(26.5,result,"using a method (Collection) fail.");
    }
}