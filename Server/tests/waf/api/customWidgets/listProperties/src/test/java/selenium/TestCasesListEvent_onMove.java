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

public class TestCasesListEvent_onMove extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		startServer(TestCasesListAPI.class, "/PropertiesListSolution/PropertiesListSolution Solution/PropertiesListSolution.waSolution");
	} 
     
    /*  onMove Event Test cases */
    
    @Before
    public void beforeTest_onMoveEvent(){
		selenium.getDriver().get("http://127.0.0.1:8082/onMoveEvent/");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
    }
    
    @Test
    public void testListEvent_onMove_move() throws InterruptedException 
    {
		selenium.getDriver().findElement(By.id("move")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("onMove", myResult);
    }
}
