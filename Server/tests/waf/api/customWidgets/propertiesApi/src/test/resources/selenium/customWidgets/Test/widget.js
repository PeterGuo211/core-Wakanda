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
        
        
        datasourceProp: widget.property({
        	type: 'datasource',
		    attributes: [{
		        name: 'value'
		    }, {
		        name: 'label'
		    }]
        }),
        
         enumProp: widget.property({
        	type: 'enum',
		    values: {
		        blank: '_blank',
		        self:  '_self'
		    },
		    bindable:true
        }),
        
         boolProp: widget.property({
        	type: 'boolean',
        	onChange: function(newValue) {
        		console.log( newValue );
		        console.log(typeof newValue);
   			 }  
        }),
        
        stringProp: widget.property({
        	type: 'string'
        }),
        
        integerProp: widget.property({
        	type: 'integer'
        })           
    });
    
    
    //Test.inherit(WAF.require('waf-behavior/layout/container'));
    
    //Test.removeProperty('boolProp');
    //console.log( Test.getProperties() );

//    /* Map the custom event above to the DOM click event */
    Test.mapDomEvents({
        'click': 'click'
    });

    return Test;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */