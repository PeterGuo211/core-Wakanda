
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
	var button4 = {};	// @button
	var button2 = {};	// @button
	var button3 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		ds.Epmloyees.staticMethod();
	};// @lock

	button4.click = function button4_click (event)// @startlock
	{// @endlock
		//sources.myValue.sync(); // synchronize the myValue source and variable
        NameSpace1.isEmptyAsync({    // Asynchronous call
                'onSuccess': function (result) {
                console.log(result);
                },  
                'onError': function (error) {
                   console.log("Error");
                    
                },  
                'params': [myValue]
             });

	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		var myForm=new FormData();
		var myXHR=new XMLHttpRequest();
		
		function onResponse(){
			if(myXHR.readyState===4){
			document.getElementById('result').value=myXHR.responseText;
			}
		}
		
		myXHR.onreadystatechange=onResponse;
		
		myForm.append("a",document.getElementById('a').value);
		myForm.append("b",document.getElementById('b').value);
		
		myXHR.open('post','/calculate',true);
		myXHR.send(myForm);
	};// @lock

	button3.click = function button3_click (event)// @startlock
	{// @endlock
		var stringToSend = "";
		//stringToSend = JSON.stringify(obj);
		var newBugSucceeded = false;

		$.ajax({
		    type: "POST",
		    content: "text/plain",
		    url: "/calculate",
		    success: function(event) {
		        newBugSucceeded = true;
		        alert("Event : " + event + " successfully created ");

		    },
		    error: function(err) {
		        //    alert(err);
		    }
		});
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button1", "click", button1.click, "WAF");
	WAF.addListener("button4", "click", button4.click, "WAF");
	WAF.addListener("button2", "click", button2.click, "WAF");
	WAF.addListener("button3", "click", button3.click, "WAF");
// @endregion
};// @endlock
