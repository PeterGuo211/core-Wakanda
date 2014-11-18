
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
// @endregion// @endlock

// eventHandlers// @lock

	container1.mouseover = function container1_mouseover (event)// @startlock
	{// @endlock
		$$('richText1').setValue('onmouseover');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("container1", "mouseover", container1.mouseover, "WAF");
// @endregion
};// @endlock
