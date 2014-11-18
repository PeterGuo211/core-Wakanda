package org.wakanda.wastudio.checkbox.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.wakanda.common.Common.getResourcePath;

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


public class TestCasesCheckboxAPI extends SeleniumRuntimeTemplate {
	
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		Paths.solutionRelativePath = "/solutions/WidgetsAPI/WidgetsAPI.waSolution";
		final String solutionPath = getResourcePath(TestCasesCheckboxAPI.class, Paths.solutionRelativePath);

		logger.info(solutionPath);
	//	serverProcess = startServer(solutionPath);
		
		AdminCommand.startServer(TestCasesCheckboxAPI.class, "/solutions/WidgetsAPI/WidgetsAPI.waSolution");
	}
	
	
	
	//------------------------------------------------------------------------
	// Specific API
	//------------------------------------------------------------------------
	
	@Test
	public void testCheckbox_check() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("check")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("true", myResult);
	}
	
	@Test
	public void testCheckbox_uncheck() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("check")).click();
		selenium.getDriver().findElement(By.id("uncheck")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("false", myResult);
	}
	
	@Test
	public void testCheckbox_toggleCheckbox() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("toggleCheckbox")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("true", myResult);
	}
	
	@Test
	public void testCheckbox_toggleCheckbox_back() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("toggleCheckbox")).click();
		selenium.getDriver().findElement(By.id("toggleCheckbox")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("false", myResult);
	}
	
	@Test
	public void testCheckbox_setValue_true() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setValue_true")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("true", myResult);
	}

	@Test
	public void testCheckbox_setValue_false() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setValue_false")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("false", myResult);
	}
	
	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------
	
	@Test
	public void testCheckbox_hide() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("hide")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("checkbox1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testCheckbox_show() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("hide")).click();
		selenium.getDriver().findElement(By.id("show")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("checkbox1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testCheckbox_toggle() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("checkbox1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testCheckbox_toggle_back() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("toggle")).click();
		selenium.getDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("checkbox1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testCheckbox_addClass() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("addClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("checkbox1")).getAttribute("className").contains("toto");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testCheckbox_removeClass() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("addClass")).click();
		selenium.getDriver().findElement(By.id("removeClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("checkbox1")).getAttribute("className").contains("toto");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testCheckbox_move() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("move")).click();
		Thread.sleep(500);
		
		WebElement myElement = selenium.getDriver().findElement(By.id("checkbox1"));
		assertEquals("0px", myElement.getCssValue("top"));
		assertEquals("0px", myElement.getCssValue("left"));
	}
	
	@Test
	public void testCheckbox_resize_smaller() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("resize_smaller")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("checkbox1"));
		assertEquals("50", myElement.getAttribute("offsetWidth"));
		assertEquals("50", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testCheckbox_resize_bigger() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("resize_bigger")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("checkbox1"));
		assertEquals("300", myElement.getAttribute("offsetWidth"));
		assertEquals("300", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testCheckbox_setWidth() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setWidth")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("checkbox1")).getAttribute("offsetWidth");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testCheckbox_getWidth() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("getWidth")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("16", myResult);
	}
	
	@Test
	public void testCheckbox_setHeight() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setHeight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("checkbox1")).getAttribute("offsetHeight");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testCheckbox_getHeight() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("getHeight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("16", myResult);
	}
	
	@Test
	public void testCheckbox_setLeft() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setLeft")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("checkbox1")).getAttribute("offsetLeft");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testCheckbox_setRight() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setRight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("checkbox1")).getCssValue("right");
		assertEquals("100px", myResult);
	}

	@Test
	public void testCheckbox_setTop() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setTop")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("checkbox1")).getAttribute("offsetTop");
		assertEquals("100", myResult);
	}

	@Test
	public void testCheckbox_setBottom() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setBottom")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("checkbox1")).getCssValue("bottom");
		assertEquals("100px", myResult);
	}
	
	@Test
	public void testCheckbox_getPosition() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("getPosition")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("checkbox1")).getAttribute("innerHTML").contains("undefined");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testCheckbox_destroy() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("destroy")).click();
		Thread.sleep(500);
		
		try{
			selenium.getDriver().findElement(By.id("checkbox1"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testCheckbox_disable() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("disable")).click();
		selenium.getDriver().findElement(By.id("setValue_true")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		Boolean myClass = selenium.getDriver().findElement(By.id("checkbox1")).getAttribute("className").contains("waf-state-selected");
		assertEquals(true, myClass);
		
		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("true", myValue);
	}
	
	@Test
	public void testCheckbox_enable() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("disable")).click();
		selenium.getDriver().findElement(By.id("enable")).click();
		selenium.getDriver().findElement(By.id("setValue_true")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		Boolean myClass = selenium.getDriver().findElement(By.id("checkbox1")).getAttribute("className").contains("waf-state-selected");
		assertEquals(true, myClass);
		
		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("true", myValue);
	}
	/*
	@Test
	public void testCheckbox_getTheme() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("getTheme")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("inherited default", myResult);
	}
	*/
	@Test
	public void testCheckbox_setBackgroundColor() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setBackgroundColor")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("checkbox1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testCheckbox_setTextColor() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setTextColor")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("checkbox1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testCheckbox_setParent() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setParent")).click();
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.id("richText1")).findElement(By.id("checkbox1"));
	}
	
	@Test
	public void testCheckbox_getParent() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setParent")).click();
		selenium.getDriver().findElement(By.id("getParent")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("richText1", myResult);
	}
	
	@Test
	public void testCheckbox_setErrorDiv() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testCheckbox_getErrorDiv() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("getErrorDiv")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testCheckbox_setErrorMessage() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testCheckbox_clearErrorMessage() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		selenium.getDriver().findElement(By.id("clearErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testCheckbox_clear() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setValue_true")).click();
		selenium.getDriver().findElement(By.id("clear")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("false", myResult);
	}
	
	@Test
	public void testCheckbox_setLabelText() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setLabelText")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("toto", myResult);
	}
	
	@Test
	public void testCheckbox_setLabelTextColor() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxAPI.html");
		selenium.getDriver().findElement(By.id("setLabelTextColor")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
		
}
