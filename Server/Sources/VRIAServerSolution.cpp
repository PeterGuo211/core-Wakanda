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
#include "VSolutionStartupParameters.h"
#include "VSolution.h"
#include "VProject.h"
#include "VProjectItem.h"
#include "VRIAServerProject.h"
#include "VRIAServerJSAPI.h"
#include "VJSSolution.h"
#include "VRIAServerJSContextMgr.h"
#include "VRIAServerTools.h"
#include "VRIAServerApplication.h"
#include "UsersAndGroups/Sources/UsersAndGroups.h"
#include "VRIAJSDebuggerSettings.h"
#include "VRIAPermissions.h"
#include "VRIAServerSolution.h"

//jmo - Pour les certificats intermediaires ; Necessite sans doute un petit refactoring !
#include "ServerNet/VServerNet.h"

USING_TOOLBOX_NAMESPACE



namespace SolutionOpeningParametersKeys
{
	CREATE_BAGKEY( solutionOpeningParameters);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR( openingMode, XBOX::VLong, sLONG, ePOM_FOR_RUNNING);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( customAdministratorHttpPort, XBOX::VLong, sLONG);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( customAdministratorSSLPort, XBOX::VLong, sLONG);
	CREATE_BAGKEY_NO_DEFAULT( customAdministratorAuthType, XBOX::VString);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR( openDefaultSolutionIfOpeningFails, XBOX::VBoolean, bool, true);
	CREATE_BAGKEY_NO_DEFAULT( debuggerType, XBOX::VLong);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR( administratorHandlesDebugger, XBOX::VBoolean, bool, true);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR( createAdminUser, XBOX::VBoolean, bool, false);
}



VRIAServerSolutionOpeningParameters::VRIAServerSolutionOpeningParameters()
{
	fBag = new VValueBag();
}


VRIAServerSolutionOpeningParameters::VRIAServerSolutionOpeningParameters( const VRIAServerSolutionOpeningParameters& inSource)
{
	fBag = inSource.fBag->Clone();
}


VRIAServerSolutionOpeningParameters::VRIAServerSolutionOpeningParameters( VSolutionStartupParameters *inStartupParameters)
: fBag(NULL)
{
	if (inStartupParameters != NULL)
		fBag = inStartupParameters->GetExtraData().RetainUniqueElement( SolutionOpeningParametersKeys::solutionOpeningParameters);

	if (fBag == NULL)
		fBag = new VValueBag();
}


VRIAServerSolutionOpeningParameters::~VRIAServerSolutionOpeningParameters()
{
	ReleaseRefCountable( &fBag);
}


VValueBag* VRIAServerSolutionOpeningParameters::RetainBag() const
{
	return RetainRefCountable( fBag);
}


void VRIAServerSolutionOpeningParameters::UpdateStartupParameters( VSolutionStartupParameters *inStartupParameters)
{
	if (inStartupParameters != NULL)
		inStartupParameters->GetExtraData().ReplaceElement( SolutionOpeningParametersKeys::solutionOpeningParameters, fBag);
}


void VRIAServerSolutionOpeningParameters::SetOpeningMode( EProjectOpeningMode inOpeningMode)
{
	SolutionOpeningParametersKeys::openingMode.Set( fBag, inOpeningMode);
}


EProjectOpeningMode VRIAServerSolutionOpeningParameters::GetOpeningMode() const
{
	return SolutionOpeningParametersKeys::openingMode.Get( fBag);
}


void VRIAServerSolutionOpeningParameters::SetCustomAdministratorHttpPort( sLONG inPort)
{
	SolutionOpeningParametersKeys::customAdministratorHttpPort.Set( fBag, inPort);
}


bool VRIAServerSolutionOpeningParameters::GetCustomAdministratorHttpPort( sLONG& outPort) const
{
	return SolutionOpeningParametersKeys::customAdministratorHttpPort.Get( fBag, outPort);
}


void VRIAServerSolutionOpeningParameters::SetCustomAdministratorSSLPort( sLONG inPort)
{
	SolutionOpeningParametersKeys::customAdministratorSSLPort.Set( fBag, inPort);
}


bool VRIAServerSolutionOpeningParameters::GetCustomAdministratorSSLPort( sLONG& outPort) const
{
	return SolutionOpeningParametersKeys::customAdministratorSSLPort.Get( fBag, outPort);
}


void VRIAServerSolutionOpeningParameters::SetCustomAdministratorAuthType( const XBOX::VString& inAuthenticationType)
{
	SolutionOpeningParametersKeys::customAdministratorAuthType.Set( fBag, inAuthenticationType);
}


bool VRIAServerSolutionOpeningParameters::GetCustomAdministratorAuthType( XBOX::VString& outAuthenticationType) const
{
	return SolutionOpeningParametersKeys::customAdministratorAuthType.Get( fBag, outAuthenticationType);
}


void VRIAServerSolutionOpeningParameters::SetOpenDefaultSolutionWhenOpeningFails( bool inOpenDefaultSolution)
{
	SolutionOpeningParametersKeys::openDefaultSolutionIfOpeningFails.Set( fBag, inOpenDefaultSolution);
}


bool VRIAServerSolutionOpeningParameters::GetOpenDefaultSolutionWhenOpeningFails() const
{
	return SolutionOpeningParametersKeys::openDefaultSolutionIfOpeningFails.Get( fBag);
}


void VRIAServerSolutionOpeningParameters::SetDebuggerType( WAKDebuggerType_t inType)
{
	fBag->SetLong( SolutionOpeningParametersKeys::debuggerType, inType);
}


bool VRIAServerSolutionOpeningParameters::GetDebuggerType( WAKDebuggerType_t& outType) const
{
	return fBag->GetLong( SolutionOpeningParametersKeys::debuggerType, outType);
}



void VRIAServerSolutionOpeningParameters::SetAdministratorHandlesDebugger( bool inAdministratorHandlesDebugger)
{
	SolutionOpeningParametersKeys::administratorHandlesDebugger.Set( fBag, inAdministratorHandlesDebugger);
}


bool VRIAServerSolutionOpeningParameters::GetAdministratorHandlesDebugger() const
{
	return SolutionOpeningParametersKeys::administratorHandlesDebugger.Get( fBag);
}


void VRIAServerSolutionOpeningParameters::SetCreateAdminUser( bool inCreateAdminUser)
{
	SolutionOpeningParametersKeys::createAdminUser.Set( fBag, inCreateAdminUser);
}


bool VRIAServerSolutionOpeningParameters::GetCreateAdminUser() const
{
	return SolutionOpeningParametersKeys::createAdminUser.Get( fBag);
}



// ----------------------------------------------------------------------------



VRIAServerSolution::VRIAServerSolution()
: fDesignSolution(NULL),
fDesignSolutionFolder( NULL),
fBackupSettings(NULL),
fOpeningParameters(NULL),
fDebuggerSettings(NULL),
fUAGDirectory(NULL),
fPermissions(NULL),
fJSContextPool(NULL),
fJSRuntimeDelegate(NULL),
fLogger(NULL),
fGarbageCollect(false),
fWAKBreakpointsManager(NULL),
fFileSystemNamespace(NULL),
fSystemWorkerNamespace(NULL)
{
	fState.opened = false;
	fState.started = false;
	fState.inMaintenance = false;
}


VRIAServerSolution::~VRIAServerSolution()
{
	ReleaseRefCountable( &fFileSystemNamespace);
	ReleaseRefCountable( &fSystemWorkerNamespace);
}


VRIAServerSolution* VRIAServerSolution::OpenSolution( VError& outError, VSolutionStartupParameters *inStartupParameters)
{
	outError = VE_OK;
	VRIAServerSolution *solution = NULL;


	VSolution *designSolution = VSolutionManager::Get()->OpenSolution( inStartupParameters);
	if (designSolution != NULL)
	{
		solution = new VRIAServerSolution();
		if (solution != NULL)
		{
			VRIAServerSolutionOpeningParameters *openingParams = new VRIAServerSolutionOpeningParameters( inStartupParameters);
			outError = solution->_Open( designSolution, openingParams);
			ReleaseRefCountable( &openingParams);
		}
		else
		{
			VSolutionManager::Get()->CloseSolution( designSolution);
			
			delete designSolution;
			designSolution = NULL;

			outError = vThrowError( VE_MEMORY_FULL);
		}
	}
	else
	{
		outError = VE_UNKNOWN_ERROR;
	}

	return solution;
}


VError VRIAServerSolution::Close()
{
	if (!fState.opened || fState.started)
		return VE_OK;

	StTaskPropertiesSetter stTaskProps( &fLoggerID);

	// sc 17/04/2013, use a reverse iterator to ensure that "ServerAdmin" project is the last closed project
	for (VectorOfApplication_riter iter = fApplicationsCollection.rbegin() ; iter != fApplicationsCollection.rend() ; ++iter)
	{
		(*iter)->Close();
	}

	if (fApplicationsMutex.Lock())
	{
		fApplicationsCollection.clear();
		fApplicationsMap.clear();

		fApplicationsMutex.Unlock();
	}

	ReleaseRefCountable( &fPermissions);
	if (fUAGDirectory != NULL)
	{
		fUAGDirectory->CloseAndRelease();	// sc 19/08/2014 WAK0087714
		fUAGDirectory = NULL;
	}
	xbox_assert(fBackupSettings == NULL || fBackupSettings->GetRefCount() == 1);
	ReleaseRefCountable( &fBackupSettings);

	if (fDebuggerSettings != NULL)
	{
		// deinit the debugger
		JSWDebuggerFactory		fctry;
		IRemoteDebuggerServer*	jswDebugger = fctry. Get ( );
		const VString			K_EMPTY_SOLUTION_STR("Empty-Solution");
		IRemoteDebuggerServer*	chrDbgr = fctry.GetChromeDebugHandler(K_EMPTY_SOLUTION_STR);
		
		if ( jswDebugger != 0 )
			jswDebugger-> SetSettings ( NULL );

		VChromeDebugHandler::StaticSetSettings(NULL);

		delete fDebuggerSettings;
		fDebuggerSettings = NULL;
	}

	if (fWAKBreakpointsManager != NULL)
	{
		fWAKBreakpointsManager->Save();
		delete fWAKBreakpointsManager;
		fWAKBreakpointsManager = NULL;
	}

	if (fDesignSolution != NULL)
	{
		VSolutionManager::Get()->CloseSolution( fDesignSolution);
		delete fDesignSolution;
		fDesignSolution = NULL;
	}
	ReleaseRefCountable( &fDesignSolutionFolder);

	LogMessage( fLoggerID, eL4JML_Information, L"\"" + fName + "\" solution closed");
	VRIAServerApplication::Get()->GetLogger()->Flush();

	if (fLogger != NULL)
	{
		fLogger->Flush();
		fLogger->Stop();

		delete fLogger;
		fLogger = NULL;
	}

	fName.Clear();
	fLoggerID.Clear();
	fSettings.Clear();

	delete fJSContextPool;
	fJSContextPool = NULL;

	delete fJSRuntimeDelegate;
	fJSRuntimeDelegate = NULL;

	ReleaseRefCountable( &fOpeningParameters);

	fState.opened = false;
	fState.inMaintenance = false;

	return VE_OK;
}


