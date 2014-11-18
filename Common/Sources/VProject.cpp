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
#include "VSolution.h"
#include "VProjectItem.h"
#include "VProjectItemBehaviour.h"
#include "VRIASettingsKeys.h"
#include "VRIASettingsFile.h"
#include "VProjectSettings.h"
#include "VRIAServerConstants.h"
#include "VRIAUTIs.h"
#include "DB4D/Headers/DB4D.h"
#include "VProject.h"

USING_TOOLBOX_NAMESPACE


// ----------------------------------------------------------------------------



class VProjectFileStampSaver : public VObject
{
public:
	VProjectFileStampSaver( VProject *inProject) : fProject(inProject)
	{
		fDirtyStampSave = fProject->_GetProjectFileDirtyStamp();
	}

	virtual ~VProjectFileStampSaver() {;}

			bool StampHasBeenChanged() const
			{
				return fProject->_GetProjectFileDirtyStamp() > fDirtyStampSave;
			}

private:
			VProject	*fProject;
			sLONG		fDirtyStampSave;
};



// ----------------------------------------------------------------------------
// Classe VProject :
// ----------------------------------------------------------------------------
VProject::VProject( VSolution *inParentSolution)
: fSolution(inParentSolution)
,fProjectItem( NULL)
,fProjectItemProjectFile( NULL)
,fProjectFileDirtyStamp(0)
,fIsLoadingFromXML(false)
,fSymbolTable(NULL)
,fBackgroundDeleteFileTask(NULL)
,fIsWatchingFileSystem(false)
,fIsUpdatingSymbolTable(false)
,fCoreSymbolsNotLoaded(true)
{
	fUUID.Regenerate();
}

VProject::~VProject()
{
	xbox_assert(!fIsWatchingFileSystem);
	xbox_assert(!fIsUpdatingSymbolTable);
	xbox_assert(fBackgroundDeleteFileTask == NULL);
	xbox_assert(fSymbolTable == NULL);
}


VProject* VProject::Instantiate( XBOX::VError& outError, VSolution *inParentSolution, const XBOX::VFilePath& inProjectFile)
{
	VFilePath folderPath;
	if (!inProjectFile.IsFile() || !inProjectFile.GetFolder( folderPath))
	{
		outError = VE_INVALID_PARAMETER;
		return NULL;
	}

	VProjectItem *rootItem = NULL, *projectFileItem = NULL;
	outError = VE_OK;

	// Create the root project item
	rootItem = new VProjectItem( VURL( folderPath), VProjectItem::ePROJECT);
	if (rootItem != NULL)
	{
		VString itemName;
		inProjectFile.GetFileName( itemName, false);
		rootItem->SetName( itemName);
		rootItem->SetDisplayName( itemName);

		// Create an item for the project file
		projectFileItem = new VProjectItem( VURL( inProjectFile), VProjectItem::eFILE);
		if (projectFileItem != NULL)
		{
			inProjectFile.GetFileName( itemName);
			projectFileItem->SetName( itemName);
			projectFileItem->SetDisplayName( itemName);
		}
		else
		{
			outError = VE_MEMORY_FULL;
		}
	}
	else
	{
		outError = VE_MEMORY_FULL;
	}
	
	VProject *project = NULL;

	if (outError == VE_OK)
	{
		project = new VProject( inParentSolution);
		if (project != NULL)
		{
			project->_SetProjectItem( rootItem);
			project->_SetProjectFileItem( projectFileItem);
		}
		else
		{
			outError = VE_MEMORY_FULL;
		}
	}
	
	ReleaseRefCountable( &rootItem);
	ReleaseRefCountable( &projectFileItem);

	return project;
}


const VUUID& VProject::GetUUID() const
{
	return fUUID;
}


bool VProject::GetName( XBOX::VString& outName) const
{
	bool ok = false;
	outName.Clear();

	if (fProjectItem != NULL)
	{
		outName = fProjectItem->GetDisplayName();
		ok = true;
	}
	return ok;
}


bool VProject::GetProjectFolderPath( XBOX::VFilePath& outPath) const
{
	bool ok = false;
	outPath.Clear();

	if (fProjectItem != NULL)
		ok = fProjectItem->GetFilePath( outPath);

	return ok;
}


bool VProject::GetProjectFilePath( XBOX::VFilePath& outPath) const
{
	bool ok = false;
	outPath.Clear();

	if (fProjectItemProjectFile != NULL)
		ok = fProjectItemProjectFile->GetFilePath( outPath);

	return ok;
}


bool VProject::GetUserCacheFolderPath( XBOX::VFilePath& outPath) const
{
	bool ok = false;
	
	if (fSolution != NULL)
	{
		ok = fSolution->GetUserCacheFolderPath( outPath);
		if (ok)
		{
			VString projectName;
			ok = GetName( projectName);
			if (ok)
			{
				outPath.ToSubFolder( L"Projects").ToSubFolder( projectName);
			}
		}
	}
	else
	{
		VString name;
		ok = GetName( name);
		if (ok)
		{
			VFolder *tempFolder = VProcess::Get()->RetainProductSystemFolder( eFK_UserCache, true);
			if (tempFolder != NULL)
			{
				VString projectFolder( name);
				projectFolder.AppendUniChar( L'-').AppendULong8( VProcess::Get()->GetSystemID());

				tempFolder->GetPath( outPath);
				outPath.ToSubFolder( projectFolder);

				tempFolder->Release();
			}
			else
			{
				ok = false;
			}
		}
	}

	return ok;
}


bool VProject::ResolvePosixPathMacros( XBOX::VString& ioPosixPath) const
{
	bool ok = true;

	if (ioPosixPath.BeginsWith( L"$(projectUserCacheDir)"))
	{
		VFilePath cacheFolderPath;
		ok = GetUserCacheFolderPath( cacheFolderPath);
		if (ok)
		{
			VString value( cacheFolderPath.GetPath());
			VURL::Convert( value, eURL_NATIVE_STYLE, eURL_POSIX_STYLE, false);
			ioPosixPath.Replace( value, 1, VString( L"$(projectUserCacheDir)").GetLength());
		}
	}
	else if (ioPosixPath.BeginsWith( L"$(projectDir)"))
	{
		VFilePath projectFolderPath;
		ok = GetProjectFolderPath( projectFolderPath);
		if (ok)
		{
			VString value( projectFolderPath.GetPath());
			VURL::Convert( value, eURL_NATIVE_STYLE, eURL_POSIX_STYLE, false);
			ioPosixPath.Replace( value, 1, VString( L"$(projectDir)").GetLength());
		}
	}

	if (ok)
	{
		VString projectName;
		ok = GetName( projectName);
		if (ok)
		{
			ioPosixPath.ExchangeAll( L"$(projectName)", projectName);
		}
	}

	if (ok && (fSolution != NULL))
	{
		ok = fSolution->ResolvePosixPathMacros( ioPosixPath);
	}

	return ok;
}


XBOX::VError VProject::Rename( const XBOX::VString& inNewName)
{
	VError err = VE_OK;

	VString name;
	if (GetName( name) && (name != inNewName))
	{
		UnregisterProjectItemFromMapOfFullPathes( fProjectItemProjectFile);

		name = inNewName + L"." + RIAFileKind::kProjectFileExtension;

		err = fProjectItemProjectFile->RenameContent( name);
		if (err == VE_OK)
		{
			fProjectItem->SetDisplayName( inNewName);
			fProjectItem->Touch();
		}

		RegisterProjectItemInMapOfFullPathes( fProjectItemProjectFile);
	}


	if (err != VE_OK)
		err = VE_SOMA_CANNOT_RENAME_PROJECT;

	return err;
}


void VProject::BuildPathFromRelativePath( XBOX::VFilePath& outFilePath, const XBOX::VString& inRelativePath, XBOX::FilePathStyle inRelativePathStyle) const
{
	outFilePath.Clear();

	if (fProjectItem != NULL)
	{
		VFilePath folderPath;
		fProjectItem->GetFilePath( folderPath);
		folderPath = folderPath.ToFolder();
		outFilePath.FromRelativePath(folderPath, inRelativePath, inRelativePathStyle);
	}	
}


sLONG VProject::BackgroundDeleteFile( VTask *inTask )
{
	// We use a handshake, wink and a nod between the call to remove a project item's
	// file, and the task which actually performs the operation.
	struct temp_struct { ISymbolTable *s;  VString *p; };
	temp_struct *ts = (temp_struct *)inTask->GetKindData();
	VString *itemPath = ts->p;
	ISymbolTable *inSymTable = ts->s->CloneForNewThread();

	// Given the project item, locate its IFile record
	std::vector< Symbols::IFile * > files = inSymTable->RetainFilesByPathAndBaseFolder( VFilePath(*itemPath), eSymbolFileBaseFolderProject );
	if (files.size() == 1) {
		inSymTable->DeleteSymbolsForFile( files.front(), false );
	}
	
	inSymTable->ReleaseFiles(files);
	
	inSymTable->Release();

	return 0;
}


void VProject::LoadCoreFiles( const VFolder &inFolder, const VString &inName, ESymbolFileExecContext inExecContext, IDocumentParserManager::IJob *inJob, const ESymbolFileBaseFolder& inBaseFolder, const bool& inUseNextGen )
{
	IDocumentParserManager* parsingManager = GetSolution()->GetDocumentParserManager();
	if( parsingManager == NULL )
		return;

	// First, we want to load up the order.txt file -- this will tell us the order we want
	// to load the JavaScript files.
	VFolder coreFolder( inFolder, inName );
	
	if( inUseNextGen == false )
	{
		VFile order( coreFolder, CVSTR( "order.txt" ) );
		if (order.Exists() )
		{
			VFileStream stream( &order );
			if (VE_OK == stream.OpenReading()) {
				// Each line in the file tells us the name of what to parse next
				VString fileName;
				while (VE_STREAM_EOF != stream.GetTextLine( fileName, false ))
				{
					VSymbolFileInfos fileInfos(VFile( coreFolder, fileName ).GetPath(), inBaseFolder, inExecContext);
					
					inJob->ScheduleTask(fileInfos);
				}
				stream.CloseReading();
			}
		}
	}
	else
	{
		if( inExecContext == eSymbolFileExecContextServer )
		{
			VSymbolFileInfos fileInfos(VFile( coreFolder, CVSTR("JSServerSide.js") ).GetPath(), inBaseFolder, inExecContext);
			inJob->ScheduleTask(fileInfos);
		}
		else if( inExecContext == eSymbolFileExecContextClient)
		{
			VSymbolFileInfos fileInfos(VFile( coreFolder, CVSTR("JSClientSide.js") ).GetPath(), inBaseFolder, inExecContext);
			inJob->ScheduleTask(fileInfos);
		}
	}
}

void VProject::LoadDefaultSymbols(ISymbolTable* table)
{
	if( table != NULL )
	{
		if( fCoreSymbolsNotLoaded )
		{
			fCoreSymbolsNotLoaded = false;
			
			VFolder *folder = VProcess::Get()->RetainFolder( VProcess::eFS_Resources);
			if (folder == NULL)
				return;
			
			IDocumentParserManager *parsingManager = GetSolution()->GetDocumentParserManager();
			if (!parsingManager)
				return;
			
			VFilePath path;
			folder->GetPath( path );
			folder->Release();
			
			path.ToSubFolder( "JavaScript Support Files" );
			VFolder supportFolder( path );
			
			IDocumentParserManager::IJob *job = parsingManager->CreateJob();
			
			bool useNextGenSymbolTable = table->UseNextGen();
			
			if( useNextGenSymbolTable == false )
				LoadCoreFiles(supportFolder, CVSTR("bothSides"), eSymbolFileExecContextClientServer, job, eSymbolFileBaseFolderStudioJSResources, useNextGenSymbolTable);
			
			LoadCoreFiles(supportFolder, CVSTR("serverSide"), eSymbolFileExecContextServer, job, eSymbolFileBaseFolderStudioJSResources, useNextGenSymbolTable);
			
			LoadCoreFiles(supportFolder, CVSTR("clientSide"), eSymbolFileExecContextClient, job, eSymbolFileBaseFolderStudioJSResources, useNextGenSymbolTable);
			
#if ACTIVATE_SERVER_MODULES_AUTOCOMPLETE_DOC_PARSING
			if( useNextGenSymbolTable == false )
			{
				VString pathStr;
				fSolution->GetBaseFolderPathStr(eSymbolFileBaseFolderServerModules, pathStr);
				
				VFilePath serverPath;
				serverPath.FromFullPath(pathStr);
				if( serverPath.IsValid() )
				{
					// First : parse the server modules folder
					VFolder serverFolder(serverPath.ToParent().GetPath());
					LoadCoreFiles(serverFolder, CVSTR("Modules"), eSymbolFileExecContextServer, job, eSymbolFileBaseFolderServerModules, useNextGenSymbolTable);
					
					// Then : parse all server modules folder children
					serverPath.ToSubFolder("Modules");
					VFolder serverModulesFolder(serverPath.GetPath());
					_LoadFromFolderChildren(serverModulesFolder, job, eSymbolFileBaseFolderServerModules, useNextGenSymbolTable);
				}
			}
#endif
			
			// Now that we've collected all of the default symbols into one batch, we can submit it as an entire job.
			parsingManager->ScheduleTask( this, job, table );
			job->Release();
		}
	}
}

void VProject::LoadKludgeSymbols( ISymbolTable *table )
{
	VFolder *folder = VProcess::Get()->RetainFolder( VProcess::eFS_Resources);
	if (folder == NULL)
		return;

	IDocumentParserManager *parsingManager = GetSolution()->GetDocumentParserManager();
	if (!parsingManager)
		return;

	VFilePath path;
	folder->GetPath( path );

	path.ToSubFolder( "JavaScript Support Files" );
	VFolder supportFolder( path );

	IDocumentParserManager::IJob *job = parsingManager->CreateJob();

	LoadKludgeFile(supportFolder, CVSTR("serverSide"), eSymbolFileExecContextServer, job, eSymbolFileBaseFolderStudioJSResources);
	
	folder->Release();
}

void VProject::LoadKludgeFile( const VFolder &inFolder, const VString &inName, ESymbolFileExecContext inExecContext, IDocumentParserManager::IJob *inJob, const ESymbolFileBaseFolder& inBaseFolder )
{
	IDocumentParserManager *parsingManager = GetSolution()->GetDocumentParserManager();
	if ( NULL != parsingManager )
	{
		VFolder	coreFolder( inFolder, inName );
		VFile	kludgeFile( coreFolder, CVSTR("kludge.js") );
		
			if ( kludgeFile.Exists() )
			{
				VSymbolFileInfos fileInfos(kludgeFile.GetPath(), inBaseFolder, inExecContext);
				parsingManager->ScheduleTask( this, fileInfos, fSymbolTable, IDocumentParserManager::kPriorityAboveNormal );
			}
	}
}

void VProject::ParseProjectItemForEditor( VProjectItem *inItem )
{
	// We've been asked to schedule this item for parsing explicitly for an editor, so we want to 
	// schedule a parsing task for it, but we want to do so at a higher priority level.  This ensures
	// that the editor gets more up to date information quicker, especially if the file is already in the
	// parsing queue.

	IDocumentParserManager *parsingManager = GetSolution()->GetDocumentParserManager();
	if (!parsingManager)
		return;	

	if (inItem && fSymbolTable)
	{
		IEntityModelCatalog *catalog = inItem->GetBehaviour()->GetCatalog();
		if (NULL != catalog)
		{
			parsingManager->ScheduleTask( this, catalog, fSymbolTable, IDocumentParserManager::kPriorityAboveNormal );
		}
		else
		{
			VFilePath path;
			if (inItem->GetFilePath( path ))
			{
				VProjectItem*			webFolderProjectItem = GetProjectItemFromTag(kWebFolderTag);
				ESymbolFileExecContext	execContext = ((inItem == webFolderProjectItem) || inItem->IsChildOf(webFolderProjectItem)) ? eSymbolFileExecContextClient : eSymbolFileExecContextServer;
				VSymbolFileInfos		fileInfos(path, eSymbolFileBaseFolderProject, execContext);
				
				parsingManager->ScheduleTask( this, fileInfos, fSymbolTable, IDocumentParserManager::kPriorityAboveNormal );
			}
		}
	}
}

void VProject::FileSystemEventHandler( const std::vector< VFilePath > &inFilePaths, VFileSystemNotifier::EventKind inKind )
{
	// We've been notified that something has happened within a directory we're watching.  We will
	// look to see whether any of the files are ones we want to parse.  For right now, we will only
	// check JavaScript files -- and we also want to test to see whether one of the files is currently
	// being edited, and if it is, bump the priority up.
	if (inKind == VFileSystemNotifier::kFileModified) 
	{
		// We need the webfolder item to know if new added files will be executed in
		// client or server context
		VProjectItem*	webFolderProjectItem = GetProjectItemFromTag(kWebFolderTag);

		for (std::vector< VFilePath >::const_iterator iter = inFilePaths.begin(); iter != inFilePaths.end(); ++iter) 
		{
			VProjectItem *projectItem = GetProjectItemFromFullPath( iter->GetPath() );
			if (projectItem) 
			{
				if (projectItem->ConformsTo( RIAFileKind::kCatalogFileKind))
				{
					if (GetSolution()->AcceptReloadCatalog())
					{
						// temporary fix to avoid reentrance when ReloadCatalog modifies the catalog file
						GetSolution()->SetAcceptReloadCatalog(false);
						GetSolution()->ReloadCatalog(projectItem);
						GetSolution()->SetAcceptReloadCatalog(true);
					}
				}

				IDocumentParserManager *parsingManager = GetSolution()->GetDocumentParserManager();
				if (parsingManager != NULL && fSymbolTable != NULL)
				{
					if (iter->MatchExtension( RIAFileKind::kJSFileExtension, false ) || (projectItem->ConformsTo( RIAFileKind::kCatalogFileKind)) ) 
					{
						IDocumentParserManager::Priority priority = IDocumentParserManager::kPriorityNormal;
						if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
							priority = fSolution->GetDelegate()->GetDocumentParsingPriority( *iter);

						if( projectItem->ConformsTo( RIAFileKind::kCatalogFileKind) == false )
						{
							ESymbolFileExecContext	execContext = ((projectItem == webFolderProjectItem) || projectItem->IsChildOf(webFolderProjectItem)) ? eSymbolFileExecContextClient : eSymbolFileExecContextServer;
							VSymbolFileInfos		fileInfos(*iter, eSymbolFileBaseFolderProject, execContext);

							parsingManager->ScheduleTask( this, fileInfos, fSymbolTable, priority );
						}
					}
				}
			}
		}

		if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
			fSolution->GetDelegate()->SynchronizeFromSolution();

		if (!inFilePaths.empty())
			GetSolution()->DoProjectItemsChanged( inFilePaths);
	} 
	else 
	{
		// A file was added, renamed, or deleted.  So we want to resynchronize the containing folder with the file
		// system.
		SynchronizeWithFileSystem(GetProjectItem());

		if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
			fSolution->GetDelegate()->SynchronizeFromSolution();

		if ((inKind == VFileSystemNotifier::kFileDeleted) && !inFilePaths.empty())
			GetSolution()->DoProjectItemsDeleted( inFilePaths);
	}
	
	
	// Update catalog's related scripts list
	VProjectItem* catalogItem = GetProjectItemFromTag(kCatalogTag);
	if( catalogItem )
	{
		VCatalog* catalog = catalogItem->GetBehaviour()->GetCatalog();
		if( catalog )
		{
			bool doUpdateCatalogRelatedScriptsList = false;
			for(std::vector<VFilePath>::const_iterator iter = inFilePaths.begin(); iter != inFilePaths.end(); ++iter)
			{
				if( catalog->IsCatalogRelatedScript((*iter)) )
				{
					doUpdateCatalogRelatedScriptsList = true;
					if( inKind == VFileSystemNotifier::kFileDeleted )
						catalog->RemoveFromCatalogRelatedScriptList((*iter));
				}
			}
			
			if( doUpdateCatalogRelatedScriptsList )
				catalog->ParseCatalogAndCreateProjectItems();
		}
	}
}

void VProject::BackgroundParseFiles()
{
	// If we don't have a symbol table, then we want to try to generate a new
	// one.  If that fails, we need to bail out.
	// sc 16/06/2010, do nothing if the symbol table is not opened
	if (fSymbolTable == NULL)
		return;
	
	IDocumentParserManager *parsingManager = GetSolution()->GetDocumentParserManager();
	if (!parsingManager)
		return;

#if VERSIONDEBUG
	VString lName;
	fProjectItem->GetDisplayName( lName);
	lName = "\"" + lName + "\"";
	DebugMsg( L"Start updating symbol table of project " + lName + L"\n");
#endif
		
#if RIA_STUDIO
		
	// Always load the default symbols
	LoadDefaultSymbols( fSymbolTable );
		
	VectorOfProjectItems items;
	_GetProjectItemsByExtension( RIAFileKind::kJSFileExtension, items );
	_GetProjectItemsByExtension( RIAFileKind::kHTMLFileExtension, items );
		
	// Some people have projects with multiple versions of the same file -- they have
	// different information in the files, and the files have different names, but they're
	// actually the "same" file.  For instance: foo.js, foo-debug.js and foo-min.js.  The
	// -debug file is one with debugging information in it, and -min is one that's been run
	// through a minimizer.  If the user has files like this, we only want to parse *one* of
	// the files, or else we'll end up with a bunch of extra symbols that we don't actually
	// want.  However, this leaves us with another issue, which is one of ordering.  We don't
	// know the order that the files will be given to us from the call to GetProjectItemsByExtension!
	// So we have to take that list, see if we can find any "duplicate" files within it, and then
	// decide which file to keep.  It's a lot more convoluted than it should be, but that seems
	// to be the norm for JavaScript anyways.  Oh, and there's another lovely problem -- we can't
	// just skip any files with a -debug or -min in them because it's also possible that the user
	// doesn't have multiple versions of that file.  For instance, they only dragged the -debug
	// version into their project!  So we are going to map hashes to project items.  We will hash
	// the first "part" of the file name (where a part is defined by the dash).  Then, if we find
	// multiple files, we can determine whether the file we've mapped or the conflicting item is a
	// better choice as to what to parse.  So, for instance, say we find foo-min.js first, and then
	// we get a conflict with foo-debug.js.  The debug file is a better choice to parse since it
	// will contain more symbol information.  So we will replace the foo-min.js file with the foo-debug.js
	// file, and continue searching.  According to Alexandre, the preference for files is: debug (1),
	// regular (2), min (3), but that may change in the future.  So when we process an item, we will also
	// map it's name hash to a weight.  This will help us to determine whether to replace the file or not.
	// The higher the weight, the harder it is to replace the file.
	std::map< VString, VProjectItem * > itemList;
	std::map< VString, int > weightList;
		
	for (VectorOfProjectItems::iterator iter = items.begin(); iter != items.end(); ++iter)
	{
		// Ghosted items are ones that have been removed from the project already
		if ((*iter)->IsGhost())	continue;
			
		// Get the project item's file name
		VString pathStr;
		(*iter)->BuildFullPath( pathStr );
			
		// Get just the file name
		VFilePath path( pathStr );
		VString fileName;
		path.GetFileName( fileName, false );
			
		// Now that we have the file name, we want to split it up into parts based on the dash (if there
		// is one in the file name at all).
		VectorOfVString parts;
		fileName.GetSubStrings( (UniChar)'-', parts, true, true );	// we want empty strings and to trim spaces
			
		// We want to strip off the last part of the name if it's -debug or -min.  We can't just rely on the
		// front part as being correct because the user might have a file named foo-bar-debug.js and foo-baz-min.js,
		// in which cases we'd only hash foo and never add symbols for foo-baz-min.js even though it's a distinct
		// file.
		VString lastPart;
		if (parts.size() > 1)
		{
			if (parts.back() == "debug" || parts.back() == "min")
			{
				// We want to trim this part off
				lastPart = parts.back();
				parts.pop_back();
			}
				
			// Now create the new file name
			fileName = "";
			for (int i = 0; i < parts.size(); i++)
			{
				fileName += parts[ i ];
				if (i != parts.size() - 1) fileName += CVSTR( "-" );
			}
		}
		else
		{
			fileName = parts.front();
		}
			
		// The last part of the file is the weight.  If the last part is -min, the weight is 1, if the last
		// part doesn't exist (because there aren't parts!), the weight is 2, if the last part is -debug, the
		// weight is 3.
		enum { kNoPriority, kLowPriority, kMediumPriority, kHighPriority };
		int weight = kNoPriority;
		if (lastPart == "min")			weight = kLowPriority;
		else if (lastPart == "debug" )	weight = kHighPriority;
		else							weight = kMediumPriority;
			
		// Now we want to see if there's already an item in the map with the same hash.  If not, then we
		// can just add this project item.  But if there is, we need to see whether we want to replace or not.
		std::map< VString, VProjectItem * >::iterator listVal = itemList.find( pathStr );
		if (listVal == itemList.end())
		{
			// This is the easy case, we can just add the item to the list
			itemList[ pathStr ] = *iter;
				
			// Also, map the weight of the file
			weightList[ pathStr ] = weight;
		}
		else
		{
			// An item already exists in the list, so let's see whether we want to replace it or not.  We will determine
			// that based on the weight of the hash.
			int existingFileWeight = weightList[ listVal->first ];
			if (weight > existingFileWeight)
			{
				// The weight of the current file beats the weight of the file we had, so replace
				itemList[ pathStr ] = *iter;
				weightList[ pathStr ] = weight;
			}
		}
	}
		
	VProjectItem* webFolderProjectItem = GetProjectItemFromTag(kWebFolderTag);
		
	// Now that we finally have the item list figured out, we can actually generate the symbols for it.
	IDocumentParserManager::IJob *job = parsingManager->CreateJob();
	for (std::map< VString, VProjectItem * >::iterator iter = itemList.begin(); iter != itemList.end(); ++iter)
	{
		bool	belongToWebFolder;
		VString pathStr;
			
		belongToWebFolder = ((iter->second == webFolderProjectItem) || iter->second->IsChildOf(webFolderProjectItem));
		iter->second->BuildFullPath( pathStr );
			
		VFilePath			path( pathStr );
		VSymbolFileInfos	fileInfos(path, eSymbolFileBaseFolderProject, belongToWebFolder ? eSymbolFileExecContextClient : eSymbolFileExecContextServer);
			
		job->ScheduleTask(fileInfos);
	}
		
	parsingManager->ScheduleTask( this, job, fSymbolTable );
	job->Release();
	
	LoadCatalog();
	
	if( fSymbolTable->UseNextGen() == false )
		LoadKludgeSymbols( fSymbolTable );
	
#endif
}

