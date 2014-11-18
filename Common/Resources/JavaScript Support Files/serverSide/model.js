/**
 *
 * 
 *
 * @class Model
 * @extends Object
 *
 */
Attribute = function Attribute() {
    
    
    /**
     * 
     *
     * @property Basics
     * @attributes 
     * @type Object
     */
    this.Basics =  {}; 
    
    /**
     * 
     *
     * @property cacheDuration
     * @attributes 
     * @type Number
     */
    this.cacheDuration =  0; 
    
    /**
     * 
     *
     * @property defaultValue
     * @attributes 
     * @type Number
     */
    this.defaultValue =  0; 
    
    /**
     * 
     *
     * @property defaultFormat
     * @attributes 
     * @type Object
     */
    this.defaultFormat =  {}; 
    
    /**
     * 
     *
     * @property pattern
     * @attributes 
     * @type String
     */
    this.pattern =  ''; 
    
    /**
     * 
     *
     * @property maxValue
     * @attributes 
     * @type Number
     */
    this.maxValue =  0; 
    
    /**
     * 
     *
     * @property identifying
     * @attributes 
     * @type Boolean
     */
    this.identifying =  true; 
    
    /**
     * 
     *
     * @property fixedLength
     * @attributes 
     * @type Number
     */
    this.fixedLength =  0; 
    
    /**
     * 
     *
     * @property minLength
     * @attributes 
     * @type Number
     */
    this.minLength =  0; 
    
    /**
     * 
     *
     * @property maxLength
     * @attributes 
     * @type Number
     */
    this.maxLength =  0; 
    
    /**
     * 
     *
     * @property matchColumn
     * @attributes 
     * @type String
     */
    this.matchColumn =  ''; 
    
    /**
     * 
     *
     * @property reversePath
     * @attributes 
     * @type Boolean
     */
    this.reversePath =  true; 
    
    /**
     * 
     *
     * @property readOnly
     * @attributes 
     * @type Boolean
     */
    this.readOnly =  true; 
    
    /**
     * 
     *
     * @property multiLine
     * @attributes 
     * @type Boolean
     */
    this.multiLine =  true; 
    
    /**
     * 
     *
     * @property styled_text
     * @attributes 
     * @type Boolean
     */
    this.styled_text =  true; 
    
    /**
     * 
     *
     * @property autoComplete
     * @attributes 
     * @type Boolean
     */
    this.autoComplete =  true; 
    
    /**
     * 
     *
     * @property not_null
     * @attributes 
     * @type Boolean
     */
    this.not_null =  true; 
    
    /**
     * 
     *
     * @property unique
     * @attributes 
     * @type Boolean
     */
    this.unique =  true; 
    
    /**
     * 
     *
     * @property outside_blob
     * @attributes 
     * @type Boolean
     */
    this.outside_blob =  true; 
    
    /**
     * 
     *
     * @property blob_switch_size
     * @attributes 
     * @type Number
     */
    this.blob_switch_size =  0; 
    
    /**
     * 
     *
     * @property limiting_length
     * @attributes 
     * @type Number
     */
    this.limiting_length =  0; 
    
    /**
     * 
     *
     * @property scope
     * @attributes 
     * @type String
     */
    this.scope =  ''; 
    
    /**
     * 
     *
     * @property simpleDate
     * @attributes 
     * @type Boolean
     */
    this.simpleDate =  true; 
    
    /**
     * 
     *
     * @property autogenerate
     * @attributes 
     * @type Boolean
     */
    this.autogenerate =  true; 
    
    /**
     * 
     *
     * @property autosequence
     * @attributes 
     * @type Boolean
     */
    this.autosequence =  true; 
    
    /**
     * 
     *
     * @property primKey
     * @attributes 
     * @type Boolean
     */
    this.primKey =  true; 
    
    /**
     * 
     *
     * @property indexKind
     * @attributes 
     * @type String
     */
    this.indexKind =  ''; 
    
    /**
     * 
     *
     * @property path
     * @attributes 
     * @type String
     */
    this.path =  ''; 
    
    /**
     * 
     *
     * @property kind
     * @attributes 
     * @type String
     */
    this.kind =  ''; 
    
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
     * @property events
     * @attributes 
     * @type AttributeEvent
     */
    this.events =  new AttributeEvent( ); 
    
    /**
     * 
     *
     * @property minValue
     * @attributes 
     * @type Number
     */
    this.minValue =  0; 
    
    /**
     * define the JavaScript function that describes how the calculated Attribute must be sorted when an order by operation is triggered on it
     *
     * @property onSort
     * @attributes 
     * @type Function
     */
    this.onSort =  new Function( ); 
    
    /**
     * define the JavaScript function to execute when the calculated Attribute is used in a query
     *
     * @property onQuery
     * @attributes 
     * @type Function
     */
    this.onQuery =  new Function( ); 
    
    /**
     * define the JavaScript function that describes how a value entered in the calculated Attribute will be processed
     *
     * @property onSet
     * @attributes 
     */
    this.onSet =  ; 
    
    /**
     * define the JavaScript function that describes how the calculated Attribute value will be evaluated
     *
     * @property onGet
     * @attributes 
     * @type Function
     */
    this.onGet =  new Function( ); 
    
    
    /**
     * associate an event listener function with the attribute
     *
     * @method addEventListener
     * @param {String} event
     * @param {Function} jsCode
     */
    this.addEventListener = function addEventListener(event, jsCode) {             };
    

};


DatastoreClass = function DatastoreClass() {
    
    
    /**
     * 
     *
     * @property properties
     * @attributes 
     * @type Object
     */
    this.properties =  {}; 
    
    /**
     * 
     *
     * @property events
     * @attributes 
     * @type DatastoreClassEvent
     */
    this.events =  new DatastoreClassEvent( ); 
    
    /**
     * 
     *
     * @property methods
     * @attributes 
     * @type Object
     */
    this.methods =  {}; 
    
    /**
     * 
     *
     * @property collectionMethods
     * @attributes 
     * @type Object
     */
    this.collectionMethods =  {}; 
    
    /**
     * 
     *
     * @property entityMethods
     * @attributes 
     * @type Object
     */
    this.entityMethods =  {}; 
    
    /**
     * 
     *
     * @property {methodName}
     * @attributes 
     * @type DatastoreClassMethod
     */
    this.{methodName} =  new DatastoreClassMethod( ); 
    
    /**
     * 
     *
     * @property {attributeName}
     * @attributes 
     * @type DatastoreClassAttribute
     */
    this.{attributeName} =  new DatastoreClassAttribute( ); 
    
    
    /**
     * removes the name attribute from the datastore class for the model object
     *
     * @method removeAttribute
     * @param {String} name
     */
    this.removeAttribute = function removeAttribute(name) {             };
    
    /**
     * 
     *
     * @method addRelatedEntities
     * @param {String} name
     * @param {String} type
     * @param {String} path
     * @param {Object} option
     */
    this.addRelatedEntities = function addRelatedEntities(name, type, path, option) {             };
    
    /**
     * adds a new relatedEntity attribute to the datastore class
     *
     * @method addRelatedEntity
     * @param {String} name
     * @param {String} type
     * @param {String} path
     * @param {Object} option
     */
    this.addRelatedEntity = function addRelatedEntity(name, type, path, option) {             };
    
    /**
     * define a datastore class method and add it to the current class
     *
     * @method addMethod
     * @param {String} name
     * @param {String} type
     * @param {Function} jsCode
     * @param {String} scope
     */
    this.addMethod = function addMethod(name, type, jsCode, scope) {             };
    
    /**
     * associate an event listener function with the datastore class
     *
     * @method addEventListener
     * @param {String} event
     * @param {Function} jsCode
     */
    this.addEventListener = function addEventListener(event, jsCode) {             };
    
    /**
     * adds a new attribute to the datastore class
     *
     * @method addAttribute
     * @param {String} name
     * @param {String | Null} kind
     * @param {String} type
     * @param {String} indexOrPath
     * @param {Object} options
     * @return {DatastoreClassAttribute}
     */
    this.addAttribute = function addAttribute(name, kind, type, indexOrPath, options) {        return new DatastoreClassAttribute( );     };
    
    /**
     * associate a restricting query with the datastore class
     *
     * @method setRestrictingQuery
     * @param {String} queryStatement
     */
    this.setRestrictingQuery = function setRestrictingQuery(queryStatement) {             };
    
    /**
     * define one or several properties for the datastore class
     *
     * @method setProperties
     * @param {Object} properties
     */
    this.setProperties = function setProperties(properties) {             };
    

};


