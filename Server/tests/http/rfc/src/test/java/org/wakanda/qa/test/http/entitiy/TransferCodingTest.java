package org.wakanda.qa.test.http.entitiy;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.net.Socket;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.HttpVersion;
import org.apache.http.MalformedChunkCodingException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.DefaultHttpClientConnection;
import org.apache.http.message.BasicHttpEntityEnclosingRequest;
import org.apache.http.params.SyncBasicHttpParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.junit.Ignore;
import org.junit.Test;
import org.wakanda.qa.commons.server.http.HttpSimpleBufferedResponse;
import org.wakanda.qa.test.http.extend.AbstractTestCase;


/**
 * @author Ouissam
 * 
 *         This class manages all test cases related with transfer coding
 * 
 */
public class TransferCodingTest extends AbstractTestCase {

	/**
	 * <b>Implements:</b> TransferCoding01
	 * <p/>
	 * Check that when the server receives an entity-body with a transfer-coding
	 * it does not understand, it should returns 501 (Unimplemented), and closes
	 * the connection.
	 * The test is ignored for now because the feature is not yet implemented.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.6
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerReturns501WhenReceivesAnEntityBodyWithUnknowenTransferCoding()
			throws Exception {

		String transferCoding = "whatever";
		String payload = "whatever";
		String request = "POST /echoBody/ HTTP/1.1" + CRLF
				+ HttpHeaders.HOST + ":" + getDefaultHostHeaderValue() + CRLF
				+ HttpHeaders.TRANSFER_ENCODING + ":" + transferCoding + CRLF
				+ HttpHeaders.CONTENT_LENGTH + ":" + payload.length() + CRLF
				+ CRLF + payload;

		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_NOT_IMPLEMENTED, response);
		assertEquals("Server should close the connection", HTTP.CONN_CLOSE.toLowerCase(),
				response.getOriginalResponse().getFirstHeader(HTTP.CONN_DIRECTIVE).getValue().toLowerCase());

	}

	/**
	 * <b>Implements:</b> TransferCoding02
	 * <p/>
	 * Check that when the "chunked" transfer-coding is used, it MUST be the
	 * last transfer-coding applied to the message-body, otherwise server
	 * responds with 400 bad request.
	 * <p/>
	 * The test is ignored for now because the feature is not yet implemented.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.6
	 * 
	 * @throws Exception
	 */
	@Test
	@Ignore
	public void testThatServerReturns400WhenChunkedIsNotTheLastTransferCodingAppliedToRequestBody()
			throws Exception {
		// request
		String transferCoding = HTTP.CHUNK_CODING + "," + HTTP.IDENTITY_CODING;
		String request = "POST /echoBody/ HTTP/1.1" + CRLF
				+ HttpHeaders.HOST + ":" + getDefaultHostHeaderValue() + CRLF
				+ HttpHeaders.TRANSFER_ENCODING + ":" + transferCoding + CRLF
				+ HttpHeaders.CONTENT_TYPE + ":" + ContentType.DEFAULT_TEXT + CRLF
				+ CRLF + "2;\n12\n3;\n345\n0;\n\n";

		// response
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_BAD_REQUEST, response);

	}

	/**
	 * <b>Implements:</b> TransferCoding03
	 * <p/>
	 * Check that the "chunked" transfer-coding MUST NOT be applied more than
	 * once to a message-body, otherwise server responds with 400 bad request.
	 * <p/>
	 * The test is ignored for now because the feature is not yet implemented.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.6
	 * 
	 * @throws Exception
	 */
	@Test
	@Ignore
	public void testThatServerReturns400WhenChunkedIsAppliedMoreThanOnce()
			throws Exception {
		// request
		String transferCoding = HTTP.CHUNK_CODING + "," + HTTP.CHUNK_CODING;
		String request = "POST /echoBody/ HTTP/1.1" + CRLF
				+ HttpHeaders.HOST + ":" + getDefaultHostHeaderValue() + CRLF
				+ HttpHeaders.TRANSFER_ENCODING + ":" + transferCoding + CRLF
				+ HttpHeaders.CONTENT_TYPE + ":" + ContentType.DEFAULT_TEXT + CRLF
				+ CRLF + "2;\n12\n3;\n345\n0;\n\n";

		// response
		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_BAD_REQUEST, response);

	}

	/**
	 * <b>Implements:</b> TransferCoding04
	 * <p/>
	 * Check that server accepts and parses "chunked" transfert-coding.
	 * <p/>
	 * The test is ignored for now because the feature is not yet implemented.
	 * <p/>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.6
	 * 
	 * @throws Exception
	 */
	@Test
	@Ignore
	public void testThatServerAcceptsAndParesesChunkedTransferCoding()
			throws Exception {
		// request
		String transferCoding = HTTP.CHUNK_CODING;
		String request = "POST /echoBody/ HTTP/1.1" + CRLF
				+ HttpHeaders.HOST + ":" + getDefaultHostHeaderValue() + CRLF
				+ HttpHeaders.TRANSFER_ENCODING + ":" + transferCoding + CRLF
				+ HttpHeaders.CONTENT_TYPE + ":" + ContentType.DEFAULT_TEXT + CRLF
				+ CRLF + "2;\nab\n3;\ncde\n6;\nfghijk\n0;\n\n";

		// response
		HttpSimpleBufferedResponse response = executeRawRequest(request);

		assertEqualsStatusCode(HttpStatus.SC_OK, response);
		HttpEntity entity = response.getEntity();
		assertNotNull(entity);
		String expected = "abcdefghjk";
		String actual = EntityUtils.toString(entity);
		assertEquals("Wrong content", expected, actual);
	}

	/**
	 * <b>Implements:</b> TransferCoding05
	 * <p>
	 * Check that server is able to send "chunked" transfer-coding.
	 * <p>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.6
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerIsAbleToSendChunkedTransferCoding()
			throws Exception {
		HttpHost target = getDefaultTarget();

		// create request for chunked content
		HttpPost request = new HttpPost("/checkChunked/");
		request.addHeader(HTTP.TARGET_HOST, target.toHostString());
		request.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		String expected = RandomStringUtils.randomAlphanumeric(1024);
		StringEntity reqEntity = new StringEntity(expected);
		request.setEntity(reqEntity);
		request.addHeader(HTTP.CONTENT_LEN,
				Long.toString(reqEntity.getContentLength()));
		request.addHeader(reqEntity.getContentType());

		// create a socket and bind it to a connection
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		Socket socket = new Socket(target.getHostName(), target.getPort());
		conn.bind(socket, new SyncBasicHttpParams());

		try {
			// send request
			conn.sendRequestHeader(request);
			conn.sendRequestEntity(request);
			conn.flush();

			// get response header and entity
			HttpResponse response = conn.receiveResponseHeader();
			conn.receiveResponseEntity(response);

			HttpEntity entity = response.getEntity();
			assertNotNull("Response should have a content", entity);
			assertTrue("Chunked Transfer-coding is expected",
					entity.isChunked());

			try {
				String actual = EntityUtils.toString(entity);
				// logger.debug("Response content: " + actual);
				assertEquals("Wrong chunked content", expected, actual);
			} catch (MalformedChunkCodingException e) {
				fail("Wrong chunked format: " + e.getMessage());
			}

		} finally {
			// close the connection
			conn.close();
		}
	}

	/**
	 * <b>Implements:</b> TransferCoding06
	 * <p>
	 * Check that server does not send transfer-codings to an HTTP/1.0 client.
	 * <p>
	 * <b>Reference:</b> SPEC689 (RFC2616) 3.6
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerDoesNotSendTransferCodingTo_HTTP_1_0_Client()
			throws Exception {
		HttpHost target = getDefaultTarget();

		// create request for chunked content
		BasicHttpEntityEnclosingRequest request = new BasicHttpEntityEnclosingRequest(
				"POST", "/checkChunked/", HttpVersion.HTTP_1_0);
		request.addHeader(HTTP.TARGET_HOST, target.toHostString());
		request.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		String expected = RandomStringUtils.randomAlphanumeric(1024);
		StringEntity reqEntity = new StringEntity(expected);
		request.setEntity(reqEntity);
		request.addHeader(HTTP.CONTENT_LEN,
				Long.toString(reqEntity.getContentLength()));
		request.addHeader(reqEntity.getContentType());

		// create a socket and bind it to a connection
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		Socket socket = new Socket(target.getHostName(), target.getPort());
		conn.bind(socket, new SyncBasicHttpParams());

		try {
			// send request
			conn.sendRequestHeader(request);
			conn.sendRequestEntity(request);
			conn.flush();

			// get response header and entity
			HttpResponse response = conn.receiveResponseHeader();
			conn.receiveResponseEntity(response);

			HttpEntity entity = response.getEntity();
			assertNotNull("Response should have a content", entity);
			assertFalse("Entity should not be chunked", entity.isChunked());

			String actual = EntityUtils.toString(entity);
			// logger.debug("Response content: " + actual);
			assertEquals("Wrong chunked content", expected, actual);
		} finally {
			// close the connection
			conn.close();
		}
	}

}
