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
#include "VProjectItem.h"
#include "VRIAServerSolution.h"
#include "VRIAServerProject.h"
#include "VRIAServerTools.h"
#include "VRIAServerJSAPI.h"
#include "VRIAPermissions.h"
#include "VRIAServerHTTPSession.h"
#include "VRIAServerApplication.h"
#include "VRIAServerHTTPRequestHandler.h"


USING_TOOLBOX_NAMESPACE



VHTTPRequestHandler::VHTTPRequestHandler( VRIAServerProject *inApplication, const VString& inPattern)
: fApplication(inApplication)
{
	fPatterns.push_back( inPattern);
}


VHTTPRequestHandler::~VHTTPRequestHandler()
{
	fPatterns.clear();
}


VError VHTTPRequestHandler::GetPatterns( VectorOfVString* outPatterns) const
{
	if (outPatterns != NULL)
	{
		outPatterns->clear();
		outPatterns->insert( outPatterns->begin(), fPatterns.begin(), fPatterns.end());
	}
	return VE_OK;
}



// ----------------------------------------------------------------------------



VJSRequestHandler::VJSRequestHandler( VRIAServerProject *inApplication, const VString& inPattern, IRIAJSCallback* inCallback)
: VHTTPRequestHandler( inApplication, inPattern)
{
	fCallback = RetainRefCountable( inCallback);
}


VJSRequestHandler::~VJSRequestHandler()
{
	QuickReleaseRefCountable( fCallback);
}


IRIAJSCallback* VJSRequestHandler::RetainCallback() const
{
	return RetainRefCountable( fCallback);
}


VError VJSRequestHandler::HandleRequest( IHTTPResponse* inResponse)
{
	if (inResponse == NULL || fApplication == NULL || fCallback == NULL)
		return vThrowError( VE_RIA_JS_CANNOT_CALL_REQUEST_HANDLER);

	StTaskPropertiesSetter stTaskProps( &fApplication->GetMessagesLoggerID());
	VError err = VE_OK;

	VJSGlobalContext *globalContext = fApplication->RetainJSContext( err, true, &inResponse->GetRequest());
	if (globalContext != NULL && err == VE_OK)
	{
		VJSContext jsContext( globalContext);
		VJSGlobalObject *jsGlobalObject = jsContext.GetGlobalObjectPrivateInstance();

		if (testAssert(jsGlobalObject != NULL))
		{
			// Evaluate required file
			for (MapOfIncludedFiles::iterator iter = fIncludedFiles.begin() ; iter != fIncludedFiles.end() ; ++iter)
			{
				if (jsGlobalObject->RegisterIncludedFile( iter->second))	// RegisterIncludedFile() returns false if the file is aready included
				{
					globalContext->EvaluateScript( iter->second, NULL);
				}
			}
		}

		// Create request and response JavaScript parameters
		VJSObject request(VJSHTTPRequest::CreateInstance( jsContext, (IHTTPRequest*) &(inResponse->GetRequest())));
		std::vector<VJSValue> params;
		params.push_back( request);

		VJSObject response(VJSHTTPResponse::CreateInstance( jsContext, inResponse));
		params.push_back( response);

		VJSValue result( jsContext);
		err = fCallback->Call( jsContext, &params, &result);
		if (err == VE_OK)
		{
			// If body has NOT already been set by SSJS API (using "response.body = myVar;" for example)...
			if (0 == inResponse->GetResponseBody().GetDataSize())
			{
				SetHTTPResponseFromJSValue (result, inResponse);
			}
		}
	}
	else if (NULL == globalContext)
	{
		err = vThrowError (VE_RIA_JS_CANNOT_FIND_CONTEXT);
	}

	fApplication->ReleaseJSContext( globalContext, inResponse);

	return err;
}


void VJSRequestHandler::RegisterIncludedFile( VFile* inFile)
{
	if (inFile != NULL)
	{
		VString posixPath;
		VFilePath path;
		inFile->GetPath( path);
		VURL url( path);
		url.GetPath( posixPath, eURL_POSIX_STYLE, false);
	
		fIncludedFiles.insert( MapOfIncludedFiles::value_type( posixPath, inFile));
	}
}



// --------------------------------------------------------------------------



VDebugHTTPRequestHandler::VDebugHTTPRequestHandler( VRIAServerProject* inApplication, const VString& inPattern)
: VHTTPRequestHandler( inApplication, inPattern), fPersistantJSContextRunningCount(0)
{
	VRIAServerJSContextMgr *jsContextMgr = VRIAServerApplication::Get()->GetJSContextMgr();
	if (jsContextMgr)
		jsContextMgr->GetBeginContextPoolsCleanupSignal().Connect( this, VTask::GetMain(), &VDebugHTTPRequestHandler::_BeginContextPoolsCleanupHandler);
}


