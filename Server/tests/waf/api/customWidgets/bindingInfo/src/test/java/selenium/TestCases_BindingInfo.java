package selenium;

import static org.junit.Assert.assertEquals;
import static org.wakanda.common.server.AdminCommand.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;

import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCases_BindingInfo extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		startServer(TestCases_BindingInfo.class, "/getBindingInfo/getBindingInfo Solution/getBindingInfo.waSolution");
		
	} 
  
   
    public static void launchHTMLPage(String url){
		selenium.getDriver().get(url);
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
    }
    
    //------------------------------------------------------------------------
    // bindDatasource method
    //------------------------------------------------------------------------
    
    @Test
    public void bindDatasource_with_string_prop() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
        	
    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String result = (String) js.executeScript("return $('#test1').text();");
		assertEquals("mohcine", result);
	 
    }
    
    @Test
    public void bindDatasource_with_integer_prop() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
    	
    	selenium.getDriver().findElement(By.id("bindDatasource_integer")).click();
		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String result = (String) js.executeScript("return $('#test1').text();");
		assertEquals("24", result);
    }
    
    @Test
    public void bindDatasource_with_bool_prop() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
    	
    	selenium.getDriver().findElement(By.id("bindDatasource_bool")).click();
		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		Boolean result = (Boolean) js.executeScript("return $$('test1').boolProp();");
		assertEquals(true, result);
    }
    
    @Test
    public void bindDatasource_with_enum_prop() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
    	
    	selenium.getDriver().findElement(By.id("bindDatasource_enum")).click();
		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String result = (String) js.executeScript("return $$('test1').enumProp();");
		assertEquals("mohcine", result);
    }
    
    
    //------------------------------------------------------------------------
    // boundDatasource method
    //------------------------------------------------------------------------
    
    
    @Test
    public void boundDatasource_with_string_prop_using_bindDatasource() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
    	
    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String datasourceName = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().datasourceName");
		String attribute = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().attribute");
		
		assertEquals("dataClass1_name", datasourceName+"_"+attribute);
	 
    }
    
    @Test
    public void boundDatasource_with_integer_prop_using_bindDatasource() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
    	
    	selenium.getDriver().findElement(By.id("bindDatasource_integer")).click();
		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String datasourceName = (String) js.executeScript("return $$('test1').integerProp.boundDatasource().datasourceName");
		String attribute = (String) js.executeScript("return $$('test1').integerProp.boundDatasource().attribute");
		
		assertEquals("dataClass1_age", datasourceName+"_"+attribute);
    }
    
    @Test
    public void boundDatasource_with_bool_prop_using_bindDatasource() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
    	
    	selenium.getDriver().findElement(By.id("bindDatasource_bool")).click();
		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String datasourceName = (String) js.executeScript("return $$('test1').boolProp.boundDatasource().datasourceName");
		String attribute = (String) js.executeScript("return $$('test1').boolProp.boundDatasource().attribute");
		
		assertEquals("dataClass1_ok", datasourceName+"_"+attribute);
    }
    
    @Test
    public void boundDatasource_with_enum_prop_using_bindDatasource() throws InterruptedException 
    {
    	launchHTMLPage("http://127.0.0.1:8081/index.waPage/index.html");
    	
    	selenium.getDriver().findElement(By.id("bindDatasource_enum")).click();
		Thread.sleep(500);
		
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String datasourceName = (String) js.executeScript("return $$('test1').enumProp.boundDatasource().datasourceName");
		String attribute = (String) js.executeScript("return $$('test1').enumProp.boundDatasource().attribute");
		
		assertEquals("dataClass1_name", datasourceName+"_"+attribute);
    }
    
    @Test
    public void boundDatasource_with_stringProp_sourceFromGuiD(){
    	
    	launchHTMLPage("http://127.0.0.1:8081/sourceFromGuiD");
    	
    	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String datasourceName = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().datasourceName");
		String attribute = (String) js.executeScript("return $$('test1').stringProp.boundDatasource().attribute");
		
		assertEquals("dataClass2_name", datasourceName+"_"+attribute);
    }
    
    @Test
    public void boundDatasource_with_integerProp_sourceFromGuiD(){
    	
    	launchHTMLPage("http://127.0.0.1:8081/sourceFromGuiD");
    	
    	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String datasourceName = (String) js.executeScript("return $$('test1').integerProp.boundDatasource().datasourceName");
		String attribute = (String) js.executeScript("return $$('test1').integerProp.boundDatasource().attribute");
		
		assertEquals("dataClass2_age", datasourceName+"_"+attribute);
    }
    
    @Test
    public void boundDatasource_with_boolProp_sourceFromGuiD(){
    	
    	launchHTMLPage("http://127.0.0.1:8081/sourceFromGuiD");
    	
    	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String datasourceName = (String) js.executeScript("return $$('test1').boolProp.boundDatasource().datasourceName");
		String attribute = (String) js.executeScript("return $$('test1').boolProp.boundDatasource().attribute");
		
		assertEquals("dataClass2_ok", datasourceName+"_"+attribute);
    }
    
    @Test
    public void boundDatasource_with_enumProp_sourceFromGuiD(){
    	
		launchHTMLPage("http://127.0.0.1:8081/sourceFromGuiD");
    	
    	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String datasourceName = (String) js.executeScript("return $$('test1').enumProp.boundDatasource().datasourceName");
		String attribute = (String) js.executeScript("return $$('test1').enumProp.boundDatasource().attribute");
		
		assertEquals("dataClass2_name", datasourceName+"_"+attribute);
    }
    
    @Test
    public void boundDatasource_with_datasouceProp_sourceFromGUID(){
    	launchHTMLPage("http://127.0.0.1:8081/sourceFromGuiD");
    	
    	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String datasourceName = (String) js.executeScript("return $$('test1').datasourceProp.boundDatasource().datasourceName");
				
		assertEquals("dataClass2", datasourceName);
    }
    
    @Test
    public void boundDatasource_with_datasouceProp_attributes_sourceFromGUID(){
    	launchHTMLPage("http://127.0.0.1:8081/sourceFromGuiD");
    	
    	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String label_attr = (String) js.executeScript("return $$('test1').datasourceProp.boundDatasource().attributes.label.attribute");
		String value_attr = (String) js.executeScript("return $$('test1').datasourceProp.boundDatasource().attributes.value.attribute");
		
		assertEquals("age_name", label_attr+"_"+value_attr);
    }
    
    //------------------------------------------------------------------------
    // unbindDatasource method
    //------------------------------------------------------------------------
    
    @Test
    public void unbindDatasource_with_stringProp_using_bindDatasource() throws InterruptedException{
    	
    	launchHTMLPage("http://127.0.0.1:8081/index");
    	
    	selenium.getDriver().findElement(By.id("bindDatasource_string")).click();
		Thread.sleep(500);
    	
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').stringProp.unbindDatasource('dataClass1.name')");
		String result = (String) js.executeScript("return $$('test1').enumProp.boundDatasource()");
		
		assertEquals(null, result);
    	
    }
    
    @Test
    public void unbindDatasource_with_integerProp_using_bindDatasource() throws InterruptedException{
    	
    	launchHTMLPage("http://127.0.0.1:8081/index");
    	
    	selenium.getDriver().findElement(By.id("bindDatasource_integer")).click();
		Thread.sleep(500);
    	
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').integerProp.unbindDatasource('dataClass1.age')");
		String result = (String) js.executeScript("return $$('test1').integerProp.boundDatasource()");
		
		assertEquals(null, result);
    	
    }
    
    @Test
    public void unbindDatasource_with_boolProp_using_bindDatasource() throws InterruptedException{
    	
    	launchHTMLPage("http://127.0.0.1:8081/index");
    	
    	selenium.getDriver().findElement(By.id("bindDatasource_bool")).click();
		Thread.sleep(500);
    	
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').boolProp.unbindDatasource('dataClass1.ok')");
		String result = (String) js.executeScript("return $$('test1').boolProp.boundDatasource()");
		
		assertEquals(null, result);
    	
    }
    
    @Test
    public void unbindDatasource_with_enumProp_using_bindDatasource() throws InterruptedException{
    	
    	launchHTMLPage("http://127.0.0.1:8081/index");
    	
    	selenium.getDriver().findElement(By.id("bindDatasource_enum")).click();
		Thread.sleep(500);
    	
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').enumProp.unbindDatasource('dataClass1.name')");
		String result = (String) js.executeScript("return $$('test1').enumProp.boundDatasource()");
		
		assertEquals(null, result);
    	
    }
    
    @Test
    public void unbindDatasource_with_stringProp_datasourceFromGUID() throws InterruptedException{
    	
    	launchHTMLPage("http://127.0.0.1:8081/sourceFromGuiD");
    	
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').stringProp.unbindDatasource('dataClass2.name')");
		String result = (String) js.executeScript("return $$('test1').stringProp.boundDatasource()");
		
		assertEquals(null, result);
    	
    }
    
    @Test
    public void unbindDatasource_with_integerProp_datasourceFromGUID() throws InterruptedException{
    	
    	launchHTMLPage("http://127.0.0.1:8081/sourceFromGuiD");
    	
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').integerProp.unbindDatasource('dataClass2.age')");
		String result = (String) js.executeScript("return $$('test1').integerProp.boundDatasource()");
		
		assertEquals(null, result);
    	
    }
    
    @Test
    public void unbindDatasource_with_boolProp_datasourceFromGUID() throws InterruptedException{
    	
    	launchHTMLPage("http://127.0.0.1:8081/sourceFromGuiD");
  
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').boolProp.unbindDatasource('dataClass2.ok')");
		String result = (String) js.executeScript("return $$('test1').boolProp.boundDatasource()");
		
		assertEquals(null, result);
    	
    }
    
    @Test
    public void unbindDatasource_with_enumProp_datasourceFromGUID() throws InterruptedException{
    	
    	launchHTMLPage("http://127.0.0.1:8081/sourceFromGuiD");
    	
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		js.executeScript("$$('test1').enumProp.unbindDatasource('dataClass2.name')");
		String result = (String) js.executeScript("return $$('test1').enumProp.boundDatasource()");
		
		assertEquals(null, result);
    	
    }
}
