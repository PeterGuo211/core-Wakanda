        var test = async_test("W3C WebSocket API - Create WebSocket - Close the Connection - close(undefined) - INVALID_ACCESS_ERR is thrown");

        var wsocket = CreateWebSocket(false, false, false);
        var isOpenCalled = false;

        wsocket.addEventListener('open', test.step_func(function (evt) {
            assert_throws("INVALID_ACCESS_ERR", function () { wsocket.close(undefined) });
            clearTimeout(timeOut);
            test.done();
        }), true);