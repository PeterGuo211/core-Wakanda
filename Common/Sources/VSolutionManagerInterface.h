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
#ifndef __VSolutionManagerInterface__
#define __VSolutionManagerInterface__


// ----------------------------------------------------------------------------
// Interface pour decoupler les classes VSolution et oldVEditorManager
// ----------------------------------------------------------------------------
class VProjectItem;
typedef std::list<VProjectItem*> ListOfProjectItem;
typedef std::list<VProjectItem*>::iterator ListOfProjectItemIterator;
typedef std::list<VProjectItem*>::const_iterator ListOfProjectItemConstIterator;
typedef std::vector<VProjectItem*> VectorOfProjectItems;
typedef std::vector<VProjectItem*>::iterator VectorOfProjectItemsIterator;
typedef std::vector<VProjectItem*>::const_iterator VectorOfProjectItemsConstIterator;
typedef std::vector<XBOX::VFilePath> VectorOfFilePathes;
typedef std::vector<XBOX::VFilePath>::iterator IteratorOfFilePathes;
typedef std::set<sLONG>						SetOfProjectItemIndex;
typedef std::set<sLONG>::iterator			SetOfProjectItemIndexIterator;
typedef std::set<sLONG>::const_iterator		SetOfProjectItemIndexConstIterator;

// to index the project items by URL
typedef	XBOX::unordered_map_VString< VProjectItem* >					MapOfProjectItemByURL;

typedef XBOX::VString	VProjectItemTag;

class IEditorManager
{
public:
	virtual void GetModifiedAndUnmodifiedFiles( VectorOfFilePathes& outModifiedFiles, VectorOfFilePathes& outUnmodifiedFiles ) = 0;
	virtual bool AskToSaveListOfFiles( VectorOfFilePathes& inModifiedFiles, VectorOfFilePathes& inUnmodifiedFiles ) = 0;
	virtual bool IsBeingEdited( const XBOX::VFilePath& inFilePath ) = 0;
};

// ----------------------------------------------------------------------------
// Interface pour decoupler les classes VSolution et VSolutionUser
// ----------------------------------------------------------------------------
class VSolution;
class ISolutionUser : public XBOX::IRefCountable
{
public:
	virtual void SetSolution(VSolution* inSolution) = 0;
	virtual XBOX::VError LoadFromUserFile(XBOX::VFile& inUserFile) = 0;
	virtual XBOX::VError SaveToUserFile(XBOX::VFile& inUserFile) const = 0;
	virtual void SaveProjectItemPosition( const XBOX::VFilePath& inFilePath, bool inMaximized, sLONG inX, sLONG inY, sLONG inWidth, sLONG inHeight ) = 0;
	virtual bool GetProjectItemPosition( const XBOX::VFilePath& inFilePath, bool& outMaximized, sLONG& outX, sLONG& outY, sLONG& outWidth, sLONG& outHeight ) = 0;
	virtual void GetRIAServerLocation( XBOX::VString& outLocation ) = 0;
	virtual void SetRIAServerLocation( const XBOX::VString& inLocation ) = 0;
	virtual void GetRIAServerType( XBOX::VString& outLocation ) = 0;
	virtual void SetRIAServerType( const XBOX::VString& inLocation ) = 0;

};

#endif
