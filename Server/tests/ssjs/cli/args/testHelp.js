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

//OptionHelp


var helpLogicCase = 
{
"args" : "help", 
"name" : "helpTestLogic",
"helpLogic" : 
	[

		/*[0]*/
		{"case" : 0, "ae":{"arg" : "/help", "expected":{"win":true,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null}, 
		{"case" : 1, "ae":{"arg" : "/?", "expected":{"win":true,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 2, "ae":{"arg" : "/h", "expected":{"win":true,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 3, "ae":{"arg" : "/h /e /l /p", "expected":{"win":true,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 4, "ae":{"arg" : "/h/e/l/p", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 5, "ae":{"arg" : "/h/elp", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[1]*/	
		{"case" : 6, "ae":{"arg" : "/HELP", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 7, "ae":{"arg" : "/?", "expected":{"win":true,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 8, "ae":{"arg" : "/H", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 9, "ae":{"arg" : "/H /E /L /P", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 10, "ae":{"arg" : "/H/E/L/P", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 11, "ae":{"arg" : "/H/ELP", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[2]*/
		{"case" : 12, "ae":{"arg" : "/help value", "expected":{"win":true,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 13, "ae":{"arg" : "/? value", "expected":{"win":true,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 14, "ae":{"arg" : "/h value", "expected":{"win":true,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 15, "ae":{"arg" : "/h value /e value /l value /p value", "expected":{"win":true,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 16, "ae":{"arg" : "/h/e/l/p value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 17, "ae":{"arg" : "/h/elp value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[3]*/
		{"case" : 18, "ae":{"arg" : "/HELP value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 19, "ae":{"arg" : "/? value", "expected":{"win":true,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 20, "ae":{"arg" : "/H value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 21, "ae":{"arg" : "/H value /E value /L value /P value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 22, "ae":{"arg" : "/H/E/L/P value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 23, "ae":{"arg" : "/H/ELP value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[4]*/
		{"case" : 24, "ae":{"arg" : "/helpvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 25, "ae":{"arg" : "/?value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 26, "ae":{"arg" : "/hvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 27, "ae":{"arg" : "/hvalue /evalue /lvalue /pvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 28, "ae":{"arg" : "/h/e/l/pvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 29, "ae":{"arg" : "/h/elpvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[5]*/
		{"case" : 30, "ae":{"arg" : "/HELPvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 31, "ae":{"arg" : "/?value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 32, "ae":{"arg" : "/Hvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 33, "ae":{"arg" : "/Hvalue /Evalue /Lvalue /Pvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 34, "ae":{"arg" : "/H/E/L/Pvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 35, "ae":{"arg" : "/H/ELPvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[6]*/
		{"case" : 36, "ae":{"arg" : "/help=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 37, "ae":{"arg" : "/?=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 38, "ae":{"arg" : "/h=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 39, "ae":{"arg" : "/h=value /e=value /l=value /p=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 40, "ae":{"arg" : "/h/e/l/p=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 41, "ae":{"arg" : "/h/elp=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[7]*/
		{"case" : 42, "ae":{"arg" : "/HELP=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 43, "ae":{"arg" : "/?=value","expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 44, "ae":{"arg" : "/H=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 45, "ae":{"arg" : "/H=value /E=value /L=value /P=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 46, "ae":{"arg" : "/H/E/L/P=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 47, "ae":{"arg" : "/H/ELP=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[8]*/
		{"case" : 48, "ae":{"arg" : "/help:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 49, "ae":{"arg" : "/?:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 50, "ae":{"arg" : "/h:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 51, "ae":{"arg" : "/h:value /e:value /l:value /p:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 52, "ae":{"arg" : "/h/e/l/p:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 53, "ae":{"arg" : "/h/elp:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[9]*/
		{"case" : 54, "ae":{"arg" : "/HELP:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 55, "ae":{"arg" : "/?:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 56, "ae":{"arg" : "/H:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 57, "ae":{"arg" : "/H:value /e:value /l:value /P:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 58, "ae":{"arg" : "/H/E/L/P:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 59, "ae":{"arg" : "/H/ELP:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[10]*/	
		{"case" : 60, "ae":{"arg" : "/version", "expected":{"win":true,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 61, "ae":{"arg" : "/VERSION", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 62, "ae":{"arg" : "/version value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 63, "ae":{"arg" : "/VERSION value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 64, "ae":{"arg" : "/versionvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 65, "ae":{"arg" : "/VERSIONvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 66, "ae":{"arg" : "/version=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 67, "ae":{"arg" : "/VERSION=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 68, "ae":{"arg" : "/version:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 69, "ae":{"arg" : "/VERSION:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[11]*/
		{"case" : 70, "ae":{"arg" : "--help", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null}, 
		{"case" : 71, "ae":{"arg" : "-h", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 72, "ae":{"arg" : "-help", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 73, "ae":{"arg" : "-h -e -l -p", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 74, "ae":{"arg" : "-h-e-l-p", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 75, "ae":{"arg" : "-h-elp", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		/*[12]*/	
		{"case" : 76, "ae":{"arg" : "--HELP", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 77, "ae":{"arg" : "-H", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 78, "ae":{"arg" : "-HELP", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 79, "ae":{"arg" : "-H -E -L -P", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 80, "ae":{"arg" : "-H-E-L-P", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 81, "ae":{"arg" : "-H-ELP", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[13]*/
		{"case" : 82, "ae":{"arg" : "--help value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 83, "ae":{"arg" : "-h value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 84, "ae":{"arg" : "-help value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 85, "ae":{"arg" : "-h value -e value -l value -p value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 86, "ae":{"arg" : "-h-e-l-p value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 87, "ae":{"arg" : "-h-elp value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		/*[14]*/
		{"case" : 88, "ae":{"arg" : "--HELP value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 89, "ae":{"arg" : "-H value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 90, "ae":{"arg" : "-HELP value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 91, "ae":{"arg" : "-H value -E value -L value -P value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 92, "ae":{"arg" : "-H-E-L-P value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 93, "ae":{"arg" : "-H-ELP value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[15]*/
		{"case" : 94, "ae":{"arg" : "--helpvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 95, "ae":{"arg" : "-hvalue", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 96, "ae":{"arg" : "-helpvalue", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 97, "ae":{"arg" : "-hvalue -evalue -lvalue -pvalue", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 98, "ae":{"arg" : "-h-e-l-pvalue", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 99, "ae":{"arg" : "-h-elpvalue", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		/*[16]*/
		{"case" : 100, "ae":{"arg" : "--HELPvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 101, "ae":{"arg" : "-Hvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 102, "ae":{"arg" : "-HELPvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 103, "ae":{"arg" : "-Hvalue -Evalue -Lvalue -Pvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 104, "ae":{"arg" : "-H-E-L-Pvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 105, "ae":{"arg" : "-H-ELpvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[17]*/
		{"case" : 106, "ae":{"arg" : "--help=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 107, "ae":{"arg" : "-h=value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 108, "ae":{"arg" : "-help=value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 109, "ae":{"arg" : "-h=value -e=value -l=value -p=value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 110, "ae":{"arg" : "-h-e-l-p=value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 111, "ae":{"arg" : "-h-elp=value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		/*[18]*/
		{"case" : 112, "ae":{"arg" : "--HELP=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 113, "ae":{"arg" : "-H=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 114, "ae":{"arg" : "-HELP=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 115, "ae":{"arg" : "-H=value -E=value -L=value -P=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 116, "ae":{"arg" : "-H-E-L-P=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 117, "ae":{"arg" : "-H-ELP=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[19]*/
		{"case" : 118, "ae":{"arg" : "--help:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 119, "ae":{"arg" : "-h:value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 120, "ae":{"arg" : "-help:value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 121, "ae":{"arg" : "-h:value -e:value -l:value -p:value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 122, "ae":{"arg" : "-h-e-l-p:value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 123, "ae":{"arg" : "-h-elp:value", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		/*[20]*/
		{"case" : 124, "ae":{"arg" : "--HELP:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 125, "ae":{"arg" : "-H:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 126, "ae":{"arg" : "-HELP:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 127, "ae":{"arg" : "-H:value -E:value -L:value -P:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 128, "ae":{"arg" : "-H-E-L-P:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 129, "ae":{"arg" : "-H-ELP:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		/*[21]*/	
		{"case" : 130, "ae":{"arg" : "--version", "expected":{"win":true,"linux":true,"mac":true}}, "config" : null, "out" : null, "in" : null},
		{"case" : 131, "ae":{"arg" : "--VERSION", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 132, "ae":{"arg" : "--version value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 133, "ae":{"arg" : "--VERSION value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 134, "ae":{"arg" : "--versionvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 135, "ae":{"arg" : "--VERSIONvalue", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 136, "ae":{"arg" : "--version=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 137, "ae":{"arg" : "--VERSION=value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 138, "ae":{"arg" : "--version:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null},
		{"case" : 139, "ae":{"arg" : "--VERSION:value", "expected":{"win":false,"linux":false,"mac":false}}, "config" : null, "out" : null, "in" : null}

	]
};

/* 

Configuration [Windows,Linux,Mac] :

[0]
[/help & --help] 																	--help 			--help 
[/? & -h]																			-h 				-h
[/h & -help]																		-help 			-help
[/h /e /l /p & -h -e -l -p]															-h -e -l -p  	-h -e -l -p 
[/h/e/l/p & -h-e-l-p] 																-h-e-l-p  		-h-e-l-p
[/h/elp & -h-elp] 																	-h-elp  		-h-elp 
--h 																				--h 			--h
--h-elp                         													--h-elp         --h-elp
[1]
[/HELP & --HELP] 																	--HELP 			--HELP 
[/H & -HELP]																		-HELP 			-HELP
[/H /E /L /P & -H -E -L -P] 														-H -E -L -P  	-H -E -L -P 
[/H/E/L/P & -H-E-L-P] 																-H-E-L-P  		-H-E-L-P
[/H/ELP & -H-ELP] 																	-H-ELP  		-H-ELP
--H 																				--H 			--H
--H-ELP                           													--H-ELP         --H-ELP
[2]
[/help value & --help value] 														--help value	--help value
[/? value & -h value]																-h value 		-h value
[/h value & -help value]															-help value 	-help value
[/h value /e value /l value /p value & -h value -e value -l value -p value]			-h value -e value -l value -p value	-h value -e value -l value -p value
[/h/e/l/p value & -h-e-l-p value] 													-h-e-l-p value  -h-e-l-p value
[/h/elp value & -h-elp value] 														-h-elp value  	-h-elp value 
--h value                         													--h value       --h value
--h-elp value 																		--h-elp value   --h-elp value
[3]
[/HELP value & --HELP value] 														--HELP value 	--HELP value 
[/H value & -HELP value]															-HELP value		-HELP value
[/H value /E value /L value /P value & -H value -E value -L value -P value] 		-H value -E value -L value -P value	-H value -E value -L value -P value 
[/H/E/L/P value & -H-E-L-P value] 													-H-E-L-P value  -H-E-L-P value
[/H/ELP value & -H-ELP value] 														-H-ELP value  	-H-ELP value
--H value 																			--H value 		--H value 
--H-ELP value 																		--H-ELP value	--H-ELP value
[4]
[/helpvalue & --helpvalue] 															--helpvalue	--helpvalue
[/?value & -hvalue]																	-hvalue 		-hvalue
[/hvalue & -helpvalue]																-helpvalue 	-helpvalue
[/hvalue /evalue /lvalue /pvalue & -hvalue -evalue -lvalue -pvalue]					-hvalue -evalue -lvalue -pvalue	-hvalue -evalue -lvalue -pvalue
[/h/e/l/pvalue & -h-e-l-pvalue] 													-h-e-l-pvalue  -h-e-l-pvalue
[/h/elpvalue & -h-elpvalue] 														-h-elpvalue  	-h-elpvalue 
--hvalue                         													--hvalue       --hvalue
--h-elpvalue 																		--h-elpvalue   --h-elpvalue
[5]
[/HELPvalue & --HELPvalue] 															--HELPvalue 	--HELPvalue 
[/Hvalue & -HELPvalue]																-HELPvalue		-HELPvalue
[/Hvalue /Evalue /Lvalue /Pvalue & -Hvalue -Evalue -Lvalue -Pvalue] 				-Hvalue -Evalue -Lvalue -Pvalue	-Hvalue -Evalue -Lvalue -Pvalue 
[/H/E/L/Pvalue & -H-E-L-Pvalue] 													-H-E-L-Pvalue  -H-E-L-Pvalue
[/H/ELPvalue & -H-ELPvalue] 														-H-ELP value  	-H-ELPvalue
--Hvalue 																			--Hvalue 		--Hvalue 
--H-ELPvalue 																		--H-ELPvalue	--H-ELPvalue
[6]
[/help=value & --help=value] 														--help=value	--help=value
[/?=value & -h=value]																-h=value 		-h=value
[/h=value & -help=value]															-help=value 	-help=value
[/h=value /e=value /l=value /p=value & -h=value -e=value -l=value -p=value]			-h=value -e=value -l=value -p=value	-h=value -e=value -l=value -p=value
[/h/e/l/p=value & -h-e-l-p=value] 													-h-e-l-p=value  -h-e-l-p=value
[/h/elp=value & -h-elp=value] 														-h-elp=value  	-h-elp=value 
--h=value                         													--h=value       --h=value
--h-elp=value 																		--h-elp=value   --h-elp=value
[7]
[/HELP=value & --HELP=value] 														--HELP=value 	--HELP=value 
[/H=value & -HELP=value]															-HELP=value		-HELP=value
[/H=value /E=value /L=value /P=value & -H=value -E=value -L=value -P=value] 		-H=value -E=value -L=value -P=value	-H=value -E=value -L=value -P=value 
[/H/E/L/P=value & -H-E-L-P=value] 													-H-E-L-P=value  -H-E-L-P=value
[/H/ELP=value & -H-ELP=value] 														-H-ELP =value  	-H-ELP=value
--H=value 																			--H=value 		--H=value 
--H-ELP=value 																		--H-ELP=value	--H-ELP=value
[8]
[/help:value & --help:value] 														--help:value	--help:value
[/?:value & -h:value]																-h:value 		-h:value
[/h:value & -help:value]															-help:value 	-help:value
[/h:value /e:value /l:value /p:value & -h:value -e:value -l:value -p:value]			-h:value -e:value -l:value -p:value	-h:value -e:value -l:value -p:value
[/h/e/l/p:value & -h-e-l-p:value] 													-h-e-l-p:value  -h-e-l-p:value
[/h/elp:value & -h-elp:value] 														-h-elp:value  	-h-elp:value 
--h:value                         													--h:value       --h:value
--h-elp:value 																		--h-elp:value   --h-elp:value
[9]
[/HELP:value & --HELP:value] 														--HELP:value 	--HELP:value 
[/H:value & -HELP:value]															-HELP:value		-HELP:value
[/H:value /E:value /L:value /P:value & -H:value -E:value -L:value -P:value] 		-H:value -E:value -L:value -P:value	-H:value -E:value -L:value -P:value 
[/H/E/L/P:value & -H-E-L-P:value] 													-H-E-L-P:value  -H-E-L-P:value
[/H/ELP:value & -H-ELP:value] 														-H-ELP :value  	-H-ELP:value
--H:value 																			--H:value 		--H:value 
--H-ELP:value 																		--H-ELP:value	--H-ELP:value
[10]
--version																			--version		--version
--VERSION 																			--VERSION 		--VERSION
--version value 																	--version value	--version value
--VERSION value 																	--VERSION value --VERSION value
--versionvalue 																		--versionvalue	--versionvalue
--VERSIONvalue 																		--VERSIONvalue --VERSIONvalue		
--version=value 																	--version=value	--version=value
--VERSION=value 																	--VERSION=value --VERSION=value
--version:value 																	--version:value	--version:value
--VERSION:value 																	--VERSION:value --VERSION:value
[11]
-version 																			-version 		-version 
-VERSION 																			-VERSION 		-VERSION
-version value 																		-version value	-version value
-VERSION value 																		-VERSION value -VERSION value
-versionvalue 																		-versionvalue	-versionvalue
-VERSIONvalue 																		-VERSIONvalue -VERSIONvalue		
-version=value 																		-version=value	-version=value
-VERSION=value 																		-VERSION=value -VERSION=value
-version:value 																		-version:value	-version:value
-VERSION:value 																		-VERSION:value -VERSION:value
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

	// --**-- Test to check the defails information returned by option help 
	testCLIargs_helpOptionFunctional0: function() {
	var mainInformation;
	var result = [];
	var matched = [];
	// Static Value must be updated
	if (os.isLinux) {
		mainInformation = 
		[
			"-s",
			"--solution=VALUE",
			"-d",
			"--daemon",
			"--admin-password=VALUE",
			"--admin-port=VALUE",
			"--admin-ssl-port=VALUE",
			"--no-discovery",
			"-g",
			"--debugger=VALUE",
			"--debug-off",
			"--job-id=VALUE",
			"--system-workers=VALUE",
			"--syslog",
			"--verbose",
			"--version",
			"-h",
			"--help"
		];
	} else if (os.isWindows) {
		mainInformation = 
		[
			"/s",
			"/solution:VALUE",
			"/admin-password:VALUE",
			"/admin-port:VALUE",
			"/admin-ssl-port:VALUE",
			"/no-discovery",
			"/g",
			"/debugger:VALUE",
			"/debug-off",
			"/job-id:VALUE",
			"/system-workers:VALUE",
			"/verbose",
			"/version",
			"/help",
			"/?"
		];
	} else {
		mainInformation = 
		[
			"-s",
			"--solution=VALUE",
			"--admin-password=VALUE",
			"--admin-port=VALUE",
			"--admin-ssl-port=VALUE",
			"--no-discovery",
			"-g",
			"--debugger=VALUE",
			"--debug-off",
			"--job-id=VALUE",
			"--system-workers=VALUE",
			"--syslog",
			"--verbose",
			"--version",
			"-h",
			"--help"
		];
	}
	if (os.isWindows) {
		var optionHelp = SystemWorker.exec('cmd /c' + " " + '"' + newServerBin.path + '"' + " " + "/h");
		if (optionHelp != null || optionHelp.output.toString() != "" || optionHelp.output.length == 0)
			console.log("optionHelp is : " + optionHelp.output.toString());
		else
			console.log("optionHelp failed : " + optionHelp.error.toString()); 
	} else {
		var optionHelp = SystemWorker.exec(["sh","-c",'"' + newServerBin.path + '"' + " " + "-help"],null);
		if (optionHelp != null || optionHelp.output.toString() != "" || optionHelp.output.length == 0) 
			console.log("optionHelp is : " + optionHelp.output.toString());
		else 
			console.log("optionHelp failed : " + optionHelp.error.toString());
	}						
	var stdout = optionHelp.output.toString().replace(/\r?\n/g, '');
	console.log("stdout Value : " + stdout);
	if (os.isLinux) {
		for (var i = 0; i < mainInformation.length; i++) {
			if (stdout != (null || "")) {
				matched = stdout.match(mainInformation[i]);
				console.log("Matched Value :" + mainInformation[i] + matched.length + matched.toString());
			}	
			if (matched != null || matched[0] != "" || matched[0] != undefined)
			result.push(matched);
		}; 
	} else {
		for (var i = 0; i < mainInformation.length; i++) {
			if (stdout != (null || "")) {
				matched = stdout.match(mainInformation[i]);
				console.log("Matched Value :" + mainInformation[i] + matched.length + matched.toString());
			}	
			if (matched != null) { 
				if (matched[0] != "" || matched[0] != undefined)
				result.push(matched);
			}
		}; 
	}
	Y.Assert.areSame(mainInformation.length,result.length,"Information returned by help option isn't the same :" + result.toString()); 					
	}, 
	// --***-- Test to check the global information returned by option help 
	testCLIargs_helpOptionFunctional1: function() {
	var mainInformation;
	if (os.isLinux) 
		mainInformation = "Usage: " + newServerBin.path + " [OPTION]... [FILE]...http://www.wakanda.org  -s, --solution=VALUE       Solution or JS file  -d, --daemon               Go daemon and run in the backgroundAdministration options      --admin-password=VALUE Administrator login password (default: <empty>)      --admin-port=VALUE     Force the Administration panel port number      --admin-ssl-port=VALUE Force Administration panel ssl port numberService discovery options      --no-discovery         Do not start Bonjour servicesDebugger settings  -g, --debugger=VALUE       Debugger to launch at startup (ignored if                             --debug-off is specified) [remote: activate the                             remote web debugger, wakanda: Wakanda Debugger,                             none: disabled] (default: none)      --debug-off            Disable the Debugger features.The debugging                             interface will not be launched on the server                             side, which can be useful when the solution is                             used in a production environmentJobs      --job-id=VALUE         Specify the server job idSystem workers      --system-workers=VALUE Configuration file for system workersLogging facility      --syslog               Forward Wakanda Server's log messages to the                             Syslog daemon      --verbose              Verbose modeHelp:      --version              Display the version and exit  -h, --help                 Display the help and exit";
	else if (os.isWindows)
		mainInformation = "Usage: " + newServerBin.path + " [OPTION]... [FILE]...http://www.wakanda.org  /s, /solution:VALUE        Solution or JS fileAdministration options      /admin-password:VALUE  Administrator login password (default: <empty>)      /admin-port:VALUE      Force the Administration panel port number      /admin-ssl-port:VALUE  Force Administration panel ssl port numberService discovery options      /no-discovery          Do not start Bonjour servicesDebugger settings  /g, /debugger:VALUE        Debugger to launch at startup (ignored if                             --debug-off is specified) [remote: activate the                             remote web debugger, wakanda: Wakanda Debugger,                             none: disabled] (default: none)      /debug-off             Disable the Debugger features.The debugging                             interface will not be launched on the server                             side, which can be useful when the solution is                             used in a production environmentJobs      /job-id:VALUE          Specify the server job idSystem workers      /system-workers:VALUE  Configuration file for system workersLogging facility      /verbose               Verbose modeHelp:      /version               Display the version and exit  /?, /h, /help              Display the help and exit";
	else
		mainInformation = "Usage: " + newServerBin.path + " [OPTION]... [FILE]...http://www.wakanda.org  -s, --solution=VALUE       Solution or JS fileAdministration options      --admin-password=VALUE Administrator login password (default: <empty>)      --admin-port=VALUE     Force the Administration panel port number      --admin-ssl-port=VALUE Force Administration panel ssl port numberService discovery options      --no-discovery         Do not start Bonjour servicesDebugger settings  -g, --debugger=VALUE       Debugger to launch at startup (ignored if                             --debug-off is specified) [remote: activate the                             remote web debugger, wakanda: Wakanda Debugger,                             none: disabled] (default: none)      --debug-off            Disable the Debugger features.The debugging                             interface will not be launched on the server                             side, which can be useful when the solution is                             used in a production environmentJobs      --job-id=VALUE         Specify the server job idSystem workers      --system-workers=VALUE Configuration file for system workersLogging facility      --syslog               Forward Wakanda Server's log messages to the                             Syslog daemon      --verbose              Verbose modeHelp:      --version              Display the version and exit  -h, --help                 Display the help and exit";
	if (os.isWindows) {
		var optionHelp = SystemWorker.exec('"' + newServerBin.path + '"' + " " + "/h");
		if (optionHelp != null || optionHelp.output.toString() != "" || optionHelp.output.length == 0) 
			console.log("optionHelp is : " + optionHelp.output.toString());
		else 
			console.log("optionHelp failed : " + optionHelp.error.toString()); 
	} else {
		var optionHelp = SystemWorker.exec(["sh","-c",'"' + newServerBin.path + '"' + " " + "-help"],null);
		if (optionHelp != null || optionHelp.output.toString() != "" || optionHelp.output.length == 0) 
			console.log("optionHelp is : " + optionHelp.output.toString());
		else 
			console.log("optionHelp failed : " + optionHelp.error.toString());
	}						
	var stdout = optionHelp.output.toString().replace(/\r?\n/g, '');
	console.log("stdout Value : " + stdout);
	Y.Assert.areSame(mainInformation,stdout,"Information returned by help option isn't the same :" + stdout);
	}
};

/* Generated tests for Logic optionHelp */

//Attention, different scope for() and function()
for (var hl = 0; hl < helpLogicCase.helpLogic.length; hl++) 
	{
		testCase["testCLIargs_helpOptionLogic_" + helpLogicCase.helpLogic[hl].case + "_" + argformat(helpLogicCase.helpLogic[hl].ae.arg)] = function() 
		{
			var phl0 = helpLogicCase.helpLogic[index];
			var phl1 = helpLogicCase.name;
			var phl2 = helpLogicCase.args;
			var phl3 = argformat(helpLogicCase.helpLogic[index].ae.arg);
			var phl4 = helpLogicCase.helpLogic[index].config; 

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
