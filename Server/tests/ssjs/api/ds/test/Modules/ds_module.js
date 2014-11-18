/**

* @author Ayoub Serti
* 
* module for manipulating DataStore Classes:

*/
function DataStore(database) {

    this.ds = null;
    this.database = database;
    this.jsonModel = {};
    this.foreignKeyList = {};
    this.relatedEntitiesList = {};
/*
     * _constrcut()
     * getForeignKey()
     * getClassesName
     * getClassStructure()
     * getClassEntitie()
     */

}

exports.DataStore = DataStore;

DataStore.prototype.openDataStore = function(modelFile, dataFile) {
    //open a DataStore,
    /*
     * modelFile : String or File
     * dataFile : String or File
     */

    this.jsonModel = JSON.parse(XmlToJSON(loadText(modelFile), 'json-bag', 'EntityModelCatalog'));
    try {
        this.ds = ds; // openDataStore(modelFile,dataFile);
    }
    catch (e) {

        throw new Error(e.message);
    }


    return this.ds;

}

DataStore.prototype.getClassNames = function() {

    var ClassNames = [];

    Object.keys(this.ds.tables).forEach(function(item) {

        ClassNames.push(item);
    });
    return ClassNames;
}

DataStore.prototype.getForeignKeys = function(dataClassName) {
    //get foreignkeys from dataClass
    
    var foreignKey = {};
    var that= this;
    this.jsonModel.dataClasses.forEach(function(item) {
        if (item.name == dataClassName) {
            that.foreignKeyList[dataClassName] = [];
            item.attributes.forEach(function(attribute) {
                if (attribute.kind == "relatedEntity") {

                    foreignKey = {
                        column_name: attribute.name,
                        referenced_table_name: attribute.type
                    //referenced_column_name : attribute.type
                    };
                    that.foreignKeyList[dataClassName].push(foreignKey);

                }

            });
        }
    });

    return this.foreignKeyList;
}

DataStore.prototype.getClassStructure2= function(dataClassName) {
    /*
     * getClassStructure : return the structure of a giving dataClass and converted to mysql strucutre
     * returned object is used as columns list in mySQLConnection.createTable() function
     */
    var classStructure = [];
    
    for(var i =0; i<this.jsonModel.dataClasses.length ; i++){
        var dataClass=this.jsonModel.dataClasses[i];
    	
        if (dataClass.name == dataClassName) {
    		
            classStructure = dataClass.attributes;
            break;
        }
    }
    
    
  

    return classStructure;
}

DataStore.prototype.getClassEntities = function(dataClassName) {
    /*
     * getClassEntities return all entities from dataClass structured as a tableJSON.
     * returned object is used in mySQLConnection.fillTable() function 
     */

    var entities, foreignKeys, fRelatedEntities, isStorageAtt, rEntities = [];

    entities = this.ds[dataClassName].all();
    foreignKeys = this.foreignKeyList[dataClassName];

    fRelatedEntities = this.relatedEntitiesList[dataClassName];
    for(var _j=0; _j<entities.length;_j++){
		
        var entity= entities[_j];
  
        var thatEntity={};
        var entityProperties = Object.getOwnPropertyNames(entity);
        
        for(var ij = 0; ij<entityProperties.length; ij++){
            var entityProperty= entityProperties[ij];
            isStorageAtt = true;
            
            //exclude relationEntities attributes
            fRelatedEntities.forEach(function(elem) {

                if (entityProperty == elem.name) {
                	   isStorageAtt = false;
                }

            });

            if(foreignKeys !=undefined) {
                for (var _i = 0; _i < foreignKeys.length; _i++) {

                    if (entityProperty == foreignKeys[_i].column_name) {
                        //@TODO: find value of related Entity attribute.
                        var ext_primKey = _getPrimKeyName(foreignKeys[_i].referenced_table_name,this);
                        if(entity[entityProperty] != undefined){
                            thatEntity[entityProperty] = entity[entityProperty][ext_primKey];
                          }else {
                          	thatEntity[entityProperty] = null;
                          }

                        isStorageAtt = false;
                        break;
                    }
                }
            }
            //refaire ce bout de code 
            if (isStorageAtt) {
            	
            	if(entity[entityProperty]===null){
            		thatEntity[entityProperty]=null;
            		}
            	else if(entity[entityProperty]==true){
            		thatEntity[entityProperty]=1;
            	}else if(entity[entityProperty]===false){
            		thatEntity[entityProperty]=0;
    	
            	}else if(typeof entity[entityProperty]=='object'){
            		if(entity[entityProperty] instanceof Date){
            			thatEntity[entityProperty]= entity[entityProperty].toISOString();
            		}else if(Object.prototype.toString.call(entity[entityProperty])=="[object Blob]")
            			thatEntity[entityProperty]= 'x"'+entity[entityProperty].toBuffer().toString('hex')+'"';
            		 
            	}else {
                thatEntity[entityProperty] = entity[entityProperty];
                }
            }
        }
   
      
        rEntities.push(thatEntity);
	
    }
	
    return rEntities;
}

