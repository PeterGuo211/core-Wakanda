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
#include "VRIAServerSolution.h"
#include "VRIAServerProject.h"
#include "VRIAServerApplication.h"
#include "VRIAServerHTTPSession.h"
#include "VRIAServerComponentBridge.h"
#include "VRIAServerTools.h"
#include "ServerNet/VServerNet.h"
#include "KernelIPC/Sources/VComponentLibrary.cpp"


USING_TOOLBOX_NAMESPACE


VRIAServerComponentBridge::VRIAServerComponentBridge()
{
	fSharedWorkerPool = 0;
	fSharedSelectIOPool = new XBOX::VTCPSelectIOPool ( );
}


VRIAServerComponentBridge::~VRIAServerComponentBridge()
{
}


VError VRIAServerComponentBridge::Register()
{
	return VE_OK;
}


VError VRIAServerComponentBridge::UnRegister()
{
	return VE_OK;
}


CComponent* VRIAServerComponentBridge::ComponentCreator( CType inType, CType inFamily)
{
	if (inType == CRIAServerComponentBridge::Component_Type)
		return new VRIAServerComponentBridge();
	else
		return NULL;
}


RIASolutionRef VRIAServerComponentBridge::GetSolutionRef( RIApplicationRef inApplicationRef)
{
	RIASolutionRef solutionRef = NULL;

	if (inApplicationRef != NULL)
	{
		VRIAServerProject *application = reinterpret_cast<VRIAServerProject*>(inApplicationRef);
		if (application != NULL)
		{
			solutionRef = (RIASolutionRef) application->GetSolution();
		}
	}

	return solutionRef;
}


VFileSystemNamespace* VRIAServerComponentBridge::RetainRuntimeFileSystemNamespace(RIApplicationRef inApplicationRef)
{
	VFileSystemNamespace* result = nil;
	if (inApplicationRef != NULL)
	{
		VRIAServerProject *application = reinterpret_cast<VRIAServerProject*>(inApplicationRef);
		if (application != NULL)
		{
			result = RetainRefCountable(application->GetFileSystemNamespace());
		}
	}
	return result;
}


VJSGlobalContext* VRIAServerComponentBridge::RetainJSContext( RIApplicationRef inApplicationRef, VError& outError, bool inReusable, const IHTTPRequest* inRequest)
{
	VJSGlobalContext *context = NULL;

	if (inApplicationRef != NULL)
	{
		VRIAServerProject *application = reinterpret_cast<VRIAServerProject*>(inApplicationRef);
		if (application != NULL)
		{
			context = application->RetainJSContext( outError, inReusable, inRequest);
		}
	}

	return context;
}


VError VRIAServerComponentBridge::ReleaseJSContext( RIApplicationRef inApplicationRef, VJSGlobalContext* inContext, IHTTPResponse* inResponse)
{
	if (inApplicationRef != NULL)
	{
		VRIAServerProject *application = reinterpret_cast<VRIAServerProject*>(inApplicationRef);
		if (application != NULL)
		{
			application->ReleaseJSContext( inContext, inResponse);
		}
	}

	return VE_OK;
}


VError VRIAServerComponentBridge::AppendJSContextRequiredScript( RIApplicationRef inApplicationRef, const VFilePath& inPath)
{
	if (inApplicationRef != NULL)
	{
		VRIAServerProject *application = reinterpret_cast<VRIAServerProject*>(inApplicationRef);
		if (application != NULL)
		{
			application->AppendJSContextRequiredScript( inPath);
		}
	}

	return VE_OK;
}


VError VRIAServerComponentBridge::GetJSContextInformations( RIApplicationRef inApplicationRef, VValueBag& outBag)
{
	VError err = VE_OK;

	if (inApplicationRef != NULL)
	{
		VRIAServerProject *application = reinterpret_cast<VRIAServerProject*>(inApplicationRef);
		if (application != NULL)
		{
			err = application->GetJSContextInformations( outBag);
		}
	}

	return err;
}


CUAGDirectory* VRIAServerComponentBridge::RetainUAGDirectory( RIApplicationRef inApplicationRef, VError& outError)
{
	CUAGDirectory *uagDirectory = NULL;
	
	if (inApplicationRef != NULL)
	{
		VRIAServerProject *application = reinterpret_cast<VRIAServerProject*>(inApplicationRef);
		if (application != NULL)
		{
			uagDirectory = application->RetainUAGDirectory( &outError);
		}
	}	
	return uagDirectory;
}


VError VRIAServerComponentBridge::JS4DGarbageCollect()
{
	VRIAServerJSContextMgr *mgr = VRIAServerApplication::Get()->GetJSContextMgr();
	if (mgr != NULL)
	{
		mgr->GarbageCollect();
	}
	return VE_OK;
}


