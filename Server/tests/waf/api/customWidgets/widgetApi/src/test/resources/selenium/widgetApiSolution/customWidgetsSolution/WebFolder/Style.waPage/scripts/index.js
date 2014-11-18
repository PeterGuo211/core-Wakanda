
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var toggleClassRC = {};	// @button
	var style = {};	// @button
	var show = {};	// @button
	var hide = {};	// @button
	var bDACSS = {};	// @button
	var hasClass = {};	// @button
	var toggleClassAC = {};	// @button
	var removeClass = {};	// @button
	var waf_skin_insetVertical = {};	// @button
	var waf_skin_insetHorizontal = {};	// @button
	var waf_skin_insetButtom = {};	// @button
	var waf_skin_insetTop = {};	// @button
	var waf_skin_textTitles = {};	// @button
	var waf_skin_insetRight = {};	// @button
	var waf_skin_insetLeft = {};	// @button
	var waf_skin_tabs = {};	// @button
	var waf_skin_footer = {};	// @button
	var waf_skin_content = {};	// @button
	var waf_skin_header = {};	// @button
	var waf_skin_box = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	toggleClassRC.click = function toggleClassRC_click (event)// @startlock
	{// @endlock
		waf.widgets.myWidget1.removeClass('waf-skin-textTitles');
		waf.widgets.myWidget1.toggleClass('waf-skin-textTitles');
		$$('richText1').setValue(words[13]);
	};// @lock

	style.click = function style_click (event)// @startlock
	{// @endlock
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[13]);
	};// @lock

	show.click = function show_click (event)// @startlock
	{// @endlock
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[13]);
	};// @lock

	hide.click = function hide_click (event)// @startlock
	{// @endlock
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[13]);
	};// @lock

	bDACSS.click = function bDACSS_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue(waf.widgets.myWidget1.bindDatasourceAttributeCSS('waf-skin-textTitles'));
	};// @lock

	hasClass.click = function hasClass_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue(waf.widgets.myWidget1.hasClass('waf-skin-textTitles'));
		//(words[13]);
	};// @lock

	toggleClassAC.click = function toggleClassAC_click (event)// @startlock
	{// @endlock
		waf.widgets.myWidget1.removeClass('waf-skin-textTitles');
		waf.widgets.myWidget1.toggleClass('waf-skin-textTitles');
	};// @lock

	removeClass.click = function removeClass_click (event)// @startlock
	{// @endlock
		waf.widgets.myWidget1.addClass('waf-skin-textTitles');
		waf.widgets.myWidget1.removeClass('waf-skin-textTitles');
		//var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue("Removed");
	};// @lock

	waf_skin_insetVertical.click = function waf_skin_insetVertical_click (event)// @startlock
	{// @endlock
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[12]);
	};// @lock

	waf_skin_insetHorizontal.click = function waf_skin_insetHorizontal_click (event)// @startlock
	{// @endlock
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[11]);
	};// @lock

	waf_skin_insetButtom.click = function waf_skin_insetButtom_click (event)// @startlock
	{// @endlock
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[10]);
	};// @lock

	waf_skin_insetTop.click = function waf_skin_insetTop_click (event)// @startlock
	{// @endlock
		
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[9]);
		//waf-skin-box
	};// @lock

	waf_skin_textTitles.click = function waf_skin_textTitles_click (event)// @startlock
	{// @endlock
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[13]);
	};// @lock

	waf_skin_insetRight.click = function waf_skin_insetRight_click (event)// @startlock
	{// @endlock
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[8]);
	};// @lock

	waf_skin_insetLeft.click = function waf_skin_insetLeft_click (event)// @startlock
	{// @endlock
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[7]);
	};// @lock

	waf_skin_tabs.click = function waf_skin_tabs_click (event)// @startlock
	{// @endlock
		
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[6]);
		//waf-skin-box
	};// @lock

	waf_skin_footer.click = function waf_skin_footer_click (event)// @startlock
	{// @endlock
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[4]);
	};// @lock

	waf_skin_content.click = function waf_skin_content_click (event)// @startlock
	{// @endlock
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[5]);
	};// @lock

	waf_skin_header.click = function waf_skin_header_click (event)// @startlock
	{// @endlock
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[3]);
	};// @lock

	waf_skin_box.click = function waf_skin_box_click (event)// @startlock
	{// @endlock
		
		var words = (($$('myWidget1').getNode()).className).split(" ");
		$$('richText1').setValue(words[2]);
		//waf-skin-box
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("toggleClassRC", "click", toggleClassRC.click, "WAF");
	WAF.addListener("style", "click", style.click, "WAF");
	WAF.addListener("show", "click", show.click, "WAF");
	WAF.addListener("hide", "click", hide.click, "WAF");
	WAF.addListener("bDACSS", "click", bDACSS.click, "WAF");
	WAF.addListener("hasClass", "click", hasClass.click, "WAF");
	WAF.addListener("toggleClassAC", "click", toggleClassAC.click, "WAF");
	WAF.addListener("removeClass", "click", removeClass.click, "WAF");
	WAF.addListener("waf_skin_insetVertical", "click", waf_skin_insetVertical.click, "WAF");
	WAF.addListener("waf_skin_insetHorizontal", "click", waf_skin_insetHorizontal.click, "WAF");
	WAF.addListener("waf_skin_insetButtom", "click", waf_skin_insetButtom.click, "WAF");
	WAF.addListener("waf_skin_insetTop", "click", waf_skin_insetTop.click, "WAF");
	WAF.addListener("waf_skin_textTitles", "click", waf_skin_textTitles.click, "WAF");
	WAF.addListener("waf_skin_insetRight", "click", waf_skin_insetRight.click, "WAF");
	WAF.addListener("waf_skin_insetLeft", "click", waf_skin_insetLeft.click, "WAF");
	WAF.addListener("waf_skin_tabs", "click", waf_skin_tabs.click, "WAF");
	WAF.addListener("waf_skin_footer", "click", waf_skin_footer.click, "WAF");
	WAF.addListener("waf_skin_content", "click", waf_skin_content.click, "WAF");
	WAF.addListener("waf_skin_header", "click", waf_skin_header.click, "WAF");
	WAF.addListener("waf_skin_box", "click", waf_skin_box.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
