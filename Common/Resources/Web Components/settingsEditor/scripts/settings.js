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
var inStudio, jsonData, inMac;

$(document).ready(onLoad());

function onLoad() {
    // **********************************************
    // loading management
    // **********************************************

    // load according to the mode (ask the studio or load fake data if running
    // in a browser)
    inStudio = (typeof (studio) != "undefined");
    inMac = isMac();

    /* ==================== */
    console.info("inStudio:" + inStudio);
    console.info("inMac:" + inMac);
    /* ==================== */

    if (inStudio)
        // notify the web area that it's ready to run everything is loaded)
        studio.editor.loaded();
    else {
    	
		try {
			studio = parent.studio;
			inStudio = true;
	    	studio.editor.settingsLoadCaalback = editorLoad;
	    	studio.editor.settingsSaveCaalback = editorSave;
	    	studio.editor.loaded();
	    	
		} catch(e) {
	        $.getJSON("dev/test.json", function(data) {
	            jsonData = data;
	        }); // fake data for tests here
	        console.log(e);
		}
    }
}

function editorLoad(data) {

    // **********************************************
    // Called, after loading, by C code
    // **********************************************

    if (data) {

        // clear the contener
        $('[item="settings"]').empty();

        // convert JSON text into an object
        jsonData = JSON.parse(data);
        jsonParse();
        return true;

    } else
        return false;
}

function editorSave() {
    if (inStudio) {
        $(":focus").blur();
        return JSON.stringify(jsonData);
    }
    else
        return true;
}

function jsonParse() {

    var item;
    var items = new Array();

    for (item in jsonData) {
        switch (item) {
            case 'solution':
                items.push(solutionDisplay());
                break;

            case 'project':
                items.push(projectDisplay());
                break;

            default:
        }
    }

    $('#settings').html(items.join(''));

    if (jsonData.solution)
        solutionActivate();

    if (jsonData.project)
        projectActivate();

    $("[type='number']").keyup(numericField);
}

function spacer() {
    return '<div class="spacer"/>';
}

function setDirty() {
    if (inStudio)
        studio.editor.setDirty();
}

function validate (element){
	if (!jsonData[element]) {
        jsonData[element] = new Array();
        jsonData[element][0] = new Object();
    }
}