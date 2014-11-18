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
#ifndef __PreferencesKeys_ria__
#define __PreferencesKeys_ria__




namespace RIASettingID
{
	EXTERN_BAGKEY( solution);
	EXTERN_BAGKEY( project);
	EXTERN_BAGKEY( http);
	EXTERN_BAGKEY( database);
	EXTERN_BAGKEY( backup);
	EXTERN_BAGKEY( javaScript);
	EXTERN_BAGKEY( databaseJournal);
	EXTERN_BAGKEY( databaseRecovery);
	EXTERN_BAGKEY( service);
	EXTERN_BAGKEY( resources);
	EXTERN_BAGKEY( virtualFolder);
	EXTERN_BAGKEY( webApp);			// DEPRECATED
	EXTERN_BAGKEY( dataService);	// DEPRECATED
	EXTERN_BAGKEY( rpcService);		// DEPRECATED
}



namespace RIASettingsKeys
{
	// Settings constants keys

	// Solution settings
	namespace Solution
	{
		EXTERN_BAGKEY( serverStartup);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( stopIfProjectFails, XBOX::VBoolean, bool);

		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( garbageCollect, XBOX::VBoolean, bool);

		EXTERN_BAGKEY( directory);
		EXTERN_BAGKEY_WITH_DEFAULT( authenticationType, XBOX::VString);
		EXTERN_BAGKEY_WITH_DEFAULT( cacheFolderPath, XBOX::VString);

		EXTERN_BAGKEY( log);
		EXTERN_BAGKEY_WITH_DEFAULT( folderPath, XBOX::VString);
	}

	// Project settings
	namespace Project
	{
		EXTERN_BAGKEY_WITH_DEFAULT( publishName, XBOX::VString);		
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( administrator, XBOX::VBoolean, bool);
		EXTERN_BAGKEY_WITH_DEFAULT( hostName, XBOX::VString);
		EXTERN_BAGKEY_WITH_DEFAULT( pattern, XBOX::VString);
		EXTERN_BAGKEY_WITH_DEFAULT( listen, XBOX::VString);
		EXTERN_BAGKEY_WITH_DEFAULT( responseFormat, XBOX::VString);
		EXTERN_BAGKEY_NO_DEFAULT( authType, XBOX::VString);

	#if WITH_SANDBOXED_PROJECT
		EXTERN_BAGKEY( directory);
		EXTERN_BAGKEY_WITH_DEFAULT( cacheFolderPath, XBOX::VString);

		EXTERN_BAGKEY( log);
		EXTERN_BAGKEY_WITH_DEFAULT( folderPath, XBOX::VString);
	#endif

		EXTERN_BAGKEY(database);

		namespace Database
		{
			EXTERN_BAGKEY(journal);
			namespace Journal
			{
				EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( enabled, XBOX::VBoolean, bool);//whether journaling is enabled
				EXTERN_BAGKEY_WITH_DEFAULT( journalFolder, XBOX::VString);		//Journal folder path
			}

			EXTERN_BAGKEY(autoRecovery);
			namespace AutoRecovery
			{
				EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( integrateJournal, XBOX::VBoolean, bool);		 //Automatically integrate journal when db opening fails
				EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( restoreFromLastBackup, XBOX::VBoolean, bool); //Automatically recover from lastBackup when db opening fails
			}

			EXTERN_BAGKEY(backup);
			namespace Backup
			{
				EXTERN_BAGKEY_WITH_DEFAULT(maxRetainedBackups, XBOX::VString);		 //When removing old backups, number of existing backups to be retained ("all" or a number > 1 in quotes)
			}
		}
	}


	// HTTP Server settings
	namespace HTTP
	{
		extern const XBOX::VString	kCHARSET_UTF8;
		extern const XBOX::VString	kCHARSET_UTF16;

		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( autoStart, XBOX::VBoolean, bool);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( port, XBOX::VLong, sLONG);
		EXTERN_BAGKEY_NO_DEFAULT( SSLCertificatePath, XBOX::VString);			// DEPRECATED, replaced by a project item tag
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( allowSSL, XBOX::VBoolean, bool);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( SSLMandatory, XBOX::VBoolean, bool);		
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( allowHttpOnLocal, XBOX::VBoolean, bool);		
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( SSLPort, XBOX::VLong, sLONG);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( useCache, XBOX::VBoolean, bool);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( pageCacheSize, XBOX::VLong, sLONG);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( cachedObjectMaxSize, XBOX::VLong, sLONG);
		EXTERN_BAGKEY_WITH_DEFAULT( standardSet, XBOX::VString);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( acceptKeepAliveConnections, XBOX::VBoolean, bool);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( keepAliveMaxRequests, XBOX::VLong, sLONG);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( keepAliveTimeOut, XBOX::VLong, sLONG);
		EXTERN_BAGKEY_WITH_DEFAULT( logFormat, XBOX::VString);
		EXTERN_BAGKEY_WITH_DEFAULT( logTokens, XBOX::VString);
		EXTERN_BAGKEY_WITH_DEFAULT( logPath, XBOX::VString);
		EXTERN_BAGKEY_WITH_DEFAULT( logFileName, XBOX::VString);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( logMaxSize, XBOX::VLong, sLONG);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( allowCompression, XBOX::VBoolean, bool);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR (compressionMinThreshold, XBOX::VLong, sLONG);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR (compressionMaxThreshold, XBOX::VLong, sLONG);
	}

	// Database settings
	namespace Database
	{
		// solution settings
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( adaptiveCache, XBOX::VBoolean, bool);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( memoryForOtherApplications, XBOX::VLong, sLONG);		// size in Mo (for adaptive cache)
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( memoryForCache, XBOX::VLong, sLONG);					// percentage of memory used for the cache (for adaptive cache)
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( minimumSize, XBOX::VLong, sLONG);					// size in Mo (for adaptive cache)
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( maximumSize, XBOX::VLong, sLONG);					// size in Mo (for adaptive cache)
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( fixedSize, XBOX::VLong, sLONG);						// size un Mo (for non adaptive cache)
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( keepCacheInMemory, XBOX::VBoolean, bool);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( flushDataCacheInterval, XBOX::VLong, sLONG);
	}

	// Backup settings 
	namespace Backup
	{
		//Solution and project-wide settings
		EXTERN_BAGKEY_WITH_DEFAULT( destination, XBOX::VString);
	}

	// Resources settings
	namespace Resources
	{
		EXTERN_BAGKEY_NO_DEFAULT (url, XBOX::VString);
		EXTERN_BAGKEY_NO_DEFAULT (urlMatch, XBOX::VString);
		EXTERN_BAGKEY_NO_DEFAULT (allow, XBOX::VString);
		EXTERN_BAGKEY_NO_DEFAULT (disallow, XBOX::VString);
		EXTERN_BAGKEY_NO_DEFAULT (group, XBOX::VString);
		EXTERN_BAGKEY_NO_DEFAULT (authType, XBOX::VString);
		EXTERN_BAGKEY_NO_DEFAULT (authZone, XBOX::VString);
		EXTERN_BAGKEY_NO_DEFAULT (expire, XBOX::VString);
		EXTERN_BAGKEY_NO_DEFAULT (lifeTime, XBOX::VString);
	}

	// Virtual Folders settings
	namespace VirtualFolders
	{
		EXTERN_BAGKEY_NO_DEFAULT (name, XBOX::VString);
		EXTERN_BAGKEY_NO_DEFAULT (location, XBOX::VString);
		EXTERN_BAGKEY_NO_DEFAULT (index, XBOX::VString);
	}

	// Javascript settings
	namespace JavaScript
	{
		EXTERN_BAGKEY( debugger);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( reuseContexts, XBOX::VBoolean, bool);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( contextPoolSize, XBOX::VLong, sLONG);
	}

	// JavaScript debugger settings
	namespace JavaScriptDebugger
	{
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( enable, XBOX::VBoolean, bool);
	}

	// Common services keys
	namespace Service
	{
		EXTERN_BAGKEY_NO_DEFAULT( name, XBOX::VString);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( enabled, XBOX::VBoolean, bool);
		EXTERN_BAGKEY_NO_DEFAULT( modulePath, XBOX::VString);
	}

	// Web App Service settings
	namespace WebApp
	{
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( enabled, XBOX::VBoolean, bool);	// DEPRECATED
		EXTERN_BAGKEY_WITH_DEFAULT( documentRoot, XBOX::VString);			// DEPRECATED
	}

	// Data Service settings - DEPRECATED
	namespace DataService
	{
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( enabled, XBOX::VBoolean, bool);
		EXTERN_BAGKEY_WITH_DEFAULT( pattern, XBOX::VString);
	}

	// RPC Service settings - DEPRECATED
	namespace RPCService
	{
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( enabled, XBOX::VBoolean, bool);
		EXTERN_BAGKEY_WITH_DEFAULT( pattern, XBOX::VString);
		EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( publishInClientGlobalNamespace, XBOX::VBoolean, bool);
	}
}



#endif