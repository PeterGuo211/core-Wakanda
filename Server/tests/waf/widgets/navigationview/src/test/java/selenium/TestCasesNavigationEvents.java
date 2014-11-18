package selenium;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesNavigationEvents extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesNavigationEvents.class, "/solutions/widgetNavigationView/widgetNavigationView Solution/widgetNavigationView.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/navigationEvents.html");
	}

	// ------------------------------------------------------------------------
	// Desktop Events
	// ------------------------------------------------------------------------
	
	@Test
	public void testNavigation_onTouchMove() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#navigationView1').triggerHandler('touchmove');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onTouchMove').getValue();");
		assertEquals("onTouchMove events: ", "1", result);
	}
	
	@Ignore
	public void testNavigation_onClick() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#navigationView1').simulate('click');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onClick').getValue()");
		assertEquals("onClick events: ", "1", result);
	}

	@Ignore
	public void testNavigation_onDoubleClick() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#navigationView1').trigger('dblclick');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onDblClick').getValue()");
		assertEquals("onDblClick events: ", "1", result);
	}

	@Ignore
	public void testNavigation_onMouseDown() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#navigationView1').simulate('mousedown');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseDown').getValue()");
		assertEquals("onMouseDown events: ", "1", result);
	}

	@Ignore
	public void testNavigation_onMouseOut() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#navigationView1').simulate('mouseout');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseOut').getValue()");
		assertEquals("onMouseOut events: ", "1", result);
	}

	@Ignore
	public void testNavigation_onMouseOver() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#navigationView1').simulate('mouseover');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseOver').getValue()");
		assertEquals("onMouseOver events: ", "1", result);
	}

	@Ignore
	public void testNavigation_onMouseUp() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#navigationView1').simulate('mouseup');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseUp').getValue()");
		assertEquals("onMouseUp events: ", "1", result);
	}
}
