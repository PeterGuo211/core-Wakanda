package org.wakanda.qa.test.backup;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Test;
import org.wakanda.qa.commons.server.rest.Constants;

import java.io.BufferedWriter;
import java.io.PrintWriter;
import java.net.URL;


import org.apache.commons.lang3.SystemUtils;
import org.apache.log4j.Logger;
import org.junit.After;
import org.junit.Before;
import org.wakanda.qa.commons.server.ServerAdmin;
import org.wakanda.qa.commons.server.Util;
import org.wakanda.qa.test.backup.settings.Configuration;


public class TestBackupDataStore_NoJ extends TemplateTestClass {

	
	Logger logger = Logger.getLogger(TestBackupDataStore_NoJ.class);
	ServerAdmin adm = Configuration.getInstance().getSeverAdmin();
	
	
	public String getBackupFolder(String backup){
		try {
			String relative = Util.getPropertiesConfiguration(Configuration.class,
					"settings.properties").getString(backup);
			URL url = Configuration.class.getResource(relative);
			String absPath = new File(url.toURI())
					.getCanonicalPath();
			return absPath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String getSolutionPath(String solution) {
		try {
			String relative = Util.getPropertiesConfiguration(Configuration.class,
					"settings.properties").getString(solution);
			URL url = Configuration.class.getResource(relative);
			String absPath = new File(url.toURI())
					.getCanonicalPath();
			return absPath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static void main(String[] args) {
		TestBackupDataStore_NoJ t = new TestBackupDataStore_NoJ();
		t.getSolutionPath("solution1");
	}
	
	@Before
	public void before() {
//		File backupFolder = new File(getBackupFolder("backup1"));
//		deleteFiles(backupFolder);
//		backupFolder = new File(getBackupFolder("backup1").substring(0,
//				getBackupFolder("backup1").length() - 7) + "MyBackups");
//		deleteFiles(backupFolder);
	}

	@After
	public void after() {
		// adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
	}

	@Test
	public void testToBeDeleted() throws IOException, URISyntaxException {
		// File backupFolder = new File(getBackupFolder("backup1"));
		File backupFolder = new File(getBackupFolder("backup1"));
		deleteFiles(backupFolder);
		backupFolder = new File(getBackupFolder("backup1").substring(0,
		getBackupFolder("backup1").length() - 7) + "MyBackups");
		deleteFiles(backupFolder);
	}

	

	

	@Test
	public void testBackupDS_FullSettings_False_isBackupCreated()
			throws IOException, URISyntaxException {
		// Dans ce test, on vérifie just qu'un nouveau dossier est créé dans le
		// dossier "Backups"
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_FullSettings_False");
		// on prend le nombre de backup qui existe
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		int num_Backups = backups.length;
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// on verifie que le backup est bien créé
		backups = backupFolder.listFiles();
		int new_num_Backups = backups.length;
		if (new_num_Backups != num_Backups + 1)
			fail("the backup is not created. Actual: " + new_num_Backups
					+ " Expected: " + (num_Backups + 1));
	}

	@Test
	public void testBackupDS_FullSettings_False_isCorrecteName()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le backup est créé avec le nom attendu
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_FullSettings_False");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		Date date = new Date();
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On verifie le nom du backup créé
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		String[] names = backups[backups.length - 2].getAbsolutePath().split(
				"\\\\");
		String name_Backups = names[names.length - 1];
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm");
		if (!name_Backups.startsWith("backup_" + dateFormat.format(date))) {
			fail("the backup is not created with the correct name. Actual: backup_"
					+ dateFormat.format(date) + " Expected: " + name_Backups);
		}
	}

	@Test
	public void testBackupDS_FullSettings_False_BackupContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le dossier DataFolder est créé à
		// l'intérieur du backup
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_FullSettings_False");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup = new File(
				backups[backups.length - 2].getAbsolutePath());
		File[] backups_content = theNewBackup.listFiles();

		assertEquals(2, backups_content.length);
		assertEquals("backupManifest.json", backups_content[0].getName());
		assertEquals("DataFolder", backups_content[1].getName());
	}

	@Test
	public void testBackupDS_FullSettings_False_DataFolderContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_FullSettings_False");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup_DataFolder = new File(
				backups[backups.length - 2].getAbsolutePath()
						+ "\\DataFolder\\");
		File[] DataFolder_content = theNewBackup_DataFolder.listFiles();

