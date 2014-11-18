/*global Backbone, jQuery */
var app = app || {};

(function($) {
    'use strict';

    app.ContextItemsView = Backbone.View.extend({
        
        el: "#contexts",
        
        // Delegat events for selecting a context from the list
        events: {
            'click .context' : 'selectContext'
        },
        
        initialize: function() {
            this.$contextsLists = this.$el.find("#contexts_list");
            this.$el.resizable( {
                handles     : "e" ,
                distance    : 0 ,
                delay       : 0 ,
                start : function ( ) {
                    $( '#framesDiv iframe' ).css( 'pointer-events' , 'none' );
                } ,
                stop : function ( ) {
                    $( '#framesDiv iframe' ).css( 'pointer-events' , 'auto' );
                }
            });
            // render each new added context
            this.listenTo(app.contextItems, 'add', this.addContextItem);
        },
        
        // Add a single context item to context list by creating a view for it, and
        // appending its element to this view
        addContextItem: function(contextItem) {
            var view = new app.ContextItemView({model: contextItem});
            this.$contextsLists.append(view.render().el);
        },
        
        
        // selects the context whose id in the collection 
        // is passed in the event parameter.
        selectContext: function(event) {
            var id = event.currentTarget.id;
            var model = app.contextItems.get(id);
            if (model) {
                app.contextItems.setSelected(model);
            }
        }
    });

    
})(jQuery);


