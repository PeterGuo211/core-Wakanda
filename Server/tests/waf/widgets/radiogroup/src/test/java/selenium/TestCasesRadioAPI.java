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

public class TestCasesRadioAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesRadioEvents.class, "/solutions/widgetRadioGroup/widgetRadioGroup Solution/widgetRadioGroup.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/radioAPI.waPage/index-tablet.html");
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
	public void testRadio_getValue() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').getValue", 10 * 1000);
		selenium.getDriver().findElement(By.id("radioGroup1-0")).click();
		//selenium.getJsConsole().executeScript("$('#radioGroup1-0').simulate('click');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('radioGroup1').getValue();");
		assertEquals("Check getValue() API", "aaa", result);
	}

	@Test
	public void testRadio_setValue() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setValue", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setValue('bbb');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('radioGroup1').getValue();");
		assertEquals("Check setValue() API", "bbb", result);
	}

	@Test
	public void testRadio_hide() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1').css('display') +'';");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testRadio_hideX2() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').hide();");
		selenium.getJsConsole().executeScript("$$('radioGroup1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1').css('display') +'';");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testRadio_show() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').hide();");
		selenium.getJsConsole().executeScript("$$('radioGroup1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1').css('display') +'';");
		assertEquals("Check show() API", "block", result);
	}
	
	@Test
	public void testRadio_showX2() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').hide();");
		selenium.getJsConsole().executeScript("$$('radioGroup1').show();");
		selenium.getJsConsole().executeScript("$$('radioGroup1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1').css('display') +'';");
		assertEquals("Check show() API", "block", result);
	}

	@Test
	public void testRadio_toggle() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').toggle", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1').css('display') +'';");
		assertEquals("Check toggle() API", "none", result);
	}

	@Test
	public void testRadio_toggle_back() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').toggle", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').toggle();");
		selenium.getJsConsole().executeScript("$$('radioGroup1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1').css('display') +'';");
		assertEquals("Check toggle() back API", "block", result);
	}

	@Test
	public void testRadio_addClass() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').addClass", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').addClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("radioGroup1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check addClass() API", "true", result);
	}

	@Test
	public void testRadio_removeClass() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').addClass", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').addClass('toto');");
		selenium.getJsConsole().executeScript("$$('radioGroup1').removeClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("radioGroup1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check removeClass() API", "false", result);
	}

	@Test
	public void testRadio_move() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').move", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').move(0,0);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1').css('top') +'';");
		assertEquals("Check move() API: top position", "0px", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1').css('left') +'';");
		assertEquals("Check move() API: left position", "0px", result);
	}

	@Test
	public void testRadio_resize_smaller() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').resize", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').resize(10,10);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("radioGroup1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testRadio_resize_bigger() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').resize", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').resize(300,300);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("radioGroup1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testRadio_setWidth() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setWidth", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setWidth(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("radioGroup1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}

	@Test
	public void testRadio_getWidth() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').getWidth", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('radioGroup1').getWidth() +'';");;
		assertEquals("Check getWidth() API", "100", result);
	}

	@Test
	public void testRadio_setHeight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setHeight", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setHeight(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("radioGroup1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}

	@Test
	public void testRadio_getHeight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').getHeight", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('radioGroup1').getHeight() +'';");;
		assertEquals("Check getHeight() API", "36", result);
	}

	@Test
	public void testRadio_setLeft() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setLeft", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setLeft(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("radioGroup1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}

	@Test
	public void testRadio_setRight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setRight", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setRight(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1').css('right') +'';");
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void testRadio_setTop() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setTop", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setTop(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("radioGroup1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void testRadio_setBottom() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setBottom", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setBottom(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1').css('bottom') +'';");
		assertEquals("Check setBottom() API", "100px", result);
	}

	@Test
	public void testRadio_getPosition() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').getPosition", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('radioGroup1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "77", result);
		result = (String) selenium.getJsConsole().executeScript("return $$('radioGroup1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "26", result);
	}

	@Test
	public void testRadio_destroy() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').destroy", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').destroy();");
		Thread.sleep(500);
		try {
			selenium.getDriver().findElement(By.id("radioGroup1"));
			assertTrue(false);
		} catch (Exception e) {}
	}

	@Test
	public void testRadio_disable() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setValue", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setValue('aaa');");
		selenium.getJsConsole().executeScript("$$('radioGroup1').disable();");
		selenium.getJsConsole().executeScript("$$('radioGroup1').setValue('bbb');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('radioGroup1').getValue();");
		assertEquals("Check disable() API", "aaa", result);
	}

	@Test
	public void testRadio_enable() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').disable", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').disable();");
		selenium.getJsConsole().executeScript("$$('radioGroup1').enable();");
		selenium.getJsConsole().executeScript("$$('radioGroup1').setValue('bbb');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('radioGroup1').getValue();");
		assertEquals("Check enable() API", "bbb", result);
	}

	@Test
	public void testRadio_setBackgroundColor() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setBackgroundColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setBackgroundColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1').css('background-color') +'';");
		assertEquals("Check setBackgroundColor() API", "rgb(101, 0, 146)", result);
	}

	@Test
	public void testRadio_setTextColor() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setTextColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setTextColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1').css('color') +'';");
		assertEquals("Check setTextColor() API", "rgb(101, 0, 146)", result);
	}

	@Test
	public void testRadio_setParent() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setParent", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setParent($$('container1'));");
		Thread.sleep(500);
		selenium.getDriver().findElement(By.id("container1")).findElement(By.id("radioGroup1"));
	}

	@Test
	public void testRadio_getParent() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setParent", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setParent($$('container1'));");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('radioGroup1').getParent().id;");
		assertEquals("Check getParent() API", "container1", result);
	}

	@Test
	public void testRadio_setErrorDiv() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setErrorDiv", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setErrorDiv('container1');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('radioGroup1').errorDiv.selector;");
		assertEquals("Check setErrorDiv() API", "#container1", result);
	}

	@Test
	public void testRadio_getErrorDiv() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setErrorDiv", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setErrorDiv('container1');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('radioGroup1').getErrorDiv().attr('id');");
		assertEquals("Check getErrorDiv() API", "container1", result);
	}

	@Test
	public void testRadio_clear() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').clear", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').clear();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('radioGroup1').getValue() + '';");
		assertEquals("Check clear()/getValue() API", "undefined", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1 input').length + '';");
		assertEquals("Check clear()/displayed input API", "0", result);
	}

	@Test
	public void testRadio_setLabelText() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setLabelText", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setLabelText('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("Check setLabelText() API", "toto", result);
	}

	@Test
	public void testRadio_setLabelTextColor() throws InterruptedException {
		selenium.getDriver().findElement(By.id("radioGroup1"));
		waitFor("$$('radioGroup1').setLabelTextColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('radioGroup1').setLabelTextColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#label1').css('color') +'';");
		assertEquals("Check setLabelTextColor() API", "rgb(101, 0, 146)", result);
	}
}
