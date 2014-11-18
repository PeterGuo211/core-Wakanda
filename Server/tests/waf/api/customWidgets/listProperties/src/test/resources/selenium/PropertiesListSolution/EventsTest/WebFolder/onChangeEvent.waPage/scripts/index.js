
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var shift = {};	// @button
	var removeAll = {};	// @button
	var remove = {};	// @button
	var push = {};	// @button
	var pop = {};	// @button
	var move = {};	// @button
	var insert = {};	// @button
	var concat = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	var testProperty = $$('test1').test;
	var changeFunction = function(){
		$$('richText1').setValue("onChange");
	}

	testProperty.onChange(changeFunction);
	
	
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

	push.click = function push_click (event)// @startlock
	{// @endlock
		testProperty.push({ value: "value pushed", label: "label pushed"});
	};// @lock

	pop.click = function pop_click (event)// @startlock
	{// @endlock
		testProperty.pop();
	};// @lock

	move.click = function move_click (event)// @startlock
	{// @endlock
		testProperty.move(0,2);
	};// @lock

	
	insert.click = function insert_click (event)// @startlock
	{// @endlock
		var count = $$('test1').test.count();
		var i = Math.floor((Math.random()*count));	
		$$('test1').test.insert(i, { value: "value Inserted", label: "label inserted" });
	
	};// @lock


	concat.click = function concat_click (event)// @startlock
	{// @endlock
		var length = testProperty().length;
		testProperty.concat( [ { value: "value1", label: "label1" }, { value: "value2", label: "label2" } ] );
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("shift", "click", shift.click, "WAF");
	WAF.addListener("removeAll", "click", removeAll.click, "WAF");
	WAF.addListener("remove", "click", remove.click, "WAF");
	WAF.addListener("push", "click", push.click, "WAF");
	WAF.addListener("pop", "click", pop.click, "WAF");
	WAF.addListener("move", "click", move.click, "WAF");
	WAF.addListener("insert", "click", insert.click, "WAF");
	WAF.addListener("concat", "click", concat.click, "WAF");
// @endregion
};// @endlock
