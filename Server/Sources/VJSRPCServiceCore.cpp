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
#include "VRPCService.h"
#include "VRIAServerJSContextMgr.h"
#include "VJSRPCServiceCore.h"



USING_TOOLBOX_NAMESPACE



void VJSRPCServiceCore::Initialize( const VJSParms_initialize& inParms, VRPCService *inService)
{
	inService->Retain();
}


void VJSRPCServiceCore::Finalize( const VJSParms_finalize& inParms, VRPCService *inService)
{
	inService->Release();
}


void VJSRPCServiceCore::GetDefinition( ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "setPatternForProxy", js_callStaticFunction<_setPatternForProxy>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ "setPublishInGlobalNamespace", js_callStaticFunction<_setPublishGlobalNamespace>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ "setEnabled", js_callStaticFunction<_setEnabled>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	static inherited::StaticValue values[] =
	{
		{ "enabled", js_getProperty<_getEnabled>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0, 0}
	};

	outDefinition.className = "RPCServiceCore";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticFunctions = functions;
	outDefinition.staticValues = values;
}


void VJSRPCServiceCore::_setPatternForProxy( XBOX::VJSParms_callStaticFunction& ioParms, VRPCService *inService)
{
	VString pattern;
	if (ioParms.GetStringParam( 1, pattern))
	{
		inService->SetPatternForProxy( pattern);
	}
}


void VJSRPCServiceCore::_setPublishGlobalNamespace( XBOX::VJSParms_callStaticFunction& ioParms, VRPCService *inService)
{
	bool publishGlobalNamespace = false;
	if (ioParms.GetBoolParam( 1, &publishGlobalNamespace))
	{
		inService->SetPublishInClientGlobalNamespace( publishGlobalNamespace);
	}
}


void VJSRPCServiceCore::_setEnabled( VJSParms_callStaticFunction& ioParms, VRPCService *inService)
{
	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inService->GetApplication());

	bool enabled = false;
	if (ioParms.GetBoolParam( 1, &enabled))
	{
		inService->SetEnabled( enabled);
	}
}


void VJSRPCServiceCore::_getEnabled( VJSParms_getProperty& ioParms, VRPCService *inService)
{
	ioParms.ReturnBool( inService->IsEnabled());
}