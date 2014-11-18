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


	/*
		Only the first line of git's output goes to stdout. The rest is dumped to stderr. There is a known issue with git's stderr where it is not
		easily piped back to stdout. First of all, "--progress" needs to be specified. Second, "2>&1" is needed to redirect stderr. However, system 
		workers pass the whole string for execution and the underlying shell does not receive the redirection instruction - 2>&1. In order to force
		redirection, the git command is executed via bash shell. In this way, the whole string is analyzed by the shell before execution.
	*/


	/*
		Branches (refs) on github:
		
			Documentation:
			http://developer.github.com/v3/git/refs/
			
			Example to get a list of repository branches:
			https://api.github.com/repos/stemnikov/Untitled13/git/refs
			

			Example of a response to the request above:
			[

				{
					"ref": "refs/heads/br1",
					"url": "https://api.github.com/repos/stemnikov/Untitled13/git/refs/heads/br1",
					"object": {
						"sha": "82c05643418a74135e3e9203a1f03072105af515",
						"type": "commit",
						"url": "https://api.github.com/repos/stemnikov/Untitled13/git/commits/82c05643418a74135e3e9203a1f03072105af515"
					}
				},
				{
					"ref": "refs/heads/master",
					"url": "https://api.github.com/repos/stemnikov/Untitled13/git/refs/heads/master",
					"object": {
						"sha": "70e3b159b7a0007da524c2d882532222c8dbd688",
						"type": "commit",
						"url": "https://api.github.com/repos/stemnikov/Untitled13/git/commits/70e3b159b7a0007da524c2d882532222c8dbd688"
					}
				}

			]
		*/
		
		/*
			How to check if local repo is in sync with temote one
			
			List commit hashes for a given branch (master here)
				git log -1 --pretty=%H refs/heads/master
				
			github
				https://stemnikov:password@api.github.com/repos/stemnikov/WakBranches/commits?sha=branch1
					lists commits within that branch
				https://api.github.com/repos/stemnikov/WakBranches/commits?sha=298d37bf8cb544d4907694fbb0026b98810bb13b
					to get all commits up to and including this sha commit
		
		*/
		
var			_isGitModuleReady = false;
var			_gitExecPath = "";
var			_gitLogCallback = null;
var			_gitProxy = null;
var			_gitUserAndMailInited = null;

function debug_alert ( inMessage )
{
	studio. alert ( inMessage );
	// console. log ( "GIT MODULE ALERT: " + ... );
}

function _gitOSIsSupportedNIX ( )
{
	return os. isMac || os. isLinux;
}

function _gitCreateFile ( inPath )
{
	var		flResult = null;
	
	try
	{
		flResult = new File ( inPath );
	}
	catch ( e )
	{
		flResult = studio. File ( inPath );
	}
	
	return flResult;
}

function _gitCreateFolder ( inPath )
{
	var		fldrResult = null;
	
	try
	{
		fldrResult = new Folder ( inPath );
	}
	catch ( e )
	{
		fldrResult = studio. fldrResult ( inPath );
	}
	
	return fldrResult;
}

function _gitPrepareFilePath ( inPath )
{
	var		pathConverted = inPath;
	
	if ( _gitOSIsSupportedNIX ( ) )
	{
		pathConverted = "'" + pathConverted + "'";
	}
	else if ( os. isWindows )
		pathConverted = '"' + pathConverted + '"';

	return pathConverted;
}

function _gitGetRepositoryRootFolder ( )
{
	var				fldrGitRoot = null;
	try
	{
		fldrGitRoot = studio. currentSolution. getSolutionFile ( ). parent; // . parent;
	}
	catch ( e )
	{
		fldrGitRoot = solution. getFolder ( );
	}
	
	return fldrGitRoot;
}

function _gitConvertToArrayOfFiles ( inPathsOrFilesArray )
{
	if ( typeof ( inPathsOrFilesArray ) == "undefined" || inPathsOrFilesArray == null || inPathsOrFilesArray. length == 0 )
		return inPathsOrFilesArray;
		
	if ( typeof ( inPathsOrFilesArray [ 0 ] ) != "string" )
		return inPathsOrFilesArray;
		
	var			arrFiles = new Array ( );
	for ( var i = 0; i < inPathsOrFilesArray. length; i++ )
	{
		var		fl = null;
		if ( _isFolder ( inPathsOrFilesArray [ i ] ) )
			fl = new Folder ( inPathsOrFilesArray [ i ] );
		else
			fl = new File ( inPathsOrFilesArray [ i ] );

		arrFiles. push ( fl );
	}

	return arrFiles;
}

function _gitConvertToFile ( inPath )
{
	if ( typeof ( inPath ) == "undefined" || inPath == null )
		return inPath;
		
	if ( typeof ( inPath ) != "string" )
		return inPath;
		
	var		fl = null;
	if ( _isFolder ( inPath ) )
		fl = new Folder ( inPath );
	else
		fl = new File ( inPath );

	return fl;
}

/*
	Converts a file path produced by git output relative to the repository to 
	a file system-based absolute path.
*/
function _convertToAbsoluteFSFromGitPath ( inRelativeGitPath )
{
	var			strAbsolute = "";
	if ( inRelativeGitPath. indexOf ( "../" ) == 0 )
	{
		// Project file system
		strAbsolute = inRelativeGitPath. substring ( 3 );
		strAbsolute = "/PROJECT_" + strAbsolute;
	}
	else
	{
		// Solution file system
		strAbsolute = "/SOLUTION/" + inRelativeGitPath;
	}

	return strAbsolute;
}

/*
	Replace \xxx codes with corresponding UniCode characters
*/
function _gitOctalToUniCode ( inText )
{
//debug_alert ( "Original text: " + inText );
	var			strResult = "";
	var			strDigits = "";
	for ( var i = 0; i < inText. length; i++ )
	{
		if ( inText [ i ] != "\\" || i == inText. length - 1 )
		{
			strResult += inText [ i ];
			
			continue;
		}
		
		// Let's consume three digits that follow
		strDigits = "";
		for ( var j = 0; j < 3 && i + 1 < inText. length && "0" <= inText [ i + 1 ] && inText [ i + 1 ] <= "9"; j++ )
		{
			i++;
			strDigits += inText [ i ];
		}
		
		if ( strDigits. length > 0 )
		{
			strResult += String. fromCharCode ( parseInt ( strDigits, 8 ) );
		}
		else
			strResult += "\\";
	}

//debug_alert ( "Before processing: " + strResult );
//debug_alert ( "After escaping: " + escape ( strResult ) );
	
	// This line may need to be commented on older version of Git
	strResult = decodeURIComponent ( escape ( strResult ) );
	
//debug_alert ( "After decoding: " + strResult );

	return strResult;
}

function _gitGetProxy ( inURL )
{
	if ( typeof ( _gitProxy ) != "undefined" && _gitProxy != null )
		return _gitProxy;
		
	return os. getProxy ( inURL );
}

function _gitConfigureProxy ( inURL, inWorkTree )
{
	if ( typeof ( _gitProxy ) != "undefined" && _gitProxy != null )
		// A custom proxy has already been set. No additional configuration is needed
		return;
		
	var			strRepoAndTreePath = _gitGetRepoAndTree ( inWorkTree );
	
	var			objProxy = os. getProxy ( inURL );
	if ( typeof ( objProxy ) == "undefined" || objProxy == null )
	{
//debug_alert ( "Proxy is not needed for " + inURL );
		_gitUnsetConfigProperty ( "http.proxy", false, strRepoAndTreePath );
	}
	else
	{
		var				strProxy = objProxy. host + ":" + objProxy. port;
//debug_alert ( "Proxy is " + strProxy + " for " + inURL );
		_gitSetConfigProperty ( "http.proxy", strProxy, false, strRepoAndTreePath );
	}
}

function _gitExecuteHTTPRequest ( inURL, inVerb, inBody )
{
	var			headers, resultObj;

	var			strResult = "";
	var			objProxy = _gitGetProxy ( inURL );
	
	var			xhr;
	if ( typeof ( studio ) === "undefined" || studio == null )
	{
		if ( typeof ( objProxy ) === "undefined" || objProxy == null )
			xhr = new XMLHttpRequest ( );
		else
			xhr = new XMLHttpRequest ( objProxy );
	}
	else
	{
		if ( typeof ( objProxy ) === "undefined" || objProxy == null )
		{
//debug_alert ( "Git module: Not using proxy for " + inURL );
			xhr = new studio. XMLHttpRequest ( );
		}
		else
		{
//debug_alert ( "Using proxy for " + inURL );
			xhr = new studio. XMLHttpRequest ( objProxy );
		}
	}

	xhr. onreadystatechange = function ( )
	{
		var		state = this. readyState;
		if ( state !== 4 )
		{
			// while the status event is not Done we continue
			return;
		}
	 
		strResult = this. responseText;
//debug_alert ( "Git module: HTTP response: " + strResult );
     };
   
	xhr. open ( inVerb, inURL );
	xhr. setRequestHeader ( 'User-Agent', 'Wakanda/1.0 XHR/1.0');
	if ( typeof ( inBody ) != "undefined" && inBody != null )
		xhr. send ( inBody );
	else
		xhr. send ( );
		
//debug_alert ( "Git module: HTTP code: " + xhr. status );
	return ( xhr. status == 200 || xhr. status == 201 ? strResult : undefined );
}

function _isGitHubURL ( inURL )
{
	var		nStartIndex = inURL. indexOf ( "//" );
	nStartIndex = inURL. indexOf ( "/", nStartIndex + 2 );
	
	return ( inURL. indexOf ( "api.github.com" ) == nStartIndex - "api.github.com". length );
}

function _isWakandaURL ( inURL )
{
	if ( _isGitHubURL ( inURL ) )
		return false;
		
	var		nStartIndex = inURL. indexOf ( "//" );
	nStartIndex = inURL. indexOf ( "/", nStartIndex + 2 );
	nStartIndex = inURL. indexOf ( "gitservice/repo", nStartIndex + 1 );

	return ( nStartIndex > -1 );
}

function _gitExtractFolderArray ( inPaths )
{
	var			arrUniqueFolders = new Array ( );
	for ( var i = 0; i < inPaths. length; i++ )
	{
//debug_alert ( "_gitExtractFolderArray : " + inPaths [ i ] );
		if ( inPaths [ i ]. charAt ( inPaths [ i ]. length - 1 ) == '/' )
		{
			if ( arrUniqueFolders. indexOf ( inPaths [ i ] ) < 0 )
				// add folders as is
				arrUniqueFolders. push ( inPaths [ i ] );
		}
		/*else
		{
			var		strFolder = inPaths [ i ]. substring ( 0, inPaths [ i ]. lastIndexOf ( "/" ) );
			if ( arrUniqueFolders. indexOf ( strFolder ) < 0 )
				// move up one level from file to folder
				arrUniqueFolders. push ( strFolder );
		}*/
	}
	
	return arrUniqueFolders;
}

function _isFolder ( inFileOrFolder )
{
	if ( typeof ( inFileOrFolder ) === "string" )
		return Folder. isFolder ( inFileOrFolder );
		
	return Folder. isFolder ( inFileOrFolder. path );
}

function _gitExtractFolderArrayFS ( inArrFilesOrFolders )
{
	var			arrUniqueFolders = new Array ( );
	for ( var i = 0; i < inArrFilesOrFolders. length; i++ )
	{
		if ( _isFolder ( inArrFilesOrFolders [ i ] ) )
			arrUniqueFolders. push ( inArrFilesOrFolders [ i ] );
	}
	
	return arrUniqueFolders;
}

function _gitGetRepoAndTree ( inWorkTree )
{
	var		strResult = "";
	
	var		strRepository = inWorkTree;
	if ( strRepository [ strRepository. length - 1 ] != "/" )
		strRepository += "/";
		
	strRepository += ".git";
	
	if ( _gitOSIsSupportedNIX ( ) )
		strResult = " --git-dir=" + "'" + strRepository + "'" + " --work-tree=" + "'" + inWorkTree + "'";
	else
		strResult = " --git-dir=" + '"' + strRepository + '"' + " --work-tree=" + '"' + inWorkTree + '"';
		
	return strResult;
}

function _gitGetRepoAndTreeFS ( )
{
	return "--git-dir={R} --work-tree={r} ";
}

