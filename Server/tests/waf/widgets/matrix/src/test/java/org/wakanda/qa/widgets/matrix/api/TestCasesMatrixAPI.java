package org.wakanda.qa.widgets.matrix.api;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.wakanda.common.Paths;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesMatrixAPI extends SeleniumRuntimeTemplate {

	
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException
	{
		Paths.solutionRelativePath = "/solutions/WidgetsAPI/WidgetsAPI.waSolution";
		AdminCommand.startServer(TestCasesMatrixAPI.class,Paths.solutionRelativePath );
	}
	//------------------------------------------------------------------------
	// Specific API
	//------------------------------------------------------------------------

	@Test
	public void testMatrix_getCurrentPage() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("getCurrentPage")).click();
		Thread.sleep(500);

		String myPage = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("0", myPage);
	}
	
	@Test
	public void testMatrix_getDisplayedRow() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("getDisplayedRow")).click();
		Thread.sleep(500);

		String myRow = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("0", myRow);
	}
	
	@Test
	public void testMatrix_getTotalPages() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("getTotalPages")).click();
		Thread.sleep(500);

		String myPage = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("3", myPage);
	}
	
	@Test
	public void testMatrix_goToFirst() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("goToFirst")).click();
		Thread.sleep(500);
		selenium.getDriver().findElement(By.id("getDisplayedRow")).click();

		String myPage = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("0", myPage);
	}
	
	@Test
	public void testMatrix_goToLast() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("goToLast")).click();
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("getDisplayedRow")).click();

		String myPage = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("3", myPage);
	}
	
	@Test
	public void testMatrix_goToNextPage() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("goToNextPage")).click();
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("getDisplayedRow")).click();

		String myPage = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("2", myPage);
	}
	
	@Test
	public void testMatrix_goToPreviousPage() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("goToLast")).click();
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("goToPreviousPage")).click();
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("getDisplayedRow")).click();

		String myPage = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("1", myPage);
	}
	
	//------------------------------------------------------------------------
	// Generic API
	//------------------------------------------------------------------------
	
	@Test
	public void testMatrix_hide() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("hide")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("matrix1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testMatrix_show() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("hide")).click();
		selenium.getDriver().findElement(By.id("show")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("matrix1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testMatrix_toggle() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("matrix1")).getCssValue("display");
		assertEquals("none", myResult);
	}
	
	@Test
	public void testMatrix_toggle_back() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("toggle")).click();
		selenium.getDriver().findElement(By.id("toggle")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("matrix1")).getCssValue("display");
		assertEquals("block", myResult);
	}
	
	@Test
	public void testMatrix_addClass() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("addClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("matrix1")).getAttribute("className").contains("toto");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testMatrix_removeClass() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("addClass")).click();
		selenium.getDriver().findElement(By.id("removeClass")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("matrix1")).getAttribute("className").contains("toto");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testMatrix_move() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("move")).click();
		Thread.sleep(500);
		
		WebElement myElement = selenium.getDriver().findElement(By.id("matrix1"));
		assertEquals("0px", myElement.getCssValue("top"));
		assertEquals("0px", myElement.getCssValue("left"));
	}
	
	@Test
	public void testMatrix_resize_smaller() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("resize_smaller")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("matrix1"));
		assertEquals("50", myElement.getAttribute("offsetWidth"));
		assertEquals("50", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testMatrix_resize_bigger() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("resize_bigger")).click();
		Thread.sleep(500);

		WebElement myElement = selenium.getDriver().findElement(By.id("matrix1"));
		assertEquals("300", myElement.getAttribute("offsetWidth"));
		assertEquals("300", myElement.getAttribute("offsetHeight"));
	}
	
	@Test
	public void testMatrix_setWidth() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setWidth")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("matrix1")).getAttribute("offsetWidth");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testMatrix_getWidth() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("getWidth")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("201", myResult);
	}
	
	@Test
	public void testMatrix_setHeight() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setHeight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("matrix1")).getAttribute("offsetHeight");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testMatrix_getHeight() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("getHeight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("77", myResult);
	}
	
	@Test
	public void testMatrix_setLeft() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setLeft")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("matrix1")).getAttribute("offsetLeft");
		assertEquals("100", myResult);
	}
	
	@Test
	public void testMatrix_setRight() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setRight")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("matrix1")).getCssValue("right");
		assertEquals("100px", myResult);
	}

	@Test
	public void testMatrix_setTop() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setTop")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("matrix1")).getAttribute("offsetTop");
		assertEquals("100", myResult);
	}

	@Test
	public void testMatrix_setBottom() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setBottom")).click();
		Thread.sleep(500);

		String myResult = selenium.getDriver().findElement(By.id("matrix1")).getCssValue("bottom");
		assertEquals("100px", myResult);
	}
	
	@Test
	public void testMatrix_getPosition() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("getPosition")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("matrix1")).getAttribute("innerHTML").contains("undefined");
		assertEquals(false, myResult);
	}
	
	@Test
	public void testMatrix_destroy() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("destroy")).click();
		Thread.sleep(500);
		
		try{
			selenium.getDriver().findElement(By.id("matrix1"));
			assertTrue(false);
		}catch(Exception e){}
	}
	
	@Test
	public void testMatrix_disable() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("disable")).click();
		Thread.sleep(500);
		
		Boolean isEnale = selenium.getDriver().findElement(By.id("clone-textField1-0-0")).isEnabled();
		assertEquals(false, isEnale);
	}
	
	@Test
	public void testMatrix_enable() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("disable")).click();
		selenium.getDriver().findElement(By.id("enable")).click();
		Thread.sleep(500);
		
		Boolean isEnale = selenium.getDriver().findElement(By.id("clone-textField1-0-0")).isEnabled();
		assertEquals(true, isEnale);
	}
	
	
	@Test
	public void testMatrix_setBackgroundColor() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setBackgroundColor")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("matrix1")).getCssValue("background-color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testMatrix_setTextColor() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setTextColor")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("matrix1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}
	
	@Test
	public void testMatrix_setParent() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setParent")).click();
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.id("richText1")).findElement(By.id("matrix1"));
	}
	
	@Test
	public void testMatrix_getParent() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setParent")).click();
		selenium.getDriver().findElement(By.id("getParent")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals("richText1", myResult);
	}
	
	@Test
	public void testMatrix_setErrorDiv() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testMatrix_getErrorDiv() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("getErrorDiv")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("richText1");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testMatrix_setErrorMessage() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(true, myResult);
	}
	
	@Test
	public void testMatrix_clearErrorMessage() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setErrorDiv")).click();
		selenium.getDriver().findElement(By.id("setErrorMessage")).click();
		selenium.getDriver().findElement(By.id("clearErrorMessage")).click();
		Thread.sleep(500);
		
		Boolean myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML").contains("error");
		assertEquals(false, myResult);
	}
	
	@Ignore
	public void testMatrix_clear() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setValue_true")).click();
		selenium.getDriver().findElement(By.id("clear")).click();
		selenium.getDriver().findElement(By.id("getValue")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
		assertEquals(false, myResult);
	}
	
	@Ignore
	public void testMatrix_setLabelText() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setLabelText")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("label1")).getAttribute("innerHTML");
		assertEquals("toto", myResult);
	}
	
	@Ignore
	public void testMatrix_setLabelTextColor() throws InterruptedException
	{
		selenium.getDriver().get("http://127.0.0.1:8081/matrixAPI.html");
		selenium.getDriver().findElement(By.id("setLabelTextColor")).click();
		Thread.sleep(500);
		
		String myResult = selenium.getDriver().findElement(By.id("label1")).getCssValue("color").replaceAll("\\s","");
		assertEquals("rgba(101,0,146,1)", myResult);
	}

}
