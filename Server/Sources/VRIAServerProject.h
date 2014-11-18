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
#ifndef __RIAServerProject__
#define __RIAServerProject__


#include "HTTPServer/Interfaces/CHTTPServer.h"
#include "Language Syntax/CLanguageSyntax.h"
#include "VRIASettingsFile.h"
#include "VProjectSettings.h"
#include "VRIAServerJSContextMgr.h"
#include "JSDebugger/Headers/JSWDebugger.h"


class VRIAServerSolution;
class VRIAServerProject;
class VProject;
class CDB4DBase;
class VRIAContext;
class VRIAContextManager;
class VStopHTTPServerMessage;
class VRIAServerProjectJSRuntimeDelegate;
class CUAGDirectory;
class ISymbolTable;
class VRIAHTTPSessionManager;
class VJSRequestHandler;
class IRIAJSCallback;
class VRPCService;
class VRPCCatalog;
class VDataService;
class VRIAPermissions;
class IBackupSettings;
class VRIAServerJob;
#if WITH_SANDBOXED_PROJECT
class VProjectLogListener;
class VRemoteDebuggerBreakpointsManager;
class VJSDebuggerSettings;
#endif



// ----------------------------------------------------------------------------



class VRIAServerProjectOpeningParameters : public XBOX::VObject, public XBOX::IRefCountable
{
public:
			VRIAServerProjectOpeningParameters();
	virtual ~VRIAServerProjectOpeningParameters();

			void					SetOpeningMode( EProjectOpeningMode inOpeningMode);
			EProjectOpeningMode		GetOpeningMode() const;

			void					SetCustomHttpPort( sLONG inPort);
			bool					GetCustomHttpPort( sLONG& outPort) const;

			void					SetCustomSSLPort( sLONG inPort);
			bool					GetCustomSSLPort( sLONG& outPort) const;

			void					SetCustomAuthenticationType( const XBOX::VString& inAuthenticationType);
			bool					GetCustomAuthenticationType( XBOX::VString& outAuthenticationType) const;

			void					SetHandlesDebuggerServer( bool inEnable);
			bool					GetHandlesDebuggerServer() const;

			void					SetDebuggerType( WAKDebuggerType_t inType);
			WAKDebuggerType_t		GetDebuggerType() const;

			void					SetHandlesServerSupervisor( bool inSet);
			bool					GetHandlesServerSupervisor() const;

		#if WITH_SANDBOXED_PROJECT
			void					SetCreateAdminUser( bool inCreateAdminUser);
			bool					GetCreateAdminUser() const;

			void					SetBreakpointsFolderPath( const XBOX::VFilePath& inPath);
			void					GetBreakpointsFolderPath( XBOX::VFilePath& outPath) const;

			void					SetDebuggerSourcesRootPath( const XBOX::VFilePath& inPath);
			void					GetDebuggerSourcesRootPath( XBOX::VFilePath& outPath) const;
		#endif

private:
			XBOX::VValueBag			fBag;
		#if WITH_SANDBOXED_PROJECT
			XBOX::VFilePath			fBreakpointsFolderPath;
			XBOX::VFilePath			fDebuggerSourcesRootPath;
		#endif
};




// ----------------------------------------------------------------------------



class VRIAServerProject : public XBOX::VObject, public XBOX::IRefCountable, public IJSContextPoolDelegate
{
public:

			VRIAServerProject();
			VRIAServerProject( VRIAServerSolution* inSolution);
	virtual ~VRIAServerProject();

			/**	@brief	Load the settings, open the database, load the RPC methods, instantiate required components
						Finally, OpenProject() returns the ria application. If needed, default opening parameters are created. */
	static	VRIAServerProject*			OpenProject( XBOX::VError& outError, VRIAServerSolution* inSolution, VProject* inDesignProject, VRIAServerProjectOpeningParameters *inOpeningParameters);
#if WITH_SANDBOXED_PROJECT
			// the users and groups directory is retained
	static	VRIAServerProject*			OpenProject( XBOX::VError& outError, VRIAServerSolution* inSolution, VProject* inDesignProject, VRIAServerProjectOpeningParameters *inOpeningParameters, CUAGDirectory* inUAGDirectory);
#endif
			/**	@brief	Close the database and release all components */
			XBOX::VError				Close();

			/**	@brief	Start the servers and enable the services according to the settings */
			XBOX::VError				Start();

			/**	@brief	Disable the services and stop the servers */
			XBOX::VError				Stop();

			/**	@brief	Evaluate the startup javascript files */
			XBOX::VError				OnStartup();

			XBOX::VError				OnStop();

			/** @brief	Project state accessors */
			bool						IsOpened() const;
			bool						IsStarted() const;
			bool						IsSandboxed() const;

			/**	@brief	Create and returns a context for this application. The context is registered until its destruction.
						May returns NULL if context creation is not allowed */
			VRIAContext*				RetainNewContext( XBOX::VError& outError);

			/**	@brief	HTTP Server handling high-level methods */
			IHTTPServerProject *		RetainHTTPServerProject( VRIAContext* inContext);
			XBOX::VError				StartHTTPServerProject( VRIAContext* inContext);

			// Used internaly.

			IHTTPServerProject *		RetainHTTPServerProject ()	{	return XBOX::RetainRefCountable(fHTTPServerProject);	}

			/**	@brief	the HTTP Server is closed asynchronously in the main task. */
			XBOX::VError				StopHTTPServerProject( VRIAContext* inContext);
			bool						IsHTTPServerProjectStarted( VRIAContext* inContext);

			/**	@brief	Data service handling high-level methods */
			CDB4DBase*					RetainDatabase( VRIAContext* inContext);
			VDataService*				RetainDataService( VRIAContext* inContext, XBOX::VError* outError);
			XBOX::VError				ReloadCatalog( VRIAContext* inContext);

			/**	@brief	RPC service handling high-level methods */
			VRPCCatalog*				RetainRPCCatalog( VRIAContext* inContext, XBOX::VError* outError, const IHTTPRequest* inRequest, IHTTPResponse* inResponse);
			VRPCService*				RetainRPCService( VRIAContext* inContext, XBOX::VError* outError);

			CUAGDirectory*				RetainUAGDirectory( XBOX::VError *outError);

			VRIAPermissions*			RetainPermissions( VRIAContext *inContext, XBOX::VError *outError);

			IBackupSettings*			RetainBackupSettings(VRIAContext *inContext,XBOX::VError *outError);

			// HTTP request handler handling
			/** @brief	Returns a retained JavaScript request handler. The callback is retained */
			VJSRequestHandler*			AddJSHTTPRequestHandler( XBOX::VError& outError, VRIAContext* inContext, const XBOX::VString& inPattern, IRIAJSCallback* inJSCallback);
			XBOX::VError				RemoveJSHTTPRequestHandler( VRIAContext* inContext, const XBOX::VString& inPattern, IRIAJSCallback* inJSCallback);

			// JavaScript utilities
			/**	@brief	HTTP session handling: if inRequest is not null, the session storage object is set according to the cookie */
			XBOX::VJSGlobalContext*		RetainJSContext( XBOX::VError& outError, bool inReusable, const IHTTPRequest* inRequest);
			/**	@brief	HTTP session handling: if inResponse is not null, the cookie is set according to the session storage object */
			void						ReleaseJSContext( XBOX::VJSGlobalContext* inContext, IHTTPResponse* inResponse);

			/**	@brief	Returns some informations about the JavaScript contexts pool */
			XBOX::VError				GetJSContextInformations( XBOX::VValueBag& outBag) const;

			// Basic retain/release JS context for WebSocket handlers.

			XBOX::VJSGlobalContext		*RetainJSContext (XBOX::VError &outError, bool inReusable)	{	return fJSContextPool->RetainContext(outError, inReusable);	}
			XBOX::VError				ReleaseJSContext (XBOX::VJSGlobalContext *inGlobalContext)	{	return fJSContextPool->ReleaseContext(inGlobalContext);		}

			/**	@brief	The context should be released when the pool is being cleaned */
			bool						JSContextShouldBeReleased( XBOX::VJSGlobalContext* inContext) const;

			/** @brief	Required scripts are evaluated for each JavaScript context. */
			void						AppendJSContextRequiredScript( const XBOX::VFilePath& inPath);

			// Accessors
			bool						GetUUID( XBOX::VUUID& outUUID) const;
			VRIAServerSolution*			GetSolution() const;
			VProject*					GetDesignProject();
			void						GetName( XBOX::VString& outName) const;
			bool						IsAdministrator() const;
			void						GetHostName( XBOX::VString& outHostName) const;
			void						GetPattern( XBOX::VString& outPattern) const;
			/**	@brief	Returns the physical folder which contains the design project file */
			XBOX::VFolder*				RetainFolder() const;
		#if WITH_SANDBOXED_PROJECT
			/** @brief	Returns the folder which contains the log files. */
			XBOX::VFolder*				RetainLogFolder( bool inCreateIfNotExists) const;
		#endif
			/** @brief	Returns the temporary folder of the project. */
			XBOX::VFolder*				RetainTemporaryFolder( bool inCreateIfNotExists) const;
			/** @brief	Returns the settings file which contains the setting. */
			const VRIASettingsFile*		RetainSettingsFile( const RIASettingsID& inSettingsID) const;

			XBOX::VError				GetJournalingSettings(bool& outEnabled,XBOX::VFilePath& outJournalPath)const;

			XBOX::VError				GetPublicationSettings( XBOX::VString& outHostName, XBOX::VString& outIP, sLONG& outPort, sLONG& outSSLPort, XBOX::VString& outPattern, XBOX::VString &outPublishName, bool& outAllowSSL, bool& outSSLMandatory, bool &outAllowHTTPOnLocal) const;

			VRIAHTTPSessionManager*		RetainSessionMgr() const;

			// Logging
			const XBOX::VString&		GetMessagesLoggerID() const;

			/** @brief	Build a path from the project folder path and the relative path inRelativePath */
			void						BuildPathFromRelativePath( XBOX::VFilePath& outPath, const XBOX::VString& inRelativePath, XBOX::FilePathStyle inRelativPathStyle = XBOX::FPS_SYSTEM) const;

			/** @brief	Build a path from the project's item folder path and the relative path inRelativePath */
			void						BuildPathFromRelativePath( VFilePath& outPath, const VString& inRelativePath,const VString& inProjectItemTag, FilePathStyle inRelativPathStyle) const;

			XBOX::VJSSessionStorageObject	*GetApplicationStorage ()	{	return fApplicationStorage;	}
			XBOX::VJSSessionStorageObject	*GetApplicationSettings ()	{	return fApplicationSettings;	}

			XBOX::VFileSystemNamespace*		GetFileSystemNamespace() const		{ return fFileSystemNamespace;}
			XBOX::VSystemWorkerNamespace*	GetSystemWorkerNamespace() const	{ return fSystemWorkerNamespace;}

			// debugger utilities
			bool						CanHandlesDebuggerServer() const;
			WAKDebuggerType_t			GetDebuggerServer();
			sLONG						IsDebugging();
			XBOX::VError				StartDebugger( VRIAContext* inContext);
			XBOX::VError				StopDebugger( VRIAContext* inContext);
			sLONG						CanSetDebuggerServer( WAKDebuggerType_t inWAKDebuggerType);
			// if inAsynchronous parameter is true, the debugger will be set asynchronously in the main task
			// from a JavaScript context, the debugger must be set asynchronously
			XBOX::VError				SetDebuggerServer( VRIAContext* inContext, WAKDebuggerType_t inWAKDebuggerType, bool inAsynchronous, VRIAServerJob *inJob);
			XBOX::VError				GetDebuggerStatus(
											VRIAContext*		inContext,
											WAKDebuggerType_t&	outWAKDebuggerType,
											bool&				outStarted,
											sLONG&				outbreakpointsTimeStamp,
											bool&				outConnected,
											sLONG&				outDebuggingEventsTimeStamp,
											bool&				outPendingContexts);

			// breakpoints utilities
			XBOX::VError				SetBreakpoint( VRIAContext* inContext, const XBOX::VString& inUrl, sLONG inLineNb);
			XBOX::VError				RemoveBreakpoint( VRIAContext* inContext, const XBOX::VString& inUrl, sLONG inLineNb);
			XBOX::VError				RemoveAllBreakpoints( VRIAContext* inContext, const XBOX::VString& inUrl);
			XBOX::VError				GetBreakpoints( VRIAContext* inContext, const XBOX::VJSContext& inJSContext, XBOX::VJSArray& ioBreakpoints);

private:

			// Inherited from IJSContextPoolDelegate
	virtual	XBOX::IJSRuntimeDelegate*	GetRuntimeDelegate();
			// @brief	Create a runtime context and attach it to the JavaScript context, set the global object properties. */
	virtual	XBOX::VError				InitializeJSContext( XBOX::VJSGlobalContext* inContext);
	virtual	XBOX::VError				UninitializeJSContext( XBOX::VJSGlobalContext* inContext);

