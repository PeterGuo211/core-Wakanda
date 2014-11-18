package org.wakanda.qa.test.http.statuscodes;

import static org.junit.Assert.assertEquals;
import junitparams.JUnitParamsRunner;
import junitparams.Parameters;

import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.impl.EnglishReasonPhraseCatalog;
import org.apache.http.message.BasicHttpRequest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.wakanda.qa.test.http.extend.AbstractTestCase;


/**
 * This class manages all test cases related with status codes that begin with
 * 2xx (Success)
 * 
 * @author Ouissam
 * 
 */
@RunWith(JUnitParamsRunner.class)
public class StatusCode2xxTest extends AbstractTestCase {

	/**
	 * <b>Implements:</b> StatusCode200
	 * <p/>
	 * Check 200 OK
	 * <p/>
	 * <b>Reference:</b> SPEC695 = RFC2616 10.2.1
	 * 
	 * @throws Exception
	 */
	@Test
	@Parameters(method = "getSupportedMethods")
	public void testStatusCodeOK(String method) throws Exception {
		HttpRequest request = new BasicHttpRequest(method, "/");
		HttpResponse response = executeRequest(request);
		int expected = HttpStatus.SC_OK;
		// check status code & reason phrase
		assertEqualsStatusCode(expected, response);
		assertEquals(
				"Wrong reason phrase",
				EnglishReasonPhraseCatalog.INSTANCE.getReason(
						expected, null), response.getStatusLine()
				.getReasonPhrase());
	}

}
