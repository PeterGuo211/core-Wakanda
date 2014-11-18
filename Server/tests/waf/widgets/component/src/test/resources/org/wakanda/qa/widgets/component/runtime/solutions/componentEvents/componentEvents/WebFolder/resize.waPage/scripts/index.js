
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var component1 = {};	// @component
// @endregion// @endlock

// eventHandlers// @lock

	component1.onResize = function component1_onResize (event)// @startlock
	{// @endlock
		$$('richText1').setValue('onResize');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("component1", "onResize", component1.onResize, "WAF");
// @endregion
};// @endlock
