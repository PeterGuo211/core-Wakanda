
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
// @endregion// @endlock

// eventHandlers// @lock

	container1.mouseout = function container1_mouseout (event)// @startlock
	{// @endlock
		$$('richText2').setValue('mouseout');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("container1", "mouseout", container1.mouseout, "WAF");
// @endregion
};// @endlock
