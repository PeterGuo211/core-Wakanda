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

public class TestCasesSectionAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesSectionEvents.class, "/solutions/widgetSection/widgetSection Solution/widgetSection.waSolution");

	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
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
	public void test_hide() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#section1').css('display') + '';");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void test_hideX2() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').hide();");
		selenium.getJsConsole().executeScript("$$('section1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#section1').css('display') + '';");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void test_show() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').hide();");
		selenium.getJsConsole().executeScript("$$('section1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#section1').css('display') + '';");
		assertEquals("Check show() API", "block", result);
	}
	
	@Test
	public void test_showX2() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').hide();");
		selenium.getJsConsole().executeScript("$$('section1').show();");
		selenium.getJsConsole().executeScript("$$('section1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#section1').css('display') + '';");
		assertEquals("Check show() API", "block", result);
	}

	@Test
	public void test_toggle() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').toggle", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#section1').css('display') + '';");
		assertEquals("Check toggle() API", "none", result);
	}

	@Test
	public void test_toggle_back() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').toggle", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').toggle();");
		selenium.getJsConsole().executeScript("$$('section1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#section1').css('display') + '';");
		assertEquals("Check toggle() back API", "block", result);
	}

	@Test
	public void test_addClass() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').addClass", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').addClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("section1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check addClass() API", "true", result);
	}

	@Test
	public void test_removeClass() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').addClass", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').addClass('toto');");
		selenium.getJsConsole().executeScript("$$('section1').removeClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("section1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check removeClass() API", "false", result);
	}

	@Test
	public void test_move() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').move", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').move(0,0);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#section1').css('top') + '';");
		assertEquals("Check move() API: top position", "0px", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#section1').css('left') + '';");
		assertEquals("Check move() API: left position", "0px", result);
	}

	@Test
	public void test_resize_smaller() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').resize", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').resize(10,10);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("section1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void test_resize_bigger() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').resize", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').resize(300,300);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("section1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void test_setWidth() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').setWidth", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').setWidth(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("section1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}

	@Test
	public void test_getWidth() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').getWidth", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('section1').getWidth() +'';");
		assertEquals("Check getWidth() API", "300", result);
	}

	@Test
	public void test_setHeight() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').setHeight", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').setHeight(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("section1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}

	@Test
	public void test_getHeight() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').getHeight", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('section1').getHeight() +'';");
		assertEquals("Check getHeight() API", "162", result);
	}

	@Test
	public void test_setLeft() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').setLeft", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').setLeft(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("section1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}

	@Test
	public void test_setRight() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').setRight", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').setRight(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#section1').css('right') + '';");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void test_setTop() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').setTop", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').setTop(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("section1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void test_setBottom() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').setBottom", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').setBottom(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#section1').css('bottom') + '';");
		assertEquals("Check setBottom() API", "100px", result);
	}

	@Test
	public void test_getPosition() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').getPosition", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('section1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "36", result);
		result = (String) selenium.getJsConsole().executeScript("return $$('section1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "36", result);
	}

	@Test
	public void test_destroy() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').destroy", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').destroy();");
		Thread.sleep(500);
		try {
			selenium.getDriver().findElement(By.id("section1"));
			assertTrue(false);
		} catch (Exception e) {}
	}

	@Test
	public void test_disable() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').disable", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').disable();");
		try {
			selenium.getDriver().findElement(By.className("waf-switchbox-switch")).click();
		} catch (Exception e) {}
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check disable() API", "false", result);
	}

	@Test
	public void test_enable() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').disable", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').disable();");
		selenium.getJsConsole().executeScript("$$('section1').enable();");
		selenium.getDriver().findElement(By.className("waf-switchbox-switch")).click();
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check enable() API", "true", result);
	}

	@Test
	public void test_setBackgroundColor() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').setTextColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').setBackgroundColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#section1').css('background-color') + '';");
		assertEquals("Check setBackgroundColor() API", "rgb(101, 0, 146)", result);
	}

	@Test
	public void test_setTextColor() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').setTextColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').setTextColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#section1').css('color') + '';");
		assertEquals("Check setTextColor() API", "rgb(101, 0, 146)", result);
	}

	@Test
	public void test_setParent() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').setParent", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').setParent($$('container1'));");
		Thread.sleep(500);
		selenium.getDriver().findElement(By.id("container1")).findElement(By.id("section1"));
	}

	@Test
	public void test_getParent() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8081/sectionAPI.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("section1"));
		waitFor("$$('section1').setParent", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('section1').setParent($$('container1'));");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('section1').getParent().id;");
		assertEquals("Check getParent() API", "container1", result);
	}
}
