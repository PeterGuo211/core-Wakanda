
     
        var testOpen = async_test("W3C WebSocket API - Create WebSocket - set binaryType to something other than blob or arraybuffer - SYNTAX_ERR is returned - Connection should be opened");
        var testClose = async_test("W3C WebSocket API - Create WebSocket - set binaryType to something other than blob or arraybuffer - SYNTAX_ERR is returned - Connection should be closed");

        var wsocket = CreateWebSocket(true, false, false);
        var isOpenCalled = false;

        wsocket.addEventListener('open', testOpen.step_func(function (evt) {
            assert_throws("SYNTAX_ERR", function () { wsocket.binaryType = "notBlobOrArrayBuffer" });
            wsocket.close();
            isOpenCalled = true;
            testOpen.done();
        }), true);

        wsocket.addEventListener('close', testClose.step_func(function (evt) {
            assert_true(isOpenCalled, "WebSocket connection should be opened");
            assert_true(evt.wasClean, "wasClean should be true");
            clearTimeout(timeOut);
            testClose.done();
        }), true);
