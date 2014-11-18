package org.wakanda.qa.widgets.container.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.wakanda.common.server.AdminCommand.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesContainerAPI extends SeleniumRuntimeTemplate {
    
	/*@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		Paths.solutionRelativePath = "/solutions/WidgetsAPI/WidgetsAPI.waSolution";
		String solutionPath = getResourcePath(TestCasesContainerEvents.class, Paths.solutionRelativePath);

		logger.info(solutionPath);
		//serverProcess = startServer(solutionPath);
		startServer(TestCasesContainerAPI.class, "/solutions/WidgetsAPI/WidgetsAPI.waSolution");
		//startServer(TestCasesContainerAPI.class, "/solutions/WidgetsAPI/WidgetsAPI.waSolution");
		//startServer(TestCasesContainerAPI.class, "/solutions/WidgetsAPI/WidgetsAPI.waSolution");
	}
	*/
	
	@BeforeClass
	public static void beforeTestSuite() throws URISyntaxException, IOException{
		startServer(TestCasesContainerAPI.class, "/solutions/WidgetsAPI/WidgetsAPI.waSolution");
	}
	
	
    @Before
    public void beforeTest(){
	selenium.getDriver().get("http://127.0.0.1:8081/containerAPI.html");
	//waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
    }
    //------------------------------------------------------------------------
    // Specific API
    //------------------------------------------------------------------------
    
    @Test
    public void testContainer_getSplitPosition() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("getSplitPosition")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("96", myResult);
    }
    
    //@Test
    public void testContainer_setSplitPosition() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setSplitPosition")).click();
	selenium.getDriver().findElement(By.id("getSplitPosition")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("50", myResult);
    }
    
    @Test
    public void testContainer_collapseSplitter() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("collapseSplitter")).click();
	selenium.getDriver().findElement(By.id("getSplitPosition")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("0", myResult);
    }
    
    @Test
    public void testContainer_expandSplitter() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("collapseSplitter")).click();
	selenium.getDriver().findElement(By.id("expandSplitter")).click();
	selenium.getDriver().findElement(By.id("getSplitPosition")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("96", myResult);
    }
    
    @Test
    public void testContainer_toggleSplitter() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("toggleSplitter")).click();
	selenium.getDriver().findElement(By.id("getSplitPosition")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("0", myResult);
    }
    
    @Test
    public void testContainer_toggleSplitter_back() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("toggleSplitter")).click();
	selenium.getDriver().findElement(By.id("toggleSplitter")).click();
	selenium.getDriver().findElement(By.id("getSplitPosition")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("96", myResult);
    }
    
    //------------------------------------------------------------------------
    // Generic API
    //------------------------------------------------------------------------
    
    @Test
    public void testContainer_hide() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("hide")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("container1")).getCssValue("display");
	assertEquals("none", myResult);
    }
    
    @Test
    public void testContainer_show() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("hide")).click();
	selenium.getDriver().findElement(By.id("show")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("container1")).getCssValue("display");
	assertEquals("block", myResult);
    }
    
    @Test
    public void testContainer_toggle() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("toggle")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("container1")).getCssValue("display");
	assertEquals("none", myResult);
    }
    
    @Test
    public void testContainer_toggle_back() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("toggle")).click();
	selenium.getDriver().findElement(By.id("toggle")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("container1")).getCssValue("display");
	assertEquals("block", myResult);
    }
    
    @Test
    public void testContainer_addClass() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("addClass")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("container1")).getAttribute("className").contains("toto");
	assertEquals(true, myResult);
    }
    
    @Test
    public void testContainer_removeClass() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("addClass")).click();
	selenium.getDriver().findElement(By.id("removeClass")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("container1")).getAttribute("className").contains("toto");
	assertEquals(false, myResult);
    }
    
    @Test
    public void testContainer_move() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("move")).click();
	Thread.sleep(500);
	
	WebElement myElement = selenium.getDriver().findElement(By.id("container1"));
	assertEquals("0px", myElement.getCssValue("top"));
	assertEquals("0px", myElement.getCssValue("left"));
    }
    
    @Test
    public void testContainer_resize_smaller() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("resize_smaller")).click();
	Thread.sleep(500);
	
	WebElement myElement = selenium.getDriver().findElement(By.id("container1"));
	assertEquals("50", myElement.getAttribute("offsetWidth"));
	assertEquals("50", myElement.getAttribute("offsetHeight"));
    }
    
    @Test
    public void testContainer_resize_bigger() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("resize_bigger")).click();
	Thread.sleep(500);
	
	WebElement myElement = selenium.getDriver().findElement(By.id("container1"));
	assertEquals("300", myElement.getAttribute("offsetWidth"));
	assertEquals("300", myElement.getAttribute("offsetHeight"));
    }
    
    @Test
    public void testContainer_setWidth() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setWidth")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("container1")).getAttribute("offsetWidth");
	assertEquals("100", myResult);
    }
    
    @Test
    public void testContainer_getWidth() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("getWidth")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("200", myResult);
    }
    
    @Test
    public void testContainer_setHeight() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setHeight")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("container1")).getAttribute("offsetHeight");
	assertEquals("100", myResult);
    }
    
    @Test
    public void testContainer_getHeight() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("getHeight")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("200", myResult);
    }
    
    @Test
    public void testContainer_setLeft() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setLeft")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("container1")).getAttribute("offsetLeft");
	assertEquals("100", myResult);
    }
    
    @Test
    public void testContainer_setRight() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setRight")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("container1")).getCssValue("right");
	assertEquals("100px", myResult);
    }
    
    @Test
    public void testContainer_setTop() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setTop")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("container1")).getAttribute("offsetTop");
	assertEquals("100", myResult);
    }
    
    @Test
    public void testContainer_setBottom() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setBottom")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("container1")).getCssValue("bottom");
	assertEquals("100px", myResult);
    }
    
    @Test
    public void testContainer_getPosition() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("getPosition")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("container1")).getAttribute("innerHTML").contains("undefined");
	assertEquals(false, myResult);
    }
    
    @Test
    public void testContainer_destroy() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("destroy")).click();
	Thread.sleep(500);
	
	try{
	    selenium.getDriver().findElement(By.id("container1"));
	    assertTrue(false);
	}catch(Exception e){}
    }
    
    @Test
    public void testContainer_disable() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("disable")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("textField5")).isEnabled();
	assertEquals(false, myResult);
	
	Boolean myResult2 = selenium.getDriver().findElement(By.id("textField6")).isEnabled();
	assertEquals(false, myResult2);
    }
    
    @Test
    public void testContainer_enable() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("disable")).click();
	selenium.getDriver().findElement(By.id("enable")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("textField5")).isEnabled();
	assertEquals(true, myResult);
	
	Boolean myResult2 = selenium.getDriver().findElement(By.id("textField6")).isEnabled();
	assertEquals(true, myResult2);
    }
    
 
    @Test
    public void testContainer_setBackgroundColor() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setBackgroundColor")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("container1")).getCssValue("background-color").replaceAll("\\s","");
	assertEquals("rgba(101,0,146,1)", myResult);
    }
    
    @Test
    public void testContainer_setTextColor() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setTextColor")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("container1")).getCssValue("color").replaceAll("\\s","");
	assertEquals("rgba(101,0,146,1)", myResult);
    }
    
    @Test
    public void testContainer_setParent() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setParent")).click();
	Thread.sleep(500);
	
	selenium.getDriver().findElement(By.id("richText1")).findElement(By.id("container1"));
    }
    
    @Test
    public void testContainer_getParent() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setParent")).click();
	selenium.getDriver().findElement(By.id("getParent")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("richText1", myResult);
    }
    
    @Test
    public void testContainer_setErrorDiv() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setErrorDiv")).click();
	selenium.getDriver().findElement(By.id("setErrorMessage")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
	assertEquals(true, myResult);
    }
    
    @Test
    public void testContainer_getErrorDiv() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setErrorDiv")).click();
	selenium.getDriver().findElement(By.id("getErrorDiv")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
	assertEquals(true, myResult);
    }
    
    @Test
    public void testContainer_setErrorMessage() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setErrorDiv")).click();
	selenium.getDriver().findElement(By.id("setErrorMessage")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
	assertEquals(true, myResult);
    }
    
    @Test
    public void testContainer_clearErrorMessage() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setErrorDiv")).click();
	selenium.getDriver().findElement(By.id("setErrorMessage")).click();
	selenium.getDriver().findElement(By.id("clearErrorMessage")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
	assertEquals(false, myResult);
    }
    
    @Ignore
    public void testContainer_clear() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setValue_true")).click();
	selenium.getDriver().findElement(By.id("clear")).click();
	selenium.getDriver().findElement(By.id("getValue")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals(false, myResult);
    }
    
    @Ignore
    public void testContainer_setLabelText() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setLabelText")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("label1")).getAttribute("innerHTML");
	assertEquals("toto", myResult);
    }
    
    @Ignore
    public void testContainer_setLabelTextColor() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setLabelTextColor")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
	assertEquals("rgba(101,0,146,1)", myResult);
    }
    
    
}
