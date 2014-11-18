
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var tagName = {};	// @button
	var isWidget = {};	// @button
	var isWidgetClass = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	tagName.click = function tagName_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('wListView1').getNode().tagName);
	};// @lock

	isWidget.click = function isWidget_click (event)// @startlock
	{// @endlock
		var widget = WAF.require('waf-core/widget');
		var MyWidget = widget.create('MyWidget');

		$$('richText1').setValue(widget.isWidget(waf.widgets.wListView1));
	};// @lock

	isWidgetClass.click = function isWidgetClass_click (event)// @startlock
	{// @endlock
		var widget = WAF.require('waf-core/widget');
		var MyWidget = widget.create('MyWidget');
		$$('richText1').setValue(widget.isWidgetClass(MyWidget));
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("tagName", "click", tagName.click, "WAF");
	WAF.addListener("isWidget", "click", isWidget.click, "WAF");
	WAF.addListener("isWidgetClass", "click", isWidgetClass.click, "WAF");
// @endregion
};// @endlock