DataStoreCatalog = function DataStoreCatalog() {
    
    
    /**
     * 
     *
     * @property {className}
     * @attributes 
     * @type DatastoreClass
     */
    this.{className} =  new DatastoreClass( ); 
    
    
    /**
     * allows you to reference  and use a remote catalog in your current Wakanda model reference
     *
     * @method mergeOutsideCatalog
     * @param {String} localName
     * @param {String | Object} hostName | mergeInfo
     * @param {String} user
     * @param {String} password
     */
    this.mergeOutsideCatalog = function mergeOutsideCatalog(localName, hostName | mergeInfo, user, password) {             };
    
    /**
     * adds a new datastore class to the current procedural model
     *
     * @method addClass
     * @param {String} className
     * @param {String} collectionName
     * @param {String | Null} scope
     * @param {String | Null} extendedClass
     * @param {Object} properties
     * @return {DatastoreClass}
     */
    this.addClass = function addClass(className, collectionName, scope, extendedClass, properties) {        return new DatastoreClass( );     };
    

};


AttributeEvent = function AttributeEvent() {
    
    
    /**
     * is triggered when a [#cmd id&#61;&quot;200220&quot;/] method is executed on the client side
     *
     * @property clientRefresh
     * @attributes 
     * @param {Object} event
     */
    this.clientRefresh =  ; 
    
    /**
     * is triggered before removing an entity on the server, following usually a call to the [#cmd id&#61;&quot;100550&quot;/] method
     *
     * @property validateremove
     * @attributes 
     * @param {Object} event
     */
    this.validateremove =  ; 
    
    /**
     * is triggered before saving an entity on the server, for example following a call to the [#cmd id&#61;&quot;100590&quot;/] method, but before the save event
     *
     * @property validate
     * @attributes 
     * @param {Object} event
     */
    this.validate =  ; 
    
    /**
     * is triggered just after an attribute’s value is set
     *
     * @property set
     * @attributes 
     * @param {Object} event
     */
    this.set =  ; 
    
    /**
     * is triggered just before saving an entity on the server, for example following a call to the [#cmd id&#61;&quot;100590&quot;/] method and if the entity has passed validation
     *
     * @property save
     * @attributes 
     * @param {Object} event
     */
    this.save =  ; 
    
    /**
     * is triggered just before an entity is to be deleted
     *
     * @property remove
     * @attributes 
     * @param {Object} event
     */
    this.remove =  ; 
    
    /**
     * is triggered just after an entity or an attribute is accesse
     *
     * @property load
     * @attributes 
     * @param {Object} event
     */
    this.load =  ; 
    
    /**
     * is triggered just after a new entity is created in memory on the server
     *
     * @property init
     * @attributes 
     * @param {Object} event
     */
    this.init =  ; 
    
    /**
     * 
     *
     * @property onSet
     * @attributes 
     * @type Function
     */
    this.onSet =  new Function( ); 
    
    /**
     * 
     *
     * @property onValidate
     * @attributes 
     * @type Function
     */
    this.onValidate =  new Function( ); 
    
    /**
     * 
     *
     * @property onSave
     * @attributes 
     * @type Function
     */
    this.onSave =  new Function( ); 
    
    /**
     * 
     *
     * @property onRemove
     * @attributes 
     * @type Function
     */
    this.onRemove =  new Function( ); 
    
    /**
     * 
     *
     * @property onLoad
     * @attributes 
     * @type Function
     */
    this.onLoad =  new Function( ); 
    
    /**
     * 
     *
     * @property onInit
     * @attributes 
     * @type Function
     */
    this.onInit =  new Function( ); 
    
    

};


