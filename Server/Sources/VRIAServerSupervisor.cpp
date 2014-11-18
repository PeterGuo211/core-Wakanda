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

#include "VRIAServerConstants.h"
#include "VRIAServerSolution.h"
#include "VRIAServerApplication.h"
#include "VRIAServerSupervisor.h"
#include "VRemoteDebuggerBreakpointsManager.h"


USING_TOOLBOX_NAMESPACE
using namespace std;

#define K_BUFFER_MAX_SIZE					(4096)

const XBOX::VString							K_REMOTE_ADMIN_WS("/remote_admin_ws");

VRIAServerSupervisor*						VRIAServerSupervisor::sRIAServerSupervisor = NULL;
sLONG										VRIAServerSupervisor::sJobID = 1;



VRIAServerJob::VRIAServerJob(const VString& inJobId) : fState(JOB_CREATED_STATE)
{
	if (testAssert(inJobId.GetLength() > 0))
	{
		fJobId = inJobId;
	}
	else
	{
		fJobId = "__BAD_JOB_ID";
	}
}

VRIAServerJob::~VRIAServerJob()
{
}

VRIAServerJob* VRIAServerSupervisor::RetainJob(const XBOX::VString& inJobId, bool inSubscribeForEvents)
{
	VRIAServerJob*	newJob = NULL;
	
	fLock.Lock();
	
	if (inJobId.GetLength() > 0)
	{
		std::map< const XBOX::VString, VRIAServerJob* >::const_iterator		itJob = fJobMap.find(inJobId);
		if (itJob != fJobMap.end())
		{
			newJob = (*itJob).second;
			newJob->Retain();
		}
	}
	if (!newJob)
	{
		VString		newJobId;
		if (inJobId.GetLength() > 0)
		{
			newJobId = inJobId;
		}
		else
		{
			newJobId.AppendLong(sJobID++);
		}
		newJob = new VRIAServerJob(newJobId);

		if (newJob && inSubscribeForEvents)
		{
			newJob->Retain();
			fJobMap.insert( std::pair< const XBOX::VString, VRIAServerJob*>( newJob->GetId(), newJob ) );
			newJob->Log( " created " );
		}
	}

	fLock.Unlock();

	return newJob;
}


void VRIAServerJob::Log( const XBOX::VString& inMessage ) const
{
	VValueBag* bag = new VValueBag;

	ILoggerBagKeys::message.Set( bag, inMessage);
	Log( bag);

	ReleaseRefCountable(&bag);
}


void VRIAServerJob::Log( const VValueBag* inBag) const
{
	VValueBag *bag = (inBag != NULL) ? inBag->Clone() : NULL;
	if (bag != NULL)
	{
		ILoggerBagKeys::jobId.Set( bag, fJobId);
		ILoggerBagKeys::jobState.Set( bag, fState);

		if (!bag->AttributeExists( ILoggerBagKeys::level))
			ILoggerBagKeys::level.Set( bag, EML_Information);

		if (!bag->AttributeExists( ILoggerBagKeys::source))
		{
			bool sourceIdentifierSet = false;
			const VValueBag* properties = VTask::GetCurrent()->RetainProperties();
			if (properties != NULL)
			{
				VString source;
				sourceIdentifierSet = properties->GetString(ILoggerBagKeys::source, source);
				if (sourceIdentifierSet)
					ILoggerBagKeys::source.Set( bag, source);
				properties->Release();
			}
			
			if (!sourceIdentifierSet)
				ILoggerBagKeys::source.Set( bag, VProcess::Get()->GetLogSourceIdentifier() + L".supervisor");
		}

		VProcess::Get()->GetLogger()->LogBag( bag);

		bag->Release();
	}
}


XBOX::VError VRIAServerSupervisor::TerminateJob(const XBOX::VString& inJobId, const XBOX::VString& inMessage )
{
	VValueBag* bag = new VValueBag;
	ILoggerBagKeys::message.Set( bag, inMessage);
	VError err = TerminateJob( inJobId, bag);
	ReleaseRefCountable( &bag);
	return err;
}


