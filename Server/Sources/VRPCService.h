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
#ifndef __VRPCService__
#define __VRPCService__


class VRIAServerProject;
class VProject;
class VProjectItem;
class VRPCCatalog;
class IHTTPResponse;
class VJSRequestHandler;
class VProxyRequestHandler;
class IHTTPServerProject;
class CHTTPServer;
class VRIAContext;
class IHTTPRequest;
class IHTTPResponse;


class VRPCService : public XBOX::VObject, public XBOX::IRefCountable
{
public:
			VRPCService( VRIAServerProject* inApplication, IHTTPServerProject *inHTTPServerProject);
	virtual	~VRPCService();

			VRIAServerProject*				GetApplication() const;

			/** @brief	Pattern changes will be applied during next service starting. */
			void							SetPatternForProxy( const XBOX::VString& inPattern);
			void							GetPatterns( XBOX::VString& outPatternForMethods, XBOX::VString& outPatternForProxy) const;

			void							SetPublishInClientGlobalNamespace( bool inPublishInClientGlobalNamespace);
			bool							GetPublishInClientGlobalNamespace() const;
			
			XBOX::VError					SetEnabled( bool inEnabled);

			bool							IsEnabled() const;
		
			/** @brief	Returns the rpc proxy file according to the rpc module path. */
			XBOX::VError					GetProxy( XBOX::VString& outProxy, const XBOX::VString& inModulePath, const XBOX::VString& inNamespace, const IHTTPRequest* inRequest, IHTTPResponse* inResponse);

private:
			VJSRequestHandler*				_CreateRequestHandlerForMethods();
			VProxyRequestHandler*			_CreateRequestHandlerForProxy();

			VRIAServerProject				*fApplication;
			VProject						*fDesignProject;
			IHTTPServerProject				*fHTTPServerProject;
			bool							fPublishInClientGlobalNamespace;

			XBOX::VString					fPatternForMethods;
			XBOX::VString					fPatternForProxy;

			VProxyRequestHandler			*fProxyRequestHandler;
			VJSRequestHandler				*fMethodsRequestHandler;

	mutable	XBOX::VCriticalSection			fMutex;
};


#endif
