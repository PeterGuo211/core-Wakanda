
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var icon3 = {};	// @icon
	var icon2 = {};	// @icon
	var icon1 = {};	// @icon
// @endregion// @endlock

// eventHandlers// @lock

	icon3.mouseup = function icon3_mouseup (event)// @startlock
	{// @endlock
		$$("richText1").setValue("mouseup");
	};// @lock

	icon2.mouseover = function icon2_mouseover (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mouseover");
	};// @lock

	icon1.mousedown = function icon1_mousedown (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("mousedown");
	};// @lock

	icon1.dblclick = function icon1_dblclick (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("dblclick");
	};// @lock

	icon1.click = function icon1_click (event)// @startlock
	{// @endlock
		// Add your code here
		$$("richText1").setValue("click");
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("icon3", "mouseup", icon3.mouseup, "WAF");
	WAF.addListener("icon2", "mouseover", icon2.mouseover, "WAF");
	WAF.addListener("icon1", "mousedown", icon1.mousedown, "WAF");
	WAF.addListener("icon1", "dblclick", icon1.dblclick, "WAF");
	WAF.addListener("icon1", "click", icon1.click, "WAF");
// @endregion
};// @endlock
