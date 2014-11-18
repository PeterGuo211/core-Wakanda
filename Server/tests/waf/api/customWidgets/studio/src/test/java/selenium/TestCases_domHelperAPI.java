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

public class TestCases_domHelperAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCases_domHelperAPI.class, "/customWidgetsSolution/customWidgetsSolution Solution/customWidgetsSolution.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/index/");
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {}
	}

	@Test
	public void test_mapDomEvents() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getDriver().findElement(By.xpath("//*[@id='testStudio1']/img")).click();
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check mapDomEvents(); map 'click' to 'create'", " create event", result);
	}
}
