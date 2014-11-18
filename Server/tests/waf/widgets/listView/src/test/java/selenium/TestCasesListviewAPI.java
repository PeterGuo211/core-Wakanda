package selenium;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesListviewAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesListviewEvents.class, "/solutions/widgetListview/widgetListview Solution/widgetListview.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/listAPI.waPage/index-tablet.html");
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
	public void testListview_hide() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#listView1').css('display') +'';");
		assertEquals("Check hide() API", "none", result);
	}
	
	@Test
	public void testListview_hideX2() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').hide();");
		selenium.getJsConsole().executeScript("$$('listView1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#listView1').css('display') +'';");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testListview_show() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').hide();");
		selenium.getJsConsole().executeScript("$$('listView1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#listView1').css('display') +'';");
		assertEquals("Check show() API", "block", result);
	}
	
	@Test
	public void testListview_showX2() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').hide();");
		selenium.getJsConsole().executeScript("$$('listView1').show();");
		selenium.getJsConsole().executeScript("$$('listView1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#listView1').css('display') +'';");
		assertEquals("Check show() API", "block", result);
	}


	@Test
	public void testListview_toggle() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').toggle", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#listView1').css('display') +'';");
		assertEquals("Check toggle() API", "none", result);
	}

	@Test
	public void testListview_toggle_back() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').toggle", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').toggle();");
		selenium.getJsConsole().executeScript("$$('listView1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#listView1').css('display') +'';");
		assertEquals("Check toggle() back API", "block", result);
	}

	@Test
	public void testListview_addClass() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').addClass", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').addClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("listView1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check addClass() API", "true", result);
	}

	@Test
	public void testListview_removeClass() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').addClass", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').addClass('toto');");
		selenium.getJsConsole().executeScript("$$('listView1').removeClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("listView1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check removeClass() API", "false", result);
	}

	@Test
	public void testListview_move() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').move", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').move(0,0);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#listView1').css('top') +'';");
		assertEquals("Check move() API: top position", "0px", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#listView1').css('left') +'';");
		assertEquals("Check move() API: left position", "0px", result);
	}

	@Test
	public void testListview_resize_smaller() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').resize", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').resize(10,10);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("listView1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testListview_resize_bigger() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').resize", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').resize(300,300);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("listView1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testListview_setWidth() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').setWidth", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').setWidth(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("listView1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}

	@Test
	public void testListview_getWidth() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').getWidth", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('listView1').getWidth() +'';");
		assertEquals("Check getWidth() API", "320", result);
	}

	@Test
	public void testListview_setHeight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').setHeight", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').setHeight(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("listView1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}

	@Test
	public void testListview_getHeight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').getHeight", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('listView1').getHeight() +'';");
		assertEquals("Check getHeight() API", "300", result);
	}

	@Test
	public void testListview_setLeft() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').setLeft", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').setLeft(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("listView1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}

	@Test
	public void testListview_setRight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').setRight", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').setRight(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#listView1').css('right') +'';");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void testListview_setTop() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').setTop", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').setTop(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("listView1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void testListview_setBottom() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').setBottom", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').setBottom(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#listView1').css('bottom') +'';");
		assertEquals("Check setBottom() API", "100px", result);
	}

	@Test
	public void testListview_getPosition() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').getPosition", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('listView1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "50", result);
		result = (String) selenium.getJsConsole().executeScript("return $$('listView1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "41", result);
	}

	@Test
	public void testListview_destroy() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').destroy", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').destroy();");
		Thread.sleep(500);
		try {
			selenium.getDriver().findElement(By.id("listView1"));
			assertTrue(false);
		} catch (Exception e) {}
	}

	@Test
	public void testListview_disable() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').disable", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').disable();");
		new Actions(selenium.getDriver()).moveToElement(selenium.getDriver().findElement(By.id("clone-row1-3-0")), 1, 1).click().perform();
		//selenium.getDriver().findElement(By.id("clone-row1-3-0")).click();
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#clone-row1-3-0').hasClass('waf-state-selected') +'';");
		assertEquals("Check disable() API", "false", result);
	}

	@Test
	public void testListview_enable() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').disable", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').disable();");
		selenium.getJsConsole().executeScript("$$('listView1').enable();");
		selenium.getDriver().findElement(By.id("clone-row1-3-0")).click();
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#clone-row1-3-0').hasClass('waf-state-selected') +'';");
		assertEquals("Check enable() API", "true", result);
	}

	@Test
	public void testListview_setBackgroundColor() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').setBackgroundColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').setBackgroundColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#listView1').css('background-color') +'';");
		assertEquals("Check setBackgroundColor() API", "rgb(101, 0, 146)", result);
	}

	@Test
	public void testListview_setTextColor() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').setTextColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').setTextColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#listView1').css('color') +'';");
		assertEquals("Check setTextColor() API", "rgb(101, 0, 146)", result);
	}

	@Test
	public void testListview_setParent() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').setParent", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').setParent($$('toContainer'));");
		Thread.sleep(500);
		selenium.getDriver().findElement(By.id("toContainer")).findElement(By.id("listView1"));
	}

	@Test
	public void testListview_getParent() throws InterruptedException {
		selenium.getDriver().findElement(By.id("listView1"));
		waitFor("$$('listView1').setParent", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('listView1').setParent($$('toContainer'));");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('listView1').getParent().id;");
		assertEquals("Check getParent() API", "toContainer", result);
	}
	
}
