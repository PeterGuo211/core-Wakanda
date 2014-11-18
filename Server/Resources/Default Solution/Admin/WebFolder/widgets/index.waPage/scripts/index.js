
WAF.onAfterInit = function onAfterInit() {// @lock
	"use strict";
	
	var loadJsCallback;
	function loadPackage(packge, callback) {
		// Load the package
		document.title = packge + ' - Widget Tester';
		loadJsCallback = function() {
			var Body = WAF.require('waf-widget/body');
			WAF.require('waf-core/widget').body = new Body();
			if(callback) {
				callback();
			}
		};
		var script = document.createElement('script');
		script.language = 'javascript';
		script.src = '/' + packge + '/package.json~waf-build.js?path=WIDGETS_CUSTOM&debug=1';
		document.body.appendChild(script);
	}
	WAF.loader.debug.loadJs = function(list) {
		function load() {
			var path = list.shift();
			if(!path) {
				return loadJsCallback && loadJsCallback();
			}
			var script = document.createElement('script');
			script.language = 'javascript';
			document.body.appendChild(script);
			script.addEventListener('load', load, false);
			script.src = path;
		}
		load();
	};
	WAF.loader.debug.loadCss = function(list) {
		while(list.length) {
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.href = list.shift();
			document.head.appendChild(link);
		}
	};
	
// @region namespaceDeclaration// @startlock
	var auto = {};	// @checkbox
	var documentEvent = {};	// @document
	var method = {};	// @radioGroup
	var refresh_button = {};	// @button
	var height = {};	// @textField
	var width = {};	// @textField
	var create_button = {};	// @button
	var options = {};	// @textField
	var widget_type = {};	// @textField
// @endregion// @endlock
	
	function updateInputs() {
		var options = $$('options').getValue() || undefined;
		if(options) {
			options = JSON.parse(options);
		}
		var widgetType = $$("widget_type").getValue();
		var width = parseFloat($$('width').getValue()) || 0;
		var height = parseFloat($$('height').getValue()) || 0;
		var type = widgetType.split('.', 2).slice(-1)[0];
		var packge = widgetType.split('.', 2)[0];

		var loadCallback = function() {
			var WidgetClass = WAF.require(widgetType);
			if($$('method').getValue() === 'javascript') {
				$$('code_input').setValue(
					'var WidgetClass = WAF.require(' + JSON.stringify(widgetType) + ');\n\n' +
					'window.widget = new WidgetClass(' + (options ? JSON.stringify(options) : '') + ');\n\n' +
					'var Body = WAF.require("waf-core/widget.body");\n\n' +
					'Body.attachWidget(window.widget);\n\n' +
					'window.widget.size(' + width + ', ' + height + ');'
				);
			} else {
				$$('code_input').setValue(
					'<' + WidgetClass.tagName + ' id="widget1" data-type="' + type + '" data-package="' + packge + '" ' + (Object.keys(options || {}).map(function(key) {
						return 'data-' + key.toLowerCase() + '="' + options[key].toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '"';
					}).join(' ')) + ' style="width: ' + width + 'px; height: ' + height + 'px;"></' + WidgetClass.tagName + '>'
				);
			}
			// save values in the url
			var values = {};
			['widget_type', 'options', 'width', 'height', 'method', 'code_input'].forEach(function(key) {
				values[key] = $$(key).getValue();
			});
			location.href = '#' + WAF.toQueryString(values);
		};
		
		if(packge in WAF.require.modules) {
			loadCallback();
		} else {
			loadPackage(packge, loadCallback);
		}
	}
	
// eventHandlers// @lock

	auto.change = function auto_change (event)// @startlock
	{// @endlock
		updateInputs();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		// retreive values from the url
		var query = WAF.parseQueryString(location.href.split('#', 2)[1] || '');
		for(var key in query) {
			if($$(key)) {
				$$(key).setValue(query[key]);
			}
		}
		if('widget_type' in query) {
			loadPackage(query.widget_type.split('.', 2)[0], function() {
				if($$('code_input').getValue() === '') {
					updateInputs();
				}
				if($$('auto').getValue()) {
					create_button.click();
				}
			});
		}
	};// @lock

	method.change = function method_change (event)// @startlock
	{// @endlock
		updateInputs();
	};// @lock

	refresh_button.click = function refresh_button_click (event)// @startlock
	{// @endlock
		location.reload(true);
	};// @lock

	height.change = function height_change (event)// @startlock
	{// @endlock
		updateInputs();
	};// @lock

	width.change = function width_change (event)// @startlock
	{// @endlock
		updateInputs();
	};// @lock

	create_button.click = function create_button_click (event)// @startlock
	{// @endlock
		if($$('method').getValue() === 'javascript') {
			eval($$('code_input').getValue());
		} else {
			var html = $$('code_input').getValue();
			document.body.insertAdjacentHTML('beforeend', html);
			var node = document.body.children[document.body.children.length -1];
			
			var Widget = WAF.require('waf-core/widget');
			window.widget = Widget.instanceFromDom(node);
			Widget.body.attachWidget(window.widget);
		}
	};// @lock

	options.change = function options_change (event)// @startlock
	{// @endlock
		updateInputs();
	};// @lock

	widget_type.change = function widget_type_change (event)// @startlock
	{// @endlock
		updateInputs();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("auto", "change", auto.change, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("method", "change", method.change, "WAF");
	WAF.addListener("refresh_button", "click", refresh_button.click, "WAF");
	WAF.addListener("height", "change", height.change, "WAF");
	WAF.addListener("width", "change", width.change, "WAF");
	WAF.addListener("create_button", "click", create_button.click, "WAF");
	WAF.addListener("options", "change", options.change, "WAF");
	WAF.addListener("widget_type", "change", widget_type.change, "WAF");
// @endregion
};// @endlock
