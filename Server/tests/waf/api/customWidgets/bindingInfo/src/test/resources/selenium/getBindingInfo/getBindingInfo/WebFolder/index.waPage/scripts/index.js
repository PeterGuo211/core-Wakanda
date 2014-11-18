
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var bindDatasource_enum = {};	// @button
	var bindDatasource_bool = {};	// @button
	var bindDatasource_integer = {};	// @button
	var bindDatasource_string = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	bindDatasource_enum.click = function bindDatasource_enum_click (event)// @startlock
	{// @endlock
		$$('test1').enumProp.bindDatasource("dataClass1.name");
	};// @lock

	bindDatasource_bool.click = function bindDatasource_bool_click (event)// @startlock
	{// @endlock
		$$('test1').boolProp.bindDatasource("dataClass1.ok");
	};// @lock

	bindDatasource_integer.click = function bindDatasource_integer_click (event)// @startlock
	{// @endlock
		$$('test1').integerProp.bindDatasource("dataClass1.age");
	};// @lock

	bindDatasource_string.click = function bindDatasource_string_click (event)// @startlock
	{// @endlock
		$$('test1').stringProp.bindDatasource("dataClass1.name");
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("bindDatasource_enum", "click", bindDatasource_enum.click, "WAF");
	WAF.addListener("bindDatasource_bool", "click", bindDatasource_bool.click, "WAF");
	WAF.addListener("bindDatasource_integer", "click", bindDatasource_integer.click, "WAF");
	WAF.addListener("bindDatasource_string", "click", bindDatasource_string.click, "WAF");
// @endregion
};// @endlock
