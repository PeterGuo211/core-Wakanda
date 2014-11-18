/**
 * 
 */
package org.wakanda.qa.test.http;

import org.wakanda.qa.commons.server.rest.Constants;
import org.wakanda.qa.commons.server.ut.DefaultBehavior;
import org.wakanda.qa.test.http.settings.Configuration;

/**
 * @author soufiane.tigrioui@4d.com
 * 
 */
public class RunServer {

	public static void main(String[] args) {
		DefaultBehavior.doWhenTestRunFinished(Configuration.getInstance(),
				Constants.SERVER_WAKANDA);
		DefaultBehavior.doWhenTestRunStarted(Configuration.getInstance());
	}

}
