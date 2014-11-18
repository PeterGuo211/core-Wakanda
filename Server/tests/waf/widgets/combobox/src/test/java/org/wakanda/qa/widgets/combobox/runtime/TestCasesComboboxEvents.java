package org.wakanda.qa.widgets.combobox.runtime;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.apache.commons.lang.StringUtils;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.common.Paths;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesComboboxEvents extends SeleniumRuntimeTemplate {
	
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
	    Paths.solutionRelativePath = "/solutions/widgetEvents/widgetEvents.waSolution";
		AdminCommand.startServer(TestCasesComboboxEvents.class,Paths.solutionRelativePath);
	}
   
    @Before
    public void beforeTest(){
	selenium.getDriver().get("http://127.0.0.1:8081/comboboxEvents.html");
	selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
    }
    //------------------------------------------------------------------------
    // Desktop Events
    //------------------------------------------------------------------------
    
    @Test
    public void testCombobox_onBlur() throws InterruptedException
    {
	JavascriptExecutor js = selenium.getJsConsole();
	Thread.sleep(500);
	js.executeScript("$('.ui-autocomplete-input').simulate('blur');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	Thread.sleep(500);
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "blur"));
    }
    
    @Test
    public void testCombobox_onFocus() throws InterruptedException
    {
	JavascriptExecutor js = selenium.getJsConsole();
	js.executeScript("$('.ui-autocomplete-input').simulate('focus');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "focus"));
    }
    
    @Ignore 
    // Aucune solution viable n'a encore était trouvé avec une simulation de click
    public void testCombobox_onChange() throws InterruptedException
    {
	JavascriptExecutor js = selenium.getJsConsole();
	js.executeScript("$$('combobox1').setValue(2);");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "change"));
    }
    
    @Test
    public void testCombobox_onChange_withAPI() throws InterruptedException
    {
	JavascriptExecutor js = selenium.getJsConsole();
	js.executeScript("$$('combobox1').setValue(2);");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "change"));
    }
    
    @Test
    public void testCombobox_onClick() throws InterruptedException
    {
	JavascriptExecutor js = selenium.getJsConsole();
	js.executeScript("$('.ui-autocomplete-input').simulate('click');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
    }
    
    @Test
    public void testCombobox_onMouseDown() throws InterruptedException
    {
	JavascriptExecutor js = selenium.getJsConsole();
	js.executeScript("$('#combobox1').simulate('mousedown');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
    }
    
    @Test
    public void testCombobox_onMouseMove() throws InterruptedException
    {
	JavascriptExecutor js = selenium.getJsConsole();
	js.executeScript("$('#combobox1').simulate('mousemove');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousemove"));
    }
    
    @Test
    public void testCombobox_onMouseOut() throws InterruptedException
    {
	JavascriptExecutor js = selenium.getJsConsole();
	js.executeScript("$('#combobox1').simulate('mouseout');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals( 1, StringUtils.countMatches(stack, "mouseout"));
    }
    
    @Test
    public void testCombobox_onMouseOver() throws InterruptedException
    {
	JavascriptExecutor js = selenium.getJsConsole();
	js.executeScript("$('#combobox1').simulate('mouseover');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
    }
    
    @Test
    public void testCombobox_onMouseUp() throws InterruptedException
    {
	JavascriptExecutor js = selenium.getJsConsole();
	js.executeScript("$('#combobox1').simulate('mouseup');");
	Thread.sleep(500);
	
	String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "onmouseup"));
    }
}
