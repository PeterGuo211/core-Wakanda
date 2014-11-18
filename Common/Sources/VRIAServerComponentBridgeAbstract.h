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
#ifndef __RIAServerComponentBridgeAbstract__
#define __RIAServerComponentBridgeAbstract__


/* TODO:	Need to create one API header file for all the stuff in the ServerNet.
			Include the whole "headers" directory instead. */
#include "VRIAServerComponentBridgeTypes.h"

namespace xbox
{
	class VJSGlobalContext;
	class VWorkerPool;
	class VTCPSelectIOPool;
};


class IHTTPRequest;
class IHTTPResponse;
class CUAGSession;


class CRIAServerComponentBridge : public XBOX::CComponent
{
public:

			enum { Component_Type = 'rscb' };

	virtual XBOX::VError				Register() = 0;
	virtual XBOX::VError				UnRegister() = 0;

			/** @brief	Returns a reference on the solution which own the application */
	virtual	RIASolutionRef				GetSolutionRef( RIApplicationRef inApplicationRef) = 0;

			/** @brief	If inRequest contains some information about the HTTP session, the session storage object is updated according to this session.
						In all other case, an empty session storage object is set. */
	virtual	XBOX::VJSGlobalContext*		RetainJSContext( RIApplicationRef inApplicationRef, XBOX::VError& outError, bool inReusable, const IHTTPRequest* inRequest) = 0;
			/** @brief	If inResponse is not NULL, we check for session storage object changes, serialize it and update the cookie if needed. */
	virtual	XBOX::VError				ReleaseJSContext( RIApplicationRef inApplicationRef, XBOX::VJSGlobalContext* inContext, IHTTPResponse* inResponse) = 0;
			
			/** @brief	Call garbage collect for all the JavaScript contexts of the current solution */
	virtual	XBOX::VError				JS4DGarbageCollect() = 0;

			// UAG session utilities
	virtual	CUAGSession*				RetainUAGSession(const XBOX::VJSGlobalContext* inContext) = 0;
			/** @brief	The UAG session is retained. Pass NULL to remove the uag session */
	virtual	XBOX::VError				SetUAGSession(const XBOX::VJSGlobalContext* inContext, CUAGSession *inUAGSession) = 0;

	virtual XBOX::VWorkerPool*			GetSharedWorkerPool ( ) = 0;
	virtual void						StopSharedWorkerPool ( ) = 0;

	virtual XBOX::VTCPSelectIOPool*		GetSharedSelectIOPool ( ) = 0;
	virtual void						StopSharedSelectIOPool ( ) = 0;

	virtual XBOX::VLocalizationManager*	RetainLocalizationManager() = 0;

	virtual XBOX::VFolder*				RetainWaLibFolder() = 0;
};



#endif

