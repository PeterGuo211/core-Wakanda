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
#ifndef __VJSSolution__
#define __VJSSolution__



class VJSSolution: public XBOX::VJSClass<VJSSolution, VRIAServerSolution>
{
public:

	typedef XBOX::VJSClass<VJSSolution, VRIAServerSolution>	inherited;

	static	void			Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerSolution* inSolution);
	static	void			Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerSolution* inSolution);
	static	void			GetDefinition( ClassDefinition& outDefinition);

	// Functions
	static	void			_getApplicationByName( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution);
	static	void			_getFolder( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution);
	static	void			_getWalibFolder( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution);
	static	void			_close( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution);
	static	void			_getSettingFile( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution);
	static	void			_quitServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution);
	static	void			_getDebuggerPort( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution);
	static	void			_getItemsWithRole( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution);

	// Properties getters
	static	void			_getName( XBOX::VJSParms_getProperty& ioParms, VRIAServerSolution* inSolution);
	static	void			_getApplications( XBOX::VJSParms_getProperty& ioParms, VRIAServerSolution* inSolution);
};



#endif