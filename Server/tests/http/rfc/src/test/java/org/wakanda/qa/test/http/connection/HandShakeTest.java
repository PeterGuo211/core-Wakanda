package org.wakanda.qa.test.http.connection;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.File;
import java.net.Socket;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.HttpVersion;
import org.apache.http.NoHttpResponseException;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.DefaultHttpClientConnection;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.message.BasicHttpEntityEnclosingRequest;
import org.apache.http.params.SyncBasicHttpParams;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.junit.Ignore;
import org.junit.Test;
import org.wakanda.qa.test.http.extend.AbstractTestCase;
import org.wakanda.qa.test.http.settings.Settings;

public class HandShakeTest extends AbstractTestCase {

	private enum Server {
		APACHE, WAKANDA, IIS
	};

	private Server getDefaultServer() {
		return Server.WAKANDA;
	}

	protected HttpHost getDefaultTarget() {
		if (getDefaultServer() == Server.WAKANDA)
			return super.getDefaultTarget();
		else
			return new HttpHost("localhost", 80);
	}

	private String getDefaultUrl() {
		if (getDefaultServer() == Server.WAKANDA)
			return "/echoBody/";
		else
			return "/";
	}

	private boolean useChunked() {
		if (getDefaultServer() == Server.WAKANDA)
			return false;
		else
			return true;
	}

	@Override
	protected List<String> getUnitTestsToExcludeFromBefore() {
		List<String> toExclude = new ArrayList<String>();
		toExclude
				.add("testThat_IIS_ServerRespondsWith100ContinueUponReceivingExpect100ContinueWhenTheRequestIsAcceptedAndContinueToReadFromInputStream");
		return toExclude;
	}

	/**
	 * <b>Implements:</b> HandShake01
	 * <p/>
	 * Check that the server responds with "100-continue" upon receiving a
	 * request with "100-continue" expectation and continue to read from the
	 * input stream when the request is accepted.
	 * <p/>
	 * <B>Reference:</b> SPEC693 (RFC2616 8.2.3)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerRespondsWith100ContinueUponReceivingExpect100ContinueAndContinueToReadFromInputStreamWhenTheRequestIsAccepted()
			throws Exception {
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		HttpHost target = getDefaultTarget();

		String method = "POST";
		String url = getDefaultUrl();

		BasicHttpEntityEnclosingRequest req = new BasicHttpEntityEnclosingRequest(
				method, url);

		req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.EXPECT_DIRECTIVE, HTTP.EXPECT_CONTINUE);
		req.addHeader(HTTP.CONTENT_TYPE, ContentType.DEFAULT_TEXT.toString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		req.addHeader(HTTP.USER_AGENT, getSettings().getUserAgent());

		String content = "Hello";
		HttpEntity reqEntity = new StringEntity(content);
		req.setEntity(reqEntity);

		if (useChunked()) {
			req.addHeader(HTTP.TRANSFER_ENCODING, HTTP.CHUNK_CODING);
		} else {
			req.addHeader(HTTP.CONTENT_LEN,
					Long.toString(reqEntity.getContentLength()));
		}

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());

			// send the request headers
			conn.sendRequestHeader(req);
			conn.flush();

			// read the response...we should get a 100-Continue
			HttpResponse response = conn.receiveResponseHeader();
			logger.debug(response.getStatusLine());
			int actual = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_CONTINUE, actual);

			// the server should continue to read from the input stream so we
			// send the request entity
			conn.sendRequestEntity(req);
			conn.flush();

			// read the response...we should get a 200 OK
			response = conn.receiveResponseHeader();
			logger.debug(response.getStatusLine());
			actual = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_OK, actual);

		} finally {
			conn.close();
		}

	}

	/**
	 * <b>Implements:</b> HandShake02
	 * <p/>
	 * Check that the server responds with a final status code when the request
	 * is rejected. Example: the server must respond with 401 Unauthorized when
	 * the client is unauthorized to execute the request or 400 Bad Request when
	 * the Host header field is missing.
	 * <p/>
	 * <B>Reference:</b> SPEC693 (RFC2616 8.2.3)
	 * </p>
	 * The test case should be studied further before activating it.
	 * 
	 * @throws Exception
	 */
	@Test
	@Ignore
	public void testThatServerRespondsWithFinalStatusCodeUponReceivingExpect100ContinueWhenRequestIsRejected400BadRequest()
			throws Exception {
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		HttpHost target = getDefaultTarget();

		String method = "POST";
		String url = getDefaultUrl();

		BasicHttpEntityEnclosingRequest req = new BasicHttpEntityEnclosingRequest(
				method, url);

		// req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.EXPECT_DIRECTIVE, HTTP.EXPECT_CONTINUE);
		req.addHeader(HTTP.CONTENT_TYPE, ContentType.DEFAULT_TEXT.toString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		req.addHeader(HTTP.USER_AGENT, getSettings().getUserAgent());

		String content = "Hello";
		HttpEntity reqEntity = new StringEntity(content);
		req.setEntity(reqEntity);

		if (useChunked()) {
			req.addHeader(HTTP.TRANSFER_ENCODING, HTTP.CHUNK_CODING);
		} else {
			req.addHeader(HTTP.CONTENT_LEN,
					Long.toString(reqEntity.getContentLength()));
		}

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());

			// send the request headers
			conn.sendRequestHeader(req);
			conn.flush();

			// read the response...we should get a 400 Bad Request
			HttpResponse response = conn.receiveResponseHeader();
			logger.debug(response.getStatusLine());
			int actual = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_BAD_REQUEST, actual);