VError VRIAServerSolution::Start()
{	
	if (!fState.opened || fState.started || fState.inMaintenance)
		return VE_OK;

	StTaskPropertiesSetter stTaskProps( &fLoggerID);
	VError err = VE_OK;

	// init the debugger
	xbox_assert ( (fDebuggerSettings == NULL) && (fWAKBreakpointsManager) );

	fDebuggerSettings = new VJSDebuggerSettings ( this, fWAKBreakpointsManager );
	err = fDebuggerSettings-> Init ( );
	if (err == VE_OK)
	{
		JSWDebuggerFactory		fctry;
		IRemoteDebuggerServer*	jswDebugger = fctry. Get ( );
		IRemoteDebuggerServer*	chrDbgr = fctry.GetChromeDebugHandler( fName);

		if ( jswDebugger != 0 )
			jswDebugger-> SetSettings ( fDebuggerSettings );

		VChromeDebugHandler::StaticSetSettings(fDebuggerSettings);
	}

	if (err == VE_OK)
	{
		VString lHostName, lIp, lPattern, lPublishName;
		sLONG lPort = 0, lSSLPort = 0;
		bool lAllowSSL = false, lSSLMandatory = false, lAllowHTTPOnLocal = false;

		bool ignoreProjectStartingErrors = !fSettings.GetStopIfProjectFails();
		fGarbageCollect = fSettings.GetGarbageCollect();

		for (VectorOfApplication_iter iter = fApplicationsCollection.begin() ; iter != fApplicationsCollection.end() && err == VE_OK ; ++iter)
		{
			StErrorContextInstaller lErrorContext;
			
			err = (*iter)->Start();

			if ((*iter)->GetPublicationSettings( lHostName, lIp, lPort, lSSLPort, lPattern, lPublishName, lAllowSSL, lSSLMandatory, lAllowHTTPOnLocal) == VE_OK)
			{
				VString lMsg, lProjectDesc, lPublicationPorts, lPublicationAddress;

				(*iter)->GetName( lPublishName);
				if ((*iter)->IsAdministrator())
					lProjectDesc.AppendString( L"The Administration Web Server");
				else
					lProjectDesc.Printf( "\"%S\" project", &lPublishName);

				if (lAllowSSL)
				{
					if (lSSLMandatory && !lAllowHTTPOnLocal)
					{
						lPublicationPorts.Printf( "secure port %i", lSSLPort);
					}
					else
					{
						VString lStrAnd( L"and"), lStrOr( L"or");
						lPublicationPorts.Printf( "port %i %S secure port %i", lPort, (err == VE_OK) ? &lStrAnd : &lStrOr, lSSLPort);
					}
				}
				else
				{
					lPublicationPorts.Printf( "port %i", lPort);
				}

				VNetAddress netAddress( lIp);
				if (netAddress.IsAny())
					lPublicationAddress.AppendString( L"all IP addresses");
				else if (netAddress.IsLoopBack())
					lPublicationAddress.AppendString( L"localhost");
				else
					lPublicationAddress.Printf( "%S IP address", &lIp);


				if (err == VE_OK)
				{
					lMsg.Printf( "- %S listens for connections on %S on %S\n", &lProjectDesc, &lPublicationPorts, &lPublicationAddress);
					if (lAllowHTTPOnLocal)
						lMsg.AppendString( "  Note that unsecured remote connections will be refused\n");
					lMsg.AppendString( L"\n");
				}
				else
				{
					if (lErrorContext.GetContext()->FindAny( VE_SRVR_FAILED_TO_CREATE_LISTENING_SOCKET, VE_SRVR_FAILED_TO_START_LISTENER, VE_OK))
					{
						lMsg.Printf( "- %S cannot listen for connections on %S on %S\n", &lProjectDesc, &lPublicationPorts, &lPublicationAddress);
						
						if ((*iter)->IsAdministrator())
							lMsg.AppendString( L"  You can customize the Administration Web Server's ports with the \"--admin-port\" and \"--admin-ssl-port\" options\n\n");
						else
							lMsg.AppendString( L"  Please check the project's publishing settings\n\n");
					}
					else
					{
						lMsg.Printf( "- %S cannot be published\n\n", &lProjectDesc);
					}
				}
				
				fputs_VString( lMsg, stdout);
			}

			if (err != VE_OK)
			{
				VString name;
				(*iter)->GetName( name);
				err = vThrowError( VE_RIA_CANNOT_START_PROJECT, name);

				VJSWorker::TerminateAll();
				
				(*iter)->Stop();	// sc 19/01/2011 if the project started with errors, the project must be stopped

				if (ignoreProjectStartingErrors)
					err = VE_OK;
			}
		}

		for (VectorOfApplication_iter iter = fApplicationsCollection.begin() ; iter != fApplicationsCollection.end() && err == VE_OK ; ++iter)
		{
			if ((*iter)->IsStarted())
			{
				err = (*iter)->OnStartup();

				if (err != VE_OK)
				{
					VString name;
					(*iter)->GetName( name);
					err = vThrowError( VE_RIA_CANNOT_START_PROJECT, name);

					VJSWorker::TerminateAll();
					
					(*iter)->Stop();	// sc 19/01/2011 if the bootstrap cannot be executed, the project must be stopped

					if (ignoreProjectStartingErrors)
						err = VE_OK;
				}
			}
		}
	}

	VRIAServerApplication::Get()->SetDataCacheFlushEnabled( true);

	if (err == VE_OK)
		LogMessage( fLoggerID, eL4JML_Information, L"\"" + fName + "\" solution started");
	else
		LogMessage( fLoggerID, eL4JML_Warning, L"\"" + fName + "\" solution started with errors");

	fState.started = true;

	return err;
}


VError VRIAServerSolution::Stop()
{
	if (!fState.started)
		return VE_OK;

	StTaskPropertiesSetter stTaskProps( &fLoggerID);

	VRIAServerApplication::Get()->SetDataCacheFlushEnabled( false);

	// sc 21/01/2010, to avoid dead locks, never lock the applications mutex during the applications stopping.
	// sc 17/04/2013, use a reverse iterator to ensure that "ServerAdmin" project is the last stopped project
	for (VectorOfApplication_riter iter = fApplicationsCollection.rbegin() ; iter != fApplicationsCollection.rend() ; ++iter)
	{
		(*iter)->OnStop();
	}

	if (VRIAServerApplication::Get()->GetDebuggingAuthorized())
		VJSGlobalContext::AbortAllDebug();

	VJSWorker::TerminateAll();

	for (VectorOfApplication_riter iter = fApplicationsCollection.rbegin() ; iter != fApplicationsCollection.rend() ; ++iter)
	{
		(*iter)->Stop();
	}

	// sc 22/03/2013, clean the context pools
	uLONG remainingContextsCount = 0;
	std::vector<JSWorkerInfo> workersInfos;
	VRIAServerJSContextMgr *jsContextMgr = VRIAServerApplication::Get()->GetJSContextMgr();
	jsContextMgr->BeginPoolsCleanup();
	jsContextMgr->CleanAllPools( 5000, &remainingContextsCount, &workersInfos);
	jsContextMgr->EndPoolsCleanup();

	if (remainingContextsCount > 0)
	{
		VString remainingContexts;
		remainingContexts.FromLong( remainingContextsCount);
		vThrowError( VE_RIA_JS_CONTEXT_STILL_IN_USE, remainingContexts);

		LogWorkersInformations( fLoggerID, workersInfos); // sc 24/04/2013
	}

	fState.started = false;

	LogMessage( fLoggerID, eL4JML_Information, L"\"" + fName + "\" solution stopped");

	return VE_OK;
}


