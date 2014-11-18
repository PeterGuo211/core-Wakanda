
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var radioGroup1 = {};	// @radioGroup
// @endregion// @endlock

// eventHandlers// @lock

	radioGroup1.focus = function radioGroup1_focus (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onFocus').getValue())+1;
		$$('textField_onFocus').setValue(result);
	};// @lock

	radioGroup1.blur = function radioGroup1_blur (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onBlur').getValue())+1;
		$$('textField_onBlur').setValue(result);
	};// @lock

	radioGroup1.onmouseup = function radioGroup1_onmouseup (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onMouseUp').getValue())+1;
		$$('textField_onMouseUp').setValue(result);
	};// @lock

	radioGroup1.mouseover = function radioGroup1_mouseover (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onMouseOver').getValue())+1;
		$$('textField_onMouseOver').setValue(result);
	};// @lock

	radioGroup1.mouseout = function radioGroup1_mouseout (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onMouseOut').getValue())+1;
		$$('textField_onMouseOut').setValue(result);
	};// @lock

	radioGroup1.mousemove = function radioGroup1_mousemove (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onMouseMove').getValue())+1;
		$$('textField_onMouseMove').setValue(result);
	};// @lock

	radioGroup1.mousedown = function radioGroup1_mousedown (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onMouseDown').getValue())+1;
		$$('textField_onMouseDown').setValue(result);
	};// @lock

	radioGroup1.click = function radioGroup1_click (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onClick').getValue())+1;
		$$('textField_onClick').setValue(result);
	};// @lock

	radioGroup1.change = function radioGroup1_change (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onChange').getValue())+1;
		$$('textField_onChange').setValue(result);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("radioGroup1", "focus", radioGroup1.focus, "WAF");
	WAF.addListener("radioGroup1", "blur", radioGroup1.blur, "WAF");
	WAF.addListener("radioGroup1", "onmouseup", radioGroup1.onmouseup, "WAF");
	WAF.addListener("radioGroup1", "mouseover", radioGroup1.mouseover, "WAF");
	WAF.addListener("radioGroup1", "mouseout", radioGroup1.mouseout, "WAF");
	WAF.addListener("radioGroup1", "mousemove", radioGroup1.mousemove, "WAF");
	WAF.addListener("radioGroup1", "mousedown", radioGroup1.mousedown, "WAF");
	WAF.addListener("radioGroup1", "click", radioGroup1.click, "WAF");
	WAF.addListener("radioGroup1", "change", radioGroup1.change, "WAF");
// @endregion
};// @endlock
