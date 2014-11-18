package org.wakanda.wastudio.text.mixed.component;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.apache.commons.lang.StringUtils;
import org.junit.Before;
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
	
		
		AdminCommand.startServer(TestCasesTextEvents.class, "/solutions/widgetEvents/widgetEvents.waSolution");

	}
	@Before
	public void beforeTest(){
		selenium.getDriver().get("http://127.0.0.1:8081/textEvents.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
	}

    //------------------------------------------------------------------------
    // Desktop Events
    //------------------------------------------------------------------------
    
    @Test
    public void testText_onClick() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#richText1').simulate('click');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText2")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
    }
    
}
