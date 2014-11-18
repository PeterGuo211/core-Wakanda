package org.wakanda.wastudio.checkbox.runtime;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.apache.commons.lang.StringUtils;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesCheckboxEvents extends SeleniumRuntimeTemplate {

	
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		/*Paths.solutionRelativePath = "/solutions/widgetEvents/widgetEvents.waSolution";
		String solutionPath = getResourcePath(TestCasesCheckboxEvents.class, Paths.solutionRelativePath);

		logger.info(solutionPath);
		serverProcess = startServer(solutionPath);*/
		
		AdminCommand.startServer(TestCasesCheckboxEvents.class, "/solutions/widgetEvents/widgetEvents.waSolution");
	}
	
	
	// ------------------------------------------------------------------------
	// Desktop Events
	// ------------------------------------------------------------------------

	@Test
	public void testCheckbox_onChange() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		Thread.sleep(500);
		selenium.getDriver().findElement(By.xpath("//*[@id='checkbox1']/input")).click();
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "change"));
	}

	@Test
	public void testCheckbox_onChange_withAPI() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('checkbox1').setValue(true);");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "change"));
	}

	@Test
	public void testCheckbox_onChange_withLabel() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		selenium.getDriver().findElement(By.id("label1")).click();
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "change"));
	}

	@Test
	public void testCheckbox_onClick() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		selenium.getDriver().findElement(By.xpath("//*[@id='checkbox1']/input"))
				.click();
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "click"));
	}

	@Test
	public void testCheckbox_onClick_withLabel() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		selenium.getDriver().findElement(By.id("label1")).click();
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "click"));
	}

	@Test
	public void testCheckbox_onMouseDown() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#checkbox1').simulate('mousedown');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "mousedown"));
	}

	@Test
	public void testCheckbox_onMouseMove() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#checkbox1').simulate('mousemove');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "mousemove"));
	}

	@Test
	public void testCheckbox_onMouseOut() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#checkbox1').simulate('mouseout');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "mouseout"));
	}

	@Test
	public void testCheckbox_onMouseOver() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#checkbox1').simulate('mouseover');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "mouseover"));
	}

	@Test
	public void testCheckbox_onMouseUp() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/checkboxEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('#checkbox1').simulate('mouseup');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1"))
				.getAttribute("innerHTML");
		assertEquals("StackTrace: " + stack, 1,
				StringUtils.countMatches(stack, "mouseup"));
	}

}
