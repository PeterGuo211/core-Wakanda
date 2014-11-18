package selenium;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCases_bugs extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCases_bugs.class, "/BehaviorContainer/Untitled Solution/BehaviorContainer.waSolution");
	}

	@Test
	public void test_WAK0088462_detachWidgetWithLabel() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/WAK0088462/?cacheBreaker"+System.currentTimeMillis());
		selenium.getJsConsole().executeScript("$$('container1').detachAllWidgets();");
		
		try{
		selenium.getDriver().findElement(By.id("hyperlink1"));
		assertEquals("Check if widget is detach", "false", "true");
		}catch(Exception e){}
		try{
		selenium.getDriver().findElement(By.id("label1"));
		assertEquals("Check if label is detach", "false", "true");
		}catch(Exception e){}
	}
	
	@Test //TODO detachAllWidgets() does not impact label which is considered as another widget. Will be re-think by Program owners.
	public void test_WAK0088462_reattachWidgetWithLabel() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/WAK0088462/?cacheBreaker"+System.currentTimeMillis());
		selenium.getJsConsole().executeScript("$$('container1').detachAllWidgets();");
		selenium.getJsConsole().executeScript("$$('container1').attachWidget($$('hyperlink1'));");
		
		try{
		selenium.getDriver().findElement(By.id("hyperlink1"));
		//selenium.getDriver().findElement(By.id("label1"));
		}catch(Exception e){
		assertEquals("Check if widget and label are reattach", "true", "false");
		}
		String result = (String) selenium.getJsConsole().executeScript("return $$('container1').lastWidget().id +'';");				
		assertEquals("Get last attached subWidget", "hyperlink1", result);	
	}
		
}
