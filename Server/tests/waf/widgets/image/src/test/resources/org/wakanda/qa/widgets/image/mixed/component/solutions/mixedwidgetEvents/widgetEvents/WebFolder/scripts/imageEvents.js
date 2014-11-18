
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var image1 = {};	// @image
// @endregion// @endlock

// eventHandlers// @lock

	image1.mouseup = function image1_mouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseup' + ' ');
	};// @lock

	image1.mouseover = function image1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseover' + ' ');
	};// @lock

	image1.mouseout = function image1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseout' + ' ');
	};// @lock

	image1.mousemove = function image1_mousemove (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousemove' + ' ');
	};// @lock

	image1.mousedown = function image1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousedown' + ' ');
	};// @lock

	image1.dblclick = function image1_dblclick (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'dblclick' + ' ');
	};// @lock

	image1.click = function image1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'click' + ' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("image1", "mouseup", image1.mouseup, "WAF");
	WAF.addListener("image1", "mouseover", image1.mouseover, "WAF");
	WAF.addListener("image1", "mouseout", image1.mouseout, "WAF");
	WAF.addListener("image1", "mousemove", image1.mousemove, "WAF");
	WAF.addListener("image1", "mousedown", image1.mousedown, "WAF");
	WAF.addListener("image1", "dblclick", image1.dblclick, "WAF");
	WAF.addListener("image1", "click", image1.click, "WAF");
// @endregion
};// @endlock
