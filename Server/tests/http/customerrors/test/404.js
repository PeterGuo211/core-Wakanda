var xhr = new XMLHttpRequest();
xhr.open("GET","http://localhost:8081/inexistent.html");
xhr.send();
xhr.response;
