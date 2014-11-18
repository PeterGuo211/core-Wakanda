/**
 *
 * Utility modules for handling low-level TCP connections, events, ...
 *
 * @class SSJS Modules
 * @extends Object
 *
 */
SocketSync = function SocketSync() {
    
    
    
    /**
     * writes data to the SocketSync to which it is applied
     *
     * @method write
     * @param {Buffer | String} data
     * @param {String} encoding
     * @return {Boolean}
     */
    this.write = function write(data, encoding) {        return true;     };
    
    /**
     * returns in a Buffer object the data read from the SocketSync instance to which it is applied
     *
     * @method read
     * @param {Number} timeOut
     * @return {Buffer | Null}
     */
    this.read = function read(timeOut) {        return new Buffer( ) || new Null( );     };
    
    /**
     * opens the connection for the existing SocketSync to which it is applied
     *
     * @method connect
     * @param {Number} port
     * @param {String} host
     */
    this.connect = function connect(port, host) {             };
    
    /**
     * sets the encoding for data received from the SocketSync to which it is applied
     *
     * @method setEncoding
     * @param {String} encoding
     */
    this.setEncoding = function setEncoding(encoding) {             };
    
    /**
     * closes the SocketSync to which it is applied
     *
     * @method end
     */
    this.end = function end() {             };
    
    /**
     * closes the SocketSync method to which it is applied
     *
     * @method destroy
     */
    this.destroy = function destroy() {             };
    
    /**
     * disables Nagle&#39;s algorithm for the SocketSync to which it is applied
     *
     * @method setNoDelay
     * @param {Boolean} noDelay
     */
    this.setNoDelay = function setNoDelay(noDelay) {             };
    
    /**
     * returns an object containing two attributes, address and port, representing the address where the client SocketSync is connected
     *
     * @method address
     * @return {Object}
     */
    this.address = function address() {        return {};     };
    

};


Socket = function Socket() {
    
    
    /**
     * returns the current number of characters in the internal buffer for the socket
     *
     * @property bufferSize
     * @attributes ReadOnly
     * @type Number
     */
    this.bufferSize =  0; 
    
    /**
     * returns the remote TCP address of the socket as a string
     *
     * @property remoteAddress
     * @attributes ReadOnly
     * @type String
     */
    this.remoteAddress =  ''; 
    
    /**
     * returns the remote port value of the socket
     *
     * @property remotePort
     * @attributes ReadOnly
     * @type Number
     */
    this.remotePort =  0; 
    
    
    /**
     * sets the encoding for data received from the socket to which it is applied
     *
     * @method setEncoding
     * @param {String} encoding
     */
    this.setEncoding = function setEncoding(encoding) {             };
    
    /**
     * closes the socket to which it is applied
     *
     * @method end
     */
    this.end = function end() {             };
    
    /**
     * returns an object containing two attributes, address and port, representing the address where the client socket is connected
     *
     * @method address
     * @return {Object}
     */
    this.address = function address() {        return {};     };
    
    /**
     * disables Nagle&#39;s algorithm for the socket to which it is applied
     *
     * @method setNoDelay
     * @param {Boolean} noDelay
     */
    this.setNoDelay = function setNoDelay(noDelay) {             };
    
    /**
     * writes data to the socket to which it is applied
     *
     * @method write
     * @param {Buffer | String} data
     * @param {String} encoding
     * @return {Boolean}
     */
    this.write = function write(data, encoding) {        return true;     };
    
    /**
     * resumes a paused socket
     *
     * @method resume
     */
    this.resume = function resume() {             };
    
    /**
     * pauses the &#39;data&#39; event triggered for the given socket
     *
     * @method pause
     */
    this.pause = function pause() {             };
    
    /**
     * opens the connection for the existing socket to which it is applied
     *
     * @method connect
     * @param {Number} port
     * @param {String} host
     * @param {Function} callback
     */
    this.connect = function connect(port, host, callback) {             };
    
    /**
     * closes the socket to which it is applied
     *
     * @method destroy
     */
    this.destroy = function destroy() {             };
    

};


