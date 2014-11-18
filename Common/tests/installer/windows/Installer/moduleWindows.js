
exports.install = function install(installerPath, wakandaPath){
		console.log('-----Installing :');
		var cmdLine = 'cmd /u /c msiexec /i "'+installerPath+'" /passive ADDLOCAL=Feature0,Feature1 INSTALLROOTDIR="'+wakandaPath+'" /l*v "'+env.TESTBASEPATH+'\\log.log"';
		console.log(cmdLine);
		var result = SystemWorker.exec(cmdLine);
};

exports.uninstall = function uninstall(installerPath){
		console.log('-----Uninstalling');
		var cmdLine = 'cmd /u /c msiexec /x "'+installerPath+'" /passive /l*v "'+env.TESTBASEPATH+'\\log.log"';
		console.log(cmdLine);
		var result = SystemWorker.exec(cmdLine);
};

// Returns nbErrors
exports.checkErrorInLog = function checkErrorInLog(){
	console.log('-----Checking log file');
	var logText = loadText(env.TESTBASEPATH+'\\log.log');
	if (!logText){
		console.log('[ERROR] Log file not found');
		return 1;
	}

	var txtError = '';
	var logMatch = logText.match(/.*MainEngineThread is returning 16../gm);
	if (logMatch){
		logMatch.forEach(function(log)
		{
			console.log('[ERROR]' + log);
			switch(log.substr(-4))
			{
				case '1602':
					txtError += "ERROR_INSTALL_USEREXIT L'utilisateur a annulé l'installation";
					break;
				case '1603':
					txtError += "ERROR_INSTALL_FAILURE Erreur fatale lors de l'installation";
					break;
				case '1604':
					txtError += "ERROR_INSTALL_SUSPEND Installation interrompue et non terminée";
					break;
				case '1608':
					txtError += "ERROR_UNKNOWN_PROPERTY Propriété inconnue";
					break;
				case '1609':
					txtError += "ERROR_INVALID_HANDLE_STATE Le descripteur est dans un état non valide";
					break;
				case '1610':
					txtError += "ERROR_BAD_CONFIGURATION Les données de configuration de ce produit sont endommagées";
					break;
				case '1612':
					txtError += "ERROR_INSTALL_SOURCE_ABSENT La source d'installation pour ce produit n'est pas disponible";
					break;
				case '1613':
					txtError += "ERROR_INSTALL_PACKAGE_VERSION Le package d'installation ne peut pas être installé par le service Windows Installer";
					break;
				case '1618':
					txtError += "ERROR_INSTALL_ALREADY_RUNNING Une autre installation est déjà en cours";
					break;
				case '1619':
					txtError += "ERROR_INSTALL_PACKAGE_OPEN_FAILED Impossible d'ouvrir cet ensemble logiciel d'installation";
					break;
				case '1620':
					txtError += "ERROR_INSTALL_PACKAGE_INVALID Impossible d\'ouvrir le package d\'installation";
					break;
				case '1621':
					txtError += "ERROR_INSTALL_UI_FAILURE Une erreur est survenue lors du démarrage de l'interface utilisateur du service Windows Installer";
					break;
				case '1622':
					txtError += "ERROR_INSTALL_LOG_FAILURE Erreur lors de l'ouverture du fichier journal d'installation";
					break;
				case '1623':
					txtError += "ERROR_INSTALL_LANGUAGE_UNSUPPORTED La langue de ce package d'installation n'est pas prise en charge par le système";
					break;
				case '1625':
					txtError += "ERROR_INSTALL_PACKAGE_REJECTED L'installation est interdite par la stratégie système";
					break;
				case '1626':
					txtError += "ERROR_FUNCTION_NOT_CALLED Impossible d'exécuter la fonction";
					break;
				case '1627':
					txtError += "ERROR_FUNCTION_FAILED La fonction a échoué lors de l'exécution";
					break;
				case '1632':
					txtError += "ERROR_INSTALL_TEMP_UNWRITABLE Le répertoire temporaire est plein ou inaccessible";
					break;
				case '1633':
					txtError += "ERROR_INSTALL_PLATFORM_UNSUPPORTED Cet ensemble logiciel d'installation n'est pas pris en charge par cette plate-forme";
					break;
				case '1635':
					txtError += "ERROR_PATCH_PACKAGE_OPEN_FAILED Impossible d'ouvrir ce package correctif";
					break;
				case '1636':
					txtError += "ERROR_PATCH_PACKAGE_INVALID Impossible d'ouvrir ce package correctif";
					break;
				case '1638':
					txtError += "ERROR_INVALID_COMMAND_LINE Une autre version de ce produit est déjà installée";
					break;
				case '1639':
					txtError += "ERROR_PRODUCT_VERSION Argument de la ligne de commande non valide";
					break;
			}
		});
	}

	var logMatch = logText.match(/.*Return value 3\./gm);
	if (logMatch){
		logMatch.forEach(function(log){
			txtError += log;
		});
	}
	
	return txtError;
};

