WAF.define('ContainerDisable', ['waf-core/widget'], function(widget) {
	
    var ContainerDisable = widget.create('ContainerDisable', {
        init: function() {}
    });

	ContainerDisable.inherit('waf-behavior/layout/container');
	
    return ContainerDisable;

});
