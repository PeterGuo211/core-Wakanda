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
 * <p>JSON-RPC is a stateless, light-weight remote procedure call (RPC) protocol. 
 * It is transport agnostic in that the concepts can be used within the same process, over sockets, over http, 
 * or in many various message passing environments. It uses JSON (RFC 4627) as data format.</p>
 *
 * <p>It is designed to be simple!</p>
 *
 * <p>JSON-RPC 2.0 Request objects and Response objects may not work with existing JSON-RPC 1.0 clients.</p>
 *
 * <pre name="code" class="js">
 * var rpc = require('rpcService');
 * rpc.start();
 * </pre>
 *
 * <pre name="code" class="js">
 * application.rpcService.start();
 * </pre>
 *
 * <p><a href="http://groups.google.com/group/json-rpc/web/json-rpc-2-0">JSON-RPC 2.0 Reference</a></p>
 *
 * @module rpcService
 * @author erwan.carriou@4d.com
 * @date January 2010
 * @version 0.1
 */

/**
 * serviceDescription
 *
 * @private
 * @property serviceDescription
 * @type Object
 */
var serviceDescription = {};


/**
 * Call a function
 *
 * @private
 * @method call
 * @param {String} functionName name of the function to call
 * @param {Array} args arguments to send to the function
 * @return {Object|Array|String|Number|Boolean|null|undefined}
 */
function call(functionName, args) {

    return application[functionName].apply(application, args);

}


/**
 * Execute a function
 *
 * @private
 * @method execute
 * @param {String} parameters name of the function to call
 * @param {Array} args arguments to send to the function
 * @param {Array} body arguments to send to the function
 * @return {Object|Array|String|Number|Boolean|null|undefined}
 */
function execute (parameters, args, body) {
    
    var temporaryFunction, result;

    parameters = parameters || [];
    args = args || {};
    body = body || "";

    temporaryFunction = new Function(parameters, body);

    if ((args === null) || (typeof args !== 'object') || (args instanceof Array)) {
        return temporaryFunction(args);
    }
    
    return temporaryFunction.apply(application, args);
}


/**
 * Create a message
 *
 * @private
 * @method createMessage
 * @param {Object} params parameters
 * @return {Object}
 */
function createMessage(params) {
    
    params = params || {};

    // {String} type type of the message
    params.messageType = params.messageType || 'json';

    switch (params.messageType) {
    case 'json':
        return new JsonMessage(params);
    case 'xml':
        return new XmlMessage(params);
    default:
        return new JsonMessage(params);
    }
}


/**
 * Get the catalogue
 *
 * @private
 * @method getCatalog
 * @param {Object} params parameters
 * @return {String} signature of the methods in JSON format
 */
function getCatalog(params) {
    
    var 
        signature = '',
        oSignature = {},
        tabParam = [],
        paramName = '',
        functionName = '',
        hasDescription = false;

    signature = rpcService.getCatalog();  // SWIAC Edouard/sc 02/03/2010
    oSignature = JSON.parse(signature);

    // get Params
    tabParam = params instanceof Array ?  (params[0] instanceof Array ? params[0] : params) : [];

    if (tabParam.length > 0) {
        Object.keys(oSignature).forEach(
            function (functionName) {
                if (typeof oSignature[functionName] === 'string') {
                    return;
                }
                hasDescription = tabParam.some(
                    function (paramName) {
                        return (paramName === functionName);
                    }
                );
                if (!hasDescription) {
                    delete oSignature[functionName];
                }
            }
        );
    }

    // cache the description
    serviceDescription = oSignature;

    return JSON.stringify(oSignature);
}

     
/**
 * <p>XmlMessage</p>
 *
 * <p><em>NOT IMPLEMENTED</em></p>
 * 
 * @private
 * @constructor
 * @param {Object} config parameters
 */
function XmlMessage(config) {
    // TO IMPLEMENTS
};


/**
 * <p>When a rpc call is made, the Server reply with a Response, except for in the case of Notifications.</p>
 *
 * <p>The Response is expressed as a single JSON Object defined by this class.</p>
 * 
 * @class JsonMessage
 *
 * @constructor
 * @param {Object} config parameters
 */
