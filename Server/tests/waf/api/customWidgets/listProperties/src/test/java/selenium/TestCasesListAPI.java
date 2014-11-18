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

public class TestCasesListAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		startServer(TestCasesListAPI.class, "/PropertiesListSolution/PropertiesListSolution Solution/PropertiesListSolution.waSolution");
		
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
    public void testListAPI_count() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("count")).click();
		Thread.sleep(1000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("5", myResult);
    }
    
    @Test
    public void testListAPI_first() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("first")).click();
		Thread.sleep(1000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("age:48", myResult);
    }

    @Test
    public void testListAPI_last() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("last")).click();
		Thread.sleep(1000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("hobby:l7areb", myResult);
    }
    
    @Test
    public void testListAPI_remove() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("remove")).click();
		Thread.sleep(1000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("removed", myResult);
    }
    
    @Test
    public void testListAPI_removeAll() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("removeAll")).click();
		Thread.sleep(1000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("removedAll", myResult);
    }
    
    @Test
    public void testListAPI_shift() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("shift")).click();
		Thread.sleep(1000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("removed", myResult);
    }
    
    @Test
    public void testListAPI_pop() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("pop")).click();
		Thread.sleep(1000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("removed", myResult);
    }
    
    @Test
    public void testListAPI_insert() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("insert")).click();
		Thread.sleep(1000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("inserted", myResult);
    }
    
    @Test
    public void testListAPI_push() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("push")).click();
		Thread.sleep(1000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("pushed", myResult);
    }
    
    @Test
    public void testListAPI_move() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("move")).click();
		Thread.sleep(1000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("moved", myResult);
    }
    
    @Test
    public void testListAPI_concat() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("concat")).click();
		Thread.sleep(1000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("concated", myResult);
    }
    
    @Test
    public void testListAPI_propertyName() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("propertyName")).click();
		Thread.sleep(1000);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		
		assertEquals("success", myResult);
    }
}