void VProject::LoadCatalog()
{
	IDocumentParserManager *parsingManager = GetSolution()->GetDocumentParserManager();
	if (!parsingManager) 
		return;

	// Ideally, loading entity models would be part of the job itself.  However, that's not easily accomplished
	// because we can't access the VCatalog outside of the main project (it's not an interface that we can use
	// from within the language syntax component).  So we'll just parse all of the entity model stuff once the 
	// job has completed.  The only tricky part is determining whether we need to actually process the catalog
	// file -- it may not have changed, in which case we don't need to regenerate the symbols for it.  Given 
	// the speed at which the symbols are generated, we'll just do it every time.
	VProjectItem *catalogItem = _GetEntityModelProjectItem();
	if (catalogItem) {
		IEntityModelCatalog *catalog = catalogItem->GetBehaviour()->GetCatalog();
		if (catalog)
			parsingManager->ScheduleTask( this, catalog, fSymbolTable );
	}
}


void VProject::StopBackgroundDeleteFiles()
{
	if (fBackgroundDeleteFileTask) {
		if (fBackgroundDeleteFileTask->GetState() >= TS_RUNNING) {
			fBackgroundDeleteFileTask->Kill();
			fBackgroundDeleteFileTask->StopMessaging();
		}
		fBackgroundDeleteFileTask->Release();
		fBackgroundDeleteFileTask = NULL;
	}
}


void VProject::StopBackgroundParseFiles()
{
#if VERSIONDEBUG
	VString lName;
	fProjectItem->GetDisplayName( lName);
	lName = "\"" + lName + "\"";
	DebugMsg( L"Stop updating symbol table of project " + lName + L"\n");
#endif

	IDocumentParserManager *parsingManager = GetSolution()->GetDocumentParserManager();
	if (!parsingManager) 
		return;

	parsingManager->UnscheduleTasksForHandler( this );

	fIsUpdatingSymbolTable = false;
}


void VProject::RemoveProjectItemFromSymbolTable(VProjectItem *inProjectItem)
{
	if (!fSymbolTable)	return;
	if (!inProjectItem)	return;

	// We use a handshake, wink and a nod between the call to remove a project item's
	// file, and the task which actually performs the operation.
	struct temp_struct { ISymbolTable *s;  VString *p; };
	static temp_struct ts;	// We make it static so that it persists
	static VString itemFullPath;

	if ( inProjectItem->BuildFullPath(itemFullPath) )
	{
		ts.s = fSymbolTable;
		ts.p = &itemFullPath;

		// I don't believe this is quite the correct operation.  What we really want to
		// do is queue up another file to be removed instead of bailing out partially
		// through the existing file being removed.  Doing this will leave the database
		// in a state where the file's symbols haven't been entirely removed.
		StopBackgroundDeleteFiles();

		// Start a task that background parses all of the files in the given project
		fBackgroundDeleteFileTask = new VTask( this, 0, eTaskStylePreemptive, &BackgroundDeleteFile );
		fBackgroundDeleteFileTask->SetKindData( (sLONG_PTR)&ts );
		fBackgroundDeleteFileTask->Run();
	}
}

bool _WithSymbolTable()
{
	// In lieu of a preference (since there is no preference support on the server 
	// currently), we're going to check for the presence of a file next to the application
	// called "NoSymbolTable".  If the file is present, we're not going to let anyone get
	// a symbol table to work with.
	bool result = true;

	VFolder* execfold = VFolder::RetainSystemFolder( eFK_Executable, false);
	if (execfold != nil)
	{
		VFile ff(*execfold, L"NoSymbolTable.txt");
		if (ff.Exists())
			result = false;
		execfold->Release();
	}
	return result;
}


VError VProject::OpenSymbolTable()
{
	VError err = VE_OK;

	if ((fSymbolTable == NULL) && _WithSymbolTable())
	{
	#if VERSIONDEBUG
		VString lName;
		fProjectItem->GetDisplayName( lName);
		lName = "\"" + lName + "\"";
		DebugMsg( L"Open symbol table of project " + lName + L"\n");
	#endif

		CLanguageSyntaxComponent *languageEngine = VComponentManager::RetainComponentOfType< CLanguageSyntaxComponent >();
		if (languageEngine)
		{
			fSymbolTable = languageEngine->CreateSymbolTable();
			if (fSymbolTable != NULL)
			{
				// Now that we have the newly-created symbol table, we want to open it up
				// so that it is ready for use
				VFilePath folderPath;
				GetProjectFolderPath( folderPath);
				VString fileName;
				#if RIA_SERVER
					// The server gets a different file name for the symbol table than the studio, so that there
					// can't be any conflicts between the two when the same project is opened at the same time.
					fileName = "ServerSymbolTable.";
				#else
					fileName = "SymbolTable.";
				#endif
				fileName += RIAFileKind::kSymbolFileExtension;
				VFilePath databaseFilePath = folderPath.ToSubFile( fileName );
				VFile databaseFile( databaseFilePath );
				if (!fSymbolTable->OpenSymbolDatabase( databaseFile ))
				{
					ReleaseRefCountable( &fSymbolTable);
				}
				else
				{
					// Init default folder posix path strings
					VString posixPathStr;
					
					fSolution->GetBaseFolderPathStr(eSymbolFileBaseFolderStudioJSResources, posixPathStr);
					fSymbolTable->SetBaseFolderPathStr(eSymbolFileBaseFolderStudioJSResources, posixPathStr, true);
					
					fSolution->GetBaseFolderPathStr(eSymbolFileBaseFolderServerModules, posixPathStr);
					fSymbolTable->SetBaseFolderPathStr(eSymbolFileBaseFolderServerModules, posixPathStr, true);
				}
			}
			languageEngine->Release();
		}

		if (!fSymbolTable) 
		{
			err = VE_UNKNOWN_ERROR;

			if (GetSolution()->GetSolutionMessageManager() != NULL)
			{
				VString localizedMessage;
				GetSolution()->GetSolutionMessageManager()->GetLocalizedStringFromResourceName(kSOMA_COULD_NOT_OPEN_THE_SYMBOL_DATABASE, localizedMessage);
				GetSolution()->GetSolutionMessageManager()->DisplayMessage(localizedMessage);
			}
		}
	}

	return err;
}


void VProject::CloseSymbolTable()
{
#if VERSIONDEBUG
	VString lName;
	fProjectItem->GetDisplayName( lName);
	lName = "\"" + lName + "\"";
	DebugMsg( L"Close symbol table of project " + lName + L"\n");
#endif

	ReleaseRefCountable( &fSymbolTable);
}


ISymbolTable *VProject::GetSymbolTable()
{
	return fSymbolTable;
}


VSolution* VProject::GetSolution()
{
	if ((fSolution == NULL) && (fProjectItem->GetParent() != NULL))
		fSolution = fProjectItem->GetParent()->GetBehaviour()->GetSolution();

	return fSolution;
}

VError VProject::Load( bool inOpenSymbolsTable)
{
	VError err = VE_OK;

	VFilePath folderPath;
	fProjectItem->GetURL().GetFilePath(folderPath);
	VFolder folder = VFolder(folderPath);

#if VERSIONDEBUG
	VString lName;
	fProjectItem->GetDisplayName( lName);
	lName = "\"" + lName + "\"";
	DebugMsg( L"Load project " + lName + L"\n");
#endif

		if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
			fSolution->GetDelegate()->DoStartPossibleLongTimeOperation();

		if ( err == VE_OK && fSolution != NULL )
		{
			VFilePath projectFolderPath;
			GetProjectFolderPath( projectFolderPath );
			fSolution->FillWidgetsAndThemesFolder( projectFolderPath );
		}

		SynchronizeWithFileSystem( fProjectItem );

		if (fProjectItemProjectFile == NULL)
		{
			xbox_assert(false);

			VString projectName;
			fProjectItem->GetDisplayName( projectName);
			
			VFilePath projectFilePath( folderPath);
			projectFilePath.SetFileName( projectName, false);
			projectFilePath.SetExtension( RIAFileKind::kProjectFileExtension);
			
			VProjectItem* projectItemProjectFile = fProjectItem->NewChild( VURL(projectFilePath), VProjectItem::eFILE);
			if (projectItemProjectFile->ContentExists())
			{
				projectItemProjectFile->Release();
				VString fullPath;
				projectFilePath.GetPath( fullPath);
				projectItemProjectFile = GetProjectItemFromFullPath( fullPath);
				if (projectItemProjectFile != NULL)
					SetProjectItemProjectFile(projectItemProjectFile);
				else
					err = VE_UNKNOWN_ERROR;
			}
			else
			{
				if (projectItemProjectFile->CreatePhysicalItem())
				{
					// enregistrer le projectItem dans la map des pathes du projet
					RegisterProjectItemInMapOfFullPathes(projectItemProjectFile);
					SetProjectItemProjectFile(projectItemProjectFile);
				}
				else
				{
					projectItemProjectFile->Release();
					err = VE_UNKNOWN_ERROR;
				}
			}
		}

		if (err == VE_OK)
		{
			err = _LoadProjectFile();
		}

#if WITH_WIDGETS_AND_THEMES_IN_PROJECT
		if ( err == VE_OK )
		{
			{
				VFilePath path;
				GetProjectFolderPath( path );
				path.ToSubFolder( "Widgets" );
				VProjectItem* item = GetProjectItemFromFilePath( path );
				if ( item )
					TagItemAs( item, kWidgetsFolderTag );
			}
			{
				VFilePath path;
				GetProjectFolderPath( path );
				path.ToSubFolder( "Themes" );
				VProjectItem* item = GetProjectItemFromFilePath( path );
				if ( item )
					TagItemAs( item, kThemesFolderTag );
			}
		}
#endif
		
		if ((err == VE_OK) && inOpenSymbolsTable)
		{
			err = OpenSymbolTable();
		}


		if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
			fSolution->GetDelegate()->DoEndPossibleLongTimeOperation();

	return err;
}


VError VProject::Unload()
{
#if VERSIONDEBUG
	VString lName;
	fProjectItem->GetDisplayName( lName);
	lName = "\"" + lName + "\"";
	DebugMsg( L"Unload project " + lName + L"\n");
#endif

	xbox_assert(!fIsWatchingFileSystem);
	xbox_assert(!fIsUpdatingSymbolTable);

	StopBackgroundDeleteFiles();

	CloseSymbolTable();

	return VE_OK;
}


VError VProject::DoProjectWillClose()
{
	VError err = VE_OK;

	if (fProjectFileDirtyStamp > 0)
	{
		if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
		{
			e_Save_Action saveAction = fSolution->GetDelegate()->DoActionRequireProjectFileSaving( fProjectItemProjectFile, ePA_BeforeClosing, true);

			if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
			{
				if (saveAction == e_SAVE)
					err = _SaveProjectFile();
			}
			else
			{
				err = VE_USER_ABORT;
			}
		}
	}

	return err;
}


