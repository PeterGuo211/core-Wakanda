
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
// @endregion// @endlock

// eventHandlers// @lock

	container1.click = function container1_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue('onclick');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("container1", "click", container1.click, "WAF");
// @endregion
};// @endlock
