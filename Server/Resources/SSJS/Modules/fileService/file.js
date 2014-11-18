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
 * The file module of the fileService accessible through 
 * <code>require('fileService/file');</code>
 *
 * @module fileService/file
 */
 
/**
 * The file Class of the fileService
 *
 * @private
 * @class FileServiceFile
 */
function FileServiceFile(){}

// utilities functions
var tools = require("fileService/utility");


/**
 * makeFullPath
 * 
 * @private
 * @method makeFullPath
 * @param {String} project
 * @param {String} fileRelativePath
 * @param {String} inUserId
 * @return {Array} The full path is in the first Element, the second element is true if it is a Wakanda project
 */
function makeFullPath(project, fileRelativePath, user) {

    var result, fullPath, isWakandaProject, bespin, theUser, tabresult, projectFolder;
    
    bespin = tools.connectBespin();
    
    if (!bespin) {
        return {fullPath: '', isWakandaProject: false};
    }
    
    //find project
    tabresult = tools.GetBespinProjectFolder(project, theUser.login);
    projectFolder = tabresult[0];
    isWakandaProject = tabresult[1];
    
    if (projectFolder) {
    	fullPath = projectFolder.getURL();
    	
    	if (fileRelativePath) {
    		fullPath += fileRelativePath;
    	}
    }

    return [fullPath, isWakandaProject];
}


/**
 * getRelativePath
 * 
 * @private
 * @method getRelativePath
 * @param {String} fileRelativePath
 * @return {String} 
 */
function getRelativePath(fileRelativePath) {

    var theRelativePath, parser, tabresult;
    
    theRelativePath = '';
    
    if (fileRelativePath.indexOf('/') >= 0) {
        parser = /(.*)\/[^\/]+/;
        tabresult = fileRelativePath.match(parser);
        theRelativePath = tabresult[1] || '';
        theRelativePath += '/';
    }

    return theRelativePath;
}

/**
 * getFile
 * 
 * @private
 * @method getFile
 * @param {String} project
 * @param {String} fileRelativePath
 * @param {String} inMode
 * @param {String} inFormat
 * @param {String} inRoot
 * @param {String} inUserId
 * @return {Array} 
 */
function getFile(project, fileRelativePath, inMode, inFormat, inRoot, inUserId) {

    var content, isWakandaProject, error, theResult, tabresult, fullPath, bespinDB, 
    file, filestream, theFileName, theRelativePath, doRollback, theFile, theCheckout, theProject;
    
    content = null;
    error = 200;
    
    theResult = [];
    
    tabresult = makeFullPath(project, fileRelativePath, inUserId);
    fullPath = tabresult[0];
    isWakandaProject = tabresult[1];
    
    if (fullPath && fullPath.length > 0) {
        bespinDB = tools.connectBespinDB();
        if (bespinDB) {
            var file = File(fullPath);

            if (file.exists) {
                filestream = TextStream(file);
                content = filestream.read(0);
                filestream.close();
            } else {
                /*file.create();
                content = "";*/
                error = 404;
            }

            if (error === 200) {
                theFileName = file.name;
                theRelativePath = getRelativePath(fileRelativePath);
                doRollback = false;
                try {
                    if (isWakandaProject) {
                        theFile = bespinDB.file.find('projectName == "' + project + '" && relativePath == "' + theRelativePath + '" && name == "' + theFileName + '"');
                    } else {
                        theProject = bespinDB.project.find('name == ' + project + '&& owner == ' + inUserId);
                        if (theProject) {
                            theFile = bespinDB.file.find('projectId == ' + theProject.id + '&& relativePath == "' + theRelativePath + '" && name == ' + theFileName);
                        }
                    }
                    if (isWakandaProject || theProject) {
                        bespinDB.startTransaction();
                        doRollback = true;
                        
                        if (!theFile) {
                            theFile = new bespinDB.file(
                                {
                                    name: theFileName,
                                    relativePath: theRelativePath
                                }
                            );
                            if (theProject) {
                                theFile.projectId = theProject.id;
                            } else {
                                theFile.projectName = project;
                            }
                            theFile.save();
                        }
                        
                        theCheckout = bespinDB.checkout.find('fileId == ' + theFile.id + '&& userId == ' + inUserId);
                        if (!theCheckout) {
                            theCheckout = new bespinDB.checkout(
                                {
                                    fileId: theFile.id,
                                    userId: inUserId
                                }
                            );
                        }
                        
                        theCheckout.mode = inMode;
                        theCheckout.save();
                        bespinDB.commit();
                    }
                } catch (err) {
                    if (doRollback) {
                        bespinDB.rollBack();
                    }
                }
            }
        }
    } else {
        error = 404;
    }

    if (error == 200) {
        switch (inFormat) {
        case 'text':
            theResult[1] = content;
            break;
        case 'json-bag':
            theResult[1] = XmlToJSON(content, inFormat, inRoot);
            break;
        case 'json':
            theResult[1] = XmlToJSON(content, inFormat);
            break;
        default:
            theResult[1] = content;
        }
    } else {
        theResult[1] = fullPath;
    }
    
    theResult[0] = error;
    
    return theResult;
}


