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

public class TestCasesObjectEvents extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesObjectEvents.class, "/solutions/datasourceEvents/datasourceEvents.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/objectEvents.html");
		waitFor("$$('textField_onnameAttributeChange').setValue");
		waitValue("0", "textField_onBeforeCurrentElementChange");
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
	public void testObject_onnameAttributeChange() throws InterruptedException {
		selenium.getJsConsole().executeScript("objectSource = {ID:1, name:'aaa'};");
		selenium.getJsConsole().executeScript("sources.objectSource.sync();");
		waitValue("2", "textField_onnameAttributeChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onnameAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testObject_onIDAttributeChange() throws InterruptedException {
		selenium.getJsConsole().executeScript("objectSource = {ID:1, name:'aaa'};");
		selenium.getJsConsole().executeScript("sources.objectSource.sync();");
		waitValue("1", "textField_onIDAttributeChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onIDAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testObject_onCurrentElementChange() throws InterruptedException {
		selenium.getJsConsole().executeScript("objectSource = {ID:1, name:'aaa'};");
		selenium.getJsConsole().executeScript("sources.objectSource.sync();");
		waitValue("1", "textField_onCurrentElementChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testObject_onBeforeCurrentElementChange() throws InterruptedException {
		selenium.getJsConsole().executeScript("objectSource = {ID:1, name:'aaa'};");
		selenium.getJsConsole().executeScript("sources.objectSource.sync();");
		waitValue("1", "textField_onBeforeCurrentElementChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onBeforeCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}
}
