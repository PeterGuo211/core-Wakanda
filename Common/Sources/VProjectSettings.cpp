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
#include "VRIASettingsFile.h"
#include "VProjectSettings.h"


USING_TOOLBOX_NAMESPACE



VProjectSettings::VProjectSettings()
{
}


VProjectSettings::~VProjectSettings()
{
}


bool VProjectSettings::HasProjectSettings() const
{
	return HasSettings( RIASettingID::project);
}


void VProjectSettings::GetPublishName( XBOX::VString& outPublishName) const
{
	const VValueBag *bag = RetainSettings( RIASettingID::project);
	outPublishName = RIASettingsKeys::Project::publishName.Get( bag);
	ReleaseRefCountable( &bag);
}


bool VProjectSettings::GetAdministrator() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::project);
	bool result = RIASettingsKeys::Project::administrator.Get( bag);
	ReleaseRefCountable( &bag);
	return result;	
}


void VProjectSettings::GetHostName( XBOX::VString& outHostName) const
{
	const VValueBag *bag = RetainSettings( RIASettingID::project);
	outHostName = RIASettingsKeys::Project::hostName.Get( bag);
	ReleaseRefCountable( &bag);
}


void VProjectSettings::GetPattern( XBOX::VString& outPattern) const
{
	const VValueBag *bag = RetainSettings( RIASettingID::project);
	outPattern = RIASettingsKeys::Project::pattern.Get( bag);
	ReleaseRefCountable( &bag);
}


void VProjectSettings::GetListeningAddress( XBOX::VString& outListeningAddress) const
{
	const VValueBag *bag = RetainSettings( RIASettingID::project);
	outListeningAddress = RIASettingsKeys::Project::listen.Get( bag);
	ReleaseRefCountable( &bag);
}


#if WITH_SANDBOXED_PROJECT
void VProjectSettings::GetDirectoryCacheFolder( XBOX::VString& outPath) const
{
	const VValueBag *bag = RetainSettings( RIASettingID::project);
	const VValueBag *directorySettings = (bag != NULL) ? bag->RetainUniqueElement( RIASettingsKeys::Project::directory) : NULL;
	outPath = RIASettingsKeys::Project::cacheFolderPath.Get( directorySettings);
	ReleaseRefCountable( &directorySettings);
	ReleaseRefCountable( &bag);
}


void VProjectSettings::GetLogFolder( XBOX::VString& outPath) const
{
	const VValueBag *bag = RetainSettings( RIASettingID::project);
	const VValueBag *logSettings = (bag != NULL) ? bag->RetainUniqueElement( RIASettingsKeys::Project::log) : NULL;
	outPath = RIASettingsKeys::Project::folderPath.Get( logSettings);
	ReleaseRefCountable( &logSettings);
	ReleaseRefCountable( &bag);
}
#endif


bool VProjectSettings::HasHTTPServerSettings() const
{
	return HasSettings( RIASettingID::http);
}


bool VProjectSettings::GetHTTPServerStarted() const
{
	// compatibility note: the started state was previously stored into specific project settings part
	bool result = false;

	const VValueBag *bag = RetainSettings( RIASettingID::http);
	bool found = RIASettingsKeys::HTTP::autoStart.HasAttribute( bag);
	if (found)
	{
		result = RIASettingsKeys::HTTP::autoStart.Get( bag);
	}
	else
	{
		const VValueBag *projectBag = RetainSettings( RIASettingID::project);
		if (projectBag != NULL)
		{
			const VValueBag *serversBag = projectBag->RetainUniqueElement( VValueBag::StKey( L"servers"));
			if (serversBag != NULL)
			{
				const VValueBag *httpBag = serversBag->RetainUniqueElement( VValueBag::StKey( L"http"));
				if (httpBag != NULL)
				{
					found = httpBag->GetBool( VValueBag::StKey( L"started"), result);
					ReleaseRefCountable( &httpBag);
				}
				ReleaseRefCountable( &serversBag);
			}
			ReleaseRefCountable( &projectBag);
		}
	}

	if (!found)
		result = RIASettingsKeys::HTTP::autoStart.GetDefault();
	
	ReleaseRefCountable( &bag);

	return result;
}


sLONG VProjectSettings::GetListeningPort() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	sLONG result = RIASettingsKeys::HTTP::port.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


sLONG VProjectSettings::GetListeningSSLPort() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	sLONG result = RIASettingsKeys::HTTP::SSLPort.Get( bag);
	ReleaseRefCountable( &bag);

	return result;
}


bool VProjectSettings::GetAllowSSL() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	bool result = RIASettingsKeys::HTTP::allowSSL.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


bool VProjectSettings::GetSSLMandatory() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	bool result = RIASettingsKeys::HTTP::SSLMandatory.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


bool VProjectSettings::GetAllowHTTPOnLocal() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	bool result = RIASettingsKeys::HTTP::allowHttpOnLocal.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


bool VProjectSettings::GetUseCache() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	bool result = RIASettingsKeys::HTTP::useCache.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


sLONG VProjectSettings::GetCacheMaxSize() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	sLONG result = RIASettingsKeys::HTTP::pageCacheSize.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


