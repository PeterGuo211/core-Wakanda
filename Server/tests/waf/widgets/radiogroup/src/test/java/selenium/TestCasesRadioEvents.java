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

public class TestCasesRadioEvents extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesRadioEvents.class, "/solutions/widgetRadioGroup/widgetRadioGroup Solution/widgetRadioGroup.waSolution");

	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/radioEvents.waPage/index-tablet.html");
	}

	// ------------------------------------------------------------------------
	// Desktop Events
	// ------------------------------------------------------------------------
	@Test
	public void testRadio_onFocus() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#radioGroup1-0').simulate('focus');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onFocus').getValue();");;
		assertEquals("onFocus events: ", "1", result);
	}

	@Test
	public void testRadio_onChange() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#radioGroup1-0').change();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onChange').getValue();");;
		assertEquals("onChange events: ", "1", result);
	}

	@Test
	public void testRadio_onBlur() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#radioGroup1-0').simulate('blur');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onBlur').getValue();");;
		assertEquals("onBlur events: ", "1", result);
	}

	@Test
	public void testRadio_onClick() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#radioGroup1-0').simulate('click');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onClick').getValue();");;
		assertEquals("onClick events: ", "1", result);
	}

	@Test
	public void testRadio_onMouseDown() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#radioGroup1-0').simulate('mousedown');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseDown').getValue();");;
		assertEquals("onMouseDown events: ", "1", result);
	}

	@Test
	public void testRadio_onMouseMove() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#radioGroup1-0').simulate('mousemove');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseMove').getValue();");;
		assertEquals("onMouseMove events: ", "1", result);
	}

	@Test
	public void testRadio_onMouseOut() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#radioGroup1-0').simulate('mouseout');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseOut').getValue();");;
		assertEquals("onMouseOut events: ", "1", result);
	}

	@Test
	public void testRadio_onMouseOver() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#radioGroup1-0').simulate('mouseover');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseOver').getValue();");;
		assertEquals("onMouseOver events: ", "1", result);
	}

	@Test
	public void testRadio_onMouseUp() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		Thread.sleep(500); // Waiting Events to be bound
		selenium.getJsConsole().executeScript("$('#radioGroup1-0').simulate('mouseup');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onMouseUp').getValue();");;
		assertEquals("onMouseUp events: ", "1", result);
	}
}
