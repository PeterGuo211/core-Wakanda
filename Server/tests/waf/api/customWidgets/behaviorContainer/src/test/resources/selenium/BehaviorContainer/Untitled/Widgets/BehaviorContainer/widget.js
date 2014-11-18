WAF.define('BehaviorContainer', ['waf-core/widget', 'Container'], function(widget, Container) {
	
    var BehaviorContainer = widget.create('BehaviorContainer', {
        init: function() {
        	this.subscribe('insertWidget',function(event) {
        		var result = $$('textLog').getValue();
               	$$('textLog').setValue(result+'insertWidget');
        	});
        	this.subscribe('detachWidget',function(event) {
        		var result = $$('textLog').getValue();
               	$$('textLog').setValue(result+'detachWidget');
        	});
        	this.subscribe('moveWidget',function(event) {
        		var result = $$('textLog').getValue();
               	$$('textLog').setValue(result+'moveWidget');
        	});	
        }
    });
    
	BehaviorContainer.inherit('waf-behavior/layout/container');
	
	BehaviorContainer.addIndexedEvent('click');
	BehaviorContainer.addIndexedEvent('click', 'select');
	
	BehaviorContainer.addIndexedMethods(['style'], 'sub', '', 2);
	BehaviorContainer.addIndexedMethods(['style'], '', 'Subwidget');
	
    return BehaviorContainer;
	
});
