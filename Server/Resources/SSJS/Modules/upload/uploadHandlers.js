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


var
UPLOAD_MESSAGES = {
    ENABLE_TO_UPLOAD    : "File Upload Error",
    CONFLICT_MESSAGE    : "Conflict(s) arose in the file(s) selected to upload. Do you want to replace them?",
    NOFILE              : {
       
       message              : "No file was uploaded."
    },
    ERROR_FOLDER        : {
       message              : "The folder specified could not be created."
    },
    SERVICE_ERROR       : {
       message              : 'Upload service error.'
    },
    MAX_COUNT_EXEEDED   : {
       message              : "File count exceeds the maximum count specified, which is @maximum file(s)."
    },
    FILE_SIZE_EXEEDED   : {
       message              : "The '@filename' file is too large to be uploaded (@filesize). The maximum file size is @maximum."
    },
    FILE_EXTENSION_NOT_ALLOWED   : {
       message              : "Files of type '@fileType' are not allowed for upload. Allowed extensions are: @allowedExtension"
    },
    FILE_EXTENSION_NOT_DETECTED   : {
       message              : "File extension is not detected. allowed extensions are @allowedExtension"
    }, 
    SERVICE_NOT_STARTED : {
       message              : "The upload service is not started."
    },
    FILE_ALREADY_EXISTS : {
       message              : "The @filename file already exists."
    },
    INVALID_JSON_FORMAT : {
       message              : "The format of the json is invalid."
    },
	PERM_ERROR: {
		message				: "Permission error"
	},
    FILE_EXTENSION_NOT_SET : {
        message              : "The extensions permitted have not been defined. If you are the administrator, please update the allowed extensions in your project's settings file."
    }
};


function checkCredentials()
{
	var uploadPermType = "service";
	var uploadPermResource = "upload";
	var uploadPermAction = "upload";
	var perm = application.permissions.findResourcePermission(uploadPermType, uploadPermResource, uploadPermAction);
	
	var group = perm.groupID;
	if (group == null)
		group = perm.groupName;

	return (perm == null || currentSession().belongsTo(group));
}


function _upload(request, response) {
    response.contentType = 'application/json';
    
    var
    info            = null,
    obj             = [],
    uploadUtils     = require('upload/uploadUtils'),
    uploader        = new uploadUtils.Uploader(),
    res             = uploader.getResult(),
    config          = null,
    folder          = null,
    datasource      = null,
    replaceIfExist  = null,
    isAdmin         = false,
    files           = [];
    
    /**
     * Validation process
     */
    if (checkCredentials())
	{
		if(!request.parts || !request.parts.count > 0){
			res.addNewError(UPLOAD_MESSAGES.NOFILE);
		}
		
		try{
			config          = JSON.parse(request.parts[request.parts.count-1].asText);
			
			if (solution.applications[0].settings.http.port != request.localPort ) {
				folder = ds.getDataFolder().path + (config.folder?config.folder:'tmp');
			} else {
				folder  = solution.applications[0].getFolder().path + "license";
				isAdmin = true;
			}

			folder          = folder.replace('//','/');
			folder          = Folder(folder);
			datasource      = config.datasource;
			replaceIfExist  = config.replace;
		}catch(e){
			res.addNewError(UPLOAD_MESSAGES.INVALID_JSON_FORMAT);
		}
		
		for (var _i = 0 ; _i < request.parts.count - 1 ; ++_i) {
			var
			part = request.parts[_i];
			
			uploader.addNewFile({
				name    : part.fileName,
				size    : part.size,
				type    : part.mediaType
			});
		}
		
		verifyProcessImpl(uploader , folder.path , {
			errorIfConflicts : false,
			isAdmin : isAdmin
		});
	}
	else
	{
		res.addNewError(UPLOAD_MESSAGES.PERM_ERROR);
		response.statusCode = 401;
	}
    
    if(res.getErrors().length > 0){
		if (response.statusCode == null || response.statusCode == 200)       
			response.statusCode = 500;
		return JSON.stringify(res);
    }

    
    //folder  = Folder(ds.getDataFolder().path + (config.folder?config.folder:'tmp'));
    /**
     * Upload process
     */
    
    for (i = 0; i < request.parts.count-1; ++i) {
        var file = File(folder,request.parts[i].fileName);
        if(file.exists && !replaceIfExist){
            var j = 0,
            fileTmp = file;
            do{
                j++;
                fileTmp = File(folder,file.nameNoExt + ' (' + j + ').' + file.extension);
            }
            while(fileTmp.exists);
            files.push(fileTmp);
            
            try{
                request.parts[i].save(folder.path + fileTmp.name, true);
                obj.push({
                    saved       : true,
                    filename    : fileTmp.name
                    //path        : fileTmp.path
                });
            }catch(e){
                obj.push({
                    saved   : false,
                    message : e.message,
                    filename    : null
                    //path        : null
                });
            }
        }
        else{
            files.push(file);
            
            try{
                request.parts[i].save(folder.path, true);
                obj.push({
                    saved       : true,
                    filename    : file.name
                    //path        : file.path
                });
            }catch(e){
                obj.push({
                    saved   : false,
                    message : e.message,
                    filename    : null
                    //path        : null
                });
            }
        }
    }
    
    config.fileNames = [];
    files.forEach(function(fileItem) {
        config.fileNames.push(fileItem.name);
    });
    
    if(datasource){
        var
        mypict,
        entity,
        theDataClass;
        
        theDataClass = ds[datasource.dsname];
        
		// force saveOnDS // L.R on 1/22/2014
		datasource.saveOnDS = true;
		
        if(!datasource.saveOnDS){
            mypict = files[0].path;
        }
        else{
            mypict  = loadImage (files[0].path);
			mypict.setPath("*");
            if(files[0].exists){
                files[0].remove();
            }
            if(folder.files.length === 0 && folder.folders.length === 0){
                folder.remove();
            }
        }

        var isSaved = false;
        entity = theDataClass(datasource.id);
        if (entity != null) {
            entity[datasource.field] = mypict;
			entity.setAttributeProperty(datasource.field, "path", "*");
            try
            {
                entity.save();
                isSaved = true;
            }
            catch (err)
            {
                isSaved = false; // maybe put a break here
            }
        }
        obj[0] = {
            saved       : isSaved,
            filename    : null,
            path        : null
        }; 
    }
    
    return JSON.stringify(obj);
}

