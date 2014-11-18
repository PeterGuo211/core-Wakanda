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
#ifndef __VPROJECTITEM__
#define __VPROJECTITEM__

#include "VSolutionManagerInterface.h"


// ci-dessous, doit etre >= 1 car utilise comme parametre inUserItemRef dans 
// VTreeItem(inString, inUserItemRef, inIconID, inAnonymousData, fDatabase)
#define PROJECT_ITEM_INDEX_START 1


// ----------------------------------------------------------------------------
// Classe pour representer tous les items d'une solution
// en fait ce sont un peu comme des proxy qui permettent d'acceder facilement
// aux ressources physiques
// Les VProjectItems ont une structure d'arbre dont la racine est l'element solution
// ----------------------------------------------------------------------------

class VProject;
class VSolution;
class VProjectItemBehaviour;
class VCatalog;


class VProjectItem : public XBOX::VObject, public XBOX::IRefCountable
{
public:
	friend class VProjectItemIterator;
	friend class VSolution;
	friend class VProject;
	friend class VCatalog;
	friend class VSolutionExplorerDialog;

	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// 230409 : ATTENTION !!! toute modification ici doit etre reportee dans la methode
	// SOLUTION_CONSTANTS du code 4D associe au Solution Manager
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	typedef enum {
		eUNDEFINED					= 0,	// item de type non defini : ne doit pas se produire
		eFILE						= 1,
		eCATALOG_FILE				= 5,
		eFOLDER						= 500,	// dossier physique
		ePROJECT					= 501,	// dossier physique et projet
		eMEDIA_LIBRARY				= 502,
		eWIDGETS					= 503,
		eTHEMES						= 504,
		eDATA_CLASS					= 901,
		eDATA_CLASS_ATTRIBUTE		= 902,
		eSOLUTION					= 1000,
		// -------------------------------
		// !!! CI-DESSOUS : NE PAS PRENDRE EN COMPTE !!!
		// > 10000 : ne sont pas utilises directement dans les projectItems,
		// mais permettent d'unifier certains traitements -> pur trick
		// voir VProjectItemManager::CountProjectItemsContains
		// -------------------------------
		eEXTERNAL_REFERENCE			= 10000
	} e_ProjectItemKind;

	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// 230409 : ATTENTION !!! toute modification ci-dessus doit etre reportee dans la 
	// methode PjM_INIT du code 4D associe au Solution Manager
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	// --------------------------
	// Constructeurs, destructeur
	// --------------------------
	VProjectItem(e_ProjectItemKind inKind = eUNDEFINED);	
	VProjectItem(const XBOX::VURL& inURL, e_ProjectItemKind inKind = eUNDEFINED);
	VProjectItem( VProjectItemBehaviour *inBehaviour);
	virtual ~VProjectItem();

			// -------------------------------------------------------------------------
			// Properties accessors
	
			/** @brief	inName is the full item name (with the extension) */
			void						SetName( const XBOX::VString& inName);
			void						GetName( XBOX::VString& outName, bool inWithExtension = true) const;
			void						GetNameWithoutExtension( XBOX::VString& outName) const;

			void						GetExtension( XBOX::VString& outExtension) const;

			void						SetDisplayName( const XBOX::VString& inDisplayName)	{ fDisplayName = inDisplayName; }
			void						GetDisplayName( XBOX::VString& outName) const		{ outName = fDisplayName; }
			const XBOX::VString&		GetDisplayName() const								{ return fDisplayName; }
	
			/** @brief	The item becomes the owner of the behaviour.
						The behaviour is used to manage the item content. */
			void						SetBehaviour( VProjectItemBehaviour *inBehaviour);
			VProjectItemBehaviour*		GetBehaviour() const;

			/** @brief	the user data is retained */
			void						SetUserData( XBOX::IRefCountable *inUserData);
			XBOX::IRefCountable*		GetUserData() const;
			bool						HasUserData() const									{ return fUserData != NULL; }

			// Tags utilities : an item can be associated with one or several tags
			void						AddTag( const VProjectItemTag& inTag);
			void						RemoveTag( const VProjectItemTag& inTag);
			void						RemoveAllTags();
			bool						IsTagged() const;
			bool						HasTag( const VProjectItemTag& inTag) const;
			void						GetTags( std::vector<VProjectItemTag>& outTags) const;

			e_ProjectItemKind			GetKind() const;
			bool						ConformsTo( const XBOX::VString& inFileKindID) const;
			void						GetDescription( XBOX::VString& outDescription) const;

			void						Touch();
			uLONG						GetStamp() const;

			XBOX::VValueBag*			GetBag() const										{ return fBag; }

			void						SetExternalReference( bool inExternalReference)		{ fExternalReference = inExternalReference; }
			bool						IsExternalReference() const							{ return fExternalReference; }

			/**	@brief	The physical link is valid when the physical item exists.
						Used only in the case of referenced items. */
			void						SetPhysicalLinkValid( bool inSet)					{ fPhysicalLinkValid = inSet; }
			bool						IsPhysicalLinkValid() const							{ return fPhysicalLinkValid; }

			XBOX::VString				GetXMLElementName() const;

			// URL and path accessors
			void						SetURL( const XBOX::VURL& inURL);
			bool						GetURL( XBOX::VURL& outURL)	const;
			XBOX::VURL					GetURL() const;

			// The path is relative to the parent item
			bool						HasRelativePath() const								{ return !fRelativePath.IsEmpty(); }
			void						SetRelativePath( const XBOX::VString& inRelativePath, XBOX::EURLPathStyle inStyle = XBOX::eURL_POSIX_STYLE);
			void						GetRelativePath( XBOX::VString& outRelativePath, XBOX::EURLPathStyle inStyle = XBOX::eURL_POSIX_STYLE) const;

			// Parent solution accessors
			VSolution*					GetSolutionOwner();
			VProjectItem*				GetProjectItemSolutionOwner();

			// Parent project accessors
			VProject*					GetProjectOwner();
			VProjectItem*				GetProjectItemProjectOwner();

			/**	@brief	Returns the item unique ID. */
			sLONG						GetID() const										{ return fID; }

			// -------------------------------------------------------------------------
			// Children accessors

			VProjectItem*				FindChildByID( sLONG inID) const;
			VProjectItem*				FindChildByRelativePath( const XBOX::VString& inRelativePath, XBOX::EURLPathStyle inStyle = XBOX::eURL_POSIX_STYLE) const;
			
			VProjectItem*				FindChildByName(const XBOX::VString& inName) const;

			void						GetTaggedChildren( VectorOfProjectItems& ioItems, bool inRecursive) const;
			
			// -------------------------------------------------------------------------
			// Content accessors (the content is for exemple the physical file or physical folder)
			
			bool						ContentExists() const;

			/** @brief	Delete the item content */
			XBOX::VError				DeleteContent();

			/** @brief	Rename the item content.
						If the rename succeeded, all dependent properties are updated: name, display name, url or relative path. */
			XBOX::VError				RenameContent( const XBOX::VString& inNewName);

			XBOX::VError				CreateContent();

	// --------------------------
	// Path, URL
	// --------------------------
	// si le VProjectItem est un fichier physique (ou un folder), GetFilePath  
	// renseigne outFilePath avec le VFilePath correspondant.
	// GetFilePath retourne false si ce n'est pas un fichier physique
	// >>> YOU MUST USE THIS METHOD TO GET VFilePath <<<
	// >>> Ne pas passer par l'URL en general car pas forcement definie <<<
	bool GetFilePath(XBOX::VFilePath& outFilePath) const;
	// Reserver les URL lorsque l'on a besoin de stocker un chemin absolu ou 
	// manier les eURL_POSIX_STYLE, etc
	// construit le path complet sous forme de VString (au format eURL_NATIVE_STYLE) a partir des localPaths
	bool BuildFullPath(XBOX::VString& outFullPath) const;

	// --------------------------
	// Path logique
	// --------------------------
	// construit le path logique complet sous forme de String
	void BuildLogicalFullPath(XBOX::VString& outFullPath);

	// fournit la liste des items d'un type donne, enfants de l'item appelant :
	void GetProjectItemsList(uWORD inProjectItemKind, std::list<VProjectItem*>& outProjectItemsList, bool inIncludeMe = true);
	void GetProjectItemsVector(uWORD inProjectItemKind, VectorOfProjectItems& outProjectItemsVector, bool inIncludeMe = true);
	// fournit la liste des items d'une extension donnee, enfants de l'item appelant et de type eFILE :
	void GetProjectItemsVector(XBOX::VString inExtension, VectorOfProjectItems& outProjectItemsVector, bool inIncludeMe = true, bool inRecursive = true);
	// trouve s'il existe le premier VProjectItem* ayant un VFilePath specifique parmi les enfants du VProjectItem this
	VProjectItem* FindProjectItemInChildren(const XBOX::VFilePath& inVFilePath, bool inIncludeMe = true);

	// --------------------------
	// Methodes booleennes
	// --------------------------
	bool CheckAnyProjectItemParentIsExternalReference(bool inIncludeMe = false) const;

	// ------------------------------------
	// Structure en arbre des VProjectItems
	// ------------------------------------
	void AttachChild(VProjectItem* inProjectItem);
	void DetachChild(VProjectItem* inProjectItem);
	void SetParent(VProjectItem* inParent) {fParent = inParent;}
	VProjectItem* GetParent() const {return fParent;}
	VProjectItem* NewChild(e_ProjectItemKind inKind = eUNDEFINED);
	VProjectItem* NewChild(const XBOX::VURL& inURL, e_ProjectItemKind inKind = eUNDEFINED);
	inline bool HasChildren() const;
	void DeleteChildren();
	inline sLONG GetCountChildren() const;

	// -------------------
	// Methodes Is, Has...
	// -------------------
	bool IsChildOf(VProjectItem* inProjectItem) const;
	bool IsParentOf( VProjectItem* inProjectItem) const;
	bool HasFilePath() const;
	bool IsPhysicalFileOrFolder() const;
	bool IsPhysicalFile() const;
	bool IsPhysicalFolder() const;
	bool IsVirtualFolder() const;
	bool IsSystemFile() const; // comprendre que le fichier est considere comme un fichier systeme pour nous (Wakanda)

	// -------------------
	// Proprietes "speciales" des VProjectItems
	// -------------------
	// pour signifier un objet physique associe detruit ou dereference
	void SetGhost(bool inGhost);
	bool IsGhost() const {return fGhost;}

	// ---------------
	// Autres methodes
	// ---------------
	// profondeur de l'item
	void SetLevel(sLONG level) {fLevel = level;};
	sLONG GetLevel() {return fLevel;};

	// ---------------------------------
	// Manipulation de l'item physique 
	// ---------------------------------
	bool CreatePhysicalItem();
	bool CopyPhysicalItemFrom(const XBOX::VURL& inSrcURL);
	bool CopyOrMovePhysicalItemTo(const XBOX::VURL& inSrcURL, const XBOX::VURL& inDestURL, bool inCopy);
	
	bool CreatePhysicalChildren(bool inRecursive);

#if VERSIONDEBUG
static sLONG sNbProjectItem;
#endif
static void DebugDumpOutput();

protected:
	void		_GetProjectItemsVector(uWORD inProjectItemKind, VectorOfProjectItems& outProjectItemsVector);
	void		_GetProjectItemsVector(XBOX::VString inExtension, VectorOfProjectItems& outProjectItemsVector, bool inRecursive);
	// ci-dessous, methode tres lente, a utiliser ponctuellement : on lui preferera la methode
	// GetProjectItemFromFullPath d'un VProject lorsque possible
	VProjectItem* _FindProjectItemInChildren(const XBOX::VFilePath& inVFilePath);

	XBOX::VURL	fURL;

	XBOX::VValueBag* fBag;

	bool		fExternalReference;
	
	ListOfProjectItem fChildren;

private:
			
			void					_CreateItemBehaviour( e_ProjectItemKind inKind);

	// retrouver un (ou +r) VProjectItem depuis path partiel
	bool _GetProjectItemFromPartialPath(const XBOX::VString& inPartialPath, VectorOfProjectItems& ioFoundProjectItems);
	VProjectItem* _GetProjectItemFromPartialPath(const XBOX::VString& inPartialPath); // SI ON SAIT que la reponse est unique

	bool _AutoRegisterInMapOfFullPathes(bool inRegisterChildren);
	bool _AutoUnregisterFromMapOfFullPathes(bool inUnregisterChildren);

	void _SetGhost(bool inGhost) {fGhost = inGhost;}

			XBOX::VString	fName;			// the full item name (with extension)
			XBOX::VString	fDisplayName;				// nom affiche
			uLONG			fStamp;

	XBOX::VString fRelativePath;			// The path relative to the parent item
	sLONG fID;				// cree initialement pour pouvoir reperer un item depuis la ListBox du SolutionExplorer

	// Structure d'arbre
	VProjectItem* fParent;
	// ci-dessous :  toujours utiliser les methodes GetProjectItemSolutionOwner et GetProjectItemProjectOwner pour y acceder !!!
	// you must always use GetProjectItemSolutionOwner() instead fProjectItemSolutionOwner
	VProjectItem* fProjectItemSolutionOwner;// pointeur sur la solution proprietaire pour des raisons d'optimisation
	// you must always use GetProjectItemProjectOwner() instead fProjectItemProjectOwner
	VProjectItem* fProjectItemProjectOwner; // pointeur sur le projet proprietaire pour des raisons d'optimisation
	
	VProjectItemBehaviour* fBehaviour;	// definit le comportement de l'item physique
											// associe au VProjectItem (pattern Strategie)
											// n'est cree que si necessaire (pattern Procuration)

	sLONG		fLevel;						// indique la profondeur du VProjectItem dans l'arbre

	bool		fPhysicalLinkValid;			// un item reference dans le fichier projet mais inexistant physiquement
	bool		fGhost;						// a cause des Retain-Release, la duree de vie d'un VProjectItem
											// peut etre plus longue que l'objet auquel il est associe... surtout
											// vrai dans le cas du deplacement d'un fichier depuis l'exterieur
											// fGhost indique que l'on a affaire a un item fantome (brrr)
	std::vector<VProjectItemTag>	fTags;

			XBOX::IRefCountable	*fUserData;
};

// ----------------------------------------------------------------------------
// Classe VProjectItemIterator pour faciliter les operations sur l'arbre des VProjectItems
// ----------------------------------------------------------------------------
class VProjectItemIterator : public XBOX::VObject
{
public:
	VProjectItemIterator(const VProjectItem* inProjectItem);
	
			const VProjectItemIterator&		operator++()		{ ++fCurrent; return *this; }
											operator VProjectItem*()	{ return *fCurrent; }
			VProjectItem*					operator->()		{ return *fCurrent; }
			VProjectItem&					operator*()			{ return *(*fCurrent); }
			bool							IsValid() const		{ return /*(fProjectItems != NULL) &&*/ (fCurrent != fProjectItems.end());}
	
private:
			ListOfProjectItem					fProjectItems;
			std::list<VProjectItem*>::iterator	fCurrent;
};




// ----------------------------------------------------------------------------
// VProjectItemManager class
// ----------------------------------------------------------------------------

class VProjectItemManager : public XBOX::VObject
{
public:
	virtual ~VProjectItemManager();

	static				VProjectItemManager* Get();
	static				bool Init( bool inWithProjectItemUniqueID);
	static				void DeInit();

	bool				IsProjectItemUniqueIDRequired() const					{ return fWithProjectItemUniqueID; }
	sLONG				RegisterProjectItem( VProjectItem *inProjectItem);
	void				UnregisterProjectItem( VProjectItem *inProjectItem);
	VProjectItem*		GetProjectItemFromID( sLONG inID) const;

	// ---------------------------------------
	// Fonctions utilitaires sur fichiers et les folders
	// ---------------------------------------
	sLONG				CountProjectItemsContains(const VectorOfProjectItems& inProjectItems, VProjectItem::e_ProjectItemKind inProjectItemKind);
	
	static sLONG		GetFilesCountInFolderAndSubfolder(const XBOX::VFolder& inFolder);
	static bool			FileCopyTo(const XBOX::VURL& inSrcURL, const XBOX::VURL& inDestURL);
	static bool			FileMoveTo(const XBOX::VURL& inSrcURL, const XBOX::VURL& inDestURL);
	static bool			FolderCopyOrMoveTo(const XBOX::VURL& inSrcURL, const XBOX::VURL& inDestURL, bool inCopy);

