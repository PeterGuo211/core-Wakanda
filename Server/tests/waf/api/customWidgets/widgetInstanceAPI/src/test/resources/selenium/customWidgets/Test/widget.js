WAF.define('Test', ['waf-core/widget'], function(widget) {
	
    var Test = widget.create('Test', {
        init: function() {
//            /* Define a custom event */
//            this.fire('myEvent', {
//                message: 'Hello'
//            });
        }
        ,
        
//        /* Create a property */
        test: widget.property({
        	type: "list",
        	attributes: [{name: 'value'},{name: 'label'}]
        }),
        
        
        listProp: widget.property({
        	type: "list",
        	attributes: [{name: 'value'},{name: 'label'}]
        }),
        
        
        test2: widget.property({
        	type: 'datasource',
		    attributes: [{
		        name: 'value'
		    }, {
		        name: 'label'
		    }]
        })
        
    });

//    /* Map the custom event above to the DOM click event */
//    Test.mapDomEvents({
//        'click': 'action'
//    });

    return Test;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */