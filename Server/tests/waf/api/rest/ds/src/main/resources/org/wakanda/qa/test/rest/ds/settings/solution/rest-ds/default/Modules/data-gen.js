exports.getRandomString = function(length, chars, diffFrom) {
    if (!chars) chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];

    if (diffFrom && (typeof diffFrom == "string")) {
        if (result == diffFrom) return exports.getRandomString(length, chars, diffFrom);
    }
    return result;
};

exports.getRandomInt = function(min, max, diffFrom) {
    if (!min) min = 0;
    if (!max) max = 100;
    var result = Math.floor(Math.random() * (max - min + 1)) + min;
    if (diffFrom && (typeof diffFrom == "number")) {
        if (result == diffFrom) return exports.getRandomInt(min, max, diffFrom);
    }
    return result;
};

exports.getRandomNumber = function(min, max, diffFrom) {
    if (!min) min = 0;
    if (!max) max = 100;
    var result = Math.random() * (max - min) + min;
    if (diffFrom && (typeof diffFrom == "number")) {
        if (result == diffFrom) return exports.getRandomArbitary(min, max, diffFrom);
    }
    return result;
};

exports.getRandomDate = function(diffFrom) {
    var result = new Date(2013, exports.getRandomInt(0, 11), exports.getRandomInt(1, 28));
    if (diffFrom && (typeof diffFrom == "object")) {
        if (result.getTime() == diffFrom.getTime()) return exports.getRandomDate(diffFrom);
    }
    return result;
};

exports.getRandomUuid = function(diffFrom) {
    var result = generateUUID();
    if (diffFrom && (typeof diffFrom == "string")) {
        if (result == diffFrom) return exports.getRandomUuid(min, max, diffFrom);
    }
    return result;
};

exports.contains = function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

exports.generateData = function(dataclass, total, raz, atrToSkip) {
    var dc;
    var dcType = typeof dataclass;

    if (dcType == "string") dc = ds.dataClasses[dataclass];
    else if (dcType == "function") dc = dataclass
    else throw Error("Wrong DataClass parameter type");

    if (raz) {
        // clear the dataclass
        dc.remove();
        // init the auto sequence number
        dc.setAutoSequenceNumber(1);
        // wait a bit in order to sync with the next step
        wait(1000);
    }


    if (!atrToSkip) {
        atrToSkip = ["ID"];
    }

    // calculate to number of entities to add
    var nToAdd = total;
    if (!raz) nToAdd = total - dc.length;
    // get util functions
    var getRandomString = exports.getRandomString;
    var getRandomInt = exports.getRandomInt;
    var getRandomNumber = exports.getRandomNumber;
    var getRandomDate = exports.getRandomDate;
    var getRandomUuid = exports.getRandomUuid;

    // populate the dataclass
    for (i = 0; i < nToAdd; i++) {
        var entity = dc.createEntity();
        for (x in dc.attributes) {
            var kind = dc[x].kind;
            if (!exports.contains(atrToSkip, x)) {
                if (kind == "storage") {
                    if (dc[x].type == "string") entity[x] = getRandomString(10);
                    if (dc[x].type == "number") { 
                   	 	var gNumber = getRandomNumber(Number.MIN_VALUE, Number.MAX_VALUE);
                   	 	console.log(gNumber);
                    	entity[x] = gNumber;
                    	}
                    if (dc[x].type == "bool") entity[x] = (i % 2) == 0;
                    if (dc[x].type == "date") entity[x] = getRandomDate();
                    if (dc[x].type == "byte") entity[x] = getRandomInt(-127, 128);
                    if (dc[x].type == "duration") entity[x] = getRandomInt(0, 1000);
                    if (dc[x].type == "long") entity[x] = getRandomInt(-2147483648, 2147483647);
                    if (dc[x].type == "long64") entity[x] = getRandomInt(-9223372036854775808, 9223372036854775807);
                    if (dc[x].type == "word") entity[x] = getRandomInt(-32767, 32768);
                    if (dc[x].type == "uuid") entity[x] = application.generateUUID();
                    if (dc[x].type == "image") entity[x] = application.loadImage(application.getFolder("path") + "Images/img" + getRandomInt(1, 12) + ".jpg");
                    if (dc[x].type == "blob") entity[x] = new Blob(256, 88, "application/octet-stream");
                }
                if (kind == "relatedEntity") {
                    var rdc = ds.dataClasses[dc[x].relatedDataClass];
                    var idarray = rdc.toArray("ID");
                    var randomId = idarray[Math.floor(Math.random() * idarray.length)].ID;
                    entity[x] = rdc.find("ID=" + randomId);
                }
                if (kind == "alias") {}
                if (kind == "calculated") {}
                if (kind == "relatedEntities") {}
            }
        }
        entity.save();
    }
};

