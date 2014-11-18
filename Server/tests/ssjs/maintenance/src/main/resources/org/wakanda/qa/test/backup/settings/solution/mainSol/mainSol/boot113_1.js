
// Journal desactivated
// Case: getLastBackups() method

var testSolutionName = "mainSol";
var projectPath = getFolder().path+"../../"+testSolutionName+"/"+testSolutionName+"/";


    
var manifests = getLastBackups();



var file = File(projectPath + "myFile.txt");
var stream = TextStream(file, "write");  // open the stream in write mode

stream.write(""+typeof manifests+"\n");
stream.write(""+manifests.length);

stream.close(); // do not forget to close the stream



