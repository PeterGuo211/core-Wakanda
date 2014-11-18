
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var checkbox4 = {};	// @checkbox
	var checkbox3 = {};	// @checkbox
	var checkbox2 = {};	// @checkbox
	var checkbox1 = {};	// @checkbox
// @endregion// @endlock

// eventHandlers// @lock

	checkbox4.mouseout = function checkbox4_mouseout (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText2").setValue("mouseout");
	};// @lock

	checkbox3.mouseup = function checkbox3_mouseup (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mouseup");
	};// @lock

	checkbox2.mouseover = function checkbox2_mouseover (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mouseover");
	};// @lock

	checkbox2.mouseout = function checkbox2_mouseout (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText2").setValue("mouseout");
	};// @lock

	checkbox1.change = function checkbox1_change (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("change");
	};// @lock

	checkbox1.mousemove = function checkbox1_mousemove (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mousemove");
	};// @lock

	checkbox1.mousedown = function checkbox1_mousedown (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mousedown");
	};// @lock

	checkbox1.click = function checkbox1_click (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("click");
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("checkbox4", "mouseout", checkbox4.mouseout, "WAF");
	WAF.addListener("checkbox1", "change", checkbox1.change, "WAF");
	WAF.addListener("checkbox3", "mouseup", checkbox3.mouseup, "WAF");
	WAF.addListener("checkbox2", "mouseover", checkbox2.mouseover, "WAF");
	WAF.addListener("checkbox2", "mouseout", checkbox2.mouseout, "WAF");
	WAF.addListener("checkbox1", "mousemove", checkbox1.mousemove, "WAF");
	WAF.addListener("checkbox1", "mousedown", checkbox1.mousedown, "WAF");
	WAF.addListener("checkbox1", "click", checkbox1.click, "WAF");
// @endregion
};// @endlock