DataStore.prototype.getRelatedEntitiesList = function() {
    /*
     * return relatedEntities from every Class in the current DataStore;
     * affect this.relatedEntitiesList
     */

    if (this.ds == null || this.jsonModel.dataClasses.length == 0) throw new Error('No DataStore found!');
    var that= this;
    for (var i = 0; i < this.jsonModel.dataClasses.length; i++) {
        var dataClass = this.jsonModel.dataClasses[i];
      
        this.relatedEntitiesList[dataClass.name] = [];
           
        dataClass.attributes.forEach(function(attribute) {

            if (attribute.kind == 'relatedEntities') {

                that.relatedEntitiesList[dataClass.name].push({
                    type: attribute.type,
                    name: attribute.name
                //TODO : maybe add other properties
                });
            }
            

        });

    }


    return this.relatedEntitiesList;

}

DataStore.prototype.getClassStructure = function(dataClassName){
    /*
     * 
     * getClassStructure : return the structure of a giving dataClass and converted to mysql strucutre
     * returned object is used as columns list in mySQLConnection.createTable() function
     */
       
    var attribute,classStructure = [];
    
    for(var i =0; i<this.jsonModel.dataClasses.length ; i++){
        var dataClass=this.jsonModel.dataClasses[i];
    	
        if (dataClass.name == dataClassName || dataClass.className == dataClassName) {
            
            for(var j=0;j<dataClass.attributes.length;j++){
                attribute={
                    name  : dataClass.attributes[j].name,
                    kind  : dataClass.attributes[j].kind,
                    
                    type  : dataClass.attributes[j].type
                }
                
                if(dataClass.attributes[j].primKey!=undefined) attribute.primKey=dataClass.attributes[j].primKey;
                if(dataClass.attributes[j].unique != undefined) attribute.unique = dataClass.attributes[j].unique;
                if(dataClass.attributes[j].autosequence != undefined) attribute.autosequence = dataClass.attributes[j].autosequence;
                
                if(attribute.kind=='relatedEntity'){
                    
                    //change attribute type's; get the primarykey of dataClass on which refer this attribute
                    
                    var ex_primKeyName = _getPrimKeyName(attribute.type,this);
                    var ex_dataClass = this.getClassStructure2(attribute.type);
                    for(var k = 0; k< ex_dataClass.length ;k++){
                        if(ex_dataClass[k].name == ex_primKeyName){
                        	attribute.pointedClass = attribute.type;
                            attribute.type = ex_dataClass[k].type;
                            attribute.pointedAtt = ex_dataClass[k].name;
                            break;
                        }
                    }
  
                }
                
                classStructure.push(attribute);

            }
    
            break;
        }
    }
    
    
  

    return classStructure;
}


function _getPrimKeyName(dataClasseName,that) {
    /*
     * return primKey attribute of a dataClass
     */

    //TODO: fix problem related to dataClass without Primary Key. MySQL don't allow relationship between table with no PrimKey 
    var _i, _j, primKeyName, attributes, attribute;

    attributes = that.getClassStructure2(dataClasseName);


    for (_i = 0; _i < attributes.length; _i++) {

        attribute = attributes[_i];
         
        if (attribute.primKey == 'true') {
            primKeyName = attribute.name;
           
            break;
        }

    }
	
    return primKeyName;

}