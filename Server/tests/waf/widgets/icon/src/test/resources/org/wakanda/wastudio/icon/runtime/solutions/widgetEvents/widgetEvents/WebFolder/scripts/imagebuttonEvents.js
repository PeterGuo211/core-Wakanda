
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var imageButton1 = {};	// @buttonImage
// @endregion// @endlock

// eventHandlers// @lock

	imageButton1.touchcancel = function imageButton1_touchcancel (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'touchcancel' + ' ');
	};// @lock

	imageButton1.touchend = function imageButton1_touchend (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'touchend' + ' ');
	};// @lock

	imageButton1.touchstart = function imageButton1_touchstart (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'touchstart' + ' ');
	};// @lock

	imageButton1.mouseup = function imageButton1_mouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseup' + ' ');
	};// @lock

	imageButton1.mouseover = function imageButton1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseover' + ' ');
	};// @lock

	imageButton1.mouseout = function imageButton1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mouseout' + ' ');
	};// @lock

	imageButton1.mousedown = function imageButton1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'mousedown' + ' ');
	};// @lock

	imageButton1.dblclick = function imageButton1_dblclick (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'dblclick' + ' ');
	};// @lock

	imageButton1.click = function imageButton1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'click' + ' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("imageButton1", "touchcancel", imageButton1.touchcancel, "WAF");
	WAF.addListener("imageButton1", "touchend", imageButton1.touchend, "WAF");
	WAF.addListener("imageButton1", "touchstart", imageButton1.touchstart, "WAF");
	WAF.addListener("imageButton1", "mouseup", imageButton1.mouseup, "WAF");
	WAF.addListener("imageButton1", "mouseover", imageButton1.mouseover, "WAF");
	WAF.addListener("imageButton1", "mouseout", imageButton1.mouseout, "WAF");
	WAF.addListener("imageButton1", "mousedown", imageButton1.mousedown, "WAF");
	WAF.addListener("imageButton1", "dblclick", imageButton1.dblclick, "WAF");
	WAF.addListener("imageButton1", "click", imageButton1.click, "WAF");
// @endregion
};// @endlock
