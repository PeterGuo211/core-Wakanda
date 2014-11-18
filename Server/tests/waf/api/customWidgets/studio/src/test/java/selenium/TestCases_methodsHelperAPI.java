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

public class TestCases_methodsHelperAPI extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCases_methodsHelperAPI.class, "/customWidgetsSolution/customWidgetsSolution Solution/customWidgetsSolution.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/index/");
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {}
	}

	@Test
	public void test_addClassMethod() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getJsConsole().executeScript("$$('testStudio1').testClassMethod_wrapper();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check addClassMethod() + wrapClassMethod() + doBeforeClassMethod() + doAfterClassMethod()", " wrapClassMethod doBeforeClassMethod addClassMethod doAfterClassMethod", result);
	}

	@Test
	public void test_addClassMethods() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getJsConsole().executeScript("$$('testStudio1').testAddClassMethods_wrapper();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check addClassMethods()", " testClassMethods1 testClassMethods2", result);
	}

	@Test
	public void test_addMethod() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getJsConsole().executeScript("$$('testStudio1').testMethod();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check addMethod() + wrap() + doBefore() + doAfter()", " wrap doBefore addMethod doAfter", result);
	}

	@Test
	public void test_addMethods() throws InterruptedException {
		selenium.getDriver().findElement(By.id("testStudio1"));
		selenium.getJsConsole().executeScript("$$('testStudio1').resetLog();");
		selenium.getJsConsole().executeScript("$$('testStudio1').testMethods1();");
		selenium.getJsConsole().executeScript("$$('testStudio1').testMethods2();");
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#testStudio1 .log').text() +'';");
		assertEquals("Check addMethods()", " testMethods1 testMethods2", result);
	}
	
}
