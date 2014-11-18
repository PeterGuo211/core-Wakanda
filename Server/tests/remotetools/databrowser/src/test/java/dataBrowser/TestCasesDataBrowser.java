package dataBrowser;

import static org.junit.Assert.*;
import java.io.IOException;
import java.net.URISyntaxException;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.wakanda.common.server.AdminCommand;
import org.wakanda.templates.runtime.SeleniumRuntimeTemplate;


public class TestCasesDataBrowser extends SeleniumRuntimeTemplate {

	@BeforeClass
	public static void beforeRunning() throws URISyntaxException, IOException {
		
		  selenium.waitImplicitly(5);
		  AdminCommand.startServer(TestCasesDataBrowser.class, "/solutions/dataBrowser/dataBrowser Solution/dataBrowser.waSolution");

	}	
	
	@Test 
	public void remoteTools_dataBrowser_testLeftColumnDataStoreClass_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);

		long end = System.currentTimeMillis() + 5000;
		while (System.currentTimeMillis() < end) {
			Thread.sleep(100);
			try{
		selenium.getDriver().findElement(By.xpath("//*[@id='dataClassContent']"));
		assertEquals("Right Column is : ", "true", "true");
			}catch(Exception e){}
        //False
		}
		
		String result = selenium.getDriver().findElement(By.xpath("//*[@id='dataClassContentTable']/thead/tr/th")).getText(); 
		
		assertEquals("Solution Name is disabled : ", "Datastore Classes", result);
		
	}
	
	@Test
	public void remoteTools_dataBrowser_testDataClassName_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		String[] DataClassNameArray = {"Compagny","Persons"};
		
		for(int x = 1; x < DataClassNameArray.length ; x++){
	        
			String xpathName = "//*[@id='outline_"+ DataClassNameArray[x] +"']/td/div/div[2]";

			Thread.sleep(500);
			String resultAtt = selenium.getDriver().findElement(By.xpath(xpathName)).getAttribute("innerHTML");
			
			assertEquals("DataclassName is : ", DataClassNameArray[x], resultAtt);
			
	    }
		
	}
	
	@Test 
	public void remoteTools_dataBrowser_testButtonClose_All_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		String ButtonClose = selenium.getDriver().findElement(By.id("label1")).getText(); 
		
		assertEquals("Button Close is : ", "Close All", ButtonClose);
		
	} 
	
	@Test 
	public void remoteTools_dataBrowser_testButtonClose_All_action() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();
		Thread.sleep(1000);
		selenium.getDriver().findElement(By.id("dataBrowserCloseAll")).click();
		
		Long TabElement = (Long) selenium.getJsConsole().executeScript("return $('ul#menuBarTabView li').length");
		Long TabTrueElement = (long) 1; 
		
		assertEquals("Number of tab is : ", TabTrueElement, TabElement);
		
	} 
	
	@Test 
	public void remoteTools_dataBrowser_testButtonExport_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		String Export = selenium.getDriver().findElement(By.id("label2")).getText(); 
		
		assertEquals("Export is : ", "Export", Export);
		
	} 
	
	@Test 
	public void remoteTools_dataBrowser_testButtonExport_action() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.id("dataBrowserExportDataClass")).click();
		
		String result = selenium.getDriver().findElement(By.id("ui-dialog-title-confirmExportDialog")).getText(); 
		
		assertEquals("Export action is : ","Export dataclass",result);
	
	} 
	
	@Test 
	public void remoteTools_dataBrowser_testTabDataClass_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		
		String[] DataClassNameArray = {"Compagny","Persons"};
		
		for(int x = 1; x < DataClassNameArray.length ; x++) {
	        
			selenium.getDriver().findElement(By.xpath("//*[@id='outline_"+ DataClassNameArray[x] +"']/td/div/div[2]")).click(); ;
			
	    }
		
		Long TabElement = (Long) selenium.getJsConsole().executeScript("return $('ul#menuBarTabView li').length");
		
		Long TabTrueElement = (long) 2;
		
		assertEquals("Number of tab is : ",TabTrueElement, TabElement);
		
	}
	
	
	@Test 
	public void remoteTools_dataBrowser_testQuery_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[3]/div/form/label")).getText();
		
		assertEquals("Query input is : ","Query", result);
		
	}
	
		
	@Test 
	public void remoteTools_dataBrowser_testGridForEachDataClass_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();
		Thread.sleep(1000);
		
		String[] AttributeNamePersonsArray = {"ID","firstName", "SecondName", "BirthDate"};
		String[] AttributeNameCompagnyArray = {"ID"};
		
		for(int x = 1; x < AttributeNameCompagnyArray.length ; x++) {
			
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']div[3]/div/div[1]/div/div["+x+"]")).getText();
		
			assertEquals("The column in the grid is : ", AttributeNameCompagnyArray[x-1], result);
		
		}
	

		for(int x = 1; x < AttributeNamePersonsArray.length ; x++) {
			
			
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[1]/div/div["+x+"]/div[1]")).getText();
			
			assertEquals("The column in the grid is : ", AttributeNamePersonsArray[x-1], result);
			
		}
		
	}
	
	@Test 
	public void remoteTools_dataBrowser_testDataLoadedForEachGrid() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();
		Thread.sleep(1000);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div/form/input")).sendKeys("ID < 1");
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div/form/button[1]")).click();
		
		String[] EntitiesPersonsArray = {"0", "Marc", "Thomas", "02/09/1988"};
		
		for(int x = 1; x < EntitiesPersonsArray.length ;x++) {
			
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[1]/div/div["+x+"]/div")).getText();

			assertEquals("The data in the grid is : ", EntitiesPersonsArray[x-1], result);
		
		}
		
		
	}
	
	@Test 
	public void remoteTools_dataBrowser_testAddNewEntitie_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
	
		String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[3]/div[2]/div/div[3]/div[1]/ul/li[1]")).getAttribute("title");
		
		assertEquals("Add Button is : ", "Add", result);
		
	}
	
	
	
	@Test 
	public void remoteTools_dataBrowser_testAddNewEntitie_action() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[2]")).click();
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[3]/div[1]/ul/li[1]/div")).click();

		String[] NewEntitiesArray = {"2", "Arnaud", "Tob" , "12/09/1987"};
			int y = 0;
			
		for(int x = 1; x < NewEntitiesArray.length; x++ ) {

			Thread.sleep(3000);
			selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[2]/div/div["+x+"]/div[2]/div/input")).sendKeys(NewEntitiesArray[y]);
			
				y++;
		
		}
		
		//selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[5]")).click();
		//Thread.sleep(500);	
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[5]/div")).click();
		Thread.sleep(5000);
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();
			int z = 0;
		
		for(int x = 1; x < NewEntitiesArray.length; x++ ) {
			
			
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[3]/div/div["+x+"]/div")).getText();

			assertEquals("The New data in the grid is : ", NewEntitiesArray[z], result);
			
			z++;
		}
		
		
	}
	
	
	
	@Test 
	public void remoteTools_dataBrowser_testRemoveEntitie_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
	
		String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[3]/div[2]/div/div[3]/div[1]/ul/li[2]")).getAttribute("title");
		
		assertEquals("Delete Button is : ", "Delete", result);
		
		
	}
	
	@Test 
	public void remoteTools_dataBrowser_testRemoveEntitie_action() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
	
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[3]")).click();
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[3]/div[1]/ul/li[2]/div")).click();
		
		String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[3]/div[2]")).getText(); 
		
		assertEquals("Items has been removed : ", "2 item(s)", result);
		
	}
	

	
	@Test 
	public void remoteTools_dataBrowser_testAutoFormForEachDataClass_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();

		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[1]")).click();
		Thread.sleep(500);
		
		String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[1]/div[2]")).getText(); 
		
		assertEquals("AutoForm for the class "+ result +" is : ", "Persons", result);	
		
	}
	
	@Test 
	public void remoteTools_dataBrowser_testAutoFormForEachEntitie_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();

		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[1]")).click();
		Thread.sleep(500);
		
		String[] CurrentEntitiesArrayExist = {"0", "Marc", "Thomas", "02/09/1988"};
		int z = 0;
		
		for(int x =1; x < CurrentEntitiesArrayExist.length; x++ ) {
			
			
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[2]/div/div["+x+"]/div[2]/div/input")).getAttribute("value");

			assertEquals("The current data for the entites selected is : ", CurrentEntitiesArrayExist[z], result);
			
			z++;
		}
		
		
	}
	

	
	@Test 
	public void remoteTools_dataBrowser_testAutoForMoveBetweenEntities_previous_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();

		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[1]")).click();
		Thread.sleep(500);
		
		String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[1]")).getAttribute("title");
		
		assertEquals("Previous Button is : ", "Previous", result);
		
	}
	

	 
	 
	@Test 
	public void remoteTools_dataBrowser_testAutoForMoveBetweenEntities_previous_action() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();

		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[2]")).click();
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[1]")).click();
		
		String[] PreviousEntitiesArrayExist = {"0", "Marc", "Thomas", "02/09/1988"};
		int z = 0;
		
		for(int x =1; x < PreviousEntitiesArrayExist.length; x++ ) {
			
			
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[2]/div/div["+x+"]/div[2]/div/input")).getAttribute("value");

			assertEquals("The Previous data for the entites selected is : ", PreviousEntitiesArrayExist[z], result);
			
			z++;
		}
		
		
		
	}
	
	@Test 
	public void remoteTools_dataBrowser_testAutoForMoveBetweenEntities_next_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();

		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[1]")).click();
		Thread.sleep(500);
		
		String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[2]")).getAttribute("title");
													
		assertEquals("Next Button is : ", "Next", result);
		
	}
	
	@Test 
	public void remoteTools_dataBrowser_testAutoForMoveBetweenEntities_next_action() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();

		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[1]")).click();
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[2]")).click();
		
		String[] PreviousEntitiesArrayExist = {"1", "Thomas", "andrews", "04/05/1985"};
		int z = 0;
		
		for(int x =1; x < PreviousEntitiesArrayExist.length; x++ ) {
			
			
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[2]/div/div["+x+"]/div[2]/div/input")).getAttribute("value");

			assertEquals("The Next data for the entites selected is : ", PreviousEntitiesArrayExist[z], result);
			
			z++;
		}
		
	}
	
	
	@Test 
	public void remoteTools_dataBrowser_testAutoForEntities_add_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();

		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[1]")).click();
		Thread.sleep(500);
		
		String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[3]")).getAttribute("title");
		
		assertEquals("Add Button is : ", "Add", result);
		
	}
	
	
	
	@Test 
	public void remoteTools_dataBrowser_testAutoForEntities_add_action() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();

		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[1]")).click();
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[3]")).click();
		
		String[] NewEntitiesAutoFormArray = {"2", "Arnaud", "Tob", "12/09/1987"};
		int y = 0;
		
		for(int x = 1; x < NewEntitiesAutoFormArray.length; x++ ) {
			
			Thread.sleep(1000);
			selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[2]/div/div["+x+"]/div[2]/div/input")).sendKeys(NewEntitiesAutoFormArray[y]);
		
			y++;
		}
	
		//selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[5]")).click();
		//Thread.sleep(500);	
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[5]/div")).click();
		Thread.sleep(5000);
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();
			int z = 0;
		
		for(int x =1; x < NewEntitiesAutoFormArray.length; x++ ) {
			
			
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[3]/div/div["+x+"]/div")).getText();

			assertEquals("(From the autoForm), The New data in the grid is : ", NewEntitiesAutoFormArray[z], result);
			
			z++;
		}
		
	}
	

	
	@Test 
	public void remoteTools_dataBrowser_testAutoForEntities_find_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();

		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[1]")).click();
		Thread.sleep(500);
		
		String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[4]")).getAttribute("title");
		
		assertEquals("Find Button is : ", "Find", result);
		
	}
	
	
	
	@Test 
	public void remoteTools_dataBrowser_testAutoForEntities_find_action() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();

		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[2]")).click();
		Thread.sleep(500);
		
		String[] FindEntitiesAutoFormArray = {"1", "Thomas", "andrews", "04/05/1985"};
		int z = 0;
	
		for(int x =1; x < FindEntitiesAutoFormArray.length; x++ ) {
		
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[2]/div/div["+x+"]/div")).getText();

			assertEquals("Find data in the grid is : ", FindEntitiesAutoFormArray[z], result);
		
			z++;
		}
		
	}

	@Test 
	public void remoteTools_dataBrowser_testAutoForMoveBetweenEntities_remove_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();

		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[1]")).click();
		Thread.sleep(500);
		
		String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[6]")).getAttribute("title");
		
		assertEquals("Save Button is : ", "Delete", result);
		
	}
	
	@Test 
	public void remoteTools_dataBrowser_testAutoForMoveBetweenEntities_remove_action() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
	
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[3]")).click();
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[6]")).click();
		
		String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[3]/div[2]")).getText(); 
		
		assertEquals("Items has been removed : ", "2 item(s)", result);
		
	}

	@Test 
	public void remoteTools_dataBrowser_testAutoForEntities_save_exist() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();

		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[1]")).click();
		Thread.sleep(500);
	
		String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[5]")).getAttribute("title");
		
		assertEquals("Save Button is : ", "Save", result);
		
	}
	
	@Test 
	public void remoteTools_dataBrowser_testAutoForMoveBetweenEntities_save_action() throws InterruptedException {
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();

		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[1]")).click();
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[3]")).click();
		
		String[] NewEntitiesSavedAutoFormArray = {"2", "Arnaud", "Tob" , "12/09/1987"};
		int y = 0;
		
		for(int x = 1; x < NewEntitiesSavedAutoFormArray.length; x++ ) {

			selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[2]/div/div["+x+"]/div[2]/div/input")).sendKeys(NewEntitiesSavedAutoFormArray[y]);
		
			y++;
		}
	
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[5]")).click();
		
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();
			int z = 0;
		
		for(int x =1; x < NewEntitiesSavedAutoFormArray.length; x++ ) {
			
			
			String result = selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[3]/div/div["+x+"]/div")).getText();

			assertEquals("The New data saved in the grid is : ", NewEntitiesSavedAutoFormArray[z], result);
			
			z++;
		}
	
		selenium.getDriver().get("http://127.0.0.1:8081/walib/dataBrowser/index.html");
		Thread.sleep(500);
	
		selenium.getDriver().findElement(By.xpath("//*[@id='outline_Persons']")).click();
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div/div[2]/div/div[3]")).click();
		Thread.sleep(500);
		
		selenium.getDriver().findElement(By.xpath("//*[@id='databrowser_tabview']/div[4]/div[2]/div[2]/div/div[3]/div/div[1]/ul/li[6]")).click();
		
	}
		
	
}