VError VRIAServerSupervisor::TerminateJob( const VString& inJobId, const VValueBag* inBag)
{
	VError				err = VE_INVALID_PARAMETER;
	VRIAServerJob*		job = NULL;

	fLock.Lock();

	std::map< const XBOX::VString, VRIAServerJob* >::const_iterator		itJob = fJobMap.find(inJobId);
	
	if (itJob != fJobMap.end())
	{
		if ( (*itJob).second->fState == VRIAServerJob::JOB_CREATED_STATE)
		{
			err = VE_OK;

			(*itJob).second->fState = VRIAServerJob::JOB_TERMINATED_STATE;

			job = (*itJob).second;
			fJobMap.erase(itJob->first);

		}
	}

	fLock.Unlock();

	if (!err)
	{
		job->Log( inBag );
		job->Release();
	}
	return err;
}


#define K_PAUSE_DELAY_MS	(500)


VRIAServerSupervisor::VRIAServerSupervisor() : fAcceptClients(false), fNumberOfConnectedStudios(0)
{
}

VRIAServerSupervisor::~VRIAServerSupervisor()
{
}

bool VRIAServerSupervisor::Init()
{
	if (sRIAServerSupervisor == NULL)
	{
		sRIAServerSupervisor = new VRIAServerSupervisor();
		VProcess::Get()->GetLogger()->AddLogListener( sRIAServerSupervisor);
	}
	return (sRIAServerSupervisor != NULL);
}

void VRIAServerSupervisor::DeInit()
{
	if (sRIAServerSupervisor != NULL)
	{
		VProcess::Get()->GetLogger()->RemoveLogListener( sRIAServerSupervisor);
		sRIAServerSupervisor->fClientSetLock.Lock();
		for(	std::set< VRIAServerSupervisorClient* >::iterator itClient = sRIAServerSupervisor->fClientSet.begin();
				(itClient != sRIAServerSupervisor->fClientSet.end());
				itClient++ )
		{
			(*itClient)->Stop();
		}
		sRIAServerSupervisor->fClientSetLock.Unlock();
		bool allThreadsDead = false;
		while(!allThreadsDead)
		{
			VTask::Sleep(500);
			allThreadsDead = true;
			sRIAServerSupervisor->fClientSetLock.Lock();
			for(std::set< VRIAServerSupervisorClient* >::iterator itClient = sRIAServerSupervisor->fClientSet.begin();
				(itClient != sRIAServerSupervisor->fClientSet.end());
				itClient++ )
			{
				if ((*itClient)->GetTaskState() != XBOX::TS_DEAD)
				{
					allThreadsDead = false;
				}
			}
			sRIAServerSupervisor->fClientSetLock.Unlock();
		}
		delete sRIAServerSupervisor;
		sRIAServerSupervisor = NULL;
	}
}

VRIAServerSupervisor* VRIAServerSupervisor::Get()
{
	if (!sRIAServerSupervisor)
	{
		sRIAServerSupervisor = new VRIAServerSupervisor();
	}
	return sRIAServerSupervisor;
}

VError VRIAServerSupervisor::Attach( IHTTPServerProject *inHTTPServerProject)
{
	VError err = VE_OK;

	if (inHTTPServerProject != NULL)
	{
		err = inHTTPServerProject->AddWebSocketHandler(this);
	}
	else
	{
		err = VE_INVALID_PARAMETER;
	}

	return err;
}

VError VRIAServerSupervisor::Detach( IHTTPServerProject *inHTTPServerProject)
{
	VError err = VE_OK;

	if (inHTTPServerProject != NULL)
	{
		err = inHTTPServerProject->RemoveWebSocketHandler(this);
	}
	else
	{
		err = VE_INVALID_PARAMETER;
	}

	return err;
}



