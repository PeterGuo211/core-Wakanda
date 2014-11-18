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
#include "VSolution.h"
#include "VProject.h"
#include "VProjectItem.h"
#include "VRIAServerApplication.h"
#include "VRIAServerSolution.h"
#include "VJSApplication.h"
#include "VJSSolution.h"
#include "VRIAServerJSAPI.h"
#include "VRIAServerTools.h"
#include "VRIAServerProjectContext.h"
#include "VRPCCatalog.h"
#include "JavaScript/Sources/VJSJSON.h"
#include "VRIAServerHTTPSession.h"
#include "VRIAServerHTTPRequestHandler.h"
#include "VRPCService.h"
#include "VRIAServerProject.h"
#include "UsersAndGroups/Sources/UsersAndGroups.h"
#include "Security Manager/Interfaces/CSecurityManager.h"
#include "Language Syntax/CLanguageSyntax.h"
#include "VRIAServerJSCore.h"
#include "VDataService.h"
#include "VRIAPermissions.h"
#include "VRIAJSDebuggerSettings.h"
#include "VRIAServerSupervisor.h"
#include "VRemoteDebuggerBreakpointsManager.h"

#if VERSIONMAC
#include "AuthorizationHelpers.h"
#endif

USING_TOOLBOX_NAMESPACE


namespace ProjectOpeningParametersKeys
{
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR( openingMode, XBOX::VLong, sLONG, ePOM_FOR_RUNNING);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( customHttpPort, XBOX::VLong, sLONG);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( customSSLPort, XBOX::VLong, sLONG);
	CREATE_BAGKEY_NO_DEFAULT( customAuthenticationType, XBOX::VString);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(handlesDebuggerServer, XBOX::VBoolean, bool, false);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR( debuggerType, XBOX::VLong, sLONG, NO_DEBUGGER_TYPE);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(handlesServerSupervisor, XBOX::VBoolean, bool, false);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(createAdminUser, XBOX::VBoolean, bool, false);
}



//--------------------------------------------------------------------------------------------------


bool _FindExistingFileInProjectHierarchy (VRIAServerProject *inProject, const XBOX::VString& inFileName, XBOX::VFilePath& outFilePath)
{
	if (NULL == inProject)
		return false;

	bool			found = false;
	VProject *		project = inProject->GetDesignProject();
	XBOX::VFilePath	path;

	outFilePath.Clear();

	if (NULL != project)
	{
		project->GetProjectFolderPath (path);
		path.ToSubFile (inFileName);

		{
			XBOX::VFile file (path);
			if (file.Exists())
				found = true;
		}

		if (!found)
		{
			project->GetProjectFolderPath (path);
			path.ToSubFolder (CVSTR ("settings")).ToSubFile (inFileName);
			{
				XBOX::VFile file (path);
				if (file.Exists())
					found = true;
			}
		}

		if (!found)
		{
			VSolution* solution = project->GetSolution();

			if (NULL != solution)
			{
				solution->GetSolutionFolderPath (path);
				path.ToSubFile (inFileName);
				XBOX::VFile file (path);
				if (file.Exists())
					found = true;
			}
		}

		if (!found)
		{
			XBOX::VFolder * waLibFolder = VRIAServerApplication::Get()->RetainFolder (VRIAServerApplication::eFS_Walib);
			path = waLibFolder->GetPath();
			XBOX::ReleaseRefCountable (&waLibFolder);
			path.ToSubFolder (CVSTR ("WAF"));
			path.ToSubFolder (CVSTR ("routing"));
			path.ToSubFile (inFileName);

			VFile file (path);
			if (file.Exists())
				found = true;
		}
	}

	if (found)
		outFilePath.FromFilePath (path);

	return found;
}


//--------------------------------------------------------------------------------------------------


VRIAServerProjectOpeningParameters::VRIAServerProjectOpeningParameters()
{
}


VRIAServerProjectOpeningParameters::~VRIAServerProjectOpeningParameters()
{
}


void VRIAServerProjectOpeningParameters::SetOpeningMode( EProjectOpeningMode inOpeningMode)
{
	ProjectOpeningParametersKeys::openingMode.Set( &fBag, inOpeningMode);
}


EProjectOpeningMode VRIAServerProjectOpeningParameters::GetOpeningMode() const
{
	return ProjectOpeningParametersKeys::openingMode.Get( &fBag);
}


void VRIAServerProjectOpeningParameters::SetCustomHttpPort( sLONG inPort)
{
	ProjectOpeningParametersKeys::customHttpPort.Set( &fBag, inPort);
}


bool VRIAServerProjectOpeningParameters::GetCustomHttpPort( sLONG& outPort) const
{
	return ProjectOpeningParametersKeys::customHttpPort.Get( &fBag, outPort);
}


void VRIAServerProjectOpeningParameters::SetCustomSSLPort( sLONG inPort)
{
	ProjectOpeningParametersKeys::customSSLPort.Set( &fBag, inPort);
}


bool VRIAServerProjectOpeningParameters::GetCustomSSLPort( sLONG& outPort) const
{
	return ProjectOpeningParametersKeys::customSSLPort.Get( &fBag, outPort);
}


void VRIAServerProjectOpeningParameters::SetCustomAuthenticationType( const XBOX::VString& inAuthenticationType)
{
	ProjectOpeningParametersKeys::customAuthenticationType.Set( &fBag, inAuthenticationType);
}


bool VRIAServerProjectOpeningParameters::GetCustomAuthenticationType( XBOX::VString& outAuthenticationType) const
{
	return ProjectOpeningParametersKeys::customAuthenticationType.Get( &fBag, outAuthenticationType);
}


void VRIAServerProjectOpeningParameters::SetHandlesDebuggerServer(bool inEnable)
{
	ProjectOpeningParametersKeys::handlesDebuggerServer.Set(&fBag, inEnable);
}


bool VRIAServerProjectOpeningParameters::GetHandlesDebuggerServer() const
{
	return ProjectOpeningParametersKeys::handlesDebuggerServer.Get(&fBag);
}


void VRIAServerProjectOpeningParameters::SetDebuggerType( WAKDebuggerType_t inType)
{
	ProjectOpeningParametersKeys::debuggerType.Set( &fBag, inType);
}


WAKDebuggerType_t VRIAServerProjectOpeningParameters::GetDebuggerType() const
{
#if USE_V8_ENGINE
	return WEB_INSPECTOR_TYPE; 
#else
	return (WAKDebuggerType_t) ProjectOpeningParametersKeys::debuggerType.Get( &fBag);
#endif
}


void VRIAServerProjectOpeningParameters::SetHandlesServerSupervisor( bool inSet)
{
	ProjectOpeningParametersKeys::handlesServerSupervisor.Set(&fBag, inSet);
}


bool VRIAServerProjectOpeningParameters::GetHandlesServerSupervisor() const
{
	return ProjectOpeningParametersKeys::handlesServerSupervisor.Get(&fBag);
}

#if WITH_SANDBOXED_PROJECT
void VRIAServerProjectOpeningParameters::SetCreateAdminUser( bool inCreateAdminUser)
{
	ProjectOpeningParametersKeys::createAdminUser.Set( &fBag, inCreateAdminUser);
}


bool VRIAServerProjectOpeningParameters::GetCreateAdminUser() const
{
	return ProjectOpeningParametersKeys::createAdminUser.Get( &fBag);
}


void VRIAServerProjectOpeningParameters::SetBreakpointsFolderPath( const XBOX::VFilePath& inPath)
{
	fBreakpointsFolderPath = inPath;
}


void VRIAServerProjectOpeningParameters::GetBreakpointsFolderPath( XBOX::VFilePath& outPath) const
{
	outPath = fBreakpointsFolderPath;
}


void VRIAServerProjectOpeningParameters::SetDebuggerSourcesRootPath( const XBOX::VFilePath& inPath)
{
	fDebuggerSourcesRootPath = inPath;
}


void VRIAServerProjectOpeningParameters::GetDebuggerSourcesRootPath( XBOX::VFilePath& outPath) const
{
	outPath = fDebuggerSourcesRootPath;
}

#endif



// ----------------------------------------------------------------------------



class VStopHTTPServerMessage : public VMessage
{
public:

	VStopHTTPServerMessage( VRIAServerProject* inApplication) { fApplication = RetainRefCountable( inApplication); }
	virtual ~VStopHTTPServerMessage() { QuickReleaseRefCountable( fApplication); }

protected:
	virtual	void DoExecute()
			{
				if (fApplication != NULL)
					fApplication->_StopHTTPServer();
			}

private:
			VRIAServerProject	*fApplication;
};



// ----------------------------------------------------------------------------



class VAuthenticationDelegate : public XBOX::VObject , public IAuthenticationDelegate
{
public:
			VAuthenticationDelegate( VRIAServerProject *inApplication)
			: fApplication( inApplication)
			{

			}

	virtual ~VAuthenticationDelegate()
			{
			}

	virtual	VJSGlobalContext* RetainJSContext( VError* outError, bool inReusable, const IHTTPRequest* inRequest)
			{
				VError err = VE_OK;
				
				VJSGlobalContext *context = fApplication->RetainJSContext( err, inReusable, inRequest);

				if (outError != NULL)
					*outError = err;

				return context;
			}

	virtual	VError ReleaseJSContext( VJSGlobalContext* inContext)
			{
				fApplication->ReleaseJSContext( inContext, NULL);
				return VE_OK;
			}

	virtual CUAGSession* CopyUAGSession( const XBOX::VString& inUAGSessionID)
			{
				CUAGSession *uagSession = NULL;
				VRIAHTTPSessionManager *sessionMgr = fApplication->RetainSessionMgr();
				if (sessionMgr != NULL)
				{
					VUUID uuid;
					uuid.FromString( inUAGSessionID);
					uagSession = sessionMgr->RetainSession( uuid);
					if (uagSession != NULL)
					{
						if (uagSession->hasExpired())
						{
							sessionMgr->RemoveSession( uagSession);
							ReleaseRefCountable( &uagSession);
						}
					}
					ReleaseRefCountable( &sessionMgr);
				}
				return uagSession;
			}

	virtual void SetUAGSessionAndCookie( IHTTPResponse *ioResponse)
			{
				IAuthenticationInfos* authInfo = ioResponse->GetRequest().GetAuthenticationInfos();
				CUAGSession *uagSession = authInfo->GetUAGSession();
				if (uagSession != NULL)
				{
					uagSession->SetCookie( *ioResponse, kHTTP_SESSION_COOKIE_NAME);
					if (authInfo->NeedAddUAGSession())
					{
						VRIAHTTPSessionManager* sessionMgr = fApplication->RetainSessionMgr();
						if (sessionMgr != NULL)
						{
							sessionMgr->AddSession(uagSession);
							sessionMgr->Release();
						}
					}
				}
				else
				{
					XBOX::VString cookieValue;
					if (ioResponse->GetRequest().GetCookie (kHTTP_SESSION_COOKIE_NAME, cookieValue) && !cookieValue.IsEmpty())
						ioResponse->DropCookie (kHTTP_SESSION_COOKIE_NAME);
				}
			}

private:
			VRIAServerProject	*fApplication;
};



//--------------------------------------------------------------------------------------------------


#if WITH_SANDBOXED_PROJECT

class VProjectLogListener : public VObject, public ILogListener
{
public:
	static	const char* GetMessageLevelName( EMessageLevel inLevel)
			{
				switch( inLevel)
				{
					case EML_Dump:			return "DUMP";
					case EML_Trace:			return "TRACE";
					case EML_Debug:			return "DEBUG";
					case EML_Warning:		return "WARN";
					case EML_Error:			return "ERROR";
					case EML_Fatal:			return "FATAL";
					case EML_Assert:		return "ASSERT";
					case EML_Information:
					default:				return "INFO";
				}
			}

			VProjectLogListener( const VFolder& inFolder, const VString& inLogFileName, const VString& inProjectLoggerID)
			{
				fProjectLoggerID = inProjectLoggerID;
				fLogFile = new VSplitableLogFile( inFolder, inLogFileName);
				if (!fLogFile->Open( false))
					assert(false);
			}

	virtual ~VProjectLogListener()
			{
				fLogFile->Close();
				delete fLogFile;
				fLogFile = NULL;
			}
	
	virtual	void Put( std::vector< const VValueBag* >& inBags)
			{
				if (fLogFile != NULL)
				{
					for( std::vector< const VValueBag* >::iterator iter = inBags.begin() ; iter != inBags.end() ; ++iter)
					{
						VString			loggerID;
						EMessageLevel	level;
						VString			message;
						VLog4jMsgFileLogger::GetLogInfosFromBag( *iter, loggerID, level, message);

						if (	loggerID.EqualToString( fProjectLoggerID)
							||	(loggerID.BeginsWith( fProjectLoggerID) && (loggerID.GetUniChar( fProjectLoggerID.GetLength()) == L'.')) )
						{
							StStringConverter<char> loggerConverter( VTC_StdLib_char);
							StStringConverter<char> messageConverter( VTC_StdLib_char);

							char szTime[512];
							time_t now = ::time( NULL);
							::strftime( szTime, sizeof( szTime),"%Y-%m-%d %X", ::localtime( &now));
							fLogFile->AppendFormattedString( "%s [%s] %s - %s\n", szTime, loggerConverter.ConvertString( loggerID), GetMessageLevelName(level), messageConverter.ConvertString( message));
						}
					}

					fLogFile->Flush();
				}
			}

private:
			VSplitableLogFile			*fLogFile;
			VString						fProjectLoggerID;
};

#endif


// ----------------------------------------------------------------------------



VRIAServerProject::VRIAServerProject()
: fSolution(NULL)
, fDesignProject(NULL)
, fDesignProjectFolder(NULL)
, fDatabase(NULL)
, fDataService(NULL)
, fSecurityManager(NULL)
, fContextMgr(NULL)
, fContextCreationEnabled(false)
, fJSContextPool(NULL)
, fJSRuntimeDelegate(NULL)
, fRPCService(NULL)
, fOpeningParameters(NULL)
, fHTTPServerProject (NULL)
, fApplicationStorage(NULL)
, fApplicationSettings(NULL)
, fSessionMgr(NULL)
, fRequestNumber(0)
, fLastGarbageCollectRequest(0)
, fLastWorkingSetSize(0)
, fPermissions(NULL)
, fBackupSettings(NULL)
, fDebuggerType(UNKNOWN_DBG_TYPE)
, fFileSystemNamespace(NULL)
, fSystemWorkerNamespace(NULL)
, fUAGDirectory(NULL)
#if WITH_SANDBOXED_PROJECT
, fLogListener( NULL)
, fWAKBreakpointsManager(NULL)
, fDebuggerSettings(NULL)
#endif
{
	fState.opened = false;
	fState.started = false;
	fState.inMaintenance = false;
}


VRIAServerProject::VRIAServerProject( VRIAServerSolution* inSolution)
: fSolution(inSolution)
, fDesignProject(NULL)
, fDesignProjectFolder(NULL)
, fDatabase(NULL)
, fDataService(NULL)
, fSecurityManager(NULL)
, fContextMgr(NULL)
, fContextCreationEnabled(false)
, fJSContextPool(NULL)
, fJSRuntimeDelegate(NULL)
, fRPCService(NULL)
, fOpeningParameters(NULL)
, fHTTPServerProject (NULL)
, fApplicationStorage(NULL)
, fApplicationSettings(NULL)
, fSessionMgr(NULL)
, fRequestNumber(0)
, fLastGarbageCollectRequest(0)
, fLastWorkingSetSize(0)
, fPermissions(NULL)
, fBackupSettings(NULL)
, fDebuggerType(UNKNOWN_DBG_TYPE)
, fFileSystemNamespace(NULL)
, fSystemWorkerNamespace(NULL)
, fUAGDirectory(NULL)
#if WITH_SANDBOXED_PROJECT
, fLogListener( NULL)
, fWAKBreakpointsManager(NULL)
, fDebuggerSettings(NULL)
#endif
{
	fState.opened = false;
	fState.started = false;
	fState.inMaintenance = false;
}


VRIAServerProject::~VRIAServerProject()
{
	Close();
	ReleaseRefCountable( &fFileSystemNamespace);
	ReleaseRefCountable ( &fSystemWorkerNamespace);
}


VRIAServerProject* VRIAServerProject::OpenProject( VError& outError, VRIAServerSolution* inSolution, VProject* inDesignProject, VRIAServerProjectOpeningParameters *inOpeningParameters)
{
	VRIAServerProject *application = NULL;
	outError = VE_OK;

	if (inDesignProject != NULL)
	{
		application = new VRIAServerProject( inSolution);
		if (application != NULL)
		{
			outError = application->_Open( inDesignProject, inOpeningParameters, NULL);
		}
		else
		{
			outError = vThrowError( VE_MEMORY_FULL);
		}
	}
	else
	{
		outError = VE_RIA_INVALID_DESIGN_PROJECT;
	}
	return application;
}


#if WITH_SANDBOXED_PROJECT

VRIAServerProject* VRIAServerProject::OpenProject( VError& outError, VRIAServerSolution* inSolution, VProject* inDesignProject, VRIAServerProjectOpeningParameters *inOpeningParameters, CUAGDirectory* inUAGDirectory)
{
	VRIAServerProject *application = NULL;
	outError = VE_OK;

	if (inDesignProject != NULL)
	{
		application = new VRIAServerProject( inSolution);
		if (application != NULL)
		{
			outError = application->_Open( inDesignProject, inOpeningParameters, inUAGDirectory);
		}
		else
		{
			outError = vThrowError( VE_MEMORY_FULL);
		}
	}
	else
	{
		outError = VE_RIA_INVALID_DESIGN_PROJECT;
	}
	return application;
}

#endif


VError VRIAServerProject::Close()
{
	if (!fState.opened || fState.started)
		return VE_OK;

	VError err = VE_OK;
	StTaskPropertiesSetter stTaskProps( &fLoggerID);

	// JS runtime delegate is deleted first, because it must first remove all web socket handlers.

	delete fJSRuntimeDelegate;
	fJSRuntimeDelegate = NULL;

	CDB4DManager *db4d = VRIAServerApplication::Get()->GetComponentDB4D();
	if (db4d != NULL)
	{
		db4d->ReleaseProjectInfo(this);
	}

	if (fJSContextPool != NULL)
	{
		VSyncEvent *syncEvent = fJSContextPool->WaitForNumberOfUsedContextEqualZero();
		if (syncEvent != NULL)
		{
			syncEvent->Lock( 5000);
			syncEvent->Release();
		}
		fJSContextPool->Clean();
	}

	fContextCreationEnabled = false;

	if (fContextMgr != NULL)
	{
		VSyncEvent *syncEvent = fContextMgr->WaitForRegisteredContextsCountZero();
		if (syncEvent != NULL)
		{
			syncEvent->Lock( 5000); // sc 22/03/2013, add timeout
			syncEvent->Release();
		}
		if (fContextMgr->GetRegisteredContextsCount() > 0)
			vThrowError( VE_RIA_PROJECT_IS_BUSY);
	}

	ReleaseRefCountable( &fRPCService);

	ReleaseRefCountable( &fDataService);

	_CloseAndReleaseDatabase( fDatabase);
	fDatabase = NULL;

	if (fHTTPServerProject != NULL)
	{
		CHTTPServer *httpServer = VRIAServerApplication::Get()->GetComponentHTTP();
		if (testAssert(httpServer != NULL))
		{
			httpServer->RemoveHTTPServerProject (fHTTPServerProject);
			XBOX::ReleaseRefCountable (&fHTTPServerProject);
		}
	}

	ReleaseRefCountable( &fSecurityManager);

	fSettings.Clear();

	ReleaseRefCountable( &fContextMgr);

	if (fSessionMgr != NULL)
		fSessionMgr->Clear(); // sc 17/04/2012, to release the remaining UAG sessions

	ReleaseRefCountable( &fSessionMgr);

	ReleaseRefCountable( &fPermissions);

	delete fJSContextPool;
	fJSContextPool = NULL;

	if (fUAGDirectory != NULL)
	{
		fUAGDirectory->CloseAndRelease();
		fUAGDirectory = NULL;
	}

#if WITH_SANDBOXED_PROJECT
	if (fDebuggerSettings != NULL)
	{
		// deinit the debugger
		JSWDebuggerFactory		fctry;
		IRemoteDebuggerServer*	jswDebugger = fctry.Get();
		IRemoteDebuggerServer*	chrDbgr = fctry.GetChromeDebugHandler( L"Empty-Solution");
		
		if (jswDebugger != NULL)
			jswDebugger->SetSettings( NULL);
		VChromeDebugHandler::StaticSetSettings( NULL);

		delete fDebuggerSettings;
		fDebuggerSettings = NULL;
	}

	if (fWAKBreakpointsManager != NULL)
	{
		fWAKBreakpointsManager->Save();
		delete fWAKBreakpointsManager;
		fWAKBreakpointsManager = NULL;
	}
#endif

	LogMessage( fLoggerID, eL4JML_Information, L"\"" + fName + "\" project closed");

#if WITH_SANDBOXED_PROJECT
	if (fLogListener)
	{
		VProcess::Get()->GetLogger()->RemoveLogListener( fLogListener);
		ReleaseRefCountable( &fLogListener);
	}
#endif

	ReleaseRefCountable( &fOpeningParameters);

	ReleaseRefCountable( &fDesignProject);
	ReleaseRefCountable( &fDesignProjectFolder);

	fName.Clear();

	ReleaseRefCountable( &fApplicationStorage);

	ReleaseRefCountable( &fApplicationSettings);

	fState.opened = false;
	fState.inMaintenance = false;

	return err;
}


VError VRIAServerProject::Start()
{
	if (!fState.opened || fState.started || fState.inMaintenance)
		return VE_OK;

	VError err = VE_OK;
	StTaskPropertiesSetter stTaskProps( &fLoggerID);

	if (VRIAServerApplication::Get()->GetDebuggingAuthorized() && fOpeningParameters->GetHandlesDebuggerServer())
	{
		VError lErr = _SetDebuggerServer(fOpeningParameters->GetDebuggerType(), NULL);	// sc 08/04/2013, debugger type is now an opening parameter
		if (lErr != VE_OK)
		{
			lErr = vThrowError(VE_RIA_CANNOT_SET_DEBUGGER);
		}
		
		assert(lErr == VE_OK);
	}

	if (fJSContextPool != NULL)
	{
		fJSContextPool->SetEnabled( true);
	}

	// A project which has none preferences is taken as a library project. So, none servers or services is launched.
	if (fSettings.HasProjectSettings())
	{
		if (fHTTPServerProject != NULL)
		{
			fHTTPServerProject->EnableStaticPagesService( false); // sc 03/09/2013, the "webApp" service is responsible for the activation of the static pages service

			// For debugging purpose, add a handler for the requests sent by Wakanda Studio
			VDebugHTTPRequestHandler *debugHandler = new VDebugHTTPRequestHandler( this, CVSTR("(?i)/debug/.*"));
			if (debugHandler != NULL)
			{
				err = fHTTPServerProject->AddHTTPRequestHandler( debugHandler);
				debugHandler->Release();
			}
			else
			{
				err = vThrowError( VE_MEMORY_FULL);
			}

			if (err != VE_OK)
				err = vThrowError( VE_RIA_CANNOT_ENABLE_DEBUG_SERVICE);

			// Install the optimize handler for WAF
			VFilePath optimizeScriptPath;
			VRIAServerApplication::Get()->GetWAFrameworkFolderPath( optimizeScriptPath);
			optimizeScriptPath.ToSubFolder( L"optimize");
			optimizeScriptPath.SetFileName( L"optimize.js");

			VFile *optimizeScriptFile = new VFile( optimizeScriptPath);
			if (optimizeScriptFile != NULL)
			{
				if (optimizeScriptFile->Exists())
				{
					VRIAJSCallbackGlobalFunction *callback = new VRIAJSCallbackGlobalFunction( "optimize");
					if (callback != NULL)
					{
						VJSRequestHandler *handler = new VJSRequestHandler( this, L"/waf-optimize", callback);
						if (handler != NULL)
						{
							handler->SetEnable( true);
							handler->RegisterIncludedFile( optimizeScriptFile);
							err = fHTTPServerProject->AddHTTPRequestHandler( handler);
							ReleaseRefCountable( &handler);
						}
						else
						{
							err = vThrowError( VE_MEMORY_FULL);
						}
						ReleaseRefCountable( &callback);
					}
					else
					{
						err = vThrowError( VE_MEMORY_FULL);
					}
				}
				ReleaseRefCountable( &optimizeScriptFile);
			}
			else
			{
				err = vThrowError( VE_MEMORY_FULL);
			}

			// Attach the server supervisor
			if (fOpeningParameters->GetHandlesServerSupervisor())
			{
				if (VRIAServerSupervisor::Get() != NULL)
					err = VRIAServerSupervisor::Get()->Attach( fHTTPServerProject);
				else
					err = vThrowError( VE_RIA_SERVER_SUPERVISOR_NOT_FOUND);

				if (err != VE_OK)
					err = vThrowError( VE_RIA_CANNOT_ENABLE_SERVER_SUPERVISOR);
			}

			// Execute internal project bootstrap script
			VFilePath internalBootStrapPath;
			VRIAServerApplication::Get()->GetWAFrameworkFolderPath( internalBootStrapPath);
			internalBootStrapPath.ToSubFolder( L"Core");
			internalBootStrapPath.ToSubFolder( L"Runtime");
			internalBootStrapPath.SetFileName( L"projectBootStrap.js");
			_EvaluateScript( internalBootStrapPath);

			// Post 'applicationWillStart' message to the services
			_PostServicesMessage( L"applicationWillStart");

			if (fSettings.GetHTTPServerStarted())
			{
				// Is HTTP Server started on startup ?
				err = _StartHTTPServer();
				if (err != VE_OK)
					err = vThrowError( VE_RIA_CANNOT_START_HTTP_SERVER);
			}
		}
		else
		{
			err = vThrowError( VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);
		}
	}

	if (err == VE_OK)
		LogMessage( fLoggerID, eL4JML_Information, L"\"" + fName + "\" project started");
	else
		LogMessage( fLoggerID, eL4JML_Warning, L"\"" + fName + "\" project started with errors");

	fState.started = true;

	return err;
}


VError VRIAServerProject::Stop()
{
	if (!fState.started)
		return VE_OK;

	StErrorContextInstaller errorContext;
	StTaskPropertiesSetter stTaskProps( &fLoggerID);

	// Post 'applicationWillStop' message to the services
	_PostServicesMessage( L"applicationWillStop");

	if (fHTTPServerProject != NULL)
	{
		// Detach the server supervisor
		if (fOpeningParameters->GetHandlesServerSupervisor())
		{
			if (VRIAServerSupervisor::Get() != NULL)
				VRIAServerSupervisor::Get()->Detach( fHTTPServerProject);
		}
		
		if (fHTTPServerProject->IsProcessing())
		{
			// Post 'httpServerWillStop' message to the services
			_PostServicesMessage( L"httpServerWillStop");

			if (fOpeningParameters->GetHandlesDebuggerServer() && (fDebuggerType != UNKNOWN_DBG_TYPE))
				_TerminateDebuggerHandling();

			fHTTPServerProject->StopProcessing();
		}
	}

	if (fOpeningParameters->GetHandlesDebuggerServer() && (fDebuggerType != UNKNOWN_DBG_TYPE))
		_TerminateDebuggerHandling();

	if (fJSContextPool != NULL)
		fJSContextPool->SetEnabled( false);

#if WITH_SANDBOXED_PROJECT
	// clean the context pool
	uLONG remainingContextsCount = 0;
	std::vector<JSWorkerInfo> workersInfos;
	fJSContextPool->Clean( 5000, &remainingContextsCount, &workersInfos);
	if (remainingContextsCount > 0)
	{
		VString remainingContexts;
		remainingContexts.FromLong( remainingContextsCount);
		vThrowError( VE_RIA_JS_CONTEXT_STILL_IN_USE, remainingContexts);

		LogWorkersInformations( fLoggerID, workersInfos); // sc 24/04/2013
	}
#endif // WITH_SANDBOXED_PROJECT

	fState.started = false;

	VError err = errorContext.GetLastError();
	
	if (err == VE_OK)
		LogMessage( fLoggerID, eL4JML_Information, L"\"" + fName + "\" project stopped");
	else
		LogMessage( fLoggerID, eL4JML_Warning, L"\"" + fName + "\" project stopped with errors");

	return err;
}


VError VRIAServerProject::OnStartup()
{
	VError err = VE_OK;

	if (fDesignProject != NULL)
	{
		StTaskPropertiesSetter stTaskProps( &fLoggerID);
		VectorOfProjectItems itemsVector;

		LogMessage( fLoggerID, eL4JML_Information, L"Executes the bootstrap file(s)");

		fDesignProject->GetProjectItemsFromTag( kBootstrapTag, itemsVector);
		for (VectorOfProjectItemsIterator iter = itemsVector.begin() ; iter != itemsVector.end()&& err == VE_OK ; ++iter)
		{
			if (*iter != NULL)
			{
				VFilePath scriptPath;
				(*iter)->GetFilePath( scriptPath);
			
				err = _EvaluateScript( scriptPath);

				if (err != VE_OK)
				{
					err = vThrowError( VE_RIA_CANNOT_EXECUTE_BOOTSTRAP_FILE);
				}
			}
		}

		if (err == VE_OK)
			LogMessage( fLoggerID, eL4JML_Information, L"Bootstrap file(s) executed");
		else
			LogMessage( fLoggerID, eL4JML_Warning, L"Bootstrap file(s) executed with errors");
	}
	else
	{
		err = VE_RIA_INVALID_DESIGN_PROJECT;
	}

	return err;
}


VError VRIAServerProject::OnStop()
{
	return VE_OK;
}


bool VRIAServerProject::IsOpened() const
{
	return fState.opened;
}


bool VRIAServerProject::IsStarted() const
{
	return fState.started;
}


bool VRIAServerProject::IsSandboxed() const
{
	return fState.sandboxed;
}


VRIAContext* VRIAServerProject::RetainNewContext( VError& outError)
{
	outError = VE_OK;
	VRIAContext *context = NULL;

	if (fContextCreationEnabled && fContextMgr != NULL)
	{
		context = new VRIAContext( this, fContextMgr);
		if (context != NULL)
		{
			outError = fContextMgr->RegisterContext( context);
			if (outError != VE_OK)
				ReleaseRefCountable( &context);
		}
		else
		{
			outError = vThrowError( VE_MEMORY_FULL);
		}
	}
	return context;
}


IHTTPServerProject *VRIAServerProject::RetainHTTPServerProject (VRIAContext* inContext)
{
	IHTTPServerProject *	httpServerProject = NULL;
	VRIAContext *			context = _ValidateAndRetainContext( inContext, false);

	if (context != NULL)
	{
		httpServerProject = RetainRefCountable (fHTTPServerProject);
		context->Release();
	}

	return httpServerProject;
}

VError VRIAServerProject::StartHTTPServerProject (VRIAContext* inContext)
{
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext (inContext, true);
	if (context != NULL)
	{
		err = _StartHTTPServer();
		context->Release();
	}

	return err;
}


VError VRIAServerProject::StopHTTPServerProject( VRIAContext* inContext)
{
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext (inContext, true);
	if (context != NULL)
	{
		if (fHTTPServerProject != NULL)
		{
			VStopHTTPServerMessage *msg = new VStopHTTPServerMessage (this);
			if (msg != NULL)
			{
				VRIAServerApplication::Get()->PostMessage( msg);
				msg->Release();
			}
		}
		else
		{
			err =  vThrowError (VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);
		}
		context->Release();
	}

	return err;
}


bool VRIAServerProject::IsHTTPServerProjectStarted (VRIAContext* inContext)
{
	bool started = false;

	VRIAContext *context = _ValidateAndRetainContext (inContext, true);
	if (context != NULL)
	{
		if (fHTTPServerProject != NULL)
			started = fHTTPServerProject->IsProcessing();
		context->Release();
	}

	return started;
}


CDB4DBase* VRIAServerProject::RetainDatabase( VRIAContext* inContext)

{
	CDB4DBase *base = NULL;

	VRIAContext *context = _ValidateAndRetainContext( inContext, false);
	if (context != NULL)
	{
		base = RetainRefCountable( fDatabase);
		context->Release();
	}
	return base;
}


VDataService* VRIAServerProject::RetainDataService( VRIAContext* inContext, VError* outError)
{
	VDataService *service = NULL;
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, false);
	if (context != NULL)
	{
		service = RetainRefCountable( fDataService);
		context->Release();
	}
	else
	{
		err = vThrowError( VE_RIA_INVALID_CONTEXT);
	}

	if (outError != NULL)
		*outError = err;

	return service;
}


VError VRIAServerProject::ReloadCatalog( VRIAContext* inContext)
{
	VError err = VE_OK;

	if (fReloadDatabaseMutex.Lock())
	{
		StTaskPropertiesSetter stTaskProps( &fLoggerID);

		VRIAContext *context = _ValidateAndRetainContext (inContext, true);
		if (context != NULL)
		{
			bool enableDataService = true;	// to restore data service state
			
			// Post 'catalogWillReload' message to the services
			_PostServicesMessage( L"catalogWillReload");

			// Abort all JS contexts paused in debug mode.
			if (VRIAServerApplication::Get()->GetDebuggingAuthorized())
			{
				VJSGlobalContext::AbortAllDebug();
			}

			if (fHTTPServerProject != NULL)
				fHTTPServerProject->MakeUnavailable();	// sc 14/02/2014, make the HTTP server unavailable

			if (fDatabase != NULL)
			{
				if (fDataService != NULL)
					fDataService->SetDatabase( NULL);
				
				// Disable the application context (VRIAContext) creation to prevent the creation of base contexts and the using of the current opened database
				bool contextCreationEnabled = _SetContextCreationEnabled( false);
				
				// Disable the JavaScript context creation for this application
				bool jsContextPoolEnabled = fJSContextPool->SetEnabled( false);

				// Drop all the JavaScript contexts of the solution to release the existing application contexts
				// sc 22/03/2013, review context pools cleaning mechanism
				std::vector<JSWorkerInfo> workersInfos;
				uLONG remainingContextsCount = 0;
				VRIAServerJSContextMgr *jsContextMgr = VRIAServerApplication::Get()->GetJSContextMgr();
				jsContextMgr->BeginPoolsCleanup();
				err = jsContextMgr->CleanAllPools( 5000, &remainingContextsCount, &workersInfos);
				jsContextMgr->EndPoolsCleanup();

				if (err == VE_OK)
				{
					if (remainingContextsCount == 0)
					{
						// Ensure the application is not used anymore
						ReleaseRefCountable( &context);

						if (fContextMgr != NULL)
						{
							VSyncEvent *syncEvent = fContextMgr->WaitForRegisteredContextsCountZero();
							if (syncEvent != NULL)
							{
								syncEvent->Lock( 5000); // sc 22/03/2013, add timeout
								syncEvent->Release();
							}
						}

						if (fContextMgr->GetRegisteredContextsCount() == 0)
						{
							// Here, nobody can access to the database so it's safe detach it and to close it
							CDB4DBase *db = fDatabase;
							fDatabase = NULL;
							_CloseAndReleaseDatabase( db);
						}
						else
						{
							err = vThrowError( VE_RIA_PROJECT_IS_BUSY);
						}
					}
					else
					{
						VString remainingContexts;
						remainingContexts.FromLong( remainingContextsCount);
						vThrowError( VE_RIA_JS_CONTEXT_STILL_IN_USE, remainingContexts);

						LogWorkersInformations( fLoggerID, workersInfos); // sc 24/04/2013
					}
				}

				if ((err != VE_OK) && (fDatabase != NULL))
					fDataService->SetDatabase( fDatabase);

				_SetContextCreationEnabled( contextCreationEnabled);
				fJSContextPool->SetEnabled( jsContextPoolEnabled);
			}
			else
			{
				VValueBag *settings = fSettings.RetainSettings( RIASettingID::dataService);
				enableDataService = RIASettingsKeys::DataService::enabled.Get( settings);
				ReleaseRefCountable( &settings);
			}

			bool haveDatastore = false;
			if (err == VE_OK)
			{
				bool contextCreationEnabled = _SetContextCreationEnabled( false);
				bool jsContextPoolEnabled = fJSContextPool->SetEnabled( false);

				// Here, nobody can access to the database so it's safe to open it
				fDatabase = _OpenDatabase( err);

				if (fDatabase != NULL)
				{
					haveDatastore = true;
					if (err == VE_OK)
					{
						if (fDataService != NULL)
						{
							fDataService->SetDatabase( fDatabase);
						}
					}
					else
					{
						_CloseAndReleaseDatabase( fDatabase);
						fDatabase = NULL;
					}
				}

				_SetContextCreationEnabled( contextCreationEnabled);
				fJSContextPool->SetEnabled( jsContextPoolEnabled);
			}

			if (err != VE_OK)
				err = vThrowError( VE_RIA_CANNOT_RELOAD_DATABASE);
			else if (haveDatastore)
				LogMessage( fLoggerID, eL4JML_Information, L"Datastore model reloaded");

			if (fHTTPServerProject != NULL)
				fHTTPServerProject->MakeAvailable();

			// Post 'catalogDidReload' message to the services
			_PostServicesMessage( L"catalogDidReload");

			ReleaseRefCountable( &context);
		}

		fReloadDatabaseMutex.Unlock();
	}

	return err;
}


VRPCCatalog* VRIAServerProject::RetainRPCCatalog( VRIAContext* inContext, VError* outError, const IHTTPRequest* inRequest, IHTTPResponse* inResponse)
{
	VRPCCatalog *catalog = NULL;
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, false);
	if (context != NULL)
	{
		catalog = _RetainRPCCatalog( err, inRequest, inResponse);
		context->Release();
	}
	else
	{
		err = vThrowError( VE_RIA_INVALID_CONTEXT);
	}

	if (outError != NULL)
		*outError = err;

	return catalog;
}


VRPCService* VRIAServerProject::RetainRPCService( VRIAContext* inContext, XBOX::VError* outError)
{
	VRPCService *service = NULL;
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, false);
	if (context != NULL)
	{
		service = RetainRefCountable( fRPCService);
		context->Release();
	}
	else
	{
		err = vThrowError( VE_RIA_INVALID_CONTEXT);
	}

	if (outError != NULL)
		*outError = err;

	return service;
}


CUAGDirectory* VRIAServerProject::RetainUAGDirectory( VError *outError)
{
	VError err = VE_OK;
	CUAGDirectory *uagDirectory = NULL;
		
	if (fSolution != NULL)
		uagDirectory = fSolution->RetainUAGDirectory();
#if WITH_SANDBOXED_PROJECT
	else if (fState.sandboxed && (fUAGDirectory != NULL))
		uagDirectory = RetainRefCountable( fUAGDirectory);
#endif
	else
		err = VE_UNKNOWN_ERROR;

	if (outError != NULL)
		*outError = err;

	return uagDirectory;
}


VRIAPermissions* VRIAServerProject::RetainPermissions( VRIAContext *inContext, XBOX::VError *outError)
{
	VError err = VE_OK;
	VRIAPermissions *permissions = NULL;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		permissions = RetainRefCountable( fPermissions);
		context->Release();
	}
	else
	{
		err = vThrowError( VE_RIA_INVALID_CONTEXT);
	}

	if (outError != NULL)
		*outError = err;

	return permissions;
}

IBackupSettings* VRIAServerProject::RetainBackupSettings(VRIAContext *inContext,VError* outError)
{
	VError err = VE_OK;
	IBackupSettings *settings = NULL;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		if (fBackupSettings == NULL)
		{
			_LoadBackupSettings();
		}
		if (fBackupSettings)
		{
			settings = RetainRefCountable( fBackupSettings);
		}
		context->Release();
	}
	else
	{
		err = vThrowError( VE_RIA_INVALID_CONTEXT);
	}

	if (outError != NULL)
		*outError = err;

	return settings;
}


VJSRequestHandler* VRIAServerProject::AddJSHTTPRequestHandler( VError& outError, VRIAContext* inContext, const VString& inPattern, IRIAJSCallback* inJSCallback)
{
	outError = VE_OK;
	VJSRequestHandler *handler = NULL;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		handler = new VJSRequestHandler( this, inPattern, inJSCallback);
		if (handler != NULL)
		{
			handler->SetEnable( true);

			if (fHTTPServerProject != NULL)
			{
				outError = fHTTPServerProject->AddHTTPRequestHandler( handler);
			}
			else
			{
				outError = vThrowError (VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);
			}
		}
		else
		{
			outError = vThrowError( VE_MEMORY_FULL);
		}
		context->Release();
	}
	return handler;
}


VError VRIAServerProject::RemoveJSHTTPRequestHandler( VRIAContext* inContext, const VString& inPattern, IRIAJSCallback* inJSCallback)
{
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		if (fHTTPServerProject != NULL)
		{
			VJSRequestHandler *handler = dynamic_cast<VJSRequestHandler*>(fHTTPServerProject->RetainHTTPRequestHandlerMatchingPattern( inPattern));
			if (handler != NULL)
			{
				IRIAJSCallback *callback = handler->RetainCallback();
				if (callback != NULL && callback->Match( inJSCallback))
				{
					err = fHTTPServerProject->RemoveHTTPRequestHandler( handler);
				}
				QuickReleaseRefCountable( callback);
			}
			QuickReleaseRefCountable( handler);
		}
		else
		{
			err = vThrowError (VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);
		}

		context->Release();
	}
	return err;
}


VJSGlobalContext* VRIAServerProject::RetainJSContext( VError& outError, bool inReusable, const IHTTPRequest* inRequest)
{
	outError = VE_OK;

	VJSGlobalContext *globalContext = NULL;

	if (fJSContextPool != NULL)
	{
		CUAGSession *session = NULL;
		VJSGlobalContext *preferedContext = NULL;

		if (fSessionMgr != NULL)
		{
			if (inRequest != NULL)
			{
				// sc 09/08/2012, retreive the session from the authentication infos instead of the cookie
				IAuthenticationInfos *authInfo = inRequest->GetAuthenticationInfos();
				if (authInfo != nil)
					session = RetainRefCountable( authInfo->GetUAGSession());

				if (session != NULL)
				{
					if (session->hasExpired())
					{
						fSessionMgr->RemoveSession( session);
						ReleaseRefCountable( &session);
					}
					else
					{
						preferedContext = session->GetLastUsedJSContext();
					}
				}
			}
		}

		globalContext = fJSContextPool->RetainContext( outError, inReusable, preferedContext);

		if (globalContext != NULL)
		{
			VJSContext jsContext( globalContext);

			if (session == NULL)
			{
				CUAGDirectory* dir = RetainUAGDirectory( NULL);
				if (dir != NULL)
				{
					VJSONObject* reqinfo = nil;
					if (inRequest != nil)
						reqinfo = inRequest->BuildRequestInfo();
					session = dir->MakeDefaultSession(nil, nil, false, reqinfo);
					QuickReleaseRefCountable(reqinfo);
					if (fSessionMgr != NULL && session != NULL)
						fSessionMgr->AddSession(session);
					dir->Release();
				}
			}

			if (session != NULL)
			{
				// Update the context with this session
				VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
				if (rtContext != NULL)
				{
					CUAGDirectory* dir = RetainUAGDirectory(NULL);
					if (dir != NULL)
					{
						CUAGThreadPrivilege* privileges = dir->NewThreadPrivilege();
						VJSContext jsContext(globalContext);
						jsContext.GetGlobalObjectPrivateInstance()->SetSpecific('uagX', privileges, VJSSpecifics::DestructorReleaseCComponent);
						CDB4DContext* dbcontext = rtContext->RetainDB4DContext(this);
						if (dbcontext != nil)
						{
							dbcontext->SetThreadPrivileges(privileges);
							dbcontext->Release();
						}
						dir->Release();
					}
					rtContext->SetUAGSession(session);
				}

				session->SetLastUsedJSContext( globalContext);
			}

			bool disallowDebugging = false;
			if (	(inRequest != NULL)
				&&	VRIAServerApplication::Get()->GetDebuggingAuthorized()
				&&	CanHandlesDebuggerServer()
				&&	(fDebuggerType == WEB_INSPECTOR_TYPE) )
			{
				//	sc 16/05/2013 disallow debugging when the request comes from the remote web debugger
				VString lReferer;
				if (inRequest->GetHTTPHeaders().GetHeaderValue( HEADER_REFERER, lReferer))
				{
					VURL url( lReferer, true);
					VString lPath;
					url.GetPath( lPath);
					disallowDebugging = lPath.BeginsWith( L"walib/debugger");
				}
			}

			if (disallowDebugging)
				jsContext.GetGlobalObject().SetProperty( kJSPrivateVariableName_NoDebug, disallowDebugging);
			else
			{
				VJSException	except;
				jsContext.GetGlobalObject().DeleteProperty( kJSPrivateVariableName_NoDebug,except);
			}
		}

		ReleaseRefCountable( &session);
	}
	return globalContext;
}


void VRIAServerProject::ReleaseJSContext( VJSGlobalContext* inContext, IHTTPResponse* inResponse)
{
	if (inContext != NULL)
	{
		if ( fSolution != 0 && fSolution-> CanGarbageCollect ( ) )
		{
			VString		vstrMessage ( "Releasing context " );
			vstrMessage. AppendLong8 ( ( sLONG8 ) inContext );
			vstrMessage. AppendCString ( "\n" );
			::DebugMsg ( vstrMessage );
		}

		// sc 28/05/2012, ensure the VJSContext object is destroyed before release the context
		{
			VJSContext		jsContext( inContext);

			CUAGSession* session = NULL;

			VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
			if (rtContext != NULL)
			{
				CDB4DContext* dbcontext = rtContext->RetainDB4DContext(this);
				if (dbcontext != NULL)
				{
					dbcontext->CleanUpForReuse();
					dbcontext->Release();
				}

				// This will make sure session storage object is unlocked (user may have locked it and forgot to unlock).
				VJSSessionStorageObject	*sessionStorageObject = rtContext->GetSessionStorageObject();
				if (sessionStorageObject != NULL)
					sessionStorageObject->ForceUnlock();


				session = rtContext->RetainUAGSession();
				rtContext->SetUAGSession( NULL); // sc 05/06/2012, WAK0076874, the default session may be reused from an other client
			}

			// Finally, update the cookie
			if (inResponse != NULL)
			{
				// sc 09/08/2012, cause HTTP server use the authentication infos UAG session to set the response, the session must be updated here
				inResponse->GetRequest().GetAuthenticationInfos()->SetUAGSession( session);
			}
			
			QuickReleaseRefCountable(session);

			jsContext.GetGlobalObjectPrivateInstance()->SetSpecific('uagX', nil, VJSSpecifics::DestructorReleaseCComponent);

			if ( fSolution != 0 && fSolution-> CanGarbageCollect ( ) )
			{
				VInterlocked::Increment ( &fRequestNumber );
				sLONG8			nWorkingSetSize = 0;
				if ( VSystem::AllowedToGetSystemInfo ( ) )
					nWorkingSetSize = VSystem::GetApplicationPhysicalMemSize ( );

				if ( fLastGarbageCollectRequest + 10 < fRequestNumber || fLastWorkingSetSize + 50000000 < nWorkingSetSize )
				{
					fLastGarbageCollectRequest = fRequestNumber;
					fLastWorkingSetSize = nWorkingSetSize;
					/*
						Problem: this may be not the context hogging the memory. Need to garbage collect all contexts.
						Need to have a usage (request) counter per context. 
					*/
					VString		vstrMessage ( "Garbage collecting context " );
					sLONG8		nContext = ( sLONG8 ) inContext;
					vstrMessage. AppendLong8 ( nContext );
					vstrMessage. AppendCString ( "\n" );
					::DebugMsg ( vstrMessage );

					VJSGlobalObject*		globalObject = jsContext. GetGlobalObjectPrivateInstance ( );
					globalObject-> GarbageCollect ( );

					jsContext. GarbageCollect ( );
				}
			}
		}

		if (fJSContextPool != NULL)
			fJSContextPool->ReleaseContext( inContext);
	}
}


VError VRIAServerProject::GetJSContextInformations( XBOX::VValueBag& outBag) const
{
	if (fJSContextPool != NULL)
	{
		fJSContextPool->GetPoolInformations( outBag);
	}
	return VE_OK;
}


bool VRIAServerProject::JSContextShouldBeReleased( XBOX::VJSGlobalContext* inContext) const
{
	if (fJSContextPool != NULL)
		return fJSContextPool->ContextShouldBeReleased( inContext);
	
	return false;
}


void VRIAServerProject::AppendJSContextRequiredScript( const VFilePath& inPath)
{
	if (fJSContextPool != NULL)
		fJSContextPool->AppendRequiredScript( inPath);
}


bool VRIAServerProject::GetUUID( VUUID& outUUID) const
{
	if (fDesignProject != NULL)
	{
		outUUID = fDesignProject->GetUUID();
		return true;
	}
	return false;
}


VRIAServerSolution* VRIAServerProject::GetSolution() const
{
	return fSolution;
}


VProject* VRIAServerProject::GetDesignProject()
{
	return fDesignProject;
}


void VRIAServerProject::GetName( XBOX::VString& outName) const
{
	outName = fName;
}


bool VRIAServerProject::IsAdministrator() const
{
	return fSettings.GetAdministrator();
}


void VRIAServerProject::GetHostName( VString& outHostName) const
{
	outHostName.Clear();
	fSettings.GetHostName( outHostName);
}


void VRIAServerProject::GetPattern( XBOX::VString& outPattern) const
{
	outPattern.Clear();
#if 0	// sc 25/03/2011 disable project pattern support
	fSettings.GetPattern( outPattern);
#endif
}


VFolder* VRIAServerProject::RetainFolder() const
{
	return RetainRefCountable( fDesignProjectFolder);
}


#if WITH_SANDBOXED_PROJECT
VFolder* VRIAServerProject::RetainLogFolder( bool inCreateIfNotExists) const
{
	VFolder *folder = NULL;

	if (fDesignProject != NULL)
	{
		VFilePath projectFolderPath;
		fDesignProject->GetProjectFolderPath( projectFolderPath);

		VString posixPath;
		fSettings.GetLogFolder( posixPath);
		fDesignProject->ResolvePosixPathMacros( posixPath);

		VFilePath path( projectFolderPath, posixPath, FPS_POSIX);
		if (path.IsFolder())
		{
			folder = new VFolder( path);
			if (folder != NULL && !folder->Exists() && inCreateIfNotExists)
				folder->CreateRecursive( false);
		}
	}
	return folder;
}
#endif


VFolder* VRIAServerProject::RetainTemporaryFolder( bool inCreateIfNotExists) const
{
	VFolder *folder = NULL;

	if (fDesignProject != NULL)
	{
		VProjectItem *item = fDesignProject->GetProjectItem();
		if (item != NULL)
		{
			VFilePath path;
			item->GetFilePath( path);
			path = path.ToFolder();
			path.ToSubFolder( L"temp");
			folder = new VFolder( path);
			if (folder != NULL && !folder->Exists() && inCreateIfNotExists)
				folder->Create();
		}
	}
	return folder;
}


const VRIASettingsFile* VRIAServerProject::RetainSettingsFile( const RIASettingsID& inSettingsID) const
{
	return fSettings.RetainSettingsFile( inSettingsID);
}

XBOX::VError VRIAServerProject::GetJournalingSettings(bool& outEnabled, XBOX::VFilePath& outJournalPath)const
{
	XBOX::VError error = VE_OK;
	if (fSettings.HasDatabaseJournalSettings())
	{
		outEnabled = fSettings.GetDatabaseJournalEnabled();
		if (outEnabled)
		{
			bool unused;
			_ComputeJournalPathFromSettings(outJournalPath, unused);
		}
		else
		{
			outJournalPath.Clear();
		}
	}
	else
	{
		outEnabled = false;
		outJournalPath.Clear();
	}
	return error;
}


VError VRIAServerProject::GetPublicationSettings( VString& outHostName, VString& outIP, sLONG& outPort, sLONG& outSSLPort, VString& outPattern, VString& outPublishName, bool& outAllowSSL, bool& outSSLMandatory, bool &outAllowHTTPOnLocal) const
{
	VError err = VE_OK;

	outHostName.Clear();
	outIP.Clear();
	outPort = 0;
	outSSLPort = 0;
	outPattern.Clear();
	outAllowSSL = false;
	outSSLMandatory = false;
	outAllowHTTPOnLocal = false;
	
	if (!fSettings.HasProjectSettings())
	{
		err = VE_RIA_CANNOT_LOAD_PROJECT_SETTINGS;
	}
	else
	{
		fSettings.GetHostName( outHostName);
		fSettings.GetListeningAddress( outIP);
	#if 0	// sc 25/03/2011 disable project pattern support
		fSettings.GetPattern( outPattern);
	#endif
		fSettings.GetPublishName( outPublishName);
	}

	if (err == VE_OK )
	{
		bool done = false;
		bool sslDone = false;

		if (fOpeningParameters != NULL)
		{
			done = fOpeningParameters->GetCustomHttpPort( outPort);
			sslDone = fOpeningParameters->GetCustomSSLPort( outSSLPort);
		}
		if (!done)
		{
			if (!fSettings.HasHTTPServerSettings())
				err = VE_RIA_CANNOT_LOAD_HTTP_SETTINGS;
			else
			{
				outPort = fSettings.GetListeningPort();
			}
		}
		if (!sslDone)
		{
			if (!fSettings.HasHTTPServerSettings())
				err = VE_RIA_CANNOT_LOAD_HTTP_SETTINGS;
			else
			{
				outSSLPort = fSettings.GetListeningSSLPort();
			}
		}

		outAllowSSL = fSettings.GetAllowSSL();
		outSSLMandatory = fSettings.GetSSLMandatory();
		outAllowHTTPOnLocal = fSettings.GetAllowHTTPOnLocal();
	}
	
	return err;
}


VRIAHTTPSessionManager*  VRIAServerProject::RetainSessionMgr() const
{
	return RetainRefCountable( fSessionMgr);
}


const VString& VRIAServerProject::GetMessagesLoggerID() const
{
	return fLoggerID;
}


void VRIAServerProject::BuildPathFromRelativePath( VFilePath& outPath, const VString& inRelativePath,const VString& inProjectItemRole, FilePathStyle inRelativPathStyle) const
{
	bool done = false;
	
	outPath.Clear();

	if (fDesignProject != NULL)
	{
		VProjectItem *item = fDesignProject->GetProjectItemFromTag(inProjectItemRole);
		if (item != NULL)
		{
			VFilePath folderPath;
			item->GetFilePath( folderPath);
			folderPath = folderPath.ToFolder();
			outPath.FromRelativePath( folderPath, inRelativePath, inRelativPathStyle);
		}
	}	
}

void VRIAServerProject::BuildPathFromRelativePath( VFilePath& outPath, const VString& inRelativePath, FilePathStyle inRelativPathStyle) const
{
	bool done = false;
	
	outPath.Clear();

	if (inRelativPathStyle == FPS_POSIX && inRelativePath.BeginsWith( L"walib/"))
	{
		VFilePath walibPath;
		VRIAServerApplication::Get()->GetWALibraryFolderPath( walibPath);

		VString relativePath( inRelativePath);
		relativePath.Remove( 1, 6);	// remove "walib/"
			
		outPath.FromRelativePath( walibPath, relativePath, inRelativPathStyle);
		done = true;
	}
	
	if (fDesignProject != NULL && !done)
	{
		VProjectItem *item = fDesignProject->GetProjectItem();
		if (item != NULL)
		{
			VFilePath folderPath;
			item->GetFilePath( folderPath);
			folderPath = folderPath.ToFolder();
			outPath.FromRelativePath( folderPath, inRelativePath, inRelativPathStyle);
		}
	}	
}

bool VRIAServerProject::CanHandlesDebuggerServer() const
{
	if (fOpeningParameters != NULL)
		return fOpeningParameters->GetHandlesDebuggerServer();

	return false;
}


WAKDebuggerType_t VRIAServerProject::GetDebuggerServer()
{
	IRemoteDebuggerServer*	dbgrSrv = VJSGlobalContext::GetDebuggerServer();
	WAKDebuggerType_t l_type = (dbgrSrv != NULL) ? dbgrSrv->GetType() : NO_DEBUGGER_TYPE;
	DebugMsg("VRIAServerProject::GetDebuggerServer type=%d\n", l_type);
	return l_type;
}


sLONG VRIAServerProject::IsDebugging()
{
	IRemoteDebuggerServer *dbgrSrv = VJSGlobalContext::GetDebuggerServer();
	if (dbgrSrv)
		return (dbgrSrv->HasClients()) ? 1 : 0;
	return 0;
}


VError VRIAServerProject::StartDebugger( VRIAContext* inContext)
{
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		err = _StartDebugger();
		context->Release();
	}
	else
	{
		err = vThrowError( VE_RIA_INVALID_CONTEXT);
	}

	if (err != VE_OK)
		err = vThrowError( VE_RIA_CANNOT_START_DEBUGGER);

	return err;
}


VError VRIAServerProject::StopDebugger( VRIAContext* inContext)
{
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		_StopDebugger();
		context->Release();
	}
	else
	{
		err = vThrowError( VE_RIA_INVALID_CONTEXT);
	}

	if (err != VE_OK)
		err = vThrowError( VE_RIA_CANNOT_STOP_DEBUGGER);

	return err;
}


sLONG VRIAServerProject::CanSetDebuggerServer( WAKDebuggerType_t inWAKDebuggerType)
{
	if (!VRIAServerApplication::Get()->GetDebuggingAuthorized())
		return 0;

	sLONG canSet = 0;

	switch (inWAKDebuggerType)
	{
	case WEB_INSPECTOR_TYPE:
	case REGULAR_DBG_TYPE:
	case NO_DEBUGGER_TYPE:
		canSet = 1;
		break;

	default:
		break;
	}

	return canSet;
}


VError VRIAServerProject::SetDebuggerServer( VRIAContext* inContext, WAKDebuggerType_t inWAKDebuggerType, bool inAsynchronous, VRIAServerJob *inJob)
{
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		if (inAsynchronous)
		{
			VSetDebuggerServerMessage *setDebuggerMsg = new VSetDebuggerServerMessage( this, inWAKDebuggerType, inJob);
			VRIAServerApplication::Get()->PostMessage( setDebuggerMsg);
			ReleaseRefCountable( &setDebuggerMsg);
		}
		else
		{
			err = _SetDebuggerServer( inWAKDebuggerType, inJob);
		}
		
		context->Release();
	}
	else
	{
		err = vThrowError( VE_RIA_INVALID_CONTEXT);
	}

	if (err != VE_OK)
		err = vThrowError( VE_RIA_CANNOT_SET_DEBUGGER);

	return err;
}


VError VRIAServerProject::GetDebuggerStatus(
			VRIAContext*		inContext,
			WAKDebuggerType_t&	outWAKDebuggerType,
			bool&				outStarted,
			sLONG&				outbreakpointsTimeStamp,
			bool&				outConnected,
			sLONG&				outDebuggingEventsTimeStamp,
			bool&				outPendingContexts)
{
	outStarted = false;
	outWAKDebuggerType = UNKNOWN_DBG_TYPE;

	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		IRemoteDebuggerServer*		dbgrSrv = VJSGlobalContext::GetDebuggerServer();
		if (dbgrSrv)
		{
			long long evtsTS;
			outWAKDebuggerType = dbgrSrv->GetType();
			if (outWAKDebuggerType != NO_DEBUGGER_TYPE)
			{
				if (fSolution != NULL)
					fSolution->GetBreakpointsTimeStamp(outbreakpointsTimeStamp);
			#if WITH_SANDBOXED_PROJECT
				else if (fState.sandboxed && CanHandlesDebuggerServer() && (fWAKBreakpointsManager != NULL))
					fWAKBreakpointsManager->GetTimeStamp( outbreakpointsTimeStamp);
			#endif
				else
					err = vThrowError( VE_RIA_CANNOT_GET_BREAKPOINTS_TIMESTAMP);

				if (err == VE_OK)
				{
					dbgrSrv->GetStatus(
							outStarted,
							outConnected,
							evtsTS,
							outPendingContexts);
					outDebuggingEventsTimeStamp = (sLONG)evtsTS;
				}
			}

		}

		context->Release();
	}
	else
	{
		err = vThrowError( VE_RIA_INVALID_CONTEXT);
	}

	return err;
}


VError VRIAServerProject::_SetDebuggerServer( WAKDebuggerType_t inWAKDebuggerType, VRIAServerJob *inJob)
{
	VError err = VE_OK;
	
	VString jobID((inJob != NULL) ? inJob->GetId() : L"");
	StTaskPropertiesSetter taskPropertiesSetter( &fLoggerID, (inJob != NULL) ? &jobID : NULL);

	if (VRIAServerApplication::Get()->GetDebuggingAuthorized())
	{
		if (fOpeningParameters->GetHandlesDebuggerServer())
		{
			if (fDebuggerType != inWAKDebuggerType)
			{
				JSWDebuggerFactory debuggerFactory;

				_TerminateDebuggerHandling();

				switch (inWAKDebuggerType)
				{
				case NO_DEBUGGER_TYPE:		// no debugger
					{
						IRemoteDebuggerServer *noDebuggerServer = debuggerFactory.GetNoDebugger();
						if (testAssert(noDebuggerServer != NULL))
						{
							VJSGlobalContext::SetDebuggerServer( NULL, NULL, noDebuggerServer);
							noDebuggerServer->StartServer();
						}
						else
						{
							err = VE_UNKNOWN_ERROR;
						}
						DebugMsg( (err == VE_OK) ? "SET NO DEBUGGER\n" : "CANNOT SET NO DEBUGGER\n");
						break;
					}

				case WEB_INSPECTOR_TYPE:	// Remote debugger
					{
						if (fHTTPServerProject != NULL)
						{
							VFolder*		resourceFolder = VRIAServerApplication::Get()->RetainApplicationResourcesFolder();
							VFilePath		filePath;
							VFile*			skeletonfile;
							VString			tracesContent("");
							filePath = resourceFolder->GetPath();
							filePath.SetFileName( L"remote_traces.skeleton", true);
							skeletonfile = new VFile(filePath);
							if ( skeletonfile && skeletonfile->Exists() )
							{
								VFileStream		l_file_stream(skeletonfile);
								err = l_file_stream.OpenReading();
								if (err == VE_OK)
								{
									err = l_file_stream.GetText(tracesContent);
									l_file_stream.CloseReading();
								}
							}
							ReleaseRefCountable( &skeletonfile);

							if (err == VE_OK)
							{
								VString name;

								if (fSolution != NULL)
									fSolution->GetName( name);
							#if WITH_SANDBOXED_PROJECT
								else if (fState.sandboxed)
									name = fName;
							#endif

								IChromeDebuggerServer *chromeDebuggerServer = debuggerFactory.GetChromeDebugHandler( name, tracesContent);
								if (testAssert(NULL != chromeDebuggerServer))
								{
									// add chrome request handler
									VChromeDebugHandler *handler = dynamic_cast<VChromeDebugHandler*>(chromeDebuggerServer);
									if (testAssert(handler != NULL))
									{
										fHTTPServerProject->AddWebSocketHandler( handler);
										VJSGlobalContext::SetDebuggerServer( NULL, chromeDebuggerServer, NULL);
										chromeDebuggerServer->StartServer();
									}
									else
									{
										err = VE_UNKNOWN_ERROR;
									}
								}
								else
								{
									err = VE_UNKNOWN_ERROR;
								}
							}
							ReleaseRefCountable(&resourceFolder);
						}
						else
						{
							err = vThrowError( VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);
						}
						DebugMsg( (err == VE_OK) ? "SET CHROME DEBUGGER\n" : "CANNOT SET CHROME DEBUGGER\n");
						break;
					}

				case REGULAR_DBG_TYPE:		// Wakanda debugger
					{
						if (fSolution != NULL)
						{
							VFilePath solutionFolderPath;
							if (fSolution->GetDesignSolution()->GetSolutionFolderPath( solutionFolderPath))
							{
								VFolder solutionFolder( solutionFolderPath);
								
								IWAKDebuggerServer *wakDebuggerServer = debuggerFactory.Get();
								if (testAssert(wakDebuggerServer != NULL))
								{
									VJSGlobalContext::SetDebuggerServer( wakDebuggerServer, NULL, NULL);

									VString fullPath;
									solutionFolderPath.GetPosixPath( fullPath);
									wakDebuggerServer->SetSourcesRoot( &fullPath);

									VFilePath sslCertificatePath;
									bool certificatesFound = false;
									if (fDesignProject != NULL)
									{
										// sc 12/02/2014 WAK0086544
										VProjectItem *certificatesFolder = fDesignProject->GetProjectItemFromTag( kProjectCertificatesFolderTag);
										if ((certificatesFolder == NULL) && (fDesignProject->GetSolution() != NULL))
											certificatesFolder = fDesignProject->GetSolution()->GetProjectItemFromTag( kSolutionCertificatesFolderTag);
								
										if (certificatesFolder != NULL)
											certificatesFolder->GetFilePath( sslCertificatePath);

										// check whether the folder contains the certificates
										if (sslCertificatePath.IsValid() && sslCertificatePath.IsFolder())
										{
											VFilePath certPath( sslCertificatePath);
											certPath.ToSubFile( L"cert.pem");
											if (certPath.IsValid() && certPath.IsFile())
											{
												VFile *certificateFile = new VFile( certPath);
												if ((certificateFile != NULL) && certificateFile->Exists())
												{
													VFilePath keyPath( sslCertificatePath);
													keyPath.ToSubFile ( L"key.pem");
													if (keyPath.IsValid() && keyPath.IsFile())
													{
														VFile *keyFile = new VFile( keyPath);
														certificatesFound = (keyFile != NULL) && keyFile->Exists();
														ReleaseRefCountable( &keyFile);
													}
												}
												ReleaseRefCountable( &certificateFile);
											}
										}
									}

									if (!certificatesFound)
									{
										VFolder *folder = VRIAServerApplication::Get()->RetainApplicationResourcesFolder();
										if (folder != NULL)
										{
											sslCertificatePath = folder->GetPath();
											sslCertificatePath.ToSubFolder( L"Default Solution").ToSubFolder( L"Certificates");
											folder->Release();
										}
									}
										
									wakDebuggerServer->SetCertificatesFolder( sslCertificatePath.GetPath().GetCPointer());

									VJSGlobalContext::SetSourcesRoot( solutionFolder);
									VJSGlobalContext::AllowDebuggerLaunch();
									wakDebuggerServer->StartServer();
								}
								else
								{
									err = VE_UNKNOWN_ERROR;
								}
							}
							else
							{
								err = VE_UNKNOWN_ERROR;
							}
						}
						else
						{
							assert(false);
							err = VE_UNKNOWN_ERROR;
						}
						DebugMsg( (err == VE_OK) ? "SET WAKANDA DEBUGGER\n" : "CANNOT SET WAKANDA DEBUGGER\n");
						break;
					}

				default:
					assert(false);
					break;
				}

				if (err == VE_OK)
					fDebuggerType = inWAKDebuggerType;
			}
		}
		else
		{
			err = vThrowError( VE_RIA_DEBUGGER_NOT_HANDLED_BY_PROJECT);
		}
	}
	else
	{
		err = vThrowError( VE_RIA_DEBUGGING_NOT_AUTHORIZED);
	}

	if (inJob != NULL)
	{
		VValueBag *bag = new VValueBag;
		if (bag != NULL)
		{
			IRemoteDebuggerServer *dbgrSrv = VJSGlobalContext::GetDebuggerServer();
			WAKDebuggerType_t dbgrType = (dbgrSrv != NULL) ? dbgrSrv->GetType() : NO_DEBUGGER_TYPE;
			ILoggerBagKeys::message.Set( bag, L"set the debugger");
			bag->SetString( L"debuggerParam", DebuggerTypeToDebuggerParam( inWAKDebuggerType));
			bag->SetString( L"currentDebugger", DebuggerTypeToDebuggerParam( dbgrType));
			JobCommonBagKeys::jobResult.Set( bag, (err == VE_OK) ? 0 : 1);
		}
		VRIAServerSupervisor::Get()->TerminateJob( inJob->GetId(), bag);
		ReleaseRefCountable( &bag);
	}

	return err;
}


VError VRIAServerProject::_TerminateDebuggerHandling()
{
	VError err = VE_OK;

	if (fOpeningParameters->GetHandlesDebuggerServer())
	{
		if (fDebuggerType != UNKNOWN_DBG_TYPE)
		{
			IRemoteDebuggerServer *debuggerServer = VJSGlobalContext::GetDebuggerServer();
			if (testAssert(debuggerServer != NULL))
			{
				assert(debuggerServer->GetType() == fDebuggerType);

				VJSGlobalContext::AbortAllDebug();
				
				// Stop current debugger
				debuggerServer->StopServer();

				if ((fHTTPServerProject != NULL) && (debuggerServer->GetType() == WEB_INSPECTOR_TYPE))
				{
					// Remove the chrome request handler
					VChromeDebugHandler *handler = dynamic_cast<VChromeDebugHandler*>(debuggerServer);
					assert(handler != NULL);
					fHTTPServerProject->RemoveWebSocketHandler( handler);
				}
			}
			fDebuggerType = UNKNOWN_DBG_TYPE;
		}
	}
	else
	{
		err = vThrowError( VE_RIA_DEBUGGER_NOT_HANDLED_BY_PROJECT);
	}

	return err;
}


VError VRIAServerProject::_StartDebugger()
{
	VError err = VE_OK;

	if (VRIAServerApplication::Get()->GetDebuggingAuthorized())
	{
		if (fOpeningParameters->GetHandlesDebuggerServer())
		{
			IRemoteDebuggerServer*	dbgrSrv = VJSGlobalContext::GetDebuggerServer();
			if (dbgrSrv)
				dbgrSrv->StartServer();
			else
				err = VE_UNKNOWN_ERROR;
		}
		else
		{
			err = vThrowError( VE_RIA_DEBUGGER_NOT_HANDLED_BY_PROJECT);
		}
	}
	else
	{
		err = vThrowError( VE_RIA_DEBUGGING_NOT_AUTHORIZED);
	}

	return err;
}


VError VRIAServerProject::_StopDebugger()
{
	VError err = VE_OK;

	if (fOpeningParameters->GetHandlesDebuggerServer())
	{
		IRemoteDebuggerServer*	dbgrSrv = VJSGlobalContext::GetDebuggerServer();
		if (dbgrSrv)
			dbgrSrv->StopServer();
		else
			err = VE_UNKNOWN_ERROR;
	}
	else
	{
		err = vThrowError( VE_RIA_DEBUGGER_NOT_HANDLED_BY_PROJECT);
	}

	return err;
}


VError VRIAServerProject::SetBreakpoint(VRIAContext* inContext, const XBOX::VString& inUrl, sLONG inLineNb)
{
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		if (fSolution != NULL)
			fSolution->AddBreakpoint(inUrl,inLineNb);
	#if WITH_SANDBOXED_PROJECT
		else if (fState.sandboxed && CanHandlesDebuggerServer() && (fWAKBreakpointsManager != NULL))
			fWAKBreakpointsManager->AddBreakPoint( inUrl, inLineNb);
	#endif
		else
			err = vThrowError( VE_RIA_CANNOT_ADD_BREAKPOINT);
		context->Release();
	}
	else
	{
		err = vThrowError( VE_RIA_INVALID_CONTEXT);
	}

	return err;
}

VError VRIAServerProject::RemoveAllBreakpoints(VRIAContext* inContext, const XBOX::VString& inUrl )
{
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		if (fSolution != NULL)
			fSolution->RemoveAllBreakpoints(inUrl);
	#if WITH_SANDBOXED_PROJECT
		else if (fState.sandboxed && CanHandlesDebuggerServer() && (fWAKBreakpointsManager != NULL))
			fWAKBreakpointsManager->RemoveAllBreakPoints( inUrl );
	#endif
		else
			err = vThrowError( VE_RIA_CANNOT_REMOVE_BREAKPOINT);
		context->Release();
	}
	else
	{
		err = vThrowError( VE_RIA_INVALID_CONTEXT);
	}

	return err;
}

