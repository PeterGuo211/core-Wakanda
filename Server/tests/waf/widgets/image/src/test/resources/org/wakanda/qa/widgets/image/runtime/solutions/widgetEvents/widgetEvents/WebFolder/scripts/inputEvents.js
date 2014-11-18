
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var textField1 = {};	// @textField
// @endregion// @endlock

// eventHandlers// @lock

	textField1.select = function textField1_select (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'select' + ' ');
	};// @lock

	textField1.keyup = function textField1_keyup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'keyup' + ' ');
	};// @lock

	textField1.keydown = function textField1_keydown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'keydown' + ' ');
	};// @lock

	textField1.mouseup = function textField1_mouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseup' + ' ');
	};// @lock

	textField1.mouseover = function textField1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseover' + ' ');
	};// @lock

	textField1.mouseout = function textField1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseout' + ' ');
	};// @lock

	textField1.mousemove = function textField1_mousemove (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousemove' + ' ');
	};// @lock

	textField1.mousedown = function textField1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousedown' + ' ');
	};// @lock

	textField1.dblclick = function textField1_dblclick (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'dblclick' + ' ');
	};// @lock

	textField1.click = function textField1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'click' + ' ');
	};// @lock

	textField1.focus = function textField1_focus (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'focus' + ' ');
	};// @lock

	textField1.change = function textField1_change (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'change' + ' ');
	};// @lock

	textField1.blur = function textField1_blur (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'blur' + ' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("textField1", "select", textField1.select, "WAF");
	WAF.addListener("textField1", "keyup", textField1.keyup, "WAF");
	WAF.addListener("textField1", "keydown", textField1.keydown, "WAF");
	WAF.addListener("textField1", "mouseup", textField1.mouseup, "WAF");
	WAF.addListener("textField1", "mouseover", textField1.mouseover, "WAF");
	WAF.addListener("textField1", "mouseout", textField1.mouseout, "WAF");
	WAF.addListener("textField1", "mousemove", textField1.mousemove, "WAF");
	WAF.addListener("textField1", "mousedown", textField1.mousedown, "WAF");
	WAF.addListener("textField1", "dblclick", textField1.dblclick, "WAF");
	WAF.addListener("textField1", "click", textField1.click, "WAF");
	WAF.addListener("textField1", "focus", textField1.focus, "WAF");
	WAF.addListener("textField1", "change", textField1.change, "WAF");
	WAF.addListener("textField1", "blur", textField1.blur, "WAF");
// @endregion
};// @endlock