function _gitEscapeForSystemWorkers ( inString )
{
	var			strResult = inString. replace ( /{/g,"{{");
//debug_alert ( inString + " escaped into " + strResult );
	return strResult;
}



var myTestImpl = function ( )
{
	var			isGitHub = _isGitHubURL ( "https://sergiy:t@api.github.com/user/repos" );
	debug_alert ( "https://sergiy:t@api.github.com/user/repos is for GitHub == " + isGitHub );
	isGitHub = _isGitHubURL ( "http://sergiy:123@127.0.0.1:8081/gitservice/repo master" );
	debug_alert ( "http://sergiy:123@127.0.0.1:8081/gitservice/repo master is for GitHub == " + isGitHub );

	var			isWakanda = _isWakandaURL ( "http://sergiy:123@127.0.0.1:8081/gitservice/repo master" );
	debug_alert ( "http://sergiy:123@127.0.0.1:8081/gitservice/repo master is for Wakanda == " + isWakanda );
	isWakanda = _isWakandaURL ( "https://sergiy:t@api.github.com/user/repos" );
	debug_alert ( "https://sergiy:t@api.github.com/user/repos is for Wakanda == " + isWakanda );
}

function _gitGetConfigProperty ( inProperty, inIsGlobal, inRepoAndTreePath )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + " config ";
	if ( inIsGlobal )
		gitCommand += "--global ";

	gitCommand += "--get " + inProperty;
		
//debug_alert ( "Executiong " + gitCommand );
	var				arrResponse = _gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 10 * 1000, null );
	
	if ( typeof ( arrResponse ) === "undefined" || arrResponse == null || arrResponse. length == 1 )
		return null;
		
	return arrResponse [ 0 ];
}

function _gitSetConfigProperty ( inProperty, inValue, inIsGlobal, inRepoAndTreePath )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + " config ";
	if ( inIsGlobal )
		gitCommand += "--global ";

	gitCommand += "--add " + inProperty + " " + inValue;

	var				arrResponse = _gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 10 * 1000, null );

	return arrResponse;
}

function _gitUnsetConfigProperty ( inProperty, inIsGlobal, inRepoAndTreePath )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + " config --unset-all ";
	if ( inIsGlobal )
		gitCommand += "--global ";

	gitCommand += inProperty;

	var				arrResponse = _gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 10 * 1000, null );

	return arrResponse;
}

function _gitInitUserAndEMail ( inRepoAndTreePath, inForce )
{
	if ( typeof ( inForce ) === "undefined" || inForce == null )
		inForce = false;
		
	if ( _gitUserAndMailInited != null && !inForce )
		return;
		
	var				arrResponse = null;
	
	var				gitUserName = _gitGetConfigProperty ( "user.name", false, inRepoAndTreePath );
	var				userNameError = null;
	if ( gitUserName == null )
	{
		arrResponse = _gitSetConfigProperty ( "user.name", "Your_Wakanda_Developer_Name_Here", false, inRepoAndTreePath ); // The default value
		userNameError = gitExtractErrorImpl ( arrResponse, "" );
	}

	var				gitUserEMail = _gitGetConfigProperty ( "user.email", false, inRepoAndTreePath );
	var				userEMailError = null;
	if ( gitUserEMail == null )
	{
		arrResponse = _gitSetConfigProperty ( "user.email", "WakandaDeveloper@wakanda.org", false, inRepoAndTreePath ); // The default value
		userEMailError = gitExtractErrorImpl ( arrResponse, "" );
	}
		
	if ( userNameError == null && userEMailError == null )
		_gitUserAndMailInited = true;
	else
	{
//debug_alert ( "Failed to set user name and user email." );
	}
}

var gitInitUserAndEMailImpl = function ( inWorkTree )
{
	var				strRepoAndTreePath = _gitGetRepoAndTree ( inWorkTree );
//debug_alert ( "Git: Forcing user and email init in " + inWorkTree );
	_gitInitUserAndEMail ( strRepoAndTreePath, true );
}

/**
 * Initializes the git module. Needs to be called only once for a given JS context. 
 *
 * @param {String} inGitExecPath
 * 	The path to git executable.
 * @param {function} inLogCallback
 *  A callback function to be called by git module each time it executes a git command.
 *  Accepts two parameters: inCommand - command executed, gitResponse - text response returned by git
 * @param {String} inWorkTree
 *	Git repository root path
 *
 * @return nothing
 *
 */
var gitInitImpl = function ( inGitExecPath, inLogCallback, inWorkTree )
{
	if ( typeof ( inWorkTree ) != "undefined" && inWorkTree != null && inWorkTree != "" )
	{
		var				strRepoAndTreePath = _gitGetRepoAndTree ( inWorkTree );
		_gitInitUserAndEMail ( strRepoAndTreePath, false );
	}
	
	if ( _isGitModuleReady )
	{
		// debug_alert ( "git module has already been initialized!" );
		
		return;
	}
	
	_gitExecPath = inGitExecPath;
//debug_alert ( "_gitExecPath == '" + _gitExecPath + "'" );
	_gitLogCallback = inLogCallback;
	_isGitModuleReady = true;
}

/**
 * Sets the path to the git executable. 
 * 
 * @param {String} inGitExecPath
 * 	The path to git executable.
 *
 * @return nothing
 *
 */
var gitSetGitExecPathImpl = function ( inGitExecPath )
{
	if ( typeof inGitExecPath == 'undefined' || inGitExecPath === null || inGitExecPath == '' )
		return;
		
	_gitExecPath = inGitExecPath;
}

/**
 * Sets the proxy parameters for outgoung HTTP requests semt by the module.
 * 
 * @param {String} inHost
 * 	IP address or DNS name of the proxy server
 * @param {Number} inPort
 * 	Port number of the proxy server
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return nothing
 */
var gitSetProxyImpl = function ( inHost, inPort, inWorkTree )
{
	var				strRepoAndTreePath = _gitGetRepoAndTree ( inWorkTree );
	if ( typeof ( inHost ) === "undefined" || inHost == null )
	{
		_gitUnsetConfigProperty ( "http.proxy", false, strRepoAndTreePath );
		_gitProxy = null;
		
		return;
	}
	
	if ( typeof ( inPort ) === "undefined" || inPort == null )
	{
		debug_alert ( "Error: setProxy - port number can not be null or undefined" );
		
		return;
	}

	_gitProxy = new Object ( );
	_gitProxy. host = inHost;
	_gitProxy. port = inPort;
	
	var				gitProxy = _gitGetConfigProperty ( "http.proxy", false, strRepoAndTreePath );
//debug_alert ( "gitProxy setting == " + gitProxy );
	if ( gitProxy == null )
		_gitSetConfigProperty ( "http.proxy", inHost + ":" + inPort, false, strRepoAndTreePath );
}

/**
 * Executes a given git command.
 * 
 * @param {String} inCommand
 * 	The command to be executed.
 * @param {String} inRootPath
 *  An absolute path to be used by git as the root folder for its actions.
 * @param {Number} inTimeOut
 *  Optional time in milliseconds to wait for command execution.
 *	Default wait is 15000 milliseconds.
 * 
 * @return {String} git response in text form.
 *
 */
var gitExecuteImpl = function ( inCommand, inRootPath, inTimeOut, inCallback )
{
	var			gitWorker;
	if ( inRootPath == undefined || inRootPath == null || inRootPath == "" )
		gitWorker = new SystemWorker ( inCommand );
	else
		gitWorker = new SystemWorker ( inCommand, inRootPath );
		
	gitWorker. setBinary ( true );

	if ( typeof ( inCallback ) != "undefined" && inCallback != null )
		inTimeOut = -1;
	
	var			gitResponse = "";
	var			isZombie	= false;
	var			bDone = false;
	
	gitWorker. onmessage = function ( e )
	{	
		if (!isZombie) {
		
			var		result = arguments [ 0 ]. data;	
				
			//gitDebugMsg ( "onmessage: " + result. toString ( ) );
			gitResponse += result. toString ( );
			//gitDebugMsg ( "git returned " + result. length + " bytes" );
			
		}
	}
	
	gitWorker. onerror = function ( e )
	{
		if (!isZombie) {
		
			var		result = arguments [ 0 ]. data;
					
			//gitDebugMsg ( "onerror: " + result. toString ( ) );
			gitResponse += result. toString ( );
			//gitDebugMsg ( "git returned " + result. length + " bytes" );	
			
		}
	}
	
	gitWorker. onterminated = function ( )
	{
		if (!isZombie) {
		
			//gitDebugMsg ( "inside gitWorker::onterminated" );
			bDone = true;
			exitWait ( );
			
		}
		
		if ( typeof ( inCallback ) != "undefined" && inCallback != null )
		{
//debug_alert ( "Will be calling the execution callback." );
			inCallback ( gitResponse. split ( "\n" ) );
		}
	}

	if ( typeof ( inTimeOut ) === "undefined" || inTimeOut == null )
		inTimeOut = 15000;
		
	// If a wait() is done, then make sure we wait() for the specified timeout
	// unless one of the following conditions occurs :
	//
	//  * bDone is true (the onterminated callback of the gitworker has been called);
	//  * the close flag has been set (wait() returns 1);
	//  * we waited (calling wait() several times if needed) for the specified timeout.
			
	if ( inTimeOut >= 0 ) {
	
		var	timeLeft;
		
		timeLeft = inTimeOut;
		for ( ; ; ) {
		
			var	startDate, endDate;
				
			startDate = Date.now();
			if (wait(timeLeft) || bDone) 
			
				break;
			
			endDate = Date.now();
			
			timeLeft -= endDate - startDate;
			if (timeLeft <= 0)
			
				break;
			
		}
		
	}
	
	if ( inTimeOut != -1 )
		isZombie = true;	
	
	// trace("gitResponse : " + gitResponse + "\n");
	
	return gitResponse;
}

/**
 * Internal private git command execution.
 * 
 * @param {String} inCommand
 * 	The command to be executed.
 * @param {String} inRootPath
 *  An optional absolute path to be used by git as the root folder for its actions.
 * @param {Number} inTimeOut
 *  Optional time in milliseconds to wait for command execution.
 * 
 *  Calls the log callback so that module's user knows exactly what commands are executed.
 *
 * @return {String} git response in the form of array of strings.
 *
 */
function _gitExecute ( inCommand, inRootPath, inTimeOut, inCallback )
{
	var			gitResponse = gitExecuteImpl ( inCommand, inRootPath, inTimeOut, inCallback );
	if ( _gitLogCallback != null )
		_gitLogCallback ( inCommand, gitResponse );
		
	var			arrLines = gitResponse. split ( "\n" );
	
	return arrLines;
}

// FileSystem-based implementation
var gitExecuteFSImpl = function ( inPattern, inParameters, inRootFolder, inTimeOut, inCallback )
{
//var	fldrGitRoot = studio. currentSolution. getSolutionFile ( ). parent. parent;
//var	wTest = new SystemWorker ( "git", "-version -c '{s}' -all", fldrGitRoot, arrObjectTest );
//var	wTest = new SystemWorker ( "git", "--version", fldrGitRoot, arrObjectTest );
//var	wTest = new SystemWorker ( "git", "-version -c '{s} {s}' -all {{{s}}", fldrGitRoot, arrObjectTest );


	var			gitWorker;
	gitWorker = new SystemWorker ( "git", inPattern, inRootFolder, inParameters );
		
	gitWorker. setBinary ( true );

	if ( typeof ( inCallback ) != "undefined" && inCallback != null )
		inTimeOut = -1;
	
	var			gitResponse = "";
	var			isZombie	= false;
	var			bDone = false;
	
	gitWorker. onmessage = function ( e )
	{	
		if (!isZombie) {
		
			var		result = arguments [ 0 ]. data;	
				
			//gitDebugMsg ( "onmessage: " + result. toString ( ) );
			gitResponse += result. toString ( );
			//gitDebugMsg ( "git returned " + result. length + " bytes" );
			
		}
	}
	
	gitWorker. onerror = function ( e )
	{
		if (!isZombie) {
		
			var		result = arguments [ 0 ]. data;
					
			//gitDebugMsg ( "onerror: " + result. toString ( ) );
			gitResponse += result. toString ( );
			//gitDebugMsg ( "git returned " + result. length + " bytes" );	
			
		}
	}
	
	gitWorker. onterminated = function ( )
	{
		if (!isZombie) {
		
			//gitDebugMsg ( "inside gitWorker::onterminated" );
			bDone = true;
			exitWait ( );
			
		}
		
		if ( typeof ( inCallback ) != "undefined" && inCallback != null )
		{
//debug_alert ( "Will be calling the execution callback." );
			inCallback ( gitResponse. split ( "\n" ) );
		}
	}

	if ( typeof ( inTimeOut ) === "undefined" || inTimeOut == null )
		inTimeOut = 15000;
		
	// If a wait() is done, then make sure we wait() for the specified timeout
	// unless one of the following conditions occurs :
	//
	//  * bDone is true (the onterminated callback of the gitworker has been called);
	//  * the close flag has been set (wait() returns 1);
	//  * we waited (calling wait() several times if needed) for the specified timeout.
			
	if ( inTimeOut >= 0 ) {
	
		var	timeLeft;
		
		timeLeft = inTimeOut;
		for ( ; ; ) {
		
			var	startDate, endDate;
				
			startDate = Date.now();
			if (wait(timeLeft) || bDone) 
			
				break;
			
			endDate = Date.now();
			
			timeLeft -= endDate - startDate;
			if (timeLeft <= 0)
			
				break;
			
		}
		
	}
	
	if ( inTimeOut != -1 )
		isZombie = true;	
	
	// trace("gitResponse : " + gitResponse + "\n");
	
	return gitResponse;
}

function _gitExecuteFS ( inPattern, inParameters, inRootFolder, inTimeOut, inCallback )
{
	var			gitResponse = gitExecuteFSImpl ( inPattern, inParameters, inRootFolder, inTimeOut, inCallback );
	if ( _gitLogCallback != null )
		_gitLogCallback ( "FILE SYSTEM BASED WITH PATTERN: " + inPattern, gitResponse );
		
	var			arrLines = gitResponse. split ( "\n" );
	
	return arrLines;
}

/**
 * Verifies if git module is being used within a valid git repository.
 * 
 * @param {String} inPath
 *  The folder to be tested for presence of a Git repository.
 *
 * @return {Boolean} true if repository is valid, false otherwise.
 *
 */
var	gitVerifyRepositoryImpl = function ( inPath )
{
	if ( os. isWindows ) {
		if ( inPath [ inPath. length - 1 ] != "\\" )
			inPath += "\\";
	}
	else if ( _gitOSIsSupportedNIX ( ) ) {
		if ( inPath [ inPath. length - 1 ] != "/" )
			inPath += "/";
	}
	else
		debug_alert ( "Error: unknown OS" );
		
	inPath += ".git";
	if ( os. isWindows )
		inPath += "\\";
	else if ( _gitOSIsSupportedNIX ( ) )
		inPath += "/";
	else
		debug_alert ( "Error: unknown OS" );
		
	inPath += "index";

	var			flDotGit = _gitCreateFile ( inPath );
	return flDotGit. exists;
}

/**
 * Verifies if git response has any errors (conflicts only for now) in it.
 * 
 * @param {String} inLines
 * 	git response text in the forms of array of strings
 * 
 * @return {Boolean} true if there are errors, false otherwise.
 *
 */
var	gitResponseHasConflictsImpl = function ( inLines )
{
	var		bResult = false;
	
	try
	{
		for ( var i = 0; i < inLines. length; i++ )
		{
			if ( /^CONFLICT \(content\):/. test ( inLines [ i ] ) )
			{
				bResult = true;
			
				break;
			}
		}
	}
	catch ( e )
	{
		debug_alert ( e. message );
	}

	//debug_alert ( "bResult == " + bResult );
	
	return bResult;
}

/**
 * Verifies if there are any modifications in a given repository.
 * 
 * @param {String} inWorkTree
 * 	git repository root path
 * @param {Array of String} inPathsFilter
 * 	An optional array of paths where to search for modifications instead of the whole repository
 * 
 * @return {Boolean} true if there is at least one modification, false otherwise.
 *
 */
var	gitRepositoryHasModificationsImpl = function ( inWorkTree, inPathsFilter )
{
	var				bResult = false;

	var				gitCommand = _gitGetRepoAndTreeFS ( ) + " status --porcelain --untracked-files=no";
	var				inParameters = null;
	if ( typeof ( inPathsFilter ) != "undefined" && inPathsFilter != null )
	{
		gitCommand += " -- {[f]}";
		var			arrFiles = _gitConvertToArrayOfFiles ( inPathsFilter );
		inParameters = new Array ( );
		inParameters. push ( arrFiles );
	}

	var				arrLines = _gitExecuteFS ( gitCommand, inParameters, _gitGetRepositoryRootFolder ( ), 60 * 1000, null );
	for ( var i = 0; i < arrLines. length; i++ )
	{
		if (	arrLines [ i ] [ 0 ] == 'M' || arrLines [ i ] [ 1 ] == 'M' ||
				arrLines [ i ] [ 0 ] == 'A' || arrLines [ i ] [ 1 ] == 'A' ||
				arrLines [ i ] [ 0 ] == 'D' || arrLines [ i ] [ 1 ] == 'D' ||
				arrLines [ i ] [ 0 ] == 'R' || arrLines [ i ] [ 1 ] == 'R' ||
				arrLines [ i ] [ 0 ] == 'C' || arrLines [ i ] [ 1 ] == 'C' ||
				arrLines [ i ] [ 0 ] == 'U' || arrLines [ i ] [ 1 ] == 'U' )
		{
			bResult = true;
			//debug_alert ( "Matching line: " + arrLines [ i ] );
			
			break;
		}
	}

	return bResult;
}

/**
 * Provides a default .gitignore content for a  Wakanda solution.
 * 
 * @return {String} The default ignore filters for a Wakanda solution.
 *
 */
var gitGetDefaultIgnoreImpl = function ( )
{
	var		strIgnore = "# OS X\n";
	strIgnore += "*.DS_Store\n";
	strIgnore += "._*\n";
	strIgnore += "# Wakanda data\n";
	strIgnore += "*.waData\n";
	strIgnore += "# Wakanda preferences\n";
	strIgnore += "*.waPreferences\n";
	strIgnore += "# Wakanda log\n";
	strIgnore += "*.waLog\n";
	strIgnore += "*/Logs\n";
	strIgnore += "studio_log*\n";
	strIgnore += "# Wakanda code symbols\n";
	strIgnore += "*.waSym\n";
	strIgnore += "*.waSymData\n";
	strIgnore += "# Wakanda index\n";
	strIgnore += "*.waIndex\n";
	strIgnore += "*.waIndx\n";
	strIgnore += "*.Match\n";
	strIgnore += "# Wakanda User and Group cache\n";
	strIgnore += "*.cacheUAG\n";
	strIgnore += "# Wakanda breakpoints\n";
	strIgnore += "breakpoints.json\n";
	strIgnore += "# Wakanda session ID cache\n";
	strIgnore += "sessionID.json\n";
	strIgnore += "# Wakanda backup\n";
	strIgnore += "*.waBackup\n";
	strIgnore += "# Wakanda Remote Model Cache\n";
	strIgnore += "*.waRemoteModel\n\n";
	
//debug_alert ( "Result of getDefaultIgnore: \n" + strIgnore );
	return strIgnore;
}

var gitGetIgnoreFilePathImpl = function ( inWorkTree )
{
	var			gitIgnorePath = inWorkTree;
	if ( os. isWindows )
		gitIgnorePath += "\\";
	else if ( _gitOSIsSupportedNIX ( ) )
		gitIgnorePath += "/";
	else
	{
		debug_alert ( "Error: unknown OS" );
		
		return null;
	}
		
	gitIgnorePath += ".gitignore";
	
	return gitIgnorePath;
}

/**
 * Creates if necessary a default .gitignore file tailored for Wakanda solutions.
 * 
 * @param {String} inWorkTree
 * 	git working tree path where to create the .gitignore
 * 
 * @return {String}
 *  Returns empty string if the .gitignore file exists aready, returns full file path if it was
 *  actually created, returns null on error.
 *
 */
var gitInitIgnoreImpl = function ( inWorkTree )
{
	// debug_alert ( "Calling gitInitIgnoreImpl on work tree " + inWorkTree );
	var			gitIgnorePath = gitGetIgnoreFilePathImpl ( inWorkTree );
	
	var			flIgnore = _gitCreateFile ( gitIgnorePath );
	if ( flIgnore. exists )
		return "";
	else
	{
		var		bCreated = flIgnore. create ( );
		if ( !bCreated )
		{
			debug_alert ( "Failed to create " + gitIgnorePath );
			
			return null;
		}
	}
	
	// Now let's write the default content for Wakanda .gitignore
	var			strmIgnore = TextStream ( flIgnore, "write" );
	var			strDefaultIgnore = gitGetDefaultIgnoreImpl ( );
	strmIgnore. write ( strDefaultIgnore);
	strmIgnore. flush ( );
	strmIgnore. close ( );
	
	return gitIgnorePath;
}

/**
 * Returns the content of the current .gitignore file for a given repository.
 * 
 * @param {String} inWorkTree
 * 	git working tree path where to read the .gitignore
 * 
 * @return {String}
 *  Returns .gitignore content.
 *
 */
var gitGetIgnoreContentImpl = function ( inWorkTree )
{
	var			gitIgnorePath = gitGetIgnoreFilePathImpl ( inWorkTree );
	var			flIgnore = _gitCreateFile ( gitIgnorePath );
	if ( !flIgnore. exists )
	{
//debug_alert ( gitIgnorePath + " does not exist" );
		return "";
	}

	var			strIgnore = "";
	var			strmIgnore = TextStream ( flIgnore, "read" );
	while ( !strmIgnore. end ( ) )
	{
		var		strLine = strmIgnore. read ( "" );
		//debug_alert ( "line " + strLine + " of length " + strLine. length );
		if ( strLine. length > 0 )
			strIgnore += strLine + "\n";
	}
	
	//debug_alert ( ".gitignore:\n" + strIgnore );
	strmIgnore. close ( );
	
//debug_alert ( "Result of getIgnoreContent: \n" + strIgnore );
	return strIgnore;
}

/**
 * Sets the content of the current .gitignore file for a given repository.
 * 
 * @param {String} inNewContent
 * 	New content of the .gitignore file to be save
 * @param {String} inWorkTree
 * 	git working tree path where to read the .gitignore
 * @param {boolean} inShouldStage
 *	Optional. The .gitignore file is automatically staged if this parameter is true. The staging
 *	is not performed otherwise.
 * 
 * @return nothing
 *
 */
var gitSetIgnoreContentImpl = function ( inNewContent, inWorkTree, inShouldStage )
{
	var			gitIgnorePath = gitGetIgnoreFilePathImpl ( inWorkTree );
	var			flIgnore = _gitCreateFile ( gitIgnorePath );
	if ( !flIgnore. exists )
	{
		var		bCreated = flIgnore. create ( );
		if ( !bCreated )
		{
			debug_alert ( "Failed to create " + gitIgnorePath );
			
			return;
		}
	}

	var			strmIgnore = TextStream ( flIgnore, "Overwrite" );
	strmIgnore. write ( inNewContent );
	strmIgnore. flush ( );
	strmIgnore. close ( );
	
	if ( typeof ( inShouldStage ) != "undefined" && inShouldStage )
	{
		var		arrPath = new Array ( );
		arrPath. push ( gitIgnorePath );
		gitStageFilesImpl ( arrPath, inWorkTree );
	}
}

/**
 * Returns git's version string
 * 
 */
var	gitGetVersionImpl = function ( )
{
	var				gitCommand = "version";
	var				strResult = null;
	
try
{
	var				arrLines = _gitExecuteFS ( gitCommand, null, null, 10 * 1000, null );
	if ( typeof ( arrLines ) === "undefined" || arrLines == null )
		return null;
	else
	{
		if (	arrLines [ 0 ]. indexOf ( "command not found" ) == -1 &&
				arrLines [ 0 ]. indexOf ( "bash" ) == -1 &&
				arrLines [ 0 ]. length > 0 )
			strResult = arrLines [ 0 ];
		//else
			//debug_alert ( "git is not installed" );
	}
}
catch ( e )
{
	strResult = null;
}

	return strResult;
}

/**
 * Runs external merge tool for all merge conflicts in a given repository.
 * 
 * @param {String} inWorkTree
 *  Git repository root path
 * 
 * @return nothing
 *
 */
