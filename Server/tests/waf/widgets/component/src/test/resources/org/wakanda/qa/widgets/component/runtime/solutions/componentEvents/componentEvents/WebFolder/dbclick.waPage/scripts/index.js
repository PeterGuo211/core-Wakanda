
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var component1 = {};	// @component
// @endregion// @endlock

// eventHandlers// @lock

	component1.dblclick = function component1_dblclick (event)// @startlock
	{// @endlock
		$$('richText1').setValue('ondbclick');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("component1", "dblclick", component1.dblclick, "WAF");
// @endregion
};// @endlock
