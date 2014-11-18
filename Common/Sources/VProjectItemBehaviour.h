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
#ifndef __VProjectItemBehaviour__
#define __VProjectItemBehaviour__


#include "VSolutionManagerConstants.h"
#include "VProjectItem.h"


class VSolution;
class VProject;
class VCatalog;



/*
	VProjectItemBehaviour: base class for item behaviour implementation
*/

class VProjectItemBehaviour : public XBOX::VObject
{
public:
			VProjectItemBehaviour( VProjectItem *inOwner);
	virtual	~VProjectItemBehaviour();
			
			void						SetOwner( VProjectItem *inOwner)						{ fOwner = inOwner; }
			VProjectItem*				GetOwner() const										{ return fOwner; }

	virtual	bool						ConformsTo( const XBOX::VString& inFileKindID) const	{ return false; }

	virtual	VProjectItem::e_ProjectItemKind		GetKind() const									{ return VProjectItem::eUNDEFINED; }

	virtual	VSolution*					GetSolution() const										{ return NULL; }
	virtual	VProject*					GetProject() const										{ return NULL; }
	virtual	VCatalog*					GetCatalog() const										{ return NULL; }
	
	virtual	bool						IsPhysicalFile() const									{ return false; }
	virtual	bool						IsPhysicalFolder() const								{ return false; }
	virtual	bool						IsVirtualFolder() const									{ return false; }
	virtual	bool						IsSystemFile() const									{ return false; }
	virtual	XBOX::VString				GetXMLElementName() const								{ return kXML_ELEMENT_UNDEFINED; }

	virtual	XBOX::VError				GetModificationTime( XBOX::VTime& outModificationTime) const	{ return XBOX::VE_UNIMPLEMENTED; }

	virtual	void						GetDescription( XBOX::VString& outDescription) const	{ outDescription.Clear(); }
	
	virtual	bool						Exists() const											{ return false; }
	virtual	XBOX::VError				Delete()												{ return XBOX::VE_UNIMPLEMENTED; }
	virtual	XBOX::VError				Rename( const XBOX::VString& inNewName)					{ return XBOX::VE_UNIMPLEMENTED; }
	virtual	XBOX::VError				Create()												{ return XBOX::VE_UNIMPLEMENTED; }


	virtual	bool						Create(const XBOX::VURL& inURL)							{ return false; }
	virtual bool						CopyTo(const XBOX::VURL& inSrcURL,const XBOX::VURL& inDestURL)	{ return false; }
	virtual bool						MoveTo(const XBOX::VURL& inSrcURL,const XBOX::VURL& inDestURL)	{ return false; }

	virtual	bool						Create(const XBOX::VString& inFullPath)					{ return false; }

protected:
			VProjectItem				*fOwner;
};



/*
	VProjectItemFolder: implement the folder item behaviour
*/

class VProjectItemFolder : public VProjectItemBehaviour
{
public:
			VProjectItemFolder( VProjectItem *inOwner);
	virtual ~VProjectItemFolder();

			/**	@brief	Create a standard item for a folder:
							- the item name is "inFolderName"
							- the item display name is "inFolderName"
							- the path relative to parent is "inFolderName/"
			*/
	static	VProjectItem*				Instantiate( const XBOX::VString& inFolderName, VProjectItem *inParent);

	static	VProjectItem*				Instantiate( const XBOX::VURL& inURL, VProjectItem *inParent, bool inExternalReference);


			/**	@brief	Create an item for a folder. If inResolveRelativePath is true and inParent is not NULL, 
						the item keep only a path relative to the parent instead of the full URL.
	static	VProjectItem*				Instantiate( const XBOX::VURL& inURL, VProjectItem *inParent, bool inResolveRelativePath); */

	virtual	bool						ConformsTo( const XBOX::VString& inFileKindID) const;

	virtual	VProjectItem::e_ProjectItemKind		GetKind() const									{ return VProjectItem::eFOLDER; }

	virtual	bool						IsPhysicalFolder() const								{ return true; }
	virtual	XBOX::VString				GetXMLElementName() const								{ return kXML_ELEMENT_FOLDER; }

	virtual	XBOX::VError				GetModificationTime( XBOX::VTime& outModificationTime) const;