			// debugger utilities
			// set the current debugger and start it, this project begins to handle the debugger
			XBOX::VError				_SetDebuggerServer( WAKDebuggerType_t inWAKDebuggerType, VRIAServerJob *inJob);
			// stop the current debugger, this project stops to handle the debugger
			XBOX::VError				_TerminateDebuggerHandling();
			XBOX::VError				_StartDebugger();
			XBOX::VError				_StopDebugger();

			XBOX::VError				_Open( VProject* inDesignProject, VRIAServerProjectOpeningParameters *inOpeningParameters, CUAGDirectory* inUAGDirectory);

			/** @brief	Update the settings collection with all available settings files */
			XBOX::VError				_LoadSettingsFile();

			VRIAPermissions*			_LoadPermissionFile( XBOX::VError& outError);

			XBOX::VError				_LoadBackupSettings();

			XBOX::VError				_LoadFileSystemDefinitions();
			XBOX::VError				_LoadSystemWorkerDefinitions();

		#if WITH_SANDBOXED_PROJECT
			CUAGDirectory*				_OpenUAGDirectory( XBOX::VError& outError);
		#endif

			/** @brief	Open the default database of the project */
			CDB4DBase*					_OpenDatabase( XBOX::VError& outError);
			XBOX::VError				_HandleDataBaseDataFileOpeningError(CDB4DBase* inBase,const XBOX::VFilePath& inDataFilePath,XBOX::VError inErrorToHandle);
			XBOX::VError				_OpenJournal(CDB4DBase* inBase,const XBOX::VFilePath& inDataFilePath,bool inNewDataFile);
			XBOX::VError				_IntegrateJournalFile(CDB4DBase* inBase,const XBOX::VFilePath& inDataFilePath,const XBOX::VFilePath& inJournalPath,bool force);
			XBOX::VError				_RestoreDataFolderFromLastBackup(const XBOX::VFilePath& inDataFilePath,XBOX::VFilePath& outReplacedDataFolderLocation);


			/**
			 * \brief Computes the journal path by using the application settings defined journal folder.
			 * \details the application settings defines the journal folder as an absolute or relative path. If relative
			 * the path must be resolved against the the data folder
			 * \param outJournalPath the actual journal file path
			 * \param outContainedInDataFolder if true then @c outJournalPath is inside the data folder hierarchy
			 * \return true if @c outJournalPath is valid (the database has some journal related parameter)
			 * \return false if the database has no journal parameter and @c outJournalPath is irrelevant
			 */
			bool						_ComputeJournalPathFromSettings(XBOX::VFilePath& outJournalPath,bool& outContainedInDataFolder)const;

			/**
			 * \brief Computes the journal path by using the application settings defined journal folder.
			 * \details the application settings defines the journal folder as an absolute or relative path. If relative
			 * the path will be resolved against @c inBaseFolder
			 * \param inBaseFolder the base folder to resolve a relative path against
			 * \param outJournalPath the actual journal file path
			 * \param outContainedInBaseFolder if true then @c outJournalPath is inside @c outContainedInBaseFolder sub-tree
			 * \return true if @c outJournalPath is valid (the database has some journal related parameter)
			 * \return false if the database has no journal parameter and @c outJournalPath is irrelevant
			 */
			bool						_ComputeJournalPath(const XBOX::VFilePath& inBaseFolder,XBOX::VFilePath& outJournalPath,bool& outContainedInBaseFolder)const;

			void						_CloseAndReleaseDatabase( CDB4DBase *inBase);

			/**	@brief	HTTP Server low-level handling */
			XBOX::VError				_StartHTTPServer();
			/** @brief	Disable the context registration, wait for all contexts being unregistered, stop the services which depend on the http server, and finally stop the http server. */
			XBOX::VError				_StopHTTPServer();

			/**	@brief	Returns the rpc catalog which has been built from the methods files (*.js) and catalog files (*.waRpc) */
			VRPCCatalog*				_RetainRPCCatalog( XBOX::VError& outError, const IHTTPRequest* inRequest, IHTTPResponse* inResponse);

			/** @brief	Returns NULL if inContext is not valid, else returns a valid retained context.
						Typically, _ValidateAndRetainContext() should be used to validate a context passed as parameter. */
			VRIAContext*				_ValidateAndRetainContext( VRIAContext* inContext, bool inCreateContextIfNull);

