package org.wakanda.wastudio.runtime.calendar;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class CalendarEvents extends SeleniumRuntimeTemplate{
	
				
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		AdminCommand.startServer(CalendarEvents.class, "/solutions/CalendarEvents/CalendarEvents Solution/CalendarEvents.waSolution");
	}
		@Test
		public void calendarTestClickEvent() {
			logger.info("beginning test : calendarTestClickEvent");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By
						.xpath("//*[@id='calendar1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "
							+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By
					.xpath("//*[@id='calendar1']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement calendar = selenium.getDriver().findElement(By.xpath("//*[@id='calendar1']"));
			logger.info(calendar.getTagName() + ": " + calendar.getAttribute("id")
					+ " perfom Click");
			calendar.click();

			
			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("click", binding);
		}

		@Test
		public void calendarTestDoubleClickEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='calendar1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='calendar1']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement calendar = selenium.getDriver().findElement(By.xpath("//*[@id='calendar1']"));
			logger.info(calendar.getTagName() + ": " + calendar.getAttribute("id")+ " perfom Double Click");

				
		/*	Actions builder = new Actions(selenium.getDriver()); 
			builder.doubleClick(calendar).perform(); */
			JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
			js.executeScript("$('#calendar1').trigger('dblclick');");
			
			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("dblclick", binding);
		}
	
	
		@Test
		public void calendarTestMousedownEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='calendar1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='calendar1']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement calendar = selenium.getDriver().findElement(By.xpath("//*[@id='calendar1']"));
			logger.info(calendar.getTagName() + ": " + calendar.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.clickAndHold(calendar).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mousedown", binding);
		}
	
		@Test
		public void calendarTestMouseUpEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='calendar3']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='calendar3']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement calendar = selenium.getDriver().findElement(By.xpath("//*[@id='calendar3']"));
			logger.info(calendar.getTagName() + ": " + calendar.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.click(calendar).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseup", binding);
		}
		@Test
		public void calendarTestMouseOverEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='calendar2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='calendar2']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement calendar = selenium.getDriver().findElement(By.xpath("//*[@id='calendar2']"));
			logger.info(calendar.getTagName() + ": " + calendar.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.click(calendar).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseover", binding);
		}

	/*	@Test
		public void calendarTestMouseOutEvent() {
			logger.info("beginning test : openButton");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='calendar2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='calendar2']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("Button not found");

			WebElement calendar = selenium.getDriver().findElement(By.xpath("//*[@id='calendar2']"));
			WebElement text = selenium.getDriver().findElement(By.xpath("//*[@id='richText3']"));
			logger.info(calendar.getTagName() + ": " + calendar.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.click(calendar).perform(); 
			
			builder.click(text).perform(); 
			builder.click(text).perform(); 
			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText3').getValue()"));	
			assertEquals("mouseout", binding);
		}
		*/
		
}