function JsonMessage(config) {
    
    var message = {};

    // config
    config = config || {};

    // {String} version version of the json-rpc to use
    config.version = config.version || '2.0';

    // {Integer} id id of the request
    config.id = config.id || -1;

    // {Object} result result to send
    if (typeof config.result === undefined) {
        config.result = '';
    }

    // {Integer} errorCode code of the error
    config.errorCode = config.errorCode || null;
    
    // {String} errorMessage message of the error
    config.errorMessage = config.errorMessage || null;

    // {String} errorInfo additional message about the error
    config.errorInfo = config.errorInfo || null;

    if (config.errorCode !== null) {
        if (config.errorInfo) {
            message = {
            
                /**
                 * <p>A String specifying the version of the JSON-RPC protocol. It's value is "2.0".</p>
                 *
                 * @property jsonrpc
                 * @type String
                 * @default "2.0"
                 */
                'jsonrpc' : config.version,
                
                /**
                 * <p>It is be the same as the value of the id member in the Request Object.</p>
                 *
                 * <p>If there was an error in detecting the id in the Request object (e.g. Parse 
                 * error/Invalid Request), it will be Null.</p>
                 *
                 * @property id
                 * @type String|Number|null
                 */
                'id'      : config.id,
                
                /**
                 * <p>This member always exist on error.</p>
                 *
                 * <p>This member does not exist if there was no error triggered during invocation.</p>
                 *
                 * @property error
                 * @type Object
                 */
                'error'   : {
                
                    /**
                     * <p>A Number that indicates the error type that occurred.</p>
                     *
                     * <p>The error codes from and including -32768 to -32000 are reserved for pre-defined errors. 
                     * Any code within this range, but not defined explicitly below is reserved for future use. 
                     * The error codes are nearly the same as those suggested for XML-RPC
                     * at the following url: 
                     * <a href="http://xmlrpc-epi.sourceforge.net/specs/rfc.fault_codes.php">http://xmlrpc-epi.sourceforge.net/specs/rfc.fault_codes.php</a>
                     *
                     * <table border="1">
                     * <thead><tr><th>code</th><th>message</th><th>meaning</th></tr></thead>
                     * <tbody valign="top">
                     * <tr>
                     *   <td>-32700</td>
                     *   <td>Parse error</td>
                     *   <td>Invalid JSON was received by the server.<br>
                     *   An error occurred on the server while parsing the JSON text.</td>
                     * </tr>
                     * <tr>
                     *   <td>-32600</td>
                     *   <td>Invalid Request</td>
                     *   <td>The JSON sent is not a valid Request object.</td>
                     * </tr>
                     * <tr>
                     *   <td>-32601</td>
                     *   <td>Method not found</td>
                     *   <td>The method does not exist / is not available.</td>
                     * </tr>
                     * <tr>
                     *   <td>-32602</td>
                     *   <td>Invalid params</td>
                     *   <td>Invalid method parameter(s).</td>
                     * </tr>
                     * <tr>
                     *   <td>-32603</td>
                     *   <td>Internal error</td>
                     *   <td>Internal JSON-RPC error.</td>
                     * </tr>
                     * <tr>
                     *   <td>-32099 to -32000</td>
                     *   <td>Server error</td>
                     *   <td>Reserved for implementation-defined server-errors.</td>
                     * </tr>
                     * </tbody>
                     * </table>
                     *
                     * @property error.code
                     * @type Number
                     */
                    'code'    : config.errorCode,
                
                    /**
                     * <p>A String providing a short description of the error.</p>
                     *
                     * <p>The message is limited to a concise single sentence.</p>
                     *
                     * @property error.message
                     * @type String
                     */
                    'message' : config.errorMessage,
                
                    /**
                     * <p>A Primitive or Structured value that contains additional information about the error.</p>
                     *
                     * <p>It may be omitted.</p>
                     *
                     * <p>The value of this member is defined by the Server (e.g. detailed error information, nested 
                     * errors etc.).</p>
                     *
                     * @property error.data
                     * @type Object|Array|String
                     */
                    'data'    : config.errorInfo
                }
            };
        } else {
            message = {
                'jsonrpc' : config.version,
                'id'      : config.id,
                'error'   : {
                    'code'   : config.errorCode,
                    'message': config.errorMessage
                }
            }
        }
    } else {
        message = {
            'jsonrpc': config.version,
                
            /**
             * <p>This member always exists on success.</p>
             * 
             * <p>This member does not exist if there was an error invoking the method.</p>
             *
             * <p>The value of this member is determined by the method invoked on the Server.</p>
             *
             * @property result
             * @type Object|Array|Number|String|Boolean|null|undefined
             */
            'result' : config.result,
            'id'     : config.id
        };
    }

    return message;
}


/**
 * <p>JSON-RPC is a stateless, light-weight remote procedure call (RPC) protocol. 
 * It is transport agnostic in that the concepts can be used within the same process, over sockets, over http, 
 * or in many various message passing environments. It uses JSON (RFC 4627) as data format.</p>
 *
 * <p>It is designed to be simple!</p>
 *
 * <p>JSON-RPC 2.0 Request objects and Response objects may not work with existing JSON-RPC 1.0 clients.</p>
 *
 * <pre name="code" class="js">
 * var rpc = require('rpcService');
 * rpc.start();
 * </pre>
 *
 * <pre name="code" class="js">
 * application.rpcService.start();
 * </pre>
 *
 * <p><a href="http://groups.google.com/group/json-rpc/web/json-rpc-2-0">JSON-RPC 2.0 Reference</a></p>
 *
 * @class RpcService
 */

var doRequest;

