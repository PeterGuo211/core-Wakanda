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
#ifndef __VRIAPermissions__
#define __VRIAPermissions__



class CUAGSession;
class CUAGDirectory;


namespace RIAPermissionsKeys
{
	EXTERN_BAGKEY( allow);
	EXTERN_BAGKEY( action);
	EXTERN_BAGKEY( resource);
	EXTERN_BAGKEY( type);
	EXTERN_BAGKEY( groupID);
	EXTERN_BAGKEY( groupName);
}



class VRIAPermissions : public XBOX::VObject, public XBOX::IRefCountable
{
public:
			VRIAPermissions( const XBOX::VFilePath& inPath);
	virtual ~VRIAPermissions();

			/** @brief	do nothing if the permissions file was not changed since the last loading.
			*/
			XBOX::VError			LoadPermissionFile( XBOX::VFolder* inDTDsFolder = NULL);

			const XBOX::VValueBag*	RetainResourcePermission( const XBOX::VString& inType, const XBOX::VString& inResource, const XBOX::VString& inAction);

			/** @brief	returns the permissions according to the passed filter. Any NULL criteria will be ignored.
			*/
			XBOX::VError			RetainResourcesPermission( std::vector< XBOX::VRefPtr<XBOX::VValueBag> >& outPermissions, const XBOX::VString* inType, const XBOX::VString* inResource, const XBOX::VString* inAction);

			/** @brief	add a permission for a resource. inGroupID may be NULL. The permissions file is saved.
			*/
			XBOX::VError			AddResourcePermission( const XBOX::VString& inType, const XBOX::VString& inResource, const XBOX::VString& inAction, const XBOX::VUUID* inGroupID);

			/** @brief	remove a permission. The permissions file is saved.
			*/
			XBOX::VError			RemoveResourcePermission( const XBOX::VString& inType, const XBOX::VString& inResource, const XBOX::VString& inAction);

			bool					IsResourceAccessGrantedForSession( const XBOX::VString& inType, const XBOX::VString& inResource, const XBOX::VString& inAction, CUAGSession *inUAGSession);

			void					GetRPCModules( std::set<XBOX::VString>& outModules );

			/**@brief	check whether the UAG groups used in the permissions are valid
			*/
			XBOX::VError			CheckGroupsValidity( CUAGDirectory *inUAGDirectory);

private:
			XBOX::VError			_LoadPermissionFile( XBOX::VFolder* inDTDsFolder = NULL);
			XBOX::VError			_SavePermissionFile();

			XBOX::VFilePath										fPath;
			XBOX::VTime											fModificationTime;	// The file modification time when last loading occurs
			std::vector< XBOX::VRefPtr<XBOX::VValueBag> >		fPermissions;
	mutable	XBOX::VCriticalSection								fMutex;
};



const uLONG kRIA_PERMISSION_SIGNATURE = 'perm';

const XBOX::VError VE_RIA_INVALID_PERMISSION_DEFINITION			= MAKE_VERROR( kRIA_PERMISSION_SIGNATURE, 3001);
const XBOX::VError VE_RIA_PERMISSION_ALREADY_EXISTS				= MAKE_VERROR( kRIA_PERMISSION_SIGNATURE, 3002);
const XBOX::VError VE_RIA_PERMISSION_GROUP_BY_ID_NOT_FOUND		= MAKE_VERROR( kRIA_PERMISSION_SIGNATURE, 3003);
const XBOX::VError VE_RIA_PERMISSION_GROUP_BY_NAME_NOT_FOUND	= MAKE_VERROR( kRIA_PERMISSION_SIGNATURE, 3004);
const XBOX::VError VE_RIA_PERMISSION_GROUP_NAME_MISMATCH		= MAKE_VERROR( kRIA_PERMISSION_SIGNATURE, 3005);
const XBOX::VError VE_RIA_PERMISSION_GROUP_ID_MISMATCH			= MAKE_VERROR( kRIA_PERMISSION_SIGNATURE, 3006);




#endif