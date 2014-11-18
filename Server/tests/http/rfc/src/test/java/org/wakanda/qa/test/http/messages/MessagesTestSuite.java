package org.wakanda.qa.test.http.messages;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

/**
 * @author Ouissam
 *
 */
@RunWith(Suite.class)
@SuiteClasses({ 
	HttpVersionTest.class,
	DateFormatTest.class,
	RequestLineTest.class,
	RequestMethodTest.class,
	HeaderTest.class,
	ResponseTest.class,
	ProductTokenTest.class
	})

public class MessagesTestSuite {
	
}


