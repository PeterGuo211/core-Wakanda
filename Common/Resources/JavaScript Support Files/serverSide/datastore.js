/**
 *
 * How to create and use the server-side datastore class events.
 *
 * @class Datastore
 * @extends Object
 *
 */
EntityAttribute = function EntityAttribute() {
    
    
    /**
     * 
     *
     * @property relatedDataClass
     * @attributes 
     * @type DatastoreClass | Null
     */
    this.relatedDataClass =  new DatastoreClass( ) || new Null( ); 
    
    /**
     * 
     *
     * @property dataClass
     * @attributes 
     * @type DatastoreClass
     */
    this.dataClass =  new DatastoreClass( ); 
    
    /**
     * 
     *
     * @property fullTextIndexed
     * @attributes 
     * @type Boolean
     */
    this.fullTextIndexed =  true; 
    
    /**
     * 
     *
     * @property indexed
     * @attributes 
     * @type Boolean
     */
    this.indexed =  true; 
    
    /**
     * 
     *
     * @property indexType
     * @attributes 
     * @type String
     */
    this.indexType =  ''; 
    
    /**
     * 
     *
     * @property type
     * @attributes 
     * @type String
     */
    this.type =  ''; 
    
    /**
     * 
     *
     * @property kind
     * @attributes 
     * @type String
     */
    this.kind =  ''; 
    
    /**
     * returns the name of the EntityAttribute object as a string
     *
     * @property name
     * @attributes 
     * @type String
     */
    this.name =  ''; 
    
    /**
     * returns the current scope property value of the attribute
     *
     * @property scope
     * @attributes 
     * @type String
     */
    this.scope =  ''; 
    
    
    /**
     * returns the name of the EntityAttribute object as a string
     *
     * @method toString
     * @return {String}
     */
    this.toString = function toString() {        return '';     };
    
    /**
     * returns the name of the EntityAttribute object as a string
     *
     * @method getName
     * @return {String}
     */
    this.getName = function getName() {        return '';     };
    

};


