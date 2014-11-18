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

/** Use Cases 
Here is the list of all possible forms of arguments (case sensitive) :

-a -B -c
-a valueA -B valueB -c valueC
-aBc valueA valueB valueC
--opt-a --opt-b --opt-c
--opt-a valueA --opt-b valueB --opt-c valueC
--opt-a=valueA --opt-b=valueB --opt-c=valueC
--opt-a --opt-b --opt-c valueA valueB valueC
Windows only :

/a valueA /B valueB /c valueC
/a:valueA /B:valueB /c:valueC
/a=valueA /B=valueB /c=valueC [for UNIX compatibility]
/a /b /c valueA valueB valueC
Help :

--help, -h
/help, /?, /h [windows only]

The special argument "--" forces in all cases the end of option scanning (the remaining arguments
will be considered as mere values)
**/

//LocalSetting 
var localOrNot = false;
var localPathServer = "";
var reportLocalPath = "";

//** Info Env Variable
var unitTest = require('unitTest');
var env = unitTest.getenv();
console.log("Info : " + " " + JSON.stringify(env));

//Init 
var newServerBin = null;
var output = '';
var index = 0;
var newServerBinPath = (function() {
	if (os.isWindows) 
		return "\\Wakanda Enterprise Server\\Wakanda Server.exe"; 
	if (os.isLinux)
		return "/Wakanda Enterprise Server/WakandaEnterprise"; 
	return "/Wakanda Enterprise Server.app/Contents/MacOs/Wakanda Enterprise Server";
})();

function statusCodeOS(bool) 
{
	return (bool == true) ? 0 : 1;
	//return if bool then 0 else 1;
};

function argformat(value) 
{
	var format = value.match(/^./g); 
	if (format[0] === "/") 
		format = "dos"
	else 
		format = "unix"
	return format;
};