/**
 * <p>deleteFile</p>
 *
 * <p><em>TODO: return true if the file is successfully deleted</em></p>
 * 
 * @private
 * @method deleteFile
 * @param {String} project
 * @param {String} fileRelativePath
 * @param {String} inUserId
 * @return {Boolean} 
 */
function deleteFile(project, fileRelativePath, inUserId) {

    var result, isWakandaProject, tabresult, fullPath, bespinDB, file, theFileName, theRelativePath, doRollback,
    theProject, theFile, othersCheckouts, userCheckout;
    
    result = false;
    
    tabresult = makeFullPath(project, fileRelativePath, inUserId);
    fullPath = tabresult[0];
    isWakandaProject = tabresult[1];
    
    if (fullPath && fullPath.length > 0) {
        bespinDB = tools.connectBespinDB();
        if (bespinDB) {
            file = File(fullPath);
            theFileName = file.name;
            theRelativePath = getRelativePath(fileRelativePath);
            doRollback = false;
            try {

                if (isWakandaProject) {
                    theFile = bespinDB.file.find('projectName == "' + project + '" && relativePath == "' + theRelativePath + '" && name == "' + theFileName + '"');
                } else {
                    theProject = bespinDB.project.find('name == ' + project + '&& owner == ' + inUserId);
                    if (theProject) {
                        theFile = bespinDB.file.find('projectId == ' + theProject.id + '&& relativePath == "' + theRelativePath + '" && name == ' + theFileName);
                    }
                }

                if (isWakandaProject || theProject !== null) {
                    if (theFile) {
                        // checked out by other users
                        othersCheckouts = bespinDB.checkout.query('fileId == ' + theFile.id + ' && userId !== ' + inUserId);
                        
                        if (othersCheckouts.length == 0) {
                            bespinDB.startTransaction();
                            doRollback = true;

                            // checked out by current user
                            userCheckout = bespinDB.checkout.find('fileId == ' + theFile.id + ' && userId == ' + inUserId);
                            if (userCheckout) {
                                userCheckout.remove();
                            }

                            theFile.remove();
                            
                            // everything ok then try to delete the file
                            if (file.exists) {
                                result = file.remove(); // WARNING: remove() doesn't return true on success 
                            }
                            
                            // file successfully deleted
                            bespinDB.commit();
                        }
                    }
                }
            } catch (err) {
                if (doRollback) {
                    bespinDB.rollBack();
                }
            }
        }
    }

    return result;
}


