WAF.define('Composed2', ['waf-core/widget', 'Text'], function(widget, Text) {
	
    var Composed2 = widget.create('Composed2', {
        init: function() {
			this.setPart('part1', new Text());
			this.setPart('part2', new Text());
			this.setPart('part3', new Text());
        }
    });
	Composed2.inherit('waf-behavior/layout/composed');

    return Composed2;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */