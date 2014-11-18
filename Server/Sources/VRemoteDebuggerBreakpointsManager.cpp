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
#include "VRemoteDebuggerBreakpointsManager.h"
#include "JavaScript/Sources/VJSJSON.h"
#include "VRIAServerProject.h"
#include "VRIAJSDebuggerSettings.h"
#include "VProject.h"
#include "VRIAServerApplication.h"

const XBOX::VString			K_LF_STR("\n");
const XBOX::VString			K_CR_STR("\r");
#if VERSIONWIN || VERSION_LINUX
	const XBOX::VString			K_DEFAULT_LINE_SEPARATOR(K_LF_STR);
	const XBOX::VString			K_ALTERNATIVE_LINE_SEPARATOR(K_CR_STR);
#else

	#if VERSIONMAC
		const XBOX::VString			K_DEFAULT_LINE_SEPARATOR(K_CR_STR);
		const XBOX::VString			K_ALTERNATIVE_LINE_SEPARATOR(K_LF_STR);
	#else
		#error "UNKNOWN TARGET --> SHOULD NOT HAPPEN!!!"
	#endif

#endif

sLONG											VRemoteDebuggerBreakpointsManager::sTimeStamp = 1;
XBOX::VCriticalSection							VRemoteDebuggerBreakpointsManager::sTimeStampLock;


VRemoteDebuggerBreakpointsManager::VRemoteDebuggerBreakpointsManager(const XBOX::VString& inSourcesRoot) : fSourcesRoot(inSourcesRoot), fSolution(NULL)
{
}

VRemoteDebuggerBreakpointsManager::~VRemoteDebuggerBreakpointsManager()
{
	fAllBreakPoints.clear();
}

void VRemoteDebuggerBreakpointsManager::GetGlobalTimeStamp(sLONG& outTimeStamp)
{
	sTimeStampLock.Lock();
	outTimeStamp = sTimeStamp;
	sTimeStampLock.Unlock();
}

void VRemoteDebuggerBreakpointsManager::IncrementGlobalTimeStamp()
{
	sTimeStampLock.Lock();
	sTimeStamp++;
	sTimeStampLock.Unlock();
}

void VRemoteDebuggerBreakpointsManager::GetBreakpoints( std::set< VFileBreakpoints > & outBrkpts )
{
	outBrkpts.clear();
	fLock.Lock();
	std::map< XBOX::VString, std::set< unsigned > >::const_iterator		itFile = fAllBreakPoints.begin();
	while( itFile != fAllBreakPoints.end() )
	{
		VFileBreakpoints	tmp((*itFile).first);
		tmp.fBreakpoints = (*itFile).second;
		outBrkpts.insert( tmp );
		itFile++;
	}
	fLock.Unlock();
}

void VRemoteDebuggerBreakpointsManager::GetJSONBreakpoints(XBOX::VString& outJSONBreakPoints)
{
	std::set< VFileBreakpoints >	tmpBrkpts;
	GetBreakpoints(tmpBrkpts);
	std::set< VFileBreakpoints >::iterator		itBrkpt = tmpBrkpts.begin();
	bool										isFirst = true;

	outJSONBreakPoints = "[";
	while ( itBrkpt != tmpBrkpts.end() )
	{
		std::set< unsigned >::iterator	itLines = (*itBrkpt).fBreakpoints.begin();
		if (itLines != (*itBrkpt).fBreakpoints.end())
		{
			XBOX::VString		fileName = (*itBrkpt).fUrl;
			XBOX::VURL::Decode( fileName );
			/*XBOX::VIndex				idx;
			idx = fileName.FindUniChar( L'/', fileName.GetLength(), true );
			if ( (idx  > 1) && (idx < fileName.GetLength()) )
			{
				XBOX::VString	l_tmp_str;
				fileName.GetSubString(idx+1,fileName.GetLength()-idx,l_tmp_str);
				fileName = l_tmp_str;
			}*/
			if (isFirst)
			{
				isFirst = false;
			}
			else
			{
				outJSONBreakPoints += ",";
			}
			outJSONBreakPoints += "{\"filename\":\"";
			outJSONBreakPoints += fileName;
			outJSONBreakPoints += "\",\"lines\":[";
			do
			{
				outJSONBreakPoints.AppendLong8(*itLines);
				itLines++;
				if (itLines != (*itBrkpt).fBreakpoints.end())
				{
					outJSONBreakPoints += ",";
				}
				else
				{
					break;
				}
			} while(true);
			outJSONBreakPoints += "]}";
		}
		itBrkpt++;
	}
	outJSONBreakPoints += "]";
}

/* dbg vars to debug movements between sourceIds and JSCtxs */
//#define __GH_DEBUG__
#if defined(__GH_DEBUG__)
const	VString					GH_DEBUG_TEST_FILENAME("titled1.js");
static	intptr_t				GH_DEBUG_SRCID = (intptr_t)-1;
static	OpaqueDebuggerContext	GH_DEBUG_CTX = (OpaqueDebuggerContext)-1;
#endif

bool VRemoteDebuggerBreakpointsManager::HasBreakpoint(OpaqueDebuggerContext inContext,intptr_t inSourceId, unsigned inLineNumber)
{
	bool	l_res = false;

	fLock.Lock();
#if defined(__GH_DEBUG__)
	if (inSourceId == GH_DEBUG_SRCID)
	{
		if (inContext != GH_DEBUG_CTX)
		{
			int a=1;
		}
		else
		{
			int b=1;
		}
	}
#endif

	std::map< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >::const_iterator	itCtx = fCtxs.find(inContext);

	if (itCtx != fCtxs.end())
	{
		std::map< uintptr_t, SourceDesc >::const_iterator	itSource = (*itCtx).second.find(inSourceId);

		if (itSource != (*itCtx).second.end())
		{

			std::map< XBOX::VString, std::set< unsigned > >::iterator	itFile =
												fAllBreakPoints.find((*itSource).second.fUrl);
		
			if (testAssert(itFile != fAllBreakPoints.end()))
			{
				/*std::set< unsigned >::iterator		itLine = (*itFile).second.find(inLineNumber+1);
				if ((*itFile).second.fUrl.Find("test.js"))
				{
					DebugMsg("\nWAKDebuggerBreakpoints::HasBreakpoint url='%S' line=%d\n",&(*itFile).second.fUrl,inLineNumber+1);
					std::set< unsigned >::iterator	l_tmp_it = (*itFile).second.fBreakpoints.begin();
					while( l_tmp_it != (*itFile).second.fBreakpoints.end() )
					{
						DebugMsg("\n   ... WAKDebuggerBreakpoints::HasBreakpoint    LINE->%d\n", (*l_tmp_it));
						l_tmp_it++;
					}
				}
				l_res = (itLine != (*itFile).second.fBreakpoints.end());*/
				l_res = ((*itFile).second.count(inLineNumber) > 0);
			}
		}
	}
	if (l_res)
	{
			//l_tmp = UString("has brkpt");
		//TRACE(&l_tmp);
		//int a=1;
	}
	fLock.Unlock();
	return l_res;
}

#define K_BREAKPOINTS_FILENAME	CVSTR("breakpoints.json")

void VRemoteDebuggerBreakpointsManager::Load()
{
	VError				err;
	XBOX::VFilePath		inFilePath;

	if (fSolution != NULL)
		fSolution->GetSolutionFolderPath(inFilePath);
#if WITH_SANDBOXED_PROJECT
	else if (VRIAServerApplication::Get()->GetHandlesSandboxedProject())
		inFilePath = fBreakpointsFolderPath;
#endif	
	
	XBOX::VFolder		vFolder(inFilePath);
	XBOX::VFile			bkptsFile(vFolder,K_BREAKPOINTS_FILENAME);
	VString				fileContent;

	if (bkptsFile.Exists())
	{
		err = bkptsFile.GetContentAsString(fileContent,VTC_UTF_8);
		
		VJSONValue		vjsonValue;
		VJSONValue		jsonBreakpoints;
		if (!err)
		{
			VJSONImporter	vjsonImp(fileContent);
			err = vjsonImp.Parse(vjsonValue);
		}
		if (!err)
		{
			jsonBreakpoints = vjsonValue.GetProperty(CVSTR("breakpoints"));
			if (!jsonBreakpoints.IsArray())
			{
				err = VE_INVALID_PARAMETER;
			}
		}

		if (!err)
		{
			VJSONArray*		jsonBreakpointsArray = jsonBreakpoints.GetArray();
			for ( sLONG idx = 0; idx < jsonBreakpointsArray->GetCount(); idx++ )
			{
				VJSONValue	elt = (*jsonBreakpointsArray)[idx];
				VJSONValue	values = elt.GetProperty(CVSTR("values"));
				if (!values.IsArray())
				{
					err = VE_INVALID_PARAMETER;
					break;
				}
				VJSONArray*		valuesArray = values.GetArray();
				for ( sLONG fileIdx = 0; fileIdx < valuesArray->GetCount(); fileIdx++ )
				{
					VJSONValue		file = (*valuesArray)[fileIdx];
					VString			filenameStr;
					VJSONValue		fileName = file.GetProperty(CVSTR("filename"));
					VJSONValue		lines = file.GetProperty(CVSTR("lines"));
					if (fileName.IsString() && lines.IsArray())
					{
						fileName.GetString(filenameStr);
						VJSONArray*		linesArray = lines.GetArray();
						for ( sLONG lineIdx = 0; lineIdx < linesArray->GetCount(); lineIdx++ )
						{
							VJSONValue	lineNb = (*linesArray)[lineIdx];
							AddBreakPoint( filenameStr, (int)lineNb.GetNumber() ); // that's why we don't lock Load() as a whole
						}
					}
					else
					{
						err = VE_INVALID_PARAMETER;
						break;
					}
				}
			}
		}
	}

}

void VRemoteDebuggerBreakpointsManager::Save()
{
	bool				isFirst = true;
	XBOX::VError		err = VE_OK;

	XBOX::VFilePath		inFolderPath;

	if (fSolution != NULL)
		fSolution->GetSolutionFolderPath(inFolderPath);
#if WITH_SANDBOXED_PROJECT
	else if (VRIAServerApplication::Get()->GetHandlesSandboxedProject())
		inFolderPath = fBreakpointsFolderPath;
#endif

	XBOX::VFolder		vFolder(inFolderPath);

	VFolder*			vfldrResources = VProcess::Get ( )-> RetainFolder ( VProcess::eFS_Resources );
	if ( vfldrResources != NULL )
	{
		VFolder*		vfldrDefaultSolution = vfldrResources-> RetainRelativeFolder ( CVSTR ( "Default Solution" ), FPS_POSIX );
		vfldrResources-> Release ( );

		bool			bIsDefaultSolution = false;
		if ( vfldrDefaultSolution != NULL )
		{
			bIsDefaultSolution = vfldrDefaultSolution-> IsSameFolder ( &vFolder );
			vfldrDefaultSolution-> Release ( );
		}

		if ( bIsDefaultSolution ) // Must not create a "breakpoints.json" file within application bundle.
			return;
	}

	XBOX::VFile			bkptsFile(vFolder,K_BREAKPOINTS_FILENAME);
	
	fLock.Lock();

	if (!bkptsFile.Exists())
	{
		err = bkptsFile.Create();
	}

	if (!err)
	{
		VString		data("{\"breakpoints\":[");

		std::map< XBOX::VString, std::set< unsigned > >::iterator	itFile = fAllBreakPoints.begin();
		if ( itFile != fAllBreakPoints.end() )
		{
			data += "{\"name\":\"admin\",\"values\":[";
			while( itFile != fAllBreakPoints.end() )
			{
				std::set< unsigned >::iterator		itLines = (*itFile).second.begin();
				if ( (*itFile).second.size() > 0 )
				{
					if (isFirst)
					{
						isFirst = false;
					}
					else
					{
						data += ",";
					}
					data += "{\"filename\":\"";
					VString filenameUrl;
					(*itFile).first.GetJSONString(filenameUrl);
					VURL		vurl((*itFile).first,true);

					VFilePath	absolutePath;//(filename);
					vurl.GetFilePath(absolutePath);
					VString		posixAbsolutePath;
					absolutePath.GetPosixPath( posixAbsolutePath );
					VString outRelativePosixPath;
					VString		solutionFolderPosixPath;
					inFolderPath.GetPosixPath(solutionFolderPosixPath);
					VSolution::GetPathRelativeToFolderPath( solutionFolderPosixPath, posixAbsolutePath, outRelativePosixPath );

					data += (*itFile).first;
					data += "\",\"lines\":[";
					while( 1 )
					{
						data.AppendLong8( *itLines );
					
						itLines++;
						if (itLines != (*itFile).second.end() )
						{
							data += ",";
						}
						else
						{
							break;
						}
					}
					data += "]}";
				}
				itFile++;
				/*if (itFile != fAllBreakPoints.end())
				{
					data += ",";
				}*/
			}
			data += "]}";
		}
		data += "]}";

		VStringConvertBuffer	buffer(data,VTC_UTF_8);
		bkptsFile.SetContent(buffer.GetCPointer(),buffer.GetSize());
	}

	fLock.Unlock();
}

bool VRemoteDebuggerBreakpointsManager::AddBreakPoint( OpaqueDebuggerContext inContext, const XBOX::VString& inUrl, intptr_t inSourceId, int inLineNumber )
{
	bool	result = false;

	fLock.Lock();

	std::map< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >::iterator	itCtx = fCtxs.find(inContext);

	if (itCtx != fCtxs.end())
	{
		std::map< uintptr_t, SourceDesc >::iterator	itSource = (*itCtx).second.find(inSourceId);

		if (itSource != (*itCtx).second.end())
		{
			std::map< XBOX::VString, std::set< unsigned > >::iterator	itFile = fAllBreakPoints.find( (*itSource).second.fUrl );
		
			if ( itFile != fAllBreakPoints.end() )
			{
				if ( !(*itFile).second.count(inLineNumber) )
				{
					(*itFile).second.insert(inLineNumber);
					IncrementGlobalTimeStamp();
					result = true;
				}
			}
		}
	}

	fLock.Unlock();
	
	return result;
}


bool VRemoteDebuggerBreakpointsManager::AddBreakPoint( const XBOX::VString& inUrl, int inLineNumber )
{

	fLock.Lock();

	std::map< XBOX::VString, std::set< unsigned > >::iterator	itFile = fAllBreakPoints.find(inUrl);

	DebugMsg("WAKDebuggerBreakpoints::AddBreakPoint url='%S' line=%d\n",&inUrl,inLineNumber);
	if (itFile == fAllBreakPoints.end())
	{
		std::set< unsigned >	tmpLines;
		tmpLines.insert(inLineNumber);
		std::pair< std::map< XBOX::VString, std::set< unsigned > >::iterator, bool >	l_new =
				fAllBreakPoints.insert( std::pair< XBOX::VString, std::set< unsigned > >(inUrl, tmpLines) );
		xbox_assert(l_new.second);
		IncrementGlobalTimeStamp();
	}
	else
	{
		if ( !(*itFile).second.count(inLineNumber) )
		{
			(*itFile).second.insert(inLineNumber);
			IncrementGlobalTimeStamp();
		}
	}

	fLock.Unlock();
	return true;
}