	virtual	void						GetDescription( XBOX::VString& outDescription) const;

	virtual	bool						Exists() const;
	virtual	XBOX::VError				Delete();
	virtual	XBOX::VError				Rename( const XBOX::VString& inNewName);
	virtual	XBOX::VError				Create();

	virtual	bool						Create(const XBOX::VURL& inURL);
	virtual	bool						CopyTo(const XBOX::VURL& inSrcURL, const XBOX::VURL& inDestURL);
	virtual	bool						MoveTo(const XBOX::VURL& inSrcURL, const XBOX::VURL& inDestURL);

	virtual	bool						Create(const XBOX::VString& inFullPath);

			XBOX::VFolder*				RetainFolder() const;

private:
			XBOX::VError				_MoveTo(const XBOX::VFolder& srcFolder, XBOX::VFolder& destFolder);
};



/*
	VProjectItemSolution: implement the solution item behaviour
*/

class VProjectItemSolution : public VProjectItemFolder
{
public:
	VProjectItemSolution( VProjectItem *inOwner);
	virtual ~VProjectItemSolution();

			/**	@brief	Create an item for the solution. inURL may be the solution folder url. */
	static	VProjectItem*				Instantiate( const XBOX::VURL& inURL, const XBOX::VString& inSolutionName);

	virtual	VSolution*					GetSolution() const								{ return fSolution; }
			void						SetSolution( VSolution* inSolution)				{ fSolution = inSolution; }

	virtual	VProjectItem::e_ProjectItemKind		GetKind() const							{ return VProjectItem::eSOLUTION; }

	virtual	XBOX::VString				GetXMLElementName() const						{ return kXML_ELEMENT_SOLUTION; }

private:
			VSolution					*fSolution;
};



class VMediaLibraryFolder : public VProjectItemFolder
{
public:
			VMediaLibraryFolder( VProjectItem *inOwner);
	virtual	~VMediaLibraryFolder();
			
	virtual	VProjectItem::e_ProjectItemKind		GetKind() const									{ return VProjectItem::eMEDIA_LIBRARY; }
};


class VWidgetsFolder : public VProjectItemFolder
{
public:
			VWidgetsFolder( VProjectItem *inOwner);
	virtual	~VWidgetsFolder();
			
	virtual	VProjectItem::e_ProjectItemKind		GetKind() const									{ return VProjectItem::eWIDGETS; }
};


class VThemesFolder : public VProjectItemFolder
{
public:
			VThemesFolder( VProjectItem *inOwner);
	virtual	~VThemesFolder();
			
	virtual	VProjectItem::e_ProjectItemKind		GetKind() const									{ return VProjectItem::eTHEMES; }
};


/*
	VProjectItemProject: implement the project item behaviour
*/

class VProjectItemProject : public VProjectItemFolder
{
public:
	VProjectItemProject( VProjectItem *inOwner);
	virtual ~VProjectItemProject();

			/**	@brief	Create an item for the project. inURL may be the project folder url. */
	static	VProjectItem*				Instantiate( const XBOX::VURL& inURL, const XBOX::VString& inProjectName);

	virtual	VProjectItem::e_ProjectItemKind		GetKind() const									{ return VProjectItem::ePROJECT; }

	virtual	VProject*					GetProject() const										{ return fProject; }
	virtual	void						SetProject( VProject *inProject)						{ fProject = inProject; }

	virtual	XBOX::VString				GetXMLElementName() const								{ return kXML_ELEMENT_PROJECT; }

private:
			VProject					*fProject;
};



/*
	VProjectItemFile: implement the file item behaviour
*/

class VProjectItemFile : public VProjectItemBehaviour
{
public:
	VProjectItemFile();
	VProjectItemFile( VProjectItem *inOwner);
	virtual ~VProjectItemFile();

			/**	@brief	Create a standard item for a file:
							- the item name is "inFileName"
							- the item display name is "inFileName"
							- the path relative to parent is "inFileName"
			*/
	static	VProjectItem*				Instantiate( const XBOX::VString& inFileName, VProjectItem *inParent);

	static	VProjectItem*				Instantiate( const XBOX::VURL& inURL, VProjectItem *inParent, bool inExternalReference);

