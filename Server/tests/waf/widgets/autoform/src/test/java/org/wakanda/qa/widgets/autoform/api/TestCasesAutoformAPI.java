package org.wakanda.qa.widgets.autoform.api;

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

public class TestCasesAutoformAPI extends SeleniumRuntimeTemplate {

	
	@BeforeClass
	public static void beforeTestSuite() throws URISyntaxException, IOException{
		startServer(TestCasesAutoformAPI.class, "/solutions/WidgetsAPI/WidgetsAPI.waSolution");
	}

	//------------------------------------------------------------------------
	// Specific API
	//------------------------------------------------------------------------
	@Before
	public void beforeTest(){
		selenium.getDriver().get("http://127.0.0.1:8081/autoFormAPI.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.tagName("body"), 5);
	}


	@Test
	public void testAutoform_addEntity() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		Integer out = 0;
		while(out < 5000){
			Thread.sleep(100);
			out+=100;
			if (selenium.getDriver().findElement(By.id("autoForm1_name")).getAttribute("value").equals("emp_1")){
				out=5000;
			}
		}
		js.executeScript("$$('autoForm1').addEntity();");
		Thread.sleep(500);

		assertEquals("Check ID field is empty", "", selenium.getDriver().findElement(By.id("autoForm1_ID")).getAttribute("value"));
		assertEquals("Check name field is empty", "", selenium.getDriver().findElement(By.id("autoForm1_name")).getAttribute("value"));
	}

	@Test
	public void testAutoform_findEntity() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("addEntity")).click();
		selenium.getDriver().findElement(By.id("autoForm1_name")).sendKeys("emp_1");
		selenium.getDriver().findElement(By.id("findEntity")).click();
		Thread.sleep(500);

		assertEquals("1", selenium.getDriver().findElement(By.id("autoForm1_ID")).getAttribute("value"));
	}

	@Test
	public void testAutoform_saveEntity() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("addEntity")).click();
		selenium.getDriver().findElement(By.id("autoForm1_name")).sendKeys("Donald Duck");
		selenium.getDriver().findElement(By.id("saveEntity")).click();
		Thread.sleep(500);
		selenium.getDriver().findElement(By.id("autoForm1_name")).sendKeys("Donald Duck");
		selenium.getDriver().findElement(By.id("findEntity")).click();
		Thread.sleep(500);

		// Check if entity is display
		assertEquals("Donald Duck", selenium.getDriver().findElement(By.id("autoForm1_name")).getAttribute("value"));
		Thread.sleep(5000); // Time needed to save into the database. 
	}

	@Test
	public void testAutoform_dropEntity() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("addEntity")).click();
		selenium.getDriver().findElement(By.id("autoForm1_name")).sendKeys("Donald Duck");
		selenium.getDriver().findElement(By.id("findEntity")).click();
		Thread.sleep(500);

		// Check if entity to delete is found
		assertEquals("Donald Duck", selenium.getDriver().findElement(By.id("autoForm1_name")).getAttribute("value"));

		selenium.getDriver().findElement(By.id("dropEntity")).click();
		Thread.sleep(500);

		// Check if autoform is empty after delete
		assertEquals("", selenium.getDriver().findElement(By.id("autoForm1_ID")).getAttribute("value"));
		assertEquals("", selenium.getDriver().findElement(By.id("autoForm1_name")).getAttribute("value"));
	}

	@Test
	public void testAutoform_nextEntity() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("nextEntity")).click();
		Thread.sleep(500);

		assertEquals("2", selenium.getDriver().findElement(By.id("autoForm1_ID")).getAttribute("value"));
		assertEquals("emp_2", selenium.getDriver().findElement(By.id("autoForm1_name")).getAttribute("value"));
	}

	@Test
	public void testAutoform_previousEntity() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("nextEntity")).click();
		selenium.getDriver().findElement(By.id("prevEntity")).click();
		Thread.sleep(500);

		assertEquals("1", selenium.getDriver().findElement(By.id("autoForm1_ID")).getAttribute("value"));
		assertEquals("emp_1", selenium.getDriver().findElement(By.id("autoForm1_name")).getAttribute("value"));
	}

	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------

	@Test
	public void testAutoform_hide() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("hide")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("autoForm1")).getCssValue("display");
		assertEquals("none", myResult);
	}

	@Test
	public void testAutoform_show() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("hide")).click();
		selenium.getDriver().findElement(By.id("show")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("autoForm1")).getCssValue("display");
		assertEquals("block", myResult);
	}

	@Test
	public void testAutoform_toggle() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("autoForm1")).getCssValue("display");
		assertEquals("none", myResult);
	}

	@Test
	public void testAutoform_toggle_back() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("toggle")).click();
		selenium.getDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("autoForm1")).getCssValue("display");
		assertEquals("block", myResult);
	}

	@Test
	public void testAutoform_addClass() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("addClass")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("autoForm1")).getAttribute("className").contains("toto");
		assertEquals(true, myResult);
	}

	@Test
	public void testAutoform_removeClass() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("addClass")).click();
		selenium.getDriver().findElement(By.id("removeClass")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("autoForm1")).getAttribute("className").contains("toto");
		assertEquals(false, myResult);
	}

	@Test
	public void testAutoform_move() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("move")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("autoForm1"));
		assertEquals("0px", myElement.getCssValue("top"));
		assertEquals("0px", myElement.getCssValue("left"));
	}

	@Test
	public void testAutoform_resize_smaller() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("resize_smaller")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("autoForm1"));
		assertEquals("50", myElement.getAttribute("offsetWidth"));
		assertEquals("50", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testAutoform_resize_bigger() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("resize_bigger")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("autoForm1"));
		assertEquals("300", myElement.getAttribute("offsetWidth"));
		assertEquals("300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testAutoform_setWidth() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setWidth")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("autoForm1")).getAttribute("offsetWidth");
		assertEquals("100", myResult);
	}

	@Test
	public void testAutoform_getWidth() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getWidth")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("250", myResult);
	}

	@Test
	public void testAutoform_setHeight() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setHeight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("autoForm1")).getAttribute("offsetHeight");
		assertEquals("100", myResult);
	}

	@Test
	public void testAutoform_getHeight() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getHeight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("250", myResult);
	}

	@Test
	public void testAutoform_setLeft() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setLeft")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("autoForm1")).getAttribute("offsetLeft");
		assertEquals("100", myResult);
	}

	@Test
	public void testAutoform_setRight() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setRight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("autoForm1")).getCssValue("right");
		assertEquals("100px", myResult);
	}

	@Test
	public void testAutoform_setTop() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setTop")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("autoForm1")).getAttribute("offsetTop");
		assertEquals("100", myResult);
	}

	@Test
	public void testAutoform_setBottom() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setBottom")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("autoForm1")).getCssValue("bottom");
		assertEquals("100px", myResult);
	}

	@Test
	public void testAutoform_getPosition() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getPosition")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("autoForm1")).getAttribute("innerHTML").contains("undefined");
		assertEquals(false, myResult);
	}

	@Test
	public void testAutoform_destroy() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("destroy")).click();
		Thread.sleep(500);

		try{
			selenium.getDriver().findElement(By.id("autoForm1"));
			assertTrue(false);
		}
		catch(Exception e){}
	}

	@Test
	public void testAutoform_disable() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('autoForm1').disable();");
		js.executeScript("$$('autoForm1_ID').setValue('100');");
		Thread.sleep(500);

		String myID = (String) js.executeScript("return $('#autoForm1_ID').val()");
		assertEquals("100", myID);
	}

	@Test
	public void testAutoform_enable() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("disable")).click();
		selenium.getDriver().findElement(By.id("enable")).click();
		selenium.getDriver().findElement(By.id("autoForm1_ID")).click();
		Thread.sleep(500);

		Boolean myID = selenium.getDriver().findElement(By.id("autoForm1_ID")).isEnabled();
		assertEquals(true, myID);

		Boolean myName = selenium.getDriver().findElement(By.id("autoForm1_ID")).isEnabled();
		assertEquals(true, myName);
	}

