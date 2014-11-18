package org.wakanda.qa.widgets.tabview.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.wakanda.common.Paths;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;
public class TestCasesTabviewAPI extends SeleniumRuntimeTemplate {
    
    @BeforeClass
    public static void beforeTestSuite() throws URISyntaxException, IOException{
	Paths.solutionRelativePath = "/solutions/WidgetsAPI/WidgetsAPI.waSolution";
	AdminCommand.startServer(TestCasesTabviewAPI.class,Paths.solutionRelativePath);
    }
    @Before
    public void beforeUT(){
	selenium.getDriver().get("http://127.0.0.1:8081/tabViewAPI.html");
	selenium.getDriver().navigate().refresh();
	selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("tabView1"), 5);
    }
    
    //------------------------------------------------------------------------
    // Specific API
    //------------------------------------------------------------------------
    
    @Test
    public void testTabview_selectTab() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("selectTab")).click();
	Thread.sleep(500);
	
	Boolean myClass = selenium.getDriver().findElement(By.id("menuItem2")).getAttribute("className").contains("waf-state-selected");
	assertEquals(true, myClass);
    }
    
    @Test
    public void testTabview_addTab_true() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("addTab_true")).click();
	Thread.sleep(500);
	
	Boolean myClass = selenium.getDriver().findElement(By.xpath("//ul[@id='menuBar1']/li[3]")).getAttribute("className").contains("waf-state-selected");
	assertEquals(true, myClass);
	
	selenium.getDriver().findElement(By.xpath("//ul[@id='menuBar1']/li[3]/button"));
    }
    
    @Test
    public void testTabview_addTab_false() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("addTab_false")).click();
	Thread.sleep(500);
	
	Boolean myClass = selenium.getDriver().findElement(By.xpath("//ul[@id='menuBar1']/li[3]")).getAttribute("className").contains("waf-state-selected");
	assertEquals(true, myClass);
	
	try{
	    selenium.getDriver().findElement(By.xpath("//ul[@id='menuBar1']/li[3]/button"));
	    assertTrue(false);
	}catch(Exception e){}
    }
    
    @Test
    public void testTabview_removetab() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("removeTab")).click();
	Thread.sleep(500);
	
	Boolean myClass = selenium.getDriver().findElement(By.id("menuItem2")).getAttribute("className").contains("waf-state-selected");
	assertEquals(true, myClass);
	
	try{
	    selenium.getDriver().findElement(By.id("menuItem1"));
	    assertTrue(false);
	}catch(Exception e){}
    }
    
    @Test
    public void testTabview_countTabs() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("countTabs")).click();
	Thread.sleep(500);
	
	String myClass = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("2", myClass);
    }
    
    @Test
    public void testTabview_getSelectedTab() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("getSelectedTab")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("1", myResult);
	
	String myValue = selenium.getDriver().findElement(By.xpath("//*[@id='menuItem1']/p")).getAttribute("innerHTML");
	assertEquals("My Tab", myValue);
	
	String myClass = selenium.getDriver().findElement(By.id("container1")).getCssValue("background-color").replaceAll("\\s","");
	assertEquals("rgba(153,204,0,1)", myClass);
    }
    
    //------------------------------------------------------------------------
    // Generic API
    //------------------------------------------------------------------------
    
    @Test
    public void testTabview_hide() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("hide")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("tabView1")).getCssValue("display");
	assertEquals("none", myResult);
    }
    
    @Test
    public void testTabview_show() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("hide")).click();
	selenium.getDriver().findElement(By.id("show")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("tabView1")).getCssValue("display");
	assertEquals("block", myResult);
    }
    
    @Test
    public void testTabview_toggle() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("toggle")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("tabView1")).getCssValue("display");
	assertEquals("none", myResult);
    }
    
    @Test
    public void testTabview_toggle_back() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("toggle")).click();
	selenium.getDriver().findElement(By.id("toggle")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("tabView1")).getCssValue("display");
	assertEquals("block", myResult);
    }
    
    @Test
    public void testTabview_addClass() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("addClass")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("tabView1")).getAttribute("className").contains("toto");
	assertEquals(true, myResult);
    }
    
    @Test
    public void testTabview_removeClass() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("addClass")).click();
	selenium.getDriver().findElement(By.id("removeClass")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("tabView1")).getAttribute("className").contains("toto");
	assertEquals(false, myResult);
    }
    
    @Test
    public void testTabview_move() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("move")).click();
	Thread.sleep(500);
	
	WebElement myElement = selenium.getDriver().findElement(By.id("tabView1"));
	assertEquals("0px", myElement.getCssValue("top"));
	assertEquals("0px", myElement.getCssValue("left"));
    }
    
    @Test
    public void testTabview_resize_smaller() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("resize_smaller")).click();
	Thread.sleep(500);
	
	WebElement myElement = selenium.getDriver().findElement(By.id("tabView1"));
	assertEquals("50", myElement.getAttribute("offsetWidth"));
	assertEquals("50", myElement.getAttribute("offsetHeight"));
    }
    
    @Test
    public void testTabview_resize_bigger() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("resize_bigger")).click();
	Thread.sleep(500);
	
	WebElement myElement = selenium.getDriver().findElement(By.id("tabView1"));
	assertEquals("300", myElement.getAttribute("offsetWidth"));
	assertEquals("300", myElement.getAttribute("offsetHeight"));
    }
    
    @Test
    public void testTabview_setWidth() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setWidth")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("tabView1")).getAttribute("offsetWidth");
	assertEquals("100", myResult);
    }
    
    @Test
    public void testTabview_getWidth() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("getWidth")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("358", myResult);
    }
    
    @Test
    public void testTabview_setHeight() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setHeight")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("tabView1")).getAttribute("offsetHeight");
	assertEquals("100", myResult);
    }
    
    @Test
    public void testTabview_getHeight() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("getHeight")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("310", myResult);
    }
    
    @Test
    public void testTabview_setLeft() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setLeft")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("tabView1")).getAttribute("offsetLeft");
	assertEquals("100", myResult);
    }
    
    @Test
    public void testTabview_setRight() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setRight")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("tabView1")).getCssValue("right");
	assertEquals("100px", myResult);
    }
    
    @Test
    public void testTabview_setTop() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setTop")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("tabView1")).getAttribute("offsetTop");
	assertEquals("100", myResult);
    }
    
    @Test
    public void testTabview_setBottom() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setBottom")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("tabView1")).getCssValue("bottom");
	assertEquals("100px", myResult);
    }
    
    @Test
    public void testTabview_getPosition() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("getPosition")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("tabView1")).getAttribute("innerHTML").contains("undefined");
	assertEquals(false, myResult);
    }
    
    @Test
    public void testTabview_destroy() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("destroy")).click();
	Thread.sleep(500);
	
	try{
	    selenium.getDriver().findElement(By.id("tabView1"));
	    assertTrue(false);
	}catch(Exception e){}
    }
    
    @Test
    public void testTabview_disable() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("disable")).click();
	Thread.sleep(500);
	
	Boolean isEnabled = selenium.getDriver().findElement(By.id("textField1")).isEnabled();
	assertEquals(false, isEnabled);
    }
    
    @Test
    public void testTabview_enable() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("disable")).click();
	selenium.getDriver().findElement(By.id("enable")).click();
	Thread.sleep(500);
	
	Boolean isEnabled = selenium.getDriver().findElement(By.id("textField1")).isEnabled();
	assertEquals(true, isEnabled);
    }
    
