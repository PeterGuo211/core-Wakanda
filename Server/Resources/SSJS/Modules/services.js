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
/* The default target application is the current  application
*/
var _fApplication = application;


/* Returns true if the service is registered
*/
function isServiceRegistered( inServiceName) {
	
	if ((inServiceName == null) || (typeof inServiceName == 'undefined')) {
		return false;
	}
	
	var name = inServiceName.toString();
	if (name.length == 0) {
		return false;
	}
	
	var servicesData = _fApplication.storage.getItem( 'services');
	
	if ((servicesData == null) || (typeof servicesData == 'undefined')) {
		return false;
	}
		
	return servicesData.hasOwnProperty( name);
}

exports.isServiceRegistered = isServiceRegistered;



/* Returns true if the has been successfully registered
*/
exports.registerService = function ( inServiceName, inModulePath) {
	
	if ((inServiceName == null) || (typeof inServiceName == 'undefined')) {
		return false;
	}
	
	var name = inServiceName.toString();
	if (name.length == 0) {
		return false;
	}
	
	if ((inModulePath == null) || (typeof inModulePath == 'undefined')) {
		return false;
	}
	
	var path = inModulePath.toString();
	if (path.length == 0) {
		return false;
	}
		
	var done = false;
	
	_fApplication.storage.lock();
	
	try {
		var servicesData = _fApplication.storage.getItem( 'services');
		if ((servicesData == null) || (typeof servicesData == 'undefined')) {
			servicesData = {};
		}
		
		if (!servicesData.hasOwnProperty( name)) {
		
			// Register the service
			servicesData[name] = { "name":name, "modulePath":path};
			_fApplication.storage.setItem( 'services', servicesData);
			done = true;
		}
	}
	
	catch (e) {
	}
		
	_fApplication.storage.unlock();
	
	return done;
};



/* To post a message to all services
*/
exports.postServiceMessage = function ( inMessage) {
	
	var servicesData = _fApplication.storage.getItem( 'services');
	
	if ((servicesData != null) && (typeof servicesData != 'undefined')) {
	
		for (var serviceName in servicesData) {
		
			var oneServiceData = servicesData[serviceName];
			if (oneServiceData.hasOwnProperty( 'modulePath') && (oneServiceData.modulePath != null)) {
				
				var serviceModule = require( oneServiceData.modulePath);
				
				if ((serviceModule != null) && (typeof serviceModule != 'undefined') && serviceModule.hasOwnProperty( 'getInstanceFor')) {
					serviceModule = serviceModule.getInstanceFor( _fApplication);
				}
				
				if ((serviceModule != null) && (typeof serviceModule != 'undefined') && serviceModule.hasOwnProperty( 'postMessage')) {
					serviceModule.postMessage( inMessage);
				}
			}
		}
	}
};


getModulePath = exports.getModulePath = function () {
    return module.id;
};


/* Set a new target application for the module and return it
*/
exports.getInstanceFor = function ( inApplication) {

	_fApplication = ((inApplication != null) && (typeof inApplication != 'undefined')) ? inApplication : application;
	return this;
};