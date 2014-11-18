
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var objectSourceEvent = {};	// @dataSource
// @endregion// @endlock

// eventHandlers// @lock

	objectSourceEvent.onnameAttributeChange = function objectSourceEvent_onnameAttributeChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onnameAttributeChange').getValue();
		$$('textField_onnameAttributeChange').setValue(parseInt(result)+1);
	};// @lock

	objectSourceEvent.onIDAttributeChange = function objectSourceEvent_onIDAttributeChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onIDAttributeChange').getValue();
		$$('textField_onIDAttributeChange').setValue(parseInt(result)+1);
	};// @lock

	objectSourceEvent.onCurrentElementChange = function objectSourceEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onCurrentElementChange').getValue();
		$$('textField_onCurrentElementChange').setValue(parseInt(result)+1);
	};// @lock

	objectSourceEvent.onBeforeCurrentElementChange = function objectSourceEvent_onBeforeCurrentElementChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onBeforeCurrentElementChange').getValue();
		$$('textField_onBeforeCurrentElementChange').setValue(parseInt(result)+1);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("objectSource", "onnameAttributeChange", objectSourceEvent.onnameAttributeChange, "WAF", "name");
	WAF.addListener("objectSource", "onIDAttributeChange", objectSourceEvent.onIDAttributeChange, "WAF", "ID");
	WAF.addListener("objectSource", "onCurrentElementChange", objectSourceEvent.onCurrentElementChange, "WAF");
	WAF.addListener("objectSource", "onBeforeCurrentElementChange", objectSourceEvent.onBeforeCurrentElementChange, "WAF");
// @endregion
};// @endlock
