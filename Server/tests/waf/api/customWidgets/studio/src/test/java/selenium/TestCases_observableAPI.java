package selenium;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCases_observableAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCases_observableAPI.class, "/customWidgetsSolution/customWidgetsSolution Solution/customWidgetsSolution.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/index/");
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {}
	}
	
	@Test
	public void test_fireCustomEvent() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getJsConsole().executeScript("$$('testStudio1').fireCreateEvent();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check create event sent", " create event", result);
	}

	@Test
	public void test_subscribeClickEvent() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getJsConsole().executeScript("$$('testStudio1').subscribeClickEvent();");
		selenium.getDriver().findElement(By.xpath("//*[@id='testStudio1']/input")).click();
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check click event subscription", " Success Got click event", result);
	}

	@Test
	public void test_subscribeFireCustomEvent() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getJsConsole().executeScript("$$('testStudio1').subscribeFireCustomEvent();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check custom event subscription", " Success Got testEvent", result);
	}
	
	@Test
	public void test_unsubscribeByEvent() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getJsConsole().executeScript("$$('testStudio1').unsubscribeByEvent();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check unsubscribe by event", " testEvent sent", result);
	}
	
	@Test
	public void test_unsubscribeByCallback() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getJsConsole().executeScript("$$('testStudio1').unsubscribeByCallback();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check unsubscribe by callback", " testEvent sent", result);
	}
	
	@Test
	public void test_unsubscribeByTarget() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getJsConsole().executeScript("$$('testStudio1').unsubscribeByTarget();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check unsubscribe by target", " testEvent sent", result);
	}
	
	@Test
	public void test_unsubscribeBySubscriber() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getJsConsole().executeScript("$$('testStudio1').unsubscribeBySubscriber();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check unsubscribe by target", " testEvent sent", result);
	}
	
	@Test
	public void test_pauseResumeSubscribe() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getJsConsole().executeScript("$$('testStudio1').pauseResumeSubscribe();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check pause/resume subscription", " subscriber is paused : false subscriber is paused : true testEvent sent subscriber is paused : false testEvent sent Got testEvent", result);
	}
	
	@Test
	public void test_removeSubscriber() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getJsConsole().executeScript("$$('testStudio1').testRemoveSubscriber();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check removeSubscriber", " testEvent sent", result);
	}
	
}