function copyServer(localSetting) 
{
	if (!localSetting) 
	{
		var serverPath = File(env.WAKANDA_SERVER_PATH);
		var serverPathWin = serverPath.parent.path.replace(/\//g,'\\');
		if (os.isWindows) 
		{
			var copyServer = new SystemWorker("xcopy /E /Y /R /I /F" + " " + '"' + serverPathWin.replace(/\\$/g,'') + '"' + " " + '"' + env.WORKSPACE + "\\Wakanda Enterprise Server" + '"');
			console.log("xcopy /E /Y /R /I /F" + " " + '"' + serverPathWin.replace(/\\$/g,'') + '"' + " " + '"' + env.WORKSPACE + "\\Wakanda Enterprise Server" + '"');
		}
		else
		{
			if (os.isLinux) 
			{
				var copyServer = new SystemWorker("cp -R" + " " + '"' + serverPath.parent.path + '"' + " " + env.WORKSPACE);
				console.log("cp -R" + " " + serverPath.parent.path + " " + env.WORKSPACE);
			}
			else
			{
				var str = serverPath.path; 
				console.log("Original Path from Mac : " + str);
				var macPath = str.match('.*.app');
				console.log("Path from Mac : " + macPath[0]);
				var copyServer = new SystemWorker("cp -R" + " " + '"' + macPath[0] + '"' + " " + env.WORKSPACE);
				console.log("cp -R" + " " + macPath[0] + " " + env.WORKSPACE);
			}
		}

		copyServer.onmessage = function() 
		{
			if (arguments[0].data != null || arguments[0].data.toString() != "") 
			{
				console.log("copyServer : " + arguments[0].data.toString());
				output += arguments[0].data.toString();
			}
			else
				console.log("copyServer failed : " + arguments[0].data.toString());
		};

		copyServer.onterminated = function() {
			exitWait();
		};

		wait();
	} else { 
		console.log("We are executing test in local");
	}
};

function binariesPath() 
{
	//return (localOrNot === true) ? localPathServer : env.WORKSPACE + newServerBinPath
	return (localOrNot === true) ? localPathServer : env.WAKANDA_SERVER_PATH;
};

newServerBin = File(binariesPath());
console.log("Server exist : " + " " + newServerBin.exists); 

/* Arrays Logic Value */ 

//systemWorkerLogicCase

var systemWorkerLogicCase = 
{
"args" : "systemWorker", 
"name" : "systemWorkerTestLogic",
"systemWorkerLogic" : 
	[
		/*[0]*/
		{"case" : 0, "ae":{"arg" : "--system-workers", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 1, "ae":{"arg" : "/system-workers", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 2, "ae":{"arg" : "--SYSTEM-WORKERS", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 3, "ae":{"arg" : "/SYSTEM-WORKERS", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null}
	]
};


/* 

Configuration [Windows,Linux,Mac] :


*/

function generator(caseObject,name,args,format,config) 
{
	index++;
//Configuration generator Expected Result  
/*

	Win 	Mac 	Linux 

1	false	false	true

2	true	true	true

3   false	false	false

4 	false 	true	true

5 	true 	false	false

6 	true 	true 	false

7 	false 	true 	false

8 	true 	false 	true

9 	x 		x 		x

*/
/*

PatternGeneric test generator : 

// --***-- Test to check that helpLogic (windows : , Linux/Mac : ) exist
testCLIargs_helpOptionLogicXExist: function() 
{
	generator(paramUnix,paramDos,expectedUnix,expectedDos,in,out,config);
};

*/
/*
		Note : Use "shellWorker" Module for Linux & Mac 
*/
/*
	If Server not found or command not found : error 127, add tests
*/
	console.log("ServerPath :" + " " + newServerBin.path); 
 	if (os.isWindows) { 
 	//Windows execution tests
 		//Cases DOS and UNIX format 
		var optionHelp = SystemWorker.exec('cmd /c' + " " + '"' + newServerBin.path + '"' + " " + caseObject.ae.arg);
		console.log("Args to test : " + caseObject.ae.arg);
		console.log("optionHelp value object : "+ JSON.stringify(optionHelp)); 
		if (optionHelp != null) {
			if (optionHelp.exitStatus === 0) {
				console.log("optionHelp is : " + optionHelp.output.toString());
				//Asserts 
				Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.win),optionHelp.exitStatus,"Args type : "+ args +", windows : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.win) + ", "+ caseObject.ae.arg + " doesn't work or exist. The code returned is : "+ optionHelp.exitStatus +".");
				Y.Assert.isNotNull(optionHelp);
				Y.Assert.isObject(optionHelp);
				Y.Assert.areSame(0,optionHelp.error.length);
				Y.Assert.isNotNull(optionHelp.output);
				Y.Assert.isString(optionHelp.output.toString().replace(/\r?\n/g, ''));
			} else { 
				console.log("optionHelp failed : " + optionHelp.error.toString());
				//Asserts 
				Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.win),optionHelp.exitStatus,"Args type : "+ args +", windows : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.win) + ", "+ caseObject.ae.arg + " work or exist. The code returned is : "+ optionHelp.exitStatus +".");
				Y.Assert.isNotNull(optionHelp);
				Y.Assert.isObject(optionHelp);
				Y.Assert.areSame(0,optionHelp.output.length);
				Y.Assert.isNotNull(optionHelp.error); 
				Y.Assert.isString(optionHelp.error.toString().replace(/\r?\n/g, ''));
				var typeError = optionHelp.error.toString().replace(/\r?\n/g, '').match(/^\w+/g)
				if ( typeError[0] === "missing") 
					console.log("Missing Error");
					//Check the error message
				else if ( typeError[0] === "invalid")
					console.log("invalid Error");  
					//Check the error message
				else if ( typeError[0] === "unknown")
					console.log("Unknown error");
					//Check the error message
				else 
				console.log("There is no error type!");
			}
		} else 
			console.log("optionHelp is null");
	} else { 
	//Linux & MacOS execution tests
		//Cases DOS and UNIX format 
		var optionHelp = SystemWorker.exec('"' + newServerBin.path + '"' + " " + caseObject.ae.arg);
		console.log("Args to test : " + caseObject.ae.arg);
		console.log("optionHelp value object : "+ JSON.stringify(optionHelp) +""); 
		if (optionHelp != null) {
			if (optionHelp.exitStatus === 0) {
				console.log("optionHelp is : " + optionHelp.output.toString());
				//Asserts 
				if (os.isLinux)
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.linux),optionHelp.exitStatus,"Args type : "+ args +", Linux : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.linux) + ", "+ caseObject.ae.arg + " doesn't work or exist. The code returned is : "+ optionHelp.exitStatus +".");
				else 
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.mac),optionHelp.exitStatus,"Args type : "+ args +", Mac : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.mac) + ", "+ caseObject.ae.arg + " doesn't work or exist. The code returned is : "+ optionHelp.exitStatus +".");
				Y.Assert.isNotNull(optionHelp);
				Y.Assert.isObject(optionHelp);
				Y.Assert.areSame(0,optionHelp.error.length);
				Y.Assert.isNotNull(optionHelp.output);
				Y.Assert.isString(optionHelp.output.toString().replace(/\r?\n/g, ''));
			} else { 
				console.log("optionHelp failed : " + optionHelp.error.toString());
				//Asserts 
				if (os.isLinux)
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.linux),optionHelp.exitStatus,"Args type : "+ args +", Linux : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.linux) + ", "+ caseObject.ae.arg + " work or exist. The code returned is : "+ optionHelp.exitStatus +".");
				else
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.mac),optionHelp.exitStatus,"Args type : "+ args +", Mac : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.mac) + ", "+ caseObject.ae.arg + " work or exist. The code returned is : "+ optionHelp.exitStatus +".");
				Y.Assert.isNotNull(optionHelp);
				Y.Assert.isObject(optionHelp);
				Y.Assert.areSame(0,optionHelp.output.length);
				Y.Assert.isNotNull(optionHelp.error); 
				Y.Assert.isString(optionHelp.error.toString().replace(/\r?\n/g, ''));
				var typeError = optionHelp.error.toString().replace(/\r?\n/g, '').match(/^\w+/g)
				if ( typeError[0] === "missing") 
					console.log("Missing Error");
					//Check the error message
				else if ( typeError[0] === "invalid")
					console.log("invalid Error");  
					//Check the error message
				else if ( typeError[0] === "unknown")
					console.log("Unknown error");
					//Check the error message
				else 
				console.log("There is no error type!");
			}

		} else  
			console.log("optionHelp is null");
	} 
};

