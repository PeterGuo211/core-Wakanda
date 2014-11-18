package selenium;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesVariableEvents extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesVariableEvents.class, "/solutions/datasourceEvents/datasourceEvents.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/variableEvents.html");
		waitFor("$$('textField_onAttributeChange').setValue");
		waitValue("0", "textField_onAttributeChange");
	}
	
	private void waitValue(String expectedValue, String domId){
		Long timeStart = System.currentTimeMillis();
		while (timeStart + 5000 > System.currentTimeMillis()){
			String currentValue = selenium.getDriver().findElement(By.id(domId)).getAttribute("value");
			if (currentValue.equals(expectedValue))
				break;
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {}
		}
	}
	
	private void waitFor(String condition) {
		Long timeStart = System.currentTimeMillis();
		while (timeStart + 5000 > System.currentTimeMillis()){
			try {
				selenium.getJsConsole().executeScript(condition);
				break;
			} catch (Exception e) {}
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {}
		}
	}

	// ------------------------------------------------------------------------
	// Events
	// ------------------------------------------------------------------------
	@Test
	public void testVariable_onAttributeChange_withSync() throws InterruptedException {
		selenium.getJsConsole().executeScript("sources.variableSource.sync();");
		//Thread.sleep(500);
		waitValue("1", "textField_onAttributeChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testVariable_onAttributeChange_withAutoDispatch() throws InterruptedException {
		selenium.getJsConsole().executeScript("variableSource = 'test';");
		selenium.getJsConsole().executeScript("sources.variableSource.autoDispatch();");
		//Thread.sleep(500);
		waitValue("1", "textField_onAttributeChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
}
