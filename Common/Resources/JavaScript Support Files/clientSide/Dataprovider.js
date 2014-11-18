/**
 *
 * Updated September 28, 2011 - Low-level client-side JavaScript API to manage the exchange of data between the browser, widgets, and Wakanda Server.
 *
 * @class Dataprovider
 * @extends Object
 *
 */
WAF.EntityAttributeSimple = function WAF_EntityAttributeSimple() {
    
    
    
    /**
     * returns True or False according to whether or not the entity or attribute has been modified
     *
     * @method isTouched
     * @return {Boolean}
     */
    this.isTouched = function isTouched() {        return true;     };
    
    /**
     * indicates that the entity or one of its attributes must be saved during the next save
     *
     * @method touch
     */
    this.touch = function touch() {             };
    
    /**
     * modifies the entity&#39;s attribute value
     *
     * @method setValue
     * @param {Mixed} value
     */
    this.setValue = function setValue(value) {             };
    
    /**
     * gets the value of the entity&#39;s attribute
     *
     * @method getValue
     * @param {Object} options
     * @return {Mixed}
     */
    this.getValue = function getValue(options) {        return 0 || '' || true || {} || null;     };
    

};


WAF.EntityAttributeRelated = function WAF_EntityAttributeRelated() {
    
    
    
    /**
     * returns the datastore class of the specified relation attribute
     *
     * @method getRelatedClass
     * @return {DatastoreClass}
     */
    this.getRelatedClass = function getRelatedClass() {        return new DatastoreClass( );     };
    
    /**
     * modifies the entity&#39;s attribute value
     *
     * @method setValue
     * @param {Mixed} value
     */
    this.setValue = function setValue(value) {             };
    
    /**
     * gets the value of the entity&#39;s attribute
     *
     * @method getValue
     * @param {Object} options
     * @return {Mixed}
     */
    this.getValue = function getValue(options) {        return 0 || '' || true || {} || null;     };
    

};


WAF.EntityAttributeRelatedSet = function WAF_EntityAttributeRelatedSet() {
    
    
    /**
     * returns the collection of related entities from the related datastore class
     *
     * @property relEntityCollection
     * @attributes 
     * @type EntityCollection
     */
    this.relEntityCollection =  new EntityCollection( ); 
    
    
    /**
     * modifies the entity&#39;s attribute value
     *
     * @method setValue
     * @param {Mixed} value
     */
    this.setValue = function setValue(value) {             };
    
    /**
     * gets the value of the entity&#39;s attribute
     *
     * @method getValue
     * @param {Object} options
     * @return {Mixed}
     */
    this.getValue = function getValue(options) {        return 0 || '' || true || {} || null;     };
    

};


