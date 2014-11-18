package org.wakanda.qa.widgets.grid.api;

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
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesGridAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		startServer(TestCasesGridAPI.class, "/solutions/WidgetsAPI/WidgetsAPI.waSolution");
	} 
  
    @Before
    public void beforeTest(){
	selenium.getDriver().get("http://127.0.0.1:8081/gridAPI.html");
	selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
    }
    //------------------------------------------------------------------------
    // Specific API
    //------------------------------------------------------------------------
    
    @Test
    public void testGrid_getSelectionMode() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("getSelectionMode")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("multiple", myResult);
    }
    
    @Test
    public void testGrid_setSelectionMode_single() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setSelectionMode_single")).click();
		selenium.getDriver().findElement(By.id("getSelectionMode")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("single", myResult);
    }
    
    @Test
    public void testGrid_setSelectionMode_multiple() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setSelectionMode_single")).click();
		selenium.getDriver().findElement(By.id("setSelectionMode_multiple")).click();
		selenium.getDriver().findElement(By.id("getSelectionMode")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("multiple", myResult);
    }
    
    @Test
    public void testGrid_countSelected() throws InterruptedException
    {
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#grid .waf-dataGrid-body .waf-dataGrid-col-name:eq(1)').click();");
		selenium.getDriver().findElement(By.id("countSelected")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("1", myResult);
    }
    
    @Test
    public void testGrid_reduceToSelected() throws InterruptedException
    {
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript(
			"var e = jQuery.Event('click');" +
			"e.shiftKey = true;"+
			"$('#grid .waf-dataGrid-body .waf-dataGrid-col-name:eq(1)').click();"+
			"$('#grid .waf-dataGrid-body .waf-dataGrid-col-name:eq(2)').trigger(e);"+
			"$('#grid .waf-dataGrid-body .waf-dataGrid-col-name:eq(3)').trigger(e);"
		);
		selenium.getDriver().findElement(By.id("reduceToSelected")).click();
		Thread.sleep(500);
		
		String myEntityNumber = "";
		for (int i=0; i<5 && "5 item(s)" != myEntityNumber; i++){
		    myEntityNumber = selenium.getDriver().findElement(By.xpath("//div[@id='grid']/div[3]/div[2]")).getAttribute("innerHTML");
		    Thread.sleep(1000);
		}
		assertEquals("3 item(s)", myEntityNumber);
    }
    
    @Test
    public void testGrid_getSortIndicator() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("getSortIndicator")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("colNb: null, order: null", myResult);
    }
    
    @Test
    public void testGrid_setSortIndicator_desc() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setSortIndicator_desc")).click();
		selenium.getDriver().findElement(By.id("getSortIndicator")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("colNb: 1, order: desc", myResult);
    }
    
    @Test
    public void testGrid_setSortIndicator_asc() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setSortIndicator_asc")).click();
	selenium.getDriver().findElement(By.id("getSortIndicator")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("colNb: 1, order: asc", myResult);
    }
    
    @Test
    public void testGrid_resetSortIndicator() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("setSortIndicator_asc")).click();
	selenium.getDriver().findElement(By.id("resetSortIndicator")).click();
	selenium.getDriver().findElement(By.id("getSortIndicator")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("colNb: null, order: null", myResult);
    }
    
    @Test
    public void testGrid_column_setFormat() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("column_setFormat")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.xpath("//div[@id='grid']/div[2]/div/div/div/div/div")).getAttribute("innerHTML");
	assertEquals("$1,00", myResult);
    }
    
    @Test
    public void testGrid_column_getFormattedValue() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("column_setFormat")).click();
	selenium.getDriver().findElement(By.id("column_getFormattedValue")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("$1,00", myResult);
    }
    
    @Test
    public void testGrid_column_getValueForInput() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("column_setFormat")).click();
	selenium.getDriver().findElement(By.id("column_getValueForInput")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
	assertEquals("1", myResult);
    }
    
    @Test
    public void testGrid_column_setBackgroundColor() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("column_setBackgroundColor")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.xpath("//div[@id='grid']/div/div/div[2]")).getCssValue("background-color").replaceAll("\\s","");
	assertEquals("rgba(204,51,0,1)", myResult);
    }
    
    @Test
    public void testGrid_column_setColor() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("column_setColor")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.xpath("//div[@id='grid']/div[2]/div/div[5]/div/div/div")).getCssValue("color").replaceAll("\\s","");
	assertEquals("rgba(204,51,0,1)", myResult);
    }
    
    @Test
    public void testGrid_column_setRenderer() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("column_setRenderer")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.xpath("//div[@id='grid']/div[2]/div/div/div/div[2]/div")).getAttribute("innerHTML");
	assertEquals("EMP_1", myResult);
    }
    
    @Test
    public void testGrid_column_setTextSize() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("column_setTextSize")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.xpath("//div[@id='grid']/div[2]/div/div/div/div/div")).getCssValue("font-size");
	assertEquals("14px", myResult);
    }
    
    @Test
    public void testGrid_column_setWidth() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("column_setWidth")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.xpath("//div[@id='grid']/div/div/div")).getAttribute("offsetWidth");
	assertEquals("151", myResult);
    }
    
    //------------------------------------------------------------------------
    // Generic API
    //------------------------------------------------------------------------
    
    @Test
    public void testGrid_hide() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("hide")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("grid")).getCssValue("display");
	assertEquals("none", myResult);
    }
    
    @Test
    public void testGrid_show() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("hide")).click();
	selenium.getDriver().findElement(By.id("show")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("grid")).getCssValue("display");
	assertEquals("block", myResult);
    }
    
    @Test
    public void testGrid_toggle() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("toggle")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("grid")).getCssValue("display");
	assertEquals("block", myResult);
    }
    
    @Test
    public void testGrid_toggle_back() throws InterruptedException
    {
	selenium.getDriver().findElement(By.id("toggle")).click();
	selenium.getDriver().findElement(By.id("toggle")).click();
	Thread.sleep(500);
	
	String myResult = selenium.getDriver().findElement(By.id("grid")).getCssValue("display");
	assertEquals("block", myResult);
    }
    
    @Test
    public void testGrid_addClass() throws InterruptedException
    {

		selenium.getDriver().findElement(By.id("addClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("grid")).getAttribute("className").contains("toto");
		assertEquals(true, myResult);
    }
    
    @Test
    public void testGrid_removeClass() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("addClass")).click();
		selenium.getDriver().findElement(By.id("removeClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("grid")).getAttribute("className").contains("toto");
		assertEquals(false, myResult);
    }
    
    @Test
    public void testGrid_move() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("move")).click();
		Thread.sleep(500);
		
		WebElement myElement = selenium.getDriver().findElement(By.id("grid"));
		assertEquals("0px", myElement.getCssValue("top"));
		assertEquals("0px", myElement.getCssValue("left"));
    }
    
    @Test
    public void testGrid_resize_smaller() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("resize_smaller")).click();
		Thread.sleep(500);
		
		WebElement myElement = selenium.getDriver().findElement(By.id("grid"));
		assertEquals("50", myElement.getAttribute("offsetWidth"));
		assertEquals("50", myElement.getAttribute("offsetHeight"));
    }
    
    @Test
    public void testGrid_resize_bigger() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("resize_bigger")).click();
		Thread.sleep(500);
		
		WebElement myElement = selenium.getDriver().findElement(By.id("grid"));
		assertEquals("300", myElement.getAttribute("offsetWidth"));
		assertEquals("300", myElement.getAttribute("offsetHeight"));
    }
    
    @Test
    public void testGrid_setWidth() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setWidth")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("grid")).getAttribute("offsetWidth");
		assertEquals("100", myResult);
    }
    
    @Test
    public void testGrid_getWidth() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("getWidth")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("300", myResult);
    }
    
    @Test
    public void testGrid_setHeight() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setHeight")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("grid")).getAttribute("offsetHeight");
		assertEquals("100", myResult);
    }
    
    @Test
    public void testGrid_getHeight() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("getHeight")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("300", myResult);
    }
    
    @Test
    public void testGrid_setLeft() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setLeft")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("grid")).getAttribute("offsetLeft");
		assertEquals("100", myResult);
    }
    
    @Test
    public void testGrid_setRight() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setRight")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("grid")).getCssValue("right");
		assertEquals("100px", myResult);
    }
    
    @Test
    public void testGrid_setTop() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setTop")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("grid")).getAttribute("offsetTop");
		assertEquals("100", myResult);
    }
    
    @Test
    public void testGrid_setBottom() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setBottom")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("grid")).getCssValue("bottom");
		assertEquals("100px", myResult);
    }
    
    @Test
    public void testGrid_getPosition() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("getPosition")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("grid")).getAttribute("innerHTML").contains("undefined");
		assertEquals(false, myResult);
    }
    
    @Test
    public void testGrid_destroy() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("destroy")).click();
		Thread.sleep(500);
		
		try{
		    selenium.getDriver().findElement(By.id("grid"));
		    assertTrue(false);
		}catch(Exception e){}
    }
    
    @Test
    public void testGrid_disable() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("disable")).click();
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#grid .waf-dataGrid-body .waf-dataGrid-col-name:first').dblclick()");
		String myInput = selenium.getDriver().findElement(By.xpath("//div[@id='grid']/div[2]/div/div/div/div[2]/div")).getCssValue("display");
		assertEquals("block", myInput);
		
		String myToolbar = selenium.getDriver().findElement(By.xpath("//div[@id='grid']/div[3]/div/ul")).getCssValue("display");
		assertEquals("none", myToolbar);
    }
    
    @Test
    public void testGrid_enable() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("disable")).click();
		selenium.getDriver().findElement(By.id("enable")).click();
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#grid .waf-dataGrid-body .waf-dataGrid-col-name:first').dblclick()");
		String myInput = selenium.getDriver().findElement(By.xpath("//div[@id='grid']/div[2]/div/div/div/div[2]/div")).getCssValue("display");
		assertEquals("none", myInput);
		
		String myToolbar = selenium.getDriver().findElement(By.xpath("//div[@id='grid']/div[3]/div/ul")).getCssValue("display");
		assertEquals("block", myToolbar);
    }
    
    @Test
    public void testGrid_setBackgroundColor() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setBackgroundColor")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.xpath("//*[@id='grid']/div[2]")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
    }
    
    @Test
    public void testGrid_setTextColor() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setTextColor")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("grid")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
    }
    
    @Test
    public void testGrid_setParent() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setParent")).click();
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.id("richText1")).findElement(By.id("grid"));
    }
    
    @Test
    public void testGrid_getParent() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setParent")).click();
		selenium.getDriver().findElement(By.id("getParent")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("richText1", myResult);
    }
    
    @Test
    public void testGrid_setErrorDiv() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
    }
    
    @Test
    public void testGrid_getErrorDiv() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("getErrorDiv")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
		assertEquals(true, myResult);
    }
    
    @Test
    public void testGrid_setErrorMessage() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
    }
    
    @Test
    public void testGrid_clearErrorMessage() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		selenium.getDriver().findElement(By.id("clearErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(false, myResult);
    }
    
    @Ignore
    public void testGrid_clear() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setValue_true")).click();
		selenium.getDriver().findElement(By.id("clear")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
	
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals(false, myResult);
    }
    
    @Test
    public void testGrid_setLabelText() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setLabelText")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("toto", myResult);
    }
    
    @Test
    public void testGrid_setLabelTextColor() throws InterruptedException
    {
		selenium.getDriver().findElement(By.id("setLabelTextColor")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
    }
    
}