var	gitRunMergeAllImpl = function ( inWorkTree )
{
/*
[http]
        sslVerify = false
[user]
        name = Sergiy
        email = stemnikov@gmail.com
[merge]
        tool = p4merge
[diff]
        tool = p4merge
[difftool "p4merge"]
        path = /Applications/p4merge.app/Contents/MacOS/p4merge
[mergetool "p4merge"]
        path = /Applications/p4merge.app/Contents/MacOS/p4merge
        keepTemporaries = false
        keepBackup = false
[mergetool]
        keepBackup = false
*/

	var				gitCommand = _gitGetRepoAndTreeFS ( ) + " mergetool -y";
	return _gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 10000, null );

}

/**
 * Executes a given stash command in a given repository.
 * 
 * @param {String} inActionName
 *  Stash command in the form of a string
 * @param {String} inWorkTree
 *  Git repository root path
 * @param {String} inComment
 *  A comment to be attached to the action.
 * 
 *  @return {String} git response in the form of array of strings.
 *
 */
function gitExecuteStashAction ( inActionName, inWorkTree, inComment )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + " stash " + inActionName;
	var				inParameters = null;
	if ( inActionName == "save" )
	{
		gitCommand += " {s}";
		inParameters = new Array ( );
		inComment = _gitEscapeForSystemWorkers ( inComment );
		inParameters. push ( inComment );
	}
	
	return _gitExecuteFS ( gitCommand, inParameters, _gitGetRepositoryRootFolder ( ), 60 * 60 * 1000, null );
}

/**
 * Save the current modifications into a stash in a given repository.
 * 
 * @param {String} inWorkTree
 *  Git repository root path
 * @param {String} inComment
 *  A comment to be attached to the stash.
 * 
 * @return nothing
 *
 */
var	gitSaveStashImpl = function ( inWorkTree, inComment )
{
	return gitExecuteStashAction ( "save", inWorkTree, inComment );
}

/**
 * Pops the latest stash in a given repository.
 * 
 * @param {String} inWorkTree
 *  Git repositry root path
 * @param {String} inID
 *  Optional stash ID in the form of stash@{xxx} reference
 * @param {String} inWithIndex
 *  Optional boolean which, if true, enables the --index flag so that index changes are also reinstated and the repo is popped into the 
 *	exact previous state with all of its staged but not commited modifications.
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitPopLatestStashImpl = function ( inWorkTree, inID, inWithIndex )
{
	var			strAction = "pop";
	if ( typeof ( inID ) != "undefined" && inID != null && inID. length > 0 )
		strAction += " " + _gitEscapeForSystemWorkers ( inID );
		
	if ( typeof ( inWithIndex ) != "undefined" && inWithIndex != null && inWithIndex )
		strAction += " --index";
		
	return gitExecuteStashAction ( strAction, inWorkTree, "" );
}

/**
 * Drops a stash in a given repository.
 * 
 * @param {String} inWorkTree
 *  Git repositry root path
 * @param {String} inID
 *  Optional stash ID in the form of stash@{xxx} reference. If present then the given stash is dropped.
 *	If not present then the latest stash is dropped.
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitDropStashImpl = function ( inWorkTree, inID )
{
	var			strAction = "drop";
	if ( typeof ( inID ) != "undefined" && inID != null && inID. length > 0 )
		strAction += " " + _gitEscapeForSystemWorkers ( inID );
		
	return gitExecuteStashAction ( strAction, inWorkTree, "" );
}
/**
 * Lists all existing stashes in a given repository.
 * 
 * @param {String} inWorkTree
 *  Git repositry root path
 * 
 * @return nothing
 *
 */
var gitListStashesImpl = function ( inWorkTree )
{
	return gitExecuteStashAction ( "list", inWorkTree, "" );
}

/**
 * Finds stash's index for a given stash comment.
 * 
 * @param {String} inComment
 *  A comment with which to identify a stash
 * @param {String} inWorkTree
 *  Git repositry root path
 * 
 * @return Stash ID in the form of "stash@{xxx}", otherwise an empty string if not found
 *
 */
var gitGetStashIDImpl = function ( inComment, inWorkTree )
{
	if ( os. isWindows )
		inComment = '": ' + inComment + '$"';
	else if ( _gitOSIsSupportedNIX ( ) )
		inComment = "': " + inComment + "$'";
	else
		debug_alert ( "Error: unknown OS" );
		
	var				arrLines = gitExecuteStashAction ( "list --grep=" + inComment, inWorkTree, "" );

	if ( arrLines. length <= 1 )
		return "";
		
	return arrLines [ 0 ]. substring ( 0, arrLines [ 0 ]. indexOf ( ":" ) );
}

/**
 * Shows (in the log for now) the latest stash in a given repository.
 * 
 * @param {String} inWorkTree
 *  Git repositry root path
 * 
 * @return nothing
 *
 */
var gitShowLatestStashImpl = function ( inWorkTree )
{
	return gitExecuteStashAction ( "show -v", inWorkTree, "" );
}

/**
 * Clears all existing stashes in a given repository.
 * 
 * @param {String} inWorkTree
 *  Git repositry root path
 * 
 * @return nothing
 *
 */
var gitClearAllStashesImpl = function ( inWorkTree )
{
	return gitExecuteStashAction ( "clear", inWorkTree, "" );
}

/**
 * Pulls updates from a remote server using given URL.
 * 
 * @param {String} inURL
 *  URL of a remote server to pull updates from.
 * @param {String} inWorkTree
 * 	git repository root path
 * @param {String} inRemoteBranch
 *	Name of the remote branch to pull from
 * @param {function} inCallback
 * 	Optional execution callback. The pull is synchronous if this parameter is absent.
 * 	Otherwise, the call becomes asynchronous and inCallback function is called when 
 * 	pull finishes.
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var	gitPullImpl = function ( inURL, inWorkTree, inRemoteBranch, inCallback )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + "pull " + inURL + " " + inRemoteBranch; // TODO: see if a URL needs to be "quoted" if it contains spaces or other "weird" chars
		
	_gitConfigureProxy ( inURL, inWorkTree );

	return _gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 60 * 60 * 1000, inCallback );
}

/**
 * Pushes updates to a remote server using given URL.
 * 
 * @param {String} inURL
 *  URL of a remote server to push updates to.
 * @param {String} inRepository
 * 	git repository to be used directly in the git command
 * @param {function} inCallback
 * 	Optional execution callback. The push is synchronous if this parameter is absent.
 *  Otherwise, the call becomes asynchronous and inCallback function is called when 
 *  push finishes.
 * @param {String} inLocalBranch
 *	Optional name of local branch to push
 * @param {String} inRemoteBranch
 *	Optional name of remote branch to push to
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitPushImpl = function ( inURL, inRepository, inCallback, inLocalBranch, inRemoteBranch )
{
	var				workTree = inRepository;
	if ( workTree. indexOf ( "/.git", workTree. length - "/.git". length ) != -1 )
	{
		// Remove '/.git' from the end of inRepository
		workTree = inRepository. substring ( 0, inRepository. length - 5 );
	}
	
	if ( typeof ( inLocalBranch ) == "undefined" || inLocalBranch == null )
		inLocalBranch = gitGetCurrentBranchImpl ( workTree );
	
	if ( typeof ( inRemoteBranch ) == "undefined" || inRemoteBranch == null )
		inRemoteBranch = inLocalBranch;

	var				gitCommand = _gitGetRepoAndTreeFS ( ) + "push " + inURL + " " + inLocalBranch + ":" + inRemoteBranch;

	_gitConfigureProxy ( inURL, workTree );
	
//debug_alert ( gitCommand );
	var			arrLines = _gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 60 * 60 * 1000, inCallback );
	if ( arrLines != null && arrLines. length >= 3 )
	{
		if ( /^error\: failed/. test ( arrLines [ 2 ] ) )
			debug_alert ( "Failed to push changes to remote repository.\n\nPlease see log for more details.\nYou may need to pull from remote repository, resolve conflicts if there are any, and then\npush again." );
	}
	
	return arrLines;
}

/**
 * Commits all staged modifications into a local repository.
 * 
 * @param {String} inComment
 *  A comment to be stored with the commit.
 * @param {String} inWorkTree
 * 	git repository root path
 * @param {Array of String} inPathsOptional
 *  Array of file paths to commit
 * @param {bool} inOptionIOptional
 *  A flag to use -i option
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitCommitLocalImpl = function ( inComment, inWorkTree, inPathsOptional, inOptionIOptional )
{
	var				arrLines = null;
try
{
	var				gitCommand = "--git-dir={R} --work-tree={r} commit -m {s}";
	var				inParameters = new Array ( );
	inParameters. push ( inComment );
	if ( typeof ( inPathsOptional ) != "undefined" && inPathsOptional != null )
	{
		if ( typeof ( inOptionIOptional ) != "undefined" && inOptionIOptional != null && inOptionIOptional )
			gitCommand +=  " -i";
			
		var			arrFiles = _gitConvertToArrayOfFiles ( inPathsOptional );
		inParameters. push ( arrFiles );
		
		gitCommand += " -- {[f]}";
	}

	arrLines = _gitExecuteFS ( gitCommand, inParameters, _gitGetRepositoryRootFolder ( ), 5 * 60 * 1000, null );
	if ( arrLines != null )
	{
		var			err = gitExtractErrorImpl ( arrLines, "" );
		if ( err != null )
		{
			var		strMessage = "";
			if ( err. fatal != "" )
				strMessage = err. fatal;
			if ( strMessage == "" && err. error != "" )
				strMessage = err. error;
				
			if ( strMessage != "" && strMessage. indexOf ( "do a partial commit during a merge" ) > 0 )
			{
				// There was a merge conflict and it is now resolved. Git can not do a partial commit
				// after conflict resolution. The "-i" option will make sure that resolved files are
				// committed and the current branch clear up the merge flag.
				arrLines = gitCommitLocalImpl ( inComment, inWorkTree, inPathsOptional, true );
			}
			else if ( strMessage != "" && strMessage. indexOf ( "Could not switch to" ) >= 0 )
			{
				// Some files have already been deleted from disk and now they need to be 
				// deleted from git index
				gitCommand = gitCommand = "--git-dir={R} --work-tree={r} commit -a -m {s}";
				inParameters = new Array ( );
				inParameters. push ( inComment );
				arrLines = _gitExecuteFS ( gitCommand, inParameters, _gitGetRepositoryRootFolder ( ), 5 * 60 * 1000, null );
			}
		}
	}
}
catch ( e )
{
	debug_alert ( "Failed to perform local commit using system workers with file systems.\n" + e. message );
}
	
	return arrLines;
}

/**
 * Clone a remote repository to a local folder.
 * 
 * @param {String} inURL
 *  URL of a remote server to push updates to.
 * @param {String} inDestinationFolderPath
 * 	A path to a local folder to clone to. The folder will be created if necessary.
 * @param {function} inCallback
 * 	Optional execution callback. The pull is synchronous if this parameter is absent.
 * 	Otherwise, the call becomes asynchronous and inCallback function is called when 
 * 	pull finishes.
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitCloneImpl = function ( inURL, inDestinationFolderPath, inCallback )
{
	var				gitCommand = "clone " + inURL + " {f} --progress";
	var				flDestination = _gitConvertToFile ( inDestinationFolderPath );
	var				inParameters = new Array ( );
	inParameters. push ( flDestination );

	var				arrLines = _gitExecuteFS ( gitCommand, inParameters, null, 60 * 60 * 1000, inCallback );
	
	return arrLines;
}

/**
 * Init a git repository in a given local folder.
 * 
 * @param {String} inFolderPath
 *  Folder path to init a repository in
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitInitRepositoryImpl = function ( inFolderPath )
{
	var				flRoot = _gitConvertToFile ( inFolderPath );
	
	var				gitCommand = "init {r}";
	var				gitCommand2 = _gitGetRepoAndTreeFS ( ) + " config http.sslVerify false";
		
	var				arrLines = _gitExecuteFS ( gitCommand, null, null, 60 * 1000, null );
	
	// This is needed to enable git over https with self-signed certificates on the server
	// which is usually the case when a developer just  starts working on an application
	var				arrLines2 = _gitExecuteFS ( gitCommand2, null, _gitGetRepositoryRootFolder ( ), 60 * 1000, null );
	
	arrLines. push. apply ( arrLines, arrLines2 );
	
	var				inRepoAndTreePath = null;
	_gitInitUserAndEMail ( inRepoAndTreePath, true );
	
	return arrLines;
}

/**
 * Stage an array of files within a given repository
 * 
 * @param {Array[String]} inArrPath
 *  An array of file paths to stage
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitStageFilesImpl = function ( inArrPaths, inWorkTree )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + " add ";
	var				inParameters = null;
	if ( inArrPaths. length == 1 && inArrPaths [ 0 ] == "." )
	{
		gitCommand += ".";
	}
	else
	{
		gitCommand += "{[f]}";
		var			arrFiles = _gitConvertToArrayOfFiles ( inArrPaths );
		inParameters = new Array ( );
		inParameters. push ( arrFiles );
	}

	return _gitExecuteFS ( gitCommand, inParameters, null, 60 * 1000, null );
}

/**
 * Returns the status of a given git repository.
 * 
 * @param {String} inWorkTree
 * 	git working tree path where to get the status
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitStatusImpl = function ( inWorkTree )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + " status -v";
		
	_gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 10 * 1000, null );
}

/**
 * Returns an array of paths of files which are not ignored and are not part of a given git repository.
 * AKA offline work.
 * 
 * @param {String} inWorkTree
 * 	git working tree path where to get the status
 * @param {Array} inIncludePaths
 * 	An array of folder and file paths where to search for untracked files
 * 
 * @return {Array} Array of file paths.
 *
 */
