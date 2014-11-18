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
// ----------------------------------------------------------------------------
#ifndef __VSolution__
#define __VSolution__



#include "VSolutionManagerConstants.h"
#include "VSolutionManagerInterface.h"
#include "Language Syntax/CLanguageSyntax.h"



class VSolution;
class VProject;
class VSolutionStartupParameters;
class VProjectItem;
class ISolutionBreakPointsManager;
class VSolutionFileDirtyStampSaver;
class CUAGDirectory;
class ISolutionDelegate;



// ----------------------------------------------------------------------------
// Interface pour la gestion et l'affichage des messages du Project Manager
// ----------------------------------------------------------------------------
class ISolutionMessageManager : public XBOX::IRefCountable
{
public:
	virtual void CheckErrorStack() const = 0;
	virtual void DisplayMessage(const XBOX::VString& inMessage) const = 0;
	virtual bool DisplayOkCancelMessage(const XBOX::VString& inMessage) const = 0;
	virtual void GetLocalizedStringFromError(const XBOX::VError inError, XBOX::VString& outLocalizedString) const = 0;
	virtual void GetLocalizedStringFromResourceName(const XBOX::VString& inResName, XBOX::VString& outLocalizedString) const = 0;
};

// ----------------------------------------------------------------------------
// Classe d'acces global qui gere les solutions 
// 230909 -> actuellement une seule solution : code pour multisolutions retire
// Pattern utilise : Singleton
// ----------------------------------------------------------------------------

class VSolutionManager : public XBOX::VObject
{
public:
	static	VSolutionManager*				Get() { return sSolutionManager; }
	static	bool							Init( bool inWithProjectItemUniqueID);
	static	void							DeInit();

			/** @brief	The startup parameters, message managers, breakpoints manager and solution user are retained */
			VSolution*						CreateNewSolution( VSolutionStartupParameters* inSolutionStartupParameters, ISolutionMessageManager* inSolutionMessageManager = NULL, ISolutionBreakPointsManager* inSolutionBreakPointsManager = NULL, ISolutionUser* inSolutionUser = NULL, ISolutionDelegate* inSolutionDelegate = NULL);
			VSolution*						CreateNewSolution( const XBOX::VFilePath& inSolutionFilePath, ISolutionMessageManager* inSolutionMessageManager = NULL, ISolutionBreakPointsManager* inSolutionBreakPointsManager = NULL, ISolutionUser* inSolutionUser = NULL, ISolutionDelegate* inSolutionDelegate = NULL );
			VSolution*						CreateNewSolutionFromTemplate( const XBOX::VFilePath& inSolutionFilePath, const XBOX::VFolder& inSolutionTemplateFolder, ISolutionMessageManager* inSolutionMessageManager = NULL, ISolutionBreakPointsManager* inSolutionBreakPointsManager = NULL, ISolutionUser* inSolutionUser = NULL, ISolutionDelegate* inSolutionDelegate = NULL );
    
			/** @brief	The startup parameters, message managers, breakpoints manager and solution user are retained */
            VSolution*						OpenSolution( VSolutionStartupParameters* inSolutionStartupParameters, ISolutionMessageManager* inSolutionMessageManager = NULL, ISolutionBreakPointsManager* inSolutionBreakPointsManager = NULL, ISolutionUser* inSolutionUser = NULL, ISolutionDelegate* inSolutionDelegate = NULL);
    		VSolution*						OpenSolution( const XBOX::VFilePath& inSolutionFilePath, ISolutionMessageManager* inSolutionMessageManager = NULL, ISolutionBreakPointsManager* inSolutionBreakPointsManager = NULL, ISolutionUser* inSolutionUser = NULL, ISolutionDelegate* inSolutionDelegate = NULL, bool inOpenProjectSymbolsTable = true);

			bool							CloseSolution( VSolution *inSolution);
private:
			VSolutionManager();
			VSolutionManager( const VSolutionManager &);
	virtual ~VSolutionManager();
			void							operator=( const VSolutionManager &);

	static VSolutionManager					*sSolutionManager;	// singleton

			VSolution*						_CreateSolution( VSolutionStartupParameters* inSolutionStartupParameters, ISolutionMessageManager* inSolutionMessageManager, ISolutionBreakPointsManager* inSolutionBreakPointsManager, ISolutionUser* inSolutionUser, ISolutionDelegate* inSolutionDelegate);
};



class ISolutionDelegate
{
public:

	virtual	void		SynchronizeFromSolution() = 0;

	virtual VProject*	GetSelectedProject() const = 0;
	
	virtual	IDocumentParserManager::Priority	GetDocumentParsingPriority( const XBOX::VFilePath& inDocumentPath) = 0;

	virtual void		UpdateParsingStatus( sLONG inPendingParsingRequest ) = 0;

	virtual	void		DoProjectItemsChanged( const VectorOfFilePathes& inChangedPathes ) = 0;
	virtual	void		DoProjectItemsDeleted( const VectorOfFilePathes& inDeletedPathes ) = 0;
	virtual	void		DoProjectFileDeleted() = 0;

	virtual	void		DoStartPossibleLongTimeOperation()											{;}
	virtual	void		DoEndPossibleLongTimeOperation()											{;}

	/* @brief	DoActionRequireSolutionFileSaving() and DoActionRequireProjectFileSaving() are called each time
				the solution file or the project file need to be saved. The delegate can return the following values:
					- e_CANCEL: the action is cancelled
					- e_SAVE: the action is done and the file is saved
					- e_NO_SAVE: the action is done and the file is not saved, the dirty flag of the file is set.
				Note that some actions cannot be cancelled
	*/
	virtual	e_Save_Action	DoActionRequireSolutionFileSaving( VProjectItem *inSolutionFile, ESolutionAction inAction, bool inCanBeCancelled)	{ return e_SAVE; }
	virtual	e_Save_Action	DoActionRequireProjectFileSaving( VProjectItem *inProjectFile, EProjectAction inAction, bool inCanBeCancelled)		{ return e_SAVE; }

	virtual XBOX::VError	DoCopyFolderFromFileSystem( const XBOX::VFolder& inFolder, const XBOX::VString& inFileSystemPath ) = 0;
};



// ----------------------------------------------------------------------------
// VSolution : Classe qui permet le controle d'une solution
// ----------------------------------------------------------------------------
class VProject;
typedef std::vector<VProject*> VectorOfProjects;
typedef std::vector<VProject*>::iterator VectorOfProjectsIterator;
typedef std::vector<VProject*>::const_iterator VectorOfProjectsConstIterator;

class VSolution  : public XBOX::VObject, public XBOX::VFileSystemNotifier::IEventHandler
{
	friend class VSolutionManager;
	friend class VSolutionFileStampSaver;

public:
			VSolution();
	virtual ~VSolution();

	static	VSolution*						Instantiate( XBOX::VError& outError, const XBOX::VFilePath& inSolutionFile);
	static	XBOX::VError					CreateFromTemplate( const XBOX::VFolder& inSolutionFolder, const XBOX::VString& inSolutionName, const XBOX::VFolder& inSolutionTemplateFolder);

			void							SetDelegate( ISolutionDelegate *inDelegate);
			ISolutionDelegate*				GetDelegate() const;
	
	
			/** @brief	Read the solution file and create the project instances. */
			bool							Open();
			/** @brief	If needed, save the projects and solution files.
						DoSolutionWillClose() returns VE_USER_ABORT if the closing should be cancelled. */
			XBOX::VError					DoSolutionWillClose();
			/** @brief	Close the solution. */
			XBOX::VError					Close();
			/** @brief	Require each project to read the project file, synchronize with file system and open the symbols table. */
			XBOX::VError					LoadProjects();
			/** @brief	Require each project to close the symbols table. */
			XBOX::VError					UnloadProjects();
			/** @brief	Require each project to start handling file system notifications. */
			XBOX::VError					StartWatchingFileSystem();
			/** @brief	Require each project to stop handling file system notifications. */
			XBOX::VError					StopWatchingFileSystem();
			/** @brief	Require each project to start updating its symbols table. */
            XBOX::VError					StartUpdatingSymbolTable();
			/** @brief	Require each project to stop updating its symbols table. */
			XBOX::VError					StopUpdatingSymbolTable();

	virtual void FileSystemEventHandler( const std::vector< XBOX::VFilePath > &inFilePaths, XBOX::VFileSystemNotifier::EventKind inKind );

			// High level accessors

			const XBOX::VUUID&				GetUUID() const;
			
			/** @brief	Returns false if the name of the solution is unknown. */
			bool							GetName( XBOX::VString& outName) const;
			/** @brief	Returns in outPath the path of the solution folder. Returns false if the path of the solution folder is unknown. */
			bool							GetSolutionFolderPath( XBOX::VFilePath& outPath) const;
			/** @brief	Returns in outPath the path of the solution file. Returns false if the path of the solution file is unknown. */
			bool							GetSolutionFilePath( XBOX::VFilePath& outPath) const;
			/** @brief	Returns in outPath the path of the user cache folder for this solution */			
			bool							GetUserCacheFolderPath( XBOX::VFilePath& outPath) const;

			bool							ResolvePosixPathMacros( XBOX::VString& ioPosixPath) const;

			XBOX::VError					Rename( const XBOX::VString& inNewName);

			// reconstruit le path complet par rapport au path du dossier de la solution 
			void							BuildPathFromRelativePath( XBOX::VFilePath& outFilePath, const XBOX::VString& inRelativePath, XBOX::FilePathStyle inRelativePathStyle = XBOX::FPS_SYSTEM) const;

			void							DoProjectItemsChanged( const VectorOfFilePathes& inChangedPaths);
			void							DoProjectItemsDeleted( const VectorOfFilePathes& inChangedPaths);
			ISolutionUser					*GetSolutionUser() { return fSolutionUser; }

	void			LoadFromUserFile();
	void			GetPreferencesUserFilePath( XBOX::VFilePath& outPath );
	void			LoadSolutionUserFile();
	void			SaveSolutionUserFile();
	void			SaveProjectItemPosition( const XBOX::VFilePath& inFilePath, bool inMaximized, sLONG inX, sLONG inY, sLONG inWidth, sLONG inHeight );
	bool			GetProjectItemPosition( const XBOX::VFilePath& inFilePath, bool& outMaximized, sLONG& outX, sLONG& outY, sLONG& outWidth, sLONG& outHeight );

	void			SetSolutionStartupParameters(VSolutionStartupParameters* inSolutionStartupParameters);
	void			ForceSavingSolutionFile(VProjectItem*  inProjectItem, const VProjectItemTag& );

	// ---------------------------------------
	// fonctions utilitaires grand public
	// ---------------------------------------
	// obtenir un VProject à partir du VFilePath d'un fichier project
	VProject*		GetProjectFromFilePathOfProjectFile(const XBOX::VFilePath& inFilePath) const;
			
			/** @brief	Returns the project whose folder is the passed file path ancestor. */
			VProject*						GetParentProject( const XBOX::VFilePath& inPath) const;

	// obtenir le vecteur des projets de la solution
	sLONG			CountProjects() const;
	void			GetVectorOfProjects(VectorOfProjects& outProjects) const ;
	// obtenir le premier projet d'un nom donne depuis le vecteur des projets (en principe, ce nom est unique)
	VProject*		FindProjectByName( const XBOX::VString& inProjectName) const;
	// verifie l'existence d'un projet dans la solution depuis son URL
	bool			IsProjectInSolution(const XBOX::VURL& inProjectFileURL) const;

	// teste si un VProjectItem de type ePROJECT appartient a la solution (return false si autre type)
	bool			ContainsProject(VProjectItem* inProjectItem) const;

	// obtenir le VProjectItem associe au fichier solution
	VProjectItem*	GetSolutionFileProjectItem() const {return fSolutionFileProjectItem;}

	// Returns the root item of the solution
	VProjectItem*	GetSolutionItem() const { return fSolutionItem; }

	// ATTENTION : ICI ON SAIT que la reponse est unique et donc ne traite pas les references externes
	VProjectItem*	GetProjectItemFromFullPath( const XBOX::VString& inFullPath, XBOX::FilePathStyle inFullPathStyle = XBOX::FPS_DEFAULT) const;
	VProjectItem*	GetProjectItemFromFilePath( const XBOX::VFilePath& inPath) const;

	// (initialement creees pour FindInFiles Zhongxu)
	void			GetVectorOfProjectNames(std::vector<XBOX::VString>& outProjectNames) const;
	void			GetPhysicalFilesOfCurrentProject(VectorOfProjectItems& outProjectItemsVector);

	XBOX::VError	SaveProjectAsTemplate(const XBOX::VFilePath& inProjectFolderPath, const XBOX::VString& inProjectFileName, XBOX::VString& inTemplateName, XBOX::VString& inTypeReadMe, XBOX::VString& inReadMe, XBOX::VString& inPathImage, XBOX::VProgressIndicator* inProgressIndicator = NULL);
	VProject*		CreateProjectFromTemplate( XBOX::VError& outError, const XBOX::VFolder& inParentFolder, const XBOX::VString& inProjectName, const XBOX::VFolder& inProjectTemplateFolder);
	void			FillWidgetsAndThemesFolder( const XBOX::VFilePath& inProjectFilePath );

	static XBOX::VError InitializeDefaultFileContent( const XBOX::VFilePath& inPath, const XBOX::VString& inSubType );

	ISolutionMessageManager*	GetSolutionMessageManager() {return fSolutionMessageManager;};

	// ---------------------------------------
	// creation "physique" d'un ProjectItem
	// ---------------------------------------
	XBOX::VError	CreatePhysicalItem(VProjectItem* inNewProjectItem, const XBOX::VString& inSubType = CVSTR("") );

	// ---------------------------------------
	// operations generales sur les elements d'une solution
	// ---------------------------------------
	VProjectItem*	ImportExistingFile( XBOX::VError& outError, const XBOX::VFilePath& inDestinationPath, const XBOX::VFilePath& inSourceFilePath);
	VProjectItem*	ImportExistingFolder( XBOX::VError& outError, VProjectItem *inParentItem, const XBOX::VFilePath& inSourceFolderPath);
	XBOX::VError	RemoveItem( VProjectItem *inProjectItem, bool inDeletePhysicalItems);
	XBOX::VError	RemoveItems( const VectorOfProjectItems& inProjectItems, bool inDeletePhysicalItems);
	XBOX::VError	RenameItem( VProjectItem *inProjectItem, const XBOX::VString& inNewName);

	VProject*		AddExistingProject(const XBOX::VURL& inProjectFileURL, bool inMustBeReferenced);
	XBOX::VError	RemoveProject( VProject *inProject, bool inDeleteProjectFolder);
	VProjectItem*	ReferenceExternalFolder( XBOX::VError& outError, VProjectItem *inParentItem, const XBOX::VURL& inURL);
	VProjectItem*	ReferenceExternalFile( XBOX::VError& outError, VProjectItem *inParentItem, const XBOX::VURL& inURL);

	VProjectItem*	CreateFileItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive);
	VProjectItem*	CreateFolderItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive, bool inSynchronizeWithFileSystem);

	// ---------------------------------------
	// VSolutionStartupParameters
	// ---------------------------------------
	VSolutionStartupParameters*	RetainStartupParameters();

	// si la solution a ete modifiee
	void			SetAutoSave(bool inAutoSave){fAutoSave = inAutoSave;}
	bool			IsAutoSave() const {return fAutoSave;}
	
			// Tagged items handling
			// GetProjectItemsFromTag() method returns the project items which match the tag.
			// A project item may match the tag in two cases: either the project item has been explicitly tagged or
			// the project item is implicitly tagged according to the tag definition (see VProjectItemTagManager class for more details).
			//  For exemple, a settings file (*.waSettings) located into the default settings folder is implicitly tagged as kSettingTag.
			void			GetProjectItemsFromTag( const VProjectItemTag& inTag, VectorOfProjectItems& outProjectItems) const;
			VProjectItem*	GetProjectItemFromTag( const VProjectItemTag& inTag ) const;

	// tout au format POSIX dans cette methode
	static	void			GetPathRelativeToFolderPath(const XBOX::VString& inFolderPath, const XBOX::VString& inFullPath, XBOX::VString& outRelativePath, bool inDiacritical=true);
	
	// ---------------------------------------
	// Synchronisation de toute la solution ou pas
	// ---------------------------------------
	void					SynchronizeWithFileSystem();

	void					SetAcceptReloadCatalog(bool inAcceptReloadCatalog) {fAcceptReloadCatalog = inAcceptReloadCatalog;};
	bool					AcceptReloadCatalog() {return fAcceptReloadCatalog;};

	void					SetSolutionMessageManager(ISolutionMessageManager* inSolutionMessageManager);
	void					SetSolutionUser(ISolutionUser* inSolutionUser);

	void					UpdateSolutionLinkFile();

	XBOX::VError			ParseCatalogs();
	XBOX::VError			ReloadCatalog(VProjectItem* inProjectItem);

	// Documents parsing handling
	IDocumentParserManager*			GetDocumentParserManager() { return fParsingManager; }

	// ---------------------------------------
	// Pour obtenir le gestionnaire de breakpoints attache a la solution
	// ---------------------------------------
	void							SetBreakPointsManager( ISolutionBreakPointsManager* inBreakPointsManager);
	ISolutionBreakPointsManager*	GetBreakPointsManager() const { return fBreakPointsManager; }

	XBOX::VError					GetDebuggerGroup ( XBOX::VString& outName, XBOX::VUUID& outUUID );
	XBOX::VError					SetDebuggerGroup ( XBOX::VUUID& inUUID );
	XBOX::VValueBag*				RetainUserGroups ( XBOX::VError& outError );
	XBOX::VError					DisableDebuggerGroup ( ); // Anyone can debug, no particular group is assigned as 'action=debug'

	XBOX::VError					SavePermissions ( );


			// Utilities
	static	XBOX::VError			CountFilesAndFolders( const XBOX::VFolder& inFolder, sLONG& outFilesCount, sLONG &outFoldersCount, bool inRecursive);
	static	XBOX::VError			CopyFolder( const XBOX::VFolder& inSourceFolder, XBOX::VFolder& inDestinationFolder, const XBOX::FileCopyOptions inOptions = XBOX::FCP_Default, XBOX::VProgressIndicator *inProgressIndicator = NULL, bool *outUserAbort = NULL);
	
	// Server/client running server files detection system.
	
	static XBOX::VFile*		RetainRunningServerFile ();
	
	// prefer looking into current user folder to avoid permissions problems. 
	static XBOX::VFolder*	RetainRunningServerFilesFolder( bool inAllUsers = false);

	static bool				GetPidFromRunningServerFile (const XBOX::VString &inFileName, uLONG *outPid);
	
	void SetBaseFolderPathStr(const ESymbolFileBaseFolder& inType, const XBOX::VString& inPathStr, const bool& inRefreshProjectsDatabase);
	void GetBaseFolderPathStr(const ESymbolFileBaseFolder& inType, XBOX::VString& outPathStr);

	XBOX::VError			InitFileSystems ( );
	XBOX::VError			DeInitFileSystems ( );

