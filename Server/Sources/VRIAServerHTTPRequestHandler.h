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
#ifndef __RIAServer_HTTPRequestHandler__
#define __RIAServer_HTTPRequestHandler__


#include "HTTPServer/Interfaces/CHTTPServer.h"



class VRIAServerProject;
class IRIAJSCallback;



// VHTTPRequestHandler class : base class for the application's HTTP request handlers

class VHTTPRequestHandler : public XBOX::VObject, public IHTTPRequestHandler
{
public:
			VHTTPRequestHandler( VRIAServerProject *inApplication, const XBOX::VString& inPattern);
	virtual ~VHTTPRequestHandler();

	virtual XBOX::VError				GetPatterns( XBOX::VectorOfVString* outPatterns) const;

protected:

			VRIAServerProject			*fApplication;
			XBOX::VectorOfVString		fPatterns;
};



// ----------------------------------------------------------------------------



// VJSRequestHandler class : call a JavaScript request handler from a HTTP request
// The request handler is defined by an abstract JavaScript callback

class VJSRequestHandler : public VHTTPRequestHandler
{
public:
			
			/** @brief	The callback is retained */		
			VJSRequestHandler( VRIAServerProject *inApplication, const XBOX::VString& inPattern, IRIAJSCallback* inCallback);
	virtual ~VJSRequestHandler();

			IRIAJSCallback*			RetainCallback() const;

	virtual	XBOX::VError			HandleRequest( IHTTPResponse* inResponse);

			/** @brief	Registered file will be always included in the JavaScript context in which the request handler is called
						The file is retained */
			void					RegisterIncludedFile( XBOX::VFile* inFile);

private:

	typedef	XBOX::unordered_map_VString<XBOX::VRefPtr<XBOX::VFile> >	MapOfIncludedFiles;

			MapOfIncludedFiles		fIncludedFiles;
			IRIAJSCallback			*fCallback;
};



// ----------------------------------------------------------------------------



// VDebugHTTPRequestHandler class (debugging purpose) : handle the requests sent by Wakanda Studio

class VDebugHTTPRequestHandler : public VHTTPRequestHandler
{
public:

	VDebugHTTPRequestHandler( VRIAServerProject *inApplication, const XBOX::VString& inPattern);
	virtual ~VDebugHTTPRequestHandler();

	virtual	XBOX::VError			HandleRequest( IHTTPResponse* inResponse);

private:

			void					_BeginContextPoolsCleanupHandler();

	typedef struct
	{
		XBOX::VJSGlobalContext	*fJSContext;
		XBOX::VUUID				fJSContextID;
		bool					fRunning;
	} sPersistantJSContextInfo;

	typedef std::map< XBOX::VUUID, sPersistantJSContextInfo >	MapOfJSContextsPerSession;
			
			MapOfJSContextsPerSession	fJSContextsPerSession;
	mutable	XBOX::VCriticalSection		fJSContextsPerSessionMutex;
			uLONG						fPersistantJSContextRunningCount;
};


#endif