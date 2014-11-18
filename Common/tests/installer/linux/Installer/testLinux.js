//Global Variable 
var scriptPath = env.TESTBASEPATH + '/Installer/scriptLinux.sh';
var installerLinux = require('./moduleLinux');
var wakBinInstallerG = ["/opt/wakanda/bin/wakanda", "/opt/wakanda-enterprise/bin/wakandaenterprise"];
var wakBinTgzG = [env.BUILD_TEST_DIR + "/wakanda/bin/wakanda", env.BUILD_TEST_DIR + "/wakanda-enterprise/bin/wakandaenterprise"];
var PathInstallerG = ["/opt/wakanda/bin", "/opt/wakanda-enterprise/bin"];
var PathTgzG = [env.BUILD_TEST_DIR + "/wakanda/bin", env.BUILD_TEST_DIR + "/wakanda-enterprise/bin"];
var rootPathArchiveG = ["/wakanda", "/wakanda-enterprise"];
var wakPathTgzG = [env.BUILD_TEST_DIR + "/wakanda", env.BUILD_TEST_DIR + "/wakanda-enterprise"];
var wakPathG = ["/opt/wakanda", "/opt/wakanda-enterprise"];
var wakScriptG = ["/etc/init.d/wakanda", "/etc/init.d/wakanda-enterprise"];
var wakSymLinkG = ["/usr/local/bin/wakanda", "/usr/local/bin/wakanda-enterprise"];
var nameG = ["wakanda", "wakanda-enterprise"];
var nameVersionG = ["Wakanda Server", "Wakanda Enterprise Server"];

function contents(packagePath) {
	if (typeof env === 'undefined' || typeof env.TESTBASEPATH === 'undefined') {
		if (typeof application !== 'undefined' && typeof application.getFolder === 'function') {
			var scriptPath = application.getFolder('path') + 'scriptLinux.sh';
		} else {
			return [];
		}
	} else {
		var scriptPath = env.TESTBASEPATH + '/Installer/scriptLinux.sh';
	}
	var chmodWorker = new SystemWorker('bash -c "chmod 775' + scriptPath + '"');
	chmodWorker.onterminated = function() {
		exitWait();
	}
	wait();
	var output = '';
	var contentsWorker = new SystemWorker(scriptPath + " " + "showContents" + " " + '"' + packagePath + '"');
	contentsWorker.onmessage = function() {
		output += arguments[0].data.toString();
	};
	contentsWorker.onterminated = function() {
		exitWait();
	}
	wait();
	var result = [];
	output.replace(/^\s+/g, '').replace(/\s+$/g, '').split(/\r?\n/).forEach(function(outputLine) {
		if (/bin\/wakanda/i.test(outputLine) || /license_/i.test(outputLine)) {
			var line = outputLine.split(/\s/);
			result.push(line[line.length - 1]);
		}
	});
	return result;
}

function isUppercaseOrLowercase(string) {
	var i = 0,
		ch = '';
	while (i <= string.length) {
		character = string.charAt(i);
		if (!isNaN(character * 1)) {
			console.log('Numeric');
		} else {
			if (character == character.toUpperCase()) {
				console.log('Uppercase');
				return false;
			}
			if (character == character.toLowerCase()) {
				console.log('Lowercase');
				return true;
			}
		}
		i++;
	}
}

function buildVersion() {
	var result = null;
	if (env.WAKANDA_BRANCH == 'main') {
		result = 0;
	} else {
		result = env.WAKANDA_BRANCH.replace(/\D+/, '');
	}
	return result;
}

