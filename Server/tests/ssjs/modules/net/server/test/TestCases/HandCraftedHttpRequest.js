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
////////////////////////////////////////////////////////////////////////////////
//
// Perform a basic HTTP request through socket ; Log request/response
//
////////////////////////////////////////////////////////////////////////////////

function testPerformSimpleGet() {
			
	var haïkuLog=new Log("haïku.txt");
	haïkuLog.date();

	var responseBuf=new Buffer(0);

	var sock=new net.Socket();

	sock.connect(8081, "127.0.0.1", function() {
		
		requestBuf=new Buffer(
"GET /haiku.html HTTP/1.1\r\n\
Host: 127.0.0.1:8081\r\n\
\r\n"
		);

		haïkuLog.append("Request...").append(requestBuf.toString('utf8', 0, requestBuf.length));

		sock.write(requestBuf);

		sock.addListener('data', function(buf) {
										
			haïkuLog.append("Response...").append(buf.toString('utf8', 0, buf.length));
			
			responseBuf=ConcatBuffers(responseBuf, buf);
		})
		
		sock.addListener('end', function() {
			
			haïkuLog.append("End !");
						
			exitWait();	
		})
		
		sock.addListener('close', function(err) {

			if(!err)
				haïkuLog.append("Close (no error) !");
			else
			{
				haïkuLog.append("Close (with error) !");

				Y.Assert.fail("Connection closed with an error.");
			}
						
			exitWait();	
		})
		
		sock.addListener('error', function(err) {
						
			exitWait();	
		})
	})	
	
	//BUG - Le wait marche pas bien ! Mieux vaut trop que pas assez !
	wait(123);
	wait(123);
	wait(123);
	wait(123);
	wait(123);
		
	//Check the haïku integrity !
	var responseString=responseBuf.toString('utf8', 0, responseBuf.length);
	var pos1=responseString.indexOf('古池や', 0);
	var pos2=responseString.indexOf('蛙飛込む', pos1);
	var pos3=responseString.indexOf('水の音', pos2);
	
	Y.Assert.isTrue(pos1>0 && pos2>pos1 && pos3>pos2, "Check read data integrity : ");

	haïkuLog.date().append("Done !");

	sock.destroy();
}


////////////////////////////////////////////////////////////////////////////////
//
// Perform a basic HTTPS request through socket ; Log request/response
//
////////////////////////////////////////////////////////////////////////////////

function testPerformSecureGet() {
	
	var haïkuLog=new Log("haïkuS.txt");
	haïkuLog.date();

	var responseBuf=new Buffer(0);

	var sock=tls.connect(4434, "127.0.0.1", function() {
		requestBuf=new Buffer(
"GET /haiku.html HTTP/1.1\r\n\
Host: 127.0.0.1:4434\r\n\
Connection: close\r\n\
\r\n"
		);
		

		haïkuLog.append("Request...").append(requestBuf.toString('utf8', 0, requestBuf.length));

		sock.write(requestBuf);

		sock.addListener('data', function(buf) {							
			haïkuLog.append("Response...").append(buf.toString('utf8', 0, buf.length));
			
			responseBuf=ConcatBuffers(responseBuf, buf);
		})
		
		sock.addListener('end', function() {
			haïkuLog.append("End !");
			
			exitWait();	
		})
		
		sock.addListener('close', function(err) {
			if(!err)
				haïkuLog.append("Close (no error) !");
			else
				haïkuLog.append("Close (with error) !");

			Y.Assert.isFalse(error, "Connection closed with an error.");
			
			exitWait();	
		})
	})
	
	wait();
	
	//Check the haïku integrity !
	var responseString=responseBuf.toString('utf8', 0, responseBuf.length);
	var pos1=responseString.indexOf('古池や', 0);
	var pos2=responseString.indexOf('蛙飛込む', pos1);
	var pos3=responseString.indexOf('水の音', pos2);
	
	Y.Assert.isTrue(pos1>0 && pos2>pos1 && pos3>pos2, "Check read data integrity : ");

	haïkuLog.date().append("Done !");

	sock.destroy();
}
