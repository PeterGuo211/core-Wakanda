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
#ifndef __VDataService__
#define __VDataService__


class VRIAServerProject;
class VRIAContext;
class IHTTPServerProject;
class IHTTPRequestHandler;
class CDB4DBase;


class VDataService : public XBOX::VObject, public XBOX::IRefCountable
{
public:
			VDataService( VRIAServerProject *inApplication, IHTTPServerProject *inHTTPServerProject);
	virtual	~VDataService();

			void				GetPattern( XBOX::VString& outPattern) const;

			XBOX::VError		SetEnabled( bool inEnabled);
			bool				IsEnabled() const;

			void				SetDatabase( CDB4DBase *inDatabase);

			VRIAServerProject*	GetApplication() const { return fApplication; }

private:

			VRIAServerProject			*fApplication;
			XBOX::VString				fPattern;
			CDB4DBase					*fDatabase;

			IHTTPServerProject			*fHTTPServerProject;
			IHTTPRequestHandler			*fRestRequestHandler;
			IHTTPRequestHandler			*fAdminRequestHandler;	

	mutable	XBOX::VCriticalSection		fMutex;
};



#endif