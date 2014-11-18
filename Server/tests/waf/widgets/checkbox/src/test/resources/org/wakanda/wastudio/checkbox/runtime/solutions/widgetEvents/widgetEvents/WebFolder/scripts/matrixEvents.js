
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var matrix1 = {};	// @matrix
// @endregion// @endlock

// eventHandlers// @lock

	matrix1.stopResize = function matrix1_stopResize (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'stopResize'+' ');
	};// @lock

	matrix1.onResize = function matrix1_onResize (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'onResize'+' ');
	};// @lock

	matrix1.startResize = function matrix1_startResize (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'startResize'+' ');
	};// @lock

	matrix1.onChildrenDraw = function matrix1_onChildrenDraw (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'onChildrenDraw'+' ');
	};// @lock

	matrix1.mouseup = function matrix1_mouseup (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'mouseup'+' ');
	};// @lock

	matrix1.mouseover = function matrix1_mouseover (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'mouseover'+' ');
	};// @lock

	matrix1.mouseout = function matrix1_mouseout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'mouseout'+' ');
	};// @lock

	matrix1.mousedown = function matrix1_mousedown (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'mousedown'+' ');
	};// @lock

	matrix1.dblclick = function matrix1_dblclick (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'dblclick'+' ');
	};// @lock

	matrix1.click = function matrix1_click (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack+'click'+' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("matrix1", "stopResize", matrix1.stopResize, "WAF");
	WAF.addListener("matrix1", "onResize", matrix1.onResize, "WAF");
	WAF.addListener("matrix1", "startResize", matrix1.startResize, "WAF");
	WAF.addListener("matrix1", "onChildrenDraw", matrix1.onChildrenDraw, "WAF");
	WAF.addListener("matrix1", "mouseup", matrix1.mouseup, "WAF");
	WAF.addListener("matrix1", "mouseover", matrix1.mouseover, "WAF");
	WAF.addListener("matrix1", "mouseout", matrix1.mouseout, "WAF");
	WAF.addListener("matrix1", "mousedown", matrix1.mousedown, "WAF");
	WAF.addListener("matrix1", "dblclick", matrix1.dblclick, "WAF");
	WAF.addListener("matrix1", "click", matrix1.click, "WAF");
// @endregion
};// @endlock
