        test(function () {
            var wsocket;
            var spaceUrl = "html5labs interop.cloudapp.net";
            assert_throws("SYNTAX_ERR", function () { wsocket = CreateWebSocketWithSpaceInUrl(spaceUrl) });
        }, "W3C WebSocket API - Create Secure WebSocket - Pass a URL with a space - SYNTAX_ERR should be thrown")            