WAF.EntityCollection = function WAF_EntityCollection() {
    
    
    /**
     * 
     *
     * @property length
     * @attributes ReadOnly
     * @type Number
     */
    this.length =  0; 
    
    
    /**
     * returns the internal reference of the entity collection on the server
     *
     * @method getReference
     * @return {Object}
     */
    this.getReference = function getReference() {        return {};     };
    
    /**
     * retrieves an array containing all the distinct values stored in attribute for the entity collection or datastore class
     *
     * @method distinctValues
     * @param {DatastoreClassAttribute | String} attribute
     * @param {Object} options
     */
    this.distinctValues = function distinctValues(attribute, options) {             };
    
    /**
     * adds an object of type Entity passed as a parameter to the end of the entity collection
     *
     * @method add
     * @param {Entity} entity
     */
    this.add = function add(entity) {             };
    
    /**
     * returns the DatastoreClass to which the entity collection belongs
     *
     * @method getDataClass
     * @return {DatastoreClass}
     */
    this.getDataClass = function getDataClass() {        return new DatastoreClass( );     };
    
    /**
     * executes a function on each entity in the entity collection in ascending order
     *
     * @method forEach
     * @param {Object} options
     */
    this.forEach = function forEach(options) {             };
    
    /**
     * executes a datastore class method on the entity, entity collection, or datastore class to which it is applied
     *
     * @method callMethod
     * @param {Object} options
     * @param {String} params
     * @return {Mixed}
     */
    this.callMethod = function callMethod(options, params) {        return 0 || '' || true || {} || null;     };
    
    /**
     * sorts the entities in the entity collection or datastore class and returns a new entity collection containing the sorted data
     *
     * @method orderBy
     * @param {String | DatastoreClassAttribute} attributeList
     * @param {String} sortOrder
     * @param {Object} options
     */
    this.orderBy = function orderBy(attributeList, sortOrder, options) {             };
    
    /**
     * retrieves the entity whose position in the entity collection is passed to the position parameter
     *
     * @method getEntity
     * @param {Number} position
     * @param {Object} options
     * @return {Entity}
     */
    this.getEntity = function getEntity(position, options) {        return new Entity( );     };
    
    /**
     * creates and returns a  JavaScript array in which each element is an object containing a set of  properties and values corresponding to the attribute names and values in  the datastore class
     *
     * @method toArray
     * @param {String} attributeList
     * @param {Object} options
     */
    this.toArray = function toArray(attributeList, options) {             };
    
    /**
     * returns a new entity collection based on the entity Selection you passed in the entitySelection parameter
     *
     * @method buildFromSelection
     * @param {Selection} entitySelection
     * @param {Object} options
     * @return {EntityCollection}
     */
    this.buildFromSelection = function buildFromSelection(entitySelection, options) {        return new EntityCollection( );     };
    
    /**
     * searches among all the entities of the datastore class or entity collection for those meeting the search criteria specified in queryString and returns a new object containing the entities found
     *
     * @method query
     * @param {String} queryString
     * @param {Object} options
     * @return {EntityCollection}
     */
    this.query = function query(queryString, options) {        return new EntityCollection( );     };
    
    /**
     * removes from the server all the entities referenced in the entity collection
     *
     * @method removeAllEntities
     * @param {Object} options
     */
    this.removeAllEntities = function removeAllEntities(options) {             };
    
    /**
     * removes from the collection the entity whose position in is passed to the position parameter, and deletes it on the server
     *
     * @method removeEntity
     * @param {Number} position
     * @param {Object} options
     */
    this.removeEntity = function removeEntity(position, options) {             };
    
    /**
     * removes from the collection the entity whose position in is passed to the position parameter
     *
     * @method removeEntityReference
     * @param {Number} position
     * @param {Object} options
     */
    this.removeEntityReference = function removeEntityReference(position, options) {             };
    
    /**
     * refreshes the entity collection on the client
     *
     * @method refresh
     * @param {Object} options
     */
    this.refresh = function refresh(options) {             };
    
    /**
     * returns the position in the entity collection of the entity whose primary key is passed in key
     *
     * @method findKey
     * @param {Number | String} key
     * @param {Object} options
     */
    this.findKey = function findKey(key, options) {             };
    

};


WAF.DataStore = function WAF_DataStore() {
    
    
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
     * @property {className}
     * @attributes ReadOnly
     * @type DatastoreClass
     */
    this.{className} =  new DatastoreClass( ); 
    
    
    /**
     * returns all the datastore classes specified in the model of the current datastore along with their attributes and methods
     *
     * @method getDataClasses
     * @return {Object}
     */
    this.getDataClasses = function getDataClasses() {        return {};     };
    
    /**
     * returns the&amp;nbsp;DatastoreClass object whose name is the same as the string passed in the className parameter of the current datastore
     *
     * @method getDataClass
     * @param {String} className
     * @return {DatastoreClass}
     */
    this.getDataClass = function getDataClass(className) {        return new DatastoreClass( );     };
    

};


