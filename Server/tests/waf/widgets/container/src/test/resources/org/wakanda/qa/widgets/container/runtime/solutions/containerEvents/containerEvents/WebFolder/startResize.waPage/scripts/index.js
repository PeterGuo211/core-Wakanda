
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
// @endregion// @endlock

// eventHandlers// @lock

	container1.startResize = function container1_startResize (event)// @startlock
	{// @endlock
		$$('richText1').setValue('onstartResize');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("container1", "startResize", container1.startResize, "WAF");
// @endregion
};// @endlock