VError VRIAServerProject::RemoveBreakpoint(VRIAContext* inContext, const XBOX::VString& inUrl, sLONG inLineNb)
{
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		if (fSolution != NULL)
			fSolution->RemoveBreakpoint(inUrl,inLineNb);
	#if WITH_SANDBOXED_PROJECT
		else if (fState.sandboxed && CanHandlesDebuggerServer() && (fWAKBreakpointsManager != NULL))
			fWAKBreakpointsManager->RemoveBreakPoint( inUrl, inLineNb);
	#endif
		else
			err = vThrowError( VE_RIA_CANNOT_REMOVE_BREAKPOINT);
		context->Release();
	}
	else
	{
		err = vThrowError( VE_RIA_INVALID_CONTEXT);
	}

	return err;
}


VError VRIAServerProject::GetBreakpoints( VRIAContext* inContext, const XBOX::VJSContext& inJSContext, XBOX::VJSArray& ioBreakpoints)
{
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		std::set< VRemoteDebuggerBreakpointsManager::VFileBreakpoints >	tmpBrkpts;

		if (fSolution != NULL)
			fSolution->GetBreakpoints(tmpBrkpts);
	#if WITH_SANDBOXED_PROJECT
		else if (fState.sandboxed && CanHandlesDebuggerServer() && (fWAKBreakpointsManager != NULL))
			fWAKBreakpointsManager->GetBreakpoints( tmpBrkpts);
	#endif
		else
			err = vThrowError( VE_RIA_CANNOT_GET_BREAKPOINTS);

		if (err == VE_OK)
		{
			std::set< VRemoteDebuggerBreakpointsManager::VFileBreakpoints >::iterator	itBrkpt = tmpBrkpts.begin();
			while ( itBrkpt != tmpBrkpts.end() )
			{
				std::set< unsigned >::iterator	itLines = (*itBrkpt).fBreakpoints.begin();

				while (itLines != (*itBrkpt).fBreakpoints.end())
				{
					VJSObject	bkp1( inJSContext);
					bkp1.MakeEmpty();
					bkp1.SetProperty( "file", (*itBrkpt).fUrl );
					bkp1.SetProperty( "line", (sLONG) *itLines );
					bkp1.SetProperty( "enabled", true );
					ioBreakpoints.PushValue( bkp1 );
					itLines++;
				}
				itBrkpt++;
			}
		}

		context->Release();
	}
	else
	{
		err = vThrowError( VE_RIA_INVALID_CONTEXT);
	}

	return err;
}


IJSRuntimeDelegate* VRIAServerProject::GetRuntimeDelegate()
{
	return fJSRuntimeDelegate;
}


VError VRIAServerProject::InitializeJSContext( VJSGlobalContext* inContext)
{
	VError err = VE_OK;

	if (inContext != NULL)
	{
		err = VRIAJSRuntimeContext::InitializeJSContext( inContext, this);
		if (err == VE_OK)
		{
			VJSContext jsContext( inContext);
			VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
			if (rtContext != NULL)
			{
				VJSObject globalObject( jsContext.GetGlobalObject());

				// Append the application property to the global object. The application property references the global object.
				VJSObject jsApplication(globalObject);
				globalObject.SetProperty( kSSJS_PROPERTY_NAME_Application, jsApplication, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete, NULL);

				if (fSolution != NULL)
				{
					// sc 16/01/2014, to ensure having only one VJSSolution instance, we append the solution object to the global object here
					VJSObject jsSolution( VJSSolution::CreateInstance( jsContext, fSolution));
					globalObject.SetProperty( kSSJS_PROPERTY_NAME_Solution, jsSolution, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete, NULL);
				}

				// Append the database object to the global object
				VRIAContext *riaContext = rtContext->GetApplicationContext( this);
				if (riaContext != NULL)
				{
					CDB4DBaseContext *baseContext = (riaContext != NULL) ? riaContext->GetBaseContext() : NULL;
					CDB4DManager *db4d = VRIAServerApplication::Get()->GetComponentDB4D();
					if (db4d != NULL && baseContext != NULL)
					{
						VJSObject jsDatabase = db4d->CreateJSDatabaseObject( jsContext, baseContext);
												
						// globalObject.SetProperty( kSSJS_PROPERTY_NAME_Database, jsDatabase, JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete, NULL);
						globalObject.SetProperty( kSSJS_PROPERTY_NAME_DataStore, jsDatabase, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete, NULL);
						
						std::vector<VFile*> modelFiles;
						db4d->InitJSContextWithEntityModels(globalObject, baseContext, this, modelFiles);
						VJSGlobalObject *xglobalObject = jsContext.GetGlobalObjectPrivateInstance();
						for (std::vector<VFile*>::iterator cur = modelFiles.begin(), end = modelFiles.end(); cur != end; ++cur)
						{
							VFile* file = *cur;
							if (testAssert(xglobalObject != NULL))
								xglobalObject->RegisterIncludedFile(file);
							file->Release();
						}
					}
				}

				// Add the syntax engine tester to the global object
				CLanguageSyntaxComponent *languageSyntax = VComponentManager::RetainComponentOfType< CLanguageSyntaxComponent >();
				if (languageSyntax) {
					VJSObject syntaxTester(languageSyntax->CreateJavaScriptTestObject( jsContext ));
					globalObject.SetProperty( CVSTR( "_syntaxTester" ), syntaxTester, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete, NULL);
					languageSyntax->Release();
				}
			}
		}
	}
	return err;
}


VError VRIAServerProject::UninitializeJSContext( VJSGlobalContext* inContext)
{
	VError err = VE_OK;
	
	if (inContext != NULL)
	{
		err = VRIAJSRuntimeContext::UninitializeJSContext( inContext);
	}
	return err;
}


VError VRIAServerProject::_Open( VProject* inDesignProject, VRIAServerProjectOpeningParameters *inOpeningParameters, CUAGDirectory* inUAGDirectory)
{
	if (fState.opened)
		return VE_OK;
	
	VError err = VE_OK;

	if (!testAssert(fDesignProject == NULL))
		err = VE_UNKNOWN_ERROR;

	if (err == VE_OK && inDesignProject == NULL)
		err = vThrowError( VE_RIA_INVALID_DESIGN_PROJECT);

	if (err == VE_OK)
	{
		fDesignProject = inDesignProject;
		fDesignProject->Retain();
		fDesignProject->GetName( fName);
	}

	if (err == VE_OK)
	{
		CopyRefCountable( &fOpeningParameters, inOpeningParameters);
		if (fOpeningParameters == NULL)
		{
			fOpeningParameters = new VRIAServerProjectOpeningParameters();
			if (fOpeningParameters == NULL)
				err = vThrowError( VE_MEMORY_FULL);
		}
	}

	if (err == VE_OK)
	{
		fState.inMaintenance = (fOpeningParameters->GetOpeningMode() & ePOM_FOR_MAINTENANCE) != 0;
		fState.sandboxed = (fOpeningParameters->GetOpeningMode() & ePOM_SANDBOXED) != 0;

		if (fSolution != NULL)
		{
			VString solutionName;
			fSolution->GetName( solutionName);
			fLoggerID = VRIAServerApplication::Get()->GetLogSourceIdentifier() + L"." + solutionName + L"." + fName;
		}
	#if WITH_SANDBOXED_PROJECT
		else if (fState.sandboxed)
		{
			fLoggerID = VRIAServerApplication::Get()->GetLogSourceIdentifier() + L"." + fName;
		}
	#endif

		StTaskPropertiesSetter stTaskProps( &fLoggerID);

		if (err == VE_OK || fState.inMaintenance)
		{
			// load file system definition files
			err = _LoadFileSystemDefinitions();
		}

		if (err == VE_OK || fState.inMaintenance)
		{
			// load system worker definition file
			err = _LoadSystemWorkerDefinitions ( );
		}

		// Load all available settings files
		if (err == VE_OK || fState.inMaintenance)
		{
			err = _LoadSettingsFile();
			if (err != VE_OK)
				err = vThrowError( VE_RIA_CANNOT_LOAD_SETTINGS_FILES);
		}

	#if WITH_SANDBOXED_PROJECT
		if (err == VE_OK && fState.sandboxed && !fState.inMaintenance)
		{
			// Create a log messages listener
			VFolder *logFolder = RetainLogFolder( true);
			if (logFolder != NULL)
			{
				fLogListener = new VProjectLogListener( *logFolder,  L"log", fLoggerID);
				if (fLogListener == NULL)
					err = vThrowError( VE_MEMORY_FULL);
				else
					VProcess::Get()->GetLogger()->AddLogListener( fLogListener);				

				if (err == VE_OK)
				{
					VString lMsg;
					lMsg.Printf( "The log file of \"%S\" project will be stored in the \"%S\" folder\n\n", &fName, &logFolder->GetPath().GetPath());
					fputs_VString( lMsg, stdout);
				}

				logFolder->Release();
			}
			else
			{
				err = vThrowError( VE_RIA_LOG_FOLDER_NOT_FOUND);
			}
		}

		if (err == VE_OK && fState.sandboxed && !fState.inMaintenance)
		{
			fUAGDirectory = RetainRefCountable( inUAGDirectory);
			if ((fUAGDirectory == NULL) && !fState.inMaintenance)
			{
				fUAGDirectory = _OpenUAGDirectory( err);
			}
		}
	#endif

		if (err == VE_OK || fState.inMaintenance)
		{
			fPermissions = _LoadPermissionFile( err);
			if  (err != VE_OK)
				err = vThrowError( VE_RIA_CANNOT_LOAD_PERMISSIONS);
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			fSessionMgr = new VRIAHTTPSessionManager();
			if (fSessionMgr == NULL)
				err = vThrowError( VE_MEMORY_FULL);
		}

		if (err == VE_OK || fState.inMaintenance)
		{
			fContextMgr = new VRIAContextManager( this);
			if (fContextMgr == NULL)
				err = vThrowError( VE_MEMORY_FULL);
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			fJSRuntimeDelegate = new VRIAServerProjectJSRuntimeDelegate( this);
			if (fJSRuntimeDelegate == NULL)
				err = vThrowError( VE_MEMORY_FULL);
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			fJSContextPool = VRIAServerApplication::Get()->GetJSContextMgr()->CreateJSContextPool( err, this);
			if ((err == VE_OK) && (fJSContextPool != NULL))
			{
				fJSContextPool->SetEnabled( false);
				fJSContextPool->SetContextReusingEnabled ( fSettings.GetReuseJavaScriptContexts());
				fJSContextPool->SetSize( fSettings.GetContextPoolSize());

				// Get the required script: required script will be included into each JavaScript context
				VProjectItem *item = fDesignProject->GetProjectItem();
				if (item != NULL)
				{
					VFilePath path;
					item->GetFilePath( path);
					path = path.ToFolder();
					path.ToSubFolder( L"Scripts");
					path.SetFileName( L"required", false);
					path.SetExtension( L"js");

					VFile file( path);
					if (file.Exists())
					{
						fJSContextPool->AppendRequiredScript( path);
					}
				}

				VFilePath requiredPath;
				VRIAServerApplication::Get()->GetWAFrameworkFolderPath( requiredPath);
				requiredPath.ToSubFolder( L"Core");
				requiredPath.ToSubFolder( L"Runtime");
				requiredPath.SetFileName( L"required");
				requiredPath.SetExtension( L"js");
				VFile requiredFile( requiredPath);
				if (requiredFile.Exists())
				{
					fJSContextPool->AppendRequiredScript( requiredPath);
				}

				// sc 18/06/2012, append solution required file
				VSolution *designSolution = fDesignProject->GetSolution();
				if (designSolution != NULL)
				{
					VFilePath solRequiredPath;
					if (designSolution->GetSolutionFolderPath( solRequiredPath))
					{
						solRequiredPath.SetFileName( L"required.js");

						VFile solRequiredFile( solRequiredPath);
						if (solRequiredFile.Exists())
							fJSContextPool->AppendRequiredScript( solRequiredPath);
					}
				}
			}
			else
			{
				err = vThrowError( VE_MEMORY_FULL);
			}
		}

		if (err == VE_OK || fState.inMaintenance)
		{
			// Instantiate the Security Manager
			fSecurityManager = (CSecurityManager*)VComponentManager::RetainUniqueComponent(CSecurityManager::Component_Type);
			if (fSecurityManager != NULL)
			{
				// Performe some optional init
				VError lError = VE_OK;
				CUAGDirectory *uagDirectory = RetainUAGDirectory( NULL);

				fSecurityManager->SetUserDirectory( uagDirectory);

				VFilePath path( L"c:\\keytab");
				VFile file( path);
				if (file.Exists())
				{
					lError = fSecurityManager->SetKerberosConfig("srvdev", "c:\\keytab");	//jmo - todo : parametrer ca !
				}

				//err=fSecurityManager->SetKerberosConfig("I7-64B-RD-11.private.4d.fr", "C:\\keytab");
				//err=fSecurityManager->SetKerberosConfig("I7-64B-RD-11", "C:\\keytab");

				ReleaseRefCountable( &uagDirectory);
			}
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			// Open the database
			fDatabase = _OpenDatabase( err);
			if (err != VE_OK)
				err = vThrowError( VE_RIA_CANNOT_OPEN_DATABASE);
			else if (fDatabase != NULL)
				LogMessage( fLoggerID, eL4JML_Information, L"Datastore opened");
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			// A project which has none preferences is taken as a library project. So, none servers or services is launched.
			if (fSettings.HasProjectSettings())
			{
				// Instanciate the HTTP Server Project
				CHTTPServer *httpServer = VRIAServerApplication::Get()->GetComponentHTTP();
				if (httpServer != NULL)
				{
					XBOX::VFilePath projectFolderPath;
					fDesignProject->GetProjectFolderPath( projectFolderPath);

					// Build a resources settings bag
					VValueBag resourcesSettings;
					VBagArray *bagArray = fSettings.RetainMultipleSettings( RIASettingID::resources);
					if (bagArray != NULL)
					{
						resourcesSettings.SetElements( RIASettingID::resources, bagArray);
						ReleaseRefCountable( &bagArray);
					}

					fHTTPServerProject = httpServer->NewHTTPServerProject (fFileSystemNamespace);
					if (fHTTPServerProject != NULL)
					{
						// Update the settings
						IHTTPServerProjectSettings *httpServerSettings = fHTTPServerProject->GetSettings();
						if (httpServerSettings != NULL)
						{
							VString strValue;
							
							fSettings.GetListeningAddress( strValue);
							httpServerSettings->SetListeningAddress( strValue);

							sLONG httpPort = -1, sslPort = -1;
							if (fOpeningParameters->GetCustomHttpPort( httpPort))
							{
								// Use the custom http port
								httpServerSettings->SetListeningPort( httpPort);
							}
							else
							{
								httpServerSettings->SetListeningPort( fSettings.GetListeningPort());
							}

							httpServerSettings->SetSSLMandatory( fSettings.GetSSLMandatory());
							httpServerSettings->SetAllowHTTPOnLocal( fSettings.GetAllowHTTPOnLocal());

							if (fOpeningParameters->GetCustomSSLPort( sslPort))
							{
								// Use the custom ssl port
								httpServerSettings->SetListeningSSLPort( sslPort);
							}
							else
							{
								httpServerSettings->SetListeningSSLPort( fSettings.GetListeningSSLPort());
							}

							VFilePath sslCertificatePath;
							VValueBag *httpSettings = fSettings.RetainSettings( RIASettingID::http);
							if (httpSettings->GetString( RIASettingsKeys::HTTP::SSLCertificatePath, strValue))
							{
								sslCertificatePath.FromRelativePath( projectFolderPath, strValue, FPS_POSIX);
							}
							else
							{
								VProjectItem *certificatesFolder = fDesignProject->GetProjectItemFromTag( kProjectCertificatesFolderTag);
								if ((certificatesFolder == NULL) && (fDesignProject->GetSolution() != NULL))
									certificatesFolder = fDesignProject->GetSolution()->GetProjectItemFromTag( kSolutionCertificatesFolderTag);
								
								if (certificatesFolder != NULL)
									certificatesFolder->GetFilePath( sslCertificatePath);
							}
							httpServerSettings->SetSSLCertificatesFolderPath( sslCertificatePath);
							ReleaseRefCountable( &httpSettings);

							
							bool allowSSL = false;
							if (fSettings.GetAllowSSL() && sslCertificatePath.IsValid() && sslCertificatePath.IsFolder())	// sc 23/02/2012 check for "allowSSL" settings
							{
								VFolder sslCertificateFolder( sslCertificatePath);
								if (sslCertificateFolder.Exists())
									allowSSL = true;
							}
							httpServerSettings->SetAllowSSL(allowSSL);
							
							VProjectItem *webFolder = fDesignProject->GetProjectItemFromTag( kWebFolderTag);
							if (webFolder != NULL)
							{
								VFilePath webFolderPath;
								if (webFolder->GetFilePath( webFolderPath))
									httpServerSettings->SetWebFolderPath( webFolderPath);
							}

							fSettings.GetHostName( strValue);
							httpServerSettings->SetHostName( strValue);

							if (!fOpeningParameters->GetCustomAuthenticationType( strValue) && (fSolution != NULL))
								fSolution->GetSettings().GetAuthenticationType( strValue);
							httpServerSettings->SetDefaultAuthType( strValue);

							// Cache settings
							httpServerSettings->SetEnableCache( fSettings.GetUseCache());
							httpServerSettings->SetCacheMaxSize( fSettings.GetCacheMaxSize());
							httpServerSettings->SetCachedObjectMaxSize( fSettings.GetCachedObjectMaxSize());

							// Compression settings
							httpServerSettings->SetEnableCompression( fSettings.GetAllowCompression());
							httpServerSettings->SetCompressionMinThreshold( fSettings.GetCompressionMinThreshold());
							httpServerSettings->SetCompressionMaxThreshold( fSettings.GetCompressionMaxThreshold());

							// Keep-Alive settings
							httpServerSettings->SetEnableKeepAlive( fSettings.GetAcceptKeepAliveConnections());
							/* Temporary disable theses settings loading... because of a bug with long timeout values
							httpServerSettings->SetKeepAliveTimeout( fSettings.GetKeepAliveTimeOut());
							httpServerSettings->SetKeepAliveMaxConnections( fSettings.GetKeepAliveMaxConnections()); */

							// Log settings
							VectorOfVString logTokens;
							fSettings.GetLogFormat( strValue);
							fSettings.GetLogTokens( logTokens);
							httpServerSettings->SetLogFormat( strValue, logTokens);
							fSettings.GetLogFolderPath( strValue);
							fDesignProject->ResolvePosixPathMacros( strValue);
							VFilePath logFolderPath( projectFolderPath, strValue, FPS_POSIX);
							httpServerSettings->SetLogFolderPath( logFolderPath);
							fSettings.GetLogFileName( strValue);
							httpServerSettings->SetLogFileName( strValue);
							httpServerSettings->SetLogMaxSize( fSettings.GetLogMaxSize());


							//----------------------------------------------------------------------
							// VRoutingPreProcessingHandler

							XBOX::VFilePath path;
							bool found = _FindExistingFileInProjectHierarchy (this, CVSTR ("targets.json"), path);

							if (found)
							{
								IPreProcessingHandler *routingProcessingHandler = new VRoutingPreProcessingHandler (path);
								if (NULL != routingProcessingHandler)
									fHTTPServerProject->AddPreProcessingHandler (routingProcessingHandler);
								XBOX::ReleaseRefCountable (&routingProcessingHandler);
							}

							/*
							 *	Load Resources from resources.json file
							 */
							XBOX::VFilePath resourcesJSONFilePath;
							bool resourcesJSONfound = _FindExistingFileInProjectHierarchy (this, CVSTR ("resources.json"), resourcesJSONFilePath);

							// Virtual Folders settings
							if (resourcesJSONfound)
							{
								httpServerSettings->LoadVirtualFoldersSettingsFromJSONFile (resourcesJSONFilePath);
							}
							else
							{
								VValueBag virtualFoldersSettings;
								bagArray = fSettings.RetainMultipleSettings( RIASettingID::virtualFolder);
								if (bagArray != NULL)
								{
									virtualFoldersSettings.SetElements( RIASettingID::virtualFolder, bagArray);
									ReleaseRefCountable( &bagArray);
								}
								httpServerSettings->LoadVirtualFoldersSettingsFromBag( virtualFoldersSettings);
							}


							if (resourcesJSONfound)
								httpServerSettings->LoadResourcesSettingsFromJSONFile (resourcesJSONFilePath);
							/*
							 *	Keep loading resources from settings for backward compatibility ?!?!
							 *	Anyway, I think it is not much used...
							 */
							else
								httpServerSettings->LoadResourcesSettingsFromBag (resourcesSettings);


							// Authentication Manager settings
							IAuthenticationManager *authenticationMgr = fHTTPServerProject->GetAuthenticationManager();
							if (authenticationMgr != NULL)
							{
								IAuthenticationReferee *authenticationReferee = authenticationMgr->GetAuthenticationReferee();
								if (authenticationReferee != NULL)
								{
									if (resourcesJSONfound)
										authenticationReferee->LoadFromJSONFile (resourcesJSONFilePath);
									else
										authenticationReferee->LoadFromBag( &resourcesSettings);
								}
							}
						}

						VAuthenticationDelegate *authenticationDelegate = new VAuthenticationDelegate( this);
						fHTTPServerProject->SetAuthenticationDelegate( authenticationDelegate);
						ReleaseRefCountable( &authenticationDelegate);

						if (fSecurityManager != NULL)
						{
							// The server will need a ptr to the Security Manager to handle request authentication
							fHTTPServerProject->SetSecurityManager (fSecurityManager);
						}


						if (httpServerSettings && VRIAServerApplication::Get()->GetDebuggingAuthorized() && fOpeningParameters->GetHandlesDebuggerServer())
						{
							// Install a virtual fodler for the JavaScript debugger
							VFolder *resourcesFolder = VRIAServerApplication::Get()->RetainApplicationResourcesFolder();
							if (resourcesFolder != NULL)
							{
								VFilePath virtualFolderPath( resourcesFolder->GetPath());
								virtualFolderPath.ToSubFolder( L"debugger").ToSubFolder( L"chromium");

								VFolder virtualFolder( virtualFolderPath);
								if (virtualFolder.Exists())
								{
									fHTTPServerProject->AddVirtualFolder( virtualFolderPath.GetPath(), L"index.html", L"wka_dbg");
								}

							}
							ReleaseRefCountable( &resourcesFolder);
						}
					}
					else
					{
						err = vThrowError (VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);
					}

					// Cache Manager settings
					ICacheManager *cacheManager = httpServer->GetCacheManager();
					if (cacheManager != NULL)
					{
						cacheManager->LoadRulesFromBag( &resourcesSettings);
					}

					/* Set Server Signature such as ProductName/MajorVers.MinorVers build branch.buildNumber (Platform-BuildArch)
					 * Example: Server: Wakanda/2.0 build 2.123456 (Windows-x64)
					 */
					static bool sServerSignatureDefined = false;
					if (!sServerSignatureDefined)
					{
						XBOX::VString	versionString;
						XBOX::VProcess::Get()->GetProductVersion (versionString);
						httpServer->SetServerInformations ("Wakanda", versionString, true);
						sServerSignatureDefined = true;
					}
				}
				else
				{
					err = vThrowError (VE_RIA_HTTP_SERVER_NOT_FOUND);
				}
			}
		}


		if (err == VE_OK && fHTTPServerProject != NULL)
			err = fHTTPServerProject->Validate();

		if (err == VE_OK && !fState.inMaintenance)
		{
			fRPCService = new VRPCService( this, fHTTPServerProject);
			if (fRPCService == NULL)
				err = vThrowError( VE_MEMORY_FULL);
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			fDataService = new VDataService( this, fHTTPServerProject);
			if (fDataService != NULL)
			{
				fDataService->SetDatabase( fDatabase);
			}
			else
			{
				err = vThrowError( VE_MEMORY_FULL);
			}
		}

		if (err == VE_OK || fState.inMaintenance)
		{
			fContextCreationEnabled = true;
		}

		if (err == VE_OK || fState.inMaintenance) {
			
			if ((fApplicationStorage = new VJSSessionStorageObject()) == NULL)
			
				err = vThrowError(XBOX::VE_MEMORY_FULL);
							
			else if ((fApplicationSettings = new VJSSessionStorageObject()) == NULL) {
				
				ReleaseRefCountable( &fApplicationStorage);
				
				err = vThrowError(XBOX::VE_MEMORY_FULL);	
			}
		}

		if (err == VE_OK || fState.inMaintenance)
		{
			// Fill the settings "storage" object

			// Project settings
			const VValueBag *bag = fSettings.RetainSettings( RIASettingID::project);
			if (bag != NULL)
				fApplicationSettings->SetKeyVValueBag( L"project", *bag);
			ReleaseRefCountable( &bag);


			// HTTP Server settings
			bag = fSettings.RetainSettings( RIASettingID::http);
			if (bag != NULL)
				fApplicationSettings->SetKeyVValueBag( L"http", *bag);
			ReleaseRefCountable( &bag);


			// JavaScript settings
			bag = fSettings.RetainSettings( RIASettingID::javaScript);
			if (bag != NULL)
				fApplicationSettings->SetKeyVValueBag( L"javaScript", *bag);
			ReleaseRefCountable( &bag);


			// Resources settings array
			const VBagArray *bagArray = fSettings.RetainMultipleSettings( RIASettingID::resources);
			if (bagArray != NULL)
				fApplicationSettings->SetKeyVBagArray( L"resources", *bagArray, false);
			ReleaseRefCountable( &bagArray);


			// Virtual Folders settings array
			bagArray = fSettings.RetainMultipleSettings (RIASettingID::virtualFolder);
			if (bagArray != NULL)
				fApplicationSettings->SetKeyVBagArray (L"virtualFolder", *bagArray, false);
			ReleaseRefCountable (&bagArray);

			// Services settings
			VValueBag servicesSettingsBag;
			bagArray = fSettings.RetainServicesSettings();
			if (bagArray != NULL)
			{
				VIndex servicesCount = bagArray->GetCount();
				for (VIndex serviceIter = 1 ; serviceIter <= servicesCount ; ++serviceIter)
				{
					const VValueBag *serviceBag = bagArray->GetNth( serviceIter);
					if (serviceBag != NULL)
					{
						if (RIASettingsKeys::Service::enabled.Get( serviceBag))
						{
							VValueBag *lBag = serviceBag->Clone();
							if (lBag != NULL)
							{
								VString modulePath, serviceName;
								if (!lBag->GetString( RIASettingsKeys::Service::modulePath, modulePath) && lBag->GetString( RIASettingsKeys::Service::name, serviceName))
								{
									if (!serviceName.IsEmpty())
									{
										// compatibility note: the module path, if not defined, is built from the service name
										modulePath = L"services/" + serviceName;
										lBag->SetString( RIASettingsKeys::Service::modulePath, modulePath);
									}
								}

								if (!modulePath.IsEmpty())
								{
									if (!lBag->GetString( RIASettingsKeys::Service::name, serviceName))
									{
										// resolve the service name from the module path
										VFilePath path( modulePath, FPS_POSIX);
										if (path.IsFile())
											path.GetFileName( serviceName, false);
										else if (path.IsFolder())
											path.GetFolderName( serviceName, false);

										if (!serviceName.IsEmpty())
											lBag->SetString( RIASettingsKeys::Service::name, serviceName);
									}

									if (!serviceName.IsEmpty())
									{
										if (servicesSettingsBag.GetElementsCount( VValueBag::StKey(serviceName)) == 0)
											servicesSettingsBag.AddElement( VValueBag::StKey(serviceName), lBag);
									}
								}
								ReleaseRefCountable( &lBag);
							}
						}
					}
				}
			}
			ReleaseRefCountable( &bagArray);

			// By default, if a database is opened, the "dataStore" service is enabled, even if none settings have been found
			if (!fSettings.HasServiceSettings( L"dataStore"))
			{
				bool autoStart = (fDatabase != NULL);

				// Try to convert the deprecated "dataService" settings into "dataStore" service settings 
				VValueBag *dataServiceBag = fSettings.RetainSettings( RIASettingID::dataService);
				if (dataServiceBag != NULL)
				{
					autoStart = RIASettingsKeys::DataService::enabled.Get( dataServiceBag);
					ReleaseRefCountable( &dataServiceBag);
				}

				VValueBag *serviceBag = new VValueBag();
				if (serviceBag != NULL)
				{
					serviceBag->SetString( RIASettingsKeys::Service::name, L"dataStore");
					serviceBag->SetString( RIASettingsKeys::Service::modulePath, L"services/dataStore");
					serviceBag->SetString( VValueBag::StKey( L"autoStart"), autoStart ? L"true" : L"false");
					servicesSettingsBag.AddElement( VValueBag::StKey( L"dataStore"), serviceBag);
					ReleaseRefCountable( &serviceBag);
				}
			}

			// By default, the "rpc" service is enabled, even if none settings have been found
			if (!fSettings.HasServiceSettings( L"rpc"))
			{
				bool autoStart = true;
				bool publishInClientGlobalNamespace = false;

				// Tr yto convert the deprecated "rpcService" settings into "rpc" service settings
				VValueBag *rpcServiceBag = fSettings.RetainSettings( RIASettingID::rpcService);
				if (rpcServiceBag != NULL)
				{
					autoStart = RIASettingsKeys::RPCService::enabled.Get( rpcServiceBag);
					publishInClientGlobalNamespace = RIASettingsKeys::RPCService::publishInClientGlobalNamespace.Get( rpcServiceBag);
					ReleaseRefCountable( &rpcServiceBag);
				}

				VValueBag *serviceBag = new VValueBag();
				if (serviceBag != NULL)
				{
					serviceBag->SetString( RIASettingsKeys::Service::name, L"rpc");
					serviceBag->SetString( RIASettingsKeys::Service::modulePath, L"services/rpc");
					serviceBag->SetString( VValueBag::StKey( L"autoStart"), autoStart ? L"true" : L"false");
					serviceBag->SetString( VValueBag::StKey( L"publishInClientGlobalNamespace"), publishInClientGlobalNamespace ? L"true" : L"false");
					servicesSettingsBag.AddElement( VValueBag::StKey( L"rpc"), serviceBag);
					ReleaseRefCountable( &serviceBag);
				}
			}

			// By default, the "webApp" service is enabled, even if none settings have been found
			if (!fSettings.HasServiceSettings( L"webApp"))
			{
				bool autoStart = true;

				// Try to convert the deprecated "webApp" settings into "webApp" service settings
				VValueBag *webAppServiceBag = fSettings.RetainSettings( RIASettingID::webApp);
				if (webAppServiceBag != NULL)
				{
					autoStart = RIASettingsKeys::WebApp::enabled.Get( webAppServiceBag);
					ReleaseRefCountable( &webAppServiceBag);
				}

				VValueBag *serviceBag = new VValueBag();
				if (serviceBag != NULL)
				{
					serviceBag->SetString( RIASettingsKeys::Service::name, L"webApp");
					serviceBag->SetString( RIASettingsKeys::Service::modulePath, L"services/webApp");
					serviceBag->SetString( VValueBag::StKey( L"autoStart"), autoStart ? L"true" : L"false");
					servicesSettingsBag.AddElement( VValueBag::StKey( L"webApp"), serviceBag);
					ReleaseRefCountable( &serviceBag);
				}
			}

			// By default, the "upload" service is enabled, even if none settings have been found
			if (!fSettings.HasServiceSettings( L"upload"))
			{
				VValueBag *serviceBag = new VValueBag();
				if (serviceBag != NULL)
				{
					serviceBag->SetString( RIASettingsKeys::Service::name, L"upload");
					serviceBag->SetString( RIASettingsKeys::Service::modulePath, L"services/upload");
					serviceBag->SetString( VValueBag::StKey( L"autoStart"), L"true");
					servicesSettingsBag.AddElement( VValueBag::StKey( L"upload"), serviceBag);
					ReleaseRefCountable( &serviceBag);
				}
			}

			// By default, the "Builder handler" service is enabled, even if none settings have been found
			if (!fSettings.HasServiceSettings( L"Builder handler"))
			{
				VValueBag *serviceBag = new VValueBag();
				if (serviceBag != NULL)
				{
					serviceBag->SetString( RIASettingsKeys::Service::name, CVSTR( "Builder handler"));
					serviceBag->SetString( RIASettingsKeys::Service::modulePath, CVSTR( "services/builder-service"));
					serviceBag->SetString( "autoStart", CVSTR( "true"));
					servicesSettingsBag.AddElement( "Builder handler", serviceBag);
					ReleaseRefCountable( &serviceBag);
				}
			}
			
			fApplicationSettings->SetKeyVValueBag( L"services", servicesSettingsBag);
		}

	#if WITH_SANDBOXED_PROJECT
		if (err == VE_OK && CanHandlesDebuggerServer() && fState.sandboxed && !fState.inMaintenance)
		{
			VFilePath breakpointsFolder, sourcesRoot;
			fOpeningParameters->GetBreakpointsFolderPath( breakpointsFolder);
			fOpeningParameters->GetDebuggerSourcesRootPath( sourcesRoot);

			if (!breakpointsFolder.IsEmpty() && breakpointsFolder.IsValid() && !sourcesRoot.IsEmpty() && sourcesRoot.IsValid())
			{
				VString posixSourcesRoot;
				sourcesRoot.GetPosixPath( posixSourcesRoot);
				fWAKBreakpointsManager = new VRemoteDebuggerBreakpointsManager( posixSourcesRoot);
				if (fWAKBreakpointsManager != NULL)
				{
					fWAKBreakpointsManager->SetBreakpointsFolderPath( breakpointsFolder);
					fWAKBreakpointsManager->Load();

					fDebuggerSettings = new VJSDebuggerSettings( this, fWAKBreakpointsManager);
					if (fDebuggerSettings != NULL)
					{
						err = fDebuggerSettings->Init();
						if (err == VE_OK)
						{
							JSWDebuggerFactory		fctry;
							IRemoteDebuggerServer*	jswDebugger = fctry.Get();
							IRemoteDebuggerServer*	chrDbgr = fctry.GetChromeDebugHandler( fName);

							if (jswDebugger != NULL)
								jswDebugger->SetSettings( fDebuggerSettings);

							VChromeDebugHandler::StaticSetSettings( fDebuggerSettings);
						}
					}
					else
					{
						err = vThrowError( VE_MEMORY_FULL);
					}
				}
				else
				{
					err = vThrowError( VE_MEMORY_FULL);
				}
			}
			else
			{
				err = VE_UNKNOWN_ERROR;
			}

			if (err != VE_OK)
				err = vThrowError( VE_RIA_CANNOT_INIT_DEBUGGER);
		}
	#endif

		if (err == VE_OK)
			LogMessage( fLoggerID, eL4JML_Information, L"\"" + fName + "\" project opened");
		else
			LogMessage( fLoggerID, eL4JML_Warning, L"\"" + fName + "\" project opened with errors");
	}

	fState.opened = true;

	return err;
}