void VRIAServerSupervisor::Put( std::vector< const XBOX::VValueBag* >& inValuesVector )
{

	fClientSetLock.Lock();

	// jobs are only treated if somebody's connected
	if (fClientSet.size() > 0)
	{
		for( std::vector< const XBOX::VValueBag* >::size_type idx = 0; idx < inValuesVector.size(); idx++ )
		{
			VString		jobId;
			if ( ILoggerBagKeys::jobId.Get( inValuesVector[idx], jobId ) )
			{
				for( std::set< VRIAServerSupervisorClient* >::iterator itClient = fClientSet.begin(); (itClient != fClientSet.end()); itClient++ )
				{
					if ((*itClient)->IsStarted())
					{
						inValuesVector[idx]->Retain();
						(*itClient)->fBagsVector.push_back(inValuesVector[idx]);
					}
				}
			}
			else
			{
				sLONG8	debugContext;
				if (ILoggerBagKeys::debug_context.Get(inValuesVector[idx], debugContext))
				{
					for (std::set< VRIAServerSupervisorClient* >::iterator itClient = fClientSet.begin(); (itClient != fClientSet.end()); itClient++)
					{
						if ((*itClient)->IsStarted())
						{
							inValuesVector[idx]->Retain();
							(*itClient)->fBagsVector.push_back(inValuesVector[idx]);
						}
					}
				}
			}
		}
	}
	/*else
	{
		for( std::vector< const XBOX::VValueBag* >::size_type idx = 0; idx < inValuesVector.size(); idx++ )
		{
			sLONG		jsonJobState;
			if (inValuesVector[idx]->GetLong("job_state",jsonJobState))
			{
				if (jsonJobState == 1)
				{
					VString		jsonJobMessage;
					if (inValuesVector[idx]->GetString("message",jsonJobMessage))
					{
						sLONG	errorCode = -1;
						inValuesVector[idx]->GetLong("errorCode",errorCode);
						if ( jsonJobMessage.Find("solution opened") > 0 )
						{
							inValuesVector[idx]->GetString("solutionName",fSolutionName);
						}

					}
				}
			}
		}
	}*/

	fClientSetLock.Unlock();
}




void VRIAServerSupervisor::RetainJobs( std::vector< VRefPtr< VRIAServerJob > >& outJobs ) const
{

	fLock.Lock();

	std::map< const XBOX::VString, VRIAServerJob* >::const_iterator		itJob = fJobMap.begin();
	while( itJob != fJobMap.end() )
	{
		outJobs.push_back( VRefPtr< VRIAServerJob >( (*itJob).second ) );
		itJob++;
	}

	fLock.Unlock();

}

XBOX::VError VRIAServerSupervisor::GetPatterns (XBOX::VectorOfVString *outPatterns) const
{
	if (outPatterns == NULL)

		return VE_HTTP_INVALID_ARGUMENT;

	outPatterns->clear();
	outPatterns->push_back(K_REMOTE_ADMIN_WS);

	return XBOX::VE_OK;
}
XBOX::TaskState VRIAServerSupervisor::VRIAServerSupervisorClient::GetTaskState()
{
	if (fTask)
	{
		return fTask->GetState();
	}
	return XBOX::TS_DEAD;
}

void VRIAServerSupervisor::VRIAServerSupervisorClient::TreatBags(VError& ioError)
{
	VectorOfBags					tmpBags;
	sRIAServerSupervisor->fClientSetLock.Lock();
	for (VectorOfBags::size_type idx = 0; idx < fBagsVector.size(); idx++)
	{
		tmpBags.push_back(fBagsVector[idx]);
	}
	fBagsVector.clear();
	sRIAServerSupervisor->fClientSetLock.Unlock();

	for (VectorOfBags::size_type idx = 0; idx < tmpBags.size(); idx++)
	{
		if (!ioError)
		{
			VString		jobId;
			bool isJobMsg = ILoggerBagKeys::jobId.Get(tmpBags[idx], jobId);
			sLONG8	debugContext;
			bool isDbgMsg = ILoggerBagKeys::debug_context.Get(tmpBags[idx], debugContext);
			VString		msg;
			bool isJsonOK = tmpBags[idx]->GetJSONString(msg) == VE_OK;
			if (isJobMsg || isDbgMsg)
			{
				if (debugContext)
				{
					VString	logID;
					if (ILoggerBagKeys::source.Get(tmpBags[idx], logID))
					{
						if (logID.Find(L".console") > 0)
						{
							continue;
						}
					}
				}
				XBOX::VStringConvertBuffer	buffer(msg, XBOX::VTC_UTF_8);
				ioError = fWS->WriteMessage(buffer.GetCPointer(), buffer.GetLength(), true);
				//DebugMsg("...will send  <%s>\n",buffer.GetCPointer());
				if (!ioError)
				{
					ioError = SendCurrentState(false, "");
				}
			}
		}
		tmpBags[idx]->Release();
	}
	tmpBags.clear();
}

