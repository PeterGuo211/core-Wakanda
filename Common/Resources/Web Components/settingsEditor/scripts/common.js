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
function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = new obj.constructor();
    for(var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
}

function numericField(value) {
    // var field = $(this);
    // var valNum = field.val();
    var boo_ok = true;

    if (value)
        if (!new RegExp("^[0-9]+$").test(value)) {
            alert('This field only accepts numbers !');
            // field.val(valNum.substring(0,valNum.length -1));
            boo_ok = false;
        }
    return boo_ok;
}

function revert(me, value) {
    me.value = value;
    me.focus();
}

function mandatory(value) {
    var boo_ok = (value != '');

    if (!boo_ok)
        alert('This field is mandatory !');

    return boo_ok;
}

function IsNumber(value) {
    boo_ok = (value);

    if (boo_ok) {
        var boo_ok = (new RegExp("^[-+]?[0-9]+$").test(value));

        if (!boo_ok)
            alert('This field only accepts numbers !');
    }

    return boo_ok;
}

function numberConstraints(value, min, max) {
    var boo_ok = true;

    if (value < min) {
        alert('The value can\'t be less than ' + min);
        boo_ok = false;
    } else {
        if (max) {
            if (value > max) {
                alert('The value can\'t exceed ' + max);
                boo_ok = false;
            }
        }
    }
    return boo_ok;
}

function setConstraints(value, min, max) {
    var boo_ok = true;

    if (value < min) {
        value = min;
    } else {
        if (max) {
            if (value > max) {
                value = max;
            }
        }
    }
    return value;
}

function stringToBoolean(string) {
    return (string == 'true') || (string == '1');
}

function concat() {
    var result = '';
    for ( var i = 0; i < arguments.length; i++) {
        result += arguments[i];
    }
    return result;
}

function getSelectedValue(id) {
    var x = document.getElementById(id).selectedIndex;
    var y = document.getElementById(id).options;
    return y[x].value;
}

function setSelectedValue(id, value) {
    var x = document.getElementById(id);
    for ( var i = 0; i < x.options.length; i++) {
        if (x.options[i].value == value) {
            x.options[i].selected = true;
            break;
        }
    }
}

function isInArray(array, val) {
    var isInArray = false;

    $.each(array, function(index, value) {
        if (value == val) {
            isInArray = true;
            return false;
        }
    });
    return isInArray;
}

function isMac() {
    return (/Macintosh/i).test(navigator.userAgent);
}

function fileName(path) {
    var dirPath, pathSplited;
    dirPath = path.replace(/\\/g, '/');

    if (isMac()) {
        dirPath = dirPath.replace(/:/g, '/');
    }
    pathSplited = dirPath.split("/");

    return pathSplited[pathSplited.length - 1];
}

function IsNumeric(sText) {
    var ValidChars = "0123456789.";
    var IsNumber = true;
    var Char;

    for (i = 0; i < sText.length && IsNumber == true; i++) {
        Char = sText.charAt(i);
        if (ValidChars.indexOf(Char) == -1) {
            IsNumber = false;
        }
    }

    return IsNumber;
}

function format(valeur, decimal, separateur) {
    // formate un chiffre avec 'decimal' chiffres après la virgule et un
    // separateur
    var deci = Math.round(Math.pow(10, decimal)
        * (Math.abs(valeur) - Math.floor(Math.abs(valeur))));
    var val = Math.floor(Math.abs(valeur));
    if ((decimal == 0) || (deci == Math.pow(10, decimal))) {
        val = Math.floor(Math.abs(valeur));
        deci = 0;
    }
    var val_format = val + "";
    var nb = val_format.length;
    for ( var i = 1; i < 4; i++) {
        if (val >= Math.pow(10, (3 * i))) {
            val_format = val_format.substring(0, nb - (3 * i)) + separateur
            + val_format.substring(nb - (3 * i));
        }
    }
    if (decimal > 0) {
        var decim = "";
        for ( var j = 0; j < (decimal - deci.toString().length); j++) {
            decim += "0";
        }
        deci = decim + deci.toString();
        val_format = val_format + "." + deci;
    }
    if (parseFloat(valeur) < 0) {
        val_format = "-" + val_format;
    }
    return val_format;
}

function stepper() {
    var me = $(this);

    // Look if the input is enabled
    var disabled = me.parent().find("input").prop("disabled");
    if (!disabled) {
        // Get min, max & step if any
        var min = me.parent().find("input").prop("min");
        min = (!min) ? -Math.pow(2, 32) : parseFloat(min);

        var max = me.parent().find("input").prop("max");
        max = (!max) ? Math.pow(2, 32) - 1 : parseFloat(max);

        var step = me.parent().find("input").prop("step");
        step = (!step) ? 1 : parseFloat(step);

        var curValue = me.parent().find("input").val();
        curValue = parseFloat(isNaN(curValue) ? -1 : curValue);

        var newVal;
        if (me.hasClass("plus"))
            if ((!curValue) & (curValue != min) & curValue != 0)
                newVal = min;
            else
                newVal = ((curValue + step) <= max) ? (curValue + step)
                : curValue;
        else if ((!curValue) & (curValue != min)){
            newVal = max;
        }
        else{
            if(me.parent().find("input").hasClass('uilt0') && curValue - step < 0){  // Unlimited if less than 0
                newVal = 'unlimited';
            }
            else{
                newVal = ((curValue - step) >= min) ? (curValue - step)
                    : curValue;
            }
        }
        
        
        me.parent().find("input").val(newVal);
        
        if(me.parent().find("input").hasClass('service')){
            me.parent().find("input").change();
        }
    }
}

function array_search(what,array){
    var index=-1;

    for(elt in array){

        index++;

        if (array[elt] == what)
            return index;
    }

    index=-1;
    return index;
}