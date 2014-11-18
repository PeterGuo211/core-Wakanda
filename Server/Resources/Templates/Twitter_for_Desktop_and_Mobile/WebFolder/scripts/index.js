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

WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var dataGrid1 = WAF.namespace("Mobile Project.index.dataGrid1.events");	// @dataGrid
	var documentEvent = WAF.namespace("Mobile Project.index.documentEvent.events");	// @document
// @endregion// @endlock

// eventHandlers// @lock

	$("#image0").html('<img src=""/>');

	dataGrid1.onRowClick = function dataGrid1_onRowClick (event)// @startlock
	{// @endlock

		twitterQuery( source.accounts.getCurrentElement().name.value );
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		ds.Accounts.query("ID!==0", { onSuccess: 
			function(event){ 
				event.entityCollection.getEntity(0, { 
					onSuccess: function(event){ 
						twitterQuery( event.entity.name.value ); 
					},
					onError: function(event){ 
  						$("#image1").hide();
						alert("Please add a valid Twitter account !");
					} 
				}); 
			}
		});
		
	};// @lock
	
	
	
// @region eventManager// @startlock
	WAF.addListener("dataGrid1", "onRowClick", dataGrid1.onRowClick, "WAF");
	WAF.addListener("documentEvent", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock


