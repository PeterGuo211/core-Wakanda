package org.wakanda.qa.test.http.entitiy;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.fail;

import java.io.File;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpHead;
import org.apache.http.entity.ContentType;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.junit.Ignore;
import org.junit.Test;
import org.wakanda.qa.commons.server.http.HttpSimpleBufferedResponse;
import org.wakanda.qa.test.http.extend.AbstractTestCase;
import org.wakanda.qa.test.http.settings.Settings;

/**
 * @author Ouissam
 * 
 * This class manages all test cases related with message length.
 * 
 */
public class MessageLengthTest extends AbstractTestCase {

	/**
	 * <b>Implements:</b> MessageLength01
	 * <p>
	 * Check that content-length field value MUST exactly match the number of
	 * OCTETs in the message-body.
	 * <p>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.4 & SPEC698 (RFC2616) 14.13
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatResponseContainCorrectLength() throws Exception {
		String url = "/simple.html";
		File ressource = new File(Settings.getDefaultProjectWebFolderPath() + url);
		long expected = ressource.length();
		
		HttpGet request = new HttpGet(url);
		HttpResponse response = executeRequest(request);
		long actual = response.getEntity().getContentLength();

		Header contentLengthHeader = response.getFirstHeader(HTTP.CONTENT_LEN);
		assertNotNull("Missing Content-length header", contentLengthHeader);
		try {
			actual = Long.parseLong(contentLengthHeader.getValue());
		} catch (NumberFormatException e) {
			fail("Invalid content length: " + contentLengthHeader.getValue());
		}
		logger.debug("Content-length : " + contentLengthHeader.getValue());
		assertEquals("Content-length is incorrect", expected, actual);

	}

	/**
	 * <b>Implements:</b> MessageLength02
	 * <p>
	 * If a request contains a message-body and a Content-Length is not given,
	 * check that server respond with 400 (bad request) or with 411 (length
	 * required).
	 * <p>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.4
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatServerRejectARequestWithMessageBodyButNoContentLength()
			throws Exception {
		String request = "POST /echoBody/ HTTP/1.1" + CRLF + "Host: "
				+ getDefaultTarget().toHostString() + CRLF + CRLF + "Hello!";

		HttpSimpleBufferedResponse response = executeRawRequest(request);
		int actual = response.getStatusCode();
		assertEquals(
				"Server should respond with 400 or 411 if a request contains a message-body and a Content-Length is not given",
				true, actual == HttpStatus.SC_BAD_REQUEST
						|| actual == HttpStatus.SC_LENGTH_REQUIRED);

	}

	/**
	 * <b>Implements:</b> MessageLength03
	 * <p>
	 * In the case of HEAD request, check that content-length header indicates
	 * the size of the entity-body that would have been sent had the request
	 * been a GET.
	 * <p>
	 * <b>Reference:</b> SPEC698 (RFC2616) 14.13
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatContentLengthOfHeadResponseEqualsTheOneGotWithGetMethod()
			throws Exception {
		String uri = "/simple.html";

		// GET request
		HttpGet requestGet = new HttpGet(uri);
		HttpResponse responseGet = executeRequest(requestGet);
		Header contentLengthHeaderGet = responseGet
				.getFirstHeader(HTTP.CONTENT_LEN);
		assertNotNull("Missing Content-length header", contentLengthHeaderGet);
		long expected = -1;
		try {
			expected = Long.parseLong(contentLengthHeaderGet.getValue());
		} catch (NumberFormatException e) {
			fail("Invalid content length: " + contentLengthHeaderGet.getValue());
		}

		// HEAD request
		HttpHead requestHead = new HttpHead(uri);
		HttpResponse responseHead = executeRequest(requestHead);
		Header contentLengthHeaderHead = responseHead
				.getFirstHeader(HTTP.CONTENT_LEN);
		long actual = -1;
		try {
			actual = Long.parseLong(contentLengthHeaderHead.getValue());
		} catch (NumberFormatException e) {
			fail("Invalid content length: "
					+ contentLengthHeaderHead.getValue());
		}
		assertNotNull("Missing Content-length header", contentLengthHeaderHead);
		assertEquals("Content-length is incorrect", expected, actual);

	}

	/**
	 * <b>Implements:</b> MessageLength04
	 * <p>
	 * Check that any response message which "MUST NOT" include a message-body
	 * (such as the 1xx, 204, and 304 responses and any response to a HEAD
	 * request) is always terminated by the first empty line after the header
	 * fields.
	 * <p>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.4
	 * 
	 * @throws Exception
	 */
	@Test
	public void testResponseWithNoBody() throws Exception {
		String uri = "/simple.html";

		// Response to HEAD request
		HttpHead requestHead = new HttpHead(uri);
		HttpResponse responseHead = executeRequest(requestHead);
		assertEqualsStatusCode(HttpStatus.SC_OK, responseHead);
		assertNull("Reponse to HEAD request should not contain a message-body",
				responseHead.getEntity());

		// 304 response
		// Get last modified date
		HttpGet request1 = new HttpGet("/");
		HttpResponse respLmd = executeRequest(request1);
		String sLmd = respLmd.getFirstHeader(HttpHeaders.LAST_MODIFIED)
				.getValue();

		// Send request with If-Since-Modified header field.
		HttpGet request2 = new HttpGet("/");
		request2.addHeader(HttpHeaders.IF_MODIFIED_SINCE, sLmd);
		HttpResponse response = executeRequest(request2);

		assertEqualsStatusCode(HttpStatus.SC_NOT_MODIFIED, response);
		assertNull("304 reponse should not contain a message-body",
				responseHead.getEntity());

		// 1xx + 204 status codes are not implemented

	}

