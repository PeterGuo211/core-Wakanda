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
#include "VRIAServerTools.h"
#include "VRIAServerApplication.h"
#include "VRIAServerProjectContext.h"
#include "DB4D/Headers/DB4D.h"
#include "VRPCCatalog.h"
#include "VJSApplication.h"
#include "VRIAServerJSAPI.h"
#include "VJSSolution.h"
#include "VRIAServerJSContextMgr.h"
#include "VRIAServerHTTPSession.h"
#include "JavaScript/Sources/VJSJSON.h"
#include "Language Syntax/CLanguageSyntax.h"
#include "VRIAServerJSCore.h"
#include "VJSRPCServiceCore.h"

USING_TOOLBOX_NAMESPACE


const uLONG kINCLUDED_FILES_CHANGES_CHECK_DELAY = 1000; // in milliseconds


// ----------------------------------------------------------------------------



VRIAServerJSContextMgr::VRIAServerJSContextMgr()
: fPoolsAreBeingCleaned(0)
{
}


VRIAServerJSContextMgr::~VRIAServerJSContextMgr()
{
	xbox_assert(fSetOfPool.empty());
}


VJSContextPool* VRIAServerJSContextMgr::CreateJSContextPool( VError& outError, IJSContextPoolDelegate* inDelegate)
{
	outError = VE_OK;
	VJSContextPool *pool = new VJSContextPool( this, inDelegate);

	if (pool != NULL)
	{
		_RegisterPool( pool);
	}
	else
	{
		outError = vThrowError( VE_MEMORY_FULL);
	}
	return pool;
}


void VRIAServerJSContextMgr::GarbageCollect()
{
	if (fSetOfPoolMutex.Lock())
	{
		for (SetOfPool_iter iter = fSetOfPool.begin() ; iter != fSetOfPool.end() ; ++iter)
		{
			(*iter)->GarbageCollect();
		}
		fSetOfPoolMutex.Unlock();
	}
}


VJSGlobalContext* VRIAServerJSContextMgr::RetainJSContext( VError& outError, const VJSContext& inParentContext, bool inReusable)
{
	VJSGlobalContext *result = NULL;
	outError = VE_OK;

	if (inParentContext != NULL)
	{
		VRIAJSRuntimeContext *runtimeContext = VRIAJSRuntimeContext::GetFromJSContext( inParentContext);
		if (runtimeContext != NULL)
		{
			VRIAServerProject *application = runtimeContext->GetRootApplication();
			if (application != NULL)
			{
				result = application->RetainJSContext( outError, inReusable, NULL);
			}
			else
			{
				result = VRIAServerApplication::Get()->RetainJSContext( outError, inReusable);
			}
		}
	}

	return result;
}


VError VRIAServerJSContextMgr::ReleaseJSContext( VJSGlobalContext* inContext)
{
	VError err = VE_OK;

	if (inContext != NULL)
	{
		VRIAServerProject *application = NULL;

		// sc 28/05/2012, ensure the VJSContext object is destroyed before release the context
		{
			VJSContext jsContext( inContext);
			VRIAJSRuntimeContext *runtimeContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
			if (runtimeContext != NULL)
			{
				application = runtimeContext->GetRootApplication();
			}
		}

		if (application != NULL)
		{
			application->ReleaseJSContext( inContext, NULL);
		}
		else
		{
			err = VRIAServerApplication::Get()->ReleaseJSContext( inContext);
		}
	}

	return err;
}

#if VJSWORKER_WITH_PROJECT_INFO_RETAIN_JS

void *VRIAServerJSContextMgr::GetProjectInfo (XBOX::VError &outError, const XBOX::VJSContext &inParentContext)
{
	outError = VE_OK;

	if (inParentContext != NULL)

		return (void *) VRIAJSRuntimeContext::GetFromJSContext(inParentContext);

	else

		return NULL;
}

XBOX::VJSGlobalContext *VRIAServerJSContextMgr::RetainJSContext (XBOX::VError &outError, void *inProjectInfo, bool inReusable)
{
	XBOX::VJSGlobalContext	*result			= NULL;
	VRIAJSRuntimeContext	*runtimeContext	= (VRIAJSRuntimeContext *) inProjectInfo;
		
	outError = VE_OK;
	if (runtimeContext != NULL)	{

		VRIAServerProject *application = runtimeContext->GetRootApplication();
		if (application != NULL)

			result = application->RetainJSContext(outError, inReusable, NULL);

		else

			result = VRIAServerApplication::Get()->RetainJSContext(outError, inReusable);
		
	}

	return result;
}

#endif

void VRIAServerJSContextMgr::GetAllPools( std::vector<VJSContextPool*>& outPools) const
{
	outPools.clear();
	if (fSetOfPoolMutex.Lock())
	{
		for (SetOfPool_citer iter = fSetOfPool.begin() ; iter != fSetOfPool.end() ; ++iter)
			outPools.push_back( *iter);

		fSetOfPoolMutex.Unlock();
	}
}


void VRIAServerJSContextMgr::BeginPoolsCleanup()
{
	if (testAssert(fPoolsAreBeingCleaned == 0))
	{
		++fPoolsAreBeingCleaned;

		if (fSetOfPoolMutex.Lock())
		{
			for (SetOfPool_iter iter = fSetOfPool.begin() ; iter != fSetOfPool.end() ; ++iter)
				(*iter)->Touch();

			fSetOfPoolMutex.Unlock();
		}
		fBeginContextPoolsCleanupSignal();
	}
}


void VRIAServerJSContextMgr::EndPoolsCleanup()
{
	if (testAssert(fPoolsAreBeingCleaned == 1))
	{
		--fPoolsAreBeingCleaned;
		fEndContextPoolsCleanupSignal();
	}
}


VError VRIAServerJSContextMgr::CleanAllPools( sLONG inTimeoutMs, uLONG* outRemainingContexts, std::vector<JSWorkerInfo>* outWorkersInfos)
{
	VError err = VE_OK;

	xbox_assert(fPoolsAreBeingCleaned > 0);

	// First, ask for aborting all JS contexts paused in debug mode
	if (VRIAServerApplication::Get()->GetDebuggingAuthorized())
	{
		VJSGlobalContext::AbortAllDebug();
	}

	// Ask for terminating all workers
	VJSWorker::TerminateAll();
	
	if (fSetOfPoolMutex.Lock())
	{
		// Wait for number of used contexts equal 0 with a maximum timeout
		uLONG maxTime = VSystem::GetCurrentTime() + inTimeoutMs;
		uLONG usedContextsCount = 0;

		do
		{
			usedContextsCount = 0;

			for (SetOfPool_iter iter = fSetOfPool.begin() ; iter != fSetOfPool.end() ; ++iter)
			{
				usedContextsCount += (*iter)->GetUsedContextsCount();
			}

			if ((usedContextsCount > 0) && (VSystem::GetCurrentTime() < maxTime))
			{
				VTask::GetCurrent()->Sleep( 100);
				continue;
			}

		} while ((usedContextsCount > 0) && (VSystem::GetCurrentTime() < maxTime));

		usedContextsCount = 0;

		// Release all unused contexts
		for (SetOfPool_iter iter = fSetOfPool.begin() ; iter != fSetOfPool.end() ; ++iter)
		{
			sLONG usedContextsCountByPool = (*iter)->GetUsedContextsCount();
			usedContextsCount += usedContextsCountByPool;
			if ((usedContextsCountByPool > 0) && (outWorkersInfos != NULL))
			{
				std::vector<JSWorkerInfo> workersInfos;
				(*iter)->GetWorkersInformations( workersInfos);
				outWorkersInfos->insert( outWorkersInfos->end(), workersInfos.begin(), workersInfos.end());
			}
			(*iter)->Clean();
		}

		if (outRemainingContexts != NULL)
			*outRemainingContexts = usedContextsCount;

		fSetOfPoolMutex.Unlock();
	}

	return err;
}


void VRIAServerJSContextMgr::_RegisterPool( VJSContextPool *inPool)
{
	if (inPool == NULL)
		return;

	if (fSetOfPoolMutex.Lock())
	{
		fSetOfPool.insert( inPool);
		fSetOfPoolMutex.Unlock();
	}

	return;
}


void VRIAServerJSContextMgr::_UnRegisterPool( VJSContextPool *inPool)
{
	if (inPool == NULL)
		return;

	if (fSetOfPoolMutex.Lock())
	{
		SetOfPool_iter found = fSetOfPool.find( inPool);
		if (found != fSetOfPool.end())
		{
			fSetOfPool.erase( found);
		}
		fSetOfPoolMutex.Unlock();
	}
}



// ----------------------------------------------------------------------------



VRIAJSRuntimeContext::VRIAJSRuntimeContext()
: fRootApplication(NULL), fCurrentUAGSession(NULL)
{
	fGlobalContext = NULL;
}


VRIAJSRuntimeContext::VRIAJSRuntimeContext( VRIAServerProject* inRootApplication)
: fRootApplication(inRootApplication), fCurrentUAGSession(NULL)
{
	fGlobalContext = NULL;
}


VRIAJSRuntimeContext::~VRIAJSRuntimeContext()
{
	fContextMap.clear();
	QuickReleaseRefCountable( fCurrentUAGSession);
}


VRIAServerProject* VRIAJSRuntimeContext::GetRootApplication() const
{
	return fRootApplication;
}


VRIAServerSolution* VRIAJSRuntimeContext::GetRootSolution() const
{
	if (fRootApplication != NULL)
		return fRootApplication->GetSolution();

	return NULL;
}


