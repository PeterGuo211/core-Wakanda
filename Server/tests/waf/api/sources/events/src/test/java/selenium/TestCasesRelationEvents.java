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

public class TestCasesRelationEvents extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesRelationEvents.class, "/solutions/datasourceEvents/datasourceEvents.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/relationEvents.html");
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
	public void testRelation_onBeforeCurrentElementChange() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('textField_onBeforeCurrentElementChange').setValue('0');");
		waitValue("0", "textField_onBeforeCurrentElementChange");
		selenium.getJsConsole().executeScript("sources.emp.selectNext();");
		waitValue("1", "textField_onBeforeCurrentElementChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onBeforeCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testRelation_onCurrentElementChange() throws InterruptedException {
		//Thread.sleep(500);
		waitValue("3", "textField_onCurrentElementChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "3", result);
	}

	@Test
	public void testRelation_onCurrentElementChange_afterSelect() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('textField_onCurrentElementChange').setValue('0');");
		selenium.getJsConsole().executeScript("sources.emp.selectNext();");
		//Thread.sleep(500);
		waitValue("1", "textField_onCurrentElementChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onCurrentElementChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testRelation_onElementSaved() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('textField_onElementSaved').setValue('0');");
		selenium.getJsConsole().executeScript("sources.emp.name = 'Updated';");
		selenium.getJsConsole().executeScript("sources.emp.save();");
		//Thread.sleep(500);
		waitValue("1", "textField_onElementSaved");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onElementSaved').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testRelation_onCollectionChange() throws InterruptedException {
		//Thread.sleep(500);
		waitValue("2", "textField_onCollectionChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onCollectionChange').getValue();");
		assertEquals("Check event occurence : ", "2", result);
	}

	@Test
	public void testRelation_onCollectionChange_afterQuery() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('textField_onCollectionChange').setValue('0');");
		selenium.getJsConsole().executeScript("sources.emp.filterQuery('ID = 1');");
		//Thread.sleep(500);
		waitValue("1", "textField_onCollectionChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onCollectionChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testRelation_onIDAttributeChange() throws InterruptedException {
		//Thread.sleep(500);
		waitValue("3", "textField_onIDAttributeChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onIDAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "3", result);
	}

	@Test
	public void testRelation_onnameAttributeChange() throws InterruptedException {
		//Thread.sleep(500);
		waitValue("3", "textField_onnameAttributeChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onnameAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "3", result);
	}

	@Test
	public void testRelation_onnameAttributeChange_afterSave() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('textField_onnameAttributeChange').setValue('0');");
		selenium.getJsConsole().executeScript("sources.emp.name = 'Unupdated';");
		selenium.getJsConsole().executeScript("sources.emp.save();");
		//Thread.sleep(500);
		waitValue("1", "textField_onnameAttributeChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_onnameAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "1", result);
	}

	@Test
	public void testRelation_oncompAttributeChange() throws InterruptedException {
		//Thread.sleep(500);
		waitValue("3", "textField_oncompAttributeChange");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textField_oncompAttributeChange').getValue();");
		assertEquals("Check event occurence : ", "3", result);
	}
}
