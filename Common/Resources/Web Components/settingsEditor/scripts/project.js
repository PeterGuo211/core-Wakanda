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

function projectDisplay() {

	var txt_html = '';

	txt_html += displayPublishingInformation();

	txt_html += displayDatabaseJournaling();

	txt_html += displayTextCompression();

	txt_html += displaySecureConnections();

	txt_html += displayKeepAliveConnections();

	txt_html += displayWebLog();

	txt_html += displayServices();

	return txt_html;
}

function projectActivate() {

	var defaultValue = projectDefault();
	var value;
	
	var isThemeCustom, isWidgetCustom;
	var haveToSave = false;
	
	isWidgetCustom = false;
	isThemeCustom = false;
	
	if (!jsonData.virtualFolder) {
		jsonData.virtualFolder = [];
	}

	for (var p = 0; p < jsonData.virtualFolder.length; p++) {
		var itemVirtual = jsonData.virtualFolder[p];
		
		if (itemVirtual.name == 'widgets-custom') {
			isWidgetCustom = true;
			if (itemVirtual.location != defaultValue.virtualFolder[itemVirtual.name]) {
				itemVirtual.location = defaultValue.virtualFolder[itemVirtual.name];
				haveToSave = true;
			}
		}

		if (itemVirtual.name == 'themes-custom') {
			isThemeCustom = true;
			if (itemVirtual.location != defaultValue.virtualFolder[itemVirtual.name]) {
				itemVirtual.location = defaultValue.virtualFolder[itemVirtual.name];
				haveToSave = true;
			}
		}
	}

	if (!isThemeCustom) {
		jsonData.virtualFolder.push({
			name : 'themes-custom',
			location : defaultValue.virtualFolder['themes-custom']
		});
		
		haveToSave = true;
	}

	if (!isWidgetCustom) {
		jsonData.virtualFolder.push({
			name : 'widgets-custom',
			location : defaultValue.virtualFolder['widgets-custom']
		});
		
		haveToSave = true;
	}
	
	if (haveToSave) {
		setDirty();
	}

	/* PUBLISHING INFORMATIONS */
	if (jsonData.http) {

		/* Auto-Start */
		if (!jsonData.http[0].autoStart) /* Compatibility: alias:project[0].server[0].http[0].started) */
			if (jsonData.project)
				if (jsonData.project[0].servers)
					if (jsonData.project[0].servers[0].http)
						if (jsonData.project[0].servers[0].http[0].started)
							jsonData.http[0].autoStart = jsonData.project[0].servers[0].http[0].started;

		document.getElementById('autoStart').checked = eval((jsonData.http[0].autoStart) ? jsonData.http[0].autoStart
			: defaultValue.http.autoStart);

		/* TCP Port */
		document.getElementById('port').value = (jsonData.http[0].port != undefined) ? jsonData.http[0].port
		: defaultValue.http.port;

		/* Use page cache */
		document.getElementById('useCache').checked = eval((jsonData.http[0].useCache) ? jsonData.http[0].useCache
			: defaultValue.http.useCache);

		/* Page cache size ![stored in bytes and displayed in KB] */
		value = eval((jsonData.http[0].pageCacheSize) ? jsonData.http[0].pageCacheSize
			: defaultValue.http.pageCacheSize);
		document.getElementById('pageCacheSize').value = (value / 1024)
		.toFixed();

	} else {

		document.getElementById('autoStart').checked = defaultValue.http.autoStart;
		document.getElementById('port').value = defaultValue.http.port;
		document.getElementById('useCache').checked = eval(defaultValue.http.useCache);
		document.getElementById('pageCacheSize').value = (defaultValue.http.pageCacheSize / 1024)
		.toFixed();
	}

	if (jsonData.project) {

		/* Listening IP Address */
		value = (jsonData.project[0].listen != undefined) ? jsonData.project[0].listen
		: defaultValue.project.listen;
		setSelectedValue("listen", value);

		/* Host Name */
		document.getElementById('hostName').value = (jsonData.project[0].hostName != undefined) ? jsonData.project[0].hostName
		: defaultValue.project.hostName;

	} else {

		setSelectedValue("listen", defaultValue.project.listen);
		document.getElementById('hostName').value = defaultValue.project.hostName;
	}

	/* DATABASE JOURNALING INFORMATIONS */
	var def_enabled = false,
	def_journalFolder = false,
	def_restore = false,
	buffer;

	if (jsonData.project) {
		if (jsonData.project[0].database) {
			if (jsonData.project[0].database[0].journal) {
				def_enabled = (jsonData.project[0].database[0].journal[0].enabled != undefined);
				if (jsonData.project[0].database[0].journal[0].journalFolder) {
					def_journalFolder = (jsonData.project[0].database[0].journal[0].journalFolder != undefined)
					&& (jsonData.project[0].database[0].journal[0].journalFolder != null)
					&& (jsonData.project[0].database[0].journal[0].journalFolder != '');
				}
			}
			if (jsonData.project[0].database[0].autoRecovery) {
				//def_integrate = (jsonData.project[0].database[0].autoRecovery[0].integrateJournal != undefined);
				def_restore = (jsonData.project[0].database[0].autoRecovery[0].restoreFromLastBackup != undefined);
			}
		}
		/* Compatibility WAK2 -> WAK3*/
		if (!def_enabled) {
			def_enabled = (jsonData.project[0].databaseJournalEnabled != undefined);
			if (def_enabled) {
				if (!jsonData.project[0].database) {
					jsonData.project[0].database = new Array();
					jsonData.project[0].database[0] = new Object();
				}
				if (!jsonData.project[0].database[0].journal) {
					jsonData.project[0].database[0].journal = new Array();
					jsonData.project[0].database[0].journal[0] = new Object();
				}
				jsonData.project[0].database[0].journal[0].enabled = jsonData.project[0].databaseJournalEnabled;
				if (!def_journalFolder) {
					def_journalFolder = true;
					buffer = (jsonData.project[0].databaseJournalFilePath) ? jsonData.project[0].databaseJournalFilePath
					: defaultValue.project.database.journal.journalFolder;

					var x = buffer.lastIndexOf("/");
					if ((x !=-1) && (x < buffer.length)) {
						buffer = buffer.substring(0,x+1);
					}

					jsonData.project[0].database[0].journal[0].journalFolder = buffer;
				}
			}
		}
	}
	document.getElementById('databaseJournalEnabled').checked = eval((def_enabled) ? jsonData.project[0].database[0].journal[0].enabled
		: defaultValue.project.database.journal.enabled);
	document.getElementById('databaseJournalFilePath').value = (def_journalFolder) ? jsonData.project[0].database[0].journal[0].journalFolder
	: defaultValue.project.database.journal.journalFolder;
	document.getElementById('restoreFromLastBackup').checked = eval((def_restore) ? jsonData.project[0].database[0].autoRecovery[0].restoreFromLastBackup
		: defaultValue.project.database.autoRecovery.restoreFromLastBackup);

	/* TEXT COMPRESSION */
	if (jsonData.http) {

		/* Enable text compression */
		document.getElementById('allowCompression').checked = eval((jsonData.http[0].allowCompression) ? jsonData.http[0].allowCompression
			: defaultValue.http.allowCompression);

		/* Compress file over ![stored in bytes and displayed in KB] */
		value = (jsonData.http[0].compressionMinThreshold != undefined) ? jsonData.http[0].compressionMinThreshold
		: defaultValue.http.compressionMinThreshold;
		document.getElementById('compressionMinThreshold').value = (value / 1024).toFixed();

		/* Compress file under ![stored in bytes and displayed in MB] */
		value = (jsonData.http[0].compressionMaxThreshold != undefined) ? jsonData.http[0].compressionMaxThreshold
		: defaultValue.http.compressionMaxThreshold;
		document.getElementById('compressionMaxThreshold').value = (value / 1048576).toFixed();

	} else {

		document.getElementById('allowCompression').checked = eval(defaultValue.http.allowCompression);
		document.getElementById('compressionMinThreshold').value = (defaultValue.http.compressionMinThreshold / 1024).toFixed();
		document.getElementById('compressionMaxThreshold').value = (defaultValue.http.compressionMaxThreshold / 1048576).toFixed();
	}

	/* SECURE CONNECTIONS */
	var allowSSL = false;
	var SSLMandatory = false;
	// #6299
	var allowHttpOnLocal = true;
	
	if (jsonData.http) {

		/* Enable SSL */
		allowSSL = eval((jsonData.http[0].allowSSL) ? jsonData.http[0].allowSSL
			: defaultValue.http.allowSSL);

		/* Port number */
		document.getElementById('SSLPort').value = (jsonData.http[0].SSLPort != undefined) ? jsonData.http[0].SSLPort
		: defaultValue.http.SSLPort;

		/* Mandatory secure connection */
		SSLMandatory = eval((jsonData.http[0].SSLMandatory) ? jsonData.http[0].SSLMandatory
			: defaultValue.http.SSLMandatory);
			
		/* allow HTTP from localhost */	
		allowHttpOnLocal = eval((jsonData.http[0].allowHttpOnLocal) ? jsonData.http[0].allowHttpOnLocal
			: defaultValue.http.allowHttpOnLocal);

		/* Certificate path */
		if (jsonData.http[0].SSLCertificatePath != undefined) // #3677
		{
			document.getElementById('SSLCertificatePath').value = (jsonData.http[0].SSLCertificatePath != undefined) ? jsonData.http[0].SSLCertificatePath
			: defaultValue.http.SSLCertificatePath;
		}

	} else {

		allowSSL = eval(defaultValue.http.allowSSL);
		SSLMandatory = eval(defaultValue.http.SSLMandatory);
		allowHttpOnLocal = eval(defaultValue.http.allowHttpOnLocal);
		document.getElementById('SSLPort').value = defaultValue.http.SSLPort;
		document.getElementById('SSLCertificatePath').value = defaultValue.http.SSLCertificatePath;
	}	
	
	document.getElementById('httpOnly').checked = !allowSSL; 	 
	document.getElementById('httpBoth').checked = (allowSSL & !SSLMandatory); 	
	document.getElementById('httpMixed').checked = (allowSSL & SSLMandatory & allowHttpOnLocal);   
	document.getElementById('httpsOnly').checked = (allowSSL & SSLMandatory & !allowHttpOnLocal); 		

	/* KEEP-ALIVE CONNECTIONS */
	if (jsonData.http) {

		/* Use keep-alive connections */
		document.getElementById('acceptKeepAliveConnections').checked = eval((jsonData.http[0].acceptKeepAliveConnections) ? jsonData.http[0].acceptKeepAliveConnections
			: defaultValue.http.acceptKeepAliveConnections);

		/* Number of request by connection */
		document.getElementById('keepAliveMaxRequests').value = (jsonData.http[0].keepAliveMaxRequests != undefined) ? jsonData.http[0].keepAliveMaxRequests
		: defaultValue.http.keepAliveMaxRequests;

		/* Timeout */
		document.getElementById('keepAliveTimeOut').value = (jsonData.http[0].keepAliveTimeOut != undefined) ? jsonData.http[0].keepAliveTimeOut
		: defaultValue.http.keepAliveTimeOut;

	} else {

		document.getElementById('acceptKeepAliveConnections').checked = eval(defaultValue.http.acceptKeepAliveConnections);
		document.getElementById('keepAliveMaxRequests').value = defaultValue.http.keepAliveMaxRequests;
		document.getElementById('keepAliveTimeOut').value = defaultValue.http.keepAliveTimeOut;
	}

	/* WEB LOG */
	if (jsonData.http) {

		/* Log format */
		var txtLogFormat = jsonData.http[0].logFormat;
		setSelectedValue("logFormat", txtLogFormat);

		/* Tokens */
		var txtTokens = (jsonData.http[0].logTokens != undefined) ? jsonData.http[0].logTokens
		: defaultValue.http.logTokens;

		document.getElementById('logPath').value = (jsonData.http[0].logPath != undefined) ? jsonData.http[0].logPath
		: defaultValue.http.logPath;

		document.getElementById('logMaxSize').value = (jsonData.http[0].logMaxSize != undefined) ? jsonData.http[0].logMaxSize
		: defaultValue.http.logMaxSize;

	} else {

		document.getElementById('acceptKeepAliveConnections').checked = eval(defaultValue.http.acceptKeepAliveConnections);
		document.getElementById('keepAliveMaxRequests').value = defaultValue.http.keepAliveMaxRequests;
		document.getElementById('keepAliveTimeOut').value = defaultValue.http.keepAliveTimeOut;
		setSelectedValue("logFormat", defaultValue.http.logFormat);
		txtTokens = (defaultValue.http.logFormat = "ELF") ? defaultValue.http.logTokens
		: '';

		document.getElementById('logPath').value = defaultValue.http.logPath;
		document.getElementById('logMaxSize').value = defaultValue.http.logMaxSize;
	}

	$('[name="ELF-TOKEN"]').each(function() {
		$(this).removeProp("checked");
	});

	if (txtTokens) {
		var token = txtTokens.split(";");
		for (x in token) {
			if (token[x])
				document.getElementById(token[x]).checked = true;
		}
	}

	/* SERVICES */
	Services = new Array();

	if (jsonData.service) {

		// Compatibility WAK1
		// ---------------------------------------------------
		var tempo = new Array();
		var i = 0;
		for (i = 0; i < jsonData.service.length; i++) {

			tempo[i] = jsonData.service[i].name;
		}

		var tempService;
		for (i = 0; i < wakServices.length; i++) {

			if (tempo.indexOf(wakServices[i]) == -1) {

				tempService = new Object;

				//common
				tempService.name = wakServices[i];
				
				//#WAK0089073
				tempService.enabled =eval(defaultValue.services[wakServices[i]].enabled);
				
				if (jsonData[wakServices[i]]) {
					if (jsonData[wakServices[i]][0].enabled)
						tempService.autoStart = jsonData[wakServices[i]][0].enabled;
				}			

				//specific
				switch (tempService.name) {

					case "webApp":
						if (jsonData.webApp[0].directoryIndex)
							tempService.directoryIndex = jsonData.webApp[0].directoryIndex;
						break;

					case "rpc":
						if (jsonData.rpcService) {
							if (jsonData.rpcService[0].enabled)
								tempService.autoStart = jsonData.rpcService[0].enabled;
							if (jsonData.rpcService[0].pattern)
								tempService.proxyPattern = jsonData.rpcService[0].pattern;
						}
						break;
					case "Builder handler":
						if (jsonData['Builder handler']) {
							if ('hardCache' in jsonData['Builder handler'][0])
								tempService.hardCache = jsonData['Builder handler'][0].hardCache;
							if (jsonData['Builder handler'][0]['max-age'])
								tempService['max-age'] = jsonData['Builder handler'][0]['max-age'];
							if (jsonData['Builder handler'][0].modulePath)
								tempService.modulePath = jsonData['Builder handler'][0].modulePath;
						}
						break;
				}

				jsonData.service.push(tempService);
			}
		}
		// ------------------------------------------------------------------------
		var callserviceEvent;
		var j = 1000; // firts unkown service's id will be 1001
		
		for (i = 0; i < jsonData.service.length; i++) {
			var service = jsonData.service[i];
			Services[i] = clone(service);
			Services[i].index = i;
			
			var index = wakServices.indexOf(service.name);
			if(index != -1) {

				index++;
				
				//common				
				document.getElementById('autoStart_' + index).checked = eval((service.autoStart) ? service.autoStart
					: defaultValue.services[service.name].autoStart);

				//specific
				switch (service.name) {

					case "rpc":
						document.getElementById('proxyPattern_2').value = (service.proxyPattern) ? service.proxyPattern
						: defaultValue.services[service.name].proxyPattern;
						document.getElementById('publishInClientGlobalNamespace_2').checked = eval((service.publishInClientGlobalNamespace) ? service.publishInClientGlobalNamespace
							: defaultValue.services[service.name].publishInClientGlobalNamespace);
						break;

					case "upload":
						$('#maxSize_4').val(service.maxSize ? service.maxSize : defaultValue.services[service.name].maxSize);
						$('#maxFiles_4').val(service.maxFiles ? service.maxFiles : defaultValue.services[service.name].maxFiles);
						$('#sizeUnity_4').val(service.sizeUnity ? service.sizeUnity : defaultValue.services[service.name].sizeUnity);
						$('#allowedExtensions_4').val(service.allowedExtensions ? service.allowedExtensions : defaultValue.services[service.name].allowedExtensions);
						if(parseInt($('#maxSize_4').val()) < 0){
							$('#maxSize_4').val('unlimited')
						}
						if(parseInt($('#maxFiles_4').val()) < 0){
							$('#maxFiles_4').val('unlimited')
						}

						break;
						
					case "Builder handler":
						document.getElementById('hardCache_7').checked = eval(service.hardCache)? eval(service.hardCache) : defaultValue.services[service.name]['hardCache'];;
						document.getElementById('max-age_7').value = service['max-age'] ? service['max-age']
							: defaultValue.services[service.name]['max-age'];
						var stack = [];
						if (typeof service.modulePath == 'undefined') {
							service.modulePath = defaultValue.services[service.name].modulePath;
							service.enabled = 'true';
							setDirty();
						}		
						
						if (typeof service.hardCache == 'undefined') {
							stack.push(function() {
								serviceEvent.apply(document.getElementById('hardCache_7'));
							});
						}
						
						if (typeof service['max-age'] == 'undefined') {
							stack.push(function() {
								serviceEvent.apply(document.getElementById('max-age_7'));
							});
						}
						
						if (stack.length) {
							callserviceEvent = function() {
								for(var p = 0; p < stack.length; p++) {
									stack[p]();
								}
							}
						}
						break;
						
					case "Print service":
						if (typeof service.modulePath == 'undefined') {
							service.modulePath = defaultValue.services[service.name].modulePath;
						}
						break;
				}

			} else {

				index = ++j;

				//known attributes common
				if (service.autoStart) {

					document.getElementById('autoStart_' + index).checked = eval((service.autoStart)) ? service.autoStart
					: false;
				}
			}

			//minimum suite
			Services[i].id = index;
			
			if (callserviceEvent) {
				callserviceEvent();
				callserviceEvent = null;
			}
			//#WAK0089073
			document.getElementById('enabled_' + index).checked = (service.enabled) ? eval(service.enabled)
			: eval(defaultValue.services[service.name].enabled);

		}

	} else {

		//DEFAULT VALUES

		//common
		for ( i = 0; i < wakServices.length; i++) {

			j = i+1;

			document.getElementById('enabled_' + j).checked = true;
			document.getElementById('autoStart_' + j).checked = eval(defaultValue.services[wakServices[i]].autoStart);
		}

		//specific
		//rpc
		document.getElementById('proxyPattern_2').value = defaultValue.services.rpc.proxyPattern;
		document.getElementById('publishInClientGlobalNamespace_2').checked = eval(defaultValue.services.rpc.publishInClientGlobalNamespace);
	}

	// UPDATE SCREEN
	projectUpdate();

	// INSTALL EVENTS
	if (true) {
		// ****** PUBLISHING INFORMATIONS ******
		$("#autoStart").click(projectOnClick);
		$("#listen").change(projectOnSelect);
		$("#port").change(projectOnChange);
		$("#hostName").change(projectOnChange);
		//$("#directoryIndex").change(projectOnChange);
		$("#useCache").click(projectOnClick);
		$("#pageCacheSize").change(projectOnChange);

		// ****** JOURNALING INFORMATIONS ******
		$("#databaseJournalEnabled").click(projectOnClick);
		$("#databaseJournalFilePath").change(projectOnChange);
		$("#inDataFolder").click(projectOnClick);
		$("#custom").click(projectOnClick);
		//$("#integrateJournal").click(projectOnClick);
		$("#restoreFromLastBackup").click(projectOnClick);

		// ****** TEXT COMPRESSION ******
		$("#allowCompression").click(projectOnClick);
		$("#compressionMinThreshold").change(projectOnChange);
		$("#compressionMaxThreshold").change(projectOnChange);

		// ****** SECURE CONNECTIONS ******
		$("#httpOnly").click(projectOnClick);		
		$("#httpBoth").click(projectOnClick);
		$("#httpMixed").click(projectOnClick);
		$("#httpsOnly").click(projectOnClick);
		
		$("#SSLPort").change(projectOnChange);
		$("#SSLCertificatePath").change(projectOnChange);

		// ****** KEEP ALIVE CONNECTION ******
		$("#acceptKeepAliveConnections").click(projectOnClick);
		//#WAK0088437
		$("#keepAliveMaxRequests").change(projectOnChange);
		$("#keepAliveTimeOut").change(projectOnChange);
		
		
		// ****** WEB LOG ******
		$("#logFormat").change(projectOnSelect);
		$("#logMaxSize").change(projectOnChange);
		$("#logPath").change(projectOnChange);

		// ****** SERVICES ******
		$('.service').change(serviceEvent);

		// ****** COMMON ******
		$('[name="buttonBrowse"]').click(browse);
		$('.stepper').click(stepper);
		$('.stepper').click(projectOnChange);
		$('.stepper').click(setDirty);
		$('[name="ELF-TOKEN"]').change(setTokens);
		$("[name='checkAll']").click(checkAllTokens);
		$("[name='checkAll']").click(setTokens);
		$("[name='uncheckAll']").click(uncheckAllTokens);
		$("[name='uncheckAll']").click(setTokens);
		
    	$(":text").keydown(function(){setDirty();});
	}
}

