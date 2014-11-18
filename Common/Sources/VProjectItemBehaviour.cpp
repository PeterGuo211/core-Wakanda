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
#include "VProjectItem.h"
#include "VProjectItemBehaviour.h"


USING_TOOLBOX_NAMESPACE



VProjectItemBehaviour::VProjectItemBehaviour( VProjectItem *inOwner)
: fOwner(inOwner)
{
}


VProjectItemBehaviour::~VProjectItemBehaviour()
{
}



// ----------------------------------------------------------------------------



VProjectItemSolution::VProjectItemSolution( VProjectItem *inOwner)
: VProjectItemFolder( inOwner),
fSolution(NULL)
{
}


VProjectItemSolution::~VProjectItemSolution()
{
}


VProjectItem* VProjectItemSolution::Instantiate( const XBOX::VURL& inURL, const VString& inSolutionName)
{
	VProjectItem *result = NULL;

	VProjectItemSolution *behaviour = new VProjectItemSolution( NULL);
	if (behaviour != NULL)
	{
		result = new VProjectItem( behaviour);
		if (result != NULL)
		{
			result->SetURL( inURL);
			result->SetName( inSolutionName);
			result->SetDisplayName( inSolutionName);
		}
	}
	return result;
}


// ----------------------------------------------------------------------------



VMediaLibraryFolder::VMediaLibraryFolder( VProjectItem *inOwner)
: VProjectItemFolder( inOwner)
{
}


VMediaLibraryFolder::~VMediaLibraryFolder()
{
}

// ----------------------------------------------------------------------------



VWidgetsFolder::VWidgetsFolder( VProjectItem *inOwner)
: VProjectItemFolder( inOwner)
{
}


VWidgetsFolder::~VWidgetsFolder()
{
}


// ----------------------------------------------------------------------------



VThemesFolder::VThemesFolder( VProjectItem *inOwner)
: VProjectItemFolder( inOwner)
{
}


VThemesFolder::~VThemesFolder()
{
}

// ----------------------------------------------------------------------------



VProjectItemFolder::VProjectItemFolder( VProjectItem *inOwner)
: VProjectItemBehaviour( inOwner)
{
}


VProjectItemFolder::~VProjectItemFolder()
{
}


VProjectItem* VProjectItemFolder::Instantiate( const XBOX::VString& inFolderName, VProjectItem *inParent)
{
	VProjectItem *result = NULL;

	VProjectItemFolder *behaviour = new VProjectItemFolder( NULL);
	if (behaviour != NULL)
	{
		result = new VProjectItem( behaviour);
		if (result != NULL)
		{
			result->SetName( inFolderName);
			result->SetDisplayName( inFolderName);
			VString relativePath( inFolderName);
			relativePath += FOLDER_SEPARATOR;
			result->SetRelativePath( relativePath, eURL_NATIVE_STYLE);

			if (inParent != NULL)
				inParent->AttachChild( result);
		}
	}
	return result;
}


VProjectItem* VProjectItemFolder::Instantiate( const XBOX::VURL& inURL, VProjectItem *inParent, bool inExternalReference)
{
	VProjectItem *result = NULL;

	VFilePath path;
	if (inURL.GetFilePath( path))
	{
		if (path.IsFolder())
		{
			VString folderName;
			path.GetFolderName( folderName);

			VProjectItemFolder *behaviour = new VProjectItemFolder( NULL);
			if (behaviour != NULL)
			{
				result = new VProjectItem( behaviour);
				if (result != NULL)
				{
					result->SetURL( inURL);
					result->SetName( folderName);
					result->SetDisplayName( folderName);
					result->SetExternalReference( inExternalReference);

					if (inParent != NULL)
						inParent->AttachChild( result);
				}
			}
		}
	}
	return result;
}


