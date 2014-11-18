package org.wakanda.qa.test.http.connection;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.net.Socket;
import java.net.SocketException;

import org.apache.commons.io.IOUtils;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.HttpVersion;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.DefaultHttpClientConnection;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHttpRequest;
import org.apache.http.params.SyncBasicHttpParams;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HTTP;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;
import org.junit.Ignore;
import org.junit.Test;
import org.wakanda.qa.test.http.Utils;
import org.wakanda.qa.test.http.extend.AbstractTestCase;

/**
 * This class manages all test cases related with the connection persistence.
 * 
 * @author Ouissam
 * 
 */
public class PersistenceTest extends AbstractTestCase {

	/**
	 * <b>Implements:</b> Connection01
	 * <p/>
	 * Check that connection persistence is the default behavior in HTTP/1.1
	 * <p/>
	 * <B>Reference:</b> SPEC693 (RFC2616 8.1.2.1) + RFC2068 19.7.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatConnectionPersistenceIsTheDefaultBehaviorWith_1_1_Version()
			throws Exception {
		HttpHost target = getDefaultTarget();
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();

		// create the first request
		BasicHttpRequest req = new BasicHttpRequest("GET", "/",
				HttpVersion.HTTP_1_1);
		req.addHeader(HTTP.TARGET_HOST, target.toHostString());

		// create and bind the socket
		Socket socket = new Socket(target.getHostName(), target.getPort());
		conn.bind(socket, new SyncBasicHttpParams());
		try {
			// send the request
			conn.sendRequestHeader(req);
			conn.flush();
			// consume the response
			HttpResponse response = conn.receiveResponseHeader();
			conn.receiveResponseEntity(response);
			EntityUtils.consume(response.getEntity());

			// logger.debug(getRequestAsString(req));
			// logger.debug(getResponseAsString(response));
			// check the status code
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check that response have a self-defined message length (i.e., one
			// not
			// defined by closure of the connection).
			Header lengthHeader = response.getFirstHeader(HTTP.CONTENT_LEN);
			assertNotNull("Response must have a self-defined message length",
					lengthHeader);

			// check the connection header directive
			Header cnxHeader = response.getFirstHeader(HTTP.CONN_DIRECTIVE);
			if (cnxHeader != null) {
				String cnxHeaderValue = cnxHeader.getValue();
				assertTrue("Wrong " + HTTP.CONN_DIRECTIVE
						+ " header field value",
						cnxHeaderValue.equalsIgnoreCase(HTTP.CONN_KEEP_ALIVE));
			}

			// One should be able to send a second request upon the current
			// connection
			try {
				conn.sendRequestHeader(req);
				conn.flush();
				// consume the response
				HttpResponse response2 = conn.receiveResponseHeader();
				conn.receiveResponseEntity(response2);
				EntityUtils.consume(response2.getEntity());

				// check the status code
				assertEqualsStatusCode(HttpStatus.SC_OK, response);

			} catch (SocketException e) {
				fail("Connection must remain opened");

			}

		} finally {
			// close the connection
			conn.close();
		}
	}

	/**
	 * <b>Implements:</b> Connection02
	 * <p/>
	 * Check that server closes the connection and sends the connection-token
	 * "Close" when client asks for non persistent connection.
	 * <p/>
	 * <b>Reference:<b/> SPEC693 (RFC2616 8.1.2.1) + SPEC698 (RFC2616 14.10)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testHTTP_1_1_NonPersistentConnection() throws Exception {
		HttpHost target = getDefaultTarget();
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();

		// create the first request
		HttpRequest req = new BasicHttpRequest("GET", "/", HttpVersion.HTTP_1_1);
		req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_CLOSE);

		// create and bind the socket
		Socket socket = new Socket(target.getHostName(), target.getPort());
		conn.bind(socket, new SyncBasicHttpParams());
		try {
			// send the request
			conn.sendRequestHeader(req);
			conn.flush();
			// consume the response
			HttpResponse response = conn.receiveResponseHeader();
			conn.receiveResponseEntity(response);
			EntityUtils.consume(response.getEntity());

			// check the status code
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check the connection header directive
			Header cnxHeader = response.getFirstHeader(HTTP.CONN_DIRECTIVE);
			assertNotNull("Response must contain a " + HTTP.CONN_DIRECTIVE
					+ " header", cnxHeader);
			String cnxHeaderValue = cnxHeader.getValue();
			assertTrue("Wrong " + HTTP.CONN_DIRECTIVE + " value",
					cnxHeaderValue.equalsIgnoreCase(HTTP.CONN_CLOSE));

			// Send a second request and wait for the response, we should get an
			// exception
			try {
				conn.sendRequestHeader(req);
				conn.flush();
				conn.receiveResponseHeader();
				// logger.debug("No exception !");
				fail("Server must close connection");
			} catch (Exception e) {
				// logger.debug("Exception was throwen when tryin to read/write on connection closed by server!");
			}
		} finally {
			conn.close();
		}

	}

	/**
	 * <b>Implements:</b> Connection03
	 * <p/>
	 * Check that server keeps the connection alive when an HTTP/1.1 client asks
	 * explicitly for persistent connection via the "Keep-Alive"
	 * connection-token.
	 * <p/>
	 * <b>Reference:</b> RFC2068 19.7.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testHTTP_1_1_ExplicitPersistentConnection() throws Exception {
		HttpHost target = getDefaultTarget();
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();

		// create the first request
		HttpRequest req = new BasicHttpRequest("GET", "/", HttpVersion.HTTP_1_1);
		req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);

		// create and bind the socket
		Socket socket = new Socket(target.getHostName(), target.getPort());
		conn.bind(socket, new SyncBasicHttpParams());
		try {
			// send the request
			conn.sendRequestHeader(req);
			conn.flush();
			// consume the response
			HttpResponse response = conn.receiveResponseHeader();
			conn.receiveResponseEntity(response);
			EntityUtils.consume(response.getEntity());

			// check the status code
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check the connection header directive
			Header cnxHeader = response.getFirstHeader(HTTP.CONN_DIRECTIVE);
			assertNotNull("Response must contain a " + HTTP.CONN_DIRECTIVE
					+ " header", cnxHeader);
			String cnxHeaderValue = cnxHeader.getValue();
			assertTrue("Wrong " + HTTP.CONN_DIRECTIVE + " value",
					cnxHeaderValue.equalsIgnoreCase(HTTP.CONN_KEEP_ALIVE));

			// One should be able to send a second request upon the current
			// connection
			conn.sendRequestHeader(req);
			conn.flush();
			// consume the response
			HttpResponse response2 = conn.receiveResponseHeader();
			conn.receiveResponseEntity(response2);
			EntityUtils.consume(response2.getEntity());

			// check the status code
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

		} finally {
			// close the connection
			conn.close();
		}

	}

	/**
	 * <b>Implements:</b> Connection04
	 * <p/>
	 * Check that persistence is not the default behavior when dealing with
	 * HTTP/1.0 client.
	 * <p/>
	 * <b>Reference:<b/> SPEC693 (RFC2616 8.1.2.1) + RFC2616 19.6.1
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatConnectionPersistenceIsNotTheDefaultBehaviorWith_1_0_Version()
			throws Exception {
		HttpHost target = getDefaultTarget();
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();

		// create the first request
		HttpRequest req = new BasicHttpRequest("GET", "/", HttpVersion.HTTP_1_0);
		req.addHeader(HTTP.TARGET_HOST, target.toHostString());

		// logger.debug(getRequestAsString(req));

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());
			// send the request
			conn.sendRequestHeader(req);
			conn.flush();
			// consume the response
			HttpResponse response = conn.receiveResponseHeader();
			conn.receiveResponseEntity(response);
			EntityUtils.consume(response.getEntity());

			// logger.debug(getResponseAsString(response));

			// check the status code
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check the connection header directive
			Header cnxHeader = response.getFirstHeader(HTTP.CONN_DIRECTIVE);

			// Response should not contain the "Connection" header field as
			// HTTP/1.0
			// clients may not understand it
			// assertNull("Response should not contain a " + HTTP.CONN_DIRECTIVE
			// + " header as HTTP/1.0 clients may not understand it",
			// cnxHeader);

			if (cnxHeader != null) {
				String cnxHeaderValue = cnxHeader.getValue();
				assertTrue("Wrong " + HTTP.CONN_DIRECTIVE + " value",
						cnxHeaderValue.equalsIgnoreCase(HTTP.CONN_CLOSE));
			}

			// Send a second request and wait for the response, we should get an
			// exception
			try {
				conn.sendRequestHeader(req);
				conn.flush();
				conn.receiveResponseHeader();
				// logger.debug("No exception !");
				fail("Server must close connection");
			} catch (Exception e) {
				// logger.debug("Exception was throwen when tryin to read/write on connection closed by server!");
			}

		} finally {
			conn.close();
		}
	}

	/**
	 * <b>Implements:</b> Connection05
	 * <p/>
	 * Check that server keeps the connection alive when an HTTP/1.0 client asks
	 * for persistent connection via "Keep-Alive" connection-token.
	 * <p/>
	 * <b>Reference:</b> RFC2068 19.7.1
	 * 
	 * @throws Exception
	 */