function projectUpdate(what) {

	var booChecked;

	if ((!what) || (what == 'useCache')) {

		booChecked = document.getElementById('useCache').checked;
		$("#pageCacheSize").prop("disabled", !booChecked);

		if (what)
			if (booChecked)
				document.getElementById('pageCacheSize').focus();
	}

	if ((!what) || (what == 'databaseJournalEnabled')) {
		booChecked = document.getElementById('databaseJournalEnabled').checked;

		$("#databaseJournalFilePath").prop("disabled", true);//we don't want user to edit
		$("[target='databaseJournalFilePath']").prop("disabled", !booChecked);
		$("#inDataFolder").prop("disabled", !booChecked);
		$("#custom").prop("disabled", !booChecked);
		//$("#integrateJournal").prop("disabled", !booChecked);
		$("#restoreFromLastBackup").prop("disabled", !booChecked);

		if(booChecked) {
			var inDataFolder = (document.getElementById('databaseJournalFilePath').value == "./");
			document.getElementById('inDataFolder').checked = inDataFolder;
			document.getElementById('custom').checked = !inDataFolder;
			$("[target='databaseJournalFilePath']").prop("disabled", !inDataFolder);
			$("[target='databaseJournalFilePath']").prop("disabled", inDataFolder);
		}
	}

	if ((what == 'inDataFolder') | (what == 'custom')){
		booChecked = document.getElementById('inDataFolder').checked;

		$("[target='databaseJournalFilePath']").prop("disabled", booChecked);
		document.getElementById('inDataFolder').checked = booChecked;
		document.getElementById('custom').checked = !booChecked;

		if (booChecked) {

			document.getElementById('databaseJournalFilePath').value = "./";
		}
	}

	if ((!what) || (what == 'allowCompression')) {

		booChecked = document.getElementById('allowCompression').checked;

		$("#compressionMinThreshold").prop("disabled", !booChecked);
		$("#compressionMaxThreshold").prop("disabled", !booChecked);

		if (what)
			if (booChecked)
				document.getElementById('compressionMinThreshold').focus();
	}
	
	// #6299
	if ((!what) || (what == 'httpOnly')
				|| (what == 'httpBoth')
				|| (what == 'httpMixed')  
				|| (what == 'httpsOnly')) {	
	
		booChecked = !document.getElementById('httpOnly').checked;

		$("#SSLPort").prop("disabled", !booChecked);
		$("[target='SSLCertificatePath']").prop("disabled", !booChecked);
		$("#SSLCertificatePath").prop("disabled", !booChecked);
		if(document.getElementById('warningSSL')) {
			if (booChecked) {
				$("#warningSSL").removeClass("cached");
			} else {
				$("#warningSSL").addClass("cached");
			}
		}
	}

	if ((!what) || (what == 'acceptKeepAliveConnections')) {

		booChecked = document.getElementById('acceptKeepAliveConnections').checked;

		$("#keepAliveMaxRequests").prop("disabled", !booChecked);
		$("#keepAliveTimeOut").prop("disabled", !booChecked);
	}

	if ((!what) || (what == 'logFormat')) {

		var txtLogFormat = getSelectedValue('logFormat');

		if (txtLogFormat == "") {

			$("#withLog").addClass("cached");

			$("[target='logPath']").attr("disabled", true);
			$("#logPath").attr("disabled", 'disabled');
			$("#logMaxSize").attr("disabled", 'disabled');

		} else {

			$("#withLog").removeClass("cached");

			if (txtLogFormat == "ELF") {
				$("#ELF").removeClass("cached");
			} else {
				$("#ELF").addClass("cached");
			}

			$("[target='logPath']").removeAttr("disabled");
			$("#logPath").removeAttr("disabled");
			$("#logMaxSize").removeAttr("disabled");
		}
	}

	//WAK0077166
	if ((!what) || (what == 'services')) {

		var i = 0;
		var j = 1000;
		var index = 0;

		if (jsonData.service) {

			for ( i = 0; i < jsonData.service.length; i++) {

				index =  wakServices.indexOf(jsonData.service[i].name);

				if (index == -1) {
					index = ++j;
				} else {
					index++;
				}

				booChecked = document.getElementById('enabled_' + index).checked;
				$("[id$='_" + index + "']").attr("disabled", !booChecked);
				$("[id='enabled_" + index + "']").attr("disabled", false);
			}

		} else {

			for ( i = 0; i < wakServices.length; i++) {

				index = i+1
				booChecked = document.getElementById('enabled_' + index).checked;
				$("[id$='_" + index + "']").attr("disabled", !booChecked);
				$("[id='enabled_" + index + "']").attr("disabled", false);
			}
		}
	}

	return true;
}

