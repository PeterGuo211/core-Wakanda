/**
 * 
 */
package org.wakanda.qa.test.rest.ds;

import org.wakanda.qa.commons.server.ut.DefaultBehavior;
import org.wakanda.qa.test.rest.ds.settings.Configuration;
import org.wakanda.qa.commons.server.rest.Constants;

/**
 * @author soufiane.tigrioui@4d.com
 * 
 */
public class StopServer {

	public static void main(String[] args) {
		DefaultBehavior.doWhenTestRunFinished(Configuration.getInstance(),Constants.SERVER_WAKANDA);
	}

}
