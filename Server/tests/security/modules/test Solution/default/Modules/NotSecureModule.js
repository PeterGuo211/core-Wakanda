/*	The helloWorld() function can be executed from any of your project's server-side JavaScript file using the require() method as follows:
	var result = require('NotSecureModule').helloWorld();

	For more information, refer to http://doc.wakanda.org/Wakanda Studio0.Beta/help/Title/en/page3355.html
*/
exports.defaultAccess = function defaultAccess (inFirst, inLast) {
	return inFirst + " " +inLast;
};

exports.defaultAccessSecured = function defaultAccessSecured (inFirst, inLast) {
	return inFirst + " " +inLast;
};