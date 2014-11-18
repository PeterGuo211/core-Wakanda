package selenium;

import static org.junit.Assert.*;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesPopover_general extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesPopoverEvents.class, "/solutions/widgetPopover/widgetPopover Solution/widgetPopover.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
	}

	@Test
	public void testPopover_size() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#popover1').width() +'/'+ $('#popover1').height();");
		assertEquals("Check popover size (width/height)", "218/298", result);
	}
	
	@Test
	public void testPopover_position() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		Thread.sleep(500);
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#popover1').position().left +'/'+ $('#popover1').position().top;");
		assertEquals("Check popover position (x/y)", "124/35", result);
	}

}