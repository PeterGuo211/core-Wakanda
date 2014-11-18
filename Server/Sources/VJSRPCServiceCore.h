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
#ifndef __VJSRPCServiceCore__
#define __VJSRPCServiceCore__



class VRPCService;



class VJSRPCServiceCore : public XBOX::VJSClass<VJSRPCServiceCore, VRPCService>
{
public:
	typedef XBOX::VJSClass<VJSRPCServiceCore, VRPCService>	inherited;

	static	void			Initialize( const XBOX::VJSParms_initialize& inParms, VRPCService *inService);
	static	void			Finalize( const XBOX::VJSParms_finalize& inParms, VRPCService *inService);
	static	void			GetDefinition( ClassDefinition& outDefinition);

	// Functions
	static	void			_setPatternForProxy( XBOX::VJSParms_callStaticFunction& ioParms, VRPCService *inService);
	static	void			_setPublishGlobalNamespace( XBOX::VJSParms_callStaticFunction& ioParms, VRPCService *inService);
	static	void			_setEnabled( XBOX::VJSParms_callStaticFunction& ioParms, VRPCService *inService);

	// Properties getters
	static	void			_getEnabled( XBOX::VJSParms_getProperty& ioParms, VRPCService *inService);
};



#endif