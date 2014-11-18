/**
 *
 * Functions and methods at the global application level of Wakanda Server.
 *
 * @class Application
 * @extends Object
 *
 */
Solution = function Solution() {
    
    
    /**
     * 
     *
     * @property recentlyOpened
     * @attributes ReadOnly
     * @type Array
     */
    this.recentlyOpened =  []; 
    
    /**
     * 
     *
     * @property name
     * @attributes ReadOnly
     * @type String
     */
    this.name =  ''; 
    
    /**
     * 
     *
     * @property applications
     * @attributes ReadOnly
     * @type Array
     */
    this.applications =  []; 
    
    
    /**
     * quits Wakanda Server
     *
     * @method quitServer
     */
    this.quitServer = function quitServer() {             };
    
    /**
     * opens the solution whose name you pass in the solutionName parameter
     *
     * @method openRecent
     * @param {String} solutionName
     */
    this.openRecent = function openRecent(solutionName) {             };
    
    /**
     * returns Wakanda Server&#39;s &quot;walib&quot; folder, containing the libraries and services available client-side
     *
     * @method getWalibFolder
     * @param {String} kind
     * @param {Boolean | String} encoded
     * @return {String | Folder}
     */
    this.getWalibFolder = function getWalibFolder(kind, encoded) {        return '' || new Folder( );     };
    
    /**
     * returns a reference or the path to the file containing the solution setting whose ID you passed in settingID
     *
     * @method getSettingFile
     * @param {String} settingID
     * @param {String} kind
     * @param {Boolean} encoded
     */
    this.getSettingFile = function getSettingFile(settingID, kind, encoded) {             };
    
    /**
     * returns the folder containing the solution file (named &#39;SolutionName.waSolution&#39;)
     *
     * @method getFolder
     * @param {String} kind
     * @param {Boolean | String} encoded
     * @return {Folder | String}
     */
    this.getFolder = function getFolder(kind, encoded) {        return new Folder( ) || '';     };
    
    /**
     * closes the current solution and reopens the default solution
     *
     * @method close
     */
    this.close = function close() {             };
    
    /**
     * method returns the port number on which Wakanda Server&#39;s debug service is listening for the solution
     *
     * @method getDebuggerPort
     * @return {Number}
     */
    this.getDebuggerPort = function getDebuggerPort() {        return 0;     };
    
    /**
     * returns the solution-level file associated with the role you passed as a parameter
     *
     * @method getItemsWithRole
     * @param {String} role
     * @return {File}
     */
    this.getItemsWithRole = function getItemsWithRole(role) {        return new File( );     };
    

};


