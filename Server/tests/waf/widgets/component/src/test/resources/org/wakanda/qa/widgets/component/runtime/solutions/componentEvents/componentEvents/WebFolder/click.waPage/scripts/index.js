
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var component1 = {};	// @component
// @endregion// @endlock

// eventHandlers// @lock

	component1.click = function component1_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue('onclick');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("component1", "click", component1.click, "WAF");
// @endregion
};// @endlock
