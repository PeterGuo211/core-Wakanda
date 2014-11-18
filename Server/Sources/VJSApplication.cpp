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
#include "VRIAServerSolution.h"
#include "VRIAServerProject.h"
#include "VRIAServerTools.h"
#include "VRIAServerApplication.h"
#include "VRIAServerProjectContext.h"
#include "VRIAServerJSContextMgr.h"
#include "VRIAServerHTTPRequestHandler.h"
#include "VRIAServerJSAPI.h"
#include "JavaScript/Sources/VJSJSON.h"
#include "VSolution.h"
#include "VProject.h"
#include "VProjectItem.h"
#include "VJSApplication.h"
#include "VRIAServerJSCore.h"
#include "VJSConsole.h"
#include "commonJSAPI.h"
#include "VJSSolution.h"
#include "VRIAPermissions.h"
#include "VJSPermissions.h"
#include "VRIAServerComponentBridge.h"
#include "VRIAServerHTTPSession.h"
#include "VRIAServerSupervisor.h"

USING_TOOLBOX_NAMESPACE


const XBOX::VString& BackupRegistryName("lastBackups.json");
const XBOX::VString& FormerBackupRegistryName("lastBackup.json");
const XBOX::VString& BackupManifestName("backupManifest.json");



/**
 * \brief Bridge between the VPRogressIndicator API and IDB4DToolInterface API
 */
class VProgressIndicatorBrigdeToIDB4DToolInterface: public XBOX::VProgressIndicator
{
private:
	IDB4D_DataToolsIntf* fToolInterface;
public:
	 VProgressIndicatorBrigdeToIDB4DToolInterface(IDB4D_DataToolsIntf* inToolInterface):
	  XBOX::VProgressIndicator(),
		  fToolInterface(inToolInterface)
	  {
	  }
	  virtual ~VProgressIndicatorBrigdeToIDB4DToolInterface(){}
	  virtual void	DoBeginSession(sLONG inSessionNumber)
	  {
		  if (fToolInterface)
		  {
			  VString msg;
			  fCurrent.GetMessage(msg);
			  fToolInterface->OpenProgression(msg,fCurrent.GetMax());
		  }
	  }

	  virtual void	DoEndSession(sLONG inSessionNumber)
	  {
		 if(fToolInterface)
		 {
			 fToolInterface->CloseProgression();
		 }
	  }
	 virtual bool	DoProgress ()
	 {
		 if(fToolInterface)
		 {
			fToolInterface->Progress(fCurrent.GetValue(),fCurrent.GetMax());
		 }
		 return true;
	 }
	private:
		VProgressIndicatorBrigdeToIDB4DToolInterface();
		VProgressIndicatorBrigdeToIDB4DToolInterface(const VProgressIndicatorBrigdeToIDB4DToolInterface&);
};

void VJSApplicationGlobalObject::_addHttpRequestHandler( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_addHttpRequestHandler( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		vThrowError( VE_RIA_JS_CANNOT_BE_USED_IN_THIS_CONTEXT);
	}
}


void VJSApplicationGlobalObject::_removeHttpRequestHandler( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_removeHttpRequestHandler( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		vThrowError( VE_RIA_JS_CANNOT_BE_USED_IN_THIS_CONTEXT);
	}
}


