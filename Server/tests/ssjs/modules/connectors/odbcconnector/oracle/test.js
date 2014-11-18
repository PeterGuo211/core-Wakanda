
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
 
//mysql connector tests

var sql = require('waf-sql');

var platform = 'win';

if (os.isMac) {
    platform = 'mac';
}
else if (os.isLinux) {
    platform = 'linux';
}
var mshost = '192.168.4.42';

    var params={
    
        dbType: 'odbc',
        dsn: 'oracle-test',
        user: 'saad',
        password: 'secret' 
        
    };
 host = params.hostname;

var testCase = {
    name: "odbc oracle",

    _should: {
        ignore: {
            //multiple Statements
            testExecuteWithMultipleSelect : true,
            testGetNextResultLogic : true,
            testHasMoreResults : true,
            testGetResultCount : true,


            testSelectTime : true,
            testSelectYear : true,
            testSelectDate : true,
            testSelectDateTime : true,

            testDeleteLogic2 : true

            // testExecuteWithMultipleSelect  : true, 
            // testGetNextResultLogic : true, 
            // testHasMoreResults: true,
            // testGetResultCount: true, 
            // testUseDatabaseLogic    :   true
        }
    },
    
 setUp : function () {

    if (typeof this.initDone === 'undefined') {
       // Do it once:
           this.initDone = true;

           try{
                var dbconn = sql.connect(params);
                dbconn.execute("DELETE FROM TEST_DELETE_TABLE WHERE ID > 0");
           }catch(err){

           }try{
                dbconn.execute('INSERT INTO TEST_DELETE_TABLE("ID", "NUMBER_", "STRING") VALUES(1, 20, 30)');
           }catch(err){

           }try{
                dbconn.execute("DELETE FROM \"TEST_INSERT_TABLE\" WHERE \"ID\" = 10");
                if (dbconn)
                    dbconn.close();
           }catch(err){

       }
    }
 },  
    // testInsertDateWithApi: function(){
    //     var exceptionOccur = false;
    //     var exceptionMsg = "";
    //     try {
    //         var dbconn = sql.connect(params);
    //         var res = dbconn.insert("test_date", [{
    //             id: 77,
    //             value: new Date()
    //         }]);
    //     }
    //     catch (err) {
    //         exceptionOccur = true;
    //         exceptionMsg = err.message;
    //     }
    //     if (dbconn) dbconn.close();
    //     Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
    // },
    
    //test if useDatabase function exist
    testUseDatabaseExist: function() {
        var useDatabaseExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            if (dbconn.useDatabase) useDatabaseExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(useDatabaseExist, "useDatabase function definition is missing!");
    },


    //test if execute function exist
    testExecuteExist: function() {
        var executeExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            if (dbconn.execute) executeExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(executeExist, "execute function definition is missing!");
    },

    testExecuteWithSelect: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT ID FROM TEST_SELECT_TABLE';
            var rs = dbconn.execute(q);
            while (rs.hasNext()) {
                var row = rs.getNextRow();
                res.push(row.ID);
            }
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(res.length, 2, "expected 2 ids!");
        Y.Assert.areSame(res[0], "1", "the first id is incorrect");
        Y.Assert.areSame(res[1], "2", "the second id is incorrect!");
    },

    testExecuteWithMultipleSelect: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var results = 0;
        var res = [];
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT ID FROM TEST_SELECT_TABLE;SELECT STRING FROM TEST_SELECT_TABLE;';
            var rs = dbconn.execute(q);
            var i = 0;
            while (rs != null) {
                r = [];
                while (rs.hasNext()) {
                    var row = rs.getNextRow();
                    if (i == 0) {
                        r.push(row.ID);
                    }
                    else {
                        r.push(row.STRING);
                    }
                }
                res.push(r);
                rs = dbconn.getNextResult();
                ++i;
            }
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(res[0][0], "1", "the first id is incorrect");
        Y.Assert.areSame(res[0][1], "2", "the second id is incorrect!");
        Y.Assert.areSame(res[1][0], "3", "the first string is incorrect");
        Y.Assert.areSame(res[1][1], "4", "the second string is incorrect!");
    },

    testExecuteWithUpdate: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            
            var dbconn = sql.connect(params);
            var q1 = "UPDATE TEST_EXECUTE_UPDATE_TABLE SET NUMBER_='0', STRING='0' WHERE ID='1'";
            dbconn.execute(q1);
            var q2 = "SELECT NUMBER_, STRING FROM TEST_EXECUTE_UPDATE_TABLE WHERE id='1'";
            var rs = dbconn.execute(q2);
            var row = rs.getNextRow();
            var n = row.NUMBER_;
            var s = row.STRING;

            var q3 = "UPDATE TEST_EXECUTE_UPDATE_TABLE SET NUMBER_='1', STRING='1' WHERE ID='1'";
            dbconn.execute(q3);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(n, "0", "incorrect number!");
        Y.Assert.areSame(s, "0", "incorrect string!");
    },

    testExecuteWithInsert: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            var dbconn = sql.connect(params);
            var q = "INSERT INTO TEST_EXECUTE_UPDATE_TABLE VALUES ('1000', '1001', '1002');";
            dbconn.execute(q);
            var qq = "SELECT NUMBER_, STRING FROM TEST_EXECUTE_UPDATE_TABLE WHERE id='1000'";
            var rs = dbconn.execute(qq);
            var row = rs.getNextRow();
            var n = row.NUMBER_;
            var s = row.STRING;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(n, "1001", "incorrect number !");
        Y.Assert.areSame(s, "1002", "incorrect string !");
    },

    testExecuteWithDelete: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            var dbconn = sql.connect(params);
            var q1 = "DELETE FROM TEST_EXECUTE_UPDATE_TABLE WHERE id='1000'";
            dbconn.execute(q1);
            var q2 = "SELECT NUMBER_, STRING FROM TEST_EXECUTE_UPDATE_TABLE WHERE id='1000'";
            var rs = dbconn.execute(q2);
            var rows = rs.getRowsCount();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows, 0, "incorrect rows number!");
    },

    testSelectWithNoFieldsWithCondition: function() {
        var exceptionMsg;
        var exceptionOccur = false;
        try {
            var dbconn = sql.connect(params);
            var rs = dbconn.select("*", "TEST_SELECT_TABLE", {
                ID: 1
            });
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areEqual(row.ID, "1", "Incorrect id value");
        Y.Assert.areEqual(row.NUMBER, "2", "Incorrect number value");
        Y.Assert.areEqual(row.STRING, "3", "Incorrect string value");
    },

    testSelectWithNoFieldsWithoutCondition: function() {
        var exceptionMsg;
        var exceptionOccur = false;
        try {
            var dbconn = sql.connect(params);
            var rs = dbconn.select("*", "TEST_SELECT_TABLE", {});
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areEqual(row.ID, "1", "Incorrect id value");
        Y.Assert.areEqual(row.NUMBER, "2", "Incorrect number value");
        Y.Assert.areEqual(row.STRING, "3", "Incorrect string value");
    },

    testSelectWithFieldsWithCondition: function() {
        var exceptionMsg;
        var exceptionOccur = false;
        try {
            var dbconn = sql.connect(params);
            var rs = dbconn.select("NUMBER,STRING", "TEST_SELECT_TABLE", {
                ID: 1
            });
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areEqual(row.NUMBER, "2", "Incorrect number value");
        Y.Assert.areEqual(row.STRING, "3", "Incorrect string value");
    },

    testSelectWithFieldsWithoutCondition: function() {
        var exceptionMsg;
        var exceptionOccur = false;
        try {
            var dbconn = sql.connect(params);
            var rs = dbconn.select("NUMBER,STRING", "TEST_SELECT_TABLE", {});
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areEqual(row.NUMBER, "2", "Incorrect number value");
        Y.Assert.areEqual(row.STRING, "3", "Incorrect string value");
    },

    //test if hasMoreResults function exist
    testHasMoreResultsExist: function() {
        var hasMoreResultsExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            if (dbconn.hasMoreResults) hasMoreResultsExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(hasMoreResultsExist, "hasMoreResults function definition is missing!");
    },

    //test if getResultCount function exist
    testGetResultCountExist: function() {
        var getResultCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            if (dbconn.getResultCount) getResultCountExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getResultCountExist, "getResultCount function definition is missing!");
    },

    //test if select function exist
    testSelectExist: function() {
        var selectExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            if (dbconn.select) selectExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(selectExist, "select function definition is missing!");
    },

    //test if delete function exist
    testDeleteExist: function() {
        var deleteExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            if (dbconn.delete) deleteExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(deleteExist, "delete function definition is missing!");
    },

    //test delete
    testDeleteLogic: function() {
        var exceptionOccur = false;
        var errMessage = "";
        try {
            var dbconn = sql.connect(params);
            dbconn.delete("TEST_DELETE_TABLE", {
                ID: 1
            });
            var rs = dbconn.select("*", "TEST_DELETE_TABLE", {
                ID: 1
            });
            var rows = rs.getRowsCount();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areEqual(rows, 0, "no result shall be found!");
    },
    //test delete 2
    testDeleteLogic2: function() {
        var exceptionOccur = false;
        var errMessage = "";
        try {
            var dbconn = sql.connect(params);
            var rs = dbconn.delete("TEST_DELETE_TABLE", {
                ID: 1
            });
            var affectedrows = rs.getAffectedRowCount();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areEqual(affectedrows, 0);
    },

    //test if insert function exist
    testInsertExist: function() {
        var insertExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            if (dbconn.insert) insertExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(insertExist, "insert function definition is missing!");
    },

    //test insert
    testInsertLogic: function() {
        var esceptionMessage;
        var exceptionOccur = false;
        var values = [];
        values.push({
            ID: 10,
            NUMBER_: 20,
            STRING: "30"
        });
        var row = {}
        try {
            var dbconn = sql.connect(params);
            dbconn.insert("TEST_INSERT_TABLE", values);
            var rs = dbconn.select("*", "TEST_INSERT_TABLE", {
                ID: 10
            });
            row = rs.getNextRow();
        }
        catch (err) {
            esceptionMessage = err.message;
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + esceptionMessage);
        Y.Assert.areEqual(row.ID, "10", "Incorrect id value");
        Y.Assert.areEqual(row.NUMBER_, "20", "Incorrect number value");
        Y.Assert.areEqual(row.STRING, "30", "Incorrect string value");
    },

    //test if update function exist
    testUpdateExist: function() {
        var updateExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            if (dbconn.update) updateExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(updateExist, "update function definition is missing!");
    },

    //test update
    testUpdateLogic: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            dbconn.update("TEST_UPDATE_TABLE", {
                NUMBER_: 0,
                STRING: "0"
            }, {
                ID: 1
            });
            var rs = dbconn.select("*", "TEST_UPDATE_TABLE", {
                ID: 1
            });
            var row = rs.getNextRow();
        }
        catch (err) {
            
            exceptionMsg = err.message;
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! "+ exceptionMsg);
        Y.Assert.areEqual(row.NUMBER_, 0, "the number is different");
        Y.Assert.areEqual(row.STRING, "0", "the string is different");
    },

    //test if getNextResult function exist
    testGetNextResultExist: function() {
        var getNextResultExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            if (dbconn.getNextResult) getNextResultExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getNextResultExist, "getNextResult function definition is missing!");
    },

    //test getNextResult
    testGetNextResultLogic: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT ID FROM TEST_SELECT_TABLE;SELECT number FROM TEST_SELECT_TABLE;';
            var results = 0;
            var rs = dbconn.execute(q);
            while (rs != null) {
                results += 1;
                rs = dbconn.getNextResult();
            }
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(results, 2, "expected 2 result sets!");
    },

    //test if close function exist
    testCloseExist: function() {
        var closeExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            if (dbconn.close) closeExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(closeExist, "close function definition is missing!");
    },

    //test close connection (test execut query after close connection
    testCloseLogic: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            if (dbconn) dbconn.close();
            var q = 'select * from TEST_SELECT_TABLE';
            dbconn.execute(q);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, "The session has been already closed!");
    },

    //testing all ResultSet methods exist
    //test if hasNext function exist
    testHasNextExist: function() {
        var hasNextExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            if (result.hasNext) hasNextExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(hasNextExist, "hasNext function definition is missing!");
    },

    testHasNextLogic: function() {
        var hasNextExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        var hasnext = false;
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            hasnext = result.hasNext();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(hasnext, "an exeption was occur when trying to check hasnext on rs!");
    },

    //test if getRowsCount function exist
    testgetRowsCountExist: function() {
        var getRowsCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            if (result.getRowsCount) getRowsCountExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getRowsCountExist, "getRowsCount function definition is missing!");
    },

    //test if getRowsCount function logic
    testgetRowsCountLogic: function() {
        var getRowsCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        var count = 0;
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            count = result.getRowsCount()
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(count, 2, "getRowsCount function definition is missing!");
    },

    //test if getColumnsCount function exist
    testGetColumnsCountExist: function() {
        var getColumnsCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            if (result.getColumnsCount) getColumnsCountExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getColumnsCountExist, "getColumnsCount function definition is missing!");
    },

    //test if getColumnsCount function logic
    testGetColumnsCountLogic: function() {
        var getColumnsCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        var columnCount = 0;
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            columnCount = result.getColumnsCount();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(columnCount, 3, "getColumnsCount function definition is missing!");
    },

    //test if getColumnName function exist
    testGetColumnNameExist: function() {
        var getColumnNameExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            if (result.getColumnName) getColumnNameExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getColumnNameExist, "getColumnName function definition is missing!");
    },

    //test if getColumnFlags function exist
    testGetColumnFlagsExist: function() {
        var getColumnFlagsExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            if (result.getColumnFlags) getColumnFlagsExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getColumnFlagsExist, "getColumnFlags function definition is missing!");
    },

    //test if getColumnType function exist
    testGetColumnTypeExist: function() {
        var getColumnTypeExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            if (result.getColumnType) getColumnTypeExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getColumnTypeExist, "getColumnType function definition is missing!");
    },

    //test if isSelect function exist
    testIsSelectExist: function() {
        var isSelectExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            if (result.isSelect) isSelectExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(isSelectExist, "isSelect function definition is missing!");
    },

    //test if isError function exist
    testIsErrorExist: function() {
        var isErrorExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            if (result.isError) isErrorExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(isErrorExist, "isError function definition is missing!");
    },

    //test if getAffectedRowCount function exist
    testGetAffectedRowCountExist: function() {
        var getAffectedRowCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            if (result.getAffectedRowCount) getAffectedRowCountExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getAffectedRowCountExist, "getAffectedRowCount function definition is missing!");
    },

    //test if getNextRow function exist
    testGetNextRowExist: function() {
        var getNextRowExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            if (result.getNextRow) getNextRowExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getNextRowExist, "getNextRow function definition is missing!");
    },

    //test if getNextRows function exist
    testGetNextRowsExist: function() {
        var getNextRowsExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            if (result.getNextRows) getNextRowsExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getNextRowsExist, "getNextRows function definition is missing!");
    },

    //test if skipRows function exist
    testSkipRowsExist: function() {
        var skipRowsExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT * FROM TEST_SELECT_TABLE';
            var result = dbconn.execute(q);
            if (result.skipRows) skipRowsExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(skipRowsExist, "skipRows function definition is missing!");
    },

    //test hasMoreResults
    testHasMoreResults: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var results = 0;
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT ID FROM TEST_SELECT_TABLE;SELECT number FROM TEST_SELECT_TABLE;';
            var rs = dbconn.execute(q);
            if (rs != null) {
                results = 1;
            }
            while (dbconn.hasMoreResults()) {
                ++results;
                dbconn.getNextResult();
            }
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(results, 2, "expected 2 result sets!");
    },

    //test getResultCount
    testGetResultCount: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT ID FROM TEST_SELECT_TABLE;SELECT number FROM TEST_SELECT_TABLE;';
            dbconn.execute(q);
            var results = dbconn.getResultCount();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(results, 2, "expected 2 result sets!");
    },

    //Test Types
    //test tinyInt 
    testSelectTinyInt: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_tiny_int WHERE id >1;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[2].VALUE, "-128", "expected -128 as value!"); //check value
        Y.Assert.areSame(rows[0].VALUE, "127", "expected 127 as value!"); //check value
    },
    //testSelectInt
    testSelectInt: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_int WHERE id = 1 OR id=3 ;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE, -2147483648, "expected -2147483648  as value!"); //check value!
        Y.Assert.areSame(rows[1].VALUE, 2147483647, "expected 2147483647 as value!"); //check value!
    },
    //test BigInt
    testSelectInt: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_integer WHERE id =1 OR id = 3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE, "-9223372036854775808", "expected  -9223372036854775808 as Value!");
        Y.Assert.areSame(rows[1].VALUE, "9223372036854775807", "expected 9223372036854775807 as  Value!");
    },

    //test smallInt 
    testSelectSmallInt: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_small_int WHERE id =1 OR id = 3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE, "-32768", "expected  -32768 as Value!");
        Y.Assert.areSame(rows[1].VALUE, "32767", "expected 32767 as  Value!");
    },

    //test mediumint 
    testSelectMediumInt: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_medium_int WHERE id =1 OR id = 3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE, "-8388608", "expected  -8388608 as Value!");
        Y.Assert.areSame(rows[1].VALUE, "8388607", "expected 8388607 as  Value!");
    },

    //test float 
    testSelectFloat: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_float WHERE id >0;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE, -3.40282e38, "expected  -3.40282e38 as Value!"); //check value
        Y.Assert.areSame(rows[2].VALUE, -1.17549e-38, "expected -1.17549e-38 as  Value!"); //check value
        Y.Assert.areSame(rows[3].VALUE, 1.17549e-38, "expected 1.17549e-38 as  Value!"); //check value
        Y.Assert.areSame(rows[4].VALUE, 3.40282e38, "expected 3.40282e38 as  Value!"); //check value
    },

    //test String 
    testSelectString: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            
            var dbconn = sql.connect(params);
            var q = 'SELECT VALUE FROM test_string WHERE id <=1;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE, 'test value', "expected  'test value' as Value!");
        Y.Assert.areSame(rows[1].VALUE, ' ', "expected '' as  Value!");


    },
    //test blob 
    testSelectBlob: function() {
        var exceptionOccur = false;
        var buffer = new Buffer('\u00c9\u00cb\u00bb\u00cc\u00ce\u00b9\u00c8\u00ca\u00bc\u00cc\u00ce\u00b9\u00c9\u00cb\u00bb', 'binary');

        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_blob WHERE id =1 or id = 3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE.toBuffer().toString('hex'), buffer.toString('hex'), "expected  blob object!");
        Y.Assert.areSame(rows[1].VALUE, null, "expected null   Value!");


    },


    //test Date 
    testSelectDate: function() {
        var exceptionOccur = false;
        var date1 = new Date(1000, 0, 1);
        var date2 = new Date(9999, 11, 31);
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_date WHERE id =1 or id = 2;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE.toDateString(), date1.toDateString(), "expected  1000-01-01 as Value!");
        Y.Assert.areSame(rows[1].VALUE.toDateString(), date2.toDateString(), "expected 9999-12-31  as Value!");

    },

    //test dateTime
    testSelectDateTime: function() {
        var exceptionOccur = false;
        var date1 = new Date(1000, 0, 1, 0, 0, 0);
        var date2 = new Date(9999, 11, 31, 23, 59, 59);
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_datetime WHERE id =1 or id = 2;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE.toLocaleString(), date1.toLocaleString(), "expected Wednesday, January 01, 1000 00:00:00 as Value!");
        Y.Assert.areSame(rows[1].VALUE.toLocaleString(), date2.toLocaleString(), "expected Friday, December 31, 9999 23:59:59 as   Value!");

    },
    //test time
    testSelectTime: function() {
        var exceptionOccur = false;
      
        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_time WHERE id <=3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE, '00:00:00', "expected  '00:00:00' as Value!");
        Y.Assert.areSame(rows[1].VALUE, '23:59:59', "expected  '23:59:59' as   Value!");
        Y.Assert.areSame(rows[2].VALUE, null, "expected null as   Value!");

    },
    //test Year
    testSelectYear: function() {
        var exceptionOccur = false;

        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_year WHERE id <=3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE.getFullYear(), 1901, "expected 1901 as Value!"); 
        Y.Assert.areSame(rows[1].VALUE.getFullYear(), 2155, "expected 2155 as  Value!"); 
        Y.Assert.areSame(rows[2].VALUE, null, "expected null as Value!");
    },
    //test bit 
    testSelectBit: function() {
        var exceptionOccur = false;

        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            
            var q = 'SELECT value FROM test_bit WHERE id <=3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE, '0', "expected false as Value!");
        Y.Assert.areSame(rows[1].VALUE, '1', "expected true as Value!");
        Y.Assert.areSame(rows[2].VALUE, null, "expected null as Value!");

    },
    //test Decimal 
    testSelectDecimal: function() {
        var exceptionOccur = false;

        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_decimal2 WHERE id <=3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE, '-9999999999', "expected '-9999999999' as Value!"); 
        Y.Assert.areSame(rows[1].VALUE, '9999999999', "expected '9999999999' as  Value!"); 
        Y.Assert.areSame(rows[2].VALUE, null, "expected null as Value!");

    },
      //test Set
    testSelectSet: function() {
        var exceptionOccur = false;

        var exceptionMsg = "";
        try {
            
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_set WHERE id <=3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE, '1         ', "expected '1' as Value!"); 
        Y.Assert.areSame(rows[1].VALUE, 'one,test  ', "expected 'one,test' as  Value!"); 
        Y.Assert.areSame(rows[2].VALUE, null, "expected null as Value!");

    },
    //test Enum
    testSelectEnum: function() {
        var exceptionOccur = false;

        var exceptionMsg = "";
        try {
            
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_enum WHERE id <=3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].VALUE, 'Asia         ', "expected 'Asia' as Value!"); 
        Y.Assert.areSame(rows[1].VALUE, 'Africa       ', "expected 'Africa' as  Value!"); 
        Y.Assert.areSame(rows[2].VALUE, null, "expected null as Value!");

    },
       //test TimeStamp
    testSelectTimeStamp: function() {
        var exceptionOccur = false;

        var exceptionMsg = "";
        try {
            var dbconn = sql.connect(params);
            var q = 'SELECT value FROM test_timestamp WHERE id <=1;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
       
        Y.Assert.areSame(typeof rows[0].VALUE.getTime,'function', "expected Date object!");

    }

};

// /!\ REMOVE OR COMMENT THIS LINE BEFORE PUBLISHING THE TEST /!\ 
/**
    var tmp = require("unitTest").run(testCase).getReport();
    var ar = tmp['odbc oracle'];
    var logo = [];
    logo.push(ar.total);
    var n = 0;
    for(var v in ar){
        if(ar[v].result == 'fail'){
            n++;
            logo .push(ar[v]);
        }
    }
    logo .push(n);
    logo;
/**/