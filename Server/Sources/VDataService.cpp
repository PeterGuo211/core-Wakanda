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
#include "VRIAServerApplication.h"
#include "VDataService.h"


USING_TOOLBOX_NAMESPACE


VDataService::VDataService( VRIAServerProject *inApplication, IHTTPServerProject *inHTTPServerProject)
{
	fApplication = inApplication;
	fDatabase = NULL;
	fHTTPServerProject = inHTTPServerProject;
	fAdminRequestHandler = fRestRequestHandler = NULL;
	fPattern = L"/rest/"; // also hard-coded into DB4D
}


VDataService::~VDataService()
{
	xbox_assert(fAdminRequestHandler == NULL && fRestRequestHandler == NULL);

	ReleaseRefCountable(&fAdminRequestHandler);
	ReleaseRefCountable(&fRestRequestHandler);
}


void VDataService::GetPattern( XBOX::VString& outPattern) const
{
	if (fMutex.Lock())
	{
		outPattern = fPattern;
		fMutex.Unlock();
	}
}


VError VDataService::SetEnabled( bool inEnabled)
{
	if (!testAssert(fApplication != NULL))
		return VE_UNKNOWN_ERROR;

	if (fHTTPServerProject == NULL)
		return vThrowError( VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);

	VError err = VE_OK;

	if (fMutex.Lock())
	{
		if (inEnabled)
		{
			if (fRestRequestHandler == NULL)
			{
				CDB4DManager *cdb4dManager = VRIAServerApplication::Get()->GetComponentDB4D();
				if (cdb4dManager != NULL)
				{
					// L.R  le 1er fevrier 2013 : voir avec Stephane pour la pattern qui n'est plus hard codee et qui est maintenant un simple prefix
//					fRequestHandler = cdb4dManager->AddRestRequestHandler( err, fDatabase, fHTTPServerProject, (RIApplicationRef)fApplication, fPattern, true);
					fRestRequestHandler = cdb4dManager->AddRestRequestHandler( err, fDatabase, fHTTPServerProject, (RIApplicationRef)fApplication, "rest", true, &fAdminRequestHandler);
					if (err != VE_OK) {

						ReleaseRefCountable(&fAdminRequestHandler);
						ReleaseRefCountable(&fRestRequestHandler);

					}
				}
				else
				{
					err = vThrowError( VE_RIA_DB4D_COMPONENT_NOT_FOUND);
				}
			}
		}
		else 
		{
			if (fAdminRequestHandler != NULL) {

				err = fHTTPServerProject->RemoveHTTPRequestHandler(fAdminRequestHandler);
				ReleaseRefCountable(&fAdminRequestHandler);

			}

			if (fRestRequestHandler != NULL)
			{
				VError	err2;

				err2 = fHTTPServerProject->RemoveHTTPRequestHandler(fRestRequestHandler);
				ReleaseRefCountable(&fRestRequestHandler);
				if (err == VE_OK)

					err = err2;

			}

			
		}
		fMutex.Unlock();
	}
	return err;
}


bool VDataService::IsEnabled() const
{
	bool result = false;

	if (fMutex.Lock())
	{
		result = (fRestRequestHandler != NULL);
		fMutex.Unlock();
	}
	return result;
}


void VDataService::SetDatabase( CDB4DBase *inDatabase)
{
	if (fMutex.Lock())
	{
		xbox_assert(fAdminRequestHandler == NULL && fRestRequestHandler == NULL);
		fDatabase = inDatabase;
		fMutex.Unlock();
	}
}