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
 * Verify application data
 * 
 * @param {Object} option
 *  contain at least :
 *      applicationName : name of application to verify
 *      solutionPath : path of solution file
 *  optional :
 *       progressName : progress widget name to provide a progress indicator (default value is adminProgress)
 */
exports.Verify = function verify(option) {
    
    var 
    i,
    app,
    log,
    res,
    sol,
    date,
    logName,
    options,
    dataPath,
    dataName,
    folderLog,
    modelData,
    modelFile,
    currentDate,
    solutionOpened,
    progressIndicator,
    currentProgressTitle,
    dataFolderName,
    dataFolder,
    maintenanceFlag;

    progressIndicator = null;
    if(!option.hasOwnProperty("progressName")) {
        option.progressName = "adminProgressBar";
    }
    
    function myOpenProgress(title, maxElements) {

        if(progressIndicator === null) {
            
            progressIndicator = ProgressIndicator(maxElements, title+" element {curValue} on {maxValue}", false, "", option.progressName);
        } else {
            
            progressIndicator.subSession(maxElements, title+" element {curValue} on {maxValue}", false);
        }
        
        currentProgressTitle = title;
        
        log.appendToLog(title + " on " + maxElements + " elements");
        addLog(title + " on " + maxElements + " elements");
    }

    function myProgress(curElement, maxElements) {

        progressIndicator.setValue(curElement);
        //log.appendToLog(currentProgressTitle + " - " + curElement + "/" + maxElements);
    }

    function myCloseProgress() {
        log.appendToLog("End "+currentProgressTitle);
        currentProgressTitle = "";
        progressIndicator.endSession();
    }

    function myAddProblem(problem) {
    
        var formatedProblem;
        
        formatedProblem = formatProblem(problem);
        this.storedProblems.push(formatedProblem);
        log.appendToLog(problem.ErrorText);
        addLog("Error: " + problem.ProblemTypeText +", "+ problem.ErrorText);
    }
    
    sol = null;
    
    try {
        
        if(solution.getFolder('path') + solution.name + ".waSolution" === option.solutionPath) {
            
            sol = solution;
            maintenanceFlag = false;
        } else {
            
            sol = internal.openSolution(option.solutionPath, 2);
            maintenanceFlag = true;
        }
        if((sol !== null) && ( typeof sol !== 'undefined')) {
            
            app = sol.getApplicationByName(option.applicationName);
            //data folder in wak2 called data and in wak3 called dataFolder 
            if(Folder.isFolder(app.getFolder().path+"DataFolder")){
                dataFolderName =  "dataFolder";
            } else {
                dataFolderName =  "data"; 
            }

            if((app.getItemsWithRole(dataFolderName) == null) || ( typeof app.getItemsWithRole(dataFolderName) == 'undefined')) {

                options = {
                    'storedProblems' : []
                }
                return options.storedProblems;

            }
            
            
            modelFile = File(app.getItemsWithRole("catalog").path);
            modelData = getModelData(app);
            dataPath = modelData.path.substr(0,modelData.path.lastIndexOf("/")+1);
            dataName = modelData.path.replace(".waData", "");
            dataName = dataName.substr(dataName.lastIndexOf('/')+1);
            folderLog = Folder(app.getFolder().path + 'Logs');
			
            if(!folderLog.exists) {//check for subfolder named Documents
                try {
                    folderLog.create();
                //if not there, create it
                } catch (e) {//if you can't create it, then error out
                    return {
                        error : 5,
                        errorMessage : ' could not create log folder'
                    };
                }
            }

            date = new Date();
            currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds();
            logName = 'verify ' + app.name + ' ' + currentDate + '.waLog';
            log = new Log(app.getFolder().path + 'Logs/' + logName);

            options = {
                'openProgress' : myOpenProgress,
                'closeProgress' : myCloseProgress,
                'progress' : myProgress,
                'addProblem' : myAddProblem,

                // you can add any custom code here, it will be passed to the
                // addProblem function in the 'this' keyword
                'storedProblems' : [] // we add an array to store any problems that arise
            }
            
            if(maintenanceFlag === true) {
                app.verifyDataStore(modelFile, modelData, options);
            } else {
                app.ds.verify(options);
            }
            
            if(options.storedProblems.length > 0) {
                log.appendToLog(options.storedProblems.length + " errors found");
                res = {
                    errors : options.storedProblems,
                    file : {
                        name : log.logFile.name,
                        date : log.logFile.creationDate,
                        path : log.logFile.path
                    }
                };
                return res;
            } else {
                log.appendToLog("no errors found");
                res = {
                    errors : options.storedProblems,
                    file : {
                        name : log.logFile.name,
                        date : log.logFile.creationDate.toString(),
                        path : log.logFile.path
                    }
                };
                return res;
            }

        }

    } catch(e) {
        console.log(e);
    } finally {
        try {
            if(sol !== null && maintenanceFlag) {
                sol.close();
            }
        } catch(e) {
        }
    }
    
    return res;
    
}

