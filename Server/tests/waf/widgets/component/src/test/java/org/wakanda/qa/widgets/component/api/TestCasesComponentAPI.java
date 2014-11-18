package org.wakanda.qa.widgets.component.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.wakanda.common.Paths;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesComponentAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeTestSuite() throws URISyntaxException, IOException{

		Paths.solutionRelativePath = "/solutions/WidgetsAPI/WidgetsAPI.waSolution";
		AdminCommand.startServer(TestCasesComponentAPI.class, Paths.solutionRelativePath);
	}

	@Before
	public void beforetest(){
		selenium.getDriver().get("http://127.0.0.1:8081/componentAPI.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.tagName("body"), 5);
	}
	//------------------------------------------------------------------------
	// Specific API
	//------------------------------------------------------------------------

	@Test
	public void testComponent_loadComponent() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("loadComponent")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1_richText1")).getAttribute("innerHTML");
		assertEquals("default", myResult);
	}

	@Test
	public void testComponent_loadComponentWithPath() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("loadComponentWithPath")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1_richText1")).getAttribute("innerHTML");
		assertEquals("default", myResult);
	}

	@Test
	public void testComponent_loadComponentWithParam() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("loadComponentWithParam")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1_richText1")).getAttribute("innerHTML");
		assertEquals("Updated", myResult);
	}

	@Test
	public void testComponent_loadComponentWithOnSuccess() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('component1').loadComponent({ path: 'comp.waComponent'," +
				"onSuccess: function(){$$('richText1').setValue('Component onSuccess called');}" +
				"});"
		);
		Thread.sleep(500);

		String result = (String) js.executeScript("return $$('richText1').getValue();");
		assertEquals("Check if loadComponent onSuccess is working", "Component onSuccess called", result);
	}

	@Test
	public void testComponent_removeComponent() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("loadComponent")).click();
		selenium.getDriver().findElement(By.id("removeComponent")).click();
		Thread.sleep(500);

		try {
			selenium.getDriver().findElement(By.id("component1_richText1")).getAttribute("innerHTML");
			assertTrue(true);
		} catch (Exception e) {}
	}

	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------

	@Test
	public void testComponent_hide() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("hide")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1")).getCssValue("display");
		assertEquals("none", myResult);
	}

	@Test
	public void testComponent_show() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("hide")).click();
		selenium.getDriver().findElement(By.id("show")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1")).getCssValue("display");
		assertEquals("block", myResult);
	}

	//@Test
	public void testComponent_toggle() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("loadComponent")).click();
		selenium.getDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1")).getCssValue("display");
		assertEquals("none", myResult);
	}

	//@Test
	public void testComponent_toggle_back() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("loadComponent")).click();
		selenium.getDriver().findElement(By.id("toggle")).click();
		selenium.getDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1")).getCssValue("display");
		assertEquals("block", myResult);
	}

	@Test
	public void testComponent_addClass() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("addClass")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("component1")).getAttribute("className").contains("toto");
		assertEquals(true, myResult);
	}

	@Test
	public void testComponent_removeClass() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("addClass")).click();
		selenium.getDriver().findElement(By.id("removeClass")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("component1")).getAttribute("className").contains("toto");
		assertEquals(false, myResult);
	}

	@Test
	public void testComponent_move() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("move")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("component1"));
		assertEquals("0px", myElement.getCssValue("top"));
		assertEquals("0px", myElement.getCssValue("left"));
	}

	@Test
	public void testComponent_resize_smaller() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("resize_smaller")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("component1"));
		assertEquals("50", myElement.getAttribute("offsetWidth"));
		assertEquals("50", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testComponent_resize_bigger() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("resize_bigger")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("component1"));
		assertEquals("300", myElement.getAttribute("offsetWidth"));
		assertEquals("300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testComponent_setWidth() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setWidth")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1")).getAttribute("offsetWidth");
		assertEquals("100", myResult);
	}

	@Test
	public void testComponent_getWidth() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getWidth")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("239", myResult);
	}

	@Test
	public void testComponent_setHeight() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setHeight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1")).getAttribute("offsetHeight");
		assertEquals("100", myResult);
	}

	@Test
	public void testComponent_getHeight() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getHeight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("137", myResult);
	}

	@Test
	public void testComponent_setLeft() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setLeft")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1")).getAttribute("offsetLeft");
		assertEquals("100", myResult);
	}

	@Test
	public void testComponent_setRight() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setRight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1")).getCssValue("right");
		assertEquals("100px", myResult);
	}

	@Test
	public void testComponent_setTop() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setTop")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1")).getAttribute("offsetTop");
		assertEquals("100", myResult);
	}

	@Test
	public void testComponent_setBottom() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setBottom")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1")).getCssValue("bottom");
		assertEquals("100px", myResult);
	}

	@Test
	public void testComponent_getPosition() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getPosition")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("component1")).getAttribute("innerHTML").contains("undefined");
		assertEquals(false, myResult);
	}

	@Test
	public void testComponent_destroy() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("destroy")).click();
		Thread.sleep(500);

		try{
			selenium.getDriver().findElement(By.id("component1"));
			assertTrue(false);
		}catch(Exception e){}
	}

	//@Test
	public void testComponent_disable() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("loadComponent")).click();
		selenium.getDriver().findElement(By.id("disable")).click();
		Thread.sleep(500);

		Boolean myID = selenium.getDriver().findElement(By.id("component1_textField1")).isEnabled();
		assertEquals(false, myID);		
	}

	@Test
	public void testComponent_enable() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("loadComponent")).click();
		selenium.getDriver().findElement(By.id("disable")).click();
		selenium.getDriver().findElement(By.id("enable")).click();
		Thread.sleep(500);

		Boolean myID = selenium.getDriver().findElement(By.id("component1_textField1")).isEnabled();
		assertEquals(true, myID);		
	}

//	@Test
	public void testComponent_getTheme() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getTheme")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("inherited default", myResult);
	}

	@Test
	public void testComponent_setBackgroundColor() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setBackgroundColor")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

	@Test
	public void testComponent_setTextColor() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setTextColor")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("component1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

	@Test
	public void testComponent_setParent() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setParent")).click();
		Thread.sleep(500);

		selenium.getDriver().findElement(By.id("richText1")).findElement(By.id("component1"));
	}

	@Test
	public void testComponent_getParent() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setParent")).click();
		selenium.getDriver().findElement(By.id("getParent")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("richText1", myResult);
	}

	@Test
	public void testComponent_setErrorDiv() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}

	@Test
	public void testComponent_getErrorDiv() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("getErrorDiv")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
		assertEquals(true, myResult);
	}

	@Test
	public void testComponent_setErrorMessage() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}

	@Test
	public void testComponent_clearErrorMessage() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		selenium.getDriver().findElement(By.id("clearErrorMessage")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(false, myResult);
	}

	//@Test
	public void testComponent_clear() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("clear")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals(false, myResult);
	}

	//@Test
	public void testComponent_setLabelText() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setLabelText")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("toto", myResult);
	}

	//@Test
	public void testComponent_setLabelTextColor() throws InterruptedException
	{

		selenium.getDriver().findElement(By.id("setLabelTextColor")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

}
