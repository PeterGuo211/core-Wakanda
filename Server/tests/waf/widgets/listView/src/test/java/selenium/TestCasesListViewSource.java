package selenium;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesListViewSource extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesListviewEvents.class, "/solutions/widgetListview/widgetListview Solution/widgetListview.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
	}

	@Test
	public void testListview_allRows() throws InterruptedException {
		selenium.getDriver().findElement(By.id("clone-row1-0-0"));
		selenium.getDriver().findElement(By.id("clone-row1-7-0"));
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('.waf-clone-row1').length +'';");
		assertEquals("Check if all rows are displayed", "8", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('.matrix-container').width() +'/'+ $('.matrix-container').height();");
		assertEquals("Check if matrix has visibles elements (width/height)", "288/4554", result);
	}
	
	@Test
	public void testListview_row1Displayed() throws InterruptedException {
		selenium.getDriver().findElement(By.id("clone-row1-0-0"));
		selenium.getDriver().findElement(By.id("clone-mainText1-0-0"));
		selenium.getDriver().findElement(By.id("clone-goTo1-0-0"));
		selenium.getDriver().findElement(By.id("clone-secondText1-0-0"));
		selenium.getDriver().findElement(By.id("clone-numberValue1-0-0"));
		selenium.getDriver().findElement(By.id("clone-sideImage1-0-0"));
		Thread.sleep(500);
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#clone-row1-0-0').width() +'/'+ $('#clone-row1-0-0').height();");
		assertEquals("Check if first row width/height", "316/44", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#clone-mainText1-0-0').text() +'';");
		assertEquals("Check if mainText1 has text", "Arya", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#clone-mainText1-0-0').width() +'/'+ $('#clone-mainText1-0-0').height();");
		assertEquals("Check if mainText1 width/height", "190/20", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#clone-secondText1-0-0').text() +'';");
		assertEquals("Check if secondText1 has text", "Greyjoy", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#clone-secondText1-0-0').width() +'/'+ $('#clone-secondText1-0-0').height();");
		assertEquals("Check if mainText1 width/height", "196/20", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#clone-sideImage1-0-0 img').attr('src') +'';");
		assertEquals("Check if sideImage1 has image", "/rest/Employees(1)/photo?$imageformat=best&$expand=photo", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#clone-sideImage1-0-0').width() +'/'+ $('#clone-sideImage1-0-0').height();");
		assertEquals("Check if mainText1 width/height", "35/35", result);
	}
	
	@Test
	public void testListview_row5Displayed() throws InterruptedException {
		selenium.getDriver().findElement(By.id("clone-row1-5-0"));
		selenium.getDriver().findElement(By.id("clone-mainText1-5-0"));
		selenium.getDriver().findElement(By.id("clone-goTo1-5-0"));
		selenium.getDriver().findElement(By.id("clone-secondText1-5-0"));
		selenium.getDriver().findElement(By.id("clone-numberValue1-5-0"));
		selenium.getDriver().findElement(By.id("clone-sideImage1-5-0"));
		Thread.sleep(500);
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#clone-row1-5-0').width() +'/'+ $('#clone-row1-5-0').height();");
		assertEquals("Check if first row width/height", "318/44", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#clone-mainText1-5-0').text() +'';");
		assertEquals("Check if mainText1 has text", "Stannis", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#clone-mainText1-5-0').width() +'/'+ $('#clone-mainText1-5-0').height();");
		assertEquals("Check if mainText1 width/height", "190/20", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#clone-secondText1-5-0').text() +'';");
		assertEquals("Check if secondText1 has text", "Tully", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#clone-secondText1-5-0').width() +'/'+ $('#clone-secondText1-5-0').height();");
		assertEquals("Check if mainText1 width/height", "198/20", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#clone-sideImage1-5-0 img').attr('src') +'';");
		assertEquals("Check if sideImage1 has image", "/rest/Employees(6)/photo?$imageformat=best&$expand=photo", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#clone-sideImage1-5-0').width() +'/'+ $('#clone-sideImage1-5-0').height();");
		assertEquals("Check if mainText1 width/height", "35/35", result);
	}
	
	@Test
	public void testListview_selectedRow() throws InterruptedException {
		selenium.getDriver().findElement(By.id("clone-row1-5-0")).click();
		Thread.sleep(500);
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#clone-row1-5-0').width() +'/'+ $('#clone-row1-5-0').height();");
		assertEquals("Check if selected row width/height", "316/44", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('.waf-state-selected .waf-clone-mainText1').text() +'';");
		assertEquals("Check if selected mainText1 has text", "Stannis", result);

		result = (String) selenium.getJsConsole().executeScript("return $('.waf-state-selected .waf-clone-secondText1').text() +'';");
		assertEquals("Check if selected mainText1 has text", "Tully", result);
	}
	
}
