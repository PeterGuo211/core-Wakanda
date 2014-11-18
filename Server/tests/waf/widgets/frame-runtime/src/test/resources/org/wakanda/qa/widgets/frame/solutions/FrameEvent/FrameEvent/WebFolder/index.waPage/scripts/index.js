
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var frame1 = {};	// @frame
// @endregion// @endlock

// eventHandlers// @lock

	frame1.onLoad = function frame1_onLoad (event)// @startlock
	{// @endlock
		$$('richText1').setValue("event should be fired");
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("frame1", "onLoad", frame1.onLoad, "WAF");
// @endregion
};// @endlock
