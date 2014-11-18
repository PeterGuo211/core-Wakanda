
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var menuBar1 = {};	// @menuBar
	var menuItem1 = {};	// @menuItem
// @endregion// @endlock

// eventHandlers// @lock

	menuBar1.onmouseup = function menuBar1_onmouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'menuBar1_onmouseup'+' ');
	};// @lock

	menuBar1.mouseover = function menuBar1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'menuBar1_mouseover'+' ');
	};// @lock

	menuBar1.mouseout = function menuBar1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'menuBar1_mouseout'+' ');
	};// @lock

	menuBar1.mousemove = function menuBar1_mousemove (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'menuBar1_mousemove'+' ');
	};// @lock

	menuBar1.mousedown = function menuBar1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'menuBar1_mousedown'+' ');
	};// @lock

	menuBar1.click = function menuBar1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'menuBar1_click'+' ');
	};// @lock

	menuItem1.onmouseup = function menuItem1_onmouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'menuItem1_onmouseup'+' ');
	};// @lock

	menuItem1.mouseover = function menuItem1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'menuItem1_mouseover'+' ');
	};// @lock

	menuItem1.mouseout = function menuItem1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'menuItem1_mouseout'+' ');
	};// @lock

	menuItem1.mousemove = function menuItem1_mousemove (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'menuItem1_mousemove'+' ');
	};// @lock

	menuItem1.mousedown = function menuItem1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'menuItem1_mousedown'+' ');
	};// @lock

	menuItem1.click = function menuItem1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'menuItem1_click'+' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("menuBar1", "onmouseup", menuBar1.onmouseup, "WAF");
	WAF.addListener("menuBar1", "mouseover", menuBar1.mouseover, "WAF");
	WAF.addListener("menuBar1", "mouseout", menuBar1.mouseout, "WAF");
	WAF.addListener("menuBar1", "mousemove", menuBar1.mousemove, "WAF");
	WAF.addListener("menuBar1", "mousedown", menuBar1.mousedown, "WAF");
	WAF.addListener("menuBar1", "click", menuBar1.click, "WAF");
	WAF.addListener("menuItem1", "onmouseup", menuItem1.onmouseup, "WAF");
	WAF.addListener("menuItem1", "mouseover", menuItem1.mouseover, "WAF");
	WAF.addListener("menuItem1", "mouseout", menuItem1.mouseout, "WAF");
	WAF.addListener("menuItem1", "mousemove", menuItem1.mousemove, "WAF");
	WAF.addListener("menuItem1", "mousedown", menuItem1.mousedown, "WAF");
	WAF.addListener("menuItem1", "click", menuItem1.click, "WAF");
// @endregion
};// @endlock