/**
 * Repair application data
 * 
 * @param {Object} option
 *  contain at least :
 *      applicationName : name of application to repair
 *      solutionPath : path of solution file
 *  optional :
 *       progressName : progress widget name to provide a progress indicator (default value is adminProgress)
 */
exports.Repair = function repair(option) {
    
    var 
    i,
    app,
    log,
    res,
    sol,
    date,
    logName,
    folderM,
    options,
    dataPath,
    dataName,
    folderLog,
    modelData,
    modelFile,
    repairDest,
    currentDate,
    modeleIndexFile,
    modeleMatchFile,
    progressIndicator,
    currentProgressTitle,
    modeleIndexRepairedFile,
    modeleMatchRepairedFile,
    dataFolderName,
    dataFolder;

    progressIndicator = null;
    if(!option.hasOwnProperty("progressName")) {
        option.progressName = "adminProgressBar";
    }
    
    function myOpenProgress(title, maxElements) {
        
        log.appendToLog(title + " on " + maxElements + " elements");
        addLog(title + " on " + maxElements + " elements");
        
        currentProgressTitle = title;
        
        if(progressIndicator === null) {
            progressIndicator = ProgressIndicator(maxElements, title+" element {curValue} on {maxValue}", false, "", option.progressName);
        } else {
            progressIndicator.subSession(maxElements, title+" element {curValue} on {maxValue}", false);
        }
    }

    function myProgress(curElement, maxElements) {
        
        progressIndicator.setValue(curElement);
        //log.appendToLog(currentProgressTitle + " - " + curElement + "/" + maxElements);
    }

    function myCloseProgress() {
        log.appendToLog("End "+currentProgressTitle);
        currentProgressTitle = "";
        progressIndicator.endSession();
    }

    function myAddProblem(problem) {
        var formatedProblem;
        
        formatedProblem = formatProblem(problem);
        this.storedProblems.push(formatedProblem);
        log.appendToLog(problem.ErrorText);
        addLog("Error: " + problem.ProblemTypeText +", "+ problem.ErrorText);

    }

    sol = null;
    
    try {
        
        sol = internal.openSolution(option.solutionPath, 2);
        if((sol != null) && ( typeof sol != 'undefined')) {
            app = sol.getApplicationByName(option.applicationName);
            
            
            modelFile = File(app.getItemsWithRole("catalog").path);
            modelData = getModelData(app);
            dataPath = modelData.path.substr(0,modelData.path.lastIndexOf("/")+1);
            dataName = modelData.path.replace(".waData", "");
            dataName = dataName.substr(dataName.lastIndexOf('/')+1);
            
            
            folderLog = Folder(app.getFolder().path + 'Logs');

            if(!folderLog.exists) {//check for subfolder named Documents
                try {
                    folderLog.create();
                //if not there, create it
                } catch (e) {//if you can't create it, then error out
                    return {
                        error : 5,
                        errorMessage : ' could not create log folder'
                    };
                }
            }
            
            date = new Date();
            currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds();
            
            folderM = Folder(dataPath + 'Replaced files (repairing) ' + currentDate);

            if(!folderM.exists) {//check for subfolder named Documents
                try {
                    folderM.create();
                //if not there, create it
                } catch (e) {//if you can't create it, then error out
                    return {
                        error : 5,
                        errorMessage : ' could not create log folder'
                    };
                }
            }
            
            logName = 'repair ' + app.name + ' ' + currentDate + '.waLog';
            log = new Log(app.getFolder().path + 'Logs/' + logName);
            
            repairDest = File(dataPath + 'Replaced files (repairing) ' + currentDate +'/repaired_' + dataName + ".waData");

            options = {
                'openProgress' : myOpenProgress,
                'closeProgress' : myCloseProgress,
                'progress' : myProgress,
                'addProblem' : myAddProblem,

                // you can add any custom code here, it will be passed to the
                // addProblem function in the 'this' keyword
                'storedProblems' : [] // we add an array to store any problems that arise
            }
            
            app.repairDataStore(modelFile, modelData, options, repairDest);
            
            if(options.storedProblems.length > 0) {

                log.appendToLog(options.storedProblems.length + " errors found");
                
                res = {
                    errors : options.storedProblems,
                    file : {
                        name : log.logFile.name,
                        date : log.logFile.creationDate,
                        path : log.logFile.path
                    }
                };
                
            } else {
                log.appendToLog("no errors found");
            }
                
            //Replace Data file
            modelData.copyTo(dataPath + 'Replaced files (repairing) ' + currentDate +'/' + dataName + ".waData");
            //repairDest.moveTo(modelData, true);
                        
            moveBecauseMoveToIsNotWorking(repairDest.path ,modelData.path);
            
            //Replace Index File
            if(File.isFile(dataPath + dataName + '.waIndx')) {
                modeleIndexFile = File(dataPath + dataName + '.waIndx');
                modeleIndexFile.copyTo(dataPath + 'Replaced files (repairing) ' + currentDate +'/' + dataName + '.waIndx', true);
                
                modeleIndexRepairedFile = File(dataPath + 'Replaced files (repairing) ' + currentDate +'/repaired_' + dataName + '.waIndx');
                //modeleIndexRepairedFile.moveTo(modeleIndexFile, true);
                moveBecauseMoveToIsNotWorking(modeleIndexRepairedFile.path ,modeleIndexFile.path);
            }
            
            //Replace Match File
            if(File.isFile(dataPath + dataName + '.Match')) {
                modeleMatchFile = File(dataPath + dataName + '.Match');
                modeleMatchFile.copyTo(dataPath + 'Replaced files (repairing) ' + currentDate +'/' + dataName + '.Match', true);
                
                modeleMatchRepairedFile = File(dataPath + 'Replaced files (repairing) ' + currentDate +'/repaired_' + dataName + '.Match');
                //modeleMatchRepairedFile.moveTo(modeleMatchFile, true);
                moveBecauseMoveToIsNotWorking(modeleMatchRepairedFile.path ,modeleMatchFile.path);
            }

            
        }

    } catch(e) {
        console.log("ERROR", e);
    } finally {
        try {
            
            if(sol !== null) {
                sol.close();
            }

        } catch(e) {
        }
        return  {
            errors : options.storedProblems,
            file : {
                name : log.logFile.name,
                date : log.logFile.creationDate.toString(),
                path : log.logFile.path
            }
        };
    }
    
}

/**
 * Compact application data
 * 
 * @param {Object} option
 *  contain at least :
 *      applicationName : name of application to compact
 *      solutionPath : path of solution file
 *  optional :
 *       progressName : progress widget name to provide a progress indicator (default value is adminProgress)
 */
exports.Compact = function compact(option) {
    
    var 
    app,
    log,
    res,
    sol,
    date,
    folderM,
    logName,
    options,
    dataPath,
    dataName,
    folderLog,
    modelFile,
    modelData,
    currentDate,
    compactDest,
    modeleIndexFile,
    modeleMatchFile,
    progressIndicator,
    currentProgressTitle,
    modeleIndexCompactedFile,
    modeleMatchCompactedFile,
    dataFolderName;
    
    progressIndicator = null;

    if(!option.hasOwnProperty("progressName")) {
        option.progressName = "adminProgressBar";
    }
    
    function myOpenProgress(title, maxElements) {
        
        log.appendToLog(title + " on " + maxElements + " elements");
        addLog(title + " on " + maxElements + " elements");
        
        currentProgressTitle = title;
        
        if(progressIndicator === null) {
            progressIndicator = ProgressIndicator(maxElements, title+" element {curValue} on {maxValue}", false, "", option.progressName);
        } else {
            progressIndicator.subSession(maxElements, title+" element {curValue} on {maxValue}", false);
        }
    }

    function myProgress(curElement, maxElements) {
        
        progressIndicator.setValue(curElement);
        //log.appendToLog(currentProgressTitle + " - " + curElement + "/" + maxElements);
    }

    function myCloseProgress() {
        
        log.appendToLog("End "+currentProgressTitle);   
        currentProgressTitle = "";
        progressIndicator.endSession();
    }

    function myAddProblem(problem) {
        var formatedProblem;
        
        formatedProblem = formatProblem(problem);
        this.storedProblems.push(formatedProblem);
        log.appendToLog(problem.ErrorText);
        addLog("Error: " + problem.ProblemTypeText +", "+ problem.ErrorText);

    }

    sol = null;
    
    try {
        
        sol = internal.openSolution(option.solutionPath, 2);
        
        if((sol != null) && ( typeof sol != 'undefined')) {
            app = sol.getApplicationByName(option.applicationName);
            //data folder in wak2 called data and in wak3 called dataFolder 
            if(Folder.isFolder(app.getFolder().path+"DataFolder")){
                dataFolderName =  "dataFolder";
            } else {
                dataFolderName =  "data"; 
            }


            if((app.getItemsWithRole(dataFolderName) == null) || ( typeof app.getItemsWithRole(dataFolderName) == 'undefined')) {

                options = {
                    'storedProblems' : []
                }
                return options.storedProblems;

            }
            
            modelFile = File(app.getItemsWithRole("catalog").path);
            modelData = getModelData(app);
            dataPath = modelData.path.substr(0,modelData.path.lastIndexOf("/")+1);
            dataName = modelData.path.replace(".waData", "");
            dataName = dataName.substr(dataName.lastIndexOf('/')+1);
            
            folderLog = Folder(app.getFolder().path + 'Logs');

            if(!folderLog.exists) {//check for subfolder named Documents
                try {
                    folderLog.create();
                //if not there, create it
                } catch (e) {//if you can't create it, then error out
                    return {
                        error : 5,
                        errorMessage : ' could not create log folder'
                    };
                }
            }
            
            date = new Date();
            currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds();
            
            folderM = Folder(dataPath + 'Replaced files (compacting) ' + currentDate);

            if(!folderM.exists) {//check for subfolder named Documents
                try {
                    folderM.create();
                //if not there, create it
                } catch (e) {//if you can't create it, then error out
                    return {
                        error : 5,
                        errorMessage : ' could not create log folder'
                    };
                }
            }

            logName = 'compact ' + app.name + ' ' + currentDate + '.waLog';
            log = new Log(app.getFolder().path + 'Logs/' + logName);

            compactDest = File(dataPath + 'Replaced files (compacting) ' + currentDate + '/compacted_' + dataName + ".waData");
            
            options = {
            
                'openProgress' : myOpenProgress,
                'closeProgress' : myCloseProgress,
                'progress' : myProgress,
                'addProblem' : myAddProblem,

                // you can add any custom code here, it will be passed to the
                // addProblem function in the 'this' keyword
                'storedProblems' : [] // we add an array to store any problems that arise
                
            }

            app.compactDataStore(modelFile, modelData, options, compactDest);

            if(options.storedProblems.length > 0) {

                log.appendToLog(options.storedProblems.length + " errors found");
                
                res = {
                    errors : options.storedProblems,
                    file : {
                        name : log.logFile.name,
                        date : log.logFile.creationDate,
                        path : log.logFile.path
                    }
                };
            } else {
                log.appendToLog("no errors found");
            }
                
            //Replace Data file
            modelData.copyTo(dataPath + 'Replaced files (compacting) ' + currentDate + '/' + dataName + ".waData", true);
            //compactDest.moveTo(modelData, true);            
            moveBecauseMoveToIsNotWorking(compactDest.path ,modelData.path);
            
            //Replace Index File
            if(File.isFile(dataPath + dataName + '.waIndx')) {
                modeleIndexFile = File(dataPath + dataName + '.waIndx');
                modeleIndexFile.copyTo(dataPath + 'Replaced files (compacting) ' + currentDate + '/' + dataName + '.waIndx', true);
                
                modeleIndexCompactedFile = File(dataPath + 'Replaced files (compacting) ' + currentDate + '/compacted_' + dataName + '.waIndx');
                //modeleIndexCompactedFile.moveTo(modeleIndexFile, true);
                moveBecauseMoveToIsNotWorking(modeleIndexCompactedFile.path ,modeleIndexFile.path);
            }
            
            //Replace Match File
            if(File.isFile(dataPath + dataName + '.Match')) {
                modeleMatchFile = File(dataPath + dataName + '.Match');
                modeleMatchFile.copyTo(dataPath + 'Replaced files (compacting) ' + currentDate + '/' + dataName + '.Match', true);
                
                modeleMatchCompactedFile = File(dataPath + 'Replaced files (compacting) ' + currentDate + '/compacted_' + dataName + '.Match');
                //modeleMatchCompactedFile.moveTo(modeleMatchFile, true);
                moveBecauseMoveToIsNotWorking(modeleMatchCompactedFile.path ,modeleMatchFile.path);
            }
            
        }

    } catch(e) {
        console.log(e)
    } finally {
        try {

            if(sol !== null) {
                sol.close();
            }

        } catch(e) {
        }
        
        return  {
            errors : options.storedProblems,
            file : {
                name : log.logFile.name,
                date : log.logFile.creationDate.toString(),
                path : log.logFile.path
            }
        };
    }
                
    

}