WAF.DataClass = function WAF_DataClass() {
    
    
    
    /**
     * returns an entity collection containing all the entities  in the datastore class
     *
     * @method allEntities
     * @param {Object} options
     */
    this.allEntities = function allEntities(options) {             };
    
    /**
     * returns the name of an entity  collection in the datastore class
     *
     * @method getCollectionName
     * @return {String}
     */
    this.getCollectionName = function getCollectionName() {        return '';     };
    
    /**
     * clears the entity cache on the client for the specified datastore class
     *
     * @method clearCache
     */
    this.clearCache = function clearCache() {             };
    
    /**
     * returns the datastore for the specified datastore class
     *
     * @method getDataStore
     * @return {Datastore}
     */
    this.getDataStore = function getDataStore() {        return new Datastore( );     };
    
    /**
     * retrieves the entity whose primary key value is passed in keyValue in the specified datastore class
     *
     * @method getEntity
     * @param {Number | String} keyValue
     * @param {Object} options
     * @return {Entity}
     */
    this.getEntity = function getEntity(keyValue, options) {        return new Entity( );     };
    
    /**
     * sets a new size on the client for the entity cache of the datastore class
     *
     * @method setCacheSize
     * @param {Number} cacheSize
     */
    this.setCacheSize = function setCacheSize(cacheSize) {             };
    
    /**
     * returns the current size of the entity cache on the client for the specified datastore class
     *
     * @method getCacheSize
     * @return {Number}
     */
    this.getCacheSize = function getCacheSize() {        return 0;     };
    
    /**
     * returns an object containing the list of all the attributes in the datastore class
     *
     * @method getAttributes
     * @return {Object}
     */
    this.getAttributes = function getAttributes() {        return {};     };
    
    /**
     * returns an object containing the datastore attribute whose name is passed in attributeName
     *
     * @method getAttributeByName
     * @param {String} attributeName
     * @return {DatastoreClassAttribute}
     */
    this.getAttributeByName = function getAttributeByName(attributeName) {        return new DatastoreClassAttribute( );     };
    
    /**
     * retrieves an array containing all the distinct values stored in attribute for the entity collection or datastore class
     *
     * @method distinctValues
     * @param {DatastoreClassAttribute | String} attribute
     * @param {Object} options
     */
    this.distinctValues = function distinctValues(attribute, options) {             };
    
    /**
     * executes a datastore class method on the entity, entity collection, or datastore class to which it is applied
     *
     * @method callMethod
     * @param {Object} options
     * @param {String} params
     * @return {Mixed}
     */
    this.callMethod = function callMethod(options, params) {        return 0 || '' || true || {} || null;     };
    
    /**
     * applies the search criteria specified in the queryString to all of the entities of the DatastoreClass to which it is applied and returns the first entity found in an object of the Entity type
     *
     * @method find
     * @param {String} queryString
     * @param {Object} options
     */
    this.find = function find(queryString, options) {             };
    
    /**
     * searches among all the entities of the datastore class or entity collection for those meeting the search criteria specified in queryString and returns a new object containing the entities found
     *
     * @method query
     * @param {String} queryString
     * @param {Object} options
     * @return {EntityCollection}
     */
    this.query = function query(queryString, options) {        return new EntityCollection( );     };
    
    /**
     * creates a new blank object of type EntityCollection attached to the datastore class
     *
     * @method newCollection
     * @param {Object} colRef
     * @param {Object} options
     * @return {EntityCollection}
     */
    this.newCollection = function newCollection(colRef, options) {        return new EntityCollection( );     };
    
    /**
     * creates a new entity in the datastore class and returns an empty Entity object
     *
     * @method newEntity
     * @return {Entity}
     */
    this.newEntity = function newEntity() {        return new Entity( );     };
    
    /**
     * returns the name of the datastore class to which it is applied
     *
     * @method getName
     * @return {String}
     */
    this.getName = function getName() {        return '';     };
    
    /**
     * creates and returns a  JavaScript array in which each element is an object containing a set of  properties and values corresponding to the attribute names and values in  the datastore class
     *
     * @method toArray
     * @param {String} attributeList
     * @param {Object} options
     */
    this.toArray = function toArray(attributeList, options) {             };
    
    /**
     * returns an array containing all public datastore class methods defined in the datastore class
     *
     * @method getMethodList
     * @return {Array}
     */
    this.getMethodList = function getMethodList() {        return [];     };
    
    /**
     * 
     *
     * @method all
     * @param {Object} options
     */
    this.all = function all(options) {             };
    

};


WAF.Entity = function WAF_Entity() {
    
    
    
    /**
     * deletes the entity from the datastore on the server
     *
     * @method remove
     * @param {Object} options
     */
    this.remove = function remove(options) {             };
    
    /**
     * saves the modifications made to a specific entity in the datastore
     *
     * @method save
     * @param {Object} options
     */
    this.save = function save(options) {             };
    
    /**
     * returns True when the entity to which it is applied has just been created on the client (and is not yet saved on the server)
     *
     * @method isNew
     * @return {Boolean}
     */
    this.isNew = function isNew() {        return true;     };
    
    /**
     * returns the current value of the entity&#39;s internal stamp on the client
     *
     * @method getStamp
     * @return {Number}
     */
    this.getStamp = function getStamp() {        return 0;     };
    
    /**
     * returns the value of the entity&#39;s primary key
     *
     * @method getKey
     * @return {String | Number}
     */
    this.getKey = function getKey() {        return '' || 0;     };
    
    /**
     * returns the DatastoreClass to which the entity belongs
     *
     * @method getDataClass
     * @return {DatastoreClass}
     */
    this.getDataClass = function getDataClass() {        return new DatastoreClass( );     };
    
    /**
     * returns True or False according to whether or not the entity or attribute has been modified
     *
     * @method isTouched
     * @return {Boolean}
     */
    this.isTouched = function isTouched() {        return true;     };
    
    /**
     * indicates that the entity or one of its attributes must be saved during the next save
     *
     * @method touch
     */
    this.touch = function touch() {             };
    
    /**
     * executes a datastore class method on the entity, entity collection, or datastore class to which it is applied
     *
     * @method callMethod
     * @param {Object} options
     * @param {String} params
     * @return {Mixed}
     */
    this.callMethod = function callMethod(options, params) {        return 0 || '' || true || {} || null;     };
    

};


