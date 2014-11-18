/**

* @author soufiane.tigrioui@4d.com

*/


    var testCase = {
    	name: "Test of MIME Message Part API",
    	_getMimeMessagePart: function(type){
     		var mimeWriter = new MIMEWriter();
    		var blob = new Blob( 20 , 88, "application/octet-stream"); 
    		var photo = loadImage((getFolder("path")+"logo.png").toString());
    		mimeWriter.addPart ("this is just a plain text", "TXT00", 'text/plain');
			mimeWriter.addPart (photo, "IMG00", 'image/png');
			mimeWriter.addPart (blob,"BLB00",'application/octet-binary');
			var mimeMessage = mimeWriter.getMIMEMessage();

					if(type=="text"){
						return mimeMessage[0];
					}
					if(type=="image"){
						return mimeMessage[1];
					}
					if(type=="blob"){
						return mimeMessage[2];
					}

    			
    	},

    	
    	
   	/**
    * SSJS-MIMEMESSAGEPART-1 Check that "asText" returns the expected value
    */
    	
       testThatAsTextAttributeReturnsTheRightValue: function() {
		var message = this._getMimeMessagePart("text").asText;
		Y.Assert.areSame("this is just a plain text",message);	
  	
  	},
  	
  	/**
    * SSJS-MIMEMESSAGEPART-2 Check that "asPicture" returns the expected value
    */
  	
  	    testThatAsPictureAttributeReturnsTheRightValue: function() {
  	    
  	    if(os.isWindows || os.isMac) 
  	    {
			var message = this._getMimeMessagePart("image").asPicture;
			var photo = loadImage((getFolder("path")+"logo.png").toString());
			Y.Assert.areSame(photo.length,message.length);	
			Y.Assert.areSame(photo.width,message.width);
			Y.Assert.areSame(photo.size,message.size);
			Y.Assert.areSame(photo.height,message.height);
		}
		
		else{
		
		}
		
  	},
  	
  	/**
    * SSJS-MIMEMESSAGEPART-3 Check that "asBlob" returns the expected value
    */
  	
  	    testThatAsBlobAttributeReturnsTheRightValue: function() {
		var message = this._getMimeMessagePart("blob").asBlob;
    	var blob = new Blob( 20 , 88, "application/octet-stream"); 		
    	Y.Assert.areSame(blob.size,message.size);	
		Y.Assert.areSame(blob.type,message.type);
	
		
  	},
  	
  	/**
    * SSJS-MIMEMESSAGEPART-4 Check that mediaType attribute returns the right value
    */
    testThatMediaTypeAttributeReturnsTheRightValue: function() {
 	    var mediatTypeText = this._getMimeMessagePart("text").mediaType;
		var mediaTypeImage = this._getMimeMessagePart("image").mediaType;
		var mediaTypeBlob = this._getMimeMessagePart("blob").mediaType;
		
		Y.Assert.areSame("text/plain",mediatTypeText);
		Y.Assert.areSame("image/png",mediaTypeImage);
		Y.Assert.areSame("application/octet-binary",mediaTypeBlob);
    },
    
    
    /**
    * SSJS-MIMEMESSAGEPART-5 Check that name attribute returns the right value
    */
    
        testThatNameAttributeReturnsTheRightValue: function() {
 	    var nameText = this._getMimeMessagePart("text").name;
		var nameImage = this._getMimeMessagePart("image").name;
		var nameBlob = this._getMimeMessagePart("blob").name;
		
		Y.Assert.areSame("TXT00",nameText);
		Y.Assert.areSame("IMG00",nameImage);
		Y.Assert.areSame("BLB00",nameBlob);
    },
    
       /**
    * SSJS-MIMEMESSAGEPART-6 Check that size attribute returns the right value when MIMEMessagePart is of type text
    */
    
        testThatSizeAttributeReturnsTheRightValueWhenMimeMessagePartIsOfTypeText: function() {
 	    var textActualSize = this._getMimeMessagePart("text").size;
		var textExpectedSize = "this is just a plain text".length;
		
		Y.Assert.areSame(textExpectedSize,textActualSize);

    },
    
    /**
    * SSJS-MIMEMESSAGEPART-7 Check that size attribute returns the right value when MIMEMessagePart is of type image
    */
    
        testThatSizeAttributeReturnsTheRightValueWhenMimeMessagePartIsOfTypeImage: function() {
        if(os.isWindows || os.isMac){
	 	    var photoActualSize = this._getMimeMessagePart("image").size;
			var photoExpectedSize = loadImage((getFolder("path")+"logo.png").toString()).size;
			Y.Assert.areSame(photoExpectedSize,photoActualSize);
		}
		else{
		}

    },
    
	/**
    * SSJS-MIMEMESSAGEPART-8 Check that size attribute returns the right value when MIMEMessagePart is of type blob
    */
            testThatSizeAttributeReturnsTheRightValueWhenMimeMessagePartIsOfTypeBlob: function() {
 	    var blobActualSize = this._getMimeMessagePart("blob").size;
    	var blobExcpectedSize = (new Blob( 20 , 88, "application/octet-stream")).size; 
		
		Y.Assert.areSame(blobExcpectedSize,blobActualSize);

    }

    
    }
    
    
    require('unitTest').run(testCase).getReport()