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

/**
 * @author sebastien.courvoisier@4d.com
 */
 
var testCase = {
	
	name: 'WAF RPC API simple tests',
	
    testRPCTestModuleExists: function () {
		Y.Assert.areNotSame('undefined', typeof test);  
		Y.Assert.areSame('object', typeof test);
    },
    	
    testRPCTestModuleMethodsExist: function () {
		Y.Assert.areSame('function', typeof test.addition, 'test.addition should be a function');
		Y.Assert.areSame('function', typeof test.soustraction, 'test.soustraction should be a function');
		Y.Assert.areSame('function', typeof test.nop, 'test.nop should be a function');
		Y.Assert.areSame('function', typeof test.mirror, 'test.mirror should be a function');
        Y.Assert.areSame('function', typeof test.oops, 'test.oops should be a function');
        Y.Assert.areSame('function', typeof test.inType, 'test.inType should be a function');
        Y.Assert.areSame('function', typeof test.outType, 'test.outType should be a function');
    },

    testRPCTestModuleAsyncMethodsExist: function () {
        Y.Assert.areSame('function', typeof test.additionAsync, 'test.additionAsync should be a function');
        Y.Assert.areSame('function', typeof test.soustractionAsync, 'test.soustractionAsync should be a function');
        Y.Assert.areSame('function', typeof test.nopAsync, 'test.nopAsync should be a function');
        Y.Assert.areSame('function', typeof test.mirrorAsync, 'test.mirrorAsync should be a function');
        Y.Assert.areSame('function', typeof test.oopsAsync, 'test.oopsAsync should be a function');
        Y.Assert.areSame('function', typeof test.inTypeAsync, 'test.inTypeAsync should be a function');
        Y.Assert.areSame('function', typeof test.outTypeAsync, 'test.outTypeAsync should be a function');
    },

    testRPCNotestModuleDoesNotExist: function () {
		Y.Assert.areSame('undefined', typeof notest);  
    },
    	
    testRPCNotestModuleMethodsDoNotExist: function () {
		if (typeof notest !== 'undefined') {
            Y.Assert.areSame('undefined', typeof notest.notok, 'notest.notok should be undefined');
            Y.Assert.areSame('undefined', typeof notest.notokAsync, 'notest.notokAsync should be undefined');
        }
    },

    testRPCTestModuleNotokMethodDoesNotExist: function () {
		Y.Assert.areSame('undefined', typeof test.notok, 'test.notok should be undefined');
        Y.Assert.areSame('undefined', typeof test.notokAsync, 'test.notokAsync should be undefined');
    },

    testRPCTestModuleAdditionMethodLogicSync1: function () {
		Y.Assert.areSame(6, test.addition(1, 2, 3));
    },

    testRPCTestModuleAdditionMethodLogicSync2: function () {
		Y.Assert.areSame('123', test.addition('1', '2', '3'));
    },

    testRPCTestModuleAdditionMethodLogicSync3: function () {
		Y.Assert.areSame('1bc', test.addition(1, 'b', 'c'));
    },

    testRPCTestModuleAdditionMethodLogicSync4: function () {
		Y.Assert.isNull(test.addition(1, 2));
    },

    testRPCTestModuleAdditionMethodLogicSync5: function () {
		Y.Assert.isNull(test.addition(1));
    },

    testRPCTestModuleAdditionMethodLogicSync6: function () {
		Y.Assert.isNull(test.addition());
    },

    testRPCTestModuleSoustractionMethodLogicSync1: function () {
		Y.Assert.areSame(-4, test.soustraction(1, 2, 3));
    },

    testRPCTestModuleSoustractionMethodLogicSync2: function () {
		Y.Assert.areSame(-4, test.soustraction('1', '2', '3'));
    },

    testRPCTestModuleSoustractionMethodLogicSync3: function () {
		Y.Assert.isNull(test.soustraction(1, 'b', 'c')); // JSON doesn't handle NaN, returns null (OK)
    },

    testRPCTestModuleSoustractionMethodLogicSync4: function () {
		Y.Assert.isNull(test.soustraction(1, 2));
    },

    testRPCTestModuleSoustractionMethodLogicSync5: function () {
		Y.Assert.isNull(test.soustraction(1));
    },

    testRPCTestModuleSoustractionMethodLogicSync6: function () {
		Y.Assert.isNull(test.soustraction());
    },

    testRPCTestModuleNopMethodLogicSync1: function () {
		Y.Assert.areSame('nop', test.nop());
    },

    testRPCTestModuleNopMethodLogicSync2: function () {
		Y.Assert.areSame('nop', test.nop(1, 'b', 'c'));
    },

    testRPCTestModuleMirrorMethodLogicSync1: function () {
		Y.Assert.areSame('pon', test.mirror('nop'));
    },

    testRPCTestModuleMirrorMethodLogicSync2: function () {
		Y.Assert.areSame('321', test.mirror(123));
    },

    testRPCTestModuleMirrorMethodLogicSync3: function () {
		Y.Assert.areSame('321', test.mirror(123, 'b', 'c'));
    },

    testRPCTestModuleMirrorMethodLogicSync4: function () {
		Y.Assert.areSame('', test.mirror(''));
    },

    testRPCTestModuleMirrorMethodLogicSync5: function () {
		Y.Assert.isNull(test.mirror());
    },

    testRPCTestModuleMirrorMethodLogicSync6: function () {
		Y.Assert.isNull(test.mirror(null));
    },

    testRPCTestModuleAdditionMethodLogicAsync1: function () {
        var testRunner = this;
        test.additionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(6, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1, 2, 3]
        });
        testRunner.wait();        
    },

    testRPCTestModuleAdditionMethodLogicAsync2: function () {
        var testRunner = this;
        test.additionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('123', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['1', '2', '3']
        });
        testRunner.wait();
    },

    testRPCTestModuleAdditionMethodLogicAsync3: function () {
        var testRunner = this;
        test.additionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('1bc', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1, 'b', 'c']
        });
        testRunner.wait();
    },

    testRPCTestModuleAdditionMethodLogicAsync4: function () {
        var testRunner = this;
        test.additionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNull(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1, 2]
        });
        testRunner.wait();
    },

    testRPCTestModuleAdditionMethodLogicAsync5: function () {
        var testRunner = this;
        test.additionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNull(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1]
        });
        testRunner.wait();
    },

    testRPCTestModuleAdditionMethodLogicAsync6: function () {
        var testRunner = this;
        test.additionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNull(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: []
        });
        testRunner.wait();
    },

    testRPCTestModuleAdditionMethodLogicAsync7: function () {
        var testRunner = this;
        test.additionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNull(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            }
        });
        testRunner.wait();
    },

    testRPCTestModuleSoustractionMethodLogicAsync1: function () {
        var testRunner = this;
        test.soustractionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(-4, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1, 2, 3]
        });
        testRunner.wait();
    },

    testRPCTestModuleSoustractionMethodLogicAsync2: function () {
        var testRunner = this;
        test.soustractionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(-4, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['1', '2', '3']
        });
        testRunner.wait();
    },

    testRPCTestModuleSoustractionMethodLogicAsync3: function () {
        var testRunner = this;
        test.soustractionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNull(result); // JSON doesn't handle NaN, returns null (OK)
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1, 'b', 'c']
        });
        testRunner.wait();
    },

    testRPCTestModuleSoustractionMethodLogicAsync4: function () {
        var testRunner = this;
        test.soustractionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNull(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1, 2]
        });
        testRunner.wait();
    },

    testRPCTestModuleSoustractionMethodLogicAsync5: function () {
        var testRunner = this;
        test.soustractionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNull(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1]
        });
        testRunner.wait();
    },

    testRPCTestModuleSoustractionMethodLogicAsync6: function () {
        var testRunner = this;
        test.soustractionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNull(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: []
        });
        testRunner.wait();
    },

    testRPCTestModuleSoustractionMethodLogicAsync7: function () {
        var testRunner = this;
        test.soustractionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNull(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            }
        });
        testRunner.wait();
    },

    testRPCTestModuleNopMethodLogicAsync1: function () {
        var testRunner = this;
        test.nopAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('nop', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: []
        });
        testRunner.wait();
    },

    testRPCTestModuleNopMethodLogicAsync2: function () {
        var testRunner = this;
        test.nopAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('nop', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1, 'b', 'c']
        });
        testRunner.wait();
    },

    testRPCTestModuleNopMethodLogicAsync3: function () {
        var testRunner = this;
        test.nopAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('nop', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            }
        });
        testRunner.wait();
    },

    testRPCTestModuleMirrorMethodLogicAsync1: function () {
        var testRunner = this;
        test.mirrorAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('pon', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['nop']
        });
        testRunner.wait();
    },

    testRPCTestModuleMirrorMethodLogicAsync2: function () {
        var testRunner = this;
        test.mirrorAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('321', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [123]
        });
        testRunner.wait();
    },

    testRPCTestModuleMirrorMethodLogicAsync3: function () {
        var testRunner = this;
        test.mirrorAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('321', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [123, 'b', 'c']
        });
        testRunner.wait();
    },

    testRPCTestModuleMirrorMethodLogicAsync4: function () {
        var testRunner = this;
        test.mirrorAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['']
        });
        testRunner.wait();
    },

    testRPCTestModuleMirrorMethodLogicAsync5: function () {
        var testRunner = this;
        test.mirrorAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNull(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: []
        });
        testRunner.wait();
    },

    testRPCTestModuleMirrorMethodLogicAsync6: function () {
        var testRunner = this;
        test.mirrorAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNull(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [null]
        });
        testRunner.wait();
    },

    testRPCTestModuleMirrorMethodLogicAsync7: function () {
        var testRunner = this;
        test.mirrorAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNull(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            }
        });
        testRunner.wait();
    },

    testRPCTestModuleAdditionMethodLogicSyncEqualsAsync1: function () {
        var syncResult = test.addition(1, 2, 3);
        var testRunner = this;
        test.additionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1, 2, 3]
        });
        testRunner.wait();
    },

    testRPCTestModuleAdditionMethodLogicSyncEqualsAsync2: function () {
        var syncResult = test.addition('1', '2', '3');
        var testRunner = this;
        test.additionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['1', '2', '3']
        });
        testRunner.wait();
    },

    testRPCTestModuleAdditionMethodLogicSyncEqualsAsync3: function () {
        var syncResult = test.addition(1, 'b', 'c');
        var testRunner = this;
        test.additionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1, 'b', 'c']
        });
        testRunner.wait();
    },

    testRPCTestModuleAdditionMethodLogicSyncEqualsAsync4: function () {
        var syncResult = test.addition(1, 2);
        var testRunner = this;
        test.additionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1, 2]
        });
        testRunner.wait();
    },

    testRPCTestModuleAdditionMethodLogicSyncEqualsAsync5: function () {
        var syncResult = test.addition(1);
        var testRunner = this;
        test.additionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1]
        });
        testRunner.wait();
    },

    testRPCTestModuleAdditionMethodLogicSyncEqualsAsync6: function () {
        var syncResult = test.addition();
        var testRunner = this;
        test.additionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: []
        });
        testRunner.wait();
    },

    testRPCTestModuleSoustractionMethodLogicSyncEqualsAsync1: function () {
        var syncResult = test.soustraction(1, 2, 3);
        var testRunner = this;
        test.soustractionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1, 2, 3]
        });
        testRunner.wait();
    },

    testRPCTestModuleSoustractionMethodLogicSyncEqualsAsync2: function () {
        var syncResult = test.soustraction('1', '2', '3');
        var testRunner = this;
        test.soustractionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['1', '2', '3']
        });
        testRunner.wait();
    },

    testRPCTestModuleSoustractionMethodLogicSyncEqualsAsync3: function () {
        var syncResult = test.soustraction(1, 'b', 'c');
        var testRunner = this;
        test.soustractionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1, 'b', 'c']
        });
        testRunner.wait();
    },

    testRPCTestModuleSoustractionMethodLogicSyncEqualsAsync4: function () {
        var syncResult = test.soustraction(1, 2);
        var testRunner = this;
        test.soustractionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1, 2]
        });
        testRunner.wait();
    },

    testRPCTestModuleSoustractionMethodLogicSyncEqualsAsync5: function () {
        var syncResult = test.soustraction(1);
        var testRunner = this;
        test.soustractionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1]
        });
        testRunner.wait();
    },

    testRPCTestModuleSoustractionMethodLogicSyncEqualsAsync6: function () {
        var syncResult = test.soustraction();
        var testRunner = this;
        test.soustractionAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: []
        });
        testRunner.wait();
    },

    testRPCTestModuleNopMethodLogicSyncEqualsAsync1: function () {
        var syncResult = test.nop();
        var testRunner = this;
        test.nopAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: []
        });
        testRunner.wait();
    },

    testRPCTestModuleNopMethodLogicSyncEqualsAsync2: function () {
        var syncResult = test.nop(1, 'b', 'c');
        var testRunner = this;
        test.nopAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [1, 'b', 'c']
        });
        testRunner.wait();
    },

    testRPCTestModuleMirrorMethodLogicSyncEqualsAsync1: function () {
        var syncResult = test.mirror('nop');
        var testRunner = this;
        test.mirrorAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['nop']
        });
        testRunner.wait();
    },

    testRPCTestModuleMirrorMethodLogicSyncEqualsAsync2: function () {
        var syncResult = test.mirror(123);
        var testRunner = this;
        test.mirrorAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [123]
        });
        testRunner.wait();
    },

    testRPCTestModuleMirrorMethodLogicSyncEqualsAsync3: function () {
        var syncResult = test.mirror(123, 'b', 'c');
        var testRunner = this;
        test.mirrorAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [123, 'b', 'c']
        });
        testRunner.wait();
    },

    testRPCTestModuleMirrorMethodLogicSyncEqualsAsync4: function () {
        var syncResult = test.mirror('');
        var testRunner = this;
        test.mirrorAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['']
        });
        testRunner.wait();
    },

    testRPCTestModuleMirrorMethodLogicSyncEqualsAsync5: function () {
        var syncResult = test.mirror();
        var testRunner = this;
        test.mirrorAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: []
        });
        testRunner.wait();
    },

    testRPCTestModuleMirrorMethodLogicSyncEqualsAsync6: function () {
        var syncResult = test.mirror(null);
        var testRunner = this;
        test.mirrorAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame(syncResult, result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [null]
        });
        testRunner.wait();
    },

    testRPCErrorHandlingSync1: function () {
        try {
            test.oops();
            Y.Assert.fail('test.oops() call should have thrown an error.');
        }
        catch (e) {
            Y.Assert.areSame('Something bad happened :-(', e.data);
        }
    },

    testRPCErrorHandlingAsync1: function () {
        var testRunner = this;
        test.oopsAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.fail('test.oopsAsync() call should have thrown an error.');
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.areSame('Something bad happened :-(', error.data);
                });
            }
        });
        testRunner.wait();
    },

    testRPCErrorHandlingSync2: function () {
        try {
            test.oops2();
            Y.Assert.fail('test.oops2() call should have thrown an error.');
        }
        catch (e) {
            Y.Assert.areSame('Something bad happened :-(', e.data.message);
            Y.Assert.areSame(42, e.data.code);
            Y.Assert.areSame('UserException', e.data.name);
        }
    },

    testRPCErrorHandlingAsync2: function () {
        var testRunner = this;
        test.oops2Async({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.fail('test.oops2Async() call should have thrown an error.');
                });
            },
            onError: function (error) {
                testRunner.resume(function() {
                    Y.Assert.areSame('Something bad happened :-(', error.data.message);
                    Y.Assert.areSame(42, error.data.code);
                    Y.Assert.areSame('UserException', error.data.name);
                });
            }
        });
        testRunner.wait();
    },

    testRPCInputTypeStringSync1: function () {
        Y.Assert.areSame('string', test.inType('foo'));        
    },

    testRPCInputTypeStringSync2: function () {
        Y.Assert.areSame('string', test.inType('42'));        
    },

    testRPCInputTypeStringSync3: function () {
        Y.Assert.areSame('string', test.inType('true'));        
    },

    testRPCInputTypeStringSync4: function () {
        Y.Assert.areSame('string', test.inType('false'));        
    },

    testRPCInputTypeStringSync5: function () {
        Y.Assert.areSame('string', test.inType('null'));        
    },

    testRPCInputTypeStringSync6: function () {
        Y.Assert.areSame('string', test.inType(''));        
    },

    testRPCInputTypeNumberSync1: function () {
        Y.Assert.areSame('number', test.inType(42));        
    },

    testRPCInputTypeNumberSync2: function () {
        Y.Assert.areSame('number', test.inType(3.14));        
    },

    testRPCInputTypeNumberSync3: function () {
        Y.Assert.areSame('number', test.inType(0));        
    },

    testRPCInputTypeNumberSync4: function () {
        Y.Assert.areSame('number', test.inType(-1));        
    },

    testRPCInputTypeBooleanSync1: function () {
        Y.Assert.areSame('boolean', test.inType(true));        
    },

    testRPCInputTypeBooleanSync2: function () {
        Y.Assert.areSame('boolean', test.inType(false));        
    },

    testRPCInputTypeObjectSync1: function () {
        Y.Assert.areSame('object', test.inType(null));        
    },

    testRPCInputTypeObjectSync2: function () {
        Y.Assert.areSame('object', test.inType({ foo: 'bar' }));        
    },

    testRPCInputTypeObjectSync3: function () {
        Y.Assert.areSame('object', test.inType({ }));        
    },

    testRPCInputTypeObjectSync4: function () {
        Y.Assert.areSame('object', test.inType([1, 2, 3]));        
    },

    testRPCInputTypeObjectSync5: function () {
        Y.Assert.areSame('object', test.inType([ ]));        
    },

    testRPCInputTypeObjectSync6: function () {
        Y.Assert.areSame('string', test.inType(new Date()));        
    },

    testRPCInputTypeFunctionSync1: function () {
        Y.Assert.areSame('object', test.inType(function () {}));        
    },

    testRPCInputTypeFunctionSync2: function () {
        Y.Assert.areSame('object', test.inType(Math.sin));        
    },

    testRPCInputTypeUndefinedSync1: function () {
        Y.Assert.areSame('undefined', test.inType());        
    },

    testRPCOutputTypeStringSync1: function () {
        Y.Assert.isString(test.outType('string'));        
    },

    testRPCOutputTypeNumberSync1: function () {
        Y.Assert.isNumber(test.outType('number'));        
    },

    testRPCOutputTypeBooleanSync1: function () {
        Y.Assert.isBoolean(test.outType('boolean'));        
    },

    testRPCOutputTypeObjectSync1: function () {
        Y.Assert.isObject(test.outType('object'));        
    },

    testRPCOutputTypeFunctionSync1: function () {
        Y.Assert.isNull(test.outType('function'));        
    },

    testRPCOutputTypeNullSync1: function () {
        Y.Assert.isNull(test.outType('nop'));        
    },

    testRPCInputTypeStringAsync1: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('string', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['foo']
        });
        testRunner.wait();    
    },

    testRPCInputTypeStringAsync2: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('string', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['42']
        });
        testRunner.wait();
    },

    testRPCInputTypeStringAsync3: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('string', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['true']
        });
        testRunner.wait();       
    },

    testRPCInputTypeStringAsync4: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('string', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['false']
        });
        testRunner.wait();        
    },

    testRPCInputTypeStringAsync5: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('string', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['null']
        });
        testRunner.wait();  
    },

    testRPCInputTypeStringAsync6: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('string', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['']
        });
        testRunner.wait();     
    },

    testRPCInputTypeNumberAsync1: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('number', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [42]
        });
        testRunner.wait();   
    },

    testRPCInputTypeNumberAsync2: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('number', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [3.14]
        });
        testRunner.wait();        
    },

    testRPCInputTypeNumberAsync3: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('number', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [0]
        });
        testRunner.wait();        
    },

    testRPCInputTypeNumberAsync4: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('number', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [-1]
        });
        testRunner.wait();       
    },

    testRPCInputTypeBooleanAsync1: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('boolean', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [true]
        });
        testRunner.wait();       
    },

    testRPCInputTypeBooleanAsync2: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('boolean', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [false]
        });
        testRunner.wait();      
    },

    testRPCInputTypeObjectAsync1: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('object', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [null]
        });
        testRunner.wait();      
    },

    testRPCInputTypeObjectAsync2: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('object', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [{ foo: 'bar' }]
        });
        testRunner.wait();      
    },

    testRPCInputTypeObjectAsync3: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('object', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [{ }]
        });
        testRunner.wait();  
    },

    testRPCInputTypeObjectAsync4: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('object', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [[1, 2, 3]]
        });
        testRunner.wait();       
    },

    testRPCInputTypeObjectAsync5: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('object', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [[ ]]
        });
        testRunner.wait();       
    },

    testRPCInputTypeObjectAsync6: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('string', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [new Date()]
        });
        testRunner.wait();    
    },

    testRPCInputTypeFunctionAsync1: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('object', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [function () {}]
        });
        testRunner.wait();      
    },

    testRPCInputTypeFunctionAsync2: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('object', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: [Math.sin]
        });
        testRunner.wait();        
    },

    testRPCInputTypeUndefinedAsync1: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('undefined', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: []
        });
        testRunner.wait();      
    },

    testRPCInputTypeUndefinedAsync2: function () {
        var testRunner = this;
        test.inTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.areSame('undefined', result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            }
        });
        testRunner.wait();      
    },

    testRPCOutputTypeStringAsync1: function () {
        var testRunner = this;
        test.outTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isString(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['string']
        });
        testRunner.wait(); 
    },

    testRPCOutputTypeNumberAsync1: function () {
        var testRunner = this;
        test.outTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNumber(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['number']
        });
        testRunner.wait();       
    },

    testRPCOutputTypeBooleanAsync1: function () {
        var testRunner = this;
        test.outTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isBoolean(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['boolean']
        });
        testRunner.wait();       
    },

    testRPCOutputTypeObjectAsync1: function () {
        var testRunner = this;
        test.outTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isObject(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['object']
        });
        testRunner.wait();     
    },

    testRPCOutputTypeFunctionAsync1: function () {
        var testRunner = this;
        test.outTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNull(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['function']
        });
        testRunner.wait();      
    },

    testRPCOutputTypeNullAsync1: function () {
        var testRunner = this;
        test.outTypeAsync({
            onSuccess: function (result) {
                testRunner.resume(function() {
                    Y.Assert.isNull(result);
                });
            },
            onError: function (error) {
                testRunner.resume(function() { 
                    Y.Assert.fail('Async call failed: ' + JSON.stringify(error));
                });
            },
            params: ['nop']
        });
        testRunner.wait();       
    }
};