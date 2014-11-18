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
#ifndef __RIAServerApplication__
#define __RIAServerApplication__


#include "VRIAServerJSContextMgr.h"


// Needed declarations
class CDB4DManager;
class CLanguageSyntaxComponent;
class CRIAServerComponentBridge;
class VRIAServerSolution;
class VRIAOpenSolutionAsCurrentSolutionMessage;
class VRIACloseCurrentSolutionMessage;
class VDataCacheFlushMessage;
class VRIAServerApplication;
class VSolutionStartupParameters;
class CHTTPServer;
class VSolution;
class VRIAServerJSContextMgr;
class VRIAServerProgressIndicator;
class VRIAServerJSRuntimeDelegate;
class VRIAServerJob;
class VRIAServerProjectOpeningParameters;
class VRIAServerConfiguration;


// ----------------------------------------------------------------------------



class VRIAServerStartupParameters : public XBOX::VObject, public XBOX::IRefCountable
{
public:

			VRIAServerStartupParameters();
	virtual	~VRIAServerStartupParameters();

			void								SetSolutionToLaunch( XBOX::VFile* inSolutionFile);
			XBOX::VFile*						GetSolutionToLaunch() const;

			void								SetAdministratorHttpPort( sLONG inPort);
			bool								GetAdministratorHttpPort( sLONG& outPort) const;

			void								SetAdministratorSSLPort( sLONG inPort);
			bool								GetAdministratorSSLPort( sLONG& outPort) const;

			void								SetQuitServerWhenSolutionIsClosed( bool inQuitServer);
			bool								GetQuitServerWhenSolutionIsClosed( bool& outQuitServer);

			void								SetJavaScriptFileToExecute( XBOX::VFile* inJavaScriptFile);
			XBOX::VFile*						GetJavaScriptFileToExecute() const;

			void								SetNetDump(bool inWithServerNetDump);
			bool								GetNetDump(bool& outWithServerNetDump);

			void								SetDebuggingAuthorized( bool inAuthorized);
			bool								GetDebuggingAuthorized( bool& outAuthorized) const;

			void								SetDebuggerType( WAKDebuggerType_t inType);
			bool								GetDebuggerType( WAKDebuggerType_t &outType) const;

			void								SetAllowDebugAdministrator( bool inAllowDebugAdministrator);
			bool								GetAllowDebugAdministrator() const;

			void								SetAdminLogin( const XBOX::VString& inLogin);
			bool								GetAdminLogin( XBOX::VString& outLogin) const;

			void								SetAdminPassword( const XBOX::VString& inPassword);
			bool								GetAdminPassword( XBOX::VString& outPassword) const;

			void								SetJobID( const XBOX::VString& inJobID);
			bool								GetJobID( XBOX::VString& outJobID) const;

		#if WITH_SANDBOXED_PROJECT
			void								SetWithSandboxedProject( bool inWithSandboxedProject);
			bool								GetWithSandBoxedProject() const;

			void								SetConfigurationFilePath( const XBOX::VFilePath& inPath);
			void								GetConfigurationFilePath( XBOX::VFilePath& outPath) const;

			void								AddProjectToOpen( const XBOX::VFilePath& inProjectFilePath);
			void								GetProjectsToOpen( std::vector<XBOX::VFilePath>& outProjectFilePaths) const;
			bool								HasProjectToOpen() const;
		#endif

		#if WITH_SANDBOXED_SYSTEM_WORKERS
			void								SetSystemWorkersFilePath( const XBOX::VFilePath& inPath);
			void								GetSystemWorkersFilePath( XBOX::VFilePath& outPath) const;
		#endif



private:

			XBOX::VValueBag						fBag;
			XBOX::VFile							*fSolutionFile;
			XBOX::VFile							*fJavaScriptFile;
		#if  WITH_SANDBOXED_PROJECT
			std::vector<XBOX::VFilePath>		fProjectToOpen;
			XBOX::VFilePath						fConfigurationFilePath;
		#endif

		#if WITH_SANDBOXED_SYSTEM_WORKERS
			XBOX::VFilePath						fSystemWorkersFilePath;
		#endif

};



// ----------------------------------------------------------------------------



