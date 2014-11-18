/**
 *
 * Updated on 19 June 2013
 *
 * @class Widgets
 * @extends Object
 *
 */
WAF.widget.SwitchBox = function WAF_widget_SwitchBox() {
    
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    /**
     * 
     *
     * @property errorDiv
     * @attributes 
     * @type String
     */
    this.errorDiv =  ''; 
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    
    /**
     * toggle the Switch widget to either &quot;on&quot; or &quot;off&quot;
     *
     * @method toggleSlide
     */
    this.toggleSlide = function toggleSlide() {
         
    };
    
    /**
     * set the Switch widget to either &quot;on&quot; or &quot;off&quot;
     *
     * @method slide
     * @param {Boolean} state
     */
    this.slide = function slide(state) {
         
    };
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * enable data entry for the Switch widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable data entry for the Switch widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * Clears the error message for the widget displayed in the associated [#title id&#61;&quot;1795&quot;/] widget
     *
     * @method clearErrorMessage
     */
    this.clearErrorMessage = function clearErrorMessage() {
         
    };
    
    /**
     * set the Error ID for the  widget
     *
     * @method setErrorDiv
     * @param {String} errorDiv
     */
    this.setErrorDiv = function setErrorDiv(errorDiv) {
         
    };
    
    /**
     * Sets the error message for the widget that will be displayed in the associated [#title id&#61;&quot;1795&quot;/] widget
     *
     * @method setErrorMessage
     * @param {Object} messageObject
     */
    this.setErrorMessage = function setErrorMessage(messageObject) {
         
    };
    
    /**
     * returns the jQuery reference (DOM node) to the widget whose ID is defined as the Error ID
     *
     * @method getErrorDiv
     * @return {String}
     */
    this.getErrorDiv = function getErrorDiv() {
        return ''; 
    };
    
    /**
     * set the value of the Switch widget
     *
     * @method setValue
     * @param {String} value
     */
    this.setValue = function setValue(value) {
         
    };
    
    /**
     * returns the value of the Switch widget
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    

};


WAF.widget.TextField = function WAF_widget_TextField() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    /**
     * 
     *
     * @property errorDiv
     * @attributes 
     * @type String
     */
    this.errorDiv =  ''; 
    
    /**
     * 
     *
     * @property format
     * @attributes 
     * @type Object
     */
    this.format =  {}; 
    
    
    /**
     * disable data entry for this widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * returns the value currently displayed in the Text Input widget
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * enable data entry for this widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * set the widget&#39;s tab index defined in the Tabindex property
     *
     * @method setTabIndex
     * @param {Number} tabIndex
     */
    this.setTabIndex = function setTabIndex(tabIndex) {
         
    };
    
    /**
     * Sets the error message for the widget that will be displayed in the associated [#title id&#61;&quot;1795&quot;/] widget
     *
     * @method setErrorMessage
     * @param {Object} messageObject
     */
    this.setErrorMessage = function setErrorMessage(messageObject) {
         
    };
    
    /**
     * set the Error ID for the  widget
     *
     * @method setErrorDiv
     * @param {String} errorDiv
     */
    this.setErrorDiv = function setErrorDiv(errorDiv) {
         
    };
    
    /**
     * returns the jQuery reference (DOM node) to the widget whose ID is defined as the Error ID
     *
     * @method getErrorDiv
     * @return {String}
     */
    this.getErrorDiv = function getErrorDiv() {
        return ''; 
    };
    
    /**
     * sets the widget&#39;s text color to textColor
     *
     * @method setTextColor
     * @param {String} textColor
     */
    this.setTextColor = function setTextColor(textColor) {
         
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * returns True if the widget has the focus and False if it does not
     *
     * @method hasFocus
     * @return {Boolean}
     */
    this.hasFocus = function hasFocus() {
        return true; 
    };
    
    /**
     * put the focus on a widget on the  Page
     *
     * @method focus
     */
    this.focus = function focus() {
         
    };
    
    /**
     * set the value in a widget
     *
     * @method setValue
     * @param {String} value
     */
    this.setValue = function setValue(value) {
         
    };
    
    /**
     * set the Read only mode for the widget
     *
     * @method setReadOnly
     * @param {Boolean} readonly
     */
    this.setReadOnly = function setReadOnly(readonly) {
         
    };
    
    /**
     * indicates if a widget is in Read only mode
     *
     * @method isReadOnly
     * @return {Boolean}
     */
    this.isReadOnly = function isReadOnly() {
        return true; 
    };
    
    /**
     * Clears the error message for the widget displayed in the associated [#title id&#61;&quot;1795&quot;/] widget
     *
     * @method clearErrorMessage
     */
    this.clearErrorMessage = function clearErrorMessage() {
         
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * clears the value displayed in the widget
     *
     * @method clear
     */
    this.clear = function clear() {
         
    };
    

};


WAF.widget.RichText = function WAF_widget_RichText() {
    
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    /**
     * 
     *
     * @property format
     * @attributes 
     * @type Object
     */
    this.format =  {}; 
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    
    /**
     * clears the value displayed in the widget
     *
     * @method clear
     */
    this.clear = function clear() {
         
    };
    
    /**
     * set the value in a widget
     *
     * @method setValue
     * @param {String} value
     */
    this.setValue = function setValue(value) {
         
    };
    
    /**
     * sets the widget&#39;s text color to textColor
     *
     * @method setTextColor
     * @param {String} textColor
     */
    this.setTextColor = function setTextColor(textColor) {
         
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * returns the value currently displayed in the Text widget
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * get the URL  property set for the widget
     *
     * @method getURL
     * @return {String}
     */
    this.getURL = function getURL() {
        return ''; 
    };
    
    /**
     * set the URL property for the widget
     *
     * @method setURL
     * @param {String} URL
     */
    this.setURL = function setURL(URL) {
         
    };
    

};


WAF.widget.TabView = function WAF_widget_TabView() {
    
    
    
    /**
     * returns an object that defines the currently selected tab
     *
     * @method getSelectedTab
     * @return {Object}
     */
    this.getSelectedTab = function getSelectedTab() {
        return {}; 
    };
    
    /**
     * returns the Container object for the tab specified by tabNumber
     *
     * @method getTabContainer
     * @param {Number} tabNumber
     * @return {Object}
     */
    this.getTabContainer = function getTabContainer(tabNumber) {
        return {}; 
    };
    
    /**
     * number of tabs currently displayed
     *
     * @method countTabs
     * @return {Number}
     */
    this.countTabs = function countTabs() {
        return 0; 
    };
    
    /**
     * remove a tab displayed in the [#title id&#61;&quot;2804&quot;/] widget
     *
     * @method removeTab
     * @param {Number} tab
     */
    this.removeTab = function removeTab(tab) {
         
    };
    
    /**
     * add a tab to the [#title id&#61;&quot;2804&quot;/] widget
     *
     * @method addTab
     * @param {String} title
     * @param {Boolean} closable
     */
    this.addTab = function addTab(title, closable) {
         
    };
    
    /**
     * select a specific tab and display its contents
     *
     * @method selectTab
     * @param {Number} tab
     */
    this.selectTab = function selectTab(tab) {
         
    };
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * enable data entry for all the widgets in the Tab View widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable all the widgets inside of the Tab View widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    

};


WAF.widget.RadioGroup = function WAF_widget_RadioGroup() {
    
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property sourceOut
     * @attributes 
     * @type DataSource
     */
    this.sourceOut =  new DataSource( ); 
    
    
    /**
     * set the widget&#39;s tab index defined in the Tabindex property
     *
     * @method setTabIndex
     * @param {Number} tabIndex
     */
    this.setTabIndex = function setTabIndex(tabIndex) {
         
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * select the radio button in the Radio Button Group widget
     *
     * @method setValue
     * @param {String} value
     */
    this.setValue = function setValue(value) {
         
    };
    
    /**
     * returns True if the Button is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * returns True if the widget has the focus and False if it does not
     *
     * @method hasFocus
     * @return {Boolean}
     */
    this.hasFocus = function hasFocus() {
        return true; 
    };
    
    /**
     * returns the value selected for the Radio Button Group widget
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    
    /**
     * focus on or blur a widget on the Page
     *
     * @method focus
     * @param {Boolean} focus
     */
    this.focus = function focus(focus) {
         
    };
    
    /**
     * enable the Radio Button Group widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable the Radio Button Group widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * add a radio button to the Radio Button Group widget
     *
     * @method addRadioButton
     * @param {String} label
     * @param {String} value
     */
    this.addRadioButton = function addRadioButton(label, value) {
         
    };
    

};


WAF.widget.MenuBar = function WAF_widget_MenuBar() {
    
    
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * enable the Menu Bar widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable the Menu Bar
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * retrieve the currently selected Menu Item widget
     *
     * @method getSelectedMenuItem
     * @return {Object}
     */
    this.getSelectedMenuItem = function getSelectedMenuItem() {
        return {}; 
    };
    

};


WAF.widget.Image = function WAF_widget_Image() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * clears the image displayed in the widget
     *
     * @method clear
     */
    this.clear = function clear() {
         
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * set the value in the widget
     *
     * @method setValue
     * @param {String} value
     */
    this.setValue = function setValue(value) {
         
    };
    
    /**
     * returns the value displayed in the widget
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * set the URL property for the widget
     *
     * @method setURL
     * @param {String} URL
     */
    this.setURL = function setURL(URL) {
         
    };
    
    /**
     * get the URL  property set for the widget
     *
     * @method getURL
     * @return {String}
     */
    this.getURL = function getURL() {
        return ''; 
    };
    

};


WAF.widget.ErrorDiv = function WAF_widget_ErrorDiv() {
    
    
    
    /**
     * sets the widget&#39;s text color to textColor
     *
     * @method setTextColor
     * @param {String} textColor
     */
    this.setTextColor = function setTextColor(textColor) {
         
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    

};


WAF.widget.Combobox = function WAF_widget_Combobox() {
    
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    /**
     * 
     *
     * @property sourceOut
     * @attributes 
     * @type DataSource
     */
    this.sourceOut =  new DataSource( ); 
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    
    /**
     * add an option to the Combo Box widget
     *
     * @method addOption
     * @param {String} value
     * @param {String} label
     * @param {Boolean} selected
     */
    this.addOption = function addOption(value, label, selected) {
         
    };
    
    /**
     * enable this widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable this widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * returns True if the widget has the focus and False if it does not
     *
     * @method hasFocus
     * @return {Boolean}
     */
    this.hasFocus = function hasFocus() {
        return true; 
    };
    
    /**
     * focus on or blur a widget on the Page
     *
     * @method focus
     * @param {Boolean} focus
     */
    this.focus = function focus(focus) {
         
    };
    
    /**
     * set the widget&#39;s tab index defined in the Tabindex property
     *
     * @method setTabIndex
     * @param {Number} tabIndex
     */
    this.setTabIndex = function setTabIndex(tabIndex) {
         
    };
    
    /**
     * set the value to display for the Combo Box
     *
     * @method setValue
     * @param {String} value
     */
    this.setValue = function setValue(value) {
         
    };
    
    /**
     * returns the selected value in the Combo Box
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * remove an option from the  Combo Box widget
     *
     * @method removeOption
     * @param {Number} option
     */
    this.removeOption = function removeOption(option) {
         
    };
    

};


WAF.widget.Chart = function WAF_widget_Chart() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * define the colors for the Data Series displayed for a Chart
     *
     * @property colors
     * @attributes 
     * @type Array
     */
    this.colors =  []; 
    
    
    /**
     * returns the title of the Chart
     *
     * @method getLabels
     * @return {Array}
     */
    this.getLabels = function getLabels() {
        return []; 
    };
    
    /**
     * returns the values in the Chart widget
     *
     * @method getValues
     * @return {Array}
     */
    this.getValues = function getValues() {
        return []; 
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * redraw the Chart widget with the labels and values for the Data Series
     *
     * @method recreateChart
     * @param {Array} labels
     * @param {Array} values
     */
    this.recreateChart = function recreateChart(labels, values) {
         
    };
    
    /**
     * returns the type of the Chart
     *
     * @method getChartType
     * @return {String}
     */
    this.getChartType = function getChartType() {
        return ''; 
    };
    

};


WAF.widget.Button = function WAF_widget_Button() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    
    /**
     * returns the Text property defined for the Button widget
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    
    /**
     * set the widget&#39;s tab index defined in the Tabindex property
     *
     * @method setTabIndex
     * @param {Number} tabIndex
     */
    this.setTabIndex = function setTabIndex(tabIndex) {
         
    };
    
    /**
     * set the URL property for the widget
     *
     * @method setURL
     * @param {String} URL
     */
    this.setURL = function setURL(URL) {
         
    };
    
    /**
     * get the URL  property set for the widget
     *
     * @method getURL
     * @return {String}
     */
    this.getURL = function getURL() {
        return ''; 
    };
    
    /**
     * returns True if the Button is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * sets the Button widget&#39;s text color to textColor
     *
     * @method setTextColor
     * @param {String} textColor
     */
    this.setTextColor = function setTextColor(textColor) {
         
    };
    
    /**
     * set the title for the Button widget
     *
     * @method setValue
     * @param {String} title
     */
    this.setValue = function setValue(title) {
         
    };
    
    /**
     * enable the Button widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable the Button widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * returns True if the widget has the focus and False if it does not
     *
     * @method hasFocus
     * @return {Boolean}
     */
    this.hasFocus = function hasFocus() {
        return true; 
    };
    
    /**
     * focus on or blur a widget on the Page
     *
     * @method focus
     * @param {Boolean} focus
     */
    this.focus = function focus(focus) {
         
    };
    

};


WAF.widget.QueryForm = function WAF_widget_QueryForm() {
    
    
    /**
     * 
     *
     * @property sourceAtts
     * @attributes 
     * @type DataSource
     */
    this.sourceAtts =  new DataSource( ); 
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    
    /**
     * find the entities  whose values were entered in the fields of the Query Form  widget
     *
     * @method findEntity
     */
    this.findEntity = function findEntity() {
         
    };
    
    /**
     * clears the values displayed in the Query Form widget
     *
     * @method clear
     */
    this.clear = function clear() {
         
    };
    
    /**
     * sets the Button widget&#39;s text color to textColor
     *
     * @method setTextColor
     * @param {String} textColor
     */
    this.setTextColor = function setTextColor(textColor) {
         
    };
    

};


WAF.widget.AutoForm = function WAF_widget_AutoForm() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property errorDiv
     * @attributes 
     * @type String
     */
    this.errorDiv =  ''; 
    
    /**
     * 
     *
     * @property sourceAtts
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtts =  new DatasourceAttribute( ); 
    
    
    /**
     * save the data entered in the [#title id&#61;&quot;812&quot;/] widget
     *
     * @method saveEntity
     */
    this.saveEntity = function saveEntity() {
         
    };
    
    /**
     * go to the next entity in the [#title id&#61;&quot;812&quot;/] widget
     *
     * @method nextEntity
     */
    this.nextEntity = function nextEntity() {
         
    };
    
    /**
     * go to the previous entity in the [#title id&#61;&quot;812&quot;/] widget
     *
     * @method prevEntity
     */
    this.prevEntity = function prevEntity() {
         
    };
    
    /**
     * drop the current entity in the [#title id&#61;&quot;812&quot;/] widget
     *
     * @method dropEntity
     */
    this.dropEntity = function dropEntity() {
         
    };
    
    /**
     * find the entities whose values were entered in the widgets in the Auto Form widget
     *
     * @method findEntity
     */
    this.findEntity = function findEntity() {
         
    };
    
    /**
     * clears the values displayed in the Auto Form widget
     *
     * @method clear
     */
    this.clear = function clear() {
         
    };
    
    /**
     * add a new entity to the [#title id&#61;&quot;812&quot;/] widget
     *
     * @method addEntity
     */
    this.addEntity = function addEntity() {
         
    };
    
    /**
     * returns the jQuery reference (DOM node) to the  widget whose ID is defined as the Error ID
     *
     * @method getErrorDiv
     * @return {String}
     */
    this.getErrorDiv = function getErrorDiv() {
        return ''; 
    };
    
    /**
     * Sets the error message for the widget that will be displayed in the widget defined in the Error ID property
     *
     * @method setErrorMessage
     * @param {Object} messageObject
     */
    this.setErrorMessage = function setErrorMessage(messageObject) {
         
    };
    
    /**
     * set the Error ID for the widget
     *
     * @method setErrorDiv
     * @param {String} errorDiv
     */
    this.setErrorDiv = function setErrorDiv(errorDiv) {
         
    };
    
    /**
     * sets the attribute title&#39;s color to textColor
     *
     * @method setTextColor
     * @param {String} textColor
     */
    this.setTextColor = function setTextColor(textColor) {
         
    };
    
    /**
     * Clears the error message in the widget whose ID is defined by the Error ID property
     *
     * @method clearErrorMessage
     */
    this.clearErrorMessage = function clearErrorMessage() {
         
    };
    

};


WAF.widget.Slider = function WAF_widget_Slider() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    /**
     * 
     *
     * @property errorDiv
     * @attributes 
     * @type String
     */
    this.errorDiv =  ''; 
    
    
    /**
     * set the Orientation of the Slider  widget
     *
     * @method setOrientation
     * @param {String} orientation
     */
    this.setOrientation = function setOrientation(orientation) {
         
    };
    
    /**
     * returns the Orientation of the Slider widget
     *
     * @method getOrientation
     * @return {String}
     */
    this.getOrientation = function getOrientation() {
        return ''; 
    };
    
    /**
     * set the Step for the Slider widget
     *
     * @method setStep
     * @param {Number} step
     */
    this.setStep = function setStep(step) {
         
    };
    
    /**
     * returns the Step for the Slider widget
     *
     * @method getStep
     * @return {Number}
     */
    this.getStep = function getStep() {
        return 0; 
    };
    
    /**
     * set the Range of the Slider widget
     *
     * @method setRange
     * @param {String} range
     */
    this.setRange = function setRange(range) {
         
    };
    
    /**
     * returns the Range of the Slider widget
     *
     * @method getRange
     * @return {String}
     */
    this.getRange = function getRange() {
        return ''; 
    };
    
    /**
     * set the two values for a Slider that has two handles
     *
     * @method setValues
     * @param {Array} values
     */
    this.setValues = function setValues(values) {
         
    };
    
    /**
     * set the Maximum Value for the Slider
     *
     * @method setMax
     * @param {Number} value
     */
    this.setMax = function setMax(value) {
         
    };
    
    /**
     * set the Minimum Value for the Slider
     *
     * @method setMin
     * @param {Number} value
     */
    this.setMin = function setMin(value) {
         
    };
    
    /**
     * returns the Maximum Value for  the Slider widget
     *
     * @method getMax
     * @return {Number}
     */
    this.getMax = function getMax() {
        return 0; 
    };
    
    /**
     * add an additional handle to the [#title id&#61;&quot;1798&quot;/] widget
     *
     * @method addHandle
     * @param {Number} number
     */
    this.addHandle = function addHandle(number) {
         
    };
    
    /**
     * returns the value currently displayed in the Slider widget
     *
     * @method getValue
     * @return {String | Array}
     */
    this.getValue = function getValue() {
        return '' || []; 
    };
    
    /**
     * clears the value displayed in the widget
     *
     * @method clear
     */
    this.clear = function clear() {
         
    };
    
    /**
     * returns the Minimum Value for the Slider widget
     *
     * @method getMin
     * @return {Number}
     */
    this.getMin = function getMin() {
        return 0; 
    };
    
    /**
     * set the Error ID for the  widget
     *
     * @method setErrorDiv
     * @param {String} errorDiv
     */
    this.setErrorDiv = function setErrorDiv(errorDiv) {
         
    };
    
    /**
     * Sets the error message for the widget that will be displayed in the associated [#title id&#61;&quot;1795&quot;/] widget
     *
     * @method setErrorMessage
     * @param {Object} messageObject
     */
    this.setErrorMessage = function setErrorMessage(messageObject) {
         
    };
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * returns the jQuery reference (DOM node) to the widget whose ID is defined as the Error ID
     *
     * @method getErrorDiv
     * @return {String}
     */
    this.getErrorDiv = function getErrorDiv() {
        return ''; 
    };
    
    /**
     * enable data entry for this widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable data entry for this widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * clears the error message for the widget displayed in the associated [#title id&#61;&quot;1795&quot;/] widget
     *
     * @method clearErrorMessage
     */
    this.clearErrorMessage = function clearErrorMessage() {
         
    };
    

};


WAF.widget.Component = function WAF_widget_Component() {
    
    
    /**
     * returns an object containing an object for each widget in the Web Component
     *
     * @property widgets
     * @attributes 
     * @type Object
     */
    this.widgets =  {}; 
    
    /**
     * 
     *
     * @property sources
     * @attributes 
     * @type Object
     */
    this.sources =  {}; 
    
    
    /**
     * load a Web Component already present in your project into the Component widget on your&amp;nbsp;Page
     *
     * @method loadComponent
     * @param {String} webComponent
     * @param {Object} componentObject
     */
    this.loadComponent = function loadComponent(webComponent, componentObject) {
         
    };
    
    /**
     * remove the Web Component currently loaded in the Component widget
     *
     * @method removeComponent
     */
    this.removeComponent = function removeComponent() {
         
    };
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * enable the widgets in the Component widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable the widgets in the Component widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    

};


WAF.widget.Login = function WAF_widget_Login() {
    
    
    /**
     * 
     *
     * @property labels
     * @attributes 
     * @type Object
     */
    this.labels =  {}; 
    
    
    /**
     * refresh the [#title id&#61;&quot;2535&quot;/] widget to display the current user
     *
     * @method refresh
     */
    this.refresh = function refresh() {
         
    };
    
    /**
     * display the login dialog so that the user can enter his/her username and password
     *
     * @method showLoginDialog
     */
    this.showLoginDialog = function showLoginDialog() {
         
    };
    
    /**
     * log the current user out of the application
     *
     * @method logout
     */
    this.logout = function logout() {
         
    };
    
    /**
     * pass the username and password to login a user in the [#title id&#61;&quot;2535&quot;/] widget
     *
     * @method login
     * @param {String} username
     * @param {String} password
     */
    this.login = function login(username, password) {
         
    };
    
    /**
     * sets the widget&#39;s text color to textColor
     *
     * @method setTextColor
     * @param {String} textColor
     */
    this.setTextColor = function setTextColor(textColor) {
         
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    

};


WAF.widget.Grid = function WAF_widget_Grid() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    /**
     * 
     *
     * @property errorDiv
     * @attributes 
     * @type String
     */
    this.errorDiv =  ''; 
    
    /**
     * 
     *
     * @property originalWidth
     * @attributes 
     * @type String
     */
    this.originalWidth =  ''; 
    
    /**
     * 
     *
     * @property att
     * @attributes 
     * @type DatasourceAttribute
     */
    this.att =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property title
     * @attributes 
     * @type String
     */
    this.title =  ''; 
    
    /**
     * 
     *
     * @property width
     * @attributes 
     * @type String
     */
    this.width =  ''; 
    
    /**
     * 
     *
     * @property readOnly
     * @attributes 
     * @type Boolean
     */
    this.readOnly =  true; 
    
    /**
     * 
     *
     * @property format
     * @attributes 
     * @type Object
     */
    this.format =  {}; 
    
    
    /**
     * resets the column&#39;s sort indicators
     *
     * @method resetSortIndicator
     */
    this.resetSortIndicator = function resetSortIndicator() {
         
    };
    
    /**
     * reduces the current selection of rows in the Grid to the ones that are selected
     *
     * @method reduceToSelected
     * @param {Object} options
     * @param {Object} userData
     */
    this.reduceToSelected = function reduceToSelected(options, userData) {
         
    };
    
    /**
     * returns an object with two properties, colNb and order, that define how the Grid is currently being sorted
     *
     * @method getSortIndicator
     * @return {Object}
     */
    this.getSortIndicator = function getSortIndicator() {
        return {}; 
    };
    
    /**
     * returns the number of selected rows
     *
     * @method countSelected
     * @return {Number}
     */
    this.countSelected = function countSelected() {
        return 0; 
    };
    
    /**
     * retrieve the selected rows
     *
     * @method getSelectedRows
     * @return {Array}
     */
    this.getSelectedRows = function getSelectedRows() {
        return []; 
    };
    
    /**
     * returns the Selection mode
     *
     * @method getSelectionMode
     * @return {String}
     */
    this.getSelectionMode = function getSelectionMode() {
        return ''; 
    };
    
    /**
     * returns an object of type Column to which you can apply other functions in the [#title id&#61;&quot;2858&quot;/] class
     *
     * @method column
     * @param {Number} columnRef
     */
    this.column = function column(columnRef) {
         
    };
    
    /**
     * set the selection mode of the [#title id&#61;&quot;811&quot;/] widget to either &quot;single&quot; or &quot;multiple&quot;
     *
     * @method setSelectionMode
     * @param {String} mode
     */
    this.setSelectionMode = function setSelectionMode(mode) {
         
    };
    
    /**
     * set the Grid to be in read only or read/write mode
     *
     * @method setReadOnly
     * @param {Boolean} mode
     */
    this.setReadOnly = function setReadOnly(mode) {
         
    };
    
    /**
     * 
     *
     * @method setSortIndicator
     * @param {Number} column
     * @param {String} sortOrder
     */
    this.setSortIndicator = function setSortIndicator(column, sortOrder) {
         
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * Sets the error message for the widget that will be displayed in the associated [#title id&#61;&quot;1795&quot;/] widget
     *
     * @method setErrorMessage
     * @param {Object} messageObject
     */
    this.setErrorMessage = function setErrorMessage(messageObject) {
         
    };
    
    /**
     * set the Error ID for the  widget
     *
     * @method setErrorDiv
     * @param {String} errorDiv
     */
    this.setErrorDiv = function setErrorDiv(errorDiv) {
         
    };
    
    /**
     * returns the jQuery reference (DOM node) to the widget whose ID is defined as the Error ID
     *
     * @method getErrorDiv
     * @return {String}
     */
    this.getErrorDiv = function getErrorDiv() {
        return ''; 
    };
    
    /**
     * Clears the error message for the widget displayed in the associated [#title id&#61;&quot;1795&quot;/] widget
     *
     * @method clearErrorMessage
     */
    this.clearErrorMessage = function clearErrorMessage() {
         
    };
    
    /**
     * indicates if a widget is in Read only mode
     *
     * @method isReadOnly
     * @return {Boolean}
     */
    this.isReadOnly = function isReadOnly() {
        return true; 
    };
    
    /**
     * writes message to the log file and Wakanda Studio Debugger&#39;s Console with the visual &quot;ERROR&quot; label
     *
     * @method error
     * @param {Object} message
     */
    this.error = function error(message) {
         
    };
    
    /**
     * select a selection of rows
     *
     * @method setSelectedRows
     * @param {Array} rows
     */
    this.setSelectedRows = function setSelectedRows(rows) {
         
    };
    
    /**
     * center the Grid with the rowNumber without changing the current entity
     *
     * @method centerRow
     * @param {Number} rowNumber
     */
    this.centerRow = function centerRow(rowNumber) {
         
    };
    
    /**
     * retrieve the height (in pixels) of the rows in the Grid widget
     *
     * @method getRowHeight
     * @return {Number}
     */
    this.getRowHeight = function getRowHeight() {
        return 0; 
    };
    
    /**
     * set the height (in pixels) of the rows in the Grid widget
     *
     * @method setRowHeight
     * @param {Number} rowHeight
     */
    this.setRowHeight = function setRowHeight(rowHeight) {
         
    };
    
    /**
     * sets the column width to width (expressed in pixels) for column
     *
     * @method setWidth
     * @param {Number} width
     */
    this.setWidth = function setWidth(width) {
         
    };
    
    /**
     * set the text size of the column to textSize in your Grid widget
     *
     * @method setTextSize
     * @param {Number} textSize
     */
    this.setTextSize = function setTextSize(textSize) {
         
    };
    
    /**
     * call a function for each cell in a column
     *
     * @method setRenderer
     * @param {Function} function
     */
    this.setRenderer = function setRenderer(function) {
         
    };
    
    /**
     * set the display format to format for the data in column
     *
     * @method setFormat
     * @param {String} format
     */
    this.setFormat = function setFormat(format) {
         
    };
    
    /**
     * set column&#39;s text color to textColor
     *
     * @method setTextColor
     * @param {String} textColor
     */
    this.setTextColor = function setTextColor(textColor) {
         
    };
    
    /**
     * set column&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * retrieve the value in a cell defined by column and the currently selected row
     *
     * @method getValueForInput
     */
    this.getValueForInput = function getValueForInput() {
         
    };
    
    /**
     * retrieve the formatted value in a cell defined by column and the currently selected row
     *
     * @method getFormattedValue
     * @return {String}
     */
    this.getFormattedValue = function getFormattedValue() {
        return ''; 
    };
    
    /**
     * set the alignment of the column in a Grid widget
     *
     * @method setAlignment
     * @param {String} alignment
     */
    this.setAlignment = function setAlignment(alignment) {
         
    };
    

};


WAF.widget.Container = function WAF_widget_Container() {
    
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * either collapses the left container in a vertically split [#title id&#61;&quot;1801&quot;/] widget and shows the Left Splitter Button
     *
     * @method mobileSplitView
     * @param {Boolean} popupDisplay
     */
    this.mobileSplitView = function mobileSplitView(popupDisplay) {
         
    };
    
    /**
     * toggles the first container in a previously split [#title id&#61;&quot;1801&quot;/] widget
     *
     * @method toggleSplitter
     */
    this.toggleSplitter = function toggleSplitter() {
         
    };
    
    /**
     * expands the first container in a previously split [#title id&#61;&quot;1801&quot;/] widget
     *
     * @method expandSplitter
     */
    this.expandSplitter = function expandSplitter() {
         
    };
    
    /**
     * Set the position of the splitter in the Container widget
     *
     * @method setSplitPosition
     * @param {Number} number
     */
    this.setSplitPosition = function setSplitPosition(number) {
         
    };
    
    /**
     * retrieve the current position of the Container widget&#39;s splitter
     *
     * @method getSplitPosition
     * @return {Number}
     */
    this.getSplitPosition = function getSplitPosition() {
        return 0; 
    };
    
    /**
     * collapses the first container in a previously split [#title id&#61;&quot;1801&quot;/] widget
     *
     * @method collapseSplitter
     */
    this.collapseSplitter = function collapseSplitter() {
         
    };
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * enable data entry for all the widgets in the Container widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable all the widgets inside of the Container widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * returns True if the Container has a splitter and False if it does not
     *
     * @method hasSplitter
     * @return {Boolean}
     */
    this.hasSplitter = function hasSplitter() {
        return true; 
    };
    

};


WAF.widget.ProgressBar = function WAF_widget_ProgressBar() {
    
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * sends a request to the server to interrupt the session
     *
     * @method userBreak
     */
    this.userBreak = function userBreak() {
         
    };
    
    /**
     * begins sending requests to the server in order to display the progress of the session associated with the [#title id&#61;&quot;1800&quot;/] widget
     *
     * @method startListening
     */
    this.startListening = function startListening() {
         
    };
    
    /**
     * stops sending requests to the server in order to display the progress of the session associated with the widget
     *
     * @method stopListening
     */
    this.stopListening = function stopListening() {
         
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * set the value, the maximum value, and the title of the Progress Bar widget
     *
     * @method setValue
     * @param {Number} value
     * @param {Number} maximum
     * @param {String} title
     */
    this.setValue = function setValue(value, maximum, title) {
         
    };
    
    /**
     * returns the value displayed in the widget
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    

};


WAF.widget.Checkbox = function WAF_widget_Checkbox() {
    
    
    /**
     * 
     *
     * @property errorDiv
     * @attributes 
     * @type String
     */
    this.errorDiv =  ''; 
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * unchecks the checkbox and sets its value to false
     *
     * @method uncheck
     */
    this.uncheck = function uncheck() {
         
    };
    
    /**
     * checks the checkbox and sets its value to true or unchecks it and sets its value to false
     *
     * @method toggleCheckbox
     */
    this.toggleCheckbox = function toggleCheckbox() {
         
    };
    
    /**
     * checks the checkbox and sets its value to true
     *
     * @method check
     */
    this.check = function check() {
         
    };
    
    /**
     * unchecks the Checkbox widget
     *
     * @method clear
     */
    this.clear = function clear() {
         
    };
    
    /**
     * Sets the error message for the widget that will be displayed in the associated [#title id&#61;&quot;1795&quot;/] widget
     *
     * @method setErrorMessage
     * @param {Object} messageObject
     */
    this.setErrorMessage = function setErrorMessage(messageObject) {
         
    };
    
    /**
     * set the Error ID for the  widget
     *
     * @method setErrorDiv
     * @param {String} errorDiv
     */
    this.setErrorDiv = function setErrorDiv(errorDiv) {
         
    };
    
    /**
     * returns the jQuery reference (DOM node) to the widget whose ID is defined as the Error ID
     *
     * @method getErrorDiv
     * @return {String}
     */
    this.getErrorDiv = function getErrorDiv() {
        return ''; 
    };
    
    /**
     * clears the error message for the widget displayed in the associated [#title id&#61;&quot;1795&quot;/] widget
     *
     * @method clearErrorMessage
     */
    this.clearErrorMessage = function clearErrorMessage() {
         
    };
    
    /**
     * returns True if the widget has the focus and False if it does not
     *
     * @method hasFocus
     * @return {Boolean}
     */
    this.hasFocus = function hasFocus() {
        return true; 
    };
    
    /**
     * focus on or blur a widget on the Page
     *
     * @method focus
     * @param {Boolean} focus
     */
    this.focus = function focus(focus) {
         
    };
    
    /**
     * set the widget&#39;s tab index defined in the Tabindex property
     *
     * @method setTabIndex
     * @param {Number} tabIndex
     */
    this.setTabIndex = function setTabIndex(tabIndex) {
         
    };
    
    /**
     * returns returns true if the Checkbox is checked
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    
    /**
     * set the Checkbox to true (checked) or false (unchecked)
     *
     * @method setValue
     * @param {String} value
     */
    this.setValue = function setValue(value) {
         
    };
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * enable data entry for the Checkbox widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable data entry for the Checkbox
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    

};


WAF.widget.Video = function WAF_widget_Video() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * enable the Video widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable the Video widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * find out the supported players and video types
     *
     * @method getSupportedVideoTypes
     * @return {Array}
     */
    this.getSupportedVideoTypes = function getSupportedVideoTypes() {
        return []; 
    };
    
    /**
     * get the current volume for the video
     *
     * @method getVolume
     * @return {Number}
     */
    this.getVolume = function getVolume() {
        return 0; 
    };
    
    /**
     * set the volume of the video
     *
     * @method setVolume
     * @param {Number} volume
     */
    this.setVolume = function setVolume(volume) {
         
    };
    
    /**
     * mute the video
     *
     * @method mute
     */
    this.mute = function mute() {
         
    };
    
    /**
     * toggle the muting of the video
     *
     * @method toggleMute
     */
    this.toggleMute = function toggleMute() {
         
    };
    
    /**
     * load a video into this widget by passing its URL or an array of URLs
     *
     * @method loadVideoByUrl
     * @param {String | Array} videoURL
     * @param {Number} position
     */
    this.loadVideoByUrl = function loadVideoByUrl(videoURL, position) {
         
    };
    
    /**
     * load a video into this widget
     *
     * @method loadVideoById
     * @param {String} videoID
     * @param {String} videoType
     * @param {Number} position
     */
    this.loadVideoById = function loadVideoById(videoID, videoType, position) {
         
    };
    
    /**
     * go to a specific position in the video expressed in seconds
     *
     * @method seekTo
     * @param {Number} position
     */
    this.seekTo = function seekTo(position) {
         
    };
    
    /**
     * toggle the playing of the video
     *
     * @method togglePlay
     */
    this.togglePlay = function togglePlay() {
         
    };
    
    /**
     * find out if the video is currently playing
     *
     * @method isPlaying
     * @return {Boolean}
     */
    this.isPlaying = function isPlaying() {
        return true; 
    };
    
    /**
     * stop the video currently playing
     *
     * @method stop
     */
    this.stop = function stop() {
         
    };
    
    /**
     * play the video loaded in the widget
     *
     * @method play
     */
    this.play = function play() {
         
    };
    
    /**
     * pause the video that is currently playing
     *
     * @method pause
     */
    this.pause = function pause() {
         
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * set the value in the widget
     *
     * @method setValue
     * @param {String} value
     */
    this.setValue = function setValue(value) {
         
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * returns the value displayed in the widget
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    

};


WAF.widget.Matrix = function WAF_widget_Matrix() {
    
    
    
    /**
     * display the previous page in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goToPreviousPage
     */
    this.goToPreviousPage = function goToPreviousPage() {
         
    };
    
    /**
     * display the next page in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goToNextPage
     */
    this.goToNextPage = function goToNextPage() {
         
    };
    
    /**
     * display the last element in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goToLast
     */
    this.goToLast = function goToLast() {
         
    };
    
    /**
     * display the first element in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goToFirst
     */
    this.goToFirst = function goToFirst() {
         
    };
    
    /**
     * go to a specific element in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method goTo
     * @param {Number} element
     */
    this.goTo = function goTo(element) {
         
    };
    
    /**
     * returns the total number of pages in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method getTotalPages
     * @return {Number}
     */
    this.getTotalPages = function getTotalPages() {
        return 0; 
    };
    
    /**
     * returns the currently displayed row in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method getDisplayedRow
     * @return {Number}
     */
    this.getDisplayedRow = function getDisplayedRow() {
        return 0; 
    };
    
    /**
     * returns the current page number in the [#title id&#61;&quot;1802&quot;/] widget
     *
     * @method getCurrentPage
     * @return {Number}
     */
    this.getCurrentPage = function getCurrentPage() {
        return 0; 
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    

};


WAF.Widget = function WAF_Widget() {
    
    
    /**
     * 
     *
     * @property id
     * @attributes ReadOnly
     * @type String
     */
    this.id =  ''; 
    
    /**
     * 
     *
     * @property domNode
     * @attributes ReadOnly
     * @type String
     */
    this.domNode =  ''; 
    
    /**
     * 
     *
     * @property config
     * @attributes ReadOnly
     * @type Object
     */
    this.config =  {}; 
    
    /**
     * 
     *
     * @property kind
     * @attributes ReadOnly
     * @type String
     */
    this.kind =  ''; 
    
    /**
     * 
     *
     * @property Basics
     * @attributes 
     * @type String
     */
    this.Basics =  ''; 
    
    
    /**
     * unlink one widget from another widget
     *
     * @method unlink
     * @param {Widget} widget
     */
    this.unlink = function unlink(widget) {
         
    };
    
    /**
     * link a widget to another widget
     *
     * @method link
     * @param {Widget} widget
     */
    this.link = function link(widget) {
         
    };
    
    /**
     * set a [#title id&#61;&quot;1801&quot;/] widget as the parent of a widget
     *
     * @method setParent
     * @param {Widget} widget
     */
    this.setParent = function setParent(widget) {
         
    };
    
    /**
     * add a widget as a &quot;child,&quot; which means that it will be contained in the &quot;parent&quot; widget
     *
     * @method addChild
     * @param {Widget} widget
     */
    this.addChild = function addChild(widget) {
         
    };
    
    /**
     * sets the right position of the widget
     *
     * @method setRight
     * @param {Number} right
     */
    this.setRight = function setRight(right) {
         
    };
    
    /**
     * sets the bottom position of the widget
     *
     * @method setBottom
     * @param {Number} bottom
     */
    this.setBottom = function setBottom(bottom) {
         
    };
    
    /**
     * sets the top position of the widget
     *
     * @method setTop
     * @param {Number} top
     */
    this.setTop = function setTop(top) {
         
    };
    
    /**
     * sets the left position of the widget
     *
     * @method setLeft
     * @param {Number} left
     */
    this.setLeft = function setLeft(left) {
         
    };
    
    /**
     * returns the widget&#39;s position
     *
     * @method getPosition
     * @return {Object}
     */
    this.getPosition = function getPosition() {
        return {}; 
    };
    
    /**
     * returns the height of the widget
     *
     * @method getHeight
     * @return {Number}
     */
    this.getHeight = function getHeight() {
        return 0; 
    };
    
    /**
     * set the height of the widget
     *
     * @method setHeight
     * @param {Number} height
     */
    this.setHeight = function setHeight(height) {
         
    };
    
    /**
     * set the width of the widget
     *
     * @method setWidth
     * @param {Number} width
     */
    this.setWidth = function setWidth(width) {
         
    };
    
    /**
     * returns an array of objects where each object  defines a widget linked to the main widget
     *
     * @method getLinks
     * @return {Array}
     */
    this.getLinks = function getLinks() {
        return []; 
    };
    
    /**
     * returns an array of objects where each object defines a widget included in the parent widget
     *
     * @method getChildren
     * @return {Array}
     */
    this.getChildren = function getChildren() {
        return []; 
    };
    
    /**
     * add a CSS class to your widget
     *
     * @method addClass
     * @param {String} cssClass
     */
    this.addClass = function addClass(cssClass) {
         
    };
    
    /**
     * removes the cssClass from the widget
     *
     * @method removeClass
     * @param {String} cssClass
     */
    this.removeClass = function removeClass(cssClass) {
         
    };
    
    /**
     * show a hidden widget on the&amp;nbsp;Page
     *
     * @method show
     */
    this.show = function show() {
         
    };
    
    /**
     * resizes the widget to its new height and width
     *
     * @method resize
     * @param {String | Number} height
     * @param {String | Number} width
     */
    this.resize = function resize(height, width) {
         
    };
    
    /**
     * activates or disactivates the ability to resize the widget
     *
     * @method resizable
     * @param {Boolean} resizableOption
     */
    this.resizable = function resizable(resizableOption) {
         
    };
    
    /**
     * remove a particular listener or all listeners previously added by the Basics method
     *
     * @method removeListener
     * @param {String} event
     * @param {String} callback
     */
    this.removeListener = function removeListener(event, callback) {
         
    };
    
    /**
     * redraw the widget on the&amp;nbsp;Page
     *
     * @method redraw
     */
    this.redraw = function redraw() {
         
    };
    
    /**
     * hides the widget on the&amp;nbsp;Page
     *
     * @method hide
     * @param {String} mode
     */
    this.hide = function hide(mode) {
         
    };
    
    /**
     * returns the theme(s) defined for the widget
     *
     * @method getTheme
     * @return {String}
     */
    this.getTheme = function getTheme() {
        return ''; 
    };
    
    /**
     * activate or disactivate the draggable option for the widget
     *
     * @method draggable
     * @param {Boolean} boolean
     */
    this.draggable = function draggable(boolean) {
         
    };
    
    /**
     * deletes the widget from the&amp;nbsp;Page&amp;nbsp;and removes all the listeners associated to it
     *
     * @method destroy
     */
    this.destroy = function destroy() {
         
    };
    
    /**
     * returns the width of the widget
     *
     * @method getWidth
     * @return {Number}
     */
    this.getWidth = function getWidth() {
        return 0; 
    };
    
    /**
     * add a listener to the widget for a specific event
     *
     * @method addListener
     * @param {String} event
     * @param {String} callback
     * @param {Object} options
     */
    this.addListener = function addListener(event, callback, options) {
         
    };
    
    /**
     * toggle the display of the widget
     *
     * @method toggle
     * @param {String} mode
     */
    this.toggle = function toggle(mode) {
         
    };
    
    /**
     * returns the &quot;parent&quot; widget for the widget to which it is applied
     *
     * @method getParent
     * @return {Widget}
     */
    this.getParent = function getParent() {
        return new Widget( ); 
    };
    
    /**
     * add widgets as &quot;children,&quot; which means that they will be contained in the &quot;parent&quot; widget
     *
     * @method addChildren
     * @param {Widget} widget
     */
    this.addChildren = function addChildren(widget) {
         
    };
    
    /**
     * move the widget to its new left and top coordinates
     *
     * @method move
     * @param {String | Number} left
     * @param {String | Number} top
     */
    this.move = function move(left, top) {
         
    };
    
    /**
     * rebuild any widget as it was defined on the Page
     *
     * @method rebuild
     */
    this.rebuild = function rebuild() {
         
    };
    
    /**
     * returns True if the widget is visible and False if it is not
     *
     * @method isVisible
     * @return {Boolean}
     */
    this.isVisible = function isVisible() {
        return true; 
    };
    
    /**
     * remove the state of the widget
     *
     * @method removeState
     * @param {String} state
     */
    this.removeState = function removeState(state) {
         
    };
    
    /**
     * get the state of the widget
     *
     * @method getState
     * @return {String}
     */
    this.getState = function getState() {
        return ''; 
    };
    
    /**
     * set the widget&#39;s state
     *
     * @method setState
     * @param {String} state
     */
    this.setState = function setState(state) {
         
    };
    

};


WAF.widget.YahooWeather = function WAF_widget_YahooWeather() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * set the value in the widget
     *
     * @method setValue
     * @param {String} value
     */
    this.setValue = function setValue(value) {
         
    };
    
    /**
     * returns the value displayed in the widget
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    

};


WAF.widget.ListView = function WAF_widget_ListView() {
    
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * enable data entry for all the widgets in the List View widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable all the widgets inside of the List View widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    

};


WAF.widget.Section = function WAF_widget_Section() {
    
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * enable data entry for all the widgets in the Section widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable all the widgets inside of the Section widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    

};


WAF.widget.GoogleMaps = function WAF_widget_GoogleMaps() {
    
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * set the zoom level of the map defined in zoomValue
     *
     * @method setZoom
     * @param {Number} zoomValue
     */
    this.setZoom = function setZoom(zoomValue) {
         
    };
    
    /**
     * set or create a marker on the map by defining ID and location
     *
     * @method setMarker
     * @param {Number} ID
     * @param {String} location
     * @param {Object} options
     */
    this.setMarker = function setMarker(ID, location, options) {
         
    };
    
    /**
     * set the icon marker to icon for the marker defined by the entity whose ID is ID
     *
     * @method setIconMarker
     * @param {Number} ID
     * @param {String} icon
     */
    this.setIconMarker = function setIconMarker(ID, icon) {
         
    };
    
    /**
     * set the center point of the map defined by location
     *
     * @method setCenter
     * @param {String} location
     */
    this.setCenter = function setCenter(location) {
         
    };
    
    /**
     * returns the Label widget as an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    

};


WAF.widget.Accordion = function WAF_widget_Accordion() {
    
    
    
    /**
     * either expand or collapse the sectionNumber section
     *
     * @method toggleSection
     * @param {Number} sectionNumber
     */
    this.toggleSection = function toggleSection(sectionNumber) {
         
    };
    
    /**
     * find out if a numberSection section is collapsed
     *
     * @method isCollapsed
     * @param {Number} sectionNumber
     * @return {Boolean}
     */
    this.isCollapsed = function isCollapsed(sectionNumber) {
        return true; 
    };
    
    /**
     * get the number of sections
     *
     * @method getNumberOfSections
     * @return {Number}
     */
    this.getNumberOfSections = function getNumberOfSections() {
        return 0; 
    };
    
    /**
     * expand all the sections
     *
     * @method expandAll
     */
    this.expandAll = function expandAll() {
         
    };
    
    /**
     * expand the sectionNumber section
     *
     * @method expand
     * @param {Number} sectionNumber
     */
    this.expand = function expand(sectionNumber) {
         
    };
    
    /**
     * collapse all the sections
     *
     * @method collapseAll
     */
    this.collapseAll = function collapseAll() {
         
    };
    
    /**
     * collapse the sectionNumber section
     *
     * @method collapse
     * @param {Number} sectionNumber
     */
    this.collapse = function collapse(sectionNumber) {
         
    };
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * enable the Accordion widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable the Accordion widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    

};


WAF.widget.MenuItem = function WAF_widget_MenuItem() {
    
    
    
    /**
     * modify the title of a Menu Item
     *
     * @method renameMenuItem
     * @param {String} menuItemText
     */
    this.renameMenuItem = function renameMenuItem(menuItemText) {
         
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * sets the widget&#39;s text color to textColor
     *
     * @method setTextColor
     * @param {String} textColor
     */
    this.setTextColor = function setTextColor(textColor) {
         
    };
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * enable the Menu Item and its menu items
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable the entire Menu Item including its menu items
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    

};


WAF.widget.Label = function WAF_widget_Label() {
    
    
    /**
     * 
     *
     * @property linkedWidget
     * @attributes 
     * @type String
     */
    this.linkedWidget =  ''; 
    
    
    /**
     * set the value for the Label widget
     *
     * @method setValue
     * @param {String} value
     */
    this.setValue = function setValue(value) {
         
    };
    
    /**
     * sets the widget&#39;s text color to textColor
     *
     * @method setTextColor
     * @param {String} textColor
     */
    this.setTextColor = function setTextColor(textColor) {
         
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * returns the value displayed in the Label widget
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    

};


WAF.widget.GoogleMap = function WAF_widget_GoogleMap() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * returns the Label widget as an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * set or create a marker on the map by defining ID and location
     *
     * @method setMarker
     * @param {Number} ID
     * @param {String} location
     * @param {Object} options
     */
    this.setMarker = function setMarker(ID, location, options) {
         
    };
    
    /**
     * set the center point of the map defined by location
     *
     * @method setCenter
     * @param {String} location
     */
    this.setCenter = function setCenter(location) {
         
    };
    
    /**
     * set the icon marker to icon for the marker defined by the entity whose ID is ID
     *
     * @method setIconMarker
     * @param {Number} ID
     * @param {String} icon
     */
    this.setIconMarker = function setIconMarker(ID, icon) {
         
    };
    
    /**
     * set the zoom level of the map defined in zoomValue
     *
     * @method setZoom
     * @param {Number} zoomValue
     */
    this.setZoom = function setZoom(zoomValue) {
         
    };
    

};


WAF.widget.Popover = function WAF_widget_Popover() {
    
    
    /**
     * 
     *
     * @property isVisible
     * @attributes 
     * @type Boolean
     */
    this.isVisible =  true; 
    
    /**
     * 
     *
     * @property linkedButtonID
     * @attributes 
     * @type String
     */
    this.linkedButtonID =  ''; 
    
    
    /**
     * disable all the widgets inside of the Popover widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * enable data entry for all the widgets in the Popover widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    

};


WAF.widget.Calendar = function WAF_widget_Calendar() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    /**
     * 
     *
     * @property format
     * @attributes 
     * @type Object
     */
    this.format =  {}; 
    
    
    /**
     * clears the value displayed in the widget
     *
     * @method clear
     */
    this.clear = function clear() {
         
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * return the date(s) selected in the Calendar widget
     *
     * @method getValue
     * @param {Boolean} formatted
     * @return {String | Object}
     */
    this.getValue = function getValue(formatted) {
        return '' || {}; 
    };
    
    /**
     * set the date(s) in the Calendar widget
     *
     * @method setValue
     * @param {Date | String} dateValue
     * @param {Boolean} shiftTo
     */
    this.setValue = function setValue(dateValue, shiftTo) {
         
    };
    
    /**
     * returns the value chosen for the Selection mode property
     *
     * @method getSelectionMode
     * @return {String}
     */
    this.getSelectionMode = function getSelectionMode() {
        return ''; 
    };
    

};


WAF.widget.SplitView = function WAF_widget_SplitView() {
    
    
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * enable data entry for all the widgets in the Split View widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable all the widgets inside of the Split View widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    

};


WAF.widget.NavigationView = function WAF_widget_NavigationView() {
    
    
    /**
     * 
     *
     * @property viewsList
     * @attributes 
     * @type Object
     */
    this.viewsList =  {}; 
    
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * enable data entry for all the widgets in the Navigation View widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable all the widgets inside of the Navigation View widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * go to the next view in the Navigation View
     *
     * @method goToNextView
     */
    this.goToNextView = function goToNextView() {
         
    };
    
    /**
     * go to the previous view in the Navigation View
     *
     * @method goToPreviousView
     */
    this.goToPreviousView = function goToPreviousView() {
         
    };
    
    /**
     * go to a specific view in the Navigation View
     *
     * @method goToView
     * @param {Number} view
     */
    this.goToView = function goToView(view) {
         
    };
    

};


WAF.widget.Select = function WAF_widget_Select() {
    
    
    /**
     * 
     *
     * @property sourceOut
     * @attributes 
     * @type DataSource
     */
    this.sourceOut =  new DataSource( ); 
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * set the value to display for the Select
     *
     * @method setValue
     * @param {String} value
     */
    this.setValue = function setValue(value) {
         
    };
    
    /**
     * returns the selected value in the Select widget
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    

};


WAF.widget.Canvas = function WAF_widget_Canvas() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * returns the Label widget as an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * returns the Canvas widget&#39;s DOM object
     *
     * @method getCanvas
     * @return {Object}
     */
    this.getCanvas = function getCanvas() {
        return {}; 
    };
    
    /**
     * returns the 2D context of the Canvas widget
     *
     * @method get2DContext
     * @return {Object}
     */
    this.get2DContext = function get2DContext() {
        return {}; 
    };
    

};


WAF.widget.TinyMCE = function WAF_widget_TinyMCE() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * set the HTML text in the WYSIWYG Editor
     *
     * @method setValue
     * @param {String} value
     */
    this.setValue = function setValue(value) {
         
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * returns the HTML text in the WYSIWYG Editor
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * 
     *
     * @method getControlManager
     * @return {Object}
     */
    this.getControlManager = function getControlManager() {
        return {}; 
    };
    
    /**
     * returns an instance of the WYSIWYG Editor
     *
     * @method getWysiwygInstance
     * @return {Object}
     */
    this.getWysiwygInstance = function getWysiwygInstance() {
        return {}; 
    };
    

};


WAF.widget.Frame = function WAF_widget_Frame() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * returns the iFrame tag for the Frame widget
     *
     * @method getFrame
     * @return {Object}
     */
    this.getFrame = function getFrame() {
        return {}; 
    };
    
    /**
     * set the Source page property for the Frame widget
     *
     * @method setValue
     * @param {String} value
     */
    this.setValue = function setValue(value) {
         
    };
    
    /**
     * returns the value defined in the Source page property for this widget
     *
     * @method getValue
     * @return {String}
     */
    this.getValue = function getValue() {
        return ''; 
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    

};


WAF.widget.ButtonImage = function WAF_widget_ButtonImage() {
    
    
    /**
     * 
     *
     * @property sourceAtt
     * @attributes 
     * @type DatasourceAttribute
     */
    this.sourceAtt =  new DatasourceAttribute( ); 
    
    /**
     * 
     *
     * @property source
     * @attributes 
     * @type DataSource
     */
    this.source =  new DataSource( ); 
    
    
    /**
     * returns True if the Image Button is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * enable the Image Button widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable this widget
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * sets the widget&#39;s text color to textColor
     *
     * @method setTextColor
     * @param {String} textColor
     */
    this.setTextColor = function setTextColor(textColor) {
         
    };
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * set the widget&#39;s tab index defined in the Tabindex property
     *
     * @method setTabIndex
     * @param {Number} tabIndex
     */
    this.setTabIndex = function setTabIndex(tabIndex) {
         
    };
    
    /**
     * returns True if the widget has the focus and False if it does not
     *
     * @method hasFocus
     * @return {Boolean}
     */
    this.hasFocus = function hasFocus() {
        return true; 
    };
    
    /**
     * focus on or blur a widget on the Page
     *
     * @method focus
     * @param {Boolean} focus
     */
    this.focus = function focus(focus) {
         
    };
    
    /**
     * set the URL property for the widget
     *
     * @method setURL
     * @param {String} URL
     */
    this.setURL = function setURL(URL) {
         
    };
    
    /**
     * get the URL  property set for the widget
     *
     * @method getURL
     * @return {String}
     */
    this.getURL = function getURL() {
        return ''; 
    };
    
    /**
     * returns the Icon widget
     *
     * @method getIcon
     * @return {Object}
     */
    this.getIcon = function getIcon() {
        return {}; 
    };
    

};


WAF.widget.Icon = function WAF_widget_Icon() {
    
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * sets the widget&#39;s background color to backgroundColor
     *
     * @method setBackgroundColor
     * @param {String} backgroundColor
     */
    this.setBackgroundColor = function setBackgroundColor(backgroundColor) {
         
    };
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    

};


WAF.widget.Dialog = function WAF_widget_Dialog() {
    
    
    
    /**
     * returns True if the widget is disabled and False if it is not
     *
     * @method isDisabled
     * @return {Boolean}
     */
    this.isDisabled = function isDisabled() {
        return true; 
    };
    
    /**
     * enable the Dialog widget
     *
     * @method enable
     */
    this.enable = function enable() {
         
    };
    
    /**
     * disable the Dialog widget along with the widgets inside of it
     *
     * @method disable
     */
    this.disable = function disable() {
         
    };
    
    /**
     * minimize the Dialog widget
     *
     * @method minimizeDialog
     */
    this.minimizeDialog = function minimizeDialog() {
         
    };
    
    /**
     * maximize the Dialog widget
     *
     * @method maximizeDialog
     */
    this.maximizeDialog = function maximizeDialog() {
         
    };
    
    /**
     * display the Dialog widget
     *
     * @method displayDialog
     */
    this.displayDialog = function displayDialog() {
         
    };
    
    /**
     * close the Dialog widget
     *
     * @method closeDialog
     */
    this.closeDialog = function closeDialog() {
         
    };
    

};


WAF.widget.FileUpload = function WAF_widget_FileUpload() {
    
    
    /**
     * 
     *
     * @property label
     * @attributes 
     * @type String
     */
    this.label =  ''; 
    
    
    /**
     * returns the Label widget as  an object
     *
     * @method getLabel
     * @return {Object}
     */
    this.getLabel = function getLabel() {
        return {}; 
    };
    
    /**
     * upload the files
     *
     * @method uploadFiles
     */
    this.uploadFiles = function uploadFiles() {
         
    };
    
    /**
     * set one or more files to be the ones selected for the File Upload widget and displayed in the list of files
     *
     * @method setFiles
     * @param {Object | Array} fileList
     */
    this.setFiles = function setFiles(fileList) {
         
    };
    
    /**
     * append one or more files to the list of selected files
     *
     * @method appendFiles
     * @param {Object | Array} fileList
     */
    this.appendFiles = function appendFiles(fileList) {
         
    };
    
    /**
     * set the Display notification property of the File Upload widget
     *
     * @method setNotificationStatus
     * @param {Boolean} status
     */
    this.setNotificationStatus = function setNotificationStatus(status) {
         
    };
    
    /**
     * set the maximum file size
     *
     * @method setMaximumFileSize
     * @param {Number} maxFileSize
     * @param {String} unit
     */
    this.setMaximumFileSize = function setMaximumFileSize(maxFileSize, unit) {
         
    };
    
    /**
     * returns the value defined for the widget&#39;s Maximum size property along with the type (bytes, kb, or mb)
     *
     * @method getMaximumFileSize
     * @return {String}
     */
    this.getMaximumFileSize = function getMaximumFileSize() {
        return ''; 
    };
    
    /**
     * set the maximum number of files to upload with the File Upload widget
     *
     * @method setMaximumFiles
     * @param {Number} maxFiles
     */
    this.setMaximumFiles = function setMaximumFiles(maxFiles) {
         
    };
    
    /**
     * retrieve the value set for the Maximum files property
     *
     * @method getMaximumFiles
     * @return {Number}
     */
    this.getMaximumFiles = function getMaximumFiles() {
        return 0; 
    };
    
    /**
     * define the folder for the Folder/Temporary folder property
     *
     * @method setFolderName
     * @param {String} folderName
     */
    this.setFolderName = function setFolderName(folderName) {
         
    };
    
    /**
     * returns the folder defined in the Folder or Temporary folder property or set by setFolderName( )
     *
     * @method getFolderName
     * @return {String}
     */
    this.getFolderName = function getFolderName() {
        return ''; 
    };
    
    /**
     * set the text in the File Upload widget
     *
     * @method setFileUploadText
     * @param {String} text
     */
    this.setFileUploadText = function setFileUploadText(text) {
         
    };
    
    /**
     * returns the text defined in the File Upload widget&#39;s Text property or set by the setFileUploadText( ) function
     *
     * @method getFileUploadText
     * @return {String}
     */
    this.getFileUploadText = function getFileUploadText() {
        return ''; 
    };
    
    /**
     * remove a specific file in the list of selected files for the File Upload widget
     *
     * @method removeFile
     * @param {Number} fileNumber
     */
    this.removeFile = function removeFile(fileNumber) {
         
    };
    
    /**
     * removes all the files the user selected for the File Upload widget
     *
     * @method removeAll
     */
    this.removeAll = function removeAll() {
         
    };
    
    /**
     * retrieve an array of objects defining each selected file
     *
     * @method getFiles
     * @return {Array}
     */
    this.getFiles = function getFiles() {
        return []; 
    };
    

};

