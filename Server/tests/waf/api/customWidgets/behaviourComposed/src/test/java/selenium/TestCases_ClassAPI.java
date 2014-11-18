package selenium;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCases_ClassAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCases_ClassAPI.class, "/BehaviourComposed/composed Solution/composed.waSolution");
	}
	
	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/index.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
	}
	
	
	@Test
	public void setPart_method() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setPart")).click();
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("part", myResult);
	}
	@Test
	public void getParts_method() throws InterruptedException
	{
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
    	Object result1 =  js.executeScript("return $$('composed31').getParts();");
		assertEquals("[part, part1, part4, part2]", result1.toString());
	}

	@Test
	public void removePart_method() throws InterruptedException{
	    	
	    JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	    selenium.getDriver().findElement(By.id("removePart")).click();
	    js.executeScript("return $$('composed31').removePart('part2');");
		Object result1 =  js.executeScript("return $$('composed31').getParts();");
		assertEquals("[part, part1, part4]", result1.toString());
	 }
	@Test
	public void addProxiedMethods_prefixed_method() throws InterruptedException{
	    	
	   	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	   	selenium.getDriver().findElement(By.id("addProxiedMethods")).click();
	   	js.executeScript("return $$('composed31').prefHide();");
		Object result1 =  js.executeScript("return $$('text6').getNode().style.display;");
		assertEquals("none", result1.toString());
	 }
	@Test
	public void addProxiedMethods_suffixed_method() throws InterruptedException{
	    	
	   	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	   	selenium.getDriver().findElement(By.id("addProxiedMethods")).click();
	   	js.executeScript("return $$('composed31').hidesuff();");
		Object result1 =  js.executeScript("return $$('text6').getNode().style.display;");
		assertEquals("none", result1.toString());
	 }
	@Test
	public void addProxiedMethods_prefANDsuff_method() throws InterruptedException{
	    	
	   	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	   	selenium.getDriver().findElement(By.id("addProxiedMethods")).click();
	   	js.executeScript("return $$('composed31').prefHidesuff();");
		Object result1 =  js.executeScript("return $$('text6').getNode().style.display;");
		assertEquals("none", result1.toString());
	 }
	
	@Test
	public void addAliasProperty_method() throws InterruptedException{
	    	
	   	JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
	   	Object result1 =  js.executeScript("return $$('composed31').myAlias();");
		assertEquals("130", result1.toString());
	 }
	 
}