VError VRIAServerProject::_LoadFileSystemDefinitions()
{
	VError err = VE_OK;
	
	// link project namespace to solution one
	if (testAssert( fFileSystemNamespace == NULL))
	{
		if (GetSolution() != NULL)
			fFileSystemNamespace = new VFileSystemNamespace( GetSolution()->GetFileSystemNamespace());
		else
			fFileSystemNamespace = new VFileSystemNamespace( VRIAServerApplication::Get()->GetFileSystemNamespace());
	}
	
	if (fFileSystemNamespace != NULL)
	{
	#if WITH_SANDBOXED_PROJECT
		// define CONFIGURATION file system
		VFilePath configurationPath = VRIAServerApplication::Get()->GetConfigurationFolderPath();
		if (configurationPath.IsValid() && configurationPath.IsFolder())
		{
			VFileSystem *fs = VFileSystem::Create( CVSTR( "CONFIGURATION"), configurationPath, eFSO_Default);
			fFileSystemNamespace->RegisterFileSystem( fs);
			ReleaseRefCountable( &fs);
		}
	#endif // WITH_SANDBOXED_PROJECT

		// define PROJECT file system
		VFilePath projectPath;
		if (testAssert( GetDesignProject()->GetProjectFolderPath( projectPath)))
		{
			VFileSystem *fs = VFileSystem::Create( CVSTR( "PROJECT"), projectPath, eFSO_Default);
			fFileSystemNamespace->RegisterFileSystem( fs);

			xbox_assert( fDesignProjectFolder == NULL);
			fDesignProjectFolder = new VFolder( projectPath, fs);

			ReleaseRefCountable( &fs);
		}

		// define WEBFOLDER file system
		VProjectItem *webFolder = fDesignProject->GetProjectItemFromTag( kWebFolderTag);
		if (webFolder != NULL)
		{
			VFilePath webFolderPath;
			if (webFolder->GetFilePath( webFolderPath))
				fFileSystemNamespace->RegisterFileSystem( CVSTR( "WEBFOLDER"), webFolderPath, eFSO_Default);
		}

		// define WIDGETS_CUSTOM file system if local to project
		VProjectItem* widgetsFolderItem = fDesignProject->GetProjectItemFromTag( kWidgetsFolderTag );
		if (widgetsFolderItem != NULL)
		{
			VFilePath path;
			if (widgetsFolderItem->GetFilePath( path))
				fFileSystemNamespace->RegisterFileSystem( CVSTR( "WIDGETS_CUSTOM"), path, eFSO_Default);
		}

		// define THEMES_CUSTOM file system if local to project
		VProjectItem* themesFolderItem = fDesignProject->GetProjectItemFromTag( kThemesFolderTag );
		if (themesFolderItem != NULL)
		{
			VFilePath path;
			if (themesFolderItem->GetFilePath( path))
				fFileSystemNamespace->RegisterFileSystem( CVSTR( "THEMES_CUSTOM"), path, eFSO_Default);
		}

		// read definition of user defined file systems
		VFile file( projectPath, CVSTR( "fileSystems.json"), FPS_POSIX);
		if (file.Exists())
			err = fFileSystemNamespace->LoadFromDefinitionFile( &file);
	}
	
	return err;
}


XBOX::VError VRIAServerProject::_LoadSystemWorkerDefinitions ( )
{
	VError					vError = VE_OK;
	
	if ( testAssert ( fSystemWorkerNamespace == NULL ) )
	{
		if ( GetSolution ( ) != NULL )
			fSystemWorkerNamespace = new VSystemWorkerNamespace ( GetSolution ( )-> GetSystemWorkerNamespace ( ) );
		else
			fSystemWorkerNamespace = new VSystemWorkerNamespace ( VRIAServerApplication::Get ( )-> GetSystemWorkerNamespace ( ) );
	}
	
	if ( fSystemWorkerNamespace != NULL)
	{
		// Read user defined file systems
		VFilePath			vfProjectPath;
		bool				bOK = GetDesignProject ( )-> GetProjectFolderPath( vfProjectPath );
		if ( testAssert ( bOK ) )
		{
			VFile			vflSysWorkers ( vfProjectPath, CVSTR ( "systemWorkers.json" ), FPS_POSIX );
			if ( vflSysWorkers. Exists ( ) )
				vError = fFileSystemNamespace->LoadFromDefinitionFile ( &vflSysWorkers );
		}
	}
	
	return vError;
}


VError VRIAServerProject::_LoadSettingsFile()
{
	VError err = VE_OK;

	if (testAssert(fDesignProject != NULL))
	{
		VectorOfProjectItems itemsVector;

		fDesignProject->GetProjectItemsFromTag( kSettingTag, itemsVector);
		for (VectorOfProjectItemsIterator iter = itemsVector.begin() ; iter != itemsVector.end() && err == VE_OK ; ++iter)
		{
			if (*iter != NULL)
			{
				VFilePath path;
				(*iter)->GetFilePath( path);
				err = fSettings.AppendAndLoadSettingsFile( path);
			}
		}
	}
	return err;	
}


VRIAPermissions* VRIAServerProject::_LoadPermissionFile( VError& outError)
{
	VRIAPermissions *permissions = NULL;

	outError = VE_OK;

	if (testAssert(fDesignProject != NULL))
	{
		VProjectItem *item = fDesignProject->GetProjectItemFromTag( kPermissionsTag);
		if (item != NULL)
		{
			VFilePath path;
			item->GetFilePath( path);

			permissions = new VRIAPermissions( path);
			if (permissions == NULL)
			{
				outError = vThrowError( VE_MEMORY_FULL);
			}
			else
			{
				outError = permissions->LoadPermissionFile();
				if (outError == VE_OK)
				{
					// sc 17/12/2013 WAK0077108
					CUAGDirectory *uagDirectory = RetainUAGDirectory( NULL);
					permissions->CheckGroupsValidity( uagDirectory);
					ReleaseRefCountable( &uagDirectory);
				}
			}
		}
	}

	return permissions;	
}


XBOX::VError VRIAServerProject::_LoadBackupSettings()
{
	XBOX::VError error = VE_OK;
	CDB4DManager *db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
	VFilePath baseFolder,backupFolder,backupRegistryFolder;

	//Retrieve folder with backup role
	const VProjectItem* backupsFolderItem = fDesignProject->GetProjectItemFromTag(kBackupsTag);
	if (backupsFolderItem)
	{
		backupsFolderItem->GetFilePath(backupRegistryFolder);
	}
	else
	{
		//Legacy projects: "Backups" role might not be declared so create the default 
		//"Backups" folder at project level
		XBOX::VFolder* fld = RetainFolder();
		fld->GetPath(backupRegistryFolder);
		backupRegistryFolder.ToSubFolder(CVSTR("Backups"));//MAGICAL
		xbox::ReleaseRefCountable(&fld);

		//Create folder on FS and refresh items in project so eventual calls to GetProjectItemFromTag() succeeds
		fld = new VFolder(backupRegistryFolder);
		if (!fld->Exists())
		{
			error = fld->CreateRecursive();
		}

		if (error == VE_OK)
		{
			error = fDesignProject->SynchronizeWithFileSystem(fDesignProject->GetProjectItem());
		}
		XBOX::ReleaseRefCountable(&fld);
	}

	fBackupSettings = db4dMgr->CreateBackupSettings();

	const VValueBag * backupSettingsBag = fSettings.RetainDatabaseBackupSettings();
	if (backupSettingsBag == NULL && fSolution != NULL)
	{
		const VSolutionSettings& solutionSettings = fSolution->GetSettings();
		backupSettingsBag = solutionSettings.RetainSettings(RIASettingID::backup);
	}

	//Safe settings defined by defaults
	fBackupSettings->SetDestination(backupRegistryFolder);
	fBackupSettings->SetUseUniqueNames(true);
	fBackupSettings->SetBackupRegistryFolder(backupRegistryFolder);
	fBackupSettings->SetMaxRetainedBackups(20);

	if (backupSettingsBag != NULL)
	{
		error = fBackupSettings->Initialize(*backupSettingsBag, backupRegistryFolder);
	}
	XBOX::ReleaseRefCountable(&backupSettingsBag);
	return error;
}


#if WITH_SANDBOXED_PROJECT
CUAGDirectory* VRIAServerProject::_OpenUAGDirectory( VError& outError)
{
	outError = VE_OK;

	CUAGDirectory *directory = nil;

	CUAGManager *uag = VComponentManager::RetainComponentOfType<CUAGManager>();
	if (uag != NULL)
	{
		if (testAssert(fDesignProject != NULL))
		{
			VFolder *cacheFolder = NULL;
			VString posixPath;
			fSettings.GetDirectoryCacheFolder( posixPath);
			if (!posixPath.IsEmpty())
			{
				if (fDesignProject->ResolvePosixPathMacros( posixPath))
				{
					VFilePath projectFolderPath;
					fDesignProject->GetProjectFolderPath( projectFolderPath);
					VFilePath cacheFolderPath( projectFolderPath, posixPath, FPS_POSIX);
					cacheFolder = new VFolder( cacheFolderPath);
					if (cacheFolder != NULL)
					{
						if (!cacheFolder->Exists())
							outError = cacheFolder->CreateRecursive( false);						
					}
					else
					{
						outError = vThrowError( VE_MEMORY_FULL);
					}
				}
			}

			if (outError == VE_OK)
			{
				VProjectItem *dirItem = fDesignProject->GetProjectItemFromTag( kUAGDirectoryTag);
				if (dirItem != NULL)
				{
					VFilePath directoryPath;
					dirItem->GetFilePath( directoryPath);

					VFile file( directoryPath);
					directory = uag->RetainDirectory( file, FA_READ_WRITE, cacheFolder, NULL, &outError);
				}

				if (directory == NULL && outError == VE_OK)
				{
					VFilePath prjPath;
					fDesignProject->GetProjectFilePath(prjPath);
					prjPath.SetExtension(RIAFileKind::kDirectoryFileExtension);
					VFile defaultDirFile(prjPath);
					directory = uag->RetainDirectory( defaultDirFile, FA_READ_WRITE, cacheFolder, NULL, &outError, NULL, true);
				}

				if (directory != NULL && outError == VE_OK && fOpeningParameters->GetCreateAdminUser())
				{
					// sc 29/04/2013, create default admin user
					{
						StErrorContextInstaller errorContext( true, true);
						VString login, password;

						VRIAServerStartupParameters *params = VRIAServerApplication::Get()->RetainStartupParameters();
						if (params != NULL)
						{
							params->GetAdminLogin( login);
							params->GetAdminPassword( password);
							params->Release();
						}

						if (login.IsEmpty())
							login = L"admin";

						CUAGUser *adminUser = directory->RetainUser( login);
						if (adminUser == NULL)
						{
							adminUser = directory->AddOneUser( login, password, L"administrator", outError);
							if (adminUser != NULL && outError == VE_OK)
							{
								CUAGGroup *adminGroup = directory->RetainSpecialGroup( CUAGDirectory::AdminGroup);
								if (adminGroup != NULL)
								{
									outError = adminUser->PutIntoGroup( adminGroup);
									adminGroup->Release();
								}
								else
								{
									outError = VE_UNKNOWN_ERROR;
								}
							}
						}
						ReleaseRefCountable( &adminUser);

						directory->ComputeNoAdmin();
					}

					if (outError != VE_OK)
						outError = vThrowError( VE_RIA_CANNOT_CREATE_ADMIN_USER);
				}
			}

			ReleaseRefCountable( &cacheFolder);
		
			if (directory != NULL && outError == VE_OK)
			{
				LogMessage( fLoggerID, eL4JML_Information, L"Users and groups directory opened");
			}
		}
		uag->Release();
	}
	else
	{
		outError = vThrowError( VE_RIA_UAG_COMPONENT_NOT_FOUND);
	}
	return directory;
}
#endif


