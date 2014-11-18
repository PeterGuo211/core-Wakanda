package selenium;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.net.URISyntaxException;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;

public class TestCases_API extends SeleniumRuntimeTemplate {
	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		selenium.waitImplicitly(5);
		AdminCommand.startServer(TestCases_API.class, "/BehaviorContainer/Untitled Solution/BehaviorContainer.waSolution");
	}
	
	@Before
	public void before(){
		selenium.getDriver().get("http://127.0.0.1:8081/index/?cacheBreaker"+System.currentTimeMillis());
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {}
	}

	@Test
	public void test_addIndexedEvent_fromContainer() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').fire('click');");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textLog').getValue() +'';");										
		assertEquals("Check indexed 'click' events", "click", result);
	}
	
	@Test
	public void test_addIndexedEvent_fromText() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('text1').fire('click');");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textLog').getValue() +'';");										
		assertEquals("Check indexed 'click' events", "clickselect", result);
	}
	
	@Test
	public void test_addIndexedMethods() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').styleSubwidget(3, 'background-color', 'green');");
		
		String result = (String) selenium.getJsConsole().executeScript("return $('#text1').css('background-color') +'';");										
		assertEquals("Check background-color of text1 subWidget", "rgba(0, 0, 0, 0)", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#text2').css('background-color') +'';");										
		assertEquals("Check background-color of text2 subWidget", "rgb(0, 128, 0)", result);
	}
	
	@Test
	public void test_addIndexedMethods_defaultIndex() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').subStyle('background-color', 'green');");
		String result = (String) selenium.getJsConsole().executeScript("return $('#text1').css('background-color') +'';");										
		assertEquals("Check background-color of text1 subWidget", "rgb(0, 128, 0)", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#text2').css('background-color') +'';");										
		assertEquals("Check background-color of text2 subWidget", "rgba(0, 0, 0, 0)", result);
	}
	
	@Test
	public void test_attachWidget() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').attachWidget($$('text3'));");
		String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').lastWidget().id +'';");				
		assertEquals("Get last attached subWidget", "text3", result);		
	}
	
	@Test
	public void test_countWidgets() throws InterruptedException {
		String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').countWidgets() +'';");		
		assertEquals("Count number of subwidgets", "4", result);
	}
	
	@Test
	public void test_detachAllWidgets() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').detachAllWidgets();");
		String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').countWidgets() +'';");		
		assertEquals("Check if all widgets are detached from container", "0", result);
	}
	
	@Test
	public void test_detachAllWidgets_thenAttach() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').detachAllWidgets();");
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').attachWidget($$('text1'));");
		String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').indexOfWidget($$('text1')) +'';");				
		assertEquals("Check if detach subwidget has been re-attached", "0", result);
	}

	@Test
	public void test_detachAndDestroyAllWidgets() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').detachAndDestroyAllWidgets();");
		try{
			selenium.getJsConsole().executeScript("$$('behaviorContainer1').attachWidget($$('text1'));");
		}catch(Exception e){
			String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').indexOfWidget($$('text1')) +'';");				
			assertEquals("Check if destroy subwidget has not been reattached", "-1", result);
		}
	}
	
	@Test
	public void test_detachWidget_oldWidget() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').detachWidget(1);");
		String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').countWidgets() +'';");				
		assertEquals("Detach a customWidget from container and counts remaning subWidgets", "3", result);
	}
	
	@Test
	public void test_detachWidget_newWidget() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').detachWidget(3);");
		String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').countWidgets() +'';");				
		assertEquals("Check if all widgets are removed from container", "3", result);
	}
	
	@Test
	public void test_indexOfWidget_newWidget() throws InterruptedException {
		String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').indexOfWidget($$('text1')) +'';");										
		assertEquals("Check (new) subWidget index", "2", result);
	}
	
	@Test
	public void test_insertWidget() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').insertWidget(0, $$('text3'));");
		String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').widget(0).id +'';");										
		assertEquals("Check subWidget order", "text3", result);		
	}

	@Test
	public void test_invoke() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').invoke('style', 'background-color', 'red');");
		String result = (String) selenium.getJsConsole().executeScript("return $('#text1').css('background-color') +'';");										
		assertEquals("Check background-color of text1 subWidget", "rgb(255, 0, 0)", result);
		result = (String) selenium.getJsConsole().executeScript("return $('#text2').css('background-color') +'';");										
		assertEquals("Check background-color of text2 subWidget", "rgb(255, 0, 0)", result);
	}
	@Test
	public void test_lastWidget() throws InterruptedException {
		String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').lastWidget().id +'';");				
		assertEquals("Get last attached subWidget", "text2", result);		
	}
	
	@Test
	public void test_lastWidget_afterDetachWidget() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').detachWidget(0);");
		String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').lastWidget().id +'';");						
		assertEquals("Get last attached subWidget after detachWidget()", "text2", result);		
	}
	
	@Test
	public void test_lastWidget_afterMoveWidget() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').moveWidget(0,6);");
		String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').lastWidget().id +'';");						
		assertEquals("Get last attached subWidget after moveWidget(). There should be no change.", "text2", result);		
	}
	
	@Test
	public void test_moveWidget() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').moveWidget(0,6);");
		String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').widget(0).id +'';");										
		assertEquals("Check subWidget order", "button2", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').widget(1).id +'';");										
		assertEquals("Check subWidget order", "text1", result);		
	}
	
	@Test
	public void test_widget() throws InterruptedException {
		String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').widget(0).id +'';");										
		assertEquals("Check subWidget order", "button1", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').widget(1).id +'';");										
		assertEquals("Check subWidget order", "button2", result);
		result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').widget(2).id +'';");										
		assertEquals("Check subWidget order", "text1", result);
		result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').widget(3).id +'';");										
		assertEquals("Check subWidget order", "text2", result);
	}
	
	@Test
	public void test_widgets() throws InterruptedException {
		String result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').widgets()[0].id +'';");										
		assertEquals("Check subWidget order", "button1", result);		
		result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').widgets()[1].id +'';");										
		assertEquals("Check subWidget order", "button2", result);
		result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').widgets()[2].id +'';");										
		assertEquals("Check subWidget order", "text1", result);
		result = (String) selenium.getJsConsole().executeScript("return $$('behaviorContainer1').widgets()[3].id +'';");										
		assertEquals("Check subWidget order", "text2", result);	
	}
	
	@Test
	public void test_onInsertWidget_afterAttachWidget() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').attachWidget($$('text3'));");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textLog').getValue() +'';");										
		assertEquals("Check if onInsertWidget event is throw", "insertWidget", result);		
	}
	
	@Test
	public void test_onInsertWidget_afterInsertWidget() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').insertWidget(0, $$('text3'));");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textLog').getValue() +'';");										
		assertEquals("Check if onInsertWidget event is throw", "insertWidget", result);		
	}
	
	@Test
	public void test_onInsertWidget_alreadyAttachedWidget() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').attachWidget($$('text1'));");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textLog').getValue() +'';");										
		assertEquals("Check if onInsertWidget event is throw", "detachWidgetinsertWidget", result);		
	}
	
	@Test
	public void test_onDetachWidget_afterDetachWidget() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').detachWidget(1);");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textLog').getValue() +'';");										
		assertEquals("Check if onDetachWidget event is throw", "detachWidget", result);		
	}
	
	@Test
	public void test_onMoveWidget_afterMoveWidget() throws InterruptedException {
		selenium.getJsConsole().executeScript("$$('behaviorContainer1').moveWidget(0,6);");
		String result = (String) selenium.getJsConsole().executeScript("return $$('textLog').getValue() +'';");										
		assertEquals("Check if onMoveWidget event is throw", "moveWidget", result);		
	}
	
}
