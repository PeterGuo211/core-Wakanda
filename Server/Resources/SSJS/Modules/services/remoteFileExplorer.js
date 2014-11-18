/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/*

var state       = {};
var serviceName = "remoteFileExplorer";
var servicesModule              = require("services");
var remoteFileExplorerModule    = require("remoteFileExplorer");

path = servicesModule.id + 'services/remoteFileExplorer.js'

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
                        var path =  remoteFileExplorerModule.getModulePath();
			if (serviceSettings[serviceName].autoStart === "true") {
				application.addHttpRequestHandler('/waRemoteFileExplorer/browse',path+'/remoteFileExplorerHandlers.js', '_browse');
			}
		}
		_saveState();
	}
}
*/