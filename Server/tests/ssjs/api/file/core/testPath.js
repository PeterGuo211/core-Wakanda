/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/

// Test of path resolving and other general stuff
// @TODO : getURL() resolving too

var testCase = {
    name: "Path Resolving Test",
    
    _should: {
        ignore: {
            
        }
    },
    
    setUp : function () {
    	this.referencePath = File(getWalibFolder().path + 'Modules/unitTest/unitTest.js').path;
        if (!os.isWindows) {
            this._should.ignore.testBackslashCombinations = true;
        }
    },
 
    tearDown : function () {
       
    },

    testSingleDotCombinations: function () {
        var combinations = [
        	'./Modules/unitTest/unitTest.js',
        	'Modules/./unitTest/unitTest.js',
        	'Modules/unitTest/./unitTest.js',
        	'./Modules/./unitTest/unitTest.js',
        	'./Modules/unitTest/./unitTest.js',
        	'./Modules/./unitTest/./unitTest.js',
        	'././Modules/unitTest/unitTest.js',
        	'Modules/././unitTest/unitTest.js',
        	'Modules/unitTest/././unitTest.js',
        	'././Modules/unitTest/././unitTest.js',
        	'././Modules/././unitTest/././unitTest.js'
        ];
        for (var i = 0; i < combinations.length; i++) {
			var testPath = File(getWalibFolder().path + combinations[i]).path;
			Y.Assert.areSame(this.referencePath, testPath, 'Fail to properly resolve "' + combinations[i] + '"');
        }
    },

    testDoubleDotCombinations: function () {
        var combinations = [
        	'Modules/../Modules/unitTest/unitTest.js',
        	'Modules/../Modules/../Modules/unitTest/unitTest.js',
        	'Modules/../Modules/../Modules/../Modules/unitTest/unitTest.js',
        	'Modules/unitTest/../../Modules/unitTest/unitTest.js',
        	'Modules/unitTest/../../Modules/unitTest/../../Modules/unitTest/unitTest.js',
        	'Modules/unitTest/../../Modules/unitTest/../../Modules/unitTest/../../Modules/unitTest/unitTest.js'
        ];
        for (var i = 0; i < combinations.length; i++) {
			var testPath = File(getWalibFolder().path + combinations[i]).path;
			Y.Assert.areSame(this.referencePath, testPath, 'Fail to properly resolve "' + combinations[i] + '"');
        }
    },

    testSingleAndDoubleDotCombinations: function () {
        var combinations = [
        	'Modules/./../Modules/unitTest/unitTest.js',
        	'Modules/.././Modules/unitTest/unitTest.js',
        	'Modules/./../Modules/.././Modules/unitTest/unitTest.js',
        	'Modules/.././Modules/./../Modules/./.././Modules/unitTest/unitTest.js',
        	'Modules/unitTest/.././../Modules/unitTest/unitTest.js',
        	'Modules/unitTest/.././../Modules/unitTest/./../../Modules/unitTest/unitTest.js',
        	'Modules/unitTest/.././../Modules/unitTest/./../../Modules/unitTest/../.././Modules/unitTest/unitTest.js'
        ];
        for (var i = 0; i < combinations.length; i++) {
			var testPath = File(getWalibFolder().path + combinations[i]).path;
			Y.Assert.areSame(this.referencePath, testPath, 'Fail to properly resolve "' + combinations[i] + '"');
        }
    },

    testSlashCombinations: function () {
        var combinations = [
        	'Modules//unitTest/unitTest.js',
        	'Modules/unitTest//unitTest.js',
        	'Modules//unitTest//unitTest.js',
        	'Modules///unitTest/unitTest.js',
        	'Modules/unitTest///unitTest.js',
        	'Modules///unitTest//unitTest.js',
        	'Modules//unitTest///unitTest.js',
        	'Modules///unitTest///unitTest.js',
        	'/Modules//unitTest/unitTest.js',
        	'/Modules/unitTest//unitTest.js',
        	'/Modules//unitTest//unitTest.js',
        	'/Modules///unitTest/unitTest.js',
        	'/Modules/unitTest///unitTest.js',
        	'/Modules///unitTest//unitTest.js',
        	'/Modules//unitTest///unitTest.js',
        	'/Modules///unitTest///unitTest.js',
        	'//Modules//unitTest/unitTest.js',
        	'//Modules/unitTest//unitTest.js',
        	'//Modules//unitTest//unitTest.js',
        	'//Modules///unitTest/unitTest.js',
        	'//Modules/unitTest///unitTest.js',
        	'//Modules///unitTest//unitTest.js',
        	'//Modules//unitTest///unitTest.js',
        	'//Modules///unitTest///unitTest.js',
        	'///Modules/unitTest///unitTest.js',
        	'///Modules////unitTest//unitTest.js',
        	'///Modules//unitTest////unitTest.js',
        	'///Modules////unitTest////unitTest.js'
        ];
        for (var i = 0; i < combinations.length; i++) {
			var testPath = File(getWalibFolder().path + combinations[i]).path;
			Y.Assert.areSame(this.referencePath, testPath, 'Fail to properly resolve "' + combinations[i] + '"');
        }
    },

    testBackslashCombinations: function () {
        var combinations = [
        	'Modules\\unitTest/unitTest.js',
        	'Modules/unitTest\\unitTest.js',
        	'Modules\\unitTest\\unitTest.js'
        ];
        for (var i = 0; i < combinations.length; i++) {
			var testPath = File(getWalibFolder().path + combinations[i]).path;
			Y.Assert.areSame(this.referencePath, testPath, 'Fail to properly resolve "' + combinations[i] + '"');
        }
    },

    testOverallCombinations: function () {
        var combinations = [
        	'./Modules//..//Modules/unitTest/./unitTest.js',
        	'./Modules/.//../Modules////unitTest//unitTest.js',
        	'././Modules/.////unitTest/.//unitTest.js',
        	'./././Modules///unitTest//./../unitTest//./unitTest.js',
        	'/Modules//..//Modules/unitTest/././/unitTest.js',
        	'//Modules/.//../Modules////unitTest/unitTest.js',
        	'//./Modules/.////unitTest/.//unitTest.js',
        	'////Modules///unitTest//./../unitTest//./unitTest.js'
        ];
        if (os.isWindows) {
            combinations = combinations.concat([
                './Modules/.//../Modules////unitTest\\unitTest.js',
                './././Modules///unitTest//./../unitTest\\./unitTest.js',
                '/Modules//..//Modules/unitTest/./.\\unitTest.js',
                '//Modules/.//../Modules////unitTest\\unitTest.js'
            ]);
        }
        for (var i = 0; i < combinations.length; i++) {
			var testPath = File(getWalibFolder().path + combinations[i]).path;
			Y.Assert.areSame(this.referencePath, testPath, 'Fail to properly resolve "' + combinations[i] + '"');
        }
    }
};