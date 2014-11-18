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
#include "VSolutionStartupParameters.h"

USING_TOOLBOX_NAMESPACE


namespace SolutionStartupParametersBagKeys
{
	const XBOX::VString kXmlElement( "solutionLink");

	CREATE_BAGKEY_NO_DEFAULT( solutionFile, XBOX::VString);
}


VSolutionStartupParameters::VSolutionStartupParameters()
: fSolutionFileToOpen(NULL), fStoreInLinkFile(true), fOpenProjectSymbolsTable(true)
{
}


VSolutionStartupParameters::~VSolutionStartupParameters()
{
	ReleaseRefCountable( &fSolutionFileToOpen);
}


void VSolutionStartupParameters::SetSolutionFileToOpen( VFile* inFile)
{
	CopyRefCountable( &fSolutionFileToOpen, inFile);
}


VFile* VSolutionStartupParameters::GetSolutionFileToOpen() const
{
	return fSolutionFileToOpen;
}


VError VSolutionStartupParameters::LoadFromBag( const VValueBag& inBag)
{
	VError err = VE_OK;
	VString str;

	ReleaseRefCountable( &fSolutionFileToOpen);

	if (SolutionStartupParametersBagKeys::solutionFile.Get( &inBag, str) && !str.IsEmpty())
	{
		if ( str.BeginsWith( "file:///" ) )
		{
			VURL url;
			url.FromString( str, false );
			fSolutionFileToOpen = new XBOX::VFile( url );
		}
		else
		{
			VFilePath path( str );
			fSolutionFileToOpen = new XBOX::VFile( path );
		}
	}

	return err;
}

VError VSolutionStartupParameters::SaveToBag( VValueBag &inBag) const
{
	VError err = VE_OK;
	
	if (fSolutionFileToOpen != NULL)
	{
		VFilePath path = fSolutionFileToOpen->GetPath();
		VString str;
		path.GetPath( str );
		SolutionStartupParametersBagKeys::solutionFile.Set( &inBag, str);
	}

	return err;
}

VFolder* RetainSolutionsLinkFilesFolder( bool inCreateIfNotExists)
{
	VFolder *folder = NULL;
	
	VFolder *parent = VProcess::Get()->RetainProductSystemFolder( eFK_UserPreferences, inCreateIfNotExists);
	if (parent != NULL)
	{
		folder = new VFolder( *parent, CVSTR( "Recent Solutions"));
		if (folder != NULL)
		{
			if (!folder->Exists() && inCreateIfNotExists)
				folder->CreateRecursive();
		}
		parent->Release();
	}
	return folder;
}


VError SaveSolutionStartupParametersToLinkFile( const VString& inLinkFileName, const VSolutionStartupParameters& inStartupParameters)
{
	VError err = VE_OK;
	
	if (!inLinkFileName.IsEmpty())
	{
		VFolder *folder = RetainSolutionsLinkFilesFolder( true);
		if (folder != NULL)
		{
			VValueBag bag;
			err = inStartupParameters.SaveToBag( bag);
			if (err == VE_OK)
			{
				VFilePath path;
				folder->GetPath( path);
				VString fileName( inLinkFileName );
				path.SetFileName( fileName, false);
				path.SetExtension( RIAFileKind::kSolutionLinkFileExtension);
			
				sLONG num = 0;
				bool tryAgain;

				do
				{
					tryAgain = false;
					VFile toTest( path );
					if ( toTest.Exists() )
					{
						VSolutionStartupParameters parameters;
						if ( VE_OK == LoadSolutionStartupParametersFromLinkFile( fileName, parameters ) )
						{
							if ( parameters.GetSolutionFileToOpen() && inStartupParameters.GetSolutionFileToOpen() )
							{
								if ( parameters.GetSolutionFileToOpen()->GetPath() != inStartupParameters.GetSolutionFileToOpen()->GetPath() )
								{
									num++;
									VString strNum;
									strNum.FromLong( num );
									fileName = inLinkFileName + "-" + strNum;
									path.SetFileName( fileName, false );
									tryAgain = true;
								}
							}
						}
					}
				} while ( tryAgain );


				VFile file( path);
				err = WriteBagToFileInXML( bag, SolutionStartupParametersBagKeys::kXmlElement, &file);
			}
			folder->Release();
		}
		else
		{
			err = VE_FOLDER_NOT_FOUND;
		}
	}
	else
	{
		err = VE_FILE_BAD_NAME;
	}

	return err;
}


VError LoadSolutionStartupParametersFromLinkFile( const VString& inLinkFileName, VSolutionStartupParameters& outStartupParameters)
{
	VError err = VE_OK;
	
	VFolder *folder = RetainSolutionsLinkFilesFolder( false);
	if (folder != NULL)
	{
		VFilePath path;
		folder->GetPath( path);
		path.SetFileName( inLinkFileName, false);
		path.SetExtension( RIAFileKind::kSolutionLinkFileExtension);
		
		VFile file( path);
		err = LoadSolutionStartupParametersFromLinkFile( file, outStartupParameters);

		folder->Release();
	}
	else
	{
		err = VE_FOLDER_NOT_FOUND;
	}

	return err;
}

VError LoadSolutionStartupParametersFromLinkFile( const VFile& inLinkFile, VSolutionStartupParameters& outStartupParameters)
{
	VError err = VE_OK;
	
	if (inLinkFile.Exists())
	{
		VValueBag bag;
		err = LoadBagFromXML(inLinkFile, SolutionStartupParametersBagKeys::kXmlElement, bag, XML_ValidateNever);
		if (err == VE_OK)
		{
			err = outStartupParameters.LoadFromBag( bag);
		}
	}
	else
	{
		err = VE_FILE_NOT_FOUND;
	}

	return err;
}

void GetMapOfRecentSolutionFiles( TimeToStringsPairMultimap& outRecentSolutionFiles)
{
	XBOX::VFolder *folder = RetainSolutionsLinkFilesFolder( false);
	// Reads favorites
	if (folder != NULL && folder->Exists())
	{
		//Iterate through the waLink files
		VFileIterator file(folder, FI_WANT_FILES | FI_ITERATE_DELETE);
		for(  ; file.IsValid() ; ++file)
		{
			if (file->ConformsTo(RIAFileKind::kSolutionLinkFileKind))
			{
				VSolutionStartupParameters solutionStartupParameters;

				VError err = LoadSolutionStartupParametersFromLinkFile( *file, solutionStartupParameters);
				if (err == VE_OK)
				{
					VFile *solutionFileToOpen = solutionStartupParameters.GetSolutionFileToOpen();
					if (solutionFileToOpen != NULL)
					{
						VString solutionFileName, linkPath;
						VTime lastModificationTime;
						
						file->GetTimeAttributes( &lastModificationTime, NULL, NULL);
						solutionFileToOpen->GetNameWithoutExtension( solutionFileName);
						file->GetPath( linkPath);	// sc 03/03/2010 set the full path of solution link file

						StringsPair fileNameAndIPPair( solutionFileName, linkPath);
						outRecentSolutionFiles.insert( TimeToStringsPairMultimap::value_type( lastModificationTime, fileNameAndIPPair));
					}
				}
			}
		}
	}
	ReleaseRefCountable(&folder);
}