void VJSApplicationGlobalObject::_getFolder( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getFolder( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getSettingFile( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getSettingFile( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getWalibFolder( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	VFolder *folder = VRIAServerApplication::Get()->GetFileSystemNamespace()->RetainFileSystemRootFolder( CVSTR( "WALIB"));
	JSReturnFolder( folder, ioParms, 1, 2);
	ReleaseRefCountable( &folder);
}


void VJSApplicationGlobalObject::_getItemsWithRole( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getItemsWithRole( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_reloadModel( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_reloadModel( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		vThrowError( VE_RIA_JS_CANNOT_BE_USED_IN_THIS_CONTEXT);
	}
}


void VJSApplicationGlobalObject::_verifyDataStore( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_verifyDataStore( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_repairInto( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_repairInto( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_compactInto( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_compactInto( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}

void VJSApplicationGlobalObject::_backupDataStore(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		CDB4DManager* db4D = NULL;
		VFile* modelFile = NULL,*dataFile = NULL;
		VFilePath backupManifestPath;
		IBackupSettings *actualBackupSettings = NULL;
		XBOX::VError error = VE_OK;
		VJSObject progressObj(ioParms.GetContext());
		VJSContext jsContext(ioParms.GetContext());
		
		bool dbIsOpened = false;

		StErrorContextInstaller errorContext;

		//Establish environment to work
		db4D = CDB4DManager::RetainManager();

		VFile* modelFileToBackup = NULL;
		VFile* dataFileToBackup = NULL;

		if(ioParms.IsObjectParam(1))
		{
			modelFileToBackup = ioParms.RetainFileParam(1);
		}

		if(ioParms.IsObjectParam(2))
		{
			dataFileToBackup = ioParms.RetainFileParam(2);
		}
		
		if(ioParms.IsObjectParam(3))
		{
			VJSObject settingsObj(ioParms.GetContext());
			actualBackupSettings = db4D->CreateBackupSettings();
			ioParms.GetParamObject( 3, settingsObj);
			
			//WAK0085496 Jan 24th 2014, O.R., verify backup config object and thrown an exception if not appropriate
			error = actualBackupSettings->Initialize(settingsObj);
			if (error != VE_OK)
			{
				delete actualBackupSettings;
				actualBackupSettings = NULL;
			}
		}

		//Optional arg 4 is a progress object
		if(ioParms.IsObjectParam(4))
		{
			ioParms.GetParamObject(4, progressObj);
		}
		else
		{
			progressObj.MakeEmpty();
		}

		//Sanity check
		if (modelFileToBackup == NULL)
		{
			error = VE_INVALID_PARAMETER;
			vThrowError(error,CVSTR("Invalid model file path specified"));
		}
		else if (!modelFileToBackup->Exists())
		{
			error = VE_FILE_NOT_FOUND;
			vThrowError(error,CVSTR("Model file not found"));
		}

		if (dataFileToBackup == NULL)
		{
			error = VE_INVALID_PARAMETER;
			vThrowError(error,CVSTR("Invalid data file path specified"));
		}
		else if (!dataFileToBackup->Exists())
		{
			error = VE_FILE_NOT_FOUND;
			vThrowError(error,CVSTR("Data file not found"));
		}

		if (actualBackupSettings == NULL)
		{
			error = VE_INVALID_PARAMETER;
			vThrowError(error,CVSTR("Invalid settings specified"));
		}

		if(errorContext.GetLastError() == VE_OK)
		{
			//Check that the data folder does not belong to an opened database
			VFilePath path;
			dataFileToBackup->GetPath(path);
			path.ToParent();
			bool dbIsOpened = false;

			for(sLONG count = db4D->CountBases();count>0 && !dbIsOpened;--count)
			{
				CDB4DBase* enumeratedBase = db4D->RetainNthBase(count);
				if(enumeratedBase)
				{
					VFolder* dataFolder = enumeratedBase->RetainDataFolder();
					if(dataFolder)
					{
						const VFilePath& dataFolderPath = dataFolder->GetPath();
						dbIsOpened = (dataFolderPath == path);
					}
					XBOX::ReleaseRefCountable(&dataFolder);
				}
				XBOX::ReleaseRefCountable(&enumeratedBase);
			}

			if(dbIsOpened)
			{
				error = VE_INVALID_PARAMETER;
				vThrowError(error,CVSTR("Specified data file belongs to an operating base"));
			}
		}
		
		IDB4D_DataToolsIntf* toolintf = NULL;
		IBackupTool* backupTool = NULL;
		VFilePath manifestPath;
		bool backupSucceeded = false;
		if(errorContext.GetLastError() == VE_OK)
		{
			backupTool = db4D->CreateBackupTool();
			toolintf = db4D->CreateJSDataToolsIntf(jsContext, progressObj);
			backupSucceeded = backupTool->BackupClosedDatabase(*modelFileToBackup,*dataFileToBackup,*actualBackupSettings,&manifestPath,toolintf);
		}

		error = errorContext.GetLastError();
		if ( error == VE_OK && backupSucceeded)
		{
			xbox_assert(!manifestPath.IsEmpty() && manifestPath.IsValid() && manifestPath.IsFile());
			
			//WAK0084615: O.R.: avoid overriding return value when backup succeeds
			done = true;
			ioParms.ReturnFilePathAsFileOrFolder(manifestPath);
		}
		else 
		{
			VValueBag errorBag;
			VErrorBase* errorBase = NULL;
			errorBase = errorContext.GetContext()->GetLast();
			errorBag.SetLong(L"ErrorLevel",2);//normal error
			if(errorBase)
			{
				VString errorString,temp;
				errorBase->GetErrorString(errorString);
				temp.Clear();
				errorBase->GetLocation(temp);
				if(temp.GetLength() > 0)
				{
					errorString.AppendCString(", ");
					errorString.AppendString(temp);
				}
				temp.Clear();
				errorBase->GetErrorDescription(temp);
				if(temp.GetLength() > 0)
				{
					errorString.AppendCString(", ");
					errorString.AppendString(temp);
				}
				temp.Clear();
				errorBase->GetActionDescription(temp);
				if(temp.GetLength() > 0)
				{
					errorString.AppendCString(", ");
					errorString.AppendString(temp);
				}
				errorBag.SetString(L"ErrorText",errorString);
			}
			else
			{
				errorBag.SetString(L"ErrorText",CVSTR("Backup failed"));
				errorBag.SetLong(L"ErrorNumber",ERRCODE_FROM_VERROR(error));
			}
			if (toolintf)
			{
				toolintf->AddProblem(errorBag);
			}
			ioParms.ReturnNullValue();
		}
		delete toolintf;toolintf = NULL;
		delete backupTool;backupTool = NULL;
		XBOX::ReleaseRefCountable(&actualBackupSettings);
		XBOX::ReleaseRefCountable(&dataFileToBackup);
		XBOX::ReleaseRefCountable(&modelFileToBackup);
		XBOX::ReleaseRefCountable(&db4D);
	}
	if (!done)
	{
		ioParms.ReturnNullValue();
	}
}


void VJSJobManagerClass::GetDefinition(ClassDefinition &outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{	"getJob",		js_callStaticFunction<_GetJob>,			JS4D::PropertyAttributeDontDelete	},
		{	"getJobs",		js_callStaticFunction<_GetJobs>,		JS4D::PropertyAttributeDontDelete	},
		{	0,				0,										0									},
	};
		
    outDefinition.className			= "JobManager";
	outDefinition.staticFunctions	= functions;	
	/*outDefinition.initialize		= js_initialize<_Initialize>;
	outDefinition.finalize			= js_finalize<_Finalize>;
	outDefinition.getProperty		= js_getProperty<_GetProperty>;
	outDefinition.setProperty		= js_setProperty<_SetProperty>;*/
}

void VJSJobManagerClass::_GetJob(XBOX::VJSParms_callStaticFunction& ioParms, void* )
{
	VString		jobId;
	if (ioParms.CountParams() > 0)
	{
		ioParms.GetStringParam( 1, jobId );
	}
	VRIAServerJob*	newJob = VRIAServerSupervisor::Get()->RetainJob(jobId);
	if (newJob)
	{
		ioParms.ReturnValue( VJSJobClass::CreateInstance(ioParms.GetContext(),newJob) );
	}
	else
	{
		ioParms.ReturnUndefinedValue();
	}
}

void VJSJobManagerClass::_GetJobs(XBOX::VJSParms_callStaticFunction& ioParms, void* )
{
	VJSArray	arrayOfJobs(ioParms.GetContext());
	
	std::vector< VRefPtr<VRIAServerJob> >	vectJobs;
	VRIAServerSupervisor::Get()->RetainJobs(vectJobs);
	for( std::vector< VRefPtr<VRIAServerJob> >::size_type idx = 0; idx < vectJobs.size(); idx++ )
	{
		vectJobs[idx].Retain();
		arrayOfJobs.PushValue( VJSJobClass::CreateInstance(ioParms.GetContext(),vectJobs[idx]) );
	}

	ioParms.ReturnValue(arrayOfJobs);
}

void VJSJobClass::_Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerJob* inJob )
{
	inParms.GetObject().SetProperty(
			"id",
			inJob->GetId(),
			JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete );
}

void VJSJobClass::_Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerJob* inJob )
{
	inJob->Release();
}

void VJSJobClass::GetDefinition(ClassDefinition &outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{	"log",			js_callStaticFunction<_Log>,			JS4D::PropertyAttributeDontDelete	},
		{	"terminate",	js_callStaticFunction<_TerminateJob>,	JS4D::PropertyAttributeDontDelete	},
		{	0,				0,										0									},
	};
    outDefinition.className			= "Job";
	outDefinition.staticFunctions	= functions;	
	outDefinition.initialize		= js_initialize<_Initialize>;
	outDefinition.finalize			= js_finalize<_Finalize>;
}


VRIAServerJob* VJSJobClass::GetJobParam( const VJSParms_withArguments& inParms, size_t inIndex)
{
	return inParms.GetParamObjectPrivateData<VJSJobClass>(inIndex);
}


void VJSJobClass::_Log(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerJob* inJob)
{
	if (ioParms.IsObjectParam(1))
	{
		VString jsonString;
		VJSJSON xjson( ioParms.GetContext());
		VJSException exceptionRef;
		xjson.Stringify( ioParms.GetParamValue(1), jsonString, &exceptionRef);

		if (!exceptionRef.IsEmpty())
		{
			// jsonString contains the description of the exception
			jsonString.Insert( L"error(\"", 1);
			jsonString.AppendString( L"\")");
			inJob->Log( jsonString);
		}
		else
		{
			VValueBag *bag = new VValueBag;
			VJSONImporter importer( jsonString);
			importer.JSONObjectToBag( *bag);
			inJob->Log( bag);
			ReleaseRefCountable( &bag);
		}
	}
	else
	{
		VString message;
		if (ioParms.CountParams() > 0)
			ioParms.GetStringParam( 1, message );
		
		inJob->Log(message);
	}
}


void VJSJobClass::_TerminateJob(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerJob* inJob)
{
	if (ioParms.IsObjectParam(1))
	{
		VString jsonString;
		VJSJSON xjson( ioParms.GetContext());
		VJSException exceptionRef;
		xjson.Stringify( ioParms.GetParamValue(1), jsonString, &exceptionRef);

		if (!exceptionRef.IsEmpty())
		{
			// jsonString contains the description of the exception
			jsonString.Insert( L"error(\"", 1);
			jsonString.AppendString( L"\")");
			VRIAServerSupervisor::Get()->TerminateJob( inJob->GetId(), jsonString);
		}
		else
		{
			VValueBag *bag = new VValueBag;
			VJSONImporter importer( jsonString);
			importer.JSONObjectToBag( *bag);
			VRIAServerSupervisor::Get()->TerminateJob( inJob->GetId(), bag);
			ReleaseRefCountable( &bag);
		}
	}
	else
	{
		VString message;
		if (ioParms.CountParams() > 0)
			ioParms.GetStringParam( 1, message );
		
		VRIAServerSupervisor::Get()->TerminateJob( inJob->GetId(), message);
	}
}


void VJSApplication::_getJobManager( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue( VJSJobManagerClass::CreateInstance(ioParms.GetContext(),NULL) );
}

void VJSApplicationGlobalObject::_getJobManager(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getJobManager( ioParms, application);
			done = true;
		}
	}
	if (!done)
	{
		ioParms.ReturnNullValue();
	}
}


void VJSApplicationGlobalObject::_getLastBackups(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getLastBackups( ioParms, application);
			done = true;
		}
	}
	if (!done)
	{
		ioParms.ReturnNullValue();
	}
}


void VJSApplicationGlobalObject::_getBackupSettings( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getBackupSettings( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}

}



void VJSApplicationGlobalObject::_login( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_login( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_unsecureLogin( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_unsecureLogin( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}



void VJSApplicationGlobalObject::_createUserSession( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_createUserSession( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}

void VJSApplicationGlobalObject::_getCurrentUser( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getCurrentUser( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getConnectionSession( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getConnectionSession( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_logout( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_logout( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getUserSessions( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getUserSessions( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getSession( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getSession( ioParms, application);
			done = true;
		}
	}

	if (!done)
		ioParms.ReturnNullValue();
}


void VJSApplicationGlobalObject::_getName( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getName( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getWildChar( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getWildChar( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}

void VJSApplicationGlobalObject::_getIsAdministrator( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getIsAdministrator( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getHttpServer( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getHttpServer( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getConsole( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getConsole( ioParms, application);
		}
		else
		{
			ioParms.ReturnValue( VJSConsole::CreateInstance( ioParms.GetContext(), NULL));
		}
		done = true;
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getPattern( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getPattern( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}

void VJSApplicationGlobalObject::_getStorage( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getStorage( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}

void VJSApplicationGlobalObject::_getSettings( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getSettings( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getDirectory( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getDirectory( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getInternal( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getInternal( ioParms, application);
		}
		else
		{
			ioParms.ReturnValue( VRIAServerJSCore::CreateInstance( ioParms.GetContext(), NULL));
		}
		done = true;
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getPermissions( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getPermissions( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}



// ----------------------------------------------------------------------------



void VJSApplication::Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inApplication)
{
	inApplication->Retain();
}


void VJSApplication::Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inApplication)
{
	inApplication->Release();
}


void VJSApplication::GetProperty( VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VString propName;

	if (ioParms.GetPropertyName( propName))
	{
		VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
		CDB4DBaseContext *baseContext = (riaContext != NULL) ? riaContext->GetBaseContext() : NULL;
		CDB4DManager *db4d = VRIAServerApplication ::Get()->GetComponentDB4D();
		if (propName.EqualToString( kSSJS_PROPERTY_NAME_Database, true) || propName.EqualToString( kSSJS_PROPERTY_NAME_DataStore, true))
		{
			if (db4d != NULL && baseContext != NULL)
			{				
				ioParms.ReturnValue( db4d->CreateJSDatabaseObject( ioParms.GetContext(), baseContext));
			}
			else
			{
				ioParms.ReturnUndefinedValue();
			}
		}
		else
		{
			if (db4d != NULL && baseContext != NULL)
			{
				// sc 25/11/2011, return nothing for unhandled properties cause the static value callback to be called
				VJSValue result( db4d->CreateJSEMObject( propName, ioParms.GetContext(), baseContext));
				if (!result.IsNull() && !result.IsUndefined())
					ioParms.ReturnValue( result);
			}
		}
	}
}


bool VJSApplication::SetProperty( VJSParms_setProperty& ioParms, VRIAServerProject* inApplication)
{
	return false;
}


void VJSApplication::GetPropertyNames( VJSParms_getPropertyNames& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
	CDB4DBaseContext *baseContext = (riaContext != NULL) ? riaContext->GetBaseContext() : NULL;
	if (baseContext != NULL)
	{
		ioParms.AddPropertyName( kSSJS_PROPERTY_NAME_Database);
		ioParms.AddPropertyName( kSSJS_PROPERTY_NAME_DataStore);
	}
}


void VJSApplication::GetDefinition( ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ kSSJS_PROPERTY_NAME_AddHttpRequestHandler, js_callStaticFunction<_addHttpRequestHandler>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_RemoveHttpRequestHandler, js_callStaticFunction<_removeHttpRequestHandler>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_GetFolder, js_callStaticFunction<_getFolder>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_GetSettingFile, js_callStaticFunction<_getSettingFile>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_GetWalibFolder, js_callStaticFunction<_getWalibFolder>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_GetItemsWithRole, js_callStaticFunction<_getItemsWithRole>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "reloadModel", js_callStaticFunction<_reloadModel>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_verifyDataStore, js_callStaticFunction<_verifyDataStore>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_repairDataStore, js_callStaticFunction<_repairInto>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_compactDataStore, js_callStaticFunction<_compactInto>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getLastBackups", js_callStaticFunction<_getLastBackups>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getJobManager", js_callStaticFunction<_getJobManager>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getBackupSettings", js_callStaticFunction<_getBackupSettings>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "integrateDataStoreJournal", js_callStaticFunction<_integrateDataStoreJournal>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "restoreDataStore", js_callStaticFunction<_restoreDataStore>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "parseJournal", js_callStaticFunction<_parseJournal>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
	
		{ kSSJS_PROPERTY_NAME_loginByKey, js_callStaticFunction<_login>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_loginByPassword, js_callStaticFunction<_unsecureLogin>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_createUserSession, js_callStaticFunction<_createUserSession>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_currentUser, js_callStaticFunction<_getCurrentUser>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_currentSession, js_callStaticFunction<_getConnectionSession>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_getUserSessions, js_callStaticFunction<_getUserSessions>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getSession", js_callStaticFunction<_getSession>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_logout, js_callStaticFunction<_logout>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};
	
	static inherited::StaticValue values[] =
	{
		{ kSSJS_PROPERTY_NAME_Solution, js_getProperty<_getSolution>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Name, js_getProperty<_getName>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Administrator, js_getProperty<_getIsAdministrator>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_HTTPServer, js_getProperty<_getHttpServer>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Console, js_getProperty<_getConsole>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Pattern, js_getProperty<_getPattern>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Storage, js_getProperty<_getStorage>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Settings, js_getProperty<_getSettings>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Directory, js_getProperty<_getDirectory>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Internal, js_getProperty<_getInternal>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Permissions, js_getProperty<_getPermissions>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_wildchar, js_getProperty<_getWildChar>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0,0}
	};

	outDefinition.className = kSSJS_CLASS_NAME_Application;
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.getProperty = js_getProperty<GetProperty>;
	outDefinition.setProperty = js_setProperty<SetProperty>;
	outDefinition.getPropertyNames = js_getPropertyNames<GetPropertyNames>;
	outDefinition.staticFunctions = functions;
	outDefinition.staticValues = values;
}


CUAGSession* MakeDefaultSessionIfEmpty(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	CUAGSession* session = nil;
	VJSContext jsContext(ioParms.GetContext());
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
	if (rtContext != NULL)
	{
		session = rtContext->RetainUAGSession();
		if (session == NULL)
		{
			VError err = VE_OK;
			CUAGDirectory* directory = inApplication->RetainUAGDirectory(&err);
			if (directory != NULL)
			{
				session = directory->MakeDefaultSession(nil, (VJSContext*)&(ioParms.GetContext()));
				rtContext->SetUAGSession(session, true);
			}
			QuickReleaseRefCountable(directory);
		}
	}
	return session;
}


void VJSApplication::_createUserSession( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VError err = VE_OK;
	CUAGDirectory* directory = inApplication->RetainUAGDirectory(&err);
	if (directory != nil)
	{
		VJSObject sessionobj(ioParms.GetContext());
		if (ioParms.GetParamObject(1, sessionobj))
		{
			VJSONObject* reqinfo = nil;
			VJSContext jsContext(ioParms.GetContext());
			VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
			CUAGSession* oldsession = rtContext->RetainUAGSession();
			if (oldsession != NULL)
			{
				reqinfo = oldsession->RetainRequestInfo();
			}

			CUAGSession* session = directory->OpenSession(&sessionobj, &err, &jsContext, reqinfo);
			if (session != nil)
			{
				rtContext->SetUAGSession(session, true);
				ioParms.ReturnValue(session->CreateJSSessionObject(ioParms.GetContext()));
				session->Release();
				if (oldsession != nil)
					oldsession->forceExpire();
			}
			QuickReleaseRefCountable(oldsession);
			QuickReleaseRefCountable(reqinfo);
		}
		else
			vThrowError( VE_JVSC_WRONG_PARAMETER_TYPE_OBJECT, "1");
		directory->Release();
	}

}


void VJSApplication::_unsecureLogin( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VString username;
	VString password;
	bool result = false;

	VError err = VE_OK;
	CUAGDirectory* directory = inApplication->RetainUAGDirectory(&err);
	sLONG nbsecs = 0;
	if (ioParms.CountParams() > 2)
		ioParms.GetLongParam(3, &nbsecs);
	if (nbsecs <= 0)
		nbsecs = 60 * 60; // 1 hour

	if (directory != nil)
	{
		StErrorContextInstaller errs(false);
		ioParms.GetStringParam(1, username);
		ioParms.GetStringParam(2, password);
		VJSONObject* reqinfo = nil;
		
		VJSContext jsContext(ioParms.GetContext());
		VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
		CUAGSession* oldsession = rtContext->RetainUAGSession();
		if (oldsession != NULL)
		{
			reqinfo = oldsession->RetainRequestInfo();
		}		

		CUAGSession* session = directory->OpenSession(username, password, nil, (VJSContext*)&(ioParms.GetContext()), false, reqinfo);
		if (session != nil)
		{
			session->SetLifeTime(nbsecs);
			VJSContext jsContext(ioParms.GetContext());

			VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
			if (rtContext != NULL)
			{
				rtContext->SetUAGSession(session, true);
			}
			if (oldsession != nil)
				oldsession->forceExpire();

			session->Release();
			result = true;
		}
		QuickReleaseRefCountable(oldsession);
		QuickReleaseRefCountable(reqinfo);
	}
	ioParms.ReturnBool(result);

	QuickReleaseRefCountable(directory);
}


void VJSApplication::_login( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VString username;
	VString inHa1;
	bool result = false;
	VError err = VE_OK;
	CUAGDirectory* directory = inApplication->RetainUAGDirectory(&err);
	sLONG nbsecs = 0;
	if (ioParms.CountParams() > 2)
		ioParms.GetLongParam(3, &nbsecs);
	if (nbsecs <= 0)
		nbsecs = 60 * 60; // 1 hour	

	if (directory != nil)
	{
		StErrorContextInstaller errs(false);
		ioParms.GetStringParam(1, username);
		ioParms.GetStringParam(2, inHa1);
		VJSONObject* reqinfo = nil;
		
		VJSContext jsContext(ioParms.GetContext());
		VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext(jsContext);
		CUAGSession* oldsession = rtContext->RetainUAGSession();
		if (oldsession != NULL)
		{
			reqinfo = oldsession->RetainRequestInfo();
		}		

		CUAGSession* session = directory->OpenSession(username, inHa1, nil, (VJSContext*)&(ioParms.GetContext()), true, reqinfo);
		if (session != nil)
		{
			session->SetLifeTime(nbsecs);
			VJSContext jsContext(ioParms.GetContext());

			VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
			if (rtContext != NULL)
			{
				rtContext->SetUAGSession(session, true);
			}
			if (oldsession != nil)
				oldsession->forceExpire();

			session->Release();
			result = true;
		}

		QuickReleaseRefCountable(oldsession);
		QuickReleaseRefCountable(reqinfo);

	}
	ioParms.ReturnBool(result);

	QuickReleaseRefCountable(directory);
}


void VJSApplication::_getUserSessions( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VJSArray result(ioParms.GetContext());
	VRIAHTTPSessionManager* sessionmgr = inApplication->RetainSessionMgr();
	if (sessionmgr != nil)
	{
		VError err = VE_OK;
		CUAGDirectory* directory = inApplication->RetainUAGDirectory(&err);
		if (directory != NULL)
		{
			VUUID userID; // may be null
			if (ioParms.CountParams() > 0)
			{
				CUAGUser* user = directory->RetainParamUser(ioParms, 1);
				if (user != nil)
				{
					user->GetID(userID);
					user->Release();
				}
				else
				{
					VString s;
					ioParms.GetStringParam(1, s);
					VUUID xid;
					xid.FromString(s);
					userID = xid;
				}
			}

			bool isadmin = true;
			VUUID adminID;
			CUAGUser* currentuser = nil;
			if (directory->GetSpecialGroupID(CUAGDirectory::AdminGroup, adminID))
			{
				CUAGSession* cursession = MakeDefaultSessionIfEmpty(ioParms, inApplication); // rtContext->RetainUAGSession();
				if (cursession != nil)
				{
					CUAGThreadPrivilege* privileges = static_cast<CUAGThreadPrivilege*>(ioParms.GetContext().GetGlobalObjectPrivateInstance()->GetSpecific('uagX'));
					isadmin = cursession->BelongsTo(adminID, privileges, true);
					currentuser = cursession->RetainUser();
					cursession->Release();
				}
				else
					isadmin = false;
			}
			VRIAHTTPSessionManager::SessionVector sessions;
			sessionmgr->RetainSessions(userID, sessions);
			for (VRIAHTTPSessionManager::SessionVector::iterator cur = sessions.begin(), end = sessions.end(); cur != end; ++cur)
			{
				CUAGSession* session = cur->Get();
				if (isadmin || session->Matches(currentuser))
					result.PushValue(session->CreateJSSessionObject(ioParms.GetContext()));
			}
			QuickReleaseRefCountable(currentuser);
			directory->Release();
		}
		sessionmgr->Release();
	}
	ioParms.ReturnValue(result);
}


void VJSApplication::_getSession( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	bool done = false;
	VString strSessionID;
	if (ioParms.GetStringParam( 1, strSessionID))
	{
		VRIAHTTPSessionManager* sessionMgr = inApplication->RetainSessionMgr();
		if (sessionMgr != NULL)
		{
			VUUID sessionID;
			sessionID.FromString( strSessionID);
			CUAGSession *session = sessionMgr->RetainSession( sessionID);
			if (session != NULL)
			{
				ioParms.ReturnValue( session->CreateJSSessionObject( ioParms.GetContext()));
				done = true;
				session->Release();
			}
			sessionMgr->Release();
		}
	}

	if (!done)
		ioParms.ReturnNullValue();
}


void VJSApplication::_logout( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VString username;
	bool result = false;

	CUAGSession* session = NULL;
	VJSContext jsContext(ioParms.GetContext());
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
	if (rtContext != NULL)
	{
		VError err = VE_OK;
		VJSONObject* reqinfo = nil;

		session = rtContext->RetainUAGSession();
		if (session != NULL)
		{
			reqinfo = session->RetainRequestInfo();
			session->forceExpire();
			VRIAHTTPSessionManager* sessionMgr = inApplication->RetainSessionMgr();
			if (sessionMgr != NULL)
			{
				sessionMgr->RemoveSession( session);
				sessionMgr->Release();
			}
		}
		ReleaseRefCountable( &session);

		CUAGDirectory* directory = inApplication->RetainUAGDirectory(&err);
		if (directory != NULL)
		{
			session = directory->MakeDefaultSession(nil, (VJSContext*)&(ioParms.GetContext()), true, reqinfo);
			directory->Release();
		}
		rtContext->SetUAGSession(session, true);
		QuickReleaseRefCountable(reqinfo);
		QuickReleaseRefCountable(session);
		result = true;
	}
	ioParms.ReturnBool(result);
}


void VJSApplication::_getCurrentUser( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VString username;
	bool ok = false;

	VJSContext jsContext(ioParms.GetContext());
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
	if (rtContext != NULL)
	{
		CUAGSession* session = MakeDefaultSessionIfEmpty(ioParms, inApplication); // rtContext->RetainUAGSession();
		if (session != nil)
		{
			CUAGUser* user = session->RetainUser();
			if (user != nil)
			{
				ioParms.ReturnValue(user->CreateJSUserObject(ioParms.GetContext()));
				ok = true;
				user->Release();
			}
			session->Release();
		}
	}

	if (!ok)
		ioParms.ReturnNullValue();
}


void VJSApplication::_getConnectionSession( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	bool ok = false;
	VJSContext jsContext(ioParms.GetContext());
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
	if (rtContext != NULL)
	{
		CUAGSession* session = MakeDefaultSessionIfEmpty(ioParms, inApplication); // rtContext->RetainUAGSession();
		if (session != nil)
		{
			ok = true;
			ioParms.ReturnValue(session->CreateJSSessionObject(ioParms.GetContext()));
			session->Release();
		}
	}
	if (!ok)
		ioParms.ReturnNullValue();
}


void callToolsOnDB(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication, bool isRepair)
{
	StErrorContextInstaller errs(false);
	bool ok = false;
	VFile* catalogFile = ioParms.RetainFileParam(1);
	VFile* dataFile = ioParms.RetainFileParam(2);
	VFile* outFile = ioParms.RetainFileParam(4);
	if (catalogFile != nil && dataFile != nil && outFile != nil &&  catalogFile->Exists() && dataFile->Exists())
	{
		VJSObject paramObj(ioParms.GetContext());
		if (ioParms.IsObjectParam(3))
		{
			ioParms.GetParamObject(3, paramObj);
		}
		else
			paramObj.MakeEmpty();

		CDB4DManager* db4D = CDB4DManager::RetainManager();
		VError err = VE_OK;
		CDB4DBase* newdb = db4D->OpenBase(*catalogFile, DB4D_Open_WithSeparateIndexSegment | DB4D_Open_As_XML_Definition | DB4D_Open_No_Respart, &err, FA_READ);
		if (err == VE_OK)
		{
			VJSContext jsContext(ioParms.GetContext());
			IDB4D_DataToolsIntf* toolintf = db4D->CreateJSDataToolsIntf(jsContext, paramObj);
			CDB4DRawDataBase* dataDB = db4D->OpenRawDataBaseWithEm(newdb, dataFile, toolintf, err, FA_READ);
			if (dataDB != nil)
			{
				/*
				if (outFile->Exists())
					err = outFile->Delete();
					*/
				err = db4D->EraseDataStore(outFile);
				if (err == VE_OK)
				{
					CDB4DBase* outDB = db4D->OpenBase(*catalogFile, DB4D_Open_WithSeparateIndexSegment | DB4D_Open_As_XML_Definition | DB4D_Open_No_Respart | DB4D_Open_DelayLoadIndex, &err);
					if (outDB != nil)
					{
						CDB4DBaseContext* dbcontext = NULL;
						CDB4DContext* ownercontext = nil;
						VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
						if (rtContext != NULL)
						{
							ownercontext = rtContext->RetainDB4DContext(inApplication);
							if (ownercontext != NULL)
							{
								dbcontext = ownercontext->RetainDataBaseContext(outDB, true);
								ownercontext->Release();
							}
						}

						if (outDB->CreateData(*outFile, DB4D_Create_WithSeparateIndexSegment | DB4D_Open_DelayLoadIndex, nil, dbcontext, &err, FA_READ_WRITE, dataDB))
						{
							err = dataDB->CompactInto(outDB, toolintf, false, false, true, true);
							outDB->Flush(true);
							if (err == VE_OK)
							{
								err = outDB->LoadIndexesAfterCompacting(0);
							}
							outDB->Flush(true);
							ok = err == VE_OK;
						}

						if (ownercontext != NULL)
							ownercontext->RemoveDataBaseContext(outDB);
						QuickReleaseRefCountable(dbcontext);
						//outDB->CloseAndRelease();
						outDB->Close();
						outDB->Release();
					}
					
				}
				dataDB->Release();
			}
			delete toolintf;
			newdb->Close();
		}
		QuickReleaseRefCountable(newdb);
		ReleaseRefCountable( &db4D);
	}	
	ioParms.ReturnBool(ok);
}

void VJSApplicationGlobalObject::_getBackupRegistry(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VJSArray arrayOfManifests(ioParms.GetContext());
	if(ioParms.IsObjectParam(1))
	{
		VFile* registryFile = NULL;
		VFolder* registryFolder = NULL;
		
		//false is to prevent RetailFXXParam() from converting the passed parameter to as string and trying to parse it as a path specification.
		//If you don't do this, the followign JS call: getBackupRegistry(new Folder("c:/MyFolder/"));
		//will cause RetailFileParam() to return a VFile with "[JSObject]" as path 
		registryFile = ioParms.RetainFileParam(1,false);
		if (registryFile == NULL)
		{
			registryFolder = ioParms.RetainFolderParam(1,false);
			if (registryFolder)
			{
				VFilePath path;
				registryFolder->GetPath( path);
				path.SetFileName(BackupRegistryName);
				//WAK0088009: pre-WAK9 projects used the wrong backup registry name. Now check if the registry with the correct filename exists. If not
				//use the former registry filename. When a backup is eventually performed, a registry with the correct name will be created.
				{
					XBOX::VFile test(path);
					if (!test.Exists())
					{
						path.SetFileName(FormerBackupRegistryName);
					}
				}
				registryFile = new VFile(path);
			}
		}

		if (registryFile && registryFile->Exists())
		{
			VFilePath path;
			CDB4DManager* db4D = NULL;
			registryFile->GetPath( path);
			db4D = CDB4DManager::RetainManager();
			IBackupTool* bkpt = db4D->CreateBackupTool();
			bkpt->ConvertBackupRegistryToJsObject(path,arrayOfManifests);
			delete bkpt;bkpt = NULL;
			XBOX::ReleaseRefCountable(&db4D);

			ioParms.ReturnValue(arrayOfManifests);
			done = true;
		}
		XBOX::ReleaseRefCountable(&registryFolder);
		XBOX::ReleaseRefCountable(&registryFile);
	}
	if (!done)
	{
		ioParms.ReturnNullValue();
	}
}

void VJSApplicationGlobalObject::_integrateDataStoreJournal(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_integrateDataStoreJournal(ioParms,application);
			done = true;
		}
	}
	if (!done)
	{
		ioParms.ReturnBool(false);
	}
}

void VJSApplicationGlobalObject::_restoreDataStore(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_restoreDataStore(ioParms,application);
			done = true;
		}
	}
	if (!done)
	{
		ioParms.ReturnNullValue();
	}
}

void VJSApplicationGlobalObject::_parseJournal(XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_parseJournal(ioParms,application);
			done = true;
		}
	}
	if (!done)
	{
		ioParms.ReturnNullValue();
	}
}






void VJSApplication::_getLastBackups( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	bool done = false;
	VJSArray arrayOfManifests(ioParms.GetContext());
	if(inApplication == NULL ||inApplication->GetDesignProject() == NULL )
	{
		ioParms.ReturnNullValue();
	}
	else
	{
		VProjectItem* backupsFolder = inApplication->GetDesignProject()->GetProjectItemFromTag(kBackupsTag);
		if(backupsFolder)
		{
			VFilePath path;
			CDB4DManager* db4D = NULL;
			backupsFolder->GetFilePath( path);

			path.SetFileName(BackupRegistryName);

			//WAK0088009: pre-WAK9 projects used the wrong backup registry name. Now check if the registry with the correct filename exists. If not
			//use the former registry filename. When a backup is eventually performed, a registry with the correct name will be created.
			{
				XBOX::VFile test(path);
				if (!test.Exists())
				{
					path.SetFileName(FormerBackupRegistryName);
				}
			}

			db4D = CDB4DManager::RetainManager();

			IBackupTool* bkpt = db4D->CreateBackupTool();
			bkpt->ConvertBackupRegistryToJsObject(path,arrayOfManifests);

			delete bkpt;bkpt = NULL;
			XBOX::ReleaseRefCountable(&db4D);
		}
		ioParms.ReturnValue(arrayOfManifests);
	}
}

void VJSApplication::_getBackupSettings( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	bool done = false;
	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
	CDB4DManager *db4d = VRIAServerApplication::Get()->GetComponentDB4D();

	if (inApplication)
	{
		IBackupSettings* settings = inApplication->RetainBackupSettings(riaContext,NULL);
		if (settings != NULL)
		{
			VJSObject settingsObj(ioParms.GetContext());
			settingsObj.MakeEmpty();
			settings->ToJSObject(settingsObj);
			ioParms.ReturnValue(settingsObj);
			done = true;
		}
		XBOX::ReleaseRefCountable(&settings);
		
	}
	if (!done)
		ioParms.ReturnUndefinedValue();
}

/**
 * \brief Restores an application data store using the specified backup
 * Syntax: application.restoreDataStore(File: manifest,Folder: destination [, options])
 * \param manifest a File object holding the backup manifest path to use for restoration
 * \param destination a Folder object indicating where the data store's data folder will be restored. If that
 * directory contains already a data folder the same will be renamed and returned in the response.
 * \param options standard progress options block and async callbacks

 * Response: a JS object 
 * <pre>
 * {
 *    ok: boolean,
 *    dataFolder: Folder(xxxx)
 * } 
 * </pre>
 * @c ok indicates true if the restoration went well and false otherwise.
 * @c dataFolder contains the new name of the former data folder that existed in @c destination (before restoration), if restoration went well. In other cases this parameter is undefined
 */
void VJSApplication::_restoreDataStore(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *riaContext = NULL;
	VFile* manifestFile(NULL);
	VFolder* destFolder(NULL);
	VError dbError = VE_OK;
	XBOX::VFilePath existingDataFolderNewPath,existingJournalNewPath;
	
	XBOX::StErrorContextInstaller errContext(true,true);
	
	riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);

	if (ioParms.IsObjectParam(1))
	{
		manifestFile = ioParms.RetainFileParam(1);
	}

	if (ioParms.IsObjectParam(2))
	{
		destFolder = ioParms.RetainFolderParam(2);
	}
	
	if(manifestFile == NULL || destFolder == NULL)
		dbError = vThrowError(VE_INVALID_PARAMETER);

	if (dbError == VE_OK)
	{
		VJSObject optionsObj(ioParms.GetContext());
		VJSContext jsContext(ioParms.GetContext());

		IDB4D_DataToolsIntf* toolintf = NULL;
		CDB4DManager* db4D = NULL;
		IBackupTool*  backupTool = NULL;
		
		if (ioParms.IsObjectParam(3))
		{
			ioParms.GetParamObject(3, optionsObj);
		}
		else
		{
			optionsObj.MakeEmpty();
		}
		
		dbError = VE_MEMORY_FULL;
		db4D = CDB4DManager::RetainManager();
		if (db4D)
		{
			toolintf = db4D->CreateJSDataToolsIntf(jsContext, optionsObj);
			backupTool = db4D->CreateBackupTool();
			if(backupTool)
			{
				dbError = VE_OK;
				const VFilePath& manifestPath = manifestFile->GetPath();
				const VFilePath& restoreFolderPath = destFolder->GetPath();

				bool ok = backupTool->RestoreDataFolder(manifestPath,restoreFolderPath,existingDataFolderNewPath,toolintf);
				if (ok )
				{
					ok =  backupTool->RestoreJournal(manifestPath,restoreFolderPath,existingJournalNewPath,toolintf);
				}
			}
		}
		delete backupTool;backupTool = NULL;
		delete toolintf;toolintf = NULL;
		XBOX::ReleaseRefCountable(&db4D);
	}

	XBOX::ReleaseRefCountable(&destFolder);
	XBOX::ReleaseRefCountable(&manifestFile);
	
	//Response: {ok:true|false[,dataFolder:Folder(xxxxx)][,journal:File(xxxx)]}
	{
		VJSObject statusObj(ioParms.GetContext());
		
		statusObj.MakeEmpty();
		statusObj.SetProperty(CVSTR("ok"),errContext.GetLastError() == VE_OK);
		if (!existingDataFolderNewPath.IsEmpty() 
			&& testAssert(existingDataFolderNewPath.IsValid() && existingDataFolderNewPath.IsFolder()))
		{
			VJSObject folderObj(ioParms.GetContext());
			folderObj.MakeFilePathAsFileOrFolder(existingDataFolderNewPath);
			statusObj.SetProperty(CVSTR("dataFolder"),folderObj);
		}
		if (!existingJournalNewPath.IsEmpty() 
			&& testAssert(existingJournalNewPath.IsValid() && existingJournalNewPath.IsFile()))
		{
			VJSObject fileObj(ioParms.GetContext());
			fileObj.MakeFilePathAsFileOrFolder(existingJournalNewPath);
			statusObj.SetProperty(CVSTR("journal"),fileObj);
		}
		ioParms.ReturnValue(statusObj);
	}
}

void  VJSApplication::_parseJournal(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *riaContext = NULL;
	VFile *journalFile(NULL), *destinationFile(NULL),*tableDefFile(NULL);
	VError err = VE_OK;
	bool done = false;
	VJSObject optionsObj(ioParms.GetContext());
	XBOX::StErrorContextInstaller errContext(true,true);
	//VJSArray arrayOfOps(ioParms.GetContext());


	if (!ioParms.IsObjectParam(1))
	{
		optionsObj.MakeEmpty();	
		//Journal is that of current application
		//Table dictionnary is that of current application
	}
	else
	{
		ioParms.GetParamObject(1,optionsObj);
		if(optionsObj.HasProperty(CVSTR("journal")))
		{
			VJSValue paramValue = optionsObj.GetProperty(CVSTR("journal"));
			if (paramValue.IsString())
			{
				XBOX::VString s;
				paramValue.GetString(s);
				journalFile = new VFile(s, FPS_POSIX);
			}
			else
			{
				journalFile = paramValue.GetFile();
				if (journalFile != NULL)
				{
					journalFile->Retain();
				}
				else
				{
					err = vThrowError(VE_DB4D_INVALID_PARAMETER, CVSTR("journal"));
				}
			}
		}

		if (optionsObj.HasProperty(CVSTR("tableDefinition")))
		{
			VJSValue paramValue = optionsObj.GetProperty(CVSTR("tableDefinition"));
			if (paramValue.IsString())
			{
				XBOX::VString s;
				paramValue.GetString(s);
				tableDefFile = new VFile(s, FPS_POSIX);
			}
			else
			{
				tableDefFile = paramValue.GetFile();
				if (tableDefFile != NULL)
				{
					tableDefFile->Retain();
				}
				else
				{
					err = vThrowError(VE_DB4D_INVALID_PARAMETER, CVSTR("tableDefinition"));
				}
			}
		}
		if(optionsObj.HasProperty(CVSTR("toFile")))
		{
			VJSValue paramValue = optionsObj.GetProperty(CVSTR("toFile"));
			if (paramValue.IsString())
			{
				XBOX::VString s;
				paramValue.GetString(s);
				destinationFile = new VFile(s, FPS_POSIX);
			}
			else
			{
				destinationFile = paramValue.GetFile();
				if (destinationFile != NULL)
				{
					destinationFile->Retain();
				}
				else
				{
					err = vThrowError(VE_DB4D_INVALID_PARAMETER, CVSTR("toFile"));
				}
			}
		}
	}

	if (errContext.GetLastError() == VE_OK)
	{
		//If no journal was specified and no tableDef was specified, use the application's WAKTDef file
		if ((journalFile == NULL) && (tableDefFile == NULL))
		{
			//Retrieve application's WAKTDef file
			const VProjectItem* dataFolder = inApplication->GetDesignProject()->GetProjectItemFromTag(kDataFolderTag);
			if (dataFolder != NULL)
			{
				XBOX::VFilePath path;
				dataFolder->GetFilePath(path);
				//WAK0089204 Sept 1st 2014, O.R.: use correct case for unices
				path.ToSubFile(CVSTR("data.WakTDef"));
				tableDefFile = new VFile(path);
				if (!tableDefFile->Exists())
					XBOX::ReleaseRefCountable(&tableDefFile);
			}
		}

		//If no journal was specified, use the application's WAKTDef
		if (journalFile == NULL)
		{
			bool hasJournal = false;
			XBOX::VFilePath path;
			inApplication->GetJournalingSettings(hasJournal, path);
			if (hasJournal)
			{
				journalFile = new VFile(path);
			}
			else
			{
				XBOX::VJSONArray* arrayOfOps = new VJSONArray();
				ioParms.ReturnJSONValue(XBOX::VJSONValue(arrayOfOps));
				XBOX::ReleaseRefCountable(&arrayOfOps);
				done = true;
			}
		}
		
		if (errContext.GetLastError() == VE_OK && (journalFile != NULL))
		{
			CDB4DManager* db4D = NULL;
			IJournalTool* tool = NULL;
			IDB4D_DataToolsIntf* toolintf = NULL;
			db4D = CDB4DManager::RetainManager();

			VJSContext jsContext(ioParms.GetContext());

			toolintf = db4D->CreateJSDataToolsIntf(jsContext, optionsObj);
			tool = db4D->CreateJournalTool();
			if(tool)
			{
				if (tableDefFile)
				{
					err = tool->Initialize(*tableDefFile);
				}
				if (errContext.GetLastError() == VE_OK)
				{
					if (destinationFile)
					{					
						done = tool->ParseJournalToText(*journalFile,*destinationFile,toolintf );
						if (done)
						{
							ioParms.ReturnFile(destinationFile);
						}
					}
					else
					{
						XBOX::VJSONArray* arrayOfOps = new VJSONArray();
						done = tool->ParseJournal(*journalFile, *arrayOfOps, toolintf);
						if (done)
						{
							XBOX::VJSONValue value(arrayOfOps);
							ioParms.ReturnJSONValue(value);
						}
						XBOX::ReleaseRefCountable(&arrayOfOps);
					}
				}
			}
			delete tool; tool = NULL;
			delete toolintf; toolintf = NULL;
			XBOX::ReleaseRefCountable(&db4D);
		}
	}
	XBOX::ReleaseRefCountable(&destinationFile);
	XBOX::ReleaseRefCountable(&journalFile);
	XBOX::ReleaseRefCountable(&tableDefFile);

	if(!done)
		ioParms.ReturnNullValue();
}

void VJSApplication::_integrateDataStoreJournal(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *riaContext = NULL;
	VFile* catalogFile(NULL),*dataFile(NULL),*journalFile(NULL);
	VFile** params[3] = {&catalogFile,&dataFile,&journalFile};
	uLONG8 fromOperation = 0, upToOperation = 0,operationCount = 0;
	VError dbError = VE_OK;
	XBOX::StErrorContextInstaller errContext(true,true);
	
	riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);

	if (ioParms.IsObjectParam(1))
	{
		catalogFile = ioParms.RetainFileParam(1);
	}
	if (ioParms.IsObjectParam(2))
	{
		dataFile = ioParms.RetainFileParam(2);
	}
	if (ioParms.IsObjectParam(3))
	{
		journalFile = ioParms.RetainFileParam(3);
	}

	if(catalogFile == NULL)
		vThrowError(VE_DB4D_INVALID_PARAMETER,CVSTR("model"));

	if(dataFile == NULL)
		vThrowError(VE_DB4D_INVALID_PARAMETER,CVSTR("data"));
	
	if( journalFile == NULL )
		vThrowError(VE_DB4D_INVALID_PARAMETER,CVSTR("journal"));

	if (errContext.GetLastError() == VE_OK)
	{
		VJSObject optionsObj(ioParms.GetContext());
		VJSContext jsContext(ioParms.GetContext());

		if (ioParms.IsObjectParam(4))
		{
			ioParms.GetParamObject(4, optionsObj);
			bool exists = false;
			upToOperation = optionsObj.GetPropertyAsLong(CVSTR("upToOperation"),NULL,&exists);
			if(!exists)
				upToOperation = 0;
			fromOperation = optionsObj.GetPropertyAsLong(CVSTR("fromOperation"),NULL,&exists);
			if (optionsObj.HasProperty(CVSTR("resultDataFile")))
			{
				VJSValue val(ioParms.GetContext());

				val = optionsObj.GetProperty(CVSTR("resultDataFile"));
				if (!val.IsNull() && val.IsObject())
				{
					XBOX::VFilePath path;
					VFile* workingFile = val.GetFile();
					if (workingFile)
					{
						const VFilePath& path1 = dataFile->GetPath();
						const VFilePath& path2 = workingFile->GetPath();
						if (path1 != path2)
						{
							dbError = dataFile->CopyTo(*workingFile,XBOX::FCP_Overwrite);
							if (dbError == VE_OK)
							{
								XBOX::ReleaseRefCountable(&dataFile);
								dataFile = XBOX::RetainRefCountable(workingFile);
								workingFile = NULL; //obtained using Get() instead of Retain
							}
							else
							{
								vThrowError(dbError);
							}
						}
					}
				}
			}
			
		}
		else
		{
			optionsObj.MakeEmpty();
		}
		if (errContext.GetLastError() == VE_OK)
		{
			IDB4D_DataToolsIntf* toolintf = NULL;
			CDB4DBaseContext *baseContext = NULL;
			CDB4DBase* base = NULL;
			CDB4DManager* db4D = NULL;
			VProgressIndicatorBrigdeToIDB4DToolInterface* progressIndicator = NULL;
			
			//WAK0082217, O.R. June 26th 2013, DB4D_Open_No_Respart required in that case so that the base be opened
			//in "Wakanda Mode", otherwise when closing the db, a crash will occur
			sLONG flags = DB4D_Open_WithSeparateIndexSegment | DB4D_Open_As_XML_Definition | DB4D_Open_No_Respart ;

			db4D = CDB4DManager::RetainManager();
			toolintf = db4D->CreateJSDataToolsIntf(jsContext, optionsObj);
			progressIndicator = new VProgressIndicatorBrigdeToIDB4DToolInterface(toolintf);

			baseContext = (riaContext != NULL) ? riaContext->GetBaseContext() : NULL;
		
			base = db4D->OpenBase( *catalogFile, flags, NULL,XBOX::FA_READ_WRITE, NULL,NULL,NULL);
			if(base && errContext.GetLastError() == VE_OK)
			{
				flags = DB4D_Open_WithSeparateIndexSegment | DB4D_Open_WITHOUT_JournalFile;
				base->OpenData( *dataFile, flags, baseContext, NULL,XBOX::FA_READ_WRITE);
				if (errContext.GetLastError() == VE_OK)
				{
					while (base->StillIndexing())
					{
						VTask::Sleep(20);
					}

					CDB4DJournalParser* journalParser = NULL;
					uLONG8 totalOperationCount = 0;

					journalParser = db4D->NewJournalParser();

					dbError = journalParser->Init( journalFile, totalOperationCount, progressIndicator );
					if(dbError == VE_OK)
					{
						operationCount = 0;
						dbError = base->IntegrateJournal(journalParser, fromOperation, upToOperation, &operationCount, progressIndicator);
					}
					XBOX::ReleaseRefCountable( &journalParser);
				}
				base->CloseAndRelease(true);
				base = NULL;
			}
			xbox_assert(base == NULL);
			XBOX::ReleaseRefCountable(&progressIndicator);
			delete toolintf; toolintf = NULL;
			XBOX::ReleaseRefCountable(&db4D);
		}
	}
	XBOX::ReleaseRefCountable(&journalFile);
	XBOX::ReleaseRefCountable(&dataFile);
	XBOX::ReleaseRefCountable(&catalogFile);

	if (errContext.GetLastError() == VE_OK)
	{
		VJSObject statusObj(ioParms.GetContext());
		statusObj.MakeEmpty();
		statusObj.SetProperty(CVSTR("fromOperation"),static_cast<sLONG8>(fromOperation));
		statusObj.SetProperty(CVSTR("upToOperation"),static_cast<sLONG8>(upToOperation));
		statusObj.SetProperty(CVSTR("operationCount"),static_cast<sLONG8>(operationCount));
		ioParms.ReturnValue(statusObj);
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}

void VJSApplication::_verifyDataStore( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	StErrorContextInstaller errs(false);
	bool ok = false;
	VFile* catalogFile = ioParms.RetainFileParam(1);
	VFile* dataFile = ioParms.RetainFileParam(2);
	if (catalogFile != nil && dataFile != nil && catalogFile->Exists() && dataFile->Exists())
	{
		VJSObject paramObj(ioParms.GetContext());
		if (ioParms.IsObjectParam(3))
		{
			ioParms.GetParamObject(3, paramObj);
		}
		else
			paramObj.MakeEmpty();

		CDB4DManager* db4D = CDB4DManager::RetainManager();
		VError err = VE_OK;
		CDB4DBase* newdb = db4D->OpenBase(*catalogFile, DB4D_Open_WithSeparateIndexSegment | DB4D_Open_As_XML_Definition | DB4D_Open_No_Respart, &err, FA_READ);
		if (err == VE_OK)
		{
			VJSContext jsContext(ioParms.GetContext());
			IDB4D_DataToolsIntf* toolintf = db4D->CreateJSDataToolsIntf(jsContext, paramObj);
			CDB4DRawDataBase* dataDB = db4D->OpenRawDataBaseWithEm(newdb, dataFile, toolintf, err, FA_READ);
			if (dataDB != nil)
			{
				err = dataDB->CheckAll(toolintf);
				ok = err == VE_OK;
				dataDB->Release();
			}
			newdb->Close();
			delete toolintf;
		}
		QuickReleaseRefCountable( newdb);
		ReleaseRefCountable( &db4D);
	}
	ioParms.ReturnBool(ok);
}


void VJSApplication::_repairInto( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	callToolsOnDB(ioParms, inApplication, true);
}


void VJSApplication::_compactInto( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	callToolsOnDB(ioParms, inApplication, false);
}


void VJSApplication::_addHttpRequestHandler( VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VError err = VE_UNKNOWN_ERROR;
	StErrorContextInstaller errContext(false);
	
	VString httpPattern, param, function;
	if (ioParms.GetStringParam( 1, httpPattern) && ioParms.GetStringParam( 2, param) && ioParms.GetStringParam( 3, function))
	{
		if (!param.IsEmpty() && !function.IsEmpty())
		{
			VFilePath path;
			VString extension;
			IRIAJSCallback *callback = NULL;
			VJSRequestHandler *handler = NULL;
		
			inApplication->BuildPathFromRelativePath( path, param, FPS_POSIX);
			path.GetExtension( extension);

			if (extension.IsEmpty())
			{
				// It's a module path
				VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);

				callback = new VRIAJSCallbackModuleFunction( param, function);
				handler = inApplication->AddJSHTTPRequestHandler( err, riaContext, httpPattern, callback);
			}
			else
			{
				if (path.IsFile())
				{
					VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);

					callback = new VRIAJSCallbackGlobalFunction( function);
					VJSRequestHandler *handler = inApplication->AddJSHTTPRequestHandler( err, riaContext, httpPattern, callback);
					
					if (handler != NULL)
					{
						VFile *file = new VFile( path);
						handler->RegisterIncludedFile( file);
						QuickReleaseRefCountable( file);
					}
				}
			}

			QuickReleaseRefCountable( handler);
			QuickReleaseRefCountable( callback);
		}
	}

	if (err != VE_OK)
		vThrowError( VE_RIA_JS_CANNOT_ADD_REQUEST_HANDLER);
}


void VJSApplication::_removeHttpRequestHandler( VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VError err = VE_UNKNOWN_ERROR;
	StErrorContextInstaller errContext(false);
	
	VString httpPattern, param, function;
	if (ioParms.GetStringParam( 1, httpPattern) && ioParms.GetStringParam( 2, param) && ioParms.GetStringParam( 3, function))
	{
		IRIAJSCallback *callback = NULL;

		if (param.BeginsWith( L"Modules/", false))
		{
			param.SubString( 9, param.GetLength());
			if (!param.IsEmpty() && !httpPattern.IsEmpty() && !function.IsEmpty())
			{
				callback = new VRIAJSCallbackModuleFunction( param, function);
			}
		}
		else
		{
			VFilePath path;
			inApplication->BuildPathFromRelativePath( path, param, FPS_POSIX);

			if (path.IsFile() && !httpPattern.IsEmpty() && !function.IsEmpty())
			{
				callback = new VRIAJSCallbackGlobalFunction( function);
			}
		}

		VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
		err = inApplication->RemoveJSHTTPRequestHandler( riaContext, httpPattern, callback);
		QuickReleaseRefCountable( callback);
	}

	if (err != VE_OK)
		vThrowError( VE_RIA_JS_CANNOT_REMOVE_REQUEST_HANDLER);
}


void VJSApplication::_getFolder( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VFolder *folder = inApplication->RetainFolder();
	JSReturnFolder( folder, ioParms, 1, 2);
	ReleaseRefCountable( &folder);
}


void VJSApplication::_getSettingFile( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VFilePath settingFilePath;
	VString settingID;
	VFolder *folder = inApplication->RetainFolder();

	if (ioParms.GetStringParam( 1, settingID))
	{
		const VRIASettingsFile *settingFile = inApplication->RetainSettingsFile( settingID);
		if (settingFile != NULL)
		{
			settingFile->GetFilePath( settingFilePath);
			settingFile->Release();
		}
	}
	
	JSReturnFolderOrFile( settingFilePath, folder->GetFileSystem(), ioParms, 2, 3);

	QuickReleaseRefCountable( folder);
}


void VJSApplication::_getWalibFolder( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VFolder *folder = VRIAServerApplication::Get()->GetFileSystemNamespace()->RetainFileSystemRootFolder( CVSTR( "WALIB"));
	JSReturnFolder( folder, ioParms, 1, 2);
	ReleaseRefCountable( &folder);
}


void VJSApplication::_getItemsWithRole( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	bool done = false;
	VString tag;
	if (ioParms.GetStringParam( 1, tag))
	{
		VectorOfProjectItems itemsVector;
		inApplication->GetDesignProject()->GetProjectItemsFromTag( tag, itemsVector);

		if (!itemsVector.empty())
		{
			if (itemsVector.size() == 1)
			{
				VProjectItem *projectItem = *itemsVector.begin();
				if (projectItem != NULL)
				{
					VFilePath path;
					projectItem->GetFilePath( path);
					ioParms.ReturnFilePathAsFileOrFolder( path);
					done = true;
				}
			}
			else
			{
				VJSArray result( ioParms.GetContext());

				for (VectorOfProjectItemsIterator iter = itemsVector.begin() ; iter != itemsVector.end() ; ++iter)
				{
					VProjectItem *projectItem = *iter;
					if (projectItem != NULL)
					{
						VFilePath path;
						projectItem->GetFilePath( path);
						result.PushFilePathAsFileOrFolder( path);
					}
				}

				ioParms.ReturnValue( result);
				done = true;
			}
		}
	}

	if (!done)
		ioParms.ReturnNullValue();
}


void VJSApplication::_reloadModel( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VReloadCatalogMessage *msg = new VReloadCatalogMessage( inApplication);
	if (msg != NULL)
	{
		VRIAServerApplication::Get()->PostMessage( msg);
		msg->Release();
	}
}


void VJSApplication::_getSolution( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	// sc 16/01/2014, returns "solution" property of global object intead of create a new one
	// ioParms.ReturnValue( VJSSolution::CreateInstance( ioParms.GetContext(), inApplication->GetSolution()));
	ioParms.ReturnValue( ioParms.GetContext().GetGlobalObject().GetProperty( "solution"));
}


void VJSApplication::_getName( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VString name;
	inApplication->GetName( name);
	ioParms.ReturnString( name);
}


void VJSApplication::_getWildChar( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VString s;
	s.AppendUniChar(ioParms.GetWildChar());
	ioParms.ReturnString( s);
}




void VJSApplication::_getIsAdministrator( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnBool( inApplication->IsAdministrator());
}


void VJSApplication::_getHttpServer( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	XBOX::VJSObject	addHandlerObject(ioParms.GetContext()), removeHandlerObject(ioParms.GetContext());

	addHandlerObject.MakeCallback(js_callback<void, XBOX::VJSWebSocketHandler::AddHandler>);
	removeHandlerObject.MakeCallback(js_callback<void, XBOX::VJSWebSocketHandler::RemoveHandler>);

	XBOX::VJSObject	constructedObject	= VJSHTTPServer::CreateInstance(ioParms.GetContext(), inApplication);
	
	constructedObject.SetProperty("addWebSocketHandler", addHandlerObject, XBOX::JS4D::PropertyAttributeReadOnly | XBOX::JS4D::PropertyAttributeDontDelete);
	constructedObject.SetProperty("removeWebSocketHandler", removeHandlerObject, XBOX::JS4D::PropertyAttributeReadOnly | XBOX::JS4D::PropertyAttributeDontDelete);

	ioParms.ReturnValue(constructedObject);
}


void VJSApplication::_getConsole( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue( VJSConsole::CreateInstance( ioParms.GetContext(), inApplication));
}


void VJSApplication::_getPattern( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VString pattern;
	inApplication->GetPattern( pattern);
	ioParms.ReturnString( pattern);
}

void VJSApplication::_getStorage(XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue(VJSStorageClass::CreateInstance(ioParms.GetContext(), inApplication->GetApplicationStorage()));
}

void VJSApplication::_getSettings(XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue(VJSStorageClass::CreateInstance(ioParms.GetContext(), inApplication->GetApplicationSettings()));
}


void VJSApplication::_getDirectory(XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VError err = VE_OK;
	CUAGDirectory* directory = inApplication->RetainUAGDirectory(&err);
	if (directory)
	{				
		ioParms.ReturnValue( directory->CreateJSDirectoryObject( ioParms.GetContext()));
		directory->Release();
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}


void VJSApplication::_getInternal( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue( VRIAServerJSCore::CreateInstance( ioParms.GetContext(), inApplication));
}


void VJSApplication::_getPermissions( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
	VRIAPermissions *permissions = inApplication->RetainPermissions( riaContext, NULL);
	if (permissions != NULL)
	{
		ioParms.ReturnValue( VJSPermissions::CreateInstance( ioParms.GetContext(), permissions));
		permissions->Release();
	}
	else
	{
		ioParms.ReturnUndefinedValue();
	}
}
