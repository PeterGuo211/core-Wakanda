package org.wakanda.qa.test.http;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.wakanda.qa.test.http.auth.AuthenticationTestSuite;
import org.wakanda.qa.test.http.cache.CacheTestSuite;
import org.wakanda.qa.test.http.connection.ConnectionTestSuite;
import org.wakanda.qa.test.http.entitiy.EntitiyTestSuite;
import org.wakanda.qa.test.http.messages.MessagesTestSuite;
import org.wakanda.qa.test.http.negotiation.ContentNegociationTestSuite;
import org.wakanda.qa.test.http.statuscodes.StatusCodeTestSuite;
import org.wakanda.qa.test.http.urls.URITestSuite;

/**
 * @author ouissam.gouni@4d.com
 * 
 */

@RunWith(Suite.class)
@Suite.SuiteClasses({ MessagesTestSuite.class, URITestSuite.class,
		EntitiyTestSuite.class, StatusCodeTestSuite.class,
		ConnectionTestSuite.class, CacheTestSuite.class,
		AuthenticationTestSuite.class, ContentNegociationTestSuite.class })

public class TestsEntry {

}
