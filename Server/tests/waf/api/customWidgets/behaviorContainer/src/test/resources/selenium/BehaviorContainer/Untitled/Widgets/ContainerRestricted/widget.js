WAF.define('ContainerRestricted', ['waf-core/widget', 'Text'], function(widget, Text) {
	
    var ContainerRestricted = widget.create('ContainerRestricted', {
        init: function() {}
    });

	ContainerRestricted.inherit('waf-behavior/layout/container');
	ContainerRestricted.restrictWidget(Text);

    return ContainerRestricted;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */