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
#ifndef __RIAServer_Sessions__
#define __RIAServer_Sessions__



extern const XBOX::VString kHTTP_SESSION_COOKIE_NAME;
const sLONG kDEFAULT_LIFE_TIME = 43200; // 12 hours in seconds

class IHTTPRequest;
class IHTTPResponse;
class CUAGSession;


// ----------------------------------------------------------------------------



// ----------------------------------------------------------------------------



class VRIAHTTPSessionManager : public XBOX::VObject, public XBOX::IRefCountable
{
public:

	typedef std::map< XBOX::VUUID, XBOX::VRefPtr<CUAGSession> >					MapOfSession;
	typedef std::map< XBOX::VUUID, XBOX::VRefPtr<CUAGSession> >::iterator		MapOfSession_iter;
	typedef std::map< XBOX::VUUID, XBOX::VRefPtr<CUAGSession> >::const_iterator	MapOfSession_citer;
	typedef std::vector<XBOX::VRefPtr<CUAGSession> >							SessionVector;

			VRIAHTTPSessionManager();
	virtual ~VRIAHTTPSessionManager();

			/** @brief	The UAG session and the session storage are retained.
						If the session storage is NULL, a new session storage is created automatically */
			//CUAGSession*				CreateAndRetainSession( CUAGSession *inUAGSession, XBOX::VJSSessionStorageObject *inSessionStorageObject, sLONG inLifeTime = kDEFAULT_LIFE_TIME);
			void						AddSession( CUAGSession* inSession);
			void						RemoveSession( CUAGSession* inSession);
			void						RemoveSession( const XBOX::VUUID& inID);
			/** @brief	Remove all the sessions which have expired */
			void						RemoveExpiredSessions();
			CUAGSession*				RetainSession( const XBOX::VUUID& inID) const;
			void						Clear();

			CUAGSession*				RetainSessionFromCookie( const IHTTPRequest& inRequest) const;
			void						RetainSessions(const XBOX::VUUID& inUserID, SessionVector& outSessions);

private:

			MapOfSession				fSessions;
	mutable	XBOX::VCriticalSection		fMutex;
};



#endif
