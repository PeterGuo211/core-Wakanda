
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
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
	var saveEntity = {};	// @button
	var prevEntity = {};	// @button
	var nextEntity = {};	// @button
	var findEntity = {};	// @button
	var dropEntity = {};	// @button
	var addEntity = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	clear.click = function clear_click (event)// @startlock
	{// @endlock
		$$('autoForm1').clear();
	};// @lock

	getErrorDiv.click = function getErrorDiv_click (event)// @startlock
	{// @endlock
		var myError = $$('autoForm1').getErrorDiv();
		$$('richText1').setValue(myError[0].id);
	};// @lock

	clearErrorMessage.click = function clearErrorMessage_click (event)// @startlock
	{// @endlock
		$$('autoForm1').clearErrorMessage();
	};// @lock

	setErrorMessage.click = function setErrorMessage_click (event)// @startlock
	{// @endlock
		$$('autoForm1').setErrorMessage({ message: "error" });
	};// @lock

	setErrorDiv.click = function setErrorDiv_click (event)// @startlock
	{// @endlock
		$$('autoForm1').setErrorDiv("richText1");
	};// @lock

	getParent.click = function getParent_click (event)// @startlock
	{// @endlock
		var myParentId = $$('autoForm1').getParent().id;
		$$('richText1').setValue(myParentId);
	};// @lock

	setParent.click = function setParent_click (event)// @startlock
	{// @endlock
		$$('autoForm1').setParent($$('richText1'));
	};// @lock

	setTextColor.click = function setTextColor_click (event)// @startlock
	{// @endlock
		$$('autoForm1').setTextColor('#650092');
	};// @lock

	setBackgroundColor.click = function setBackgroundColor_click (event)// @startlock
	{// @endlock
		$$('autoForm1').setBackgroundColor("#650092");
	};// @lock

	getTheme.click = function getTheme_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('autoForm1').getTheme());
	};// @lock

	enable.click = function enable_click (event)// @startlock
	{// @endlock
		$$('autoForm1').enable();
	};// @lock

	disable.click = function disable_click (event)// @startlock
	{// @endlock
		$$('autoForm1').disable();
	};// @lock

	destroy.click = function destroy_click (event)// @startlock
	{// @endlock
		$$('autoForm1').destroy();
	};// @lock

	getPosition.click = function getPosition_click (event)// @startlock
	{// @endlock
		var myPosition = $$('autoForm1').getPosition();
		$$('richText1').setValue(myPosition.left+","+myPosition.right+","+myPosition.top+","+myPosition.bottom);
	};// @lock

	setBottom.click = function setBottom_click (event)// @startlock
	{// @endlock
		$$('autoForm1').setBottom(100);
	};// @lock

	setTop.click = function setTop_click (event)// @startlock
	{// @endlock
		$$('autoForm1').setTop(100);
	};// @lock

	setRight.click = function setRight_click (event)// @startlock
	{// @endlock
		$$('autoForm1').setRight(100);
	};// @lock

	getHeight.click = function getHeight_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('autoForm1').getHeight());
	};// @lock

	getWidth.click = function getWidth_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('autoForm1').getWidth());
	};// @lock

	setLeft.click = function setLeft_click (event)// @startlock
	{// @endlock
		$$('autoForm1').setLeft(100);
	};// @lock

	setHeight.click = function setHeight_click (event)// @startlock
	{// @endlock
		$$('autoForm1').setHeight(100);
	};// @lock

	setWidth.click = function setWidth_click (event)// @startlock
	{// @endlock
		$$('autoForm1').setWidth(100);
	};// @lock

	resize_bigger.click = function resize_bigger_click (event)// @startlock
	{// @endlock
		$$('autoForm1').resize(300,300);
	};// @lock

	resize_smaller.click = function resize_smaller_click (event)// @startlock
	{// @endlock
		$$('autoForm1').resize(50,50);
	};// @lock

	move.click = function move_click (event)// @startlock
	{// @endlock
		$$('autoForm1').move(0,0);
	};// @lock

	toggle.click = function toggle_click (event)// @startlock
	{// @endlock
		$$('autoForm1').toggle();
	};// @lock

	removeClass.click = function removeClass_click (event)// @startlock
	{// @endlock
		$$('autoForm1').removeClass("toto");
	};// @lock

	addClass.click = function addClass_click (event)// @startlock
	{// @endlock
		$$('autoForm1').addClass("toto");
	};// @lock

	show.click = function show_click (event)// @startlock
	{// @endlock
		$$('autoForm1').show(true);
	};// @lock

	hide.click = function hide_click (event)// @startlock
	{// @endlock
		$$('autoForm1').hide(true);
	};// @lock

	resizable.click = function resizable_click (event)// @startlock
	{// @endlock
		$$('autoForm1').resizable(true);
	};// @lock

	draggable.click = function draggable_click (event)// @startlock
	{// @endlock
		$$('autoForm1').draggable(true);
	};// @lock

	saveEntity.click = function saveEntity_click (event)// @startlock
	{// @endlock
		$$('autoForm1').saveEntity();
	};// @lock

	prevEntity.click = function prevEntity_click (event)// @startlock
	{// @endlock
		$$('autoForm1').prevEntity();
	};// @lock

	nextEntity.click = function nextEntity_click (event)// @startlock
	{// @endlock
		$$('autoForm1').nextEntity();
	};// @lock

	findEntity.click = function findEntity_click (event)// @startlock
	{// @endlock
		$$('autoForm1').findEntity();
	};// @lock

	dropEntity.click = function dropEntity_click (event)// @startlock
	{// @endlock
		$$('autoForm1').dropEntity();
	};// @lock

	addEntity.click = function addEntity_click (event)// @startlock
	{// @endlock
		$$('autoForm1').addEntity();
	};// @lock

// @region eventManager// @startlock
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
	WAF.addListener("saveEntity", "click", saveEntity.click, "WAF");
	WAF.addListener("prevEntity", "click", prevEntity.click, "WAF");
	WAF.addListener("nextEntity", "click", nextEntity.click, "WAF");
	WAF.addListener("findEntity", "click", findEntity.click, "WAF");
	WAF.addListener("dropEntity", "click", dropEntity.click, "WAF");
	WAF.addListener("addEntity", "click", addEntity.click, "WAF");
// @endregion
};// @endlock