class VRIAServerStartupMessage : public XBOX::VMessage
{
public:
			VRIAServerStartupMessage( VRIAServerApplication* inServer, VRIAServerStartupParameters *inStartupParameters);
	virtual ~VRIAServerStartupMessage();

protected:
	virtual	void		DoExecute();

private:
			VRIAServerApplication			*fServer;
			VRIAServerStartupParameters		*fStartupParameters;
};



// ----------------------------------------------------------------------------



class VRIAOpenSolutionAsCurrentSolutionMessage : public XBOX::VMessage
{
public:
			VRIAOpenSolutionAsCurrentSolutionMessage( VRIAServerApplication* inServer, VSolutionStartupParameters *inStartupParameters, VRIAServerJob *inJob);
	virtual ~VRIAOpenSolutionAsCurrentSolutionMessage();

protected:
	virtual	void		DoExecute();

private:
			VRIAServerApplication			*fServer;
			VSolutionStartupParameters		*fStartupParameters;
			VRIAServerJob					*fJob;
};



// ----------------------------------------------------------------------------



class VRIAServerApplication : public XBOX::VDaemon, public IJSContextPoolDelegate, public XBOX::IIdleable
{
typedef XBOX::VDaemon inherited;

public:
			VRIAServerApplication();
	virtual ~VRIAServerApplication();

			// There's one and only VRIAServerApplication instance.
			// Write VRIAServerApplication()::Get()-> to use it.
	static	VRIAServerApplication*			Get()		{ return sCurrentApplication; }

	bool									IsEnterpriseVersion();
	virtual	bool							Init(VProcess::InitOptions inOptions);

			// Application package folders

			enum
			{
				eFS_Walib		= 'walb'	// walib folder
			};

	virtual	XBOX::VFolder*					RetainFolder( XBOX::VProcess::EFolderKind inSelector) const;
			XBOX::VFolder*					RetainApplicationPackageFolder() const;
			XBOX::VFolder*					RetainApplicationResourcesFolder() const;
			XBOX::VFolder*					RetainApplicationDTDsFolder() const;
			XBOX::VFolder*					RetainExecutableFolder() const;
			XBOX::VFolder*					RetainNativeComponentsFolder() const;
			/** @brief Returns the Walib folder path */
			void							GetWALibraryFolderPath( XBOX::VFilePath& outPath) const;
			/** @brief Returns the WAF folder path */
			void							GetWAFrameworkFolderPath( XBOX::VFilePath& outPath) const;

			XBOX::VFolder*					RetainUserPreferencesFolder( bool inCreateIfNotExists) const;

			/**	@brief	Link files are used to store some informations about the solutions which have been opened onto the server. */
			XBOX::VFolder*					RetainSolutionsLinkFilesFolder( bool inCreateIfNotExists) const;

			// Components
			CDB4DManager*					GetComponentDB4D() const;
			CLanguageSyntaxComponent*		GetComponentLanguageSyntax() const;
			CHTTPServer*					GetComponentHTTP() const;

	virtual	XBOX::VString					GetLogSourceIdentifier() const;

			// Localization
			XBOX::VLocalizationManager*		RetainLocalizer() const;

			// Solution startup parameters
			VSolutionStartupParameters*		RetainDefaultSolutionStartupParameters() const;

			// Server startup parameters
			VRIAServerStartupParameters*	RetainStartupParameters() const;

			/**	@brief	the current running solution, if exists, is closed. Then, the new solution is opened and becomes the current running solution
						all the processing is done asynchronously in the main task
			*/
			XBOX::VError					OpenSolutionAsCurrentSolution( const XBOX::VFilePath& inDesignSolutionFilePath, VRIAServerJob *inJob);
			XBOX::VError					OpenSolutionAsCurrentSolution( VSolutionStartupParameters *inStartupParameters, VRIAServerJob *inJob);

			/**	@brief	the current running solution, if exists, is closed asynchronously in the main task */
			XBOX::VError					CloseCurrentSolution();

			/*	@brief	returns current running solution. */
			VRIAServerSolution*				RetainCurrentSolution() const;

			bool							IsCurrentSolution( VRIAServerSolution *inSolution) const;

