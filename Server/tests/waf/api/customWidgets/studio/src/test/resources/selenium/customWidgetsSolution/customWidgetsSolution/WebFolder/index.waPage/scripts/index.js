
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var testStudio1 = {};	// @TestStudio
// @endregion// @endlock

// eventHandlers// @lock

	testStudio1.create = function testStudio1_create (event)// @startlock
	{// @endlock
		$$('testStudio1').log('create event');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("testStudio1", "create", testStudio1.create, "WAF");
// @endregion
};// @endlock
