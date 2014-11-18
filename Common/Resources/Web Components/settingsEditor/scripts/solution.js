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

function solutionDisplay() {

    var txt_html = '';
    
    txt_html += displaySolution();
    txt_html += displayDatastore();    
 	
    return txt_html;
}

function solutionActivate() {

	var value;
    var default_; 
    var datastore_; 
    var solution_; 
    var booChecked;
    
    var defaultValues = solutionDefault();	 
   

    	/* SOLUTION */       
	 if (jsonData.solution) {     	
		solution_ = jsonData.solution[0];     
	 }	    	
	 
    default_ = defaultValues.solution; 
    
    if(solution_) {
    
    	document.getElementById('stopIfProjectFails').checked = eval((solution_.serverStartup) ? solution_.serverStartup[0].stopIfProjectFails
            : default_.serverStartup.stopIfProjectFails);

        if (solution_.directory) {
            value = (solution_.directory[0].authenticationType) ? solution_.directory[0].authenticationType
            : default_.directory.authenticationType;
        } else {
            value = default_.directory.authenticationType;
        }
        setSelectedValue("authenticationType", value);
        
    } else {
    	
    	document.getElementById('stopIfProjectFails').checked = eval(default_.serverStartup.stopIfProjectFails);
        value = default_.directory.authenticationType;
        setSelectedValue("authenticationType", value);
        
    }
    
    	/* DATASTORE CACHE */       
	 if (jsonData.database) {     	
		datastore_ = jsonData.database[0];     	
	 } else {     
	 	/* COMPATIBILITY */	
		 if (jsonData.datastore) {	 
			datastore_ = jsonData.datastore[0];	 	 
		 }	     
	 }	
	 
    default_ = defaultValues.database; 
     
	if (datastore_) {

		booChecked = eval((datastore_.adaptiveCache) ? datastore_.adaptiveCache
			: default_.adaptiveCache);		        
		document.getElementById('memoryForOtherApplications').value = (datastore_.memoryForOtherApplications) ? datastore_.memoryForOtherApplications
			: default_.memoryForOtherApplications;            
		document.getElementById('memoryForCache').value = (datastore_.memoryForCache) ? datastore_.memoryForCache
			: default_.memoryForCache;            
		document.getElementById('minimumSize').value = (datastore_.minimumSize) ? datastore_.minimumSize
			: default_.minimumSize;            
		document.getElementById('maximumSize').value = (datastore_.maximumSize) ? datastore_.maximumSize
			: default_.maximumSize;                        
		document.getElementById('fixedSize').value = (datastore_.fixedSize) ? datastore_.fixedSize
			: default_.fixedSize;
		document.getElementById('flushDataCacheInterval').value = (datastore_.flushDataCacheInterval) ? datastore_.flushDataCacheInterval
			: default_.flushDataCacheInterval;
	
	} else {
	
		booChecked = eval(default_.adaptiveCache);
		document.getElementById('memoryForOtherApplications').value = default_.memoryForOtherApplications;
		document.getElementById('memoryForCache').value = default_.memoryForCache;
		document.getElementById('minimumSize').value = default_.minimumSize;
		document.getElementById('maximumSize').value = default_.maximumSize;
		document.getElementById('fixedSize').value = default_.fixedSize;
		document.getElementById('flushDataCacheInterval').value = default_.flushDataCacheInterval;

	}            
		document.getElementById('adaptiveCache').checked = booChecked;     
		document.getElementById('fixedCache').checked = !booChecked;  
     
	// **** UPDATE SCREEN ****	
	solutionUpdate();
	
	
    // **** INSTALL EVENTS ****

	/* COMMON */
	$('[name="buttonBrowse"]').click(browse);
	$('.stepper').click(stepper);
	$('.stepper').click(solutionOnChange);
	$('.stepper').click(setDirty);
    
		/* SOLUTION */
    $("#stopIfProjectFails").click(solutionOnClick);
    $("#authenticationType").change(solutionOnSelect);
    
   	 /* DATASTORE CACHE */
    $("#adaptiveCache").click(solutionOnClick);
    $("#fixedCache").click(solutionOnClick);
    $("#memoryForOtherApplications").change(solutionOnChange);
    $("#memoryForCache").change(solutionOnChange);
    $("#minimumSize").change(solutionOnChange);
    $("#maximumSize").change(solutionOnChange);
    $("#fixedSize").change(solutionOnChange);
    $("#flushDataCacheInterval").change(solutionOnChange);
    
    $(":text").keydown(function(){setDirty();});
       
}