			/* @brief	the solution is opened synchronously for maintenance
						the current running solution, if exists, remains unchanged
			*/
			VRIAServerSolution*				OpenAndRetainSolutionForMaintenance( XBOX::VError& outError,  VSolutionStartupParameters *inStartupParameters, VRIAServerJob *inJob);

			// for asynchronous high-level actions (open a solution, set the debugger...), messages will be executed at idle time
			XBOX::VError					PostMessage( XBOX::VMessage *inMessage);

			/** @brief	The data cache is flushed periodically, according to the flush delay in milliseconds. */
			void							SetDataCacheFlushEnabled( bool inEnabled);
			bool							IsDataCacheFlushEnabled() const;
			void							SetDataCacheFlushDelay( sLONG inDelay);
			sLONG							GetDataCacheFlushDelay() const;

			VRIAServerJSContextMgr*			GetJSContextMgr() const;

			XBOX::VJSGlobalContext*			RetainJSContext( XBOX::VError& outError, bool inReusable);
			XBOX::VError					ReleaseJSContext( XBOX::VJSGlobalContext* inContext);

    
            void							SetBonjourActivated(bool inBonjourActivated);
            bool							GetBonjourActivated();
			void							PublishServiceRecordEvent ();
			void							GetProgressInfos(const XBOX::VString& inServiceName, XBOX::VLong& outProgressInfos, XBOX::VLong& outProgressSessions);

			bool							GetDebuggingAuthorized() const;

		#if WITH_SANDBOXED_PROJECT
			// sandboxed projects utilities
			bool							GetHandlesSandboxedProject() const;

			/** @brief	Open a project in sandboxed mode without start it. The project is added to the sandboxed projects list. */
			VRIAServerProject*				OpenAndRetainProject( XBOX::VError& outError, const XBOX::VFile& inProjectFile, VRIAServerProjectOpeningParameters* inProjectParams);
			/** @brief	Close a sandboxed project and remove it from the sandboxed projects list. */
			XBOX::VError					CloseProject( VRIAServerProject* inProject);

			XBOX::VError					StartProject( VRIAServerProject* inProject);
			XBOX::VError					StopProject( VRIAServerProject* inProject);

			VRIAServerProject*				RetainProjectByName( const XBOX::VString& inName) const;
			void							RetainAllProjects( VectorOfApplication& outProjects) const;

			XBOX::VFilePath					GetConfigurationFolderPath() const		{ return fConfigurationFolderPath; }
		#endif

		#if WITH_SANDBOXED_SYSTEM_WORKERS
			XBOX::VSystemWorkerNamespace*	GetSystemWorkerNamespace() const		{ return fSystemWorkerNamespace; }
		#endif


protected:
	virtual	void							DoRun(); // override
	virtual	void							DoQuit(); // override
			// Inherited from IIdleable
	virtual	void							DoIdle(); // override
	#if WITH_NEW_XTOOLBOX_GETOPT
	virtual XBOX::VCommandLineParser::Error	DoParseCommandLine(XBOX::VCommandLineParser&); // override
	#endif

private:

			// Inherited from IJSContextPoolDelegate
	virtual	XBOX::IJSRuntimeDelegate*		GetRuntimeDelegate();
			// @brief	Create a runtime context and attach it to the JavaScript context, set the global object properties. */
	virtual	XBOX::VError					InitializeJSContext( XBOX::VJSGlobalContext* inContext);
	virtual	XBOX::VError					UninitializeJSContext( XBOX::VJSGlobalContext* inContext);

			bool							_Init();
			bool							_InitFileSystems();
			void							_DeInit();

			void							_OnStartup( VRIAServerStartupParameters *inStartupParameters);

			XBOX::VError					_OpenSolutionAsCurrentSolution( VSolutionStartupParameters *inStartupParameters, VRIAServerJob *inJob);
			XBOX::VError					_CloseCurrentSolution();

		#if WITH_SANDBOXED_PROJECT
			XBOX::VError					_OpenServerAdminProject();
			XBOX::VError					_CloseAllProjects();
		#endif

			void							_FlushDataCache();

