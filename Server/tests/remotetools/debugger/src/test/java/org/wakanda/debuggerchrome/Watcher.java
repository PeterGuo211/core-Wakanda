package org.wakanda.debuggerchrome;

import java.net.MalformedURLException;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.wakanda.common.Common;

public class Watcher extends TemplateChromeDebuggerTests {

	static int size = 0;

	public String verifyInWatcher() throws InterruptedException {
		return verifyAndExpandInWatcher(false);
	}

	public String verifyAndExpandInWatcher(boolean expand)
			throws InterruptedException {
		size = selenium.getDriver()
				.findElements(By.xpath(XPaths.ListWatchExpressions + "/li"))
				.size();

		logger.info("The current size of Watch Expression is : " + size);
		String xPathResult;
		if (size == 1)
			xPathResult = XPaths.ListWatchExpressions + "/li/span[3]";
		else
			xPathResult = XPaths.ListWatchExpressions + "/li[" + size
					+ "]/span[3]";
		Thread.sleep(300);
		String result = null;
		int i = 0;
		while (i < 3) {
			try {
				result = selenium.getDriver()
						.findElement(By.xpath(xPathResult))
						.getAttribute("innerHTML");
				if (expand)
					{
					
					getElementByXPath(xPathResult).click();
					//Ici je retourne le nombre des attributs de l'element courant
					Thread.sleep(500);
					return selenium.getDriver().findElements(By.xpath(XPaths.ListWatchExpressions + "/ol/li")).size()+"";
					}
				
				
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
			clearWatchExpressionsTest();
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
		element.sendKeys(Keys.ENTER);
	}

	public void CheckExpandedElementInTheWatcher(String key, String result, boolean expand)
			throws MalformedURLException, InterruptedException {

		typeContextTriggered();
		addInWatcher(key);
		Assert.assertEquals(result, verifyAndExpandInWatcher(expand));

	}

	public void CheckElementInTheWatcher(String key, String result)
			throws MalformedURLException, InterruptedException {

		CheckExpandedElementInTheWatcher(key, result, false);

	}

	public void clearWatchExpressionsTest() {
		WebElement elem = getElementByXPath(XPaths.ListWatchExpressions);
		Actions action = new Actions(selenium.getDriver());
		action.contextClick(elem).sendKeys(Keys.ARROW_DOWN)
				.sendKeys(Keys.ARROW_DOWN).sendKeys(Keys.ARROW_DOWN)
				.sendKeys(Keys.RETURN).build().perform();
		logger.info("Watch Expressions succesfully cleared");
	}

	@Test
	public void typeContextTriggered() throws MalformedURLException,
			InterruptedException {

		super.typeContextTriggered();

		if (size > 10) {
			clearWatchExpressionsTest();
			size = 1;
		}
	}

	@Test
	public void jsonObjectDisplayed() throws Exception {
		CheckElementInTheWatcher("person", "Object");

	}

	@Test
	public void jsonObjectContentDisplayed() throws Exception {
		CheckElementInTheWatcher("person.age+person.fname+person.lname",
				"\"25JohnDoe\"");

	}

	@Test
	public void numberDiplayed() throws Exception {

		CheckElementInTheWatcher("ah_Number", "20");
	}

	@Test
	public void stringDiplayed() throws Exception {

		CheckElementInTheWatcher("ah_str", "\"ah_STRING\"");
	}

	@Test
	public void stringQuoteDiplayed() throws Exception {

		CheckElementInTheWatcher("ah_str_quote", "\"ah_STRING_QUOTE\"");
	}

	@Test
	public void dateObjectDiplayed() throws Exception {
		CheckElementInTheWatcher(
				"ah_date.getDate()+\"/\"+ah_date.getMonth()+\"/\"+ah_date.getFullYear()",
				"\"23/6/2013\"");
	}

	@Test
	public void fileDiplayed() throws Exception {
		if (Common.getOS().equals("win"))
			CheckElementInTheWatcher("ah_file_win.path", "\"C:/toto\"");
		else
			CheckElementInTheWatcher("ah_file_mac.path", "\"/toto\"");
	}

	@Test
	public void blobDiplayed() throws Exception {
		CheckElementInTheWatcher("myBlob.size+myBlob.type",
				"\"20application/octet-stream\"");
	}

	@Test
	public void undefinedVariableDiplayed() throws Exception {
		CheckElementInTheWatcher("und", "null");
		// getElementByXPath(verifyInConsole('null')]");// Avant c'etait
		// NULL en
		// majuscule et
		// non pas null(
		// version
		// 05/07/2013)
		// sinon apres
		// 08/07/2013
		// c'est null
	}

	@Test
	public void arrayDiplayed() throws Exception {
		CheckElementInTheWatcher(
				"MonTableau[0]+MonTableau[1]+MonTableau[2]+MonTableau[3]",
				"\"donnee 1donnee 2donnee 3donnee 4\"");
	}

	@Test
	public void unknownVariable() throws Exception {
		CheckElementInTheWatcher("unknown", "\"Error\"");
	}

	/*
	 * bug ref : WAK0083016
	 */
	@Test
	public void DateUp2099() throws Exception {
		CheckElementInTheWatcher(
				"date_up_2099.getDate()+\"/\"+date_up_2099.getMonth()+\"/\"+date_up_2099.getFullYear()",
				"\"31/11/2099\"");
	}

	@Test
	public void xhrAttributesDiplayed() throws Exception {
		CheckElementInTheWatcher(
				"ah_xhr.status+ah_xhr.responseType+ah_xhr.statusText+ah_xhr.responseText+ah_xhr.responseType+ah_xhr.responseXML",
				"\"0texttextundefined\"");
	}

	@Test
	public void xhrDiplayed() throws Exception {
		CheckElementInTheWatcher("ah_xhr", "VXMLHttpRequest");
	}

	//Je compte le nombre des attributs retourné
	@Test
	public void expandXhrObject() throws Exception {
		CheckExpandedElementInTheWatcher("ah_xhr", "6",true);
		// element.
	}
	// ///////////////////////////////////////////////////////////////////////////////

}
