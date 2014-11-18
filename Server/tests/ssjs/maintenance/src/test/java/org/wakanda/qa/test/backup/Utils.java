package org.wakanda.qa.test.backup;

import org.wakanda.qa.test.backup.TemplateTestClass;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.util.Date;

import org.apache.commons.lang3.SystemUtils;
import org.wakanda.qa.commons.server.Util;
import org.wakanda.qa.test.backup.Utils;
import org.wakanda.qa.test.backup.settings.Configuration;

public class Utils {

	public static BufferedReader getBuff(String path) throws IOException {
		String os = TemplateTestClass.getOS();
		BufferedReader in = null;
		if (os.toLowerCase().contains("mac")
				|| os.toLowerCase().contains("linux")) {
			String myPath = path.substring(0, path.length() - 7);
			in = new BufferedReader(new InputStreamReader(new FileInputStream(
					myPath + "/myFile.txt")));
		} else {
			String myPath = path.substring(0, path.length() - 7);
			in = new BufferedReader(new InputStreamReader(new FileInputStream(
					myPath + "\\myFile.txt")));
		}
		return in;
	}

	public static String getLigne(String path,int n) throws IOException {
		// On lit ce qui est enregistr» dans le fichier temporaire
		BufferedReader in = getBuff(path);
		String result = "";
		for(int i = 0 ; i<n;i++)
			result = in.readLine();
		in.close();
		return result;
	}
	
	public static String getProperty_Type(String path) throws IOException {
		// On lit ce qui est enregistr» dans le fichier temporaire
		BufferedReader in = getBuff(path);
		return getValue(in, "type", 1, 3);
	}

	public static String getProperty_Name(String path) throws IOException {
		// On lit ce qui est enregistr» dans le fichier temporaire
		BufferedReader in = getBuff(path);
		return getValue(in, "name", 2, 3);
	}

	public static String getProperty_nameNoExt(String path) throws IOException {
		// On lit ce qui est enregistr» dans le fichier temporaire
		BufferedReader in = getBuff(path);
		return getValue(in, "nameNoExt", 3, 3);
	}

	public static String getProperty_extension(String path) throws IOException {
		// On lit ce qui est enregistr» dans le fichier temporaire
		BufferedReader in = getBuff(path);
		return getValue(in, "extension", 4, 3);
	}

	public static String getProperty_path(String path) throws IOException {
		// On lit ce qui est enregistr» dans le fichier temporaire
		BufferedReader in = getBuff(path);
		return getValue(in, "path", 5, 3);
	}

	public static String getProperty_exists(String path) throws IOException {
		// On lit ce qui est enregistr» dans le fichier temporaire
		BufferedReader in = getBuff(path);
		return getValue(in, "exists", 6, 2);
	}

	public static String getProperty_visible(String path) throws IOException {
		// On lit ce qui est enregistr» dans le fichier temporaire
		BufferedReader in = getBuff(path);
		return getValue(in, "visible", 7, 2);
	}

	public static String getProperty_readOnly(String path) throws IOException {
		// On lit ce qui est enregistr» dans le fichier temporaire
		BufferedReader in = getBuff(path);
		return getValue(in, "readOnly", 8, 2);
	}

	public static String getProperty_creationDate(String path)
			throws IOException {
		// On lit ce qui est enregistr» dans le fichier temporaire
		BufferedReader in = getBuff(path);
		return getValue(in, "creationDate", 9, 3);
	}

	public static String getProperty_lastModifiedDate(String path)
			throws IOException {
		// On lit ce qui est enregistr» dans le fichier temporaire
		BufferedReader in = getBuff(path);
		return getValue(in, "lastModifiedDate", 10, 3);
	}

	private static String getValue(BufferedReader in, String name, int m, int n)
			throws IOException {
		String firstLine = in.readLine();
		if (firstLine == null) {
			in.close();
			return "empty";
		}
		if (firstLine.equals("null")) {
			in.close();
			return "null";
		} else {
			String myLine = "";
			for (int i = 0; i < m; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals(name)) {
				in.close();
				return "not found";
			}
			in.close();
			return myLine.split("\"")[n];
		}
	}

