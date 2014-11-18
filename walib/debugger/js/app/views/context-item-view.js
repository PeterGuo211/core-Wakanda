/*global Backbone, jQuery, _*/
var app = app || {};

(function($) {
    'use strict';
    
    // The DOM element for a single context in our navigation menu
    app.ContextItemView = Backbone.View.extend({
        tagName: 'div',
        className: 'context hidden', 
        statsTemplate: _.template($('#contextItemTemplate').html()),
        
        events: {
            'click .context .abort_button': 'abort',
            'click .context .expand': 'expand'
        },
        
        // Only context id is known at initializing
        // line, file and code attributes are set upon recieving
        // update message.
        // context are hidden if line attribute is not set, or
        // a hideContext message is recieved
        initialize: function() {
            
            this.$el.attr('id', this.model.get('id'));
            
            // update the view after recieving the 
            this.listenTo(this.model, 'change:line', this.update);            
            this.listenTo(this.model, 'selected', this.select);
            this.listenTo(this.model, 'deselected', this.deselected);            
            this.listenTo(this.model, 'change:hidden', this.toggle);
            this.listenTo(this.model, 'destroy', this.remove);

            this.render();
        },
        
        render: function() {
            this.$el.html(this.statsTemplate(this.model.toJSON()));
            return this; 
        },
        
        update: function() {
            // trigger toggle function to show the context
            if ( this.model.get('line') !== '') {                
                this.model.set({hidden: false});
            }
            
            // re-render with the new breaked line information 
            this.render();
        },
        
        select: function () {
            this.$el.addClass("cur_context expanded");
        },
        
        deselected: function () {
            this.$el.removeClass("cur_context expanded");
        },
        
        abort: function (event) {
            event.stopPropagation();
            var cnx = app.wakandaConnection.getConnection();
            cnx.send('{"method":"abort","id":"' + this.model.get('id') + '"}');
        },
        
        expand: function (event) {
            event.stopPropagation();
            this.$el.toggleClass('expanded');
        },
        
        toggle: function() {
            if(this.model.get('hidden')) {
                this.$el.addClass("hidden");
            } else {
                this.$el.removeClass("hidden");
            }           
        }
    });
})(jQuery);




