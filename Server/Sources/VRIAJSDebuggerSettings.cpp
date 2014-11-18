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
#include "VRIAJSDebuggerSettings.h"
#include "VSolution.h"
#include "VRIAServerSolution.h"
#include "VRemoteDebuggerBreakpointsManager.h"
#include "VRIAServerProject.h"
#include "VProjectItem.h"
#include "VRIAServerTools.h"
#include "UsersAndGroups/Sources/UsersAndGroups.h"
#include "VRIAServerApplication.h"


USING_TOOLBOX_NAMESPACE
using namespace std;


VJSDebuggerSettings::VJSDebuggerSettings( VRIAServerSolution* inServerSolution, VRemoteDebuggerBreakpointsManager* inBreakPointsManager  )
{
	fNeedsAuthentication = true;
	fServerSolution = inServerSolution;
	fWAKBreakPointsManager = inBreakPointsManager;
	if ( fServerSolution != 0 )
		fServerSolution-> Retain ( );
#if WITH_SANDBOXED_PROJECT
	fProject = NULL;
#endif
}


#if WITH_SANDBOXED_PROJECT
VJSDebuggerSettings::VJSDebuggerSettings( VRIAServerProject* inProject, VRemoteDebuggerBreakpointsManager* inBreakPointsManager)
{
	xbox_assert(VRIAServerApplication::Get()->GetHandlesSandboxedProject());
	fNeedsAuthentication = true;
	fServerSolution = NULL;
	fProject = RetainRefCountable( inProject);
	fWAKBreakPointsManager = inBreakPointsManager;
}
#endif


VJSDebuggerSettings::~VJSDebuggerSettings ( )
{
	if ( fServerSolution != 0 )
		fServerSolution-> Release ( );

#if WITH_SANDBOXED_PROJECT
	ReleaseRefCountable( &fProject);
#endif
}


bool VJSDebuggerSettings::AddBreakPoint( OpaqueDebuggerContext inContext, const XBOX::VString& inUrl, intptr_t inSrcId, int inLineNumber )
{
	return fWAKBreakPointsManager->AddBreakPoint(inContext,inUrl,inSrcId,inLineNumber);
}
bool VJSDebuggerSettings::AddBreakPoint( const XBOX::VString& inUrl, int inLineNumber )
{
	return fWAKBreakPointsManager->AddBreakPoint(inUrl,inLineNumber);
}
bool VJSDebuggerSettings::RemoveBreakPoint(OpaqueDebuggerContext inContext, const XBOX::VString& inUrl, intptr_t inSrcId, int inLineNumber )
{
	return fWAKBreakPointsManager->RemoveBreakPoint(inContext,inUrl,inSrcId,inLineNumber);
}
bool VJSDebuggerSettings::RemoveBreakPoint( const XBOX::VString& inUrl, int inLineNumber )
{
	return fWAKBreakPointsManager->RemoveBreakPoint(inUrl,inLineNumber);
}
void VJSDebuggerSettings::Set(OpaqueDebuggerContext inContext,const XBOX::VString& inUrl, intptr_t inSrcId, const XBOX::VString& inData)
{
	fWAKBreakPointsManager->Set(inContext,inUrl,inSrcId,inData);
}
void VJSDebuggerSettings::Add(OpaqueDebuggerContext inContext)
{
	fWAKBreakPointsManager->Add(inContext);
}
void VJSDebuggerSettings::Remove(OpaqueDebuggerContext inContext)
{
	fWAKBreakPointsManager->Remove(inContext);
}
bool VJSDebuggerSettings::HasBreakpoint(OpaqueDebuggerContext inContext,intptr_t inSrcId, unsigned lineNumber)
{
	return fWAKBreakPointsManager->HasBreakpoint(inContext,inSrcId,lineNumber);
}
bool VJSDebuggerSettings::GetData(OpaqueDebuggerContext inContext,intptr_t inSrcId, XBOX::VString& outSourceUrl, XBOX::VectorOfVString& outSourceData)
{
	return fWAKBreakPointsManager->GetData(inContext,inSrcId,outSourceUrl,outSourceData);
}
#if USE_V8_ENGINE
bool VJSDebuggerSettings::GetRelativePosixPath(const XBOX::VString& inUrl, XBOX::VString& outRelativeUrl)
{
	return fWAKBreakPointsManager->GetRelativePosixPath(inUrl, outRelativeUrl);
}
#endif
void VJSDebuggerSettings::GetJSONBreakpoints(XBOX::VString& outJSONBreakPoints)
{
	fWAKBreakPointsManager->GetJSONBreakpoints(outJSONBreakPoints);
}