void VRemoteDebuggerBreakpointsManager::GetSourceFromUrl(OpaqueDebuggerContext inContext, const XBOX::VString& inSourceUrl,XBOX::VectorOfVString& outSourceData)
{
	const VString	K_EMPTY_DATA("No source found");
	bool			isFound = false;

	outSourceData.clear();
	
	fLock.Lock();
	/* debug traces that lists, for all the ctxs, the sourceIDs URLs & firstCodeLine
	auto	itCtxs = fCtxs.cbegin();
	while (itCtxs != fCtxs.end())
	{
		DebugMsg("GetSourceFromUrl ctx=%lld\n", (unsigned long long)(*itCtxs).first);
		//std::map< uintptr_t, SourceDesc >::const_iterator	itSource = (*itCtxs).second.begin();
		auto itSource = (*itCtxs).second.cbegin();
		while (itSource != (*itCtxs).second.end())
		{
			VStringConvertBuffer bufferUrl((*itSource).second.fUrl, VTC_UTF_8);
			VStringConvertBuffer bufferSrc((*itSource).second.fData[0], VTC_UTF_8);
			DebugMsg(" .srcId=%lld URL='%s' %s\n", (unsigned long long)((*itSource).first), bufferUrl.GetCPointer(), bufferSrc.GetCPointer());
			itSource++;
		}
		itCtxs++;
	}*/

	std::map< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >::const_iterator	itCtx = fCtxs.find(inContext);

	if (itCtx != fCtxs.end())
	{
		std::map< uintptr_t, SourceDesc >::const_iterator	itSource = (*itCtx).second.begin();

		while (itSource != (*itCtx).second.end())
		{
			if ( (*itSource).second.fUrl == inSourceUrl )
			{
				outSourceData = (*itSource).second.fData;
				isFound = true;
				break;
			}
			itSource++;
		}
	}
	
	if (!isFound)
	{
		XBOX::VFilePath		filePath;

		if (fSolution != NULL)
			fSolution->BuildPathFromRelativePath( filePath, inSourceUrl, FPS_POSIX);
#if WITH_SANDBOXED_PROJECT
		else if (VRIAServerApplication::Get()->GetHandlesSandboxedProject())
		{
			VFolder sourcesFolder( fSourcesRoot, FPS_POSIX);
			filePath.FromRelativePath( sourcesFolder, inSourceUrl, FPS_POSIX);
		}
#endif

		VFile	file(filePath,"");
		if (file.Exists())
		{
			VString		tmpStr;
			VString		fileData;
			if (file.GetContentAsString(fileData,VTC_UTF_8) == VE_OK)
			{
				fileData.ConvertCarriageReturns(eCRM_NATIVE);
				if (!fileData.GetSubStrings(K_DEFAULT_LINE_SEPARATOR,outSourceData,true))
				{
					if (!fileData.GetSubStrings(K_ALTERNATIVE_LINE_SEPARATOR,outSourceData,true))
					{
						outSourceData = VectorOfVString(1,fileData);
					}
				}
				for(VectorOfVString::iterator iter = outSourceData.begin(); (iter != outSourceData.end()); )
				{
					tmpStr = *iter;
					if (tmpStr.GetJSONString(*iter) != VE_OK)
					{
						xbox_assert(false);
					}
					++iter;
				}
			}
		}
	}

	fLock.Unlock();

}
#if USE_V8_ENGINE
bool VRemoteDebuggerBreakpointsManager::GetRelativePosixPath(const XBOX::VString& inUrl, XBOX::VString& outRelativePosixPath)
{
	VURL			vurl(inUrl, true);
	VFilePath		absolutePath;
	vurl.GetFilePath(absolutePath);

	VString			posixAbsolutePath;
	absolutePath.GetPosixPath(posixAbsolutePath);

	if (!absolutePath.IsValid() || posixAbsolutePath == "/")
	{
		/*outRelativePosixPath = CVSTR("sourceId_");
		outRelativePosixPath.AppendULong8((uLONG8)inSourceId);
		outRelativePosixPath += ".js";*/
	}
	else
	{
		VSolution::GetPathRelativeToFolderPath(fSourcesRoot, posixAbsolutePath, outRelativePosixPath);
	}
	return true;
}
#endif
bool VRemoteDebuggerBreakpointsManager::GetData(OpaqueDebuggerContext inContext,intptr_t inSourceId, XBOX::VString& outSourceUrl, XBOX::VectorOfVString& outSourceData)
{
	const VString	K_EMPTY_DATA("No source found");
	bool			res = false;

	outSourceData.clear();
	
	fLock.Lock();

	std::map< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >::const_iterator	itCtx = fCtxs.find(inContext);

	if (itCtx != fCtxs.end())
	{
		std::map< uintptr_t, SourceDesc >::const_iterator	itSource = (*itCtx).second.find(inSourceId);

		if (itSource != (*itCtx).second.end())
		{
			std::map< XBOX::VString, std::set< unsigned > >::const_iterator	itFile = fAllBreakPoints.find( (*itSource).second.fUrl );
		
			if ( itFile != fAllBreakPoints.end() )
			{
				outSourceUrl = (*itSource).second.fUrl;
				outSourceData = (*itSource).second.fData;
				res = true;
			}
		}
	}
		
	fLock.Unlock();
	return res;
}


void VRemoteDebuggerBreakpointsManager::GetJSFileNamesFromDirectory(
			XBOX::VectorOfVString&	ioFileNameVector,
			VProjectItem*			inProjectItem)
{
	VString		relPath;
	VFilePath	itemPath;
	VString		itemPosixPath;

	inProjectItem->GetFilePath(itemPath);
	itemPath.GetPosixPath(itemPosixPath);

	VFilePath  solpath;
	VString solPosixPath;

	if (fSolution != NULL)
	{
		fSolution->GetSolutionFolderPath(solpath);
		solpath.GetPosixPath(solPosixPath);
	}
#if WITH_SANDBOXED_PROJECT
	else if (VRIAServerApplication::Get()->GetHandlesSandboxedProject())
	{
		solPosixPath = fSourcesRoot;
	}
#endif

	VSolution::GetPathRelativeToFolderPath(
		solPosixPath,
		itemPosixPath,
		relPath
#if VERSIONWIN
		,false
#endif
		);

	VectorOfProjectItems	items;
	VProjectItemTools::GetChildren( inProjectItem, items, false);
	for( VectorOfProjectItems::size_type idx = 0; idx < items.size(); idx++ )
	{
		VString	name;
		items[idx]->GetName(name);
		if (items[idx]->GetKind() == VProjectItem::eFOLDER)
		{
			// skip webFolder
			if (!items[idx]->HasTag(kWebFolderTag))
			{
				GetJSFileNamesFromDirectory(ioFileNameVector,items[idx]);
			}
		}
		else
		{
			if ( (items[idx]->GetKind() == VProjectItem::eFILE) && items[idx]->ConformsTo("com.netscape.javascript-source") )
			{
				VString		filename;
				items[idx]->GetName(filename,true);
				VString		relFilename(relPath);
				relFilename += filename; 
				ioFileNameVector.push_back(relFilename);
			}
		}
	}
}

