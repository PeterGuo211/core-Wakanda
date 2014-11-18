
testCase.testCommunity_install = function () {
	if (installerCommunityPath == "Nothing")
		Y.Assert.areSame(true, false, 'There is no installer path. Probably no installer was available.');
		
	build.install(installerCommunityPath, wakandaCommunityPath);
	var txtError = build.checkErrorInLog();
	Y.Assert.areSame('', txtError, 'Error during install : ' + txtError);
};

testCase.testCommunity_checkProductVersion = function () {
	var current= build.checkProductVersion();
	var expected = productVersion;
	Y.Assert.areSame(expected, current, 'Wrong build number : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkInstalledStudioPath = function () {
	var file = File(wakandaCommunityPath_posix + 'Studio/Wakanda Studio.exe');
	Y.Assert.isTrue(file.exists, 'Wakanda Studio.exe was not found in : ' + wakandaCommunityPath_posix + 'Studio/Wakanda Studio.exe');
};

testCase.testCommunity_checkInstalledServerPath = function () {
	var file = File(wakandaCommunityPath_posix + 'Server/Wakanda Server.exe');
	Y.Assert.isTrue(file.exists, 'Wakanda Server.exe was not found in : ' + wakandaCommunityPath_posix + 'Server/Wakanda Server.exe');
};

testCase.testCommunity_checkStudioShortcuts = function () {
	var current = build.getTargetPathofShortcut(publicPath+'Wakanda Studio.lnk');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Wakanda Studio.lnk does not have the right path : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkServerShortcuts = function () {
	var current = build.getTargetPathofShortcut(publicPath+'Wakanda Server.lnk');
	var expected = wakandaCommunityPath_posix+'Server/Wakanda Server.exe';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Wakanda Server.lnk does not have the right path : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaDirectoryIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wadirectory\\DefaultIcon');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaDirectoryAssociations = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wadirectory\\shell\\open\\command');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaModelIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wamodel\\DefaultIcon');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaModelAssociations = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wamodel\\shell\\open\\command');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaPermIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.waperm\\DefaultIcon');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaPermAssociations = function () {
	var current = build.getFileAssociation('HKCR\\WAK.waperm\\shell\\open\\command');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaProjectIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.waproject\\DefaultIcon');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaProjectAssociation = function () {
	var current = build.getFileAssociation('HKCR\\WAK.waproject\\shell\\open\\command');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaSettingsIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasettings\\DefaultIcon');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaSettingsAssociation = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasettings\\shell\\open\\command');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaSolutionIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasolution\\DefaultIcon');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaSolutionAssociations = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasolution\\shell\\open\\command');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaSymIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasym\\DefaultIcon');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaSymAssociations = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasym\\shell\\open\\command');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaSymDataIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasymdata\\DefaultIcon');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testCommunity_checkWaSymDataAssociations = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasymdata\\shell\\open\\command');
	var expected = wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

// List from //depot/Wakanda/main/Common/Visual/CF_Win_Entreprise.txt
testCase.testCommunity_studio_checkDLL_RemoteEntity = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/RemoteEntity.dll")
	Y.Assert.areSame(false, file.exists, 'Studio/RemoteEntity.dll');
};

testCase.testCommunity_server_checkDLL_RemoteEntity = function () {
	var file = File(wakandaCommunityPath_posix+"Server/RemoteEntity.dll")
	Y.Assert.areSame(false, file.exists, 'Server/RemoteEntity.dll');
};

testCase.testCommunity_studio_checkDLL_SQLEntity = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/SQLEntity.dll")
	Y.Assert.areSame(false, file.exists, 'Studio/SQLEntity.dll');
};

testCase.testCommunity_server_checkDLL_SQLEntity = function () {
	var file = File(wakandaCommunityPath_posix+"Server/SQLEntity.dll")
	Y.Assert.areSame(false, file.exists, 'Server/SQLEntity.dll');
};

testCase.testCommunity_studio_checkDLL_MySQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/MySQLConnector.dll")
	Y.Assert.areSame(false, file.exists, 'Studio/MySQLConnector.dll');
};

testCase.testCommunity_server_checkDLL_MySQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Server/MySQLConnector.dll")
	Y.Assert.areSame(false, file.exists, 'Server/MySQLConnector.dll');
};

testCase.testCommunity_studio_checkDLL_MSSQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/MSSQLConnector.dll")
	Y.Assert.areSame(false, file.exists, 'Studio/MSSQLConnector.dll');
};

testCase.testCommunity_server_checkDLL_MSSQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Server/MSSQLConnector.dll")
	Y.Assert.areSame(false, file.exists, 'Server/MSSQLConnector.dll');
};

testCase.testCommunity_studio_checkDLL_ODBCConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/ODBCConnector.dll")
	Y.Assert.areSame(false, file.exists, 'Studio/ODBCConnector.dll');
};

testCase.testCommunity_server_checkDLL_ODBCConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Server/ODBCConnector.dll")
	Y.Assert.areSame(false, file.exists, 'Server/ODBCConnector.dll');
};

testCase.testCommunity_studio_checkDLL_SQLUtilities = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/SQLUtilities.dll")
	Y.Assert.areSame(false, file.exists, 'Studio/SQLUtilities.dll');
};

testCase.testCommunity_server_checkDLL_SQLUtilities = function () {
	var file = File(wakandaCommunityPath_posix+"Server/SQLUtilities.dll")
	Y.Assert.areSame(false, file.exists, 'Server/SQLUtilities.dll');
};

testCase.testCommunity_studio_checkDLL_SQLModel = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/SQLModel.dll")
	Y.Assert.areSame(false, file.exists, 'Studio/SQLModel.dll');
};

