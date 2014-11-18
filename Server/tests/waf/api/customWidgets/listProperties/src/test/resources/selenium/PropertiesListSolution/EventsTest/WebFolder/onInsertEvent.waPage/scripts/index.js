
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var move = {};	// @button
	var insert = {};	// @button
	var concat = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	var testProperty = $$('test1').test;
	var changeFunction = function(){
		$$('richText1').setValue("onInsert");
	}

	testProperty.onInsert(changeFunction);


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
		testProperty.concat( [ { value: "value1", label: "label1" }, { value: "value2", label: "label2" } ] );
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("move", "click", move.click, "WAF");
	WAF.addListener("insert", "click", insert.click, "WAF");
	WAF.addListener("concat", "click", concat.click, "WAF");
// @endregion
};// @endlock
