(function() {
	var TestStudio = WAF.require('TestStudio');

	TestStudio.prototype.initialized = function() {
		this.log('initialized in runtime');
    };
})();