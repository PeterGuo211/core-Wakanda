/*global Backbone */
var app = app || {};

(function() {
    'use strict';

    app.Chromium = Backbone.View.extend({
        el: '#framesDiv',
        
        initialize: function() {
            this.listenTo(app.contextItems, 'add', this.addDebuggerFrame); 
        },
        
        addDebuggerFrame: function(contextItem) {
            var view = new app.DebuggerFrameView({model: contextItem});
            this.$el.append(view.el);
        } 
    });   
    
})();




