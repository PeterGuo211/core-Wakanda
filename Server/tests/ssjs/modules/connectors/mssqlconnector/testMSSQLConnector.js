
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
var conn = require('waf-sql');

var platform = 'win';

if (os.isMac) {
    platform = 'mac';
}
else if (os.isLinux) {
    platform = 'linux';
}
var mshost = '192.168.4.42';

    var params={
        
        hostname : '192.168.4.42',
        port     : 1433,
        database    : 'testMSSQL_'+platform,    
        user        : 'sa', //'testuser',
        password    : 'sqlserversa', //'secret' ,
        encryptionMode : "not supported",
        dbType : 'mssql'  
        
    };

var testCase = {
    name: "MSSQLConnectorTest",

    _should: {
        ignore: {
            testHAPI1SelectWithConditionDate                        :   false,  //  WAK0089453
            testHAPI1SelectWithoutConditionNoParam                  :   true,
            testHAPI2InsertDate                                     :   false,  //  WAK0089444
            testHAPI3UpdateStringWithoutConditionEmptyObject        :   true,
            testHAPI3UpdateStringWithoutConditionNoParams           :   false,  //  WAK0088352
            testHAPI3UpdateNumberWithConditionDate                  :   false,  //  WAK0089456
            testHAPI3UpdateDateWithoutConditionEmptyObject          :   false,  //  WAK0089442
            testHAPI3UpdateDateWithoutConditionNoParams             :   false,  //  WAK0089442
            testHAPI4DeleteWithConditionDate                        :   false,  //  WAK0089457
            testHAPI4DeleteWithoutConditionEmptyObject              :   false,  //  WAK0089440
            testHAPI4DeleteWithoutConditionNoParam                  :   true,
            testNamedPreparedStatementDateParam                     :   false,  //  WAK0089459
            testNamedPreparedStatementObjectParamDate               :   false,  //  WAK0089459
            test_datetime                                           :   true,
            testHAPI1SelectWithoutConditionNoParam                  :   true,
            testHAPI3UpdateStringWithoutConditionEmptyObject        :   true,
            testHAPI4DeleteWithoutConditionNoParam                  :   true,
            
                // linux bugs
                // bug err message
                // testSelectAllFieldsWithoutCondition : false,
                // testSelectWithFieldsWithoutCondition : false,


                // WAK0087578
                // testSelectSQLVariantValue_char : false,
                // testSelectSQLVariantValue_varchar : false,
                // test_char10 : false,
                // test_varchar50 : false,
                // test_varcharmax : false,
                // test_text : false,
                // testSelectString : false,
                // testSelectAllFieldsWithCondition : false,
                // testSelectFieldWithCondition : false,
                // testInsertLogic : false,
                // testUpdateLogic : false,
                 testCopyTableFromDBtoDB : true,

                // testCollations_Latin1_General_CI_AS : false,
                // testCollations_Arabic_CI_AS : false,
                // testCollations_Polish_CI_AS : false,
                // testCollations_Cyrillic_General_CI_AS : false,
                // testCollations_Turkish_CI_AS : false,
                // testCollations_Modern_Spanish_CI_AS : false,
                // testCollations_Czech_CI_AS : false,
                // testCollations_Romanian_CI_AS : false,
                // testCollations_Hebrew_CI_AS : false,
                testCollations_Japanese_CI_AS : true,
                // testCollations_Korean_90_BIN : false,


                testExecuteWithUpdate : true,
                testExecuteWithInsert : true,


                //  WAK0088146
                // testExecuteWithMultipleSelect : false,

                //////////////////////////////////////
                testSelectSQLVariantValue_real  : true,       //standard behaviour

                //  WAK0088098
                    // test_smalldatetime : false, 
                    // testSelectSQLVariantValue_datetime : false, 
                    // testSelectSQLVariantValue_smalldatetime : false, 
                    // test_datetime : false,

                testSelectBinary_image : true,
                test_smalldatetime : true
        }
    },
    
    setUp : function () {
        if (typeof this.initDone === 'undefined') {
           // Do it once:
           this.initDone = true;
                
            var xhr;

            xhr = new XMLHttpRequest({});
                        
            xhr.open('GET', 'http://'+mshost+':8081/exec'+platform, false);

            xhr.send();
        }
   },

    //test  isError function logic
    // testIsErrorLogic: function() {//////////////////////////////
    //     var exceptionMsg = "";
    //     try {
    //         var dbconn = conn.connect(params);
    //         var qq = 'SELECT * FROM test_select_table';
    //         var result = dbconn.execute(qq);
    //         var isError2 = result.isError();
    //         var q = 'SELECT * FROM test_select_tdadble';
    //         var resultt = dbconn.execute(q);
    //     }
    //     catch (err) {
    //         exceptionMsg = err.message;
    //     }
    //     if (dbconn) dbconn.close();
    //     Y.Assert.isTrue(resultt.isError(), "result.isError() must return true");
    //     Y.Assert.isFalse(isError2, "result.isError() must return false");
    // },
    //test getColumnFlags function logic
    // testGetColumnFlagsLogic: function() {///////////////
    //     var exceptionOccur = false;
    //     var exceptionMsg = "";
    //     try {
    //         var dbconn = conn.connect(params);
    //         var q = 'SELECT * FROM test_select_table';
    //         var result = dbconn.execute(q);
    //         var f1 = result.getColumnFlags(0);
    //         var f2 = result.getColumnFlags(1);
    //         var eq = (f1 === f2);
    //     }
    //     catch (err) {
    //         exceptionOccur = true;
    //         exceptionMsg = err.message;
    //     }
    //     if (dbconn) dbconn.close();
    //     Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
    //     Y.Assert.isFalse(eq, "Flags must be different");
    // },
    //   testCollations_Chinese_PRC_BIN: function() {
    //       var exceptionOccur = false;
    //       var exceptionMsg = "";
    //       var row = {};
    //       try {
    //           var dbconn = conn.connect(params);
    //           var rs = dbconn.execute("select COL_Chinese_PRC_BIN from test_collations");
    //           var row = rs.getNextRow();
    //       }
    //       catch (err) {
    //           exceptionOccur = true;
    //           exceptionMsg = err.message;
    //       }
    //       if (dbconn) dbconn.close();
    //       var eq = (row.COL_Chinese_PRC_BIN === '汉语/漢語')
    //       Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
    //       Y.Assert.isTrue(eq, "Incorrect value for field with collation Chinese_PRC_BIN");
    //       
    //   },
    //   testCollations_Vietnamese_CI_AS: function() {
    //       var exceptionOccur = false;
    //       var exceptionMsg = "";
    //       var row = {};
    //       try {
    //           var dbconn = conn.connect(params);
    //           var rs = dbconn.execute("select COL_Vietnamese_CI_AS from test_collations");
    //           var row = rs.getNextRow();
    //       }
    //       catch (err) {
    //           exceptionOccur = true;
    //           exceptionMsg = err.message;
    //       }
    //       if (dbconn) dbconn.close();
    //       Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
    //       Y.Assert.areEqual(row.COL_Vietnamese_CI_AS, 'bánh cun', "Incorrect value for field with collation Vietnamese_CI_AS");
    //       
    //   },
    //    //test Real
    //    testSelectReal: function() {///
    //        var exceptionOccur = false;
    //        var exceptionMsg = "";
    //        try {
    //            var a = -3.4E+38,
    //                b = -1.1799999E-38,
    //                c = 1.1799999E-38,
    //                d = 3.4E+38;
    //            var dbconn = conn.connect(params);
    //            var q = 'SELECT value FROM test_real';
    //            var resultSet = dbconn.execute(q);
    //            var rows = resultSet.getAllRows();
    //        }
    //        catch (err) {
    //            exceptionOccur = true;
    //            exceptionMsg = err.message;
    //        }
    //        if (dbconn) dbconn.close();
    //        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
    //        Y.Assert.areSame(rows[0].value, a, "expected "+ a +" as Value!"); //check value
    //        Y.Assert.areSame(rows[1].value, b, "expected "+ b +" as Value!"); //check value
    //        Y.Assert.areSame(rows[2].value, c, "expected "+ c +" as Value!"); //check value
    //        Y.Assert.areSame(rows[3].value, d, "expected "+ d +" as Value!"); //check value
    //    },
    // test money and small money
    //    testSelectMoneySmallMoney: function() {////////////////////////////// à discuter
    //        var exceptionOccur = false;
    //        var exceptionMsg = "";
    //        var a = -922337203685477.5808,
    //            b = -214748.3648,
    //            c = 922337203685477.5807,
    //            d = 214748.3647,
    //            e = 0,
    //            f = 0;
    //        try {
    //            var dbconn = conn.connect(params);
    //            var q = 'SELECT * FROM test_money_smallmoney;';
    //            var resultSet = dbconn.execute(q);
    //            var rows = resultSet.getAllRows();
    //            
    //        }
    //        catch (err) {
    //            exceptionOccur = true;
    //            exceptionMsg = err.message;
    //        }
    //        if (dbconn) dbconn.close();
    //        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
    //        Y.Assert.areSame(rows[0].money, a, "expected -922337203685477,5808 as Value!"); 
    //        Y.Assert.areSame(rows[0].smallmoney, b, "expected -214748,3648 as  Value!"); 
    //        Y.Assert.areSame(rows[1].money, c, "expected 922337203685477,5807 as  Value!");
    //        Y.Assert.areSame(rows[1].smallmoney, d, "expected 214748,3647 as  Value!");
    //        Y.Assert.areSame(rows[2].money, e, "expected 0 as  Value!");
    //        Y.Assert.areSame(rows[2].smallmoney, f, "expected 0 as  Value!");
    //    },
    // testInsertDateWithApi: function(){
    //     var exceptionOccur = false;
    //     var exceptionMsg = "";
    //     try {
    //         var dbconn = conn.connect(params);
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

    testSelectSQLVariantValue_real: function() {
        var exceptionOccur = false;
       
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = "select  value FROM [test_variant] where id = 15";
            var resultSet = dbconn.execute(q);
            var rows = resultSet.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows.value, 5214.254,"base type real");
    },
    
    //test Date & hour
    //test smalldatetime, datetime, time, datetime2 and datetimeoffset
   test_smalldatetime: function() {//////////
        var exceptionOccur = false;

        var smalldatetime   = new Date("Mon Jan 01 1900 00:00:00 GMT+0000");
        var dsmalldatetime  = new Date("Wed Jun 07 2079 23:59:00 GMT+0000");

        // var dsmalldatetime   = new Date(Date.UTC(2079, 5, 6, 23, 59, 0));
        
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT smalldatetime FROM test_allTimeTypes;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].smalldatetime.getTime(), smalldatetime.getTime(), "smalldatetime min (" + rows[0].smalldatetime.toUTCString() + "," + smalldatetime.toUTCString() + ")");
        Y.Assert.areSame(rows[1].smalldatetime.getTime(), dsmalldatetime.getTime(), "smalldatetime max (" + rows[1].smalldatetime.toUTCString() + "," + dsmalldatetime.toUTCString() + ")");
    },
    

    // binary(5), varbinary(5), varbinary(max), image
     testSelectBinary_binary5: function() {
         var exceptionOccur = false;
         var binary5 = '3078616263';
         
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = 'SELECT * FROM test_binary';

             var resultSet = dbconn.execute(q);
             var rows = resultSet.getAllRows();
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(rows[0].biinary5.toBuffer().toString('hex'), binary5, "binary5");
     },

testSelectBinary_varbinary5: function() {
         var exceptionOccur = false;
         var varbinary5 = '3078616263';
         
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = 'SELECT * FROM test_binary';
             var resultSet = dbconn.execute(q);
             var rows = resultSet.getAllRows();
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(rows[0].varbinary5.toBuffer().toString('hex'), varbinary5, "varbinary5");
     },

testSelectBinary_varbinarymax: function() {
         var exceptionOccur = false;
         var varbinarymax = '3078613162326333643465356636';
         
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = 'SELECT * FROM test_binary';
             var resultSet = dbconn.execute(q);
             var rows = resultSet.getAllRows();
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.areSame(rows[0].varbinarymax.toBuffer().toString('hex'), varbinarymax, "varbinarymax");
},

