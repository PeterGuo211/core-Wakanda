package org.wakanda.qa.test.rest.ds.generalinfos;



import org.apache.http.HttpStatus;
import org.junit.Test;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;

public class Info extends AbstractTestCase {

	/**
	 * Test that info rest query returns 401 UNAUTHORIZED
	 * @throws Exception
	 */
	@Test
	public void testInfoRESTQueryIsOK() throws Exception {
		RESTRequestBuilder uri = new RESTRequestBuilder("$info");
		assertEqualsStatusCode(HttpStatus.SC_UNAUTHORIZED, uri.buildRequest());
	}
	

}