exports.Backup = function backup(option)
{
    var
    log,
    app,
    sol,
    date,
    logName,
    options,
    settings,
    dataPath,
    modelFile,
    modelData,
    folderLog,
    currentDate,
    solutionOpened,
    progressIndicator,
    currentProgressTitle,
    maintenanceMoodFlag;
    
    progressIndicator = null;
    
    if(!option.hasOwnProperty("progressName")) {
        option.progressName = "adminProgressBar";
    }
    function myOpenProgress(title, maxElements)
    {
        
        if(progressIndicator === null) {
            
            progressIndicator = ProgressIndicator(maxElements, title+" element {curValue} on {maxValue}", false, "", option.progressName);
        } else {
            
            progressIndicator.subSession(maxElements, title+" element {curValue} on {maxValue}", false);
        }
        
        currentProgressTitle = title;
        
        log.appendToLog(title+" on "+maxElements+" operations");
        addLog(title+" on "+maxElements+" operations");
    }
 
    function myProgress(curOp, maxElements)
    {
        
        progressIndicator.setValue(curOp);
        //log.appendToLog(currentProgressTitle + " - " + curOp + "/" + maxElements)
    }
     
    function myCloseProgress()
    {
        log.appendToLog("End "+currentProgressTitle);
        currentProgressTitle = "";
        progressIndicator.endSession();
    }
     
    function myAddProblem(problem)
    {
        var formatedProblem;
        
        formatedProblem = formatProblem(problem);
        this.storedProblems.push(formatedProblem);
        log.appendToLog(problem.ErrorText);
        addLog("Error: " + problem.ProblemTypeText +", "+ problem.ErrorText);
    }
     
    try {

        if(solution.getFolder('path') + solution.name + ".waSolution" === option.solutionPath) {
            
            sol = solution;
            maintenanceMoodFlag = false;
        } else {
            
            sol = internal.openSolution(option.solutionPath, 2);
            maintenanceMoodFlag = true;
        }
        if((sol !== null) && ( typeof sol !== 'undefined')){
            app     = sol.getApplicationByName(option.applicationName);
            modelFile = File(app.getItemsWithRole("catalog").path);
            modelData = getModelData(app);
            dataPath = modelData.path.substr(0,modelData.path.lastIndexOf("/")+1);

            date    = new Date();
            currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds();
            
            folderLog = Folder(app.getFolder().path + 'Logs');

            if(!folderLog.exists) {//check for subfolder named Documents
                try {
                    folderLog.create();
                //if not there, create it
                } catch (e) {//if you can't create it, then error out
                    return {
                        error : 5,
                        errorMessage : ' could not create log folder'
                    };
                }
            }
            
            logName     = 'backup ' + app.name + ' ' + currentDate + '.waLog';
            log         = new Log(app.getFolder().path + 'Logs/' + logName);
            
            options = {
                'progress'      : myProgress,            
                'addProblem'    : myAddProblem,
                'openProgress'  : myOpenProgress,
                'closeProgress' : myCloseProgress,
                 
                // you can add any custom code here, it will be passed to the 
                // addProblem function in the 'this' keyword
                'storedProblems':[]   // we add an array to store any problems that arise
            };
            
            settings = app.getBackupSettings();
            
            if(maintenanceMoodFlag === true) {
                backupDataStore(modelFile, modelData, settings, options);
            } else {
                app.ds.backup(settings,options);
            }     
            
            if(options.storedProblems.length > 0) {
                log.appendToLog(options.storedProblems.length + " errors found");
            } else {
                log.appendToLog("no errors found");
            }
        }
    } catch (e) {
 
    } finally {
        try {
            if(sol !== null && maintenanceMoodFlag) 
                sol.close();
        } catch (e) {

        }
        
        return  {
            errors : options.storedProblems,
            file : {
                name : log.logFile.name,
                date : log.logFile.creationDate.toString(),
                path : log.logFile.path
            }
        };
    }
}

exports.Restore = function restore(option) {
    var
    i,
    log,
    len,
    sol,
    app,
    day,
    min,
    date,
    year,
    hour,
    month,
    logName,
    options,
    folderLog,
    manifest,
    backupDate,
    currentDate,
    lastBackups,
    restoreDestination,
    progressIndicator,
    currentProgressTitle;
    
    
    function myOpenProgress(title, maxElements)
    {
        
        if(progressIndicator === null || typeof progressIndicator === "undefined") {
            
            progressIndicator = ProgressIndicator(maxElements, title+" element {curValue} on {maxValue}", false, "", option.progressName);
        } else {
            
            progressIndicator.subSession(maxElements, title+" element {curValue} on {maxValue}", false);
        }
        
        currentProgressTitle = title;
        
        log.appendToLog(title+" on "+maxElements+" operations");
        addLog(title+" on "+maxElements+" operations");
    }
 
    function myProgress(curOp, maxElements)
    {
        
        progressIndicator.setValue(curOp);
        //log.appendToLog(currentProgressTitle + " - " + curOp + "/" + maxElements)
    }
     
    function myCloseProgress()
    {
        log.appendToLog("End "+currentProgressTitle);
        currentProgressTitle = "";
        progressIndicator.endSession();
    }
     
    function myAddProblem(problem)
    {
        var formatedProblem;
        
        formatedProblem = formatProblem(problem);
        this.storedProblems.push(formatedProblem);
        log.appendToLog(problem.ErrorText);
        addLog("Error: " + problem.ProblemTypeText +", "+ problem.ErrorText);
    }

    if(!option.hasOwnProperty("progressName")) {
        option.progressName = "adminProgressBar";
    }

    date    = new Date(option.restoreDate);

    year    = date.getFullYear();

    month   = date.getMonth()+1;
    month   = (month<10) ? '0'+ month : month;

    day     = date.getDate();
    day     = (day<10) ? '0'+ day : day;

    hour    = date.getHours();
    hour    = (hour<10) ? '0'+ hour : hour;

    min     = date.getMinutes();
    min     = (min<10) ? '0'+ min : min;
    
    backupDate    = year +'-'+ month +'-'+ day +'_'+ hour +'-'+ min +'-';

    try {
    
        sol = internal.openSolution(option.solutionPath, 2);
        
        app         = sol.getApplicationByName(option.applicationName);
        lastBackups = app.getLastBackups();
        
        date        = new Date();
        currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds();
        
        
        folderLog = Folder(app.getFolder().path + 'Logs');

        if(!folderLog.exists) {//check for subfolder named Documents
            try {
                folderLog.create();
            //if not there, create it
            } catch (e) {//if you can't create it, then error out
                return {
                    error : 5,
                    errorMessage : ' could not create log folder'
                };
            }
        }
            
        logName     = 'restore ' + app.name + ' ' + currentDate + '.waLog';
        log         = new Log( app.getFolder().path + 'Logs/' + logName);     
        
        for ( i=0, len=lastBackups.length; i<len ; i++ ) 
        {   
            if(lastBackups[i].path.indexOf(backupDate) != -1 ){
                manifest  = File(lastBackups[i].path);
                break;
            }
        }
        
        options = {
            'progress'      : myProgress,            
            'addProblem'    : myAddProblem,
            'openProgress'  : myOpenProgress,
            'closeProgress' : myCloseProgress,
                 
            // you can add any custom code here, it will be passed to the 
            // addProblem function in the 'this' keyword
            'storedProblems':[]   // we add an array to store any problems that arise
        };
        restoreDestination  = app.getFolder();
        restoreDataStore(manifest, restoreDestination,options);
        
        if(options.storedProblems.length > 0) {

            log.appendToLog(options.storedProblems.length + " errors found");
                
                
        } else {
            log.appendToLog("no errors found");
        }
        
    } catch (e) {
 
    } finally {
        try {
            if(sol !== null) 
                sol.close();
        } catch (e) {

        }
        return  {
            errors : options.storedProblems,
            file : {
                name : log.logFile.name,
                date : log.logFile.creationDate,
                path : log.logFile.path
            }
        };
    }
}

