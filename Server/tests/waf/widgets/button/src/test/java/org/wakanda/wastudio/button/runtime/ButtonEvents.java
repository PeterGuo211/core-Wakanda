package org.wakanda.wastudio.button.runtime;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class ButtonEvents extends SeleniumRuntimeTemplate {
    
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		AdminCommand.startServer(ButtonEvents.class, "/solutions/ButtonEvents/ButtonEvents Solution/ButtonEvents.waSolution");
	}
    
    @Before
    public void beforeTest(){
	logger.info("Opening main page in localhost");
	selenium.getDriver().get("http://127.0.0.1:8081/index.html");
	//waitWebElementToBeClickable(selenium.getDriver(), By.id("button1"), 5);
    }
    @Test
    public void buttonTestClickEvent() {
	logger.info("beginning test : buttonTestClickEvent");
	List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='button1']"));
	if (selenium.countWebElements(rows) != 1)
	    Assert.fail("Button not found");
	
	WebElement button = selenium.getDriver().findElement(By.xpath("//*[@id='button1']"));
	logger.info(button.getTagName() + ": " + button.getAttribute("id")+ " perfom Click");
	button.click();
	
	String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
	assertEquals("click", binding);
    }
    
    @Test
    public void buttonTestDoubleClickEvent() {
	logger.info("beginning test : openButton");	
	List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='button1']"));
	if (selenium.countWebElements(rows) != 1)
	    Assert.fail("Button not found");
	
	WebElement button = selenium.getDriver().findElement(By.xpath("//*[@id='button1']"));
	logger.info(button.getTagName() + ": " + button.getAttribute("id")+ " perfom Double Click");
	
	
	Actions builder = new Actions(selenium.getDriver()); 
	builder.doubleClick(button).perform(); 
	
	String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
	assertEquals("dblclick", binding);
    }
    
    
    @Test
    public void buttonTestMousedownEvent() {
	logger.info("beginning test : openButton");
	List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='button1']"));
	if (selenium.countWebElements(rows) != 1)
	    Assert.fail("Button not found");
	
	WebElement button = selenium.getDriver().findElement(By.xpath("//*[@id='button1']"));
	logger.info(button.getTagName() + ": " + button.getAttribute("id")+ " perfom Double Click");
	
	
	Actions builder = new Actions(selenium.getDriver()); 
	builder.clickAndHold(button).perform(); 
	
	String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
	assertEquals("mousedown", binding);
    }
    
    @Test
    public void buttonTestMouseUpEvent() {
	logger.info("beginning test : openButton");
	List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='button3']"));
	if (selenium.countWebElements(rows) != 1)
	    Assert.fail("Button not found");
	
	WebElement button = selenium.getDriver().findElement(By.xpath("//*[@id='button3']"));
	logger.info(button.getTagName() + ": " + button.getAttribute("id")+ " perfom Double Click");
	
	Actions builder = new Actions(selenium.getDriver()); 
	builder.click(button).perform(); 
	
	String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
	assertEquals("mouseup", binding);
    }
    @Test
    public void buttonTestMouseOverEvent() {
	logger.info("beginning test : openButton");
	List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='button2']"));
	if (selenium.countWebElements(rows) != 1)
	    Assert.fail("Button not found");
	
	WebElement button = selenium.getDriver().findElement(By.xpath("//*[@id='button2']"));
	logger.info(button.getTagName() + ": " + button.getAttribute("id")+ " perfom Double Click");
	
	
	Actions builder = new Actions(selenium.getDriver()); 
	builder.click(button).perform(); 
	
	String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
	assertEquals("mouseover", binding);
    }
    
    /*	@Test
		public void buttonTestMouseOutEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='button2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='button2']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement button = selenium.getDriver().findElement(By.xpath("//*[@id='button2']"));
			WebElement text = selenium.getDriver().findElement(By.xpath("//*[@id='richText1']"));
			logger.info(button.getTagName() + ": " + button.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.click(button).perform(); 
			builder.click(text).perform(); 
			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText3').getValue()"));	
			assertEquals("mouseout", binding);
		}*/
}
