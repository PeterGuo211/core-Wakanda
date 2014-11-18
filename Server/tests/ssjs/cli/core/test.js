var unitTest = require('unitTest');
var env = unitTest.getenv();
if (typeof env.WORKSPACE === 'undefined') env.WORKSPACE = process.userDocuments.path;
var objectsToBeInaccessible = ['administrator', 'application', 'dataService', 'directory', 'ds', 'httpServer', 'name', 'rpcService', 'sessionStorage', 'settings', 'solution', 'storage', 'webAppService', 'window', 'addHttpRequestHandler', 'createDataStore', 'currentSession', 'currentUser', 'getDataStore', 'getFolder', 'getItemsWithRole', 'getProgressIndicator', 'getSettingFile', 'loginByKey', 'loginByPassword', 'logout', 'ProgressIndicator', 'removeHttpRequestHandler'];
var objectsToBeAccessible = ['console', 'os', 'process', 'BinaryStream', 'Buffer', 'clearInterval', 'clearTimeout', 'close', 'dateToIso', 'displayNotification', 'exitWait', 'File', 'Folder', 'garbageCollect', 'generateUUID', 'getURLPath', 'getURLQuery', 'include', 'isoToDate', 'JSONToXml', 'loadImage', 'loadText', 'require', 'saveText', 'setInterval', 'setTimeout', 'SharedWorker', 'SystemWorker', 'TextStream', 'wait', 'Worker', 'XMLHttpRequest', 'XmlToJSON', 'getWalibFolder'];
var objectsToBeInaccessibleIndex = 0;
var objectsToBeAccessibleIndex = 0;
var testCase = {
    name: 'CLI Test',
    _should: {
        ignore: {

        }
    },
    setUp : function () {
    	console.log('setUp');
    },
    tearDown : function () {
    	console.log('tearDown');
    }
};
for (var i = 0; i < objectsToBeInaccessible.length; i++) {
    testCase['test_' + objectsToBeInaccessible[i] + '_ShouldBeInaccessible'] = function () {
        var index = objectsToBeInaccessibleIndex;
        var result = 'unknown';
        objectsToBeInaccessibleIndex++;
        eval('result = typeof ' + objectsToBeInaccessible[index] + ';');
        if (result === 'function') {
            // Well, OK, but should return null or undefined or throw an exception...
            var errorThrown = false;
            var result = 'unknown';
            var resultType = 'unknown';
            try {
                eval('result = ' + objectsToBeInaccessible[index] + '();');
                eval('resultType = typeof ' + objectsToBeInaccessible[index] + '();');
            }
            catch (e) {
                errorThrown = true;
            }
            if (errorThrown === false) {
                try {
                    Y.Assert.isNull(result, objectsToBeInaccessible[index] + ' should be inaccessible or disabled.');
                }
                catch (e) {
                    Y.Assert.areSame('undefined', resultType, objectsToBeInaccessible[index] + ' should be inaccessible or disabled.');
                }
            }
        }
        else {
            Y.Assert.areSame('undefined', result, objectsToBeInaccessible[index] + ' should be inaccessible or disabled.');
        }
    };
}
for (var i = 0; i < objectsToBeAccessible.length; i++) {
    testCase['test_' + objectsToBeAccessible[i] + '_ShouldBeAccessible'] = function () {
        var index = objectsToBeAccessibleIndex;
        var result = 'unknown';
        objectsToBeAccessibleIndex++;
        eval('result = typeof ' + objectsToBeAccessible[index] + ';');
        Y.Assert.areNotSame('undefined', result, objectsToBeAccessible[index] + ' should be accessible.');
    };
}
unitTest.run(testCase).getXmlReport(env.WORKSPACE + '/report.xml');
exitWait();