//	@Test
	public void testAutoform_getTheme() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getTheme")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("inherited default", myResult);
	}

	@Test
	public void testAutoform_setBackgroundColor() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setBackgroundColor")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("autoForm1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

	@Test
	public void testAutoform_setTextColor() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setTextColor")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("autoForm1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

	@Test
	public void testAutoform_setParent() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setParent")).click();
		Thread.sleep(500);

		selenium.getDriver().findElement(By.id("richText1")).findElement(By.id("autoForm1"));
	}

	@Test
	public void testAutoform_getParent() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setParent")).click();
		selenium.getDriver().findElement(By.id("getParent")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("richText1", myResult);
	}

	@Test
	public void testAutoform_setErrorDiv() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}

	@Test
	public void testAutoform_getErrorDiv() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("getErrorDiv")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
		assertEquals(true, myResult);
	}

	@Test
	public void testAutoform_setErrorMessage() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}

	@Test
	public void testAutoform_clearErrorMessage() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		selenium.getDriver().findElement(By.id("clearErrorMessage")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(false, myResult);
	}

	@Test
	public void testAutoform_clear() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("clear")).click();
		Thread.sleep(500);

		assertEquals("", selenium.getDriver().findElement(By.id("autoForm1_ID")).getAttribute("value"));
		assertEquals("", selenium.getDriver().findElement(By.id("autoForm1_name")).getAttribute("value"));
	}

	@Ignore
	public void testAutoform_setLabelText() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setLabelText")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("toto", myResult);
	}

	@Ignore
	public void testAutoform_setLabelTextColor() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setLabelTextColor")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

}
