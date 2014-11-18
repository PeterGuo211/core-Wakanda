package org.wakanda.debuggerchrome.savevideo;

public class CaptureThrad extends Thread implements Runnable{
	
	public String saveIn = "D:\\DebuggerTests\\vidddd.flv";
	public int  duration = 20;
	 public static boolean ContinueCapturing = true;
	
	public CaptureThrad(String saveIn, int duration){
	    this.saveIn = saveIn;
	    this.duration = duration;
	  }
	
	public void run()
	{
		SimpleCapture.doIT(saveIn, duration);
	}
	

}
