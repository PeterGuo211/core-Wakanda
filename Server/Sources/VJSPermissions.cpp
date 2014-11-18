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
#include "VRIAPermissions.h"
#include "JavaScript/Sources/VJSJSON.h"
#include "VJSPermissions.h"



USING_TOOLBOX_NAMESPACE



void VJSPermissions::Initialize( const VJSParms_initialize& inParms, VRIAPermissions* inPermissions)
{
	if (inPermissions != NULL)
		inPermissions->Retain();
}


void VJSPermissions::Finalize( const VJSParms_finalize& inParms, VRIAPermissions* inPermissions)
{
	if (inPermissions != NULL)
		inPermissions->Release();
}


void VJSPermissions::GetDefinition( ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "findResourcePermission", js_callStaticFunction<_findResourcePermission>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};
	
	outDefinition.className = "Permissions";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticFunctions = functions;
}


void VJSPermissions::_findResourcePermission( VJSParms_callStaticFunction& ioParms, VRIAPermissions* inPermissions)
{
	bool done = false;
	VString type, resource, action;

	if (ioParms.GetStringParam( 1, type) && ioParms.GetStringParam( 2, resource) && ioParms.GetStringParam( 3, action))
	{
		const VValueBag *bag = inPermissions->RetainResourcePermission( type, resource, action);
		if (bag != NULL)
		{
			VString jsonString;

			if (bag->GetJSONString( jsonString, JSON_Default) == VE_OK)
			{
				VJSContext	vjsContext(ioParms.GetContext());
				VJSJSON		xjson(vjsContext);

				done = true;
				VJSValue	retVal(vjsContext);
				xjson.Parse(retVal, jsonString);
				ioParms.ReturnValue(retVal);
			}
			bag->Release();
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}
