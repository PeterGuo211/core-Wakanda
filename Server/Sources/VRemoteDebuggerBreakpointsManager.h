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

#ifndef __VRemoteDebuggerBreakpointsManager__
#define __VRemoteDebuggerBreakpointsManager__


#include "VSolution.h"
#include "VProjectItem.h"

class VSolution;

typedef void* OpaqueDebuggerContext;

// ----------------------------------------------------------------------------

class VRemoteDebuggerBreakpointsManager : public XBOX::VObject
{

public:
	class VFileBreakpoints : public XBOX::VObject {
	public:
		VFileBreakpoints(const XBOX::VString& inUrl = XBOX::VString("") ) : fUrl(inUrl) {;}
		~VFileBreakpoints() {;}
		VFileBreakpoints( const VFileBreakpoints& inFd ) { fUrl = inFd.fUrl; fBreakpoints = inFd.fBreakpoints; } 
		bool operator < (const VFileBreakpoints& inFd) const { return fUrl < inFd.fUrl; }
		XBOX::VString			fUrl;
		std::set< unsigned >	fBreakpoints;
	private:
	};
						VRemoteDebuggerBreakpointsManager(const XBOX::VString& inSourcesRoot);
	virtual				~VRemoteDebuggerBreakpointsManager();
	virtual	void		Set(OpaqueDebuggerContext inContext,const XBOX::VString& inUrl, intptr_t inSourceId, const XBOX::VString& inData);
	virtual	void		Add(OpaqueDebuggerContext inContext);
	virtual	void		Remove(OpaqueDebuggerContext inContext);
	virtual	bool		GetData(OpaqueDebuggerContext inContext,intptr_t inSourceId, XBOX::VString& outSourceUrl, XBOX::VectorOfVString& outSourceData);
#if USE_V8_ENGINE
	virtual bool		GetRelativePosixPath(const XBOX::VString& inUrl, XBOX::VString& outRelativePosixPath);
#endif
	virtual	bool		AddBreakPoint( OpaqueDebuggerContext inContext, const XBOX::VString& inUrl, intptr_t inSourceId, int inLineNumber );
	virtual	bool		AddBreakPoint( const XBOX::VString& inUrl, int inLineNumber );
	virtual	bool		RemoveBreakPoint( const XBOX::VString& inUrl, int inLineNumber );
	virtual	bool		RemoveAllBreakPoints( const XBOX::VString& inUrl );
	virtual	bool		RemoveBreakPoint( OpaqueDebuggerContext inContext, const XBOX::VString& inUrl, intptr_t inSourceId, int inLineNumber );
	virtual	bool		HasBreakpoint(OpaqueDebuggerContext inContext,intptr_t inSourceId, unsigned lineNumber);
	virtual void		GetTimeStamp(sLONG& outTimeStamp) { GetGlobalTimeStamp(outTimeStamp); }
	virtual void		Save();
	virtual void		GetBreakpoints( std::set< VFileBreakpoints > & outBrkpts );
	virtual void		SetSolution(VSolution* inSolution) {fSolution = inSolution;}
	virtual void		Load();
	virtual void		GetJSONBreakpoints(XBOX::VString& outJSONBreakPoints);
	virtual void		GetAllJSFileNames(XBOX::VectorOfVString& outFileNameVector);
	virtual	void		GetSourceFromUrl(OpaqueDebuggerContext inContext, const XBOX::VString& inSourceUrl,XBOX::VectorOfVString& outSourceData);
#if WITH_SANDBOXED_PROJECT
			void		SetBreakpointsFolderPath( const XBOX::VFilePath& inPath);
#endif

	static	void		GetGlobalTimeStamp(sLONG& outTimeStamp);
	static	void		IncrementGlobalTimeStamp();
private:
	class SourceDesc {
	public:
		SourceDesc(const XBOX::VectorOfVString& inData) { fData = inData; fNbRef = 1; }
		~SourceDesc() {;}
		XBOX::VectorOfVString	fData;
		XBOX::VString			fUrl;
		unsigned int			fNbRef;
	private:
		SourceDesc();
	};

			void	GetJSFileNamesFromDirectory(XBOX::VectorOfVString&	ioFileNameVector,
												VProjectItem*			inProjectItem);

			std::map< OpaqueDebuggerContext, std::map< uintptr_t, SourceDesc > >	fCtxs;
			VSolution*																fSolution;	
			XBOX::VString															fSourcesRoot;
			std::map< XBOX::VString, std::set< unsigned > >							fAllBreakPoints;
			XBOX::VCriticalSection													fLock;
		#if WITH_SANDBOXED_PROJECT
			XBOX::VFilePath															fBreakpointsFolderPath;
		#endif

	static	sLONG																sTimeStamp;
	static	XBOX::VCriticalSection												sTimeStampLock;
};



#endif