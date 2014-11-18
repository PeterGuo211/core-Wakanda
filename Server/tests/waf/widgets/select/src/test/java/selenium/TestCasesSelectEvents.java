package selenium;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesSelectEvents extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesSelectEvents.class, "/solutions/widgetSelect/widgetSelect Solution/widgetSelect.waSolution");

	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/tablet/selectEvents.html");
		selenium.getDriver().findElement(By.id("select1"));
		try {
			Thread.sleep(500);
			waitFor("$$('select1').getValue", 5 * 1000);
		} catch (InterruptedException e) {}
	}
	
	private void waitFor(String condition, long timeInMilliSec) throws InterruptedException {
		long timeFrom = System.currentTimeMillis();
		long timeTo = timeFrom + timeInMilliSec;
		long timeNow;
		do {
			timeNow = System.currentTimeMillis();
			try {
				selenium.getJsConsole().executeScript(condition);
				break;
			} catch (Exception e) {}
			Thread.sleep(100);
		} while (timeNow < timeTo);
	}

	// ------------------------------------------------------------------------
	// Desktop Events
	// ------------------------------------------------------------------------
	@Test
	public void testSelect_onBlur() throws InterruptedException {
		selenium.getJsConsole().executeScript("$('#select1 select').focus().blur();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onBlur').getValue();");
		assertEquals("onBlur events: ", "1", result);
	}

	@Ignore
	public void testSelect_onFocus() throws InterruptedException {
		selenium.getJsConsole().executeScript("$('#select1 select').focus();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onFocus').getValue();");
		assertEquals("onFocus events: ", "1", result);
	}

	@Test
	public void testSelect_onChange() throws InterruptedException {
		selenium.getJsConsole().executeScript("$('#select1 select').change();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onChange').getValue();");
		assertEquals("onChange events: ", "1", result);
	}

	@Ignore
	public void testSelect_onClick() throws InterruptedException {
		selenium.getJsConsole().executeScript("$('#select1 select').simulate('click');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onClick').getValue();");
		assertEquals("onClick events: ", "1", result);
	}

	@Ignore
	public void testSelect_onMouseDown() throws InterruptedException {
		selenium.getJsConsole().executeScript("$('#select1 select').simulate('mousedown');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseDown').getValue();");
		assertEquals("onMouseDown events: ", "1", result);
	}

	@Ignore
	public void testSelect_onMouseMove() throws InterruptedException {
		selenium.getJsConsole().executeScript("$('#select1 select').simulate('mousemove');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseMove').getValue();");
		assertEquals("onMouseMove events: ", "1", result);
	}

	@Ignore
	public void testSelect_onMouseOut() throws InterruptedException {
		selenium.getJsConsole().executeScript("$('#select1 select').simulate('mouseout');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseOut').getValue();");
		assertEquals("onMouseOut events: ", "1", result);
	}

	@Ignore
	public void testSelect_onMouseOver() throws InterruptedException {
		selenium.getJsConsole().executeScript("$('#select1 select').simulate('mouseover');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseOver').getValue();");
		assertEquals("onMouseOver events: ", "1", result);
	}

	@Ignore
	public void testSelect_onMouseUp() throws InterruptedException {
		selenium.getJsConsole().executeScript("$('#select1 select').simulate('mouseup');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseUp').getValue();");
		assertEquals("onMouseUp events: ", "1", result);
	}

	// ------------------------------------------------------------------------
	// Mobile Events (It does not update the CSS)
	// ------------------------------------------------------------------------
	
	@Test
	public void testSelect_onTouchStart() throws InterruptedException {
		selenium.getJsConsole().executeScript("$('#select1 select').trigger('touchstart');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onTouchStart').getValue();");
		assertEquals("onTouchStart events: ", "1", result);
	}

	@Test
	public void testSelect_onTouchEnd() throws InterruptedException {
		selenium.getJsConsole().executeScript("$('#select1 select').trigger('touchend');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onTouchEnd').getValue();");
		assertEquals("onTouchEnd events: ", "1", result);
	}

	@Test
	public void testSelect_onTouchCancel() throws InterruptedException {
		selenium.getJsConsole().executeScript("$('#select1 select').trigger('touchcancel');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onTouchCancel').getValue();");
		assertEquals("onTouchCancel events: ", "1", result);
	}
}
