
model = new DataStoreCatalog();
var platform = '';

if(os.isMac){
	platform ='mac';
}if(os.isLinux){
	platform = 'linux';
}if(os.isWindows){
	platform = 'win';
}

// connect to remote MySQL Server.
model.addSQLCatalog("testSQLBridgeDB", { 
    hostname: '194.98.194.72',
    user: 'wakandaqa',
    password: 'wakandaqa',
    database: 'testSQLBridge_'+platform ,
    port: 3306,
    ssl: false 
});