/**
 * Open solution
 * 
 * @param {String} path: path of the .waSolution file
 * @param {String} debuggerType:  path of the .waSolution file
 */
exports.openSolution = function open_solution(path,debuggerType) {
	var job = getJobManager().getJob();
    try {
		internal.openSolution(path, 1, debuggerType, job);
        //return true;
    } catch(e) {
        console.log("Error : ", e);
        //return false;
    }
	return job.id;
}

/**
 * Close current Solution
 */
exports.closeSolution = function close_solution() {
    var job = getJobManager().getJob();
    solution.close(job);
    return job.id;
}


exports.getMaintenanceLog = function get_maintenance_log(fromId) {
   
    var length,
    returnLog,
    maintenanceLog;
    
    maintenanceLog = storage.getItem("maintenanceLog");
    if(maintenanceLog === null) {
        maintenanceLog = [];
    }
    
    length = maintenanceLog.length;
    
    returnLog = {
        maxId : length,
        messages : maintenanceLog.slice(fromId, length)
    }
    
    return returnLog;
    
}

function formatProblem(problem) {
    
    var i,
    paramName,
    ERROR_LEVEL,
    paramExtract,
    paramExtractReg;
    
    ERROR_LEVEL = {
        "1": "Fatal Error",
        "2": "Regular Error",
        "3": "Warning"
    };
    
    problem.ErrorLevelLabel = ERROR_LEVEL[problem.ErrorLevel];
    
    paramExtractReg = new RegExp("\{(.*?)\}", "gi");
    paramExtract = problem.ProblemTypeText.match(paramExtractReg);
    
    for(i = 0; i < paramExtract.length; i++) {
        
        paramName = paramExtract[i].substring(1, (paramExtract[i].length -1));
        problem.ProblemTypeText = problem.ProblemTypeText.replace(paramExtract[i], problem[paramName]);
        
        delete problem[paramName];
    }
    
    return problem;
}

