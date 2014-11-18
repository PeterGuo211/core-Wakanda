
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var move = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	var testProperty = $$('test1').test;
	var changeFunction = function(){
		$$('richText1').setValue("onMove");
	}

	testProperty.onMove(changeFunction);

	move.click = function move_click (event)// @startlock
	{// @endlock
		testProperty.move(0,2);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("move", "click", move.click, "WAF");
// @endregion
};// @endlock
