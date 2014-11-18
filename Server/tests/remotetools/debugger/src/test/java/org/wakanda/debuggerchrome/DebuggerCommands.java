package org.wakanda.debuggerchrome;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.MalformedURLException;

import org.junit.Test;
import org.openqa.selenium.Keys;
import org.openqa.selenium.interactions.Actions;

public class DebuggerCommands extends TemplateChromeDebuggerTests {

	
	public void LaunchContext(String currenHandler, String ContextToPrepare) throws MalformedURLException, InterruptedException
	{
		currentHandler = currenHandler;
		
		prepareContext(currentHandler,ContextToPrepare);
		
		logger.info("The lengh of the current context is : "+getContentOfAContext().length());
		
		toDebugFrame();
		
	}
	
	public void LaunchContext(String currenHandler) throws MalformedURLException, InterruptedException
	
	{
		
		LaunchContext(currenHandler, currenHandler);
		
	}
	

	

	
	// /////////////////////Pour les fichier d'includes
	
	@Test
	
	public void continueWorkUsingInclude() throws Exception, IOException {
		

		
		LaunchContext("include", "level3");
		
		clickOnContinue();
				
		assertEquals(XPaths.ClassNameOfExecutionLine, waitContentToBeDisplayed(XPaths.GetCodeLine(12),10));
		
	}
	

	
	@Test
	
	public void StepIntoWorkUsingUnclude() throws Exception, IOException {
		

		
		LaunchContext("include", "level3");
		
		clickOnStepInto();
		
		clickOnStepInto();
		
		assertEquals(XPaths.ClassNameOfExecutionLine, waitContentToBeDisplayed(XPaths.GetCodeLine(18),10));
		
	}
	

	
	// //////////////////////////////////////////////////////
	
	// Tests nominaux du debugger;
	
	@Test
	
	public void ContinueWork() throws Exception, IOException {

		LaunchContext("level3");
		clickOnContinue();
		assertEquals(XPaths.ClassNameOfExecutionLine, waitContentToBeDisplayed(XPaths.GetCodeLine(12),10));
	}
	@Test
	public void StepIntotWork() throws Exception, IOException {

		LaunchContext("level3");
		clickOnStepInto();
		String result = waitContentToBeDisplayed(XPaths.GetCodeLine(17),10);
		assertEquals(XPaths.ClassNameOfExecutionLine, result);
	}
	@Test
	public void StepOutWork() throws Exception, IOException {

		LaunchContext("level3");
		clickOnStepOut();
		assertEquals(XPaths.ClassNameOfExecutionLine, waitContentToBeDisplayed(XPaths.GetCodeLine(10),10));
	}

	@Test
	public void StepOverWork() throws Exception, IOException {

		LaunchContext("level3");
		clickOnStepOver();
		assertEquals(XPaths.ClassNameOfExecutionLine, waitContentToBeDisplayed(XPaths.GetCodeLine(6),10));
	}
	//////////////////////////////////////////////////Shortcuts Nominal Cases
	@Test
	
	public void ShortcutContinueWork() throws Exception, IOException {

		LaunchContext("level3");
		//selenium.getDriver().switchTo().defaultContent();
		typeShortcutContinue();
		
		assertEquals(XPaths.ClassNameOfExecutionLine, waitContentToBeDisplayed(XPaths.GetCodeLine(12),10));
	}
	@Test
	public void ShortcutStepIntotWork() throws Exception, IOException {

		LaunchContext("level3");
		typeShortcutStepInto();
		String result = waitContentToBeDisplayed(XPaths.GetCodeLine(17),10);
		assertEquals(XPaths.ClassNameOfExecutionLine, result);
	}
	@Test
	public void ShortcutStepOutWork() throws Exception, IOException {

		LaunchContext("level3");
		typeShortcutStepOut();
		assertEquals(XPaths.ClassNameOfExecutionLine, waitContentToBeDisplayed(XPaths.GetCodeLine(10),10));
	}

	@Test
	public void ShortcutStepOverWork() throws Exception, IOException {

		LaunchContext("level3");
		typeShortcutStepOver();
		assertEquals(XPaths.ClassNameOfExecutionLine, waitContentToBeDisplayed(XPaths.GetCodeLine(6),10));
	}
	
    @Test
	public void debugJsFileWithUseStrictMode() throws Exception, IOException {
		

		LaunchContext("use-strict");
		
		assertEquals(XPaths.ClassNameOfExecutionLine, waitContentToBeDisplayed(XPaths.GetCodeLine(4),10));
		
	}
	
}