	public static void Vider(String myPath) throws IOException {
		String os = TemplateTestClass.getOS();
		if (os.toLowerCase().contains("mac")
				|| os.toLowerCase().contains("linux")) {
			new FileWriter(new File(getTargetPath(myPath) + "/myFile.txt"))
					.close();
		} else {
			new FileWriter(new File(getTargetPath(myPath) + "\\myFile.txt"))
					.close();
		}

	}

	public static String getTargetPath(String solutionPath) {
		String os = TemplateTestClass.getOS();
		String myPath = "";
		if (os.toLowerCase().contains("mac")
				|| os.toLowerCase().contains("linux")) {
			String[] split = solutionPath.split("/");
			for (int i = 0; i < split.length - 2; i++)
				myPath += split[i] + "/";
			myPath += split[split.length - 3];
		} else {
			String[] split = solutionPath.split("\\\\");
			for (int i = 0; i < split.length - 2; i++)
				myPath += split[i] + "/";
			myPath += split[split.length - 3];
		}
		return myPath;
	}

	public static String getPathValue(String solutionPath, String backup)
			throws IOException {
		String os = TemplateTestClass.getOS();
		String myPath = "";
		String[] split = null;
		if (os.toLowerCase().contains("mac")
				|| os.toLowerCase().contains("linux")) {
			split = solutionPath.split("/");
		} else {
			split = solutionPath.split("\\\\");
		}
			for (int i = 0; i < split.length - 2; i++)
				myPath += split[i] + "/";
			myPath += split[split.length - 3]
					+ "/"
					+ backup
					+ "/backup_"
					+ Utils.getProperty_creationDate(
							Utils.getBackupFolder("backup1")).substring(0, 10)
					+ "_"
					+ Utils.getProperty_creationDate(
							Utils.getBackupFolder("backup1")).substring(11, 19)
							.replace(':', '-') + "/backupManifest.json";
		return myPath;
	}
	
	public static String getCalculatedPath(String solutionPath, String backup, String date)
			throws IOException {
		String os = TemplateTestClass.getOS();
		String myPath = "";
		String[] split = null;
		if (os.toLowerCase().contains("mac")
				|| os.toLowerCase().contains("linux")) {
			split = solutionPath.split("/");
		} else {
			split = solutionPath.split("\\\\");
		}
			for (int i = 0; i < split.length - 2; i++)
				myPath += split[i] + "/";
			myPath += split[split.length - 3]
					+ "/"
					+ backup
					+ "/backup_"
					+ date.substring(0, 10)
					+ "_"
					+ date.substring(11, 19)
							.replace(':', '-') + "/backupManifest.json";
		return myPath;
	}
	
	public static String getDataFolderPath(String calculatedPath)
			throws IOException {
		String os = TemplateTestClass.getOS();
		String myPath = "";
		if (os.toLowerCase().contains("mac")
				|| os.toLowerCase().contains("linux")) {
//			TO BE implemented
		} else {
//			TO BE implemented
		}
		myPath = calculatedPath.substring(0, calculatedPath.length()-20);
		myPath += "/DataFolder/";
		return myPath;
	}

	public static Date parseDate(String propertyValue) {
		int year = Integer.parseInt(propertyValue.substring(0, 4));
		int month = Integer.parseInt(propertyValue.substring(5, 7));
		int day = Integer.parseInt(propertyValue.substring(8, 10));
		int hours = Integer.parseInt(propertyValue.substring(11, 13));
		int minutes = Integer.parseInt(propertyValue.substring(14, 16));
		int seconds = Integer.parseInt(propertyValue.substring(17, 19));
		Date returnedDate = new Date(year - 1900, month - 1, day, hours,
				minutes, seconds);
		return returnedDate;
	}

	public static File getBackupFolder(String backupPath, String backup) {
		File backupFolder = new File(backupPath.substring(0,
				backupPath.length() - 7)
				+ backup);
		return backupFolder;
	}