sLONG VProjectSettings::GetCachedObjectMaxSize()
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	sLONG result = RIASettingsKeys::HTTP::cachedObjectMaxSize.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


bool VProjectSettings::GetAcceptKeepAliveConnections() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	bool result = RIASettingsKeys::HTTP::acceptKeepAliveConnections.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


sLONG VProjectSettings::GetKeepAliveMaxConnections() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	sLONG result = RIASettingsKeys::HTTP::keepAliveMaxRequests.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


sLONG VProjectSettings::GetKeepAliveTimeOut() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	sLONG result = RIASettingsKeys::HTTP::keepAliveTimeOut.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


void VProjectSettings::GetLogFolderPath( XBOX::VString& outFolderPath) const
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	outFolderPath = RIASettingsKeys::HTTP::logPath.Get( bag);
	ReleaseRefCountable( &bag);
}


void VProjectSettings::GetLogFileName( XBOX::VString& outFileName) const
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	outFileName = RIASettingsKeys::HTTP::logFileName.Get( bag);
	ReleaseRefCountable( &bag);
}


void VProjectSettings::GetLogFormat( XBOX::VString& outLogFormat) const
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	outLogFormat = RIASettingsKeys::HTTP::logFormat.Get( bag);
	ReleaseRefCountable( &bag);
}


void VProjectSettings::GetLogTokens( XBOX::VectorOfVString& outTokens) const
{
	outTokens.clear();
	
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	VString tokensString = RIASettingsKeys::HTTP::logTokens.Get( bag);
	if (!tokensString.IsEmpty())
	{
		tokensString.GetSubStrings( L';', outTokens);
	}
	ReleaseRefCountable( &bag);
}


sLONG VProjectSettings::GetLogMaxSize() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::http);
	sLONG result = RIASettingsKeys::HTTP::logMaxSize.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


bool VProjectSettings::GetAllowCompression() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::javaScript);
	bool result = RIASettingsKeys::HTTP::allowCompression.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


sLONG VProjectSettings::GetCompressionMinThreshold() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::javaScript);
	sLONG result = RIASettingsKeys::HTTP::compressionMinThreshold.Get( bag);
	ReleaseRefCountable( &bag);
	return result;;
}


sLONG VProjectSettings::GetCompressionMaxThreshold() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::javaScript);
	sLONG result = RIASettingsKeys::HTTP::compressionMaxThreshold.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}

bool VProjectSettings::HasDatabaseJournalSettings()const
{
	bool hasSuchSettings = false;
	const VValueBag *projBag = RetainSettings( RIASettingID::project);
	if (projBag)
	{
		const VValueBag* projectDbBag = projBag->RetainUniqueElement(
			RIASettingsKeys::Project::database);
		if (projectDbBag)
		{
			const VValueBag* projectDbJournalBag = projectDbBag->RetainUniqueElement(RIASettingsKeys::Project::Database::journal);
			if (projectDbJournalBag )
			{
				hasSuchSettings = true;
				hasSuchSettings = hasSuchSettings && projectDbJournalBag->AttributeExists(RIASettingsKeys::Project::Database::Journal::enabled);
				hasSuchSettings = hasSuchSettings && projectDbJournalBag->AttributeExists(RIASettingsKeys::Project::Database::Journal::journalFolder);
			}
			ReleaseRefCountable( &projectDbJournalBag);
		}
		ReleaseRefCountable( &projectDbBag);
	}
	ReleaseRefCountable( &projBag);
	return hasSuchSettings;
}

void VProjectSettings::GetDatabaseJournalPath(XBOX::VString& outJournalPath)const
{
	const VValueBag *projBag = RetainSettings( RIASettingID::project);
	if (projBag)
	{
		const VValueBag* projectDbBag = projBag->RetainUniqueElement(RIASettingsKeys::Project::database);
		if (projectDbBag)
		{
			const VValueBag* projectDbJournalBag = projectDbBag->RetainUniqueElement(RIASettingsKeys::Project::Database::journal);
			if (projectDbJournalBag )
			{
				outJournalPath = RIASettingsKeys::Project::Database::Journal::journalFolder.Get( projectDbJournalBag);
			}
			ReleaseRefCountable( &projectDbJournalBag);
		}
		ReleaseRefCountable( &projectDbBag);
	}
	ReleaseRefCountable( &projBag);
}

bool VProjectSettings::GetDatabaseJournalEnabled()const
{
	bool result = false;
	const VValueBag *projBag = RetainSettings( RIASettingID::project);
	if (projBag)
	{
		const VValueBag* projectDbBag = projBag->RetainUniqueElement(RIASettingsKeys::Project::database);
		if (projectDbBag)
		{
			const VValueBag* projectDbJournalBag = projectDbBag->RetainUniqueElement(RIASettingsKeys::Project::Database::journal);
			if (projectDbJournalBag )
			{
				result = RIASettingsKeys::Project::Database::Journal::enabled.Get( projectDbJournalBag);
			}
			ReleaseRefCountable( &projectDbJournalBag);
		}
		ReleaseRefCountable( &projectDbBag);
	}
	ReleaseRefCountable( &projBag);
	return result;
}