var gitGetUntrackedFilesImpl = function ( inWorkTree, inIncludePaths )
{
	var				arrFiles = _gitConvertToArrayOfFiles ( inIncludePaths );
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + "ls-files --exclude-standard --others";
	var				arrOutput = _gitExecuteFS ( gitCommand, null, null, 10 * 1000, null ); // _gitGetRepositoryRootFolder ( )
	
	if ( inWorkTree [ inWorkTree. length - 1 ] != "/" )
		inWorkTree += "/";
		
	var				arrResult = new Array ( );
	var				bMatch = true;
	var				fullPath = "";
//debug_alert ( "There are " + arrOutput. length + " files not tracked" );
//debug_alert ( "It is '" + arrOutput [ 0 ] + "'" );
	if ( arrOutput != null )
	{
		for ( var i = 0; i < arrOutput. length; i++ )
			if ( arrOutput [ i ]. length > 0 )
			{
				bMatch = true;
				if ( arrOutput [ i ]. indexOf ( "../" ) == 0 )
					arrOutput [ i ] = arrOutput [ i ]. substring ( 3 );
					
				fullPath = inWorkTree + arrOutput [ i ];
//debug_alert ( "fullPath == " + fullPath );
				if ( typeof ( arrFiles ) != "undefined" && arrFiles != null )
				{
					bMatch = false;
					for ( var j = 0; j < arrFiles. length; j++ )
					{
						if ( fullPath. indexOf ( arrFiles [ j ]. path ) == 0 )
						{
							bMatch = true;
							
							break;
						}
					}
				}
				
				if ( bMatch )
					arrResult. push ( fullPath );
			}
	}
	
	return arrResult;
}

/**
 * Remove given files from a given repository
 * 
 * @param {Array[String]} inArrPath
 *  An array of file paths to remove
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitRemoveImpl = function ( inArrPaths, inWorkTree )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + " rm --cached {[f]}";
	var				arrFiles = _gitConvertToArrayOfFiles ( inArrPaths );
	var				inParameters = new Array ( );
	inParameters. push ( arrFiles );
	
	var				arrLines = _gitExecuteFS ( gitCommand, inParameters, _gitGetRepositoryRootFolder ( ), 10 * 1000, null );
	if ( arrLines != null )
	{
		var			err = gitExtractErrorImpl ( arrLines, "" );
		if ( err != null )
		{
			var		strMessage = "";
			if ( err. fatal != "" )
				strMessage = err. fatal;
			if ( strMessage == "" && err. error != "" )
				strMessage = err. error;
				
			if ( strMessage != "" && strMessage. indexOf ( "Could not switch to" ) >= 0 )
			{
				// Some files have already been deleted from disk and now they need to be 
				// deleted from git index
				gitCommand = _gitGetRepoAndTreeFS ( ) + " add -u";
				arrLines = _gitExecuteFS ( gitCommand, null, null, 10 * 1000, null );
			}
		}
	}

	return arrLines;
}

/**
 * Creates and initializes over HTTP a new remote repository hosted on a remote SmartHTTP server.
 * The new repositry is non-bare and is ready to be pushed to. The two currently supported hosts are Wakanda and github.com
 * 
 * @param {String} inURL
 *  URL of a remote server to create a repository on.
 * @param {String} inRemotePath
 * 	A 'path' on the remote SmartHTTP server. In case of Wakanda it is an absolute (very soon to be 
 *  changed to relative) folder path; in case of fithub it is a repository name.
 * @param {bool} inPrivate
 * 	Optional boolean to create a private repository. False by default. Works for github.com only. 
 * 
 * @return {String} HTTP response (success or fail) or 'undefined' if XHR call fails.
 *
 */
var gitInitRemoteRepositoryImpl = function ( inURL, inRemotePath, inPrivate )
{
	var		strHTTPResponse = "";
	
	if ( typeof ( inPrivate ) === "undefined" || inPrivate == null )
		inPrivate = false;
		
	if ( _isWakandaURL ( inURL ) )
		strHTTPResponse = gitInitRepositoryOnRemoteWakandaImpl ( inURL, inRemotePath );
	else if ( _isGitHubURL ( inURL ) )
	{
		strHTTPResponse = gitInitRepositoryOnRemoteGitHubImpl ( inURL, inRemotePath, inPrivate );
	}
	else
	{
		debug_alert ( "Unknown URL type: " + inURL );
		throw ( "Unknown URL type: " + inURL );
	}
	
	return strHTTPResponse;
}

/**
 * Creates and initializes over HTTP a new remote repository hosted on Wakanda server.
 * The new repositry is non-bare and is ready to be pushed to.
 * 
 * @param {String} inURL
 *  URL of a remote server to create a repository on.
 * @param {String} inRemoteFullFolderPath
 * 	Full file path on the remote Wakanda server.
 * 
 * @return {String} HTTP response (success or fail) or 'undefined' if XHR call fails.
 *
 */
var gitInitRepositoryOnRemoteWakandaImpl = function ( inURL, inRemoteFullFolderPath )
{
	// TODO: eveything in the full URL must be properly encoded
		
	var			fullURL = inURL;
	if ( fullURL [ fullURL. length - 1 ] != "/" )
		fullURL += "/";

	fullURL += "init";
	if ( typeof ( inRemoteFullFolderPath ) != "undefined" && inRemoteFullFolderPath != null )
		fullURL += ( "?path=" + inRemoteFullFolderPath );

	// Exampe of a full URL: http://admin:123@127.0.0.1:8081/gitservice/repo/init?path=/Volumes/SECOND/DBs/ClonedFromWakanda5
	return _gitExecuteHTTPRequest ( fullURL, "GET", null );
}

var gitInitRepositoryOnRemoteGitHubImpl = function ( inURL, inRepositoryName, inPrivate )
{
	/* TODO: Needs to accept user name and password as parameters and compose the URL here. */
	
	var			strBody = '{ "name": "' + inRepositoryName + '", "description": "Created by studio", "homepage": "https://github.com", "private": ' + inPrivate + ', "has_issues": true, "has_wiki": true, "has_downloads": true }';

//debug_alert ( "Init github repo at " + inURL );

	return _gitExecuteHTTPRequest ( inURL, "POST", strBody );
}


/**
 * Sets the root of the current git repository on a remote SmartHTTP server.
 * 
 * @param {String} inURL
 *  URL of a remote server to set a repository root on.
 * @param {String} inRemotePath
 * 	Full (very soon to be relative) folder path in case of remote Wakanda server.
 *  Repository name in case of github.com.
 * 
 * @return {String} HTTP response (success or fail) or 'undefined' if XHR call fails.
 *
 */
var gitSetRemoteRepositoryImpl = function ( inURL, inRemotePath )
{
	// TODO: eveything in the full URL must be properly encoded
	
	var			strHTTPResponse = "";
	
	if ( _isWakandaURL ( inURL ) )
	{
		var			fullURL = inURL;
		if ( fullURL [ fullURL. length - 1 ] != "/" )
			fullURL += "/";

		fullURL += ( "dir?path=" + inRemotePath );

		// Exampe of a full URL: http://admin:123@127.0.0.1:8081/gitservice/repo/dir?path=/Volumes/SECOND/DBs/LocalToBePushed
		strHTTPResponse = _gitExecuteHTTPRequest ( fullURL, "GET", null );
	}
	else if ( _isGitHubURL ( inURL ) )
	{
		; // TODO: Implement for GitHub.com
		// github parameters: URL, repository name
	}
	else
	{
		debug_alert ( "Unknown URL type: " + inURL );
		throw ( "Unknown URL type: " + inURL );
	}
	
	return strHTTPResponse;
}

/**
 * Gets the root of the current git repository on a remote SmartHTTP server.
 * 
 * @param {String} inURL
 *  URL of a remote server to get a repository root from.
 * 
 * @return {String} HTTP response (success or fail) or 'undefined' if XHR call fails.
 *
 */
var gitGetRemoteRepositoryImpl = function ( inURL )
{
	// TODO: eveything in the full URL must be properly encoded
	
	var			strHTTPResponse = "";
	
	if ( _isWakandaURL ( inURL ) )
	{
		var			fullURL = inURL;
		if ( fullURL [ fullURL. length - 1 ] != "/" )
			fullURL += "/";

		fullURL += "dir";

		// Exampe of a full URL: http://admin:123@127.0.0.1:8081/gitservice/repo/dir
		strHTTPResponse = _gitExecuteHTTPRequest ( fullURL, "GET", null );
	}
	else if ( _isGitHubURL ( inURL ) )
	{
		; // TODO: Implement for GitHub.com
		// github parameters: URL, repository name
		// TODO: just extract repository name from the given url
	}
	else
	{
		debug_alert ( "Unknown URL type: " + inURL );
		throw ( "Unknown URL type: " + inURL );
	}
	
	return strHTTPResponse;
}

/**
 * Revert given files within a given repository
 * 
 * @param {Array[String]} inArrPath
 *  An array of file paths to revert
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return {Array{{Array{String}}} git response in the form of array of arrays of strings.
 *
 */
var gitRevertImpl = function ( inArrPaths, inWorkTree )
{
	var				gitCommand1 = _gitGetRepoAndTreeFS ( ) + " reset HEAD" + " {[f]}";
	var				gitCommand2 = _gitGetRepoAndTreeFS ( ) + " checkout" + " {[f]}";
	
	var				arrFiles = _gitConvertToArrayOfFiles ( inArrPaths );
	var				inParameters = new Array ( );
	inParameters. push ( arrFiles );
	
	var			arrResult = new Array ( );
	arrResult. push ( _gitExecuteFS ( gitCommand1, inParameters, _gitGetRepositoryRootFolder ( ), 60 * 1000, null ) );
	arrResult. push ( _gitExecuteFS ( gitCommand2, inParameters, _gitGetRepositoryRootFolder ( ), 60 * 1000, null ) );
	
	return arrResult;
}

