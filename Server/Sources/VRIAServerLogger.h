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
#ifndef __RIAServerLogger__
#define __RIAServerLogger__


#if 0
#include "ServerNet/VServerNet.h"


class VRIARequestLogger : public XBOX::VObject, public IRequestLogger
{
public:
			VRIARequestLogger();
	virtual ~VRIARequestLogger();

			XBOX::ILogger*	GetLogger() const { return fLogger; }

			// Inherited from IRequestLogger interface
	virtual void						Log( OsType inComponentID, void* inCDB4DBaseContext, sLONG inRequestNo, sLONG inRequestNbBytes, sLONG inReplyNbBytes, sLONG inElapsedTime);
	virtual void						Log( OsType inComponentID, void* inCDB4DBaseContext, const XBOX::VString& inMessage, sLONG inElapsedTime, bool inCleanString = false);
	virtual void						Log( OsType inComponentID, void* inCDB4DBaseContext, const char* inMessage, sLONG inElapsedTime);
	virtual bool						IsEnable() const { return fEnable; }

			void						SetEnable( bool inEnable) { fEnable = inEnable; }

private:
			XBOX::ILogger*				fLogger;
			bool						fEnable;
};




class StUseLogger : public XBOX::VObject
{
public:
			StUseLogger();
	virtual	~StUseLogger();

			void	Log( const XBOX::VString& inLoggerID, XBOX::ELog4jMessageLevel inLevel, const XBOX::VString& inMessage);
			void	LogMessageFromErrorBase( const XBOX::VString& inLoggerID, XBOX::VErrorBase *inError);
			void	LogMessagesFromErrorContext( const XBOX::VString& inLoggerID, XBOX::VErrorContext* inContext);
			void	LogWorkersInformations( const XBOX::VString& inLoggerID, const std::vector<JSWorkerInfo>& inWorkersInfos);

private:
	
			XBOX::ILogger	*fLogger;

};
#endif


#endif
