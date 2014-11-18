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

public class TestCasesListView_general extends SeleniumRuntimeTemplate {
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
	public void testListview_container() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		Thread.sleep(500);
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#listView1').width() +'/'+ $('#listView1').height();");
		assertEquals("Check if listView container (width/height)", "318/298", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#listView1').position().left +'/'+ $('#listView1').position().top;");
		assertEquals("Check if listView container position (x/y)", "50/41", result);
	}
	
	@Test
	public void testListview_label() throws InterruptedException {
		selenium.getDriver().findElement(By.id("label1"));
		Thread.sleep(500);
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#label1').width() +'/'+ $('#label1').height();");
		assertEquals("Check if listView label (width/height)", "46/15", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#label1').position().left +'/'+ $('#label1').position().top;");
		assertEquals("Check if listView label position(x/y)", "50/21", result);
	}
	
}
