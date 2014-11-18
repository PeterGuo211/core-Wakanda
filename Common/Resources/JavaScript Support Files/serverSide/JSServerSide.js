/*
* This file is part of Wakanda software,licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3),or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event,Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently,no title,copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/

/**
 * @constructor
 * @extends Function
 */
function XMLHttpRequest(){};
XMLHttpRequest.prototype.responseText=''; 
XMLHttpRequest.prototype.statusText=''; 
XMLHttpRequest.prototype.status=0; 
XMLHttpRequest.prototype.readyState=0; 
XMLHttpRequest.prototype.onreadystatechange=function(){}
XMLHttpRequest.prototype.getAllResponseHeaders=function(){return '';};
XMLHttpRequest.prototype.getResponseHeader=function(header){return ''||new Null();};
XMLHttpRequest.prototype.send=function(data){};
XMLHttpRequest.prototype.open=function(){};
XMLHttpRequest.prototype.setRequestHeader=function(){};


/**
 * @constructor
 * @extends Function
 */
function Buffer(){};
Buffer.prototype.length=0; 
Buffer.prototype.isBuffer=function(){return true;};
Buffer.prototype.byteLength=function(){return 0;};
Buffer.prototype.toBlob=function(){return new Blob();};
Buffer.prototype.writeDoubleBE=function(){};
Buffer.prototype.readDoubleBE=function(){return 0;};
Buffer.prototype.writeFloatBE=function(){};
Buffer.prototype.readFloatBE=function(){return 0;};
Buffer.prototype.writeInt32BE=function(){};
Buffer.prototype.writeUInt32BE=function(){};
Buffer.prototype.readInt32BE=function(){return 0;};
Buffer.prototype.readUInt32BE=function(){return 0;};
Buffer.prototype.writeInt24BE=function(){};
Buffer.prototype.writeInt24LE=function(){};
Buffer.prototype.writeUInt24BE=function(){};
Buffer.prototype.writeUInt24LE=function(){};
Buffer.prototype.readInt24BE=function(){return 0;};
Buffer.prototype.readInt24LE=function(){return 0;};
Buffer.prototype.readUInt24BE=function(){return 0;};
Buffer.prototype.readUInt24LE=function(){return 0;};
Buffer.prototype.writeInt16BE=function(){};
Buffer.prototype.writeUInt16BE=function(){};
Buffer.prototype.write=function(){return 0;};
Buffer.prototype.toString=function(){return '';};
Buffer.prototype.copy=function(){};
Buffer.prototype.fill=function(){};
Buffer.prototype.writeDoubleLE=function(){};
Buffer.prototype.writeFloatLE=function(){};
Buffer.prototype.writeInt32LE=function(){};
Buffer.prototype.writeInt16LE=function(){};
Buffer.prototype.writeInt8=function(){};
Buffer.prototype.writeUInt32LE=function(){};
Buffer.prototype.writeUInt16LE=function(){};
Buffer.prototype.writeUInt8=function(){};
Buffer.prototype.readDoubleLE=function(){return 0;};
Buffer.prototype.readFloatLE=function(){return 0;};
Buffer.prototype.readInt16LE=function(){return 0;};
Buffer.prototype.readInt8=function(){return 0;};
Buffer.prototype.readUInt32LE=function(){return 0;};
Buffer.prototype.readUInt16LE=function(){return 0;};
Buffer.prototype.readUInt8=function(){return 0;};
Buffer.prototype.slice=function(start,end){return new Buffer();};
Buffer.prototype.readInt32LE=function(){return 0;};
Buffer.prototype.readInt16BE=function(){return 0;};
Buffer.prototype.readUInt16BE=function(){return 0;};

/**
 * @constructor
 * @extends Function
 */
function Blob(){};
Blob.prototype.type=''; 
Blob.prototype.size=0; 
Blob.prototype.toBuffer=function(){return new Buffer();};
Blob.prototype.slice=function(){return new Blob();};
Blob.prototype.toString=function(){return '';};
Blob.prototype.copyTo=function(){};

/**
 * @constructor
 * @extends Function
 */
function Console(){};
Console.prototype.content=[]; 
Console.prototype.info=function(){};
Console.prototype.warn=function(){};
Console.prototype.log=function(){};
Console.prototype.error=function(){};
Console.prototype.debug=function(){};

