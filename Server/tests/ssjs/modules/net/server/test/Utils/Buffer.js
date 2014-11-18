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
//////////////////////////////////////////////////////////////////////////////////// A simple function that concat 2 buffers//////////////////////////////////////////////////////////////////////////////////function ConcatBuffers(buf1, buf2) {		var newBuf=new Buffer(buf1.length+buf2.length);		//jmo - Buffer bug on empty buffer copy ?	if(buf1.length>0)		buf1.copy(newBuf, 0, 0, buf1.length);		if(buf2.length>0)		buf2.copy(newBuf, buf1.length, 0, buf2.length);	return newBuf;}