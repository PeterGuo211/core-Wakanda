	var xhr = new XMLHttpRequest();
	xhr.open("GET","http://localhost:8081/random.html");
	xhr.setRequestHeader("ACCEPT","text/xml");
	xhr.send();
	xhr.response;
	
	//this script should generate 406 http error