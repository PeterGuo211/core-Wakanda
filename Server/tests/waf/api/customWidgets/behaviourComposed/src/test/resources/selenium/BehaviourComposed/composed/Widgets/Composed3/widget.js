WAF.define('Composed3', ['waf-core/widget', 'Text','Button'], function(widget, Text, Button) {
	
    var Composed3 = widget.create('Composed3', {
        showPart: widget.property({type: 'boolean'}),
        init: function() {
			this.showPart.onChange(function() {
				if(this.showPart()) {
					this.setPart('part1', new Text({value: 'coucou'}));
				} else {
					this.setPart('part1');
				}
			});
			if(this.showPart()) {
				this.setPart('part1', new Text({value: 'coucou'}));
			}
			this.addClass('waf-skin-box');
		$(this.node).on('click', function() {
			this.setPart('part2', new Text({value: 'coucou'}));
			this.getPart('part2').style('background', 'yellow');
		}.bind(this));
			
        }
        
    });
	Composed3.inherit('waf-behavior/layout/composed');
	Composed3.setPart('part', Text);
	Composed3.setPart('part1', Button);
	Composed3.setPart('part4', Text);
//	Composed3.removePart('part2', Text);
	Composed3.addProxiedMethods(['show','hide'],'part','pref');
	Composed3.addProxiedMethods(['show','hide'],'part','','suff');
	Composed3.addProxiedMethods(['show','hide'],'part','pref','suff');
	
//	Composed3.addProxiedEvent('onChange', 'part1', 'onChange');
	Composed3.addAliasProperty('myAlias', 'part4', 'value');
	

    return Composed3;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */