
//

var journalPath = getFolder("path")+"journal.waJournal";
var v13JournalPath = getFolder("path")+"journalv13.journal";
var tableDefs = getFolder("path")+"tableDefinition.WakTDef";

var nonExistingJournalPath = getFolder("path")+"journal_"+Date.now()+".waJournal";
var journalDump = getFolder("path")+"journal.waTxt";

var someDataCreated = false;

/**
 * Unit tests for parseJournal()
 */
function MySleep(delayInMs){
	var doSleep = function(){
		exitWait();
	}
    setTimeout(doSleep,1000);
    wait();
}

function hasTableNameProperty(operations){
	var ok = true;
	for(var i=0;i <operations.length && ok; i++){
		if (operations[i].hasOwnProperty("tableID")){
			ok = operations[i].hasOwnProperty("tableName")
		}
	}
	return ok;
}

var testCase = {
     name: "Coverage tests for parseJournal",
     
    _should: {
		error: {
			
		},
		ignore: {
		
			testParseJournalShallReturnEmptyArrayForJournalLessApplication: true,
			testParseJournalShallOperateOnCurrentApplicationByDefault: false,
			testParseJournalWithJournalPropertyAsString: false,
			testParseJournalWithJournalPropertyFile: false,
			testParseJournalWithJournalPropertyFileAndTableDefinitionPropertyAsString: false,
    		testParseJournalWithJournalPropertyFileAndTableDefinitionPropertyAsFile:false,
    		testParseJournalWithJournalPropertyFileAsStringAndTableDefinitionPropertyAsFile:false,
    		testParseJournalWithNonExistingJournal: false,
    		testParseJournalWithNonExistingJournalAsFile: false,
    		testParseJournalWithOldLogFormatAsString:false,
    		testParseJournalWithOldLogFormatAsFile:false
		}
    },
	 setUp : function () {
		
    	if (os.isWindows) {
    	}
    	else if (os.isLinux) {
    	}
		else {
			//MAC
		}
		if(!someDataCreated){
			for(var i = 0; i < 100;i++){
				var item = new ds.DataClass1({Name: "DataClass1_item_"+Date.now()});
				item.save();
			}
			someDataCreated = true;
		}
    },
 
    tearDown : function () {
    },
    
    testParseJournalShallReturnEmptyArrayForJournalLessApplication: function () {
		var operations = null;
		var exceptions = 0;
		var exceptionText = "";
		
		
		
		try{
			operations = parseJournal();
		}
		
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}

		Y.Assert.isNotNull(operations,"No operations returned");
		Y.Assert.isArray(operations,"Not an array returned");
		Y.Assert.areEqual(0,operations.length,"Not an array returned");
    },
    
    testParseJournalShallOperateOnCurrentApplicationByDefault: function () {
		var operations = null;
		var exceptions = 0;
		var exceptionText = "";
		
		
		try{
			operations = parseJournal();
		}
		
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}

		Y.Assert.isNotNull(operations,"No operations returned");
		Y.Assert.isArray(operations,"Not an array returned");
		Y.Assert.isTrue(hasTableNameProperty(operations),"tableName property not found");
    },
    
    //----------------------------------------------------------------------------------------------
    //Functional requirement: parseJournal shall be capable of operating on a specific journal file
    //----------------------------------------------------------------------------------------------
    testParseJournalWithJournalPropertyAsString: function () {
    	//journal property can be a path string
		var operations = null;
		var exceptions = 0;
		var exceptionText = "";
		
		
		
		try{
			operations = parseJournal({journal:journalPath});
		}
		
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}

		
		Y.Assert.isNotNull(operations,"No operations returned");
		Y.Assert.isArray(operations,"Not an array returned");
		Y.Assert.isFalse(hasTableNameProperty(operations),"tableName property not found");
    },
    
    testParseJournalWithJournalPropertyFile: function () {
		//journal property can be a File object
		var operations = null;
		var exceptions = 0;
		var exceptionText = "";
		
		try{
			operations = parseJournal({journal:File(journalPath)});
		}
		
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}

		Y.Assert.isNotNull(operations,"No operations returned");
		Y.Assert.isArray(operations,"Not an array returned");
		Y.Assert.isFalse(hasTableNameProperty(operations),"tableName property not found");
    },
    
    testParseJournalWithJournalPropertyFileAndTableDefinitionPropertyAsString: function () {
    	//journal property can be a File object
    	//tableDefinition property can be a path string
    	
		var operations = null;
		var exceptions = 0;
		var exceptionText = "";
		
		
		
		try{
			operations = parseJournal({journal:File(journalPath),tableDefinition:tableDefs});
		}
		
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}

		
		Y.Assert.isNotNull(operations,"No operations returned");
		Y.Assert.isArray(operations,"Not an array returned");
		Y.Assert.isTrue(hasTableNameProperty(operations),"tableName property not found");
    },
    testParseJournalWithJournalPropertyFileAndTableDefinitionPropertyAsFile: function () {
    	//journal property can be a File object
    	//tableDefinition property can be a File object
		var operations = null;
		var exceptions = 0;
		var exceptionText = "";
		
		
		
		try{
			operations = parseJournal({journal:File(journalPath),tableDefinition:File(tableDefs)});
		}
		
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}

		
		Y.Assert.isNotNull(operations,"No operations returned");
		Y.Assert.isArray(operations,"Not an array returned");
		Y.Assert.isTrue(hasTableNameProperty(operations),"tableName property not found");
    },
    testParseJournalWithJournalPropertyFileAsStringAndTableDefinitionPropertyAsFile: function () {
    	//journal property can be a File object
    	//tableDefinition property can be a string path
		var operations = null;
		var exceptions = 0;
		var exceptionText = "";
		
		try{
			operations = parseJournal({journal:journalPath,tableDefinition:tableDefs});
		}
		
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}

		
		Y.Assert.isNotNull(operations,"No operations returned");
		Y.Assert.isArray(operations,"Not an array returned");
		Y.Assert.isTrue(hasTableNameProperty(operations),"tableName property not found");
    },
    testParseJournalWithNonExistingJournal: function () {
		var operations = null;
		var exceptions = 0;
		var exceptionText = "";
		
		var expectedExceptionText="File \""+File(nonExistingJournalPath).name+"\" not found ("+nonExistingJournalPath+")";
		
		
		try{
			operations = parseJournal({journal:nonExistingJournalPath});
		}
		
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}

		Y.Assert.isNull(operations,"Some operations returned");
		Y.Assert.areEqual(expectedExceptionText,exceptionText,"Exception text");
    },
    testParseJournalWithNonExistingJournalAsFile: function () {
		var operations = null;
		var exceptions = 0;
		var exceptionText = "";
		
		var expectedExceptionText="File \""+File(nonExistingJournalPath).name+"\" not found ("+nonExistingJournalPath+")";
		
		
		try{
			operations = parseJournal({journal:File(nonExistingJournalPath)});
		}
		
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}

		
		Y.Assert.isNull(operations,"Some operations returned");
		Y.Assert.areEqual(expectedExceptionText,exceptionText,"Exception text");
    },
    testParseJournalWithOldLogFormatAsString: function () {
		var operations = null;
		var exceptions = 0;
		var exceptionText = "";
		
		var expectedExceptionText="Invalid journal path: "+v13JournalPath;
		
		
		try{
			operations = parseJournal({journal:v13JournalPath});
		}
		
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}

		
		Y.Assert.isNull(operations,"Some operations returned");
		Y.Assert.areEqual(expectedExceptionText,exceptionText,"Exception text");
    },
    testParseJournalWithOldLogFormatAsFile: function () {
		var operations = null;
		var exceptions = 0;
		var exceptionText = "";
		
		var expectedExceptionText="Invalid journal path: "+v13JournalPath;
		
		
		try{
			operations = parseJournal({journal:File(v13JournalPath)});
		}
		
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}

		
		Y.Assert.isNull(operations,"Some operations returned");
		Y.Assert.areEqual(expectedExceptionText,exceptionText,"Exception text");
    }
    
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}