bool VProjectItemFolder::ConformsTo( const XBOX::VString& inFileKindID) const
{
	bool result = false;

	if (fOwner != NULL)
	{
		VString extension;
		fOwner->GetExtension( extension);

		VFileKind *itemKind = VFileKindManager::Get()->RetainFirstFileKindMatchingWithExtension( extension);
		if (itemKind == NULL)
			itemKind = VFileKindManager::Get()->RetainFileKind( L"public.folder");
		
		if (itemKind != NULL)
		{
			VFileKind *refKind = VFileKindManager::Get()->RetainFileKind( inFileKindID);
			if (refKind != NULL)
			{
				result = itemKind->ConformsTo( *refKind);
				ReleaseRefCountable( &refKind);
			}
			ReleaseRefCountable( &itemKind);
		}
	}

	return result;
}


VError VProjectItemFolder::GetModificationTime( VTime& outModificationTime) const
{
	VError err = VE_OK;

	VFolder *folder = RetainFolder();
	if (folder != NULL)
	{
		err = folder->GetTimeAttributes( &outModificationTime, NULL, NULL);
		ReleaseRefCountable( &folder);
	}
	else
	{
		err = VE_FOLDER_NOT_FOUND;
	}

	return err;
}


void VProjectItemFolder::GetDescription( XBOX::VString& outDescription) const
{
	outDescription.Clear();

	if (fOwner != NULL)
	{
		VString extension;
		fOwner->GetExtension( extension);

		VFileKind *itemKind = VFileKindManager::Get()->RetainFirstFileKindMatchingWithExtension( extension);
		if (itemKind == NULL)
			itemKind = VFileKindManager::Get()->RetainFileKind( L"public.folder");
		
		if (itemKind != NULL)
		{
			outDescription = itemKind->GetDescription();
			ReleaseRefCountable( &itemKind);
		}
	}
}


bool VProjectItemFolder::Exists() const
{
	if (fOwner == NULL)
		return false;
	
	VFilePath path;
	if (!fOwner->GetFilePath( path))
		return false;

	VFolder folder( path);
	return folder.Exists();
}


VError VProjectItemFolder::Delete()
{
	if (fOwner == NULL)
		return VE_FOLDER_CANNOT_DELETE;
	
	VFilePath path;
	if (!fOwner->GetFilePath( path))
		return VE_FOLDER_CANNOT_DELETE;

	VError err = VE_OK;
	VFolder folder( path);
	if (folder.Exists())
		err = folder.MoveToTrash();
	
	return err;
}


XBOX::VError VProjectItemFolder::Rename( const XBOX::VString& inNewName)
{
	if (fOwner == NULL)
		return VE_FOLDER_CANNOT_RENAME;
	
	VFilePath path;
	if (!fOwner->GetFilePath( path))
		return VE_FOLDER_CANNOT_RENAME;

	VFolder *newFolder = NULL;
	VFolder folder( path);
	VError err = folder.Rename( inNewName, &newFolder);
	if (err == VE_OK && newFolder != NULL)
	{
		VString folderName;
		newFolder->GetName( folderName);

		fOwner->SetName( folderName);	// sc 26/09/2011, WAK0073011
		fOwner->SetDisplayName( folderName);
		
		if (fOwner->HasRelativePath())
		{
			folderName += FOLDER_SEPARATOR;
			fOwner->SetRelativePath( folderName, eURL_NATIVE_STYLE);
		}
		else
		{
			VFilePath path;
			newFolder->GetPath( path);
			fOwner->SetURL( VURL( path));
		}
	}

	if (err != VE_OK)
		err = VE_FOLDER_CANNOT_RENAME;
	
	return err;	
}


VError VProjectItemFolder::Create()
{
	if (fOwner == NULL)
		return VE_FOLDER_CANNOT_CREATE;
	
	VFilePath path;
	if (!fOwner->GetFilePath( path))
		return VE_FOLDER_CANNOT_CREATE;

	VFolder folder( path);
	if (folder.Exists())
		return VE_FOLDER_ALREADY_EXISTS;

	return folder.CreateRecursive();
}


