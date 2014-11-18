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

/**
 * Execute a template to get the associated PDF
 * @module print/print
 * @method print
 * @param {Object} params
 * @return {String} true if the pdf is generated, otherwise false   
 * 
 * @exemple
 *   require('print').toPdf({
 *	report: "/myReport.waReport/",
 *	output: "/myReport.waReport/myreport.pdf"
 *   });
 *  
 */
exports.toPdf = function(params) {
    var pdfWorker = null,
    message = '',
    fullUrlReport = '',
    fullUrlPdf = '',
    serverIp = '127.0.0.1',
    serverPort = '',
    defaultOutput = '',
    webFolderName = '',
    parameters = '',
    arrParameters = [],
    pdfFile = null;

    // default value for report name
    if (params.report.indexOf('.html') !== -1) {
        defaultOutput = params.report.replace('.html', '.pdf');
    } else {
        defaultOutput = params.report + '/' + 'index.html';
    }

    params = params || {};
    params.report = params.report || '';
    params.output = params.output || defaultOutput;
    params.options = params.options || '';
    params.delay = params.delay || '5000';

    // get server informations
    serverIp = application.httpServer.ipAddress;
    serverPort = application.settings.getItem('http').port;

    // get full url report
    if (params.report.indexOf('.html') === -1) {
        fullUrlReport = serverIp + ':' + serverPort + '/' + params.report + '/' + 'index.html';
    } else {
        fullUrlReport = serverIp + ':' + serverPort + '/' + params.report;
    }
    fullUrlReport = "http://" + fullUrlReport.replace(/\/\//g, '/');

    // get full url pdf   
    fullUrlPdf = serverIp + ':' + serverPort + '/' + params.output;
    fullUrlPdf = "http://" + fullUrlPdf.replace(/\/\//g, '/');

    // set output
    webFolderName = application.getItemsWithRole('webFolder').name;
    pdfFile = new File('/PROJECT/' + webFolderName + '/' + params.output);
    arrParameters.push(fullUrlReport);
    arrParameters.push(pdfFile);

    // Launch the worker
    parameters = params.options + ' --javascript-delay ' + params.delay + ' {s} {f}';

    pdfWorker = new SystemWorker('wkhtmltopdf', parameters, null, arrParameters);

    pdfWorker.onmessage = function() {
    };

    pdfWorker.onterminated = function() {
        if (message === '' || message.indexOf('Done') !== -1) {
            message = fullUrlPdf;
        }
        exitWait();
    };

    pdfWorker.onerror = function(data) {
        if (data && data.data) {
            message = 'Wakanda Server Error - Error with wkhtmltopdf when processing:\n\r';
            message += data.data;
        }
    };

    wait(10000);

    return message;
};

exports.getModulePath = function() {
    return module.id;
};