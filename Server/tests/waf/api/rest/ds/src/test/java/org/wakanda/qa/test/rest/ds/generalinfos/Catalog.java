package org.wakanda.qa.test.rest.ds.generalinfos;


import org.apache.http.HttpStatus;
import org.junit.Test;
import org.wakanda.qa.commons.server.rest.RESTRequestBuilder;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;

public class Catalog extends AbstractTestCase {

 
	/**
	 * Test that $catalog rest query returns 200 OK
	 * @throws Exception
	 */
	@Test
	public void testCatalogRESTQueryIsOK() throws Exception {
		RESTRequestBuilder uri = new RESTRequestBuilder("$catalog");
		assertEqualsStatusCode(HttpStatus.SC_OK, uri.buildRequest());
	}
	

}
