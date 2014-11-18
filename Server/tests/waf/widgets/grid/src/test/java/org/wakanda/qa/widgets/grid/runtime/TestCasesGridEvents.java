package org.wakanda.qa.widgets.grid.runtime;

import static org.junit.Assert.assertEquals;
import static org.wakanda.common.server.AdminCommand.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import org.apache.commons.lang.StringUtils;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;


public class TestCasesGridEvents extends SeleniumRuntimeTemplate {

	
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		startServer(TestCasesGridEvents.class, "/solutions/widgetEvents/widgetEvents.waSolution");
	}

	//------------------------------------------------------------------------
	// Desktop Events
	//------------------------------------------------------------------------
	
	

	@Ignore
	public void testGrid_onError() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/gridEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('.waf-dataGrid-col-ID').simulate('click');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "onError"));
	}
	
	
	@Test
	public void testGrid_onRowDraw() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/gridEvents.html");
		while("" == selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML"))
			Thread.sleep(1000);
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, true, stack.contains("onRowDraw"));
	}
	
	@Test
	public void testGrid_onRowClick() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/gridEvents.html");
		while("" == selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML"))
			Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('.waf-dataGrid-row:first').simulate('click');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "onRowClick"));
	}
	
	@Test
	public void testGrid_onRowRightClick() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/gridEvents.html");
		while("" == selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML"))
			Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('.waf-widget-content:first').trigger({type: 'contextmenu',which: 3});");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "onRowRightClick"));
	}
	
	// Does not throw on cellClick but only on cell/inputClick. 
	@Test
	public void testGrid_onCellClick() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/gridEvents.html");
		while("" == selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML"))
			Thread.sleep(1000);

		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('.waf-dataGrid-cell:eq(2)').simulate('click');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "onCellClick"));
	}
	@Test
	public void testGrid_onHeaderClick() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/gridEvents.html");
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$('.waf-dataGrid-col-ID').simulate('click');");
		Thread.sleep(500);

		String stack = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("StackTrace: "+stack, 1, StringUtils.countMatches(stack, "onHeaderClick"));
	}
}
