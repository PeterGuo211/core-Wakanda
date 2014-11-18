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

public class WListViewSize extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		//selenium.waitImplicitly(5);
startServer(WListViewSize.class, "/wListViewRuntime/wListViewRuntime Solution/wListViewRuntime.waSolution");
		
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/Size.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
	}
	

		
		//------------------------------------------------------------------------
								// Desktop Events
		//------------------------------------------------------------------------

	//@Test
	public void testwidth_method() throws InterruptedException
	{
		
		selenium.getDriver().findElement(By.id("width")).click();
		
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("1040", myResult);
	}
	@Test
	public void testheight_method() throws InterruptedException
	{
		
		selenium.getDriver().findElement(By.id("height")).click();
		
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("533", myResult);
	}
	//@Test
	public void testsizeW_method() throws InterruptedException
	{
		
		selenium.getDriver().findElement(By.id("sizeW")).click();
		
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("1040", myResult);
	}
	@Test
	public void testsizeH_method() throws InterruptedException
	{
		
		selenium.getDriver().findElement(By.id("sizeH")).click();
		
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("533", myResult);
	}
	@Test
	public void testautoHeight_method() throws InterruptedException
	{
		
		selenium.getDriver().findElement(By.id("autoHeight")).click();
		
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("auto", myResult);
	}
	@Test
	public void testautoWidth_method() throws InterruptedException
	{
		
		selenium.getDriver().findElement(By.id("autoWidth")).click();
		
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("auto", myResult);
	}
	

}

