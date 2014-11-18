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
#include "VRIAServerSolution.h"
#include "VRIAServerProject.h"
#include "VRIAServerTools.h"
#include "VRIAServerApplication.h"
#include "VRIAServerProjectContext.h"
#include "DB4D/Headers/DB4D.h"
#include "VRPCCatalog.h"
#include "VRPCService.h"
#include "VRIAServerJSContextMgr.h"
#include "VSolutionStartupParameters.h"
#include "VRIAServerHTTPRequestHandler.h"
#include "VJSApplication.h"
#include "VRIAServerJSAPI.h"
#include "JavaScript/Sources/VJSJSON.h"
#include "Language Syntax/CLanguageSyntax.h"
#include "JSDebugger/Interfaces/CJSWDebuggerFactory.h"
#include "commonJSAPI.h"
#include "ServerNet/Sources/HTTPTools.h"

USING_TOOLBOX_NAMESPACE



// Classes names constants
const char kSSJS_CLASS_NAME_Solution[] = "Solution";
const char kSSJS_CLASS_NAME_Application[] = "Application";
const char kSSJS_CLASS_NAME_HTTPServer[] = "HttpServer";
const char kSSJS_CLASS_NAME_SSL[] = "SSL";
const char kSSJS_CLASS_NAME_HTTPServerCache[] = "HttpServerCache";
const char kSSJS_CLASS_NAME_Console[] = "Console";
const char kSSJS_CLASS_NAME_OS[] = "os";

// Properties names constants
const char kSSJS_PROPERTY_NAME_Solution[] = "solution";
const char kSSJS_PROPERTY_NAME_Application[] = "application";
const char kSSJS_PROPERTY_NAME_Database[] = "db";
const char kSSJS_PROPERTY_NAME_DataStore[] = "ds";
const char kSSJS_PROPERTY_NAME_HTTPServer[] = "httpServer";
const char kSSJS_PROPERTY_NAME_SSL[] = "ssl";
const char kSSJS_PROPERTY_NAME_HTTPServerCache[] = "cache";
const char kSSJS_PROPERTY_NAME_Console[] = "console";
const char kSSJS_PROPERTY_NAME_SessionStorage[] = "oldSessionStorage";
const char kSSJS_PROPERTY_NAME_AddHttpRequestHandler[] = "addHttpRequestHandler";
const char kSSJS_PROPERTY_NAME_RemoveHttpRequestHandler[] = "removeHttpRequestHandler";
const char kSSJS_PROPERTY_NAME_GetFolder[] = "getFolder";
const char kSSJS_PROPERTY_NAME_GetSettingFile[] = "getSettingFile";
const char kSSJS_PROPERTY_NAME_GetWalibFolder[] = "getWalibFolder";
const char kSSJS_PROPERTY_NAME_GetItemsWithRole[] = "getItemsWithRole";
const char kSSJS_PROPERTY_NAME_Name[] = "name";
const char kSSJS_PROPERTY_NAME_Administrator[] = "administrator";
const char kSSJS_PROPERTY_NAME_Pattern[] = "pattern";
const char kSSJS_PROPERTY_NAME_Storage[] = "storage";
const char kSSJS_PROPERTY_NAME_Settings[] = "settings";
const char kSSJS_PROPERTY_NAME_Type[] = "type";
const char kSSJS_PROPERTY_NAME_Internal[] = "internal";
const char kSSJS_PROPERTY_NAME_Directory[] = "directory";
const char kSSJS_PROPERTY_NAME_OS[] = "os";
const char kSSJS_PROPERTY_NAME_Permissions[] = "permissions";
const char kSSJS_PROPERTY_NAME_backupSettings[] = "backupSettings";
const char kSSJS_PROPERTY_NAME_wildchar[] = "wildchar";

const char kSSJS_PROPERTY_NAME_verifyDataStore[] = "verifyDataStore";
const char kSSJS_PROPERTY_NAME_repairDataStore[] = "repairDataStore";
const char kSSJS_PROPERTY_NAME_compactDataStore[] = "compactDataStore";

const char kSSJS_PROPERTY_NAME_setCurrentUser[] = "setCurrentUser";
const char kSSJS_PROPERTY_NAME_loginByKey[] = "loginByKey";
const char kSSJS_PROPERTY_NAME_loginByPassword[] = "loginByPassword";
const char kSSJS_PROPERTY_NAME_createUserSession[] = "createUserSession";
const char kSSJS_PROPERTY_NAME_currentUser[] = "currentUser";
const char kSSJS_PROPERTY_NAME_currentSession[] = "currentSession";
const char kSSJS_PROPERTY_NAME_getUserSessions[] = "getUserSessions";
const char kSSJS_PROPERTY_NAME_logout[] = "logout";



// ----------------------------------------------------------------------------
// Utilities

bool SetHTTPResponseFromJSValue (const XBOX::VJSValue& inValue, IHTTPResponse *ioResponse)
{
	if (inValue.IsNull() || inValue.IsUndefined())
		return false;

	bool result = false;

	if (inValue.IsString())
	{
		XBOX::VString valueString;

		if (inValue.GetString (valueString))
		{
			XBOX::VString	contentType;
			XBOX::CharSet	charSet = XBOX::VTC_UNKNOWN;

			ioResponse->GetContentTypeHeader (contentType, &charSet);

			if (contentType.IsEmpty())
				contentType.FromCString ("text/plain");

			if (XBOX::VTC_UNKNOWN == charSet)
				charSet = XBOX::VTC_UTF_8;

			XBOX::StStringConverter<char> buffer (valueString, charSet);
			ioResponse->SetResponseBody (buffer.GetCPointer(), buffer.GetLength());
			ioResponse->SetContentTypeHeader (contentType, charSet);
			ioResponse->SetContentLengthHeader (buffer.GetLength());

			result = true;
		}
	}
	else
	{
		XBOX::VValueSingle *value = inValue.CreateVValue();

		if (NULL != value)
		{
			XBOX::VError error = XBOX::VE_OK;

			if (VK_IMAGE == value->GetValueKind())
			{
#if !VERSION_LINUX
				XBOX::VPicture *picture = (XBOX::VPicture *)value;
				XBOX::VString mimeType;
				XBOX::VString contentType;

				if (!ioResponse->GetContentTypeHeader (contentType) || contentType.IsEmpty())
					contentType.FromCString ("image/png;image/jpeg;image/gif");

				if (XBOX::VE_OK == ioResponse->GetResponseBody().OpenWriting())
				{
					error = ExtractBestPictureForWeb (*picture, ioResponse->GetResponseBody(), contentType, true, mimeType);
					ioResponse->GetResponseBody().CloseWriting();
				}

				if (contentType != mimeType)
					ioResponse->SetContentTypeHeader (mimeType);

				ioResponse->SetContentLengthHeader (ioResponse->GetResponseBody().GetDataSize());
#endif
			}
			else if (VK_BLOB == value->GetValueKind())
			{
				XBOX::VString	contentType;

				if (!ioResponse->GetContentTypeHeader (contentType))
				{
					VJSObject object = inValue.GetObject();
					if (!object.GetPropertyAsString (CVSTR ("type"), NULL, contentType) || contentType.IsEmpty())
						contentType.FromString (CVSTR ("application/octet-stream"));

					ioResponse->SetContentTypeHeader (contentType);
				}

				if (XBOX::VE_OK == ioResponse->GetResponseBody().OpenWriting())
				{
					XBOX::VBlobWithPtr *blob = dynamic_cast<XBOX::VBlobWithPtr *>(value);

					error = ioResponse->GetResponseBody().PutData (blob->GetDataPtr(), blob->GetSize());

					ioResponse->GetResponseBody().CloseWriting();
					ioResponse->SetContentLengthHeader (blob->GetSize());
				}
			}
			else
			{
				error = XBOX::VE_INVALID_PARAMETER;
			}

			result = (XBOX::VE_OK == error);
		}
		else // Object is null... Try to get a string value (probably something like "undefined")
		{
			XBOX::VString valueString;

			if (inValue.GetString (valueString))
			{
				XBOX::StStringConverter<char> buffer (valueString, XBOX::VTC_UTF_8);
				ioResponse->SetResponseBody (buffer.GetCPointer(), buffer.GetLength());
				ioResponse->SetContentTypeHeader (CVSTR ("text/plain"), XBOX::VTC_UTF_8);
				ioResponse->SetContentLengthHeader (buffer.GetLength());

				result = true;
			}
		}
	}

//	ioResponse->AllowCompression (false);
	if (!ioResponse->CanCacheBodyMessage())
	{
		ioResponse->SetExpiresHeader (GMT_NOW);
		ioResponse->AddResponseHeader (HEADER_PRAGMA, CVSTR ("no-cache"));
	}

	return result;
}


bool SendChunkedResponseFromJSValue (const XBOX::VJSValue& inValue, IHTTPResponse *ioResponse)
{
	if (inValue.IsNull())
		return false;

	bool result = false;

	if (inValue.IsString())
	{
		XBOX::VString valueString;

		if (inValue.GetString (valueString))
		{
			XBOX::VString	contentType;
			XBOX::CharSet	charSet = XBOX::VTC_UNKNOWN;

			ioResponse->GetContentTypeHeader (contentType, &charSet);

			if (contentType.IsEmpty())
				contentType.FromCString ("text/plain");

			if (XBOX::VTC_UNKNOWN == charSet)
				charSet = XBOX::VTC_UTF_8;

			if (!ioResponse->IsResponseHeaderSet (HEADER_CONTENT_TYPE))
				ioResponse->SetContentTypeHeader (contentType, charSet);

			XBOX::StStringConverter<char> buffer (valueString, charSet);
			ioResponse->SendData ((void *)buffer.GetCPointer(), buffer.GetLength(), true);
			result = true;
		}
	}
	else if (inValue.IsObject())
	{
		XBOX::VError	error = XBOX::VE_OK;
		VJSObject		object = inValue.GetObject();

		if (object.IsOfClass (VJSFileIterator::Class()))
		{
			JS4DFileIterator *	fileObject = object.GetPrivateData<VJSFileIterator>();
			XBOX::VFile *		file = (fileObject) ? fileObject->GetFile() : NULL;

			xbox_assert (fileObject != NULL);
			xbox_assert (file != NULL);	

			if (file->Exists())
			{
				ioResponse->AllowCompression (false);
				ioResponse->SetCacheBodyMessage (false);
				ioResponse->SetFileToSend (file);
			}
			else
			{
				ioResponse->ReplyWithStatusCode (HTTP_NOT_FOUND);
			}
		}
		else
		{
			XBOX::VPtrStream		stream;
			XBOX::VValueSingle *	value = inValue.CreateVValue();

			if (NULL != value)
			{
				if (VK_IMAGE == value->GetValueKind())
				{
#if !VERSION_LINUX
					XBOX::VPicture *picture = (XBOX::VPicture *)value;
					XBOX::VString	mimeType;
					XBOX::VString	contentType;

					if (!ioResponse->GetContentTypeHeader (contentType) || contentType.IsEmpty())
						contentType.FromCString ("image/png;image/jpeg;image/gif");

					if (XBOX::VE_OK == stream.OpenWriting())
					{
						error = ExtractBestPictureForWeb (*picture, stream, contentType, true, mimeType);
						stream.CloseWriting();
					}

					if (contentType != mimeType)
						ioResponse->SetContentTypeHeader (mimeType);
#endif
				}
				else if (VK_BLOB == value->GetValueKind())
				{
					XBOX::VString	contentType;

					if (!ioResponse->GetContentTypeHeader (contentType))
					{
						if (!object.GetPropertyAsString (CVSTR ("type"), NULL, contentType) || contentType.IsEmpty())
							contentType.FromString (CVSTR ("application/octet-stream"));

						ioResponse->SetContentTypeHeader (contentType);
					}

					if (XBOX::VE_OK == stream.OpenWriting())
					{
						XBOX::VBlobWithPtr *blob = dynamic_cast<XBOX::VBlobWithPtr *>(value);

						error = stream.PutData (blob->GetDataPtr(), blob->GetSize());

						stream.CloseWriting();
					}
				}
				else
				{
					error = XBOX::VE_INVALID_PARAMETER;
				}
			}
			else
			{
				error = XBOX::VE_INVALID_PARAMETER;
			}

			if (XBOX::VE_OK == error)
			{
				if (XBOX::VE_OK == (error = stream.OpenReading()))
					error = ioResponse->SendData (stream.GetDataPtr(), stream.GetDataSize(), true);
				stream.CloseReading();
			}
			else
			{
				ioResponse->ReplyWithStatusCode (HTTP_INTERNAL_SERVER_ERROR);
			}
		}

		result = (XBOX::VE_OK == error);
	}

	return result;
}



// ----------------------------------------------------------------------------
// JavaScript API


std::map<XBOX::VString, XBOX::VString> VJSHTTPRequestHeader::fCommonHeaders;


void VJSHTTPRequestHeader::Initialize (const XBOX::VJSParms_initialize& inParms, XBOX::VHTTPHeader *inHeader)
{
	if (!fCommonHeaders.empty())
		return;

	fCommonHeaders[CVSTR ("Accept")] = CVSTR ("ACCEPT");
	fCommonHeaders[CVSTR ("Accept-Charset")] = CVSTR ("ACCEPT_CHARSET");
	fCommonHeaders[CVSTR ("Accept-Encoding")] = CVSTR ("ACCEPT_ENCODING");
	fCommonHeaders[CVSTR ("Accept-Language")] = CVSTR ("ACCEPT_LANGUAGE");
	fCommonHeaders[CVSTR ("Authorization")] = CVSTR ("AUTHORIZATION");
	fCommonHeaders[CVSTR ("Cache-Control")] = CVSTR ("CACHE_CONTROL");
	fCommonHeaders[CVSTR ("Content-Length")] = CVSTR ("CONTENT_LENGTH");
	fCommonHeaders[CVSTR ("Content-Type")] = CVSTR ("CONTENT_TYPE");
	fCommonHeaders[CVSTR ("Cookie")] = CVSTR ("COOKIE");
	fCommonHeaders[CVSTR ("Expect")] = CVSTR ("EXPECT");
	fCommonHeaders[CVSTR ("From")] = CVSTR ("FROM");
	fCommonHeaders[CVSTR ("Host")] = CVSTR ("HOST");
	fCommonHeaders[CVSTR ("If-Match")] = CVSTR ("IF_MATCH");
	fCommonHeaders[CVSTR ("If-Modified-Since")] = CVSTR ("IF_MODIFIED_SINCE");
	fCommonHeaders[CVSTR ("If-None-Match")] = CVSTR ("IF_NONE_MATCH");
	fCommonHeaders[CVSTR ("If-Range")] = CVSTR ("IF_RANGE");
	fCommonHeaders[CVSTR ("If-Unmodified-Since")] = CVSTR ("IF_UNMODIFIED_SINCE");
	fCommonHeaders[CVSTR ("Keep-Alive")] = CVSTR ("KEEP_ALIVE");
	fCommonHeaders[CVSTR ("Max-Forwards")] = CVSTR ("MAX_FORWARDS");
	fCommonHeaders[CVSTR ("Pragma")] = CVSTR ("PRAGMA");
	fCommonHeaders[CVSTR ("Proxy-Authorization")] = CVSTR ("PROXY_AUTHORIZATION");
	fCommonHeaders[CVSTR ("Range")] = CVSTR ("RANGE");
	fCommonHeaders[CVSTR ("Referer")] = CVSTR ("REFERER");
	fCommonHeaders[CVSTR ("TE")] = CVSTR ("TE");
	fCommonHeaders[CVSTR ("User-Agent")] = CVSTR ("USER_AGENT");
}


