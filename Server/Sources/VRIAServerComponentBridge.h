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
#ifndef __RIAServerComponentBridge__
#define __RIAServerComponentBridge__


#include "VRIAServerComponentBridgeAbstract.h"


class VRIAServerComponentBridge : public XBOX::VComponentImp<CRIAServerComponentBridge>, public IDB4D_GraphicsIntf, public IDB4D_ApplicationIntf
{
public:
			VRIAServerComponentBridge();
	virtual ~VRIAServerComponentBridge();

	virtual XBOX::VError				Register();
	virtual XBOX::VError				UnRegister();

	static	XBOX::CComponent*			ComponentCreator ( XBOX::CType inType, XBOX::CType inFamily);

	virtual	RIASolutionRef				GetSolutionRef( RIApplicationRef inApplicationRef);

	virtual	XBOX::VJSGlobalContext*		RetainJSContext( RIApplicationRef inApplicationRef, XBOX::VError& outError, bool inReusable, const IHTTPRequest* inRequest);
	virtual	XBOX::VError				ReleaseJSContext( RIApplicationRef inApplicationRef, XBOX::VJSGlobalContext* inContext, IHTTPResponse* inResponse);
	virtual	XBOX::VError				AppendJSContextRequiredScript( RIApplicationRef inApplicationRef, const XBOX::VFilePath& inPath);
	virtual	XBOX::VError				GetJSContextInformations( RIApplicationRef inApplicationRef, XBOX::VValueBag& outBag);
	
	virtual	CUAGDirectory*				RetainUAGDirectory( RIApplicationRef inApplicationRef, XBOX::VError& outError);

	virtual	XBOX::VError				JS4DGarbageCollect();

	virtual	CUAGSession*				RetainUAGSession(const XBOX::VJSGlobalContext* inContext);
	virtual	XBOX::VError				SetUAGSession(const XBOX::VJSGlobalContext* inContext, CUAGSession *inUAGSession);
	virtual	XBOX::VError				ReleaseExpiredUAGSessions();
	virtual	XBOX::VError				RetainSessions(const XBOX::VUUID& inUserID, std::vector<XBOX::VRefPtr<CUAGSession> >& outSessions);

	virtual bool						AcceptRestConnection(const XBOX::VString& inUserName, const XBOX::VString& inPassWord, const XBOX::VUUID& inSessionUUID, const XBOX::VString& inPeerAddress, bool passIsHashed)	{ return true;}
	virtual void						CloseSomeRestConnection(const std::vector<XBOX::VUUID>& inSessionUUIDs)	{}

	virtual bool						RetainOneRestLicense()	{ return true;}
	virtual void						ReleaseRestLicenses( sLONG inHowMany) {}


	virtual XBOX::VError			Get4DMethods(std::vector<Public4DMethodInfo>& outMethods)
	{
		return XBOX::VE_OK;
	}

	virtual XBOX::VError			 Call4DMethod(const XBOX::VString& MethodName, XBOX::VJSONArray* params, CDB4DTable* inTable, CDB4DSelection* *inSel, CDB4DRecord* inRec, XBOX::VJSONValue& outResult, CDB4DBaseContext* context)
	{
		return XBOX::VE_UNIMPLEMENTED;
	}
	virtual XBOX::VProgressIndicator*	CreateProgressIndicator();
	
	virtual XBOX::VWorkerPool*			GetSharedWorkerPool ( );
	virtual void						StopSharedWorkerPool ( );

	virtual XBOX::VTCPSelectIOPool*		GetSharedSelectIOPool ( );
	virtual void						StopSharedSelectIOPool ( );

	virtual XBOX::VLocalizationManager*	RetainLocalizationManager();

	virtual XBOX::VFolder*				RetainWaLibFolder();

	virtual	XBOX::VError				ConvertImageToPreferredFormat( XBOX::VValueSingle& ioValPicture, const std::vector<XBOX::VString*>& inPreferredImageFormats);
	virtual	XBOX::VError				DescribePermissionsForSchema (
											sLONG inSchemaID,
											sLONG& outReadGroupID, XBOX::VString& outReadGroupName,
											sLONG& outReadWriteGroupID, XBOX::VString& outReadWriteGroupName,
											sLONG& outAllGroupID, XBOX::VString& outAllGroupName )																{ xbox_assert( false); return XBOX::VE_UNIMPLEMENTED;}
	virtual XBOX::VError				CreateSchema ( XBOX::VString const & vstrName, sLONG nSchemaID ) { xbox_assert( false); return XBOX::VE_UNIMPLEMENTED;}
	virtual XBOX::VError				DropSchema ( XBOX::VString const & vstrName, sLONG nSchemaID ) { xbox_assert( false); return XBOX::VE_UNIMPLEMENTED;}
	virtual XBOX::VError				RenameSchema ( XBOX::VString const & vstrName, sLONG nSchemaID, XBOX::VString const & vstrNewName ) { xbox_assert( false); return XBOX::VE_UNIMPLEMENTED;}
	virtual XBOX::VError				GrantPermissionsForSchema ( XBOX::VString const & vstrSchemaName, sLONG nSchemaID, int nAccessRight, XBOX::VString const & vstrGroupName ) { xbox_assert( false); return XBOX::VE_UNIMPLEMENTED;}
	virtual XBOX::VError				RevokePermissionsForSchema ( XBOX::VString const & vstrSchemaName, sLONG nSchemaID, int nAccessRight ) { xbox_assert( false); return XBOX::VE_UNIMPLEMENTED;}
	virtual	bool						RegisterVTaskForRemoteUID(XBOX::VTask *inTask, const XBOX::VUUID& inRemoteUID, const XBOX::VUUID& inDB4DBaseContextUID)	{ xbox_assert( false); return false; }
	virtual bool						UnregisterVTaskForRemoteUID(XBOX::VTask *inTask, const XBOX::VUUID& inRemoteUID)										{ xbox_assert( false); return false; }

	virtual CDB4DBase*					RetainMainDB ( const char* DebugInfo ) { return NULL; }
	virtual XBOX::VError				GetDBResourcePath( XBOX::VFilePath& outPath) { xbox_assert( false); return XBOX::VE_UNIMPLEMENTED; }
	virtual XBOX::VError				GetDBStructurePath ( XBOX::VFilePath& outPath ) { /*xbox_assert( false);*/ return XBOX::VE_UNIMPLEMENTED; }

	virtual XBOX::VValueSingle*			LoadPictureFromFile ( XBOX::VFile& inFile ) { xbox_assert( false); return NULL; }

	virtual XBOX::VFileSystemNamespace* RetainRuntimeFileSystemNamespace(RIApplicationRef inApplicationRef);


private:

		XBOX::VWorkerPool*				fSharedWorkerPool;
		XBOX::VTCPSelectIOPool*			fSharedSelectIOPool;

};



#endif

