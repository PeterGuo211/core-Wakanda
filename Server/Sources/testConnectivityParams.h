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

#ifndef __TEST_CONNECTIVITY_PARAMS__
#define __TEST_CONNECTIVITY_PARAMS__

#define MYSQL_HOST					( VJSONValue( "192.168.222.21" ) )

#define MYSQL_USER					( VJSONValue( "abdessamad" ) )

#define MYSQL_CORRECT_PASSWORD		( VJSONValue( "secret" ) )

#define MYSQL_INCORRECT_PASSWORD	( VJSONValue( "!secret" ) )

#define MYSQL_DATABASE				( VJSONValue( "benchdb" ) )

#define MYSQL_PORT					( VJSONValue( 3306 ) )

#define MYSQL_SSL_TRUE				( VJSONValue( JSON_true ) )

#define MYSQL_SSL_FALSE				( VJSONValue( JSON_false ) )

#define MYSQL_DSN					( VJSONValue ( "mysql_dsn" ) )

#define MSSQL_DSN					( VJSONValue ( "mssql_dsn" ) )

#define POSTGRES_DSN				( VJSONValue ( "postgres_dsn" ) )

#define ORACLE_DSN					( VJSONValue ( "oracle_dsn" ) )

#endif