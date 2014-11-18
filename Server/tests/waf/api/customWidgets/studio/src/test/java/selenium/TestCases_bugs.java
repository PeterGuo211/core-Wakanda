package selenium;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCases_bugs extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCases_bugs.class, "/customWidgetsSolution/customWidgetsSolution Solution/customWidgetsSolution.waSolution");
	}

	@Test
	public void test_WAK0086472_jsNotWorkingWhenWidgetInContainer() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/inContainer/");
		Thread.sleep(500);
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getJsConsole().executeScript("$$('testStudio1').testMethod();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check widget working when inside a container", " wrap doBefore addMethod doAfter", result);
	}
}
