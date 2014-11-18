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
#include "headers4d.h"
#include "VRIASettingsKeys.h"



namespace RIASettingID
{
	CREATE_BAGKEY( solution);
	CREATE_BAGKEY( project);
	CREATE_BAGKEY( http);
	CREATE_BAGKEY( database);
	CREATE_BAGKEY( backup);
	CREATE_BAGKEY( javaScript);
	CREATE_BAGKEY( databaseJournal);
	CREATE_BAGKEY( databaseRecovery);
	CREATE_BAGKEY( service);
	CREATE_BAGKEY( resources);
	CREATE_BAGKEY( virtualFolder);
	CREATE_BAGKEY( webApp);			// DEPRECATED
	CREATE_BAGKEY( dataService);	// DEPRECATED
	CREATE_BAGKEY( rpcService);		// DEPRECATED
}



namespace RIASettingsKeys
{
	// Settings constants keys

	// Solution settings
	namespace Solution
	{
		CREATE_BAGKEY( serverStartup);
		CREATE_PATHBAGKEY_WITH_DEFAULT_SCALAR( "serverStartup", stopIfProjectFails, XBOX::VBoolean, bool, true);
		
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( garbageCollect, XBOX::VBoolean, bool, false);

		CREATE_BAGKEY( directory);
		CREATE_PATHBAGKEY_WITH_DEFAULT( "directory", authenticationType, XBOX::VString, L"");
		CREATE_BAGKEY_WITH_DEFAULT( cacheFolderPath, XBOX::VString, L"");

		CREATE_BAGKEY( log);
		CREATE_BAGKEY_WITH_DEFAULT( folderPath, XBOX::VString, L"$(solutionDir)Logs/");
	}

	// Project settings
	namespace Project
	{
		CREATE_BAGKEY_WITH_DEFAULT( publishName, XBOX::VString, L"");						// Name to be published by Bonjour.
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( administrator, XBOX::VBoolean, bool, false);
		CREATE_BAGKEY_WITH_DEFAULT( hostName, XBOX::VString, L"localhost");
		CREATE_BAGKEY_WITH_DEFAULT( pattern, XBOX::VString, L"");
		CREATE_BAGKEY_WITH_DEFAULT( listen, XBOX::VString, L"localhost");

		CREATE_BAGKEY_WITH_DEFAULT( responseFormat, XBOX::VString, L"json");
		CREATE_BAGKEY_NO_DEFAULT( authType, XBOX::VString);

	#if WITH_SANDBOXED_PROJECT
		CREATE_BAGKEY( directory);
		CREATE_BAGKEY_WITH_DEFAULT( cacheFolderPath, XBOX::VString, L"");

		CREATE_BAGKEY( log);
		CREATE_BAGKEY_WITH_DEFAULT( folderPath, XBOX::VString, L"$(projectDir)Logs/");
	#endif

		CREATE_BAGKEY(database);

		namespace Database
		{
			CREATE_BAGKEY(journal);
			namespace Journal
			{
				CREATE_BAGKEY_WITH_DEFAULT_SCALAR( enabled, XBOX::VBoolean, bool,false); //whether journaling is enabled
				CREATE_BAGKEY_WITH_DEFAULT( journalFolder, XBOX::VString,L"./");	 //Journal folder path
			}

			CREATE_BAGKEY(autoRecovery);
			namespace AutoRecovery
			{
				CREATE_BAGKEY_WITH_DEFAULT_SCALAR( integrateJournal, XBOX::VBoolean, bool,true);		//Automatically integrate journal when db opening fails
				CREATE_BAGKEY_WITH_DEFAULT_SCALAR( restoreFromLastBackup, XBOX::VBoolean, bool,false); //Automatically recover from lastBackup when db opening fails
			}

			CREATE_BAGKEY(backup);
			namespace Backup
			{
				CREATE_BAGKEY_WITH_DEFAULT(maxRetainedBackups, XBOX::VString,"20");		 //When removing old backups, number of existing backups to be retained ("all" or a number > 1 in quotes)
			}
		}
	}


