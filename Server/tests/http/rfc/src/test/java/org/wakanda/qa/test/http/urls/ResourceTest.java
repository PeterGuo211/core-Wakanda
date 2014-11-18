package org.wakanda.qa.test.http.urls;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpStatus;
import org.apache.http.util.EntityUtils;
import org.junit.Test;
import org.wakanda.qa.commons.server.http.HttpSimpleBufferedResponse;
import org.wakanda.qa.test.http.extend.AbstractTestCase;
import org.wakanda.qa.test.http.settings.Settings;


/**
 * This class manages all test cases related with resource identifing.
 * 
 * @author Ouissam
 * 
 */
public class ResourceTest extends AbstractTestCase {

	/**
	 * <b>Implements:</b> Resource01
	 * <p/>
	 * Servers MUST report a 400 (Bad Request) error if an HTTP/1.1 request does
	 * not include a Host request-header.
	 * <p/>
	 * <b>Reference:</b> RFC2616 19.6.1.1 + 14.23
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerReports400BadRequestWhenHostHeaderIsMissing()
			throws Exception {

		String request = "GET / HTTP/1.1" + CRLF + CRLF;
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_BAD_REQUEST, response);

		request = "GET / HTTP/1.1" + CRLF + "Host:"
				+ getDefaultHostHeaderValue() + CRLF + CRLF;
		response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

	}

	/**
	 * <b>Implements:</b> Resource02
	 * <p/>
	 * Check that host header is optional in HTTP/1.0 requests.
	 * <p/>
	 * <b>Reference:</b> RFC2616 19.6.1.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatHostHeaderIsOptionalIn_HTTP_1_0_Request()
			throws Exception {
		String request = "GET / HTTP/1.0" + CRLF + CRLF;
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

	}

	/**
	 * <b>Implements:</b> Resource03
	 * <p/>
	 * Check that server accepts absolute URIs.
	 * <p/>
	 * <b>Reference:</b> RFC2616 19.6.1.1 + 5.1.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerAcceptsAbsoluteURI() throws Exception {

		// Request with absolute path
		String uri =  getDefaultTarget().toString() + "/index.html";
		String request = "GET " + uri + " HTTP/1.1" + CRLF + "Host: "
				+ getDefaultHostHeaderValue() + CRLF + CRLF;
		logger.debug(request);

		// Response
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		// Should get 200 OK
		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		HttpEntity entity = response.getEntity();
		assertNotNull("Response has no content", entity);
		String actual = EntityUtils.toString(entity);
		// Check content
		assertTrue("Wrong content", actual.contains("HTTP/1.1"));

	}

	/**
	 * <b>Implements:</b> Resource04
	 * <p/>
	 * Check that if Request-URI is an absoluteURI, the host is part of the
	 * Request-URI. Any Host header field value in the request MUST be ignored.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatHostHeaderValueIsIgnoredWhenRequestURIIsAbsolute()
			throws Exception {
		// Host
		int mport = getMultiHostPort();
		String hostName = "host3";
		HttpHost host = new HttpHost(hostName, mport, "http");

		// Request with absolute path
		String uri = host.toURI() + "/index.html";
		HttpHost shouldBeIgnored = new HttpHost("host2", mport);
		String request = "GET " + uri + " HTTP/1.1" + CRLF + "Host: "
				+ shouldBeIgnored.toHostString() + CRLF + CRLF;
		logger.debug(request);
		// Target
		HttpHost target = getMultiHostTarget();
		// Response
		HttpSimpleBufferedResponse response = executeRawRequest(target, request);
		HttpEntity entity = response.getEntity();
		try {
			// Should be 200 OK
			assertEqualsStatusCode(HttpStatus.SC_OK, response);
			assertNotNull("Response has no content", entity);
			String actual = EntityUtils.toString(entity);
			logger.debug(actual);
			// Should get the content of Host 3
			assertTrue("Wrong content", actual.contains("Host 3"));
		} finally {
			EntityUtils.consume(entity);
		}
	}

	/**
	 * <b>Implements:</b> Resource05
	 * <p/>
	 * Check that server reports 400 (Bad Request) if the Request-URI is an
	 * absoluteURI and the determined host is not valid.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerReports400BadRequestWhenRequestURIIsAbsoluteAndTheDeterminedHostIsNotvalid()
			throws Exception {

		HttpHost invalid = new HttpHost("whatever", 6666);
		String uri = invalid.toURI() + "/";
		HttpHost valid = new HttpHost("host2", getMultiHostPort());

		// Request with absolute path & invalid host
		String request = "GET " + uri + " HTTP/1.1" + CRLF + "Host: "
				+ valid.toHostString() + CRLF + CRLF;

		logger.debug(request);
		// Target
		HttpHost target = getMultiHostTarget();
		// Response
		HttpSimpleBufferedResponse response = executeRawRequest(target, request);
		// Should get 400
		assertEqualsStatusCode(HttpStatus.SC_BAD_REQUEST, response);
	}

	/**
	 * <b>Implements:</b> Resource06
	 * <p/>
	 * Check that if the Request-URI is not an absoluteURI, and the request
	 * includes a Host header field, the host is determined by the Host header
	 * field value.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.2
	 * 
	 * @throws Exception
	 */

