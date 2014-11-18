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
#ifndef __RIAServerProgressIndicator__
#define __RIAServerProgressIndicator__


#define RIASERVER_PROGRESS_PUBLISH_DELAY	1000 // in milliseconds
#define RIASERVER_PROGRESS_INDEX_USERINFO	CVSTR("indexProgressIndicator")
#define RIASERVER_PROGRESS_FLUSH_USERINFO	CVSTR("flushProgressIndicator")

class VRIAServerProgressIndicator : public XBOX::VProgressIndicator
{
public:

	VRIAServerProgressIndicator(const XBOX::VString& inUserInfo, XBOX::VSignalT_0* inExternPublishSignal = 0);
	XBOX::VError	SaveInfoToBag(XBOX::VValueBag& outBag);
	
protected:

	bool DoProgress ();
	void DoBeginSession(sLONG inSessionNumber);
	void DoEndSession(sLONG inSessionNumber);
	void Publish();

	private:
		VRIAServerProgressIndicator(const VRIAServerProgressIndicator&);
		XBOX::VSignalT_0*	GetExternPublishSignal() { return fExternPublishSignal; }


		uLONG				fTime;
		sLONG				fPercentDone;
		XBOX::VSignalT_0*	fExternPublishSignal;
};

#endif // __RIAServerProgressIndicator__