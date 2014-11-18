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
#ifndef __RIA_SolutionStartupParameters__
#define __RIA_SolutionStartupParameters__



namespace SolutionStartupParametersBagKeys
{
	extern const XBOX::VString kXmlElement;

	EXTERN_BAGKEY_NO_DEFAULT( solutionFile, XBOX::VString);
}

typedef std::pair< XBOX::VString, XBOX::VString > StringsPair;	// first is the solution name, second is the solution link file path
typedef std::map< XBOX::VTime, StringsPair > TimeToStringsPairMultimap;
typedef std::vector<XBOX::VFile*> VectorOfFiles;

class VSolutionStartupParameters : public XBOX::VObject, public XBOX::IRefCountable
{
public:
			VSolutionStartupParameters();
	virtual	~VSolutionStartupParameters();

			void						SetStoreInLinkFile( bool inStoreInLinkFile)		{ fStoreInLinkFile = inStoreInLinkFile; }
			bool						GetStoreInLinkFile() const						{ return fStoreInLinkFile; }
	
			/* @brief	The file is retained */
			void						SetSolutionFileToOpen( XBOX::VFile* inFile);
			XBOX::VFile*				GetSolutionFileToOpen() const;

			XBOX::VError				LoadFromBag( const XBOX::VValueBag& inBag);
			XBOX::VError				SaveToBag( XBOX::VValueBag &inBag) const;

			XBOX::VValueBag&			GetExtraData() { return fBag; }

			void						SetOpenProjectSymbolsTable( bool inOpenProjectSymbolsTable)		{ fOpenProjectSymbolsTable = inOpenProjectSymbolsTable; }
			bool						GetOpenProjectSymbolsTable() const								{ return fOpenProjectSymbolsTable; }

private:

			XBOX::VFile*				fSolutionFileToOpen;
			bool						fStoreInLinkFile;
			XBOX::VValueBag				fBag;
			bool						fOpenProjectSymbolsTable;
};

/* Solution link files utilities
	the extension of a solution link file is defined by RIAFileKind::kSolutionLinkFileExtension
*/

/** @brief	Returns the folder which contain the solution link files */
XBOX::VFolder*	RetainSolutionsLinkFilesFolder( bool inCreateIfNotExists);

/** @brief	Create a solution link file from the startup parameters */
XBOX::VError SaveSolutionStartupParametersToLinkFile( const XBOX::VString& inLinkFileName, const VSolutionStartupParameters& inStartupParameters);

/**	@brief	Load the startup parameters from a solution link file name */
XBOX::VError LoadSolutionStartupParametersFromLinkFile( const XBOX::VString& inLinkFileName, VSolutionStartupParameters& outStartupParameters);

/**	@brief	Load the startup parameters from a solution link file */
XBOX::VError LoadSolutionStartupParametersFromLinkFile( const XBOX::VFile& inLinkFile, VSolutionStartupParameters& outStartupParameters);

void GetMapOfRecentSolutionFiles(TimeToStringsPairMultimap& outRecentSolutionFiles);


#endif