function serviceEvent() {

	var id = this.id;
	var type = this.type;
	var serviceID = -1;
	var index = -1;

	var x = id.indexOf("_");
	if (x != -1) {
		serviceID = eval(id.substring(x + 1));
		id = id.substring(0, x);
	}
	index = serviceIndex (serviceID);
	if(index == -1) {

		if (! jsonData.service) {
			jsonData.service = new Array;
		}

		var tempService = new Object;

		tempService.name = wakServices[serviceID-1];

		switch (type) {
			case 'checkbox':
				tempService[id] = this.checked;
				break;

			case 'text':
				tempService[id] = this.value;
				break;
		}

		jsonData.service.push(tempService);

	} else {

		switch (type) {
			case 'checkbox':
				jsonData.service[index][id] = this.checked;
				break;

			case 'text':
			case 'select-one':
				jsonData.service[index][id] = this.value;
				break;
		}

		if(jsonData.service[index].name == 'upload' && ['maxSize', 'maxFiles'].indexOf(id) >= 0) {
			if(this.value < 0 || (isNaN(this.value) && this.value != 'unlimited')){
				this.value = 'unlimited';
			}

			if(isNaN(jsonData.service[index][id])){
				jsonData.service[index][id] = "-1";
			}
		}
	}
	
	setDirty();
	projectUpdate('services');
}

