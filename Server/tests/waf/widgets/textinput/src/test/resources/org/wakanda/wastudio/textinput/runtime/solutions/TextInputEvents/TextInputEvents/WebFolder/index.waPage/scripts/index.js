
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var textField3 = {};	// @textField
	var textField2 = {};	// @textField
	var textField1 = {};	// @textField
// @endregion// @endlock

// eventHandlers// @lock

	textField3.mouseup = function textField3_mouseup (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mouseup");
	};// @lock

	textField2.mouseover = function textField2_mouseover (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mouseover");
	};// @lock

	textField2.mouseout = function textField2_mouseout (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText2").setValue("mouseout");
	};// @lock

	textField1.mousedown = function textField1_mousedown (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mousedown");
	};// @lock

	textField1.dblclick = function textField1_dblclick (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("dblclick");
	};// @lock

	textField1.click = function textField1_click (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("click");
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("textField3", "mouseup", textField3.mouseup, "WAF");
	WAF.addListener("textField2", "mouseover", textField2.mouseover, "WAF");
	WAF.addListener("textField2", "mouseout", textField2.mouseout, "WAF");
	WAF.addListener("textField1", "mousedown", textField1.mousedown, "WAF");
	WAF.addListener("textField1", "dblclick", textField1.dblclick, "WAF");
	WAF.addListener("textField1", "click", textField1.click, "WAF");
// @endregion
};// @endlock
