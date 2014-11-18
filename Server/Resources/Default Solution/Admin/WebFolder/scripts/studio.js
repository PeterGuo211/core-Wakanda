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


function Studio() {
	
}

Studio.prototype = {
	
	
	File : {
		
		
		//TODO
		/*bool*/
		exists : true,
		file : null,
		
		setFile : function (path) {
			this.file = path;
		}
	},
	
	alert : function alert(txt) {
		window.alert(txt);
	},
	
	getLocalIpAddresses : function getLocalIpAddresses() {
		
		var localIp = webAdmin.getLocalIpAdresses();
		return localIp.join(";");

	},
	
	editor : {
	
		getProjectPath : function getProjectPath() {

		},
		
		selectFile : function selectFile() {
			
		},
		
		selectFolder : function selectFolder() {
			
		},
		
		loaded : function loaded() {
                    this.getSettingJsonData(sources.solutions.path);
		},
		
		getSettingJsonData : function(solutionPath, projectPath) {
			
			webAdmin.getSettingJsonDataAsync({
				"onsuccess": function (response) {
                                    studio.editor.settingsLoadCaalback(response);                                    
                                    
				}
			}, solutionPath, projectPath);
		},
		
		setSettingJsonData : function(solutionPath, appName, settings) {
			
			var saveJson = studio.editor.settingsSaveCaalback();
			webAdmin.saveSettingJsonDataAsync({
				"onsuccess": function (response) {
                                    adminObject.showMessage('success', adminObject.resources.SETTINGS_SUCC_MSG);
                                    window.setTimeout(adminObject.hideMessage, 3000);
                                    if( settings != null){
	                                    sources.solutions.settings.database.fixedSize = settings.fixedSize;
	                                    sources.solutions.settings.database.flushDataCacheInterval = settings.flushDataCacheInterval;
	                                    sources.solutions.settings.solution.directory.authenticationType = settings.authenticationType;
	                                    sources.solutions.sync();
                                    }
				},
                                "onerror": function (response) {
					adminObject.showMessage('error', response);
                                        window.setTimeout(adminObject.hideMessage, 3000);
				}
			}, solutionPath, appName, saveJson);
		},
		
		setDirty : function setDirty() {
			$("#settingsSetDirty").show();
		},
	
		settingsLoadCaalback : null,
		settingsSaveCaalback : null
	}
}


var studio = new Studio();
	
