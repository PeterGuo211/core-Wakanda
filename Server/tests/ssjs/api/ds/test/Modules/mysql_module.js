/**

* @author Ayoub Serti
* 
* mysql module: connect and manipulating data from a mySQL database

*/
var mysql = require('waf-mysql');

function mySQLConnection() {

    this.dbConn = null;

    this.connectionParams = {
        hostname: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: '',
        charSet: 192,
        ssl: false
    };

    /*
     * _construct()
     * CreateDataBase()
     * CreateTable()
     * fillTable()
     */


}


exports.mySQLConnection = mySQLConnection;

mySQLConnection.prototype.connect = function(connectionParams) {

    this.connectionParams = connectionParams;
    this.dbConn = mysql.connect(connectionParams);

    return (this.dbConn == null) ? null : this.dbConn;

}

mySQLConnection.prototype.createDataBase = function(database, options) {
    /*
     * CreateDataBase funtion accept as argument database name and options
     * options must be an object. Actually this function dont use any option; it's for eventual improvements
     * options :{
     *		eraseIfExist : boolean
     *       ...
     *
     *	 }
     */


    var resultSet, _query = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '" + database + "'";
    resultSet = this.dbConn.execute(_query);

    //isDBExist = resultSet.getRowsCount()>0 ? true : false; 
    //SET foreign_key_checks = 0;
    this.dbConn.execute("SET NAMES 'latin1' COLLATE 'latin1_general_cs'; SET foreign_key_checks = 0; SET SESSION sql_mode='NO_AUTO_VALUE_ON_ZERO';");
    if (resultSet.getRowsCount() > 0) {
        _query = "DROP DATABASE " + database + "";
        this.dbConn.execute(_query);
    }


    _query = "CREATE DATABASE " + database + " collate = 'latin1_general_cs';";
    this.dbConn.execute(_query);

    this.dbConn.useDatabase(database);

    //	if(resultSet.getRowsCount()==0)
    //	{   
    //	    //if database doesn't exist
    //	    
    //	    _query = "DROP DATABASE "+ database+"";
    //		this.dbConn.execute(_query);
    //		_query = "CREATE DATABASE "+ database+"";
    //		this.dbConn.execute(_query);
    //		
    //		this.dbConn.useDatabase(database);
    //		
    //		return true;
    //	}	
    //	
    //		if (options.eraseIfExist) {
    //					_query = "DROP DATABASE '" + database +"';";
    //					this.dbConn.excute(_query);
    //		}
}

mySQLConnection.prototype.createTable = function(tableName, columns, options) {
    /*
     * CreateTable funtion accept as argument table name ,columns and options
     * columns [{
     *	   primKey,unique,foreignkey,auto_increment,type,name
     *    }...]
     * options must be an object. Actually this function dont use any option; it's for eventual improvements
     * options :{
     *		eraseIfExist : boolean
     *		engine : InnoDB|NDB|MyISAM
     *       ...
     *
     *	 }
     */


    var _i, mysqlcolumns = '', numOfRelatedEntities=0,
        _query, foreign_constraints = "";

    for (_i = 0; _i < columns.length; _i++) {


        var column = columns[_i];
        if (column.kind == 'relatedEntities' || column.kind ==  'composition') {
			numOfRelatedEntities++;
            continue; //skip relatedEntities atributes
        }
        if(_i!=0)  mysqlcolumns+=', ';
        mysqlcolumns += "`" + column.name + "` " + _mapTypes(column.type) + " ";

       
        if (column.unique) mysqlcolumns += "UNIQUE ";
        if (column.autosequence) mysqlcolumns += "AUTO_INCREMENT  ";
        if (column.primKey) mysqlcolumns += ", PRIMARY KEY(`" + column.name + "`)";
        if (column.kind == 'relatedEntity') {
            //   	  	if(foreign_constraints!=""){
            //   	  		foreign_constraints+=",";
            //   	  	}
             mysqlcolumns += "DEFAULT NULL ";
            foreign_constraints+= ", FOREIGN KEY (`" + column.name + "`) REFERENCES `" + column.pointedClass + "`(`" + column.pointedAtt + "`)";
        }
       // if (_i < columns.length - numOfRelatedEntities- 1) mysqlcolumns += " , ";

    }
    //TODO: add foreignKeys Constraint
    _query = "CREATE TABLE `" + tableName + "` (" + mysqlcolumns + foreign_constraints + ")Engine = InnoDB;";

    this.dbConn.execute(_query);

    if (this.dbConn.isError) throw new Error(this.dbConn.error.message);

    return true;


}

mySQLConnection.prototype.fillTable = function(tableName, tableJSON, options) {
    /*
     * this funcion insert  rows contained in tableJSON into 'tableName' mySQL table .
     * tableJSON = [{
     *		 rows objects
     * 		}...]
     * options is for improvement purpose
     * 
     */
    if (tableJSON.length == 0) return -1;
    var res = this.dbConn.execute(_buildInsertionQuery(tableName,tableJSON));


}

function addSlashes(query){
    query = query.replace(/\\/g,"\\\\");
    query = query.replace(/\'/g,"\\'");
    query = query.replace(/\"/g,"\\\"");
    return query;
} 

function _buildInsertionQuery(tableName,tableJSON){
	
	var
    query, sep, sep2, _arguments, i;
    if (arguments.length != 2) // argument syntax error
    throw new Error('too few parameters given in insert function!');

    if (typeof arguments[0] !== 'string' || typeof arguments[1] !== 'object') throw new Error('Syntax Error in insert function!');

    query = "INSERT INTO " + arguments[0] + " (";


    if (arguments[1].length == 0) {
        throw new Error('Syntax Error: Empty insert data');
    }

    _arguments = arguments[1][0];

    if (typeof _arguments != 'object') {
        throw new Error('Syntax Error in insert function!');;
    }

    sep = "";
    Object.getOwnPropertyNames(_arguments).forEach(

    function(key) {
        query += sep + '`' + key + '`';
        sep = " ,"
    });

    query += ") VALUES ";
    sep2 = "";
    for (i = 0; i < arguments[1].length; i++) {
        _arguments = arguments[1][i];
        if (typeof _arguments != 'object') {
            throw new Error('Syntax Error in insert function!');
        }
        sep = "";
        query += sep2 + "(";
        Object.getOwnPropertyNames(_arguments).forEach(

        function(key) {
            if (typeof _arguments[key] == 'string') {
                query += sep + "'" + addSlashes(_arguments[key]) + "'";
            }
            else if (typeof _arguments[key] == 'number' ||  _arguments[key] == null ) {
                query += sep + _arguments[key];
            }
            sep = " ,"
        });
        query += ")";
        sep2 = ", ";
    }
	
	return query;

}

//TODO : complete mapping types
function _mapTypes(wakandaType) {

    //mapping wakanda types to MySQL types.
    var mySQLType = '';

    switch (wakandaType) {

    case 'long':
        mySQLType = 'int';
        break;
    case 'number':
        mySQLType = 'double';
        break;
    case 'string':
        mySQLType = 'varchar(50)';
        break;
    case 'duration':
        mySQLType = 'int';
        break;
    case 'byte':
        mySQLType = 'tinyint';
        break;
    case 'image':
        mySQLType = 'blob';
        break;
    case 'long64':
        mySQLType = 'bigInt';
        break;
    case 'word':
        mySQLType = 'smallint';
        break;
    case 'uuid':
        mySQLType = 'varchar(32)';
        break;

    default:
        mySQLType = wakandaType;
        break;


    }

    return mySQLType;
}