function projectOnClick() {

	var boo_checked = this.checked;
	var id = this.id;
	var allowSSL = false;
	var SSLMandatory = false;
	var allowHttpOnLocal = false;

	switch (id) {

		case 'httpOnly':
		case 'httpBoth':
		case 'httpMixed':
		case 'httpsOnly':
			validate('http');
			allowSSL = !document.getElementById('httpOnly').checked;
			SSLMandatory = (document.getElementById('httpsOnly').checked || document.getElementById('httpMixed').checked);
			allowHttpOnLocal = document.getElementById('httpMixed').checked;
			break;

		case 'databaseJournalEnabled':
		case 'inDataFolder':
		case 'custom':
			validate('project');
			if (!jsonData.project[0].database) {
				jsonData.project[0].database = new Array();
				jsonData.project[0].database[0] = new Object();
			}
			if (!jsonData.project[0].database[0].journal) {
				jsonData.project[0].database[0].journal = new Array();
				jsonData.project[0].database[0].journal[0] = new Object();
			}
			break;

		case 'restoreFromLastBackup':
			validate('project');
			if (!jsonData.project[0].database) {
				jsonData.project[0].database = new Array();
				jsonData.project[0].database[0] = new Object();
			}
			if (!jsonData.project[0].database[0].autoRecovery) {
				jsonData.project[0].database[0].autoRecovery = new Array();
				jsonData.project[0].database[0].autoRecovery[0] = new Object();
			}
			break;
	}

	switch (id) {

		case 'httpOnly':
		case 'httpBoth':
		case 'httpMixed':
		case 'httpsOnly':
			jsonData.http[0]['allowSSL'] = allowSSL;
			jsonData.http[0]['SSLMandatory'] = SSLMandatory;
			jsonData.http[0]['allowHttpOnLocal'] = allowHttpOnLocal;
			break;
		
		case 'autoStart':
		case 'useCache':
		case 'allowCompression':
		case 'acceptKeepAliveConnections':
			validate('http');
			jsonData.http[0][id] = boo_checked;
			break;

		case 'databaseJournalEnabled':
			jsonData.project[0].database[0].journal[0].enabled = boo_checked;
			break;

		case 'inDataFolder':
			jsonData.project[0].database[0].journal[0].journalFolder = './';
			break;

		case 'restoreFromLastBackup':
			jsonData.project[0].database[0].autoRecovery[0][id] = boo_checked;
			break;
	}

	setDirty();

	// update screen
	switch (id) {
		case 'useCache':
		case 'allowCompression':
		case 'httpOnly':
		case 'httpBoth':
		case 'httpMixed':
		case 'httpsOnly':
		case 'acceptKeepAliveConnections':
		case 'databaseJournalEnabled':
		case 'inDataFolder':
		case 'custom':
			projectUpdate(id);
	}
}

function projectOnSelect () {

	var id = this.id;

	switch (id) {

		case 'listen':
			validate('project');
			jsonData.project[0].listen = getSelectedValue(id);
			break;

		case 'logFormat':
			validate('http');
			jsonData.http[0].logFormat = getSelectedValue(id);
			projectUpdate('logFormat');
			break;
	}
	setDirty();
}