function _verify(request, response){
    var
    info        = null,
    folder      = null,
    uploadUtils = require('upload/uploadUtils'),
    uploader    = new uploadUtils.Uploader(),
    isAdmin     = false,
    res         = uploader.getResult();

	if (checkCredentials())
	{
		/**
		 * 1- Verify if there is no file
		 */
		if(!request.parts || !request.parts.count > 0){
			res.addNewError(UPLOAD_MESSAGES.NOFILE);
		}
		
		try{
			info    = JSON.parse(request.parts[0].asText);
			if (solution.applications[0].settings.http.port != request.localPort ) {
				folder  = ds.getDataFolder().path + info.folder;
			} else {
				folder  = solution.applications[0].getFolder().path + "license";
				isAdmin = true;
			}
			
			uploader.addFiles(info.files);
		}catch(e){
			res.addNewError(UPLOAD_MESSAGES.INVALID_JSON_FORMAT);
		}
		
		/**
		 *  2 - Verify the folder if can be created
		 *  3 - Verify if the service "upload" is already launched
		 *  4 - Verify the files count (maximum files exceeded ?)
		 *  5 - Verify for each file the size (maximum file size exceeded ?)
		 *  6 - Verify for each file if it already exist
		 */

		verifyProcessImpl(uploader , folder , {
			errorIfConflicts : false,
			isAdmin : isAdmin
		});
	}
    else
	{
		res.addNewError(UPLOAD_MESSAGES.PERM_ERROR);
		response.statusCode = 401;
	}
    if(res.getErrors().length > 0){
		if (response.statusCode == null || response.statusCode == 200)
			response.statusCode = 500;
    }
    
    return JSON.stringify(res);
}

function byteSize(size , unity){
    if(isNaN(size) || parseFloat(size) < 0){
        return -1;
    }
    
    size    = parseFloat(size);
    unity   = unity || 'kb';
    
    switch(unity.toLowerCase()){
        case 'byte'    :
            return size;
        case 'mb'   :
            return size * 1024 * 1024;
        default :
            return size * 1024;
    }
}

function getSizeUnity(unity){
    switch(unity.toLowerCase()){
        case 'byte'    :
            return 'Byte(s)';
        case 'mb'   :
            return 'MB';
        default :
            return 'KB';
    }
}

function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

