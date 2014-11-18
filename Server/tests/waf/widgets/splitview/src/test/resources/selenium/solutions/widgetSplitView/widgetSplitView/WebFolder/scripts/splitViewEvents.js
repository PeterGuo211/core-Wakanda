
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var splitView1 = {};	// @splitView
// @endregion// @endlock

// eventHandlers// @lock

	splitView1.mouseup = function splitView1_mouseup (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onMouseUp').getValue())+1;
	    $$('textField_onMouseUp').setValue(result);
	};// @lock

	splitView1.mouseover = function splitView1_mouseover (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onMouseOver').getValue())+1;
	    $$('textField_onMouseOver').setValue(result);
	};// @lock

	splitView1.mouseout = function splitView1_mouseout (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onMouseOut').getValue())+1;
	    $$('textField_onMouseOut').setValue(result);
	};// @lock

	splitView1.mousedown = function splitView1_mousedown (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onMouseDown').getValue())+1;
	    $$('textField_onMouseDown').setValue(result);
	};// @lock

	splitView1.dblclick = function splitView1_dblclick (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onDblClick').getValue())+1;
	    $$('textField_onDblClick').setValue(result);
	};// @lock

	splitView1.click = function splitView1_click (event)// @startlock
	{// @endlock
	    var result = parseInt($$('textField_onClick').getValue())+1;
	    $$('textField_onClick').setValue(result);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("splitView1", "mouseup", splitView1.mouseup, "WAF");
	WAF.addListener("splitView1", "mouseover", splitView1.mouseover, "WAF");
	WAF.addListener("splitView1", "mouseout", splitView1.mouseout, "WAF");
	WAF.addListener("splitView1", "mousedown", splitView1.mousedown, "WAF");
	WAF.addListener("splitView1", "dblclick", splitView1.dblclick, "WAF");
	WAF.addListener("splitView1", "click", splitView1.click, "WAF");
// @endregion
};// @endlock
