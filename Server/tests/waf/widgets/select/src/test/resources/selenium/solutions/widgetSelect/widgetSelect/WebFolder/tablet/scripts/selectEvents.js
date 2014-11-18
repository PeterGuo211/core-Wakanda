
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var select1 = {};	// @select
// @endregion// @endlock

// eventHandlers// @lock

	select1.touchcancel = function select1_touchcancel (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onTouchCancel').getValue())+1;
	    $$('textField_onTouchCancel').setValue(result);
	};// @lock

	select1.touchend = function select1_touchend (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onTouchEnd').getValue())+1;
	    $$('textField_onTouchEnd').setValue(result);
	};// @lock

	select1.touchstart = function select1_touchstart (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onTouchStart').getValue())+1;
	    $$('textField_onTouchStart').setValue(result);
	};// @lock

	select1.onmouseup = function select1_onmouseup (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onMouseUp').getValue())+1;
	    $$('textField_onMouseUp').setValue(result);
	};// @lock

	select1.mouseover = function select1_mouseover (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onMouseOver').getValue())+1;
	    $$('textField_onMouseOver').setValue(result);
	};// @lock

	select1.mouseout = function select1_mouseout (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onMouseOut').getValue())+1;
	    $$('textField_onMouseOut').setValue(result);
	};// @lock

	select1.mousemove = function select1_mousemove (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onMouseMove').getValue())+1;
	    $$('textField_onMouseMove').setValue(result);
	};// @lock

	select1.mousedown = function select1_mousedown (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onMouseDown').getValue())+1;
	    $$('textField_onMouseDown').setValue(result);
	};// @lock

	select1.click = function select1_click (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onClick').getValue())+1;
	    $$('textField_onClick').setValue(result);
	};// @lock

	select1.focus = function select1_focus (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onFocus').getValue())+1;
	    $$('textField_onFocus').setValue(result);
	};// @lock

	select1.change = function select1_change (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onChange').getValue())+1;
	    $$('textField_onChange').setValue(result);
	};// @lock

	select1.blur = function select1_blur (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onBlur').getValue())+1;
	    $$('textField_onBlur').setValue(result);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("select1", "touchcancel", select1.touchcancel, "WAF");
	WAF.addListener("select1", "touchend", select1.touchend, "WAF");
	WAF.addListener("select1", "touchstart", select1.touchstart, "WAF");
	WAF.addListener("select1", "onmouseup", select1.onmouseup, "WAF");
	WAF.addListener("select1", "mouseover", select1.mouseover, "WAF");
	WAF.addListener("select1", "mouseout", select1.mouseout, "WAF");
	WAF.addListener("select1", "mousemove", select1.mousemove, "WAF");
	WAF.addListener("select1", "mousedown", select1.mousedown, "WAF");
	WAF.addListener("select1", "click", select1.click, "WAF");
	WAF.addListener("select1", "focus", select1.focus, "WAF");
	WAF.addListener("select1", "change", select1.change, "WAF");
	WAF.addListener("select1", "blur", select1.blur, "WAF");
// @endregion
};// @endlock
