
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var companiesEvent = {};	// @dataSource
// @endregion// @endlock

// eventHandlers// @lock

	companiesEvent.onempAttributeChange = function companiesEvent_onempAttributeChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onempAttributeChange').getValue();
		$$('textField_onempAttributeChange').setValue(parseInt(result)+1);
	};// @lock

	companiesEvent.onnameAttributeChange = function companiesEvent_onnameAttributeChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onnameAttributeChange').getValue();
		$$('textField_onnameAttributeChange').setValue(parseInt(result)+1);
	};// @lock

	companiesEvent.onIDAttributeChange = function companiesEvent_onIDAttributeChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onIDAttributeChange').getValue();
		$$('textField_onIDAttributeChange').setValue(parseInt(result)+1);
	};// @lock

	companiesEvent.onCollectionChange = function companiesEvent_onCollectionChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onCollectionChange').getValue();
		$$('textField_onCollectionChange').setValue(parseInt(result)+1);
	};// @lock

	companiesEvent.onElementSaved = function companiesEvent_onElementSaved (event)// @startlock
	{// @endlock
		var result = $$('textField_onElementSaved').getValue();
		$$('textField_onElementSaved').setValue(parseInt(result)+1);
	};// @lock

	companiesEvent.onCurrentElementChange = function companiesEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onCurrentElementChange').getValue();
		$$('textField_onCurrentElementChange').setValue(parseInt(result)+1);
	};// @lock

	companiesEvent.onBeforeCurrentElementChange = function companiesEvent_onBeforeCurrentElementChange (event)// @startlock
	{// @endlock
		var result = $$('textField_onBeforeCurrentElementChange').getValue();
		$$('textField_onBeforeCurrentElementChange').setValue(parseInt(result)+1);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("companies", "onempAttributeChange", companiesEvent.onempAttributeChange, "WAF", "emp");
	WAF.addListener("companies", "onnameAttributeChange", companiesEvent.onnameAttributeChange, "WAF", "name");
	WAF.addListener("companies", "onIDAttributeChange", companiesEvent.onIDAttributeChange, "WAF", "ID");
	WAF.addListener("companies", "onCollectionChange", companiesEvent.onCollectionChange, "WAF");
	WAF.addListener("companies", "onElementSaved", companiesEvent.onElementSaved, "WAF");
	WAF.addListener("companies", "onCurrentElementChange", companiesEvent.onCurrentElementChange, "WAF");
	WAF.addListener("companies", "onBeforeCurrentElementChange", companiesEvent.onBeforeCurrentElementChange, "WAF");
// @endregion
};// @endlock
