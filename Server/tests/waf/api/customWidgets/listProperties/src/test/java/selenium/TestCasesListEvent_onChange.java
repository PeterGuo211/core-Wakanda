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

public class TestCasesListEvent_onChange extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		startServer(TestCasesListAPI.class, "/PropertiesListSolution/PropertiesListSolution Solution/PropertiesListSolution.waSolution");
	} 
 
	
	/*  OnChange Event Test cases */
	
    @Before
    public void beforeTest_onChangeEvent(){
	selenium.getDriver().get("http://127.0.0.1:8082/onChangeEvent/");
	selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
    }
    
    @Test
    public void testListEvent_onChange_concat() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("concat")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onChange", myResult);
    }
    
    @Test
    public void testListEvent_onChange_insert() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("insert")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onChange", myResult);
    }
    
    @Test
    public void testListEvent_onChange_move() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("move")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onChange", myResult);
    }
    
    @Test
    public void testListEvent_onChange_pop() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("pop")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onChange", myResult);
    }
    
    @Test
    public void testListEvent_onChange_push() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("push")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onChange", myResult);
    }
    
    @Test
    public void testListEvent_onChange_remove() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("remove")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onChange", myResult);
    }
    
    @Test
    public void testListEvent_onChange_removeAll() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("removeAll")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onChange", myResult);
    }
    
    @Test
    public void testListEvent_onChange_shift() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("shift")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onChange", myResult);
    }
    

}
