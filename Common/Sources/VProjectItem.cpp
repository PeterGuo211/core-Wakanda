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
#include "VRIAUTIs.h"
#include "VSolutionManagerConstants.h"
#include "VSolution.h"
#include "VProject.h"
#include "VProjectItem.h"
#include "VProjectItemBehaviour.h"
#if VERSIONDEBUG
#include <iostream>
#endif

USING_TOOLBOX_NAMESPACE


#if VERSIONDEBUG
sLONG VProjectItem::sNbProjectItem = 0;
#endif
void VProjectItem::DebugDumpOutput()
{
	#if VERSIONDEBUG
	if (sNbProjectItem != 0)
	{
		#if VERSIONWIN
		char buff[255];
		sprintf(buff, "VProjectItem Leaks : %i\r\n", sNbProjectItem);
		OutputDebugString(buff);
		#else
		std::cerr << "VProjectItem Leaks : " << sNbProjectItem << std::endl;
		#endif
	}
	#endif
}

namespace ProjectItemBagKeys
{
	CREATE_BAGKEY_WITH_DEFAULT(path, XBOX::VString, "");
	CREATE_BAGKEY_WITH_DEFAULT(parentPath, XBOX::VString, "");
	CREATE_BAGKEY_WITH_DEFAULT(lastAddedNewProjectFolder, XBOX::VString, "");
	CREATE_BAGKEY_WITH_DEFAULT(lastAddedExistingProjectFolder, XBOX::VString, "");
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(table_number, XBOX::VLong, sLONG, 0);
	CREATE_BAGKEY_WITH_DEFAULT(form_name, XBOX::VString, "");
#if !RIA_SERVER
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(eventHandlerIndex, XBOX::VLong, sLONG, eProc_None);
#else
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(event_handler_index, XBOX::VLong, sLONG, 0);
#endif
	CREATE_BAGKEY_WITH_DEFAULT(methodName, XBOX::VString, "");
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(active, XBOX::VBoolean, bool, true);
	CREATE_BAGKEY_WITH_DEFAULT(name, XBOX::VString, "");
	CREATE_BAGKEY_WITH_DEFAULT(solutionLink, XBOX::VString, "");
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(height, XBOX::VLong, sLONG, 0);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(width, XBOX::VLong, sLONG, 0);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(x, XBOX::VLong, sLONG, 0);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(y, XBOX::VLong, sLONG, 0);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(maximized_x, XBOX::VLong, sLONG, 0);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(maximized_y, XBOX::VLong, sLONG, 0);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(maximized, XBOX::VBoolean, bool, false);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(zPos, XBOX::VLong, sLONG, 0);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(currentIndex, XBOX::VLong, sLONG, 0);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(currentLine, XBOX::VLong, sLONG, 1);
	CREATE_BAGKEY_WITH_DEFAULT(lastSelectedPath, XBOX::VString, "");
	CREATE_BAGKEY_WITH_DEFAULT(displayName, XBOX::VString, "");
}

VProjectItemIterator::VProjectItemIterator(const VProjectItem* inProjectItem)
{
	if (inProjectItem != NULL)
	{
		fProjectItems = inProjectItem->fChildren;
		fCurrent = fProjectItems.begin();
	}
}

VProjectItem::VProjectItem(e_ProjectItemKind inKind)
:fBehaviour(NULL)
,fParent(NULL)
,fProjectItemProjectOwner(NULL)
,fProjectItemSolutionOwner(NULL)
,fLevel(0)
,fExternalReference(false)
,fPhysicalLinkValid(true)
,fGhost(false)
,fUserData(NULL)
,fStamp(1)
,fID(0)
{
	#if VERSIONDEBUG
	sNbProjectItem++;
	#endif

	if (VProjectItemManager::Get()->IsProjectItemUniqueIDRequired())
		fID = VProjectItemManager::Get()->RegisterProjectItem(this);

	fBag = new VValueBag();
	_CreateItemBehaviour( inKind);
}

VProjectItem::VProjectItem(const VURL& inURL, e_ProjectItemKind inKind)
:fBehaviour(NULL)
,fParent(NULL)
,fProjectItemProjectOwner(NULL)
,fProjectItemSolutionOwner(NULL)
,fLevel(0)
,fExternalReference(false)
,fPhysicalLinkValid(true)
,fGhost(false)
,fUserData(NULL)
,fStamp(1)
,fID(0)
{
	#if VERSIONDEBUG
	sNbProjectItem++;
	#endif

	if (VProjectItemManager::Get()->IsProjectItemUniqueIDRequired())
		fID = VProjectItemManager::Get()->RegisterProjectItem(this);

	fURL = inURL;
	fBag = new VValueBag();
	_CreateItemBehaviour( inKind);
}


VProjectItem::VProjectItem( VProjectItemBehaviour *inBehaviour)
:fBehaviour(NULL)
,fParent(NULL)
,fProjectItemProjectOwner(NULL)
,fProjectItemSolutionOwner(NULL)
,fLevel(0)
,fExternalReference(false)
,fPhysicalLinkValid(true)
,fGhost(false)
,fUserData(NULL)
,fStamp(1)
,fID(0)
{
	#if VERSIONDEBUG
	sNbProjectItem++;
	#endif

	if (VProjectItemManager::Get()->IsProjectItemUniqueIDRequired())
		fID = VProjectItemManager::Get()->RegisterProjectItem(this);

	fBag = new VValueBag();
	SetBehaviour( inBehaviour);
}


VProjectItem::~VProjectItem()
{
	#if VERSIONDEBUG
	sNbProjectItem--;
	#endif

	ReleaseRefCountable( &fUserData);

	// ci-dessous important a cause Retain/Release :
	// un item enfant donne peut rester vivant longtemps...
	for (VProjectItemIterator it(this); it.IsValid(); ++it)
	{
		it->SetParent(NULL);
	}

	if (fParent != NULL)
		fParent->DetachChild(this);


	IEntityModelCatalog *catalog = fBehaviour->GetCatalog();
	ReleaseRefCountable(&catalog);

	delete fBehaviour;
	fBehaviour = NULL;

	ReleaseRefCountable( &fBag);

	DeleteChildren();

	if (VProjectItemManager::Get()->IsProjectItemUniqueIDRequired())
		VProjectItemManager::Get()->UnregisterProjectItem( this);
}


void VProjectItem::SetName( const XBOX::VString& inName)
{
	fName = inName;
}


void VProjectItem::GetName( XBOX::VString& outName, bool inWithExtension) const
{
	outName = fName;

	if (!inWithExtension)
	{
		sLONG pos = outName.FindUniChar( CHAR_FULL_STOP, outName.GetLength(), true);
		if ((pos > 0) && (pos != outName.GetLength()))
		{
			outName.Truncate( outName.GetLength() - (outName.GetLength() - pos + 1));
		}
	}
}


void VProjectItem::GetNameWithoutExtension( XBOX::VString& outName) const
{
	GetName( outName, false);
}


void VProjectItem::GetExtension( XBOX::VString& outExtension) const
{
	sLONG pos = fName.FindUniChar( CHAR_FULL_STOP, fName.GetLength(), true);
	if ((pos > 0) && (pos != fName.GetLength()))
	{
		fName.GetSubString( pos + 1, fName.GetLength() - pos, outExtension);
	}
	else
	{
		outExtension.Clear();
	}
}


void VProjectItem::SetBehaviour( VProjectItemBehaviour *inBehaviour)
{
	xbox_assert((fBehaviour == NULL) || (fBehaviour->GetOwner() == this));
	
	delete fBehaviour;
	fBehaviour = inBehaviour;

	if (fBehaviour != NULL)
	{
		xbox_assert(fBehaviour->GetOwner() == NULL);
		fBehaviour->SetOwner( this);
	}
}


VProjectItemBehaviour* VProjectItem::GetBehaviour() const
{
	return fBehaviour;
}


void VProjectItem::SetUserData( IRefCountable *inUserData)
{
	CopyRefCountable( &fUserData, inUserData);
}


IRefCountable* VProjectItem::GetUserData() const
{
	return fUserData;
}


