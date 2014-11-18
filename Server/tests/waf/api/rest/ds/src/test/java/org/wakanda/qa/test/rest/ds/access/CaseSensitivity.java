/**
 * 
 */
package org.wakanda.qa.test.rest.ds.access;

import static org.junit.Assert.assertEquals;

import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.junit.Ignore;
import org.junit.Test;
import org.wakanda.qa.test.rest.ds.extend.AbstractTestCase;
import org.wakanda.qa.commons.server.http.HttpGetRest;
import org.wakanda.qa.commons.server.rest.util.MyDS;

/**
 * @author ouissam.gouni@4d.com
 * 
 */
public class CaseSensitivity extends AbstractTestCase {

	@Test
	public void testDataClassNameIsCaseSensitive() throws Exception {
		String url = "/caSeSeNsItIve/";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url);

		url = "/CaSeSeNsItIvE/as_string_2";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url);

		url = "/CAsEsEnSiTiVe/as_string_1";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url);
	}

	@Test
	public void testDataClassMethodNameIsCaseSensitive() throws Exception {
		String url = "/MethodCaseSensitive/McLs_cAsEsEnSiTivE/";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url);

		url = "/MethodCaseSensitive/mcls_cAsEsEnSiTivE/";
		HttpRequest request = new HttpGetRest(url);
		HttpResponse response = executeRequest(request);
		String result = MyDS.getMethodStringResult(response);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		assertEquals("mcls_cAsEsEnSiTivE", result);

		url = "/MethodCaseSensitive/mcls_CaSeSeNsItIvE/";
		request = new HttpGetRest(url);
		response = executeRequest(request);
		result = MyDS.getMethodStringResult(response);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		assertEquals("mcls_CaSeSeNsItIvE", result);
	}

	@Test
	public void testDataClassAttributeNameIsCaseSensitive() throws Exception {
		String url = "/AttributeCaseSensitive/as_string/";
		assertEqualsStatusCode(HttpStatus.SC_NOT_FOUND, url);

		url = "/AttributeCaseSensitive/as_StRiNg/";
		assertEqualsStatusCode(HttpStatus.SC_OK, url);

		url = "/AttributeCaseSensitive/as_sTrInG/";
		assertEqualsStatusCode(HttpStatus.SC_OK, url);
	}

	@Test
	@Ignore
	public void testDataInQueriesIsCaseInsensitive() throws Exception {

	}
}