function solutionUpdate(what) {

	var booChecked;

	if (!what || (what == 'adaptiveCache') || (what == 'fixedCache')) {

		if(!what) {		
			booChecked = document.getElementById('adaptiveCache').checked;			
		} else {		
			booChecked = (what == 'adaptiveCache');		}
		
		if (booChecked) {		
			$("#fixed").addClass("cached");
			$("#adaptive").removeClass("cached");			
		} else {				
			$("#adaptive").addClass("cached");
			$("#fixed").removeClass("cached");			
		}

		if (what) {
			if (booChecked) {
				document.getElementById('memoryForOtherApplications').focus();
			} else {
				document.getElementById('fixedSize').focus();
			}
		}
	}
}

function solutionOnClick() {

	var boo_checked = this.checked;
	var id = this.id;

    switch (id) {

        case 'stopIfProjectFails':
            if (!jsonData.solution[0].serverStartup)
                jsonData.solution[0].serverStartup = new Array({});
            jsonData.solution[0].serverStartup[0][this.id] = boo_checked;
            break;

        case 'adaptiveCache':
            if (!jsonData.database)
                jsonData.database = new Array({});
            jsonData.database[0][this.id] = boo_checked;
            break;

        case 'fixedCache':
            if (!jsonData.database)
                jsonData.database = new Array({});
            jsonData.database[0]['adaptiveCache'] = !boo_checked;
            break;
    }

    setDirty();

	// **** UPDATE SCREEN ****
	switch (id) {
		case 'adaptiveCache':
        case 'fixedCache':
			solutionUpdate(id);
	}
}

function solutionOnChange() {

	var me = $(this).parent().find("input")
	var id = $(me).prop("id");
	if (id == "") {
		me = me[1];
		id = $(me).prop("id");
	}
	var value = $(me).val();
	var min = $(me).prop("min");
	var max = $(me).prop("max");
	var isMandatory = $(me).prop("mandatory");
	var boo_OK = true;
	var index= -1;

	if (isMandatory)
		boo_OK = (mandatory(value));

	if (boo_OK && (min | max))
		boo_OK = numberConstraints(eval(value), eval(min), eval(max));

	if(boo_OK) {
	
		switch (this.id) {
			case 'memoryForOtherApplications':
			case 'memoryForCache':
			case 'minimumSize':
			case 'maximumSize':
			case 'fixedSize':
			case 'flushDataCacheInterval':
				validate('database');
				jsonData.database[0][this.id] = this.value;
				break;        
		}
    }

    setDirty();
}

function solutionOnSelect () {

    var id = this.id;

    switch (id) {

        case 'authenticationType':
            if (!jsonData.solution[0].directory)
                jsonData.solution[0].directory = new Array({});
            jsonData.solution[0].directory[0][this.id] = getSelectedValue(id);
            break;
    }
    setDirty();  
}

function solutionDefault() {

    var defaultSettings = new Object({
    
        solution : {
            serverStartup : {
                stopIfProjectFails : 'true'
            },
            directory : {
                authenticationType : 'basic'
            }
        },
        
        database : {
            fixedSize : '200',
            flushDataCacheInterval : '15',
        	adaptiveCache :'false',
        	memoryForOtherApplications :'512',
        	memoryForCache :'50',        	
			minimumSize :'100',
		 	maximumSize :'400',
		 	keepCacheInMemory :'true'		
        }
    });

    return defaultSettings;
}

