WAF.define('Button', ['waf-core/widget'], function(Widget) {
    "use strict";

    var Button = Widget.create('Button', 'Text', {
        tagName: 'button'
    });
    Button.removeClass('waf-text');

    Button.inherit(WAF.require('waf-behavior/focus'));

    Button.mapDomEvents({ 'mousedown': 'action' });

    return Button;
});
