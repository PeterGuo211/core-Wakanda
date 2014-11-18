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
#ifndef __FilesExtensions_ria__
#define __FilesExtensions_ria__


namespace RIAFileKind
{
	// Extension constant strings
	extern const XBOX::VString kSolutionFileExtension;
	extern const XBOX::VString kProjectFileExtension;
	extern const XBOX::VString kPreferencesFileExtension;
	extern const XBOX::VString kSettingsFileExtension;
	extern const XBOX::VString kDataFileExtension;
	extern const XBOX::VString kDataIndexFileExtension;
	extern const XBOX::VString kCatalogFileExtension;
	extern const XBOX::VString kRemoteCatalogFileExtension;
	extern const XBOX::VString kRemoteConfigFileExtension;
	extern const XBOX::VString kPageFolderExtension;
	extern const XBOX::VString kSolutionLinkFileExtension;
	extern const XBOX::VString kFileLinkFileExtension;
	extern const XBOX::VString kDirectoryFileExtension;
	extern const XBOX::VString kPermissionsFileExtension;
	extern const XBOX::VString kRPCCatalogFileExtension;
	extern const XBOX::VString kSymbolFileExtension;
	extern const XBOX::VString kSymbolDataFileExtension;
	extern const XBOX::VString kMatchFileExtension;
	extern const XBOX::VString kWebComponentFileExtension;
	extern const XBOX::VString kCacheUAGFileExtension;
	extern const XBOX::VString kLogFileExtension;

	// Standard extensions
	extern const XBOX::VString kCSSFileExtension;
	extern const XBOX::VString kHTMFileExtension;
	extern const XBOX::VString kHTMLFileExtension;
	extern const XBOX::VString kJSFileExtension;
	extern const XBOX::VString kJSONFileExtension;
	extern const XBOX::VString kPHPFileExtension;
	extern const XBOX::VString kSQLFileExtension;
	extern const XBOX::VString kXMLFileExtension;
	extern const XBOX::VString kTXTFileExtension;
	extern const XBOX::VString kICOFileExtension;
	extern const XBOX::VString kGIFFileExtension;
	extern const XBOX::VString kJPGFileExtension;
	extern const XBOX::VString kPNGFileExtension;

	// File kind constant strings
	extern const XBOX::VString kSolutionFileKind;
	extern const XBOX::VString kProjectFileKind;
	extern const XBOX::VString kStudioPreferencesFileKind;
	extern const XBOX::VString kSettingsFileKind;
	extern const XBOX::VString kDataFileKind;
	extern const XBOX::VString kDataIndexFileKind;
	extern const XBOX::VString kCatalogFileKind;
	extern const XBOX::VString kRemoteCatalogFileKind;
	extern const XBOX::VString kRemoteConfigFileKind;
	extern const XBOX::VString kSolutionLinkFileKind;
	extern const XBOX::VString kFileLinkFileKind;
	extern const XBOX::VString kUAGDirectoryFileKind;
	extern const XBOX::VString kUAGPermissionsFileKind;
	extern const XBOX::VString kUAGCacheFileKind;
	extern const XBOX::VString kRPCCatalogFileKind;
	extern const XBOX::VString kLogFileKind;
	extern const XBOX::VString kSymbolFileKind;
	extern const XBOX::VString kSymbolDataFileKind;
	extern const XBOX::VString kMatchFileKind;
	extern const XBOX::VString kWebComponentFileKind;
	extern const XBOX::VString kPageFolderFileKind;
	extern const XBOX::VString kCSSFileKind;
	extern const XBOX::VString kJSONFileKind;
	extern const XBOX::VString kSQLFileKind;
	extern const XBOX::VString kProjectBackupFileKind;
}

#endif