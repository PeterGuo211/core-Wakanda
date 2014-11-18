
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var calendar2 = {};	// @calendar
	var calendar3 = {};	// @calendar
	var calendar1 = {};	// @calendar
// @endregion// @endlock

// eventHandlers// @lock

	calendar2.onBeforeShow = function calendar2_onBeforeShow (event)// @startlock
	{// @endlock
		$$("richText2").setValue("onBeforeShow");
	};// @lock

	calendar2.mouseover = function calendar2_mouseover (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mouseover");
	};// @lock

	calendar2.mouseout = function calendar2_mouseout (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText3").setValue("mouseout");
	};// @lock

	calendar3.mouseup = function calendar3_mouseup (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mouseup");
	};// @lock

	calendar1.onShow = function calendar1_onShow (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText2").setValue("onShow");
	};// @lock

	calendar1.mousedown = function calendar1_mousedown (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mousedown");
	};// @lock

	calendar1.dblclick = function calendar1_dblclick (event)// @startlock
	{// @endlock
		$$("richText1").setValue("dblclick");
	};// @lock

	calendar1.click = function calendar1_click (event)// @startlock
	{// @endlock
		$$("richText1").setValue("click");
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("calendar2", "onBeforeShow", calendar2.onBeforeShow, "WAF");
	WAF.addListener("calendar1", "onShow", calendar1.onShow, "WAF");
	WAF.addListener("calendar2", "mouseover", calendar2.mouseover, "WAF");
	WAF.addListener("calendar2", "mouseout", calendar2.mouseout, "WAF");
	WAF.addListener("calendar1", "mousedown", calendar1.mousedown, "WAF");
	WAF.addListener("calendar3", "mouseup", calendar3.mouseup, "WAF");
	WAF.addListener("calendar1", "dblclick", calendar1.dblclick, "WAF");
	WAF.addListener("calendar1", "click", calendar1.click, "WAF");
// @endregion
};// @endlock