VError VProject::Close()
{
	return VE_OK;
}


VError VProject::StartWatchingFileSystem()
{
	VFilePath path;
	if (!GetProjectFolderPath( path))
		return VE_UNKNOWN_ERROR;

	VFolder folder( path);

#if VERSIONDEBUG
	VString lName;
	fProjectItem->GetDisplayName( lName);
	lName = "\"" + lName + "\"";
	DebugMsg( L"Start watching file system for project " + lName + L"\n");
#endif

	fIsWatchingFileSystem = true;

	return VFileSystemNotifier::Instance()->StartWatchingForChanges( folder, VFileSystemNotifier::kAll, this, 100 );
}


VError VProject::StopWatchingFileSystem()
{
	VFilePath path;
	if (!GetProjectFolderPath( path))
		return VE_UNKNOWN_ERROR;

	VFolder folder( path);

#if VERSIONDEBUG
	VString lName;
	fProjectItem->GetDisplayName( lName);
	lName = "\"" + lName + "\"";
	DebugMsg( L"Stop watching file system for project " + lName + L"\n");
#endif

	fIsWatchingFileSystem = false;

	return VFileSystemNotifier::Instance()->StopWatchingForChanges( folder, this );
}


VError VProject::ReloadCatalogs()
{
	VError err = VE_OK;

	VectorOfProjectItems projectItemsVector;
	fProjectItem->GetProjectItemsVector(VProjectItem::eCATALOG_FILE, projectItemsVector, false);

	for (VectorOfProjectItemsIterator i = projectItemsVector.begin(); 
		i != projectItemsVector.end(); ++i)
	{
		err = GetSolution()->ReloadCatalog( *i);
	}
			
	return err;
}


VError VProject::SynchronizeWithFileSystem( VProjectItem *inItem)
{
	VError err = VE_OK;

	if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
		fSolution->GetDelegate()->DoStartPossibleLongTimeOperation();

	VProjectFileStampSaver stampSaver(this);
	
	err = _SynchronizeWithFileSystem( inItem);

	// Reprocess the files in the project so that the symbol table stays in sync.
	BackgroundParseFiles();

	if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
		fSolution->GetDelegate()->DoEndPossibleLongTimeOperation();

	if ((err == VE_OK) && stampSaver.StampHasBeenChanged())
	{
		e_Save_Action saveAction = e_SAVE;

		if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
			saveAction = fSolution->GetDelegate()->DoActionRequireProjectFileSaving( fProjectItemProjectFile, ePA_SynchronizeWithFileSystem, false);

		if (saveAction == e_SAVE)		
			_SaveProjectFile();
	}

	return err;
}


void VProject::RegisterProjectItemAndChildrenInMapOfFullPathes(VProjectItem* inProjectItem, bool inRegisterChildren)
{
	if (inRegisterChildren)
	{
		for (VProjectItemIterator it(inProjectItem); it.IsValid(); ++it)
		{
			RegisterProjectItemAndChildrenInMapOfFullPathes(it, true);
		}
	}
	RegisterProjectItemInMapOfFullPathes(inProjectItem);
}

void VProject::RegisterProjectItemInMapOfFullPathes(VProjectItem* inProjectItem)
{
	if (inProjectItem->HasFilePath())
	{
		VFilePath filePath;
		inProjectItem->GetFilePath(filePath);
		VString strProjectItemFullPath = filePath.GetPath();
		if (!strProjectItemFullPath.IsEmpty())
		{
		#if VERSION_LINUX
			// sc & jmo 07/07/2011, WAK0072129
			PathBuffer tmpBuf;
			VError verr = tmpBuf.Init( strProjectItemFullPath, PathBuffer::withRealPath);
			verr = tmpBuf.ToPath( &strProjectItemFullPath);
		#endif

			fMapFullPathProjectItem[strProjectItemFullPath] = inProjectItem;
		}
		else
		{
			assert(false);
		}
	}
}

void VProject::UnregisterProjectItemAndChildrenFromMapOfFullPathes(VProjectItem* inProjectItem, bool inRegisterChildren)
{
	if (inRegisterChildren)
	{
		for (VProjectItemIterator it(inProjectItem); it.IsValid(); ++it)
		{
			UnregisterProjectItemAndChildrenFromMapOfFullPathes(it, true);
		}
	}

	UnregisterProjectItemFromMapOfFullPathes(inProjectItem);
}

void VProject::UnregisterProjectItemFromMapOfFullPathes(VProjectItem* inProjectItem)
{
	if (inProjectItem->HasFilePath())
	{
		VFilePath filePath;
		inProjectItem->GetFilePath(filePath);
		VString strProjectItemFullPath = filePath.GetPath();
		if (!strProjectItemFullPath.IsEmpty())
		{
			VProjectItem* projectItem = GetProjectItemFromFullPath(strProjectItemFullPath);
			if (projectItem)
			{
#if RIA_STUDIO
				RemoveProjectItemFromSymbolTable( projectItem );
#endif
				fMapFullPathProjectItem.erase(strProjectItemFullPath);
			}
		}
		else
			assert(false);
	}
}


VProjectItem* VProject::GetProjectItemFromFilePath( const XBOX::VFilePath& inPath) const
{
	return GetProjectItemFromFullPath( inPath.GetPath());
}


VProjectItem* VProject::GetProjectItemFromFullPath( const VString& inFullPath) const
{
	VString fullPath( inFullPath);

#if VERSION_LINUX
	// sc & jmo 07/07/2011, WAK0072129
	PathBuffer tmpBuf;
	VError verr = tmpBuf.Init( fullPath, PathBuffer::withRealPath);
	verr = tmpBuf.ToPath( &fullPath);
#endif

	MapFullPathProjectItem::const_iterator i = fMapFullPathProjectItem.find(fullPath);

	return (i == fMapFullPathProjectItem.end()) ? NULL : i->second;
}


VProjectSettings* VProject::RetainSettings( XBOX::VError& outError) const
{
	outError = VE_OK;
	
	VProjectSettings *settings = new VProjectSettings();

	if (settings != NULL)
	{
		VectorOfProjectItems itemsVector;

		GetProjectItemsFromTag( kSettingTag, itemsVector);
		for (VectorOfProjectItemsIterator iter = itemsVector.begin() ; iter != itemsVector.end() && outError == VE_OK ; ++iter)
		{
			if (*iter != NULL)
			{
				VFilePath path;
				(*iter)->GetFilePath( path);
				outError = settings->AppendAndLoadSettingsFile( path);
			}
		}
	}
	else
	{
		outError = VE_MEMORY_FULL;
	}

	return settings;
}


void VProject::TagItemAs( VProjectItem *inProjectItem, const VProjectItemTag& inTag)
{
	if (testAssert(VProjectItemTagManager::Get()->IsRegisteredProjectItemTag( inTag)))
	{
		if (inProjectItem != NULL && !inProjectItem->HasTag( inTag))
		{
			e_Save_Action saveAction = e_SAVE;

			if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
				saveAction = fSolution->GetDelegate()->DoActionRequireProjectFileSaving( fProjectItemProjectFile, ePA_TagItem, true);

			if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
			{
				VProjectFileStampSaver stampSaver(this);

				VectorOfProjectItems changedItems;

				EProjectItemTagProperties projectItemTagProperties = VProjectItemTagManager::Get()->GetProperties( inTag);
				bool singleProjectItem = ((projectItemTagProperties & ePITP_ApplyToSingleFile) != 0) || ((projectItemTagProperties & ePITP_ApplyToSingleFolder) != 0);

				if (singleProjectItem)
				{
					for (VectorOfProjectItems::iterator iter = fReferencedItems.begin() ; iter != fReferencedItems.end() ; ++iter)
					{
						VProjectItem *item = *iter;
						if (singleProjectItem && item->HasTag( inTag))
						{
							item->RemoveTag( inTag);
							changedItems.push_back( item);
						}
					}

					for (VectorOfProjectItems::iterator iter = changedItems.begin() ; iter != changedItems.end() ; ++iter)
					{
						if (!(*iter)->IsTagged() && !(*iter)->IsExternalReference())
						{
							_UnreferenceItem( *iter, true);
							(*iter)->Touch();
						}
					}
				}

				inProjectItem->AddTag( inTag);
				_ReferenceItem( inProjectItem, true);
				inProjectItem->Touch();
				changedItems.push_back( inProjectItem);

				if ((saveAction == e_SAVE) && stampSaver.StampHasBeenChanged()) 
					_SaveProjectFile();
			}
		}
	}
}


void VProject::RemoveTagFromItem( VProjectItem *inProjectItem, const VProjectItemTag& inTag)
{
	if (testAssert(VProjectItemTagManager::Get()->IsRegisteredProjectItemTag( inTag)))
	{
		if (inProjectItem != NULL && inProjectItem->HasTag( inTag))
		{
			e_Save_Action saveAction = e_SAVE;

			if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
				saveAction = fSolution->GetDelegate()->DoActionRequireProjectFileSaving( fProjectItemProjectFile, ePA_UntagItem, true);

			if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
			{
				VProjectFileStampSaver stampSaver(this);

				inProjectItem->RemoveTag( inTag);

				if (!inProjectItem->IsTagged() && !inProjectItem->IsExternalReference())
				{
					_UnreferenceItem( inProjectItem, true);
					inProjectItem->Touch();
				}

				if ((saveAction == e_SAVE) && stampSaver.StampHasBeenChanged())
					_SaveProjectFile();
			}
		}
	}
}


void VProject::RemoveAllTagsFromItem( VProjectItem *inProjectItem)
{
	if (inProjectItem != NULL && inProjectItem->IsTagged())
	{
		e_Save_Action saveAction = e_SAVE;

		if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
			saveAction = fSolution->GetDelegate()->DoActionRequireProjectFileSaving( fProjectItemProjectFile, ePA_UntagItem, true);

		if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
		{
			VProjectFileStampSaver stampSaver(this);

			inProjectItem->RemoveAllTags();

			if (!inProjectItem->IsExternalReference())
			{
				_UnreferenceItem( inProjectItem, true);
				inProjectItem->Touch();
			}

			if ((saveAction == e_SAVE) && stampSaver.StampHasBeenChanged())
				_SaveProjectFile();
		}
	}
}


void VProject::GetCompatibleTags( const VProjectItem* inProjectItem, std::vector<VProjectItemTag>& outTags) const
{
	outTags.clear();

	if (inProjectItem != NULL)
	{
		VFile *file = NULL;

		std::vector<VProjectItemTag> tags;
		VProjectItemTagManager::Get()->GetProjectItemTagCollection( tags);
		for (std::vector<VProjectItemTag>::iterator iter = tags.begin() ; iter != tags.end() ; ++iter)
		{
			EProjectItemTagProperties projectItemTagProperties = VProjectItemTagManager::Get()->GetProperties( *iter);
			bool applyToFiles = ((projectItemTagProperties & ePITP_ApplyToSingleFile) != 0) || ((projectItemTagProperties & ePITP_ApplyToMultipleFiles) != 0);
			bool applyToFolders = ((projectItemTagProperties & ePITP_ApplyToSingleFolder) != 0) || ((projectItemTagProperties & ePITP_ApplyToMultipleFolders) != 0);
			
			if (applyToFolders && inProjectItem->GetKind() == VProjectItem::eFOLDER && !inProjectItem->IsExternalReference())
			{
				// sc 19/02/2013 WAK0079681, exclude page folder
				if (!inProjectItem->ConformsTo( RIAFileKind::kPageFolderFileKind))
					outTags.push_back( *iter);
			}
			else if (applyToFiles && inProjectItem->IsPhysicalFile() && !inProjectItem->IsExternalReference())
			{
				VFileKind *fileKind = VProjectItemTagManager::Get()->RetainDefaultFileKind( *iter);
				if (fileKind != NULL)
				{
					if (file == NULL)
					{
						VFilePath path;
						inProjectItem->GetFilePath( path);
						file = new VFile( path);
					}

					if (file != NULL)
					{
						if (file->ConformsTo( *fileKind))
						{
							outTags.push_back( *iter);
						}
					}
				}
				ReleaseRefCountable( &fileKind);
			}
		}
		ReleaseRefCountable( &file);
	}
}


