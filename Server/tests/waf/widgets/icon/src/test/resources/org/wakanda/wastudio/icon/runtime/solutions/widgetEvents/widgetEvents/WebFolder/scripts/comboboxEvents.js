
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var combobox1 = {};	// @combobox
// @endregion// @endlock

// eventHandlers// @lock

	combobox1.onmouseup = function combobox1_onmouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'onmouseup' + ' ');
	};// @lock

	combobox1.mouseover = function combobox1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseover' + ' ');
	};// @lock

	combobox1.mouseout = function combobox1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseout' + ' ');
	};// @lock

	combobox1.mousemove = function combobox1_mousemove (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousemove' + ' ');
	};// @lock

	combobox1.mousedown = function combobox1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousedown' + ' ');
	};// @lock

	combobox1.click = function combobox1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'click' + ' ');
	};// @lock

	combobox1.focus = function combobox1_focus (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'focus' + ' ');
	};// @lock

	combobox1.change = function combobox1_change (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'change' + ' ');
	};// @lock

	combobox1.blur = function combobox1_blur (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'blur' + ' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("combobox1", "onmouseup", combobox1.onmouseup, "WAF");
	WAF.addListener("combobox1", "mouseover", combobox1.mouseover, "WAF");
	WAF.addListener("combobox1", "mouseout", combobox1.mouseout, "WAF");
	WAF.addListener("combobox1", "mousemove", combobox1.mousemove, "WAF");
	WAF.addListener("combobox1", "mousedown", combobox1.mousedown, "WAF");
	WAF.addListener("combobox1", "click", combobox1.click, "WAF");
	WAF.addListener("combobox1", "focus", combobox1.focus, "WAF");
	WAF.addListener("combobox1", "change", combobox1.change, "WAF");
	WAF.addListener("combobox1", "blur", combobox1.blur, "WAF");
// @endregion
};// @endlock
