
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var component1 = {};	// @component
// @endregion// @endlock

// eventHandlers// @lock

	component1.mouseout = function component1_mouseout (event)// @startlock
	{// @endlock
		$$('richText1').setValue('onmouseout');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("component1", "mouseout", component1.mouseout, "WAF");
// @endregion
};// @endlock