CUAGSession* VRIAServerComponentBridge::RetainUAGSession(const VJSGlobalContext* inContext)
{
	CUAGSession *uagSession = NULL;

	VJSContext jsContext( inContext);
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
	if (rtContext != NULL)
	{
		uagSession = rtContext->RetainUAGSession();
	}

	return uagSession;
}


XBOX::VError VRIAServerComponentBridge::SetUAGSession(const VJSGlobalContext* inContext, CUAGSession *inUAGSession)
{
	VError err = VE_OK;

	VJSContext jsContext( inContext);
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
	if (rtContext != NULL)
	{
		err = rtContext->SetUAGSession(inUAGSession);
	}
	return err;
}


XBOX::VError VRIAServerComponentBridge::ReleaseExpiredUAGSessions()
{
	VRIAServerSolution *solution = VRIAServerApplication::Get()->RetainCurrentSolution();
	if (solution != NULL)
	{
		VectorOfApplication applications;
		
		solution->GetApplications( applications);
		for (VectorOfApplication_iter appIter = applications.begin() ; appIter != applications.end() ; ++appIter)
		{
			VRIAHTTPSessionManager *sessionMgr = (*appIter)->RetainSessionMgr();
			if (sessionMgr != NULL)
			{
				sessionMgr->RemoveExpiredSessions();
				sessionMgr->Release();
			}
		}

		solution->Release();
	}
	return VE_OK;
}


XBOX::VError VRIAServerComponentBridge::RetainSessions(const XBOX::VUUID& inUserID, std::vector<XBOX::VRefPtr<CUAGSession> >& outSessions)
{
	VRIAServerSolution *solution = VRIAServerApplication::Get()->RetainCurrentSolution();
	if (solution != NULL)
	{
		VectorOfApplication applications;

		solution->GetApplications( applications);
		for (VectorOfApplication_iter appIter = applications.begin() ; appIter != applications.end() ; ++appIter)
		{
			VRIAHTTPSessionManager *sessionMgr = (*appIter)->RetainSessionMgr();
			if (sessionMgr != NULL)
			{
				VRIAHTTPSessionManager::SessionVector sessions;
				sessionMgr->RetainSessions(inUserID, sessions);
				outSessions.insert(outSessions.end(), sessions.begin(), sessions.end());
				sessionMgr->Release();
			}
		}

		solution->Release();
	}
	return VE_OK;
}


XBOX::VProgressIndicator*	VRIAServerComponentBridge::CreateProgressIndicator()
{
	return new XBOX::VProgressIndicator();
}
XBOX::VWorkerPool* VRIAServerComponentBridge::GetSharedWorkerPool ( )
{
	if ( fSharedWorkerPool == 0 )
	{
		fSharedWorkerPool = new XBOX::VWorkerPool ( 0, 5, 60, 2, kMAX_sWORD );

		/*XBOX::VString					vstrSpareTaskName;
		Localize4DString ( CVSTR ( "MONI_PROCESS_Type9" ), vstrSpareTaskName );
		fSharedWorkerPool-> SetSpareTaskName ( vstrSpareTaskName );*/
	}

	return fSharedWorkerPool;
}

void VRIAServerComponentBridge::StopSharedWorkerPool ( )
{
	if ( !fSharedWorkerPool )
		return;
		
	fSharedWorkerPool-> Release ( );
	fSharedWorkerPool = 0;
}

XBOX::VTCPSelectIOPool* VRIAServerComponentBridge::GetSharedSelectIOPool ( )
{
	return fSharedSelectIOPool;
}

void VRIAServerComponentBridge::StopSharedSelectIOPool ( )
{
	if ( !fSharedSelectIOPool )
		return;
		
	fSharedSelectIOPool-> Release ( );
	fSharedSelectIOPool = 0;
}


VLocalizationManager* VRIAServerComponentBridge::RetainLocalizationManager()
{
	return VRIAServerApplication::Get()->RetainLocalizer();
}


XBOX::VFolder* VRIAServerComponentBridge::RetainWaLibFolder()
{
	XBOX::VFilePath path;
	VRIAServerApplication::Get()->GetWALibraryFolderPath(path);
	return new XBOX::VFolder(path);
}


XBOX::VError VRIAServerComponentBridge::ConvertImageToPreferredFormat( XBOX::VValueSingle& ioValPicture, const std::vector<XBOX::VString*>& inPreferredImageFormats)
{
	xbox_assert( false);
	return VE_UNIMPLEMENTED;
}


/* A required symbol for components mechanism to link. */
void XBOX::xDllMain ( void )
{
	;
}