/**
 * @constructor
 * @extends Object
 */
function BinaryStream(){};
BinaryStream.prototype.getByte=function(){return 0;};
BinaryStream.prototype.flush=function(){};
BinaryStream.prototype.putByte=function(){};
BinaryStream.prototype.getLong=function(){return 0;};
BinaryStream.prototype.setPos=function(){};
BinaryStream.prototype.putWord=function(){};
BinaryStream.prototype.putString=function(){};
BinaryStream.prototype.putReal=function(){};
BinaryStream.prototype.putLong64=function(){};
BinaryStream.prototype.putLong=function(){};
BinaryStream.prototype.isByteSwapping=function(){return true;};
BinaryStream.prototype.getWord=function(){return 0;};
BinaryStream.prototype.getString=function(){return '';};
BinaryStream.prototype.getSize=function(){return 0;};
BinaryStream.prototype.getReal=function(){return 0;};
BinaryStream.prototype.getPos=function(){return 0;};
BinaryStream.prototype.getLong64=function(){return 0;};
BinaryStream.prototype.changeByteOrder=function(){};
BinaryStream.prototype.close=function(){};
BinaryStream.prototype.putBuffer=function(){};
BinaryStream.prototype.putBlob=function(){};
BinaryStream.prototype.getBuffer=function(){return new Buffer();};
BinaryStream.prototype.getBlob=function(){return new Blob();};

/**
 * @constructor
 * @extends Function
 */
function TextStream(){};
TextStream.prototype.rewind=function(){};
TextStream.prototype.close=function(){};
TextStream.prototype.write=function(){};
TextStream.prototype.read=function(){return '';};
TextStream.prototype.getSize=function(){return 0;};
TextStream.prototype.getPos=function(){return 0;};
TextStream.prototype.end=function(){return true;};
TextStream.prototype.flush=function(){};

/**
 * @constructor
 * @extends Function
 */
function File(){};
File.prototype.creationDate=new Date(); 
File.prototype.exists=true; 
File.prototype.extension=''; 
File.prototype.lastModifiedDate=new Date(); 
File.prototype.name=''; 
File.prototype.nameNoExt=''; 
File.prototype.parent=new Folder(); 
File.prototype.path=''; 
File.prototype.readOnly=true; 
File.prototype.size=0; 
File.prototype.visible=true; 
File.prototype.isFile=function(){return true;};
File.prototype.create=function(){return true;};
File.prototype.getFreeSpace=function(){return 0;};
File.prototype.getURL=function(){return '';};
File.prototype.getVolumeSize=function(){return 0;};
File.prototype.moveTo=function(){};
File.prototype.remove=function(){return true;};
File.prototype.setName =function(){return true;};
File.prototype.valid=function(){return true;};
File.prototype.next=function(){return true;};

/**
 * @constructor
 * @extends Function
 */
function Folder(){};
Folder.prototype.creationDate=new Date(); 
Folder.prototype.files=[]; 
Folder.prototype.firstFile=new File(); 
Folder.prototype.firstFolder=new Folder(); 
Folder.prototype.folders=[]; 
Folder.prototype.modificationDate=new Date(); 
Folder.prototype.name=''; 
Folder.prototype.parent=new Folder(); 
Folder.prototype.path=''; 
Folder.prototype.readOnly=true; 
Folder.prototype.visible=true; 
Folder.prototype.nameNoExt=''; 
Folder.prototype.extension=''; 
Folder.prototype.exists=true; 
Folder.prototype.isFolder=function(){return true;};
Folder.prototype.create=function(){return true;};
Folder.prototype.forEachFile=function(){};
Folder.prototype.forEachFolder=function(){};
Folder.prototype.getFreeSpace=function(){return 0;};
Folder.prototype.getURL=function(){return '';};
Folder.prototype.getVolumeSize=function(){return 0;};
Folder.prototype.parse=function(){};
Folder.prototype.remove=function(){return true;};
Folder.prototype.removeContent=function(){return true;};
Folder.prototype.setName=function(){};
Folder.prototype.valid=function(){return true;};
Folder.prototype.next=function(){return true;};

