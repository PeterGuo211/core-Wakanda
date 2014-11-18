package selenium;

import static org.junit.Assert.assertEquals;
import static org.wakanda.common.server.AdminCommand.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesWidget extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		//selenium.waitImplicitly(5);
startServer(TestCasesWidget.class, "/widgetApiSolution/customWidgetsSolution Solution/customWidgetsSolution.waSolution");
		
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/widget.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
	}
	

		
		//------------------------------------------------------------------------
								// Desktop Events
		//------------------------------------------------------------------------

	@Test
	public void tagName_method() throws InterruptedException
	{
		
		selenium.getDriver().findElement(By.id("tagName")).click();
		//Thread.sleep(10000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("INPUT", myResult);
	}
	@Test
	public void testisWidget_method() throws InterruptedException
	{
		
		selenium.getDriver().findElement(By.id("isWidget")).click();
		//Thread.sleep(10000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("true", myResult);
	}
	@Test
	public void testisWidgetClass_method() throws InterruptedException
	{
		
		selenium.getDriver().findElement(By.id("isWidgetClass")).click();
		Thread.sleep(10000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("true", myResult);
	}
	

}