			void							_PublishServiceRecord (const XBOX::VString &inServiceName);
			void							_WithdrawServiceRecord (const XBOX::VString &inServiceName, const XBOX::VString& inProviderName);
			void							_UpdateRunningServerFile();
			void							_DeleteRunningServerFile();

			XBOX::VSignalT_0*				GetPublishEventSignal() { return &fPublishEventSignal; }

	static	void							_CleanupUserCacheFolder();

	static	VRIAServerApplication*			sCurrentApplication;

			bool							fInitCalled;
			bool							fInitOK;
	mutable	XBOX::VCriticalSection			fMutex;

			CDB4DManager*					fComponent_DB4D;
			CLanguageSyntaxComponent*		fComponent_LanguageSyntax;
			CHTTPServer*					fComponent_HTTP;
			CRIAServerComponentBridge*		fComponent_Bridge;

			VRIAServerSolution*				fSolution;
	mutable	XBOX::VCriticalSection			fSolutionMutex;
			sLONG							fIsOpeningOrClosingCurrentSolution;
			sLONG							fPreventMessageExecutionsAtIdleTime;

			XBOX::VLocalizationManager*		fLocalizer;

			bool							fDataCacheFlushEnabled;
			sLONG							fDataCacheFlushDelay;	// delay in milliseconds
	mutable	XBOX::VCriticalSection			fDataCacheMutex;

            bool							fBonjourActivated;
			XBOX::VServiceDiscoveryServer*	fServiceDiscoveryServer;

			VRIAServerStartupParameters*	fStartupParameters;

			VJSContextPool*					fJSContextPool;
			VRIAServerJSRuntimeDelegate*	fJSRuntimeDelegate;

			VRIAServerJSContextMgr*			fJSContextMgr;

			XBOX::VCriticalSection			fPublishMutex;

			VRIAServerProgressIndicator*	fIndexProgressIndicator;
			VRIAServerProgressIndicator*	fFlushProgressIndicator;
			XBOX::VSignalT_0				fPublishEventSignal;

			XBOX::VMessageQueue				fMessageQueue;

#if WITH_SANDBOXED_PROJECT
			VectorOfApplication				fProjectsCollection;
	mutable	XBOX::VCriticalSection			fProjectsCollectionMutex;
			XBOX::VFilePath					fConfigurationFolderPath;
#endif

#if WITH_SANDBOXED_SYSTEM_WORKERS
			XBOX::VSystemWorkerNamespace*	fSystemWorkerNamespace;
#endif

	friend	class VRIAOpenSolutionAsCurrentSolutionMessage;
	friend	class VRIACloseCurrentSolutionMessage;
	friend	class VDataCacheFlushMessage;
	friend	class VRIAServerStartupMessage;
};



// ----------------------------------------------------------------------------



class VRIAServerJSRuntimeDelegate : public XBOX::VObject, public XBOX::IJSRuntimeDelegate
{
public:
			VRIAServerJSRuntimeDelegate( XBOX::VFolder *inScriptFolder);
	virtual ~VRIAServerJSRuntimeDelegate();

	virtual	XBOX::VFolder*					RetainScriptsFolder();
	virtual XBOX::VProgressIndicator*		CreateProgressIndicator( const XBOX::VString& inTitle);
	virtual	XBOX::VFileSystemNamespace*		RetainRuntimeFileSystemNamespace();
	virtual XBOX::VSystemWorkerNamespace*	RetainRuntimeSystemWorkerNamespace();

private:
			XBOX::VFolder					*fScriptFolder;
};



// ----------------------------------------------------------------------------


#if  WITH_SANDBOXED_PROJECT

class VRIAServerConfiguration : public XBOX::VObject, public XBOX::IRefCountable
{
public:
			VRIAServerConfiguration();
	virtual	~VRIAServerConfiguration();

			XBOX::VError				Load( const XBOX::VFile& inFile);

			bool						GetName( XBOX::VString& outName) const;
			bool						GetFolderPath( XBOX::VFilePath& outPath) const;

			void						GetProjects( std::vector<XBOX::VFilePath>& outProjectFilePaths) const;

private:
			XBOX::VJSONValue			fConfiguration;
};

#endif



#endif
