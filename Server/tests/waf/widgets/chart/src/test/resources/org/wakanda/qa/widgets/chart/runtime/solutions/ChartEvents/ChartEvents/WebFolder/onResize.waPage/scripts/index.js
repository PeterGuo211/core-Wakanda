
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
// @endregion// @endlock

// eventHandlers// @lock

	container1.onResize = function container1_onResize (event)// @startlock
	{// @endlock
		$$('richText2').setValue('onResize');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("container1", "onResize", container1.onResize, "WAF");
// @endregion
};// @endlock
