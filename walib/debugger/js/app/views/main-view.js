/*global Backbone, jQuery */
var app = app || {};

(function($) {
    'use strict';
    // Our overall **MainView** is the top-level piece of UI.
    app.MainView = Backbone.View.extend({
        
        // bind the App to the body
        el: "body",
    
        
        // At initialization we create our three main views, 
        // kick things off by connecting to wakanda server 
        // and listening to websockets messages
        initialize: function() {
            this.chromium = new app.Chromium();
            this.serverStatusView = new app.ServerStatusView();
            this.contextItemsView = new app.ContextItemsView();
            app.notificationView = new app.NotificationView();
            
            
            app.wakandaConnection.connect();
            
            // Delegated events for manipulating contexts
            $.subscribe('newContext', this.newContext);
            $.subscribe('hideContext', this.hideContext);
            $.subscribe('updateContext', this.updateContext);
            $.subscribe('setURLContext', this.setURLContext);
            $.subscribe('breakpointsUpdate', this.breakpointsUpdate);
            
            // triggered when the websocket connection is opening, open or closed  
            $.subscribe('stateChanged', this.changeStatus); 
            
            app.contextItems.on('reset', function(col, opts){
                _.each(opts.previousModels, function(model){
                    model.trigger('destroy');
                });
            });

        },
        
        changeStatus: function(e, status, solutionName) {
            app.serverStatusModel.set({status: status, solution: solutionName});
            if( status === "CLOSED") {
              app.contextItems.reset();    
            } 
        },
                
        // A new context has been created
        newContext: function(e, response) {
            app.contextItems.create({'id': response.contextId});
            app.wakandaConnection.getConnection().send('{"result":"ok","id":"' + response.id + '"}');
            console.log('A new context is created ('+response.contextId+')');
        },
        
        // Breakpoint reached, context stopped
        updateContext: function(e, response) {
            var model = app.contextItems.get(response.contextId);
            if (model) {
                model.set({
                    file: response.debugFileName,
                    line: response.debugLineNb,
                    code: response.sourceLine.substr(0, 40) + '...'
                });
                
                app.contextItems.setSelected(model);
            } else {
                console.warn('Update of a non existent context ('+response.contextId+')');
            }
        },
        
        setURLContext: function(e, response) {
            var url, model;

            model = app.contextItems.get(response.contextId);
            if (model) {
                url = "/walib/debugger/devtools/devtools.html?host=" + window.location.hostname +
                        ":" + window.location.port + "&page=" + response.url;
                model.set({'url': url, 'hidden': false});
                console.log('Set frame url ('+response.contextId+')');
            }
        },
        
        // list of breakpoints recieved
        breakpointsUpdate: function(e, response) {
            console.log('Update breakpoints');
            function _cleanFileName(path) {
                var pathParts = path.split('/');
                if (pathParts[0] !== '..') {
                    return path;
                }
                var solutionName = pathParts[1];
                pathParts.splice(0, 1);
                return 'http://' + solutionName + '/' + pathParts.join('/');
            }
            var tmp = [];
            var bps;
            for (var j = 0; j < response.breakpoints.length; j++) {
                bps = response.breakpoints[j];
                bps.filename = _cleanFileName(bps.filename);
                for (var i = 0; i < bps.lines.length; i++) {
                    tmp.push({"sourceFileId": bps.filename, "lineNumber": bps.lines[ i ], "condition": "", "enabled": true});
                }
            }
            localStorage.breakpoints = JSON.stringify(tmp);
        },
        
        // Context stopped executing
        hideContext: function(e, response) {
            var model = app.contextItems.get(response.contextId);
            if (model) {
                model.set({
                    hidden: true,
                    file: '',
                    line: '',
                    code: '',
                    url: ''
                });
                app.wakandaConnection.getConnection().send('{"result":"ok","id":"' + response.id + '"}');
                console.log('Hide context ('+response.contextId+')');
            }
        },
        
        // Context destroyed
        removeContext: function(e, response) {
            var model = app.contextItems.get(response.contextId);
            if (model) {
                model.destroy();               
                app.wakandaConnection.getConnection().send('{"result":"ok","id":"' + response.id + '"}');
                console.log('Remove context ('+response.contextId+')');
            }
        }

    });

    
})(jQuery);