/**
 * @constructor
 * @extends Function
 */
function EntrySync(){};
EntrySync.prototype.name=''; 
EntrySync.prototype.isFile=true; 
EntrySync.prototype.isDirectory=true; 
EntrySync.prototype.fullPath=''; 
EntrySync.prototype.filesystem=new FileSystemSync(); 
EntrySync.prototype.toURL=function(){return '';};
EntrySync.prototype.remove=function(){};
EntrySync.prototype.moveTo=function(){};
EntrySync.prototype.getParent=function(){return new DirectoryEntrySync();};
EntrySync.prototype.getMetadata=function(){return new Metadata();};
EntrySync.prototype.copyTo=function(){return new EntrySync();};

/**
 * @constructor
 * @extends Function
 */
function DirectoryEntrySync(){};
DirectoryEntrySync.prototype.folder=function(){return new Folder();};
DirectoryEntrySync.prototype.removeRecursively=function(){};
DirectoryEntrySync.prototype.getFile=function(){return new FileEntrySync();};
DirectoryEntrySync.prototype.getDirectory=function(){return new DirectoryEntrySync();};
DirectoryEntrySync.prototype.createReader=function(){return new DirectoryReaderSync();};

/**
 * @constructor
 * @extends Function
 */
function DirectoryReaderSync(){};
DirectoryReaderSync.prototype.readEntries=function(){return [];};

/**
 * @constructor
 * @extends Function
 */
function FileEntrySync(){};
FileEntrySync.prototype.file=function file(){return new File();};
FileEntrySync.prototype.createWriter=function(){return new FileWriterSync();};

/**
 * @constructor
 * @extends Function
 */
function FileSystemSync(){};
FileSystemSync.prototype.root=new DirectoryEntrySync();
FileSystemSync.prototype.name=''; 

/**
 * @constructor
 * @extends Function
 */
function Image(){};
Image.prototype.height=0; 
Image.prototype.length=0; 
Image.prototype.size=0; 
Image.prototype.width=0; 
Image.prototype.meta={}; 
Image.prototype.save=function(){};
Image.prototype.saveMeta=function(){};
Image.prototype.thumbnail=function(){return 0;};

/**
 * @constructor
 * @extends Function
 */
function SystemWorker(){};
SystemWorker.prototype.onterminated=function(){}; 
SystemWorker.prototype.onerror=function(){}; 
SystemWorker.prototype.on=function(){}; 
SystemWorker.prototype.getInfos=function(){return {};};
SystemWorker.prototype.getNumberRunning=function(){return 0;};
SystemWorker.prototype.wait=function(){return true;};
SystemWorker.prototype.endOfInput=function(){};
SystemWorker.prototype.postMessage=function(){};
SystemWorker.prototype.terminate=function(){};
SystemWorker.prototype.setBinary=function(){};
SystemWorker.prototype.exec=function(){return {} || new Null();};

/**
 * @constructor
 * @extends Function
 */
function ConnectionSession(){};
ConnectionSession.prototype.user=new User(); 
ConnectionSession.prototype.storage=new Storage(); 
ConnectionSession.prototype.unPromote=function(){};
ConnectionSession.prototype.promoteWith=function(){return 0;};
ConnectionSession.prototype.checkPermission=function(){return true;};
ConnectionSession.prototype.belongsTo=function(){return true;};

/**
 * @constructor
 * @extends Function
 */
function Directory(){};
Directory.prototype.internalStore=new Datastore(); 
Directory.prototype.getLoginListener=function(){return '';};
Directory.prototype.setLoginListener=function(){};
Directory.prototype.save=function(){return true;};
Directory.prototype.filterGroups=function(){return [];};
Directory.prototype.filterUsers=function(){return [];};
Directory.prototype.group=function(){return new Group() || new Null();};
Directory.prototype.user=function(){return new User() || new Null();};
Directory.prototype.addUser=function(){return new User();};
Directory.prototype.addGroup=function(){return new Group();};
Directory.prototype.hasAdministrator=function(){return true;};
Directory.prototype.computeHA1=function(){return '';};

/**
 * @constructor
 * @extends Function
 */
function Group(){};
Group.prototype.fullName=''; 
Group.prototype.ID=''; 
Group.prototype.name=''; 
Group.prototype.filterChildren=function(){return [];};
Group.prototype.filterParents=function(){return [];};
Group.prototype.getParents=function(){return [];};
Group.prototype.getChildren=function(){return [];};
Group.prototype.getUsers=function(){return [];};
Group.prototype.filterUsers=function(){return [];};
Group.prototype.putInto=function(){};
Group.prototype.remove=function(){};
Group.prototype.removeFrom=function(){};

/**
 * @constructor
 * @extends Function
 */
function User(){};
User.prototype.ID=''; 
User.prototype.fullName=''; 
User.prototype.name=''; 
User.prototype.storage=new Storage(); 
User.prototype.filterParents=function(){return [];};
User.prototype.getParents=function(){return [];};
User.prototype.setPassword=function(){};
User.prototype.putInto=function(){};
User.prototype.remove=function(){};
User.prototype.removeFrom=function(){};

/**
 * @constructor
 * @extends Function
 */
function Worker(){};
Worker.prototype.onerror=function(){}; 
Worker.prototype.onmessage=function(){}; 
Worker.prototype.terminate=function(){};
Worker.prototype.postMessage=function(){};

/**
 * @constructor
 * @extends Function
 */
function SharedWorker(){};
SharedWorker.prototype.onconnect=function(){}; 
SharedWorker.prototype.MessagePort={}; 

/**
 * @constructor
 * @extends Function
 */
function HTTPResponse(){};
HTTPResponse.prototype.headers=new HTTPResponseHeader(); 
HTTPResponse.prototype.contentType=''; 
HTTPResponse.prototype.body=new Blob() || new Image() || ''; 
HTTPResponse.prototype.statusCode=0; 
HTTPResponse.prototype.sendChunkedData=function(){};
HTTPResponse.prototype.allowCache=function(){};
HTTPResponse.prototype.allowCompression=function(){};

/**
 * @constructor
 * @extends Function
 */
function HTTPResponseHeader(){};
HTTPResponseHeader.prototype.X_VERSION=''; 
HTTPResponseHeader.prototype.X_POWERED_BY=''; 
HTTPResponseHeader.prototype.X_STATUS=''; 
HTTPResponseHeader.prototype.WWW_AUTHENTICATE=''; 
HTTPResponseHeader.prototype.VARY=''; 
HTTPResponseHeader.prototype.SET_COOKIE=''; 
HTTPResponseHeader.prototype.RETRY_AFTER=''; 
HTTPResponseHeader.prototype.PROXY_AUTHENTICATE=''; 
HTTPResponseHeader.prototype.PRAGMA=''; 
HTTPResponseHeader.prototype.LOCATION=''; 
HTTPResponseHeader.prototype.LAST_MODIFIED=''; 
HTTPResponseHeader.prototype.EXPIRES=''; 
HTTPResponseHeader.prototype.CONTENT_TYPE=''; 
HTTPResponseHeader.prototype.CONTENT_RANGE=''; 
HTTPResponseHeader.prototype.CONTENT_MD5=''; 
HTTPResponseHeader.prototype.CONTENT_LOCATION=''; 
HTTPResponseHeader.prototype.CONTENT_LENGTH=''; 
HTTPResponseHeader.prototype.CONTENT_LANGUAGE=''; 
HTTPResponseHeader.prototype.CONTENT_ENCODING=''; 
HTTPResponseHeader.prototype.ETAG=''; 
HTTPResponseHeader.prototype.DATE=''; 
HTTPResponseHeader.prototype.CONNECTION=''; 
HTTPResponseHeader.prototype.CACHE_CONTROL=''; 
HTTPResponseHeader.prototype.ALLOW=''; 
HTTPResponseHeader.prototype.AGE=''; 
HTTPResponseHeader.prototype.ACCEPT_RANGES=''; 

/**
 * @constructor
 * @extends Function
 */