bool VProjectItemFolder::Create(const XBOX::VURL& inURL)
{
	bool ok = false;

	// creation de la ressource associee
	VFilePath filePath;
	inURL.GetFilePath(filePath);

	VFolder folder(filePath);
	if (!folder.Exists())
		if (folder.CreateRecursive() == VE_OK)
			ok = true;
	
	return ok;
}


bool VProjectItemFolder::CopyTo(const XBOX::VURL& inSrcURL,const XBOX::VURL& inDestURL)
{
	return VProjectItemManager::FolderCopyOrMoveTo(inSrcURL, inDestURL, true);
}


bool VProjectItemFolder::MoveTo(const XBOX::VURL& inSrcURL,const XBOX::VURL& inDestURL)
{
	bool ok = false;

	VFilePath srcFilePath, destFilePath;
	inSrcURL.GetFilePath(srcFilePath);
	inDestURL.GetFilePath(destFilePath);

	VFolder srcFolder(srcFilePath);
	VFolder destFolder(destFilePath);

	if (_MoveTo(srcFolder, destFolder) == VE_OK)
		ok = true;

	return ok;
}


VError VProjectItemFolder::_MoveTo(const VFolder& srcFolder, VFolder& destFolder)
{
	VError err = VE_OK;

	if (!destFolder.Exists())
		err = destFolder.CreateRecursive();
	else
		err = VE_UNKNOWN_ERROR; // TO DO ce n'est pas vrai : mais c'est pour le moment : 011008
								// que faire : ecraser, fusionner, on attends les specs !

	if (err == VE_OK)
		{
			for (VFolderIterator it_folder(&srcFolder, FI_WANT_FOLDERS | FI_WANT_INVISIBLES); it_folder.IsValid() && err == VE_OK; ++it_folder)
			{
				VFolder srcNewFolder(it_folder.Current()->GetPath());

				VString srcNewFolderName;
				srcNewFolder.GetName(srcNewFolderName);
				VString destNewFolderPath;
				destFolder.GetPath(destNewFolderPath);
				destNewFolderPath += srcNewFolderName;
				destNewFolderPath += FOLDER_SEPARATOR;
				VFolder destNewFolder(destNewFolderPath);

				err = _MoveTo(srcNewFolder, destNewFolder);
			}

			for (VFileIterator it_file(&srcFolder, FI_WANT_FILES | FI_WANT_INVISIBLES); it_file.IsValid() && err == VE_OK; ++it_file)
			{
				VFile srcNewFile(it_file.Current()->GetPath());

				VString srcNewFileName;
				srcNewFile.GetName(srcNewFileName);
				VString destNewFilePath;
				destFolder.GetPath(destNewFilePath);
				destNewFilePath += srcNewFileName;
				VFile destNewFile(destNewFilePath);

				VProjectItemFile projectItemFile;
				VURL srcURL = VURL(srcNewFile.GetPath());
				VURL destURL = VURL(destNewFile.GetPath());
				projectItemFile.MoveTo(srcURL, destURL);
			}
		}

	if (err == VE_OK)
	{
		err = srcFolder.Delete(true);
	}

	return err;
}


bool VProjectItemFolder::Create(const XBOX::VString& inFullPath)
{
	bool ok = false;

	VFolder folder(inFullPath);
	if (!folder.Exists())
		if (folder.CreateRecursive() == VE_OK)
			ok = true;
	
	return ok;
}


VFolder* VProjectItemFolder::RetainFolder() const
{
	VFolder *folder = NULL;

	if (fOwner != NULL)
	{
		VFilePath path;
		if (fOwner->GetFilePath( path) && path.IsFolder())
			folder = new VFolder( path);
	}
	return folder;
}



// ----------------------------------------------------------------------------



