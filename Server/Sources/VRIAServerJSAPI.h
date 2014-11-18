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
#ifndef __RIAServer_ServerSideJavaScriptAPI__
#define __RIAServer_ServerSideJavaScriptAPI__


class IHTTPResponse;
class IHTTPRequest;
class VRIAServerProject;
class VRIAServerSolution;
class VRIAServerApplication;


// Classes names constants
extern const char kSSJS_CLASS_NAME_Solution[];
extern const char kSSJS_CLASS_NAME_Application[];
extern const char kSSJS_CLASS_NAME_HTTPServer[];
extern const char kSSJS_CLASS_NAME_SSL[];
extern const char kSSJS_CLASS_NAME_HTTPServerCache[];
extern const char kSSJS_CLASS_NAME_Console[];
extern const char kSSJS_CLASS_NAME_OS[];
extern const char kSSJS_CLASS_NAME_Process[];

// Properties names constants
extern const char kSSJS_PROPERTY_NAME_Solution[];
extern const char kSSJS_PROPERTY_NAME_Application[];
extern const char kSSJS_PROPERTY_NAME_Database[];
extern const char kSSJS_PROPERTY_NAME_DataStore[];
extern const char kSSJS_PROPERTY_NAME_HTTPServer[];
extern const char kSSJS_PROPERTY_NAME_SSL[];
extern const char kSSJS_PROPERTY_NAME_HTTPServerCache[];
extern const char kSSJS_PROPERTY_NAME_Console[];
extern const char kSSJS_PROPERTY_NAME_SessionStorage[];
extern const char kSSJS_PROPERTY_NAME_AddHttpRequestHandler[];
extern const char kSSJS_PROPERTY_NAME_RemoveHttpRequestHandler[];
extern const char kSSJS_PROPERTY_NAME_GetFolder[];
extern const char kSSJS_PROPERTY_NAME_GetSettingFile[];
extern const char kSSJS_PROPERTY_NAME_GetWalibFolder[];
extern const char kSSJS_PROPERTY_NAME_GetItemsWithRole[];
extern const char kSSJS_PROPERTY_NAME_Name[];
extern const char kSSJS_PROPERTY_NAME_Administrator[];
extern const char kSSJS_PROPERTY_NAME_Pattern[];
extern const char kSSJS_PROPERTY_NAME_Storage[];
extern const char kSSJS_PROPERTY_NAME_Settings[];
extern const char kSSJS_PROPERTY_NAME_Type[];
extern const char kSSJS_PROPERTY_NAME_Internal[];
extern const char kSSJS_PROPERTY_NAME_Directory[];
extern const char kSSJS_PROPERTY_NAME_OS[];
extern const char kSSJS_PROPERTY_NAME_Permissions[];
extern const char kSSJS_PROPERTY_NAME_Process[];
extern const char kSSJS_PROPERTY_NAME_wildchar[];
extern const char kSSJS_PROPERTY_NAME_backupSettings[];

extern const char kSSJS_PROPERTY_NAME_verifyDataStore[];
extern const char kSSJS_PROPERTY_NAME_repairDataStore[];
extern const char kSSJS_PROPERTY_NAME_compactDataStore[];

extern const char kSSJS_PROPERTY_NAME_setCurrentUser[];
extern const char kSSJS_PROPERTY_NAME_loginByKey[];
extern const char kSSJS_PROPERTY_NAME_loginByPassword[];
extern const char kSSJS_PROPERTY_NAME_createUserSession[];
extern const char kSSJS_PROPERTY_NAME_currentUser[];
extern const char kSSJS_PROPERTY_NAME_currentSession[];
extern const char kSSJS_PROPERTY_NAME_getUserSessions[];
extern const char kSSJS_PROPERTY_NAME_logout[];

// ----------------------------------------------------------------------------
// Utilities

bool SetHTTPResponseFromJSValue (const XBOX::VJSValue& inValue, IHTTPResponse *ioResponse);


// ----------------------------------------------------------------------------
// JavaScript API


class VJSHTTPRequestHeader : public XBOX::VJSClass<VJSHTTPRequestHeader, XBOX::VHTTPHeader>
{
public:
	typedef XBOX::VJSClass<VJSHTTPRequestHeader, XBOX::VHTTPHeader>	inherited;

	static	void			Initialize (const XBOX::VJSParms_initialize& inParms, XBOX::VHTTPHeader *inHeader);
	static	void			Finalize (const XBOX::VJSParms_finalize& inParms, XBOX::VHTTPHeader *inHeader);
	static	void			GetProperty (XBOX::VJSParms_getProperty& ioParms, XBOX::VHTTPHeader *inHeader);
	static	bool			SetProperty (XBOX::VJSParms_setProperty& ioParms, XBOX::VHTTPHeader *inHeader);
	static	void			GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, XBOX::VHTTPHeader *inHeader);
	static	void			GetDefinition (ClassDefinition& outDefinition);

	static void				_GetHeaderValue (XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VHTTPHeader *inHeader);  // headerValue : getValue(headerName)

private:
	static void				_GetHeaderNameFromPropertyName (const XBOX::VString& inPropertyName, XBOX::VString& outHeaderName);

	static std::map<XBOX::VString, XBOX::VString>	fCommonHeaders;
};


// ----------------------------------------------------------------------------


class VJSHTTPResponseHeader : public XBOX::VJSClass<VJSHTTPResponseHeader, XBOX::VHTTPHeader>
{
public:
	typedef XBOX::VJSClass<VJSHTTPResponseHeader, XBOX::VHTTPHeader>	inherited;

