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
#ifndef __VRIASERVERSUPERVISOR__H__
#define __VRIASERVERSUPERVISOR__H__

#include "HTTPServer/Interfaces/CHTTPServer.h"
#include "VRIAServerApplication.h"


class VRIAServerJob : public XBOX::VObject, public XBOX::IRefCountable
{
public:
		
		typedef enum VRIAServerJobState_enum 
		{
			JOB_CREATED_STATE,
			JOB_TERMINATED_STATE
			/*JOB_UNDEFINED_STATE,
			JOB_CREATED_STATE,
			JOB_STARTED_STATE,
			JOB_COMPLETED_STATE,
			JOB_FAILED_STATE*/
		} VRIAServerJobState;
		
		XBOX::VString const						GetId() const { return fJobId; } 

		VRIAServerJobState						GetState() const {return fState;}

		void									Log( const XBOX::VString& inMessage ) const;
		void									Log( const XBOX::VValueBag* inBag) const;

private:
	friend	class VRIAServerSupervisor;

												VRIAServerJob(const XBOX::VString& inJobId);
												~VRIAServerJob();

			XBOX::VString						fJobId;
			VRIAServerJobState					fState;

};

class VRIAServerSupervisor : public IWebSocketHandler, public XBOX::VObject, private XBOX::ILogListener
{
public:

	static	bool								Init();
	static	void								DeInit();
	static	VRIAServerSupervisor*				Get();

			XBOX::VError						Attach(IHTTPServerProject *inHTTPServerProject);
			XBOX::VError						Detach(IHTTPServerProject *inHTTPServerProject);

			void								AcceptClientConnexions() { if (!fAcceptClients) {fAcceptClients=true;} ;}

			VRIAServerJob*						RetainJob(const XBOX::VString& inJobId, bool inSubscribeForEvents=true);

			XBOX::VError						TerminateJob( const XBOX::VString& inJobId, const XBOX::VString& inMessage );
			XBOX::VError						TerminateJob( const XBOX::VString& inJobId, const XBOX::VValueBag* inBag);

			void								RetainJobs( std::vector< XBOX::VRefPtr< VRIAServerJob > >& outJobs) const;
private:

												VRIAServerSupervisor();
	virtual										~VRIAServerSupervisor();
	
	// From IWebSocketHandler

	virtual XBOX::VError						GetPatterns(XBOX::VectorOfVString *outPatterns) const;
	virtual XBOX::VError						HandleRequest(IHTTPResponse *ioResponse);

	// from ILogListener
	virtual	void								Put( std::vector< const XBOX::VValueBag* >& inValuesVector );

	mutable XBOX::VCriticalSection									fLock;
			std::map< const XBOX::VString, VRIAServerJob* >			fJobMap;

	typedef std::vector< const XBOX::VValueBag* > VectorOfBags;

	class VRIAServerSupervisorClient : public XBOX::VObject
	{

	public:
														VRIAServerSupervisorClient();
				void									Start(IHTTPWebsocketServer* inWS, const XBOX::VString& inSolutionName);
				void									Stop();
				bool									IsStarted();
				VectorOfBags							fBagsVector;
				XBOX::TaskState							GetTaskState();
				void									TreatBags(XBOX::VError& ioError);

	private:
		class VRIAServerState
		{
		public:
														VRIAServerState() :
																fDebuggerType(NO_DEBUGGER_TYPE),
																fStarted(false),
																fConnected(false),
																fBreakpointsTimeStamp(-1),
																fDebuggingEventsTimeStamp(-1),
																fPendingContexts(false),
																fSolutionName("") {;}

				WAKDebuggerType_t			fDebuggerType;
				bool						fStarted;
				sLONG						fBreakpointsTimeStamp;
				bool						fConnected;
				sLONG						fDebuggingEventsTimeStamp;
				bool						fPendingContexts;
				XBOX::VString				fSolutionName;
		};

		XBOX::VError									SendCurrentState(bool inFirstMessage,const XBOX::VString& inSolutionName);

		class VStartMessage : public XBOX::VMessage
		{
		public:
			VStartMessage(VRIAServerSupervisorClient* inClient, IHTTPWebsocketServer* inWS, const XBOX::VString& inSolutionName) :
				fClient(inClient),
				fWS(inWS),
				fSolutionName(inSolutionName) {;}
		private:
					void								DoExecute();

			VRIAServerSupervisorClient*					fClient;
			IHTTPWebsocketServer*						fWS;
			XBOX::VString								fSolutionName;
		};

		class VStopMessage : public XBOX::VMessage
		{
		public:
			VStopMessage(VRIAServerSupervisorClient* inClient) : fClient(inClient) {;}
		private:
					void								DoExecute();
			VRIAServerSupervisorClient*					fClient;
		};

		virtual												~VRIAServerSupervisorClient();

				bool										fStarted;
				bool										fExitTask;
				IHTTPWebsocketServer*						fWS;
				XBOX::VTask*								fTask;
				VRIAServerState								fServerState;
				bool										fStudioIsConnected;
		static	sLONG										InnerTaskProc(XBOX::VTask* inTask);
	};

			std::set< VRIAServerSupervisorClient* >					fClientSet;
			bool													fAcceptClients;
			XBOX::VCriticalSection									fClientSetLock;
			XBOX::VCriticalSection									fStudioConnectionLock;
			sLONG													fNumberOfConnectedStudios;

	static	VRIAServerSupervisor*									sRIAServerSupervisor;

	static	sLONG													sJobID;
		

};



#endif