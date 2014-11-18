
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var getNode = {};	// @button
	var disabled = {};	// @button
	var enable = {};	// @button
	var test1 = {};	// @Test
	var disable = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	getNode.click = function getNode_click (event)// @startlock
	{// @endlock
		var node = $$('test1').getNode();
		var expectedNode = $('#test1').get(0);
		
		var result = (node == expectedNode) ? "success" : "error";
		
		$$('richText1').setValue( result );
	};// @lock

	disabled.click = function disabled_click (event)// @startlock
	{// @endlock
		$$("test1").disable();
		var result = $$("test1").disabled() ? "disabled" : "enabled";
		
		$$('richText1').setValue( result );
	};// @lock

	enable.click = function enable_click (event)// @startlock
	{// @endlock
		$$("test1").disable();
		$$("test1").enable();
		var className = $('#test1').attr('class');
		
		var result = className == "waf-widget waf-test" ? "success" : "error";
		
		$$('richText1').setValue( result );
	};// @lock

	test1.click = function test1_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue("onClick");
	};// @lock

	disable.click = function disable_click (event)// @startlock
	{// @endlock
		$$("test1").disable();
		var className = $('#test1').attr('class');
		
		var result = className == "waf-widget waf-test waf-state-disabled" ? "success" : "error";
		
		$$('richText1').setValue( result );

	};// @lock
	
	

// @region eventManager// @startlock
	WAF.addListener("getNode", "click", getNode.click, "WAF");
	WAF.addListener("disabled", "click", disabled.click, "WAF");
	WAF.addListener("enable", "click", enable.click, "WAF");
	WAF.addListener("test1", "click", test1.click, "WAF");
	WAF.addListener("disable", "click", disable.click, "WAF");
// @endregion
};// @endlock
