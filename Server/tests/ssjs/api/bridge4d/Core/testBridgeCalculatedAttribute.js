
function compaireCollections(myNewColl,myOldColl) {
	
		for(var i = 0 ; i < myNewColl.length; i++){
		if(myNewColl[i].ID!=myOldColl[i].ID || myNewColl[i].alpha1!=myOldColl[i].alpha1 || myNewColl[i].alpha2!=myOldColl[i].alpha2 ||
		myNewColl[i].text1!=myOldColl[i].text1 || myNewColl[i].text2!=myOldColl[i].text2 || myNewColl[i].time1!=myOldColl[i].time1 || 
		myNewColl[i].boolean1!=myOldColl[i].boolean1 || myNewColl[i].boolean2!=myOldColl[i].boolean2 || myNewColl[i].integer1!=myOldColl[i].integer1)	
			return false;
		}
		return true;	
	};

var testCase = {
    name: "Calculated attributes UT for Bridge wakanda-4D",

    _should: {
        ignore: {
		}
    },
	setUp : function () {
		if (os.isWindows) {
			// On ignore le test suivant sous Windows :
		}
		if (os.isLinux) {
			// On ignore le test suivant sous Linux :
			testOnGet_Alpha = true;
			testOnGet_Text = true;
			testOnGet_Date = true;
			testOnGet_Time = true;
			testOnGet_Boolean = true;
			testOnGet_Integer = true;
			testOnGet_LongInteger = true;
			testOnGet_Integer64 = true;
			testOnGet_Real = true;
			
		}
    },
	//********************************************
	//********** tools ***************************
	//********************************************
	
	//*********************************************
	//******Test OnGet() event*********************
	//*********************************************
	//Type alpha
    testOnGet_Alpha: function() {
		var entity = ds.CalculatedAttributes.find("ID = 1");
		var myString = entity.alpha1 + " " + entity.alpha2;
		if(entity.calculatedAlpha != myString)
			Y.Assert.fail("OnGet of Calculated attributes for type 'alpha' does not work.");
    },
    //Type text
    testOnGet_Text: function() {
		var entity = ds.CalculatedAttributes.find("ID = 1");
		var myString = entity.text1 + " " + entity.text2;
		if(entity.calculatedText != myString)
			Y.Assert.fail("OnGet of Calculated attributes for type 'text' does not work.");
    },
    //Type date
    testOnGet_Date: function() {
		var entity = ds.CalculatedAttributes.find("ID = 1");
		if(entity.date1 >= entity.date2 && entity.calculatedDate.getTime() != entity.date1.getTime())
				Y.Assert.fail("OnGet of Calculated attributes for type 'date' does not work. 1");
		if(entity.date1 <= entity.date2 && entity.calculatedDate.getTime() != entity.date2.getTime())
			Y.Assert.fail("OnGet of Calculated attributes for type 'date' does not work. 2");
    },
    //Type time
    testOnGet_Time: function() {
		var entity = ds.CalculatedAttributes.find("ID = 1");
		if((entity.time1 + entity.time2) != entity.calculatedTime)
				Y.Assert.fail("OnGet of Calculated attributes for type 'time' does not work.");
    },
    //Type boolean
    testOnGet_Boolean: function() {
		var entity = ds.CalculatedAttributes.find("ID = 1");
		if(entity.boolean1  != entity.calculatedBoolean)
				Y.Assert.fail("OnGet of Calculated attributes for type 'boolean' does not work."+entity.boolean1+" "+entity.calculatedBoolean);
    },
    //Type integer
    testOnGet_Integer: function() {
		var entity = ds.CalculatedAttributes.find("ID = 1");
		if((entity.integer1 + entity.integer2) != entity.calculatedInteger)
				Y.Assert.fail("OnGet of Calculated attributes for type 'integer' does not work.");
    },
    //Type Long Integer
    testOnGet_LongInteger: function() {
		var entity = ds.CalculatedAttributes.find("ID = 1");
		if((entity.longInt1 + entity.longInt2) != entity.calculatedLongInt)
				Y.Assert.fail("OnGet of Calculated attributes for type 'long integer' does not work.");
    },
    //Type integer64
    testOnGet_Integer64: function() {
		var entity = ds.CalculatedAttributes.find("ID = 1");
		if((entity.integer641 + entity.integer642) != entity.calculatedInteger64)
				Y.Assert.fail("OnGet of Calculated attributes for type 'integer' does not work.");
    },
    //Type real
    testOnGet_Real: function() {
		var entity = ds.CalculatedAttributes.find("ID = 1");
		if((entity.real1 + entity.real2) != entity.calculatedReal)
				Y.Assert.fail("OnGet of Calculated attributes for type 'integer' does not work.");
    },
	//*********************************************
	//******Test OnSet() event*********************
	//*********************************************
	//Type alpha
    testOnSet_Alpha: function() {
		var entity = new ds.CalculatedAttributes();
		entity.calculatedAlpha = "part1 part2";
		entity.save();
		Y.Assert.areEqual(entity.alpha1,"part1","onSet; alpha type fail");
		Y.Assert.areEqual(entity.alpha2,"part2","onSet; alpha type fail");
    },
    //Type text
    testOnGet_Text: function() {
		var entity = new ds.CalculatedAttributes();
		entity.calculatedText = "part1 part2";
		entity.save();
		Y.Assert.areEqual(entity.text1,"part1","onSet; text type fail");
		Y.Assert.areEqual(entity.text2,"part2","onSet; text type fail");
    },
    //Type date
    testOnSet_Date: function() {
    	var myDate = new Date("08/15/2011");
		var entity = new ds.CalculatedAttributes();
		entity.calculatedDate = myDate;
		entity.save();
		var myTime = entity.calculatedDate.getTime();
		var time1 = entity.date1.getTime();
		var time2 = entity.date2.getTime();
		Y.Assert.areEqual(time1,myTime,"onSet; date type fail");
		Y.Assert.areEqual(time2,myTime,"onSet; date type fail");
    },
    //Type time
    testOnSet_Time: function() {
    	var n = 999;
		var entity = new ds.CalculatedAttributes();
		entity.calculatedTime = n;
		entity.save();
		Y.Assert.areEqual(entity.time1,n,"onSet; time type fail");
		Y.Assert.areEqual(entity.time2,n,"onSet; time type fail");
    },
    //Type boolean
    testOnSet_Boolean: function() {
		var b = false;
		var entity = new ds.CalculatedAttributes();
		entity.calculatedBoolean = b;
		entity.save();
		Y.Assert.areEqual(entity.boolean1,b,"onSet; boolean type fail");
		Y.Assert.areEqual(entity.boolean2,b,"onSet; boolean type fail");
    },
    //Type integer
    testOnSet_Integer: function() {
    	var n = 32767;
		var entity = new ds.CalculatedAttributes();
		entity.calculatedInteger = n;
		entity.save();
		Y.Assert.areEqual(entity.integer1,n,"onSet; integer type fail");
		Y.Assert.areEqual(entity.integer2,n,"onSet; integer type fail");
    },
    //Type Long Integer
    testOnSet_LongInteger: function() {
		var n = 99999;
		var entity = new ds.CalculatedAttributes();
		entity.calculatedLongInt = n;
		entity.save();
		Y.Assert.areEqual(entity.longInt1,n,"onSet; long integer type fail");
		Y.Assert.areEqual(entity.longInt2,n,"onSet; long integer type fail");
    },
    //Type integer64
    testOnSet_Integer64: function() {
		var n = 99999;
		var entity = new ds.CalculatedAttributes();
		entity.calculatedInteger64 = n;
		entity.save();
		Y.Assert.areEqual(entity.integer641,n,"onSet; Integer64 type fail");
		Y.Assert.areEqual(entity.integer642,n,"onSet; Integer64 type fail");
    },
    //Type real
    testOnSet_Real: function() {
		var n = 99999;
		var entity = new ds.CalculatedAttributes();
		entity.calculatedReal = n;
		entity.save();
		Y.Assert.areEqual(entity.real1,n,"onSet; real type fail");
		Y.Assert.areEqual(entity.real2,n,"onSet; real type fail");
    },
	//*********************************************
	//******Test OnSort() event*********************
	//*********************************************
	//Type alpha
    testOnSort_Alpha: function() {
		var myNewColl = ds.CalculatedAttributes.query("ID > 0 order by calculatedAlpha");
		var myOldColl = ds.CalculatedAttributes.query("ID > 0 order by alpha1");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'alpha' does not work.");
    },
    //Type text
    testOnSort_Text: function() {
		var myNewColl = ds.CalculatedAttributes.query("ID > 0 order by calculatedText");
		var myOldColl = ds.CalculatedAttributes.query("ID > 0 order by text1");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'text' does not work.");
    },
	//Type date
    testOnSort_Date: function() {
		var myNewColl = ds.CalculatedAttributes.query("ID > 0 order by calculatedDate");
		var myOldColl = ds.CalculatedAttributes.query("ID > 0 order by date1");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'date' does not work.");
    },
    //Type time
    testOnSort_Time: function() {
		var myNewColl = ds.CalculatedAttributes.query("ID > 0 order by calculatedTime");
		var myOldColl = ds.CalculatedAttributes.query("ID > 0 order by time1");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'time' does not work.");
    },
    //Type boolean
    testOnSort_Boolean: function() {
		var myNewColl = ds.CalculatedAttributes.query("ID > 0 order by calculatedBoolean");
		var myOldColl = ds.CalculatedAttributes.query("ID > 0 order by boolean1");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'boolean' does not work.");
    },
    //Type integer
    testOnSort_Integer: function() {
		var myNewColl = ds.CalculatedAttributes.query("ID > 0 order by calculatedInteger");
		var myOldColl = ds.CalculatedAttributes.query("ID > 0 order by integer1");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'integer' does not work.");
    },
    //Type Long Integer
    testOnSort_LongInt: function() {
		var myNewColl = ds.CalculatedAttributes.query("ID > 0 order by calculatedLongInt");
		var myOldColl = ds.CalculatedAttributes.query("ID > 0 order by longInt1");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'longInt' does not work.");
    },
    //Type integer64
    testOnSort_Integer64: function() {
		var myNewColl = ds.CalculatedAttributes.query("ID > 0 order by calculatedInteger64");
		var myOldColl = ds.CalculatedAttributes.query("ID > 0 order by integer641");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'integer64' does not work.");
    },
    //Type real
    testOnSort_Real: function() {
		var myNewColl = ds.CalculatedAttributes.query("ID > 0 order by calculatedReal");
		var myOldColl = ds.CalculatedAttributes.query("ID > 0 order by real1");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'real' does not work.");
    },
	//*********************************************
	//******Test OnQuery() event*********************
	//**********************************************
	//Type alpha
    testOnQuery_Alpha: function() {
    	var value = "alpha21";
		var myNewColl = ds.CalculatedAttributes.query("calculatedAlpha = value");
		var myOldColl = ds.CalculatedAttributes.query("alpha1 = value");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'alpha' does not work.");
    },
    //Type text
    testOnQuery_Text: function() {
    	var value = "text21";
		var myNewColl = ds.CalculatedAttributes.query("calculatedText = value");
		var myOldColl = ds.CalculatedAttributes.query("text1 = value");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'text' does not work.");
    },
	//Type date
    testOnQuery_Date: function() {
    	var value = new Date("01/02/2002");
		var myNewColl = ds.CalculatedAttributes.query("calculatedDate = value");
		var myOldColl = ds.CalculatedAttributes.query("date1 = value");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'date' does not work.");
    },
    //Type time
    testOnQuery_Time: function() {
    	var value = 9050000;
		var myNewColl = ds.CalculatedAttributes.query("calculatedTime = value");
		var myOldColl = ds.CalculatedAttributes.query("time1 = value");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'time' does not work.");
    },
    //Type boolean
    testOnQuery_Boolean: function() {
		var myNewColl = ds.CalculatedAttributes.query("calculatedBoolean = false");
		var myOldColl = ds.CalculatedAttributes.query("boolean1 = false and boolean2 = false");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'boolean' does not work.");
    },
    //Type integer
    testOnQuery_Integer: function() {
    	var value = 200;
		var myNewColl = ds.CalculatedAttributes.query("calculatedInteger = value");
		var myOldColl = ds.CalculatedAttributes.query("integer1 = value");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'integer' does not work.");
    },
    //Type Long Integer
    testOnQuery_LongInt: function() {
    	var value = 200;
		var myNewColl = ds.CalculatedAttributes.query("calculatedLongInt = value");
		var myOldColl = ds.CalculatedAttributes.query("longInt1 = value");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'longInt' does not work.");
    },
    //Type integer64
    testOnQuery_Integer64: function() {
    	var value = 200;
		var myNewColl = ds.CalculatedAttributes.query("calculatedInteger64 = value");
		var myOldColl = ds.CalculatedAttributes.query("integer641 = value");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'integer64' does not work.");
    },
    //Type real
    testOnQuery_Real: function() {
    	var value = 200;
		var myNewColl = ds.CalculatedAttributes.query("calculatedReal = value");
		var myOldColl = ds.CalculatedAttributes.query("real1 = value");
		if(compaireCollections(myNewColl,myOldColl)==false)
			Y.Assert.fail("OnSort of Calculated attributes for type 'real' does not work.");
    }
	
}
