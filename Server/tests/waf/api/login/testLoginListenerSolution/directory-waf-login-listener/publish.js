/**

* @author ouissam.gouni@4d.com

*/

directory.setLoginListener("myLogin");

addHttpRequestHandler(
	"/testLocal",
	"publish.js",
	"testLocal"
);

addHttpRequestHandler(
	"/testJenkins",
	"publish.js",
	"testJenkins"
);

addHttpRequestHandler("/getSessionCookie/", "publish.js", "getSessionCookie");

addHttpRequestHandler("/getCookies/", "publish.js", "getCookies");

addHttpRequestHandler("/invalidateSessionCookie/", "publish.js", "invalidateSessionCookie");

function getSessionCookie(request, response) {
    var cookies = request.headers["Cookie"];
    console.log(cookies);
    if (cookies != null) {
        var key = "WASID";
        var i, x, y, ARRcookies = cookies.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == key) {
                return unescape(y);
            }
        }
    }
    return "undefined";

}

function getCookies(request, response) {
    var cookies = request.headers["Cookie"];
    if (cookies != null) {
        return cookies;
    }
    else {
        return "undefined";
    }
}

function invalidateSessionCookie(request, response) {
    var key = "WASID"
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var setCookie = escape(key) + '=; Path=/;expires=' + date.toUTCString();
    response.headers["Set-Cookie"] = setCookie;
    return setCookie;
}

function redirect(request, response, testFile){
	var ip = application.httpServer.ipAddress;
	var port = application.httpServer.port;
	var file = application.getFolder("path") + "WebFolder/" +  testFile;
	response.headers["Location"]= "http://" + ip + ":" + port + "/testClient?path=" + file;
	response.statusCode = 301;
}

function testLocal(request, response){
	redirect(request, response,"test-local.js");
}

function testJenkins(request, response){
	redirect(request, response,"../../../testLoginListener.js");
}