/*global Backbone, Notification*/
var app = app || {};

(function($) {
    'use strict';

    app.NotificationView = Backbone.View.extend({
        el: '#notifications',
        events: {
            'click': 'requestPermission'
        },
        initialize: function() {
            this.listenTo(app.contextItems, 'updated', this.notify);
        },
        notify: function(model) {
            var line =  model.get('line');
            
            if(line) {
                var message = model.get('file') + '\n' + line+ ': ' + model.get('code');
                var notification = new Notification('Remote debugger', {
                    "body": message,
                    "icon": "css/images/debugger.png"
                });
                setTimeout(function() {
                    notification.close();
                }, 5000);    
            }
        },
        requestPermission: function() {
            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification");
            }

            // Let's check if the user is okay to get some notification
            else if (Notification.permission === "granted") {
                // If it's okay let's create a notification
                new Notification('Remote debugger', {
                    "body": "Wakanda debugger notification is enabled now!",
                    "icon": "css/images/debugger.png"
                });
            }

            // Otherwise, we need to ask the user for permission
            // Note, Chrome does not implement the permission static property
            // So we have to check for NOT 'denied' instead of 'default'
            else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function(permission) {

                    // Whatever the user answers, we make sure Chrome stores the information
                    if (!('permission' in Notification)) {
                        Notification.permission = permission;
                    }

                    // If the user is okay, let's create a notification
                    if (permission === "granted") {
                        new Notification('Remote debugger', {
                            "body": "Wakanda debugger notification is enabled now!",
                            "icon": "css/images/debugger.png"
                        });
                    }
                });
            }
        }
    });


})(jQuery);




