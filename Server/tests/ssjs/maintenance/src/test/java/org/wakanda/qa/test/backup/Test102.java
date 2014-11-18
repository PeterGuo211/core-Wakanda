package org.wakanda.qa.test.backup;

import static org.junit.Assert.assertEquals;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.wakanda.qa.commons.server.ServerAdmin;
import org.wakanda.qa.commons.server.rest.Constants;
import org.wakanda.qa.test.backup.settings.Configuration;

public class Test102 extends TemplateTestClass {
	Logger logger = Logger.getLogger(TestBackupDataStore_NoJ.class);
	ServerAdmin adm = Configuration.getInstance().getSeverAdmin();

	@Test
	public void testBackupDS_DestinationAndBRF_areFilesCreated_firstBackup()
			throws IOException, URISyntaxException {
		// Dans ce test, on vérifie just qu'un nouveau dossier est créé dans le
		// dossier "Backups"
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot2");
		// on prend le nombre de backup qui existe
		File backupFolder = Utils.getBackupFolder(
				Utils.getBackupFolder("backup1"), "MyBackups");
		File[] backups = backupFolder.listFiles();
		int num_Backups = backups.length;
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// on verifie que le backup est bien créé
		backups = backupFolder.listFiles();
		int new_num_Backups = backups.length;

		assertEquals("the backup should not be created.", new_num_Backups,
				num_Backups);
	}

	@Test
	public void testBackupDS_DestinationAndBRF_areFilesCreated_secondBackup()
			throws IOException, URISyntaxException {
		// Dans ce test, on vérifie just qu'un nouveau dossier est créé dans le
		// dossier "Backups"
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot2");
		// on prend le nombre de backup qui existe
		File backupFolder = Utils.getBackupFolder(
				Utils.getBackupFolder("backup1"), "MyBackups");
		File[] backups = backupFolder.listFiles();
		int num_Backups = backups.length;
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// on verifie que le backup est bien créé
		backups = backupFolder.listFiles();
		int new_num_Backups = backups.length;

		assertEquals("the backup should not be created.", new_num_Backups,
				num_Backups);
	}
	

	@Test
	public void testBackupDS_DestinationAndBRF_returns() throws IOException,
			URISyntaxException {
		// Dans ce test on vérifie le retour de la fonction backupDataStore:
		// type
		Utils.ChangeBootstrap(Utils.getSolutionPath("solution1"),
				"boot2");
		// On vide le fichier temporaire
		Utils.Vider(Utils.getSolutionPath("solution2"));
		// lancer le server avec la solution temporaire qui va créer un backup
		// de la solution ClosedSol_NoJ_1
		adm.runServerWithSolution(Utils.getSolutionPath("solution1"));
		adm.killServerViaCommandLine(Constants.SERVER_WAKANDA);
		// On lit ce qui est enregistré dans le fichier temporaire
		String propertyValue = Utils.getProperty_Type(Utils
				.getBackupFolder("backup1"));

		assertEquals("the return should be null.", (String) "null", propertyValue);
	}

}
