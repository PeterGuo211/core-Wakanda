
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
// @endregion// @endlock

// eventHandlers// @lock

	container1.mousedown = function container1_mousedown (event)// @startlock
	{// @endlock
		$$('richText1').setValue('onmousedown');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("container1", "mousedown", container1.mousedown, "WAF");
// @endregion
};// @endlock