	// HTTP Server settings
	namespace HTTP
	{
		const XBOX::VString		kCHARSET_UTF8("UTF-8");
		const XBOX::VString		kCHARSET_UTF16("UTF-16");

		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( autoStart, XBOX::VBoolean, bool, true);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( port, XBOX::VLong, sLONG, 80);
		CREATE_BAGKEY_NO_DEFAULT( SSLCertificatePath, XBOX::VString);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( allowSSL, XBOX::VBoolean, bool, false);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( SSLMandatory, XBOX::VBoolean, bool, false);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( allowHttpOnLocal, XBOX::VBoolean, bool, false);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( SSLPort, XBOX::VLong, sLONG, 443);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( useCache, XBOX::VBoolean, bool, true);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( pageCacheSize, XBOX::VLong, sLONG, 5*1024*1024);		// in bytes
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( cachedObjectMaxSize, XBOX::VLong, sLONG, 512*1024);	// in bytes
		CREATE_BAGKEY_WITH_DEFAULT( standardSet, XBOX::VString, kCHARSET_UTF8);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( acceptKeepAliveConnections, XBOX::VBoolean, bool, true);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( keepAliveMaxRequests, XBOX::VLong, sLONG, 100);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( keepAliveTimeOut, XBOX::VLong, sLONG, 15);
		CREATE_BAGKEY_WITH_DEFAULT( logFormat, XBOX::VString, L"No Log File");
		CREATE_BAGKEY_WITH_DEFAULT( logTokens, XBOX::VString, L"");
		CREATE_BAGKEY_WITH_DEFAULT( logPath, XBOX::VString,  L"$(projectDir)Logs/");
		CREATE_BAGKEY_WITH_DEFAULT( logFileName, XBOX::VString, L"HTTPServer.waLog");
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( logMaxSize, XBOX::VLong, sLONG, 10 * 1024);	// Max size of log file in Ko
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( allowCompression, XBOX::VBoolean, bool, true);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR (compressionMinThreshold, XBOX::VLong, sLONG, 1024);				// 1 KBytes (in bytes)
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR (compressionMaxThreshold, XBOX::VLong, sLONG, 10 * 1024 * 1024);	// 10 MBytes (in bytes)
	}

	// Database settings
	namespace Database
	{
		// solution settings
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( adaptiveCache, XBOX::VBoolean, bool, false);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( memoryForOtherApplications, XBOX::VLong, sLONG, 512);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( memoryForCache, XBOX::VLong, sLONG, 50);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( minimumSize, XBOX::VLong, sLONG, 100);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( maximumSize, XBOX::VLong, sLONG, 400);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( fixedSize, XBOX::VLong, sLONG, 200);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( keepCacheInMemory, XBOX::VBoolean, bool, true);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( flushDataCacheInterval, XBOX::VLong, sLONG, 15 * 60);	// 15 min (in seconds)
	}

	namespace Backup
	{
		//Solution and project-wide settings
		CREATE_BAGKEY_WITH_DEFAULT( destination, XBOX::VString,  L"./Backups/");
	}

	// Resources settings
	namespace Resources
	{
		CREATE_BAGKEY_NO_DEFAULT (url, XBOX::VString);
		CREATE_BAGKEY_NO_DEFAULT (urlMatch, XBOX::VString);
		CREATE_BAGKEY_NO_DEFAULT (allow, XBOX::VString);
		CREATE_BAGKEY_NO_DEFAULT (disallow, XBOX::VString);
		CREATE_BAGKEY_NO_DEFAULT (group, XBOX::VString);
		CREATE_BAGKEY_NO_DEFAULT (authType, XBOX::VString);
		CREATE_BAGKEY_NO_DEFAULT (authZone, XBOX::VString);
		CREATE_BAGKEY_NO_DEFAULT (expire, XBOX::VString);
		CREATE_BAGKEY_NO_DEFAULT (lifeTime, XBOX::VString);
	}

	// Virtual Folders settings
	namespace VirtualFolders
	{
		CREATE_BAGKEY_NO_DEFAULT (name, XBOX::VString);
		CREATE_BAGKEY_NO_DEFAULT (location, XBOX::VString);
		CREATE_BAGKEY_NO_DEFAULT (index, XBOX::VString);
	}

	// JavaScript settings
	namespace JavaScript
	{
		CREATE_BAGKEY( debugger);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( reuseContexts, XBOX::VBoolean, bool, true);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( contextPoolSize, XBOX::VLong, sLONG, 50);
	}

	// JavaScript debugger settings
	namespace JavaScriptDebugger
	{
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( enable, XBOX::VBoolean, bool, false);
	}

	// Common services keys
	namespace Service
	{
		CREATE_BAGKEY_NO_DEFAULT( name, XBOX::VString);
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( enabled, XBOX::VBoolean, bool, true);
		CREATE_BAGKEY_NO_DEFAULT( modulePath, XBOX::VString);
	}

	// Web App Service settings
	namespace WebApp
	{
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( enabled, XBOX::VBoolean, bool, true);	// DEPRECATED
		CREATE_BAGKEY_WITH_DEFAULT( documentRoot, XBOX::VString, L"WebFolder");		// DEPRECATED
	}

	// Data Service settings - DEPRECATED
	namespace DataService
	{
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( enabled, XBOX::VBoolean, bool, true);
		CREATE_BAGKEY_WITH_DEFAULT( pattern, XBOX::VString, L"/rest/.*");
	}

	// RPC Service settings - DEPRECATED
	namespace RPCService
	{
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( enabled, XBOX::VBoolean, bool, false);
		CREATE_BAGKEY_WITH_DEFAULT( pattern, XBOX::VString, L"/json-rpc/.*");
		CREATE_BAGKEY_WITH_DEFAULT_SCALAR( publishInClientGlobalNamespace, XBOX::VBoolean, bool, false);
	}
}


