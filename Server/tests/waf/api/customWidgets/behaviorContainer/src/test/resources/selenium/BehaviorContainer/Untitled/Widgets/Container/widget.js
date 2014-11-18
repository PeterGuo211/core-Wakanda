WAF.define('Container', function() {
    var widget = WAF.require('waf-core/widget');
    var Container = widget.create('Container');

	Container.inherit(WAF.require('waf-behavior/layout/container'));

	return Container;
});