DatastoreClassEvent = function DatastoreClassEvent() {
    
    
    /**
     * is triggered when a [#cmd id&#61;&quot;200220&quot;/] method is executed on the client side
     *
     * @property clientrefresh
     * @attributes 
     * @param {Object} event
     */
    this.clientrefresh =  ; 
    
    /**
     * is triggered before removing an entity on the server, following usually a call to the [#cmd id&#61;&quot;100550&quot;/] method
     *
     * @property validateremove
     * @attributes 
     * @param {Object} event
     */
    this.validateremove =  ; 
    
    /**
     * is triggered before saving an entity on the server, for example following a call to the [#cmd id&#61;&quot;100590&quot;/] method
     *
     * @property validate
     * @attributes 
     * @param {Object} event
     */
    this.validate =  ; 
    
    /**
     * is triggered just before saving an entity on the server, for example following a call to the [#cmd id&#61;&quot;100590&quot;/] method and if the entity has passed validation
     *
     * @property save
     * @attributes 
     * @param {Object} event
     */
    this.save =  ; 
    
    /**
     * is triggered whenever all the entities in a datastore class are accessed either by locating an entity by key or by using one of these dataclass methods: [#cmd id&#61;&quot;100205&quot;/], [#cmd id&#61;&quot;100210&quot;/], or [#cmd id&#61;&quot;100215&quot;/]
     *
     * @property restrict
     * @attributes 
     * @param {Object} event
     */
    this.restrict =  ; 
    
    /**
     * is triggered just before an entity is to be deleted
     *
     * @property remove
     * @attributes 
     * @param {Object} event
     */
    this.remove =  ; 
    
    /**
     * is triggered after an entity or an attribute is accessed
     *
     * @property load
     * @attributes 
     * @param {Object} event
     */
    this.load =  ; 
    
    /**
     * is triggered just after a new entity is created in memory on the server
     *
     * @property init
     * @attributes 
     * @param {Object} event
     */
    this.init =  ; 
    
    /**
     * 
     *
     * @property onRestrictingQuery
     * @attributes 
     * @type Function
     */
    this.onRestrictingQuery =  new Function( ); 
    
    /**
     * 
     *
     * @property onRemove
     * @attributes 
     * @type Function
     */
    this.onRemove =  new Function( ); 
    
    /**
     * 
     *
     * @property onSave
     * @attributes 
     * @type Function
     */
    this.onSave =  new Function( ); 
    
    /**
     * 
     *
     * @property onValidate
     * @attributes 
     * @type Function
     */
    this.onValidate =  new Function( ); 
    
    /**
     * 
     *
     * @property onLoad
     * @attributes 
     * @type Function
     */
    this.onLoad =  new Function( ); 
    
    /**
     * 
     *
     * @property onInit
     * @attributes 
     * @type Function
     */
    this.onInit =  new Function( ); 
    
    

};


DatastoreClassMethod = function DatastoreClassMethod() {
    
    
    /**
     * 
     *
     * @property applyTo
     * @attributes 
     * @type String
     */
    this.applyTo =  ''; 
    
    /**
     * 
     *
     * @property scope
     * @attributes 
     * @type String
     */
    this.scope =  ''; 
    
    

};

