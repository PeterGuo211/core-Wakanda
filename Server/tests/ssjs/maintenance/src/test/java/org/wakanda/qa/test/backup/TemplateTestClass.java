package org.wakanda.qa.test.backup;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;


public class TemplateTestClass {
	
	public static enum FileSelector {
		 root,  solution, imageCurrentBrowser, project;
		    }
	
	
	public static String getOS() {
		return System.getProperty("os.name").substring(0, 3);
	}
	
	public String getFileFromRessources(String file, FileSelector selector)
			    throws IOException, URISyntaxException {
			 String parentFolder = getFolderFromRessources(selector);
			 String result = null;
			 if (parentFolder != null) {
			     // File fic = new File(parentFolder, file);
			     if (selector.equals(FileSelector.solution))
			  result = new File(parentFolder, file).getCanonicalPath();
			     else
			  result = parentFolder + "/" + file;
			     // System.out.println("*************"+result);
			     //
			 }
			 return result;
			 
			    }
			public String getFolderFromRessources(FileSelector selector)
			    throws IOException, URISyntaxException {
			 // Yann : Ca pourrait être calculé une fois et enregistré dans une
			 // variable.
			 String result = null;
			 switch (selector) {
			     case root:
			  /*
			   * File fic = new File(getClass().getResource(
			   * Utils.getOS()).toURI()); result = fic.getCanonicalPath();
			   */
//			     case project:
//			    	 URL url = getClass().getResource("solutions");
//					  File fic = new File(url.toURI());
//					  
//					  result = fic.getCanonicalPath();
//			    	 
			    	 
			   
			  
			  break;
			
			     case solution:
			  // URL url = getClass().getResource("solutions");
			  // if (url == null)
			  // return null;
			  // URI uri = url.toURI();
			  // fic = new File(uri);
			  URL url = getClass().getResource("solutions");
			  File fic = new File(url.toURI());
			  
			  result = fic.getCanonicalPath();
			  break;
			  
			 }
			 return result;
			    }
}