function projectOnChange() {

	var me = $(this).parent().find("input")
	var id = $(me).prop("id");
	if (id == "") {
		me = me[1];
		id = $(me).prop("id");
	}
	var value = $(me).val();
	var min = $(me).prop("min");
	var max = $(me).prop("max");
	var isMandatory = $(me).prop("mandatory");
	var boo_OK = true;
	var index= -1;

	if (isMandatory)
		boo_OK = (mandatory(value));

	if (boo_OK && (min | max))
		boo_OK = numberConstraints(eval(value), eval(min), eval(max));

	if(boo_OK) {

		switch (id) {

			case 'listen':
				validate('project');
				jsonData.project[0].listen = getSelectedValue(id);
				break;

			case 'logFormat':
				validate('http');
				jsonData.http[0].logFormat = getSelectedValue(id);
				projectUpdate('logFormat');
				break;

			case 'pageCacheSize':
			case 'compressionMinThreshold':
				validate('http');
				jsonData.http[0][id] = value * 1024;
				break;

			case 'compressionMaxThreshold':
				validate('http');
				jsonData.http[0][id] = value * 1048576;
				break;

			case 'port':
			case 'SSLPort':
			case 'SSLCertificatePath':
			case 'keepAliveMaxRequests':
			case 'keepAliveTimeOut':
			case 'logMaxSize':
			case 'logPath':
				validate('http');
				jsonData.http[0][id] = value;
				break;

			case 'hostName':
				validate('project');
				jsonData.project[0][id] = value;
				break;

			case 'databaseJournalFilePath':
			{
				var defaultValue = projectDefault();
				validate('project');
				if (!jsonData.project[0].database) {
					jsonData.project[0].database = new Array();
					jsonData.project[0].database[0] = new Object();
				}
				if (!jsonData.project[0].database[0].journal) {
					jsonData.project[0].database[0].journal = new Array();
					jsonData.project[0].database[0].journal[0] = new Object();
				}
				jsonData.project[0].database[0].journal[0].journalFolder = value
			}
			break;

		}

		setDirty();

		// update screen & verifications
		switch (id) {

			case 'logFormat':
				projectUpdate(id);
				break;
		}

	} else {

		value = setConstraints(eval(value), eval(min), eval(max))
		$(me).val([value]);
		document.getElementById([id]).focus();
		document.getElementById([id]).select();
	}
}

function serviceIndex (id) {
	var index = -1;
	
	for ( var i = 0; i < Services.length; i++) {
		
		if (Services[i].id == id) {
			index = i;
			i = 8858;
		}
	}
	return index;
}

function checkAllTokens() {
	$('[name="ELF-TOKEN"]').each(function() {
		$(this).prop("checked", "true");
	});

	setTokens();
}

function uncheckAllTokens() {
	$('[name="ELF-TOKEN"]').each(function() {
		$(this).removeProp("checked");
	});

	setTokens();
}

function setTokens() {
	var buffer = '';

	$('[name="ELF-TOKEN"]').each(function() {
		if ($(this).prop("checked")) {
			buffer += $(this).prop("id") + ";";
		}
	});

	validate('http');
	jsonData.http[0].logTokens = buffer;

	setDirty();
}

// Make sure only 1 file browser can be launched
var fileBrowserLock = false;
function browseAndGetFile(rootPath, msg) {
	if (fileBrowserLock)
		return;

	fileBrowserLock = true;
	var filePath = studio.editor.selectFile(rootPath, msg);
	fileBrowserLock = false;

	return filePath;
}

// Make sure only 1 folder browser can be launched
var folderBrowserLock = false;
function browseAndGetFolder(rootPath, msg) {
	if (folderBrowserLock)
		return;

	folderBrowserLock = true;
	var filePath = studio.editor.selectFolder(rootPath, msg);
	folderBrowserLock = false;

	return filePath;
}

function browse() {

	// get the project folder path
	var rootPath = studio.editor.getProjectPath();
	var relativePath = "";
	var filePath = "";
	var parentPath = "";
	var target = this.attributes.target.value;

	switch (target) {

		case 'SSLCertificatePath':

			filePath = browseAndGetFile(rootPath + "cert.pem", "Please select the certificat file 'cert.pem' you want to use.");
			break;

		case 'databaseJournalFilePath':
			filePath = browseAndGetFolder(rootPath, "Please select the journal's folder you wish to use.");
			break;

		case 'logPath':
			filePath = browseAndGetFolder(rootPath, "Please select the logs' folder you want to use.");
			break;

		default:
			filePath = browseAndGetFile(rootPath + "cert.pem", "Please select the certificat file 'cert.pem' you want to use.");
	}

	if (filePath != undefined && filePath.length) {

		//delete the file name
		var x = filePath.lastIndexOf("/");
		if (x != -1) {
			parentPath = filePath.substr(0,x+1);
		} else {
			parentPath = filePath;
		}

		if (parentPath.indexOf(rootPath) == 0) {
			if (parentPath == rootPath) {

				relativePath="";

			} else {

				relativePath = parentPath.substr(rootPath.length);
			}
		} else {
			relativePath = parentPath;
		}

		switch (target) {

			case 'SSLCertificatePath':

				validate('http');
				jsonData.http[0].SSLCertificatePath = relativePath;
				document.getElementById('SSLCertificatePath').value = relativePath;

				if (!studio.File('file:///'+parentPath+'cert.pem').exists) {
					studio.alert('Warning: The file "cert.pem" is not found in folder "' + parentPath +'"');
				} else {
					if (!studio.File('file:///'+parentPath+'key.pem').exists) {
						studio.alert('Warning: The file "key.pem" is not found in folder "' + parentPath +'"');
					}
				}
				break;

			case 'databaseJournalFilePath':
			{
				var defaultValue = projectDefault();
				validate('project');
				if (!jsonData.project[0].database) {
					jsonData.project[0].database = new Array();
					jsonData.project[0].database[0] = new Object();
				}
				if (!jsonData.project[0].database[0].journal) {
					jsonData.project[0].database[0].journal = new Array();
					jsonData.project[0].database[0].journal[0] = new Object();
				}
				jsonData.project[0].database[0].journal[0].journalFolder = filePath
				document.getElementById('databaseJournalFilePath').value = jsonData.project[0].database[0].journal[0].journalFolder;
			}
			break;

			case 'logPath':
				validate('http');
				jsonData.http[0].logPath = relativePath;
				document.getElementById('logPath').value = relativePath;
				break;
		}

		setDirty();
	}
}

