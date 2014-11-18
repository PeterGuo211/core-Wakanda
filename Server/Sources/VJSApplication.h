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
#ifndef __VJSApplication__
#define __VJSApplication__


#include "VRIAServerSupervisor.h"


// ----------------------------------------------------------------------------

/** @brief	VJSApplicationGlobalObject class

		The VJSApplicationGlobalObject class implements the functions and properties of global object.
*/


class VJSApplicationGlobalObject
{
public:
	
	// Functions
	static	void			_addHttpRequestHandler( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static	void			_removeHttpRequestHandler( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static	void			_getFolder( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static	void			_getSettingFile( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static	void			_getWalibFolder( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static	void			_getItemsWithRole( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static	void			_reloadModel( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject);

	
	static void				_verifyDataStore(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject); // bool : verifyDataStore(File: catalog, File: data, Object: paramObj)
	static void				_repairInto(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject); // bool : repairInto(File: catalog, File: data, Object: paramObj, File: outData)
	static void				_compactInto(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject); // bool : compactInto(File: catalog, File: data, Object: paramObj, File: outData)
	static void				_getLastBackups(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject); //
	static void				_getJobManager(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static void			    _getBackupSettings( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static void			    _getBackupRegistry(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject);//array or null: getBackupRegistry(File: registry)
	static void			    _integrateDataStoreJournal(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject);//bool: integrateDataStoreJournal(FILE: model, FILE: data,File:journal[,Object: options])
	static void				_backupDataStore(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static void			    _restoreDataStore(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static void			    _parseJournal(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject);

	static void				_login(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject); // bool : loginByKey(userName, ha1)
	static void				_unsecureLogin(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject); // bool : loginByPassword(userName, password)
	static void				_createUserSession(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject); // Session : createUserSession(sessionObj)
	static void				_getCurrentUser(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject); // User: currentUser
	static void				_getConnectionSession(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject); // Session: currentSession
	static void				_logout(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject); // logout()
	static void				_getUserSessions(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject); // getUserSessions([user : User | userID : string | userName : string])
	static void				_getSession( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject); // getSession( sessionID )
	
	// Properties getters
	static	void			_getName( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static	void			_getIsAdministrator( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static	void			_getHttpServer( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static	void			_getConsole( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static	void			_getPattern( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject);	
	static	void			_getStorage( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject);	
	static	void			_getSettings( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject);	
	static	void			_getDirectory( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static	void			_getInternal( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static	void			_getPermissions( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	static	void			_getWildChar( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject);
	
	
};



// ----------------------------------------------------------------------------



class VJSApplication: public XBOX::VJSClass<VJSApplication, VRIAServerProject>
{
public:

	typedef XBOX::VJSClass<VJSApplication, VRIAServerProject>	inherited;

	static	void			Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inApplication);
	static	void			Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inApplication);
	static	void			GetProperty( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	bool			SetProperty( XBOX::VJSParms_setProperty& ioParms, VRIAServerProject* inApplication);
	static	void			GetPropertyNames( XBOX::VJSParms_getPropertyNames& ioParms, VRIAServerProject* inApplication);
	static	void			GetDefinition( ClassDefinition& outDefinition);

	// Functions
	static	void			_addHttpRequestHandler( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_removeHttpRequestHandler( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_getFolder( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_getSettingFile( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_getWalibFolder( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_getItemsWithRole( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_reloadModel( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);

	static void				_getJobManager(XBOX::VJSParms_callStaticFunction& ioParms,  VRIAServerProject* inApplication);
	static void				_getLastBackups( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);// array: _getLastBackups()
	static void				_getBackupSettings( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication); // object: _getBackupSettings()
	static void				_integrateDataStoreJournal(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication); //Folder restoreDataStore(File: manifest [,Object: options])
	static void				_restoreDataStore(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static void				_parseJournal(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);//Array parseJournal(File: journal[,Object: options]

	static void				_verifyDataStore(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication); // bool : verifyDataStore(File: catalog, File: data, Object: paramObj)
	static void				_repairInto(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication); // bool : repairInto(File: catalog, File: data, Object: paramObj, File: outData)
	static void				_compactInto(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication); // bool : compactInto(File: catalog, File: data, Object: paramObj, File: outData)

	static void				_login(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication); // bool : loginByKey(userName, ha1)
	static void				_unsecureLogin(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication); // bool : loginByPassword(userName, password)
	static void				_createUserSession(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication); // Session : createUserSession(sessionObj)
	static void				_getCurrentUser(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication); // User: currentUser
	static void				_getConnectionSession(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication); // Session: currentSession
	static void				_logout(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication); // logout()
	static void				_getUserSessions(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication); // getUserSessions([user : User | userID : string | userName : string])
	static void				_getSession( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication); // getSession( sessionID )

	// Properties getters
	static	void			_getSolution( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getName( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getIsAdministrator( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getHttpServer( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getConsole( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getPattern( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getStorage( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getSettings( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getDirectory( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getInternal( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getPermissions( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getWildChar( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	
};


class VJSJobClass : public XBOX::VJSClass<VJSJobClass , VRIAServerJob>
{
public:

	static	void				GetDefinition(ClassDefinition &outDefinition);
	static	VRIAServerJob*		GetJobParam( const XBOX::VJSParms_withArguments& inParams, size_t inIndex);

private:

	typedef XBOX::VJSClass<VJSJobClass, VRIAServerJob>	inherited;
	static	void				_Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerJob* inJob );
	static	void				_Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerJob* inJob );
	static	void				_Log(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerJob* inJob);
	static	void				_TerminateJob(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerJob* inJob);

};


class VJSJobManagerClass : public XBOX::VJSClass<VJSJobManagerClass , void >
{
public:

	static void				GetDefinition(ClassDefinition &outDefinition);

private:

	typedef XBOX::VJSClass<VJSJobManagerClass, void>	inherited;

private:
	static void				_GetJob(XBOX::VJSParms_callStaticFunction& ioParms, void* );
	static void				_GetJobs(XBOX::VJSParms_callStaticFunction& ioParms, void* );
};


#endif