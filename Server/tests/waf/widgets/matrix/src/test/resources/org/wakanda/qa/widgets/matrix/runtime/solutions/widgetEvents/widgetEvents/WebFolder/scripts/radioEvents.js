
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var radioGroup1 = {};	// @radioGroup
// @endregion// @endlock

// eventHandlers// @lock

	radioGroup1.onmouseup = function radioGroup1_onmouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'onmouseup'+' ');
	};// @lock

	radioGroup1.mouseover = function radioGroup1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'mouseover'+' ');
	};// @lock

	radioGroup1.mouseout = function radioGroup1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'mouseout'+' ');
	};// @lock

	radioGroup1.mousemove = function radioGroup1_mousemove (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'mousemove'+' ');
	};// @lock

	radioGroup1.mousedown = function radioGroup1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'mousedown'+' ');
	};// @lock

	radioGroup1.click = function radioGroup1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'click'+' ');
	};// @lock

	radioGroup1.change = function radioGroup1_change (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'change'+' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("radioGroup1", "onmouseup", radioGroup1.onmouseup, "WAF");
	WAF.addListener("radioGroup1", "mouseover", radioGroup1.mouseover, "WAF");
	WAF.addListener("radioGroup1", "mouseout", radioGroup1.mouseout, "WAF");
	WAF.addListener("radioGroup1", "mousemove", radioGroup1.mousemove, "WAF");
	WAF.addListener("radioGroup1", "mousedown", radioGroup1.mousedown, "WAF");
	WAF.addListener("radioGroup1", "click", radioGroup1.click, "WAF");
	WAF.addListener("radioGroup1", "change", radioGroup1.change, "WAF");
// @endregion
};// @endlock
