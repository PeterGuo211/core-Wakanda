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

public class TestCasesSmartphoneRouting_HTTPS extends SeleniumRuntimeTemplate {
	
	@BeforeClass
	public static void beforeClass() throws URISyntaxException, IOException 
	{
		selenium =  getSeleniumUtility();
		selenium.createChromeDriver(UserAgents.smartphone_iphone, true);
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesSmartphoneRouting_HTTPS.class, "/solutions/waPageRouting/waPageRouting Solution/waPageRouting.waSolution");
	}
	
	@Test
	public void test_root() throws InterruptedException {
		selenium.getDriver().get("https://127.0.0.1:4444?cacheBreaker"+System.currentTimeMillis());
			try{
		selenium.getDriver().findElement(By.id("smartBtt"));
			}catch(Exception e){
		assertEquals("Fail to get https://127.0.0.1:4444 : ", true, false);		
			}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('smartBtt').getPosition().left +'/'+ $$('smartBtt').getPosition().top");
		assertEquals("Check if smartBtt has right index.css : ", "30/30", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue() + ''");
		assertEquals("Check if smartBtt has right index.js : ", "index.waPage/scripts/index-smartphone.js", result);		
	}

	@Test
	public void test_root2() throws InterruptedException {
		selenium.getDriver().get("https://127.0.0.1:4444/?cacheBreaker"+System.currentTimeMillis());
			try{
		selenium.getDriver().findElement(By.id("smartBtt"));
			}catch(Exception e){
		assertEquals("Fail to get https://127.0.0.1:4444/ : ", true, false);		
			}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('smartBtt').getPosition().left +'/'+ $$('smartBtt').getPosition().top");
		assertEquals("Check if smartBtt has right index.css : ", "30/30", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue() + ''");
		assertEquals("Check if smartBtt has right index.js : ", "index.waPage/scripts/index-smartphone.js", result);		
	}
	
	@Test
	public void test_index() throws InterruptedException {
		selenium.getDriver().get("https://127.0.0.1:4444/index?cacheBreaker"+System.currentTimeMillis());
			try{
		selenium.getDriver().findElement(By.id("smartBtt"));
			}catch(Exception e){
		assertEquals("Fail to get https://127.0.0.1:4444/index : ", true, false);		
			}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('smartBtt').getPosition().left +'/'+ $$('smartBtt').getPosition().top");
		assertEquals("Check if smartBtt has right index.css : ", "30/30", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue() + ''");
		assertEquals("Check if smartBtt has right index.js : ", "index.waPage/scripts/index-smartphone.js", result);		
	}
	
	@Test
	public void test_index2() throws InterruptedException {
		selenium.getDriver().get("https://127.0.0.1:4444/index/?cacheBreaker"+System.currentTimeMillis());
			try{
		selenium.getDriver().findElement(By.id("smartBtt"));
			}catch(Exception e){
		assertEquals("Fail to get https://127.0.0.1:4444/index/ : ", true, false);		
			}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('smartBtt').getPosition().left +'/'+ $$('smartBtt').getPosition().top");
		assertEquals("Check if smartBtt has right index.css : ", "30/30", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue() + ''");
		assertEquals("Check if smartBtt has right index.js : ", "index.waPage/scripts/index-smartphone.js", result);		
	}

	@Test
	public void test_indexWaPage() throws InterruptedException {
		selenium.getDriver().get("https://127.0.0.1:4444/index.waPage?cacheBreaker"+System.currentTimeMillis());
			try{
		selenium.getDriver().findElement(By.id("smartBtt"));
			}catch(Exception e){
		assertEquals("Fail to get https://127.0.0.1:4444/index.waPage : ", true, false);		
			}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('smartBtt').getPosition().left +'/'+ $$('smartBtt').getPosition().top");
		assertEquals("Check if smartBtt has right index.css : ", "30/30", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue() + ''");
		assertEquals("Check if smartBtt has right index.js : ", "index.waPage/scripts/index-smartphone.js", result);		
	}
	
	@Test
	public void test_indexWaPage2() throws InterruptedException {
		selenium.getDriver().get("https://127.0.0.1:4444/index.waPage/?cacheBreaker"+System.currentTimeMillis());
			try{
		selenium.getDriver().findElement(By.id("smartBtt"));
			}catch(Exception e){
		assertEquals("Fail to get https://127.0.0.1:4444/index.waPage/ : ", true, false);		
			}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('smartBtt').getPosition().left +'/'+ $$('smartBtt').getPosition().top");
		assertEquals("Check if smartBtt has right index.css : ", "30/30", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue() + ''");
		assertEquals("Check if smartBtt has right index.js : ", "index.waPage/scripts/index-smartphone.js", result);		
	}
	
	@Test
	public void test_indexHtml() throws InterruptedException {
		selenium.getDriver().get("https://127.0.0.1:4444/index.waPage/index-smartphone.html?cacheBreaker"+System.currentTimeMillis());
			try{
		selenium.getDriver().findElement(By.id("smartBtt"));
			}catch(Exception e){
		assertEquals("Fail to get https://127.0.0.1:4444/index.waPage/index-smartphone.html : ", true, false);		
			}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('smartBtt').getPosition().left +'/'+ $$('smartBtt').getPosition().top");
		assertEquals("Check if smartBtt has right index.css : ", "30/30", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue() + ''");
		assertEquals("Check if smartBtt has right index.js : ", "index.waPage/scripts/index-smartphone.js", result);		
	}
}
