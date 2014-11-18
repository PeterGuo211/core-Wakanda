/*global Backbone */
var app = app || {};

(function() {
    'use strict';

    var ContextItems = Backbone.Collection.extend({
        model: app.ContextItemModel,
        localStorage: new Backbone.LocalStorage('wakanda-debugger'),
        
        initialize: function() {
            this.selected = null;
            this.on("change:hidden", this.check, this);
            this.on("change:file", this.updated, this);
        },
        updated: function(model) {
            this.trigger('updated', model);
        },
        setSelected: function(model) {
            if (this.selected) {
                this.selected.trigger('deselected');
            }
            this.selected = model;
            model.trigger('selected');
        },
        
        check: function(model) {
            if (this.selected === model) {
                var actives = this.active();
                if (actives.length >0 ) {
                    this.setSelected(actives[0]);
                }
            }
        },
        
        // Filter down the list of all hidden context.
        hidden: function() {
            return this.filter(function(context) {
                return context.get('hidden');
            });
        },
        
        // Filter down the list to only active context.
        active: function() {
            return this.without.apply(this, this.hidden());
        }
    });

    app.contextItems = new ContextItems();
})();
