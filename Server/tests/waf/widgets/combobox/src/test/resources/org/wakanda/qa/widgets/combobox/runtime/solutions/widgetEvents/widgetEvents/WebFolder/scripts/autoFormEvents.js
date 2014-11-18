
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var autoForm1 = {};	// @autoForm
// @endregion// @endlock

// eventHandlers// @lock

	autoForm1.stopResize = function autoForm1_stopResize (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'stopResize' + ' ');
	};// @lock

	autoForm1.onResize = function autoForm1_onResize (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'onResize' + ' ');
	};// @lock

	autoForm1.startResize = function autoForm1_startResize (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'startResize' + ' ');
	};// @lock

	autoForm1.onError = function autoForm1_onError (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'onError' + ' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("autoForm1", "stopResize", autoForm1.stopResize, "WAF");
	WAF.addListener("autoForm1", "onResize", autoForm1.onResize, "WAF");
	WAF.addListener("autoForm1", "startResize", autoForm1.startResize, "WAF");
	WAF.addListener("autoForm1", "onError", autoForm1.onError, "WAF");
// @endregion
};// @endlock
