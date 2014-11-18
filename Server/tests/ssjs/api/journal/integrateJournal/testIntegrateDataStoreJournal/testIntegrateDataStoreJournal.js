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

/*
 This tests uses sample data in the project's 'Assets' folder.
 This folder has one testModel.waModel which has been used to generate 
 various dataXX.waData and journalXX.waJournal.
 
  Each couple dataXX and journalXX contains multiple of 5 records.
  data01 contains 5 records (1 to 5), data02 contains 10 records (1 to 10)...
  journal01 contains operations to create records 1 through 5
  journal02 contains operations to create records 6 through 10
  journal03 contains operations to create records 11 through 15...
  
  In theory, it is possible to integrate journal N into data N-1, in order to recreate data N.
  It is possible to repeat this process and integrate journal N through N+r in data N-1, after all
  journal have been integrated the resulting data file will be data N+r.
  
In order to regenerate the sample data:
 * unpack the 'genIntegrateDatajournalTestData.zip'.
 * ensure the genIntegrateDatajournalTestData project has empty 'DataFolder' and 'Backups' folders
 * start the solution in a server
 * run teh 'createTestData.js' file
 * In the Backups folder you will find the snapshots
 * In increasing order of time stamp:
   + ensure the first backup has only a datafolder, no journal, if so, copy the data.waData and rename it as data00.waData in the 'Assets' folder
   + for subsequent backups, in increasing timestamp order:
      - collect the data.waData and journal.waJournal
      - rename them dataNN.waData and journalNN.waJournal where NN is a numeric prefix starting from 01 and onwards
      - put those files in the Assets folder of this unit test project
 * when you're done, copy the project's model.waModel into 'Assets' and name it testMode.waModel
 
 Limitation: The tests cannot actually verify the correct number of records have been integrated because 
 it is not possible to create a datastore from a model and a data file and count the number of records
*/
 
