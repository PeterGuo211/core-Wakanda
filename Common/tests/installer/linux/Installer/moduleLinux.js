//Module Linux : Test of the installer 64bit - 32bit on Linux : .deb - .tgz
exports.unArchive = function unArchive(packagePathTgz, rootPathArchive) {
	var archiveTgzFile = File(packagePathTgz);
	Y.Assert.isTrue(archiveTgzFile.exists, archiveTgzFile.name + "doesn't exist");
	var archiveFolder = Folder(env.BUILD_TEST_DIR + rootPathArchive);
	console.log("ArchiveFolder" + archiveFolder);
	/**
	 *
	 *Debug Static var
	 *
	 *Value archiveFolder = Folder("/home/gbeauny/Desktop/WakTest/Testing/" + "wakanda");
	 *
	 **/
	if (archiveFolder.exists) {
		var rmUnArchive = SystemWorker.exec('sudo rm -rf' + env.BUILD_TEST_DIR + rootPathArchive);
		/**
		 *
		 *Debug Static Value
		 *
		 *var rmUnArchive = SystemWorker.exec('sudo rm -rf /home/gbeauny/Desktop/WakTest/Testing/' + "wakanda");
		 *
		 **/
		if (rmUnArchive != null) {
			console.log("rmArchive done : " + rmUnArchive.output.toString());
		} else {
			console.log("rmArchive failed : " + rmUnArchive.error.toString());
		}
		var unArchive = SystemWorker.exec('tar -xzvf' + packagePathTgz + " " + '-C' + env.BUILD_TEST_DIR + '');
		/**
		 *
		 *Debug Static Value
		 *
		 *var unArchive = SystemWorker.exec('tar -xzvf' + archiveTgzPath + " " + '-C "/home/gbeauny/Desktop/WakTest/Testing/"');
		 *
		 **/
		if (unArchive != null) {
			console.log("unArchive done : " + unArchive.output.toString());
		} else {
			console.log("unArchive failed : " + unArchive.error.toString());
		}
	} else {
		var unArchive = SystemWorker.exec('tar -xzvf' + packagePathTgz + " " + '-C' + env.BUILD_TEST_DIR + '');
		/**
		 *
		 *Debug Static Value
		 *
		 *var unArchive = SystemWorker.exec('tar -xzvf' + archiveTgzPath + " " + '-C "/home/gbeauny/Desktop/WakTest/Testing/"');
		 *
		 **/
		if (unArchive != null) {
			console.log("unArchive done : " + unArchive.output.toString());
		} else {
			console.log("unArchive failed : " + unArchive.error.toString());
		}
	}
	console.log(archiveFolder);
	return archiveFolder;
};
exports.upgrade = function upgrade(packagePath) {
	var upgrade = new SystemWorker('sudo dpkg -i' + " " + packagePath);
	/**
	 * 	Debug Static Value 
	 *
	 *	buildVersion = 6,
	 *	buildNumber = 144583,
	 *
	 **/
	upgrade.onmessage = function() {
		if (arguments[0].data != null) {
			console.log("Upgrade done : " + arguments[0].data.toString());
		} else {
			console.log("Upgrade failed : " + arguments[0].data.toString());
		}
	};
	upgrade.onterminated = function() {
		exitWait();
	};
	wait();
};
exports.upgradeVersion = function upgradeVersion(output, buildNumber) {
	var output = '';
	var upgradeVersion = SystemWorker.exec('/opt/wakanda/bin/wakanda --version');
	if (upgradeVersion != null) {
		console.log("UpgradeVersion done : " + upgradeVersion.output.toString());
		output += upgradeVersion.output.toString();
	} else {
		console.log("UpgradeVersion failed : " + upgradeVersion.error.toString());
	}
	var strMatch = buildVersion() + '.' + buildNumber;
	var result = output.replace(/\r?\n/g, '').match(strMatch);
	return [result, output];
};
exports.defaultVersion = function defaultVersion(wakBinInstaller) {
	var versionWak = SystemWorker.exec(wakBinInstaller + ' ' + '--version');
	/**
	 *	Debug Static Values
	 *
	 *	version = '6', 
	 *	buildVersion = 6,
	 *	buildNumber = 144583;
	 *
	 **/
	if (versionWak != null) {
		console.log("versionWak is : " + versionWak.output.toString());
	} else {
		console.log("versionWak failed : " + versionWak.error.toString());
	}
	var versionWak2 = versionWak.output.toString().replace(/\r?\n/g, '');
	return versionWak2;
};
exports.install = function install(packagePath, wakPath, name) {
	if (wakPath.exists) {
		var unInstall = SystemWorker.exec('sudo dpkg --purge' + ' ' + name);
		if (unInstall != null) {
			console.log("Uninstall done : " + unInstall.output.toString());
		} else {
			console.log("Uninstall failed : " + unInstall.error.toString());
		}
		var install = SystemWorker.exec('sudo dpkg -i' + " " + packagePath);
		if (install != null) {
			console.log("install done : " + update.output.toString());
		} else {
			console.log("install failed : " + update.error.toString());
		}
	} else {
		var install = SystemWorker.exec('sudo dpkg -i' + " " + packagePath);
		if (install != null) {
			console.log("install done : " + install.output);
		} else {
			console.log("install failed : " + install.error.toString());
		}
	}
};
exports.purge = function purge(name) {
	var removing = new SystemWorker('sudo dpkg --purge' + ' ' + name);
	removing.onmessage = function() {
		if (arguments[0].data != null) {
			console.log("Removing done : " + arguments[0].data.toString());
		} else {
			console.log("Removing failed : " + arguments[0].data.toString());
		}
	};
	removing.onterminated = function() {
		exitWait();
	};
	wait();
};
exports.unInstall = function unInstall() {};
exports.permission = function permission(wakPath) {
	var chmodFile = SystemWorker.exec('bash -c "chmod 775 ' + scriptPath + '"');
	var permissionWakandaFolder = SystemWorker.exec(scriptPath + " " + "displayRights" + " " + wakPath);
	if (permissionWakandaFolder != null) {
		console.log("Permission are : " + permissionWakandaFolder.output.toString());
	} else {
		console.log("Permission failed : " + permissionWakandaFolder.error.toString());
	}
	var permissionWakandaFolder2 = permissionWakandaFolder.output.toString().replace(/\r?\n/g, '');
	console.log("RightsActual" + " " + permissionWakandaFolder2);
	return permissionWakandaFolder2;
};
exports.architecture = function architecture(wakBinInstaller) {
	var architectureType = SystemWorker.exec(scriptPath + " " + "displayArchitectureType" + " " + wakBinInstaller);
	var architectureSystem = SystemWorker.exec('arch');
	/**
	 *	Debug Static Value 
	 *
	 *	architectureNumber = [32,64];
	 **/
	if (architectureType != null) {
		console.log("achitectureType is : " + architectureType.output.toString());
	} else {
		console.log("achitectureType failed : " + architectureType.error.toString());
	}
	var architectureType2 = architectureType.output.toString().replace(/\r?\n/g, '');
	var architectureSystem2 = architectureSystem.output.toString().replace(/\r?\n/g, '');
	console.log("ArchitectureType & System" + " " + architectureType2 + " " + architectureSystem2);
	return [architectureType2, architectureSystem2];
};
exports.serviceStart = function serviceStart(name) {
	var startWakanda = new SystemWorker('sudo service' + ' ' + name + ' ' + 'start');
	var output = '';
	startWakanda.onmessage = function() {
		if (arguments[0].data != null) {
			console.log("startWakanda : " + arguments[0].data.toString());
			output += arguments[0].data.toString();
		} else {
			console.log("startWakanda failed : " + arguments[0].data.toString());
		}
	};
	startWakanda.onterminated = function() {
		exitWait();
	};
	wait();
	var strMatch = 'Starting';
	var result = output.replace(/\r?\n/g, '').match(strMatch);
	return result;
};
exports.serviceStatusStop = function serviceStatusStop(name) {
	var checkStatus = SystemWorker.exec('sudo service' + ' ' + name + ' ' + 'status');
	if (checkStatus != null) {
		console.log(checkStatus.output.toString());
		if (checkStatus.output.toString() === " *" + " " + name + " " + "is not running") {
			var stopServer = SystemWorker.exec('sudo service' + ' ' + name + ' ' + 'stop');
			if (stopServer != null) {
				console.log("stopStatus done : " + stopServer.output.toString());
			} else {
				console.log("stopStatus Failed : " + stopServer.error.toString());
			}
		} else {
			console.log('Server is not running');
		}
	} else {
		console.log("CheckStatus failed :" + checkStatus.error.toString());
	}
};
exports.serviceStatusStop2 = function serviceStatusStop2(name) {
	var statusStopWakanda = new SystemWorker('sudo service' + ' ' + name + ' ' + 'status'),
		output2 = '';
	statusStopWakanda.onmessage = function() {
		if (arguments[0].data != null) {
			console.log("statusStopWakanda done : " + arguments[0].data.toString());
			output2 += arguments[0].data.toString();
		} else {
			console.log("statusStopWakanda failed : " + arguments[0].data.toString());
		}
	};
	statusStopWakanda.onterminated = function() {
		exitWait();
	};
	wait();
	var statusStopWakanda2 = output2.replace(/\r?\n/g, '');
	return statusStopWakanda2;
};
exports.serviceStatusStart = function serviceStatusStart(name) {
	var statusStartWakanda = new SystemWorker('sudo service' + ' ' + name + ' ' + 'status');
	var output2 = '';
	statusStartWakanda.onmessage = function() {
		if (arguments[0].data != null) {
			console.log("statusStartWakanda done : " + arguments[0].data.toString());
			output2 += arguments[0].data.toString();
		} else {
			console.log("statusStartWakanda failed : " + arguments[0].data.toString());
		}
	};
	statusStartWakanda.onterminated = function() {
		exitWait();
	};
	wait();
	var statusStartWakanda2 = output2.replace(/\r?\n/g, '');
	return statusStartWakanda2;
};
exports.serviceStatusRestart = function serviceStatusRestart(name) {
	var statusRestartWakanda = new SystemWorker('sudo service' + ' ' + name + ' ' + 'status');
	var output2 = '';
	statusRestartWakanda.onmessage = function() {
		if (arguments[0].data != null) {
			console.log("statusRestartWakanda done : " + arguments[0].data.toString());
			output2 += arguments[0].data.toString();
		} else {
			console.log("statusRestartWakanda failed : " + arguments[0].data.toString());
		}
	};
	statusRestartWakanda.onterminated = function() {
		exitWait();
	};
	wait();
	var statusRestartWakanda2 = output2.replace(/\r?\n/g, '');
	return statusRestartWakanda2;
};
exports.serviceStop = function serviceStop(name) {
	var stopWakanda = new SystemWorker('sudo service' + ' ' + name + ' ' + 'stop');
	var output = '';
	stopWakanda.onmessage = function() {
		if (arguments[0].data != null) {
			console.log("stopWakanda : " + arguments[0].data.toString());
			output += arguments[0].data.toString();
		} else {
			console.log("stopWakanda failed : " + arguments[0].data.toString());
		}
	};
	stopWakanda.onterminated = function() {
		exitWait();
	};
	//To finish the execution of the system worker until to "exit" onterminated
	wait();
	var strMatch = 'Stopping';
	var result = output.replace(/\r?\n/g, '').match(strMatch);
	console.log("result : " + result);
	return result;
};
exports.serviceRestart = function serviceRestart(name) {
	var restartWakanda = new SystemWorker('sudo service' + ' ' + name + ' ' + 'restart');
	var ouput = '';
	restartWakanda.onmessage = function() {
		if (arguments[0].data != null) {
			console.log("restartWakanda : " + arguments[0].data.toString());
			output += arguments[0].data.toString();
		} else {
			console.log("restartWakanda failed : " + arguments[0].data.toString());
		}
	};
	restartWakanda.onterminated = function() {
		exitWait();
	};
	wait();
	var strMatch = 'Restarting';
	var result = output.replace(/\r?\n/g, '').match(strMatch);
	return result;
};
exports.licenceCheck = function licenceCheck(wakPath) {
	var getLicence = SystemWorker.exec(scriptPath + " " + "licenceCheck" + " " + wakPath);
	if (getLicence != null) {
		console.log("getLicence done : " + getLicence.output.toString());
	} else {
		console.log("getLicence failed : " + getLicence.error.toString());
	}
	var licenceFile = getLicence.output.toString().replace(/\r?\n/g, "");
	return licenceFile;
};
exports.licenceCompare = function licenceCompare(typeLicence, wakPath) {
	var getLicence = SystemWorker.exec(scriptPath + " " + "licenceCheck" + " " + wakPath);
	if (getLicence != null) {
		console.log("getLicence done : " + getLicence.output.toString());
	} else {
		console.log("getLicence failed : " + getLicence.error.toString());
	}
	var licenceFile = getLicence.output.toString().replace(/\r?\n/g, "");
	if (licenceFile == "license_Production.txt") {
		diffLicence = SystemWorker.exec('diff --normal' + wakPath + "/" + licenceFile + " " + env.P4_WORKSPACE_PATH + "/Wakanda/" + env.WAKANDA_BRANCH + "/Common/Licenses/" + typeLicence[0]);
	} else {
		diffLicence = SystemWorker.exec('diff --normal' + wakPath + "/" + licenceFile + " " + env.P4_WORKSPACE_PATH + "/Wakanda/" + env.WAKANDA_BRANCH + "/Common/Licenses/" + typeLicence[1]);
	}
	/**
	 *	Debug Static Value 
	 *
	 *	diffLicence = SystemWorker.exec('diff --normal /opt/wakanda/' + typeLicence[0] + " " + "/home/gbeauny/perforce/workspaceLinux12.04/depot/Wakanda/main/Common/Licenses/" + typeLicence[0])
	 *
	 **/
	// if (typeLicence !=null) {
	// 	console.log("Licence files aren't the same : " + diffLicence.output.toString());
	// } else {
	// 	console.log("Licence files are the same");
	// }
	console.log("Diff between licence file" + " " + diffLicence.output.toString());
	var diffLicence2 = diffLicence.output.toString();
	return diffLicence2;
};