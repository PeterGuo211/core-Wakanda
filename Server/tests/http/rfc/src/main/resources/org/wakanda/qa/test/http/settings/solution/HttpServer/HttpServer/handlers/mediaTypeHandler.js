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

* @author Ouissam

*/

function checkMultipart(request, response){
	//check the multipart parsing
	var result;
 
	result =  request.parts.count;
	result = result + '\n' + request.parts.encoding;
	result = result + '\n' + request.parts.boundary;
 
 	//file part
 	var i = 0;	
   	result = result + '\n' + request.parts[i].name;
    result = result + '\n' + request.parts[i].fileName;
    result = result + '\n' + request.parts[i].mediaType;
    result = result + '\n' + request.parts[i].size;
 
 	//save the file for further tests from the client side
    request.parts[i].save(getFolder("path") + "WebFolder/", true);

	//text part
 	i = 1;	
   	result = result + '\n' + request.parts[i].name;
    result = result + '\n' + request.parts[i].fileName;
    result = result + '\n' + request.parts[i].mediaType;
    result = result + '\n' + request.parts[i].size;
    result = result + '\n' + request.parts[i].asText;
 
	return result;
}