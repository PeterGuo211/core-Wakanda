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



/*
 * @TODO
 * @return {Array} 
 */
Admin.prototype.showMessage = function showMessage( type, message ){

    var msgNode = $('.alert');
    var messageElem = msgNode.find('.message');
    msgNode.attr('class', 'alert');
    if (type === "success") {
        msgNode.addClass('alert-success');

    } else if (type === "info") {
        msgNode.addClass('alert-info');

    } else if (type === "error") {
        msgNode.addClass('alert-error');
    }

    messageElem.text(message);
    msgNode.fadeIn(300);
};



/**
 * @TODO
 */
Admin.prototype.hideMessage =function hideMessage(){
    $('.alert').hide();
};



/**
 * @TODO
 */
Admin.prototype.disableInterface = function disableInterface(){
    var elems = ["repairButton", "backupButton", "compactButton", "verifyButton", "dataButton", 
    "restoreButton", "applicationSettings", "general_info_btn",  "startStopSol", "settingsSol", "debuggerCont", "solutionCombobox", "matrix1"];
		
    for (var i = 0; i < elems.length; i++) {
        $$(elems[i]).disable();
    }
};



/**
 * @TODO
 */
Admin.prototype.enableInterface = function enableInterface() {
    var elems = ["repairButton", "backupButton", "compactButton", "verifyButton", "dataButton", 
    "restoreButton", "applicationSettings", "general_info_btn",  "startStopSol", "settingsSol", "debuggerCont", "solutionCombobox", "matrix1" ];
		
    for (var i = 0; i < elems.length; i++) {
        $$(elems[i]).enable();
    }
};



/**
 * @TODO
 */
Admin.prototype.maintenanceStart = function maintenanceStart() {	
    adminObject.disableInterface();	
    $("#maintenanceProgress").show();
    adminObject.adminProgressBar.startListening();
};



/**
 * @TODO
 */
Admin.prototype.maintenanceEnd = function maintenanceEnd() {
    adminObject.enableInterface();
    $("#maintenanceProgress").hide();
    adminObject.adminProgressBar.stopListening();
};



