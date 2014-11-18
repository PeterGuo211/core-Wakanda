/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/
// net object compatible with NodeJS.
// http://nodejs.org/docs/v0.5.1/api/net.html

// Only net.createConnection(), net.Socket constructor, net.isIP(), and net.isIPv4 
// functions are supported by current implementation. SSL hasn't been implemented.

var testCase = {

    name: 'Socket Test',
    
    _wait: {
    	before: 10000,
    	after: 	20000
    },

    _should: {

        ignore: {

        }

    },

    // Get the net object using require().

    setUp: function() {

        // TODO: Replace "requireNative()" with "require()" when possible.

        this.net = requireNative('net');

    },

    // Check if the net object exists.

    testIsPossibleToRunTest: function() {

        Y.Assert.isObject(this.net);

    },

    // Check "net.isIP" functions.

    testNetIsIPFunctions: function() {

        var net = this.net;

        Y.Assert.isObject(net.isIP);
        Y.Assert.isObject(net.isIPv4);
        Y.Assert.isObject(net.isIPv6);   // Function exists but will always fails.

    },

    testNetSocketAttributes: function() {

        var net = this.net;

        var socket = new net.Socket();

        Y.Assert.isObject(socket);

        // Instance functions.

        Y.Assert.isObject(socket.connect);
        Y.Assert.isObject(socket.setEncoding);
        Y.Assert.isObject(socket.setSecure);    // Function is there but not functionnal.
        Y.Assert.isObject(socket.write);
        Y.Assert.isObject(socket.end);
        Y.Assert.isObject(socket.destroy);
        Y.Assert.isObject(socket.pause);
        Y.Assert.isObject(socket.resume);
        Y.Assert.isObject(socket.setTimeout);
        Y.Assert.isObject(socket.setNoDelay);
        Y.Assert.isObject(socket.setKeepAlive);
        Y.Assert.isObject(socket.address);

        // Instance variables. With current implementation, writes are not buffered so bufferSize 
        // will always be zero. Attributes socket.remoteAddress and socket.remotePort are 
        // undefined if the socket isn't connected).

        Y.Assert.isNumber(socket.bufferSize);
        Y.Assert.areEqual(0, socket.bufferSize);

        Y.Assert.isUndefined(socket.remoteAddress);
        Y.Assert.isUndefined(socket.remotePort);

    },

    testNetIsIP: function() {

        // IPv6 is not tested as it is not supported.

        var net = this.net;

        // An IPv4 address has xxx.xxx.xxx.xxx format, 
        // note that "localhost" is not a "IPv4 address"
        // even if it is a valid "IP address".

        Y.Assert.areEqual(4, net.isIP("127.0.0.1"), 'net.isIP("127.0.0.1") should be 4');
        Y.Assert.areEqual(0, net.isIP("localhost"), 'net.isIP("localhost") should be 0');
        Y.Assert.areEqual(0, net.isIP("This is definitely not an IP address"), 'net.isIP("This is definitely not an IP address") should be 0');

        Y.Assert.isTrue(net.isIPv4("127.0.0.1"), 'net.isIPv4("127.0.0.1") should be true');
        Y.Assert.isFalse(net.isIPv4("localhost"), 'net.isIPv4("localhost") should be false');
        Y.Assert.isFalse(net.isIPv4("This is definitely not an IP address"), 'net.isIPv4("This is definitely not an IP address") should be false');

    },

    // Check createConnection() function using Wakanda HTTP web server.

    test_net_createConnection: function() {

        var net = this.net;
        var test = this;

        var socket = net.createConnection(8080, "127.0.0.1", function() {

            test.resume(function() {

                Y.Assert.isString(socket.remoteAddress);
                Y.Assert.isNumber(socket.remotePort);

                var address = socket.address();

                Y.Assert.areEqual(socket.remoteAddress, address.address);
                Y.Assert.areEqual(socket.remotePort, address.port);

                socket.destroy();

                Y.Assert.isUndefined(address.remoteAddress);
                Y.Assert.isUndefined(address.remotePort);

            });

        });

        this.wait(2000);

    },

    // Check socket.connect() function using Wakanda HTTP web server.

    test_netSocket_connect: function() {

        var net = this.net;
        var test = this;

        var socket = new net.Socket();

        socket.connect(8080, "127.0.0.1", function() {

            test.resume(function() {

                Y.Assert.isString(socket.remoteAddress);
                Y.Assert.isNumber(socket.remotePort); 

                var address = socket.address();

                Y.Assert.areEqual(socket.remoteAddress, address.address);
                Y.Assert.areEqual(socket.remotePort, address.port);

                socket.destroy();

                Y.Assert.isUndefined(address.remoteAddress);
                Y.Assert.isUndefined(address.remotePort);

            });

        });

        this.wait(2000);

    },

    // Check socket.connect() but with default argument.

    test_netSocket_connect2: function() {

        var net = this.net;
        var test = this;

        var socket = new net.Socket();

        socket.addListener('connect', function() {

            test.resume(function() {
                Y.Assert.isTrue(true);  
            });

        });
        
        // Default argument address is "localhost".

        socket.connect(8080);

        this.wait(5000);

    },

    // Check connection failure. If no "error" event listener is set, 
    // there will be an exception.

    testConnectionFailure: function() {

        var net = this.net;
        var test = this;

        var socket = new net.Socket();

        socket.addListener('error', function() {

            // Error catched.       

		    test.resume(function() {
		    	Y.Assert.isTrue(true);	
		    });
    		
        });
        
        // Port 1234 should be unused! (123 is used on Mac!)
    	
        socket.connect(1234, "127.0.0.1", function () {
        
            test.resume(function () {
                // Connection should fail, impossible to get there.
                Y.Assert.fail("Connection should fail, impossible to get there.");            
            });
        
        });
        
        // Leave more time for timeout.
    	
        this.wait(5000);
        
    },   

    testConnectionClose: function() {

        var net = this.net;
        var test = this;

        var socket = new net.Socket();

        socket.addListener('error', function() {

		    test.resume(function() {
    		
			    Y.Assert.fail("Connection failed to close.");  
    			
		    });
    		
        });

		// Do not support "half-close", consider them as "full" closing.
		
/*        
        socket.addListener('end', function () {
        	
    	    test.resume(function() {
        		
    		    // This won't be a "half-close".
        		
    		    Y.Assert.fail("Connection ended and failed to close.");
        		
    	    });
        	
        });
*/	

        socket.addListener('close', function (hasError) {

    	    test.resume(function () { 

			    Y.Assert.isFalse(hasError, "Connection closed with an error.");
    			
		    });
        	
        });
        	
        socket.connect(8080, "127.0.0.1", function () {
		
			// Write to server. This will trigger an answer from it, and it will then close
			// the connection.
		
			socket.write('get index.html\r\n');
			
        });
            	
        this.wait(10000);
        
    },    

    testBasicReadWrite: function () {
	    var net = this.net;
        var test = this;
        
        var socket = new net.Socket();

        socket.addListener('data', function (data) {
		
    	    // Server has replied, this is ok (whatever the content of answer, as long there is one).
			socket.destroy();
			
			test.resume(function () { 
				Y.Assert.isTrue(true);
			});
        	
        });
        
        socket.addListener('error', function(error) {

		    test.resume(function() {
    		
			    Y.Assert.fail("Error: " + JSON.stringify(error));  
    			
		    });
    		
        });
        	
        socket.connect(8080, "127.0.0.1", function () {
			socket.write('get index.html\r\n');
        });
        
        /*
	    var socket = net.createConnection(8080, "127.0.0.1", function()	{
    		
		    this.addListener("data", function(data){
    			
			    // Server has replied, ok.
      		
      		    this.destroy();
      		    test.resume(function () { 

				    Y.Assert.isTrue(data);
	    			
			    });
    			
		    });

		    // Send bad request to Wakanda server, it will answer with a 400 error.
    		
		    this.write('get index.html\r\n');
    		
	    });
    	*/
    	
	    this.wait(10000);
    	
    },

    testReadBufferingAndEncoding: function () {
    	
	    var net = this.net;
        var test = this;

	    var socket = net.createConnection(8080, "127.0.0.1", function()	{
    		
		    socket.addListener("data", function(data){
    			
     		    socket.destroy();
      		    test.resume(function () {
          			
      			    // Because setEncoding() has been called, data is a String
      			    // not a Buffer object.
          			
      			    Y.Assert.isString(data);
          			
      		    });
    			
		    });
    		
		    socket.addListener("close", function() {
    			
			    // Resume "data" events.
    			
				socket.resume();
    			
		    });
    		
		    // Pause data receiving (buffer received data, but don't emit "data" events).

		    socket.pause();				
		    socket.setEncoding("utf8");
		    socket.write('get index.html\r\n');    		
	    });
    	
	    this.wait(10000);
    	
    },

};