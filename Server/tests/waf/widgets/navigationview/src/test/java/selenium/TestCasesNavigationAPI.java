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

public class TestCasesNavigationAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesNavigationEvents.class, "/solutions/widgetNavigationView/widgetNavigationView Solution/widgetNavigationView.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/navigationAPI.html");
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
	public void testNavigation_hide() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('display') +'';");
		assertEquals("Check hide() API", "none", result);
	}
	
	@Test
	public void testNavigation_hideX2() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').hide();");
		selenium.getJsConsole().executeScript("$$('navigationView1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('display') +'';");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testNavigation_show() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').hide();");
		selenium.getJsConsole().executeScript("$$('navigationView1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('display') +'';");
		assertEquals("Check show() API", "block", result);
	}
	
	@Test
	public void testNavigation_showX2() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').hide();");
		selenium.getJsConsole().executeScript("$$('navigationView1').show();");
		selenium.getJsConsole().executeScript("$$('navigationView1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('display') +'';");
		assertEquals("Check show() API", "block", result);
	}

	@Test
	public void testNavigation_toggle() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').toggle", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('display') +'';");
		assertEquals("Check toggle() API", "none", result);
	}

	@Test
	public void testNavigation_toggle_back() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').toggle", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').toggle();");
		selenium.getJsConsole().executeScript("$$('navigationView1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('display') +'';");
		assertEquals("Check toggle() back API", "block", result);
	}

	@Test
	public void testNavigation_addClass() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').addClass", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').addClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("navigationView1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check addClass() API", "true", result);
	}

	@Test
	public void testNavigation_removeClass() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').addClass", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').addClass('toto');");
		selenium.getJsConsole().executeScript("$$('navigationView1').removeClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("navigationView1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check removeClass() API", "false", result);
	}

	@Test
	public void testNavigation_move() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').move", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').move(0,0);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('top') +'';");
		assertEquals("Check move() API: top position", "0px", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('left') +'';");
		assertEquals("Check move() API: left position", "0px", result);
	}

	@Test
	public void testNavigation_resize_smaller() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').resize", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').resize(10,10);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("navigationView1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testNavigation_resize_bigger() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').resize", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').resize(300,300);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("navigationView1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testNavigation_setWidth() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').setWidth", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').setWidth(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("navigationView1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}

	@Test
	public void testNavigation_getWidth() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').getWidth", 10 * 1000);
		String resultBefore = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('width') +'';");
		String resultAfter = (String) selenium.getJsConsole().executeScript("return $$('navigationView1').getWidth() +'px';");
		assertEquals("Check getWidth() API", resultBefore, resultAfter);
	}

	@Test
	public void testNavigation_goToView() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').goToView", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').goToView(2);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#view2').position().left +'';");
		assertEquals("Check goToView() API", "0", result);
	}

	@Test
	public void testNavigation_goToNextView() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').goToNextView", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').goToNextView();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#view2').position().left +'';");
		assertEquals("Check goToNextView() API", "0", result);
	}

	@Test
	public void testNavigation_goToPreviousView() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').goToNextView", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').goToNextView();");
		selenium.getJsConsole().executeScript("$$('navigationView1').goToPreviousView();");
		Thread.sleep(1000); // Wait for the end of CSS transform
		String result = (String) selenium.getJsConsole().executeScript("return $('#view1').position().left +'';");
		assertEquals("Check goToPreviousView() API", "0", result);
	}

	@Test
	public void testNavigation_setHeight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').setHeight", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').setHeight(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("navigationView1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}

	@Test
	public void testNavigation_getHeight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').getHeight", 10 * 1000);
		String resultBefore = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('height') +'';");
		String resultAfter = (String) selenium.getJsConsole().executeScript("return $$('navigationView1').getHeight() +'px';");
		assertEquals("Check getHeight() API", resultBefore, resultAfter);
	}

	@Test
	public void testNavigation_setLeft() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').setLeft", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').setLeft(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("navigationView1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}

	@Test
	public void testNavigation_setRight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').setRight", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').setRight(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('right') +'';");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void testNavigation_setTop() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').setTop", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').setTop(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("navigationView1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void testNavigation_setBottom() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').setBottom", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').setBottom(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('bottom') +'';");
		assertEquals("Check setBottom() API", "100px", result);
	}

	@Test
	public void testNavigation_getPosition() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').getPosition", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('navigationView1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "0", result);
		result = (String) selenium.getJsConsole().executeScript("return $$('navigationView1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "0", result);
	}

	@Test
	public void testNavigation_destroy() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').destroy", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').destroy();");
		Thread.sleep(500);
		try {
			selenium.getDriver().findElement(By.id("navigationView1"));
			assertTrue(false);
		} catch (Exception e) {}
	}

	@Test
	public void testNavigation_disable_withAPI() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').setValue", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('textField1').setValue('aaa');");
		selenium.getJsConsole().executeScript("$$('navigationView1').disable();");
		selenium.getJsConsole().executeScript("$$('textField1').setValue('bbb');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField1').getValue();");
		assertEquals("Check disable() API", "bbb", result);
	}

	@Test
	public void testNavigation_disable_withUserAction() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').setValue", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('textField1').setValue('aaa');");
		selenium.getJsConsole().executeScript("$$('navigationView1').disable();");
		try {
			selenium.getDriver().findElement(By.id("textField1")).sendKeys("bbb");
			assertTrue("Check disable() API", false);
		} catch (Exception e) {}
	}

	@Test
	public void testNavigation_isDisabled_false() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').isDisabled", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('navigationView1').isDisabled() +'';");
		assertEquals("Check isDisabled() API", "false", result);
	}

	@Test
	public void testNavigation_isDisabled_true() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').disable", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').disable();");
		String result = (String) selenium.getJsConsole().executeScript("return $$('navigationView1').isDisabled() +'';");
		assertEquals("Check isDisabled() API", "true", result);
	}

	@Test
	public void testNavigation_enable() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').disable", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').disable();");
		selenium.getJsConsole().executeScript("$$('navigationView1').enable();");
		selenium.getJsConsole().executeScript("$$('navigationView1').setValue('bbb');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('navigationView1').getValue();");
		assertEquals("Check enable() API", "bbb", result);
	}

	@Test
	public void testNavigation_setBackgroundColor() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').setBackgroundColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').setBackgroundColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('background-color') +'';");
		assertEquals("Check setBackgroundColor() API", "rgb(101, 0, 146)", result);
	}

	@Test
	public void testNavigation_setTextColor() throws InterruptedException {
		selenium.getDriver().findElement(By.id("navigationView1"));
		waitFor("$$('navigationView1').setTextColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('navigationView1').setTextColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#navigationView1').css('color') +'';");
		assertEquals("Check setTextColor() API", "rgb(101, 0, 146)", result);
	}
}
