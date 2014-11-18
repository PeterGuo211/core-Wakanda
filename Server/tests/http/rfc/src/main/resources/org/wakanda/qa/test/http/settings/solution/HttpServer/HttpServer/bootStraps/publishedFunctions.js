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

* @author ouissam

*/
/*application.addHttpRequestHandler(
      '/checkCharset',              
      'charsetHandler.js', 
      'checkCharset'       
);*/

application.addHttpRequestHandler(
      '/checkCharsetWhenContentTypeIsSet/',              
      'handlers/charsetHandler.js',  
      'checkCharsetWhenContentTypeIsSet'         
);


application.addHttpRequestHandler(
      '/checkCharset/',              
      'handlers/charsetHandler.js', 
      'checkCharset'       
);

application.addHttpRequestHandler(
      '/checkDefaultCharset',              
      'handlers/charsetHandler.js',  
      'checkDefaultCharset'         
);

application.addHttpRequestHandler(
      '/checkMultipart',              
      'handlers/mediaTypeHandler.js',  
      'checkMultipart'         
);

application.addHttpRequestHandler(
      '/echoBody/',              
      'handlers/methodsHandler.js',  
      'echoBody'         
);

application.addHttpRequestHandler(
      '/checkURI/',              
      'handlers/methodsHandler.js',  
      'checkURI'         
);

application.addHttpRequestHandler(
      '/checkInternalError/',              
      'handlers/statusCodesHandler.js',  
      'checkInternalError'         
);

application.addHttpRequestHandler(
      '/checkChunked/',              
      'handlers/transferCondingHandler.js',  
      'checkChunked'         
);

application.addHttpRequestHandler(
      '/authBasic/',              
      'handlers/authHandler.js',  
      'returnOk'         
);

application.addHttpRequestHandler(
      '/authDigest/',              
      'handlers/authHandler.js',  
      'returnOk'         
);

application.addHttpRequestHandler(
      '/createFileWithAuthBasic/',              
      'handlers/authHandler.js',  
      'createFile'         
);

application.addHttpRequestHandler(
      '/echoQueryString/',              
      'handlers/methodsHandler.js',  
      'echoQueryString'         
);

application.addHttpRequestHandler(
      '/echoURL/',              
      'handlers/methodsHandler.js',  
      'echoURL'         
);