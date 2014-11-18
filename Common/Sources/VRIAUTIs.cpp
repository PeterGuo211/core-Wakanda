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


namespace RIAFileKind
{
	// Extension constant strings
	const XBOX::VString kSolutionFileExtension     ( "waSolution"     );
	const XBOX::VString kProjectFileExtension      ( "waProject"      );
	const XBOX::VString kPreferencesFileExtension  ( "waPreferences"  );
	const XBOX::VString kSettingsFileExtension     ( "waSettings"     );
	const XBOX::VString kDataFileExtension         ( "waData"         );
	const XBOX::VString kDataIndexFileExtension    ( "waIndex"        );
	const XBOX::VString kCatalogFileExtension      ( "waModel"        );
	const XBOX::VString kRemoteCatalogFileExtension( "waRemoteModel"  );
	const XBOX::VString kRemoteConfigFileExtension ( "waRemoteConfig" );
	const XBOX::VString kPageFolderExtension       ( "waPage"         );
	const XBOX::VString kSolutionLinkFileExtension ( "waSolutionLink" );
	const XBOX::VString kFileLinkFileExtension     ( "waFileLink"     );
	const XBOX::VString kDirectoryFileExtension    ( "waDirectory"    );
	const XBOX::VString kPermissionsFileExtension  ( "waPerm"         );
	const XBOX::VString kRPCCatalogFileExtension   ( "waRpc"          );
	const XBOX::VString kSymbolFileExtension       ( "waSym"          );
	const XBOX::VString kSymbolDataFileExtension   ( "waSymData"      );
	const XBOX::VString kMatchFileExtension		   ( "Match"          );
	const XBOX::VString kWebComponentFileExtension ( "waComponent"    );
	const XBOX::VString kCacheUAGFileExtension     ( "cacheUAG"       );
	const XBOX::VString kLogFileExtension		   ( "waLog"	      );


	// Standard extensions
	const XBOX::VString kCSSFileExtension  ( "css"  );
	const XBOX::VString kHTMFileExtension  ( "htm"  );
	const XBOX::VString kHTMLFileExtension ( "html" );
	const XBOX::VString kJSFileExtension   ( "js"   );
	const XBOX::VString kJSONFileExtension ( "json" );
	const XBOX::VString kPHPFileExtension  ( "php"  );
	const XBOX::VString kSQLFileExtension  ( "sql"  );
	const XBOX::VString kXMLFileExtension  ( "xml"  );
	const XBOX::VString kTXTFileExtension  ( "txt"  );
	const XBOX::VString kICOFileExtension  ( "ico"  );
	const XBOX::VString kGIFFileExtension  ( "gif"  );
	const XBOX::VString kJPGFileExtension  ( "jpg"  );
	const XBOX::VString kPNGFileExtension  ( "png"  );

	// File kind constant strings
	const XBOX::VString kSolutionFileKind          ( "com.4d.wakanda.solution"           );
	const XBOX::VString kProjectFileKind           ( "com.4d.wakanda.project"            );
	const XBOX::VString kStudioPreferencesFileKind ( "com.4d.wakanda.studio.preferences" );
	const XBOX::VString kSettingsFileKind          ( "com.4d.wakanda.setting"            );
	const XBOX::VString kDataFileKind              ( "com.4d.wakanda.data"               );
	const XBOX::VString kDataIndexFileKind         ( "com.4d.wakanda.index"              );
	const XBOX::VString kCatalogFileKind           ( "com.4d.wakanda.db-model"           );
	const XBOX::VString kRemoteCatalogFileKind     ( "com.4d.wakanda.remotedb-model"     );
	const XBOX::VString kRemoteConfigFileKind      ( "com.4d.wakanda.remotedb-config"     );
	const XBOX::VString kSolutionLinkFileKind      ( "com.4d.wakanda.solutions-link"     );
	const XBOX::VString kFileLinkFileKind          ( "com.4d.wakanda.files-link"         );
	const XBOX::VString kUAGDirectoryFileKind      ( "com.4d.wakanda.uag-directory"      );
	const XBOX::VString kUAGPermissionsFileKind    ( "com.4d.wakanda.uag-permissions"    );
	const XBOX::VString kUAGCacheFileKind		   ( "com.4d.wakanda.uag-cache"			 );
	const XBOX::VString kRPCCatalogFileKind        ( "com.4d.wakanda.rpc-catalog"        );
	const XBOX::VString kLogFileKind		       ( "com.4d.wakanda.logfile"            );
	const XBOX::VString kSymbolFileKind            ( "com.4d.wakanda.symbol"             );
	const XBOX::VString kSymbolDataFileKind        ( "com.4d.wakanda.symbol-data"        );
	const XBOX::VString kMatchFileKind		       ( "com.4d.4d.match"					 );
	const XBOX::VString kWebComponentFileKind      ( "com.4d.wakanda.web-component"      );
	const XBOX::VString kPageFolderFileKind        ( "com.4d.wakanda.page-folder"        );
	const XBOX::VString kCSSFileKind			   ( "com.4d.wakanda.css"				 );
	const XBOX::VString kJSONFileKind			   ( "com.4d.wakanda.json"				 );
	// "public.sql" is defined in BasicUTIs.plist for Windows and Linux but does not seem to exist on Mac OS X.
	// So, this kind should be private and named "com.4d.wakanda.sql"
	const XBOX::VString kSQLFileKind			   ( "public.sql"						 );
	const XBOX::VString kProjectBackupFileKind	   ( "com.4d.wakanda.project-backup"	 );
}


