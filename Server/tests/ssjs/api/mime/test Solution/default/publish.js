/**

* @author ouissam.gouni@4d.com

*/

// RH that launches local tests of MIMEWriter class
addHttpRequestHandler(
	"/testLocalMimeWriter",
	"publish.js",
	"testLocalMimeWriter"
);

addHttpRequestHandler(
	"/testLocalMimeMessage",
	"publish.js",
	"testLocalMimeMessage"
);

addHttpRequestHandler(
	"/testLocalMimeMessagePart",
	"publish.js",
	"testLocalMimeMessagePart"
);

function redirect(request, response, testFile){
	var ip = application.httpServer.ipAddress;
	var port = application.httpServer.port;
	var file = application.getFolder("path") + testFile;
	response.headers["Location"]= "http://" + ip + ":" + port + "/testServer?path=" + file;
	response.statusCode = 301;
}

function testLocalMimeWriter(request, response){
	redirect(request, response,"test0MimeMessage.js");
}

function testLocalMimeMessage(request, response){
	redirect(request, response,"test1MimeMessagePart.js");
}

function testLocalMimeMessagePart(request, response){
	redirect(request, response,"test2MimeWriter.js");
}
