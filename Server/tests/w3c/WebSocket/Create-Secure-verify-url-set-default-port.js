        test(function () {
            //
            // The w3c-test web server is already running on port 443 so the Jetty server runs on 8443
            //
            // This blocks testing this part of the specification.
            // So as a simple work around use the html5 labs public Jetty
            //
            wsocket = new WebSocket("wss://html5labs-interop.cloudapp.net:443/echo");
            var urlNormalized = "wss://html5labs-interop.cloudapp.net/echo";
            assert_equals(wsocket.url, urlNormalized, "wsocket.url is set correctly");
            wsocket.close();
        }, "W3C WebSocket API - Create Secure WebSocket - wsocket.url should be set correctly")