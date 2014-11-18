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
 * The fileService module provide access to all the server file system via the Bespin REST API
 *
 * @module fileService
 **/

/*jslint white: true, es5: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, immed: true, strict: true */

// "use strict";

/*global File, Folder, application, console, exports, module, solution*/

/**
 * @class FileService
 **/

var fileServicesFolderPath, solutionFileServicesFolderPath, tools, handlers;

// Bespin compliant file service request handlers
handlers = [
    {pattern: '(?i)/edit/.*', file: 'edit.js', method: 'editHandler'},
    {pattern: '(?i)/file/.*', file: 'file.js', method: 'fileHandler'},
    {pattern: '(?i)/project/.*', file: 'project.js', method: 'projectHandler'},
    {pattern: '(?i)/register/.*', file: 'register.js', method: 'registerHandler'},
    {pattern: '(?i)/request/.*', file: 'request.js', method: 'requestHandler'},
    {pattern: '(?i)/settings/.*', file: 'settings.js', method: 'settingsHandler'}   
];

// File Service folder
fileServicesFolderPath = module.id + '/';
console.info('fileServicesFolderPath: ', fileServicesFolderPath);

solutionFileServicesFolderPath = solution.getFolder().path + "FileServices/";
console.info('solutionFileServicesFolderPath: ', solutionFileServicesFolderPath);

/**
 * Start the File Service
 *
 * @method start
 **/
exports.start = function start() {
    var bespinCatalogPath, bespinDataPath;
    
    // copy the default Bespin data store if not available
    bespinCatalogPath = solutionFileServicesFolderPath + "bespin.waCatalog";
    bespinDataPath = solutionFileServicesFolderPath + "bespin.waData";

    if (!File(bespinCatalogPath).exists) {

        if (!Folder(solutionFileServicesFolderPath).exists) {
            Folder(solutionFileServicesFolderPath).create();
            console.info('solutionFileServicesFolder created: ', Folder(solutionFileServicesFolderPath).exists);
        }

        console.info('Copy: ', fileServicesFolderPath + "bespin.waCatalog", 'to', bespinCatalogPath);
        File(fileServicesFolderPath + "bespin.waCatalog").copyTo(bespinCatalogPath);
        console.info('bespin.waCatalog copy ok: ', File(bespinCatalogPath).exists);
            
        console.info('Copy: ', fileServicesFolderPath + "bespin.waCatalog", 'to', bespinDataPath);
        File(fileServicesFolderPath + "bespin.waData").copyTo(bespinDataPath);
        console.info('bespin.waCatalog copy ok: ', File(bespinDataPath).exists);
    }

    // set HTTP request handlers
    handlers.forEach(
        function addHandler(handler) {
            var path, settingsFile;
            
            path = fileServicesFolderPath + handler.file;
            
            if (File(path).exists) {
                application.addHttpRequestHandler(
                    handler.pattern, 
                    path, 
                    handler.method
                );
            }
        }
    );
};


/**
 * Start the File Service
 *
 * @method onstart
 * @deprecated Use the start() method instead
 **/
exports.onstart = exports.start;


/**
 * Stop the File Service
 *
 * @method stop
 **/
exports.stop = function stop() {
    var serviceRunning, appIndex, app;
    
    // remove HTTP request handlers
    handlers.forEach(
        function removeHandler(handler) {
            application.removeHttpRequestHandler(
                handler.pattern, 
                fileServicesFolderPath + handler.file, 
                handler.method
            );
        }
    );

    // close the data store, if no application use it any more
    serviceRunning = false;
    appIndex = solution.applications.length;
    do {
        appIndex -= 1;
        app = solution.applications[appIndex];
        if ((app !== application) && app.fileService.enabled) {
            // another application use the Bespin data store
            return true;
        }
    } while (!serviceRunning && appIndex > 0);
    
    return tools.closeBespinDB();
};


/**
 * Stop the File Service
 *
 * @method onstop
 * @deprecated Use the start() method instead
 **/
exports.onstop = exports.stop;