void VProject::GetProjectItemsFromTag( const VProjectItemTag& inTag, VectorOfProjectItems& outProjectItems) const
{
	outProjectItems.clear();

	if (!VProjectItemTagManager::Get()->IsRegisteredProjectItemTag( inTag))
		return;

	bool done = false;

	EProjectItemTagProperties projectItemTagProperties = VProjectItemTagManager::Get()->GetProperties( inTag);
	bool singleProjectItem = ((projectItemTagProperties & ePITP_ApplyToSingleFile) != 0) || ((projectItemTagProperties & ePITP_ApplyToSingleFolder) != 0);
	bool applyToFiles = ((projectItemTagProperties & ePITP_ApplyToSingleFile) != 0) || ((projectItemTagProperties & ePITP_ApplyToMultipleFiles) != 0);
	bool applyToFolders = ((projectItemTagProperties & ePITP_ApplyToSingleFolder) != 0) || ((projectItemTagProperties & ePITP_ApplyToMultipleFolders) != 0);
	bool applyToFolderContent = (projectItemTagProperties & ePITP_ApplyToFolderContent) != 0;
	VectorOfProjectItems defaultFolders;

	// First, search through the referenced items.
	for (VectorOfProjectItemsConstIterator iter = fReferencedItems.begin() ; iter != fReferencedItems.end() && !done ; ++iter)
	{
		VProjectItem *item = *iter;
		if (item->HasTag( inTag))
		{
			if (item->IsPhysicalFile())
			{
				if (std::find( outProjectItems.begin(), outProjectItems.end(), item) == outProjectItems.end())
				{
					outProjectItems.push_back( item);
					if (singleProjectItem)
						done = true;
				}
			}
			else if(item->IsPhysicalFolder())
			{
				if (applyToFolderContent)
				{
					if (std::find( outProjectItems.begin(), outProjectItems.end(), item) == outProjectItems.end())
						defaultFolders.push_back( item);
				}
				else
				{
					if (std::find( outProjectItems.begin(), outProjectItems.end(), item) == outProjectItems.end())
					{
						outProjectItems.push_back( item);
						if (singleProjectItem)
							done = true;
					}
				}
			}
		}
	}

	if (!done && inTag == kWebFolderTag)
	{
		// compatibility note: before be a tagged item, the web folder was defined in the web app service settings
		VError err = VE_OK;

		VProjectSettings *settings = RetainSettings( err );
		if (err == VE_OK && settings != NULL)
		{
			VValueBag *webAppSettings = settings->RetainSettings( RIASettingID::webApp);
			if (webAppSettings != NULL)
			{
				VFilePath projectFolderPath;
				GetProjectFolderPath( projectFolderPath);

				VString webFolder = RIASettingsKeys::WebApp::documentRoot.Get( webAppSettings);
				if (!webFolder.IsEmpty() && webFolder[webFolder.GetLength() - 1] != CHAR_SOLIDUS)
					webFolder += CHAR_SOLIDUS;

				VFilePath path( projectFolderPath, webFolder, FPS_POSIX);
				VProjectItem *item = GetProjectItemFromFullPath( path.GetPath());
				if (item != NULL)
				{
					outProjectItems.push_back( item);
					done = true;
				}
			}
			ReleaseRefCountable( &webAppSettings);
		}
		ReleaseRefCountable( &settings);
	}

	if (!done)
	{
		// Search into default folders: default folders are defined by a posix path relative to the project folder
		VectorOfVString defaultFoldersPaths;
		if (VProjectItemTagManager::Get()->GetDefaultFolders( inTag, defaultFoldersPaths))
		{
			// Build the list of default folders
			for (VectorOfVString::iterator iter = defaultFoldersPaths.begin() ; iter != defaultFoldersPaths.end() && !done ; ++iter)
			{
				VString strDefaultFolderRelativePath( *iter), strDefaultFolderFullPath;
				VFilePath defaultFolderFilePath;

				if (!strDefaultFolderRelativePath.IsEmpty() && (strDefaultFolderRelativePath[strDefaultFolderRelativePath.GetLength()-1] != POSIX_FOLDER_SEPARATOR))
					strDefaultFolderRelativePath += POSIX_FOLDER_SEPARATOR;

				BuildPathFromRelativePath( defaultFolderFilePath, strDefaultFolderRelativePath, FPS_POSIX);
				defaultFolderFilePath.GetPath( strDefaultFolderFullPath);
				VProjectItem *projectItem = GetProjectItemFromFullPath( strDefaultFolderFullPath);
				if (projectItem != NULL)
				{
					defaultFolders.push_back( projectItem);
				}
			}

			VFileKind *fileKind = VProjectItemTagManager::Get()->RetainDefaultFileKind( inTag);

			for (VectorOfProjectItemsIterator iter = defaultFolders.begin() ; iter != defaultFolders.end() && !done ; ++iter)
			{
				if (applyToFolderContent)
				{
					for (VProjectItemIterator itemsIter( *iter) ; itemsIter.IsValid() && !done ; ++itemsIter)
					{
						if (itemsIter->IsPhysicalFile())
						{
							if (applyToFiles && (fileKind != NULL))
							{
								VFilePath path;
								if (itemsIter->GetFilePath( path))
								{
									VFile file (path);
									if (file.ConformsTo( *fileKind))
									{
										if (std::find( outProjectItems.begin(), outProjectItems.end(), (VProjectItem*) itemsIter) == outProjectItems.end())
										{
											outProjectItems.push_back( itemsIter);
											if (singleProjectItem)
												done = true;
										}
									}
								}
							}
						}
						else if (itemsIter->IsPhysicalFolder())
						{
							if (applyToFolders)
							{
								if (std::find( outProjectItems.begin(), outProjectItems.end(), (VProjectItem*) itemsIter) == outProjectItems.end())
								{
									outProjectItems.push_back( itemsIter);
									if (singleProjectItem)
										done = true;
								}
							}
						}
					}
				}
				else if (applyToFolders)
				{
					if (std::find( outProjectItems.begin(), outProjectItems.end(), *iter) == outProjectItems.end())
					{
						outProjectItems.push_back( *iter);
						if (singleProjectItem)
							done = true;
					}
				}
			}

			ReleaseRefCountable( &fileKind);
		}
	}

	if (!done)
	{
		// Search for default files: default files are defined by a posix path relative to the project folder
		VectorOfVString defaultFiles;
		if (VProjectItemTagManager::Get()->GetDefaultFiles( inTag, defaultFiles))
		{
			for (VectorOfVString::iterator iter = defaultFiles.begin() ; iter != defaultFiles.end() && !done ; ++iter)
			{
				VFilePath defaultFilePath;

				VString strDefaultFileRelativePath( *iter);
				BuildPathFromRelativePath( defaultFilePath, strDefaultFileRelativePath, FPS_POSIX);

				VString  strDefaultFileFullPath;
				defaultFilePath.GetPath( strDefaultFileFullPath);
				VProjectItem *projectItem = GetProjectItemFromFullPath( strDefaultFileFullPath);
				if (projectItem != NULL)
				{
					if (std::find( outProjectItems.begin(), outProjectItems.end(), projectItem) == outProjectItems.end())
					{
						outProjectItems.push_back( projectItem);
						if (singleProjectItem)
							done = true;
					}
				}
			}
		}
	}
}


VProjectItem* VProject::GetProjectItemFromTag( const VProjectItemTag& inTag) const
{
	VectorOfProjectItems itemsVector;
	GetProjectItemsFromTag( inTag, itemsVector);
	return (!itemsVector.empty()) ? itemsVector[0] : NULL;
}


VProjectItem* VProject::GetMainPage()
{
	VProjectItem *mainPage = NULL;
	VError err = VE_OK;

	VProjectSettings *settings = RetainSettings( err);

	if (err == VE_OK && settings != NULL)
	{
		VProjectItem *webFolder = GetProjectItemFromTag( kWebFolderTag);
		if (webFolder != NULL)
		{
			VFilePath path, webFolderPath;

			webFolder->GetFilePath( webFolderPath );

			path = webFolderPath;
			path.ToSubFolder( "index.waPage" );
			VFolder folder( path );

			if ( ! folder.Exists() )
			{
				path = webFolderPath;
				path.ToSubFile( "index.html" );
			}

			mainPage = GetProjectItemFromFullPath( path.GetPath() );
		}
	}
	
	ReleaseRefCountable( &settings);
	
	return mainPage;
}


XBOX::VError VProject::GetPublicationSettings( XBOX::VString& outHostName, XBOX::VString& outIP, sLONG& outPort, bool& outAllowSSL, bool& outMandatorySSL, bool& outAllowHTTPOnLocal, sLONG& outSSLPort) const
{
	VError vError = VE_OK;
	VProjectSettings *settings = RetainSettings( vError );

	outHostName.Clear();
	outIP.Clear();
	outPort = -1;
	
	if (vError == VE_OK && settings != NULL)
	{
		if (!settings->HasProjectSettings())
		{
			vError = VE_RIA_CANNOT_LOAD_PROJECT_SETTINGS;
		}
		else
		{
			settings->GetHostName( outHostName);
			settings->GetListeningAddress( outIP);
		}
	}

	if ( vError == VE_OK )
	{
		if (!settings->HasHTTPServerSettings())
		{
			vError = VE_RIA_CANNOT_LOAD_HTTP_SETTINGS;
		}
		else
		{
			outAllowSSL = settings->GetAllowSSL();
			outPort = settings->GetListeningPort();
			outSSLPort = settings->GetListeningSSLPort();
			outMandatorySSL = settings->GetSSLMandatory();
			outAllowHTTPOnLocal = settings->GetAllowHTTPOnLocal();
		}
	}

	ReleaseRefCountable( &settings);

	return vError;
}


VProjectItem* VProject::ReferenceExternalFolder( XBOX::VError& outError, VProjectItem *inParentItem, const XBOX::VURL& inURL)
{
	outError = VE_OK;
	VProjectItem *result = NULL;

	if (inParentItem != NULL)
	{
		assert(inParentItem->GetProjectOwner() == this);

		if (inParentItem->CheckAnyProjectItemParentIsExternalReference(true))
		{
			outError = VE_SOMA_INCLUSIVE_EXTERNAL_REFERENCE_NOT_AUTHORIZED;
		}
		else
		{
			e_Save_Action saveAction = e_SAVE;

			if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
				saveAction = fSolution->GetDelegate()->DoActionRequireProjectFileSaving( fProjectItemProjectFile, ePA_ReferenceExternalFolder, true);

			if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
			{
				result = inParentItem->NewChild( inURL, VProjectItem::eFOLDER);
				if (result != NULL)
				{
					VProjectFileStampSaver stampSaver(this);

					VFilePath path;
					inURL.GetFilePath( path);
					
					VString itemName;
					path.GetName( itemName);

					result->SetExternalReference( true);
					result->SetName( itemName);
					result->SetDisplayName( itemName);

					_ReferenceItem( result, true);
					RegisterProjectItemInMapOfFullPathes( result);
					
					if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
						fSolution->GetDelegate()->DoStartPossibleLongTimeOperation();

					if (_SynchronizeWithFileSystem( result) == VE_OK)
						BackgroundParseFiles();
					
					if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
						fSolution->GetDelegate()->DoEndPossibleLongTimeOperation();

					if ((saveAction == e_SAVE) && stampSaver.StampHasBeenChanged())
						_SaveProjectFile();
				}
				else
				{
					outError = VE_MEMORY_FULL;
				}
			}
		}
	}
	return result;
}


VProjectItem* VProject::ReferenceExternalFile( XBOX::VError& outError, VProjectItem *inParentItem, const XBOX::VURL& inURL)
{
	outError = VE_OK;
	VProjectItem *result = NULL;

	if (inParentItem != NULL)
	{
		assert(inParentItem->GetProjectOwner() == this);

		if (inParentItem->CheckAnyProjectItemParentIsExternalReference(true))
		{
			outError = VE_SOMA_INCLUSIVE_EXTERNAL_REFERENCE_NOT_AUTHORIZED;
		}
		else
		{
			e_Save_Action saveAction = e_SAVE;

			if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
				saveAction = fSolution->GetDelegate()->DoActionRequireProjectFileSaving( fProjectItemProjectFile, ePA_ReferenceExternalFile, true);

			if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
			{
				result = inParentItem->NewChild( inURL, VProjectItem::eFILE);
				if (result != NULL)
				{
					VProjectFileStampSaver stampSaver(this);

					VFilePath path;
					inURL.GetFilePath( path);
					
					VString itemName;
					path.GetName( itemName);

					result->SetExternalReference( true);
					result->SetName( itemName);
					result->SetDisplayName( itemName);

					_ReferenceItem( result, true);
					RegisterProjectItemInMapOfFullPathes( result);
					
					if ((saveAction == e_SAVE) && stampSaver.StampHasBeenChanged())
						_SaveProjectFile();
				}
				else
				{
					outError = VE_MEMORY_FULL;
				}
			}
		}
	}
	return result;
}