	static bool			FileCopyTo(const XBOX::VFilePath& inSrcFilePath, const XBOX::VFilePath& inDestFilePath, XBOX::VProgressIndicator* inProgressIndicator = NULL, bool* outUserAbort = NULL);
	static bool			FileMoveTo(const XBOX::VFilePath& inSrcFilePath, const XBOX::VFilePath& inDestFilePath, XBOX::VProgressIndicator* inProgressIndicator = NULL, bool* outUserAbort = NULL);
	static bool			FolderCopyTo(const XBOX::VFilePath& inSrcFilePath, const XBOX::VFilePath& inDestFilePath, XBOX::VProgressIndicator* inProgressIndicator = NULL, bool* outUserAbort = NULL);
	static bool			FolderMoveTo(const XBOX::VFilePath& inSrcFilePath, const XBOX::VFilePath& inDestFilePath, XBOX::VProgressIndicator* inProgressIndicator = NULL, bool* outUserAbort = NULL);
	static bool			FolderCopyOrMoveTo(const XBOX::VFilePath& inSrcFilePath, const XBOX::VFilePath& inDestFilePath, bool inCopy);

private:
	VProjectItemManager( bool inWithProjectItemUniqueID);													
	VProjectItemManager (const VProjectItemManager &);
	VProjectItemManager& operator=(const VProjectItemManager&);

	static	VProjectItemManager						*sProjectItemManager;
			std::map< sLONG , VProjectItem* >		fMapOfProjectItemIDs;
			sLONG									fNextProjectItemID;
			bool									fWithProjectItemUniqueID;
			XBOX::VCriticalSection					fMutex;
};

// ----------------------------------------------------------------------------
// Pattern Composite
// ----------------------------------------------------------------------------
class IProjectItemFilter : public XBOX::IRefCountable
{
public:
	virtual	void	Reset() = 0;
	virtual	void	AddProjectItemFilter(IProjectItemFilter* inProjectItemFilter) = 0;
	virtual	bool	Matches(VProjectItem* inProjectItem) const = 0;
};

// filtre tres simple : test sur l'extension et/ou sur le motif du filtre
class VProjectItemBasicFilter : public XBOX::VObject, public IProjectItemFilter
{
public:
	typedef enum {
		eEXTENSION_NONE,
		eEXTENSION_BEGINS_WITH,
		eEXTENSION_EQUALS_TO,
		eEXTENSION_CONTAINS,					
		eEXTENSION_ENDS_WITH,
		eEXTENSION_BEGINS_WITH_AND_ENDS_WITH
	} e_FilterExtensionAction;

	typedef enum {
		eMOTIF_NONE,
		eMOTIF_BEGINS_WITH,
		eMOTIF_EQUALS_TO,
		// recherche stricte sur le nom sans l'extension
		eMOTIF_STRICTLY_CONTAINS,			
		eMOTIF_STRICTLY_ENDS_WITH,
		eMOTIF_STRICTLY_BEGINS_WITH_AND_ENDS_WITH,
		// recherche large sur le nom complet (avec l'extension)
		eMOTIF_CONTAINS,					
		eMOTIF_ENDS_WITH
	} e_FilterMotifAction;

	// --------------------------
	// Constructeurs, destructeur
	// --------------------------
	VProjectItemBasicFilter(XBOX::VString inFilterExtensionStart = "",
							XBOX::VString inFilterExtension = "",
							XBOX::VString inFilterExtensionEnd = "",
							e_FilterExtensionAction inFilterExtensionAction = eEXTENSION_CONTAINS,
							XBOX::VString inFilterMotifStart = "", 
							XBOX::VString inFilterMotif = "",
							XBOX::VString inFilterMotifEnd = "", 
							e_FilterMotifAction inFilterMotifAction = eMOTIF_CONTAINS);	
	virtual ~VProjectItemBasicFilter();