function verifyProcessImpl(uploader , folder , options){
    var
    _err,
    maxSize,
    sizeUnity,
    maxFiles,
    uploadService,
    uploadUtils = require('upload/uploadUtils'),
    resultObj   = uploader.getResult(),
    appService  = application.settings.services,    
    allowedExtensions,
    allowedExtensionsReg;;
    
    

    /**
     * 2 - Verify the folder if does not exist
     */

    try {
        
        folder = folder.replace('//','/');
        folder = Folder(folder);
        if(!options.isAdmin) {
            var parentFolder = ds.getDataFolder().path;
            
            if (folder.path.substr(0, parentFolder.length) === parentFolder) {
                if(!folder.exists){
                    folder.create();
                }
            } else {
                throw "folder path containes malicious characters";
            }  
        } else {
            if(!folder.exists){
                folder.create();
            }
        }     
        
    } catch(e){
        resultObj.addNewError(UPLOAD_MESSAGES.ERROR_FOLDER);
    }
    
    /**
     * 3 - Verify if the service "upload" is already launched
     */
    if(!appService || !appService.upload){
        resultObj.addNewError(UPLOAD_MESSAGES.SERVICE_NOT_STARTED);
    }

    try{
        if (options.isAdmin) {
            allowedExtensions = "json";
            allowedExtensionsReg = new RegExp(allowedExtensions, 'i');
            maxSize = "1024";
            sizeUnity = "kb";
            maxFiles = 1;
        } else {
           uploadService   = appService.upload;
           maxSize         = isNaN(uploadService.maxSize) ? -1 : parseFloat(uploadService.maxSize);
           sizeUnity       = uploadService.sizeUnity || 'kb';
           maxFiles    = isNaN(uploadService.maxFiles) ? -1 : parseInt(uploadService.maxFiles);
           allowedExtensions = uploadService.allowedExtensions ? uploadService.allowedExtensions : "gif;jpeg;jpg;png;bmp;svg" ;
           allowedExtensionsReg = allowedExtensions.replace( new RegExp(';', 'g'), '$|') + '$';
           allowedExtensionsReg = new RegExp(allowedExtensionsReg, 'i');
        }

           uploader.setMaxFiles(maxFiles);
           uploader.setMaxSize(byteSize(maxSize , sizeUnity));           
        
        /**
         * 4 - Verify the files count (maximum files exceeded ?)
         */
        if(uploader.getFiles().length > uploader.getMaxFiles() && uploader.getMaxFiles() >= 0 ){
            _err = UPLOAD_MESSAGES.MAX_COUNT_EXEEDED;
            
            _err.message = _err.message.replace(/@maximum/g , uploader.getMaxFiles());

            resultObj.addNewError(_err);
        }
        
        uploader.validateAll(function(resObj){
            var file, ext, extIndex; 
            
            file = File(folder,this.name);
            
            
            
            /**
             * 5 - Verify for each file the size (maximum file size exceeded ?)
             */
            if(this.getSize() > uploader.getMaxSize()){
                _err = clone(UPLOAD_MESSAGES.FILE_SIZE_EXEEDED);
                
                _err.message = _err.message.replace(/@filename/g , this.getName());
                _err.message = _err.message.replace(/@maximum/g , maxSize + ' ' + getSizeUnity(sizeUnity) );
                _err.message = _err.message.replace(/@filesize/g , this.getSize() + ' Byte(s)' );
                
                resObj.addNewError(_err);
            }
            
            if( (extIndex = this.name.lastIndexOf('.')) === -1){
                _err = clone(UPLOAD_MESSAGES.FILE_EXTENSION_NOT_DETECTED);
                _err.message = _err.message.replace(/@allowedExtension/g , allowedExtensions);                
                resObj.addNewError(_err);
            } else {
                ext  = this.name.substr(extIndex+1).toLowerCase();
                if(!ext.match(allowedExtensionsReg)){
                    _err = clone(UPLOAD_MESSAGES.FILE_EXTENSION_NOT_ALLOWED);
                    _err.message = _err.message.replace(/@fileType/g , ext);
                    _err.message = _err.message.replace(/@allowedExtension/g , allowedExtensions);                
                    resObj.addNewError(_err);
                }
            }
            /**
             * 6 - Verify for each file if it already exist
             */
            if(file.exists){
                var
                conflict = {
                    fileSent   : new uploadUtils.File({
                        name    : this.getName(),
                        size    : this.getSize(),
                        type    : this.getType()
                    }),
                    fileExists : new uploadUtils.File({
                        name    : file.name,
                        size    : file.size,
                        type    : this.getType()
                    })
                };
                
                resObj.addNewConflict(conflict);
                
                if(options.errorIfConflicts){
                    _err            = clone(UPLOAD_MESSAGES.FILE_ALREADY_EXISTS);
                    _err.message    = _err.message.replace(/@filename/g , this.getName());
                    
                    resObj.addNewError(_err);
                }
            }
        });
        
    }catch(e){
        resultObj.addNewError(UPLOAD_MESSAGES.SERVICE_ERROR);
    }
    
    if(resultObj.getConflicts().length > 0){
        resultObj.setConflictMessage(resultObj.getConflicts().length + UPLOAD_MESSAGES.CONFLICT_MESSAGE);
    }
}


function _getServerMaximumFiles(request, response) {
    var appService  = application.settings.services;
    var uploadService   = appService.upload;

    var maxFiles = isNaN(uploadService.maxFiles) ? 'unlimited' : uploadService.maxFiles;

    return JSON.stringify(maxFiles);
}

function _getServerMaximumFileSize(request, response) {
    var appService  = application.settings.services;
    var uploadService   = appService.upload;
    var sizeUnity = uploadService.sizeUnity || 'kb';

    var maxSize = isNaN(uploadService.maxSize) ? 'unlimited' : uploadService.maxSize + sizeUnity;
    return JSON.stringify(maxSize);
}