void VRemoteDebuggerBreakpointsManager::GetAllJSFileNames(XBOX::VectorOfVString& outFileNameVector)
{
	VectorOfProjectItems	items;

	outFileNameVector.clear();

	if (fSolution != NULL)
	{
		VProjectItem*	solItem = fSolution->GetSolutionItem();
		VProjectItemTools::GetChildren( solItem, items, false);
		for( VectorOfProjectItems::size_type idx = 0; idx < items.size(); idx++ )
		{
			if (items[idx]->GetKind() == VProjectItem::ePROJECT)
			{
				VString		projName;
				VProject*	vProj = items[idx]->GetProjectOwner();

				if (vProj && vProj->GetName(projName))
				{
					// we don't show the js scripts of admin 
					if (projName != VString("ServerAdmin"))
					{
						GetJSFileNamesFromDirectory(outFileNameVector,items[idx]);
					}
				}
			}
		}
	}
#if WITH_SANDBOXED_PROJECT
	else if (VRIAServerApplication::Get()->GetHandlesSandboxedProject())
	{
		VectorOfApplication projects;
		VRIAServerApplication::Get()->RetainAllProjects( projects);
		for (VectorOfApplication_iter iter = projects.begin() ; iter != projects.end() ; ++iter)
		{
			VString name;
			(*iter)->GetName( name);
			if (name != L"ServerAdmin")
			{
				GetJSFileNamesFromDirectory( outFileNameVector, (*iter)->GetDesignProject()->GetProjectItem());
			}
		}
	}
#endif
}


