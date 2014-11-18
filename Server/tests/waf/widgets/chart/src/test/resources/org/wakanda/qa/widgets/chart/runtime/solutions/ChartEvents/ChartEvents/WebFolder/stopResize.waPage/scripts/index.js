
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
// @endregion// @endlock

// eventHandlers// @lock

	container1.stopResize = function container1_stopResize (event)// @startlock
	{// @endlock
		$$('richText2').setValue('stopResize');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("container1", "stopResize", container1.stopResize, "WAF");
// @endregion
};// @endlock
