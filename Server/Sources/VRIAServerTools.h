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
#ifndef __RIAServerTools__
#define __RIAServerTools__


class IHTTPResponse;


XBOX::VError SetHTTPResponseString( IHTTPResponse* inResponse, const XBOX::VString& inString, const XBOX::VString* inContentType = NULL);

XBOX::VError ThrowError( XBOX::VError inError);

/**	@brief	Error formatting function */
XBOX::VError ThrowError( XBOX::VError inError, const XBOX::VValueBag& inParameters); 

/**	@brief	Error formatting function
				ex:	have an error string "Cannot open project '{p1}' from solution '{p2}'."
					call ThrowError( theError, &CVSTR("store"), &CVSTR("webSite"), NULL)
					result: "Cannot open project 'store' from solution 'webSite'."
*/
XBOX::VError ThrowError( XBOX::VError inError, const XBOX::VString *inParam, ...);

XBOX::VErrorBase* CreateErrorBase( XBOX::VError inError, const XBOX::VValueBag& inParameters);

XBOX::VErrorBase* CreateErrorBase( XBOX::VError inError, const XBOX::VString *inParam, ...);

void fputs_VString( const XBOX::VString& inMessage, FILE *inFile);

sLONG8 ComputeFolderSize( const XBOX::VFolder *inFolder);

bool FolderContentWasChangedSinceDate( const XBOX::VFolder *inFolder, const XBOX::VTime& inDate);


// Logging utilities
void LogBag( const XBOX::VValueBag *inMessage);
void LogMessage( const XBOX::VString& inSourceIdentifier, XBOX::EMessageLevel inLevel, const XBOX::VString& inMessage);
void LogWorkersInformations( const XBOX::VString& inLoggerID, const std::vector<JSWorkerInfo>& inWorkersInfos);


// debugger parameter utilities
bool IsValidDebuggerParam( const XBOX::VString& inParameter);
bool IsValidDebuggerType( WAKDebuggerType_t inType);
WAKDebuggerType_t DebuggerParamToDebuggerType( const XBOX::VString& inParameter);
XBOX::VString DebuggerTypeToDebuggerParam( WAKDebuggerType_t inType);




class StTaskPropertiesSetter : public XBOX::VObject
{
public:
			// Override the properties bag of the current task with inProperties
			StTaskPropertiesSetter( const XBOX::VValueBag* inProperties);
			// Override the properties bag of the current task with the source log identifier attribute
			StTaskPropertiesSetter( const XBOX::VString* inLogSourceIdentifier, const XBOX::VString* inJobID = NULL);
			// Restore the previous properties of the current task
	virtual	~StTaskPropertiesSetter();

#if VERSIONDEBUG
	static	void					_Test();
#endif

private:
			StTaskPropertiesSetter()													{ assert(false); }
			StTaskPropertiesSetter( const StTaskPropertiesSetter& inSource)				{ assert(false); }
			StTaskPropertiesSetter& operator=( const StTaskPropertiesSetter& inSource)	{ assert(false); return *this; }

			void					_OverrideTaskProperties( const XBOX::VValueBag* inProperties);

			const XBOX::VValueBag	*fPreviousProperties;
};



#endif