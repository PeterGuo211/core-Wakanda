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
        
          dbType: 'odbc'
        , dsn: 'MSSQL-test'
        , user: 'sa'
        , password: 'sqlserversa' 
        
    };

var testCase = {
    name: "MSSQLConnectorTest",

    _should: {
        ignore: {
            testDropDatabase_Transact : true,

            testSelectFloat : true,
            testSelectSQLVariantValue_real      :   true,
            testSelectSQLVariantReceivedType_bigint     :   true,
            testSelectSQLVariantReceivedType_binary     :   true,
            testSelectSQLVariantReceivedType_datetime       :   true,
            testSelectSQLVariantReceivedType_float      :   true,
            testSelectSQLVariantReceivedType_int        :   true,
            testSelectSQLVariantReceivedType_money      :   true,
            testSelectSQLVariantReceivedType_real       :   true,
            testSelectSQLVariantReceivedType_smalldatetime      :   true,
            testSelectSQLVariantReceivedType_smallint       :   true,
            testSelectSQLVariantReceivedType_smallmoney     :   true,
            testSelectSQLVariantReceivedType_tinyint        :   true,
            testSelectSQLVariantReceivedType_varbinary      :   true,
            testSelectSQLVariantValue_bigint        :   true,
            testSelectSQLVariantValue_binary        :   true,
            testSelectSQLVariantValue_datetime      :   true,
            testSelectSQLVariantValue_float     :   true,
            testSelectSQLVariantValue_int       :   true,
            testSelectSQLVariantValue_money     :   true,
            testSelectSQLVariantValue_smalldatetime     :   true,
            testSelectSQLVariantValue_smallint      :   true,
            testSelectSQLVariantValue_smallmoney        :   true,
            testSelectSQLVariantValue_tinyint       :   true,
            testSelectSQLVariantValue_varbinary     :   true,
            
            testSelectBinary_image      :   true,
            testSelectuniqueidentifier      :   true,

            testConnectWithAnInvalidPortValue       :   true,
            testConnectWithAnInvalidPortType        :   true,
            testConnectWithAnInvaliddatabaseName        :   true,
            testConnectWithAnInvalidDatabaseNameType        :   true,
            testConnectWithAnInvalidUserNameValue       :   true,
            testConnectWithAnInvalidUserNameType        :   true,
            testConnectWithAnInvalidPasswordValue       :   true,
            testConnectWithAnInvalidPasswordType        :   true,

            testCloseLogic      :   true,

            testSelectBit       :   true,
            testSelectBigInt        :   true,
            testSelectBigInt_out_of_range       :   true,
            test_xml        :   true,

            testPreparedStatement_set_a_non_existant_parameter      :   true,
            testPreparedStatement_set_a_non_existant_parameters     :   true,
            testPreparedStatement_execute_without_setting       :   true,

            testCopyTableFromDBtoDB     :   true,
            testSelectTinyInt       :   true,


            test_smalldatetime : true,
            test_datetime : true,
        }
    },
    
    setUp : function () {
        if (typeof this.initDone === 'undefined') {
           // Do it once:
           this.initDone = true;
                
            var xhr;

            xhr = new XMLHttpRequest({});
                        
            xhr.open('GET', 'http://' + mshost + ':8081/exec' + platform, false);

            xhr.send();
        }
   },

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

    // test  isError function logic
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
//       var eq = (row.COL_Chinese_PRC_BIN === '??/??')
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
        Y.Assert.areSame(rows[0].smalldatetime.getTime(), smalldatetime.getTime(), "smalldatetime min");
        Y.Assert.areSame(rows[1].smalldatetime.getTime(), dsmalldatetime.getTime(), "smalldatetime max");
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
            var hexori = "89504e470d0a1a0a0000000d494844520000003b000000380802000000ccd3174a000000017352474200aece1ce90000000467414d410000b18f0bfc6105000000097048597300000ec300000ec301c76fa8640000138d494441546843cd9a7bac675755c7f7f33c7ef735337d31d3c740870aa5055a4a4b49319896a4f22a34144541123512e10f43084a78844000158d9ae033d5c447442480d6b162084c694b551eb6a04526ca50fb60686b67a69d7b7f8f73f6d90f3febdcb1f44e4d3a954ee2bebfdcfbfbfdce39fbacbdd6777dd777ed737529453de1282aebc1285b9459943029958aaaab94557ce9f9761c41e9a494cfd9186d94ce9bdf2a6538ce077e07a59c8a46de7abe35257349295a19359462b4562a69e5558946475d268a2f1e374ec8e2a87a9731c2cb87ac8a1db0ae2eae306f72aa7f402d6e8f8f7c4dcd0ea8eedbb13fd0741b831aa255a95a32f5b9a6bdb0692f56d56e75da6b94c9aa32e3acd86c933256a941b17819195b343f53575a9ca4ece6995bc689f938c5649df852de28a39d1e36d4ec907af0e3fdfa67fbd93fd5bdf269c918957cd7a564f15a616ae5b41bcd104b64446fb65f94cebe2e9cf13ae3f7346318a21aac61e59888e143914bc4dbaa0cca8c3eda3a4ec8e25ea95ae29a9531844d1fbeb57cf763e1e11beaa8624ade2a8d3b079582724e9c86b539172c661073f98db38c186eb52f01b32a77fa35faac5fc8a75e510c5f3b951f71799bb2bdd29d4a6b9cccd5a3e1c78f13b2b8a847725a31da96e93fc76fbf531fb9c5aa7a087df4b5ce7d053a0170f1c5dbc1853ee57abc0a8b35972893588080555bb14601a54aad28bb9e8a0aa7ff58bbe7fd71e902eb04c280df1afc930b2eb751b392c78d13b238e35ca63ff0abc3dd1f497a564ce54370a64a26283321b0034955483ae048de004b57308099471c720330093cbba81a5f99129890048cdabaac6aa67ed6fbf58ef7a8957aa1e64d99487048483fd76a69bcff967162387ef8b6d977de670eddd26248d18325af9589a307f488537ca975311153b4aa950e4c8b9142138c4d676beb49c7627aae36a95199a311371b67498f5d57b5e77e2cad3d2797a18a9ea5836ff78438961982cb15660db55e2f6afba07275efdfe4fd3fbe791abf37dfe863103b81d59ec0887949db596e26ed059f2ca7be2aea7e64520230c021091b001a91abd783aab7581c259c29696bc9dbc1f436b8839fded8ffd6953ce5e8a3e632362d7eecb53fc8f0d9669306bbda956eedfc3fcfbb5e6f1c2988b50e430b40035fc2247d24758fbbab907c8e264bc087073f9def7c832f89589fd42114089ce01cad66452d3d6f6f7edaabc1b9221ff122083183299ea399e272eca2cd21a9b20eb054496abacf7cfdf53626ac67519baf47c7711f7fc031e011271c3157f51277bef31ab37e07e60e1abeec94eef176ccc2d7e4ca561fe7b156a68d108ebadb2e2ab323584b623d4a8b8f23c8e33fffdf06e4d7117fad97484c7e544e6bbb9bcbbe10da67e269ab82560dc55f6abfd0fa6347c6a4850a1375c7ebbad961554d7a086b84d1e618df7015ebdc74f3533384798a99a45211642a278566fd7bfdd7df560d212bd74305a255b8f580fb8e47055677f77da47af8760c9de5d972563dd07eccd8bcc7b10f4fd1603a5f102af52ce28c48e19c6b5f1ffabcbaf70f2a6a13281d4f4ac2d25b2d2e1c9adebbb8ff77e63955616509fd645df3bf80e1291e394e744c73ddd755354894559b43d066fdae0fabf080dc5c4741b1b228165d2866e357200208d8dbafd3f7fcfd60179932d16b833ed3d66446215e49b000d20ba562334e4f6a70e1269c365db0192ade7363f90d1548b11b8f020d0839397bd62bd3a53770a21bcae0b34fa39c2b252741b07547ef3c7ae83695e72ab7312a53898e812dba2415351997902d4009b07199bc797263d35cc6a67d8fbe983c6a37248319d638b4a14ae8402ea88e1eda67370ea05d491fca8a50037f3366e0ef12d3777edbf60f428fc6841a8494ba87072984be64975011f07c21b1b905565345f0c79379e1437e4bc6a333e425dff026d30a588a7ece12046a5c41e813e36282eda6e9deeb3d72c51289ded8314e54f0a47c1dee1f3e77a1d64732a5991485bc87da557021339a1805f58404976cba0a483d792f6f199bfe666036b37d7fb03cf1bd464c55d9ce9b6d931f3d882c49255835a1f8719d3402e5812ff9ee08320c3d282a363a4deb4104502e5deb87d6a7ca22d6b39470c95cae3cc67127fa3a66cfd68f8c262f11541b2b9bbd019f2354f050061841371b87cb435f4805629e20c3049056aa2149f959228d295e2fe9826c8aa015481b47a24eb55f68073ba2b29806d850179d16c1f6245e9b6078f42388e4c59b6c67caf7da076d897621c2440fa77360909eafeaeefd0b57d040ac53c85b38420d53fdf01781912e0d9a318545c0079a08d48bd20cce2d343da9c2bf0e01cf11f452a2e43fb9b149e4fcde7cc38083522a33a517c6ccb25a007427f282b9a5e3d12563277dda433773190bb1aa228fe82f955a3cd07d6e27304da96a90434ead179c9b01fcbf1e48d3695552685a75f6ce7ac79a33798616047970e70f380818a4f4957f770ee64c65c7aa3ae7ace595b6c461463386691bb63449d724fc6b1f567e5b9266ace04dadefdedbdff1fa4ae4b1aee827a8e5360364dbad5ef9cbc397be39241bdba4fffa83faea0bf20c9a49aa2a661872ddf8849b58bdb56376eadad603dd86d613daa042b007c8a0213e46075b7c522e2ef77a8a3a6cb3ed4cfafc7fb86bde1b2db9aef50b2facfff603ddb6ec0374665435d8e8135d5876fde4d27d71d7952014a8ca5e819a1e44530ad7162851c31612730ca18a4c2047d8a7e9d057cdf6181df901f6a75ebb5af5c330003c5a0916e554ed55881dfdf6845e42e5a3a5b774cc4675fc198ced35c994f482185ad5aa50aaa8b6e7734682b6113a685697ad2dd02908efea10adbcc93dfd4e5cffb2d043860be06c94697f1751b0d66328d0cab271d218517b7d6f4d452c42ac953dbab146189b3034bd6a58527158e04ced4c6b330bd504cc4b6490b4ce84d516cb90e6b18eb9f7920235a651920a0143642956a11e9acd44d0b2104c2517e7f48074e6d93b67eb1002c5b7229f6ce924174955f02c789ade058b279620b5415a7c74bce435b5b8aca2f6e8e1a2ea3ff3c5bb8ed4abca56aa53689494a2ad2c48582cd0025c6758304e813a5313a3dea820179a88d4f848dbdac72c7182009a961ceb43ad0e9b6d9fbae508f7a4c6452632c6f253795aa462668013c0513eb858c77545ec31bac01f786adf55e6d0cddccf4305c5ce756a3855db79f22fffe8caad771e8634e5ceb67ff6d9eaa5e74f76accd87ceeb6a6046f255ac841f3bb5bca49ef7dca75f7deedd64f3a252ff72b0bae956240d3d373ce4abbcb2618f78e35337a0b0a633f3957fcbff78f7d87e3aaa6b7dc585abb7fcd2213013a425a7811398390a49ac8f3ee3d26d2fdea7b2e7432936865baff5076f845a22b51ac2ad654b0578c738f9d08d677ef49307609b8a744c4003df46c5c264dd722f5c0a5b8d4c2b45180ef9c3b7d86b5f927eef06ffeecf0cd0186008d2b7a99ade51dc2e3db6d439e9a609abf4cdca249b9b77fdc49ef7bffc9b707d674da3337d07f5c291b9d12ccebb66f5b28fa3eac6bd973224bf834c199582712c8bee35a8b92c31bef9d567acad2c2b525f38d4d405ef689ca0e304e4f30dd730442f1045fafaa27efafaf4e1cf2e7d0473db15b52416ca95d486f103c6824be20fd937aa4173816da7eb3396173f73cd69be71644202beb1f54683c55162a4d5e5e7ca6d0c5c2125c4549353adb70315674477eee16aebc9e61076adddf32bef7ee1b6968c943ca2bce0188887aa338a4fe40b26911af28663f2c1abdffc44bf207b171bcd0cda2242e2cc6036d0ee542127aac7946ab1708b85565836f1ea7def7ecd694b778421e2bbb6262bfb61d1561521a445ada23e2adb70146301a0c47ae7946cf5f054a64f3435eaaf34b33612e5eebeeb2e1d6effc46bdffba6175c79f1f9cbabaec76560064ee0cf28f150a7806519ce01d1c43dc8fe9b942338cad9bea41a26c09119c18acf7487b3884850a72dd53ffc82f3dff1c68bbff1c937bce505df734737e8983b14dae0b5d77535ef074bd6e274639f41da521c478d0da6eebf7171dbabab281b3d2c9e7cc42fb8992a1e6cc483eddab9bdde53ed7826cd9f6e27a5470d082b83abbcc8c6b3d270f890fef53fb9f937feec6b09bb1007457687def59697fcfc9baf38650d6db5246c2c1b40003479c79286a19ba918d2ec4e3d3b58d6ffd36b0245b6a8cad3461030c92b891fdeb9ea966ee7250dea22c138a536d37b36f63e7d2979ec947ca07008307154155204110194572cc68614bcf731046f608f2ec2467962f3d4b4d502349efee2d7bee75bfbbe7abf43a096fc8a8b76ffd5af9d1f1fbea9872d660acd4d7632a96475a64cc8ce0f695c7b1fe6031928b556531ed00783c6295e6e81b264a9eeba23b185df1bd94f97add295dd76e91c630723f50ed5265545729253a11278a92630a0beaf894008c08e8446a48a5742ef89d3342c97b97af02b975db81379954bcbb4175fb45d1dbe69320bcd5c6d776e02880312cd36b1a94365e638c0d6ca2d8662ea56395a77b4b8740c6443455a5290c01d756de534d5ac0ac3d2bc910a641be95a9ff123281bede8a4926c4f52eaa92139c105431ff0bb7019b406f6a580d393501d90093ed76e00a4be1da0f39097ba0d0a1091644d7d7ea08bf4e2b0cb721fe28272e2d0b9435f88475075196cea528c36f67911d2dc1bda1df8009896403e894eb35277765e0d714aad33117f734aee9569eefbcc23fbae237023b95072bc41f5a74c81406b30685886909cf3b433022f2a79d08400ca455150746b7846a9efaacbef1d2eeee7c5afcc4eafee3927dcba6caa39ed034163c1a8c58c3413780842b844eab6aa004c24dc85d50acb5734d7a5c292e47b334caefc3bbfeb159dea1aac18f77ca46bb2c3fa62efe561f69d8909a3f4b31a382504f598d8ac0bbdcddcc0d0bbd047e7aa36f4b9a22df011a4199444e9633193538a9ab4d572dfaf6bdddb70482d74e6e63e6b7934227a0ba002bc48ba92691a5ab2d20223b2d012ce850884e92c640db836ad3cbf7ee5adc6ae6635e7dea00223c8c7d8fbd5f6699728b39d708fd50b9521fc0a8de931ea4350de3135f5364812966ede960d6c20ab356a3a87504cd398c5e192ef8b8fecaf6607557f6881c7ea16c0830e721115441039bf47450a398a60c7430b1bd332853d6e44520d4f1a28308340a3da1d2f1bfc2a8e35651288c1a3ed00232df6874fbdd067f2564196a403116f4d2f769fcc81d089a6eaece0a48b46802005606ed87ce9e17ab676edfedc3edb219d50b323837d7fd87677f3f437b1f22a560b8262fa56974eeae0c91dc9f9be847680b95600609b90d5941e3fe4d9ca0fbdddb46749b2d3b852b864418ff1b18ce977f30d972fc2fd9569a29e67d2df0a1d1e3b7a724667d48aa93686d0922271189a512f509fabdded2bbe5496cfa44193f3d0d98e731f3be0f3a5a70d97bcd7956cd3bc92a762add0d8491e2bb999a5b0427b1e8760b6d17d790773abf6d96f8fcb67479a24d41faa469ea2a12b1e33a41184aece7f6b3ef3320e185b9bb0187445184eea8b60c3b542e716413343e8d28354bb5ea39ef3b34817c40a3ed3942bd1305b2d46d008f12399aebc79deaece554fa381183f76f4a48d9ec281bc73154d0d5a03dbbaea147dc5ef766e4507d885aa325aab7b6cd9ea63acd564649b7ddbbeeca68e38f8e52aa3f98ff7ca53fbd254b5ca5315822ece2f1fad56b75db5b7ac9cc9a1cdcd638a0f044d6180b6b7588c6e804094595035e6a75f72ca8bfed4cea79b95e9a40e24a0ef07640a5d2766afbde88fe2ae8b489f1634b834940d239b49a3c03dcee2aab04896d5525d6469cf7ab3beeafab95ee2c25c90b8f2408205b8e287840a951d16a6229c344da2356432a3e5d9c95883c6a58e2eac6c6aa9b5a43a71a47f96c69306514e4357d725cbc32d1de9d7cf587ae91fc73daf23e59d45843081f36645cc945dca6a2c6de2faff1928a0040f735fea57c57955ecd5913bd4deaba7715143ed3151d74404d82194b23ce72bd9c193bd502cd03e2113a513970d5199591e704853b3d9598920e0adf6ac4b3ea1934b61018dac24e6b55dcdd5378653f754b94aa6613d5bfd796c1c67b13ccf13f92ce269b3fcca45d574ffd19bdfe6efbe79e2b6d17a2fec1499d074262241d109784280864a950b6b7a0fd90796dd40f1386a461c2a33497b5768105974947f1118ef42c3dbd3f49d71b57bd95ff66d5d977aa1632b55f7442ca6b95281792a4527cb74dc01449499d64bd9e7af7f707ec707600fe3da6e58e86609a5e043ac06caaa47dd0c06de9747eaf895650b2e9079232c646ed97e92c7b639d93a6b6fcb90d18855edb7c58b7faa7dfe87e49f4cb409a5ab4b93a4ff19a5e0e3c6568b85f7981ae5c897b5e07df332be5747e8b7d5fa81f8d55f34076e60f10b74e942596437d531061d33cd1d1a15fbc95b8040a740ad94f96547436e647384a8703d25016fc45adb67fd5c7dd13be3ea79101a3ca106dad995f18e436fe91fc78dd4ad638bc53d0d0c7fb09332a932801ded25a89db68d23b9748ad6e6c35fb5dff82df5adbdd6cd919f111b642f078448836fb4a63145c5f24224805800c392916a138e5386532c55e3cefb49fdbc77a8ed17e06be92a589cb5030d374a9b7c20e124b19fe8d97fa7660d3627172524897e98f480c1073ac1e288b2e414e9835d24563fd5fb7f7f71f01ffafb6fa9c294a65ec4164d8c2fe87e684ad81c73e9814083b6d6355317ab1d97bb3d6fd4cf7c9559da393639f4ddc694b94b132013b878243bf029ff99f48438a647104a425c8f9b02108fa082cbe832b9751ed5b46c900da87de880e3ccaebb87d2a16fa4fffab279e45b6a7aa484681ebc491e9e35dbdcca5961b22b3467bb1de7353b76ab9dd752a392dca39607338275c1b64af5c2923fd504be9349a50be98c3c4a7cfcd88ae3ffff43a9ff06a8e14d57f8bd19ad0000000049454e44ae426082";
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
                var rows = resultSet.getNextRow();;
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
        
        testSelectSQLVariantValue_datetime: function() {
            var exceptionOccur = false;
            var datetime = new Date("2004-08-05T00:00:00.000Z");
    
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
            if (dbconn) dbconn.close();
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.areSame(rows.value.getTime() , datetime.getTime() ,"base type datetime");
        },
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
        testSelectSQLVariantValue_smalldatetime: function() {
            var exceptionOccur = false;
           
            var smalldatetime = new Date("2004-08-05T00:00:00.000Z");

            var exceptionMsg = "";
            try {
                var dbconn = conn.connect(params);
                var q = "select  value FROM [test_variant] where id = 16";
                var resultSet = dbconn.execute(q);
                var rows = resultSet.getNextRow();
            }
            catch (err) {
                exceptionOccur = true;
                exceptionMsg = err.message;
            }
            if (dbconn) dbconn.close();
            Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
            Y.Assert.areSame(rows.value.getTime(), smalldatetime.getTime(), "base type smalldatetime");
        },
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
        var tmp_db = "testMSSQL_"+platform;
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
            var q1 = 'UPDATE test_execute_update_table SET number=0, string=\'a\' WHERE id=1';
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
        Y.Assert.areSame(n, 0, "incorrect number!");
        Y.Assert.areSame(s, "a", "incorrect string!");
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
            qq="DELETE FROM test_insert_table where id=1;";
            dbconn.execute(qq);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(n, 1001, "incorrect number!");
        Y.Assert.areSame(s, "b1002", "incorrect string!");
    },
    testExecuteWithDelete: function() {//////////dz
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
    testSelectAllFieldsWithCondition: function() {
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
    // testSelectAllFieldsWithoutCondition: function() {
    //     var exceptionOccur = false;
    //     var exceptionMsg = "";
        
    //     try {
    //         var dbconn = conn.connect(params);
    //         var rs = dbconn.select("*", "test_select_table");
    //         var rowsCount = rs.getRowsCount();
    //         var row = rs.getNextRow();
    //     }
    //     catch (err) {
    //         exceptionOccur = true;
    //         exceptionMsg = err.message
    //     }
    //     if (dbconn) dbconn.close();
        
    //     Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
    //     // Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #3, expected Object.");
    //     Y.Assert.areEqual(row.id, 1, "Incorrect id value");
    //     Y.Assert.areEqual(row.number, 2, "Incorrect number value");
    //     Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    // },
    testSelectFieldWithCondition: function() {
        var exceptionOccur = false;
        try {
            var dbconn = conn.connect(params);
            var rs = dbconn.select("number,string", "test_select_table", {
                id: 1
            });
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();

        Y.Assert.areEqual(row.number, 2, "Incorrect number value");
        Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    },
    // testSelectWithFieldsWithoutCondition: function() {
    //     var exceptionOccur = false;
    //     var exceptionMsg = "";
    //     try {
    //         var dbconn = conn.connect(params);
    //         var rs = dbconn.select("number,string", "test_select_table");
    //         var rowsCount = rs.getRowsCount();
    //         var row = rs.getNextRow();
    //     }
    //     catch (err) {
    //         exceptionMsg = err.message
    //         exceptionOccur = true;
    //     }
    //     if (dbconn) dbconn.close();
        
    //     Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
    //     // Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #3, expected Object.");

    //     Y.Assert.areEqual(row.number, 2, "Incorrect number value");
    //     Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    // },

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

    //test if select function exist
    testSelectExist: function() {
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

    //test if delete function exist
    testDeleteExist: function() {
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

    //test delete
    testDeleteLogic: function() {
        var exceptionOccur = false;
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
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areEqual(rows.length, 0, "the row with id = 1 must be deleted");
    },

    //test if insert function exist
    testInsertExist: function() {
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
 
    //test insert
    testInsertLogic: function() {
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
            dbconn.execute("DELETE FROM test_insert_table");
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

    //test if update function exist
    testUpdateExist: function() {
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

    //test update
    testUpdateLogic: function() {
        var exceptionOccur = false;
        try {
            var dbconn = conn.connect(params);
            dbconn.update("test_update_table", {
                number: 0,
                string: "test"
            }, {
                id: 1
            });
            var rs = dbconn.select("*", "test_update_table", {
                id: 1
            });
            var row = rs.getNextRow();
            
            dbconn.update("test_update_table", {
                number: 5,
                string: "test"
            }, {
                id: 1
            });
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areEqual(row.number, 0, "the number is different");
        Y.Assert.areEqual(row.string, "test", "the string is different");
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
    testGetColumnNameLogic: function() {//////////////////////
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = conn.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            var colnameid = result.getColumnName(0);
            var colnameNumber = result.getColumnName(1);
            var colnameErr = result.getColumnName(3);//undefined
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
            var isselect2 = result.isSelect();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(isselect, "expected value 'true'");
        Y.Assert.isFalse(isselect2, "expected value for update 'false'");
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
        Y.Assert.areSame(rows[0].datetime.getTime(), datetime.getTime(), "datetime min ");
        Y.Assert.areSame(rows[1].datetime.getTime(), ddatetime.getTime(), "datetime max");
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
    
    // testPreparedStatement_getColumnCount: function(){
    //     var exceptionOccur = false;
    //     var exceptionMsg = "";
    //     var pc;
    //     try {
    //         var dbconn = conn.connect(params);
    //         var prepStmt = dbconn.createPreparedStatement("SELECT * FROM test_nchar WHERE id = ? or id = ?");
    //         prepStmt.setParameters([1,2]);
    //         var rs = prepStmt.execute();
    //         pc = prepStmt.getColumnCount();
    //     }catch(err){
    //         exceptionOccur = true;
    //         exceptionMsg = err.message;
    //     }
    //     if(dbconn){
    //         dbconn.close();
    //     }
    //     if (platform == "linux") {
    //         return;
    //     };
    //     Y.Assert.isFalse(exceptionOccur, "No Exception shall occur here !");
    //     Y.Assert.areSame(pc, 2, "2 clumns");
    // },
    
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
    
    // testCreateDatabase: function(){
    //     var exceptionOccur = false;
    //     var exceptionMsg = "";
    //     try {
    //         var dbconn = conn.connect(params);
    //         var resSet = dbconn.execute("CREATE DATABASE testMSSQL_"+platform+"_copy_o");
    //         var rows = dbconn.execute("SELECT * FROM sys.master_files WHERE name = N'testMSSQL_"+platform+"_copy_o'").getAllRows();
    //     }catch(err){
    //         exceptionOccur = true;
    //         exceptionMsg = err.message;
    //     }
    //     if(dbconn){
    //         dbconn.close();
    //     }
    //     Y.Assert.isFalse(exceptionOccur, "No Exception shall occur here !\n error message : " + exceptionMsg);
    //     Y.Assert.areSame(rows[0].name, "testMSSQL_"+platform+"_copy_o", "database not created !")

    // },
    testCopyTableFromDBtoDB: function(){
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            
            var dbconn = conn.connect(params);
            var resSet = dbconn.execute("  select * into testMSSQL_"+platform+"_copy_o.dbo.texto from testMSSQL_"+platform+".dbo.test_text");
            dbconn.useDatabase("testMSSQL_"+platform+"_copy_o");
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
            var resSet = dbconn.execute("ALTER DATABASE testMSSQL_"+platform+"_copy_o SET SINGLE_USER WITH ROLLBACK IMMEDIATE;");
            var resSet = dbconn.execute("DROP DATABASE testMSSQL_"+platform+"_copy_o");
            var rows = dbconn.execute("SELECT * FROM sys.master_files WHERE name = N'testMSSQL_"+platform+"_copy_o'").getAllRows();
        }catch(err){
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if(dbconn){
            dbconn.close();
        }
        Y.Assert.isFalse(exceptionOccur, "No Exception shall occur here !\n error message : " + exceptionMsg);
        Y.Assert.areSame(rows.length, 0, "database slill exist !");
    }
};


require("unitTest").run(testCase).getReport();

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