			/**	@brief	Disable the application context creation. Return previous context creation state. */
			bool						_SetContextCreationEnabled( bool inEnabled);
			bool						_IsContextCreationEnabled() const;

			XBOX::VError				_EvaluateScript( const XBOX::VFilePath& inFilePath);

			// JavaScript services utilities
			/** @brief	Post a message to the registered services. */
			XBOX::VError				_PostServicesMessage( const XBOX::VString& inMessageName);

			sLONG						fRequestNumber;
			sLONG						fLastGarbageCollectRequest;
			sLONG8						fLastWorkingSetSize;

			VRIAServerSolution			*fSolution;
			VProject					*fDesignProject;
			VFolder						*fDesignProjectFolder;
			XBOX::VString				fName;
			XBOX::VString				fLoggerID;
			VProjectSettings			fSettings;
			VRIAPermissions				*fPermissions;
			IBackupSettings				*fBackupSettings;
			WAKDebuggerType_t			fDebuggerType;
			CUAGDirectory				*fUAGDirectory;

		#if WITH_SANDBOXED_PROJECT
			VProjectLogListener			*fLogListener;
			VRemoteDebuggerBreakpointsManager	*fWAKBreakpointsManager;
			VJSDebuggerSettings			*fDebuggerSettings;
		#endif


			VRIAServerProjectOpeningParameters	*fOpeningParameters;

			typedef struct
			{
				uBYTE opened : 1;
				uBYTE started : 1;
				uBYTE inMaintenance : 1;
				uBYTE sandboxed : 1;
				uBYTE unused : 4;
			} ApplicationState;

			ApplicationState			fState;

			// Database
			CDB4DBase					*fDatabase;
	mutable	XBOX::VCriticalSection		fReloadDatabaseMutex;

			// Data service
			VDataService				*fDataService;

			// Security Manager
			CSecurityManager			*fSecurityManager;

			// HTTP Server
			IHTTPServerProject *		fHTTPServerProject;

			// RPC service
			VRPCService					*fRPCService;

			// Application context
			VRIAContextManager			*fContextMgr;
			bool						fContextCreationEnabled;

			// JavaScript contexts
			VJSContextPool						*fJSContextPool;
			VRIAServerProjectJSRuntimeDelegate	*fJSRuntimeDelegate;

			// HTTP sessions
			VRIAHTTPSessionManager		*fSessionMgr;

			XBOX::VJSSessionStorageObject		*fApplicationStorage;
			XBOX::VJSSessionStorageObject		*fApplicationSettings;

			XBOX::VFileSystemNamespace*			fFileSystemNamespace;
			XBOX::VSystemWorkerNamespace*		fSystemWorkerNamespace;

	friend	class VStopHTTPServerMessage;
	friend	class VReloadCatalogMessage;
	friend	class VSetDebuggerServerMessage;
};



// ----------------------------------------------------------------------------


class VRIAWebSocketHandler : public IWebSocketHandler
{
public:

							VRIAWebSocketHandler (
								const XBOX::VString &inPath, 
								VRIAServerProject *inApplication,
								XBOX::IJSRuntimeDelegate::WebSocketHandler *inHandler, 
								void *inUserData);
	virtual					~VRIAWebSocketHandler ();

	virtual XBOX::VError	GetPatterns (XBOX::VectorOfVString *outPatterns) const;
	virtual XBOX::VError	HandleRequest (IHTTPResponse *ioResponse);

private:

			XBOX::VString								fPath;
			VRIAServerProject							*fApplication;
			XBOX::IJSRuntimeDelegate::WebSocketHandler	*fHandler;
			void										*fUserData;
};

class VRIAServerProjectJSRuntimeDelegate : public XBOX::VObject, public XBOX::IJSRuntimeDelegate
{
public:
			VRIAServerProjectJSRuntimeDelegate( VRIAServerProject* inApplication);
	virtual ~VRIAServerProjectJSRuntimeDelegate();

	virtual	XBOX::VFolder*					RetainScriptsFolder();
	virtual XBOX::VProgressIndicator*		CreateProgressIndicator( const XBOX::VString& inTitle);
	virtual	XBOX::VFileSystemNamespace*		RetainRuntimeFileSystemNamespace();
	virtual	XBOX::VSystemWorkerNamespace*	RetainRuntimeSystemWorkerNamespace();