testSelectBinary_image: function() {
        var exceptionOccur = false;
        
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_binary';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
            rows[0].image.save(application.getFolder().path + "tmp.png",'image/png');
            var ftmp = File(application.getFolder().path + "tmp.png");
            var hexdb = ftmp.toBuffer().toString('hex');
            var hexori;
            if(platform == 'linux')
                hexori = "89504e470d0a1a0a0000000d494844520000003b000000380802000000ccd3174a000000017352474200aece1ce90000000467414d410000b18f0bfc6105000000097048597300000ec300000ec301c76fa86400001387494441546843cd5a69905cd5753e6fed65460305016c5c362e52fe41c50be504c506b3d971ca2e52c60e842d98b85c653baefcb01dca8e9125b0d81c931fb191347bcff43a333d33ddadd917090b99cd805864090141b15964286cac99e9eeb7dff76ebef35ac2cc483f8491aaf274d4baefbdfbeefdce77be73ee7ddd227922472443e94b1946525a918713e94947e2922fe2bbb17952da52066118f229776a199fa15b8067f9b920903eda3c16f7f4a3308864e045b8885bae90a188bc087d7990e31c27841803c9d03f824ce0c377712dc29f80b1586fc8b7a6838377047bff39787cbdf3cb33e4a2e12f92fd00351e6ab39ef898b3ef4679f03ef96a593aaef4e0951b9b0f1e001d43c2570c03c3251013c8868c8414ecedb1c789712c82235c0681884009c6aecba5dfc817ee729ff8f4ca2e72e7299c6993736d62a7d65c206791bc05f2e7295ad0a305355c20d1b219237af4a2e0b59f5afe4184a8158320044e3bc68b533fe2239e0b1c1def3821c420844787d3118f1cbeb55b3c7b8dbd4b0b77681e60ed20f90b06e44d5138477291a24545c08739363460c122053bc9db4162a711cc923f67464f5d2bdffc252424580cc0bdc4ba8930d532cf81003231c7394e0871249784105128c39527bd3d9723e2e162c29da6e642c29aa30028a7494e19d17cd2dba9d6013d36701c2c68fe82e12c98d67cc25a4cba3b381adeb422a73b249c99257bcf7572697f00c5b1c25a4200681ba2882f1ce73821c4c81096d8817bfdd936678eec0533982239630accba90160ba6032580cb5992b3869cc12d3d9a012c9cb245b3c43de7a9398dfe6614f704f4e682e6ce697281a2976f97750ea48dc4663df074916cb6665f739c988e0f3fd47cf2721b5c62ee1905e04061c0c8f84a3843c1ace6cfe9b8087fdcb9843bafc40df22100d8910ea69c53d068ce18d69ccafa99e541ac391de1b29efe5cb4fc1c5845d18805cdfa3e32fbea631562042244f94160f0987c0bb9cc67af8c87f39a985361c1ac82e96304981b86c6493067ba0deed9bbd2f2f753e0d6e71ac7e2f6b87afa1e57aa5632ada0bd0a310b27125c16d005cf859e78b5b4b4d0b106eedb88df3e7d8f26a73404ca9def58461c5e1e65723905631dc745958b37c37251b3d7aa02a5314495446714fa4363d059081aa64fad41f1e12445b1c69af87c6d920b355806d09642a40fd00c3b5a8398f373852b25a2b1b4534c1167d8b4ee4f51cbde9e63cde97b347f92c259d581a6671372921ac8d73f3e05303e088c1cf08da6872585d90c57230ee32228ea9efd5ab878a6a82980e54e9277d45a40df61e870122c98a0c60c1d9e55304530a1fa13e43c789eb45f42c0116e5eb1192a738c633562568e2d6de13dbcdeaaa12cb43526b8dcba13ef04cd73bc7d7a520c92b0a65517f19ca0704af7b78375c37de4f36016a01d480499c7aa606dac46ccf5a4e9bcb819a9808ab382216ad49c5885f85498602234399968562882a0a769792a0df4f2e0cf21853fade7d2c112b30a316ba271e0f0836759131455d74115d1a42e4e315c985f4d0735b2386d4c2cf5d6347913ba37a9ae2c9e25ed37b8ac455c0c907fe0995af07129c47e07ffeeb94656d2fe760531f2c715b19dc2094dd694b002be55f810d434b15d75ab843eefd6a05744dcabf167abd16a075512350ad1d84e2e2ee2d62407565475f9c4d5483856ab8f3582b38f114722e46d03ae2eff7a69fe1c39c64e37a1e3499ec3ab1aceb8e255353161e2d3aba862bbee03f19f03fa084a0cdb42cf70916735cdddaebb1510811975985763524425bd3cdb2eeb2fd96037c05e03dbd388558122c7028e02f1d437ea500fb06ed751d7c444b239cea3d81814e19b22071c5499899815f0fdeeace5e7b1a7168645519a209b29c72d0de10d2a6a50d31b9868fff799e3782d8c5511af15ac15ef757ff20c00f5aae48c332c672c0102a209454c6a00ea54c8073d20063cc5716c4df9679b5739623cf23b6f558e300279c8aa66cd9e1997e42088789f4410055e2458c1af94e5283955b2ab8a5f31fc71dd1dc3fa496294a2d1f6b09c12a36638ae89aa8611df9eec5d590bd09a8b3039d6264612218f6f08b01bd3c1c4e1d6881e96297a733a881cc0c5e68111b72ab3fbf8bfc871059d825a7b309e42890032ee0d0700ba4a2122384e708339a8e9deb88ed8bd17e3b857543430b2405dabb179e36c2ddfdc31cd1f26396ada4fdec47b0b1487c823868b5ae137bcf90fa120b8e3c9702ced0e918de857d5a09cb02a29abaa5b3515c51249d3f2044cf8652e26efca3c781b7fb61a808b8653a67a5569d4d446852cc4613b925b714663dc71164515d39d3d17bbfdd6ba17238626ea6f383179cea8096dc82aad54548b1dd5f6dc470fde6eeefa113d76371dca24ecf136779402708f41e3b9df8bd923542fd28e4dfaae3b945d1b69ef7db434d42e6a3c05e8032f4b3524951295497a4b808b9286ccc3db45207f5b417189ca0a7f0eabe1a8caf2a85234d471c547531ae9a4518a94f9cdaa1ca726143646e8e39648560c31c65441df98c6292bd17812f45815458eaab29c7047557b8cddc3f42805d0951c6977cb64b37c35cc32f9139d540c4f0945b9e463c9c390c79801edb9688c70cea00060cb200f3d10bf1263ef16fabceddf77bf855987a10ae886e76e9629c09591c495eb53a42a64261532167f7a6630a23be3061274054b09643d82b0b0d9e80f0fab0aae001917f5515a1ea16092c1d995a43fac79238a572651d680c6aba46449459e3c74cff9181f9468a45e76d1d9504538ac87a8cda5845b34b16c4136202838700f120eef9a840fde68ecf92e942e470d6b84424cc9f24f86430aa276f1a7db4c2285f42425c7369e0f407288e43062aa8931dd2e81b60432d51bd64459c1b30081b61cd645b1036447acd4447d4c91c3093992841bee90e19453f6504296388fab1bce51c900c7baa65c7cd1fbc4901216749fc7690365f0d01f31f1193db709aac04158f080583cf82566b4ace11ec28d2470cb6658549d51f5924fbd1f7811389d941b2ea1d76b1db26cca4104179c316e7f2c592f30ca08ede21176519edc128441019278e83467d80c87b98d6c4634b0096e0e716efdae72fa8d9700ae81f16197fcedb92867b29c027102e3a0d4829d91b6081563ef775a3b35828681d8dd7905dc728a5c7d81bb3e4a5c564634ab94bcece36791a2929286d2921a5df861face17d39b6fa08d5f36365d471baea14dff44775c4f3fbe9e365c4df7de44d33ff930f25294a831460fffccbcf31fe9ae6bd54dd7d2edd718777fe58cffb896365e67dcf625c2b3dfbb4abdf8c344800b8398b5c4a59f382b2a21cf14940888015e814739a244c5e4d22397ca786741f88bcc7377ff4338441090074a0a642355e125645d48ffe8fa8f805d0c6c227294204dc73f04a1c457d914dc80d2f92f5aa642b96f6960fd3faf31f831ee9b4067a04a80463c08c1c68cc6ff426eb807bc1825b5e1c68fba79f287a85e561128681222844efcbcb6f2d857646843bfcc7114d9d6a3b7881c72d3708754900de90479ae3b72c47cb1f89933d7ad03c71aa6a154424d261927d0a4912e0acfca886168688ada82ff831bdbd671f775d486db2986c468d7715f80441fc89652694aa562b7752d796e3b1d1cbe321cd591244b050a8752c1a8d22c9257d23d20d9773b23e65ad17a477df6dfe590e61554200e901c393dca73e9f1f2d498fa60efbd579e9e4ef3441a0019899837940ec0650e995e668e1b3174dcd5993acea724972d0377f971ee66680a92186d83070176d42155e948263befb97a65f234a744519eb8e4e7543b9706d360d01b3683fdd031bfabc6fb6321837dffd5405aa04a94381668c82155e653568e504d0feff8ccff4edcb4f1e6f59ffd9bbf3aad03c58ec3488a810f6e20da849a4ded7047d539ee5c584c13fdb827939e88b10126dc8885abab2099e8ecd31297fef5053ffcea277f33f1353177915550a101bba87925430ca1cc51a3a4c9a281ca183eff337e199176fc0e02d087a60054145594401bd5077527072f35bfa043fe36823275be3bfdf9e8d16f477b6e95cf6d8a9ede28f76c96cf6c962fdc15e273ff1dd1af6ffbc32f36fce0968b39f1f518abc28bc2eddfbaf4f5477ee8edbf2dda77b7dcbb593e77b7d87ba7fbcc1de1becd72df46ffc9eff98ffd9bb3f33277e22f1dc02d925fa226a48c5a89ba59d2510c10675120f9fa6e4736b16da33072f96bb59597912b61d6f0b249279f403fb7407e01296fda79904d5e06a73aaa7a3dafa0543572e8904496344baa5368f7732832666328dddcf9b9bf5bfffe58e69c8b575d789eb7f805ab6c1e46a0b26415e3180eabcd61a50152e27a8741e4b081f1c32c23b35152874d54466f0033267da02f6a482a691fc67b1ee8e5559a958c57ecea8764817975b29a37a4a26878382d687ece08864df800e241009200f4a3b060743e1d222b63c82cf9038415a1596adff0f54f22a734649c4a1bbf7621242807c8ce912cea88af37a80439431452fea0e967d428abc9bc6ee7f5a0980a8b692ba7346397dcbc224b80ab7a598a86936eed2cbc29f1be3e6cbd83c47b21f1c82da8ff8805dc7273aa87cccb9107f2306296d10328b8945890c04741c7584ed680841ac514a2610304fa0fa6efb9e923c0aa500704fdfd5bdeb782800e24ed7cbb1be3c63870deca730df58b0a9f0e523d5602a6c338cc08e64254b3264edd410dbcb8bfba19183d60c5fe182b35369e4cf7abe34b833c50806706180d978e2c21227e16c4a8a81e5e3f2b073e307a40c928a8890e082e5203ddf2dcf9b7f94fedce7c7b71cbbfeeca7ef5b9a1cb1a5992791319ec224a590447c1f840899141070c4fd9831cb170504134046ec14a0aab19fe648d65340ecd00a51301a68f7d05036761f82bf6f805cb39f64c60383807e1024dcb75a0296818da1ee4ecac67507a92b24f0951c5fb0d8418611105c51ac42ee24cbbfc4159bbc01df98057fe0b4011bd8a9f55411524170c28705b6415f88f8ba0063a09077431a8bb7d80abcb421257302f36865e4ec1bc76ed13a1bf82f21086560b31d0dad80ef1abdec3372f17ce6126801263e51801133ca07903869dd100da3aaa100c8a4c5a2e12ee820900b233e40c27a1160b29354851262ee7e02f970eb30978eb64190ae34064629aa15718ae2344780ae9581f44071521452e62580444eebe15d842c014d28b9cb8ba1d3d847d00451b93411b78c01d4c34061231dfa7d6e01ba2842a848471328a9d5710e1b09f647fdb61a8a5f97c806ac63f7871855885987faddbfdcd2083e898500fa7dda0d90455c7cc71720dd5a331404126e5e6d781296c0ceb7904d3f07b2978fcbb326cc4ab1d6fe8f1a6b706b1948dd7c2c2079a19d51f4cc3e3663f46d4501c4ea941093267d6fb213043f62217352b4316ea4ff93cd97895df48995ffe0d1125793562bc4845817ba0d3454d407ef450b3904263cd0427dd6426d944394796f792d77fba8db52367b8b8bef7bf51767de9825d0f42e6edf1ea6fbc2359672f908973eb653f8a4002c9e4664c64f72935d997aa03251a9904d62370e4f46bd1dcd532a883e030fe5538fed6ea181df30b1436cbbe2d3ddb2a754012a297ea197dcd0427dddc4cd201bb5953f46a5637eb78297fb6ac1fe255c2e3ef33013746eba25cac42cceee0aacfdf66446fee790bcbc7603bcae4a936af8f0b99dfa7d97d286aedcba50ef9bb5f01a28dbfc8371672fc2b08e4b1e6fb632c837c5d60e31cfffcf77c2eda167370cc1c27d704ac07c134dd5e6af69af2e0284a19ff14ce3b89c00feb9c7bfc1bb3c7dfbbe1da9f8ec863c8ec93d52a7ef285dea54c9bd547766fc2ea27a4331c10bd46a35b81f21afd64c39f5edde9559a7dd812617ad5ebd19d9ea3e1067908778f1974a7fcceb4ecd281a991a106ae7753c0dd34ab2f11f4a8c8bf06123d778e7cb184f74e861a4bf7d8630d629fdd827391e7854c39de00e59b8fcabe758d2eddefd6e456f2b600137251c1acf2e74ad4497e0fb95d24b692dc66884e0d50dc6ecded51d060e8dd5c01008ef1a1ddadf0e37d09afcf401fbb9b56e052a7ee6dc30ee95cf987a73d8905d9e15d03783ddeb106319641061c4701952e0468c6dd38b03c7585b58564d7e97e67fb4a0f3327ef57c18ddb09fa797db640391add14a2a0025697cab87b75bb4f6ff469cb7db412536bf51a76a78ea7e0a7d705ac24e1709f1a4c7e51da2b2eb288ffeb02ff7e706288f9ff34382e3649dc6c4907a9ea35391965b8e7c7c0846982be54a3939a036d8707128d6e0dac475b1261679bdb6d22d3ad2e720008ddba14501e6c53834e62eb668e219e3a1ee9d4a31e0d4335ba4cbfff6cfba95b397942fe71cec53e32fee98e3579bc6335627464cfdc503af126f4e81578ecff114db1f292bbe3cb4023301992e67e0ac0687fd2ee569dad8cc9ef35ac9eb40dda7a14a8c8dda6395b55a70bca36ec6e1d8c229525fc41426f01df8abbfb9b72e57fa044ec25f98b6caf7e04a8f0dd38bac71eab10bb7834d631ff46c96718832ff8c2c1677c8b5f04bcb71e173b6f10f7a73177b0859c2d0a90055d9abb95dc2de46f559add86d5a5d99d0a471fa1ef66b5202ce11612ddba0bc9f6258307bf2e0eef8fb98c7f7a8e7f0ef723d06ce34539ae5a279079fcea075c7882b1021ba480910287ffbb0357441e95bf79460082c859924fdf6b4f5db5d4db6e6d65644ce7560de2b63acde656050e84db3823110a770b5c6a5bea4b5895cbbd677bfde6ebf150fc7f12002e882c9e2d004dbc81e0264f1d633ae658859829c548fc5b5f0c0e7f63d83ca6f4f905167b27aee35836f99b7ddce4183abf17af2d7a4fdd193c704330f1f7fed86781d2ef54838133e4d8c7bd992f341ef886f3cc7df295b2f441a72524583cba26f0e8bc926199055b5820e29ce3fac60bdef18e3599f7fffe90f2ff00c73e1f18e380b2930000000049454e44ae426082";
            else if(platform == 'mac')
                hexori = '89504e470d0a1a0a0000000d494844520000003b000000380802000000ccd3174a0000000467414d410000b18f0bfc610500000a41694343504943432050726f66696c650000480d9d96775453d91687cfbd37bdd012222025f41a7a0920d23b48150451894980500286842676440546141129566454c0014787226345140b838262d709f21050c6c1514445e5dd8c6b09efad35f3de9afdc759dfd9e7b7d7d967ef7dd7ba0050fc8204c27458018034a15814eeebc15c1213cbc4f7021810010e5801c0e166660447f84402d4fcbd3d9999a848c6b3f6ee2e8064bbdb2cbf502673d6ff7f912237432406000a45d5363c7e2617e5029453b3c51932ff04caf495293286313216a109a2ac22e3c4af6cf6a7e62bbbc9989726e4a11a59ce19bc349e8cbb50de9a25e1a38c04a15c9825e067a37c0765bd54499a00e5f728d3d3f89c4c003014995fcce726a16c8932451419ee89f202000894c439bc720e8bf939689e0078a667e48a04894962a611d79869e5e8c866faf1b353f962312b94c34de188784ccff4b40c8e301780af6f96450125596d996891edad1ceded59d6e668f9bfd9df1e7e53fd3dc87afb55f126eccf9e418c9e59df6cecac2fbd1600f6245a9b1db3be955500b46d0640e5e1ac4fef2000f20500b4de9cf31e866c5e92c4e20c270b8becec6c73019f6b2e2be837fb9f826fcabf8639f799cbeefb563ba6173f81234915336545e5a6a7a64b44cccc0c0e97cf64fdf710ffe3c03969cdc9c32c9c9fc017f185e85551e89409848968bb853c8158902e640a847fd5e17f18362707197e9d6b1468755f007d853950b84907c86f3d00432303246e3f7a027deb5b10310ac8bebc68ad91af738f327afee7fa1f0b5c8a6ee14c412253e6f60c8f647225a22c19a3df846cc10212900774a00a34812e30022c600d1c80337003de2000848048100396032e4802694004b2413ed8000a4131d80176836a7000d4817ad0044e823670065c0457c00d700b0c8047400a86c14b3001de81690882f01015a241aa9016a40f9942d6101b5a0879434150381403c5438990109240f9d026a8182a83aaa143503df423741aba085d83faa007d0203406fd017d84119802d3610dd800b680d9b03b1c0847c2cbe04478159c0717c0dbe14ab8163e0eb7c217e11bf0002c855fc2930840c80803d14658081bf144429058240111216b9122a402a9459a900ea41bb98d489171e4030687a161981816c619e387598ce1625661d6624a30d5986398564c17e63666103381f982a562d5b1a65827ac3f760936119b8d2dc456608f605bb097b103d861ec3b1c0ec7c019e21c707eb8185c326e35ae04b70fd78cbb80ebc30de126f178bc2ade14ef820fc173f0627c21be0a7f1c7f1edf8f1fc6bf2790095a046b820f219620246c2454101a08e708fd8411c2345181a84f7422861079c45c6229b18ed841bc491c264e93144986241752242999b48154496a225d263d26bd2193c93a6447721859405e4fae249f205f250f923f50942826144f4a1c4542d94e394ab94079407943a5520da86ed458aa98ba9d5a4fbd447d4a7d2f47933397f397e3c9ad93ab916b95eb977b254f94d79777975f2e9f275f217f4afea6fcb80251c140c15381a3b056a146e1b4c23d8549459aa2956288629a62896283e235c55125bc928192b7124fa940e9b0d225a5211a42d3a579d2b8b44db43ada65da301d4737a4fbd393e9c5f41fe8bdf4096525655be528e51ce51ae5b3ca5206c23060f8335219a58c938cbb8c8ff334e6b9cfe3cfdb36af695effbc2995f92a6e2a7c952295669501958faa4c556fd514d59daa6daa4fd4306a266a616ad96afbd52eab8dcfa7cf779ecf9d5f34ffe4fc87eab0ba897ab8fa6af5c3ea3dea931a9a1abe1a191a551a9734c635199a6e9ac99ae59ae734c7b4685a0bb5045ae55ae7b55e309599eecc546625b38b39a1adaeeda72dd13ea4ddab3dad63a8b35867a34eb3ce135d922e5b3741b75cb75377424f4b2f582f5faf51efa13e519fad9fa4bf47bf5b7fcac0d020da608b419bc1a8a18aa1bf619e61a3e16323aa91abd12aa35aa33bc63863b6718af13ee35b26b0899d4992498dc94d53d8d4de5460bacfb4cf0c6be6682634ab35bbc7a2b0dc5959ac46d6a039c33cc87ca3799bf92b0b3d8b588b9d16dd165f2ced2c532deb2c1f59295905586db4eab0fac3dac49a6b5d637dc7866ae363b3cea6dde6b5ada92ddf76bfed7d3b9a5db0dd16bb4ebbcff60ef622fb26fb31073d877887bd0ef7d8747628bb847dd511ebe8e1b8cef18ce307277b27b1d349a7df9d59ce29ce0dcea30b0c17f017d42d1872d171e1b81c72912e642e8c5f7870a1d455db95e35aebfacc4dd78de776c46dc4ddd83dd9fdb8fb2b0f4b0f91478bc794a793e71acf0b5e8897af579157afb792f762ef6aefa73e3a3e893e8d3e13be76beab7d2ff861fd02fd76faddf3d7f0e7fad7fb4f043804ac09e80aa404460456073e0b320912057504c3c101c1bb821f2fd25f245cd4160242fc4376853c09350c5d15fa73182e2c34ac26ec79b855787e7877042d62454443c4bb488fc8d2c8478b8d164b167746c947c545d5474d457b4597454b97582c59b3e4468c5a8c20a63d161f1b157b247672a9f7d2dd4b87e3ece20ae3ee2e335c96b3ecda72b5e5a9cbcfae905fc159712a1e1b1f1ddf10ff8913c2a9e54caef45fb977e504d793bb87fb92e7c62be78df15df865fc91049784b284d14497c45d896349ae491549e3024f41b5e075b25ff281e4a9949094a32933a9d1a9cd6984b4f8b4d34225618ab02b5d333d27bd2fc334a33043baca69d5ee5513a240d1914c28735966bb988efe4cf5488c249b2583590bb36ab2de6747659fca51cc11e6f4e49ae46ecb1dc9f3c9fb7e356635777567be76fe86fcc135ee6b0ead85d6ae5cdbb94e775dc1bae1f5beeb8f6d206d48d9f0cb46cb8d651bdf6e8aded451a051b0be6068b3efe6c642b94251e1bd2dce5b0e6cc56c156ceddd66b3ad6adb97225ed1f562cbe28ae24f25dc92ebdf597d57f9ddccf684edbda5f6a5fb77e0760877dcdde9baf3589962595ed9d0aee05dade5ccf2a2f2b7bb57ecbe56615b71600f698f648fb432a8b2bd4aaf6a47d5a7eaa4ea811a8f9ae6bdea7bb7ed9ddac7dbd7bfdf6d7fd3018d03c5073e1e141cbc7fc8f7506bad416dc561dce1acc3cfeba2eababf677f5f7f44ed48f191cf478547a5c7c28f75d53bd4d737a8379436c28d92c6b1e371c76ffde0f5437b13abe95033a3b9f804382139f1e2c7f81fef9e0c3cd9798a7daae927fd9ff6b6d05a8a5aa1d6dcd689b6a436697b4c7bdfe980d39d1dce1d2d3f9bff7cf48cf6999ab3ca674bcf91ce159c9b399f777ef242c685f18b8917873a57743ebab4e4d29daeb0aedecb8197af5ef1b972a9dbbdfbfc5597ab67ae395d3b7d9d7dbded86fd8dd61ebb9e965fec7e69e9b5ef6dbde970b3fd96e3ad8ebe057de7fa5dfb2fdef6ba7de58eff9d1b038b06faee2ebe7bff5edc3de97ddefdd107a90f5e3fcc7a38fd68fd63ece3a2270a4f2a9eaa3fadfdd5f8d766a9bdf4eca0d760cfb388678f86b8432fff95f9af4fc305cfa9cf2b46b446ea47ad47cf8cf98cdd7ab1f4c5f0cb8c97d3e385bf29feb6f795d1ab9f7e77fbbd6762c9c4f06bd1eb993f4adea8be39fad6f66de764e8e4d37769efa6a78adeabbe3ff681fda1fb63f4c791e9ec4ff84f959f8d3f777c09fcf278266d66e6dff784f3fb323a597e000000097048597300000ec300000ec301c76fa864000013c6494441546805cd9a7bac657755c77f8ffddb8f73ee9d3b337d4c67683bb52d963e2825e5655a82616a4a901608c5072a891a89f08741833120211069341a35c167c004252a9852ad95608c505aa8955787c64287c050dac2d0d6ce4c67ee3daffd7bfa59fbd0616e07640699c4df3db9f7dc73cede7bfdd6faaeeffaaeb58f2ea5a8efbb8aca3a18658b32f3e247a556512d6a65152f3a5e1d96573a29e57236461ba5f3536735bccf3ffcf64a552a1a79ea78d594cc21a568655428c568ad54d2caa9128d8eba8c142f9cb0f4c9581c555f658c70727856c506ac6b4a55386faa54ff989adf1b8f7c4e4df7abc55763bfbf5d6c0415a255a91e9be642d35dd176cf55f56e75d62b95c9aa368319d86c933256a9a0d8fc706ef6a2f99954a5c349ca2e3f39bcf7d4af93b258a5986c25be9427cae84a870d353da81effbb7efda3fdf43f9b5eb934364625b758a464f15a51baa84a576c910871a8ace8ccb6abd27937f91daf31eea276084354c11a768e89181e8a1c22de56252833f86838f4d8af93b2b857aa91b866650c61d3873e59bef91effe46d4d5431256795c69d4125afaa4a9c86b539172c96eb0e912d38cb88e156bbe231abaecebe519ffb6bf9cc6b8ae1e54ae52355deaa6caff442a5353e2ceefe815151d4919c568db665f2f9f8d5b7e8c37759d504df47d7e8dcd7a0130017579c0d95ef536e068760b1e61065121b10b06a2bd628a054ab5565d75351feec9fea2e7a471c5f6e2b8130e0b706ffe482cb6dd4ece48475523ece3897d3efffbdf0d0cd494f8ba99df795a993f1ca8c087620a90a49071cc91b6059150c20a7071ce22d30093c1751b5ae36c5734212306a5b65d570ea4bdea1b7bf4dad3673356bcb48824342ba9956e3130c066c27c3154fde3dfddadbcdc1bb3a0c293a58f25a993878400f38c5975a17133145ab4669cf6931526882b574b6b68e742ca6e768935a957937e2665359d263d79eeec2f7a4b5cb720975746c1d7c57df17c772065fe51ab342a3d78bda1654ae1ff9e7bcefa7971be3f7f289fe36c496169de888537b25e6b1b6d3dc8ebacbffa19cf98aa8fb8149094080431236003422d7ac7bd56cf2719470a6a4ad256f83e9adaf0e7c7863df1b57f3443cf594b93c5f5abcb4fed4acfb6e9f76d9669382ddb2288bb54bff36ef7aada94841acad30b40034f0254cd24752f769571592cfd164817c78fcc3f9fe9f712511ebd3ba840281139ca3d5b4a8f195b7e7736e00e78a7cc48b20c404531cef668acb26532455d601962a494d3e6ebef05a1b13d6b3c5e5e3d8879ff6efb1d77fb027018f54c21133d58cb9f2fd379af5bd981b347cb950bac7db310b5f932b9b7d9c875a9936bc3f5add7d55991ec65ad8f2182d9e4090c7def9c14cfdf65190df82f86b3d2631f95139aded6e5ff031df5d8ca7adf25ab5147fa9fd42ebc7af8c4973e5476aef6b16d343aa1ef510d600a3e5a770adb09430ccd2eb4b6cff5f7f0bf314334aa526c8544e0acdfab7fa2fbca90e3eabaa870a44ab70e980fb365b2c06e5c5376eae9fbc1743a779ba92550fb48f5b4beb8e7be187f094cbba825069a61167440ae74cbbe6e0bfab47feb2a636815216c42a2cbdd9e2c25b9347e68ffee92ca7daaf8ed14fb66a85197e0866fd2fa7c871a4639ae9bea9eb2051565df65e9bf507dfadfc6372711d05c5caa25874a1980d2f81082060efbd493ffcafc1ce3365a2d7067da6adc9ac42bcd2c033d40a4ac5324e72ec492f0e5cc269e9820163e20e2e2cbfa1022976838380066a2355f6dc9f4ccfbf0d13ab5082cb2e0d72ae949c04c1b63a7affd18377ab3c53b98b51995a740c6cb148525193a912b205280136ac9427a7b696e672ccd2be63bf3979d455480633aca9d0862aa10341427df4e0c7edc67eb42be94359116ae06fc60cfc5d62fada9fd8fe7168db18df8090d2f4f02085d0955c2554043c5f486cecc76aaa08fe3895073ee4f392f1e80c79b06d1e3ad30a588a7ece12046a5c41e813e362bc5d4cd223ef75c8154b247a63873851c193728d7f34fcdb155a1fce94665214f20e4d55c3859cd1c428a827243866e92a2075ea5ede1413ceb35c98cdd9beb30660e010c4549dedacdd3a7ad98142908bb76a44ed962843d1e5b14fb9c5617891cfa3c44b04117d4570e604a2a3f2b17141bd208c8009e04e75b15bd631438f1ddee6714a51134ec39bc2c97c120f49ad0dba0d87ca131f4b67edc15c649800d24a3524293f4aa4b1d7e9b12ec8a6085a81b4a948d48976735dc18ea82c31d7485dacb408b653782cc170ec1010c9837fb39d2ad76be7b525da6228d16377bc11a4e7ab178ffc7d55d040ec96ab1267b69226fac94f00235d5a346308739445a5911fcee3d52a04e09b33ed065ecfb0267a09276f8ae531977dcf275c4fc03f3879a9a58484b25a9013380bfe8198e9ce524e387ad84d16ada6cc1377622ce659550fe48cc58b49de788404c52ca3164dabd613b1c9cec57dfbd364529714db4e9db7b3d9be56993ce534ec9506f87b5af73dde589acb9b3c61113048e9335fb415cc99d4f62deafc73bbd58e37a69c9f0fc895726836bea5d2ba715b535e5eb7d2fad03d9a48473801890ca0546d45bfd9c5f82d1f089ffa62a021ed92fea77785ebd7fae9a0944400f8dcb40e8f90ded6da213b75639b40b7a1f58836a810ec0019b46805a3bd2d2ea92aaef47ac2d9bb6c172eddf9f5eac69ba325d7b57ede15cdbfbc736250f4b8031ba21913cd52cfeb7ef4c4deb8eba5887f623cb86a72004d295c8befad862d12320f43a82223c811f6691720a2dd166365b3f40813a7ab46f52104e2422bc1a62ad538e5e382ed8de825543e5a7a4bc74cd4f8138ced75c6957a0e81e201e54b1dd5b67cfe40d09654b7ed96156b497a0726168d8f569ee49e7e27ae7f5ae821834a381b65da3f0846ad75189aa9273238698da8bdbeb7a686207d6c943dbab146185b1fda5eb56ca954585099a6329dcd6c54178f8c253248dacaf82d1d9621cd631373ef5455d3410c25a9c42e21b214bb504f4ca72268d908a6928b337a403af3ecaaca36de7b8a6f4d3ed9b2905c04dcb4f4ac347910164f6c819787161ff893da4045972da83d7a38e62cb77ee2c1c3cd16656bb550681428c9d696749acfd1021c67d8304e813a531ba3dea821179a88d4ba48dbdac72c718200da6e2e12ab5187ccd65bee3acc350976e444c6587e6a07248a999268008ef2c1c13aae2b624fb94623b3d718d7893c407454660883594d969631076767389394c4a7e9b64ff75ffef5f5975c3adabee603195e27963549ac645cb1502b6375e5b32fb8fec28710e7a12e9f3f50dff14924cd8667f7c5d57975c31e76c6a54540614da6e6335f3a72cf43c318459cd798459064ac92ad356863b7c04ca5994aed91c9deada41770e7527475c9ad807d6bab88d5290150882b956473f3e24bb7def35f07a39ad5562d5273df37d27d0fcd14438a1c206a5984935d4a44a4085bfdd0fbde605f7d6dfaf30fb9b7deea2589a148e9db42138ec8742349e927b45c51681744701e1162e6c597edf0e909888ea9420b4b50bf64d80150833167328f639286f30840486e3b99322805538138ba57af66892dc6d7dfb0636d754591fa7c5219c66d2d97f14ec711c8e715ac64895e208af4f545fde27bd3bb3f3abef9d650ba55460e044c8ea4360cff602cb824fecc2a5ad5a2b9c076a59b1d2bf35fbaf12cd756644202beb1730c0c89ac488cb465e5d97219439f2725c4d4a3332d131d2ace80eedc67ac7164b3f7bbd61efeddb73e6f2b633108896e36635251359092fa84b344c7486ac813de937f9cfaa30ff673b277bed14e415ee40872c49b0d4a045588ea04efc35af36a3e679a69f4c8a9b7bff595678df77a461a41750d21ecc3bcab6b42488b5a477d54c670856305f68060e7843f4ea22032a889c4a89d76b332b78b6fdcf4fcdd7b3ef8aaf7dfb2ff9e2f4feffdca834727109708519ac00869c322056532ef8c9d808c2a2acf79d944f4849577626a2891c45e8a1a7f782ef204263a63adb9e4e20bafb9ac7bc34d579e5f7fa93fb8e11875e1ff60b4a3decd66c1ae1413a061fb23a46dabe78065c0d4a31f99df7d038c2d9a8f625704a3b899d6d55b8601aa5bbbb0d717d5db2fa6f9d3dda8f4521005149dc9f36c1c35dc1f3aa8ffe0afeffcc30f7c2e318763df45a643bff5866b7ff5f5d79cb1c684702c6c2c03a04ca05c45ba86b098b2af34bd5f4f0f94f5af3b268c202ea9dad1461030ea995c9da4b27bee5aecbcba455d241887249d3cbc71fb05e3e4b053a64b140e012668ab7d8a20c283f29acd589fbca3767bef4cabca22c2467964f3c474f51c349efd63af7adb031fffeca368120ae8cbafdafd8fbf7f697cf28e9e09dd54a1b98901276537f4e82411834408b171cecf42c55054fa66ca43a5496b9ce2e412284bb65add743876f07b0bdf526e955add6dc7e70fc120e2a836a92a92937cb4d8082f35c417d4f70d11f01ed8550818068378c5f78e384dfc4a99a9c73ff3822b768aaa291da77dee55dbd4a13b4653dfced4b6aa1a01628f44b36d6c1b5f9b190eb08daae6a198a65315ad3b5a9c024abaa99ab4a4200151eadaea59aadda214c33a3156e890746d76fc385da1860b4977f28a522fb492e082d08bd4102e8baa4688f284c05341023201b8558cc7a2eb4284c6f278b181a02092eca9cf8f2d22bd38ecb2d2fb38876011de36f4857830432b00749162b4b1cf739f66dc6b60f388477ce599bb603dfe02053baf8738a5d69948f248947af8efbc1b37bef2010247b014f352e30c3c8b58d264176489dcd0c127aaa27155200e56b53e261a46f6476396e7d44b6367af7bd919d7eeb9ae9f15b73a3dbb7ed8f8c7488d5226d0327bae8830a32858963a3af02243bee24544d230e02b762b2c4f05511eeea60cce521a9dfbb3a208a8b4821880c5cd00407bce4f34ab97fae9d71004d27a20892843840170585087932d12877322f27c6faaaa76b9e7e8263a448c0333a6f4b19c33faea8ee640b77da5efd73503280e9907a6c6d27c699b1722881ddb36b8120d256d7403e3d2ba21b2d0125595628f1b280b85bec4847af539f6ec6b8551891c16632ec13659f76e4b77ced5feeb87537a9cdc04ecd84cba72295a15fea2d15c4de6d13b79d1d56531eb44138e919bda30bca64a9b516be6876273281e51888ae0d43c41ae1d2abdf7bd448a34b0c26e81f3b05d5482443445b2a965e683d68d0decc6f5d91be6db506fbf0edbc09f51238f1e12767b6aa5f93e7fcbf35c266f9565ea6e9a50a0af1ebb4feb42e844532fb827215d3402849b508c1a5047e3279be9daabf7e5ee5960a247cd0e0cf61d636cb7bbbde0e7f17d1deb39aadaf49d2e0c2b4ef74a95eb8bef02ccb54a65e912b25a2d2a17f274f547df6cba7325d96d142d231b3acec762d9e49bf9b617cdfda3b569a39ed1d239461930ffe95c0ba3564dbd117c4752c710da412f90a9f5eeeee59f2a2bcf183a12c0dbc48acf1ebfe0f3f139e1eadf86416c9ad57257ac131a3bcd6b35b7d3e45769c662f066ab88de0ae656ddb3de1c57ce2327a99e1e552377d12085e356d11b968a71e91bf3335ec01bc636c6cf83ae09c3697d106cb856e8dc2268a6dc3ba407a977bd525df6cb28616e79e233721b7be1b84d16336e13e24732bdf4ce59b765a67a1a0dc4f8719b3a2d4f7b0a07f2aea241c0a1f483dcf43e435ff3678b6a557b7a7aaaca60adeeb16593c5789d722e4daeebbaebee90f9905ba9619cd3ec63980ceda343f28c76dccad17acbd63db797d567488a0dc3638a0c2c0819221837598c6e8040b8bf8f30989d7df5192ffc1b3b13fd78ba1712d0f5746196ae13b3d75ef85771d755a44f071a2aaaea06e56210839489cd16d7854db2ad2eab19985197bc5eef79ef4c733385d287c4951b126ca02a2e24542833311028d8a26912ad21db375aee9dc8c7965bc54f3ad73675268c4875b287fe99ba432b49134215a4d1294c57a9d291e2b163fc92f7c78b5e43ca533b040aaa726655cc9429652da7ddc46e28040a364618cf2c81cfd5b15787f7aadbaf9fc439f32417930cb5a8787c61a19495192fa16c8626000bb44bc844b9d92e354bce3c147ab9e332d4a0619ac6a40c4dc035a8d1d4e9c2065ad949cc6bbbdaeb3fe2cfbca8cedc3f6ed9cf667f7e3bd24fb358beb421f2994fc374886aae862c99ec3b7ae79bdc43778eaaad8ceee6765273f76761683e1283193c214093799cf46e68129903cb40503c4ed3260e9533a18be5b61c33356a1c870c57a1e1ed29cb3baeafaefb50df35dc0d99ebd849d53d198b69ae28f2d2fdb6c237a2eb4004c32f3dce2e7fe15db3bdef843d4cd52dc25cb7638fc6f4b10e9455c71d9360e8fce4963a2a4494093167d235c042fc23e327b96d9b936db2e6ab2f21f3fd86ba715be3737fa17bceefc8974cb4413934a54572c9d739be5b0a6df6b1f01ea7665cc3c71bc1fbf2305e5787e9b7d5fafef8d9df34fb6fc3f37374e99ce116f283698ad731d3dc15e3b09fbc0508681b6aa5580c0451d948dd1c212a5c4f49c01bb1d1f6925f69ae7a4bdcf24c080d9e50817676556c48a1b7a5c17527ac4d1673db57be1a819d944969233940b659d28291181d271a365a9b0f7dd6def7c7ea81db6d3543e9d2690eb31c108281d8a6694cd1df3c10092016c0b065664c23dea70c336aaddbea99afd357fe86da7639be96ae82cd59a6c5408c4644e6897c5140be3374c2da64f1424d5b6c4e551cbe61433f4c7ac0e00ca218531065c929d207bb48ac7ea2f7fdc5fcc07ff48fde55fb094dbd882d9a18bea442e1cc2051bc8d8ba5a5e0ee7cd54eaa586f7f5175d1cfe98b5f61c63b872687be1b5d3dab12dfd3089e8325295859be992449f4f4b5c96299b9e053ba0082ca9182e101fe7499d24b4a77320cc882d5f491c85c39bb5e3c910ede97fefbd3e6c8036a7218816b1ebf436e9eb55babd573fd68976fcfabb63fb3ddbe5bed7c35356ad0c58ddc9811ac0bb6993bcc2df9538fe03b39a974210b23b7124f5c9b2c3ef1edff87affc0f4f56474bffb34a150000000049454e44ae426082';
            else
                hexori = '89504e470d0a1a0a0000000d494844520000003b000000380802000000ccd3174a000000017352474200aece1ce90000000467414d410000b18f0bfc6105000000097048597300000ec300000ec301c76fa8640000138d494441546843cd9a7bac675755c7f7f33c7ef735337d31d3c740870aa5055a4a4b49319896a4f22a34144541123512e10f43084a78844000158d9ae033d5c447442480d6b162084c694b551eb6a04526ca50fb60686b67a69d7b7f8f73f6d90f3febdcb1f44e4d3a954ee2bebfdcfbfbfdce39fbacbdd6777dd777ed737529453de1282aebc1285b9459943029958aaaab94557ce9f9761c41e9a494cfd9186d94ce9bdf2a6538ce077e07a59c8a46de7abe35257349295a19359462b4562a69e5558946475d268a2f1e374ec8e2a87a9731c2cb87ac8a1db0ae2eae306f72aa7f402d6e8f8f7c4dcd0ea8eedbb13fd0741b831aa255a95a32f5b9a6bdb0692f56d56e75da6b94c9aa32e3acd86c933256a941b17819195b343f53575a9ca4ece6995bc689f938c5649df852de28a39d1e36d4ec907af0e3fdfa67fbd93fd5bdf269c918957cd7a564f15a616ae5b41bcd104b64446fb65f94cebe2e9cf13ae3f7346318a21aac61e59888e143914bc4dbaa0cca8c3eda3a4ec8e25ea95ae29a9531844d1fbeb57cf763e1e11beaa8624ade2a8d3b079582724e9c86b539172c661073f98db38c186eb52f01b32a77fa35faac5fc8a75e510c5f3b951f71799bb2bdd29d4a6b9cccd5a3e1c78f13b2b8a847725a31da96e93fc76fbf531fb9c5aa7a087df4b5ce7d053a0170f1c5dbc1853ee57abc0a8b35972893588080555bb14601a54aad28bb9e8a0aa7ff58bbe7fd71e902eb04c280df1afc930b2eb751b392c78d13b238e35ca63ff0abc3dd1f497a564ce54370a64a26283321b0034955483ae048de004b57308099471c720330093cbba81a5f99129890048cdabaac6aa67ed6fbf58ef7a8957aa1e64d99487048483fd76a69bcff967162387ef8b6d977de670eddd26248d18325af9589a307f488537ca975311153b4aa950e4c8b9142138c4d676beb49c7627aae36a95199a311371b67498f5d57b5e77e2cad3d2797a18a9ea5836ff78438961982cb15660db55e2f6afba07275efdfe4fd3fbe791abf37dfe863103b81d59ec0887949db596e26ed059f2ca7be2aea7e64520230c021091b001a91abd783aab7581c259c29696bc9dbc1f436b8839fded8ffd6953ce5e8a3e632362d7eecb53fc8f0d9669306bbda956eedfc3fcfbb5e6f1c2988b50e430b40035fc2247d24758fbbab907c8e264bc087073f9def7c832f89589fd42114089ce01cad66452d3d6f6f7edaabc1b9221ff122083183299ea399e272eca2cd21a9b20eb054496abacf7cfdf53626ac67519baf47c7711f7fc031e011271c3157f51277bef31ab37e07e60e1abeec94eef176ccc2d7e4ca561fe7b156a68d108ebadb2e2ab323584b623d4a8b8f23c8e33fffdf06e4d7117fad97484c7e544e6bbb9bcbbe10da67e269ab82560dc55f6abfd0fa6347c6a4850a1375c7ebbad961554d7a086b84d1e618df7015ebdc74f3533384798a99a45211642a278566fd7bfdd7df560d212bd74305a255b8f580fb8e47055677f77da47af8760c9de5d972563dd07eccd8bcc7b10f4fd1603a5f102af52ce28c48e19c6b5f1ffabcbaf70f2a6a13281d4f4ac2d25b2d2e1c9adebbb8ff77e63955616509fd645df3bf80e1291e394e744c73ddd755354894559b43d066fdae0fabf080dc5c4741b1b228165d2866e357200208d8dbafd3f7fcfd60179932d16b833ed3d66446215e49b000d20ba562334e4f6a70e1269c365db0192ade7363f90d1548b11b8f020d0839397bd62bd3a53770a21bcae0b34fa39c2b252741b07547ef3c7ae83695e72ab7312a53898e812dba2415351997902d4009b07199bc797263d35cc6a67d8fbe983c6a37248319d638b4a14ae8402ea88e1eda67370ea05d491fca8a50037f3366e0ef12d3777edbf60f428fc6841a8494ba87072984be64975011f07c21b1b905565345f0c79379e1437e4bc6a333e425dff026d30a588a7ece12046a5c41e813e36282eda6e9deeb3d72c51289ded8314e54f0a47c1dee1f3e77a1d64732a5991485bc87da557021339a1805f58404976cba0a483d792f6f199bfe666036b37d7fb03cf1bd464c55d9ce9b6d931f3d882c49255835a1f8719d3402e5812ff9ee08320c3d282a363a4deb4104502e5deb87d6a7ca22d6b39470c95cae3cc67127fa3a66cfd68f8c262f11541b2b9bbd019f2354f050061841371b87cb435f4805629e20c3049056aa2149f959228d295e2fe9826c8aa015481b47a24eb55f68073ba2b29806d850179d16c1f6245e9b6078f42388e4c59b6c67caf7da076d897621c2440fa77360909eafeaeefd0b57d040ac53c85b38420d53fdf01781912e0d9a318545c0079a08d48bd20cce2d343da9c2bf0e01cf11f452a2e43fb9b149e4fcde7cc38083522a33a517c6ccb25a007427f282b9a5e3d12563277dda433773190bb1aa228fe82f955a3cd07d6e27304da96a90434ead179c9b01fcbf1e48d3695552685a75f6ce7ac79a33798616047970e70f380818a4f4957f770ee64c65c7aa3ae7ace595b6c461463386691bb63449d724fc6b1f567e5b9266ace04dadefdedbdff1fa4ae4b1aee827a8e5360364dbad5ef9cbc397be39241bdba4fffa83faea0bf20c9a49aa2a661872ddf8849b58bdb56376eadad603dd86d613daa042b007c8a0213e46075b7c522e2ef77a8a3a6cb3ed4cfafc7fb86bde1b2db9aef50b2facfff603ddb6ec0374665435d8e8135d5876fde4d27d71d7952014a8ca5e819a1e44530ad7162851c31612730ca18a4c2047d8a7e9d057cdf6181df901f6a75ebb5af5c330003c5a0916e554ed55881dfdf6845e42e5a3a5b774cc4675fc198ced35c994f482185ad5aa50aaa8b6e7734682b6113a685697ad2dd02908efea10adbcc93dfd4e5cffb2d043860be06c94697f1751b0d66328d0cab271d218517b7d6f4d452c42ac953dbab146189b3034bd6a58527158e04ced4c6b330bd504cc4b6490b4ce84d516cb90e6b18eb9f7920235a651920a0143642956a11e9acd44d0b2104c2517e7f48074e6d93b67eb1002c5b7229f6ce924174955f02c789ade058b279620b5415a7c74bce435b5b8aca2f6e8e1a2ea3ff3c5bb8ed4abca56aa53689494a2ad2c48582cd0025c6758304e813a5313a3dea820179a88d4f848dbdac72c7182009a961ceb43ad0e9b6d9fbae508f7a4c6452632c6f253795aa462668013c0513eb858c77545ec31bac01f786adf55e6d0cddccf4305c5ce756a3855db79f22fffe8caad771e8634e5ceb67ff6d9eaa5e74f76accd87ceeb6a6046f255ac841f3bb5bca49ef7dca75f7deedd64f3a252ff72b0bae956240d3d373ce4abbcb2618f78e35337a0b0a633f3957fcbff78f7d87e3aaa6b7dc585abb7fcd2213013a425a7811398390a49ac8f3ee3d26d2fdea7b2e7432936865baff5076f845a22b51ac2ad654b0578c738f9d08d677ef49307609b8a744c4003df46c5c264dd722f5c0a5b8d4c2b45180ef9c3b7d86b5f927eef06ffeecf0cd0186008d2b7a99ade51dc2e3db6d439e9a609abf4cdca249b9b77fdc49ef7bffc9b707d674da3337d07f5c291b9d12ccebb66f5b28fa3eac6bd973224bf834c199582712c8bee35a8b92c31bef9d567acad2c2b525f38d4d405ef689ca0e304e4f30dd730442f1045fafaa27efafaf4e1cf2e7d0473db15b52416ca95d486f103c6824be20fd937aa4173816da7eb3396173f73cd69be71644202beb1f54683c55162a4d5e5e7ca6d0c5c2125c4549353adb70315674477eee16aebc9e61076adddf32bef7ee1b6968c943ca2bce0188887aa338a4fe40b26911af28663f2c1abdffc44bf207b171bcd0cda2242e2cc6036d0ee542127aac7946ab1708b85565836f1ea7def7ecd694b778421e2bbb6262bfb61d1561521a445ada23e2adb70146301a0c47ae7946cf5f054a64f3435eaaf34b33612e5eebeeb2e1d6effc46bdffba6175c79f1f9cbabaec76560064ee0cf28f150a7806519ce01d1c43dc8fe9b942338cad9bea41a26c09119c18acf7487b3884850a72dd53ffc82f3dff1c68bbff1c937bce505df734737e8983b14dae0b5d77535ef074bd6e274639f41da521c478d0da6eebf7171dbabab281b3d2c9e7cc42fb8992a1e6cc483eddab9bdde53ed7826cd9f6e27a5470d082b83abbcc8c6b3d270f890fef53fb9f937feec6b09bb1007457687def59697fcfc9baf38650d6db5246c2c1b40003479c79286a19ba918d2ec4e3d3b58d6ffd36b0245b6a8cad3461030c92b891fdeb9ea966ee7250dea22c138a536d37b36f63e7d2979ec947ca07008307154155204110194572cc68614bcf731046f608f2ec2467962f3d4b4d502349efee2d7bee75bfbbe7abf43a096fc8a8b76ffd5af9d1f1fbea9872d660acd4d7632a96475a64cc8ce0f695c7b1fe6031928b556531ed00783c6295e6e81b264a9eeba23b185df1bd94f97add295dd76e91c630723f50ed5265545729253a11278a92630a0beaf894008c08e8446a48a5742ef89d3342c97b97af02b975db81379954bcbb4175fb45d1dbe69320bcd5c6d776e02880312cd36b1a94365e638c0d6ca2d8662ea56395a77b4b8740c6443455a5290c01d756de534d5ac0ac3d2bc910a641be95a9ff123281bede8a4926c4f52eaa92139c105431ff0bb7019b406f6a580d393501d90093ed76e00a4be1da0f39097ba0d0a1091644d7d7ea08bf4e2b0cb721fe28272e2d0b9435f88475075196cea528c36f67911d2dc1bda1df8009896403e894eb35277765e0d714aad33117f734aee9569eefbcc23fbae237023b95072bc41f5a74c81406b30685886909cf3b433022f2a79d08400ca455150746b7846a9efaacbef1d2eeee7c5afcc4eafee3927dcba6caa39ed034163c1a8c58c3413780842b844eab6aa004c24dc85d50acb5734d7a5c292e47b334caefc3bbfeb159dea1aac18f77ca46bb2c3fa62efe561f69d8909a3f4b31a382504f598d8ac0bbdcddcc0d0bbd047e7aa36f4b9a22df011a4199444e9633193538a9ab4d572dfaf6bdddb70482d74e6e63e6b7934227a0ba002bc48ba92691a5ab2d20223b2d012ce850884e92c640db836ad3cbf7ee5adc6ae6635e7dea00223c8c7d8fbd5f6699728b39d708fd50b9521fc0a8de931ea4350de3135f5364812966ede960d6c20ab356a3a87504cd398c5e192ef8b8fecaf6607557f6881c7ea16c0830e721115441039bf47450a398a60c7430b1bd332853d6e44520d4f1a28308340a3da1d2f1bfc2a8e35651288c1a3ed00232df6874fbdd067f2564196a403116f4d2f769fcc81d089a6eaece0a48b46802005606ed87ce9e17ab676edfedc3edb219d50b323837d7fd87677f3f437b1f22a560b8262fa56974eeae0c91dc9f9be847680b95600609b90d5941e3fe4d9ca0fbdddb46749b2d3b852b864418ff1b18ce977f30d972fc2fd9569a29e67d2df0a1d1e3b7a724667d48aa93686d0922271189a512f509fabdded2bbe5496cfa44193f3d0d98e731f3be0f3a5a70d97bcd7956cd3bc92a762add0d8491e2bb999a5b0427b1e8760b6d17d790773abf6d96f8fcb67479a24d41faa469ea2a12b1e33a41184aece7f6b3ef3320e185b9bb0187445184eea8b60c3b542e716413343e8d28354bb5ea39ef3b34817c40a3ed3942bd1305b2d46d008f12399aebc79deaece554fa381183f76f4a48d9ec281bc73154d0d5a03dbbaea147dc5ef766e4507d885aa325aab7b6cd9ea63acd564649b7ddbbeeca68e38f8e52aa3f98ff7ca53fbd254b5ca5315822ece2f1fad56b75db5b7ac9cc9a1cdcd638a0f044d6180b6b7588c6e804094595035e6a75f72ca8bfed4cea79b95e9a40e24a0ef07640a5d2766afbde88fe2ae8b489f1634b834940d239b49a3c03dcee2aab04896d5525d6469cf7ab3beeafab95ee2c25c90b8f2408205b8e287840a951d16a6229c344da2356432a3e5d9c95883c6a58e2eac6c6aa9b5a43a71a47f96c69306514e4357d725cbc32d1de9d7cf587ae91fc73daf23e59d45843081f36645cc945dca6a2c6de2faff1928a0040f735fea57c57955ecd5913bd4deaba7715143ed3151d74404d82194b23ce72bd9c193bd502cd03e2113a513970d5199591e704853b3d9598920e0adf6ac4b3ea1934b61018dac24e6b55dcdd5378653f754b94aa6613d5bfd796c1c67b13ccf13f92ce269b3fcca45d574ffd19bdfe6efbe79e2b6d17a2fec1499d074262241d109784280864a950b6b7a0fd90796dd40f1386a461c2a33497b5768105974947f1118ef42c3dbd3f49d71b57bd95ff66d5d977aa1632b55f7442ca6b95281792a4527cb74dc01449499d64bd9e7af7f707ec707600fe3da6e58e86609a5e043ac06caaa47dd0c06de9747eaf895650b2e9079232c646ed97e92c7b639d93a6b6fcb90d18855edb7c58b7faa7dfe87e49f4cb409a5ab4b93a4ff19a5e0e3c6568b85f7981ae5c897b5e07df332be5747e8b7d5fa81f8d55f34076e60f10b74e942596437d531061d33cd1d1a15fbc95b8040a740ad94f96547436e647384a8703d25016fc45adb67fd5c7dd13be3ea79101a3ca106dad995f18e436fe91fc78dd4ad638bc53d0d0c7fb09332a932801ded25a89db68d23b9748ad6e6c35fb5dff82df5adbdd6cd919f111b642f078448836fb4a63145c5f24224805800c392916a138e5386532c55e3cefb49fdbc77a8ed17e06be92a589cb5030d374a9b7c20e124b19fe8d97fa7660d3627172524897e98f480c1073ac1e288b2e414e9835d24563fd5fb7f7f71f01ffafb6fa9c294a65ec4164d8c2fe87e684ad81c73e9814083b6d6355317ab1d97bb3d6fd4cf7c9559da393639f4ddc694b94b132013b878243bf029ff99f48438a647104a425c8f9b02108fa082cbe832b9751ed5b46c900da87de880e3ccaebb87d2a16fa4fffab279e45b6a7aa484681ebc491e9e35dbdcca5961b22b3467bb1de7353b76ab9dd752a392dca39607338275c1b64af5c2923fd504be9349a50be98c3c4a7cfcd88ae3ffff43a9ff06a8e14d57f8bd19ad0000000049454e44ae426082';
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn)
            dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
    //  Y.Assert.areSame(h, itmp.height, "height of image");
    //  Y.Assert.areSame(w, itmp.width, "width of image");
        Y.Assert.areSame(hexdb, hexori, "content of image");
     },
     
     testSelectSQLVariantReceivedType_bigint: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
              var q = "select  value FROM [test_variant] where id = 1";
              var resultSet = dbconn.execute(q);
              var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value), 'number',"base type bigint");
     },
     testSelectSQLVariantReceivedType_binary: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 2";
             var resultSet = dbconn.execute(q);
             var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value), 'object',"base type binary");
     },
     testSelectSQLVariantReceivedType_char: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 3";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value), 'string',"base type char");
     },
     testSelectSQLVariantReceivedType_date: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 4";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value), 'string',"base type date");
     },
     testSelectSQLVariantReceivedType_datetime: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 5";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value), 'object',"base type datetime");
     },
     
     testSelectSQLVariantReceivedType_datetime2: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 6";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value), 'string',"base type datetime2");
     },
     testSelectSQLVariantReceivedType_decimal: function() {
        // decimal data is presented on JS layer as String
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 8";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value), 'string',"base type must be number");
     },
     testSelectSQLVariantReceivedType_float: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 9";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value), 'number',"base type float");
     },
     testSelectSQLVariantReceivedType_int: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 10";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value), 'number',"base type int");
     },
     testSelectSQLVariantReceivedType_money: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 11";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value),'number',"base type money");
     },
     testSelectSQLVariantReceivedType_nchar: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
              var q = "select  value FROM [test_variant] where id = 12";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value),'string',"base type nchar");
     },
     testSelectSQLVariantReceivedType_numeric: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 13";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value),'string',"base type numeric");
     },
     testSelectSQLVariantReceivedType_nvarchar: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
              var q = "select  value FROM [test_variant] where id = 14";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value),'string',"base type nvarchar");
     },
     testSelectSQLVariantReceivedType_real: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 15";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value),'number',"base type real");
     },
     testSelectSQLVariantReceivedType_smalldatetime: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 16";
             var resultSet = dbconn.execute(q);
             var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value),'object',"base type smalldatetime");
     },
     
     testSelectSQLVariantReceivedType_smallint: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 17";
             var resultSet = dbconn.execute(q);
             var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value),'number',"base type smallint");
     },
     testSelectSQLVariantReceivedType_smallmoney: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 18";
             var resultSet = dbconn.execute(q);
             var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value),'number',"base type smallmoney");
     },
     testSelectSQLVariantReceivedType_time: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 19";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value),'string',"base type time");
     },
     testSelectSQLVariantReceivedType_tinyint: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 20";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value),'number',"base type tinyint");
     },
     testSelectSQLVariantReceivedType_varbinary: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 21";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value),'object',"base type varbinary");
     },
     testSelectSQLVariantReceivedType_varchar: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "select  value FROM [test_variant] where id = 22";
            var resultSet = dbconn.execute(q);
            var rows = resultSet.getNextRow();;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(rows.value),'string',"base type varchar");
     },
        testSelectSQLVariantValue_bigint: function() {
            var exceptionOccur = false;
            

            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                 var q = "select  value FROM [test_variant] where id = 1";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.areSame(rows.value , 1233,"base type bigint");
        },
        testSelectSQLVariantValue_binary: function() {
            var exceptionOccur = false;
           
            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q = "select  value FROM [test_variant] where id = 2";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.areSame(rows.value.toBuffer().toString('hex') , '30',"base type binary");
        },
        testSelectSQLVariantValue_char: function() {
            var exceptionOccur = false;
         
            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q = "select  value FROM [test_variant] where id = 3";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            var eq = rows.value === 'c';
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.isTrue(eq , "base type char");
            //Y.Assert.areSame(rows[2].value , 'c',"base type char");
        },
        testSelectSQLVariantValue_date: function() {
            var exceptionOccur = false;
        

            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                 var q = "select  value FROM [test_variant] where id = 4";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            var eq = rows.value === '2004-08-05';
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            //Y.Assert.areSame(rows[3].value , '2004-08-05',"base type date");
            Y.Assert.isTrue(eq,"base type date");
        },
        
        // testSelectSQLVariantValue_datetime: function() {
        //     var exceptionOccur = false;
        //     var datetime = new Date("2004-08-05T00:00:00.000Z");
    
        //     var exceptionMsg = "";
        //     try {
        //         var dbconn = conn.connect(params);
        //         var q = "select  value FROM [test_variant] where id = 5";
        //         var resultSet = dbconn.execute(q);
        //         var rows = resultSet.getNextRow();;
        //     }
        //     catch (err) {
        //         exceptionOccur = true;
        //         exceptionMsg = err.message;
        //     }
        //     if (dbconn) dbconn.close();
        //     Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        //     Y.Assert.areSame(rows.value.getTime() , datetime.getTime() ,"base type datetime (" + rows.value.toUTCString() + "," + datetime.toUTCString() + ")");
        // },
        testSelectSQLVariantValue_datetime2: function() {
            
            //SSMS tranque  les données datetime2
            var exceptionOccur = false;
     

            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
              var q = "select  value FROM [test_variant] where id = 6";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();;
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            
            if (dbconn) dbconn.close();
            var eq = "1968-10-23 12:45:37.1237" === rows.value;
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.isTrue(eq ,"base type datetime2");
            //Y.Assert.areSame(rows[5].value , '1968-10-23 12:45:37.123',"base type datetime2");///
        },
        testSelectSQLVariantValue_decimal: function() {
            var exceptionOccur = false;
            
            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q = "select  value FROM [test_variant] where id = 8";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.areSame(rows.value , '586',"base type decimal");
        },
        testSelectSQLVariantValue_float: function() {
            var exceptionOccur = false;
         
            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q = "select  value FROM [test_variant] where id = 9";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.areSame(rows.value , 5225.5,"base type float");
        },
        testSelectSQLVariantValue_int: function() {
            var exceptionOccur = false;
            

            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
               var q = "select  value FROM [test_variant] where id = 10";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.areSame(rows.value , 569,"base type int");
        },
        
        testSelectSQLVariantValue_money: function() {
            var exceptionOccur = false;
          
            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q = "select  value FROM [test_variant] where id = 11";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.areSame(rows.value, 586,"base type money");
        },
        testSelectSQLVariantValue_nchar: function() {
            var exceptionOccur = false;
           

            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q =  "select  value FROM [test_variant] where id = 12";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            var eq = rows.value === 'n';
            if (dbconn) dbconn.close();
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.isTrue(eq,"base type nchar");
        },
        testSelectSQLVariantValue_numeric: function() {
            var exceptionOccur = false;
            
            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q = "select  value FROM [test_variant] where id = 13";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.areSame(rows.value, '54752',"base type numeric");
        },
        testSelectSQLVariantValue_nvarchar: function() {
            var exceptionOccur = false;
           
            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q = "select  value FROM [test_variant] where id = 14";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            var eq = '4' === rows.value;
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.isTrue(eq, "base type nvarchar");
        },
        // testSelectSQLVariantValue_smalldatetime: function() {
        //     var exceptionOccur = false;
           
        //     var smalldatetime = new Date("2004-08-05T00:00:00.000Z");

        //     var exceptionMsg = "";
        //     try {
        //         var dbconn = conn.connect(params);
        //         var q = "select  value FROM [test_variant] where id = 16";
        //         var resultSet = dbconn.execute(q);
        //         var rows = resultSet.getNextRow();
        //     }
        //     catch (err) {
        //         exceptionOccur = true;
        //         exceptionMsg = err.message;
        //     }
        //     if (dbconn) dbconn.close();
        //     Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        //     Y.Assert.areSame(rows.value.getTime(), smalldatetime.getTime(), "base type smalldatetime (" + rows.value.toUTCString() + "," + smalldatetime.toUTCString() + ")");
        // },
        testSelectSQLVariantValue_smallint: function() {
            var exceptionOccur = false;
           
            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q = "SELECT value FROM [test_variant] where id = 17;";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.areSame(rows.value, 568,"base type smallint");
        },
        testSelectSQLVariantValue_smallmoney: function() {
            var exceptionOccur = false;
           
            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q = "SELECT value FROM [test_variant] where id = 18;";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here !" + exceptionMsg);
            Y.Assert.areSame(rows.value, 785,"base type smallmoney");
        },
        
        testSelectSQLVariantValue_time: function() {
            var exceptionOccur = false;
            
            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q = "SELECT value FROM [test_variant] where id = 19;";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            var eq = rows.value === '12:10:05.1234';
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.isTrue(eq ,"base type time");
        },
        testSelectSQLVariantValue_tinyint: function() {
            var exceptionOccur = false;
           
            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q = "SELECT  value FROM [test_variant] where id = 20;";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.areSame(rows.value, 56,"base type tinyint");
        },
        testSelectSQLVariantValue_varbinary: function() {
            var exceptionOccur = false;
           

            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q = "SELECT value FROM [test_variant] where id = 21;";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.areSame(rows.value.toBuffer().toString('hex'), '30',"base type varbinary");
        },
        testSelectSQLVariantValue_varchar: function() {
            var exceptionOccur = false;
           
            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q = "SELECT  value FROM [test_variant] where id =22;";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            var eq = rows.value == 'd';
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.isTrue(eq,"base type varchar");
        },

        
    testSelectTimestampType: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "SELECT * FROM [test_timestamp]";

             var resultSet = dbconn.execute(q);
             var rows = resultSet.getAllRows();
             var val = rows[1].value;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(typeof(val),'object',"la valeur n'est pas un objet");
         Y.Assert.areSame(val.toBuffer().toString('hex').toUpperCase(),'00000000000007D3',"laveur inncorrect !");

        },

        testSelectuniqueidentifier: function() {
         var exceptionOccur = false;
         var exceptionMsg = "";
         try {
             var dbconn = conn.connect(params);
             var q = "SELECT * FROM [test_uniqueidentifier]";

             var resultSet = dbconn.execute(q);
             var rows = resultSet.getAllRows();
             var val = rows[1].value;
         }
         catch (err) {
             exceptionOccur = true;
             exceptionMsg = err.message;
         }
         if (dbconn)
             dbconn.close();
         
         Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         Y.Assert.areSame(val,'70F62E15D64043BB8AC3A0FC7EF04619',"laveur inncorrect !");
        },
        
    //testing to connect with no parameters
    testConnectWithNullParams: function()    {
        var exceptionOccur = false;
        try {
            var dbconn = conn.connect(null);
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur with null parameters!");
    },

    //testing to connect with invalid hostname
    testConnectWithInvalidHostname: function()    {
        var invalidParams = {
            dbType : 'mssql',
            hostname: '0.0.0.0',
            user: 'root',
            password: '',
            database: 'testdb_win',
            port: 3306,
            encryptionMode :"not supported"
           
        };
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(invalidParams);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, "Can't connect to "+invalidParams.hostname+":"+invalidParams.port+".");
    },

    //testing to connect with invalid port value
    testConnectWithAnInvalidPortValue: function()    {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var invalidParams = Object.create(params);
            invalidParams.port = 33;
            var dbconn = conn.connect(invalidParams);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!"); 
        Y.Assert.areSame(exceptionMsg, "Can't connect to "+params.hostname+":33.");
    },

    //testing to connect with invalid port type
    testConnectWithAnInvalidPortType: function()    {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var invalidParams = Object.create(params);
            invalidParams.port = "55236";
            var dbconn = conn.connect(invalidParams);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #port, expected Number.");
    },

    //testing to connect with invalid database name
    testConnectWithAnInvaliddatabaseName: function()    {////////////////////
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var invalidParams = {
                    dbType : params.dbType,
                    hostname: params.hostname,
                    user: params.user,
                    password: params.password,
                    database: 'errobase',
                    port: params.port,
                    encryptionMode : params.encryptionMode
                };
            var dbconn = conn.connect(invalidParams);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        var actualMsg = "An error occurred on the MSSQL server "+ params.hostname +". The error message is \"Échec de l'ouverture de session de l'utilisateur\xA0'"+ params.user +"'.\".";

        Y.Assert.areSame(exceptionMsg, actualMsg);
    },

    //testing to connect with invalid database name type
    testConnectWithAnInvalidDatabaseNameType: function()    {////////////////////

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var invalidParams = {
                dbType : params.dbType,
                hostname: params.hostname,
                user: params.user,
                password: params.password,
                database: 77,
                port: params.port,
                encryptionMode : params.encryptionMode
                };
            var dbconn = conn.connect(invalidParams);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #database, expected String.");
    },

    //testing to connect with invalid userName value
    testConnectWithAnInvalidUserNameValue: function()    {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var invalidParams = {
                    dbType : params.dbType,
                    hostname: params.hostname,
                    user: 'advg',
                    password: params.password,
                    database: params.database,
                    port: params.port,
                    encryptionMode : params.encryptionMode
               
                };
            var dbconn = conn.connect(invalidParams);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, "An error occurred on the MSSQL server "+params.hostname+". The error message is \"Échec de l'ouverture de session de l'utilisateur\xA0'"+invalidParams.user+"'.\".");
    },

    //testing to connect with invalid userName type
    testConnectWithAnInvalidUserNameType: function()     {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
                var invalidParams = {
                    dbType : params.dbType,
                hostname: params.hostname,
                user: 47,
                password: params.password,
                database: params.database,
                port: params.port,
                encryptionMode : params.encryptionMode
            };
            var dbconn = conn.connect(invalidParams);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #user, expected String.");
    },

    //testing to connect with invalid password value
    testConnectWithAnInvalidPasswordValue: function()    {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var invalidParams = {
                dbType : params.dbType,
                hostname: params.hostname,
                user: params.user,
                password: "dqsdfqsdfvcwc",
                database: params.database,
                port: params.port,
                encryptionMode : params.encryptionMode
               
                };
            var dbconn = conn.connect(invalidParams);
          
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, "An error occurred on the MSSQL server "+params.hostname+". The error message is \"Échec de l'ouverture de session de l'utilisateur\xA0'sa'.\"."); 
    },

    //testing to connect with invalid password type
    testConnectWithAnInvalidPasswordType: function()  {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var invalidParams = Object.create(params);
            invalidParams.password = 7;
            var dbconn = conn.connect(invalidParams);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #password, expected String.");
    },

    //test if useDatabase function exist
    testUseDatabaseExist: function() {
        var useDatabaseExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            if (dbconn.useDatabase)
                useDatabaseExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(useDatabaseExist, "useDatabase function definition is missing!");
    },

    //test if useDatabase function logic
    testUseDatabaseLogic: function() {
        var useDatabaseExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        var tmp_db = params.database;
        try {
            var dbconn = conn.connect(params);
            dbconn.useDatabase('master');
            var rs = dbconn.execute("SELECT DB_NAME() AS DataBaseName;");
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        params.database = tmp_db;
        Y.Assert.areSame(row['DataBaseName'], "master", "expected used database 'master'!");
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
    },

    //test if execute function exist
    testExecuteExist: function() {
        var executeExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
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
            var dbconn = conn.connect(params);
            var q = 'SELECT id FROM test_select_table';
            var rs = dbconn.execute(q);
            while (rs.hasNext()) {
                var row = rs.getNextRow();
                res.push(row.id);
            }
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(res.length, 2, "expected 2 ids!");
        Y.Assert.areSame(res[0], 1, "the first id is incorrect");
        Y.Assert.areSame(res[1], 2, "the second id is incorrect!");
    },
    testSelectAs: function()         {
        var exceptionOccur = false;
        
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT TOP 1000 [id] ,[value] as [azer azur]  FROM [test_nchar]';
            
            var resultSet = dbconn.execute(q);
            var row = resultSet.getNextRow();
            var colNameFromObject;
            for(var coln in row){
                colNameFromObject =coln;
            }
            var colNameFromFct = resultSet.getColumnName(1);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(colNameFromFct, 'azer azur', "Name of column from resultSet.getColumnName(1)''");
        Y.Assert.areSame(colNameFromObject, 'azer azur', "Name of column from the object row");
    },
testExecuteWithMultipleSelect: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT id FROM test_select_table;SELECT string FROM test_select_table;';
            var rs = dbconn.execute(q);
            var i = 0;
            while (rs !== null) {
                r = [];
                while (rs.hasNext()) {
                    var row = rs.getNextRow();
                    if (i === 0) {
                        r.push(row.id);
                    }
                    else {
                        r.push(row.string);
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
        Y.Assert.areSame(res[0][0], 1, "the first id is incorrect");
        Y.Assert.areSame(res[0][1], 2, "the second id is incorrect!");
        Y.Assert.areSame(res[1][0], "3", "the first string is incorrect");
        Y.Assert.areSame(res[1][1], "4", "the second string is incorrect!");
    },

    testExecuteWithUpdate: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            var dbconn = conn.connect(params);
            var q1 = 'UPDATE test_execute_update_table SET number=1, string=\'x\' WHERE id=1';
            dbconn.execute(q1);
            var q2 = 'SELECT number, string FROM test_execute_update_table WHERE id=1';
            var rs = dbconn.execute(q2);
            var row = rs.getNextRow();
            var n = row.number;
            var s = row.string;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(n, 1, "incorrect number!");
        Y.Assert.areSame(s, "x", "incorrect string!");
    },
    testExecuteWithInsert: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            var dbconn = conn.connect(params);
            var q = 'INSERT INTO test_insert_table VALUES (1, 1001, \'b1002\');';
            dbconn.execute(q);
            var qq = 'SELECT number, string FROM test_insert_table WHERE id=1';
            var rs = dbconn.execute(qq);
            var row = rs.getNextRow();
            var n = row.number;
            var s = row.string;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(n, 1001, "incorrect number!");
        Y.Assert.areSame(s, "b1002", "incorrect string!");
    },
    testExecuteWithDelete: function() { //////////dz
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            var dbconn = conn.connect(params);
            var q1 = 'DELETE FROM test_execute_update_table WHERE id=1000';
            var rs = dbconn.execute(q1);
            var q2 = 'SELECT number, string FROM test_execute_update_table WHERE id=1000';
            rs = dbconn.execute(q2);
            var nbsel = rs.getRowsCount();
            var q3 = 'insert into test_execute_update_table  values(1000, \'1000\', \'thousand\')';
            dbconn.execute(q3);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(nbsel, 0, "incorrect rows number! (expected : 0)");
    },
    //test if hasMoreResults function exist
    testHasMoreResultsExist: function() {
        var hasMoreResultsExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            if (dbconn.hasMoreResults)
                hasMoreResultsExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(hasMoreResultsExist, "hasMoreResults function definition is missing!");
    },

    //test if hasMoreResults function 
    testHasMoreResultsLogic: function() {////////////////////////////////
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT id FROM test_select_table;SELECT string FROM test_select_table;';
            var rs = dbconn.execute(q);
            var i = 0;
            var moreBefore = dbconn.hasMoreResults();
            var res=[];
            while (rs !== null) {
                r = [];var row;
                while (rs.hasNext()) {
                    row = rs.getNextRow();
                    if (i === 0) {
                        r.push(row.id);
                    }
                    else {
                        r.push(row.string);
                    }
                }
                res.push(r);
                rs = dbconn.getNextResult();
                ++i;
            }
            var moreAfter = dbconn.hasMoreResults();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(moreBefore);
        Y.Assert.isFalse(moreAfter);
    },

    //test if getResultCount function exist
    testGetResultCountExist: function() {
        var getResultCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
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
    
    //test if getResultCount function
    testGetResultCountLogic: function() {////////////////////////
        var getResultCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT id FROM test_select_table;SELECT string FROM test_select_table;';
            var rs = dbconn.execute(q);
            var nbResults = dbconn.getResultCount();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(nbResults, 2, "expected 2 result sets!");
    },


    //test if getNextResult function exist
    testGetNextResultExist: function() {
        var getNextResultExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
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
            var dbconn = conn.connect(params);
            var q = 'SELECT id FROM test_select_table;SELECT number FROM test_select_table;';
            var results = 0;
            var rs = dbconn.execute(q);
            while (rs !== null) {
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
            var dbconn = conn.connect(params);
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
            var dbconn = conn.connect(params);
            if (dbconn) dbconn.close();
            var q = 'select * from test_select_table';
            dbconn.execute(q);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, "Cannot execute query, no valid mssql session.");
    },

    //test find exist
    testFindExist: function() {////////////////////////
        var findExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            if (dbconn.find) findExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(findExist, "close function definition is missing!");
    },
    
    //test find 
    testFindLogic: function() {////////////////////////
        var findExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        var row = {};
        try {
                var dbconn = conn.connect(params);
                row = dbconn.find("id", "test_find_table", {
                number: 3
            });
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here ! " + exceptionMsg);
        Y.Assert.isFalse(row == null, "find ruturn null !");
        Y.Assert.areSame(row.id, 4, "");
    },

    //test if createPreparedStatement function exist
    testcreatePreparedStatementExist: function() {//////////////////////
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            if (dbconn.createPreparedStatement)
                createPreparedStatementExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(createPreparedStatementExist, "createPreparedStatement function definition is missing!");
    },
    
    //test if createNamedPreparedStatement function exist
    testcreateNamedPreparedStatementExist: function() {//////////////////////
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            if (dbconn.createNamedPreparedStatement)
                createNamedPreparedStatementExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(createNamedPreparedStatementExist, "createNamedPreparedStatement function definition is missing!");
    },
    
    //testing all ResultSet methods exist
    //test if hasNext function exist
    testHasNextExist: function() {
        var hasNextExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
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
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
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
    testGetRowsCountExist: function() {
        var getRowsCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
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
    testGetRowsCountLogic: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var count = 0;
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            count = result.getRowsCount();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(count, 2, "expected value : 2");
    },

    //test if getColumnsCount function exist
    testGetColumnsCountExist: function() {
        var getColumnsCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
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
        var exceptionOccur = false;
        var exceptionMsg = "";
        var columnCount = 0;
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
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
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
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

    //test  getColumnName function logic
    testGetColumnNameLogic: function() {    //////////////////////
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            var colnameid = result.getColumnName(0);
            var colnameNumber = result.getColumnName(1);
            var colnameErr = result.getColumnName(3);    //undefined
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(colnameid, 'id', 'expected "id" as value');
        Y.Assert.areSame(colnameNumber, 'number', 'expected "number" as value');
    },

    //test if getColumnFlags function exist
    testGetColumnFlagsExist: function() {
        var getColumnFlagsExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
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
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.getColumnType)
                getColumnTypeExist = true;
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
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
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


    //test isSelect function logic
    testIsSelectLogic: function() {//////////////////////////
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            var isselect = result.isSelect();
            
            var q2 = 'UPDATE test_execute_update_table SET number=0, string=\'a\' WHERE id=1';
            result = dbconn.execute(q2);
            var isselectUpdate = result.isSelect();
            
            var q2 = 'INSERT INTO test_delete_table VALUES(142, 142)';
            result = dbconn.execute(q2);
            var isselectIsert = result.isSelect();
            
            var q2 = 'DELETE FROM test_delete_table WHERE id = 142';
            result = dbconn.execute(q2);
            var isselectDelete = result.isSelect();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(isselect, "expected value 'true'");
        Y.Assert.isFalse(isselectUpdate, "expected value for update 'false'");
        Y.Assert.isFalse(isselectIsert, "expected value for update 'false'");
        Y.Assert.isFalse(isselectDelete, "expected value for update 'false'");
    },

    //test if isError function exist
    testIsErrorExist: function() {
        var isErrorExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
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
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
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

    //test getAffectedRowCount function logic
    testGetAffectedRowCountLogic: function() {///////////////////////
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'UPDATE test_execute_update_table SET number=0, string=\'a\' WHERE id=1';
            var result = dbconn.execute(q);
            affectedRows = result.getAffectedRowCount();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(affectedRows, 1, "expected 1 row affected");
    },

    //test if getNextRow function exist
    testGetNextRowExist: function() {
        var getNextRowExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.getNextRow)
        getNextRowExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getNextRowExist, "getNextRow function definition is missing!");
    },

    //test getNextRow function logic
    testGetNextRowLogic: function() {/////////////////////
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            var row1 = result.getNextRow();
            var row2 = result.getNextRow();
            var row3 = result.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(row1.id, 1, "expected id = 1");
        Y.Assert.areSame(row2.id, 2, "expected id = 2");
        Y.Assert.areSame(row3,null , "expected to return null");
    },

    //test if getNextRows function exist
    testGetNextRowsExist: function() {
        var getNextRowsExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
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

    //test getNextRows function logic
    testGetNextRowsLogic: function() {////////////////////////
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            var rows = result.getNextRows(2);
            var res2 = dbconn.execute(q);
            var rows2 = res2.getNextRows(3);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows.length, 2, "expected length = 2");
        Y.Assert.areSame(rows2.length, 2, "expected length = 2");
    },

    //test if getAllRows function exist
    testgetAllRowsExist: function() {/////////////////////////
        var getAllRowsExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT id FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.getAllRows) getAllRowsExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getAllRowsExist, "getAllRows function definition is missing!");
    },

    //test getAllRows function logic
    testgetAllRowsLogic: function() {////////////////////////
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT id FROM test_select_table';
            var rs = dbconn.execute(q);
            var rows = rs.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].id, 1, "invalid value of 1st row's id");
        Y.Assert.areSame(rows[1].id, 2, "invalid value of 2nd row's id");
        Y.Assert.areSame(rows.length, 2, "invalid length");
    },

    //test if skipRows function exist
    testSkipRowsExist: function() {
        var skipRowsExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.skipRows) skipRowsExist = true;
            
        
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn)
            dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(skipRowsExist, "skipRows function definition is missing!");
    },

    //test  skipRows function logic
    testSkipRowsLogic: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            result.skipRows(1);
            var row = result.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(row.id, 2, "expected id = 2");
    },

