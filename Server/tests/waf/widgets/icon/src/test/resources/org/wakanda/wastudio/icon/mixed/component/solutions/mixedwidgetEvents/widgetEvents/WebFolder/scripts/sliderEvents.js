
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var slider1 = {};	// @slider
// @endregion// @endlock

// eventHandlers// @lock

	slider1.slidestop = function slider1_slidestop (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'slidestop'+' ');
	};// @lock

	slider1.slidechange = function slider1_slidechange (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'slidechange'+' ');
	};// @lock

	slider1.slide = function slider1_slide (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'slide'+' ');
	};// @lock

	slider1.slidestart = function slider1_slidestart (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'slidestart'+' ');
	};// @lock

	slider1.slidecreate = function slider1_slidecreate (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'slidecreate'+' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("slider1", "slidestop", slider1.slidestop, "WAF");
	WAF.addListener("slider1", "slidechange", slider1.slidechange, "WAF");
	WAF.addListener("slider1", "slide", slider1.slide, "WAF");
	WAF.addListener("slider1", "slidestart", slider1.slidestart, "WAF");
	WAF.addListener("slider1", "slidecreate", slider1.slidecreate, "WAF");
// @endregion
};// @endlock
