        var testOpen = async_test("W3C WebSocket API - Create WebSocket - Close the Connection - close(reason with unpaired surrogates) - connection should get opened");
        var testClose = async_test("W3C WebSocket API - Create WebSocket - Close the Connection - close(reason with unpaired surrogates) - connection should get closed");

        var wsocket = CreateWebSocket(false, false, false);
        var isOpenCalled = false;
        var reason = "\uD807";

        wsocket.addEventListener('open', testOpen.step_func(function (evt) {
            wsocket.close(1000, reason);
            isOpenCalled = true;
            testOpen.done();
        }), true);

        wsocket.addEventListener('close', testClose.step_func(function (evt) {
            assert_true(isOpenCalled, "WebSocket connection should be opened");
            clearTimeout(timeOut);
            testClose.done();
        }), true);