VProjectItemProject::VProjectItemProject( VProjectItem *inOwner)
: VProjectItemFolder( inOwner),
fProject(NULL)
{
}


VProjectItemProject::~VProjectItemProject()
{
}


VProjectItem* VProjectItemProject::Instantiate( const XBOX::VURL& inURL, const XBOX::VString& inProjectName)
{
	VProjectItem *result = NULL;

	VProjectItemProject *behaviour = new VProjectItemProject( NULL);
	if (behaviour != NULL)
	{
		result = new VProjectItem( behaviour);
		if (result != NULL)
		{
			result->SetURL( inURL);
			result->SetName( inProjectName);
			result->SetDisplayName( inProjectName);
		}
	}
	return result;
}



// ----------------------------------------------------------------------------


VProjectItemFile::VProjectItemFile()
: VProjectItemBehaviour( NULL)
{
}


VProjectItemFile::VProjectItemFile( VProjectItem *inOwner)
: VProjectItemBehaviour( inOwner)
{
}

VProjectItemFile::~VProjectItemFile()
{
}


VProjectItem* VProjectItemFile::Instantiate( const XBOX::VString& inFileName, VProjectItem *inParent)
{
	VProjectItem *result = NULL;

	VProjectItemFile *behaviour = new VProjectItemFile( NULL);
	if (behaviour != NULL)
	{
		result = new VProjectItem( behaviour);
		if (result != NULL)
		{
			result->SetName( inFileName);
			result->SetDisplayName( inFileName);
			result->SetRelativePath( inFileName, eURL_NATIVE_STYLE);

			if (inParent != NULL)
				inParent->AttachChild( result);
		}
	}
	return result;
}


VProjectItem* VProjectItemFile::Instantiate( const XBOX::VURL& inURL, VProjectItem *inParent, bool inExternalReference)
{
	VProjectItem *result = NULL;

	VFilePath path;
	if (inURL.GetFilePath( path))
	{
		if (path.IsFile())
		{
			VString fileName;
			path.GetFileName( fileName);

			VProjectItemFile *behaviour = new VProjectItemFile( NULL);
			if (behaviour != NULL)
			{
				result = new VProjectItem( behaviour);
				if (result != NULL)
				{
					result->SetURL( inURL);
					result->SetName( fileName);
					result->SetDisplayName( fileName);
					result->SetExternalReference( inExternalReference);

					if (inParent != NULL)
						inParent->AttachChild( result);
				}
			}
		}
	}
	return result;
}


bool VProjectItemFile::ConformsTo( const VString& inFileKindID) const
{
	bool result = false, done = false;

	if (fOwner != NULL)
	{
	#if 0	// sc 08/09/2011, optimization
		VFilePath path;
		if (fOwner->GetFilePath( path) && path.IsFile())
		{
			VFile file( path);
			if (file.Exists())
			{
				result = file.ConformsTo( inFileKindID);
				done = true;
			}
		}
	#endif

		if (!done)
		{
			VString extension;
			fOwner->GetExtension( extension);

			VFileKind *itemKind = VFileKindManager::Get()->RetainFirstFileKindMatchingWithExtension( extension);
			if (itemKind != NULL)
			{
				VFileKind *refKind = VFileKindManager::Get()->RetainFileKind( inFileKindID);
				if (refKind != NULL)
				{
					result = itemKind->ConformsTo( *refKind);
					ReleaseRefCountable( &refKind);
				}
				ReleaseRefCountable( &itemKind);
			}
		}
	}

	return result;
}


bool VProjectItemFile::IsSystemFile() const
{
	return (	ConformsTo( RIAFileKind::kSolutionFileKind)
			||	ConformsTo( RIAFileKind::kProjectFileKind)
			||	ConformsTo( RIAFileKind::kSymbolDataFileKind)
			||	ConformsTo( RIAFileKind::kSolutionFileKind)
			||	ConformsTo( RIAFileKind::kMatchFileKind));
}


