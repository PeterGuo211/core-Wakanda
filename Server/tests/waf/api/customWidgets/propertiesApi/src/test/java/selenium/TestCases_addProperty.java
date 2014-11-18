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

public class TestCases_addProperty extends SeleniumRuntimeTemplate {
	
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		startServer(TestCases_addProperty.class, "/propertiesApiSolution/propertiesApiSolution Solution/propertiesApiSolution.waSolution");
		
	} 
  
    @Before
    public void beforeTest(){
		selenium.getDriver().get("http://127.0.0.1:8081/");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
    }
    //------------------------------------------------------------------------
    // Tests nominaux 
    //------------------------------------------------------------------------
    
    @Test
    public void testAddProperty_boolean() throws InterruptedException 
    {
		Thread.sleep(500);
		Object myResult = selenium.getJsConsole().executeScript("return $$('test1').boolProp();");
		assertEquals( null , myResult);
    }
    
    @Test
    public void testAddProperty_string() throws InterruptedException 
    {
		Thread.sleep(500);
		Object myResult = selenium.getJsConsole().executeScript("return $$('test1').stringProp();");
		assertEquals( null , myResult);
    }
    
    @Test
    public void testAddProperty_integer() throws InterruptedException 
    {
		Thread.sleep(500);
		Object myResult = selenium.getJsConsole().executeScript("return $$('test1').integerProp();");
		assertEquals( null , myResult);
    }
    
    @Test
    public void testAddProperty_list() throws InterruptedException 
    {
		Thread.sleep(500);
		long myResult =  (Long) selenium.getJsConsole().executeScript("return $$('test1').listProp().length;");
		assertEquals(  0 , (int) myResult);
    }
    
    @Test
    public void testAddProperty_enum() throws InterruptedException 
    {
		Thread.sleep(500);
		Object myResult = selenium.getJsConsole().executeScript("return $$('test1').enumProp();");
		assertEquals( "blank" , myResult);
    }
    
    @Test
    public void testAddProperty_datasource() throws InterruptedException 
    {
		Thread.sleep(500);
		Object myResult = selenium.getJsConsole().executeScript("return $$('test1').datasourceProp();");
		assertEquals( null , myResult);
    }
    
    
    //------------------------------------------------------------------------
    //  Ces tests vérifient l'existence de l'attribut "data-{propertyName" dans le DOM  
    //------------------------------------------------------------------------
   

    
 	@Test
 	public void testAddProperty_bool_creationDOM() throws InterruptedException{
 		Thread.sleep(500);
 		Object result = selenium.getJsConsole().executeScript("return $$('test2').node.getAttribute('data-boolprop');");
 		assertEquals(result, "true");
 	}
 	@Test
 	public void testAddProperty_integer_creationDOM() throws InterruptedException{
 		Thread.sleep(500);
 		Object result = selenium.getJsConsole().executeScript("return $$('test2').node.getAttribute('data-integerprop');");
 		assertEquals(result, "10");
 	}

 	@Test
 	public void testAddProperty_string_creationDOM() throws InterruptedException{
 		Thread.sleep(500);
 		Object result = selenium.getJsConsole().executeScript("return $$('test2').node.getAttribute('data-stringprop');");
 		assertEquals(result, "test");
 	}

 	@Test
 	public void testAddProperty_enum_creationDOM() throws InterruptedException{
 		Thread.sleep(500);
 		Object result = selenium.getJsConsole().executeScript("return $$('test2').node.getAttribute('data-enumprop');");
 		assertEquals(result, "blank");
 	}

 	@Test
 	public void testAddProperty_list_creationDOM() throws InterruptedException{
 		Thread.sleep(500);
 		Object result = selenium.getJsConsole().executeScript("return $$('test2').node.getAttribute('data-listprop');");
 		assertEquals(result, "[{\"value\":\"tocatoca\",\"label\":\"name\"}]");
 	}

 	@Test
 	public void testAddProperty_datasource_creationDOM() throws InterruptedException{
 		Thread.sleep(500);
 		Object result = selenium.getJsConsole().executeScript("return $$('test2').node.getAttribute('data-datasourceprop');");
 		assertEquals(result, "myDatasource");
 	}

    
}
