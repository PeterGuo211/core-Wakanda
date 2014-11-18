
testCase.testEnterprise_install = function () {
	if (installerEnterprisePath == "Nothing")
		Y.Assert.areSame(true, false, 'There is no installer path. Probably no installer was available.');

	build.install(installerEnterprisePath, wakandaEnterprisePath);
	var txtError = build.checkErrorInLog();
	Y.Assert.areSame('', txtError, 'Error during install : ' + txtError);
};

testCase.testEnterprise_checkProductVersion = function () {
	var current = build.checkProductVersion();
	var expected = productVersion;
	Y.Assert.areSame(expected, current, 'Wrong build number : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkInstalledStudioPath = function () {
	var file = File(wakandaEnterprisePath_posix + 'Studio/Wakanda Studio.exe');
	Y.Assert.isTrue(file.exists, 'Wakanda Studio.exe was not found in : ' + wakandaEnterprisePath_posix + 'Studio/Wakanda Studio.exe');
};

testCase.testEnterprise_checkInstalledServerPath = function () {
	var file = File(wakandaEnterprisePath_posix + 'Server/Wakanda Server.exe');
	Y.Assert.isTrue(file.exists, 'Wakanda Server.exe was not found in : ' + wakandaEnterprisePath_posix + 'Server/Wakanda Server.exe');
};

testCase.testEnterprise_checkStudioShortcuts = function () {
	var current = build.getTargetPathofShortcut(publicPath+'Wakanda Enterprise Studio.lnk');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda Studio.exe';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Wakanda Studio.lnk does not have the right path : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkServerShortcuts = function () {
	var current = build.getTargetPathofShortcut(publicPath+'Wakanda Enterprise Server.lnk');
	var expected = wakandaEnterprisePath_posix+'Server/Wakanda Server.exe';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Wakanda Server.lnk does not have the right path : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaDirectoryIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wadirectory\\DefaultIcon');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda_docEnterprise.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaDirectoryAssociations = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wadirectory\\shell\\open\\command');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaModelIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wamodel\\DefaultIcon');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda_docEnterprise.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaModelAssociations = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wamodel\\shell\\open\\command');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaPermIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.waperm\\DefaultIcon');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda_docEnterprise.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaPermAssociations = function () {
	var current = build.getFileAssociation('HKCR\\WAK.waperm\\shell\\open\\command');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaProjectIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.waproject\\DefaultIcon');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda_docEnterprise.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaProjectAssociation = function () {
	var current = build.getFileAssociation('HKCR\\WAK.waproject\\shell\\open\\command');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaSettingsIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasettings\\DefaultIcon');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda_docEnterprise.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaSettingsAssociation = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasettings\\shell\\open\\command');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaSolutionIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasolution\\DefaultIcon');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda_docEnterprise.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaSolutionAssociations = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasolution\\shell\\open\\command');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaSymIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasym\\DefaultIcon');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda_docEnterprise.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaSymAssociations = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasym\\shell\\open\\command');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaSymDataIcon = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasymdata\\DefaultIcon');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda_docEnterprise.ico';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'Icon association failed : [' + expected+'] but was ['+current+']');
};

testCase.testEnterprise_checkWaSymDataAssociations = function () {
	var current = build.getFileAssociation('HKCR\\WAK.wasymdata\\shell\\open\\command');
	var expected = wakandaEnterprisePath_posix+'Studio/Wakanda Studio.exe "%1"';
	Y.Assert.areSame(expected.toLowerCase(), current.toLowerCase(), 'EXE association failed : [' + expected+'] but was ['+current+']');
};

// List from //depot/Wakanda/main/Common/Visual/CF_Win_Entreprise.txt
testCase.testEnterprise_studio_checkDLL_RemoteEntity = function () {
	var file = File(wakandaEnterprisePath_posix+"Studio/RemoteEntity.dll")
	Y.Assert.areSame(true, file.exists, 'Studio/RemoteEntity.dll');
};

testCase.testEnterprise_server_checkDLL_RemoteEntity = function () {
	var file = File(wakandaEnterprisePath_posix+"Server/RemoteEntity.dll")
	Y.Assert.areSame(true, file.exists, 'Server/RemoteEntity.dll');
};

testCase.testEnterprise_studio_checkDLL_SQLEntity = function () {
	var file = File(wakandaEnterprisePath_posix+"Studio/SQLEntity.dll")
	Y.Assert.areSame(true, file.exists, 'Studio/SQLEntity.dll');
};

testCase.testEnterprise_server_checkDLL_SQLEntity = function () {
	var file = File(wakandaEnterprisePath_posix+"Server/SQLEntity.dll")
	Y.Assert.areSame(true, file.exists, 'Server/SQLEntity.dll');
};