void VJSHTTPRequestHeader::Finalize (const XBOX::VJSParms_finalize& inParms, XBOX::VHTTPHeader *inHeader)
{
}


void VJSHTTPRequestHeader::_GetHeaderNameFromPropertyName (const XBOX::VString& inPropertyName, XBOX::VString& outHeaderName)
{
	outHeaderName.Clear();

	for (std::map<XBOX::VString, XBOX::VString>::const_iterator it = fCommonHeaders.begin(); it != fCommonHeaders.end(); ++it)
	{
		if ((*it).second.EqualToString (inPropertyName))
		{
			outHeaderName.FromString ((*it).first);
			break;
		}
	}

	if (outHeaderName.IsEmpty())
		outHeaderName.FromString (inPropertyName);
}


void VJSHTTPRequestHeader::GetProperty (XBOX::VJSParms_getProperty& ioParms, XBOX::VHTTPHeader *inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString propertyName;
	XBOX::VString headerName;
	XBOX::VString headerValue;

	ioParms.GetPropertyName (propertyName);
	_GetHeaderNameFromPropertyName (propertyName, headerName);

	if (inHeader->GetHeaderValue (headerName, headerValue))
		ioParms.ReturnString (headerValue);
}


bool VJSHTTPRequestHeader::SetProperty (XBOX::VJSParms_setProperty& ioParms, XBOX::VHTTPHeader *inHeader)
{
	return false;
}


void VJSHTTPRequestHeader::GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, XBOX::VHTTPHeader *inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	for (std::map<XBOX::VString, XBOX::VString>::const_iterator it = fCommonHeaders.begin(); it != fCommonHeaders.end(); ++it)
		ioParms.AddPropertyName ((*it).second);
}


void VJSHTTPRequestHeader::_GetHeaderValue (VJSParms_callStaticFunction& ioParms, XBOX::VHTTPHeader *inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString headerName;
	XBOX::VString headerValue;

	if (ioParms.GetStringParam (1, headerName))
		inHeader->GetHeaderValue (headerName, headerValue);

	ioParms.ReturnString (headerValue);
}


void VJSHTTPRequestHeader::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "getHeaderValue", js_callStaticFunction<_GetHeaderValue>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};
	
	outDefinition.className = "HttpRequestHeader";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.getProperty = js_getProperty<GetProperty>;
	outDefinition.setProperty = js_setProperty<SetProperty>;
	outDefinition.getPropertyNames = js_getPropertyNames<GetPropertyNames>;
	outDefinition.staticFunctions = functions;
}


//--------------------------------------------------------------------------------------------------


std::map<XBOX::VString, XBOX::VString> VJSHTTPResponseHeader::fCommonHeaders;


void VJSHTTPResponseHeader::Initialize (const XBOX::VJSParms_initialize& inParms, XBOX::VHTTPHeader *inHeader)
{
	if (!fCommonHeaders.empty())
		return;

	fCommonHeaders[CVSTR ("Accept-Ranges")] = CVSTR ("ACCEPT_RANGES");
	fCommonHeaders[CVSTR ("Age")] = CVSTR ("AGE");
	fCommonHeaders[CVSTR ("Allow")] = CVSTR ("ALLOW");
	fCommonHeaders[CVSTR ("Cache-Control")] = CVSTR ("CACHE_CONTROL");
	fCommonHeaders[CVSTR ("Connection")] = CVSTR ("CONNECTION");
	fCommonHeaders[CVSTR ("Date")] = CVSTR ("DATE");
	fCommonHeaders[CVSTR ("ETag")] = CVSTR ("ETAG");
	fCommonHeaders[CVSTR ("Content-Encoding")] = CVSTR ("CONTENT_ENCODING");
	fCommonHeaders[CVSTR ("Content-Language")] = CVSTR ("CONTENT_LANGUAGE");
	fCommonHeaders[CVSTR ("Content-Length")] = CVSTR ("CONTENT_LENGTH");
	fCommonHeaders[CVSTR ("Content-Location")] = CVSTR ("CONTENT_LOCATION");
	fCommonHeaders[CVSTR ("Content-MD5")] = CVSTR ("CONTENT_MD5");
	fCommonHeaders[CVSTR ("Content-Range")] = CVSTR ("CONTENT_RANGE");
	fCommonHeaders[CVSTR ("Content-Type")] = CVSTR ("CONTENT_TYPE");
	fCommonHeaders[CVSTR ("Expires")] = CVSTR ("EXPIRES");
	fCommonHeaders[CVSTR ("Last-Modified")] = CVSTR ("LAST_MODIFIED");
	fCommonHeaders[CVSTR ("Location")] = CVSTR ("LOCATION");
	fCommonHeaders[CVSTR ("Pragma")] = CVSTR ("PRAGMA");
	fCommonHeaders[CVSTR ("Proxy-Authenticate")] = CVSTR ("PROXY_AUTHENTICATE");
	fCommonHeaders[CVSTR ("Retry-After")] = CVSTR ("RETRY_AFTER");
	fCommonHeaders[CVSTR ("Server")] = CVSTR ("SERVER");
	fCommonHeaders[CVSTR ("Set-Cookie")] = CVSTR ("SET_COOKIE");
	fCommonHeaders[CVSTR ("Status")] = CVSTR ("STATUS");
	fCommonHeaders[CVSTR ("Vary")] = CVSTR ("VARY");
	fCommonHeaders[CVSTR ("WWW-Authenticate")] = CVSTR ("WWW_AUTHENTICATE");
	fCommonHeaders[CVSTR ("X-Status")] = CVSTR ("X_STATUS");
	fCommonHeaders[CVSTR ("X-Powered-By")] = CVSTR ("X_POWERED_BY");
	fCommonHeaders[CVSTR ("X-Version")] = CVSTR ("X_VERSION");
}