/**
 * putFile
 * 
 * @private
 * @method putFile
 * @param {String} project
 * @param {String} fileRelativePath
 * @param {String} inFormat
 * @param {String} inRoot
 * @param {String} inUserId
 * @param {String} content 
 */
function putFile(project, fileRelativePath, inFormat, inRoot, inUserId, content) {

    var isWakandaProject, tabresult, fullPath, folder, file, filestream, text;
    
    tabresult = makeFullPath(project, fileRelativePath, inUserId);
    fullPath = tabresult[0];
    isRiaProject = tabresult[1];
    
    if (fullPath && fullPath.length > 0) {
        if (fullPath.charAt(fullPath.length - 1) === '/') {
            folder = Folder(fullPath);
            if (!folder.exists) {
                folder.create();
            }
        } else {
            file = File(fullPath);

            if (!file.exists) {
                file.create();
            }
            
            filestream = TextStream(file, "ReadWrite");

            switch (inFormat) {
            case 'text':
                text = content;
                break;
            case 'json-bag':
                text = XmlToJSON(content, inFormat, inRoot);
                break;
            case 'json':
                text = XmlToJSON(content, inFormat);
                break;
            default:
                text = content;
                // what about binary files ?
            }
            
            filestream.write(text);
            filestream.close();
        }

    }
}

/**
 * Sort by name handler for array of File and Folder objects 
 * 
 * @private
 * @method sortFileOrFolder
 * @param {File|Folder} a
 * @param {File|Folder} b
 * @return {Number} 
 */
function sortFileOrFolder(a, b) {
    return (a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0);
}


/**
 * <p><code>GET /file/list/[path]</code> gives a JSON list of files in the directory given by [path].</p>
 *
 * <p>Path is relative to the projects directory. Directories will have "/" appended to their name.</p>
 *
 * <p>The list is sorted. Each item in the list is an object with a <code>name</code> property.</p>
 *
 * <p>Additionally, the objects have the data described in the <code>/file/stats/</code> call</p>
 * 
 * @private
 * @method listFile
 * @param {String} projectName
 * @param {String} folderRelativePath
 * @param {String} inUserId
 * @result {String} JSON sorted Array of files and folders
 */
function listFile(projectName, folderRelativePath, inUserId) {

    var result, bespinDB, userName, theUser, fileFolderArray, ProjectnameArray, isProjectName, app, i, 
    isWakandaProject, tabresult, projectFullPath, projectFolder;
    
    result = null;
    bespinDB = tools.connectBespinDB();
    
    if (bespinDB) {
        userName = null;
        theUser = bespinDB.user.find('id == ' + inUserId);
        if (theUser) {
            userName = theUser.login;
        }

        fileFolderArray = [];
        ProjectnameArray = [];
        isProjectName = false;
        
        if (projectName == null || projectName.length === 0) {
            isProjectName = true;
            i = solution.applications.length;
            do {
                i -= 1;
                app = solution.applications[i];
                fileFolderArray.push(app.getFolder());
                ProjectnameArray.push(app.name);
            } while(i > 0);
            
        } else {
            tabresult = makeFullPath(projectName, folderRelativePath, inUserId);
            projectFullPath = tabresult[0];
        
            if (projectFullPath.length > 0) {
            
                projectFolder = Folder(projectFullPath);
                if (projectFolder.exists) {
                    
                    result = [];
                    
                    projectFolder.forEachFile(
                        function (file) {
                            //fileFolderArray.push(file);
                            result.push(
                                {
                                    "openedBy": [userName],
                                    "created": theElem.creationDate.toISOString().replace('-', '').replace(':', ''),//"20090618T012749",
                                    "name": theElem.name,
                                    "modified": theElem.modificationDate.toISOString().replace('-', '').replace(':', ''),//"20090618T012749",
                                    "size": theElem.getVolumeSize()
                                }
                            );
                        }
                    );
                    
                    projectFolder.forEachFolder(
                        function (subfolder) {
                            //fileFolderArray.push(subfolder);
                            result.push(
                                {
                                    "name": (isProjectName) ? (ProjectnameArray[i] + '/') : theElem.name
                                }
                            );
                        }
                    );
                    
                    result.sort(sortFileOrFolder);
                    
                    result = JSON.stringify(result);
                    
                }
            }
        }
    }
    return result;
}