	/**
	 * <b>Implements:</b> MessageLength05
	 * <p>
	 * Check that when the message does include a non-identity transfer-coding,
	 * the Content-Length is ignored.
	 * <p>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.4
	 * The test is ignored for now because the feature is not yet implemented.
	 * <p/>
	 * @throws Exception
	 */
	@Test
	@Ignore
	public void testThatContentLengthIsIgnoredWhenRequestIncludesANonIdentityTransferCoding()
			throws Exception {
		String request = "POST /echoBody/ HTTP/1.1" + CRLF
				+ HttpHeaders.HOST + ":" + getDefaultHostHeaderValue() + CRLF
				+ HttpHeaders.TRANSFER_ENCODING + ":" + HTTP.CHUNK_CODING
				+ CRLF + HttpHeaders.CONTENT_TYPE + ":" + ContentType.DEFAULT_TEXT
				+ CRLF + HttpHeaders.CONTENT_LENGTH + ":" + "10" + CRLF + CRLF
				+ "3;\n" + "123\n" + "2;\n" + "45\n" + "4;\n" + "6789\n"
				+ "0;\n" + "\n";

		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

		HttpEntity entity = response.getEntity();

		String expected = "123456789";
		String actual = EntityUtils.toString(entity);

		// if the server uses content-length it will then return "3;\n123\n2;\n"
		logger.debug(actual);
		assertEquals("Wrong content", expected, actual);
	}

	/**
	 * <b>Implements:</b> MessageLength06
	 * <p/>
	 * Check that when the message does include an identity transfer-coding, the
	 * Content-Length is used.
	 * <p/>
	 * The test is ignored for now because the feature is not yet implemented.
	 * <p/>
	 * <b>Reference:</b> SPEC690 (RFC2616) 4.4
	 * 
	 * @throws Exception
	 */
	@Test
	public void testThatContentLengthIsUsedWhenRequestIncludesAnIdentityTransferCoding()
			throws Exception {
		String request = "POST /echoBody/ HTTP/1.1" + CRLF
				+ HttpHeaders.HOST + ":" + getDefaultHostHeaderValue() + CRLF
				+ HttpHeaders.TRANSFER_ENCODING + ":" + HTTP.IDENTITY_CODING + CRLF 
				+ HttpHeaders.CONTENT_TYPE + ":" + ContentType.DEFAULT_TEXT + CRLF 
				+ HttpHeaders.CONTENT_LENGTH + ":" + "5" + CRLF 
				+ CRLF
				+ "123456789";

		HttpSimpleBufferedResponse response = executeRawRequest(request);
		assertEqualsStatusCode(HttpStatus.SC_OK, response);

		HttpEntity entity = response.getEntity();
		assertNotNull(entity);

		String expected = "12345";
		String actual = EntityUtils.toString(entity);
		logger.debug(actual);
		assertEquals("Wrong content", expected, actual);
	}

}