testCase.testCommunity_server_checkDLL_SQLModel = function () {
	var file = File(wakandaCommunityPath_posix+"Server/SQLModel.dll")
	Y.Assert.areSame(false, file.exists, 'Server/SQLModel.dll');
};

testCase.testCommunity_studio_checkBundle_MySQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/Native Components/MySQLConnector.bundle/Contents/Resources/en.lproj/MySQLConnectorEN.xlf")
	Y.Assert.areSame(false, file.exists, 'Studio/Native Components/MySQLConnector.bundle/Contents/Resources/en.lproj/MySQLConnectorEN.xlf');
};

testCase.testCommunity_server_checkBundle_MySQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Server/Native Components/MySQLConnector.bundle/Contents/Resources/en.lproj/MySQLConnectorEN.xlf")
	Y.Assert.areSame(false, file.exists, 'Server/Native Components/MySQLConnector.bundle/Contents/Resources/en.lproj/MySQLConnectorEN.xlf');
};

testCase.testCommunity_studio_checkBundle_MSSQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/Native Components/MSSQLConnector.bundle/Contents/Resources/en.lproj/MSSQLConnectorEN.xlf")
	Y.Assert.areSame(false, file.exists, 'Studio/Native Components/MsSQLConnector.bundle/Contents/Resources/en.lproj/MSSQLConnectorEN.xlf');
};

testCase.testCommunity_server_checkBundle_MSSQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Server/Native Components/MSSQLConnector.bundle/Contents/Resources/en.lproj/MSSQLConnectorEN.xlf")
	Y.Assert.areSame(false, file.exists, 'Server/Native Components/MsSQLConnector.bundle/Contents/Resources/en.lproj/MSSQLConnectorEN.xlf');
};

testCase.testCommunity_studio_checkBundle_ODBCConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/Native Components/ODBCConnector.bundle/Contents/Resources/en.lproj/ODBCConnectorEN.xlf")
	Y.Assert.areSame(false, file.exists, 'Studio/Native Components/ODBCConnector.bundle/Contents/Resources/en.lproj/ODBCConnectorEN.xlf');
};

testCase.testCommunity_server_checkBundle_ODBCConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Server/Native Components/ODBCConnector.bundle/Contents/Resources/en.lproj/ODBCConnectorEN.xlf")
	Y.Assert.areSame(false, file.exists, 'Server/Native Components/ODBCConnector.bundle/Contents/Resources/en.lproj/ODBCConnectorEN.xlf');
};
/*
testCase.testCommunity_studio_checkModule_wafAWS = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/ec2/aws-ec2.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/ec2/aws-ec2.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/includes/hash.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/includes/hash.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/includes/s3-headers.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/includes/s3-headers.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/module/request/aws-module-request.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/module/request/aws-module-request.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/module/rest/aws-module-rest.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/module/rest/aws-module-rest.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/module/aws-module.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/module/aws-module.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/route53/aws-route53.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/route53/aws-route53.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/s3/aws-s3.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/s3/aws-s3.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/util/aws-util.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/util/aws-util.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/aws.inc.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/aws.inc.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/aws.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/aws.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/order.txt")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/order.txt');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/readme.txt")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/readme.txt');
};

testCase.testCommunity_server_checkModule_wafAWS = function () {
	var file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/ec2/aws-ec2.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/ec2/aws-ec2.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/includes/hash.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/includes/hash.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/includes/s3-headers.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/includes/s3-headers.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/module/request/aws-module-request.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/module/request/aws-module-request.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/module/rest/aws-module-rest.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/module/rest/aws-module-rest.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/module/aws-module.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/module/aws-module.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/route53/aws-route53.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/route53/aws-route53.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/s3/aws-s3.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/s3/aws-s3.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/util/aws-util.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/util/aws-util.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/aws.inc.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/aws.inc.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/aws.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/aws.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/order.txt")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/order.txt');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/readme.txt")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/readme.txt');
};

testCase.testCommunity_studio_checkModule_wafAZURE = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-azure/management/azure-management.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-azure/management/azure-management.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-azure/module/rest/azure-module-rest.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-azure/module/rest/azure-module-rest.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-azure/module/azure-module.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-azure/module/azure-module.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-azure/azure.inc.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-azure/azure.inc.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-azure/azure.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-azure/azure.js');
};

testCase.testCommunity_server_checkModule_wafAZURE = function () {
	var file = File(wakandaCommunityPath_posix+"Server/Modules/waf-azure/management/azure-management.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-azure/management/azure-management.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-azure/module/rest/azure-module-rest.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-azure/module/rest/azure-module-rest.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-azure/module/azure-module.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-azure/module/azure-module.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-azure/azure.inc.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-azure/azure.inc.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-azure/azure.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-azure/azure.js');
};
*/
testCase.testCommunity_studio_checkModule_wafSQL = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-sql/client.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-sql/client.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-sql/package.json")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-sql/package.json');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-sql/sql.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-sql/sql.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-sql/utils.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-sql/utils.js');
};

testCase.testCommunity_server_checkModule_wafSQL = function () {
	var file = File(wakandaCommunityPath_posix+"Server/Modules/waf-sql/client.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-sql/client.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-sql/package.json")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-sql/package.json');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-sql/sql.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-sql/sql.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-sql/utils.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-sql/utils.js');
};

testCase.testCommunity_Uninstall = function () {
	if (installerCommunityPath == "Nothing")
		Y.Assert.areSame(true, false, 'There is no installer path. Probably no installer was available.');

	build.uninstall(installerCommunityPath);

	var txtError = build.checkErrorInLog();
	Y.Assert.areSame('', txtError, 'Error during uninstall : ' + txtError);
	
	build.deleteLog();
};
