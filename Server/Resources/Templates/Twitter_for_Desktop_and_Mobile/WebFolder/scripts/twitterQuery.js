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
* all about managing the Twitter data (fetch, display...)
*/


var twitData;
var i = 0;

/**
 * Fetch the current twits from the given account name. 
 **/
function twitterQuery ( accountName ) {
	
	i = 0;
	twitData= null;
	
	//just show the loader
	$("#image1").show();
	
	$.getJSON("http://api.twitter.com/1/statuses/user_timeline.json?screen_name="+accountName+"&callback=?",
  		{
    		format: "json"
  		},
  		function(data) {
  			twitData = data; 
  			//clean the ds
       		ds.News.removeAll(
    				{ 'onSuccess': populateSource }
    			);
  		});	

};

/**
 * Populate the source "news" with the fetched twits and update the matrix.
 **/
function populateSource() {
	
	var elem,
		usr;

	elem = new WAF.Entity ( ds.News );
    elem.content.setValue( twitData[i].text ); 
    if( i == twitData.length-1 ) {
        elem.save({
         'onSuccess': function(){
         	
         		usr = twitData[i].user;
         		$("#image0").find("img").get()[0].src = usr.profile_image_url;
         		$("#richText1").css("color", "#"+usr.profile_text_color).get()[0].textContent = twitData[i].user.name;
         		$("body").css("background-color", "#"+usr.profile_background_color)
         				 .css("background-image", "url("+usr.profile_background_image_url+")");
         		
         		source.news.query("ID!==0", { 'onSuccess': 
         													function(event) {
             										
             											    	var cont = $(".twitContent");
         														for ( var k=0; k<cont.length; k++ ) {
         															cont[k].innerHTML = addTwitterLinks ( cont[k].textContent ) ;
         														}
         														cont.find("a").css("color", "#"+usr.profile_link_color);
         														$("#image1").hide();
         															
             												}
             							});
         	}
         } 
     	);
         	
      }else{
         i++;
         elem.save({
         	'onSuccess': function(){
         		populateSource();
         	}
         });
      }
};

/**
 * add all the links leading to Twitter web site depending on the markers (#, @, http)
 **/
function addTwitterLinks(inputText) {

	var result, rep1, rep2, rep3, rep4;

	rep1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	result = inputText.replace(rep1, '<a href="$1" target="_blank">$1</a>');

	rep2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
	result = result.replace(rep2, '$1<a href="http://$2" target="_blank">$2</a>');

	rep5 = /#([-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	replacedText = result.replace(rep5, '<a href="https://www.twitter.com/search/$1" target="_blank">#$1</a>');
																					
	rep4 = /@([-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	result = result.replace(rep4, '<a href="http://www.twitter.com/$1" target="_blank">@$1</a>');

	return result;
};