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
#include "VRIAServerConstants.h"


USING_TOOLBOX_NAMESPACE


const VString kServerLogSourceIdentifier( L"com.wakanda-software");

/*	Breakpoints are disabled when this variable is set into the JavaScript context
*/
const VString kJSPrivateVariableName_NoDebug( L"___Wakanda_Server_private_no_debug___");


const VString kAlternateProductVersion( L"Dev");


namespace JobCommonBagKeys
{
	CREATE_BAGKEY_NO_DEFAULT( solutionName, VString);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( isDefaultSolution, VBoolean, bool);
	CREATE_BAGKEY_NO_DEFAULT( openingMode, VString);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( jobResult, VLong, sLONG);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( error_code, VLong8, uLONG8);
	CREATE_BAGKEY_NO_DEFAULT( debuggerParam, VString);
	CREATE_BAGKEY_NO_DEFAULT( currentDebugger, VString);
	CREATE_BAGKEY_NO_DEFAULT( message, VString);
}
