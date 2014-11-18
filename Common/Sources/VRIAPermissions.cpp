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
#include "UsersAndGroups/Sources/UsersAndGroups.h"
#include "VRIAPermissions.h"



USING_TOOLBOX_NAMESPACE



class VRIAPermissionsSearch : public XBOX::VObject
{
public:
			VRIAPermissionsSearch( const VString& inType, const VString& inResource, const VString& inAction) : fType(inType), fResource(inResource), fAction(inAction) {;}
	virtual	~VRIAPermissionsSearch() {;}

			bool operator() ( VRefPtr<VValueBag> inPermission)
			{
				VString resource, type, action;
				
				inPermission->GetString( RIAPermissionsKeys::type, type);
				if (!fType.EqualToString( type, true))
					return false;

				inPermission->GetString( RIAPermissionsKeys::resource, resource);
				if (!fResource.EqualToString( resource, true))
					return false;

				inPermission->GetString( RIAPermissionsKeys::action, action);
				if (!fAction.EqualToString( action, true))
					return false;

				return true;
			}
private:
			VString		fType;
			VString		fResource;
			VString		fAction;
};



namespace RIAPermissionsKeys
{
	CREATE_BAGKEY( allow);
	CREATE_BAGKEY( resource);
	CREATE_BAGKEY( type);
	CREATE_BAGKEY( action);
	CREATE_BAGKEY( groupID);
	CREATE_BAGKEY( groupName);
}



VRIAPermissions::VRIAPermissions( const XBOX::VFilePath& inPath)
: fPath(inPath)
{
}


VRIAPermissions::~VRIAPermissions()
{
}


VError VRIAPermissions::LoadPermissionFile( VFolder* inDTDsFolder)
{
	VError err = VE_OK;

	if (fMutex.Lock())
	{
		err = _LoadPermissionFile( inDTDsFolder);
		fMutex.Unlock();
	}

	return err;
}
	

const VValueBag* VRIAPermissions::RetainResourcePermission( const VString& inType, const VString& inResource, const VString& inAction)
{
	if (inType.IsEmpty() || inResource.IsEmpty() || inAction.IsEmpty())
		return NULL;

	const VValueBag *permissionBag = NULL;

	if (fMutex.Lock())
	{
		VError err = _LoadPermissionFile( NULL);	// sc 16/05/2012 check for permissions file changes
		if (err == VE_OK)
		{
			VRIAPermissionsSearch search( inType, inResource, inAction);
			std::vector< VRefPtr<VValueBag> >::iterator found = std::find_if( fPermissions.begin(), fPermissions.end(), search);
			if (found != fPermissions.end())
				permissionBag = found->Retain();
		}

		fMutex.Unlock();
	}

	return permissionBag;
}


XBOX::VError VRIAPermissions::RetainResourcesPermission( std::vector< XBOX::VRefPtr<XBOX::VValueBag> >& outPermissions, const XBOX::VString* inType, const XBOX::VString* inResource, const XBOX::VString* inAction)
{
	VError err = VE_OK;

	if (fMutex.Lock())
	{
		err = _LoadPermissionFile( NULL);	// sc 16/05/2012 check for permissions file changes
		if (err == VE_OK)
		{
			if (inType == NULL && inResource == NULL && inAction == NULL)
			{
				outPermissions.insert( outPermissions.end(), fPermissions.begin(), fPermissions.end());
			}
			else
			{
				for (std::vector< XBOX::VRefPtr<XBOX::VValueBag> >::const_iterator permIter = fPermissions.begin() ; permIter != fPermissions.end() ; ++permIter)
				{
					if (inType != NULL)
					{
						VString type;
						(*permIter)->GetString( RIAPermissionsKeys::type, type);
						if (!inType->EqualToString( type, true))
							continue;
					}

					if (inResource != NULL)
					{
						VString resource;
						(*permIter)->GetString( RIAPermissionsKeys::resource, resource);
						if (!inResource->EqualToString( resource, true))
							continue;
					}

					if (inAction != NULL)
					{
						VString action;
						(*permIter)->GetString( RIAPermissionsKeys::action, action);
						if (!inAction->EqualToString( action, true))
							continue;
					}

					outPermissions.push_back( *permIter);
				}
			}
		}

		fMutex.Unlock();
	}

	return err;
}


