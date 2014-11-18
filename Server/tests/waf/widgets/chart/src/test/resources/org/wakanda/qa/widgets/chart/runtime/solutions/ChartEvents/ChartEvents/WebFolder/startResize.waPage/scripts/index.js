
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
// @endregion// @endlock

// eventHandlers// @lock

	container1.startResize = function container1_startResize (event)// @startlock
	{// @endlock
		$$('richText2').setValue('startResize');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("container1", "startResize", container1.startResize, "WAF");
// @endregion
};// @endlock
