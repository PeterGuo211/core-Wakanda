package selenium;

import static org.junit.Assert.assertEquals;
import static org.wakanda.common.server.AdminCommand.startServer;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class WListViewStyle extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		//selenium.waitImplicitly(5);
	startServer(WListViewStyle.class, "/wListViewRuntime/wListViewRuntime Solution/wListViewRuntime.waSolution");
		
	}

	@Before
	public void before() {
		selenium.getDriver().get("http://127.0.0.1:8081/Style.waPage/index.html");
		selenium.waitWebElementToBeClickable(selenium.getDriver(), By.id("waf-body"), 5);
	}
	

		
		//------------------------------------------------------------------------
								// Desktop Events
		//------------------------------------------------------------------------

		@Test
		public void wafskinbox_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("waf_skin_box")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-box", myResult);
		}
		@Test
		public void wafskinheader_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("waf_skin_header")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-header", myResult);
		}
		@Test
		public void wafskinfooter_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("waf_skin_footer")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-footer", myResult);
		}
		@Test
		public void wafskincontent_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("waf_skin_content")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-content", myResult);
		}
		@Test
		public void wafskintabs_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("waf_skin_tabs")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-tabs", myResult);
		}
		@Test
		public void wafskininsetLeft_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("waf_skin_insetLeft")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-insetLeft", myResult);
		}
		@Test
		public void wafskininsetTop_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("waf_skin_insetTop")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-insetTop", myResult);
		}
		@Test
		public void wafskininsetButtom_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("waf_skin_insetButtom")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-insetButtom", myResult);
		}
		@Test
		public void wafskininsetHorizontal_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("waf_skin_insetHorizontal")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-insetHorizontal", myResult);
		}
		@Test
		public void wafskininsetVertical_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("waf_skin_insetVertical")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-insetVertical", myResult);
		}
		@Test
		public void wafskintextTitles_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("waf_skin_textTitles")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-textTitles", myResult);
		}
		@Test
		public void removeClass_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("removeClass")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("Removed", myResult);
		}
		@Test
		public void toggleClassAC_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("toggleClassAC")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("", myResult);
		}
		@Test
		public void toggleClassRC_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("toggleClassRC")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("", myResult);
		}
		@Test
		public void wafskininsetRight_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("waf_skin_insetRight")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-insetRight", myResult);
		}
		@Test
		public void hasClass_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("hasClass")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("true", myResult);
		}
		//@Test
		public void bindDACSS_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("bindDACSS")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-textTitles", myResult);
		}
		@Test
		public void hide_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("hide")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-textTitles", myResult);
		}
		@Test
		public void show_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("show")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-textTitles", myResult);
		}
		@Test
		public void style_method() throws InterruptedException
		{
			
			selenium.getDriver().findElement(By.id("style")).click();
			Thread.sleep(10000);
			
			String myResult = selenium.getDriver().findElement(By.id("richText1")).getAttribute("innerHTML");
			assertEquals("waf-skin-textTitles", myResult);
		}
		

	}
	

