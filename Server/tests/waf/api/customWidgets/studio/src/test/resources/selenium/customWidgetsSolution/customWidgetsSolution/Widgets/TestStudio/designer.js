(function(TestStudio) {

    TestStudio.prototype.initialized = function() {
    	this.log('initialized in GUID');
    };

    TestStudio.addEvent({
	    'name':'create',
	    'description':'On Create',
	    'category':'Custom Events'
	});
	
	TestStudio.addEvents([{
	    'name':'update',
	    'description':'On Update',
	    'category':'Custom Events'
	},{
	    'name':'delete',
	    'description':'On Delete',
	    'category':'Custom Events'
	}]);
	
	TestStudio.addState({
	    label: 'hover',
	    cssClass: 'waf-state-hover',
	    find: '',
	    mobile: false
	});
	
	TestStudio.addStates([{
	    label: 'active',
	    cssClass: 'waf-state-active',
	    find: '',
	    mobile: false
	},{
	    label: 'disabled',
	    cssClass: 'waf-state-disabled',
	    find: '',
	    mobile: false
	}]);
	
	TestStudio.addLabel({
		'defaultValue': 'Toolbar',
		'position': 'top'
	});
	
    TestStudio.setHeight('20');
	TestStudio.setWidth('60');

	TestStudio.setPanelStyle({
	    'fClass': true,
	    'text': false,
	    'background': true,
	    'border': true,
	    'sizePosition': true,
	    'disabled': ['border-radius', 'background-image']
	});
    
    TestStudio.customizeProperty('propDynamic', {
        description: 'source var',
        display: false
    });
    
    TestStudio.customizeProperty( 'propString', {
		title: 'My propString',
        sourceDisplay: false
    });
    
    TestStudio.customizeProperty( 'propInteger', {
		title: 'My propInteger',
        sourceDisplay: false
    });
    
    TestStudio.customizeProperty( 'propBoolean', {
		title: 'My propBoolean',
        sourceDisplay: false
    });
	
    TestStudio.customizeProperty( 'propDatasource', {
		title: 'My propDatasource',
        sourceDisplay: false
    });
	/*
    TestStudio.customizeProperty( 'propList', {
		title: 'My propList',
        sourceDisplay: false
    });
	*/
    TestStudio.customizeProperty( 'propEnum', {
		title: 'My propEnum',
        sourceDisplay: false
    });

});

// For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3870.html