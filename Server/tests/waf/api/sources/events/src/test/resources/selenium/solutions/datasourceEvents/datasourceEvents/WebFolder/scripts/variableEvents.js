
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var variableSourceEvent = {};	// @dataSource
// @endregion// @endlock

// eventHandlers// @lock

	variableSourceEvent.onAttributeChange = function variableSourceEvent_onAttributeChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onAttributeChange').getValue();
		$$('textField_onAttributeChange').setValue(parseInt(result)+1);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("variableSource", "onAttributeChange", variableSourceEvent.onAttributeChange, "WAF");
// @endregion
};// @endlock
