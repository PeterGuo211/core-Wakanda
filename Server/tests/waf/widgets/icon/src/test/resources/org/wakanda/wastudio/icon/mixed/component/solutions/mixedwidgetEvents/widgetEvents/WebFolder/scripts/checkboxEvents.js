
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var checkbox1 = {};	// @checkbox
// @endregion// @endlock

// eventHandlers// @lock

	checkbox1.mouseup = function checkbox1_mouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseup' + ' ');
	};// @lock

	checkbox1.mouseover = function checkbox1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseover' + ' ');
	};// @lock

	checkbox1.mouseout = function checkbox1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseout' + ' ');
	};// @lock

	checkbox1.mousemove = function checkbox1_mousemove (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousemove' + ' ');
	};// @lock

	checkbox1.mousedown = function checkbox1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousedown' + ' ');
	};// @lock

	checkbox1.click = function checkbox1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'click' + ' ');
	};// @lock

	checkbox1.change = function checkbox1_change (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'change' + ' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("checkbox1", "mouseup", checkbox1.mouseup, "WAF");
	WAF.addListener("checkbox1", "mouseover", checkbox1.mouseover, "WAF");
	WAF.addListener("checkbox1", "mouseout", checkbox1.mouseout, "WAF");
	WAF.addListener("checkbox1", "mousemove", checkbox1.mousemove, "WAF");
	WAF.addListener("checkbox1", "mousedown", checkbox1.mousedown, "WAF");
	WAF.addListener("checkbox1", "click", checkbox1.click, "WAF");
	WAF.addListener("checkbox1", "change", checkbox1.change, "WAF");
// @endregion
};// @endlock
