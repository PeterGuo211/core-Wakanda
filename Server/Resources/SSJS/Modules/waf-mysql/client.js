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

/*
The aim of this class is to provide an abstraction of the client
functionality.
The client class is responsable for the interaction with the database
independantly with the database type.
it is responsable for sending queries and retreiving results and queries
status.
*/

var Protocol = require('waf-mysql/protocol').Protocol;
var utils = require('waf-mysql/utils');

/*
    This function is the constructor for the client class.
    It initializes the fields of the class with the default values.
*/
var Client = function (args) {
    //If the connection is closed
    this.isClosed = false;
    //If the client is connected in error case isConnected is set to false
    this.isConnected = false;
    //In error case
    this.isError = false;
    //The error packet message
    this.error = {};
    this.Protocol = null;

    var necessaryParams = ['hostname', 'user', 'password', 'database', 'port', 'ssl'];
    //Here we can use an object for the needed parameters or an explicit ones.
    //If the argument is an object we shall verify that all the needed parameters exist

    //the connection params;
    var params;
    if(args.length == 1 && typeof args[0] === 'object'){
        params = args[0];
        for(var i = 0; i < necessaryParams.length; i++){
            var p = necessaryParams[i];
            if(typeof params[p] == 'undefined'){
                throw new Error('Syntax Error: Undefined parameter ' + p);
            }
        }
    }
    //In the case of explicit parameters
    else{
        params = {
            hostname: 'localhost',
            user    : 'root',
            password: '',
            database: '',
            port    : 3306,
            ssl     : false
        };

        for(i = 0; i < args.length; i ++){
            //if a parameter is different from the default value
            var p = necessaryParams[i];
            params[p] = args[i];
        }
    }

    this.Protocol = new Protocol();
    //connect with the given parameters
    this.Protocol.connect(params);
    this.isConnected = this.Protocol.isConnected;
    this.isError = this.Protocol.isError;

    if(this.isError){
        this.error = this.Protocol.error;
    }
}

/*
This function is the constructor for the ResultSet class.
It initializes the fields of the class with the default values.
*/
function ResultSet(){
    this.Protocol = undefined;
    this.error = {};
}

/*
This function fetch all results from the result set.
It returns an array of results.
*/
ResultSet.prototype.getAllRows = function (){
    return this.Protocol.fetch(-1);
}

/*
This function checks if the result set has next rows to read.
It returns a boolean true if there is next rows to read of false otherwise
*/
ResultSet.prototype.hasNext = function (){
    return this.Protocol.hasNextResultSet();
}

//This function returns the rows count in the result set.
ResultSet.prototype.getRowsCount = function (){
    return this.Protocol.getRowsCount();
}

//This function returns the column count in the result set.
ResultSet.prototype.getColumnsCount = function (){
    return this.Protocol.getColumnsCount();
}

//This function returns column iCol name
ResultSet.prototype.getColumnName = function (iCol){
    var type = typeof iCol;
    if(type != 'number'){
        throw new Error("a number is required for getColumnName function!");
    }
    else if(iCol < 0){
        throw new Error("a positif number is required for getColumnName function!");
    }
    return this.Protocol.getColumnName(iCol);
}

//This function returns column iCol flags
ResultSet.prototype.getColumnFlags = function (iCol){
    var type = typeof iCol;
    if(type != 'number'){
        throw new Error("a number is required for getColumnName function!");
    }
    else if(iCol < 0){
        throw new Error("a positif number is required for getColumnName function!");
    }
    return this.Protocol.getColumnFlags(iCol);
}

//This function returns column iCol type
ResultSet.prototype.getColumnType = function (iCol){
    var type = typeof iCol;
    if(type != 'number'){
        throw new Error("a number is required for getColumnName function!");
    }
    else if(iCol < 0){
        throw new Error("a positif number is required for getColumnName function!");
    }
    return this.Protocol.getColumnType(iCol);
}

//This function checks if the result set is a result set of a select query
ResultSet.prototype.isSelect = function (){
    return this.Protocol.isSelect();
}

//This function checks if the result set is a result set of a wrong query
ResultSet.prototype.isError = function (){
    return this.Protocol.isResultSetError();
}