Datastore = function Datastore() {
    var className;
    
    /**
     * 
     *
     * @property dataClasses
     * @attributes ReadOnly
     * @type DataClassEnumerator
     */
    this.dataClasses =  new DataClassEnumerator( ); 
    
    
    /**
     * returns a Folder type reference to the datastore &quot;temporary files&quot; folder
     *
     * @method getTempFolder
     * @return {Folder}
     */
    this.getTempFolder = function getTempFolder() {        return new Folder( );     };
    
    /**
     * returns the name of the current datastore
     *
     * @method getName
     * @return {String}
     */
    this.getName = function getName() {        return '';     };
    
    /**
     * imports all the entities stored in JSON format from the file(s) located in the importFolder folder
     *
     * @method importFromJSON
     * @param {Folder} importFolder
     */
    this.importFromJSON = function importFromJSON(importFolder) {             };
    
    /**
     * replaces the name of the current datastore with the one you pass in name
     *
     * @method setName
     * @param {String} name
     */
    this.setName = function setName(name) {             };
    
    /**
     * returns a reference, Folder, to the folder containing the datastore model file
     *
     * @method getModelFolder
     * @return {Folder}
     */
    this.getModelFolder = function getModelFolder() {        return new Folder( );     };
    
    /**
     * returns a reference, Folder, to the folder containing the datastore data file
     *
     * @method getDataFolder
     * @return {Folder}
     */
    this.getDataFolder = function getDataFolder() {        return new Folder( );     };
    
    /**
     * exports all the entities stored the object for which it is called in SQL format
     *
     * @method exportAsSQL
     * @param {Folder} exportFolder
     * @param {Number} numFiles
     * @param {Number} fileLimitSize
     * @param {Number} attLimitSize
     */
    this.exportAsSQL = function exportAsSQL(exportFolder, numFiles, fileLimitSize, attLimitSize) {             };
    
    /**
     * flushes the data cache to disk
     *
     * @method flushCache
     */
    this.flushCache = function flushCache() {             };
    
    /**
     * close a datastore file previously opened with the open4DBase( ) or openDataStore( ) method
     *
     * @method close
     * @param {String} syncEventName
     * @return {Object}
     */
    this.close = function close(syncEventName) {        return {};     };
    
    /**
     * looks for any &quot;ghost&quot; tables in the data file of your application and adds the corresponding datastore classes to the loaded model
     *
     * @method revealGhostTables
     */
    this.revealGhostTables = function revealGhostTables() {             };
    
    /**
     * exports all the entities stored in the object for which it is called in JSON format
     *
     * @method exportAsJSON
     * @param {Folder} exportFolder
     * @param {Number} numFiles
     * @param {Number} fileLimitSize
     * @param {Number} attLimitSize
     */
    this.exportAsJSON = function exportAsJSON(exportFolder, numFiles, fileLimitSize, attLimitSize) {             };
    
    /**
     * increase dynamically the datastore cache size
     *
     * @method setCacheSize
     * @param {Number} newSize
     */
    this.setCacheSize = function setCacheSize(newSize) {             };
    
    /**
     * returns the size of memory used by the datastore cache (in bytes)
     *
     * @method getCacheSize
     * @return {Number}
     */
    this.getCacheSize = function getCacheSize() {        return 0;     };
    
    /**
     * cancels the transaction opened by the startTransaction() method at the corresponding level in the current context
     *
     * @method rollBack
     */
    this.rollBack = function rollBack() {             };
    
    /**
     * returns the level of the current transaction for the context
     *
     * @method transactionLevel
     * @return {Number}
     */
    this.transactionLevel = function transactionLevel() {        return 0;     };
    
    /**
     * starts a  transaction in the current context
     *
     * @method startTransaction
     */
    this.startTransaction = function startTransaction() {             };
    
    /**
     * accepts the transaction opened by the startTransaction() method  at the corresponding level in the current context
     *
     * @method commit
     */
    this.commit = function commit() {             };
    
    /**
     * carries out a structural check of the objects contained in the Datastore to which it is applied
     *
     * @method verify
     * @param {Object} options
     */
    this.verify = function verify(options) {             };
    
    /**
     * starts the backup of the current datastore of your application
     *
     * @method backup
     * @param {Object} settings
     * @param {Object} options
     * @return {File | Null}
     */
    this.backup = function backup(settings, options) {        return new File( ) || new Null( );     };
    

};
//ds = new Datastore();

Entity = function Entity() {
    
    
    
    /**
     * releases the entity from memory
     *
     * @method release
     */
    this.release = function release() {             };
    
    /**
     * reloads the entity as it is stored in the datastore
     *
     * @method refresh
     */
    this.refresh = function refresh() {             };
    
    /**
     * saves the changes made to the entity in the datastore
     *
     * @method save
     */
    this.save = function save() {             };
    
    /**
     * returns a string representation of the entity or entity collection
     *
     * @method toString
     * @return {String}
     */
    this.toString = function toString() {        return '';     };
    
    /**
     * returns the datastore class (object of the DatastoreClass type)  of the entity
     *
     * @method getDataClass
     * @return {DatastoreClass}
     */
    this.getDataClass = function getDataClass() {        return new DatastoreClass( );     };
    
    /**
     * returns the timestamp of the last save of the entity to which it is applied
     *
     * @method getTimeStamp
     * @return {Date}
     */
    this.getTimeStamp = function getTimeStamp() {        return new Date( );     };
    
    /**
     * removes the entity from the datastore
     *
     * @method remove
     */
    this.remove = function remove() {             };
    
    /**
     * returns True or False depending on whether the entity to which it is applied has just been created in the datastore
     *
     * @method isNew
     * @return {Boolean}
     */
    this.isNew = function isNew() {        return true;     };
    
    /**
     * returns True or False depending on whether the entity to which it is applied has been  modified since the last time it was loaded from the datastore
     *
     * @method isModified
     * @return {Boolean}
     */
    this.isModified = function isModified() {        return true;     };
    
    /**
     * returns True or False depending on whether the entity iterator points to an entity that is currently loaded in memory
     *
     * @method isLoaded
     * @return {Boolean}
     */
    this.isLoaded = function isLoaded() {        return true;     };
    
    /**
     * checks the validity of the pointer to the current entity within an iteration of entities
     *
     * @method valid
     * @return {Boolean}
     */
    this.valid = function valid() {        return true;     };
    
    /**
     * puts the entity pointer on the next entity within an iteration of entities
     *
     * @method next
     * @return {Entity | Null}
     */
    this.next = function next() {        return new Entity( ) || new Null( );     };
    
    /**
     * returns an array containing the names of attributes that have been modified in the entity
     *
     * @method getModifiedAttributes
     * @return {Array}
     */
    this.getModifiedAttributes = function getModifiedAttributes() {        return [];     };
    
    /**
     * passes the entity through the validation process
     *
     * @method validate
     * @return {Boolean}
     */
    this.validate = function validate() {        return true;     };
    
    /**
     * returns the current value of the internal stamp of the entity to which it is applied
     *
     * @method getStamp
     * @return {Number}
     */
    this.getStamp = function getStamp() {        return 0;     };
    
    /**
     * returns the primary key value of the entity to which it is applied
     *
     * @method getKey
     * @return {Number | String}
     */
    this.getKey = function getKey() {        return 0 || '';     };
    

};


