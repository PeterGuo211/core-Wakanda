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

public class TestCasesSelectAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesSelectAPI.class, "/solutions/widgetSelect/widgetSelect Solution/widgetSelect.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/tablet/selectAPI.html");
		selenium.getDriver().findElement(By.id("select1"));
		try {
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
	// Generic API
	// ------------------------------------------------------------------------
	@Test
	public void testSelect_getValue() throws InterruptedException {
		String result = (String) selenium.getJsConsole().executeScript("return $$('select1').getValue();");
		assertEquals("Check getValue() API", "aaa", result);
	}

	@Test
	public void testSelect_setValue() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setValue('bbb');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('select1').getValue();");
		assertEquals("Check setValue() API", "bbb", result);
	}

	@Test
	public void testSelect_hide() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#select1').css('display');");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testSelect_hideX2() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').hide();");
		selenium.getJsConsole().executeScript("$$('select1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#select1').css('display');");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testSelect_show() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').hide();");
		selenium.getJsConsole().executeScript("$$('select1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#select1').css('display');");
		assertEquals("Check show() API", "block", result);
	}
	
	@Test
	public void testSelect_showX2() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').hide();");
		selenium.getJsConsole().executeScript("$$('select1').show();");
		selenium.getJsConsole().executeScript("$$('select1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#select1').css('display');");
		assertEquals("Check show() API", "block", result);
	}

	@Test
	public void testSelect_toggle() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#select1').css('display');");
		assertEquals("Check toggle() API", "none", result);
	}

	@Test
	public void testSelect_toggle_back() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').toggle();");
		selenium.getJsConsole().executeScript("$$('select1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#select1').css('display');");
		assertEquals("Check toggle() back API", "block", result);
	}

	@Test
	public void testSelect_addClass() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').addClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("select1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check addClass() API", "true", result);
	}

	@Test
	public void testSelect_removeClass() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').addClass('toto');");
		selenium.getJsConsole().executeScript("$$('select1').removeClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("select1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check removeClass() API", "false", result);
	}

	@Test
	public void testSelect_move() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').move(0,0);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#select1').css('top');");
		assertEquals("Check move() API: top position", "0px", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#select1').css('left');");
		assertEquals("Check move() API: left position", "0px", result);
	}

	@Test
	public void testSelect_resize_smaller() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').resize(10,10);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("select1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testSelect_resize_bigger() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').resize(300,300);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("select1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testSelect_setWidth() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setWidth(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("select1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}

	@Test
	public void testSelect_getWidth() throws InterruptedException {
		String result = (String) selenium.getJsConsole().executeScript("return $$('select1').getWidth() +'';");;
		assertEquals("Check getWidth() API", "196", result);
	}

	@Test
	public void testSelect_setHeight() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setHeight(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("select1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}

	@Test
	public void testSelect_getHeight() throws InterruptedException {
		String result = (String) selenium.getJsConsole().executeScript("return $$('select1').getHeight() +'';");;
		assertEquals("Check getHeight() API", "20", result);
	}

	@Test
	public void testSelect_setLeft() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setLeft(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("select1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}

	@Test
	public void testSelect_setRight() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setRight(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#select1').css('right');");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void testSelect_setTop() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setTop(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#select1').css('top');");
		assertEquals("Check setTop() API", "100px", result);
	}

	@Test
	public void testSelect_setBottom() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setBottom(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#select1').css('bottom');");
		assertEquals("Check setBottom() API", "100px", result);
	}

	@Test
	public void testSelect_getPosition() throws InterruptedException {
		String result = (String) selenium.getJsConsole().executeScript("return $$('select1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "66", result);
		result = (String) selenium.getJsConsole().executeScript("return $$('select1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "30", result);
	}

	@Test
	public void testSelect_destroy() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').destroy();");
		Thread.sleep(500);
		try {
			selenium.getDriver().findElement(By.id("select1"));
			assertTrue(false);
		} catch (Exception e) {}
	}

	@Test
	public void testSelect_disable() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').disable();");
		selenium.getJsConsole().executeScript("$$('select1').setValue('bbb');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('select1').getValue();");
		assertEquals("Check disable() API", "bbb", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#select1 select').attr('disabled');");
		assertEquals("Check if select is disabled", "disabled", result);
	}

	@Test
	public void testSelect_enable() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').disable();");
		selenium.getJsConsole().executeScript("$$('select1').enable();");
		selenium.getJsConsole().executeScript("$$('select1').setValue('bbb');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('select1').getValue();");
		assertEquals("Check enable() API", "bbb", result);
	}

	@Test
	public void testSelect_setBackgroundColor() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setBackgroundColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#select1').css('background-color');");
		assertEquals("Check setBackgroundColor() API", "rgb(101, 0, 146)", result);
	}

	@Test
	public void testSelect_setTextColor() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setTextColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#select1').css('color');");
		assertEquals("Check setTextColor() API", "rgb(101, 0, 146)", result);
	}

	@Test
	public void testSelect_setParent() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setParent($$('container1'));");
		Thread.sleep(500);
		selenium.getDriver().findElement(By.id("container1")).findElement(By.id("select1"));
	}

	@Test
	public void testSelect_getParent() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setParent($$('container1'));");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('select1').getParent().id;");
		assertEquals("Check getParent() API", "container1", result);
	}

	@Test
	public void testSelect_setErrorDiv() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setErrorDiv('container1');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('select1').errorDiv.selector;");
		assertEquals("Check setErrorDiv() API", "#container1", result);
	}

	@Test
	public void testSelect_getErrorDiv() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setErrorDiv('container1');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('select1').getErrorDiv().attr('id');");
		assertEquals("Check getErrorDiv() API", "container1", result);
	}

	@Test
	public void testSelect_clear() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').clear();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('select1').getValue() + '';");
		assertEquals("Check clear() API", "undefined", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#select1 option').length + '';");
		assertEquals("Check clear() API", "0", result);
	}

	@Test
	public void testSelect_setLabelText() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setLabelText('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("Check setLabelText() API", "toto", result);
	}

	@Test
	public void testSelect_setLabelTextColor() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('select1').setLabelTextColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#label1').css('color');");
		assertEquals("Check setLabelTextColor() API", "rgb(101, 0, 146)", result);
	}
}
