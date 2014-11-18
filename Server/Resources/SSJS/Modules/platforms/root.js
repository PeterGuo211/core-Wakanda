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
/**
* header location rooting depending on the platform.
* @module platform/root
* @return {object} describe the OS, the browser and the platform type : "desktop", "smartphone" or "tablet"
*/
function root( request, response ) {

    var indexPath       = "",
		host 			= request.headers.HOST,
        userAgent		= request.headers.USER_AGENT,
    	conf 			= {},
    	directoryName,
    	disp            = require("platforms"),        
    	platformInfo    = require("platforms/info"),
        platform        = platformInfo.getInfo(userAgent);
    	
    conf.smartphone 	= "smartphone";
    conf.tablet 		= "tablet";
    conf.desktop 		= "webfolder";
	
	var servicesSettings = application.settings.getItem( 'services');
	if ((servicesSettings.webApp != null) && (typeof servicesSettings.webApp != 'undefined'))
		indexPath = servicesSettings.webApp.directoryIndex; // sc 12/06/2012 WAK0077064, application.webAppService was removed
    
    //look for a suitable directory role depending on the platform
	switch ( platform.OS ) {
	
	case "iOs"  :
	    
	    if ( platform.device == "iPad" ) {
	        directoryName = lookForTabletPage( conf );
	    } else {
	        directoryName = lookForSmartphonePage( conf );
	    }
	     
	break;
	case "android" :
		
		if( platform.device == "tablet" ) {   //Android tablet divices
		
		    directoryName = lookForTabletPage( conf ); 
		    
		} else if ( platform.device == "smartphone" ){
			
    		directoryName = lookForSmartphonePage( conf ); 
    	        
		} else {
		
		    directoryName = conf.desktop;
		
		}
	
	break;

	default: 
	    directoryName = conf.desktop;
	}
	
	//send header location
	if ( directoryName != conf.desktop ) { 
	
	    response.headers.location = "http://" + host + "/" + directoryName + "/" + indexPath;
	    
	} else {
		
		response.headers.location = "http://" + host + "/" + indexPath;
		
	}
}

exports.root = root;

getModulePath = exports.getModulePath = function () {
    return module.id.replace("/root", "");
};

/**
 * For Tablets, look fisrt for tablet files, then for smartphone or desktop.
 * @param {Object} conf
 **/
function lookForTabletPage( conf ) {
	
	var directoryName;
	
	if( getItemsWithRole(conf.tablet) ) {
	        
		directoryName = conf.tablet;
	    
	} else if (getItemsWithRole(conf.smartphone)){
	    	
	   	directoryName = conf.smartphone;
	    	
	} else {
	    	
	   	directoryName = conf.desktop;
	    
	}
	    
	return directoryName;
	
}

/**
 * For smartphone, look first for smartphone files. Send desktop header if no suitable page is found.
 * @param {Object} conf
 **/
function lookForSmartphonePage( conf ) {
	
	var directoryName;
	
	if( getItemsWithRole(conf.smartphone) ) {
	        
		directoryName = conf.smartphone;
	    
	} else {
	    	
	  	directoryName = conf.desktop;
	    
	}
	    
	return directoryName;
	
}