//This function returns the number of affected rows with the last query
ResultSet.prototype.getAffectedRowCount = function (){
    return this.Protocol.getAffectedRowCount();
}

//This function returns the next row
ResultSet.prototype.getNextRow = function (){
    var nextRow = null;
    var rows = this.Protocol.fetch(1);
    if(rows.length == 1){
        nextRow = rows[0];
    }
    return nextRow;
}

//This function returns an array of the next rows of maximum size the first argument
ResultSet.prototype.getNextRows = function (){
    if(arguments.length == 1 && typeof arguments[0] === 'number'){
        return this.Protocol.fetch(arguments[0]);
    }
    else{
        throw new Error('Expected number');
    }
}

//This function skips an amount denoted by the first argument from fetch
ResultSet.prototype.skipRows = function (){
    //advanceFetch is a c++ argument that reposition the current cursor to the skiped rows
    if(arguments.length == 1 && typeof arguments[0] === 'number'){
        this.Protocol.skipRows(arguments[0]);
    }
    else{
        throw new Error('Expected a number for skipRows function');
    }
}

//This function specify a database for use
Client.prototype.useDatabase =  function(){
    if(this.isClosed){
        return false;
    }

    if(arguments.length != 1){// argument syntax error
        throw new Error('parameters number error');
    }

    if(typeof arguments[0] !== 'string'){// argument syntax error
        throw new Error('Syntax type Error, expected String');
    }

    return this.Protocol.useDatabase(arguments[0]);
}

//This function execute a query and return the first result set
Client.prototype.execute = function (){
    var
    //sql query
    query,
    //the current sql statement result, an sql statement result can be an error packet or an ok packet or a resultSet packet
    i;

    //if the first argument is not query
    if(arguments.length == 0 || typeof arguments[0] != 'string'){// argument syntax error
        throw new Error('too few parameters given for execute function!');
    }

    //if there is more arguments, so there is a place hodler example
    //    - For one argument : execute("SELECT * FROM WHERE ID = 5")
    //    - For more than one argument: execute("SELECT * FROM WHERE ID:1, 5")

    if(arguments.length > 1){
        // because we have a placeholder we should construct the real query from the arguments
        query = utils.replacePlaceHolders(arguments);
    }
    else{
        // we have only 1 argument so the sql query is the first arguments
        query = arguments[0];
    }

    // we have here the first sql statement result
    i = 0;
    // send the query to mysql server  and receive data then concatenate all received buffers
    this.Protocol.sendQuery(query);

    // in this state we have concatenated all received buffers in C++ side.

    //now we are going to prepare each result statement
    //if the result statement is an ok packet then we prepare all ok packet informations
    //if the result statement is an error packet, we prepare the error message and the erno code
    //if the result statement is a resultSet, we prepare only columns, for the rowsData we know already from where it starts and ends in the global constructed buffer (MySQLBuffer) so we skipe rowsData untill the used want to fetch it

    //this line for fixing a bug if we call execute twice the hasNext shall be set to true before this
    this.Protocol.hasNext = true;
    while(this.Protocol.hasNext){
        //if there is more sql statement result
        //prepare the current "i" statement
        //false argument mean multistatement
        this.Protocol.prepareForFetch(i, false);
        i++;
    }
    // the number of received statement
    this.Protocol.resultCount = i;

    //now return the first result set
    this.Protocol.fResult = 0;
    var Result = new ResultSet();
    //position rowsData to be fetch
    this.Protocol.setNextFetch();
    Result.Protocol = this.Protocol;
    Result.error = this.Protocol.error;
    return Result;
}

//This function checks if the client has more results
Client.prototype.hasMoreResults = function (){
    return this.Protocol._hasMoreResult();
}

//This function returns the results counts
Client.prototype.getResultCount = function (){
    return this.Protocol.resultCount;
}

