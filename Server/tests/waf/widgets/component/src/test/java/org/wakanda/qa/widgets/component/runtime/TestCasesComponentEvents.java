package org.wakanda.qa.widgets.component.runtime;

import static org.wakanda.selenium.SeleniumUtils.setWidgetId;

import java.io.IOException;
import java.net.URISyntaxException;

import junit.framework.Assert;

import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.wakanda.common.Paths;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.common.testing.Widgets;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesComponentEvents extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeTestSuite() throws URISyntaxException, IOException{

		Paths.solutionRelativePath  = "/solutions/componentEvents/componentEvents Solution/componentEvents.waSolution";
		AdminCommand.startServer(TestCasesComponentEvents.class, Paths.solutionRelativePath);
	}

	@Test
	public void testChart_onMouseOut() throws InterruptedException {

		selenium.getDriver().get("http://127.0.0.1:8081/mouseout.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);

		Actions act = new Actions(selenium.getDriver());
		act.moveByOffset(500, 300).perform();
		act.moveByOffset(-500, -300).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 1))).getText();
		Assert.assertEquals("onmouseout", text);
	}

	
	@Test
	public void testChart_onMouseOver() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/mouseover.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);

		Actions act = new Actions(selenium.getDriver());
		act.moveByOffset(500, 300).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 1))).getText();
		act.release();
		Assert.assertEquals("onmouseover", text);
	}

	@Test
	public void testChart_onClick() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/click.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);
		
		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"	+ setWidgetId(Widgets.component, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.click(elem).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 1))).getText();
		Assert.assertEquals("onclick", text);
	}

	
	@Test
	public void testChart_onDoubleClick() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/dbclick.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);

		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"	+ setWidgetId(Widgets.component, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.doubleClick(elem).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 1))).getText();
		Assert.assertEquals("ondbclick", text);
	}

	
	@Test
	public void testChart_onMouseUp() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/mouseup.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);
		
		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"	+ setWidgetId(Widgets.component, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.click(elem).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 1))).getText();
		act.release();
		Assert.assertEquals("onmouseup", text);

	}

	@Test
	public void testChart_onMouseDown() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/mousedown.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);

		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='"+ setWidgetId(Widgets.component, 1) + "']"));
		Actions act = new Actions(selenium.getDriver());
		act.clickAndHold(elem).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 1))).getText();
		act.release();
		Assert.assertEquals("onmousedown", text);
	}

	
	@Test
	public void testChart_onResize() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/resize.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);

		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='component1']/div[3]"));
		Actions act = new Actions(selenium.getDriver());
		act.clickAndHold(elem).perform();
		act.moveByOffset(200, 200).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 1))).getText();
		act.release();
		Assert.assertEquals("onResize", text);
		
	}

	@Test
	public void testChart_onStartResize() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/startResize.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);

		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='component1']/div[3]"));
		Actions act = new Actions(selenium.getDriver());
		act.clickAndHold(elem).perform();
		act.moveByOffset(200, 200).perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 1))).getText();
		act.release();
		Assert.assertEquals("onstartResize", text);

	}

	@Test
	public void testChart_onStopResize() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/stopResize.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),By.id("richText1"), 5);
		
		WebElement elem = selenium.getDriver().findElement(By.xpath("//*[@id='component1']/div[3]"));
		Actions act = new Actions(selenium.getDriver());
		act.clickAndHold(elem).perform();
		act.moveByOffset(200, 200).perform();
		act.click().perform();
		String text = selenium.getDriver().findElement(By.id(setWidgetId(Widgets.text, 1))).getText();
		Assert.assertEquals("onstopResize", text);
		

	}
}
