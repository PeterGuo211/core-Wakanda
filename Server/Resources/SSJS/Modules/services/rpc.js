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
	Module implementation for the service 'rpc'
 */

 
 // 'use strict';
 

/*	Constants for service state	*/
var kSTATE_STARTED	= 1;
var kSTATE_STOPPED	= 2;
var kSTATE_PAUSED	= 3;

var kSERVICE_NAME	= 'rpc';



/*	RPC Service implementation class
*/
function rpcImpl() {
 
 	/*	Private members
	*/
	
	/*	Initialize the instance
	*/	
	this._init = function () {
		this._fContext = {};
		/* The default target application is the current application */
		this._fApplication = application;
	}
	
	/*	Load the context of the service from the 'storage' object
	*/
	this._loadContext = function () {
	
		var done = false;
		var servicesModule = require( 'services').getInstanceFor( this._fApplication);
		if (servicesModule.isServiceRegistered( kSERVICE_NAME)) {
			var servicesData = this._fApplication.storage.getItem( 'services');
			this._fContext = servicesData[kSERVICE_NAME];
			if (!this._fContext.hasOwnProperty( 'state')) {
				/* Initialize the service */
				this._fContext.state = kSTATE_STOPPED;
				/* Save the context */
				servicesData[kSERVICE_NAME] = this._fContext;
				this._fApplication.storage.setItem('services', servicesData);
			}
			done = true;
		}
	   
		return done;
	};

	/*	Save the context of the service into the 'storage' object
	*/
	this._saveContext = function () {

		var done = false;
		var servicesModule = require( 'services').getInstanceFor( this._fApplication);
		if (servicesModule.isServiceRegistered( kSERVICE_NAME)) {
			var servicesData = this._fApplication.storage.getItem( 'services');
			servicesData[kSERVICE_NAME] = this._fContext;
			this._fApplication.storage.setItem( 'services', servicesData);
			done = true;
		}
		
		return done;
	};
	
	/*	Load the service settings
	*/
	this._loadSettings = function () {

		var done = false;
		var servicesModule = require( 'services').getInstanceFor( this._fApplication);
		if (servicesModule.isServiceRegistered( kSERVICE_NAME)) {
			var servicesSettings = this._fApplication.settings.getItem( 'services');
			
			if (servicesSettings[kSERVICE_NAME].hasOwnProperty( 'proxyPattern')) {
				this._fApplication.internal.rpcService.setPatternForProxy( servicesSettings[kSERVICE_NAME].proxyPattern);
			}
			
			if (servicesSettings[kSERVICE_NAME].hasOwnProperty( 'publishInClientGlobalNamespace')) {
				this._fApplication.internal.rpcService.setPublishInGlobalNamespace( servicesSettings[kSERVICE_NAME].publishInClientGlobalNamespace);
			}
			done = true;
		}
		
		return done;
	};
		
 	/*	Public members
	*/	

	this.isStarted = function () {
		
		if (this._loadContext()) {
			return (this._fContext.state == kSTATE_STARTED);
		}
		return false;
	};
		
	/*	Start a stopped service
	*/		
	this.start = function () {
		
		if (this._loadContext()) {
			if (this._fContext.state == kSTATE_STOPPED) {
				this._loadSettings();
				this._fApplication.internal.rpcService.setEnabled(true);
				if (this._fApplication.internal.rpcService.enabled) {
					this._fContext.state = kSTATE_STARTED;
					this._saveContext();
				}
			}
		}
	};
	
	/*	Stop a started or paused service
	*/	
	this.stop = function () {
	
		if (this._loadContext()) {
			if ((this._fContext.state == kSTATE_STARTED) || (this._fContext.state == kSTATE_PAUSED)) {
				this._fApplication.internal.rpcService.setEnabled( false);
				if (!this._fApplication.internal.rpcService.enabled) {
					this._fContext.state = kSTATE_STOPPED;
					this._saveContext();
				}
			}		
		}
	};
	
	/*	Pause a started service
	*/		
	this.pause = function () {
	
		if (this._loadContext()) {
			if (this._fContext.state == kSTATE_STARTED) {
				this._fApplication.internal.rpcService.setEnabled( false);
				if (!this._fApplication.internal.rpcService.enabled) {
					this._fContext.state = kSTATE_PAUSED;
					this._saveContext();
				}
			}		
		}
	};

	/*	Resume a paused service
	*/			
	this.resume = function () {
	
		if (this._loadContext()) {
			if (this._fContext.state == kSTATE_PAUSED) {
				this._fApplication.internal.rpcService.setEnabled( true);
				if (this._fApplication.internal.rpcService.enabled) {
					this._fContext.state = kSTATE_STARTED;
					this._saveContext();
				}
			}	
		}
	};
		
	/*	Target application accessors
	*/	
	this.setApplication = function ( inApplication ) {
		this._fApplication = inApplication;
	}
	
	
	this.getApplication = function () {
		return this._fApplication;
	}	
	
 	/*	Initialize the instance
	*/	
	this._init();
	
	return this;
}


/*	Create service implementation
*/
var impl = new rpcImpl();


/*	Handler for service messages
*/
exports.postMessage = function (message) {
   
	if ((impl != null) && (typeof impl != 'undefined')) {
		
		if (message.name === "applicationWillStart") {
			var serviceSettings = impl.getApplication().settings.getItem('services');
			if (serviceSettings[kSERVICE_NAME].hasOwnProperty( 'autoStart')) {
				if (serviceSettings[kSERVICE_NAME].autoStart === "true") {
					impl.start();
				}
			}
		}
		else if (message.name === "applicationWillStop") {
			impl.stop();
		}
		else if (message.name === "httpServerWillStop") {
			impl.pause();
		}
		else if (message.name === "httpServerDidStart") {
			impl.resume();
		}
	}
};


exports.start = function () {

	if ((impl != null) && (typeof impl != 'undefined')) {
		impl.start();
	}
};


exports.stop = function () {

	if ((impl != null) && (typeof impl != 'undefined')) {
		impl.stop();
	}
};


exports.isStarted = function () {
	
	if ((impl != null) && (typeof impl != 'undefined')) {
		return impl.isStarted();
	}
	return false;
};


/* Set a new target application for the module and return it
*/
exports.getInstanceFor = function ( inApplication) {

	if ((impl != null) && (typeof impl != 'undefined')) {
		impl.setApplication( ((inApplication != null) && (typeof inApplication != 'undefined')) ? inApplication : application);
	}
	return this;
};