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

#include "testHighLevelAPI.h"

#include "SQLModel/VSQLModel.h"

#include "testConnectivityParams.h"


USING_TOOLBOX_NAMESPACE


void testHighLevelAPI_Find()
{
	DebugMsg ( "\n------------- testHighLevelAPI_Find -------------\n" );

    CSQLConnector* connector = ( CSQLConnector* ) VComponentManager::RetainComponent ( 'MYSQ', 'SQL ' );

    if ( connector == NULL )
    {
        DebugMsg ( "Connector MySQL not loaded!!\n" );

        return;
    }

    VJSONObject* params = new VJSONObject();

    params->SetProperty ( "hostname",	MYSQL_HOST );

    params->SetProperty ( "user",		MYSQL_USER );

    params->SetProperty ( "password",	MYSQL_CORRECT_PASSWORD );

    params->SetProperty ( "database",	MYSQL_DATABASE );

    params->SetProperty ( "port",		MYSQL_PORT );

    params->SetProperty ( "ssl",		MYSQL_SSL_FALSE );

    ISQLSession* session = connector->CreateSession ( params );

    ReleaseRefCountable ( &params );

    if ( session == NULL )
    {
        DebugMsg ( "Connection Failed!!\n" );

        ReleaseRefCountable ( &connector );

        return;
    }

    VString fields = CVSTR ( "id, matricule, first_name, last_name, date_of_birth" );

    VString table = CVSTR ( "people" );

    VJSONObject* whereClause = new VJSONObject;

    whereClause->SetProperty ( "id", VJSONValue ( 12 ) );

    ISQLRow* row = session->Find ( fields, table, whereClause );

    ReleaseRefCountable ( &whereClause );

    if ( row != NULL )
    {
        DebugMsg ( "id = %V, ", row->GetNthValue ( 1 ) );

        DebugMsg ( "matricule = %V, ", row->GetNthValue ( 2 ) );

        DebugMsg ( "first_name = %V, ", row->GetNthValue ( 3 ) );

        DebugMsg ( "last_name = %V, ", row->GetNthValue ( 4 ) );

        DebugMsg ( "date_of_birth = %V, ", row->GetNthValue ( 5 ) );

        DebugMsg ( "\n" );

        ReleaseRefCountable ( &row );
    }



    ReleaseRefCountable ( &session );

    ReleaseRefCountable ( &connector );

	DebugMsg ( "\n------------- testHighLevelAPI_Find -------------\n" );
}


void testHighLevelAPI_Select()
{
	DebugMsg ( "\n------------- testHighLevelAPI_Select -------------\n" );

    CSQLConnector* connector = ( CSQLConnector* ) VComponentManager::RetainComponent ( 'MYSQ', 'SQL ' );

    if ( connector == NULL )
    {
        DebugMsg ( "Connector MySQL not loaded!!\n" );

        return;
    }

    VJSONObject* params = new VJSONObject();

    params->SetProperty ( "hostname",	MYSQL_HOST );

    params->SetProperty ( "user",		MYSQL_USER );

    params->SetProperty ( "password",	MYSQL_CORRECT_PASSWORD );

    params->SetProperty ( "database",	MYSQL_DATABASE );

    params->SetProperty ( "port",		MYSQL_PORT );

    params->SetProperty ( "ssl",		MYSQL_SSL_FALSE );

    ISQLSession* session = connector->CreateSession ( params );

    ReleaseRefCountable ( &params );

    if ( session == NULL )
    {
        DebugMsg ( "Connection Failed!!\n" );

        ReleaseRefCountable ( &connector );

        return;
    }

	VString fields = CVSTR ( "id, matricule, first_name, last_name, date_of_birth" );

    VString table = CVSTR ( "people" );

    VJSONObject* whereClause = new VJSONObject;

    whereClause->SetProperty ( "matricule", VJSONValue ( 120 ) );

	ISQLResultSet* res = session->Select(fields, table, whereClause);

	ReleaseRefCountable ( &whereClause );

	if(res != NULL)
	{
		while(!res->IsEOF())
		{
			ISQLRow* row = res->RetainNextRow();

			if ( row != NULL )
			{
				DebugMsg ( "id = %V, ", row->GetNthValue ( 1 ) );

				DebugMsg ( "matricule = %V, ", row->GetNthValue ( 2 ) );

				DebugMsg ( "first_name = %V, ", row->GetNthValue ( 3 ) );

				DebugMsg ( "last_name = %V, ", row->GetNthValue ( 4 ) );

				DebugMsg ( "date_of_birth = %V, ", row->GetNthValue ( 5 ) );

				DebugMsg ( "\n" );

				ReleaseRefCountable ( &row );
			}
		}
	}
	else
	{
		DebugMsg ( "Select returns null resultset!!\n" );
	}

	ReleaseRefCountable ( &res );

    ReleaseRefCountable ( &session );

    ReleaseRefCountable ( &connector );

	DebugMsg ( "\n------------- testHighLevelAPI_Select -------------\n" );

}


