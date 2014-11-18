/*global $ */
/*jshint unused:false */
var app = app || {};


$(function() {
    'use strict';

    if (app.util.isBrowserSupported()) {
        // kick off the app
        new app.MainView();
    } else {
        // TODO: show the message in browser and not in console
        console.warn('We are sorry but your browser is not compatible. Please use either Chrome v 19+ or Safari v 6+.');
    }
});
