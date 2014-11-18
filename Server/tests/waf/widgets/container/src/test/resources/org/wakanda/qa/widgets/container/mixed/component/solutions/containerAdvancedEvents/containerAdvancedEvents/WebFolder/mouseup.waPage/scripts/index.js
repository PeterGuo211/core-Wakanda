
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
// @endregion// @endlock

// eventHandlers// @lock

	container1.mouseup = function container1_mouseup (event)// @startlock
	{// @endlock
		$$('richText1').setValue('onmouseup');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("container1", "mouseup", container1.mouseup, "WAF");
// @endregion
};// @endlock
