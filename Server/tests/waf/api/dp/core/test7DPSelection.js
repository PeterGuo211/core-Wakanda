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
 * @author Ismail Bougnouch
 */

var testCase = {

		name : "Selection class",
        setUp : function () {
            this.SelectionClass = WAF.Selection ;
        },
        
		/**
		 * DPS-00. test of WAF.Selection function exists
		 */
		testWAFSelectionExists : function() {
			Y.Assert.areNotSame("undefined", typeof this.SelectionClass,"WAF.Selection is undefined");
			Y.Assert.areSame("function", typeof this.SelectionClass,"WAF.Selection is not a function");
		},
        
        /**
		 * DPS-01. test of WAF.Selection contructor type 
		 */
		testWAFSelectionConstructorLogic : function() {
            var selection = new this.SelectionClass("multiple");
			Y.Assert.areNotSame("undefined", typeof selection,"selection is undefined");
			Y.Assert.areSame("object", typeof selection,"selection constructor doesn't return not an object");
		},
    
        /**
		 * DPS-03. test of buildFromObject  method exists 
		 */
		testBuildFromObjectExists : function() {
             var selection = new this.SelectionClass("multiple");
			Y.Assert.areNotSame("undefined", typeof selection.buildFromObject ,"buildFromObject is undefined");
			Y.Assert.areSame("function", typeof selection.buildFromObject ,"buildFromObject is not a function");
		},
    
        /**
		 * DPS-04. test of buildFromObject  method logic 
		 */
		testBuildFromObjectLogic : function() {
            var selection = new this.SelectionClass("multiple");
            var entityCollection = sources.CompaniesDS.getEntityCollection();
            var entityCollectionLength = entityCollection.length;
          
            selection.setSelectedRows([0,2,4]);
            
            var toNotSelect = [2,5];
            var mustBeSelected = [];
            for (var i = 0; i != entityLength; ++i) mustBeSelected.push(i)
            //var mustBeSelected = [0,1,2,3,4,5,6];
            
            mustBeSelected.splice(2,1);
            mustBeSelected.splice(4,1);
            
            selection.buildFromObject(
                {                    
                    butRows :   toNotSelect,
                    ranges  :   [{start :0, end : entityCollectionLength -1}],
                    mode    :   'multiple'                    
                });
            var selectedRows = selection.getSelectedRows();
           
            
            Y.ArrayAssert.doesNotContainItems(toNotSelect,selectedRows,"The "+toNotSelect[0]+" or "+toNotSelect[1]+" value should not be contained on selectedRows !");
            Y.ArrayAssert.itemsAreSame(mustBeSelected,selectedRows,"The values ["+mustBeSelected.toString()+"] and ["+selectedRows.toString()+"] should be the same !");
		},  
    
         /**
		 * DPS-05. test of countSelected   method exists 
		 */
		testCountSelectedExists : function() {
             var selection = new this.SelectionClass("multiple");
			Y.Assert.areNotSame("undefined", typeof selection.countSelected  ,"countSelected  is undefined");
			Y.Assert.areSame("function", typeof selection.countSelected  ,"countSelected  is not a function");
		},
    
        /**
		 * DPS-06. test of countSelected   method logic 
		 */
		testCountSelectedLogic : function() {
            var selection = new this.SelectionClass("multiple");
            var entityCollection = sources.CompaniesDS.getEntityCollection();
            var toSelect = [0,2,4,5];
            var trueCountSelected = toSelect.length;
            
            selection.setSelectedRows(toSelect);            
            sources.CompaniesDS.setSelection(selection);
            
            var newSelection = sources.CompaniesDS.getSelection();
            var countSelectedItems = newSelection.countSelected();                       
            
            Y.Assert.areSame(true,trueCountSelected == countSelectedItems,"The values trueCountSelected("+trueCountSelected+") and countSelectedItems("+countSelectedItems+") should be the same !");
         
		},  
    
          /**
		 * DPS-07. test of forEach method exists 
		
		testForEeachExists : function() {
            var selection = new this.SelectionClass("multiple");
			Y.Assert.areNotSame("undefined", typeof selection.forEeach  ,"forEeach  is undefined");
			Y.Assert.areSame("function", typeof selection.forEeach  ,"forEeach  is not a function");
		},
         */                
    
        /**
		 * DPS-08. test of getFirst method exists 
		 */
		testGetFirstExists : function() {
            var selection = new this.SelectionClass("multiple");
			Y.Assert.areNotSame("undefined", typeof selection.getFirst  ,"getFirst  is undefined");
			Y.Assert.areSame("function", typeof selection.getFirst  ,"getFirst  is not a function");
		},
        
        /**
		 * DPS-09. test of getFirst method logic 
		 */
		testGetFirstLogic : function() {
            var entityCollection = sources.CompaniesDS.getEntityCollection();
            
            var selection = new this.SelectionClass("multiple");
            var toSelect = [4,2,0,5];            
            
            selection.setSelectedRows(toSelect);            
            sources.CompaniesDS.setSelection(selection);
            
            var newSelection = sources.CompaniesDS.getSelection();
            var firstOnSelection = newSelection.getFirst();
            
			Y.Assert.areSame(true, firstOnSelection == 0  ,"the first element on the selection is not "+firstOnSelection);
            
            
            sources.CompaniesDS.orderBy("ca",
                                        {
                                        'onSuccess':function(event){
                                                var newSelection = sources.CompaniesDS.getSelection();
                                                var firstOnSelection = newSelection.getFirst();
            
                                                Y.Assert.areSame(true, firstOnSelection == 2  ,"the first element on the selection is not "+firstOnSelection);  
                                            },
                                        'onError':function(event){
                                            Y.fail("Asyn call for orderBy failed !");
                                            }                                                                                         
                                        });           
		},
        
         /**
		 * DPS-10. test of getMode method exists 
		 */
		testGetModeExists : function() {
            var selection = new this.SelectionClass("multiple");
			Y.Assert.areNotSame("undefined", typeof selection.getMode  ,"getMode  is undefined");
			Y.Assert.areSame("function", typeof selection.getMode  ,"getMode  is not a function");
		},
        
          /**
		 * DPS-11. test of getMode method logic 
		 */
		testGetModeLogic : function() {
            
            var selection = new this.SelectionClass("multiple");                  
            //selection.setSelectedRows([4,2,1,5]);    
            selection.select(1);
            var selectMode = selection.getMode();            
            
			Y.Assert.areSame(true, selectMode == "multiple"  ,"the current selection mode ("+selectMode+") is not multiple !");
            
            var selection = new this.SelectionClass("single");                  
            //selection.setSelectedRows([4,2,1,5]);                        
            var selectMode = selection.getMode(); 
            
			Y.Assert.areSame(true, selectMode == "single"  ,"the current selection mode ("+selectMode+") is not single !");
            
		},
                  
         /**
		 * DPS-12. test of isModeMultiple method exists 
		 */
		testIsModeMultipleExists : function() {
            var selection = new this.SelectionClass("multiple");
			Y.Assert.areNotSame("undefined", typeof selection.isModeMultiple  ,"isModeMultiple  is undefined");
			Y.Assert.areSame("function", typeof selection.isModeMultiple  ,"isModeMultiple  is not a function");
		},
        
          /**
		 * DPS-13. test of isModeMultiple method logic 
		 */
		testIsModeMultipleLogic : function() {
            
            var selection = new this.SelectionClass("ismail");                        
            
			Y.Assert.areSame(true, selection.isModeMultiple()  ,"the current selection mode is not multiple !");
            
            var selection = new this.SelectionClass("single");                  
           
			Y.Assert.areSame(false, selection.isModeMultiple() ,"the current selection mode is multiple !");
            
		},
    
          /**
		 * DPS-02. test of isModeSingle method exists 
		 */
		testIsModeMSingleExists : function() {
            var selection = new this.SelectionClass("single");
			Y.Assert.areNotSame("undefined", typeof selection.isModeSingle ,"isModeSingle  is undefined");
			Y.Assert.areSame("function", typeof selection.isModeSingle ,"isModeSingle  is not a function");
		},
        
          /**
		 * DPS-14. test of isModeMultiple method logic 
		 */
		testIsModeMultipleLogic : function() {
            
            var selection = new this.SelectionClass("single");                        
            
			Y.Assert.areSame(true, selection.isModeSingle()  ,"the current selection mode is not single !");
            
            var selection = new this.SelectionClass("multiple");                  
           
			Y.Assert.areSame(false, selection.isModeSingle() ,"the current selection mode is single !");
            
		},
    
          
        /**
		 * DPS-15. test of isSelected method exists 
		 */
		testIsSelectedExists : function() {
            var selection = new this.SelectionClass("multiple");
			Y.Assert.areNotSame("undefined", typeof selection.isSelected  ,"isSelected  is undefined");
			Y.Assert.areSame("function", typeof selection.isSelected  ,"isSelected  is not a function");
		},
        
        /**
		 * DPS-16. test of getFirst method logic 
		 */
		testIsSelectedLogic : function() {
            var entityCollection = sources.CompaniesDS.getEntityCollection();
            
            var selection = new this.SelectionClass("multiple");
            var toSelect = [4,2,0,5];            
            
            selection.setSelectedRows(toSelect);            
            sources.CompaniesDS.setSelection(selection);
            
            var newSelection = sources.CompaniesDS.getSelection();
            
            
			Y.Assert.areSame(true, newSelection.isSelected(0)  ,"the item in position 0 is not selected !");
            Y.Assert.areSame(false, newSelection.isSelected(1)  ,"the item in position 1 should not be selected !");
                   
		},
        
                 
        /**
		 * DPS-17. test of reset  method exists 
		 */
		testResetExists : function() {
            var selection = new this.SelectionClass("multiple");
			Y.Assert.areNotSame("undefined", typeof selection.reset   ,"reset   is undefined");
			Y.Assert.areSame("function", typeof selection.reset   ,"reset   is not a function");
		},
        
        /**
		 * DPS-18. test of getFirst method logic 
		 */
		testResetLogic : function() {
            var entityCollection = sources.CompaniesDS.getEntityCollection();
            
            var selection = new this.SelectionClass("multiple");
            var toSelect = [4,2,0,5];            
            
            selection.setSelectedRows(toSelect);   
            
            var selectedRows = selection.getSelectedRows(); 
            Y.ArrayAssert.isNotEmpty(selectedRows,"there are no selected rows !");  
                
            selection.reset();
            var selectedRows = selection.getSelectedRows();                                
			Y.ArrayAssert.isEmpty(selectedRows,"the selection did not reset !");            
                   
		},
        
    
        /**
		 * DPS-20. test of setSelectedRow method exists 
		 */
		testSetSelectedRowExists : function() {
             var selection = new this.SelectionClass("multiple");
			Y.Assert.areNotSame("undefined", typeof selection.setSelectedRows,"setSelectedRows is undefined");
			Y.Assert.areSame("function", typeof selection.setSelectedRows,"setSelectedRows is not a function");
		},
    
         /**
         * DPS-21. test of setSelectedRow method logic 
         */
        testSetSelectedRowLogic : function() {
            var testRunner = this;
            
            var selection = new this.SelectionClass("multiple");
            var entityCollection;
            sources.CompaniesDS.orderBy("ID",
                                        {
                                        'onSuccess':function(event){
                                               entityCollection = sources.CompaniesDS.getEntityCollection();
                                            },
                                        'onError':function(event){
                                            Y.fail("Asyn call for orderBy failed !");
                                            }                                                                                         
                                        });
         
            window.setTimeout(function () {
            selection.setSelectedRows([0,2,4]);
            var newEntityCollection = entityCollection.buildFromSelection(selection
                                      ,{
                                          'onSuccess':function(event){
                                                var selectedItems = [];
            
                                                newEntityCollection.forEach(
                                                    {
                                                        'onSuccess':function(event){
                                                            id = event.entity.ID.getValue();
                                                            selectedItems.push(id);   
                                                        }, 
                                                        'onError':function(event)
                                                          {
                                                              testRunner.resume(function(){ 
                                                                Y.Assert.fail("Async call to forEach fails !");
                                                              });	
                                                          }
                                                    });
                                                testRunner.resume(function(){ 
                                                Y.ArrayAssert.itemsAreSame([1,3,5],selectedItems,"The values should be the same ! ");
                                                });
                                          },
                                          'onError':function(event)
                                          {
                                              testRunner.resume(function(){ 
                                                Y.Assert.fail("Async call to buildFromSelection fails !");
                                              });	
                                          }
                                          
                                          
                                      }
                                                                         );
          
			
		  },50);
        testRunner.wait();	    
        
        },
        
        /**
         * DPS-22. test of selectRange method exists 
         */
        testSelectRangeExists : function() {
            var selection = new this.SelectionClass("multiple");
			Y.Assert.areNotSame("undefined", typeof selection.selectRange,"selectRange is undefined");
			Y.Assert.areSame("function", typeof selection.selectRange,"selectRange is not a function");
		},
    
         /**
         * DPS-23. test of select method logic 
         */
        testSelectRangeLogic : function() {
            var testRunner = this;
            var entityCollection = sources.CompaniesDS.getEntityCollection();
            
            var selection = new this.SelectionClass("multiple");            
                     
            selection.setSelectedRows([0,2,3]);
            var startPos = 4;
            var endPos = 5;
            var addToSel = false;
                
            selection.selectRange(startPos, endPos, addToSel);
            var selectedRows    =   selection.getSelectedRows();
            var countSelected   =   selection.countSelected(); 
            Y.ArrayAssert.itemsAreSame([4,5],selectedRows, "The values should be the same ! first assert");
                
            
            selection = new this.SelectionClass("multiple");            
                     
            selection.setSelectedRows([0,2,3]);
            addToSel = true;
                
            selection.selectRange(startPos, endPos, addToSel);
            selectedRows    =   selection.getSelectedRows();
            countSelected   =   selection.countSelected(); 
            
            Y.ArrayAssert.itemsAreSame([0,2,3,4,5],selectedRows, "The values should be the same ! second assert");    
        
        },
    
         /**
         * DPS-24. test of select method exists 
         */
        testSelectExists : function() {
             var selection = new this.SelectionClass("multiple");
			Y.Assert.areNotSame("undefined", typeof selection.select,"setSelectedRows is undefined");
			Y.Assert.areSame("function", typeof selection.select,"setSelectedRows is not a function");
		},
    
         /**
         * DPS-25. test of select method logic 
         */
        testSelectLogic : function() {
            var testRunner = this;
            
            var selection = new this.SelectionClass("single");
            var entityCollection = sources.CompaniesDS.getEntityCollection();
            selection.select(4);
            var idSelected;
            var idExcepected;

            sources.CompaniesDS.setSelection(selection,{
                'onSuccess':function(e){
                    idSelected = sources.CompaniesDS.ID;
            sources.CompaniesDS.select(4);
            idExcepected = sources.CompaniesDS.ID;
                }});
            
            Y.Assert.areSame(idSelected, idExcepected,"The values should be the same (Item "+idSelected+" selected instead of '"+idExcepected+"'' ) ! ");
            
            window.setTimeout(function () {
            selection.select(4);
            sources.CompaniesDS.setSelection(selection);
            var dsSel = sources.CompaniesDS.getSelection();
            var selectedItems = [];
            selectedItems = dsSel.getSelectedRows();
            Y.ArrayAssert.itemsAreSame([4],selectedItems,"The values should be the same ! ");

            var newEntityCollection = entityCollection.buildFromSelection(selection,
                                          {
                                          'onSuccess':function(event){
                                                var selectedItems = [];
            
                                                   newEntityCollection.forEach(
                                                    {
                                                        'onSuccess':function(event){
                                                            id = event.entity.ID.getValue();
                                                            selectedItems.push(id);                                                            
                                                        }, 
                                                        'onError':function(event)
                                                          {
                                                              testRunner.resume(function(){ 
                                                                Y.Assert.fail("Async call to forEach fails !");
                                                              });	
                                                          }
                                                    });
                                                testRunner.resume(function(){ 
                                                    sources.CompaniesDS.select(4);
                                                    var idExcepected = sources.CompaniesDS.ID;
                                                    Y.ArrayAssert.itemsAreSame([idExcepected],selectedItems,"The values should be the same Exc:"+idExcepected+", Act:"+selectedItems+"! ");
                                                });
                                          },
                                          'onError':function(event)
                                          {
                                              testRunner.resume(function(){ 
                                                Y.Assert.fail("Async call to buildFromSelection fails !");
                                              });	
                                          }
                                      }
                                     );
			
		  },50);
            
        testRunner.wait();	
 
        },
            
        /**
         * DPS-26. test of toggle method exists 
         */
        testToggleExists : function() {
            var selection = new this.SelectionClass("multiple");
			Y.Assert.areNotSame("undefined", typeof selection.toggle,"toggle is undefined");
			Y.Assert.areSame("function", typeof selection.toggle,"toggle is not a function");
		},
    
         /**
         * DPS-27. test of select method logic 
         */
        testToggleLogic : function() {
            var testRunner = this;
            var entityCollection = sources.CompaniesDS.getEntityCollection();
            
            var selection = new this.SelectionClass("multiple");            
                     
            selection.setSelectedRows([0,2,3,4]);
            selection.toggle(3);
            selection.toggle(1);
            
            var selectedRows    = selection.getSelectedRows();
            var mustBeSelected  = [0,1,2,4];
            
            Y.ArrayAssert.itemsAreSame(mustBeSelected,selectedRows, "The values should be the same (on multiple mode)!");
            
            var selection = new this.SelectionClass("single");            
                     
            selection.select(3);
            //selection.toggle(3);
            selection.toggle(1);
            
            var selectedRows    = selection.getSelectedRows();


            Y.ArrayAssert.isEmpty(selectedRows, "The array should be empty (on single mode)!");        

            selection.toggle(1);
            var selectedRows    = selection.getSelectedRows();
            var mustBeSelected  = [1];
            
            Y.ArrayAssert.itemsAreSame(mustBeSelected,selectedRows, "The values should be the same (on single mode)!");        
        
        },
    
        /**
         * DPS-26. test of toString method exists 
         */
        testToStringExists : function() {
            var selection = new this.SelectionClass("multiple");
			Y.Assert.areNotSame("undefined", typeof selection.toString,"toString is undefined");
			Y.Assert.areSame("function", typeof selection.toString,"toString is not a function");
		},
    
         /**
         * DPS-27. test of select method logic 
         */
        testToStringLogic : function() {
            var testRunner = this;
            var entityCollection = sources.CompaniesDS.getEntityCollection();
            
            var selection = new this.SelectionClass("multiple");            
                     
            selection.setSelectedRows([0,2,3,4]);
                    
            var toMatchWith = "0,2,3,4";
            var toStringResult = selection.toString();
            
            Y.Assert.areSame(toMatchWith, toStringResult, "The values (toMatchWith : "+toMatchWith+" && toStringResult : "+toStringResult+") should be the same !");
                
        
        }
    
        
    
        
    


};