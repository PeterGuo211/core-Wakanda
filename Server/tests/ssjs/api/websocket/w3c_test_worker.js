include("./w3c_test_harness.js", "relative", true);

// Test worker states.

var States	= {
	
	IDLE: 		0,  // Waiting for test parameters from parent.
	RUNNING: 	1,  // Running test(s).
	DONE: 		2,  // Testing done.
	
};

var	state	= States.IDLE;

add_result_callback(function () { 

	// Test results are already collected automatically.
	// They will be retrieved by the completion callback.
    
});

add_completion_callback(function (tests, testsStatus) {
	
	var	result	= {};
	
	// testsStatus is the overall status: OK means all pass.
	// ERROR means that one test has failed, all remaining test(s) are skipped.
	// And TIMEOUT means that execution of one test took more than the timeout 
	// duration (default is 5 seconds).
	//    
	//  * 0: OK 
	//  * 1: ERROR
	//  * 2: TIMEOUT
	//
	// See TestsStatus.statuses in w3c_test_harness.js.
	
	result.testsStatus = testsStatus.status;
	
	// The tests Array gives detail about each test.	
	// For each test, the possible statuses are : 
	// 
	//  * 0: PASS
	//  * 1: FAIL
	//  * 2: TIMEOUT
	//  * 3: NOTRUN
	//
	// See Test.statuses in w3c_test_harness.js.
	
	result.tests = new Array();
	
	var i;
	
	for (i = 0; i < tests.length; i++) {
	
		var	r	= {};
		
		r.name = tests[i].name;
		r.status = tests[i].status;
		r.message = typeof tests[i].message == "string" ? tests[i].message : "";
		
		result.tests.push(r);
		
	}
	
	postMessage(result);
	close();
	
});

function executeTests (testParameters) {
		
	if (testParameters.testLibrary.length > 0)
	
		include(testParameters.testLibrary, "relative", true);

	setup({timeout: testParameters.timeOut});
    
	include(testParameters.testFile, "relative", true); 	// This will load the test file and execute it.

}

onmessage = function (event) {
	
	switch (state) {
		
	case States.IDLE:
		
		executeTests(event.data);
		break;
			
	case States.RUNNING:
	case States.DONE:
	default:
	
		close();
		break;
				
	}	
	
}