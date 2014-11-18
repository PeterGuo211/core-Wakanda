
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var fitToTop = {};	// @button
	var fitToLeft = {};	// @button
	var fitToRight = {};	// @button
	var Top = {};	// @button
	var Left = {};	// @button
	var Right = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	fitToTop.click = function fitToTop_click (event)// @startlock
	{// @endlock
		$$('wListView1').fitToTop();
		$$('richText1').setValue($$('wListView1').getNode().style.top);
	};// @lock

	fitToLeft.click = function fitToLeft_click (event)// @startlock
	{// @endlock
		$$('wListView1').fitToLeft();
		$$('richText1').setValue($$('wListView1').getNode().style.left);
	};// @lock

	fitToRight.click = function fitToRight_click (event)// @startlock
	{// @endlock
		$$('wListView1').fitToRight();
		$$('richText1').setValue($$('wListView1').getNode().style.right);
	};// @lock

	Top.click = function Top_click (event)// @startlock
	{// @endlock
		$$('wListView1').top(50);
		$$('richText1').setValue($$('wListView1').getNode().style.top);
	};// @lock

	Left.click = function Left_click (event)// @startlock
	{// @endlock
		$$('wListView1').left(50);
		$$('richText1').setValue($$('wListView1').getNode().style.left);
	};// @lock

	Right.click = function Right_click (event)// @startlock
	{// @endlock
		$$('wListView1').right(50);
		$$('richText1').setValue($$('wListView1').getNode().style.right);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("fitToTop", "click", fitToTop.click, "WAF");
	WAF.addListener("fitToLeft", "click", fitToLeft.click, "WAF");
	WAF.addListener("fitToRight", "click", fitToRight.click, "WAF");
	WAF.addListener("Top", "click", Top.click, "WAF");
	WAF.addListener("Left", "click", Left.click, "WAF");
	WAF.addListener("Right", "click", Right.click, "WAF");
// @endregion
};// @endlock