function displaySolution() {

	var txt_html = '';
	
	txt_html += '<section id="solution">';
    txt_html +=     '<h3>Solution</h3>';
    txt_html +=     '<div class="group">';
	
	/* Stop loading solution if a project fails */
    txt_html +=         '<div title="Defines if server should be stopped when Wakanda fails to open one of the projects in the solution.">';
    txt_html +=             '<label for="stopIfProjectFails">Stop loading solution if a project fails</label>';
    txt_html +=             '<input id="stopIfProjectFails" type="checkbox" />';
    txt_html +=         '</div>';

	/* Authentication type */
    txt_html +=         '<div title="Defines the authentication mode for the solution">';
    txt_html +=             '<label class="item" for="authenticationType">Authentication type:</label>';
    txt_html +=             '<select id="authenticationType" class="inline" name="authentication">';
    txt_html +=                 '<option value="basic">Basic</option>';
    txt_html +=                 '<option value="digest">Digest</option>';
    txt_html +=                 '<option value="custom">Custom</option>';
    txt_html +=             '</select>';
    txt_html +=         '</div>';

    txt_html +=     '</div>';
    txt_html += '</section>';   

    return txt_html;	
}

function displayDatastore() {

	 var txt_html = '';
	
	txt_html += '<section id="datastoreCache">';
    txt_html +=     '<h3>Datastore Cache</h3>';
    txt_html +=     '<div class="group">';
	
	/* Flush data buffers every */
    txt_html +=         '<div title="Specifies the time period between each automatic saving of the data cache (in seconds)">';
    txt_html +=             '<label class="item" for="flushDataCacheInterval">Flush data buffers every:</label>';
    txt_html +=             '<input id="flushDataCacheInterval" type="text" class="numeric service" size="10" min="1"/> seconds';
	txt_html +=             '<div class="plus stepper inline"/><div class="min stepper inline"/>';
    txt_html +=         '</div>';
    
	txt_html +=         '<div title="">';
	txt_html +=             '<input id="fixedCache" type="radio" name="cache"/>';
	txt_html +=             '<label for="fixedCache">Fixed</label>';
	txt_html +=             '<input id="adaptiveCache" type="radio" name="cache"/>';
	txt_html +=             '<label for="adaptiveCache">Adaptive</label>';
	txt_html +=         '</div>';
    

	/* [] FIXED */
	txt_html +=         '<div id="fixed" class="level2">';	
	
	/* Fixed size of memory to be used by the cache */
    txt_html +=         '<div title="Fixed size of memory to be used by the cache">';
    txt_html +=             '<label for="fixedSize">Size:</label>';
    txt_html +=             '<input id="fixedSize" type="text" class="number service" min="0" step="100"/> MB';   
	txt_html +=             '<div class="plus stepper inline"/><div class="min stepper inline"/>';
    txt_html +=         '</div>';
    
	txt_html +=         '</div>';
    
	/* [] ADAPTIVE */
	txt_html +=         '<div id="adaptive" class="level2">';
	
	/* Memory for other applications */
    txt_html +=         '<div title="">';
    txt_html +=             '<label class="item" for="memoryForOtherApplications">Memory for other applications:</label>';
    txt_html +=             '<input id="memoryForOtherApplications" type="text" class="numeric service" size="8" min="0" step="512"/> MB';
	txt_html +=             '<div class="plus stepper inline"/><div class="min stepper inline"/>';
    txt_html +=         '</div>';

	/* Memory for cache */
    txt_html +=         '<div title="">';
    txt_html +=             '<label class="item" for="memoryForCache">Memory for cache:</label>';
    txt_html +=             '<input id="memoryForCache" type="text" class="numeric service" size="8" min="0" max="100" step="5"/> %';
	txt_html +=             '<div class="plus stepper inline"/><div class="min stepper inline"/>';
    txt_html +=         '</div>';

	/* Minimum size */
    txt_html +=         '<div title="">';
    txt_html +=             '<label class="item" for="minimumSize">Minimum size:</label>';
    txt_html +=             '<input id="minimumSize" type="text" class="numeric service" size="8" min="0" step="100"/> MB';    
	txt_html +=             '<div class="plus stepper inline"/><div class="min stepper inline"/>';
    txt_html +=         '</div>';

	/* Maximum size */
    txt_html +=         '<div title="">';
    txt_html +=             '<label class="item" for="maximumSize">Maximum size:</label>';
    txt_html +=             '<input id="maximumSize" type="text" class="numeric service" size="8" min="0" step="100"/> MB';    
	txt_html +=             '<div class="plus stepper inline"/><div class="min stepper inline"/>';
    txt_html +=         '</div>';
    
	txt_html +=         '</div>';

    txt_html +=     '</div>';
    
    txt_html += '</section>';

    return txt_html;	
}