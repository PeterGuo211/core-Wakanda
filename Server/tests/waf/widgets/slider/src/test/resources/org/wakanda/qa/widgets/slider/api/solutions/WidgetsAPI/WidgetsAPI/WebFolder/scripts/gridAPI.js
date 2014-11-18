
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var setLabelTextColor = {};	// @button
	var setLabelText = {};	// @button
	var clear = {};	// @button
	var getErrorDiv = {};	// @button
	var clearErrorMessage = {};	// @button
	var setErrorMessage = {};	// @button
	var setErrorDiv = {};	// @button
	var getParent = {};	// @button
	var setParent = {};	// @button
	var setTextColor = {};	// @button
	var setBackgroundColor = {};	// @button
	var getTheme = {};	// @button
	var enable = {};	// @button
	var disable = {};	// @button
	var destroy = {};	// @button
	var getPosition = {};	// @button
	var setBottom = {};	// @button
	var setTop = {};	// @button
	var setRight = {};	// @button
	var getHeight = {};	// @button
	var getWidth = {};	// @button
	var setLeft = {};	// @button
	var setHeight = {};	// @button
	var setWidth = {};	// @button
	var resize_bigger = {};	// @button
	var resize_smaller = {};	// @button
	var move = {};	// @button
	var toggle = {};	// @button
	var removeClass = {};	// @button
	var addClass = {};	// @button
	var show = {};	// @button
	var hide = {};	// @button
	var resizable = {};	// @button
	var draggable = {};	// @button
	
	var setSortIndicator_asc = {};	// @button
	var getSortIndicator = {};	// @button
	var reduceToSelected = {};	// @button
	var getSelectedRows = {};	// @button
	var countSelected = {};	// @button
	var getSelectionMode = {};	// @button
	var resetSortIndicator = {};	// @button
	var column_setColor = {};	// @button
	var column_setRenderer = {};	// @button
	var column_setWidth = {};	// @button
	var column_setTextSize = {};	// @button
	var column_setFormat = {};	// @button
	var column_setBackgroundColor = {};	// @button
	var column_getValueForInput = {};	// @button
	var column_getFormattedValue = {};	// @button
	var resetSortIndicator = WAF.namespace("GridMulti.index.button12.events");	// @button
	var setSortIndicator_desc = WAF.namespace("GridMulti.index.button11.events");	// @button
	var getSortIndicator = WAF.namespace("GridMulti.index.button10.events");	// @button
	var reduceToSelected = WAF.namespace("GridMulti.index.button9.events");	// @button
	var getSelectedRows = WAF.namespace("GridMulti.index.button8.events");	// @button
	var countSelected = WAF.namespace("GridMulti.index.button6.events");	// @button
	var setSelectionMode_multiple = WAF.namespace("GridMulti.index.button5.events");	// @button
	var setSelectionMode_single = WAF.namespace("GridMulti.index.button4.events");	// @button
	var getSelectionMode = WAF.namespace("GridMulti.index.button3.events");	// @button
	var setReadOnly_false = WAF.namespace("GridMulti.index.button2.events");	// @button
	var setReadOnly_true = WAF.namespace("GridMulti.index.button0.events");	// @button
// @endregion// @endlock

// eventHandlers// @lock

	setLabelTextColor.click = function setLabelTextColor_click (event)// @startlock
	{// @endlock
		$$('grid').setLabelTextColor("#650092");
	};// @lock

	setLabelText.click = function setLabelText_click (event)// @startlock
	{// @endlock
		$$('grid').setLabelText("toto");
	};// @lock

	clear.click = function clear_click (event)// @startlock
	{// @endlock
		$$('grid').clear();
	};// @lock

	getErrorDiv.click = function getErrorDiv_click (event)// @startlock
	{// @endlock
		var myError = $$('grid').getErrorDiv();
		$$('richText1').setValue(myError[0].id);
	};// @lock

	clearErrorMessage.click = function clearErrorMessage_click (event)// @startlock
	{// @endlock
		$$('grid').clearErrorMessage();
	};// @lock

	setErrorMessage.click = function setErrorMessage_click (event)// @startlock
	{// @endlock
		$$('grid').setErrorMessage({ message: "error" });
	};// @lock

	setErrorDiv.click = function setErrorDiv_click (event)// @startlock
	{// @endlock
		$$('grid').setErrorDiv("richText1");
	};// @lock

	getParent.click = function getParent_click (event)// @startlock
	{// @endlock
		var myParentId = $$('grid').getParent().id;
		$$('richText1').setValue(myParentId);
	};// @lock

	setParent.click = function setParent_click (event)// @startlock
	{// @endlock
		$$('grid').setParent($$('richText1'));
	};// @lock

	setTextColor.click = function setTextColor_click (event)// @startlock
	{// @endlock
		$$('grid').setTextColor('#650092');
	};// @lock

	setBackgroundColor.click = function setBackgroundColor_click (event)// @startlock
	{// @endlock
		$$('grid').setBackgroundColor("#650092");
	};// @lock

	getTheme.click = function getTheme_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('grid').getTheme());
	};// @lock

	enable.click = function enable_click (event)// @startlock
	{// @endlock
		$$('grid').enable();
	};// @lock

	disable.click = function disable_click (event)// @startlock
	{// @endlock
		$$('grid').disable();
	};// @lock

	destroy.click = function destroy_click (event)// @startlock
	{// @endlock
		$$('grid').destroy();
	};// @lock

	getPosition.click = function getPosition_click (event)// @startlock
	{// @endlock
		var myPosition = $$('grid').getPosition();
		$$('richText1').setValue(myPosition.left+","+myPosition.right+","+myPosition.top+","+myPosition.bottom);
	};// @lock

	setBottom.click = function setBottom_click (event)// @startlock
	{// @endlock
		$$('grid').setBottom(100);
	};// @lock

	setTop.click = function setTop_click (event)// @startlock
	{// @endlock
		$$('grid').setTop(100);
	};// @lock

	setRight.click = function setRight_click (event)// @startlock
	{// @endlock
		$$('grid').setRight(100);
	};// @lock

	getHeight.click = function getHeight_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('grid').getHeight());
	};// @lock

	getWidth.click = function getWidth_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('grid').getWidth());
	};// @lock

	setLeft.click = function setLeft_click (event)// @startlock
	{// @endlock
		$$('grid').setLeft(100);
	};// @lock

	setHeight.click = function setHeight_click (event)// @startlock
	{// @endlock
		$$('grid').setHeight(100);
	};// @lock

	setWidth.click = function setWidth_click (event)// @startlock
	{// @endlock
		$$('grid').setWidth(100);
	};// @lock

	resize_bigger.click = function resize_bigger_click (event)// @startlock
	{// @endlock
		$$('grid').resize(300,300);
	};// @lock

	resize_smaller.click = function resize_smaller_click (event)// @startlock
	{// @endlock
		$$('grid').resize(50,50);
	};// @lock

	move.click = function move_click (event)// @startlock
	{// @endlock
		$$('grid').move(0,0);
	};// @lock

	toggle.click = function toggle_click (event)// @startlock
	{// @endlock
		$$('grid').toggle();
	};// @lock

	removeClass.click = function removeClass_click (event)// @startlock
	{// @endlock
		$$('grid').removeClass("toto");
	};// @lock

	addClass.click = function addClass_click (event)// @startlock
	{// @endlock
		$$('grid').addClass("toto");
	};// @lock

	show.click = function show_click (event)// @startlock
	{// @endlock
		$$('grid').show(true);
	};// @lock

	hide.click = function hide_click (event)// @startlock
	{// @endlock
		$$('grid').hide(true);
	};// @lock

	resizable.click = function resizable_click (event)// @startlock
	{// @endlock
		$$('grid').resizable(true);
	};// @lock

	draggable.click = function draggable_click (event)// @startlock
	{// @endlock
		$$('grid').draggable(true);
	};// @lock

	setSortIndicator_asc.click = function setSortIndicator_asc_click (event)// @startlock
	{// @endlock
		$$('grid').setSortIndicator(1, 'asc');
	};// @lock

	column_setColor.click = function column_setColor_click (event)// @startlock
	{// @endlock
		$$('grid').column("ID").setTextColor('#C30');
	};// @lock

	column_setRenderer.click = function column_setRenderer_click (event)// @startlock
	{// @endlock
		$$('grid').column("name").setRenderer(
			function(myCell) {
		        return myCell.value.toUpperCase();
		    }
		);
	};// @lock

	column_setWidth.click = function column_setWidth_click (event)// @startlock
	{// @endlock
		$$('grid').column("ID").setWidth(150);
	};// @lock

	column_setTextSize.click = function column_setTextSize_click (event)// @startlock
	{// @endlock
		$$('grid').column("ID").setTextSize(14);
	};// @lock

	column_setFormat.click = function column_setFormat_click (event)// @startlock
	{// @endlock
		$$('grid').column("ID").setFormat('$###,###,##0.00');
	};// @lock

	column_setBackgroundColor.click = function column_setBackgroundColor_click (event)// @startlock
	{// @endlock
		$$('grid').column('name').setBackgroundColor('#C30');
	};// @lock

	column_getValueForInput.click = function column_getValueForInput_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('grid').column("ID").getValueForInput());
	};// @lock

	column_getFormattedValue.click = function column_getFormattedValue_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('grid').column('ID').getFormattedValue());
	};// @lock

	resetSortIndicator.click = function resetSortIndicator_click (event)// @startlock
	{// @endlock
		$$('grid').resetSortIndicator();
	};// @lock

	setSortIndicator_desc.click = function setSortIndicator_desc_click (event)// @startlock
	{// @endlock
		$$('grid').setSortIndicator(1, 'desc');
	};// @lock

	getSortIndicator.click = function getSortIndicator_click (event)// @startlock
	{// @endlock
		var objResult = $$('grid').getSortIndicator();
		$$('richText1').setValue( "colNb: " + objResult.colNb + ", order: " + objResult.order );
	};// @lock

	reduceToSelected.click = function reduceToSelected_click (event)// @startlock
	{// @endlock
		$$('grid').reduceToSelected();
	};// @lock

	getSelectedRows.click = function getSelectedRows_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue("");
		var arrRows = $$('grid').getSelectedRows();
		$$('richText1').setValue(arrRows.toString());
	};// @lock

	countSelected.click = function countSelected_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('grid').countSelected());
	};// @lock

	setSelectionMode_multiple.click = function setSelectionMode_multiple_click (event)// @startlock
	{// @endlock
		$$('grid').setSelectionMode('multiple');
	};// @lock

	setSelectionMode_single.click = function setSelectionMode_single_click (event)// @startlock
	{// @endlock
		$$('grid').setSelectionMode('single');
	};// @lock

	getSelectionMode.click = function getSelectionMode_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('grid').getSelectionMode());
	};// @lock

	setReadOnly_false.click = function setReadOnly_false_click (event)// @startlock
	{// @endlock
		$$('grid').setReadOnly(false); 
	};// @lock

	setReadOnly_true.click = function setReadOnly_true_click (event)// @startlock
	{// @endlock
		$$('grid').setReadOnly(true); 
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("setLabelTextColor", "click", setLabelTextColor.click, "WAF");
	WAF.addListener("setLabelText", "click", setLabelText.click, "WAF");
	WAF.addListener("clear", "click", clear.click, "WAF");
	WAF.addListener("getErrorDiv", "click", getErrorDiv.click, "WAF");
	WAF.addListener("clearErrorMessage", "click", clearErrorMessage.click, "WAF");
	WAF.addListener("setErrorMessage", "click", setErrorMessage.click, "WAF");
	WAF.addListener("setErrorDiv", "click", setErrorDiv.click, "WAF");
	WAF.addListener("getParent", "click", getParent.click, "WAF");
	WAF.addListener("setParent", "click", setParent.click, "WAF");
	WAF.addListener("setTextColor", "click", setTextColor.click, "WAF");
	WAF.addListener("setBackgroundColor", "click", setBackgroundColor.click, "WAF");
	WAF.addListener("getTheme", "click", getTheme.click, "WAF");
	WAF.addListener("enable", "click", enable.click, "WAF");
	WAF.addListener("disable", "click", disable.click, "WAF");
	WAF.addListener("destroy", "click", destroy.click, "WAF");
	WAF.addListener("getPosition", "click", getPosition.click, "WAF");
	WAF.addListener("setBottom", "click", setBottom.click, "WAF");
	WAF.addListener("setTop", "click", setTop.click, "WAF");
	WAF.addListener("setRight", "click", setRight.click, "WAF");
	WAF.addListener("getHeight", "click", getHeight.click, "WAF");
	WAF.addListener("getWidth", "click", getWidth.click, "WAF");
	WAF.addListener("setLeft", "click", setLeft.click, "WAF");
	WAF.addListener("setHeight", "click", setHeight.click, "WAF");
	WAF.addListener("setWidth", "click", setWidth.click, "WAF");
	WAF.addListener("resize_bigger", "click", resize_bigger.click, "WAF");
	WAF.addListener("resize_smaller", "click", resize_smaller.click, "WAF");
	WAF.addListener("move", "click", move.click, "WAF");
	WAF.addListener("toggle", "click", toggle.click, "WAF");
	WAF.addListener("removeClass", "click", removeClass.click, "WAF");
	WAF.addListener("addClass", "click", addClass.click, "WAF");
	WAF.addListener("show", "click", show.click, "WAF");
	WAF.addListener("hide", "click", hide.click, "WAF");
	WAF.addListener("resizable", "click", resizable.click, "WAF");
	WAF.addListener("draggable", "click", draggable.click, "WAF");

	WAF.addListener("setSortIndicator_asc", "click", setSortIndicator_asc.click, "WAF");
	WAF.addListener("column_setColor", "click", column_setColor.click, "WAF");
	WAF.addListener("column_setRenderer", "click", column_setRenderer.click, "WAF");
	WAF.addListener("column_setWidth", "click", column_setWidth.click, "WAF");
	WAF.addListener("column_setTextSize", "click", column_setTextSize.click, "WAF");
	WAF.addListener("column_setFormat", "click", column_setFormat.click, "WAF");
	WAF.addListener("column_setBackgroundColor", "click", column_setBackgroundColor.click, "WAF");
	WAF.addListener("column_getValueForInput", "click", column_getValueForInput.click, "WAF");
	WAF.addListener("column_getFormattedValue", "click", column_getFormattedValue.click, "WAF");
	WAF.addListener("resetSortIndicator", "click", resetSortIndicator.click, "WAF");
	WAF.addListener("setSortIndicator_desc", "click", setSortIndicator_desc.click, "WAF");
	WAF.addListener("getSortIndicator", "click", getSortIndicator.click, "WAF");
	WAF.addListener("reduceToSelected", "click", reduceToSelected.click, "WAF");
	WAF.addListener("getSelectedRows", "click", getSelectedRows.click, "WAF");
	WAF.addListener("countSelected", "click", countSelected.click, "WAF");
	WAF.addListener("setSelectionMode_multiple", "click", setSelectionMode_multiple.click, "WAF");
	WAF.addListener("setSelectionMode_single", "click", setSelectionMode_single.click, "WAF");
	WAF.addListener("getSelectionMode", "click", getSelectionMode.click, "WAF");
	WAF.addListener("setReadOnly_false", "click", setReadOnly_false.click, "WAF");
	WAF.addListener("setReadOnly_true", "click", setReadOnly_true.click, "WAF");
// @endregion
};// @endlock
