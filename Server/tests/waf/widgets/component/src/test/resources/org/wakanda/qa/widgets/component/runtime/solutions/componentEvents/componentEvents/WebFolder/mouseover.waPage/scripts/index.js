
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var component1 = {};	// @component
// @endregion// @endlock

// eventHandlers// @lock

	component1.mouseover = function component1_mouseover (event)// @startlock
	{// @endlock
		$$('richText1').setValue('onmouseover');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("component1", "mouseover", component1.mouseover, "WAF");
// @endregion
};// @endlock
