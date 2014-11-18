
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var navigationView1 = {};	// @navigationView
// @endregion// @endlock

// eventHandlers// @lock

	navigationView1.touchmove = function navigationView1_touchmove (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onTouchMove').getValue())+1;
		$$('textField_onTouchMove').setValue(result);
	};// @lock

	navigationView1.mouseup = function navigationView1_mouseup (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onMouseUp').getValue())+1;
		$$('textField_onMouseUp').setValue(result);
	};// @lock

	navigationView1.mouseover = function navigationView1_mouseover (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onMouseOver').getValue())+1;
		$$('textField_onMouseOver').setValue(result);
	};// @lock

	navigationView1.mouseout = function navigationView1_mouseout (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onMouseOut').getValue())+1;
		$$('textField_onMouseOut').setValue(result);
	};// @lock

	navigationView1.mousedown = function navigationView1_mousedown (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onMouseDown').getValue())+1;
		$$('textField_onMouseDown').setValue(result);
	};// @lock

	navigationView1.dblclick = function navigationView1_dblclick (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onDblClick').getValue())+1;
		$$('textField_onDblClick').setValue(result);
	};// @lock

	navigationView1.click = function navigationView1_click (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onClick').getValue())+1;
		$$('textField_onClick').setValue(result);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("navigationView1", "touchmove", navigationView1.touchmove, "WAF");
	WAF.addListener("navigationView1", "mouseup", navigationView1.mouseup, "WAF");
	WAF.addListener("navigationView1", "mouseover", navigationView1.mouseover, "WAF");
	WAF.addListener("navigationView1", "mouseout", navigationView1.mouseout, "WAF");
	WAF.addListener("navigationView1", "mousedown", navigationView1.mousedown, "WAF");
	WAF.addListener("navigationView1", "dblclick", navigationView1.dblclick, "WAF");
	WAF.addListener("navigationView1", "click", navigationView1.click, "WAF");
// @endregion
};// @endlock