VError VProjectItemFile::GetModificationTime( VTime& outModificationTime) const
{
	VError err = VE_OK;

	VFile *file = RetainFile();
	if (file != NULL)
	{
		err = file->GetTimeAttributes( &outModificationTime, NULL, NULL);
		ReleaseRefCountable( &file);
	}
	else
	{
		err = VE_FILE_NOT_FOUND;
	}

	return err;
}


void VProjectItemFile::GetDescription( XBOX::VString& outDescription) const
{
	outDescription.Clear();

	if (fOwner != NULL)
	{
		VString extension;
		fOwner->GetExtension( extension);

		VFileKind *itemKind = VFileKindManager::Get()->RetainFirstFileKindMatchingWithExtension( extension);
		if (itemKind != NULL)
		{
			outDescription = itemKind->GetDescription();
			ReleaseRefCountable( &itemKind);
		}
	}
}


bool VProjectItemFile::Exists() const
{
	if (fOwner == NULL)
		return false;
	
	VFilePath path;
	if (!fOwner->GetFilePath( path))
		return false;

	VFile file( path);
	return file.Exists();
}


VError VProjectItemFile::Delete()
{
	if (fOwner == NULL)
		return VE_FILE_CANNOT_DELETE;
	
	VFilePath path;
	if (!fOwner->GetFilePath( path))
		return VE_FILE_CANNOT_DELETE;

	VError err = VE_OK;
	VFile file( path);
	if (file.Exists())
		err = file.MoveToTrash();
	
	return err;
}


XBOX::VError VProjectItemFile::Rename( const XBOX::VString& inNewName)
{
	if (fOwner == NULL)
		return VE_FILE_CANNOT_RENAME;
	
	VFilePath path;
	if (!fOwner->GetFilePath( path))
		return VE_FILE_CANNOT_RENAME;

	VFile *newFile = NULL;	
	VFile file( path);
	VError err = file.Rename( inNewName, &newFile);
	if (err == VE_OK && newFile != NULL)
	{
		VString fileName;
		newFile->GetName( fileName);

		fOwner->SetName( fileName);
		fOwner->SetDisplayName( fileName);
		
		if (fOwner->HasRelativePath())
		{
			fOwner->SetRelativePath( fileName, eURL_NATIVE_STYLE);
		}
		else
		{
			VFilePath path;
			newFile->GetPath( path);
			fOwner->SetURL( VURL( path));
		}
	}

	ReleaseRefCountable( &newFile);

	if (err != VE_OK)
		err = VE_FILE_CANNOT_RENAME;
	
	return err;	
}


VError VProjectItemFile::Create()
{
	if (fOwner == NULL)
		return VE_FILE_CANNOT_CREATE;
	
	VFilePath path;
	if (!fOwner->GetFilePath( path))
		return VE_FILE_CANNOT_CREATE;

	VFile file( path);
	if (file.Exists())
		return VE_FILE_ALREADY_EXISTS;

	return file.Create();
}


bool VProjectItemFile::Create(const XBOX::VURL& inURL)
{
	bool ok = false;

	// creation de la ressource associee
	VFilePath filePath;
	inURL.GetFilePath(filePath);

	VFile file(filePath);
	if (!file.Exists())
	{
		if (file.Create() == VE_OK)
			ok = true;
	}
	
	return ok;
}


bool VProjectItemFile::CopyTo(const XBOX::VURL& inSrcURL,const XBOX::VURL& inDestURL)
{
	return VProjectItemManager::FileCopyTo(inSrcURL, inDestURL);
}


bool VProjectItemFile::MoveTo(const XBOX::VURL& inSrcURL,const XBOX::VURL& inDestURL)
{
	bool ok = false;

	VFilePath srcFilePath;
	inSrcURL.GetFilePath(srcFilePath);

	VFile srcFile(srcFilePath);
	if (srcFile.Exists())
	{
		VFilePath destFilePath;
		inDestURL.GetFilePath(destFilePath);
		VFile destFile(destFilePath);
		if (!destFile.Exists())
		{
			if (srcFile.Move(destFilePath, NULL) == VE_OK)
				ok = true;
		}
	}
	
	return ok;
}