/**
 * closeFile
 * 
 * @private
 * @method closeFile
 * @param {String} project
 * @param {String} fileRelativePath
 * @param {String} inUserId
 */
function closeFile(project, fileRelativePath, inUserId) {

    var bespinDB, tabresult, isWakandaProject, fullPath, theFileName, theRelativePath, doRollback, theFile, theCheckout;
    
    tabresult = makeFullPath(project, folderRelativePath, inUserId);
    fullPath = tabresult[0];
    isWakandaProject = tabresult[1];
    
    if (fullPath && fullPath.length > 0) {
        bespinDB = tools.connectBespinDB();
        if (bespinDB) {
            theFileName = File(fullPath).name;
            theRelativePath = getRelativePath(fileRelativePath);
            
            doRollback = false;
            try {

                if (isWakandaProject) {
                    theFile = bespinDB.file.find('projectName == "' + project + '" && relativePath == "' + theRelativePath + '" && name == "' + theFileName + '"');
                } else {
                    theProject = bespinDB.project.find('name == ' + project + '&& owner == ' + inUserId);
                    if (theProject) {
                        theFile = bespinDB.file.find('projectId == ' + theProject.id + '&& relativePath == "' + theRelativePath + '" && name == ' + theFileName);
                    }
                }

                if (isWakandaProject || theProject) {
                    if (theFile) {

                        var theCheckout = bespinDB.checkout.find('fileId == ' + theFile.id + '&& userId == ' + inUserId);
                        if (theCheckout) {
                            bespinDB.startTransaction();
                            doRollback = true;
                            theCheckout.remove();
                            // according to existing code
                            if (isWakandaProject) {
                                theFile.remove();
                            }
                            bespinDB.commit();
                        }
                    }

                }
            } catch (err) {
                if (doRollback) {
                    bespinDB.rollBack();
                }
            }
        }
    }
}


/**
 * <p>List the files checked out by the current user in its own projects</p>
 *
 * <p><em>TODO: Support the file checkout mode</em></p>
 * 
 * @private
 * @method listFileOpen
 * @param {String} inUserId
 * @result {String} JSON Object listing the files checked out by the current user
 */
function listFileOpen(inUserId) {
    var result, bespinDB, projectSel, fileSel, currentProject;
    
    result = {};
    bespinDB = tools.connectBespinDB();
    
    if (bespinDB) {
        try {
            projectSel = bespinDB.project.query('owner == ' + inUserId);
            //if (projectSel.count() > 0) {
                projectSel.forEach(
                    function (theProject) {
                        result[theProject.name] = {};
                        currentProject = result[theProject.name];
                        fileSel = bespinDB.file.query('projectId == ' + theProject.id + ' && file_checkout.userId == ' + inUserId);
                        fileSel.forEach(
                            function (theFile) {
                                currentProject[theFile.relativePath + theFile.name] = {
                                    mode: 'rw' // file_checkout.mode
                                };
                            }
                        );
                    }
                );
            //}
            /* else {
                //may be it is RIA project
                var fileSel = bespinDB.file.query('checkout.userId==' + inUserId + '&& checkout.fileId== file.id');
                fileSel.orderBy(7); //projectName
                fileSel.forEach(
                    function (theFile) {
                        var prjName = theFile.projectName;
                        result[theFile.projectName][theFile.relativePath + theFile.name] = {
                            mode: 'rw' // file_checkout.mode
                        };
                    }
                );
            } */
        } catch (err) {}
    }
    
    return JSON.stringify(result);
}


