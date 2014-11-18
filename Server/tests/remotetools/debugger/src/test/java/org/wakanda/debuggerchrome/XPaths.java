package org.wakanda.debuggerchrome;

public class XPaths {

	//public static String ContinueURL =""
	 public static int i=0;
	 public static String ClassNameOfExecutionLine = "webkit-line-content webkit-execution-line";
	 public static String CodeLine = "//*[@id='scripts-editor-container-tabbed-pane']/div[2]/div/div/div[1]/div/div";
	 public static String AddInWatcherButton =  "//*[@id='scripts-debug-sidebar-contents']/div[1]/div/button[2]";
	 public static String InputWatch = "//*[@id='scripts-debug-sidebar-contents']/div[2]/div/div/ol/li/span[1]/span";
	 public static String ListWatchExpressions = "//*[@id='scripts-debug-sidebar-contents']/div[2]/div/div/ol";
	 
	 public static String ButtonContinue = "//*[@id='scripts-debug-toolbar']/button[1]";
	 public static String ButtonStepInto = "//*[@id='scripts-debug-toolbar']/button[3]";
	 public static String ButtonStepOver = "//*[@id='scripts-debug-toolbar']/button[2]";
	 public static String ButtonStepOut = "//*[@id='scripts-debug-toolbar']/button[4]";
	 public static String DisplayConsole = "//*[@id='main-status-bar']/button[2]";
	 public static String ContentOfTheCurrentContext = "//*[@id='scripts-editor-container-tabbed-pane']/div[2]/div/div/div[1]/div";
	 
	 public static String GetCodeLine(int number)
	 {
		 return CodeLine+"["+number+"]";
	 }
	
}
