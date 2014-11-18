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

#include "testForeignKeys.h"

#include "SQLModel/VSQLModel.h"

#include "testConnectivityParams.h"

USING_TOOLBOX_NAMESPACE

void testForeignKeys()
{
    CSQLConnector* connector = (CSQLConnector*) ( VComponentManager::RetainComponent ( 'MYSQ', 'SQL ' ) );

    VJSONObject* params = new VJSONObject();

    params->SetProperty ( "hostname",	MYSQL_HOST );

    params->SetProperty ( "user",		MYSQL_USER );

    params->SetProperty ( "password",	MYSQL_CORRECT_PASSWORD );

    params->SetProperty ( "database",	MYSQL_DATABASE );

    params->SetProperty ( "port",		MYSQL_PORT );

    params->SetProperty ( "ssl",		MYSQL_SSL_FALSE );

    ISQLSession* session = connector->CreateSession ( params );

    ReleaseRefCountable ( &params );

    ISQLModel* model = connector->CreateModel ( session );

    sLONG count = model->GetDataClassesCount();

    DebugMsg ( "dataclasses count = %d\n", count );

    for ( sLONG i = 0; i < count; ++i )
    {
        VString name;

        ISQLDataClass* dataClass = model->GetDataClass ( i );

        dataClass->GetName ( name );


        //verifying attributes of dataclass people

        if ( name == "Attendee" )
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

            std::vector<ISQLForeignKey*> foreignKeys;

            model->GetAllForeignKeyForDataClass ( dataClass, foreignKeys );

            for ( std::vector<ISQLForeignKey*>::iterator it = foreignKeys.begin(), end = foreignKeys.end(); it != end; ++it )
            {
                VString foreignKeyName, currentName, parentName;

                AttributesVector outAttributes;

                ( *it )->GetAllAttributes ( outAttributes );

                for ( AttributesVector::iterator itAttr = outAttributes.begin(), endAttr = outAttributes.end(); itAttr != endAttr; ++itAttr )
                {
                    VString attrName;

                    ( *itAttr )->GetName ( attrName );

                    DebugMsg ( "ref name = %V, ", &attrName );

                    DebugMsg ( "ref kind = %d, ", ( *itAttr )->GetValueKind() );

                    DebugMsg ( "ref pkey = %d, ", ( *itAttr )->IsPrimaryKey() );

                    DebugMsg ( "ref index = %d\n", ( *itAttr )->IsIndex() );
                }

                ( *it )->GetName ( foreignKeyName );

                ISQLDataClass* current = ( *it )->RetainCurrentDataClass();

                ISQLDataClass* parent = ( *it )->RetainParentDataClass();

                current->GetName ( currentName );

                parent->GetName ( parentName );

                DebugMsg ( "foreign key name = %V, current = %V, parent = %V\n", &foreignKeyName, &currentName, &parentName );

                ReleaseRefCountable ( &current );

                ReleaseRefCountable ( &parent );
            }
        }
    }

    ReleaseRefCountable ( &model );

    ReleaseRefCountable ( &connector );
}