	@Test
	public void testHTTP_1_0_PersistentConnection() throws Exception {
		HttpHost target = getDefaultTarget();
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();

		// create the first request
		HttpRequest req = new BasicHttpRequest("GET", "/", HttpVersion.HTTP_1_0);
		req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);

		logger.debug(Utils.toString((BasicHttpRequest) req));

		// create and bind the socket
		Socket socket = new Socket(target.getHostName(), target.getPort());
		conn.bind(socket, new SyncBasicHttpParams());
		// send the request
		conn.sendRequestHeader(req);
		conn.flush();
		// consume the response
		HttpResponse response = conn.receiveResponseHeader();
		logger.debug(response.getStatusLine());

		conn.receiveResponseEntity(response);

		// String content = EntityUtils.toString(response.getEntity());
		// logger.debug(content);
		EntityUtils.consume(response.getEntity());

		// check the status code
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

		// check the connection header directive
		Header cnxHeader = response.getFirstHeader(HTTP.CONN_DIRECTIVE);
		assertNotNull("Response must contain a " + HTTP.CONN_DIRECTIVE
				+ " header", cnxHeader);
		String cnxHeaderValue = cnxHeader.getValue();
		logger.debug(cnxHeaderValue);
		assertTrue("Wrong " + HTTP.CONN_DIRECTIVE + " value",
				cnxHeaderValue.equalsIgnoreCase(HTTP.CONN_KEEP_ALIVE));