void VProjectItem::AddTag( const VProjectItemTag& inTag)
{
	if (std::find( fTags.begin(), fTags.end(), inTag) == fTags.end())
	{
		fTags.push_back( inTag);
	}
}


void VProjectItem::RemoveTag( const VProjectItemTag& inTag)
{
	std::vector<VProjectItemTag>::iterator found = std::find( fTags.begin(), fTags.end(), inTag);
	if (found != fTags.end())
		fTags.erase( found);
}


void VProjectItem::RemoveAllTags()
{
	fTags.clear();
}


bool VProjectItem::IsTagged() const
{
	return !fTags.empty();
}


bool VProjectItem::HasTag( const VProjectItemTag& inTag) const
{
	return (std::find( fTags.begin(), fTags.end(), inTag) != fTags.end());
}


void VProjectItem::GetTags( std::vector<VProjectItemTag>& outTags) const
{
	outTags.clear();
	outTags.insert( outTags.begin(), fTags.begin(), fTags.end());
}


VProjectItem::e_ProjectItemKind VProjectItem::GetKind() const
{
	if (fBehaviour != NULL)
		return fBehaviour->GetKind();

	return eUNDEFINED;
}


bool VProjectItem::ConformsTo( const XBOX::VString& inFileKindID) const
{
	bool result = false;

	if (fBehaviour != NULL)
		 result = fBehaviour->ConformsTo( inFileKindID);

	return result;
}


void VProjectItem::GetDescription( XBOX::VString& outDescription) const
{
	if (fBehaviour != NULL)
		fBehaviour->GetDescription( outDescription);
}


void VProjectItem::Touch()
{
	++fStamp;
	if (fParent != NULL)
		fParent->Touch();
}


uLONG VProjectItem::GetStamp() const
{
	return fStamp;
}


void VProjectItem::SetURL( const XBOX::VURL& inURL)
{
	if (testAssert(fRelativePath.IsEmpty()))
		fURL = inURL;
}


bool VProjectItem::GetURL( XBOX::VURL& outURL) const
{
	bool done = false;
	
	if (!fURL.IsEmpty())
	{
		outURL.FromURL( fURL);
		done = true;
	}
	else
	{
		VFilePath path;
		if (GetFilePath( path))
		{
			outURL.FromFilePath( path);
			done = true;
		}
	}
	return done;
}


VURL VProjectItem::GetURL() const
{
	VURL url;
	GetURL( url);
	return url;
}


void VProjectItem::SetRelativePath( const XBOX::VString& inRelativePath, XBOX::EURLPathStyle inStyle)
{
	if (testAssert(fURL.IsEmpty()))
	{
		VString relativePath( inRelativePath);

		if (inStyle != eURL_POSIX_STYLE)
			VURL::Convert( relativePath, inStyle, eURL_POSIX_STYLE, true);

		fRelativePath = relativePath;
	}
}


void VProjectItem::GetRelativePath( XBOX::VString& outRelativePath, XBOX::EURLPathStyle inStyle) const
{
	outRelativePath = fRelativePath;
	if (inStyle != eURL_POSIX_STYLE)
		VURL::Convert(outRelativePath, eURL_POSIX_STYLE, inStyle, true);
}


XBOX::VString VProjectItem::GetXMLElementName() const
{
	return fBehaviour->GetXMLElementName();
}


VProject* VProjectItem::GetProjectOwner()
{
	VProject* project = NULL;

	if (GetProjectItemProjectOwner())
	{
		VProjectItemBehaviour* behaviour = GetProjectItemProjectOwner()->GetBehaviour();
		if (behaviour)
			project = behaviour->GetProject();
	}

	return project;
}


VProjectItem* VProjectItem::GetProjectItemProjectOwner()
{
	if (fProjectItemProjectOwner == NULL)
	{
		VProjectItem* projectItem = this;
		while (projectItem && projectItem->GetKind() != ePROJECT)
		{
			projectItem = projectItem->GetParent();
		}
		fProjectItemProjectOwner = projectItem; 
	}

	return fProjectItemProjectOwner;
}


VSolution* VProjectItem::GetSolutionOwner()
{
	VSolution* solution = NULL;

	if (GetProjectItemSolutionOwner())
	{
		solution = GetProjectItemSolutionOwner()->GetBehaviour()->GetSolution();
	}

	return solution;
}


VProjectItem* VProjectItem::GetProjectItemSolutionOwner()
{
	if (fProjectItemSolutionOwner == NULL)
	{
		VProjectItem* projectItem = this;
		while (projectItem && projectItem->GetKind() != eSOLUTION)
		{
			projectItem = projectItem->GetParent();
		}
		fProjectItemSolutionOwner = projectItem; 
	}

	return fProjectItemSolutionOwner;
}


VProjectItem* VProjectItem::FindChildByID( sLONG inID) const
{
	VProjectItem *found = NULL;

	for (ListOfProjectItemConstIterator iter = fChildren.begin() ; (iter != fChildren.end()) && (found == NULL) ; ++iter)
	{
		if ((*iter)->GetID() == inID)
			found = *iter;
	}

	return found;
}


VProjectItem* VProjectItem::FindChildByRelativePath( const XBOX::VString& inRelativePath, XBOX::EURLPathStyle inStyle) const
{
	VProjectItem *found = NULL;

	for (ListOfProjectItemConstIterator iter = fChildren.begin() ; (iter != fChildren.end()) && (found == NULL) ; ++iter)
	{
		if (!(*iter)->IsExternalReference())
		{
			VString relativePath;
			(*iter)->GetRelativePath( relativePath, inStyle);

			if (relativePath.IsEmpty())
			{
				VFilePath parentPath, childPath;
				if (GetFilePath( parentPath) && (*iter)->GetFilePath( childPath))
				{
					if (childPath.GetRelativePath( parentPath, relativePath))
					{
						VURL::Convert( relativePath, eURL_NATIVE_STYLE, inStyle, true);
					}
				}
			}

			if (relativePath == inRelativePath)
				found = *iter;
		}
	}

	return found;
}


VProjectItem* VProjectItem::FindChildByName(const XBOX::VString& inName) const
{
	VProjectItem* found = NULL;
	
	if( HasChildren() )
	{
		ListOfProjectItemConstIterator it;
		for(it=fChildren.begin(); it!=fChildren.end(); ++it)
		{
			VString name;
			(*it)->GetNameWithoutExtension(name);
			
			if( name == inName )
			{
				found = *it;
				break;
			}
		}
	}
	
	return found;
}


void VProjectItem::GetTaggedChildren( VectorOfProjectItems& ioItems, bool inRecursive) const
{
	for (VProjectItemIterator iter( this) ; iter.IsValid() ; ++iter)
	{
		if (iter->IsTagged())
			ioItems.push_back( iter);

		if (inRecursive)
			iter->GetTaggedChildren( ioItems, true);
	}
}


bool VProjectItem::ContentExists() const
{
	if (fBehaviour != NULL)
		return fBehaviour->Exists();

	return false;
}


VError VProjectItem::DeleteContent()
{
	VError err = VE_UNKNOWN_ERROR;

	if (fBehaviour != NULL)
		err = fBehaviour->Delete();

	return err;
}


XBOX::VError VProjectItem::RenameContent( const XBOX::VString& inNewName)
{
	VError err = VE_UNKNOWN_ERROR;

	if (fBehaviour != NULL)
		err = fBehaviour->Rename( inNewName);

	return err;
}


XBOX::VError VProjectItem::CreateContent()
{
	VError err = VE_UNKNOWN_ERROR;

	if (fBehaviour != NULL)
		err = fBehaviour->Create();

	return err;
}


// ----------------------------------------------------------------------------
// On place en tete, toutes les methodes dependant du kind
// ----------------------------------------------------------------------------

bool VProjectItem::HasFilePath() const
{
	bool hasFilePath = true;

	if (fBehaviour != NULL)
	{
		switch (fBehaviour->GetKind())
		{
			// to_delete case eSCHEMA:
			case eDATA_CLASS:
			case eDATA_CLASS_ATTRIBUTE:
                hasFilePath = false;
                break;
                
            default:
                break;
		}
	}

	return hasFilePath;
}

