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
 * <code>require('fileService/project');</code>
 *
 * @module fileService/project
 */
 
/**
 * The project Class of the fileService
 *
 * @private
 * @class FileServiceProject
 */
function FileServiceProject(){}
 
var tools = require("fileService/utility");

/**
 * addFilesToDatabase
 * 
 * @private
 * @method addFilesToDatabase
 * @param {Ds} bespinDB
 * @param {Folder} projectFolder
 * @param {String} projectId
 * @param {String} projectName
 * @param {String} relativePath
 */
function addFilesToDatabase(bespinDB, projectFolder, projectId, projectName, relativePath) {

    if (projectFolder.exists) {
        var currentDate = new Date();

        projectFolder.forEachFile(
            function (file) 
            {
                var newFile = new bespinDB.file(
                    {
                        name: file.name,
                        relativePath: relativePath,
                        projectId: projectId,
                    }
                );
                
                if (projectId==null)
                    newFile.projectName = projectName;
                    //newFile.creationDate = currentDate;
                    //newFile.creationTime = currentDate;
                    //newFile.modificationDate = currentDate;
                    //newFile.modificationTime = currentDate;
                
                newFile.save();
            }
        );

        projectFolder.forEachFolder(
            function (folder) 
            {
                var newrelativePath = relativePath;
                
                if (newrelativePat.length > 0)
                    newrelativePath += '/';
                    
                newrelativePath += folder.name + '/';

                addFilesToDatabase(bespinDB, folder, projectId, projectName, newrelativePath);
            }
        );

    }

}


/**
 * projectTemplate
 * 
 * @private
 * @method projectTemplate
 * @param {String} projectName
 * @param {String} templateName
 * @param {String} userId
 * @return {null}
 */
function projectTemplate(projectName, templateName, userId) {
    var result = null;
    
    if (projectName && projectName.length > 0 && solution)
    {
        var bespinDB = tools.connectBespinDB();
        var projectFolder = null;
        var templateFolder = null;
        var solutionFolder = solution.getFolder();
        var templateFullPath = solutionFolder.path + 'template/' + templateName;
        
        //find template
        templateFolder = Folder(templateFullPath);
        
        if (bespinDB && templateFolder.exists)
        {
            var userName = null;
            var theUser = null;
            var userSel = bespinDB.user.query("id = userId");
            
            if(userSel.count() > 0)
                userName = userSel.first().login;
            
            //find or create project
            var isRiaProject = false;
            projectFolder = tools.GetBespinProjectFolder(projectName, userName, isRiaProject);

            if(projectFolder != null)
            {
                if(!projectFolder.exists)
                    projectFolder.create();

                //copy template contents
                tools.copyFolder(templateFolder, projectFolder);
                try 
                {
                    bespinDB.startTransaction();

                    var newProject = null;
                    if (!isRiaProject) {
                        newProject = new bespinDB.project(
                            {
                                name: projectName,
                                owner: userId
                            }
                        );
                        newProject.save();
                    }
                    //Add files
                    addFilesToDatabase(bespinDB, projectFolder, newProject.id, projectName, "");

                    bespinDB.commit();
                }
                catch (err) 
                {
                    bespinDB.rollBack();
                }
            }
        }
    }

    return result;
}


/**
 * projectRename
 * 
 * @private
 * @method projectRename
 * @param {String} projectName
 * @param {String} newProjectName
 * @param {String} userId
 * @return {null}
 */
function projectRename(projectName, newProjectName, userId) {
    var result = null;
    var bespinDB = tools.connectBespinDB();
    if (bespinDB && projectName && projectName.length > 0 && solution) {     
        var projectFolder = null;
        var solutionFolder = solution.getFolder();
        var userName = null;
        var theUser = null;
        var userSel = bespinDB.user.query(id == userId);
        
        if(userSel.count() > 0)
            userName = userSel.first().login;
        
        //find or create project
        var isRiaProject = false;
        projectFolder = GetBespinProjectFolder(projectName, userName, isRiaProject);

        if (projectFolder != null && projectFolder.exists) {
            if (!isRiaProject) {
                var projectToRename = bespinDB.project.find("name == projectName");
                    
                if (projectToRename.owner === userId) {
                    projectFolder.setName(newProjectName);

                    try {
                        bespinDB.startTransaction();

                        projectToRename.name = newProjectName;
                        projectToRename.save();
                            
                        bespinDB.commit();
                    } catch (err) {
                        bespinDB.rollBack();
                    }
                }
                
            } else { 
                //TO BE DONE 
            }
        }
    }

    return result;
}



/**
 * The project request handler of the fileService. Handling requests starting by "/project/"
 * 
 * @private
 * @method projectHandler
 * @param {HttpRequestArgument} request
 * @param {HttpResponseArgument} response
 * @returns {String} The response body
 */
function projectHandler(request, response) {

    response.contentType = 'text/plain';

    var uri = new tools.URI(request.url);
    var path = uri.path;
    var query = uri.query;
    var method = request.method;
    var result = null;

    if (path) {
        var pattern = null;
        var action = null;
        var parser = /^\/(project)\/([^\/]*)\/(.*)/;
        var tabresult = path.match(parser);

        if (tabresult) {
            pattern = tabresult[1] || null;
            if (pattern && pattern === 'project') {
                action = tabresult[2] || null;
                if (action) {
                    switch (action) {
                    case 'template':
                        var projectName = tabresult[3] || null;
                        var templateName = request.body;
                        var sessionId = null;
                        var userId = null;
                            
                        tools.getCookieInfo(request, sessionId, userId);
                        if (projectName && userId) {
                            result = projectTemplate(projectName, templateName, userId);
                        }
                        break;
                            
                    case 'info':
                           
                        break;
                            
                    case 'rename':
                        var projectName = tabresult[3] || null;
                        var newProjectName = request.body;
                        var sessionId = null;
                        var userId = null;
                            
                        tools.getCookieInfo(request, sessionId, userId);
                        if (projectName && newProjectName && userId) {
                            result = projectRename(projectName, newProjectName, userId);
                        }   
                        break;
                            
                    case 'authorized':

                        break;
                            
                    case 'export':

                        break;
                            
                    case 'import':

                        break;
                            
                    case 'fromurl':

                        break;
                        
                    default:
                    
                    }


                }
            }
        }
    }

    return result;

}