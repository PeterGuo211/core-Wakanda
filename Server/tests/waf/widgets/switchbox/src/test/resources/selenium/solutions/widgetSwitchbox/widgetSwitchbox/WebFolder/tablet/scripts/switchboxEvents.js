
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var switchbox1 = {};	// @switchbox
// @endregion// @endlock

// eventHandlers// @lock

	switchbox1.touchcancel = function switchbox1_touchcancel (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onTouchCancel').getValue())+1;
	    $$('textField_onTouchCancel').setValue(result);
	};// @lock

	switchbox1.touchend = function switchbox1_touchend (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onTouchEnd').getValue())+1;
	    $$('textField_onTouchEnd').setValue(result);
	};// @lock

	switchbox1.touchmove = function switchbox1_touchmove (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onTouchMove').getValue())+1;
	    $$('textField_onTouchMove').setValue(result);
	};// @lock

	switchbox1.touchstart = function switchbox1_touchstart (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onTouchStart').getValue())+1;
	    $$('textField_onTouchStart').setValue(result);
	};// @lock

	switchbox1.mouseup = function switchbox1_mouseup (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onMouseUp').getValue())+1;
	    $$('textField_onMouseUp').setValue(result);
	};// @lock

	switchbox1.mouseover = function switchbox1_mouseover (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onMouseOver').getValue())+1;
	    $$('textField_onMouseOver').setValue(result);
	};// @lock

	switchbox1.mouseout = function switchbox1_mouseout (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onMouseOut').getValue())+1;
	    $$('textField_onMouseOut').setValue(result);
	};// @lock

	switchbox1.mousemove = function switchbox1_mousemove (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onMouseMove').getValue())+1;
	    $$('textField_onMouseMove').setValue(result);
	};// @lock

	switchbox1.mousedown = function switchbox1_mousedown (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onMouseDown').getValue())+1;
	    $$('textField_onMouseDown').setValue(result);
	};// @lock

	switchbox1.click = function switchbox1_click (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onClick').getValue())+1;
	    $$('textField_onClick').setValue(result);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("switchbox1", "touchcancel", switchbox1.touchcancel, "WAF");
	WAF.addListener("switchbox1", "touchend", switchbox1.touchend, "WAF");
	WAF.addListener("switchbox1", "touchmove", switchbox1.touchmove, "WAF");
	WAF.addListener("switchbox1", "touchstart", switchbox1.touchstart, "WAF");
	WAF.addListener("switchbox1", "mouseup", switchbox1.mouseup, "WAF");
	WAF.addListener("switchbox1", "mouseover", switchbox1.mouseover, "WAF");
	WAF.addListener("switchbox1", "mouseout", switchbox1.mouseout, "WAF");
	WAF.addListener("switchbox1", "mousemove", switchbox1.mousemove, "WAF");
	WAF.addListener("switchbox1", "mousedown", switchbox1.mousedown, "WAF");
	WAF.addListener("switchbox1", "click", switchbox1.click, "WAF");
// @endregion
};// @endlock