bool VProjectItem::IsPhysicalFile() const
{
	return fBehaviour->IsPhysicalFile();
}

bool VProjectItem::IsPhysicalFolder() const
{
	return fBehaviour->IsPhysicalFolder();
}

bool VProjectItem::IsVirtualFolder() const
{
	return fBehaviour->IsVirtualFolder();
}

bool VProjectItem::IsSystemFile() const
{
	return fBehaviour->IsSystemFile();
}


void VProjectItem::_CreateItemBehaviour( e_ProjectItemKind inKind)
{
	if (testAssert(fBehaviour == NULL))
	{
		switch (inKind)
		{
		case eSOLUTION:
			fBehaviour = new VProjectItemSolution( this);
			break;

		case ePROJECT:
			fBehaviour = new VProjectItemProject( this);
			break;

		case eMEDIA_LIBRARY:
			fBehaviour = new VMediaLibraryFolder( this);
			break;

		case eWIDGETS:
			fBehaviour = new VWidgetsFolder( this);
			break;

		case eTHEMES:
			fBehaviour = new VThemesFolder( this);
			break;

		case eFOLDER:
			fBehaviour = new VProjectItemFolder( this);
			break;

		case eFILE:
			fBehaviour = new VProjectItemFile( this);
			break;

		case eCATALOG_FILE:
			fBehaviour = new VProjectItemCatalog( this);
			break;

		case eDATA_CLASS:
			fBehaviour = new VProjectItemDataClass( this); 
			break;

		case eDATA_CLASS_ATTRIBUTE:
			fBehaviour = new VProjectItemDataClassAttribute( this); 
			break;

		default:
			xbox_assert(false);
			fBehaviour = new VProjectItemBehaviour( this);
		}
	}
}

// ----------------------------------------------------------------------------
// Autres methodes ne dependant pas du kind 
// ----------------------------------------------------------------------------
bool VProjectItem::IsPhysicalFileOrFolder() const
{
	bool isPhysicalFileOrFolder = IsPhysicalFile();

	if (!isPhysicalFileOrFolder)
		isPhysicalFileOrFolder = IsPhysicalFolder();

	return isPhysicalFileOrFolder;
}


bool VProjectItem::_AutoRegisterInMapOfFullPathes(bool inRegisterChildren)
{
	bool ok = false;

	VProject* project = GetProjectOwner();
	if (project)
	{
		project->RegisterProjectItemAndChildrenInMapOfFullPathes(this, inRegisterChildren);
		ok = true;
	}

	return ok;
}

bool VProjectItem::_AutoUnregisterFromMapOfFullPathes(bool inRegisterChildren)
{
	bool ok = false;

	VProject* project = GetProjectOwner();
	if (project)
	{
		project->UnregisterProjectItemAndChildrenFromMapOfFullPathes(this, inRegisterChildren);
		ok = true;
	}

	return ok;
}

// construit le path complet sous forme de VString (au format eURL_NATIVE_STYLE) a partir des localPaths
bool VProjectItem::BuildFullPath(XBOX::VString& outFullPath) const
{
	bool ok = true;

	outFullPath.Clear();

	VString currentLocalPath;
	const VProjectItem* projectItem = this;

	projectItem->GetRelativePath( currentLocalPath, eURL_NATIVE_STYLE);
	while (!currentLocalPath.IsEmpty())
	{
		outFullPath = currentLocalPath + outFullPath;
		projectItem = projectItem->GetParent();
		if (projectItem == NULL)
		{
			ok = false;
			break;
		}
		projectItem->GetRelativePath( currentLocalPath, eURL_NATIVE_STYLE);
	}

	if (ok)
	{
		if (outFullPath.IsEmpty())
		{
			VURL url(projectItem->GetURL());
			VFilePath filePath;
			url.GetFilePath(filePath);
			filePath.GetPath(outFullPath);
		}
		else
		{
			VFilePath folderPath;
			projectItem->GetURL().GetFilePath(folderPath);
			VFilePath filePath(folderPath, outFullPath, FPS_SYSTEM);
			filePath.GetPath(outFullPath);
		}
	}

	return ok;
}

void VProjectItem::BuildLogicalFullPath(XBOX::VString& outLogicalFullPath)
{
	outLogicalFullPath.Clear();

	VProjectItem* projectItem = this;
	if (projectItem->GetKind() != VProjectItem::eSOLUTION)
	{
		VString currentLocalLogicalPath;
		projectItem->GetDisplayName(currentLocalLogicalPath);
		while (projectItem->GetKind() != VProjectItem::eSOLUTION)	// JM 170309 oui oui il faut
			//&& (projectItem->GetKind() != VProjectItem::ePROJECT))	// les 2 (si pas de filtrage pex)
		{
			if (outLogicalFullPath.IsEmpty())
				outLogicalFullPath = currentLocalLogicalPath;
			else
				outLogicalFullPath = currentLocalLogicalPath + ">" + outLogicalFullPath;
			projectItem = projectItem->GetParent();
			projectItem->GetDisplayName(currentLocalLogicalPath);
		}

		if (outLogicalFullPath.IsEmpty())
			outLogicalFullPath = currentLocalLogicalPath;
		else
			outLogicalFullPath = currentLocalLogicalPath + ">" + outLogicalFullPath;
	}
}


bool VProjectItem::_GetProjectItemFromPartialPath(const XBOX::VString& inPartialPath, VectorOfProjectItems& ioFoundProjectItems)
{
	bool found = false;

	for (VProjectItemIterator it(this); it.IsValid(); ++it)
	{
		VString localPath;
		it->GetRelativePath(localPath, eURL_NATIVE_STYLE);
		if (inPartialPath.BeginsWith(localPath, false))
		{
			if (inPartialPath == localPath)
			{
				ioFoundProjectItems.push_back(it);
				found = true;
				break;
			}
			else
			{
				if (it->HasChildren())
				{
					VString partialPath = inPartialPath; 
					partialPath.SubString(localPath.GetLength() + 1, inPartialPath.GetLength()); 
					found = it->_GetProjectItemFromPartialPath(partialPath, ioFoundProjectItems);
					if (found)
						break;
				}
			}
		}
	}

	return found;
}

// SI ON SAIT que la reponse est unique
VProjectItem* VProjectItem::_GetProjectItemFromPartialPath(const XBOX::VString& inPartialPath)
{
	VProjectItem* projectItem = NULL;

	for (VProjectItemIterator it(this); it.IsValid(); ++it)
	{
		VString localPath;
		it->GetRelativePath(localPath, eURL_NATIVE_STYLE);
		if (inPartialPath.BeginsWith(localPath, false))
		{
			if (inPartialPath == localPath)
			{
				projectItem = it;
				break;
			}
			else
			{
				if (it->HasChildren())
				{
					VString partialPath = inPartialPath; 
					partialPath.SubString(localPath.GetLength() + 1, inPartialPath.GetLength()); 
					projectItem = it->_GetProjectItemFromPartialPath(partialPath);
					if (projectItem != NULL)
						break;
				}
			}
		}
	}

	return projectItem;
}


VProjectItem* VProjectItem::NewChild(e_ProjectItemKind inKind)
{
	VProjectItem* projectItem = new VProjectItem(inKind);	
	assert(projectItem);
	if (projectItem)
	{
		projectItem->SetParent(this);
		projectItem->SetLevel(fLevel + 1); 
		fChildren.push_back(projectItem);

		Touch();
	}
	return projectItem;
}

VProjectItem* VProjectItem::NewChild(const XBOX::VURL& inURL, e_ProjectItemKind projectItemKind)
{
	VProjectItem* projectItem = new VProjectItem(inURL, projectItemKind);	
	projectItem->SetParent(this);
	projectItem->SetLevel(fLevel + 1); 

	if (!inURL.IsEmpty())
	{
		VFilePath itemPath;
		if (inURL.GetFilePath(itemPath))
		{
			VString itemName;
			itemPath.GetName(itemName);
			projectItem->SetDisplayName( itemName);
			projectItem->SetName( itemName);
		}
	}

	fChildren.push_back(projectItem);

	Touch();

	return projectItem;
}


