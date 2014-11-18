package org.wakanda.qa.test.http.auth;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * @author Ouissam
 *
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ 
	BasicAuthenticationTest.class,
	DigestAuthenticationTest.class
	})
	
public class AuthenticationTestSuite {
	
}
