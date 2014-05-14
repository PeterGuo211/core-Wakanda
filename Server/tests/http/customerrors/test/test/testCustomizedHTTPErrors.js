var testCase = {
    name: "Test Customizing HTTP Errors API",

    testError401IsCustomized: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://localhost:8081/provokeError401/");
        xhr.send();
        var actual = xhr.response;
        var expected = "Custom 401 UNAUTHAURIZED"
        Y.Assert.areSame(expected, actual);

    },
    
    testError404IsCustomized: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://localhost:8081/whatever/");
        xhr.send();
        var actual = xhr.response;
        var expected = "CUSTOMIZED 404 PAGE NOT FOUND"
        Y.Assert.areSame(expected, actual);
    },
    testError405IsCustomized: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://localhost:8081/");
        xhr.send()
        var actual = xhr.response;
        var expected = "Custom 405 (Method Not Allowed)"
        Y.Assert.areSame(expected, actual);
    },
    testError406IsCustomized: function() {

        
        var xhr = new XMLHttpRequest();
		xhr.open("GET","http://127.0.0.1:8081/random.html");
		xhr.setRequestHeader("ACCEPT","text/xml");
		xhr.send();
        var actual = xhr.response;
        var expected = "Custom 406 Not Acceptable"
        Y.Assert.areSame(expected, actual);
    },
    //    testError409IsCustomized: function() {
    //       
    //		var xhr = new XMLHttpRequest();
    //		xhr.open("GET","http://localhost:8081/4xx.html");
    //		xhr.setRequestHeader("ACCEPT-ENCODING","whaterver");
    //		xhr.send();
    //      var actual = xhr.response;
    //       var expected = "Custom 409 CONFLICT"
    //       Y.Assert.areSame(expected, actual);
    //    },
  
   
    testError415IsCustomized: function() {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8081/echoBody/");
        xhr.setRequestHeader("Content-Encoding", "whatever");
        var obj = JSON.stringify("whatever");
        xhr.send(obj);
        var actual = xhr.response;
        var expected = "Custom 415 - Unsupported Media Type"
        Y.Assert.areSame(expected, actual);
    },
//     testError412IsCustomized: function() {

//        var xhr = new XMLHttpRequest();
//        xhr.open("GET", "http://localhost:8081/4xx.html");
//        xhr.setRequestHeader("ACCEPT-ENCODING", "whaterver");
//        xhr.send();
//        var actual = xhr.response;
//        var expected = "Custom 406 Not Accepetable"
//        Y.Assert.areSame(expected, actual);
//    },
    testError500IsCustomized: function() {

        var xhr = new XMLHttpRequest();
        var xhr = new XMLHttpRequest();
		xhr.open("GET","http://127.0.0.1:8081/provokeError500");
		xhr.send();
        var actual = xhr.response;
        var expected = "Custom 500 Internal Server Error"
        Y.Assert.areSame(expected, actual);
    },
    testError501IsCustomized: function() {

        var xhr = new XMLHttpRequest();
        xhr.open("WHATEVER", "http://localhost:8081/");
        xhr.setRequestHeader("ACCEPT-ENCODING", "whaterver");
        xhr.send();
        var actual = xhr.response;
        var expected = "Custom 501 - Not Implemented"
        Y.Assert.areSame(expected, actual);
    }


};
require('unitTest').run(testCase).getReport()