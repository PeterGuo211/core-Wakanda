// Execute a W3C test, this is a blocking method.
// Usually the test file makes use of a small library file, use null or an empty string if not needed.
// The default timeout is 5 seconds.

var path	= require._getCurrentPath();

exports.executeTest = function (testFile, testLibrary, timeOut) {

	if (typeof testLibrary != "string")
	
		testLibrary = "";
		
	if (typeof timeOut != "number") 
		
		timeOut = 5000;		
		
	var testWorker	= new Worker(path + "w3c_test_worker.js", false);
	var result		= null;
		
	testWorker.postMessage({testLibrary: testLibrary, testFile: testFile, timeOut: timeOut});
	testWorker.onmessage = function (event) {
                
		result = event.data;
		exitWait();
		
	}
	
	// Test harness will timeout first and this will be reported as such.
	// Hence the returned result should never be null.

	wait(timeOut + 1000);
	
	return result;

}

// Stringify a result returned by executeTest(). 

exports.stringifyTestResult = function (result) {
	
	var	string;
	
	string = "Test(s) status: ";
	switch (result.testsStatus) {
		
	case 0: 	string += "OK (all passed)"; break;
	case 1:     string += "ERROR (a test failed, all remaining(s) skipped)"; break;
	case 2:     string += "TIMEOUT (a test timed-out, default is 5 seconds)"; break;
	default:    string += "INVALID testsStatus!!!"; break;
	
	}
	string += "\n";
	
	var i;
	
	for (i = 0; i < result.tests.length; i++) {
		
		string += result.tests[i].name;
		string += ": ";
		switch (result.tests[i].status) {
			
		case 0: 	string += "PASS"; break;
		case 1: 	string += "FAIL"; break;
		case 2: 	string += "TIMEOUT"; break;
		case 3: 	string += "NOTRUN"; break;
		default: 	string += "INVALID status!!!"; break;
			
		}
		
	}
	
	return string;
}

// Make a test pass or fail in YUI testing library.

exports.assertInYUI = function (Y, result) {

	if (result == null)
	
		Y.Assert.fail("An exception has be thrown during test (result == null)!");

	else if (result.testsStatus == 0)
	
		Y.Assert.isTrue(true);	// All test passed.
		
	else {
	
		// W3C tests stop at first error or timeout, show it.
	
		var	i;

		for (i = 0; i < result.tests.length; i++) 
		
			if (result.tests[i].status == 1 || result.tests[i].status == 2) {
			
				var	string;
				
				string = result.tests[i].name;
				string += " has ";
				string += result.tests[i].status == 1 ? "failed: " : "timed-out: ";
				
				if (typeof result.tests[i].message == "string") 
				
					string += result.tests[i].message;
					
				else
				
					string += "(no error message)"
					
				Y.Assert.fail(string);
		
				break;
		
			}
	
        if (i == result.tests.length) {
            
            // If a test times-out but all individual tests are either "pass" or "not run",
            // then style fail as time-out.
            
            Y.Assert.fail("Test timed-out!");
        
        }
    
	}
}