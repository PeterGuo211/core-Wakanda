package org.wakanda.qa.widgets.matrix.runtime;

import static org.junit.Assert.assertEquals;
import static org.wakanda.selenium.SeleniumUtils.setWidgetId;

import java.io.IOException;
import java.net.URISyntaxException;


import org.apache.commons.lang.StringUtils;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.wakanda.common.Paths;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.common.testing.Widgets;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesMatrixEvents extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		Paths.solutionRelativePath = "/solutions/widgetEvents/widgetEvents.waSolution";
		AdminCommand.startServer(TestCasesMatrixEvents.class, Paths.solutionRelativePath);
		
	}
	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	
	//@Test
	public void testMatrix_onResize() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('.ui-resizable-se').simulate('mouseover');" +
				"$('.ui-resizable-se').simulate('drag', {dx:150, dy:150});");
		Thread.sleep(1500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, true, stack.contains("onResize"));
	}

	//@Test
	public void testMatrix_onStartResize() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('.ui-resizable-se').simulate('mouseover');" +
				"$('.ui-resizable-se').simulate('drag', {dx:150, dy:150});");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "startResize"));
	}

	//@Test
	public void testMatrix_onStopResize() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('.ui-resizable-se').simulate('mouseover');" +
				"$('.ui-resizable-se').simulate('drag', {dx:150, dy:150});");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "stopResize"));
	}
	
	@Test
	public void testMatrix_onClick() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);
		
		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"	+ setWidgetId(Widgets.matrix, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.click(elem).perform();
		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "click"));
	}
	
	@Test
	public void testMatrix_onDoubleClick() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);

		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"	+ setWidgetId(Widgets.matrix, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.doubleClick(elem).perform();

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "dblclick"));
	}

	
	@Test
	public void testMatrix_onMouseOver() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);

		Actions act = new Actions(selenium.getDriver());
		act.moveByOffset(20, 20).perform();
		act.release();

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseover"));
	}
	
	@Test
	public void testMatrix_onMouseDown() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);

		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"+ setWidgetId(Widgets.matrix, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.clickAndHold(elem).perform();
		act.release();

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mousedown"));
	}
	
	@Test
	public void testMatrix_onMouseOut() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);

		Actions act = new Actions(selenium.getDriver());
		act.moveByOffset(20, 20).perform();
		act.moveByOffset(500,300).perform();

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseout"));
	}

	

	@Test
	public void testMatrix_onMouseUp() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);
		
		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"	+ setWidgetId(Widgets.matrix, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.click(elem).perform();
		act.release();

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "mouseup"));
	}

	@Test
	public void testMatrix_onDraw() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixEvents.html");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 6, StringUtils.countMatches(stack, "onChildrenDraw"));
	}
}
