package org.wakanda.debuggerchrome;

import static org.junit.Assert.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.net.MalformedURLException;

import org.junit.After;
import org.junit.Assume;
import org.junit.Before;
import org.junit.Test;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class NominalTestCases extends TemplateChromeDebuggerTests {

	

	
	@Test
	public void stopOnBreakpoint() throws Exception {

		currentHandler = "breakpoint";
		
		prepareContext(currentHandler);
		
		logger.info(getContentOfAContext());
		
		System.out.println(getTextFromFile(currentHandler + ".js"));
		
		String strFromBrowser = unifyString(getContentOfAContext());
		
		String strFromFile = unifyString(unifyString(getTextFromFile(currentHandler
				+ ".js")));
		
		assertEquals(strFromBrowser, strFromFile);

	}

	@Test
	public void stopOnDebuggerInstruction() throws Exception, IOException {

		
		currentHandler = "debug";
		
		prepareContext(currentHandler);
		
		logger.info(getContentOfAContext());
		
		String strFromBrowser = unifyString(getContentOfAContext());
		
		String strFromFile = unifyString(unifyString(getTextFromFile(currentHandler
				+ ".js")));
		
		assertEquals(strFromBrowser, strFromFile);
	}
	
	@Test
	public void switchBetweenTwoContexts() throws Exception, IOException {

		stopOnBreakpoint();
		
		
		//frame=1;
		toDefaultContent();
		
		currentHandler = "debug";
		
		prepareContext(currentHandler);
		
		logger.info(getContentOfAContext(2));
		
		String strFromBrowser = unifyString(getContentOfAContext(2));
		
		String strFromFile = unifyString(unifyString(getTextFromFile(currentHandler
				+ ".js")));
		
		assertEquals(strFromBrowser, strFromFile);
		
		currentHandler = "breakpoint";
		
		clickOnCurrentContext(currentHandler);
		
		//frame = 0;
		
		strFromBrowser = unifyString(getContentOfAContext(1));
		strFromFile = unifyString(unifyString(getTextFromFile(currentHandler
				+ ".js")));
		assertEquals(strFromBrowser, strFromFile);		
	}
	@Test
	public void abortWork() throws Exception, IOException {

		frame = 0;
		
		stopOnBreakpoint();
		
		clickOnAbort();
		
		boolean displayed = false;
		
		try{
			
		timeout = 4;
		
		displayed = getElementByXPath("//*[@id='contexts_list']").findElement(By.className("abort_button")).isDisplayed();
		
		}catch (Exception e) {
			
			// TODO: handle exception
		}
		
		finally{
			
		assertTrue(displayed==false);
		
		timeout = 10;
		
		}
		
	}
	////*[@id="scripts-editor-container-tabbed-pane"]/div[2]/div/div/div[1]/div/div[1]/div/div/div/text()
	@Test
	public void exceptionDisplayedInToolTipText() throws MalformedURLException, InterruptedException{

		currentHandler = "tooltip";		
		
		prepareContext(currentHandler);
		
		logger.info(getContentOfAContext());
		
		toDebugFrame();
		
		
		String strFromHardCoding ="ReferenceError : Can't find variable: debug";
		
		String strFromChromeDebugger = getElementByXPath("//*[@id='scripts-editor-container-tabbed-pane']/div[2]/div/div/div[1]/div/div[1]/div/div/div").getText();
		
		assertEquals(strFromHardCoding, strFromChromeDebugger);		
	}
	
	@Test
	public void fileBigSize() throws Exception, IOException {
		
		currentHandler = "charge";
		
		prepareContext(currentHandler);
		
		logger.info(getContentOfAContext());
		
		String strFromBrowser = unifyString(getContentOfAContext());
		
		String strFromFile = unifyString(unifyString(getTextFromFile(currentHandler
				+ ".js")));
		
		assertEquals(strFromBrowser, strFromFile);
	}
	
	
	@Test
	public void currentBreakpointToggled() throws Exception, IOException {
		
		currentHandler = "breakpoint";
		
		prepareContext(currentHandler);
		
		toDebugFrame();
		
		//selenium.getDriver().findElement(By.xpath("//*[@id='scripts-editor-container-tabbed-pane']/div[2]/div/div/div[2]/div/div[4]/div"));
		String iconeDisplayed = getElementByXPath("//*[@id='scripts-editor-container-tabbed-pane']/div[2]/div/div/div[2]/div/div[4]/div").getCssValue("-webkit-border-image");
		                                           
		//-webkit-border-image: url(Images/breakpointCounterBorder.png) 0 14 0 2;
		if(iconeDisplayed.contains("breakpointCounterBorder.png"))
			iconeDisplayed = "breakpointCounterBorder.png";
		else
			iconeDisplayed = "programCounterBorder.png";
		
		String currentIcone = getElementByXPath("//*[@id='scripts-editor-container-tabbed-pane']/div[2]/div/div/div[2]/div/div[4]/div").getCssValue("-webkit-border-image");
		assertEquals(currentIcone,"url(http://127.0.0.1:8080/walib/debugger/devtools/Images/"+iconeDisplayed+") 0 14 0 2 fill / 1 / 0px stretch") ; //petite icone rouge
		
		
		
	}
	
	@Test
	public void currentLineActive() throws Exception, IOException {
		
		currentHandler = "breakpoint";
		
		prepareContext(currentHandler);
		
		toDebugFrame();
		
		String currentColor = getElementByXPath("//*[@id='scripts-editor-container-tabbed-pane']/div[2]/div/div/div[1]/div/div[4]").getCssValue("background-color");
		
		assertEquals(currentColor , "rgba(171, 191, 254, 1)");         //ligne bleu
		
		
	}
	
	@Test
	public void breakpointsDisplayed() throws Exception, IOException {
		
		currentHandler = "breakpoint";
		
		prepareContext(currentHandler);
		
		toDebugFrame();
		
		String currentIcone = getElementByXPath("//*[@id='scripts-editor-container-tabbed-pane']/div[2]/div/div/div[2]/div/div[4]/div").getCssValue("-webkit-border-image");
												 //*[@id="scripts-editor-container-tabbed-pane"]/div[2]/div/div/div[2]/div/div[4]/div
		 
		assertEquals(currentIcone,"url(http://127.0.0.1:8080/walib/debugger/devtools/Images/breakpointCounterBorder.png) 0 14 0 2 fill / 1 / 0px stretch") ; //petite icone rouge
		                          // url(http://127.0.0.1:8080/walib/debugger/devtools/Images/breakpointCounterBorder.png) 0 14 0 2 fill / 1 / 0px stretch
	
	    currentIcone = getElementByXPath("//*[@id='scripts-editor-container-tabbed-pane']/div[2]/div/div/div[2]/div/div[5]/div").getCssValue("-webkit-border-image");
	                                      //*[@id="scripts-editor-container-tabbed-pane"]/div[2]/div/div/div[2]/div/div[5]/div                                  
		
		assertEquals(currentIcone,"url(http://127.0.0.1:8080/walib/debugger/devtools/Images/breakpointBorder.png) 0 14 0 2 fill / 1 / 0px stretch") ;
		
	}
}
