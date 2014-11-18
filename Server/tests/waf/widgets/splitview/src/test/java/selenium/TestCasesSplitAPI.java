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
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesSplitAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesSplitAPI.class, "/solutions/widgetSplitView/widgetSplitView Solution/widgetSplitView.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/splitViewAPI.html");
		selenium.getDriver().findElement(By.id("splitView1"));
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
	public void testSplit_hide() throws InterruptedException {
		waitFor("$$('splitView1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#splitView1').css('display');");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testSplit_hideX2() throws InterruptedException {
		waitFor("$$('splitView1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').hide();");
		selenium.getJsConsole().executeScript("$$('splitView1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#splitView1').css('display');");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testSplit_show() throws InterruptedException {
		waitFor("$$('splitView1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').hide();");
		selenium.getJsConsole().executeScript("$$('splitView1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#splitView1').css('display');");
		assertEquals("Check show() API", "block", result);
	}
	
	@Test
	public void testSplit_showX2() throws InterruptedException {
		waitFor("$$('splitView1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').hide();");
		selenium.getJsConsole().executeScript("$$('splitView1').show();");
		selenium.getJsConsole().executeScript("$$('splitView1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#splitView1').css('display');");
		assertEquals("Check show() API", "block", result);
	}

	@Test
	public void testSplit_toggle() throws InterruptedException {
		waitFor("$$('splitView1').toggle", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#splitView1').css('display');");
		assertEquals("Check toggle() API", "none", result);
	}

	@Test
	public void testSplit_toggle_back() throws InterruptedException {
		waitFor("$$('splitView1').toggle", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').toggle();");
		selenium.getJsConsole().executeScript("$$('splitView1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#splitView1').css('display');");
		assertEquals("Check toggle() back API", "block", result);
	}

	@Test
	public void testSplit_addClass() throws InterruptedException {
		waitFor("$$('splitView1').addClass", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').addClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("splitView1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check addClass() API", "true", result);
	}

	@Test
	public void testSplit_removeClass() throws InterruptedException {
		waitFor("$$('splitView1').addClass", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').addClass('toto');");
		selenium.getJsConsole().executeScript("$$('splitView1').removeClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("splitView1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check removeClass() API", "false", result);
	}

	@Test
	public void testSplit_move() throws InterruptedException {
		waitFor("$$('splitView1').move", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').move(0,0);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#splitView1').css('top');");
		assertEquals("Check move() API: top position", "0px", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#splitView1').css('left');");
		assertEquals("Check move() API: left position", "0px", result);
	}

	@Test
	public void testSplit_resize_smaller() throws InterruptedException {
		waitFor("$$('splitView1').resize", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').resize(10,10);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("splitView1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testSplit_resize_bigger() throws InterruptedException {
		waitFor("$$('splitView1').resize", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').resize(300,300);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("splitView1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testSplit_setWidth() throws InterruptedException {
		waitFor("$$('splitView1').setWidth", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').setWidth(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("splitView1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}

	@Test
	public void testSplit_getWidth() throws InterruptedException {
		waitFor("$$('splitView1').getWidth", 10 * 1000);
		String resultBefore = (String) selenium.getJsConsole().executeScript("return $('#splitView1').css('width') +'';");
		String resultAfter = (String) selenium.getJsConsole().executeScript("return $$('splitView1').getWidth() +'px';");;
		assertEquals("Check getWidth() API", resultBefore, resultAfter);
	}

	@Test
	public void testSplit_setHeight() throws InterruptedException {
		waitFor("$$('splitView1').setHeight", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').setHeight(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("splitView1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}

	@Test
	public void testSplit_getHeight() throws InterruptedException {
		waitFor("$$('splitView1').getHeight", 10 * 1000);
		String resultBefore = (String) selenium.getJsConsole().executeScript("return $('#splitView1').css('height') +'';");
		String resultAfter = (String) selenium.getJsConsole().executeScript("return $$('splitView1').getHeight() +'px';");;
		assertEquals("Check getHeight() API", resultBefore, resultAfter);
	}

	@Test
	public void testSplit_setLeft() throws InterruptedException {
		waitFor("$$('splitView1').setLeft", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').setLeft(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("splitView1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}

	@Test
	public void testSplit_setRight() throws InterruptedException {
		waitFor("$$('splitView1').setRight", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').setRight(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#splitView1').css('right');");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void testSplit_setTop() throws InterruptedException {
		waitFor("$$('splitView1').setTop", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').setTop(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("splitView1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void testSplit_setBottom() throws InterruptedException {
		waitFor("$$('splitView1').setBottom", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').setBottom(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#splitView1').css('bottom');");
		assertEquals("Check setBottom() API", "100px", result);
	}

	@Test
	public void testSplit_getPosition() throws InterruptedException {
		waitFor("$$('splitView1').getPosition", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('splitView1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "0", result);
		result = (String) selenium.getJsConsole().executeScript("return $$('splitView1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "0", result);
	}

	@Test
	public void testSplit_destroy() throws InterruptedException {
		waitFor("$$('splitView1').destroy", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').destroy();");
		Thread.sleep(500);
		try {
			selenium.getDriver().findElement(By.id("splitView1"));
			assertTrue(false);
		} catch (Exception e) {}
	}

	@Test
	public void testSplit_disable_withAPI() throws InterruptedException {
		waitFor("$$('splitView1').setValue", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('textField1').setValue('aaa');");
		selenium.getJsConsole().executeScript("$$('splitView1').disable();");
		selenium.getJsConsole().executeScript("$$('textField1').setValue('bbb');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField1').getValue();");
		assertEquals("Check disable() API", "bbb", result);
	}

	@Test
	public void testSplit_disable_withUserAction() throws InterruptedException {
		waitFor("$$('splitView1').setValue", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('textField1').setValue('aaa');");
		selenium.getJsConsole().executeScript("$$('splitView1').disable();");
		try {
			selenium.getDriver().findElement(By.id("textField1")).sendKeys("bbb");
			assertTrue("Check disable() API", false);
		} catch (Exception e) {}
	}

	@Test
	public void testSplit_enable() throws InterruptedException {
		waitFor("$$('splitView1').disable", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').disable();");
		selenium.getJsConsole().executeScript("$$('splitView1').enable();");
		selenium.getJsConsole().executeScript("$$('splitView1').setValue('bbb');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('splitView1').getValue();");
		assertEquals("Check enable() API", "bbb", result);
	}

	@Test
	public void testSplit_setBackgroundColor() throws InterruptedException {
		waitFor("$$('splitView1').setBackgroundColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').setBackgroundColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#splitView1').css('background-color');");
		assertEquals("Check setBackgroundColor() API", "rgb(101, 0, 146)", result);
	}

	@Test
	public void testSplit_setTextColor() throws InterruptedException {
		waitFor("$$('splitView1').setTextColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('splitView1').setTextColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#splitView1').css('color');");
		assertEquals("Check setTextColor() API", "rgb(101, 0, 146)", result);
	}
}
