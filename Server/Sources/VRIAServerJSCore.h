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
#ifndef __VRIAServerJSCore__
#define __VRIAServerJSCore__



class VRIAServerProject;



class VRIAServerJSCore: public XBOX::VJSClass<VRIAServerJSCore, VRIAServerProject>
{
public:

	typedef XBOX::VJSClass<VRIAServerJSCore, VRIAServerProject>	inherited;

	static	void			Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inApplication);
	static	void			Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inApplication);
	static	void			GetDefinition( ClassDefinition& outDefinition);

	// Functions
	static	void			_openSolution( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_getRecentSolution( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_setDebuggerServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_getDebuggerServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_isDebugging( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_stopDebugger( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_startDebugger( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_canSetDebuggerServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_setBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_updateBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_removeBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_getDebuggerStatus( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_getBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_getDebuggerConnection( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
};



#if WITH_SANDBOXED_PROJECT

class VJSServer : public XBOX::VJSClass<VJSServer, void>
{
public:

	typedef XBOX::VJSClass<VJSServer, void> inherited;

	static	void			GetDefinition( ClassDefinition& outDefinition);

	// Function
	static	void			_openProject( XBOX::VJSParms_callStaticFunction& ioParms, void*);
	static	void			_closeProject( XBOX::VJSParms_callStaticFunction& ioParms, void*);
};

#endif // WITH_SANDBOXED_PROJECT



#endif