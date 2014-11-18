package org.p4d.qa.test.rest;

import org.wakanda.qa.commons.server.ut.DefaultBehavior;
import org.p4d.qa.test.rest.settings.Configuration;


public class RunServer {

	public static void main(String[] args) {
	
		DefaultBehavior.doWhenTestRunStarted(Configuration.getInstance());
	}

}
