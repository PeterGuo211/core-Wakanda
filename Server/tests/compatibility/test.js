var testCase = {
    name: "SSJS Compatibility Test",

	_should: {
        ignore: {
        }
    },
    
    //1- Basic...
    testCompatibilityBasic: function () {
        Y.Assert.areSame(true, true);
    },

    //2- File constructor
    testCompatibilityFileConstructor: function () {
        var file_classic = File(application.getFolder("path") + "WebFolder/index.html");
        var file_new = new File(application.getFolder("path") + "WebFolder/index.html");
        Y.Assert.isTrue(file_classic.exists, "File with classic constructor does not exist.");
        Y.Assert.isTrue(file_new.exists, "File with new constructor does not exist.");
        Y.Assert.areSame(file_new.path, file_classic.path, "File paths are not the same.");
    }
};