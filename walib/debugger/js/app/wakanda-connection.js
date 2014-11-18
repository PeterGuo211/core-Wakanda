/*global $ */
/*jshint unused:false */
var app = app || {};


$(function() {
    'use strict';

    app.wakandaConnection = (function() {
        var ws, wsUrl, module, rpcUrl;

        module = {};
        var protocol  = window.location.protocol;
        rpcUrl = protocol+ "//" + window.location.hostname + ":" + window.location.port + "/rpc/";

        wsUrl = protocol === "https:" ? "wss:" : "ws:";
        wsUrl +=  "//" + window.location.hostname + ":" + window.location.port + "/wka_dbg/devtools/remote_debugger_ws";
 
        var query = function(method, param) {

            if (!param) {
                param = '';
            }

            var ajaxParams = {
                type: "POST",
                contentType: "text/plain; charset=utf-8",
                data: '{"jsonrpc":"2.0","module":"webAdmin","method":"' + method + '","params":[' + param + ']}',
                dataType: "json"
            };

            return $.ajax(rpcUrl, ajaxParams);
        };
        
        var startDebugger = function() {
            return query('startDebugger');
        };
        
        // Set default debegguer to remote debugger
        var setDebuggerServer = function() {
            return query('setDebuggerServer', 1);
        };

        var getDebuggerStatus = function() {
            return query('getDebuggerStatus');
        };

        var checkDebuggerStatus = function(status, recursionDisabled, successCallBack) {
            var isStarted = status.started,
                    isConnected = status.debuggerConnected,
                    debuggerType = status.debuggerType;

            switch (debuggerType) {
                case "REMOTE_DEBUGGER":
                    if (!isStarted) {
                        startDebugger().done(function() {
                            getDebuggerStatus().done(function(response) {
                                var status = JSON.parse(response.result);
                                if (recursionDisabled) {
                                    // Can't start the debugger
                                    $.publish("stateChanged", "Unavailable (Debugger is off)");
                                } else {
                                    $.publish("stateChanged", "Loading...");
                                    checkDebuggerStatus(status, true, successCallBack);
                                }
                            });
                        });
                    } else {
                        if (isConnected) {
                            $.publish("stateChanged", "Loading...");
                            window.setTimeout(function() {
                                getDebuggerStatus().done(function(response) {
                                    var status = JSON.parse(response.result);
                                    if (recursionDisabled) {
                                        $.publish('stateChanged', 'Unavailable (Debugger already in use)');
                                    } else {
                                        checkDebuggerStatus(status, true, successCallBack);
                                    }
                                });
                            }, 3000);

                        } else {
                            successCallBack();
                        }
                    }

                    break;
                case "WAKANDA_DEBUGGER":
                    if (!isStarted || (isStarted && !isConnected)) {
                        setDebuggerServer().done(function() {
                            getDebuggerStatus().done(function(response) {
                                var status = JSON.parse(response.result);
                                checkDebuggerStatus(status, true, successCallBack);
                            });
                        });
                    } else {
                        $.publish('stateChanged', 'Unavailable (Debugger already in use)');
                    }
                    break;
                case "NO_DEBUGGER":
                    $.publish('stateChanged', 'Unavailable (There is no debugger available on the server)');
                    break;
                default:
                    $.publish('stateChanged', 'Unavailable (Debugger status unknown)');//Should not happen
                    console.log('Wrong variables', status);
            }
        };
        
        var onMessage = function(msg) {
            var jsonMsg = JSON.parse(msg.data);


            if (jsonMsg.solution) {
                $.publish('stateChanged', ['OPEN', jsonMsg.solution]);
            }

            if (jsonMsg.result === "ok" && jsonMsg.needsAuthentication === true) {
                // TODO: authenticate
                return;
            }
            if (jsonMsg.method) {
                $.publish(jsonMsg.method, jsonMsg);
            }
        };

        var onOpen = function() {
            ws.send('{"method":"connect","id":"GuyHERMANN"}');
            $.publish('stateChanged', 'CONNECTING');
        };

        var onClose = function() {
            $.publish('stateChanged', 'CLOSED');
        };
        var onError = function() {
            $.publish('stateChanged', 'ERROR');
        };
        
        // Connect if the remote debugger is On and no one is using it
        module.connect = function() {
            getDebuggerStatus().done(function(response) {
                var status = JSON.parse(response.result);
                
                checkDebuggerStatus(status, false, function() {
                    ws = new WebSocket(wsUrl);
                    ws.onopen = onOpen;
                    ws.onmessage = onMessage;
                    ws.onclose = onClose;
                    ws.onerror = onError;
                });
                
            });
        };

        module.getConnection = function() {
            return ws;
        };

        return module;

    }());
});