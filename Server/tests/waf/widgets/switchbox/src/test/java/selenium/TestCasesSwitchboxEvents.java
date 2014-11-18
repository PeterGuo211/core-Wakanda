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

public class TestCasesSwitchboxEvents extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesSwitchboxAPI.class, "/solutions/widgetSwitchbox/widgetSwitchbox Solution/widgetSwitchbox.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/tablet/switchboxEvents.html");
	}

	// ------------------------------------------------------------------------
	// Desktop Events
	// ------------------------------------------------------------------------
	@Ignore
	public void testSwitchbox_onClick() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getDriver().findElement(By.className("waf-switchbox-switch")).click();
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onClick').getValue();");
		assertEquals("onClick events: ", "1", result);
	}

	@Ignore
	public void testSwitchbox_onMouseDown() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#switchbox1').simulate('mousedown');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseDown').getValue();");
		assertEquals("onMouseDown events: ", "1", result);
	}

	@Ignore
	public void testSwitchbox_onMouseMove() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#switchbox1').simulate('mousemove');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseMove').getValue();");
		assertEquals("onMouseMove events: ", "1", result);
	}

	@Ignore
	public void testSwitchbox_onMouseOut() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#switchbox1').simulate('mouseout');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseOut').getValue();");
		assertEquals("onMouseOut events: ", "1", result);
	}

	@Ignore
	public void testSwitchbox_onMouseOver() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#switchbox1').simulate('mouseover');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseOver').getValue();");
		assertEquals("onMouseOver events: ", "1", result);
	}

	@Ignore
	public void testSwitchbox_onMouseUp() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#switchbox1').simulate('mouseup');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseUp').getValue();");
		assertEquals("onMouseUp events: ", "1", result);
	}

	// ------------------------------------------------------------------------
	// Mobile Events (It does not update the CSS)
	// ------------------------------------------------------------------------
	@Test
	public void testSwitchbox_onTouchStart() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#switchbox1').triggerHandler('touchstart');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onTouchStart').getValue();");
		assertEquals("onTouchStart events: ", "1", result);
	}

	@Test
	public void testSwitchbox_onTouchMove() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#switchbox1').triggerHandler('touchmove');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onTouchMove').getValue();");
		assertEquals("onTouchMove events: ", "1", result);
	}

	@Test
	public void testSwitchbox_onTouchEnd() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#switchbox1').triggerHandler('touchend');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onTouchEnd').getValue();");
		assertEquals("onTouchEnd events: ", "1", result);
	}

	@Test
	public void testSwitchbox_onTouchCancel() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#switchbox1').triggerHandler('touchcancel');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onTouchCancel').getValue();");
		assertEquals("onTouchCancel events: ", "1", result);
	}
}
