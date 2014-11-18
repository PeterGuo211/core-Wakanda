package selenium;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.common.testing.UserAgents;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesTabletRouting_HTTP extends SeleniumRuntimeTemplate {
	
	@BeforeClass
	public static void beforeClass() throws URISyntaxException, IOException 
	{
		selenium =  getSeleniumUtility();
		selenium.createChromeDriver(UserAgents.tablet_ipad, true);
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesTabletRouting_HTTP.class, "/solutions/waPageRouting/waPageRouting Solution/waPageRouting.waSolution");
	}
	
	@Test
	public void test_root() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081?cacheBreaker"+System.currentTimeMillis());
			try{
		selenium.getDriver().findElement(By.id("tabletBtt"));
			}catch(Exception e){
		assertEquals("Fail to get http://127.0.0.1:8081 : ", true, false);		
			}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('tabletBtt').getPosition().left +'/'+ $$('tabletBtt').getPosition().top");
		assertEquals("Check if tabletBtt has right index.css : ", "20/20", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue() + ''");
		assertEquals("Check if tabletBtt has right index.js : ", "index.waPage/scripts/index-tablet.js", result);		
	}
	
	@Test
	public void test_root2() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/?cacheBreaker"+System.currentTimeMillis());
			try{
		selenium.getDriver().findElement(By.id("tabletBtt"));
			}catch(Exception e){
		assertEquals("Fail to get http://127.0.0.1:8081/ : ", true, false);		
			}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('tabletBtt').getPosition().left +'/'+ $$('tabletBtt').getPosition().top");
		assertEquals("Check if tabletBtt has right index.css : ", "20/20", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue() + ''");
		assertEquals("Check if tabletBtt has right index.js : ", "index.waPage/scripts/index-tablet.js", result);		
	}
	
	@Test
	public void test_index() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/index?cacheBreaker"+System.currentTimeMillis());
			try{
		selenium.getDriver().findElement(By.id("tabletBtt"));
			}catch(Exception e){
		assertEquals("Fail to get http://127.0.0.1:8081/index : ", true, false);		
			}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('tabletBtt').getPosition().left +'/'+ $$('tabletBtt').getPosition().top");
		assertEquals("Check if tabletBtt has right index.css : ", "20/20", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue() + ''");
		assertEquals("Check if tabletBtt has right index.js : ", "index.waPage/scripts/index-tablet.js", result);		
	}
	
	@Test
	public void test_index2() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/index/?cacheBreaker"+System.currentTimeMillis());
			try{
		selenium.getDriver().findElement(By.id("tabletBtt"));
			}catch(Exception e){
		assertEquals("Fail to get http://127.0.0.1:8081/index/ : ", true, false);		
			}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('tabletBtt').getPosition().left +'/'+ $$('tabletBtt').getPosition().top");
		assertEquals("Check if tabletBtt has right index.css : ", "20/20", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue() + ''");
		assertEquals("Check if tabletBtt has right index.js : ", "index.waPage/scripts/index-tablet.js", result);		
	}

	@Test
	public void test_indexWaPage() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/index.waPage?cacheBreaker"+System.currentTimeMillis());
			try{
		selenium.getDriver().findElement(By.id("tabletBtt"));
			}catch(Exception e){
		assertEquals("Fail to get http://127.0.0.1:8081/index.waPage : ", true, false);		
			}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('tabletBtt').getPosition().left +'/'+ $$('tabletBtt').getPosition().top");
		assertEquals("Check if tabletBtt has right index.css : ", "20/20", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue() + ''");
		assertEquals("Check if tabletBtt has right index.js : ", "index.waPage/scripts/index-tablet.js", result);		
	}
	
	@Test
	public void test_indexWaPage2() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/index.waPage/?cacheBreaker"+System.currentTimeMillis());
			try{
		selenium.getDriver().findElement(By.id("tabletBtt"));
			}catch(Exception e){
		assertEquals("Fail to get http://127.0.0.1:8081/index.waPage/ : ", true, false);		
			}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('tabletBtt').getPosition().left +'/'+ $$('tabletBtt').getPosition().top");
		assertEquals("Check if tabletBtt has right index.css : ", "20/20", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue() + ''");
		assertEquals("Check if tabletBtt has right index.js : ", "index.waPage/scripts/index-tablet.js", result);		
	}
	
	@Test
	public void test_indexHtml() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/index.waPage/index-tablet.html?cacheBreaker"+System.currentTimeMillis());
			try{
		selenium.getDriver().findElement(By.id("tabletBtt"));
			}catch(Exception e){
		assertEquals("Fail to get http://127.0.0.1:8081/index.waPage/index-tablet.html : ", true, false);		
			}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('tabletBtt').getPosition().left +'/'+ $$('tabletBtt').getPosition().top");
		assertEquals("Check if tabletBtt has right index.css : ", "20/20", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue() + ''");
		assertEquals("Check if tabletBtt has right index.js : ", "index.waPage/scripts/index-tablet.js", result);		
	}
}
