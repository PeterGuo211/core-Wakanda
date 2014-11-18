/*global $ */
/*jshint unused:false */
var app = app || {};


app.util = {
    getBrowserInfo: function() {
        'use strict';
        var N = navigator.appName,
                ua = navigator.userAgent,
                tem;
        var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        tem = ua.match(/version\/([\.\d]+)/i);
        if (M && tem !== null) {
            M[2] = tem[1];
        }
        M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];

        return {
            majorVersion: +M[1].substr(0, M[1].indexOf('.')),
            version: M[1],
            type: M[0]
        };
    },
    isBrowserSupported: function() {
        'use strict';

        var isChrome, isSafari, browser;

        browser = this.getBrowserInfo();

        isChrome = browser.type === "Chrome" && browser.majorVersion >= 19;
        isSafari = browser.type === "Safari" && browser.majorVersion >= 6;
        return (isChrome || isSafari);
    }
};

(function($) {
    'use strict';
    var o = $({});

    $.subscribe = function() {
        o.on.apply(o, arguments);
    };

    $.unsubscribe = function() {
        o.off.apply(o, arguments);
    };

    $.publish = function() {
        o.trigger.apply(o, arguments);
    };

}(jQuery));
