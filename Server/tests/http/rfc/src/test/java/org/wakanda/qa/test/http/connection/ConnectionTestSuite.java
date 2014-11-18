package org.wakanda.qa.test.http.connection;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

/**
 * @author Ouissam
 *
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({ 
	PersistenceTest.class,
	HandShakeTest.class
	})
public class ConnectionTestSuite {
}
