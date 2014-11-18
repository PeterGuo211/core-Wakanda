
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var popover1 = {};	// @popover
// @endregion// @endlock

// eventHandlers// @lock

	popover1.touchcancel = function popover1_touchcancel (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onTouchCancel').getValue())+1;
		$$('textField_onTouchCancel').setValue(result);
	};// @lock

	popover1.touchend = function popover1_touchend (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onTouchEnd').getValue())+1;
		$$('textField_onTouchEnd').setValue(result);
	};// @lock

	popover1.touchstart = function popover1_touchstart (event)// @startlock
	{// @endlock
		var result = parseInt($$('textField_onTouchStart').getValue())+1;
		$$('textField_onTouchStart').setValue(result);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("popover1", "touchcancel", popover1.touchcancel, "WAF");
	WAF.addListener("popover1", "touchend", popover1.touchend, "WAF");
	WAF.addListener("popover1", "touchstart", popover1.touchstart, "WAF");
// @endregion
};// @endlock