sLONG VRIAServerSupervisor::VRIAServerSupervisorClient::InnerTaskProc(XBOX::VTask* inTask)
{
	VRIAServerSupervisorClient*		l_this = (VRIAServerSupervisorClient*)inTask->GetKindData();
	VTask*							curtTask = VTask::GetCurrent();
	sBYTE*							tmpData = new sBYTE[K_BUFFER_MAX_SIZE];
	VError							err = VE_OK;

#if 1
	while (!l_this->fExitTask)
	{
		err = VE_OK;

		while (!l_this->fStarted)
		{
			if (l_this->fExitTask)
			{
				break; // sc, GH,  05/02/2014 WAK0086433
			}

			if (curtTask->IsDying())
			{
				l_this->fExitTask = true;
				break;
			}
			curtTask->ExecuteMessagesWithTimeout(K_PAUSE_DELAY_MS);
		}

		while (!err && !l_this->fExitTask)
		{
			if (curtTask->IsDying())
			{
				l_this->fExitTask = true;
				break;
			}

			VSize	msgLen = K_BUFFER_MAX_SIZE - 1;
			bool	isTerminated = false;
			while (!isTerminated)
			{
				err = l_this->fWS->ReadMessage(tmpData, msgLen, isTerminated);
				if (err)
				{
					break;
				}
				xbox_assert(isTerminated); // TBC for framed msgs
				if (msgLen)
				{
					// treat received msg
					tmpData[msgLen] = 0;
					const char*		K_CONN_TYPE_MSG = "{\"connectionType\":\"";
					char*			startChar = strstr(tmpData, K_CONN_TYPE_MSG);
					if (startChar)
					{
						if (strstr(startChar + strlen(K_CONN_TYPE_MSG), "STUDIO"))
						{
							l_this->fStudioIsConnected = true;

							sRIAServerSupervisor->fStudioConnectionLock.Lock();
							sRIAServerSupervisor->fNumberOfConnectedStudios++;
							sRIAServerSupervisor->fStudioConnectionLock.Unlock();
						}
					}
				}
				msgLen = K_BUFFER_MAX_SIZE - 1;
			}

			if (!err)
			{
				err = l_this->SendCurrentState(false, "");
			}

			l_this->TreatBags(err);

			//if (!err)
			{
				curtTask->ExecuteMessagesWithTimeout(K_PAUSE_DELAY_MS);
			}
		}


		if (l_this->fWS)
		{
			l_this->fWS->Close();
			delete l_this->fWS;
			l_this->fWS = NULL;
		}
		l_this->fStarted = false;

		if (!l_this->fExitTask)
		{
			if (l_this->fStudioIsConnected)
			{
				l_this->fStudioIsConnected = false;
				sRIAServerSupervisor->fStudioConnectionLock.Lock();
				sRIAServerSupervisor->fNumberOfConnectedStudios--;
				sRIAServerSupervisor->fStudioConnectionLock.Unlock();
			}
		}

	}

#endif
	delete tmpData;
	return 0;
}

VRIAServerSupervisor::VRIAServerSupervisorClient::VRIAServerSupervisorClient() : fWS(NULL)
{
	fStarted = false;
	fExitTask = false;
	fStudioIsConnected = false;
	fTask = new XBOX::VTask(this, 64000, XBOX::eTaskStylePreemptive, &VRIAServerSupervisorClient::InnerTaskProc);

	fTask->SetName("RIAServerSupervisor");
	fTask->SetKindData((sLONG_PTR)this);
	fTask->Run();
}

VRIAServerSupervisor::VRIAServerSupervisorClient::~VRIAServerSupervisorClient()
{
}


void VRIAServerSupervisor::VRIAServerSupervisorClient::Start(IHTTPWebsocketServer* inWS, const XBOX::VString& inSolutionName)
{
	VStartMessage*	startMsg = new VStartMessage(this,inWS,inSolutionName);
	// post in order to not block the caller during the sending of first msg
	startMsg->PostTo( fTask );
	ReleaseRefCountable(&startMsg);
}

