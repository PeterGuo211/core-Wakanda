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

#include "Kernel/Sources/VProgressIndicator.h"
#include "VRIAServerProgressIndicator.h"
#include "VRIAServerApplication.h"

USING_TOOLBOX_NAMESPACE

VRIAServerProgressIndicator::VRIAServerProgressIndicator(const VString& inUserInfo, VSignalT_0* inExternPublishSignal)
: fExternPublishSignal(NULL)
{ 
	SetUserInfo(inUserInfo); 
	fExternPublishSignal = inExternPublishSignal;
}

VError VRIAServerProgressIndicator::SaveInfoToBag(VValueBag& outBag)
{
	Lock();

	outBag.SetString(L"UserInfo", fUserInfo);
	outBag.SetLong(L"sessions", fSessionCount);
	outBag.SetLong(L"percent", fPercentDone);

	Unlock();

	return VE_OK;
}

bool VRIAServerProgressIndicator::DoProgress ()
{
	uLONG currentTime = XBOX::VSystem::GetCurrentTime();

	if ((currentTime - fTime) > RIASERVER_PROGRESS_PUBLISH_DELAY)
	{
		VFloat currentPercentDone((ComputePercentDone() + 1 - fSessionCount) * 100);
		if (currentPercentDone.GetLong() > fPercentDone)
		{
			fPercentDone = currentPercentDone.GetLong();
			fTime = currentTime;
			Publish();
		}
	}

	VTask::Yield ( ); // Sergiy - 2009 July 31 - Bug fix ACI0062831. Progress called for long operations calls "Yield" to avoid blocking cooperative tasks.

	return !IsInterrupted();
}

void VRIAServerProgressIndicator::DoBeginSession(sLONG inSessionNumber)
{
	fPercentDone = 0;
	fTime = VSystem::GetCurrentTime();
}

void VRIAServerProgressIndicator::DoEndSession(sLONG inSessionNumber)
{
	if (fSessionCount == 0)
		fPercentDone = 0;
}

void VRIAServerProgressIndicator::Publish()
{
	// Publish in the current thread for now while main thread is
	// suspended during database closing
	VRIAServerApplication::Get()->PublishServiceRecordEvent();

	//if ( NULL != fExternPublishSignal )
	//	(*fExternPublishSignal)();	
}
