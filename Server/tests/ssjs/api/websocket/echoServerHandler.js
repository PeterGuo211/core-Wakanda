// WebSocket echo server implemented using a SharedWorker type WebSocket handler.

onconnect = function (event) {
	
	var webSocket	= event.ports[0];
	
	webSocket.binaryType = "string";	// Tests only use strings.
	webSocket.onmessage = function (message) {
		
		trace("received " + message.data + "\n");
		webSocket.postMessage(message.data); 	// message.data is "string" as required by binaryType.
		
	}

}