WAF.Selection = function WAF_Selection() {
    
    
    
    /**
     * returns true if the entity whose position you passed in pos is currently selected in the entity collection
     *
     * @method isSelected
     * @param {Number} pos
     * @return {Boolean}
     */
    this.isSelected = function isSelected(pos) {        return true;     };
    
    /**
     * returns the number of entities in the Selection object
     *
     * @method countSelected
     * @return {Number}
     */
    this.countSelected = function countSelected() {        return 0;     };
    
    /**
     * returns True if the Selection works in single selection mode, otherwise False
     *
     * @method isModeSingle
     * @return {Boolean}
     */
    this.isModeSingle = function isModeSingle() {        return true;     };
    
    /**
     * returns True if the Selection works in multiple selection mode, otherwise False
     *
     * @method isModeMultiple
     * @return {Boolean}
     */
    this.isModeMultiple = function isModeMultiple() {        return true;     };
    
    /**
     * adds to Selection the entity whose position was passed in pos
     *
     * @method select
     * @param {Number} pos
     * @param {Boolean} addToSel
     */
    this.select = function select(pos, addToSel) {             };
    
    /**
     * adds to Selection the entities whose range is defined by startPos and endPos
     *
     * @method selectRange
     * @param {Number} startPos
     * @param {Number} endPos
     * @param {Boolean} addToSel
     */
    this.selectRange = function selectRange(startPos, endPos, addToSel) {             };
    
    /**
     * returns an array of the selected entity positions in the parent entity collection
     *
     * @method getSelectedRows
     * @return {Array}
     */
    this.getSelectedRows = function getSelectedRows() {        return [];     };
    
    /**
     * executes a function on each entity of type Selection in ascending order
     *
     * @method forEach
     * @param {Object} options
     */
    this.forEach = function forEach(options) {             };
    
    /**
     * modify the&amp;nbsp;Selection using properties of the options object
     *
     * @method buildFromObject
     * @param {Object} options
     */
    this.buildFromObject = function buildFromObject(options) {             };
    
    /**
     * returns the current selection mode for the&amp;nbsp;Selection object
     *
     * @method getMode
     * @return {String}
     */
    this.getMode = function getMode() {        return '';     };
    
    /**
     * returns the position of the first selected element in the Selection object
     *
     * @method getFirst
     * @return {Number}
     */
    this.getFirst = function getFirst() {        return 0;     };
    
    /**
     * resets the contents of the Selection
     *
     * @method reset
     * @param {String} mode
     */
    this.reset = function reset(mode) {             };
    
    /**
     * toggles in Selection the element whose position is passed in pos
     *
     * @method toggle
     * @param {Number} pos
     */
    this.toggle = function toggle(pos) {             };
    
    /**
     * returns a string containing comma separated values representing the positions of elements included in Selection
     *
     * @method toString
     * @return {String}
     */
    this.toString = function toString() {        return '';     };
    
    /**
     * set the selected elements in the parent collection thus modifying Selection
     *
     * @method setSelectedRows
     * @param {Array} rowsToSelect
     */
    this.setSelectedRows = function setSelectedRows(rowsToSelect) {             };
    

};


WAF.DatastoreClassAttribute = function WAF_DatastoreClassAttribute() {
    
    
    /**
     * 
     *
     * @property relatedClass
     * @attributes 
     */
    this.relatedClass =  ; 
    
    /**
     * 
     *
     * @property readOnly
     * @attributes 
     * @type Boolean | Undefined
     */
    this.readOnly =  true || new Undefined( ); 
    
    /**
     * 
     *
     * @property owner
     * @attributes 
     * @type DatastoreClass
     */
    this.owner =  new DatastoreClass( ); 
    
    

};

