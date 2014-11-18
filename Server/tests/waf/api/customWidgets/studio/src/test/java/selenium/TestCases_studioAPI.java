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

public class TestCases_studioAPI extends SeleniumRuntimeTemplate {
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
	public void test_addLabel() throws InterruptedException {
		selenium.getDriver().findElement(By.id("label1"));
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#label1').text() +' '+ $('#label1').position().left +'/'+ $('#label1').position().top;");
		assertEquals("Check label text and position", "Toolbar 32/5", result);
	}
		
	@Test
	public void test_setHeight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1').height() +'';");
		assertEquals("Check widget height", "20", result);
	}
	
	@Test
	public void test_setWidth() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1').width() +'';");
		assertEquals("Check widget width", "60", result);
	}
}
