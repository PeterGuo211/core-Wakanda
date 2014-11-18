package org.wakanda.debuggerchrome;

import static org.wakanda.common.Common.getResourcePath;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import org.apache.commons.io.IOUtils;
import org.codehaus.plexus.util.StringUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.debuggerchrome.savevideo.CaptureThrad;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;


public class TemplateChromeDebuggerTests extends SeleniumRuntimeTemplate {

	public int timeout = 10;
	public static int frame = 0;
	public String currentHandler = null;
	public static boolean isFirst = true;
	public static boolean isFirstDriver = true;
	public static long startTime =0;
	public static long stopTime =0;
	public static CaptureThrad MyCapture= null;
	public static boolean CaptureMode=false;
	public static final int  VideoMax = 5;
	public static int NumTest = 0;
	public static int NumTestFailed = 0;
	

	@Rule
	public RetryTest retry = new RetryTest(2);

//	@Rule
//	public TestWatcher watchman = new TestWatcher() {
//
//		@SuppressWarnings("deprecation")
//		@Override
//		protected void failed(Throwable err, Description descr) {
//			// Initializes an /Errors/ folder
//
//			File fileScrError = new File("Errors");
//
//			try {
//				// Create the Errors' folder if it doesn't already exist.
//				if (!fileScrError.exists()) {
//					new File("Errors").mkdir();
//				}
//
//				captureScreenshot(descr.getClassName() +"."+descr.getMethodName() + "xxxxxxx");
//
//			} catch (Exception e) {
//				logger.error("Cannot take error screenshot !\n" + e);
//			} finally {
//
//				logger.error("TEST FAILED :( \nScreenshot saved at : /Errors/"
//						+descr.getClassName() +"."+ descr.getMethodName()+ ".jpeg !\n" + err);
//
//				//afterTestCase();
//				
//				try{
//					if(CaptureMode==true && TemplateChromeDebuggerTests.MyCapture.isAlive())
//			   					CaptureThrad.ContinueCapturing = false;
//			   
//				}catch (Exception e) {
//					logger.warn("Test Failed but cannot stop taking the video");
//				}
//				
//				
//				//RetryTest.destroyCaptureProcess();
//			}
//			logger.info("Failed: " + descr.getMethodName() + " :(");
//			NumTestFailed++;
//			//if(NumTestFailed>6)
//				//System.exit(1);
//
//		}
//		

//		public void captureScreenshot(String methodName) {
//			try {
//				//
//				File screenshot = ((TakesScreenshot) selenium.getDriver())
//						.getScreenshotAs(OutputType.FILE);
//				FileUtils.copyFile(screenshot, new File("Errors/" + methodName
//						+ ".png"));
//			} catch (Exception e) {
//				// No need to crash the tests if the screenshot fails
//			}
//		}
//
//		/**
//		 * Logs test successes.
//		 * 
//		 * @author Aleph
//		 */
//		@Override
//		protected void succeeded(Description descr) {
//			logger.info("SUCCEED: " + descr.getMethodName() + " :)");
//			//afterTestCase();
//			try {
//			if(TemplateChromeDebuggerTests.MyCapture.isAlive() && CaptureMode==true)
//			{
//				
//				
//				CaptureThrad.ContinueCapturing = false;
//				for(int i=0;i<10;i++)
//				{
//					if(!CaptureThrad.ContinueCapturing)
//						{
//						FileUtils.forceDelete(new File("Errors/"+descr.getMethodName()+".flv"));
//						break;
//						}
//					try {
//						Thread.sleep(100);
//					} catch (InterruptedException e) {
//						// TODO Auto-generated catch block
//						e.printStackTrace();
//					}
//				
//					}
//				}
//			}catch (Exception e) {
//				// TODO Auto-generated catch block
//				//e.printStackTrace();
//			
//			}
//		}
//
//		/**
//		 * Retrieves the calling class or method names for a specific unit test.
//		 * 
//		 * @author Aleph
//		 * @param callingMethodName
//		 */
//		public void starting(Description descr) {
//			callingMethodName = descr.getMethodName();
//			//callingClass = descr.getTestClass();
//
//			super.starting(descr);
//		}
//	};

//	@Before
//	public void beforeTestCase() {
//		beforeRunning();
//		if(NumTest==VideoMax)
//		{
//			CaptureMode = false;
//		}
//	}
//
//	// @After
//	public void afterTestCase() {
//		try {
//			afterRunning();
//		} catch (Exception e) {
//			logger.error("afterTestCase Method Failed !!!");
//
//		}
//	}
//
//	@BeforeClass
//	public static void BeforeClassFirst() {
//		logger.info("isFirst = false");
//		isFirst = false;
//	}

