
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var width = {};	// @button
	var height = {};	// @button
	var autoHeight = {};	// @button
	var sizeW = {};	// @button
	var sizeH = {};	// @button
	var autoWidth = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	width.click = function width_click (event)// @startlock
	{// @endlock
		var widgetSize = $$('wListView1').width();
           	 
             $$('richText1').setValue(widgetSize);
	};// @lock

	height.click = function height_click (event)// @startlock
	{// @endlock
		var widgetSize = $$('wListView1').height();
        	
       		 $$('richText1').setValue(widgetSize);
	};// @lock

	autoHeight.click = function autoHeight_click (event)// @startlock
	{// @endlock
		var widgetSize = $$('wListView1').autoHeight();
     	     $$('richText1').setValue($$('wListView1').getNode().style.height);
	};// @lock

	sizeW.click = function sizeW_click (event)// @startlock
	{// @endlock
		var widgetSize = $$('wListView1').size();
           	 width = widgetSize.width;
             $$('richText1').setValue(width);
	};// @lock

	sizeH.click = function sizeH_click (event)// @startlock
	{// @endlock
		var widgetSize = $$('wListView1').size();
        	 height = widgetSize.height;
       		 $$('richText1').setValue(height);
	};// @lock

	autoWidth.click = function autoWidth_click (event)// @startlock
	{// @endlock
		var widgetSize = $$('wListView1').autoWidth();
        	 $$('richText1').setValue($$('wListView1').getNode().style.width);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("width", "click", width.click, "WAF");
	WAF.addListener("height", "click", height.click, "WAF");
	WAF.addListener("autoHeight", "click", autoHeight.click, "WAF");
	WAF.addListener("sizeW", "click", sizeW.click, "WAF");
	WAF.addListener("sizeH", "click", sizeH.click, "WAF");
	WAF.addListener("autoWidth", "click", autoWidth.click, "WAF");
// @endregion
};// @endlock
