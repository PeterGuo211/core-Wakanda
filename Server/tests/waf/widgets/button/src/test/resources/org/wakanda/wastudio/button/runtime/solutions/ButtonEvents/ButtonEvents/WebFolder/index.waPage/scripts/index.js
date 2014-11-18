
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button3 = {};	// @button
	var button2 = {};	// @button
	var button1 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	button3.mouseup = function button3_mouseup (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mouseup");
	};// @lock

	button2.mouseout = function button2_mouseout (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mouseout");
	};// @lock

	button2.mouseover = function button2_mouseover (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mouseover");
	};// @lock

	button2.mouseup = function button2_mouseup (event)// @startlock
	{// @endlock
		
	};// @lock

	button1.mouseup = function button1_mouseup (event)// @startlock
	{// @endlock
		// Add your code here
	//	$$("richText1").setValue("mouseup");
	};// @lock

	button1.mouseover = function button1_mouseover (event)// @startlock
	{// @endlock
		// Add your code here
		
	};// @lock

	button1.mouseout = function button1_mouseout (event)// @startlock
	{// @endlock
		// Add your code here
		
	};// @lock

	button1.mousedown = function button1_mousedown (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mousedown");
	};// @lock

	button1.dblclick = function button1_dblclick (event)// @startlock
	{// @endlock
		$$("richText1").setValue("dblclick");
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("click");
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button3", "mouseup", button3.mouseup, "WAF");
	WAF.addListener("button2", "mouseout", button2.mouseout, "WAF");
	WAF.addListener("button2", "mouseover", button2.mouseover, "WAF");
	WAF.addListener("button2", "mouseup", button2.mouseup, "WAF");
	WAF.addListener("button1", "mouseup", button1.mouseup, "WAF");
	WAF.addListener("button1", "mouseover", button1.mouseover, "WAF");
	WAF.addListener("button1", "mouseout", button1.mouseout, "WAF");
	WAF.addListener("button1", "mousedown", button1.mousedown, "WAF");
	WAF.addListener("button1", "dblclick", button1.dblclick, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
// @endregion
};// @endlock
