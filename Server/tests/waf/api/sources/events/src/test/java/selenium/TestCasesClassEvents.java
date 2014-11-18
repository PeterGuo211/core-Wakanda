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

public class TestCasesClassEvents extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesClassEvents.class, "/solutions/datasourceEvents/datasourceEvents.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/classEvents.html");
		waitFor("$$('textField_onBeforeCurrentElementChange').setValue");
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
	public void testClass_onBeforeCurrentElementChange() throws InterruptedException {
		waitValue("0", "textField_onBeforeCurrentElementChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onBeforeCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "0", result);
	}

	@Test
	public void testClass_onBeforeCurrentElementChange_afterSelect() throws InterruptedException {
		////Thread.sleep(1000);
		selenium.getJsConsole().executeScript("$$('textField_onBeforeCurrentElementChange').setValue('0');");
		selenium.getJsConsole().executeScript("sources.companies.selectNext();");
		waitValue("0", "textField_onBeforeCurrentElementChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onBeforeCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testClass_onCurrentElementChange() throws InterruptedException {
		//Thread.sleep(1000);
		waitValue("2", "textField_onCurrentElementChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "2", result);
	}

	@Test
	public void testClass_onCurrentElementChange_afterSelect() throws InterruptedException {
		//Thread.sleep(1000);
		selenium.getJsConsole().executeScript("$$('textField_onCurrentElementChange').setValue('0');");
		selenium.getJsConsole().executeScript("sources.companies.selectNext();");
		waitValue("1", "textField_onCurrentElementChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testClass_onElementSaved() throws InterruptedException {
		//Thread.sleep(1000);
		selenium.getJsConsole().executeScript("$$('textField_onElementSaved').setValue('0');");
		selenium.getJsConsole().executeScript("sources.companies.name = 'update" + System.currentTimeMillis() + "';");
		selenium.getJsConsole().executeScript("sources.companies.save();");
		waitValue("1", "textField_onElementSaved");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onElementSaved').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testClass_onCollectionChange() throws InterruptedException {
		//Thread.sleep(1000);
		waitValue("1", "textField_onCollectionChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onCollectionChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testClass_onCollectionChange_afterQuery() throws InterruptedException {
		//Thread.sleep(1000);
		selenium.getJsConsole().executeScript("$$('textField_onCollectionChange').setValue('0');");
		selenium.getJsConsole().executeScript("sources.companies.query('ID = 1');");
		waitValue("1", "textField_onCollectionChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onCollectionChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testClass_onIDAttributeChange() throws InterruptedException {
		//Thread.sleep(1000);
		waitValue("2", "textField_onIDAttributeChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onIDAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "2", result);
	}

	@Test
	public void testClass_onnameAttributeChange() throws InterruptedException {
		//Thread.sleep(500);
		waitValue("2", "textField_onnameAttributeChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onnameAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "2", result);
	}

	@Test
	public void testClass_onnameAttributeChange_afterSave() throws InterruptedException {
		//Thread.sleep(1000);
		selenium.getJsConsole().executeScript("$$('textField_onnameAttributeChange').setValue('0');");
		selenium.getJsConsole().executeScript("sources.companies.name = 'Unupdated';");
		selenium.getJsConsole().executeScript("sources.companies.save();");
		//Thread.sleep(500);
		waitValue("1", "textField_onnameAttributeChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onnameAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testClass_onempAttributeChange() throws InterruptedException {
		//Thread.sleep(1000);
		waitValue("2", "textField_onempAttributeChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onempAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "2", result);
	}
}