CDB4DBase* VRIAServerProject::_OpenDatabase( VError& outError)
{
	CDB4DBase *base = NULL;
	outError = VE_OK;

	if (testAssert(fDesignProject != NULL))
	{
		bool found = false;
		VFilePath structurePath;
		sLONG flags = DB4D_Open_WithSeparateIndexSegment | DB4D_Open_Convert_To_Higher_Version;

		VProjectItem *catalogItem = fDesignProject->GetProjectItemFromTag( kCatalogTag);
		if (catalogItem != NULL)
		{
			if (!catalogItem->ContentExists())
			{
				// sc 15/10/2012 WAK0078042, if the tagged item doesnt exist, returns an error
				VString modelFileName;
				catalogItem->GetName( modelFileName);
				outError = vThrowError( VE_RIA_MODEL_FILE_NOT_FOUND, modelFileName);
			}
			else
			{
				catalogItem->GetFilePath( structurePath);
				flags |= DB4D_Open_As_XML_Definition;
				flags |= DB4D_Open_No_Respart;
				found = true;
			}
		}

		if (found)
		{
			CDB4DManager *db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
			if (db4dMgr != NULL)
			{
				VFilePath dataPath;

				VProjectItem *newDataFolderItem = fDesignProject->GetProjectItemFromTag( kDataFolderTag);
				if (newDataFolderItem != NULL)
				{
					newDataFolderItem->GetFilePath( dataPath);
					dataPath.SetFileName( L"data.waData");
				}
				else
				{
					// new "DataFolder" does not exist - backward compatibility
					VProjectItem *oldDataItem = fDesignProject->GetProjectItemFromTag( kDataTag);

					// the data file with active role found
					if (oldDataItem != NULL)
					{
						oldDataItem->GetFilePath( dataPath);
					}
					else
					{
						// sc 29/11/2012, default data file is ./DataFolder/data.waData
						fDesignProject->GetProjectFolderPath( dataPath);

						VString defaultFolder;
						if (VProjectItemTagManager::Get()->GetPreferedDefaultFolder( kDataFolderTag, defaultFolder))
							BuildPathFromRelativePath( dataPath, defaultFolder, FPS_POSIX);
						else
							dataPath.ToSubFolder( L"DataFolder");

						dataPath.SetFileName( L"data.waData");
					}
				}
				
				// if FileSystem "DATA" has already been defined,
				// let's take it and override data file location,
				// else define it with project item folder location.
				VFileSystem *dataFileSystem = fFileSystemNamespace->RetainFileSystem( CVSTR( "DATA"));
				if (dataFileSystem != NULL)
				{
					VString name;
					dataPath.GetName( name);
					dataPath = dataFileSystem->GetRoot();
					dataPath.ToSubFile( name);
				}
				else
				{
					VFilePath dataFolder;
					dataPath.GetFolder( dataFolder);
					dataFileSystem = VFileSystem::Create( CVSTR( "DATA"), dataFolder, eFSO_Writable);
					fFileSystemNamespace->RegisterFileSystem( dataFileSystem);
				}
	
				//Load backup settings we may need them to handle DB opening errors
				_LoadBackupSettings();
				xbox_assert(fBackupSettings != NULL);

				// Open the structure
				// Associate with project FileSystem
				VFileSystem *structureFileSystem = fFileSystemNamespace->RetainFileSystem( CVSTR( "PROJECT"));
				xbox_assert( (structureFileSystem != NULL) && structurePath.IsChildOf( structureFileSystem->GetRoot()));
				VFile structureFile(structurePath, structureFileSystem);
				CUAGDirectory *uagDirectory = RetainUAGDirectory( NULL);

				VProjectItem* permissionsItem = NULL;
				VFilePath permissionsPath;
				VFile* permissionsFile = NULL;
				bool newDataFile = false;

				permissionsItem = fDesignProject->GetProjectItemFromTag( kPermissionsTag );	// sc 14/09/2012 WAK0076884, pass the permission file to DB4D

				if ( permissionsItem )
				{
					permissionsItem->GetFilePath( permissionsPath );
					permissionsFile = new VFile( permissionsPath );
				}

				//Open structure
				base = db4dMgr->OpenBase( structureFile, flags, &outError, FA_READ_WRITE, nil, uagDirectory, permissionsFile, this);

				ReleaseRefCountable( &permissionsFile);

				if (base != NULL && outError == VE_OK)
				{
					VFile dataFile( dataPath, dataFileSystem);
					if (dataFile.Exists())
					{
						newDataFile = false;
						//Open data file, without opening journal so we can detect and fix some problems
						XBOX::StErrorContextInstaller errContext( VE_DB4D_CANNOTOPENDATAFILE, VE_DB4D_CANNOTREADDATASEG, XBOX::VE_OK);
						flags = DB4D_Open_WithSeparateIndexSegment | DB4D_Open_WITHOUT_JournalFile;
						base->OpenData( dataFile, flags, NULL, &outError);
						if ( outError != VE_OK || errContext.GetLastError() != VE_OK)
						{
							LogMessage( fLoggerID, eL4JML_Warning, CVSTR("Error opening data file"));

							outError = errContext.GetLastError();

							if (errContext.GetContext()->Find( VE_DB4D_FLUSH_DID_NOT_COMPLETE) 
								|| errContext.GetContext()->Find( VE_DB4D_FLUSH_COMPLETE_ON_DATA))
							{
								outError = VE_DB4D_FLUSH_DID_NOT_COMPLETE;
							}
							else if (errContext.GetContext()->Find( VE_DB4D_DATAFILE_DOES_NOT_MATCH_STRUCT))
							{
								outError = VE_DB4D_DATAFILE_DOES_NOT_MATCH_STRUCT;
							}
							//XXX: don't mask error code here data file might be corrupted
							//beyond usage and may require manual intervention
							outError = _HandleDataBaseDataFileOpeningError(base,dataPath,outError);
						}
						else
						{
							while (base->StillIndexing())
							{
								VTask::Sleep(20);
							}
						}
					}
					else
					{
						VFolder parentDataFolder( dataPath.ToParent());
						if (!parentDataFolder.Exists())
						{
							outError = parentDataFolder.CreateRecursive( true);

							//WAK0081153 Mar 20th 2013 O.R., when creating data folder we must
							//manually create the related project item for it so that eventual calls
							//to GetProjectItemFromTag() (e.g. computing journal path) consistently return the created folder path
							if(outError == VE_OK)
							{
								VProjectItem *item = fDesignProject->GetProjectItemFromFilePath(parentDataFolder.GetPath());
								if(item == NULL)
								{
									item = fDesignProject->CreateFolderItemFromPath( outError, parentDataFolder.GetPath(), true /*inRecursive*/, false /*inSynchronizeWithFileSystem*/);
								}
							}
						}
						
						if (outError == VE_OK)
						{
							base->CreateData( dataFile, flags, NULL, NULL, &outError);
							if (outError == VE_OK)
							{
								while (base->StillIndexing())
								{
									VTask::Sleep(20);
								}
							}
						}
						newDataFile = true;
					}
					if(outError == VE_OK)
					{
						outError = _OpenJournal(base,dataPath,newDataFile);
					}
					
#if 0
// the model script is now executed by db4d in InitJSContextWithEntityModels
					if (outError == VE_OK && fJSContextPool != NULL)
					{
						// Retreive the Entity Model script
						VFilePath emScriptPath( structurePath);
						emScriptPath.SetExtension( "js" );

						VFile file( emScriptPath);
						if (file.Exists())
						{
							fJSContextPool->AppendRequiredScript( emScriptPath);
						}
						else
						{
							VString altScriptName;
							structurePath.GetFileName( altScriptName, false);
							altScriptName.AppendUniChar( '.');
							altScriptName.AppendString( RIAFileKind::kCatalogFileExtension);
							altScriptName.AppendString( L".js");

							VFilePath altPath( structurePath );
							altPath.SetFileName( altScriptName, true );

							VFile altFile( altPath );
							if ( altFile.Exists())
							{
								fJSContextPool->AppendRequiredScript( altPath);
							}
						}
					}
#endif

					if (outError == VE_OK)
					{
						xbox_assert(fBackupSettings != NULL);
						base->SetRetainedBackupSettings(fBackupSettings);
					}

				}

				ReleaseRefCountable( &dataFileSystem);
				ReleaseRefCountable( &structureFileSystem);

				if (outError != VE_OK)
				{
					if (base != NULL)
					{
						base->CloseAndRelease();
						base = NULL;
					}
				}

				if (outError == VE_OK)
				{
					StErrorContextInstaller errs(false);
					VFolder* remoteFolder = structureFile.RetainParentFolder();
					db4dMgr->OpenRemoteCatalogs(this, remoteFolder, base, false);
					QuickReleaseRefCountable(remoteFolder);
				}

				ReleaseRefCountable( &uagDirectory);
			}
			else
			{
				outError = vThrowError( VE_RIA_DB4D_COMPONENT_NOT_FOUND);
			}
		}
	}
	return base;
}

bool VRIAServerProject::_ComputeJournalPathFromSettings(XBOX::VFilePath& outJournalPath,bool& outContainedInDataFolder)const
{
	XBOX::VError error = VE_OK;
	bool valid = false;
	VString name;
	outContainedInDataFolder = false;
	outJournalPath.Clear();

	if (fDesignProject != NULL)
	{
		VProjectItem *item = fDesignProject->GetProjectItemFromTag(kDataFolderTag);
		if (item != NULL)
		{
			VFilePath folderPath;
			item->GetFilePath( folderPath);
			folderPath = folderPath.ToFolder();
			valid = _ComputeJournalPath(folderPath,outJournalPath,outContainedInDataFolder);
		}
	}	
	return valid;
}

bool VRIAServerProject::_ComputeJournalPath(const XBOX::VFilePath& inBaseFolder,XBOX::VFilePath& outJournalPath,bool& outRelativeToBaseFolder)const
{
	VString name;
	bool hasJournalSettings = false;
	outRelativeToBaseFolder = false;
	outJournalPath.Clear();
	
	hasJournalSettings = fSettings.HasDatabaseJournalSettings();
	if (hasJournalSettings)
	{
		VFile* journal = NULL;
		fSettings.GetDatabaseJournalPath(name);
		if(name.GetLength() == 0)
		{
			name = CVSTR("./journal.waJournal");
			outJournalPath.FromRelativePath(inBaseFolder,name,FPS_POSIX);
			outRelativeToBaseFolder = true;
		}
		else
		{
			outJournalPath.FromRelativePath(inBaseFolder,name,FPS_POSIX);

			//Path should be a folder, if not then make it a folder e.g. if name is './var/foo' then transform into './var/foo/'
			if (outJournalPath.IsFile())
			{
				// /<SomeRoot>/.../var/foo -> /<SomeRoot>/.../var/foo/
				outJournalPath.GetFileName(name,true);
				outJournalPath.ToParent();
				outJournalPath.ToSubFolder(name);
			}
			outJournalPath.ToSubFile(CVSTR("journal.waJournal"));
			outRelativeToBaseFolder = outJournalPath.GetRelativePath(inBaseFolder,name);
		}
		xbox_assert(outJournalPath.IsValid() && outJournalPath.IsFile());
	}
	return hasJournalSettings;
}


XBOX::VError VRIAServerProject::_IntegrateJournalFile(CDB4DBase* inBase,const XBOX::VFilePath& inDataFilePath,const XBOX::VFilePath& inJournalPath,bool force)
{
	CDB4DManager *db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
	XBOX::VError error = VE_OK;

	if (fSettings.GetRecoverFromJournalOnIncompleteDatabase() || force)
	{
		CDB4DJournalParser* journalParser = NULL;
		
		journalParser = db4dMgr->NewJournalParser();
	
		if ( journalParser == NULL )
		{
			error = VE_MEMORY_FULL;
		}
		else
		{
			VString message;
			VString strJournalPath,strDataFilePath;
			uLONG8 totalOperationCount = 0;
			VProgressIndicator *progressIndicator = NULL;
			XBOX::VFile* journalFile = NULL;
			StErrorContextInstaller errorContext(false);

			inJournalPath.GetPosixPath(strJournalPath);
			inDataFilePath.GetPosixPath(strDataFilePath);
			
			message.AppendString(CVSTR("Integrating journal '"));
			message.AppendString(strJournalPath);
			message.AppendString(CVSTR("' in data file '"));
			message.AppendString(strDataFilePath);
			message.AppendString(CVSTR("'"));
			LogMessage( fLoggerID, eL4JML_Information, message);

			journalFile = new VFile(inJournalPath);
			progressIndicator = new VProgressIndicator();
			error = journalParser->Init( journalFile, totalOperationCount, progressIndicator );
			if ( error == XBOX::VE_OK )
			{
				XBOX::VUUID dataLink;
				inBase->GetJournalUUIDLink(dataLink);
				if ( journalParser->IsValid( dataLink ) )
				{
					
					error = inBase->IntegrateJournal( journalParser, 0, 0, NULL, progressIndicator);
					if ( error == VE_OK )
					{
						LogMessage( fLoggerID, eL4JML_Information, CVSTR("Successfully integrated journal"));
					}
					else
					{
						LogMessage( fLoggerID, eL4JML_Error, CVSTR("Failed to integrate journal"));
					}
				}
				else
				{
					LogMessage( fLoggerID, eL4JML_Error, CVSTR("Journal is not valid for integration in this data file"));
					error = VE_DB4D_LOGFILE_DOES_NOT_MATCH_DATABASE;
				}
				XBOX::ReleaseRefCountable( &journalParser);
			}
			else
			{
				LogMessage( fLoggerID, eL4JML_Error, CVSTR("Failed to integrate journal"));
			}
			XBOX::ReleaseRefCountable( &progressIndicator);
			XBOX::ReleaseRefCountable( &journalFile);
		}
		XBOX::ReleaseRefCountable( &journalParser);
	}
	else
	{
		LogMessage( fLoggerID, eL4JML_Warning, CVSTR("Journal integration disabled by settings"));
	}
	return error;
}


XBOX::VError VRIAServerProject::_OpenJournal(CDB4DBase* inBase,const XBOX::VFilePath& inDataFilePath, bool inNewDataFile)
{
	CDB4DManager *db4dMgr = NULL;
	XBOX::VError error = VE_OK;
	XBOX::VUUID journalUUID;
	XBOX::VFilePath lastJournalPath, nextJournalPath,*journalToOpen = NULL;
	VFile* journalFile = NULL;
	StErrorContextInstaller errorContext;
	
	db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();

	if (inNewDataFile)
	{
		lastJournalPath.Clear();
		journalUUID.Clear();
	}
	else
	{
		//WAK0084654, O.R. Oct 24th 2013: journal info is now stored in the data file's extra properties
		inBase->GetJournalInfos(inDataFilePath,lastJournalPath,journalUUID);
		if (lastJournalPath.IsEmpty())
		{
			//if no journal information is found in the data, check whether it's stored inside nearby waExtra file (WAK6 and before).
			error = db4dMgr->GetJournalInfos(inDataFilePath,lastJournalPath,journalUUID);
			if (error == VE_OK && !lastJournalPath.IsEmpty())
			{
				//If so, transfer journal info into the data file for next opening and rename the waExtra
				//so we can never refer to it again (convert to WAK7 format)
				XBOX::VString s;
				lastJournalPath.GetPath(s);
				error = inBase->SetJournalFileInfos(&s,&journalUUID);
				if (error == VE_OK)
				{
					XBOX::VFilePath waExtra = inDataFilePath;
					waExtra.SetExtension(CVSTR("waExtra"));
					XBOX::VFilePath waExtraCpy = waExtra;
					waExtraCpy.GetFileName(s,false);
					s.AppendString(CVSTR("_waExtra.ignore"));
					waExtraCpy.SetFileName(s,true);
					XBOX::VFile f(waExtra);
					//Move() rather than Rename(), this should work more than once (e.g. if restoring from last backup
					//which still contains a waExtra, we will run by this portion of code again).
					error = f.Move(waExtraCpy,NULL,FCP_Overwrite);
				}
			}
			else
			{
				lastJournalPath.Clear();
				journalUUID.Clear();
			}
		}
	}
	errorContext.Flush();

	if (!fSettings.HasDatabaseJournalSettings() || !fSettings.GetDatabaseJournalEnabled())
	{
		//Either journaling settings are available (legacy project, so don't force journal usage)
		//or it is precisely disabled
		if (!lastJournalPath.IsEmpty() && lastJournalPath.IsFile())
		{
			//But one is defined at database level , log the fact and clear clear it out, DB will run UNJOURNALED 
			LogMessage( fLoggerID, eL4JML_Warning, CVSTR("Settings application require disabling of journal.") );
			inBase->SetJournalFile(NULL,NULL,NULL,false);
		}
		journalToOpen = NULL;
		error = VE_OK;
	}
	else
	{
		bool unused = false;
		_ComputeJournalPathFromSettings(nextJournalPath,unused);
		if testAssert(nextJournalPath.IsValid() && nextJournalPath.IsFile() && !nextJournalPath.IsEmpty())
		{
			journalToOpen = &nextJournalPath;
			if (lastJournalPath.IsEmpty())
			{
				//no journal used previously, so we will create a new one
				//but before that we must backup the database
				StErrorContextInstaller errorContext;
				VFilePath wasRenamed;
				
				LogMessage( fLoggerID, eL4JML_Information, CVSTR("New journal to be created") );
				LogMessage( fLoggerID, eL4JML_Information, CVSTR("Backing up data before journal installation") );
				
				error = VE_MEMORY_FULL;
				IBackupTool* backupTool = NULL;

				backupTool = db4dMgr->CreateBackupTool();
				if (backupTool != NULL)
				{
					error = VE_OK;
					const IBackupSettings* settings = XBOX::RetainRefCountable(fBackupSettings);
					if ((settings == NULL) && (fSolution != NULL))
					{
						settings = fSolution->RetainBackupSettings();
					}
					if(settings != NULL)
					{
						///WAK0084654, O.R. Oct 24th 2013: no journal installed yet so backup the data set the journal active.
						//The data folder is backed up after the new journal is activated, so journal info is retained in the initial backup
						//and after the backup, the journal is opened 
						bool ok = backupTool->BackupDatabaseAndChangeJournal(inBase,NULL,*settings,&nextJournalPath,NULL,NULL);
						error = errorContext.GetLastError();
					}
					else
					{
						error = vThrowError(VE_RIA_SERVER_CANNOT_FIND_BACKUP_SETTINGS);
					}
					XBOX::ReleaseRefCountable(&settings);
				}
				else
				{
					error = vThrowError(VE_MEMORY_FULL);
				}
				delete backupTool;backupTool = NULL;
				if (error != VE_OK)
				{
					error = vThrowError(VE_RIA_SERVER_CANNOT_PERFORM_BACKUP);
				}
			}
			else
			{
				//Journal was already active on last launch so simply open it
				journalFile = new VFile(*journalToOpen);
				bool giveUp = false;
				do
				{
					XBOX::VString posixPath;
					journalFile->GetPath().GetPosixPath(posixPath);
					error  = inBase->OpenJournal(journalFile,journalUUID,true);
					switch (error)
					{
						case VE_OK:
							LogMessage( fLoggerID, eL4JML_Information, CVSTR("Successfully opened journal"));
							giveUp = true;
						break;

						//WAK0083981: journal is in WAK5/4Dv13 format, cannot use it anymore.
						//Perform backup and create new empty journal
						case VE_DB4D_LOGFILE_ISBEFOREV14:
							{
								giveUp = true;
								LogMessage( fLoggerID, eL4JML_Information, CVSTR("Journal with legacy format detected. Backing up and creating new journal."));
								CDB4DManager *db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
								if (db4dMgr != NULL)
								{
									IBackupTool* backupTool = NULL;
									backupTool = db4dMgr->CreateBackupTool();
									if (backupTool != NULL)
									{
										error = VE_OK;
										const IBackupSettings* settings = XBOX::RetainRefCountable(fBackupSettings);
										if ((settings == NULL) && (fSolution != NULL))
										{
											settings = fSolution->RetainBackupSettings();
										}
										if(settings != NULL)
										{
											bool ok =  backupTool->BackupDatabaseAndChangeJournal(inBase,NULL,*settings,journalToOpen,NULL,NULL);
											error = errorContext.GetLastError();
											giveUp = (error != VE_OK);//if backup succeeded re-attempt to open new empty journal
										}
										else
										{
											LogMessage( fLoggerID, eL4JML_Error, CVSTR("No backup settings found"));
											error = VE_MEMORY_FULL;
											giveUp = true;
										}
										XBOX::ReleaseRefCountable(&settings);
									}
									delete backupTool;backupTool = NULL;
								}
							}
						break;

						case VE_DB4D_LOGFILE_NOT_FOUND:
							error = vThrowError(VE_RIA_SERVER_CANNOT_FIND_CURRENT_JOURNAL,posixPath);
							giveUp = true;
						break;


						case VE_DB4D_LOGFILE_LAST_OPERATION_DOES_NOT_MATCH:
							if (fSettings.GetRecoverFromJournalOnIncompleteDatabase())
							{
								LogMessage( fLoggerID, eL4JML_Information, CVSTR("Integrating current journal") );
								error = _IntegrateJournalFile(inBase,inDataFilePath,*journalToOpen,false);
								if(error == VE_OK)
								{						
									//Integration went fine, loop once more to re-open the integrated journal file and have journaling turned on
									LogMessage( fLoggerID, eL4JML_Information, CVSTR("Successfully integrated current journal") );
									giveUp = false;
									continue;
								}
								else if (error !=VE_DB4D_LOGFILE_IS_INVALID && error != VE_DB4D_LOGFILE_DOES_NOT_MATCH_DATABASE)
								{
									error = vThrowError(VE_RIA_SERVER_CANNOT_INTEGRATE_JOURNAL,posixPath);
									giveUp = true;
									break;
								}
							}
							else
							{
								LogMessage( fLoggerID, eL4JML_Warning, CVSTR("Automatic journal integration forbidden by settings") );
								giveUp = true;
							}
							break;
					
						case VE_DB4D_LOGFILE_IS_INVALID:
						case VE_DB4D_LOGFILE_DOES_NOT_MATCH_DATABASE:
								error = vThrowError(VE_RIA_SERVER_CANNOT_USE_JOURNAL,posixPath);
								giveUp = true;
						break;

					default:
						LogMessage( fLoggerID, eL4JML_Error, CVSTR("Unexpected error: disabling journaling") );
						giveUp = true;
						break;
					}
				}while (!giveUp);
			}
		}
		else
		{
			VString temp;
			nextJournalPath.GetPosixPath(temp);
			error = vThrowError(VE_RIA_SERVER_INVALID_JOURNAL_PATH,temp);
		}
	}
	XBOX::ReleaseRefCountable(&journalFile);
	return error;
}

XBOX::VError VRIAServerProject::_RestoreDataFolderFromLastBackup(const XBOX::VFilePath& inDataFilePath,XBOX::VFilePath& outReplacedDataFolderPath)
{
	VError error = VE_OK;
	IBackupTool* backupTool = NULL;
	CDB4DManager *db4dMgr = NULL;

	error = VE_MEMORY_FULL;
	db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
	if (db4dMgr)
	{
		backupTool = db4dMgr->CreateBackupTool();
		if (backupTool != NULL)
		{
			error = VE_OK;
		}
		else
		{
			LogMessage( fLoggerID, eL4JML_Error, CVSTR("Failed to create backup tool"));
		}
	}
	
	if(error == VE_OK)
	{
		VFilePath lastBackupManifestPath;
		VUUID	  unusedUUID;
		error = VE_FOLDER_NOT_FOUND;
		
		//Retrieve last backup manifest using either project or solution settings
		const IBackupSettings* backupSettings = XBOX::RetainRefCountable(fBackupSettings);
		if ((backupSettings == NULL) && (fSolution != NULL))
		{
			backupSettings = fSolution->RetainBackupSettings();
		}
		if (backupSettings != NULL)
		{
			error = backupTool->GetLastBackupPath(*backupSettings,lastBackupManifestPath);
		}
		else
		{
			assert(false);
			error = VE_UNKNOWN_ERROR;
		}
		XBOX::ReleaseRefCountable(&backupSettings);

		if(error != VE_OK)
		{
			LogMessage( fLoggerID, eL4JML_Error, CVSTR("Failed to retrieve last backup manifest"));
		}
		else
		{
			//Make a safety copy of the current data folder (damaged data file).
			XBOX::VString name;
			XBOX::VFilePath dataFolderPath,dataFolderCopyPath;
			inDataFilePath.GetParent(dataFolderPath);
			dataFolderCopyPath = dataFolderPath;
			dataFolderCopyPath.GetFolderName(name);
			{
				sWORD year,month,day,hour,min,sec,msec,temp;
				XBOX::VTime now(eInitWithCurrentTime);
				now.GetLocalTime(year,month,day,hour,min,sec,msec);
				name.AppendPrintf("_REPLACED_%04d-%02d-%02d_%02d-%02d-%02d-%03d",year,month,day,hour,min,sec,msec);
			}
			dataFolderCopyPath.SetFolderName(name);

			VFolder dataFolder(dataFolderPath);
			VFolder copiedDataFolder(dataFolderCopyPath);

			error = copiedDataFolder.Create();
			if(error == VE_OK)
			{
				error = dataFolder.CopyContentsTo(copiedDataFolder);
			}

			//Then directly restore the content of the backed up data folder into the current (damaged) data folder, overwriting
			//files with the same name. 
			//This provides several benefits:
			// * if backups still have waExtra inside them, they're just copied over, referencing the correct journal, and the same
			//code (see _OpenJournal() can be re-used)
			// * if journal file is inside the data folder, no need to juggle with it to transfer it to the active data folder, it
			//is already there

			if(error == VE_OK)
			{
				//Restore backup into the current data folder
				LogMessage( fLoggerID, eL4JML_Information, CVSTR("Restoring data folder from last backup"));
				StErrorContextInstaller errContext;
				XBOX::VFilePath unused;
				bool ok = backupTool->RestoreDataFolderContent(lastBackupManifestPath,dataFolderPath,NULL);
				error = errContext.GetLastError();
				if (error != VE_OK)
				{
					LogMessage( fLoggerID, eL4JML_Error, CVSTR("Failed to restore data folder from last backup"));
				}
				else
				{
					VString msg;
					LogMessage( fLoggerID, eL4JML_Information, CVSTR("Successfully restored data folder"));
					outReplacedDataFolderPath = dataFolderCopyPath;
					outReplacedDataFolderPath.GetPosixPath(msg);
					msg.Insert(CVSTR("Damaged data folder copied to: '"),1);
					msg.AppendChar('\'');
					LogMessage( fLoggerID, eL4JML_Information, msg);
				}
			}
		}
	}
	delete backupTool;
	backupTool = NULL;
	return error;
}

