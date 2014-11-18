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
#ifndef __VRIAJSDEBUGGERSETTINGS__
#define __VRIAJSDEBUGGERSETTINGS__

#include "JSDebugger/Interfaces/CJSWDebuggerFactory.h"


class VRIAServerSolution;
class VRIAServerProject;
class VRemoteDebuggerBreakpointsManager;
class CUAGDirectory;

class VJSDebuggerSettings :
	public XBOX::VObject,
	public IWAKDebuggerSettings
{
	public :

		VJSDebuggerSettings ( VRIAServerSolution* inServerSolution, VRemoteDebuggerBreakpointsManager* inBreakPointsManager  );
	#if WITH_SANDBOXED_PROJECT
		VJSDebuggerSettings( VRIAServerProject* inProject, VRemoteDebuggerBreakpointsManager* inBreakPointsManager);
	#endif
		virtual ~VJSDebuggerSettings ( );

		XBOX::VError Init ( );

		virtual bool NeedsAuthentication ( ) const;
		virtual bool UserCanDebug ( const UniChar* inUserName, const UniChar* inUserPassword ) const;
		virtual bool UserCanDebug(IAuthenticationInfos* inAuthenticationInfos) const;
		virtual bool HasDebuggerUsers ( ) const;

		virtual bool AddBreakPoint( OpaqueDebuggerContext inContext, const XBOX::VString& inUrl, intptr_t inSrcId, int inLineNumber );
		virtual bool AddBreakPoint( const XBOX::VString& inUrl, int inLineNumber );
		virtual bool RemoveBreakPoint( OpaqueDebuggerContext inContext, const XBOX::VString& inUrl, intptr_t inSrcId, int inLineNumber );
		virtual bool RemoveBreakPoint( const XBOX::VString& inUrl, int inLineNumber );
		virtual void Set(OpaqueDebuggerContext inContext,const XBOX::VString& inUrl, intptr_t inSrcId, const XBOX::VString& inData);
		virtual void Add(OpaqueDebuggerContext inContext);
		virtual void Remove(OpaqueDebuggerContext inContext);
		virtual bool HasBreakpoint(OpaqueDebuggerContext	inContext, intptr_t inSrcId, unsigned lineNumber);
		virtual bool GetData(OpaqueDebuggerContext inContext,intptr_t inSrcId, XBOX::VString& outSourceUrl, XBOX::VectorOfVString& outSourceData);
#if USE_V8_ENGINE
		virtual bool GetRelativePosixPath(const XBOX::VString& inUrl, XBOX::VString& outRelativePosixPath);
#endif
		virtual void GetJSONBreakpoints(XBOX::VString& outJSONBreakPoints);
		virtual void GetAllJSFileNames(XBOX::VectorOfVString& outFileNameVector);
		virtual	void GetSourceFromUrl(OpaqueDebuggerContext inContext, const XBOX::VString& inSourceUrl,XBOX::VectorOfVString& outSourceData);

	private :
				CUAGDirectory* _RetainUAGDirectory() const;

		VRIAServerSolution*					fServerSolution;
	#if WITH_SANDBOXED_PROJECT
		VRIAServerProject					*fProject;
	#endif
		// UUIDs of groups that can access JS debugger functionlaity
		std::vector<XBOX::VUUID>			fDebuggerGroups;
		bool								fNeedsAuthentication; // true by default
		VRemoteDebuggerBreakpointsManager*	fWAKBreakPointsManager;
		VJSDebuggerSettings ( );
};

#endif