void VJSHTTPResponseHeader::Finalize (const XBOX::VJSParms_finalize& inParms, XBOX::VHTTPHeader *inHeader)
{
}


void VJSHTTPResponseHeader::_GetHeaderNameFromPropertyName (const XBOX::VString& inPropertyName, XBOX::VString& outHeaderName)
{
	outHeaderName.Clear();

	for (std::map<XBOX::VString, XBOX::VString>::const_iterator it = fCommonHeaders.begin(); it != fCommonHeaders.end(); ++it)
	{
		if ((*it).second.EqualToString (inPropertyName))
		{
			outHeaderName.FromString ((*it).first);
			break;
		}
	}

	if (outHeaderName.IsEmpty())
		outHeaderName.FromString (inPropertyName);
}


void VJSHTTPResponseHeader::GetProperty (XBOX::VJSParms_getProperty& ioParms, XBOX::VHTTPHeader *inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString propertyName;
	XBOX::VString headerName;
	XBOX::VString headerValue;

	ioParms.GetPropertyName (propertyName);
	_GetHeaderNameFromPropertyName (propertyName, headerName);

	if (inHeader->GetHeaderValue (headerName, headerValue))
		ioParms.ReturnString (headerValue);
}


bool VJSHTTPResponseHeader::SetProperty (XBOX::VJSParms_setProperty& ioParms, XBOX::VHTTPHeader *inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return false;
	}

	XBOX::VString propertyName;
	XBOX::VString headerName;
	XBOX::VString headerValue;

	ioParms.GetPropertyName (propertyName);
	ioParms.GetPropertyValue().GetString (headerValue);

	_GetHeaderNameFromPropertyName (propertyName, headerName);

	if (inHeader->SetHeaderValue (headerName, headerValue))
		return true;

	return false;
}


void VJSHTTPResponseHeader::GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, XBOX::VHTTPHeader* inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	for (std::map<XBOX::VString, XBOX::VString>::const_iterator it = fCommonHeaders.begin(); it != fCommonHeaders.end(); ++it)
		ioParms.AddPropertyName ((*it).second);
}


void VJSHTTPResponseHeader::_GetHeaderValue (VJSParms_callStaticFunction& ioParms, XBOX::VHTTPHeader *inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString headerName;
	XBOX::VString headerValue;

	if (ioParms.GetStringParam (1, headerName))
		inHeader->GetHeaderValue (headerName, headerValue);

	ioParms.ReturnString (headerValue);
}


void VJSHTTPResponseHeader::_SetHeaderValue (VJSParms_callStaticFunction& ioParms, XBOX::VHTTPHeader *inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString headerName;
	XBOX::VString headerValue;

	if (ioParms.GetStringParam (1, headerName) && ioParms.GetStringParam (2, headerValue))
		inHeader->SetHeaderValue (headerName, headerValue);
}


void VJSHTTPResponseHeader::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "getHeaderValue", js_callStaticFunction<_GetHeaderValue>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ "setHeaderValue", js_callStaticFunction<_SetHeaderValue>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};
	
	outDefinition.className = "HttpResponseHeader";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.getProperty = js_getProperty<GetProperty>;
	outDefinition.setProperty = js_setProperty<SetProperty>;
	outDefinition.getPropertyNames = js_getPropertyNames<GetPropertyNames>;
	outDefinition.staticFunctions = functions;
}


//--------------------------------------------------------------------------------------------------


void VJSHTTPRequest::Initialize (const XBOX::VJSParms_initialize& inParms, IHTTPRequest *inRequest)
{
}


void VJSHTTPRequest::Finalize (const XBOX::VJSParms_finalize& inParms, IHTTPRequest *inRequest)
{
}


void VJSHTTPRequest::_GetURL (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetURL());
}


void VJSHTTPRequest::_GetRawURL (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetRawURL());
}


void VJSHTTPRequest::_GetURLPath (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetURLPath());
}


void VJSHTTPRequest::_GetURLQuery (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetURLQuery());
}


void VJSHTTPRequest::_GetHost (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetHost());
}


void VJSHTTPRequest::_GetMethod (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString valueString;
	inRequest->GetRequestMethodString (valueString);
	ioParms.ReturnString (valueString);
}


void VJSHTTPRequest::_GetVersion (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString valueString;
	inRequest->GetRequestHTTPVersionString (valueString);
	ioParms.ReturnString (valueString);
}