XBOX::VError VRIAServerProject::_HandleDataBaseDataFileOpeningError(CDB4DBase* inBase,const XBOX::VFilePath& inDataFilePath,XBOX::VError inErrorToHandle)
{
	VError result = VE_OK;
	VFilePath journalPath;
	VString	 journalPathStr;
	VUUID	  journalDataLink;
	VFilePath newJournalPath;
	CDB4DManager *db4dMgr = NULL;

	//The base is potentially damaged so we revert to our stand-aloen APIs
	//to retrieve the journal info

	db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
	db4dMgr->GetJournalInfos(inDataFilePath,journalPath,journalDataLink);

	journalPath.GetPath(journalPathStr);

	switch (inErrorToHandle)
	{
		case VE_DB4D_DATAFILE_DOES_NOT_MATCH_STRUCT:
			LogMessage( fLoggerID, eL4JML_Fatal, CVSTR("Database data/model mismatch: cannot open this data file with that model") );
			result = VE_DB4D_DATAFILE_DOES_NOT_MATCH_STRUCT;
		break;

		case VE_DB4D_FLUSH_DID_NOT_COMPLETE:
			LogMessage( fLoggerID, eL4JML_Error, CVSTR("Database data file is corrupted") );

			if (!fSettings.GetRecoverFromLastBackupOnCorruptedDatabase())
			{
				LogMessage( fLoggerID, eL4JML_Warning, CVSTR("Automatic recovery from last backup forbidden by settings"));
				result = VE_DB4D_FLUSH_DID_NOT_COMPLETE;
			}
			else
			{
				StErrorContextInstaller errContext;
				XBOX::VFilePath replacedDataFolderPath;
				LogMessage( fLoggerID, eL4JML_Information, CVSTR("Recovering damaged data file from last backup"));
				result = _RestoreDataFolderFromLastBackup(inDataFilePath,replacedDataFolderPath);
				if(result !=VE_OK)
				{
					LogMessage( fLoggerID, eL4JML_Fatal, CVSTR("Failed to recover from last backup") );
				}
				else
				{
					//Now re-open restored data file
					VFile dataFile( inDataFilePath);
					LogMessage( fLoggerID, eL4JML_Information, CVSTR("Successfully recovered data file") );
					sLONG flags	= DB4D_Open_WithSeparateIndexSegment | DB4D_Open_WITHOUT_JournalFile;
					errContext.Flush();
					inBase->OpenData( dataFile, flags, NULL, &result);

					if (result == VE_OK)
					{
						while (inBase->StillIndexing())
						{
							VTask::Sleep(20);
						}
					}

					if ( result != VE_OK )
					{
						LogMessage( fLoggerID, eL4JML_Fatal, CVSTR("Failed to open restored data file"));
					}
					else
					{
						LogMessage( fLoggerID, eL4JML_Information, CVSTR("Successully opened recovered data file"));
					}
				}
			}
		break;

		default:
			result = inErrorToHandle;
			LogMessage( fLoggerID, eL4JML_Fatal, CVSTR("Cannot recover from previous errors. Consider restoring data from backup.") );
		break;
	}
	return result;
}


void VRIAServerProject::_CloseAndReleaseDatabase( CDB4DBase *inBase)
{
	if (inBase != NULL)
	{
		inBase->SetRetainedBackupSettings(NULL);
		XBOX::ReleaseRefCountable(&fBackupSettings);

		if (fJSContextPool != NULL)
		{
			// Remove the Entity Model script from required script

			VFolder *emFolder = inBase->RetainStructFolder();
			if (emFolder != NULL)
			{
				// Build the Entity Model script path, which is the "catalogName.js" file near the catalog
				VFilePath emScriptPath;
				VString emScriptName;
				
				inBase->GetName( emScriptName);
				emScriptName.AppendString( L".js");
				
				emFolder->GetPath( emScriptPath);
				emScriptPath.SetFileName( emScriptName, true);

				VFile file( emScriptPath );
				if ( file.Exists() )
				{
					fJSContextPool->RemoveRequiredScript( emScriptPath);
				}
				else
				{
					VFilePath emAlternateScriptPath;
					VString emAlternateScriptName;

					inBase->GetName( emAlternateScriptName);
					emAlternateScriptName.AppendString( L".js");

					emAlternateScriptName.AppendUniChar( '.');
					emAlternateScriptName.AppendString( RIAFileKind::kCatalogFileExtension);

					emFolder->GetPath( emAlternateScriptPath);
					emAlternateScriptPath.SetFileName( emAlternateScriptName, true);

					VFile alternateFile( emAlternateScriptPath );
					if ( alternateFile.Exists() )
					{
						fJSContextPool->RemoveRequiredScript( emAlternateScriptPath);
					}
				}
			}
		}
		
		inBase->CloseAndRelease( true);
	}
}


VError VRIAServerProject::_StartHTTPServer()
{
	VError err = VE_OK;
	if (fHTTPServerProject != NULL)
	{
		if (!fHTTPServerProject->IsProcessing())
		{
			// Add Some useful VirtualFolders
			XBOX::VFileSystem *	fileSystem = NULL;

			fileSystem = fFileSystemNamespace->RetainFileSystem (CVSTR ("WALIB"));
			if (NULL != fileSystem)
			{
				fHTTPServerProject->AddVirtualFolder (fileSystem->GetRoot().GetPath(), CVSTR (""), CVSTR ("walib"));
				XBOX::ReleaseRefCountable (&fileSystem);
			}

			fileSystem = fFileSystemNamespace->RetainFileSystem (CVSTR ("WEB_COMPONENTS"));
			if (NULL != fileSystem)
			{
				fHTTPServerProject->AddVirtualFolder (fileSystem->GetRoot().GetPath(), CVSTR (""), CVSTR ("webComponents"));
				XBOX::ReleaseRefCountable (&fileSystem);
			}

			fileSystem = fFileSystemNamespace->RetainFileSystem( CVSTR( "WIDGETS_CUSTOM" ) );
			if ( NULL != fileSystem )
			{
				fHTTPServerProject->AddVirtualFolder( fileSystem->GetRoot().GetPath(), CVSTR( "" ), CVSTR( "widgets-custom" ) );
				XBOX::ReleaseRefCountable( &fileSystem );
			}

			fileSystem = fFileSystemNamespace->RetainFileSystem( CVSTR( "THEMES_CUSTOM" ) );
			if ( NULL != fileSystem )
			{
				fHTTPServerProject->AddVirtualFolder( fileSystem->GetRoot().GetPath(), CVSTR( "" ), CVSTR( "themes-custom" ) );
				XBOX::ReleaseRefCountable( &fileSystem );
			}

#if VERSIONMAC && USE_HELPER_TOOLS
			sLONG	listeningPort = fHTTPServerProject->GetSettings()->GetListeningPort();
			sLONG	listeningSSLPort = fHTTPServerProject->GetSettings()->GetListeningSSLPort();
			bool	bAllowSSL = fHTTPServerProject->GetSettings()->GetAllowSSL();
			
			//IPv6-TODO : Maj HelperTool
			if ((listeningPort < 1024) || (listeningSSLPort < 1024 && bAllowSSL))
			{
				if (AuthorizationHelpers::IsHelperToolInstalled())
				{
					VString	tmpAddress = fHTTPServerProject->GetSettings()->GetListeningAddress();
					
					char listeningAddress[INET6_ADDRSTRLEN]; //large enough for v4 or v6, with trailing 0

					tmpAddress.ToCString(listeningAddress, sizeof(listeningAddress));
					int		httpSocketDescriptor = -1;
					int		sslSocketDescriptor = -1;

					AuthorizationHelpers::OpenSocketAndGetDescriptor_IPv6 (listeningAddress, listeningPort, httpSocketDescriptor);
					if (bAllowSSL)
						AuthorizationHelpers::OpenSocketAndGetDescriptor_IPv6 (listeningAddress, listeningSSLPort, sslSocketDescriptor);		

					if (httpSocketDescriptor != -1)
						fHTTPServerProject->SetListeningSocketDescriptor (httpSocketDescriptor);
					
					if (sslSocketDescriptor != -1)
						fHTTPServerProject->SetListeningSSLSocketDescriptor (sslSocketDescriptor);
				}
			}
			
#endif

			// sc 13/02/2012, if the socket is unavailable, we try to start the HTTP server for several times
			bool retryToStartHTTPServer = false;
			const uLONG maxTrailsCount = 5;
			uLONG trailsCount = 0;

			do
			{
				StErrorContextInstaller lErrorContext;
				retryToStartHTTPServer = false;

				err = fHTTPServerProject->StartProcessing();
				++trailsCount;
				if ((err != VE_OK) && (lErrorContext.GetContext()->Find( VE_SRVR_FAILED_TO_CREATE_LISTENING_SOCKET) || lErrorContext.GetContext()->Find( VE_SRVR_FAILED_TO_START_LISTENER)) && (trailsCount < maxTrailsCount))
				{
					fHTTPServerProject->StopProcessing();
					retryToStartHTTPServer = true;
				}

			} while (retryToStartHTTPServer);
			
			if (err == VE_OK)
			{
				// Post 'httpServerDidStart' message to the services
				_PostServicesMessage( L"httpServerDidStart");

				LogMessage( fLoggerID, eL4JML_Information, L"HTTP Server started");
			}
		}
	}
	else
	{
		err = vThrowError( VE_RIA_HTTP_SERVER_NOT_FOUND);
	}
	return err;
}


VError VRIAServerProject::_StopHTTPServer()
{
	VError err = VE_OK;

	if (fHTTPServerProject != NULL)
	{
		if (fHTTPServerProject->IsProcessing())
		{
			if (fOpeningParameters->GetHandlesDebuggerServer())
			{
				IRemoteDebuggerServer*	l_dbgr_srv = VJSGlobalContext::GetDebuggerServer();
				if (l_dbgr_srv)
				{
					l_dbgr_srv->StopServer();
				}
			}

			// Post 'httpServerWillStop' message to the services
			_PostServicesMessage( L"httpServerWillStop");
			
			err = fHTTPServerProject->StopProcessing();

			if (err == VE_OK)
				LogMessage( fLoggerID, eL4JML_Information, L"HTTP Server stopped");
		}
	}
	else
	{
		err = vThrowError (VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);
	}

	return err;	
}


VRPCCatalog* VRIAServerProject::_RetainRPCCatalog( VError& outError, const IHTTPRequest* inRequest, IHTTPResponse* inResponse)
{
	VRPCCatalog *catalog = NULL;

	outError = VE_OK;

	if (testAssert(fDesignProject != NULL))
	{
		catalog = new VRPCCatalog();
		if (catalog != NULL)
		{
			if (fPermissions != NULL)
			{
				// chech whether we have some modules permissions
				std::vector< VRefPtr<VValueBag> > resourcePerm;
				VString type( L"module"), action( L"executeFromClient");

				fPermissions->RetainResourcesPermission( resourcePerm, &type, NULL, &action);
				if (!resourcePerm.empty())
				{
					VJSGlobalContext *globalContext = RetainJSContext( outError, false, inRequest);
					if (globalContext != NULL)
					{
						if (outError == VE_OK)
						{
							VJSContext jsContext( globalContext);
							for (std::vector< VRefPtr<VValueBag> >::iterator permIter = resourcePerm.begin() ; permIter != resourcePerm.end() ; ++permIter)
							{
								VString modulePath;
								if ((*permIter)->GetString( RIAPermissionsKeys::resource, modulePath))
									catalog->LoadModule( modulePath, jsContext);
							}
						}
						ReleaseJSContext( globalContext, inResponse);
					}
				}

				resourcePerm.clear();

				type = L"function";
				fPermissions->RetainResourcesPermission( resourcePerm, &type, NULL, &action);
				for (std::vector< VRefPtr<VValueBag> >::iterator permIter = resourcePerm.begin() ; permIter != resourcePerm.end() ; ++permIter)
				{
					VString methodPath;
					if ((*permIter)->GetString( RIAPermissionsKeys::resource, methodPath))
					{
						catalog->AppendModuleMethod( methodPath);
					}
				}
			}
		}
		else
		{
			outError = vThrowError( VE_MEMORY_FULL);
		}
	}

	return catalog;
}


VRIAContext* VRIAServerProject::_ValidateAndRetainContext( VRIAContext* inContext, bool inCreateContextIfNull)
{
	VRIAContext *context = NULL;

	if (fContextMgr != NULL)
	{
		if (inContext != NULL)
		{
			if (fContextMgr->IsContextRegistered( inContext))
				context = RetainRefCountable( inContext);
		}
		else if (inCreateContextIfNull)
		{
			VError err;
			context = RetainNewContext( err);
		}
	}
	return context;
}


bool VRIAServerProject::_SetContextCreationEnabled( bool inEnabled)
{
	bool previousState = fContextCreationEnabled;
	fContextCreationEnabled = inEnabled;
	return previousState;
}


bool VRIAServerProject::_IsContextCreationEnabled() const
{
	return fContextCreationEnabled;
}


VError VRIAServerProject::_EvaluateScript( const VFilePath& inFilePath)
{
	VError err = VE_OK;

	VFile scriptFile( inFilePath);
	if (scriptFile.Exists() && fJSContextPool != NULL)
	{
		VJSGlobalContext *globalContext = RetainJSContext( err, false,NULL);
		if (globalContext != NULL && err == VE_OK)
		{
			if (!globalContext->EvaluateScript( &scriptFile, NULL))
			{
				err = VE_RIA_JS_CANNOT_EVALUATE_SCRIPT;
			}
		}
		else
		{
			err = vThrowError( VE_RIA_JS_CANNOT_CREATE_CONTEXT);
		}
		ReleaseJSContext(globalContext, NULL);
	}
	else
	{
		VString posixPath;
		VURL url( inFilePath);
		url.GetPath( posixPath, eURL_POSIX_STYLE, false);
		
		err = vThrowError( VE_RIA_FILE_DOES_NOT_EXIST, posixPath);
	}
	return err;
}


VError VRIAServerProject::_PostServicesMessage( const XBOX::VString& inMessage)
{
	VError err = VE_OK;

	// Create a JavaScript context
	VJSGlobalContext *globalContext = fJSContextPool->RetainContext( err, false);

	if (globalContext != NULL && err == VE_OK)
	{
		VJSContext jsContext( globalContext);

		// Post the message using "postServiceMessage" function exported by "services" module.
		VRIAJSCallbackModuleFunction postServiceMessageCallBack( L"services", L"postServiceMessage");

		// Create a message object
		VJSObject jsMessage( jsContext);
		jsMessage.MakeEmpty();
		jsMessage.SetProperty( L"name", inMessage);

		std::vector<VJSValue> jsParams;
		jsParams.push_back( jsMessage);

		err = postServiceMessageCallBack.Call( jsContext, &jsParams, NULL);
	}
	else
	{
		err = vThrowError( VE_RIA_JS_CANNOT_CREATE_CONTEXT);
	}

	fJSContextPool->ReleaseContext( globalContext);

	if (err != VE_OK)
	{
		err = vThrowError( VE_RIA_CANNOT_POST_MESSAGE_TO_SERVICES, inMessage);
	}

	return err;
}



// ----------------------------------------------------------------------------


VRIAWebSocketHandler::VRIAWebSocketHandler (
	const XBOX::VString &inPath, 				
	VRIAServerProject *inApplication,
	XBOX::IJSRuntimeDelegate::WebSocketHandler *inHandler, 
	void *inUserData)
{
	xbox_assert(!inPath.IsEmpty() && inApplication != NULL && inHandler != NULL && inUserData != NULL);

	fPath = inPath;
	fApplication = XBOX::RetainRefCountable<VRIAServerProject>(inApplication);
	fHandler = inHandler;
	fUserData = inUserData;
}

VRIAWebSocketHandler::~VRIAWebSocketHandler ()
{
	XBOX::ReleaseRefCountable<VRIAServerProject>(&fApplication);
}

XBOX::VError VRIAWebSocketHandler::GetPatterns (XBOX::VectorOfVString *outPatterns) const
{
	if (outPatterns == NULL)

		return VE_HTTP_INVALID_ARGUMENT;

	outPatterns->clear();
	outPatterns->push_back(fPath);

	return XBOX::VE_OK;
}
	
XBOX::VError VRIAWebSocketHandler::HandleRequest (IHTTPResponse *ioResponse)
{
 	xbox_assert(ioResponse != NULL);

	XBOX::StErrorContextInstaller	context(false, true);
	XBOX::VError					error;
    VHTTPHeader                     header      = ioResponse->GetRequestHeader();
	XBOX::VTCPEndPoint				*endPoint   = ioResponse->GetEndPoint();
	
	xbox_assert(endPoint != NULL);
	if ((error = XBOX::VWebSocketListener::SendOpeningHandshake(&header, endPoint)) == XBOX::VE_OK) {

		XBOX::VWebSocket	*webSocket;

		if ((webSocket = new XBOX::VWebSocket(endPoint, true, NULL, 0, false)) == NULL)

			error = XBOX::VE_MEMORY_FULL;

		else {

			XBOX::VJSGlobalContext	*globalContext;

			globalContext = fApplication->RetainJSContext(error, false);
			if (globalContext != NULL && error == XBOX::VE_OK) {

				XBOX::VJSContext	context(globalContext);	

				ioResponse->DetachEndPoint();
				endPoint->SetIsBlocking(false);

				xbox_assert(fHandler != NULL && fUserData != NULL);
				error = fHandler(context, webSocket, fUserData);

			}

			// RetainJSContext() could have retained a context before an error occured.
			// So always do a release (NULL pointers are checked and are ok for ReleaseJSContext()).

			fApplication->ReleaseJSContext(globalContext);

		}

	}
	return error;
}


VRIAServerProjectJSRuntimeDelegate::VRIAServerProjectJSRuntimeDelegate( VRIAServerProject *inApplication)
: fApplication(inApplication)
{
}


VRIAServerProjectJSRuntimeDelegate::~VRIAServerProjectJSRuntimeDelegate()
{
	_RemoveAllHandlers();
}


VFolder* VRIAServerProjectJSRuntimeDelegate::RetainScriptsFolder()
{
	return (fApplication != NULL) ? fApplication->RetainFolder() : NULL;
}


VProgressIndicator* VRIAServerProjectJSRuntimeDelegate::CreateProgressIndicator( const VString& inTitle)
{
	return NULL;
}

XBOX::VFileSystemNamespace* VRIAServerProjectJSRuntimeDelegate::RetainRuntimeFileSystemNamespace()
{
	return RetainRefCountable( fApplication->GetFileSystemNamespace());
}

XBOX::VSystemWorkerNamespace* VRIAServerProjectJSRuntimeDelegate::RetainRuntimeSystemWorkerNamespace()
{
	return RetainRefCountable ( fApplication-> GetSystemWorkerNamespace ( ) );
}

XBOX::VError VRIAServerProjectJSRuntimeDelegate::AddWebSocketHandler (XBOX::VJSContext &inContext, const XBOX::VString &inPath, WebSocketHandler *inHandler, void *inUserData)
{
	xbox_assert(!inPath.IsEmpty() && inHandler != NULL && inUserData != NULL);

	XBOX::VTaskLock		lock(&fMutex);
	XBOX::VError		error;
	
	if (fWebSocketHandlers.find(inPath) != fWebSocketHandlers.end()) 

		error = XBOX::VE_ACCESS_DENIED;	//** Already there => need proper error message VJS.

	else {

		VRIAWebSocketHandler	*webSocketHandler;

		webSocketHandler = new VRIAWebSocketHandler(inPath, fApplication, inHandler, inUserData);
		if (webSocketHandler == NULL) 

			error = XBOX::VE_MEMORY_FULL;

		else {

			VRIAContext	*context;

			xbox_assert(fApplication != NULL);
			context = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(inContext, fApplication);
			xbox_assert(context != NULL);

			IHTTPServerProject	*httpServerProject;
					
			httpServerProject = fApplication->RetainHTTPServerProject(context);
			if (httpServerProject != NULL) {

				error = httpServerProject->AddWebSocketHandler(webSocketHandler);
				XBOX::ReleaseRefCountable<IHTTPServerProject>(&httpServerProject);
	
				fWebSocketHandlers[inPath] = webSocketHandler;
	
			} else

				error = VE_RIA_HTTP_SERVER_NOT_FOUND;

			XBOX::ReleaseRefCountable<VRIAWebSocketHandler>(&webSocketHandler);

		}

	}

	return error;
}

XBOX::VError VRIAServerProjectJSRuntimeDelegate::RemoveWebSocketHandler (XBOX::VJSContext &inContext, const XBOX::VString &inPath)
{
	xbox_assert(!inPath.IsEmpty());

	XBOX::VTaskLock					lock(&fMutex);
	WebSocketHandlerMap::iterator	i;
	XBOX::VError					error;

	i = fWebSocketHandlers.find(inPath);
	if (i == fWebSocketHandlers.end()) 

		error = XBOX::VE_ACCESS_DENIED;	//** Not found => need proper error message in VJS.

	else {

		VRIAContext	*context;

		xbox_assert(fApplication != NULL);
		context = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(inContext, fApplication);
		xbox_assert(context != NULL);

		IHTTPServerProject	*httpServerProject;
		
		httpServerProject = fApplication->RetainHTTPServerProject(context);
		if (httpServerProject != NULL) {

			error = httpServerProject->RemoveWebSocketHandler(i->second);
			XBOX::ReleaseRefCountable<IHTTPServerProject>(&httpServerProject);

			fWebSocketHandlers.erase(i);			

		} else

			error = VE_RIA_HTTP_SERVER_NOT_FOUND;

	}

	return error;
}

XBOX::VError VRIAServerProjectJSRuntimeDelegate::_RemoveAllHandlers ()
{
	XBOX::VTaskLock		lock(&fMutex);
	XBOX::VError		error;
	IHTTPServerProject	*httpServerProject;

	VJSWebSocketHandler::RemoveAllhandlers();

	error = XBOX::VE_OK;
	httpServerProject = fApplication->RetainHTTPServerProject();
	if (httpServerProject != NULL) {
	
		WebSocketHandlerMap::iterator	i;
		for (i = fWebSocketHandlers.begin(); i != fWebSocketHandlers.end(); i++) 

			error = httpServerProject->RemoveWebSocketHandler(i->second);	// Continue on error.

		fWebSocketHandlers.clear();
			
		XBOX::ReleaseRefCountable<IHTTPServerProject>(&httpServerProject);

	} else 

		error = VE_RIA_HTTP_SERVER_NOT_FOUND;

	return error;
}

// ----------------------------------------------------------------------------



VReloadCatalogMessage::VReloadCatalogMessage( VRIAServerProject* inApplication)
{
	fApplication = RetainRefCountable( inApplication);
}


VReloadCatalogMessage::~VReloadCatalogMessage()
{
	QuickReleaseRefCountable( fApplication);
}


void VReloadCatalogMessage::DoExecute()
{
	bool done = false;
	
	if (fApplication != NULL)
	{
		if (fApplication->IsOpened())
		{
			fApplication->ReloadCatalog( NULL);
			done = true;
		}
	}
	
	if (!done)
		vThrowError( VE_RIA_CANNOT_RELOAD_DATABASE);
}



// ----------------------------------------------------------------------------



