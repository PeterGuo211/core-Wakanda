/*
 * This file is part of Wakanda software, licensed by 4D under
 *  (i) the GNU General Public License version 3 (GNU GPL v3), or
 *  (ii) the Affero General Public License version 3 (AGPL v3) or
 *  (iii) a commercial license.
 * This file remains the exclusive property of 4D and/or its licensors
 * and is protected by national and international legislations.
 * In any event, Licensee's compliance with the terms and conditions
 * of the applicable license constitutes a prerequisite to any use of this file.
 * Except as otherwise expressly stated in the applicable license,
 * such license does not include any other license or rights on this file,
 * 4D's and/or its licensors' trademarks and/or other proprietary rights.
 * Consequently, no title, copyright or other proprietary rights
 * other than those specified in the applicable license is granted.
 */

var testCase = {
	name: "test API Jobs",
	_should: {
		error: {},
		ignore: {
			testHTTPServer_GetIpAddress_14: true
		}
	},
	/*
	 * Sets up data that is needed by each test.
	 */
	setUp: function() {
		var currentJobs = application.getJobManager().getJobs();
		if (currentJobs.length != 0) { 
			for (var i = 0; i < currentJobs.length; i++) {
				currentJobs[i].terminate(currentJobs[i].id);
			}
		} else {console.log("There is no job to terminate")}
		
		if (os.isWindows) {
			//Win Stuff 
		} else if (os.isLinux) {
			//Linux Stuff   
		} else {
			//MAC Stuff
		}
	},
	/*
	 * Cleans up everything that was created by setUp().
	 */
	tearDown: function() {},
	/*
	 *
	 * Test methods for API Jobs
	 *
	 */
	// 0 --**-- Function getJobsManager exist
	testJobs_FunctiongetJobManagerExist_0: function() {
		Y.Assert.isTypeOf("function", getJobManager);
	},
	// 1 --**-- Object getJobsManager() exist
	testJobs_ObjectgetJobManagerExist_1: function() {
		Y.Assert.isTypeOf("object", getJobManager());
	},
	// 2 --**-- Function application.getJobsManager exist
	testJobs_FunctionApplicationgetJobManagerExist_2: function() {
		Y.Assert.isTypeOf("function", application.getJobManager);
	},
	// 3 --**-- Object application.getJobsManager() exist 
	testJobs_ObjectApplicationgetJobManagerExist_3: function() {
		Y.Assert.isTypeOf("object", application.getJobManager());
	},
	// 4 --**-- Object ggetJobManager.etJob() exist 
	testJobs_ObjectgetJobExist_4: function() {
		Y.Assert.isTypeOf("object", getJobManager().getJob());
	},
	// 5 --**-- Function getJobManager.getJob exist 
	testJobs_FunctiongetJobExist_5: function() {
		Y.Assert.isTypeOf("function", getJobManager().getJob);
	},
	// 6 --**-- Object getJobManager.getJobs() exist 
	testJobs_ObjectgetJobExist_6: function() {
		Y.Assert.isArray(getJobManager().getJobs());
	},
	// 7 --**-- Function getJobManager.getJobs exist 
	testJobs_FunctiongetJobExist_7: function() {
		Y.Assert.isTypeOf("function", getJobManager().getJobs);
	},
	// 8 --**-- Object application.getJobManager.getJob() exist 
	testJobs_ObjectApplicationgetJobManagergetJobExist_8: function() {
		Y.Assert.isTypeOf("object", application.getJobManager().getJob());
	},
	// 9 --**-- Function application.getJobManager.getJob exist 
	testJobs_FunctionApplicationgetJobManagergetJobExist_9: function() {
		Y.Assert.isTypeOf("function", application.getJobManager().getJob);
	},
	// 10 --**-- Object application.getJobManager.getJobs() exist 
	testJobs_ObjectApplicationgetJobManagergetJobExist_10: function() {
		Y.Assert.isArray(application.getJobManager().getJobs());
	},
	// 11 --**-- Function application.getJobManager.getJobs exist 
	testJobs_FunctionApplicationgetJobManagergetJobExist_11: function() {
		Y.Assert.isTypeOf("function", application.getJobManager().getJobs);
	},
	// 12 --**-- Create a new Job 
	testJobs_CreateNewJob_12: function() {
		var job = application.getJobManager().getJob("NewJob");
		Y.Assert.isObject(job);
		Y.Assert.isObject(application.getJobManager().getJob("NewJob"));
	},
	// 13 --**-- Job | ID String
	testJobs_JobIdExist_13: function() {
		var job = application.getJobManager().getJob("NewJob");
		Y.Assert.isString(job.id);
		Y.Assert.areEqual("NewJob", job.id);
	},
	// 14 --**-- Job | terminate Function
	testJobs_JobTerminateExist_14: function() {
		var job = application.getJobManager().getJob("NewJob");
		Y.Assert.isTypeOf("function", job.terminate);
		Y.Assert.isTypeOf("object", job.terminate());
	},
	// 15 --**-- Job | log Function
	testJobs_JobLogExist_15: function() {
		var job = application.getJobManager().getJob("NewJob");
		Y.Assert.isTypeOf("function", job.log);
		Y.Assert.isTypeOf("object", job.log());
	},
	// 16 --**-- Create several Jobs 
	testJobs_CreateSeveralJob_16: function() {
		for (var job = 0; job < 5; job++) {
			application.getJobManager().getJob("job_" + job);
		}
		var xJobs = application.getJobManager().getJobs();
		for (var i = 0; i < xJobs.length; i++) {
			Y.Assert.areEqual("job_" + i, xJobs[i].id);
		}
	},
	// 17 --**-- Terminate a Job
	testJobs_TerminateJob_17: function() {
		var job = application.getJobManager().getJob("NewJob");
		Y.Assert.areEqual(1, application.getJobManager().getJobs().length);
		job.terminate(job.id);
		Y.Assert.areEqual(0, application.getJobManager().getJobs().length);
	},
	// 18 --**-- Log a Job
	testJobs_LogJob_18: function() {
		var job = application.getJobManager().getJob("NewJob");
		var logFolder, 
			logFile, 
			stream,
			data,
			result;
			result = 0;
		job.log("jobLogTest");
		logFolder = Folder("/LOGFILE/");
		if ( (logFolder != undefined) && (logFolder.exists) ) {
			logFile = File(logFolder.path + "testJobs_log_1.txt");	
		}
		if ( (logFile != undefined) && (logFile.exists) ) {
			stream = new TextStream(logFile, "Read");
			data = stream.read("jobLogTest");
			stream.close();
			result = data.indexOf("jobLogTest");
		} else {
			console.log("Log File testJobs_log_1.txt doesn't exist");
		}
		Y.Assert.areNotSame(-1,result);	
	}
};
/*
    //create the console
    (new Y.Test.Console({
        newestOnTop : false,
        filters: {
            pass: true,
            fail: true	
        }
    })).render('#testLogger');

    Y.Test.Runner.add(Y.example.test.ExampleSuite);

    //run the tests
    Y.Test.Runner.run();
    */
if (typeof dontRequireUnitTest === 'undefined') {
	require("unitTest").run(testCase).getReport();
}