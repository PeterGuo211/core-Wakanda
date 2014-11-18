package org.wakanda.qa.widgets.dialog.runtime;

import static org.wakanda.common.server.AdminCommand.startServer;
import static org.wakanda.selenium.SeleniumUtils.setWidgetId;

import java.io.IOException;
import java.net.URISyntaxException;

import junit.framework.Assert;

import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.wakanda.common.testing.Widgets;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesDialogEvents extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		startServer(TestCasesDialogEvents.class,"/solutions/dialogEvents/dialogEvents Solution/dialogEvents.waSolution");
	}

	
	@Test
	public void testChart_onMouseOut() throws InterruptedException {

		selenium.getDriver().get("http://127.0.0.1:8081/onMousOut.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);

		Actions act = new Actions(selenium.getDriver());
		act.moveByOffset(500, 300).perform();
		act.moveByOffset(-500, -300).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		Assert.assertEquals("mouseOut", text);
	}

	
	@Test
	public void testChart_onMouseOver() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/onMouseOver.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);

		Actions act = new Actions(selenium.getDriver());
		act.moveByOffset(500, 300).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		act.release();
		Assert.assertEquals("MouseOver", text);
	}

	@Test
	public void testChart_onClick() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/onClick.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);
		
		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"	+ setWidgetId(Widgets.dialog, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.click(elem).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		Assert.assertEquals("onclick", text);
	}

	
	@Test
	public void testChart_onDoubleClick() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/onDbClick.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);

		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"	+ setWidgetId(Widgets.dialog, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.doubleClick(elem).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		Assert.assertEquals("DoubleClick", text);
	}

	
	@Test
	public void testChart_onMouseUp() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/onMouseUp.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);
		
		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"	+ setWidgetId(Widgets.dialog, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.click(elem).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		act.release();
		Assert.assertEquals("mouseUp", text);

	}

	@Test
	public void testChart_onMouseDown() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/onMouseDown.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);

		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"+ setWidgetId(Widgets.dialog, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.clickAndHold(elem).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		act.release();
		Assert.assertEquals("mouseDown", text);
	}

	
	@Test
	public void testChart_onStartResize() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/onStartResize.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);

		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='dialog1']/div[6]"));
		Actions act = new Actions(selenium.getDriver());
		act.clickAndHold(elem).perform();
		act.moveByOffset(200, 200).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		act.release();
		Assert.assertEquals("startResize", text);
		
	}

	@Test
	public void testChart_onResize() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/onResize.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);

		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='dialog1']/div[6]"));
		Actions act = new Actions(selenium.getDriver());
		act.clickAndHold(elem).perform();
		act.moveByOffset(200, 200).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		act.release();
		Assert.assertEquals("onResize", text);

	}

	@Test
	public void testChart_onStopResize() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/stopResize.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);
		
		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='dialog1']/div[6]"));
		Actions act = new Actions(selenium.getDriver());
		act.clickAndHold(elem).perform();
		act.moveByOffset(300, 200).perform();
		act.click().perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		Assert.assertEquals("stopResize", text);
		


	}

}
