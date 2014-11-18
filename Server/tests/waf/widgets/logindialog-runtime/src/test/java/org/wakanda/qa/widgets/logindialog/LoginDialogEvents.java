package org.wakanda.qa.widgets.logindialog;

import java.io.IOException;
import java.net.URISyntaxException;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.Paths;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class LoginDialogEvents extends SeleniumRuntimeTemplate {
	
	
	@BeforeClass
	public static void beforeTestSuite() throws URISyntaxException, IOException{
		Paths.solutionRelativePath = "/solutions/LoginDialogTest/LoginDialogTest Solution/LoginDialogTest.waSolution";
		AdminCommand.startServer(LoginDialogEvents.class, Paths.solutionRelativePath);
	}
	@Before
	public void beforeTest(){
		selenium.getDriver().get("http://127.0.0.1:8081/index");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 500);
	}
	@Test
	public void checkLogInEvent () throws InterruptedException{
		logger.info("test case : checkLogInEvent");
		selenium.getDriver().findElement(By.xpath("//*[@id='login1']"));
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.xpath("//*[@id='login1']//a[text()='Login']")).click();
		Thread.sleep(1000);
		logger.info("insert login");
		selenium.getDriver().findElement(By.xpath("//*[@id='name_login_login1']")).clear();
		selenium.getDriver().findElement(By.xpath("//*[@id='name_login_login1']")).sendKeys("test");
		Thread.sleep(1000);
		logger.info("insert password");
		selenium.getDriver().findElement(By.xpath("//*[@id='password_login_login1']")).clear();
		selenium.getDriver().findElement(By.xpath("//*[@id='password_login_login1']")).sendKeys("test");
		Thread.sleep(1000);
		logger.info("click login button");
		selenium.getDriver().findElement(By.xpath("//*[@id='button_login_login1']/span")).click();
		Thread.sleep(1000);
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue();");
		Assert.assertEquals("logged out", actual);
		
	}
	//@Test
	public void checkLogOutEvent () throws InterruptedException{
		logger.info("test case : checkLogOutEvent");
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		selenium.getDriver().findElement(By.xpath("//*[@id='login1']"));
		selenium.getDriver().findElement(By.xpath("//*[@id='login1']//a[text()='Logout']")).click();
		
		String actual = (String) selenium.getJsConsole().executeScript("return $$('richText1').getValue();");	
		Assert.assertEquals("", actual);
		
	}

}
