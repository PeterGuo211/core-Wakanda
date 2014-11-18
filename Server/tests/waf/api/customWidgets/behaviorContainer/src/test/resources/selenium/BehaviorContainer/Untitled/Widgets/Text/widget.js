WAF.define('Text', ['waf-core/widget'], function(Widget) {
    "use strict";

    var Text = Widget.create('Text', {
        init: function() {
            this.node.innerHTML = this.value();
        },
        value: Widget.property({
            onChange: function() {
                this.node.innerHTML = this.value();
            },
            defaultValueCallback: function() {
                return this.node.innerHTML;
            }
        })
    });

    return Text;
});
