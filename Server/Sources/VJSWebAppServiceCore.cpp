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
#include "VRIAServerProject.h"
#include "VJSWebAppServiceCore.h"


USING_TOOLBOX_NAMESPACE


void VJSWebAppServiceCore::Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject *inApplication)
{
	inApplication->Retain();
}


void VJSWebAppServiceCore::Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject *inApplication)
{
	inApplication->Release();
}


void VJSWebAppServiceCore::GetDefinition( ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "setEnabled", js_callStaticFunction<_setEnabled>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ "setDirectoryIndex", js_callStaticFunction<_setDirectoryIndex>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ "setDocumentRootFolder", js_callStaticFunction<_setDocumentRootFolder>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	static inherited::StaticValue values[] =
	{
		{ "enabled", js_getProperty<_getEnabled>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0,0}
	};

	outDefinition.className = "WebAppServiceCore";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticFunctions = functions;
	outDefinition.staticValues = values;
}


void VJSWebAppServiceCore::_setEnabled( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject *inApplication)
{
	bool enabled = false;
	if (ioParms.GetBoolParam( 1, &enabled))
	{
		VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);

		IHTTPServerProject *serverProject = inApplication->RetainHTTPServerProject( riaContext);
		if (serverProject != NULL)
		{
			serverProject->EnableStaticPagesService( enabled);
		}
		ReleaseRefCountable( &serverProject);
	}
}


void VJSWebAppServiceCore::_setDirectoryIndex( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject *inApplication)
{
	VString directoryIndex;
	if (ioParms.GetStringParam( 1, directoryIndex))
	{
		VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
		
		IHTTPServerProject *serverProject = inApplication->RetainHTTPServerProject( riaContext);
		if (serverProject != NULL)
		{
			IHTTPServerProjectSettings *settings = serverProject->GetSettings();
			if (settings != NULL)
			{
				settings->SetIndexPageName( directoryIndex);
			}
		}
		ReleaseRefCountable( &serverProject);
	}
}


void VJSWebAppServiceCore::_setDocumentRootFolder( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject *inApplication)
{
	VFolder *rootFolder = ioParms.RetainFolderParam( 1);
	if (rootFolder != NULL)
	{
		VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
		
		IHTTPServerProject *serverProject = inApplication->RetainHTTPServerProject( riaContext);
		if (serverProject != NULL)
		{
			IHTTPServerProjectSettings *settings = serverProject->GetSettings();
			if (settings != NULL)
			{
				VFilePath path;
				rootFolder->GetPath( path);
				settings->SetWebFolderPath( path);
			}
		}
		ReleaseRefCountable( &serverProject);
	}
	ReleaseRefCountable( &rootFolder);
}


void VJSWebAppServiceCore::_getEnabled( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject *inApplication)
{
	bool enabled = false;
	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);

	IHTTPServerProject *serverProject = inApplication->RetainHTTPServerProject( riaContext);
	if (serverProject != NULL)
	{
		enabled = serverProject->GetEnableStaticPagesService();
	}
	ReleaseRefCountable( &serverProject);

	ioParms.ReturnBool( enabled);
}