exports.generateFilterAndOrderByData = function(dataclass, total, raz, filterParams, atrToSkip) {
    var dc = ds.dataClasses[dataclass];
    if (raz) {
        // clear the dataclass
        dc.remove();
        // init the auto sequence number
        dc.setAutoSequenceNumber(1);
        // wait a bit in order to sync with the next step
        wait(5000);
    }

    // calculate to number of entities to add depending on the raz parameter.
    var nToAdd = total;
    if (!raz) nToAdd = total - dc.length;

    if (!filterParams) filterParams = exports.getDefaultFilterParams();

    if (!atrToSkip) {
        atrToSkip = ["ID"];
    }

    // get util functions
    var getRandomString = exports.getRandomString;
    var getRandomInt = exports.getRandomInt;
    var getRandomNumber = exports.getRandomNumber;
    var getRandomDate = exports.getRandomDate;
    var getRandomUuid = exports.getRandomUuid;

    // number of filtred rows to add
    var nFiltred = filterParams.total;
    var nSkipBeforeAddFiltred = Math.floor(nToAdd / nFiltred);

    // filtred row values per type
    var typeValue = filterParams.typeValue;

    // counters
    var cGlobal = 0;
    var cFiltred = 0;

    var vstring, vnumber, vbool, vdate, vbyte, vduration, vlong, vlong64, vword, vuuid;
    var fstring, fnumber, fbool, fdate, fbyte, fduration, flong, flong64, fword, fuuid;

    // get values per type of filtred rows
    fstring = typeValue["string"];
    fnumber = typeValue["number"];
    fbool = typeValue["bool"];
    fdate = typeValue["date"];
    fbyte = typeValue["byte"];
    fduration = typeValue["duration"];
    flong = typeValue["long"];
    flong64 = typeValue["long64"];
    fword = typeValue["word"];
    fuuid = typeValue["uuid"];

    // populate the dataclass
    for (cGlobal = 0; cGlobal < nToAdd; cGlobal++) {
        // in order to compare indexes performance, one entity should have the same values in attributes of the same type.
        if ((cGlobal % nSkipBeforeAddFiltred == 0) && cFiltred < nFiltred) {
            // use static values of filtred rows
            vstring = fstring;
            vnumber = fnumber;
            vbool = fbool;
            vdate = fdate;
            vbyte = fbyte;
            vduration = fduration;
            vlong = flong;
            vlong64 = flong64;
            vword = fword;
            vuuid = fuuid;

            cFiltred++;
        }
        else {
            // use random values different from those of filtred rows
            vstring = getRandomString(10, fstring);
            vnumber = getRandomNumber(0, 100, fnumber);
            vbool = !fbool;
            vdate = getRandomDate(fdate);
            vbyte = getRandomInt(-127, 128, fbyte);
            vduration = getRandomInt(0, 1000, fduration);
            vlong = getRandomInt(-2147483648, 2147483647, flong);
            vlong64 = getRandomInt(-9223372036854775808, 9223372036854775807);
            vword = getRandomInt(-32767, 32768, fword);
            vuuid = getRandomUuid(fuuid);
        }
        // create the entity
        var entity = dc.createEntity();
        for (x in dc.attributes) {
            var kind = dc[x].kind;
            if (!exports.contains(atrToSkip, x)) {
                if (kind == "storage") {
                    if (dc[x].type == "string") entity[x] = vstring;
                    if (dc[x].type == "number") entity[x] = vnumber;
                    if (dc[x].type == "bool") entity[x] = vbool;
                    if (dc[x].type == "date") entity[x] = vdate;
                    if (dc[x].type == "byte") entity[x] = vbyte;
                    if (dc[x].type == "duration") entity[x] = vduration;
                    if (dc[x].type == "long") entity[x] = vlong;
                    if (dc[x].type == "long64") entity[x] = vlong64;
                    if (dc[x].type == "word") entity[x] = vword;
                    if (dc[x].type == "uuid") entity[x] = vuuid;
                }
            }
            if (kind == "relatedEntity") {
                var rdc = ds.dataClasses[dc[x].relatedDataClass];
                var idarray = rdc.toArray("ID");
                var randomId = idarray[Math.floor(Math.random() * idarray.length)].ID;
                entity[x] = rdc.find("ID=" + randomId);
            }
            if (kind == "alias") {}
            if (kind == "calculated") {}
            if (kind == "relatedEntities") {}
        }
        entity.save();
    }
};

exports.getDefaultFilterParams = function() {
    var typeValue = [];
    typeValue["string"] = "filter";
    typeValue["number"] = 0.0;
    typeValue["bool"] = true;
    typeValue["date"] = new Date("01/01/2013");
    typeValue["byte"] = 0;
    typeValue["duration"] = 0;
    typeValue["long"] = 0;
    typeValue["long64"] = 0;
    typeValue["word"] = 0;
    typeValue["uuid"] = "00000000000000000000000000000000";

    var total = 5;
    var operator = "=";
    return {
        "total": total,
        "typeValue": typeValue,
        "operator": operator
    };
};