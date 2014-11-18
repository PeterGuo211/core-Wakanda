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
#include "VDataService.h"
#include "VRIAServerJSContextMgr.h"
#include "VJSDataServiceCore.h"


USING_TOOLBOX_NAMESPACE



void VJSDataServiceCore::Initialize( const VJSParms_initialize& inParms, VDataService *inService)
{
	inService->Retain();
}


void VJSDataServiceCore::Finalize( const VJSParms_finalize& inParms, VDataService *inService)
{
	inService->Release();
}


void VJSDataServiceCore::GetDefinition( ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "setEnabled", js_callStaticFunction<_setEnabled>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	static inherited::StaticValue values[] =
	{
		{ "enabled", js_getProperty<_getEnabled>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0,0}
	};

	outDefinition.className = "DataServiceCore";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticFunctions = functions;
	outDefinition.staticValues = values;
}


void VJSDataServiceCore::_setEnabled( VJSParms_callStaticFunction& ioParms, VDataService *inService)
{
	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inService->GetApplication());

	bool enabled = false;
	if (ioParms.GetBoolParam( 1, &enabled))
	{
		inService->SetEnabled( enabled);
	}
}


void VJSDataServiceCore::_getEnabled( VJSParms_getProperty& ioParms, VDataService *inService)
{
	ioParms.ReturnBool( inService->IsEnabled());
}
