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



var			gsw_arrPorts = [ ];

var			gsw_gitBuffer = new Buffer ( 100 * 1024 ); // Start with 100K, buffer will grow dynamically as needed
var			gsw_gitBufferSize = 0;


function gsw_addToBuffer ( inBuffer )
{
	var			nAddedLength = inBuffer. length;
	if ( gsw_gitBufferSize + nAddedLength > gsw_gitBuffer. length )
	{
		var		nAdditionalIncrement = 1000 * 1024; // Add extra 1MB
		var		bffrNew = new Buffer ( gsw_gitBufferSize + nAddedLength + nAdditionalIncrement );
		gsw_gitBuffer. copy ( bffrNew, 0 );
		gsw_gitBuffer = bffrNew;
	}
	
	inBuffer. copy ( gsw_gitBuffer, gsw_gitBufferSize );
	gsw_gitBufferSize += nAddedLength;
}

function gsw_runGitCommand ( command, inData, inRootPath )
{
	var			gitWorker;
	if ( inRootPath == undefined || inRootPath == null || inRootPath == "" )
		gitWorker = new SystemWorker ( command );
	else
		gitWorker = new SystemWorker ( command, inRootPath );
		
	gitWorker. setBinary ( true );
	
	if ( inData != null )
	{
		// Write optional binary input for the command
		gitWorker. postMessage ( inData ); // synchronous
	}

	gitWorker. onmessage = function ( e )
	{
		var		result = arguments [ 0 ]. data;
		gsw_addToBuffer ( result );

		//console. log ( "Did read " + result. length + " bytes\n" );

		//test += result;
		//debugger;
	}
	gitWorker. onerror = function ( e )
	{
		//debugger;
		
		var		result = arguments [ 0 ]. data;
		gsw_addToBuffer ( result );
	}
	gitWorker. onterminated = function ( )
	{
		exitWait ( );
		//test += " the end";
		
	}

	wait ( 30000 );
}

onconnect = function ( inMessage ) // called when a new SharedWorker is created for a JS context
{
	var				workerPort = inMessage. ports [ 0 ];
	gsw_arrPorts. push ( workerPort );
	
	workerPort. onmessage = function ( inEvent )
	{
		var			message = inEvent. data;
		//var			fromPort = inEvent. ports [ 0 ];
		switch ( message. type )
		{
			case 'runGitCommand' :
			{
				gsw_gitBufferSize = 0;
				
				var		buffData = null;
				if ( message. dataBase64 != null )
				{
					if ( message. dataBase64. length == 0 )
						buffData = new Buffer ( 0 );
					else
						buffData = new Buffer ( message. dataBase64, 'base64' );
				}

				gsw_runGitCommand ( message. command, buffData, message. rootPath );
				
				var		nLastIndex = gsw_gitBufferSize;
				workerPort. postMessage ( { type : 'runResult', strResultBase64 : gsw_gitBuffer. toString ( 'base64', 0, nLastIndex ) } );
				//exitWait ( );
				
				break;
			}
			case 'disconnect' :
				//tmConnections[message.ref] = null;
				break;
		}
	}
}
