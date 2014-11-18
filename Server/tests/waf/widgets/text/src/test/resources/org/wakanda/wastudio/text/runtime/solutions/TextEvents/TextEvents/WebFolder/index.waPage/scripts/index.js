
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var richText3 = {};	// @richText
	var richText2 = {};	// @richText
	var richText1 = {};	// @richText
// @endregion// @endlock

// eventHandlers// @lock

	richText3.mouseup = function richText3_mouseup (event)// @startlock
	{// @endlock
		$$('richText4').setValue("mouseup");
	};// @lock

	richText2.mouseover = function richText2_mouseover (event)// @startlock
	{// @endlock
		$$('richText5').setValue("mouseover");
	};// @lock

	richText2.mouseout = function richText2_mouseout (event)// @startlock
	{// @endlock
		$$('richText5').setValue("mouseout");
	};// @lock

	richText1.mousedown = function richText1_mousedown (event)// @startlock
	{// @endlock
		// Add your code here
		$$('richText4').setValue("mousedown");
	};// @lock

	richText1.dblclick = function richText1_dblclick (event)// @startlock
	{// @endlock
		// Add your code here
		$$('richText4').setValue("dblclick");
	};// @lock

	richText1.click = function richText1_click (event)// @startlock
	{// @endlock
		$$('richText4').setValue("click");
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("richText2", "mouseover", richText2.mouseover, "WAF");
	WAF.addListener("richText3", "mouseup", richText3.mouseup, "WAF");
	WAF.addListener("richText2", "mouseout", richText2.mouseout, "WAF");
	WAF.addListener("richText1", "mousedown", richText1.mousedown, "WAF");
	WAF.addListener("richText1", "dblclick", richText1.dblclick, "WAF");
	WAF.addListener("richText1", "click", richText1.click, "WAF");
// @endregion
};// @endlock