	public void prepareContext(String handler, String currentContext) throws InterruptedException
			 {
		logger.info("-Type the URL of the debugger chrome in the browser");

		//apply the url of the debugger in the browser
		try{
		selenium.getDriver().get("http://127.0.0.1:8080/walib/debugger/remote_debugger.html");
		}catch (Exception e) {
			logger.error("Cannot get the URL!!");
		}
		
		logger.info("->URL of the debugger chrome is typed");

		logger.info("-Calling the handler : http://127.0.0.1:8081/" + handler);

		Thread.sleep(4000);
//		try{
//		httpRequest("http://127.0.0.1:8081/" + handler);
//		}catch (Exception e) {
//			logger.info("Cannot get the response from the http request");
//		}
//		
//		Thread.sleep(1000);
		
//		selenium.getDriver().get("http://127.0.0.1:8080/walib/debugger/remote_debugger.html");
//		
		//Send a xmlhttpRequest to launch the context from the server
		String request = "xmlHttp = new XMLHttpRequest();xmlHttp.open( \"HEAD\", \"http://127.0.0.1:8081/"+handler+"\"); xmlHttp.send();";
		
			((JavascriptExecutor) selenium.getDriver()).executeScript(request);
		
			Thread.sleep(2000);	

		logger.info("-Trying to set the driver to the IFrame \"debuggerFrame\" ");
		
		//toDefaultContent();

		toDebugFrame();

		logger.info("->The driver has been well modified");

		logger.info("-Waiting for the current context to be loaded");

		getElementByXPath(XPaths.ButtonContinue);

		logger.info("->The current context is Loaded");

		logger.info("-Trying to set the driver to the default one");

		toDefaultContent();

		logger.info("->Driver has beed set to the the Default Content");

		clickOnCurrentContext(currentContext);

	}