/**
 * Get the request
 *
 * @method doRequest
 * @param {HttpRequestArgument} request the request sent to the server
 * @param {HttpResponseArgument} response the response
 */
exports.onrequest = doRequest = function doRequest (request, response) {
    var
        message = '',
        jsonObj = {},
        result = null,
        errorCode = null,
        version = '2.0',
        errorMessage = null,
        errorInfo = null,
        type = null;

    // Get the type of the request
    // @method getType
    // @param contentType the request send to the server
    // @return {String} type of the request

    function getType(contentType) {
        
        var type = 'text/plain';
        
        if (contentType.indexOf("json")) {
            type = 'json';
        } else {
            if (contentType.indexOf("xml")) {
                type = 'xml';
            }
        }
        
        return type;
    }


    // Get the full type of the request
    // @method getFullType
    // @param contentType the request send to the server
    // @return {String} full type of the request
    
    function getFullType(contentType) {
    
        var type = 'text/plain';
    
        if (contentType.indexOf("json")) {
            type = 'application/json-rpc';
        } else {
            if (contentType.indexOf("xml")) {
                type = 'application/xml';
            }
        }
        
        return type;
    }


    // Check the return type
    // @method checkReturnType
    // @param functionName the function name
    // @param returnValue the result of the function name

    function checkReturnType(functionName, returnValue) {
        var description = null;

        getCatalog();
        description = serviceDescription[functionName];
        if (description) {
            if ((typeof returnValue !== description.returns) && (typeof description.returns !== 'undefined')) {
                errorCode = -32602;
                errorMessage = 'invalid return type (' + typeof returnValue + ' instead of ' + description.returns + ')';
                response.statusCode = 500;
            }
        }
    }

    try {
        jsonObj = JSON.parse(request.body);

        if (jsonObj.method.keys) {
            result = execute(jsonObj.method.keys, jsonObj.params, jsonObj.method.source);
            version = jsonObj.jsonrpc;
        } else {
            if (application[jsonObj.method] !== undefined) {
                result = call(jsonObj.method, jsonObj.params);
                version = jsonObj.jsonrpc;
            } else {
                errorCode = -32700;
                errorMessage = 'method ' + jsonObj.method + ' not found';
                response.statusCode = 500;
            }
        }

    } catch (error) {
        errorInfo = error.message;
        if (error instanceof RangeError) {
            errorCode = -32602;
            errorMessage = 'Invalid params';
            response.statusCode = 500;
        } else {
            errorCode = -32603;
            errorMessage = 'Internal error';
            response.statusCode = 500;
        }
    }

    type = getType(request.headers['Content-Type']);

    message = createMessage({
        'messageType'  : type,
        'version'      : version,
        'id'           : jsonObj.id,
        'result'       : result,
        'errorCode'    : errorCode,
        'errorMessage' : errorMessage,
        'errorInfo'    : errorInfo
    });

    response.headers['Content-Type'] = getFullType(request.headers['Content-Type']);

    message = JSON.stringify(message);
    return message;
}

var pattern = "/rpc/";

/**
 * Start the RPC Service
 *
 * @method start
 **/
exports.start = function start() {
    var streamSettings, settings;
    
    parser = new DOMImplementation();
    domDoc = parser.loadXML(settings);
    docRoot = domDoc.getDocumentElement();
    rpcServiceNode = docRoot.getElementsByTagName('rpcService');
    location = null;
    
    if (rpcServiceNode.length > 0) {
        rpcServiceNode = rpcServiceNode[0];
        rpcServiceAttributes = rpcServiceNode.getAttributes();
        location = rpcServiceAttributes.getNamedItem('location');
        if (location === null) {
            location = rpcServiceAttributes.getNamedItem('locationMatch');
        }
        if (location !== null) {
            location = location.getValue();
        }
   }

    if (location === null) {
        location = '/rpc/';
    }
    
    
    addHttpRequestHandler(
        location, 
        module.id  + ".js", 
        "doRequest"
    );
};


/**
 * Stop the RPC Service
 *
 * @method stop
 **/
exports.stop = function stop() {
    var streamSettings, settings;
    
    parser = new DOMImplementation();
    domDoc = parser.loadXML(settings);
    docRoot = domDoc.getDocumentElement();
    rpcServiceNode = docRoot.getElementsByTagName('rpcService');
    location = null;
    
    if (rpcServiceNode.length > 0) {
        rpcServiceNode = rpcServiceNode[0];
        rpcServiceAttributes = rpcServiceNode.getAttributes();
        location = rpcServiceAttributes.getNamedItem('location');
        if (location === null) {
            location = rpcServiceAttributes.getNamedItem('locationMatch');
        }
        if (location !== null) {
            location = location.getValue();
        }
   }

    if (location === null) {
        location = '/rpc/';
    }
    
    removeHttpRequestHandler(
        location, 
        module.id + ".js", 
        "doRequest"
    );
};
