        test(function () {
            var wsocket;
            var blockedPort = 25;
            assert_throws("SECURITY_ERR", function () { wsocket = CreateWebSocketWithBlockedPort(blockedPort) });
        }, "W3C WebSocket API - Create Secure WebSocket - Pass a URL with a blocked port - SECURITY_ERR should be thrown")