package org.wakanda.qa.widgets.slider.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.wakanda.common.Paths;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesSliderAPI extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeTestSuite() throws URISyntaxException, IOException{
		Paths.solutionRelativePath = "/solutions/WidgetsAPI/WidgetsAPI.waSolution";
		AdminCommand.startServer(TestCasesSliderAPI.class, Paths.solutionRelativePath);
	}
	@Before
	public void beforeUT(){
		selenium.getDriver().get("http://127.0.0.1:8081/sliderAPI.html");
		selenium.getDriver().navigate().refresh();
	}
	//------------------------------------------------------------------------
	// Specific API
	//------------------------------------------------------------------------

	@Test
	public void testSlider_getValue() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("110", myValue);
	}
	
	
	@Test
	public void testSlider_setValue() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setValue")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("156", myValue);
	}
	
	@Test
	public void testSlider_setValues() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("addHandle")).click();
		selenium.getDriver().findElement(By.id("setValues")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("50,180", myValue);
	}
	
	@Test
	public void testSlider_addHandle() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("addHandle")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("80,110", myValue);
	}
	
	@Test
	public void testSlider_getMin() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getMin")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("20", myValue);
	}
	
	@Test
	public void testSlider_getMax() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getMax")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("200", myValue);
	}
	
	@Test
	public void testSlider_getStep() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getStep")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("2", myValue);
	}
	
	@Test
	public void testSlider_setStep() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setStep")).click();
		selenium.getDriver().findElement(By.id("getStep")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("5", myValue);
	}
	
	@Test
	public void testSlider_getRange() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getRange")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("min", myValue);
		
		selenium.getDriver().findElement(By.className("ui-slider-range-min"));
	}
	
	@Test
	public void testSlider_setRange_max() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setRange_max")).click();
		selenium.getDriver().findElement(By.id("getRange")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("max", myValue);
		
		selenium.getDriver().findElement(By.className("ui-slider-range-max"));
	}
	
	@Test
	public void testSlider_setRange_none() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setRange_none")).click();
		selenium.getDriver().findElement(By.id("getRange")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("none", myValue);
		
		WebElement elementResult = selenium.getDriver().findElement(By.xpath("//div[@id='slider1']/div"));
		assertEquals("none", elementResult.getCssValue("display"));
	}
	
	
	@Test
	public void testSlider_getOrientation() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getOrientation")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("horizontal", myValue);
	}
	
	@Test
	public void testSlider_setOrientation_vertical() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setOrientation_vertical")).click();
		selenium.getDriver().findElement(By.id("getOrientation")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("vertical", myValue);
	}
	
	@Test
	public void testSlider_setOrientation_horizontal() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setOrientation_vertical")).click();
		selenium.getDriver().findElement(By.id("setOrientation_horizontal")).click();
		selenium.getDriver().findElement(By.id("getOrientation")).click();
		Thread.sleep(500);

		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("horizontal", myValue);
	}
	
	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------
	
	@Test
	public void testSlider_hide() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("hide")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("slider1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testSlider_show() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("hide")).click();
		selenium.getDriver().findElement(By.id("show")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("slider1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testSlider_toggle() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("slider1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testSlider_toggle_back() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("toggle")).click();
		selenium.getDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("slider1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testSlider_addClass() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("addClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("slider1")).getAttribute("className").contains("toto");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testSlider_removeClass() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("addClass")).click();
		selenium.getDriver().findElement(By.id("removeClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("slider1")).getAttribute("className").contains("toto");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testSlider_move() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("move")).click();
		Thread.sleep(500);
		
		WebElement myElement = selenium.getDriver().findElement(By.id("slider1"));
		assertEquals("0px", myElement.getCssValue("top"));
		assertEquals("0px", myElement.getCssValue("left"));
	}
	
	@Test
	public void testSlider_resize_smaller() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("resize_smaller")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("slider1"));
		assertEquals("50", myElement.getAttribute("offsetWidth"));
		assertEquals("50", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testSlider_resize_bigger() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("resize_bigger")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("slider1"));
		assertEquals("300", myElement.getAttribute("offsetWidth"));
		assertEquals("300", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testSlider_setWidth() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setWidth")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("slider1")).getAttribute("offsetWidth");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testSlider_getWidth() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getWidth")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("200", myResult);
	}
	
	@Test
	public void testSlider_setHeight() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setHeight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("slider1")).getAttribute("offsetHeight");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testSlider_getHeight() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getHeight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("15", myResult);
	}
	
	@Test
	public void testSlider_setLeft() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setLeft")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("slider1")).getAttribute("offsetLeft");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testSlider_setRight() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setRight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("slider1")).getCssValue("right");
		assertEquals("100px", myResult);
	}

	@Test
	public void testSlider_setTop() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setTop")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("slider1")).getAttribute("offsetTop");
		assertEquals("100", myResult);
	}

	@Test
	public void testSlider_setBottom() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setBottom")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("slider1")).getCssValue("bottom");
		assertEquals("100px", myResult);
	}
	
	@Test
	public void testSlider_getPosition() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getPosition")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("slider1")).getAttribute("innerHTML").contains("undefined");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testSlider_destroy() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("destroy")).click();
		Thread.sleep(500);
		
		try{
			selenium.getDriver().findElement(By.id("slider1"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testSlider_disable() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("disable")).click();
		selenium.getDriver().findElement(By.id("setValue")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("156", myValue);
	}
	
	@Test
	public void testSlider_enable() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("disable")).click();
		selenium.getDriver().findElement(By.id("enable")).click();
		selenium.getDriver().findElement(By.id("setValue")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myValue = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("156", myValue);
	}
	
//	@Test
	public void testSlider_getTheme() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("getTheme")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("inherited default", myResult);
	}
	
	@Test
	public void testSlider_setBackgroundColor() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setBackgroundColor")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("slider1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testSlider_setTextColor() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setTextColor")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("slider1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testSlider_setParent() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setParent")).click();
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.id("richText1")).findElement(By.id("slider1"));
	}
	
	@Test
	public void testSlider_getParent() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setParent")).click();
		selenium.getDriver().findElement(By.id("getParent")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("richText1", myResult);
	}
	
	@Test
	public void testSlider_setErrorDiv() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testSlider_getErrorDiv() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("getErrorDiv")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testSlider_setErrorMessage() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testSlider_clearErrorMessage() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		selenium.getDriver().findElement(By.id("clearErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testSlider_clear() throws InterruptedException
	{
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("slider1"), 5);
		JavascriptExecutor js = selenium.getJsConsole();
		js.executeScript("$$('slider1').setValue(156);");
		js.executeScript("$$('slider1').clear();");
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myResult = (String) js.executeScript("return $$('slider1').getValue() +'';");
		assertEquals("110", myResult);
	}
	
	@Test
	public void testSlider_setLabelText() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setLabelText")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("toto", myResult);
	}
	
	@Test
	public void testSlider_setLabelTextColor() throws InterruptedException
	{
		selenium.getDriver().findElement(By.id("setLabelTextColor")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

}