function HTTPRequestHeader(){};
HTTPRequestHeader.prototype.USER_AGENT=''; 
HTTPRequestHeader.prototype.TE=''; 
HTTPRequestHeader.prototype.REFERER=''; 
HTTPRequestHeader.prototype.RANGE=''; 
HTTPRequestHeader.prototype.PROXY_AUTHORIZATION=''; 
HTTPRequestHeader.prototype.PRAGMA=''; 
HTTPRequestHeader.prototype.MAX_FORWARDS=''; 
HTTPRequestHeader.prototype.KEEP_ALIVE=''; 
HTTPRequestHeader.prototype.IF_UNMODIFIED_SINCE=''; 
HTTPRequestHeader.prototype.IF_RANGE=''; 
HTTPRequestHeader.prototype.IF_NONE_MATCH=''; 
HTTPRequestHeader.prototype.IF_MODIFIED_SINCE=''; 
HTTPRequestHeader.prototype.IF_MATCH=''; 
HTTPRequestHeader.prototype.HOST=''; 
HTTPRequestHeader.prototype.FROM=''; 
HTTPRequestHeader.prototype.EXPECT=''; 
HTTPRequestHeader.prototype.COOKIE=''; 
HTTPRequestHeader.prototype.CONTENT_TYPE=''; 
HTTPRequestHeader.prototype.CONTENT_LENGTH=''; 
HTTPRequestHeader.prototype.CACHE_CONTROL=''; 
HTTPRequestHeader.prototype.AUTHORIZATION=''; 
HTTPRequestHeader.prototype.ACCEPT_LANGUAGE=''; 
HTTPRequestHeader.prototype.ACCEPT_ENCODING=''; 
HTTPRequestHeader.prototype.ACCEPT=''; 
HTTPRequestHeader.prototype.ACCEPT_CHARSET=''; 

/**
 * @constructor
 * @extends Function
 */
function HTTPRequest(){};
HTTPRequest.prototype.parts=new MIMEMessage(); 
HTTPRequest.prototype.contentType=''; 
HTTPRequest.prototype.headers=new HTTPRequestHeader(); 
HTTPRequest.prototype.body='' || new Image() || new Blob(); 
HTTPRequest.prototype.requestLine=''; 
HTTPRequest.prototype.password=''; 
HTTPRequest.prototype.user=''; 
HTTPRequest.prototype.version=''; 
HTTPRequest.prototype.method=''; 
HTTPRequest.prototype.host=''; 
HTTPRequest.prototype.urlQuery=''; 
HTTPRequest.prototype.url=''; 
HTTPRequest.prototype.rawURL=''; 
HTTPRequest.prototype.urlPath=''; 
HTTPRequest.prototype.isSSL=true; 
HTTPRequest.prototype.localPort=0; 
HTTPRequest.prototype.localAddress=''; 
HTTPRequest.prototype.remotePort=0; 
HTTPRequest.prototype.remoteAddress=''; 

/**
 * @constructor
 * @extends Function
 */
function EntityAttribute(){};
EntityAttribute.prototype.relatedDataClass=new DatastoreClass() || new Null(); 
EntityAttribute.prototype.dataClass=new DatastoreClass(); 
EntityAttribute.prototype.fullTextIndexed=true; 
EntityAttribute.prototype.indexed=true; 
EntityAttribute.prototype.indexType=''; 
EntityAttribute.prototype.type=''; 
EntityAttribute.prototype.kind=''; 
EntityAttribute.prototype.name=''; 
EntityAttribute.prototype.scope=''; 
EntityAttribute.prototype.toString=function(){return '';};
EntityAttribute.prototype.getName=function(){return '';};

/**
 * @constructor
 * @extends Function
 */
function Datastore(){};
Datastore.prototype.dataClasses=new DataClassEnumerator(); 
Datastore.prototype.getTempFolder=function(){return new Folder();};
Datastore.prototype.getName=function(){return '';};
Datastore.prototype.setName=function(){};
Datastore.prototype.getModelFolder=function(){return new Folder();};
Datastore.prototype.getDataFolder=function(){return new Folder();};
Datastore.prototype.flushCache=function(){};
Datastore.prototype.close=function(){return {};};
Datastore.prototype.fixForV4=function(){};
Datastore.prototype.rollBack=function(){};
Datastore.prototype.transactionLevel=function(){return 0;};
Datastore.prototype.startTransaction=function(){};
Datastore.prototype.commit=function(){};
Datastore.prototype.verify=function(){};
Datastore.prototype.backup=function(){return new File() || new Null();};

var ds = new Datastore();