EntityCollection = function EntityCollection() {
    
    
    /**
     * 
     *
     * @property queryPath
     * @attributes ReadOnly
     * @type String
     */
    this.queryPath =  ''; 
    
    /**
     * 
     *
     * @property queryPlan
     * @attributes ReadOnly
     * @type String
     */
    this.queryPlan =  ''; 
    
    /**
     * 
     *
     * @property length
     * @attributes ReadOnly
     * @type Number
     */
    this.length =  0; 
    
    
    /**
     * permanently removes entities from the datastore
     *
     * @method remove
     */
    this.remove = function remove() {             };
    
    /**
     * returns a string representation of the entity or entity collection
     *
     * @method toString
     * @return {String}
     */
    this.toString = function toString() {        return '';     };
    
    /**
     * creates an array and returns in it all the distinct values stored in attribute for the entity collection or datastore class
     *
     * @method distinctValues
     * @param {DatastoreClassAttribute | String} attribute
     * @return {Array}
     */
    this.distinctValues = function distinctValues(attribute) {        return [];     };
    
    /**
     * performs, in a single call, all the statistical calculations on the attribute or list of attributes passed as the parameter for the datastore class or entity collection
     *
     * @method compute
     * @param {DatastoreClassAttribute | String} attribute
     * @param {Boolean | String} distinct
     * @return {Object}
     */
    this.compute = function compute(attribute, distinct) {        return {};     };
    
    /**
     * returns the arithmetic average of all the non-null values of attribute for the datastore class or entity collection
     *
     * @method average
     * @param {DatastoreClassAttribute | String} attribute
     * @param {Boolean | String} distinct
     * @return {Number}
     */
    this.average = function average(attribute, distinct) {        return 0;     };
    
    /**
     * returns the maximum value among all the values of attribute in the entity collection or datastore class
     *
     * @method max
     * @param {DatastoreClassAttribute | String} attribute
     * @return {Number}
     */
    this.max = function max(attribute) {        return 0;     };
    
    /**
     * returns the lowest (or minimum) value among all the values of attribute in the entity collection or datastore class
     *
     * @method min
     * @param {DatastoreClassAttribute | String} attribute
     * @return {Number}
     */
    this.min = function min(attribute) {        return 0;     };
    
    /**
     * searches all the entities in the datastore class or entity collection using the search criteria specified in queryString and returns a new collection containing the entities found
     *
     * @method query
     * @param {String} queryString
     * @param {Mixed} value
     * @param {Object} options
     * @return {EntityCollection}
     */
    this.query = function query(queryString, value, options) {        return new EntityCollection( );     };
    
    /**
     * applies the search criteria specified in queryString and (optionally) value to all the entities of the DatastoreClass or EntityCollection and returns the first entity found in an object of type Entity
     *
     * @method find
     * @param {String} queryString
     * @param {Mixed} value
     * @param {Object} options
     * @return {Entity}
     */
    this.find = function find(queryString, value, options) {        return new Entity( );     };
    
    /**
     * creates and returns a JavaScript array where each element is an object containing a set of properties and values corresponding to the attribute names and values for a datastore class or an entity collection
     *
     * @method toArray
     * @param {String | DatastoreClassAttribute} attributeList
     * @param {String} sortList
     * @param {String | Boolean} key
     * @param {Number} skip
     * @param {Number} top
     * @return {Array}
     */
    this.toArray = function toArray(attributeList, sortList, key, skip, top) {        return [];     };
    
    /**
     * returns the sum (i.e., total of all the values) of attribute for the datastore class or entity collection
     *
     * @method sum
     * @param {DatastoreClassAttribute | String} attribute
     * @param {Boolean | String} distinct
     * @return {Number}
     */
    this.sum = function sum(attribute, distinct) {        return 0;     };
    
    /**
     * executes the callbackFn function on each entity in the entity collection in ascending order
     *
     * @method forEach
     * @param {Function} callbackFn
     */
    this.forEach = function forEach(callbackFn) {             };
    
    /**
     * returns the datastore class (object of the&amp;nbsp;DatastoreClass type) of the entity collection
     *
     * @method getDataClass
     * @return {DatastoreClass}
     */
    this.getDataClass = function getDataClass() {        return new DatastoreClass( );     };
    
    /**
     * adds the entity or entity collection passed in the toAdd parameter to the entity collection
     *
     * @method add
     * @param {EntityCollection | Entity} toAdd
     * @param {String | Boolean} atTheEnd
     */
    this.add = function add(toAdd, atTheEnd) {             };
    
    /**
     * sorts the entities in the entity collection or datastore class and returns a new sorted entity collection
     *
     * @method orderBy
     * @param {String | DatastoreClassAttribute} attributeList
     * @param {String} sortOrder
     * @return {EntityCollection}
     */
    this.orderBy = function orderBy(attributeList, sortOrder) {        return new EntityCollection( );     };
    
    /**
     * returns the number of entities contained in the entity collection or datastore class
     *
     * @method count
     * @param {DatastoreClassAttribute | String} attribute
     * @param {Boolean | String} distinct
     * @return {Number}
     */
    this.count = function count(attribute, distinct) {        return 0;     };
    
    /**
     * returns the entity in the first position of the entity collection or datastore class
     *
     * @method first
     * @return {Entity}
     */
    this.first = function first() {        return new Entity( );     };
    
    /**
     * creates a new entity collection that contains all the entities from the entity collection to which it is applied and all the entities from the collection2 entity collection
     *
     * @method or
     * @param {EntityCollection} collection2
     * @return {EntityCollection}
     */
    this.or = function or(collection2) {        return new EntityCollection( );     };
    
    /**
     * compares the entity collection to  which it is applied and the collection2 and returns a new entity collection that contains only the entities that are referenced in both collections
     *
     * @method and
     * @param {EntityCollection} collection2
     * @return {EntityCollection}
     */
    this.and = function and(collection2) {        return new EntityCollection( );     };
    
    /**
     * exports all the entities stored in the object for which it is called in JSON format
     *
     * @method exportAsJSON
     * @param {Folder} exportFolder
     * @param {Number} numFiles
     * @param {Number} fileLimitSize
     * @param {Number} attLimitSize
     */
    this.exportAsJSON = function exportAsJSON(exportFolder, numFiles, fileLimitSize, attLimitSize) {             };
    
    /**
     * exports all the entities stored the object for which it is called in SQL format
     *
     * @method exportAsSQL
     * @param {Folder} exportFolder
     * @param {Number} numFiles
     * @param {Number} fileLimitSize
     * @param {Number} attLimitSize
     */
    this.exportAsSQL = function exportAsSQL(exportFolder, numFiles, fileLimitSize, attLimitSize) {             };
    
    /**
     * excludes from the entity collection to  which it is applied the entities that are in the collection2 and returns the resulting entity collection
     *
     * @method minus
     * @param {EntityCollection} collection2
     * @return {EntityCollection}
     */
    this.minus = function minus(collection2) {        return new EntityCollection( );     };
    

};


