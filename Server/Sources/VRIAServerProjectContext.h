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
#ifndef __RIAServerProjectContext__
#define __RIAServerProjectContext__


class VRIAContext;
class VRIAServerProject;
class CDB4DBaseContext;


class VRIAContextManager : public XBOX::VObject, public XBOX::IRefCountable
{
public:

	typedef std::set< VRIAContext*>					SetOfContext;
	typedef std::set< VRIAContext*>::iterator		SetOfContext_iter;
	typedef std::set< VRIAContext*>::const_iterator	SetOfContext_citer;

			VRIAContextManager( VRIAServerProject* inApplication);
	virtual ~VRIAContextManager();
			
			XBOX::VError				RegisterContext( VRIAContext* inContext);
			XBOX::VError				UnRegisterContext( VRIAContext* inContext);
			bool						IsContextRegistered( VRIAContext* inContext) const;
			/** @brief	Returns the event on which to wait and which must be released, returns NULL if all contexts are already unregistered. */
			XBOX::VSyncEvent*			WaitForRegisteredContextsCountZero();

			uLONG						GetRegisteredContextsCount() const;

private:

			VRIAContextManager();

			VRIAServerProject			*fApplication;
			SetOfContext				fSetOfContext;
	mutable	XBOX::VCriticalSection		fSetOfContextMutex;
			XBOX::VSyncEvent			*fRegisteredContextsCountZeroEvent;
	mutable	XBOX::VCriticalSection		fRegisteredContextsCountZeroEvenMutex;
};



// ----------------------------------------------------------------------------



class VRIAContext : public XBOX::VObject, public XBOX::IRefCountable
{
public:
			VRIAContext( VRIAServerProject* inApplication, VRIAContextManager* inContextMgr);
	virtual	~VRIAContext();

			/**	@brief	The DB4D base context is retained */
			void					SetBaseContext( CDB4DBaseContext* inBaseContext);
			CDB4DBaseContext*		GetBaseContext() const;

			// Accessors
			VRIAServerProject*		GetApplication() const;

private:
			VRIAContext();

			VRIAServerProject		*fApplication;
			VRIAContextManager		*fContextMgr;
			CDB4DBaseContext		*fBaseContext;
};

#endif