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
#ifndef __RIAServerSolution__
#define __RIAServerSolution__



#include "VRIASettingsFile.h"
#include "VSolutionSettings.h"
#include "VRIAServerJSContextMgr.h"
#include "BreakPointsManager.h"
#include "VRemoteDebuggerBreakpointsManager.h"

class VSolution;
class VRIAServerProject;
class VRIAServerJSContext;
class VRIAServerSolutionJSRuntimeDelegate;
class VSolutionStartupParameters;
class CUAGDirectory;
class VJSDebuggerSettings;
class IBackupSettings;
class VRIAPermissions;



// ----------------------------------------------------------------------------



namespace SolutionOpeningParametersKeys
{
	EXTERN_BAGKEY( solutionOpeningParameters);
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( openingMode, XBOX::VLong, sLONG);
	EXTERN_BAGKEY_NO_DEFAULT_SCALAR( customAdministratorHttpPort, XBOX::VLong, sLONG);
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( openDefaultSolutionIfOpeningFails, XBOX::VBoolean, bool);
}



class VRIAServerSolutionOpeningParameters : public XBOX::VObject, public XBOX::IRefCountable
{
public:
			VRIAServerSolutionOpeningParameters();
			VRIAServerSolutionOpeningParameters( const VRIAServerSolutionOpeningParameters& inSource);
			// The opening parameters will be loaded from the startup parameters
			VRIAServerSolutionOpeningParameters( VSolutionStartupParameters *inStartupParameters);
	virtual ~VRIAServerSolutionOpeningParameters();

			XBOX::VValueBag*		RetainBag() const;
			
			// Save the opening parameters into the startup parameters
			void					UpdateStartupParameters( VSolutionStartupParameters *inStartupParameters);

			void					SetOpeningMode( ESolutionOpeningMode inOpeningMode);
			ESolutionOpeningMode	GetOpeningMode() const;

			void					SetCustomAdministratorHttpPort( sLONG inPort);
			bool					GetCustomAdministratorHttpPort( sLONG& outPort) const;

			void					SetCustomAdministratorSSLPort( sLONG inPort);
			bool					GetCustomAdministratorSSLPort( sLONG& outPort) const;

			void					SetCustomAdministratorAuthType( const XBOX::VString& inAuthenticationType);
			bool					GetCustomAdministratorAuthType( XBOX::VString& outAuthenticationType) const;

			void					SetOpenDefaultSolutionWhenOpeningFails( bool inOpenDefaultSolution);
			bool					GetOpenDefaultSolutionWhenOpeningFails() const;

			void					SetDebuggerType( WAKDebuggerType_t inType);
			bool					GetDebuggerType( WAKDebuggerType_t &outType) const;

			void					SetAdministratorHandlesDebugger( bool inAdministratorHandlesDebugger);
			bool					GetAdministratorHandlesDebugger() const;

			void					SetCreateAdminUser( bool inCreateAdminUser);
			bool					GetCreateAdminUser() const;

private:
			XBOX::VValueBag			*fBag;
};



class VRIAServerSolution : public XBOX::VObject, public XBOX::IRefCountable, public IJSContextPoolDelegate
{
public:

	typedef std::map< XBOX::VUUID, XBOX::VRefPtr<VRIAServerProject> >					MapOfApplication;
	typedef std::map< XBOX::VUUID, XBOX::VRefPtr<VRIAServerProject> >::iterator			MapOfApplication_iter;
	typedef std::map< XBOX::VUUID, XBOX::VRefPtr<VRIAServerProject> >::const_iterator	MapOfApplication_citer;
	
	VRIAServerSolution();
	virtual ~VRIAServerSolution();

			/**	@brief	Open a solution file, load the settings and create a ria application for each project.
						If needed, default opening parameters are created. */
	static	VRIAServerSolution*				OpenSolution( XBOX::VError& outError, VSolutionStartupParameters *inStartupParameters);
			XBOX::VError					Close();

			/**	@brief	Start the ria applications */
			XBOX::VError					Start();
			
			/**	@brief	Stop the ria applications */
			XBOX::VError					Stop();

			// Accessors
			VSolution*						GetDesignSolution() const;
			void							GetName( XBOX::VString& outName) const;
			const XBOX::VString&			GetName() const											{ return fName; }
			/**	@brief	Returns the physical folder which contains the design solution file */
			XBOX::VFolder*					RetainFolder() const;
			XBOX::VFile*					RetainSolutionFile() const;
			/** @brief	Returns the folder which contains the log files. */
			XBOX::VFolder*					RetainLogFolder( bool inCreateIfNotExists) const;
			/** @brief	Returns the settings file which contains the setting. */
			const VRIASettingsFile*			RetainSettingsFile( const RIASettingsID& inSettingsID) const;

			const IBackupSettings*			RetainBackupSettings()const;

			CUAGDirectory*					RetainUAGDirectory() const;