	@Test
	public void testThatHostHeaderValueIsUsedWhenRequestURIIsNotAbsolute()
			throws Exception {
		// Request with non absolute path
		HttpHost host = new HttpHost("host3", getMultiHostPort());
		String uri = "/index.html";
		String request = "GET " + uri + " HTTP/1.1" + CRLF + "Host: "
				+ host.toHostString() + CRLF + CRLF;
		logger.debug(request);

		// Target
		HttpHost target = getMultiHostTarget();
		// Response
		HttpSimpleBufferedResponse response = executeRawRequest(target, request);
		HttpEntity entity = response.getEntity();
		try {
			// Should be 200 OK
			assertEqualsStatusCode(HttpStatus.SC_OK, response);
			assertNotNull("Response has no content", entity);
			String actual = EntityUtils.toString(entity);
			logger.debug(actual);
			// Should get content of host 3
			assertTrue(
					"Wrong content: server should return the content of Host 3",
					actual.contains("Host 3"));
		} finally {
			EntityUtils.consume(entity);
		}
	}

	/**
	 * <b>Implements:</b> Resource07
	 * <p/>
	 * Check that server reports 400 (Bad Request) if the Request-URI is not an
	 * absoluteURI, and the request includes an undefined host header value.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerReports400BadRequestWhenTheRequestURIIsNotAbsoluteAndHostHeaderValueIsNotValid()
			throws Exception {
		// Not absolute URI and invalid host
		String uri = "/index.html";
		String host = "whatever:6666";
		String request = "GET " + uri + " HTTP/1.1" + CRLF + "Host: " + host
				+ CRLF + CRLF;
		logger.debug(request);
		// Target
		HttpHost target = getMultiHostTarget();
		HttpSimpleBufferedResponse response = executeRawRequest(
				target, request);
		// Should get 400
		assertEqualsStatusCode(HttpStatus.SC_BAD_REQUEST, response);
	}

	/**
	 * <b>Implements:</b> Resource08
	 * <p/>
	 * Check that the host header value is case-insensitive.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 5.2
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatHostHeaderValueIsCaseInsensitive() throws Exception {
		// Request with non absolute path
		HttpHost host = new HttpHost("host2", getMultiHostPort());
		String uri = "/index.html";
		// Change host case
		String hostHeaderValue = host.toHostString().toUpperCase();
		String request = "GET " + uri + " HTTP/1.1" + CRLF + "Host: "
				+ hostHeaderValue + CRLF + CRLF;
		logger.debug(request);
		// Target
		HttpHost target = getMultiHostTarget();
		// Response
		HttpSimpleBufferedResponse response = executeRawRequest(target, request);
		HttpEntity entity = response.getEntity();
		try {
			// Should get 200 OK
			assertEqualsStatusCode(HttpStatus.SC_OK, response);
			assertNotNull("Response has no content", entity);
			String actual = EntityUtils.toString(entity);
			logger.debug(actual);
			// Should get the content of Host 2
			assertTrue("Wrong content", actual.contains("Host 2"));
		} finally {
			EntityUtils.consume(entity);
		}
	}

	private int getMultiHostPort() {
		return Settings.getMultiHostPort();
	}

	private HttpHost getMultiHostTarget() {
		return new HttpHost(getSettings().getDefaultHostName(),
				getMultiHostPort());
	}

}
