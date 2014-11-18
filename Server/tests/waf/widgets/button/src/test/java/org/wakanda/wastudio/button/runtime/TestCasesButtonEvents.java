package org.wakanda.wastudio.button.runtime;

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

public class TestCasesButtonEvents extends SeleniumRuntimeTemplate{
    
	@BeforeClass
	 public static void beforeTestSuite() throws URISyntaxException, IOException{
	  
		AdminCommand.startServer(TestCasesButtonEvents.class, "/solutions/widgetEvents/widgetEvents.waSolution");
	 }
	
    @Before
    public void beforeTest(){
	logger.info("Opening main page in localhost");
	selenium.getDriver().get("http://127.0.0.1:8081/buttonEvents.html");
	//TestCasesButtonEvents(selenium.getDriver(), By.id("button1"), 5);
    }
    
    //------------------------------------------------------------------------
    // Desktop Events
    //------------------------------------------------------------------------
    
    @Test
    public void testButton_onClick() throws InterruptedException
    {
//	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
//	js.executeScript("$('#button1').simulate('click');");
	selenium.getDriver().findElement(By.id("button1")).click();
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
    }
    
    @Test
    public void testButton_onDoubleClick() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#button1').simulate('dblclick');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "dblclick"));
    }
    
    @Test
    public void testButton_onMouseDown() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#button1').simulate('mousedown');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
    }
    
    @Test
    public void testButton_onMouseOut() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#button1').simulate('mouseout');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
    }
    
    @Test
    public void testButton_onMouseOver() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#button1').simulate('mouseover');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
    }
    
    @Test
    public void testButton_onMouseUp() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#button1').simulate('mouseup');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
    }
    
    //------------------------------------------------------------------------
    // Mobile Events (It does not update the CSS)
    //------------------------------------------------------------------------
    
    @Test
    public void testButton_onTouchStart() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#button1').trigger('touchstart');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "touchstart"));
    }
    
    @Test
    public void testButton_onTouchEnd() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#button1').trigger('touchend');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "touchend"));
    }
    
    @Test
    public void testButton_onTouchCancel() throws InterruptedException
    {
	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	js.executeScript("$('#button1').trigger('touchcancel');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "touchcancel"));
    }
}
