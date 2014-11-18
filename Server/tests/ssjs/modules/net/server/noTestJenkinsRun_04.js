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
include("Utils/Globals.js")include("Utils/Log.js")include("Utils/Buffer.js")include("Utils/Errors.js")include("TestCases/NodeJSNetSocketAPI.js")include("TestCases/NodeJSNetServerAPI.js")include("TestCases/NodeJSNetAPI.js")include("TestCases/HandCraftedHTTPRequest.js")var runInStudio=false;var runInJenkins=true;//////////////////////////////////////////////////////////////////////////////////// testCase//////////////////////////////////////////////////////////////////////////////////var testCase ={	name: 'test Node JS net API with handcrafted http requests',		_wait:	{		before: 2500,		after:	2500	},	_should: 	{		ignore:		{			}	},	setUp: function()	{	},	//This test suite focuses on basic integration of sockets, buffers and ssl	"test Node JS net API with an handcrafted http request and Wakanda web server" : testPerformSimpleGet,	"test Node JS tls API with an handcrafted https request and Wakanda web server" : testPerformSecureGet};