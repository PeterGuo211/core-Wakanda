package org.wakanda.wastudio.checkbox.runtime;

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

public class CheckboxEvents extends SeleniumRuntimeTemplate {
	
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
	/*	Paths.solutionRelativePath = "/solutions/CheckBoxEvents/CheckBoxEvents Solution/CheckBoxEvents.waSolution";
		String solutionPath = getResourcePath(CheckboxEvents.class, Paths.solutionRelativePath);

		logger.info(solutionPath);
		serverProcess = startServer(solutionPath);
		
		*/
		
		AdminCommand.startServer(CheckboxEvents.class, "/solutions/CheckBoxEvents/CheckBoxEvents Solution/CheckBoxEvents.waSolution");
	}
	
		@Test
		public void checkboxTestClickEvent() {
			logger.info("beginning test : checkboxTestClickEvent");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By
						.xpath("//*[@id='checkbox1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "
							+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By
					.xpath("//*[@id='checkbox1']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("Checkbox not found");

			WebElement checkbox = selenium.getDriver().findElement(By.xpath("//*[@id='checkbox1']"));
			logger.info(checkbox.getTagName() + ": " + checkbox.getAttribute("id")
					+ " perfom Click");
			checkbox.click();

			
			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("click", binding);
		}

	/*	@Test
		public void checkboxTestChangeEvent() {
			logger.info("beginning test : openCheckbox");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='checkbox1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='checkbox1']"));
			if (countWebElements(rows) != 1)
				Assert.fail("Checkbox not found");

			WebElement checkbox = selenium.getDriver().findElement(By.xpath("//*[@id='checkbox1']/input"));
			logger.info(checkbox.getTagName() + ": " + checkbox.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.click(checkbox).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("change", binding);
		}
	
	*/
		@Test
		public void checkboxTestMousedownEvent() {
			logger.info("beginning test : openCheckbox");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='checkbox1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='checkbox1']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("Checkbox not found");

			WebElement checkbox = selenium.getDriver().findElement(By.xpath("//*[@id='checkbox1']"));
			logger.info(checkbox.getTagName() + ": " + checkbox.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.clickAndHold(checkbox).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mousedown", binding);
		}
	
		@Test
		public void checkboxTestMouseUpEvent() {
			logger.info("beginning test : openCheckbox");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='checkbox3']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='checkbox3']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("Checkbox not found");

			WebElement checkbox = selenium.getDriver().findElement(By.xpath("//*[@id='checkbox3']"));
			logger.info(checkbox.getTagName() + ": " + checkbox.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.click(checkbox).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseup", binding);
		}
		@Test
		public void checkboxTestMouseOverEvent() {
			logger.info("beginning test : openCheckbox");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='checkbox2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='checkbox2']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("Checkbox not found");

			WebElement checkbox = selenium.getDriver().findElement(By.xpath("//*[@id='checkbox2']"));
			logger.info(checkbox.getTagName() + ": " + checkbox.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.click(checkbox).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseover", binding);
		}
	
		@Test
		public void checkboxTestMouseOutEvent() {
			logger.info("beginning test : openCheckbox");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='checkbox4']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='checkbox4']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("Checkbox not found");

			WebElement checkbox = selenium.getDriver().findElement(By.xpath("//*[@id='checkbox4']/input"));
			WebElement text = selenium.getDriver().findElement(By.xpath("//*[@id='richText2']"));
			logger.info(checkbox.getTagName() + ": " + checkbox.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.doubleClick(checkbox).perform(); 
			builder.click(text).perform(); 
			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText2').getValue()"));	
			assertEquals("mouseout", binding);
		}
}
