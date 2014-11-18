package org.wakanda.debuggerchrome;

import java.net.MalformedURLException;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.wakanda.common.Common;
public class AutoCompletionWatchExpression extends TemplateChromeDebuggerTests {

	static int size = 0;

	public String verifyInWatcher() throws InterruptedException {
		size = selenium.getDriver()
				.findElements(By.xpath(XPaths.ListWatchExpressions+"/li")).size();

		logger.info("The current size of Watch Expression is : " + size);
		String xPathResult;
		if (size == 1)
			xPathResult = XPaths.ListWatchExpressions + "/li/span[3]";
		else
			xPathResult = XPaths.ListWatchExpressions + "/li[" + size
					+ "]/span[3]";

		String result = null;
		int i = 0;
		while (i < 3) {
			try {
				result = selenium.getDriver()
						.findElement(By.xpath(xPathResult))
						.getAttribute("innerHTML");
				if (!result.equals("\"Error\""))
					return result;
			} catch (Exception e) {
				logger.warn("Retry " + i
						+ " to get the result fom watcher is failed");
			}
			i++;
			Thread.sleep(500);

		}
		return result;
	}

	public void clearWatchExpressions() {
		try {
			WebElement elem = getElementByXPath(XPaths.ListWatchExpressions);
			Actions action = new Actions(selenium.getDriver());
			action.contextClick(elem).sendKeys(Keys.ARROW_DOWN)
					.sendKeys(Keys.ARROW_DOWN).sendKeys(Keys.ARROW_DOWN)
					.sendKeys(Keys.RETURN).build().perform();
			logger.info("Watch Expressions succesfully cleared");
		} catch (Exception e) {
			// TODO: handle exception
			logger.info("WatcherExpression is empty");
		}
	}

	public void addInWatcher(String str) {
		WebElement element = getElementByXPath(XPaths.AddInWatcherButton);
		element.click();
		element = getElementByXPath(XPaths.InputWatch);
		element.sendKeys(str);
		getElementByXPath(XPaths.InputWatch + "/span");
		element.sendKeys(Keys.TAB);
		element.sendKeys(Keys.ENTER);
		try{
		element.sendKeys(Keys.ENTER);
		}catch (Exception e) {
			logger.warn("Error when try to Click on Enter a second time");
		}
	}

	public void typeContextTriggered() throws MalformedURLException,
			InterruptedException {

		
		super.typeContextTriggered();

		if (size > 10) {
			clearWatchExpressions();
			size = 1;
		}

	}

	public void CheckElementInTheWatcher(String key, String result)
			throws MalformedURLException, InterruptedException {

		typeContextTriggered();
		addInWatcher(key);
		// Thread.sleep(2000);
		Assert.assertEquals(result, verifyInWatcher());

	}

	@Test
	public void jsonObjectDisplayed() throws Exception {
		CheckElementInTheWatcher("pers", "Object");

	}

	@Test
	public void numberDiplayed() throws Exception {

		CheckElementInTheWatcher("ah_N", "20");
	}

	@Test
	public void stringQuoteDiplayed() throws Exception {

		CheckElementInTheWatcher("ah_str_", "\"ah_STRING_QUOTE\"");
	}

	//a crorriger
	@Test
	public void fileDiplayed() throws Exception {
		if (Common.getOS().equals("win"))
			CheckElementInTheWatcher("ah_file_w", "File");
		else
			CheckElementInTheWatcher("ah_file_m", "File");
	}

	//a crorriger
	@Test
	public void blobDiplayed() throws Exception {
		CheckElementInTheWatcher("my", "Blob");
	}

	@Test
	public void undefinedVariableDiplayed() throws Exception {
		CheckElementInTheWatcher("un", "null");
	}
	
	//a crorriger
	@Test
	public void xhrDisplayed() throws Exception {
		CheckElementInTheWatcher("ah_x", "VXMLHttpRequest");
	}
}
