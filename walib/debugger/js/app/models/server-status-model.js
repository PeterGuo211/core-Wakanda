/*global Backbone */
var app = app || {};

(function() {
    'use strict';

    var ServerStatusModel = Backbone.Model.extend({
        defaults: {
            status: 'Loading...',
            solution: ''
        }
    });
    
    app.serverStatusModel = new ServerStatusModel();
    
})();
