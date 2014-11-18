
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var autoWidth = {};	// @button
	var sizeH = {};	// @button
	var sizeW = {};	// @button
	var height = {};	// @button
	var width = {};	// @button
	var autoHeight = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	autoWidth.click = function autoWidth_click (event)// @startlock
	{// @endlock
		var widgetSize = $$('myWidget1').autoWidth();
        	 $$('richText1').setValue($$('myWidget1').getNode().style.width);
	};// @lock

	sizeH.click = function sizeH_click (event)// @startlock
	{// @endlock
		var widgetSize = $$('myWidget1').size();
        	 height = widgetSize.height
       		 $$('richText1').setValue(height);
	};// @lock

	sizeW.click = function sizeW_click (event)// @startlock
	{// @endlock
		var widgetSize = $$('myWidget1').size();
           	 width = widgetSize.width
             $$('richText1').setValue(width);
	};// @lock

	height.click = function height_click (event)// @startlock
	{// @endlock
		var widgetSize = $$('myWidget1').height();
        	
       		 $$('richText1').setValue(widgetSize);
	};// @lock

	width.click = function width_click (event)// @startlock
	{// @endlock
		var widgetSize = $$('myWidget1').width();
           	 
             $$('richText1').setValue(widgetSize);
	};// @lock

	autoHeight.click = function autoHeight_click (event)// @startlock
	{// @endlock
		var widgetSize = $$('myWidget1').autoHeight();
     	     $$('richText1').setValue($$('myWidget1').getNode().style.height);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("autoWidth", "click", autoWidth.click, "WAF");
	WAF.addListener("sizeH", "click", sizeH.click, "WAF");
	WAF.addListener("sizeW", "click", sizeW.click, "WAF");
	WAF.addListener("height", "click", height.click, "WAF");
	WAF.addListener("width", "click", width.click, "WAF");
	WAF.addListener("autoHeight", "click", autoHeight.click, "WAF");
// @endregion
};// @endlock
