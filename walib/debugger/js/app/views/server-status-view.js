/*global Backbone, jQuery, _ */
var app = app || {};

(function($) {
    'use strict';

    app.ServerStatusView = Backbone.View.extend({
        // The DOM element for the connection status
        el: "#states",
        
        // Cache the template function for our status.
        statsTemplate: _.template($('#serverStatusTemplate').html()),
        
        initialize: function() {

            // re-render the view whenever the status model has changed
            this.listenTo(app.serverStatusModel, 'change', this.render);
            this.render();
        },
        
        // Re-render the status
        render: function() {
            var model = app.serverStatusModel; // just to shorten the variable
            this.$el.html(this.statsTemplate(model.toJSON()));
            
            if (model.get("status") === "OPEN") {
                this.$("#wakserv_state").attr('class', 'success');
            } else {
                this.$("#wakserv_state").attr('class', 'warning');
            }
        }
    });


})(jQuery);