/**
 * <p>searchFile</p>
 *
 * <p><em>NOT IMPLEMENTED</em></p>
 * 
 * @private
 * @method searchFile
 * @param {String} fullPath
 * @param {String} criteria
 * @result {String}
 */
function searchFile(fullPath, criteria) {
    var result;

    return result;
}



/**
 * <p>fileHandler</p>
 *
 * 
 * @method fileHandler
 * @param {HttpRequestArgument} request
 * @param {HttpResponseArgument} response
 * @result {String}
 */
exports.fileHandler = function fileHandler(request, response) {

    var uri, path, query, method, result, pattern, action, project, fullPath, fileRelativePath,
    folderRelativePath, sessionId, userId, parser, tabresult, theResult, error, mode, format, root,
    taboption, str, option, value, optionvalue, isWakandaProject, q;

    response.contentType = 'text/plain';

    uri = new tools.URI(request.url);
    path = uri.path;
    query = uri.query;
    method = request.method;
    result = null;

    if (path) {
        pattern = null;
        action = null;
        project = null;
        fullPath = null;
        fileRelativePath = null;
        folderRelativePath = null;
        sessionId = null;
        userId = null;

        if (path === '/file/list/' || path === '/file/listopen/') {
            tabresult = [
                path,
                'file',
                (path == '/file/list/') ? 'list' : 'listopen',
                null,
                null
            ];
        } else {
            parser = /^\/(file)\/([^\/]*)\/([^\/]*)\/(.*)/;
            tabresult = path.match(parser);
        } 
        
        if (tabresult) {
            pattern = tabresult[1] || null;
            if (pattern && (pattern === 'file')) {
                action = tabresult[2] || null;
                
                switch (action) {
                case null:
                    // what to do then ?
                    console.warn('unexpected action:', null);
                    break;
                
                case 'at':
                    project = tabresult[3] || null;
                    fileRelativePath = tabresult[4] || null;
                    
                    if (project && fileRelativePath) {
                        theResult = tools.getCookieInfo(request);
                        sessionId = theResult[1];
                        userId = theResult[2];
                        error = theResult[0];

                        if (error != 200) {
                            response.statusCode = error;
                            break;
                        }
                        
                        mode = 'rw';
                        format = 'text';
                        root = '';
                        if (query) {
                            parser = /&/;
                            taboption = query.split(parser);
                            if (taboption) {
                                parser = /=/;
                                taboption.forEach(
                                    function (str) {
                                        
                                        optionvalue = str.split(parser);
                                        if (!optionvalue) {
                                            return;
                                        }
                                        option = optionvalue[0];
                                        value = optionvalue[1];
                                        
                                        switch (option)
                                        case: 'format':
                                            format = value;
                                            break;
                                        case 'mode':
                                            mode = value;
                                            break;
                                        case 'root':
                                            root = value;
                                            break;
                                        default:
                                            // what to do then
                                            console.warn('unexpected option:', option);
                                        }
                                    }
                                );
                            }
                        }
                        switch (method) {
                        case 'GET':
                            
                            // GET /file/at/[path]?mode=[r|rw] to get the contents of a file. 
                            // (raw text, not a JSON string!) if the file does not exist, an empty body will be returned; 
                            // use list to determine if a file actually exists. 
                            // the server will record you as having the file open with the given mode after this call. 
                            // If mode is not specified, rw is used.
                            
                            theResult = getFile(project, fileRelativePath, mode, format, root, userId);
                            result = theResult[1];
                            error = theResult[0];
                            if (error != 200) {
                                response.statusCode = error;
                            }
                            break;
                            
                        case 'DELETE':
                            
                            // DELETE /file/at/[path] to delete a file. 
                            // file must not be open by anyone except the user doing the deletion.
                            
                            deleteFile(project, fileRelativePath, userId);
                            break;
                            
                        case 'PUT': 
                            
                            // PUT /file/at/[path]?lastEdit=[n] to save a file, with the file contents as the PUT body. 
                            // subdirectories will be created as needed. 
                            // If the lastEdit parameter is excluded, the request will only succeed if the file is *not* open for editing. 
                            // Otherwise, the lastEdit parameter must include the number of the last edit received by the client at the time the save was requested.
                            
                            // intentionally omitted break
                            // same action as POST
                            
                        case 'POST':
                            var content = request.body;
                            putFile(project, fileRelativePath, format, root, userId, content);
                            result = content;
                            break;

                        default:
                            // what to do then ?
                            console.warn('unexpected method:', method);
                        }
                    }
                    break;

                case 'list':
                
                    // GET /file/list/[path] gives a JSON list of files in the directory given by [path]. 
                    // Path is relative to the projects directory. 
                    // Directories will have "/" appended to their name. 
                    // The list is sorted. 
                    // Each item in the list is an object with a "name" property. 
                    // Additionally, the objects have the data described in the /file/stats/ call.
                    
                    project = tabresult[3] || null;
                    folderRelativePath = tabresult[4] || null;
                    theResult = tools.getCookieInfo(request);
                    error = theResult[0];
                    sessionId = theResult[1];
                    userId = theResult[2];
                    if (error !== 200) {
                        response.statusCode = error;
                    } else {
                        result = listFile(project, folderRelativePath, userId);
                        if (result == null)
                            response.statusCode = 404;
                        }
                    }
                    break;

                case 'stats':
                    
                    // GET /file/stats/[path] returns a JSON object with the stats for the file. 
                    // Attributes on the object include:
                    // - size (integer of the file's size at last save), 
                    // - created (date/time of creation in YYYYMMDDTHHMMSS ISO format), 
                    // - modified (date/time of last save, in the same format as created), 
                    // - openedBy (list of usernames that currently have the file open).
                    
                    // not implemented
                    break;
                    
                case 'close':
                    
                    // POST /file/close/[path] to mark the file closed. 
                    // The server will discard your edit history.

                    project = tabresult[3] || null;
                    fileRelativePath = tabresult[4] || null;
                    theResult = tools.getCookieInfo(request);
                    sessionId = theResult[1];
                    userId = theResult[2];
                    error = theResult[0];
                    if (error !== 200) {
                        response.statusCode = error;
                    } else if (project && fileRelativePath) {
                        closeFile(project, fileRelativePath, userId);
                    }
                    break;
                    
                case 'listopen':
                    
                    // GET /file/listopen/ to list open files for the current user. 
                    // a JSON dictionary of { project: { name: filename, mode: r|rw } } will be returned. 
                    // For example, 
                    // if subdir1/subdir2/test.py is open read/write, 
                    // openfiles will return { "subdir1": { name: "somedir2/test.py", mode: "rw" } }

                    theResult = tools.getCookieInfo(request);
                    sessionId = theResult[1];
                    userId = theResult[2];
                    error = theResult[0];
                    if (error !== 200) {
                        //result = sessionId + ' :' + userId;
                        response.statusCode = error;
                    } else {
                        result = listFileOpen(userId);
                    }
                    break;
                    
                case 'search':
                
                    // GET /file/search/[project]?q=[search] runs a search on the filenames in the project. 
                    // Returns a JSON list of filenames, already sorted in a useful order.
                    
                    project = tabresult[3] || null;
                    if (project) {
                        tools.getCookieInfo(request, sessionId, userId);
                        tabresult = makeFullPath(project, null, userId, isRiaProject);
                        fullPath = tabresult[0];
                        q = '';
                        if (query) {
                            //parser = /^\/file\/(([^\/])*)\//;
                            //tabresult = path.match(parser);
                        }
                        result = searchFile(fullPath, q);
                    }
                    break;
                    
                default:
                    // what to do then ?
                    console.warn('unexpected action:', action);
                }
            }
        }
    }
    return result;
}
