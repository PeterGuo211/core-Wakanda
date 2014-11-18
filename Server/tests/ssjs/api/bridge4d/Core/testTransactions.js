var testCase = {
    name: "Bridge Wakanda-4D TU_Triggers",
    _wait: {
		before : 15000,
		after: 15000
	},
    _should: {
		error: {
			
		},
		ignore: {
			
		}
    },
    
    setUp : function () {
    	/*
        if (os.isWindows) {
    	}
    	if (os.isLinux) {
    	}
    	*/
    },
	//*******************************************************************
	//******************* Simple Transactions TU ************************
	//*******************************************************************
	testSimpleTransaction_Commit_Create:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		for (var i=1; i<=3; i++) {
			var newEntity = new ds.TransactionTable();
			newEntity.name = "first_test_"+i ;
			newEntity.save();
		};
		ds.commit();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength+3,newLength,"commit simple transaction fail.");
	},
	testSimpleTransaction_Commit_Delete:function(){
		var oldLength = ds.TransactionTable.length;
		var myEntity1 = ds.TransactionTable.find("ID = 1");
		var myEntity2 = ds.TransactionTable.find("ID = 2");
		var myEntity3 = ds.TransactionTable.find("ID = 3");
		ds.startTransaction();
			myEntity1.remove();
			myEntity2.remove();
			myEntity3.remove();
		ds.commit();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength+3,"commit simple transaction fail.");
		for (var i=1; i<=3; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.isNull(myEntity,"commit simple transaction fail.");
		}; 
	},
	testSimpleTransaction_Commit_Update:function(){
		ds.startTransaction();
		for (var i=4; i<=6; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.name = "updated_"+i;
			myEntity.save();
		};
		ds.commit();
		for (var i=4; i<=6; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areSame(myEntity.name,"updated_"+i,"commit simple transaction fail.");
		}; 
	},
	testSimpleTransaction_Commit_Read:function(){
		var myEntity1 , myEntity2 , myEntity3;
		ds.startTransaction();
		myEntity1 = ds.TransactionTable.find("ID = 7");
		myEntity2 = ds.TransactionTable.find("ID = 8");
		myEntity3 = ds.TransactionTable.find("ID = 9");
		ds.commit();
		Y.Assert.isObject(myEntity1,"commit simple transaction fail.");
		Y.Assert.isObject(myEntity2,"commit simple transaction fail.");
		Y.Assert.isObject(myEntity3,"commit simple transaction fail.");
	},
	testSimpleTransaction_Rollback_Create:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		for (var i=1; i<=3; i++) {
			var newEntity = new ds.TransactionTable();
			newEntity.name = "first_test_"+i ;
			newEntity.save();
		};
		ds.rollBack();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
	},
	testSimpleTransaction_Rollback_Delete:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		for (var i=10; i<=12; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.remove();
		};
		ds.rollBack();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
		for (var i=10; i<=12; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.isNotNull(myEntity,"commit simple transaction fail.");
		}; 
	},
	testSimpleTransaction_Rollback_Update:function(){
		ds.startTransaction();
		for (var i=13; i<=15; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.name = "updated_"+i;
			myEntity.save();
		};
		ds.rollBack();
		for (var i=13; i<=15; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areNotSame(myEntity.name,"updated_"+i,"commit simple transaction fail.");
		}; 
	},
	testSimpleTransaction_Rollback_Read:function(){
		var myEntity1 , myEntity2 , myEntity3;
		ds.startTransaction();
		myEntity1 = ds.TransactionTable.find("ID = 16");
		myEntity2 = ds.TransactionTable.find("ID = 17");
		myEntity3 = ds.TransactionTable.find("ID = 18");
		ds.rollBack();
		Y.Assert.isObject(myEntity1,"commit simple transaction fail.");
		Y.Assert.isObject(myEntity2,"commit simple transaction fail.");
		Y.Assert.isObject(myEntity3,"commit simple transaction fail.");
	},
	//************************************************************************
	//******************* Nested transactions level 2 TU *********************
	//************************************************************************
	//Create tests
	testNestedTransactionL2_CR_Create:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		for (var i=1; i<=3; i++) {
			var newEntity = new ds.TransactionTable();
			newEntity.name = "first_nested_L2_test_"+i ;
			newEntity.save();
		};
		ds.commit();
		ds.rollBack();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
	},
	testNestedTransactionL2_CC_Create:function(){
		var oldLength = ds.TransactionTable.length;
		var newEntity1 = new ds.TransactionTable();
		newEntity1.name = "second_nested_L2_test_"+oldLength+1 ;
		var newEntity2 = new ds.TransactionTable();
		newEntity2.name = "second_nested_L2_test_"+oldLength+2 ;
		var newEntity3 = new ds.TransactionTable();
		newEntity3.name = "second_nested_L2_test_"+oldLength+3 ;
		ds.startTransaction();
		ds.startTransaction();
		newEntity1.save();
		newEntity2.save();
		newEntity3.save();
		ds.commit();
		ds.commit();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength+3,newLength,"commit simple transaction fail.");
		for (var i=oldLength+1; i<=oldLength+3; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areNotSame(myEntity.name,"second_nested_L2_test_"+i,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL2_RR_Create:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		for (var i=1; i<=3; i++) {
			var newEntity = new ds.TransactionTable();
			newEntity.name = "third_nested_L2_test_i"+i ;
			newEntity.save();
		};
		ds.rollBack();
		ds.rollBack();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
	},
	testNestedTransactionL2_RC_Create:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		for (var i=1; i<=3; i++) {
			var newEntity = new ds.TransactionTable();
			newEntity.name = "fourth_nested_L2_test_i"+i ;
			newEntity.save();
		};
		ds.rollBack();
		ds.commit();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
	},
	//update tests
	testNestedTransactionL2_CR_Update:function(){
		ds.startTransaction();
		ds.startTransaction();
		for (var i=19; i<=21; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.name = "updated_"+i;
			myEntity.save();
		};
		ds.commit();
		ds.rollBack();
		for (var i=19; i<=21; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areNotSame(myEntity.name,"updated_"+i,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL2_CC_Update:function(){
		ds.startTransaction();
		ds.startTransaction();
		for (var i=22; i<=24; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.name = "updated_"+i;
			myEntity.save();
		};
		ds.commit();
		ds.commit();
		for (var i=22; i<=24; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areSame(myEntity.name,"updated_"+i,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL2_RR_Update:function(){
		ds.startTransaction();
		ds.startTransaction();
		for (var i=25; i<=27; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.name = "updated_"+i;
			myEntity.save();
		};
		ds.commit();
		ds.rollBack();
		for (var i=25; i<=27; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areNotSame(myEntity.name,"updated_"+i,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL2_RC_Update:function(){
		ds.startTransaction();
		ds.startTransaction();
		for (var i=28; i<=30; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.name = "updated_"+i;
			myEntity.save();
		};
		ds.rollBack();
		ds.commit();
		for (var i=19; i<=21; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areNotSame(myEntity.name,"updated_"+i,"commit simple transaction fail.");
		}; 
	},
	//delete tests
	testNestedTransactionL2_CR_Delete:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		for (var i=43; i<=45; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.remove();
		};
		ds.commit();
		ds.rollBack();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
		for (var i=43; i<=45; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.isObject(myEntity,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL2_CC_Delete:function(){
		var oldLength = ds.TransactionTable.length;
		var myEntity1 = ds.TransactionTable.find("ID = 46");
		var myEntity2 = ds.TransactionTable.find("ID = 47");
		var myEntity3 = ds.TransactionTable.find("ID = 48");
		ds.startTransaction();
		ds.startTransaction();
			myEntity1.remove();
			myEntity2.remove();
			myEntity3.remove();
		ds.commit();
		ds.commit();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength+3,"commit simple transaction fail.");
		for (var i=46; i<=48; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.isNull(myEntity,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL2_RR_Delete:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		for (var i=49; i<=51; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.remove();
		};
		ds.rollBack();
		ds.rollBack();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
		for (var i=49; i<=51; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.isObject(myEntity,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL2_RC_Delete:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		for (var i=52; i<=54; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.remove();
		};
		ds.rollBack();
		ds.commit();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
		for (var i=52; i<=54; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.isObject(myEntity,"commit simple transaction fail.");
		}; 
	},
	//************************************************************************
	//******************* Nested transactions level 3 TU *********************
	//************************************************************************
	//create tests
	testNestedTransactionL2_CCC_Create:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=oldLength+1; i<=oldLength+3; i++) {
			var newEntity = new ds.TransactionTable();
			newEntity.name = "first_nested_L3_test_i"+i ;
			newEntity.save();
		};
		ds.commit();
		ds.commit();
		ds.commit();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength+3,newLength,"commit simple transaction fail.");
		for (var i=oldLength+1; i<=oldLength+3; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areNotSame(myEntity.name,"second_nested_L2_test_"+i,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL2_RCC_Create:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=1; i<=3; i++) {
			var newEntity = new ds.TransactionTable();
			newEntity.name = "third_nested_L2_test_i"+i ;
			newEntity.save();
		};
		ds.rollBack();
		ds.commit();
		ds.commit();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
	},
	testNestedTransactionL2_CRC_Create:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=1; i<=3; i++) {
			var newEntity = new ds.TransactionTable();
			newEntity.name = "third_nested_L2_test_i"+i ;
			newEntity.save();
		};
		ds.commit();
		ds.rollBack();
		ds.commit();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
	},
	testNestedTransactionL2_RRC_Create:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=1; i<=3; i++) {
			var newEntity = new ds.TransactionTable();
			newEntity.name = "third_nested_L2_test_i"+i ;
			newEntity.save();
		};
		ds.rollBack();
		ds.rollBack();
		ds.commit();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
	},
	testNestedTransactionL2_CCR_Create:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=1; i<=3; i++) {
			var newEntity = new ds.TransactionTable();
			newEntity.name = "third_nested_L2_test_i"+i ;
			newEntity.save();
		};
		ds.commit();
		ds.commit();
		ds.rollBack();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
	},
	testNestedTransactionL2_RCR_Create:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=1; i<=3; i++) {
			var newEntity = new ds.TransactionTable();
			newEntity.name = "third_nested_L2_test_i"+i ;
			newEntity.save();
		};
		ds.rollBack();
		ds.commit();
		ds.rollBack();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
	},
	testNestedTransactionL2_CRR_Create:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=1; i<=3; i++) {
			var newEntity = new ds.TransactionTable();
			newEntity.name = "third_nested_L2_test_i"+i ;
			newEntity.save();
		};
		ds.commit();
		ds.rollBack();
		ds.rollBack();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
	},
	testNestedTransactionL2_RRR_Create:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=1; i<=3; i++) {
			var newEntity = new ds.TransactionTable();
			newEntity.name = "third_nested_L2_test_i"+i ;
			newEntity.save();
		};
		ds.rollBack();
		ds.rollBack();
		ds.rollBack();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
	},
	//delete
	testNestedTransactionL3_CCC_Delete:function(){
		var oldLength = ds.TransactionTable.length;
		var myEntity1 = ds.TransactionTable.find("ID = 55");
		var myEntity2 = ds.TransactionTable.find("ID = 56");
		var myEntity3 = ds.TransactionTable.find("ID = 57");
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
			myEntity1.remove();
			myEntity2.remove();
			myEntity3.remove();
		ds.commit();
		ds.commit();
		ds.commit();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength+3,"commit simple transaction fail.");
		for (var i=55; i<=57; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.isNull(myEntity,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL3_RCC_Delete:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=58; i<=60; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.remove();
		};
		ds.rollBack();
		ds.commit();
		ds.commit();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
		for (var i=58; i<=60; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.isObject(myEntity,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL3_CRC_Delete:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=61; i<=63; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.remove();
		};
		ds.commit();
		ds.rollBack();
		ds.commit();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
		for (var i=61; i<=63; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.isObject(myEntity,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL3_RRC_Delete:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=64; i<=66; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.remove();
		};
		ds.rollBack();
		ds.rollBack();
		ds.commit();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
		for (var i=64; i<=66; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.isObject(myEntity,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL3_CCR_Delete:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=67; i<=69; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.remove();
		};
		ds.commit();
		ds.commit();
		ds.rollBack();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
		for (var i=67; i<=69; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.isObject(myEntity,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL3_RCR_Delete:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=70; i<=72; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.remove();
		};
		ds.rollBack();
		ds.commit();
		ds.rollBack();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
		for (var i=70; i<=72; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.isObject(myEntity,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL3_CRR_Delete:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=73; i<=75; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.remove();
		};
		ds.commit();
		ds.rollBack();
		ds.rollBack();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
		for (var i=73; i<=75; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.isObject(myEntity,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL3_RRR_Delete:function(){
		var oldLength = ds.TransactionTable.length;
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=76; i<=78; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.remove();
		};
		ds.rollBack();
		ds.rollBack();
		ds.rollBack();
		var newLength = ds.TransactionTable.length;
		Y.Assert.areSame(oldLength,newLength,"commit simple transaction fail.");
		for (var i=76; i<=78; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.isObject(myEntity,"commit simple transaction fail.");
		}; 
	},
	//update
	testNestedTransactionL3_CCC_Update:function(){
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=79; i<=81; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.name = "updated_"+i;
			myEntity.save();
		};
		ds.commit();
		ds.commit();
		ds.commit();
		for (var i=79; i<=81; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areSame(myEntity.name,"updated_"+i,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL3_RCC_Update:function(){
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=82; i<=84; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.name = "updated_"+i;
			myEntity.save();
		};
		ds.rollBack();
		ds.commit();
		ds.commit();
		for (var i=82; i<=84; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areNotSame(myEntity.name,"updated_"+i,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL3_CRC_Update:function(){
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=85; i<=87; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.name = "updated_"+i;
			myEntity.save();
		};
		ds.commit();
		ds.rollBack();
		ds.commit();
		for (var i=85; i<=87; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areNotSame(myEntity.name,"updated_"+i,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL3_RRC_Update:function(){
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=88; i<=90; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.name = "updated_"+i;
			myEntity.save();
		};
		ds.rollBack();
		ds.rollBack();
		ds.commit();
		for (var i=88; i<=90; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areNotSame(myEntity.name,"updated_"+i,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL3_CCR_Update:function(){
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=91; i<=93; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.name = "updated_"+i;
			myEntity.save();
		};
		ds.commit();
		ds.commit();
		ds.rollBack();
		for (var i=91; i<=93; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areNotSame(myEntity.name,"updated_"+i,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL3_RCR_Update:function(){
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=94; i<=96; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.name = "updated_"+i;
			myEntity.save();
		};
		ds.rollBack();
		ds.commit();
		ds.rollBack();
		for (var i=94; i<=96; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areNotSame(myEntity.name,"updated_"+i,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL3_CRR_Update:function(){
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=97; i<=99; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.name = "updated_"+i;
			myEntity.save();
		};
		ds.commit();
		ds.rollBack();
		ds.rollBack();
		for (var i=97; i<=99; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areNotSame(myEntity.name,"updated_"+i,"commit simple transaction fail.");
		}; 
	},
	testNestedTransactionL3_RRR_Update:function(){
		ds.startTransaction();
		ds.startTransaction();
		ds.startTransaction();
		for (var i=100; i<=102; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			myEntity.name = "updated_"+i;
			myEntity.save();
		};
		ds.rollBack();
		ds.rollBack();
		ds.rollBack();
		for (var i=100; i<=102; i++) {
			var myEntity = ds.TransactionTable.find("ID = :1",i);
			Y.Assert.areNotSame(myEntity.name,"updated_"+i,"commit simple transaction fail.");
		}; 
	},
	//******************************************************************
	//******************* Get transaction Level TU *********************
	//******************************************************************
	testTransactionLevelBeforeAnyTrans:function(){
		var transactionLevel = ds.transactionLevel();
		Y.Assert.areSame(0,transactionLevel,"The transaction level before any transaction fail.");
	},
	testTransactionLevelAfterCommitTrans:function(){
		ds.startTransaction();
		new ds.TransactionTable();
		ds.commit();
		var transactionLevel = ds.transactionLevel();
		Y.Assert.areSame(0,transactionLevel,"The transaction level after commiting an empty transaction fail.");
	},
	testTransactionLevelAfterRollBackTrans:function(){
		ds.startTransaction();
		new ds.TransactionTable();
		ds.rollBack();
		var transactionLevel = ds.transactionLevel();
		Y.Assert.areSame(0,transactionLevel,"The transaction level after commiting an empty transaction fail.");
	}
}