bool VProjectItem::GetFilePath(VFilePath& outFilePath) const
{
	bool ok = HasFilePath();

	if (ok )
	{
		if (fURL.IsEmpty())
		{
			VString strFullPath;
			ok = BuildFullPath(strFullPath);
			if (ok)
				outFilePath.FromFullPath(strFullPath);
			else
				outFilePath.Clear();
		}
		else
			fURL.GetFilePath(outFilePath);
	}

	return ok;
}


void VProjectItem::AttachChild(VProjectItem* inChildProjectItem)
{
	assert(inChildProjectItem != NULL);

	inChildProjectItem->SetParent(this);
	inChildProjectItem->SetLevel(fLevel + 1); 

	fChildren.push_back(inChildProjectItem);

	Touch();
}

void VProjectItem::DetachChild(VProjectItem* inChildProjectItem)
{
	if (inChildProjectItem != NULL)
	{
		fChildren.remove(inChildProjectItem);
		inChildProjectItem->SetParent(NULL);

		Touch();
	}
}


void VProjectItem::DeleteChildren()
{
	for (VProjectItemIterator it(this); it.IsValid(); ++it)
	{
		if (it->HasChildren())
			it->DeleteChildren();
		it->Release();
	}
}

void VProjectItem::SetGhost(bool inGhost)
{
	for (VProjectItemIterator it(this); it.IsValid(); ++it)
	{
		if (it->HasChildren())
			it->SetGhost(inGhost);
		it->_SetGhost(inGhost);
	}

	fGhost = inGhost;
}


bool VProjectItem::IsChildOf(VProjectItem* inProjectItem) const
{
	bool ok = false;

	VProjectItem* projectItem = GetParent();
	while (projectItem != NULL)
	{
		if (projectItem == inProjectItem)
		{
			ok = true; 
			break;
		}
		else
			projectItem = projectItem->GetParent();
	}

	return ok;
}


bool VProjectItem::IsParentOf( VProjectItem* inProjectItem) const
{
	return (std::find( fChildren.begin(), fChildren.end(), inProjectItem) != fChildren.end());
}


bool VProjectItem::CreatePhysicalItem()
{
	bool ok = true;

	if (fBehaviour)
	{
		VString strFullPath;

		if (!fURL.IsEmpty())
			ok = fBehaviour->Create(fURL);
		else
		{
			ok = BuildFullPath(strFullPath);
			if (ok)
				ok = fBehaviour->Create(strFullPath);
		}

		if (ok && IsPhysicalFileOrFolder() && !fBehaviour->ConformsTo( RIAFileKind::kSolutionFileKind))
		{
			ok = BuildFullPath(strFullPath);
			if (ok)
			{
				ok = fBehaviour->Exists();
				if (ok)
					ok = _AutoRegisterInMapOfFullPathes(false);
			}
		}
	}

	return ok;
}


bool VProjectItem::CopyPhysicalItemFrom(const XBOX::VURL& inSrcURL)
{
	bool ok = true;

	if (fBehaviour)
	{
		if (!fURL.IsEmpty())
			ok = fBehaviour->CopyTo(inSrcURL, fURL);
		else
		{
			VFilePath filePath;
			GetFilePath(filePath);
			VURL URL(filePath);
			ok = fBehaviour->CopyTo(inSrcURL, URL);
		}
	}

	return ok;
}

bool VProjectItem::CopyOrMovePhysicalItemTo(const XBOX::VURL& inSrcURL, const XBOX::VURL& inDestURL, bool inCopy)
{
	bool ok = true;

	if (fBehaviour)
	{
		if (inCopy)
			ok = fBehaviour->CopyTo(inSrcURL, inDestURL);
		else
			ok = fBehaviour->MoveTo(inSrcURL, inDestURL);
	}

	return ok;
}

bool VProjectItem::CreatePhysicalChildren(bool inRecursive)
{
	bool ok = true;

	for (VProjectItemIterator it(this); it.IsValid(); ++it)
	{
		ok = it->CreatePhysicalItem();
		if (ok)
		{
		if (inRecursive)
			if (it->HasChildren())
				ok = it->CreatePhysicalChildren(inRecursive);
		}
		if (!ok)
			break;
	}

	return ok;
}

void VProjectItem::GetProjectItemsVector(uWORD inProjectItemKind, VectorOfProjectItems& outProjectItemsVector, bool inIncludeMe)
{
	_GetProjectItemsVector(inProjectItemKind, outProjectItemsVector);
	if (inIncludeMe)
		if (GetKind() == inProjectItemKind)
			outProjectItemsVector.push_back(this);
}

void VProjectItem::_GetProjectItemsVector(uWORD inProjectItemKind, VectorOfProjectItems& outProjectItemsVector)
{
	for (VProjectItemIterator it(this); it.IsValid(); ++it)
	{
		if (it->HasChildren())
			it->_GetProjectItemsVector(inProjectItemKind, outProjectItemsVector);
		if (it->GetKind() == inProjectItemKind)
			outProjectItemsVector.push_back(&(*it));
	}
}

void VProjectItem::GetProjectItemsVector(VString inExtension, VectorOfProjectItems& outProjectItemsVector, bool inIncludeMe, bool inRecursive)
{
	_GetProjectItemsVector(inExtension, outProjectItemsVector, inRecursive);
	if (inIncludeMe)
	{
		if (IsPhysicalFile())
		{
			VString extension;
			GetExtension( extension);
			if (extension == inExtension)
				outProjectItemsVector.push_back(this);
		}
	}
}

void VProjectItem::_GetProjectItemsVector(VString inExtension, VectorOfProjectItems& outProjectItemsVector, bool inRecursive)
{
	for (VProjectItemIterator it(this); it.IsValid(); ++it)
	{
		if (it->HasChildren() && inRecursive)
			it->_GetProjectItemsVector(inExtension, outProjectItemsVector, true);

		if (it->IsPhysicalFile())
		{
			VString extension;
			it->GetExtension( extension);
			if (extension == inExtension)
				outProjectItemsVector.push_back(&(*it));
		}
	}
}


VProjectItem* VProjectItem::FindProjectItemInChildren(const VFilePath& inFilePath, bool inIncludeMe)
{
	VProjectItem* projectItem = NULL;

	if (inIncludeMe)
		if (HasFilePath())
		{
			VFilePath filePath;
			GetFilePath(filePath);
			if (filePath.GetPath() == inFilePath.GetPath())
				projectItem = this;
		}

	if (projectItem == NULL)
		projectItem = _FindProjectItemInChildren(inFilePath);

	return projectItem;
}


VProjectItem* VProjectItem::_FindProjectItemInChildren(const VFilePath& inFilePath)
{
	VProjectItem* projectItem = NULL;

	for (VProjectItemIterator it(this); it.IsValid(); ++it)
	{
		if (it->HasFilePath())
		{
			VFilePath filePath;
			it->GetFilePath(filePath);
			if (filePath.GetPath() == inFilePath.GetPath())
			{
				projectItem = it;
				break;
			}
		}

		if (projectItem == NULL)
			if (it->HasChildren())
				projectItem = it->_FindProjectItemInChildren(inFilePath);
	}

	return projectItem;
}

bool VProjectItem::CheckAnyProjectItemParentIsExternalReference(bool inIncludeMe) const
{
	bool found = false;

	if (inIncludeMe)
	{
		found = IsExternalReference();
	}
	if (!found)
	{
		VProjectItem* projectItem = GetParent();
		while ((projectItem != NULL) && (projectItem->GetKind() != VProjectItem::ePROJECT))
		{
			found = projectItem->IsExternalReference();
			if (found)
				break;
			else
				projectItem = projectItem->GetParent();
		}
	}

	return found;
}

// ----





// ----------------------------------------------------------------------------
// VProjectItemManager
// ----------------------------------------------------------------------------
VProjectItemManager* VProjectItemManager::sProjectItemManager = NULL;


VProjectItemManager::VProjectItemManager( bool inWithProjectItemUniqueID)
: fNextProjectItemID(PROJECT_ITEM_INDEX_START), fWithProjectItemUniqueID( inWithProjectItemUniqueID)
{
}


