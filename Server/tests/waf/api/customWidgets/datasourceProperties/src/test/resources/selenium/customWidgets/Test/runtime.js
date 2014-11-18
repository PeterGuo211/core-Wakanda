(function() {
	var Test = WAF.require('Test');

	Test.prototype.initialized = function() {
		this.log('initialized in runtime');
    };
})();