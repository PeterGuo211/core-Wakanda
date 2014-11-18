package org.wakanda.debuggerchrome;

import java.net.MalformedURLException;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.wakanda.common.Common;

public class AutoCompletionConsole extends TemplateChromeDebuggerTests{


	public String verifyInConsole()
	{
		return getElementByXPath("//*[@id='console-messages']/div/div/div[2]/span/span/span").getText();
	}
	
	
	

	public void CheckElementInTheConsole(String key, String result) throws MalformedURLException,
			InterruptedException {

		typeContextTriggered();
		WebElement element = getElementById("console-prompt");
		element.sendKeys(key);
		getElementByXPath("//*[@id='console-prompt']/span");
		element.sendKeys(Keys.TAB);
		element.sendKeys(Keys.ENTER);
		element.sendKeys(Keys.ENTER);
		Assert.assertEquals(result,verifyInConsole());
		

	}

	@Test
	public void jsonObjectDisplayed() throws Exception {
		CheckElementInTheConsole("pers", "Object");

	}
	

	@Test
	public void numberDiplayed() throws Exception {

		CheckElementInTheConsole("ah_N", "20");
	}

	@Test
	public void stringQuoteDiplayed() throws Exception {

		CheckElementInTheConsole("ah_str_", "\"ah_STRING_QUOTE\"");
	}

	@Test
	public void fileDiplayed() throws Exception {
		if(Common.getOS().equals("win"))
			CheckElementInTheConsole("ah_file_w", "File");
		else
			CheckElementInTheConsole("ah_file_m", "File");
	}

	@Test
	public void blobDiplayed() throws Exception {
		CheckElementInTheConsole("my", "Blob");
	}

	@Test
	public void undefinedVariableDiplayed() throws Exception {
		CheckElementInTheConsole("un", "null");
//		getElementByXPath(verifyInConsole('null')]");// Avant c'etait
																// NULL en
																// majuscule et
																// non pas null(
																// version
																// 05/07/2013)
																// sinon apres
																// 08/07/2013
																// c'est null
	}
	//a crorriger
	@Test
	public void xhrDiplayed() throws Exception {
		CheckElementInTheConsole("ah_x", "VXMLHttpRequest");
	}
	
	
	
	
}
