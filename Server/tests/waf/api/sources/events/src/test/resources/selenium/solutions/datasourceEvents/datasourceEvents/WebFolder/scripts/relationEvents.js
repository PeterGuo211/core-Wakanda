
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var empEvent = {};	// @dataSource
// @endregion// @endlock

// eventHandlers// @lock

	empEvent.oncompAttributeChange = function empEvent_oncompAttributeChange (event)// @startlock
	{// @endlock
		var result = $$('textField_oncompAttributeChange').getValue();
		$$('textField_oncompAttributeChange').setValue(parseInt(result)+1);
	};// @lock

	empEvent.onnameAttributeChange = function empEvent_onnameAttributeChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onnameAttributeChange').getValue();
		$$('textField_onnameAttributeChange').setValue(parseInt(result)+1);
	};// @lock

	empEvent.onIDAttributeChange = function empEvent_onIDAttributeChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onIDAttributeChange').getValue();
		$$('textField_onIDAttributeChange').setValue(parseInt(result)+1);
	};// @lock

	empEvent.onCollectionChange = function empEvent_onCollectionChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onCollectionChange').getValue();
		$$('textField_onCollectionChange').setValue(parseInt(result)+1);
	};// @lock

	empEvent.onElementSaved = function empEvent_onElementSaved (event)// @startlock
	{// @endlock
		var result = $$('textField_onElementSaved').getValue();
		$$('textField_onElementSaved').setValue(parseInt(result)+1);
	};// @lock

	empEvent.onCurrentElementChange = function empEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onCurrentElementChange').getValue();
		$$('textField_onCurrentElementChange').setValue(parseInt(result)+1);
	};// @lock

	empEvent.onBeforeCurrentElementChange = function empEvent_onBeforeCurrentElementChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onBeforeCurrentElementChange').getValue();
		$$('textField_onBeforeCurrentElementChange').setValue(parseInt(result)+1);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("emp", "oncompAttributeChange", empEvent.oncompAttributeChange, "WAF", "comp");
	WAF.addListener("emp", "onnameAttributeChange", empEvent.onnameAttributeChange, "WAF", "name");
	WAF.addListener("emp", "onIDAttributeChange", empEvent.onIDAttributeChange, "WAF", "ID");
	WAF.addListener("emp", "onCollectionChange", empEvent.onCollectionChange, "WAF");
	WAF.addListener("emp", "onElementSaved", empEvent.onElementSaved, "WAF");
	WAF.addListener("emp", "onCurrentElementChange", empEvent.onCurrentElementChange, "WAF");
	WAF.addListener("emp", "onBeforeCurrentElementChange", empEvent.onBeforeCurrentElementChange, "WAF");
// @endregion
};// @endlock
