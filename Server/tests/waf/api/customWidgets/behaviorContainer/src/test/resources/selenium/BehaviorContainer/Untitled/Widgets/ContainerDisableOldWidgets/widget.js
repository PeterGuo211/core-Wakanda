WAF.define('ContainerDisableOldWidgets', ['waf-core/widget'], function(widget) {
	
    var ContainerDisableOldWidgets = widget.create('ContainerDisableOldWidgets', {
        init: function() {}
    });

	ContainerDisableOldWidgets.inherit('waf-behavior/layout/container');

    return ContainerDisableOldWidgets;

});