VProjectItem* VProject::CreateFileItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive)
{
	return _CreateFileItemFromPath( outError, inPath, inRecursive, true);
}


VProjectItem* VProject::CreateFolderItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive, bool inSynchronizeWithFileSystem)
{
	return _CreateFolderItemFromPath( outError, inPath, inRecursive, inSynchronizeWithFileSystem, true);
}


XBOX::VError VProject::RemoveItem( VProjectItem *inProjectItem, bool inDeletePhysicalItems)
{
	VectorOfProjectItems items( 1, inProjectItem);
	return RemoveItems( items, inDeletePhysicalItems);
}


XBOX::VError VProject::RemoveItems( const VectorOfProjectItems& inProjectItems, bool inDeletePhysicalItems)
{
	VError err = VE_OK;

	e_Save_Action saveAction = e_SAVE;

	if (inDeletePhysicalItems && (fSolution != NULL) && (fSolution->GetDelegate() != NULL) && _IsVectorContainsReferencedItems( inProjectItems, true))
		saveAction = fSolution->GetDelegate()->DoActionRequireProjectFileSaving( fProjectItemProjectFile, ePA_RemoveItem, true);

	if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
	{
		VProjectFileStampSaver stampSaver(this);

		VProjectItem *firstCommonParent = NULL;
		VectorOfProjectItems items( inProjectItems.begin(), inProjectItems.end());
		
		VProjectItemTools::RemoveUselessItems( items);
		firstCommonParent = VProjectItemTools::GetFirstCommonParent( items);

		for (VectorOfProjectItemsIterator itemIter = items.begin() ; itemIter != items.end() ; ++itemIter)
		{
			if ((*itemIter != fProjectItem) && (*itemIter != fProjectItemProjectFile))
			{
				if ((*itemIter)->IsExternalReference())
				{
					// TBD
					xbox_assert(false);
				}
				else
				{
					// sc 08/11/2012 WAK0078737, to properly remove the item reference, it must be removed here
					_DoItemRemoved( *itemIter, true);

					if (inDeletePhysicalItems)
						(*itemIter)->DeleteContent();

					(*itemIter)->SetGhost(true);
					(*itemIter)->DeleteChildren();
					(*itemIter)->Release();
				}
			}
		}

		if (inDeletePhysicalItems)
		{
			if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
				fSolution->GetDelegate()->DoStartPossibleLongTimeOperation();

			if (_SynchronizeWithFileSystem( firstCommonParent) == VE_OK)
				BackgroundParseFiles();
						
			if ((fSolution != NULL) && (fSolution->GetDelegate() != NULL))
				fSolution->GetDelegate()->DoEndPossibleLongTimeOperation();
		}

		if ((saveAction == e_SAVE) && stampSaver.StampHasBeenChanged())
			_SaveProjectFile();
	}

	return err;
}


XBOX::VError VProject::RenameItem( VProjectItem *inProjectItem, const XBOX::VString& inNewName)
{
	VError err = VE_OK;

	if (inProjectItem != NULL)
	{
		if ((inProjectItem == fProjectItem) || (inProjectItem == fProjectItemProjectFile))
		{
			VString name( inNewName);
			VString extension( L"." + RIAFileKind::kProjectFileExtension);
			if (name.EndsWith( extension))
				name.Truncate( name.GetLength() -  extension.GetLength());

			err = Rename( name);
		}
		else
		{
			VString name;
			inProjectItem->GetName( name);
			if ( ! name.EqualToString( inNewName, true ) )
			{
				e_Save_Action saveAction = e_SAVE;
	
				if (((fSolution != NULL) && (fSolution->GetDelegate() != NULL)) && _IsItemReferenced( inProjectItem))
					saveAction = fSolution->GetDelegate()->DoActionRequireProjectFileSaving( fProjectItemProjectFile, ePA_RenameItem, true);

				if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
				{
					VProjectFileStampSaver stampSaver(this);

					_DoItemRemoved( inProjectItem, true);

					err = inProjectItem->RenameContent( inNewName);
					if (err == VE_OK)
						inProjectItem->Touch();

					_DoItemAdded( inProjectItem, true);

					if ((saveAction == e_SAVE) && stampSaver.StampHasBeenChanged())
						_SaveProjectFile();
				}
			}
		}
	}

	return err;
}


void VProject::_SetProjectItem( VProjectItem* inProjectItem)
{
	if (testAssert(fProjectItem == NULL && inProjectItem != NULL))
	{
		fProjectItem = RetainRefCountable( inProjectItem);

		VProjectItemProject *behaviour = dynamic_cast<VProjectItemProject*>(fProjectItem->GetBehaviour());
		if (testAssert(behaviour != NULL))
			behaviour->SetProject( this);

		RegisterProjectItemInMapOfFullPathes( fProjectItem);
	}
}


void VProject::_SetProjectFileItem( VProjectItem* inProjectItem)
{
	if (testAssert(fProjectItemProjectFile == NULL && inProjectItem != NULL))
	{
		fProjectItemProjectFile = RetainRefCountable( inProjectItem);
		RegisterProjectItemInMapOfFullPathes( fProjectItemProjectFile);

		if (fProjectItem != NULL)
			fProjectItem->AttachChild( fProjectItemProjectFile);
	}
}


VError VProject::_SynchronizeWithFileSystem( VProjectItem *inItem)
{
	VError err = VE_OK;

	// Synchronize the children and check for deleted items
	VectorOfProjectItems deletedItems;

	for (VProjectItemIterator iter(inItem) ; iter.IsValid() && (err == VE_OK) ; ++iter)
	{
		if (iter == fProjectItemProjectFile)
			continue;
		
		if (iter->IsGhost())
			continue;

		if (iter->IsPhysicalLinkValid() && _IsItemReferenced( iter)  && !iter->ContentExists()) // if file is referenced (role is set), just ignore it
		{
			iter->SetPhysicalLinkValid( false);
			iter->Touch();	// sc 08/11/2012 WAK0078737
			continue;
		}

		if (!iter->IsPhysicalLinkValid() && iter->ContentExists())
		{
			iter->SetPhysicalLinkValid( true);	// sc 30/03/2012
			iter->Touch();	// sc 08/11/2012 WAK0078737
		}

		if (!iter->IsPhysicalLinkValid())	// sc 02/04/2012 WAK0076271, WAK0076272, WAK0076273
			continue;

		if (iter->IsPhysicalFileOrFolder())
		{
			if (!iter->ContentExists())
			{
				deletedItems.push_back( iter);
			}
			else
			{
				err = _SynchronizeWithFileSystem( iter);
			}
		}
	}

	VectorOfFilePathes deletedPathes;

	for (VectorOfProjectItemsIterator iter = deletedItems.begin() ; iter != deletedItems.end() ; ++iter)
	{
		VFilePath path;
		
		if ( (*iter)->GetFilePath(path) )
			deletedPathes.push_back( path );

		_DoItemRemoved( *iter, true);
	
		(*iter)->SetGhost(true);
		(*iter)->DeleteChildren();
	}
	
	if ( deletedPathes.size() && fSolution && fSolution->GetDelegate() )
		fSolution->GetDelegate()->DoProjectItemsDeleted( deletedPathes );

	for (VectorOfProjectItemsIterator iter = deletedItems.begin() ; iter != deletedItems.end() ; ++iter)
		(*iter)->Release();

	if (err == VE_OK)
	{
		// Check for new items
		if (inItem->IsPhysicalFolder())
		{
			VFilePath folderPath;
			if (inItem->GetFilePath( folderPath))
			{
				VFolder *folder = new VFolder(folderPath);
				if (folder != NULL)
				{
					for (VFolderIterator folderIter( folder, FI_WANT_FOLDERS | FI_WANT_INVISIBLES); folderIter.IsValid() && (err == VE_OK) ; ++folderIter)
					{
						VString folderName;
						folderIter->GetName( folderName);
						if (folderName == "__MACOSX")
							continue;

						if (folderName == "Internal Files")
							continue;

						// Check whether the child folder exists
						VString relativePath( folderName);
						relativePath += FOLDER_SEPARATOR;
						VProjectItem *folderItem = inItem->FindChildByRelativePath( relativePath, eURL_NATIVE_STYLE);
						if (folderItem == NULL)
						{
							folderItem = inItem->NewChild( VProjectItem::eFOLDER);
							if (folderItem != NULL)
							{
								folderItem->SetName( folderName);
								folderItem->SetDisplayName( folderName);
								folderItem->SetRelativePath( relativePath, eURL_NATIVE_STYLE);

								_DoItemAdded( folderItem, true);

								err = _SynchronizeWithFileSystem( folderItem);
							}
						}
					}

					for (VFileIterator fileIter( folder, FI_WANT_FILES | FI_WANT_INVISIBLES) ; fileIter.IsValid() && (err == VE_OK) ; ++fileIter )
					{
						VString fileName;
						fileIter->GetName( fileName);
						if (fileName == L".DS_Store")
							continue;

						if (	fileIter->ConformsTo( RIAFileKind::kProjectBackupFileKind)
							||	fileIter->ConformsTo( RIAFileKind::kUAGCacheFileKind)
							||	fileIter->ConformsTo( RIAFileKind::kProjectFileKind) )
						{
							continue;
						}
						
						// Check whether the child folder exists
						VString relativePath( fileName);
						VProjectItem *fileItem = inItem->FindChildByRelativePath( relativePath, eURL_NATIVE_STYLE);
						if (fileItem == NULL)
						{
							if (fileIter->ConformsTo( RIAFileKind::kCatalogFileKind) || fileIter->ConformsTo(RIAFileKind::kRemoteCatalogFileKind) )
							{
								VError lErr = VE_OK;
								VCatalog *catalog = VCatalog::Instantiate( lErr, fileName);
								if (lErr == VE_OK && catalog != NULL)
								{
									fileItem = catalog->GetCatalogItem();
									if (testAssert( fileItem != NULL))
									{
										inItem->AttachChild( fileItem);
									}
								}
								else
								{
									ReleaseRefCountable( &catalog);
								}
							}
							else
							{
								fileItem = inItem->NewChild( VProjectItem::eFILE);

							}

							if (fileItem != NULL)
							{
								fileItem->SetDisplayName( fileName);
								fileItem->SetName( fileName);
								fileItem->SetRelativePath( relativePath, eURL_NATIVE_STYLE);

								_DoItemAdded( fileItem, true);
							}
						}
					}
				}
				ReleaseRefCountable( &folder);
			}
		}
	}

	return err;
}


void VProject::_DoItemAdded( VProjectItem *inItem, bool inTouchProjectFile)
{
	// Append the item
	RegisterProjectItemInMapOfFullPathes( inItem);

	if (inItem->IsTagged() && !_IsItemReferenced( inItem))
		_ReferenceItem( inItem, inTouchProjectFile);

	// Append the children
	for (VProjectItemIterator iter(inItem) ; iter.IsValid() ; ++iter)
	{
		_DoItemAdded( iter, inTouchProjectFile);
	}

}


void VProject::_DoItemRemoved( VProjectItem *inItem, bool inTouchProjectFile)
{
	// Remove the children
	for (VProjectItemIterator iter(inItem) ; iter.IsValid() ; ++iter)
	{
		_DoItemRemoved( iter, inTouchProjectFile);
	}

	// Remove the item
	UnregisterProjectItemFromMapOfFullPathes( inItem);
	
	if (_IsItemReferenced( inItem))
		_UnreferenceItem( inItem, inTouchProjectFile);
}


