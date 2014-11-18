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
#ifndef __RIAServerHeaders__
#define __RIAServerHeaders__


// xtoolbox frameworks
#include "KernelIPC/VKernelIPC.h"
#include "XML/VXML.h"
#include "ServerNet/VServerNet.h"
#include "JavaScript/VJavaScript.h"
#include "Graphics/VGraphics.h"
#if USE_V8_ENGINE
#include "JSDebugger/Interfaces/CJSWDebuggerFactory.h"
#else
#include <../../JavaScriptCore/4D/4DDebuggerServer.h> // required for WAKDebuggerType_t kind
#endif

#if VERSIONMAC
#define USE_HELPER_TOOLS	1 // On MacOS X only
#else
#define USE_HELPER_TOOLS	0
#endif


#define WITH_SANDBOXED_PROJECT		0



#include "VRIAUTIs.h"
#include "VRIASettingsKeys.h"
#include "VRIAServerConstants.h"
#include "VRIAServerTypes.h"

#endif
