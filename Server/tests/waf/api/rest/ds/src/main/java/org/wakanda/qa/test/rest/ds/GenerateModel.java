/**
 * 
 */
package org.wakanda.qa.test.rest.ds;

import org.wakanda.qa.commons.server.rest.DSClient;
import org.wakanda.qa.commons.server.rest.ModelGenerator;
import org.wakanda.qa.test.rest.ds.settings.Configuration;

/**
 * @author soufiane.tigrioui@4d.com
 * 
 */
public class GenerateModel {

	public static void main(String[] args) throws Exception {

		DSClient dsClient = new DSClient(Configuration.getInstance()
				.getHttpSettings());
		String packg = GenerateModel.class.getPackage().getName() + ".tmp";
		ModelGenerator mg = new ModelGenerator(dsClient, packg);
		mg.generate();
	}

}
