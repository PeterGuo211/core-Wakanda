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
#include "VSolution.h"
#include "VProject.h"
#include "VProjectItem.h"
#include "VRIAServerHTTPRequestHandler.h"
#include "VRIAServerJSContextMgr.h"
#include "VRPCCatalog.h"
#include "VRIAServerProject.h"
#include "VRIAServerApplication.h"
#include "VRIAServerTools.h"
#include "VRIAServerProjectContext.h"
#include "VRPCService.h"


USING_TOOLBOX_NAMESPACE



class VProxyRequestHandler : public VHTTPRequestHandler
{
public:
			VProxyRequestHandler( VRIAServerProject* inApplication, const VString& inPattern, VRPCService* inService)
			: VHTTPRequestHandler( inApplication, inPattern)
			{
				fService = inService;
				fPattern = inPattern;
			}

	virtual ~VProxyRequestHandler()
			{
			}

	virtual	VError HandleRequest( IHTTPResponse* inResponse)
			{
				if (inResponse == NULL)
					return VE_INVALID_PARAMETER;

				VError err = VE_OK;
				bool done = false;

				// First, extract the relative path from the url
				VString path = inResponse->GetRequest().GetURLPath();
				VRegexMatcher *matcher = VRegexMatcher::Create( fPattern, &err);
				if ((matcher != NULL) && (err == VE_OK))
				{
					bool match = matcher->Find( path, 1, false, &err);
					if (match && (err == VE_OK))
					{
						// Remove the pattern from the path
						path.Remove( matcher->GetGroupStart(0), matcher->GetGroupLength(0));

						// Check whether a namespace is specified
						VString lNamespaceKey( L"namespace=");
						VString lNamespace = inResponse->GetRequest().GetURLQuery();
						if (lNamespace.BeginsWith( lNamespaceKey))
							lNamespace.Remove( 1, lNamespaceKey.GetLength());
						else
							lNamespace.Clear();

						// Now, we have a relative  module path
						VString proxy;
						err = fService->GetProxy( proxy, path, lNamespace, &inResponse->GetRequest(), inResponse);
						if (err == VE_OK)
						{
							VString contentType( L"application/javascript");
							err = SetHTTPResponseString( inResponse, proxy, &contentType);
							done = true;
						}
					}
				}
				ReleaseRefCountable( &matcher);

				if (!done)
					err = inResponse->ReplyWithStatusCode( HTTP_NOT_FOUND);

				return err;
			}

private:
			VRPCService			*fService;
			VString				fPattern;
};



VRPCService::VRPCService( VRIAServerProject* inApplication, IHTTPServerProject *inHTTPServerProject)
: fApplication(inApplication), fDesignProject(NULL), fProxyRequestHandler(NULL), fMethodsRequestHandler(NULL),
fPublishInClientGlobalNamespace(false), fHTTPServerProject(inHTTPServerProject), fPatternForMethods( L"/rpc/"), fPatternForProxy( L"^/rpc-proxy/")
{
	if (fApplication != NULL)
	{
		fDesignProject = fApplication->GetDesignProject();
	}
}


VRPCService::~VRPCService()
{
	xbox_assert(fMethodsRequestHandler == NULL);
	xbox_assert(fProxyRequestHandler == NULL);

	ReleaseRefCountable( &fMethodsRequestHandler);
	ReleaseRefCountable( &fProxyRequestHandler);
}


VRIAServerProject* VRPCService::GetApplication() const
{
	return fApplication;
}


void VRPCService::SetPatternForProxy( const VString& inPattern)
{
	if (fMutex.Lock())
	{
		fPatternForProxy = inPattern;

		fMutex.Unlock();
	}
}


void VRPCService::GetPatterns( XBOX::VString& outPatternForMethods, XBOX::VString& outPatternForProxy) const
{
	if (fMutex.Lock())
	{
		outPatternForMethods = fPatternForMethods;
		outPatternForProxy = fPatternForProxy;

		fMutex.Unlock();
	}
}


void VRPCService::SetPublishInClientGlobalNamespace( bool inPublishInClientGlobalNamespace)
{
	fPublishInClientGlobalNamespace = inPublishInClientGlobalNamespace;
}


bool VRPCService::GetPublishInClientGlobalNamespace() const
{
	return fPublishInClientGlobalNamespace;
}


VError VRPCService::SetEnabled( bool inEnabled)
{
	if (!testAssert(fApplication != NULL))
		return VE_UNKNOWN_ERROR;

	if (fHTTPServerProject == NULL)
		return vThrowError( VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);


	VError err = VE_OK;


	if (fMutex.Lock())
	{
		if (inEnabled && fMethodsRequestHandler == NULL)
		{
			xbox_assert(fProxyRequestHandler == NULL);

			// Add 2 HTTP request handlers : one for the RPC methods and one for the proxy files
			fMethodsRequestHandler = _CreateRequestHandlerForMethods();
			fProxyRequestHandler = _CreateRequestHandlerForProxy();
			if (fMethodsRequestHandler != NULL && fProxyRequestHandler != NULL)
			{
				fMethodsRequestHandler->SetEnable( true);
				fProxyRequestHandler->SetEnable( true);

				err = fHTTPServerProject->AddHTTPRequestHandler( fMethodsRequestHandler);
				if (err == VE_OK)
				{
					err = fHTTPServerProject->AddHTTPRequestHandler( fProxyRequestHandler);
					if (err != VE_OK)
					{
						fHTTPServerProject->RemoveHTTPRequestHandler( fMethodsRequestHandler);
					}
				}
			}
			else
			{
				err = vThrowError( VE_MEMORY_FULL);
			}

			if (err != VE_OK)
			{
				ReleaseRefCountable( &fMethodsRequestHandler);
				ReleaseRefCountable( &fProxyRequestHandler);
			}

		}
		else if (!inEnabled && fMethodsRequestHandler != NULL)
		{
			xbox_assert(fProxyRequestHandler != NULL);

			// Remove the handlers
			err = fHTTPServerProject->RemoveHTTPRequestHandler( fMethodsRequestHandler);
			if (err == VE_OK)
				err = fHTTPServerProject->RemoveHTTPRequestHandler( fProxyRequestHandler);
			
			ReleaseRefCountable( &fMethodsRequestHandler);
			ReleaseRefCountable( &fProxyRequestHandler);
		}

		fMutex.Unlock();
	}
	return err;
}