void VRemoteDebuggerBreakpointsManager::Set(OpaqueDebuggerContext inContext,const XBOX::VString& inUrl, intptr_t inSourceId, const XBOX::VString& inData)
{
	VString			l_tmp("WAKDebuggerBreakpoints::Set url '");

	/*if (inUrl.Find("toto.js") > 0)
	{
		int a = 1;
	}*/
	VURL			vurl(inUrl,true);
	VFilePath		absolutePath;
	vurl.GetFilePath(absolutePath);

	bool					isFound;
	XBOX::VectorOfVString	sourceCode;
	VString					sourceCodeStr;
	VString					tmpStr;

	// can happen when inUrl sent by JSCOre is empty (e.g. js source in memory) -> but we nevertheless have created the ctx
	VString			posixAbsolutePath;
    absolutePath.GetPosixPath(posixAbsolutePath);
    
	VString			outRelativePosixPath;
	if (!absolutePath.IsValid() || posixAbsolutePath == "/")
	{
		outRelativePosixPath = CVSTR("sourceId_");
		outRelativePosixPath.AppendULong8((uLONG8)inSourceId);
		outRelativePosixPath+= ".js";
		sourceCodeStr = inData;
	}
	else
	{
		XBOX::VFile			sourceFile(vurl);
		sourceCodeStr = inData;	// sc/GH 26/02/2013		// sourceFile.GetContentAsString(sourceCodeStr,VTC_UTF_8);
		VSolution::GetPathRelativeToFolderPath( fSourcesRoot, posixAbsolutePath, outRelativePosixPath );
	}

#if defined(__GH_DEBUG__)
	if (outRelativePosixPath.Find(GH_DEBUG_TEST_FILENAME))
	{
		if (GH_DEBUG_SRCID == (intptr_t)(-1))
		{
			GH_DEBUG_SRCID = inSourceId;
			GH_DEBUG_CTX = inContext;
		}
	}
#endif

	sourceCodeStr.ConvertCarriageReturns(eCRM_NATIVE);
	if (!sourceCodeStr.GetSubStrings(K_DEFAULT_LINE_SEPARATOR,sourceCode,true))
	{
		if (!sourceCodeStr.GetSubStrings(K_ALTERNATIVE_LINE_SEPARATOR,sourceCode,true))
		{
			sourceCode = VectorOfVString(1,sourceCodeStr);
			//sourceCode = VectorOfVString(1,VString("No line separator detected in source CODE"));
		}
	}
	for(VectorOfVString::iterator iter = sourceCode.begin(); (iter != sourceCode.end()); )
	{
		tmpStr = *iter;
		if (tmpStr.GetJSONString(*iter) != VE_OK)
		{
			xbox_assert(false);
		}
		++iter;
	}

	fLock.Lock();

	std::map< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >::iterator	itCtx = fCtxs.find(inContext);

	if ( !testAssert(itCtx != fCtxs.end()) )
	{
		fLock.Unlock();
		return;

		std::map< uintptr_t, SourceDesc >	emptyMap;
		std::pair< std::map< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >::iterator, bool >	newCtx =
					fCtxs.insert( std::pair< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >(inContext, emptyMap) );

		std::map< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >::iterator	itCtx = fCtxs.find(inContext);

	}

	if ( testAssert(itCtx != fCtxs.end()) )
	{
		std::map< uintptr_t, SourceDesc >::iterator		itSource = (*itCtx).second.find(inSourceId);

		// if sourceID already exists
		if (itSource != (*itCtx).second.end())
		{
			VString		sourcePath = (*itSource).second.fUrl;
			// inUrl.length is NULL (no source exist) is OK
			if (inUrl.GetLength())
			{
				/*if (inUrl.Find("toto.js") > 0)
				{
					int a = 1;
				}*/
				// if the URL associated to this sourCEID is not the same
				if (sourcePath != outRelativePosixPath)
				{
					//remove it from map
					(*itCtx).second.erase(itSource);
					goto here;
				}
				else
				{
					//same sourceID & same URL: replace the source code
					(*itSource).second.fData = sourceCode;
				}
			}
		}
		else
		{
here:
			isFound = false;
			// if the URL exists (in another sourceID), remove it
			std::map< uintptr_t, SourceDesc >::iterator itSrc = (*itCtx).second.begin();
			while (itSrc != (*itCtx).second.end())
			{
				if ((*itSrc).second.fUrl == outRelativePosixPath)
				{
					(*itCtx).second.erase(itSrc);
					break;
				}
				itSrc++;
			}
			std::map< XBOX::VString, std::set< unsigned > >::iterator	itFile = fAllBreakPoints.find(outRelativePosixPath);

			if ( itFile != fAllBreakPoints.end() )
			{
				SourceDesc		l_new(sourceCode);
				l_new.fUrl = outRelativePosixPath;
				std::pair< std::map< uintptr_t, SourceDesc >::iterator, bool >	l_new_file =
					(*itCtx).second.insert( std::pair< uintptr_t, SourceDesc >(inSourceId, l_new) );
				xbox_assert(l_new_file.second);
			}
			else
			{

				std::set< unsigned >	emptyLines;
				std::pair< std::map< XBOX::VString, std::set< unsigned > >::iterator, bool >	l_new_brkpts =
					fAllBreakPoints.insert( std::pair< XBOX::VString, std::set< unsigned > >(outRelativePosixPath, emptyLines) );
			
				xbox_assert(l_new_brkpts.second);
				SourceDesc		l_new(sourceCode);
				l_new.fUrl = outRelativePosixPath;
				std::pair< std::map< uintptr_t, SourceDesc >::iterator, bool >	l_new_file =
					(*itCtx).second.insert( std::pair< uintptr_t,SourceDesc >(inSourceId, l_new) );
				xbox_assert(l_new_file.second);
			}

		}
	}
	fLock.Unlock();
}

void VRemoteDebuggerBreakpointsManager::Add(OpaqueDebuggerContext inContext)
{
	fLock.Lock();
	std::map< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >::iterator	itCtx = fCtxs.find(inContext);

	if ( testAssert(itCtx == fCtxs.end()) )
	{
		std::map< uintptr_t, SourceDesc >	emptyMap;
		std::pair< std::map< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >::iterator, bool >	newCtx =
				fCtxs.insert( std::pair< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >(inContext, emptyMap) );
	}
	fLock.Unlock();
}