testCase.testEnterprise_studio_checkDLL_MySQLConnector = function () {
	var file = File(wakandaEnterprisePath_posix+"Studio/MySQLConnector.dll")
	Y.Assert.areSame(true, file.exists, 'Studio/MySQLConnector.dll');
};

testCase.testEnterprise_server_checkDLL_MySQLConnector = function () {
	var file = File(wakandaEnterprisePath_posix+"Server/MySQLConnector.dll")
	Y.Assert.areSame(true, file.exists, 'Server/MySQLConnector.dll');
};

testCase.testEnterprise_studio_checkDLL_MSSQLConnector = function () {
	var file = File(wakandaEnterprisePath_posix+"Studio/MSSQLConnector.dll")
	Y.Assert.areSame(true, file.exists, 'Studio/MSSQLConnector.dll');
};

testCase.testEnterprise_server_checkDLL_MSSQLConnector = function () {
	var file = File(wakandaEnterprisePath_posix+"Server/MSSQLConnector.dll")
	Y.Assert.areSame(true, file.exists, 'Server/MSSQLConnector.dll');
};

testCase.testEnterprise_studio_checkDLL_ODBCConnector = function () {
	var file = File(wakandaEnterprisePath_posix+"Studio/ODBCConnector.dll")
	Y.Assert.areSame(true, file.exists, 'Studio/ODBCConnector.dll');
};

testCase.testEnterprise_server_checkDLL_ODBCConnector = function () {
	var file = File(wakandaEnterprisePath_posix+"Server/ODBCConnector.dll")
	Y.Assert.areSame(true, file.exists, 'Server/ODBCConnector.dll');
};

testCase.testEnterprise_studio_checkDLL_SQLUtilities = function () {
	var file = File(wakandaEnterprisePath_posix+"Studio/SQLUtilities.dll")
	Y.Assert.areSame(true, file.exists, 'Studio/SQLUtilities.dll');
};

testCase.testEnterprise_server_checkDLL_SQLUtilities = function () {
	var file = File(wakandaEnterprisePath_posix+"Server/SQLUtilities.dll")
	Y.Assert.areSame(true, file.exists, 'Server/SQLUtilities.dll');
};

testCase.testEnterprise_studio_checkDLL_SQLModel = function () {
	var file = File(wakandaEnterprisePath_posix+"Studio/SQLModel.dll")
	Y.Assert.areSame(true, file.exists, 'Studio/SQLModel.dll');
};

testCase.testEnterprise_server_checkDLL_SQLModel = function () {
	var file = File(wakandaEnterprisePath_posix+"Server/SQLModel.dll")
	Y.Assert.areSame(true, file.exists, 'Server/SQLModel.dll');
};

testCase.testEnterprise_studio_checkBundle_MySQLConnector = function () {
	var file = File(wakandaEnterprisePath_posix+"Studio/Native Components/MySQLConnector.bundle/Contents/Resources/en.lproj/MySQLConnectorEN.xlf")
	Y.Assert.areSame(true, file.exists, 'Studio/Native Components/MySQLConnector.bundle/Contents/Resources/en.lproj/MySQLConnectorEN.xlf');
};

testCase.testEnterprise_server_checkBundle_MySQLConnector = function () {
	var file = File(wakandaEnterprisePath_posix+"Server/Native Components/MySQLConnector.bundle/Contents/Resources/en.lproj/MySQLConnectorEN.xlf")
	Y.Assert.areSame(true, file.exists, 'Server/Native Components/MySQLConnector.bundle/Contents/Resources/en.lproj/MySQLConnectorEN.xlf');
};

testCase.testEnterprise_studio_checkBundle_MSSQLConnector = function () {
	var file = File(wakandaEnterprisePath_posix+"Studio/Native Components/MSSQLConnector.bundle/Contents/Resources/en.lproj/MSSQLConnectorEN.xlf")
	Y.Assert.areSame(true, file.exists, 'Studio/Native Components/MsSQLConnector.bundle/Contents/Resources/en.lproj/MSSQLConnectorEN.xlf');
};

testCase.testEnterprise_server_checkBundle_MSSQLConnector = function () {
	var file = File(wakandaEnterprisePath_posix+"Server/Native Components/MSSQLConnector.bundle/Contents/Resources/en.lproj/MSSQLConnectorEN.xlf")
	Y.Assert.areSame(true, file.exists, 'Server/Native Components/MsSQLConnector.bundle/Contents/Resources/en.lproj/MSSQLConnectorEN.xlf');
};