void testHighLevelAPI_Update()
{
	DebugMsg ( "\n------------- testHighLevelAPI_Update -------------\n" );

    CSQLConnector* connector = ( CSQLConnector* ) VComponentManager::RetainComponent ( 'MYSQ', 'SQL ' );

    if ( connector == NULL )
    {
        DebugMsg ( "Connector MySQL not loaded!!\n" );

        return;
    }

    VJSONObject* params = new VJSONObject();

    params->SetProperty ( "hostname",	MYSQL_HOST );

    params->SetProperty ( "user",		MYSQL_USER );

    params->SetProperty ( "password",	MYSQL_CORRECT_PASSWORD );

    params->SetProperty ( "database",	MYSQL_DATABASE );

    params->SetProperty ( "port",		MYSQL_PORT );

    params->SetProperty ( "ssl",		MYSQL_SSL_FALSE );

    ISQLSession* session = connector->CreateSession ( params );

    ReleaseRefCountable ( &params );

    if ( session == NULL )
    {
        DebugMsg ( "Connection Failed!!\n" );

        ReleaseRefCountable ( &connector );

        return;
    }

    VString table = CVSTR ( "people" );

	VJSONObject* newFields = new VJSONObject;

	newFields->SetProperty ( "first_name", VJSONValue ( "abcd" ) );

	newFields->SetProperty ( "last_name", VJSONValue ( "efgh" ) );

    VJSONObject* whereClause = new VJSONObject;

    whereClause->SetProperty ( "id", VJSONValue ( 12 ) );

    ISQLResultSet* res = session->Update ( table, newFields, whereClause );

	ReleaseRefCountable ( &newFields );

    ReleaseRefCountable ( &whereClause );

	if(res != NULL)
	{
		DebugMsg("affected rows count = %d\n", res->GetAffectedRowCount());

		ReleaseRefCountable ( &res );
	}

    ReleaseRefCountable ( &session );

    ReleaseRefCountable ( &connector );

	DebugMsg ( "\n------------- testHighLevelAPI_Update -------------\n" );
}

void testHighLevelAPI_Insert()
{
	DebugMsg ( "\n------------- testHighLevelAPI_Insert -------------\n" );

    CSQLConnector* connector = ( CSQLConnector* ) VComponentManager::RetainComponent ( 'MYSQ', 'SQL ' );

    if ( connector == NULL )
    {
        DebugMsg ( "Connector MySQL not loaded!!\n" );

        return;
    }

    VJSONObject* params = new VJSONObject();

    params->SetProperty ( "hostname",	MYSQL_HOST );

    params->SetProperty ( "user",		MYSQL_USER );

    params->SetProperty ( "password",	MYSQL_CORRECT_PASSWORD );

    params->SetProperty ( "database",	MYSQL_DATABASE );

    params->SetProperty ( "port",		MYSQL_PORT );

    params->SetProperty ( "ssl",		MYSQL_SSL_FALSE );

    ISQLSession* session = connector->CreateSession ( params );

    ReleaseRefCountable ( &params );

    if ( session == NULL )
    {
        DebugMsg ( "Connection Failed!!\n" );

        ReleaseRefCountable ( &connector );

        return;
    }

    VString table = CVSTR ( "people" );

	VJSONObject* newEntity = new VJSONObject;

	newEntity->SetProperty("id",			VJSONValue ( 1000001 ));

	newEntity->SetProperty("matricule",		VJSONValue ( 123 ));

	newEntity->SetProperty("first_name",	VJSONValue ( "Super" ));

	newEntity->SetProperty("last_name",		VJSONValue ( "Man" ));

	newEntity->SetProperty("date_of_birth", VJSONValue ( "2013-08-28" ));


    ISQLResultSet* res = session->Insert ( table, newEntity );

	ReleaseRefCountable ( &newEntity );

	if(res != NULL)
	{
		DebugMsg("affected rows count = %d\n", res->GetAffectedRowCount());

		ReleaseRefCountable ( &res );
	}

    ReleaseRefCountable ( &session );

    ReleaseRefCountable ( &connector );

	DebugMsg ( "\n------------- testHighLevelAPI_Insert -------------\n" );
}


void testHighLevelAPI_Delete()
{
	DebugMsg ( "\n------------- testHighLevelAPI_Delete -------------\n" );

    CSQLConnector* connector = ( CSQLConnector* ) VComponentManager::RetainComponent ( 'MYSQ', 'SQL ' );

    if ( connector == NULL )
    {
        DebugMsg ( "Connector MySQL not loaded!!\n" );

        return;
    }

    VJSONObject* params = new VJSONObject();

    params->SetProperty ( "hostname",	MYSQL_HOST );

    params->SetProperty ( "user",		MYSQL_USER );

    params->SetProperty ( "password",	MYSQL_CORRECT_PASSWORD );

    params->SetProperty ( "database",	MYSQL_DATABASE );

    params->SetProperty ( "port",		MYSQL_PORT );

    params->SetProperty ( "ssl",		MYSQL_SSL_FALSE );

    ISQLSession* session = connector->CreateSession ( params );

    ReleaseRefCountable ( &params );

    if ( session == NULL )
    {
        DebugMsg ( "Connection Failed!!\n" );

        ReleaseRefCountable ( &connector );

        return;
    }

    VString table = CVSTR ( "people" );

	VJSONObject* newEntity = new VJSONObject;

	newEntity->SetProperty("id", VJSONValue ( 1000001 ));

    ISQLResultSet* res = session->Delete ( table, newEntity );

	ReleaseRefCountable ( &newEntity );

	if(res != NULL)
	{
		DebugMsg("affected rows count = %d\n", res->GetAffectedRowCount());

		ReleaseRefCountable ( &res );
	}

    ReleaseRefCountable ( &session );

    ReleaseRefCountable ( &connector );

	DebugMsg ( "\n------------- testHighLevelAPI_Delete -------------\n" );
}
