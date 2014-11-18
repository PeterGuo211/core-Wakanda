
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
// @endregion// @endlock

// eventHandlers// @lock

	container1.mouseout = function container1_mouseout (event)// @startlock
	{// @endlock
		$$('richText1').setValue('onmouseout');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("container1", "mouseout", container1.mouseout, "WAF");
// @endregion
};// @endlock
