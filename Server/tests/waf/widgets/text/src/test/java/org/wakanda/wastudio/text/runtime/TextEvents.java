package org.wakanda.wastudio.text.runtime;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TextEvents extends SeleniumRuntimeTemplate {
	
	 
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		
		
		AdminCommand.startServer(TextEvents.class, "/solutions/TextEvents/TextEvents Solution/TextEvents.waSolution");
	}
	
		@Test
		public void textTestClickEvent() {
			logger.info("beginning test : textTestClickEvent");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			WebElement text = selenium.getDriver().findElement(By.xpath("//*[@id='richText1']"));
			logger.info(text.getTagName() + ": " + text.getAttribute("id")+ " perfom Click");
			text.click();

			
			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText4').getValue()"));	
			assertEquals("click", binding);
		}

		@Test
		public void textTestDoubleClickEvent() {
			logger.info("beginning test : openText");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			WebElement text = selenium.getDriver().findElement(By.xpath("//*[@id='richText1']"));
			logger.info(text.getTagName() + ": " + text.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.doubleClick(text).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText4').getValue()"));	
			assertEquals("dblclick", binding);
		}
	
	
		@Test
		public void textTestMousedownEvent() {
			logger.info("beginning test : openText");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			WebElement text = selenium.getDriver().findElement(By.xpath("//*[@id='richText1']"));
			logger.info(text.getTagName() + ": " + text.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.clickAndHold(text).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText4').getValue()"));	
			assertEquals("mousedown", binding);
		}
	
		//@Test
		public void textTestMouseUpEvent() {
			logger.info("beginning test : openText");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			WebElement text = selenium.getDriver().findElement(By.xpath("//*[@id='richText3']"));
			logger.info(text.getTagName() + ": " + text.getAttribute("id")+ " perfom Double Click");
	
			Actions builder = new Actions(selenium.getDriver()); 
			builder.click(text).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText4').getValue()"));	
			assertEquals("mouseup", binding);
		}
		@Test
		public void textTestMouseOverEvent() {
			logger.info("beginning test : openText");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			WebElement text = selenium.getDriver().findElement(By.xpath("//*[@id='richText2']"));
			logger.info(text.getTagName() + ": " + text.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.click(text).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText5').getValue()"));	
			assertEquals("mouseover", binding);
		}
	/*
		@Test
		public void textTestMouseOutEvent() {
			logger.info("beginning test : openText");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='richText2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='richText2']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("Text not found");

			WebElement text = selenium.getDriver().findElement(By.xpath("//*[@id='richText2']"));
			
			logger.info(text.getTagName() + ": " + text.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.clickAndHold(text).perform(); 
			
			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText5').getValue()"));	
			assertEquals("mouseout", binding);
		}*/
}
