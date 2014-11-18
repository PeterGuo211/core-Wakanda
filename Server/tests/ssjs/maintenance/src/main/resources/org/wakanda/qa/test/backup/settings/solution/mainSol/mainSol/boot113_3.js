
// Journal desactivated
// Case: getLastBackups() method

var testSolutionName = "mainSol";
var projectPath = getFolder().path+"../../"+testSolutionName+"/"+testSolutionName+"/";
for(var i = 0 ; i<9 ; i++){
	ds.backup();
}
var manifests = getLastBackups();


var file = File(projectPath + "myFile.txt");
var stream = TextStream(file, "write");  // open the stream in write mode
stream.write(manifests.length+"\n");
for(var i = 0 ; i<manifests.length ; i++){
		stream.write(manifests[i].path+"\n");
		stream.write(manifests[i].dataFolder+"\n");
		stream.write(manifests[i].journal+"\n");
		stream.write(manifests[i].date+"\n");
		stream.write(manifests[i].version+"\n");
}

stream.close(); // do not forget to close the stream



