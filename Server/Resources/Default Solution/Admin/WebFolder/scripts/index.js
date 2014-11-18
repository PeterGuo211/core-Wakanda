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

function onCollectionChange(type) {
    $$('restoreButton').hide();
    $$(type + 'DownLogIcon').hide();
    if (this.length) {
        $$(type + 'Combobox').show();
        if (this.date !== "Never") {
            $$(type + 'DownLogIcon').show();
            if (type === 'backup') {
                $$('restoreButton').show();
            }
        }
    }
}

WAF.onAfterInit = function onAfterInit() { // @lock

    // @region namespaceDeclaration// @startlock
    var logoutCont = {}; // @container
    var saveSettings = {}; // @buttonImage
    var saveSolSettings = {}; // @button
    var closeSolSettings = {}; // @button
    var resetCacheButton = {}; // @button    
    var loginTo4DStore = {}; // @button
    var settingsSol = {}; // @container
    var licenseBtn = {}; // @container
    var debuggerCont = {}; // @container
    var browseCont = {}; // @container
    var startStopSol = {}; // @container
    var general_info_btn = {}; // @buttonImage
    var restoreButton = {}; // @icon
    var applicationSettings = {}; // @buttonImage
    var backupDownLogIcon = {}; // @icon
    var compactDownLogIcon = {}; // @icon
    var repairDownLogIcon = {}; // @icon
    var verifyDownLogIcon = {}; // @icon
    var solutionsEvent = {}; // @dataSource
    var recentSolutionsEvent = {}; // @dataSource
    var dataButton = {}; // @buttonImage
    var backupButton = {}; // @buttonImage
    var compactButton = {}; // @buttonImage
    var verifyButton = {}; // @buttonImage
    var repairButton = {}; // @buttonImage
    var compactLogsEvent = {}; // @dataSource
    var verifyLogsEvent = {}; // @dataSource
    var repairLogsEvent = {}; // @dataSource
    var backupLogsEvent = {}; // @dataSource
    var showLogsconsole = {}; // @container
    var projectsEvent = {}; // @dataSource
    var documentEvent = {}; // @document
    var goBackeBtn = {}; // @btn
    // @endregion// @endlock

    // eventHandlers// @lock

    startStopSol.click = function startStopSol_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        if (sources.solutions.isRunning) {
            adminObject.stopSolution();
        } else {
            adminObject.startSolution();
        }
    }; // @lock

    verifyButton.click = function repaireButton_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        adminObject.verifyApplication(sources.solutions.path, sources.projects.name);
    }; // @lock

    compactButton.click = function compactButton_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        adminObject.compactApplication(sources.solutions.path, sources.projects.name);
    }; // @lock

    repairButton.click = function imageButton8_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        adminObject.repairApplication(sources.solutions.path, sources.projects.name);
    }; // @lock

    backupButton.click = function imageButton9_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        adminObject.backupApplication(sources.solutions.path, sources.projects.name);
    }; // @lock

    restoreButton.click = function restoreButton_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        var selectedBuckup = $$('backupCombobox');
        var date = new Date(parseInt(selectedBuckup.source.date));
        adminObject.restoreApplication(sources.solutions.path, sources.projects.name, date.toString());
    }; // @lock

    debuggerCont.click = function debuggerCont_click(event) // @startlock
    { // @endlock
        adminObject.openDebugger(sources.projects);
    }; // @lock

    logoutCont.click = function LogoutCont_click(event) // @startlock
    { // @endlock
        waf.directory.logout();
        location.href = '/login/';
    }; // @lock

    browseCont.click = function BrowseCont_click(event) // @startlock
    { // @endlock
        $('.modalDialog').show();
    }; // @lock

    dataButton.click = function dataButton_click(event) // @startlock
    { // @endlock
        var protocol = sources.projects.http.sslEnabled ? 'https://' : 'http://';
        var port = protocol === "https://" ? sources.projects.http.sslPort : sources.projects.http.port ;

        var url = protocol + window.location.hostname + ":" + port + "/walib/dataBrowser/index.html";
        window.open(url, '_blank');
    }; // @lock

    loginTo4DStore.click = function loginTo4DStore_click(event) // @startlock
    { // @endlock
        window.open("https://store.4d.com/fr/login.shtml");
    }; // @lock
    // 
    // open solution settings
    settingsSol.click = function settingsSol_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        adminObject.openSolutionSettings();
        $(".matrix-container .waf-state-selected").addClass('selected-tmp').removeClass('waf-state-selected');
    }; // @lock
    
    licenseBtn.click = function licenseBtn_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
         $('#container14').hide();
        $('#licenseFrame').show();
        $(".matrix-container .waf-state-selected").addClass('selected-tmp').removeClass('waf-state-selected');
    }; // @lock

     goBackeBtn.click = function goBackeBtn_click(event) // @startlock
    { // @endlock
        $('#container14').show();
        $('#licenseFrame').hide();
        $(".matrix-container .selected-tmp").removeClass('selected-tmp').addClass('waf-state-selected');
    }; // @lock
    // open project settings event
    applicationSettings.click = function applicationSettings_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        adminObject.openProjectSettings(sources.solutions.path, sources.projects.name);
    }; // @lock   

    saveSolSettings.click = function saveSolSettings_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        adminObject.saveSolutionSettings(sources.solutions.path);
        $(".matrix-container .selected-tmp").addClass('waf-state-selected').removeClass('selected-tmp');
    }; // @lock

    // save project settings event    
    saveSettings.click = function saveSettings_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        adminObject.saveProjectSettings(sources.solutions.path, sources.projects.name);

    }; // @lock

    backupDownLogIcon.click = function backupDownLogIcon_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        adminObject.getLogs($$('backupCombobox').getValue());
    }; // @lock

    compactDownLogIcon.click = function compactDownLogIcon_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        adminObject.getLogs($$('compactCombobox').getValue());
    }; // @lock

    repairDownLogIcon.click = function repairDownLogIcon_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        adminObject.getLogs($$('repairCombobox').getValue());
    }; // @lock

    resetCacheButton.click = function resetCacheButton_click(event) // @startlock
    { // @endlock
        $$('resetCacheButton').disable();
        adminObject.showMessage('info', "Please wait while the server resetting the cache.");
        webAdmin.resetCacheAsync({
            "onSuccess": function(response) {
                if (response.status == "200") {                    
                    adminObject.showMessage('success', "WD2 cache was reset successfully.");
                } else {
                    adminObject.showMessage('error', "Error: resetting WD2 cache failed.");
                }
                $$('resetCacheButton').enable();
                window.setTimeout(adminObject.hideMessage,3000);
            },
            "onerror": function(response) {
                adminObject.showMessage('error', "Error: resetting WD2 cache failed.");
                window.setTimeout(adminObject.hideMessage,3000);
                $$('resetCacheButton').enable();
            }
        }, sources.projects.name);
    }; // @lock

    verifyDownLogIcon.click = function verifyDownLogIcon_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        adminObject.getLogs(sources.verifyLogs.getCurrentElement().hash);
    }; // @lock



    showLogsconsole.click = function showLogsconsole_click(event) // @startlock
    { // @endlock
        var
        console;
        if (this.isDisabled()) {
            return;
        }
        console = $$('consoleContainer').$domNode;
        console.trigger('_toggle');
    }; // @lock

    closeSolSettings.click = function closeSolSettings_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        $('#solutionsSettingsContainer').hide();
        $("#frame3 iframe").attr("src", "");
        $("#frame1 iframe").attr("src", "/webComponents/settingsEditor/index.html"); // @TODO ugly Hack
        if ($('#settingsContainer').css('display') === 'block') {
            $('#settingsContainer').hide();
            $('#general_info_container').show();
        }
        $('#container14').show();

        $(".matrix-container .selected-tmp").addClass('waf-state-selected').removeClass('selected-tmp');
    }; // @lock

    general_info_btn.click = function general_info_btn_click(event) // @startlock
    { // @endlock
        if (this.isDisabled()) {
            return;
        }
        $('#settingsContainer').hide();
        $$('verifyButton').enable();
        $$('repairButton').enable();
        $$('backupButton').enable();
        $$('compactButton').enable();
        $$('saveSettings').disable();
        $('#general_info_container').show();
    }; // @lock



    solutionsEvent.onisRunningAttributeChange = function solutionsEvent_onisRunningAttributeChange(event) // @startlock
    { // @endlock
        var label;

        if (this.isRunning) {
            label = 'Stop Solution';
            this.running = '(Running)';
            $('#container1 #adminStartStopSolution').css('backgroundPosition', '0 -32px');
        } else {
            label = 'Start Solution';
            this.running = '(Running)';
            $('#container1 #adminStartStopSolution').css('backgroundPosition', '0 0px');
        }
        if(this.isProtected && this.isRunning) {
            $('#logoutCont').show();
        } else {
            $('#logoutCont').hide();
        }
        $$('startStopSolution').setValue(label);

    }; // @lock

    compactLogsEvent.onCollectionChange = function compactLogsEvent_onCollectionChange(event) // @startlock
    { // @endlock
        onCollectionChange.call(this, 'compact');
    }; // @lock

    verifyLogsEvent.onCollectionChange = function verifyLogsEvent_onCollectionChange(event) // @startlock
    { // @endlock
        onCollectionChange.call(this, 'verify');
    }; // @lock

    repairLogsEvent.onCollectionChange = function repairLogsEvent_onCollectionChange(event) // @startlock
    { // @endlock
        onCollectionChange.call(this, 'repair');
    }; // @lock

    backupLogsEvent.onCollectionChange = function backupLogsEvent_onCollectionChange(event) // @startlock
    { // @endlock
        onCollectionChange.call(this, 'backup');
    }; // @lock



    solutionsEvent.onCurrentElementChange = function solutionsEvent_onCurrentElementChange(event) // @startlock
    { // @endlock

        if (this.name === null) {
            adminObject.disableInterface();
            return;
        }
        if (this.isRunning) {
            $$('dataButton').enable();
            $$('debuggerCont').enable();
            $$('resetCacheButton').enable();
            $('#debuggerCont').removeClass("waf-state-state4");
        } else {
            $$('dataButton').disable();
            $$('debuggerCont').disable();
            $$('resetCacheButton').disable();
        }

        solDetails = {
            fixedSize: this.settings.database.fixedSize + " MB",
            flushDataCacheInterval: this.settings.database.flushDataCacheInterval + " s",
            authenticationType: this.settings.solution.directory.authenticationType
        };

        sources.solDetails.sync();
        adminObject.displaySolutionProjects();

        // Bring solution settings
        if ($("#solutionsSettingsContainer").is(":visible")) {
            studio.editor.getSettingJsonData(sources.solutions.path);
        }

        if ($("#settingsContainer").is(":visible")) {
            studio.editor.getSettingJsonData(sources.solutions.path, sources.projects.name);
        }
        var projectContainer = $$('matrix1').getChildren()[0];
        if (typeof projectContainer !== "undefined") {
            projectContainer.addClass('waf-state-selected');
        }


    }; // @lock

    projectsEvent.onCurrentElementChange = function projectsEvent_onCurrentElementChange(event) // @startlock
    { // @endlock
        var projectsNames;

        for (var attr in this.logFiles) {
            window[attr + 'Logs'] = this.logFiles[attr].length ? this.logFiles[attr] : [{
                "date": "Never",
                "hash": "never",
                "name": "never",
                "path": ""
            }];            
            sources[attr + 'Logs'].sync();
            sources[attr + 'Logs'].orderBy('date desc');
        }
        if ($("#settingsContainer").is(":visible") && sources.projects.name) {
            studio.editor.getSettingJsonData(sources.solutions.path, sources.projects.name);
        }

        // if the project name is long then remove some characters at the end until it fit in matrix 
        projectsNames = $(".waf-clone-richText15");
        $.each(projectsNames, function (key, value) {
            if ($(value).width() > 204) {
                while ($(value).width() > 204) {
                    var projectName = $(value).text();
                    $(value).text(projectName.substr(0, projectName.length - 2));
                }
                $(value).text($(value).text() + "...");
            }
        });
        adminObject.cropProjectTitle();

    }; // @lock

    recentSolutionsEvent.onCurrentElementChange = function recentSolutionsEvent_onCurrentElementChange(event) {

        webAdmin.getSolutionInfoAsync({
            "onsuccess": function (response) {
                var
                i;

                solutions = [];

                if (response.isRunning) {
                    runPosition = i;
                    response.running = '(Running)';
                }


                solutions.push(response[0]);

                if (i === 0) {
                    $('#matrix1').hide();
                } else {
                    $('#matrix1').show();
                }

                //admin.getSolution(response[0].hash);


                sources.solutions.sync();

                adminObject.console.getServerLog();
                adminObject.console.getMaintenanceLog();


                solDetails = {
                    fixedSize: sources.solutions.settings.database.fixedSize + " MB",
                    flushDataCacheInterval: sources.solutions.settings.database.flushDataCacheInterval + " s",
                    authenticationType: sources.solutions.settings.solution.directory.authenticationType
                };

                sources.solDetails.sync();
                adminObject.displaySolutionProjects();

                // Bring solution settings
                if ($("#solutionsSettingsContainer").is(":visible")) {
                    studio.editor.getSettingJsonData(sources.solutions.path);
                }

                if ($("#settingsContainer").is(":visible")) {
                    studio.editor.getSettingJsonData(sources.solutions.path, sources.projects.name);
                }
                var projectContainer = $$('matrix1').getChildren()[0];
                if (typeof projectContainer !== "undefined") {
                    projectContainer.addClass('waf-state-selected');
                }


                if (typeof localStorage.callback !== "undefined") {
                    if (localStorage.callback === "compact") {
                        adminObject.compactApplication(localStorage.solutionPath, localStorage.projectName);
                        delete localStorage.callback;
                        delete localStorage.solutionPath;
                        delete localStorage.applicationName;
                    } else if (localStorage.callback === "repair") {
                        adminObject.repairApplication(localStorage.solutionPath, localStorage.projectName);
                        delete localStorage.callback;
                        delete localStorage.solutionPath;
                        delete localStorage.applicationName;
                    } else if (localStorage.callback === "restore") {

                        adminObject.restoreApplication(localStorage.solutionPath, localStorage.projectName, localStorage.restoreDate);
                        delete localStorage.callback;
                        delete localStorage.solutionPath;
                        delete localStorage.applicationName;
                        delete localStorage.restoreDate;
                    }
                }
            },
            "onerror": function (error) {
                console.log(error);
            }
        }, sources.recentSolutions.hash);
    };

    var initWebSockets = function () {
        if (!window.WebSocket) return;
        var protocol, 
            port, 
            hostname = window.location.hostname;

        if (window.location.protocol === "https:") {
            protocol = "wss:";
            port = "4433";
        } else {
            protocol = "ws:";
            port = "8080";
        }
        var wsURL = protocol +'//' + hostname + ':'+port+'/remote_admin_ws/';
        var connection = new WebSocket(wsURL);

        connection.onmessage = function (e) {
            try {
                var message = JSON.parse(e.data);
                if (message.hasOwnProperty('jobState')) {
                    if (message['jobState'] === 1) {
                        if (message["isDefaultSolution"] === "true") {
                            window.location.reload();
                        } else {
                            window.location.reload();
                        }
                    }
                }
            } catch (e) {

            }
        };
    };

    documentEvent.onLoad = function documentEvent_onLoad(event) // @startlock
    { // @endlock
        initWebSockets();
        adminObject = new Admin();
        adminObject.initView();
        adminObject.init();
        $('.modalDialog .close, .modalDialog .cancel ').on('click', function () {
            $('.modalDialog').hide();
        });

        $('.modalDialog .start').on('click', function (e) {
            var path = $('.modalDialog input').val();
            adminObject.openSolutionByPath(path);
        });

        $('.alert .close').on('click', function (e) {
            adminObject.hideMessage();
        });


    }; // @lock


    if (!waf.directory.currentUserBelongsTo('admin')) {
        location.href = '/login/';
    }
    // @region eventManager// @startlock    
    WAF.addListener("login_to_4D_store_btn", "click", loginTo4DStore.click, "WAF");
    WAF.addListener("goBackeBtn", "click", goBackeBtn.click, "WAF");
    WAF.addListener("logoutCont", "click", logoutCont.click, "WAF");
    WAF.addListener("saveSettings", "click", saveSettings.click, "WAF");
    WAF.addListener("saveSolSettings", "click", saveSolSettings.click, "WAF");
    WAF.addListener("closeSolSettings", "click", closeSolSettings.click, "WAF");
    WAF.addListener("debuggerCont", "click", debuggerCont.click, "WAF");
    WAF.addListener("browseCont", "click", browseCont.click, "WAF");
    WAF.addListener("settingsSol", "click", settingsSol.click, "WAF");
    WAF.addListener("licenseBtn", "click", licenseBtn.click, "WAF");
    WAF.addListener("startStopSol", "click", startStopSol.click, "WAF");
    WAF.addListener("general_info_btn", "click", general_info_btn.click, "WAF");
    WAF.addListener("restoreButton", "click", restoreButton.click, "WAF");
    WAF.addListener("applicationSettings", "click", applicationSettings.click, "WAF");
    WAF.addListener("backupDownLogIcon", "click", backupDownLogIcon.click, "WAF");
    WAF.addListener("compactDownLogIcon", "click", compactDownLogIcon.click, "WAF");
    WAF.addListener("repairDownLogIcon", "click", repairDownLogIcon.click, "WAF");
    WAF.addListener("verifyDownLogIcon", "click", verifyDownLogIcon.click, "WAF");
    WAF.addListener("dataButton", "click", dataButton.click, "WAF");
    WAF.addListener("backupButton", "click", backupButton.click, "WAF");
    WAF.addListener("compactButton", "click", compactButton.click, "WAF");
    WAF.addListener("verifyButton", "click", verifyButton.click, "WAF");
    WAF.addListener("repairButton", "click", repairButton.click, "WAF");
    WAF.addListener("resetCacheButton", "click", resetCacheButton.click, "WAF");
    WAF.addListener("showLogsconsole", "click", showLogsconsole.click, "WAF");
    WAF.addListener("solutions", "onisRunningAttributeChange", solutionsEvent.onisRunningAttributeChange, "WAF", "isRunning");
    WAF.addListener("compactLogs", "onCollectionChange", compactLogsEvent.onCollectionChange, "WAF");
    WAF.addListener("verifyLogs", "onCollectionChange", verifyLogsEvent.onCollectionChange, "WAF");
    WAF.addListener("repairLogs", "onCollectionChange", repairLogsEvent.onCollectionChange, "WAF");
    WAF.addListener("backupLogs", "onCollectionChange", backupLogsEvent.onCollectionChange, "WAF");
    WAF.addListener("solutions", "onCurrentElementChange", solutionsEvent.onCurrentElementChange, "WAF");
    WAF.addListener("recentSolutions", "onCurrentElementChange", recentSolutionsEvent.onCurrentElementChange, "WAF");
    WAF.addListener("projects", "onCurrentElementChange", projectsEvent.onCurrentElementChange, "WAF");
    WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
    // @endregion
}; // @endlock


