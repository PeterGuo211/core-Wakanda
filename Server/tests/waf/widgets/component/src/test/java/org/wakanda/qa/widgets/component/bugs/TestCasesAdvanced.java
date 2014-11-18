package org.wakanda.qa.widgets.component.bugs;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;


import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.Paths;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesAdvanced extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeTestSuite() throws URISyntaxException, IOException{
		Paths.solutionRelativePath = "/solutions/BugComp/BugComp Solution/BugComp.waSolution";
		AdminCommand.startServer(TestCasesAdvanced.class, Paths.solutionRelativePath);
	}

	@Test
	public void testComponent_WAK0087940() throws InterruptedException{
		selenium.getDriver().get("http://127.0.0.1:8081/WAK0087940/");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.tagName("body"), 5);
		
		selenium.getDriver().findElement(By.id("button1")).click();
		Thread.sleep(500);
		selenium.getDriver().findElement(By.id("button1")).click();
		Thread.sleep(500);
		
		Boolean isDisplayed =  selenium.getDriver().findElement(By.id("component1_button1")).isDisplayed();
		assertEquals(true, isDisplayed);
	}
	
	@Test
	public void testComponent_WAK0088057(){
		selenium.getDriver().get("http://127.0.0.1:8081/WAK0088057/");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.tagName("body"), 5);
		
		Boolean widget_isDisplayed = selenium.getDriver().findElement(By.id("waGage1")).isDisplayed();
		Boolean widgetInComp_isDisplayed = selenium.getDriver().findElement(By.id("component1_waGage1")).isDisplayed();
		
		String result = widget_isDisplayed +" "+widgetInComp_isDisplayed;
		assertEquals("true true", result);
	}
	
	@Test
	public void testComponent_WAK0086336() throws InterruptedException{
		selenium.getDriver().get("http://127.0.0.1:8081/WAK0086336/");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.tagName("body"), 5);
		
		selenium.getDriver().findElement(By.id("button1")).click();
		Thread.sleep(500);
		
		Boolean isDisplayed = selenium.getDriver().findElement(By.id("component1_richText1")).isDisplayed();
		assertEquals(true, isDisplayed);
	}
	
	@Test
	public void testComponent_WAK0087717(){
		selenium.getDriver().get("http://127.0.0.1:8081/WAK0087717/");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.tagName("body"), 5);
		
		Boolean widget1_isDisplayed = selenium.getDriver().findElement(By.id("component1_waGage1")).isDisplayed();
		Boolean widget2_isDisplayed = selenium.getDriver().findElement(By.id("component1_waGage1")).isDisplayed();
		
		String result = widget1_isDisplayed +" "+widget2_isDisplayed;
		assertEquals("true true", result);
		
	}
	
	@Test
	public void testComponent_isGridLoaded(){
		selenium.getDriver().get("http://127.0.0.1:8081/isGridLoaded/");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.tagName("body"), 5);
		
		Boolean isDisplayed = selenium.getDriver().findElement(By.id("component1_dataGrid1")).isDisplayed();
		assertEquals(true, isDisplayed);
		
	}
}
