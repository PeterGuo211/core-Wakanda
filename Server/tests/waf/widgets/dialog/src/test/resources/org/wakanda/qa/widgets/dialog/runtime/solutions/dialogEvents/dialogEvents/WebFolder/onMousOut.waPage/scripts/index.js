
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var dialog1 = {};	// @dialog
	var button5 = {};	// @button
	var button4 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	dialog1.mouseout = function dialog1_mouseout (event)// @startlock
	{// @endlock
		$$('richText2').setValue('mouseOut');
	};// @lock

	button5.click = function button5_click (event)// @startlock
	{// @endlock
		$$('dialog1').closeDialog(); //ok button
	};// @lock

	button4.click = function button4_click (event)// @startlock
	{// @endlock
		$$('dialog1').closeDialog(); //cancel button
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("dialog1", "mouseout", dialog1.mouseout, "WAF");
	WAF.addListener("button5", "click", button5.click, "WAF");
	WAF.addListener("button4", "click", button4.click, "WAF");
// @endregion
};// @endlock