function Admin() {
    this.reloadingSetTimeOut = [];

    this.resources = {
        VERIFY_INFO_MSG: 'Verifying started.',
        VERIFY_SUCC_MSG: 'Data was verified successfully.',
        VERIFY_ERR_MSG: 'One or more errors were detected while verifying the data. Please open the log console for more information.',

        REPAIR_INFO_MSG: 'Repair started.',
        REPAIR_SUCC_MSG: 'Data was repaired successfully.',
        REPAIR_ERR_MSG: 'One or more errors were detected while repairing the data. Please open the log console for more information.',


        COMPACT_INFO_MSG: 'Compacting started.',
        COMPACT_SUCC_MSG: 'Data was compacted successfully.',
        COMPACT_ERR_MSG: 'One or more errors were detected while compacting the data. Please open the log console for more information.',

        BACKUP_INFO_MSG: 'Backup started.',
        BACKUP_SUCC_MSG: 'Data was backed up successfully.',
        BACKUP_ERR_MSG: 'One or more errors were detected while data backup. Please open the log console for more information.',

        RESTORE_SUCC_MSG: 'Data was restored successfully.',
        RESTORE_ERR_MSG: 'One or more errors were detected during restoring the data. Please open the log console for more information.',
        RESTORE_INFO_MSG: 'Restore started.',

        STOP_SOLUTION_MSG: 'Please wait while your solution is being stopped. This process may take a few seconds.',
        START_SOLUTION_MSG: 'Please wait while your solution is starting. This process may take a few seconds.',
        START_SOLUTION_INFO_MSG: 'Solution list is empty, please open a solution first.',

        CONFIRM_MSG: 'To perform this action, the solution that is currently running on the server must be stopped. Do you want to proceed?',
        SETTINGS_SUCC_MSG: 'Please restart the server (if it is currently running) for the settings to take effect.',

        TIMEOUT_ID_RESIZE_END: 0

    };
    this.adminProgressBar = $$("adminProgressBar");
}