void VJSDebuggerSettings::GetAllJSFileNames(XBOX::VectorOfVString& outFileNameVector)
{
	fWAKBreakPointsManager->GetAllJSFileNames(outFileNameVector);
}
void VJSDebuggerSettings::GetSourceFromUrl(OpaqueDebuggerContext inContext, const XBOX::VString& inSourceUrl,XBOX::VectorOfVString& outSourceData)
{
	fWAKBreakPointsManager->GetSourceFromUrl(inContext,inSourceUrl,outSourceData);
}

VError VJSDebuggerSettings::Init ( )
{
#if WITH_SANDBOXED_PROJECT
	if (VRIAServerApplication::Get()->GetHandlesSandboxedProject())
	{
		return (fProject != NULL) ? VE_OK : VE_UNKNOWN_ERROR;
	}
#endif

	if ( fServerSolution == 0 )
		return vThrowError ( VE_RIA_INVALID_DESIGN_SOLUTION );

	VSolution*					vSolution = fServerSolution-> GetDesignSolution ( );
	if ( vSolution == NULL )
		return vThrowError ( VE_RIA_INVALID_DESIGN_SOLUTION );

	VProjectItem*				pitemDirectory = vSolution-> GetProjectItemFromTag ( kUAGDirectoryTag );
	VProjectItem*				pitemPerms = vSolution-> GetProjectItemFromTag ( kPermissionsTag );

	fNeedsAuthentication = ( pitemDirectory != NULL && pitemPerms != NULL ); // If no user directory then no access rights defined

	return VE_OK;
}

bool VJSDebuggerSettings::UserCanDebug(IAuthenticationInfos* inAuthenticationInfos) const
{
	bool			canDebug = false;
	CUAGSession*	uagSession;

	uagSession = RetainRefCountable(inAuthenticationInfos->GetUAGSession());
	
	if (!uagSession)
	{
		CUAGDirectory*	uagDirectory = _RetainUAGDirectory();
		
		if (!uagDirectory)
		{
			// No directory defined at all so access is not protected
			canDebug = true;
		}
		else
		{
			VError			vError = VE_OK;

			uagSession = uagDirectory->MakeDefaultSession(&vError);
			xbox_assert( vError == VE_OK );
			inAuthenticationInfos->SetUAGSession(uagSession);
			//inAuthenticationInfos->UAGSessionHasChanged();
		}
		ReleaseRefCountable( &uagDirectory );
	}

	if (!canDebug && uagSession)
	{
		CUAGDirectory*		uagDir = uagSession->GetDirectory();
		XBOX::VUUID			uuid;
		if (!uagDir->GetSpecialGroupID(CUAGDirectory::AdminGroup, uuid))
		{
			xbox_assert(false);
		}
		else
		{
			if (uagSession->BelongsTo(uuid, nil))
			{
				canDebug = true;
			}
		}
	}
	ReleaseRefCountable(&uagSession);
	return canDebug;
}

