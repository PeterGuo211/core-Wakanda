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

public class TestCasesSection_general extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesSectionEvents.class, "/solutions/widgetSection/widgetSection Solution/widgetSection.waSolution");

	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/general.waPage/index-tablet.html");
	}
/*
	@Test
	public void test_inputDefaultDisplay() throws InterruptedException {
		selenium.getDriver().findElement(By.id("section1"));
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#textField2').width() +'/'+ $('#textField2').height();");
		assertEquals("Check section input size (width/height)", "117/40", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#textField2').position().left +'/'+ $('#textField2').position().top;");
		assertEquals("Check section input position (x/y)", "57/0", result);
	}
	*/
	@Test
	public void test_switchboxDefaultDisplay() throws InterruptedException {
		selenium.getDriver().findElement(By.id("section1"));
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#switchbox2').width() +'/'+ $('#switchbox2').height();");
		assertEquals("Check section switchbox size (width/height)", "77/27", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#switchbox2').position().left +'/'+ $('#switchbox2').position().top;");
		assertEquals("Check section switchbox position (x/y)", "215/5", result);
	}
	
	@Test
	public void test_defaultEntity() throws InterruptedException {
		selenium.getDriver().findElement(By.id("section1"));
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField2').getValue() +'';");
		assertEquals("Check section input value", "Jean", result);

		result = (String) selenium.getJsConsole().executeScript("return $$('switchbox2').getValue() +'';");
		assertEquals("Check section switchbox value", "false", result);
	}
	
	@Test
	public void test_selectedEntity() throws InterruptedException {
		selenium.getDriver().findElement(By.id("section1"));
		Thread.sleep(500);
		selenium.getDriver().findElement(By.id("clone-row1-1-0")).click();
		Thread.sleep(500);

		String result = (String) selenium.getJsConsole().executeScript("return $$('textField2').getValue() +'';");
		assertEquals("Check section input value", "Sebastien", result);

		//	Wait for the switchbox animation ending. The new switchbox value is set at the end of the animation
		long timeFrom = System.currentTimeMillis();
		long timeNow;
		do {
			timeNow = System.currentTimeMillis();
			String waitFor = (String) selenium.getJsConsole().executeScript("return $$('switchbox2').getValue() +'';");
			if (waitFor.equals("true"))
				break;
			Thread.sleep(100);
		} while (timeNow < (timeFrom+5000));
		
		result = (String) selenium.getJsConsole().executeScript("return $$('switchbox2').getValue() +'';");
		assertEquals("Check section switchbox value", "true", result);
	}

}