const XBOX::VValueBag*	VProjectSettings::RetainDatabaseBackupSettings()const
{
	const VValueBag* settings = NULL;
	const VValueBag *projBag = RetainSettings(RIASettingID::project);
	if (projBag)
	{
		const VValueBag* projectDbBag = projBag->RetainUniqueElement(RIASettingsKeys::Project::database);
		if (projectDbBag)
		{
			settings = projectDbBag->RetainUniqueElement(RIASettingsKeys::Project::Database::backup);
		}
		ReleaseRefCountable(&projectDbBag);
	}
	ReleaseRefCountable(&projBag);
	return settings;
}

bool VProjectSettings::HasDatabaseRecoverySettings()const
{
	return HasSettings(RIASettingsKeys::Project::Database::autoRecovery);
}

bool VProjectSettings::GetRecoverFromJournalOnIncompleteDatabase()const
{
	bool result = true;
	const VValueBag *projBag = RetainSettings( RIASettingID::project);
	if (projBag)
	{
		const VValueBag* projectDbBag = projBag->RetainUniqueElement(RIASettingsKeys::Project::database);
		if (projectDbBag)
		{
			const VValueBag* projectDbJournalBag = projectDbBag->RetainUniqueElement(RIASettingsKeys::Project::Database::autoRecovery);
			if (projectDbJournalBag )
			{
				result = RIASettingsKeys::Project::Database::AutoRecovery::integrateJournal.Get( projectDbJournalBag);
			}
			ReleaseRefCountable( &projectDbJournalBag);
		}
		ReleaseRefCountable( &projectDbBag);
	}
	ReleaseRefCountable( &projBag);
	return result;
}

bool VProjectSettings::GetRecoverFromLastBackupOnCorruptedDatabase()const
{
	bool result = false;
	const VValueBag *projBag = RetainSettings( RIASettingID::project);
	if (projBag)
	{
		const VValueBag* projectDbBag = projBag->RetainUniqueElement(RIASettingsKeys::Project::database);
		if (projectDbBag)
		{
			const VValueBag* projectDbRecoveryBag = projectDbBag->RetainUniqueElement(RIASettingsKeys::Project::Database::autoRecovery);
			if (projectDbRecoveryBag)
			{
				result = RIASettingsKeys::Project::Database::AutoRecovery::restoreFromLastBackup.Get( projectDbRecoveryBag);
			}
			ReleaseRefCountable( &projectDbRecoveryBag);
		}
		ReleaseRefCountable( &projectDbBag);
	}
	ReleaseRefCountable( &projBag);
	return result;
}
							

bool VProjectSettings::HasJavaScriptSettings() const
{
	return HasSettings( RIASettingID::javaScript);
}


bool VProjectSettings::GetReuseJavaScriptContexts() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::javaScript);
	bool result = RIASettingsKeys::JavaScript::reuseContexts.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


sLONG VProjectSettings::GetContextPoolSize() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::javaScript);
	sLONG result = RIASettingsKeys::JavaScript::contextPoolSize.Get( bag);
	ReleaseRefCountable( &bag);
	return result;
}


bool VProjectSettings::GetEnableJavaScriptDebugger() const
{
	const VValueBag *bag = RetainSettings( RIASettingID::javaScript);
	const VValueBag *debuggerSettings = (bag != NULL) ? bag->RetainUniqueElement( RIASettingsKeys::JavaScript::debugger) : NULL;
	bool result = RIASettingsKeys::JavaScriptDebugger::enable.Get( debuggerSettings);
	ReleaseRefCountable( &debuggerSettings);
	ReleaseRefCountable( &bag);
	return result;
}


bool VProjectSettings::HasServicesSettings() const
{
	return HasSettings( RIASettingID::service);
}


bool VProjectSettings::HasServiceSettings( const XBOX::VString& inServiceName) const
{
	const VValueBag *bag = RetainServiceSettings( inServiceName);
	bool result = (bag != NULL);
	ReleaseRefCountable( &bag);
	return result;
}


const XBOX::VBagArray* VProjectSettings::RetainServicesSettings() const
{
	return RetainMultipleSettings( RIASettingID::service);
}


const XBOX::VValueBag* VProjectSettings::RetainServiceSettings( const XBOX::VString& inServiceName) const
{
	const VValueBag *bag = NULL;
	
	const VBagArray *bagArray = RetainMultipleSettings( RIASettingID::service);
	if (bagArray != NULL)
	{
		for (VIndex pos = 1 ; (pos <= bagArray->GetCount()) && (bag == NULL) ; ++pos)
		{
			const VValueBag *serviceBag = bagArray->GetNth( pos);
			if (serviceBag != NULL)
			{
				VString name;
				if (serviceBag->GetString( RIASettingsKeys::Service::name, name))
				{
					if (name.EqualToString( inServiceName))
						bag = serviceBag;
				}
			}
		}
		ReleaseRefCountable( &bagArray);
	}

	return RetainRefCountable( bag);
}
