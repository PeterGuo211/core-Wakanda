
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var dialog1 = {};	// @dialog
	var button5 = {};	// @button
	var button4 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	dialog1.mouseup = function dialog1_mouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText2').getValue();
		$$('richText2').setValue(stack + 'mouseup' + ' ');
	};// @lock

	dialog1.mouseover = function dialog1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText2').getValue();
		$$('richText2').setValue(stack + 'mouseover' + ' ');
	};// @lock

	dialog1.mouseout = function dialog1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText2').getValue();
		$$('richText2').setValue(stack + 'mouseout' + ' ');
	};// @lock

	dialog1.mousedown = function dialog1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText2').getValue();
		$$('richText2').setValue(stack + 'mousedown' + ' ');
	};// @lock

	dialog1.dblclick = function dialog1_dblclick (event)// @startlock
	{// @endlock
		var stack = $$('richText2').getValue();
		$$('richText2').setValue(stack + 'dblclick' + ' ');
	};// @lock

	dialog1.click = function dialog1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText2').getValue();
		$$('richText2').setValue(stack + 'click' + ' ');
	};// @lock

	button5.click = function button5_click (event)// @startlock
	{// @endlock
		$$('dialog1').closeDialog(); //cancel button
	};// @lock

	button4.click = function button4_click (event)// @startlock
	{// @endlock
		$$('dialog1').closeDialog(); //ok button
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("dialog1", "mouseup", dialog1.mouseup, "WAF");
	WAF.addListener("dialog1", "mouseover", dialog1.mouseover, "WAF");
	WAF.addListener("dialog1", "mouseout", dialog1.mouseout, "WAF");
	WAF.addListener("dialog1", "mousedown", dialog1.mousedown, "WAF");
	WAF.addListener("dialog1", "dblclick", dialog1.dblclick, "WAF");
	WAF.addListener("dialog1", "click", dialog1.click, "WAF");
	WAF.addListener("button5", "click", button5.click, "WAF");
	WAF.addListener("button4", "click", button4.click, "WAF");
// @endregion
};// @endlock
