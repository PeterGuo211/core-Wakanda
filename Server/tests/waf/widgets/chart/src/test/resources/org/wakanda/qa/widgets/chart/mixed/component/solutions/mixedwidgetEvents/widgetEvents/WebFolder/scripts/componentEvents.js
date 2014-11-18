
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var component1 = {};	// @component
// @endregion// @endlock

// eventHandlers// @lock

	component1.mouseup = function component1_mouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseup' + ' ');
	};// @lock

	component1.mouseover = function component1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseover' + ' ');
	};// @lock

	component1.mouseout = function component1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseout' + ' ');
	};// @lock

	component1.mousedown = function component1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousedown' + ' ');
	};// @lock

	component1.dblclick = function component1_dblclick (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'dblclick' + ' ');
	};// @lock

	component1.click = function component1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'click' + ' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("component1", "mouseup", component1.mouseup, "WAF");
	WAF.addListener("component1", "mouseover", component1.mouseover, "WAF");
	WAF.addListener("component1", "mouseout", component1.mouseout, "WAF");
	WAF.addListener("component1", "mousedown", component1.mousedown, "WAF");
	WAF.addListener("component1", "dblclick", component1.dblclick, "WAF");
	WAF.addListener("component1", "click", component1.click, "WAF");
// @endregion
};// @endlock
