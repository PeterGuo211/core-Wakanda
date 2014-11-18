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
#ifndef __VJSConsole__
#define __VJSConsole__



class VRIAServerProject;


class VJSConsole : public XBOX::VJSClass<VJSConsole, VRIAServerProject>
{
public:
	typedef XBOX::VJSClass<VJSConsole, VRIAServerProject> inherited;

	static	void			Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inApplication);
	static	void			Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inApplication);
	static	void			GetProperty( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			GetPropertyNames( XBOX::VJSParms_getPropertyNames& ioParms, VRIAServerProject* inApplication);
	static	void			GetDefinition( ClassDefinition& outDefinition);

	// Functions
	static	void			_log( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_debug( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_info( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_warn( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_error( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);

private:

	class VJSConsoleLogListener : public XBOX::VObject, public XBOX::ILogListener
	{
	public:
						VJSConsoleLogListener();
		virtual	void	Put( std::vector< const XBOX::VValueBag* >& inValuesVector );

		std::vector<const XBOX::VValueBag*>		fValues;

		XBOX::VCriticalSection					fLock;
	};

	static	VJSConsoleLogListener*			sJSConsoleLogListener;

	static	void			_LogParms( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication, const XBOX::ELog4jMessageLevel& inLevel);
};



#endif