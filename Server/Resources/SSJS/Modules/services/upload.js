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

// "use strict";

/*global require,console,application,Folder,File,TextStream,include,exports*/

var serviceName = "upload";
var state = {};
var servicesModule  = require("services");
var uploadModule    = require("upload");

path = servicesModule.id + 'servives/upload.js';

function _loadState() {
    var done = false;
    if (servicesModule.isServiceRegistered(serviceName)) {
        var servicesData = storage.getItem("services");
        state = servicesData[serviceName];
        if (state.hasOwnProperty("started") === false) {
            state.started = false;
            state.paused = false;
        }
        done = true;
    }
    return done;
}

function _saveState() {
    if (servicesModule.isServiceRegistered(serviceName)) {
        var servicesData = storage.getItem("services");
        servicesData[serviceName] = state;
        storage.setItem("services", servicesData);
    }
}

exports.postMessage = function postMessage (message) {
    if (_loadState()) {
        if (message.name === "applicationWillStart") {
        // nop
        }
        else if (message.name === "applicationWillStop") {
        // nop
        }
        else if (message.name === "httpServerWillStop") {
            if (state.started) {
        // stop the service
        }
        }
        else if (message.name === "httpServerDidStart") {
            var serviceSettings = settings.getItem("services");
            var path =  uploadModule.getModulePath();
            if (serviceSettings[serviceName].autoStart === "true") {
                application.addHttpRequestHandler('/waUpload/verify',path+'/uploadHandlers.js', '_verify');
                application.addHttpRequestHandler('/waUpload/upload',path+'/uploadHandlers.js', '_upload');
                application.addHttpRequestHandler('/waUpload/getServerMaximumFileSize',path+'/uploadHandlers.js', '_getServerMaximumFileSize');
                application.addHttpRequestHandler('/waUpload/getServerMaximumFiles',path+'/uploadHandlers.js', '_getServerMaximumFiles');
            }
        }
        _saveState();
    }
};



exports.onAfterUpload = function (){
    return 'hello';
};
