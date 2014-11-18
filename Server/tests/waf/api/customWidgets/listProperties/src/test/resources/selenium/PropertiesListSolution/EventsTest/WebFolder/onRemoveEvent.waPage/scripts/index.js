
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var shift = {};	// @button
	var removeAll = {};	// @button
	var remove = {};	// @button
	var pop = {};	// @button
	var move = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock


	var testProperty = $$('test1').test;
	var changeFunction = function(){
		$$('richText1').setValue("onRemove");
	}

	testProperty.onRemove(changeFunction);

	shift.click = function shift_click (event)// @startlock
	{// @endlock
		testProperty.shift();
	};// @lock

	removeAll.click = function removeAll_click (event)// @startlock
	{// @endlock
		testProperty.removeAll();
	};// @lock

	remove.click = function remove_click (event)// @startlock
	{// @endlock
		
		var count = testProperty().length;
		var i = Math.floor((Math.random()*count));
	
		testProperty.remove(i);
		
	};// @lock

	pop.click = function pop_click (event)// @startlock
	{// @endlock
		testProperty.pop();
	};// @lock

	move.click = function move_click (event)// @startlock
	{// @endlock
		testProperty.move(0,2);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("shift", "click", shift.click, "WAF");
	WAF.addListener("removeAll", "click", removeAll.click, "WAF");
	WAF.addListener("remove", "click", remove.click, "WAF");
	WAF.addListener("pop", "click", pop.click, "WAF");
	WAF.addListener("move", "click", move.click, "WAF");
// @endregion
};// @endlock
