// Journal desactivated
// Case: backup with default paramters

var testSolutionName = "Untitled663";
var projectPath = getFolder().path+"../../"+testSolutionName+"/"+testSolutionName+"/";

function myOpenProgress(title, maxElements)
     {
         console.log(title+" on "+maxElements+" operations"); // log the progress events
     }

    function myProgress(curOp, maxElements)
    {
        console.log("current element: "+curOp);  // log each operation
            // events can be nested
    }
    
    function myCloseProgress()
    {
        // add code to handle the closing of the progress event
    }
    
    function myAddProblem(problem)
    {
        if (problem.ErrorLevel <= 2) // we only handle fatal or regular errors
        {
            this.storedProblems.push(problem);  // fill the custom array
            console.log(problem.ErrorText);  // log the error description
        }
    }
    
    var modelFile = File(projectPath + "Model.waModel");
    var modelData = File(projectPath + "DataFolder/data.waData");

	
    var config = {
        destination:Folder(projectPath+"Backups/"),
        useUniqueNames:true, 
        backupRegistryFolder: Folder(projectPath+"Backups/")
        };
        
    
    var options = {
        'openProgress': myOpenProgress,
        'closeProgress': myCloseProgress,
        'progress': myProgress,            
        'addProblem': myAddProblem,
        
            // you can add any custom code here, it will be passed to the 
            // addProblem function in the 'this' keyword
        'storedProblems':[]   // we add an array to store any problems that arise
        };
    if(modelFile.exits && modelData.exits)
    	var manifest = backupDataStore(modelFile, modelData, config, options); 
    else
    	modelFile.path;
