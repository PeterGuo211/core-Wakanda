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
* add the request handler in order to handle all incoming request for builder
*   - in the near future : all the request finishing by waf-build.js or waf-build.css
*   - for the moment, only adds tests hanlders (see WAF/builder/builder-handler.js)
@ module builder-service
*
* Temporary to test : go to the Settings file of your project and add (with the correct absolute path) :
* <service name="Builder handler" modulePath="/Users/Rosset/workspace/perforce/depot/Wakanda/main/walib/WAF/builder/builder-service" enabled="true" max-age="0"/>
*/
exports.postMessage = function (message) {

        var wafFilePath = getWalibFolder().path+"WAF/",
            builderInit;
        
        switch(message.name){
            case 'applicationWillStart' :
                //open + parse the WAF package description
                builderInit = require(wafFilePath+"builder/builder-init");
                builderInit.init();
                application.addHttpRequestHandler('(.*?(waf-build?(.js|.css|.custom))(/*))$',wafFilePath+'builder/builder-handler.js', 'builder_handler_waf_build');
                application.addHttpRequestHandler('^/waf-reset-build-cache$',wafFilePath+'builder/builder-handler.js', 'builder_handler_waf_reset_build_cache');
                application.addHttpRequestHandler('^/waf-build-state$',wafFilePath+'builder/builder-handler.js', 'builder_handler_waf_build_state');
                application.addHttpRequestHandler('^/waf-builder-tests',wafFilePath+'builder/builder-handler-tests.js', 'dispatcher');
                break;
            case 'applicationWillStop' :
                application.removeHttpRequestHandler('(.*?(waf-build?(.js|.css|.custom))(/*))$',wafFilePath+'builder/builder-handler.js', 'builder_handler_waf_build');
                application.removeHttpRequestHandler('^/waf-reset-build-cache$',wafFilePath+'builder/builder-handler.js', 'builder_handler_waf_reset_build_cache');
                application.removeHttpRequestHandler('^/waf-build-state$',wafFilePath+'builder/builder-handler.js', 'builder_handler_waf_build_state');
                application.removeHttpRequestHandler('^/waf-builder-tests',wafFilePath+'builder/builder-handler-tests.js', 'dispatcher');
                break;
        }

};