XBOX::VError VRIAPermissions::AddResourcePermission( const XBOX::VString& inType, const XBOX::VString& inResource, const XBOX::VString& inAction, const XBOX::VUUID* inGroupID)
{
	if (inType.IsEmpty() || inResource.IsEmpty() || inAction.IsEmpty())
		return VE_RIA_INVALID_PERMISSION_DEFINITION;

	VError err = VE_OK;

	if (fMutex.Lock())
	{
		err = _LoadPermissionFile( NULL);	// sc 16/05/2012 ensure permissions are up to date
		if (err == VE_OK)
		{
			VRIAPermissionsSearch search( inType, inResource, inAction);
			std::vector< VRefPtr<VValueBag> >::iterator found = std::find_if( fPermissions.begin(), fPermissions.end(), search);
			if (found != fPermissions.end())
			{
				err = VE_RIA_PERMISSION_ALREADY_EXISTS;
			}
			else
			{
				VValueBag *permissionBag = new VValueBag();
				if (permissionBag != NULL)
				{
					permissionBag->SetString( RIAPermissionsKeys::type, inType);
					permissionBag->SetString( RIAPermissionsKeys::resource, inResource);
					permissionBag->SetString( RIAPermissionsKeys::action, inAction);

					if (inGroupID != NULL)
					{
						VString uuidStr;
						inGroupID->GetString( uuidStr);
						permissionBag->SetString( RIAPermissionsKeys::groupID, uuidStr);
					}

					fPermissions.push_back( VRefPtr<VValueBag>(permissionBag));

					err = _SavePermissionFile();
				}
				else
				{
					err = VE_MEMORY_FULL;
				}
				ReleaseRefCountable( &permissionBag);
			}
		}

		fMutex.Unlock();
	}

	return err;
}


XBOX::VError VRIAPermissions::RemoveResourcePermission( const XBOX::VString& inType, const XBOX::VString& inResource, const XBOX::VString& inAction)
{
	if (inType.IsEmpty() || inResource.IsEmpty() || inAction.IsEmpty())
		return VE_RIA_INVALID_PERMISSION_DEFINITION;

	VError err = VE_OK;

	if (fMutex.Lock())
	{
		err = _LoadPermissionFile( NULL);	// sc 16/05/2012 ensure permissions are up to date
		if (err == VE_OK)
		{
			VRIAPermissionsSearch search( inType, inResource, inAction);
			std::vector< VRefPtr<VValueBag> >::iterator found = std::find_if( fPermissions.begin(), fPermissions.end(), search);
			if (found != fPermissions.end())
			{
				fPermissions.erase( found);
				err = _SavePermissionFile();
			}
		}

		fMutex.Unlock();
	}

	return err;
}

void VRIAPermissions::GetRPCModules( std::set<VString>& outRPCFiles )
{
	VString resource, type, action;

	std::vector< VRefPtr<VValueBag> >::iterator it = fPermissions.begin();

	while ( it != fPermissions.end() )
	{
		(*it)->GetString( RIAPermissionsKeys::type, type);
		(*it)->GetString( RIAPermissionsKeys::resource, resource);
		(*it)->GetString( RIAPermissionsKeys::action, action);

		if ( type.EqualToString( "module", true ) && action.EqualToString( "executeFromClient" ) )
		{
			outRPCFiles.insert( resource );
		}
		else if ( type.EqualToString( "function", true ) && action.EqualToString( "executeFromClient" ) )
		{
			VIndex pos = resource.FindUniChar( '/', resource.GetLength(), true );
			if ( pos != 0 )
			{
				resource.Truncate( pos );
				outRPCFiles.insert( resource );
			}
		}


		++it;
	}
}


bool VRIAPermissions::IsResourceAccessGrantedForSession( const VString& inType, const VString& inResource, const VString& inAction, CUAGSession *inUAGSession)
{
	const VValueBag *permissionBag = RetainResourcePermission( inType, inResource, inAction);
	if (permissionBag == NULL)
		return false;

	bool accessGranted = false;
	VString uuidStr;

	if (permissionBag->GetString( RIAPermissionsKeys::groupID, uuidStr))
	{
		VUUID groupID;
		groupID.FromString( uuidStr);

		if (inUAGSession != NULL)
		{
			accessGranted = inUAGSession->BelongsTo( groupID, nil);
		}
	}
	else
	{
		accessGranted = true;
	}

	ReleaseRefCountable( &permissionBag);

	return accessGranted;
}


