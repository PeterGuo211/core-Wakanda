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
#include "HTTPServer/Interfaces/CHTTPServer.h"
#include "VRIAServerApplication.h"
#include "VRIAServerTools.h"


USING_TOOLBOX_NAMESPACE


VError SetHTTPResponseString( IHTTPResponse* inResponse, const VString& inString, const VString* inContentType)
{
	if (inResponse == NULL)
		return VE_INVALID_PARAMETER;
	
	StStringConverter<char> buffer( inString, VTC_UTF_8);

	inResponse->GetResponseBody().OpenWriting();
	inResponse->GetResponseBody().SetSize(0); // YT 06-May-2014 - Clear Body if not empty
	inResponse->GetResponseBody().PutData( buffer.GetCPointer(), buffer.GetLength());
	inResponse->GetResponseBody().CloseWriting();

	VError err = inResponse->GetResponseBody().GetLastError();
	if (err == VE_OK)
	{
		inResponse->SetExpiresHeader( GMT_NOW);
		inResponse->AddResponseHeader( HEADER_PRAGMA, CVSTR ("no-cache"));
		if (inContentType != NULL)
		{
			inResponse->AddResponseHeader( HEADER_CONTENT_TYPE, *inContentType);
		}
		/* We send a String encoded using UTF-8, so set the correct header value */
		XBOX::CharSet	charSet = XBOX::VTC_UNKNOWN;
		XBOX::VString	contentType;
		inResponse->GetContentTypeHeader (contentType, &charSet);
		if (contentType.IsEmpty() || charSet !=  VTC_UTF_8)
		{
			inResponse->SetContentTypeHeader (contentType.IsEmpty() ? CVSTR ("text/html"): contentType, VTC_UTF_8);
		}
#if HTTP_SERVER_VERBOSE_MODE
		inResponse->AddResponseHeader( HEADER_X_POWERED_BY, "RIA Server");
#endif
		inResponse->SetContentLengthHeader( buffer.GetLength());
		inResponse->AllowCompression (false);
	}
	return err;
}


VError ThrowError( VError inError)
{
	VErrorBase *errBase = new VErrorBase( inError, 0);
	if (errBase != NULL)
		VTask::GetCurrent()->PushRetainedError( errBase);
	return inError;
}


VError ThrowError( VError inError, const VValueBag& inParameters)
{
	VErrorBase *errBase = CreateErrorBase( inError, inParameters);
	if (errBase != NULL)
		VTask::GetCurrent()->PushRetainedError( errBase);
	return inError;
}


VError ThrowError( VError inError, const VString *inParam, ...)
{
	VErrorBase *errBase = new VErrorBase( inError, 0);
	if (errBase != NULL)
	{
		VValueBag *bag = errBase->GetBag();
		if (bag != NULL)
		{
			VIndex paramNum = 1;
			
			va_list argList;
			va_start( argList, inParam);
			
			for (const VString *param = inParam ; param != NULL ; param = va_arg( argList, const VString*), ++paramNum)
			{
				VString attName( "p");
				attName.AppendLong( paramNum);
				bag->SetString( attName, *param);
			}
			
			va_end( argList);
		}

		VTask::GetCurrent()->PushRetainedError( errBase);
	}
	return inError;
}


VErrorBase* CreateErrorBase( VError inError, const XBOX::VValueBag& inParameters)
{
	VErrorBase *errBase = new VErrorBase( inError, 0);
	if (errBase != NULL)
	{
		VValueBag *bag = errBase->GetBag();
		if (bag != NULL)
		{
			for (VIndex pos = 1 ; pos <= inParameters.GetAttributesCount() ; ++pos)
			{
				VString name;
				const VValueSingle* value = inParameters.GetNthAttribute( pos, &name);
				bag->SetAttribute( name, (value != NULL) ? value->Clone() : NULL);
			}
		}
	}
	return errBase;
}


VErrorBase* CreateErrorBase( VError inError, const VString *inParam, ...)
{
	VErrorBase *errBase = new VErrorBase( inError, 0);
	if (errBase != NULL)
	{
		VValueBag *bag = errBase->GetBag();
		if (bag != NULL)
		{
			VIndex paramNum = 1;
			
			va_list argList;
			va_start( argList, inParam);
			
			for (const VString *param = inParam ; param != NULL ; param = va_arg( argList, const VString*), ++paramNum)
			{
				VString attName( "p");
				attName.AppendLong( paramNum);
				bag->SetString( attName, *param);
			}

			va_end( argList);
		}
	}
	return errBase;
}


void fputs_VString( const VString& inMessage, FILE *inFile)
{
	VSize bufferSize = inMessage.GetLength()*2 + 1;
	VPtr buffer = VMemory::NewPtrClear( bufferSize, kRIA_OSTYPE_SIGNATURE);
	inMessage.ToCString( buffer, bufferSize);
	fputs( buffer, inFile);

	// WAK0088811: The messages on stdout are buffered too long and we can end up waiting for them.
	// This can be a problem when using a SystemWorker to read the content of stdout (no onmessage 
	// for a long time). So always do a flush.

	fflush(inFile);	

	VMemory::DisposePtr( buffer);
}


sLONG8 ComputeFolderSize( const VFolder *inFolder)
{
	sLONG8 size = 0;

	if (inFolder != NULL)
	{
		std::vector< VRefPtr < VFile > > files;
		std::vector< VRefPtr < VFolder > > folders;

		inFolder->GetContents( files, folders);

		for (std::vector< VRefPtr < VFile > >::iterator filesIter = files.begin() ; filesIter != files.end() ; ++filesIter)
		{
			sLONG8 fileSize = 0;
			if ((*filesIter)->GetSize( &fileSize) == VE_OK)
				size += fileSize;
		}

		for (std::vector< VRefPtr < VFolder > >::iterator foldersIter = folders.begin() ; foldersIter != folders.end() ; ++foldersIter)
		{
			size += ComputeFolderSize( *foldersIter);
		}
	}

	return size;
}


bool FolderContentWasChangedSinceDate( const VFolder *inFolder, const VTime& inDate)
{
	bool changed = false;

	if (inFolder != NULL)
	{
		VTime modificationTime;
		std::vector< VRefPtr < VFile > > files;
		std::vector< VRefPtr < VFolder > > folders;

		inFolder->GetContents( files, folders);

		for (std::vector< VRefPtr < VFile > >::iterator filesIter = files.begin() ; (filesIter != files.end()) && !changed ; ++filesIter)
		{
			if ((*filesIter)->GetTimeAttributes( &modificationTime) == VE_OK)
			{
				changed = modificationTime > inDate;
			}
		}

		for (std::vector< VRefPtr < VFolder > >::iterator foldersIter = folders.begin() ; (foldersIter != folders.end()) && !changed ; ++foldersIter)
		{
			changed = FolderContentWasChangedSinceDate( *foldersIter, inDate);
		}
	}

	return changed;
}



void LogBag( const XBOX::VValueBag *inMessage)
{
	VProcess::Get()->GetLogger()->LogBag( inMessage);
}


void LogMessage( const XBOX::VString& inSourceIdentifier, XBOX::EMessageLevel inLevel, const XBOX::VString& inMessage)
{
	VProcess::Get()->GetLogger()->LogMessage( inLevel, inMessage, inSourceIdentifier);
}


void LogWorkersInformations( const XBOX::VString& inLoggerID, const std::vector<JSWorkerInfo>& inWorkersInfos)
{
	for (std::vector<JSWorkerInfo>::const_iterator iter = inWorkersInfos.begin() ; iter != inWorkersInfos.end() ; ++iter)
	{
		if (iter->fType != VJSWorker::TYPE_ROOT)
		{
			VString type = (iter->fType == VJSWorker::TYPE_DEDICATED) ? L"Dedicated" : L"Shared";
			VString msg;
			msg.Printf( "%S worker \"%S\" with script path \"%S\" is running", &type, &iter->fName, &iter->fURL);
			VProcess::Get()->GetLogger()->LogMessage( eL4JML_Information, msg, inLoggerID);
		}
	}
}



bool IsValidDebuggerParam( const XBOX::VString& inParameter)
{
	return (	inParameter.EqualToString( L"wakanda")
			||	inParameter.EqualToString( L"remote")
			||	inParameter.EqualToString( L"none"));
}


bool IsValidDebuggerType( WAKDebuggerType_t inType)
{
	return (	(inType == REGULAR_DBG_TYPE)
			||	(inType == WEB_INSPECTOR_TYPE)
			||	(inType == NO_DEBUGGER_TYPE) );
}


WAKDebuggerType_t DebuggerParamToDebuggerType( const XBOX::VString& inParameter)
{
	WAKDebuggerType_t dbgType = UNKNOWN_DBG_TYPE;

	if (inParameter.EqualToString( L"wakanda"))
		dbgType = REGULAR_DBG_TYPE;
	else if (inParameter.EqualToString( L"remote"))
		dbgType = WEB_INSPECTOR_TYPE;
	else if (inParameter.EqualToString( L"none"))
		dbgType = NO_DEBUGGER_TYPE;

	return dbgType;
}


VString DebuggerTypeToDebuggerParam( WAKDebuggerType_t inType)
{
	VString dbgParam;

	switch (inType)
	{
	case REGULAR_DBG_TYPE:
		dbgParam = L"wakanda";
		break;
	case WEB_INSPECTOR_TYPE:
		dbgParam = L"remote";
		break;
	case NO_DEBUGGER_TYPE:
		dbgParam = L"none";
		break;
	default:
		break;
	}

	return dbgParam;
}




StTaskPropertiesSetter::StTaskPropertiesSetter( const VValueBag* inProperties)
: fPreviousProperties( NULL)
{
	_OverrideTaskProperties( inProperties);
}


StTaskPropertiesSetter::StTaskPropertiesSetter( const VString* inLogSourceIdentifier, const VString* inJobID)
: fPreviousProperties( NULL)
{
	VValueBag *bag = new VValueBag;

	if (inLogSourceIdentifier != NULL)
		ILoggerBagKeys::source.Set( bag, *inLogSourceIdentifier);

	if (inJobID != NULL)
		ILoggerBagKeys::jobId.Set( bag, *inJobID);

	if (!bag->IsEmpty())
	{
		_OverrideTaskProperties( bag);
	}

	ReleaseRefCountable( &bag);
}


StTaskPropertiesSetter::~StTaskPropertiesSetter()
{
	VTask::GetCurrent()->SetProperties( fPreviousProperties);
	ReleaseRefCountable( &fPreviousProperties);
}


#if VERSIONDEBUG

void StTaskPropertiesSetter::_Test()
{
	const VValueBag *initialProps = VTask::GetCurrent()->RetainProperties();

	{
		VValueBag *bag_a = new VValueBag;
		bag_a->SetString( L"testAttribute", L"bag_a");

		StTaskPropertiesSetter setter_a( bag_a);
		const VValueBag *props_a = VTask::GetCurrent()->RetainProperties();
		if (testAssert(props_a != NULL))
		{
			VString value_a;
			if (testAssert(props_a->GetString( L"testAttribute", value_a)))
			{
				assert(value_a == L"bag_a");
			}
			props_a->Release();
		}

		{
			VValueBag *bag_b = new VValueBag;
			bag_b->SetString( L"testAttribute", L"bag_b");

			StTaskPropertiesSetter setter_b( bag_b);
			const VValueBag *props_b = VTask::GetCurrent()->RetainProperties();
			if (testAssert(props_b != NULL))
			{
				VString value_b;
				if (testAssert(props_b->GetString( L"testAttribute", value_b)))
				{
					assert(value_b == L"bag_b");
				}
				props_b->Release();
			}
			bag_b->Release();
		}

		props_a = VTask::GetCurrent()->RetainProperties();
		if (testAssert(props_a != NULL))
		{
			VString value_a;
			if (testAssert(props_a->GetString( L"testAttribute", value_a)))
			{
				assert(value_a == L"bag_a");
			}
			props_a->Release();
		}
		bag_a->Release();
	}

	const VValueBag *curProps = VTask::GetCurrent()->RetainProperties();
	assert(curProps == initialProps);
	ReleaseRefCountable( &curProps);
	ReleaseRefCountable( &initialProps);
}

#endif


void StTaskPropertiesSetter::_OverrideTaskProperties( const VValueBag* inProperties)
{
	assert(fPreviousProperties == NULL);
	
	if (inProperties != NULL)
	{
		VValueBag* newProperties = NULL;
		
		fPreviousProperties = VTask::GetCurrent()->RetainProperties();
		if (fPreviousProperties != NULL)
		{
			newProperties = fPreviousProperties->Clone();
			if (!newProperties->Override( inProperties))
			{
				ReleaseRefCountable( &newProperties);
			}
		}
		else
		{
			newProperties = inProperties->Clone();
		}
		
		if (newProperties != NULL)
		{
			VTask::GetCurrent()->SetProperties( newProperties);
			newProperties->Release();
		}
	}
}
