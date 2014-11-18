package org.wakanda.qa.widgets.combobox.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.wakanda.common.Paths;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesComboboxAPI extends SeleniumRuntimeTemplate {
    
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
	    Paths.solutionRelativePath = "/solutions/WidgetsAPI/WidgetsAPI.waSolution";
		AdminCommand.startServer(TestCasesComboboxAPI.class,Paths.solutionRelativePath);
	}
    @Before
    public void beforeTest(){
	selenium.getDriver().get("http://127.0.0.1:8081/comboboxAPI.html");
	selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
    }
    
    //------------------------------------------------------------------------
    // Specific API
    //------------------------------------------------------------------------
    
    @Test
    public void testCombobox_addOption() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("addOption")).click();
	Thread.sleep(500);
	
	String mySelection = selenium.getDriver().findElement(By.xpath("//div[@id='combobox1']/input")).getAttribute("value");
	assertEquals("aaa", mySelection);
	
	String myOption = selenium.getDriver().findElement(By.xpath("//div[@id='combobox1']/select/option[3]")).getAttribute("innerHTML");
	assertEquals("ccc", myOption);
    }
    
    @Test
    public void testCombobox_addSelectedOption() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("addSelectedOption")).click();
	Thread.sleep(500);
	
	String mySelection = selenium.getDriver().findElement(By.xpath("//div[@id='combobox1']/input")).getAttribute("value");
	assertEquals("ccc", mySelection);
	
	String myOption = selenium.getDriver().findElement(By.xpath("//div[@id='combobox1']/select/option[3]")).getAttribute("innerHTML");
	assertEquals("ccc", myOption);
    }
    
    @Test
    public void testCombobox_removeOption() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("removeOption")).click();
	Thread.sleep(500);
	
	String mySelection = selenium.getDriver().findElement(By.xpath("//div[@id='combobox1']/input")).getAttribute("value");
	assertEquals("aaa", mySelection);
	
	// Check if the option is added to option list
	try {
	    selenium.getDriver().findElement(By.xpath("//div[@id='combobox1']/select/option[2]"));
	    assertTrue(true);
	} catch (Exception e) {}
    }
    
    @Test
    public void testCombobox_removeAddedOption() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("addSelectedOption")).click();
	selenium.getDriver().findElement(By.id("removeAddedOption")).click();
	Thread.sleep(500);
	
	String mySelection = selenium.getDriver().findElement(By.xpath("//div[@id='combobox1']/input")).getAttribute("value");
	assertEquals("", mySelection);
	
	// Check if the option is added to option list
	try {
	    selenium.getDriver().findElement(By.xpath("//div[@id='combobox1']/select/option[3]")).getAttribute("innerHTML");
	    assertTrue(true);
	} catch (Exception e) {}
    }
    
    @Test
    public void testCombobox_setValue() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setValue")).click();
	selenium.getDriver().findElement(By.id("getValue")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.xpath("//div[@id='combobox1']/input")).getAttribute("value");
	assertEquals("bbb", myResult);
	
	String myIndex = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("1", myIndex);
    }
    
    @Test
    public void testCombobox_getValue() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("getValue")).click();
	Thread.sleep(500);
	
	String myIndex = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("0", myIndex);
    }
    
    //------------------------------------------------------------------------
    // Generic API
    //------------------------------------------------------------------------
    
    @Test
    public void testCombobox_hide() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("hide")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("combobox1")).getCssValue("display");
	assertEquals("none", myResult);
    }
    
    @Test
    public void testCombobox_show() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("hide")).click();
	selenium.getDriver().findElement(By.id("show")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("combobox1")).getCssValue("display");
	assertEquals("block", myResult);
    }
    
    @Test
    public void testCombobox_toggle() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("toggle")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("combobox1")).getCssValue("display");
	assertEquals("none", myResult);
    }
    
    @Test
    public void testCombobox_toggle_back() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("toggle")).click();
	selenium.getDriver().findElement(By.id("toggle")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("combobox1")).getCssValue("display");
	assertEquals("block", myResult);
    }
    
    @Test
    public void testCombobox_addClass() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("addClass")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("combobox1")).getAttribute("className").contains("toto");
	assertEquals(true, myResult);
    }
    
    @Test
    public void testCombobox_removeClass() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("addClass")).click();
	selenium.getDriver().findElement(By.id("removeClass")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("combobox1")).getAttribute("className").contains("toto");
	assertEquals(false, myResult);
    }
    
    @Test
    public void testCombobox_move() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("move")).click();
	Thread.sleep(500);
	
	WebElement myElement = selenium.getDriver().findElement(By.id("combobox1"));
	assertEquals("0px", myElement.getCssValue("top"));
	assertEquals("0px", myElement.getCssValue("left"));
    }
    
    @Test
    public void testCombobox_resize_smaller() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("resize_smaller")).click();
	Thread.sleep(500);
	
	WebElement myElement = selenium.getDriver().findElement(By.id("combobox1"));
	assertEquals("50", myElement.getAttribute("offsetWidth"));
	assertEquals("50", myElement.getAttribute("offsetHeight"));
    }
    
    @Test
    public void testCombobox_resize_bigger() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("resize_bigger")).click();
	Thread.sleep(500);
	
	WebElement myElement = selenium.getDriver().findElement(By.id("combobox1"));
	assertEquals("300", myElement.getAttribute("offsetWidth"));
	assertEquals("300", myElement.getAttribute("offsetHeight"));
    }
    
    @Test
    public void testCombobox_setWidth() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setWidth")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("combobox1")).getAttribute("offsetWidth");
	assertEquals("100", myResult);
    }
    
    @Test
    public void testCombobox_getWidth() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("getWidth")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("153", myResult);
    }
    
    @Test
    public void testCombobox_setHeight() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setHeight")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("combobox1")).getAttribute("offsetHeight");
	assertEquals("100", myResult);
    }
    
    @Test
    public void testCombobox_getHeight() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("getHeight")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("25", myResult);
    }
    
    @Test
    public void testCombobox_setLeft() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setLeft")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("combobox1")).getAttribute("offsetLeft");
	assertEquals("100", myResult);
    }
    
    @Test
    public void testCombobox_setRight() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setRight")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("combobox1")).getCssValue("right");
	assertEquals("100px", myResult);
    }
    
    @Test
    public void testCombobox_setTop() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setTop")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("combobox1")).getAttribute("offsetTop");
	assertEquals("100", myResult);
    }
    
    @Test
    public void testCombobox_setBottom() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setBottom")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("combobox1")).getCssValue("bottom");
	assertEquals("100px", myResult);
    }
    
    @Test
    public void testCombobox_getPosition() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("getPosition")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("combobox1")).getAttribute("innerHTML").contains("undefined");
	assertEquals(false, myResult);
    }
    
    @Test
    public void testCombobox_destroy() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("destroy")).click();
	Thread.sleep(500);
	
	try{
	    selenium.getDriver().findElement(By.id("combobox1"));
	    assertTrue(false);
	}catch(Exception e){}
    }
    
    @Test
    public void testCombobox_disable() throws InterruptedException
    {
	Thread.sleep(5000);
	selenium.getDriver().findElement(By.id("disable")).click();
	
	
	String myDisplay = selenium.getDriver().findElement(By.tagName("ul")).getCssValue("display");
	assertEquals("none", myDisplay);
    }
    
    @Test
    public void testCombobox_enable() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("disable")).click();
	selenium.getDriver().findElement(By.id("enable")).click();
	selenium.getDriver().findElement(By.xpath("//*[@id='combobox1']/button")).click();
	Thread.sleep(500);
	
	String myDisplay = selenium.getDriver().findElement(By.tagName("ul")).getCssValue("display");
	assertEquals("block", myDisplay);
    }
    
    @Test
    public void testCombobox_getTheme() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("getTheme")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("", myResult);
    }
    
    @Test
    public void testCombobox_setBackgroundColor() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setBackgroundColor")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("combobox1")).getCssValue("background-color").replaceAll("\\s","");
	assertEquals("rgba(101,0,146,1)", myResult);
    }
    
    @Test
    public void testCombobox_setTextColor() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setTextColor")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("combobox1")).getCssValue("color").replaceAll("\\s","");
	assertEquals("rgba(101,0,146,1)", myResult);
    }
    
    @Test
    public void testCombobox_setParent() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setParent")).click();
	Thread.sleep(500);
	
	selenium.getDriver().findElement(By.id("richText1")).findElement(By.id("combobox1"));
    }
    
    @Test
    public void testCombobox_getParent() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setParent")).click();
	selenium.getDriver().findElement(By.id("getParent")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("richText1", myResult);
    }
    
    @Test
    public void testCombobox_setErrorDiv() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setErrorDiv")).click();
	selenium.getDriver().findElement(By.id("setErrorMessage")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
	assertEquals(true, myResult);
    }
    
    @Test
    public void testCombobox_getErrorDiv() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setErrorDiv")).click();
	selenium.getDriver().findElement(By.id("getErrorDiv")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
	assertEquals(true, myResult);
    }
    
    @Test
    public void testCombobox_setErrorMessage() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setErrorDiv")).click();
	selenium.getDriver().findElement(By.id("setErrorMessage")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
	assertEquals(true, myResult);
    }
    
    @Test
    public void testCombobox_clearErrorMessage() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setErrorDiv")).click();
	selenium.getDriver().findElement(By.id("setErrorMessage")).click();
	selenium.getDriver().findElement(By.id("clearErrorMessage")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
	assertEquals(false, myResult);
    }
    
    @Test
    public void testCombobox_clear() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("clear")).click();
	selenium.getDriver().findElement(By.id("getValue")).click();
	Thread.sleep(500);
	
	String myValue = selenium.getDriver().findElement(By.xpath("//div[@id='combobox1']/input")).getAttribute("value");
	assertEquals("", myValue);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("", myResult);
    }
    
    @Test
    public void testCombobox_setLabelText() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setLabelText")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("label1")).getAttribute("innerHTML");
	assertEquals("toto", myResult);
    }
    
    @Test
    public void testCombobox_setLabelTextColor() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setLabelTextColor")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
	assertEquals("rgba(101,0,146,1)", myResult);
    }
    
}