VSolution* VRIAServerSolution::GetDesignSolution() const
{
	return fDesignSolution;
}


void VRIAServerSolution::GetName( XBOX::VString& outName) const
{
	outName = fName;
}


VFolder* VRIAServerSolution::RetainFolder() const
{
	return RetainRefCountable( fDesignSolutionFolder);
}


VFile* VRIAServerSolution::RetainSolutionFile() const
{
	VFile *solutionFile = NULL;

	if (fDesignSolution != NULL)
	{
		VFilePath path;
		if (fDesignSolution->GetSolutionFilePath( path))
			solutionFile = new VFile( path);
	}
	return solutionFile;
}


VFolder* VRIAServerSolution::RetainLogFolder( bool inCreateIfNotExists) const
{
	VFolder *folder = NULL;

	if (fDesignSolution != NULL)
	{
		VFilePath solutionFolderPath;
		fDesignSolution->GetSolutionFolderPath( solutionFolderPath);

		VString posixPath;
		fSettings.GetLogFolder( posixPath);
		fDesignSolution->ResolvePosixPathMacros( posixPath);

		VFilePath path( solutionFolderPath, posixPath, FPS_POSIX);
		if (path.IsFolder())
		{
			folder = new VFolder( path);
			if (folder != NULL && !folder->Exists() && inCreateIfNotExists)
				folder->CreateRecursive( false);
		}
	}
	return folder;
}


const VRIASettingsFile* VRIAServerSolution::RetainSettingsFile( const RIASettingsID& inSettingsID) const
{
	return fSettings.RetainSettingsFile( inSettingsID);
}

const IBackupSettings* VRIAServerSolution::RetainBackupSettings()const
{
	return RetainRefCountable(fBackupSettings);
}

CUAGDirectory* VRIAServerSolution::RetainUAGDirectory() const
{
	return RetainRefCountable( fUAGDirectory);
}


VRIAPermissions* VRIAServerSolution::RetainPermissions( XBOX::VError *outError) const
{
	VRIAPermissions *permissions = RetainRefCountable( fPermissions);

	if (outError != NULL)
		*outError = VE_OK;

	return permissions;
}


bool VRIAServerSolution::GetUUID( VUUID& outUUID) const
{
	if (fDesignSolution != NULL)
	{
		outUUID = fDesignSolution->GetUUID();
		return true;
	}
	return false;
}


const VString& VRIAServerSolution::GetMessagesLoggerID() const
{
	return fLoggerID;
}


VRIAServerProject* VRIAServerSolution::RetainApplicationByName( const VString& inName) const
{
	VRIAServerProject *application = NULL;

	if (fApplicationsMutex.Lock())
	{
		VString locName;
		for (VectorOfApplication_citer iter = fApplicationsCollection.begin() ; (iter != fApplicationsCollection.end()) && (application == NULL) ; ++iter)
		{
			(*iter)->GetName( locName);
			if (inName.EqualToString( locName, true))
				application = (*iter).Retain();
		}
		fApplicationsMutex.Unlock();
	}
	return application;
}


VRIAServerProject* VRIAServerSolution::RetainApplicationByUUID( const VUUID& inUUID) const
{
	VRIAServerProject *application = NULL;

	if (fApplicationsMutex.Lock())
	{
		MapOfApplication_citer found = fApplicationsMap.find( inUUID);
		if (found != fApplicationsMap.end())
			application = found->second.Retain();

		fApplicationsMutex.Unlock();
	}
	return application;
}


void VRIAServerSolution::GetApplications( VectorOfApplication& outApplicationsCollection)
{
	if (fApplicationsMutex.Lock())
	{
		outApplicationsCollection.clear();
		outApplicationsCollection.insert( outApplicationsCollection.begin(), fApplicationsCollection.begin(), fApplicationsCollection.end()),

		fApplicationsMutex.Unlock();
	}
}


const VSolutionSettings& VRIAServerSolution::GetSettings() const
{
	return fSettings;
}


void VRIAServerSolution::GetBreakpoints( std::set< VRemoteDebuggerBreakpointsManager::VFileBreakpoints > & outBrkpts )
{
	if (fWAKBreakpointsManager != NULL)
		fWAKBreakpointsManager->GetBreakpoints(outBrkpts);
}


void VRIAServerSolution::AddBreakpoint(const XBOX::VString& inUrl, sLONG inLineNb)
{
	if (fWAKBreakpointsManager != NULL)
		fWAKBreakpointsManager->AddBreakPoint(inUrl,inLineNb);
}


void VRIAServerSolution::RemoveBreakpoint(const XBOX::VString& inUrl, sLONG inLineNb)
{
	if (fWAKBreakpointsManager != NULL)
		fWAKBreakpointsManager->RemoveBreakPoint(inUrl,inLineNb);
}

void VRIAServerSolution::RemoveAllBreakpoints(const XBOX::VString& inUrl)
{
	if (fWAKBreakpointsManager != NULL)
		fWAKBreakpointsManager->RemoveAllBreakPoints(inUrl);
}

void VRIAServerSolution::GetBreakpointsTimeStamp(sLONG& outbreakpointsTimeStamp)
{
	if (fWAKBreakpointsManager != NULL)
		fWAKBreakpointsManager->GetTimeStamp(outbreakpointsTimeStamp);
}