VProjectItemManager::~VProjectItemManager()
{
}


VProjectItemManager* VProjectItemManager::Get()
{
	return sProjectItemManager;
}


bool VProjectItemManager::Init( bool inWithProjectItemUniqueID)
{
	bool ok = true;

	if (sProjectItemManager == NULL)
	{
		sProjectItemManager = new VProjectItemManager( inWithProjectItemUniqueID);
		ok = (sProjectItemManager != NULL);

		if (ok)
			ok = VProjectItemTagManager::Init();
	}
	return ok;
}


void VProjectItemManager::DeInit()
{
	VProjectItemTagManager::DeInit();

	delete sProjectItemManager;
	sProjectItemManager = NULL;
}


sLONG VProjectItemManager::RegisterProjectItem( VProjectItem *inProjectItem)
{
	// Project Items used to be created only within the main thread.
	// Now that we thread the OpenBase calls, then we need to protect
	// the Register and Unregister operations using a TaskLock
	VTaskLock locker(&fMutex);
	
	sLONG id = 0;

	if (testAssert(fWithProjectItemUniqueID && (inProjectItem != NULL)))
	{
		if (fNextProjectItemID == 0)
			++fNextProjectItemID;
		
		fMapOfProjectItemIDs[fNextProjectItemID] = inProjectItem;
		id = fNextProjectItemID;

		++fNextProjectItemID;
	}

	return id;
}


void VProjectItemManager::UnregisterProjectItem( VProjectItem *inProjectItem)
{
	// Project Items used to be created only within the main thread.
	// Now that we thread the OpenBase calls, then we need to protect
	// the Register and Unregister operations using a TaskLock
	VTaskLock locker(&fMutex);
	
	if (testAssert(fWithProjectItemUniqueID && (inProjectItem != NULL)))
	{
		std::map< sLONG , VProjectItem* >::iterator found = fMapOfProjectItemIDs.find( inProjectItem->GetID());
		if (testAssert(found != fMapOfProjectItemIDs.end()))
			fMapOfProjectItemIDs.erase( found);
	}
}


VProjectItem* VProjectItemManager::GetProjectItemFromID( sLONG inID) const
{
	std::map< sLONG , VProjectItem* >::const_iterator found = fMapOfProjectItemIDs.find( inID);
	if (found != fMapOfProjectItemIDs.end())
		return found->second;

	return NULL;
}


bool VProjectItemManager::FileCopyTo(const XBOX::VURL& inSrcURL,const XBOX::VURL& inDestURL)
{
	VFilePath srcFilePath, destFilePath;
	inSrcURL.GetFilePath(srcFilePath);
	inDestURL.GetFilePath(destFilePath);

	return FileCopyTo(srcFilePath, destFilePath);
}

bool VProjectItemManager::FileMoveTo(const XBOX::VURL& inSrcURL,const XBOX::VURL& inDestURL)
{
	VFilePath srcFilePath, destFilePath;
	inSrcURL.GetFilePath(srcFilePath);
	inDestURL.GetFilePath(destFilePath);

	return FileMoveTo(srcFilePath, destFilePath);
}

bool VProjectItemManager::FolderCopyOrMoveTo(const XBOX::VURL& inSrcURL,const XBOX::VURL& inDestURL, bool inCopy)
{
	VFilePath srcFilePath, destFilePath;
	inSrcURL.GetFilePath(srcFilePath);
	inDestURL.GetFilePath(destFilePath);

	return FolderCopyOrMoveTo(srcFilePath, destFilePath, inCopy);
}

bool VProjectItemManager::FolderCopyOrMoveTo(const XBOX::VFilePath& inSrcFilePath, const XBOX::VFilePath& inDestFilePath, bool inCopy)
{
	if(inCopy)
		return FolderCopyTo( inSrcFilePath, inDestFilePath );

	return FolderMoveTo( inSrcFilePath, inDestFilePath );
}

bool VProjectItemManager::FileCopyTo(const XBOX::VFilePath& inSrcFilePath, const XBOX::VFilePath& inDestFilePath, VProgressIndicator* inProgressIndicator, bool* outUserAbort)
{
	bool ok = false;

	VFile srcFile(inSrcFilePath);
	if (srcFile.Exists())
	{
		VFile destFile(inDestFilePath);
		if (!destFile.Exists())
		{
			if (srcFile.CopyTo(destFile) == VE_OK)
				ok = true;
		}
	}

	if (inProgressIndicator && outUserAbort)
		*outUserAbort = !inProgressIndicator->Increment();
	
	return ok;
}

bool VProjectItemManager::FileMoveTo(const XBOX::VFilePath& inSrcFilePath, const XBOX::VFilePath& inDestFilePath, VProgressIndicator* inProgressIndicator, bool* outUserAbort)
{
	bool ok = false;

	VFile srcFile(inSrcFilePath);
	if (srcFile.Exists())
	{
		VFile destFile(inDestFilePath);
		if (!destFile.Exists())
		{
			if (srcFile.Move(inDestFilePath, NULL) == VE_OK)
				ok = true;
		}
	}

	if (inProgressIndicator && outUserAbort)
		*outUserAbort = !inProgressIndicator->Increment();
	
	return ok;
}

bool VProjectItemManager::FolderCopyTo(const XBOX::VFilePath& inSrcFilePath, const XBOX::VFilePath& inDestFilePath, VProgressIndicator* inProgressIndicator, bool* outUserAbort)
{
	VFolder srcFolder(inSrcFilePath);

	VFilePath destFolderPath;
	inDestFilePath.GetParent( destFolderPath );
	VFolder destFolder(destFolderPath);

	VFolder* outFolder;
	VError err = srcFolder.CopyTo( destFolder, &outFolder, FCP_ContinueOnError | FCP_Overwrite );

	return err == VE_OK;
}


bool VProjectItemManager::FolderMoveTo(const XBOX::VFilePath& inSrcFilePath, const XBOX::VFilePath& inDestFilePath, VProgressIndicator* inProgressIndicator, bool* outUserAbort)
{
	VFolder srcFolder(inSrcFilePath);

	VFilePath destFolderPath;
	inDestFilePath.GetParent( destFolderPath );
	VFolder destFolder(destFolderPath);

	VFolder* outFolder;
	VError err = srcFolder.Move( destFolder, &outFolder );
	
	return err == VE_OK;
}

sLONG VProjectItemManager::GetFilesCountInFolderAndSubfolder(const VFolder& inFolder)
{
	sLONG filesCount = 0;

	VFilePath folderPath;
	for (VFolderIterator it_folder(&inFolder, FI_WANT_FOLDERS | FI_WANT_INVISIBLES); it_folder.IsValid(); ++it_folder)
	{
		it_folder.Current()->GetPath().GetFolder(folderPath);
		filesCount += GetFilesCountInFolderAndSubfolder(VFolder(folderPath));
	}

	for (VFileIterator it_file(&inFolder, FI_WANT_FILES | FI_WANT_INVISIBLES); it_file.IsValid(); ++it_file)
	{
		++filesCount;
	}

	return filesCount;
}


sLONG VProjectItemManager::CountProjectItemsContains(const VectorOfProjectItems& inProjectItems, VProjectItem::e_ProjectItemKind inProjectItemKind)
{
	sLONG count = 0;

	if (inProjectItemKind == VProjectItem::eEXTERNAL_REFERENCE)
	{
		for (VectorOfProjectItemsConstIterator it = inProjectItems.begin();
			it != inProjectItems.end(); ++it)
		{
			if ((*it)->IsExternalReference())
			{
				count++;
			}
		}
	}
	else
	{
		for (VectorOfProjectItemsConstIterator it = inProjectItems.begin();
			it != inProjectItems.end(); ++it)
		{
			if ((*it)->GetKind() == inProjectItemKind)
			{
				count++;
			}
		}
	}

	return count;	
}


