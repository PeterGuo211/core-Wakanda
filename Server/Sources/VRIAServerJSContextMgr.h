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
#ifndef __RIAServerJavascript__
#define __RIAServerJavascript__


class VRIAServerProject;
class VRIAServerSolution;
class VRIAContext;
class CDB4DContext;
class VRIAHTTPSession;
class IHTTPRequest;
class VJSContextInfo;
class VJSContextPool;
class IJSContextPoolDelegate;



// ----------------------------------------------------------------------------



typedef struct
{
	sLONG			fType;
	XBOX::VString	fURL;
	XBOX::VString	fName;
} JSWorkerInfo;


class VRIAServerJSContextMgr : public XBOX::VObject, public XBOX::IJSWorkerDelegate
{
public:
			VRIAServerJSContextMgr();
	virtual	~VRIAServerJSContextMgr();

	typedef std::set< VJSContextPool*>					SetOfPool;
	typedef std::set< VJSContextPool*>::iterator		SetOfPool_iter;
	typedef std::set< VJSContextPool*>::const_iterator	SetOfPool_citer;

			/** @brief	Returns a new VJSContextPool instance. inDelegate may be NULL. */
			VJSContextPool*				CreateJSContextPool( XBOX::VError& outError, IJSContextPoolDelegate* inDelegate);
	
			/** @brief	Call garbage collect for all pools */
			void						GarbageCollect();

			// Inherited from IJSWorkerDelegate
	virtual WorkerDelegateType			GetType ()	{	return TYPE_WAKANDA_SERVER;	}
	virtual	XBOX::VJSGlobalContext*		RetainJSContext( XBOX::VError& outError, const XBOX::VJSContext& inParentContext, bool inReusable);
	virtual	XBOX::VError				ReleaseJSContext( XBOX::VJSGlobalContext* inContext);

#if VJSWORKER_WITH_PROJECT_INFO_RETAIN_JS

	virtual void						*GetProjectInfo (XBOX::VError &outError, const XBOX::VJSContext &inParentContext);
	virtual	XBOX::VJSGlobalContext		*RetainJSContext (XBOX::VError &outError, void *inProjectInfo, bool inReusable);

#endif

			void						GetAllPools( std::vector<VJSContextPool*>& outPools) const;
			
			/*	Context pool cleaning utilities:
				call CleanAllPools() to release all JavaScript contexts:	contextMgr->BeginPoolsCleanup();
																			contextMgr->CleanAllPools( 5000, NULL);
																			contextMgr->EndPoolsCleanup();
			*/

			/** @brief	BeginPoolsCleanup() prevents all context pools from providing JavaScript contexts and touch all context pools */
			void						BeginPoolsCleanup();
			XBOX::VSignalT_0&			GetBeginContextPoolsCleanupSignal()		{ return fBeginContextPoolsCleanupSignal; }
			/*** @brief	EndPoolsCleanup() allows all context pools to provide JavaScript contexts */
			void						EndPoolsCleanup();
			XBOX::VSignalT_0&			GetEndContextPoolsCleanupSignal()		{ return fEndContextPoolsCleanupSignal; }
			/** @brief	CleanAllPools() asks each pool to release all JavaScript contexts
						- first, it asks for aborting all JS contexts paused in debug mode and for terminating all workers
						- then, it waits for number of used contexts equal 0 with a maximum timeout defined by inTimeoutMs
						- if not NULL, outRemainingContexts contains the number of contexts which are still used
						- if not NULL, outWorkersInfos contains some informations about workers which are still running
			*/
			XBOX::VError				CleanAllPools( sLONG inTimeoutMs, uLONG* outRemainingContexts, std::vector<JSWorkerInfo>* outWorkersInfos);
			bool						IsPoolsAreBeingCleaned() const		{ return fPoolsAreBeingCleaned > 0; }

			// Private utilities
			void						_RegisterPool( VJSContextPool *inPool);
			void						_UnRegisterPool( VJSContextPool *inPool);

private:
			SetOfPool					fSetOfPool;
	mutable	XBOX::VCriticalSection		fSetOfPoolMutex;
			sLONG						fPoolsAreBeingCleaned;

			XBOX::VSignalT_0			fBeginContextPoolsCleanupSignal;
			XBOX::VSignalT_0			fEndContextPoolsCleanupSignal;
};



// ----------------------------------------------------------------------------



class CUAGSession;

namespace xbox
{
	class VJSSessionStorageObject;
};


class VRIAJSRuntimeContext : public XBOX::VObject, public XBOX::IRefCountable
{
public:

	typedef std::map< VRIAServerProject*, XBOX::VRefPtr<VRIAContext> >						MapOfRIAContext;
	typedef std::map< VRIAServerProject*, XBOX::VRefPtr<VRIAContext> >::iterator			MapOfRIAContext_iter;
	typedef std::map< VRIAServerProject*, XBOX::VRefPtr<VRIAContext> >::const_iterator		MapOfRIAContext_citer;

			VRIAJSRuntimeContext();
			// The root application is the one for which the runtime context is created
			VRIAJSRuntimeContext( VRIAServerProject* inRootApplication);
	virtual	~VRIAJSRuntimeContext();

			 VRIAServerProject*		GetRootApplication() const;
			 VRIAServerSolution*	GetRootSolution() const;
	
			/**	@brief	Create and attach the ria runtime context to the JavaScript global context. The root application is the one for which the runtime context is created
						If inRootApplication is not NULL, the parent solution is automatically attached to the runtime context
			*/
	static	XBOX::VError			InitializeJSContext( XBOX::VJSGlobalContext* inContext, VRIAServerProject *inRootApplication);

			/** @brief	Detach the runtime context from the JavaScript context and release private attachments
						If the runtime context own a root application, its will be automatically detached from the runtime context
			*/
	static	XBOX::VError			UninitializeJSContext( XBOX::VJSGlobalContext* inContext);

			/** @brief	Attach the solution to the runtime context is required to make the solution available in the JavaScript context
						The runtime context must have been attached to the JavaScript context with VRIAJSRuntimeContext::InitializeJSContext()
						An application context is created for each application and a database context is created for each opened database
			*/	
			XBOX::VError			AttachSolution( const XBOX::VJSContext& inContext, VRIAServerSolution *inSolution);

			/** @brief	Detach the solution from the runtime context.
			*/
			XBOX::VError			DetachSolution( const XBOX::VJSContext& inContext, VRIAServerSolution *inSolution);

		#if WITH_SANDBOXED_PROJECT
			XBOX::VError			AttachProject( const XBOX::VJSContext& inContext, VRIAServerProject *inProject);
			XBOX::VError			DetachProject( const XBOX::VJSContext& inContext, VRIAServerProject *inProject);
		#endif

			CUAGSession*			RetainUAGSession();
			XBOX::VError			SetUAGSession(CUAGSession* inSession, bool addSession = false);

			XBOX::VJSSessionStorageObject* GetSessionStorageObject();

			/** @brief	Register the application context in case the application is available in the JavaScript.
						The application context is retained. */
			XBOX::VError			RegisterApplicationContext( VRIAContext* inContext);

			/** @brief	Returns the application context from an application.
						May return NULL if the application context has not been registered. */
			VRIAContext*			GetApplicationContext( VRIAServerProject* inApplication) const;

			CDB4DContext*			RetainDB4DContext(VRIAServerProject* inApplication);

			/** @brief	Retrieve the runtime context which is attached to the JavaScript context. */
	static	VRIAJSRuntimeContext*	GetFromJSContext( const XBOX::VJSContext& inContext);

			/** @brief	Retrieve the application context which is registered in the JavaScript context. */
	static	VRIAContext*			GetApplicationContextFromJSContext( const XBOX::VJSContext& inContext, VRIAServerProject* inApplication);

			/** @brief	Retrieve the runtime context which is attached to the global object. */
	static	VRIAJSRuntimeContext*	GetFromJSGlobalObject( const XBOX::VJSGlobalObject* inGlobalObject);

private:
			/** @brief	Attach the runtime context to the JavaScript context. */
			bool					_AttachToJSContext( XBOX::VJSContext& inContext);

			bool					_DetachFromJSContext( XBOX::VJSContext& inContext);
			
			VRIAServerProject		*fRootApplication;
			MapOfRIAContext			fContextMap;
			CUAGSession				*fCurrentUAGSession;
			XBOX::VJSGlobalContext  *fGlobalContext;
};



// ----------------------------------------------------------------------------


/** @brief	VJSContextPool class

		The VJSContextPool class must be used each time a JavaScript context is required.
		The pool owns a set of reusable and persistent contexts, which are either used or unused.
		The pool is also able to provide basic contexts which are used once and destroyed once they are been released.

		. example		VError err = VE_OK;
						VJSGlobalContext *ctx = pool->RetainContext( err, true);
						... 
						err = pool->ReleaseContext( ctx);
*/


class VRIAServerJSRuntimeDelegate;
class VJSContextPoolSpecific;


class IJSContextPoolDelegate
{
public:

	virtual XBOX::IJSRuntimeDelegate*	GetRuntimeDelegate() = 0;

			// Called each time the pool create a JavaScript context.
	virtual	XBOX::VError				InitializeJSContext( XBOX::VJSGlobalContext* inContext) = 0;
			// Called each time the pool destroy a JavaScript context.
	virtual	XBOX::VError				UninitializeJSContext( XBOX::VJSGlobalContext* inContext) = 0;
};



class VJSContextPool : public XBOX::VObject, public XBOX::IJSRuntimeDelegate
{
public:
			VJSContextPool( VRIAServerJSContextMgr *inMgr, IJSContextPoolDelegate* inDelegate);
	virtual	~VJSContextPool();

			/** @brief	Creates and returns a new JavaScript context */
	static	XBOX::VJSGlobalContext*			RetainNewContext( XBOX::IJSRuntimeDelegate* inDelegate);

			/**	@brief	Returns a JavaScript context. Call RetainContext() each time you need to use a JavaScript context.
						If inReusable is false, a new context is created.
						If inReusable is true, the pool try a reuse an available context of its set. If inPreferedContext is an available context,
						RetainContext() returns this one. If all contexts are used, a new context is created and added to the set of reusable contexts. */
			XBOX::VJSGlobalContext*			RetainContext( XBOX::VError& outError, bool inReusable, XBOX::VJSGlobalContext* inPreferedContext = NULL);

			/** @brief	Call ReleaseContext() each time you finished using the context. Contexts which are not reusable are destroyed.
						The context will not be reused if the pool has been touched since context has been created */
			XBOX::VError					ReleaseContext( XBOX::VJSGlobalContext* inContext);

			/**	@brief	The context should be released when the pool is being cleaned */
			bool							ContextShouldBeReleased( XBOX::VJSGlobalContext* inContext) const;

			/** @brief	Disable the pool to prevent it from providing JavaScript contexts.
						Returns the previous enable state. */
			bool							SetEnabled( bool inEnabled);
			bool							IsEnabled() const;
			
			// Reusable contexts set accessors
			/** @brief	Disable context reusing to prevent the pool from providing reusable JavaScript contexts. */
			void							SetContextReusingEnabled( bool inEnabled);
			bool							IsContextReusingEnabled() const;

			/**	@brief	Set the maximum count of reusable JavaScript contexts which are stored in the pool. */
			void							SetSize( sLONG inSize);

			/** @brief	Release all unused contexts and clear reusable contexts set */
			void							Clean();
		#if WITH_SANDBOXED_PROJECT
			XBOX::VError					Clean( sLONG inTimeoutMs, uLONG* outRemainingContexts, std::vector<JSWorkerInfo>* outWorkersInfos);
		#endif
			
			/**	@brief	Touch() increment internal pool modification stamp
						All contexts created before stamp was incremented will not be reused */
			void							Touch();

			XBOX::VSyncEvent*				WaitForNumberOfUsedContextEqualZero();
			uLONG							GetUsedContextsCount() const;
			
			/**	@brief	Returns some informations about running workers */
			void							GetWorkersInformations( std::vector<JSWorkerInfo>& outWorkersInfos) const;

			void							GetPoolInformations( XBOX::VValueBag& outBag) const;

		#if 0
			/**	@brief	Clear() wait for number of used contexts equal 0 and clear the reusable contexts set. */
			XBOX::VError					Clear();
		#endif

			/** @brief	Required scripts are evaluated for each JavaScript context. */
			void							AppendRequiredScript( const XBOX::VFilePath& inPath);
			void							RemoveRequiredScript( const XBOX::VFilePath& inPath);

			/** @brief	Call garbage collect for all contexts */
			void							GarbageCollect();

			virtual	XBOX::VSystemWorkerNamespace*	RetainRuntimeSystemWorkerNamespace();

	static	bool							Init();

private:

	typedef std::map< XBOX::VJSGlobalContext*, VJSContextInfo* >					MapOfJSContext;
	typedef std::map< XBOX::VJSGlobalContext*, VJSContextInfo* >::iterator			MapOfJSContext_iter;
	typedef std::map< XBOX::VJSGlobalContext*, VJSContextInfo* >::const_iterator	MapOfJSContext_citer;

