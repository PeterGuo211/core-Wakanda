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
* basic platform analysis.
* @module platform/getInfo
* @return {object} describe the OS, the browser and the platform type : "desktop", "smartphone" or "tablet"
*/
function getInfo( userAgent ) { 

    var conf 			= {},
    	platform        = {};
        	
    	switch ( true ) {

    	case (/iPhone/i).test(userAgent) :

    	    platform.device = "iPhone"; 
    	    platform.OS     = "iOs";
		    platform.type   = "phone";

    	break;
    	case (/iPod/i).test(userAgent) :

    	    platform.device = "iPod";
    	    platform.OS     = "iOs";
		    platform.type   = "phone";

    	break;
    	case (/iPad/i).test(userAgent) : 

    	    platform.device = "iPad";
    	    platform.OS     = "iOs";
		    platform.type   = "tablet";

    	break;
    	case (/Android/i).test(userAgent) :

    		if( (/Xoom|Streak|SCH-I800/i).test(userAgent) ) {   //known Android tablet devices

    		    platform.device = "";
    		    platform.OS     = "android";
    		    platform.type   = "tablet";

    		} else {

    		    if ( (/Mobile/i).test(userAgent) ) {            //Most of Android phones devices have the "Mobile" tag despite of the tablets

        			platform.device = "";
            		platform.OS     = "android";
            		platform.type   = "phone"; 

        		} else {                                        //in this case we presume the device is a desktop pc

        	        platform.device = "";
            		platform.OS     = "android";
            		platform.type   = "desktop";

        	    }
    		}

    	break;

    	default: 		    
		    platform = browserAnalysis(userAgent);
		    
    	}
    	
    	return platform;
    
}

exports.getInfo = getInfo;

/**
* basic browser analysis, look for the browser and the OS
* @return {object} describe the OS, the browser and the platform type, presumed as "desktop"
*/
var browserAnalysis = function ( ua ) {
        
       var uaLower = ua.toLowerCase();
       var OS, browser;
       
       switch ( true ) {
       case (/msie/i).test(uaLower): browser = "Internet Explorer"; break;
       case (/firefox/i).test(uaLower) : browser = "Firefox";  break;
       case (/chrome/i).test(uaLower) : browser = "Chrome";  break;
       case (/safari/i).test(uaLower): browser = "Safari"; break;
       case (/omniWeb/i).test(uaLower): browser = "OmniWeb"; break;
       case (/opera/i).test(uaLower): browser = "Opera"; break;
       case (/konqueror/i).test(uaLower): browser = "Konqueror"; OS = "Linux"; break;
       default: browser = "unknown";
       }
       
       if (!OS) {
           switch ( true ) {
           case (/win/i).test(uaLower): OS = "Windows"; break;
           case (/mac/i).test(uaLower):  OS = "Mac"; break;
           case (/linux/i).test(uaLower):  OS = "Linux"; break;
           default: OS = "unknown";
           }
       }

   	return { "OS" : OS, "browser" : browser, type: "desktop" };
   	    	
}    
   