/**
 * @constructor
 * @extends Function
 */
function Entity(){};
Entity.prototype.release=function(){};
Entity.prototype.refresh=function(){};
Entity.prototype.save=function(){};
Entity.prototype.toString=function(){return '';};
Entity.prototype.getDataClass=function(){return new DatastoreClass();};
Entity.prototype.getTimeStamp=function(){return new Date();};
Entity.prototype.remove=function(){};
Entity.prototype.isNew=function(){return true;};
Entity.prototype.isModified=function(){return true;};
Entity.prototype.isLoaded=function(){return true;};
Entity.prototype.valid=function(){return true;};
Entity.prototype.next=function(){return new Entity() || new Null();};
Entity.prototype.getModifiedAttributes=function(){return [];};
Entity.prototype.validate=function(){return true;};
Entity.prototype.getStamp=function(){return 0;};
Entity.prototype.getKey=function(){return 0 || '';};

/**
 * @constructor
 * @extends Function
 */
function EntityCollection(){};
EntityCollection.prototype.queryPath=''; 
EntityCollection.prototype.queryPlan=''; 
EntityCollection.prototype.length=0; 
EntityCollection.prototype.remove=function(){};
EntityCollection.prototype.toString=function(){return '';};
EntityCollection.prototype.distinctValues=function(){return [];};
EntityCollection.prototype.compute=function(){return {};};
EntityCollection.prototype.average=function(){return 0;};
EntityCollection.prototype.max=function(){return 0;};
EntityCollection.prototype.min=function(){return 0;};
EntityCollection.prototype.query=function(){return new EntityCollection();};
EntityCollection.prototype.find=function(){return new Entity();};
EntityCollection.prototype.toArray=function(){return [];};
EntityCollection.prototype.sum=function(){return 0;};
EntityCollection.prototype.forEach=function(){};
EntityCollection.prototype.getDataClass=function(){return new DatastoreClass();};
EntityCollection.prototype.add=function(){};
EntityCollection.prototype.orderBy=function(){return new EntityCollection();};
EntityCollection.prototype.count=function(){return 0;};
EntityCollection.prototype.first=function(){return new Entity();};
EntityCollection.prototype.or=function(){return new EntityCollection();};
EntityCollection.prototype.and=function(){return new EntityCollection();};
EntityCollection.prototype.minus=function(){return new EntityCollection();};

/**
 * @constructor
 * @extends Function
 */
function dataClass(){};
dataClass.prototype.attributes=new AttributeEnumerator(); 
dataClass.prototype.length=0; 
dataClass.prototype.createEntityCollection=function(keepSorted){return new EntityCollection();};
dataClass.prototype.remove=function(){};
dataClass.prototype.toString=function(){return '';};
dataClass.prototype.distinctValues=function(){return [];};
dataClass.prototype.compute=function(){return {};};
dataClass.prototype.average=function(){return 0;};
dataClass.prototype.max=function(){return 0;};
dataClass.prototype.min=function(){return 0;};
dataClass.prototype.forEach=function(){};
dataClass.prototype.orderBy=function(){return new EntityCollection();};
dataClass.prototype.count=function(){return 0;};
dataClass.prototype.first=function(){return new Entity();};
dataClass.prototype.sum=function(){return 0;};
dataClass.prototype.toArray=function(){return [];};
dataClass.prototype.setAutoSequenceNumber=function(counter){};
dataClass.prototype.fromArray=function(){return new EntityCollection();};
dataClass.prototype.createEntity=function(){return new Entity();};
dataClass.prototype.find=function(){return new Entity();};
dataClass.prototype.query=function(){return new EntityCollection();};
dataClass.prototype.all=function(){return new EntityCollection();};
dataClass.prototype.getName=function(){return '';};
dataClass.prototype.getScope=function(){return '';};
dataClass.prototype.getFragmentation=function(){return 0;};

/**
 * @constructor
 * @extends Function
 */
function SocketSync(){};
SocketSync.prototype.write=function(){return true;};
SocketSync.prototype.read=function(){return new Buffer() || new Null();};
SocketSync.prototype.connect=function(){};
SocketSync.prototype.setEncoding=function(){};
SocketSync.prototype.end=function(){};
SocketSync.prototype.destroy=function(){};
SocketSync.prototype.setNoDelay=function(){};
SocketSync.prototype.address=function(){return {};};

