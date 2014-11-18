
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var login1 = {};	// @login
// @endregion// @endlock

// eventHandlers// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'logout'+' ');
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		var stack = $$('richText1').getValue();
		$$('richText1').setValue(stack + 'login'+' ');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
// @endregion
};// @endlock