//Test Types

//Nombre entiers
    //test bit 
    testSelectBit: function() {
        var exceptionOccur = false;

        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
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
        Y.Assert.areSame(rows[0].value, false, "expected false as Value!");
        Y.Assert.areSame(rows[1].value, true, "expected true as Value!");
        Y.Assert.areSame(rows[2].value, null, "expected null as Value!");

    },
    //test tinyInt 
    testSelectTinyInt: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT value FROM test_tiny_int WHERE id =1 or id =2;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[1].value, 255, "expected 255 as value!"); //check value
        Y.Assert.areSame(rows[0].value, 0, "expected 0 as value!"); //check value
    },
    //test smallInt 
    testSelectSmallInt: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT value FROM test_small_int WHERE id =1 OR id = 3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
        Y.Assert.areSame(rows[0].value, -32768, "expected  -32768 as Value!");
        Y.Assert.areSame(rows[1].value, 32767, "expected 32767 as  Value!");
    },
    //test Int
    testSelectInt: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
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
        Y.Assert.areSame(rows[0].value, -2147483648, "expected -2147483648  as value!"); //check value!
        Y.Assert.areSame(rows[1].value, 2147483647, "expected 2147483647 as value!"); //check value!
    },
    //test BigInt
    testSelectBigInt: function() {////////////////////////////
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            
            var dbconn = conn.connect(params);
//            var q123 =  'SELECT value FROM test_big_int WHERE id <4';
            var q0 =    'SELECT value FROM test_big_int WHERE id = 2';
            var q45 =   'SELECT value FROM test_big_int WHERE id =4 OR id = 5;';

            var resultSet = dbconn.execute(q0);
            var rows0 = resultSet.getAllRows();
            var resultSet = dbconn.execute(q45);
            var rows45 = resultSet.getAllRows();
//            var rows45 = resultSet.getAllRows();
//            var resultSet = dbconn.execute(q123);
//            var rows123 = resultSet.getAllRows();
            
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "no exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows0[0].value, 0, "expected 0 as  Value!");
        Y.Assert.areSame(rows45[0].value, 9007199254740992, "expected 9007199254740992 as  Value!");
        Y.Assert.areSame(rows45[1].value, -9007199254740992, "expected -9007199254740992 as  Value!");
    },
    testSelectBigInt_out_of_range: function() {////////////////////////////
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            
            var dbconn = conn.connect(params);4
            var q12 =   'SELECT value FROM test_big_int WHERE id =1 OR id = 2;';
4
            var resultSet = dbconn.execute(q12);
            var rows12 = resultSet.getAllRows();//excep

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "an exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(exceptionMsg, "Big Integer out of Range.", "expected \"Big Integer out of Range.\" as exception!");
    },
    //test Decimal 
    testSelectDecimal: function() {//////////////////
        var exceptionOccur = false;

        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT value FROM test_decimal;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, '8888888.14288888888888888823', "expected '8888888.14288888888888888823' as Value!"); 
        Y.Assert.areSame(rows[1].value, '-844542168.74564564568454543542', "expected '-844542168.74564564568454543542' as  Value!"); 
        Y.Assert.areSame(rows[2].value, null, "expected null as Value!");
        Y.Assert.areSame(rows[6].value, '111111111111111111.11111111111111111111', "expected 111111111111111111.11111111111111111111 as Value!");
    },
    //test float 
    testSelectFloat: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT value FROM test_float';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, -1.7976931348623157E+308, "expected  -1.7976931348623157E+308 as Value!"); //check value
        Y.Assert.areSame(rows[1].value, 1.7976931348623157E+308, "expected 1.7976931348623157E+308 as Value!"); //check value
        Y.Assert.areSame(rows[2].value, -3.4028234E+38, "expected -3.4028234E+38 as  Value!"); //check value
        Y.Assert.areSame(rows[3].value, 3.4028234E+38, "expected 3.4028234E+38 as  Value!"); //check value
        Y.Assert.areSame(rows[4].value, 1, "expected 1 as  Value!"); //check value
    },