function projectDefault() {

	var projectRootFolder = studio.editor.getProjectPath();
	var defaultValue = new Object(
	{
		project : {
			listen: '0',
			hostName: 'localhost',
			database : {
				journal : {
					enabled: 'false',
					journalFolder: './'
				},
				autoRecovery : {
					restoreFromLastBackup: 'false'
				}
			}
		},
		http : {
			autoStart : 'true',
			port : '8081',
			useCache : 'false',
			pageCacheSize : "5242880", // 5 Mo (in bytes)
			allowSSL : 'false',
			SSLPort : '443',
			SSLMandatory : 'false',
			allowHttpOnLocal : 'false',
			SSLCertificatePath : '',
			acceptKeepAliveConnections : 'true',
			keepAliveMaxRequests : '100',
			keepAliveTimeOut : '15', // seconds
			logFormat : 'ELF',
			logTokens : 'BYTES-SENT;C-DNS;C-IP;CS(COOKIE);CS(HOST);CS(REFERER);CS(USER-AGENT);USER;METHOD;CS-SIP;STATUS;CS-URI;CS-URI-QUERY;CS-URI-STEM;DATE;TIME;TRANSFERT_TIME;',
			logPath : 'Logs/',
			logMaxSize : '10000', // Ko
			allowCompression : "true",
			compressionMinThreshold : "1024", // 1 Ko (in bytes)
			compressionMaxThreshold : "10485760" // 10 Mo (in bytes)
		},
		services : {
			'webApp' : {
				enabled : 'true',
				autoStart : 'true',
				directoryIndex : 'index.html'
			},
			'rpc' : {
				enabled : 'true',
				autoStart : 'true',
				proxyPattern : '^/rpc-proxy/',
				publishInClientGlobalNamespace : 'false'
			},
			'dataStore' : {
				enabled : 'true',
				autoStart : 'true'
			},
			'upload' : {
				enabled : 'true',
				autoStart : 'true',
				maxSize : '-1',
				sizeUnity : 'kb',
				maxFiles : '-1',
				allowedExtensions : 'gif;jpeg;jpg;png;bmp;svg'
			},
			'Git HTTP Service' : {
				enabled : 'true',
				autoStart : 'true'
			},
			'remoteFileExplorer' : {
				enabled : 'true',
				autoStart : 'true'
			},
			'Builder handler' : {
				enabled : 'true',
				autoStart : 'true',
				hardCacheCache : 'true',
				modulePath : 'services/builder-service',
				'max-age' : '0'
			},			
			'Print service' : {
				enabled : 'false',
				autoStart : 'false',
				modulePath : 'services/print'
			}			
		},
		virtualFolder : {
			'widgets-custom' : '/WIDGETS_CUSTOM/',
			'themes-custom' : '/THEMES_CUSTOM/'
		}
	});

	return defaultValue;
}

function displayPublishingInformation() {

	var txt_html = '';

	txt_html += '<section id="publishingInformation">';
	txt_html +=     '<h3>Publishing Information</h3>';
	txt_html +=     '<div class="group">';

	/* Auto-Start */
	txt_html +=         '<div title="Allows you to automatically start the HTTP server for the current project when project is opened.">';
	txt_html +=             '<label for="autoStart">Auto-Start</label>';
	txt_html +=             '<input id="autoStart" type="checkbox" />';
	txt_html +=         '</div>';

	/* Listening IP Address */
	txt_html +=         '<div title="The IP addresses for the project.\rThe server can listen to several IP for one project">';
	txt_html +=             '<label for="listen">Listening IP Address:</label>';
	txt_html +=             '<select id="listen" class="inline" name="listening-ip-address">';
	txt_html +=                 '<option value="0">Any</option>';

	var localIpAddress = studio.getLocalIpAddresses();
	if (localIpAddress) {
		var arrayIp = localIpAddress.split(';');
		for (x in arrayIp) {
			txt_html += '<option value = "' + arrayIp[x]
			+ '" selected = "true">' + arrayIp[x] + '</option>';
		}
	}
	txt_html +=             '</select>';
	txt_html +=         '</div>';

	/* TCP Port */
	txt_html +=         '<div title="The TCP/IP port to be used when the HTTP server is started.\rThis value will be incremented by one for each project added to the solution.">';
	txt_html +=             '<label for="port">TCP Port:</label>';
	txt_html +=             '<input id="port" type="text" class="numeric" min="1" max="65535" mandatory="true" placeholder="1-65535" size="8"/>';
	txt_html +=             '<div class="plus stepper inline"/><div class="min stepper inline"/>';
	txt_html +=         '</div>';

	/* HostName */
	txt_html +=         '<div title="Hostnames may be simple names consisting of a single word.\rThis hostName is assigned to a device connected to a computer network.">';
	txt_html +=             '<label for="hostName">Host Name:</label>';
	txt_html +=             '<input id="hostName" type="text" class="alpha" size="40"/>';
	txt_html +=         '</div>';

	/* UsePageCache */
	txt_html +=         '<div title="Use Wakanda\u2019s cache">';
	txt_html +=             '<input id="useCache" type="checkbox" />';
	txt_html +=             '<label for="useCache">Use page cache</label>';
	txt_html +=         '</div>';

	/* Size */
	txt_html +=         '<div class="level2" title="Page cache size.">';
	txt_html +=             '<label for="pageCacheSize">Size:</label>';
	txt_html +=             '<input id="pageCacheSize" type="text" class="numeric" min="1024" step="1024" mandatory="true" size="8"/> KB';
	txt_html +=             '<div class="plus stepper inline"/><div class="min stepper inline"/>';
	txt_html +=         '</div>';

	txt_html +=     '</div>';
	txt_html += '</section>';

	return txt_html;

}

function displayDatabaseJournaling(){
	var txt_html = '';

	txt_html += '<section id="databaseJournaling">';
	txt_html +=     '<h3>Database Journal</h3>';
	txt_html +=     '<div class="group">';
	txt_html +=         '<div title="Activates the database journal to enable data recovery in case of crash.">';
	txt_html +=             '<input id="databaseJournalEnabled" type="checkbox" />';
	txt_html +=             '<label for="databaseJournalEnabled">Enable database journal</label>';
	txt_html +=         '</div>';
	txt_html +=         '<div class="element" title="Folder where the journal will be stored.">';
	txt_html +=            	'<label for="inDataFolder">Location:</label>';
	txt_html +=             '<div class="level2">';
	txt_html +=	            	'<input type="radio" name="where" id="inDataFolder">';
	txt_html +=             	'<label for="inDataFolder">In data folder</label>'
	txt_html +=             '</div>';
	txt_html +=             '<div class="level2">';
	txt_html +=	            	'<input type="radio" name="where" id="custom">';
	txt_html +=             	'<input id="databaseJournalFilePath" type="text" size="68" />';
	txt_html +=             	'<input type="button" name="buttonBrowse" target="databaseJournalFilePath" value="Browse\u2026">'
	txt_html +=             '</div>';
	txt_html +=         '</div>';
	txt_html +=         '<div class="element">';
	txt_html +=         	'<label> When Wakanda Server starts your project, allow Wakanda Server to automatically:</label>';
	txt_html +=         '</div>';
	txt_html +=         '<p/>';
	txt_html +=         '<div class="level6">';
	txt_html +=             '<input type="checkbox" id="restoreFromLastBackup">';
	txt_html +=             '<label for="restoreFromLastBackup">Restore damaged datastore with last backup</label>';
	txt_html +=         '</div>';

	txt_html +=     '</div>';
	txt_html +='</section>';
	return txt_html;
}

function displayTextCompression() {

	var txt_html = '';

	txt_html += '<section id="textCompression">';
	txt_html +=     '<h3>Text Compression</h3>';
	txt_html +=     '<div class="group">';

	/* Enable text compression */
	txt_html +=         '<div>';
	txt_html +=             '<input id="allowCompression" type="checkbox" />';
	txt_html +=             '<label for="allowCompression">Enable text compression</label>';
	txt_html +=         '</div>';

	/* Compress files over */
	txt_html +=         '<div>';
	txt_html +=             '<label for="compressionMinThreshold">Compress files over:</label>';
	txt_html +=             '<input id="compressionMinThreshold" type="text" class="numeric" min="1" step="1" mandatory="true" size="8"/> KB';
	txt_html +=             '<div class="plus stepper inline"/><div class="min stepper inline"/>';
	txt_html +=         '</div>';

	/* Compress files under */
	txt_html +=         '<div>';
	txt_html +=             '<label for="compressionMaxThreshold">Compress files under:</label>';
	txt_html +=             '<input id="compressionMaxThreshold" type="text" class="numeric" min="1" step="1" mandatory="true" size="8"/> MB';
	txt_html +=             '<div class="plus stepper inline"/><div class="min stepper inline"/>';
	txt_html +=         '</div>';

	txt_html +=     '</div>';
	txt_html += '</section>';

	return txt_html;
}

