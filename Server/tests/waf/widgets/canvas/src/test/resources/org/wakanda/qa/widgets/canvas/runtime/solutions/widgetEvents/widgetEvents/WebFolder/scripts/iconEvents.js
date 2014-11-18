
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var icon1 = {};	// @icon
// @endregion// @endlock

// eventHandlers// @lock

	icon1.mouseup = function icon1_mouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseup' + ' ');
	};// @lock

	icon1.mouseover = function icon1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseover' + ' ');
	};// @lock

	icon1.mouseout = function icon1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseout' + ' ');
	};// @lock

	icon1.mousedown = function icon1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousedown' + ' ');
	};// @lock

	icon1.dblclick = function icon1_dblclick (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'dblclick' + ' ');
	};// @lock

	icon1.click = function icon1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'click' + ' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("icon1", "mouseup", icon1.mouseup, "WAF");
	WAF.addListener("icon1", "mouseover", icon1.mouseover, "WAF");
	WAF.addListener("icon1", "mouseout", icon1.mouseout, "WAF");
	WAF.addListener("icon1", "mousedown", icon1.mousedown, "WAF");
	WAF.addListener("icon1", "dblclick", icon1.dblclick, "WAF");
	WAF.addListener("icon1", "click", icon1.click, "WAF");
// @endregion
};// @endlock