		assertEquals(3, DataFolder_content.length);
		assertEquals("data.Match", DataFolder_content[0].getName());
		assertEquals("data.waData", DataFolder_content[1].getName());
		assertEquals("data.waIndx", DataFolder_content[2].getName());
	}

	@Test
	public void testBackupDS_FullSettings_False_returns_type()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_FullSettings_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 1; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("type"))
				fail("the return of 'backupDataStore' method is not correct: type");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: type value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_FullSettings_False_returns_name()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_FullSettings_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 2; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].equals("backupManifest.json"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_FullSettings_False_returns_nameNoExt()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_FullSettings_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 3; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("nameNoExt"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt");
			if (!myLine.split("\"")[3].equals("backupManifest"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_FullSettings_False_returns_extension()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_FullSettings_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 4; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("extension"))
				fail("the return of 'backupDataStore' method is not correct: extension");
			if (!myLine.split("\"")[3].equals("json"))
				fail("the return of 'backupDataStore' method is not correct: extension value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_FullSettings_False_returns_path()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_FullSettings_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 5; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("path"))
				fail("the return of 'backupDataStore' method is not correct: path");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: path value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_FullSettings_False_returns_exists()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_FullSettings_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 6; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_FullSettings_False_returns_visible()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_FullSettings_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 7; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("visible"))
				fail("the return of 'backupDataStore' method is not correct: visible");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: visible value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_FullSettings_False_returns_readOnly()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_FullSettings_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 8; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("readOnly"))
				fail("the return of 'backupDataStore' method is not correct: readOnly");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("false"))
				fail("the return of 'backupDataStore' method is not correct: readOnly value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_FullSettings_False_returns_creationDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_FullSettings_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 9; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("creationDate"))
				fail("the return of 'backupDataStore' method is not correct: creationDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: creationDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_FullSettings_False_returns_lastModifiedDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_FullSettings_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 10; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("lastModifiedDate"))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustSpecificDestination_isBackupCreated()
			throws IOException, URISyntaxException {
		// Dans ce test, on vérifie just qu'un nouveau dossier est créé dans le
		// dossier "Backups"
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustSpecificDestination");
		// on prend le nombre de backup qui existe
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		int num_Backups = backups.length;
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// on verifie que le backup est bien créé
		backups = backupFolder.listFiles();
		int new_num_Backups = backups.length;
		if (new_num_Backups != num_Backups + 1)
			fail("the backup is not created. Actual: " + new_num_Backups
					+ " Expected: " + (num_Backups + 1));
	}

	@Test
	public void testBackupDS_JustSpecificDestination_isCorrecteName()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le backup est créé avec le nom attendu
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustSpecificDestination");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		Date date = new Date();
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On verifie le nom du backup créé
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		String[] names = backups[backups.length - 2].getAbsolutePath().split(
				"\\\\");
		String name_Backups = names[names.length - 1];
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm");
		if (!name_Backups.startsWith("backup_" + dateFormat.format(date))) {
			fail("the backup is not created with the correct name. Actual: backup_"
					+ dateFormat.format(date) + " Expected: " + name_Backups);
		}
	}

	@Test
	public void testBackupDS_JustSpecificDestination_BackupContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le dossier DataFolder est créé à
		// l'intérieur du backup
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustSpecificDestination");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup = new File(
				backups[backups.length - 2].getAbsolutePath());
		File[] backups_content = theNewBackup.listFiles();

		assertEquals(2, backups_content.length);
		assertEquals("backupManifest.json", backups_content[0].getName());
		assertEquals("DataFolder", backups_content[1].getName());
	}

	@Test
	public void testBackupDS_JustSpecificDestination_DataFolderContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustSpecificDestination");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup_DataFolder = new File(
				backups[backups.length - 2].getAbsolutePath()
						+ "\\DataFolder\\");
		File[] DataFolder_content = theNewBackup_DataFolder.listFiles();

		assertEquals(3, DataFolder_content.length);
		assertEquals("data.Match", DataFolder_content[0].getName());
		assertEquals("data.waData", DataFolder_content[1].getName());
		assertEquals("data.waIndx", DataFolder_content[2].getName());
	}

	@Test
	public void testBackupDS_JustSpecificDestination_returns_type()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustSpecificDestination");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 1; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("type"))
				fail("the return of 'backupDataStore' method is not correct: type");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: type value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustSpecificDestination_returns_name()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustSpecificDestination");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 2; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].equals("backupManifest.json"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustSpecificDestination_returns_nameNoExt()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustSpecificDestination");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 3; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("nameNoExt"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt");
			if (!myLine.split("\"")[3].equals("backupManifest"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustSpecificDestination_returns_extension()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustSpecificDestination");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 4; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("extension"))
				fail("the return of 'backupDataStore' method is not correct: extension");
			if (!myLine.split("\"")[3].equals("json"))
				fail("the return of 'backupDataStore' method is not correct: extension value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustSpecificDestination_returns_path()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustSpecificDestination");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 5; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("path"))
				fail("the return of 'backupDataStore' method is not correct: path");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: path value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustSpecificDestination_returns_exists()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustSpecificDestination");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 6; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustSpecificDestination_returns_visible()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustSpecificDestination");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 7; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("visible"))
				fail("the return of 'backupDataStore' method is not correct: visible");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: visible value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustSpecificDestination_returns_readOnly()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustSpecificDestination");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 8; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("readOnly"))
				fail("the return of 'backupDataStore' method is not correct: readOnly");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("false"))
				fail("the return of 'backupDataStore' method is not correct: readOnly value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustSpecificDestination_returns_creationDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustSpecificDestination");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 9; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("creationDate"))
				fail("the return of 'backupDataStore' method is not correct: creationDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: creationDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustSpecificDestination_returns_lastModifiedDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustSpecificDestination");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 10; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("lastModifiedDate"))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_isBackupCreated()
			throws IOException, URISyntaxException {
		// Dans ce test, on vérifie just qu'un nouveau dossier est créé dans le
		// dossier "Backups"
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames");
		// on prend le nombre de backup qui existe
		File backupFolder = new File(getBackupFolder("backup1"));
		File[] backups = backupFolder.listFiles();
		int num_Backups = backups.length;
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// on verifie que le backup est bien créé
		backups = backupFolder.listFiles();
		int new_num_Backups = backups.length;
		if (new_num_Backups <= num_Backups)
			fail("the backup is not created. Actual: " + new_num_Backups);
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_isCorrecteName()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le backup est créé avec le nom attendu
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		Date date = new Date();
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On verifie le nom du backup créé
		File backupFolder = new File(getBackupFolder("backup1"));
		File[] backups = backupFolder.listFiles();
		String[] names = backups[backups.length - 3].getAbsolutePath().split(
				"\\\\");
		String name_Backups = names[names.length - 1];
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm");
		if (!name_Backups.startsWith("backup_" + dateFormat.format(date))) {
			fail("the backup is not created with the correct name. Actual: backup_"
					+ dateFormat.format(date) + " Expected: " + name_Backups);
		}
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_BackupContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le dossier DataFolder est créé à
		// l'intérieur du backup
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1"));
		File[] backups = backupFolder.listFiles();
		File theNewBackup = new File(
				backups[backups.length - 3].getAbsolutePath());
		File[] backups_content = theNewBackup.listFiles();

		assertEquals(2, backups_content.length);
		assertEquals("backupManifest.json", backups_content[0].getName());
		assertEquals("DataFolder", backups_content[1].getName());
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_DataFolderContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1"));
		File[] backups = backupFolder.listFiles();
		File theNewBackup_DataFolder = new File(
				backups[backups.length - 3].getAbsolutePath()
						+ "\\DataFolder\\");
		File[] DataFolder_content = theNewBackup_DataFolder.listFiles();

		assertEquals(3, DataFolder_content.length);
		assertEquals("data.Match", DataFolder_content[0].getName());
		assertEquals("data.waData", DataFolder_content[1].getName());
		assertEquals("data.waIndx", DataFolder_content[2].getName());
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_returns_type()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 1; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("type"))
				fail("the return of 'backupDataStore' method is not correct: type");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: type value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_returns_name()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 2; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].equals("backupManifest.json"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_returns_nameNoExt()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 3; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("nameNoExt"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt");
			if (!myLine.split("\"")[3].equals("backupManifest"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_returns_extension()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 4; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("extension"))
				fail("the return of 'backupDataStore' method is not correct: extension");
			if (!myLine.split("\"")[3].equals("json"))
				fail("the return of 'backupDataStore' method is not correct: extension value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_returns_path()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 5; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("path"))
				fail("the return of 'backupDataStore' method is not correct: path");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: path value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_returns_exists()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 6; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("exists"))
				fail("the return of 'backupDataStore' method is not correct: exists");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: exists value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_returns_visible()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 7; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("visible"))
				fail("the return of 'backupDataStore' method is not correct: visible");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: visible value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_returns_readOnly()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 8; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("readOnly"))
				fail("the return of 'backupDataStore' method is not correct: readOnly");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("false"))
				fail("the return of 'backupDataStore' method is not correct: readOnly value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_returns_creationDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 9; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("creationDate"))
				fail("the return of 'backupDataStore' method is not correct: creationDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: creationDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_returns_lastModifiedDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 10; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("lastModifiedDate"))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_False_isBackupCreated()
			throws IOException, URISyntaxException {
		// Dans ce test, on vérifie just qu'un nouveau dossier est créé dans le
		// dossier "Backups"
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames_False");
		// on prend le nombre de backup qui existe
		File backupFolder = new File(getBackupFolder("backup1"));
		File[] backups = backupFolder.listFiles();
		int num_Backups = backups.length;
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// on verifie que le backup est bien créé
		backups = backupFolder.listFiles();
		int new_num_Backups = backups.length;
		if (new_num_Backups != num_Backups + 1)
			fail("the backup is not created. Actual: " + new_num_Backups
					+ " Expected: " + (num_Backups + 1));
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_False_isCorrecteName()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le backup est créé avec le nom attendu
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames_False");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		Date date = new Date();
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On verifie le nom du backup créé
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		String[] names = backups[backups.length - 2].getAbsolutePath().split(
				"\\\\");
		String name_Backups = names[names.length - 1];
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm");
		if (!name_Backups.startsWith("backup_" + dateFormat.format(date))) {
			fail("the backup is not created with the correct name. Actual: backup_"
					+ dateFormat.format(date) + " Expected: " + name_Backups);
		}
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_False_BackupContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le dossier DataFolder est créé à
		// l'intérieur du backup
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames_False");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup = new File(
				backups[backups.length - 2].getAbsolutePath());
		File[] backups_content = theNewBackup.listFiles();

		assertEquals(2, backups_content.length);
		assertEquals("backupManifest.json", backups_content[0].getName());
		assertEquals("DataFolder", backups_content[1].getName());
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_False_DataFolderContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames_False");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup_DataFolder = new File(
				backups[backups.length - 2].getAbsolutePath()
						+ "\\DataFolder\\");
		File[] DataFolder_content = theNewBackup_DataFolder.listFiles();

		assertEquals(3, DataFolder_content.length);
		assertEquals("data.Match", DataFolder_content[0].getName());
		assertEquals("data.waData", DataFolder_content[1].getName());
		assertEquals("data.waIndx", DataFolder_content[2].getName());
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_False_returns_type()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 1; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("type"))
				fail("the return of 'backupDataStore' method is not correct: type");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: type value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_False_returns_name()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 2; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].equals("backupManifest.json"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_False_returns_nameNoExt()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 3; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("nameNoExt"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt");
			if (!myLine.split("\"")[3].equals("backupManifest"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_False_returns_extension()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 4; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("extension"))
				fail("the return of 'backupDataStore' method is not correct: extension");
			if (!myLine.split("\"")[3].equals("json"))
				fail("the return of 'backupDataStore' method is not correct: extension value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_False_returns_path()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 5; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("path"))
				fail("the return of 'backupDataStore' method is not correct: path");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: path value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_False_returns_exists()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 6; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_False_returns_visible()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 7; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("visible"))
				fail("the return of 'backupDataStore' method is not correct: visible");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: visible value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_False_returns_readOnly()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 8; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("readOnly"))
				fail("the return of 'backupDataStore' method is not correct: readOnly");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("false"))
				fail("the return of 'backupDataStore' method is not correct: readOnly value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_False_returns_creationDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 9; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("creationDate"))
				fail("the return of 'backupDataStore' method is not correct: creationDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: creationDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustUseUniqueNames_False_returns_lastModifiedDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 10; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("lastModifiedDate"))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustBackupRegistryFolder_isBackupCreated()
			throws IOException, URISyntaxException {
		// Dans ce test, on vérifie just qu'un nouveau dossier est créé dans le
		// dossier "Backups"
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustBackupRegistryFolder");
		// on prend le nombre de backup qui existe
		File backupFolder = new File(getBackupFolder("backup1"));
		File[] backups = backupFolder.listFiles();
		int num_Backups = backups.length;
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// on verifie que le backup est bien créé
		backups = backupFolder.listFiles();
		int new_num_Backups = backups.length;
		if (new_num_Backups <= num_Backups)
			fail("the backup is not created. Actual: " + new_num_Backups);
	}

	@Test
	public void testBackupDS_JustBackupRegistryFolder_isCorrecteName()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le backup est créé avec le nom attendu
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustBackupRegistryFolder");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		Date date = new Date();
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On verifie le nom du backup créé
		File backupFolder = new File(getBackupFolder("backup1"));
		File[] backups = backupFolder.listFiles();
		String[] names = backups[backups.length - 3].getAbsolutePath().split(
				"\\\\");
		String name_Backups = names[names.length - 1];
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm");
		if (!name_Backups.startsWith("backup_" + dateFormat.format(date))) {
			fail("the backup is not created with the correct name. Actual: backup_"
					+ dateFormat.format(date) + " Expected: " + name_Backups);
		}
	}

	@Test
	public void testBackupDS_JustBackupRegistryFolder_BackupContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le dossier DataFolder est créé à
		// l'intérieur du backup
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustBackupRegistryFolder");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1"));
		File[] backups = backupFolder.listFiles();
		File theNewBackup = new File(
				backups[backups.length - 3].getAbsolutePath());
		File[] backups_content = theNewBackup.listFiles();

		assertEquals(2, backups_content.length);
		assertEquals("backupManifest.json", backups_content[0].getName());
		assertEquals("DataFolder", backups_content[1].getName());
	}

	@Test
	public void testBackupDS_JustBackupRegistryFolder_DataFolderContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustBackupRegistryFolder");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1"));
		File[] backups = backupFolder.listFiles();
		File theNewBackup_DataFolder = new File(
				backups[backups.length - 3].getAbsolutePath()
						+ "\\DataFolder\\");
		File[] DataFolder_content = theNewBackup_DataFolder.listFiles();

		assertEquals(3, DataFolder_content.length);
		assertEquals("data.Match", DataFolder_content[0].getName());
		assertEquals("data.waData", DataFolder_content[1].getName());
		assertEquals("data.waIndx", DataFolder_content[2].getName());
	}

	@Test
	public void testBackupDS_JustBackupRegistryFolder_returns_type()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustBackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 1; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("type"))
				fail("the return of 'backupDataStore' method is not correct: type");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: type value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustBackupRegistryFolder_returns_name()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustBackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 2; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].equals("backupManifest.json"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustBackupRegistryFolder_returns_nameNoExt()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustBackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 3; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("nameNoExt"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt");
			if (!myLine.split("\"")[3].equals("backupManifest"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustBackupRegistryFolder_returns_extension()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustBackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 4; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("extension"))
				fail("the return of 'backupDataStore' method is not correct: extension");
			if (!myLine.split("\"")[3].equals("json"))
				fail("the return of 'backupDataStore' method is not correct: extension value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustBackupRegistryFolder_returns_path()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustBackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 5; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("path"))
				fail("the return of 'backupDataStore' method is not correct: path");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: path value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustBackupRegistryFolder_returns_exists()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustBackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 6; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("exists"))
				fail("the return of 'backupDataStore' method is not correct: exists");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: exists value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustBackupRegistryFolder_returns_visible()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustBackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 7; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("visible"))
				fail("the return of 'backupDataStore' method is not correct: visible");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: visible value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustBackupRegistryFolder_returns_readOnly()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustBackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 8; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("readOnly"))
				fail("the return of 'backupDataStore' method is not correct: readOnly");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("false"))
				fail("the return of 'backupDataStore' method is not correct: readOnly value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustBackupRegistryFolder_returns_creationDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustBackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 9; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("creationDate"))
				fail("the return of 'backupDataStore' method is not correct: creationDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: creationDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_JustBackupRegistryFolder_returns_lastModifiedDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"), "boot_NoJ_JustBackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 10; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("lastModifiedDate"))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_isBackupCreated()
			throws IOException, URISyntaxException {
		// Dans ce test, on vérifie just qu'un nouveau dossier est créé dans le
		// dossier "Backups"
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames");
		// on prend le nombre de backup qui existe
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		int num_Backups = backups.length;
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// on verifie que le backup est bien créé
		backups = backupFolder.listFiles();
		int new_num_Backups = backups.length;
		if (new_num_Backups != num_Backups + 1)
			fail("the backup is not created. Actual: " + new_num_Backups
					+ " Expected: " + (num_Backups + 1));
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_isCorrecteName()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le backup est créé avec le nom attendu
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		Date date = new Date();
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On verifie le nom du backup créé
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		String[] names = backups[backups.length - 2].getAbsolutePath().split(
				"\\\\");
		String name_Backups = names[names.length - 1];
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm");
		if (!name_Backups.startsWith("backup_" + dateFormat.format(date))) {
			fail("the backup is not created with the correct name. Actual: backup_"
					+ dateFormat.format(date) + " Expected: " + name_Backups);
		}
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_BackupContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le dossier DataFolder est créé à
		// l'intérieur du backup
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup = new File(
				backups[backups.length - 2].getAbsolutePath());
		File[] backups_content = theNewBackup.listFiles();

		assertEquals(2, backups_content.length);
		assertEquals("backupManifest.json", backups_content[0].getName());
		assertEquals("DataFolder", backups_content[1].getName());
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_DataFolderContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup_DataFolder = new File(
				backups[backups.length - 2].getAbsolutePath()
						+ "\\DataFolder\\");
		File[] DataFolder_content = theNewBackup_DataFolder.listFiles();

		assertEquals(3, DataFolder_content.length);
		assertEquals("data.Match", DataFolder_content[0].getName());
		assertEquals("data.waData", DataFolder_content[1].getName());
		assertEquals("data.waIndx", DataFolder_content[2].getName());
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_returns_type()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 1; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("type"))
				fail("the return of 'backupDataStore' method is not correct: type");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: type value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_returns_name()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 2; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].equals("backupManifest.json"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_returns_nameNoExt()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 3; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("nameNoExt"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt");
			if (!myLine.split("\"")[3].equals("backupManifest"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_returns_extension()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 4; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("extension"))
				fail("the return of 'backupDataStore' method is not correct: extension");
			if (!myLine.split("\"")[3].equals("json"))
				fail("the return of 'backupDataStore' method is not correct: extension value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_returns_path()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 5; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("path"))
				fail("the return of 'backupDataStore' method is not correct: path");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: path value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_returns_exists()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 6; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_returns_visible()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 7; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("visible"))
				fail("the return of 'backupDataStore' method is not correct: visible");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: visible value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_returns_readOnly()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 8; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("readOnly"))
				fail("the return of 'backupDataStore' method is not correct: readOnly");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("false"))
				fail("the return of 'backupDataStore' method is not correct: readOnly value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_returns_creationDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 9; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("creationDate"))
				fail("the return of 'backupDataStore' method is not correct: creationDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: creationDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_returns_lastModifiedDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 10; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("lastModifiedDate"))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_False_isBackupCreated()
			throws IOException, URISyntaxException {
		// Dans ce test, on vérifie just qu'un nouveau dossier est créé dans le
		// dossier "Backups"
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames_False");
		// on prend le nombre de backup qui existe
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		int num_Backups = backups.length;
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// on verifie que le backup est bien créé
		backups = backupFolder.listFiles();
		int new_num_Backups = backups.length;
		if (new_num_Backups != num_Backups + 1)
			fail("the backup is not created. Actual: " + new_num_Backups
					+ " Expected: " + (num_Backups + 1));
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_False_isCorrecteName()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le backup est créé avec le nom attendu
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames_False");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		Date date = new Date();
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On verifie le nom du backup créé
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		String[] names = backups[backups.length - 2].getAbsolutePath().split(
				"\\\\");
		String name_Backups = names[names.length - 1];
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm");
		if (!name_Backups.startsWith("backup_" + dateFormat.format(date))) {
			fail("the backup is not created with the correct name. Actual: backup_"
					+ dateFormat.format(date) + " Expected: " + name_Backups);
		}
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_False_BackupContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le dossier DataFolder est créé à
		// l'intérieur du backup
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames_False");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup = new File(
				backups[backups.length - 2].getAbsolutePath());
		File[] backups_content = theNewBackup.listFiles();

		assertEquals(2, backups_content.length);
		assertEquals("backupManifest.json", backups_content[0].getName());
		assertEquals("DataFolder", backups_content[1].getName());
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_False_DataFolderContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames_False");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup_DataFolder = new File(
				backups[backups.length - 2].getAbsolutePath()
						+ "\\DataFolder\\");
		File[] DataFolder_content = theNewBackup_DataFolder.listFiles();

		assertEquals(3, DataFolder_content.length);
		assertEquals("data.Match", DataFolder_content[0].getName());
		assertEquals("data.waData", DataFolder_content[1].getName());
		assertEquals("data.waIndx", DataFolder_content[2].getName());
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_False_returns_type()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 1; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("type"))
				fail("the return of 'backupDataStore' method is not correct: type");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: type value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_False_returns_name()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 2; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].equals("backupManifest.json"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_False_returns_nameNoExt()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 3; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("nameNoExt"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt");
			if (!myLine.split("\"")[3].equals("backupManifest"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_False_returns_extension()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 4; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("extension"))
				fail("the return of 'backupDataStore' method is not correct: extension");
			if (!myLine.split("\"")[3].equals("json"))
				fail("the return of 'backupDataStore' method is not correct: extension value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_False_returns_path()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 5; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("path"))
				fail("the return of 'backupDataStore' method is not correct: path");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: path value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_False_returns_exists()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 6; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_False_returns_visible()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 7; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("visible"))
				fail("the return of 'backupDataStore' method is not correct: visible");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: visible value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_False_returns_readOnly()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 8; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("readOnly"))
				fail("the return of 'backupDataStore' method is not correct: readOnly");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("false"))
				fail("the return of 'backupDataStore' method is not correct: readOnly value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_False_returns_creationDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 9; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("creationDate"))
				fail("the return of 'backupDataStore' method is not correct: creationDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: creationDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndUseUniqueNames_False_returns_lastModifiedDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndUseUniqueNames_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 10; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("lastModifiedDate"))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_isBackupCreated()
			throws IOException, URISyntaxException {
		// Dans ce test, on vérifie just qu'un nouveau dossier est créé dans le
		// dossier "Backups"
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder");
		// on prend le nombre de backup qui existe
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		int num_Backups = backups.length;
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// on verifie que le backup est bien créé
		backups = backupFolder.listFiles();
		int new_num_Backups = backups.length;
		if (new_num_Backups != num_Backups + 1)
			fail("the backup is not created. Actual: " + new_num_Backups
					+ " Expected: " + (num_Backups + 1));
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_isCorrecteName()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le backup est créé avec le nom attendu
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		Date date = new Date();
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On verifie le nom du backup créé
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		String[] names = backups[backups.length - 2].getAbsolutePath().split(
				"\\\\");
		String name_Backups = names[names.length - 1];
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm");
		if (!name_Backups.startsWith("backup_" + dateFormat.format(date))) {
			fail("the backup is not created with the correct name. Actual: backup_"
					+ dateFormat.format(date) + " Expected: " + name_Backups);
		}
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_BackupContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le dossier DataFolder est créé à
		// l'intérieur du backup
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup = new File(
				backups[backups.length - 2].getAbsolutePath());
		File[] backups_content = theNewBackup.listFiles();

		assertEquals(2, backups_content.length);
		assertEquals("backupManifest.json", backups_content[0].getName());
		assertEquals("DataFolder", backups_content[1].getName());
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_DataFolderContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup_DataFolder = new File(
				backups[backups.length - 2].getAbsolutePath()
						+ "\\DataFolder\\");
		File[] DataFolder_content = theNewBackup_DataFolder.listFiles();

		assertEquals(3, DataFolder_content.length);
		assertEquals("data.Match", DataFolder_content[0].getName());
		assertEquals("data.waData", DataFolder_content[1].getName());
		assertEquals("data.waIndx", DataFolder_content[2].getName());
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_returns_type()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 1; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("type"))
				fail("the return of 'backupDataStore' method is not correct: type");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: type value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_returns_name()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 2; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].equals("backupManifest.json"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_returns_nameNoExt()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 3; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("nameNoExt"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt");
			if (!myLine.split("\"")[3].equals("backupManifest"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_returns_extension()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 4; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("extension"))
				fail("the return of 'backupDataStore' method is not correct: extension");
			if (!myLine.split("\"")[3].equals("json"))
				fail("the return of 'backupDataStore' method is not correct: extension value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_returns_path()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 5; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("path"))
				fail("the return of 'backupDataStore' method is not correct: path");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: path value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_returns_exists()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 6; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_returns_visible()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 7; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("visible"))
				fail("the return of 'backupDataStore' method is not correct: visible");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: visible value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_returns_readOnly()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 8; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("readOnly"))
				fail("the return of 'backupDataStore' method is not correct: readOnly");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("false"))
				fail("the return of 'backupDataStore' method is not correct: readOnly value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_returns_creationDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 9; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("creationDate"))
				fail("the return of 'backupDataStore' method is not correct: creationDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: creationDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_returns_lastModifiedDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 10; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("lastModifiedDate"))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_False_isBackupCreated()
			throws IOException, URISyntaxException {
		// Dans ce test, on vérifie just qu'un nouveau dossier est créé dans le
		// dossier "Backups"
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder_False");
		// on prend le nombre de backup qui existe
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		int num_Backups = backups.length;
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// on verifie que le backup est bien créé
		backups = backupFolder.listFiles();
		int new_num_Backups = backups.length;
		if (new_num_Backups != num_Backups + 1)
			fail("the backup is not created. Actual: " + new_num_Backups
					+ " Expected: " + (num_Backups + 1));
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_False_isCorrecteName()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le backup est créé avec le nom attendu
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder_False");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		Date date = new Date();
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On verifie le nom du backup créé
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		String[] names = backups[backups.length - 2].getAbsolutePath().split(
				"\\\\");
		String name_Backups = names[names.length - 1];
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm");
		if (!name_Backups.startsWith("backup_" + dateFormat.format(date))) {
			fail("the backup is not created with the correct name. Actual: backup_"
					+ dateFormat.format(date) + " Expected: " + name_Backups);
		}
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_False_BackupContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le dossier DataFolder est créé à
		// l'intérieur du backup
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder_False");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup = new File(
				backups[backups.length - 2].getAbsolutePath());
		File[] backups_content = theNewBackup.listFiles();

		assertEquals(2, backups_content.length);
		assertEquals("backupManifest.json", backups_content[0].getName());
		assertEquals("DataFolder", backups_content[1].getName());
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_False_DataFolderContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder_False");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup_DataFolder = new File(
				backups[backups.length - 2].getAbsolutePath()
						+ "\\DataFolder\\");
		File[] DataFolder_content = theNewBackup_DataFolder.listFiles();

		assertEquals(3, DataFolder_content.length);
		assertEquals("data.Match", DataFolder_content[0].getName());
		assertEquals("data.waData", DataFolder_content[1].getName());
		assertEquals("data.waIndx", DataFolder_content[2].getName());
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_False_returns_type()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 1; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("type"))
				fail("the return of 'backupDataStore' method is not correct: type");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: type value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_False_returns_name()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 2; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].equals("backupManifest.json"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_False_returns_nameNoExt()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 3; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("nameNoExt"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt");
			if (!myLine.split("\"")[3].equals("backupManifest"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_False_returns_extension()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 4; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("extension"))
				fail("the return of 'backupDataStore' method is not correct: extension");
			if (!myLine.split("\"")[3].equals("json"))
				fail("the return of 'backupDataStore' method is not correct: extension value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_False_returns_path()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 5; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("path"))
				fail("the return of 'backupDataStore' method is not correct: path");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: path value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_False_returns_exists()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 6; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_False_returns_visible()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 7; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("visible"))
				fail("the return of 'backupDataStore' method is not correct: visible");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: visible value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_False_returns_readOnly()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 8; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("readOnly"))
				fail("the return of 'backupDataStore' method is not correct: readOnly");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("false"))
				fail("the return of 'backupDataStore' method is not correct: readOnly value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_False_returns_creationDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 9; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("creationDate"))
				fail("the return of 'backupDataStore' method is not correct: creationDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: creationDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_UseUniqueNamesAndbackupRegistryFolder_False_returns_lastModifiedDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_UseUniqueNamesAndbackupRegistryFolder_False");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 10; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("lastModifiedDate"))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndbackupRegistryFolder_isBackupCreated()
			throws IOException, URISyntaxException {
		// Dans ce test, on vérifie just qu'un nouveau dossier est créé dans le
		// dossier "Backups"
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndbackupRegistryFolder");
		// on prend le nombre de backup qui existe
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		int num_Backups = backups.length;
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// on verifie que le backup est bien créé
		backups = backupFolder.listFiles();
		int new_num_Backups = backups.length;
		if (new_num_Backups != num_Backups + 1)
			fail("the backup is not created. Actual: " + new_num_Backups
					+ " Expected: " + (num_Backups + 1));
	}

	@Test
	public void testBackupDS_DestinationAndbackupRegistryFolder_isCorrecteName()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le backup est créé avec le nom attendu
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndbackupRegistryFolder");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		Date date = new Date();
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On verifie le nom du backup créé
		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		String[] names = backups[backups.length - 2].getAbsolutePath().split(
				"\\\\");
		String name_Backups = names[names.length - 1];
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm");
		if (!name_Backups.startsWith("backup_" + dateFormat.format(date))) {
			fail("the backup is not created with the correct name. Actual: backup_"
					+ dateFormat.format(date) + " Expected: " + name_Backups);
		}
	}

	@Test
	public void testBackupDS_DestinationAndbackupRegistryFolder_BackupContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le dossier DataFolder est créé à
		// l'intérieur du backup
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndbackupRegistryFolder");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup = new File(
				backups[backups.length - 2].getAbsolutePath());
		File[] backups_content = theNewBackup.listFiles();

		assertEquals(2, backups_content.length);
		assertEquals("backupManifest.json", backups_content[0].getName());
		assertEquals("DataFolder", backups_content[1].getName());
	}

	@Test
	public void testBackupDS_DestinationAndbackupRegistryFolder_DataFolderContentNames()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndbackupRegistryFolder");
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		File backupFolder = new File(getBackupFolder("backup1").substring(0,
				getBackupFolder("backup1").length() - 7) + "MyBackups");
		File[] backups = backupFolder.listFiles();
		File theNewBackup_DataFolder = new File(
				backups[backups.length - 2].getAbsolutePath()
						+ "\\DataFolder\\");
		File[] DataFolder_content = theNewBackup_DataFolder.listFiles();

		assertEquals(3, DataFolder_content.length);
		assertEquals("data.Match", DataFolder_content[0].getName());
		assertEquals("data.waData", DataFolder_content[1].getName());
		assertEquals("data.waIndx", DataFolder_content[2].getName());
	}

	@Test
	public void testBackupDS_DestinationAndbackupRegistryFolder_returns_type()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 1; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("type"))
				fail("the return of 'backupDataStore' method is not correct: type");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: type value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndbackupRegistryFolder_returns_name()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 2; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].equals("backupManifest.json"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndbackupRegistryFolder_returns_nameNoExt()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 3; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("nameNoExt"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt");
			if (!myLine.split("\"")[3].equals("backupManifest"))
				fail("the return of 'backupDataStore' method is not correct: nameNoExt value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndbackupRegistryFolder_returns_extension()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 4; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("extension"))
				fail("the return of 'backupDataStore' method is not correct: extension");
			if (!myLine.split("\"")[3].equals("json"))
				fail("the return of 'backupDataStore' method is not correct: extension value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndbackupRegistryFolder_returns_path()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 5; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("path"))
				fail("the return of 'backupDataStore' method is not correct: path");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: path value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndbackupRegistryFolder_returns_exists()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 6; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("name"))
				fail("the return of 'backupDataStore' method is not correct: name");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: name value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndbackupRegistryFolder_returns_visible()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 7; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("visible"))
				fail("the return of 'backupDataStore' method is not correct: visible");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("true"))
				fail("the return of 'backupDataStore' method is not correct: visible value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndbackupRegistryFolder_returns_readOnly()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 8; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("readOnly"))
				fail("the return of 'backupDataStore' method is not correct: readOnly");
			if (!myLine.split("\"")[3].substring(2,
					myLine.split("\"")[3].length() - 2).equals("false"))
				fail("the return of 'backupDataStore' method is not correct: readOnly value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndbackupRegistryFolder_returns_creationDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 9; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("creationDate"))
				fail("the return of 'backupDataStore' method is not correct: creationDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: creationDate value");
		}
		in.close();
	}

	@Test
	public void testBackupDS_DestinationAndbackupRegistryFolder_returns_lastModifiedDate()
			throws IOException, URISyntaxException {
		// Dans ce test on vérifie que le contenu du dossier DataFolder
		// (data.Match data.waData and data.waIndx)
		ChangeBootstrap(getSolutionPath("solution1"),
				"boot_NoJ_DestinationAndbackupRegistryFolder");
		// On vide le fichier temporaire
		new FileWriter(new File(getBackupFolder("backup1") + "\\myFile.txt"))
				.close();
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(getBackupFolder("backup1") + "\\myFile.txt")));
		String firstLine = in.readLine();
		if (firstLine.equals("null"))
			fail("the return of 'backupDataStore' method is 'null'.");
		else {
			String myLine = "";
			for (int i = 0; i < 10; i++)
				myLine = in.readLine();
			if (!myLine.split("\"")[1].equals("lastModifiedDate"))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate");
			if (!myLine.split("\"")[3].equals(""))
				fail("the return of 'backupDataStore' method is not correct: lastModifiedDate value");
		}
		in.close();
	}


	//Les fonctions utilitaires

	public static void executeCommand(String command) {
		// String command;
		String[] shellCommand;
		String os = getOS();
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



	// Fonction qui désactive le bootstrap
	private void ChangeBootstrap(String solutionPath, String newBootstrap)
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

	private String getProjectPath(String solutionPath) throws IOException {
		
		StringBuilder projectPath = new StringBuilder("");
		
		if (SystemUtils.IS_OS_MAC || SystemUtils.IS_OS_LINUX) {
			String[] names = solutionPath.split("/");
			String solutionName = names[names.length - 3];
			 projectPath.append(solutionPath.substring(0, solutionPath.length()
					- ((new String(" Solution")).length() + solutionName.length()
							+ (new String(".waSolution")).length() + 1))
					+ "/" + solutionName + ".waProject");
		} else {

			String[] names = solutionPath.split("\\\\");
			String solutionName = names[names.length - 3];
			 projectPath.append(solutionPath.substring(0, solutionPath.length()
					- ((new String(" Solution")).length() + solutionName.length()
							+ (new String(".waSolution")).length() + 1))
					+ "\\" + solutionName + ".waProject");
		}

		return projectPath.toString();
	}

	// To be deleted
	public static void deleteFiles(File f) {
		File[] backups = f.listFiles();
		for (File t : backups) {
			if (t.isDirectory()) {
				deleteFiles(t);
			}
			t.delete();
		}
	}

}
