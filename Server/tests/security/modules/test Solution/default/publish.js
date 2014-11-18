/**

* @author soufiane.tigrioui@4d.com

*/

// RH that launches local tests of MIMEWriter class
addHttpRequestHandler(
	"/testModuleSecurity",
	"publish.js",
	"testModuleSecurity"
);


function redirect(request, response, testFile){
	var ip = application.httpServer.ipAddress;
	var port = application.httpServer.port;
	var file = application.getFolder("path") + testFile;
	response.headers["Location"]= "http://" + ip + ":" + port + "/testServer?path=" + file;
	response.statusCode = 301;
}

function testLocalMimeWriter(request, response){
	redirect(request, response,"testModuleSecurity.js");
}



