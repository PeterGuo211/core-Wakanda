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

public class TestCases_datasourcePrimaryKey extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCases_stringPrimaryKey.class, "/solutions/datasourceArray/datasourceArray Solution/datasourceArray.waSolution");

	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/dataclassPrimaryKey/");
	}

	@Test
	public void test_getKey() throws InterruptedException {
		selenium.getDriver().findElement(By.id("dataGrid1"));
		selenium.getJsConsole().executeScript("sources.employees.selectByKey(70);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return sources.employees.getKey() +'';");
		assertEquals("Check selectByKey() &  getKey()", "70", result);
	}
	
	@Test
	public void test_selectByKey() throws InterruptedException {
		selenium.getDriver().findElement(By.id("dataGrid1"));
		selenium.getJsConsole().executeScript("sources.employees.selectByKey(20);");
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("sources.employees.selectByKey(98);");
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("sources.employees.selectByKey(53);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return sources.employees.getKey() +'';");
		assertEquals("Check selectByKey() &  getKey()", "53", result);
	}
}