var testCase = {
	name: "test Virtual Folder",
	_should: {
		error: {},
		ignore: {}
	},
	/*
	 * Sets up data that is needed by each test.
	 */
	setUp: function() {
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
	 * Test methods for Binary execution with Args : command line arguments
	 *
	 */
};

/* Generated tests for Logic optionSystemWorker */

//Attention, different scope for() and function()
for (var hl = 0; hl < systemWorkerLogicCase.systemWorkerLogic.length; hl++) 
	{
		testCase["testCLIargs_helpOptionLogic_" + systemWorkerLogicCase.systemWorkerLogic[hl].case + "_" + argformat(systemWorkerLogicCase.systemWorkerLogic[hl].ae.arg)] = function() 
		{
			var phl0 = systemWorkerLogicCase.systemWorkerLogic[index];
			var phl1 = systemWorkerLogicCase.name;
			var phl2 = systemWorkerLogicCase.args;
			var phl3 = argformat(systemWorkerLogicCase.systemWorkerLogic[index].ae.arg); 
			var phl4 = systemWorkerLogicCase.systemWorkerLogic[index].config; 

			console.log("VALUE 0 : " + JSON.stringify(phl0));
			console.log("VALUE 1 : " + phl1);
			console.log("VALUE 2 : " + phl2);
			console.log("VALUE 3 : " + phl3);
			console.log("VALUE 4 : " + phl4);
			
			generator(phl0,phl1,phl2,phl3,phl4); 
				
		};
	};

//CopyServer into the Workspace before to run tests
//copyServer(localOrNot);

if (!localOrNot)
	unitTest.run(testCase).getXmlReport(env.WORKSPACE + '/report.xml');
else 
	unitTest.run(testCase).getXmlReport(reportLocalPath + '/report.xml');
