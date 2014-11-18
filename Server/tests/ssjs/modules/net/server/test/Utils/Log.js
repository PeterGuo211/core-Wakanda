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
//////////////////////////////////////////////////////////////////////////////////// Basic log object, inspired by Wakanda doc//////////////////////////////////////////////////////////////////////////////////function Log(fileName) {		var log=		{			init: function(fileName)			{				var logPath=getFolder("path");				logPath+=fileName;				var logFile=File(logPath);				if(logFile.exists)					logFile.remove();								logFile.create();								logFile.append								this.logFile=logFile;				},						append: function(msg)			{				var logFile=this.logFile;								if(logFile!=null)				{					if(!logFile.exists)						logFile.create();					var stream=TextStream(logFile, "write");					stream.write(msg+"\n");					stream.close();				}								return log;			},									date: function()			{				var date=new Date();								this.append(date.toString())								return log;			},									logFile: null		}		log.init(fileName);		return log;}