exports.checkProductVersion = function checkProductVersion(){
	console.log('-----Checking log file');
	var logText = loadText(env.TESTBASEPATH+'\\log.log');
	if (!logText){
		console.log('[ERROR] Log file not found');
		return 1;
	}
	
	var productVersion = 0;
	var arrayVersion = logText.match(/ProductVersion = (.*)/gm);
	if (arrayVersion)
		productVersion = arrayVersion[0].slice(17);
	else
		console.log('No product version');
	return productVersion;
};

exports.getFileAssociation = function getFileAssociation(regKey){
	console.log('-----Checking file association');
	var cmdLine = 'cmd /u /c reg query '+ regKey +' /s';
	//console.log(cmdLine);
	var output = SystemWorker.exec(cmdLine).output.toString();
	var re = new RegExp('REG_SZ.*\....');
	var regArray = re.exec(output);
	var result = this.convertPathToPosix(regArray[0].slice(10));
	//console.log(result);
	return result;	
};

exports.getTargetPathofShortcut = function getTargetPathofShortcut(shortCutPath){
	console.log('-----Checking shortcut');
	var cmdLine = 'cmd /u /c Shortcut.exe /F:"'+ shortCutPath +'" /A:Q';
	console.log('cmd line pass to system worker: '+ cmdLine);
	var ouput = SystemWorker.exec(cmdLine).output.toString();
	console.log('system worker output: '+ ouput);
	var re = new RegExp("TargetPath=[^.]*.exe");
	var regArray = re.exec(ouput);
	console.log('TargetPath extracter from system worker ouput: '+ JSON.stringify(regArray));
	var result = this.convertPathToPosix(regArray[0].slice(11));
	console.log(result);
	return result;	
};

exports.deleteLog = function deleteLog(){
	console.log('-----Delete Log file');
	var path = env.TESTBASEPATH+'\\log.log';
	console.log(path);
	var logFile = File(path);
	if (logFile.exist)
		logFile.remove();
};

exports.convertPathToPosix = function convertPathToPosix(path){
	return path.replace(/\\\\/g, '/').replace(/\\/g, '/');
};

/*
exports.diffFolder = function diffFolder(){
	console.log('Diff between install & zip');
	var result = SystemWorker.exec('cmd /u /c C:\\cygwin\\bin\\diff.exe "./main/Wakanda Studio" "./main/Wakanda Studio2" -q -r > '+env.TESTBASEPATH+'logDiff.log');

	var logText = loadText(env.TESTBASEPATH + 'logDiff.log');
	if (!logText){
		console.log('Log file corrupted or not found');
		return 0;
	}
	
	console.log('Diff(s) found');
	console.log(logText);

	var logFile = File(env.TESTBASEPATH + 'logDiff.log');
	//if (logFile.exists)
	//	logFile.remove();
	
	return 1;
};
*/