// ----------------------------------------------------------------------------
// VProjectItemBasicFilter
// ----------------------------------------------------------------------------
VProjectItemBasicFilter::VProjectItemBasicFilter(XBOX::VString inFilterExtensionStart, 
												 XBOX::VString inFilterExtension, 
												 XBOX::VString inFilterExtensionEnd, 
												 e_FilterExtensionAction inFilterExtensionAction,
												 XBOX::VString inFilterMotifStart, 
												 XBOX::VString inFilterMotif, 
												 XBOX::VString inFilterMotifEnd, 
												 e_FilterMotifAction inFilterMotifAction)
{
	fFilterExtensionStart = inFilterExtensionStart;
	fFilterExtension = inFilterExtension;
	fFilterExtensionEnd = inFilterExtensionEnd;
	fFilterExtensionAction = inFilterExtensionAction;
	fFilterMotifStart = inFilterMotifStart;
	fFilterMotif = inFilterMotif;
	fFilterMotifEnd = inFilterMotifEnd;
	fFilterMotifAction = inFilterMotifAction;
}

VProjectItemBasicFilter::~VProjectItemBasicFilter()
{
}

void VProjectItemBasicFilter::SetFilter( XBOX::VString inFilterExtensionStart, 
										 XBOX::VString inFilterExtension, 
										 XBOX::VString inFilterExtensionEnd, 
										 e_FilterExtensionAction inFilterExtensionAction,
										 XBOX::VString inFilterMotifStart, 
										 XBOX::VString inFilterMotif, 
										 XBOX::VString inFilterMotifEnd, 
										 e_FilterMotifAction inFilterMotifAction)
{
	fFilterExtensionStart = inFilterExtensionStart;
	fFilterExtension = inFilterExtension;
	fFilterExtensionEnd = inFilterExtensionEnd;
	fFilterExtensionAction = inFilterExtensionAction;
	fFilterMotifStart = inFilterMotifStart;
	fFilterMotif = inFilterMotif;
	fFilterMotifEnd = inFilterMotifEnd;
	fFilterMotifAction = inFilterMotifAction;
}

bool VProjectItemBasicFilter::Matches(VProjectItem* inProjectItem) const
{
	bool ok = true;

	if ((!fFilterExtension.IsEmpty()) || (!fFilterMotif.IsEmpty()))
	{
		// on teste en premier l'extension
		if (!fFilterExtension.IsEmpty())
		{
			VString extension;
			inProjectItem->GetExtension(extension);
			switch (fFilterExtensionAction)
			{
				case eEXTENSION_NONE:
					ok = true;
					break;
				case eEXTENSION_BEGINS_WITH:
					ok = extension.BeginsWith(fFilterExtension);
				break;
				case eEXTENSION_EQUALS_TO:
					ok = (extension == fFilterExtension);
				break;
				case eEXTENSION_CONTAINS:
					ok = (extension.Find(fFilterExtension) > 0);
				break;
				case eEXTENSION_ENDS_WITH:
					ok = extension.EndsWith(fFilterExtension);
				break;
				case eEXTENSION_BEGINS_WITH_AND_ENDS_WITH:
					ok = extension.BeginsWith(fFilterExtensionStart);
					if (ok)
						ok = extension.EndsWith(fFilterExtensionEnd);
				break;
			}
		}

		// ensuite on teste sur le motif si necessaire
		if (ok)
		{
			VString nameWithoutExtension;
			inProjectItem->GetNameWithoutExtension(nameWithoutExtension);
			switch (fFilterMotifAction)
			{
				case eMOTIF_NONE:
					ok = true;
					break;
				case eMOTIF_BEGINS_WITH:
					ok = nameWithoutExtension.BeginsWith(fFilterMotif);
				break;
				case eMOTIF_EQUALS_TO:
					ok = (nameWithoutExtension == fFilterMotif);
				break;
				// recherche stricte sur le nom sans l'extension
				case eMOTIF_STRICTLY_CONTAINS:
					ok = (nameWithoutExtension.Find(fFilterMotif) > 0);
				break;
				case eMOTIF_STRICTLY_ENDS_WITH:
					ok = nameWithoutExtension.EndsWith(fFilterMotif);
				break;
				case eMOTIF_STRICTLY_BEGINS_WITH_AND_ENDS_WITH:
					ok = nameWithoutExtension.BeginsWith(fFilterMotifStart);
					if (ok)
						ok = nameWithoutExtension.EndsWith(fFilterMotifEnd);
				break;
				// recherche large sur le nom complet (avec l'extension)
				case eMOTIF_CONTAINS:
					{
					VString displayName;
					inProjectItem->GetDisplayName(displayName);
					ok = (displayName.Find(fFilterMotif) > 0);
					}
				break;
				case eMOTIF_ENDS_WITH:
					{
					VString displayName;
					inProjectItem->GetDisplayName(displayName);
					ok = displayName.EndsWith(fFilterMotif);
					}
				break;
			}
		}
	}

	return ok;
}

void VProjectItemFilter::Reset()
{
	for (VectorOfProjectItemFiltersIterator it = projectItemFilters.begin(); 
		 it != projectItemFilters.end(); ++it)
	{
		(*it)->Release();
	}

	projectItemFilters.clear();
}

bool VProjectItemFilter::Matches(VProjectItem* inProjectItem) const
{
	bool ok = true;

	if (!projectItemFilters.empty())
	{
		for (VectorOfProjectItemFiltersConstIterator it = projectItemFilters.begin(); 
			 it != projectItemFilters.end(); ++it)
		{
			if ( (*it)->Matches(inProjectItem) )
            {
				ok = true;
                break;
            }
		}
	}

	return ok;
}



void VProjectItemTools::RemoveUselessItems( VectorOfProjectItems& ioItems)
{
	VectorOfProjectItems itemsVectorCopy( ioItems.begin(), ioItems.end()), ancestors;

	for (VectorOfProjectItemsIterator itemIter = itemsVectorCopy.begin() ; itemIter != itemsVectorCopy.end() ; ++itemIter)
	{
		if (*itemIter != NULL)
		{
			if ((*itemIter)->HasChildren())
				ancestors.push_back( *itemIter);
		}
	}

	ioItems.clear();

	for (VectorOfProjectItemsIterator itemIter = itemsVectorCopy.begin() ; itemIter != itemsVectorCopy.end() ; ++itemIter)
	{
		if (*itemIter != NULL)
		{
			bool hasAncestor = false;

			for (VectorOfProjectItemsIterator ancestorIter = ancestors.begin() ; (ancestorIter != ancestors.end()) && !hasAncestor ; ++ancestorIter)
			{
				hasAncestor = (*itemIter)->IsChildOf( *ancestorIter);
			}
			
			if (!hasAncestor)
				ioItems.push_back( *itemIter);
		}
	}		
}


void VProjectItemTools::GetChildren( VProjectItem *inProjectItem, VectorOfProjectItems& ioChildren, bool inRecursive)
{
	if (inProjectItem != NULL)
	{
		for (VProjectItemIterator iter( inProjectItem) ; iter.IsValid() ; ++iter)
		{
			ioChildren.push_back( iter);
			if (inRecursive)
			{
				GetChildren( iter, ioChildren, true);
			}
		}
	}
}


void VProjectItemTools::GetChildFile( VProjectItem *inProjectItem, VectorOfProjectItems& ioChildren, bool inRecursive)
{
	if (inProjectItem != NULL)
	{
		for (VProjectItemIterator iter( inProjectItem) ; iter.IsValid() ; ++iter)
		{
			if (iter->IsPhysicalFile())
				ioChildren.push_back( iter);
			else if (inRecursive)
				GetChildFile( iter, ioChildren, true);
		}
	}
}


VProjectItem* VProjectItemTools::GetFirstCommonParent( const VectorOfProjectItems &inProjectItems)
{
	VProjectItem *firstCommonParent = NULL;

	if (!inProjectItems.empty())
	{
		VectorOfProjectItems items( inProjectItems.begin(), inProjectItems.end());
		RemoveUselessItems( items);

		if (!items.empty())
		{
			if (items.size() == 1)
			{
				firstCommonParent = items.front()->GetParent();
			}
			else
			{
				VProjectItem *curParent = items.front()->GetParent();
				VectorOfProjectItemsConstIterator itemIter = items.begin();

				while ((curParent != NULL) && (itemIter != items.end()))
				{
					if (!(*itemIter)->IsChildOf( curParent))
						curParent = (*itemIter)->GetParent();

					++itemIter;
				}

				firstCommonParent = curParent;
			}
		}
	}

	return firstCommonParent;
}