/**
 * @constructor
 * @extends Function
 */
function Socket(){};
Socket.prototype.bufferSize=0; 
Socket.prototype.remoteAddress=''; 
Socket.prototype.remotePort=0; 
Socket.prototype.setEncoding=function(){};
Socket.prototype.end=function(){};
Socket.prototype.address=function(){return {};};
Socket.prototype.setNoDelay=function(){};
Socket.prototype.write=function(){return true;};
Socket.prototype.resume=function(){};
Socket.prototype.pause=function(){};
Socket.prototype.connect=function(){};
Socket.prototype.destroy=function(){};

/**
 * @constructor
 * @extends Function
 */
function ServerSync(){};
ServerSync.prototype.accept=function(){return new SocketSync();};
ServerSync.prototype.address=function(){return {};};
ServerSync.prototype.close=function(){};
ServerSync.prototype.listen=function(){};

/**
 * @constructor
 * @extends Function
 */
function Server(){};
Server.prototype.listen=function(){};
Server.prototype.close=function(){};
Server.prototype.address=function(){return {};};

/**
 * @constructor
 * @extends Function
 */
function POP3(){};
POP3.prototype.createClient=function(){return new POP3();};
POP3.prototype.pop3.getAllMailAndDelete=function(){return true;};
POP3.prototype.pop3.getAllMail=function(){return true;};
POP3.prototype.quit=function(){};
POP3.prototype.clearDeletionMarks=function(){};
POP3.prototype.retrieveMessage=function(){};
POP3.prototype.getAllMessageSizes=function(){};
POP3.prototype.getMessageSize=function(){};
POP3.prototype.getStatus=function(){};
POP3.prototype.connect=function(){};
POP3.prototype.pop3.POP3=function(){};
POP3.prototype.markForDeletion=function(){};
POP3.prototype.authenticate=function(){};

/**
 * @constructor
 * @extends Function
 */
function SMTP(){};
SMTP.prototype.smtp.createClient=function(){return new SMTP();};
SMTP.prototype.smtp.send=function(){return true;};
SMTP.prototype.quit=function(){};
SMTP.prototype.send=function(){};
SMTP.prototype.starttls=function(){};
SMTP.prototype.authenticate=function(){};
SMTP.prototype.smtp.SMTP=function(){};
SMTP.prototype.connect=function(){};
SMTP.prototype.mail.createMessage=function(){return new Mail();};

/**
 * @constructor
 * @extends Function
 */
function Mail(){};
Mail.prototype.Subject=''; 
Mail.prototype.From=''; 
Mail.prototype.To='' || []; 
Mail.prototype.mail.send=function(){return true;};
Mail.prototype.parse=function(){};
Mail.prototype.send=function(){};
Mail.prototype.getContent=function(){return [];};
Mail.prototype.setContent=function(){return true;};
Mail.prototype.getBody=function(){return [];};
Mail.prototype.setBody=function(){};
Mail.prototype.removeField=function(){};
Mail.prototype.addField=function(){};
Mail.prototype.mail.Mail=function(){};
Mail.prototype.getField=function(){return '' || [];};
Mail.prototype.getHeader=function(){return [];};

/**
 * @constructor
 * @extends Function
 */
function EventEmitter(){};
EventEmitter.prototype.listeners=function(){return [];};
EventEmitter.prototype.setMaxListeners=function(){};
EventEmitter.prototype.emit=function(){};
EventEmitter.prototype.once=function(){};
EventEmitter.prototype.removeAllListeners=function(){};
EventEmitter.prototype.on=function(){};
EventEmitter.prototype.addListener=function(){};
EventEmitter.prototype.removeListener=function(){};

/**
 * @constructor
 * @extends Function
 */
function Services(){};
Services.prototype.getModulePath=function(){return '';};

/**
 * @constructor
 * @extends Function
 */
function HttpServer(){};
HttpServer.prototype.started=true; 
HttpServer.prototype.ssl=new HttpServerSSL(); 
HttpServer.prototype.port=0; 
HttpServer.prototype.ipAddress=''; 
HttpServer.prototype.hostName=''; 
HttpServer.prototype.defaultCharSet=''; 
HttpServer.prototype.cache=new HttpServerCache(); 
HttpServer.prototype.stop=function(){};
HttpServer.prototype.start=function(){};
HttpServer.prototype.restart=function(){};