Client.prototype.find = function(){
    //find("*", "table", {id:1});
    //find("fields", "from", "where conditions");
    var
    //the query that will be constructed
    query,
    keyVal
    ;
    //argument syntax error
    if(arguments.length < 2 ){
        throw new Error('too few parameters given for find function!');
    }
    else if(arguments.length >= 2){
        if(typeof arguments[0] != 'string' || typeof arguments[1] != 'string'){
            throw new Error('Syntax Error in find function!');
        }
        query = "SELECT " + arguments[0] + " FROM " + arguments[1];
    }
    if(arguments.length >= 3){
        if(typeof arguments[2] != 'object'){
            throw new Error('Syntax Error');
        }
        keyVal = Object.keys(arguments[2])[0];
        query += " WHERE "  + keyVal + "=";

        if(typeof arguments[2][keyVal] == 'string'){
            query +="'" + utils.addSlashes(arguments[2][keyVal]) + "'";
        }
        else if (typeof arguments[2][keyVal] == 'number'){
            query += arguments[2][keyVal];
        }
        else{
            throw new Error('Syntax Error in find function!');
        }
    }

    this.Protocol.sendQuery(query, 2);
    this.Protocol.prepare(0);
    this.Protocol.resultCount = 1;
    this.Protocol.fResult = 0;
    var Result = new ResultSet();
    this.Protocol.setNextFetch();
    Result.Protocol = this.Protocol;
    var row = Result.getNextRow();

    return row;
}

//This function performs a select
Client.prototype.select = function (){
    //select("*", "table", {id:1});
    //select("fields", "from", "where conditions");
    var
    //the query that will be constructed
    query,
    keyVal
    ;
    //argument syntax error
    if(arguments.length < 2 ){
        throw new Error('too few parameters given for select function!');
    }
    else if(arguments.length >= 2){
        if(typeof arguments[0] != 'string' || typeof arguments[1] != 'string'){
            throw new Error('Syntax Error in select function!');
        }
        query = "SELECT " + arguments[0] + " FROM " + arguments[1];
    }
    if(arguments.length >= 3){
        if(typeof arguments[2] != 'object'){
            throw new Error('Syntax Error');
        }
        keyVal = Object.keys(arguments[2])[0];
        query += " WHERE "  + keyVal + "=";

        if(typeof arguments[2][keyVal] == 'string'){
            query +="'" + utils.addSlashes(arguments[2][keyVal]) + "'";
        }
        else if (typeof arguments[2][keyVal] == 'number'){
            query += arguments[2][keyVal];
        }
        else{
            throw new Error('Syntax Error in select function!');
        }
    }

    this.Protocol.sendQuery(query, 2);
    this.Protocol.prepare(0);

    this.Protocol.resultCount = 1;
    this.Protocol.fResult = 0;
    var Result = new ResultSet();
    this.Protocol.setNextFetch();
    Result.Protocol = this.Protocol;
    return Result;
}

//This function performs an update
Client.prototype.update = function (){
    //dbconn.update( "table_name" ; {age:42 , salary:1000} /* fields to update */ ; {id:100} /* where_clause */);
    var
    query,
    keyVal,
    _arguments,
    sep
    ;
    // argument syntax error
    if(arguments.length < 3 ){
        throw new Error('too few parameters given in update function!');
    }
    else if(arguments.length >= 3){
        if(typeof arguments[0] != 'string'
        || typeof arguments[1] != 'object'
        || typeof arguments[2] != 'object'){
            throw new Error('Syntax Error in update function!');
        }

        query = "UPDATE " + arguments[0] + " SET ";
        _arguments = arguments[1];
        sep ="";
        Object.getOwnPropertyNames(_arguments).forEach(
            function (key){
                query += sep + '`' + key + '`=';
                if(typeof _arguments[key] == 'string'){
                    query += "'" + utils.addSlashes(_arguments[key]) + "'";
                }
                else if (typeof _arguments[key] == 'number'){
                    query += _arguments[key];
                }
                else{
                    throw new Error('Syntax Error in update function!');
                }
                sep = " ,"
            });

        keyVal = Object.keys(arguments[2])[0];
        query += " WHERE "  + keyVal + "=";

        if(typeof arguments[2][keyVal] == 'string'){
            query +="'" + arguments[2][keyVal] + "'";
        }
        else if (typeof arguments[2][keyVal] == 'number'){
            query += arguments[2][keyVal];
        }
        else{
            throw new Error('Syntax Error in update function!');
        }
    }

    this.Protocol.sendQuery(query, 3);
    this.Protocol.prepare(0);

    this.Protocol.resultCount = 1;
    this.Protocol.fResult = 0;

    var Result = new ResultSet();

    Result.Protocol = this.Protocol;
    return Result;
}

