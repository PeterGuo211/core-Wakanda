/**

* @author soufiane.tigrioui@4d.com

*/


    var testCase = {
    	name: "Test of MIME Message API",
	    _getMimeMessage: function(){
	 		var mimeWriter = new MIMEWriter();
			var blob = new Blob( 20 , 88, "application/octet-stream"); 
			var photo = loadImage((getFolder("path")+"logo.png").toString());
			mimeWriter.addPart ("this is just a plain text", "TXT00", 'text/plain');
			mimeWriter.addPart (photo, "IMG00", 'image/png');
			mimeWriter.addPart (blob,"BLB00",'application/octet-binary');
			var mimeMessage = mimeWriter.getMIMEMessage();

			return mimeMessage;
    			
    	},
    	
   /**
    * SSJS-MIMEMESSAGE-1 Check that "count" returns the expected value
    */
    	
       testThatCountAttributeReturnsTheExpectedValue: function() {
		var countActualValue = this._getMimeMessage().count;
		var countExpectedValue = 3; // a text, an image and a blob
		Y.Assert.areSame(countExpectedValue,countActualValue);	
  	
  	},
  	
   /**
    * SSJS-MIMEMESSAGE-2 Check that "length" returns the expected value
    */
    	
       testThatLengthAttributeReturnsTheExpectedValue: function() {
		var lengthActualValue = this._getMimeMessage().length;
		var lengthExpectedValue = 3; // a text, an image and a blob
		Y.Assert.areSame(lengthExpectedValue,lengthActualValue);	
  	
  	},
  	
  	/**
    * SSJS-MIMEMESSAGE-3 Check that "encoding" returns the expected value  
    */
   /************ à VOIR ******************/ 
       testThatEncodingAttributeReturnsTheExpectedValue: function() {
		var encodingActualValue = this._getMimeMessage().encoding;
		var encodingExpectedValue1 = "application/x-www-form-urlencoded";
        var encodingExpectedValue2 = "multipart/form-data"; // a text, an image and a blob
		
				Y.Assert.areSame(encodingExpectedValue1,encodingActualValue);	
  				
  	}	
    }
    
    
   // require('unitTest').run(testCase).getReport()