ServerSync = function ServerSync() {
    
    
    
    /**
     * starts accepting synchronous connections to the ServerSync instance and returns the opened SocketSync instance
     *
     * @method accept
     * @param {Number} timeOut
     * @return {SocketSync}
     */
    this.accept = function accept(timeOut) {        return new SocketSync( );     };
    
    /**
     * returns the bound address and port of the ServerSync as reported by the operating system
     *
     * @method address
     * @return {Object}
     */
    this.address = function address() {        return {};     };
    
    /**
     * stops the ServerSync from accepting new connections
     *
     * @method close
     */
    this.close = function close() {             };
    
    /**
     * sets the ServerSync connection to the specified port and (optionally) host
     *
     * @method listen
     * @param {Number} port
     * @param {String} host
     */
    this.listen = function listen(port, host) {             };
    

};


Server = function Server() {
    
    
    
    /**
     * starts accepting connections on the specified port and (optionally) host
     *
     * @method listen
     * @param {Number} port
     * @param {String} host
     * @param {Function} listeningListener
     */
    this.listen = function listen(port, host, listeningListener) {             };
    
    /**
     * stops the Server from accepting new connections
     *
     * @method close
     */
    this.close = function close() {             };
    
    /**
     * returns the bound address and port of the Server as reported by the operating system
     *
     * @method address
     * @return {Object}
     */
    this.address = function address() {        return {};     };
    

};


POP3 = function POP3() {
    
    
    
    /**
     * returns a new POP3 client object
     *
     * @method createClient
     * @param {String} address
     * @param {Number | Undefined} port
     * @param {Boolean} isSSL
     * @param {Function} callback
     * @return {POP3}
     */
    this.createClient = function createClient(address, port, isSSL, callback) {        return new POP3( );     };
    
    /**
     * class method    allows you to connect to a POP3 server, retrieve all available messages and delete them on the server in a single call
     *
     * @method pop3.getAllMailAndDelete
     * @param {String} address
     * @param {Number} port
     * @param {Boolean} isSSL
     * @param {String} user
     * @param {String} password
     * @param {Array} allMails
     * @return {Boolean}
     */
    this.pop3.getAllMailAndDelete = function pop3.getAllMailAndDelete(address, port, isSSL, user, password, allMails) {        return true;     };
    
    /**
     * class method    allows you to connect to a POP3 server and retrieve all available messages in a single call
     *
     * @method pop3.getAllMail
     * @param {String} address
     * @param {Number | Undefined} port
     * @param {Boolean} isSSL
     * @param {String} user
     * @param {String} password
     * @param {Array} allMails
     * @return {Boolean}
     */
    this.pop3.getAllMail = function pop3.getAllMail(address, port, isSSL, user, password, allMails) {        return true;     };
    
    /**
     * issues a QUIT command to log out from the open POP3 connection
     *
     * @method quit
     * @param {Function} callback
     */
    this.quit = function quit(callback) {             };
    
    /**
     * undeletes any message marked as deleted during the current POP3 connection
     *
     * @method clearDeletionMarks
     * @param {Function} callback
     */
    this.clearDeletionMarks = function clearDeletionMarks(callback) {             };
    
    /**
     * retrieve the email designated by messageNumber from the mailbox of the open connection referenced in the POP3 object
     *
     * @method retrieveMessage
     * @param {Number} messageNumber
     * @param {Function} callback
     */
    this.retrieveMessage = function retrieveMessage(messageNumber, callback) {             };
    
    /**
     * get the size of all messages currently in the mailbox of the open connection referenced in the POP3 object
     *
     * @method getAllMessageSizes
     * @param {Function} callback
     */
    this.getAllMessageSizes = function getAllMessageSizes(callback) {             };
    
    /**
     * get the size of the email designated by messageNumber
     *
     * @method getMessageSize
     * @param {Number} messageNumber
     * @param {Function} callback
     */
    this.getMessageSize = function getMessageSize(messageNumber, callback) {             };
    
    /**
     * get the current status of the POP3 server referenced in the POP3 object
     *
     * @method getStatus
     * @param {Function} callback
     */
    this.getStatus = function getStatus(callback) {             };
    
    /**
     * connects the POP3 object to a POP3 email server
     *
     * @method connect
     * @param {String} address
     * @param {Number | Undefined} port
     * @param {Boolean} isSSL
     * @param {Function} callback
     */
    this.connect = function connect(address, port, isSSL, callback) {             };
    
    /**
     * Constructor method     creates a new POP3 object
     *
     * @method pop3.POP3
     * @param {String} address
     * @param {Number | Undefined} port
     * @param {Boolean} isSSL
     * @param {Function} callback
     */
    this.pop3.POP3 = function pop3.POP3(address, port, isSSL, callback) {             };
    
    /**
     * mark the email designated by messageNumber to be deleted from the mailbox referenced in the POP3 object
     *
     * @method markForDeletion
     * @param {Number} messageNumber
     * @param {Function} callback
     */
    this.markForDeletion = function markForDeletion(messageNumber, callback) {             };
    
    /**
     * allows authenticating the POP3 object connection on the POP3 server
     *
     * @method authenticate
     * @param {String} user
     * @param {String} password
     * @param {Function} callback
     */
    this.authenticate = function authenticate(user, password, callback) {             };
    

};


