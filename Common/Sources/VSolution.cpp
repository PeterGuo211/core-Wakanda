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
#include "VProject.h"
#include "VProjectItem.h"
#include "VProjectItemBehaviour.h"
#include "VSolutionStartupParameters.h"
#include "BreakPointsManager.h"
#include "VRIAUTIs.h"
#include "VRIASettingsKeys.h"
#include "VRIASettingsFile.h"
#include "VProjectSettings.h"
#include "VRIAServerConstants.h"


USING_TOOLBOX_NAMESPACE


// ----------------------------------------------------------------------------
// Elements XML :
// ----------------------------------------------------------------------------
// Objet : Guidelines pour les fichiers XML du RIA Studio et RIA Server (d'après mail G.A)
// - tout en américain 
// - tout en camelCase (pour le camelCase on retiendra la variante consistant à mettre 
//   la première lettre en minuscule)
// - pas de '_'
// - pas d'acronyme ni d’abréviation ou uniquement les plus usuels (ok pour 'id', 
//   mais 'source' au lieu de 'src')
// - ne pas utiliser de nombre pour définir une valeur d’attribut mais les intitulés 
//   eux-même (ne pas utiliser '0', '1', '2'  mais 'bold', ' italic', ' underline' par exemple)
// - utiliser des noms et non des verbes ( 'NotModifiable' et non 'CannotModify')
// - éviter la forme négative ('enterable' et non 'CannotModify')
// - préférer des noms court pour un xml plus compact
// - préférer les attributs aux élements pour les données scalaires, pour un xml plus compact
// - choisir les valeurs par défaut les plus courantes et ne pas les produire dans le xml, 
//   pour un xml plus compact

const VString kXML_ELEMENT_UNDEFINED				= CVSTR("undefined");	// ne devrait pas arrive
const VString kXML_ELEMENT_SOLUTION					= CVSTR("solution");
const VString kXML_ELEMENT_SOLUTION_LINK			= CVSTR("solutionLink");
const VString kXML_ELEMENT_PROJECT					= CVSTR("project");
const VString kXML_ELEMENT_FILE						= CVSTR("file");
const VString kXML_ELEMENT_FOLDER					= CVSTR("folder");
const VString kXML_ELEMENT_SOLUTION_DESCRIPTION_FILE	= CVSTR("solutionDescriptionFile");
const VString kXML_ELEMENT_PROJECT_DESCRIPTION_FILE	= CVSTR("projectDescriptionFile");
const VString kXML_ELEMENT_ENTITY_MODEL				= CVSTR("entityModel");
const VString kXML_ELEMENT_TAG						= CVSTR("tag");
const VString kXML_ELEMENT_CONFIGURATION			= CVSTR("configuration");
const VString kXML_ELEMENT_SOLUTION_EXPLORER		= CVSTR("solutionExplorer");
const VString kXML_ELEMENT_LOCATOR					= CVSTR("locator");
const VString kXML_ELEMENT_EDITOR					= CVSTR("editor");
const VString kXML_ELEMENT_LAST_WINDOW_POS			= CVSTR("lastWindowPos");
const VString kXML_ELEMENT_TABS						= CVSTR("tabs");
const VString kXML_ELEMENT_PERMISSIONS				= CVSTR("permissions");
const VString kXML_ELEMENT_DIRECTORY				= CVSTR("directory");
const VString kXML_ELEMENT_GROUP					= CVSTR("group");
const VString kXML_ELEMENT_ID						= CVSTR("ID");
const VString kXML_ELEMENT_NAME						= CVSTR("name");

// ----------------------------------------------------------------------------
// Items de menus :
// ----------------------------------------------------------------------------
// les noms doivent correspondre a ceux utilises dans les Dial4D correspondants
const VString kPROJECT_ITEM_KIND				= CVSTR("ProjectItemKind");
const VString kPROJECT_ITEM_FULL_PATH			= CVSTR("ProjectItemFullPath");

// Menu contextuel Hierarchical List
const VString kITEM_MNU_CLOSE_SOLUTION			= CVSTR("close_solution");
const VString kITEM_MNU_EDIT_PROJECT_SETTINGS	= CVSTR("edit_project_settings");
const VString kITEM_MNU_EDIT_BUILD_SETTINGS		= CVSTR("edit_build_settings");
const VString kITEM_MNU_EDIT_DEPLOYEMENT_SETTINGS	= CVSTR("edit_deployement_settings");

// ---------------------------------
// Menu contextual List Hierarchique
// ---------------------------------
const VString kITEM_MNU_SET_AS_STARTUP_PROJECT		= CVSTR("set_as_startup_project");
const VString kITEM_MNU_ADD_NEW_PROJECT				= CVSTR("add_new_project");
const VString kITEM_MNU_ADD_NEW_FILE				= CVSTR("add_new_file");
const VString kITEM_MNU_ADD_NEW_JAVASCRIPT_FILE		= CVSTR("add_new_javascript_file");
const VString kITEM_MNU_ADD_NEW_JSON_FILE			= CVSTR("add_new_json_file");
const VString kITEM_MNU_ADD_NEW_HTML_FILE			= CVSTR("add_new_html_file");
const VString kITEM_MNU_ADD_NEW_FORM_FILE			= CVSTR("add_new_form_file");
const VString kITEM_MNU_ADD_NEW_XML_FILE			= CVSTR("add_new_xml_file");
const VString kITEM_MNU_ADD_NEW_CSS_FILE			= CVSTR("add_new_css_file");
const VString kITEM_MNU_ADD_NEW_PHP_FILE			= CVSTR("add_new_php_file");
const VString kITEM_MNU_ADD_NEW_TEXT_FILE			= CVSTR("add_new_text_file");
const VString kITEM_MNU_ADD_NEW_STANDARD_FOLDER		= CVSTR("add_new_standard_folder");
const VString kITEM_MNU_ADD_EXISTING_PROJECT		= CVSTR("add_existing_project");
const VString kITEM_MNU_IMPORT_EXISTING_FOLDER		= CVSTR("import_existing_folder");
const VString kITEM_MNU_IMPORT_EXISTING_FILES		= CVSTR("import_existing_files");
const VString kITEM_MNU_REFERENCE_EXTERNAL_FOLDER	= CVSTR("reference_existing_folder");
const VString kITEM_MNU_REFERENCE_EXTERNAL_FILES	= CVSTR("reference_existing_files");
const VString kITEM_MNU_OPEN_IN_NEW_WINDOW			= CVSTR("open_in_new_window");
const VString kITEM_MNU_OPEN_IN_NEW_TAB				= CVSTR("open_in_new_tab");
const VString kITEM_MNU_SAVE_AS_TEMPLATE            = CVSTR("saveAsTemplate");
const VString kITEM_MNU_SET_AS_ACTIVE				= CVSTR("set_as_active");
const VString kITEM_MNU_TAG_AS_RPC					= CVSTR("tag_as_rpc");
const VString kITEM_MNU_REVEAL_IN_FINDER			= CVSTR("reveal_in_finder");
const VString kITEM_MNU_CUT							= CVSTR("cut");
const VString kITEM_MNU_COPY						= CVSTR("copy");
const VString kITEM_MNU_PASTE						= CVSTR("paste");
const VString kITEM_MNU_DELETE						= CVSTR("delete");
const VString kITEM_MNU_RENAME						= CVSTR("rename");

// ------------------------
// Menu contextual List Box
// ------------------------
const VString kITEM_MNU_LB_OPEN_IN_NEW_WINDOW		= CVSTR("LB_open_in_new_window");
const VString kITEM_MNU_LB_OPEN_IN_NEW_TAB			= CVSTR("LB_open_in_new_tab");
const VString kITEM_MNU_LB_REVEAL_IN_FINDER		= CVSTR("LB_reveal_in_finder");
const VString kITEM_MNU_LB_REVEAL_IN_SOLUTION_EXPLORER	= CVSTR("LB_reveal_in_solution_explorer");
const VString kITEM_MNU_LB_REVEAL_PARENT_IN_SOLUTION_EXPLORER	= CVSTR("LB_reveal_parent_in_solution_explorer");	// utile pour les champs !
const VString kITEM_MNU_LB_EXCLUDE_FROM_SOLUTION	= CVSTR("LB_exclude_from_solution");
const VString kITEM_MNU_LB_CUT						= CVSTR("LB_cut");
const VString kITEM_MNU_LB_COPY						= CVSTR("LB_copy");
const VString kITEM_MNU_LB_DELETE					= CVSTR("LB_delete");
const VString kITEM_MNU_LB_RENAME					= CVSTR("LB_rename");

// --------------------------
// Menu contextual Thumbnails
// --------------------------
const VString kITEM_MNU_TH_OPEN_IN_NEW_WINDOW		= CVSTR("TH_open_in_new_window");
const VString kITEM_MNU_TH_OPEN_IN_NEW_TAB			= CVSTR("TH_open_in_new_tab");
const VString kITEM_MNU_TH_REVEAL_IN_FINDER		= CVSTR("TH_reveal_in_finder");
const VString kITEM_MNU_TH_REVEAL_IN_SOLUTION_EXPLORER	= CVSTR("TH_reveal_in_solution_explorer");
const VString kITEM_MNU_TH_REVEAL_PARENT_IN_SOLUTION_EXPLORER	= CVSTR("TH_reveal_parent_in_solution_explorer");	// utile pour les champs !
const VString kITEM_MNU_TH_EXCLUDE_FROM_SOLUTION	= CVSTR("TH_exclude_from_solution");
const VString kITEM_MNU_TH_CUT						= CVSTR("TH_cut");
const VString kITEM_MNU_TH_COPY						= CVSTR("TH_copy");
const VString kITEM_MNU_TH_DELETE					= CVSTR("TH_delete");
const VString kITEM_MNU_TH_RENAME					= CVSTR("TH_rename");

// -----------------------------------
// Menu contextual Tool Bar principale
// -----------------------------------
const VString kITEM_MNU_TB_OPEN_FILE				= CVSTR("open_NEW");
const VString kITEM_MNU_TB_IMPORT_FILES				= CVSTR("open_ADD");

// -----------------------------------
// Tool Bar Solution Explorer
// -----------------------------------
const VString kITEM_BTN_HOME						= CVSTR("home");
const VString kITEM_BTN_PARENT						= CVSTR("parent");
const VString kITEM_BTN_PREVIOUS					= CVSTR("previous");
const VString kITEM_BTN_NEXT						= CVSTR("next");

// ----------------------------------------------------------------------------
// Fichiers :
// ----------------------------------------------------------------------------
const VString kUSER_TEMPLATES_FOLDER				= CVSTR("Templates");
const VString kDEFAULT_PROJECT_TEMPLATE_FOLDER		= CVSTR("Default Project");
const VString kUSER_CONFIGURATION_FOLDER			= CVSTR("Configuration");

const XBOX::VString	kTEMPLATE_PROJECT_NAME_MACRO( "$(projectName)");
const XBOX::VString	kTEMPLATE_SOLUTION_NAME_MACRO( "$(solutionName)");

// ----------------------------------------------------------------------------
// Chaines speciales :
// ----------------------------------------------------------------------------
const char POSIX_FOLDER_SEPARATOR = '/';

// ----------------------------------------------------------------------------
// Properties :
// ----------------------------------------------------------------------------
const VString kPROJECT_ITEM_FILE_SIZE					= CVSTR("file_size");
const VString kPROJECT_ITEM_FILE_TYPE			 		= CVSTR("file_type");
const VString kPROJECT_ITEM_LAST_MODIFICATION			= CVSTR("file_last_modification");


const XBOX::ScrapKind kSOLUTION_UUID_SCRAP_KIND( "com.4d.wakanda.studio.solution-uuid");
const XBOX::ScrapKind kCUT_SESSION_UUID_SCRAP_KIND( "com.4d.wakanda.studio.cut-session-uuid");


namespace SolutionPermissions
{
	CREATE_BAGKEY_WITH_DEFAULT(permissions, XBOX::VString, "");
	CREATE_BAGKEY_WITH_DEFAULT(allow, XBOX::VString, "");
	CREATE_BAGKEY_WITH_DEFAULT(action, XBOX::VString, "");
	CREATE_BAGKEY_WITH_DEFAULT(groupID, XBOX::VString, "");
	CREATE_BAGKEY_WITH_DEFAULT(resource, XBOX::VString, "");
	CREATE_BAGKEY_WITH_DEFAULT(temporaryForcePermissions, XBOX::VString, "");
	CREATE_BAGKEY_WITH_DEFAULT(type, XBOX::VString, "");
}

// ----------------------------------------------------------------------------



class VSolutionFileStampSaver : public VObject
{
public:
	VSolutionFileStampSaver( VSolution *inSolution)	: fSolution(inSolution)
	{
		fDirtyStampSave = fSolution->_GetSolutionFileDirtyStamp();
	}

	virtual ~VSolutionFileStampSaver() {;}

			bool StampHasBeenChanged() const
			{
				return fSolution->_GetSolutionFileDirtyStamp() > fDirtyStampSave;
			}

private:
			VSolution	*fSolution;
			sLONG		fDirtyStampSave;
};



// ----------------------------------------------------------------------------
// Classe VSolution
// ----------------------------------------------------------------------------
VSolution::VSolution()
: fSolutionItem(NULL)
,fSolutionFileProjectItem( NULL)
,fSolutionFileDirtyStamp(0)
,fDelegate(NULL)
,fSuccessfulLoading(true)
,fAutoSave(false)
,fAcceptReloadCatalog(false)
,fSolutionMessageManager(NULL)
,fSolutionStartupParameters(NULL)
,fSolutionUser(NULL)
,fPermissions(NULL)
,fPermissionsHaveBeenModified(false)
,fBreakPointsManager(NULL)
,fParsingManager(NULL)
{
	fUUID.Regenerate();
}


VSolution::~VSolution()
{
	xbox_assert(fParsingManager == NULL);

	ReleaseRefCountable( &fSolutionUser);

	ReleaseRefCountable( &fSolutionMessageManager);

	ReleaseRefCountable( &fSolutionStartupParameters);

	if (fSolutionItem != NULL)
	{
		fSolutionItem->DeleteChildren();
		delete fSolutionItem;
		fSolutionItem = NULL;
	}

	for (VectorOfProjectsIterator iter = fProjects.begin() ; iter != fProjects.end() ; ++iter)
	{
		(*iter)->Release();
	}
	
	ReleaseRefCountable( &fBreakPointsManager);
	ReleaseRefCountable( &fParsingManager);
	ReleaseRefCountable( &fPermissions);
}