			VRIAPermissions*				RetainPermissions( XBOX::VError *outError) const;

			bool							GetUUID( XBOX::VUUID& outUUID) const;

			// Logging
			const XBOX::VString&			GetMessagesLoggerID() const;

			VRIAServerProject*				RetainApplicationByName( const XBOX::VString& inName) const;
			VRIAServerProject*				RetainApplicationByUUID( const XBOX::VUUID& inUUID) const;
			void							GetApplications( VectorOfApplication& ouApplicationsCollection);

			const VSolutionSettings&		GetSettings() const;

			XBOX::VFileSystemNamespace*		GetFileSystemNamespace() const		{ return fFileSystemNamespace;}
			XBOX::VSystemWorkerNamespace*	GetSystemWorkerNamespace() const	{ return fSystemWorkerNamespace;}

			bool							CanGarbageCollect ( ) { return fGarbageCollect; }

			// breakpoints utilities
			void							GetBreakpoints( std::set< VRemoteDebuggerBreakpointsManager::VFileBreakpoints > & outBrkpts );
			void							AddBreakpoint(const XBOX::VString& inUrl, sLONG inLineNb);
			void							RemoveBreakpoint(const XBOX::VString& inUrl, sLONG inLineNb);
			void							RemoveAllBreakpoints(const XBOX::VString& inUrl);
			void							GetBreakpointsTimeStamp(sLONG& outbreakpointsTimeStamp);

private:

			// Inherited from IJSContextPoolDelegate
	virtual	XBOX::IJSRuntimeDelegate*		GetRuntimeDelegate();
			// @brief	Create a runtime context and attach it to the JavaScript context, set the global object properties. */
	virtual	XBOX::VError					InitializeJSContext( XBOX::VJSGlobalContext* inContext);
	virtual	XBOX::VError					UninitializeJSContext( XBOX::VJSGlobalContext* inContext);

			XBOX::VError					_Open( VSolution* inDesignSolution, VRIAServerSolutionOpeningParameters *inOpeningParameters);

			/** @brief	Update the settings collection with all available settings files */
			XBOX::VError					_LoadFileSettings();

			/** @brief	Init the DB4D Component with the solution database settings */
			XBOX::VError					_LoadDatabaseSettings();

			XBOX::VError					_LoadFileSystemDefinitions();
			XBOX::VError					_LoadSystemWorkerDefinitions();

			CUAGDirectory*					_OpenUAGDirectory( XBOX::VError& outError);

			VRIAPermissions*				_LoadPermissionFile( XBOX::VError& outError);

			XBOX::VString					fName;
			VSolution						*fDesignSolution;
			XBOX::VFolder					*fDesignSolutionFolder;
			IBackupSettings					*fBackupSettings;///Backup settings defined at the solution level

			VRIAServerSolutionOpeningParameters	*fOpeningParameters;
			
			typedef struct
			{
				uBYTE opened : 1;
				uBYTE started : 1;
				uBYTE inMaintenance : 1;
				uBYTE unused : 5;
			} SolutionState;

			SolutionState					fState;

			VectorOfApplication				fApplicationsCollection;
			MapOfApplication				fApplicationsMap;
	mutable	XBOX::VCriticalSection			fApplicationsMutex;

			VSolutionSettings				fSettings;
			VJSDebuggerSettings*			fDebuggerSettings;

			// Users and groups directory
			CUAGDirectory					*fUAGDirectory;
			VRIAPermissions					*fPermissions;

			// JavaScript contexts
			VJSContextPool							*fJSContextPool;
			VRIAServerSolutionJSRuntimeDelegate		*fJSRuntimeDelegate;

			XBOX::VLog4jMsgFileLogger		*fLogger;
			XBOX::VString					fLoggerID;

			bool							fGarbageCollect;
			VRemoteDebuggerBreakpointsManager*			fWAKBreakpointsManager;

			XBOX::VFileSystemNamespace*		fFileSystemNamespace;
			XBOX::VSystemWorkerNamespace*	fSystemWorkerNamespace;
};



// ----------------------------------------------------------------------------



class VRIAServerSolutionJSRuntimeDelegate : public XBOX::VObject, public XBOX::IJSRuntimeDelegate
{
public:
			VRIAServerSolutionJSRuntimeDelegate( VRIAServerSolution* inSolution);
	virtual ~VRIAServerSolutionJSRuntimeDelegate();

	virtual	XBOX::VFolder*					RetainScriptsFolder();
	virtual XBOX::VProgressIndicator*		CreateProgressIndicator( const XBOX::VString& inTitle);
	virtual	XBOX::VFileSystemNamespace*		RetainRuntimeFileSystemNamespace();
	virtual	XBOX::VSystemWorkerNamespace*	RetainRuntimeSystemWorkerNamespace();

private:
			VRIAServerSolution				*fSolution;
};


#endif