void VRemoteDebuggerBreakpointsManager::Remove(OpaqueDebuggerContext inContext)
{
	fLock.Lock();

	std::map< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >::iterator	itCtx = fCtxs.find(inContext);

	if ( itCtx != fCtxs.end() )
	{
		std::map< uintptr_t, SourceDesc >::iterator	itSource = (*itCtx).second.begin();

		if (itSource != (*itCtx).second.end())
		{
			(*itCtx).second.erase(itSource);
		}
		/*while( itSource != (*itCtx).second.end() )
		{

			std::map< XBOX::VString, std::set< unsigned > >::iterator	itFile = fAllBreakPoints.find((*itSource).second.fUrl);

			testAssert( itFile != fAllBreakPoints.end()  );
			{
				if ( testAssert( (*itSource).second.fNbRef > 0) )
				{
					(*itSource).second.fNbRef--;
					if ( !(*itSource).second.fNbRef )
					{
						(*itCtx).second.erase( itSource );
					}
				}
			}
			itSource++;
		}*/
		fCtxs.erase(itCtx);
	}
	fLock.Unlock();
}
/*
void VRemoteDebuggerBreakpointsManager::Remove(OpaqueDebuggerContext inContext,intptr_t inSourceId)
{
	fLock.Lock();

	std::map< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >::iterator	itCtx = fCtxs.find(inContext);

	if ( testAssert(itCtx != fCtxs.end()) )
	{
		std::map< uintptr_t, SourceDesc >::iterator	itSource = (*itCtx).second.find(inSourceId);

		// some sources have no associated file (code in memory)
		if ( itSource != (*itCtx).second.end() )
		{

			std::map< XBOX::VString, std::set< unsigned > >::iterator	itFile = fAllBreakPoints.find((*itSource).second.fUrl);

			testAssert( itFile != fAllBreakPoints.end()  );
			{
				if ( testAssert( (*itSource).second.fNbRef > 0) )
				{
					(*itSource).second.fNbRef--;
					if ( !(*itSource).second.fNbRef )
					{
						(*itCtx).second.erase( itSource );
					}
				}
			}
		}
	}
	fLock.Unlock();
}
*/
bool VRemoteDebuggerBreakpointsManager::RemoveBreakPoint(OpaqueDebuggerContext inContext, const XBOX::VString& inUrl, intptr_t inSourceId, int inLineNumber )
{
	bool		l_res;
	l_res = false;
	
	fLock.Lock();

	std::map< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >::iterator	itCtx = fCtxs.find(inContext);

	if ( testAssert(itCtx != fCtxs.end()) )
	{
		std::map< uintptr_t, SourceDesc >::iterator		itSource = (*itCtx).second.find(inSourceId);

		if ( testAssert(itSource != (*itCtx).second.end()) )
		{

			std::map< XBOX::VString, std::set< unsigned > >::iterator	itFile = fAllBreakPoints.find( (*itSource).second.fUrl );

			if ( itFile != fAllBreakPoints.end() )
			{
			
				std::set< unsigned >::iterator		itLine = (*itFile).second.find(inLineNumber);
				if ( itLine != (*itFile).second.end() )
				{
					(*itFile).second.erase(itLine);
					IncrementGlobalTimeStamp();
					l_res = true;
				}
			}
		}
	}

	fLock.Unlock();
	return l_res;
}

bool VRemoteDebuggerBreakpointsManager::RemoveAllBreakPoints( const XBOX::VString& inUrl )
{
	fLock.Lock();
	
	std::map< XBOX::VString, std::set< unsigned > >::iterator	itFile = fAllBreakPoints.find(inUrl);
	
	if ( testAssert(itFile != fAllBreakPoints.end()) )
	{
		(*itFile).second.clear();
		IncrementGlobalTimeStamp();
	}

	fLock.Unlock();
	return true;
}


bool VRemoteDebuggerBreakpointsManager::RemoveBreakPoint( const XBOX::VString& inUrl, int inLineNumber )
{

	fLock.Lock();
	
	std::map< XBOX::VString, std::set< unsigned > >::iterator	itFile = fAllBreakPoints.find(inUrl);
	
	if ( testAssert(itFile != fAllBreakPoints.end()) )
	{
		//if ( testAssert( ((*itFile).second.fUrl) == inUrl ) )
		{
			std::set< unsigned >::iterator		itLine = (*itFile).second.find(inLineNumber);
			if (itLine != (*itFile).second.end())
			{
				(*itFile).second.erase(itLine);
				IncrementGlobalTimeStamp();
			}
			//break;
		}
		//++itFile;
	}

	fLock.Unlock();
	return true;
}


#if WITH_SANDBOXED_PROJECT

void VRemoteDebuggerBreakpointsManager::SetBreakpointsFolderPath( const XBOX::VFilePath& inPath)
{
	xbox_assert(VRIAServerApplication::Get()->GetHandlesSandboxedProject());
	fBreakpointsFolderPath = inPath;
}

#endif