	public static String getBackupFolder(String backup) {
		try {
			String relative = Util.getPropertiesConfiguration(
					Configuration.class, "settings.properties").getString(
					backup);
			URL url = Configuration.class.getResource(relative);
			String absPath = new File(url.toURI()).getCanonicalPath();
			return absPath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String getSolutionPath(String solution) {
		try {
			String relative = Util.getPropertiesConfiguration(
					Configuration.class, "settings.properties").getString(
					solution);
			URL url = Configuration.class.getResource(relative);
			String absPath = new File(url.toURI()).getCanonicalPath();
			return absPath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public static void executeCommand(String command) {
		// String command;
		String[] shellCommand;
		String os = TemplateTestClass.getOS();
		String shell;
		if (os.contains("mac")) {
			// Mac
			shell = System.getenv("SHELL");
			// command = "rm -R '"+folder+"'";
			shellCommand = new String[] { shell, "-c", command };
		} else if (os.contains("Linux")) {
			// Linux
			shell = System.getenv("SHELL");
			// command = "killall -9 " + folder;
			shellCommand = new String[] { shell, "-c", command };
		} else {
			// Win
			shell = "CMD";
			// command = "taskkill /im \"" + folder;
			shellCommand = new String[] { "CMD", "/C", command };
		}
		try {
			Process p = Runtime.getRuntime().exec(shellCommand);
			p.waitFor();
		} catch (Exception e) {
		}
	}

	// Fonction qui d»sactive le bootstrap
	static void ChangeBootstrap(String solutionPath, String newBootstrap)
			throws IOException {
		String projectPath = getProjectPath(solutionPath);
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(projectPath)));
		String firstLine = in.readLine();
		String secondLine = in.readLine();
		int indexOf_bootStrap = secondLine.indexOf("bootStrap");
		int indexOf_file_first = secondLine.substring(0, indexOf_bootStrap)
				.lastIndexOf("file");
		int indexOf_file_last = secondLine.indexOf("file", indexOf_bootStrap);
		secondLine = secondLine.substring(0, indexOf_file_first - 1)
				+ "<file path=\"./" + newBootstrap
				+ ".js\"><tag name=\"bootStrap\"/></file>"
				+ secondLine.substring(indexOf_file_last + 5);
		in.close();
		PrintWriter pw = new PrintWriter(new BufferedWriter(new FileWriter(
				projectPath)));
		pw.println(firstLine);
		pw.println(secondLine);
		pw.close();
	}

	private static String getProjectPath(String solutionPath)
			throws IOException {

		StringBuilder projectPath = new StringBuilder("");

		if (SystemUtils.IS_OS_MAC || SystemUtils.IS_OS_LINUX) {
			String[] names = solutionPath.split("/");
			String solutionName = names[names.length - 3];
			projectPath
					.append(solutionPath.substring(0, solutionPath.length()
							- ((new String(" Solution")).length()
									+ solutionName.length()
									+ (new String(".waSolution")).length() + 1))
							+ "/" + solutionName + ".waProject");
		} else {

			String[] names = solutionPath.split("\\\\");
			String solutionName = names[names.length - 3];
			projectPath
					.append(solutionPath.substring(0, solutionPath.length()
							- ((new String(" Solution")).length()
									+ solutionName.length()
									+ (new String(".waSolution")).length() + 1))
							+ "\\" + solutionName + ".waProject");
		}

		return projectPath.toString();
	}

	public static void deleteFiles(File f) {
		File[] backups = f.listFiles();
		for (File t : backups) {
			if (t.isDirectory()) {
				deleteFiles(t);
			}
			t.delete();
		}
	}

	public static String getPathValue(String solutionPath, String backup,
			boolean b) throws IOException {
		String os = TemplateTestClass.getOS();
		String myPath = "";
		String[] split = null;
		if (os.toLowerCase().contains("mac")
				|| os.toLowerCase().contains("linux")) {
			split = solutionPath.split("/");
		} else {
			split = solutionPath.split("\\\\");
		}
		for (int i = 0; i < split.length - 2; i++)
			myPath += split[i] + "/";
		myPath += split[split.length - 3] + "/" + backup
				+ "/backupManifest.json";
		return myPath;
	}

	public static File getDataFolder(File[] backups, int n) {
		File f = null;
		String os = TemplateTestClass.getOS();
		if (os.contains("mac") || os.contains("Mac")) {
			f = new File(backups[backups.length - n].getAbsolutePath()
					+ "/DataFolder/");
		} else if (os.contains("Linux")) {
			f = new File(backups[backups.length - n].getAbsolutePath()
					+ "/DataFolder/");
		} else {
			f = new File(backups[backups.length - n].getAbsolutePath()
					+ "\\DataFolder\\");
		}
		return f;
	}
}
