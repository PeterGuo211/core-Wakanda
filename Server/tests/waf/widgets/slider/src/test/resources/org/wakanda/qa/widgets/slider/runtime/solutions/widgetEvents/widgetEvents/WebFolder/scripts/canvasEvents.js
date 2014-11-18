
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var canvas1 = {};	// @canvas
// @endregion// @endlock

// eventHandlers// @lock

	canvas1.mouseup = function canvas1_mouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseup' + ' ');
	};// @lock

	canvas1.mouseover = function canvas1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseover' + ' ');
	};// @lock

	canvas1.mouseout = function canvas1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseout' + ' ');
	};// @lock

	canvas1.mousemove = function canvas1_mousemove (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousemove' + ' ');
	};// @lock

	canvas1.mousedown = function canvas1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousedown' + ' ');
	};// @lock

	canvas1.dblclick = function canvas1_dblclick (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'dblclick' + ' ');
	};// @lock

	canvas1.click = function canvas1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'click' + ' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("canvas1", "mouseup", canvas1.mouseup, "WAF");
	WAF.addListener("canvas1", "mouseover", canvas1.mouseover, "WAF");
	WAF.addListener("canvas1", "mouseout", canvas1.mouseout, "WAF");
	WAF.addListener("canvas1", "mousemove", canvas1.mousemove, "WAF");
	WAF.addListener("canvas1", "mousedown", canvas1.mousedown, "WAF");
	WAF.addListener("canvas1", "dblclick", canvas1.dblclick, "WAF");
	WAF.addListener("canvas1", "click", canvas1.click, "WAF");
// @endregion
};// @endlock
