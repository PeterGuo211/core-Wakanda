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

public class TestCasesDatasourceAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		startServer(TestCasesDatasourceAPI.class, "/PropertiesDatasourceSolution/PropertiesDatasourceSolution Solution/PropertiesDatasourceSolution.waSolution");
		
	} 
  
    @Before
    public void beforeTest(){
		selenium.getDriver().get("http://127.0.0.1:8081/");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 10);
    }
    //------------------------------------------------------------------------
    // Specific API
    //------------------------------------------------------------------------
    
    @Test
    public void testDatasourceAPI_attributes() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("attributes")).click();
		Thread.sleep(10000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("success", myResult);
    }
    
    @Test
    public void testListAPI_attributeFor() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("attributeFor")).click();
		Thread.sleep(10000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("success", myResult);
    }

    @Test
    public void testListAPI_getCollection() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("getCollection")).click();
		Thread.sleep(10000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("success", myResult);
    }
    
    @Test
    public void testListAPI_mapElement() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("mapElement")).click();
		Thread.sleep(10000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("success", myResult);
    }
    
    @Test
    public void testListAPI_setMapping() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("setMapping")).click();
		Thread.sleep(10000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("success", myResult);
    }
    
    //@Test
    public void testListAPI_onCollectionChange() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("onCollectionChange")).click();
		Thread.sleep(10000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("success", myResult);
    }
}
