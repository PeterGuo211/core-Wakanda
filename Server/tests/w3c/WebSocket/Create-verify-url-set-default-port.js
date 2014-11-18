        test(function () {
            //
            // The w3c-test web server is already running on port 80 so the Jetty server runs on 8080
            //
            // This blocks testing this part of the specification.
            // So as a simple work around use the html5 labs public Jetty
            //
            wsocket = new WebSocket("ws://html5labs-interop.cloudapp.net:80/echo");
            var urlNormalized = "ws://html5labs-interop.cloudapp.net/echo";
            assert_equals(wsocket.url, urlNormalized, "wsocket.url is set correctly");
            wsocket.close();
        }, "W3C WebSocket API - Create WebSocket - wsocket.url should be set correctly")