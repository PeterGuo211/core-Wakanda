WAF.define('TestStudio', function() {
    var widget = WAF.require('waf-core/widget');
    var TestStudio = widget.create('TestStudio', {

	    init : function () {
			this.node.innerHTML = "<img src='/widgets-custom/TestStudio/images/action_add.png'/>";
			this.node.innerHTML += "<input class='input'/>";
			this.node.innerHTML += "<div class='log'></div>";
			this.initialized();
	    },
	    
	    resetLog : function (text) {
			$('.waf-teststudio .log').html('');
	    },
	    
	    log : function (text) {
	    	var currentText=$('.waf-teststudio .log').html();
			$('.waf-teststudio .log').html(currentText +' '+ text);
	    }
    });
    
//------------------------------------------
    // MethodsHelper
    
    TestStudio.addClassMethod('testClassMethod', function(that){
    	that.log('addClassMethod');
    });
    
    TestStudio.doBeforeClassMethod('testClassMethod', function(that){
    	that.log('doBeforeClassMethod');
    });
    
    TestStudio.wrapClassMethod('testClassMethod', function(original, that){
    	that.log('wrapClassMethod');
    	original(that);
    });
    
    TestStudio.doAfterClassMethod('testClassMethod', function(that){
    	that.log('doAfterClassMethod');
    });
    
    TestStudio.addMethod('testClassMethod_wrapper', function(that){
    	TestStudio.testClassMethod(this);
    });
    
//------------------------------------------

    TestStudio.addClassMethods({
		testClassMethods1: function(that){
			that.log('testClassMethods1');
		},
		testClassMethods2: function(that){
			that.log('testClassMethods2');
		}
	});
    
    TestStudio.addMethod('testAddClassMethods_wrapper', function(that){
    	TestStudio.testClassMethods1(this);
    	TestStudio.testClassMethods2(this);
    });
    
//------------------------------------------
    
    TestStudio.addMethod('testMethod', function(event){
    	this.log('addMethod');
    });
    
    TestStudio.doBefore('testMethod', function(event){
    	this.log('doBefore');
    });
    
    TestStudio.wrap('testMethod', function(original, event){
    	this.log('wrap');
    	original(event);
    });
    
    TestStudio.doAfter('testMethod', function(event){
    	this.log('doAfter');
    });
    
//------------------------------------------

    TestStudio.addMethods({
		testMethods1: function(event){
			this.log('testMethods1');
		},
		testMethods2: function(event){
			this.log('testMethods2');
		}
	});
     
//------------------------------------------
	// Observable

	TestStudio.prototype.fireCreateEvent = function(event){
	   	this.fire('create');
	};
	
	TestStudio.prototype.subscribeClickEvent = function(event){
		this.subscribe('click', 'input', function(event){
	    	this.log('Success Got click event');
	    }.bind(this));
	};
	
	TestStudio.prototype.subscribeFireCustomEvent = function(event){
		this.subscribe('testEvent', function(event){
	    	this.log('Success Got testEvent');
	    }.bind(this));
	   	this.fire('testEvent');
	};
	   	
	TestStudio.prototype.unsubscribeByEvent = function(event){
		this.subscribe('testEvent', function(event){
	    	this.log('Failed Got testEvent');
	    }.bind(this));
	   	this.unsubscribe({event:'testEvent'});
	   	this.log('testEvent sent');
	   	this.fire('testEvent');
	};	   	
	
	TestStudio.prototype.unsubscribeByCallback = function(event){
	   	var subCallback = (function(event){
	    	this.log('Failed Got testEvent');
	    }).bind(this);
		this.subscribe('testEvent', subCallback);
	   	this.unsubscribe({callback: subCallback});
	   	this.log('testEvent sent');
	   	this.fire('testEvent');
	};

	TestStudio.prototype.unsubscribeByTarget = function(event){
		this.subscribe('testEvent', 'button', function(event){
	    	this.log('Failed Got testEvent');
	    }.bind(this));
	   	this.unsubscribe({target:'button'});
	   	this.log('testEvent sent');
	   	this.fire('testEvent');
	};

	TestStudio.prototype.unsubscribeBySubscriber = function(event){
	   	//unsubscribe
		var subscriber = this.subscribe('testEvent', function(event){
	    	this.log('Failed Got testEvent');
	    }.bind(this));
	   	subscriber.unsubscribe();
	   	this.log('testEvent sent');
	   	this.fire('testEvent');
	};

	TestStudio.prototype.pauseResumeSubscribe = function(event){
	   	//pause/resume  test
		var subscriber = this.subscribe('testEvent', function(event){
	    	this.log('Got testEvent');
	    }.bind(this));
	   	this.log('subscriber is paused : '+ subscriber.isPaused());
	   	subscriber.pause();
	   	this.log('subscriber is paused : '+ subscriber.isPaused());
	   	this.log('testEvent sent');
	   	this.fire('testEvent');
	   	subscriber.resume();
	   	this.log('subscriber is paused : '+ subscriber.isPaused());
	   	this.log('testEvent sent');
	   	this.fire('testEvent');
    };
    
	TestStudio.prototype.testRemoveSubscriber = function(event){
	   	var subscriber = this.subscribe('testEvent', function(event){
	    	this.log('Failed Got testEvent');
	    }.bind(this));
	   	this.removeSubscriber(subscriber);
	   	this.log('testEvent sent');
	   	this.fire('testEvent');
	};

//------------------------------------------
    // Properties
    
    TestStudio.addProperty( 'propDynamic', {
        type: 'string',
        bindable: true,
        onChange: function(value){
    		$('.input').val(value);
    	}
    });
    
    TestStudio.addProperty( 'propString', {
        defaultValue: 'No Employee',
        type: 'string'
    });
    
    TestStudio.addProperty( 'propInteger', {
        defaultValue: 10,
        type: 'integer'
    });
    
    TestStudio.addProperty( 'propBoolean', {
        defaultValue: true,
        type: 'boolean'
    });
    
    TestStudio.addProperty( 'propDatasource', {
        type: 'datasource'
    });
    /*
    TestStudio.addProperty( 'propList', {
        defaultValue: 2,
        type: 'list',
		values : [{ key : 1,  value : 'Popup'}, { key : 2, value : 'List' }]
    });
    */
    TestStudio.addProperty( 'propEnum', {
        defaultValue: 'List',
        type: 'enum',
		values : ['Popup', 'List']
    });
    
//------------------------------------------
    // DOM Helper
    
    TestStudio.mapDomEvents({'click':'click'}, 'input');
    TestStudio.mapDomEvents({'click':'create'}, 'img');

    return TestStudio;
});

// For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html