			// consume the response entity
			EntityUtils.consume(response.getEntity());

		} finally {
			conn.close();
		}

	}

	/**
	 * <b>Implements:</b> HandShake02
	 * <p/>
	 * Check that the server responds with a final status code when the request
	 * is rejected. Example: the server must respond with 401 Unauthorized when
	 * the client is unauthorized to execute the request or 400 Bad Request when
	 * the Host header field is missing.
	 * <p/>
	 * <B>Reference:</b> SPEC693 (RFC2616 8.2.3)
	 * <p/>
	 * The test case should be studied further before activating it.
	 * 
	 * @throws Exception
	 */
	@Test
	@Ignore
	public void testThatServerRespondsWithFinalStatusCodeUponReceivingExpect100ContinueWhenRequestIsRejected401Unauthorized()
			throws Exception {

		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		HttpHost target = getDefaultTarget();

		String url = "/createFileWithAuthBasic/";

		HttpPost req = new HttpPost(url);
		req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.EXPECT_DIRECTIVE, HTTP.EXPECT_CONTINUE);
		req.addHeader(HTTP.CONTENT_TYPE, ContentType.DEFAULT_TEXT.toString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		req.addHeader(HTTP.USER_AGENT, getSettings().getUserAgent());

		String content = "Hello";
		HttpEntity reqEntity = new StringEntity(content);
		req.setEntity(reqEntity);

		if (useChunked()) {
			req.addHeader(HTTP.TRANSFER_ENCODING, HTTP.CHUNK_CODING);
		} else {
			req.addHeader(HTTP.CONTENT_LEN,
					Long.toString(reqEntity.getContentLength()));
		}

		// wrong credentials
		UsernamePasswordCredentials creds = new UsernamePasswordCredentials(
				"wrong", "wrong");
		BasicScheme authscheme = new BasicScheme();
		Header authResponse = authscheme.authenticate(creds, req, null);
		req.addHeader(authResponse);

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());

			// send the request headers
			conn.sendRequestHeader(req);
			conn.flush();

			// read the response...we should get a 401 Unauthorized
			HttpResponse response = conn.receiveResponseHeader();
			logger.debug(response.getStatusLine());
			int actual = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_UNAUTHORIZED, actual);

		} finally {
			conn.close();
		}
	}

	/**
	 * <b>Implements:</b> HandShake03
	 * <p/>
	 * Check that the server closes the connection or continue to read and
	 * discard the rest of the request if it responds with a final status code.
	 * <p/>
	 * <B>Reference:</b> SPEC693 (RFC2616 8.2.3)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerDiscardRestOfRequestIfItRespondsWithFinalStatusCode()
			throws Exception {
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		HttpHost target = getDefaultTarget();

		String method = "POST";
		String url = getDefaultUrl();

		// a request without "Host" header
		BasicHttpEntityEnclosingRequest req = new BasicHttpEntityEnclosingRequest(
				method, url);

		// req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.EXPECT_DIRECTIVE, HTTP.EXPECT_CONTINUE);
		req.addHeader(HTTP.CONTENT_TYPE, ContentType.DEFAULT_TEXT.toString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		req.addHeader(HTTP.USER_AGENT, getSettings().getUserAgent());

		String content = "Hello";
		HttpEntity reqEntity = new StringEntity(content);
		req.setEntity(reqEntity);

		if (useChunked()) {
			req.addHeader(HTTP.TRANSFER_ENCODING, HTTP.CHUNK_CODING);
		} else {
			req.addHeader(HTTP.CONTENT_LEN,
					Long.toString(reqEntity.getContentLength()));
		}

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());

			// send the request headers
			conn.sendRequestHeader(req);
			conn.flush();

			// read the response...we should get a 400 Bad Request
			HttpResponse response = conn.receiveResponseHeader();
			logger.debug(response.getStatusLine());
			int actual = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_BAD_REQUEST, actual);

			// consume the response entity in order to be ready for the next
			// step
			conn.receiveResponseEntity(response);
			logger.debug(EntityUtils.toString(response.getEntity()));
			EntityUtils.consume(response.getEntity());

			// send the request entity
			conn.sendRequestEntity(req);
			conn.flush();

			// server should discard the rest of the request
			try {
				response = conn.receiveResponseHeader();
				fail("100-Continue: If the server responds with a final status code it should discard the rest of the request");
			} catch (NoHttpResponseException e) {
			} catch (SocketException e) {
			}

		} finally {
			conn.close();
		}

	}

	/**
	 * <b>Implements:</b> HandShake04
	 * <p/>
	 * Check that the server does not perform the requested method if it returns
	 * a final status code.
	 * <p/>
	 * <B>Reference:</b> SPEC693 (RFC2616 8.2.3)
	 * <p/>
	 * The test case should be studied further before activating it.
	 * 
	 * @throws Exception
	 */
	@Test
	@Ignore
	public void testThatServerDoesNotPerformRequestedMethodIfItReturnsFinalStatusCode()
			throws Exception {

		// temp file that the request is supposed to create
		String fileName = "toCheck100Continue.tmp";
		File file = new File(Settings.getDefaultProjectWebFolderPath() + "/"
				+ fileName);
		// delete the file if it exists
		if (file.exists()) {
			if (!file.delete()) {
				fail("Cannot delete temp file of test");
			}
		}

		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		HttpHost target = getDefaultTarget();

		String url = "/createFileWithAuthBasic/?filename=" + fileName;
		if (getDefaultServer() == Server.APACHE)
			url = "/protected.html";

		HttpPost req = new HttpPost(url);
		req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.EXPECT_DIRECTIVE, HTTP.EXPECT_CONTINUE);
		req.addHeader(HTTP.CONTENT_TYPE, ContentType.DEFAULT_TEXT.toString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		req.addHeader(HTTP.USER_AGENT, getSettings().getUserAgent());

		String content = "Hello";
		HttpEntity reqEntity = new StringEntity(content);
		req.setEntity(reqEntity);

		if (useChunked()) {
			req.addHeader(HTTP.TRANSFER_ENCODING, HTTP.CHUNK_CODING);
		} else {
			req.addHeader(HTTP.CONTENT_LEN,
					Long.toString(reqEntity.getContentLength()));
		}

		// wrong credentials
		UsernamePasswordCredentials creds = new UsernamePasswordCredentials(
				"wrong", "wrong");
		BasicScheme authscheme = new BasicScheme();
		Header authResponse = authscheme.authenticate(creds, req, null);
		req.addHeader(authResponse);

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());

			// send the request headers
			conn.sendRequestHeader(req);
			conn.flush();

			// read the response...we should get a 401 Unauthorized
			HttpResponse response = conn.receiveResponseHeader();
			logger.debug(response.getStatusLine());
			int actual = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_UNAUTHORIZED, actual);

			// the file should not be created
			assertFalse(
					"100 Continue: Server should not perform the requested method if it returns a final status code",
					file.exists());

		} finally {
			conn.close();
		}

	}

	/**
	 * <b>Implements:</b> HandShake05
	 * <p/>
	 * Check that the server does not send a 100 (Continue) response if the
	 * request message does not include an Expect request-header field with the
	 * "100-continue" expectation.
	 * <p/>
	 * <B>Reference:</b> SPEC693 (RFC2616 8.2.3)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerDoesNotSend100ContinueIfRequestDoesNotInclude100ContinueExpectation()
			throws Exception {
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		HttpHost target = getDefaultTarget();

		String method = "POST";
		String url = getDefaultUrl();

		BasicHttpEntityEnclosingRequest req = new BasicHttpEntityEnclosingRequest(
				method, url);

		req.addHeader(HTTP.TARGET_HOST, target.toHostString());

		// Request without 100-Continue expectation
		req.addHeader(HTTP.EXPECT_DIRECTIVE, "");

		req.addHeader(HTTP.CONTENT_TYPE, ContentType.DEFAULT_TEXT.toString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		req.addHeader(HTTP.USER_AGENT, getSettings().getUserAgent());

		String content = "Hello";
		HttpEntity reqEntity = new StringEntity(content);
		req.setEntity(reqEntity);

		if (useChunked()) {
			req.addHeader(HTTP.TRANSFER_ENCODING, HTTP.CHUNK_CODING);
		} else {
			req.addHeader(HTTP.CONTENT_LEN,
					Long.toString(reqEntity.getContentLength()));
		}

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());

			// send the request headers
			conn.sendRequestHeader(req);
			conn.flush();

			// Server should not respond with 100 Continue
			int timeout = 2000;
			HttpResponse response;
			if (conn.isResponseAvailable(timeout)) {
				response = conn.receiveResponseHeader();
				logger.debug(response.getStatusLine());
				int actual = response.getStatusLine().getStatusCode();
				assertTrue("Server should not reply with 100 Continue",
						actual != HttpStatus.SC_CONTINUE);
			} else {
				logger.debug("Response not available within "
						+ timeout
						+ " ms, the server is probably waiting for the rest of the request...");
				// send request body
				conn.sendRequestEntity(req);
				response = conn.receiveResponseHeader();
				logger.debug(response.getStatusLine());
				int actual = response.getStatusLine().getStatusCode();
				// we should get 200 OK
				assertEquals(HttpStatus.SC_OK, actual);
			}

		} finally {
			conn.close();
		}

	}

	/**
	 * <b>Implements:</b> HandShake06
	 * <p/>
	 * Check that the server does not send a 100 (Continue) response if the
	 * request comes from an HTTP/1.0 (or earlier) client.
	 * <p/>
	 * <B>Reference:</b> SPEC693 (RFC2616 8.2.3)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerDoesNotSend100ContinueWhen_HTTP_1_0()
			throws Exception {
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		HttpHost target = getDefaultTarget();

		String method = "POST";
		String url = getDefaultUrl();

		// HTTP/1.0 request
		BasicHttpEntityEnclosingRequest req = new BasicHttpEntityEnclosingRequest(
				method, url, HttpVersion.HTTP_1_0);

		req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.EXPECT_DIRECTIVE, HTTP.EXPECT_CONTINUE);
		req.addHeader(HTTP.CONTENT_TYPE, ContentType.DEFAULT_TEXT.toString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		req.addHeader(HTTP.USER_AGENT, getSettings().getUserAgent());

		String content = "Hello";
		HttpEntity reqEntity = new StringEntity(content);
		req.setEntity(reqEntity);

		req.addHeader(HTTP.CONTENT_LEN,
				Long.toString(reqEntity.getContentLength()));

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());

			// send the request headers
			conn.sendRequestHeader(req);
			conn.flush();

			// Server should not respond with 100 Continue
			int timeout = 2000;
			HttpResponse response;
			if (conn.isResponseAvailable(timeout)) {
				response = conn.receiveResponseHeader();
				logger.debug(response.getStatusLine());
				int actual = response.getStatusLine().getStatusCode();
				assertTrue("Server should not reply with 100 Continue",
						actual != HttpStatus.SC_CONTINUE);
			} else {
				logger.debug("Response not available within "
						+ timeout
						+ " ms, the server is probably waiting for the rest of the request...");
				// send request body
				conn.sendRequestEntity(req);

				// get the response
				response = conn.receiveResponseHeader();
				logger.debug(response.getStatusLine());
				int actual = response.getStatusLine().getStatusCode();
				// it should be a 200 OK
				assertEquals(HttpStatus.SC_OK, actual);
			}

		} finally {
			conn.close();
		}

	}

	/**
	 * <b>Implements:</b> HandShake07
	 * <p/>
	 * Check that the server omit the 100 (Continue) response if it has already
	 * received some or all the request body.
	 * <p/>
	 * <B>Reference:</b> SPEC693 (RFC2616 8.2.3)
	 * <p/>
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerMayOmit100ContinueIfItHasAlreadyReceivedRequestBody()
			throws Exception {
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		HttpHost target = getDefaultTarget();

		String method = "POST";
		String url = getDefaultUrl();

		BasicHttpEntityEnclosingRequest req = new BasicHttpEntityEnclosingRequest(
				method, url);

		req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.EXPECT_DIRECTIVE, HTTP.EXPECT_CONTINUE);
		req.addHeader(HTTP.CONTENT_TYPE, ContentType.DEFAULT_TEXT.toString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		req.addHeader(HTTP.USER_AGENT, getSettings().getUserAgent());

		String content = "Hello";
		HttpEntity reqEntity = new StringEntity(content);
		req.setEntity(reqEntity);

		if (useChunked()) {
			req.addHeader(HTTP.TRANSFER_ENCODING, HTTP.CHUNK_CODING);
		} else {
			req.addHeader(HTTP.CONTENT_LEN,
					Long.toString(reqEntity.getContentLength()));
		}

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());

			// send the request headers and the body
			conn.sendRequestHeader(req);
			conn.sendRequestEntity(req);
			conn.flush();

			// Server may omit 100 Continue
			HttpResponse response = conn.receiveResponseHeader();
			logger.debug(response.getStatusLine());
			int actual = response.getStatusLine().getStatusCode();
			assertTrue(
					"Server should reply either with 100 Continue or 200 OK",
					actual == HttpStatus.SC_CONTINUE
							|| actual == HttpStatus.SC_OK);

			// if server choose to respond with 100, it should respond just
			// after with 200.
			if (actual == HttpStatus.SC_CONTINUE) {
				response = conn.receiveResponseHeader();
				logger.debug(response.getStatusLine());
				actual = response.getStatusLine().getStatusCode();
				assertEquals(HttpStatus.SC_OK, actual);
			}

		} finally {
			conn.close();
		}
	}

	/**
	 * <b>Implements:</b> HandShake08
	 * <p/>
	 * Check that the server responds with a final status code after it sent a
	 * 100 (Continue) response once the request body is received and processed.
	 * <p/>
	 * <B>Reference:</b> SPEC693 (RFC2616 8.2.3)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerRespondsWithFinalStatusCodeAfterItSent100ContinueOnceRequestBodyReceivedAndProcessed()
			throws Exception {
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		HttpHost target = getDefaultTarget();

		String method = "POST";
		String url = getDefaultUrl();

		BasicHttpEntityEnclosingRequest req = new BasicHttpEntityEnclosingRequest(
				method, url);

		req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.EXPECT_DIRECTIVE, HTTP.EXPECT_CONTINUE);
		req.addHeader(HTTP.CONTENT_TYPE, ContentType.DEFAULT_TEXT.toString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		req.addHeader(HTTP.USER_AGENT, getSettings().getUserAgent());

		String content = "Hello";
		HttpEntity reqEntity = new StringEntity(content);
		req.setEntity(reqEntity);

		if (useChunked()) {
			req.addHeader(HTTP.TRANSFER_ENCODING, HTTP.CHUNK_CODING);
		} else {
			req.addHeader(HTTP.CONTENT_LEN,
					Long.toString(reqEntity.getContentLength()));
		}

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());

			// send the request headers
			conn.sendRequestHeader(req);
			conn.flush();

			// we should get a 100-Continue
			HttpResponse response = conn.receiveResponseHeader();
			logger.debug(response.getStatusLine());
			int actual = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_CONTINUE, actual);

			// server should respond with a final status code after it sent a
			// 100 (Continue) response once the request body is received and
			// processed.
			conn.sendRequestEntity(req);
			conn.flush();

			response = conn.receiveResponseHeader();
			logger.debug(response.getStatusLine());
			actual = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_OK, actual);

		} finally {
			conn.close();
		}
	}

	/**
	 * <b>Implements:</b> HandShake09
	 * <p/>
	 * Check that the server responds with a 417 (Expectation Failed) status if
	 * the expectation cannot be met.
	 * <p/>
	 * <B>Reference:</b> SPEC693 (RFC2616 8.2.3)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerRespondsWith417ExpectationFailedIfExpectationCannotBeMet()
			throws Exception {

		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		HttpHost target = getDefaultTarget();

		BasicHttpEntityEnclosingRequest req = new BasicHttpEntityEnclosingRequest(
				"GET", "/");

		req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		// Send a non supported expectation
		req.addHeader(HTTP.EXPECT_DIRECTIVE, "whatever");
		req.addHeader(HTTP.CONTENT_TYPE, ContentType.DEFAULT_TEXT.toString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		req.addHeader(HTTP.USER_AGENT, getSettings().getUserAgent());

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());

			// send the request headers
			conn.sendRequestHeader(req);
			conn.flush();

			// we should get a 417 Expectation Failed
			HttpResponse response = conn.receiveResponseHeader();
			logger.debug(response.getStatusLine());
			int actual = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_EXPECTATION_FAILED, actual);

		} finally {
			conn.close();
		}
	}

	/**
	 * <b>Implements:</b> HandShake10
	 * <p/>
	 * Check that the server is case-insensitive toward 100-continue token.
	 * <p/>
	 * <B>Reference:</b> SPEC698 (RFC2616 14.20)
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerIsCaseInsensToward100ContinueToken()
			throws Exception {
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		HttpHost target = getDefaultTarget();

		BasicHttpEntityEnclosingRequest req = new BasicHttpEntityEnclosingRequest(
				"POST", getDefaultUrl());

		req.addHeader(HTTP.TARGET_HOST, target.toHostString());

		// send expect 100-continue in upper case
		String expectContinue = HTTP.EXPECT_CONTINUE.toUpperCase();
		req.addHeader(HTTP.EXPECT_DIRECTIVE, expectContinue);

		req.addHeader(HTTP.CONTENT_TYPE, ContentType.DEFAULT_TEXT.toString());
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		req.addHeader(HTTP.USER_AGENT, getSettings().getUserAgent());

		String content = "Hello";
		HttpEntity reqEntity = new StringEntity(content);
		req.setEntity(reqEntity);

		if (useChunked()) {
			req.addHeader(HTTP.TRANSFER_ENCODING, HTTP.CHUNK_CODING);
		} else {
			req.addHeader(HTTP.CONTENT_LEN,
					Long.toString(reqEntity.getContentLength()));
		}

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());

			// send the request headers
			conn.sendRequestHeader(req);
			conn.flush();

			// read the response...we should get a 100-Continue
			HttpResponse response = conn.receiveResponseHeader();
			logger.debug(response.getStatusLine());
			int actual = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_CONTINUE, actual);

		} finally {
			conn.close();
		}

	}

	@Test
	@Ignore
	public void testThat_IIS_ServerRespondsWith100ContinueUponReceivingExpect100ContinueWhenTheRequestIsAcceptedAndContinueToReadFromInputStream()
			throws Exception {
		DefaultHttpClientConnection conn = new DefaultHttpClientConnection();
		HttpHost target = new HttpHost("www.webservicex.net", 80);

		String method = "POST";
		String url = "/whois.asmx/GetWhoIS";

		BasicHttpEntityEnclosingRequest req = new BasicHttpEntityEnclosingRequest(
				method, url);

		req.addHeader(HTTP.TARGET_HOST, target.toHostString());
		req.addHeader(HTTP.CONTENT_TYPE, "application/x-www-form-urlencoded");
		req.addHeader(HTTP.CONN_DIRECTIVE, HTTP.CONN_KEEP_ALIVE);
		req.addHeader(HTTP.USER_AGENT, getSettings().getUserAgent());
		req.addHeader(HTTP.TRANSFER_ENCODING, HTTP.CHUNK_CODING);
		req.addHeader(HTTP.EXPECT_DIRECTIVE, HTTP.EXPECT_CONTINUE);

		req.setEntity(new StringEntity("HostName=www.webservicex.net"));

		try {
			// create and bind the socket
			Socket socket = new Socket(target.getHostName(), target.getPort());
			conn.bind(socket, new SyncBasicHttpParams());

			// send the request headers
			conn.sendRequestHeader(req);
			conn.flush();

			// read the response
			HttpResponse response = conn.receiveResponseHeader();

			// we should get a 100-Continue
			// logger.debug(response.getStatusLine());
			int actual = response.getStatusLine().getStatusCode();
			assertEquals(HttpStatus.SC_CONTINUE, actual);

			// send the request entity
			conn.sendRequestEntity(req);
			conn.flush();

			// read the response...we should get a 200 OK
			response = conn.receiveResponseHeader();
			conn.receiveResponseEntity(response);
			// logger.debug(response.getStatusLine());
			actual = response.getStatusLine().getStatusCode();
			// logger.debug("Entity: " +
			// EntityUtils.toString(response.getEntity()));
			assertEquals(HttpStatus.SC_OK, actual);

		} finally {
			conn.close();
		}
	}
}
