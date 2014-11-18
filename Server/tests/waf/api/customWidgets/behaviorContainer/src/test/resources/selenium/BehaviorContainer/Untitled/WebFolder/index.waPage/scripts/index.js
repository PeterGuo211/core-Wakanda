
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var behaviorContainer1 = {};	// @BehaviorContainer
// @endregion// @endlock

// eventHandlers// @lock

	behaviorContainer1.select = function behaviorContainer1_select (event)// @startlock
	{// @endlock
		var result = $$('textLog').getValue();
		$$('textLog').setValue(result+'select');
	};// @lock

	behaviorContainer1.click = function behaviorContainer1_click (event)// @startlock
	{// @endlock
		var result = $$('textLog').getValue();
		$$('textLog').setValue(result+'click');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("behaviorContainer1", "select", behaviorContainer1.select, "WAF");
	WAF.addListener("behaviorContainer1", "click", behaviorContainer1.click, "WAF");
// @endregion
};// @endlock
