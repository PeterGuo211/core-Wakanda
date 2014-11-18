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
exports.mySQLClose =  function (mysqlConnection){
	
	var COM_QUIT = 0x01;//
	
	if(typeof mysqlConnection == "undefined")
		return false;

	var isClosed = true;
	
//	Create close packet 
	
	function sendMysqlClose (){

		var sendClose= new Buffer(5);
		var index = 0;
		sendClose.writeUInt32LE(1,index);
		index += 4;
		sendClose.writeUInt8(COM_QUIT,index);		

		return sendClose;
	}
	
//  get Ok or Error packet, making sure that the connection is closed.
	
	 function getMysqlClose (data){ 
		
		if(data.toString('ascii') === "false")
            isClosed = false;
		
	}

//Listening to close response
	mysqlConnection.end();
	//mysqlConnection.write(sendMysqlClose());
	//getMysqlClose(mysqlConnection.read());
	
	return isClosed;

};
