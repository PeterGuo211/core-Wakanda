/**

* @author admin
* Module: Export wakandaDB to MySQL

*/
var dsmodule = require('ds_module');
var mysqlModule = require('mysql_module');


var DataStore = new dsmodule.DataStore();
var mySQLConnection = new mysqlModule.mySQLConnection();

var host = '194.98.194.72';

var connectionParams = {
    hostname: host,
    user: 'wakandaqa',
    password: 'wakandaqa',
    database: '',
    port: 3306,
    ssl: false
};
//var connectionParams = {
//    hostname: '192.168.222.24',
//    port: 3306,
//    user: 'abdessamad',
//    password: 'secret',
//    database: '',
//    ssl: false
//};

var currentModel = File(ds.getModelFolder().path + ds.getName() + ".waModel");
var dataFile = File(ds.getDataFolder().path + ds.getName() + ".waData");


DataStore.openDataStore(currentModel, dataFile);
DataStore.getRelatedEntitiesList();


//connection, create DataBase , Table and fill its
mySQLConnection.connect(connectionParams);
mySQLConnection.createDataBase('testSQLBridge');

var dsClassesNames = DataStore.getClassNames();
for (var i = 0; i < dsClassesNames.length; ++i) {
	
	//if (dsClassesNames[i] == 'People') continue;
    DataStore.getForeignKeys(dsClassesNames[i]);
    
    wait(1000);
    var Entities = DataStore.getClassEntities(dsClassesNames[i]);
    var table2 = DataStore.getClassStructure(dsClassesNames[i]);



    mySQLConnection.createTable(dsClassesNames[i], table2);
    mySQLConnection.fillTable(dsClassesNames[i], Entities);
}

debugger;