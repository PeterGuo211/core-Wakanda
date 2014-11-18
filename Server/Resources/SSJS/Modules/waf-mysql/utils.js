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
/*
    The addSlashes() function returns a string with backslashes in front of predefined characters.

    The predefined characters  are:

    - single quote (')
    - double quote (")
    - backslash (\)
    - NULL

    This method shall be transfered to MySQLBuffer C++ class
*/
//retreive the constants of the module
var constants = require('waf-mysql/constants');

function addSlashes(query) {
    query = query.replace(/\\/g, "\\\\");
    query = query.replace(/\'/g, "\\'");
    query = query.replace(/\"/g, "\\\"");
    return query;
}

/*
    The replacePlaceHolders() function returns a string formed with
    a place holder based string and the next parameters
    ex:
    replacePlaceHolders("SELECT * FROM ATABLE WHERE id=:1", 256) = "SELECT * FROM ATABLE WHERE id=256"

*/
function replacePlaceHolders(params) {
    var query, argcount, reg, rReg, regLen, i;
    query = params[0];
    argcount = params.length;

    for (i = 1; i < argcount; i++) {
        reg = new RegExp(':' + i, "g");
        rReg = query.match(reg, "g");
        regLen = rReg ? rReg.length : 0;
        if (regLen == 1) {
            query = query.replace(reg, params[i]);
        } else if (regLen > 1) {
            var holdersPos, quotesPos, hldpos, k, qtepos;
            holdersPos = [];
            quotesPos = [];

            function indexsOff(strs) {
                var pos, poss, num, z;
                pos = 0;
                num = -1;
                z = -1;
                poss = [];
                while (pos != -1) {
                    pos = query.indexOf(strs, z + 1);
                    if (pos != -1) poss.push(pos);
                    num += 1;
                    z = pos;
                }
                return poss;
            }
            holdersPos = indexsOff(":" + i);
            quotesPos = indexsOff("'");
            qtepos = 0;
            for (hldpos = 0; hldpos < holdersPos.length; hldpos++) {
                for (qtepos; qtepos < quotesPos.length; qtepos++) {
                    if (qtepos == quotesPos.length - 1 && quotesPos[qtepos] < holdersPos[hldpos]) {
                        if ((qtepos + 1) % 2 == 0) {
                            query = query.slice(0, holdersPos[hldpos]) + params[i] + query.slice(holdersPos[hldpos] + 2, query.length);
                            if (hldpos != holdersPos.length - 1) {
                                for (k = hldpos + 1; k < holdersPos.length; k++) {
                                    holdersPos[k] += (params[i] + "").length - 2;
                                }
                            }
                            for (k = 0; k < quotesPos.length; k++) {
                                if (quotesPos[k] > holdersPos[hldpos]) quotesPos[k] += (params[i] + "").length - 2;
                            }
                            qtepos--;
                            break;
                        }
                    } else {
                        if (quotesPos[qtepos] < holdersPos[hldpos]) {
                            continue;
                        } else {
                            if ((qtepos) % 2 == 0) {
                                query = query.slice(0, holdersPos[hldpos]) + params[i] + query.slice(holdersPos[hldpos] + 2, query.length);
                                if (hldpos != holdersPos.length - 1) {
                                    for (k = hldpos + 1; k < holdersPos.length; k++) {
                                        holdersPos[k] += (params[i] + "").length - 2;
                                    }
                                }
                                for (k = 0; k < quotesPos.length; k++) {
                                    if (quotesPos[k] > holdersPos[hldpos]) quotesPos[k] += (params[i] + "").length - 2;
                                }
                            }
                            qtepos--;
                            break;
                        }
                    }
                }
            }
        }
    }

    return query;
}

/*
    this function for formatting MySQL results because the results are
    a raw strings results
*/
function formatResults(rawResult, fieldCount, fields, types) {
    var res = [];
    var len = rawResult.length;
    for (var i = 0; i < len; ++i) {
        var r = {};
        for (var j = 0; j < fieldCount; ++j) {
            var t = types[j];
            var field = fields[j];
            var value = rawResult[i][field];
            switch (t) {
            case constants.fieldType.FIELD_TYPE_TINY:
            case constants.fieldType.FIELD_TYPE_SHORT:
            case constants.fieldType.FIELD_TYPE_LONG:
            case constants.fieldType.FIELD_TYPE_LONGLONG:
            case constants.fieldType.FIELD_TYPE_INT24:
            case constants.fieldType.FIELD_TYPE_YEAR:
            case constants.fieldType.FIELD_TYPE_BIT:
                r[field] = parseInt(value);
                break;

            case constants.fieldType.FIELD_TYPE_FLOAT:
            case constants.fieldType.FIELD_TYPE_DOUBLE:
                r[field] = parseFloat(value);
                break;

            case constants.fieldType.FIELD_TYPE_NULL:
                r[field] = null;
                break;

            case constants.fieldType.FIELD_TYPE_DATE:
            case constants.fieldType.FIELD_TYPE_NEWDATE:
                var parts = value.split(/[- :]/);
                var date = new Date(parts[0], parts[1] - 1, parts[2]);
                r[field] = date;
                break;

            case constants.fieldType.FIELD_TYPE_TIMESTAMP:
                //convert to unix timestamp
                var uts = parseInt(value);
                //multiply by 1000 because this is in seconds and we want that in milliseconds
                var date = new Date(uts * 1000);
                r[field] = date;
                break;

            case constants.fieldType.FIELD_TYPE_TIME:
                var parts = value.split(/[- :]/);
                var date = new Date();
                date.setHours(parts[0]);
                date.setMinutes(parts[1]);
                date.setSeconds(parts[2]);
                date.setMilliseconds(0);
                r[field] = date;
                break;

            case constants.fieldType.FIELD_TYPE_DATETIME:
                var parts = value.split(/[- :]/);
                var date = new Date();
                date.setFullYear(parts[0]);
                date.setMonth(parts[1] - 1);
                date.setDate(parts[2]);
                date.setHours(parts[3]);
                date.setMinutes(parts[4]);
                date.setSeconds(parts[5]);
                date.setMilliseconds(0);
                r[field] = date;
                break;

            case constants.fieldType.FIELD_TYPE_TINY_BLOB:
            case constants.fieldType.FIELD_TYPE_MEDIUM_BLOB:
            case constants.fieldType.FIELD_TYPE_LONG_BLOB:
            case constants.fieldType.FIELD_TYPE_BLOB:
                var buffer = new Buffer(value, 'binary');
                r[field] = buffer.toBlob();
                break;

            case constants.fieldType.FIELD_TYPE_SET:
                r[field] = value.split(',');
                break;

            case constants.fieldType.FIELD_TYPE_VARCHAR:
            case constants.fieldType.FIELD_TYPE_ENUM:
            case constants.fieldType.FIELD_TYPE_VAR_STRING:
            case constants.fieldType.FIELD_TYPE_STRING:
            case constants.fieldType.FIELD_TYPE_GEOMETRY:
            case constants.fieldType.FIELD_TYPE_DECIMAL:
            case constants.fieldType.FIELD_TYPE_NEWDECIMAL:
                r[field] = value;
                break;

            default:
                r[field] = value;
                break;
            }
        }
        res.push(r);
    }

    return res;
}

exports.addSlashes = addSlashes;
exports.replacePlaceHolders = replacePlaceHolders;
exports.formatResults = formatResults;