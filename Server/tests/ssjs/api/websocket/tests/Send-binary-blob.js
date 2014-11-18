        var testOpen = async_test("W3C WebSocket API - Send binary data on a WebSocket - Blob - Connection should be opened");
        var testMessage = async_test("W3C WebSocket API - Send binary data on a WebSocket - Blob - Message should be received");
        var testClose = async_test("W3C WebSocket API - Send binary data on a WebSocket - Blob - Connection should be closed");

        var data = "";
        var datasize = 65000;
        var isOpenCalled = false;

        var wsocket = CreateWebSocket(false, false, false);

        wsocket.addEventListener('open', testOpen.step_func(function (evt) {
            wsocket.binaryType = "buffer";  // "blob";
            data = new Buffer(datasize); // new ArrayBuffer(datasize);
            isOpenCalled = true;
            wsocket.send(data);
            testOpen.done();
        }), true);

        wsocket.addEventListener('message', testMessage.step_func(function (evt) {
            //assert_true(evt.data instanceof Blob);
            assert_true(evt.data instanceof Buffer);
            assert_equals(/*evt.data.size*/ evt.data.length, datasize);
            wsocket.close();
            testMessage.done();
        }), true);

        wsocket.addEventListener('close', testClose.step_func(function (evt) {
            assert_true(isOpenCalled, "WebSocket connection should be open");
            assert_true(evt.wasClean, "wasClean should be true");
            clearTimeout(timeOut);
            testClose.done();
        }), true);