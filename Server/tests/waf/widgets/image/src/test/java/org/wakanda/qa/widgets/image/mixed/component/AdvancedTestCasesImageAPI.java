package org.wakanda.qa.widgets.image.mixed.component;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.wakanda.common.Paths;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class AdvancedTestCasesImageAPI extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeTestSuite() throws URISyntaxException, IOException{
		Paths.solutionRelativePath = "/solutions/mixedwidgetsAPI/mixedwidgetsAPI Solution/mixedwidgetsAPI.waSolution";
		AdminCommand.startServer(AdvancedTestCasesImageAPI.class,Paths.solutionRelativePath);
	}
	@Before
	public void BeforeTest(){
		selenium.getDriver().get("http://127.0.0.1:8081/imageAPI.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
	}
	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------

	@Test
	public void testImage_getValue() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("http://127.0.0.1:8081/walib/WAF/widget/css/images/emptyImage.png", myResult);
	}

	@Test
	public void testImage_setValue() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setValue")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("http://127.0.0.1:8081/images/soleil.gif", myResult);
	}

	@Test
	public void testImage_hide() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("hide")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("image1")).getCssValue("display");
		assertEquals("none", myResult);
	}

	@Test
	public void testImage_show() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("hide")).click();
		selenium.getDriver().findElement(By.id("show")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("image1")).getCssValue("display");
		assertEquals("block", myResult);
	}

	@Test
	public void testImage_toggle() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("image1")).getCssValue("display");
		assertEquals("none", myResult);
	}

	@Test
	public void testImage_toggle_back() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("toggle")).click();
		selenium.getDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("image1")).getCssValue("display");
		assertEquals("block", myResult);
	}

	@Test
	public void testImage_addClass() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("addClass")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("image1")).getAttribute("className").contains("toto");
		assertEquals(true, myResult);
	}

	@Test
	public void testImage_removeClass() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("addClass")).click();
		selenium.getDriver().findElement(By.id("removeClass")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("image1")).getAttribute("className").contains("toto");
		assertEquals(false, myResult);
	}

	@Test
	public void testImage_move() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("move")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("image1"));
		assertEquals("0px", myElement.getCssValue("top"));
		assertEquals("0px", myElement.getCssValue("left"));
	}

	@Test
	public void testImage_resize_smaller() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("resize_smaller")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("image1"));
		assertEquals("50", myElement.getAttribute("offsetWidth"));
		assertEquals("50", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testImage_resize_bigger() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("resize_bigger")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("image1"));
		assertEquals("300", myElement.getAttribute("offsetWidth"));
		assertEquals("300", myElement.getAttribute("offsetHeight"));
	}

	@Test
	public void testImage_setWidth() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setWidth")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("image1")).getAttribute("offsetWidth");
		assertEquals("100", myResult);
	}

	@Test
	public void testImage_getWidth() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getWidth")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("85", myResult);
	}

	@Test
	public void testImage_setHeight() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setHeight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("image1")).getAttribute("offsetHeight");
		assertEquals("100", myResult);
	}

	@Test
	public void testImage_getHeight() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getHeight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("80", myResult);
	}

	@Test
	public void testImage_setLeft() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setLeft")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("image1")).getAttribute("offsetLeft");
		assertEquals("100", myResult);
	}

	@Test
	public void testImage_setRight() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setRight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("image1")).getCssValue("right");
		assertEquals("100px", myResult);
	}

	@Test
	public void testImage_setTop() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setTop")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("image1")).getAttribute("offsetTop");
		assertEquals("100", myResult);
	}

	@Test
	public void testImage_setBottom() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setBottom")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("image1")).getCssValue("bottom");
		assertEquals("100px", myResult);
	}

	@Test
	public void testImage_getPosition() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getPosition")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("image1")).getAttribute("innerHTML").contains("undefined");
		assertEquals(false, myResult);
	}

	@Test
	public void testImage_destroy() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("destroy")).click();
		Thread.sleep(500);

		try{
			selenium.getDriver().findElement(By.id("image1"));
			assertTrue(false);
		}catch(Exception e){}
	}

	@Test
	public void testImage_disable() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("disable")).click();
		//selenium.getDriver().findElement(By.id("image1")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("", myValue);
	}

	@Test
	public void testImage_enable() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("disable")).click();
		selenium.getDriver().findElement(By.id("enable")).click();
		selenium.getDriver().findElement(By.id("image1")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("Clicked", myValue);
	}

	@Test
	public void testImage_getTheme() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getTheme")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("", myResult);
	}

	@Test
	public void testImage_setBackgroundColor() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setBackgroundColor")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("image1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

	@Test
	public void testImage_setTextColor() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setTextColor")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("image1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

	@Test
	public void testImage_setParent() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setParent")).click();
		Thread.sleep(500);

		selenium.getDriver().findElement(By.id("richText1")).findElement(By.id("image1"));
	}

	@Test
	public void testImage_getParent() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setParent")).click();
		selenium.getDriver().findElement(By.id("getParent")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("richText1", myResult);
	}

	@Ignore
	public void testImage_setErrorDiv() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}

	@Ignore
	public void testImage_getErrorDiv() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("getErrorDiv")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
		assertEquals(true, myResult);
	}

	@Ignore
	public void testImage_setErrorMessage() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}

	@Ignore
	public void testImage_clearErrorMessage() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		selenium.getDriver().findElement(By.id("clearErrorMessage")).click();
		Thread.sleep(500);

		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(false, myResult);
	}

	@Test
	public void testImage_clear() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setValue")).click();
		selenium.getDriver().findElement(By.id("clear")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("http://127.0.0.1:8081/walib/WAF/widget/css/images/emptyImage.png", myResult);
	}

	@Test
	public void testImage_setLabelText() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setLabelText")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("toto", myResult);
	}

	@Test
	public void testImage_setLabelTextColor() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setLabelTextColor")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

}
