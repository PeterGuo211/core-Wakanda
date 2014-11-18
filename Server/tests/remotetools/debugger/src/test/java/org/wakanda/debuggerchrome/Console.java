package org.wakanda.debuggerchrome;

import java.net.MalformedURLException;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.wakanda.common.Common;

public class Console extends TemplateChromeDebuggerTests {

	public String verifyInConsole() {
		return getElementByXPath(
				"//*[@id='console-messages']/div/div/div[2]/span/span/span")
				.getText();
	}

	public String verifyInConsoleLog() {
		return getElementByXPath("//*[@id='console-messages']/div/div/div[3]/span").getText();
		
		// *[@id="console-messages"]/div/div/div[3]/span
		// *[@id="console-messages"]/div/div/div[3]/span/span
	}

	public void CheckElementInTheConsole(String key, String result)
			throws MalformedURLException, InterruptedException {

		typeContextTriggered();
		WebElement element = getElementById("console-prompt");
		element.sendKeys(key);
		element.sendKeys(Keys.ENTER);
		Assert.assertEquals(result, verifyInConsole());

	}

	public void CheckElementInTheConsoleLog(String key, String result)
			throws MalformedURLException, InterruptedException {

		typeContextTriggered();
		WebElement element = getElementById("console-prompt");
		element.sendKeys("console.log("+key+")");
		element.sendKeys(Keys.ENTER);
		Assert.assertEquals(result, verifyInConsoleLog());

	}

	@Test
	public void typeContextTriggered() throws MalformedURLException,
			InterruptedException {

		super.typeContextTriggered();

	}

	@Test
	public void jsonObjectDisplayed() throws Exception {
		CheckElementInTheConsole("person", "Object");

	}

	@Test
	public void jsonObjectContentDisplayed() throws Exception {
		CheckElementInTheConsole("person.age+person.fname+person.lname",
				"\"25JohnDoe\"");

	}

	@Test
	public void numberDiplayed() throws Exception {

		CheckElementInTheConsole("ah_Number", "20");
	}

	@Test
	public void stringDiplayed() throws Exception {

		CheckElementInTheConsole("ah_str", "\"ah_STRING\"");
	}

	@Test
	public void stringQuoteDiplayed() throws Exception {

		CheckElementInTheConsole("ah_str_quote", "\"ah_STRING_QUOTE\"");
	}

	@Test
	public void dateObjectDiplayed() throws Exception {
		CheckElementInTheConsole(
				"ah_date.getDate()+\"/\"+ah_date.getMonth()+\"/\"+ah_date.getFullYear()",
				"\"23/6/2013\"");
	}

	@Test
	public void fileDiplayed() throws Exception {
		if (Common.getOS().equals("win"))
			CheckElementInTheConsole("ah_file_win.path", "\"C:/toto\"");
		else
			CheckElementInTheConsole("ah_file_mac.path", "\"/toto\"");
	}

	@Test
	public void blobDiplayed() throws Exception {
		CheckElementInTheConsole("myBlob.size+myBlob.type",
				"\"20application/octet-stream\"");
	}

	@Test
	public void undefinedVariableDiplayed() throws Exception {
		CheckElementInTheConsole("und", "null");
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
		CheckElementInTheConsole(
				"MonTableau[0]+MonTableau[1]+MonTableau[2]+MonTableau[3]",
				"\"donnee 1donnee 2donnee 3donnee 4\"");
	}

	@Test
	public void unknownVariable() throws Exception {
		CheckElementInTheConsole("unknown", "\"Error\"");
	}

	/*
	 * bug ref : WAK0083016
	 */
	@Test
	public void DateUp2099() throws Exception {
		CheckElementInTheConsole(
				"date_up_2099.getDate()+\"/\"+date_up_2099.getMonth()+\"/\"+date_up_2099.getFullYear()",
				"\"31/11/2099\"");
	}
	
	@Test
	public void xhrAttributesDiplayed() throws Exception {
		CheckElementInTheConsole("ah_xhr.status+ah_xhr.responseType+ah_xhr.statusText+ah_xhr.responseText+ah_xhr.responseType+ah_xhr.responseXML", "\"0texttextundefined\"");
	}
	
	@Test
	public void xhrDiplayed() throws Exception {
		CheckElementInTheConsole("ah_xhr", "VXMLHttpRequest");
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	@Test
	public void logJsonObjectDisplayed() throws Exception {
		CheckElementInTheConsoleLog("person", "{\"fname\":\"John\",\"lname\":\"Doe\",\"age\":25}");

	}

	@Test
	public void logNumberDiplayed() throws Exception {

		CheckElementInTheConsoleLog("ah_Number", "20");
	}

	@Test
	public void logStringDiplayed() throws Exception {

		CheckElementInTheConsoleLog("ah_str", "ah_STRING");
	}

	@Test
	public void logStringQuoteDiplayed() throws Exception {

		CheckElementInTheConsoleLog("ah_str_quote",
				"ah_STRING_QUOTE");
	}

	@Test
	public void logDateObjectDiplayed() throws Exception {
		CheckElementInTheConsoleLog(
				"ah_date.getDate()+\"/\"+ah_date.getMonth()+\"/\"+ah_date.getFullYear()",
				"23/6/2013");
	}

	@Test
	public void logFileDiplayed() throws Exception {
		if (Common.getOS().equals("win"))
			CheckElementInTheConsoleLog("ah_file_win.path",
					"C:/toto");
		else
			CheckElementInTheConsoleLog("ah_file_mac.path",
					"/toto");
	}

	@Test
	public void blogBlobDiplayed() throws Exception {
		CheckElementInTheConsoleLog("myBlob",
				"{\"size\":20,\"type\":\"application/octet-stream\"}");
	}

	@Test
	public void logUndefinedVariableDiplayed() throws Exception {
		CheckElementInTheConsoleLog("und", "null");
	}

	@Test
	public void logArrayDiplayed() throws Exception {
		CheckElementInTheConsoleLog("MonTableau",
				"[\"donnee 1\",\"donnee 2\",\"donnee 3\",\"donnee 4\"]");
	}

	@Test
	public void logUnknownVariable() throws Exception {
		CheckElementInTheConsole("unknown", "\"Error\"");
	}

	/*
	 * bug ref : WAK0083016
	 */
	@Test
	public void logDateUp2099() throws Exception {
		CheckElementInTheConsoleLog(
				"date_up_2099.getDate()+\"/\"+date_up_2099.getMonth()+\"/\"+date_up_2099.getFullYear()",
				"31/11/2099");
	}
	
	@Test
	public void logXhrAttributesDiplayed() throws Exception {
		CheckElementInTheConsoleLog("ah_xhr.status+ah_xhr.responseType+ah_xhr.statusText+ah_xhr.responseText+ah_xhr.responseType+ah_xhr.responseXML", "0texttextundefined");
	}
	
	@Test
	public void logXhrDiplayed() throws Exception {
		CheckElementInTheConsoleLog("ah_xhr", "{}");
	}

}