bool VProjectItemFile::Create(const XBOX::VString& inFullPath)
{
	bool ok = false;

	VFile file(inFullPath);
	if (!file.Exists())
		if (file.Create() == VE_OK)
			ok = true;
	
	return ok;
}


VFile* VProjectItemFile::RetainFile() const
{
	VFile *file = NULL;

	if (fOwner != NULL)
	{
		VFilePath path;
		if (fOwner->GetFilePath( path) && path.IsFile())
			file = new VFile( path);
	}
	return file;
}



// ----------------------------------------------------------------------------



VProjectItemCatalog::VProjectItemCatalog( VProjectItem *inOwner)
: VProjectItemFile( inOwner),
fCatalog(NULL)
{
}


VProjectItemCatalog::~VProjectItemCatalog()
{
}


VProjectItem* VProjectItemCatalog::Instantiate( const XBOX::VString& inFileName, VProjectItem *inParent)
{
	VProjectItem *result = NULL;

	VProjectItemCatalog *behaviour = new VProjectItemCatalog( NULL);
	if (behaviour != NULL)
	{
		result = new VProjectItem( behaviour);
		if (result != NULL)
		{
			result->SetName( inFileName);
			result->SetDisplayName( inFileName);
			result->SetRelativePath( inFileName, eURL_NATIVE_STYLE);

			if (inParent != NULL)
				inParent->AttachChild( result);
		}
	}
	return result;
}


// ----------------------------------------------------------------------------



VProjectItemDataClass::VProjectItemDataClass( VProjectItem *inOwner)
: VProjectItemBehaviour( inOwner), fType( eLocal)
{
}


VProjectItemDataClass::~VProjectItemDataClass()
{
}


VProjectItem* VProjectItemDataClass::Instantiate( const XBOX::VString& inDataClassName, VProjectItem *inParent)
{
	VProjectItem *result = NULL;

	VProjectItemDataClass *behaviour = new VProjectItemDataClass( NULL);
	if (behaviour != NULL)
	{
		result = new VProjectItem( behaviour);
		if (result != NULL)
		{
			result->SetName( inDataClassName);
			result->SetDisplayName( inDataClassName);

			if (inParent != NULL)
				inParent->AttachChild( result);
		}
	}
	return result;
}


void VProjectItemDataClass::GetDescription( XBOX::VString& outDescription) const
{
	outDescription.FromCString( "Data Class");
}


bool VProjectItemDataClass::Exists() const
{
	return true;
}



// ----------------------------------------------------------------------------



VProjectItemDataClassAttribute::VProjectItemDataClassAttribute( VProjectItem *inOwner)
: VProjectItemBehaviour( inOwner)
{
}


VProjectItemDataClassAttribute::~VProjectItemDataClassAttribute()
{
}


VProjectItem* VProjectItemDataClassAttribute::Instantiate( const XBOX::VString& inAttributeName, VProjectItem *inParent)
{
	VProjectItem *result = NULL;

	VProjectItemDataClassAttribute *behaviour = new VProjectItemDataClassAttribute( NULL);
	if (behaviour != NULL)
	{
		result = new VProjectItem( behaviour);
		if (result != NULL)
		{
			result->SetName( inAttributeName);
			result->SetDisplayName( inAttributeName);

			if (inParent != NULL)
				inParent->AttachChild( result);
		}
	}
	return result;
}


void VProjectItemDataClassAttribute::GetDescription( XBOX::VString& outDescription) const
{
	outDescription.FromCString( "Data Class Attribute");
}


bool VProjectItemDataClassAttribute::Exists() const
{
	return true;
}
