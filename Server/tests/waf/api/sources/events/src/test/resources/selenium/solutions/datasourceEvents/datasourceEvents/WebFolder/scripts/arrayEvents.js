
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var arraySourceEvent = {};	// @dataSource
// @endregion// @endlock

// eventHandlers// @lock

	arraySourceEvent.onnameAttributeChange = function arraySourceEvent_onnameAttributeChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onnameAttributeChange').getValue();
		$$('textField_onnameAttributeChange').setValue(parseInt(result)+1);
	};// @lock

	arraySourceEvent.onIDAttributeChange = function arraySourceEvent_onIDAttributeChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onIDAttributeChange').getValue();
		$$('textField_onIDAttributeChange').setValue(parseInt(result)+1);
	};// @lock

	arraySourceEvent.onCollectionChange = function arraySourceEvent_onCollectionChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onCollectionChange').getValue();
		$$('textField_onCollectionChange').setValue(parseInt(result)+1);
	};// @lock

	arraySourceEvent.onCurrentElementChange = function arraySourceEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onCurrentElementChange').getValue();
		$$('textField_onCurrentElementChange').setValue(parseInt(result)+1);
	};// @lock

	arraySourceEvent.onBeforeCurrentElementChange = function arraySourceEvent_onBeforeCurrentElementChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onBeforeCurrentElementChange').getValue();
		$$('textField_onBeforeCurrentElementChange').setValue(parseInt(result)+1);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("arraySource", "onnameAttributeChange", arraySourceEvent.onnameAttributeChange, "WAF", "name");
	WAF.addListener("arraySource", "onIDAttributeChange", arraySourceEvent.onIDAttributeChange, "WAF", "ID");
	WAF.addListener("arraySource", "onCollectionChange", arraySourceEvent.onCollectionChange, "WAF");
	WAF.addListener("arraySource", "onCurrentElementChange", arraySourceEvent.onCurrentElementChange, "WAF");
	WAF.addListener("arraySource", "onBeforeCurrentElementChange", arraySourceEvent.onBeforeCurrentElementChange, "WAF");
// @endregion
};// @endlock
