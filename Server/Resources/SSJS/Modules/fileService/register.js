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
 * The edit module of the fileService accessible through 
 * <code>require('fileService/register');</code>
 *
 * @module fileService/register
 */
 
/**
 * The register Class of the fileService
 *
 * @private
 * @class FileServiceRegister
 */
function FileServiceRegister() {}

var tools = require("fileService/utility");


/**
 * registerLogin
 * 
 * @private
 * @method registerLogin
 * @param {String} userName
 * @param {String} userPassword
 * @result {String} Cookie header field value
 */
function registerLogin(userName, userPassword) {
    var bespinDB = tools.connectBespinDB();
    var result = null;
    var transactionStart = false;
    if (bespinDB) {
        try {
            var theUser = bespinDB.user.find('login == ' + userName);
            
            if (theUser && theUser.password == userPassword) {
                var theSession = bespinDB.session.find('userId == '+theUser.id);
                
                if (theSession) {
                    result = 'auth-tkt=' + theSession.id + ';Path=/';
                } else {
                    bespinDB.startTransaction();
                    transactionStart = true;
                    var newSession = new bespinDB.session(
                        {
                            userId: theUser.id
                        }
                    );
                    newSession.save();
                    bespinDB.commit();

                    result = 'auth-tkt=' + newSession.id + ';Path=/';
                }
            }    
        }
        catch (err) {
            if(transactionStart)
                bespinDB.rollBack();
        }
    }

    return result;
}


/**
 * registerNew
 * 
 * @private
 * @method registerNew
 * @param {String} userLogin
 * @param {String} userPassword
 * @param {String} userEmail
 * @param {String} error
 * @result {String} Cookie header field value
 */
function registerNew(userLogin, userPassword, userEmail, error)
{
    var result = null;
    var bespinDB = tools.connectBespinDB();
    
    if (bespinDB) 
    {
        try 
        {
            bespinDB.startTransaction();
            
            var nbUser = bespinDB.user.query('login == ' + userLogin).length;
            
            if (nbUser > 0)
                error = 409;
            else 
            {
                var newUser = bespinDB.user.newEntity();
                var newSession = bespinDB.session.newEntity();
                
                newUser.login = userLogin;
                newUser.password = userPassword;
                newUser.email = userEmail;
                
                newSession.userId = newUser.id;
                
                result = 'auth-tkt='+newSession.id+';Path=/';
                
                newUser.save();
                newSession.save();
                bespinDB.commit();
            }
        }
        catch (err) 
        {
            bespinDB.rollBack();
            error =  401;
        }
    }

    return result;
}


/**
 * registerLogout
 * 
 * @private
 * @method registerLogout
 * @param {String} sessionId
 */
function registerLogout(sessionId)
{
    var bespinDB = connectBespinDB();

    if (bespinDB) {
        try {
            bespinDB.startTransaction();

            var theSession = bespinDB.session.find('id == '+sessionId);
            if (theSession)
            {
                theSession.drop();
            }
            bespinDB.commit();
        }
        catch (err) {
            bespinDB.rollBack();
        }
    }
}


/**
 * registerUserinfo
 * 
 * @private
 * @method registerUserinfo
 * @param {String} sessionId
 * @return {null}
 */
function registerUserinfo(sessionId)  {
    var bespinDB = connectBespinDB();
    var result = null;
    if (bespinDB) {
        try {
            var theSession = bespinDB.session.find('id == '+sessionId);
            if (theSession) 
            {
                var theUser = bespinDB.user.find('id == '+theSession.userid);
                if (theUser) {
                    result = '{"username": "' + theUser.login + '", ' + '"amountUsed": 0, "quota": 16000000}';
                }
            }
        }
        catch (err) {
            
        }
    }

    return result;
}


/**
 * The register request handler of the fileService. Handling requests starting by "/register/"
 * 
 * @private
 * @method registerHandler
 * @param {HttpRequestArgument} request
 * @param {HttpResponseArgument} response
 * @returns {String} The response body
 */
function registerHandler(request, response) {

    response.contentType = 'text/plain';

    var uri = new tools.URI(request.url);
    var path = uri.path;
    var query = uri.query;
    var method = request.method;
    var result = null;

    if (path) 
    {
        var pattern = null;
        var action = null;
        var parser = /^\/(register)\/([^\/]*)\/(.*)/;
        var tabresult = path.match(parser);

        if (tabresult) {
            pattern = tabresult[1] || null;
            if (pattern && pattern == 'register') 
            {
                action = tabresult[2] || null;
                if (action) {
                    switch (action) {
                        case 'login':
                            var login = tabresult[3] || null;
                            var theBody = request.body;
                            var len = theBody.length;
                            var password = theBody.substring(9, len);
                            if (password == null)
                                password = '';
                            if (login) {
                                result = registerLogin(login, password);
                                if (result != null)
                                    response.headers.setHeaderValue('Set-Cookie', result);
                                else
                                    response.statusCode = 401;
                            }
                            result = '';
                            break;

                        case 'logout':
                            var sessionId = null;
                            var userId = null;
                            tools.getCookieInfo(request, sessionId, userId);
                            registerLogout(sessionId);
                            break;

                        case 'new':
                            var login = tabresult[3] || null;
                            var data = request.body;
                            if (data.length) {
                                result = '1';
                                var email = '';
                                var password = '';
                                parser = /email=(.*)/;
                                var emailresult = data.match(parser);
                                parser = /^password=(.*)&.*/;
                                var passresult = data.match(parser);

                                if (emailresult)
                                    email = emailresult[1];

                                if (passresult)
                                    password = passresult[1];
                                if (login) {
                                    var error = null;
                                    result = registerNew(login, password, email, error);
                                    if (error != null)
                                        response.statusCode = error;
                                    //else if (result)
                                    response.headers.setHeaderValue('Set-Cookie', result);
                                }
                                else
                                    response.statusCode = 401;
                                result = '';
                            }
                            break;
                        case 'userinfo':
                            var theSessionId = null;
                            var theUserId = null;
                            var theResult = tools.getCookieInfo(request);
                            theSessionId = theResult[1];
                            theUserId = theResult[2];
                            var error = theResult[0];
                            if (error != 200)
                                response.statusCode = error;
                            result = registerUserinfo(theSessionId);
                            break;
                    }


                }
            }
        }
    }

    return result;
}
