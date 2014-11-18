
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var section1 = {};	// @section
// @endregion// @endlock

// eventHandlers// @lock

	section1.touchcancel = function section1_touchcancel (event)// @startlock
	{// @endlock
		var result = parseInt($$('onTouchCancel').getValue())+1;
		$$('onTouchCancel').setValue(result);
	};// @lock

	section1.touchmove = function section1_touchmove (event)// @startlock
	{// @endlock
		var result = parseInt($$('onTouchMove').getValue())+1;
		$$('onTouchMove').setValue(result);
	};// @lock

	section1.touchend = function section1_touchend (event)// @startlock
	{// @endlock
		var result = parseInt($$('onTouchEnd').getValue())+1;
		$$('onTouchEnd').setValue(result);
	};// @lock

	section1.touchstart = function section1_touchstart (event)// @startlock
	{// @endlock
		var result = parseInt($$('onTouchStart').getValue())+1;
		$$('onTouchStart').setValue(result);
	};// @lock

	section1.mouseup = function section1_mouseup (event)// @startlock
	{// @endlock
		var result = parseInt($$('onMouseUp').getValue())+1;
		$$('onMouseUp').setValue(result);
	};// @lock

	section1.mouseover = function section1_mouseover (event)// @startlock
	{// @endlock
		var result = parseInt($$('onMouseOver').getValue())+1;
		$$('onMouseOver').setValue(result);
	};// @lock

	section1.mouseout = function section1_mouseout (event)// @startlock
	{// @endlock
		var result = parseInt($$('onMouseOut').getValue())+1;
		$$('onMouseOut').setValue(result);
	};// @lock

	section1.mousedown = function section1_mousedown (event)// @startlock
	{// @endlock
		var result = parseInt($$('onMouseDown').getValue())+1;
		$$('onMouseDown').setValue(result);
	};// @lock

	section1.dblclick = function section1_dblclick (event)// @startlock
	{// @endlock
		var result = parseInt($$('onDblClick').getValue())+1;
		$$('onDblClick').setValue(result);
	};// @lock

	section1.click = function section1_click (event)// @startlock
	{// @endlock
		var result = parseInt($$('onClick').getValue())+1;
		$$('onClick').setValue(result);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("section1", "touchcancel", section1.touchcancel, "WAF");
	WAF.addListener("section1", "touchmove", section1.touchmove, "WAF");
	WAF.addListener("section1", "touchend", section1.touchend, "WAF");
	WAF.addListener("section1", "touchstart", section1.touchstart, "WAF");
	WAF.addListener("section1", "mouseup", section1.mouseup, "WAF");
	WAF.addListener("section1", "mouseover", section1.mouseover, "WAF");
	WAF.addListener("section1", "mouseout", section1.mouseout, "WAF");
	WAF.addListener("section1", "mousedown", section1.mousedown, "WAF");
	WAF.addListener("section1", "dblclick", section1.dblclick, "WAF");
	WAF.addListener("section1", "click", section1.click, "WAF");
// @endregion
};// @endlock
