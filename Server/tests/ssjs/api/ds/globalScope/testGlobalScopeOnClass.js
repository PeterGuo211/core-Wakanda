	
var testCase = {
    
     name: "test globalScope API",
     
      _should: {
		error: {
		},
		ignore: {
		}
    },
   
	/*
	* Sets up data that is needed by each test.
	*/
	setUp : function () {
	},

	/*
     * Cleans up everything that was created by setUp().
     */
	tearDown : function () {
	},
    
    //------------------------TESTS------------------------------
	 
	test1_employeesInDs: function() {   
			try{
		var test = new ds.Employees();
			}catch(e){
		Y.Assert.areSame(true, false, 'ds.Employees not available');
			}
	},
	
	test2_employeesInGlocalScope: function() {   
			try{
		var test = new Employees();
			}catch(e){
		Y.Assert.areSame(true, false, 'Employees not available');
			}
	},
	
	test3_companiesInDs: function() {  
			try{
		var test = new ds.Companies();
			}catch(e){
		Y.Assert.areSame(true, false, 'ds.Companies not available');
			}	
	},
	
	test4_companiesInGlocalScope: function() {   
			try{
		var test = new Companies();
		Y.Assert.areSame(true, false, 'Companies available');
			}catch(e){}	
	},
	
	test5_compareEmployees: function() {   
			try{
		var result = Employees() == ds.Employees()
		Y.Assert.areSame(true, result, 'Employees != ds.Employees');			
			}catch(e){
		Y.Assert.areSame(true, false, 'Employees != ds.Employees');			
			}	
	},
	
	test6_compareCompanies: function() {   
			try{
		var result = Companies() == ds.Companies()
		Y.Assert.areSame(true, result, 'Companies == ds.Companies');			
			}catch(e){}	
	}
}
    
if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}  