Admin.prototype.console = {
        timer: null,
        opened: false,
        node: $('#container7'),
        maintenanceLogId: 0,
        getServerLog: function(open, option) {

            try {
                var result = webAdmin.getLogMessages();

                if (open === undefined) {
                    open = true;
                }

                this.log(result.messages, open, option);
            } catch (e) {
                this.log('<b>getServerLog failed :</b> ' + e, open, option);
            }
        },
        getMaintenanceLog: function get_maintenance_log(callback) {
            var isErrorDetected;
            try {
                var result = webAdmin.getMaintenanceLog(this.maintenanceLogId);
                if (open === undefined) {
                    open = true;
                }

                isErrorDetected = this.log(result.messages);
                this.maintenanceLogId = result.maxId;
                if(jQuery.isFunction(callback)) {
                    callback(isErrorDetected);                    
                }
            } catch (e) {
                this.log('<b>getMaintenanceLog failed :</b> ' + e);
            }
        },
        log: function console_log(contents, open, option) {

            var
            i,
            html,
            logDisplay,
            logSolutionName,
            isErrorDetected = false,
            logApplicationName;

            html = '';
            logDisplay = '';

            if ($.isArray(contents) && contents.length > 0) {
                for(i=0; i<contents.length; i++) {
                    if(contents[i].toLowerCase().indexOf('error') !== -1){
                        contents[i] = '<span style="color:red">' + contents[i] +'</span>';
                        isErrorDetected = true;
                    }
                }
                html = contents.join('<br />') + '<br />';
            } else if ($.isPlainObject(contents) && contents.message && (contents.message !== '')) {

                // contents.message.bold() + ' : ' +
                html = contents.description + '<br />';
            } else if (contents.toString() !== '') {

                html = contents.toString() + '<br />';
            }

            if (option !== undefined && option.hasOwnProperty("solutionName") && option.hasOwnProperty("applicationName")) {

                logSolutionName = option.solutionName;
                logApplicationName = option.applicationName;

            } else if (sources !== null && sources.solutions.name !== null && sources.projects.name !== null) {

                logSolutionName = sources.solutions.name;
                logApplicationName = sources.projects.name;
            }


            if (html !== '') {
                if (logSolutionName !== undefined && logApplicationName !== undefined) {

                    html = '<p class="' + logSolutionName.replace(" ", "-") + "-" + logApplicationName.replace(" ", "-") + '-log" style="' + logDisplay + '">' + html + '</p>';
                }
                $('#container7').append(html).scrollTop($('#container7')[0].scrollHeight);
            }
            return isErrorDetected;
        },
        error: function console_log_error(contents, open, option) {

            if ($.isArray(contents) && contents.length > 0) {

                contents.forEach(function(element, index, elementArray) {
                    elementArray[index] = addErrorTag(element);
                });
            } else if ($.isPlainObject(contents) && contents.message && (contents.message !== '')) {

                contents.message = addErrorTag(contents.message);
                contents.description = addErrorTag(contents.description);
            } else if (contents.toString() !== '') {

                contents = addErrorTag(contents.toString());
            }

            function addErrorTag(element) {

                return '<span class="log-error">' + element + '</span>';

            }

            this.log(contents, open, option);
        },
        head: function console_log_head(content, open, option) {

            content = '<span class="log-head">' + content + '</span>';

            this.log(content, open, option);
        },
        close: function close() {
            
            var consoleContainer = $$('consoleContainer').$domNode;
            if (consoleContainer.height() > 32) {
                consoleContainer.animate({
                    height: 32
                }, 500, function() {
                    $('#icon13 img').attr('src', "/images/up_icon.png");
                });
            }
        },
        
        open: function open() {
            var consoleHeight = $('#main_project_container').height() - $$('maintenanceProgress').getPosition().top -100;
            var consoleContainer = $$('consoleContainer').$domNode;
            if (consoleContainer.height() === 32) {
                consoleContainer.animate({
                    height: consoleHeight
                }, 500, function() {
                    $('#icon13 img').attr('src', "/images/down_icon.png");
                });
            }
        },
        
        toggle: function toggle(refresh) {
            var consoleHeight = $('#main_project_container').height() - $$('maintenanceProgress').getPosition().top -100;
            var consoleContainer = $$('consoleContainer').$domNode;
            consoleContainer.animate({
                height: (consoleContainer.height() > 32) ? 32 : consoleHeight
            }, 500, function() {
                $('#icon13 img').attr('src', "/images/" + ((consoleContainer.height() < consoleHeight) ? "up" : "down") + "_icon.png");
            });

        },
        
        showApplicationLog: function show_application_log() {

            this.node.children('.content').children('p').hide();
            if (adminObject !== null && adminObject.currentSolution !== null && adminObject.currentApplicationName !== null) {
                this.node.children('.content').children('p.' + adminObject.currentSolution.name.replace(" ", "-") + "-" + adminObject.currentApplicationName.replace(" ", "-") + '-log').show();
            }
            this.node.children('.content').scrollTop(this.node.children('.content')[0].scrollHeight);
        }
    };


/**
 * @TODO
 */
Admin.prototype.initView = function initView(){
    var console;
    $$('saveSettings').disable();   
    $('#matrix1').hide();    
    $$('restoreButton').hide();
    $("#settingsContainer").hide();
    $("#solutionsSettingsContainer").hide();
    
    console = $$('consoleContainer').$domNode;
    
    console.bind({
        '_toggle': function() {
                
            adminObject.console.toggle();
        }
    });
    
    // centering content
    $$('showLogsconsole').center({
        center: 'h'
    });
    
    $(window).resize(function() {
        $$('showLogsconsole').center({
            center: 'h'
        });
        clearTimeout(adminObject.TIMEOUT_ID_RESIZE_END);
        adminObject.TIMEOUT_ID_RESIZE_END = window.setTimeout(function(){adminObject.cropProjectTitle();}, 100);        
        
    });
};


Admin.prototype.cropProjectTitle = function (){
    var i,
        space, 
        value, 
        projectName;
        
    if (typeof projectName === 'undefined'){
    	return false;
    }    
    space = $("#container14").width() - 880;
    value = $("#richText10");    
    if( value.width() > space ){
        projectName =  value.text();
        i=2;
        while( value.width() > space){              
            value.text(projectName.substr(0,projectName.length-i));
            i += 2;
        }
        $(value).text($(value).text() + "...");
    }else {
        projectName =  sources.projects.name;   
        i=2;
        while( value.width() < space && value.text().length-3 < projectName.length){  
            value.text(projectName.substr(0,value.text().length+i) + '...');
        }
        if(value.text().length-3 === projectName.length ){
            value.text(projectName.substr(0,value.text().length-3));
        }
    }
};