testCase.testEnterprise_studio_checkBundle_ODBCConnector = function () {
	var file = File(wakandaEnterprisePath_posix+"Studio/Native Components/ODBCConnector.bundle/Contents/Resources/en.lproj/ODBCConnectorEN.xlf")
	Y.Assert.areSame(true, file.exists, 'Studio/Native Components/ODBCConnector.bundle/Contents/Resources/en.lproj/ODBCConnectorEN.xlf');
};

testCase.testEnterprise_server_checkBundle_ODBCConnector = function () {
	var file = File(wakandaEnterprisePath_posix+"Server/Native Components/ODBCConnector.bundle/Contents/Resources/en.lproj/ODBCConnectorEN.xlf")
	Y.Assert.areSame(true, file.exists, 'Server/Native Components/ODBCConnector.bundle/Contents/Resources/en.lproj/ODBCConnectorEN.xlf');
};
/*
testCase.testEnterprise_studio_checkModule_wafAWS = function () {
	var file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-aws/ec2/aws-ec2.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-aws/ec2/aws-ec2.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-aws/includes/hash.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-aws/includes/hash.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-aws/includes/s3-headers.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-aws/includes/s3-headers.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-aws/module/request/aws-module-request.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-aws/module/request/aws-module-request.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-aws/module/rest/aws-module-rest.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-aws/module/rest/aws-module-rest.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-aws/module/aws-module.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-aws/module/aws-module.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-aws/route53/aws-route53.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-aws/route53/aws-route53.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-aws/s3/aws-s3.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-aws/s3/aws-s3.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-aws/util/aws-util.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-aws/util/aws-util.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-aws/aws.inc.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-aws/aws.inc.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-aws/aws.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-aws/aws.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-aws/order.txt")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-aws/order.txt');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-aws/readme.txt")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-aws/readme.txt');
};

testCase.testEnterprise_server_checkModule_wafAWS = function () {
	var file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-aws/ec2/aws-ec2.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-aws/ec2/aws-ec2.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-aws/includes/hash.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-aws/includes/hash.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-aws/includes/s3-headers.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-aws/includes/s3-headers.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-aws/module/request/aws-module-request.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-aws/module/request/aws-module-request.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-aws/module/rest/aws-module-rest.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-aws/module/rest/aws-module-rest.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-aws/module/aws-module.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-aws/module/aws-module.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-aws/route53/aws-route53.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-aws/route53/aws-route53.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-aws/s3/aws-s3.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-aws/s3/aws-s3.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-aws/util/aws-util.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-aws/util/aws-util.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-aws/aws.inc.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-aws/aws.inc.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-aws/aws.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-aws/aws.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-aws/order.txt")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-aws/order.txt');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-aws/readme.txt")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-aws/readme.txt');
};

testCase.testEnterprise_studio_checkModule_wafAZURE = function () {
	var file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-azure/management/azure-management.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-azure/management/azure-management.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-azure/module/rest/azure-module-rest.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-azure/module/rest/azure-module-rest.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-azure/module/azure-module.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-azure/module/azure-module.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-azure/azure.inc.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-azure/azure.inc.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-azure/azure.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-azure/azure.js');
};

testCase.testEnterprise_server_checkModule_wafAZURE = function () {
	var file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-azure/management/azure-management.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-azure/management/azure-management.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-azure/module/rest/azure-module-rest.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-azure/module/rest/azure-module-rest.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-azure/module/azure-module.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-azure/module/azure-module.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-azure/azure.inc.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-azure/azure.inc.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-azure/azure.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-azure/azure.js');
};
*/
testCase.testEnterprise_studio_checkModule_wafSQL = function () {
	var file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-sql/client.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-sql/client.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-sql/package.json")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-sql/package.json');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-sql/sql.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-sql/sql.js');
	file = File(wakandaEnterprisePath_posix+"Studio/Modules/waf-sql/utils.js")
	Y.Assert.areSame(true, file.exists, 'Studio/Modules/waf-sql/utils.js');
};

testCase.testEnterprise_server_checkModule_wafSQL = function () {
	var file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-sql/client.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-sql/client.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-sql/package.json")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-sql/package.json');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-sql/sql.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-sql/sql.js');
	file = File(wakandaEnterprisePath_posix+"Server/Modules/waf-sql/utils.js")
	Y.Assert.areSame(true, file.exists, 'Server/Modules/waf-sql/utils.js');
};

testCase.testEnterprise_Uninstall = function () {
	if (installerEnterprisePath == "Nothing")
		Y.Assert.areSame(true, false, 'There is no installer path. Probably no installer was available.');

	build.uninstall(installerEnterprisePath);

	var txtError = build.checkErrorInLog();
	Y.Assert.areSame('', txtError, 'Error during uninstall : ' + txtError);
	
	build.deleteLog();
};
