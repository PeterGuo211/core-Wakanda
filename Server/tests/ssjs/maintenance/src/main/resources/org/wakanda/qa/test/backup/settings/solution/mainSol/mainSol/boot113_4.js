
// Journal desactivated
// Case: getLastBackups() method

var testSolutionName = "mainSol";
var projectPath = getFolder().path+"../../"+testSolutionName+"/"+testSolutionName+"/";

ds.backup();

var manifests = getLastBackups();

var version = process.version;


var file = File(projectPath + "myFile.txt");
var stream = TextStream(file, "write");  // open the stream in write mode

stream.write(manifests[0].date+"\n");
stream.write(version.substring(version.length-6)+"\n");

stream.close(); // do not forget to close the stream