VDebugHTTPRequestHandler::~VDebugHTTPRequestHandler()
{
	VRIAServerJSContextMgr *jsContextMgr = VRIAServerApplication::Get()->GetJSContextMgr();
	if (jsContextMgr)
		jsContextMgr->GetBeginContextPoolsCleanupSignal().Disconnect( this);

	if (fJSContextsPerSessionMutex.Lock())
	{
		assert(fPersistantJSContextRunningCount == 0);

		for (MapOfJSContextsPerSession::iterator iter = fJSContextsPerSession.begin() ; iter != fJSContextsPerSession.end() ; ++iter)
		{
			if (!iter->second.fRunning)
			{
				fApplication->ReleaseJSContext( iter->second.fJSContext, NULL);
				iter->second.fJSContext = NULL;
			}
		}
		fJSContextsPerSessionMutex.Unlock();
	}
}


VError VDebugHTTPRequestHandler::HandleRequest( IHTTPResponse* inResponse)
{
	if (inResponse == NULL)
		return VE_INVALID_PARAMETER;

	VError err = VE_OK;
	bool handled = false;

	if (fApplication != NULL)
	{
		// sc 16/05/2012, the debug handler is only available for users which are belong to Debugger group
		bool accessGranted = false;
		VUUID userSessionID;

		StTaskPropertiesSetter stTaskProps( &fApplication->GetMessagesLoggerID());

		VRIAHTTPSessionManager *sessionMgr = fApplication->RetainSessionMgr();
		if (sessionMgr != NULL)
		{
			CUAGDirectory *uagDirectory = fApplication->GetSolution()->RetainUAGDirectory();
			if (uagDirectory != NULL)
			{
				// sc 09/08/2012, retreive the session from the authentication infos instead of the cookie
				CUAGSession *uagSession = NULL;
				bool isDefaultSession = false;
				IAuthenticationInfos *authInfo = inResponse->GetRequest().GetAuthenticationInfos();
				if (authInfo != nil)
					uagSession = RetainRefCountable( authInfo->GetUAGSession());

				if (uagSession != NULL)
				{
					uagSession->GetID( userSessionID);

					if (uagSession->hasExpired())
					{
						sessionMgr->RemoveSession( uagSession);
						ReleaseRefCountable( &uagSession);

						if (fJSContextsPerSessionMutex.Lock())
						{
							// remove the persistant context if the session has expired
							MapOfJSContextsPerSession::iterator found = fJSContextsPerSession.find( userSessionID);
							if (found != fJSContextsPerSession.end())
							{
								if (testAssert(!found->second.fRunning))
								{
									fApplication->ReleaseJSContext( found->second.fJSContext, NULL);
									fJSContextsPerSession.erase( found);
								}
							}
							fJSContextsPerSessionMutex.Unlock();
						}
						userSessionID.Clear();
					}
				}
				else
				{
					VJSONObject* reqinfo = inResponse->GetRequest().BuildRequestInfo();
					// sc 03/06/2013, create a default session
					uagSession = uagDirectory->MakeDefaultSession( NULL, NULL, false, reqinfo);
					if (uagSession != NULL)
					{
						uagSession->GetID( userSessionID);
						isDefaultSession = true;
					}
					QuickReleaseRefCountable(reqinfo);
				}

				if (uagSession != NULL)
				{
					VUUID adminGroupID;
					if (testAssert(uagDirectory->GetSpecialGroupID( CUAGDirectory::AdminGroup, adminGroupID)))
					{
						accessGranted = uagSession->BelongsTo( adminGroupID, nil);
						
						if (!accessGranted)
						{
							handled = true;
							err = inResponse->ReplyWithStatusCode( HTTP_UNAUTHORIZED);
						}
						else if (isDefaultSession)
						{
							sessionMgr->AddSession( uagSession);
							inResponse->GetRequest().GetAuthenticationInfos()->SetUAGSession( uagSession);
						}
					}
				}
				else
				{
					handled = true;
					err = inResponse->ReplyWithStatusCode( HTTP_UNAUTHORIZED);
				}

				ReleaseRefCountable( &uagSession);
				uagDirectory->Release();
			}
			else
			{
				handled = true;
				err = inResponse->ReplyWithStatusCode( HTTP_INTERNAL_SERVER_ERROR);
			}

			sessionMgr->Release();
		}
		else
		{
			handled = true;
			err = inResponse->ReplyWithStatusCode( HTTP_INTERNAL_SERVER_ERROR);
		}

		if ((err == VE_OK) && accessGranted && !handled)
		{
			bool haveFile = false, haveScript = false;
			VFile *fileToEvaluate = NULL;
			VString textToEvaluate;
			VURL sourceURL;
			VJSONValue options;
			
			if (inResponse->GetRequest().GetURL().EqualToUSASCIICString( "/debug/eval/file"))
			{
				VString contentType;
				inResponse->GetRequest().GetContentTypeHeader( contentType);
				if (contentType.BeginsWith( L"multipart/form-data"))
				{
					const VMIMEMessage *htmlForm = inResponse->GetRequest().GetHTMLForm();
					if (htmlForm != NULL)
					{
						const VectorOfMIMEPart& parts = htmlForm->GetMIMEParts();
						for (VectorOfMIMEPart::const_iterator iter = parts.begin() ; iter != parts.end() ; ++iter)
						{
							if ((*iter)->GetName() == L"url")
							{
								// the "url" part is a posix path relative to the application folder
								CharSet charSet = (*iter)->GetMediaTypeCharSet();
								VString url;
								url.FromBlock( (*iter)->GetData().GetDataPtr(), (*iter)->GetData().GetDataSize(), (charSet != VTC_UNKNOWN) ? charSet : VTC_UTF_8);

								sourceURL.FromString( url, false);

								VFilePath path;
								fApplication->BuildPathFromRelativePath( path, url, FPS_POSIX);
								if (!path.IsEmpty() && path.IsFile())
								{
									sourceURL.FromFilePath( path);
									
									fileToEvaluate = new VFile( path);
									haveFile = fileToEvaluate->Exists();
								}
							}
							else if ((*iter)->GetName() == L"script")
							{
								// the "script" part contains a JavaScript content to evaluate
								CharSet charSet = (*iter)->GetMediaTypeCharSet();
								textToEvaluate.FromBlock( (*iter)->GetData().GetDataPtr(), (*iter)->GetData().GetDataSize(), (charSet != VTC_UNKNOWN) ? charSet : VTC_UTF_8);
								textToEvaluate.ConvertCarriageReturns( eCRM_NATIVE);
								haveScript = true;
							}
							else if ((*iter)->GetName() == L"options")
							{
								// the "options" part contains a JSON object for the eval options
								VString lString;
								CharSet charSet = (*iter)->GetMediaTypeCharSet();
								lString.FromBlock( (*iter)->GetData().GetDataPtr(), (*iter)->GetData().GetDataSize(), (charSet != VTC_UNKNOWN) ? charSet : VTC_UTF_8);
								VJSONImporter::ParseString( lString, options);
							}
						}
					}
				}
				else
				{
					// the parameter is a posix path relative to the application folder
					VString param;
					param.FromBlock( inResponse->GetRequest().GetRequestBody().GetDataPtr(), inResponse->GetRequest().GetRequestBody().GetDataSize(), VTC_UTF_8);
					if (!param.IsEmpty())
					{
						VFilePath path;
						fApplication->BuildPathFromRelativePath( path, param, FPS_POSIX);
						if (!path.IsEmpty() && path.IsFile())
						{
							fileToEvaluate = new VFile( path);
							haveFile = fileToEvaluate->Exists();
						}
					}
				}
			}

			if (haveFile || haveScript)
			{
				bool persistantCtx = options.GetProperty( L"persistantContext").GetBool();
				VString persistantCtxID;
				VJSGlobalContext *globalContext = NULL;

				if (!persistantCtx)
				{
					globalContext = fApplication->RetainJSContext( err, true, &inResponse->GetRequest());
				}
				else
				{
					if (testAssert(!userSessionID.IsNull()))
					{
						if (fJSContextsPerSessionMutex.Lock())
						{
							MapOfJSContextsPerSession::iterator found = fJSContextsPerSession.find( userSessionID);
							if (found != fJSContextsPerSession.end())
							{
								if (testAssert(!found->second.fRunning))
								{
									globalContext = found->second.fJSContext;

									if (fApplication->JSContextShouldBeReleased( globalContext))
									{
										fApplication->ReleaseJSContext( globalContext, inResponse);
										found->second.fJSContext = NULL;
										found->second.fJSContextID.Clear();
										globalContext = NULL;
									}

									if (globalContext == NULL)
									{
										// try retain a new context
										globalContext = fApplication->RetainJSContext( err, false, &inResponse->GetRequest());
										if (globalContext != NULL && err == VE_OK)
										{
											found->second.fJSContext = globalContext;
											found->second.fJSContextID.Regenerate();
										}
									}

									if (globalContext != NULL && err == VE_OK)
									{
										found->second.fJSContextID.GetString( persistantCtxID);
										found->second.fRunning = true;
										++fPersistantJSContextRunningCount;
									}
								}
								else
								{
									// only one connection per context
									handled = true;
									err = inResponse->ReplyWithStatusCode( HTTP_INTERNAL_SERVER_ERROR);
								}
							}
							else
							{
								// create a new entry for this session
								globalContext = fApplication->RetainJSContext( err, false, &inResponse->GetRequest());
								if (globalContext != NULL && err == VE_OK)
								{
									VUUID ctxID( true);
									ctxID.GetString( persistantCtxID);
									sPersistantJSContextInfo info = { globalContext, ctxID, true};
									fJSContextsPerSession[userSessionID] = info;
									++fPersistantJSContextRunningCount;
								}
							}
							fJSContextsPerSessionMutex.Unlock();
						}
					}
				}

				if (globalContext != NULL)
				{
					if (err == VE_OK)
					{
						StErrorContextInstaller errorContext;

						VString loggerID, result;
						VValueSingle *xvalue = NULL;

						if (haveScript)
							globalContext->EvaluateScript( textToEvaluate, &sourceURL, &xvalue, true );
						else
							globalContext->EvaluateScript( fileToEvaluate, &xvalue, true );

						if (errorContext.GetLastError() != VE_OK)
						{
							// sc 02/06/2010 returns the error
							VValueBag errorBag;
							VErrorTaskContext::BuildErrorStack(errorBag);
							errorBag.GetJSONString(result);

							err = inResponse->ReplyWithStatusCode( HTTP_INTERNAL_SERVER_ERROR);
						}
						else if (xvalue != NULL)
						{
							xvalue->GetString( result);
						}

						// build the result object
						VString format = L"application/json";

						VJSONValue jsonResult;
						VJSONImporter::ParseString( result, jsonResult);

						VJSONObject *jsonObject = new VJSONObject();
						jsonObject->SetProperty( L"result", jsonResult);

						if (persistantCtx)
							jsonObject->SetProperty( L"contextId", VJSONValue( persistantCtxID));

						VJSONWriter jsonWriter;
						jsonWriter.StringifyObject( jsonObject, result);

						ReleaseRefCountable( &jsonObject);
							
						err = SetHTTPResponseString( inResponse, result, &format);

						delete xvalue;

						handled = true;
					}

					if (!persistantCtx)
					{
						fApplication->ReleaseJSContext( globalContext, inResponse);
					}
					else
					{
						if (fJSContextsPerSessionMutex.Lock())
						{
							MapOfJSContextsPerSession::iterator found = fJSContextsPerSession.find( userSessionID);
							if (testAssert(found != fJSContextsPerSession.end()))
							{
								found->second.fRunning = false;
								--fPersistantJSContextRunningCount;

								if (fApplication->JSContextShouldBeReleased( globalContext))
								{
									// The JavaScript Context must be released here
									fApplication->ReleaseJSContext( found->second.fJSContext, inResponse);
									found->second.fJSContext = NULL;
									found->second.fJSContextID.Clear();
								}
							}
							fJSContextsPerSessionMutex.Unlock();
						}
					}
				}
				else
				{
					err = inResponse->ReplyWithStatusCode( HTTP_SERVICE_UNAVAILABLE);
					handled = true;
				}
			}

			ReleaseRefCountable( &fileToEvaluate);
		}
	}

	if (!handled)
	{
		err = inResponse->ReplyWithStatusCode( HTTP_NOT_FOUND);
	}

	return err;
}


void VDebugHTTPRequestHandler::_BeginContextPoolsCleanupHandler()
{
	if (fJSContextsPerSessionMutex.Lock())
	{
		for (MapOfJSContextsPerSession::iterator iter = fJSContextsPerSession.begin() ; iter != fJSContextsPerSession.end() ; ++iter)
		{
			if (!iter->second.fRunning)
			{
				fApplication->ReleaseJSContext( iter->second.fJSContext, NULL);
				iter->second.fJSContext = NULL;
			}
		}
		fJSContextsPerSessionMutex.Unlock();
	}
}

