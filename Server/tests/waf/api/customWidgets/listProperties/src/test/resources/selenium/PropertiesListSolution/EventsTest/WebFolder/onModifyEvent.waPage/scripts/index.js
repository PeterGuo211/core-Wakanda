
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var onModify = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	var changeFunction = function(){
		$$('richText1').setValue("onModify");
	}

	$$('test1').test.onModify(changeFunction);
	
	onModify.click = function onModify_click (event)// @startlock
	{// @endlock
		var length = $$('test1').test().length;
		var i = Math.floor((Math.random()*length));
		$$('test1').test(i, { label: 'labelModified', value: 'valueModified' });
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("onModify", "click", onModify.click, "WAF");
// @endregion
};// @endlock