VError VProject::_LoadProjectFile()
{
	VError err = VE_OK;

	if (fProjectItem != NULL && fProjectItemProjectFile != NULL)
	{
		fIsLoadingFromXML = true;

		VFilePath projectFilePath;
		fProjectItemProjectFile->GetFilePath( projectFilePath);
		VFile projectFile( projectFilePath);

		VValueBag bagProject;

		err = LoadBagFromXML( projectFile, fProjectItem->GetXMLElementName(), bagProject, XML_ValidateNever);
		if (err == VE_OK)
		{
			// avant tout, il faut construire l'arbre complet avant de pouvoir ajouter des proprietes aux items
			// ----------------------------------------
			// 1ere boucle : traiter l'ensemble des folders rencontres
			// ----------------------------------------
			std::vector<VProjectItemTag> singleFolderTagsFound;
			VBagArray* bagArrayFolders = bagProject.RetainElements(kXML_ELEMENT_FOLDER);
			for (sLONG i = 1; i <= bagArrayFolders->GetCount(); i++)
			{
				VValueBag *bagFolder = bagArrayFolders->GetNth(i);
				
				// recuperer le path relatif depuis le fichier projet
				VString strFolderRelativePath;
				bagFolder->GetString(ProjectItemBagKeys::path, strFolderRelativePath);
				if (testAssert(!strFolderRelativePath.IsEmpty()))
				{
					strFolderRelativePath.TrimeSpaces();
					if (strFolderRelativePath[strFolderRelativePath.GetLength()-1] != POSIX_FOLDER_SEPARATOR)
						strFolderRelativePath += POSIX_FOLDER_SEPARATOR;

					VFilePath folderPath;
					BuildPathFromRelativePath( folderPath, strFolderRelativePath, FPS_POSIX);
					
					if (testAssert(folderPath.IsValid()))
					{
						VProjectItem *projectItem = GetProjectItemFromFullPath( folderPath.GetPath());

						if (projectItem == NULL)
						{
							// sc 30/03/2012, even if the physical folder doesn't exist, the item must be referenced if needed

							// either the physical folder is outside the project folder or the physical folder doesn't exist
							VFilePath projectFolderPath;
							GetProjectFolderPath( projectFolderPath);
							if (folderPath.IsChildOf( projectFolderPath))
							{
								VError lError = VE_OK;
								projectItem = _CreateFolderItemFromPath( lError, folderPath, true, false, false);
								xbox_assert(lError == VE_OK);
							}
							else
							{
								// TBD: support external reference
								xbox_assert(false);
							}
						}

						if (projectItem != NULL)
						{
							// Read the item tags
							VBagArray *tagArray = bagFolder->RetainElements( kXML_ELEMENT_TAG);
							if (tagArray != NULL)
							{
								for (VIndex pos = 1 ; pos <= tagArray->GetCount() ; ++pos)
								{
									VProjectItemTag tagName = ProjectItemBagKeys::name.Get( tagArray->GetNth( pos));
									if (VProjectItemTagManager::Get()->IsRegisteredProjectItemTag( tagName))
									{
										// Sanity check
										if ((VProjectItemTagManager::Get()->GetProperties( tagName) & ePITP_ApplyToSingleFolder) != 0)
										{
											if (std::find( singleFolderTagsFound.begin(), singleFolderTagsFound.end(), tagName) == singleFolderTagsFound.end())
											{
												singleFolderTagsFound.push_back( tagName);
												projectItem->AddTag( tagName);
											}
										}
										else
										{
											projectItem->AddTag( tagName);
										}
									}
								}
							}
							ReleaseRefCountable( &tagArray);
							
							// Finally, reference the item
							if (projectItem->IsTagged() || projectItem->IsExternalReference())
							{
								_ReferenceItem( projectItem, false);
							}
						}
					}
				}
			}
			ReleaseRefCountable( &bagArrayFolders);

			// -----------------------------------------------------------
			// on traite ensuite l'ensemble des fichiers
			// -----------------------------------------------------------
			std::vector<VProjectItemTag> singleFileTagsFound;
			VBagArray* bagArrayFiles = bagProject.RetainElements(kXML_ELEMENT_FILE);
			for (sLONG i = 1; i <= bagArrayFiles->GetCount(); i++)
			{
				VValueBag* bagFile = bagArrayFiles->GetNth(i);
				// recuperer le path relatif depuis le fichier projet
				VString strFileRelativePath;
				bagFile->GetString(ProjectItemBagKeys::path, strFileRelativePath);
				if (testAssert(!strFileRelativePath.IsEmpty()))
				{
					// en deduire le path complet du fichier
					VFilePath filePath;
					strFileRelativePath.TrimeSpaces();
					BuildPathFromRelativePath( filePath, strFileRelativePath, FPS_POSIX);

					if (testAssert(filePath.IsValid()))
					{
						VProjectItem *projectItem = GetProjectItemFromFullPath( filePath.GetPath());

						if (projectItem == NULL)
						{
							// sc 30/03/2012, even if the physical file doesn't exist, the item must be referenced if needed

							// either the physical file is outside the project folder or the physical file doesn't exist
							VFilePath projectFolderPath;
							GetProjectFolderPath( projectFolderPath);
							if (filePath.IsChildOf( projectFolderPath))
							{
								VError lError = VE_OK;
								projectItem = _CreateFileItemFromPath( lError, filePath, true, false);
								xbox_assert(lError == VE_OK);
							}
							else
							{
								// TBD: support external reference
								xbox_assert(false);
							}
						}

						if (projectItem)
						{
							// Read the item tags
							VBagArray *tagArray = bagFile->RetainElements( kXML_ELEMENT_TAG);
							if (tagArray != NULL)
							{
								for (VIndex pos = 1 ; pos <= tagArray->GetCount() ; ++pos)
								{
									VProjectItemTag tagName = ProjectItemBagKeys::name.Get( tagArray->GetNth( pos));
									if (VProjectItemTagManager::Get()->IsRegisteredProjectItemTag( tagName))
									{
										// Sanity check
										if ((VProjectItemTagManager::Get()->GetProperties( tagName) & ePITP_ApplyToSingleFile) != 0)
										{
											if (std::find( singleFileTagsFound.begin(), singleFileTagsFound.end(), tagName) == singleFileTagsFound.end())
											{
												singleFileTagsFound.push_back( tagName);
												projectItem->AddTag( tagName);
											}
										}
										else
										{
											projectItem->AddTag( tagName);
										}
									}
								}
							}
							ReleaseRefCountable( &tagArray);
							
							// Finally, reference the item
							if (projectItem->IsTagged() || projectItem->IsExternalReference())
							{
								_ReferenceItem( projectItem, false);
							}
						}
					}
				}
			}


			ReleaseRefCountable( &bagArrayFiles);
		}
		else
		{
			err = VE_SOMA_PROJECT_FILE_COULD_NOT_OPENED;
			VErrorBase* errorBase = new VErrorBase(err, 0);
			errorBase->GetBag()->SetString(kSOMA_FILE_FULL_PATH, projectFilePath.GetPath());
			VTask::GetCurrent()->PushRetainedError(errorBase);
		}
		fIsLoadingFromXML = false;
	}


	return err;
}


VError VProject::_SaveProjectFile(bool inForceSave)
{
	VError err = VE_OK;

	if (inForceSave || (GetSolution()->IsAutoSave() && (fProjectFileDirtyStamp > 0)))
	{
		VProjectItem* projectFileProjectItem = GetProjectItemProjectFile();

		if (projectFileProjectItem != NULL)
		{
			// TO DO 030409 if (err == VE_OK)
			{
				VFileDesc *fd = NULL;
				VFilePath projectFilePath;
				projectFileProjectItem->GetFilePath(projectFilePath);
				VFile projectFile(projectFilePath);

				err = projectFile.Open(FA_READ_WRITE, &fd, FO_CreateIfNotFound | FO_Overwrite);
				if (err == VE_OK && fd != NULL)
				{

					VString strXML;
					strXML.FromCString(INTRO_XML_UTF8);
					
					VValueBag* bagProject = new VValueBag();
					if (bagProject != NULL)
					{
						VString strProjectPath;
						fProjectItem->GetURL().GetPath(strProjectPath, eURL_POSIX_STYLE, false);

						// Save referenced items
						for (VectorOfProjectItems::iterator iter = fReferencedItems.begin() ; iter != fReferencedItems.end() && err == VE_OK ; ++iter)
						{
							VProjectItem *item = *iter;
							if (!item->IsGhost())
							{
								VValueBag *itemBag = new VValueBag();
								if (itemBag != NULL)
								{
									// Resolve the relative path;
									VFilePath projectItemFilePath;
									item->GetFilePath( projectItemFilePath);
									VURL projectItemURL( projectItemFilePath);
									
									VString strNetLoc, strProjectItemPath, strRelativeProjectItemPath;
									projectItemURL.GetNetworkLocation( strNetLoc, false);
									projectItemURL.GetPath( strProjectItemPath, eURL_POSIX_STYLE, false);
									if (!strNetLoc.IsEmpty())
										strProjectItemPath = "//" + strNetLoc + "/" + strProjectItemPath;
									GetSolution()->GetPathRelativeToFolderPath( strProjectPath, strProjectItemPath, strRelativeProjectItemPath);

									// Append the relative path
									ProjectItemBagKeys::path.Set( itemBag, strRelativeProjectItemPath);

									// Append the tags
									std::vector<VProjectItemTag> tags;
									item->GetTags( tags);
									if (!tags.empty())
									{
										VBagArray *tagArray = new VBagArray();
										if (tagArray != NULL)
										{
											for (std::vector<VProjectItemTag>::iterator iter = tags.begin() ; iter != tags.end() && err == VE_OK ; ++iter)
											{
												VValueBag *bag = new VValueBag();
												if (bag != NULL)
												{
													ProjectItemBagKeys::name.Set( bag, *iter);
													tagArray->AddTail( bag);
												}
												else
												{
													err = VE_MEMORY_FULL;
												}
												ReleaseRefCountable( &bag);
											}
											itemBag->SetElements( kXML_ELEMENT_TAG, tagArray);
										}
										else
										{
											err = VE_MEMORY_FULL;
										}
										ReleaseRefCountable( &tagArray);
									}

									if (err == VE_OK)
									{
										VString elementName = item->GetXMLElementName();
										if (testAssert( elementName.GetLength() > 0))
										{
											bagProject->AddElement( elementName, itemBag);
										}
									}
								}
								else
								{
									err = VE_MEMORY_FULL;
								}
								ReleaseRefCountable( &itemBag);
							}
						}

						bagProject->DumpXML( strXML, fProjectItem->GetXMLElementName(), true);
					}
					else
					{
						err = VE_MEMORY_FULL;
					}
					ReleaseRefCountable( &bagProject);

					if (err == VE_OK)
					{
						VStringConvertBuffer buffer( strXML, VTC_UTF_8);
						err = fd->SetSize( buffer.GetSize());
						if (err == VE_OK)
						{
							err = fd->PutDataAtPos( buffer.GetCPointer(), buffer.GetSize());
							if (err == VE_OK)
							{
								err = fd->Flush();
							}
						}
					}
					delete fd;
				}
				else
				{
					err = VE_FILE_CANNOT_OPEN;
				}
			}
		}
	}

	if (err != VE_OK)
	{
		if (GetSolution()->GetSolutionMessageManager())
		{
			VString localizedMessage;
			GetSolution()->GetSolutionMessageManager()->GetLocalizedStringFromResourceName(kSOMA_PROJECT_FILE_COULD_NOT_BE_SAVED, localizedMessage);
			localizedMessage += ":\n";
			VFilePath projectVFilePath;
			GetProjectItemProjectFile()->GetFilePath(projectVFilePath);
			VString projectFullPath;
			projectVFilePath.GetPath(projectFullPath);
			localizedMessage += projectFullPath;
			GetSolution()->GetSolutionMessageManager()->DisplayMessage(localizedMessage);
		}
	}
	else
	{
		fProjectFileDirtyStamp = 0;
	}

	return err;
}


void VProject::_TouchProjectFile()
{
	++fProjectFileDirtyStamp;
}


void VProject::_UnreferenceItem( VProjectItem *inItem, bool inTouchProjectFile)
{
	VectorOfProjectItemsIterator found = std::find(  fReferencedItems.begin(), fReferencedItems.end(), inItem);
	if (found != fReferencedItems.end())
	{
		fReferencedItems.erase( found);
		if (inTouchProjectFile)
			_TouchProjectFile();
	}
}


void VProject::_ReferenceItem( VProjectItem *inItem, bool inTouchProjectFile)
{
	if (!_IsItemReferenced( inItem))
	{
		fReferencedItems.push_back( inItem);
		if (inTouchProjectFile)
			_TouchProjectFile();
	}
}


bool VProject::_IsItemReferenced( VProjectItem *inItem) const
{
	return (std::find( fReferencedItems.begin(), fReferencedItems.end(), inItem) != fReferencedItems.end());
}


bool VProject::_IsVectorContainsReferencedItems( const VectorOfProjectItems& inProjectItems, bool inRecursive) const
{
	bool result = false;

	for (VectorOfProjectItemsConstIterator iter = inProjectItems.begin() ; (iter != inProjectItems.end()) && !result ; ++iter)
	{
		result = _IsItemReferenced( *iter);
		if (!result && inRecursive)
		{
			VectorOfProjectItems children;
			VProjectItemTools::GetChildren( *iter, children, false);
			result = _IsVectorContainsReferencedItems( children, true);
		}
	}

	return result;
}


