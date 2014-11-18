
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		var myObject1 = {}
		myObject1.myNumber = 1;
		myObject1.myString = "entity1";
		myObject1.myBoolean = true;
		myObject1.myObject = {name:"entity1"};
		myObject1.myDate = new Date('1/1/2001');
		myArray.push(myObject1);
		
		var myObject2 = {}
		myObject2.myNumber = 2;
		myObject2.myString = "entity2";
		myObject2.myBoolean = true;
		myObject2.myObject = {name:"entity2"};
		myObject2.myDate = new Date('1/1/2002');
		myArray.push(myObject2);
		
		sources.myArray.sync();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
