
/*
PROCESS
-> Install a build
-> Check files
-> Uninstall du build
*/

// User to install in a specifed folder
if (typeof env === 'undefined' || typeof env.WAKANDAPATH === 'undefined')
	var wakandaPath = 'C:\\wakanda';
else
	var wakandaPath = env.WAKANDAPATH;

// Use to get the installer.msi file
var installerEnterprisePath='Nothing', installerCommunityPath='Nothing';
if (typeof env !== 'undefined' && typeof env.WAKANDA_INSTALLER_PATH !== 'undefined') {
	env.WAKANDA_INSTALLER_PATH.split(',').forEach(function (path) {
		if (/enterprise/i.test(path))
			installerEnterprisePath = path;
		else
			installerCommunityPath = path;
	});
}else{
	installerCommunityPath = 'C:\\Users\\yjego\\Desktop\\installeurWin\\Installer.msi';
	installerEnterprisePath = 'C:\\Users\\yjego\\Desktop\\installeurWin\\InstallerEnterprise.msi';
}

console.log('Installer Community Path : '+installerCommunityPath);
console.log('Installer Enterprise Path : '+installerEnterprisePath);

// Use to check shortcuts
if (typeof env === 'undefined' || typeof env.PUBLIC === 'undefined')
	var publicPath = 'C:\\Users\\Public\\Desktop\\';
else
	var publicPath = env.PUBLIC + '\\Desktop\\';
	
// Use to check Product Version ('4.129.661')
var productVersion = '';
if (typeof env === 'undefined' || typeof env.WAKANDA_BRANCH === 'undefined')
	productVersion = '0.';
else if (env.WAKANDA_BRANCH.toLowerCase() === 'main')
	productVersion = '0.';
else
	productVersion = /wak(\d+)/i.exec(env.WAKANDA_BRANCH)[1]+'.';

if (typeof env === 'undefined' || typeof env.CHANGELIST === 'undefined')
	productVersion += '000.000';
else
	productVersion += env.CHANGELIST.substr(0, 3) + '.' + env.CHANGELIST.substr(3);
	
console.log('ProductVersion expected : ' + productVersion);
	
var build = require('./moduleWindows');
wakandaCommunityPath = wakandaPath+'\\community\\';
wakandaEnterprisePath = wakandaPath+'\\enterprise\\';
var wakandaCommunityPath_posix = build.convertPathToPosix(wakandaCommunityPath);
var wakandaEnterprisePath_posix = build.convertPathToPosix(wakandaEnterprisePath);
var installerCommunityPath_posix = build.convertPathToPosix(installerCommunityPath);
var installerEnterprisePath_posix = build.convertPathToPosix(installerEnterprisePath);
var publicPath_posix = build.convertPathToPosix(publicPath);
var basePath = env.TESTBASEPATH.replace(/\/+/g, '/');

var testCase = {
	name: 'Test of the installer on Win',
};

	try{
include(basePath+'/Installer/testWindowsCommunity.js');
include(basePath+'/Installer/testWindowsEnterprise.js');
	}catch(e){console.log(e);}

