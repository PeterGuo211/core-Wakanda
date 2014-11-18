package selenium;

import static org.junit.Assert.*;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesNavigation_general extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesNavigationEvents.class, "/solutions/widgetNavigationView/widgetNavigationView Solution/widgetNavigationView.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/navigationAPI.html");
	}

	@Test
	public void testNavigation_container_positionSize() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		Thread.sleep(500);

		String result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('left') +'/'+ $('#navigationView1').css('top');");
		assertEquals("Check if navigationView1 position (left/top)", "0px/0px", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('right') +'/'+ $('#navigationView1').css('bottom');");
		assertEquals("Check if navigationView1 position (right/bottom)", "0px/0px", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').position().left +'/'+ $('#navigationView1').position().top;");
		assertEquals("Check if navigationView1 position (x/y)", "0/0", result);
	}
	
	@Test
	public void testNavigation_view1_positionSize() throws InterruptedException {
		selenium.getDriver().findElement(By.id("view1"));
		Thread.sleep(500);

		String result = (String) selenium.getJsConsole().executeScript("return $('#view1').css('left') +'/'+ $('#view1').css('top');");
		assertEquals("Check if view1 position (left/top)", "0px/0px", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#view1').css('right') +'/'+ $('#view1').css('bottom');");
		assertEquals("Check if view1 position (right/bottom)", "0px/0px", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#view1').position().left +'/'+ $('#view1').position().top;");
		assertEquals("Check if view1 position (x/y)", "0/0", result);
	}
	
	@Test
	public void testNavigation_view1Title_positionSize() throws InterruptedException {
		selenium.getDriver().findElement(By.id("view1"));
		Thread.sleep(500);

		String result = (String) selenium.getJsConsole().executeScript("return $('#title1').text() +'';");
		assertEquals("Check if view1 title", "View 1", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#title1').css('left') +'/'+ $('#title1').css('top');");
		assertEquals("Check if view1 title position (left/top)", "0px/0px", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#title1').css('right') +'/'+ $('#title1').css('bottom');");
		assertEquals("Check if view1 title position (right/bottom)", "0px/-1px", result);
	}
	
	@Test
	public void testNavigation_view2_positionSize() throws InterruptedException {
		selenium.getDriver().findElement(By.id("view2"));
		Thread.sleep(500);

		String expectedWidth = (String) selenium.getJsConsole().executeScript("return $('#view2').width() +'';");
		String result = (String) selenium.getJsConsole().executeScript("return $('#view2').css('left') +'/'+ $('#view2').css('top');");
		assertEquals("Check if view2 position (left/top)", "-"+expectedWidth+"px/0px", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#view2').css('right') +'/'+ $('#view2').css('bottom');");
		assertEquals("Check if view2 position (right/bottom)", "0px/0px", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#view2').position().left +'/'+ $('#view2').position().top;");
		assertEquals("Check if view2 position (x/y)", "-"+expectedWidth+"/0", result);
	}
	
	@Test
	public void testNavigation_view2_positionSize_afterGoToView() throws InterruptedException {
		selenium.getDriver().findElement(By.id("view2"));
		selenium.getJsConsole().executeScript("$$('navigationView1').goToView(2);");
		Thread.sleep(500);

		String result = (String) selenium.getJsConsole().executeScript("return $('#view2').css('left') +'/'+ $('#view2').css('top');");
		assertEquals("Check if view2 position (left/top)", "0px/0px", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#view2').css('right') +'/'+ $('#view2').css('bottom');");
		assertEquals("Check if view2 position (right/bottom)", "0px/0px", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#view2').position().left +'/'+ $('#view2').position().top;");
		assertEquals("Check if view2 position (x/y)", "0/0", result);
	}
	
	@Test
	public void testNavigation_view2Title_positionSize_afterGoToView() throws InterruptedException {
		selenium.getDriver().findElement(By.id("view2"));
		selenium.getJsConsole().executeScript("$$('navigationView1').goToView(2);");
		Thread.sleep(500);
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#title2').text() +'';");
		assertEquals("Check if view2 title", "View 2", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#title2').css('left') +'/'+ $('#title2').css('top');");
		assertEquals("Check if view2 title position (left/top)", "0px/0px", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#title2').css('right') +'/'+ $('#title2').css('bottom');");
		assertEquals("Check if view2 title position (right/bottom)", "0px/-1px", result);
	}
	
	@Test
	public void testNavigation_view2BackButton_positionSize_afterGoToView() throws InterruptedException {
		selenium.getDriver().findElement(By.id("view2"));
		selenium.getJsConsole().executeScript("$$('navigationView1').goToView(2);");
		Thread.sleep(500);
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#backButton2').text() +'';");
		assertEquals("Check if view2 backButton", "Back", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#backButton2').position().left +'/'+ $('#backButton2').position().top;");
		assertEquals("Check if view2 backButton position (x/y)", "20/7", result);
	}
	
}