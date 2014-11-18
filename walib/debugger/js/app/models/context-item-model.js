/*global Backbone */
var app = app || {};

(function() {
    'use strict';

    app.ContextItemModel = Backbone.Model.extend({
        defaults: {
            id: '', // context id
            file: '', // file name
            line: '', // line number
            code: '',  // code snippet
            url:'', //  frame Url, each context have a unique URL 
            hidden: true // wether the context is hidden or active
        }
    });

})();