function version() {
	var result = null;
	if (env.WAKANDA_BRANCH == 'main') {
		result = 'Dev';
	} else {
		result = env.WAKANDA_BRANCH.replace(/\D+/, '');
	}
	return result;
}
/** Package Deb or tgz : 32bit & 64bit **/
/** How to get installer TGZ : 32bit & 64bit && Deb : 32bit & 64bit **/
if (typeof env === 'undefined') {
	var packagePath = null;
	var	packagePathTgz = null;
} else {
	var WIP = env.WAKANDA_INSTALLER_PATH;
	var packagePathG = WIP.split(',');
	var packagePathTgzG = [env.WAKANDA_INSTALLER_PATH + '/Installer.tgz', env.WAKANDA_INSTALLER_PATH + '/InstallerEnterprise.tgz'];
}
var testCase = {
	name: 'Test of the installer and archive 64bit - 32bit on Linux',
	_should: {
		error: {},
		ignore: {
			testUnarchiveCommunity_5: true,
			testInstallCommunityPackage_5:true,
			testUnarchiveEnterprise_5: true,
			testInstallEnterprisePackage_5: true, 
			testUnarchiveCommunity_0: true, 
			testUnarchiveCommunity_1: true, 
			testUnarchiveCommunity_2: true, 
			testUnarchiveCommunity_3: true, 
			testUnarchiveCommunity_4: true, 
			testUnarchiveCommunity_5: true, 
			testUnarchiveCommunity_6: true,
			testUnarchiveCommunity_7: true,
			testUnarchiveCommunity_8: true,
			testUnarchiveEnterprise_0: true, 
			testUnarchiveEnterprise_1: true, 
			testUnarchiveEnterprise_2: true, 
			testUnarchiveEnterprise_3: true, 
			testUnarchiveEnterprise_4: true, 
			testUnarchiveEnterprise_5: true, 
			testUnarchiveEnterprise_6: true,
			testUnarchiveEnterprise_7: true,
			testUnarchiveEnterprise_8: true
		}
	},
	/*test1HasExpectedContent: function () {
		var packageFile = File(packagePath);
		Y.Assert.isTrue(packageFile.exists);
		var actual = contents(packagePath);
		Y.ArrayAssert.itemsAreSimilar(['./opt/wakanda/bin/wakanda', './opt/wakanda/license_Production.txt'], actual);
	}*/
	/** Test All-in-one 64bit / 32bit Tgz | Community **/
	/** UnArchivage **/
	/* Check if folder "wakanda" exist after unArchive it */
	testUnarchiveCommunity_0: function() {
		var rootPathArchive = rootPathArchiveG[0];
		var packagePathTgz = packagePathTgzG[0];
		var result = installerLinux.unArchive(packagePathTgz, rootPathArchive);
		Y.Assert.isTrue(result.exists, "Archive uncompressed doesn't exist :" + ' ' + result.name);
	},
	testUnarchiveCommunity_1: function() {
		var result = Folder(wakPathTgzG[0]); 
		Y.Assert.isTrue(result.exists, "Folder doesn't exist :" + ' ' + result.name);
		Y.Assert.isTrue(isUppercaseOrLowercase(result.name));
	},
	testUnarchiveCommunity_2: function() {
		var wakPathTgz = wakPathTgzG[0];
		var result = installerLinux.licenceCheck(wakPathTgz);
		var newFileLicence = File(wakPathTgzG[0] + "/" + result);
		Y.Assert.isTrue(newFileLicence.exists, newFileLicence.name + ' ' + "doesn't exist");
	},
	testUnarchiveCommunity_3: function() {
		var wakPathTgz = wakPathTgzG[0];
		var typeLicence = ['license_Production.txt', 'license_Stabilisation.txt'];
		var result = installerLinux.licenceCompare(typeLicence, wakPathTgz);
		Y.Assert.areEqual("", result, "Licence File is wrong");
	},
	testUnarchiveCommunity_4: function() {
		var result = installerLinux.permission(wakPathTgzG[0]);
		Y.Assert.areEqual('775 drwxrwxr-x', result, "Permission are wrong");
	},
	testUnarchiveCommunity_5: function() {
		//Check if we have the number of files in the zip and the package
	},
	testUnarchiveCommunity_6: function() {
		var wakBinTgz = wakBinTgzG[0];
		//Check if we have the number of files in the zip and the package
		var chmodFile = SystemWorker.exec('bash -c "chmod 775 ' + scriptPath + '"');
		var architectureNumber = [32, 64];
		var result = installerLinux.architecture(wakBinTgz);
		if (result[1] == "x86_64") {
			Y.Assert.areEqual('' + architectureNumber[1] + '-bit', result[0], "Architecture isn't equal, must be 64bit");
		} else {
			Y.Assert.areEqual('' + architectureNumber[0] + '-bit', result[0], "Architecture isn't equal, must be 32bit");
		}
	},
	testUnarchiveCommunity_7: function() {
		var wakBinTgz = wakBinTgzG[0];
		var result = installerLinux.defaultVersion(wakBinTgz);
		/**
		 *	Debug Static Assert 
		 *
		 *	Y.Assert.areEqual("Wakanda Server" + " " + version + " " + "build" + " " + buildVersion + "." + buildNumber,versionWak2);
		 **/
		//To Check
		Y.Assert.areEqual(nameVersionG[0] + " " + version() + " " + "build" + " " + buildVersion() + "." + env.CHANGELIST, result, "Build version name aren't equal (Option --version)");
	},
	testUnarchiveCommunity_8: function() {
		var filesFoldersName = [PathTgzG[0] + "/Libs/RemoteEntity.so",
			                    PathTgzG[0] + "/Libs/SQLEntity.so",
			                    PathTgzG[0] + "/Libs/SQLModel.so",
			                    PathTgzG[0] + "/Libs/SQLUtilities.so",
			                    PathTgzG[0] + "/Native\\ Components/MSSQLConnector.bundle/Contents/Linux/MSSQLConnector.so",
			                    PathTgzG[0] + "/Native\\ Components/MySQLConnector.bundle/Contents/Linux/MySQLConnector.so",
			                    PathTgzG[0] + "/Native\\ Components/ODBCConnector.bundle/Contents/Linux/ODBCConnector.so",
			                    PathTgzG[0] + "/Modules/waf-aws/",
			                    PathTgzG[0] + "/Modules/waf-azure/",
			                    PathTgzG[0] + "/Modules/waf-sql/"
			                      ];
		for (var i = 0; i < filesFoldersName.length; i++) {
			var filesCheckInstaller = SystemWorker.exec(scriptPath + " " + "enterpriseSpecific" + " " + filesFoldersName[i]);
			if (filesCheckInstaller != null) {
				console.log("filesCheck is : " + filesCheckInstaller.output.toString());
			} else {
				console.log("filesCheck failed : " + filesCheckInstaller.error.toString());
			}
			var result = filesCheckInstaller.output.toString().replace(/\r?\n/g, '');
			Y.Assert.areEqual(filesFoldersName[i].replace("\\", "") + " " + "doesn't exist", result, filesFoldersName[i] + " " + "exist and mustn't exist");
		}
	},
	/** Test All-in-one 64bit / 32bit Deb | Community **/
	/** Upgrade & Removing with lastVersion **/
	testUpgradeCommunityPackage_0: function() {
		var buildNumber = env.CHANGELIST;
		var packagePath = packagePathG[2];
		installerLinux.upgrade(packagePath);
		var wakPath = Folder(wakPathG[0]),
			wakExe = File(wakBinInstallerG[0]),
			wakScript = File(wakScriptG[0]),
			wakSymLink = File(wakSymLinkG[0]);
		Y.Assert.isTrue(wakPath.exists, wakPath.name + ' ' + "doesn't exist");
		Y.Assert.isTrue(wakExe.exists, wakExe.name + ' ' + "doesn't exist");
		Y.Assert.isTrue(wakScript.exists, wakScript.name + ' ' + "doesn't exist");
		Y.Assert.isTrue(wakSymLink.exists, wakSymLink.name + ' ' + "doesn't exist");
		var result = installerLinux.upgradeVersion(output, buildNumber);
		Y.Assert.areEqual(buildVersion() + '.' + buildNumber, result[0], "Match doesn't work, the value of output is :" + ' ' + result[1]);
	},
	testRemovingCommunityPackage_0: function() {
		var name = nameG[0];
		installerLinux.purge(name);
		var wakPath = Folder(wakPathG[0]),
			wakExe = File(wakBinInstallerG[0]),
			wakScript = File(wakScriptG[0]),
			wakSymLink = File(wakSymLinkG[0]);
		Y.Assert.isFalse(wakPath.exists, wakPath.name + ' ' + "doesn't exist");
		Y.Assert.isFalse(wakExe.exists, wakExe.name + ' ' + "doesn't exist");
		Y.Assert.isFalse(wakScript.exists, wakScript.name + ' ' + "doesn't exist");
		Y.Assert.isFalse(wakSymLink.exists, wakSymLink.name + ' ' + "doesn't exist");
	},
	/** Installation **/
	/* Check if folder "/opt/wakanda" exist after to have install the package */
	testInstallCommunityPackage_1: function() {
		var packageFile = File(packagePathG[2]);
		Y.Assert.isTrue(packageFile.exists, packageFile.name + ' ' + "doesn't exist");
		var wakPath = Folder(wakPathG[0]);
		var name = nameG[0];
		var packagePath = packagePathG[2];
		installerLinux.install(packagePath, wakPath, name);
		/** Check Wakanda if status is "Not Running" **/
		installerLinux.serviceStatusStop(name);
		var newWakPathWakanda = Folder(wakPathG[0]),
			newWakPathWakandaBin = Folder(PathInstallerG[0]);
		//Assert on Server not Running 					
		Y.Assert.isTrue(isUppercaseOrLowercase(newWakPathWakanda.name), "Wakanda name isn't in lowcase");
		Y.Assert.isTrue(newWakPathWakandaBin.exists, newWakPathWakandaBin.name + ' ' + "doesn't exist");
		Y.Assert.isTrue(newWakPathWakanda.exists, newWakPathWakanda.name + ' ' + "doesn't exist");
	},
	testInstallCommunityPackage_2: function() {
		var wakPath = wakPathG[0];
		var result = installerLinux.licenceCheck(wakPath);
		var newFileLicence = File(wakPathG[0] + "/" + result);
		Y.Assert.isTrue(newFileLicence.exists, newFileLicence.name + ' ' + "doesn't exist");
	},
	testInstallCommunityPackage_3: function() {
		var wakPath = wakPathG[0];
		var typeLicence = ['license_Production.txt', 'license_Stabilisation.txt'];
		var result = installerLinux.licenceCompare(typeLicence, wakPath);
		Y.Assert.areEqual("", result, "Licence File is wrong");
	},
	testInstallCommunityPackage_4: function() {
		var result = installerLinux.permission(wakPathG[0]);
		Y.Assert.areEqual('775 drwxrwxr-x', result, "Permission are wrong");
	},
	testInstallCommunityPackage_5: function() {
		//Check if we have the number of files in the zip and the package
	},
	/** Execution **/
	testExecutionCommunityPackage_6: function() {
		var wakBinInstaller = wakBinInstallerG[0];
		//Check if we have the number of files in the zip and the package
		var chmodFile = SystemWorker.exec('bash -c "chmod 775 ' + scriptPath + '"');
		var architectureNumber = [32, 64];
		var result = installerLinux.architecture(wakBinInstaller);
		if (result[1] == "x86_64") {
			Y.Assert.areEqual('' + architectureNumber[1] + '-bit', result[0], "Architecture isn't equal, must be 64bit");
		} else {
			Y.Assert.areEqual('' + architectureNumber[0] + '-bit', result[0], "Architecture isn't equal, must be 32bit");
		}
	},
	testExecutionCommunityPackage_7: function() {
		var wakBinInstaller = wakBinInstallerG[0];
		var result = installerLinux.defaultVersion(wakBinInstaller);
		/**
		 *	Debug Static Assert 
		 *
		 *	Y.Assert.areEqual("Wakanda Server" + " " + version + " " + "build" + " " + buildVersion + "." + buildNumber,versionWak2);
		 **/
		//To Check
		Y.Assert.areEqual(nameVersionG[0] + " " + version() + " " + "build" + " " + buildVersion() + "." + env.CHANGELIST, result, "Build version name aren't equal (Option --version)");
	},
	testExecutionCommunityPackage_8: function() {
		var name = nameG[0];
		var result = installerLinux.serviceStart(name);
		var result2 = installerLinux.serviceStatusStart(name);
		Y.Assert.areEqual(' *' + ' ' + nameG[0] + ' ' + 'is running', result2, "Start Status isn't equal");
		Y.Assert.areEqual('Starting', result, "Word Starting doesn't exist");
	},
	testExecutionCommunityPackage_9: function() {
		var name = nameG[0];
		var result = installerLinux.serviceRestart(name);
		wait(30000); //must be updated Stop is too long, we have no control on it
		var result2 = installerLinux.serviceStatusRestart(name);
		Y.Assert.areEqual(' *' + ' ' + nameG[0] + ' ' + 'is running', result2, "Restart Status isn't equal");
		Y.Assert.areEqual('Restarting', result, "Word Restarting doesn't exist");
	},
	testExecutionCommunityPackage_10: function() {
		//GetInfo from buildInfo solution 
	},
	testExecutionCommunityPackage_11: function() {
		var name = nameG[0];
		var result = installerLinux.serviceStop(name);
		wait(30000); //must be updated Stop is too long, we have no control on it
		var result2 = installerLinux.serviceStatusStop2(name);
		Y.Assert.areEqual(' *' + ' ' + nameG[0] + ' ' + 'is not running', result2, "Stop Status isn't equal");
		Y.Assert.areEqual('Stopping', result, "Word Stopping doesn't exist");
	},
	testEnterpriseFilesExistingCommunityPackage_12: function() {
		var filesFoldersName = [PathInstallerG[0] + "/Libs/RemoteEntity.so",
			                          PathInstallerG[0] + "/Libs/SQLEntity.so",
			                          PathInstallerG[0] + "/Libs/SQLModel.so",
			                          PathInstallerG[0] + "/Libs/SQLUtilities.so",
			                          PathInstallerG[0] + "/Native\\ Components/MSSQLConnector.bundle/Contents/Linux/MSSQLConnector.so",
			                          PathInstallerG[0] + "/Native\\ Components/MySQLConnector.bundle/Contents/Linux/MySQLConnector.so",
			                          PathInstallerG[0] + "/Native\\ Components/ODBCConnector.bundle/Contents/Linux/ODBCConnector.so",
			                          PathInstallerG[0] + "/Modules/waf-aws/",
			                          PathInstallerG[0] + "/Modules/waf-azure/",
			                          PathInstallerG[0] + "/Modules/waf-sql/"
			                      ];
		for (var i = 0; i < filesFoldersName.length; i++) {
			var filesCheckInstaller = SystemWorker.exec(scriptPath + " " + "enterpriseSpecific" + " " + filesFoldersName[i]);
			if (filesCheckInstaller != null) {
				console.log("filesCheck is : " + filesCheckInstaller.output.toString());
			} else {
				console.log("filesCheck failed : " + filesCheckInstaller.error.toString());
			}
			var result = filesCheckInstaller.output.toString().replace(/\r?\n/g, '');
			Y.Assert.areEqual(filesFoldersName[i].replace("\\", "") + " " + "doesn't exist", result, filesFoldersName[i] + " " + "exist and mustn't exist");
		}
	},
	/** Test All-in-one 64bit / 32bit Tgz | Enterprise **/
	/** UnArchivage **/
	/* Check if folder "wakanda" exist after unArchive it */
	testUnarchiveEnterprise_0: function() {
		var rootPathArchive = rootPathArchiveG[1];
		var packagePathTgz = packagePathTgzG[1];
		var result = installerLinux.unArchive(packagePathTgz, rootPathArchive);
		Y.Assert.isTrue(result.exists, "Archive uncompressed doesn't exist :" + ' ' + result.name);
	},
	testUnarchiveEnterprise_1: function() {
		var result = Folder(wakPathTgzG[1]); 
		Y.Assert.isTrue(result.exists, "Folder doesn't exist :" + ' ' + result.name);
		Y.Assert.isTrue(isUppercaseOrLowercase(result.name));
	},
	testUnarchiveEnterprise_2: function() {
		var wakPathTgz = wakPathTgzG[1];
		var result = installerLinux.licenceCheck(wakPathTgz);
		var newFileLicence = File(wakPathTgzG[1] + "/" + result);
		Y.Assert.isTrue(newFileLicence.exists, newFileLicence.name + ' ' + "doesn't exist");
	},
	testUnarchiveEnterprise_3: function() {
		var wakPathTgz = wakPathTgzG[1];
		var typeLicence = ['license_Production.txt', 'license_Stabilisation.txt'];
		var result = installerLinux.licenceCompare(typeLicence, wakPathTgz);
		Y.Assert.areEqual("", result, "Licence File is wrong");
	},
	testUnarchiveEnterprise_4: function() {
		var result = installerLinux.permission(wakPathTgzG[1]);
		Y.Assert.areEqual('775 drwxrwxr-x', result, "Permission are wrong");
	},
	testUnarchiveEnterprise_5: function() {
		//Check if we have the number of files in the zip and the package
	},
	testUnarchiveEnterprise_6: function() {
		var wakBinTgz = wakBinTgzG[1];
		//Check if we have the number of files in the zip and the package
		var chmodFile = SystemWorker.exec('bash -c "chmod 775 ' + scriptPath + '"');
		var architectureNumber = [32, 64];
		var result = installerLinux.architecture(wakBinTgz);
		if (result[1] == "x86_64") {
			Y.Assert.areEqual('' + architectureNumber[1] + '-bit', result[0], "Architecture isn't equal, must be 64bit");
		} else {
			Y.Assert.areEqual('' + architectureNumber[0] + '-bit', result[0], "Architecture isn't equal, must be 32bit");
		}
	},
	testUnarchiveEnterprise_7: function() {
		var wakBinTgz = wakBinTgzG[1];
		var result = installerLinux.defaultVersion(wakBinTgz);
		/**
		 *	Debug Static Assert 
		 *
		 *	Y.Assert.areEqual("Wakanda Server" + " " + version + " " + "build" + " " + buildVersion + "." + buildNumber,versionWak2);
		 **/
		//To Check
		Y.Assert.areEqual(nameVersionG[1] + " " + version() + " " + "build" + " " + buildVersion() + "." + env.CHANGELIST, result, "Build version name aren't equal (Option --version)");
	},
	testUnarchiveEnterprise_8: function() {
		//FolderWAFAzure isn't finished as yet for Enterprise Version : Libs musn't be there
		var folderWAFAzure = PathTgzG[1] + "/Modules/waf-azure/";
		//FolderWAFAWS isn't finished as yet for Enterprise Version : Libs musn't be there
		var folderWAFAws = PathTgzG[1] + "/Modules/waf-azure/"; 
		var filesFoldersName = [PathTgzG[1] + "/Libs/RemoteEntity.so",
			                    PathTgzG[1] + "/Libs/SQLEntity.so",
			                    PathTgzG[1] + "/Libs/SQLModel.so",
			                    PathTgzG[1] + "/Libs/SQLUtilities.so",
			                    PathTgzG[1] + "/Native\\ Components/MSSQLConnector.bundle/Contents/Linux/MSSQLConnector.so",
			                    PathTgzG[1] + "/Native\\ Components/MySQLConnector.bundle/Contents/Linux/MySQLConnector.so",
			                    PathTgzG[1] + "/Native\\ Components/ODBCConnector.bundle/Contents/Linux/ODBCConnector.so",
			                    //PathTgzG[1] + "/Modules/waf-aws/",
			                    //PathTgzG[1] + "/Modules/waf-azure/",
			                    PathTgzG[1] + "/Modules/waf-sql/"
			                        ];
		for (var i = 0; i < filesFoldersName.length; i++) {
			var filesCheckInstaller = SystemWorker.exec(scriptPath + " " + "enterpriseSpecific" + " " + filesFoldersName[i]);
			if (filesCheckInstaller != null) {
				console.log("filesCheck is : " + filesCheckInstaller.output.toString());
			} else {
				console.log("filesCheck failed : " + filesCheckInstaller.error.toString());
			}
			var result = filesCheckInstaller.output.toString().replace(/\r?\n/g, '');
			Y.Assert.areEqual(filesFoldersName[i].replace("\\", "") + " " + "exist", result, filesFoldersName[i] + " " + "doesn't exist and must exist");
		}

			//waf-azure isn't finished as yet for Enterprise Version : Libs musn't be there
			var folderWAFAzureInstaller = SystemWorker.exec(scriptPath + " " + "enterpriseSpecific" + " " + folderWAFAzure);
			if (folderWAFAzureInstaller != null) {
				console.log("filesCheck is : " + folderWAFAzureInstaller.output.toString());
			} else {
				console.log("filesCheck failed : " + folderWAFAzureInstaller.error.toString());
			}
			var result = folderWAFAzureInstaller.output.toString().replace(/\r?\n/g, '');

			Y.Assert.areEqual(folderWAFAzure.replace("\\", "") + " " + "doesn't exist", result, folderWAFAzure + " " + "exist and mustn't exist");

			//waf-aws isn't finished as yet for Enterprise Version : Libs musn't be there
			var folderWAFAwsInstaller = SystemWorker.exec(scriptPath + " " + "enterpriseSpecific" + " " + folderWAFAws);
			if (folderWAFAwsInstaller != null) {
				console.log("filesCheck is : " + folderWAFAwsInstaller.output.toString());
			} else {
				console.log("filesCheck failed : " + folderWAFAwsInstaller.error.toString());
			}
			var result = folderWAFAwsInstaller.output.toString().replace(/\r?\n/g, '');

			Y.Assert.areEqual(folderWAFAws.replace("\\", "") + " " + "doesn't exist", result, folderWAFAws + " " + "exist and mustn't exist");
	
	},
	/** Test All-in-one 64bit / 32bit Deb | Enterprise **/
	/** Upgrade & Removing with lastVersion **/
	testUpgradeEnterprisePackage_0: function() {
		var buildNumber = env.CHANGELIST;
		var packagePath = packagePathG[0];
		installerLinux.upgrade(packagePath);
		var wakPath = Folder(wakPathG[1]),
			wakExe = File(wakBinInstallerG[1]),
			wakScript = File(wakScriptG[1]),
			wakSymLink = File(wakSymLinkG[1]);
		Y.Assert.isTrue(wakPath.exists, wakPath.name + ' ' + "doesn't exist");
		Y.Assert.isTrue(wakExe.exists, wakExe.name + ' ' + "doesn't exist");
		Y.Assert.isTrue(wakScript.exists, wakScript.name + ' ' + "doesn't exist");
		Y.Assert.isTrue(wakSymLink.exists, wakSymLink.name + ' ' + "doesn't exist");
		var result = installerLinux.upgradeVersion(output, buildNumber);
		Y.Assert.areEqual(buildVersion() + '.' + buildNumber, result[0], "Match doesn't work, the value of output is :" + ' ' + result[1]);
	},
	testRemovingEnterprisePackage_0: function() {
		var name = nameG[1];
		installerLinux.purge(name);
		var wakPath = Folder(wakPathG[1]),
			wakExe = File(wakBinInstallerG[1]),
			wakScript = File(wakScriptG[1]),
			wakSymLink = File(wakSymLinkG[1]);
		Y.Assert.isFalse(wakPath.exists, wakPath.name + ' ' + "doesn't exist");
		Y.Assert.isFalse(wakExe.exists, wakExe.name + ' ' + "doesn't exist");
		Y.Assert.isFalse(wakScript.exists, wakScript.name + ' ' + "doesn't exist");
		Y.Assert.isFalse(wakSymLink.exists, wakSymLink.name + ' ' + "doesn't exist");
	},
	/** Installation **/
	/* Check if folder "/opt/wakanda" exist after to have install the package */
	testInstallEnterprisePackage_1: function() {
		var packageFile = File(packagePathG[0]);
		Y.Assert.isTrue(packageFile.exists, packageFile.name + ' ' + "doesn't exist");
		var wakPath = Folder(wakPathG[1]);
		var name = nameG[1];
		var packagePath = packagePathG[0];
		installerLinux.install(packagePath, wakPath, name);
		/** Check Wakanda if status is "Not Running" **/
		installerLinux.serviceStatusStop(name);
		var newWakPathWakanda = Folder(wakPathG[1]),
			newWakPathWakandaBin = Folder(PathInstallerG[1]);
		//Assert on Server not Running 					
		Y.Assert.isTrue(isUppercaseOrLowercase(newWakPathWakanda.name), "Wakanda Enterprise name isn't in lowcase");
		Y.Assert.isTrue(newWakPathWakandaBin.exists, newWakPathWakandaBin.name + ' ' + "doesn't exist");
		Y.Assert.isTrue(newWakPathWakanda.exists, newWakPathWakanda.name + ' ' + "doesn't exist");
	},
	testInstallEnterprisePackage_2: function() {
		var wakPath = wakPathG[1];
		var result = installerLinux.licenceCheck(wakPath);
		var newFileLicence = File(wakPathG[1] + "/" + result);
		Y.Assert.isTrue(newFileLicence.exists, newFileLicence.name + ' ' + "doesn't exist");
	},
	testInstallEnterprisePackage_3: function() {
		var wakPath = wakPathG[1];
		var typeLicence = ['license_Production.txt', 'license_Stabilisation.txt'];
		var result = installerLinux.licenceCompare(typeLicence, wakPath);
		Y.Assert.areEqual("", result, "Licence File is wrong");
	},
	testInstallEnterprisePackage_4: function() {
		var result = installerLinux.permission(wakPathG[1]);
		Y.Assert.areEqual('775 drwxrwxr-x', result, "Permission are wrong");
	},
	testInstallEnterprisePackage_5: function() {
		//Check if we have the number of files in the zip and the package
	},
	/** Execution **/
	testExecutionEnterprisePackage_6: function() {
		var wakBinInstaller = wakBinInstallerG[1];
		//Check if we have the number of files in the zip and the package
		var chmodFile = SystemWorker.exec('bash -c "chmod 775 ' + scriptPath + '"');
		var architectureNumber = [32, 64];
		var result = installerLinux.architecture(wakBinInstaller);
		if (result[1] == "x86_64") {
			Y.Assert.areEqual('' + architectureNumber[1] + '-bit', result[0], "Architecture isn't equal, must be 64bit");
		} else {
			Y.Assert.areEqual('' + architectureNumber[0] + '-bit', result[0], "Architecture isn't equal, must be 32bit");
		}
	},
	testExecutionEnterprisePackage_7: function() {
		var wakBinInstaller = wakBinInstallerG[1];
		var result = installerLinux.defaultVersion(wakBinInstaller);
		/**
		 *	Debug Static Assert 
		 *
		 *	Y.Assert.areEqual("Wakanda Server" + " " + version + " " + "build" + " " + buildVersion + "." + buildNumber,versionWak2);
		 **/
		//To Check
		Y.Assert.areEqual(nameVersionG[1] + " " + version() + " " + "build" + " " + buildVersion() + "." + env.CHANGELIST, result, "Build version name aren't equal (Option --version)");
	},
	testExecutionEnterprisePackage_8: function() {
		var name = nameG[1];
		var result = installerLinux.serviceStart(name);
		var result2 = installerLinux.serviceStatusStart(name);
		Y.Assert.areEqual(' *' + ' ' + nameG[1] + ' ' + 'is running', result2, "Start Status isn't equal");
		Y.Assert.areEqual('Starting', result, "Word Starting doesn't exist");
	},
	testExecutionEnterprisePackage_9: function() {
		var name = nameG[1];
		var result = installerLinux.serviceRestart(name);
		wait(30000); //must be updated Stop is too long, we have no control on it
		var result2 = installerLinux.serviceStatusRestart(name);
		Y.Assert.areEqual(' *' + ' ' + nameG[1] + ' ' + 'is running', result2, "Restart Status isn't equal");
		Y.Assert.areEqual('Restarting', result, "Word Restarting doesn't exist");
	},
	testExecutionEnterprisePackage_10: function() {
		//GetInfo from buildInfo solution 
	},
	testExecutionEnterprisePackage_11: function() {
		var name = nameG[1];
		var result = installerLinux.serviceStop(name);
		wait(30000); //must be updated Stop is too long, we have no control on it
		var result2 = installerLinux.serviceStatusStop2(name);
		Y.Assert.areEqual(' *' + ' ' + nameG[1] + ' ' + 'is not running', result2, "Stop Status isn't equal");
		Y.Assert.areEqual('Stopping', result, "Word Stopping doesn't exist");
	},
	testEnterpriseFilesExistingEnterprisePackage_12: function() {
		//FolderWAFAzure isn't finished as yet for Enterprise Version : Libs musn't be there
		var folderWAFAzure = PathInstallerG[1] + "/Modules/waf-azure/";
		//FolderWAFAWS isn't finished as yet for Enterprise Version : Libs musn't be there
		var folderWAFAws = PathInstallerG[1] + "/Modules/waf-azure/"; 
		var filesFoldersName = [PathInstallerG[1] + "/Libs/RemoteEntity.so",
			                            PathInstallerG[1] + "/Libs/SQLEntity.so",
			                            PathInstallerG[1] + "/Libs/SQLModel.so",
			                            PathInstallerG[1] + "/Libs/SQLUtilities.so",
			                            PathInstallerG[1] + "/Native\\ Components/MSSQLConnector.bundle/Contents/Linux/MSSQLConnector.so",
			                            PathInstallerG[1] + "/Native\\ Components/MySQLConnector.bundle/Contents/Linux/MySQLConnector.so",
			                            PathInstallerG[1] + "/Native\\ Components/ODBCConnector.bundle/Contents/Linux/ODBCConnector.so",
			                            //PathInstallerG[1] + "/Modules/waf-aws/",
			                            //PathInstallerG[1] + "/Modules/waf-azure/",
			                            PathInstallerG[1] + "/Modules/waf-sql/"
			                        ];
		for (var i = 0; i < filesFoldersName.length; i++) {
			var filesCheckInstaller = SystemWorker.exec(scriptPath + " " + "enterpriseSpecific" + " " + filesFoldersName[i]);
			if (filesCheckInstaller != null) {
				console.log("filesCheck is : " + filesCheckInstaller.output.toString());
			} else {
				console.log("filesCheck failed : " + filesCheckInstaller.error.toString());
			}
			var result = filesCheckInstaller.output.toString().replace(/\r?\n/g, '');
			Y.Assert.areEqual(filesFoldersName[i].replace("\\", "") + " " + "exist", result, filesFoldersName[i] + " " + "doesn't exist and must exist");
		}

			//waf-azure isn't finished as yet for Enterprise Version : Libs musn't be there
			var folderWAFAzureInstaller = SystemWorker.exec(scriptPath + " " + "enterpriseSpecific" + " " + folderWAFAzure);
			if (folderWAFAzureInstaller != null) {
				console.log("filesCheck is : " + folderWAFAzureInstaller.output.toString());
			} else {
				console.log("filesCheck failed : " + folderWAFAzureInstaller.error.toString());
			}
			var result = folderWAFAzureInstaller.output.toString().replace(/\r?\n/g, '');

			Y.Assert.areEqual(folderWAFAzure.replace("\\", "") + " " + "doesn't exist", result, folderWAFAzure + " " + "exist and mustn't exist");

			//waf-aws isn't finished as yet for Enterprise Version : Libs musn't be there
			var folderWAFAwsInstaller = SystemWorker.exec(scriptPath + " " + "enterpriseSpecific" + " " + folderWAFAws);
			if (folderWAFAwsInstaller != null) {
				console.log("filesCheck is : " + folderWAFAwsInstaller.output.toString());
			} else {
				console.log("filesCheck failed : " + folderWAFAwsInstaller.error.toString());
			}
			var result = folderWAFAwsInstaller.output.toString().replace(/\r?\n/g, '');

			Y.Assert.areEqual(folderWAFAws.replace("\\", "") + " " + "doesn't exist", result, folderWAFAws + " " + "exist and mustn't exist");
	}
};
if (typeof runFromCLI === 'undefined' || runFromCLI === false) {
	require('unitTest').run(testCase).getReport();
}