VError VRIAJSRuntimeContext::InitializeJSContext( VJSGlobalContext* inContext, VRIAServerProject *inRootApplication)
{	
	if (inContext == NULL)
		return VE_INVALID_PARAMETER;

	VError err = VE_OK;
	VJSContext jsContext( inContext);
	VRIAJSRuntimeContext *runtimeContext = GetFromJSContext( jsContext);
	if (testAssert(runtimeContext == NULL))
	{
		runtimeContext = new VRIAJSRuntimeContext( inRootApplication);
		if (runtimeContext != NULL)
		{
			// Attach this runtime context
			if (runtimeContext->_AttachToJSContext( jsContext))
			{
				runtimeContext->fGlobalContext = inContext;
				// Attach the db4d context
				CDB4DManager *db4d = VRIAServerApplication::Get()->GetComponentDB4D();
				if (db4d != NULL)
				{
					VUUID uuid( true);
					CDB4DContext *db4dContext = db4d->RetainOrCreateContext( uuid, NULL, inContext);
					if (db4dContext != NULL)
					{
						db4d->InitializeJSContext( inContext, db4dContext);
						ReleaseRefCountable( &db4dContext);
					}
					else
					{
						err = VE_UNKNOWN_ERROR;
					}
				}
				else
				{
					err = vThrowError( VE_RIA_DB4D_COMPONENT_NOT_FOUND);
				}

				if (err == VE_OK && runtimeContext->fRootApplication != NULL)
				{
					if (runtimeContext->fRootApplication->GetSolution() != NULL)
						err = runtimeContext->AttachSolution( jsContext, runtimeContext->fRootApplication->GetSolution());
				#if WITH_SANDBOXED_PROJECT
					else if ((runtimeContext->fRootApplication != NULL) && runtimeContext->fRootApplication->IsSandboxed())
						err = runtimeContext->AttachProject( jsContext, runtimeContext->fRootApplication);
				#endif
				}

			#if WITH_SANDBOXED_PROJECT
				if (err == VE_OK)
				{
					VJSObject globalObject( jsContext.GetGlobalObject());
					globalObject.SetProperty( L"server", VJSServer::CreateInstance( jsContext, NULL));
				}
			#endif
			}
			else
			{
				err = VE_UNKNOWN_ERROR;
			}

			ReleaseRefCountable( &runtimeContext);
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
		err = vThrowError( VE_RIA_JS_CANNOT_INITIALIZE_CONTEXT);

	return err;
}


VError VRIAJSRuntimeContext::UninitializeJSContext( VJSGlobalContext* inContext)
{
	if (inContext == NULL)
		return VE_INVALID_PARAMETER;
	
	VError err = VE_OK;
	VJSContext jsContext( inContext);
	VRIAJSRuntimeContext *runtimeContext = GetFromJSContext( jsContext);
	if (testAssert(runtimeContext != NULL))
	{
		if (runtimeContext->GetRootSolution() != NULL)
			runtimeContext->DetachSolution( jsContext, runtimeContext->GetRootSolution());
	#if WITH_SANDBOXED_PROJECT
		else if ((runtimeContext->GetRootApplication() != NULL) && runtimeContext->GetRootApplication()->IsSandboxed())
			err = runtimeContext->DetachProject( jsContext, runtimeContext->GetRootApplication());
	#endif

		xbox_assert(runtimeContext->fContextMap.size() == 0);
		
		// Detach the db4d context
		CDB4DManager *db4d = VRIAServerApplication::Get()->GetComponentDB4D();
		if (db4d != NULL)
		{
			db4d->UninitializeJSContext( inContext);
		}
		else
		{
			err = vThrowError( VE_RIA_DB4D_COMPONENT_NOT_FOUND);
		}

		// Detach the runtime context
		runtimeContext->_DetachFromJSContext( jsContext);
	}
	else
	{
		err =  VE_UNKNOWN_ERROR;
	}

	if (err != VE_OK)
		err = vThrowError( VE_RIA_JS_CANNOT_UNINITIALIZE_CONTEXT);
	
	return err;
}


XBOX::VError VRIAJSRuntimeContext::AttachSolution( const XBOX::VJSContext& inContext, VRIAServerSolution *inSolution)
{
	if (inSolution == NULL)
		return VE_INVALID_PARAMETER;

	VRIAJSRuntimeContext *runtimeContext = GetFromJSContext( inContext);
	if (runtimeContext != this)
		return VE_UNKNOWN_ERROR;

	// For each application, create an application context and a database context if needed.
	VError err = VE_OK;
	VectorOfApplication appCollection;
	inSolution->GetApplications( appCollection);

	for (VectorOfApplication_iter iter = appCollection.begin() ; iter != appCollection.end() ; ++iter)
	{
		if (!iter->IsNull())
		{
			if (fContextMap.find( *iter) == fContextMap.end())
			{
				// Create the application context
				VRIAContext *riaContext = (*iter)->RetainNewContext( err);
				if (err == VE_OK && riaContext != NULL)
				{
					// Register the application context
					fContextMap[*iter] = VRefPtr<VRIAContext>(riaContext);

					CDB4DBase *base = (*iter)->RetainDatabase( riaContext);
					if (base != NULL)
					{
						CDB4DManager *db4d = VRIAServerApplication::Get()->GetComponentDB4D();
						if (db4d != NULL)
						{
							CDB4DContext *db4dContext = db4d->GetDB4DContextFromJSContext( inContext);
							if (db4dContext != NULL)
							{
								// Create and register the database context
								CDB4DBaseContext *baseContext = db4dContext->RetainDataBaseContext( base, true, false);
								if (baseContext != NULL)
									riaContext->SetBaseContext( baseContext);
								else
									err = VE_UNKNOWN_ERROR;
							}
							else
							{
								err = VE_UNKNOWN_ERROR;
							}
						}
						else
						{
							err = VE_RIA_DB4D_COMPONENT_NOT_FOUND;
						}

						base->Release();
					}	
				}
				ReleaseRefCountable( &riaContext);
			}
		}
	}

	return err;
}


XBOX::VError VRIAJSRuntimeContext::DetachSolution( const XBOX::VJSContext& inContext, VRIAServerSolution *inSolution)
{
	if (inContext == NULL || inSolution == NULL)
		return VE_INVALID_PARAMETER;

	VRIAJSRuntimeContext *runtimeContext = GetFromJSContext( inContext);
	if (runtimeContext != this)
		return VE_UNKNOWN_ERROR;

	// For each application, release the application context and the database context if needed.
	VError err = VE_OK;
	VectorOfApplication appCollection;
	inSolution->GetApplications( appCollection);

	for (VectorOfApplication_iter iter = appCollection.begin() ; (iter != appCollection.end()) && (err == VE_OK) ; ++iter)
	{
		if (!iter->IsNull())
		{
			MapOfRIAContext_iter found = fContextMap.find( *iter);
			if (found != fContextMap.end())
			{
				fContextMap.erase( found);
			}
		}
	}

	return VE_OK;
}


#if WITH_SANDBOXED_PROJECT

VError VRIAJSRuntimeContext::AttachProject( const VJSContext& inContext, VRIAServerProject *inProject)
{
	if (inProject == NULL)
		return VE_INVALID_PARAMETER;

	VRIAJSRuntimeContext *runtimeContext = GetFromJSContext( inContext);
	if (runtimeContext != this)
		return VE_UNKNOWN_ERROR;

	VError err = VE_OK;
	if (fContextMap.find( inProject) == fContextMap.end())
	{
		// Create the application context
		VRIAContext *riaContext = inProject->RetainNewContext( err);
		if (err == VE_OK && riaContext != NULL)
		{
			// Register the application context
			fContextMap[inProject] = VRefPtr<VRIAContext>(riaContext);

			CDB4DBase *base = (inProject)->RetainDatabase( riaContext);
			if (base != NULL)
			{
				CDB4DManager *db4d = VRIAServerApplication::Get()->GetComponentDB4D();
				if (db4d != NULL)
				{
					CDB4DContext *db4dContext = db4d->GetDB4DContextFromJSContext( inContext);
					if (db4dContext != NULL)
					{
						// Create and register the database context
						CDB4DBaseContext *baseContext = db4dContext->RetainDataBaseContext( base, true, false);
						if (baseContext != NULL)
							riaContext->SetBaseContext( baseContext);
						else
							err = VE_UNKNOWN_ERROR;
					}
					else
					{
						err = VE_UNKNOWN_ERROR;
					}
				}
				else
				{
					err = VE_RIA_DB4D_COMPONENT_NOT_FOUND;
				}

				base->Release();
			}	
		}
		ReleaseRefCountable( &riaContext);
	}

	return err;
}


VError VRIAJSRuntimeContext::DetachProject( const VJSContext& inContext, VRIAServerProject *inProject)
{
	if (inContext == NULL || inProject == NULL)
		return VE_INVALID_PARAMETER;

	VRIAJSRuntimeContext *runtimeContext = GetFromJSContext( inContext);
	if (runtimeContext != this)
		return VE_UNKNOWN_ERROR;

	MapOfRIAContext_iter found = fContextMap.find( inProject);
	if (found != fContextMap.end())
	{
		fContextMap.erase( found);
	}

	return VE_OK;
}

#endif


XBOX::VJSSessionStorageObject* VRIAJSRuntimeContext::GetSessionStorageObject()
{
	if (fCurrentUAGSession != NULL)
		return fCurrentUAGSession->GetStorageObject();
	else
		return NULL;
}

CUAGSession* VRIAJSRuntimeContext::RetainUAGSession()
{
	return RetainRefCountable(fCurrentUAGSession);
}


CDB4DContext* VRIAJSRuntimeContext::RetainDB4DContext(VRIAServerProject* inApplication)
{
	CDB4DContext* result = NULL;
	VRIAContext* riacontext = GetApplicationContext(inApplication);
	if (riacontext != NULL && riacontext->GetBaseContext() != NULL)
	{
		result = RetainRefCountable(riacontext->GetBaseContext()->GetContextOwner());
	}
	return result;
}


XBOX::VError VRIAJSRuntimeContext::SetUAGSession(CUAGSession* inSession, bool addSession)
{
	VRIAServerProject *application = GetRootApplication();

	if (fCurrentUAGSession != NULL)
	{
		if (fCurrentUAGSession->IsDefault() && !fCurrentUAGSession->IsEmpty() && inSession != NULL)
		{
			inSession->SetStorageObject(fCurrentUAGSession->GetStorageObject());
		}
	}

	CopyRefCountable(&fCurrentUAGSession, inSession);
	if (addSession)
	{
		VRIAHTTPSessionManager* sessionMgr = fRootApplication->RetainSessionMgr();
		if (sessionMgr != NULL)
		{
			sessionMgr->AddSession(fCurrentUAGSession);
			sessionMgr->Release();
		}
	}

	VJSContext jscontext(fGlobalContext);
	VJSSessionStorageObject* storage = GetSessionStorageObject();
	if (storage == NULL)
	{
		VJSValue value( jscontext);
		value.SetNull();
		jscontext.GetGlobalObject().SetProperty( "sessionStorage", value);
	}
	else
    {
        VJSObject	newInst = VJSStorageClass::CreateInstance(jscontext, storage);
        jscontext.GetGlobalObject().SetProperty( "sessionStorage", newInst );
    }

	CDB4DContext* basecontext = RetainDB4DContext(application);
	if (basecontext != NULL)
	{
		VUUID userID;
		userID.SetNull(true);
		basecontext->SetCurrentUser(userID, inSession);
		basecontext->Release();
	}

	return VE_OK;
}



VError VRIAJSRuntimeContext::RegisterApplicationContext( VRIAContext* inContext)
{
	VError err = VE_OK;

	if (inContext != NULL && inContext->GetApplication() != NULL)
	{
		MapOfRIAContext_iter found = fContextMap.find( inContext->GetApplication());
		if (found == fContextMap.end())
		{
			fContextMap[inContext->GetApplication()] = VRefPtr<VRIAContext>(inContext);
		}
	}
	return err;
}


VRIAContext* VRIAJSRuntimeContext::GetApplicationContext( VRIAServerProject* inApplication) const
{
	VRIAContext *context = NULL;

	if (inApplication != NULL)
	{
		MapOfRIAContext_citer found = fContextMap.find( inApplication);
		if (found != fContextMap.end())
		{
			context = found->second.Get();
		}
	}
	return context;
}


VRIAJSRuntimeContext* VRIAJSRuntimeContext::GetFromJSContext( const XBOX::VJSContext& inContext)
{
	return static_cast<VRIAJSRuntimeContext*>( inContext.GetGlobalObjectPrivateInstance()->GetSpecific( 'riax'));
}


VRIAContext* VRIAJSRuntimeContext::GetApplicationContextFromJSContext( const XBOX::VJSContext& inContext, VRIAServerProject* inApplication)
{
	VRIAJSRuntimeContext *rtContext = GetFromJSContext( inContext);
	return (rtContext != NULL) ? rtContext->GetApplicationContext( inApplication) : NULL;
}


VRIAJSRuntimeContext* VRIAJSRuntimeContext::GetFromJSGlobalObject( const XBOX::VJSGlobalObject* inGlobalObject)
{
	if (inGlobalObject != NULL)
		return static_cast<VRIAJSRuntimeContext*>( inGlobalObject->GetSpecific( 'riax'));

	return NULL;
}


bool VRIAJSRuntimeContext::_AttachToJSContext( XBOX::VJSContext& inContext)
{
	bool done = inContext.GetGlobalObjectPrivateInstance()->SetSpecific( 'riax', this, VJSSpecifics::DestructorReleaseVObject);
	if (done)
	{
		Retain();
	}
	return done;
}


bool VRIAJSRuntimeContext::_DetachFromJSContext( XBOX::VJSContext& inContext)
{
	xbox_assert( VRIAJSRuntimeContext::GetFromJSContext( inContext) == this);
	return inContext.GetGlobalObjectPrivateInstance()->SetSpecific( 'riax', NULL, VJSSpecifics::DestructorReleaseVObject);
}



// ----------------------------------------------------------------------------



class VJSContextPoolSpecific : public XBOX::VObject
{
public:
	VJSContextPoolSpecific() {;}
	virtual ~VJSContextPoolSpecific() {;}
};



class VJSContextInfo : public XBOX::VObject
{
public:

	VJSContextInfo() : fGlobalObject(NULL), fDebuggerActive(false), fReusable(false), fStampOfPool(0), fIncludedFilesChangesCheckTime(0) {;}

	VJSContextInfo( const VJSContextInfo& inSource)
	: fGlobalObject(inSource.fGlobalObject)
	, fDebuggerActive(inSource.fDebuggerActive)
	, fReusable( inSource.fReusable)
	, fStampOfPool( inSource.fStampOfPool)
	, fIncludedFilesChangesCheckTime( inSource.fIncludedFilesChangesCheckTime) {;}

	virtual ~VJSContextInfo() {;}

	VJSContextInfo& operator = ( const VJSContextInfo& inSource)
	{
		fGlobalObject = inSource.fGlobalObject;
		fDebuggerActive = inSource.fDebuggerActive;
		fReusable = inSource.fReusable;
		fStampOfPool = inSource.fStampOfPool;
		fIncludedFilesChangesCheckTime = inSource.fIncludedFilesChangesCheckTime;
		return *this;
	}

	void				SetGlobalObject( VJSGlobalObject* inGlobalObject) { fGlobalObject = inGlobalObject; }
	VJSGlobalObject*	GetGlobalObject() const { return fGlobalObject; }

	void				SetDebuggerActive( bool inDebuggerActive) { fDebuggerActive = inDebuggerActive; }
	bool				IsDebuggerActive() const { return fDebuggerActive; }

	void				SetReusable( bool inReusable) { fReusable = inReusable; }
	bool				IsReusable() const { return fReusable; }

	void				SetStampOfPool( uLONG inStamp) { fStampOfPool = inStamp; }
	uLONG				GetStampOfPool() const { return fStampOfPool; }

	void				SetIncludedFilesChangesCheckTime( uLONG inTime) { fIncludedFilesChangesCheckTime = inTime; }
	uLONG				GetIncludedFilesChangesCheckTime() const { return fIncludedFilesChangesCheckTime; }

private:

	XBOX::VJSGlobalObject*	fGlobalObject;
	bool					fDebuggerActive;	// state of the debugger when context was created
	bool					fReusable;
	uLONG					fStampOfPool;		// the stamp of the pool when context was created
	uLONG					fIncludedFilesChangesCheckTime;
};



const size_t kREUSABLE_JSCONTEXT_MAX_COUNT = 50;


VJSContextPool::VJSContextPool()
: fManager(NULL)
, fEnabled(true)
#if USE_V8_ENGINE
// for now, on V8, do not reuse contexts
, fContextReusingEnabled(false)
#else
, fContextReusingEnabled(true)
#endif
, fSize( 50)
, fDelegate(NULL)
, fNoUsedContextEvent(NULL)
, fReusableContextCount(0)
, fStamp(0)
, fUsedContextMaxCount(0)
, fCreatedContextCount(0)
, fDestroyedContextCount(0)
{
	xbox_assert(false);
}


VJSContextPool::VJSContextPool( VRIAServerJSContextMgr *inMgr, IJSContextPoolDelegate* inDelegate)
: fManager(inMgr), fEnabled(true)
#if USE_V8_ENGINE
// for now, on V8, do not reuse contexts
, fContextReusingEnabled(false)
#else
, fContextReusingEnabled(true)
#endif
, fSize( 50)
, fDelegate(inDelegate)
, fNoUsedContextEvent(NULL)
, fReusableContextCount(0)
, fStamp(0)
, fUsedContextMaxCount(0)
, fCreatedContextCount(0)
, fDestroyedContextCount(0)
{
	xbox_assert(fManager != NULL);
}


VJSContextPool::~VJSContextPool()
{
	if (fManager != NULL)
		fManager->_UnRegisterPool( this);

	xbox_assert( (fUsedContexts.size() == 0) && (fUnusedContexts.size() == 0) );
	
	if (fNoUsedContextEvent != NULL)
	{
		if (fNoUsedContextEvent->Unlock())
			QuickReleaseRefCountable( fNoUsedContextEvent);
	}

	fRequiredScripts.clear();
}


VJSGlobalContext* VJSContextPool::RetainNewContext( IJSRuntimeDelegate* inDelegate)
{
	// Register our classes
	_InitGlobalClasses();

	VJSGlobalContext *globalContext = VJSGlobalContext::Create( inDelegate);

	return globalContext;
}


VJSGlobalContext* VJSContextPool::RetainContext( VError& outError, bool inReusable, XBOX::VJSGlobalContext* inPreferedContext)
{
	outError = VE_OK;

	VJSGlobalContext *globalContext = NULL;

	if (fEnabled && !fManager->IsPoolsAreBeingCleaned())
	{
		if (inReusable && fContextReusingEnabled)
		{ 
			// Try to reuse an existing pooled context
			if (fPoolMutex.Lock())
			{
				MapOfJSContext_iter iter = fUnusedContexts.end();
				
				// Try to reuse the prefered context
				if (inPreferedContext != NULL)
					iter = fUnusedContexts.find( inPreferedContext);
				
				if (iter == fUnusedContexts.end())
					iter = fUnusedContexts.begin();

				while ((globalContext == NULL) && (iter != fUnusedContexts.end()))
				{
					xbox_assert(iter->second->IsReusable());

					VJSGlobalObject *globalObject = iter->second->GetGlobalObject();

					// If some included files have been changed or is the pool has been touched, the context is invalid and must not be reused
					bool isInvalid = (iter->second->GetStampOfPool() < fStamp);
					
					// sc 19/06/2014, optimization: check for included files changes at most one time per second
					if (!isInvalid && ((iter->second->GetIncludedFilesChangesCheckTime() + kINCLUDED_FILES_CHANGES_CHECK_DELAY) < VSystem::GetCurrentTime()))
					{
						isInvalid = globalObject->IsIncludedFilesHaveBeenChanged();
						iter->second->SetIncludedFilesChangesCheckTime( VSystem::GetCurrentTime());
					}

					if (globalObject != NULL && isInvalid)
					{
						VJSGlobalContext *gContext = iter->first;
						
						// Remove this context from unused contexts pool
						--fReusableContextCount;
						delete iter->second;
						fUnusedContexts.erase( iter);

						// Release this context
						globalObject->GarbageCollect();
						_ReleaseContext( gContext);
						
						++fDestroyedContextCount;

						iter = fUnusedContexts.begin();
					}
					else
					{
						bool	willBeReused = false;
						VJSContextInfo *info = iter->second;
						if (info)
						{
							if (VJSGlobalContext::IsDebuggerActive())
							{
								willBeReused = info->IsDebuggerActive();
							}
							else
							{
								willBeReused = !info->IsDebuggerActive();
							}
						}
						if (willBeReused)
						{
			 				// The context becomes used
							globalContext = iter->first;
							fUsedContexts[globalContext] = iter->second;
							fUnusedContexts.erase( iter);

							if (fUsedContexts.size() > fUsedContextMaxCount)
								fUsedContextMaxCount = fUsedContexts.size();

							XBOX::VJSContext	context(globalContext);

							VJSWorker::RecycleWorker(context);

						}
						else
						{
							xbox_assert(false);
							globalContext = NULL;
							iter++;
						}
					}
				}
				fPoolMutex.Unlock();
			}
		}

		if (globalContext == NULL)
		{
			// Create a new context
			globalContext = _RetainNewContext( outError);
			if (globalContext != NULL)
			{
				// Reference the context in the pool as used context
				if (fPoolMutex.Lock())
				{
					VJSContextInfo *info = new VJSContextInfo();
					if  (info != NULL)
					{
						VJSContext jsContext( globalContext);
						info->SetGlobalObject( jsContext.GetGlobalObjectPrivateInstance());
						info->SetDebuggerActive( VJSGlobalContext::IsDebuggerActive());
						info->SetStampOfPool( fStamp);

						if (inReusable && fContextReusingEnabled && (fReusableContextCount < fSize))
						{
							info->SetReusable( true);
							++fReusableContextCount;
						}
						else
						{
							info->SetReusable( false);
						}

						fUsedContexts[globalContext] = info;

						if (fUsedContexts.size() > fUsedContextMaxCount)
							fUsedContextMaxCount = fUsedContexts.size();
					}
					else
					{
						outError = vThrowError( VE_MEMORY_FULL);
					}

					++fCreatedContextCount;

					fPoolMutex.Unlock();
				}
			}
		}
	}

	return globalContext;
}


VError VJSContextPool::ReleaseContext( VJSGlobalContext* inContext)
{
	VError err = VE_OK;

	if (inContext != NULL)
	{
		bool isReusable = false;
	
		if (fPoolMutex.Lock())
		{
			MapOfJSContext_iter found = fUsedContexts.find( inContext);
			if (found != fUsedContexts.end())
			{
				if (fContextReusingEnabled && found->second->IsReusable())
				{
					VJSGlobalObject *globalObject = found->second->GetGlobalObject();

					// If some included files have been changed or is the pool has been touched, the context is invalid and must not be reused
					bool isInvalid = (found->second->GetStampOfPool() < fStamp);

					// sc 19/06/2014, optimization: check for included files changes at most one time per second
					if (!isInvalid && ((found->second->GetIncludedFilesChangesCheckTime() + kINCLUDED_FILES_CHANGES_CHECK_DELAY) < VSystem::GetCurrentTime()))
					{
						isInvalid = globalObject->IsIncludedFilesHaveBeenChanged();
						found->second->SetIncludedFilesChangesCheckTime( VSystem::GetCurrentTime());
					}

					if (globalObject != NULL && isInvalid)
					{
						isReusable = false;
					}
					else
					{
						fUnusedContexts[inContext] = found->second;
						isReusable = true;
					}
				}

				// The context becomes unused
				if (!isReusable)
				{
					VJSGlobalObject *globalObject = found->second->GetGlobalObject();
					if (globalObject != NULL)
						globalObject->GarbageCollect();

					if (found->second->IsReusable())
						--fReusableContextCount;

					++fDestroyedContextCount;
					
					delete found->second;
					found->second = NULL;
				}

				fUsedContexts.erase( found);

				if (fUsedContexts.size() == 0)
				{
					if (fNoUsedContextEvenMutex.Lock())
					{
						if (fNoUsedContextEvent != NULL)
						{
							if (fNoUsedContextEvent->Unlock())
								ReleaseRefCountable( &fNoUsedContextEvent);
						}
						fNoUsedContextEvenMutex.Unlock();
					}
				}
			}
			fPoolMutex.Unlock();
		}

		if (!isReusable)
			err = _ReleaseContext( inContext);
	}
	return err;
}


bool VJSContextPool::ContextShouldBeReleased( XBOX::VJSGlobalContext* inContext) const
{
	bool result = false;

	if (inContext != NULL)
	{
		if (fPoolMutex.Lock())
		{
			MapOfJSContext_citer found = fUsedContexts.find( inContext);
			if (found != fUsedContexts.end())
				result = found->second->GetStampOfPool() < fStamp;

			fPoolMutex.Unlock();
		}
	}
	return result;
}


bool VJSContextPool::SetEnabled( bool inEnabled)
{
	bool previousState = fEnabled;
	fEnabled = inEnabled;
	return previousState;
}


bool VJSContextPool::IsEnabled() const
{
	return fEnabled;
}


void VJSContextPool::SetContextReusingEnabled( bool inEnabled)
{
#if USE_V8_ENGINE
	fContextReusingEnabled = false;
#else
	fContextReusingEnabled = inEnabled;
#endif
}


bool VJSContextPool::IsContextReusingEnabled() const
{
#if USE_V8_ENGINE
	return false;
#else
	return fContextReusingEnabled;
#endif
}


void VJSContextPool::SetSize( sLONG inSize)
{
	if (fPoolMutex.Lock())
	{
		if (testAssert( fUsedContexts.empty() && fUnusedContexts.empty()))
			fSize = inSize;
		fPoolMutex.Unlock();
	}
}


uLONG VJSContextPool::GetUsedContextsCount() const
{
	uLONG count = 0;
	if (fPoolMutex.Lock())
	{
		count = (uLONG) fUsedContexts.size();
		fPoolMutex.Unlock();
	}
	return count;
}


void VJSContextPool::GetWorkersInformations( std::vector<JSWorkerInfo>& outWorkersInfos) const
{
	outWorkersInfos.clear();

	if (fPoolMutex.Lock())
	{
		for (MapOfJSContext_citer iter = fUsedContexts.begin() ; iter != fUsedContexts.end() ; ++iter)
		{
			VJSContext jsContext( iter->first);
			VJSWorker *worker = VJSWorker::RetainWorker( jsContext);
			if (worker != NULL)
			{
				JSWorkerInfo info = { worker->GetWorkerType(), worker->GetURL(), worker->GetName() };
				outWorkersInfos.push_back( info);
				worker->Release();
			}
		}

		fPoolMutex.Unlock();
	}
}



namespace PoolInfosBagKeys
{
	CREATE_BAGKEY( jsContextInfo);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( contextPoolSize, VLong, sLONG);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( activeDebugger, VBoolean, bool);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( usedContextCount, VLong, sLONG);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( usedContextMaxCount, VLong, sLONG);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( reusableContextCount, VLong, sLONG);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( unusedContextCount, VLong, sLONG);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( createdContextCount, VLong, sLONG);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( destroyedContextCount, VLong, sLONG);
}


void VJSContextPool::GetPoolInformations( XBOX::VValueBag& outBag) const
{
	BagElement infosBag( outBag, PoolInfosBagKeys::jsContextInfo);

	if (fPoolMutex.Lock())
	{
		PoolInfosBagKeys::contextPoolSize.Set( infosBag, fSize);
		PoolInfosBagKeys::activeDebugger.Set( infosBag, VJSGlobalContext::IsDebuggerActive());
		PoolInfosBagKeys::usedContextCount.Set( infosBag, fUsedContexts.size());
		PoolInfosBagKeys::usedContextMaxCount.Set( infosBag, fUsedContextMaxCount);
		PoolInfosBagKeys::reusableContextCount.Set( infosBag, fReusableContextCount);
		PoolInfosBagKeys::unusedContextCount.Set( infosBag, fUnusedContexts.size());
		PoolInfosBagKeys::createdContextCount.Set( infosBag, fCreatedContextCount);
		PoolInfosBagKeys::destroyedContextCount.Set( infosBag, fDestroyedContextCount);
		fPoolMutex.Unlock();
	}
}


void VJSContextPool::Clean()
{
	if (fPoolMutex.Lock())
	{
		for (MapOfJSContext_iter iter = fUnusedContexts.begin() ; iter != fUnusedContexts.end() ; ++iter)
		{
			xbox_assert(iter->second->IsReusable());

			VJSGlobalObject *globalObject = iter->second->GetGlobalObject();
			if (globalObject != NULL)
				globalObject->GarbageCollect();

			_ReleaseContext( iter->first);

			delete iter->second;
			--fReusableContextCount;
			++fDestroyedContextCount;
		}

		xbox_assert(fReusableContextCount == 0);
		fUnusedContexts.clear();

		fPoolMutex.Unlock();
	}
}


#if WITH_SANDBOXED_PROJECT

VError VJSContextPool::Clean( sLONG inTimeoutMs, uLONG* outRemainingContexts, std::vector<JSWorkerInfo>* outWorkersInfos)
{
	VError err = VE_OK;

	Touch();
	bool savedEnabledState = fEnabled;	// save the enabled state
	fEnabled = false;

	// Ask for terminating all workers
	if (fPoolMutex.Lock())
	{
		for (MapOfJSContext_citer iter = fUsedContexts.begin() ; iter != fUsedContexts.end() ; ++iter)
		{
			VJSContext jsContext( iter->first);
			VJSWorker *worker = VJSWorker::RetainWorker( jsContext);
			if (worker != NULL)
			{
				worker->Terminate();
				worker->Release();
			}
		}
		fPoolMutex.Unlock();
	}
	

	// Wait for number of used contexts equal 0 with a maximum timeout
	uLONG maxTime = VSystem::GetCurrentTime() + inTimeoutMs;
	uLONG usedContextsCount = 0;

	do
	{
		usedContextsCount = GetUsedContextsCount();
		if ((usedContextsCount > 0) && (VSystem::GetCurrentTime() < maxTime))
		{
			VTask::GetCurrent()->Sleep( 100);
			continue;
		}

	} while ((usedContextsCount > 0) && (VSystem::GetCurrentTime() < maxTime));

	usedContextsCount = GetUsedContextsCount();
	if ((usedContextsCount > 0) && (outWorkersInfos != NULL))
	{
		std::vector<JSWorkerInfo> workersInfos;
		GetWorkersInformations( workersInfos);
		outWorkersInfos->insert( outWorkersInfos->end(), workersInfos.begin(), workersInfos.end());
	}

	// Release all unused contexts
	Clean();

	if (outRemainingContexts != NULL)
		*outRemainingContexts = usedContextsCount;

	fEnabled = savedEnabledState;

	return err;
}

#endif // WITH_SANDBOXED_PROJECT


void VJSContextPool::Touch()
{
	if (fPoolMutex.Lock())
	{
		++fStamp;
		fPoolMutex.Unlock();
	}
}


VSyncEvent* VJSContextPool::WaitForNumberOfUsedContextEqualZero()
{
	VSyncEvent *syncEvent = NULL;

	if (fPoolMutex.Lock())
	{
		if (fUsedContexts.size() > 0)
		{
			if (fNoUsedContextEvenMutex.Lock())
			{
				if (fNoUsedContextEvent == NULL)
					fNoUsedContextEvent = new VSyncEvent();

				syncEvent = RetainRefCountable( fNoUsedContextEvent);

				fNoUsedContextEvenMutex.Unlock();
			}
		}
		fPoolMutex.Unlock();
	}
	return syncEvent;
}


#if 0
VError VJSContextPool::Clear()
{
	VError err = VE_OK;

	bool savedEnabledState = fEnabled;	// save the enabled state

	fEnabled = false;

	VSyncEvent *syncEvent = WaitForNumberOfUsedContextEqualZero();
	if (syncEvent != NULL)
	{
		syncEvent->Lock();
		syncEvent->Release();
	}

	if (fPoolMutex.Lock())
	{
		for (MapOfJSContext_iter iter = fUnusedContexts.begin() ; iter != fUnusedContexts.end() ; ++iter)
		{
			xbox_assert(iter->second->IsReusable());

			VJSGlobalObject *globalObject = iter->second->GetGlobalObject();
			if (globalObject != NULL)
				globalObject->GarbageCollect();

			_ReleaseContext( iter->first);

			delete iter->second;
			--fReusableContextCount;
		}
		
		xbox_assert(fReusableContextCount == 0);
		fUnusedContexts.clear();

		fPoolMutex.Unlock();
	}

	fEnabled = savedEnabledState;	// restore the enabled state

	return err;
}
#endif


void VJSContextPool::AppendRequiredScript( const VFilePath& inPath)
{
	if (fRequiredScriptsMutex.Lock())
	{
		std::vector<VFilePath>::iterator found = std::find( fRequiredScripts.begin(), fRequiredScripts.end(), inPath);
		if (found == fRequiredScripts.end())
			fRequiredScripts.push_back( inPath);

		fRequiredScriptsMutex.Unlock();
	}
}


void VJSContextPool::RemoveRequiredScript( const VFilePath& inPath)
{
	if (fRequiredScriptsMutex.Lock())
	{
		std::vector<VFilePath>::iterator found = std::find( fRequiredScripts.begin(), fRequiredScripts.end(), inPath);
		if (found != fRequiredScripts.end())
			fRequiredScripts.erase( found);

		fRequiredScriptsMutex.Unlock();
	}
}


void VJSContextPool::GarbageCollect()
{
	if (fPoolMutex.Lock())
	{
		for (MapOfJSContext_iter iter = fUnusedContexts.begin() ; iter != fUnusedContexts.end() ; ++iter)
		{
			if  (iter->second != NULL)
			{
				VJSGlobalObject *globalObject = iter->second->GetGlobalObject();
				if (globalObject != NULL)
				{
					globalObject->GarbageCollect();
				}
			}
		}

		for (MapOfJSContext_iter iter = fUsedContexts.begin() ; iter != fUsedContexts.end() ; ++iter)
		{
			if  (iter->second != NULL)
			{
				VJSGlobalObject *globalObject = iter->second->GetGlobalObject();
				if (globalObject != NULL)
				{
					globalObject->GarbageCollect();
				}
			}
		}

		fPoolMutex.Unlock();
	}
}


XBOX::VSystemWorkerNamespace* VJSContextPool::RetainRuntimeSystemWorkerNamespace()
{
	xbox_assert ( false );

	return NULL;
}


bool VJSContextPool::Init()
{
	_InitGlobalClasses();
	return true;
}


XBOX::VFolder* VJSContextPool::RetainScriptsFolder()
{
	return NULL;
}


XBOX::VProgressIndicator* VJSContextPool::CreateProgressIndicator( const XBOX::VString& inTitle)
{
	return NULL;
}


VJSGlobalContext* VJSContextPool::_RetainNewContext( VError& outError)
{
	outError = VE_OK;

	IJSRuntimeDelegate *runtimeDelegate = (fDelegate != NULL) ? fDelegate->GetRuntimeDelegate() : NULL;

	if (runtimeDelegate == NULL)
		runtimeDelegate = this;

	VJSGlobalContext *globalContext = RetainNewContext( runtimeDelegate);
	if (globalContext != NULL)
	{
		CDB4DManager *db4d = VRIAServerApplication::Get()->GetComponentDB4D();
		if (db4d != NULL)
		{
			std::vector<VFilePath> db4dRequired;
			db4d->GetStaticRequiredJSFiles(db4dRequired);
			for (std::vector<VFilePath>::iterator iter = db4dRequired.begin() ; iter != db4dRequired.end() ; ++iter)
			{
				VFile *script = new VFile( *iter);
				if (script != NULL)
				{
					if (script->Exists())
					{
						VJSContext jsContext( globalContext);
						VJSGlobalObject *globalObject = jsContext.GetGlobalObjectPrivateInstance();
						if (testAssert(globalObject != NULL))
							globalObject->RegisterIncludedFile( script);

						globalContext->EvaluateScript( script, NULL);
					}
				}
				ReleaseRefCountable( &script);
			}
		}

		// Evaluating required scripts
		if (fRequiredScriptsMutex.Lock()) // attention possibilite importante d'engorgement, voir L.R
		{
			for (std::vector<VFilePath>::iterator iter = fRequiredScripts.begin() ; iter != fRequiredScripts.end() ; ++iter)
			{
				VFile *script = new VFile( *iter);
				if (script != NULL)
				{
					if (script->Exists())
					{
						VJSContext jsContext( globalContext);
						VJSGlobalObject *globalObject = jsContext.GetGlobalObjectPrivateInstance();
						if (testAssert(globalObject != NULL))
							globalObject->RegisterIncludedFile( script);	// sc 17/01/2011 to invalid the context when the entity Entity Model script is modified

						globalContext->EvaluateScript( script, NULL);
					}
				}
				ReleaseRefCountable( &script);
			}
			fRequiredScriptsMutex.Unlock();
		}

		if (fDelegate != NULL)
		{
			outError = fDelegate->InitializeJSContext( globalContext);
		}
	}
	else
	{
		outError = vThrowError( VE_RIA_JS_CANNOT_CREATE_CONTEXT);
	}

	return globalContext;
}


VError VJSContextPool::_ReleaseContext( VJSGlobalContext* inContext)
{
	VError err = VE_OK;

	if (inContext != NULL)
	{
		if (inContext != NULL)
		{
			if (fDelegate != NULL)
			{
				err = fDelegate->UninitializeJSContext( inContext);
			}

			QuickReleaseRefCountable( inContext);
		}
	}
	return err;
}


bool VJSContextPool::_IsPooled(  XBOX::VJSGlobalContext* inContext) const
{
	if (fUsedContexts.find( inContext) != fUsedContexts.end())
		return true;

	if (fUnusedContexts.find( inContext) != fUnusedContexts.end())
		return true;

	return false;
}


void VJSContextPool::_InitGlobalClasses()
{
	static bool sDone = false;

	if (!sDone)
	{
		sDone = true;

		// Append some custom properties to the global class

		VJSGlobalClass::AddStaticFunction(	kSSJS_PROPERTY_NAME_AddHttpRequestHandler, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_addHttpRequestHandler>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_RemoveHttpRequestHandler, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_removeHttpRequestHandler>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_GetFolder, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_getFolder>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_GetSettingFile, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_getSettingFile>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_GetWalibFolder, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_getWalibFolder>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_GetItemsWithRole, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_getItemsWithRole>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( "reloadModel", VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_reloadModel>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);
	
		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_verifyDataStore, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_verifyDataStore>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_repairDataStore, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_repairInto>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_compactDataStore, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_compactInto>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( "backupDataStore", VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_backupDataStore>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( "getLastBackups", VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_getLastBackups>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);
		
		VJSGlobalClass::AddStaticFunction( "getJobManager", VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_getJobManager>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( "integrateDataStoreJournal", VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_integrateDataStoreJournal>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);
		VJSGlobalClass::AddStaticFunction( "restoreDataStore", VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_restoreDataStore>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);
		VJSGlobalClass::AddStaticFunction( "parseJournal", VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_parseJournal>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);
		VJSGlobalClass::AddStaticFunction( "getBackupRegistry", VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_getBackupRegistry>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);
		VJSGlobalClass::AddStaticFunction( "getBackupSettings", VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_getBackupSettings>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_loginByKey, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_login>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_loginByPassword, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_unsecureLogin>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_createUserSession, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_createUserSession>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_currentUser, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_getCurrentUser>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_currentSession, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_getConnectionSession>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_logout, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_logout>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( kSSJS_PROPERTY_NAME_getUserSessions, VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_getUserSessions>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticFunction( "getSession", VJSGlobalClass::js_callStaticFunction<VJSApplicationGlobalObject::_getSession>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticValue( kSSJS_PROPERTY_NAME_Name, VJSGlobalClass::js_getProperty<VJSApplicationGlobalObject::_getName>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticValue( kSSJS_PROPERTY_NAME_Administrator, VJSGlobalClass::js_getProperty<VJSApplicationGlobalObject::_getIsAdministrator>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticValue( kSSJS_PROPERTY_NAME_HTTPServer, VJSGlobalClass::js_getProperty<VJSApplicationGlobalObject::_getHttpServer>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticValue( kSSJS_PROPERTY_NAME_Console, VJSGlobalClass::js_getProperty<VJSApplicationGlobalObject::_getConsole>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticValue( kSSJS_PROPERTY_NAME_Pattern, VJSGlobalClass::js_getProperty<VJSApplicationGlobalObject::_getPattern>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticValue( kSSJS_PROPERTY_NAME_Storage, VJSGlobalClass::js_getProperty<VJSApplicationGlobalObject::_getStorage>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticValue( kSSJS_PROPERTY_NAME_Settings, VJSGlobalClass::js_getProperty<VJSApplicationGlobalObject::_getSettings>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticValue( kSSJS_PROPERTY_NAME_Directory, VJSGlobalClass::js_getProperty<VJSApplicationGlobalObject::_getDirectory>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticValue( kSSJS_PROPERTY_NAME_Internal, VJSGlobalClass::js_getProperty<VJSApplicationGlobalObject::_getInternal>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete );

		VJSGlobalClass::AddStaticValue( kSSJS_PROPERTY_NAME_Permissions, VJSGlobalClass::js_getProperty<VJSApplicationGlobalObject::_getPermissions>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);

		VJSGlobalClass::AddStaticValue( kSSJS_PROPERTY_NAME_wildchar, VJSGlobalClass::js_getProperty<VJSApplicationGlobalObject::_getWildChar>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete);


		VJSGlobalClass::CreateGlobalClasses();
		VJSHTTPRequestHeader::Class();
		VJSHTTPResponseHeader::Class();
		VJSHTTPRequest::Class();
		VJSHTTPResponse::Class();
		VJSMIMEMessage::Class();
		VJSMIMEMessagePart::Class();
		VJSMIMEWriter::Class();
		VJSMIMEReader::Class();
		VJSSolution::Class();
		VJSApplication::Class();
		VJSHTTPServer::Class();
		VRIAServerJSCore::Class();
		VJSRPCServiceCore::Class();
		VRIAServerJSCore::Class();
		VJSJobManagerClass::Class();
		VJSJobClass::Class();
	#if WITH_SANDBOXED_PROJECT
		VJSServer::Class();
	#endif // WITH_SANDBOXED_PROJECT
	}
}


bool VJSContextPool::_SetSpecific( const VJSContext& inContext, VJSContextPoolSpecific* inSpecific)
{
	return inContext.GetGlobalObjectPrivateInstance()->SetSpecific( 'jspo', inSpecific, VJSSpecifics::DestructorVObject);
}


VJSContextPoolSpecific* VJSContextPool::_GetSpecific( const VJSContext& inContext)
{
	return static_cast<VJSContextPoolSpecific*>( inContext.GetGlobalObjectPrivateInstance()->GetSpecific( 'jspo'));
}



// ----------------------------------------------------------------------------



VRIAJSCallbackGlobalFunction::VRIAJSCallbackGlobalFunction( const VString& inFunctionName)
: fFunctionName(inFunctionName)
{
}


VRIAJSCallbackGlobalFunction::~VRIAJSCallbackGlobalFunction()
{
}


void VRIAJSCallbackGlobalFunction::GetFunctionName( VString& outName)
{
	outName = fFunctionName;
}

			
VError VRIAJSCallbackGlobalFunction::Call( VJSContext& inContext, const std::vector<VJSValue> *inParameters, VJSValue* outResult)
{
	VError err = VE_OK;

	VJSException		exception;
	VJSObject object( inContext.GetGlobalObject());

	if (!object.CallMemberFunction( fFunctionName, inParameters, outResult, exception))
	{
		if (exception.ThrowVErrorForException(inContext))
		{
			err = VE_RIA_JS_CALL_TO_FUNCTION_FAILED;
		}
		else
		{
			err = vThrowError( VE_RIA_JS_CALL_TO_FUNCTION_FAILED, fFunctionName);
		}
	}

	return err;
}


bool VRIAJSCallbackGlobalFunction::Match( const IRIAJSCallback* inCallback) const
{
	bool result = false;

	const VRIAJSCallbackGlobalFunction *callback = dynamic_cast<const VRIAJSCallbackGlobalFunction*>(inCallback);
	if (callback != NULL)
	{
		result = (fFunctionName.EqualTo( callback->fFunctionName, 1) == 1);
	}

	return result;
}



// ----------------------------------------------------------------------------



VRIAJSCallbackModuleFunction::VRIAJSCallbackModuleFunction( const VString& inModuleName, const VString& inFunctionName)
: fModuleName(inModuleName), fFunctionName(inFunctionName)
{
}


VRIAJSCallbackModuleFunction::~VRIAJSCallbackModuleFunction()
{
}


void VRIAJSCallbackModuleFunction::GetModuleName( VString& outName) const
{
	outName = fModuleName;
}


void VRIAJSCallbackModuleFunction::GetFunctionName( VString& outName) const
{
	outName = fFunctionName;
}


VError VRIAJSCallbackModuleFunction::Call( VJSContext& inContext, const std::vector<VJSValue> *inParameters, VJSValue* outResult)
{
	VError err = VE_OK;

	VJSException	exception;
	VJSObject object( inContext.GetGlobalObject());

	VJSValue nameParam( inContext);
	nameParam.SetString( fModuleName);
	std::vector<VJSValue> params;
	params.push_back( nameParam);

	VJSValue module( inContext);
	if (object.CallMemberFunction( L"require", &params, &module, exception))
	{
		if (!module.IsUndefined() && !module.IsNull())
		{
			VJSObject moduleObject = module.GetObject();
			if (!moduleObject.CallMemberFunction( fFunctionName, inParameters, outResult, exception))
			{
				exception.ThrowVErrorForException( inContext );
				err = VE_RIA_JS_CALL_TO_FUNCTION_FAILED;
			}
		}
		else
		{
			err = VE_RIA_JS_CALL_TO_REQUIRE_FAILED;
		}
	}
	else
	{
		exception.ThrowVErrorForException( inContext);
		err = VE_RIA_JS_CALL_TO_REQUIRE_FAILED;
	}

	return err;
}


bool VRIAJSCallbackModuleFunction::Match( const IRIAJSCallback* inCallback) const
{
	bool result = false;

	const VRIAJSCallbackModuleFunction *callback = dynamic_cast<const VRIAJSCallbackModuleFunction*>(inCallback);
	if (callback != NULL)
	{
		if (fModuleName.EqualTo( callback->fModuleName, 0) == 1)
			result = (fFunctionName.EqualTo( callback->fFunctionName, 1) == 1);
	}

	return result;
}

