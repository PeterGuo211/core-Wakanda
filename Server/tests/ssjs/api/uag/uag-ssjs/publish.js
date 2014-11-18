/**

* @author ouissam.gouni@4d.com

*/

// RH that launches local tests of Directory class
addHttpRequestHandler(
	"/testLocalDirectory",
	"publish.js",
	"testLocalDirectory"
);

// RH that launches tests of Directory class as they'll be runned by Jenkins
addHttpRequestHandler(
	"/testLikeJenkinsDirectory",
	"publish.js",
	"testLikeJenkinsDirectory"
);

// RH that launches local tests of User class
addHttpRequestHandler(
	"/testLocalUser",
	"publish.js",
	"testLocalUser"
);

// RH that launches tests of User class as they'll be runned by Jenkins
addHttpRequestHandler(
	"/testLikeJenkinsUser",
	"publish.js",
	"testLikeJenkinsUser"
);

// RH that launches local tests of Group class
addHttpRequestHandler(
	"/testLocalGroup",
	"publish.js",
	"testLocalGroup"
);

// RH that launches tests of Group class as they'll be runned by Jenkins
addHttpRequestHandler(
	"/testLikeJenkinsGroup",
	"publish.js",
	"testLikeJenkinsGroup"
);

// RH that launches local tests of Session class
addHttpRequestHandler(
	"/testLocalSession",
	"publish.js",
	"testLocalSession"
);

// RH that launches tests of Session class as they'll be runned by Jenkins
addHttpRequestHandler(
	"/testLikeJenkinsSession",
	"publish.js",
	"testLikeJenkinsSession"
);


function redirect(request, response, testFile){
	var ip = application.httpServer.ipAddress;
	var port = application.httpServer.port;
	var file = application.getFolder("path") + testFile;
	response.headers["Location"]= "http://" + ip + ":" + port + "/testServer?path=" + file;
	response.statusCode = 301;
}

function testLocalDirectory(request, response){
	redirect(request, response,"test-directory.js");
}

function testLikeJenkinsDirectory(request, response){
	redirect(request, response,"../testDirectory.js");
}

function testLocalUser(request, response){
	redirect(request, response,"test-user.js");
}

function testLikeJenkinsUser(request, response){
	redirect(request, response,"../testUser.js");
}

function testLocalGroup(request, response){
	redirect(request, response,"test-group.js");
}

function testLikeJenkinsGroup(request, response){
	redirect(request, response,"../testGroup.js");
}

function testLocalSession(request, response){
	redirect(request, response,"test-session.js");
}

function testLikeJenkinsSession(request, response){
	redirect(request, response,"../testSession.js");
}