VSolution* VSolution::Instantiate( VError& outError, const XBOX::VFilePath& inSolutionFile)
{
	VFilePath folderPath;
	if (!inSolutionFile.IsFile() || !inSolutionFile.GetFolder( folderPath))
	{
		outError = VE_INVALID_PARAMETER;
		return NULL;
	}

	VProjectItem *rootItem = NULL, *solutionFileItem = NULL;
	outError = VE_OK;

	// Create the root item of the solution
	rootItem = new VProjectItem( VURL( folderPath), VProjectItem::eSOLUTION);
	if (rootItem != NULL)
	{
		VString itemName;
		inSolutionFile.GetFileName( itemName, false);
		rootItem->SetName( itemName);
		rootItem->SetDisplayName( itemName);

		// Create an item for the solution file
		solutionFileItem = new VProjectItem( VURL( inSolutionFile), VProjectItem::eFILE);
		if (solutionFileItem != NULL)
		{
			inSolutionFile.GetFileName( itemName, true);
			solutionFileItem->SetName( itemName);
			solutionFileItem->SetDisplayName( itemName);
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

	VSolution *solution = NULL;

	if (outError == VE_OK)
	{
		solution = new VSolution();
		if (solution != NULL)
		{
			solution->_SetSolutionItem( rootItem);
			solution->_SetSolutionFileItem( solutionFileItem);
		}
		else
		{
			outError = VE_MEMORY_FULL;
		}
	}

	ReleaseRefCountable( &rootItem);
	ReleaseRefCountable( &solutionFileItem);

	return solution;
}


void VSolution::SetDelegate( ISolutionDelegate *inDelegate)
{
	fDelegate = inDelegate;
}


ISolutionDelegate* VSolution::GetDelegate() const
{
	return fDelegate;
}


XBOX::VError VSolution::CreateFromTemplate( const XBOX::VFolder& inSolutionFolder, const XBOX::VString& inSolutionName, const XBOX::VFolder& inSolutionTemplateFolder)
{
	VError err = VE_OK;

	if (!inSolutionTemplateFolder.Exists())
		err = VE_FOLDER_NOT_FOUND;

	if (err == VE_OK)
	{
		VFilePath sourceFilePath( inSolutionTemplateFolder.GetPath());
		sourceFilePath.SetFileName( kTEMPLATE_SOLUTION_NAME_MACRO, false);
		sourceFilePath.SetExtension( RIAFileKind::kSolutionFileExtension);

		VFile templateSolutionFile( sourceFilePath);
		if (!templateSolutionFile.Exists())
			err = VE_SOMA_SOLUTION_FILE_NOT_FOUND;

		if ((err == VE_OK) && !inSolutionFolder.Exists())
			err = inSolutionFolder.Create();

		if (err == VE_OK)
		{
			// Copy the template folder
			VFolder solutionFolder( inSolutionFolder);
			err = CopyFolder( inSolutionTemplateFolder, solutionFolder);
		}
		
		if (err == VE_OK)
		{
			// Resolve the files and folders names
			err = _ResolveMacro( inSolutionFolder, kTEMPLATE_SOLUTION_NAME_MACRO, inSolutionName);
		}

		if (err == VE_OK)
		{
			// Create the solution file
			VFilePath solutionFilePath( inSolutionFolder.GetPath());
			solutionFilePath.SetFileName( inSolutionName);
			solutionFilePath.SetExtension( RIAFileKind::kSolutionFileExtension);

			VFile solutionFile( solutionFilePath);
			if (!solutionFile.Exists())
				err = VE_SOMA_SOLUTION_FILE_NOT_FOUND;

			if (err == VE_OK)
			{
				// Resolve the items names which are referenced inside the solution file
				VValueBag solutionBag;
				err = LoadBagFromXML( solutionFile, kXML_ELEMENT_SOLUTION, solutionBag, XML_ValidateNever);
				if (err == VE_OK)
				{
					sLONG changesCount = 0;
					VBagArray *foldersBagArray = solutionBag.RetainElements( kXML_ELEMENT_FOLDER);
					if (foldersBagArray != NULL)
					{
						for (sLONG i = 1 ; i <= foldersBagArray->GetCount() ; i++)
						{
							VValueBag *folderBag = foldersBagArray->GetNth( i);
							if (folderBag != NULL)
							{
								VString relativePath = ProjectItemBagKeys::path.Get( folderBag);
								if (relativePath.Find( kTEMPLATE_SOLUTION_NAME_MACRO) != 0)
								{
									relativePath.ExchangeAll( kTEMPLATE_SOLUTION_NAME_MACRO, inSolutionName);
									ProjectItemBagKeys::path.Set( folderBag, relativePath);
									++changesCount;
								}
							}
						}

						solutionBag.SetElements( kXML_ELEMENT_FOLDER, foldersBagArray);
					}

					ReleaseRefCountable( &foldersBagArray);

					VBagArray *filesBagArray = solutionBag.RetainElements( kXML_ELEMENT_FILE);
					if (filesBagArray != NULL)
					{
						for (sLONG i = 1 ; i <= filesBagArray->GetCount() ; i++)
						{
							VValueBag *fileBag = filesBagArray->GetNth( i);
							if (fileBag != NULL)
							{
								VString relativePath = ProjectItemBagKeys::path.Get( fileBag);
								if (relativePath.Find( kTEMPLATE_SOLUTION_NAME_MACRO) != 0)
								{
									relativePath.ExchangeAll( kTEMPLATE_SOLUTION_NAME_MACRO, inSolutionName);
									ProjectItemBagKeys::path.Set( fileBag, relativePath);
									++changesCount;
								}
							}
						}

						solutionBag.SetElements( kXML_ELEMENT_FILE, filesBagArray);
					}

					ReleaseRefCountable( &filesBagArray);

					if (changesCount > 0)
					{
						err = WriteBagToFileInXML( solutionBag, kXML_ELEMENT_SOLUTION, &solutionFile);
					}
				}
			}
		}

		if (err == VE_OK)
		{
			// create the certificates folder
			VFolder certificatesFolder( inSolutionFolder, L"Certificates");
			if (!certificatesFolder.Exists())
				err = certificatesFolder.Create();
		}
	}

	return err;
}


const VUUID& VSolution::GetUUID() const
{
	return fUUID;
}


bool VSolution::GetName( XBOX::VString& outName) const
{
	bool ok = false;
	outName.Clear();

	if (fSolutionItem != NULL)
	{
		outName = fSolutionItem->GetDisplayName();
		ok = true;
	}
	return ok;
}


bool VSolution::GetSolutionFolderPath( XBOX::VFilePath& outPath) const
{
	bool ok = false;
	outPath.Clear();

	VFilePath		solutionPath;
	VProjectItem*	solutionProjectItem = GetSolutionFileProjectItem();
	xbox_assert ( solutionProjectItem != NULL );
	if ( solutionProjectItem != NULL )
	{
		ok = solutionProjectItem->GetFilePath( solutionPath );
		xbox_assert ( ok );
		ok = solutionPath.GetParent( outPath );
		xbox_assert ( ok );
	}

	return ok;
}


bool VSolution::GetSolutionFilePath( XBOX::VFilePath& outPath) const
{
	bool ok = false;
	outPath.Clear();

	if (fSolutionFileProjectItem != NULL)
		ok = fSolutionFileProjectItem->GetFilePath( outPath);

	return ok;
}


bool VSolution::GetUserCacheFolderPath( XBOX::VFilePath& outPath) const
{
	bool ok = true;
	VString solutionName;

	ok = GetName( solutionName);
	if (ok)
	{
		VFolder *tempFolder = VProcess::Get()->RetainProductSystemFolder( eFK_UserCache, true);
		if (tempFolder != NULL)
		{
			VString solutionFolder( solutionName);
			solutionFolder.AppendUniChar( L'-').AppendULong8( VProcess::Get()->GetSystemID());

			tempFolder->GetPath( outPath);
			outPath.ToSubFolder( solutionFolder);

			tempFolder->Release();
		}
		else
		{
			ok = false;
		}
	}

	return ok;
}


bool VSolution::ResolvePosixPathMacros( XBOX::VString& ioPosixPath) const
{
	bool ok = true;

	if (ioPosixPath.BeginsWith( L"$(solutionUserCacheDir)"))
	{
		VFilePath cacheFolderPath;
		ok = GetUserCacheFolderPath( cacheFolderPath);
		if (ok)
		{
			VString value( cacheFolderPath.GetPath());
			VURL::Convert( value, eURL_NATIVE_STYLE, eURL_POSIX_STYLE, false);
			ioPosixPath.Replace( value, 1, VString( L"$(solutionUserCacheDir)").GetLength());
		}
	}
	else if (ioPosixPath.BeginsWith( L"$(solutionDir)"))
	{
		VFilePath solutionFolderPath;
		ok = GetSolutionFolderPath( solutionFolderPath);
		if (ok)
		{
			VString value( solutionFolderPath.GetPath());
			VURL::Convert( value, eURL_NATIVE_STYLE, eURL_POSIX_STYLE, false);
			ioPosixPath.Replace( value, 1, VString( L"$(solutionDir)").GetLength());
		}
	}

	if (ok)
	{
		VString solutionName;
		ok = GetName( solutionName);
		if (ok)
		{
			ioPosixPath.ExchangeAll( L"$(solutionName)", solutionName);
		}
	}

	return ok;
}


XBOX::VError VSolution::Rename( const XBOX::VString& inNewName)
{
	VError err = VE_OK;

	VString name;
	if (GetName( name) && (name != inNewName))
	{
		_UnregisterProjectItem( fSolutionFileProjectItem);
		
		name = inNewName + L"." + RIAFileKind::kSolutionFileExtension;

		err = fSolutionFileProjectItem->RenameContent( name);
		if (err == VE_OK)
		{
			fSolutionItem->SetDisplayName( inNewName);
			fSolutionItem->Touch();

			// sc 29/09/2011 update the startup parameters
			if (fSolutionStartupParameters != NULL)
			{
				VFilePath path;
				fSolutionFileProjectItem->GetFilePath( path);
				VFile *solutionFile = new VFile( path);
				if (solutionFile != NULL)
				{
					fSolutionStartupParameters->SetSolutionFileToOpen( solutionFile);
					ReleaseRefCountable( &solutionFile);
				}
			}

			UpdateSolutionLinkFile();
		}

		_RegisterProjectItem( fSolutionFileProjectItem);
	}

	if (err != VE_OK)
		err = VE_SOMA_CANNOT_RENAME_SOLUTION;

	return err;
}


void VSolution::BuildPathFromRelativePath( XBOX::VFilePath& outFilePath, const XBOX::VString& inRelativePath, XBOX::FilePathStyle inRelativePathStyle) const
{
	outFilePath.Clear();

	if (fSolutionItem != NULL)
	{
		VFilePath folderPath;
		fSolutionItem->GetFilePath( folderPath);
		folderPath = folderPath.ToFolder();
		outFilePath.FromRelativePath(folderPath, inRelativePath, inRelativePathStyle);
	}	
}


void VSolution::DoProjectItemsChanged( const VectorOfFilePathes& inChangedPathes)
{
	if (fDelegate != NULL)
		fDelegate->DoProjectItemsChanged( inChangedPathes);
}

void VSolution::DoProjectItemsDeleted( const VectorOfFilePathes& inDeletedPathes)
{
	if (fDelegate != NULL)
		fDelegate->DoProjectItemsDeleted( inDeletedPathes);
}


void VSolution::SetSolutionMessageManager( ISolutionMessageManager* inSolutionMessageManager)
{
	CopyRefCountable( &fSolutionMessageManager, inSolutionMessageManager);
}


void VSolution::SetSolutionUser( ISolutionUser* inSolutionUser)
{
	CopyRefCountable( &fSolutionUser, inSolutionUser);
	if (fSolutionUser)
		fSolutionUser->SetSolution( this);
}

void VSolution::SetBreakPointsManager( ISolutionBreakPointsManager* inBreakPointsManager)
{
	CopyRefCountable( &fBreakPointsManager, inBreakPointsManager);
	if (fBreakPointsManager != NULL)
	{
		fBreakPointsManager->SetSolution( this);
		fBreakPointsManager->InitSolutionFolderPosixPath();
	}
}


VProject* VSolution::GetProjectFromFilePathOfProjectFile(const XBOX::VFilePath& inFilePath) const
{
	VProject* project = NULL;
	if (!inFilePath.IsEmpty())
	{	
		VString strPathOfProjectFile;
		inFilePath.GetPath(strPathOfProjectFile);
		for (VectorOfProjectsConstIterator it = fProjects.begin(); it != fProjects.end(); ++it)
		{
			VFilePath filePath;
			(*it)->GetProjectItemProjectFile()->GetFilePath(filePath);
			VString strFilePath;
			filePath.GetPath(strFilePath);
			if (strFilePath == strPathOfProjectFile)
			{
				project = *it;
				break;
			}
		}
	}
	return project;
}


VProject* VSolution::GetParentProject( const XBOX::VFilePath& inPath) const
{
	VProject *project = NULL;

	for (VectorOfProjectsConstIterator projectIter = fProjects.begin() ; (projectIter != fProjects.end()) && (project == NULL) ; ++projectIter)
	{
		VFilePath projectFolderPath;
		if ((*projectIter)->GetProjectFolderPath( projectFolderPath))
		{
			if (inPath.IsChildOf( projectFolderPath))
				project = *projectIter;
		}
	}

	return project;
}


VProjectItem* VSolution::GetProjectItemFromFullPath( const XBOX::VString& inFullPath, FilePathStyle inFullPathStyle) const
{
	VFilePath path( inFullPath, inFullPathStyle);
	return GetProjectItemFromFilePath( path);
}


VProjectItem* VSolution::GetProjectItemFromFilePath( const VFilePath& inPath) const
{
	VProjectItem *projectItem = NULL;

	if (!inPath.IsEmpty())
	{
		// search for solution child item
		VURL url( inPath);
		projectItem = _GetProjectItemFromURL( url);

		if (projectItem == NULL)
		{
			// search for project child item
			for (VectorOfProjectsConstIterator prjIter = fProjects.begin() ; (prjIter != fProjects.end()) && (projectItem == NULL) ; ++prjIter)
			{
				projectItem = (*prjIter)->GetProjectItemFromFilePath( inPath);
			}
		}

		if ((projectItem == NULL) && inPath.IsFolder())
		{
			// it may be the solution item
			VFilePath path;
			fSolutionItem->GetFilePath( path);
			if (path == inPath)
				projectItem = fSolutionItem;
		}
	}

	return projectItem;
}


void VSolution::GetVectorOfProjectNames( std::vector<XBOX::VString>& outProjectNames) const
{
	outProjectNames.clear();

	for (VectorOfProjectsConstIterator iter = fProjects.begin() ; iter != fProjects.end() ; ++iter)
	{
		VString name;
		(*iter)->GetName( name);
		outProjectNames.push_back( name);
	}
}

sLONG VSolution::CountProjects() const
{
	return fProjects.size();
}

void VSolution::GetVectorOfProjects( VectorOfProjects& outProjects) const
{
	outProjects.clear();
	outProjects.insert( outProjects.begin(), fProjects.begin(), fProjects.end());
} 

VProject* VSolution::FindProjectByName( const XBOX::VString& inProjectName) const
{
	VProject *project = NULL;

	for (VectorOfProjectsConstIterator iter = fProjects.begin() ; iter != fProjects.end() && project == NULL ; ++iter)
	{
		VString name;
		(*iter)->GetName( name);
		if (name == inProjectName)
			project = *iter;
	}

	return project;
}


void VSolution::GetPhysicalFilesOfCurrentProject(VectorOfProjectItems& outProjectItemsVector)
{
	VProject* project = NULL;

	if (fDelegate != NULL)
		project = fDelegate->GetSelectedProject();

	if (project != NULL)
	{
		VProjectItemTools::GetChildFile( project->GetProjectItem(), outProjectItemsVector, true);
	}

	// 071009 : un jour, ajouter les references externes (si elles reviennent dans les specs)
}

VError VSolution::SaveProjectAsTemplate(const VFilePath& inProjectFolderPath, const VString& inProjectFileName, VString& inTemplateName, VString& inTypeReadMe, VString& inReadMe, VString& inPathImage, VProgressIndicator* inProgressIndicator)
{
	VError err = VE_OK;
	
	XBOX::VFolder *folder = XBOX::VFolder::RetainSystemFolder( eFK_UserPreferences, false);
	
	VString strFolderPath;
	folder->GetPath(strFolderPath);
	strFolderPath += "Wakanda";
	strFolderPath += FOLDER_SEPARATOR;
	strFolderPath += "UserTemplates";
	strFolderPath += FOLDER_SEPARATOR;
	VFolder tmpFolder(strFolderPath);
	if (!tmpFolder.Exists())
		tmpFolder.CreateRecursive();
	
	strFolderPath += inTemplateName;
	strFolderPath += FOLDER_SEPARATOR;
	VFilePath folderFilePath(strFolderPath);
	VFolder destFolder(strFolderPath);
	if (!destFolder.Exists())
	{
		bool userAbort = false;
		// on se base seulement sur le nombre de fichiers pour le progressIndicator
		sLONG allFilesCount = VProjectItemManager::GetFilesCountInFolderAndSubfolder(VFolder(inProjectFolderPath));
		if (inProgressIndicator)
			// TO DO a localiser !!!
			inProgressIndicator->BeginSession(allFilesCount, CVSTR("Copying files..."), true);

		if (!VProjectItemManager::Get()->FolderCopyTo(inProjectFolderPath, folderFilePath, inProgressIndicator, &userAbort))
			err = VE_UNKNOWN_ERROR;
		else
		{
			if (userAbort)
			{
				err = VE_UNKNOWN_ERROR;
			}
			else
			{
				VString strProjectFilePath = strFolderPath;
				strProjectFilePath += inProjectFileName;
				VFile projectFile(strProjectFilePath);
				if (projectFile.Exists())
				{
					VString newFileProjectName = inTemplateName;
					newFileProjectName += ".";
					newFileProjectName += RIAFileKind::kProjectFileExtension;
					projectFile.Rename(newFileProjectName);
				}

				if (inTypeReadMe == "path")
				{
					VFilePath srcReadMePath(inReadMe);
					VString extension;
					srcReadMePath.GetExtension(extension);
					VString strDestReadMePath = strFolderPath;
					strDestReadMePath += "ReadMe";
					strDestReadMePath += ".";
					strDestReadMePath += extension;
					VFilePath destFilePath(strDestReadMePath);
					if (!VProjectItemManager::Get()->FileCopyTo(srcReadMePath, destFilePath))
						err = VE_UNKNOWN_ERROR;
					else
					{
						if ((extension == "htm") || (extension == "html"))
						{
							// complement demande par Rodolphe le 180310
							VString strTxtReadMePath = strFolderPath;
							strTxtReadMePath += "ReadMe.txt";
							VFile txtReadMeFile(strTxtReadMePath);
							if (txtReadMeFile.Exists())
								txtReadMeFile.Delete();
						}
					}
				}
				else // type == text
				{
					VString strDestReadMePath = strFolderPath;
					strDestReadMePath += "ReadMe.txt";
					VFile readMeFile(strDestReadMePath);
					VFileDesc *fd = NULL;
					err = readMeFile.Open(FA_READ_WRITE, &fd, FO_CreateIfNotFound | FO_Overwrite);
					if (err == VE_OK && fd != NULL)
					{
						VStringConvertBuffer buffer(inReadMe, VTC_US_ASCII);
						err = fd->SetSize(buffer.GetSize());
						if (err == VE_OK)
						{
							err = fd->PutDataAtPos(buffer.GetCPointer(), buffer.GetSize());
							if (err == VE_OK)
								err = fd->Flush();
						}
						delete fd;
						// complement demande par Rodolphe le 180310
						VString strHTMLReadMePath = strFolderPath;
						strHTMLReadMePath += "ReadMe.html";
						VFile HTMLReadMeFile(strHTMLReadMePath);
						if (HTMLReadMeFile.Exists())
							HTMLReadMeFile.Delete();
						VString strHTMReadMePath = strFolderPath;
						strHTMReadMePath += "ReadMe.htm";
						VFile HTMReadMeFile(strHTMReadMePath);
						if (HTMReadMeFile.Exists())
							HTMReadMeFile.Delete();
					}
					else
					{
						err = VE_FILE_CANNOT_OPEN;
					}
				}
				
				if ((err == VE_OK) && (!inPathImage.IsEmpty()))
				{
					VFilePath srcImagePath(inPathImage);
					VString extension;
					srcImagePath.GetExtension(extension);
					VString strDestImagePath = strFolderPath;
					strDestImagePath += inTemplateName;
					strDestImagePath += ".";
					strDestImagePath += extension;
					VFilePath destFilePath(strDestImagePath);
					if (!VProjectItemManager::Get()->FileCopyTo(srcImagePath, destFilePath))
						err = VE_UNKNOWN_ERROR;
				}
			}
		}
	}
	else
	{
		err = VE_FOLDER_ALREADY_EXISTS;
		if (fSolutionMessageManager)
		{
			VString localizedMessage;
			fSolutionMessageManager->GetLocalizedStringFromResourceName(kSOMA_TEMPLATE_ALREADY_EXISTS, localizedMessage);
			fSolutionMessageManager->DisplayMessage(localizedMessage);
		}
	}

	return err;
}

VProjectItem* VSolution::GetProjectItemFromTag( const VProjectItemTag& inTag ) const
{
	VectorOfProjectItems itemsVector;
	GetProjectItemsFromTag( inTag, itemsVector);
	return (!itemsVector.empty()) ? itemsVector[0] : NULL;
}

void VSolution::GetProjectItemsFromTag( const VProjectItemTag& inTag, VectorOfProjectItems& outProjectItems) const
{
	outProjectItems.clear();

	if (!VProjectItemTagManager::Get()->IsRegisteredProjectItemTag( inTag))
		return;

	bool done = false;

	EProjectItemTagProperties projectItemTagProperties = VProjectItemTagManager::Get()->GetProperties( inTag);
	bool singleProjectItem = ((projectItemTagProperties & ePITP_ApplyToSingleFile) != 0) || ((projectItemTagProperties & ePITP_ApplyToSingleFolder) != 0)  || (inTag == kSettingTag);
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
					// TBD
					xbox_assert(false);
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

	if (!done)
	{
		// Search into default folders: default folders are defined by a posix path relative to the solution folder
		VectorOfVString defaultFoldersPaths;
		if (VProjectItemTagManager::Get()->GetDefaultFolders( inTag, defaultFoldersPaths))
		{
			// Build the list of default folders
			for (VectorOfVString::iterator iter = defaultFoldersPaths.begin() ; iter != defaultFoldersPaths.end() && !done ; ++iter)
			{
				VString strDefaultFolderRelativePath( *iter);
				VFilePath defaultFolderFilePath;

				if (!strDefaultFolderRelativePath.IsEmpty() && (strDefaultFolderRelativePath[strDefaultFolderRelativePath.GetLength()-1] != POSIX_FOLDER_SEPARATOR))
					strDefaultFolderRelativePath += POSIX_FOLDER_SEPARATOR;

				BuildPathFromRelativePath( defaultFolderFilePath, strDefaultFolderRelativePath, FPS_POSIX);
				VProjectItem *projectItem = GetProjectItemFromFilePath( defaultFolderFilePath);
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
		// Search for default files: default files are defined by a posix path relative to the solution folder
		VectorOfVString defaultFiles;
		if (VProjectItemTagManager::Get()->GetDefaultFiles( inTag, defaultFiles))
		{
			for (VectorOfVString::iterator iter = defaultFiles.begin() ; iter != defaultFiles.end() && !done ; ++iter)
			{
				VFilePath defaultFilePath;

				VString strDefaultFileRelativePath( *iter);
				BuildPathFromRelativePath( defaultFilePath, strDefaultFileRelativePath, FPS_POSIX);

				VProjectItem *projectItem = GetProjectItemFromFilePath( defaultFilePath);
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


void VSolution::_ReferenceItem( VProjectItem *inItem, bool inTouchSolutionFile)
{
	if (!_IsItemReferenced( inItem))
	{
		fReferencedItems.push_back( inItem);
		if (inTouchSolutionFile)
			_TouchSolutionFile();
	}
}


void VSolution::_UnreferenceItem( VProjectItem *inItem, bool inTouchSolutionFile)
{
	VectorOfProjectItemsIterator found = std::find(  fReferencedItems.begin(), fReferencedItems.end(), inItem);
	if (found != fReferencedItems.end())
	{
		fReferencedItems.erase( found);
		if (inTouchSolutionFile)
			_TouchSolutionFile();
	}
}


bool VSolution::_IsItemReferenced( VProjectItem *inItem) const
{
	return (std::find( fReferencedItems.begin(), fReferencedItems.end(), inItem) != fReferencedItems.end());
}


bool VSolution::_IsVectorContainsReferencedItems( const VectorOfProjectItems& inProjectItems, bool inRecursive) const
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


VProjectItem* VSolution::_CreateFileItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive, bool inTouchSolutionFile)
{
	VProjectItem *result = NULL;

	if (inPath.IsFile())
	{
		VProject *parentProject = GetParentProject( inPath);
		if (parentProject == NULL)
		{
			VFilePath parentPath, solutionFolderPath;
			if (inPath.GetParent( parentPath) && GetSolutionFolderPath( solutionFolderPath))
			{
				if ((solutionFolderPath == parentPath) || parentPath.IsChildOf( solutionFolderPath))
				{
					VProjectItem *parentItem = GetProjectItemFromFilePath( parentPath);
					if ((parentItem == NULL) && inRecursive)
					{
						parentItem = _CreateFolderItemFromPath( outError, parentPath, true, inTouchSolutionFile, false);
					}

					if (parentItem != NULL)
					{
						VFile file(inPath);
						VString fileName;
						inPath.GetFileName( fileName);

						result = VProjectItemFile::Instantiate( fileName, parentItem);
						if (result != NULL)
						{
							_DoItemAdded( result, inTouchSolutionFile);
						}
					}
				}
			}
		}
		else
		{
			result = parentProject->CreateFileItemFromPath( outError, inPath, inRecursive);
		}
	}
	return result;
}


VProjectItem* VSolution::_CreateFolderItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive, bool inTouchSolutionFile, bool inSynchronizeWithFileSystem)
{
	VProjectItem *result = NULL;

	if (inPath.IsFolder())
	{
		VProject *parentProject = GetParentProject( inPath);
		if (parentProject == NULL)
		{
			VFilePath parentPath, solutionFolderPath;
			if (inPath.GetParent( parentPath) && GetSolutionFolderPath( solutionFolderPath))
			{
				if ((solutionFolderPath == parentPath) || parentPath.IsChildOf( solutionFolderPath))
				{
					VProjectItem *parentItem = GetProjectItemFromFilePath( parentPath);
					if ((parentItem == NULL) && inRecursive)
					{
						parentItem = _CreateFolderItemFromPath( outError, parentPath, true, inTouchSolutionFile, false);
					}

					if (parentItem != NULL)
					{
						VString folderName;
						inPath.GetFolderName( folderName);

						result = VProjectItemFolder::Instantiate( folderName, parentItem);
						if (result != NULL)
						{
							_DoItemAdded( result, inTouchSolutionFile);
						}
					}
				}
			}
		}
		else
		{
			result = parentProject->CreateFolderItemFromPath( outError, inPath, inRecursive, inSynchronizeWithFileSystem);
		}
	}
	return result;
}


XBOX::VError VSolution::CountFilesAndFolders( const VFolder& inFolder, sLONG& outFilesCount, sLONG &outFoldersCount, bool inRecursive)
{
	outFilesCount = 0;
	outFoldersCount = 0;
	return _CountFilesAndFolders( inFolder, outFilesCount, outFoldersCount, inRecursive);

}


VError VSolution::CopyFolder( const XBOX::VFolder& inSourceFolder, XBOX::VFolder& inDestinationFolder, const XBOX::FileCopyOptions inOptions, XBOX::VProgressIndicator *inProgressIndicator, bool *outUserAbort)
{
	VError err = VE_OK;

	VString destinationPath, sourcePath;
	inDestinationFolder.GetPath( destinationPath);
	inSourceFolder.GetPath( sourcePath);
	if (destinationPath.BeginsWith( sourcePath))
	{
		err = VE_UNKNOWN_ERROR;
	}
	else
	{
		if (inProgressIndicator != NULL)
		{
			sLONG filesCount = 0, foldersCount = 0;
			CountFilesAndFolders( inSourceFolder, filesCount, foldersCount, true);
			inProgressIndicator->BeginSession( filesCount, CVSTR("Copying files..."), true);
		}

		err = _CopyFolder( inSourceFolder, inDestinationFolder, inOptions, inProgressIndicator, outUserAbort);

		if (inProgressIndicator != NULL)
			inProgressIndicator->EndSession();
	}

	return err;
}


XBOX::VError VSolution::_CountFilesAndFolders( const VFolder& inFolder, sLONG& outFilesCount, sLONG &outFoldersCount, bool inRecursive)
{
	VError err = VE_OK;

	for (VFileIterator it_file( &inFolder, FI_WANT_FILES | FI_WANT_INVISIBLES) ; it_file.IsValid() && err == VE_OK ; ++it_file)
	{
		++outFilesCount;
	}

	for (VFolderIterator it_folder( &inFolder, FI_WANT_FOLDERS | FI_WANT_INVISIBLES) ; it_folder.IsValid() && err == VE_OK ; ++it_folder)
	{
		++outFoldersCount;
		if (inRecursive)
		{
			_CountFilesAndFolders( *it_folder.Current(), outFilesCount, outFoldersCount, true);
		}
	}

	return err;
}


VError VSolution::_CopyFolder( const XBOX::VFolder& inSourceFolder, XBOX::VFolder& inDestinationFolder, const XBOX::FileCopyOptions inOptions, XBOX::VProgressIndicator *inProgressIndicator, bool *outUserAbort)
{
	VError err = VE_OK;

	if (!inSourceFolder.Exists())
		err = VE_FOLDER_NOT_FOUND;

	if (err == VE_OK && !inDestinationFolder.Exists())
		err = inDestinationFolder.CreateRecursive();

	if (err == VE_OK)
	{
		bool userAbort = false;
		
		for (VFolderIterator it_folder( &inSourceFolder, FI_WANT_FOLDERS | FI_WANT_INVISIBLES) ; it_folder.IsValid() && err == VE_OK && !userAbort ; ++it_folder)
		{
			VFilePath destinationFolderPath( inDestinationFolder.GetPath());
			VString name;
			it_folder.Current()->GetName( name);
			destinationFolderPath.ToSubFolder( name);
			VFolder destinationFolder( destinationFolderPath);

			err = CopyFolder( *it_folder.Current(), destinationFolder, inOptions, inProgressIndicator, &userAbort);
		}

		for (VFileIterator it_file( &inSourceFolder, FI_WANT_FILES | FI_WANT_INVISIBLES) ; it_file.IsValid() && err == VE_OK && !userAbort ; ++it_file)
		{
			VFilePath destinationFilePath( inDestinationFolder.GetPath());
			VString name;
			it_file.Current()->GetName( name);
			destinationFilePath.SetFileName( name);
			VFile destinationFile( destinationFilePath);

			err = it_file.Current()->CopyTo( destinationFile, inOptions);

			if (inProgressIndicator != NULL && err == VE_OK)
				userAbort = inProgressIndicator->Increment();
		}

		if (outUserAbort != NULL)
			*outUserAbort = userAbort;
	}

	return err;
}


XBOX::VError VSolution::_ResolveMacro( const XBOX::VFolder& inFolder, const XBOX::VString& inMacroName, const XBOX::VString& inNewName)
{
	VError err = VE_OK;

	if (!inFolder.Exists())
		err = VE_FOLDER_NOT_FOUND;

	for (VFolderIterator it_folder( &inFolder, FI_WANT_FOLDERS | FI_WANT_INVISIBLES) ; it_folder.IsValid() && err == VE_OK ; ++it_folder)
	{
		err = _ResolveMacro( *it_folder.Current(), inMacroName, inNewName);
		
		if (err == VE_OK)
		{
			VString name;
			it_folder.Current()->GetName( name);
			if (name.Find( inMacroName) != 0)
			{
				name.ExchangeAll( inMacroName, inNewName);
				err = it_folder.Current()->Rename( name, NULL);
			}
		}
	}

	for (VFileIterator it_file( &inFolder, FI_WANT_FILES | FI_WANT_INVISIBLES) ; it_file.IsValid() && err == VE_OK ; ++it_file)
	{
		VString name;
		it_file.Current()->GetName( name);
		if (name.Find( inMacroName) != 0)
		{
			name.ExchangeAll( inMacroName, inNewName);
			err = it_file.Current()->Rename( name);
		}
	}

	return err;	
}


bool VSolution::Open()
{
	// cree les items projets depuis le fichier XML de la solution
	fSuccessfulLoading = true;

	VError err = _LoadSolutionFile();

	if (err != VE_OK)
		fSuccessfulLoading = false;

	if (fSuccessfulLoading)
	{
		_SynchronizeWithFileSystem( GetSolutionItem());

		CLanguageSyntaxComponent *languageEngine = VComponentManager::RetainComponentOfType< CLanguageSyntaxComponent >();
		if (languageEngine != NULL)
		{
			fParsingManager = languageEngine->CreateDocumentParserManager();
			ReleaseRefCountable( &languageEngine);
		}

		if (fBreakPointsManager != NULL)
		{
			fBreakPointsManager->Reset();
		}
	}
	return fSuccessfulLoading;
}


XBOX::VError VSolution::_LoadPermissions ( bool inCreateIfDoesNotExist )
{
	VProjectItem*			pItemPermissions = GetProjectItemFromTag ( kPermissionsTag );
	if ( pItemPermissions == 0 )
	{
		// Solution's waPerm is not defined. Not a big deal.
		if ( inCreateIfDoesNotExist )
		{
			fPermissions = new VValueBag ( );
			//VValueBag*		vBagPermissions = new VValueBag ( );
			//fPermissions-> AddElement ( SolutionPermissions::permissions, vBagPermissions );
			//vBagPermissions-> Release ( );
		}

		return VE_OK;
	}

	VFilePath				vPermPath;
	bool					bResult = pItemPermissions-> GetFilePath ( vPermPath );
	xbox_assert ( bResult );
	if ( !bResult )
		return VE_SOMA_FAILED_TO_LOAD_SOLUTION_PERMISSIONS;

	VError					vError = VE_OK;

	VFile					vPermFile ( vPermPath );
	if ( !vPermFile. Exists ( ) )
		// Solution permissions are referenced but are not present. Technically, not a big deal but just in case let's assert-false this - solution config might just be broken
		xbox_assert ( false );
	else
	{
		fPermissions = new VValueBag ( );
		xbox_assert ( fPermissions != 0 );
		vError = LoadBagFromXML ( vPermFile, kXML_ELEMENT_PERMISSIONS, *fPermissions, XML_ValidateNever );
	}

	return vError;
}


VError VSolution::SavePermissions ( )
{
	if ( fPermissions == 0 || !fPermissionsHaveBeenModified )
		// Permissions have never been loaded or have not been modified so there were no updates and so there is nothing to save
		return VE_OK;

	VProjectItem*			pItemPermissions = GetProjectItemFromTag ( kPermissionsTag );
	if ( pItemPermissions == 0 )
	{
		// This is the first time permissions will be written
		// Let's create a new project item and give it permissions role
		VString				vstrName;
		fSolutionItem-> GetName ( vstrName, false );
		vstrName. AppendCString ( ".waPerm" );
		pItemPermissions = VProjectItemFile::Instantiate ( vstrName, fSolutionItem );
		xbox_assert ( pItemPermissions != 0 );

		pItemPermissions-> AddTag ( kPermissionsTag );

		_DoItemAdded ( pItemPermissions, true );
	}

	VFilePath				vPermPath;
	bool					bResult = pItemPermissions-> GetFilePath ( vPermPath );
	xbox_assert ( bResult );
	if ( !bResult )
		return VE_SOMA_FAILED_TO_LOAD_SOLUTION_PERMISSIONS;

	VFile					vPermFile ( vPermPath );
	VError					vError = WriteBagToFileInXML ( *fPermissions, kXML_ELEMENT_PERMISSIONS, &vPermFile, false );

	fPermissionsHaveBeenModified = false;

	return vError;
}


VError VSolution::GetDebuggerGroup ( XBOX::VString& outName, XBOX::VUUID& outUUID )
{
	VError					vError = VE_OK;

	if ( fPermissions == 0 )
	{
		vError = _LoadPermissions ( );
		if ( fPermissions == 0 )
			return VE_SOMA_DEBUGGER_GROUP_NOT_DEFINED;
		if ( vError != VE_OK )
			return vError;
	}

	const VValueBag*		vbagDebuggerGroup = fPermissions-> RetainUniqueElementWithAttribute ( SolutionPermissions::allow, SolutionPermissions::action, CVSTR ( "debug" ) );
	if ( vbagDebuggerGroup == 0 )
		return VE_SOMA_DEBUGGER_ACTION_NOT_DEFINED;

	bool					bResult = vbagDebuggerGroup-> GetVUUID ( SolutionPermissions::groupID, outUUID );
	xbox_assert ( bResult );
	vbagDebuggerGroup-> Release ( );

	if ( !bResult )
		return VE_SOMA_DEBUGGER_GROUP_NOT_DEFINED;

	// Let's now lookup group name
	VValueBag*				vbagDirectory = RetainUserGroups ( vError );
	if ( vbagDirectory == 0 )
	{
		if ( vError == VE_OK )
			vError = VE_SOMA_DEBUGGER_GROUP_NOT_DEFINED;
	}
	else
	{
		const VBagArray*	vbarrGroups = vbagDirectory-> RetainElements ( kXML_ELEMENT_GROUP );
		vError = VE_SOMA_DEBUGGER_GROUP_NOT_DEFINED;
		if ( vbarrGroups != 0 )
		{
			for ( VIndex i = 1; i <= vbarrGroups-> GetCount ( ); i++ )
			{
				const VValueBag*		vbGroup = vbarrGroups-> GetNth ( i );
				if ( vbGroup == 0 )
					continue;

				VUUID			vIDCurrent;
				bResult = vbGroup-> GetVUUID ( kXML_ELEMENT_ID, vIDCurrent );
				xbox_assert ( bResult );
				if ( outUUID == vIDCurrent )
				{
					bResult = vbGroup-> GetString ( kXML_ELEMENT_NAME, outName );
					xbox_assert ( bResult );
					vError = VE_OK;

					break;
				}
			}
			vbarrGroups-> Release ( );
		}
		vbagDirectory-> Release ( );
	}

	return vError;
}


VValueBag* VSolution::RetainUserGroups ( VError& outError )
{
	VProjectItem*			itmDirectory = GetProjectItemFromTag ( kUAGDirectoryTag );
	if ( itmDirectory == 0 )
	{
		outError = VE_SOMA_FILE_NOT_FOUND;

		return 0;
	}

	VFilePath				vfpathDirectory;
	bool					bResult = itmDirectory-> GetFilePath ( vfpathDirectory );
	xbox_assert ( bResult );
	if ( !bResult )
	{
		outError = VE_SOMA_FILE_NOT_FOUND;

		return 0;
	}

	VValueBag*				vBagDirectory = 0;

	VFile					vfDirectory ( vfpathDirectory );
	if ( !vfDirectory. Exists ( ) )
		// Solution permissions are referenced but are not present. Technically, not a big deal but just in case let's assert-false this - solution config might just be broken
		xbox_assert ( false );
	else
	{
		vBagDirectory = new VValueBag ( );
		outError = LoadBagFromXML ( vfDirectory, kXML_ELEMENT_DIRECTORY, *vBagDirectory, XML_ValidateNever );
	}

	return vBagDirectory;
}


VError VSolution::SetDebuggerGroup ( VUUID& inUUID )
{
	VError					vError = VE_OK;

	if ( fPermissions == 0 )
	{
		vError = _LoadPermissions ( true );
		xbox_assert ( fPermissions != 0 );
		if ( fPermissions == 0 )
			return VE_SOMA_FAILED_TO_LOAD_SOLUTION_PERMISSIONS;
	}

	VValueBag*				vbagDebuggerGroup = fPermissions-> RetainUniqueElementWithAttribute ( SolutionPermissions::allow, SolutionPermissions::action, CVSTR ( "debug" ) );
	if ( vbagDebuggerGroup == 0 )
	{
		vbagDebuggerGroup = new VValueBag ( );
		fPermissions-> AddElement ( SolutionPermissions::allow, vbagDebuggerGroup );
		vbagDebuggerGroup-> SetString ( SolutionPermissions::action, "debug" );
		vbagDebuggerGroup-> SetString ( SolutionPermissions::resource, "jsRuntime" );
		vbagDebuggerGroup-> SetString ( SolutionPermissions::temporaryForcePermissions, "true" );
		vbagDebuggerGroup-> SetString ( SolutionPermissions::type, "jsDebugger" );
	}
	vbagDebuggerGroup-> SetVUUID ( SolutionPermissions::groupID, inUUID );
	vbagDebuggerGroup-> Release ( );
	fPermissionsHaveBeenModified = true;

	return vError;
}

VError VSolution::DisableDebuggerGroup ( )
{
	VError					vError = VE_OK;

	if ( fPermissions == 0 )
	{
		vError = _LoadPermissions ( );
		if ( fPermissions == 0 || vError != VE_OK )
			// If there are no permissions defined then there is nothing to disable
			return vError;
	}

	VBagArray*				vbarrAllow = fPermissions-> RetainElements ( SolutionPermissions::allow );
	if ( vbarrAllow != 0 )
	{
		for ( VIndex i = 1; i <= vbarrAllow-> GetCount ( ); i++ )
		{
			VValueBag*		vbg = vbarrAllow-> GetNth ( i );
			if ( vbg == 0 )
				continue;

			VString			vstrDebug;
			if ( vbg-> GetString ( SolutionPermissions::action, vstrDebug ) && vstrDebug. EqualToString ( CVSTR ( "debug" ) ) )
			{
				vbarrAllow-> DeleteNth ( i );
				fPermissionsHaveBeenModified = true;

				break;
			}
		}
	}

	/*VValueBag*				vbagDebuggerGroup = fPermissions-> RetainUniqueElementWithAttribute ( SolutionPermissions::allow, SolutionPermissions::action, CVSTR ( "debug" ) );
	if ( vbagDebuggerGroup != 0 )
	{
		vbagDebuggerGroup-> Destroy ( );
		vbagDebuggerGroup-> Release ( );

		fPermissionsHaveBeenModified = true;
	}*/

	return vError;
}

VError VSolution::LoadProjects()
{
	VError err = VE_OK;
	VSolutionStartupParameters *startupParams = RetainStartupParameters();

	for (VectorOfProjectsIterator iter = fProjects.begin() ; iter != fProjects.end() && err == VE_OK ; ++iter)
	{
		err = (*iter)->Load( (startupParams != NULL) ? startupParams->GetOpenProjectSymbolsTable() : true);
	}

	ReleaseRefCountable( &startupParams);

	return err;
}


VError VSolution::UnloadProjects()
{
	VError err = VE_OK;

	for (VectorOfProjectsIterator iter = fProjects.begin() ; iter != fProjects.end() ; ++iter)
	{
		(*iter)->Unload();
	}
	return err;
}


VError VSolution::StartWatchingFileSystem()
{
	VError err = VE_OK;

	for (VectorOfProjectsIterator iter = fProjects.begin() ; iter != fProjects.end() ; ++iter)
	{
		(*iter)->StartWatchingFileSystem();
	}

	if (err == VE_OK)
	{
		VFilePath path;

		if ( ! GetSolutionFolderPath(path) )
			return VE_UNKNOWN_ERROR;

		VFolder folder(path);

		err = VFileSystemNotifier::Instance()->StartWatchingForChanges( folder, VFileSystemNotifier::kAll, this, 100 );
	}

	return err;
}


VError VSolution::StopWatchingFileSystem()
{
	VError err = VE_OK;

	for (VectorOfProjectsIterator iter = fProjects.begin() ; iter != fProjects.end() ; ++iter)
	{
		(*iter)->StopWatchingFileSystem();
	}

	if (err == VE_OK)
	{
		VFilePath path;

		if ( ! GetSolutionFolderPath(path) )
			return VE_UNKNOWN_ERROR;

		VFolder folder(path);

		err = VFileSystemNotifier::Instance()->StopWatchingForChanges( folder, this );
	}

	return err;
}

void VSolution::FileSystemEventHandler( const std::vector< VFilePath > &inFilePaths, VFileSystemNotifier::EventKind inKind )
{
	if (inKind == VFileSystemNotifier::kFileModified)
	{
		for (std::vector<VFilePath>::const_iterator it = inFilePaths.begin(); it != inFilePaths.end(); ++it)
		{
			VProjectItem *item = GetProjectItemFromFullPath( (*it).GetPath() );
			if ( fSolutionItem->IsParentOf(item) && item->GetKind() != VProjectItem::ePROJECT )
			{
				// WAK0085653: Remove the following filters for recieving all the file modified notification under the solution node.
				/*
				if (	item->ConformsTo( RIAFileKind::kSolutionFileKind )
					 ||	item->ConformsTo( RIAFileKind::kUAGDirectoryFileKind )
					 ||	item->ConformsTo( RIAFileKind::kSettingsFileKind ) )
				*/
				{
					std::vector<VFilePath> pathes;

					pathes.push_back( *it );
					if (fDelegate != NULL)	// sc 15/11/2011 WAK0073846
						fDelegate->DoProjectItemsChanged( pathes );
				}
			}
		}
	}
	else
	{
		_SynchronizeWithFileSystem( GetSolutionItem());

		if (fDelegate != NULL)
			fDelegate->SynchronizeFromSolution();
	}
}



VError VSolution::StartUpdatingSymbolTable()
{
	VError err = VE_OK;

	for (VectorOfProjectsIterator iter = fProjects.begin() ; iter != fProjects.end() ; ++iter)
	{
		(*iter)->BackgroundParseFiles();
	}
	return err;
}


VError VSolution::StopUpdatingSymbolTable()
{
	VError err = VE_OK;

	for (VectorOfProjectsIterator iter = fProjects.begin() ; iter != fProjects.end() ; ++iter)
	{
		(*iter)->StopBackgroundParseFiles();
	}
	return err;
}


XBOX::VError VSolution::ParseCatalogs()
{
	VError err = VE_OK;

	VectorOfProjectItems projectItemsVector;
	fSolutionItem->GetProjectItemsVector(VProjectItem::eCATALOG_FILE, projectItemsVector, false);

	for (VectorOfProjectItemsIterator i = projectItemsVector.begin(); 
		i != projectItemsVector.end(); ++i)
	{
		err = ReloadCatalog( *i);
	}
			
	return err;
}

void VSolution::LoadFromUserFile()
{
	if (fSolutionUser)
		LoadSolutionUserFile();
}


// synchronisation de toute la solution
void VSolution::SynchronizeWithFileSystem()
{
	VSolutionFileStampSaver stampSaver(this);
	
	VError err = _SynchronizeWithFileSystem( fSolutionItem);	// sc 05/07/2012, synchronize the solution folder

	if ((err == VE_OK) && stampSaver.StampHasBeenChanged())
	{
		e_Save_Action saveAction = e_SAVE;

		if (fDelegate != NULL)
			saveAction = fDelegate->DoActionRequireSolutionFileSaving( fSolutionFileProjectItem, eSA_SynchronizeWithFileSystem, false);

		if (saveAction == e_SAVE)
			_SaveSolutionFile();
	}

	for (VectorOfProjectsIterator iter = fProjects.begin() ; iter != fProjects.end() ; ++iter)
	{
		(*iter)->SynchronizeWithFileSystem( (*iter)->GetProjectItem());
	}
}


VError VSolution::_LoadSolutionFile()
{
	VError err = VE_OK;

	VProjectItem* solutionFileProjectItem = GetSolutionFileProjectItem();

	if (solutionFileProjectItem != NULL)
	{
		VFile solutionFile(solutionFileProjectItem->GetURL());
		VValueBag *bagSolution = new VValueBag();

		{
			StErrorContextInstaller errs(false);
			err = LoadBagFromXML( solutionFile, fSolutionItem->GetXMLElementName(), *bagSolution, XML_ValidateNever);
		}
		
		if (err == VE_OK)
		{
			// -----------------------------------------------------------
			// on traite d'abord l'ensemble des projets
			// -----------------------------------------------------------
			VBagArray*	bagArrayProjects = bagSolution->RetainElements(kXML_ELEMENT_PROJECT);
			for (sLONG i = 1; i <= bagArrayProjects->GetCount(); i++)
			{
				VValueBag* bagProject = bagArrayProjects->GetNth(i);

				// recuperer le path relatif depuis le fichier solution
				VString path;
				bagProject->GetString(ProjectItemBagKeys::path, path);
				path.TrimeSpaces();

				VFilePath projectFilePath;
				BuildPathFromRelativePath( projectFilePath, path, FPS_POSIX);
				projectFilePath.GetPath( path);

				// Tester si le fichier existe avant d'aller plus loin !
				VFile file( projectFilePath);
				if (!file.Exists())
				{
					if (fSolutionMessageManager != NULL)
					{
						VString localizedMessage;
						fSolutionMessageManager->GetLocalizedStringFromError(VE_SOMA_PROJECT_FILE_NOT_FOUND, localizedMessage);
						fSolutionMessageManager->DisplayMessage(localizedMessage+"\n"+path);
					}
					continue;
				}

				VError lErr = VE_OK;
				VProject *project = VProject::Instantiate( lErr, this, projectFilePath);
				if (lErr == VE_OK && project != NULL)
				{
					_AddProject( project, true, false);
				}
				else
				{
					ReleaseRefCountable( &project);
				}
			}
			bagArrayProjects->Release();
			// -----------------------------------------------------------
			// on traite ensuite l'ensemble des fichiers
			// -----------------------------------------------------------
			std::vector<VProjectItemTag> singleFileTagsFound;
			VBagArray* bagArrayFiles = bagSolution->RetainElements(kXML_ELEMENT_FILE);
			for (sLONG i = 1; i <= bagArrayFiles->GetCount(); i++)
			{
				err = VE_OK;
				VValueBag* bagFile = bagArrayFiles->GetNth(i);
				// recuperer le path relatif depuis le fichier projet
				VString path;
				bagFile->GetString(ProjectItemBagKeys::path, path);
				path.TrimeSpaces();
				if (!path.IsEmpty())
				{
					// en deduire le path complet du fichier
					VFilePath externalFileVFilePath;
					BuildPathFromRelativePath(externalFileVFilePath, path, FPS_POSIX);
					externalFileVFilePath.GetPath(path);

					// tester si le fichier existe avant d'aller plus loin !
					VFile file(externalFileVFilePath);
					if (!file.Exists())
					{
						err = VE_SOMA_SETTINGS_FILE_NOT_FOUND;
						VErrorBase* errorBase = new VErrorBase(err, 0);
						errorBase->GetBag()->SetString(kSOMA_FILE_FULL_PATH, path);
						VTask::GetCurrent()->PushRetainedError(errorBase);
						continue;
					}
					else
					{
						VProjectItem *projectItem = GetProjectItemFromFilePath( externalFileVFilePath);

						if (projectItem == NULL)
						{
							// either the physical file is outside the solution folder or the physical file doesn't exist
							VFilePath solutionFolderPath;
							GetSolutionFolderPath( solutionFolderPath);
							if (externalFileVFilePath.IsChildOf( solutionFolderPath))
							{
								VError lError = VE_OK;
								projectItem = _CreateFileItemFromPath( lError, externalFileVFilePath, true, false);
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
							VBagArray *tagArray = bagFile->RetainElements( kXML_ELEMENT_TAG);
							if (tagArray != NULL)
							{
								for (VIndex pos = 1 ; pos <= tagArray->GetCount() ; ++pos)
								{
									VProjectItemTag tagName = ProjectItemBagKeys::name.Get( tagArray->GetNth( pos));
									if (VProjectItemTagManager::Get()->IsRegisteredProjectItemTag( tagName))
									{
										// Sanity check
										if (	((VProjectItemTagManager::Get()->GetProperties( tagName) & ePITP_ApplyToSingleFile) != 0)
											||	((VProjectItemTagManager::Get()->GetProperties( tagName) & ePITP_ApplyToSingleFolder) != 0) 
											||	(tagName == kSettingTag))
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

							if (projectItem->IsTagged())
								_ReferenceItem( projectItem, false);
						}
					}
				}
			}
			ReleaseRefCountable( &bagArrayFiles);
		}
		else
		{
			err = VE_SOMA_SOLUTION_FILE_COULD_NOT_OPENED;
		}
		ReleaseRefCountable( &bagSolution);
	}

	return err;
}


// CreatePhysicalItem cree la representation physique d'un projectItem
// ex: un fichier sur disque, une table dans le catalogue
// les informations necessaires sont fournies par le VProjectItem en entree
VError VSolution::CreatePhysicalItem(VProjectItem* inNewProjectItem, const VString& inSubType)
{
	VError err = VE_OK;

	if (inNewProjectItem->GetParent()->GetKind() == VProjectItem::eSOLUTION)
		if (inNewProjectItem->GetKind() != VProjectItem::ePROJECT)
			return VE_INVALID_PARAMETER;		

	if (inNewProjectItem != NULL)
	{
		if (fDelegate != NULL)
			fDelegate->DoStartPossibleLongTimeOperation();

        // creer l'item physique correspondant
		if (!inNewProjectItem->ContentExists())
		{
			if (inNewProjectItem->CreatePhysicalItem())
			{
				_InitializeProjectItem(inNewProjectItem, inSubType);
			}
			else
			{
				err = VE_SOMA_FILE_COULD_NOT_BE_CREATED;	
				if (fSolutionMessageManager)
				{
					VString localizedMessage;
					fSolutionMessageManager->GetLocalizedStringFromError(VE_SOMA_FILE_COULD_NOT_BE_CREATED, localizedMessage);
					fSolutionMessageManager->DisplayMessage(localizedMessage);
				}
			}
		}
		else
		{
			err = VE_SOMA_FILE_ALREADY_EXISTS;
			if (fSolutionMessageManager)
			{
				VString localizedMessage;
				fSolutionMessageManager->GetLocalizedStringFromError(VE_SOMA_FILE_ALREADY_EXISTS, localizedMessage);
				fSolutionMessageManager->DisplayMessage(localizedMessage);
			}
		}

		if (fDelegate != NULL)
			fDelegate->DoEndPossibleLongTimeOperation();
	}

	return err;
}

VError VSolution::InitializeDefaultFileContent( const VFilePath& inPath, const VString& inSubType )
{
	VError err = VE_OK;

	VString strExtension, strInitialization;

	inPath.GetExtension(strExtension);
	
	if (strExtension == RIAFileKind::kHTMLFileExtension)
	{
		VFolder* resourcesFolder = VProcess::Get()->RetainFolder( VProcess::eFS_Resources);
		VFilePath sourcePath;
		resourcesFolder->GetPath( sourcePath);
		resourcesFolder->Release();

		sourcePath.ToSubFolder( VString( DEFAULT_FILES_PATH ));
		if ( inSubType.IsEmpty() )
			sourcePath.ToSubFile( VString( INTRO_HTML_BASIC ));
		else
			sourcePath.ToSubFile( inSubType );

		VFile sourceFile( sourcePath );
		VMemoryBuffer<> buffer;
		sourceFile.GetContent( buffer );
		strInitialization.FromBlock( buffer.GetDataPtr(), buffer.GetDataSize(), XBOX::VTC_UTF_8);

		VString	newTitle;
		inPath.GetFileName(newTitle, false);
		newTitle.TranscodeToXML();
		newTitle.Insert(CVSTR("<title>"), 1);
		newTitle += CVSTR("</title>");
		strInitialization.Exchange( CVSTR("<title></title>"), newTitle);
	}
	else if (strExtension == RIAFileKind::kXMLFileExtension)
		strInitialization.FromCString(INTRO_XML_UTF8);
	else if (strExtension == RIAFileKind::kJSFileExtension)
	{
		VFolder* resourcesFolder = VProcess::Get()->RetainFolder( VProcess::eFS_Resources);
		VFilePath sourcePath;
		resourcesFolder->GetPath( sourcePath);
		resourcesFolder->Release();

		sourcePath.ToSubFolder( VString( DEFAULT_FILES_PATH ));
		sourcePath.ToSubFile( inSubType != ""?inSubType: INTRO_JS);

		VFile sourceFile( sourcePath );
		VFileStream stream( &sourceFile );
		VError err = stream.OpenReading();
		if ( VE_OK == err )
		{
			stream.GuessCharSetFromLeadingBytes( VTC_DefaultTextExport );
			stream.GetText( strInitialization );
		}

		if ((inSubType == INTRO_MODULE_JS) || (inSubType == INTRO_MODULE_RPC) || (inSubType == INTRO_MODULE_SERVICE))
		{
			VString modulePath;
			inPath.GetFileName( modulePath, false);
			strInitialization.ExchangeAll( L"$(modulePath)", modulePath);
		}
	}
	else if (strExtension == RIAFileKind::kCSSFileExtension)
		strInitialization.FromCString(INTRO_CSS);
	else if (strExtension == RIAFileKind::kPHPFileExtension)
		strInitialization.FromCString(INTRO_PHP);
	else if (strExtension == RIAFileKind::kCatalogFileExtension)
		strInitialization.FromCString(INTRO_CATALOG);
	else if (strExtension == RIAFileKind::kRemoteCatalogFileExtension)
		strInitialization.FromCString(INTRO_REMOTECATALOG);
	else if (strExtension == RIAFileKind::kRemoteConfigFileExtension)
		strInitialization.FromCString(INTRO_REMOTECONFIG);
	else if (strExtension == RIAFileKind::kPermissionsFileExtension)
		strInitialization.FromCString(INTRO_PERM);

	if (!strInitialization.IsEmpty())
	{
		VFile file(inPath);
		VFileStream stream( &file );
		err = stream.OpenWriting();

		if ( VE_OK == err )
		{
			stream.SetSize( 0 );
			stream.SetCharSet( VTC_UTF_8 );
			stream.SetCarriageReturnMode( eCRM_NATIVE );
			stream.WriteBOM();
			stream.PutText( strInitialization );
			stream.CloseWriting();
		}
	}
	return err;
}


void VSolution::_SetSolutionItem( VProjectItem *inProjectItem)
{
	if (testAssert(fSolutionItem == NULL && inProjectItem != NULL))
	{
		fSolutionItem = RetainRefCountable( inProjectItem);

		VProjectItemSolution *solutionBehaviour = dynamic_cast<VProjectItemSolution*>(fSolutionItem->GetBehaviour());
		if (testAssert(solutionBehaviour != NULL))
			solutionBehaviour->SetSolution( this);

		_RegisterProjectItem( fSolutionItem);
	}
}


void VSolution::_SetSolutionFileItem( VProjectItem *inProjectItem)
{
	if (testAssert(fSolutionFileProjectItem == NULL && inProjectItem != NULL))
	{
		fSolutionFileProjectItem = RetainRefCountable( inProjectItem);
		_RegisterProjectItem( fSolutionFileProjectItem);

		if (fSolutionItem != NULL)
			fSolutionItem->AttachChild( fSolutionFileProjectItem);
	}
}


void VSolution::_AddProject( VProject *inProject, bool inReferenceIt, bool inTouchSolutionFile)
{
	if (inProject != NULL)
	{
		if (testAssert(std::find( fProjects.begin(), fProjects.end(), inProject) == fProjects.end()))
		{
			fProjects.push_back(inProject);

			if (testAssert(inProject->GetProjectItem() != NULL))
			{
				fSolutionItem->AttachChild( inProject->GetProjectItem());
				if (inReferenceIt)
				{
					_ReferenceItem( inProject->GetProjectItem(), inTouchSolutionFile);
				}
			}
		}
	}
}


VError VSolution::_RemoveProject( VProject *inProject, bool inDeleteProjectFolder, bool inTouchSolutionFile)
{
	VError err = VE_OK;

	if (inProject != NULL)
	{
		if (std::find( fProjects.begin(), fProjects.end(), inProject) != fProjects.end())
		{
			VFilePath projectFolderPath;
			
			inProject->GetProjectFolderPath( projectFolderPath);
			inProject->StopWatchingFileSystem();
			inProject->StopBackgroundParseFiles();
			inProject->Unload();

			_RemoveProject( inProject, inTouchSolutionFile);

			if (inDeleteProjectFolder)
			{
				VFolder folder( projectFolderPath);
				folder.Delete( true);
			}
			
			// Notify solution explorer delegates that project has been deleted
			if (fDelegate != NULL)
				fDelegate->DoProjectFileDeleted();
		}
		else
		{
			err = VE_SOMA_UNKNOWN_PROJECT;
		}
	}
	return err;
}


void VSolution::_RemoveProject( VProject *inProject, bool inTouchSolutionFile)
{
	if (inProject != NULL)
	{
		VectorOfProjectsIterator found = std::find( fProjects.begin(), fProjects.end(), inProject);
		if (testAssert(found != fProjects.end()))
		{
			if (testAssert(inProject->GetProjectItem() != NULL))
			{
				_UnreferenceItem( inProject->GetProjectItem(), inTouchSolutionFile);

				fSolutionItem->DetachChild( inProject->GetProjectItem());
			}

			fProjects.erase( found);
		}
	}
}


void VSolution::_DoItemAdded( VProjectItem *inItem, bool inTouchSolutionFile)
{
	_RegisterProjectItem( inItem);

	// Append the item
	if (inItem->IsTagged() && !_IsItemReferenced( inItem))
		_ReferenceItem( inItem, inTouchSolutionFile);

	// Append child items
	for (VProjectItemIterator iter(inItem) ; iter.IsValid() ; ++iter)
	{
		_DoItemAdded( iter, inTouchSolutionFile);
	}
}


void VSolution::_DoItemRemoved( VProjectItem *inItem, bool inTouchSolutionFile)
{
	// Remove the children
	for (VProjectItemIterator iter(inItem) ; iter.IsValid() ; ++iter)
	{
		_DoItemRemoved( iter, inTouchSolutionFile);
	}

	// Remove the item
	if (_IsItemReferenced( inItem))
		_UnreferenceItem( inItem, inTouchSolutionFile);

	_UnregisterProjectItem( inItem);
}


bool VSolution::_RegisterProjectItem( VProjectItem *inItem)
{
	bool result = false;
	
	if (inItem != NULL)
	{
		VURL url;
		if (inItem->GetURL( url) && !url.IsEmpty())
		{
			VString urlString;
			url.GetAbsoluteURL( urlString, true);
			MapOfProjectItemByURL::iterator found = fProjectItemsMapByURL.find( urlString);
			if (found == fProjectItemsMapByURL.end())
			{
				fProjectItemsMapByURL.insert( MapOfProjectItemByURL::value_type( urlString, inItem));
				result = true;
			}
		}
	}
	return result;
}


bool VSolution::_UnregisterProjectItem( VProjectItem *inItem)
{
	bool result = false;
	
	if (inItem != NULL)
	{
		VURL url;
		if (inItem->GetURL( url) && !url.IsEmpty())
		{
			VString urlString;
			url.GetAbsoluteURL( urlString, true);
			MapOfProjectItemByURL::iterator found = fProjectItemsMapByURL.find( urlString);
			if (found != fProjectItemsMapByURL.end())
			{
				fProjectItemsMapByURL.erase( found);
				result = true;
			}
		}
	}
	return result;
}


VProjectItem* VSolution::_GetProjectItemFromURL( const XBOX::VURL& inURL) const
{
	VProjectItem *item = NULL;

	if (!inURL.IsEmpty())
	{
		VString urlString;
		inURL.GetAbsoluteURL( urlString, true);
		MapOfProjectItemByURL::const_iterator found = fProjectItemsMapByURL.find( urlString);
		if (found != fProjectItemsMapByURL.end())
			item = (*found).second;
	}

	return item;
}


VError VSolution::_SynchronizeWithFileSystem( VProjectItem *inItem)
{
	VError err = VE_OK;

	// Synchronize the children and check for deleted items
	VectorOfProjectItems deletedItems;

	for (VProjectItemIterator iter(inItem) ; iter.IsValid() && (err == VE_OK) ; ++iter)
	{
		if (iter == fSolutionFileProjectItem)
			continue;

		if (iter->GetKind() == VProjectItem::ePROJECT)
			continue;
		
		if (iter->IsPhysicalLinkValid() && _IsItemReferenced( iter)  && !iter->ContentExists()) // if file is referenced (role is set), just ignore it
		{
			iter->SetPhysicalLinkValid( false);
			iter->Touch();	// sc 08/11/2012 WAK0078737
			continue;
		}

		if (!iter->IsPhysicalLinkValid())
		{
			if (iter->ContentExists())
			{
				iter->SetPhysicalLinkValid( true);
				iter->Touch();	// sc 08/11/2012 WAK0078737
			}
			else
			{
				continue;
			}
		}

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
	
		(*iter)->DeleteChildren();
	}
	
	if ( deletedPathes.size() && fDelegate )
		fDelegate->DoProjectItemsDeleted( deletedPathes );

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
				// Build the list of projects folder
				std::vector< VRefPtr<VFolder> > projectsFolders;

				for (VectorOfProjectsIterator projectIter = fProjects.begin() ; projectIter != fProjects.end() ; ++projectIter)
				{
					VFilePath projectFolderPath;
					if ((*projectIter)->GetProjectFolderPath( projectFolderPath))
						projectsFolders.push_back( VRefPtr<VFolder>( new VFolder( projectFolderPath), false));
				}

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

						// projects folder synchronisation is done by the projects themselves, so we ignore them
						bool isProjectFolder = false;

						for (std::vector< VRefPtr<VFolder> >::iterator projectFolderIter = projectsFolders.begin() ; (projectFolderIter != projectsFolders.end()) && !isProjectFolder ; ++projectFolderIter)
							isProjectFolder = (*projectFolderIter)->IsSameFolder( &(*folderIter));

						if (!isProjectFolder)
						{
							// Check whether the child folder exists
							VString relativePath( folderName);
							relativePath += FOLDER_SEPARATOR;
							VProjectItem *folderItem = inItem->FindChildByRelativePath( relativePath, eURL_NATIVE_STYLE);
							if (folderItem == NULL)
							{
								folderItem = VProjectItemFolder::Instantiate( folderName, inItem);
								if (folderItem != NULL)
								{
									_DoItemAdded( folderItem, true);
									err = _SynchronizeWithFileSystem( folderItem);
								}
							}
						}
					}

					for (VFileIterator fileIter( folder, FI_WANT_FILES | FI_WANT_INVISIBLES) ; fileIter.IsValid() && (err == VE_OK) ; ++fileIter )
					{
						VString fileName;
						fileIter->GetName( fileName);
						if (fileName == CVSTR( ".DS_Store" ) )
							continue;

						if (fileName == CVSTR( "sessionID.json" ) )
							continue;

						if (fileName == CVSTR( "breakpoints.json" ) )
							continue;

						if (fileName.BeginsWith( CVSTR( "studio_log" ), true))
							continue;

						if (	fileIter->ConformsTo( RIAFileKind::kSolutionFileKind)
							||	fileIter->ConformsTo( RIAFileKind::kUAGCacheFileKind)
							||	fileIter->ConformsTo( RIAFileKind::kMatchFileKind)
							||	fileIter->ConformsTo( RIAFileKind::kStudioPreferencesFileKind)
							||	fileIter->MatchExtension( L"waPreferences") )	// TBD: a file kind is missing
						{
							continue;
						}
						
						// Check whether the child file exists
						VString relativePath( fileName);
						VProjectItem *fileItem = inItem->FindChildByRelativePath( relativePath, eURL_NATIVE_STYLE);
						if (fileItem == NULL)
						{
							fileItem = VProjectItemFile::Instantiate( fileName, inItem);
							if (fileItem != NULL)
							{
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


void VSolution::_TouchSolutionFile()
{
	++fSolutionFileDirtyStamp;
}


VError VSolution::_InitializeProjectItem(VProjectItem* inProjectItem, const VString& inSubType)
{
	VError err = VE_OK;

	if (inProjectItem != NULL)
	{
		if (inProjectItem->IsPhysicalFile())
		{
			VFilePath filePath;
			inProjectItem->GetFilePath(filePath);
			err = InitializeDefaultFileContent( filePath, inSubType );
		}
	}

	// retour code erreur : success
	return err;
}


VProjectItem* VSolution::ImportExistingFile( XBOX::VError& outError, const XBOX::VFilePath& inDestinationPath, const XBOX::VFilePath& inSourceFilePath)
{
	VProjectItem *result = NULL;
	outError = VE_OK;
	
	VFile sourceFile( inSourceFilePath);
	if (sourceFile.Exists())
	{
		outError = sourceFile.CopyTo( inDestinationPath, NULL);

		if (outError == VE_OK)
		{
			result = CreateFileItemFromPath( outError, inDestinationPath, false);
		}
	}
	else
	{
		outError = VE_FILE_NOT_FOUND;
	}

	return result;
}


VProjectItem* VSolution::ImportExistingFolder( XBOX::VError& outError, VProjectItem *inParentItem, const XBOX::VFilePath& inSourceFolderPath)
{
	VProjectItem *result = NULL;
	outError = VE_OK;
	
	if (inParentItem != NULL)
	{
		VFolder sourceFolder( inSourceFolderPath);
		if (sourceFolder.Exists())
		{
			VFilePath destinationPath;
			if (inParentItem->GetFilePath( destinationPath) && destinationPath.IsFolder())
			{
				if ((destinationPath == inSourceFolderPath) || destinationPath.IsChildOf( inSourceFolderPath))
				{
					outError = VE_SOMA_DEST_FOLDER_IS_SUBFOLDER_OF_SRC_FOLDER;
				}
				else
				{
					VString folderName;
					inSourceFolderPath.GetFolderName( folderName);
					destinationPath.ToSubFolder( folderName);

					outError = sourceFolder.CopyContentsTo( VFolder( destinationPath), FCP_SkipInvisibles );
					if (outError == VE_OK)
					{
						result = CreateFolderItemFromPath( outError, destinationPath, false, true);
					}
				}
			}
			else
			{
				outError = VE_FOLDER_NOT_FOUND;
			}
		}
		else
		{
			outError = VE_FOLDER_NOT_FOUND;
		}
	}

	return result;
}


VProjectItem* VSolution::ReferenceExternalFolder( XBOX::VError& outError, VProjectItem *inParentItem, const XBOX::VURL& inURL)
{
	outError = VE_OK;
	VProjectItem *result = NULL;

	if (inParentItem != NULL)
	{
		VProject *project = inParentItem->GetProjectOwner();
		if (project != NULL)
			result = project->ReferenceExternalFolder( outError, inParentItem, inURL);
		else
			outError = VE_UNKNOWN_ERROR;
	}
	return result;
}


VProjectItem* VSolution::ReferenceExternalFile( XBOX::VError& outError, VProjectItem *inParentItem, const XBOX::VURL& inURL)
{
	outError = VE_OK;
	VProjectItem *result = NULL;

	if (inParentItem != NULL)
	{
		VProject *project = inParentItem->GetProjectOwner();
		if (project != NULL)
			result = project->ReferenceExternalFile( outError, inParentItem, inURL);
		else
			outError = VE_UNKNOWN_ERROR;
	}
	return result;
}


VProjectItem* VSolution::CreateFileItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive)
{
	return _CreateFileItemFromPath( outError, inPath, inRecursive, true);
}


VProjectItem* VSolution::CreateFolderItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive, bool inSynchronizeWithFileSystem)
{
	return _CreateFolderItemFromPath( outError, inPath, inRecursive, true, inSynchronizeWithFileSystem);
}


VProject* VSolution::AddExistingProject(const VURL& inProjectFileURL, bool inReferenceIt)
{
	if (IsProjectInSolution(inProjectFileURL))
	{
		if (fSolutionMessageManager)
		{
			VString localizedMessage;
			fSolutionMessageManager->GetLocalizedStringFromResourceName(kSOMA_PROJECT_ALREADY_EXISTS, localizedMessage);
			fSolutionMessageManager->DisplayMessage(localizedMessage);
		}
		return NULL;
	}

	VError lErr = VE_OK;
	VFilePath projectFilePath;
	inProjectFileURL.GetFilePath( projectFilePath);
	VProject *project = VProject::Instantiate(lErr, this, projectFilePath);
	if (lErr == VE_OK && project != NULL)
	{
		e_Save_Action saveAction = e_SAVE;

		if (fDelegate != NULL)
			saveAction = fDelegate->DoActionRequireSolutionFileSaving( fSolutionFileProjectItem, eSA_AppendProject, true);

		if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
		{
			VSolutionFileStampSaver stampSaver( this);
			VSolutionStartupParameters *startupParams = RetainStartupParameters();
			
			_AddProject( project, inReferenceIt, true);

			project->Load( (startupParams != NULL) ? startupParams->GetOpenProjectSymbolsTable() : true);

			if ((saveAction == e_SAVE) && stampSaver.StampHasBeenChanged())
				_SaveSolutionFile();

			ReleaseRefCountable( &startupParams);
		}
		else
		{
			ReleaseRefCountable( &project);
		}
	}
	else
	{
		ReleaseRefCountable( &project);
	}

	return project;
}


VError VSolution::RemoveProject( VProject *inProject, bool inDeleteProjectFolder)
{
	VError err = VE_OK;

	if (inProject != NULL)
	{
		e_Save_Action saveAction = e_SAVE;

		if (fDelegate != NULL)
			saveAction = fDelegate->DoActionRequireSolutionFileSaving( fSolutionFileProjectItem, eSA_RemoveProject, true);

		if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
		{
			VSolutionFileStampSaver stampSaver( this);

			_RemoveProject( inProject, inDeleteProjectFolder, true);

			// Save the solution file
			if ((saveAction == e_SAVE) && stampSaver.StampHasBeenChanged())
				_SaveSolutionFile();
		}
	}
	return err;
}


bool VSolution::IsProjectInSolution(const VURL& inProjectFileURL) const
{
	VFilePath projectFilePath;
	inProjectFileURL.GetFilePath(projectFilePath);	
	VString strProjectFileFullPath;
	projectFilePath.GetPath(strProjectFileFullPath);

	bool found = false;

	for (VectorOfProjectsConstIterator iter = fProjects.begin() ; iter != fProjects.end() && !found ; ++iter)
	{
		VString strProjectPath;
		(*iter)->GetProjectItemProjectFile()->BuildFullPath(strProjectPath);
		if (strProjectFileFullPath == strProjectPath)
			found = true;
	}
	return found;
}


bool VSolution::ContainsProject(VProjectItem* inProjectItem) const
{
	bool found = false;

	if (inProjectItem->GetKind() == VProjectItem::ePROJECT)	
	{
		for (VectorOfProjectsConstIterator it = fProjects.begin(); it != fProjects.end(); ++it)
		{
			if ((*it)->GetProjectItem() == inProjectItem)
			{
				found = true;
				break;
			}
		}
	}

	return found;
}


XBOX::VError VSolution::RemoveItem( VProjectItem *inProjectItem, bool inDeletePhysicalItems)
{
	VectorOfProjectItems items( 1, inProjectItem);
	return RemoveItems( items, inDeletePhysicalItems);
}


XBOX::VError VSolution::RemoveItems( const VectorOfProjectItems& inProjectItems, bool inDeletePhysicalItems)
{
	VError err = VE_OK;
	e_Save_Action saveAction = e_SAVE;

	if ((fDelegate != NULL) && _IsVectorContainsReferencedItems( inProjectItems, true))
		saveAction = fDelegate->DoActionRequireSolutionFileSaving( fSolutionFileProjectItem, eSA_RemoveItem, true);

	if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
	{
		VSolutionFileStampSaver stampSaver( this);
		VectorOfProjectItems items( inProjectItems.begin(), inProjectItems.end());
		
		VProjectItemTools::RemoveUselessItems( items);

		for (VectorOfProjectItemsIterator itemIter = items.begin() ; itemIter != items.end() ; ++itemIter)
		{
			if ((*itemIter != fSolutionItem) && (*itemIter != fSolutionFileProjectItem))
			{
				if ((*itemIter)->GetSolutionOwner() == this)
				{
					VProject *projectOwner = (*itemIter)->GetProjectOwner();

					if ((*itemIter)->GetKind() == VProjectItem::ePROJECT)
					{
						// remove the project from the solution
						VProject *project = (*itemIter)->GetBehaviour()->GetProject();
						if (testAssert(project != NULL))
						{
							_RemoveProject( project, inDeletePhysicalItems, true);
							ReleaseRefCountable( &project);
						}
						(*itemIter)->SetGhost(true);
						(*itemIter)->DeleteChildren();
						(*itemIter)->Release();
					}
					else if (projectOwner == NULL)
					{
						// remove an item owned by the solution
						_DoItemRemoved( *itemIter, true);

						if (inDeletePhysicalItems)
							(*itemIter)->DeleteContent();

						(*itemIter)->SetGhost(true);
						(*itemIter)->DeleteChildren();
						(*itemIter)->Release();
					}
					else
					{
						// forward to project owner
						err = projectOwner->RemoveItem( *itemIter, inDeletePhysicalItems);
					}
				}
			}
		}

		if ((saveAction == e_SAVE) && stampSaver.StampHasBeenChanged())
			_SaveSolutionFile();
	}
	return err;
}


XBOX::VError VSolution::RenameItem( VProjectItem *inProjectItem, const XBOX::VString& inNewName)
{
	VError err = VE_OK;

	if (inProjectItem != NULL)
	{
		if ((inProjectItem == fSolutionItem) || (inProjectItem == fSolutionFileProjectItem))
		{
			VString name( inNewName);
			VString extension( L"." + RIAFileKind::kSolutionFileExtension);
			if (name.EndsWith( extension))
				name.Truncate( name.GetLength() - extension.GetLength());

			inProjectItem->SetName( name );
			err = Rename( name);
		}
		else
		{
			if (inProjectItem->GetSolutionOwner() == this)
			{
				VProject *projectOwner = inProjectItem->GetProjectOwner();

				if (inProjectItem->GetKind() == VProjectItem::ePROJECT)
				{
					// rename a project
					VSolutionFileStampSaver stampSaver( this);
					e_Save_Action saveAction = e_SAVE;

					if (fDelegate != NULL)
						saveAction = fDelegate->DoActionRequireSolutionFileSaving( fSolutionFileProjectItem, eSA_RenameProject, true);

					if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
					{
						VProject *project = inProjectItem->GetBehaviour()->GetProject();
						if (testAssert(project != NULL))
						{
							VString name( inNewName);
							VString extension( L"." + RIAFileKind::kProjectFileExtension);
							if (name.EndsWith( extension))
								name.Truncate( name.GetLength() -  extension.GetLength());
							
							err = project->Rename( name);

							inProjectItem->SetName( name );
							
							if (err == VE_OK)
								_TouchSolutionFile();
						}
					}

					if ((saveAction == e_SAVE) && stampSaver.StampHasBeenChanged())
						_SaveSolutionFile();

				}
				else if (projectOwner == NULL)
				{
					// rename a project owned by the solution
					VSolutionFileStampSaver stampSaver( this);
					e_Save_Action saveAction = e_SAVE;

					VString name;
					inProjectItem->GetName( name);
					if (name != inNewName)
					{
						if ((fDelegate != NULL) && _IsItemReferenced( inProjectItem))
							saveAction = fDelegate->DoActionRequireSolutionFileSaving( fSolutionFileProjectItem, eSA_RenameItem, true);

						if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
						{
							_DoItemRemoved( inProjectItem, true);

							err = inProjectItem->RenameContent( inNewName);
							if (err == VE_OK)
								inProjectItem->Touch();

							_DoItemAdded( inProjectItem, true);
						}
					}

					if ((saveAction == e_SAVE) && stampSaver.StampHasBeenChanged())
						_SaveSolutionFile();
				}
				else
				{
					// forward to project owner
					err = projectOwner->RenameItem( inProjectItem, inNewName);
				}
			}
		}
	}

	return err;
}


void VSolution::UpdateSolutionLinkFile()
{
	VSolutionStartupParameters *startupParams = RetainStartupParameters();
	if ((startupParams != NULL) && startupParams->GetStoreInLinkFile())
	{
		VString strSolutionName;
		fSolutionItem->GetDisplayName(strSolutionName);
		SaveSolutionStartupParametersToLinkFile( strSolutionName, *startupParams);
	}
	QuickReleaseRefCountable( startupParams);
}


VError VSolution::ReloadCatalog(VProjectItem* inProjectItem)
{
	VError err = VE_OK;

	if (inProjectItem->ConformsTo( RIAFileKind::kCatalogFileKind) || inProjectItem->ConformsTo(RIAFileKind::kRemoteCatalogFileKind))
	{
		VCatalog* catalog = inProjectItem->GetBehaviour()->GetCatalog();
		if (catalog)
		{
			inProjectItem->DeleteChildren();
			err = catalog->ParseCatalogAndCreateProjectItems();
		}
	}

	return err;
}

void VSolution::SaveProjectItemPosition( const VFilePath& inFilePath, bool inMaximized, sLONG inX, sLONG inY, sLONG inWidth, sLONG inHeight )
{
	if ( fSolutionUser )
		fSolutionUser->SaveProjectItemPosition( inFilePath, inMaximized, inX, inY, inWidth, inHeight );
}

bool VSolution::GetProjectItemPosition( const VFilePath& inFilePath, bool& outMaximized, sLONG& outX, sLONG& outY, sLONG& outWidth, sLONG& outHeight )
{
	if ( fSolutionUser )
		return fSolutionUser->GetProjectItemPosition( inFilePath, outMaximized, outX, outY, outWidth, outHeight );
	else
		return false;
}


void VSolution::SetSolutionStartupParameters(VSolutionStartupParameters* inSolutionStartupParameters)
{
	XBOX::CopyRefCountable(&fSolutionStartupParameters, inSolutionStartupParameters);
}

void VSolution::ForceSavingSolutionFile(VProjectItem* inProjectItem, const VProjectItemTag& inTag)
{
	e_Save_Action saveAction = e_SAVE;

	if (GetDelegate() != NULL)
		saveAction = GetDelegate()->DoActionRequireSolutionFileSaving( inProjectItem, eSA_ChangeTag, true);

	if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
	{
		VSolutionFileStampSaver stampSaver(this);
		inProjectItem->AddTag( inTag);
		_ReferenceItem( inProjectItem, true);
		inProjectItem->Touch();

		if ((saveAction == e_SAVE) && stampSaver.StampHasBeenChanged()) 
			_SaveSolutionFile();
	}
}

void VSolution::GetPreferencesUserFilePath( VFilePath& outPath )
{
	fSolutionItem->GetURL().GetFilePath(outPath);
	VString fileName;
	fSolutionItem->GetDisplayName(fileName);
	fileName += ".";
	VString userName;
	VSystem::GetLoginUserName(userName);
	fileName += userName;
	fileName += ".";
	fileName += RIAFileKind::kPreferencesFileExtension;
	outPath.SetFileName( fileName );
}


void VSolution::LoadSolutionUserFile()
{
	if (fSolutionUser)
	{
		VFilePath path;
		GetPreferencesUserFilePath(path);
		VFile userFile(path);
		fSolutionUser->LoadFromUserFile(userFile);
	}
}

void VSolution::SaveSolutionUserFile()
{
	if (fSolutionUser)
	{
		VFilePath path;
		GetPreferencesUserFilePath(path);
		VFile userFile(path);
		fSolutionUser->SaveToUserFile(userFile);
	}
}

VSolutionStartupParameters* VSolution::RetainStartupParameters()
{
	if (fSolutionStartupParameters == NULL)
	{
		fSolutionStartupParameters = new VSolutionStartupParameters();
		if (fSolutionStartupParameters != NULL)
		{
			VProjectItem *solutionFileProjectItem = GetSolutionFileProjectItem();
			if (solutionFileProjectItem != NULL)
			{
				VFile *solutionFile = new VFile( solutionFileProjectItem->GetURL());
				fSolutionStartupParameters->SetSolutionFileToOpen( solutionFile);
				QuickReleaseRefCountable( solutionFile);
			}
		}
	}

	return RetainRefCountable( fSolutionStartupParameters);
}

VError VSolution::DoSolutionWillClose()
{
	VError err = VE_OK;

	if (fSuccessfulLoading)
	{
		for (VectorOfProjectsIterator iter = fProjects.begin() ; (iter != fProjects.end()) && (err == VE_OK) ; ++iter)
		{
			err = (*iter)->DoProjectWillClose();
		}

		if (err == VE_OK)
		{
			if (fSolutionFileDirtyStamp > 0)
			{
				if (fDelegate != NULL)
				{
					e_Save_Action saveAction = fDelegate->DoActionRequireSolutionFileSaving( fSolutionFileProjectItem, eSA_BeforeClosing, true);

					if ((saveAction == e_SAVE) || (saveAction == e_NO_SAVE))
					{
						if (saveAction == e_SAVE)
							err = _SaveSolutionFile();
					}
					else
					{
						err = VE_USER_ABORT;
					}
				}
			}
		}
	}

	return err;
}


VError VSolution::Close()
{
	for (VectorOfProjectsIterator iter = fProjects.begin() ; iter != fProjects.end() ; ++iter)
	{
		(*iter)->Close();
	}

	ReleaseRefCountable( &fParsingManager);

	return VE_OK;
}

void VSolution::FillWidgetsAndThemesFolder( const VFilePath& inProjectFilePath )
{
#if WITH_WIDGETS_AND_THEMES_IN_PROJECT
	VError err;

	// Create the Themes folder
	VFilePath themesFolderPath( inProjectFilePath );
	themesFolderPath.ToSubFolder( "Themes" );
	VFolder themesFolder( themesFolderPath );
	if ( !themesFolder.Exists() )
	{
		err = themesFolder.Create();
		if ( err == VE_OK && GetDelegate() != NULL )
			GetDelegate()->DoCopyFolderFromFileSystem( themesFolder, CVSTR( "/THEMES_CUSTOM/" ) );
	}

	// Create the Widgets folders
	VFilePath widgetsFolderPath( inProjectFilePath );
	widgetsFolderPath.ToSubFolder( "Widgets" );
	VFolder widgetsFolder( widgetsFolderPath );
	if ( !widgetsFolder.Exists() )
	{
		err = widgetsFolder.Create();
		if ( err == VE_OK && GetDelegate() != NULL )
			GetDelegate()->DoCopyFolderFromFileSystem( widgetsFolder, CVSTR( "/WIDGETS_CUSTOM/" ) );
	}
#endif
}


VProject* VSolution::CreateProjectFromTemplate( VError& outError, const VFolder& inParentFolder, const VString& inProjectName, const VFolder& inProjectTemplateFolder)
{
	if (!inProjectTemplateFolder.Exists() || !inParentFolder.Exists())
	{
		outError = VE_FOLDER_NOT_FOUND;
		return NULL;
	}

	if (!inProjectTemplateFolder.Contains(RIAFileKind::kProjectFileExtension))
	{
		outError = VE_SOMA_PROJECT_FILE_NOT_FOUND;
		return NULL;
	}

	if (inProjectName.IsEmpty())
	{
		outError = VE_UNKNOWN_ERROR;
		return NULL;
	}

	e_Save_Action saveAction = e_SAVE;
	
	if (fDelegate != NULL)
		saveAction = fDelegate->DoActionRequireSolutionFileSaving( fSolutionFileProjectItem, eSA_CreateProject, true);

	if ((saveAction != e_SAVE) && (saveAction != e_NO_SAVE))
		return NULL;
	
	outError = VE_OK;
	VProject *project = NULL;

	VFilePath projectFolderPath( inParentFolder.GetPath());
	projectFolderPath.ToSubFolder( inProjectName);
	VFilePath projectFilePath( projectFolderPath);
	projectFilePath.SetFileName( inProjectName, false);
	projectFilePath.SetExtension( RIAFileKind::kProjectFileExtension);

	// Check if this project already exists in the solution
	for (VectorOfProjectsConstIterator projectIter = fProjects.begin() ; projectIter != fProjects.end() && outError == VE_OK ; ++projectIter)
	{
		VFilePath path ;
		(*projectIter)->GetProjectFilePath( path);
		if (path == projectFilePath)
			outError = VE_SOMA_PROJECT_ALREADY_EXISTS;
	}

	if (outError == VE_OK)
	{
		sLONG httpPort = 8081;
		VFolder projectFolder( projectFolderPath);

		if (!projectFolder.Exists())
			outError = projectFolder.Create();

		if (outError == VE_OK)
		{
			// Calculate the http port for the new project
			std::set<sLONG> usedHttpPort;
			for (VectorOfProjectsIterator projectIter = fProjects.begin() ; projectIter != fProjects.end() ; ++projectIter)
			{
				VError lerr = VE_OK;
				VProjectSettings *settings = (*projectIter)->RetainSettings( lerr);
				if (lerr == VE_OK && settings != NULL)
				{
					if (settings->HasHTTPServerSettings())
					{
						usedHttpPort.insert( settings->GetListeningPort());
					}
				}
				ReleaseRefCountable( &settings);
			}

			while (usedHttpPort.find( httpPort) != usedHttpPort.end())
				++httpPort;
		}

		if (outError == VE_OK)
		{
			// Copy the template folder
			outError = CopyFolder( inProjectTemplateFolder, projectFolder);
		}

		FillWidgetsAndThemesFolder( projectFolder.GetPath() );

		if (outError == VE_OK)
		{
			// Resolve the files and folders names
			outError = _ResolveMacro( projectFolder, kTEMPLATE_PROJECT_NAME_MACRO, inProjectName);
		}

		if (outError == VE_OK)
		{
			// Rename the project file if needed
			VFile *projectFile = new VFile( projectFilePath);
			if (projectFile != NULL && !projectFile->Exists())
			{
				bool found = false;
				for (VFileIterator it_file( &projectFolder, FI_WANT_FILES | FI_WANT_INVISIBLES) ; it_file.IsValid() && outError == VE_OK && !found ; ++it_file)
				{
					if (it_file.Current()->ConformsTo( RIAFileKind::kProjectFileKind))
					{
						VString fileName;
						projectFilePath.GetFileName( fileName, true);
						outError = it_file.Current()->Rename( fileName, NULL);
						found = true;
					}
				}
			}
			ReleaseRefCountable( &projectFile);
		}

		if (outError == VE_OK)
		{
			// Resolve the items names which are referenced inside the project file
			VFile projectFile( projectFilePath);
			if (projectFile.Exists())
			{
				VValueBag projectBag;
				outError = LoadBagFromXML( projectFile, kXML_ELEMENT_PROJECT, projectBag, XML_ValidateNever);
				if (outError == VE_OK)
				{
					sLONG changesCount = 0;
					VBagArray *foldersBagArray = projectBag.RetainElements( kXML_ELEMENT_FOLDER);
					if (foldersBagArray != NULL)
					{
						for (sLONG i = 1 ; i <= foldersBagArray->GetCount() ; i++)
						{
							VValueBag *folderBag = foldersBagArray->GetNth( i);
							if (folderBag != NULL)
							{
								VString relativePath = ProjectItemBagKeys::path.Get( folderBag);
								if (relativePath.Find( kTEMPLATE_PROJECT_NAME_MACRO) != 0)
								{
									relativePath.ExchangeAll( kTEMPLATE_PROJECT_NAME_MACRO, inProjectName);
									ProjectItemBagKeys::path.Set( folderBag, relativePath);
									++changesCount;
								}
								VFilePath parentFolder;
								projectFilePath.GetParent( parentFolder );
								VFilePath folderPath( parentFolder, relativePath, FPS_POSIX );
								VFolder folder( folderPath );
								if ( ! folder.Exists() )
									folder.CreateRecursive();
							}
						}

						projectBag.SetElements( kXML_ELEMENT_FOLDER, foldersBagArray);
					}

					ReleaseRefCountable( &foldersBagArray);

					VBagArray *filesBagArray = projectBag.RetainElements( kXML_ELEMENT_FILE);
					if (filesBagArray != NULL)
					{
						for (sLONG i = 1 ; i <= filesBagArray->GetCount() ; i++)
						{
							VValueBag *fileBag = filesBagArray->GetNth( i);
							if (fileBag != NULL)
							{
								VString relativePath = ProjectItemBagKeys::path.Get( fileBag);
								if (relativePath.Find( kTEMPLATE_PROJECT_NAME_MACRO) != 0)
								{
									relativePath.ExchangeAll( kTEMPLATE_PROJECT_NAME_MACRO, inProjectName);
									ProjectItemBagKeys::path.Set( fileBag, relativePath);
									++changesCount;
								}
							}
						}

						projectBag.SetElements( kXML_ELEMENT_FILE, filesBagArray);
					}

					ReleaseRefCountable( &filesBagArray);

					if (changesCount > 0)
					{
						outError = WriteBagToFileInXML( projectBag, kXML_ELEMENT_PROJECT, &projectFile);
					}
				}
			}
		}

		if (outError == VE_OK)
		{
			project = VProject::Instantiate( outError, this, projectFilePath);
			if (outError == VE_OK && project != NULL)
			{
				VSolutionStartupParameters *startupParams = RetainStartupParameters();
				
				_AddProject( project, true, true);

				project->Load(  (startupParams != NULL) ? startupParams->GetOpenProjectSymbolsTable() : true);

				if (saveAction == e_SAVE)
					_SaveSolutionFile();

				// Update the settings file
				VError err = VE_OK;
				VProjectSettings *settings = project->RetainSettings( err);
				if (err == VE_OK && settings != NULL)
				{
					// Exchange the pattern if need
					bool done = false;
					VRIASettingsFile *settingsFile = settings->RetainSettingsFile( RIASettingID::project);
					if (settingsFile != NULL)
					{
						VValueBag *projectSettings = settingsFile->RetainSettings( RIASettingID::project);
						if (projectSettings != NULL)
						{
							VString pattern = RIASettingsKeys::Project::pattern.Get( projectSettings);
							if (pattern == kTEMPLATE_PROJECT_NAME_MACRO)
							{
							#if 0	// sc 25/03/2011 disable project pattern support
								RIASettingsKeys::Project::pattern.Set( projectSettings, inProjectName);
								settingsFile->Save();
								done = true;
							#else
								RIASettingsKeys::Project::pattern.Set( projectSettings, L"");
								settingsFile->Save();
							#endif
							}
						}
						ReleaseRefCountable( &projectSettings);
					}
					ReleaseRefCountable( &settingsFile);

					if (!done)
					{
						// Set the http port
						settingsFile = settings->RetainSettingsFile( RIASettingID::http);
						if (settingsFile != NULL)
						{
							VValueBag *httpSettings = settingsFile->RetainSettings( RIASettingID::http);
							if (httpSettings != NULL)
							{
								RIASettingsKeys::HTTP::port.Set( httpSettings, httpPort);
								settingsFile->Save();
							}
							ReleaseRefCountable( &httpSettings);
						}
						ReleaseRefCountable( &settingsFile);
					}
				}
				ReleaseRefCountable( &settings);
				ReleaseRefCountable( &startupParams);
			}
			else
			{
				ReleaseRefCountable( &project);
			}
		}
	}

	return project;
}


VError VSolution::_SaveSolutionFile(bool inForceSave)
{
	VError err = VE_OK;

	if (inForceSave || (fAutoSave && (fSolutionFileDirtyStamp > 0)))
	{
		VProjectItem* solutionFileProjectItem = GetSolutionFileProjectItem();

		if (solutionFileProjectItem != NULL)
		{
			VString strProjectPath;
			VString strRelativeProjectPath;

			VString strSolutionPath;
			fSolutionItem->GetURL().GetPath(strSolutionPath, eURL_POSIX_STYLE, false);

			VValueBag* bagSolution = new VValueBag();

			for ( VProjectItemIterator it( fSolutionItem ); it.IsValid(); ++it )
			{
				if ( ( ! it->IsGhost() ) && ( it->GetKind() == VProjectItem::ePROJECT ) )	
				{
					// ne pas enregistrer des projets qui ne seraient pas definis comme appartenant a la solution !
					if ( ContainsProject( it ) )
					{
						VProject* project = it->GetBehaviour()->GetProject();
						assert( project != NULL );

						if ( project )
						{
							if ( ! _IsItemReferenced( project->GetProjectItem() ) )
								continue;

							VProjectItem* projectItem = project->GetProjectItemProjectFile();
							VFilePath projectFilePath;
							projectItem->GetFilePath( projectFilePath );
							VURL projectFileURL( projectFilePath );
							VString strNetLoc;
							projectFileURL.GetNetworkLocation( strNetLoc, false );
							projectFileURL.GetPath( strProjectPath, eURL_POSIX_STYLE, false );

							if (!strNetLoc.IsEmpty())
								strProjectPath = "//" + strNetLoc + "/" + strProjectPath;
							
							GetPathRelativeToFolderPath(strSolutionPath, strProjectPath, strRelativeProjectPath );

							VValueBag* bagProject = new VValueBag();
							ProjectItemBagKeys::path.Set(bagProject, strRelativeProjectPath );
							bagSolution->AddElement(it->GetXMLElementName(), bagProject );
						}
					}
				}
			}

			// Save referenced items
			for ( VectorOfProjectItems::iterator iter = fReferencedItems.begin() ; iter != fReferencedItems.end() && err == VE_OK ; ++iter )
			{
				VProjectItem *item = *iter;
				if (!item->IsGhost() && (item->GetKind() != VProjectItem::ePROJECT))
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
						GetPathRelativeToFolderPath( strSolutionPath, strProjectItemPath, strRelativeProjectItemPath);

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
								bagSolution->AddElement( elementName, itemBag);
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

			VFile solutionFile(solutionFileProjectItem->GetURL());
			{
				StErrorContextInstaller( false );
				err = WriteBagToFileInXML( *bagSolution, kXML_ELEMENT_SOLUTION, &solutionFile, true );
			}

			bagSolution->Release();

		}
		if (err == VE_OK)
			fSolutionFileDirtyStamp = 0;
	}

	return err;
}


void VSolution::GetPathRelativeToFolderPath(const VString& inFolderPath, const VString& inFullPath, VString& outRelativePath, bool inDiacritical)
{
	if (inFolderPath == inFullPath)
	{
		outRelativePath = "./";
	}
	else
	{
		VString baseFolder(inFolderPath);
		outRelativePath = inFullPath;
		sLONG start = 1;

		VString		baseChar,outChar;
		baseChar.FromUniChar(baseFolder.GetUniChar(start));
		outChar.FromUniChar(outRelativePath.GetUniChar(start));
		
		if (baseChar.CompareToString(outChar,inDiacritical) == CR_EQUAL)
		{
			sLONG baseFolderLength  = baseFolder.GetLength();
			sLONG outRelativePathLength = outRelativePath.GetLength();
			sLONG min = baseFolderLength;
			if (outRelativePathLength < min)
				min = outRelativePathLength;
			while (start <= min)
			{
				baseChar.FromUniChar(baseFolder.GetUniChar(start));
				outChar.FromUniChar(outRelativePath.GetUniChar(start));
				if (baseChar.CompareToString(outChar,inDiacritical) == CR_EQUAL)
				{
					start++;
				}
				else
				{
					break;
				}
			}
			sLONG pos = baseFolder.FindUniChar('/', start - 1, true);
			start = pos + 1;
			sLONG nbSeparator = 0;
			for (sLONG j = start; j <= baseFolderLength; j++)
			{
				if (baseFolder.GetUniChar(j) == '/')
					nbSeparator++;
			}
			VString prefix;
			if (baseFolderLength > start)
			{
				for (sLONG j = 0; j < nbSeparator; j++)
				{
					prefix += "..";
					prefix += "/";
				}
			}
			else
			{
				prefix += ".";
				prefix += "/";
			}
			if (start <= outRelativePath.GetLength())
			{
				outRelativePath.SubString(start, outRelativePathLength - start + 1);
				outRelativePath = prefix + outRelativePath;
			}
			else
				outRelativePath = prefix;
		}
	}
}



// ----------------------------------------------------------------------------
// Pattern Singleton - Construction / Initialisation
// ----------------------------------------------------------------------------
VSolutionManager* VSolutionManager::sSolutionManager = NULL;

VSolutionManager::VSolutionManager()
{
}


VSolutionManager::~VSolutionManager()
{
}


bool VSolutionManager::Init( bool inWithProjectItemUniqueID)
{
	bool ok = true;
	
	if (sSolutionManager == NULL)
	{
		sSolutionManager = new VSolutionManager();
		ok = (sSolutionManager != NULL);
		
		if (ok) 
			ok = VProjectItemManager::Init( inWithProjectItemUniqueID);
	}
	return ok;
}


void VSolutionManager::DeInit()
{
	VProjectItemManager::DeInit();
	delete sSolutionManager; 
	sSolutionManager = NULL;
}


VSolution* VSolutionManager::CreateNewSolution( VSolutionStartupParameters* inSolutionStartupParameters, ISolutionMessageManager* inSolutionMessageManager, ISolutionBreakPointsManager* inSolutionBreakPointsManager, ISolutionUser* inSolutionUser, ISolutionDelegate* inSolutionDelegate)
{
	VSolution *solution = _CreateSolution( inSolutionStartupParameters, inSolutionMessageManager, inSolutionBreakPointsManager, inSolutionUser, inSolutionDelegate);
	if (solution != NULL)
	{
		solution->_TouchSolutionFile();
		solution->GetSolutionItem()->CreatePhysicalChildren( true);
		solution->_SaveSolutionFile();
		if (!solution->Open())	// sc 30/06/2010 Wakanda bug 701
		{
			delete solution;
			solution = NULL;
		}
	}

	return solution;
}


VSolution* VSolutionManager::CreateNewSolution( const VFilePath& inSolutionFilePath, ISolutionMessageManager* inSolutionMessageManager, ISolutionBreakPointsManager* inSolutionBreakPointsManager, ISolutionUser* inSolutionUser, ISolutionDelegate* inSolutionDelegate)
{
	VSolution *solution = NULL;

	if (inSolutionFilePath.IsValid() && inSolutionFilePath.IsFile())
	{
		VFile *file = new VFile( inSolutionFilePath);
		VSolutionStartupParameters *startupParams = new VSolutionStartupParameters();
		if (startupParams != NULL && file != NULL)
		{
			startupParams->SetSolutionFileToOpen( file);
			solution = CreateNewSolution( startupParams, inSolutionMessageManager, inSolutionBreakPointsManager, inSolutionUser, inSolutionDelegate );
		}
		ReleaseRefCountable( &startupParams);
		ReleaseRefCountable( &file);
	}
	return solution;
}


VSolution* VSolutionManager::CreateNewSolutionFromTemplate( const XBOX::VFilePath& inSolutionFilePath, const XBOX::VFolder& inSolutionTemplateFolder, ISolutionMessageManager* inSolutionMessageManager, ISolutionBreakPointsManager* inSolutionBreakPointsManager, ISolutionUser* inSolutionUser, ISolutionDelegate* inSolutionDelegate )
{
	VSolution *solution = NULL;

	VString solutionName;
	VFilePath solutionFolderPath;
	inSolutionFilePath.GetFileName( solutionName, false);
	inSolutionFilePath.GetFolder( solutionFolderPath);

	VFolder solutionFolder( solutionFolderPath);
	VError err = VSolution::CreateFromTemplate( solutionFolder, solutionName, inSolutionTemplateFolder);
	if (err == VE_OK)
	{
		VFile *file = new VFile( inSolutionFilePath);
		VSolutionStartupParameters *startupParams = new VSolutionStartupParameters();
		if (startupParams != NULL && file != NULL)
		{
			startupParams->SetSolutionFileToOpen( file);
			solution = OpenSolution( startupParams, inSolutionMessageManager, inSolutionBreakPointsManager, inSolutionUser, inSolutionDelegate );
		}
		ReleaseRefCountable( &startupParams);
		ReleaseRefCountable( &file);
	}

	return solution;
}


VSolution* VSolutionManager::OpenSolution( VSolutionStartupParameters* inSolutionStartupParameters, ISolutionMessageManager* inSolutionMessageManager, ISolutionBreakPointsManager* inSolutionBreakPointsManager, ISolutionUser* inSolutionUser, ISolutionDelegate* inSolutionDelegate)
{
	VSolution *solution = _CreateSolution( inSolutionStartupParameters, inSolutionMessageManager, inSolutionBreakPointsManager, inSolutionUser, inSolutionDelegate );
	if (solution != NULL)
	{
		if (solution->Open())
		{
			solution->LoadProjects();
		}
		else
		{
			delete solution;
			solution = NULL;
		}
	}

	return solution;
}


VSolution* VSolutionManager::OpenSolution( const VFilePath& inSolutionFilePath, ISolutionMessageManager* inSolutionMessageManager, ISolutionBreakPointsManager* inSolutionBreakPointsManager, ISolutionUser* inSolutionUser, ISolutionDelegate* inSolutionDelegate, bool inOpenProjectSymbolsTable )
{
	VSolution *solution = NULL;

	if (inSolutionFilePath.IsValid() && inSolutionFilePath.IsFile())
	{
		VFile *file = new VFile( inSolutionFilePath);
		VSolutionStartupParameters *startupParams = new VSolutionStartupParameters();
		if (startupParams != NULL && file != NULL)
		{
			startupParams->SetSolutionFileToOpen( file);
			startupParams->SetOpenProjectSymbolsTable( inOpenProjectSymbolsTable);
			solution = OpenSolution( startupParams, inSolutionMessageManager, inSolutionBreakPointsManager, inSolutionUser, inSolutionDelegate );
		}
		ReleaseRefCountable( &startupParams);
		ReleaseRefCountable( &file);
	}
	return solution;
}


bool VSolutionManager::CloseSolution( VSolution *inSolution)
{
	bool ok = true;

	if (inSolution != NULL)
	{
		inSolution->StopWatchingFileSystem();
		inSolution->StopUpdatingSymbolTable();
		inSolution->UnloadProjects();
		inSolution->Close();
	}
	return ok;
}


VSolution* VSolutionManager::_CreateSolution( VSolutionStartupParameters* inSolutionStartupParameters, ISolutionMessageManager* inSolutionMessageManager, ISolutionBreakPointsManager* inSolutionBreakPointsManager, ISolutionUser* inSolutionUser, ISolutionDelegate* inSolutionDelegate )
{
	VSolution *solution = NULL;

	if (inSolutionStartupParameters != NULL && inSolutionStartupParameters->GetSolutionFileToOpen() != NULL)
	{
		VError err = VE_OK;
		VFilePath solutionFilePath;
		inSolutionStartupParameters->GetSolutionFileToOpen()->GetPath( solutionFilePath);

		solution = VSolution::Instantiate( err, solutionFilePath);
		if (solution != NULL)
		{
			solution->SetSolutionStartupParameters( inSolutionStartupParameters);
			solution->SetSolutionMessageManager( inSolutionMessageManager);
			solution->SetSolutionUser( inSolutionUser);
			solution->SetDelegate( inSolutionDelegate );
			solution->SetBreakPointsManager( inSolutionBreakPointsManager);
		}
	}
		
	return solution;
}


#define PRODUCT_NAME			"Wakanda Server"
#define RUNNING_FILE_SUBFOLDER	"runningServers"
#define RUNNING_FILE_PREFIX		"wakandaServer"

XBOX::VFile *VSolution::RetainRunningServerFile()
{
	VFile *file = NULL;

	VFolder *folder = RetainRunningServerFilesFolder();
	if (folder != NULL)
	{
		VString fileName( RUNNING_FILE_PREFIX);
		fileName.AppendLong( VProcess::Get()->GetSystemID());
		file = new VFile( *folder, fileName);
	}
	ReleaseRefCountable( &folder);
	
	return file;
}


XBOX::VFolder *VSolution::RetainRunningServerFilesFolder( bool inAllUsers)
{
	VFolder *runningServersFolder = NULL;

	VFolder *parentFolder = VFolder::RetainSystemFolder( inAllUsers ? eFK_CommonApplicationData : eFK_UserApplicationData, true);
	if (parentFolder != NULL)
	{
		VFilePath path( parentFolder->GetPath());
		path.ToSubFolder( PRODUCT_NAME).ToSubFolder( RUNNING_FILE_SUBFOLDER);
		
		runningServersFolder = new VFolder( path);
		if (!runningServersFolder->Exists())
		{
			// try to create it silently
			StErrorContextInstaller context( false);
			runningServersFolder->CreateRecursive();
		}
	}
	ReleaseRefCountable( &parentFolder);

	if ( (runningServersFolder != NULL) && !runningServersFolder->Exists())
		ReleaseRefCountable( &runningServersFolder);
	
	return runningServersFolder;
}


bool VSolution::GetPidFromRunningServerFile (const XBOX::VString &inFileName, uLONG *outPid)
{
	XBOX::VString	prefix, pidString;

	prefix = RUNNING_FILE_PREFIX;
	if (!inFileName.BeginsWith(prefix)) 
		
		return false;
	
	else {
		
		inFileName.GetSubString(1 + prefix.GetLength(), inFileName.GetLength() - prefix.GetLength(), pidString);
		*outPid = pidString.GetLong();
		return true;
	
	}
}

void VSolution::SetBaseFolderPathStr(const ESymbolFileBaseFolder& inType, const XBOX::VString& inPathStr, const bool& inRefreshProjectsDatabase)
{
	fBaseFolderPosixPathStrings[inType] = inPathStr;
	if( inRefreshProjectsDatabase )
	{
		for (VectorOfProjectsIterator iter = fProjects.begin() ; iter != fProjects.end(); ++iter)
		{
			ISymbolTable* symb = (*iter)->GetSymbolTable();
			if (symb != nil)
				symb->SetBaseFolderPathStr(inType, inPathStr, true);
		}
	}
}

void VSolution::GetBaseFolderPathStr(const ESymbolFileBaseFolder& inType, XBOX::VString& outPathStr)
{
	outPathStr = "";
	
	std::map<ESymbolFileBaseFolder, XBOX::VString>::const_iterator it = fBaseFolderPosixPathStrings.find(inType);
	if( it != fBaseFolderPosixPathStrings.end() )
	{
		outPathStr = it->second;
	}
}

XBOX::VError VSolution::InitFileSystems ( )
{
	VString							vstrName;
	bool							bOK	= GetName ( vstrName );
	xbox_assert ( bOK );
	VFilePath						vfPathSolution;
	bOK = GetSolutionFolderPath ( vfPathSolution );

	VFileSystemNamespace*			vfsNamespace = VProcess::Get ( )-> GetFileSystemNamespace ( );
	xbox_assert ( vfsNamespace != NULL );
	VError							vError = vfsNamespace-> RegisterFileSystem ( CVSTR ( "SOLUTION" ), vfPathSolution, eFSO_Default );

	if ( vError == VE_OK )
	{
		VectorOfProjects::iterator		iter = fProjects. begin ( );
		while ( iter != fProjects. end ( ) && vError == VE_OK )
		{
			VProject*					vProject = *iter;
			VString						vstrProjectFSName;
			bOK = vProject-> GetName ( vstrProjectFSName );
			xbox_assert ( bOK );
			vstrProjectFSName. Insert ( CVSTR ( "PROJECT_" ), 1 );
			VFilePath					vfPathProject;
			bOK = vProject-> GetProjectFolderPath ( vfPathProject );
			xbox_assert ( bOK );
			vError = vfsNamespace-> RegisterFileSystem ( vstrProjectFSName, vfPathProject, eFSO_Default );

			iter++;
		}
	}

	return vError;
}

XBOX::VError VSolution::DeInitFileSystems ( )
{
	VFileSystemNamespace*			vfsNamespace = VProcess::Get ( )-> GetFileSystemNamespace ( );
	xbox_assert ( vfsNamespace != NULL );
	vfsNamespace-> UnregisterFileSystem ( CVSTR ( "SOLUTION" ) );

	bool							bOK = true;
	VectorOfProjects::iterator		iter = fProjects. begin ( );
	while ( iter != fProjects. end ( ) )
	{
		VProject*					vProject = *iter;
		VString						vstrProjectFSName;
		bOK = vProject-> GetName ( vstrProjectFSName );
		xbox_assert ( bOK );
		vstrProjectFSName. Insert ( CVSTR ( "PROJECT_" ), 1 );
		vfsNamespace-> UnregisterFileSystem ( vstrProjectFSName );

		iter++;
	}

	return VE_OK;
}

void VSolutionTools::RemoveUselessPaths( std::vector<VFilePath>& ioPaths)
{
	std::vector<VFilePath> lPaths( ioPaths.begin(), ioPaths.end()), ancestorPaths;

	for (std::vector<VFilePath>::iterator pathIter = lPaths.begin() ; pathIter != lPaths.end() ; ++pathIter)
	{
		if ((*pathIter).IsFolder())
			ancestorPaths.push_back( *pathIter);
	}

	ioPaths.clear();

	for (std::vector<VFilePath>::iterator pathIter = lPaths.begin() ; pathIter != lPaths.end() ; ++pathIter)
	{
		bool hasAncestor = false;

		for (std::vector<VFilePath>::iterator ancestorIter = ancestorPaths.begin() ; (ancestorIter != ancestorPaths.end()) && !hasAncestor ; ++ancestorIter)
			hasAncestor = (*pathIter).IsChildOf( *ancestorIter);
		
		if (!hasAncestor)
			ioPaths.push_back( *pathIter);
	}
}


void VSolutionTools::GetItemsByProject( const VectorOfProjectItems& inItems, std::map< VProject*, VectorOfProjectItems >& outItemsByProject)
{
	for (VectorOfProjectItemsConstIterator itemIter = inItems.begin() ; itemIter != inItems.end() ; ++itemIter)
	{
		VProject *project = (*itemIter)->GetProjectOwner();
		if (project != NULL)
		{
			std::map< VProject*, VectorOfProjectItems >::iterator found = outItemsByProject.find( project);
			if (found == outItemsByProject.end())
				outItemsByProject[project] = VectorOfProjectItems( 1, *itemIter);
			else
				found->second.push_back( *itemIter);
		}
	}
}



XBOX::VError VSolutionTools::CopyFile( const XBOX::VFolder& inDestinationFolder, const XBOX::VFilePath& inFilePath, XBOX::VFilePath *outNewFilePath)
{
	if (!inDestinationFolder.Exists())
		return VE_FOLDER_NOT_FOUND;

	VFile sourceFile( inFilePath);
	if (!sourceFile.Exists())
		return VE_FILE_NOT_FOUND;
	
	VError err = VE_OK;
	VIndex cpt = 0;

	VString fileName, fileNameNoExt;
	inFilePath.GetFileName( fileName, true);
	inFilePath.GetFileName( fileNameNoExt, false);

	VFilePath newPath;
	inDestinationFolder.GetPath( newPath);
	newPath.SetFileName( fileName);

	VFile newFile( newPath);
	bool exists =  newFile.Exists();
	while (exists)
	{
		++cpt;
		VString name( fileNameNoExt);
		name.AppendString( L" (");
		name.AppendLong( cpt);
		name.AppendUniChar( ')');
		newPath.SetFileName( name, false);
		VFile otherFile( newPath);
		exists = otherFile.Exists();
	}

	if (outNewFilePath != NULL)
		*outNewFilePath = newPath;

	err = sourceFile.CopyTo( newPath, NULL);

	return err;
}


XBOX::VError VSolutionTools::MoveFile( const XBOX::VFolder& inDestinationFolder, const XBOX::VFilePath& inFilePath, XBOX::VFilePath *outNewFilePath)
{
	if (!inDestinationFolder.Exists())
		return VE_FOLDER_NOT_FOUND;

	VFile sourceFile( inFilePath);
	if (!sourceFile.Exists())
		return VE_FILE_NOT_FOUND;
	
	VError err = VE_OK;

	VString fileName;
	inFilePath.GetFileName( fileName, true);

	VFilePath newPath;
	inDestinationFolder.GetPath( newPath);
	newPath.SetFileName( fileName);

	VFile newFile( newPath);
	if (!newFile.Exists())
	{
		err = sourceFile.CopyTo( newPath, NULL);
		if (err == VE_OK)
		{
			err = sourceFile.Delete();
		}
	}
	
	if (outNewFilePath != NULL)
		*outNewFilePath = newPath;

	return err;
}


XBOX::VError VSolutionTools::CopyFolder( const XBOX::VFolder& inDestinationFolder, const XBOX::VFilePath& inFolderPath, XBOX::VFilePath *outNewFolderPath)
{
	if (!inDestinationFolder.Exists())
		return VE_FOLDER_NOT_FOUND;

	VFolder sourceFolder( inFolderPath);
	if (!sourceFolder.Exists())
		return VE_FOLDER_NOT_FOUND;

	if ((inDestinationFolder.GetPath() == inFolderPath) || inDestinationFolder.GetPath().IsChildOf( inFolderPath))
		return VE_SOMA_DEST_FOLDER_IS_SUBFOLDER_OF_SRC_FOLDER;

	VError err = VE_OK;
	VIndex cpt = 0;

	VString folderName, folderNameNoExt;
	inFolderPath.GetFolderName( folderName, true);
	inFolderPath.GetFolderName( folderNameNoExt, false);

	VFilePath newPath;
	inDestinationFolder.GetPath( newPath);
	newPath.ToSubFolder( folderName);

	VFolder newFolder( newPath);
	bool exists =  newFolder.Exists();
	while (exists)
	{
		++cpt;
		VString name( folderNameNoExt);
		name.AppendString( L" (");
		name.AppendLong( cpt);
		name.AppendUniChar( ')');
		newPath.SetFolderName( name, false);
		VFolder otherFolder( newPath);
		exists = otherFolder.Exists();
	}

	if (outNewFolderPath != NULL)
		*outNewFolderPath = newPath;

	err = sourceFolder.CopyContentsTo( VFolder( newPath));

	return err;
}


XBOX::VError VSolutionTools::MoveFolder( const XBOX::VFolder& inDestinationFolder, const XBOX::VFilePath& inFolderPath, XBOX::VFilePath *outNewFolderPath)
{
	if (!inDestinationFolder.Exists())
		return VE_FOLDER_NOT_FOUND;

	VFolder sourceFolder( inFolderPath);
	if (!sourceFolder.Exists())
		return VE_FOLDER_NOT_FOUND;

	if ((inDestinationFolder.GetPath() == inFolderPath) || inDestinationFolder.GetPath().IsChildOf( inFolderPath))
		return VE_SOMA_DEST_FOLDER_IS_SUBFOLDER_OF_SRC_FOLDER;

	VError err = VE_OK;

	VString folderName;
	inFolderPath.GetFolderName( folderName, true);

	VFilePath newPath;
	inDestinationFolder.GetPath( newPath);
	newPath.ToSubFolder( folderName);

	VFolder newFolder( newPath);
	if (!newFolder.Exists())
	{
		err = sourceFolder.CopyContentsTo( newFolder);
		if (err == VE_OK)
		{
			err = sourceFolder.Delete( true);
		}
	}

	if (outNewFolderPath != NULL)
		*outNewFolderPath = newPath;

	return err;
}

