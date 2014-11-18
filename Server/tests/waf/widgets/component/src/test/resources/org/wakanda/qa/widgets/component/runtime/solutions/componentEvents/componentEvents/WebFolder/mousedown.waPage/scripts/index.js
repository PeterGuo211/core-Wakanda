
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var component1 = {};	// @component
// @endregion// @endlock

// eventHandlers// @lock

	component1.mousedown = function component1_mousedown (event)// @startlock
	{// @endlock
		$$('richText1').setValue('onmousedown');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("component1", "mousedown", component1.mousedown, "WAF");
// @endregion
};// @endlock
