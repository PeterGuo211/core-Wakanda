
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var propertyName = {};	// @button
	var removeAll = {};	// @button
	var insert = {};	// @button
	var concat = {};	// @button
	var move = {};	// @button
	var push = {};	// @button
	var pop = {};	// @button
	var shift = {};	// @button
	var remove = {};	// @button
	var last = {};	// @button
	var first = {};	// @button
	var count = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	propertyName.click = function propertyName_click (event)// @startlock
	{// @endlock
		var elements = testProperty();
		debugger;
		var expectedElem = [{value: "48", label: "age"}, {value: "hmida", label: "firstName"}, {value: "lourib", label: "lastName"}, {value: "chefnaj", label: "job"}, {value: "l7areb", label: "hobby"}];
		
		var result = "success";
		for(var i=0; i<5; i++){
			if( elements[i].label != expectedElem[i].label || elements[i].value != expectedElem[i].value ){
				result = "error";
				break;
			}
		}
		
		$$('richText1').setValue( result );
	};// @lock

	var insertedFunction = function(){
		alert('inserted');
	}

	var removedFunction = function(){
		alert('removed');
	}
	
	var movedFunction = function(){
		alert('moved');
	}
	
	var modifyFunction = function(){
		alert('modified');
	}
	
	
	var testProperty = $$('test1').test;
	
	//testProperty.onRemove(removedFunction);
//	testProperty.onMove(movedFunction);
//	testProperty.onInsert(insertedFunction);
//	testProperty.onModify(modifyFunction);



	removeAll.click = function removeAll_click (event)// @startlock
	{// @endlock
		var property = $$('test1').test;
		property.removeAll();
		
		var result = property().length == 0 ? "removedAll" : "error";
		$$('richText1').setValue( result );
		
	};// @lock

	insert.click = function insert_click (event)// @startlock
	{// @endlock
		var count = $$('test1').test.count();
		var i = Math.floor((Math.random()*count));	
		var index = $$('test1').test.insert(i, { value: "value Inserted", label: "label inserted" });
		
		var result = "error";
		if( index == i && $$('test1').test.count() == count+1 ){
			 result = "inserted";
		}		
		
		$$('richText1').setValue( result );

	};// @lock

	concat.click = function concat_click (event)// @startlock
	{// @endlock
		var length = testProperty().length;
		testProperty.concat( [ { value: "value1", label: "label1" }, { value: "value2", label: "label2" } ] );
		
		var result = "error";
		if( testProperty()[length].label == "label1" && testProperty()[length].value == "value1" && testProperty()[length+1].label == "label2" && testProperty()[length+1].value == "value2"){
			result = "concated";
		}
		
		$$('richText1').setValue( result );
	};// @lock

	move.click = function move_click (event)// @startlock
	{// @endlock
		var property = $$('test1').test;
		var elem = property()[0];
		property.move(0,2);
		
		var result = "error";
		if( elem.label == property()[2].label && elem.value == property()[2].value ){
			 result = "moved";
		}		
		
		$$('richText1').setValue( result );
	};// @lock

	var j=0;

	push.click = function push_click (event)// @startlock
	{// @endlock
		var length = $$('test1').test().length;
		var index = $$('test1').test.push({ value: "value pushed", label: "label pushed"});
		
		var elem = $$('test1').test()[index];
		var result = "error";
		if( (elem.label == "label pushed") && (elem.value == "value pushed") && $$('test1').test().length == length+1 ){
			 result = "pushed";
		}		
		
		$$('richText1').setValue( result );
	};// @lock

	pop.click = function pop_click (event)// @startlock
	{// @endlock
		var lastIndex = $$('test1').test().length - 1;
		var lastElement = $$('test1').test()[lastIndex];
		var popedObj = $$('test1').test.pop();
				
		var result = "error";
		
		if( (popedObj.label == lastElement.label) && (popedObj.value == lastElement.value) ){
			 result = "removed";
		}		
		
		$$('richText1').setValue( result );
	};// @lock

	shift.click = function shift_click (event)// @startlock
	{// @endlock
		var firstElement = $$('test1').test()[0];
		var shiftedObj = $$('test1').test.shift();
				
		var result = "error";
		
		if( (shiftedObj.label == firstElement.label) && (shiftedObj.value == firstElement.value) ){
			 result = "removed";
		}		
		
		$$('richText1').setValue( result );
	};// @lock

	remove.click = function remove_click (event)// @startlock
	{// @endlock
		var count = 5;
		var i = Math.floor((Math.random()*count));
		var property = $$('test1').test()[i];
	
		var removedObj = $$('test1').test.remove(i);
		
		var result = "error";
		
		if( (removedObj.label == property.label) && (removedObj.value == property.value) ){
			 result = "removed";
		}		
		
		$$('richText1').setValue( result );
		
	};// @lock

	last.click = function last_click (event)// @startlock
	{// @endlock
		var Elem = $$('test1').test.last();
		$$('richText1').setValue( Elem.label + ":" + Elem.value );
	};// @lock

	first.click = function first_click (event)// @startlock
	{// @endlock
		var firstElem = $$('test1').test.first();
		 $$('richText1').setValue( firstElem.label + ":" + firstElem.value );
	};// @lock

	count.click = function count_click (event)// @startlock
	{// @endlock
		 var count = $$('test1').test.count();
		 $$('richText1').setValue( count );
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("propertyName", "click", propertyName.click, "WAF");
	WAF.addListener("removeAll", "click", removeAll.click, "WAF");
	WAF.addListener("insert", "click", insert.click, "WAF");
	WAF.addListener("concat", "click", concat.click, "WAF");
	WAF.addListener("move", "click", move.click, "WAF");
	WAF.addListener("push", "click", push.click, "WAF");
	WAF.addListener("pop", "click", pop.click, "WAF");
	WAF.addListener("shift", "click", shift.click, "WAF");
	WAF.addListener("remove", "click", remove.click, "WAF");
	WAF.addListener("last", "click", last.click, "WAF");
	WAF.addListener("first", "click", first.click, "WAF");
	WAF.addListener("count", "click", count.click, "WAF");
// @endregion
};// @endlock
