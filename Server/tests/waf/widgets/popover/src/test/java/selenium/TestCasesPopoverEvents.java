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

public class TestCasesPopoverEvents extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesPopoverEvents.class, "/solutions/widgetPopover/widgetPopover Solution/widgetPopover.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/popoverEvents.waPage/index-tablet.html");
	}

	// ------------------------------------------------------------------------
	// Touch Events
	// ------------------------------------------------------------------------
	@Test
	public void testPopover_onTouchStart() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#popover1').trigger('touchstart');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onTouchStart').getValue();");
		assertEquals("onTouchStart events: ", "1", result);
	}

	@Test
	public void testPopover_onTouchEnd() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#popover1').trigger('touchend');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onTouchEnd').getValue();");
		assertEquals("onTouchEnd events: ", "1", result);
	}

	@Test
	public void testPopover_onTouchCancel() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#popover1').trigger('touchcancel');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onTouchCancel').getValue();");
		assertEquals("onTouchCancel events: ", "1", result);
	}
}