function displaySecureConnections() {

	var txt_html = '';

	txt_html += '<section id="secureConnections">';
	txt_html +=     '<h3>Secure Connections<br />(HTTPS)</h3>';
	txt_html +=     '<div class="group">';

	/* Enable secure connections */	
	txt_html +=         '<div title="">';
	
	// #6299
	txt_html +=         	'<div>';
	txt_html +=            		'<input id="httpOnly" type="radio" name="secure_mode"/>';
	txt_html +=             	'<label for="httpOnly" class="inline">Accept only HTTP connections</label>';
	txt_html +=         	'</div>';
	txt_html +=         	'<div>';
	txt_html +=             	'<input id="httpBoth" type="radio" name="secure_mode"/>';
	txt_html +=             	'<label for="httpBoth">Accept both HTTP & HTTPS connections</label>';
	txt_html +=         	'</div>';
	txt_html +=         	'<div>';
	txt_html +=             	'<input id="httpMixed" type="radio" name="secure_mode"/>';
	txt_html +=             	'<label for="httpMixed">Accept only HTTPS from remote & allow HTTP & HTTPS from localhost</label>';
	txt_html +=         	'</div>';
	txt_html +=         	'<div>';
	txt_html +=             	'<input id="httpsOnly" type="radio" name="secure_mode"/>';
	txt_html +=             	'<label for="httpsOnly">Accept only HTTPS connections</label>';
	txt_html +=         	'</div>';
	
	txt_html +=         '</div>';

	/* Port Number */
	txt_html +=         '<div title="Sets the TCP/IP port used by the HTTP server for secured HTTP connections over SSL (HTTPS protocol)">';
	txt_html +=             '<label for="SSLPort">Port Number:</label>';
	txt_html +=             '<input id="SSLPort" type="text" class="numeric" min="1" max="65535" mandatory="true" placeholder="1-65535" size="8"/>';
	txt_html +=             '<div class="plus stepper inline"/><div class="min stepper inline"/>';
	txt_html +=         '</div>';

	/* Certificate Path */
	if (jsonData.http[0].SSLCertificatePath != undefined) // #3677
	{
		txt_html +=         '<div title="Path to the SSL certificate">';
		txt_html +=             '<label for="SSLCertificatePath">Certificate Path:</label>';
		txt_html +=             '<input type="button" name="buttonBrowse" target="SSLCertificatePath" value="Browse\u2026">';
		txt_html +=             '<input id="SSLCertificatePath" type="text" size="85" placeholder="The certificate is at the root of the project"/>'
		txt_html +=         '</div>';
		txt_html +=         '<div id="warningSSL" title="" class="label warning">';
		txt_html +=             "! Warning: You must move your certificates to your solution's or project's 'certificates' folder.<br><br>";
		txt_html +=         '</div>';
	}

	txt_html +=     '</div>';
	txt_html += '</section>';

	return txt_html;
}

function displayKeepAliveConnections() {

	var txt_html = '';

	txt_html += '<section id="keepAliveConnections">';
	txt_html +=     '<h3>Keep-Alive Connections</h3>';
	txt_html +=     '<div class="group">';

	/* Use keep-alive connections */
	txt_html +=         '<div title="Allows you to enable/disable the keep-alive connections">';
	txt_html +=             '<input id="acceptKeepAliveConnections" type="checkbox" />';
	txt_html +=             '<label for="acceptKeepAliveConnections">Use keep-alive connections</label>';
	txt_html +=         '</div>';

	/* Number of requests per connection */
	txt_html +=         '<div title="Maximum number of requests by connection.">';
	txt_html +=             '<label for="keepAliveMaxRequests">Number of requests per connection:</label>';
	txt_html +=             '<input id="keepAliveMaxRequests" type="text" class="numeric" min="10" step="10" mandatory="true" size="8"/>';
	txt_html +=             '<div class="plus stepper inline"/><div class="min stepper inline"/>';
	txt_html +=         '</div>';

	/* Timeout */
	txt_html +=         '<div title="Maximum timeout (in seconds)">';
	txt_html +=             '<label for="keepAliveTimeOut">Timeout:</label>';
	txt_html +=             '<input id="keepAliveTimeOut" type="text" class="numeric" min="3" step="5" mandatory="true" size="8"/> seconds';
	txt_html +=             '<div class="plus stepper inline"/><div class="min stepper inline"/>';
	txt_html +=         '</div>';

	txt_html +=     '</div>';
	txt_html += '</section>';

	return txt_html;
}

function displayWebLog() {

	var txt_html = '';

	txt_html += '<section id="webLog">';
	txt_html +=     '<h3>Web Log</h3>';
	txt_html +=     '<div class="group">';

	/* Log Format */
	txt_html +=         '<div title="Allows you to set the log format.">';
	txt_html +=             '<label for="logFormat">Log Format:</label>';
	txt_html +=             '<select class="inline" id="logFormat" name="cars">';
	txt_html +=                 '<option value="">No Log File</option>';
	txt_html +=                 '<option disabled="disabled">-</option>';
	txt_html +=                 '<option value="CLF">Common Log Format</option>';
	txt_html +=                 '<option value="DLF">Combined Log Format</option>';
	txt_html +=                 '<option value="ELF">Extended Log Format</option>';
	txt_html +=             '</select>';
	txt_html +=         '</div>';

	/* ELF -Tokens */
	txt_html +=         '<div id="withLog">';
	txt_html +=             '<div class="level2 cached" id="ELF">';
	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="BYTES-SENT" />';
	txt_html +=                     '<label class="item" for="BYTES-SENT">BYTES-SENT</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="C-DNS" />';
	txt_html +=                     '<label for="C-DNS">C-DNS</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="C-IP" />';
	txt_html +=                     '<label class="item" for="C-IP">C-IP</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="CS(COOKIE)" />';
	txt_html +=                     '<label class="item" for="CS(COOKIE)">CS(COOKIE)</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="CS(HOST)" />';
	txt_html +=                     '<label class="item" for="CS(HOST)">CS(HOST)</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="CS(REFERER)" />';
	txt_html +=                     '<label for="CS(REFERER)">CS(REFERER)</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="CS(USER-AGENT)" />';
	txt_html +=                     '<label for="CS(USER-AGENT)">CS(USER-AGENT)</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="USER" />';
	txt_html +=                     '<label for="USER">USER</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="METHOD" />';
	txt_html +=                     '<label for="METHOD">METHOD</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="CS-SIP" />';
	txt_html +=                     '<label for="CS-SIP">CS-SIP</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="STATUS" />';
	txt_html +=                     '<label for="STATUS">STATUS</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="CS-URI" />';
	txt_html +=                     '<label for="CS-URI">CS-URI</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="CS-URI-QUERY" />';
	txt_html +=                     '<label for="CS-URI-QUERY">CS-URI-QUERY</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="CS-URI-STEM" />';
	txt_html +=                     '<label for="CS-URI-STEM">CS-URI-STEM</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="DATE" />';
	txt_html +=                     '<label for="DATE">DATE</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="TIME" />';
	txt_html +=                     '<label for="TIME">TIME</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="checkbox" name="ELF-TOKEN" id="TRANSFERT_TIME" />';
	txt_html +=                     '<label for="TRANSFERT_TIME">TRANSFERT_TIME</label>';
	txt_html +=                 '</div>';

	txt_html +=                 '<div class="level6">';
	txt_html +=                     '<input type="button" name="uncheckAll" value="Uncheck all">';
	txt_html +=                     '<input type="button" name="checkAll" value="Check all">';
	txt_html +=                 '</div>';

	txt_html +=             '</div>';
	txt_html +=         '</div>';

	/* Log Path */
	txt_html +=         '<div class="level2" title="Path to the log file">';
	txt_html +=             '<label for="logPath">Log Path:</label>';
	if((typeof (studio) != "undefined")){
		txt_html +=             '<input type="button" name="buttonBrowse" target="logPath" value="Browse\u2026">';
		txt_html +=             '<input id="logPath" type="text" size="85"/>';
	}
	txt_html +=         '</div>';

	/* Maximum Log Size */
	txt_html +=         '<div class="level2" title="Maximum log file size.">';
	txt_html +=             '<label for="logMaxSize">Maximum Log Size:</label>';
	txt_html +=             '<input type="text" class="numeric" id="logMaxSize" min="1024" step="1024" mandatory="true" size="10"/> KB';
	txt_html +=             '<div class="plus stepper inline"/><div class="min stepper inline"/>';
	txt_html +=         '</div>';

	txt_html +=     '</div>';
	txt_html += '</section>';

	return txt_html;
}

