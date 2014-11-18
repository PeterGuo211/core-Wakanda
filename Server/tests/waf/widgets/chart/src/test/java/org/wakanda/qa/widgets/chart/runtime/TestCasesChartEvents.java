package org.wakanda.qa.widgets.chart.runtime;

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

public class TestCasesChartEvents extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		startServer(TestCasesChartEvents.class,"/solutions/ChartEvents/ChartEvents Solution/ChartEvents.waSolution");
	}


	
	@Test
	public void testChart_onMouseOut() throws InterruptedException {

		selenium.getDriver().get("http://127.0.0.1:8081/mouseOut.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);

		Actions act = new Actions(selenium.getDriver());
		act.moveByOffset(500, 300).perform();
		act.moveByOffset(-500, -300).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		Assert.assertEquals("mouseout", text);
	}

	
	@Test
	public void testChart_onMouseOver() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/mouseOver.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);

		Actions act = new Actions(selenium.getDriver());
		act.moveByOffset(500, 300).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		act.release();
		Assert.assertEquals("mouseover", text);
	}

	@Test
	public void testChart_onClick() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/click.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);
		
		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"	+ setWidgetId(Widgets.container, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.click(elem).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		Assert.assertEquals("click", text);
	}

	
	@Test
	public void testChart_onDoubleClick() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/dbclick.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);

		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"	+ setWidgetId(Widgets.container, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.doubleClick(elem).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		Assert.assertEquals("dblclick", text);
	}

	
	@Test
	public void testChart_onMouseUp() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/mouseUp.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);
		
		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"	+ setWidgetId(Widgets.container, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.click(elem).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		act.release();
		Assert.assertEquals("mouseup", text);

	}

	@Test
	public void testChart_onMouseDown() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/mouseDown.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);

		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"+ setWidgetId(Widgets.container, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.clickAndHold(elem).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		act.release();
		Assert.assertEquals("mousedown", text);
	}

	
	@Test
	public void testChart_onResize() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/onResize.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);

		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"+ setWidgetId(Widgets.container, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.clickAndHold(elem).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		act.release();
		Assert.assertEquals("onResize", text);
		
	}

	@Test
	public void testChart_onStartResize() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/startResize.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);

		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='container1']/div[6]"));
		Actions act = new Actions(selenium.getDriver());
		act.clickAndHold(elem).perform();
		act.moveByOffset(200, 200).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		act.release();
		Assert.assertEquals("startResize", text);

	}

	@Test
	public void testChart_onStopResize() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/stopResize.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText2"), 5);
		
		
		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='container1']/div[6]"));
		Actions act = new Actions(selenium.getDriver());
		act.clickAndHold(elem).perform();
		act.moveByOffset(50, 50).perform();
		act.release(elem).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 2))).getText();
		Assert.assertEquals("stopResize", text);
		


	}

}
