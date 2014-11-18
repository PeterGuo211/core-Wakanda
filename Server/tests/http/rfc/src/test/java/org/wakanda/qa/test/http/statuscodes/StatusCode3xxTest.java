package org.wakanda.qa.test.http.statuscodes;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.EnglishReasonPhraseCatalog;
import org.junit.Test;
import org.wakanda.qa.test.http.extend.AbstractTestCase;


/**
 * @author Ouissam
 *
 */
public class StatusCode3xxTest extends AbstractTestCase{
	/**
	 * <b>Implements:</b> StatusCode304
	 * <p/>
	 * Check 304 (Not Modified) status code
	 * <p/>
	 * <b>Reference:<b> SPEC695 = RFC2616 10.3.5
	 * @throws Exception
	 */
	@Test
	public void testStatusCode304NotModified() throws Exception{
		int expected = HttpStatus.SC_NOT_MODIFIED;
		String url = "/";

		// get last modified date
		String validator = HttpHeaders.LAST_MODIFIED;
		HttpGet request = new HttpGet(url);
		HttpResponse response = executeRequest(request);
		String lmd = response.getFirstHeader(validator)
				.getValue();

		// build conditional request
		request.addHeader(HttpHeaders.IF_MODIFIED_SINCE, lmd);

		// get the response
		response = executeRequest(request);

		// check status code & reason phrase
		assertEqualsStatusCode(expected, response);
		assertEquals(
				"Wrong reason phrase",
				EnglishReasonPhraseCatalog.INSTANCE.getReason(
						expected, null), response.getStatusLine()
				.getReasonPhrase());

		// check content
		assertNull(response.getEntity());
	}
}