//    @Test
    public void testTabview_getTheme() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("getTheme")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("inherited default", myResult);
    }
    
    @Test
    public void testTabview_setBackgroundColor() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setBackgroundColor")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("tabView1")).getCssValue("background-color").replaceAll("\\s","");
	assertEquals("rgba(101,0,146,1)", myResult);
    }
    
    @Test
    public void testTabview_setTextColor() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setTextColor")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("tabView1")).getCssValue("color").replaceAll("\\s","");
	assertEquals("rgba(101,0,146,1)", myResult);
    }
    
    @Test
    public void testTabview_setParent() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setParent")).click();
	Thread.sleep(500);
	
	selenium.getDriver().findElement(By.id("richText1")).findElement(By.id("tabView1"));
    }
    
    @Test
    public void testTabview_getParent() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setParent")).click();
	selenium.getDriver().findElement(By.id("getParent")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("richText1", myResult);
    }
    
    @Test
    public void testTabview_setErrorDiv() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setErrorDiv")).click();
	selenium.getDriver().findElement(By.id("setErrorMessage")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
	assertEquals(true, myResult);
    }
    
    @Test
    public void testTabview_getErrorDiv() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setErrorDiv")).click();
	selenium.getDriver().findElement(By.id("getErrorDiv")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
	assertEquals(true, myResult);
    }
    
    @Test
    public void testTabview_setErrorMessage() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setErrorDiv")).click();
	selenium.getDriver().findElement(By.id("setErrorMessage")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
	assertEquals(true, myResult);
    }
    
    @Test
    public void testTabview_clearErrorMessage() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setErrorDiv")).click();
	selenium.getDriver().findElement(By.id("setErrorMessage")).click();
	selenium.getDriver().findElement(By.id("clearErrorMessage")).click();
	Thread.sleep(500);
	
	Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
	assertEquals(false, myResult);
    }
    
    @Ignore
    public void testTabview_clear() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setValue_true")).click();
	selenium.getDriver().findElement(By.id("clear")).click();
	selenium.getDriver().findElement(By.id("getValue")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals(false, myResult);
    }
    
    @Ignore
    public void testTabview_setLabelText() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setLabelText")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("label1")).getAttribute("innerHTML");
	assertEquals("toto", myResult);
    }
    
    @Ignore
    public void testTabview_setLabelTextColor() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setLabelTextColor")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
	assertEquals("rgba(101,0,146,1)", myResult);
    }
    
}
