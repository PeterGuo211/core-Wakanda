
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	button1.touchcancel = function button1_touchcancel (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'touchcancel' + ' ');
	};// @lock

	button1.touchend = function button1_touchend (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'touchend' + ' ');
	};// @lock

	button1.touchstart = function button1_touchstart (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'touchstart' + ' ');
	};// @lock

	button1.mouseup = function button1_mouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseup' + ' ');
	};// @lock

	button1.mouseover = function button1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseover' + ' ');
	};// @lock

	button1.mouseout = function button1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseout' + ' ');
	};// @lock

	button1.mousedown = function button1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousedown' + ' ');
	};// @lock

	button1.dblclick = function button1_dblclick (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'dblclick' + ' ');
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'click' + ' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button1", "touchcancel", button1.touchcancel, "WAF");
	WAF.addListener("button1", "touchend", button1.touchend, "WAF");
	WAF.addListener("button1", "touchstart", button1.touchstart, "WAF");
	WAF.addListener("button1", "mouseup", button1.mouseup, "WAF");
	WAF.addListener("button1", "mouseover", button1.mouseover, "WAF");
	WAF.addListener("button1", "mouseout", button1.mouseout, "WAF");
	WAF.addListener("button1", "mousedown", button1.mousedown, "WAF");
	WAF.addListener("button1", "dblclick", button1.dblclick, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
// @endregion
};// @endlock
