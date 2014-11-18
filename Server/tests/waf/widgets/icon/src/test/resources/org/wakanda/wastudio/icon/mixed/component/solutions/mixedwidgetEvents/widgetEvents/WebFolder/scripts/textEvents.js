
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var richText1 = {};	// @richText
// @endregion// @endlock

// eventHandlers// @lock

	richText1.click = function richText1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText2').getValue();
		$$('richText2').setValue(stack+'click'+' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("richText1", "click", richText1.click, "WAF");
// @endregion
};// @endlock
