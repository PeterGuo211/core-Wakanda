/**
 * 
 */
package org.wakanda.qa.test.dataperm;

import org.wakanda.qa.commons.server.ut.DefaultBehavior;
import org.wakanda.qa.test.dataperm.settings.Configuration;


public class RunServer {
	
	public static void main(String[] args) throws InterruptedException {
		DefaultBehavior.doWhenTestRunStarted(Configuration.getInstance());
		if(System.getProperty("os.name").equals("Linux")){
			Thread.sleep(30000);
		}
		else{
			Thread.sleep(10000);
		}
		
	}
	
}