test_datetime: function() {//////////
        var exceptionOccur = false;

        var datetime        = new Date("Mon Jan 01 1753 00:00:00 GMT+0000");

        var ddatetime       = new Date("Fri Dec 31 9999 23:59:59 GMT+0000");
        
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT datetime FROM test_allTimeTypes;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].datetime.getTime(), datetime.getTime(), "datetime min (" + rows[0].datetime.toUTCString() + "," + datetime.toUTCString() + ")");
        Y.Assert.areSame(rows[1].datetime.getTime(), ddatetime.getTime(), "datetime max (" + rows[1].datetime.toUTCString() + "," + ddatetime.toUTCString() + ")");
    },
test_time: function() {//////////
        var exceptionOccur = false;

        var time            = "00:00:00.0000000";

        var dtime       = "23:59:59.9990000";
        
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT time FROM test_allTimeTypes;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        
        Y.Assert.areSame(rows[0].time, time, "time min ");
        Y.Assert.areSame(rows[1].time, dtime, "time max");
    },
test_datetime2: function() {//////////
        var exceptionOccur = false;

        var datetime2       = "0001-01-01 00:00:00.0000000";

        var ddatetime2      = "9999-12-31 23:59:59.0000000";
        
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_allTimeTypes;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].datetime2, datetime2, "datetime2 min ");
        
        Y.Assert.areSame(rows[1].datetime2, ddatetime2, "datetime2 max");
    },