	typedef std::set< XBOX::VJSGlobalContext*>						SetOfJSContext;
	typedef std::set< XBOX::VJSGlobalContext*>::iterator			SetOfJSContext_iter;
	typedef std::set< XBOX::VJSGlobalContext*>::const_iterator		SetOfJSContext_citer;
	
			VJSContextPool();

			// Inherited from IJSRuntimeDelegate
	virtual	XBOX::VFolder*					RetainScriptsFolder();
	virtual XBOX::VProgressIndicator*		CreateProgressIndicator( const XBOX::VString& inTitle);
	
			/** @brief	Creates and returns a new JavaScript context fully initialized */
			XBOX::VJSGlobalContext*			_RetainNewContext( XBOX::VError& outError);

			/** @brief	The context is uninitialized before being released */
			XBOX::VError					_ReleaseContext( XBOX::VJSGlobalContext* inContext);

			bool							_IsPooled(  XBOX::VJSGlobalContext* inContext) const;

	static	void							_InitGlobalClasses();

	static	bool							_SetSpecific( const XBOX::VJSContext& inContext, VJSContextPoolSpecific* inSpecific);
	static	VJSContextPoolSpecific*			_GetSpecific( const XBOX::VJSContext& inContext);

			VRIAServerJSContextMgr			*fManager;
			bool							fEnabled;
			bool							fContextReusingEnabled;
			sLONG							fSize;
			IJSContextPoolDelegate			*fDelegate;

			// Contexts pooling
			uLONG							fStamp;			
			MapOfJSContext					fUsedContexts;			// pool of used contexts (reusable and non-reusable)
			MapOfJSContext					fUnusedContexts;		// pool of unused contexts which are reusable
			sLONG							fReusableContextCount;
			sLONG							fUsedContextMaxCount;
			sLONG							fCreatedContextCount;
			sLONG							fDestroyedContextCount;
	mutable	XBOX::VCriticalSection			fPoolMutex;
			XBOX::VSyncEvent				*fNoUsedContextEvent;
	mutable	XBOX::VCriticalSection			fNoUsedContextEvenMutex;

			// Required JavaScript  files
			std::vector<XBOX::VFilePath>	fRequiredScripts;
	mutable	XBOX::VCriticalSection			fRequiredScriptsMutex;
};



// ----------------------------------------------------------------------------



// IRIAJSCallback abstract class : an interface for the JavaScript callbacks

class IRIAJSCallback : public XBOX::IRefCountable
{
public:

	virtual	XBOX::VError	Call( XBOX::VJSContext& inContext, const std::vector<XBOX::VJSValue> *inParameters, XBOX::VJSValue* outResult) = 0;
	virtual	bool			Match( const IRIAJSCallback* inCallback) const = 0;
};



// ----------------------------------------------------------------------------



// VRIAJSCallbackGlobalFunction class : the callback is a function of the JavaScript global object

class VRIAJSCallbackGlobalFunction : public XBOX::VObject, public IRIAJSCallback
{
public:
			VRIAJSCallbackGlobalFunction( const XBOX::VString& inFunctionName);
	virtual	~VRIAJSCallbackGlobalFunction();

			void			GetFunctionName( XBOX::VString& outName);

			// Inherited from IRIAJSCallback
	virtual	XBOX::VError	Call( XBOX::VJSContext& inContext, const std::vector<XBOX::VJSValue> *inParameters, XBOX::VJSValue* outResult);
	virtual	bool			Match( const IRIAJSCallback* inCallback) const;
			
private:
			XBOX::VString	fFunctionName;
};



// ----------------------------------------------------------------------------



// VRIAJSCallbackModuleFunction class : the callback is a function of a module

class VRIAJSCallbackModuleFunction : public XBOX::VObject, public IRIAJSCallback
{
public:
			VRIAJSCallbackModuleFunction( const XBOX::VString& inModuleName, const XBOX::VString& inFunctionName);
	virtual	~VRIAJSCallbackModuleFunction();

			void			GetModuleName( XBOX::VString& outName) const;
			void			GetFunctionName( XBOX::VString& outName) const;

			// Inherited from IRIAJSCallback
	virtual	XBOX::VError	Call( XBOX::VJSContext& inContext, const std::vector<XBOX::VJSValue> *inParameters, XBOX::VJSValue* outResult);
	virtual	bool			Match( const IRIAJSCallback* inCallback) const;

private:
			XBOX::VString	fModuleName;
			XBOX::VString	fFunctionName;
};



#endif