dataClass = function dataClass() {
    
    
    /**
     * 
     *
     * @property attributes
     * @attributes 
     * @type AttributeEnumerator
     */
    this.attributes =  new AttributeEnumerator( ); 
    
    /**
     * 
     *
     * @property length
     * @attributes ReadOnly
     * @type Number
     */
    this.length =  0; 
    
    
    /**
     * creates a new blank object of type EntityCollection attached to the datastore class to which it is applied
     *
     * @method createEntityCollection
     * @param {String | Boolean} keepSorted
     * @return {EntityCollection}
     */
    this.createEntityCollection = function createEntityCollection(keepSorted) {        return new EntityCollection( );     };
    
    /**
     * imports all the entities stored in JSON format from the file(s) located in the importFolder folder
     *
     * @method importFromJSON
     * @param {Folder} importFolder
     */
    this.importFromJSON = function importFromJSON(importFolder) {             };
    
    /**
     * permanently removes entities from the datastore
     *
     * @method remove
     */
    this.remove = function remove() {             };
    
    /**
     * returns the name of the datastore class as a string
     *
     * @method toString
     * @return {String}
     */
    this.toString = function toString() {        return '';     };
    
    /**
     * creates an array and returns in it all the distinct values stored in attribute for the entity collection or datastore class
     *
     * @method distinctValues
     * @param {DatastoreClassAttribute | String} attribute
     * @return {Array}
     */
    this.distinctValues = function distinctValues(attribute) {        return [];     };
    
    /**
     * performs, in a single call, all the statistical calculations on the attribute or list of attributes passed as the parameter for the datastore class or entity collection
     *
     * @method compute
     * @param {DatastoreClassAttribute | String} attribute
     * @param {Boolean | String} distinct
     * @return {Object}
     */
    this.compute = function compute(attribute, distinct) {        return {};     };
    
    /**
     * returns the arithmetic average of all the non-null values of attribute for the datastore class or entity collection
     *
     * @method average
     * @param {DatastoreClassAttribute | String} attribute
     * @param {Boolean | String} distinct
     * @return {Number}
     */
    this.average = function average(attribute, distinct) {        return 0;     };
    
    /**
     * returns the maximum value among all the values of attribute in the entity collection or datastore class
     *
     * @method max
     * @param {DatastoreClassAttribute | String} attribute
     * @return {Number}
     */
    this.max = function max(attribute) {        return 0;     };
    
    /**
     * returns the lowest (or minimum) value among all the values of attribute in the entity collection or datastore class
     *
     * @method min
     * @param {DatastoreClassAttribute | String} attribute
     * @return {Number}
     */
    this.min = function min(attribute) {        return 0;     };
    
    /**
     * executes the callbackFn function on each entity in the entity collection in ascending order
     *
     * @method forEach
     * @param {Function} callbackFn
     */
    this.forEach = function forEach(callbackFn) {             };
    
    /**
     * sorts the entities in the entity collection or datastore class and returns a new sorted entity collection
     *
     * @method orderBy
     * @param {String | DatastoreClassAttribute} attributeList
     * @param {String} sortOrder
     * @return {EntityCollection}
     */
    this.orderBy = function orderBy(attributeList, sortOrder) {        return new EntityCollection( );     };
    
    /**
     * returns the number of entities contained in the entity collection or datastore class
     *
     * @method count
     * @param {DatastoreClassAttribute | String} attribute
     * @param {Boolean | String} distinct
     * @return {Number}
     */
    this.count = function count(attribute, distinct) {        return 0;     };
    
    /**
     * returns the entity in the first position of the entity collection or datastore class
     *
     * @method first
     * @return {Entity}
     */
    this.first = function first() {        return new Entity( );     };
    
    /**
     * returns the sum (i.e., total of all the values) of attribute for the datastore class or entity collection
     *
     * @method sum
     * @param {DatastoreClassAttribute | String} attribute
     * @param {Boolean | String} distinct
     * @return {Number}
     */
    this.sum = function sum(attribute, distinct) {        return 0;     };
    
    /**
     * creates and returns a JavaScript array where each element is an object containing a set of properties and values corresponding to the attribute names and values for a datastore class or an entity collection
     *
     * @method toArray
     * @param {String | DatastoreClassAttribute} attributeList
     * @param {String} sortList
     * @param {String | Boolean} key
     * @param {Number} skip
     * @param {Number} top
     * @return {Array}
     */
    this.toArray = function toArray(attributeList, sortList, key, skip, top) {        return [];     };
    
    /**
     * (re)sets the start value for the autosequence number of the datastore class
     *
     * @method setAutoSequenceNumber
     * @param {Number} counter
     */
    this.setAutoSequenceNumber = function setAutoSequenceNumber(counter) {             };
    
    /**
     * generates entities in the datastore class where it is applied and returns the resulting entity collection
     *
     * @method fromArray
     * @param {Array} arrayValues
     * @return {EntityCollection}
     */
    this.fromArray = function fromArray(arrayValues) {        return new EntityCollection( );     };
    
    /**
     * creates a new blank object of type Entity based on the datastore class to which it is applied
     *
     * @method createEntity
     * @return {Entity}
     */
    this.createEntity = function createEntity() {        return new Entity( );     };
    
    /**
     * applies the search criteria specified in queryString and (optionally) value to all the entities of the DatastoreClass or EntityCollection and returns the first entity found in an object of type Entity
     *
     * @method find
     * @param {String} queryString
     * @param {Mixed} value
     * @param {Object} options
     * @return {Entity}
     */
    this.find = function find(queryString, value, options) {        return new Entity( );     };
    
    /**
     * searches all the entities in the datastore class or entity collection using the search criteria specified in queryString and returns a new collection containing the entities found
     *
     * @method query
     * @param {String} queryString
     * @param {Mixed} value
     * @param {Object} options
     * @return {EntityCollection}
     */
    this.query = function query(queryString, value, options) {        return new EntityCollection( );     };
    
    /**
     * returns an object of type EntityCollection containing all the entities in the datastore class to which it was applied
     *
     * @method all
     * @return {EntityCollection}
     */
    this.all = function all() {        return new EntityCollection( );     };
    
    /**
     * returns the name of the datastore class to which it is applied in a string
     *
     * @method getName
     * @return {String}
     */
    this.getName = function getName() {        return '';     };
    
    /**
     * exports all the entities stored in the object for which it is called in JSON format
     *
     * @method exportAsJSON
     * @param {Folder} exportFolder
     * @param {Number} numFiles
     * @param {Number} fileLimitSize
     * @param {Number} attLimitSize
     */
    this.exportAsJSON = function exportAsJSON(exportFolder, numFiles, fileLimitSize, attLimitSize) {             };
    
    /**
     * exports all the entities stored the object for which it is called in SQL format
     *
     * @method exportAsSQL
     * @param {Folder} exportFolder
     * @param {Number} numFiles
     * @param {Number} fileLimitSize
     * @param {Number} attLimitSize
     */
    this.exportAsSQL = function exportAsSQL(exportFolder, numFiles, fileLimitSize, attLimitSize) {             };
    
    /**
     * returns the current scope property value of the datastore class
     *
     * @method getScope
     * @return {String}
     */
    this.getScope = function getScope() {        return '';     };
    
    /**
     * returns the percentage of logical fragmentation for the entities of the datastore class
     *
     * @method getFragmentation
     * @return {Number}
     */
    this.getFragmentation = function getFragmentation() {        return 0;     };
    

};

