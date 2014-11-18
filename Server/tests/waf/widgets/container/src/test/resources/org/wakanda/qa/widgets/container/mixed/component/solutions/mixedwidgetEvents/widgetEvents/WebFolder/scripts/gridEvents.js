
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var dataGrid1 = {};	// @dataGrid
// @endregion// @endlock

// eventHandlers// @lock

	dataGrid1.onHeaderClick = function dataGrid1_onHeaderClick (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'onHeaderClick' + ' ');
	};// @lock

	dataGrid1.onError = function dataGrid1_onError (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'onError' + ' ');
	};// @lock

	dataGrid1.onRowDraw = function dataGrid1_onRowDraw (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'onRowDraw' + ' ');
	};// @lock

	dataGrid1.onRowRightClick = function dataGrid1_onRowRightClick (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'onRowRightClick' + ' ');
	};// @lock

	dataGrid1.onRowClick = function dataGrid1_onRowClick (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'onRowClick' + ' ');
	};// @lock

	dataGrid1.onCellClick = function dataGrid1_onCellClick (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'onCellClick' + ' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("dataGrid1", "onHeaderClick", dataGrid1.onHeaderClick, "WAF");
	WAF.addListener("dataGrid1", "onError", dataGrid1.onError, "WAF");
	WAF.addListener("dataGrid1", "onRowDraw", dataGrid1.onRowDraw, "WAF");
	WAF.addListener("dataGrid1", "onRowRightClick", dataGrid1.onRowRightClick, "WAF");
	WAF.addListener("dataGrid1", "onRowClick", dataGrid1.onRowClick, "WAF");
	WAF.addListener("dataGrid1", "onCellClick", dataGrid1.onCellClick, "WAF");
// @endregion
};// @endlock