VSetDebuggerServerMessage::VSetDebuggerServerMessage( VRIAServerProject* inApplication, WAKDebuggerType_t inWAKDebuggerType, VRIAServerJob *inJob)
{
	fApplication = RetainRefCountable( inApplication);
	fDebuggerType = inWAKDebuggerType;
	fJob = RetainRefCountable( inJob);
}


VSetDebuggerServerMessage::~VSetDebuggerServerMessage()
{
	ReleaseRefCountable( &fApplication);
	ReleaseRefCountable( &fJob);
}


void VSetDebuggerServerMessage::DoExecute()
{
	bool done = false;
	
	if (fApplication != NULL)
	{
		// sc 20/05/2010 WAK0081920, do nothing if application is closed
		if (fApplication->IsOpened())
		{
			VRIAServerJSContextMgr *jsContextMgr = VRIAServerApplication::Get()->GetJSContextMgr();

			// drop all JS contexts of the solution
			// sc 22/03/2013, review context pools cleaning mechanism
			jsContextMgr->BeginPoolsCleanup();
			jsContextMgr->CleanAllPools( 5000, NULL, NULL);

			VError err = fApplication->_SetDebuggerServer( fDebuggerType, fJob);
			done = (err == VE_OK);

			jsContextMgr->EndPoolsCleanup();
		}
	}

	if (!done)
		vThrowError( VE_RIA_CANNOT_SET_DEBUGGER);
}



//------- TODO: Move in separates files later
//--------------------------------------------------------------------------------------------------


struct _CountElementInVStringFunctor
{
	_CountElementInVStringFunctor (const XBOX::VString& inString)
		: fString (inString)
	{
	}

	bool operator() (const XBOX::VString& inString) const
	{
		return (fString.Find (inString) > 0);
	}

private:
	const XBOX::VString&	fString;
};


struct _MatchVRoutingRuleFunctor
{
	_MatchVRoutingRuleFunctor (const XBOX::VString& inString)
		: fString (inString)
	{
	}

	bool operator() (const std::pair<XBOX::VString, XBOX::VString>& inPairString) const
	{
		XBOX::VectorOfVString includesStrings;
		inPairString.first.GetSubStrings (CHAR_COMMA, includesStrings, false, true);
		
		if (std::count_if (includesStrings.begin(), includesStrings.end(), _CountElementInVStringFunctor (fString)) == includesStrings.size())
		{
			XBOX::VectorOfVString excludesStrings;
			inPairString.second.GetSubStrings (CHAR_COMMA, excludesStrings, false, true);
			
			if (std::count_if (excludesStrings.begin(), excludesStrings.end(), _CountElementInVStringFunctor (fString)) == 0)
				return true;
		}

		return false;
	}

private:
	const XBOX::VString&	fString;
};


//--------------------------------------------------------------------------------------------------


VRoutingRule::VRoutingRule()
: fName()
, fSuffix()
, fRules()
{
}


VRoutingRule::~VRoutingRule()
{
	fRules.clear();
}


XBOX::VError VRoutingRule::LoadFromJSONValue (const XBOX::VJSONValue& inJSONValue)
{
	if (inJSONValue.IsObject())
	{
		inJSONValue.GetProperty ("name").GetString (fName);
		inJSONValue.GetProperty ("suffix").GetString (fSuffix);

		VJSONArray *rules = inJSONValue.GetProperty ("rules").GetArray();
		for (sLONG i = 0; i < rules->GetCount(); i++)
		{
			VJSONValue elem = (*rules)[i];
			if (elem.IsObject())
			{
				VJSONObject *elemObject = elem.GetObject();

				bool isInclude = true;
				VJSONValue jsValue = elemObject->GetProperty ("include");

				if (JSON_undefined != jsValue.GetType())
				{
					XBOX::VString includeString;
					XBOX::VString excludeString;

					jsValue.GetString (includeString);
					jsValue = elemObject->GetProperty ("exclude");
					jsValue.GetString (excludeString);

					fRules.push_back (std::make_pair (includeString, excludeString));
				}
			}
		}
	}

	return XBOX::VE_OK;
}


bool VRoutingRule::MatchString (const XBOX::VString& inString)
{
	if (!fRules.empty())
	{
		VectorOfVRoutingRulePair::iterator it = std::find_if (fRules.begin(), fRules.end(), _MatchVRoutingRuleFunctor (inString));
		return (it != fRules.end());
	}

	return false;
}


//--------------------------------------------------------------------------------------------------


struct _FindMatchingRuleFunctor
{
	_FindMatchingRuleFunctor (const XBOX::VString& inString)
		: fString (inString)
	{
	}

	bool operator() (const VRoutingRuleRefPtr& inRoutingRule) const
	{
		return (inRoutingRule)->MatchString (fString);
	}

private:
	const XBOX::VString&	fString;
};


struct _FindRuleSuffixFunctor
{
	_FindRuleSuffixFunctor (const XBOX::VString& inString)
		: fString (inString)
	{
	}

	bool operator() (const VRoutingRuleRefPtr& inRoutingRule) const
	{
		return fString.EqualToString ((inRoutingRule)->GetSuffix());
	}

private:
	const XBOX::VString&	fString;
};


//--------------------------------------------------------------------------------------------------


VRoutingRulesList::VRoutingRulesList()
: fRoutingRulesList()
, fLock()
{
}


VRoutingRulesList::~VRoutingRulesList()
{
	fRoutingRulesList.clear();
}


XBOX::VError VRoutingRulesList::LoadFromJSONValue (const XBOX::VJSONValue& inJSONValue)
{
	XBOX::VTaskLock		lock (&fLock);

	if (inJSONValue.IsArray())
	{
		VJSONArray *jsonArray = inJSONValue.GetArray();
		for (sLONG i = 0; i < jsonArray->GetCount(); ++i)
		{
			VJSONValue elem = (*jsonArray)[i];
			if ( elem.IsObject() )
			{
				VRoutingRule *rule = new VRoutingRule();
				if (NULL != rule)
				{
					rule->LoadFromJSONValue (elem);
					fRoutingRulesList.push_back (rule);
					rule->Release();
				}
			}
		}
	}

	return XBOX::VE_OK;
}


bool VRoutingRulesList::FindMatchingRule (const XBOX::VString& inString, XBOX::VString& outMatchingRuleSuffix)
{
	outMatchingRuleSuffix.Clear();

	XBOX::VTaskLock		lock (&fLock);
	bool				isOK = false;
	VRoutingRulesVector::const_iterator it = std::find_if (fRoutingRulesList.begin(), fRoutingRulesList.end(), _FindMatchingRuleFunctor (inString));
	if (it != fRoutingRulesList.end())
	{
		outMatchingRuleSuffix.FromString ((*it)->GetSuffix());
		isOK = !outMatchingRuleSuffix.IsEmpty();
	}

	return isOK;
}


bool VRoutingRulesList::AcceptRuleSuffix (const XBOX::VString& inString)
{
	XBOX::VTaskLock		lock (&fLock);
	VRoutingRulesVector::const_iterator it = std::find_if (fRoutingRulesList.begin(), fRoutingRulesList.end(), _FindRuleSuffixFunctor (inString));
	if (it != fRoutingRulesList.end())
		return true;

	return false;
}


//--------------------------------------------------------------------------------------------------


const XBOX::VString		CONST_WAPLATFORM_COOKIE (CVSTR ("waPlatform"));
const XBOX::VString		CONST_WAREFERER_COOKIE (CVSTR ("waReferer"));
const XBOX::VString		CONST_EMPTY_STRING (CVSTR (""));
const XBOX::VString		CONST_USER_AGENT (CVSTR ("User-Agent"));
const XBOX::VString		CONST_DEFAULT_WAPAGE_NAME (CVSTR ("index.waPage"));
const XBOX::VString		CONST_WAPAGE_SUFFIX (CVSTR (".waPage"));


VRoutingRulesList *VRoutingPreProcessingHandler::fRoutingRulesList = NULL;


VRoutingPreProcessingHandler::VRoutingPreProcessingHandler (const XBOX::VFilePath& inFilePath)
{
	// Init Routing List once
	if (NULL == fRoutingRulesList)
		_InitRulesFromFile (inFilePath);
}


VRoutingPreProcessingHandler::~VRoutingPreProcessingHandler()
{
#if !WITH_SANDBOXED_PROJECT
	XBOX::ReleaseRefCountable (&fRoutingRulesList);
#endif
}


/* static */
void VRoutingPreProcessingHandler::_InitRulesFromFile (const XBOX::VFilePath& inFilePath)
{
	fRoutingRulesList = new VRoutingRulesList ();

	if (NULL != fRoutingRulesList)
	{
		XBOX::VError	error = XBOX::VE_OK;
		XBOX::VFile		file (inFilePath);

		if (file.Exists())
		{
			VJSONValue		jsonValue;

			error = VJSONImporter::ParseFile (&file, jsonValue, VJSONImporter::EJSI_Strict);

			if (XBOX::VE_OK == error)
				fRoutingRulesList->LoadFromJSONValue (jsonValue);
		}
	}
}


XBOX::VError VRoutingPreProcessingHandler::GetPatterns (XBOX::VectorOfVString *outPatterns) const
{
	if (outPatterns == NULL)
		return VE_HTTP_INVALID_ARGUMENT;

	outPatterns->clear();
	outPatterns->push_back (CVSTR (".*"));

	return XBOX::VE_OK;
}


static
bool CheckFolderExists (const XBOX::VFilePath& inBaseFolderPath, const XBOX::VString& inFolderName)
{
	XBOX::VFilePath folderPath (inBaseFolderPath);

	folderPath.ToSubFolder (inFolderName);

	if (folderPath.IsFolder())
	{
		XBOX::VFolder	folder (folderPath);
		return folder.Exists();
	}
	
	return false;
}


static
bool CheckFileExists (const XBOX::VFilePath& inBaseFolderPath, const XBOX::VString& inFileName)
{
	XBOX::VFilePath filePath (inBaseFolderPath);

	filePath.ToSubFile (inFileName);

	if (filePath.IsFile())
	{
		XBOX::VFile file (filePath);
		return file.Exists();
	}

	return false;
}


static
XBOX::VError CheckAndResolveURL (const XBOX::VFilePath& inBaseFolderPath, const XBOX::VString& inVirtualFolderName, XBOX::VString& ioURL)
{
	XBOX::VError		error = XBOX::VE_OK;
	XBOX::VString		URL (ioURL);
	XBOX::VString		newLocation;
	XBOX::VFilePath		path (inBaseFolderPath);
	bool				bSendRedirect = false;

	if (URL.FindUniChar (CHAR_COLON) > 0) // ':'
		URL.ExchangeAll (CHAR_COLON, CHAR_SOLIDUS);

	if (URL.FindUniChar (CHAR_REVERSE_SOLIDUS) > 0) // '\'
		URL.ExchangeAll (CHAR_REVERSE_SOLIDUS, CHAR_SOLIDUS);

	XBOX::VectorOfVString	elements;

	URL.GetSubStrings (CHAR_SOLIDUS, elements);

	if (elements.empty())
	{
		if (CheckFolderExists (path, CONST_DEFAULT_WAPAGE_NAME))
			path = path.ToSubFolder (CONST_DEFAULT_WAPAGE_NAME);
	}
	else
	{
		XBOX::VString							elementName;
		XBOX::VectorOfVString::const_iterator	firstElement = elements.begin();
		XBOX::VectorOfVString::const_iterator	lastElement = (elements.end() - 1);

		for (XBOX::VectorOfVString::const_iterator it = elements.begin(); it != elements.end(); ++it)
		{
			elementName.FromString (*it);

			if ((it == lastElement) && CheckFileExists (path, elementName))
			{
				path = path.ToSubFile (elementName);
			}
			else
			{
				if ((it == firstElement) && !inVirtualFolderName.IsEmpty() && elementName.EqualToString (inVirtualFolderName))
					;	// Do Nothing
				else if  ((elementName.GetLength() == 1) && (elementName[0] == CHAR_FULL_STOP)) // "."
					;	// Do Nothing
				else if ((elementName.GetLength() == 2) && (elementName[0] == CHAR_FULL_STOP) && (elementName[1] == CHAR_FULL_STOP)) // ".."
				{
					XBOX::VFilePath parentPath (path.ToParent());

					// Try One level up
					if (parentPath.IsChildOf (inBaseFolderPath))
						path.FromFilePath (parentPath);
				}
				else
				{
					// Check if folder exists
					if (CheckFolderExists (path, elementName))
					{
						path = path.ToSubFolder (elementName);

						/*
						 *	Special case: using '/aFolder' URL with /aFolder/index.waPage' folder existing in WebFolder.
						 *	We'll find an existing folder with an existing index.waPage sub folder, but as the URL does not end with '/'
						 *	all the following requestes will be relatives to parent folder '/' instead of '/subFolder'
						 *	--> In this case, we send a redirection to adress this issue.
						 */
						if (it == lastElement)
						{
							if (URL.GetUniChar (URL.GetLength()) != CHAR_SOLIDUS)
							{
								bSendRedirect = true;
								break;
							}

							// Check if an index.waPage folder exists...
							if (!CONST_DEFAULT_WAPAGE_NAME.BeginsWith (elementName) &&
								CheckFolderExists (path, CONST_DEFAULT_WAPAGE_NAME))
							{
								path = path.ToSubFolder (CONST_DEFAULT_WAPAGE_NAME);
							}
						}
					}
					else
					{
						XBOX::VString	elementNameCopy (elementName);

						elementNameCopy.AppendString (CONST_WAPAGE_SUFFIX);

						// Check if something.waPage exists...
						if (CheckFolderExists (path, elementNameCopy))
						{
							/*
							 *	Special case: using '/aFolder' URL with /aFolder/aSubFolder.waPage' folder existing in WebFolder.
							 *	We'll find an existing folder with an existing index.waPage sub folder, but as the URL does not end with '/'
							 *	all the following requestes will be relatives to parent folder '/aFolder/' instead of '/aFolder/aSubFolder/'
							 */
							if ((it == lastElement) && URL.GetUniChar (URL.GetLength()) != CHAR_SOLIDUS)
							{
								path = path.ToSubFolder (elementName); // YT 12-Sep-2012 - WAK0078328 - Send redirection to '/aSubFolder/' not '/aSubFolder.waPage/'
								bSendRedirect = true;
								break;
							}
							else
							{
								path = path.ToSubFolder (elementNameCopy);
							}
						}
						else
						{
							// Then try index.waPage...
							if (!elementName.EqualToString (CONST_DEFAULT_WAPAGE_NAME) &&
								CheckFolderExists (path, CONST_DEFAULT_WAPAGE_NAME))
								path = path.ToSubFolder (CONST_DEFAULT_WAPAGE_NAME);

							if ((it == lastElement) && CheckFileExists (path, elementName))
								path = path.ToSubFile (elementName);
							else if (CheckFolderExists (path, elementName))
								path = path.ToSubFolder (elementName);
							else
								error = VE_HTTP_PROTOCOL_NOT_FOUND;
						}
					}
				}
			}
		}
	}

	if ((XBOX::VE_OK == error) && (path != inBaseFolderPath))
	{
		path.GetRelativePosixPath (inBaseFolderPath, newLocation);
		if (newLocation.GetUniChar (1) != CHAR_SOLIDUS)
			newLocation.Insert (CHAR_SOLIDUS, 1);

		if (!inVirtualFolderName.IsEmpty())
		{
			newLocation.Insert (inVirtualFolderName, 1);
			newLocation.Insert (CHAR_SOLIDUS, 1);
		}

		if (!newLocation.EqualToString (ioURL))
		{
			ioURL.FromString (newLocation);

			if (bSendRedirect)
				error = VE_HTTP_PROTOCOL_FOUND;
		}
	}

	return error;
}


static
XBOX::VError CheckAndResolveURL (const XBOX::VFilePath& inBaseFolderPath, const XBOX::VString& inVirtualFolderName, XBOX::VString& ioURL, IHTTPResponse *ioResponse)
{
	if (NULL == ioResponse)
		return VE_HTTP_INVALID_ARGUMENT;

	XBOX::VString		URL (ioURL);
	XBOX::VString		URLQuery (ioResponse->GetRequest().GetURLQuery());
	XBOX::VError		error = CheckAndResolveURL (inBaseFolderPath, inVirtualFolderName, ioURL);

	if (VE_HTTP_PROTOCOL_FOUND == error)
	{
		if (!URLQuery.IsEmpty())
		{
			ioURL.AppendUniChar (CHAR_QUESTION_MARK);
			ioURL.AppendString (URLQuery);
		}
		ioResponse->SetResponseStatusCode (HTTP_FOUND);
		ioResponse->AddResponseHeader (CVSTR ("Location"), ioURL, true);
	}
	else
	{
		if (!ioResponse->GetRequest().GetURLPath().EqualToString (ioURL))
		{
			XBOX::VString	waPageSuffix (CONST_WAPAGE_SUFFIX);
			waPageSuffix.AppendUniChar (CHAR_SOLIDUS);

			if ((VE_HTTP_PROTOCOL_NOT_FOUND != error) && (ioURL.EndsWith (waPageSuffix)))
				ioResponse->AddCookie (CONST_WAREFERER_COOKIE, ioURL, CONST_EMPTY_STRING, CONST_EMPTY_STRING, ioResponse->GetRequest().GetURLPath(), false, true, -1);

			ioResponse->SetRequestURLPath (ioURL);
		}
	}

	return error;
}


XBOX::VError VRoutingPreProcessingHandler::HandleRequest (IHTTPResponse *ioResponse)
{
	if (NULL == fRoutingRulesList)
		return XBOX::VE_OK;

	if (NULL == ioResponse)
		return XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);

	IVirtualHost *			virtualHost = ioResponse->GetVirtualHost();

	if (NULL == virtualHost)
		return VE_HTTP_PROTOCOL_CONFLICT;

	XBOX::VError			error = XBOX::VE_OK;
	XBOX::VString			URL (ioResponse->GetRequest().GetURLPath());
	IHTTPRequestHandler *	requestHandler = virtualHost->GetProject()->RetainMatchingHTTPRequestHandler (URL);

	/*
	 *	Check that request will not be handled by another requestHandler than the default 
	 *	requestHandler (VStaticPageRequestHandler)
	 */
	if (NULL == requestHandler)
	{
		/*
		 *	Check each URL level, try to find an existing.waPage folder and then "rewrite" original URL
		 */
		XBOX::VFilePath		webFolderPath;
		XBOX::VString		defaultIndexName;
		XBOX::VString		webFolderName; // Used for VirtualFolders

		if (virtualHost->GetMatchingVirtualFolderInfos (URL, webFolderPath, defaultIndexName, webFolderName))
		{
			error = _ResolveURL (webFolderPath, webFolderName, URL, ioResponse);

			if (error == VE_HTTP_PROTOCOL_NOT_FOUND)
			{
				XBOX::VString	refererValue;

				if (ioResponse->GetRequest().GetCookie (CONST_WAREFERER_COOKIE, refererValue))
				{
					XBOX::VString newURL (refererValue);

					if (newURL.GetUniChar (newURL.GetLength()) == CHAR_SOLIDUS)
						newURL.Remove (newURL.GetLength(), 1);

					newURL.AppendString (URL);

					error = _ResolveURL (webFolderPath, webFolderName, newURL, ioResponse);
				}
			}
		}
	}
	else
	{
		XBOX::QuickReleaseRefCountable (requestHandler);
	}

	return error;
}


/* static */
XBOX::VError VRoutingPreProcessingHandler::_ResolveURL (const XBOX::VFilePath& inBaseFolderPath, const XBOX::VString& inVirtualFolderName, XBOX::VString& ioURL, IHTTPResponse *ioResponse)
{
	XBOX::VError error = CheckAndResolveURL (inBaseFolderPath, inVirtualFolderName, ioURL, ioResponse);

	if (XBOX::VE_OK == error)
	{
		IVirtualHost *			virtualHost = ioResponse->GetVirtualHost();

		if (NULL == virtualHost)
			return VE_HTTP_PROTOCOL_CONFLICT;

		/*
		 *	Check waPlatform cookie other else try to guess platform using User-Agent header
		 */
		XBOX::VString	platformValue;
		bool			waPlatformCookieExists = false;

		waPlatformCookieExists = ioResponse->GetRequest().GetCookie (CONST_WAPLATFORM_COOKIE, platformValue);
		if (!waPlatformCookieExists || platformValue.IsEmpty() || (!platformValue.IsEmpty() && !fRoutingRulesList->AcceptRuleSuffix (platformValue)))
		{
			XBOX::VString	userAgent;
			ioResponse->GetRequestHeader().GetHeaderValue (CONST_USER_AGENT, userAgent);
			fRoutingRulesList->FindMatchingRule (userAgent, platformValue);
		}

		if (!platformValue.IsEmpty())
		{
			XBOX::VString outResolvedURL;
			bool setCookie = true;
			sLONG cookieExpires = 0; // -1: expires at the end of session, 0: expires now

			if (virtualHost->ResolveURLForAlternatePlatformPage (ioURL, platformValue, outResolvedURL))
			{
				ioResponse->SetRequestURLPath (outResolvedURL);
				ioResponse->AddCookie (CONST_WAPLATFORM_COOKIE, platformValue, CONST_EMPTY_STRING, CONST_EMPTY_STRING, CONST_EMPTY_STRING, false, true, -1); // Expires at the end of session
			}
			else if (waPlatformCookieExists)
				ioResponse->AddCookie (CONST_WAPLATFORM_COOKIE, platformValue, CONST_EMPTY_STRING, CONST_EMPTY_STRING, CONST_EMPTY_STRING, false, true, 0); // Expires now
		}
	}

	return error;
}


/* static */
XBOX::VError VRoutingPreProcessingHandler::ResolveURL (IHTTPRequest *inRequest, const XBOX::VString& inURL, XBOX::VFilePath& outFilePath, XBOX::VFilePath& outWebFolderPath)
{
	if (NULL == inRequest)
		return XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);

	IVirtualHost *			virtualHost = inRequest->GetVirtualHost();

	if (NULL == virtualHost)
		return VE_HTTP_PROTOCOL_CONFLICT;

	XBOX::VError			error = XBOX::VE_OK;
	XBOX::VString			URL (inURL);

	if (URL.IsEmpty())
		URL.FromString (inRequest->GetURLPath());

	/*
	 *	Check each URL level, try to find an existing.waPage folder and then "rewrite" original URL
	 */
	XBOX::VString		defaultIndexName;
	XBOX::VString		webFolderName; // Used for VirtualFolders

	if (virtualHost->GetMatchingVirtualFolderInfos (URL, outWebFolderPath, defaultIndexName, webFolderName))
	{
		error = CheckAndResolveURL (outWebFolderPath, webFolderName, URL);

		if (XBOX::VE_OK == error)
		{
			/*
			*	Check waPlatform cookie other else try to guess platform using User-Agent header
			*/
			XBOX::VString	platformValue;
			bool			waPlatformCookieExists = false;

			waPlatformCookieExists = inRequest->GetCookie (CONST_WAPLATFORM_COOKIE, platformValue);
			if (!waPlatformCookieExists || platformValue.IsEmpty() || (!platformValue.IsEmpty() && !fRoutingRulesList->AcceptRuleSuffix (platformValue)))
			{
				XBOX::VString	userAgent;
				inRequest->GetHTTPHeaders().GetHeaderValue (CONST_USER_AGENT, userAgent);
				fRoutingRulesList->FindMatchingRule (userAgent, platformValue);
			}

			if (!platformValue.IsEmpty())
			{
				XBOX::VString outResolvedURL;

				if (virtualHost->ResolveURLForAlternatePlatformPage (URL, platformValue, outResolvedURL))
					URL.FromString (outResolvedURL);
			}
		}
	}

	if (XBOX::VE_OK == error)
	{
		XBOX::VString filePathString;

		error = virtualHost->GetFilePathFromURL (URL, filePathString);

		if (XBOX::VE_OK == error)
			outFilePath.FromFullPath (filePathString);
	}

	return error;
}


#if WITH_SANDBOXED_PROJECT

void VRoutingPreProcessingHandler::DeInit()
{
	ReleaseRefCountable (&fRoutingRulesList);
}

#endif // WITH_SANDBOXED_PROJECT