function Log(file) {// Constructor function definition
    
    var log;
    
    log = {
        appendToLog : function(myMessage) {// append function
            var file,
            stream;
            
            file = this.logFile;
            
            if(file != null) {
                if(!file.exists) {// if the file does not exist
                    file.create();
                }
                // create it
                stream = TextStream(file, "write");
                // open the stream in write mode
                stream.write(myMessage + "\n");
                // append the message to the end of stream
                stream.close();
            // do not forget to close the stream
            }
        },
        init : function(file) {// to initialize the log
        
            this.logFile = file;
            if(file.exists) {
                file.remove();
            }
            file.create();
        },
        set : function(file) {// to create the log file
        
            if( typeof file == "string") {// only text files can be created
                file = File(file);
            }
            this.logFile = file;
        },
        logFile : null
    }

    log.set(file);

    return log;
}


function addLog(log) {
    
    var 
    i,
    maxTry,
    logged,
    maintenanceLog;
    
    logged = false;
    maxTry = 3;
    i = 0;
    
    while(logged === false && i < maxTry) {
        
        if(storage.tryLock()) {
            maintenanceLog = storage.getItem("maintenanceLog");
            if(maintenanceLog === null) {
                maintenanceLog = [];
            }
            maintenanceLog.push(log);
            storage.setItem("maintenanceLog", maintenanceLog);
            storage.unlock();
            
            logged = true;
        }
        
        i++;
    }
    
    if(logged === false) {
        console.info("Cannot Log: " + log);
    }
}

/**
 * 
 */
function getModelData(app) {
    var
    i,
    len,
    dataFolder;
    if(Folder.isFolder(app.getFolder().path+"DataFolder")){

        dataFolder = app.getItemsWithRole("dataFolder").files;
        for(i=0, len= dataFolder.length ; i<len ; i++)
        {
            if( dataFolder[i].name === "data.waData"){
                return File(dataFolder[i].path);
                
            }
        }
    }
    return File(app.getItemsWithRole("data").path);
}


/*
  @ugly hack : moveTo is not working
*/
function moveBecauseMoveToIsNotWorking(src,dest){
    var srcFile = File(src);
    var destFile = File(dest);
	
    destFile.remove();
    srcFile.copyTo(dest);
    srcFile.remove();
}