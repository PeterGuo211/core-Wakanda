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

public class TestCasesRadio_general extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCasesRadioEvents.class, "/solutions/widgetRadioGroup/widgetRadioGroup Solution/widgetRadioGroup.waSolution");
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/generalDisplay.waPage/index-tablet.html");
		selenium.getDriver().findElement(By.id("radioGroup1"));
		selenium.getDriver().findElement(By.id("radioGroup2"));
	}

	@Test
	public void testRadio_radioGroup1_sizePosition() throws InterruptedException {
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1').width() +'/'+ $('#radioGroup1').height();");
		assertEquals("Check radioGroup1 size (width/height)", "125/115", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1').position().left +'/'+ $('#radioGroup1').position().top;");
		assertEquals("Check radioGroup1 position (x/y)", "78/107", result);
	}
	
	@Test
	public void testRadio_radioGroup1_nbElements() throws InterruptedException {
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1 input').length +'';");
		assertEquals("Check radioGroup1 nb input)", "4", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1 label').length +'';");
		assertEquals("Check radioGroup1 nb label", "4", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1 label').text() +'';");
		assertEquals("Check radioGroup1 values", "1 Jean 2 Sebastien 3 Geoffrey 4 Yann ", result);
	}
	
	@Test
	public void testRadio_radioGroup1_lastElement() throws InterruptedException {
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1 li').eq(3).width() +'/'+ $('#radioGroup1 li').eq(3).height();");
		assertEquals("Check radioGroup1 lastElement size (width/height)", "125/29", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1 li').eq(3).position().left +'/'+ $('#radioGroup1 li').eq(3).position().top;");
		assertEquals("Check radioGroup1 lastElement position (x/y)", "0/86.25", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup1 label').eq(3).text() +'';");
		assertEquals("Check radioGroup1 lastElement text", "4 Yann ", result);
	}
	
	@Test
	public void testRadio_radioGroup1Label_sizePosition() throws InterruptedException {
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#label1').width() +'/'+ $('#label1').height();");
		assertEquals("Check radioGroup1 label size (width/height)", "40/15", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#label1').position().left +'/'+ $('#label1').position().top;");
		assertEquals("Check radioGroup1 label position (x/y)", "33/158", result);
	}
	
	@Test
	public void testRadio_radioGroup1Label_value() throws InterruptedException {
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#label1').text() +'';");
		assertEquals("Check radioGroup1 label text", "Vertical", result);
	}

	
	@Test
	public void testRadio_radioGroup2_sizePosition() throws InterruptedException {
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup2').width() +'/'+ $('#radioGroup2').height();");
		assertEquals("Check radioGroup2 size (width/height)", "655/52", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup2').position().left +'/'+ $('#radioGroup2').position().top;");
		assertEquals("Check radioGroup2 position (x/y)", "75/23", result);
	}
	
	@Test
	public void testRadio_radioGroup2_nbElements() throws InterruptedException {
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup2 input').length +'';");
		assertEquals("Check radioGroup2 nb input)", "4", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup2 label').length +'';");
		assertEquals("Check radioGroup2 nb label", "4", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup2 label').text() +'';");
		assertEquals("Check radioGroup2 values", "Jean Sebastien Geoffrey Yann ", result);
	}
	
	@Test
	public void testRadio_radioGroup2_lastElement() throws InterruptedException {
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup2 li').eq(3).width() +'/'+ $('#radioGroup2 li').eq(3).height();");
		assertEquals("Check radioGroup2 lastElement size (width/height)", "164/52", result);

		result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup2 li').eq(3).position().left +'/'+ $('#radioGroup2 li').eq(3).position().top;");
		assertEquals("Check radioGroup2 lastElement position (x/y)", "491.25/0", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#radioGroup2 label').eq(3).text() +'';");
		assertEquals("Check radioGroup1 lastElement text", "Yann ", result);
	}
	
	@Test
	public void testRadio_radioGroup2Label_sizePosition() throws InterruptedException {
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#label2').width() +'/'+ $('#label2').height();");
		assertEquals("Check radioGroup2 label size (width/height)", "55/15", result);
		
		result = (String) selenium.getJsConsole().executeScript("return $('#label2').position().left +'/'+ $('#label2').position().top;");
		assertEquals("Check radioGroup2 label position (x/y)", "15/42", result);
	}
	
	@Test
	public void testRadio_radioGroup2Label_value() throws InterruptedException {
		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('#label2').text() +'';");
		assertEquals("Check radioGroup1 label text", "Horizontal", result);
	}
	

	
}