private:
			/**	@brief	Set the root item of the solution. The project item is retained. */
			void			_SetSolutionItem( VProjectItem *inProjectItem);

			/**	@brief	Set the item of the solution file. The project item is retained. */
			void			_SetSolutionFileItem( VProjectItem *inProjectItem);

			/**	@brief	Append the the project to the project list and attach the project items hierarchy.
						If inReferenceIt is true, the project will be referenced in the solution file. */
			void			_AddProject( VProject *inProject, bool inReferenceIt, bool inTouchSolutionFile);

			/**	@brief	Require the project to stop handling file system notifications and to stop updating its symbols table, unload the project,
						and remove the project from the project list. */
			XBOX::VError	_RemoveProject( VProject *inProject, bool inDeleteProjectFolder, bool inTouchSolutionFile);

			/**	@brief	Remove the project from the project list and detach the project items hierarchy. */
			void			_RemoveProject( VProject *inProject, bool inTouchSolutionFile);

			/**	@brief	Add the item to the solution internal containers. */
			void			_DoItemAdded( VProjectItem *inItem, bool inTouchSolutionFile);
			/**	@brief	Remove the item and its children from the solution internal containers. */
			void			_DoItemRemoved( VProjectItem *inItem, bool inTouchSolutionFile);

			bool			_RegisterProjectItem( VProjectItem *inItem);
			bool			_UnregisterProjectItem( VProjectItem *inItem);
			VProjectItem*	_GetProjectItemFromURL( const XBOX::VURL& inURL) const;

			XBOX::VError	_SynchronizeWithFileSystem( VProjectItem *inItem);

			void			_TouchSolutionFile();
			sLONG			_GetSolutionFileDirtyStamp() const					{ return fSolutionFileDirtyStamp; }

	XBOX::VError			_InitializeProjectItem(VProjectItem* inNewProjectItem, const XBOX::VString& inSubType = CVSTR("") );

	XBOX::VError			_LoadSolutionFile();
	XBOX::VError			_SaveSolutionFile( bool inForceSave = false);

	XBOX::VError			_LoadPermissions ( bool inCreateIfDoesNotExist = false );

							/** @brief	A project item is referenced when its reference is stored in the solution file.
										Typically, projects, tagged items and external references are referenced. */
	void					_ReferenceItem( VProjectItem *inItem, bool inTouchSolutionFile);
	void					_UnreferenceItem( VProjectItem *inItem, bool inTouchSolutionFile);
	bool					_IsItemReferenced( VProjectItem *inItem) const;
	bool					_IsVectorContainsReferencedItems( const VectorOfProjectItems& inProjectItems, bool inRecursive) const;

	VProjectItem*			_CreateFileItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive, bool inTouchSolutionFile);
	VProjectItem*			_CreateFolderItemFromPath( XBOX::VError& outError, const XBOX::VFilePath& inPath, bool inRecursive, bool inTouchSolutionFile, bool inSynchronizeWithFileSystem);

			// Utilities
	static	XBOX::VError			_CountFilesAndFolders( const XBOX::VFolder& inFolder, sLONG& outFilesCount, sLONG &outFoldersCount, bool inRecursive);
	static	XBOX::VError			_CopyFolder( const XBOX::VFolder& inSourceFolder, XBOX::VFolder& inDestinationFolder, const XBOX::FileCopyOptions inOptions = XBOX::FCP_Default, XBOX::VProgressIndicator *inProgressIndicator = NULL, bool *outUserAbort = NULL);
	static	XBOX::VError			_ResolveMacro( const XBOX::VFolder& inFolder, const XBOX::VString& inMacroName, const XBOX::VString& inNewName);

	XBOX::VUUID						fUUID;
	VProjectItem*					fSolutionItem;
	VProjectItem*					fSolutionFileProjectItem;
	sLONG							fSolutionFileDirtyStamp;

	ISolutionDelegate*				fDelegate;

	VectorOfProjectItems			fReferencedItems;

	MapOfProjectItemByURL			fProjectItemsMapByURL;

	// on stocke les VProjects d'une solution pour acces facile
	VectorOfProjects				fProjects;

	bool							fSuccessfulLoading;	// si le chargement de la solution est incorrecte, 
												// evite la sauvegarde de celle-ci a sa fermeture consecutive
	bool							fAutoSave;
	bool							fAcceptReloadCatalog;

	VSolutionStartupParameters*		fSolutionStartupParameters;
	ISolutionMessageManager*		fSolutionMessageManager;

	ISolutionUser*					fSolutionUser;
	XBOX::VValueBag*				fPermissions;
	bool							fPermissionsHaveBeenModified;

	ISolutionBreakPointsManager*	fBreakPointsManager;
	IDocumentParserManager*			fParsingManager;
	
	std::map<ESymbolFileBaseFolder, XBOX::VString> fBaseFolderPosixPathStrings;
};



class VSolutionTools
{
public:
			/** @brief	Remove the paths for which an ancestor is already in the vector. */
	static	void					RemoveUselessPaths( std::vector<XBOX::VFilePath>& ioPaths);

	static	void					GetItemsByProject( const VectorOfProjectItems& inItems, std::map< VProject*, VectorOfProjectItems >& outItemsByProject);

	static	XBOX::VError			CopyFile( const XBOX::VFolder& inDestinationFolder, const XBOX::VFilePath& inFilePath, XBOX::VFilePath *outNewFilePath);
	static	XBOX::VError			MoveFile( const XBOX::VFolder& inDestinationFolder, const XBOX::VFilePath& inFilePath, XBOX::VFilePath *outNewFilePath);
	static	XBOX::VError			CopyFolder( const XBOX::VFolder& inDestinationFolder, const XBOX::VFilePath& inFolderPath, XBOX::VFilePath *outNewFolderPath);
	static	XBOX::VError			MoveFolder( const XBOX::VFolder& inDestinationFolder, const XBOX::VFilePath& inFolderPath, XBOX::VFilePath *outNewFolderPath);
};



#endif
