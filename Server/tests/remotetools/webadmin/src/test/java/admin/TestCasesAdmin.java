package admin;

import static org.junit.Assert.*;
import java.io.IOException;
import java.net.URISyntaxException;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.Common;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCasesAdmin extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		  selenium.waitImplicitly(5);
		  AdminCommand.startServer(TestCasesAdmin.class, "/solutions/adminSol/adminSol Solution/adminSol.waSolution");
	}


	@Test
	public void remoteTools_admin_testSolutionName() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		String projectName = selenium.getDriver().findElement(By.id("richText10")).getText();
		assertEquals("Solution Name is : ", "adminSol", projectName);
	}

	@Test
	public void remoteTools_admin_testButtonStop_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(500);
		long end = System.currentTimeMillis() + 20000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = selenium.getDriver().findElement(By.id("startStopSolution")).getText();
			if (resultsAtt.equals("Stop Solution")) {
				break;
			}
		}

		Thread.sleep(4000);
		String ButtonStop = selenium.getDriver().findElement(By.id("startStopSolution")).getText();
		assertEquals("Solution Name is enabled : ", "Stop Solution", ButtonStop);

	}

	@Test
	public void remoteTools_admin_testButtonStart_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("startStopSol")).click();
		long end = System.currentTimeMillis() + 20000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String resultsAtt = selenium.getDriver().findElement(By.id("startStopSolution")).getText();
			if (resultsAtt.equals("Start Solution")) {
				break;
			}
		}

		String ButtonStart = selenium.getDriver().findElement(By.id("startStopSolution")).getText();
		assertEquals("Solution Name is enabled :", "Start Solution", ButtonStart);

	}

	@Test
	public void remoteTools_admin_testButtonBrowse_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(500);
		String ButtonBrowse = selenium.getDriver().findElement(By.id("browseText")).getText();
		assertEquals("Solution Name is enabled : ", "Browse", ButtonBrowse);

	}

	@Test
	public void remoteTools_admin_testButtonBrowse_popup_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("browseCont")).click();
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='openModal']")).getAttribute("opacity");
			if (resultsAtt == "1") {
				assertEquals("Browse Solution popup is opened : ", "true", "true");
				break;
			}
		}
		selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/a")).click();
	}

	@Test
	public void remoteTools_admin_testButtonBrowse_popup_buttonCancel_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("browseText")).click();
		String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/button[2]")).getAttribute("innerHTML");
		assertEquals("Browse Solution button cancel is : ", "Cancel", resultsAtt);
	}

	@Test
	public void remoteTools_admin_testButtonBrowse_popup_buttonLaunch_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("browseText")).click();
		String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/button[1]")).getAttribute("innerHTML");
		assertEquals("Browse Solution button launch is : ", "OK", resultsAtt);
	}

	@Test
	public void remoteTools_admin_testButtonBrowse_popup_typeInput_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("browseText")).click();
		try {
		selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/input")).sendKeys("/path/to/solution.wa");
	    Thread.sleep(500);
		assertEquals("Browse Solution button launch is : ", "true" , "true");
		} catch (Error e) {
		assertEquals("Browse Solution button launch is : ", "false" , "false");
		}
		selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/a")).click();
	}

	@Test
	public void remoteTools_admin_testSolutionName_enabled_combobox() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("startStopSol")).click();
		long end = System.currentTimeMillis() + 10000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(1000);
			String resultsAtt = selenium.getDriver().findElement(By.id("startStopSolution")).getAttribute("InnerHMTL");
			if (resultsAtt == "Stop Solution") {
				break;
			}
		}


		Thread.sleep(500);
		String result = (String) selenium.getJsConsole().executeScript("return $('option').first().text()");
		assertEquals("Solution Name is enabled : ", "adminSol (Running)", result);

	}

	@Test
	public void remoteTools_admin_testButton_generalInfo_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		long end = System.currentTimeMillis() + 20000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='label60']")).getText();
			if (resultsAtt.equals("General Info")) {
				break;
			}
		}

		String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='label60']")).getText();
		assertEquals("Button general info is : ", "General Info", resultsAtt);

	}

	@Test
	public void remoteTools_admin_testTitle_admin_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		long end = System.currentTimeMillis() + 20000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='richText1']")).getText();
			if (resultsAtt.equals("Wakanda Enterprise Server Administration")) {
				break;
			}
		}

		String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='richText1']")).getText();
		assertEquals("Title administration is : ", "Wakanda Enterprise Server Administration", resultsAtt);

	}

	@Test
	public void remoteTools_admin_testTab_opt1_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		long end = System.currentTimeMillis() + 20000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='richText7']")).getText();
			if (resultsAtt.equals("Datastore cache size:")) {
				break;
			}
		}

		String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='richText7']")).getText();
		assertEquals("Text for first opt1 is : ", "Datastore cache size:", resultsAtt);

	}

	@Test
	public void remoteTools_admin_testTab_opt1_result_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		long end = System.currentTimeMillis() + 20000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='cashSizeValue']")).getText();
			if (resultsAtt.equals("200 MB")) {
				break;
			}
		}

		String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='cashSizeValue']")).getText();
		assertEquals("Result for first opt1 is : ", "200 MB", resultsAtt);

	}

	@Test
	public void remoteTools_admin_testTab_opt2_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		long end = System.currentTimeMillis() + 20000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='richText8']")).getText();
			if (resultsAtt.equals("Flush data buffers every:")) {
				break;
			}
		}

		String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='richText8']")).getText();
		assertEquals("Text for first opt2 is : ", "Flush data buffers every:", resultsAtt);

	}

	@Test
	public void remoteTools_admin_testTab_opt2_result_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		long end = System.currentTimeMillis() + 20000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='dataBufferValue']")).getText();
			if (resultsAtt.equals("15 s")) {
				break;
			}
		}

		String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='dataBufferValue']")).getText();
		assertEquals("Result for first opt2 is : ", "15 s", resultsAtt);

	}

	@Test
	public void remoteTools_admin_testTab_opt3_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		long end = System.currentTimeMillis() + 20000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='richText9']")).getText();
			if (resultsAtt.equals("Authentification type:")) {
				break;
			}
		}

		String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='richText9']")).getText();
		assertEquals("Text for first opt3 is : ", "Authentification type:", resultsAtt);

	}

	@Test
	public void remoteTools_admin_testTab_opt3_result_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		long end = System.currentTimeMillis() + 20000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='authentificationValue']")).getText();
			if (resultsAtt.equals("basic")) {
				break;
			}
		}
		String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='authentificationValue']")).getText();
		assertEquals("Result for first opt3 is : ", "custom", resultsAtt);

	}

	@Test
	public void remoteTools_admin_testEditSolutionSettings_buttonEditSolutionSettings_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		long end = System.currentTimeMillis() + 20000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='richText2']")).getText();
			if (resultsAtt.equals("Solution Settings")) {
				break;
			}
		}

		String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='richText2']")).getText();
		assertEquals("Solution Name is enabled : ", "Solution Settings", resultsAtt);

	}

	@Test
	public void remoteTools_admin_testEditProjectSettings_buttonEditProjectSettings_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		long end = System.currentTimeMillis() + 20000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='label7']")).getText();
			if (resultsAtt.equals("Settings")) {
				break;
			}
		}
		String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='label7']")).getText();
		assertEquals("Solution Name is enabled : ", "Settings", resultsAtt);
	}

	@Test
	public void remoteTools_admin_testEditSolutionSettings_popup_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(500);
		selenium.getDriver().findElement(By.xpath("//*[@id='settingsSol']")).click();
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='solutionsSettingsContainer']")).getAttribute("display");
			if (resultsAtt == "block") {
				assertEquals("Edit Solution Settings is opened : ", "true", "true");
				break;
			}
		}
		selenium.getDriver().findElement(By.xpath("//*[@id='closeSolSettings']/span")).click();
	}

	@Test
	public void remoteTools_admin_testEditProjectSettings_popup_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(500);
		selenium.getDriver().findElement(By.xpath("//*[@id='applicationSettings']")).click();
		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = selenium.getDriver().findElement(By.xpath("//*[@id='settingsContainer']")).getAttribute("display");
			if (resultsAtt == "block") {
				assertEquals("Edit Project Settings is opened : ", "true", "true");
				break;
			}
		}
	}

	@Test
	public void remoteTools_admin_testOpenSolution_Opening1Solution() throws InterruptedException, URISyntaxException, IOException {
		AdminCommand.stopServer();
		String path = Common.getResourcePath(TestCasesAdmin.class, "/solutions/adminSolution1/adminSolution1 Solution/adminSolution1.waSolution");
		AdminCommand.startServer(TestCasesAdmin.class, "/solutions/adminSolution1/adminSolution1 Solution/adminSolution1.waSolution");
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		Thread.sleep(500);
		selenium.getDriver().findElement(By.id("browseCont")).click();
		selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/input")).sendKeys(path);
		selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/button[1]")).click();
		long end = System.currentTimeMillis() + 10000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = (String) selenium.getJsConsole().executeScript("return $('#openModal').css('opacity')");
			String resultsAtt2 = selenium.getDriver().findElement(By.id("startStopSolution")).getAttribute("InnerHMTL");
			if (resultsAtt == "0" && resultsAtt2 == "Stop Solution") {
				assertEquals("Browse Solution popup is opened : ", "true", "true");
				break;
			}
		}

		String solutionName1Project = (String) selenium.getJsConsole().executeScript("return $('option').first().text()");
		assertEquals("Solution Name is : ", "adminSolution1 (Running)", solutionName1Project);
		AdminCommand.stopServer();
	}

	@Test
	public void remoteTools_admin_testOpenSolution_Opening1Solution_https() throws InterruptedException, URISyntaxException, IOException {
		String path = Common.getResourcePath(TestCasesAdmin.class, "/solutions/adminSolution1/adminSolution1 Solution/adminSolution1.waSolution");
		AdminCommand.startServer(TestCasesAdmin.class, "/solutions/adminSolution1/adminSolution1 Solution/adminSolution1.waSolution");
		selenium.getDriver().get("https://127.0.0.1:4433");
		Thread.sleep(6500);
		selenium.getDriver().findElement(By.id("browseCont")).click();
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/input")).sendKeys(path);
		selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/button[1]")).click();
		long end = System.currentTimeMillis() + 10000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = (String) selenium.getJsConsole().executeScript("return $('#openModal').css('opacity')");
			String resultsAtt2 = selenium.getDriver().findElement(By.id("startStopSolution")).getAttribute("InnerHMTL");
			if (resultsAtt == "0" && resultsAtt2 == "Stop Solution") {
				assertEquals("Browse Solution popup is opened : ", "true", "true");
				break;
			}
		}
		String solutionName1Project = (String) selenium.getJsConsole().executeScript("return $('option').first().text()");
		assertEquals("Solution Name is : ", "adminSolution1 (Running)", solutionName1Project);
		AdminCommand.stopServer();
	}

	@Test
	public void remoteTools_admin_testOpenSolution_OpeningXSolution() throws InterruptedException, URISyntaxException, IOException {
		String path = Common.getResourcePath(TestCasesAdmin.class, "/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		AdminCommand.startServer(TestCasesAdmin.class, "/solutions/adminSolution1/adminSolution1 Solution/adminSolution1.waSolution");
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1500);
		selenium.getDriver().findElement(By.id("browseCont")).click();
		selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/input")).sendKeys(path);
		selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/button[1]")).click();
		long end = System.currentTimeMillis() + 10000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = (String) selenium.getJsConsole().executeScript("return $('#openModal').css('opacity')");
			String resultsAtt2 = selenium.getDriver().findElement(By.id("startStopSolution")).getAttribute("InnerHMTL");
			if (resultsAtt == "0" && resultsAtt2 == "Stop Solution") {
				assertEquals("Browse Solution popup is opened : ", "true", "true");
				break;
			}
		}
		String solutionNameXProject = (String) selenium.getJsConsole().executeScript("return $('option').first().text()");
		assertEquals("Solution Name is : ", "adminSolutionProjectX (Running)", solutionNameXProject);
		AdminCommand.stopServer();
	}
	@Test
	public void remoteTools_admin_testOpenSolution_OpeningXSolution_https() throws InterruptedException, URISyntaxException, IOException {
		String path = Common.getResourcePath(TestCasesAdmin.class, "/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		AdminCommand.startServer(TestCasesAdmin.class, "/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		selenium.getDriver().get("https://127.0.0.1:4433");
		Thread.sleep(1500);
		selenium.getDriver().findElement(By.id("browseCont")).click();
		selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/input")).sendKeys(path);
		selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/button[1]")).click();
		long end = System.currentTimeMillis() + 10000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(1000);
			String resultsAtt = (String) selenium.getJsConsole().executeScript("return $('#openModal').css('opacity')");
			String resultsAtt2 = selenium.getDriver().findElement(By.id("startStopSolution")).getAttribute("InnerHMTL");
			if (resultsAtt == "0" && resultsAtt2 == "Stop Solution") {
				assertEquals("Browse Solution popup is opened : ", "true", "true");
				break;
			}
		}
		String solutionNameXProject = (String) selenium.getJsConsole().executeScript("return $('option').first().text()");
		assertEquals("Solution Name is : ", "adminSolutionProjectX (Running)", solutionNameXProject);
		AdminCommand.stopServer();
	}
	@Test
	public void remoteTools_admin_testXSolutionNameProjects_exists() throws InterruptedException, URISyntaxException, IOException {
		int y = 0;
		String path = Common.getResourcePath(TestCasesAdmin.class, "/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		AdminCommand.startServer(TestCasesAdmin.class, "/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("browseCont")).click();
		selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/input")).sendKeys(path);
		selenium.getDriver().findElement(By.xpath("//*[@id='openModal']/div/button[1]")).click();
		Thread.sleep(1000);
		long end = System.currentTimeMillis() + 10000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			String resultsAtt = (String) selenium.getJsConsole().executeScript("return $('#openModal').css('opacity')");
			String resultsAtt2 = selenium.getDriver().findElement(By.id("startStopSolution")).getAttribute("InnerHMTL");
			if (resultsAtt == "0" && resultsAtt2 == "Stop Solution") {
				assertEquals("Browse Solution popup is opened : ", "true", "true");
				break;
			}
		}
		for(int x = 0; x < 4; x++){
			y++;
			String xpathName = "//*[@id='clone-richText15-"+x+"-0']";
			String projectName = "Project"+ y +"";
			String resultAtt = selenium.getDriver().findElement(By.xpath(xpathName)).getText();
			assertEquals("Project Name is : ", projectName, resultAtt);
	    }
		AdminCommand.stopServer();
	}
	@Test
	public void remoteTools_admin_testgetMaintenanceSolution_adminSolution1() throws InterruptedException, URISyntaxException, IOException {
		//String path = Common.getResourcePath(TestCasesAdmin.class, "/solutions/adminSolution1/adminSolution1 Solution/adminSolution1.waSolution");
		//AdminCommand.startServer(TestCasesAdmin.class, "/solutions/adminSolution1/adminSolution1 Solution/adminSolution1.waSolution");
		//String path0 = Common.getResourcePath(TestCasesAdmin.class, "/solutions/adminSol/adminSol Solution/adminSol.waSolution");
		AdminCommand.startServer(TestCasesAdmin.class, "/solutions/adminSol/adminSol Solution/adminSol.waSolution");
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
		while (System.currentTimeMillis() < 10000) {
			Thread.sleep(500);
			if (elementLength > 0) {
				break;
			}
		}
		for (int x = 1; x <= elementLength ; x++) {
			String mySolution = selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminSolution1&nbsp;" )) {
				selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				selenium.getDriver().findElement(By.xpath("//*[@id='waf-body']/ul[1]/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
			}
		}
		String solutionName1Project = selenium.getDriver().findElement(By.id("richText10")).getText();
		assertEquals("Solution Name in Maintenance mod is : ", "adminSolution1", solutionName1Project);
	}
	@Test
	public void remoteTools_admin_testgetMaintenanceSolution_adminSolutionXProject() throws InterruptedException, URISyntaxException, IOException {
		AdminCommand.stopServer();
		//String path = Common.getResourcePath(TestCasesAdmin.class, "/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		AdminCommand.startServer(TestCasesAdmin.class, "/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		AdminCommand.stopServer();
		//String path0 = Common.getResourcePath(TestCasesAdmin.class, "/solutions/adminSol/adminSol Solution/adminSol.waSolution");
		AdminCommand.startServer(TestCasesAdmin.class, "/solutions/adminSol/adminSol Solution/adminSol.waSolution");
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);

		Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
		while (System.currentTimeMillis() < 10000) {
			Thread.sleep(500);
			if (elementLength > 0) {
				break;
			}
		}
		for (int x = 1; x <= elementLength ; x++) {
			String mySolution = selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminSolutionProjectX&nbsp;" )) {
				selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				selenium.getDriver().findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
			}
		}
		String solutionNameXProject = selenium.getDriver().findElement(By.id("richText10")).getText();
		assertEquals("Solution Name in Maintenance mod is : ", "Project1", solutionNameXProject);
	}
	@Test
	public void remoteTools_admin_testButtonVerify_exist() throws InterruptedException, URISyntaxException, IOException {
		AdminCommand.stopServer();
		//String path = Common.getResourcePath(TestCasesAdmin.class, "/solutions/adminMaintenanceSol/adminMaintenanceSol Solution/adminMaintenanceSol.waSolution");
		AdminCommand.startServer(TestCasesAdmin.class, "/solutions/adminMaintenanceSol/adminMaintenanceSol Solution/adminMaintenanceSol.waSolution");
		AdminCommand.stopServer();
		//String path0 = Common.getResourcePath(TestCasesAdmin.class, "/solutions/adminSol/adminSol Solution/adminSol.waSolution");
		AdminCommand.startServer(TestCasesAdmin.class, "/solutions/adminSol/adminSol Solution/adminSol.waSolution");
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		while (System.currentTimeMillis() < 1000) {
			Thread.sleep(500);
			Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
			if (elementLength > 0) {
				break;
			}
		}
		Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
		for (int x = 1; x <= elementLength ; x++) {
			Thread.sleep(500);
			String mySolution = selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				selenium.getDriver().findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
			}
		}
		selenium.getDriver().findElement(By.id("verifyButton")).click();
		Thread.sleep(1000);
		String result = selenium.getDriver().findElement(By.id("label6")).getText();
		assertEquals("Verify button is : ", "Verify", result);
	}
	@Test
	public void remoteTools_admin_testButtonVerify_functionnal() throws InterruptedException, URISyntaxException, IOException {
		AdminCommand.stopServer();
		//String path = Common.getResourcePath(TestCasesAdmin.class, "/solutions/adminMaintenanceSol/adminMaintenanceSol Solution/adminMaintenanceSol.waSolution");
		AdminCommand.startServer(TestCasesAdmin.class, "/solutions/adminMaintenanceSol/adminMaintenanceSol Solution/adminMaintenanceSol.waSolution");
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		while (System.currentTimeMillis() < 1000) {
			Thread.sleep(500);
			Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
			if (elementLength > 0) {
				break;
			}
		}
		Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
		for (int x = 1; x <= elementLength ; x++) {
			Thread.sleep(500);
			String mySolution = selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				selenium.getDriver().findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
			}
		}
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("verifyButton")).click();
		Thread.sleep(1000);
		long end = System.currentTimeMillis() + 60000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='main_project_container']/div[1]/span[2]")).getText();
			if (result.equals("Data was verified successfully.")) {
				break;
			}
		}
		String result2 = selenium.getDriver().findElement(By.xpath("//*[@id='main_project_container']/div[1]/span[2]")).getText();
		assertEquals("Verify button is : ", "Data was verified successfully.", result2);
	}
	@Test
	public void remoteTools_admin_testButtonRepair_exist() throws InterruptedException {
		AdminCommand.stopServer();
		AdminCommand.startServer();
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		while (System.currentTimeMillis() < 1000) {
			Thread.sleep(500);
			Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
			if (elementLength > 0) {
				break;
			}
		}
		Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
		for (int x = 1; x <= elementLength ; x++) {
			Thread.sleep(500);
			String mySolution = selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				selenium.getDriver().findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
			}
		}
		selenium.getDriver().findElement(By.id("repairButton")).click();
		Thread.sleep(1000);
		String result = selenium.getDriver().findElement(By.id("label8")).getText();
		assertEquals("Repair button is : ", "Repair", result);
	}
	@Test
	public void remoteTools_admin_testButtonRepair_functionnal() throws InterruptedException {
		AdminCommand.stopServer();
		AdminCommand.startServer();
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(500);
		while (System.currentTimeMillis() < 1000) {
			Thread.sleep(500);
			Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
			if (elementLength > 0) {
				break;
			}
		}
		Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
		for (int x = 1; x <= elementLength ; x++) {
			Thread.sleep(500);
			String mySolution = selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				selenium.getDriver().findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
			}
		}
		selenium.getDriver().findElement(By.id("repairButton")).click();
		long end = System.currentTimeMillis() + 60000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='main_project_container']/div[1]/span[2]")).getText();
			if (result.equals("Data was repaired successfully.")) {
				break;
			}
		}
		String result2 = selenium.getDriver().findElement(By.xpath("//*[@id='main_project_container']/div[1]/span[2]")).getText();
		assertEquals("Verify button is : ", "Data was repaired successfully.", result2);
	}
	@Test
	public void remoteTools_admin_testButtonCompact_exist() throws InterruptedException {
		AdminCommand.stopServer();
		AdminCommand.startServer();
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(500);
		while (System.currentTimeMillis() < 1000) {
			Thread.sleep(500);
			Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
			if (elementLength > 0) {
				break;
			}
		}
		Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
		for (int x = 1; x <= elementLength ; x++) {
			Thread.sleep(500);
			String mySolution = selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				selenium.getDriver().findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
			}
		}
		selenium.getDriver().findElement(By.id("compactButton")).click();
		Thread.sleep(1000);
		String result = selenium.getDriver().findElement(By.id("label5")).getText();
		assertEquals("Compact button is : ", "Compact", result);
	}
	@Test
	public void remoteTools_admin_testButtonCompact_functionnal() throws InterruptedException {
		AdminCommand.stopServer();
		AdminCommand.startServer();
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(500);
		while (System.currentTimeMillis() < 1000) {
			Thread.sleep(500);
			Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
			if (elementLength > 0) {
				break;
			}
		}
		Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
		for (int x = 1; x <= elementLength ; x++) {
			String mySolution = selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				selenium.getDriver().findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
			}
		}
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("compactButton")).click();
		long end = System.currentTimeMillis() + 60000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='main_project_container']/div[1]/span[2]")).getText();
			if (result.equals("Data was compacted successfully.")) {
				break;
			}
		}
		String result2 = selenium.getDriver().findElement(By.xpath("//*[@id='main_project_container']/div[1]/span[2]")).getText();
		assertEquals("Compact button is : ", "Data was compacted successfully.", result2);
	}
	@Test
	public void remoteTools_admin_testButtonBackup_exist() throws InterruptedException {
		AdminCommand.stopServer();
		AdminCommand.startServer();
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(500);
		while (System.currentTimeMillis() < 1000) {
			Thread.sleep(500);
			Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
			if (elementLength > 0) {
				break;
			}
		}
		Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
		for (int x = 1; x <= elementLength ; x++) {
			Thread.sleep(500);
			String mySolution = selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				selenium.getDriver().findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
			}
		}
		selenium.getDriver().findElement(By.id("backupButton")).click();
		Thread.sleep(1000);
		String result = selenium.getDriver().findElement(By.id("label9")).getText();
		assertEquals("Backup button is : ", "Backup", result);
	}
	@Test
	public void remoteTools_admin_testButtonBackup_functionnal() throws InterruptedException {
		AdminCommand.stopServer();
		AdminCommand.startServer();
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(500);
		while (System.currentTimeMillis() < 1000) {
			Thread.sleep(500);
			Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
			if (elementLength > 0) {
				break;
			}
		}
		Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
		for (int x = 1; x <= elementLength ; x++) {
			String mySolution = selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				selenium.getDriver().findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
			}
		}
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("backupButton")).click();
		long end = System.currentTimeMillis() + 60000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='main_project_container']/div[1]/span[2]")).getText();
			if (result.equals("Data was backed up successfully.")) {
				break;
			}
		}
		String result2 = selenium.getDriver().findElement(By.xpath("//*[@id='main_project_container']/div[1]/span[2]")).getText();
		assertEquals("Backup button is : ", "Data was backed up successfully.", result2);
	}

	@Test
	public void remoteTools_admin_testButtonRestore_exist() throws InterruptedException {
		AdminCommand.stopServer();
		AdminCommand.startServer();
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(500);
		while (System.currentTimeMillis() < 1000) {
			Thread.sleep(500);
			Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
			if (elementLength > 0) {
				break;
			}
		}
		Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
		for (int x = 1; x <= elementLength ; x++) {
			Thread.sleep(500);
			String mySolution = selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				selenium.getDriver().findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
			}
		}

		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("restoreButton")).click();
		String result = selenium.getDriver().findElement(By.id("richText3")).getText();
		assertEquals("Restore button is : ", "Restore", result);
}

	@Test
	public void remoteTools_admin_testButtonRestore_functionnal() throws InterruptedException {
		AdminCommand.stopServer();
		AdminCommand.startServer();
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(500);
		while (System.currentTimeMillis() < 1000) {
			Thread.sleep(500);
			Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
			if (elementLength > 0) {
				break;
			}
		}
		Long elementLength = (Long) selenium.getJsConsole().executeScript("return $('#solutionCombobox option').length");
		for (int x = 1; x <= elementLength ; x++) {
			String mySolution = selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/select/option["+x+"]")).getAttribute("innerHTML");
			if(mySolution.equals( "adminMaintenanceSol&nbsp;" )) {
				selenium.getDriver().findElement(By.xpath("//*[@id='solutionCombobox']/button")).click();
				Thread.sleep(500);
				selenium.getDriver().findElement(By.xpath("//*[@id='waf-body']/ul/li["+x+"]/a")).click();
				Thread.sleep(1000);
				break;
			}
		}
		Thread.sleep(2000);
		selenium.getDriver().findElement(By.id("restoreButton")).click();
		long end = System.currentTimeMillis() + 60000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(500);
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='main_project_container']/div[1]/span[2]")).getText();
			if (result.equals("Data was restored successfully.")) {
				break;
			}
		}
		String result2 = selenium.getDriver().findElement(By.xpath("//*[@id='main_project_container']/div[1]/span[2]")).getText();
		assertEquals("Restore button is : ", "Data was restored successfully.", result2);
	}
	@Test
	public void remoteTools_admin_testLog_exist() throws InterruptedException {
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(1000);
		String result = selenium.getDriver().findElement(By.id("showLogsconsole")).getText();
		assertEquals("Log space is : ", "Logs", result);
		AdminCommand.stopServer();
	}

	@Test
	public void remoteTools_admin_testSolutionXProject_exist() throws InterruptedException, URISyntaxException, IOException {
		//String path = Common.getResourcePath(TestCasesAdmin.class, "/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		AdminCommand.startServer(TestCasesAdmin.class, "/solutions/adminSolutionProjectX/adminSolutionProjectX Solution/adminSolutionProjectX.waSolution");
		selenium.getDriver().get("http://127.0.0.1:8080");
		Thread.sleep(500);
		int y = 0;
		Long elementLengthDiv = (Long) selenium.getJsConsole().executeScript("return  $('.matrix-container').children('div').length");
		for (int x = 0; x < elementLengthDiv ; x++) {
			y++;
			Thread.sleep(500);
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='clone-richText15-"+ x +"-0']")).getAttribute("innerHTML");
			assertEquals("Project"+x+" is available on Maintenance mod : ", "Project"+y+"", result);
		}
	}
}
