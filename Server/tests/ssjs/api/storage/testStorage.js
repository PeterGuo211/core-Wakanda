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
var e, error = 0,
	objectStorage = {
		"test0": 'result0'
	},
	StorageObject, arrayStorage = ["test0", "test1", "test2"],
	StorageArray, array2DStorage = ["test0", ["test_0"], "test1"],
	StorageArray2D, stringStorage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit." + "Curabitur volutpat enim nec orci rhoncus id fringilla arcu lacinia." + "Integer nec purus eu est rutrum pharetra non non nulla.",
	StorageString, integerStorage = 42,
	StorageInteger, doubleStorage = 1.1,
	StorageDouble, booleanStorage = true,
	StorageBoolean, nullStorage = null,
	StorageNull, undefinedStorage = undefined,
	StorageUndefined, NaNStorage = 1 / undefined,
	StorageNaN, infinityStorage = Infinity,
	StorageInfinity, blobStorage = new Blob(20, 88, "application/octet-stream"),
	StorageBlob, BlobStorageToString = blobStorage.toString(),
	StorageBlobToString, BlobStorageToBuffer = blobStorage.toBuffer(),
	StorageBlobToBuffer, bufferStorage = new Buffer(16 * 1024),
	StorageBuffer;
//DataStore, add all element in a storage
//DataSource, add all variable in a storage 
//Folder
//File 
//HTTP Request Handler
//HTTP Server 
//Images 
//User and Group, Session
//System Worker 
//Worker 
function count() {
	var counter = 0;
	for (var p in this) { 
		if (this.hasOwnProperty(p))++counter;
	}
	return counter;
}
var testCase = {
	name: "test API Storage",
	_should: {
		error: {},
		ignore: {}
	},
	/*
	 * Sets up data that is needed by each test.
	 */
	setUp: function() {
		exceptions = 0;
		if (os.isWindows) {
			//Win Stuff	
		} else if (os.isLinux) {
			//Linux Stuff	
		} else {
			//MAC Stuff
		}
	},
	/*
	 * Cleans up everything that was created by setUp().
	 */
	tearDown: function() {
		try {
			storage.clear();
			application.storage.clear();
		} catch (e) {
			return e;
		};
	},
	/*
	 *
	 * Test methods for API SSJS Storage
	 *
	 */
	// 0 --**-- Object Storage exist
	testStorage_ObjectStorageExist_0: function() {
		var result = typeof storage;
		Y.Assert.areSame("object", result);
	},
	// 1 --**-- Object application.storage exist
	testStorage_ObjectApplicationStorageExist_1: function() {
		var result = typeof application.storage;
		Y.Assert.areSame("object", result);
	},
	// 2 --**-- Object storage.clear() exist
	testStorage_ObjectStorageClearExist_2: function() {
		var result = typeof storage.clear;
		Y.Assert.areSame("function", result);
	},
	// 3 --**-- Object storage.getItem() exist
	testStorage_ObjectStorageGetItemExist_3: function() {
		var result = typeof storage.getItem;
		Y.Assert.areSame("function", result);
	},
	// 4 --**-- Object storage.key() exist
	testStorage_ObjectStorageKeyExist_4: function() {
		var result = typeof storage.key;
		Y.Assert.areSame("function", result);
	},
	// 5 --**-- Object storage.lock() exist
	testStorage_ObjectStorageLock_Exist_5: function() {
		var result = typeof storage.lock;
		Y.Assert.areSame("function", result);
	},
	// 6 --**-- Object storage.removeItem() exist
	testStorage_ObjectStorageRemoveItemExist_6: function() {
		var result = typeof storage.removeItem;
		Y.Assert.areSame("function", result);
	},
	// 7 --**-- Object storage.setItem() exist
	testStorage_ObjectStorageSetItemExist_7: function() {
		var result = typeof storage.setItem;
		Y.Assert.areSame("function", result);
	},
	// 8 --**-- Object storage.tryLock() exist
	testStorage_ObjectStorageTryLockExist_8: function() {
		var result = typeof storage.tryLock;
		Y.Assert.areSame("function", result);
	},
	// 9 --**-- Object storage.unlock() exist
	testStorage_ObjectStorageUnlockExist_9: function() {
		var result = typeof storage.unlock;
		Y.Assert.areSame("function", result);
	},
	// 10 --**-- Storage an Object with "storage"
	testStorage_AddObjectStorage_10: function() {
		storage.StorageObject = objectStorage;
		var result = typeof storage.StorageObject;
		Y.Assert.areEqual("object", result);
	},
	// 11 --**-- Storage an Object with "application.storage"
	testStorage_AddObjectApplicationStorage_11: function() {
		application.storage.StorageObject = objectStorage;
		var result = typeof application.storage.StorageObject;
		Y.Assert.areEqual("object", result);
	},
	// 12 --**-- Storage an Object is Object?
	testStorage_StorageObjectIsObject_12: function() {
		storage.StorageObject = objectStorage;
		Y.Assert.isObject(storage.StorageObject);
	},
	// 13 --**-- Storage an Object which contain "test0"
	testStorage_StorageObjectContainTest0_13: function() {
		storage.StorageObject = objectStorage;
		var result = storage.StorageObject.test0;
		Y.Assert.areEqual("result0", result);
	},
	// 14 --**-- Storage an object counter
	testStorage_StorageObjectCounter_14: function() {
		storage.StorageObject = objectStorage;
		var result = count.call(storage.StorageObject);
		Y.Assert.areEqual(count.call(objectStorage), result);
	},
	// 15 --**-- Storage an array with "storage"
	testStorage_AddArrayStorage_15: function() {
		storage.StorageArray = arrayStorage;
		var result = typeof storage.StorageArray;
		Y.Assert.areEqual("object", result);
	},
	// 16 --**-- Storage an array with "application.storage"
	testStorage_AddArrayApplicationStorage_16: function() {
		application.storage.StorageArray = arrayStorage;
		var result = typeof application.storage.StorageArray;
		Y.Assert.areEqual("object", result);
	},
	// 17 --**-- Storage an array is array?
	testStorage_StorageArrayisArray_17: function() {
		storage.StorageArray = arrayStorage;
		Y.Assert.isArray(storage.StorageArray);
	},
	// 18 --**-- Storage an array length
	testStorage_StorageArrayLength_18: function() {
		storage.StorageArray = arrayStorage;
		var result = storage.StorageArray.length;
		Y.Assert.areEqual(arrayStorage.length, result);
	},
	// 19 --**-- Storage a string with "storage"
	testStorage_AddStringStorage_19: function() {
		storage.StorageString = stringStorage;
		var result = typeof storage.StorageString;
		Y.Assert.areEqual("string", result);
	},
	// 20 --**-- Storage a string with "application.storage"
	testStorage_AddStringApplicationStorage_20: function() {
		application.storage.StorageString = stringStorage;
		var result = typeof application.storage.StorageString;
		Y.Assert.areEqual("string", result);
	},
	// 21 --**-- Storage a string is string?
	testStorage_StorageStringisString_21: function() {
		storage.StorageString = stringStorage;
		Y.Assert.isString(storage.StorageString);
	},
	// 22 --**-- Storage a string length
	testStorage_StorageStringLength_22: function() {
		storage.StorageString = stringStorage;
		var result = storage.StorageString.length;
		Y.Assert.areEqual(stringStorage.length, result);
	},
	// 23 --**-- Storage an Integer with "storage"
	testStorage_AddIntegerStorage_23: function() {
		storage.StorageInteger = integerStorage;
		var result = typeof storage.StorageInteger;
		Y.Assert.areEqual("number", result);
	},
	// 24 --**-- Storage an Integer with "application.storage"
	testStorage_AddIntegerApplicationStorage_24: function() {
		application.storage.StorageInteger = integerStorage;
		var result = typeof application.storage.StorageInteger;
		Y.Assert.areEqual("number", result);
	},
	// 25 --**-- Storage an Integer is number
	testStorage_StorageIntegerIsNumber_25: function() {
		storage.StorageInteger = integerStorage;
		Y.Assert.isNumber(storage.StorageInteger);
	},
	// 26 --**-- Storage an Integer compare Value
	testStorage_StorageIntegerValue_26: function() {
		storage.StorageInteger = integerStorage;
		var result = storage.StorageInteger;
		Y.Assert.areEqual(integerStorage, result);
	},
	// 27 --**-- Storage a double with "storage"
	testStorage_AddDoubleStorage_27: function() {
		storage.StorageDouble = doubleStorage;
		var result = typeof storage.StorageDouble;
		Y.Assert.areEqual("number", result);
	},
	// 28 --**-- Storage a double with "application.storage"
	testStorage_AddDoubleApplicationStorage_28: function() {
		application.storage.StorageDouble = doubleStorage;
		var result = typeof application.storage.StorageDouble;
		Y.Assert.areEqual("number", result);
	},
	// 29 --**-- Storage a double is Number
	testStorage_StorageDoubleisNumber_29: function() {
		storage.StorageDouble = doubleStorage;
		Y.Assert.isNumber(doubleStorage);
	},
	// 30 --**-- Storage a double compare Value
	testStorage_StorageDoubleLength_30: function() {
		storage.StorageDouble = doubleStorage;
		var result = storage.StorageDouble;
		Y.Assert.areEqual(doubleStorage, result);
	},
	// 31 --**-- Storage a boolean with "storage"
	testStorage_AddStorageBoolean_31: function() {
		storage.StorageBoolean = booleanStorage;
		var result = typeof storage.StorageBoolean;
		Y.Assert.areEqual("boolean", result);
	},
	// 32 --**-- Storage a boolean with "application.storage"
	testStorage_AddBooleanApplicationStorage_32: function() {
		application.storage.StorageBoolean = booleanStorage;
		var result = typeof application.storage.StorageBoolean;
		Y.Assert.areEqual("boolean", result);
	},
	// 33 --**-- Storage a boolean is boolean
	testStorage_StorageBooleanisBoolean_33: function() {
		storage.StorageBoolean = booleanStorage;
		Y.Assert.isBoolean(true);
	},
	// 34 --**-- Storage a blob with "storage"
	testStorage_AddStorageBlob_34: function() {
		storage.StorageBlob = blobStorage;
		var result = typeof storage.StorageBlob;
		Y.Assert.areEqual("object", result);
	},
	// 35 --**-- Storage a blob with "application.storage"
	testStorage_AddStorageBlob_35: function() {
		application.storage.StorageBlob = blobStorage;
		var result = typeof application.storage.StorageBlob;
		Y.Assert.areEqual("object", result);
	},
	// 36 --**-- Storage a blob is object
	testStorage_StorageBlobisObject_36: function() {
		storage.StorageBlob = blobStorage;
		Y.Assert.isObject(storage.StorageBlob);
	},
	// 37 --**-- Storage a blob which contain size
	testStorage_StorageBlobContainSize_37: function() {
		storage.StorageBlob = blobStorage;
		var result = storage.StorageBlob.size;
		Y.Assert.areEqual(blobStorage.size, result);
	},
	// 38 --**-- Storage a blob which contain Type
	testStorage_StorageBlobContainType_38: function() {
		storage.StorageBlob = blobStorage;
		var result = storage.StorageBlob.type;
		Y.Assert.areEqual(blobStorage.type, result);
	},
	// 39 --**-- Storage a blob counter
	testStorage_StorageBlobCounter_39: function() {
		storage.StorageBlob = blobStorage;
		var result = count.call(storage.StorageBlob);
		Y.Assert.areEqual(count.call(blobStorage), result);
	},
	// 40 --**-- Storage a blob to String
	testStorage_StorageBlobToString_40: function() {
		storage.StorageBlobToString = BlobStorageToString;
		var result = storage.StorageBlobToString;
		Y.Assert.areEqual(BlobStorageToString, result);
	},
	// 41 --**-- Storage a blob to Buffer
	testStorage_StorageBlobToBuffer_41: function() {
		storage.StorageBlobToBuffer = BlobStorageToBuffer;
		var result = storage.StorageBlobToBuffer.length;
		Y.Assert.areEqual(BlobStorageToBuffer.length, result);
	},
	// 42 --**-- Storage a buffer with "storage"
	testStorage_AddStorageBuffer_42: function() {
		storage.StorageBuffer = bufferStorage;
		var result = typeof storage.StorageBuffer;
		Y.Assert.areEqual("object", result);
	},
	// 43 --**-- Storage a buffer with "application.storage"
	testStorage_AddApplicationStorageBuffer_43: function() {
		application.storage.StorageBuffer = bufferStorage;
		var result = typeof application.storage.StorageBuffer;
		Y.Assert.areEqual("object", result);
	},
	// 44 --**-- Storage a buffer is object
	testStorage_StorageBufferisObject_44: function() {
		storage.StorageBuffer = bufferStorage;
		Y.Assert.isObject(storage.StorageBuffer);
	},
	// 45 --**-- Storage a buffer Value
	testStorage_StorageBufferValue_45: function() {
		storage.StorageBuffer = bufferStorage;
		var result = storage.StorageBuffer.length;
		Y.Assert.areEqual(bufferStorage.length, result);
	},
	// 46 --**-- Storage an Array 1 Dimension with "storage"
	testStorage_AddStorageArray1D_46: function() {
		storage.StorageArray2D = array2DStorage;
		var result = typeof storage.StorageArray2D;
		Y.Assert.areEqual("object", result);
	},
	// 47 --**-- Storage an Array 2 Dimensional with "application.storage"
	testStorage_AddApplicationStorageArray2D_47: function() {
		application.storage.StorageArray2D = array2DStorage;
		var result = typeof application.storage.StorageArray2D;
		Y.Assert.areEqual("object", result);
	},
	// 48 --**-- Storage an Array 2 Dimensional is array
	testStorage_StorageArray2DisArray_48: function() {
		storage.StorageArray2D = array2DStorage;
		Y.Assert.isArray(storage.StorageArray2D);
	},
	// 49 --**-- Storage an Array 2 Dimensional length
	testStorage_StorageArray2DLength_49: function() {
		storage.StorageArray2D = array2DStorage;
		var result = storage.StorageArray2D.length;
		Y.Assert.areEqual(array2DStorage.length, result);
	},
	// 50 --**-- Storage an Array 2 Dimensional Value in 1 D
	testStorage_StorageArray2DValue1D_50: function() {
		storage.StorageArray2D = array2DStorage;
		var result = storage.StorageArray2D[0];
		Y.Assert.areEqual(array2DStorage[0], result);
	},
	// 51 --**-- Storage an Array 2 Dimensional Value in 2 D
	testStorage_StorageArray2DValue2D_51: function() {
		storage.StorageArray2D = array2DStorage;
		var result = storage.StorageArray2D[1][0];
		Y.Assert.areEqual(array2DStorage[1][0], result);
	},
	// 52 --**-- Storage an undefined
	testStorage_StorageUndefined_52: function() {
		storage.StorageUndefined = undefinedStorage;
		var result = storage.StorageUndefined;
		Y.Assert.isUndefined(result);
	},
	// 53 --**-- Storage a null 
	testStorage_StorageNull_53: function() {
		storage.StorageNull = nullStorage;
		var result = storage.StorageNull;
		Y.Assert.isNull(result);
	},
	// 54 --**-- Storage a NaN 
	testStorage_StorageNaN_54: function() {
		storage.StorageNaN = NaNStorage;
		var result = storage.StorageNaN;
		Y.Assert.isNaN(result);
	},
	// 55 --**-- Storage an Infinity 
	testStorage_StorageInfinity_55: function() {
		storage.StorageInfinity = infinityStorage;
		var result = storage.StorageInfinity;
		Y.Assert.areEqual(infinityStorage, result);
	},
	// 56 --**-- GetItem Object 
	testStorage_GetItemObject_56: function() {
		storage.StorageObject = objectStorage;
		var getObject = storage.getItem('StorageObject');
		result = getObject.test0;
		Y.Assert.areEqual(objectStorage.test0, result);
	},
	// 57 --**-- SetItem Object 
	testStorage_SetItemObject_57: function() {
		storage.StorageObject = objectStorage;
		var getItemObject = storage.getItem('StorageObject');
		getItemObject.test0 = 'result1';
		storage.setItem("StorageObject", getItemObject);
		var getNewItemObject = storage.getItem('StorageObject');
		result = getNewItemObject.test0;
		Y.Assert.areEqual("result1", result);
	},
	// 58 --**-- GetItem Array 1D
	testStorage_GetItemArray1D_58: function() {
		storage.StorageArray = arrayStorage;
		var getItemArray1D = storage.getItem('StorageArray');
		result = getItemArray1D[0];
		Y.Assert.areEqual(arrayStorage[0], result);
	},
	// 59 --**-- SetItem Array 1D
	testStorage_SetItemArray1D_59: function() {
		storage.StorageArray = arrayStorage;
		var getItemArray = storage.getItem('StorageArray');
		getItemArray[0] = 'test1';
		storage.setItem('StorageArray', getItemArray);
		var getNewItemArray = storage.getItem('StorageArray');
		result = getNewItemArray[0];
		Y.Assert.areEqual("test1", result);
	},
	// 60 --**-- GetItem Array 2D
	testStorage_SetItemArray2D_60: function() {
		storage.Storage2DArray = array2DStorage;
		var getItemArray2D = storage.getItem('Storage2DArray');
		result = getItemArray2D[1][0];
		Y.Assert.areEqual(array2DStorage[1][0], result);
	},
	// 61 --**-- SetItem Array 2D
	testStorage_SetItemArray2D_61: function() {
		storage.Storage2DArray = array2DStorage;
		var getItemArray = storage.getItem('Storage2DArray');
		getItemArray[1][0] = 'test1';
		storage.setItem('Storage2DArray', getItemArray);
		var getNewItemArray = storage.getItem('Storage2DArray');
		result = getNewItemArray[1][0];
		Y.Assert.areEqual("test1", result);
	},
	// 62 --**-- GetItem String
	testStorage_GetItemString_62: function() {
		storage.StorageString = stringStorage;
		var getItemString = storage.getItem('StorageString');
		result = getItemString;
		Y.Assert.areEqual(stringStorage, result);
	},
	// 63 --**-- SetItem String
	testStorage_SetItemString_63: function() {
		storage.StorageString = stringStorage;
		var getItemString = storage.getItem('StorageString');
		getItemString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + "Curabitur volutpat enim nec orci rhoncus id fringilla arcu lacinia." + "Integer nec purus eu est rutrum pharetra non non nulla." + "Curabitur volutpat enim nec orci rhoncus id fringilla arcu lacinia." + "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
		storage.setItem('StorageString', getItemString);
		var getNewItemString = storage.getItem('StorageString');
		result = getItemString;
		Y.Assert.areEqual("Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + "Curabitur volutpat enim nec orci rhoncus id fringilla arcu lacinia." + "Integer nec purus eu est rutrum pharetra non non nulla." + "Curabitur volutpat enim nec orci rhoncus id fringilla arcu lacinia." + "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", result);
	},
	// 64 --**-- GetItem Integer
	testStorage_GetItemInteger_64: function() {
		storage.StorageInteger = integerStorage;
		var getItemInteger = storage.getItem('StorageInteger');
		result = getItemInteger;
		Y.Assert.areEqual(integerStorage, result);
	},
	// 65 --**-- SetItem Integer
	testStorage_SetItemInteger_65: function() {
		storage.StorageInteger = integerStorage;
		var getItemInteger = storage.getItem('StorageInteger');
		getItemInteger = 43;
		storage.setItem('StorageInteger', getItemInteger);
		var getNewItemInteger = storage.getItem('StorageInteger');
		result = getNewItemInteger;
		Y.Assert.areEqual(43, result);
	},
	// 66 --**-- GetItem Double
	testStorage_GetItemDouble_66: function() {
		storage.StorageDouble = doubleStorage;
		var getItemDouble = storage.getItem('StorageDouble');
		result = getItemDouble;
		Y.Assert.areEqual(doubleStorage, result);
	},
	// 67 --**-- SetItem Double
	testStorage_SetItemDouble_67: function() {
		storage.StorageDouble = doubleStorage;
		var getItemDouble = storage.getItem('StorageDouble');
		getItemDouble = 666.999;
		storage.setItem('StorageDouble', getItemDouble);
		var getNewItemDouble = storage.getItem('StorageDouble');
		result = getNewItemDouble;
		Y.Assert.areEqual(666.999, result);
	},
	// 68 --**-- GetItem Boolean
	testStorage_GetItemBoolean_68: function() {
		storage.StorageBoolean = booleanStorage;
		var getItemBoolean = storage.getItem('StorageBoolean');
		result = getItemBoolean;
		Y.Assert.areEqual(booleanStorage, result);
	},
	// 69 --**-- SetItem Boolean
	testStorage_SetItemBoolean_69: function() {
		storage.StorageBoolean = booleanStorage;
		var getItemBoolean = storage.getItem('StorageBoolean');
		getItemBoolean = false;
		storage.setItem('StorageBoolean', getItemBoolean);
		var getNewItemBoolean = storage.getItem('StorageBoolean');
		result = getNewItemBoolean;
		Y.Assert.areEqual(false, result);
	},
	// 70 --**-- GetItem Blob
	testStorage_GetItemBlob_70: function() {
		storage.StorageBlob = blobStorage;
		var getItemBlob = storage.getItem('StorageBlob');
		result = getItemBlob.size;
		Y.Assert.areEqual(blobStorage.size, result);
	},
	// 71 --**-- SetItem Blob
	testStorage_SetItemBlob_71: function() {
		storage.StorageBlob = blobStorage;
		var getItemBlob = storage.getItem('StorageBlob');
		getItemBlob.size = 30;
		storage.setItem('StorageBlob', getItemBlob);
		var getNewItemBlob = storage.getItem('StorageBlob');
		result = getNewItemBlob.size;
		Y.Assert.areEqual(30, result);
	},
	// 72 --**-- GetItem Buffer
	testStorage_GetItemBuffer_72: function() {
		storage.StorageBuffer = bufferStorage;
		var getItemBuffer = storage.getItem('StorageBuffer');
		result = getItemBuffer.length;
		Y.Assert.areEqual(bufferStorage.length, result);
	},
	// 73 --**-- SetItem Buffer
	testStorage_SetItemBuffer_73: function() {
		storage.StorageBuffer = bufferStorage;
		var getItemBuffer = storage.getItem('StorageBuffer');
		getItemBuffer.length = 20 * 1024;
		storage.setItem('StorageBuffer', getItemBuffer);
		var getNewItemBuffer = storage.getItem('StorageBuffer');
		result = getNewItemBuffer.length;
		Y.Assert.areEqual(20 * 1024, result);
	},
	// 74 --**-- RemoveItem Object
	testStorage_removeItemObject_74: function() {
		storage.StorageObject = objectStorage;
		var removeItemObject = storage.removeItem('StorageObject');
		var getItemObject = storage.getItem('StorageObject');
		result = getItemObject;
		Y.Assert.areEqual(null, result);
	},
	// 75 --**-- RemoveItem Array 1D
	testStorage_removeItemArray1D_75: function() {
		storage.StorageArray = arrayStorage;
		var removeItemArray1D = storage.removeItem('StorageArray');
		var getItemArray1D = storage.getItem('StorageArray');
		result = getItemArray1D;
		Y.Assert.areEqual(null, result);
	},
	// 76 --**-- RemoveItem Array 2D
	testStorage_removeItemArray2D_76: function() {
		storage.StorageArray2D = array2DStorage;
		var removeItemArray2D = storage.removeItem('StorageArray2D');
		var getItemArray2D = storage.getItem('StorageArray2D');
		result = getItemArray2D;
		Y.Assert.areEqual(null, result);
	},
	// 77 --**-- RemoveItem Array 2D
	testStorage_removeItemArray2D_77: function() {
		storage.StorageArray = arrayStorage;
		var removeItemArray2D = storage.removeItem('StorageArray2D');
		var getItemArray2D = storage.getItem('StorageArray2D');
		result = getItemArray2D;
		Y.Assert.areEqual(null, result);
	},
	// 78 --**-- RemoveItem String
	testStorage_removeItemString_78: function() {
		storage.StorageString = stringStorage;
		var removeItemString = storage.removeItem('StorageString');
		var getItemString = storage.getItem('StorageString');
		result = getItemString;
		Y.Assert.areEqual(null, result);
	},
	// 79 --**-- RemoveItem Integer
	testStorage_removeItemInteger_79: function() {
		storage.StorageInteger = integerStorage;
		var removeItemInteger = storage.removeItem('StorageInteger');
		var getItemInteger = storage.getItem('StorageInteger');
		result = getItemInteger;
		Y.Assert.areEqual(null, result);
	},
	// 80 --**-- RemoveItem Double
	testStorage_removeItemDouble_80: function() {
		storage.StorageDouble = doubleStorage;
		var removeItemDouble = storage.removeItem('StorageDouble');
		var getItemDouble = storage.getItem('StorageDouble');
		result = getItemDouble;
		Y.Assert.areEqual(null, result);
	},
	// 81 --**-- RemoveItem Boolean
	testStorage_removeItemDouble_81: function() {
		storage.StorageBoolean = booleanStorage;
		var removeItemBoolean = storage.removeItem('StorageBoolean');
		var getItemBoolean = storage.getItem('StorageBoolean');
		result = getItemBoolean;
		Y.Assert.areEqual(null, result);
	},
	// 82 --**-- RemoveItem Blob
	testStorage_removeItemBlob_82: function() {
		storage.StorageBlob = blobStorage;
		var removeItemBlob = storage.removeItem('StorageBlob');
		var getItemBlob = storage.getItem('StorageBlob');
		result = getItemBlob;
		Y.Assert.areEqual(null, result);
	},
	// 83 --**-- RemoveItem Buffer
	testStorage_removeItemBuffer_83: function() {
		storage.StorageBuffer = bufferStorage;
		var removeItemBuffer = storage.removeItem('StorageBuffer');
		var getItemBuffer = storage.getItem('StorageBuffer');
		result = getItemBuffer;
		Y.Assert.areEqual(null, result);
	},
	// 84 --**-- Get the all key Value
	testStorage_KeyExist_84: function() {
		//Key(0)
		storage.StorageObject = objectStorage;
		//Key(1)
		storage.StorageArray = arrayStorage;
		//Key(2)
		storage.StorageArray2D = array2DStorage;
		//Key(3)
		storage.StorageString = stringStorage;
		//Key(4)
		storage.StorageInteger = integerStorage;
		//Key(5)
		storage.StorageDouble = doubleStorage;
		//Key(6)
		storage.StorageBoolean = booleanStorage;
		//Key(7)
		storage.StorageBlob = blobStorage;
		//Key(8)
		storage.StorageBuffer = bufferStorage;
		for (var i = 0; i < storage.length; i++) {
			Y.Assert.isNotNull(storage.key(i));
		};
	},
	// 85 --**-- Get a null key with an empty storage
	testStorage_KeyReturnNull_85: function() {
		Y.Assert.isNull(storage.key(0));
	},
	// 86 --**-- Key must return the name of the key
	testStorage_KeyReturnKeyName_86: function() {
		storage.setItem('test0', 'test1');
		var result = storage.key(0);
		Y.Assert.areEqual('test0', result);
	},
	// 87 --**-- Clear the Storage
	testStorage_StorageClear_87: function() {
		storage.StorageObject = objectStorage;
		storage.StorageArray = arrayStorage;
		storage.StorageArray2D = array2DStorage;
		storage.StorageString = stringStorage;
		storage.StorageInteger = integerStorage;
		storage.StorageDouble = doubleStorage;
		storage.StorageBoolean = booleanStorage;
		storage.StorageBlob = blobStorage;
		storage.StorageBuffer = bufferStorage;
		storage.clear();
		for (var i = 0; i < storage.length; i++) {
			Y.Assert.isNull(storage.key(i));
		};
	},
	// 88 --**-- Clear the Storage since Application
	testStorage_applicationStorageClear_88: function() {
		storage.StorageObject = objectStorage;
		storage.StorageArray = arrayStorage;
		storage.StorageArray2D = array2DStorage;
		storage.StorageString = stringStorage;
		storage.StorageInteger = integerStorage;
		storage.StorageDouble = doubleStorage;
		storage.StorageBoolean = booleanStorage;
		storage.StorageBlob = blobStorage;
		storage.StorageBuffer = bufferStorage;
		application.storage.clear();
		for (var i = 0; i < storage.length; i++) {
			Y.Assert.isNull(storage.key(i));
		};
	}
	//To do : test with a WebWorker for this lock(); and unlock();
};
/*
    //create the console
    (new Y.Test.Console({
        newestOnTop : false,
        filters: {
            pass: true,
            fail: true
        }
    })).render('#testLogger');

    Y.Test.Runner.add(Y.example.test.ExampleSuite);

    //run the tests
    Y.Test.Runner.run();
    */
if (typeof dontRequireUnitTest === 'undefined') {
	require("unitTest").run(testCase).getReport();
}