void VJSHTTPRequest::_GetUser (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString valueString;
	inRequest->GetAuthenticationInfos()->GetUserName (valueString);
	ioParms.ReturnString (valueString);
}


void VJSHTTPRequest::_GetPassword (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString valueString;
	inRequest->GetAuthenticationInfos()->GetPassword (valueString);
	ioParms.ReturnString (valueString);
}


void VJSHTTPRequest::_GetRequestLine (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetRequestLine());
}


void VJSHTTPRequest::_GetHeaders (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VHTTPHeader *header = const_cast<XBOX::VHTTPHeader *> (&inRequest->GetHTTPHeaders());
	VJSObject	resultObject = VJSHTTPRequestHeader::CreateInstance (ioParms.GetContext(), header);
	ioParms.ReturnValue (resultObject);
}


void VJSHTTPRequest::_GetBody (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	MimeTypeKind		contentTypeKind = inRequest->GetContentTypeKind();
	XBOX::VPtrStream *	stream = const_cast<XBOX::VPtrStream*> (&inRequest->GetRequestBody());
	XBOX::VString		contentType;
	XBOX::CharSet		charSet = XBOX::VTC_UNKNOWN;

	inRequest->GetContentTypeHeader (contentType, &charSet);

	XBOX::VJSValue result = VJSMIMEMessagePart::GetJSValueFromStream (ioParms.GetContext(), contentTypeKind, charSet, stream);
	ioParms.ReturnValue (result);
}


void VJSHTTPRequest::_GetParts (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VMIMEMessage * form = const_cast<XBOX::VMIMEMessage *> (inRequest->GetHTMLForm());
	VJSObject	resultObject = VJSMIMEMessage::CreateInstance (ioParms.GetContext(), form);
	ioParms.ReturnValue (resultObject);
}


void VJSHTTPRequest::_GetContentType (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString contentType;
	inRequest->GetHTTPHeaders().GetHeaderValue (HEADER_CONTENT_TYPE, contentType);
	ioParms.ReturnString (contentType);
}


void VJSHTTPRequest::_GetLocalAddress (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetLocalIP());
}


void VJSHTTPRequest::_GetLocalPort (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnNumber (inRequest->GetLocalPort());
}


void VJSHTTPRequest::_GetIsSSL (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnBool (inRequest->IsSSL());
}


void VJSHTTPRequest::_GetRemoteAddress (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetPeerIP());
}


void VJSHTTPRequest::_GetRemotePort (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnNumber (inRequest->GetPeerPort());
}


/*
 *	Internal Use Only - Do NOT document the following function
 */
void VJSHTTPRequest::_ResolveURL (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPRequest *inRequest)
{
	/*
	 *	JS Sample code usage:
	 *	var filePath = request.resolveURL ('/', 'path', 'system');
	 *	var filePath = request.resolveURL ('/', 'path', 'posix');
	 *	var filePath = request.resolveURL ('/', 'url', 'encoded');
	 *	var filePath = request.resolveURL ('/', 'url', 'notEncoded');
	 *	var filePath = request.resolveURL ('/', 'relativePath', 'system');
	 *	var filePath = request.resolveURL ('/', 'relativePath', 'posix');
	 */
	XBOX::VString	URLString;

	if (NULL != inRequest && (ioParms.GetStringParam (1, URLString)))
	{
		XBOX::VFilePath	filePath;
		XBOX::VFilePath	webFolderPath;
		XBOX::VError	error = VRoutingPreProcessingHandler::ResolveURL (inRequest, URLString, filePath, webFolderPath);

		if (XBOX::VE_OK == error)
		{
			// create a temp fileSystem for proper sandboxing,
			// TEMP until web resources are defined using fileSystems.
			VFileSystem *fs = VFileSystem::Create( CVSTR( "VIRTUAL_FOLDER"), webFolderPath, eFSO_Private);
			JSReturnFolderOrFile (filePath, fs, ioParms, 2, 3);
			ReleaseRefCountable( &fs);
		}
		else
			XBOX::vThrowError (error);
	}	
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
	}
}


void VJSHTTPRequest::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "resolveURL", js_callStaticFunction<_ResolveURL>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	static inherited::StaticValue values[] = 
	{
		{ "url", js_getProperty<_GetURL>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "rawURL", js_getProperty<_GetRawURL>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "urlPath", js_getProperty<_GetURLPath>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "urlQuery", js_getProperty<_GetURLQuery>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "host", js_getProperty<_GetHost>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "method", js_getProperty<_GetMethod>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "version", js_getProperty<_GetVersion>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "user", js_getProperty<_GetUser>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "password", js_getProperty<_GetPassword>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "requestLine", js_getProperty<_GetRequestLine>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "headers", js_getProperty<_GetHeaders>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "body", js_getProperty<_GetBody>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "parts", js_getProperty<_GetParts>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "contentType", js_getProperty<_GetContentType>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "localAddress", js_getProperty<_GetLocalAddress>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "localPort", js_getProperty<_GetLocalPort>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "isSSL", js_getProperty<_GetIsSSL>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "remoteAddress", js_getProperty<_GetRemoteAddress>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "remotePort", js_getProperty<_GetRemotePort>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0, 0}
	};
	
	outDefinition.className = "HttpRequest";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticValues = values;
	outDefinition.staticFunctions = functions;
}


