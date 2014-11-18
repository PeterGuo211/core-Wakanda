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
#include "VRIAServerProject.h"
#include "VRIAServerTools.h"
#include "DB4D/Headers/DB4D.h"
#include "VRIAServerProjectContext.h"


USING_TOOLBOX_NAMESPACE



VRIAContextManager::VRIAContextManager()
: fApplication(NULL), fRegisteredContextsCountZeroEvent(NULL)
{
}


VRIAContextManager::VRIAContextManager( VRIAServerProject *inApplication)
: fApplication(inApplication), fRegisteredContextsCountZeroEvent(NULL)
{
}


VRIAContextManager::~VRIAContextManager()
{
	xbox_assert(fSetOfContext.size() == 0);
	fSetOfContext.clear();
	
	if (fRegisteredContextsCountZeroEvent != NULL)
	{
		if (fRegisteredContextsCountZeroEvent->Unlock())
			ReleaseRefCountable( &fRegisteredContextsCountZeroEvent);
	}
}


VError VRIAContextManager::RegisterContext( VRIAContext *inContext)
{
	if (inContext == NULL)
		return VE_RIA_INVALID_CONTEXT;

	if (fSetOfContextMutex.Lock())
	{
		fSetOfContext.insert( inContext);
		fSetOfContextMutex.Unlock();
	}
	return VE_OK;
}


VError VRIAContextManager::UnRegisterContext( VRIAContext *inContext)
{
	if (inContext == NULL)
		return VE_RIA_INVALID_CONTEXT;

	VError err = VE_OK;
	if (fSetOfContextMutex.Lock())
	{
		SetOfContext_iter found = fSetOfContext.find( inContext);
		if (found != fSetOfContext.end())
		{
			fSetOfContext.erase( found);

			if (fSetOfContext.size() == 0)
			{
				if (fRegisteredContextsCountZeroEvenMutex.Lock())
				{
					if (fRegisteredContextsCountZeroEvent != NULL)
					{
						if (fRegisteredContextsCountZeroEvent->Unlock())
							ReleaseRefCountable( &fRegisteredContextsCountZeroEvent);
					}
					fRegisteredContextsCountZeroEvenMutex.Unlock();
				}
			}
		}
		else
		{
			err = VE_RIA_UNKNOWN_CONTEXT;
		}
		fSetOfContextMutex.Unlock();
	}
	return err;
}


bool VRIAContextManager::IsContextRegistered( VRIAContext *inContext) const
{
	bool result = false;
	
	if (inContext != NULL)
	{
		if (fSetOfContextMutex.Lock())
		{
			SetOfContext_citer found = fSetOfContext.find( inContext);
			result = (found != fSetOfContext.end());
			fSetOfContextMutex.Unlock();
		}
	}
	return result;
}


VSyncEvent* VRIAContextManager::WaitForRegisteredContextsCountZero()
{
	VSyncEvent *syncEvent = NULL;

	if (fSetOfContextMutex.Lock())
	{
		if (fSetOfContext.size() > 0)
		{
			if (fRegisteredContextsCountZeroEvenMutex.Lock())
			{
				if (fRegisteredContextsCountZeroEvent == NULL)
					fRegisteredContextsCountZeroEvent = new VSyncEvent();

				syncEvent = RetainRefCountable( fRegisteredContextsCountZeroEvent);

				fRegisteredContextsCountZeroEvenMutex.Unlock();
			}
		}
		fSetOfContextMutex.Unlock();
	}
	return syncEvent;
}


uLONG VRIAContextManager::GetRegisteredContextsCount() const
{
	uLONG result = 0;
	if (fSetOfContextMutex.Lock())
	{
		result = (uLONG) fSetOfContext.size();
		fSetOfContextMutex.Unlock();
	}
	return result;
}



// ----------------------------------------------------------------------------



VRIAContext::VRIAContext()
: fApplication(NULL), fContextMgr(NULL), fBaseContext(NULL)
{
}


VRIAContext::VRIAContext( VRIAServerProject* inApplication, VRIAContextManager* inContextMgr)
: fBaseContext(NULL)
{
	fApplication = RetainRefCountable( inApplication);
	fContextMgr = RetainRefCountable( inContextMgr);
}


VRIAContext::~VRIAContext()
{
	if (fContextMgr != NULL)
		fContextMgr->UnRegisterContext( this);

	QuickReleaseRefCountable( fApplication);
	QuickReleaseRefCountable( fContextMgr);
	QuickReleaseRefCountable( fBaseContext);
}


void VRIAContext::SetBaseContext( CDB4DBaseContext* inBaseContext)
{
	CopyRefCountable( &fBaseContext, inBaseContext);
}


CDB4DBaseContext* VRIAContext::GetBaseContext() const
{
	return fBaseContext;
}


VRIAServerProject* VRIAContext::GetApplication() const
{
	return fApplication;
}

