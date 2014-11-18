

// Journal desactivated
// Case: backup with default paramters

var testSolutionName = "mainSol";
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
    useUniqueNames:true, 
    backupRegistryFolder: Folder(projectPath+"MyBackups/")
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
    
var manifest = backupDataStore(modelFile, modelData, config, options); 
//var file = new ActiveXObject("Scripting.FileSystemObject"); 
//var a = file.CreateTextFile("C:\\a\\testfile.txt", true); 
//a.WriteLine("Salut cppFrance !"); 
//a.Close();
//var contact =CN.stringify(contact, memberfilter, "\t");
//var file = File(projectPath + "myFile.txt");
//var stream = TextStream(file, "write");  // open the stream in write mode
//stream.write(manifest); // append the message to the end of stream
//stream.close(); // do not forget to close the stream

var memberfilter = new Array();
memberfilter[0] = "type";
memberfilter[1] = "name";
memberfilter[2] = "nameNoExt";
memberfilter[3] = "extension";
memberfilter[4] = "path";
memberfilter[5] = "exists";
memberfilter[6] = "visible";
memberfilter[7] = "readOnly";
memberfilter[8] = "creationDate";
memberfilter[9] = "lastModifiedDate";

var jsonText = JSON.stringify(manifest, memberfilter, "\t");
var file = File(projectPath +"Backups/" + "myFile.txt");
var stream = TextStream(file, "write");  // open the stream in write mode
stream.write(jsonText);
stream.close(); // do not forget to close the stream


