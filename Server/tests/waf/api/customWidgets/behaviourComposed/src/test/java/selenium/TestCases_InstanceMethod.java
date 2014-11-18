package selenium;

import static org.junit.Assert.assertEquals;
import static org.wakanda.common.server.AdminCommand.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;

import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCases_InstanceMethod extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		startServer(TestCases_InstanceMethod.class, "/Composed/Composed Solution/Composed.waSolution");
		
	} 
  
   @Before
    public void launchHTMLPage(){
		selenium.getDriver().get("http://127.0.0.1:8081/index/");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
    }
    
    //------------------------------------------------------------------------
    // instance method by Mohcine ELBOUAZZI
    //------------------------------------------------------------------------
    
    @Test
    public void testcase_getParts()
    {
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		Object result =  js.executeScript("return $$('composed21').getParts();");
		assertEquals("[part2, part3, part1]", result.toString());
	 
    }
    
    @Test
    public void testcase_getParts_with_setPart(){
    
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("return $$('composed21').setPart('part4',$$('text1'));");
		Object result =  js.executeScript("return $$('composed21').getParts();");
		assertEquals("[part2, part3, part1, part4]", result.toString());
    }
    
    @Test
    public void testcase_getPart(){
    	
    	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String result = (String) js.executeScript("return $$('composed21').getPart('part1').id;");
		assertEquals("widget1", result);
    }
    
    @Test
    public void testcase_getPart_with_setPart(){
    	
    	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
    	js.executeScript("return $$('composed21').setPart('part4',$$('text1'));");
		String result = (String) js.executeScript("return $$('composed21').getPart('part4').id;");
		assertEquals("text1", result);
    }
    
    @Test
    public void testcase_removePart(){
    	
    	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("return $$('composed21').removePart('part1');");
		Object result = js.executeScript("return $('#composed21 #text4');");
		assertEquals("[]", result.toString());
    }
    
    @Test
    public void testcase_removePart_with_setPart(){
    	
    	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
    	js.executeScript("return $$('composed21').setPart('part4',$$('text1'));");
		js.executeScript("return $$('composed21').removePart('part4');");
		Object result = js.executeScript("return $('#composed21 #text1');");
		assertEquals("[]", result.toString());
    }
    
    @Test
    public void testcase_setPart(){
    	
    	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("return $$('composed21').setPart('part4',$$('text1'));");
		String result = (String) js.executeScript("return $$('composed21').getPart('part4').id;");
		assertEquals("text1", result);
    }
   
}