//This function performs a delete
Client.prototype.delete = function (){
    //dbconn.delete( "table_name" ; {id:100} /* where_clause */);
    var
    query,
    keyVal
    ;
    if(arguments.length < 2 ){// argument syntax error
        throw new Error('too few parameters given in delete function!');
    }
    else if(arguments.length >= 2){

        if(typeof arguments[0] !== 'string'
        || typeof arguments[1] !== 'object'){
            throw new Error('Syntax Error in delete function!');
        }

        query = "DELETE FROM " + arguments[0];

        if(typeof arguments[1] != 'object'){
            throw new Error('Syntax Error in delete function!');
        }

        keyVal = Object.keys(arguments[1])[0];
        query += " WHERE "  + keyVal + "=";

        if(typeof arguments[1][keyVal] == 'string'){
            query +="'" + utils.addSlashes(arguments[1][keyVal]) + "'";
        }
        else if (typeof arguments[1][keyVal] == 'number'){
            query += arguments[1][keyVal];
        }
        else{
            throw new Error('Syntax Error in delete function!');
        }
    }

    this.Protocol.sendQuery(query, 3);
    this.Protocol.prepare(0);
    this.Protocol.resultCount = 1;
    this.Protocol.fResult = 0;
    var Result = new ResultSet();
    Result.Protocol = this.Protocol;
    return Result;
}

//This function performs an insert
Client.prototype.insert = function (){
    //dbconn.insert( "table_name" ; [ {name:"x" , age:1}, {name:y, age:2} ]);
    var
    query,
    sep,
    sep2,
    _arguments,
    i
    ;
    if(arguments.length != 2 )// argument syntax error
        throw new Error('too few parameters given in insert function!');

    if(typeof arguments[0] !== 'string' || typeof arguments[1] !== 'object')
        throw new Error('Syntax Error in insert function!');

    query = "INSERT INTO " + arguments[0] + " (";


    if(arguments[1].length == 0){
        throw new Error('Syntax Error: Empty insert data');
    }

    _arguments = arguments[1][0];

    if(typeof _arguments != 'object'){
        throw new Error('Syntax Error in insert function!');;
    }

    sep = "";
    Object.getOwnPropertyNames(_arguments).forEach(
        function (key){
            query += sep + '`' + key + '`';
            sep = " ,"
        });

    query += ") VALUES ";
    sep2 = "";
    for(i = 0; i < arguments[1].length; i ++){
        _arguments =  arguments[1][i];
        if(typeof _arguments != 'object'){
            throw new Error('Syntax Error in insert function!');
        }
        sep = "";
        query += sep2 + "(";
        Object.getOwnPropertyNames(_arguments).forEach(
            function (key){
                if(typeof _arguments[key] == 'string'){
                    query += sep + "'" + utils.addSlashes(_arguments[key])+ "'";
                }
                else if (typeof _arguments[key] == 'number'){
                    query += sep + _arguments[key];
                }
                sep = " ,"
            }
            );
        query += ")";
        sep2 = ", ";
    }

    //console.log(query);
    this.Protocol.sendQuery(query, 3);
    this.Protocol.prepare(0);
    this.Protocol.resultCount = 1;
    this.Protocol.fResult = 0;
    var Result = new ResultSet();
    Result.Protocol = this.Protocol;
    return Result;
}

//This function returns the next result set
Client.prototype.getNextResult = function (){
    if(!this.hasMoreResults()){
        return null;
    }
    this.Protocol.fResult ++;
    var Result = new ResultSet();
    this.Protocol.setNextFetch();
    Result.Protocol = this.Protocol;
    Result.error = this.Protocol.error;

    return Result;
}

//This function close the current connection
Client.prototype.close = function (){
    this.isClosed = true;
    this.Protocol.close();
    return true;
}

exports.Client = Client;
