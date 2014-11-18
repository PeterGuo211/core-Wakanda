#include "headers4d.h"

#include "testMySQLConnector.h"

#include "SQLModel/VSQLModel.h"

#include "testConnectivityParams.h"


USING_TOOLBOX_NAMESPACE

void testSQLModelSample()
{
    DebugMsg ( "\n------------- START DEMO SQL Model -------------\n" );

    CSQLConnector* connector = (CSQLConnector*) ( VComponentManager::RetainComponent ( 'MYSQ', 'SQL ' ) );

    VJSONObject* params = new VJSONObject();

    params->SetProperty ( "hostname",	MYSQL_HOST );

    params->SetProperty ( "user",		MYSQL_USER );

    params->SetProperty ( "password",	MYSQL_CORRECT_PASSWORD );

    params->SetProperty ( "database",	MYSQL_DATABASE );

    params->SetProperty ( "port",		MYSQL_PORT );

    params->SetProperty ( "ssl",		MYSQL_SSL_FALSE );

    ISQLSession* session = connector->CreateSession ( params );

    if ( session != NULL )
    {
        ISQLModel* model = connector->CreateModel ( session );

        sLONG count = model->GetDataClassesCount();

        for ( sLONG i = 0; i < count; ++i )
        {
            VString name;

            ISQLDataClass* dataClass = model->GetDataClass ( i );

            dataClass->GetName ( name );


			//verifying attributes of dataclass people

            if ( name == "people" )
            {
                sLONG attributeCount = dataClass->GetAttributesCount();

                for ( sLONG j = 0; j < attributeCount; ++j )
                {
                    ISQLAttribute* attr = dataClass->GetAttribute ( j );

                    VString attrName;

                    attr->GetName ( attrName );

                    ValueKind kind = attr->GetValueKind();

                    DebugMsg ( "attribute name = %V\n", &attrName );

                    DebugMsg ( "attribute kind = %d\n", kind );
                }
            }



			//verifying collection creation
            if ( name == "people" )
            {
                ISQLCollection* collection = dataClass->CreateAllRecordsCollection ( session );

				//VString query = CVSTR( "SELECT * FROM people WHERE id >= 100 AND id < 200" );

				//ISQLCollection* collection = dataClass->CreateQueryRecordsCollection( query, session );

                sLONG collectionCount = collection->GetCount ( session );

                DebugMsg ( "collection count = %d\n", collectionCount );

                ISQLPrimaryKey* primaryKey = collection->RetainPrimaryKey ( session, 1 );

                std::vector<VString> keyAttributes;

                primaryKey->GetAttributeNames ( keyAttributes );

                DebugMsg ( "key attributes are\n" );

                for ( std::vector<VString>::iterator it = keyAttributes.begin(); it != keyAttributes.end(); ++it )
                {
                    DebugMsg ( "%V = %V\n", & ( *it ), primaryKey->GetAttribute ( *it ) );
                }

                ISQLEntity* entity = collection->RetainEntity ( session, 2 );

                std::vector<VString> entityAttributes;

                entity->GetAttributeNames ( entityAttributes );

                DebugMsg ( "entity attributes are\n" );

                for ( std::vector<VString>::iterator it = entityAttributes.begin(); it != entityAttributes.end(); ++it )
                {
                    DebugMsg ( "%V = %V\n", & ( *it ), entity->GetAttribute ( *it ) );
                }

                ISQLEntity* newEntity = dataClass->CreateEntity();

                newEntity->SetAttribute ( "id", VLong ( 100002 ) );

                newEntity->SetAttribute ( "matricule", VLong ( 15 ) );

                newEntity->SetAttribute ( "first_name", CVSTR ( "demo" ) );

                newEntity->SetAttribute ( "last_name", CVSTR ( "SQL model" ) );

                VTime birthDate;

                birthDate.FromUTCTime ( 2012, 12, 11, 0, 0, 0, 0 );

                newEntity->SetAttribute ( "date_of_birth", birthDate );

                VError error = newEntity->Save ( session );

                if ( error != VE_OK )
                {
                    DebugMsg ( "Entity not created!\n" );
                }

                newEntity->SetAttribute ( "first_name",  CVSTR ( "update demo" ) );

                error = newEntity->Save ( session );

                if ( error != VE_OK )
                {
                    DebugMsg ( "Entity not updated!\n" );
                }

                error = newEntity->Delete ( session );

                if ( error != VE_OK )
                {
                    DebugMsg ( "Entity not deleted!\n" );
                }

                ReleaseRefCountable ( &newEntity );

                ReleaseRefCountable ( &entity );

                ReleaseRefCountable ( &primaryKey );

                ReleaseRefCountable ( &collection );
            }
        }

        ReleaseRefCountable ( &model );

        ReleaseRefCountable ( &session );
    }

    ReleaseRefCountable ( &params );

    ReleaseRefCountable ( &connector );

    DebugMsg ( "\n-------------- END DEMO SQL Model -------------\n" );
}
