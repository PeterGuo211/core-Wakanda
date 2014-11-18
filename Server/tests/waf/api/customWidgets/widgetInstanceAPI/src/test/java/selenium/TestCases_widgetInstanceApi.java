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

public class TestCases_widgetInstanceApi extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		startServer(TestCases_widgetInstanceApi.class, "/WidgetApiSol/WidgetApiSol Solution/WidgetApiSol.waSolution");
		
	} 
  
    @Before
    public void beforeTest(){
		selenium.getDriver().get("http://127.0.0.1:8081/");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
    }
    //------------------------------------------------------------------------
    // Specific API
    //------------------------------------------------------------------------
    
    @Test
    public void testInstanceApi_disable() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("disable")).click();
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.id("test1")).click();
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("success", myResult);
    }
    
    @Test
    public void testInstanceApi_disabled() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("disabled")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("disabled", myResult);
    }
    
    @Test
    public void testInstanceApi_enable() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("enable")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("success", myResult);
    }
    
    @Test
    public void testInstanceApi_getNode() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("getNode")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("success", myResult);
    }
    
    @Test
    public void testInstanceApi_children() throws InterruptedException 
    {
		
    }
    
    @Test
    public void testInstanceApi_allChildren() throws InterruptedException 
    {
		
    }
    
    
}