var gitProvidePathsStatusImpl = function ( inPaths, inIsStaged, inWorkTree )
{
	var				gitCommand = "";
	var				gitCommandBody = " diff --name-status ";
	if ( inIsStaged )
		gitCommandBody += "--cached ";
		
	gitCommandBody += "--diff-filter=ACDMRUX {[f]}";
	gitCommand = _gitGetRepoAndTreeFS ( ) + gitCommandBody;

	var				arrFiles = _gitConvertToArrayOfFiles ( inPaths );
	var				inParameters = new Array ( );
	inParameters. push ( arrFiles );

	var				arrLines = _gitExecuteFS ( gitCommand, inParameters, null, 60 * 1000, null );

	var				gitPathRoot = inWorkTree;
	if ( os. isWindows )
		gitPathRoot = gitPathRoot. replace ( /\\/g, "/" ) + "/";
	else if ( _gitOSIsSupportedNIX ( ) )
		gitPathRoot += "/";
	else
		debug_alert ( "Error: unknown OS" );
		
	var				arrAddedFiles = [ ];
	var				arrModifiedFiles = [ ];
	var				arrDeletedFiles = [ ];
	var				arrUnmergedFiles = [ ];
	var				arrRenamedFiles = [ ];
	
	var				strLine = ""
	for ( var i = 0; i < arrLines. length; i++ )
	{
		strLine = arrLines [ i ];
		if ( strLine. length < 2 )
			continue;
			
//debug_alert ( "Line to consider " + strLine );
		if (	( strLine [ 2 ] == '"' && strLine [ strLine. length - 1 ] == '"' ) ||
				( strLine [ 2 ] == "'" && strLine [ strLine. length - 1 ] == "'" ) )
		{
			strLine = strLine. substring ( 0, 2 ) + strLine. substring ( 3, strLine. length - 1 );
			strLine = _gitOctalToUniCode ( strLine );
//debug_alert ( "Unescaped line to consider " + strLine );
		}
		
		if ( /^A\t/. test ( strLine ) )
		{
			arrAddedFiles. push ( gitPathRoot + strLine. substring ( 2 ) );
			//debug_alert ( "To be added: " + arrAddedFiles [ arrAddedFiles. length - 1 ] );
		}
		else if ( /^M\t/. test ( strLine ) )
		{
			arrModifiedFiles. push ( gitPathRoot + strLine. substring ( 2 ) );
			//debug_alert ( "Modified: " + arrModifiedFiles [ arrModifiedFiles. length - 1 ] );
		}
		else if ( /^D\t/. test ( strLine ) )
		{
			arrDeletedFiles. push ( gitPathRoot + strLine. substring ( 2 ) );
			//debug_alert ( "To be deleted: " + arrDeletedFiles [ arrDeletedFiles. length - 1 ] );
		}
		else if ( /^U\t/. test ( strLine ) )
		{
			arrUnmergedFiles. push ( gitPathRoot + strLine. substring ( 2 ) );
			//debug_alert ( "To be merged: " + arrUnmergedFiles [ arrUnmergedFiles. length - 1 ] );
		}
		else if ( /^R\t/. test ( strLine ) )
		{
			arrRenamedFiles. push ( gitPathRoot + strLine. substring ( 2 ) );
			//debug_alert ( "To be merged: " + arrRenamedFiles [ arrRenamedFiles. length - 1 ] );
		}
	}
	
	// Now let's list those files that are tracked, but not modified and not assumed unchanged (by using ignore)
	// git ls-files -vc
	// 'H' - not modified and should be reported, 'h' - ignored and should not be reported
	gitCommand = _gitGetRepoAndTreeFS ( ) + "ls-files -vc --others -- {[f]}";
	arrLines = _gitExecuteFS ( gitCommand, inParameters, _gitGetRepositoryRootFolder ( ). parent, 60 * 1000, null );
	
	var				arrNotModifiedFiles = [ ];
	var				arrNotFollowed = [ ];
	var				arrIgnored = [ ];
	for ( var i = 0; i < arrLines. length; i++ )
	{
		strLine = arrLines [ i ];
		if ( strLine. length < 2 )
			continue;
			
//debug_alert ( "Line to consider " + strLine );
		if (	( strLine [ 2 ] == '"' && strLine [ strLine. length - 1 ] == '"' ) ||
				( strLine [ 2 ] == "'" && strLine [ strLine. length - 1 ] == "'" ) )
		{
			strLine = strLine. substring ( 0, 2 ) + strLine. substring ( 3, strLine. length - 1 );
			strLine = _gitOctalToUniCode ( strLine );
//debug_alert ( "Escaped line to consider " + strLine );
		}
		
		if ( /^h/. test ( strLine ) )
		{
			strLine = gitPathRoot + strLine. substring ( 2 );
			arrIgnored. push ( strLine );
			//debug_alert ( "Ignored: " + arrIgnored [ arrIgnored. length - 1 ] );
			
			continue; // skip files that are assumed unchanged
		}
			
		var			bIsNotTracked = ( strLine. charAt ( 0 ) == '?' );
		strLine = gitPathRoot + strLine. substring ( 2 );
		if ( bIsNotTracked )
		{
			arrNotFollowed. push ( strLine );
			//debug_alert ( "Not followed: " + arrNotFollowed [ arrNotFollowed. length - 1 ] );
		}
		else if (	arrAddedFiles. indexOf ( strLine ) < 0 &&
				arrModifiedFiles. indexOf ( strLine ) < 0 &&
				arrDeletedFiles. indexOf ( strLine ) < 0 &&
				arrUnmergedFiles. indexOf ( strLine ) < 0 &&
				arrRenamedFiles. indexOf ( strLine ) < 0 )
		{
			arrNotModifiedFiles. push ( strLine );
			/*for ( var j = 0; j < inPaths. length; j++ )
			{
				if ( strLine. indexOf ( inPaths [ j ] ) == 0 )
				{
					arrNotModifiedFiles. push ( strLine );
					debug_alert ( "Tracked but not modified: " + arrNotModifiedFiles [ arrNotModifiedFiles. length - 1 ] );
					
					break;
				}
				else
					debug_alert ( "'" + strLine + "' does not start with '" + inPaths [ j ] + "'" );
			 }			*/
		}
	}
	
	var		result = { };
	result. addedFiles = arrAddedFiles;
	result. modifiedFiles = arrModifiedFiles;
	result. deletedFiles = arrDeletedFiles;
	result. unmergedFiles = arrUnmergedFiles;
	result. renamedFiles = arrRenamedFiles;
	result. notModifiedFiles = arrNotModifiedFiles;
	result. notFollowedFiles = arrNotFollowed;
	result. ignoredFiles = arrIgnored;
	
	return 	result;
}

/**
 * Provides git file status for all files within a given directory
 * 
 * @param {String} inFolderPath
 *  A path to folder which contains files to get status of.
 * @param {bool} inIsStaged
 *  If true then staged files are included, if false - not included.
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return {Object} An object with the following atributes:
 *  addedFiles, modifiedFiles, deletedFiles, unmergedFiles, renamedFiles, notModifiedFiles, notFollowedFiles, ignoredFiles
 *  Each attribute is an array of file paths for a given type of status.
 */
var gitProvideFolderStatusImpl = function ( inFolderPath, inIsStaged, inWorkTree )
{
	var			arrPaths = new Array ( );
	arrPaths. push ( inFolderPath );
	
	return gitProvidePathsStatusImpl ( arrPaths, inIsStaged, inWorkTree );
}

function _gitExtractNonIndexedPaths ( inArrayPaths, inWorkTree )
{
	var				arrNotFollowed = new Array ( );
	
	var				arrFilesOrFolders = _gitConvertToArrayOfFiles ( inArrayPaths );
	if ( typeof ( arrFilesOrFolders ) === "undefined" || arrFilesOrFolders == null || arrFilesOrFolders. length == 0 )
		return arrNotFollowed;
	
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + "ls-files -vc --others -- {[f]}";
	var				inParameters = new Array ( );
	
	inParameters. push ( arrFilesOrFolders );

	var				arrLines = _gitExecuteFS ( gitCommand, inParameters, _gitGetRepositoryRootFolder ( ), 60 * 1000, null );
	
	var				gitPathRoot = inWorkTree;
	if ( os. isWindows )
		gitPathRoot = gitPathRoot. replace ( /\\/g, "/" ) + "/";
	else if ( _gitOSIsSupportedNIX ( ) )
		gitPathRoot += "/";
	else
		debug_alert ( "Error: unknown OS" );
	
	var			strLine = "";
	for ( var i = 0; i < arrLines. length; i++ )
	{
		strLine = arrLines [ i ];
		if ( strLine. length < 2 )
			continue;
			
		var			bIsNotTracked = ( strLine. charAt ( 0 ) == '?' );
		if ( bIsNotTracked )
		{
			strLine = strLine. substring ( 2 );
			strLine = _convertToAbsoluteFSFromGitPath ( strLine );

			var			fl = new File ( strLine );
			arrNotFollowed. push ( fl );
//debug_alert ( "Not in index: " + arrNotFollowed [ arrNotFollowed. length - 1 ] );
		}
	}
	
	return arrNotFollowed;
}

function _gitStageGitIgnore ( inWorkTree )
{
	var		gitignorePath = gitGetIgnoreFilePathImpl ( inWorkTree );
//studio. alert ( "Need to stage " + gitignorePath );
	gitStageFilesImpl ( [ gitignorePath ], inWorkTree );
}

function _gitIgnorePaths ( inArrayPaths, inWorkTree )
{
	// FOR NOW ONLY. Convertion to files and folders will be done by the caller
	var				arrFilesOrFolders = _gitConvertToArrayOfFiles ( inArrayPaths );
	if ( typeof ( arrFilesOrFolders ) === "undefined" || arrFilesOrFolders == null )
		return;
	
	var				arrUniqueFolders = _gitExtractFolderArrayFS ( arrFilesOrFolders );
	// Apply --assume-unchanged to all subfolders
	for ( var i = 0; i < arrUniqueFolders. length; i++ )
	{
		var			arrSubFolders = arrUniqueFolders [ i ]. folders;
		_gitIgnorePaths ( arrSubFolders, inWorkTree );
	}
	
	// Let's tell the git index to stop following selected files
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + "update-index --assume-unchanged";
	var				inParameters = new Array ( );
	
	var				nFileCount = 0;
	for ( var i = 0; i < arrFilesOrFolders. length; i++ )
	{
		// On Windows a folder can not be ignored directly with wildcard *.*. Need to list files one by one manually
		if ( _isFolder ( arrFilesOrFolders [ i ] ) )
		{
			var				arrSubFiles = arrFilesOrFolders [ i ]. files;
			nFileCount += arrSubFiles. length;
			gitCommand += " {[f]}";
			inParameters. push ( arrSubFiles );
//for ( var j = 0; j < arrSubFiles. length; j++ )
//	debug_alert ( "Ignoring " + arrSubFiles [ j ]. path );
		}
		else
		{
			nFileCount++;
			gitCommand += " {f}";
			inParameters. push ( arrFilesOrFolders [ i ] );
//debug_alert ( "Ignoring " + arrFilesOrFolders [ i ]. path );
		}
	}
	
	if ( nFileCount > 0 )
		_gitExecuteFS ( gitCommand, inParameters, _gitGetRepositoryRootFolder ( ), 60 * 1000, null );
}


/**
 * Ignore a list of given files within a given repository
 * 
 * @param {String} inPaths
 *  An array of file paths to ignore.
 * @param {String} inWorkTree
 * 	git working tree path where the repository is declared
 * 
 * @return 
 */
var gitIgnoreImpl = function ( inPaths, inWorkTree )
{
	// Add path to .gitignore
	// git update-index --assume-unchanged <file>		<--- stop tracking
	// git update-index --no-assume-unchanged <file>	<--- start tracking again
	
	var				arrFiles = _gitConvertToArrayOfFiles ( inPaths );
	studio. _addToGitIgnore ( arrFiles );
	
	_gitIgnorePaths ( inPaths, inWorkTree );
	_gitStageGitIgnore ( inWorkTree );
}

function _gitFollowPaths ( inArrayPaths, inWorkTree )
{
	// FOR NOW ONLY. Convertion to files and folders will be done by the caller
	var				arrFilesOrFolders = _gitConvertToArrayOfFiles ( inArrayPaths );
	if ( typeof ( arrFilesOrFolders ) === "undefined" || arrFilesOrFolders == null )
		return;
	
	var				arrUniqueFolders = _gitExtractFolderArrayFS ( arrFilesOrFolders );

	// Apply --no-assume-unchanged to all subfolders
	for ( var i = 0; i < arrUniqueFolders. length; i++ )
	{
		var			arrSubFolders = arrUniqueFolders [ i ]. folders;
		_gitFollowPaths ( arrSubFolders, inWorkTree );
	}
	
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + "update-index --no-assume-unchanged";
	var				inParameters = new Array ( );

	/*	Files that have never been followed by Git (never been added to the index) can not be followed using "update-index".
		They need to be added and then committed before running "update-index". */
	
	var				arrAllFiles = new Array ( );
	var				nFileCount = 0;
	for ( var i = 0; i < arrFilesOrFolders. length; i++ )
	{
		// On Windows a folder can not be followed directly with wildcard *.*. Need to list files one by one manually
		if ( _isFolder ( arrFilesOrFolders [ i ] ) )
		{
			var		arrSubFiles = arrFilesOrFolders [ i ]. files;
			nFileCount += arrSubFiles. length;
			gitCommand += " {[f]}";
			inParameters. push ( arrSubFiles );
			
			arrAllFiles. push. apply ( arrAllFiles, arrSubFiles );
		}
		else
		{
			nFileCount++;
			gitCommand += " {f}";
			inParameters. push ( arrFilesOrFolders [ i ] );
			
			arrAllFiles. push ( arrFilesOrFolders [ i ] );
		}
	}

	var			arrPathsToAddAndCommit = _gitExtractNonIndexedPaths ( arrAllFiles, inWorkTree );
	if ( arrPathsToAddAndCommit. length > 0 )
	{
		gitStageFilesImpl ( arrPathsToAddAndCommit, inWorkTree );
		gitCommitLocalImpl ( "Followed from studio", inWorkTree, arrPathsToAddAndCommit );
	}
	
	if ( nFileCount > 0 )
		_gitExecuteFS ( gitCommand, inParameters, _gitGetRepositoryRootFolder ( ), 60 * 1000, null );
}