/**
 * @constructor
 * @extends Function
 */
function HttpServerSSL(){};
HttpServerSSL.prototype.enabled=true; 
HttpServerSSL.prototype.port=0; 
HttpServerSSL.prototype.getCertificatePath=function(){return '';};

/**
 * @constructor
 * @extends Function
 */
function HttpServerCache(){};
HttpServerCache.prototype.enabled=true; 
HttpServerCache.prototype.memorySize=0; 

/**
 * @constructor
 * @extends Function
 */
function Attribute(){};
Attribute.prototype.onSort=function(){};
Attribute.prototype.onQuery=function(){};
Attribute.prototype.onSet=function(){};
Attribute.prototype.onGet=function(){};
Attribute.prototype.addEventListener=function(){};

/**
 * @constructor
 * @extends Function
 */
function DatastoreClass(){};
DatastoreClass.prototype.attributeName=new DatastoreClassAttribute(); 
DatastoreClass.prototype.addRelatedEntities=function(){};
DatastoreClass.prototype.addRelatedEntity=function(){};
DatastoreClass.prototype.addMethod=function(){};
DatastoreClass.prototype.addEventListener=function(){};
DatastoreClass.prototype.addAttribute=function(){return new DatastoreClassAttribute();};
DatastoreClass.prototype.setRestrictingQuery=function(){};
DatastoreClass.prototype.setProperties=function(){};

/**
 * @constructor
 * @extends Function
 */
function DataStoreCatalog(){};
DataStoreCatalog.prototype.className=new DatastoreClass(); 
DataStoreCatalog.prototype.addOutsideCatalog=function(){};
DataStoreCatalog.prototype.addClass=function(){return new DatastoreClass();};

/**
 * @constructor
 * @extends Function
 */
function Mutex(){};
Mutex.prototype.tryToLock=function(){return true;};
Mutex.prototype.unlock=function(){return true;};
Mutex.prototype.lock=function(){return true;};

/**
 * @constructor
 * @extends Function
 */
function MIMEMessagePart(){};
MIMEMessagePart.prototype.asBlob=new Blob(); 
MIMEMessagePart.prototype.asPicture=new Image() || new Undefined(); 
MIMEMessagePart.prototype.asText='' || new Undefined(); 
MIMEMessagePart.prototype.size=0; 
MIMEMessagePart.prototype.mediaType=''; 
MIMEMessagePart.prototype.fileName=''; 
MIMEMessagePart.prototype.name=''; 
MIMEMessagePart.prototype.save=function(){};

/**
 * @constructor
 * @extends Function
 */
function MIMEMessage(){};
MIMEMessage.prototype.encoding=''; 
MIMEMessage.prototype.count=0; 
MIMEMessage.prototype.boundary=''; 
MIMEMessage.prototype.length=0; 
MIMEMessage.prototype.toBuffer=function(){};
MIMEMessage.prototype.toBlob=function(){return new Blob();};

/**
 * @constructor
 * @extends Function
 */
function MIMEWriter(){};
MIMEWriter.prototype.addPart=function(){};
MIMEWriter.prototype.getMIMEMessage=function(){return new MIMEMessage();};
MIMEWriter.prototype.getMIMEBoundary=function(){return '';};

/**
 * @constructor
 * @extends Function
 */
function Solution(){};
Solution.prototype.recentlyOpened=[]; 
Solution.prototype.name=''; 
Solution.prototype.applications=[]; 
Solution.prototype.quitServer=function(){};
Solution.prototype.openRecent=function(){};
Solution.prototype.open=function(){};
Solution.prototype.getWalibFolder=function(){return '' || new Folder();};
Solution.prototype.getSettingFile=function(){};
Solution.prototype.getFolder=function(){return '' || new Folder();};
Solution.prototype.getApplicationByName=function(){return {};};
Solution.prototype.close=function(){};
Solution.prototype.getDebuggerPort=function(){return 0;};
Solution.prototype.getItemsWithRole=function(){return new File();};
