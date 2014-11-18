var testCase = {

    name: "WebSocketW3C",

    _should: {

        ignore: {

        }

    },

    setUp: function() {

        this.w3c_test = require("./w3c_test");
	//	httpServer.addWebSocketHandler("/echo", "echoServerHandler.js", "test", true);

    },
    
	tearDown: function() {
	
	  //  httpServer.removeWebSocketHandler("/echo");
	
	},
    
/*
	testHTTPServer: function() {
	
		// This test just disables SSL testing if the HTTP server doesn't have SSL enabled.

		if (!httpServer.ssl.enabled) {
		
			this._should.ignore.testSecureSendData = true;
			this._should.ignore.testSecureSendUnicodeData = true;
			this._should.ignore.testSecureSend65KData = true;
			this._should.ignore.testSecureSendBinaryBlob = true;
		
		}
	
		Y.assert(httpServer.ssl.enabled == true, "Wakanda's HTTP server must have SSL enabled to test secure WebSocket.");
	
	}, 
*/    

    testSendData: function() {
    	
    	var result	= this.w3c_test.executeTest("./tests/Send-data.js", "./websocket.js", 10000);

		this.w3c_test.assertInYUI(Y, result);
    
    },

    testSendUnicodeData: function() {
    
    	var result	= this.w3c_test.executeTest("./tests/Send-unicode-data.js", "./websocket.js", 10000);
		
		this.w3c_test.assertInYUI(Y, result);		

    },    

    testSend65KData: function() {
    
        // Give it more time because 65k a bit more of data.
    	
        var result	= this.w3c_test.executeTest("./tests/Send-65K-data.js", "./websocket.js", 10000);
		
		this.w3c_test.assertInYUI(Y, result);

    },

    testSendBinaryBlob: function() {
    
        var result	= this.w3c_test.executeTest("./tests/Send-binary-blob.js", "./websocket.js");

		this.w3c_test.assertInYUI(Y, result);
        
    },

/*

    // ws://echo.websocket.org server is unable to echo back zero length message.
	
    testSend0ByteData: function() {
    
    	var result	= this.w3c_test.executeTest("./tests/Send-0byte-data.js", "./websocket.js");
    	
		this.w3c_test.assertInYUI(Y, result);
        
    },
*/    
  
    testSecureSendData: function() {
    	
    	var result	= this.w3c_test.executeTest("./tests/Secure-Send-data.js", "./websocket.js", 10000);
    	
		this.w3c_test.assertInYUI(Y, result);
    	
    },

    testSecureSendUnicodeData: function() {
    	
    	var result	= this.w3c_test.executeTest("./tests/Secure-Send-unicode-data.js", "./websocket.js", 10000);
		
		this.w3c_test.assertInYUI(Y, result);

    },    
	
    testSecureSend65KData: function() {
    
        // Also give it more time because 65k a bit more of data.
    	
    	var result	= this.w3c_test.executeTest("./tests/Secure-Send-65K-data.js", "./websocket.js", 10000);
    	
    	this.w3c_test.assertInYUI(Y, result);
        
    },
	
    testSecureSendBinaryBlob: function() {
    	
    	var result	= this.w3c_test.executeTest("./tests/Secure-Send-binary-blob.js", "./websocket.js");
		
		this.w3c_test.assertInYUI(Y, result);
		
    },

    testCreateValidURL: function() {
    	
        var result	= this.w3c_test.executeTest("./tests/Create-valid-url.js", "./websocket.js");
		
		this.w3c_test.assertInYUI(Y, result);

    },

    testCreateValidURLProtocol: function() {
    	
        var result	= this.w3c_test.executeTest("./tests/Create-valid-url-protocol.js", "./websocket.js");
		
		this.w3c_test.assertInYUI(Y, result);
		
    },    

    testCreateValidURLProtocolEmpty: function() {
    	
        var result	= this.w3c_test.executeTest("./tests/Create-valid-url-protocol-empty.js", "./websocket.js");
		
		this.w3c_test.assertInYUI(Y, result);
		
    },        

    testCreateValidURLArrayProtocols: function() {
    	
    	var result	= this.w3c_test.executeTest("./tests/Create-valid-url-array-protocols.js", "./websocket.js", 10000);
		
		this.w3c_test.assertInYUI(Y, result);
		
    }

/*
	// Need to work on compliance.

    testCreateVerifyURLSetDefaultPort: function() {
    	
    	var result	= this.w3c_test.executeTest("./tests/Create-verify-url-set-default-port.js", "./websocket.js");
		
		this.w3c_test.assertInYUI(Y, result);

    },
*/
};