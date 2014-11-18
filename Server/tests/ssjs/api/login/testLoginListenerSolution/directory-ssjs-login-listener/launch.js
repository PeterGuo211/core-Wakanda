/**

* @author admin

*/

var pathToTest = application.getFolder("path") + "test-local.js";
pathToTest;
require("unitTest").run(pathToTest).getReport();