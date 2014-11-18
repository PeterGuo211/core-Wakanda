function provokeError500() {
	
	elfe("jfejj");
}

function provokeError501(request, response) {
	
	var xhr = new XMLHttpRequest();
	xhr.open("WHATEVER","/");
	xhr.send(null);
	return xhr.responseText;
}
	
	
function provokeError401(request, response) {
	
	return "ok";
}	
function echoBody(request, response){
	var body = request.body;
	console.log(body);
	return body;
}