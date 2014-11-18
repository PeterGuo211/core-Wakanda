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
 * The utility module of the fileService accessible through 
 * <code>require('fileService/utility');</code>
 *
 * @module fileService/utility
 */
 


/**
 * Constructor for the URI object.  Parse a string into its components.
 * 
 * @class URI
 *
 * @constructor
 * @param {String} str
 */
function URI(str) {
    if (!str)
        str = "";
    // Based on the regex in RFC2396 Appendix B.
    var parser = /^(?:([^:\/?\#]+):)?(?:\/\/([^\/?\#]*))?([^?\#]*)(?:\?([^\#]*))?(?:\#(.*))?/;
    var result = str.match(parser);
    
    /**
     * @property scheme
     * @type String|null
     */
    this.scheme = result[1] || null;

    /**
     * @property authority
     * @type String|null
     */
    this.authority = result[2] || null;
    
    /**
     * @property path
     * @type String|null
     */
    this.path = result[3] || null;
    
    /**
     * @property query
     * @type String|null
     */
    this.query = result[4] || null;
    
    /**
     * @property fragment
     * @type String|null
     */
    this.fragment = result[5] || null;
}
exports.URI = URI;


/**
 * The utility Class of the fileService
 *
 * @private
 * @class FileServiceUtility
 */
function FileServiceUtility() {}


/**
 * copyFolder
 *
 * @method copyFolder
 * @param {Folder} source
 * @param {Folder} dest
 */
function copyFolder(source, dest) {

    if (source.exists) {
        if (!dest.exists)
            dest.create();

        source.forEachFile(
            function (file) {
                var fileDest = File(dest, file.name);
                file.copyTo(fileDest);
            }
        );

        source.forEachFolder(
            function (subfolder) {
                var newdest = Folder(dest.path + subfolder.name);
                copyFolder(subfolder, newdest);
            }
        );

    }

}
exports.copyFolder = copyFolder;


/**
 * GetBespinProjectFolder
 *
 * @method GetBespinProjectFolder
 * @param {String} projectName
 * @param {String} userName
 * @result {Array} First item: project Folder, second item true if it is a Wakanda project
 */
function GetBespinProjectFolder(projectName, userName) {
    var project = null;
    var isWakandaProject = false;
    var result = [];
    
    //find or create project
    project = solution.getApplicationByName(projectName) || null;
    isWakandaProject = (project !== null);
    
    /*if (projectFolder == null && userName != null && userName.length > 0) {
    projectFolder = Folder(solution.getFolderUrl(false) + 'bespin.4dbase/allProjects/' + userName + '/' + projectName);
    isRiaProject = false;
    }*/
    
    result = [
        isWakandaProject ? project.getFolder() || null,
        isWakandaProject
    ];
    
    return result;
}
exports.GetBespinProjectFolder = GetBespinProjectFolder;



/**
 * getCookieInfo
 *
 * @method getCookieInfo
 * @param {String} request
 * @result {Array} [error, sessionId, userId]
 */
function getCookieInfo(request) {

    var error = 200;
    var sessionId = null;
    var userId = null;
    var theSessionId = null;

    var result = [];
    var theCookie = request.headers.getHeaderValue('Cookie');

    var tabCookieValue = theCookie.split(';');
    var sessionCookie = null;
    var index = 0;
    for (var i = 0; i < tabCookieValue.length; i++) {
        var value = tabCookieValue[i];
        index = value.indexOf('auth-tkt=');
        if (index == 0 || (index == 1 && value.charAt(0) == ' ')) {
            sessionCookie = tabCookieValue[i];
            break;
        }
    }
    if (sessionCookie != null) {
        var len = sessionCookie.length;
        theSessionId = sessionCookie.substring(9 + index, len);
    }
    if (theSessionId && theSessionId.length > 0) {
        var bespinDB = connectBespinDB();
        if (bespinDB) {
            try {
                var sessionSel = bespinDB.session.query('id == ' + theSessionId);
                var nbSession = sessionSel.count();
                if (nbSession > 0) {
                    var theSession = sessionSel.first();
                    userId = theSession.userId;
                    sessionId = theSession.id;
                }
                else
                    error = 401;
            }
            catch (err) {
                sessionId = null;
                userId = null;
                error = 500;
            }
        }
        else
            error = 500;
    }
    else
        error = 401;

    result = [
        error,
        theSessionId/*sessionId*/,
        userId
    ];

    return result;
}
exports.getCookieInfo = getCookieInfo;


//bespin data base
var solutionFileServicesDirectory = solution.getFolder().path + "FileServices/";



/**
 * connectBespinDB
 *
 * @method connectBespinDB
 * @result {Ds|null}
 */
function connectBespinDB() {
    var result = null;

    result = getDataBase("bespin");
    
    if (result == null) {
        result = openDataBase(solutionFileServicesDirectory + 'bespin.waCatalog');
    }

    return result;
}
exports.connectBespinDB = connectBespinDB;



/**
 * closeBespinDB
 *
 * @method closeBespinDB
 * @result {Ds|null}
 */
function closeBespinDB() {
    var result = null;

    result = getDataBase("bespin");
    
    if (result != null) {
        //var path = solutionFileServicesDirectory + 'bespin.4DB'; // What that 4DB ?
        //result = openDataBase(path);
        
        // NOTE: closeDatabase() doesn't exists
        //result = closeDataBase(result);
    }

    return result;
}
exports.closeBespinDB = closeBespinDB;

// ----------------------------------------------------------------------------