SMTP = function SMTP() {
    
    
    
    /**
     * Class method     returns a new SMTP client object
     *
     * @method smtp.createClient
     * @param {String} address
     * @param {Number} port
     * @param {Boolean} isSSL
     * @param {String} domain
     * @param {Function} callback
     * @return {SMTP}
     */
    this.smtp.createClient = function smtp.createClient(address, port, isSSL, domain, callback) {        return new SMTP( );     };
    
    /**
     * Class method    allows you to build and send a message to an SMTP server in a single call
     *
     * @method smtp.send
     * @param {String} address
     * @param {Number} port
     * @param {Boolean} isSSL
     * @param {String} user
     * @param {String} password
     * @param {String} from
     * @param {String | Array} recipients
     * @param {String} subject
     * @param {String | Array | Mail} content
     * @return {Boolean}
     */
    this.smtp.send = function smtp.send(address, port, isSSL, user, password, from, recipients, subject, content) {        return true;     };
    
    /**
     * disconnects the SMTP object from the SMTP server to which it has been logged
     *
     * @method quit
     * @param {Function} callback
     */
    this.quit = function quit(callback) {             };
    
    /**
     * sends the email through the SMTP server to which the SMTP object is connected
     *
     * @method send
     * @param {String} from
     * @param {String | Array} recipients
     * @param {Mail} email
     * @param {Function} callback
     */
    this.send = function send(from, recipients, email, callback) {             };
    
    /**
     * upgrades the connection mode of the SMTP object to a secured connection
     *
     * @method starttls
     * @param {Function} callback
     */
    this.starttls = function starttls(callback) {             };
    
    /**
     * allows authenticating the SMTP object connection on the SMTP server
     *
     * @method authenticate
     * @param {String} user
     * @param {String} password
     * @param {Function} callback
     */
    this.authenticate = function authenticate(user, password, callback) {             };
    
    /**
     * Constructor method    creates a new SMTP object
     *
     * @method smtp.SMTP
     * @param {String} address
     * @param {Number} port
     * @param {Boolean} isSSL
     * @param {String} domain
     * @param {Function} callback
     */
    this.smtp.SMTP = function smtp.SMTP(address, port, isSSL, domain, callback) {             };
    
    /**
     * connects the SMTP object to an SMTP mail server
     *
     * @method connect
     * @param {String} address
     * @param {Number} port
     * @param {Boolean} isSSL
     * @param {String} domain
     * @param {Function} callback
     */
    this.connect = function connect(address, port, isSSL, domain, callback) {             };
    
    /**
     * Class method    builds and returns a Mail object which can be used with the send( ) method
     *
     * @method mail.createMessage
     * @param {String} from
     * @param {String | Array} recipients
     * @param {String} subject
     * @param {String | Array} content
     * @return {Mail}
     */
    this.mail.createMessage = function mail.createMessage(from, recipients, subject, content) {        return new Mail( );     };
    

};


Mail = function Mail() {
    
    
    /**
     * 
     *
     * @property Subject
     * @attributes ReadOnly
     * @type String
     */
    this.Subject =  ''; 
    
    /**
     * 
     *
     * @property From
     * @attributes ReadOnly
     * @type String
     */
    this.From =  ''; 
    
    /**
     * 
     *
     * @property To
     * @attributes ReadOnly
     * @type String | Array
     */
    this.To =  '' || []; 
    
    
    /**
     * Class method    allows you to build and send a message to an SMTP server in a single call
     *
     * @method mail.send
     * @param {String} address
     * @param {Number} port
     * @param {Boolean} isSSL
     * @param {String} user
     * @param {String} password
     * @param {String} from
     * @param {String | Array} recipients
     * @param {String} subject
     * @param {String | Array | Mail} content
     * @return {Boolean}
     */
    this.mail.send = function mail.send(address, port, isSSL, user, password, from, recipients, subject, content) {        return true;     };
    
    /**
     * parses the lines array and sets the Mail with the resulting values
     *
     * @method parse
     * @param {Array} lines
     * @param {Number} startLine
     * @param {Number} endLine
     */
    this.parse = function parse(lines, startLine, endLine) {             };
    
    /**
     * sends the Mail to the specified address using the SMTP protocol
     *
     * @method send
     * @param {String} address
     * @param {Number} port
     * @param {Boolean} useSSL
     * @param {String} user
     * @param {String} password
     */
    this.send = function send(address, port, useSSL, user, password) {             };
    
    /**
     * returns the formatted body (byte-stuffing removed) of the Mail
     *
     * @method getContent
     * @return {Array}
     */
    this.getContent = function getContent() {        return [];     };
    
    /**
     *  formats and sets the body content of the Mail
     *
     * @method setContent
     * @param {String | Array} content
     * @param {Number} lineLimit
     * @return {Boolean}
     */
    this.setContent = function setContent(content, lineLimit) {        return true;     };
    
    /**
     * returns the body of the Mail
     *
     * @method getBody
     * @return {Array}
     */
    this.getBody = function getBody() {        return [];     };
    
    /**
     * sets the body part of the Mail
     *
     * @method setBody
     * @param {String | Array} body
     */
    this.setBody = function setBody(body) {             };
    
    /**
     * removes a field definition from the Mail 
     *
     * @method removeField
     * @param {String} name
     * @param {String} value
     */
    this.removeField = function removeField(name, value) {             };
    
    /**
     * adds a field definition to the Mail object
     *
     * @method addField
     * @param {String} name
     * @param {String} value
     */
    this.addField = function addField(name, value) {             };
    
    /**
     * constructor of class objects of the Mail type
     *
     * @method mail.Mail
     * @param {Object} contents
     */
    this.mail.Mail = function mail.Mail(contents) {             };
    
    /**
     * returns the current value of the field designated by name
     *
     * @method getField
     * @param {String} name
     * @return {String | Array}
     */
    this.getField = function getField(name) {        return '' || [];     };
    
    /**
     * returns the header of the Mail in the form of an array of strings
     *
     * @method getHeader
     * @return {Array}
     */
    this.getHeader = function getHeader() {        return [];     };
    

};


EventEmitter = function EventEmitter() {
    
    
    
    /**
     * returns an array of listeners defined for the specified event in the object
     *
     * @method listeners
     * @param {String} event
     * @return {Array}
     */
    this.listeners = function listeners(event) {        return [];     };
    
    /**
     * defines the maximum number of listeners that can be added per event for the object to which it is applied
     *
     * @method setMaxListeners
     * @param {Number} maxValue
     */
    this.setMaxListeners = function setMaxListeners(maxValue) {             };
    
    /**
     * triggers the event for the object, optionally passing arguments to the listener(s)
     *
     * @method emit
     * @param {String} event
     * @param {Mixed} arg
     */
    this.emit = function emit(event, arg) {             };
    
    /**
     * sets a new listener function to be called only once when the specified event is triggered for the first time by the object on which it is applied
     *
     * @method once
     * @param {String} event
     * @param {Function} listener
     */
    this.once = function once(event, listener) {             };
    
    /**
     * removes all the listeners of the specified event for the object to which it is applied
     *
     * @method removeAllListeners
     * @param {String} event
     */
    this.removeAllListeners = function removeAllListeners(event) {             };
    
    /**
     * installs a new listener function to be called when the specified event is triggered by the object on which it is applied
     *
     * @method on
     * @param {String} event
     * @param {Function} listener
     */
    this.on = function on(event, listener) {             };
    
    /**
     * installs a new listener function to be called when the specified event is triggered by the object on which it is applied
     *
     * @method addListener
     * @param {String} event
     * @param {Function} listener
     */
    this.addListener = function addListener(event, listener) {             };
    
    /**
     * removes the specified listener from the listener array of the event for the object to which it is applied
     *
     * @method removeListener
     * @param {String} event
     * @param {Function} listener
     */
    this.removeListener = function removeListener(event, listener) {             };
    

};


Services = function Services() {
    
    
    
    /**
     * returns the full path of the CommonJS module file from where it is executed
     *
     * @method getModulePath
     * @return {String}
     */
    this.getModulePath = function getModulePath() {        return '';     };
    

};

