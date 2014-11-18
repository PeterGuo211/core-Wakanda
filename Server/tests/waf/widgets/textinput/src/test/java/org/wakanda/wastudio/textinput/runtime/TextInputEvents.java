package org.wakanda.wastudio.textinput.runtime;

import static org.junit.Assert.assertEquals;
import static org.wakanda.common.Common.getResourcePath;

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
import org.wakanda.common.Paths;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;
import org.wakanda.wastudio.textinput.api.TestCasesInputAPI;

public class TextInputEvents extends SeleniumRuntimeTemplate{
	
	
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
	
		
		AdminCommand.startServer(TextInputEvents.class, "/solutions/TextInputEvents/TextInputEvents Solution/TextInputEvents.waSolution");
	}
	
		@Test
		public void textInputTestClickEvent() {
			logger.info("beginning test : textInputTestClickEvent");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By
						.xpath("//*[@id='textField1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "
							+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By
					.xpath("//*[@id='textField1']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("TextInput not found");

			WebElement textInput = selenium.getDriver().findElement(By.xpath("//*[@id='textField1']"));
			logger.info(textInput.getTagName() + ": " + textInput.getAttribute("id")
					+ " perfom Click");
			textInput.click();

			
			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("click", binding);
		}

		@Test
		public void textInputTestDoubleClickEvent() {
			logger.info("beginning test : openTextInput");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='textField1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='textField1']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("TextInput not found");

			WebElement textInput = selenium.getDriver().findElement(By.xpath("//*[@id='textField1']"));
			logger.info(textInput.getTagName() + ": " + textInput.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.doubleClick(textInput).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("dblclick", binding);
		}
	
	
		@Test
		public void textInputTestMousedownEvent() {
			logger.info("beginning test : openTextInput");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='textField1']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='textField1']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("TextInput not found");

			WebElement textInput = selenium.getDriver().findElement(By.xpath("//*[@id='textField1']"));
			logger.info(textInput.getTagName() + ": " + textInput.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.clickAndHold(textInput).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mousedown", binding);
		}
	
		//@Test
		public void textInputTestMouseUpEvent() {
			logger.info("beginning test : openTextInput");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='textField3']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='textField3']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("TextInput not found");

			WebElement textInput = selenium.getDriver().findElement(By.xpath("//*[@id='textField3']"));
			logger.info(textInput.getTagName() + ": " + textInput.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.click(textInput).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseup", binding);
		}
		@Test
		public void textInputTestMouseOverEvent() {
			logger.info("beginning test : openTextInput");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='textField2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='textField2']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("TextInput not found");

			WebElement textInput = selenium.getDriver().findElement(By.xpath("//*[@id='textField2']"));
			logger.info(textInput.getTagName() + ": " + textInput.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.click(textInput).perform(); 

			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText1').getValue()"));	
			assertEquals("mouseover", binding);
		}
	
		@Test
		public void textInputTestMouseOutEvent() {
			logger.info("beginning test : openTextInput");
			logger.info("Opening main page in localhost");
			selenium.getDriver().get("http://127.0.0.1:8081/index.html");

			long end = System.currentTimeMillis() + 5000;
			while (System.currentTimeMillis() < end) {
				WebElement resultsDiv = selenium.getDriver().findElement(By.xpath("//*[@id='textField2']"));
				if (resultsDiv.isDisplayed()) {
					logger.info(resultsDiv.getTagName() + ": "	+ resultsDiv.getAttribute("id") + " Displayed");
					break;
				}
			}

			List<WebElement> rows = selenium.getDriver().findElements(By.xpath("//*[@id='textField2']"));
			if (selenium.countWebElements(rows) != 1)
				Assert.fail("TextInput not found");

			WebElement textInput = selenium.getDriver().findElement(By.xpath("//*[@id='textField2']"));
			WebElement text = selenium.getDriver().findElement(By.xpath("//*[@id='richText2']"));
			logger.info(textInput.getTagName() + ": " + textInput.getAttribute("id")+ " perfom Double Click");

				
			Actions builder = new Actions(selenium.getDriver()); 
			builder.click(textInput).perform(); 
			builder.click(text).perform(); 
			String binding = ((String) ((JavascriptExecutor)selenium.getDriver()).executeScript("return $$('richText2').getValue()"));	
			assertEquals("mouseout", binding);
		}
}