// ----------------------------------------------------------------------------
// VProjectItemTagManager (SC)
// ----------------------------------------------------------------------------
const VProjectItemTag kSettingTag( "settings");
const VProjectItemTag kCatalogTag( "catalog");
const VProjectItemTag kBackupsTag( "Backups");

const VProjectItemTag kDataTag( "data");
const VProjectItemTag kDataFolderTag( "dataFolder");
const VProjectItemTag kRPCCatalogTag( "catalogRpc");
const VProjectItemTag kBootstrapTag( "bootStrap");
const VProjectItemTag kUAGDirectoryTag( "directory");
const VProjectItemTag kPermissionsTag( "permissions");
const VProjectItemTag kWebFolderTag( "webFolder");
const VProjectItemTag kWebComponentFolderTag( "webComponent" );
const VProjectItemTag kProjectCertificatesFolderTag( "projectCertificatesFolder");
const VProjectItemTag kSolutionCertificatesFolderTag( "solutionCertificatesFolder");
const VProjectItemTag kSystemWorkersTag( "systemWorkers");
const VProjectItemTag kWidgetsFolderTag( "widgets" );
const VProjectItemTag kThemesFolderTag( "themes" );


namespace ProjectItemTagBagKeys
{
	CREATE_BAGKEY_WITH_DEFAULT( fileKindID, XBOX::VString, L"");
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR( properties, XBOX::VLong, uLONG, ePITP_Default);
	CREATE_BAGKEY( defaultFolders);
	CREATE_BAGKEY( defaultFiles);
	CREATE_BAGKEY_NO_DEFAULT( path, XBOX::VString);
	CREATE_BAGKEY( extraBag);
}



VProjectItemTagManager* VProjectItemTagManager::sManager = NULL;

VProjectItemTagManager* VProjectItemTagManager::Get()
{
	return sManager;
}

bool VProjectItemTagManager::Init()
{
	if  (sManager == NULL)
	{
		sManager = new VProjectItemTagManager();
		if (sManager != NULL)
		{
			VectorOfVString defaultFiles, defaultFolders;

			// kSettingTag
			defaultFolders.push_back( L"Settings/");
			defaultFolders.push_back( L"");	// means that project folder is a default folder
			sManager->RegisterProjectItemTag(	kSettingTag,
												RIAFileKind::kSettingsFileKind,
												ePITP_ApplyToMultipleFiles | ePITP_ApplyToFolderContent,
												&defaultFolders,
												NULL );
			
			// kCatalogTag
			defaultFolders.clear();
			defaultFolders.push_back( L"Catalogs/");
			defaultFolders.push_back( L"");
			sManager->RegisterProjectItemTag(	kCatalogTag,
												RIAFileKind::kCatalogFileKind,
												ePITP_ApplyToSingleFile | ePITP_ApplyToFolderContent,
												&defaultFolders,
												NULL );
			
			//kBackupsTag
			defaultFolders.clear();
			defaultFolders.push_back( L"Backups/");
			sManager->RegisterProjectItemTag(	kBackupsTag,
												L"",
												ePITP_ApplyToSingleFolder,
												&defaultFolders,
												NULL );

			// kDataTag
			defaultFolders.clear();
			defaultFolders.push_back( L"data/");
			defaultFolders.push_back( L"");
			sManager->RegisterProjectItemTag(	kDataTag,
												RIAFileKind::kDataFileKind,
												ePITP_ApplyToSingleFile | ePITP_ApplyToFolderContent,
												&defaultFolders,
												NULL );

			// kDataFolderTag
			defaultFolders.clear();
			defaultFolders.push_back( L"DataFolder/");	// sc 01/03/2013 WAK0080758, a default folder is required
			sManager->RegisterProjectItemTag(	kDataFolderTag,
												L"",
												ePITP_ApplyToSingleFolder,
												&defaultFolders,
												NULL );

			// kRPCCatalogTag
			defaultFolders.clear();
			defaultFolders.push_back( L"rpc/");
			defaultFolders.push_back( L"");
			sManager->RegisterProjectItemTag(	kRPCCatalogTag,
												RIAFileKind::kRPCCatalogFileKind,
												ePITP_ApplyToMultipleFiles | ePITP_ApplyToFolderContent,
												&defaultFolders,
												NULL );

			// kBootstrapTag
			defaultFolders.clear();
			defaultFolders.push_back( L"bootStraps/");
			defaultFiles.clear();
			defaultFiles.push_back( L"waStartup.js");
			sManager->RegisterProjectItemTag(	kBootstrapTag,
												L"com.netscape.javascript-source",
												ePITP_ApplyToMultipleFiles | ePITP_ApplyToFolderContent,
												&defaultFolders,
												&defaultFiles );

			// kUAGDirectoryTag
			defaultFolders.clear();
			defaultFolders.push_back( L"directory/");
			defaultFolders.push_back( L"");
			sManager->RegisterProjectItemTag(	kUAGDirectoryTag,
												RIAFileKind::kUAGDirectoryFileKind,
												ePITP_ApplyToSingleFile | ePITP_ApplyToFolderContent,
												&defaultFolders,
												NULL );

			// kSystemWorkersTag
			/*defaultFolders.clear();
			defaultFolders.push_back( L"systemWorkers/");
			defaultFolders.push_back( L"");
			sManager->RegisterProjectItemTag(	kSystemWorkersTag,
												RIAFileKind::kJSONFileKind,
												ePITP_ApplyToSingleFile | ePITP_ApplyToFolderContent,
												&defaultFolders,
												NULL );*/
			// kPermissionsTag
			defaultFolders.clear();
			defaultFolders.push_back( L"permissions/");
			defaultFolders.push_back( L"");
			sManager->RegisterProjectItemTag(	kPermissionsTag,
												RIAFileKind::kUAGPermissionsFileKind,
												ePITP_ApplyToSingleFile | ePITP_ApplyToFolderContent,
												&defaultFolders,
												NULL );

			// kWebFolderTag
			defaultFolders.clear();
			defaultFolders.push_back( L"WebFolder/");
			sManager->RegisterProjectItemTag(	kWebFolderTag,
												L"",
												ePITP_ApplyToSingleFolder,
												&defaultFolders,
												NULL );

			// kWidgetsFolderTag
			defaultFolders.clear();
			defaultFolders.push_back( L"Widgets/");
			sManager->RegisterProjectItemTag(	kWidgetsFolderTag,
												L"",
												ePITP_ApplyToSingleFolder,
												&defaultFolders,
												NULL );

			// kThemesFolderTag
			defaultFolders.clear();
			defaultFolders.push_back( L"Themes/");
			sManager->RegisterProjectItemTag(	kThemesFolderTag,
												L"",
												ePITP_ApplyToSingleFolder,
												&defaultFolders,
												NULL );
			// kWebComponentFolderTag
			defaultFolders.clear();
			defaultFolders.push_back( L"webComponent.WebComponent/");
			sManager->RegisterProjectItemTag(	kWebComponentFolderTag,
												RIAFileKind::kWebComponentFileExtension,
												ePITP_ApplyToSingleFolder,
												&defaultFolders,
												NULL );

			// kProjectCertificatesFolderTag
			defaultFolders.clear();
			defaultFolders.push_back( L"Certificates/");
			sManager->RegisterProjectItemTag(	kProjectCertificatesFolderTag,
												L"",
												ePITP_ApplyToSingleFolder,
												&defaultFolders,
												NULL );

			// kSolutionCertificatesFolderTag
			defaultFolders.clear();
			defaultFolders.push_back( L"Certificates/");
			sManager->RegisterProjectItemTag(	kSolutionCertificatesFolderTag,
												L"",
												ePITP_ApplyToSingleFolder,
												&defaultFolders,
												NULL );
		}
	}
	return  sManager != NULL;
}


