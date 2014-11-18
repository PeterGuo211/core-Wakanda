/**

* @author soufiane.tigrioui@4d.com

*/

var testCase = {
	name: "Test MIME Writer",
    /**
     * SSJS-MIMEWRITER-1 Check that MIMEWriter class exists
     */
    testMIMEWriterClassExists: function() {
        Y.Assert.isNotUndefined(MIMEWriter);
        Y.Assert.areSame("function", typeof MIMEWriter);
    },	
    
    /**
     * SSJS-MIMEWRITER-2 Check that MIMEWriter constructor returns an object of type MIMEWriter
     */
    testMIMEWriterConstructorExists: function() {
    	var mimeWriter = new MIMEWriter();
        Y.Assert.isNotUndefined(mimeWriter);
        Y.Assert.areSame("object", typeof mimeWriter);
        Y.Assert.isClassOf("MIMEWriter", mimeWriter);
    },
    
    /**
     * SSJS-MIMEWRITER-3 Check that addParts method exists
     */
    testAddPartsMethodExists: function() {
    	 var mimeWriter = new MIMEWriter();
        Y.Assert.isNotUndefined(mimeWriter.addPart);
        Y.Assert.areSame("function", typeof mimeWriter.addPart);
    },
    
    /**
    * SSJS-MIMEWRITER-4 Check that getMIMEBoundary method exists
    */
  testgetMIMEBoundaryMethodExists: function() {
  		var mimeWriter = new MIMEWriter();
  		Y.Assert.isNotUndefined(mimeWriter.getMIMEBoundary);
  		Y.Assert.areSame("function", typeof mimeWriter.getMIMEBoundary);
  	
  	},
  	
  	/**
    * SSJS-MIMEWRITER-5 Check that getMIMEMessage method exists
    */
      testgetMIMEMessageExists: function() {
  		var mimeWriter = new MIMEWriter();
  		Y.Assert.isNotUndefined(mimeWriter.getMIMEMessage);
  		Y.Assert.areSame("function", typeof mimeWriter.getMIMEMessage);
  	
  	},
  	
  	  	/**
    * SSJS-MIMEWRITER-6 Check getMIMEMessage Method logic
    */
      testgetMIMEMessageMethodLogic: function() {
		var mimeWriter = new MIMEWriter();
		mimeWriter.addPart ("this is just a plain text", "TXT", 'text/plain');

		var mimeMessage = mimeWriter.getMIMEMessage();
		Y.Assert.isClassOf("MIMEMessage", mimeMessage);
  	},
  	
  	
  	/**
  	* SSJS-MIMEWRITER-7 Check addPart accept type text
  	*/
  	
  	  testAddPartAcceptDataOfTypeText: function(){
		var mimeWriter = new MIMEWriter();
		mimeWriter.addPart ("this is just a plain text", "TXT", 'text/plain');
		var mimeMessage = mimeWriter.getMIMEMessage();
        
		Y.Assert.isClassOf("MIMEMessagePart",mimeMessage[0]);

  	  },
  	
  	/**
  	* SSJS-MIMEWRITER-8 Check addPart accept type image
  	*/
  	
  	  	 testAddPartAcceptDataOfTypeImage: function(){
		var mimeWriter = new MIMEWriter();
		var photo = loadImage((getFolder("path")+"logo.png").toString());
		mimeWriter.addPart (photo, "IMG", 'image/png');
		var mimeMessage = mimeWriter.getMIMEMessage();
        
		Y.Assert.isClassOf("MIMEMessagePart",mimeMessage[0]);

  	  },
  	
   	/**
    * SSJS-MIMEWRITER-9 Check addPart Method logic
    */
      testAddPartMethodLogic: function() {
		var mimeWriter = new MIMEWriter();
		var photo = loadImage((getFolder("path")+"logo.png").toString());
		mimeWriter.addPart ("Look at these beautiful flowers\r\n", "TXT", 'text/plain');
		mimeWriter.addPart (photo, "IMG", 'image/png');
		var mimeMessage = mimeWriter.getMIMEMessage();

		var msgpart = mimeMessage[1];
		Y.Assert.isClassOf("MIMEMessagePart", mimeMessage[0]);
		Y.Assert.isClassOf("MIMEMessagePart", mimeMessage[1]);
  	
  	}
  	
  	
  	

  	
};

//require('unitTest').run(testCase).getReport()