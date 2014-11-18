
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
// @endregion// @endlock

// eventHandlers// @lock

	container1.dblclick = function container1_dblclick (event)// @startlock
	{// @endlock
		$$('richText1').setValue('ondbclick');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("container1", "dblclick", container1.dblclick, "WAF");
// @endregion
};// @endlock
