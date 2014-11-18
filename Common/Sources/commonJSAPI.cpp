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

#include "commonJSAPI.h"


USING_TOOLBOX_NAMESPACE

// ----------------------------------------------------------------------------
// Utilities

/*	JSReturnFolderOrFile
	
	kind and format parameters are optional

	if kind parameter is 'path':
		if format parameter is 'posix', a posix path is returned. It's the default value.
		if format parameter is 'system', a system path is returned.

	if kind parameter is 'relativePath':
		if format parameter is 'posix', a posix path which is relative to the parent folder is returned. It's the default value.
		if format parameter is 'system', a system path which is relative to the parent folder is returned.
	
	if kind parameter is 'url':
		if format parameter is 'encoded', an encoded URL is returned. It's the default value.
		if format parameter is 'notEncoded', an unencoded URL is returned.

	in all other cases, a Folder or a File object is returned according to the path kind.
*/

static bool JSReturnFolderOrFileAsString( const VFilePath& inPath, VFileSystem *inFileSystem, XBOX::VJSParms_callStaticFunction& ioParms, size_t inKindParamIndex, size_t inFormatParamIndex)
{
	bool done = false;
	if (!inPath.IsEmpty())
	{
		VString kind;
		if (ioParms.GetStringParam( inKindParamIndex, kind))
		{
			if (kind.EqualToString( L"path", true))
			{
				VString strPath;
				bool posix = true;
			#if VERSIONWIN
				if (!ioParms.IsNullOrUndefinedParam( inFormatParamIndex))
					posix = ioParms.GetBoolParam( inFormatParamIndex, L"posix", L"system");
			#endif

				if (posix)
				{
#if VERSIONWIN == 1

					VURL url( inPath);

					url.GetPath( strPath, eURL_POSIX_STYLE, false);
					
#else	// VERSIONMAC == 1 || VERSION_LINUX == 1
					
					// WAK0071601.

#define BUFFER_SIZE	4096

					VFolder	folder(inPath);
					
					folder.GetPath(strPath, FPS_POSIX);
					
					char	path[BUFFER_SIZE], resolvedPath[BUFFER_SIZE];
					size_t	size;
					
					strPath.ToBlock(path, 4096, VTC_UTF_8, true, false);
					
					::realpath(path, resolvedPath);
					size = ::strlen(resolvedPath);
					
					strPath.FromBlock(resolvedPath, size, VTC_UTF_8); 
					strPath.AppendChar('/');
					
#endif					
				}
				else
				{
					inPath.GetPath( strPath);
				}

				ioParms.ReturnString( strPath);

				done = true;
			}
			else if (kind.EqualToString( L"url", true))
			{
				bool encoded = (!ioParms.IsNullOrUndefinedParam( inFormatParamIndex)) ? ioParms.GetBoolParam( inFormatParamIndex, L"encoded", L"notEncoded") : true;

				VString absoluteUrl;
				VURL url( inPath);
				url.GetAbsoluteURL( absoluteUrl, encoded);
				ioParms.ReturnString( absoluteUrl);
				done = true;
			}
			else if (kind.EqualToString( L"relativePath", true))
			{
				VString relativePath;

				if (inFileSystem != NULL)
				{
					VFilePath parentFolderPath( inFileSystem->GetRoot());
					bool posix = true;

				#if VERSIONWIN
					if (!ioParms.IsNullOrUndefinedParam( inFormatParamIndex))
						posix = ioParms.GetBoolParam( inFormatParamIndex, L"posix", L"system");
				#endif

					inPath.GetRelativePath( parentFolderPath, relativePath);

					if(!relativePath.IsEmpty() && (relativePath[0] == FOLDER_SEPARATOR))
						relativePath.Remove( 1, 1);
					
					if (posix)
						VURL::Convert( relativePath, eURL_NATIVE_STYLE, eURL_POSIX_STYLE, true);
				}

				ioParms.ReturnString( relativePath);
				done = true;
			}
		}
	}
	
	return done;
}


void JSReturnFolderOrFile( const VFilePath& inPath, VFileSystem *inFileSystem, XBOX::VJSParms_callStaticFunction& ioParms, size_t inKindParamIndex, size_t inFormatParamIndex)
{
	if (!JSReturnFolderOrFileAsString( inPath, inFileSystem, ioParms, inKindParamIndex, inFormatParamIndex))
		ioParms.ReturnFilePathAsFileOrFolder( inPath);
}


void JSReturnFolder( VFolder *inFolder, VJSParms_callStaticFunction& ioParms, size_t inKindParamIndex, size_t inFormatParamIndex)
{
	if (inFolder == NULL)
		ioParms.ReturnNullValue();
	else if (!JSReturnFolderOrFileAsString( inFolder->GetPath(), inFolder->GetFileSystem(), ioParms, inKindParamIndex, inFormatParamIndex))
		ioParms.ReturnFolder( inFolder);
}


void JSReturnFile( VFile *inFile, VJSParms_callStaticFunction& ioParms, size_t inKindParamIndex, size_t inFormatParamIndex)
{
	if (inFile == NULL)
		ioParms.ReturnNullValue();
	else if (!JSReturnFolderOrFileAsString( inFile->GetPath(), inFile->GetFileSystem(), ioParms, inKindParamIndex, inFormatParamIndex))
		ioParms.ReturnFile( inFile);
}