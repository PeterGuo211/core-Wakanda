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
var testCase = {
    name: "Folder Basic Test",

    _should: {
        ignore: {
             testObjectFolderReadonlyAttributeValueTrue: true,
             testObjectFolderVisibleAttributeValueFalse: true,
             testObjectFolderCreateMethodReadonlyFolder: true,
             testObjectFolderRemoveMethodErrorReadonly: true,
             testObjectFolderRemoveContentMethodErrorReadonly: true,
             testObjectFolderSetNameMethodFailsReadOnly: true
        }
    },

    setUp: function() {
        if (typeof this.creationDone === 'undefined') {
            try {
                this.creationDone = true;
                var appPath = application.getFolder("path");
                this.creationDate = new Date();
                this.creationFilePath = appPath + 'Src/EmptyFolder';
                var newFolder = Folder(this.creationFilePath);
                newFolder.create();
                var readOnlyFolder = Folder(appPath + 'Src/ReadOnlyFolder');
                readOnlyFolder.create();
                Folder(appPath + 'Src/ReadOnlyFolder').readOnly = true;
                var nonReadOnlyFolder = Folder(appPath + 'Src/NonReadOnlyFolder');
                nonReadOnlyFolder.create();
                Folder(appPath + 'Src/NonReadOnlyFolder').readOnly = false;
                var nonVisibleFolder = Folder(appPath + 'Src/NonVisibleFolder');
                nonVisibleFolder.create();
                Folder(appPath + 'Src/NonVisibleFolder').visible = false;
            } catch (e) {
                console.log('Error in setUp');
                console.log(e);
            }
        }
    },

    tearDown: function() {

    },

    //1 - Class Folder exists
    testObjectFolderExists: function() {
        Y.Assert.areSame("function", typeof Folder, "Folder should be available as a global function.");
    },

    //2 - Constructor with single argument
    testObjectFolderConstructorSingle: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src");
        Y.Assert.isObject(obj, "Folder(" + appPath + "Src) should return a Folder Object.");
    },

    //4 - Constructor Folder on a file
    testObjectFolderConstructorOnFile: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/file_main");
        Y.Assert.isObject(obj);
        Y.Assert.areSame(appPath + "Src/file_main/", obj.path);
        Y.Assert.isFalse(obj.exists);
    },

    //4b - Method valid() exists
    testObjectFolderValidMethodExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isObject(obj.firstFolder);
        Y.Assert.areSame("function", typeof obj.firstFolder.valid);
    },

    //4c - Method valid() value on valid Folder
    testObjectFolderValidMethodValueValidFolder: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isObject(obj.firstFolder);
        Y.Assert.isBoolean(obj.firstFolder.valid());
        Y.Assert.isTrue(obj.firstFolder.valid());
    },

    //4d - Method valid() value on invalid Folder
    testObjectFolderValidMethodValueInvalidFolder: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder/SubFolder");
        Y.Assert.isObject(obj.firstFolder);
        Y.Assert.isBoolean(obj.firstFolder.valid());
        Y.Assert.isFalse(obj.firstFolder.valid());
    },

    //4e - Method next() exists
    testObjectFolderNextMethodExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isObject(obj.firstFolder);
        Y.Assert.areSame("function", typeof obj.firstFolder.next);
    },

    //4f - Method next() value on first subfolder
    testObjectFolderNextMethodValueFirst: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isObject(obj.firstFolder);
        var nextObj = obj.firstFolder.next();
        Y.Assert.isBoolean(nextObj);
        Y.Assert.isTrue(nextObj);
    },

    //4g - Method next() value on last subfolder
    testObjectFolderNextMethodValueLast: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        var folder = obj.firstFolder;
        Y.Assert.isObject(folder);
        var nextObj = folder.next();
        nextObj = folder.next();
        nextObj = folder.next();
        Y.Assert.isBoolean(nextObj);
        Y.Assert.isFalse(nextObj);
    },

    //4h - Attribute readOnly exists
    testObjectFolderReadonlyAttributeExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isBoolean(obj.readOnly);
    },

    //4i - Attribute readOnly value true
    testObjectFolderReadonlyAttributeValueTrue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/ReadOnlyFolder");
        Y.Assert.isTrue(obj.readOnly);
    },

    //4j - Attribute readOnly value false
    testObjectFolderReadonlyAttributeValueFalse: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/NonReadOnlyFolder");
        Y.Assert.isFalse(obj.readOnly);
    },

    //4k - Attribute visible exists
    testObjectFolderVisibleAttributeExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isBoolean(obj.visible);
    },

    //4l - Attribute visible value true
    testObjectFolderVisibleAttributeValueTrue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isTrue(obj.visible);
    },

    //4m - Attribute visible value false
    testObjectFolderVisibleAttributeValueFalse: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + 'Src/NonVisibleFolder');
        Y.Assert.isFalse(obj.visible);
    },

    //5 - Attribute creationDate exists
    testObjectFolderCreationDateAttributeExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isObject(obj.creationDate, "Folder.creationDate should be an Object.");
        Y.Assert.isInstanceOf(Date, obj.creationDate, "Folder.creationDate should be an instance of Date.");
    },

    //6 - Attribute creationDate value
    testObjectFolderCreationDateAttributeValue: function() {
        var obj = Folder(this.creationFilePath);
        var result = new Date(obj.creationDate);
        var expected = this.creationDate.toISOString();
        var actual = result.toISOString()
        Y.Assert.areSame(expected.substr(0, expected.lastIndexOf(':')), actual.substr(0, actual.lastIndexOf(':')));
    },

    //7 - Attribute modificationDate exists
    testObjectFolderModificationDateAttributeExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isInstanceOf(Date, obj.modificationDate, "Folder.modificationDate should be an instance of Date.");
    },

    //8 - Attribute modificationDate value
    testObjectFolderModificationDateAttributeValue: function() {
        var obj = Folder(this.creationFilePath);
        var result = new Date(obj.modificationDate);
        var expected = this.creationDate.toISOString();
        var actual = result.toISOString()
        Y.Assert.areSame(expected.substr(0, expected.lastIndexOf(':')), actual.substr(0, actual.lastIndexOf(':')));
    },

    //9 - Attribute exists exists
    testObjectFolderExistsAttributeExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isBoolean(obj.exists);
    },

    //10 - Attribute exists value on non existing Folder
    testObjectFolderExistsAttributeValueNonExisting: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/NonExistingFolder");
        Y.Assert.isFalse(obj.exists);
    },

    //11 - Attribute exists value on existing Folder
    testObjectFolderExistsAttributeValue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isTrue(obj.exists);
    },

    //12 - Attribute extension exists
    testObjectFolderExtensionAttributeExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isString(obj.extension);
    },

    //13 - Attribute extension value with no extension
    testObjectFolderExtensionAttributeValueNoExt: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.areSame("", obj.extension);
    },

    //14 - Attribute extension value with extension
    testObjectFolderExtensionAttributeValueExt: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderWith.ext");
        Y.Assert.areSame("ext", obj.extension);
    },

    //15 - Attribute extension value on sub-folder (parent folder having an extension)
    testObjectFolderExtensionAttributeSubFolderValue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderWith.ext/SubFolder");
        Y.Assert.areSame("", obj.extension);
    },

    //16 - Attribute name exists
    testObjectFolderNameAttributeExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isString(obj.name);
    },

    //17 - Attribute name value
    testObjectFolderNameAttributeValue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderWith.ext");
        Y.Assert.areSame("FolderWith.ext", obj.name);
    },

    //18 - Attribute nameNoExt exists
    testObjectFolderNameNoExtAttributeExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderWith.ext");
        Y.Assert.isString(obj.nameNoExt);
    },

    //19 - Attribute nameNoExt value
    testObjectFolderNameNoExtAttributeValue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderWith.ext");
        Y.Assert.areSame("FolderWith", obj.nameNoExt);
    },

    //20 - Attribute nameNoExt value on sub-folder (parent folder having an extension)
    testObjectFolderNameNoExtAttributeSubFolderValue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderWith.ext/SubFolder");
        Y.Assert.areSame("SubFolder", obj.nameNoExt);
    },

    //21 - Attribute parent exists
    testObjectFolderParentAttributeExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isObject(obj.parent);
    },

    //22 - Attribute parent value
    testObjectFolderParentAttributeValue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isObject(obj.parent);
        Y.Assert.isString(obj.parent.name);
        Y.Assert.areSame("Src", obj.parent.name);
    },

    //23 - Attribute files exists
    testObjectFolderFilesAttributeExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isArray(obj.files);
    },

    //24 - Attribute files value
    testObjectFolderFilesAttributeValue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isArray(obj.files);
        Y.Assert.areSame(2, obj.files.length);
        var files = obj.files;
        files.sort(function (a, b) {
            if (a.name > b.name)
              return 1;
            if (a.name < b.name)
              return -1;
            return 0;
        });
        Y.Assert.isObject(files[0]);
        Y.Assert.areSame("file_empty", files[0].name);
        Y.Assert.isObject(files[1]);
        Y.Assert.areSame("second_file_empty", files[1].name);
    },

    //25 - Attribute files value on empty folder
    testObjectFolderFilesAttributeValueEmpty: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/EmptyFolder");
        Y.Assert.isArray(obj.files);
        Y.Assert.areSame(0, obj.files.length);
    },

    //26 - Attribute firstFile exists
    testObjectFolderFirstFileAttributeExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isObject(obj.firstFile);
    },

    //27 - Attribute firstFile value
    testObjectFolderFirstFileAttributeValue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isArray(obj.files);
        var firstFile = obj.firstFile;
        Y.Assert.isObject(firstFile);
        Y.Assert.isTrue(firstFile.valid());
        Y.Assert.areSame(obj.files[0].path, firstFile.path);
    },

    //27b - Attribute firstFile value on empty folder
    testObjectFolderFirstFileAttributeValueEmpty: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/EmptyFolder");
        var firstFile = obj.firstFile;
        Y.Assert.isObject(firstFile);
        Y.Assert.isFalse(firstFile.valid());
        Y.Assert.areSame(null, firstFile.path);
    },

    //28 - Attribute firstFile iteration
    testObjectFolderFirstFileAttributeIteration: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isArray(obj.files);
        var fileIter = obj.firstFile;
        Y.Assert.isObject(fileIter);
        var result = new Array();
        while (fileIter.valid()) {
            result.push(fileIter.path);
            fileIter.next();
        }
        Y.Assert.areSame(2, result.length);
        Y.Assert.areSame(obj.files[0].path, result[0]);
        Y.Assert.areSame(obj.files[1].path, result[1]);
    },

    //29 - Attribute firstFolder exists
    testObjectFolderFirstFolderAttributeExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isObject(obj.firstFolder);
    },

    //30 - Attribute firstFolder value
    testObjectFolderFirstFolderAttributeValue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isArray(obj.folders);
        var firstFolder = obj.firstFolder;
        Y.Assert.isObject(firstFolder);
        Y.Assert.isTrue(firstFolder.valid());
        Y.Assert.areSame(obj.folders[0].path, firstFolder.path);
    },

    //30b - Attribute firstFolder value on empty folder
    testObjectFolderFirstFolderAttributeValueEmpty: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/EmptyFolder");
        var firstFolder = obj.firstFolder;
        Y.Assert.isObject(firstFolder);
        Y.Assert.isFalse(firstFolder.valid());
        Y.Assert.areSame(null, firstFolder.path);
    },

    //31 - Attribute firstFolder iteration
    testObjectFolderFirstFolderAttributeIteration: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isArray(obj.folders);
        var folderIter = obj.firstFolder;
        var result = new Array();
        Y.Assert.isObject(folderIter);
        while (folderIter.valid()) {
            result.push(folderIter.path);
            folderIter.next();
        }
        Y.Assert.areSame(2, result.length);
        Y.Assert.areSame(obj.folders[0].path, result[0]);
        Y.Assert.areSame(obj.folders[1].path, result[1]);
    },

    //32 - Attribute folders exists
    testObjectFolderFoldersAttributeExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isArray(obj.folders);
    },

    //33 - Attribute folders value
    testObjectFolderFoldersAttributeValue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isArray(obj.folders);
        Y.Assert.areSame(2, obj.folders.length);
        var folders = obj.folders;
        folders.sort(function (a, b) {
            if (a.name > b.name)
              return 1;
            if (a.name < b.name)
              return -1;
            return 0;
        });
        Y.Assert.isObject(folders[0]);
        Y.Assert.areSame("SubFolder", folders[0].name);
        Y.Assert.isObject(folders[1]);
        Y.Assert.areSame("SubFolderToo", folders[1].name);
    },

    //33b - Attribute folders value on empty folder
    testObjectFolderFoldersAttributeValueEmpty: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/EmptyFolder");
        Y.Assert.isArray(obj.folders);
        Y.Assert.areSame(0, obj.folders.length);
    },

    //34 - Method create() exists
    testObjectFolderCreateMethodExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.areSame("function", typeof obj.create);
    },

    //35 - Method create() on existing path
    testObjectFolderCreateMethodExistingPath: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        var creationDate = obj.creationDate;
        var modificationDate = obj.modificationDate;
        Y.Assert.isTrue(obj.create());
        var obj2 = Folder(appPath + "Src/Folder");
        Y.Assert.areSame(creationDate.toISOString(), obj2.creationDate.toISOString());
        Y.Assert.areSame(modificationDate.toISOString(), obj2.modificationDate.toISOString());
    },

    //36 - Method create() on non-existing path
    testObjectFolderCreateMethodNonExistingPath: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Dest/NewFolder");
        Y.Assert.isTrue(obj.create());
        var obj2 = Folder(appPath + "Dest/NewFolder");
        Y.Assert.isTrue(obj2.valid());
        Y.Assert.areSame(obj.path, obj2.path);
    },

    //37 - Method create() on existing path with existing subfolder
    testObjectFolderCreateMethodExistingPathExistingSubfolder: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder/SubFolder");
        var creationDate = obj.creationDate;
        var modificationDate = obj.modificationDate;
        Y.Assert.isTrue(obj.create());
        var obj2 = Folder(appPath + "Src/Folder/SubFolder");
        Y.Assert.areSame(creationDate.toISOString(), obj2.creationDate.toISOString());
        Y.Assert.areSame(modificationDate.toISOString(), obj2.modificationDate.toISOString());
    },

    //38 - Method create() on existing path with non-existing subfolder
    testObjectFolderCreateMethodExistingPathNonExistingSubfolder: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Dest/SubFolder/NewFolder");
        Y.Assert.isTrue(obj.create());
        var obj2 = Folder(appPath + "Dest/SubFolder/NewFolder");
        Y.Assert.isTrue(obj2.valid());
        Y.Assert.areSame(obj.path, obj2.path);
    },

    //39 - Method create() on non-existing path with non-existing subfolder
    testObjectFolderCreateMethodNonExistingPathNonExistingSubfolder: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Dest/NewNewFolder/NewFolder");
        Y.Assert.isTrue(obj.create());
        var obj1 = Folder(appPath + "Dest/NewNewFolder");
        Y.Assert.isTrue(obj1.valid());
        var obj2 = Folder(appPath + "Dest/NewNewFolder/NewFolder");
        Y.Assert.isTrue(obj2.valid());
        Y.Assert.areSame(obj.path, obj2.path);
    },

    //39b - Method create() on readonly folder
    testObjectFolderCreateMethodReadonlyFolder: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/ReadOnlyFolder/NewFolder");
        Y.Assert.isFalse(obj.create());
    },

    //40 - Method forEachFile() exists
    testObjectFolderForEachFileMethodExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.areSame("function", typeof obj.forEachFile);
    },

    //41 - Method forEachFile() iteration
    testObjectFolderForEachFileMethodIteration: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isArray(obj.files);
        var result = new Array();
        obj.forEachFile(function(file) {
            result.push(file.path);
        });
        Y.Assert.areSame(2, result.length);
        Y.Assert.areSame(obj.files[0].path, result[0]);
        Y.Assert.areSame(obj.files[1].path, result[1]);
    },

    //42 - Method forEachFile() iteration with args
    testObjectFolderForEachFileMethodIterationWithArgs: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        var result = new Array();
        obj.forEachFile(function(file) {
            if (file.name === this.filter) {
                result.push(file.name);
            }
        }, {
            filter: "file_empty"
        });
        Y.Assert.areSame(1, result.length);
        Y.Assert.areSame("file_empty", result[0]);
    },

    //42b - Method forEachFile() on empty folder
    testObjectFolderForEachFileMethodEmpty: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/EmptyFolder");
        var beenThere = false;
        obj.forEachFile(function(file) {
            beenThere = true;
        });
        Y.Assert.isFalse(beenThere);
    },

    //43 - Method forEachFolder() exists
    testObjectFolderForEachFolderMethodExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.areSame("function", typeof obj.forEachFolder);
    },

    //44 - Method forEachFolder() iteration
    testObjectFolderForEachFolderMethodIteration: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.isArray(obj.folders);
        var result = new Array();
        obj.forEachFolder(function(folder) {
            result.push(folder.path);
        });
        Y.Assert.areSame(2, result.length);
        Y.Assert.areSame(obj.folders[0].path, result[0]);
        Y.Assert.areSame(obj.folders[1].path, result[1]);
    },

    //45 - Method forEachFolder() iteration with args
    testObjectFolderForEachFolderMethodIterationWithArgs: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        var result = new Array();
        obj.forEachFolder(function(folder) {
            if (folder.name === this.filter) {
                result.push(folder.name);
            }
        }, {
            filter: "SubFolderToo"
        });
        Y.Assert.areSame(1, result.length);
        Y.Assert.areSame("SubFolderToo", result[0]);
    },

    //45b - Method forEachFolder() on empty folder
    testObjectFolderForEachFolderMethodEmpty: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/EmptyFolder");
        var beenThere = false;
        obj.forEachFolder(function(folder) {
            beenThere = true;
        });
        Y.Assert.isFalse(beenThere);
    },

    //46 - Method getURL() exists
    testObjectFolderGetURLMethodExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.areSame("function", typeof obj.getURL);
    },

    //47 - Method getURL() value default 1
    testObjectFolderGetURLMethodValueDefault1: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        if (os.isWindows) Y.Assert.areSame("file:///" + obj.path, obj.getURL());
        else Y.Assert.areSame("file://" + obj.path, obj.getURL());
    },

    //48 - Method getURL() value false 1
    testObjectFolderGetURLMethodValueFalse1: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        if (os.isWindows) Y.Assert.areSame("file:///" + obj.path, obj.getURL(false));
        else Y.Assert.areSame("file://" + obj.path, obj.getURL(false));
    },

    //49 - Method getURL() value "Not Encoded" 1
    testObjectFolderGetURLMethodValueNotEcoded1: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        if (os.isWindows) Y.Assert.areSame("file:///" + obj.path, obj.getURL("Not Encoded"));
        else Y.Assert.areSame("file://" + obj.path, obj.getURL("Not Encoded"));
    },

    //50 - Method getURL() value true 1
    testObjectFolderGetURLMethodValueTrue1: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        if (os.isWindows) Y.Assert.areSame("file:///" + obj.path, obj.getURL(true));
        else Y.Assert.areSame("file://" + obj.path, obj.getURL(true));
    },

    //51 - Method getURL() value "Encoded" 1
    testObjectFolderGetURLMethodValueEncoded1: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        if (os.isWindows) Y.Assert.areSame("file:///" + obj.path, obj.getURL("Encoded"));
        else Y.Assert.areSame("file://" + obj.path, obj.getURL("Encoded"));
    },

    //52 - Method getURL() value default 2
    testObjectFolderGetURLMethodValueDefault2: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder Encodé");
        if (os.isWindows) Y.Assert.areSame("file:///" + obj.path, obj.getURL());
        else Y.Assert.areSame("file://" + obj.path, obj.getURL());
    },

    //53 - Method getURL() value false 2
    testObjectFolderGetURLMethodValueFalse2: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder Encodé");
        if (os.isWindows) Y.Assert.areSame("file:///" + obj.path, obj.getURL(false));
        else Y.Assert.areSame("file://" + obj.path, obj.getURL(false));
    },

    //54 - Method getURL() value "Not Encoded" 2
    testObjectFolderGetURLMethodValueNotEcoded2: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder Encodé");
        if (os.isWindows) Y.Assert.areSame("file:///" + obj.path, obj.getURL("Not Encoded"));
        else Y.Assert.areSame("file://" + obj.path, obj.getURL("Not Encoded"));
    },

    //55 - Method getURL() value true 2
    testObjectFolderGetURLMethodValueTrue2: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder Encodé");
        if (os.isWindows) Y.Assert.areSame("file:///" + encodeURI(obj.path), obj.getURL(true));
        else Y.Assert.areSame("file://" + encodeURI(obj.path), obj.getURL(true));
    },

    //56 - Method getURL() value "Encoded" 2
    testObjectFolderGetURLMethodValueEncoded2: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder Encodé");
        if (os.isWindows) Y.Assert.areSame("file:///" + encodeURI(obj.path), obj.getURL("Encoded"));
        else Y.Assert.areSame("file://" + encodeURI(obj.path), obj.getURL("Encoded"));
    },

    //57 - Method parse() exists
    testObjectFolderParseMethodExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.areSame("function", typeof obj.parse);
    },

    //58 - Method parse() value
    testObjectFolderParseMethodValue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        var result = {
            fileCount: 0,
            fileNames: [],
            filePositions: [],
            parentFolders: []
        };
        obj.parse(function(item, position, folder) {
            result.fileCount++;
            result.fileNames.push(item.name);
            result.filePositions.push(position);
            result.parentFolders.push(folder.name);
        });
        Y.Assert.areSame(4, result.fileCount);
        Y.ArrayAssert.itemsAreEqual(["file_empty", "file_empty", "file_empty", "second_file_empty"], result.fileNames);
        Y.ArrayAssert.itemsAreEqual([0, 1, 2, 3], result.filePositions, "Wrong positions: " + JSON.stringify(result.filePositions));
        Y.ArrayAssert.itemsAreEqual(["SubFolder", "SubFolderToo", "Folder", "Folder"], result.parentFolders, "Wrong parent folders: " + JSON.stringify(result.parentFolders));
    },

    //59 - Method parse() value on empty folder
    testObjectFolderParseMethodValueEmpty: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/EmptyFolder");
        var beenThere = false;
        obj.parse(function(item, position, folder) {
            beenThere = true;
        });
        Y.Assert.isFalse(beenThere);
    },

    //60 - Method getFreeSpace() exists
    testObjectFolderGetFreeSpaceMethodExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.areSame("function", typeof obj.getFreeSpace);
    },

    //61 - Method getFreeSpace() value free
    testObjectFolderGetFreeSpaceMethodValue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + 'Src/Folder');
        var result = obj.getFreeSpace(true);
        Y.Assert.areNotSame(-1, result);
    },

    //63 - Method getVolumeSize() exists
    testObjectFolderGetVolumeSizeMethodExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.areSame("function", typeof obj.getVolumeSize);
    },

    //64 - Method getVolumeSize() value
    testObjectFolderGetVolumeSizeMethodValue: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + 'Src/Folder');
        var result = obj.getVolumeSize(true);
        Y.Assert.areNotSame(-1, result);
    },

    //66 - Method remove() exists
    testObjectFolderRemoveMethodExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.areSame("function", typeof obj.remove);
    },

    //67 - Method drop() exists - DEPRECATED
    /*
    testObjectFolderDropMethodExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.areSame("function", typeof obj.drop);
    },
    */

    //68 - Method remove() error on non-existing
    testObjectFolderRemoveMethodErrorNonExisting: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/UnknownFolder");
        try {
            obj.remove();
            Y.Assert.fail("Should throw an error.");
        } catch (e) {
            Y.Assert.isTrue(true);
        }
    },

    //69 - Method drop() error on non-existing - DEPRECATED
    /*
    testObjectFolderDropMethodErrorNonExisting: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/UnknownFolder");
        try {
            obj.drop();
            Y.Assert.fail("Should throw an error.");
        } catch (e) {
            Y.Assert.isTrue(true);
        }
    },
    */

    //70 - Method remove() error on readonly
    testObjectFolderRemoveMethodErrorReadonly: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + 'Src/ReadOnlyFolder');
        var done = false;
        try {
            var done = obj.remove();
        } catch (e) {
            Y.Assert.fail('The "ReadOnlyFolder" Folder should still exist at this point: ' + e);
        }
        Y.Assert.isFalse(done, 'The "ReadOnlyFolder" Folder should not have been removed.');
    },

    //71 - Method drop() error on readonly - DEPRECATED
    /*
    testObjectFolderDropMethodErrorReadonly: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + 'Src/ReadOnlyFolder');
        var done = false;
        try {
            var done = obj.drop();
        } catch (e) {
            Y.Assert.fail('The "ReadOnlyFolder" Folder should still exist at this point: ' + e);
        }
        Y.Assert.isFalse(done, 'The "ReadOnlyFolder" Folder should not have been removed.');
    },
    */

    //72 - Method remove() on folder
    testObjectFolderRemoveMethodOnFolder: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderToRemove/SubFolder");
        var done = false;
        try {
            done = obj.remove();
        } catch (e) {
            Y.Assert.fail("Should not throw an error: " + JSON.stringify(e));
        }
        Y.Assert.isTrue(done);
        var objremoved = Folder(appPath + "Src/FolderToRemove/SubFolder");
        Y.Assert.isFalse(objremoved.exists);
    },

    //73 - Method drop() on folder - DEPRECATED
    /*
    testObjectFolderDropMethodOnFolder: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderToRemoveToo/SubFolder");
        var done = false;
        try {
            done = obj.drop();
        } catch (e) {
            Y.Assert.fail("Should not throw an error: " + JSON.stringify(e));
        }
        Y.Assert.isTrue(done);
        var objremoved = Folder(appPath + "Src/FolderToRemoveToo/SubFolder");
        Y.Assert.isFalse(objremoved.exists);
    },
    */

    //74 - Method remove() on folder with subfolders
    testObjectFolderRemoveMethodOnFolderWithSubFolders: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderToRemove/SubFolderToo");
        var done = false;
        try {
            done = obj.remove();
        } catch (e) {
            Y.Assert.fail("Should not throw an error: " + JSON.stringify(e));
        }
        Y.Assert.isTrue(done);
        var objremoved = Folder(appPath + "Src/FolderToRemove/SubFolderToo/SubFolder");
        Y.Assert.isFalse(objremoved.exists);
        var objremovedtoo = Folder(appPath + "Src/FolderToRemove/SubFolderToo");
        Y.Assert.isFalse(objremovedtoo.exists);
    },

    //75 - Method drop() on folder with subfolders - DEPRECATED
    /*
    testObjectFolderDropMethodOnFolderWithSubFolders: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderToRemoveToo/SubFolderToo");
        var done = false;
        try {
            done = obj.drop();
        } catch (e) {
            Y.Assert.fail("Should not throw an error: " + JSON.stringify(e));
        }
        Y.Assert.isTrue(done);
        var objremoved = Folder(appPath + "Src/FolderToRemoveToo/SubFolderToo/SubFolder");
        Y.Assert.isFalse(objremoved.exists);
        var objremovedtoo = Folder(appPath + "Src/FolderToRemoveToo/SubFolderToo");
        Y.Assert.isFalse(objremovedtoo.exists);
    },
    */

    //76 - Method removeContent() exists
    testObjectFolderRemoveContentMethodExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.areSame("function", typeof obj.removeContent);
    },

    //77 - Method dropContent() exists - DEPRECATED
    /*
    testObjectFolderDropContentMethodExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.areSame("function", typeof obj.dropContent);
    },
    */

    //78 - Method removeContent() error on non-existing
    testObjectFolderRemoveContentMethodErrorNonExisting: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/UnknownFolder");
        try {
            obj.removeContent();
            Y.Assert.fail("Should throw an error.");
        } catch (e) {
            Y.Assert.isTrue(true);
        }
    },

    //79 - Method dropContent() error on non-existing - DEPRECATED
    /*
    testObjectFolderDropContentMethodErrorNonExisting: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/UnknownFolder");
        try {
            obj.dropContent();
            Y.Assert.fail("Should throw an error.");
        } catch (e) {
            Y.Assert.isTrue(true);
        }
    },
    */

    //80 - Method removeContent() error on readonly
    testObjectFolderRemoveContentMethodErrorReadonly: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + 'Src/ReadOnlyFolder');
        var done = false;
        try {
            done = obj.removeContent();
        } catch (e) {
            Y.Assert.fail('The "ReadOnlyFolder" Folder should still exist at this point: ' + e);
        }
        Y.Assert.isFalse(done, 'The content of the "ReadOnlyFolder" Folder should not have been removed.');
    },

    //81 - Method dropContent() error on readonly - DEPRECATED
    /*
    testObjectFolderDropContentMethodErrorReadonly: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + 'Src/ReadOnlyFolder');
        var done = false;
        try {
            done = obj.dropContent();
        } catch (e) {
            Y.Assert.fail('The "ReadOnlyFolder" Folder should still exist at this point: ' + e);
        }
        Y.Assert.isFalse(done, 'The content of the "ReadOnlyFolder" Folder should not have been removed.');
    },
    */

    //82 - Method removeContent() on folder
    testObjectFolderRemoveMethodContentOnFolder: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderToRemove");
        var done = false;
        try {
            done = obj.removeContent();
        } catch (e) {
            Y.Assert.fail("Should not throw an error: " + JSON.stringify(e));
        }
        Y.Assert.isTrue(done, "The removeContent() method should return true");
        var objnotremoved = Folder(appPath + "Src/FolderToRemove");
        Y.Assert.isTrue(objnotremoved.exists, "The Src/FolderToRemove folder should still exist");
        var objremoved = File(appPath + "Src/FolderToRemove/file_empty");
        Y.Assert.isFalse(objremoved.exists, "The Src/FolderToRemove/file_empty file should have been removed");
        var objremovedtoo = File(appPath + "Src/FolderToRemove/second_file_empty");
        Y.Assert.isFalse(objremovedtoo.exists, "The Src/FolderToRemove/second_file_empty file should have been removed");
    },

    //83 - Method dropContent() on folder - DEPRECATED
    /*
    testObjectFolderDropContentMethodOnFolder: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderToRemoveToo");
        var done = false;
        try {
            done = obj.dropContent();
        } catch (e) {
            Y.Assert.fail("Should not throw an error: " + JSON.stringify(e));
        }
        Y.Assert.isTrue(done, "The dropContent() method should return true");
        var objnotremoved = Folder(appPath + "Src/FolderToRemoveToo");
        Y.Assert.isTrue(objnotremoved.exists, "The Src/FolderToRemoveToo folder should still exist");
        var objremoved = File(appPath + "Src/FolderToRemoveToo/file_empty");
        Y.Assert.isFalse(objremoved.exists, "The Src/FolderToRemoveToo/file_empty file should have been removed");
        var objremovedtoo = File(appPath + "Src/FolderToRemoveToo/second_file_empty");
        Y.Assert.isFalse(objremovedtoo.exists, "The Src/FolderToRemoveToo/second_file_empty file should have been removed");
    },
    */

    //84 - Method setName() exists
    testObjectFolderSetNameMethodExists: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/Folder");
        Y.Assert.areSame("function", typeof obj.setName);
    },

    //85 - Method setName() fails on non-existing folder
    testObjectFolderSetNameMethodFailsNonExisting: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/UnknownFolder");
        Y.Assert.isFalse(obj.setName("SomeOtherName"));
    },

    //86 - Method setName() fails on same name folder
    testObjectFolderSetNameMethodFailsSameName: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderToRename");
        Y.Assert.isFalse(obj.setName("Folder"));
    },

    //87 - Method setName() fails on readonly folder
    testObjectFolderSetNameMethodFailsReadOnly: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + 'Src/ReadOnlyFolder');
        Y.Assert.isFalse(obj.setName("NotSoReadOnlyFolder"));
    },

    //88 - Method setName() fails on invalid name
    testObjectFolderSetNameMethodFailsInvalidName: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderToRename");
        if (os.isLinux) {
            Y.Assert.isFalse(obj.setName("Fol/der"));
        } else {
            Y.Assert.isFalse(obj.setName("Fol:der"));
        }
    },

    //89 - Method setName() success
    testObjectFolderSetNameMethodSuccess: function() {
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + "Src/FolderToRename");
        Y.Assert.isTrue(obj.setName("SomeOtherName"), "setName failed");
        Y.Assert.areSame("FolderToRename", obj.name); // object name should remain the same
        var objrenamed = Folder(appPath + "Src/SomeOtherName");
        Y.Assert.isTrue(objrenamed.exists, "Folder with new name does not exist");
        var objremoved = File(appPath + "Src/FolderToRename");
        Y.Assert.isFalse(objremoved.exists, "Folder with previous name still exists");
    },

    //90 - Relative path component 1
    testObjectFolderRelativePathComponent1: function() {
        var appPath = application.getFolder("path");
        var obj1 = Folder(appPath + "Src/Folder");
        var obj2 = Folder(appPath + "Src/./Folder");
        Y.Assert.areSame(obj1.exists, obj2.exists);
        Y.Assert.areSame(obj1.name, obj2.name);
        Y.Assert.areSame(obj1.path, obj2.path);
    },

    //91 - Relative path component 2
    testObjectFolderRelativePathComponent2: function() {
        var appPath = application.getFolder("path");
        var obj1 = Folder(appPath + "Src/Folder");
        var obj2 = Folder(appPath + "Src/Folder/./");
        Y.Assert.areSame(obj1.exists, obj2.exists);
        Y.Assert.areSame(obj1.name, obj2.name);
        Y.Assert.areSame(obj1.path, obj2.path);
    },

    //92 - Relative path component 3
    testObjectFolderRelativePathComponent3: function() {
        var appPath = application.getFolder("path");
        var obj1 = Folder(appPath + "Src/Folder");
        var obj2 = Folder(appPath + "Src/Folder/.");
        Y.Assert.areSame(obj1.exists, obj2.exists);
        Y.Assert.areSame(obj1.name, obj2.name);
        Y.Assert.areSame(obj1.path, obj2.path);
    },

    //93 - Relative path component 4
    testObjectFolderRelativePathComponent4: function() {
        var appPath = application.getFolder("path");
        var obj1 = Folder(appPath + "Src/FolderWith.ext");
        var obj2 = Folder(appPath + "Src/Folder/../FolderWith.ext");
        Y.Assert.areSame(obj1.exists, obj2.exists);
        Y.Assert.areSame(obj1.name, obj2.name);
        Y.Assert.areSame(obj1.path, obj2.path);
    },

    //94 - Relative path component 5
    testObjectFolderRelativePathComponent5: function() {
        var appPath = application.getFolder("path");
        var obj1 = Folder(appPath + "Src/Folder");
        var obj2 = Folder(appPath + "Src/Folder/SubFolder/../");
        Y.Assert.areSame(obj1.exists, obj2.exists);
        Y.Assert.areSame(obj1.name, obj2.name);
        Y.Assert.areSame(obj1.path, obj2.path);
    },

    //95 - Relative path component 6
    testObjectFolderRelativePathComponent6: function() {
        var appPath = application.getFolder("path");
        var obj1 = Folder(appPath + "Src/Folder");
        var obj2 = Folder(appPath + "Src/Folder/SubFolder/..");
        Y.Assert.areSame(obj1.exists, obj2.exists);
        Y.Assert.areSame(obj1.name, obj2.name);
        Y.Assert.areSame(obj1.path, obj2.path);
    },

    //96 - Relative path component 7
    testObjectFolderRelativePathComponent7: function() {
        var appPath = application.getFolder("path");
        var obj1 = Folder(appPath + "Src");
        var obj2 = Folder(appPath + "Src/Folder/SubFolder/../../");
        Y.Assert.areSame(obj1.exists, obj2.exists);
        Y.Assert.areSame(obj1.name, obj2.name);
        Y.Assert.areSame(obj1.path, obj2.path);
    },

    //97 - Relative path component 8
    testObjectFolderRelativePathComponent8: function() {
        var appPath = application.getFolder("path");
        var obj1 = Folder(appPath + "Src");
        var obj2 = Folder(appPath + "Src/Folder/SubFolder/../..");
        Y.Assert.areSame(obj1.exists, obj2.exists);
        Y.Assert.areSame(obj1.name, obj2.name);
        Y.Assert.areSame(obj1.path, obj2.path);
    },

    //98 - Relative path component 9
    testObjectFolderRelativePathComponent9: function() {
        var appPath = application.getFolder("path");
        var obj1 = Folder(appPath + "Src");
        var obj2 = Folder(appPath + "Src/Folder/SubFolder/./../../");
        Y.Assert.areSame(obj1.exists, obj2.exists);
        Y.Assert.areSame(obj1.name, obj2.name);
        Y.Assert.areSame(obj1.path, obj2.path);
    },

    //99 - Relative path component 10
    testObjectFolderRelativePathComponent10: function() {
        var appPath = application.getFolder("path");
        var obj1 = Folder(appPath + "Src");
        var obj2 = Folder(appPath + "Src/Folder/./SubFolder/../../");
        Y.Assert.areSame(obj1.exists, obj2.exists);
        Y.Assert.areSame(obj1.name, obj2.name);
        Y.Assert.areSame(obj1.path, obj2.path);
    },

    //100 - Relative path component 11
    testObjectFolderRelativePathComponent11: function() {
        var appPath = application.getFolder("path");
        var obj1 = Folder(appPath + "Src");
        var obj2 = Folder(appPath + "Src/Folder/SubFolder/../.././");
        Y.Assert.areSame(obj1.exists, obj2.exists);
        Y.Assert.areSame(obj1.name, obj2.name);
        Y.Assert.areSame(obj1.path, obj2.path);
    },

    //101a - Folder.isFile() does not exist
    testIsFileDoesNotExist: function() {
        var result = typeof Folder.isFile;
        Y.Assert.areSame("undefined", result);
        Y.Assert.areNotSame("function", result);
    },

    //101b - Folder.isFolder() exists
    testIsFolderExists: function() {
        var result = typeof Folder.isFolder;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
    },

    //101 - Folder.isFolder() on existing file
    testIsFolderOnExistingFile: function() {
        var appPath = application.getFolder("path");
        var result = Folder.isFolder(appPath + "Src/file_main");
        Y.Assert.isFalse(result);
    },

    //102 - Folder.isFolder() on non-existing file
    testIsFolderOnNonExistingFile: function() {
        var appPath = application.getFolder("path");
        var result = Folder.isFolder(appPath + "Src/file_pied");
        Y.Assert.isFalse(result);
    },

    //103 - Folder.isFolder() on existing folder
    testIsFolderOnExistingFolder: function() {
        var appPath = application.getFolder("path");
        var result = Folder.isFolder(appPath + "Src");
        Y.Assert.isTrue(result);
    },

    //104 - Folder.isFolder() on non-existing folder
    testIsFolderOnNonExistingFolder: function() {
        var appPath = application.getFolder("path");
        var result = Folder.isFolder(appPath + "Wow");
        Y.Assert.isFalse(result);
    },

    //104b - Folder.isFolder() on non-existing folder 2
    testIsFolderOnNonExistingFolder2: function() {
        var result = Folder.isFolder("");
        Y.Assert.isFalse(result);
    }
};