
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var component1 = {};	// @component
// @endregion// @endlock

// eventHandlers// @lock

	component1.mouseup = function component1_mouseup (event)// @startlock
	{// @endlock
		$$('richText1').setValue('onmouseup');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("component1", "mouseup", component1.mouseup, "WAF");
// @endregion
};// @endlock
