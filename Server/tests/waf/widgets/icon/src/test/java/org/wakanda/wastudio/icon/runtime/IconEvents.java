package org.wakanda.wastudio.icon.runtime;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;
public class IconEvents extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		
		AdminCommand.startServer(IconEvents.class, "/solutions/IconEvents/IconEvents Solution/IconEvents.waSolution");
		
	}
	@Before
	public void beforeTest() throws Throwable{
		selenium.getDriver().get("http://127.0.0.1:8081/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
	}	
	@Test
	public void iconTestClickEvent() {
		WebElement icon = selenium.getDriver().findElement(By.xpath("//*[@id='icon1']"));
		logger.info(icon.getTagName() + ": " + icon.getAttribute("id")	+ " perfom Click");
		icon.click();

		String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
		assertEquals("click", binding);
	}

	@Test
	public void iconTestDoubleClickEvent() {
		WebElement icon = selenium.getDriver().findElement(By.xpath("//*[@id='icon1']"));
		logger.info(icon.getTagName() + ": " + icon.getAttribute("id")+ " perfom Double Click");


		Actions builder = new Actions(selenium.getDriver()); 
		builder.doubleClick(icon).perform(); 

		String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
		assertEquals("dblclick", binding);
	}


	@Test
	public void iconTestMousedownEvent() {
		WebElement icon = selenium.getDriver().findElement(By.xpath("//*[@id='icon1']"));
		logger.info(icon.getTagName() + ": " + icon.getAttribute("id")+ " perfom Double Click");

		Actions builder = new Actions(selenium.getDriver()); 
		builder.clickAndHold(icon).perform(); 

		String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
		assertEquals("mousedown", binding);
	}

	@Test
	public void iconTestMouseUpEvent() {
		WebElement icon = selenium.getDriver().findElement(By.xpath("//*[@id='icon3']"));
		logger.info(icon.getTagName() + ": " + icon.getAttribute("id")+ " perfom Double Click");


		Actions builder = new Actions(selenium.getDriver()); 
		builder.click(icon).perform(); 

		String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
		assertEquals("mouseup", binding);
	}
	@Test
	public void iconTestMouseOverEvent() {
		WebElement icon = selenium.getDriver().findElement(By.xpath("//*[@id='icon2']"));
		logger.info(icon.getTagName() + ": " + icon.getAttribute("id")+ " perfom Double Click");


		Actions builder = new Actions(selenium.getDriver()); 
		builder.click(icon).perform(); 

		String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
		assertEquals("mouseover", binding);
	}

	/*	@Test
		public void iconTestMouseOutEvent() {
			logger.info("beginning test : openIcon");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='icon2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='icon2']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("Icon not found");

			WebElement icon = selenium.getDriver().findElement(By.xpath("//*[@id='icon2']"));
			WebElement text = selenium.getDriver().findElement(By.xpath("//*[@id='richText1']"));
			logger.info(icon.getTagName() + ": " + icon.getAttribute("id")+ " perfom Double Click");


			Actions builder = new Actions(selenium.getDriver()); 
			builder.click(icon).perform(); 
			builder.click(text).perform(); 
			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText3').getValue()"));	
			assertEquals("mouseout", binding);
		}*/
}