IJSRuntimeDelegate* VRIAServerSolution::GetRuntimeDelegate()
{
	return fJSRuntimeDelegate;
}


VError VRIAServerSolution::InitializeJSContext( VJSGlobalContext* inContext)
{
	VError err = VE_OK;

	if (inContext != NULL)
	{
		VJSContext jsContext( inContext);
		VJSObject globalObject( jsContext.GetGlobalObject());

		// Append the solution object to the global object
		VJSObject jsSolution(VJSSolution::CreateInstance( jsContext, this));
		globalObject.SetProperty( kSSJS_PROPERTY_NAME_Solution, jsSolution, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete, NULL);
	}
	return err;
}


VError VRIAServerSolution::UninitializeJSContext( VJSGlobalContext* inContext)
{
	return VE_OK;
}


VError VRIAServerSolution::_Open( VSolution* inDesignSolution, VRIAServerSolutionOpeningParameters *inOpeningParameters)
{
	if (fState.opened)
		return VE_OK;
	
	VError err = VE_OK;

	if (!testAssert(fDesignSolution == NULL))
		err = VE_UNKNOWN_ERROR;

	if (err == VE_OK && inDesignSolution == NULL)
		err = vThrowError( VE_RIA_INVALID_DESIGN_SOLUTION);

	if (err == VE_OK)
	{
		fDesignSolution = inDesignSolution;
		fDesignSolution->GetName( fName);

		CopyRefCountable( &fOpeningParameters, inOpeningParameters);

		if (fOpeningParameters == NULL)
		{
			fOpeningParameters = new VRIAServerSolutionOpeningParameters();
			if (fOpeningParameters == NULL)
				err = vThrowError( VE_MEMORY_FULL);
		}

		if (err == VE_OK)
			fState.inMaintenance = fOpeningParameters->GetOpeningMode() == eSOM_FOR_MAINTENANCE;

		if (err == VE_OK)
		{
			// load file system definition files
			// and create the solution VFolder
			err = _LoadFileSystemDefinitions();
		}

		if (err == VE_OK)
		{
			err = _LoadSystemWorkerDefinitions();
		}
		
		if (err == VE_OK && !fState.inMaintenance)
		{
			// Cleanup the solution folder cache
			StErrorContextInstaller errorContext( false, true);
			VFilePath cacheFolderPath;
			if (fDesignSolution->GetUserCacheFolderPath( cacheFolderPath))
			{
				VFolder cacheFolder( cacheFolderPath);
				if (cacheFolder.Exists())
					cacheFolder.DeleteContents( true);
			}
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			VString lMsg;
			lMsg.Printf( "Publishing \"%S\" solution\n\n", &fName);
			fputs_VString( lMsg, stdout);
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			const VFolder *			vfRoot = RetainFolder ( );
			if ( vfRoot != 0 )
			{
				VJSGlobalContext::SetSourcesRoot ( *vfRoot );
				vfRoot-> Release ( );
				VJSGlobalContext::AllowDebuggerLaunch ( );
			}
		}

		fLoggerID = VRIAServerApplication::Get()->GetLogSourceIdentifier() + L"." + fName;
		StTaskPropertiesSetter stTaskProps( &fLoggerID);

		if (err == VE_OK || fState.inMaintenance)
		{
			// Load all available settings files
			err = _LoadFileSettings();
			if (err != VE_OK)
				err = vThrowError( VE_RIA_CANNOT_LOAD_SETTINGS_FILES);
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			// Create a messages logger
			VFolder *logFolder = RetainLogFolder( true);
			if (logFolder != NULL)
			{
				fLogger = new VLog4jMsgFileLogger( *logFolder,  fName + L"_log");
				if (fLogger == NULL)
				{
					err = vThrowError( VE_MEMORY_FULL);
				}
				else
				{
					VRIAServerStartupParameters* startupParameters=VRIAServerApplication::Get()->RetainStartupParameters();

					if(startupParameters!=NULL)
					{
						// sc 07/03/2014 update the log4j logger listener
						uLONG levelFilter = fLogger->GetLevelFilter();
						bool netdump=false;
						startupParameters->GetNetDump( netdump);
						
						if (netdump)
							levelFilter |= (EML_Dump | EML_Trace);
						else
							levelFilter &= (~EML_Dump & ~EML_Trace);
						
						fLogger->SetLevelFilter( levelFilter);
							
						ReleaseRefCountable(&startupParameters);
					}
						
					fLogger->Start();

					VString lMsg, lLogPath;
				#if VERSIONMAC
					logFolder->GetPath().GetPosixPath( lLogPath); // sc 15/09/2014 WAK0087331
				#else
					lLogPath = logFolder->GetPath().GetPath();
				#endif
					lMsg.Printf( "The solution's log file will be stored in the \"%S\" folder\n\n", &lLogPath);
					fputs_VString( lMsg, stdout);
				}

				logFolder->Release();
			}
			else
			{
				err = vThrowError( VE_RIA_LOG_FOLDER_NOT_FOUND);
			}
		}

		if (err == VE_OK || fState.inMaintenance)
		{
			if (err == VE_OK && !fState.inMaintenance)
			{
				fJSRuntimeDelegate = new VRIAServerSolutionJSRuntimeDelegate( this);
				if (fJSRuntimeDelegate == NULL)
					err = vThrowError( VE_MEMORY_FULL);
			}

			if (err == VE_OK && !fState.inMaintenance)
			{
				fJSContextPool = VRIAServerApplication::Get()->GetJSContextMgr()->CreateJSContextPool( err, this);
			}
	
			if  (err == VE_OK || fState.inMaintenance)
			{
				// Load the database settings
				err = _LoadDatabaseSettings();
				if (err != VE_OK)
					err = vThrowError( VE_RIA_CANNOT_LOAD_DATABASE_SETTINGS);
			}
			/*if  (err == VE_OK || fState.inMaintenance)
			{
				// Load the database settings
				err = _LoadBackupSettings();
				if (err != VE_OK)
					err = vThrowError( VE_RIA_CANNOT_LOAD_DATABASE_SETTINGS);
			}*/

			if (err == VE_OK || fState.inMaintenance)
			{
				fPermissions = _LoadPermissionFile( err);
				if (err != VE_OK)
					err = vThrowError( VE_RIA_CANNOT_LOAD_PERMISSIONS);
			}

			if (err == VE_OK && !fState.inMaintenance)
			{
				// sc 06/06/2013, in maintenance mode, the solution must being in read-only state,
				// then, the users and groups directory must not be opened
				fUAGDirectory = _OpenUAGDirectory( err);
				if (err != VE_OK)
					err = vThrowError( VE_RIA_CANNOT_LOAD_UAG_DIRECTORY);
			}
			
			//jmo - Fix rapide pour les certificats intermediaires : 
			//		On charge tous les .pem qui se trouve a la racine de la solution
			if (err == VE_OK || fState.inMaintenance)
			{
				const VFolder *	vfRoot = RetainFolder ( );
				
				if ( vfRoot != 0 )
				{
					ServerNetTools::AddIntermediateCertificateDirectory(*vfRoot);
					vfRoot-> Release ( );
				}
			}

			if (err == VE_OK || fState.inMaintenance)
			{
				// Build the ServerAdmin project file path
				VFilePath serverAdminProjectPath;
				VFolder *folder = VRIAServerApplication::Get()->RetainApplicationResourcesFolder();
				if (folder != NULL)
				{
					folder->GetPath( serverAdminProjectPath);
					serverAdminProjectPath.ToSubFolder( L"Default Solution");
					serverAdminProjectPath.ToSubFolder( L"Admin");	// sc 18/02/2011 "ServerAdmin" become "Admin"
					serverAdminProjectPath.SetFileName( L"ServerAdmin", false);
					serverAdminProjectPath.SetExtension( RIAFileKind::kProjectFileExtension);
				}
				ReleaseRefCountable( &folder);

				// Opening the applications
				if (fApplicationsMutex.Lock())
				{
					// Note: the ServerAdmin project may be the project of the default solution
					// or the ServerAdmin project added to a solution which has none admin project.
					bool hasAdmin = false;
					VProject *serverAdminProject = fDesignSolution->GetProjectFromFilePathOfProjectFile( serverAdminProjectPath);

					bool ignoreProjectOpeningErrors = !fSettings.GetStopIfProjectFails();
					fGarbageCollect = fSettings.GetGarbageCollect();

					VectorOfProjects designProjects;
					fDesignSolution->GetVectorOfProjects( designProjects);
					for (VectorOfProjects::iterator iter = designProjects.begin() ; iter != designProjects.end() && (err == VE_OK || fState.inMaintenance) ; ++iter)
					{
						if (*iter != NULL)
						{
							VRIAServerProject *application = NULL;

							// Create opening parameters
							VRIAServerProjectOpeningParameters *projectOpeningParams = new VRIAServerProjectOpeningParameters();
							if (projectOpeningParams != NULL)
							{
								projectOpeningParams->SetOpeningMode( fState.inMaintenance ? ePOM_FOR_MAINTENANCE : ePOM_FOR_RUNNING);

								bool isServerAdminProject = (*iter == serverAdminProject);
								if (isServerAdminProject)
								{
									sLONG defaultAdminPort = -1, dftAdminSSLPort = -1;
									VString authType;

									if (fOpeningParameters->GetCustomAdministratorHttpPort( defaultAdminPort))
										projectOpeningParams->SetCustomHttpPort( defaultAdminPort);

									if (fOpeningParameters->GetCustomAdministratorSSLPort( dftAdminSSLPort))
										projectOpeningParams->SetCustomSSLPort( dftAdminSSLPort);

									if (fOpeningParameters->GetCustomAdministratorAuthType( authType))
										projectOpeningParams->SetCustomAuthenticationType( authType);

									projectOpeningParams->SetHandlesDebuggerServer( fOpeningParameters->GetAdministratorHandlesDebugger());
									projectOpeningParams->SetHandlesServerSupervisor( true);

									WAKDebuggerType_t dbgType = NO_DEBUGGER_TYPE;
									if (fOpeningParameters->GetDebuggerType( dbgType))
										projectOpeningParams->SetDebuggerType( dbgType);
								}
															
								// for Default solution, pass the WebAdmin opening parameters
								application = VRIAServerProject::OpenProject( err, this, *iter, projectOpeningParams);
								if ((application != NULL) && (err == VE_OK || fState.inMaintenance))
								{
									VUUID uuid;
									application->GetUUID( uuid);
									xbox_assert(!uuid.IsNull());
									
									// sc 17/04/2013, because it handles the debugger, the "ServerAdmin" project must be the first started project
									if (isServerAdminProject)
										fApplicationsCollection.insert( fApplicationsCollection.begin(), VRefPtr<VRIAServerProject>(application));
									else
										fApplicationsCollection.push_back( VRefPtr<VRIAServerProject>(application));

									fApplicationsMap[uuid] = VRefPtr<VRIAServerProject>(application);
									hasAdmin |= application->IsAdministrator();
								}
								ReleaseRefCountable( &projectOpeningParams);
							}
							else
							{
								err = vThrowError( VE_MEMORY_FULL);
							}

							if (err != VE_OK)
							{
								VString name;
								(*iter)->GetName( name);
								err = vThrowError( VE_RIA_CANNOT_OPEN_PROJECT, name);

								if (!fState.inMaintenance)
								{
									if (application != NULL)
										application->Close();

									if (ignoreProjectOpeningErrors)
										err = VE_OK;
								}
							}
							ReleaseRefCountable( &application);
						}
					}

					if (!hasAdmin && !fState.inMaintenance && (err == VE_OK))
					{
						VFile file( serverAdminProjectPath);
						if (file.Exists())
						{
							VURL url( serverAdminProjectPath);
							fDesignSolution->AddExistingProject( url, false);

							VProject *designProject = fDesignSolution->GetProjectFromFilePathOfProjectFile( serverAdminProjectPath);
							if (designProject != NULL)
							{
								VRIAServerProject *application = NULL;

								// Create opening parameters
								VRIAServerProjectOpeningParameters *projectOpeningParams = new VRIAServerProjectOpeningParameters();
								if (projectOpeningParams != NULL)
								{
									projectOpeningParams->SetOpeningMode( ePOM_FOR_RUNNING);

									sLONG defaultAdminPort = -1, dftAdminSSLPort = -1;
									if (fOpeningParameters->GetCustomAdministratorHttpPort( defaultAdminPort))
										projectOpeningParams->SetCustomHttpPort( defaultAdminPort);

									if (fOpeningParameters->GetCustomAdministratorSSLPort( dftAdminSSLPort))
										projectOpeningParams->SetCustomSSLPort( dftAdminSSLPort);

									projectOpeningParams->SetCustomAuthenticationType( L"basic");	// sc 15/06/2012 force basic authentication for admin

									projectOpeningParams->SetHandlesDebuggerServer( fOpeningParameters->GetAdministratorHandlesDebugger());
									projectOpeningParams->SetHandlesServerSupervisor( true);

									WAKDebuggerType_t dbgType = NO_DEBUGGER_TYPE;
									if (fOpeningParameters->GetDebuggerType( dbgType))
										projectOpeningParams->SetDebuggerType( dbgType);

									application = VRIAServerProject::OpenProject( err, this, designProject, projectOpeningParams);
									if (application != NULL && err == VE_OK)
									{
										VUUID uuid;
										application->GetUUID( uuid);
										xbox_assert(!uuid.IsNull());

										// sc 17/04/2013, because it handles the debugger, the "ServerAdmin" project must be the first started project
										fApplicationsCollection.insert( fApplicationsCollection.begin(), VRefPtr<VRIAServerProject>(application));
										fApplicationsMap[uuid] = VRefPtr<VRIAServerProject>(application);
									}
									ReleaseRefCountable( &projectOpeningParams);
								}
								else
								{
									err = vThrowError( VE_MEMORY_FULL);
								}

								if (err != VE_OK)
								{
									VString name;
									designProject->GetName( name);

									err = vThrowError( VE_RIA_CANNOT_OPEN_PROJECT, name);

									if (application != NULL)
										application->Close();

									if (ignoreProjectOpeningErrors)
										err = VE_OK;
								}
								ReleaseRefCountable( &application);
							}
						}
					}

					fApplicationsMutex.Unlock();
				}
			}

			if (err == VE_OK && !fState.inMaintenance)
			{
				VString			vstrRoot;
				VFolder* vfRoot = RetainFolder();
				if ( vfRoot != 0 )
				{
					VFilePath		vfPathRoot;
					vfRoot->GetPath ( vfPathRoot );
					vfPathRoot.GetPosixPath ( vstrRoot );
					vfRoot->Release ( );
				}
				fWAKBreakpointsManager = new VRemoteDebuggerBreakpointsManager(vstrRoot);
				fWAKBreakpointsManager->SetSolution(fDesignSolution);
				fWAKBreakpointsManager->Load();
			}
		}

		if (err == VE_OK)
			LogMessage( fLoggerID, eL4JML_Information, L"\"" + fName + "\" solution opened");
		else
			LogMessage( fLoggerID, eL4JML_Warning, L"\"" + fName + "\" solution opened with errors");
	}

	fState.opened = true;

	return err;
}