function displayServices() {

	wakServices = new Array();
	wakServices[0] = "webApp";
	wakServices[1] = "rpc";
	wakServices[2] = "dataStore";
	wakServices[3] = "upload";
	wakServices[4] = "Git HTTP Service";
	wakServices[5] = "remoteFileExplorer";
	wakServices[6] = "Builder handler";
	wakServices[7] = "Print service";

	var wakServicesDescriptions = new Array();
	wakServicesDescriptions[0] = "static page Web server";
	wakServicesDescriptions[1] = "RPC service";
	wakServicesDescriptions[2] = "REST service";
	wakServicesDescriptions[3] = "file upload service";
	wakServicesDescriptions[4] = "Git service";
	wakServicesDescriptions[5] = "remote file explorer";
	wakServicesDescriptions[6] = "WD2 - Wakanda Dynamic Delivery (Builder handler)";
	wakServicesDescriptions[7] = "Print service";

	var wakServicesTips = new Array();
	wakServicesTips[0] = "This service allows you to serve static Web pages.";
	wakServicesTips[1] = "By enabling this service, you can use RPC to access your RPC modules.";
	wakServicesTips[2] = "This service allows you to access Wakanda's REST server.";
	wakServicesTips[3] = "This service allows you to take advantage of the file uploading capabilities.";
	wakServicesTips[4] = "By enabling this service, you can host your GIT repositories over HTTP.";
	wakServicesTips[5] = "This service allows you to browse files on the server";
	wakServicesTips[6] = "";
	wakServicesTips[7] = "";

	var txt_html = '';
	var i = 0;
	var id = 0;

	txt_html += '<section id="services">';
	txt_html +=    '<h3>Services</h3>';
	txt_html +=    '<div class="group">';

	// Wakanda services: id = 1 - 1000
	for ( i = 0; i < wakServices.length; i++) {

		id = i+1

		if (id > 1)
			txt_html += spacer();

		//common
		txt_html += '<div class="groupTitle" title="'+ wakServicesTips[i] +'">';
		txt_html += '<input type="checkbox" class="service" id="enabled_'+ id +'"/>';
		txt_html += '<label class="item" for="enabled_'+ id +'"> Enable <span class="bold">'+ wakServicesDescriptions[i] +'</span></label>';
		
		txt_html += '<div class="level6">';
		txt_html +=    '<label for="autoStart_'+ id +'">Auto-Start</label>';
		txt_html +=    '<input id="autoStart_'+ id +'" type="checkbox" class="service"/>';
		txt_html += '</div>';

		//specific
		switch (id) {
			case 2:  // rpc
				txt_html += '<div class="level6">';
				txt_html +=    '<label for="proxyPattern_2">Proxy pattern:</label>';
				txt_html +=    '<input type="text" class="service" id="proxyPattern_2" size="20"/>';
				txt_html += '</div>';
				txt_html += '<div class="item right level6">';
				txt_html +=    '<label for="publishInClientGlobalNamespace_2">Publish in Client global Namespace</label>';
				txt_html +=    '<input type="checkbox" class="service" id="publishInClientGlobalNamespace_2"/>';
				txt_html += '</div>';
				break;
			case 4:  // upload
				var
				sizeUnities = [
				{
					key : 'byte',
					value : 'Byte'
				},
				{
					key : 'kb',
					value : 'KB',
					selected : true
				},
				{
					key : 'mb',
					value : 'MB'
				}
				]
				txt_html += '<div class="level6">';
				txt_html +=     '<label for="maxSize_4">Maximum Size:</label>';
				txt_html +=     '<input id="maxSize_4" type="text" class="numeric service uilt0" min="0" step="1" mandatory="true" size="8"/>';
				txt_html +=     '<select id="sizeUnity_4" class="inline service" name="file-upload-unity">';

				for(var _i = 0 , item ; item = sizeUnities[_i] ; _i++){
					txt_html +=     '<option value = "' + item.key + '"' + (item.selected ? '" selected = "true"' : '') + '>' + item.value + '</option>';
				}

				txt_html +=     '</select>';
				txt_html +=     '<div class="plus stepper inline"/><div class="min stepper inline"/>';
				txt_html += '</div>';

				txt_html += '<div class="level6">';
				txt_html +=     '<label for="maxFiles_4">Maximum Files:</label>';
				txt_html +=     '<input id="maxFiles_4" type="text" class="numeric service uilt0" min="0" step="1" mandatory="true" size="8"/>';
				txt_html +=     '<div class="plus stepper inline"/><div class="min stepper inline"/>';
				txt_html += '</div>';

				txt_html += '<div class="level6">';
				txt_html +=     '<label for="allowedExtensions_4">Allowed Extensions:</label>';
				txt_html +=     '<input id="allowedExtensions_4" type="text" class="service" mandatory="true" size="28"/>';
				txt_html += '</div>';
				break;
			case 7:
				
				txt_html += '<div class="level6">';
				txt_html +=     '<label for="hardCache_7">Optimize for production:</label>';
				txt_html +=    '<input type="checkbox" class="service" mandatory="true" id="hardCache_7"/>';
				txt_html += '</div>';
				
				txt_html += '<div class="level6">';
				txt_html +=     '<label for="max-age_7">Client-side timeout:</label>';
				txt_html +=     '<input id="max-age_7" type="text" class="numeric service uilt0" min="0" step="1"  mandatory="true" size="4"/> <span>seconds</span>';
				txt_html +=     '<div class="plus stepper inline"/><div class="min stepper inline"/>';
				txt_html += '</div>';
				
				break;
		}

		txt_html += '</div>';
	}

	// Unknown services: id > 1000
	if (jsonData.service) {

		var j = 1000;

		for ( i = 0; i < jsonData.service.length; i++) {

			var service = jsonData.service[i];
			var name = (service.name) ? service.name
			: service.modulePath.substr(service.modulePath.lastIndexOf("/")+1);

			if (wakServices.indexOf(name) == -1) {

				j++;
				txt_html += spacer();
				txt_html += '<div class="groupTitle">';
				txt_html +=     '<input type="checkbox" class="service" id="enabled_'+ j +'"/>';
				txt_html +=     '<label class="item" for="enabled_'+ j +'"> Enable <span class="bold">"'+ name +'"</span></label>';
				txt_html += '</div>';

				//Known attribute if any
				if (service.autoStart) {

					txt_html += '<div class="level6">';
					txt_html +=    '<label for="autoStart_'+ j +'">Auto-Start</label>';
					txt_html +=    '<input id="autoStart_'+ j +'" type="checkbox" class="service"/>';
					txt_html += '</div>';	

				}
			}
		}
	}

	txt_html +=    '</div>';
	txt_html += '</section>';

	return txt_html;
}
