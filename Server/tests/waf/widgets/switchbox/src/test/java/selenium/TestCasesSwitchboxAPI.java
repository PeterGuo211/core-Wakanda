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

public class TestCasesSwitchboxAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesSwitchboxAPI.class, "/solutions/widgetSwitchbox/widgetSwitchbox Solution/widgetSwitchbox.waSolution");		
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/tablet/switchboxAPI.html");
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

	// ------------------------------------------------------------------------
	// Specific API
	// ------------------------------------------------------------------------
	@Test
	public void testSwitchbox_slide_true() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').slide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').slide(true);");
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("$$('switchbox1').slide(false);");
		Thread.sleep(500);
		selenium.getJsConsole().executeScript("$$('switchbox1').slide(true);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check slide() API", "true", result);
	}

	@Test
	public void testSwitchbox_slide_false() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').slide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').slide(false);");
		Thread.sleep(100);
		selenium.getJsConsole().executeScript("$$('switchbox1').slide(true);");
		Thread.sleep(100);
		selenium.getJsConsole().executeScript("$$('switchbox1').slide(false);");
		Thread.sleep(100);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check slide() API", "false", result);
	}

	@Test
	public void testSwitchbox_toggleSlide() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').toggleSlide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').toggleSlide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check toggleSlide() API", "true", result);
	}

	// ------------------------------------------------------------------------
	// Generic API
	// ------------------------------------------------------------------------
	@Test
	public void testSwitchbox_getValue() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').getValue", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check getValue() API", "false", result);
	}

	@Test
	public void testSwitchbox_setValue() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').getValue", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setValue('off');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check setValue() API", "false", result);
	}

	@Test
	public void testSwitchbox_hide() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#switchbox1').css('display') +'';");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testSwitchbox_hideX2() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').hide();");
		selenium.getJsConsole().executeScript("$$('switchbox1').hide();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#switchbox1').css('display') +'';");
		assertEquals("Check hide() API", "none", result);
	}

	@Test
	public void testSwitchbox_show() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').hide();");
		selenium.getJsConsole().executeScript("$$('switchbox1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#switchbox1').css('display') +'';");
		assertEquals("Check show() API", "block", result);
	}
	
	@Test
	public void testSwitchbox_showX2() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').hide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').hide();");
		selenium.getJsConsole().executeScript("$$('switchbox1').show();");
		selenium.getJsConsole().executeScript("$$('switchbox1').show();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#switchbox1').css('display') +'';");
		assertEquals("Check show() API", "block", result);
	}

	@Test
	public void testSwitchbox_toggle() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').toggle", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#switchbox1').css('display') +'';");
		assertEquals("Check toggle() API", "none", result);
	}

	@Test
	public void testSwitchbox_toggle_back() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').toggle", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').toggle();");
		selenium.getJsConsole().executeScript("$$('switchbox1').toggle();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#switchbox1').css('display') +'';");
		assertEquals("Check toggle() back API", "block", result);
	}

	@Test
	public void testSwitchbox_addClass() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').addClass", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').addClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("switchbox1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check addClass() API", "true", result);
	}

	@Test
	public void testSwitchbox_removeClass() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').addClass", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').addClass('toto');");
		selenium.getJsConsole().executeScript("$$('switchbox1').removeClass('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("switchbox1")).getAttribute("className").contains("toto") + "";
		assertEquals("Check removeClass() API", "false", result);
	}

	@Test
	public void testSwitchbox_move() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').move", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').move(0,0);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#switchbox1').css('top') +'';");
		assertEquals("Check move() API: top position", "0px", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#switchbox1').css('left') +'';");
		assertEquals("Check move() API: left position", "0px", result);
	}

	@Test
	public void testSwitchbox_resize_smaller() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').resize", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').resize(10,10);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("switchbox1"));
		assertEquals("Check resize() API: width", "10", myElement.getAttribute("offsetWidth"));
		assertEquals("Check resize() API: height", "10", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testSwitchbox_resize_bigger() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').resize", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').resize(300,300);");
		Thread.sleep(500);
		WebElement myElement = selenium.getDriver().findElement(By.id("switchbox1"));
		assertEquals("Check resize() API: width", "300", myElement.getAttribute("offsetWidth"));
		assertEquals("Check reisze() API: height", "300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testSwitchbox_setWidth() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').setWidth", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setWidth(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("switchbox1")).getAttribute("offsetWidth");
		assertEquals("Check setWidth() API", "100", result);
	}

	@Test
	public void testSwitchbox_getWidth() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').getWidth", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getWidth() +'';");;
		assertEquals("Check getWidth() API", "77", result);
	}

	@Test
	public void testSwitchbox_setHeight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').setHeight", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setHeight(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("switchbox1")).getAttribute("offsetHeight");
		assertEquals("Check setHeight() API", "100", result);
	}

	@Test
	public void testSwitchbox_getHeight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').getHeight", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getHeight() +'';");;
		assertEquals("Check getHeight() API", "27", result);
	}

	@Test
	public void testSwitchbox_setLeft() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').setLeft", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setLeft(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("switchbox1")).getAttribute("offsetLeft");
		assertEquals("Check setLeft() API", "100", result);
	}

	@Test
	public void testSwitchbox_setRight() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').setRight", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setRight(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#switchbox1').css('right') +'';");;
		assertEquals("Check setRight() API", "100px", result);
	}

	@Test
	public void testSwitchbox_setTop() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').setTop", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setTop(100);");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("switchbox1")).getAttribute("offsetTop");
		assertEquals("Check setTop() API", "100", result);
	}

	@Test
	public void testSwitchbox_setBottom() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').setBottom", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setBottom(100);");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#switchbox1').css('bottom') +'';");;
		assertEquals("Check setBottom() API", "100px", result);
	}

	@Test
	public void testSwitchbox_getPosition() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').getPosition", 10 * 1000);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getPosition().left +'';");
		assertEquals("Check getPosition() API : left", "55", result);
		result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getPosition().top +'';");
		assertEquals("Check getPosition() API : top", "31", result);
	}

	@Test
	public void testSwitchbox_destroy() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').destroy", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').destroy();");
		Thread.sleep(500);
		try {
			selenium.getDriver().findElement(By.id("switchbox1"));
			assertTrue(false);
		} catch (Exception e) {}
	}

	@Test
	public void testSwitchbox_disable() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').slide", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').slide(true);");
		// Wait for slide action to be done
		String result = "";
		Long timeEnd = System.currentTimeMillis() + 5 * 1000;
		while(timeEnd > System.currentTimeMillis())
		{
			result = selenium.getDriver().findElement(By.className("waf-switchbox-container")).getCssValue("margin-left") +"";
			logger.info("["+result+"]");
			if ("0px".equals(result))
				break;
			Thread.sleep(100);
		}
		selenium.getJsConsole().executeScript("$$('switchbox1').disable();");
		Thread.sleep(500);
		try{
		selenium.getDriver().findElement(By.className("waf-switchbox-switch")).click();
		}catch(Exception e){}
		result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check disable() API", "true", result);
	}

	@Test
	public void testSwitchbox_enable() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').disable", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').slide(true);");
		// Wait for slide action to be done
		String result = "";
		Long timeEnd = System.currentTimeMillis() + 5 * 1000;
		while(timeEnd > System.currentTimeMillis())
		{
			result = selenium.getDriver().findElement(By.className("waf-switchbox-container")).getCssValue("margin-left") +"";
			if ("0px".equals(result))
				break;
			Thread.sleep(100);
		}
		selenium.getJsConsole().executeScript("$$('switchbox1').disable();");
		selenium.getJsConsole().executeScript("$$('switchbox1').enable();");
		Thread.sleep(500);
		selenium.getDriver().findElement(By.className("waf-switchbox-switch")).click();
		// Wait for slide action to be done		
		result = "";
		timeEnd = System.currentTimeMillis() + 5 * 1000;
		while(timeEnd > System.currentTimeMillis())
		{
			result = selenium.getDriver().findElement(By.className("waf-switchbox-container")).getCssValue("margin-left") +"";
			if ("-48px".equals(result))
				break;
			Thread.sleep(100);
		}
		
		result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getValue() +'';");
		assertEquals("Check enable() API", "false", result);
	}

	@Test
	public void testSwitchbox_isDisabled_true() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').disable", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').disable();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').isDisabled() +'';");
		assertEquals("Check isDisabled() API", "true", result);
	}

	@Test
	public void testSwitchbox_isDisabled_false() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').disable", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').disable();");
		selenium.getJsConsole().executeScript("$$('switchbox1').enable();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').isDisabled() +'';");
		assertEquals("Check isDisabled() API", "false", result);
	}

	@Test
	public void testSwitchbox_setBackgroundColor() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').setBackgroundColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setBackgroundColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#switchbox1').css('background-color') +'';");
		assertEquals("Check setBackgroundColor() API", "rgb(101, 0, 146)", result);
	}

	@Test
	public void testSwitchbox_setTextColor() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').setTextColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setTextColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#switchbox1').css('color') +'';");
		assertEquals("Check setTextColor() API", "rgb(101, 0, 146)", result);
	}

	@Test
	public void testSwitchbox_setParent() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').setParent", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setParent($$('container1'));");
		Thread.sleep(500);
		selenium.getDriver().findElement(By.id("container1")).findElement(By.id("switchbox1"));
	}

	@Test
	public void testSwitchbox_getParent() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').setParent", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setParent($$('container1'));");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getParent().id;");
		assertEquals("Check getParent() API", "container1", result);
	}

	@Test
	public void testSwitchbox_setErrorDiv() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').setErrorDiv", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setErrorDiv('container1');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').errorDiv.selector;");
		assertEquals("Check setErrorDiv() API", "#container1", result);
	}

	@Test
	public void testSwitchbox_getErrorDiv() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').setErrorDiv", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setErrorDiv('container1');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $$('switchbox1').getErrorDiv().attr('id');");
		assertEquals("Check getErrorDiv() API", "container1", result);
	}

	@Test
	public void testSwitchbox_setLabelText() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').setLabelText", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setLabelText('toto');");
		Thread.sleep(500);
		String result = selenium.getDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("Check setLabelText() API", "toto", result);
	}

	@Test
	public void testSwitchbox_setLabelTextColor() throws InterruptedException {
		selenium.getDriver().findElement(By.id("switchbox1"));
		waitFor("$$('switchbox1').setLabelTextColor", 10 * 1000);
		selenium.getJsConsole().executeScript("$$('switchbox1').setLabelTextColor('#650092');");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#label1').css('color') +'';");
		assertEquals("Check setLabelTextColor() API", "rgb(101, 0, 146)", result);
	}
}
