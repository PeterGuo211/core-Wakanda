package org.wakanda.qa.test.http.negotiation;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.apache.http.Header;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.protocol.HTTP;
import org.junit.Test;
import org.wakanda.qa.test.http.extend.AbstractTestCase;


/**
 * This class manages all tests related with the negociation process.
 * 
 * @author Ouissam
 *
 */
public class ContentNegociationTest extends AbstractTestCase {

	/**
	 * <b>Implements:</b> ServerNegot01
	 * <p/>
	 * Check the server driven negotiation for content-coding.
	 * <p/>
	 * <b>Reference:</b> SPEC697 (RFC2616 12.1)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testContentCodingServerDrivenNegotiation() throws Exception {
		String accept = "gzip, deflate, identity";
		String url = "/tocompress.html";

		HttpGet request = new HttpGet(url);
		request.addHeader(HttpHeaders.ACCEPT_ENCODING, accept);

		HttpResponse response = executeRequest(request);

		assertEqualsStatusCode(HttpStatus.SC_OK, response);

		// check the "Vary" header in response
		Header varyHeader = response.getFirstHeader(HttpHeaders.VARY);

		assertNotNull(
				"Server should return \"Vary\" header when response was negociated",
				varyHeader);
		assertEquals("Wrong \"Vary\" header value", HTTP.CONTENT_ENCODING,
				varyHeader.getValue());

	}

}
