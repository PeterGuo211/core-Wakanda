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
//// "use strict";

/*global WAF,window*/

if (!('warn' in WAF)) {
    if (!('warn' in window.console)) {
        WAF.warn = window.console.warn;
    } else {
        WAF.warn = function() {};
    }
}

WAF.Widget.provide(

    /**
     * WAF Google Chart widget
     *
     * @class WAF.widget.GoogleChart
     * @extends WAF.Widget
     */
    'GoogleChart',
    
    
    {
        // Shared private properties and methods
        // NOTE: "this" is NOT available in this context
        
        /**
         * Draw the chart
         *
         * @private
         * @shared
         * @method drawTheChart
         * @param {String} inWidget
         * @return {WAF.widget.GoogleChart} The current instance to allow chaining
         **/
        drawTheChart: function drawTheChart(inWidget) {
            var size, 
            margin, 
            labelsString = '', 
            valuesString = '', 
            style = '', 
            width = '',
            height = '',
            chartSrc = '';			
			
            var source = inWidget.source;
            if (source != null)
            {
                for (var i = 0, nb = source.length; i < nb; i++)
                {
                    source.getElement(i, {
                        onSuccess:function(event) {
                            if (inWidget.chartLabels !== null) {
                                labelsString += event.element[inWidget.chartLabels] + ((i < nb-1) ? '|' : '');
                            }
                            if (inWidget.chartValues !== null) {
                                valuesString += event.element[inWidget.chartValues] + ((i < nb-1) ? ',' : '');
                            }
                        }
                    });
                }
            }
			                       
            width = $(inWidget.ref).css('width');
            height = $(inWidget.ref).css('height');
            size = width.replace('px', '') + 'x' + height.replace('px', '');
            
            // http://chart.apis.google.com/chart?chs=250x100&chd=t:60,40&cht=p3&chl=Hello|World
            chartSrc = [
            // base url of static google chart
            'http://chart.apis.google.com/chart?',

            // fix the size
            'chs=' + size,

            // fix the data value
            '&chd=t:' + valuesString,

            // fix the chart type value
            '&cht=' + inWidget.chartType,

            // fix the labels of the chart
            '&chl=' + labelsString,
				
            //example : chbh=r,0.5,1.5 : Bars chart uses the r value to specify sizes relative to the bar width. In this chart, spacing between bars is 0.9x bar width
            '&chbh=' + ((inWidget.chartType != 'bvs') ? '' : 'r,0.9')
            ];
        
            // update the chart
            inWidget.ref.src = chartSrc.join('');
            
            return inWidget;
        },
		
        chartEventHandler: function(event)
        {
            var widget = event.data.widget;        
	 
            if (widget != null) {   
                event.data.drawTheChart(widget);	            
            }	
        }
      
    },
	
        
    /**
     * @constructor
     * @param {Object} inConfig configuration of the widget
     */

    /**
     * The constructor of the widget
     *
     * @property constructor
     * @type Function
     * @default WAF.widget.GoogleChart
     **/
    function (inConfig, inData, shared) {

        var chartTypesAlias = {
            'pie chart' : 'p',
            'pie chart 3D' : 'p3',
            'line' : 'lc',
            'line without axis' : 'lc:nda',
            'vertical bars' : 'bvs',
            'Venn diagram' : 'v'
        }		
		
        this.chartType =  inData.chartType ? chartTypesAlias[inData.chartType] : 'p3';
        this.chartValues =  inData.chartValues;
        this.chartLabels = inData.chartLabels;       

        if (typeof this.source !== 'undefined') {
            this.source.addListener('onAttributeChange', shared.chartEventHandler, {
                attributeName: this.chartLabels
            }, {
                widget:this, 
                drawTheChart:shared.drawTheChart
            });
            this.source.addListener('onAttributeChange', shared.chartEventHandler, {
                attributeName: this.chartValues
            }, {
                widget:this, 
                drawTheChart:shared.drawTheChart
            });
        }

    },
    
    {
    // [Prototype]
    // The public shared properties and methods inherited by all the instances
    // NOTE: "this" is available in this context
    // These methods and properties are available from the constructor through "this" 

    }

    );
