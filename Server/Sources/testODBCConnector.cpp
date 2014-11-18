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

#include "testODBCConnector.h"

#include "SQLModel/VSQLModel.h"

#include "testConnectivityParams.h"

USING_TOOLBOX_NAMESPACE

void testODBCConnectorCreateSessionWithValidParams()
{
    CSQLConnector* connector = (CSQLConnector*) ( VComponentManager::RetainComponent ( 'MYSQ', 'SQL ' ) );

    VJSONObject* params = new VJSONObject();

    params->SetProperty ( "dsn", MYSQL_DSN );

    //params->SetProperty("user", VJSONValue("abdessamad"));

    //params->SetProperty("pwd", VJSONValue("secret"));

    ISQLSession* session = connector->CreateSession ( params );

    if ( session != NULL )
    {
        printf ( "connection was successful ..\n" );

        VError err;

        VString query = "SELECT * 1FROM people WHERE matricule = 49; SELECT * FROM people WHERE matricule = 99;";

        session->ExecuteQuery ( query );

        sLONG count = session->GetResultSetsCount();

        DebugMsg ( "count = %d\n", count );

        for ( sLONG r = 1; r <= count; ++r )
        {
            DebugMsg ( "\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n" );

            ISQLResultSet* res = session->RetainNthResultSet ( r );

            if ( res->IsError() )
            {
                VString errMsg = res->GetErrorMessage();

                DebugMsg ( "error message = %V\n", &errMsg );

                DebugMsg ( "error number = %d\n", res->GetNativeErrorNumber() );
            }
            else if ( res->IsSelect() )
            {
                while ( !res->IsEOF() )
                {
                    ISQLRow* row = res->RetainNextRow();

                    sLONG columnCount = row->GetValuesCount();

                    std::vector<VString> colNames;

                    res->GetColumnNames ( colNames );

                    for ( sLONG i = 0; i < columnCount; ++i )
                    {
                        VValueSingle* val = row->GetNthValue ( i + 1 );

                        if ( val != NULL )
                        {
                            DebugMsg ( "%V = %V, ", &colNames[i], val );

                            delete val;
                        }
                        else
                        {
                            DebugMsg ( "%V = NULL, ", &colNames[i] );
                        }
                    }

                    DebugMsg ( "\n" );

                    ReleaseRefCountable ( &row );
                }
            }
            else
            {
                sLONG count = res->GetAffectedRowCount();

                DebugMsg ( "affected rows count = %d\n", count );
            }

            DebugMsg ( "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n" );

            fflush ( stderr );

            fflush ( stdout );

            ReleaseRefCountable ( &res );
        }

        ReleaseRefCountable ( &session );
    }
    else
    {
        printf ( "connection failed ..\n" );
    }

    ReleaseRefCountable ( &params );

    ReleaseRefCountable ( &connector );

    DebugMsg ( "\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n" );
}



void testODBCConnectorPreparedStatement()
{
    CSQLConnector* connector = (CSQLConnector*) VComponentManager::RetainComponent ( 'ODBC', 'SQL ' );

    if ( connector == NULL )
    {
        DebugMsg ( "Can't load the ODBC connector!\n" );

        return;
    }

    VJSONObject* params = new VJSONObject();

    params->SetProperty ( "dsn", MYSQL_DSN );

    // params->SetProperty("user", VJSONValue("sa"));

    // params->SetProperty("password", VJSONValue("  "));

    ISQLSession* session = connector->CreateSession ( params );

    if ( session != NULL )
    {
        printf ( "connection was successful ..\n" );

        VError err;

        // VString query = "SELECT TOP 10 [AddressID], [AddressLine1], [AddressLine2], [City], [StateProvinceID], [PostalCode], [rowguid], [ModifiedDate] FROM [AdventureWorks].[Person].[Address]";

        // VString query = "select top 10 * from testdb_win.dbo.test_decimal where id < ?;";

        VString query = "SELECT * FROM people WHERE date_of_birth = ?";

        // VString query = "SELECT TOP 1000 [id] ,[value] FROM [testdb_win].[dbo].[test_ntext]";

        DebugMsg ( "\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n" );

        ISQLStatement* stmt = session->CreateStatement ( query );

        ISQLPreparedStatement* pStmt = stmt->CreatePreparedStatement ( err );

        VTime t;

        t.FromUTCTime ( 1981, 5, 24, 0, 0, 0, 0 );

        pStmt->SetNthParameter ( 1, t );

        ISQLResultSet* res = pStmt->Execute ( err );

        // ISQLResultSet* res = stmt->Execute( err );

        if ( res->IsError() )
        {
            VString errMsg = res->GetErrorMessage();

            DebugMsg ( "error message = %V\n", &errMsg );

            DebugMsg ( "error number = %d\n", res->GetNativeErrorNumber() );
        }
        else if ( res->IsSelect() )
        {
            DebugMsg ( "Rows count = %d\n", res->GetRowCount() );

            while ( !res->IsEOF() )
            {
                ISQLRow* row = res->RetainNextRow();

                sLONG columnCount = row->GetValuesCount();

                std::vector<VString> colNames;

                res->GetColumnNames ( colNames );

                for ( sLONG i = 0; i < columnCount - 1; ++i )
                {
                    VValueSingle* val = row->GetNthValue ( i + 1 );

                    ValueKind kind = val->GetValueKind();

                    if ( kind != VK_BLOB )
                    {
                        if ( val != NULL )
                        {
                            DebugMsg ( "%V = %V, ", &colNames[i], val );
                        }
                        else
                        {
                            DebugMsg ( "%V = NULL, " );
                        }
                    }
                    else
                    {
                        VBlob* blob = static_cast<VBlob*> ( val );

                        uBYTE* data = ( uBYTE* ) ::malloc ( 20 );

                        VSize dataLen;

                        blob->GetData ( data, 20, 0, &dataLen );

                        DebugMsg ( "0x" );

                        for ( sLONG j = 0; j < dataLen; ++j )
                        {
                            DebugMsg ( "%x", data[j] >> 4 );

                            DebugMsg ( "%x", data[j] & 0xf );
                        }

                        DebugMsg ( ", " );

                        ::free ( data );
                    }
                }

                DebugMsg ( "\n" );

                ReleaseRefCountable ( &row );
            }
        }
        else
        {
            sLONG count = res->GetAffectedRowCount();

            DebugMsg ( "affected rows count = %d\n", count );
        }

        DebugMsg ( "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n" );

        fflush ( stderr );

        fflush ( stdout );

        ReleaseRefCountable ( &res );

        ReleaseRefCountable ( &session );
    }
    else
    {
        printf ( "connection failed ..\n" );
    }

    ReleaseRefCountable ( &params );

    ReleaseRefCountable ( &connector );

    DebugMsg ( "\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n" );
}