Admin.prototype = {

    init: function init_admin() {
        adminObject.initLicense();
        adminObject.console.close();
        webAdmin.getRecentSolutionsAsync({
            "onsuccess": function (response) {
                var
                i,
                    sol,
                    runPosition = 0;

                if (response.length === 0) {
                    adminObject.disableInterface();
                    adminObject.showMessage('info', "Please use the Browse button to open your solution.");
                    return false;
                }

                recentSolutions = [];
                for (i = 0; sol = response[i]; i++) {
                    if (sol.isRunning) {
                        runPosition = i;
                        sol.running = '(Running)';
                    }
                    recentSolutions.push(sol);
                }



                sources.recentSolutions.sync();
                sources.recentSolutions.select(runPosition);
                // workaround: combobox does not display selected element at loading 
                if (!runPosition) {
                    $$('solutionCombobox').setValue(sources.recentSolutions.hash);
                }
            },
            "onerror": function (error) {
                console.log(error);
            }
        });
    },
    displaySolutionProjects: function displaySolutionProjects() {
        var i;
        projects = [];

        for (i = 0; i < sources.solutions.apps.length; i++) {
            projects.push({
                name: sources.solutions.apps[i].name,
                waData: sources.solutions.apps[i].waData,
                waModel: sources.solutions.apps[i].waModel,
                logFiles: sources.solutions.apps[i].files,
                http: sources.solutions.apps[i].http
            });
        }
        if (i === 0) {
            $('#matrix1').hide();
        } else {
            $('#matrix1').show();
        }

        sources.projects.sync();
        sources.projects.orderBy('name asc');
    },

    waitServerAndCallback: function wait_server_and_reload(callback) {
        var i;
        try {
            webAdmin.getCurrentRunningHashAsync({
                "onsuccess": function (response) {
                    var sol = sources.solutions;
                    if (solutions.length === 0 || (response !== null && ((sol.isRunning && sol.hash !== response) || (!sol.isRunning && sol.hash === response)))) {
                        for (i = 0; i < adminObject.reloadingSetTimeOut.length; i++) {
                            clearTimeout(adminObject.reloadingSetTimeOut[i]);
                        }
                        adminObject.reloadingSetTimeOut = [];
                        if (callback === null || typeof callback === "undefined") {
                            window.location.reload();
                        } else {
                            callback();
                        }
                    } else {
                        adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 1000, callback));
                    }
                },
                "onerror": function (error) {
                    console.log("error is: ", error);
                    if (error.code === -32603 && error.message.indexOf('failed permission') !== -1) {
                        window.location.reload();
                    } else {
                        adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 1000, callback));
                    }
                }
            });

        } catch (e) {
            console.log("catch: ", e);
            adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 1000, callback));
        }
    }
};

Admin.prototype.initLicense = (function() {
    var $licenseBtn = $('#licenseBtn');
    var $bigLicensIcon = $('#license_icon').find('img');
    
    
    var main = function () {
        webAdmin.getProductNameAsync({
            "onSuccess": function(response) {    
                productName = response + " Administration" ;
                document.title = productName;
                sources.productName.sync();
            },
            "onerror": function(response) {
                console.log("Can't get product name");
            }
        });



        sources.productName.addListener('onAttributeChange', function () {
            if (productName.indexOf('Enterprise') != -1) {
                $licenseBtn.css('display', 'block');
            } else {
                $("#richText1").css('font-size','26px');
            }
        });
    };

    return main;
})();