	public void prepareContext(String handler) throws MalformedURLException,
			InterruptedException {
		prepareContext(handler, handler);
	}

//	public void beforeRunning()  {
////		logger.info("************Before Began*********");
////		try {
////			//TemplateTestClass.init();
////			
////			// if (!isFirst)
////
//			try {
//				beforeClass();
//			} catch (URISyntaxException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
////
////			//isFirst = true;
////
//////			logger.info(solutionPath);
//////			serverProcess = startServer(solutionPath + "\"" + " "
//////					+ "\"--debugger=remote");
////			
////			
//////			AdminCommand.startServer(solutionPath+"\" --debugger=remote");
////
////		} catch (Exception e) {
////			logger.info("@Before : Server Not Started OR Server Does not load the solution OR Problem in Driver Chrome Intitalization");
////		} finally {
////			logger.info("************Before Has Completed*********");
////			logger.info("**************Test Case Began*********");
////		}
//
//	}
    @Before
	public void beforeRunning() throws URISyntaxException, IOException, InterruptedException {
		
		
		logger.info("testTemplate class is being loaded.");

		// Loads selenium utilities via Singleton. Here we insure that only one
		// instance of the library is meant to exist.
		
		
////		
//		if(!isFirst)
//		{
//			selenium = getSeleniumUtility();
//
//			// Creating ChromeDriver.
//			selenium.createChromeDriver();
//		}
//		else
//			isFirst = false;
		Thread.sleep(2000);
//		
//		URL url = getClass().getResource("solutions");
//		File fic = new File(url.toURI());
//		
			AdminCommand.startServer(TemplateChromeDebuggerTests.class, "/solutions/DebuggerTests/DebuggerTests Solution/DebuggerTests.waSolution", "remote");
		//Utils.runTheServer(fic.getCanonicalPath()+"/DebuggerTests/DebuggerTests Solution/DebuggerTests.waSolution \"--debugger=remote\" ");
			Thread.sleep(2000);
//			isFirst=true;
//
//		}
		
		
		
	}
 
@After
	public void afterRunning() throws IOException, InterruptedException {

	logger.info("Trying to kill the server in TemplateChromeDebuggerTests");
	Thread.sleep(1000);	
	Utils.killServer();
//	selenium.deleteDriver();
	Thread.sleep(1000);
	/////////////
	
		

	}
//public void KillContexts()
//{
//	//sess
//	
////	for(int i=0;i<20;i++)
////	{
////	String getwsUrl =  "var wsUrl =  \"ws://127.0.0.1:8080/wka_dbg/devtools/remote_debugger_ws\";";
////	String sendAbortRequest = "ws.send('{\"method\":\"abort\",\"id\":\""+i+"\"}');";
////	System.out.println(executeJsCode("var wsUrl =  \"ws://127.0.0.1:8080/wka_dbg/devtools/remote_debugger_ws\";"+"var ws = new WebSocket(wsUrl);"+"ws.send('{\"method\":\"abort\",\"id\":\""+i+"\"}');"));
////	}
//	//clickOnAbort();
//	//String result = executeJsCode("app.contextItems.toJSON();");
//	//result="0";
//	int x=0;
//	for(int i=0;i<20;i++)
//	{
//		try{
//		if(selenium.getDriver().findElement(By.xpath("//*[@id=\'"+i+"\']/div[1]/a[2]")).isDisplayed())
//			getElementByXPath("//*[@id=\'"+i+"\']/div[1]/a[2]").click();
//		System.out.println("Context "+i+" founded");
//		}catch (Exception e) {
//			System.out.println("Context "+i+" not founded");
//		}
//		//*[@id="13"]/div[1]/a[2]
//	}
//	//*[@id="4"]/div[1]/span[3]
//	 
//	
//	
	
//}
//	public static void KillServer() {
//		logger.info("************Test Case Has Completed*********");
//
//		logger.info("************After Began*********");
//		logger.info("-Kill Wakanda Process");
//		AdminCommand.stopServer();
//		logger.info("->Wakanda Process Killed");
//		//logger.info("-Unloads the Chrome Driver ");
//		//selenium.deleteDriver();
//		//logger.info("->Driver Unloaded");
//		logger.info("************After Had Completed*********");
//	}

	public int httpRequest(String str) throws MalformedURLException {
		URL url = new URL(str);
		HttpURLConnection conn = null;
		try {

			conn = (HttpURLConnection) url.openConnection();
			conn.setConnectTimeout(4000);
			conn.setReadTimeout(1000);
			conn.setRequestMethod("HEAD");
			// conn.getInputStream();
			InputStream response = conn.getInputStream();
			int lenghtOfTheResponse = response.toString().length();
			 logger.info("->Call Succeed"); 
			 return lenghtOfTheResponse;
		} catch (IOException e) {
			logger.info("->The request to " + str + " has Failed!!!");
			return -1;
		} finally {
			conn.disconnect();
		}
	}

	// ////////////////////////////////////

