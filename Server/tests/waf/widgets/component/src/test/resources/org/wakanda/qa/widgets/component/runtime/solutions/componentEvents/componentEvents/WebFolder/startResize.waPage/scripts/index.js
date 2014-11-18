
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var component1 = {};	// @component
// @endregion// @endlock

// eventHandlers// @lock

	component1.startResize = function component1_startResize (event)// @startlock
	{// @endlock
		$$('richText1').setValue('onstartResize');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("component1", "startResize", component1.startResize, "WAF");
// @endregion
};// @endlock