/**
 * Follow a list of given files within a given repository
 * 
 * @param {String} inPaths
 *  An array of file paths to follow.
 * @param {String} inWorkTree
 * 	git working tree path where the repository is declared
 * 
 * @return 
 */
var gitFollowImpl = function ( inPaths, inWorkTree )
{
	var			arrFiles = _gitConvertToArrayOfFiles ( inPaths );
	try
	{
		studio. _removeFromGitIgnore ( arrFiles );
	}
	catch ( e )
	{
		debug_alert ( "Failed to follow files while writing to '.gitignore'" );
	}

	_gitFollowPaths ( inPaths, inWorkTree );
	_gitStageGitIgnore ( inWorkTree );
}

/**
 * Reset all files in a "to be merged" state to their original state before the merge was started.
 * 
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return 
 */
var gitResetAllMergedImpl = function ( inWorkTree )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + "reset --merge HEAD";
		
	_gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 60 * 1000, null );
}

/**
 * Launch an external default UI application to browse a given repostiory's history.
 * 
 * @param {String} inWorkTree
 * 	git working tree path where the repository is declared
 * 
 * @return {String} git response in the form of array of strings.
 */
var gitLaunchHistoryAppImpl = function ( inWorkTree )
{
	try
	{
		var			strMessage = studio. _runGitHistory ( );
		if ( strMessage != null )
			studio. alert ( strMessage );
	}
	catch ( e )
	{
		;
	}
}

/**
 * Reset all files in a given repository to their original state of the last commit and revert all changes.
 * 
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return 
 */
var gitHardResetAllImpl = function ( inWorkTree )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + " reset --hard HEAD";

	_gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 60 * 1000, null );
}

/**
 * Launch an external file diff UI application; it needs to be preconfigured in advance.
 * 
 * @param {String} inPaths
 * 	A list of files to perform the diff on
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return {String} git response in the form of array of strings.
 */
var gitLaunchDiffAppImpl = function ( inPaths, inWorkTree )
{
/*
	KDiff3 needs to be installed and configured.
	git global config needs to contain something similar:

[http]
	sslVerify = false
[merge]
	tool = kdiff3
[mergetool "kdiff3"]
	path = c:\\Program Files (x86)\\KDiff3\\kdiff3.exe
[diff]
	tool = kdiff3
[difftool "kdiff3"]
	path = c:\\Program Files (x86)\\KDiff3\\kdiff3.exe

The [diff] and [difftool ...] are necessary when running diff as a system worker from the studio because
apparently system environment is not exactly the same when running directly from command line.
*/

	var				arrLines = null;

	var				gitCommand = _gitGetRepoAndTreeFS ( ) + "difftool --cached -y -- {[f]}";
	var				arrParameters = new Array ( );
	var				arrFiles = _gitConvertToArrayOfFiles ( inPaths );
	arrParameters. push ( arrFiles );
		
	arrLines = _gitExecuteFS ( gitCommand, arrParameters, _gitGetRepositoryRootFolder ( ), 10000, null );

	return arrLines;
}

/**
 * Execute a custom git command on a given repository.
 * 
 * @param {String} inCommand
 * 	A command to be executed
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return {String} git response in the form of array of strings.
 */
var gitExecuteCustomImpl = function ( inCommand, inWorkTree )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + inCommand;
		
	return _gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 5 * 60 * 1000, null );
}

/**
 * Extracts error messages from git's execution output.
 * 
 * @param {String} inLines
 * 	An array of strings that contains text output of git
 * @param {String} inMask
 * 	A string to replace when showing alerts or log messages. Typically, is used to mask user password.
 * 
 * @return {String} git response in the form of array of strings.
 */
var gitExtractErrorImpl = function ( inLines, inMask )
{
	if ( typeof ( inLines ) === "undefined" || inLines == null || inLines. length == 0 )
		return null;
		
	inMask = ":" + inMask + "@";
	var		nMaskIndex = -1;
	
	var		result = new Object ( );
	result. error = "";
	result. fatal = "";
	result. warning = "";
	for ( var i = 0; i < inLines. length; i++ )
	{
		if ( /^error\: /. test ( inLines [ i ] ) )
		{
			result. error = inLines [ i ]. substring ( 7 );
			nMaskIndex = result. error. indexOf ( inMask );
			if ( nMaskIndex >= 0 )
				result. error = result. error. substring ( 0, nMaskIndex + 1 ) + "*****" + result. error. substring ( nMaskIndex + inMask. length - 1 );
				
			break;
		}
	}
	for ( var i = 0; i < inLines. length; i++ )
	{
		if ( /^fatal\: /. test ( inLines [ i ] ) )
		{
			result. fatal = inLines [ i ]. substring ( 7 );
			nMaskIndex = result. fatal. indexOf ( inMask );
			if ( nMaskIndex >= 0 )
				result. fatal = result. fatal. substring ( 0, nMaskIndex + 1 ) + "*****" + result. fatal. substring ( nMaskIndex + inMask. length - 1 );
			
			break;
		}
	}
	
	for ( var i = 0; i < inLines. length; i++ )
	{
		if ( /^warning\: /. test ( inLines [ i ] ) )
		{
			result. warning = inLines [ i ];
			nMaskIndex = result. warning. indexOf ( inMask );
			if ( nMaskIndex >= 0 )
				result. warning = result. warning. substring ( 0, nMaskIndex + 1 ) + "*****" + result. warning. substring ( nMaskIndex + inMask. length - 1 );
			
			break;
		}
	}
	
	if ( result. error == "" && result. fatal == "" && result. warning == "" )
		result = null;
	
	return result;
}

/**
 * Get a total number of commits for a given repository.
 * 
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return Total number of commits.
 */
var gitGetCommitCountImpl = function ( inWorkTree )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + "rev-list --all";
	var				arrResponse = _gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 10 * 1000, null );

	return arrResponse. length - 1; // The last line is empty
}

function _gitSetToolPath ( inToolType, inToolPath )
{
// TODO: Need studio API to extract tool paths stored in git preferences
	if ( _gitOSIsSupportedNIX ( ) )
	{
		// The app package is likely to be selected instead of the executable binary itself. Lets append the 
		// necessary path to the executable.
		if ( inToolPath. charAt ( inToolPath. length - 1 ) == "/" )
			inToolPath = inToolPath. substring ( 0, inToolPath. length - 1 );
			
		if (	inToolPath. lastIndexOf ( ".app" ) >= 0 &&
				inToolPath. lastIndexOf ( ".app" ) == inToolPath. length - ".app". length )
		{
			var		appFolder = _gitCreateFolder ( inToolPath );
			inToolPath += "/Contents/MacOS/" + appFolder. nameNoExt;
		}
	}
	
//debug_alert ( inToolPath );
	var				toolFile = _gitCreateFile ( inToolPath );
	if ( toolFile == null || !toolFile. exists )
	{
		debug_alert ( "Error: " + inToolPath + " does not exist." );
		
		return;
	}
	
	var				toolName = toolFile. nameNoExt;
	
	var				gitCommand1 = "config --global " + inToolType + ".tool " + toolName;
	var				gitCommand2 = "config --global " + inToolType + "tool." + toolName + ".path ";
	if ( os. isWindows )
		gitCommand2 += '"' + inToolPath + '"';
	else if ( _gitOSIsSupportedNIX ( ) )
		gitCommand2 += "'" + inToolPath + "'";
	else
		debug_alert ( "Error: unknown OS" );

	var				arrResponse = _gitExecuteFS ( gitCommand1, null, null, 10 * 1000, null );
	arrResponse = _gitExecuteFS ( gitCommand2, null, null, 10 * 1000, null );
	if ( inToolType == "merge" )
	{
		var			gitCommand3 = "config --global mergetool.keepBackup false";
		var			gitCommand4 = "config --global mergetool.keepTemporaries false";
		arrResponse = _gitExecuteFS ( gitCommand3, null, null, 10 * 1000, null );
		arrResponse = _gitExecuteFS ( gitCommand4, null, null, 10 * 1000, null );
	}

	return;
}

/**
 * Sets the path to the default diff application.
 * 
 * @param {String} inDiffToolPath
 * 	A full path to the new default diff application
 * 
 * @return nothing
 */
var gitSetDiffToolPathImpl = function ( inDiffToolPath )
{
	_gitSetToolPath ( "diff", inDiffToolPath );
}

/**
 * Sets the path to the default merge application.
 * 
 * @param {String} inMergeToolPath
 * 	A full path to the new default merge application
 * 
 * @return nothing
 */
var gitSetMergeToolPathImpl = function ( inMergeToolPath )
{
	_gitSetToolPath ( "merge", inMergeToolPath );
}

var gitGetDefaultExecutablePathImpl = function ( )
{
	var		isMac, gitDefaultPath1, gitDefaultPath2, gitDefaultPath3, gitExecutable;

	if ( _gitOSIsSupportedNIX ( ) )
    {
		gitDefaultPath1 = "/usr/bin/git";
        gitDefaultPath2 = "/usr/local/bin/git";
		gitDefaultPath3 = "/usr/local/git/bin/git"; // for git versions 1.8.x
    }
	else if ( os. isWindows )
    {
		gitDefaultPath1 = "C:\\Program Files (x86)\\Git\\bin\\git.exe";
        gitDefaultPath2 = gitDefaultPath1;
		gitDefaultPath3 = "C:\\Program Files\\Git\\bin\\git.exe";
    }
	else
		return "";
	
	// If one more default path is added then replace the code below with a loop over an array of possible paths
	gitExecutable = _gitCreateFile ( gitDefaultPath1 );
	if ( gitExecutable. exists )
		return gitDefaultPath1;
    else
    {
        gitExecutable = _gitCreateFile ( gitDefaultPath2 );
        if ( gitExecutable. exists )
            return gitDefaultPath2;
		else
		{
			gitExecutable = _gitCreateFile ( gitDefaultPath3 );
			if ( gitExecutable. exists )
				return gitDefaultPath3;
		}
    }

	return "";
}

/**
 * Get the branch name of a given repository.
 * 
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return Current branch name.
 */
var gitGetCurrentBranchImpl = function ( inWorkTree )
{
	var				strBranch = "master";

	var				gitCommand = _gitGetRepoAndTreeFS ( ) + " rev-parse --abbrev-ref HEAD";
	var				arrLines = _gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 60 * 1000, null );
	if ( arrLines != null && arrLines. length >= 1 )
		strBranch = arrLines [ 0 ];
	
//debug_alert ( "The current branch is " + strBranch );
	return strBranch;
}

/**
 * Set the branch name of a given repository.
 * 
 * @param {String} inBranchName
 * 	git repository branch name to switch to
 * @param {bool} inCreate
 * 	boolean flag indicating if the branch needs to be created
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return {String} git response in the form of array of strings.
 */
var gitSetCurrentBranchImpl = function ( inBranchName, inCreate, inWorkTree )
{
	var				strCreateFlag = "";
	if ( typeof ( inCreate ) != "undefined" && inCreate )
		strCreateFlag = " -b ";
	
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + " checkout " + strCreateFlag + inBranchName;
	var				arrLines = _gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 60 * 1000, null );

	return arrLines;
}