VError VRIAPermissions::CheckGroupsValidity( CUAGDirectory *inUAGDirectory)
{
	if (inUAGDirectory == NULL)
		return VE_INVALID_PARAMETER;

	VError err = VE_OK;

	if (fMutex.Lock())
	{
		err = _LoadPermissionFile( NULL);
		if (err == VE_OK)
		{
			for (std::vector< XBOX::VRefPtr<XBOX::VValueBag> >::const_iterator permIter = fPermissions.begin() ; permIter != fPermissions.end() ; ++permIter)
			{
				VString groupID, groupName, resource;
				(*permIter)->GetString( RIAPermissionsKeys::resource, resource);
				(*permIter)->GetString( RIAPermissionsKeys::groupID, groupID);
				(*permIter)->GetString( RIAPermissionsKeys::groupName, groupName);

				if (!groupID.IsEmpty() || !groupName.IsEmpty())
				{
					if (!groupID.IsEmpty() && groupName.IsEmpty())
					{
						bool found = false;
						{
							VError uagError = VE_OK;
							StErrorContextInstaller errorContext( false, true);
							VUUID uuid;
							uuid.FromString( groupID);
							CUAGGroup *group = inUAGDirectory->RetainGroup( uuid, &uagError);
							found = (uagError == VE_OK) && testAssert(group != NULL);
							ReleaseRefCountable( &group);
						}

						if (!found)
						{
							err = vThrowError( VE_RIA_PERMISSION_GROUP_BY_ID_NOT_FOUND, groupID, resource);
						}
					}
					else if (groupID.IsEmpty() && !groupName.IsEmpty())
					{
						bool found = false;
						{
							VError uagError = VE_OK;
							StErrorContextInstaller errorContext( false, true);
							CUAGGroup *group = inUAGDirectory->RetainGroup( groupName, &uagError);
							found = (uagError == VE_OK) && testAssert(group != NULL);
							ReleaseRefCountable( &group);
						}

						if (!found)
						{
							err = vThrowError( VE_RIA_PERMISSION_GROUP_BY_NAME_NOT_FOUND, groupName, resource);
						}
					}
					else
					{
						bool foundByName = false, foundByID = false;
						{
							VError uagError = VE_OK;
							StErrorContextInstaller errorContext( false, true);
							VUUID uuid;
							uuid.FromString( groupID);
							CUAGGroup *group = inUAGDirectory->RetainGroup( uuid, &uagError);
							foundByID = (uagError == VE_OK) && testAssert(group != NULL);
							if (foundByID)
							{
								VString name;
								group->GetName( name);
								foundByName = (name == groupName);
							}
							ReleaseRefCountable( &group);

							if (!foundByID)
							{
								group = inUAGDirectory->RetainGroup( groupName, &uagError);
								foundByName = (uagError == VE_OK) && testAssert(group != NULL);
								ReleaseRefCountable( &group);

							}
						}
						
						if (!foundByID && !foundByName)
						{
							err = vThrowError( VE_RIA_PERMISSION_GROUP_BY_ID_NOT_FOUND, groupID, resource);
						}
						else if (foundByID && !foundByName)
						{
							err = vThrowError( VE_RIA_PERMISSION_GROUP_NAME_MISMATCH, groupID, resource);
						}
						else if (!foundByID && foundByName)
						{
							err = vThrowError( VE_RIA_PERMISSION_GROUP_ID_MISMATCH, groupName, resource);
						}
					}
				}
			}
		}
		fMutex.Unlock();
	}

	return err;
}


XBOX::VError VRIAPermissions::_LoadPermissionFile( XBOX::VFolder* inDTDsFolder)
{
	VError err = VE_OK;

	VFile file(fPath);
	if (file.Exists())
	{
		VTime modificationTime;
		err = file.GetTimeAttributes( &modificationTime);

		if (err == VE_OK)
		{
			if (fModificationTime != modificationTime)
			{
				fPermissions.clear();

				VValueBag bag;
				err = LoadBagFromXML( file, L"permissions", bag, XML_ValidateNever, NULL, inDTDsFolder);
				if (err == VE_OK)
				{
					VBagArray *bagArray = bag.GetElements( RIAPermissionsKeys::allow);
					if (bagArray != NULL)
					{
						VIndex permCount = bagArray->GetCount();
						for (VIndex permIter = 1 ; permIter <= permCount ; ++permIter)
						{
							VValueBag *permissionBag = bagArray->GetNth( permIter);
							if (permissionBag != NULL)
							{
								VString type, resource, action, groupID;

								if (	!permissionBag->GetString( RIAPermissionsKeys::type, type)
									||	!permissionBag->GetString( RIAPermissionsKeys::resource, resource)
									||	!permissionBag->GetString( RIAPermissionsKeys::action, action) )
									continue;

								if (type.IsEmpty() || resource.IsEmpty() || action.IsEmpty())
									continue;

								fPermissions.push_back( VRefPtr<VValueBag>(permissionBag));
							}
						}
					}

					fModificationTime = modificationTime;
				}
			}
		}
	}

	return err;
}


XBOX::VError VRIAPermissions::_SavePermissionFile()
{
	if (!fPath.IsFile())
		return VE_UNKNOWN_ERROR;

	VValueBag bag;

	for (std::vector< XBOX::VRefPtr<XBOX::VValueBag> >::const_iterator permIter = fPermissions.begin() ; permIter != fPermissions.end() ; ++permIter)
	{
		bag.AddElement( RIAPermissionsKeys::allow, *permIter);
	}
		
	VFile file(fPath);
	VError err = WriteBagToFileInXML( bag, L"permissions", &file, true);
	if (err == VE_OK)
	{
		VTime modificationTime;
		err = file.GetTimeAttributes( &modificationTime);
		if (err == VE_OK)
			fModificationTime = modificationTime;
	}
	
	return err;
}