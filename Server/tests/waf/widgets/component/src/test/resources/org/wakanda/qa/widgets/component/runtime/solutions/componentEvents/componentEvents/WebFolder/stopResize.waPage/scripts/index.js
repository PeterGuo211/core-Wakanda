
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var component1 = {};	// @component
// @endregion// @endlock

// eventHandlers// @lock

	component1.stopResize = function component1_stopResize (event)// @startlock
	{// @endlock
		$$('richText1').setValue('onstopResize');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("component1", "stopResize", component1.stopResize, "WAF");
// @endregion
};// @endlock