bool VJSDebuggerSettings::UserCanDebug ( const UniChar* inUserName, const UniChar* inUserPassword ) const
{
#if WITH_SANDBOXED_PROJECT
	if (VRIAServerApplication::Get()->GetHandlesSandboxedProject() ? (fProject == NULL) : (fServerSolution == NULL))
#else
	if ( fServerSolution == 0 )
#endif
	{
		xbox_assert ( false );

		return false; // Something went really wrong
	}

	if ( !NeedsAuthentication ( ) )
		return true;

	CUAGDirectory*	uagDirectory = _RetainUAGDirectory();
		
	if ( uagDirectory == 0 )
		return true; // No directory defined at all so access is not protected

	VString								vstrUserName ( inUserName );
	VString								vstrUserPassword ( inUserPassword );

	bool								bCanDebug = false;
	VError								vError = VE_OK;
	CUAGSession*						cSession = NULL;

	if ((uagDirectory != NULL) && uagDirectory->HasLoginListener())
	{
		// sc 22/06/2012, custom JavaScript authentication support
		VRIAServerProject *app = NULL;

	#if WITH_SANDBOXED_PROJECT
		if (VRIAServerApplication::Get()->GetHandlesSandboxedProject())
		{
			app = fProject;
		}
		else
	#endif
		{
			VectorOfApplication applications;
			fServerSolution->GetApplications( applications);
			app = (!applications.empty()) ? applications.front() : NULL;
		}

		if (app != NULL)
		{
			VJSGlobalContext *globalContext = app->RetainJSContext( vError, true, NULL);
			if (vError == VE_OK)
			{
				if (testAssert(globalContext != NULL))
				{
					VJSContext jsContext( globalContext);
					cSession = uagDirectory-> OpenSession ( inUserName, inUserPassword, &vError, &jsContext );
				}
				else
				{
					vError = VE_UNKNOWN_ERROR;
				}
			}
			app->ReleaseJSContext( globalContext, NULL);
		}
	}
	else
	{
		cSession = uagDirectory-> OpenSession ( inUserName, inUserPassword, &vError, NULL );
	}
	
	if ( cSession != 0 && vError  == VE_OK )
	{
		VUUID			vuuidAdminGroup;
		bool			bOK = uagDirectory-> GetSpecialGroupID ( CUAGDirectory::AdminGroup, vuuidAdminGroup );
		xbox_assert ( bOK );
		if ( cSession-> BelongsTo ( vuuidAdminGroup, nil ) )
			bCanDebug = true;
	}

	ReleaseRefCountable ( &cSession );
	ReleaseRefCountable ( &uagDirectory );
	
	return bCanDebug;
}

bool VJSDebuggerSettings::NeedsAuthentication ( ) const
{
#if WITH_SANDBOXED_PROJECT
	xbox_assert(VRIAServerApplication::Get()->GetHandlesSandboxedProject() ? (fProject != NULL) : (fServerSolution != NULL));
#else
	xbox_assert ( fServerSolution != 0 );
#endif

	if ( !fNeedsAuthentication )
		return false;

	bool								bResult = true;

	CUAGDirectory*						uagDirectory = _RetainUAGDirectory();
	xbox_assert ( uagDirectory != 0 );
	if ( uagDirectory == 0 )
		return fNeedsAuthentication;
	else
	{
		// Let's verify the special case when the default session can debug
		VError							vError = VE_OK;
		CUAGSession*					cSession = uagDirectory-> MakeDefaultSession ( &vError );
		xbox_assert ( vError == VE_OK );
		VUUID							vuuidAdminGroup;
		bool							bOK = uagDirectory-> GetSpecialGroupID ( CUAGDirectory::AdminGroup, vuuidAdminGroup );
		xbox_assert ( bOK );
		if ( cSession-> BelongsTo ( vuuidAdminGroup, nil ) )
			bResult = false;

		ReleaseRefCountable ( &cSession );
	}

	ReleaseRefCountable ( &uagDirectory );

	return bResult;
}

bool VJSDebuggerSettings::HasDebuggerUsers ( ) const
{
	bool								bResult = false;

	CUAGDirectory*						uagDirectory = _RetainUAGDirectory();
	xbox_assert ( uagDirectory != 0 );
	if ( uagDirectory == 0 )
		return false;

	VError								vError = VE_OK;
	CUAGGroup*							groupDebuggers = uagDirectory-> RetainSpecialGroup ( CUAGDirectory::AdminGroup, &vError );
	xbox_assert ( vError == VE_OK );
	if ( vError == VE_OK && groupDebuggers != 0 )
	{
		CUAGUserVector					vctrUsers;
		groupDebuggers-> RetainUsers ( vctrUsers, false );
		bResult = ( vctrUsers. size ( ) > 0 );
	}

	ReleaseRefCountable ( &groupDebuggers );
	ReleaseRefCountable ( &uagDirectory );

	return bResult;
}


CUAGDirectory* VJSDebuggerSettings::_RetainUAGDirectory() const
{
	if (fServerSolution != NULL)
		return fServerSolution->RetainUAGDirectory();
#if WITH_SANDBOXED_PROJECT
	else if (VRIAServerApplication::Get()->GetHandlesSandboxedProject() && (fProject != NULL))
		return fProject->RetainUAGDirectory( NULL);
#endif

	xbox_assert(false);
	return NULL;
}