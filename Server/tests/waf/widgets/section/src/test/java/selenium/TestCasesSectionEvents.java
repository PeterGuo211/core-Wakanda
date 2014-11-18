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

public class TestCasesSectionEvents extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesSectionEvents.class, "/solutions/widgetSection/widgetSection Solution/widgetSection.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionEvents.waPage/index-tablet.html");
	}

	@Ignore
	public void test_onClick() throws InterruptedException {
		selenium.getDriver().findElement(By.id("section1"));
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("$('#section1').simulate('click');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('onClick').getValue();");;
		assertEquals("onClick events: ", "1", result);
	}

	@Ignore
	public void test_onDblClick() throws InterruptedException {
		selenium.getDriver().findElement(By.id("section1"));
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("$('#section1').simulate('dblclick');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('onDblClick').getValue();");;
		assertEquals("onDblClick events: ", "1", result);
	}

	@Ignore
	public void test_onMouseDown() throws InterruptedException {
		selenium.getDriver().findElement(By.id("section1"));
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("$('#section1').simulate('mousedown');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('onMouseDown').getValue();");;
		assertEquals("onMouseDown events: ", "1", result);
	}

	@Ignore
	public void test_onMouseOut() throws InterruptedException {
		selenium.getDriver().findElement(By.id("section1"));
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("$('#section1').simulate('mouseout');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('onMouseOut').getValue();");;
		assertEquals("onMouseOut events: ", "1", result);
	}

	@Ignore
	public void test_onMouseOver() throws InterruptedException {
		selenium.getDriver().findElement(By.id("section1"));
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("$('#section1').simulate('mouseover');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('onMouseOver').getValue();");;
		assertEquals("onMouseOver events: ", "1", result);
	}

	@Ignore
	public void test_onMouseUp() throws InterruptedException {
		selenium.getDriver().findElement(By.id("section1"));
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("$('#section1').simulate('mouseup');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('onMouseUp').getValue();");;
		assertEquals("onMouseUp events: ", "1", result);
	}

	@Test
	public void test_onTouchStart() throws InterruptedException {
		selenium.getDriver().findElement(By.id("section1"));
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("$('#section1').trigger('touchstart');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('onTouchStart').getValue();");
		assertEquals("onTouchStart events: ", "1", result);
	}

	@Test
	public void test_onTouchEnd() throws InterruptedException {
		selenium.getDriver().findElement(By.id("section1"));
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("$('#section1').trigger('touchend');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('onTouchEnd').getValue();");
		assertEquals("onTouchEnd events: ", "1", result);
	}

	@Test
	public void test_onTouchMove() throws InterruptedException {
		selenium.getDriver().findElement(By.id("section1"));
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("$('#section1').trigger('touchmove');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('onTouchMove').getValue();");
		assertEquals("onTouchMove events: ", "1", result);
	}

	@Test
	public void test_onTouchCancel() throws InterruptedException {
		selenium.getDriver().findElement(By.id("section1"));
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("$('#section1').trigger('touchcancel');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('onTouchCancel').getValue();");
		assertEquals("onTouchCancel events: ", "1", result);
	}
}