/**
 * Get the list of all branches within a given repository.
 * 
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return {array[string]} An array of branch names defined for a given repository.
 */
var gitGetBranchesImpl = function ( inWorkTree )
{
	var			gitCommand = _gitGetRepoAndTreeFS ( ) + " branch --list";
	var			arrLines = _gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 60 * 1000, null );
	var			arrResult = new Array ( );
	for ( var i = 0; i < arrLines. length; i++ )
	{
		if ( typeof ( arrLines [ i ] ) != "undefined" && arrLines [ i ] != null && arrLines [ i ]. length > 2 )
			arrResult. push ( arrLines [ i ]. substring ( 2 ) );
	}
	
	return arrResult;
}

/**
 * Finds 0-based index of a given branch within a given repository.
 * 
 * @param {String} inName
 * 	Name of a branch to identify
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return {bool} Returns 0-based index of a given branch within a given repository. Returns -1 if branch is not there.
 */
var gitGetBranchIndexImpl = function ( inName, inWorkTree )
{
	var			arrBranches = gitGetBranchesImpl ( inWorkTree );

	return arrBranches. indexOf ( inName );
}

/**
 * Drops a branch with a given name within a given repository.
 * 
 * @param {String} inName
 * 	Name of the branch to drop
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return {Array[String]} git response in the form of array of strings.
 */
var gitDropBranchImpl = function ( inName, inWorkTree )
{
	var			gitCommand = _gitGetRepoAndTreeFS ( ) + " branch --delete " + inName;
	var			arrLines = _gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 60 * 1000, null );
	
	return arrLines;
}

/**
 * Merges a branch with a given name into the current branch.
 * 
 * @param {String} inName
 * 	Name of the branch to merge into the current one
 * @param {String} inWorkTree
 * 	git repository root path
 * 
 * @return {Array[String]} git response in the form of array of strings.
 */
var gitMergeBranchImpl = function ( inName, inWorkTree )
{
	var			gitCommand = _gitGetRepoAndTreeFS ( ) + " merge " + inName;
	var			arrLines = _gitExecuteFS ( gitCommand, null, _gitGetRepositoryRootFolder ( ), 60 * 1000, null );
	
	return arrLines;
}

/**
 * Verifies if a given string is a valid branch name.
 * 
 * @param {String} inName
 * 	String to test
 * 
 * @return {bool} Returns true if a given string contains a valid branch name, returns false otherwise.
 */
var gitIsBranchNameValidImpl = function ( inName )
{
	var				gitCommand = "check-ref-format --branch {s}";
	var				inParameters = new Array ( );
	inParameters. push ( inName );
	var			arrLines = _gitExecuteFS ( gitCommand, inParameters, _gitGetRepositoryRootFolder ( ), 60 * 1000, null );
	if ( arrLines. length >= 1 && arrLines [ 0 ]. indexOf ( "fatal: " ) == 0 )
		return false;
	
	return true;
}

/**
 * Retrieves a list of commits within the current branch for a given local repository.
 * 
 * @param {String} inWorkTree
 * 	git repository root path
 * @param {Array of String} inPathsOptional
 *  Array of file paths to get the history on
 * 
 * @return {Array} An array of commit objects. Each object has the following properties: 
 * 	hash, userName, userEMail, comment, date.
 *
 */
var gitGetCommitHistoryImpl = function ( inWorkTree, inPathsOptional )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + "log --format=format:\"--WAKANDA%n%H%n%aN%n%ae%n%s%n%cd\"";

	var				inParameters = null;
	if ( typeof ( inPathsOptional ) != "undefined" && inPathsOptional != null && inPathsOptional. length > 0 )
	{
		gitCommand += " -- {[f]}";
		
		var			arrFiles = _gitConvertToArrayOfFiles ( inPathsOptional );
		inParameters = new Array ( );
		inParameters. push ( arrFiles );
	}

//debug_alert ( gitCommand );
	var			arrLines = _gitExecuteFS ( gitCommand, inParameters, null, 60 * 1000, null );
/*	
	for ( var i = 0; i < arrLines. length; i++ )
	{
		debug_alert ( arrLines [ i ] );
	}
*/

	var				arrCommits = new Array ( );
	for ( var i = 0; i < arrLines. length; i += 6 )
	{
		var			objCommit = new Object ( );
		// The first line is a separator --WAKANDA
		// The second line is the sha1 commit ID
		objCommit. hash = arrLines [ i + 1 ];
		// The third line is the user name
		objCommit. userName = arrLines [ i + 2 ];
		// The fourth line is the user e-mail
		objCommit. userEMail = arrLines [ i + 3 ];
		// The fifth line is the short comment
		objCommit. comment = arrLines [ i + 4 ];
		// The sixth line is the commit date
		objCommit. date = arrLines [ i + 5 ];
		
		arrCommits. push ( objCommit );
//debug_alert ( JSON. stringify ( objCommit ) );
	}
	
	return arrCommits;
}

/**
 * Retrieves a list of files included in a given commit for a given local repository.
 * 
 * @param {String} inWorkTree
 * 	git repository root path
 * @param {String} inCommitHash
 *  Hash value of the commit to look into
 * 
 * @return {Array} An array of files in a given commit.
 *
 */
var gitGetCommitFilesImpl = function ( inWorkTree, inCommitHash )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + "diff-tree --no-commit-id --name-only -r " + inCommitHash;

//debug_alert ( gitCommand );
	var			arrLines = _gitExecuteFS ( gitCommand, null, null, 60 * 1000, null );
	if ( inWorkTree [ inWorkTree. length - 1 ] != "/" )
		inWorkTree += "/";
		
	for ( var i = 0; i < arrLines. length - 1; i++ )
	{
		arrLines [ i ] = inWorkTree + arrLines [ i ];
//debug_alert ( arrLines [ i ] );
	}
	// Delete the last line which is empty
	arrLines. length = arrLines. length - 1;
	
	return arrLines;
}

/**
 * Retrieves differences between two given commits for a given local repository and filters output 
 * to optional file paths.
 * 
 * @param {String} inWorkTree
 * 	git repository root path
 * @param {String} inCommitHash1
 *  Hash value of the first commit to look at
 * @param {String} inCommitHash2
 *  Hash value of the second commit to look at
 * @param {Array of String} inPathsOptional
 *  Array of file paths to limit the diff to
 * 
 * @return {String} The difference between two commits in unified diff format.
 *
 */
var gitGetUnifiedDiffImpl = function ( inWorkTree, inCommitHash1, inCommitHash2, inPathsOptional )
{
	var				gitCommand = _gitGetRepoAndTreeFS ( ) + "diff " + inCommitHash1 + " " + inCommitHash2;

	var				inParameters = null;
	if ( typeof ( inPathsOptional ) != "undefined" && inPathsOptional != null && inPathsOptional. length > 0 )
	{
		gitCommand += " -- {[f]}";
		
		var			arrFiles = _gitConvertToArrayOfFiles ( inPathsOptional );
		inParameters = new Array ( );
		inParameters. push ( arrFiles );
	}
	
//debug_alert ( gitCommand );
	var			arrLines = _gitExecuteFS ( gitCommand, inParameters, null, 60 * 1000, null );

	var			strDiff = "";
	for ( var i = 0; i < arrLines. length - 1; i++ )
	{
		strDiff += arrLines [ i ] + "\n";
	}
	
	return strDiff;
}


/*

IMPORTANT: LOG AND DIFF AND DIFF-TREE PROVIDE INFORMATION FOR THE CURRENT BRANCH ONLY!

	Repository/file history information:
		- Commit comment (short)
		- Date
		- Author
		- Branch
		- ID (hash)
		
	Diff value between two commits (whole/file)
	
To list commit info (whole repository or one file):
	
	git.exe log --format=format:"--WAKANDA%n%H%n%aN%n%ae%n%s%n%cd%n" -- ./WAK0080883/Untitled1.js
--WAKANDA
f1943792bbdd920e6ad4023c9aa7ae39bf5d6534
S T
stemnikov@gmail.com
branch commit
D:\DBs\WAK0080883n

To list files in a given commit:
	git.exe diff-tree --no-commit-id --name-only -r f1943792bbdd920e6ad4023c9aa7ae39bf5d6534
WAK0080883/Untitled1.js

Difference between two revisions:

	git.exe diff 10e10b2a437885acae15cced72be7925a13e517e f1943792bbdd920e6ad4023c9aa7ae39bf5d6534 -- ./WAK0080883/Untitled1.js
	git.exe diff 480ebf81b426cb0f4ba374b99a78bce1436c2312 1033bc8c9015efb20f5238cca080fb9fcaa62ace -- ./WAK0080883/Untitled1.js
	
	Produces text in unified diff format. Can be easily interpreted graphically, there are:
		- header lines
		- block lines hat start with @@
		- new only lines that start with +
		- old only lines that start with -
		- common lines that start with a space character
		- comment lines that start with \
	
	

*/


var				exports;

exports. myTest = myTestImpl;
exports. initUserAndEMail = gitInitUserAndEMailImpl;
exports. init = gitInitImpl;
exports. setGitExecPath = gitSetGitExecPathImpl;
exports. execute = gitExecuteImpl;
exports. verifyRepository = gitVerifyRepositoryImpl;
exports. responseHasConflicts = gitResponseHasConflictsImpl;
exports. repositoryHasModifications = gitRepositoryHasModificationsImpl;
exports. initIgnore = gitInitIgnoreImpl;
exports. getVersion = gitGetVersionImpl;
exports. mergeAll = gitRunMergeAllImpl;
exports. saveStash = gitSaveStashImpl;
exports. popStash = gitPopLatestStashImpl;
exports. dropStash = gitDropStashImpl;
exports. listStashes = gitListStashesImpl;
exports. getStashID = gitGetStashIDImpl;
exports. showLatestStash = gitShowLatestStashImpl;
exports. clearAllStashes = gitClearAllStashesImpl;
exports. pull = gitPullImpl;
exports. push = gitPushImpl;
exports. commit = gitCommitLocalImpl;
exports. clone = gitCloneImpl;
exports. initRepository = gitInitRepositoryImpl;
exports. stage = gitStageFilesImpl;
exports. getStatus = gitStatusImpl;
exports. getUntrackedFiles = gitGetUntrackedFilesImpl;
exports. remove = gitRemoveImpl;
exports. initRemoteRepository = gitInitRemoteRepositoryImpl;
exports. setRemoteRepository = gitSetRemoteRepositoryImpl;
exports. getRemoteRepository = gitGetRemoteRepositoryImpl;
exports. revert = gitRevertImpl;
exports. getDefaultIgnore = gitGetDefaultIgnoreImpl;
exports. getIgnoreContent = gitGetIgnoreContentImpl;
exports. setIgnoreContent = gitSetIgnoreContentImpl;
exports. getIgnoreFilePath = gitGetIgnoreFilePathImpl;
exports. provideFolderStatus = gitProvideFolderStatusImpl;
exports. providePathsStatus = gitProvidePathsStatusImpl;
exports. ignore = gitIgnoreImpl;
exports. follow = gitFollowImpl;
exports. resetAllMerged = gitResetAllMergedImpl;
exports. launchHistoryApp = gitLaunchHistoryAppImpl;
exports. hardResetAll = gitHardResetAllImpl;
exports. launchDiffApp = gitLaunchDiffAppImpl;
exports. executeCustom = gitExecuteCustomImpl;
exports. extractError = gitExtractErrorImpl;
exports. getCommitCount = gitGetCommitCountImpl;
exports. setDiffToolPath = gitSetDiffToolPathImpl;
exports. setMergeToolPath = gitSetMergeToolPathImpl;
exports. setProxy = gitSetProxyImpl;
exports. getDefaultExecutablePath = gitGetDefaultExecutablePathImpl;
exports. getCurrentBranch = gitGetCurrentBranchImpl;
exports. setCurrentBranch = gitSetCurrentBranchImpl;
exports. getBranches = gitGetBranchesImpl;
exports. getBranchIndex = gitGetBranchIndexImpl;
exports. dropBranch = gitDropBranchImpl;
exports. mergeBranch = gitMergeBranchImpl;
exports. isBranchNameValid = gitIsBranchNameValidImpl;
exports. getCommitHistory = gitGetCommitHistoryImpl;
exports. getCommitFiles = gitGetCommitFilesImpl;
exports. getUnifiedDiff = gitGetUnifiedDiffImpl;
