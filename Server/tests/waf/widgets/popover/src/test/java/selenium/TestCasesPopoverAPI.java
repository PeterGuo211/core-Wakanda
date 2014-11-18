package selenium;

import static org.junit.Assert.*;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesPopoverAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesPopoverEvents.class, "/solutions/widgetPopover/widgetPopover Solution/widgetPopover.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/popoverAPI.waPage/index-tablet.html");
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
			Thread.sleep(500);
		} while (timeNow < timeTo);
	}

	@Test
	public void testPopover_hide() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#popover1').css('display') +'';");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testPopover_hideX2() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').hide();");
		selenium.getJsConsole().executeScript("$$('popover1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#popover1').css('display') +'';");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testPopover_show() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').hide();");
		selenium.getJsConsole().executeScript("$$('popover1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#popover1').css('display') +'';");
		assertEquals("Check show() API", "block", result);
	}
	
	@Test
	public void testPopover_showX2() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').hide();");
		selenium.getJsConsole().executeScript("$$('popover1').show();");
		selenium.getJsConsole().executeScript("$$('popover1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#popover1').css('display') +'';");
		assertEquals("Check show() API", "block", result);
	}

	@Test
	public void testPopover_toggle() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').toggle", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#popover1').css('display') +'';");
		assertEquals("Check toggle() API", "none", result);
	}

	@Test
	public void testPopover_toggle_back() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').toggle", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').toggle();");
		selenium.getJsConsole().executeScript("$$('popover1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#popover1').css('display') +'';");
		assertEquals("Check toggle() back API", "block", result);
	}

	@Test
	public void testPopover_addClass() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').addClass", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').addClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("popover1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check addClass() API", "true", result);
	}

	@Test
	public void testPopover_removeClass() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').addClass", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').addClass('toto');");
		selenium.getJsConsole().executeScript("$$('popover1').removeClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("popover1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check removeClass() API", "false", result);
	}

	@Test
	public void testPopover_move() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').move", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').move(0,0);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#popover1').css('left') +'';");
		assertEquals("Check move() API: left position", "0px", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#popover1').css('top') +'';");
		assertEquals("Check move() API: top position", "0px", result);
	}

	@Test
	public void testPopover_resize_smaller() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').resize", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').resize(10,10);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("popover1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testPopover_resize_bigger() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').resize", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').resize(300,300);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("popover1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testPopover_setWidth() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').setWidth", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').setWidth(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("popover1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}

	@Test
	public void testPopover_getWidth() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').getWidth", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('popover1').getWidth() +'';");
		assertEquals("Check getWidth() API", "220", result);
	}

	@Test
	public void testPopover_setHeight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').setHeight", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').setHeight(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("popover1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}

	@Test
	public void testPopover_getHeight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').getHeight", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('popover1').getHeight() +'';");
		assertEquals("Check getHeight() API", "300", result);
	}

	@Test
	public void testPopover_setLeft() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').setLeft", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').setLeft(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("popover1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}

	@Test
	public void testPopover_setRight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').setRight", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').setRight(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#popover1').css('right') +'';");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void testPopover_setTop() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').setTop", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').setTop(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("popover1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void testPopover_setBottom() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').setBottom", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').setBottom(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#popover1').css('bottom') +'';");
		assertEquals("Check setBottom() API", "100px", result);
	}

	@Test
	public void testPopover_getPosition() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').getPosition", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('popover1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "124", result);
		result = (String) selenium.getJsConsole().executeScript("return $$('popover1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "35", result);
	}

	@Test
	public void testPopover_destroy() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').destroy", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').destroy();");
		Thread.sleep(500);
		try {
			selenium.getDriver().findElement(By.id("popover1"));
			assertTrue(false);
		} catch (Exception e) {}
	}

	@Test
	public void testPopover_disable() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').disable", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').disable();");
			try{
		selenium.getDriver().findElement(By.id("button1")).click();
			}catch(Exception e){}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField1').getValue();");
		assertEquals("Check disable() API", "oldValue", result);
	}

	@Test
	public void testPopover_enable() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').disable", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').disable();");
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("$$('popover1').enable();");
			try{
		selenium.getDriver().findElement(By.id("button1")).click();
			}catch(Exception e){}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField1').getValue();");
		assertEquals("Check enable() API", "newValue", result);
	}

	@Test
	public void testPopover_setBackgroundColor() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').setBackgroundColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').setBackgroundColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#popover1').css('background-color') +'';");
		assertEquals("Check setBackgroundColor() API", "rgb(101, 0, 146)", result);
	}

	@Test
	public void testPopover_setTextColor() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').setTextColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').setTextColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#popover1').css('color') +'';");
		assertEquals("Check setTextColor() API", "rgb(101, 0, 146)", result);
	}

	@Test
	public void testPopover_setParent() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').setParent", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').setParent($$('container1'));");
		Thread.sleep(500);
		selenium.getDriver().findElement(By.id("container1")).findElement(By.id("popover1"));
	}

	@Test
	public void testPopover_getParent() throws InterruptedException {
		selenium.getDriver().findElement(By.id("popover1"));
		waitFor("$$('popover1').setParent", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('popover1').setParent($$('container1'));");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('popover1').getParent().id;");
		assertEquals("Check getParent() API", "container1", result);
	}
}
