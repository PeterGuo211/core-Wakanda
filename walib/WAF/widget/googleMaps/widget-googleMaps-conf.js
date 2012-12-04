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
WAF.addWidget({
    
    /**
    *  Widget Descriptor
    */ 
    
    /* PROPERTIES */

    // {String} internal name of the widget
    type        : 'googleMaps',  

    // {String} library used ('waf', 'jquery', 'extjs', 'yui') (optional)
    lib         : 'WAF',

    // {String} display name of the widget in the GUI Designer 
    description : 'Google Maps V3',

    // {String} category in which the widget is displayed in the GUI Designer
    category    : 'External',

    // {Array} css file needed by widget (optional)
    css         : [],                                                     

    // {Array} script files needed by widget (optional) 
    include     : [],                 

    // {String} type of the html tag ('div' by default)
    tag         : 'div',                               

    // {Array} attributes of the widget. By default, we have 3 attributes: 'data-type', 'data-lib', and 'id', so it is unnecessary to add them
    // 
    // @property {String} name, name of the attribute (mandatory)     
    // @property {String} description, description of the attribute (optional)
    // @property {String} defaultValue, default value of the attribute (optional)
    // @property {'string'|'radio'|'checkbox'|'textarea'|'dropdown'|'integer'} type, type of the field to show in the GUI Designer (optional)
    // @property {Array} options, list of values to choose for the field shown in the GUI Designer (optional)
    attributes  : [
    {
        name         : 'data-binding',
        description  : 'Source',
        type         : 'string',
        visibility  : 'hidden'
    },
    
    {
        name         : 'data-address',
        autocomplete : true,
        defaultValue : '',
        description  : 'Source',
        type         : 'string',
        onchange     : function (e) {
            var
            value,
            source;
            
            value = this.getValue();
            if(value.indexOf(".") !== -1 ){
                value       = value.split('.');
                source      = value[0];
                this.data.tag.getAttribute('data-binding').setValue(source);
                this.data.tag.domUpdate();
            }
        }
    }, 
    {
        name        : 'data-label',
        description : 'Label',
        defaultValue: 'Label'
    },
    {
               name        : 'data-label-position',
               description : 'Label position',
               defaultValue: 'top'
       },   
   
    {
        name        : 'data-infowindow',
        value       : '',
        visibility  : 'hidden',
        type         : 'string'
    },
    {
        name        : 'data-mapType',
        type        : 'dropdown',

        options     : [
        {
            key     : 'hybrid',
            value   : 'Hybrid'
        },
        {
            key     : 'roadmap',
            value   : 'Roadmap'
        },
        {
            key     : 'satellite',
            value   : 'Satellite'
        },
        {
            key     : 'terrain',
            value   : 'Terrain'
        }],
        defaultValue: 'hybrid',
        description  : 'Type'
    },

    {
        name         : 'data-key',
        defaultValue : '',
        description  : 'Google key'
    },

    {
        name         : 'data-zoom',
        defaultValue : '1',
        description  : 'Zoom',
        typeValue    : 'integer',
        slider       : {
            min : 1,
            max : 20
        },
        reloadTag   : true
    },
    {
        name         : 'data-language',
        description  : 'Language',
        type         : 'dropdown',
        options      : ['default','en', 'zh-CH', 'nl', 'fr', 'de', 'it', 'pl', 'ja', 'es'],
        defaultValue : 'English'
    },
    {
        name         : 'data-infowindow-display',
        defaultValue : 'true',
        description  : 'Auto display bubble',
        type         : 'checkbox'
    },
    {
        name         : 'data-streetView',
        description  : 'Display street view',
        type         : 'checkbox',
        defaultValue : 'true',
        category     : 'Controls'
    },
    {
        name         : 'data-zoomControl',
        description  : 'Display zoom',
        type         : 'checkbox',
        defaultValue : 'true',
        category     : 'Controls'
    },

    {
        name         : 'data-scaleControl',
        description  : 'Display scale',
        type         : 'checkbox',
        defaultValue : 'true',
        category     : 'Controls'
    },

    {
        name         : 'data-binding-tooltip',
        description  : 'Tooltip',
        category     : 'Marker'
    },
    {
        name         : 'data-panControl',
        defaultValue : 'false',
        description  : 'Display pan',
        type         : 'checkbox',
        category     : 'Controls'
    }, 
    
    {
        name         : 'data-marker-icon-selected',
        description  : 'Selected icon',
        type         : 'file',
        accept       : 'image/*',
        category     : 'Marker'
    },
    
    {
        name         : 'data-marker-icon',
        description  : 'Icon',
        type         : 'file',
        accept       : 'image/*',
        category     : 'Marker'
    },

    {
        name         : 'data-marker-number',
        description  : 'Number of markers',
        defaultValue : '1',
        typeValue    : 'integer',
        category     : 'Marker'
    },
    
    {
        name: 'data-errorDiv',
        description: 'Placeholder for error description',
        category: 'Error Handling'
    }    
    ],


    // {Array} default height and width of the container for the widget in the GUI Designer
    // 
    // @property {String} name, name of the attribute 
    // @property {String} defaultValue, default value of the attribute  
    style: [                                                                     
    {
        name        : 'width',
        defaultValue: '656px'
    },
    {
        name        : 'height',
        defaultValue: '324px'
    }],

    // {Array} events ot the widget
    // 
    // @property {String} name, internal name of the event (mandatory)     
    // @property {String} description, display name of the event in the GUI Designer
    // @property {String} category, category in which the event is displayed in the GUI Designer (optional)
    events: [                                                              
    {
        name       : 'click',
        description: 'On Click',
        category   : 'Map Events'
    },
    {
        name       : 'dblclick',
        description: 'On Double Click',
        category   : 'Map Events'
    },
    {
        name       : 'mouseover',
        description: 'On Mouse Over',
        category   : 'Map Events'
    },                                                          
    {
        name       : 'markerClick',
        description: 'On Marker Click',
        category   : 'Marker Events'
    },
    {
        name       : 'markerDblclick',
        description: 'On Marker Double Click',
        category   : 'Marker Events'
    },
    {
        name       : 'markerMouseover',
        description: 'On Marker Mouse Over',
        category   : 'Marker Events'
    }],

    // {JSON} panel properties widget
    //
    // @property {Object} enable style settings in the Styles panel in the Properties area in the GUI Designer
    properties: {
        style: {                                                
            theme       : false,
            fClass      : true,                 // true to display the "Class" option in the "Theme & Class" section
            text        : false,                 // true to display the "Text" section
            background  : false,                 // true to display widget "Background" section
            dropShadow  : true,
            border      : true,                 // true to display widget "Border" section
            sizePosition: true,                 // true to display widget "Size and Position" section
            label       : true,                 // true to display widget "Label Text" and "Label Size and Position" sections
            // For these two sections, you must also define the "data-label" in the Attributes array
            disabled     : ['border-radius']     // list of styles settings to disable for this widget
        }
    },


    /* METHODS */

    /*
    * function to call when the widget is loaded by WAF during runtime
    * 
    * @param {Object} config contains all the attributes of the widget  
    * @result {WAF.widget.Template} the widget
    */
    onInit: function (config) {                                
        var widget = new WAF.widget.GoogleMaps(config);       
        return widget;
    },

    /**
    * function to call when the widget is displayed in the GUI Designer
    * 
    * @param {Object} config contains all the attributes for the widget
    * @param {Designer.api} set of functions used to be managed by the GUI Designer
    * @param {Designer.tag.Tag} container of the widget in the GUI Designer
    * @param {Object} catalog of dataClasses defined for the widget
    * @param {Boolean} isResize is a resize call for the widget (not currently available for custom widgets)
    */
    onDesign: function (config, designer, tag, catalog, isResize) {
        //document.getElementById(tag.getAttribute('id').getValue()).style.backgroundImage = '../walib/WAF/widget/googleMaps/images/googleMaps.jpg';
        var
        img,
        htmlObject;

        htmlObject  = tag.getHtmlObject().empty();
        img         = $('<img>').css({
            width       : '100%',
            height      : '100%',
            top         : 0,
            left        : 0,
            position    : 'absolute' 
        });
        switch (tag.getAttribute('data-mapType').getValue()) {

            case "roadmap":
                img.prop({
                    src : '/walib/WAF/widget/googleMaps/images/roadmap.png'
                });
                break;

            case "hybrid":
                img.prop({
                    src : '/walib/WAF/widget/googleMaps/images/hybrid.png'
                });
                break;

            case "satellite":
                img.prop({
                    src : '/walib/WAF/widget/googleMaps/images/satellite.png'
                });
                break;

            case "terrain":
                img.prop({
                    src : '/walib/WAF/widget/googleMaps/images/terrain.png'
                });
                break;
            default:
                img.prop({
                    src : '/walib/WAF/widget/googleMaps/images/hybrid.png'
                });
                break;

        }

        htmlObject.append(img);
    },
    
    onCreate: function (tag, param) {
        $('body').on('keyup','#string-data-address', {tag:tag}, function(e){
                
                if($(this).val() === '' ) {
                    e.data.tag.getAttribute('data-binding').setValue("");
                    e.data.tag.domUpdate();
                }
            });
    }
    
});                                                                                                                                  
