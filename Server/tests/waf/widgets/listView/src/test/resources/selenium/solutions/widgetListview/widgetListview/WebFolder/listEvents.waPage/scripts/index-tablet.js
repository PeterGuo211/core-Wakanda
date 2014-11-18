
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var listView1 = {};	// @list
// @endregion// @endlock

// eventHandlers// @lock

	listView1.touchcancel = function listView1_touchcancel (event)// @startlock
	{// @endlock
		var myResult = parseInt($$('textField_onTouchCancel').getValue()) + 1;
		$$('textField_onTouchCancel').setValue(myResult);
	};// @lock

	listView1.touchend = function listView1_touchend (event)// @startlock
	{// @endlock
		var myResult = parseInt($$('textField_onTouchEnd').getValue()) + 1;
		$$('textField_onTouchEnd').setValue(myResult);
	};// @lock

	listView1.touchstart = function listView1_touchstart (event)// @startlock
	{// @endlock
		var myResult = parseInt($$('textField_onTouchStart').getValue()) + 1;
		$$('textField_onTouchStart').setValue(myResult);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("listView1", "touchcancel", listView1.touchcancel, "WAF");
	WAF.addListener("listView1", "touchend", listView1.touchend, "WAF");
	WAF.addListener("listView1", "touchstart", listView1.touchstart, "WAF");
// @endregion
};// @endlock
