package org.wakanda.debuggerchrome;

import static org.wakanda.common.Common.getOS;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

import org.apache.commons.exec.OS;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.log4j.Logger;
import org.wakanda.common.Paths;

public class Utils {

	static int timeout = 5000;
	protected static Logger logger = Logger.getLogger(Utils.class);

	public static void killServer() {
		// while(isServerRunning())
		// killApplication("Wakanda Server", "Wakanda Server", "Wakanda");
		String command;
		try {

			if (OS.isFamilyWindows()) {

				Process getPID = Runtime
						.getRuntime()
						.exec("cmd /c for /f \"usebackq tokens=5\" %i in (`\"netstat -aon | findstr \"0.0:8080\"\"`) do @wmic PROCESS get ProcessId | findstr \"%i\"");
				String result = IOUtils.toString(getPID.getInputStream());
				command = "taskkill /F /im " + result;
			} else {
				command = "lsof -P | grep -E ':8080'| grep -E 'Wakanda'  | awk '{print $2}'| xargs kill -9";

			}

			Utils.executeCommand(command);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.out.println("cannot kill server");

		}
		System.out.println("Kill Wakanda Studio");
	}

	public static void executeCommand(String command) {
		// String command;
		String[] shellCommand;

		String shell;

		if (!OS.isFamilyWindows()) {
			// Mac
			shell = System.getenv("SHELL");
			// command = "rm -R '"+folder+"'";
			shellCommand = new String[] { shell, "-c", command };

		} else {
			// Win
			shell = "CMD";
			// command = "taskkill /im \"" + folder;
			shellCommand = new String[] { "CMD", "/C", command };
		}
		try {
			// p = Runtime.getRuntime().exec(shellCommand);
			executeCommandLine(shellCommand, timeout);
			System.out.println("Wakanda Server has been killed succesfully!");

		} catch (Exception e) {
			System.out.println(e.getMessage());
			System.out
					.println("Wakanda Server had not been killed succesfully!");
		}
	}

	public static Process runTheServer(String solutionPath) {
		Process serverProcess = null;
		long timeOut = 10; // secondes
		String[] command = getCommandThatLaunchesServer(solutionPath);
		try {
			serverProcess = Runtime.getRuntime().exec(command);
			for (int i = 0; i < timeOut; i++) {
				boolean response = isServerResponding();
				if (response == true) {
					logger.info("Server is running");
					return serverProcess;
				}
				Thread.sleep(1000);
				logger.info("Waiting for Server : " + i + " seconds");
			}
			logger.info("Server is not responding. Time Out.");
		} catch (Exception e) {
			logger.info("Server stack : \n" + e.getStackTrace());
		}
		return null;
	}

	private static String[] getCommandThatLaunchesServer(String solutionPath) {
		String command;
		String[] shellCommand;
		String serverPath = org.wakanda.common.Paths.serverPath;
		String os = getOS();
		String shell;
		solutionPath = solutionPath == null ? ""
				: (" \"" + solutionPath + "\"");

		if (os.contains("mac")) {
			// Mac
			shell = System.getenv("SHELL");
			command = serverPath + solutionPath + " > /dev/null 2>&1 &";
			shellCommand = new String[] { shell, "-c", command };
		} else if (os.contains("Linux")) {
			// Linux
			shell = System.getenv("SHELL");
			command = serverPath + solutionPath + " > /dev/null 2>&1 &";
			shellCommand = new String[] { shell, "-c", command };
		} else {
			// Win
			shell = "CMD";
			command = "START /B CALL \"" + serverPath + "\"" + solutionPath
					+ " > NUL 2>&1";
			shellCommand = new String[] { "CMD", "/C", command };
		}
		logger.info(command);
		return shellCommand;
	}

	public static boolean isServerResponding() {
		boolean isServerResponding = false;
		try {
			HttpClient httpclient = new DefaultHttpClient();
			HttpHost host = new HttpHost("127.0.0.1", 8080);
			HttpResponse response = httpclient.execute(host, new HttpGet(
					"/index.html"));
			boolean is200Ok = response.getStatusLine().getStatusCode() == HttpStatus.SC_OK;
			boolean isWakanda = response.getFirstHeader(HttpHeaders.SERVER)
					.getValue().contains("Wakanda");
			isServerResponding = is200Ok && isWakanda;
		} catch (Exception e) {
			isServerResponding = false;
		}
		return isServerResponding;
	}

	// ////////////////////////////////////////
	public static int executeCommandLine(final String[] commandLine,
			final long timeout) throws IOException, InterruptedException,
			TimeoutException {
		Runtime runtime = Runtime.getRuntime();
		Process process = runtime.exec(commandLine);
		/* Set up process I/O. */

		Worker worker = new Worker(process);
		worker.start();
		try {
			worker.join(timeout);
			if (worker.exit != null)
				return worker.exit;
			else
				throw new TimeoutException();
		} catch (InterruptedException ex) {
			worker.interrupt();
			Thread.currentThread().interrupt();
			throw ex;
		} finally {
			process.destroy();
		}
	}

	private static class Worker extends Thread {
		private final Process process;
		private Integer exit;

		private Worker(Process process) {
			this.process = process;
		}

		public void run() {
			try {
				exit = process.waitFor();
			} catch (InterruptedException ignore) {
				return;
			}
		}
	}
}