test_ddatetimeoffset: function() {//////////
        var exceptionOccur = false;

        var datetimeoffset  = "0001-01-01 00:00:00.0000000 -01:00";

        var ddatetimeoffset = "9999-12-31 23:59:59.0000000 +00:00";
        
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_allTimeTypes;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].datetimeoffset, datetimeoffset, "datetimeoffset min ");
        
        Y.Assert.areSame(rows[1].datetimeoffset, ddatetimeoffset, "datetimeoffset max");
    },
    
    //test String cahr(10), varchar(50), varchar(max), text, nchar(10), nvarchar(50), nvarchar(max), and ntext
test_char10: function() {//////////discu
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_strings;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].char10, "a         ", "char10");
        
        
        Y.Assert.areSame(rows[2].char10, "          ", "char10");
    },
     test_varchar50: function() {//////////discu
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_strings;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].varchar50, "a         ", "varchar50");
        
        Y.Assert.areSame(rows[2].varchar50, "", "varchar50");
    },
     test_varcharmax: function() {//////////discu
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_strings;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].varcharmax, "a         ", "varcharmax");
        
        
        Y.Assert.areSame(rows[2].varcharmax, "", "varcharmax");
    },
     test_text: function() {//////////discu
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_strings;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].text, "a         ", "text");
        
        
        Y.Assert.areSame(rows[2].text, "", "text");
    },
     test_nchar10: function() {//////////discu
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_strings;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].nchar10, "a         ", "nchar10");
        
        
        Y.Assert.areSame(rows[2].nchar10, "          ", "nchar10");
    },
     test_nvarchar50: function() {//////////discu
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_strings;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].nvarchar50, "a         ", "nvarchar50");
        Y.Assert.areSame(rows[2].nvarchar50, "", "nvarchar50");
    },
     test_nvarcharMAX: function() {//////////discu
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_strings;';
            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].nvarcharMAX, "a         ", "nvarcharMAX");
        Y.Assert.areSame(rows[2].nvarcharMAX, "", "nvarcharMAX");
    },
     test_ntext: function() {//////////discu
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_strings;';
            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].ntext, "a         ", "ntext");
        Y.Assert.areSame(rows[2].ntext, "", "ntext");
    },
    
    testSelectString: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT value FROM test_string WHERE id <= 1;';
            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, 'test value', "expected  'test value' as Value!");
        Y.Assert.areSame(rows[1].value, '', "expected '' as  Value!");
    },
    
     test_xml: function() {//////////discu
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_xml;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, "<xml/>", "");
        Y.Assert.areSame(rows[2].value, "<service><id>jenkins</id><name>Jenkins</name><description>This service runs Jenkins continuous integration system.</description><env name=\"JENKINS_HOME\" value=\"%BASE%\"/><executable>%BASE%\\jre\\bin\\java</executable><arguments>-Xrs -Xmx256m -Dhudson.lifecycle=hudson.lifecycle.WindowsServiceLifecycle -jar \"%BASE%\\jenkins.war\" --httpPort=9080</arguments><logmode>rotate</logmode></service>", "");
    },
    
    /**/
    //test select various collations
    
         testCollations_Latin1_General_CI_AS: function() {
             var exceptionOccur = false;
             var exceptionMsg = "";
             var row = {};
             try {
                 var dbconn = conn.connect(params);
                 var rs = dbconn.execute("select COL_Latin1_General_CI_AS from test_collations");
                 var row = rs.getNextRow();
             }
             catch (err) {
                 exceptionOccur = true;
                 exceptionMsg = err.message;
             }
             if (dbconn) dbconn.close();
             Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
             Y.Assert.areEqual(row.COL_Latin1_General_CI_AS, 'Latin1', "Incorrect value for field with collation Latin1_General_CI_AS");
             
         },
 
         testCollations_Arabic_CI_AS: function() {
             var exceptionOccur = false;
             var exceptionMsg = "";
             var row = {};
             try {
                 var dbconn = conn.connect(params);
                 var rs = dbconn.execute("select COL_Arabic_CI_AS from test_collations");
                 var row = rs.getNextRow();
             }
             catch (err) {
                 exceptionOccur = true;
                 exceptionMsg = err.message;
             }
             if (dbconn) dbconn.close();
             Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
             Y.Assert.areEqual(row.COL_Arabic_CI_AS, 'العربية', "Incorrect value for field with collation Arabic_CI_AS");
             
         },
 
         testCollations_Polish_CI_AS: function() {
             var exceptionOccur = false;
             var exceptionMsg = "";
             var row = {};
             try {
                 var dbconn = conn.connect(params);
                 var rs = dbconn.execute("select COL_Polish_CI_AS from test_collations");
                 var row = rs.getNextRow();
             }
             catch (err) {
                 exceptionOccur = true;
                 exceptionMsg = err.message;
             }
             if (dbconn) dbconn.close();
             Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
             Y.Assert.areEqual(row.COL_Polish_CI_AS, 'wygładzać', "Incorrect value for field with collation Polish_CI_AS");
             
         },
 
         testCollations_Cyrillic_General_CI_AS: function() {
             var exceptionOccur = false;
             var exceptionMsg = "";
             var row = {};
             try {
                 var dbconn = conn.connect(params);
                 var rs = dbconn.execute("select COL_Cyrillic_General_CI_AS from test_collations");
                 var row = rs.getNextRow();
             }
             catch (err) {
                 exceptionOccur = true;
                 exceptionMsg = err.message;
             }
             if (dbconn) dbconn.close();
             Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
             Y.Assert.areEqual(row.COL_Cyrillic_General_CI_AS, 'Русский язык из Википедии', "Incorrect value for field with collation Cyrillic_General_CI_AS");
             
         },
 
         testCollations_Turkish_CI_AS: function() {
             var exceptionOccur = false;
             var exceptionMsg = "";
             var row = {};
             try {
                 var dbconn = conn.connect(params);
                 var rs = dbconn.execute("select COL_Turkish_CI_AS from test_collations");
                 var row = rs.getNextRow();
             }
             catch (err) {
                 exceptionOccur = true;
                 exceptionMsg = err.message;
             }
             if (dbconn) dbconn.close();
             Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
             Y.Assert.areEqual(row.COL_Turkish_CI_AS, 'Türkiye', "Incorrect value for field with collation Turkish_CI_AS");
             
         },
 
         testCollations_Modern_Spanish_CI_AS: function() {
             var exceptionOccur = false;
             var exceptionMsg = "";
             var row = {};
             try {
                 var dbconn = conn.connect(params);
                 var rs = dbconn.execute("select COL_Modern_Spanish_CI_AS from test_collations");
                 var row = rs.getNextRow();
             }
             catch (err) {
                 exceptionOccur = true;
                 exceptionMsg = err.message;
             }
             if (dbconn) dbconn.close();
             Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
             Y.Assert.areEqual(row.COL_Modern_Spanish_CI_AS, 'español', "Incorrect value for field with collation Modern_Spanish_CI_AS");
             
         },
 
         testCollations_Czech_CI_AS: function() {
             var exceptionOccur = false;
             var exceptionMsg = "";
             var row = {};
             try {
                 var dbconn = conn.connect(params);
                 var rs = dbconn.execute("select COL_Czech_CI_AS from test_collations");
                 var row = rs.getNextRow();
             }
             catch (err) {
                 exceptionOccur = true;
                 exceptionMsg = err.message;
             }
             if (dbconn) dbconn.close();
             Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
             Y.Assert.areEqual(row.COL_Czech_CI_AS, 'Česká republika', "Incorrect value for field with collation Czech_CI_AS");
             
         },
 
         testCollations_Romanian_CI_AS: function() {
             var exceptionOccur = false;
             var exceptionMsg = "";
             var row = {};
             try {
                 var dbconn = conn.connect(params);
                 var rs = dbconn.execute("select COL_Romanian_CI_AS from test_collations");
                 var row = rs.getNextRow();
             }
             catch (err) {
                 exceptionOccur = true;
                 exceptionMsg = err.message;
             }
             if (dbconn) dbconn.close();
             Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
             Y.Assert.areEqual(row.COL_Romanian_CI_AS, 'Română limbă', "Incorrect value for field with collation Romanian_CI_AS");
             
         },
 
 
         testCollations_Hebrew_CI_AS: function() {
             var exceptionOccur = false;
             var exceptionMsg = "";
             var row = {};
             try {
                 var dbconn = conn.connect(params);
                 var rs = dbconn.execute("select COL_Hebrew_CI_AS from test_collations");
                 var row = rs.getNextRow();
             }
             catch (err) {
                 exceptionOccur = true;
                 exceptionMsg = err.message;
             }
             if (dbconn) dbconn.close();
             Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
             Y.Assert.areEqual(row.COL_Hebrew_CI_AS, 'עִבְרִית', "Incorrect value for field with collation Hebrew_CI_AS");
             
         },
 
         testCollations_Japanese_CI_AS: function() {
             var exceptionOccur = false;
             var exceptionMsg = "";
             var row = {};
             try {
                 var dbconn = conn.connect(params);
                 var rs = dbconn.execute("select COL_Japanese_CI_AS from test_collations");
                 var row = rs.getNextRow();
             }
             catch (err) {
                 exceptionOccur = true;
                 exceptionMsg = err.message;
             }
             if (dbconn) dbconn.close();
             Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
             Y.Assert.areEqual(row.COL_Japanese_CI_AS, '日本語', "Incorrect value for field with collation Japanese_CI_AS");
             
         },

         testCollations_Korean_90_BIN: function() {
             var exceptionOccur = false;
             var exceptionMsg = "";
             var row = {};
             try {
                 var dbconn = conn.connect(params);
                 var rs = dbconn.execute("select COL_Korean_90_BIN from test_collations");
                 var row = rs.getNextRow();
             }
             catch (err) {
                 exceptionOccur = true;
                 exceptionMsg = err.message;
             }
             if (dbconn) dbconn.close();
             Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
             Y.Assert.areEqual(row.COL_Korean_90_BIN, '한국어', "Incorrect value for field with collation Korean_90_BIN");
             
         },
         
         testSelectOrderByCompute: function() {
             var exceptionOccur = false;
             var exceptionMsg = "";
             try {
                 var dbconn = conn.connect(params);
                 var q = 'select * from [test_strings] order by varchar50 compute count(id)';
    
                 dbconn.execute(q);
             }
             catch (err) {
                 exceptionOccur = true;
                 exceptionMsg = err.message;
             }
             if (dbconn) dbconn.close();
             Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
         },
         
    testPreparedStatement_execute_before_setting_params: function(){//////////////////////////
        var exceptionOccur = false;
        var exceptionMsg = "";
        var messagevoid = false;
        try {
            var dbconn = conn.connect(params);
            var prepStmt = dbconn.createPreparedStatement("SELECT * FROM test_nchar WHERE id = ? or id = ?");
            var rs = prepStmt.execute();
        }catch(err){
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if(dbconn){
            dbconn.close();
        }
        Y.Assert.isTrue(exceptionOccur, "An Exception  shall occur here !");
    },
    
    // testPreparedStatement_execute_param_out_of_bound: function(){
        // var exceptionOccur = false;
        // var exceptionMsg = "";
        // var messagevoid;
        // try {
            // var dbconn = conn.connect(params);
            // var prepStmt = dbconn.createPreparedStatement("SELECT * FROM test_nchar WHERE id = ? or id = ?");
            // prepStmt.setNthParameter(1,1);
            // prepStmt.setNthParameter(2,2);
            // prepStmt.setNthParameter(3,2);
            // var rs = prepStmt.execute();
        // }catch(err){
            // exceptionOccur = true;
            // exceptionMsg = err.message;
            // messagevoid = (exceptionMsg == "");
        // }
        // if(dbconn){
            // dbconn.close();
        // }
        // Y.Assert.isTrue(exceptionOccur, "An Exception shall occur here !");
    // },
    
    testPreparedStatement_setNthParameter: function(){
        var exceptionOccur = false;
        var exceptionMsg = "";
        var rows;
        try {
            var dbconn = conn.connect(params);
            var prepStmt = dbconn.createPreparedStatement("SELECT * FROM test_nchar WHERE id = ?");
            prepStmt.setNthParameter(1,1);
            var rs = prepStmt.execute();
            rows = rs.getAllRows();
        }catch(err){
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if(dbconn){
            dbconn.close();
        }
        Y.Assert.isFalse(exceptionOccur, "No Exception shall occur here !");
        Y.Assert.areSame(rows[0].id, 1);
    },
    
    testPreparedStatement_setParameters: function(){
        var exceptionOccur = false;
        var exceptionMsg = "";
        var rows;
        try {
            var dbconn = conn.connect(params);
            var prepStmt = dbconn.createPreparedStatement("SELECT * FROM test_nchar WHERE id = ? or id = ?");
            prepStmt.setParameters([1,2]);
            var rs = prepStmt.execute();
            rows = rs.getAllRows();
        }catch(err){
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if(dbconn){
            dbconn.close();
        }
        Y.Assert.isFalse(exceptionOccur, "No Exception shall occur here !");
        Y.Assert.areSame(rows[0].id, 1,"first id");
        Y.Assert.areSame(rows[1].id, 2, "second id");
    },
    
    testPreparedStatement_getParameterCount: function(){
        var pc;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var prepStmt = dbconn.createPreparedStatement("SELECT * FROM test_nchar WHERE id = ? or id = ?");
            prepStmt.setParameters([1,2]);
            var rs = prepStmt.execute();
            pc = prepStmt.getParameterCount();
        }catch(err){
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if(dbconn){
            dbconn.close();
        }
        Y.Assert.isFalse(exceptionOccur, "No Exception shall occur here !");
        Y.Assert.areSame(pc, 2, "2 parameters");
    },
    
    testPreparedStatement_getColumnCount: function(){
        var exceptionOccur = false;
        var exceptionMsg = "";
        var pc;
        try {
            var dbconn = conn.connect(params);
            var prepStmt = dbconn.createPreparedStatement("SELECT * FROM test_nchar WHERE id = ? or id = ?");
            prepStmt.setParameters([1,2]);
            var rs = prepStmt.execute();
            pc = prepStmt.getColumnCount();
        }catch(err){
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if(dbconn){
            dbconn.close();
        }
        Y.Assert.isFalse(exceptionOccur, "No Exception shall occur here !");
        Y.Assert.areSame(pc, 2, "2 clumns");
    },
    
    testPreparedStatement_set_a_non_existant_parameter: function(){
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var prepStmt = dbconn.createPreparedStatement("SELECT * FROM test_nchar WHERE id = ? or id = ?");
            prepStmt.setNthParameter(1,1);
            prepStmt.setNthParameter(2,2);
            prepStmt.setNthParameter(3,3);
            
            var rs = prepStmt.execute();
        }catch(err){
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if(dbconn){
            dbconn.close();
        }
        Y.Assert.isTrue(exceptionOccur, "An Exception shall occur here !" + exceptionMsg);
        Y.Assert.areSame(exceptionMsg, "Parameter #3 out of bound.");
    },
    
    testPreparedStatement_set_a_non_existant_parameters: function(){
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var prepStmt = dbconn.createPreparedStatement("SELECT * FROM test_nchar WHERE id = ? or id = ? ");
            prepStmt.setParameters([1,2,3,4]);
            var rs = prepStmt.execute();
        }catch(err){
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if(dbconn){
            dbconn.close();
        }
        Y.Assert.isTrue(exceptionOccur, "An Exception shall occur here !");
        
        Y.Assert.areSame(exceptionMsg, "Parameter #3 out of bound.");
    },
    testPreparedStatement_execute_without_setting: function(){
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var prepStmt = dbconn.createPreparedStatement("SELECT * FROM test_nchar WHERE id = ? or id = ? ");
            prepStmt.setParameters([1]);
            var rs = prepStmt.execute();
        }catch(err){
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if(dbconn){
            dbconn.close();
        }
        Y.Assert.isTrue(exceptionOccur, "An Exception shall occur here !");
        Y.Assert.areSame(exceptionMsg, "The parameter number 2 is missing.");
    },
    
    testCreateDatabase: function(){
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var resSet = dbconn.execute("CREATE DATABASE "+params.database+"_copy");
            var rows = dbconn.execute("SELECT * FROM sys.master_files WHERE name = N'"+params.database+"_copy'").getAllRows();
        }catch(err){
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if(dbconn){
            dbconn.close();
        }
        Y.Assert.isFalse(exceptionOccur, "No Exception shall occur here !\n error message : " + exceptionMsg);
        Y.Assert.areSame(rows[0].name, params.database+"_copy", "database not created !")
        
    },
    testCopyTableFromDBtoDB: function(){
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            
            var dbconn = conn.connect(params);
            var resSet = dbconn.execute("  select * into "+params.database+"_2.dbo.texto from "+params.database+".dbo.test_text");
            dbconn.useDatabase(params.database+"_2");
            var rows = dbconn.execute("SELECT * FROM texto where ID = 10").getAllRows();
        }catch(err){
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if(dbconn){
            dbconn.close();
        }
        Y.Assert.isFalse(exceptionOccur, "No Exception shall occur here !\n error message : " + exceptionMsg);
        Y.Assert.areSame(rows[0].value, "test", " invalid data in the new copy ")
        
    },
    testDropDatabase_Transact: function(){
        var exceptionOccur = false;
        var exceptionMsg = "";
        var pParams = Object.create(params);
        pParams.user = 'testuser';
        pParams.password = 'testusersecret';
        try {
            var dbconn = conn.connect(params);
            var resSet = dbconn.execute("ALTER DATABASE "+params.database+"_copy SET SINGLE_USER WITH ROLLBACK IMMEDIATE;");
            var resSet = dbconn.execute("DROP DATABASE "+params.database+"_copy");
            var rows = dbconn.execute("SELECT * FROM sys.master_files WHERE name = N'"+params.database+"_copy2'").getAllRows();
        }catch(err){
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if(dbconn){
            dbconn.close();
        }
        Y.Assert.isFalse(exceptionOccur, "No Exception shall occur here !\n error message : " + exceptionMsg);
        Y.Assert.areSame(rows.length, 0, "database slill exist !");
    },

    /****************************************/
    /*        TEST High Level Api           */
    /****************************************/

    //test if select function exist
    testHAPI1SelectExist: function() {
        var selectExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
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
    //test if insert function exist
    testHAPI2InsertExist: function() {
        var insertExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
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
    //test if update function exist
    testHAPI3UpdateExist: function() {
        var updateExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
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
    //test if delete function exist
    testHAPI4DeleteExist: function() {
        var deleteExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            if (dbconn.delete)
                deleteExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(deleteExist, "delete function definition is missing!");
    },

    // H-API select
    // Select with conditions type number
    testHAPI1SelectWithConditionNumber: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var rs = dbconn.select("*", "test_select_table", {
                id: 1
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
        Y.Assert.areEqual(row.id, 1, "Incorrect id value");
        Y.Assert.areEqual(row.number, 2, "Incorrect number value");
        Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    },
    // Select with conditions type Date
    testHAPI1SelectWithConditionDate: function() {      // WAK0088349
        var exceptionOccur = false;
        var tadeCondition = new Date(Date.UTC(9999, 11, 31, 23, 59, 59, 999));
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var rs = dbconn.select("*", "test_datetime", {
                value: tadeCondition
            });
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn)
            dbconn.close();
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areEqual(row.id, 2, "Incorrect item");
    },
    // Select without Condition empty object as a condition
    testHAPI1SelectWithoutConditionEmptyObject: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var rs = dbconn.select("*", "test_select_table", {});
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message
        }
        if (dbconn)
            dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        // Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #3, expected Object.");
        Y.Assert.areEqual(row.id, 1, "Incorrect id value");
        Y.Assert.areEqual(row.number, 2, "Incorrect number value");
        // Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    },
    // Select without Condition empty param
    testHAPI1SelectWithoutConditionNoParam: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var rs = dbconn.select("*", "test_select_table");
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message
        }
        if (dbconn)
            dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
        // Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #3, expected Object.");
        Y.Assert.areEqual(row.id, 1, "Incorrect id value");
        Y.Assert.areEqual(row.number, 2, "Incorrect number value");
        // Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    },

    // H-API Insert
    // Insert Number String
    testHAPI2InsertNumberString: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var values = [];
        values.push({
            id: 10,
            number: 20,
            string: "aaa"
        });
        var row = {};
        try {
            var dbconn = conn.connect(params);
            dbconn.insert("test_insert_table", values);
            var rs = dbconn.select("*", "test_insert_table", {
                id: 10
            });
            row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
        Y.Assert.areEqual(row.id, 10, "Incorrect id value");
        Y.Assert.areEqual(row.number, 20, "Incorrect number value");
        Y.Assert.areEqual(row.string, "aaa", "Incorrect string value");
    },
    // Insert date
    testHAPI2InsertDate: function() {           //  WAK0089444 timezone
        var dat1 = new Date(Date.UTC(2012, 11, 21, 1, 1, 1));
        var exceptionOccur = false;
        var exceptionMsg = "";
        var values = [];
        values.push({
            id: 7,
            value: dat1
        });
        var row = {};
        try {
            var dbconn = conn.connect(params);
            dbconn.insert("test_datetime", values);
            var rs = dbconn.select("*", "test_datetime", {
                id: 7
            });
            row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
        // Y.Assert.areEqual(row.value.toUTCString(), dat1.toUTCString(), "Incorrect id value");
        Y.Assert.areEqual(row.value, "2012-12-21 01:01:01.0000000", "Incorrect id value");
        // Y.Assert.areEqual(row.number, 20, "Incorrect number value");
        // Y.Assert.areEqual(row.string, "aaa", "Incorrect string value");
    },

    // H-API update
    //test update number, string with number condition
    testHAPI3UpdateNumberStringWithConditionNumber: function() {
        var exceptionOccur = false;
        try {
            var dbconn = conn.connect(params);
            dbconn.update("test_update_table", {
                number: 1,
                string: "chen"
            }, {
                id: 1
            });
            var rs = dbconn.select("*", "test_update_table", {
                id: 1
            });
            var row = rs.getNextRow();
            
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areEqual(row.number, 1, "the number is different");
        Y.Assert.areEqual(row.string, "chen", "the string is different");
    },
    //test update String Without Condition
    testHAPI3UpdateStringWithoutConditionEmptyObject: function() {
        var exceptionOccur = false;
        var exceptionMessage;
        try {
            var dbconn = conn.connect(params);
            dbconn.update("test_update_table", {
                string: "all1"
            }, {

            });
            var rs = dbconn.select("*", "test_update_table", {
                id: 1
            });
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionMessage = err.message;
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMessage);
        Y.Assert.areEqual(row.number, 1, "the number is different");
        Y.Assert.areEqual(row.string, "all1", "the string is different");
    },
    //test update String Without Condition
    testHAPI3UpdateStringWithoutConditionNoParams: function() {
        var exceptionOccur = false;
        var errMessage;
        try {
            var dbconn = conn.connect(params);
            dbconn.update("test_update_table", {
                string: "all2"
            });
            var rs = dbconn.select("*", "test_update_table", {
                id: 1
            });
            var row = rs.getNextRow();
            
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areEqual(row.number, 1, "the number is different");
        Y.Assert.areEqual(row.string, "all2", "the string is different");
    },
    //test update Number With Condition Date
    testHAPI3UpdateNumberWithConditionDate: function() {    //  WAK0089456
        var exceptionOccur = false;
        var errMessage;
        try {
            var dbconn = conn.connect(params);
            var dat1 = new Date(2012, 11, 21, 1, 1, 1);
            dbconn.update("test_datetime", {
                id: 7
            },{
                value : dat1
            });
            var rs = dbconn.select("*", "test_datetime", {
                id: 7
            });
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here ! " + errMessage);
        Y.Assert.areEqual(row.id, 7, "the number is different");
    },
        //test update Date Without Condition empty Object
    testHAPI3UpdateDateWithoutConditionEmptyObject: function() {     //WAK0088355
        var exceptionOccur = false,
            errMessage = "";
        var dat1 = new Date(Date.UTC(2012, 11, 21, 1, 1, 1));
        try {
            var dbconn = conn.connect(params);
            dbconn.update("test_datetime", {
                value: dat1
            },{

            });
            var rs = dbconn.select("*", "test_datetime", {
                //
            });
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here ! " + errMessage);
        Y.Assert.areEqual(row.value, "2012-12-21 01:01:01.0000000", "the number is different");
    },
    //test update Date Without Condition No params
    testHAPI3UpdateDateWithoutConditionNoParams: function() {   //  WAK0089442
        var exceptionOccur = false,
            errMessage = "";
        var dat1 = new Date(Date.UTC(2012, 11, 21, 1, 1, 1));
        try {
            var dbconn = conn.connect(params);
            dbconn.update("test_datetime", {
                value: dat1
            });
            var rs = dbconn.select("*", "test_datetime", {
                id: 7
            });
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here ! " + errMessage);
        Y.Assert.areEqual(row.id, 7, "the number is different");
    },

    // H-API Delete
    // condition number
    testHAPI4DeleteWithConditionNumber: function() {
        var exceptionOccur = false,
            errMessage = "",
            errMessage = "";
        try {
            var dbconn = conn.connect(params);
            dbconn.delete("test_delete_table", {
                id: 1
            });
            var rs = dbconn.select("*", "test_delete_table", {
                id: 1
            });
            var rs = dbconn.execute("select * from test_delete_table where id = 1");
            var rows = rs.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here ! " + errMessage);
        Y.Assert.areEqual(rows.length, 0, "the row with id = 1 must be deleted");
    },
    // condition string
    testHAPI4DeleteWithConditionString: function() {
        var exceptionOccur = false;
        var dat1 = new Date(2012, 11, 21, 1, 1, 1);
        try {
            var dbconn = conn.connect(params);
            dbconn.delete("test_insert_table", {
                string: "aaa"
            });
            var rs = dbconn.select("*", "test_insert_table", {
                id: 10
            });
            var rs = dbconn.execute("select * from test_insert_table where id = 1");
            var rows = rs.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areEqual(rows.length, 0, "the row with id = 1 must be deleted");
    },
    // condition date
    testHAPI4DeleteWithConditionDate: function() {  //  WAK0089457
        var dat1 = new Date(Date.UTC(2012, 11, 21, 1, 1, 1));
        var exceptionMessage = "";
        var exceptionOccur = false;
        try {
            var dbconn = conn.connect(params);
            dbconn.delete("test_datetime", {
                value: dat1
            });
            var rs = dbconn.select("*", "test_datetime", {
                id: 7
            });
        //    var rs = dbconn.execute("select * from test_datetime where id = 1");
            var rows = rs.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMessage);
        Y.Assert.areEqual(rows.length, 0, "the row with id = 1 must be deleted");
    },
    // without conditions
    testHAPI4DeleteWithoutConditionEmptyObject: function() {    //  WAK0089440
        var errMessage = "";
        var dat1 = new Date(2012, 11, 21, 1, 1, 1);
        var exceptionOccur = false;
        var values = [];
        values.push({
            id: 11,
            number: 20,
            string: "aaa"
        });
        try {
            var dbconn = conn.connect(params);
            dbconn.insert("test_insert_table", values);
            dbconn.delete("test_insert_table", {
                
            });
            var rs = dbconn.execute("select * from test_insert_table");
            var rows = rs.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areEqual(rows.length, 0, "the row with id = 1 must be deleted");
    },
    // without conditions
    testHAPI4DeleteWithoutConditionNoParam: function() {
        var errMessage = "";
        var dat1 = new Date(2012, 11, 21, 1, 1, 1);
        var exceptionOccur = false;
        var values = [];
        values.push({
            id: 12,
            number: 20,
            string: "aaa"
        });
        try {
            var dbconn = conn.connect(params);
            dbconn.insert("test_insert_table", values);
            dbconn.delete("test_insert_table");
            var rs = dbconn.select("*", "test_insert_table", {
                id: 12
            });
            var rs = dbconn.execute("select * from test_insert_table");
            var rows = rs.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here ! " + errMessage);
        Y.Assert.areEqual(rows.length, 0, "the row with id = 1 must be deleted");
    },

    //////////////////////////////////////////////////////////
    
    testHAPI2InsertDuplicatedRow: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var values = [];
        values.push({
            id: 2,
            value: 0
        });
        var row = {};
        try {
            var dbconn = conn.connect(params);
            dbconn.insert("test_int", values);
            var rs = dbconn.select("*", "test_insert_table", {
                id: 10
            });
            row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(exceptionMsg, 'An error occurred on the MSSQL server 192.168.4.42. The error message is "Violation of PRIMARY KEY constraint \'PK__test_int__3213E83F29572725\'. Cannot insert duplicate key in object \'dbo.test_int\'. The duplicate key value is (2).".', "incorrect error message");
    },
    testExecuteWithInsertDuplicatedRow: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            var dbconn = conn.connect(params);
            var q = 'INSERT INTO test_int VALUES (2, 0);';
            dbconn.execute(q);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isTrue(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(exceptionMsg, 'An error occurred on the MSSQL server 192.168.4.42. The error message is "Violation of PRIMARY KEY constraint \'PK__test_int__3213E83F29572725\'. Cannot insert duplicate key in object \'dbo.test_int\'. The duplicate key value is (2).".', "incorrect error message");
    },
    testDeleteNonExistingRow_getColumnsCount : function(){
        var errMessage = "";
        var exceptionOccur = false,
            affectedRows = 2,
            isSelect = true;
        try {
            var dbconn = conn.connect(params);
            var res = dbconn.execute("DELETE FROM test_select_table WHERE ID = 987456");
            affectedRows = res.getColumnsCount();
            isSelect = res.isSelect();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areEqual(affectedRows, 0, "columnsCount must be 0");
        Y.Assert.isFalse(isSelect, "isSelect must return false");
    },
    testDeleteNonExistingRow_getAffectedRowCount : function(){
        var errMessage = "";
        var exceptionOccur = false,
            affectedRows = 2,
            isSelect = true;
        try {
            var dbconn = conn.connect(params);
            var res = dbconn.execute("DELETE FROM test_select_table WHERE ID = 987456");
            affectedRows = res.getAffectedRowCount();
            isSelect = res.isSelect();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areEqual(affectedRows, 0, "affectedRows must be 0");
        Y.Assert.isFalse(isSelect, "isSelect must return false");
    },
    /////////////////////////////////
    testExecuteEmptyQuery : function(){
        var errMessage = "";
        var exceptionOccur = false,
            affectedRows = 2,
            isSelect = true;
        try {
            var dbconn = conn.connect(params);
            var res = dbconn.execute("");
            
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
    },
    testNamedPreparedStatementStringParam : function(){
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_select_table WHERE string = :stringParam",
            expectedRows = [
                [
                    {
                        id : 2,
                        number : 3,
                        string : "4"
                    }
                ],
                [
                    {
                        id : 1,
                        number : 2,
                        string : "3"
                    }
                ]
            ];
        try{
            var dbconn = conn.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameter("stringParam", "4");
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameter("stringParam", "3");
            var res = npst.execute();
            rows.push(res.getAllRows());
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areSame(JSON.stringify(rows), JSON.stringify(expectedRows), "wrong results !");
    },
    testNamedPreparedStatementNumberParam : function(){
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_select_table WHERE number = :numberParam",
            expectedRows = [
                [
                    {
                        id : 2,
                        number : 3,
                        string : "4"
                    }
                ],
                [
                    {
                        id : 1,
                        number : 2,
                        string : "3"
                    }
                ]
            ];

        try{
            var dbconn = conn.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameter("numberParam", 3);
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameter("numberParam", 2);
            var res = npst.execute();
            rows.push(res.getAllRows());
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
    },
    testNamedPreparedStatementDateParam : function(){   //  WAK0089459
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_date WHERE value = :dateParam",
            date1 = new Date( Date.UTC(9999, 11, 31) ),
            date2 = new Date( Date.UTC(1900, 0, 1) );

        try{

            var dbconn = conn.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameter("dateParam", date1);
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameter("dateParam", date2);
            var res = npst.execute();
            rows.push(res.getAllRows());
            
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areSame(rows[0].length, 1,         "incorrect number of rows");
        Y.Assert.areSame(rows[1].length, 1,         "incorrect number of rows");
        Y.Assert.areSame(rows[0][0].id, 2,          "incorrect id 1");
        Y.Assert.areSame(rows[1][0].id, 1,          "incorrect id 2");
        Y.Assert.areSame(rows[0][0].value, "9999-12-31",   "incorrect date 1");
        Y.Assert.areSame(rows[1][0].value, "1900-01-01",   "incorrect date 2");
    },
    testNamedPreparedStatementObjectParamString : function(){
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_select_table WHERE string = :stringParam";

        try{
            var dbconn = conn.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameters({
                "stringParam" : "4"
            });
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameters({
                "stringParam" : "3"
            });
            var res = npst.execute();
            rows.push(res.getAllRows());
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areSame(rows[0].length, 1, "incorrect number of rows");
        Y.Assert.areSame(rows[1].length, 1, "incorrect number of rows");
        Y.Assert.areSame(rows[0][0].id, 2,  "incorrect id 1");
        Y.Assert.areSame(rows[1][0].id, 1,  "incorrect id 2");
    },
    testNamedPreparedStatementObjectParamNumber : function(){
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_select_table WHERE number = :numberParam";

        try{
            var dbconn = conn.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameters({
                "numberParam" : 3
            });
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameters({
                "numberParam" : 2
            });
            var res = npst.execute();
            rows.push(res.getAllRows());
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areSame(rows[0].length, 1,         "incorrect number of rows");
        Y.Assert.areSame(rows[1].length, 1,         "incorrect number of rows");
        Y.Assert.areSame(rows[0][0].id, 2,          "incorrect id 1");
        Y.Assert.areSame(rows[1][0].id, 1,          "incorrect id 2");
    },
    testNamedPreparedStatementObjectParamDate : function(){  //  WAK0089459
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_date WHERE value = :dateParam",
            date1 = new Date( Date.UTC(9999, 11, 31) ),
            date2 = new Date( Date.UTC(1900, 0, 1) );

        try{
            var dbconn = conn.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameters({
                "dateParam" : date1
            });
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameters({
                "dateParam" : date2
            });
            var res = npst.execute();
            rows.push(res.getAllRows());
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur,     "No exception shall occur here! " + errMessage);
        Y.Assert.areSame(rows[0].length, 1,  "incorrect number of rows");
        Y.Assert.areSame(rows[1].length, 1,  "incorrect number of rows");
        Y.Assert.areSame(rows[0][0].id,  2,  "incorrect id 1");
        Y.Assert.areSame(rows[1][0].id,  1,  "incorrect id 2");
    },
    testNamedPreparedStatementObjectParametNumberString : function(){
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_select_table WHERE string = :stringParam and number = :numberParam";

        try{
            var dbconn = conn.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameters({
                "stringParam" : "4",
                "numberParam"   : 3
            });
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameters({
                "stringParam" : "3",
                "numberParam"   : 2
            });
            var res = npst.execute();
            rows.push(res.getAllRows());
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur,     "No exception shall occur here! " + errMessage);
        Y.Assert.areSame(rows[0].length, 1,  "incorrect number of rows");
        Y.Assert.areSame(rows[1].length, 1,  "incorrect number of rows");
        Y.Assert.areSame(rows[0][0].id,  2,  "incorrect id 1");
        Y.Assert.areSame(rows[1][0].id,  1,  "incorrect id 2");
    },
    testNamedPreparedStatementObjectParametNumberDate : function(){
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_date WHERE id = :numberParam and value = :dateParam",
            date1 = new Date( Date.UTC(9999, 11, 31) ),
            date2 = new Date( Date.UTC(1900, 0, 1) );

        try{
            var dbconn = conn.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameters({
                "dateParam" : date1,
                "numberParam"   : 3
            });
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameters({
                "dateParam" : date1,
                "numberParam"   : 2
            });
            var res = npst.execute();
            rows.push(res.getAllRows());
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
    },
};


// /!\ REMOVE OR COMMENT THIS LINE BEFORE PUBLISHING THE TEST /!\ 
/**
    var ar = require("unitTest").run(testCase).getReport()['MSSQLConnectorTest'];
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