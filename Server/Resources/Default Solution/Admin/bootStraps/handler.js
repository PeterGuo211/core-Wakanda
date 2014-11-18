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

function getRunningSolution(request , response) {
    response.headers["CONTENT_TYPE"] = 'application/json';
    response.body = '{"name" : "'+ solution.name +'"}';
}

function getProductName(request , response) {
    response.headers["CONTENT_TYPE"] = 'application/json';
    response.body = '{"name" : "'+ process.productName +'"}';
}

/*
 * Parse string seaching for substring 'token=value' and return 'value' if exist
 */
function getToken(urlQuery) {
    var 
    i,
    query,
    length,
    token;

    query   = urlQuery.split('&');
    length  = query.length;
    token   = '';

    for (i=0; i<length; i++){
        if (query[i].indexOf("token") !== -1) {
            token = query[i].split('=')[1];
            break;
        }
    }
    return token;
}

/*
 * Check if user had the permission to access administration page
 */
function checkUser(request , response){
    var user;

    // Check if the user was already autentified in studion
    var token = getToken(request.urlQuery);

    if (token.length > 0) {

        user = storage.tokens[token];
        if (user) {
            loginByPassword(user.name, user.pass); 
        }
    }

    if (!currentSession().belongsTo('Admin')) {
        response["headers"].LOCATION = '/login/';
    } else {
        response["headers"].LOCATION = '/index.html';
    }
}



function ReadFile(request, response) {

    var i,
            str,
            file,
            stream,
            filePath,
            parameter,
            parameters,
            logFilePathHash;

    fileOption = {};
    parameters = request.urlQuery.split("&");

    for (i = 0; i < parameters.length; i++) {
        parameter = parameters[i].split("=");
        switch (parameter[0]) {
            case "name" :
            case "url" :
            case "download" :
            case "maxLength" :
                fileOption[parameter[0]] = parameter[1];
                break;
        }
    }

    logFilePathHash = storage.getItem("logFilePathHash");
    filePath = logFilePathHash[fileOption.name];

    if (fileOption.hasOwnProperty("url")) {
        fileOption.url = (fileOption.url === "true" ? true : false);
    }

    if (fileOption.hasOwnProperty("download")) {
        fileOption.download = (fileOption.download === "true" ? true : false);
    }

    try {
        if (File.isFile(filePath)) {
            file = File(filePath);

            if (fileOption.hasOwnProperty("url") && fileOption.url === true) {

                str = file.getURL();
                return str;
            } else if (fileOption.hasOwnProperty("download") && fileOption.download === true) {

                response.headers["CONTENT_TYPE"] = 'application/octet-stream';
                response.headers["content-disposition"] = 'attachement; filename=' + file.name;
                response.body = file.toBuffer().toBlob();

                response = str;
            } else {

                stream = TextStream(file, "read");

                if (fileOption.hasOwnProperty("maxLength") && fileOption.maxLength > 0) {

                    str = stream.read(fileOption.maxLength);
                } else {

                    str = stream.read();
                }
                return str;
            }
        }

    } catch (e) {
        console.log("Error on read file " + fileOption.name, e);
    }
}