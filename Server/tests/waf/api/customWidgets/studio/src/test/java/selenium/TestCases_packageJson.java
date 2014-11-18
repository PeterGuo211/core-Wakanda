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

public class TestCases_packageJson extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCases_packageJson.class, "/customWidgetsSolution/customWidgetsSolution Solution/customWidgetsSolution.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/index/");
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {}
	}

	@Test
	public void test_externalCSS() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1').css('background-color') +'';");
		assertEquals("Check background-color set with external Css", "rgb(255, 0, 0)", result);
	}
	
	@Test
	public void test_externalJS() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check log set with external JS", " initialized in runtime", result);
	}
	
}
