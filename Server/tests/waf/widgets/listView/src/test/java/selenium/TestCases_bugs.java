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

public class TestCases_bugs extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesListviewEvents.class, "/solutions/widgetListview/widgetListview Solution/widgetListview.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
	}

	@Test
	public void test_WAK0086984_unselectedItems() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		selenium.getDriver().findElement(By.id("clone-row1-3-0")).click();
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('.waf-state-selected').length +'';");
		assertEquals("Check how many entity is selected", "1", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#clone-row1-3-0').hasClass('waf-state-selected') +'';");
		assertEquals("Check if right entity is selected", "true", result);
	}
		
}