void VProjectItemTagManager::DeInit()
{
	delete sManager;
	sManager = NULL;
}


bool VProjectItemTagManager::RegisterProjectItemTag(	const VProjectItemTag& inTag,
														const XBOX::VString& inDefaultFileKindID,
														EProjectItemTagProperties inProperties,
														const VectorOfVString* inDefaultFolders,
														const VectorOfVString* inDefaultFiles)
{
	bool ok = false;

	MapOfTagInfo_iter found = fMapOfTagsInfo.find( inTag);
	if (found == fMapOfTagsInfo.end())
	{
		VValueBag *bag = new VValueBag();
		if (bag != NULL)
		{
			ProjectItemTagBagKeys::fileKindID.Set( bag, inDefaultFileKindID);
			ProjectItemTagBagKeys::properties.Set( bag, inProperties);
			
			if (inDefaultFolders != NULL)
			{
				VBagArray *folderPaths = new VBagArray();
				if (folderPaths != NULL)
				{
					_VectorOfPathsToBagArray( *inDefaultFolders, *folderPaths);
					bag->SetElements( ProjectItemTagBagKeys::defaultFolders, folderPaths);
				}
				ReleaseRefCountable( &folderPaths);
			}

			if (inDefaultFiles != NULL)
			{
				VBagArray *filePaths = new VBagArray();
				if (filePaths != NULL)
				{
					_VectorOfPathsToBagArray( *inDefaultFiles, *filePaths);
					bag->SetElements( ProjectItemTagBagKeys::defaultFiles, filePaths);
				}
				ReleaseRefCountable( &filePaths);
			}

			fMapOfTagsInfo[inTag] = XBOX::VRefPtr<VValueBag>(bag);

			ok = true;
		}
		ReleaseRefCountable( &bag);
	}
	return ok;
}


bool VProjectItemTagManager::IsRegisteredProjectItemTag( const VProjectItemTag& inTag) const
{
	return (fMapOfTagsInfo.find( inTag) != fMapOfTagsInfo.end());
}


void VProjectItemTagManager::GetProjectItemTagCollection( std::vector<VProjectItemTag>& outTags) const
{
	outTags.clear();
	for (MapOfTagInfo_citer iter = fMapOfTagsInfo.begin() ; iter != fMapOfTagsInfo.end() ; ++iter)
		outTags.push_back( iter->first);
}


bool VProjectItemTagManager::GetDefaultFileKindID( const VProjectItemTag& inTag, XBOX::VString& outFileKindID) const
{
	bool ok = false;

	MapOfTagInfo_citer found = fMapOfTagsInfo.find( inTag);
	if (found != fMapOfTagsInfo.end() && !found->second.IsNull())
	{
		outFileKindID = ProjectItemTagBagKeys::fileKindID.Get( found->second);
		ok = !outFileKindID.IsEmpty();
	}
	return ok;
}


bool VProjectItemTagManager::GetDefaultExtension( const VProjectItemTag& inTag, XBOX::VString& outExtension) const
{
	bool ok = false;

	XBOX::VFileKind *fileKind = RetainDefaultFileKind( inTag);
	if (fileKind != NULL)
	{
		ok = fileKind->GetPreferredExtension( outExtension);
		fileKind->Release();
	}
	return ok;
}


XBOX::VFileKind* VProjectItemTagManager::RetainDefaultFileKind( const VProjectItemTag& inTag) const
{
	XBOX::VFileKind *fileKind = NULL;

	VString fileKindID;
	if (GetDefaultFileKindID( inTag, fileKindID))
	{
		fileKind = XBOX::VFileKindManager::Get()->RetainFileKind( fileKindID);
	}
	return fileKind;
}


EProjectItemTagProperties VProjectItemTagManager::GetProperties( const VProjectItemTag& inTag) const
{
	EProjectItemTagProperties result = ePITP_Default;

	MapOfTagInfo_citer found = fMapOfTagsInfo.find( inTag);
	if (found != fMapOfTagsInfo.end() && !found->second.IsNull())
	{
		result = ProjectItemTagBagKeys::properties.Get( found->second);
	}
	return result;
}


bool VProjectItemTagManager::GetDefaultFolders( const VProjectItemTag& inTag, XBOX::VectorOfVString& outPaths) const
{
	bool ok = false;

	outPaths.clear();

	MapOfTagInfo_citer found = fMapOfTagsInfo.find( inTag);
	if (found != fMapOfTagsInfo.end() && !found->second.IsNull())
	{
		VBagArray *folderPaths = found->second->RetainElements( ProjectItemTagBagKeys::defaultFolders);
		if (folderPaths != NULL)
		{
			_BagArrayToVectorOfPaths( *folderPaths, outPaths);
			ok = !outPaths.empty();
		}
		ReleaseRefCountable( &folderPaths);
	}
	return ok;
}


bool VProjectItemTagManager::GetPreferedDefaultFolder( const VProjectItemTag& inTag, XBOX::VString& outPath) const
{
	bool ok = false;

	VectorOfVString paths;
	if (GetDefaultFolders( inTag, paths))
	{
		if (!paths.empty())
		{
			outPath = paths[0];
			ok = true;
		}
	}
	return ok;
}


bool VProjectItemTagManager::GetDefaultFiles( const VProjectItemTag& inTag, XBOX::VectorOfVString& outPaths) const
{
	bool ok = false;

	outPaths.clear();

	MapOfTagInfo_citer found = fMapOfTagsInfo.find( inTag);
	if (found != fMapOfTagsInfo.end() && !found->second.IsNull())
	{
		VBagArray *filesPaths = found->second->RetainElements( ProjectItemTagBagKeys::defaultFiles);
		if (filesPaths != NULL)
		{
			_BagArrayToVectorOfPaths( *filesPaths, outPaths);
			ok = !outPaths.empty();
		}
		ReleaseRefCountable( &filesPaths);
	}
	return ok;
}


bool VProjectItemTagManager::SetExtraBag( const VProjectItemTag& inTag, XBOX::VValueBag* inBag) const
{
	bool ok = false;

	MapOfTagInfo_citer found = fMapOfTagsInfo.find( inTag);
	if (found != fMapOfTagsInfo.end() && !found->second.IsNull())
	{
		found->second->ReplaceElement( ProjectItemTagBagKeys::extraBag, inBag);
		ok = true;
	}
	return ok;
}


XBOX::VValueBag* VProjectItemTagManager::RetainExtraBag( const VProjectItemTag& inTag) const
{
	XBOX::VValueBag *bag = NULL;

	MapOfTagInfo_citer found = fMapOfTagsInfo.find( inTag);
	if (found != fMapOfTagsInfo.end() && !found->second.IsNull())
	{
		bag = found->second->RetainUniqueElement( ProjectItemTagBagKeys::extraBag);
	}
	return  bag;
}


bool VProjectItemTagManager::Find( const VProjectItemTag& inTag, const std::vector<VProjectItemTag>& inWhere)
{
	return (std::find( inWhere.begin(), inWhere.end(), inTag) != inWhere.end());
}


void VProjectItemTagManager::_VectorOfPathsToBagArray( const XBOX::VectorOfVString& inPaths, XBOX::VBagArray& outBagArray) const
{
	outBagArray.Destroy();

	for (VectorOfVString::const_iterator iter = inPaths.begin() ; iter != inPaths.end() ; ++iter)
	{
		VValueBag *bag = new VValueBag();
		if (bag != NULL)
		{
			ProjectItemTagBagKeys::path.Set( bag, *iter);
			outBagArray.AddTail( bag);
		}
		ReleaseRefCountable( &bag);
	}
}


void VProjectItemTagManager::_BagArrayToVectorOfPaths( const XBOX::VBagArray& inBagArray, XBOX::VectorOfVString& outPaths) const
{
	outPaths.clear();

	for (VIndex pos = 1 ; pos <= inBagArray.GetCount() ; ++pos)
	{
		const VValueBag *bag = inBagArray.GetNth( pos);
		if (bag != NULL)
		{
			VString path;
			if (ProjectItemTagBagKeys::path.Get( bag, path))
				outPaths.push_back( path);
		}
	}
}
