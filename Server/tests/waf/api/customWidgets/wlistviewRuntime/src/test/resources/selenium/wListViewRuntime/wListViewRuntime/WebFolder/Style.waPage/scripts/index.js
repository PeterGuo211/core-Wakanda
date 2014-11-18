
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var waf_skin_box = {};	// @button
	var removeClass = {};	// @button
	var toggleClassAC = {};	// @button
	var toggleClassRC = {};	// @button
	var hasClass = {};	// @button
	var bDACSS = {};	// @button
	var hide = {};	// @button
	var show = {};	// @button
	var style = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	waf_skin_box.click = function waf_skin_box_click (event)// @startlock
	{// @endlock
		var words = (($$('wListView1').getNode()).className).split(" ");
		$$('richText1').setValue(words[2]); 
	};// @lock

	removeClass.click = function removeClass_click (event)// @startlock
	{// @endlock
		waf.widgets.wListView1.addClass('waf_skin_box.click');
		waf.widgets.wListView1.removeClass('waf_skin_box.click');
		//var words = (($$('wListView1').getNode()).className).split(" ");
		$$('richText1').setValue("Removed");
	};// @lock

	toggleClassAC.click = function toggleClassAC_click (event)// @startlock
	{// @endlock
		waf.widgets.wListView1.removeClass('waf_skin_box.click');
		waf.widgets.wListView1.toggleClass('waf_skin_box.click');
	};// @lock

	toggleClassRC.click = function toggleClassRC_click (event)// @startlock
	{// @endlock
//		waf.widgets.wListView1.removeClass('waf_skin_box.click');
//		waf.widgets.wListView1.toggleClass('waf_skin_box.click');
//		$$('richText1').setValue(words[13]);
	};// @lock

	hasClass.click = function hasClass_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue(waf.widgets.wListView1.hasClass('waf_skin_box.click'));
	};// @lock

	bDACSS.click = function bDACSS_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue(waf.widgets.wListView1.bindDatasourceAttributeCSS('waf_skin_box.click'));
	};// @lock

	hide.click = function hide_click (event)// @startlock
	{// @endlock
		var words = (($$('wListView1').getNode()).className).split(" ");
		$$('richText1').setValue(words[13]);
	};// @lock

	show.click = function show_click (event)// @startlock
	{// @endlock
		var words = (($$('wListView1').getNode()).className).split(" ");
		$$('richText1').setValue(words[13]);
	};// @lock

	style.click = function style_click (event)// @startlock
	{// @endlock
		var words = (($$('wListView1').getNode()).className).split(" ");
		$$('richText1').setValue(words[13]);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("waf_skin_box", "click", waf_skin_box.click, "WAF");
	WAF.addListener("removeClass", "click", removeClass.click, "WAF");
	WAF.addListener("toggleClassAC", "click", toggleClassAC.click, "WAF");
	WAF.addListener("toggleClassRC", "click", toggleClassRC.click, "WAF");
	WAF.addListener("hasClass", "click", hasClass.click, "WAF");
	WAF.addListener("bDACSS", "click", bDACSS.click, "WAF");
	WAF.addListener("hide", "click", hide.click, "WAF");
	WAF.addListener("show", "click", show.click, "WAF");
	WAF.addListener("style", "click", style.click, "WAF");
// @endregion
};// @endlock