	void	SetFilter(	XBOX::VString inFilterExtensionStart = "",
						XBOX::VString inFilterExtension = "",
						XBOX::VString inFilterExtensionEnd = "",
						e_FilterExtensionAction inFilterExtensionAction = eEXTENSION_CONTAINS,
						XBOX::VString inFilterMotifStart = "", 
						XBOX::VString inFilterMotif = "", 
						XBOX::VString inFilterMotifEnd = "", 
						e_FilterMotifAction inFilterMotifAction = eMOTIF_CONTAINS);

	void	Reset() {SetFilter();};
	void	AddProjectItemFilter(IProjectItemFilter* inProjectItemFilter) {};
	bool	Matches(VProjectItem* inProjectItem) const;
	
protected:

private:
	XBOX::VString fFilterExtensionStart;
	XBOX::VString fFilterExtension;
	XBOX::VString fFilterExtensionEnd;
	e_FilterExtensionAction fFilterExtensionAction;
	XBOX::VString fFilterMotif;
	XBOX::VString fFilterMotifStart;
	XBOX::VString fFilterMotifEnd;
	e_FilterMotifAction fFilterMotifAction;
};

// filtre compose de la reunion de VProjectItemBasicFilter...
typedef std::vector<IProjectItemFilter*> VectorOfProjectItemFilters;
typedef std::vector<IProjectItemFilter*>::iterator VectorOfProjectItemFiltersIterator;
typedef std::vector<IProjectItemFilter*>::const_iterator VectorOfProjectItemFiltersConstIterator;
class VProjectItemFilter : public XBOX::VObject, public IProjectItemFilter
{
public:
	// --------------------------
	// Constructeurs, destructeur
	// --------------------------
	VProjectItemFilter() {};	
	virtual ~VProjectItemFilter() {};

	void	Reset();
	void	AddProjectItemFilter(IProjectItemFilter* inProjectItemFilter) {projectItemFilters.push_back(inProjectItemFilter);};
	bool	Matches(VProjectItem* inProjectItem) const;
	
protected:

private:
	VectorOfProjectItemFilters projectItemFilters;
};

// ----------------------------------------------------------------------------
// Fonctions inline
// ----------------------------------------------------------------------------

inline bool VProjectItem::HasChildren() const
{
	return !fChildren.empty();
}

inline sLONG VProjectItem::GetCountChildren() const
{
	return (sLONG) fChildren.size();
}



// ----------------------------------------------------------------------------
// Project items static utilities

class VProjectItemTools
{
public:
			/** @brief	Remove the items for which an ancestor is already in the vector. */
	static	void					RemoveUselessItems( VectorOfProjectItems& ioItems);

			/** @brief	Returns the flattened children list. */
	static	void					GetChildren( VProjectItem *inProjectItem, VectorOfProjectItems& ioChildren, bool inRecursive);

			/** @brief	Returns the flattened list of child file. */
	static	void					GetChildFile( VProjectItem *inProjectItem, VectorOfProjectItems& ioChildren, bool inRecursive);

	static	VProjectItem*			GetFirstCommonParent( const VectorOfProjectItems &inProjectItems);
};



// ----------------------------------------------------------------------------
// Project item role constants
extern const VProjectItemTag kSettingTag;
extern const VProjectItemTag kCatalogTag;
extern const VProjectItemTag kBackupsTag;
extern const VProjectItemTag kDataTag;
extern const VProjectItemTag kDataFolderTag;
extern const VProjectItemTag kRPCCatalogTag;
extern const VProjectItemTag kBootstrapTag;
extern const VProjectItemTag kUAGDirectoryTag;
extern const VProjectItemTag kPermissionsTag;
extern const VProjectItemTag kWebFolderTag;
extern const VProjectItemTag kWidgetsFolderTag;
extern const VProjectItemTag kThemesFolderTag;
extern const VProjectItemTag kWebComponentFolderTag;
extern const VProjectItemTag kProjectCertificatesFolderTag;
extern const VProjectItemTag kSolutionCertificatesFolderTag;
extern const VProjectItemTag kSystemWorkersTag;


enum
{
	ePITP_Default							= 0x00000000,
	ePITP_ApplyToSingleFile					= 0x00000001,
	ePITP_ApplyToMultipleFiles				= 0x00000002,
	ePITP_ApplyToSingleFolder				= 0x00000004,
	ePITP_ApplyToMultipleFolders			= 0x00000008,
	ePITP_ApplyToFolderContent				= 0x00000010
};
typedef uLONG EProjectItemTagProperties;


namespace ProjectItemTagBagKeys
{
	EXTERN_BAGKEY_WITH_DEFAULT( fileKindID, XBOX::VString);
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( properties, XBOX::VLong, uLONG);
	EXTERN_BAGKEY( defaultFolders);
	EXTERN_BAGKEY( defaultFiles);
	EXTERN_BAGKEY_NO_DEFAULT( path, XBOX::VString);
	EXTERN_BAGKEY( extraBag);
}



class VProjectItemTagManager : public XBOX::VObject
{
public:

	typedef std::map< VProjectItemTag, XBOX::VRefPtr<XBOX::VValueBag> >						MapOfTagInfo;
	typedef std::map< VProjectItemTag, XBOX::VRefPtr<XBOX::VValueBag> >::iterator			MapOfTagInfo_iter;
	typedef std::map< VProjectItemTag, XBOX::VRefPtr<XBOX::VValueBag> >::const_iterator		MapOfTagInfo_citer;

	static	VProjectItemTagManager*	Get();

	static	bool						Init();
	static	void						DeInit();
			
			/**	@brief	Returns false if the tag is already registered */
			bool						RegisterProjectItemTag(	const VProjectItemTag& inTag,
																const XBOX::VString& inDefaultFileKindID,
																EProjectItemTagProperties inProperties,
																const XBOX::VectorOfVString* inDefaultFolders,
																const XBOX::VectorOfVString* inDefaultFiles);

			bool						IsRegisteredProjectItemTag( const VProjectItemTag& inTag) const;
			void						GetProjectItemTagCollection( std::vector<VProjectItemTag>& outTags) const;

			/**	@brief	Returns false if  the tag is not registered or if the default file kind is unknown */
			bool						GetDefaultFileKindID( const VProjectItemTag& inTag, XBOX::VString& outFileKindID) const;

			/**	@brief	Returns false if  the tag is not registered or if the default extension is unknown */
			bool						GetDefaultExtension( const VProjectItemTag& inTag, XBOX::VString& outExtension) const;

			/**	@brief	Returns NULL if  the tag is not registered or if the default file kind is unknown */
			XBOX::VFileKind*			RetainDefaultFileKind( const VProjectItemTag& inTag) const;

			/**	@brief	Returns ePITP_Default if  the tag is not registered */
			EProjectItemTagProperties	GetProperties( const VProjectItemTag& inTag) const;

			/**	@brief	Returns a vector of posix folder paths relative to the project folder to use by default.
						An empty path means that the project folder must be used as a default folder.
						The prefered default folder is the first item of the vector
						Returns false if  the tag is not registered or if the tag has none default folders */
			bool						GetDefaultFolders( const VProjectItemTag& inTag, XBOX::VectorOfVString& outPaths) const;
			bool						GetPreferedDefaultFolder( const VProjectItemTag& inTag, XBOX::VString& outPath) const;

			/**	@brief	Returns a vector of posix file paths relative to the project folder to use by default.
						The prefered default file is the first item of the vector
						Returns false if  the tag is not registered or if the tag has none default files */
			bool						GetDefaultFiles( const VProjectItemTag& inTag, XBOX::VectorOfVString& outPaths) const;

			/** @brief	The extra bag is retained */
			bool						SetExtraBag( const VProjectItemTag& inTag, XBOX::VValueBag* inBag) const;
			XBOX::VValueBag*			RetainExtraBag( const VProjectItemTag& inTag) const;

			// Utilities
	static	bool						Find( const VProjectItemTag& inTag, const std::vector<VProjectItemTag>& inWhere);
			
private:
			VProjectItemTagManager() {;}
	virtual ~VProjectItemTagManager() {;}

			void						_VectorOfPathsToBagArray( const XBOX::VectorOfVString& inPaths, XBOX::VBagArray& outBagArray) const;
			void						_BagArrayToVectorOfPaths( const XBOX::VBagArray& inBagArray, XBOX::VectorOfVString& outPaths) const;

	static	VProjectItemTagManager		*sManager;
			MapOfTagInfo				fMapOfTagsInfo;	// the key is the project item tag
};

#endif