bool VRPCService::IsEnabled() const
{
	bool enabled = false;

	if (fMutex.Lock())
	{
		enabled = (fMethodsRequestHandler != NULL);
		fMutex.Unlock();
	}
	return enabled;
}


VJSRequestHandler* VRPCService::_CreateRequestHandlerForMethods()
{
	// TBD: use a module function handler instead of a global function handler
	VRIAJSCallbackGlobalFunction *callback = new VRIAJSCallbackGlobalFunction( L"doRequest");
	VJSRequestHandler *handler = new VJSRequestHandler( fApplication, fPatternForMethods, callback);
	if (handler != NULL)
	{
		handler->SetEnable( true);

		VFilePath rpcImpl;
		VRIAServerApplication::Get()->GetWAFrameworkFolderPath( rpcImpl);
		rpcImpl.ToSubFolder( L"Core").ToSubFolder( L"Runtime").ToSubFolder( L"rpcService");
		rpcImpl.SetFileName( L"rpc-server.js", true);

		VFile *file = new VFile( rpcImpl);
		handler->RegisterIncludedFile( file);
		QuickReleaseRefCountable( file);
	}
	return handler;
}


VProxyRequestHandler* VRPCService::_CreateRequestHandlerForProxy()
{
	return new VProxyRequestHandler( fApplication, fPatternForProxy, this);
}


XBOX::VError VRPCService::GetProxy( XBOX::VString& outProxy, const XBOX::VString& inModulePath, const XBOX::VString& inNamespace, const IHTTPRequest* inRequest, IHTTPResponse* inResponse)
{
	VError err = VE_OK;

	outProxy.Clear();

	if (fApplication != NULL)
	{
		VRIAContext *riaContext = fApplication->RetainNewContext( err);
		if (err == VE_OK)
		{
			VRPCCatalog *catalog = fApplication->RetainRPCCatalog( riaContext, &err, inRequest, inResponse);
			if (err == VE_OK)
			{
				if (catalog != NULL)
				{
					MapOfRPCSchema schemas;

					err = catalog->RetainSchemasByModule( inModulePath, schemas);
					if (err == VE_OK)
					{
						// Build the proxy
						VFile *bodyFile = NULL, *templateFile = NULL;
						VFilePath path;

						VRIAServerApplication::Get()->GetWAFrameworkFolderPath( path);
						path.ToSubFolder( L"Core").ToSubFolder( L"Runtime").ToSubFolder( L"rpcService");
						path.SetFileName( L"proxy-body.js", true);

						bodyFile = new VFile( path);
						if (bodyFile == NULL)
							err = vThrowError( VE_MEMORY_FULL);
						
						if (err == VE_OK)
						{
							path.SetFileName( L"proxy-template.js", true);
							templateFile = new VFile( path);
							if (templateFile == NULL)
								err = vThrowError( VE_MEMORY_FULL);
						}
						
						if (err == VE_OK && bodyFile->Exists() && templateFile->Exists())
						{
							VString templateString;
							VFileStream bodyStream( bodyFile);
							VFileStream templateStream( templateFile);
							
							err = bodyStream.OpenReading();
							if (err == VE_OK)
								templateStream.OpenReading();
							if (err == VE_OK)
								err = bodyStream.GetText( outProxy);
							if (err == VE_OK)
							{
								VValueBag bag;
								bag.SetString( L"rpc-pattern", fPatternForMethods);
								bag.SetString( L"publishInGlobalNamespace", (fPublishInClientGlobalNamespace) ? L"true" : L"false");
								outProxy.Format( &bag);
							}
							if (err == VE_OK)
								err = templateStream.GetText( templateString);
							if (err == VE_OK)
							{
								for (MapOfRPCSchema::const_iterator iter = schemas.begin() ; iter != schemas.end() ; ++iter)
								{
									VValueBag bag;
									bag.SetString( L"function-name", iter->first.GetMethodName());
									bag.SetString( L"namespace", inNamespace);
									bag.SetString( L"modulePath", inModulePath);
									VString proxy( templateString);
									proxy.Format( &bag);
									outProxy.AppendString( proxy);
								}
							}

							bodyStream.CloseReading();
							templateStream.CloseReading();
						}
						else
						{
							err = vThrowError( VE_FILE_NOT_FOUND);
						}

						QuickReleaseRefCountable( bodyFile);
						QuickReleaseRefCountable( templateFile);
					}
				}
				else
				{
					err = vThrowError( VE_RIA_RPC_CATALOG_NOT_FOUND);
				}
			}
		}
		ReleaseRefCountable( &riaContext);
	}

	return err;	
}
