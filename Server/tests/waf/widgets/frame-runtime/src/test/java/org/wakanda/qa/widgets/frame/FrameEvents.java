package org.wakanda.qa.widgets.frame;


import java.io.IOException;
import java.net.URISyntaxException;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;


public class FrameEvents extends SeleniumRuntimeTemplate{

	@BeforeClass
	public static void beforeTestSuite() throws URISyntaxException, IOException{
	/*	Paths.solutionRelativePath = "/solutions/FrameEvent/FrameEvent Solution/FrameEvent.waSolution";
		String solutionPath = getResourcePath(FrameEvents.class, Paths.solutionRelativePath);

		logger.info(solutionPath);
		serverProcess = startServer(solutionPath);*/
		AdminCommand.startServer(FrameEvents.class, "/solutions/FrameEvent/FrameEvent Solution/FrameEvent.waSolution");
	
	}
	@Before
	public void beforeTest(){
		selenium.getDriver().get("http://127.0.0.1:8081/index");
	}
	@Test
	public void checkOnLoadEvent (){		
		logger.info("get the richText value");
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue();");
		Assert.assertEquals("event should be fired", actual);
		
	}
	

}
