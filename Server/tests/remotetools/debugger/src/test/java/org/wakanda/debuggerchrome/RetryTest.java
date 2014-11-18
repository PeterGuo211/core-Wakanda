package org.wakanda.debuggerchrome;


import java.util.Date;
import org.junit.rules.TestRule;
import org.junit.runner.Description;
import org.junit.runners.model.Statement;

public class RetryTest implements TestRule {
	private int retryCount;

	public RetryTest(int retryCount) {
		this.retryCount = retryCount;
	}

	public Statement apply(Statement base, Description description) {
		return statement(base, description);
	}

	private Statement statement(final Statement base,
			final Description description) {
		return new Statement() {
			@Override
			public void evaluate() throws Throwable {
				Throwable caughtThrowable = null;

				TemplateChromeDebuggerTests.stopTime = new Date().getTime();
				for (int i = 0; i < retryCount; i++) {
					try {
						base.evaluate();
						return;
					} catch (Throwable t) {
						caughtThrowable = t;
						System.err.println(description.getDisplayName()
								+ ": run " + (i + 1) + " failed");

						// destroyCaptureProcess();

						// System.err.println("Starting the capture of the video\n"+"Errors/"
						// + description.getMethodName() + ".flv");
						//
						// new
						// CaptureThrad("D:\\DebuggerTests\\"+description.getMethodName()+".flv",20).start();
						//TemplateChromeDebuggerTests.KillServerAndRriver(); a voir
						
//						try{
//						if(i==0 && (TemplateChromeDebuggerTests.CaptureMode==true))
//						{
////						String FolderError="Errors";
////						new File(FolderError).mkdir();
//						new File("Errors").mkdir();
//						TemplateChromeDebuggerTests.MyCapture  =  new CaptureThrad("Errors/"+description.getMethodName()+".flv",20);
//						//TemplateChromeDebuggerTests.MyCapture  =  new CaptureThrad("D:\\videos\\"+description.getMethodName()+".flv",20);
//						TemplateChromeDebuggerTests.MyCapture.setPriority(Thread.MAX_PRIORITY);
//						TemplateChromeDebuggerTests.MyCapture.start();
//						}
//						}catch (Exception e) {
//						   CaptureThrad.ContinueCapturing = false;						   
//						}
						

					}
				}
				System.err.println(description.getDisplayName()
						+ ": giving up after " + retryCount + " failures");
				throw caughtThrowable;
			}
		};
	}

//	public static void destroyCaptureProcess() {
//		try {
//			if (TemplateChromeDebuggerTests.MyCapture != null) {
//				TemplateChromeDebuggerTests.MyCapture.stop();
//				//TemplateChromeDebuggerTests.MyCapture = null;
//			}
//		} catch (Exception e) {
//			System.out.println("warn : canot kill the thread that capture the video");
//		}
//	}

}
