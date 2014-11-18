
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var chart1-container = {};	// @container
// @endregion// @endlock

// eventHandlers// @lock

	chart1-container.stopResize = function chart1-container_stopResize (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'stopResize' + ' ');
	};// @lock

	chart1-container.onResize = function chart1-container_onResize (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'onResize' + ' ');
	};// @lock

	chart1-container.startResize = function chart1-container_startResize (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'startResize' + ' ');
	};// @lock

	chart1-container.mouseup = function chart1-container_mouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseup' + ' ');
	};// @lock

	chart1-container.mouseover = function chart1-container_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseover' + ' ');
	};// @lock

	chart1-container.mouseout = function chart1-container_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseout' + ' ');
	};// @lock

	chart1-container.mousedown = function chart1-container_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousedown' + ' ');
	};// @lock

	chart1-container.dblclick = function chart1-container_dblclick (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'dblclick' + ' ');
	};// @lock

	chart1-container.click = function chart1-container_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'click' + ' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("chart1-container", "stopResize", chart1-container.stopResize, "WAF");
	WAF.addListener("chart1-container", "onResize", chart1-container.onResize, "WAF");
	WAF.addListener("chart1-container", "startResize", chart1-container.startResize, "WAF");
	WAF.addListener("chart1-container", "mouseup", chart1-container.mouseup, "WAF");
	WAF.addListener("chart1-container", "mouseover", chart1-container.mouseover, "WAF");
	WAF.addListener("chart1-container", "mouseout", chart1-container.mouseout, "WAF");
	WAF.addListener("chart1-container", "mousedown", chart1-container.mousedown, "WAF");
	WAF.addListener("chart1-container", "dblclick", chart1-container.dblclick, "WAF");
	WAF.addListener("chart1-container", "click", chart1-container.click, "WAF");
// @endregion
};// @endlock
