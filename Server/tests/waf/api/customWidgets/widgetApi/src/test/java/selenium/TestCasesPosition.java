package selenium;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

import static org.wakanda.common.server.AdminCommand.startServer;

public class TestCasesPosition extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		//selenium.waitImplicitly(5);
	startServer(TestCasesPosition.class, "/widgetApiSolution/customWidgetsSolution Solution/customWidgetsSolution.waSolution");
		
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/index.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
	}
	

		
		//------------------------------------------------------------------------
								// Desktop Events
		//------------------------------------------------------------------------

		@Test
		public void testfitToTop_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("fitToTop")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("0px", myResult);
		}
		@Test
		public void testfitToLeft_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("fitToLeft")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("0px", myResult);
		}
		@Test
		public void testfitToRight_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("fitToRight")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("0px", myResult);
		}
		@Test
		public void Top_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("Top")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("50px", myResult);
		}
		@Test
		public void Left_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("Left")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("50px", myResult);
		}
		@Test
		public void Right_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("Right")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("50px", myResult);
		}
		

	}
	