VError VRIAServerSupervisor::VRIAServerSupervisorClient::SendCurrentState(bool inFirstMessage,const XBOX::VString& inSolutionName)
{
	VError				err = VE_OK;

	bool				sendToClient;
	WAKDebuggerType_t	wakDebuggerType;
	bool				started;
	sLONG				breakpointsTimeStamp;
	bool				connected;
	sLONG				debuggingEventsTimeStamp;
	bool				pendingContexts;
	IRemoteDebuggerServer*		dbgrSrv;


	VRemoteDebuggerBreakpointsManager::GetGlobalTimeStamp(breakpointsTimeStamp);

	dbgrSrv = VJSGlobalContext::GetDebuggerServer();
	sendToClient = false;
	wakDebuggerType = NO_DEBUGGER_TYPE;
	started = false;
	connected = false;
	pendingContexts = false;
	debuggingEventsTimeStamp = -1;

	if (dbgrSrv)
	{
		long long evtsTS;
		wakDebuggerType = dbgrSrv->GetType();
		if (wakDebuggerType != NO_DEBUGGER_TYPE)
		{
			dbgrSrv->GetStatus(
					started,
					connected,
					evtsTS,
					pendingContexts);

			debuggingEventsTimeStamp = (sLONG)evtsTS;
		}
	}

	if (!inFirstMessage)
	{
		sendToClient = (fServerState.fDebuggerType != wakDebuggerType);
		if (!sendToClient)
		{
			sendToClient = (fServerState.fStarted != started);
		}
		if (!sendToClient)
		{
			sendToClient = (fServerState.fConnected != connected);
		}
		if (!sendToClient && fServerState.fConnected)
		{
			sendToClient = (fServerState.fPendingContexts != pendingContexts);
		}
		if (!sendToClient)
		{
			sendToClient = (fServerState.fDebuggingEventsTimeStamp != debuggingEventsTimeStamp);
		}
		if (!sendToClient)
		{
			sendToClient = (fServerState.fBreakpointsTimeStamp != breakpointsTimeStamp);
		}
		/*if (!sendToClient)
		{
			sendToClient = (fServerState.fSolutionName != inSolutionName);
		}*/
	}
	else
	{
		sendToClient = true;
	}

	if (!err && sendToClient)
	{
		fServerState.fDebuggerType = wakDebuggerType;
		fServerState.fStarted = started;
		fServerState.fConnected = connected;
		fServerState.fPendingContexts = pendingContexts;
		fServerState.fBreakpointsTimeStamp = breakpointsTimeStamp;
		fServerState.fDebuggingEventsTimeStamp = debuggingEventsTimeStamp;
		sendToClient = true;
	}

	if (!err && sendToClient)
	{
		VString		result("{\"debuggerStarted\":");
		if (started)
		{
			result += "true";
		}
		else
		{
			result += "false";
		}
		result += ",\"debuggerType\":";
		switch(fServerState.fDebuggerType)
		{
		case WEB_INSPECTOR_TYPE:
			result += "\"REMOTE_DEBUGGER\"";
			break;
		case REGULAR_DBG_TYPE:
			result += "\"WAKANDA_DEBUGGER\"";
			break;
		case NO_DEBUGGER_TYPE:
			result += "\"NO_DEBUGGER\"";
			break;
		default:
			result += "\"UNKNOWN_DEBUGGER\"";
			break;
		}
		result += ",\"breakpointsTimeStamp\":";
		result.AppendLong8(fServerState.fBreakpointsTimeStamp);
		result += ",\"debuggerConnected\":";
		if (connected)
		{
			result += "true";
		}
		else
		{
			result += "false";
		}
		result += ",\"debuggingPendingContexts\":";
		if (fServerState.fPendingContexts)
		{
			result += "true";
		}
		else
		{
			result += "false";
		}
		result += ",\"debuggingEventsTimeStamp\":";
		result.AppendLong8(fServerState.fDebuggingEventsTimeStamp);
		
		if (inFirstMessage)
		{
			bool	isStudioConnected = false;
			sRIAServerSupervisor->fStudioConnectionLock.Lock();
			isStudioConnected = (sRIAServerSupervisor->fNumberOfConnectedStudios > 0);
			sRIAServerSupervisor->fStudioConnectionLock.Unlock();
			result += ",\"studioIsConnected\":\"";
			result += ( isStudioConnected ? "true" : "false" );
			result += "\"";

			fServerState.fSolutionName = inSolutionName;
			result += ",\"solutionName\":\"";
			result += fServerState.fSolutionName;
			result += "\"";

			result += ",\"protocolVersion\":\"";
			result += K_CURRENT_PROTOCOL_VERSION;
			if ( VRIAServerApplication::Get()->IsEnterpriseVersion() )
			{
				result += "_ENTERPRISE";
			}
			result += "\"";
			result += ",\"serverPath\":\"";
			XBOX::VFilePath	vFilePath = VProcess::Get()->GetExecutableFilePath();
			VString		jsonPath;
			vFilePath.GetPath().GetJSONString(jsonPath);
			result += jsonPath;
			result += "\"";
		}
		result += "}";

		VStringConvertBuffer	buffer(result,VTC_UTF_8);
		err = fWS->WriteMessage(buffer.GetCPointer(),buffer.GetSize(),true);
	}

	return err;
}