	virtual XBOX::VError					AddWebSocketHandler (XBOX::VJSContext &inContext, const XBOX::VString &inPath, WebSocketHandler *inHandler, void *inUserData);
	virtual XBOX::VError					RemoveWebSocketHandler (XBOX::VJSContext &inContext, const XBOX::VString &inPath);

private:

	typedef std::map<XBOX::VString, VRefPtr<VRIAWebSocketHandler> >	WebSocketHandlerMap;
	
			XBOX::VCriticalSection			fMutex;
			VRIAServerProject				*fApplication;
			WebSocketHandlerMap				fWebSocketHandlers;

			XBOX::VError					_RemoveAllHandlers ();
};



// ----------------------------------------------------------------------------



class VReloadCatalogMessage : public XBOX::VMessage
{
public:
	VReloadCatalogMessage( VRIAServerProject* inApplication);
	virtual ~VReloadCatalogMessage();

protected:
	virtual	void DoExecute();

private:
			VRIAServerProject	*fApplication;
};



// ----------------------------------------------------------------------------



class VSetDebuggerServerMessage : public XBOX::VMessage
{
public:
	VSetDebuggerServerMessage( VRIAServerProject* inApplication, WAKDebuggerType_t inWAKDebuggerType, VRIAServerJob *inJob);
	virtual ~VSetDebuggerServerMessage();

protected:
	virtual	void DoExecute();

private:
			VRIAServerProject	*fApplication;
			WAKDebuggerType_t	fDebuggerType;
			VRIAServerJob		*fJob;
};



//------- TODO: Move in separates files later
//--------------------------------------------------------------------------------------------------


class VRoutingRule : public XBOX::VObject, public XBOX::IRefCountable
{
public:
								VRoutingRule();
	virtual						~VRoutingRule();

	XBOX::VError				LoadFromJSONValue (const XBOX::VJSONValue& inJSONValue);

	const XBOX::VString&		GetName() const { return fName; }
	const XBOX::VString&		GetSuffix() const { return fSuffix; }

	bool						MatchString (const XBOX::VString& inString);

private:
	//				  Includes		 Excludes
	typedef std::pair<XBOX::VString, XBOX::VString>	VRoutingRulePair;
	typedef std::vector<VRoutingRulePair>	VectorOfVRoutingRulePair;

	XBOX::VString				fName;
	XBOX::VString				fSuffix;

	VectorOfVRoutingRulePair	fRules;
};
typedef XBOX::VRefPtr<VRoutingRule>	VRoutingRuleRefPtr;


class VRoutingRulesList : public XBOX::VObject, public XBOX::IRefCountable
{
public:
	VRoutingRulesList();
	virtual						~VRoutingRulesList();

	XBOX::VError				LoadFromJSONValue (const XBOX::VJSONValue& inJSONValue);

	bool						FindMatchingRule (const XBOX::VString& inString, XBOX::VString& outMatchingRuleSuffix);
	bool						AcceptRuleSuffix (const XBOX::VString& inString);

private:
	typedef std::vector<VRoutingRuleRefPtr>	VRoutingRulesVector;

	VRoutingRulesVector			fRoutingRulesList;
	XBOX::VCriticalSection		fLock;
};


class VRoutingPreProcessingHandler : public IPreProcessingHandler
{
public:
									VRoutingPreProcessingHandler (const XBOX::VFilePath& inPath);
	virtual							~VRoutingPreProcessingHandler();

	XBOX::VError					GetPatterns (XBOX::VectorOfVString *outPatterns) const;
	XBOX::VError					HandleRequest (IHTTPResponse *ioResponse);

	static XBOX::VError				ResolveURL (IHTTPRequest *inRequest, const XBOX::VString& inURL, XBOX::VFilePath& outFilePath, XBOX::VFilePath& outWebFolderPath);

#if WITH_SANDBOXED_PROJECT
	static	void					DeInit();
#endif // WITH_SANDBOXED_PROJECT

private:
	static	VRoutingRulesList *		fRoutingRulesList;

	static void						_InitRulesFromFile (const XBOX::VFilePath& inFilePath);
	static XBOX::VError				_ResolveURL (const XBOX::VFilePath& inBaseFolderPath, const XBOX::VString& inVirtualFolderName, XBOX::VString& ioURL, IHTTPResponse *ioResponse);

};

#endif