	public String getContentOfAContext() {

		// String frameInitialized = "undefined";
		// try {
		// frameInitialized = executeJsCode("return $('#'+window.frames["
		// + frame + "].name)[0]");
		// return frameInitialized;
		// } catch (Exception e) {
		// // TODO: handle exception
		// int i = 0;
		// while (frameInitialized.equals("undefined") && i < 10) {
		// i++;
		// Thread.sleep(500);
		// getContentOfAContext();
		// }
		// } finally {
		// return
		// executeJsCode("return $('.text-editor-contents',$('#'+window.frames["
		// + frame + "].name)[0].contentWindow.document).text()");
		// }
		// // logger.info("La frame principale est :  "+frameInitialized);
		
		return getContentOfAContext(1);
	}
	public String getContentOfAContext(int posFrame) {

			
		toDebugFrames(posFrame);
		String content =  getElementByXPath(XPaths.ContentOfTheCurrentContext).getText();
		toDefaultContent();
		return content;
	}
	public void toDebugFrames(int posFrame) {
		posFrame++;
		selenium.getDriver().switchTo().frame(getElementByXPath("//*[@id='framesDiv']/iframe[@style=\"display: inline;\"]"));
		//*[@id="11"]/div[1]/span[3]
		//getElementByXPath("//*[@id='framesDiv']/iframe[@src=\"frame-11\"]");
		
		
		
		//*[@id="frame-11"]
	
	

	}
	public void toDebugFrame() {
//		try {
//			selenium.getDriver().switchTo().defaultContent();
//		} catch (Exception e) {
//		}

		toDebugFrames(1);

	}

	public void toDefaultContent() {
//		try {
//			selenium.getDriver().switchTo()
//					.frame(getElementByClassName("debugFrame"));
//		} catch (Exception e) {
//		}

		selenium.getDriver().switchTo().defaultContent();

	}

	public String executeJsCode(String request) {
		logger.info("-Execute this JS Code : " + request);
		JavascriptExecutor js = (JavascriptExecutor) selenium.getDriver();
		String content = js.executeScript(request).toString();
		logger.info("->The returned result is : " + content);
		return content;
	}

	public WebElement getElementByClassName(String className) {
		logger.info("-Waiting the element By ClassName : " + className
				+ " for " + timeout + "seconds");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),
				By.className(className), timeout);
		logger.info("->Element Found");
		return selenium.getDriver().findElement(By.className(className));
	}

	public WebElement getElementByCss(String Css) {
		logger.info("-Waiting the element by Css : " + Css + " for " + timeout
				+ "seconds");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),
				By.cssSelector(Css), timeout);
		logger.info("->Element Found");
		return selenium.getDriver().findElement(By.cssSelector(Css));
	}

	public WebElement getElementByXPath(String xpathExpression) {
		logger.info("-Waiting the element by XPath : " + xpathExpression
				+ " for " + timeout + "seconds");
		selenium.waitWebElementToBeClickable(selenium.getDriver(),
				By.xpath(xpathExpression), timeout);
		logger.info("->Element Found");
		return selenium.getDriver().findElement(By.xpath(xpathExpression));

	}

	public WebElement getElementById(String id) {
		logger.info("-Waiting the element bi ID : " + id + " for " + timeout
				+ "seconds");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id(id),
				timeout);
		logger.info("->Element Found");
		return selenium.getDriver().findElement(By.id(id));

	}

	public void clickOnContext() {
		getElementById("contexts_list").click();

	}

	public void clickOnCurrentContext(String handler) {

		logger.info("-Trying to select the current context : ../DebuggerTests/"
				+ handler + ".js']");

		selenium.getDriver()
				.findElement(
						By.xpath("//span[text()='../DebuggerTests/" + handler
								+ ".js']")).click();

		logger.info("->The current context has been selected : ../DebuggerTests/"
				+ handler + ".js']");

	}

	public void clickOnAbort() throws InterruptedException {

		
		toDefaultContent();
		WebElement element = getElementByXPath("//*[@id='contexts_list']");
		int time=0;
		element = selenium.getDriver().findElement(By.xpath("//*[@class='abort_button']"));
		while(element.isDisplayed() && time++ < 5)
			Thread.sleep(500);
		
		toDefaultContent();
		element = selenium.getDriver().findElement(By.xpath("//*[@class='abort_button']"));
		//element.click();
		//element.sendKeys(Keys.ENTER);
		selenium.getDriver().findElement(By.xpath("//*[@class='context cur_context expanded']")).findElement(By.className("abort_button")).click();
		//*[@id="contexts_list"]
		
//		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.className("abort_button"), timeout);
//		(element = element.findElement(By.className("abort_button")))
//				.getAttribute("innerHTML");
//		Actions action = new Actions(selenium.getDriver());
//		action.click(element).perform();
		

	}

	public void clickOnContinue() {
		getElementByXPath(XPaths.ButtonContinue).click();
	}

	public void clickOnConsole() {
		getElementByXPath(XPaths.DisplayConsole)

		.click();
	}

	public void clickOnStepOver() {
		getElementByXPath(XPaths.ButtonStepOver).click();
	}

	public void clickOnStepInto() {
		getElementByXPath(XPaths.ButtonStepInto).click();
	}

	public void clickOnStepOut() {
		getElementByXPath(XPaths.ButtonStepOut).click();
	}

	public void clickOnPause() {
		getElementByClassName("scripts-step-out status-bar-item").click();
	}

	public void clickOnToggleBreakpoint() {
		getElementByClassName("scripts-toggle-breakpoints status-bar-item");
	}

	public String getTextFromFile(String nameFile) throws URISyntaxException,
			IOException {
		String everything = null;
		String pathFile = getResourcePath(TemplateChromeDebuggerTests.class,
				"/solutions/DebuggerTests/DebuggerTests/" + nameFile);
		FileInputStream inputStream = new FileInputStream(pathFile);
		try {
			everything = IOUtils.toString(inputStream);
		} finally {
			inputStream.close();
		}
		return everything;
	}
	public String getPathFile(String nameFile) throws URISyntaxException, IOException
	{
		
		String pathFile = getResourcePath(TemplateChromeDebuggerTests.class,
				"/solutions/DebuggerTests/DebuggerTests/" + nameFile);
		
		
		return pathFile;
	}

	public String unifyString(String s) throws UnsupportedEncodingException {
		byte ptext[] = s.getBytes("ISO-8859-1");
		s = new String(ptext, "UTF-8");
		s = s.replaceAll("\\n\\r", "");
		s = s.replaceAll("\\r\\n", "");
		s = s.replaceAll("\\n", "");
		s = s.replaceAll("\\r", "");
		s = s.replaceAll("\\?", "");
		s = StringUtils.unifyLineSeparators(s);
		return s.toString();
	}

	public static void afterClass() {

	}

	public String waitContentToBeDisplayed(String elementXPath,
			String expected, int timeout) throws InterruptedException {
		int i = 0;
		String result = null;
		while (i < timeout) {
			logger.error("Try " + i + " to get the class name");
			try {
				result = getElementByXPath(elementXPath).getAttribute("class");
				if (result.equals(expected)) {
					logger.info("Founded!!");
					return result;
				}
			} catch (Exception e) {
				logger.warn("Error when try to get the class name of the execution line!!");
			}
			i++;
			Thread.sleep(100);

		}
		logger.error("Failed to find execution line, the tag returned is : "
				+ result);
		return result;
	}

	public String waitContentToBeDisplayed(String elementXPath, int timeout)
			throws InterruptedException {
		return waitContentToBeDisplayed(elementXPath,
				XPaths.ClassNameOfExecutionLine, timeout);
	}

	public void typeShortcutContinue() {
		getElementByXPath(XPaths.ButtonContinue).sendKeys(Keys.F8);
	}

	public void typeShortcutStepInto() {
		getElementByXPath(XPaths.ButtonStepInto).sendKeys(Keys.F11);
	}

	public void typeShortcutStepOver() {
		getElementByXPath(XPaths.ButtonStepOver).sendKeys(Keys.F10);
	}

	public void typeShortcutStepOut() {
		getElementByXPath(XPaths.ButtonStepOut).sendKeys(
				Keys.chord(Keys.SHIFT, Keys.F11));
	}

	public void typeContextTriggered() throws MalformedURLException,
			InterruptedException {

		currentHandler = "types";
		prepareContext(currentHandler);
		logger.info(getContentOfAContext());
		toDebugFrame();
		clickOnConsole();

	}

}