		// One should be able to send a second request upon the current
		// connection
		conn.sendRequestHeader(req);
		conn.flush();
		// consume the response
		HttpResponse response2 = conn.receiveResponseHeader();
		conn.receiveResponseEntity(response2);
		EntityUtils.consume(response2.getEntity());

		// check the status code
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

		// close the connection
		conn.close();

	}

	/**
	 * <b>Implements:</b> Connection06
	 * <p/>
	 * Check that server closes the connection when an HTTP/1.0 client asks for
	 * non persistent connection via the connection-token "Close".
	 * <p/>
	 * Persistent connection is not the default behavior in HTTP/1.0 but what if
	 * an HTTP/1.0 client asks for non persistent connection explicitly using
	 * the "close" token? the server should close the connection immediately
	 * after sending the response.
	 * <p/>
	 * <b>Reference:<b/> SPEC693 (RFC2616 8.1.2.1) + SPEC698 (RFC2616 14.10)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testHTTP_1_0_ExplicitNonPersistentConnection() throws Exception {
		HttpHost target = getDefaultTarget();
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();

		// create the first request
		HttpRequest req = new BasicHttpRequest("GET", "/", HttpVersion.HTTP_1_0);
		req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_CLOSE);

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());
			// send the request
			conn.sendRequestHeader(req);
			conn.flush();
			// consume the response
			HttpResponse response = conn.receiveResponseHeader();
			conn.receiveResponseEntity(response);
			EntityUtils.consume(response.getEntity());

			// check the status code
			assertEqualsStatusCode(HttpStatus.SC_OK, response);

			// check the connection header directive
			Header cnxHeader = response.getFirstHeader(HTTP.CONN_DIRECTIVE);
			assertNotNull("Response must contain a " + HTTP.CONN_DIRECTIVE
					+ " header", cnxHeader);
			String cnxHeaderValue = cnxHeader.getValue();
			assertTrue("Wrong " + HTTP.CONN_DIRECTIVE + " value",
					cnxHeaderValue.equalsIgnoreCase(HTTP.CONN_CLOSE));

			// Send a second request and wait for the response, we should get an
			// exception
			try {
				conn.sendRequestHeader(req);
				conn.flush();
				conn.receiveResponseHeader();
				// logger.debug("No exception !");
				fail("Server must close connection");
			} catch (Exception e) {
				// logger.debug("Exception was throwen when tryin to read/write on connection closed by server!");
			}

		} finally {
			conn.close();
		}
	}

	/**
	 * <b>Implements:</b> Connection07
	 * <p/>
	 * When receiving an HTTP/1.0 message that includes a Connection header,
	 * check that server remove and ignore, for each connection-token in this
	 * field, any header field from the message with the same name as the
	 * connection-token.
	 * <p/>
	 * <b>Reference:<b/>SPEC698 (RFC2616 14.10)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerIgnoresHeadersListedInConnectionHeaderFieldOfAn_HTTP_1_0_Request()
			throws Exception {
		String url = "/";
		HttpClient client = new DefaultHttpClient();
		HttpContext context = new BasicHttpContext();
		HttpHost target = getDefaultTarget();
		String toIgnore = HttpHeaders.IF_MODIFIED_SINCE;
		String conToken = HTTP.CONN_CLOSE;

		// get last modified date
		String validator = HttpHeaders.LAST_MODIFIED;
		HttpGet request = new HttpGet(url);
		HttpResponse response = client.execute(target, request, context);
		EntityUtils.consume(response.getEntity());
		String lmd = response.getFirstHeader(validator).getValue();

		// add "If-Modified-Since" header
		request.addHeader(toIgnore, lmd);

		// "If-Modified-Since" header and "Keep-Alive" token should be ignored
		request.addHeader(HTTP.CONN_DIRECTIVE, toIgnore + "," + conToken);

		// get the response
		response = client.execute(target, request, context);

		// check status code
		int actual = response.getStatusLine().getStatusCode();
		assertEquals(
				"When receiving an HTTP/1.0 message that includes a Connection header, check that server remove and ignore, for each connection-token in this field, any header field from the message with the same name as the connection-token.",
				HttpStatus.SC_OK, actual);

	}

	/**
	 * <b>Implements:</b> Connection08
	 * <p/>
	 * Check that response messages on persistent connection has a self-defined
	 * message length.
	 * <p/>
	 * <b>Reference:</b> SPEC693 (RFC2616 8.1.2.1)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatResponsesOnPersistentConnectionHasASelfDefinedMessageLength()
			throws Exception {
		HttpGet request = new HttpGet("/");
		HttpResponse response = executeRequest(request);
		HttpEntity entity = response.getEntity();
		try {
			assertEqualsStatusCode(HttpStatus.SC_OK, response);
			assertNotNull(entity);
			assertTrue(
					"Messages on persistent connection MUST have a self-defined message lengt",
					entity.getContentLength() != -1);

		} finally {
			EntityUtils.consume(entity);
		}

	}

	/**
	 * <b>Implements:</b> Connection09
	 * <p/>
	 * Check that the server sends its responses to pipe-lined requests in the
	 * same order that the requests were received.
	 * <p/>
	 * The test is ignored for now because the feature is not yet implemented.
	 * <p/>
	 * <b>Reference:</b> SPEC693 (RFC2616 8.1.2.2)
	 * 
	 * @throws Exception
	 */
	@Test
	@Ignore
	public void testThatServerRespondsToPipelinedRequestsInTheSameOrderThatTheRequestsWereReceived()
			throws Exception {
		HttpHost target = getDefaultTarget();

		// create the first request
		BasicHttpRequest request1 = new BasicHttpRequest("GET", "/checkURI/?R1");
		request1.addHeader(HTTP.TARGET_HOST, target.toHostString());
		request1.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);

		// create the second request
		BasicHttpRequest request2 = new BasicHttpRequest("GET", "/checkURI/?R2");
		request2.addHeader(HTTP.TARGET_HOST, target.toHostString());
		request2.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_CLOSE);

		// create a socket and bind it to a connection
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		Socket socket = new Socket(target.getHostName(), target.getPort());
		conn.bind(socket, new SyncBasicHttpParams());

		try {
			// send pipelined requests
			conn.sendRequestHeader(request1);
			// logger.debug(getRequestAsString(request1));
			conn.sendRequestHeader(request2);
			// logger.debug(getRequestAsString(request2));
			conn.flush();

			// consume responses
			String responses = IOUtils.toString(socket.getInputStream());
			// logger.debug(responses);

			int offset = responses.indexOf("HTTP/1.1 200 OK");
			assertTrue("Server did not respond to first request", offset != -1);
			offset = responses.indexOf("R1", offset);
			assertTrue("Server did not respond to first request", offset != -1);
			offset = responses.indexOf("HTTP/1.1 200 OK", offset);
			assertTrue("Server did not respond to second request", offset != -1);
			offset = responses.indexOf("R2", offset);
			assertTrue("Server did not respond to second request", offset != -1);
		} finally {
			// close the connection
			conn.close();
		}
	}

}
