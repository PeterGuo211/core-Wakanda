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
 * @author Ouissam
 */
 
var testCase = {
	
	name: "DataSource class methods availability",
	
	setUp : function () {
		this.dataSourceClass = WAF.DataSource ;
    },
	
    /**
	 * DSC-01. DataSource class exists
	 */
    testDataSourceClassExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass);  
		Y.Assert.areSame("function", typeof this.dataSourceClass);
    },
    
    	
    /**
	 * DSC-02. addListener exists
	 */	
    testAddListenerExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.addListener);
		Y.Assert.areSame("function", typeof this.dataSourceClass.addListener);
    },
    
    /**
	 * DSC-03. autoDispatch exists
	 */	 
    testAutoDispatchExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.autoDispatch);
		Y.Assert.areSame("function", typeof this.dataSourceClass.autoDispatch);
    },

    /**
	 * DSC-04. declareDependencies exists
	 */	 
    testDeclareDependenciesExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.declareDependencies);
		Y.Assert.areSame("function", typeof this.dataSourceClass.declareDependencies);
    },
    
    /**
	 * DSC-05. dispatch exists
	 */	   
    testDispatchExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.dispatch);
		Y.Assert.areSame("function", typeof this.dataSourceClass.dispatch);
    },
    
	/**
	 * DSC-06. getAttribute exists
	 */
    testGetAttributeExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.getAttribute);
		Y.Assert.areSame("function", typeof this.dataSourceClass.getAttribute);
    },
    
    /**
	 * DSC-07. getCurrentElement exists
	 */	
    testGetCurrentElementExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.getCurrentElement);
		Y.Assert.areSame("function", typeof this.dataSourceClass.getCurrentElement);
    },
    
    /**
	 * DSC-08. getElement exists
	 */	
    testGetElementExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.getElement);
		Y.Assert.areSame("function", typeof this.dataSourceClass.getElement);
    },
    
    /**
	 * DSC-09. getID exists
	 */	
    testGetIDExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.getID);
		Y.Assert.areSame("function", typeof this.dataSourceClass.getID);
    },
    
    /**
	 * DSC-10. getPosition exists
	 */	
    testGetPositionExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.getPosition);
		Y.Assert.areSame("function", typeof this.dataSourceClass.getPosition);
    },
    
    /**
	 * DSC-11. isNewElement exists
	 */	
    testIsNewElementExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.isNewElement);
		Y.Assert.areSame("function", typeof this.dataSourceClass.isNewElement);
    },
    
	/**
	 * DSC-12. select exists
	 */	
    testSelectExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.select);
		Y.Assert.areSame("function", typeof this.dataSourceClass.select);
    },
	
    /**
	 * DSC-13. selectNext exists
	 */	
    testSelectNextExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.selectNext);
		Y.Assert.areSame("function", typeof this.dataSourceClass.selectNext);
    },
    
    /**
	 * DSC-14. selectPrevious exists
	 */	
    testSelectPreviousExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.selectPrevious);
		Y.Assert.areSame("function", typeof this.dataSourceClass.selectPrevious);
    },
		
    /**
	 * DSC-15. serverRefresh exists
	 */	
    testServerRefreshExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.serverRefresh);
		Y.Assert.areSame("function", typeof this.dataSourceClass.serverRefresh);
    },  
       /**
	 * DSC-16. atLeastPageSize exists
	 */
    testAtLeastPageSizeExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.atLeastPageSize);
		Y.Assert.areSame("function", typeof this.dataSourceClass.atLeastPageSize);
    }, 
   
     /**
	 * DSC-17. getSelection exists
	 */	
    testGetSelectionExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.getSelection);
		Y.Assert.areSame("function", typeof this.dataSourceClass.getSelection);
    },
    
    /**
	* DSC-18.  removeAllListeners exists
	*/
	testRemoveAllListenersExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.removeAllListeners);
		Y.Assert.areSame("function", typeof this.dataSourceClass.removeAllListeners);
	},
    
    /**
	* DSC-19.  removeListener exists
	*/
	testRemoveListenerExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.removeListener);
		Y.Assert.areSame("function", typeof this.dataSourceClass.removeListener);
	}, 
   
     /**
	 * DSC-20. setSelection exists
	 */	
    testSetSelectionExists: function () {
		Y.Assert.areNotSame("undefined", typeof this.dataSourceClass.setSelection);
		Y.Assert.areSame("function", typeof this.dataSourceClass.setSelection);
    }					 
       				 
       

        
};