VProjectItem* VProject::_CreateFileItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive, bool inTouchProjectFile)
{
	VProjectItem *result = NULL;

	if (inPath.IsFile())
	{
		VFilePath parentPath, projectFolderPath;
		if (inPath.GetParent( parentPath) && GetProjectFolderPath( projectFolderPath))
		{
			if ((projectFolderPath == parentPath) || parentPath.IsChildOf( projectFolderPath))
			{
				VProjectItem *parentItem = GetProjectItemFromFullPath( parentPath.GetPath());
				if ((parentItem == NULL) && inRecursive)
				{
					parentItem = _CreateFolderItemFromPath( outError, parentPath, true, false, inTouchProjectFile);
				}

				if (parentItem != NULL)
				{
					VFile file(inPath);
					VString fileName;
					inPath.GetFileName( fileName);

					if (file.ConformsTo( RIAFileKind::kCatalogFileKind) || file.ConformsTo(RIAFileKind::kRemoteCatalogFileKind))
					{
						VError lErr = VE_OK;
						VCatalog *catalog = VCatalog::Instantiate( lErr, fileName);
						if (lErr == VE_OK && catalog != NULL)
						{
							result = catalog->GetCatalogItem();
							if (testAssert( result != NULL))
							{
								parentItem->AttachChild( result);
							}
						}
						else
						{
							ReleaseRefCountable( &catalog);
						}
					}
					else
					{
						result = parentItem->NewChild( VProjectItem::eFILE);
					}

					if (result != NULL)
					{

						result->SetName( fileName);
						result->SetDisplayName( fileName);
						result->SetRelativePath( fileName, eURL_NATIVE_STYLE);

						_DoItemAdded( result, inTouchProjectFile);

						if (!result->ContentExists())
							result->SetPhysicalLinkValid( false);
					}
				}
			}
		}
	}
	return result;
}


VProjectItem* VProject::_CreateFolderItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive, bool inSynchronizeWithFileSystem, bool inTouchProjectFile)
{
	VProjectItem *result = NULL;

	if (inPath.IsFolder())
	{
		VFilePath parentPath, projectFolderPath;
		if (inPath.GetParent( parentPath) && GetProjectFolderPath( projectFolderPath))
		{
			if ((projectFolderPath == parentPath) || parentPath.IsChildOf( projectFolderPath))
			{
				VProjectItem *parentItem = GetProjectItemFromFullPath( parentPath.GetPath());
				if ((parentItem == NULL) && inRecursive)
				{
					parentItem = _CreateFolderItemFromPath( outError, parentPath, true, false, inTouchProjectFile);
				}

				if (parentItem != NULL)
				{
					result = parentItem->NewChild( VProjectItem::eFOLDER);
					if (result != NULL)
					{
						VString itemName;
						inPath.GetFolderName( itemName);
						result->SetName( itemName);
						result->SetDisplayName( itemName);
						itemName += FOLDER_SEPARATOR;
						result->SetRelativePath( itemName, eURL_NATIVE_STYLE);

						_DoItemAdded( result, inTouchProjectFile);

						if (!result->ContentExists())
							result->SetPhysicalLinkValid( false);
					}
				}
			}
		}
	}
	return result;
}


VProjectItem *VProject::_GetEntityModelProjectItem( VProjectItem *inCurItemToSearch )
{
	VProjectItem *ret = NULL;
	if (!inCurItemToSearch)	inCurItemToSearch = fProjectItem;

	for (VProjectItemIterator it( inCurItemToSearch ); !ret && it.IsValid(); ++it)
	{
		if (it->ConformsTo( RIAFileKind::kCatalogFileKind))	ret = it;
		if (!ret)	ret = _GetEntityModelProjectItem( it );
	}

	return ret;
}


void VProject::_GetProjectItemsByExtension( const XBOX::VString &inExtension, VectorOfProjectItems &outItems )
{
	_GetProjectItemsByExtension( fProjectItem, inExtension, outItems );
}

void VProject::_GetProjectItemsByExtension( VProjectItem *inProjectItem, const XBOX::VString &inExtension, VectorOfProjectItems &outItems )
{
	VProjectItem* projectItem = NULL;

	for (VProjectItemIterator it(inProjectItem); it.IsValid(); ++it)
	{
		_GetProjectItemsByExtension(it, inExtension, outItems);
	}

	if (projectItem == NULL)
	{
		VString extension;
		inProjectItem->GetExtension(extension);

		if (extension == inExtension)
		{
			outItems.push_back(inProjectItem);
		}
	}
}

void VProject::_LoadFromFolderChildren(const XBOX::VFolder& inCurrent, IDocumentParserManager::IJob *inJob, const ESymbolFileBaseFolder& inBaseFolder, const bool& inUseNextGenSymbolTable)
{
	VArrayString* files = inCurrent.GetContents(FF_NO_FILES);
	if( files )
	{
		VString filename;
		sLONG count = files->GetCount();
		for (int i = 0; i < count; i++)
		{
			files->GetString( filename, i+1);
			
			VFolder child(inCurrent, filename);
			_LoadFromFolderChildren(child, inJob, inBaseFolder, inUseNextGenSymbolTable);
			LoadCoreFiles(inCurrent, filename, eSymbolFileExecContextServer, inJob, inBaseFolder, inUseNextGenSymbolTable);
		}
	}
	delete files;
	files = NULL;
}

// ----------------------------------------------------------------------------
// Classe VCatalog :
// ----------------------------------------------------------------------------


VCatalog::VCatalog()
: fCatalogItem(NULL)
,fCatalogBag(NULL)
,fConnectTarget(NULL)
{
}

VCatalog::~VCatalog()
{
	if (fConnectTarget)
	{
		GetModelParsingErrorSignal().Disconnect(fConnectTarget);
		GetCatalogOpenBaseRequestSignal().Disconnect(fConnectTarget);
		fConnectTarget = NULL;
	}
	
	ReleaseRefCountable( &fCatalogBag);
}


VCatalog* VCatalog::Instantiate( VError& outError, const XBOX::VString& inCatalogFileName)
{
	VCatalog *catalog = NULL;
	
	outError = VE_OK;
	
	// Create the root  item of the catalog
	VProjectItem *rootItem = new VProjectItem( VProjectItem::eCATALOG_FILE);
	if (rootItem != NULL)
	{
		rootItem->SetName( inCatalogFileName);
		rootItem->SetDisplayName( inCatalogFileName);

		catalog = new VCatalog();
		if (catalog != NULL)
		{
			catalog->_SetCatalogItem( rootItem);
		}
		else
		{
			outError = VE_MEMORY_FULL;
		}
		ReleaseRefCountable( &rootItem);
	}
	else
	{
		outError = VE_MEMORY_FULL;
	}
	return catalog;
}


void VCatalog::GetCatalogPath( XBOX::VFilePath &outPath ) const
{
	if (fCatalogItem)
	{
		fCatalogItem->GetFilePath( outPath );
	}
}

VError VCatalog::GetCatalogContent(XBOX::VString& outCatalogContent)
{
	VError err = VE_UNKNOWN_ERROR;

	const VValueBag * bag = RetainCatalogBag();
	if (bag != NULL)
		err =  bag->GetJSONString(outCatalogContent);
	else
		outCatalogContent.Clear();
	XBOX::ReleaseRefCountable( &bag);

	return err;
}

const VValueBag *VCatalog::RetainCatalogBag() const
{
	return RetainRefCountable( fCatalogBag);
}


void VCatalog::_SetCatalogItem( VProjectItem *inProjectItem)
{
	if (testAssert(fCatalogItem == NULL && inProjectItem != NULL))
	{
		fCatalogItem = RetainRefCountable( inProjectItem);

		VProjectItemCatalog *behaviour = dynamic_cast<VProjectItemCatalog*>(fCatalogItem->GetBehaviour());
		if (testAssert(behaviour != NULL))
			behaviour->SetCatalog( this);
	}
}


VError VCatalog::ParseCatalogAndCreateProjectItems()
{
	// Retain the current catalog and reference it
	// !!! AND DON'T FORGET TO RELEASE IT !!!
	Retain();
	fCatalogOpenBaseRequestSignal.Trigger(this);
	
	return VE_OK;
}

void VCatalog::GetEntityModelNames(VectorOfVString& outEntityNames) const
{
	const VValueBag *catalogBag = RetainCatalogBag();
	if (catalogBag != NULL)
	{
		const VBagArray* bagModels = catalogBag->GetElements( d4::dataClasses);
		VIndex count = (bagModels != NULL) ? bagModels->GetCount() : 0;
		for( VIndex i = 1 ; i <= count ; ++i)
		{
			const VValueBag* bagEntityModel = bagModels->GetNth(i);
			if (bagEntityModel)
			{
				VString name;
				bagEntityModel->GetString( d4::name, name);
				outEntityNames.push_back( name);
			}
		}
	}
	ReleaseRefCountable( &catalogBag);
}

void VCatalog::GetEntityModelAttributes(const VString& inEntityName, std::vector<IEntityModelCatalogAttribute* >& outAttributes) const
{
	const VValueBag *catalogBag = RetainCatalogBag();
	if (catalogBag != NULL)
	{
		const VBagArray* bagModels = catalogBag->GetElements( d4::dataClasses);
		VIndex count = (bagModels != NULL) ? bagModels->GetCount() : 0;
		for( VIndex i = 1 ; i <= count ; ++i)
		{
			const VValueBag* bagEntityModel = bagModels->GetNth(i);
			if (bagEntityModel)
			{
				VString entityName;
				bagEntityModel->GetString(d4::name, entityName);
				if( entityName.EqualToString(inEntityName, true) )
				{
					const VBagArray* bagEntityModelAttributes = bagEntityModel->GetElements(d4::attributes);
					if (bagEntityModelAttributes)
					{
						for (sLONG j = 1; j <= bagEntityModelAttributes->GetCount(); ++j)
						{
							VString name, type;

							bagEntityModelAttributes->GetNth(j)->GetString( d4::name, name);
							bagEntityModelAttributes->GetNth(j)->GetString( d4::type, type);
							
							outAttributes.push_back( new VCatalogAttribute(name, type) );
						}
					}
					break;
				}
			}
		}
	}
	ReleaseRefCountable( &catalogBag);
}


void VCatalog::GetEntityModelMethods(const VString& inEntityName, std::vector< IEntityModelCatalogMethod* >& outMethods) const
{
	const VValueBag *catalogBag = RetainCatalogBag();
	if (catalogBag != NULL)
	{
		const VBagArray* bagModels = catalogBag->GetElements( d4::dataClasses);
		VIndex count = (bagModels != NULL) ? bagModels->GetCount() : 0;
		for( VIndex i = 1 ; i <= count ; ++i)
		{
			const VValueBag* bagEntityModel = bagModels->GetNth(i);
			if (bagEntityModel)
			{
				VString entityName;
				bagEntityModel->GetString(d4::name, entityName);
				if( entityName.EqualToString(inEntityName, true) )
				{
					const VBagArray* bag = bagEntityModel->GetElements(d4::methods);
					if (bag)
					{
						for (sLONG j = 1; j <= bag->GetCount(); ++j)
						{
							VString name, applyTo;

							bag->GetNth(j)->GetString( d4::name, name);
							bag->GetNth(j)->GetString( d4::applyTo, applyTo);

							outMethods.push_back( new VCatalogMethod(name, applyTo) );
						}
					}
					break;
				}
			}
		}
	}
	ReleaseRefCountable( &catalogBag);
}

void VCatalog::AddToCatalogRelatedScriptList(const XBOX::VFilePath& inScriptPath)
{
	fRelatedScripts.insert(inScriptPath);
}

void VCatalog::RemoveFromCatalogRelatedScriptList(const XBOX::VFilePath& inScriptPath)
{
	fRelatedScripts.erase(inScriptPath);
}

bool VCatalog::IsCatalogRelatedScript(const XBOX::VFilePath& inScriptPath) const
{
	bool result = false;
	
	// Check the path in the list
	std::set< XBOX::VFilePath >::const_iterator it = fRelatedScripts.find(inScriptPath);
	( it != fRelatedScripts.end() ) ? result = true : result = false;
	
	if( result == false )
	{
		VFilePath catalogPath;
		GetCatalogPath(catalogPath);
		
		if( inScriptPath == catalogPath )
			result = true;
		else
		{
			VFile catalogFile(catalogPath);
			
			if( catalogFile.Exists() )
			{
				VString catalogName;
				catalogFile.GetNameWithoutExtension(catalogName);
				
				catalogPath = catalogPath.ToFolder();
				catalogPath.ToSubFile(catalogName + ".js");
				
				if( inScriptPath == catalogPath )
					result = true;
			}
		}
	}
	
	return result;
}