void VRIAServerSupervisor::VRIAServerSupervisorClient::VStartMessage::DoExecute()
{
	VError	err = VE_UNKNOWN_ERROR;

	if (!fClient->IsStarted())
	{
		fClient->fWS = fWS;
		err = fClient->SendCurrentState(true,fSolutionName);
		if (!err)
		{
			//fClient->fBagsVector.clear();
			fClient->fStarted = true;
		}
	}
	if (err)
	{
		if (fWS)
		{
			fWS->Close();
			delete fWS;
			fClient->fWS = NULL;
		}
	}
}


bool VRIAServerSupervisor::VRIAServerSupervisorClient::IsStarted()
{
	return fStarted;
}

void VRIAServerSupervisor::VRIAServerSupervisorClient::Stop()
{
	VStopMessage*	stopMsg = new VStopMessage(this);
	stopMsg->PostTo( fTask );
	ReleaseRefCountable(&stopMsg);
}

void VRIAServerSupervisor::VRIAServerSupervisorClient::VStopMessage::DoExecute()
{
	fClient->fExitTask = true;
}


XBOX::VError VRIAServerSupervisor::HandleRequest(IHTTPResponse* ioResponse)
{
	VError err = VE_OK;

	CHTTPServer *httpServer = VRIAServerApplication::Get()->GetComponentHTTP();
	if (testAssert(httpServer != NULL))
	{
		IHTTPWebsocketServer *webSocket = httpServer->NewHTTPWebsocketServerHandler();
		if (testAssert(webSocket != NULL))
		{
			// opens connexion and detach then endPoint
			err = webSocket->TreatNewConnection(ioResponse,true);
			if (!err)
			{
				VRIAServerSolution *solution = VRIAServerApplication::Get()->RetainCurrentSolution();
				// if we do not accept client yet, inform the client
				if (!fAcceptClients || (solution == NULL))
				{
					VString		msg("{\"wakandaServerIsAvailable\":false}");
					XBOX::VStringConvertBuffer	buffer( msg, XBOX::VTC_UTF_8);
					err = webSocket->WriteMessage(buffer.GetCPointer(),buffer.GetLength(),true);
					VTask::Sleep(300);
					webSocket->Close();
					delete webSocket;
				}
				else
				{
					fClientSetLock.Lock();
					for( std::set< VRIAServerSupervisorClient* >::iterator itClient = fClientSet.begin(); (itClient != fClientSet.end()); itClient++ )
					{
						if (!(*itClient)->IsStarted())
						{
							(*itClient)->Start(webSocket,solution->GetName());
							webSocket = NULL;
							break;
						}
					}
					if (webSocket)
					{
						VRIAServerSupervisorClient*		newClt = new VRIAServerSupervisorClient();
						if (newClt)
						{
							fClientSet.insert( newClt );
							newClt->Start(webSocket,solution->GetName());
						}
					}
					fClientSetLock.Unlock();
					solution->Release();
				}
			}
			else
			{
				delete webSocket;
				err = VE_UNKNOWN_ERROR;
			}
		}
		else
		{
			err = VE_UNKNOWN_ERROR;
		}
	}
	else
	{
		err = vThrowError( VE_RIA_HTTP_SERVER_NOT_FOUND);
	}

	return err;
}