	static	void			Initialize (const XBOX::VJSParms_initialize& inParms, XBOX::VHTTPHeader *inHeader);
	static	void			Finalize (const XBOX::VJSParms_finalize& inParms, XBOX::VHTTPHeader *inHeader);
	static	void			GetProperty (XBOX::VJSParms_getProperty& ioParms, XBOX::VHTTPHeader *inHeader);
	static	bool			SetProperty (XBOX::VJSParms_setProperty& ioParms, XBOX::VHTTPHeader *inHeader);
	static	void			GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, XBOX::VHTTPHeader *inHeader);
	static	void			GetDefinition (ClassDefinition& outDefinition);

	static void				_GetHeaderValue (XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VHTTPHeader *inHeader);  // headerValue : getValue(headerName)
	static void				_SetHeaderValue (XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VHTTPHeader *inHeader);  // setValue(headerName, headerValue)

private:
	static void				_GetHeaderNameFromPropertyName (const XBOX::VString& inPropertyName, XBOX::VString& outHeaderName);

	static std::map<XBOX::VString, XBOX::VString>	fCommonHeaders;
};


// ----------------------------------------------------------------------------


class VJSHTTPRequest : public XBOX::VJSClass<VJSHTTPRequest, IHTTPRequest>
{
public:
	typedef XBOX::VJSClass<VJSHTTPRequest, IHTTPRequest>	inherited;

	static	void			Initialize (const XBOX::VJSParms_initialize& inParms, IHTTPRequest *inRequest);
	static	void			Finalize (const XBOX::VJSParms_finalize& inParms, IHTTPRequest *inRequest);
	static	void			GetDefinition (ClassDefinition& outDefinition);

	static	void			_GetURL (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetRawURL (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetURLPath (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetURLQuery (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetHost (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetMethod (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetVersion (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetUser (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetPassword (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetRequestLine (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetHeaders (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetBody (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetParts (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetContentType (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetLocalAddress (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetLocalPort (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetIsSSL (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetRemoteAddress (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetRemotePort (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);

	/*
	 *	Internal Use Only - Do NOT document the following function
	 */
	static	void			_ResolveURL (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPRequest *inRequest);
};


// ----------------------------------------------------------------------------


class VJSHTTPResponse : public XBOX::VJSClass<VJSHTTPResponse, IHTTPResponse>
{
public:
	typedef XBOX::VJSClass<VJSHTTPResponse, IHTTPResponse>	inherited;

	static	void			Initialize (const XBOX::VJSParms_initialize& inParms, IHTTPResponse *inResponse);
	static	void			Finalize (const XBOX::VJSParms_finalize& inParms, IHTTPResponse *inResponse);
	static	void			GetProperty (XBOX::VJSParms_getProperty& ioParms, IHTTPResponse *inResponse);
	static	bool			SetProperty (XBOX::VJSParms_setProperty& ioParms, IHTTPResponse *inResponse);
	static	void			GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, IHTTPResponse *inResponse);
	static	void			GetDefinition (ClassDefinition& outDefinition);

	static	void			_SendChunkedData (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPResponse *inResponse);
	static	void			_SetCompression (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPResponse *inResponse);
	static	void			_SetCacheBodyMessage (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPResponse *inResponse);
};

// ----------------------------------------------------------------------------



class VJSHTTPServer : public XBOX::VJSClass<VJSHTTPServer, VRIAServerProject>
{
public:
	typedef XBOX::VJSClass<VJSHTTPServer, VRIAServerProject>	inherited;

	static	void			Initialize (const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inRIAServerProject);
	static	void			Finalize (const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inRIAServerProject);
	static	void			GetDefinition (ClassDefinition& outDefinition);

	// Functions
	static	void			_start (XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inRIAServerProject);
	static	void			_stop (XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inRIAServerProject);

	// Properties getters
	static	void			_getStarted (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject);
	static	void			_getPort (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject);
	static	void			_getIpAddress (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject);
	static	void			_getHostName (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject);
	static	void			_getDefaultCharSet (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject);
	static	void			_getSSL (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject);
	static	void			_getCache (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject);
};



// ----------------------------------------------------------------------------



class VJSHTTPServerCache : public XBOX::VJSClass< VJSHTTPServerCache, VRIAServerProject>
{
public:
	typedef XBOX::VJSClass< VJSHTTPServerCache, VRIAServerProject>	inherited;

	static	void			Initialize (const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inRIAServerProject);
	static	void			Finalize (const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inRIAServerProject);
	static	void			GetDefinition (ClassDefinition& outDefinition);

	// Properties getters
	static	void			_getEnabled (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject);
	static	void			_getMemorySize (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject);
};



// ----------------------------------------------------------------------------



class VJSSSL : public XBOX::VJSClass< VJSSSL, VRIAServerProject>
{
public:
	typedef XBOX::VJSClass<VJSSSL, VRIAServerProject>	inherited;

	static	void			Initialize (const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inRIAServerProject);
	static	void			Finalize (const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inRIAServerProject);
	static	void			GetDefinition (ClassDefinition& outDefinition);

	// Function
	static	void			_getCertificatePath (XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inRIAServerProject);
	static	void			_getCertificateFolder (XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inRIAServerProject);

	// Properties getters
	static	void			_getEnabled (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject);
	static	void			_getPort (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject);
};



#endif