//--------------------------------------------------------------------------------------------------


void VJSHTTPResponse::Initialize (const XBOX::VJSParms_initialize& inParms, IHTTPResponse* inResponse)
{
}


void VJSHTTPResponse::Finalize (const XBOX::VJSParms_finalize& inParms, IHTTPResponse* inResponse)
{
}


void VJSHTTPResponse::GetProperty (XBOX::VJSParms_getProperty& ioParms, IHTTPResponse* inResponse)
{
	if (NULL == inResponse)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString propertyName;
	XBOX::VString stringValue;

	ioParms.GetPropertyName (propertyName);

	if (propertyName.EqualToUSASCIICString ("statusCode"))
	{
		ioParms.ReturnNumber ((sLONG)inResponse->GetResponseStatusCode());
	}
	else if (propertyName.EqualToUSASCIICString ("body"))
	{
		MimeTypeKind		contentTypeKind = inResponse->GetContentTypeKind();
		XBOX::VPtrStream *	stream = const_cast<XBOX::VPtrStream*> (&inResponse->GetResponseBody());
		XBOX::VString		contentType;
		XBOX::CharSet		charSet = XBOX::VTC_UNKNOWN;

		inResponse->GetContentTypeHeader (contentType, &charSet);

		XBOX::VJSValue result = VJSMIMEMessagePart::GetJSValueFromStream(ioParms.GetContext(), contentTypeKind, charSet, stream);
		ioParms.ReturnValue (result);
	}
	else if (propertyName.EqualToUSASCIICString ("headers"))
	{
		XBOX::VHTTPHeader *header = const_cast<XBOX::VHTTPHeader *>(&inResponse->GetResponseHeader());
		VJSObject	resultObject = VJSHTTPResponseHeader::CreateInstance (ioParms.GetContext(), header);
		ioParms.ReturnValue (resultObject);
	}
	else if (propertyName.EqualToUSASCIICString ("contentType"))
	{
		XBOX::VString contentType;
		inResponse->GetResponseHeader (HEADER_CONTENT_TYPE, contentType);
		ioParms.ReturnString (contentType);
	}
}


bool VJSHTTPResponse::SetProperty (XBOX::VJSParms_setProperty& ioParms, IHTTPResponse *inResponse)
{
	if (NULL == inResponse)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return false;
	}

	bool			result = false;
	XBOX::VString	propertyName;
	XBOX::VString	valueString;

	ioParms.GetPropertyName (propertyName);

	if (propertyName.EqualToUSASCIICString ("statusCode"))
	{
		sLONG statusCode = 0;
		if (ioParms.GetPropertyValue().GetLong (&statusCode))
		{
			if (((HTTPStatusCode)statusCode > HTTP_UNDEFINED) && ((HTTPStatusCode)statusCode <= HTTP_HTTP_VERSION_NOT_SUPPORTED))
				inResponse->SetResponseStatusCode ((HTTPStatusCode)statusCode);
			result = true;
		}
	}
	else if (propertyName.EqualToUSASCIICString ("body"))
	{
		result = SetHTTPResponseFromJSValue (ioParms.GetPropertyValue(), inResponse);
	}
	else if (propertyName.EqualToUSASCIICString ("contentType"))
	{
		XBOX::VString contentType;

		if (ioParms.GetPropertyValue().GetString (contentType) && !contentType.IsEmpty())
			result = inResponse->AddResponseHeader (HEADER_CONTENT_TYPE, contentType);
	}

	return result;
}


void VJSHTTPResponse::GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, IHTTPResponse *inResponse)
{
	ioParms.AddPropertyName (CVSTR ("statusCode"));
	ioParms.AddPropertyName (CVSTR ("body"));
	ioParms.AddPropertyName (CVSTR ("headers"));
	ioParms.AddPropertyName (CVSTR ("contentType"));
}


void VJSHTTPResponse::_SendChunkedData (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPResponse *inResponse)
{
	if (NULL == inResponse)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	SendChunkedResponseFromJSValue (ioParms.GetParamValue (1), inResponse);
}


void VJSHTTPResponse::_SetCompression (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPResponse *inResponse)
{
	if (NULL != inResponse)
	{
		sLONG minThreshold = -1, maxThreshold = -1;
		if (ioParms.IsNumberParam(1))
		{
			ioParms.GetLongParam(1, &minThreshold);
		}
		if (ioParms.IsNumberParam(2))
		{
			ioParms.GetLongParam(2, &maxThreshold);
		}
		inResponse->AllowCompression(true, minThreshold, maxThreshold);
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
	}
}


void VJSHTTPResponse::_SetCacheBodyMessage (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPResponse *inResponse)
{
	if (NULL != inResponse)
	{
		bool bValue = false;

		if (ioParms.IsBooleanParam (1))
		{
			ioParms.GetBoolParam (1, &bValue);
		}

		inResponse->SetCacheBodyMessage (bValue);
	}	
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
	}
}