var testCase = {
    name: "test integrateDataStore API",

    _should: {
        error: {
		},
		ignore: {
		//testSyntaxErrorNoParameters: true,
		//testSyntaxErrorNoJournalAndDataFileParameter: true,
		//testSyntaxErrorNoJournalParameter:true,
		//testSyntaxErrorModelDoesNotExists: true,
		//testSyntaxErrorDataDoesNotExists: true,
		//testSyntaxErrorJournalDoesNotExists: true,
		//testErrorIntegratingInCurrentData: true,
		//testIntegrateEarlyJournalFails: false,
		//testIntegrateLaterJournalFails: true,
		//testIntegrateJournal: true,
		//testIntegrateJournalInSequence: true,
		//testIntegrateJournalInInitialBackup: true
			
		}
	},

/*
* Sets up data that is needed by each test.
*/
	
	setUp: function() {
				
		if (os.isWindows) {
        //Win Stuff	
        	
		}
		else /*if (os.isLinux)*/ {
        	
		}
		

	},

/*
* Cleans up everything that was created by setUp().
*/
	tearDown: function() {

	},


/*
 *
 * Test methods for API SSJS integrateDataStoreJournal
 *
 */
	// 0 Test the API fails when no parameters are passed
	
	testSyntaxErrorNoParameters: function() {

		var exceptions = 0;
		var result = null;
		try{
			result = integrateDataStoreJournal();
		}
		
		catch(e){
			exceptions++;
		}
		
		finally{
			Y.Assert.isNull(result);	
			Y.Assert.areEqual(1,exceptions);
		}
	},
	
	// 1 Test the API fails if the journal and data file parameters are missing
	testSyntaxErrorNoJournalAndDataFileParameter: function() {

		var exceptions = 0;
		var result = null;
		var modelFile = new File(ds.getModelFolder().path+"model.waModel");
		try{
			
			result = integrateDataStoreJournal(modelFile);
		}
		
		catch(e){
			exceptions++;
		}
		
		finally{
			Y.Assert.isNull(result);	
			Y.Assert.areEqual(1,exceptions);
		}
	},
	// 2 Test the API fails if the journal parameter is missing
	testSyntaxErrorNoJournalParameter: function() {

		var exceptions = 0;
		var result = null;
		var modelFile = new File(ds.getModelFolder().path+"model.waModel");
		var dataFile = new File(ds.getDataFolder().path+"data.waData");
		try{
			result = integrateDataStoreJournal(modelFile,dataFile);
		}
		
		catch(e){
			exceptions++;
		}
		
		finally{
			Y.Assert.isNull(result);	
			Y.Assert.areEqual(1,exceptions);
		}
	},
	//Test the API fails with an exception if the model does not exists
	testSyntaxErrorModelDoesNotExists: function() {

		var exceptions = 0;
		var result = null;
		var modelFile = new File(ds.getModelFolder().path+"notavailable.waModel");
		var dataFile = new File(ds.getDataFolder().path+"data.waData");
		var journalFile = new File(ds.getDataFolder().path+"journal.waJournal");
		
		try{
			result = integrateDataStoreJournal(modelFile,dataFile,journalFile);
		}
		
		catch(e){
			exceptions++;
		}
		
		finally{
			Y.Assert.isNull(result);	
			Y.Assert.areEqual(1,exceptions);
		}
	},
	//Test the API fails with an exception if the data file does not exists
	testSyntaxErrorDataDoesNotExists: function() {

		var exceptions = 0;
		var result = null;
		var modelFile = new File(ds.getModelFolder().path+"model.waModel");
		var dataFile = new File(ds.getDataFolder().path+"notavailable.waData");
		var journalFile = new File(ds.getDataFolder().path+"journal.waJournal");
		
		try{
			result = integrateDataStoreJournal(modelFile,dataFile,journalFile);
		}
		
		catch(e){
			exceptions++;
		}
		
		finally{
			Y.Assert.isNull(result);	
			Y.Assert.areEqual(1,exceptions);
		}
	},
	//Test the API fails with an exception if the journal does not exists
	testSyntaxErrorJournalDoesNotExists: function() {

		var exceptions = 0;
		var result = null;
		var modelFile = new File(ds.getModelFolder().path+"model.waModel");
		var dataFile = new File(ds.getDataFolder().path+"data.waData");
		var journalFile = new File(ds.getDataFolder().path+"notavailable.waJournal");
		
		try{
			result = integrateDataStoreJournal(modelFile,dataFile,journalFile);
		}
		catch(e){
			exceptions++;
		}
		
		finally{
			Y.Assert.isNull(result);	
			Y.Assert.areEqual(1,exceptions);
		}
	},
	//Test the API fails with an exception if integrating in the current data file
	testErrorIntegratingInCurrentData: function() {

		var exceptions = 0;
		var result = null;
		
		var modelFile = new File(ds.getModelFolder().path+"model.waModel");
		var dataFile = new File(ds.getDataFolder().path+"data.waData");
		var journalFile = new File(ds.getDataFolder().path+"journal.waJournal");
		
		try{
			result = integrateDataStoreJournal(modelFile,dataFile,journalFile);
		}
		catch(e){
			exceptions++;
		}
		
		finally{
			Y.Assert.isNull(result);	
			Y.Assert.areEqual(1,exceptions);
		}
	},
	
	//Integrates journal N-1 in data file N fails
	testIntegrateEarlyJournalFails:function() {

		var exceptions = 0;
		var result = null;
		
		var assetsFolder = new Folder(application.getFolder("path",true) + "Assets");
		var modelFile = new File(assetsFolder.path+"testModel.waModel");
		var sourceDataFile = new File(assetsFolder.path+"data02.waData");
		var journalFile = new File(assetsFolder.path+"journal01.waJournal");
		var resultDataFile = new File(application.getFolder("path",true)+"result.waData");
		if (resultDataFile.exists){
			resultDataFile.remove();
		}
		sourceDataFile.copyTo(resultDataFile.path,true);
		
		try{
			result = integrateDataStoreJournal(modelFile,resultDataFile,journalFile);
		}
		catch(e){
			exceptions++;
		}
		
		finally{
			Y.Assert.isNull(result);	
			Y.Assert.areEqual(1,exceptions);
		}
	},
	//Integrates journal N+2 in data N, must fail
	testIntegrateLaterJournalFails:function() {

		var exceptions = 0;
		var result = null;
		
		var assetsFolder = new Folder(application.getFolder("path",true) + "Assets");
		var modelFile = new File(assetsFolder.path+"testModel.waModel");
		var sourceDataFile = new File(assetsFolder.path+"data01.waData");
		var journalFile = new File(assetsFolder.path+"journal03.waJournal");
		var resultDataFile = new File(application.getFolder("path",true)+"result.waData");
		if (resultDataFile.exists){
			resultDataFile.remove();
		}
		sourceDataFile.copyTo(resultDataFile.path,true);
		
		try{
			result = integrateDataStoreJournal(modelFile,resultDataFile,journalFile);
		}
		catch(e){
			exceptions++;
		}
		
		finally{
			Y.Assert.isNull(result);	
			Y.Assert.areEqual(1,exceptions);
		}
	},
	//Integrates the journal from the second backup into the first backup
	//Must pass. Added to ensure the first backup when creating a journal can be used for integration as well.
	testIntegrateJournalInInitialBackup:function() {

		var exceptions = 0;
		var result = null;
		
		var assetsFolder = new Folder(application.getFolder("path",true) + "Assets");
		var modelFile = new File(assetsFolder.path+"testModel.waModel");
		var sourceDataFile = new File(assetsFolder.path+"data00.waData");
		var journalFile = new File(assetsFolder.path+"journal01.waJournal");
		var resultDataFile = new File(application.getFolder("path",true)+"result.waData");
		if (resultDataFile.exists){
			resultDataFile.remove();
		}
		sourceDataFile.copyTo(resultDataFile.path,true);
		
		try{
			result = integrateDataStoreJournal(modelFile,resultDataFile,journalFile);
		}
		catch(e){
			exceptions++;
		}
		
		finally{
			Y.Assert.isNotNull(result);	
			Y.Assert.areEqual(0,exceptions);
		}
	},
	//Integrates journal N+1 in data N, must pass
	testIntegrateJournal:function() {

		var exceptions = 0;
		var result = null;
		
		var assetsFolder = new Folder(application.getFolder("path",true) + "Assets");
		var modelFile = new File(assetsFolder.path+"testModel.waModel");
		var sourceDataFile = new File(assetsFolder.path+"data01.waData");
		var journalFile = new File(assetsFolder.path+"journal02.waJournal");
		var resultDataFile = new File(application.getFolder("path",true)+"result.waData");
		if (resultDataFile.exists){
			resultDataFile.remove();
		}
		sourceDataFile.copyTo(resultDataFile.path,true);
		
		try{
			result = integrateDataStoreJournal(modelFile,resultDataFile,journalFile);
		}
		catch(e){
			exceptions++;
		}
		
		finally{
			Y.Assert.isNotNull(result);	
			Y.Assert.areEqual(0,exceptions);
		}
	},
	//Integrates journal 2 in data 1. Must pass. Then itnegrate journal 3 in resulting data. Must pass
	testIntegrateJournalInSequence:function() {

		var exceptions = 0;
		var result1,result2;
		
		var assetsFolder = new Folder(application.getFolder("path",true) + "Assets");
		var modelFile = new File(assetsFolder.path+"testModel.waModel");
		var sourceDataFile = new File(assetsFolder.path+"data01.waData");
		var journalFile1 = new File(assetsFolder.path+"journal02.waJournal");
		var journalFile2 = new File(assetsFolder.path+"journal03.waJournal");
		var resultDataFile = new File(application.getFolder("path",true)+"result.waData");
		var integrations = 0;
		if (resultDataFile.exists){
			resultDataFile.remove(); 
		}
		sourceDataFile.copyTo(resultDataFile.path,true);
		
		try{
			result1 = integrateDataStoreJournal(modelFile,resultDataFile,journalFile1);
			integrations++;
			result2 = integrateDataStoreJournal(modelFile,resultDataFile,journalFile2);
			integrations++;
		}
		catch(e){
			exceptions++;
		}
		
		finally{
			Y.Assert.isNotNull(result1);	
			Y.Assert.isNotNull(result2);	
			Y.Assert.areEqual(0,exceptions);
			Y.Assert.areEqual(2,integrations);
		}
	}
}

    /*
    //create the console
    (new Y.Test.Console({
        newestOnTop : false,
        filters: {
            pass: true,
            fail: true
        }
    })).render('#testLogger');

    Y.Test.Runner.add(Y.example.test.ExampleSuite);

    //run the tests
    Y.Test.Runner.run();
    */
    
  if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}
  
