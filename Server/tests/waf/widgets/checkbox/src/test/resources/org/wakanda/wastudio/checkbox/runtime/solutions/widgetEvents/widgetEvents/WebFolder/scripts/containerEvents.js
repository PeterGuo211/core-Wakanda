
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
// @endregion// @endlock

// eventHandlers// @lock

	container1.stopResize = function container1_stopResize (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'stopResize' + ' ');
	};// @lock

	container1.onResize = function container1_onResize (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'onResize' + ' ');
	};// @lock

	container1.startResize = function container1_startResize (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'startResize' + ' ');
	};// @lock

	container1.mouseup = function container1_mouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseup' + ' ');
	};// @lock

	container1.mouseover = function container1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseover' + ' ');
	};// @lock

	container1.mouseout = function container1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseout' + ' ');
	};// @lock

	container1.mousedown = function container1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousedown' + ' ');
	};// @lock

	container1.dblclick = function container1_dblclick (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'dblclick' + ' ');
	};// @lock

	container1.click = function container1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'click' + ' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("container1", "stopResize", container1.stopResize, "WAF");
	WAF.addListener("container1", "onResize", container1.onResize, "WAF");
	WAF.addListener("container1", "startResize", container1.startResize, "WAF");
	WAF.addListener("container1", "mouseup", container1.mouseup, "WAF");
	WAF.addListener("container1", "mouseover", container1.mouseover, "WAF");
	WAF.addListener("container1", "mouseout", container1.mouseout, "WAF");
	WAF.addListener("container1", "mousedown", container1.mousedown, "WAF");
	WAF.addListener("container1", "dblclick", container1.dblclick, "WAF");
	WAF.addListener("container1", "click", container1.click, "WAF");
// @endregion
};// @endlock
