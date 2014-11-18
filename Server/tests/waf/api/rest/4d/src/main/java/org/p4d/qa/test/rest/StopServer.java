package org.p4d.qa.test.rest;

import org.wakanda.qa.commons.server.ut.DefaultBehavior;
import org.p4d.qa.test.rest.settings.Configuration;
import org.wakanda.qa.commons.server.rest.Constants;


public class StopServer {


	// TODO Auto-generated method stub
	  public static void main(String[] args) {
		
	
	  System.out.println("Running server...");

	  DefaultBehavior.doWhenTestRunFinished(Configuration.getInstance(),Constants.SERVER_4D);
	  }}
