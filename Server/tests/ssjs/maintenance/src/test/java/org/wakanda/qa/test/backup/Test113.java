package org.wakanda.qa.test.backup;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Date;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.wakanda.qa.commons.server.ServerAdmin;
import org.wakanda.qa.commons.server.rest.Constants;
import org.wakanda.qa.test.backup.settings.Configuration;

public class Test113 {
	Logger logger = Logger.getLogger(TestBackupDataStore_NoJ.class);
	ServerAdmin adm = Configuration.getInstance().getSeverAdmin();

	@Test
	public void test1getLastBackups_firstCall() throws IOException,
			URISyntaxException {
		// Dans ce test, on vérifie le retour de la méthode getLastBackups()

		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));

		// on charge le bootstrap
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution2"), "boot113_1");

		// lancer le server avec la solution mainSol
		adm.runServerWithSolution(Utils.getSolutionPath("solution2"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		// On lit ce qui est enregistré dans le fichier temporaire
		String type = Utils.getLigne(Utils.getBackupFolder("backup1"), 1);

		String arrayLength = Utils
				.getLigne(Utils.getBackupFolder("backup1"), 2);

		assertEquals("is Object.", type, "object");
		assertEquals("is empty.", "0", arrayLength);
	}

	@Test
	public void test2getLastBackups_withOneBackup() throws IOException,
			URISyntaxException {
		// Dans ce test, on vérifie le retour de la méthode getLastBackups()
		// dans le cas ou on na pas un backup au prealable

		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));

		// on charge le bootstrap
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution2"), "boot113_2");

		// lancer le server avec la solution mainSol
		adm.runServerWithSolution(Utils.getSolutionPath("solution2"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		// On lit ce qui est enregistré dans le fichier temporaire

		String arrayLength = Utils
				.getLigne(Utils.getBackupFolder("backup1"), 1);

		assertEquals("should not be empty.", "1", arrayLength);
	}

	@Test
	public void test3getLastBackups_withTenBackups() throws IOException,
			URISyntaxException {
		// Dans ce test, on vérifie le retour de la méthode getLastBackups()
		// dans le cas ou on na pas un backup au prealable

		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));

		// on charge le bootstrap
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution2"), "boot113_3");

		// lancer le server avec la solution mainSol
		adm.runServerWithSolution(Utils.getSolutionPath("solution2"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);

		// On lit ce qui est enregistré dans le fichier temporaire
		String arrayLength = Utils
				.getLigne(Utils.getBackupFolder("backup1"), 1);

		assertEquals("should not be empty.", "10", arrayLength);
	}
	
	@Test
	public void test4getLastBackups_returnedPath() throws IOException,
			URISyntaxException {
		// Dans ce test, on vérifie le "path" retourné par la méthode getLastBackups()
		
		// On lit ce qui est enregistré dans le fichier temporaire
		String creationDate = Utils
				.getLigne(Utils.getBackupFolder("backup1"), 5);
		String returnedPath = Utils
				.getLigne(Utils.getBackupFolder("backup1"), 2);
		String calculatedPath = Utils.getCalculatedPath(
				Utils.getSolutionPath("solution2"), "Backups",creationDate);
		assertEquals("path parameter is not correct.",calculatedPath, returnedPath);
	}
	
	@Test
	public void test4getLastBackups_returnedDataFolder() throws IOException,
			URISyntaxException {
		// Dans ce test, on vérifie le "DataFolder" retourné par la méthode getLastBackups()

		// On lit ce qui est enregistré dans le fichier temporaire
		String creationDate = Utils
				.getLigne(Utils.getBackupFolder("backup1"), 5);
		String returnedDataFolderPath = Utils
				.getLigne(Utils.getBackupFolder("backup1"), 3);
		String calculatedDataFolderPath = Utils.getDataFolderPath(Utils.getCalculatedPath(
				Utils.getSolutionPath("solution2"), "Backups",creationDate));
		assertEquals("DataFolder path is not correct.",calculatedDataFolderPath, returnedDataFolderPath);
	}

	@Test
	public void test4getLastBackups_returnedJournal() throws IOException,
			URISyntaxException {
		// Dans ce test, on vérifie le "journal" retourné par la méthode getLastBackups()

		// On lit ce qui est enregistré dans le fichier temporaire
		String returnedJournal = Utils
				.getLigne(Utils.getBackupFolder("backup1"), 4);
		assertEquals("journal parameter is not correct.", "" , returnedJournal);
	}
	
	@Test
	public void test4getLastBackups_returnedDate() throws IOException,
			URISyntaxException {
		// Dans ce test, on vérifie la "date" retourné par la méthode getLastBackups()
		Date oldDate = new Date();
		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));

		// on charge le bootstrap
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution2"), "boot113_4");

		// lancer le server avec la solution mainSol
		adm.runServerWithSolution(Utils.getSolutionPath("solution2"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		Date newDate = new Date();
		
		String returnedDate = Utils
				.getLigne(Utils.getBackupFolder("backup1"), 1);
		Date returnedDate_1 = Utils.parseDate(returnedDate);
		
		//assertTrue("the date is not correct.", oldDate.before(returnedDate_1));
		assertTrue("the date is not correct.", newDate.after(returnedDate_1));
	}

	@Test
	public void test4getLastBackups_returnedVersion() throws IOException,
			URISyntaxException {
		// Dans ce test, on vérifie la "date" retourné par la méthode getLastBackups()
		
		String returnedVersion = Utils
				.getLigne(Utils.getBackupFolder("backup1"), 2);
		
		assertTrue("the version is not correct.", Integer.parseInt(returnedVersion)>153000 );
	}
}