VError VRIAServerSolution::_LoadFileSettings()
{
	VError err = VE_OK;

	if (testAssert(fDesignSolution != NULL))
	{
		VectorOfProjectItems itemsVector;

		fDesignSolution->GetProjectItemsFromTag( kSettingTag, itemsVector);
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


VError VRIAServerSolution::_LoadFileSystemDefinitions()
{
	VError err = VE_OK;
	
	// link solution namespace to process one
	if (testAssert( fFileSystemNamespace == NULL))
		fFileSystemNamespace = new VFileSystemNamespace( VRIAServerApplication::Get()->GetFileSystemNamespace());

	if (fFileSystemNamespace != NULL)
	{
		// load default file system




		// define SOLUTION file system
		VFilePath solutionPath;
		fDesignSolution->GetSolutionFolderPath( solutionPath);
		
		VFileSystem *fs = VFileSystem::Create( CVSTR( "SOLUTION"), solutionPath, eFSO_Default);
		fFileSystemNamespace->RegisterFileSystem( fs);

		xbox_assert( fDesignSolutionFolder == NULL);
		fDesignSolutionFolder = new VFolder( solutionPath, fs);

		ReleaseRefCountable( &fs);

		VFile file( solutionPath, CVSTR( "fileSystems.json"), FPS_POSIX);
		if (file.Exists())
			err = fFileSystemNamespace->LoadFromDefinitionFile( &file);
	}
	
	return err;
}


XBOX::VError VRIAServerSolution::_LoadSystemWorkerDefinitions ( )
{
	VError					vError = VE_OK;
	
	// link solution namespace to process one
	if ( testAssert ( fSystemWorkerNamespace == NULL ) )
		fSystemWorkerNamespace = new VSystemWorkerNamespace ( VRIAServerApplication::Get ( )-> GetSystemWorkerNamespace ( ) );

	if ( fSystemWorkerNamespace != NULL )
	{
		VFilePath			solutionPath;
		fDesignSolution-> GetSolutionFolderPath ( solutionPath );
		
		VFile				vflSysWorkers ( solutionPath, CVSTR ( "systemWorkers.json"), FPS_POSIX );
		if ( fFileSystemNamespace != NULL && vflSysWorkers. Exists ( ) )
			vError = fSystemWorkerNamespace-> LoadFromDefinitionFile ( &vflSysWorkers, *fFileSystemNamespace );
	}
	
	return vError;
}


VError VRIAServerSolution::_LoadDatabaseSettings()
{
	VError err = VE_OK;
	//O.R.: removed previous retain which was actually used only to check that fSettings had database-related settings
	if (fSettings.HasDatabaseSettings() )
	{
		// Set the DB4D cache size
		CDB4DManager *db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
		if (db4dMgr != NULL)
		{
			// done from the function allocDatabaseCache() in init.cpp
			VSize minsizeblockmem = 0, wantedSizeBlockMem = 0, allocatedSize = 0, minSizeToFlush = 0;

			// calculate the wanted cache size
			if (fSettings.GetAdaptiveCache())
			{
				minsizeblockmem = ((VSize) fSettings.GetMinimumCacheSize()) * 1024 * 1024;

				sLONG8 maxCacheSize = ((sLONG8) fSettings.GetMaximumCacheSize()) * 1024 * 1024;
				sLONG8 minCacheSize = minsizeblockmem;
				sLONG8 minReservedSize = ((sLONG8) fSettings.GetMemoryForOtherApplications()) * 1024 * 1024;
				sLONG ourPercent = fSettings.GetMemoryForCache();
				
				VSize mandatoryMinimum = db4dMgr->GetMinimumCacheSize();

				if(minCacheSize < mandatoryMinimum)
					minCacheSize = mandatoryMinimum;

				if(maxCacheSize < minCacheSize)
					maxCacheSize = minCacheSize;
				
				if (minCacheSize == maxCacheSize)
				{
					wantedSizeBlockMem = minCacheSize;
				}
				else
				{
					sLONG8 cacheSize = 0;
					sLONG8 memMax = VSystem::GetPhysicalMemSize();

					if (memMax > minReservedSize)
						cacheSize = (memMax - minReservedSize)/100 * ourPercent;
					else
						cacheSize = minCacheSize;

					if (cacheSize > maxCacheSize)
						cacheSize = maxCacheSize;
					if (cacheSize < minCacheSize)
						cacheSize = minCacheSize;

					wantedSizeBlockMem = (VSize) cacheSize;
				}
			}
			else
			{
				minsizeblockmem = ((VSize) fSettings.GetFixedCacheSize()) * 1024 * 1024;
				wantedSizeBlockMem = minsizeblockmem;
			}
		
			err = db4dMgr->SetCacheSize( wantedSizeBlockMem, fSettings.GetKeepCacheInMemory(), &allocatedSize);

			// Calculate the minimum size to flush
			if ( allocatedSize <= 2*1024L*1024L)
			{
				minSizeToFlush = allocatedSize/4L;	// en dessous de 2 Mo: 25%
			}
			else
			{
				double r = (double) allocatedSize / (1024L*1024L);
				minSizeToFlush = (VSize) (1024.0 * 1024.0 * ::log(r));
				if (minSizeToFlush < 512L*1024L)
					minSizeToFlush = 512L*1024L;
			}

			db4dMgr->SetMinSizeToFlush( minSizeToFlush);

			if ((allocatedSize < minsizeblockmem) && ((((double) (minsizeblockmem - allocatedSize)) / ((double) minsizeblockmem)) > 0.01))
			{
				// TBD: returns a warning
			}

			// Set the data cache flush delay
			VRIAServerApplication::Get()->SetDataCacheFlushDelay( fSettings.GetFlushDataInterval() * 1000);
		}
		else
		{
			err = vThrowError( VE_RIA_DB4D_COMPONENT_NOT_FOUND);
		}
	}
	return err;	
}


CUAGDirectory* VRIAServerSolution::_OpenUAGDirectory( VError& outError)
{
	outError = VE_OK;

	CUAGDirectory *directory = nil;

	CUAGManager *uag = VComponentManager::RetainComponentOfType<CUAGManager>();
	if (uag != NULL)
	{
		if (testAssert(fDesignSolution != NULL))
		{
			VFolder *cacheFolder = NULL;
			VString posixPath;
			fSettings.GetDirectoryCacheFolder( posixPath);
			if (!posixPath.IsEmpty())
			{
				if (fDesignSolution->ResolvePosixPathMacros( posixPath))
				{
					VFilePath solutionFolderPath;
					fDesignSolution->GetSolutionFolderPath( solutionFolderPath);
					VFilePath cacheFolderPath( solutionFolderPath, posixPath, FPS_POSIX);
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
				VProjectItem *dirItem = fDesignSolution->GetProjectItemFromTag( kUAGDirectoryTag);
				if (dirItem != NULL)
				{
					VFilePath directoryPath;
					dirItem->GetFilePath( directoryPath);

					VFile file( directoryPath);
					directory = uag->RetainDirectory( file, FA_READ_WRITE, cacheFolder, NULL, &outError);
				}

				if (directory == NULL && outError == VE_OK)
				{
					VFilePath solpath;
					fDesignSolution->GetSolutionFilePath(solpath);
					solpath.SetExtension(RIAFileKind::kDirectoryFileExtension);
					VFile defaultDirFile(solpath);
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


VRIAPermissions* VRIAServerSolution::_LoadPermissionFile( VError& outError)
{
	VRIAPermissions *permissions = NULL;

	outError = VE_OK;

	if (testAssert(fDesignSolution != NULL))
	{
		VProjectItem *item = fDesignSolution->GetProjectItemFromTag( kPermissionsTag);
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
					permissions->CheckGroupsValidity( fUAGDirectory);
				}
			}
		}
	}

	return permissions;	
}



// ----------------------------------------------------------------------------



VRIAServerSolutionJSRuntimeDelegate::VRIAServerSolutionJSRuntimeDelegate( VRIAServerSolution* inSolution)
: fSolution(inSolution)
{
}


VRIAServerSolutionJSRuntimeDelegate::~VRIAServerSolutionJSRuntimeDelegate()
{
}


VFolder* VRIAServerSolutionJSRuntimeDelegate::RetainScriptsFolder()
{
	return (fSolution != NULL) ? fSolution->RetainFolder() : NULL;
}


VProgressIndicator* VRIAServerSolutionJSRuntimeDelegate::CreateProgressIndicator( const VString& inTitle)
{
	return NULL;
}


XBOX::VFileSystemNamespace* VRIAServerSolutionJSRuntimeDelegate::RetainRuntimeFileSystemNamespace()
{
	return RetainRefCountable( fSolution->GetFileSystemNamespace());
}

XBOX::VSystemWorkerNamespace* VRIAServerSolutionJSRuntimeDelegate::RetainRuntimeSystemWorkerNamespace()
{
	return RetainRefCountable ( fSolution->GetSystemWorkerNamespace());
}
