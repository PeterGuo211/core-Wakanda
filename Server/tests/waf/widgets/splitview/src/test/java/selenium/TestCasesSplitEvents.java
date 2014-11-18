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

public class TestCasesSplitEvents extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		AdminCommand.startServer(TestCasesSplitAPI.class, "/solutions/widgetSplitView/widgetSplitView Solution/widgetSplitView.waSolution");

	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/splitViewEvents.html");
	}

	// ------------------------------------------------------------------------
	// Desktop Events
	// ------------------------------------------------------------------------
	@Test
	public void testSplit_onClick() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/splitViewEvents.html");
		selenium.getDriver().findElement(By.id("splitView1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#splitView1').simulate('click');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onClick').getValue();");
		assertEquals("onClick events: ", "1", result);
	}

	@Test
	public void testSplit_onDoubleClick() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/splitViewEvents.html");
		selenium.getDriver().findElement(By.id("splitView1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#splitView1').trigger('dblclick');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onDblClick').getValue();");
		assertEquals("onDblClick events: ", "1", result);
	}

	@Test
	public void testSplit_onMouseDown() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/splitViewEvents.html");
		selenium.getDriver().findElement(By.id("splitView1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#splitView1').simulate('mousedown');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseDown').getValue();");
		assertEquals("onMouseDown events: ", "1", result);
	}

	@Test
	public void testSplit_onMouseOut() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/splitViewEvents.html");
		selenium.getDriver().findElement(By.id("splitView1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#splitView1').simulate('mouseout');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseOut').getValue();");
		assertEquals("onMouseOut events: ", "1", result);
	}

	@Test
	public void testSplit_onMouseUp() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/splitViewEvents.html");
		selenium.getDriver().findElement(By.id("splitView1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#splitView1').simulate('mouseup');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseUp').getValue();");
		assertEquals("onMouseUp events: ", "1", result);
	}

	@Test
	public void testSplit_onMouseOver() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/splitViewEvents.html");
		selenium.getDriver().findElement(By.id("splitView1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#splitView1').simulate('mouseover');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseOver').getValue();");
		assertEquals("onMouseOver events: ", "1", result);
	}
}