Application = function Application() {
    
    
    /**
     * 
     *
     * @property directory
     * @attributes ReadOnly
     * @type Directory
     */
    this.directory =  new Directory( ); 
    
    /**
     * 
     *
     * @property application
     * @attributes ReadOnly
     * @type Application
     */
    this.application =  new Application( ); 
    
    /**
     * 
     *
     * @property solution
     * @attributes ReadOnly
     * @type Solution
     */
    this.solution =  new Solution( ); 
    
    /**
     * 
     *
     * @property sessionStorage
     * @attributes ReadOnly
     * @type Storage
     */
    this.sessionStorage =  new Storage( ); 
    
    /**
     * 
     *
     * @property name
     * @attributes ReadOnly
     * @type String
     */
    this.name =  ''; 
    
    /**
     * 
     *
     * @property httpServer
     * @attributes ReadOnly
     * @type HttpServer
     */
    this.httpServer =  new HttpServer( ); 
    
    /**
     * 
     *
     * @property ds
     * @attributes ReadOnly
     * @type Datastore
     */
    this.ds =  new Datastore( ); 
    
    /**
     * 
     *
     * @property administrator
     * @attributes ReadOnly
     * @type Boolean
     */
    this.administrator =  true; 
    
    /**
     * 
     *
     * @property console
     * @attributes ReadOnly
     * @type Console
     */
    this.console =  new Console( ); 
    
    /**
     * returns an object containing information about the current operating system
     *
     * @property os
     * @attributes ReadOnly
     * @type Object
     */
    this.os =  {}; 
    
    /**
     * contains the application&#39;s current project settings in the form of a Storage object
     *
     * @property settings
     * @attributes ReadOnly
     * @type Storage
     */
    this.settings =  new Storage( ); 
    
    /**
     * 
     *
     * @property storage
     * @attributes ReadOnly
     * @type Storage
     */
    this.storage =  new Storage( ); 
    
    /**
     * 
     *
     * @property permissions
     * @attributes ReadOnly
     * @type Permissions
     */
    this.permissions =  new Permissions( ); 
    
    /**
     * returns an object containing some information about the running version of Wakanda
     *
     * @property process
     * @attributes 
     * @type Object
     */
    this.process =  {}; 
    
    /**
     * 
     *
     * @property wildchar
     * @attributes 
     * @type String
     */
    this.wildchar =  ''; 
    
    
    /**
     * constructor of the class objects of the XMLHttpRequest type
     *
     * @method XMLHttpRequest
     * @param {Object} proxy
     */
    this.XMLHttpRequest = function XMLHttpRequest(proxy) {             };
    
    /**
     * constructor of the class objects of type Blob
     *
     * @method Blob
     * @param {Number} size
     * @param {Number} filler
     * @param {String} mimeType
     */
    this.Blob = function Blob(size, filler, mimeType) {             };
    
    /**
     * creates a new mutex object that will allow you to control multithreaded concurrent accesses to JavaScript code
     *
     * @method Mutex
     * @param {String} key
     * @return {Storage}
     */
    this.Mutex = function Mutex(key) {        return new Storage( );     };
    
    /**
     * returns an object of the ConnectionSession type identifying the current session under which the current user is actually running on the server
     *
     * @method currentSession
     * @return {ConnectionSession}
     */
    this.currentSession = function currentSession() {        return new ConnectionSession( );     };
    
    /**
     * logs out the user running the current session on the Wakanda server
     *
     * @method logout
     * @return {Boolean}
     */
    this.logout = function logout() {        return true;     };
    
    /**
     * constructor of the SystemWorker type class objects
     *
     * @method SystemWorker
     * @param {String} commandLine
     * @param {String | Folder} executionPath
     */
    this.SystemWorker = function SystemWorker(commandLine, executionPath) {             };
    
    /**
     * stops all pending wait( ) loops in the thread from which it is called
     *
     * @method exitWait
     */
    this.exitWait = function exitWait() {             };
    
    /**
     * constructor of the class objects of the Buffer type
     *
     * @method Buffer
     * @param {Number | Array | String} definition
     * @param {String} encoding
     */
    this.Buffer = function Buffer(definition, encoding) {             };
    
    /**
     * cancels the timerID scheduler previously set by the setInterval( ) method
     *
     * @method clearInterval
     * @param {Number} timerID
     */
    this.clearInterval = function clearInterval(timerID) {             };
    
    /**
     * schedules JavaScript code to be run every timeout milliseconds
     *
     * @method setInterval
     * @param {Function} handler
     * @param {Number} timeout
     * @param {Mixed} args
     * @return {Number}
     */
    this.setInterval = function setInterval(handler, timeout, args) {        return 0;     };
    
    /**
     * cancels the timerID timeout previously set by the setTimeout( ) method
     *
     * @method clearTimeout
     * @param {Number} timerID
     */
    this.clearTimeout = function clearTimeout(timerID) {             };
    
    /**
     * to schedule JavaScript code to be executed after a given delay
     *
     * @method setTimeout
     * @param {Function} handler
     * @param {Number} timeout
     * @param {Mixed} args
     * @return {Number}
     */
    this.setTimeout = function setTimeout(handler, timeout, args) {        return 0;     };
    
    /**
     * returns a reference or the path to the file containing the application setting whose ID you passed in settingID
     *
     * @method getSettingFile
     * @param {String} settingID
     * @param {String} kind
     * @param {Boolean | String} encoded
     * @return {File | String}
     */
    this.getSettingFile = function getSettingFile(settingID, kind, encoded) {        return new File( ) || '';     };
    
    /**
     * returns Wakanda Server&#39;s &quot;walib&quot; folder, containing the libraries and services available client-side
     *
     * @method getWalibFolder
     * @param {String} kind
     * @param {Boolean | String} encoded
     * @return {Folder | String}
     */
    this.getWalibFolder = function getWalibFolder(kind, encoded) {        return new Folder( ) || '';     };
    
    /**
     * returns the folder containing the application file (i.e., the project file with the .waProject extension)
     *
     * @method getFolder
     * @param {String} kind
     * @param {Boolean | String} encoded
     * @return {Folder | String}
     */
    this.getFolder = function getFolder(kind, encoded) {        return new Folder( ) || '';     };
    
    /**
     * creates a new Datastore object based on the model passed as a parameter and returns a reference to this datastore
     *
     * @method createDataStore
     * @param {File} catalog
     * @param {File} data
     * @return {Datastore}
     */
    this.createDataStore = function createDataStore(catalog, data) {        return new Datastore( );     };
    
    /**
     * returns a reference to the current datastore of the project whose name you passed in projectName
     *
     * @method getDataStore
     * @param {String} projectName
     * @return {Datastore}
     */
    this.getDataStore = function getDataStore(projectName) {        return new Datastore( );     };
    
    /**
     * launches the garbage collector on all sleeping contexts
     *
     * @method garbageCollect
     */
    this.garbageCollect = function garbageCollect() {             };
    
    /**
     * allows you to display a system notification window on the server machine
     *
     * @method displayNotification
     * @param {String} message
     * @param {String} title
     * @param {Boolean} critical
     */
    this.displayNotification = function displayNotification(message, title, critical) {             };
    
    /**
     * converts the ISO date string passed in the isoDate parameter into a standard JavaScript format
     *
     * @method isoToDate
     * @param {String} isoDate
     * @return {Date}
     */
    this.isoToDate = function isoToDate(isoDate) {        return new Date( );     };
    
    /**
     * installs a request handler function on the server
     *
     * @method addHttpRequestHandler
     * @param {String} pattern
     * @param {String} file
     * @param {String} functionName
     */
    this.addHttpRequestHandler = function addHttpRequestHandler(pattern, file, functionName) {             };
    
    /**
     * converts the JavaScript date object you passed in the dateObject parameter into an ISO format string
     *
     * @method dateToIso
     * @param {Date} dateObject
     * @return {String}
     */
    this.dateToIso = function dateToIso(dateObject) {        return '';     };
    
    /**
     * returns in an object the contents of the url&#39;s&quot;query string&quot;, which was passed as a parameter
     *
     * @method getURLQuery
     * @param {} message
     * @return {Object}
     */
    this.getURLQuery = function getURLQuery(message) {        return {};     };
    
    /**
     * returns the url passed in the parameter as an array of strings
     *
     * @method getURLPath
     * @param {} message
     * @return {Array}
     */
    this.getURLPath = function getURLPath(message) {        return [];     };
    
    /**
     * returns a JSON string converted into an XML string
     *
     * @method JSONToXml
     * @param {String} jsonText
     * @param {String} jsonFormat
     * @param {String} rootElement
     * @return {String}
     */
    this.JSONToXml = function JSONToXml(jsonText, jsonFormat, rootElement) {        return '';     };
    
    /**
     * compacts the datastore&#39;s data file designated by model and data, and generates the compactedData data file.
     *
     * @method compactDataStore
     * @param {File} model
     * @param {File} data
     * @param {Object} options
     * @param {File} compactedData
     */
    this.compactDataStore = function compactDataStore(model, data, options, compactedData) {             };
    
    /**
     * allows a thread to handle events and to continue to exist after the complete code executes
     *
     * @method wait
     * @param {Number} timeout
     * @return {Boolean}
     */
    this.wait = function wait(timeout) {        return true;     };
    
    /**
     * authenticates a user by their name and key and, in case of success, opens a new user [#title id&#61;&quot;2567&quot;/] on the server
     *
     * @method loginByKey
     * @param {String} name
     * @param {String} key
     * @param {Number} timeOut
     * @return {Boolean}
     */
    this.loginByKey = function loginByKey(name, key, timeOut) {        return true;     };
    
    /**
     * authenticates a user by their name and password and, in case of success, opens a new user session on the server
     *
     * @method loginByPassword
     * @param {String} name
     * @param {String} password
     * @param {Number} timeOut
     * @return {Boolean}
     */
    this.loginByPassword = function loginByPassword(name, password, timeOut) {        return true;     };
    
    /**
     * returns the user who opened the current user session on the server
     *
     * @method currentUser
     * @return {User}
     */
    this.currentUser = function currentUser() {        return new User( );     };
    
    /**
     * returns a valid UUID string (32 chars) that you can use for your application needs
     *
     * @method generateUUID
     * @return {String}
     */
    this.generateUUID = function generateUUID() {        return '';     };
    
    /**
     * ends the thread from which it is called
     *
     * @method close
     */
    this.close = function close() {             };
    
    /**
     * constructor of the SharedWorker  type class objects
     *
     * @method SharedWorker
     * @param {String} cheminScript
     * @param {String} workerName
     */
    this.SharedWorker = function SharedWorker(cheminScript, workerName) {             };
    
    /**
     * loads the text stored in a file referenced by the file parameter and returns a string containing the text
     *
     * @method loadText
     * @param {File | String} file
     * @param {Number} charset
     * @return {String}
     */
    this.loadText = function loadText(file, charset) {        return '';     };
    
    /**
     * loads the image stored in a file referenced by the file parameter and returns an image object
     *
     * @method loadImage
     * @param {File | String} file
     * @return {Image}
     */
    this.loadImage = function loadImage(file) {        return new Image( );     };
    
    /**
     * opens a datastore in the current solution and returns a reference to it
     *
     * @method openDataStore
     * @param {File} model
     * @param {File} data
     * @return {Datastore}
     */
    this.openDataStore = function openDataStore(model, data) {        return new Datastore( );     };
    
    /**
     * creates a temporary internal Wakanda datastore based on the 4D database designated by the structure4D and data4D parameters
     *
     * @method open4DBase
     * @param {File} structure4D
     * @param {File} data4D
     * @return {Datastore}
     */
    this.open4DBase = function open4DBase(structure4D, data4D) {        return new Datastore( );     };
    
    /**
     * retourne l&#39;objet de type ProgressIndicator dont vous avez passé le nom dans le paramètre name
     *
     * @method getProgressIndicator
     * @param {String} name
     * @return {ProgressIndicator}
     */
    this.getProgressIndicator = function getProgressIndicator(name) {        return new ProgressIndicator( );     };
    
    /**
     * uninstalls an existing HTTP request handler  function running on the server
     *
     * @method removeHttpRequestHandler
     * @param {String} motif
     * @param {String} nomFichier
     * @param {String} functionName
     */
    this.removeHttpRequestHandler = function removeHttpRequestHandler(motif, nomFichier, functionName) {             };
    
    /**
     * returns an XML string converted into a JSON string
     *
     * @method XmlToJSON
     * @param {String} xmlText
     * @param {String} jsonFormat
     * @param {String} rootElement
     * @return {String}
     */
    this.XmlToJSON = function XmlToJSON(xmlText, jsonFormat, rootElement) {        return '';     };
    
    /**
     * returns the item associated with the role you passed as a parameter
     *
     * @method getItemsWithRole
     * @param {String} role
     * @return {File | Folder | Array}
     */
    this.getItemsWithRole = function getItemsWithRole(role) {        return new File( ) || new Folder( ) || [];     };
    
    /**
     * permet de créer un nouvel objet de type ProgressIndicator sur le serveur et de définir ses propriétés 
     *
     * @method ProgressIndicator
     * @param {Number} numElements
     * @param {String} nomSession
     * @param {Boolean | String} stoppable
     * @param {String} unused
     * @param {String} name
     * @return {ProgressIndicator}
     */
    this.ProgressIndicator = function ProgressIndicator(numElements, nomSession, stoppable, unused, name) {        return new ProgressIndicator( );     };
    
    /**
     * returns the exported API of a CommonJS compliant Module whose identifier you pass in id
     *
     * @method require
     * @param {String} id
     * @return {Module}
     */
    this.require = function require(id) {        return new Module( );     };
    
    /**
     * saves the text you passed to the textToSave parameter in the file parameter
     *
     * @method saveText
     * @param {String} textToSave
     * @param {File | String} file
     * @param {Number} charset
     */
    this.saveText = function saveText(textToSave, file, charset) {             };
    
    /**
     * constructor of the class objects of the dedicated Worker type
     *
     * @method Worker
     * @param {String} cheminScript
     */
    this.Worker = function Worker(cheminScript) {             };
    
    /**
     * constructor of the File type objects
     *
     * @method File
     * @param {String} absolutePath
     * @return {File}
     */
    this.File = function File(absolutePath) {        return new File( );     };
    
    /**
     * creates a new object of type Folder
     *
     * @method Folder
     * @param {String} path
     * @return {Folder}
     */
    this.Folder = function Folder(path) {        return new Folder( );     };
    
    /**
     * Constructor method: creates a new BinaryStream object
     *
     * @method BinaryStream
     * @param {String | File | SocketSync | Socket} binary
     * @param {String} readMode
     * @param {Number} timeOut
     * @return {BinaryStream}
     */
    this.BinaryStream = function BinaryStream(binary, readMode, timeOut) {        return new BinaryStream( );     };
    
    /**
     * creates a new TextStream object
     *
     * @method TextStream
     * @param {String | File} file
     * @param {String} readMode
     * @param {Number} charset
     * @return {TextStream}
     */
    this.TextStream = function TextStream(file, readMode, charset) {        return new TextStream( );     };
    
    /**
     * returns the Job Manager interface available for the application
     *
     * @method getJobManager
     * @return {JobManager}
     */
    this.getJobManager = function getJobManager() {        return new JobManager( );     };
    
    /**
     * opens a new user Session on the server with the properties you passed in sessionObj and sets it as the current session
     *
     * @method createUserSession
     * @param {Object} sessionObj
     */
    this.createUserSession = function createUserSession(sessionObj) {             };
    
    /**
     * returns an array of user sessions running on the server for the current application
     *
     * @method getUserSessions
     * @param {User | String} user
     * @return {Array}
     */
    this.getUserSessions = function getUserSessions(user) {        return [];     };
    
    /**
     * opens the remote datastore defined by params in the current solution and returns a reference to it
     *
     * @method openRemoteStore
     * @param {Object} params
     * @return {Datastore}
     */
    this.openRemoteStore = function openRemoteStore(params) {        return new Datastore( );     };
    
    /**
     * adds the remote datastore defined by params to the current project and maintains a global reference to it
     *
     * @method addRemoteStore
     * @param {String} storeName
     * @param {Object} params
     * @return {Datastore}
     */
    this.addRemoteStore = function addRemoteStore(storeName, params) {        return new Datastore( );     };
    
    /**
     * allows you to restore a data folder using a specific backup manifest file
     *
     * @method restoreDataStore
     * @param {File} manifest
     * @param {Folder} restoreFolder
     * @param {Object} options
     * @return {Object}
     */
    this.restoreDataStore = function restoreDataStore(manifest, restoreFolder, options) {        return {};     };
    
    /**
     * allows you to partially or fully integrate a journal file into a datastore
     *
     * @method integrateDataStoreJournal
     * @param {File} model
     * @param {File} data
     * @param {File} journal
     * @param {Object} options
     */
    this.integrateDataStoreJournal = function integrateDataStoreJournal(model, data, journal, options) {             };
    
    /**
     * returns an array that lists the 20 most recent backup manifests recorded in the backup registry default folder of the application
     *
     * @method getLastBackups
     * @return {Array}
     */
    this.getLastBackups = function getLastBackups() {        return [];     };
    
    /**
     * returns an Object containing the default backup settings for the solution
     *
     * @method getBackupSettings
     * @return {Object}
     */
    this.getBackupSettings = function getBackupSettings() {        return {};     };
    
    /**
     * returns an array that lists the 20 most recent backup manifests recorded in the specified backup registry
     *
     * @method getBackupRegistry
     * @param {Folder} registryFolder
     * @return {Array}
     */
    this.getBackupRegistry = function getBackupRegistry(registryFolder) {        return [];     };
    
    /**
     * starts the backup of the closed datastore defined by model and data
     *
     * @method backupDataStore
     * @param {File} model
     * @param {File} data
     * @param {Object} settings
     * @param {Object} options
     * @return {Null}
     */
    this.backupDataStore = function backupDataStore(model, data, settings, options) {        return new Null( );     };
    
    /**
     * allows the user to look up the filesystem for a file or directory referred to by a local url
     *
     * @method resolveLocalFileSystemSyncURL
     * @param {String} url
     * @return {EntrySync}
     */
    this.resolveLocalFileSystemSyncURL = function resolveLocalFileSystemSyncURL(url) {        return new EntrySync( );     };
    
    /**
     * requests a FileSystemSync object referencing a sandboxed folder or file where application data can be stored
     *
     * @method requestFileSystemSync
     * @param {Number} type
     * @param {Number} size
     * @return {FileSystemSync}
     */
    this.requestFileSystemSync = function requestFileSystemSync(type, size) {        return new FileSystemSync( );     };
    
    /**
     * requests a FileSystemSync object referencing a sandboxed folder or file where application data can be stored
     *
     * @method FileSystemSync
     * @param {Number} type
     * @param {Number} size
     * @return {FileSystemSync}
     */
    this.FileSystemSync = function FileSystemSync(type, size) {        return new FileSystemSync( );     };
    
    /**
     * references a JavaScript file from a parent JavaScript file
     *
     * @method include
     * @param {File | String} file
     * @param {String} relativePath
     * @param {String | Boolean} refresh
     */
    this.include = function include(file, relativePath, refresh) {             };
    
    /**
     * import and execute any JavaScript file(s) in the current JavaScript context
     *
     * @method importScripts
     * @param {String} scriptPath
     */
    this.importScripts = function importScripts(scriptPath) {             };
    
    /**
     * repairs the datastore&#39;s data file defined by model and data, and generates the repairedData data file.
     *
     * @method repairDataStore
     * @param {File} model
     * @param {File} data
     * @param {Object} options
     * @param {File} repairedData
     */
    this.repairDataStore = function repairDataStore(model, data, options, repairedData) {             };
    
    /**
     * verifies the internal structure of the objects contained in the datastore designated by model and data.
     *
     * @method verifyDataStore
     * @param {File} model
     * @param {File} data
     * @param {Object} options
     */
    this.verifyDataStore = function verifyDataStore(model, data, options) {             };
    

};

