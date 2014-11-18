package org.wakanda.wastudio.text.runtime;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.apache.commons.lang.StringUtils;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesTextEvents extends SeleniumRuntimeTemplate {

	 
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		/*Paths.solutionRelativePath = "/solutions/widgetsEvents/widgetsEvents.waSolution";
		String solutionPath = getResourcePath(TestCasesTextEvents.class, Paths.solutionRelativePath);

		logger.info(solutionPath);
		serverProcess = startServer(solutionPath);*/
		
		AdminCommand.startServer(TestCasesTextEvents.class, "/solutions/widgetEvents/widgetEvents.waSolution");

	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	//@Test
	public void testText_onClick() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/textEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#richText1').simulate('click');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}

}