	virtual	VProjectItem::e_ProjectItemKind		GetKind() const									{ return VProjectItem::eFILE; }

	virtual	bool						ConformsTo( const XBOX::VString& inFileKindID) const;

	virtual	bool						IsPhysicalFile() const									{ return true; }
	virtual	bool						IsSystemFile() const;
	virtual	XBOX::VString				GetXMLElementName() const								{ return kXML_ELEMENT_FILE; }

	virtual	XBOX::VError				GetModificationTime( XBOX::VTime& outModificationTime) const;

	virtual	void						GetDescription( XBOX::VString& outDescription) const;

	virtual	bool						Exists() const;
	virtual	XBOX::VError				Delete();
	virtual	XBOX::VError				Rename( const XBOX::VString& inNewName);
	virtual	XBOX::VError				Create();

	virtual	bool						Create(const XBOX::VURL& inURL);
	virtual	bool						CopyTo(const XBOX::VURL& inSrcURL, const XBOX::VURL& inDestURL);
	virtual	bool						MoveTo(const XBOX::VURL& inSrcURL, const XBOX::VURL& inDestURL);

	virtual	bool						Create(const XBOX::VString& inFullPath);

			XBOX::VFile*				RetainFile() const;
};



/*
	VProjectItemCatalog: implement the catalog item behaviour
*/

class VProjectItemCatalog : public VProjectItemFile
{
public:
	VProjectItemCatalog( VProjectItem *inOwner);
	virtual ~VProjectItemCatalog();

			/**	@brief	Create a standard item for a catalog file:
							- the item name is "inFileName"
							- the item display name is "inFileName"
							- the path relative to parent is "inFileName"
			*/
	static	VProjectItem*				Instantiate( const XBOX::VString& inFileName, VProjectItem *inParent);

	virtual	VProjectItem::e_ProjectItemKind		GetKind() const					{ return VProjectItem::eCATALOG_FILE; }

	virtual	bool						IsVirtualFolder() const					{ return true; }

	virtual	VCatalog*					GetCatalog() const						{ return fCatalog; }
			void						SetCatalog( VCatalog *inCatalog)		{ fCatalog = inCatalog; }

private:
			VCatalog					*fCatalog;
};



/*
	VProjectItemDataClass: implement the data class item behaviour
*/

class VProjectItemDataClass : public VProjectItemBehaviour
{
public:
	VProjectItemDataClass( VProjectItem *inOwner);
	virtual ~VProjectItemDataClass();

			/**	@brief	Create a standard item for a data class:
							- the item name is "inDataClassName"
							- the item display name is "inDataClassName"
			*/
	static	VProjectItem*				Instantiate( const XBOX::VString& inDataClassName, VProjectItem *inParent);

	virtual	VProjectItem::e_ProjectItemKind		GetKind() const									{ return VProjectItem::eDATA_CLASS; }

	virtual	bool						IsVirtualFolder() const									{ return true; }

	virtual	void						GetDescription( XBOX::VString& outDescription) const;

	virtual	bool						Exists() const;

	typedef enum {eLocal, eRemote}		e_DataClassType;
	
	e_DataClassType						GetType() const											{return fType;}
	void								SetType(e_DataClassType t)								{fType = t;}

private:
	e_DataClassType						fType;
};


/*
	VProjectItemDataClassAttribute: implement the data class  attribute item behaviour
*/

class VProjectItemDataClassAttribute : public VProjectItemBehaviour
{
public:
	VProjectItemDataClassAttribute( VProjectItem *inOwner);
	virtual ~VProjectItemDataClassAttribute();

			/**	@brief	Create a standard item for a data class attribute:
							- the item name is "inAttributeName"
							- the item display name is "inAttributeName"
			*/
	static	VProjectItem*				Instantiate( const XBOX::VString& inAttributeName, VProjectItem *inParent);

	virtual	VProjectItem::e_ProjectItemKind		GetKind() const									{ return VProjectItem::eDATA_CLASS_ATTRIBUTE; }

	virtual	void						GetDescription( XBOX::VString& outDescription) const;

	virtual	bool						Exists() const;
};





#endif