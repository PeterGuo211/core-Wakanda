/**
 * 
 */
package org.p4d.qa.test.rest;

import org.wakanda.qa.commons.server.rest.DSClient;
import org.wakanda.qa.commons.server.rest.ModelGenerator;
import org.p4d.qa.test.rest.GenerateModel;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class GenerateModel {

	public static void main(String[] args) throws Exception {

		DSClient dsClient = new DSClient("localhost",8081);
		String packg = GenerateModel.class.getPackage().getName() + ".domain";
		System.out.println(packg);
		ModelGenerator mg = new ModelGenerator(dsClient, packg);
		mg.generate();
	}

}
