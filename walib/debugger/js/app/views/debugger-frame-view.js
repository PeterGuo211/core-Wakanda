/*global Backbone */
var app = app || {};

(function() {
    'use strict';

    app.DebuggerFrameView = Backbone.View.extend({
        tagName: 'iframe', // wrape the view in an iframe tag

        className: 'debugFrame',
        
        initialize: function() {

            var contextId = this.model.get('id');
            this.$el.attr('id', 'frame-' + contextId);


            this.listenTo(this.model, 'change:file', this.getUrl);
            this.listenTo(this.model, 'change:url', this.setUrl);
            this.listenTo(this.model, 'change:hidden', this.toggle);
            this.listenTo(this.model, 'selected', this.show);
            this.listenTo(this.model, 'deselected', this.hide);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        
        setUrl: function() {
            this.$el.attr('src', this.model.get('url'));
            this.toggle();
        },
        
        getUrl: function() {
            var contextId = this.model.get('id');
            if(this.model.get('file') !== '') {
                app.wakandaConnection.getConnection().send('{"method":"getURL","id":"' + contextId + '"}');
            }
        },
        
        toggle: function() {
            if (this.model.get('hidden')) {
                this.hide();
            } else {
                this.show();
            }
        },
        show: function() {
            this.$el.show();
        },
        hide: function() {
            this.$el.hide();
        }
    });
})();