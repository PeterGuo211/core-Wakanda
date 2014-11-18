
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var addProxiedMethods = {};	// @button
	var getParts = {};	// @button
	var setPart = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	addProxiedMethods.click = function addProxiedMethods_click (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

	getParts.click = function getParts_click (event)// @startlock
	{// @endlock
		var result = waf.widgets.composed31.getParts();
			var a = result.join(", ");
			
		$$('richText1').setValue(a);
		
	};// @lock

	setPart.click = function setPart_click (event)// @startlock
	{// @endlock
		var result = waf.widgets.composed31.getParts();
		$$('richText1').setValue(result[0]);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("addProxiedMethods", "click", addProxiedMethods.click, "WAF");
	WAF.addListener("getParts", "click", getParts.click, "WAF");
	WAF.addListener("setPart", "click", setPart.click, "WAF");
// @endregion
};// @endlock