void VJSHTTPResponse::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "sendChunkedData", js_callStaticFunction<_SendChunkedData>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ "allowCompression", js_callStaticFunction<_SetCompression>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ "allowCache", js_callStaticFunction<_SetCacheBodyMessage>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};
	
	outDefinition.className = "HttpResponse";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.getProperty = js_getProperty<GetProperty>;
	outDefinition.setProperty = js_setProperty<SetProperty>;
	outDefinition.getPropertyNames = js_getPropertyNames<GetPropertyNames>;
	outDefinition.staticFunctions = functions;
}


// ----------------------------------------------------------------------------



void VJSHTTPServer::Initialize (const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inRIAServerProject)
{
	inRIAServerProject->Retain();
}


void VJSHTTPServer::Finalize (const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inRIAServerProject)
{
	inRIAServerProject->Release();
}


void VJSHTTPServer::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "start", js_callStaticFunction<_start>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "stop", js_callStaticFunction<_stop>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	static inherited::StaticValue values[] =
	{
		{ "started", js_getProperty<_getStarted>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "port", js_getProperty<_getPort>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "ipAddress", js_getProperty<_getIpAddress>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "hostName", js_getProperty<_getHostName>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "defaultCharSet", js_getProperty<_getDefaultCharSet>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_SSL, js_getProperty<_getSSL>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_HTTPServerCache, js_getProperty<_getCache>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0,0}
	};

	outDefinition.className = kSSJS_CLASS_NAME_HTTPServer;
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticFunctions = functions;
	outDefinition.staticValues = values;
}


void VJSHTTPServer::_start (XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	inRIAServerProject->StartHTTPServerProject (riaContext);
}


void VJSHTTPServer::_stop (XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	inRIAServerProject->StopHTTPServerProject (riaContext);
}


void VJSHTTPServer::_getStarted (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	ioParms.ReturnBool (inRIAServerProject->IsHTTPServerProjectStarted (riaContext));
}


void VJSHTTPServer::_getPort (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		ioParms.ReturnNumber (settings->GetListeningPort());
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


void VJSHTTPServer::_getIpAddress (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		VString ip=settings->GetListeningAddress();
		ioParms.ReturnString (ip);
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


void VJSHTTPServer::_getHostName (VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VString hostName;
	inRIAServerProject->GetHostName (hostName);
	ioParms.ReturnString (hostName);
}


void VJSHTTPServer::_getDefaultCharSet (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		ioParms.ReturnString ((settings->GetDefaultCharSet() == VTC_UTF_8) ? RIASettingsKeys::HTTP::kCHARSET_UTF8 : RIASettingsKeys::HTTP::kCHARSET_UTF16);
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


void VJSHTTPServer::_getSSL (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnValue (VJSSSL::CreateInstance (ioParms.GetContext(), inRIAServerProject));
}


void VJSHTTPServer::_getCache (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnValue (VJSHTTPServerCache::CreateInstance (ioParms.GetContext(), inRIAServerProject));
}



// ----------------------------------------------------------------------------



void VJSHTTPServerCache::Initialize (const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inRIAServerProject)
{
	inRIAServerProject->Retain();
}


void VJSHTTPServerCache::Finalize (const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inRIAServerProject)
{
	inRIAServerProject->Release();
}


void VJSHTTPServerCache::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticValue values[] =
	{
		{ "enabled", js_getProperty<_getEnabled>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "memorySize", js_getProperty<_getMemorySize>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0,0}
	};

	outDefinition.className = kSSJS_CLASS_NAME_HTTPServerCache;
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticValues = values;
}


void VJSHTTPServerCache::_getEnabled (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		ioParms.ReturnBool (settings->GetEnableCache());
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


void VJSHTTPServerCache::_getMemorySize (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		ioParms.ReturnNumber (settings->GetCacheMaxSize());
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


// ----------------------------------------------------------------------------



void VJSSSL::Initialize (const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inRIAServerProject)
{
	inRIAServerProject->Retain();
}


void VJSSSL::Finalize (const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inRIAServerProject)
{
	inRIAServerProject->Release();
}


void VJSSSL::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "getCertificatePath", js_callStaticFunction<_getCertificatePath>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getCertificateFolder", js_callStaticFunction<_getCertificateFolder>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	static inherited::StaticValue values[] =
	{
		{ "enabled", js_getProperty<_getEnabled>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "port", js_getProperty<_getPort>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0,0}
	};

	outDefinition.className = kSSJS_CLASS_NAME_SSL;
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticFunctions = functions;
	outDefinition.staticValues = values;
}


void VJSSSL::_getCertificatePath (XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		// sc 03/01/2014 WAK0085548, WAK0085547, returns a posix path instead of a native path
		VString posixPath;
		VURL url( settings->GetSSLCertificatesFolderPath());
		url.GetPath( posixPath, eURL_POSIX_STYLE, true);
		ioParms.ReturnString( posixPath);
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


void VJSSSL::_getCertificateFolder (XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inRIAServerProject)
{
	// sc 08/01/2014, added
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		VFilePath path = settings->GetSSLCertificatesFolderPath();
		ioParms.ReturnFilePathAsFileOrFolder( path);
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


void VJSSSL::_getEnabled (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		ioParms.ReturnBool (settings->GetAllowSSL());
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


void VJSSSL::_getPort (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		ioParms.ReturnNumber (settings->GetListeningSSLPort());
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}
